"""
comparison_service.py — LUNAOPS Multi-Scenario Candidate Comparison Engine.

Provides scientific orchestration for comparing landing scenarios side by side:
1. Validates each scenario's coordinates, SPICE time coverage (DE440s 1900-2050 UTC),
   and terrain data coverage (NASA LOLA Site 01 5m/px GeoTIFF footprint).
2. Calculates or reuses topocentric geometry and time-dependent visibility windows (SPICE + terrain horizon ray-marching).
3. Computes slope, elevation, and uncertainty statistics from local high-resolution DEM if covered.
4. Evaluates user-defined constraints:
   - min_sunlight_percent: % of mission with full or partial solar illumination
   - min_earth_los_percent: % of mission with direct line-of-sight to Earth
   - max_slope_deg: maximum tolerable terrain landing slope
   - max_continuous_darkness_hours: battery survival threshold
   - min_elevation_m: topographic clearance
   Constraint evaluation returns:
   - met: condition mathematically satisfied by actual computed values
   - unmet: condition violated by actual computed values
   - unevaluable: metric is missing/unavailable (e.g. site is outside DEM for slope)
5. Multi-criteria ranking with transparent criteria and normalized weights:
   - Identifies any unevaluable metrics and discounts/excludes them transparently
   - Disclaims that no ranking establishes landing safety
6. Complete provenance, units, data sources, and scientific disclaimers.
"""

from __future__ import annotations

import os
import datetime
import math
import logging
from typing import Any, Optional
import numpy as np

import spice_service
import horizon_service
import timeline_service
from horizon_service import (
    is_inside_site01,
    selenographic_to_polar_stereo,
    ORIGIN_X,
    ORIGIN_Y,
    PIXEL_SIZE,
    MIN_X,
    MAX_X,
    MIN_Y,
    MAX_Y,
)

logger = logging.getLogger("lunaops.comparison")

# ── Planetary & Kernel Constants ──────────────────────────────────────────────
DE440S_MIN_YEAR = 1900
DE440S_MAX_YEAR = 2050

# Global caches for slope and uncertainty rasters
_slp_data: Optional[np.ndarray] = None
_err_data: Optional[np.ndarray] = None
_rasters_loaded: bool = False


def load_additional_rasters() -> bool:
    """Load Site 01 slope and uncertainty rasters into memory."""
    global _slp_data, _err_data, _rasters_loaded
    if _rasters_loaded and _slp_data is not None and _err_data is not None:
        return True

    slp_path = os.path.join(horizon_service.SITE01_DIR, "Site01_final_adj_5mpp_slp.tif")
    err_path = os.path.join(horizon_service.SITE01_DIR, "Site01_final_adj_5mpp_toterr.tif")

    if not (os.path.exists(slp_path) and os.path.exists(err_path)):
        logger.warning("Site 01 slp or toterr GeoTIFF not found in %s", horizon_service.SITE01_DIR)
        return False

    try:
        import rasterio
        with rasterio.open(slp_path) as ds_slp:
            _slp_data = ds_slp.read(1).astype(np.float32)
        with rasterio.open(err_path) as ds_err:
            _err_data = ds_err.read(1).astype(np.float32)
        _rasters_loaded = True
        return True
    except Exception as exc:
        logger.error("Failed loading additional Site 01 rasters: %s", exc)
        return False


