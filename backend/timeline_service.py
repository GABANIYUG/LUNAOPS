"""
timeline_service.py — LUNAOPS Mission Timeline & Visibility Windows Engine.

Scientifically computes time-dependent visibility windows for lunar surface missions:
1. Samples mission intervals with configurable time step (e.g. 15, 30, 60 minutes).
2. Computes topocentric Sun and Earth geometry via SPICE (MOON_ME reference frame).
3. Integrates local DEM terrain horizon ray-marching (NASA LOLA Site 01 5 m/px).
4. Models apparent angular radii:
   - Sun (R = 696,340 km): Full disc, Partial/penumbral, Total darkness.
   - Earth (R = 6,371 km): Full disc LOS, Centre-only LOS, Partial disc LOS, Occulted.
5. Numerically refines transition boundaries using bisection (down to 60-second resolution).
6. Assembles continuous intervals (start, end, duration) and summary metrics.
7. Strictly respects SPICE kernel bounds (1900–2050 UTC) and DEM geographic bounds.
8. Includes scientific disclaimer: Potential Direct-to-Earth Line of Sight represents
   geometric and terrain optical clearance only; no operational RF communication link
   is claimed without detailed RF link budgets and antenna gain models.
"""

from __future__ import annotations

import datetime
import math
import logging
from typing import Any, Optional

import spice_service
import horizon_service
from horizon_service import (
    is_inside_site01,
    compute_azimuth_horizon,
)

logger = logging.getLogger("lunaops.timeline")

# ── Planetary and Physical Constants ─────────────────────────────────────────
SUN_RADIUS_KM = 696340.0
EARTH_RADIUS_KM = 6371.0
DE440S_MIN_YEAR = 1900
DE440S_MAX_YEAR = 2050

# Default configuration parameters
DEFAULT_STEP_MINUTES = 60
DEFAULT_REFINEMENT_TOLERANCE_SEC = 60  # 1-minute transition accuracy
MAX_MISSION_DAYS = 365


def compute_apparent_angular_radius_deg(radius_km: float, distance_km: float) -> float:
    """
    Compute apparent angular radius in degrees: theta = arcsin(R / d).
    """
    if distance_km <= radius_km:
        return 90.0
    return math.degrees(math.asin(radius_km / distance_km))


def parse_iso_utc(iso_str: str) -> datetime.datetime:
    """Parse ISO-8601 UTC string into timezone-aware UTC datetime."""
    clean = iso_str.strip().replace("Z", "+00:00")
    dt = datetime.datetime.fromisoformat(clean)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=datetime.timezone.utc)
    else:
        dt = dt.astimezone(datetime.timezone.utc)
    return dt


def format_iso_utc(dt: datetime.datetime) -> str:
    """Format datetime as canonical ISO-8601 UTC string with Z suffix."""
    return dt.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def validate_interval(start_dt: datetime.datetime, end_dt: datetime.datetime) -> None:
    """Validate that mission start and end times are physically sound and covered by SPICE."""
    if start_dt >= end_dt:
        raise ValueError("Mission start time must precede mission end time.")

    span = end_dt - start_dt
    if span.total_seconds() > MAX_MISSION_DAYS * 86400:
        raise ValueError(f"Mission span exceeds maximum supported duration of {MAX_MISSION_DAYS} days.")

    if start_dt.year < DE440S_MIN_YEAR or end_dt.year > DE440S_MAX_YEAR:
        raise ValueError(
            f"Interval [{start_dt.year}..{end_dt.year}] is outside NASA JPL DE440s SPICE kernel "
            f"coverage [{DE440S_MIN_YEAR}..{DE440S_MAX_YEAR}]."
        )


