"""
horizon_service.py — LUNAOPS Local Terrain Horizon and Obstruction Engine.

Scientifically calculates:
1. Local terrain skyline elevation angle (theta_horizon) along any azimuth relative
   to an observer's topocentric tangent plane, accounting for lunar curvature.
2. Complete 360-degree horizon profiles from the NASA Site 01 5m/px DEM.
3. Sun and Earth celestial target line-of-sight obstruction and clearance margins.
4. Lunar body vs local terrain occultation separation.

Conforms to:
- NASA LOLA Site 01 GeoTIFF: Polar Stereographic (R = 1,737,400 m, lat_0 = -90°, lon_0 = 0°)
- MOON_ME reference frame (IAU Mean Earth / Polar Axis, East-positive)
"""

from __future__ import annotations

import os
import math
import logging
from typing import Any, Optional
import numpy as np

logger = logging.getLogger("lunaops.horizon")

# ── Planetary and Dataset Constants ─────────────────────────────────────────
LUNAR_RADIUS_M = 1737400.0
LUNAR_RADIUS_KM = 1737.4

# Site 01 GeoTIFF footprint parameters
SITE01_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "Resources",
    "south-pole-site01",
)
SITE01_SURF_FILENAME = "Site01_final_adj_5mpp_surf.tif"
SITE01_SURF_PATH = os.path.join(SITE01_DIR, SITE01_SURF_FILENAME)

ORIGIN_X = -19000.0
ORIGIN_Y = -4000.0
PIXEL_SIZE = 5.0
RASTER_WIDTH = 3200
RASTER_HEIGHT = 3200
MIN_X = -19000.0
MAX_X = -3000.0
MIN_Y = -20000.0
MAX_Y = -4000.0

# ── Global Cached In-Memory DEM ─────────────────────────────────────────────
_dem_data: Optional[np.ndarray] = None
_dem_loaded: bool = False
_profile_cache: dict[tuple, dict[str, Any]] = {}


def load_dem_dataset(path: Optional[str] = None) -> bool:
    """
    Load the Site 01 5m/px DEM into memory for rapid ray-casting.
    """
    global _dem_data, _dem_loaded
    if _dem_loaded and _dem_data is not None:
        return True

    target_path = path or SITE01_SURF_PATH
    if not os.path.exists(target_path):
        logger.warning("Site 01 surface GeoTIFF not found at %s", target_path)
        _dem_loaded = False
        return False

    try:
        import rasterio
        with rasterio.open(target_path) as ds:
            _dem_data = ds.read(1).astype(np.float32)
        _dem_loaded = True
        logger.info(
            "Loaded Site 01 DEM (%dx%d, min=%.1f, max=%.1f m)",
            _dem_data.shape[1],
            _dem_data.shape[0],
            float(np.nanmin(_dem_data)),
            float(np.nanmax(_dem_data)),
        )
        return True
    except Exception as exc:
        logger.error("Failed to load Site 01 DEM GeoTIFF: %s", exc)
        _dem_loaded = False
        return False


def set_synthetic_dem(dem_array: np.ndarray) -> None:
    """
    Used for unit tests to inject controlled synthetic terrain topography.
    """
    global _dem_data, _dem_loaded
    _dem_data = dem_array.astype(np.float32)
    _dem_loaded = True


# ── Coordinate Projections ──────────────────────────────────────────────────

def selenographic_to_polar_stereo(lon_deg: float, lat_deg: float, r: float = LUNAR_RADIUS_M) -> tuple[float, float]:
    """Forward polar stereographic projection (South Pole aspect, lon_0 = 0°)."""
    norm_lon = (lon_deg % 360.0 + 360.0) % 360.0
    lam = math.radians(norm_lon)
    phi = math.radians(lat_deg)
    c = math.pi / 2.0 + phi
    rho = 2.0 * r * math.tan(c / 2.0)
    x = rho * math.sin(lam)
    y = rho * math.cos(lam)
    return x, y