def sample_terrain_statistics(
    lon_deg: float,
    lat_deg: float,
    radius_m: float = 100.0,
) -> dict[str, Any]:
    """
    Extract slope, elevation, and uncertainty statistics around a landing site coordinate.
    If outside Site 01 16x16 km coverage, returns coverage_available=False with None metrics.
    Never fabricates values or substitutes zero for missing metrics.
    """
    if not is_inside_site01(lon_deg, lat_deg):
        return {
            "coverage_available": False,
            "dataset_name": None,
            "sample_radius_m": radius_m,
            "elevation": None,
            "slope": None,
            "uncertainty": None,
            "note": "Site is outside NASA LOLA Artemis Site 01 5m/px DEM footprint (16x16 km). Terrain statistics unavailable.",
        }

    # Ensure DEM and rasters are loaded
    if not horizon_service._dem_loaded:
        horizon_service.load_dem_dataset()
    if not _rasters_loaded:
        load_additional_rasters()

    surf = horizon_service._dem_data
    slp = _slp_data
    err = _err_data

    if surf is None:
        return {
            "coverage_available": False,
            "dataset_name": "NASA LOLA Artemis Site 01 (5 m/px)",
            "sample_radius_m": radius_m,
            "elevation": None,
            "slope": None,
            "uncertainty": None,
            "note": "DEM dataset could not be accessed.",
        }

    x, y = selenographic_to_polar_stereo(lon_deg, lat_deg)
    col = int(round((x - ORIGIN_X) / PIXEL_SIZE))
    row = int(round((ORIGIN_Y - y) / PIXEL_SIZE))

    # Radius in pixels
    pix_rad = max(1, int(round(radius_m / PIXEL_SIZE)))
    r_min = max(0, row - pix_rad)
    r_max = min(surf.shape[0], row + pix_rad + 1)
    c_min = max(0, col - pix_rad)
    c_max = min(surf.shape[1], col + pix_rad + 1)

    win_surf = surf[r_min:r_max, c_min:c_max]
    valid_surf = win_surf[np.isfinite(win_surf)]

    elev_stats: Optional[dict[str, Any]] = None
    if len(valid_surf) > 0:
        elev_stats = {
            "point_m": round(float(surf[max(0, min(surf.shape[0]-1, row)), max(0, min(surf.shape[1]-1, col))]), 2),
            "mean_m": round(float(np.mean(valid_surf)), 2),
            "min_m": round(float(np.min(valid_surf)), 2),
            "max_m": round(float(np.max(valid_surf)), 2),
            "std_m": round(float(np.std(valid_surf)), 2),
            "roughness_m": round(float(np.max(valid_surf) - np.min(valid_surf)), 2),
        }

    slope_stats: Optional[dict[str, Any]] = None
    if slp is not None:
        win_slp = slp[r_min:r_max, c_min:c_max]
        valid_slp = win_slp[np.isfinite(win_slp)]
        if len(valid_slp) > 0:
            slope_stats = {
                "point_deg": round(float(slp[max(0, min(slp.shape[0]-1, row)), max(0, min(slp.shape[1]-1, col))]), 2),
                "mean_deg": round(float(np.mean(valid_slp)), 2),
                "min_deg": round(float(np.min(valid_slp)), 2),
                "max_deg": round(float(np.max(valid_slp)), 2),
                "std_deg": round(float(np.std(valid_slp)), 2),
            }

    err_stats: Optional[dict[str, Any]] = None
    if err is not None:
        win_err = err[r_min:r_max, c_min:c_max]
        valid_err = win_err[np.isfinite(win_err)]
        if len(valid_err) > 0:
            err_stats = {
                "point_m": round(float(err[max(0, min(err.shape[0]-1, row)), max(0, min(err.shape[1]-1, col))]), 2),
                "mean_m": round(float(np.mean(valid_err)), 2),
                "max_m": round(float(np.max(valid_err)), 2),
            }

    return {
        "coverage_available": True,
        "dataset_name": "NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)",
        "sample_radius_m": radius_m,
        "pixel_samples_count": int(len(valid_surf)),
        "elevation": elev_stats,
        "slope": slope_stats,
        "uncertainty": err_stats,
        "note": "Topographic statistics sampled within landing zone radius from 5 m/px LOLA GeoTIFFs.",
    }