def classify_sun_visibility(
    sun_el_deg: float,
    horizon_el_deg: Optional[float],
    sun_angular_radius_deg: float,
    is_inside_dem: bool,
) -> str:
    """
    Classify sunlight illumination state taking into account the Sun's apparent disc.

    States:
    - full_sunlight: bottom of solar disc is above terrain skyline
    - partial_sunlight: solar disc intersects terrain skyline (penumbral / grazing)
    - total_darkness: top of solar disc is below terrain skyline or lunar body
    - unknown_insufficient_coverage: site is outside DEM footprint
    """
    # If target is geometrically beneath the lunar sphere
    if sun_el_deg < -0.2 and (horizon_el_deg is None or sun_el_deg + sun_angular_radius_deg < -0.2):
        return "total_darkness"

    if not is_inside_dem or horizon_el_deg is None or not math.isfinite(horizon_el_deg):
        # Above geometric horizon, but outside DEM or no terrain relief data
        return "unknown_insufficient_coverage"

    upper_limb = sun_el_deg + sun_angular_radius_deg
    lower_limb = sun_el_deg - sun_angular_radius_deg

    if lower_limb >= horizon_el_deg:
        return "full_sunlight"
    elif upper_limb >= horizon_el_deg:
        return "partial_sunlight"
    else:
        return "total_darkness"


def classify_earth_visibility(
    earth_el_deg: float,
    horizon_el_deg: Optional[float],
    earth_angular_radius_deg: float,
    is_inside_dem: bool,
) -> str:
    """
    Classify potential Direct-to-Earth Line of Sight (LOS) state taking into account
    the Earth's apparent disc.

    States:
    - full_disc_los: entire Earth disc clears local terrain skyline
    - centre_only_los: Earth centre is visible, but lower limb is clipped by terrain
    - partial_disc_los: upper limb clears terrain, but centre is obstructed
    - occulted: entire Earth disc is occluded by terrain or lunar body
    - unknown_insufficient_coverage: outside DEM footprint
    """
    if earth_el_deg < -0.2 and (horizon_el_deg is None or earth_el_deg + earth_angular_radius_deg < -0.2):
        return "occulted"

    if not is_inside_dem or horizon_el_deg is None or not math.isfinite(horizon_el_deg):
        return "unknown_insufficient_coverage"

    upper_limb = earth_el_deg + earth_angular_radius_deg
    lower_limb = earth_el_deg - earth_angular_radius_deg

    if lower_limb >= horizon_el_deg:
        return "full_disc_los"
    elif earth_el_deg >= horizon_el_deg:
        return "centre_only_los"
    elif upper_limb >= horizon_el_deg:
        return "partial_disc_los"
    else:
        return "occulted"


