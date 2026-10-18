/**
 * types/mission.ts — LUNAOPS Mission Scenario & Planning Types.
 *
 * Defines the structured data model for Phase 3A: Landing-Site Selection
 * and Mission Configuration.
 */

import type { GeometryResponse } from '../spiceClient';

export type ReadinessState =
  | 'READY'
  | 'READY_WITH_LIMITATIONS'
  | 'INCOMPLETE'
  | 'ERROR';

export interface ReadinessCheck {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface LandingSiteConfig {
  name: string;
  designation: string;
  latitudeDeg: number;       // Range: [-90, +90], - = South, + = North
  longitudeDeg: number;      // Range: [0, 360) or [-180, +180], East-positive
  elevationM: number;        // Metres above R=1737.4 km reference sphere
  coordinateConvention: string;
  referenceDatum: string;
  isInsideSite01DEM: boolean;
  demDatasetName?: string;
  sampledElevationM?: number;
  sampledSlopeDeg?: number;
  sampledErrorM?: number;
  pixelCoords?: { px: number; py: number; gridMax: number };
  polarStereoM?: { x: number; y: number };
}

export interface TimelineConfig {
  startDate: string;         // 'YYYY-MM-DD'
  startTime: string;         // 'HH:MM:SS'
  isoUtcStart: string;       // Normalized ISO-8601 UTC string (e.g. '2026-10-16T12:00:00Z')
  durationValue: number;     // e.g. 14
  durationUnit: 'days' | 'hours';
  isoUtcEnd: string;         // Normalized ISO-8601 UTC end string
  timeStepHours: number;     // e.g. 1, 6, 24 for future time-series engine
  isWithinKernelCoverage: boolean;
}

export interface MissionScenario {
  id: string;
  name: string;
  notes: string;
  createdAt: string;         // ISO-8601 UTC
  targetRegion: string;
  site: LandingSiteConfig;
  timeline: TimelineConfig;
  readiness: {
    state: ReadinessState;
    summary: string;
    checks: ReadinessCheck[];
  };
  initialGeometry?: GeometryResponse;
}