def validate_scenario_prerequisites(
    latitude_deg: float,
    longitude_deg: float,
    start_utc: str,
    end_utc: str,
) -> dict[str, Any]:
    """
    Validate coordinates, SPICE kernel coverage, and terrain footprint before running analysis.
    """
    errors: list[str] = []
    warnings: list[str] = []

    # Coordinates
    if not (-90.0 <= latitude_deg <= 90.0):
        errors.append(f"Latitude {latitude_deg}° is outside lunar legal range [-90.0, +90.0].")
    if not (-180.0 <= longitude_deg <= 360.0):
        errors.append(f"Longitude {longitude_deg}° is outside valid range [-180.0, 360.0].")

    # Time Parsing & SPICE bounds
    try:
        start_dt = timeline_service.parse_iso_utc(start_utc)
        end_dt = timeline_service.parse_iso_utc(end_utc)
        if start_dt >= end_dt:
            errors.append(f"Mission start ({start_utc}) must precede mission end ({end_utc}).")
        else:
            span_days = (end_dt - start_dt).total_seconds() / 86400.0
            if span_days > 365:
                errors.append(f"Mission duration ({span_days:.1f} days) exceeds maximum 365 days.")
            if start_dt.year < DE440S_MIN_YEAR or end_dt.year > DE440S_MAX_YEAR:
                errors.append(
                    f"Requested interval [{start_dt.year}..{end_dt.year}] is outside JPL DE440s SPICE ephemeris bounds [{DE440S_MIN_YEAR}..{DE440S_MAX_YEAR}]."
                )
    except Exception as exc:
        errors.append(f"Invalid ISO-8601 UTC timestamp: {exc}")

    # Terrain coverage
    is_dem = is_inside_site01(longitude_deg, latitude_deg)
    if not is_dem:
        warnings.append(
            "Location is outside high-resolution Site 01 5m/px DEM footprint. Geometric SPICE calculations will proceed, but terrain-dependent slope, skyline occlusion, and clearance will be unavailable."
        )

    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings,
        "is_inside_dem": is_dem,
    }


