"""
tests/test_spice_geometry.py

Automated tests for the LUNAOPS SPICE backend.

Test categories
---------------
1.  Kernel loading
2.  UTC-to-ET conversion
3.  Sun/Earth vector validity
4.  Physically plausible magnitudes
5.  MOON_ME frame expression
6.  Local angle calculations (pure math — no SPICE dependency)
7.  Known-direction angle validation
8.  Input validation (invalid timestamps, out-of-range coordinates)
9.  API endpoint response structure
10. No fabricated values when kernels absent

Run from the backend/ directory:
    pytest tests/ -v
"""

from __future__ import annotations

import math
import sys
import os
import pytest
import numpy as np

# ---------------------------------------------------------------------------
# Ensure the backend package is importable when running from backend/
# ---------------------------------------------------------------------------
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient


# ===========================================================================
# Fixtures
# ===========================================================================

@pytest.fixture(scope="session")
def spice_svc():
    """Load SPICE kernels once for the entire test session."""
    import spice_service as svc
    svc.initialize()
    yield svc
    # kernels are shared with the app, so do NOT kclear here


@pytest.fixture(scope="session")
def api_client(spice_svc):
    """FastAPI TestClient with SPICE already initialised."""
    # Import app AFTER spice_service is initialised so the lifespan
    # startup does not attempt a second initialisation.
    from app import app
    with TestClient(app, raise_server_exceptions=True) as client:
        yield client


# ===========================================================================
# 1. Kernel loading
# ===========================================================================

class TestKernelLoading:
    def test_all_kernels_loaded(self, spice_svc):
        """All five required kernel files must be present and loadable."""
        missing = spice_svc._check_kernel_files()
        assert missing == [], f"Missing kernels: {missing}"

    def test_initialized_flag(self, spice_svc):
        assert spice_svc._initialized is True

    def test_init_error_is_none(self, spice_svc):
        assert spice_svc._init_error is None


# ===========================================================================
# 2. UTC-to-ET conversion
# ===========================================================================

class TestUTCToET:
    def test_known_timestamp_in_coverage(self, spice_svc):
        """A timestamp within DE440s coverage must convert without error."""
        import spiceypy as spice
        et = spice.str2et("2026 OCT 16 12:00:00 UTC")
        assert isinstance(et, float)
        assert math.isfinite(et)

    def test_et_epoch_j2000(self, spice_svc):
        """J2000.0 (2000 Jan 01 11:58:55.816 UTC) should give ET ≈ 0."""
        import spiceypy as spice
        et = spice.str2et("2000 JAN 01 11:58:55.816 UTC")
        # ET epoch is TDB seconds past J2000; value is very close to 0
        assert abs(et) < 70.0   # leapsecond offset < 70 s

    def test_iso_converter(self, spice_svc):
        """_iso_to_spice_utc must produce a string spice.str2et accepts."""
        import spiceypy as spice
        spice_str = spice_svc._iso_to_spice_utc("2026-10-16T12:00:00Z")
        et = spice.str2et(spice_str)
        assert math.isfinite(et)

    def test_iso_converter_with_offset(self, spice_svc):
        """Timestamps with +HH:MM offsets must be normalised to UTC."""
        import spiceypy as spice
        spice_str = spice_svc._iso_to_spice_utc("2026-10-16T17:30:00+05:30")
        et = spice.str2et(spice_str)
        # Should equal 12:00:00 UTC
        et_ref = spice.str2et("2026 OCT 16 12:00:00 UTC")
        assert abs(et - et_ref) < 1.0   # within 1 second


# ===========================================================================
# 3. Sun and Earth vector validity
# ===========================================================================

class TestVectorValidity:
    @pytest.fixture(autouse=True)
    def et(self, spice_svc):
        import spiceypy as spice
        self.et = spice.str2et("2026 OCT 16 12:00:00 UTC")
        self.spice = spice
        self.svc = spice_svc

    def test_sun_vector_finite(self):
        sun_vec, _ = self.spice.spkpos("SUN", self.et, "MOON_ME", "NONE", "MOON")
        assert all(math.isfinite(x) for x in sun_vec)

    def test_earth_vector_finite(self):
        earth_vec, _ = self.spice.spkpos("EARTH", self.et, "MOON_ME", "NONE", "MOON")
        assert all(math.isfinite(x) for x in earth_vec)

    def test_sun_vector_nonzero(self):
        sun_vec, _ = self.spice.spkpos("SUN", self.et, "MOON_ME", "NONE", "MOON")
        assert np.linalg.norm(sun_vec) > 0

    def test_earth_vector_nonzero(self):
        earth_vec, _ = self.spice.spkpos("EARTH", self.et, "MOON_ME", "NONE", "MOON")
        assert np.linalg.norm(earth_vec) > 0


# ===========================================================================
# 4. Physically plausible magnitudes
# ===========================================================================

