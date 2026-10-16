"""
spice_service.py — NASA/JPL SPICE kernel management and geometry calculations.

Responsibilities:
  - Load the LUNAOPS meta-kernel once at startup using a path derived from
    this file's own location (portable across machines).
  - Validate that required frames and bodies are available.
  - Compute Sun/Earth position vectors in MOON_ME for any UTC timestamp.
  - Convert Moon-centred MOON_ME vectors to local site azimuth/elevation.
  - Protect the process-wide SPICE kernel pool with a threading lock.
  - Never return fabricated or hardcoded astronomical values.

Reference frames
----------------
MOON_ME  (ID 31001):
    Lunar Mean Earth/Polar Axis frame aligned with DE440/ME421.
    +Z = lunar north rotation pole.
    +X = mean direction toward Earth (prime meridian).
    +Y = completes right-handed frame.
    Defined by moon_de440_250416.tf, realised by moon_pa_de440_200625.bpc.

Aberration correction
---------------------
We use "NONE" (geometric, no light-travel-time correction) for all bodies.
This gives the instantaneous geometric direction, which is appropriate for
mission planning geometry.  Apparent positions (light-time corrected) differ
by up to ~1.3 s of travel time (~600 km displacement for the Sun, ~1.3 s for
the Earth).  The distinction is documented here and enforced consistently.

Coordinate conventions
----------------------
Lunar geodetic latitude: +90° at north pole, −90° at south pole.
Lunar longitude: 0°–360° east, or equivalently −180°–+180°.
In MOON_ME, the prime meridian (lon 0°) points toward the mean Earth.

Local surface frame at a site (lat φ, lon λ):
    up    =  outward radial (unit sphere normal)
    north =  tangent toward increasing latitude
    east  =  tangent toward increasing longitude (right-handed with up)

Azimuth:   clockwise from north, 0°–360°.
Elevation: angle above the local horizontal plane, −90° to +90°.
"""

from __future__ import annotations

import math
import threading
import time
import logging
from pathlib import Path
from typing import Any

import numpy as np
import spiceypy as spice

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Module-level state
# ---------------------------------------------------------------------------

_lock = threading.Lock()  # Protects all SPICE operations (kernel pool is global)
_initialized = False
_init_error: str | None = None
_kernels_dir: Path = Path(__file__).resolve().parent / "kernels"
_generated_mk: Path = _kernels_dir / "_lunaops_generated.tm"

# Required kernel files (relative to kernels dir)
REQUIRED_KERNELS = [
    "latest_leapseconds.tls",
    "de440s.bsp",
    "pck00011.tpc",
    "moon_pa_de440_200625.bpc",
    "moon_de440_250416.tf",
]

REQUIRED_FRAME = "MOON_ME"
REQUIRED_BODIES = ["SUN", "EARTH", "MOON"]

# Lunar reference sphere radius (km) — mean radius from PCK/IAU 2009 report
MOON_RADIUS_KM = 1737.4


# ---------------------------------------------------------------------------
# Meta-kernel generation
# ---------------------------------------------------------------------------

def _write_generated_metakernel() -> Path:
    """
    Generate a portable meta-kernel whose PATH_VALUES is derived from this
    file's resolved location rather than any hardcoded machine path.

    This replaces the original lunaops.tm path handling without altering that
    file itself.
    """
    # SPICE requires forward slashes even on Windows
    kernels_posix = _kernels_dir.as_posix()
    lines = [
        "KPL/MK",
        "",
        "\\begindata",
        "",
        f"PATH_VALUES  = ( '{kernels_posix}' )",
        "PATH_SYMBOLS = ( 'KERNELS' )",
        "",
        "KERNELS_TO_LOAD = (",
        "    '$KERNELS/latest_leapseconds.tls'",
        "    '$KERNELS/de440s.bsp'",
        "    '$KERNELS/pck00011.tpc'",
        "    '$KERNELS/moon_pa_de440_200625.bpc'",
        "    '$KERNELS/moon_de440_250416.tf'",
        "    )",
        "",
        "\\begintext",
        "",
        "LUNAOPS generated meta-kernel - do not edit manually.",
        f"Generated from kernel directory: {_kernels_dir.as_posix()}",
        "",
    ]
    _generated_mk.write_text("\n".join(lines), encoding="utf-8")
    logger.info("Generated portable meta-kernel: %s", _generated_mk)
    return _generated_mk


# ---------------------------------------------------------------------------
# Kernel validation helpers
# ---------------------------------------------------------------------------