def polar_stereo_to_selenographic(x: float, y: float, r: float = LUNAR_RADIUS_M) -> tuple[float, float]:
    """Inverse polar stereographic projection (South Pole aspect, lon_0 = 0°)."""
    rho = math.hypot(x, y)
    if rho < 1e-9:
        return 0.0, -90.0
    c = 2.0 * math.atan2(rho, 2.0 * r)
    phi = -math.pi / 2.0 + c
    lam = math.atan2(x, y)
    lon_deg = (math.degrees(lam) + 360.0) % 360.0
    lat_deg = math.degrees(phi)
    return lon_deg, lat_deg


def is_inside_site01(lon_deg: float, lat_deg: float) -> bool:
    """Check if coordinates fall within Site 01 16x16 km raster coverage."""
    if lat_deg > -80.0:
        return False
    x, y = selenographic_to_polar_stereo(lon_deg, lat_deg)
    return MIN_X <= x <= MAX_X and MIN_Y <= y <= MAX_Y


def sample_dem_bilinear(dem: np.ndarray, x: float, y: float) -> float:
    """Sample elevation in metres at (x, y) projected meters using bilinear interpolation."""
    col = (x - ORIGIN_X) / PIXEL_SIZE
    row = (ORIGIN_Y - y) / PIXEL_SIZE

    if col < 0 or col >= dem.shape[1] - 1 or row < 0 or row >= dem.shape[0] - 1:
        return float("nan")

    c0 = int(math.floor(col))
    r0 = int(math.floor(row))
    c1 = min(c0 + 1, dem.shape[1] - 1)
    r1 = min(r0 + 1, dem.shape[0] - 1)

    dc = col - c0
    dr = row - r0

    v00 = dem[r0, c0]
    v10 = dem[r0, c1]
    v01 = dem[r1, c0]
    v11 = dem[r1, c1]

    if not (np.isfinite(v00) and np.isfinite(v10) and np.isfinite(v01) and np.isfinite(v11)):
        return float("nan")

    val = (1.0 - dc) * (1.0 - dr) * v00 + dc * (1.0 - dr) * v10 + (1.0 - dc) * dr * v01 + dc * dr * v11
    return float(val)


# ── Horizon Ray-Marching Engine ─────────────────────────────────────────────

