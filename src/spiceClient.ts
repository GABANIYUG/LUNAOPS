/**
 * spiceClient.ts — LUNAOPS SPICE API client.
 *
 * Communicates with the FastAPI backend at localhost:8000.
 * All data returned from these functions originates from real SPICE
 * calculations; no values are fabricated by this client.
 */

export const SPICE_API_BASE = 'http://localhost:8000';

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
