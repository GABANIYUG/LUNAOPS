"""
schemas.py — Pydantic request/response models for the LUNAOPS SPICE API.
"""

from __future__ import annotations

from typing import Any, Optional
from pydantic import BaseModel, Field, field_validator
import re


class HorizonProfileRequest(BaseModel):
    """Input for POST /api/horizon/profile — compute a 360° terrain skyline."""

    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Site latitude in degrees (South negative).",
        examples=[-89.463],
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="Site longitude in degrees (East-positive).",
        examples=[222.51],
    )
    elevation_m: Optional[float] = Field(
        None,
        description="Site elevation above R=1,737,400 m sphere (m). If omitted, sampled from DEM.",
        examples=[1100.0],
    )
    instrument_height_m: float = Field(
        2.0,
        ge=0.0,
        le=100.0,
        description="Observer instrument height above surface in metres.",
    )
    angular_step_deg: float = Field(
        2.0,
        ge=0.5,
        le=10.0,
        description="Angular resolution of the horizon profile in degrees.",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "elevation_m": 1100.0,
            "instrument_height_m": 2.0,
            "angular_step_deg": 2.0,
        }
    }}


class HorizonVisibilityRequest(BaseModel):
    """Input for POST /api/horizon/visibility — evaluate Sun/Earth obstruction."""

    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Site latitude in degrees (South negative).",
        examples=[-89.463],
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="Site longitude in degrees (East-positive).",
        examples=[222.51],
    )
    elevation_m: Optional[float] = Field(
        None,
        description="Site elevation above R=1,737,400 m sphere (m). If omitted, sampled from DEM.",
    )
    instrument_height_m: float = Field(
        2.0,
        ge=0.0,
        le=100.0,
        description="Observer instrument height above surface in metres.",
    )
    # Sun data (from SPICE geometry response)
    sun_azimuth_deg: float = Field(..., ge=0.0, lt=360.0, description="Sun local azimuth from North (°).")
    sun_elevation_deg: float = Field(..., ge=-90.0, le=90.0, description="Sun geometric elevation (°).")
    sun_distance_km: float = Field(..., gt=0.0, description="Sun distance in km.")
    # Earth data (from SPICE geometry response)
    earth_azimuth_deg: float = Field(..., ge=0.0, lt=360.0, description="Earth local azimuth from North (°).")
    earth_elevation_deg: float = Field(..., ge=-90.0, le=90.0, description="Earth geometric elevation (°).")
    earth_distance_km: float = Field(..., gt=0.0, description="Earth distance in km.")

    model_config = {"json_schema_extra": {
        "example": {
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "elevation_m": 1100.0,
            "instrument_height_m": 2.0,
            "sun_azimuth_deg": 45.0,
            "sun_elevation_deg": 3.5,
            "sun_distance_km": 147e6,
            "earth_azimuth_deg": 10.0,
            "earth_elevation_deg": 5.2,
            "earth_distance_km": 384400.0,
        }
    }}


class GeometryRequest(BaseModel):
    """Input for the POST /api/spice/geometry endpoint."""

    utc_time: str = Field(
        ...,
        description=(
            "ISO-8601 UTC timestamp with explicit timezone, "
            "e.g. '2026-10-16T12:00:00Z'."
        ),
        examples=["2026-10-16T12:00:00Z"],
    )
    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Geodetic latitude of the site in degrees (+N / −S).",
        examples=[-85.0],
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="Longitude of the site in degrees (East-positive).",
        examples=[0.0],
    )
    elevation_m: float = Field(
        0.0,
        description="Site elevation above the reference sphere in metres.",
        examples=[0.0],
    )

    @field_validator("utc_time")
    @classmethod
    def validate_utc_time(cls, v: str) -> str:
        """
        Reject timestamps that lack an explicit timezone designator.
        Accepts 'Z', '+HH:MM', or '-HH:MM' suffixes.
        """
        v = v.strip()
        # Must end with Z, +HH:MM, or -HH:MM
        tz_pattern = re.compile(
            r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?"
            r"(Z|[+-]\d{2}:\d{2})$"
        )
        if not tz_pattern.match(v):
            raise ValueError(
                "utc_time must be a valid ISO-8601 timestamp with an explicit "
                "timezone designator (e.g. '2026-10-16T12:00:00Z' or "
                "'2026-10-16T12:00:00+00:00')."
            )
        return v

    model_config = {"json_schema_extra": {
        "example": {
            "utc_time": "2026-10-16T12:00:00Z",
            "latitude_deg": -85.0,
            "longitude_deg": 0.0,
            "elevation_m": 0.0,
        }
    }}


