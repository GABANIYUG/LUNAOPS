/**
 * spiceClient.ts — LUNAOPS SPICE API client.
 *
 * Communicates with the FastAPI backend at localhost:8001.
 * All data returned from these functions originates from real SPICE
 * calculations; no values are fabricated by this client.
 */

export const SPICE_API_BASE = 'http://localhost:8001';

// ---------------------------------------------------------------------------
// Type definitions matching backend response schemas
// ---------------------------------------------------------------------------

export interface SpiceHealth {
  status: 'ok' | 'degraded';
  initialized: boolean;
  kernels_present: boolean;
  missing_kernels: string[];
  reference_frame: string;
  frame_available: boolean;
  diagnostic_calculation: boolean;
  error: string | null;
}

export interface BodyGeometry {
  position_km: [number, number, number];
  distance_km: number;
  distance_au?: number;
  direction_unit: [number, number, number];
  azimuth_deg: number;
  elevation_deg: number;
  geometric_only: boolean;
  terrain_occlusion: string;
}

export interface GeometryResponse {
  utc_time: string;
  spice_utc: string;
  ephemeris_time_s: number;
  reference_frame: string;
  aberration_correction: string;
  sun: BodyGeometry;
  earth: BodyGeometry;
  site: {
    latitude_deg: number;
    longitude_deg: number;
    elevation_m: number;
    position_moon_me_km: [number, number, number];
    coordinate_note: string;
  };
  limitations: {
    terrain_aware_visibility: boolean;
    site01_coordinate_validated: boolean;
    note: string;
  };
}

export interface GeometryRequest {
  utc_time: string;
  latitude_deg: number;
  longitude_deg: number;
  elevation_m: number;
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------

export async function fetchSpiceHealth(): Promise<SpiceHealth> {
  const resp = await fetch(`${SPICE_API_BASE}/api/spice/health`, {
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) {
    throw new Error(`Health check failed: HTTP ${resp.status}`);
  }
  return resp.json() as Promise<SpiceHealth>;
}

export async function fetchGeometry(req: GeometryRequest): Promise<GeometryResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/spice/geometry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Geometry request failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(msg);
  }
  return resp.json() as Promise<GeometryResponse>;
}

// ---------------------------------------------------------------------------
// Horizon API types and calls (Phase 3B)
// ---------------------------------------------------------------------------

export interface HorizonPoint {
  azimuth_deg: number;
  horizon_elevation_deg: number;
  horizon_distance_m: number;
  coverage_distance_m: number;
}

export interface HorizonProfileResponse {
  site_lon_deg: number;
  site_lat_deg: number;
  angular_step_deg: number;
  profile: HorizonPoint[];
  instrument_height_m: number;
  dem_dataset: string;
  is_inside_dem: boolean;
  dem_loaded: boolean;
}

export interface TargetObstruction {
  target: string;
  azimuth_deg: number;
  geometric_elevation_deg: number;
  terrain_horizon_elevation_deg: number | null;
  angular_clearance_deg: number | null;
  horizon_distance_m: number | null;
  coverage_distance_m?: number;
  visibility_status:
    | 'no_obstruction_detected_within_coverage'
    | 'near_horizon_grazing'
    | 'blocked_by_local_terrain'
    | 'blocked_by_lunar_body'
    | 'unknown_insufficient_coverage'
    | 'calculation_unavailable';
  coverage_limited: boolean;
  note: string;
}

export interface HorizonVisibilityResponse {
  site: {
    latitude_deg: number;
    longitude_deg: number;
    elevation_m: number | null;
    instrument_height_m: number;
    is_inside_dem: boolean;
  };
  sun: TargetObstruction;
  earth: TargetObstruction;
  dem_dataset: string;
  dem_loaded: boolean;
  note: string;
}

export interface HorizonProfileRequest {
  latitude_deg: number;
  longitude_deg: number;
  elevation_m?: number;
  instrument_height_m?: number;
  angular_step_deg?: number;
}

