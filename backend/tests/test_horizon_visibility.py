"""
test_horizon_visibility.py — Unit and Integration Tests for Phase 3B.

Tests:
1. Polar stereographic projection forward/inverse consistency.
2. Site 01 DEM spatial coverage bounds.
3. Terrain skyline ray-marching with lunar spherical curvature.
4. Instrument height effects on horizon elevation.
5. 360° horizon profile generation and caching.
6. Sun/Earth line-of-sight obstruction and clearance calculation:
   - Clear line-of-sight above terrain
   - Blocked by local terrain ridge
   - Grazing line-of-sight within tolerance band
   - Occulted by the lunar body (< -0.2° elevation)
   - Coverage-limited / outside tile fallback
7. FastAPI HTTP endpoints (/api/horizon/profile, /api/horizon/visibility).
"""

import sys
import os
import math
import numpy as np
import pytest
from starlette.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
import horizon_service
from horizon_service import (
    LUNAR_RADIUS_M,
    selenographic_to_polar_stereo,
    polar_stereo_to_selenographic,
    is_inside_site01,
    sample_dem_bilinear,
    compute_azimuth_horizon,
    compute_horizon_profile,
    evaluate_target_obstruction,
    set_synthetic_dem,
)


@pytest.fixture(scope="module")
def client():
    """TestClient fixture for FastAPI app."""
    return TestClient(app)


# ── 1. Coordinate Projection Tests ──────────────────────────────────────────

class TestPolarStereoProjections:
    """Validate South Pole stereographic projection formulas (lon_0 = 0°)."""

    def test_south_pole_projects_to_origin(self):
        """South Pole (lat = -90°) must map to (0, 0)."""
        x, y = selenographic_to_polar_stereo(0.0, -90.0)
        assert abs(x) < 1e-6
        assert abs(y) < 1e-6

    def test_inverse_origin_maps_to_south_pole(self):
        """(0, 0) must invert back to lat = -90°."""
        lon, lat = polar_stereo_to_selenographic(0.0, 0.0)
        assert abs(lat - (-90.0)) < 1e-6

    @pytest.mark.parametrize("lon_deg,lat_deg", [
        (0.0, -89.5),
        (90.0, -89.0),
        (180.0, -88.5),
        (222.8, -89.45),  # Site 01 center
        (270.0, -85.0),
    ])
    def test_roundtrip_forward_inverse(self, lon_deg, lat_deg):
        """Forward then inverse projection must recover original coordinates within 1e-5 deg."""
        x, y = selenographic_to_polar_stereo(lon_deg, lat_deg)
        rec_lon, rec_lat = polar_stereo_to_selenographic(x, y)
        assert abs(rec_lat - lat_deg) < 1e-5
        # Modulo 360 comparison for longitude
        lon_diff = abs((rec_lon - lon_deg + 180.0) % 360.0 - 180.0)
        assert lon_diff < 1e-5

    def test_quadrant_geometry(self):
        """Verify East (lon=90) has positive x and North (lon=0) has positive y."""
        x_90, y_90 = selenographic_to_polar_stereo(90.0, -89.0)
        assert x_90 > 0.0
        assert abs(y_90) < 1e-3

        x_0, y_0 = selenographic_to_polar_stereo(0.0, -89.0)
        assert abs(x_0) < 1e-3
        assert y_0 > 0.0


# ── 2. Coverage Boundary Tests ──────────────────────────────────────────────

class TestSite01Coverage:
    """Verify is_inside_site01 accurately identifies the 16x16 km tile bounds."""

    def test_site01_nominal_is_inside(self):
        """Artemis Site 01 nominal coordinates must be inside."""
        assert is_inside_site01(222.8, -89.45) is True

    def test_equator_is_outside(self):
        """Equatorial sites must be outside."""
        assert is_inside_site01(0.0, 0.0) is False

    def test_north_pole_is_outside(self):
        """North pole must be outside."""
        assert is_inside_site01(0.0, 90.0) is False

    def test_far_side_outside(self):
        """Coordinates far from South Pole tile must be outside."""
        assert is_inside_site01(45.0, -75.0) is False