def evaluate_instant_geometry(
    dt: datetime.datetime,
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float,
    instrument_height_m: float,
    is_inside_dem: bool,
) -> dict[str, Any]:
    """
    Evaluate instant topocentric geometry, terrain skyline, and visibility classifications.
    """
    iso_str = format_iso_utc(dt)
    geom = spice_service.compute_geometry(
        utc_time=iso_str,
        latitude_deg=latitude_deg,
        longitude_deg=longitude_deg,
        elevation_m=elevation_m,
    )

    sun_az = geom["sun"]["azimuth_deg"]
    sun_el = geom["sun"]["elevation_deg"]
    sun_dist_km = geom["sun"]["distance_km"]
    sun_ang_radius = compute_apparent_angular_radius_deg(SUN_RADIUS_KM, sun_dist_km)

    earth_az = geom["earth"]["azimuth_deg"]
    earth_el = geom["earth"]["elevation_deg"]
    earth_dist_km = geom["earth"]["distance_km"]
    earth_ang_radius = compute_apparent_angular_radius_deg(EARTH_RADIUS_KM, earth_dist_km)

    # Terrain skyline ray-marching if within DEM coverage
    sun_horizon_el: Optional[float] = None
    sun_horizon_dist_m: Optional[float] = None
    earth_horizon_el: Optional[float] = None
    earth_horizon_dist_m: Optional[float] = None

    if is_inside_dem:
        # Sun ray
        sun_ray = compute_azimuth_horizon(
            lon_deg=longitude_deg,
            lat_deg=latitude_deg,
            azimuth_deg=sun_az,
            elevation_m=elevation_m,
            instrument_height_m=instrument_height_m,
        )
        if sun_ray.get("status") != "calculation_unavailable":
            sun_horizon_el = sun_ray["horizon_elevation_deg"]
            sun_horizon_dist_m = sun_ray["horizon_distance_m"]

        # Earth ray
        earth_ray = compute_azimuth_horizon(
            lon_deg=longitude_deg,
            lat_deg=latitude_deg,
            azimuth_deg=earth_az,
            elevation_m=elevation_m,
            instrument_height_m=instrument_height_m,
        )
        if earth_ray.get("status") != "calculation_unavailable":
            earth_horizon_el = earth_ray["horizon_elevation_deg"]
            earth_horizon_dist_m = earth_ray["horizon_distance_m"]

    sun_state = classify_sun_visibility(sun_el, sun_horizon_el, sun_ang_radius, is_inside_dem)
    earth_state = classify_earth_visibility(earth_el, earth_horizon_el, earth_ang_radius, is_inside_dem)

    sun_clearance = round(sun_el - sun_horizon_el, 2) if sun_horizon_el is not None else None
    earth_clearance = round(earth_el - earth_horizon_el, 2) if earth_horizon_el is not None else None

    return {
        "timestamp_utc": iso_str,
        "dt": dt,
        "sun": {
            "azimuth_deg": round(sun_az, 2),
            "elevation_deg": round(sun_el, 2),
            "angular_radius_deg": round(sun_ang_radius, 3),
            "distance_km": round(sun_dist_km, 1),
            "terrain_horizon_elevation_deg": round(sun_horizon_el, 2) if sun_horizon_el is not None else None,
            "horizon_distance_m": round(sun_horizon_dist_m, 1) if sun_horizon_dist_m is not None else None,
            "angular_clearance_deg": sun_clearance,
            "visibility_state": sun_state,
            "direction_unit": geom["sun"]["direction_unit"],
        },
        "earth": {
            "azimuth_deg": round(earth_az, 2),
            "elevation_deg": round(earth_el, 2),
            "angular_radius_deg": round(earth_ang_radius, 3),
            "distance_km": round(earth_dist_km, 1),
            "terrain_horizon_elevation_deg": round(earth_horizon_el, 2) if earth_horizon_el is not None else None,
            "horizon_distance_m": round(earth_horizon_dist_m, 1) if earth_horizon_dist_m is not None else None,
            "angular_clearance_deg": earth_clearance,
            "visibility_state": earth_state,
            "direction_unit": geom["earth"]["direction_unit"],
        },
    }


def refine_transition(
    dt_a: datetime.datetime,
    state_a: str,
    dt_b: datetime.datetime,
    state_b: str,
    target: str,  # 'sun' or 'earth'
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float,
    instrument_height_m: float,
    is_inside_dem: bool,
    tolerance_sec: float = DEFAULT_REFINEMENT_TOLERANCE_SEC,
    max_iterations: int = 12,
) -> datetime.datetime:
    """
    Numerically refine a visibility state transition between dt_a and dt_b using bisection.
    """
    low = dt_a
    high = dt_b

    for _ in range(max_iterations):
        span = (high - low).total_seconds()
        if span <= tolerance_sec:
            break

        mid = low + datetime.timedelta(seconds=span / 2.0)
        eval_mid = evaluate_instant_geometry(
            mid, latitude_deg, longitude_deg, elevation_m, instrument_height_m, is_inside_dem
        )
        mid_state = eval_mid[target]["visibility_state"]

        if mid_state == state_a:
            low = mid
        else:
            high = mid

    # Return the mid-point of final bracket rounded to nearest second
    final_dt = low + datetime.timedelta(seconds=(high - low).total_seconds() / 2.0)
    return final_dt.replace(microsecond=0)