class MissionTimelineRequest(BaseModel):
    """Input for the POST /api/mission/timeline endpoint."""

    start_utc: str = Field(
        ...,
        description="Mission start ISO-8601 UTC timestamp with timezone (e.g. '2026-10-16T12:00:00Z').",
        examples=["2026-10-16T12:00:00Z"],
    )
    end_utc: str = Field(
        ...,
        description="Mission conclusion ISO-8601 UTC timestamp with timezone (e.g. '2026-10-23T12:00:00Z').",
        examples=["2026-10-23T12:00:00Z"],
    )
    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Geodetic latitude of the site in degrees (+N / -S).",
        examples=[-89.463],
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="Longitude of the site in degrees (East-positive).",
        examples=[222.51],
    )
    elevation_m: float = Field(
        0.0,
        description="Site elevation above the reference sphere in metres.",
        examples=[1100.0],
    )
    instrument_height_m: float = Field(
        2.0,
        ge=0.0,
        le=100.0,
        description="Instrument mast height in metres above local terrain.",
        examples=[2.0],
    )
    step_minutes: int = Field(
        60,
        ge=1,
        le=1440,
        description="Time sampling step in minutes (e.g. 15, 30, 60).",
        examples=[60],
    )
    refinement_tolerance_sec: int = Field(
        60,
        ge=1,
        le=3600,
        description="Transition bisection refinement resolution tolerance in seconds.",
        examples=[60],
    )

    @field_validator("start_utc", "end_utc")
    @classmethod
    def validate_utc_timestamps(cls, v: str) -> str:
        v = v.strip()
        tz_pattern = re.compile(
            r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?"
            r"(Z|[+-]\d{2}:\d{2})$"
        )
        if not tz_pattern.match(v):
            raise ValueError(
                "Timestamp must be a valid ISO-8601 timestamp with an explicit timezone (e.g. '2026-10-16T12:00:00Z')."
            )
        return v

    model_config = {"json_schema_extra": {
        "example": {
            "start_utc": "2026-10-16T12:00:00Z",
            "end_utc": "2026-10-23T12:00:00Z",
            "latitude_deg": -89.463,
            "longitude_deg": 222.51,
            "elevation_m": 1100.0,
            "instrument_height_m": 2.0,
            "step_minutes": 60,
            "refinement_tolerance_sec": 60,
        }
    }}


class CandidateScenarioItem(BaseModel):
    """A single scenario configuration submitted for candidate comparison."""

    id: str = Field(..., description="Unique scenario identifier, e.g. 'sc-1'.")
    name: str = Field(..., description="Human-readable scenario name, e.g. 'Site 01 Ridge'.")
    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Geodetic latitude in degrees (+N / -S).",
        examples=[-89.463],
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="East-positive longitude in degrees.",
        examples=[222.51],
    )
    elevation_m: float = Field(
        0.0,
        description="Site surface elevation in metres above 1737.4 km reference sphere.",
        examples=[1100.0],
    )
    instrument_height_m: float = Field(
        2.0,
        ge=0.0,
        le=100.0,
        description="Instrument mast height in metres above terrain.",
        examples=[2.0],
    )
    start_utc: str = Field(
        ...,
        description="Mission start ISO-8601 UTC timestamp with timezone.",
        examples=["2026-10-16T12:00:00Z"],
    )
    end_utc: str = Field(
        ...,
        description="Mission end ISO-8601 UTC timestamp with timezone.",
        examples=["2026-10-23T12:00:00Z"],
    )
    step_minutes: int = Field(
        60,
        ge=1,
        le=1440,
        description="Time sampling step in minutes.",
        examples=[60],
    )

    @field_validator("start_utc", "end_utc")
    @classmethod
    def validate_utc_timestamps(cls, v: str) -> str:
        v = v.strip()
        tz_pattern = re.compile(
            r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?"
            r"(Z|[+-]\d{2}:\d{2})$"
        )
        if not tz_pattern.match(v):
            raise ValueError(
                "Timestamp must be a valid ISO-8601 timestamp with an explicit timezone."
            )
        return v