export interface HorizonVisibilityRequest {
  latitude_deg: number;
  longitude_deg: number;
  elevation_m?: number;
  instrument_height_m?: number;
  sun_azimuth_deg: number;
  sun_elevation_deg: number;
  sun_distance_km: number;
  earth_azimuth_deg: number;
  earth_elevation_deg: number;
  earth_distance_km: number;
}

export async function fetchHorizonProfile(req: HorizonProfileRequest): Promise<HorizonProfileResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/horizon/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Horizon profile failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return resp.json() as Promise<HorizonProfileResponse>;
}

export async function fetchHorizonVisibility(req: HorizonVisibilityRequest): Promise<HorizonVisibilityResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/horizon/visibility`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Horizon visibility failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return resp.json() as Promise<HorizonVisibilityResponse>;
}

// ---------------------------------------------------------------------------
// Mission Timeline API types and calls (Phase 4)
// ---------------------------------------------------------------------------

export interface MissionTimelineRequest {
  start_utc: string;
  end_utc: string;
  latitude_deg: number;
  longitude_deg: number;
  elevation_m?: number;
  instrument_height_m?: number;
  step_minutes?: number;
  refinement_tolerance_sec?: number;
}

export interface TimelineWindow {
  start_utc: string;
  end_utc: string;
  duration_hours: number;
  state: string;
}

export interface TimelineTargetPoint {
  azimuth_deg: number;
  elevation_deg: number;
  angular_radius_deg: number;
  distance_km: number;
  terrain_horizon_elevation_deg: number | null;
  horizon_distance_m: number | null;
  angular_clearance_deg: number | null;
  visibility_state: string;
  direction_unit: [number, number, number];
}

export interface TimelineSample {
  timestamp_utc: string;
  sun: TimelineTargetPoint;
  earth: TimelineTargetPoint;
}

export interface TimelineSummary {
  sunlight: {
    full_sunlight_hours: number;
    full_sunlight_percent: number;
    partial_sunlight_hours: number;
    partial_sunlight_percent: number;
    total_darkness_hours: number;
    total_darkness_percent: number;
    unknown_coverage_hours: number;
    max_continuous_sunlight_hours: number;
    max_continuous_darkness_hours: number;
    transition_count: number;
  };
  earth_los: {
    full_disc_los_hours: number;
    full_disc_los_percent: number;
    partial_disc_los_hours: number;
    partial_disc_los_percent: number;
    occulted_hours: number;
    occulted_percent: number;
    unknown_coverage_hours: number;
    max_continuous_los_hours: number;
    transition_count: number;
    communication_disclaimer: string;
  };
}

export interface MissionTimelineResponse {
  mission_scenario: {
    start_utc: string;
    end_utc: string;
    total_duration_hours: number;
    step_minutes: number;
    refinement_tolerance_sec: number;
    sample_count: number;
  };
  site: {
    latitude_deg: number;
    longitude_deg: number;
    elevation_m: number;
    instrument_height_m: number;
    is_inside_dem: boolean;
    dem_dataset: string;
  };
  summary: TimelineSummary;
  sun_windows: TimelineWindow[];
  earth_windows: TimelineWindow[];
  samples: TimelineSample[];
}

export interface CandidateScenarioPayload {
  id: string;
  name: string;
  latitude_deg: number;
  longitude_deg: number;
  elevation_m: number;
  instrument_height_m: number;
  start_utc: string;
  end_utc: string;
  step_minutes: number;
}

export interface ComparisonConstraintsPayload {
  min_sunlight_percent?: number | null;
  min_earth_los_percent?: number | null;
  max_slope_deg?: number | null;
  max_continuous_darkness_hours?: number | null;
  min_elevation_m?: number | null;
}

export interface CandidateComparisonRequest {
  scenarios: CandidateScenarioPayload[];
  constraints?: ComparisonConstraintsPayload | null;
  ranking_weights?: Record<string, number> | null;
}

export interface ConstraintEvaluationItem {
  id: string;
  label: string;
  threshold: string;
  actual: string;
  status: 'met' | 'unmet' | 'unevaluable';
  reason: string;
}

export interface ScenarioComparisonResult {
  scenario_id: string;
  scenario_name: string;
  inputs: {
    latitude_deg: number;
    longitude_deg: number;
    elevation_m: number;
    instrument_height_m: number;
    start_utc: string;
    end_utc: string;
    step_minutes: number;
  };
  validation: {
    valid: boolean;
    errors: string[];
    warnings: string[];
    is_inside_dem: boolean;
  };
  timeline_result: MissionTimelineResponse;
  terrain_statistics: {
    coverage_available: boolean;
    dataset_name: string | null;
    sample_radius_m: number;
    pixel_samples_count?: number;
    elevation: {
      point_m: number;
      mean_m: number;
      min_m: number;
      max_m: number;
      std_m: number;
      roughness_m: number;
    } | null;
    slope: {
      point_deg: number;
      mean_deg: number;
      min_deg: number;
      max_deg: number;
      std_deg: number;
    } | null;
    uncertainty: {
      point_m: number;
      mean_m: number;
      max_m: number;
    } | null;
    note: string;
  };
  constraints_evaluation: {
    items: ConstraintEvaluationItem[];
    met_count: number;
    unmet_count: number;
    unevaluable_count: number;
    all_met: boolean;
  };
}

export interface CandidateComparisonResponse {
  compared_count: number;
  comparison_table: Array<{
    scenario_id: string;
    scenario_name: string;
    location: string;
    time_range: string;
    duration_hours: number;
    dem_coverage: string;
    illumination_duration_hours: number;
    illumination_percent: number;
    max_continuous_sunlight_hours: number;
    max_continuous_darkness_hours: number;
    earth_los_duration_hours: number;
    earth_los_percent: number;
    max_continuous_earth_los_hours: number;
    elevation_readout: string;
    slope_readout: string;
    uncertainty_readout: string;
    constraints_summary: string;
  }>;
  scenarios: ScenarioComparisonResult[];
  ranking: {
    applied_weights: Record<string, number>;
    ranking: Array<{
      scenario_id: string;
      scenario_name: string;
      rank: number;
      composite_score: number;
      has_unevaluable_metrics: boolean;
      unevaluable_reasons: string[];
      criteria_scores: Record<string, number | null>;
      effective_weight_coverage: number;
    }>;
    disclaimer: string;
  };
  scientific_notes: {
    topocentric_geometry: string;
    terrain_skyline: string;
    operational_disclaimer: string;
  };
}

export async function fetchMissionTimeline(req: MissionTimelineRequest): Promise<MissionTimelineResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/mission/timeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Mission timeline calculation failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return resp.json() as Promise<MissionTimelineResponse>;
}

export async function fetchCandidateComparison(
  req: CandidateComparisonRequest,
): Promise<CandidateComparisonResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/mission/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Candidate comparison failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return resp.json() as Promise<CandidateComparisonResponse>;
}




// ---------------------------------------------------------------------------
// Landing Windows Date Scanner API types and calls (Phase 7)
// ---------------------------------------------------------------------------

export interface LandingWindowsRequest {
  start_date: string;   // YYYY-MM-DD
  end_date: string;     // YYYY-MM-DD
  latitude_deg: number;
  longitude_deg: number;
  elevation_m?: number;
}

export interface LandingWindowsDayRecord {
  date: string;
  sunlight: {
    full_hours: number;
    partial_hours: number;
    darkness_hours: number;
    avg_elevation_deg: number;
  };
  earth_los: {
    full_hours: number;
    partial_hours: number;
    occulted_hours: number;
    avg_elevation_deg: number;
  };
  safety_score: number;
  safety_rating: 'excellent' | 'good' | 'marginal' | 'poor';
  is_safe_for_landing: boolean;
}

export interface LandingWindowsResponse {
  site: {
    latitude_deg: number;
    longitude_deg: number;
    elevation_m: number;
    is_inside_dem: boolean;
  };
  scan_params: {
    start_date: string;
    end_date: string;
    total_days: number;
    step_hours: number;
    samples_per_day: number;
  };
  days: LandingWindowsDayRecord[];
  summary: {
    safe_days_count: number;
    excellent_days_count: number;
    best_window_start: string | null;
  };
}

export async function fetchLandingWindows(req: LandingWindowsRequest): Promise<LandingWindowsResponse> {
  const resp = await fetch(`${SPICE_API_BASE}/api/mission/landing-windows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    let msg = `Landing windows scan failed: HTTP ${resp.status}`;
    try {
      const err = await resp.json();
      msg += ` — ${err?.detail?.message ?? JSON.stringify(err)}`;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return resp.json() as Promise<LandingWindowsResponse>;
}


