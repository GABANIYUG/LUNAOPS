"""
app.py — LUNAOPS FastAPI application.

Lifecycle
---------
  startup:  load the SPICE kernel collection once.
  shutdown: clear the SPICE kernel pool.

CORS
----
Development origins (localhost:5173, the default Vite dev server port) are
allowed.  The wildcard '*' is NOT used to avoid exposing the API to arbitrary
origins.

Endpoints
---------
  GET  /api/spice/health    — SPICE readiness check.
  POST /api/spice/geometry  — Sun/Earth geometry for a UTC time and site.
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

import spice_service
import horizon_service
import timeline_service
from schemas import (
    GeometryRequest,
    HorizonProfileRequest,
    HorizonVisibilityRequest,
    MissionTimelineRequest,
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("lunaops.app")


# ---------------------------------------------------------------------------
# Application lifespan
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load SPICE kernels on startup; clean up on shutdown."""
    logger.info("LUNAOPS backend starting — loading SPICE kernels…")
    try:
        spice_service.initialize()
        logger.info("SPICE ready.")
    except RuntimeError as exc:
        # Log the error but allow the app to start so /health can report it.
        logger.error("SPICE initialisation failed: %s", exc)

    yield  # Application is running

    logger.info("LUNAOPS backend shutting down — clearing SPICE kernel pool…")
    spice_service.shutdown()


# ---------------------------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="LUNAOPS SPICE API",
    description=(
        "NASA/JPL SPICE geometry backend for the LUNAOPS Lunar Mission Browser. "
        "Provides Sun and Earth position/angle data relative to lunar surface sites."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS: allow only the Vite dev server (localhost and 127.0.0.1, port 5173)
# and the Vite preview server (port 4173).  Adjust for production deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
)


# ---------------------------------------------------------------------------
# Health endpoint
# ---------------------------------------------------------------------------

@app.get(
    "/api/spice/health",
    summary="SPICE service health check",
    response_model=dict,
    tags=["SPICE"],
)
async def health() -> dict[str, Any]:
    """
    Return the SPICE initialisation status, kernel availability, frame
    availability, and whether a diagnostic geometry calculation succeeds.

    Filesystem paths are NOT included in the response.
    """
    status_info = spice_service.get_status()

    overall_ok = (
        status_info["initialized"]
        and status_info["kernels_present"]
        and status_info["frame_available"]
        and status_info["diagnostic_calculation"]
    )

    return {
        "status": "ok" if overall_ok else "degraded",
        "initialized": status_info["initialized"],
        "kernels_present": status_info["kernels_present"],
        "missing_kernels": status_info["missing_kernels"],
        "reference_frame": status_info["reference_frame"],
        "frame_available": status_info["frame_available"],
        "diagnostic_calculation": status_info["diagnostic_calculation"],
        "error": status_info["error"],
    }


# ---------------------------------------------------------------------------
# Geometry endpoint
# ---------------------------------------------------------------------------

@app.post(
    "/api/spice/geometry",
    summary="Compute Sun/Earth geometry for a lunar surface site",
    response_model=dict,
    tags=["SPICE"],
)
async def geometry(request: GeometryRequest) -> dict[str, Any]:
    """
    Compute the geometric positions of the Sun and Earth relative to the Moon
    and a specified surface site.

    All values are calculated by SPICE at request time.  No values are
    hardcoded or fabricated.

    **Aberration correction**: NONE (geometric).  The returned directions are
    instantaneous geometric directions, not apparent (light-time corrected)
    directions.

    **Terrain occlusion**: NOT computed.  A positive geometric elevation does
    not guarantee that the target is visible from the site; terrain relief may
    block the line of sight.  Terrain-aware visibility requires DEM ray-casting
    (step 6).
    """
    if not spice_service._initialized:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "error": "SPICE not initialised",
                "message": spice_service._init_error or "Call /api/spice/health for details.",
            },
        )

    try:
        result = spice_service.compute_geometry(
            utc_time=request.utc_time,
            latitude_deg=request.latitude_deg,
            longitude_deg=request.longitude_deg,
            elevation_m=request.elevation_m,
        )
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"error": "Geometry calculation failed", "message": str(exc)},
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected error in geometry calculation")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "Internal server error", "message": str(exc)},
        ) from exc

    return result


# ---------------------------------------------------------------------------
# Horizon endpoints  (Phase 3B)
# ---------------------------------------------------------------------------

@app.post(
    "/api/horizon/profile",
    summary="Compute a 360-degree terrain horizon profile for a lunar surface site",
    response_model=dict,
    tags=["Horizon"],
)
async def horizon_profile(request: HorizonProfileRequest) -> dict:
    """
    Ray-march the NASA Site 01 5 m/px DEM along every azimuth at the requested
    angular resolution to produce a local terrain skyline (horizon) profile.

    **Coverage**: Only sites inside the 16×16 km Site 01 raster tile
    (-19 km ≤ x ≤ -3 km, -20 km ≤ y ≤ -4 km polar stereo) will return
    genuine terrain elevation angles. Sites outside this tile return a flat
    0° profile with ``is_inside_dem=false``.

    **Performance**: A full 360° profile at 2° resolution completes in
    roughly 0.5 – 2 seconds on a standard CPU (3200-step rays × 180 azimuths).
    Profiles are cached in memory by site coordinates.
    """
    # Ensure DEM is loaded (lazy)
    if not horizon_service._dem_loaded:
        horizon_service.load_dem_dataset()

    try:
        result = horizon_service.compute_horizon_profile(
            lon_deg=request.longitude_deg,
            lat_deg=request.latitude_deg,
            elevation_m=request.elevation_m,
            instrument_height_m=request.instrument_height_m,
            angular_step_deg=request.angular_step_deg,
        )
        is_inside = horizon_service.is_inside_site01(request.longitude_deg, request.latitude_deg)
        return {
            **result,
            "instrument_height_m": request.instrument_height_m,
            "dem_dataset": "NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)",
            "is_inside_dem": is_inside,
            "dem_loaded": horizon_service._dem_loaded,
        }
    except Exception as exc:
        logger.exception("Horizon profile calculation failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "Horizon profile calculation failed", "message": str(exc)},
        ) from exc