def evaluate_scenario_constraints(
    summary: dict[str, Any],
    terrain_stats: dict[str, Any],
    constraints: dict[str, Any],
) -> dict[str, Any]:
    """
    Evaluate user-defined landing constraints against actual computed results.
    Constraint status can be:
    - 'met': condition mathematically satisfied
    - 'unmet': condition mathematically violated
    - 'unevaluable': metric is unavailable (missing DEM or data coverage)
    """
    results: list[dict[str, Any]] = []

    sunlight = summary.get("sunlight", {})
    earth_los = summary.get("earth_los", {})
    slope_info = terrain_stats.get("slope") if terrain_stats.get("coverage_available") else None
    elev_info = terrain_stats.get("elevation") if terrain_stats.get("coverage_available") else None

    # 1. Min Sunlight Percent
    if "min_sunlight_percent" in constraints and constraints["min_sunlight_percent"] is not None:
        target = float(constraints["min_sunlight_percent"])
        # Illumination includes full + partial sunlight
        full_pct = sunlight.get("full_sunlight_percent", 0.0)
        part_pct = sunlight.get("partial_sunlight_percent", 0.0)
        total_sun_pct = round(full_pct + part_pct, 1)
        unknown_hrs = sunlight.get("unknown_coverage_hours", 0.0)

        if unknown_hrs > 0 and total_sun_pct < target:
            # If outside DEM, terrain-aware illumination is unevaluable
            results.append({
                "id": "min_sunlight_percent",
                "label": "Minimum Illumination Coverage",
                "threshold": f"≥ {target}%",
                "actual": f"{total_sun_pct}% (terrain unknown)",
                "status": "unevaluable",
                "reason": "Site is outside DEM coverage; terrain blockage cannot be computed to evaluate sunlight.",
            })
        else:
            status = "met" if total_sun_pct >= target else "unmet"
            results.append({
                "id": "min_sunlight_percent",
                "label": "Minimum Illumination Coverage",
                "threshold": f"≥ {target}%",
                "actual": f"{total_sun_pct}%",
                "status": status,
                "reason": f"Total solar illumination is {total_sun_pct}%, threshold is {target}%.",
            })

    # 2. Min Earth Direct-to-Earth LOS Percent
    if "min_earth_los_percent" in constraints and constraints["min_earth_los_percent"] is not None:
        target = float(constraints["min_earth_los_percent"])
        full_pct = earth_los.get("full_disc_los_percent", 0.0)
        part_pct = earth_los.get("partial_disc_los_percent", 0.0)
        total_earth_pct = round(full_pct + part_pct, 1)
        unknown_hrs = earth_los.get("unknown_coverage_hours", 0.0)

        if unknown_hrs > 0 and total_earth_pct < target:
            results.append({
                "id": "min_earth_los_percent",
                "label": "Minimum Direct-to-Earth Visibility",
                "threshold": f"≥ {target}%",
                "actual": f"{total_earth_pct}% (terrain unknown)",
                "status": "unevaluable",
                "reason": "Site is outside DEM coverage; local skyline clearance cannot be computed.",
            })
        else:
            status = "met" if total_earth_pct >= target else "unmet"
            results.append({
                "id": "min_earth_los_percent",
                "label": "Minimum Direct-to-Earth Visibility",
                "threshold": f"≥ {target}%",
                "actual": f"{total_earth_pct}%",
                "status": status,
                "reason": f"Direct-to-Earth line-of-sight is {total_earth_pct}%, threshold is {target}%.",
            })

    # 3. Max Slope Degrees
    if "max_slope_deg" in constraints and constraints["max_slope_deg"] is not None:
        target = float(constraints["max_slope_deg"])
        if slope_info is None or slope_info.get("max_deg") is None:
            results.append({
                "id": "max_slope_deg",
                "label": "Maximum Landing Site Slope",
                "threshold": f"≤ {target}°",
                "actual": "N/A (No DEM)",
                "status": "unevaluable",
                "reason": "Site lacks high-resolution slope raster coverage (outside Site 01 16x16 km tile).",
            })
        else:
            actual_max_slope = slope_info["max_deg"]
            status = "met" if actual_max_slope <= target else "unmet"
            results.append({
                "id": "max_slope_deg",
                "label": "Maximum Landing Site Slope",
                "threshold": f"≤ {target}°",
                "actual": f"{actual_max_slope}° (mean {slope_info.get('mean_deg', 0.0)}°)",
                "status": status,
                "reason": f"Maximum local slope is {actual_max_slope}°, limit is {target}°.",
            })

    # 4. Max Continuous Darkness Duration (Battery limit)
    if "max_continuous_darkness_hours" in constraints and constraints["max_continuous_darkness_hours"] is not None:
        target = float(constraints["max_continuous_darkness_hours"])
        actual_dark = sunlight.get("max_continuous_darkness_hours", 0.0)
        unknown_hrs = sunlight.get("unknown_coverage_hours", 0.0)

        if unknown_hrs > 0:
            results.append({
                "id": "max_continuous_darkness_hours",
                "label": "Maximum Continuous Darkness",
                "threshold": f"≤ {target} hrs",
                "actual": f"{actual_dark} hrs (partial)",
                "status": "unevaluable",
                "reason": "Terrain shadowing cannot be modeled without DEM coverage.",
            })
        else:
            status = "met" if actual_dark <= target else "unmet"
            results.append({
                "id": "max_continuous_darkness_hours",
                "label": "Maximum Continuous Darkness",
                "threshold": f"≤ {target} hrs",
                "actual": f"{actual_dark} hrs",
                "status": status,
                "reason": f"Longest continuous dark period is {actual_dark} hrs, limit is {target} hrs.",
            })

    # 5. Min Site Elevation (Topographic clearance)
    if "min_elevation_m" in constraints and constraints["min_elevation_m"] is not None:
        target = float(constraints["min_elevation_m"])
        if elev_info is None or elev_info.get("mean_m") is None:
            results.append({
                "id": "min_elevation_m",
                "label": "Minimum Surface Elevation",
                "threshold": f"≥ {target} m",
                "actual": "N/A (No DEM)",
                "status": "unevaluable",
                "reason": "High-resolution DEM elevation data unavailable outside Site 01.",
            })
        else:
            actual_elev = elev_info["mean_m"]
            status = "met" if actual_elev >= target else "unmet"
            results.append({
                "id": "min_elevation_m",
                "label": "Minimum Surface Elevation",
                "threshold": f"≥ {target} m",
                "actual": f"{actual_elev} m",
                "status": status,
                "reason": f"Mean local elevation is {actual_elev} m, threshold is {target} m.",
            })

    # Overall constraints summary
    met_count = sum(1 for r in results if r["status"] == "met")
    unmet_count = sum(1 for r in results if r["status"] == "unmet")
    uneval_count = sum(1 for r in results if r["status"] == "unevaluable")

    return {
        "items": results,
        "met_count": met_count,
        "unmet_count": unmet_count,
        "unevaluable_count": uneval_count,
        "all_met": (unmet_count == 0 and uneval_count == 0 and len(results) > 0),
    }


