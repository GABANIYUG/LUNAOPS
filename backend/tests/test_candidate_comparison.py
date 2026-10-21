"""
test_candidate_comparison.py — Tests for Phase 5 Candidate-Site Comparison.

Test categories:
1. Two valid scenarios compared side by side (same period, different sites).
2. Same site compared over different mission dates (temporal comparison).
3. Mismatched coverage: Site within high-res DEM compared with site outside DEM.
   - Verifies terrain-dependent metrics (slope, elevation, uncertainty) are marked unavailable
   - Verifies constraint evaluation explicitly returns 'unevaluable'
   - Verifies no values are fabricated or zero-substituted
4. User-defined constraints validation: met, unmet, and unevaluable evaluations.
5. Multi-criteria decision ranking:
   - Transparent weights and criteria exposure
   - Unevaluable metrics flagged in candidate score
   - Proper scientific disclaimer
6. Input validation:
   - Requiring at least 2 scenarios
   - Invalid coordinates
   - Inverted time intervals
   - Timestamps outside SPICE DE440s range
7. FastAPI HTTP POST /api/mission/compare endpoint verification.
"""

from __future__ import annotations

import sys
import os
import pytest
from starlette.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
import spice_service
import horizon_service
import comparison_service
from comparison_service import (
    validate_scenario_prerequisites,
    sample_terrain_statistics,
    evaluate_scenario_constraints,
    compute_multi_criteria_ranking,
    compare_candidate_scenarios,
)


@pytest.fixture(scope="module")
def client():
    if not spice_service._initialized:
        spice_service.initialize()
    return TestClient(app)



# ── 1. Validation & Prerequisite Tests ────────────────────────────────────────

class TestComparisonValidation:
    """Validate scenario prerequisites before execution."""

    def test_valid_scenario_prerequisites(self):
        val = validate_scenario_prerequisites(
            latitude_deg=-89.463,
            longitude_deg=222.51,
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-18T12:00:00Z",
        )
        assert val["valid"] is True
        assert val["is_inside_dem"] is True
        assert len(val["errors"]) == 0

    def test_invalid_coordinates(self):
        val = validate_scenario_prerequisites(
            latitude_deg=-95.0,  # Invalid latitude
            longitude_deg=222.51,
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-18T12:00:00Z",
        )
        assert val["valid"] is False
        assert any("Latitude" in err for err in val["errors"])

    def test_inverted_time_range(self):
        val = validate_scenario_prerequisites(
            latitude_deg=-89.463,
            longitude_deg=222.51,
            start_utc="2026-10-20T12:00:00Z",
            end_utc="2026-10-18T12:00:00Z",  # Earlier than start
        )
        assert val["valid"] is False
        assert any("must precede" in err for err in val["errors"])

    def test_out_of_spice_kernel_coverage(self):
        val = validate_scenario_prerequisites(
            latitude_deg=-89.463,
            longitude_deg=222.51,
            start_utc="2060-10-16T12:00:00Z",  # Outside DE440s (1900-2050)
            end_utc="2060-10-23T12:00:00Z",
        )
        assert val["valid"] is False
        assert any("DE440s" in err for err in val["errors"])

    def test_outside_dem_warning(self):
        val = validate_scenario_prerequisites(
            latitude_deg=-86.040,  # Malapert (outside Site 01 16x16 km DEM)
            longitude_deg=2.70,
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-18T12:00:00Z",
        )
        assert val["valid"] is True
        assert val["is_inside_dem"] is False
        assert len(val["warnings"]) > 0


# ── 2. Terrain Sampling & Mismatched Coverage Tests ──────────────────────────

class TestTerrainSamplingAndCoverage:
    """Verify high-resolution slope/elevation sampling and absence of fabricated values."""

    def test_sample_terrain_inside_dem(self):
        stats = sample_terrain_statistics(lon_deg=222.51, lat_deg=-89.463, radius_m=50.0)
        assert stats["coverage_available"] is True
        assert stats["elevation"] is not None
        assert "mean_m" in stats["elevation"]
        assert stats["slope"] is not None
        assert "mean_deg" in stats["slope"]
        assert stats["uncertainty"] is not None
        assert stats["uncertainty"]["mean_m"] > 0.0

    def test_sample_terrain_outside_dem_no_fabrication(self):
        """Outside DEM footprint, terrain stats MUST be None and coverage_available False."""
        stats = sample_terrain_statistics(lon_deg=2.70, lat_deg=-86.040, radius_m=50.0)
        assert stats["coverage_available"] is False
        assert stats["elevation"] is None
        assert stats["slope"] is None
        assert stats["uncertainty"] is None
        assert "outside NASA LOLA Artemis Site 01" in stats["note"]