def _check_kernel_files() -> list[str]:
    """Return a list of missing or zero-byte kernel filenames."""
    missing = []
    for name in REQUIRED_KERNELS:
        path = _kernels_dir / name
        if not path.exists() or path.stat().st_size == 0:
            missing.append(name)
    return missing


def _verify_frame(frame_name: str) -> bool:
    """Return True if frame_name resolves to a valid SPICE frame ID."""
    try:
        spice.namfrm(frame_name)  # Returns 0 for unknown frame
        fid = spice.namfrm(frame_name)
        return fid != 0
    except spice.SpiceException:
        return False


def _verify_body(body_name: str) -> bool:
    """Return True if body_name resolves to a SPICE body ID."""
    try:
        spice.bodn2c(body_name)
        return True
    except spice.SpiceException:
        return False


def _run_diagnostic_calculation() -> bool:
    """
    Attempt a real geometry calculation for a known, in-coverage epoch.
    Returns True if a finite, physically plausible result is returned.
    """
    try:
        # 2026-10-16T12:00:00Z — well within DE440s coverage
        et = spice.str2et("2026 OCT 16 12:00:00 UTC")
        sun_vec, _ = spice.spkpos("SUN", et, "MOON_ME", "NONE", "MOON")
        earth_vec, _ = spice.spkpos("EARTH", et, "MOON_ME", "NONE", "MOON")
        sun_dist = float(np.linalg.norm(sun_vec))
        earth_dist = float(np.linalg.norm(earth_vec))
        # Sun: ~1 AU ≈ 149,597,870 km; Earth: ~350,000–410,000 km
        return (
            all(np.isfinite(sun_vec))
            and all(np.isfinite(earth_vec))
            and 1.3e8 < sun_dist < 1.7e8
            and 3e5 < earth_dist < 5e5
        )
    except Exception as exc:
        logger.error("Diagnostic calculation failed: %s", exc)
        return False


# ---------------------------------------------------------------------------
# Public API: initialisation
# ---------------------------------------------------------------------------

def initialize() -> None:
    """
    Load the LUNAOPS SPICE kernel collection exactly once.

    Raises RuntimeError with an actionable message if any step fails.
    Thread-safe: concurrent callers block until the first call completes.
    """
    global _initialized, _init_error

    with _lock:
        if _initialized:
            return
        if _init_error is not None:
            raise RuntimeError(_init_error)

        # Step 1: verify kernel files exist
        missing = _check_kernel_files()
        if missing:
            _init_error = (
                f"Missing or empty kernel files in {_kernels_dir}: "
                + ", ".join(missing)
            )
            raise RuntimeError(_init_error)

        # Step 2: generate portable meta-kernel
        mk_path = _write_generated_metakernel()

        # Step 3: clear any previously loaded kernels, then load ours
        try:
            spice.kclear()
            spice.furnsh(str(mk_path))
        except spice.SpiceException as exc:
            _init_error = f"SPICE kernel load failed: {exc}"
            raise RuntimeError(_init_error) from exc

        # Step 4: verify required frame
        if not _verify_frame(REQUIRED_FRAME):
            _init_error = (
                f"Required reference frame '{REQUIRED_FRAME}' is not available "
                "after kernel load.  Check that moon_de440_250416.tf and "
                "moon_pa_de440_200625.bpc are present."
            )
            raise RuntimeError(_init_error)

        # Step 5: verify required bodies
        for body in REQUIRED_BODIES:
            if not _verify_body(body):
                _init_error = (
                    f"Required body '{body}' not found in loaded kernels."
                )
                raise RuntimeError(_init_error)

        # Step 6: run a diagnostic geometry calculation
        if not _run_diagnostic_calculation():
            _init_error = (
                "Diagnostic SPICE geometry calculation returned implausible results.  "
                "Check that de440s.bsp covers the required time range."
            )
            raise RuntimeError(_init_error)

        _initialized = True
        logger.info(
            "SPICE initialised successfully.  Kernels: %s  Frame: %s",
            _kernels_dir,
            REQUIRED_FRAME,
        )


def shutdown() -> None:
    """Unload all kernels on application shutdown."""
    global _initialized
    with _lock:
        try:
            spice.kclear()
        except Exception:
            pass
        _initialized = False
        logger.info("SPICE kernel pool cleared.")


