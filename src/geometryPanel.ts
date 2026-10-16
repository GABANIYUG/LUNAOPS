/**
 * geometryPanel.ts — LUNAOPS SPICE Geometry Panel.
 *
 * Renders a floating HUD panel showing NASA/JPL SPICE-calculated Sun and
 * Earth positions for a selected UTC timestamp and lunar site.
 *
 * Design decisions:
 *  - This file touches ONLY the panel DOM and the Three.js sunLight/
 *    earthshineLight direction.  It does NOT modify any other parts of
 *    main.ts (Moon mesh, controls, post-processing, etc.).
 *  - Sun lighting direction is updated only when the backend returns a
 *    validated result.  The fallback animated direction in main.ts remains
 *    active when the backend is unavailable.
 *  - The panel clearly distinguishes between geometric horizon results
 *    (from SPICE) and terrain-aware visibility (not yet implemented).
 */

import * as THREE from 'three';
import {
  fetchSpiceHealth,
  fetchGeometry,
  moonMeToScene,
  type GeometryResponse,
  type SpiceHealth,
} from './spiceClient';

// ---------------------------------------------------------------------------
// Types provided by the consumer (main.ts)
// ---------------------------------------------------------------------------

export interface PanelLights {
  sunLight: THREE.DirectionalLight;
  earthshineLight: THREE.DirectionalLight;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let _lights: PanelLights | null = null;
let _fetchInFlight = false;
let _autoUpdate = false;
let _autoInterval: ReturnType<typeof setInterval> | null = null;

// Default site: an explicitly defined test location (NOT a real landing site)
const DEFAULT_SITE = {
  lat: -85.0,
  lon: 0.0,
  elev: 0.0,
  label: 'Test location — not a verified landing site',
};

// ---------------------------------------------------------------------------
// Panel DOM construction
// ---------------------------------------------------------------------------

export function createGeometryPanel(lights: PanelLights): HTMLElement {
  _lights = lights;

  const panel = document.createElement('div');
  panel.id = 'spice-panel';
  panel.innerHTML = buildPanelHTML();
  document.body.appendChild(panel);

  // Wire up controls
  panel.querySelector<HTMLButtonElement>('#spice-fetch-btn')!
    .addEventListener('click', () => triggerFetch(panel));

  panel.querySelector<HTMLButtonElement>('#spice-auto-btn')!
    .addEventListener('click', () => toggleAutoUpdate(panel));

  // Collapse/expand toggle
  const header = panel.querySelector<HTMLDivElement>('.spice-header')!;
  const body   = panel.querySelector<HTMLDivElement>('.spice-body')!;
  header.addEventListener('click', () => {
    const collapsed = body.style.display === 'none';
    body.style.display = collapsed ? '' : 'none';
    header.querySelector('.spice-collapse-icon')!.textContent = collapsed ? '▼' : '▶';
  });

  // Populate datetime input with current UTC time
  const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input')!;
  timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';

  // Check backend health on load (non-blocking)
  checkHealth(panel);

  return panel;
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function buildPanelHTML(): string {
  return `
<div class="spice-header">
  <span class="spice-title">☀ SPICE Geometry</span>
  <span class="spice-subtitle">NASA/JPL · MOON_ME</span>
  <span class="spice-collapse-icon">▼</span>
</div>
<div class="spice-body">
  <div class="spice-status-row" id="spice-status-row">
    <span class="spice-status-dot" id="spice-status-dot"></span>
    <span id="spice-status-text">Checking backend…</span>
  </div>

  <div class="spice-section">
    <div class="spice-label">UTC TIME</div>
    <input type="text" id="spice-time-input" class="spice-input"
           placeholder="2026-10-16T12:00:00Z"
           title="ISO-8601 UTC timestamp with Z suffix" />
  </div>

  <div class="spice-section spice-site-section">
    <div class="spice-label">SITE (TEST LOCATION)</div>
    <div class="spice-site-grid">
      <label class="spice-label-sm">Lat °</label>
      <input type="number" id="spice-lat" class="spice-input-sm"
             value="${DEFAULT_SITE.lat}" min="-90" max="90" step="0.1" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${DEFAULT_SITE.lon}" min="-180" max="360" step="0.1" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${DEFAULT_SITE.label}</div>
  </div>

  <div class="spice-actions">
    <button id="spice-fetch-btn" class="spice-btn spice-btn-primary">Calculate</button>
    <button id="spice-auto-btn" class="spice-btn">Auto ●</button>
  </div>

  <div id="spice-loading" class="spice-loading" style="display:none">
    <div class="spice-spinner"></div> Querying SPICE…
  </div>
  <div id="spice-error-box" class="spice-error" style="display:none"></div>

  <!-- Sun results -->
  <div class="spice-results" id="spice-results" style="display:none">
    <div class="spice-result-group">
      <div class="spice-result-heading">☀ SUN</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-sun-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-sun-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-sun-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-sun-horizon">geometric only</span>
        <span class="spice-data-label">Terrain</span>
        <span class="spice-data-value spice-na-badge">not computed</span>
      </div>
    </div>

    <div class="spice-result-group">
      <div class="spice-result-heading">🌍 EARTH</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-earth-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-earth-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-earth-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-earth-horizon">geometric only</span>
        <span class="spice-data-label">Terrain</span>
        <span class="spice-data-value spice-na-badge">not computed</span>
      </div>
    </div>

    <div class="spice-frame-line">
      <span id="res-frame">MOON_ME</span> ·
      <span id="res-aberration">NONE (geometric)</span>
    </div>
    <div class="spice-scene-note" id="spice-scene-note" style="display:none">
      ⚡ Sun light direction updated in scene
    </div>
    <div class="spice-terrain-warning">
      ⚠ Positive elevation ≠ terrain-clear.  DEM occlusion not yet computed (step 6).
    </div>
  </div>
</div>
`;
}

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

async function checkHealth(panel: HTMLElement): Promise<void> {
  const dot  = panel.querySelector<HTMLSpanElement>('#spice-status-dot')!;
  const text = panel.querySelector<HTMLSpanElement>('#spice-status-text')!;
  const fetchBtn = panel.querySelector<HTMLButtonElement>('#spice-fetch-btn')!;

  try {
    const health: SpiceHealth = await fetchSpiceHealth();
    const ok = health.status === 'ok';
    dot.className  = 'spice-status-dot ' + (ok ? 'dot-ok' : 'dot-warn');
    text.textContent = ok
      ? `SPICE ready \u00b7 ${health.reference_frame}`
      : `Backend degraded: ${health.error ?? 'unknown error'}`;
    fetchBtn.disabled = !ok;
  } catch {
    dot.className  = 'spice-status-dot dot-err';
    text.textContent = 'Backend offline - start backend on port 8000';
    fetchBtn.disabled = true;
  }
}

// ---------------------------------------------------------------------------
// Fetch and display geometry
// ---------------------------------------------------------------------------

async function triggerFetch(panel: HTMLElement): Promise<void> {
  if (_fetchInFlight) return;
  _fetchInFlight = true;

  const loading  = panel.querySelector<HTMLDivElement>('#spice-loading')!;
  const errorBox = panel.querySelector<HTMLDivElement>('#spice-error-box')!;
  const results  = panel.querySelector<HTMLDivElement>('#spice-results')!;

  loading.style.display = 'flex';
  errorBox.style.display = 'none';
  results.style.display  = 'none';

  try {
    const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input')!;
    const latInput  = panel.querySelector<HTMLInputElement>('#spice-lat')!;
    const lonInput  = panel.querySelector<HTMLInputElement>('#spice-lon')!;

    const utc = timeInput.value.trim();
    const lat = parseFloat(latInput.value);
    const lon = parseFloat(lonInput.value);

    const geo = await fetchGeometry({
      utc_time: utc,
      latitude_deg: lat,
      longitude_deg: lon,
      elevation_m: 0.0,
    });

    displayResults(panel, geo);
    updateSceneLights(geo);

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    errorBox.textContent = `Error: ${msg}`;
    errorBox.style.display = 'block';

    // Re-check health in case the backend went down
    await checkHealth(panel);
  } finally {
    loading.style.display = 'none';
    _fetchInFlight = false;
  }
}

function displayResults(panel: HTMLElement, geo: GeometryResponse): void {
  const results = panel.querySelector<HTMLDivElement>('#spice-results')!;
  results.style.display = 'block';

  const fmt1 = (n: number) => n.toFixed(1);
  const fmtDist = (km: number) => km > 1e6
    ? `${(km / 1.495978707e8).toFixed(4)} AU`
    : `${km.toFixed(0)} km`;

  setText('res-sun-dist', fmtDist(geo.sun.distance_km));
  setText('res-sun-az',   `${fmt1(geo.sun.azimuth_deg)}°`);
  const sunEl = geo.sun.elevation_deg;
  setTextStyled('res-sun-el', `${fmt1(sunEl)}°`, sunEl >= 0 ? 'spice-above' : 'spice-below');
  setText('res-sun-horizon', sunEl >= 0 ? '↑ above horizon' : '↓ below horizon');

  setText('res-earth-dist', fmtDist(geo.earth.distance_km));
  setText('res-earth-az',   `${fmt1(geo.earth.azimuth_deg)}°`);
  const earthEl = geo.earth.elevation_deg;
  setTextStyled('res-earth-el', `${fmt1(earthEl)}°`, earthEl >= 0 ? 'spice-above' : 'spice-below');
  setText('res-earth-horizon', earthEl >= 0 ? '↑ above horizon' : '↓ below horizon');

  setText('res-frame', geo.reference_frame);
  setText('res-aberration', geo.aberration_correction);

  const sceneNote = panel.querySelector<HTMLDivElement>('#spice-scene-note')!;
  sceneNote.style.display = _lights ? 'block' : 'none';
}

function updateSceneLights(geo: GeometryResponse): void {
  if (!_lights) return;

  // Map MOON_ME Sun direction → Three.js scene coordinates
  const [sx, sy, sz] = moonMeToScene(geo.sun.direction_unit as [number, number, number]);
  const SCENE_SCALE = 8; // match the existing sunLight distance

  _lights.sunLight.position.set(sx * SCENE_SCALE, sy * SCENE_SCALE, sz * SCENE_SCALE);

  // Earthshine: opposite of Earth direction (subtle fill from Earth-lit side)
  const [ex, ey, ez] = moonMeToScene(geo.earth.direction_unit as [number, number, number]);
  _lights.earthshineLight.position.set(-ex * SCENE_SCALE, -ey * SCENE_SCALE, -ez * SCENE_SCALE);
}

// ---------------------------------------------------------------------------
// Auto-update
// ---------------------------------------------------------------------------

function toggleAutoUpdate(panel: HTMLElement): void {
  const btn = panel.querySelector<HTMLButtonElement>('#spice-auto-btn')!;
  _autoUpdate = !_autoUpdate;

  if (_autoUpdate) {
    btn.classList.add('active');
    btn.textContent = 'Auto ■';
    // Update datetime input to current UTC
    const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input')!;
    timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
    triggerFetch(panel);
    _autoInterval = setInterval(() => {
      timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
      triggerFetch(panel);
    }, 60_000); // refresh every minute
  } else {
    btn.classList.remove('active');
    btn.textContent = 'Auto ●';
    if (_autoInterval !== null) {
      clearInterval(_autoInterval);
      _autoInterval = null;
    }
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = 'spice-data-value'; }
}

function setTextStyled(id: string, text: string, cls: string): void {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = `spice-data-value ${cls}`; }
}