# ── 3. Constraints Evaluation Tests ──────────────────────────────────────────

class TestConstraintsEvaluation:
    """Verify constraint logic: met, unmet, and unevaluable."""

    def test_constraints_met_and_unmet(self):
        fake_summary = {
            "sunlight": {
                "full_sunlight_percent": 60.0,
                "partial_sunlight_percent": 10.0,
                "max_continuous_darkness_hours": 12.0,
                "unknown_coverage_hours": 0.0,
            },
            "earth_los": {
                "full_disc_los_percent": 80.0,
                "partial_disc_los_percent": 5.0,
                "unknown_coverage_hours": 0.0,
            },
        }
        fake_terrain = {
            "coverage_available": True,
            "slope": {"max_deg": 8.5, "mean_deg": 4.2},
            "elevation": {"mean_m": 1250.0},
        }
        constraints = {
            "min_sunlight_percent": 65.0,        # 70% actual -> MET
            "min_earth_los_percent": 90.0,        # 85% actual -> UNMET
            "max_slope_deg": 10.0,                # 8.5° actual -> MET
            "max_continuous_darkness_hours": 24.0, # 12h actual -> MET
            "min_elevation_m": 1000.0,            # 1250m actual -> MET
        }

        res = evaluate_scenario_constraints(fake_summary, fake_terrain, constraints)
        assert res["met_count"] == 4
        assert res["unmet_count"] == 1
        assert res["unevaluable_count"] == 0
        assert res["all_met"] is False

    def test_constraints_unevaluable_when_outside_dem(self):
        """When DEM coverage is missing, slope and terrain-dependent illumination constraints are unevaluable."""
        fake_summary = {
            "sunlight": {
                "full_sunlight_percent": 0.0,
                "partial_sunlight_percent": 0.0,
                "max_continuous_darkness_hours": 0.0,
                "unknown_coverage_hours": 48.0,
            },
            "earth_los": {
                "full_disc_los_percent": 0.0,
                "partial_disc_los_percent": 0.0,
                "unknown_coverage_hours": 48.0,
            },
        }
        fake_terrain = {
            "coverage_available": False,
            "slope": None,
            "elevation": None,
        }
        constraints = {
            "min_sunlight_percent": 50.0,
            "max_slope_deg": 12.0,
            "min_elevation_m": 500.0,
        }

        res = evaluate_scenario_constraints(fake_summary, fake_terrain, constraints)
        assert res["unevaluable_count"] == 3
        assert res["met_count"] == 0
        assert res["unmet_count"] == 0
        assert res["all_met"] is False


# ── 4. Multi-Criteria Ranking Tests ──────────────────────────────────────────

class TestMultiCriteriaRanking:
    """Verify transparent ranking, weight normalization, and unevaluable handling."""

    def test_ranking_computation(self):
        scenarios_eval = [
            {
                "scenario_id": "sc-1",
                "scenario_name": "High Sunlight Site",
                "timeline_result": {
                    "mission_scenario": {"total_duration_hours": 48.0},
                    "summary": {
                        "sunlight": {
                            "full_sunlight_percent": 80.0,
                            "partial_sunlight_percent": 10.0,
                            "max_continuous_darkness_hours": 5.0,
                            "unknown_coverage_hours": 0.0,
                        },
                        "earth_los": {
                            "full_disc_los_percent": 75.0,
                            "partial_disc_los_percent": 5.0,
                            "unknown_coverage_hours": 0.0,
                        },
                    },
                },
                "terrain_statistics": {
                    "coverage_available": True,
                    "slope": {"max_deg": 6.0, "mean_deg": 3.0},
                },
            },
            {
                "scenario_id": "sc-2",
                "scenario_name": "Low Illumination Site",
                "timeline_result": {
                    "mission_scenario": {"total_duration_hours": 48.0},
                    "summary": {
                        "sunlight": {
                            "full_sunlight_percent": 10.0,
                            "partial_sunlight_percent": 5.0,
                            "max_continuous_darkness_hours": 40.0,
                            "unknown_coverage_hours": 0.0,
                        },
                        "earth_los": {
                            "full_disc_los_percent": 20.0,
                            "partial_disc_los_percent": 5.0,
                            "unknown_coverage_hours": 0.0,
                        },
                    },
                },
                "terrain_statistics": {
                    "coverage_available": True,
                    "slope": {"max_deg": 18.0, "mean_deg": 12.0},
                },
            },
        ]

        ranking = compute_multi_criteria_ranking(scenarios_eval)
        assert len(ranking["ranking"]) == 2
        assert ranking["ranking"][0]["scenario_id"] == "sc-1"
        assert ranking["ranking"][0]["rank"] == 1
        assert ranking["ranking"][0]["composite_score"] > ranking["ranking"][1]["composite_score"]
        assert "disclaimer" in ranking
        assert "Neither a high ranking nor low slope/illumination establishes landing safety" in ranking["disclaimer"]