class TestMagnitudes:
    @pytest.fixture(autouse=True)
    def vecs(self, spice_svc):
        import spiceypy as spice
        et = spice.str2et("2026 OCT 16 12:00:00 UTC")
        self.sun_dist = float(
            np.linalg.norm(spice.spkpos("SUN", et, "MOON_ME", "NONE", "MOON")[0])
        )
        self.earth_dist = float(
            np.linalg.norm(spice.spkpos("EARTH", et, "MOON_ME", "NONE", "MOON")[0])
        )

    def test_sun_distance_order_of_magnitude(self):
        """Sun distance ~1 AU (≈ 149.6 × 10^6 km); expect 1.3–1.7 × 10^8 km."""
        assert 1.3e8 < self.sun_dist < 1.7e8, (
            f"Sun distance {self.sun_dist:.3e} km outside expected range"
        )

    def test_earth_distance_order_of_magnitude(self):
        """Earth–Moon distance 356,000–407,000 km; expect 3e5–5e5 km."""
        assert 3e5 < self.earth_dist < 5e5, (
            f"Earth distance {self.earth_dist:.3e} km outside expected range"
        )


# ===========================================================================
# 5. MOON_ME frame
# ===========================================================================

class TestMoonMEFrame:
    def test_frame_name_resolves(self, spice_svc):
        import spiceypy as spice
        fid = spice.namfrm("MOON_ME")
        assert fid != 0, "MOON_ME did not resolve to a valid frame ID"

    def test_frame_id_is_31001(self, spice_svc):
        """MOON_ME should have frame ID 31001 per moon_de440_250416.tf."""
        import spiceypy as spice
        fid = spice.namfrm("MOON_ME")
        assert fid == 31001

    def test_spkpos_in_moon_me_succeeds(self, spice_svc):
        import spiceypy as spice
        et = spice.str2et("2026 OCT 16 12:00:00 UTC")
        vec, lt = spice.spkpos("SUN", et, "MOON_ME", "NONE", "MOON")
        assert len(vec) == 3


# ===========================================================================
# 6. Local angle calculations — pure math, no SPICE
# ===========================================================================

