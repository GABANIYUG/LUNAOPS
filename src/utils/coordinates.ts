/**
 * utils/coordinates.ts — Rigorous Lunar & Polar Stereographic Transformations.
 *
 * Implements mathematically verified forward and inverse projections for:
 *  1. Selenographic (Lat/Lon) <-> Polar Stereographic (Site 01 GeoTIFF)
 *  2. Polar Stereographic (X, Y in metres) <-> Raster Pixels (3200x3200 / 512x512)
 *  3. Selenographic (Lat/Lon) <-> Three.js Moon Mesh Local Coordinates
 *
 * Conforms to:
 *  - Datum: IAU Spherical Moon (R = 1,737,400.0 m)
 *  - Reference Frame: MOON_ME (Mean Earth / Polar Axis, East-positive)
 *  - USGS Polar Stereographic: lat_0 = -90°, lat_ts = -90°, lon_0 = 0°
 */

import * as THREE from 'three';

export const LUNAR_RADIUS_M = 1737400.0;
export const LUNAR_RADIUS_KM = 1737.4;

// Site 01 GeoTIFF Raster affine parameters (from metadata inspection):
// Bounds: X in [-19000, -3000] m, Y in [-20000, -4000] m (16 km x 16 km tile)
export const SITE01_BOUNDS = {
  minX: -19000.0,
  maxX: -3000.0,
  minY: -20000.0,
  maxY: -4000.0,
  pixelSizeM: 5.0,
  fullWidthPx: 3200,
  fullHeightPx: 3200,
  previewGridSize: 512,
};

/**
 * Forward Polar Stereographic projection (South Pole aspect).
 * Maps selenographic (lonDeg, latDeg) -> (x, y) in metres.
 *
 * Projection parameters:
 *  - lat_0 = -90° (South Pole)
 *  - lon_0 = 0° (Prime Meridian / Earth-facing direction)
 *  - lat_ts = -90°
 *  - R = 1,737,400 m
 */
export function selenographicToPolarStereo(
  lonDeg: number,
  latDeg: number,
  R: number = LUNAR_RADIUS_M,
): { x: number; y: number } {
  // Normalize lon to [0, 360)
  const normLon = ((lonDeg % 360.0) + 360.0) % 360.0;
  const lam = (normLon * Math.PI) / 180.0;
  const phi = (latDeg * Math.PI) / 180.0;

  // Colatitude from South Pole: c = pi/2 + phi (where phi in [-pi/2, 0])
  const c = Math.PI / 2.0 + phi;
  const rho = 2.0 * R * Math.tan(c / 2.0);

  // In USGS South Polar Stereographic with central meridian lon_0 = 0:
  // x = rho * sin(lon), y = rho * cos(lon)
  const x = rho * Math.sin(lam);
  const y = rho * Math.cos(lam);

  return { x, y };
}

/**
 * Inverse Polar Stereographic projection (South Pole aspect).
 * Maps projected (x, y) in metres -> selenographic (lonDeg, latDeg).
 */
export function polarStereoToSelenographic(
  x: number,
  y: number,
  R: number = LUNAR_RADIUS_M,
): { lonDeg: number; latDeg: number } {
  const rho = Math.hypot(x, y);

  if (rho < 1e-7) {
    // Exact South Pole
    return { lonDeg: 0.0, latDeg: -90.0 };
  }

  const c = 2.0 * Math.atan2(rho, 2.0 * R);
  const phi = -Math.PI / 2.0 + c;
  const lam = Math.atan2(x, y);

  const lonDeg = ((lam * 180.0) / Math.PI + 360.0) % 360.0;
  const latDeg = (phi * 180.0) / Math.PI;

  return { lonDeg, latDeg };
}

/**
 * Checks whether a given (lonDeg, latDeg) point falls within the Site01
 * 5m/px high-resolution DEM raster footprint.
 */
export function isInsideSite01Coverage(lonDeg: number, latDeg: number): boolean {
  if (latDeg > -80.0) return false; // Early out for non-polar coordinates
  const { x, y } = selenographicToPolarStereo(lonDeg, latDeg);
  return (
    x >= SITE01_BOUNDS.minX &&
    x <= SITE01_BOUNDS.maxX &&
    y >= SITE01_BOUNDS.minY &&
    y <= SITE01_BOUNDS.maxY
  );
}