# ── 3. Terrain Ray-Marching & Mathematical Model ────────────────────────────

class TestRayMarchingTerrain:
    """Validate terrain skyline ray-marching with synthetic and real DEM."""

    def test_bilinear_interpolation_exact_corners(self):
        """Bilinear interpolation at pixel centers and corners must match expected values."""
        dem = np.array([
            [10.0, 20.0],
            [30.0, 40.0],
        ], dtype=np.float32)

        # Top-left corner pixel at (ORIGIN_X, ORIGIN_Y)
        val_top_left = sample_dem_bilinear(dem, horizon_service.ORIGIN_X, horizon_service.ORIGIN_Y)
        assert abs(val_top_left - 10.0) < 1e-4

        # Center interpolated between all 4 pixels
        val_center = sample_dem_bilinear(dem, horizon_service.ORIGIN_X + 2.5, horizon_service.ORIGIN_Y - 2.5)
        assert abs(val_center - 25.0) < 1e-4

    def test_instrument_height_depresses_horizon(self):
        """A taller instrument mast must lower the apparent terrain skyline elevation."""
        # Using real DEM or synthetic if available
        res_low = compute_azimuth_horizon(
            lon_deg=222.8,
            lat_deg=-89.45,
            azimuth_deg=45.0,
            instrument_height_m=1.0,
        )
        res_high = compute_azimuth_horizon(
            lon_deg=222.8,
            lat_deg=-89.45,
            azimuth_deg=45.0,
            instrument_height_m=10.0,
        )

        if res_low["is_inside_dem"] and res_high["is_inside_dem"]:
            # Taller instrument should see the ridge at a lower or equal elevation angle
            assert res_high["horizon_elevation_deg"] <= res_low["horizon_elevation_deg"] + 1e-4

    def test_horizon_profile_count_and_angles(self):
        """360-degree profile must have exact count of rays and valid azimuths."""
        step = 15.0
        prof = compute_horizon_profile(
            lon_deg=222.8,
            lat_deg=-89.45,
            angular_step_deg=step,
        )
        expected_count = int(360.0 / step)
        assert len(prof["profile"]) == expected_count

        for i, pt in enumerate(prof["profile"]):
            assert abs(pt["azimuth_deg"] - i * step) < 1e-3
            assert -90.0 <= pt["horizon_elevation_deg"] <= 90.0


# ── 4. Target Obstruction Classification Tests ──────────────────────────────

class TestTargetObstructionEvaluation:
    """Validate line-of-sight status classification rules."""

    def test_lunar_body_occultation(self):
        """Target with elevation < -0.2° must be classified as blocked_by_lunar_body."""
        obs = evaluate_target_obstruction(
            target_name="Sun",
            target_az_deg=120.0,
            target_el_deg=-1.5,
            target_dist_km=149597870.0,
            lon_deg=222.8,
            lat_deg=-89.45,
        )
        assert obs["visibility_status"] == "blocked_by_lunar_body"
        assert obs["terrain_horizon_elevation_deg"] is None

    def test_outside_dem_coverage_limited(self):
        """Target at a site outside Site 01 must return unknown_insufficient_coverage."""
        obs = evaluate_target_obstruction(
            target_name="Earth",
            target_az_deg=180.0,
            target_el_deg=5.0,
            target_dist_km=384400.0,
            lon_deg=0.0,
            lat_deg=0.0,  # Equator
        )
        assert obs["visibility_status"] == "unknown_insufficient_coverage"
        assert obs["coverage_limited"] is True

    def test_clear_line_of_sight_high_target(self):
        """Target well above any possible lunar terrain ridge (> 45°) must be clear."""
        obs = evaluate_target_obstruction(
            target_name="Sun",
            target_az_deg=45.0,
            target_el_deg=50.0,  # Very high overhead
            target_dist_km=149597870.0,
            lon_deg=222.8,
            lat_deg=-89.45,
        )
        assert obs["visibility_status"] == "no_obstruction_detected_within_coverage"
        assert obs["angular_clearance_deg"] is not None
        assert obs["angular_clearance_deg"] > 30.0

    def test_blocked_by_local_terrain_low_target(self):
        """Target below terrain skyline must be marked blocked_by_local_terrain."""
        # Query the actual horizon elevation along azimuth 90° first
        ray = compute_azimuth_horizon(lon_deg=222.8, lat_deg=-89.45, azimuth_deg=90.0)
        h_el = ray["horizon_elevation_deg"]

        # Target 2 degrees below the skyline, but > -0.2°
        target_el = max(h_el - 2.0, -0.1)

        obs = evaluate_target_obstruction(
            target_name="Sun",
            target_az_deg=90.0,
            target_el_deg=target_el,
            target_dist_km=149597870.0,
            lon_deg=222.8,
            lat_deg=-89.45,
        )
        if target_el < h_el - 0.05:
            assert obs["visibility_status"] == "blocked_by_local_terrain"
            assert obs["angular_clearance_deg"] < 0.0

    def test_grazing_line_of_sight(self):
        """Target within tolerance (0.05°) of skyline must be classified as near_horizon_grazing."""
        ray = compute_azimuth_horizon(lon_deg=222.8, lat_deg=-89.45, azimuth_deg=0.0)
        h_el = ray["horizon_elevation_deg"]

        obs = evaluate_target_obstruction(
            target_name="Earth",
            target_az_deg=0.0,
            target_el_deg=h_el,  # Exactly at horizon
            target_dist_km=384400.0,
            lon_deg=222.8,
            lat_deg=-89.45,
            tolerance_deg=0.05,
        )
        assert obs["visibility_status"] == "near_horizon_grazing"
        assert abs(obs["angular_clearance_deg"]) <= 0.05


