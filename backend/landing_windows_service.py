"""
landing_windows_service.py — LUNAOPS Landing Date Window Scanner.

Scans a user-specified date range (typically 1–3 months) at 6-hour granularity,
aggregating per-day statistics for:
  - Sun illumination: hours of sunlight, darkness, partial illumination
  - Earth LOS:        hours of direct-to-Earth line-of-sight communication
  - Landing Safety:   composite safety rating based on illumination + comms

All values are computed from real NASA/JPL SPICE ephemerides — no values are
fabricated.  The 6-hour step is deliberately coarser than the full mission
timeline (which uses 1-hour steps) to keep calendar scans responsive
(scanning 90 days completes in ~5–10 seconds rather than ~60+ seconds).
"""

from __future__ import annotations

import datetime
import math
import logging
from typing import Any, Optional

import spice_service
import horizon_service
from horizon_service import is_inside_site01, compute_azimuth_horizon

logger = logging.getLogger("lunaops.landing_windows")

# ── Physical constants ───────────────────────────────────────────────────────
SUN_RADIUS_KM = 696340.0
EARTH_RADIUS_KM = 6371.0
SCAN_STEP_HOURS = 6  # Coarser step for fast calendar scanning


def _classify_sun_state(
    sun_el_deg: float,
    horizon_el_deg: float | None,
    sun_angular_radius_deg: float,
    is_inside_dem: bool,
) -> str:
    """Classify sunlight state for a single sample."""
    if sun_el_deg < -90.0:
        return "total_darkness"

    effective_horizon = 0.0
    if is_inside_dem and horizon_el_deg is not None:
        effective_horizon = horizon_el_deg

    bottom_of_disc = sun_el_deg - sun_angular_radius_deg
    top_of_disc = sun_el_deg + sun_angular_radius_deg

    if bottom_of_disc >= effective_horizon:
        return "full_sunlight"
    elif top_of_disc >= effective_horizon:
        return "partial_sunlight"
    else:
        return "total_darkness"


def _classify_earth_state(
    earth_el_deg: float,
    horizon_el_deg: float | None,
    earth_angular_radius_deg: float,
    is_inside_dem: bool,
) -> str:
    """Classify Earth LOS state for a single sample."""
    if earth_el_deg < -90.0:
        return "occulted"

    effective_horizon = 0.0
    if is_inside_dem and horizon_el_deg is not None:
        effective_horizon = horizon_el_deg

    bottom_of_disc = earth_el_deg - earth_angular_radius_deg
    top_of_disc = earth_el_deg + earth_angular_radius_deg

    if bottom_of_disc >= effective_horizon:
        return "full_disc_los"
    elif top_of_disc >= effective_horizon:
        return "partial_disc_los"
    else:
        return "occulted"