def aggregate_continuous_windows(
    samples: list[dict[str, Any]],
    target: str,
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float,
    instrument_height_m: float,
    is_inside_dem: bool,
    refinement_tolerance_sec: float,
) -> list[dict[str, Any]]:
    """
    Group sampled time points into continuous windows and refine transition boundaries.
    """
    if not samples:
        return []

    windows: list[dict[str, Any]] = []
    curr_state = samples[0][target]["visibility_state"]
    curr_start_dt = samples[0]["dt"]

    for i in range(1, len(samples)):
        sample_state = samples[i][target]["visibility_state"]
        if sample_state != curr_state:
            # Transition occurred between samples[i-1] and samples[i]
            dt_prev = samples[i - 1]["dt"]
            dt_curr = samples[i]["dt"]

            # Bisection refinement
            refined_transition_dt = refine_transition(
                dt_prev,
                curr_state,
                dt_curr,
                sample_state,
                target,
                latitude_deg,
                longitude_deg,
                elevation_m,
                instrument_height_m,
                is_inside_dem,
                tolerance_sec=refinement_tolerance_sec,
            )

            # Record completed window
            dur_hours = (refined_transition_dt - curr_start_dt).total_seconds() / 3600.0
            if dur_hours > 0:
                windows.append({
                    "start_utc": format_iso_utc(curr_start_dt),
                    "end_utc": format_iso_utc(refined_transition_dt),
                    "duration_hours": round(dur_hours, 3),
                    "state": curr_state,
                })

            curr_state = sample_state
            curr_start_dt = refined_transition_dt

    # Final window extending to the last sample
    last_dt = samples[-1]["dt"]
    dur_hours = (last_dt - curr_start_dt).total_seconds() / 3600.0
    if dur_hours > 0:
        windows.append({
            "start_utc": format_iso_utc(curr_start_dt),
            "end_utc": format_iso_utc(last_dt),
            "duration_hours": round(dur_hours, 3),
            "state": curr_state,
        })

    return windows


