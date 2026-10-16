"""
schemas.py — Pydantic request/response models for the LUNAOPS SPICE API.
"""

from __future__ import annotations

from typing import Any
from pydantic import BaseModel, Field, field_validator
import re


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
