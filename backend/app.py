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
from schemas import GeometryRequest

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