# ── 5. End-to-End Orchestration & API Tests ──────────────────────────────────

class TestCandidateComparisonAPI:
    """Test full comparison orchestration and FastAPI endpoint."""

    def test_compare_two_different_sites_same_period(self, client):
        payload = {
            "scenarios": [
                {
                    "id": "site-1",
                    "name": "Site 01 Ridge",
                    "latitude_deg": -89.463,
                    "longitude_deg": 222.51,
                    "elevation_m": 1100.0,
                    "instrument_height_m": 2.0,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-18T12:00:00Z",
                    "step_minutes": 60,
                },
                {
                    "id": "site-2",
                    "name": "Malapert Mountain (Outside DEM)",
                    "latitude_deg": -86.040,
                    "longitude_deg": 2.70,
                    "elevation_m": 5000.0,
                    "instrument_height_m": 2.0,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-18T12:00:00Z",
                    "step_minutes": 60,
                },
            ],
            "constraints": {
                "min_sunlight_percent": 25.0,
                "max_slope_deg": 15.0,
            },
        }

        resp = client.post("/api/mission/compare", json=payload)
        assert resp.status_code == 200
        data = resp.json()

        assert data["compared_count"] == 2
        assert len(data["comparison_table"]) == 2
        assert len(data["scenarios"]) == 2
        assert "ranking" in data

        # Check side-by-side data compatibility
        sc1 = data["scenarios"][0]
        sc2 = data["scenarios"][1]
        assert sc1["terrain_statistics"]["coverage_available"] is True
        assert sc2["terrain_statistics"]["coverage_available"] is False
        assert sc2["terrain_statistics"]["slope"] is None

        # Check constraint evaluations
        c2 = sc2["constraints_evaluation"]
        assert c2["unevaluable_count"] > 0

    def test_compare_same_site_different_dates(self, client):
        """Temporal comparison: Same location over two distinct seasonal epochs."""
        payload = {
            "scenarios": [
                {
                    "id": "october-epoch",
                    "name": "Site 01 — October 2026",
                    "latitude_deg": -89.463,
                    "longitude_deg": 222.51,
                    "elevation_m": 1100.0,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-18T12:00:00Z",
                    "step_minutes": 60,
                },
                {
                    "id": "december-epoch",
                    "name": "Site 01 — December 2026",
                    "latitude_deg": -89.463,
                    "longitude_deg": 222.51,
                    "elevation_m": 1100.0,
                    "start_utc": "2026-12-16T12:00:00Z",
                    "end_utc": "2026-12-18T12:00:00Z",
                    "step_minutes": 60,
                },
            ],
        }

        resp = client.post("/api/mission/compare", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["compared_count"] == 2
        assert data["scenarios"][0]["inputs"]["start_utc"] != data["scenarios"][1]["inputs"]["start_utc"]

    def test_compare_rejects_fewer_than_two_scenarios(self, client):
        payload = {
            "scenarios": [
                {
                    "id": "lonely-site",
                    "name": "Single Site",
                    "latitude_deg": -89.463,
                    "longitude_deg": 222.51,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-18T12:00:00Z",
                }
            ]
        }
        resp = client.post("/api/mission/compare", json=payload)
        assert resp.status_code == 422