def compute_azimuth_horizon(
    lon_deg: float,
    lat_deg: float,
    azimuth_deg: float,
    elevation_m: Optional[float] = None,
    instrument_height_m: float = 2.0,
    step_m: float = 5.0,
    max_range_m: float = 16000.0,
) -> dict[str, Any]:
    """
    Compute the local terrain skyline elevation angle along a single azimuth ray.
    Accounts for lunar spherical curvature.
    """
    if _dem_data is None:
        if not load_dem_dataset():
            return {
                "azimuth_deg": azimuth_deg,
                "horizon_elevation_deg": 0.0,
                "horizon_distance_m": 0.0,
                "is_inside_dem": False,
                "coverage_distance_m": 0.0,
                "status": "calculation_unavailable",
                "error": "Site 01 DEM dataset not loaded",
            }

    dem = _dem_data
    x0, y0 = selenographic_to_polar_stereo(lon_deg, lat_deg)

    if not (MIN_X <= x0 <= MAX_X and MIN_Y <= y0 <= MAX_Y):
        return {
            "azimuth_deg": azimuth_deg,
            "horizon_elevation_deg": 0.0,
            "horizon_distance_m": 0.0,
            "is_inside_dem": False,
            "coverage_distance_m": 0.0,
            "status": "unknown_insufficient_coverage",
            "error": "Coordinates outside Site 01 DEM footprint",
        }

    # Observer surface elevation
    if elevation_m is None or not math.isfinite(elevation_m):
        h0 = sample_dem_bilinear(dem, x0, y0)
        if not math.isfinite(h0):
            # Fallback to nearest pixel
            c = int(round((x0 - ORIGIN_X) / PIXEL_SIZE))
            r = int(round((ORIGIN_Y - y0) / PIXEL_SIZE))
            h0 = float(dem[max(0, min(dem.shape[0]-1, r)), max(0, min(dem.shape[1]-1, c))])
    else:
        h0 = float(elevation_m)

    total_h_obs = h0 + instrument_height_m
    r_obs = LUNAR_RADIUS_M + total_h_obs

    lam0 = math.radians(lon_deg)
    phi0 = math.radians(lat_deg)

    # 3D Observer position in MOON_ME frame (meters)
    P_obs = np.array([
        r_obs * math.cos(phi0) * math.cos(lam0),
        r_obs * math.cos(phi0) * math.sin(lam0),
        r_obs * math.sin(phi0),
    ], dtype=np.float64)

    u_obs = P_obs / np.linalg.norm(P_obs)

    # Conformal direction in Polar Stereographic plane
    # n_xy points in direction of increasing latitude (North)
    # e_xy points in direction of increasing longitude (East)
    n_xy = np.array([math.sin(lam0), math.cos(lam0)], dtype=np.float64)
    e_xy = np.array([math.cos(lam0), -math.sin(lam0)], dtype=np.float64)

    az_rad = math.radians(azimuth_deg)
    v_xy = math.cos(az_rad) * n_xy + math.sin(az_rad) * e_xy

    # Ray steps along azimuth
    s_steps = np.arange(step_m, max_range_m + step_m, step_m, dtype=np.float64)
    xs = x0 + s_steps * v_xy[0]
    ys = y0 + s_steps * v_xy[1]

    # Convert to raster coordinates
    cols = np.round((xs - ORIGIN_X) / PIXEL_SIZE).astype(int)
    rows = np.round((ORIGIN_Y - ys) / PIXEL_SIZE).astype(int)

    # Restrict to points strictly within raster bounds
    in_bounds = (cols >= 0) & (cols < dem.shape[1]) & (rows >= 0) & (rows < dem.shape[0])
    if not np.any(in_bounds):
        return {
            "azimuth_deg": azimuth_deg,
            "horizon_elevation_deg": 0.0,
            "horizon_distance_m": 0.0,
            "is_inside_dem": True,
            "coverage_distance_m": 0.0,
            "status": "unknown_insufficient_coverage",
        }

    # Truncate at first boundary exit
    valid_indices = np.where(~in_bounds)[0]
    if len(valid_indices) > 0:
        first_exit = valid_indices[0]
        cols = cols[:first_exit]
        rows = rows[:first_exit]
        xs = xs[:first_exit]
        ys = ys[:first_exit]
        s_steps = s_steps[:first_exit]
    else:
        cols = cols[in_bounds]
        rows = rows[in_bounds]
        xs = xs[in_bounds]
        ys = ys[in_bounds]
        s_steps = s_steps[in_bounds]

    if len(s_steps) == 0:
        return {
            "azimuth_deg": azimuth_deg,
            "horizon_elevation_deg": 0.0,
            "horizon_distance_m": 0.0,
            "is_inside_dem": True,
            "coverage_distance_m": 0.0,
            "status": "unknown_insufficient_coverage",
        }

    # Sample raster heights
    hs = dem[rows, cols]
    finite_mask = np.isfinite(hs)

    # Stop at first NaN gap if any
    non_finite_idx = np.where(~finite_mask)[0]
    if len(non_finite_idx) > 0:
        first_nan = non_finite_idx[0]
        xs = xs[:first_nan]
        ys = ys[:first_nan]
        hs = hs[:first_nan]
        s_steps = s_steps[:first_nan]

    coverage_distance_m = float(s_steps[-1]) if len(s_steps) > 0 else 0.0

    if len(s_steps) == 0:
        return {
            "azimuth_deg": azimuth_deg,
            "horizon_elevation_deg": 0.0,
            "horizon_distance_m": 0.0,
            "is_inside_dem": True,
            "coverage_distance_m": 0.0,
            "status": "unknown_insufficient_coverage",
        }

    # Convert ray sample locations back to selenographic 3D points
    rhos = np.hypot(xs, ys)
    cs = 2.0 * np.arctan2(rhos, 2.0 * LUNAR_RADIUS_M)
    phis = -math.pi / 2.0 + cs
    lams = np.arctan2(xs, ys)

    rs = LUNAR_RADIUS_M + hs
    Px = rs * np.cos(phis) * np.cos(lams)
    Py = rs * np.cos(phis) * np.sin(lams)
    Pz = rs * np.sin(phis)
    Ps = np.stack([Px, Py, Pz], axis=-1)

    # Vector from observer to each terrain sample
    delta = Ps - P_obs
    dists = np.linalg.norm(delta, axis=1)

    # Elevation angle above observer's local horizontal tangent plane
    # dot(delta, u_obs) is the vertical component
    dots = np.dot(delta, u_obs)
    sin_els = np.clip(dots / dists, -1.0, 1.0)
    els_deg = np.degrees(np.arcsin(sin_els))

    max_idx = int(np.argmax(els_deg))
    horizon_el_deg = float(els_deg[max_idx])
    horizon_dist_m = float(dists[max_idx])

    return {
        "azimuth_deg": azimuth_deg,
        "horizon_elevation_deg": round(horizon_el_deg, 3),
        "horizon_distance_m": round(horizon_dist_m, 1),
        "is_inside_dem": True,
        "coverage_distance_m": round(coverage_distance_m, 1),
        "observer_elevation_m": round(h0, 1),
        "instrument_height_m": instrument_height_m,
        "sample_count": len(els_deg),
        "status": "evaluated",
    }