def scan_landing_windows(
    start_date: str,
    end_date: str,
    latitude_deg: float,
    longitude_deg: float,
    elevation_m: float = 0.0,
) -> dict[str, Any]:
    """
    Scan a date range and compute per-day landing safety metrics.

    Parameters
    ----------
    start_date : str
        Start date in ISO format (YYYY-MM-DD).
    end_date : str
        End date in ISO format (YYYY-MM-DD), inclusive.
    latitude_deg : float
        Lunar site latitude (South negative).
    longitude_deg : float
        Lunar site longitude (East-positive).
    elevation_m : float
        Site elevation above reference sphere in metres.

    Returns
    -------
    dict with:
        - days: list of per-day records with sunlight/earth/safety metrics
        - site: site parameters echoed back
        - scan_params: scan configuration
    """
    start_dt = datetime.datetime.strptime(start_date, "%Y-%m-%d").replace(
        tzinfo=datetime.timezone.utc
    )
    end_dt = datetime.datetime.strptime(end_date, "%Y-%m-%d").replace(
        tzinfo=datetime.timezone.utc
    )

    if end_dt <= start_dt:
        raise ValueError("end_date must be after start_date.")

    span_days = (end_dt - start_dt).days + 1
    if span_days > 180:
        raise ValueError("Maximum scan range is 180 days.")

    # Check if site is inside DEM for terrain-aware analysis
    inside_dem = is_inside_site01(longitude_deg, latitude_deg)

    # Lazy-load DEM
    if inside_dem and not horizon_service._dem_loaded:
        horizon_service.load_dem_dataset()

    effective_elevation_m = float(elevation_m) if elevation_m is not None else 0.0
    if inside_dem and horizon_service._dem_loaded:
        x0, y0 = horizon_service.selenographic_to_polar_stereo(longitude_deg, latitude_deg)
        dem_h = horizon_service.sample_dem_bilinear(horizon_service._dem_data, x0, y0)
        if math.isfinite(dem_h):
            effective_elevation_m = max(float(dem_h), effective_elevation_m)

    days: list[dict[str, Any]] = []
    samples_per_day = 24 // SCAN_STEP_HOURS  # 4 samples per day

    for day_offset in range(span_days):
        day_start = start_dt + datetime.timedelta(days=day_offset)
        date_str = day_start.strftime("%Y-%m-%d")

        sun_hours = {"full_sunlight": 0.0, "partial_sunlight": 0.0, "total_darkness": 0.0}
        earth_hours = {"full_disc_los": 0.0, "partial_disc_los": 0.0, "occulted": 0.0}

        sun_elevations: list[float] = []
        earth_elevations: list[float] = []

        for step in range(samples_per_day):
            sample_time = day_start + datetime.timedelta(hours=step * SCAN_STEP_HOURS)
            utc_str = sample_time.strftime("%Y-%m-%dT%H:%M:%SZ")

            try:
                geom = spice_service.compute_geometry(
                    utc_time=utc_str,
                    latitude_deg=latitude_deg,
                    longitude_deg=longitude_deg,
                    elevation_m=effective_elevation_m,
                )
            except Exception as exc:
                logger.warning("SPICE failed for %s: %s", utc_str, exc)
                continue

            sun_el = geom["sun"]["elevation_deg"]
            sun_az = geom["sun"]["azimuth_deg"]
            sun_dist = geom["sun"]["distance_km"]
            earth_el = geom["earth"]["elevation_deg"]
            earth_az = geom["earth"]["azimuth_deg"]
            earth_dist = geom["earth"]["distance_km"]

            sun_elevations.append(sun_el)
            earth_elevations.append(earth_el)

            # Compute apparent angular radii
            sun_angular_r = math.degrees(math.asin(min(1.0, SUN_RADIUS_KM / max(sun_dist, SUN_RADIUS_KM + 1))))
            earth_angular_r = math.degrees(math.asin(min(1.0, EARTH_RADIUS_KM / max(earth_dist, EARTH_RADIUS_KM + 1))))

            # Get terrain horizon if available
            sun_horizon_el = None
            earth_horizon_el = None
            if inside_dem and horizon_service._dem_loaded:
                try:
                    sun_res = compute_azimuth_horizon(
                        longitude_deg, latitude_deg, sun_az, effective_elevation_m
                    )
                    if isinstance(sun_res, dict) and "horizon_elevation_deg" in sun_res:
                        sun_horizon_el = float(sun_res["horizon_elevation_deg"])
                except Exception:
                    pass
                try:
                    earth_res = compute_azimuth_horizon(
                        longitude_deg, latitude_deg, earth_az, effective_elevation_m
                    )
                    if isinstance(earth_res, dict) and "horizon_elevation_deg" in earth_res:
                        earth_horizon_el = float(earth_res["horizon_elevation_deg"])
                except Exception:
                    pass

            sun_state = _classify_sun_state(sun_el, sun_horizon_el, sun_angular_r, inside_dem)
            earth_state = _classify_earth_state(earth_el, earth_horizon_el, earth_angular_r, inside_dem)

            sun_hours[sun_state] += SCAN_STEP_HOURS
            earth_hours[earth_state] += SCAN_STEP_HOURS

        # Compute safety score (0–100)
        total_hours = 24.0
        sunlight_frac = (sun_hours["full_sunlight"] + 0.5 * sun_hours["partial_sunlight"]) / total_hours
        earth_frac = (earth_hours["full_disc_los"] + 0.5 * earth_hours["partial_disc_los"]) / total_hours

        # Safety heuristic: 60% weight on sunlight (power/thermal), 40% on Earth LOS (comms)
        safety_score = round(min(100, (sunlight_frac * 60 + earth_frac * 40)), 1)

        # Determine safety rating label
        if safety_score >= 75:
            safety_rating = "excellent"
        elif safety_score >= 50:
            safety_rating = "good"
        elif safety_score >= 25:
            safety_rating = "marginal"
        else:
            safety_rating = "poor"

        # Determine if day is "safe" for landing (requires both sun AND comms)
        is_safe = (
            sun_hours["full_sunlight"] >= 6.0
            and earth_hours["full_disc_los"] >= 6.0
        )

        avg_sun_el = sum(sun_elevations) / len(sun_elevations) if sun_elevations else 0.0
        avg_earth_el = sum(earth_elevations) / len(earth_elevations) if earth_elevations else 0.0

        days.append({
            "date": date_str,
            "sunlight": {
                "full_hours": round(sun_hours["full_sunlight"], 1),
                "partial_hours": round(sun_hours["partial_sunlight"], 1),
                "darkness_hours": round(sun_hours["total_darkness"], 1),
                "avg_elevation_deg": round(avg_sun_el, 2),
            },
            "earth_los": {
                "full_hours": round(earth_hours["full_disc_los"], 1),
                "partial_hours": round(earth_hours["partial_disc_los"], 1),
                "occulted_hours": round(earth_hours["occulted"], 1),
                "avg_elevation_deg": round(avg_earth_el, 2),
            },
            "safety_score": safety_score,
            "safety_rating": safety_rating,
            "is_safe_for_landing": is_safe,
        })

    return {
        "site": {
            "latitude_deg": latitude_deg,
            "longitude_deg": longitude_deg,
            "elevation_m": elevation_m,
            "is_inside_dem": inside_dem,
        },
        "scan_params": {
            "start_date": start_date,
            "end_date": end_date,
            "total_days": span_days,
            "step_hours": SCAN_STEP_HOURS,
            "samples_per_day": samples_per_day,
        },
        "days": days,
        "summary": {
            "safe_days_count": sum(1 for d in days if d["is_safe_for_landing"]),
            "excellent_days_count": sum(1 for d in days if d["safety_rating"] == "excellent"),
            "best_window_start": _find_best_window(days),
        },
    }


def _find_best_window(days: list[dict]) -> str | None:
    """Find the start date of the longest consecutive safe-landing streak."""
    best_start: str | None = None
    best_length = 0
    current_start: str | None = None
    current_length = 0

    for d in days:
        if d["is_safe_for_landing"]:
            if current_start is None:
                current_start = d["date"]
            current_length += 1
            if current_length > best_length:
                best_length = current_length
                best_start = current_start
        else:
            current_start = None
            current_length = 0

    return best_start