def get_status() -> dict[str, Any]:
    """
    Return the current SPICE service status without exposing filesystem paths.
    """
    with _lock:
        missing = _check_kernel_files()
        kernels_ok = len(missing) == 0
        frame_ok = _initialized and _verify_frame(REQUIRED_FRAME)
        diagnostic_ok = _initialized and _run_diagnostic_calculation()

        return {
            "initialized": _initialized,
            "kernels_present": kernels_ok,
            "missing_kernels": missing if not kernels_ok else [],
            "frame_available": frame_ok,
            "reference_frame": REQUIRED_FRAME,
            "diagnostic_calculation": diagnostic_ok,
            "error": _init_error,
        }


def _require_initialized() -> None:
    """Raise RuntimeError if SPICE is not initialised."""
    if not _initialized:
        err = _init_error or "SPICE not initialised.  Call initialize() first."
        raise RuntimeError(err)


# ---------------------------------------------------------------------------
# Core geometry calculations
# ---------------------------------------------------------------------------

def compute_geometry(
    utc_time: str,
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float = 0.0,
) -> dict[str, Any]:
    """
    Compute Sun and Earth geometry relative to the Moon and a surface site.

    Parameters
    ----------
    utc_time : str
        ISO-8601 UTC timestamp (e.g. "2026-10-16T12:00:00Z").
    latitude_deg : float
        Geodetic latitude of the site, degrees (+N / −S), −90 to +90.
    longitude_deg : float
        Longitude of the site, degrees (East positive), −180 to +360.
    elevation_m : float
        Site elevation above the reference sphere, metres.

    Returns
    -------
    dict with all computed values.  No values are fabricated; the function
    raises RuntimeError if SPICE cannot provide a result.
    """
    with _lock:
        _require_initialized()

        # ── 1. Parse UTC and convert to Ephemeris Time ──────────────────
        spice_utc = _iso_to_spice_utc(utc_time)
        et = spice.str2et(spice_utc)

        # ── 2. Get Moon-centred positions in MOON_ME ─────────────────────
        # Aberration correction: NONE (geometric)
        sun_vec_km, sun_lt = spice.spkpos("SUN",   et, "MOON_ME", "NONE", "MOON")
        earth_vec_km, earth_lt = spice.spkpos("EARTH", et, "MOON_ME", "NONE", "MOON")

        sun_vec_km = np.array(sun_vec_km, dtype=float)
        earth_vec_km = np.array(earth_vec_km, dtype=float)

        # ── 3. Validate outputs ──────────────────────────────────────────
        if not np.all(np.isfinite(sun_vec_km)):
            raise RuntimeError("SPICE returned non-finite Sun position vector.")
        if not np.all(np.isfinite(earth_vec_km)):
            raise RuntimeError("SPICE returned non-finite Earth position vector.")

        sun_dist_km   = float(np.linalg.norm(sun_vec_km))
        earth_dist_km = float(np.linalg.norm(earth_vec_km))

        if sun_dist_km < 1e6:
            raise RuntimeError(
                f"Sun distance {sun_dist_km:.0f} km is implausibly small."
            )
        if earth_dist_km < 1e4:
            raise RuntimeError(
                f"Earth distance {earth_dist_km:.0f} km is implausibly small."
            )

        # ── 4. Normalised direction vectors (Moon → target) ──────────────
        sun_dir   = sun_vec_km   / sun_dist_km
        earth_dir = earth_vec_km / earth_dist_km

        # ── 5. Local surface angles ──────────────────────────────────────
        lat_rad = math.radians(latitude_deg)
        lon_rad = math.radians(longitude_deg)

        # Site position vector on the reference sphere (km)
        elev_km = elevation_m / 1000.0
        r_site_km = MOON_RADIUS_KM + elev_km
        site_pos_km = np.array([
            r_site_km * math.cos(lat_rad) * math.cos(lon_rad),
            r_site_km * math.cos(lat_rad) * math.sin(lon_rad),
            r_site_km * math.sin(lat_rad),
        ])

        # Local east–north–up basis vectors at the site
        up    = site_pos_km / np.linalg.norm(site_pos_km)
        north = _local_north(lat_rad, lon_rad)
        east  = np.cross(north, up)   # right-hand rule: E = N × up
        east  = east / np.linalg.norm(east)
        north = np.cross(up, east)    # re-orthogonalise north
        north = north / np.linalg.norm(north)

        sun_az, sun_el = _to_az_el(sun_vec_km - site_pos_km, up, north, east)
        earth_az, earth_el = _to_az_el(earth_vec_km - site_pos_km, up, north, east)

        return {
            "utc_time":      utc_time,
            "spice_utc":     spice_utc,
            "ephemeris_time_s": float(et),
            "reference_frame": REQUIRED_FRAME,
            "aberration_correction": "NONE (geometric)",
            # Moon-centred vectors in MOON_ME (km)
            "sun": {
                "position_km":          sun_vec_km.tolist(),
                "distance_km":          sun_dist_km,
                "distance_au":          sun_dist_km / 1.495978707e8,
                "direction_unit":       sun_dir.tolist(),
                "azimuth_deg":          sun_az,
                "elevation_deg":        sun_el,
                "geometric_only":       True,
                "terrain_occlusion":    "unavailable - requires DEM ray-casting (step 6)",
            },
            "earth": {
                "position_km":          earth_vec_km.tolist(),
                "distance_km":          earth_dist_km,
                "direction_unit":       earth_dir.tolist(),
                "azimuth_deg":          earth_az,
                "elevation_deg":        earth_el,
                "geometric_only":       True,
                "terrain_occlusion":    "unavailable - requires DEM ray-casting (step 6)",
            },
            "site": {
                "latitude_deg":         latitude_deg,
                "longitude_deg":        longitude_deg,
                "elevation_m":          elevation_m,
                "position_moon_me_km":  site_pos_km.tolist(),
                "coordinate_note": (
                    "Geodetic coordinates in MOON_ME.  "
                    "Longitude is East-positive (IAU/MOON_ME convention).  "
                    "Site01 GeoTIFF raster coordinates are polar stereographic "
                    "and have NOT been validated against these geodetic values; "
                    "Site01-specific angular results are not yet scientifically "
                    "verified."
                ),
            },
            "limitations": {
                "terrain_aware_visibility": False,
                "site01_coordinate_validated": False,
                "note": (
                    "Positive geometric elevation does not imply direct solar "
                    "illumination or Earth visibility.  Terrain occlusion "
                    "requires DEM ray-casting (planned for step 6)."
                ),
            },
        }


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _iso_to_spice_utc(iso: str) -> str:
    """
    Convert an ISO-8601 string (e.g. '2026-10-16T12:00:00Z') to the SPICE
    UTC format expected by str2et (e.g. '2026 OCT 16 12:00:00 UTC').
    """
    import datetime
    # Parse with fromisoformat; Python 3.11+ handles 'Z' directly;
    # for 3.9/3.10 we normalise it.
    s = iso.strip().replace("Z", "+00:00")
    dt = datetime.datetime.fromisoformat(s)
    # Convert to UTC
    dt_utc = dt.astimezone(datetime.timezone.utc)
    return dt_utc.strftime("%Y %b %d %H:%M:%S UTC").upper()


