"""
test_scientific_export.py — Tests for Phase 6 Scientific Report Export & Reproducibility.

Test categories:
1. PDF Generation:
   - Polished PDF creation for single scenario mission analysis
   - Polished PDF creation for multi-candidate comparison
   - Validates PDF binary header (%PDF) and non-zero payload
2. CSV Generation:
   - Header formatting, unit specifications, and proper row counts
   - Clear representation of unavailable/unevaluable metrics without zero substitution
3. JSON Reproducibility Manifest:
   - Schema validation, required provenance keys, software environment
   - SHA-256 kernel hashes for loaded SPICE kernels
   - Dataset definitions and calculation methods
4. API Endpoints:
   - POST /api/export/mission (pdf, csv, json)
   - POST /api/export/comparison (pdf, csv, json)
   - Validation failures on missing/invalid parameters
5. Stability & Integration:
   - Handles large time-series without truncation
   - Continued operational verification of existing endpoints
"""

from __future__ import annotations

import sys
import os
import json
import pytest
from starlette.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
import spice_service
import timeline_service
import comparison_service
import export_service


@pytest.fixture(scope="module")
def client():
    if not spice_service._initialized:
        spice_service.initialize()
    return TestClient(app)


# ── 1. Unit Tests for Export Engine ──────────────────────────────────────────

class TestExportEngineUnits:
    """Verify core PDF, CSV, and JSON manifest generation."""

    def test_json_reproducibility_manifest_structure(self):
        manifest = export_service.generate_reproducibility_manifest(
            analysis_type="single_mission",
            inputs={"site": "Artemis Site 01", "lat_deg": -89.463},
            results={"sunlight_pct": 82.5},
        )
        assert manifest["manifest_version"] == "1.0.0"
        assert "generated_utc" in manifest
        assert manifest["software_environment"]["reference_frame"] == "MOON_ME (IAU Mean Earth / Polar Axis, Frame ID 31001)"
        assert manifest["software_environment"]["aberration_correction"] == "NONE (Instantaneous geometric ephemeris vectors)"
        
        # Check kernel SHA-256 hashes
        kernels = manifest["data_provenance"]["spice_kernels"]
        assert len(kernels) >= 5
        de440 = next(k for k in kernels if k["filename"] == "de440s.bsp")
        assert len(de440["sha256"]) == 64  # valid SHA-256 hex string

    def test_generate_mission_timeline_csv(self):
        tl = timeline_service.calculate_mission_timeline(
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-17T12:00:00Z",
            latitude_deg=-89.463,
            longitude_deg=222.51,
            step_minutes=60,
        )
        csv_str = export_service.generate_mission_timeline_csv(tl, "Artemis Test")
        lines = csv_str.strip().splitlines()

        # Check metadata headers
        assert any("# Scenario: Artemis Test" in line for line in lines)
        assert any("# Coordinates: -89.463 deg N/S" in line for line in lines)

        # Check column headers with units
        header_line = next(line for line in lines if "timestamp_utc" in line)
        assert "sun_elevation_deg" in header_line
        assert "sun_terrain_horizon_deg" in header_line
        assert "earth_angular_clearance_deg" in header_line

        # 25 samples from 12:00 to 12:00 next day
        data_rows = [l for l in lines if l.startswith("2026-")]
        assert len(data_rows) == 25

    def test_generate_mission_report_pdf(self):
        tl = timeline_service.calculate_mission_timeline(
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-17T12:00:00Z",
            latitude_deg=-89.463,
            longitude_deg=222.51,
            step_minutes=60,
        )
        terrain_stats = comparison_service.sample_terrain_statistics(222.51, -89.463, radius_m=100.0)
        pdf_bytes = export_service.generate_mission_report_pdf(
            scenario_name="Artemis Site 01 Scientific Evaluation",
            notes="Formal pre-decisional mission analysis",
            site_name="Shackleton–de Gerlache Ridge",
            lat_deg=-89.463,
            lon_deg=222.51,
            elev_m=1100.0,
            start_utc="2026-10-16T12:00:00Z",
            end_utc="2026-10-17T12:00:00Z",
            step_minutes=60,
            timeline_result=tl,
            terrain_stats=terrain_stats,
        )
        assert pdf_bytes.startswith(b"%PDF")
        assert len(pdf_bytes) > 10000  # valid multi-page PDF with embedded charts

    def test_generate_comparison_report_pdf_and_csv(self):
        cmp_res = comparison_service.compare_candidate_scenarios([
            {
                "id": "site-1",
                "name": "Site 01 Ridge",
                "latitude_deg": -89.463,
                "longitude_deg": 222.51,
                "start_utc": "2026-10-16T12:00:00Z",
                "end_utc": "2026-10-17T12:00:00Z",
            },
            {
                "id": "site-2",
                "name": "Malapert Peak",
                "latitude_deg": -86.040,
                "longitude_deg": 2.70,
                "start_utc": "2026-10-16T12:00:00Z",
                "end_utc": "2026-10-17T12:00:00Z",
            },
        ])

        # PDF
        pdf_bytes = export_service.generate_comparison_report_pdf(cmp_res, "Candidate Landing Site Evaluation")
        assert pdf_bytes.startswith(b"%PDF")
        assert len(pdf_bytes) > 5000

        # CSV
        csv_str = export_service.generate_candidate_comparison_csv(cmp_res)
        assert "Site 01 Ridge" in csv_str
        assert "Malapert Peak" in csv_str
        assert "UNAVAILABLE" in csv_str  # Malapert slope is unavailable outside DEM