class TestLocalAngles:
    """
    These tests validate the _to_az_el and _local_north helpers independently
    of the SPICE kernel, so they can run without SPICE loaded.
    """

    def _north_east_up(self, lat_deg: float, lon_deg: float):
        """Return (north, east, up) unit vectors at a given surface location."""
        from spice_service import _local_north
        lat_r = math.radians(lat_deg)
        lon_r = math.radians(lon_deg)
        up = np.array([
            math.cos(lat_r) * math.cos(lon_r),
            math.cos(lat_r) * math.sin(lon_r),
            math.sin(lat_r),
        ])
        north = _local_north(lat_r, lon_r)
        east = np.cross(north, up)
        east /= np.linalg.norm(east)
        north = np.cross(up, east)
        north /= np.linalg.norm(north)
        return north, east, up

    # ── 7. Known overhead direction ─────────────────────────────────────────

    def test_overhead_gives_90_deg_elevation(self):
        """A target directly overhead (along up) must give elevation ≈ 90°."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(0.0, 0.0)
        az, el = _to_az_el(up * 1000.0, up, north, east)
        assert abs(el - 90.0) < 0.1, f"Overhead elevation should be 90°, got {el:.2f}°"

    def test_below_horizon_gives_negative_elevation(self):
        """A target directly below (nadir) must give elevation ≈ −90°."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(0.0, 0.0)
        az, el = _to_az_el(-up * 1000.0, up, north, east)
        assert el < 0.0, f"Below-horizon elevation must be negative, got {el:.2f}°"
        assert abs(el + 90.0) < 0.1

    def test_due_north_gives_azimuth_0(self):
        """A target due north on the horizon should have azimuth ≈ 0°."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(0.0, 0.0)
        az, el = _to_az_el(north * 1000.0, up, north, east)
        assert abs(az) < 0.1 or abs(az - 360.0) < 0.1
        assert abs(el) < 0.1

    def test_due_east_gives_azimuth_90(self):
        """A target due east on the horizon should have azimuth ≈ 90°."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(0.0, 0.0)
        az, el = _to_az_el(east * 1000.0, up, north, east)
        assert abs(az - 90.0) < 0.1

    def test_azimuth_in_range(self):
        """Azimuth must always be in [0, 360)."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(-85.0, 15.0)
        for direction in [north, east, up, -north, -east]:
            az, _ = _to_az_el(direction * 1000.0, up, north, east)
            assert 0.0 <= az < 360.0

    def test_elevation_in_range(self):
        """Elevation must always be in [−90, +90]."""
        from spice_service import _to_az_el
        north, east, up = self._north_east_up(-85.0, 15.0)
        for direction in [north, east, up, -north, -east, -up]:
            _, el = _to_az_el(direction * 1000.0, up, north, east)
            assert -90.0 <= el <= 90.0


# ===========================================================================
# 8. Input validation
# ===========================================================================

class TestInputValidation:
    def test_missing_timezone_rejected(self):
        """Timestamps without timezone designator must be rejected."""
        from schemas import GeometryRequest
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            GeometryRequest(
                utc_time="2026-10-16T12:00:00",   # no timezone
                latitude_deg=0.0,
                longitude_deg=0.0,
            )

    def test_invalid_latitude_rejected(self):
        from schemas import GeometryRequest
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            GeometryRequest(
                utc_time="2026-10-16T12:00:00Z",
                latitude_deg=91.0,      # > 90
                longitude_deg=0.0,
            )

    def test_invalid_longitude_rejected(self):
        from schemas import GeometryRequest
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            GeometryRequest(
                utc_time="2026-10-16T12:00:00Z",
                latitude_deg=0.0,
                longitude_deg=400.0,    # > 360
            )

    def test_south_pole_coordinates_accepted(self):
        """Latitude −90 (south pole) must be accepted."""
        from schemas import GeometryRequest
        req = GeometryRequest(
            utc_time="2026-10-16T12:00:00Z",
            latitude_deg=-90.0,
            longitude_deg=0.0,
        )
        assert req.latitude_deg == -90.0


# ===========================================================================
# 9. API endpoint structure
# ===========================================================================

class TestAPIEndpoints:
    def test_health_returns_200(self, api_client):
        resp = api_client.get("/api/spice/health")
        assert resp.status_code == 200

    def test_health_contains_required_keys(self, api_client):
        body = api_client.get("/api/spice/health").json()
        for key in [
            "status", "initialized", "kernels_present",
            "reference_frame", "frame_available", "diagnostic_calculation",
        ]:
            assert key in body, f"Missing key '{key}' in health response"

    def test_health_status_ok(self, api_client):
        body = api_client.get("/api/spice/health").json()
        assert body["status"] == "ok"

    def test_geometry_returns_200(self, api_client):
        resp = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
                "elevation_m": 0.0,
            },
        )
        assert resp.status_code == 200, resp.text

    def test_geometry_contains_sun_and_earth(self, api_client):
        body = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
                "elevation_m": 0.0,
            },
        ).json()
        assert "sun" in body
        assert "earth" in body

    def test_geometry_values_are_not_example_values(self, api_client):
        """
        The API must return calculated values, not hardcoded documentation
        examples.  We query two different timestamps and verify the Sun
        position changes.
        """
        def get_sun_dist(utc):
            return api_client.post(
                "/api/spice/geometry",
                json={
                    "utc_time": utc,
                    "latitude_deg": 0.0,
                    "longitude_deg": 0.0,
                },
            ).json()["sun"]["distance_km"]

        d1 = get_sun_dist("2026-01-01T00:00:00Z")
        d2 = get_sun_dist("2026-07-01T00:00:00Z")
        # Earth–Sun distance varies ~1.5% over the year; Moon follows Earth
        assert abs(d1 - d2) > 1e5, (
            f"Sun distances for different epochs differ by only {abs(d1-d2):.0f} km — "
            "may be hardcoded"
        )

    def test_geometry_sun_distance_plausible(self, api_client):
        body = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
            },
        ).json()
        dist = body["sun"]["distance_km"]
        assert 1.3e8 < dist < 1.7e8, f"Implausible Sun distance: {dist:.3e} km"

    def test_geometry_earth_distance_plausible(self, api_client):
        body = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
            },
        ).json()
        dist = body["earth"]["distance_km"]
        assert 3e5 < dist < 5e5, f"Implausible Earth distance: {dist:.3e} km"

    def test_geometry_azimuth_in_range(self, api_client):
        body = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
            },
        ).json()
        for body_name in ["sun", "earth"]:
            az = body[body_name]["azimuth_deg"]
            assert 0.0 <= az < 360.0, f"{body_name} azimuth {az} out of range"

    def test_geometry_elevation_in_range(self, api_client):
        body = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": -85.0,
                "longitude_deg": 0.0,
            },
        ).json()
        for body_name in ["sun", "earth"]:
            el = body[body_name]["elevation_deg"]
            assert -90.0 <= el <= 90.0, f"{body_name} elevation {el} out of range"

    def test_geometry_missing_timezone_returns_422(self, api_client):
        resp = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00",  # no timezone
                "latitude_deg": 0.0,
                "longitude_deg": 0.0,
            },
        )
        assert resp.status_code == 422

    def test_geometry_invalid_lat_returns_422(self, api_client):
        resp = api_client.post(
            "/api/spice/geometry",
            json={
                "utc_time": "2026-10-16T12:00:00Z",
                "latitude_deg": 95.0,
                "longitude_deg": 0.0,
            },
        )
        assert resp.status_code == 422


# ===========================================================================
# 10. No fabricated values when kernels absent
# ===========================================================================

class TestNoFabricationOnFailure:
    def test_uninitialized_service_raises(self):
        """
        A fresh spice_service module that has not been initialised must raise
        RuntimeError rather than returning a value.
        """
        import importlib
        import spice_service as svc_module
        original_init = svc_module._initialized
        original_err  = svc_module._init_error
        try:
            svc_module._initialized = False
            svc_module._init_error  = "Simulated failure"
            with pytest.raises(RuntimeError, match="Simulated failure"):
                svc_module.compute_geometry(
                    "2026-10-16T12:00:00Z", 0.0, 0.0, 0.0
                )
        finally:
            svc_module._initialized = original_init
            svc_module._init_error  = original_err
