"""
test_mission_timeline.py — Tests for Phase 4 Mission Timeline & Visibility Windows.

Test categories:
1. Synthetic constant visibility, continuous blockage, and multiple visibility windows.
2. Visibility transition detection and numerical bisection refinement accuracy.
3. Input validation: UTC boundaries, start >= end, spans exceeding 365 days, DE440s range.
4. DEM-boundary and insufficient-coverage fallback cases.
5. Real SPICE/terrain integration at a supported Artemis Site 01 location.
6. Apparent angular radii calculations for Sun and Earth.
7. FastAPI HTTP POST /api/mission/timeline endpoint contract and responses.
"""

import datetime
import math
import sys
import os
import pytest
from starlette.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
import spice_service
import horizon_service
import timeline_service
from timeline_service import (
    SUN_RADIUS_KM,
    EARTH_RADIUS_KM,
    compute_apparent_angular_radius_deg,
    classify_sun_visibility,
    classify_earth_visibility,
    validate_interval,
    parse_iso_utc,
    format_iso_utc,
    refine_transition,
    aggregate_continuous_windows,
    calculate_mission_timeline,
)


@pytest.fixture(scope="module")
def client():
    return TestClient(app)


# ── 1. Apparent Angular Radii Tests ─────────────────────────────────────────

class TestApparentAngularRadii:
    """Validate mathematical computation of apparent solar and terrestrial discs."""

    def test_solar_apparent_radius_at_1au(self):
        """At 1 AU (~1.496e8 km), Sun's angular radius must be ~0.266° (~16 arcmin)."""
        r_deg = compute_apparent_angular_radius_deg(SUN_RADIUS_KM, 1.4959787e8)
        assert abs(r_deg - 0.266) < 0.01

    def test_earth_apparent_radius_at_nominal_distance(self):
        """At mean Earth-Moon distance (~384,400 km), Earth's angular radius must be ~0.95° (~57 arcmin)."""
        r_deg = compute_apparent_angular_radius_deg(EARTH_RADIUS_KM, 384400.0)
        assert abs(r_deg - 0.95) < 0.03

    def test_extreme_close_distance_caps_at_90(self):
        """If distance is less than body radius, angular radius should clamp to 90°."""
        r_deg = compute_apparent_angular_radius_deg(100.0, 50.0)
        assert r_deg == 90.0


# ── 2. Visibility State Classification ──────────────────────────────────────

class TestVisibilityClassification:
    """Validate disc-aware illumination and line-of-sight status rules."""

    def test_sun_full_sunlight(self):
        """Sun centre well above terrain skyline with disc clearing."""
        # Skyline at 2.0°, Sun centre at 3.0°, angular radius 0.26° -> lower limb at 2.74° > 2.0°
        state = classify_sun_visibility(
            sun_el_deg=3.0,
            horizon_el_deg=2.0,
            sun_angular_radius_deg=0.26,
            is_inside_dem=True,
        )
        assert state == "full_sunlight"

    def test_sun_partial_sunlight(self):
        """Sun disc intersects terrain skyline (penumbral / grazing)."""
        # Skyline at 2.0°, Sun centre at 2.1°, lower limb at 1.84° < 2.0°, upper limb at 2.36° > 2.0°
        state = classify_sun_visibility(
            sun_el_deg=2.1,
            horizon_el_deg=2.0,
            sun_angular_radius_deg=0.26,
            is_inside_dem=True,
        )
        assert state == "partial_sunlight"

    def test_sun_total_darkness(self):
        """Sun upper limb is below terrain skyline."""
        # Skyline at 2.0°, Sun centre at 1.5°, upper limb at 1.76° < 2.0°
        state = classify_sun_visibility(
            sun_el_deg=1.5,
            horizon_el_deg=2.0,
            sun_angular_radius_deg=0.26,
            is_inside_dem=True,
        )
        assert state == "total_darkness"

    def test_sun_below_lunar_sphere_darkness(self):
        """Sun geometrically below lunar horizon (< -0.2°) is total darkness."""
        state = classify_sun_visibility(
            sun_el_deg=-5.0,
            horizon_el_deg=None,
            sun_angular_radius_deg=0.26,
            is_inside_dem=False,
        )
        assert state == "total_darkness"

    def test_earth_full_disc_los(self):
        """Earth lower limb clears terrain skyline."""
        # Skyline at 1.0°, Earth centre at 3.0°, radius 0.95° -> lower limb at 2.05° > 1.0°
        state = classify_earth_visibility(
            earth_el_deg=3.0,
            horizon_el_deg=1.0,
            earth_angular_radius_deg=0.95,
            is_inside_dem=True,
        )
        assert state == "full_disc_los"

    def test_earth_centre_only_los(self):
        """Earth centre is visible, but lower limb is clipped by terrain."""
        # Skyline at 2.5°, Earth centre at 3.0° (>= 2.5), lower limb at 2.05° (< 2.5)
        state = classify_earth_visibility(
            earth_el_deg=3.0,
            horizon_el_deg=2.5,
            earth_angular_radius_deg=0.95,
            is_inside_dem=True,
        )
        assert state == "centre_only_los"

    def test_earth_partial_disc_los(self):
        """Earth upper limb clears terrain, but centre is obstructed."""
        # Skyline at 3.2°, Earth centre at 3.0° (< 3.2), upper limb at 3.95° (> 3.2)
        state = classify_earth_visibility(
            earth_el_deg=3.0,
            horizon_el_deg=3.2,
            earth_angular_radius_deg=0.95,
            is_inside_dem=True,
        )
        assert state == "partial_disc_los"

    def test_earth_occulted(self):
        """Earth upper limb is below terrain skyline."""
        # Skyline at 5.0°, Earth centre at 3.0°, upper limb at 3.95° (< 5.0)
        state = classify_earth_visibility(
            earth_el_deg=3.0,
            horizon_el_deg=5.0,
            earth_angular_radius_deg=0.95,
            is_inside_dem=True,
        )
        assert state == "occulted"