/**
 * Converts polar stereographic (x, y) to full raster pixel coords (0..3200)
 * and preview grid coords (0..512).
 */
export function polarStereoToRasterPixels(
  x: number,
  y: number,
): { pxFull: number; pyFull: number; px512: number; py512: number; isInside: boolean } {
  const isInside =
    x >= SITE01_BOUNDS.minX &&
    x <= SITE01_BOUNDS.maxX &&
    y >= SITE01_BOUNDS.minY &&
    y <= SITE01_BOUNDS.maxY;

  // Affine transform:
  // x = minX + 5.0 * px  => px = (x - minX) / 5.0
  // y = maxY - 5.0 * py  => py = (maxY - y) / 5.0
  const pxFull = (x - SITE01_BOUNDS.minX) / SITE01_BOUNDS.pixelSizeM;
  const pyFull = (SITE01_BOUNDS.maxY - y) / SITE01_BOUNDS.pixelSizeM;

  // Normalized [0..1]
  const u = pxFull / SITE01_BOUNDS.fullWidthPx;
  const v = pyFull / SITE01_BOUNDS.fullHeightPx;

  const px512 = Math.max(0, Math.min(511, Math.round(u * 512)));
  const py512 = Math.max(0, Math.min(511, Math.round(v * 512)));

  return { pxFull, pyFull, px512, py512, isInside };
}

/**
 * Converts a preview pixel (0..512) back to selenographic lat/lon.
 */
export function previewPixelToSelenographic(
  px512: number,
  py512: number,
): { lonDeg: number; latDeg: number; x: number; y: number } {
  const u = Math.max(0, Math.min(1, px512 / 512));
  const v = Math.max(0, Math.min(1, py512 / 512));

  const x = SITE01_BOUNDS.minX + u * (SITE01_BOUNDS.maxX - SITE01_BOUNDS.minX);
  const y = SITE01_BOUNDS.maxY - v * (SITE01_BOUNDS.maxY - SITE01_BOUNDS.minY);

  const { lonDeg, latDeg } = polarStereoToSelenographic(x, y);
  return { lonDeg, latDeg, x, y };
}

/**
 * Converts selenographic (latDeg, lonDeg) to 3D local vector on Moon mesh.
 * Note: Three.js coordinates in moonGroup are aligned so that:
 *  - Y axis = Lunar polar axis (+Y North, -Y South)
 *  - +X axis = Prime meridian (lon = 0°)
 *  - -Z axis = East (+90°E)
 */
export function selenographicToMoonVector(
  latDeg: number,
  lonDeg: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90.0 - latDeg) * (Math.PI / 180.0);
  const theta = (lonDeg + 180.0) * (Math.PI / 180.0);

  const x = -radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(theta) * Math.sin(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Converts a 3D local point on the Moon mesh to selenographic (latDeg, lonDeg).
 */
export function moonVectorToSelenographic(
  localVec: THREE.Vector3,
  _radius?: number,
): { latDeg: number; lonDeg: number } {
  const norm = localVec.clone().normalize();

  // Y is the polar axis: lat = asin(y)
  const latRad = Math.asin(Math.max(-1.0, Math.min(1.0, norm.y)));
  const latDeg = (latRad * 180.0) / Math.PI;

  // In our spherical coordinate formulation:
  // x = +radius * cos(lat) * cos(lon)
  // z = -radius * cos(lat) * sin(lon)
  // Therefore: lon = atan2(-z, x)
  const lonRad = Math.atan2(-norm.z, norm.x);
  let lonDeg = (lonRad * 180.0) / Math.PI;
  if (lonDeg < 0) lonDeg += 360.0; // East-positive in [0, 360)

  return { latDeg, lonDeg };
}

/**
 * Format coordinates cleanly for scientific mission display.
 */
export function formatSelenographicCoords(latDeg: number, lonDeg: number): string {
  const latStr = `${Math.abs(latDeg).toFixed(3)}° ${latDeg < 0 ? 'S' : 'N'}`;
  const normLon = ((lonDeg % 360.0) + 360.0) % 360.0;
  const lonStr = `${normLon.toFixed(3)}° E`;
  return `${latStr}, ${lonStr}`;
}