# ── 5. FastAPI HTTP Endpoints Integration Tests ─────────────────────────────

class TestHorizonAPIEndpoints:
    """Verify HTTP API contracts for /api/horizon/profile and /api/horizon/visibility."""

    def test_profile_endpoint_success(self, client):
        """POST /api/horizon/profile returns 200 and schema compliant profile."""
        payload = {
            "latitude_deg": -89.45,
            "longitude_deg": 222.8,
            "elevation_m": -3400.0,
            "instrument_height_m": 2.0,
            "angular_step_deg": 10.0,
        }
        res = client.post("/api/horizon/profile", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert "profile" in data
        assert len(data["profile"]) == 36
        assert data["is_inside_dem"] is True
        assert data["angular_step_deg"] == 10.0
        assert data["dem_loaded"] is True

    def test_visibility_endpoint_success(self, client):
        """POST /api/horizon/visibility returns 200 with Sun and Earth assessments."""
        payload = {
            "latitude_deg": -89.45,
            "longitude_deg": 222.8,
            "elevation_m": -3400.0,
            "instrument_height_m": 2.0,
            "sun_azimuth_deg": 45.0,
            "sun_elevation_deg": 1.5,
            "sun_distance_km": 149597870.0,
            "earth_azimuth_deg": 180.0,
            "earth_elevation_deg": 6.0,
            "earth_distance_km": 384400.0,
        }
        res = client.post("/api/horizon/visibility", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert "sun" in data
        assert "earth" in data
        assert data["sun"]["target"] == "Sun"
        assert data["earth"]["target"] == "Earth"
        assert data["sun"]["visibility_status"] in [
            "no_obstruction_detected_within_coverage",
            "near_horizon_grazing",
            "blocked_by_local_terrain",
            "blocked_by_lunar_body",
            "unknown_insufficient_coverage",
        ]
        assert data["earth"]["visibility_status"] in [
            "no_obstruction_detected_within_coverage",
            "near_horizon_grazing",
            "blocked_by_local_terrain",
            "blocked_by_lunar_body",
            "unknown_insufficient_coverage",
        ]

    def test_invalid_coordinates_validation_error(self, client):
        """Invalid latitude (> 90°) must return 422 Unprocessable Entity."""
        payload = {
            "latitude_deg": -95.0,  # Invalid
            "longitude_deg": 222.8,
        }
        res = client.post("/api/horizon/profile", json=payload)
        assert res.status_code == 422