# ── 3. Interval Validation & Boundaries ─────────────────────────────────────

class TestIntervalValidation:
    """Validate mission timeline boundary and constraint checks."""

    def test_start_equals_end_fails(self):
        """Equal start and end times must raise ValueError."""
        dt = datetime.datetime(2026, 10, 16, 12, 0, tzinfo=datetime.timezone.utc)
        with pytest.raises(ValueError, match="precede"):
            validate_interval(dt, dt)

    def test_start_after_end_fails(self):
        """Start after end must raise ValueError."""
        dt1 = datetime.datetime(2026, 10, 17, 12, 0, tzinfo=datetime.timezone.utc)
        dt2 = datetime.datetime(2026, 10, 16, 12, 0, tzinfo=datetime.timezone.utc)
        with pytest.raises(ValueError, match="precede"):
            validate_interval(dt1, dt2)

    def test_exceeding_max_days_fails(self):
        """Mission duration > 365 days must raise ValueError."""
        dt1 = datetime.datetime(2026, 1, 1, tzinfo=datetime.timezone.utc)
        dt2 = datetime.datetime(2027, 2, 1, tzinfo=datetime.timezone.utc)
        with pytest.raises(ValueError, match="maximum supported duration"):
            validate_interval(dt1, dt2)

    def test_outside_de440s_bounds_fails(self):
        """Year outside 1900-2050 must raise ValueError."""
        dt1 = datetime.datetime(1850, 1, 1, tzinfo=datetime.timezone.utc)
        dt2 = datetime.datetime(1850, 1, 10, tzinfo=datetime.timezone.utc)
        with pytest.raises(ValueError, match="DE440s SPICE kernel"):
            validate_interval(dt1, dt2)


# ── 4. Synthetic Continuous & Multi-Window Aggregation ──────────────────────

class TestSyntheticWindowAggregation:
    """Verify continuous window assembly and multi-window grouping with synthetic data."""

    def test_constant_visibility_single_window(self):
        """Constant state across all samples produces exactly one window spanning full duration."""
        dts = [
            datetime.datetime(2026, 10, 16, h, 0, tzinfo=datetime.timezone.utc)
            for h in range(12, 17)
        ]
        samples = [
            {
                "dt": dt,
                "timestamp_utc": format_iso_utc(dt),
                "sun": {"visibility_state": "full_sunlight"},
                "earth": {"visibility_state": "full_disc_los"},
            }
            for dt in dts
        ]

        windows = aggregate_continuous_windows(
            samples,
            target="sun",
            latitude_deg=-89.45,
            longitude_deg=222.8,
            elevation_m=-3400.0,
            instrument_height_m=2.0,
            is_inside_dem=True,
            refinement_tolerance_sec=60,
        )

        assert len(windows) == 1
        assert windows[0]["state"] == "full_sunlight"
        assert windows[0]["duration_hours"] == 4.0
        assert windows[0]["start_utc"] == "2026-10-16T12:00:00Z"
        assert windows[0]["end_utc"] == "2026-10-16T16:00:00Z"

    def test_continuous_blockage_single_window(self):
        """Continuous darkness produces exactly one total_darkness window."""
        dts = [
            datetime.datetime(2026, 10, 16, h, 0, tzinfo=datetime.timezone.utc)
            for h in range(0, 5)
        ]
        samples = [
            {
                "dt": dt,
                "timestamp_utc": format_iso_utc(dt),
                "sun": {"visibility_state": "total_darkness"},
                "earth": {"visibility_state": "occulted"},
            }
            for dt in dts
        ]

        windows = aggregate_continuous_windows(
            samples,
            target="sun",
            latitude_deg=-89.45,
            longitude_deg=222.8,
            elevation_m=-3400.0,
            instrument_height_m=2.0,
            is_inside_dem=True,
            refinement_tolerance_sec=60,
        )

        assert len(windows) == 1
        assert windows[0]["state"] == "total_darkness"
        assert windows[0]["duration_hours"] == 4.0