// ---------------------------------------------------------------------------
// MOON_ME → Three.js scene coordinate transform
// ---------------------------------------------------------------------------
/**
 * Map a vector from the MOON_ME frame to the Three.js scene coordinate system
 * used in LUNAOPS.
 *
 * MOON_ME axes:
 *   +X  = Mean Earth direction (lunar prime meridian, lon 0°)
 *   +Y  = Completes right-hand frame (lon 90° E at equator)
 *   +Z  = Lunar north pole
 *
 * Three.js scene axes for the LUNAOPS Moon:
 *   The Moon sphere uses a standard spherical UV mapping where:
 *   - U=0 maps to lon=0° (prime meridian / MOON_ME +X)
 *   - V=0.5 maps to the equator
 *   - The sphere is centred at (0,0,0) with +Y up
 *
 * The standard Three.js SphereGeometry maps texture as:
 *   lon increases from −180° to +180° as U goes 0 → 1 (left to right)
 *   lat increases from −90° (bottom) to +90° (top) as V goes 0 → 1
 *
 * For SphereGeometry with phi=0,2π (default), the +X Three.js axis
 * points toward lon=0°, and +Y Three.js points toward the north pole.
 * This matches MOON_ME exactly:
 *
 *   MOON_ME +X  →  Three.js +X  (prime meridian)
 *   MOON_ME +Y  →  Three.js +Z  (Three.js uses right-hand with Y-up, but
 *                                 SphereGeometry starts theta at +X in the XZ plane)
 *   MOON_ME +Z  →  Three.js +Y  (north pole = Y up)
 *
 * VALIDATION STATUS:
 *   This mapping is consistent with the standard Three.js SphereGeometry
 *   UV convention and the MOON_ME definition.  Pixel-perfect registration
 *   between the texture and SPICE frame has NOT been independently validated
 *   against a known surface feature (e.g., crater at 0°, 0°).  The scene
 *   also applies a 6.68° axial tilt (moonGroup.rotation.x) which is NOT
 *   accounted for in this transform — Sun lighting uses the scene-space
 *   direction and is not rigidly tied to MOON_ME.
 *
 * LIGHT DIRECTION CONVENTION:
 *   Three.js DirectionalLight.position is the direction FROM which light
 *   comes (the light source direction).  The SPICE vector we compute is
 *   Moon → Sun (direction of the Sun as seen from the Moon), which is the
 *   same sense.  We set sunLight.position = moonToSun_scene.
 *
 * @param v_moon_me  [x, y, z] in MOON_ME (any units; result is normalised)
 * @returns  THREE.Vector3 in scene coordinates (unit vector)
 */
export function moonMeToScene(v_moon_me: [number, number, number]): [number, number, number] {
  const [mx, my, mz] = v_moon_me;
  // MOON_ME +X → scene +X
  // MOON_ME +Y → scene +Z  (MOON_ME Y is 90°E equator; in three.js that is +Z)
  // MOON_ME +Z → scene +Y  (north pole)
  const sx = mx;
  const sy = mz;   // north pole → Y up
  const sz = my;   // 90°E → Z
  const len = Math.sqrt(sx * sx + sy * sy + sz * sz);
  if (len < 1e-10) return [0, 1, 0];
  return [sx / len, sy / len, sz / len];
}