def compute_multi_criteria_ranking(
    scenarios_eval: list[dict[str, Any]],
    weights: Optional[dict[str, float]] = None,
) -> dict[str, Any]:
    """
    Transparent Multi-Criteria Decision Analysis (MCDA) ranking.
    Criteria:
    - sunlight_pct (default weight: 0.35)
    - earth_los_pct (default weight: 0.25)
    - low_slope (default weight: 0.20, penalized if slope is high)
    - min_darkness (default weight: 0.20, preference for shorter max dark periods)

    IMPORTANT SCIENTIFIC INTEGRITY RULES:
    1. Criteria and normalized weights are fully exposed.
    2. Any unevaluable metric (e.g. slope outside DEM) is explicitly flagged and excluded
       from the score calculation, and the candidate's score is marked with 'has_unevaluable_metrics'.
    3. Prominent disclaimer: Rankings are a comparative numerical guide based on selected criteria
       and do NOT establish landing safety or formal operational site certification.
    """
    raw_weights = weights or {
        "sunlight_pct": 0.35,
        "earth_los_pct": 0.25,
        "low_slope": 0.20,
        "min_darkness": 0.20,
    }

    # Normalize weights
    tot_w = sum(raw_weights.values())
    norm_weights = {k: v / tot_w if tot_w > 0 else 0.25 for k, v in raw_weights.items()}

    ranked_items: list[dict[str, Any]] = []

    for sc in scenarios_eval:
        sid = sc["scenario_id"]
        sname = sc.get("scenario_name", sid)
        summary = sc.get("timeline_result", {}).get("summary", {})
        terrain = sc.get("terrain_statistics", {})
        cov = terrain.get("coverage_available", False)

        sunlight = summary.get("sunlight", {})
        earth_los = summary.get("earth_los", {})

        sun_pct = sunlight.get("full_sunlight_percent", 0.0) + sunlight.get("partial_sunlight_percent", 0.0)
        earth_pct = earth_los.get("full_disc_los_percent", 0.0) + earth_los.get("partial_disc_los_percent", 0.0)
        max_dark = sunlight.get("max_continuous_darkness_hours", 0.0)
        mission_hrs = sc.get("timeline_result", {}).get("mission_scenario", {}).get("total_duration_hours", 48.0)

        unevaluable_reasons: list[str] = []

        # Criteria scores normalized [0..100]
        criteria_scores: dict[str, Optional[float]] = {}

        # 1. Sunlight score
        if sunlight.get("unknown_coverage_hours", 0.0) > 0 and not cov:
            criteria_scores["sunlight_pct"] = None
            unevaluable_reasons.append("Sunlight is unevaluable due to missing DEM skyline.")
        else:
            criteria_scores["sunlight_pct"] = max(0.0, min(100.0, sun_pct))

        # 2. Earth LOS score
        if earth_los.get("unknown_coverage_hours", 0.0) > 0 and not cov:
            criteria_scores["earth_los_pct"] = None
            unevaluable_reasons.append("Earth LOS is unevaluable due to missing DEM skyline.")
        else:
            criteria_scores["earth_los_pct"] = max(0.0, min(100.0, earth_pct))

        # 3. Slope score: 0° slope = 100, 20° slope = 0
        if cov and terrain.get("slope") and terrain["slope"].get("max_deg") is not None:
            max_slp = terrain["slope"]["max_deg"]
            # Linear decay from 0° (100) to 25° (0)
            slp_score = max(0.0, min(100.0, (1.0 - (max_slp / 25.0)) * 100.0))
            criteria_scores["low_slope"] = round(slp_score, 1)
        else:
            criteria_scores["low_slope"] = None
            unevaluable_reasons.append("Terrain slope is unevaluable outside high-res DEM.")

        # 4. Minimum darkness score: 0 hrs darkness = 100, full mission dark = 0
        if sunlight.get("unknown_coverage_hours", 0.0) > 0 and not cov:
            criteria_scores["min_darkness"] = None
            unevaluable_reasons.append("Continuous darkness duration is unevaluable.")
        else:
            dark_ratio = max_dark / mission_hrs if mission_hrs > 0 else 0.0
            dark_score = max(0.0, min(100.0, (1.0 - dark_ratio) * 100.0))
            criteria_scores["min_darkness"] = round(dark_score, 1)

        # Compute weighted sum across evaluable criteria only
        active_weight_sum = 0.0
        weighted_score_accum = 0.0

        for crit, w in norm_weights.items():
            sc_val = criteria_scores.get(crit)
            if sc_val is not None:
                active_weight_sum += w
                weighted_score_accum += sc_val * w

        composite_score = round(weighted_score_accum / active_weight_sum, 1) if active_weight_sum > 0 else 0.0

        ranked_items.append({
            "scenario_id": sid,
            "scenario_name": sname,
            "composite_score": composite_score,
            "has_unevaluable_metrics": len(unevaluable_reasons) > 0,
            "unevaluable_reasons": unevaluable_reasons,
            "criteria_scores": criteria_scores,
            "effective_weight_coverage": round(active_weight_sum, 3),
        })

    # Sort descending by composite score
    ranked_items.sort(key=lambda x: x["composite_score"], reverse=True)

    # Assign ranks
    for idx, item in enumerate(ranked_items, start=1):
        item["rank"] = idx

    return {
        "applied_weights": norm_weights,
        "ranking": ranked_items,
        "disclaimer": (
            "Multi-criteria scores and rankings are relative mathematical comparisons based solely "
            "on user-selected weighting criteria. Neither a high ranking nor low slope/illumination "
            "establishes landing safety. Complete certification requires hazard distribution (boulders, craters), "
            "geotechnical regolith bearing strength, approach corridor clearance, and precision landing guidance."
        ),
    }