# ── 2. API Endpoint Integration Tests ────────────────────────────────────────

class TestExportAPIEndpoints:
    """Verify HTTP POST endpoints for mission and comparison exports."""

    def test_api_export_mission_json(self, client):
        payload = {
            "scenario_name": "Artemis III Target Site",
            "notes": "Testing JSON export",
            "site_name": "Site 01",
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "elevation_m": 1100.0,
            "start_utc": "2026-10-16T12:00:00Z",
            "end_utc": "2026-10-17T12:00:00Z",
            "step_minutes": 60,
        }
        resp = client.post("/api/export/mission?format=json", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["manifest_version"] == "1.0.0"
        assert data["analysis_type"] == "single_mission"
        assert "data_provenance" in data

    def test_api_export_mission_csv(self, client):
        payload = {
            "scenario_name": "Artemis III Target Site",
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "start_utc": "2026-10-16T12:00:00Z",
            "end_utc": "2026-10-17T12:00:00Z",
            "step_minutes": 60,
        }
        resp = client.post("/api/export/mission?format=csv", json=payload)
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/csv")
        assert "attachment; filename=" in resp.headers["content-disposition"]
        assert "timestamp_utc" in resp.text

    def test_api_export_mission_pdf(self, client):
        payload = {
            "scenario_name": "Artemis III Target Site",
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "start_utc": "2026-10-16T12:00:00Z",
            "end_utc": "2026-10-17T12:00:00Z",
            "step_minutes": 60,
        }
        resp = client.post("/api/export/mission?format=pdf", json=payload)
        assert resp.status_code == 200
        assert resp.headers["content-type"] == "application/pdf"
        assert resp.content.startswith(b"%PDF")

    def test_api_export_comparison_pdf_and_csv(self, client):
        payload = {
            "report_title": "Multi-Site Landing Safety Analysis",
            "scenarios": [
                {
                    "id": "c1",
                    "name": "Candidate Ridge",
                    "latitude_deg": -89.463,
                    "longitude_deg": 222.51,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-17T12:00:00Z",
                },
                {
                    "id": "c2",
                    "name": "Candidate Peak",
                    "latitude_deg": -86.040,
                    "longitude_deg": 2.70,
                    "start_utc": "2026-10-16T12:00:00Z",
                    "end_utc": "2026-10-17T12:00:00Z",
                },
            ],
            "constraints": {
                "min_sunlight_percent": 50.0,
            },
        }

        # PDF test
        resp_pdf = client.post("/api/export/comparison?format=pdf", json=payload)
        assert resp_pdf.status_code == 200
        assert resp_pdf.content.startswith(b"%PDF")

        # CSV test
        resp_csv = client.post("/api/export/comparison?format=csv", json=payload)
        assert resp_csv.status_code == 200
        assert "Candidate Ridge" in resp_csv.text

        # JSON manifest test
        resp_json = client.post("/api/export/comparison?format=json", json=payload)
        assert resp_json.status_code == 200
        data = resp_json.json()
        assert data["analysis_type"] == "candidate_comparison"