def compute_horizon_profile(
    lon_deg: float,
    lat_deg: float,
    elevation_m: Optional[float] = None,
    instrument_height_m: float = 2.0,
    angular_step_deg: float = 2.0,
    step_m: float = 5.0,
    max_range_m: float = 16000.0,
) -> dict[str, Any]:
    """
    Compute a 360-degree horizon profile for the site.
    Cached by site coordinates and configuration.
    """
    cache_key = (
        round(lon_deg, 4),
        round(lat_deg, 4),
        round(instrument_height_m, 2),
        round(angular_step_deg, 2),
    )
    if cache_key in _profile_cache:
        return _profile_cache[cache_key]

    azimuths = np.arange(0.0, 360.0, angular_step_deg)
    profile: list[dict[str, Any]] = []

    for az in azimuths:
        res = compute_azimuth_horizon(
            lon_deg=lon_deg,
            lat_deg=lat_deg,
            azimuth_deg=float(az),
            elevation_m=elevation_m,
            instrument_height_m=instrument_height_m,
            step_m=step_m,
            max_range_m=max_range_m,
        )
        profile.append({
            "azimuth_deg": round(float(az), 1),
            "horizon_elevation_deg": res["horizon_elevation_deg"],
            "horizon_distance_m": res["horizon_distance_m"],
            "coverage_distance_m": res["coverage_distance_m"],
        })

    result = {
        "site_lon_deg": lon_deg,
        "site_lat_deg": lat_deg,
        "angular_step_deg": angular_step_deg,
        "profile": profile,
    }
    _profile_cache[cache_key] = result
    return result


# ── Target Visibility and Occlusion Evaluator ───────────────────────────────

