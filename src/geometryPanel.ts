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
  fetchLandingWindows,
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

// Default site: NASA Artemis Site 01 Shackleton-de Gerlache Connecting Ridge
const DEFAULT_SITE = {
  lat: -89.463,
  lon: 222.51,
  elev: 1100.0,
  label: 'Artemis Site 01 · Shackleton–de Gerlache Ridge',
};

let _panelElement: HTMLElement | null = null;

export async function setPanelSite(lat: number, lon: number, label: string, utcTime?: string) {
  if (!_panelElement) return;
  const latInput = _panelElement.querySelector<HTMLInputElement>('#spice-lat');
  const lonInput = _panelElement.querySelector<HTMLInputElement>('#spice-lon');
  const timeInput = _panelElement.querySelector<HTMLInputElement>('#spice-time-input');
  const note = _panelElement.querySelector<HTMLDivElement>('#spice-site-note');
  const predBadge = _panelElement.querySelector<HTMLDivElement>('#spice-predicted-badge');

  if (latInput) latInput.value = lat.toFixed(3);
  if (lonInput) lonInput.value = lon.toFixed(2);
  if (note) note.textContent = label;

  // Sync active visual state on South Pole candidate site buttons
  _panelElement.querySelectorAll<HTMLButtonElement>('.spice-preset-btn').forEach((btn) => {
    const bLat = parseFloat(btn.dataset.lat || '999');
    const bLon = parseFloat(btn.dataset.lon || '999');
    if (Math.abs(bLat - lat) < 0.05 && Math.abs(bLon - lon) < 0.05) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (utcTime) {
    if (timeInput) timeInput.value = utcTime;
    if (predBadge) {
      predBadge.textContent = `🎯 Target Date: ${utcTime}`;
      predBadge.style.display = 'block';
    }
    triggerFetch(_panelElement);
    return;
  }

  // Scan landing windows to predict the next optimal safe landing date for this site
  if (predBadge) {
    predBadge.textContent = '⏳ Predicting optimal landing window...';
    predBadge.style.display = 'block';
  }

  try {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);
    const endDate = new Date(today.getTime() + 60 * 24 * 3600 * 1000).toISOString().slice(0, 10);

    const scan = await fetchLandingWindows({
      start_date: startDate,
      end_date: endDate,
      latitude_deg: lat,
      longitude_deg: lon,
    });

    let bestDateStr = scan.summary.best_window_start;
    let score = 0;
    if (!bestDateStr && scan.days.length > 0) {
      const safeDays = scan.days.filter((d) => d.is_safe_for_landing);
      if (safeDays.length > 0) {
        bestDateStr = safeDays[0].date;
        score = safeDays[0].safety_score;
      } else {
        const sorted = [...scan.days].sort((a, b) => b.safety_score - a.safety_score);
        bestDateStr = sorted[0].date;
        score = sorted[0].safety_score;
      }
    } else if (bestDateStr) {
      const match = scan.days.find((d) => d.date === bestDateStr);
      score = match?.safety_score ?? 100;
    }

    if (bestDateStr) {
      const bestIso = `${bestDateStr}T12:00:00Z`;
      if (timeInput) timeInput.value = bestIso;
      if (predBadge) {
        predBadge.innerHTML = `🎯 Predicted Safe Window: <strong>${bestDateStr}</strong> (${score}/100)`;
        predBadge.style.display = 'block';
      }
    } else {
      if (timeInput) timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
      if (predBadge) predBadge.style.display = 'none';
    }
  } catch (err) {
    console.warn('[SPICE] Landing window prediction scan failed, falling back to current time', err);
    if (timeInput) timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
    if (predBadge) predBadge.style.display = 'none';
  }

  triggerFetch(_panelElement);
}

export function setPanelTime(utcTime: string) {
  if (!_panelElement) return;
  const timeInput = _panelElement.querySelector<HTMLInputElement>('#spice-time-input');
  if (timeInput) {
    timeInput.value = utcTime;
    triggerFetch(_panelElement);
  }
}

// ---------------------------------------------------------------------------
// Panel DOM construction
// ---------------------------------------------------------------------------

export function createGeometryPanel(lights: PanelLights): HTMLElement {
  _lights = lights;

  const panel = document.createElement('div');
  panel.id = 'spice-panel';
  panel.innerHTML = buildPanelHTML();
  document.body.appendChild(panel);
  _panelElement = panel;

  // Wire up controls
  panel.querySelector<HTMLButtonElement>('#spice-fetch-btn')!
    .addEventListener('click', () => triggerFetch(panel));

  panel.querySelector<HTMLButtonElement>('#spice-auto-btn')!
    .addEventListener('click', () => toggleAutoUpdate(panel));

  panel.querySelector<HTMLButtonElement>('#spice-now-btn')
    ?.addEventListener('click', () => {
      const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input');
      if (timeInput) {
        timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
        triggerFetch(panel);
      }
    });

  // South Pole site presets
  panel.querySelectorAll<HTMLButtonElement>('.spice-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lat = parseFloat(btn.dataset.lat || '-90');
      const lon = parseFloat(btn.dataset.lon || '0');
      const label = btn.dataset.label || 'South Pole Site';
      setPanelSite(lat, lon, label);
      panel.querySelectorAll('.spice-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

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
  checkHealth(panel).then(() => {
    // Automatically predict safe landing date for default site
    setPanelSite(DEFAULT_SITE.lat, DEFAULT_SITE.lon, DEFAULT_SITE.label);
  });

  return panel;
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function buildPanelHTML(): string {
  return `
<div class="spice-header">
  <span class="spice-title">☀ SPICE Geometry</span>
  <span class="spice-subtitle">NASA/JPL · SOUTH POLE</span>
  <span class="spice-collapse-icon">▼</span>
</div>
<div class="spice-body">
  <div class="spice-status-row" id="spice-status-row">
    <span class="spice-status-dot" id="spice-status-dot"></span>
    <span id="spice-status-text">Checking backend…</span>
  </div>

  <div class="spice-section">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="spice-label">PREDICT DATE / UTC TIME</div>
      <button type="button" id="spice-now-btn" class="spice-now-btn" title="Refresh to current UTC time">Now ⟳</button>
    </div>
    <input type="text" id="spice-time-input" class="spice-input"
           placeholder="2026-10-16T12:00:00Z"
           title="ISO-8601 UTC timestamp with Z suffix" />
    <div id="spice-predicted-badge" class="spice-predicted-badge" style="display:none"></div>
  </div>

  <div class="spice-section spice-site-section">
    <div class="spice-label">SOUTH POLE CANDIDATE SITES</div>
    <div class="spice-presets-row">
      <button type="button" class="spice-preset-btn active"
              data-lat="-89.463" data-lon="222.51"
              data-label="Artemis Site 01 · Shackleton–de Gerlache Ridge"
              title="NASA Artemis Candidate Site 01">Site 01 (Ridge)</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-90.0" data-lon="0.0"
              data-label="Geographic South Pole (90.0°S)"
              title="True Lunar South Pole">South Pole 90°S</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-89.78" data-lon="128.0"
              data-label="Shackleton Crater Peak"
              title="Shackleton Crater Rim Peak">Shackleton Rim</button>
    </div>

    <div class="spice-site-grid">
      <label class="spice-label-sm">Lat °</label>
      <input type="number" id="spice-lat" class="spice-input-sm"
             value="${DEFAULT_SITE.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${DEFAULT_SITE.lon}" min="-180" max="360" step="0.01" />
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