def calculate_mission_timeline(
    start_utc: str,
    end_utc: str,
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float = 0.0,
    instrument_height_m: float = 2.0,
    step_minutes: int = DEFAULT_STEP_MINUTES,
    refinement_tolerance_sec: int = DEFAULT_REFINEMENT_TOLERANCE_SEC,
) -> dict[str, Any]:
    """
    Calculate full time-dependent mission visibility windows for Sun and Earth.
    """
    start_dt = parse_iso_utc(start_utc)
    end_dt = parse_iso_utc(end_utc)
    validate_interval(start_dt, end_dt)

    if step_minutes < 1:
        step_minutes = 1

    # Ensure SPICE and DEM are loaded
    if not spice_service._initialized:
        spice_service.initialize()
    if not horizon_service._dem_loaded:
        horizon_service.load_dem_dataset()

    is_inside_dem = is_inside_site01(longitude_deg, latitude_deg)

    # 1. Generate time series samples
    sample_dts: list[datetime.datetime] = []
    curr_dt = start_dt
    step_delta = datetime.timedelta(minutes=step_minutes)

    while curr_dt < end_dt:
        sample_dts.append(curr_dt)
        curr_dt += step_delta
    # Ensure end_dt is explicitly sampled
    if not sample_dts or sample_dts[-1] != end_dt:
        sample_dts.append(end_dt)

    samples: list[dict[str, Any]] = []
    for dt in sample_dts:
        pt = evaluate_instant_geometry(
            dt=dt,
            latitude_deg=latitude_deg,
            longitude_deg=longitude_deg,
            elevation_m=elevation_m,
            instrument_height_m=instrument_height_m,
            is_inside_dem=is_inside_dem,
        )
        samples.append(pt)

    # 2. Continuous window grouping & transition refinement
    sun_windows = aggregate_continuous_windows(
        samples,
        "sun",
        latitude_deg,
        longitude_deg,
        elevation_m,
        instrument_height_m,
        is_inside_dem,
        refinement_tolerance_sec,
    )

    earth_windows = aggregate_continuous_windows(
        samples,
        "earth",
        latitude_deg,
        longitude_deg,
        elevation_m,
        instrument_height_m,
        is_inside_dem,
        refinement_tolerance_sec,
    )

    # 3. Compute summary statistics
    total_mission_hours = (end_dt - start_dt).total_seconds() / 3600.0

    # Sunlight metrics
    full_sun_hours = sum(w["duration_hours"] for w in sun_windows if w["state"] == "full_sunlight")
    partial_sun_hours = sum(w["duration_hours"] for w in sun_windows if w["state"] == "partial_sunlight")
    darkness_hours = sum(w["duration_hours"] for w in sun_windows if w["state"] == "total_darkness")
    unknown_sun_hours = sum(w["duration_hours"] for w in sun_windows if w["state"] == "unknown_insufficient_coverage")

    sun_windows_durations = [w["duration_hours"] for w in sun_windows if w["state"] in ("full_sunlight", "partial_sunlight")]
    dark_windows_durations = [w["duration_hours"] for w in sun_windows if w["state"] == "total_darkness"]
    max_continuous_sun_hours = max(sun_windows_durations) if sun_windows_durations else 0.0
    max_continuous_dark_hours = max(dark_windows_durations) if dark_windows_durations else 0.0

    # Earth LOS metrics
    full_earth_hours = sum(w["duration_hours"] for w in earth_windows if w["state"] == "full_disc_los")
    partial_earth_hours = sum(w["duration_hours"] for w in earth_windows if w["state"] in ("centre_only_los", "partial_disc_los"))
    occulted_earth_hours = sum(w["duration_hours"] for w in earth_windows if w["state"] == "occulted")
    unknown_earth_hours = sum(w["duration_hours"] for w in earth_windows if w["state"] == "unknown_insufficient_coverage")

    earth_windows_durations = [w["duration_hours"] for w in earth_windows if w["state"] in ("full_disc_los", "centre_only_los", "partial_disc_los")]
    max_continuous_earth_hours = max(earth_windows_durations) if earth_windows_durations else 0.0

    # Format samples for frontend JSON serialization (exclude raw datetime objects)
    serialized_samples = []
    for s in samples:
        serialized_samples.append({
            "timestamp_utc": s["timestamp_utc"],
            "sun": s["sun"],
            "earth": s["earth"],
        })

    return {
        "mission_scenario": {
            "start_utc": start_utc,
            "end_utc": end_utc,
            "total_duration_hours": round(total_mission_hours, 3),
            "step_minutes": step_minutes,
            "refinement_tolerance_sec": refinement_tolerance_sec,
            "sample_count": len(serialized_samples),
        },
        "site": {
            "latitude_deg": latitude_deg,
            "longitude_deg": longitude_deg,
            "elevation_m": elevation_m,
            "instrument_height_m": instrument_height_m,
            "is_inside_dem": is_inside_dem,
            "dem_dataset": "NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)" if is_inside_dem else "Outside high-res DEM footprint (16x16 km)",
        },
        "summary": {
            "sunlight": {
                "full_sunlight_hours": round(full_sun_hours, 2),
                "full_sunlight_percent": round(full_sun_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "partial_sunlight_hours": round(partial_sun_hours, 2),
                "partial_sunlight_percent": round(partial_sun_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "total_darkness_hours": round(darkness_hours, 2),
                "total_darkness_percent": round(darkness_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "unknown_coverage_hours": round(unknown_sun_hours, 2),
                "max_continuous_sunlight_hours": round(max_continuous_sun_hours, 2),
                "max_continuous_darkness_hours": round(max_continuous_dark_hours, 2),
                "transition_count": len(sun_windows) - 1 if len(sun_windows) > 1 else 0,
            },
            "earth_los": {
                "full_disc_los_hours": round(full_earth_hours, 2),
                "full_disc_los_percent": round(full_earth_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "partial_disc_los_hours": round(partial_earth_hours, 2),
                "partial_disc_los_percent": round(partial_earth_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "occulted_hours": round(occulted_earth_hours, 2),
                "occulted_percent": round(occulted_earth_hours / total_mission_hours * 100.0, 1) if total_mission_hours > 0 else 0.0,
                "unknown_coverage_hours": round(unknown_earth_hours, 2),
                "max_continuous_los_hours": round(max_continuous_earth_hours, 2),
                "transition_count": len(earth_windows) - 1 if len(earth_windows) > 1 else 0,
                "communication_disclaimer": (
                    "Potential Direct-to-Earth Line of Sight represents geometric and terrain optical clearance only. "
                    "Operational RF communication requires ground-station tracking availability, antenna pointing, "
                    "transmit power, and frequency-specific link margin constraints."
                ),
            },
        },
        "sun_windows": sun_windows,
        "earth_windows": earth_windows,
        "samples": serialized_samples,
    }