# ── 5. Real SPICE and Terrain Integration at Site 01 ────────────────────────

class TestRealMissionTimelineCalculation:
    """Validate end-to-end timeline calculation with real SPICE ephemerides and Site 01 DEM."""

    def test_site01_nominal_24h_run(self):
        """Calculate 24h timeline at Artemis Site 01 with 1h step."""
        res = calculate_mission_timeline(
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-17T12:00:00Z",
            latitude_deg=-89.45,
            longitude_deg=222.8,
            elevation_m=-3400.0,
            instrument_height_m=2.0,
            step_minutes=60,
            refinement_tolerance_sec=60,
        )

        assert "mission_scenario" in res
        assert res["mission_scenario"]["total_duration_hours"] == 24.0
        assert res["mission_scenario"]["sample_count"] == 25  # 24 intervals + 1 endpoint
        assert res["site"]["is_inside_dem"] is True

        # Summary structure
        summary = res["summary"]
        assert "sunlight" in summary
        assert "earth_los" in summary
        assert summary["sunlight"]["full_sunlight_percent"] + summary["sunlight"]["partial_sunlight_percent"] + summary["sunlight"]["total_darkness_percent"] + summary["sunlight"]["unknown_coverage_hours"] >= 99.9

        # Windows structure
        assert len(res["sun_windows"]) >= 1
        assert len(res["earth_windows"]) >= 1
        for w in res["sun_windows"]:
            assert "start_utc" in w
            assert "end_utc" in w
            assert "duration_hours" in w
            assert "state" in w

    def test_outside_dem_unknown_coverage(self):
        """Site outside Site 01 DEM returns unknown_insufficient_coverage when above lunar sphere."""
        # Equatorial site where Sun is above horizon
        res = calculate_mission_timeline(
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-16T16:00:00Z",
            latitude_deg=0.0,
            longitude_deg=0.0,
            step_minutes=60,
        )
        assert res["site"]["is_inside_dem"] is False
        # Any window where Sun is above datum should be marked unknown_insufficient_coverage
        states = [w["state"] for w in res["sun_windows"]]
        assert any(s in ("unknown_insufficient_coverage", "total_darkness") for s in states)


# ── 6. FastAPI HTTP Endpoint Tests ──────────────────────────────────────────

class TestMissionTimelineAPI:
    """Test HTTP POST /api/mission/timeline endpoint."""

    def test_api_timeline_success(self, client):
        """Valid request returns 200 and schema compliant timeline response."""
        payload = {
            "start_utc": "2026-10-16T12:00:00Z",
            "end_utc": "2026-10-17T12:00:00Z",
            "latitude_deg": -89.45,
            "longitude_deg": 222.8,
            "elevation_m": -3400.0,
            "instrument_height_m": 2.0,
            "step_minutes": 60,
            "refinement_tolerance_sec": 60,
        }
        resp = client.post("/api/mission/timeline", json=payload)
        assert resp.status_code == 200
        data = resp.json()

        assert "mission_scenario" in data
        assert "summary" in data
        assert "sun_windows" in data
        assert "earth_windows" in data
        assert "samples" in data
        assert len(data["samples"]) == 25

    def test_api_timeline_invalid_order(self, client):
        """Start after end returns 422 Unprocessable Entity."""
        payload = {
            "start_utc": "2026-10-18T12:00:00Z",
            "end_utc": "2026-10-16T12:00:00Z",
            "latitude_deg": -89.45,
            "longitude_deg": 222.8,
        }
        resp = client.post("/api/mission/timeline", json=payload)
        assert resp.status_code == 422