def _local_north(lat_rad: float, lon_rad: float) -> np.ndarray:
    """
    Return the unit vector pointing geographic north at (lat, lon) in MOON_ME.
    This is the derivative of the position vector with respect to increasing
    latitude, normalised.
    """
    # d/d(lat) [ cos(lat)*cos(lon), cos(lat)*sin(lon), sin(lat) ]
    #        = [ -sin(lat)*cos(lon), -sin(lat)*sin(lon), cos(lat) ]
    slat = math.sin(lat_rad)
    clat = math.cos(lat_rad)
    slon = math.sin(lon_rad)
    clon = math.cos(lon_rad)
    n = np.array([-slat * clon, -slat * slon, clat])
    norm = np.linalg.norm(n)
    if norm < 1e-10:
        # At the poles, north is undefined; return an arbitrary tangent
        return np.array([1.0, 0.0, 0.0])
    return n / norm


def _to_az_el(
    vec: np.ndarray,
    up: np.ndarray,
    north: np.ndarray,
    east: np.ndarray,
) -> tuple[float, float]:
    """
    Project *vec* onto the local East–North–Up frame and return
    (azimuth_deg, elevation_deg).

    Azimuth:   0° = North, 90° = East, 180° = South, 270° = West (clockwise).
    Elevation: angle above the local horizontal plane.
    """
    mag = np.linalg.norm(vec)
    if mag < 1e-10:
        return 0.0, 0.0
    v = vec / mag

    e_comp = float(np.dot(v, east))
    n_comp = float(np.dot(v, north))
    u_comp = float(np.dot(v, up))

    # Elevation
    u_clamped = max(-1.0, min(1.0, u_comp))
    elevation = math.degrees(math.asin(u_clamped))

    # Azimuth (clockwise from north)
    azimuth = math.degrees(math.atan2(e_comp, n_comp)) % 360.0

    return azimuth, elevation