class ComparisonConstraints(BaseModel):
    """User-defined scientific landing constraints for scenario evaluation."""

    min_sunlight_percent: Optional[float] = Field(
        None, ge=0.0, le=100.0, description="Minimum required illumination percentage (full + partial sunlight)."
    )
    min_earth_los_percent: Optional[float] = Field(
        None, ge=0.0, le=100.0, description="Minimum required direct-to-Earth visibility percentage."
    )
    max_slope_deg: Optional[float] = Field(
        None, ge=0.0, le=90.0, description="Maximum tolerable terrain landing slope in degrees."
    )
    max_continuous_darkness_hours: Optional[float] = Field(
        None, ge=0.0, description="Maximum continuous darkness period in hours (battery survival threshold)."
    )
    min_elevation_m: Optional[float] = Field(
        None, description="Minimum surface elevation in metres above reference sphere."
    )


class CandidateComparisonRequest(BaseModel):
    """Input for POST /api/mission/compare — side-by-side landing site and date evaluation."""

    scenarios: list[CandidateScenarioItem] = Field(
        ...,
        min_length=2,
        description="At least two candidate mission scenarios to compare.",
    )
    constraints: Optional[ComparisonConstraints] = Field(
        None,
        description="Optional scientific and engineering thresholds.",
    )
    ranking_weights: Optional[dict[str, float]] = Field(
        None,
        description="Optional multi-criteria decision weights (e.g. sunlight_pct, earth_los_pct, low_slope, min_darkness).",
    )


class MissionExportRequest(BaseModel):
    """Input for single-scenario mission analysis export (PDF, CSV, JSON)."""

    scenario_name: str = Field(
        "Artemis Candidate Mission",
        description="Scenario title or mission identifier.",
    )
    notes: Optional[str] = Field(
        "",
        description="Scientist notes and objectives.",
    )
    site_name: Optional[str] = Field(
        "South Pole Landing Site",
        description="Designation of the landing site.",
    )
    latitude_deg: float = Field(
        ...,
        ge=-90.0,
        le=90.0,
        description="Site latitude in degrees (South negative).",
    )
    longitude_deg: float = Field(
        ...,
        ge=-180.0,
        le=360.0,
        description="Site longitude in degrees (East-positive).",
    )
    elevation_m: float = Field(
        0.0,
        description="Surface elevation above reference sphere in metres.",
    )
    instrument_height_m: float = Field(
        2.0,
        ge=0.0,
        le=100.0,
        description="Observer instrument height above surface in metres.",
    )
    start_utc: str = Field(
        ...,
        description="Mission start ISO-8601 UTC timestamp with timezone.",
    )
    end_utc: str = Field(
        ...,
        description="Mission end ISO-8601 UTC timestamp with timezone.",
    )
    step_minutes: int = Field(
        60,
        ge=1,
        le=1440,
        description="Sampling step in minutes.",
    )
    timeline_result: Optional[dict[str, Any]] = Field(
        None,
        description="Precalculated timeline calculation result dictionary (if available).",
    )
    horizon_result: Optional[dict[str, Any]] = Field(
        None,
        description="Precalculated horizon profile / visibility result dictionary (if available).",
    )

    @field_validator("start_utc", "end_utc")
    @classmethod
    def validate_utc_timestamps(cls, v: str) -> str:
        v = v.strip()
        tz_pattern = re.compile(
            r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?"
            r"(Z|[+-]\d{2}:\d{2})$"
        )
        if not tz_pattern.match(v):
            raise ValueError(
                "Timestamp must be a valid ISO-8601 timestamp with an explicit timezone."
            )
        return v


class ComparisonExportRequest(BaseModel):
    """Input for candidate-site comparison export (PDF, CSV, JSON)."""

    report_title: str = Field(
        "LUNAOPS Candidate-Site Comparison Analysis",
        description="Report title.",
    )
    scenarios: list[CandidateScenarioItem] = Field(
        ...,
        min_length=2,
        description="List of candidate scenarios.",
    )
    constraints: Optional[ComparisonConstraints] = Field(
        None,
        description="Configured scientific constraints.",
    )
    ranking_weights: Optional[dict[str, float]] = Field(
        None,
        description="Multi-criteria ranking weights.",
    )
    comparison_result: Optional[dict[str, Any]] = Field(
        None,
        description="Precalculated comparison result dictionary (if available).",
    )