def compare_candidate_scenarios(
    scenarios: list[dict[str, Any]],
    constraints: Optional[dict[str, Any]] = None,
    ranking_weights: Optional[dict[str, float]] = None,
) -> dict[str, Any]:
    """
    Main orchestration function for Candidate-Site Comparison.
    Validates, computes, evaluates constraints, extracts side-by-side metrics,
    and returns fully structured comparison data.
    """
    if len(scenarios) < 2:
        raise ValueError("Candidate comparison requires at least two scenarios.")

    eval_results: list[dict[str, Any]] = []

    for sc in scenarios:
        sid = sc.get("id", f"sc-{len(eval_results)+1}")
        sname = sc.get("name", f"Candidate {len(eval_results)+1}")
        lat = float(sc["latitude_deg"])
        lon = float(sc["longitude_deg"])
        elev_m = float(sc.get("elevation_m", 0.0))
        start_utc = sc["start_utc"]
        end_utc = sc["end_utc"]
        inst_h = float(sc.get("instrument_height_m", 2.0))
        step_min = int(sc.get("step_minutes", 60))

        # 1. Validate prerequisites
        val = validate_scenario_prerequisites(lat, lon, start_utc, end_utc)
        if not val["valid"]:
            raise ValueError(f"Scenario '{sname}' validation error: {'; '.join(val['errors'])}")

        # 2. Compute or reuse timeline visibility
        timeline_res = timeline_service.calculate_mission_timeline(
            start_utc=start_utc,
            end_utc=end_utc,
            latitude_deg=lat,
            longitude_deg=lon,
            elevation_m=elev_m,
            instrument_height_m=inst_h,
            step_minutes=step_min,
        )

        # 3. Sample local terrain statistics (slope, roughness, uncertainty)
        terrain_stats = sample_terrain_statistics(lon, lat, radius_m=100.0)

        # 4. Evaluate constraints if provided
        constraint_eval = evaluate_scenario_constraints(
            timeline_res["summary"],
            terrain_stats,
            constraints or {},
        )

        eval_results.append({
            "scenario_id": sid,
            "scenario_name": sname,
            "inputs": {
                "latitude_deg": lat,
                "longitude_deg": lon,
                "elevation_m": elev_m,
                "instrument_height_m": inst_h,
                "start_utc": start_utc,
                "end_utc": end_utc,
                "step_minutes": step_min,
            },
            "validation": val,
            "timeline_result": timeline_res,
            "terrain_statistics": terrain_stats,
            "constraints_evaluation": constraint_eval,
        })

    # 5. Multi-criteria ranking
    ranking_data = compute_multi_criteria_ranking(eval_results, ranking_weights)

    # 6. Assemble side-by-side comparison summary table
    comparison_table = []
    for sc in eval_results:
        inputs = sc["inputs"]
        sum_tl = sc["timeline_result"]["summary"]
        sun = sum_tl["sunlight"]
        earth = sum_tl["earth_los"]
        terrain = sc["terrain_statistics"]
        cov = terrain["coverage_available"]

        # Elevation and slope readouts
        elev_str = f"{inputs['elevation_m']:.1f} m (User/Sphere)"
        if cov and terrain.get("elevation") and terrain["elevation"].get("mean_m") is not None:
            elev_str = f"{terrain['elevation']['mean_m']:.1f} m (5m DEM mean)"

        slope_str = "Unavailable (Outside DEM)"
        if cov and terrain.get("slope") and terrain["slope"].get("max_deg") is not None:
            slope_str = f"{terrain['slope']['mean_deg']:.1f}° mean / {terrain['slope']['max_deg']:.1f}° max"

        toterr_str = "Unavailable (Outside DEM)"
        if cov and terrain.get("uncertainty") and terrain["uncertainty"].get("mean_m") is not None:
            toterr_str = f"±{terrain['uncertainty']['mean_m']:.2f} m"

        comparison_table.append({
            "scenario_id": sc["scenario_id"],
            "scenario_name": sc["scenario_name"],
            "location": f"{abs(inputs['latitude_deg']):.3f}°S, {inputs['longitude_deg']:.2f}°E",
            "time_range": f"{inputs['start_utc']} → {inputs['end_utc']}",
            "duration_hours": sc["timeline_result"]["mission_scenario"]["total_duration_hours"],
            "dem_coverage": "NASA Site 01 5m/px (16x16 km)" if cov else "Outside DEM (Sphere Only)",
            "illumination_duration_hours": round(sun["full_sunlight_hours"] + sun["partial_sunlight_hours"], 2),
            "illumination_percent": round(sun["full_sunlight_percent"] + sun["partial_sunlight_percent"], 1),
            "max_continuous_sunlight_hours": sun["max_continuous_sunlight_hours"],
            "max_continuous_darkness_hours": sun["max_continuous_darkness_hours"],
            "earth_los_duration_hours": round(earth["full_disc_los_hours"] + earth["partial_disc_los_hours"], 2),
            "earth_los_percent": round(earth["full_disc_los_percent"] + earth["partial_disc_los_percent"], 1),
            "max_continuous_earth_los_hours": earth["max_continuous_los_hours"],
            "elevation_readout": elev_str,
            "slope_readout": slope_str,
            "uncertainty_readout": toterr_str,
            "constraints_summary": f"{sc['constraints_evaluation']['met_count']} Met / {sc['constraints_evaluation']['unmet_count']} Unmet / {sc['constraints_evaluation']['unevaluable_count']} Unevaluable",
        })

    return {
        "compared_count": len(eval_results),
        "comparison_table": comparison_table,
        "scenarios": eval_results,
        "ranking": ranking_data,
        "scientific_notes": {
            "topocentric_geometry": "NASA JPL SPICE kernels (MOON_ME reference frame, DE440s ephemerides).",
            "terrain_skyline": "Ray-marched against NASA LOLA Artemis Site 01 5m/px Polar Stereographic DEM.",
            "operational_disclaimer": (
                "Direct-to-Earth Line of Sight represents geometric and terrain optical clearance only; "
                "no RF link margin is claimed without detailed ground station schedule and spacecraft antenna models. "
                "Landing safety requires hazard distribution, slope variance, and geotechnical soil stability."
            ),
        },
    }