def evaluate_target_obstruction(
    target_name: str,
    target_az_deg: float,
    target_el_deg: float,
    target_dist_km: float,
    lon_deg: float,
    lat_deg: float,
    elevation_m: Optional[float] = None,
    instrument_height_m: float = 2.0,
    tolerance_deg: float = 0.05,
) -> dict[str, Any]:
    """
    Determine if a celestial target (Sun or Earth) is blocked by local terrain
    or occulted by the lunar body.
    """
    # 1. Check Lunar Body Occultation:
    # On a sphere, the geometric horizon dips slightly: dip = acos(R / (R + h))
    # For h = 2 km, dip = acos(1737.4 / 1739.4) ≈ 2.75° below 0°.
    # A conservative boundary for lunar body blockage is target_el_deg < -0.2°
    # when no local terrain is present.
    if target_el_deg < -0.2:
        return {
            "target": target_name,
            "azimuth_deg": round(target_az_deg, 2),
            "geometric_elevation_deg": round(target_el_deg, 2),
            "terrain_horizon_elevation_deg": None,
            "angular_clearance_deg": round(target_el_deg, 2),
            "horizon_distance_m": None,
            "visibility_status": "blocked_by_lunar_body",
            "coverage_limited": False,
            "note": (
                f"{target_name} is below the lunar geometric horizon "
                f"({target_el_deg:.2f}° elevation). Occulted by the Moon body."
            ),
        }

    # 2. Check if Site is Inside Site 01 DEM
    if not is_inside_site01(lon_deg, lat_deg):
        return {
            "target": target_name,
            "azimuth_deg": round(target_az_deg, 2),
            "geometric_elevation_deg": round(target_el_deg, 2),
            "terrain_horizon_elevation_deg": None,
            "angular_clearance_deg": None,
            "horizon_distance_m": None,
            "visibility_status": "unknown_insufficient_coverage",
            "coverage_limited": True,
            "note": (
                "Location is outside high-resolution Site 01 DEM coverage (16x16 km tile). "
                "Local terrain obstruction cannot be confirmed."
            ),
        }

    # 3. Ray-March Terrain Skyline along exact Target Azimuth
    ray_res = compute_azimuth_horizon(
        lon_deg=lon_deg,
        lat_deg=lat_deg,
        azimuth_deg=target_az_deg,
        elevation_m=elevation_m,
        instrument_height_m=instrument_height_m,
        step_m=5.0,
        max_range_m=16000.0,
    )

    if ray_res["status"] == "calculation_unavailable":
        return {
            "target": target_name,
            "azimuth_deg": round(target_az_deg, 2),
            "geometric_elevation_deg": round(target_el_deg, 2),
            "terrain_horizon_elevation_deg": None,
            "angular_clearance_deg": None,
            "horizon_distance_m": None,
            "visibility_status": "calculation_unavailable",
            "coverage_limited": True,
            "note": ray_res.get("error", "Terrain data unavailable"),
        }

    h_el = ray_res["horizon_elevation_deg"]
    h_dist = ray_res["horizon_distance_m"]
    clearance = target_el_deg - h_el

    # Boundary check with tolerance
    if clearance < -tolerance_deg:
        status = "blocked_by_local_terrain"
        note = (
            f"Blocked by local terrain ridge at distance {h_dist/1000.0:.2f} km "
            f"(skyline elevation {h_el:+.2f}°, clearance {clearance:+.2f}°)."
        )
    elif abs(clearance) <= tolerance_deg:
        status = "near_horizon_grazing"
        note = (
            f"Grazing line-of-sight within {tolerance_deg}° tolerance band of terrain skyline "
            f"(skyline elevation {h_el:+.2f}°)."
        )
    else:
        # Clearance is positive
        # Check if ray coverage reached adequate distance (e.g. > 3 km)
        if ray_res["coverage_distance_m"] < 3000.0 and h_el < target_el_deg < h_el + 1.0:
            status = "unknown_insufficient_coverage"
            note = (
                f"No obstruction detected within {ray_res['coverage_distance_m']/1000.0:.1f} km raster coverage, "
                "but ray exited DEM boundary. Distant terrain beyond tile may block low target."
            )
        else:
            status = "no_obstruction_detected_within_coverage"
            note = (
                f"Clear line-of-sight above local terrain skyline "
                f"(skyline {h_el:+.2f}°, angular clearance {clearance:+.2f}°)."
            )

    return {
        "target": target_name,
        "azimuth_deg": round(target_az_deg, 2),
        "geometric_elevation_deg": round(target_el_deg, 2),
        "terrain_horizon_elevation_deg": round(h_el, 2),
        "angular_clearance_deg": round(clearance, 2),
        "horizon_distance_m": round(h_dist, 1),
        "coverage_distance_m": ray_res["coverage_distance_m"],
        "visibility_status": status,
        "coverage_limited": ray_res["coverage_distance_m"] < 10000.0,
        "note": note,
    }