@app.post(
    "/api/horizon/visibility",
    summary="Evaluate Sun and Earth terrain-aware line-of-sight visibility",
    response_model=dict,
    tags=["Horizon"],
)
async def horizon_visibility(request: HorizonVisibilityRequest) -> dict:
    """
    Combine SPICE-derived Sun and Earth geometric directions with the local
    terrain horizon to assess whether each target is obstructed by terrain
    or occulted by the lunar body.

    **Input**: The Sun and Earth azimuth/elevation values should be taken
    directly from the ``/api/spice/geometry`` response for the desired epoch.

    **Output**: For each target, returns:
    - ``visibility_status``: one of ``no_obstruction_detected_within_coverage``,
      ``near_horizon_grazing``, ``blocked_by_local_terrain``,
      ``blocked_by_lunar_body``, ``unknown_insufficient_coverage``,
      ``calculation_unavailable``.
    - ``angular_clearance_deg``: target elevation minus terrain skyline elevation.
    - ``terrain_horizon_elevation_deg``: terrain skyline elevation in the
      target's azimuth direction.
    """
    # Ensure DEM is loaded (lazy)
    if not horizon_service._dem_loaded:
        horizon_service.load_dem_dataset()

    try:
        sun_result = horizon_service.evaluate_target_obstruction(
            target_name="Sun",
            target_az_deg=request.sun_azimuth_deg,
            target_el_deg=request.sun_elevation_deg,
            target_dist_km=request.sun_distance_km,
            lon_deg=request.longitude_deg,
            lat_deg=request.latitude_deg,
            elevation_m=request.elevation_m,
            instrument_height_m=request.instrument_height_m,
        )
        earth_result = horizon_service.evaluate_target_obstruction(
            target_name="Earth",
            target_az_deg=request.earth_azimuth_deg,
            target_el_deg=request.earth_elevation_deg,
            target_dist_km=request.earth_distance_km,
            lon_deg=request.longitude_deg,
            lat_deg=request.latitude_deg,
            elevation_m=request.elevation_m,
            instrument_height_m=request.instrument_height_m,
        )

        is_inside = horizon_service.is_inside_site01(request.longitude_deg, request.latitude_deg)

        return {
            "site": {
                "latitude_deg": request.latitude_deg,
                "longitude_deg": request.longitude_deg,
                "elevation_m": request.elevation_m,
                "instrument_height_m": request.instrument_height_m,
                "is_inside_dem": is_inside,
            },
            "sun": sun_result,
            "earth": earth_result,
            "dem_dataset": "NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)",
            "dem_loaded": horizon_service._dem_loaded,
            "note": (
                "Terrain-aware visibility based on ray-marching the Site 01 5 m/px DEM. "
                "A positive clearance does not guarantee optical visibility (dust, lighting, hardware). "
                "Aberration correction: NONE (geometric directions from SPICE)."
            ),
        }
    except Exception as exc:
        logger.exception("Horizon visibility evaluation failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "Horizon visibility evaluation failed", "message": str(exc)},
        ) from exc


# ---------------------------------------------------------------------------
# Timeline and Mission Window endpoints (Phase 4)
# ---------------------------------------------------------------------------

@app.post(
    "/api/mission/timeline",
    summary="Calculate time-dependent Sun and Earth visibility windows across a mission timeline",
    response_model=dict,
    tags=["Mission Timeline"],
)
async def mission_timeline(request: MissionTimelineRequest) -> dict:
    """
    Sample a mission interval to calculate sunlight illumination windows and
    potential Direct-to-Earth line-of-sight intervals.

    - Samples interval using configurable step_minutes.
    - Topocentric Sun and Earth geometry derived from NASA/JPL SPICE kernels.
    - Apparent angular radii modeled: Sun (0.26°) and Earth (0.95°).
    - Ray-marches NASA Site 01 5m/px DEM for terrain skyline elevation.
    - Numerically refines visibility transition boundaries via bisection.
    - Strictly checks SPICE coverage (1900–2050 UTC) and DEM boundaries.
    """
    if not spice_service._initialized:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"error": "SPICE not initialised", "message": "Call /api/spice/health for details."},
        )

    try:
        result = timeline_service.calculate_mission_timeline(
            start_utc=request.start_utc,
            end_utc=request.end_utc,
            latitude_deg=request.latitude_deg,
            longitude_deg=request.longitude_deg,
            elevation_m=request.elevation_m,
            instrument_height_m=request.instrument_height_m,
            step_minutes=request.step_minutes,
            refinement_tolerance_sec=request.refinement_tolerance_sec,
        )
        return result
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"error": "Invalid mission timeline parameters", "message": str(exc)},
        ) from exc
    except Exception as exc:
        logger.exception("Mission timeline calculation failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "Mission timeline calculation failed", "message": str(exc)},
        ) from exc

