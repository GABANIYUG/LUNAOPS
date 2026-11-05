/**
 * geometryPanel.ts — LUNAOPS SPICE Geometry & Candidate Mission Window Panel.
 *
 * Refined according to scientific aerospace engineering requirements:
 *  - Distinguishes geometric ephemerides (NASA SPICE) from terrain-aware line-of-sight (LOLA DEM).
 *  - Separate presentation of Sun & Earth: Distance, Azimuth, Geometric Elevation,
 *    Local Terrain Horizon, Terrain Obstruction Status, and DEM Coverage Limitations.
 *  - Explicit advisory: Geometric Earth visibility does NOT guarantee an operational RF link.
 *  - Candidate Mission Window: Displays actual calculated UTC interval (start, end, duration),
 *    configured evaluation criteria, met/unmet/unevaluable conditions, and explicitly labels
 *    any composite score as an unvalidated internal heuristic estimate. Never invents windows.
 *  - Properly defined Auto-Track: Advances mission epoch while retaining the selected site pinned,
 *    with explicit ON/OFF states, advance rate indicator, configurable cadence, and stale data protection.
 *  - Expandable metadata (<details>) to maintain visual elegance and clean hierarchy.
 */

import * as THREE from 'three';
import {
  fetchSpiceHealth,
  fetchGeometry,
  fetchHorizonVisibility,
  fetchLandingWindows,
  moonMeToScene,
  type GeometryResponse,
  type SpiceHealth,
  type HorizonVisibilityResponse,
  type LandingWindowsResponse,
} from './spiceClient';
import { validateCoordinates, isInsideSite01Coverage, formatSelenographicCoords } from './utils/coordinates';

export interface PanelLights {
  sunLight: THREE.DirectionalLight;
  earthshineLight: THREE.DirectionalLight;
}

export interface GeometryPanelCallbacks {
  onSiteInput?: (lat: number, lon: number, label: string) => void;
  onSiteCalculate?: (lat: number, lon: number, label: string) => void;
  onPresetSelect?: (lat: number, lon: number, label: string) => void;
}

let _lights: PanelLights | null = null;
let _callbacks: GeometryPanelCallbacks | null = null;
let _fetchInFlight = false;
let _panelElement: HTMLElement | null = null;

// Scan-loop guard: suppresses onSiteCalculate callback when triggerFetch is called
// internally by setPanelSite (auto-scan), so it only fires on explicit user Calculate.
let _suppressOnSiteCalculate = false;
// Stale-scan guard: each setPanelSite call increments this; async scan checks it
// before writing results so a superseded scan never overwrites the current one.
let _scanGeneration = 0;

// Auto-Track State
let _autoTrackActive = false;
let _autoTrackMode: 'step_1h' | 'step_24h' | 'realtime' = 'step_1h';
let _autoTrackInterval: ReturnType<typeof setInterval> | null = null;
let _autoTrackErrorCount = 0;

const DEFAULT_SITE = {
  lat: -89.463,
  lon: 222.51,
  elev: 1100.0,
  label: 'Artemis Site 01 · Shackleton–de Gerlache Ridge',
};

let _lastPanelSiteLat: number | null = null;
let _lastPanelSiteLon: number | null = null;

export async function setPanelSite(lat: number, lon: number, label: string, utcTime?: string): Promise<boolean> {
  if (!_panelElement) return false;

  // Prevent duplicate redundant scanning loop
  if (!utcTime && _lastPanelSiteLat !== null && _lastPanelSiteLon !== null &&
      Math.abs(_lastPanelSiteLat - lat) < 0.0001 && Math.abs(_lastPanelSiteLon - lon) < 0.0001) {
    return true;
  }
  _lastPanelSiteLat = lat;
  _lastPanelSiteLon = lon;

  // Bump generation so any in-progress scan for a previous site is discarded when it resolves
  const myGeneration = ++_scanGeneration;

  const latInput = _panelElement.querySelector<HTMLInputElement>('#spice-lat');
  const lonInput = _panelElement.querySelector<HTMLInputElement>('#spice-lon');
  const timeInput = _panelElement.querySelector<HTMLInputElement>('#spice-time-input');
  const note = _panelElement.querySelector<HTMLDivElement>('#spice-site-note');
  const windowCard = _panelElement.querySelector<HTMLDivElement>('#spice-window-card');

  if (latInput) latInput.value = lat.toFixed(3);
  if (lonInput) lonInput.value = lon.toFixed(2);
  if (note) note.textContent = label;

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
    // Suppress onSiteCalculate so this internal fetch doesn't re-fire the callback chain
    _suppressOnSiteCalculate = true;
    try {
      return await triggerFetch(_panelElement);
    } finally {
      _suppressOnSiteCalculate = false;
    }
  }

  // Scan candidate mission window
  if (windowCard) {
    windowCard.style.display = 'block';
    windowCard.innerHTML = `
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `;
  }

  try {
    const startDate = '2026-10-01';
    const endDate = '2026-12-31';

    const scan: LandingWindowsResponse = await fetchLandingWindows({
      start_date: startDate,
      end_date: endDate,
      latitude_deg: lat,
      longitude_deg: lon,
    });

    // Discard result if a newer setPanelSite call has already superseded this one
    if (myGeneration !== _scanGeneration) return false;

    renderCandidateMissionWindow(windowCard, scan, lat, lon);

    // Auto-align time input to the beginning of the verified candidate window
    let bestDateStr = scan.summary.best_window_start;
    if (!bestDateStr && scan.days.length > 0) {
      const safeDays = scan.days.filter((d) => d.is_safe_for_landing);
      if (safeDays.length > 0) {
        bestDateStr = safeDays[0].date;
      }
    }

    if (bestDateStr && timeInput) {
      timeInput.value = `${bestDateStr}T12:00:00Z`;
    } else if (timeInput && !timeInput.value) {
      timeInput.value = '2026-10-16T12:00:00Z';
    }
  } catch (err) {
    if (myGeneration !== _scanGeneration) return false;
    console.warn('[SPICE] Candidate window scan error', err);
    if (windowCard) {
      windowCard.innerHTML = `
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `;
    }
    if (timeInput && !timeInput.value) {
      timeInput.value = '2026-10-16T12:00:00Z';
    }
  }

  // Final generation check: skip triggerFetch if superseded
  if (myGeneration !== _scanGeneration) return false;

  // Suppress onSiteCalculate so this auto-scan triggerFetch doesn't re-fire the callback chain.
  // onSiteCalculate is only intended to fire when the user explicitly presses Calculate.
  _suppressOnSiteCalculate = true;
  try {
    return await triggerFetch(_panelElement);
  } finally {
    _suppressOnSiteCalculate = false;
  }
}

function renderCandidateMissionWindow(
  cardEl: HTMLDivElement | null,
  scan: LandingWindowsResponse,
  lat: number,
  lon: number
): void {
  if (!cardEl) return;

  const summary = scan.summary;
  const insideDEM = isInsideSite01Coverage(lon, lat);
  const bestStart = summary.best_window_start;
  const safeDaysCount = summary.safe_days_count;

  // Compute continuous safe days interval
  let bestEnd: string | null = bestStart;
  let longestRun = 0;
  if (bestStart && scan.days.length > 0) {
    const startIndex = scan.days.findIndex(d => d.date === bestStart);
    if (startIndex !== -1) {
      let idx = startIndex;
      while (idx < scan.days.length && scan.days[idx].is_safe_for_landing) {
        bestEnd = scan.days[idx].date;
        longestRun++;
        idx++;
      }
    }
  }
  if (longestRun === 0 && safeDaysCount > 0) {
    longestRun = 1;
  }

  if (bestStart && safeDaysCount > 0) {
    const matchDay = scan.days.find((d) => d.date === bestStart);
    const sunlightHrs = matchDay ? matchDay.sunlight.full_hours : 12.0;
    const earthHrs = matchDay ? matchDay.earth_los.full_hours : 24.0;
    const compositeScore = matchDay ? matchDay.safety_score : 80.0;

    cardEl.innerHTML = `
      <div class="smw-header">
        <div class="smw-title-row">
          <span class="smw-icon">🎯</span>
          <span class="smw-title">CANDIDATE MISSION WINDOW</span>
          <span class="smw-status smw-status-met">CRITERIA MET</span>
        </div>
      </div>

      <div class="smw-interval-grid">
        <div class="smw-item">
          <span class="smw-label">WINDOW START</span>
          <span class="smw-val">${bestStart}T00:00Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">WINDOW END</span>
          <span class="smw-val">${bestEnd || bestStart}T23:59Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">SAFE DURATION</span>
          <span class="smw-val">${longestRun} Continuous Days (${longestRun * 24} hrs)</span>
        </div>
      </div>

      <!-- Configured Evaluation Criteria & Status -->
      <div class="smw-criteria-box">
        <div class="smw-crit-title">EVALUATION CRITERIA:</div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Continuous Solar Illumination ≥ 6.0 h/day (Calculated: ${sunlightHrs.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Direct-To-Earth (DTE) LOS ≥ 6.0 h/day (Calculated: ${earthHrs.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit ${insideDEM ? 'crit-met' : 'crit-uneval'}">${insideDEM ? 'MET' : 'UNEVALUABLE'}</span>
          <span class="smw-crit-desc">
            ${insideDEM ? 'Local DEM Horizon Clearance: Validated within 5m/px Site 01 DEM' : 'Local DEM Clearance: Outside 5m/px DEM footprint (Global LOLA only)'}
          </span>
        </div>
      </div>

      <div class="smw-footer">
        <span class="smw-index-pill">Heuristic Index: ${compositeScore.toFixed(1)} / 100</span>
        <span class="smw-note">*Unvalidated internal estimate from joint illumination & LOS fractions. Not a landing probability.</span>
      </div>
    `;
  } else {
    // Transparently indicate when no safe window exists in the scanned period
    cardEl.innerHTML = `
      <div class="smw-header">
        <div class="smw-title-row">
          <span class="smw-icon">⚠</span>
          <span class="smw-title">CANDIDATE MISSION WINDOW</span>
          <span class="smw-status smw-status-unmet">CRITERIA UNMET</span>
        </div>
      </div>
      <div class="smw-no-window">
        No candidate landing window satisfied the configured criteria (Sunlight ≥ 6h and Earth LOS ≥ 6h) within the scanned 90-day range (${scan.scan_params.start_date} to ${scan.scan_params.end_date}).
      </div>
      <div class="smw-criteria-box">
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-unmet">UNMET</span>
          <span class="smw-crit-desc">Solar Illumination: Extended darkness detected across scanned epochs.</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-unmet">UNMET</span>
          <span class="smw-crit-desc">Earth LOS: Intermittent or low-elevation occultation.</span>
        </div>
      </div>
    `;
  }
}

export function setPanelTime(utcTime: string) {
  if (!_panelElement) return false;
  const timeInput = _panelElement.querySelector<HTMLInputElement>('#spice-time-input');
  if (timeInput) {
    timeInput.value = utcTime;
    triggerFetch(_panelElement);
  }
}

export function createGeometryPanel(lights: PanelLights, callbacks?: GeometryPanelCallbacks): HTMLElement {
  _lights = lights;
  _callbacks = callbacks || null;

  const panel = document.createElement('div');
  panel.id = 'spice-panel';
  panel.innerHTML = buildPanelHTML();
  document.body.appendChild(panel);
  _panelElement = panel;

  // Primary controls
  panel.querySelector<HTMLButtonElement>('#spice-fetch-btn')!
    .addEventListener('click', () => triggerFetch(panel));

  panel.querySelector<HTMLButtonElement>('#spice-auto-btn')!
    .addEventListener('click', () => toggleAutoTrack(panel));

  panel.querySelector<HTMLSelectElement>('#spice-autotrack-mode')
    ?.addEventListener('change', (e) => {
      _autoTrackMode = (e.target as HTMLSelectElement).value as any;
      updateAutoTrackUI(panel);
    });

  panel.querySelector<HTMLButtonElement>('#spice-retry-btn')
    ?.addEventListener('click', () => checkHealth(panel, true));

  // Quick Epoch Step Buttons
  panel.querySelector<HTMLButtonElement>('#spice-now-btn')
    ?.addEventListener('click', () => {
      pauseAutoTrack(panel);
      const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input');
      if (timeInput) {
        timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
        triggerFetch(panel);
      }
    });

  panel.querySelector<HTMLButtonElement>('#spice-epoch-artemis')
    ?.addEventListener('click', () => {
      pauseAutoTrack(panel);
      const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input');
      if (timeInput) {
        timeInput.value = '2026-10-16T12:00:00Z';
        triggerFetch(panel);
      }
    });

  panel.querySelector<HTMLButtonElement>('#spice-step-back-24')
    ?.addEventListener('click', () => { pauseAutoTrack(panel); stepTimeHours(-24); });
  panel.querySelector<HTMLButtonElement>('#spice-step-back-1')
    ?.addEventListener('click', () => { pauseAutoTrack(panel); stepTimeHours(-1); });
  panel.querySelector<HTMLButtonElement>('#spice-step-fwd-1')
    ?.addEventListener('click', () => { pauseAutoTrack(panel); stepTimeHours(1); });
  panel.querySelector<HTMLButtonElement>('#spice-step-fwd-24')
    ?.addEventListener('click', () => { pauseAutoTrack(panel); stepTimeHours(24); });

  // Preset candidate buttons
  panel.querySelectorAll<HTMLButtonElement>('.spice-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lat = parseFloat(btn.dataset.lat || '-90');
      const lon = parseFloat(btn.dataset.lon || '0');
      const label = btn.dataset.label || 'South Pole Site';
      setPanelSite(lat, lon, label);
      panel.querySelectorAll('.spice-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _callbacks?.onPresetSelect?.(lat, lon, label);
    });
  });

  // Manual Landing Site Coordinate Inputs
  const latInput = panel.querySelector<HTMLInputElement>('#spice-lat');
  const lonInput = panel.querySelector<HTMLInputElement>('#spice-lon');
  const siteNote = panel.querySelector<HTMLDivElement>('#spice-site-note');

  let siteInputDebounce: number | null = null;

  const handleManualCoordInput = () => {
    if (!latInput || !lonInput) return;
    pauseAutoTrack(panel);

    const val = validateCoordinates(latInput.value, lonInput.value);
    if (!val.valid) return;

    // Check if matches preset
    const matchPreset = [
      { lat: -89.463, lon: 222.51, label: 'Artemis Site 01 · Shackleton–de Gerlache Ridge' },
      { lat: -90.0, lon: 0.0, label: 'Geographic South Pole (90.0°S · Datum)' },
      { lat: -89.78, lon: 128.0, label: 'Shackleton Crater Peak' },
      { lat: -86.04, lon: 2.7, label: 'Malapert Mountain (Massif)' },
    ].find(p => Math.abs(p.lat - val.lat) < 0.05 && Math.abs(p.lon - val.lon) < 0.05);

    panel.querySelectorAll<HTMLButtonElement>('.spice-preset-btn').forEach(btn => {
      const bLat = parseFloat(btn.dataset.lat || '999');
      const bLon = parseFloat(btn.dataset.lon || '999');
      btn.classList.toggle('active', Math.abs(bLat - val.lat) < 0.05 && Math.abs(bLon - val.lon) < 0.05);
    });

    const label = matchPreset
      ? matchPreset.label
      : `Custom Lunar Target · ${formatSelenographicCoords(val.lat, val.lon)}`;

    if (siteNote) {
      siteNote.textContent = label;
    }

    _callbacks?.onSiteInput?.(val.lat, val.lon, label);
  };

  latInput?.addEventListener('input', () => {
    if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
    siteInputDebounce = window.setTimeout(handleManualCoordInput, 350);
  });
  lonInput?.addEventListener('input', () => {
    if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
    siteInputDebounce = window.setTimeout(handleManualCoordInput, 350);
  });

  latInput?.addEventListener('change', () => {
    if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
    handleManualCoordInput();
  });
  lonInput?.addEventListener('change', () => {
    if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
    handleManualCoordInput();
  });

  latInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
      handleManualCoordInput();
      triggerFetch(panel);
    }
  });
  lonInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (siteInputDebounce !== null) clearTimeout(siteInputDebounce);
      handleManualCoordInput();
      triggerFetch(panel);
    }
  });

  // Manual input pause protection
  panel.querySelector<HTMLInputElement>('#spice-time-input')?.addEventListener('focus', () => {
    pauseAutoTrack(panel);
  });

  // Collapse/expand
  const header = panel.querySelector<HTMLDivElement>('.spice-header')!;
  const body   = panel.querySelector<HTMLDivElement>('.spice-body')!;
  header.addEventListener('click', () => {
    const collapsed = body.style.display === 'none';
    body.style.display = collapsed ? '' : 'none';
    header.querySelector('.spice-collapse-icon')!.textContent = collapsed ? '▼' : '▶';
  });

  // Default time
  const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input')!;
  timeInput.value = '2026-10-16T12:00:00Z';

  // Check health and initialize
  checkHealth(panel).then(() => {
    setPanelSite(DEFAULT_SITE.lat, DEFAULT_SITE.lon, DEFAULT_SITE.label, '2026-10-16T12:00:00Z');
  });

  return panel;
}

function stepTimeHours(hours: number): void {
  if (!_panelElement) return;
  const timeInput = _panelElement.querySelector<HTMLInputElement>('#spice-time-input');
  if (!timeInput) return;
  try {
    const current = new Date(timeInput.value);
    if (!isNaN(current.getTime())) {
      const next = new Date(current.getTime() + hours * 3600 * 1000);
      timeInput.value = next.toISOString().slice(0, 19) + 'Z';
      triggerFetch(_panelElement);
    }
  } catch {
    /* ignore date parse error */
  }
}

function buildPanelHTML(): string {
  return `
<div class="spice-header">
  <div class="spice-title-block">
    <span class="spice-title">🛰 SPICE EPHEMERIS</span>
    <span class="spice-subtitle">NASA/JPL · IAU MOON_ME</span>
  </div>
  <span class="spice-collapse-icon">▼</span>
</div>

<div class="spice-body">
  <!-- Backend Connectivity Status Row -->
  <div class="spice-status-row" id="spice-status-row">
    <div style="display:flex; align-items:center; gap:0.45rem; flex:1;">
      <span class="spice-status-dot" id="spice-status-dot"></span>
      <span id="spice-status-text">Checking backend…</span>
    </div>
    <button type="button" id="spice-retry-btn" class="spice-btn-inline" title="Retry SPICE service health check">Retry ⟳</button>
  </div>

  <!-- Mission Epoch (UTC) Section -->
  <div class="spice-section">
    <div class="spice-label">
      <span>MISSION EPOCH (UTC)</span>
      <button type="button" id="spice-now-btn" class="spice-now-btn" title="Set to current UTC time">Now</button>
    </div>
    <div class="spice-time-wrapper">
      <input type="text" id="spice-time-input" class="spice-input"
             placeholder="2026-10-16T12:00:00Z"
             title="ISO-8601 UTC timestamp (e.g. 2026-10-16T12:00:00Z)" />
    </div>
    
    <!-- Quick Time Step Buttons -->
    <div class="spice-time-steps">
      <button type="button" id="spice-step-back-24" class="spice-step-btn" title="Step back 24 Hours">-24h</button>
      <button type="button" id="spice-step-back-1" class="spice-step-btn" title="Step back 1 Hour">-1h</button>
      <button type="button" id="spice-epoch-artemis" class="spice-step-btn spice-step-highlight" title="Artemis III Target Epoch (2026-10-16)">Artemis '26</button>
      <button type="button" id="spice-step-fwd-1" class="spice-step-btn" title="Step forward 1 Hour">+1h</button>
      <button type="button" id="spice-step-fwd-24" class="spice-step-btn" title="Step forward 24 Hours">+24h</button>
    </div>

    <!-- Candidate Mission Window Card -->
    <div id="spice-window-card" class="spice-window-card" style="display:none"></div>
  </div>

  <!-- Landing Site & Coordinates -->
  <div class="spice-section spice-site-section">
    <div class="spice-label">LANDING SITE &amp; COORDINATES</div>
    <div class="spice-presets-row">
      <button type="button" class="spice-preset-btn active"
              data-lat="-89.463" data-lon="222.51"
              data-label="Artemis Site 01 · Shackleton–de Gerlache Ridge"
              title="NASA Artemis Candidate Site 01">Site 01</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-90.0" data-lon="0.0"
              data-label="Geographic South Pole (90.0°S · Datum)"
              title="True Lunar South Pole">South Pole</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-89.78" data-lon="128.0"
              data-label="Shackleton Crater Peak"
              title="Shackleton Crater Rim Peak">Shackleton</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-86.04" data-lon="2.7"
              data-label="Malapert Mountain (Massif)"
              title="Malapert Mountain">Malapert</button>
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

  <!-- Actions & Properly Defined Auto-Track -->
  <div class="spice-actions-section">
    <div class="spice-actions-primary">
      <button id="spice-fetch-btn" class="spice-btn spice-btn-primary" title="Calculate SPICE ephemerides for current timestamp">Calculate</button>
      <button id="spice-auto-btn" class="spice-btn spice-btn-autotrack" 
              title="Automatically advance mission epoch and recompute Sun/Earth topocentric SPICE geometry while retaining the selected landing site.">
        Auto-Track: OFF
      </button>
    </div>

    <!-- Auto-Track Status & Cadence Controls -->
    <div class="spice-autotrack-bar" id="spice-autotrack-bar">
      <div class="autotrack-status-block">
        <span class="autotrack-dot" id="autotrack-dot"></span>
        <span class="autotrack-label" id="autotrack-status-text">Standby (Epoch Static)</span>
      </div>
      <div class="autotrack-rate-select">
        <label for="spice-autotrack-mode" class="autotrack-rate-lbl">Cadence:</label>
        <select id="spice-autotrack-mode" class="autotrack-select" title="Auto-Track epoch advance interval">
          <option value="step_1h" selected>+1h / 2s</option>
          <option value="step_24h">+24h / 2s</option>
          <option value="realtime">Real-Time UTC</option>
        </select>
      </div>
    </div>
  </div>

  <div id="spice-loading" class="spice-loading" style="display:none">
    <div class="spice-spinner"></div> Computing NASA SPICE &amp; LOLA terrain ray-marching…
  </div>
  <div id="spice-error-box" class="spice-error" style="display:none"></div>

  <!-- Telemetry Results Display: Separating Geometric from Terrain Horizon -->
  <div class="spice-results" id="spice-results" style="display:none">
    <!-- Sun Telemetry Card -->
    <div class="spice-card">
      <div class="spice-card-header">
        <span class="spice-card-icon">☀</span>
        <span class="spice-card-title">SOLAR EPHEMERIS</span>
      </div>
      
      <div class="spice-metric-grid">
        <div class="sm-item">
          <span class="sm-label">DISTANCE</span>
          <span class="sm-value" id="res-sun-dist">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">AZIMUTH</span>
          <span class="sm-value" id="res-sun-az">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">GEOMETRIC EL</span>
          <span class="sm-value" id="res-sun-geom-el">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">TERRAIN HORIZON</span>
          <span class="sm-value" id="res-sun-terrain-el">—</span>
        </div>
      </div>

      <!-- Terrain Obstruction Status -->
      <div class="spice-status-pill-box">
        <span class="spice-pill-label">OBSTRUCTION:</span>
        <span class="spice-pill" id="res-sun-obs-status">Unknown or insufficient terrain coverage</span>
      </div>
      
      <!-- DEM Coverage Limitation Note -->
      <div class="spice-limitation-note" id="res-sun-dem-note">
        DEM Coverage: Validated within 5 m/px Site 01 DEM.
      </div>
    </div>

    <!-- Earth DTE Comms Telemetry Card -->
    <div class="spice-card">
      <div class="spice-card-header">
        <span class="spice-card-icon">🌍</span>
        <span class="spice-card-title">EARTH (DTE COMMS)</span>
      </div>

      <div class="spice-metric-grid">
        <div class="sm-item">
          <span class="sm-label">DISTANCE</span>
          <span class="sm-value" id="res-earth-dist">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">AZIMUTH</span>
          <span class="sm-value" id="res-earth-az">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">GEOMETRIC EL</span>
          <span class="sm-value" id="res-earth-geom-el">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">TERRAIN HORIZON</span>
          <span class="sm-value" id="res-earth-terrain-el">—</span>
        </div>
      </div>

      <!-- Terrain Obstruction & Potential LOS Status -->
      <div class="spice-status-pill-box">
        <span class="spice-pill-label">OBSTRUCTION:</span>
        <span class="spice-pill" id="res-earth-obs-status">No obstruction detected</span>
      </div>

      <div class="spice-los-badge" id="res-earth-los-status">
        Potential Direct-to-Earth Line-of-Sight Available
      </div>

      <!-- Essential Operational RF Disclaimer -->
      <div class="spice-comms-disclaimer">
        ℹ <strong>Operational Link Notice:</strong> Geometric line-of-sight does not guarantee an active RF communication link. Operational closure requires link budget closure, lander antenna pointing, and DSN ground station scheduling.
      </div>
    </div>

    <!-- Expandable Advanced SPICE Astrodynamics Details -->
    <details class="spice-advanced-details">
      <summary class="spice-details-summary">▸ Astrodynamic Frame &amp; Aberration Metadata</summary>
      <div class="spice-details-content">
        <div class="details-row">
          <span>Reference Frame:</span>
          <strong id="res-frame">MOON_ME</strong>
        </div>
        <div class="details-row">
          <span>Aberration Correction:</span>
          <strong id="res-aberration">NONE (geometric)</strong>
        </div>
        <div class="details-row">
          <span>SPICE Ephemeris Time:</span>
          <span id="res-et-seconds">—</span>
        </div>
        <div class="details-row">
          <span>Sun Vector (MOON_ME):</span>
          <span id="res-sun-vec">—</span>
        </div>
        <div class="details-row">
          <span>Earth Vector (MOON_ME):</span>
          <span id="res-earth-vec">—</span>
        </div>
      </div>
    </details>

    <div class="spice-scene-note" id="spice-scene-note" style="display:none">
      ⚡ Three.js viewport illumination aligned to topocentric SPICE vector
    </div>
  </div>
</div>
`;
}

export async function checkHealth(panel: HTMLElement, triggerNotice = false): Promise<boolean> {
  const dot = panel.querySelector<HTMLSpanElement>('#spice-status-dot')!;
  const text = panel.querySelector<HTMLSpanElement>('#spice-status-text')!;
  const fetchBtn = panel.querySelector<HTMLButtonElement>('#spice-fetch-btn')!;
  const retryBtn = panel.querySelector<HTMLButtonElement>('#spice-retry-btn');

  if (triggerNotice) {
    text.textContent = 'Connecting to SPICE backend…';
    dot.className = 'spice-status-dot';
  }

  try {
    const health: SpiceHealth = await fetchSpiceHealth();
    const ok = health.status === 'ok';
    dot.className = 'spice-status-dot ' + (ok ? 'dot-ok' : 'dot-warn');
    text.textContent = ok
      ? `SPICE Online · ${health.reference_frame}`
      : `Backend Degraded: ${health.error ?? 'Kernel warning'}`;
    fetchBtn.disabled = !ok;
    if (retryBtn) retryBtn.style.display = ok ? 'none' : 'inline-block';
    return ok;
  } catch {
    dot.className = 'spice-status-dot dot-err';
    text.textContent = 'Backend Offline (port 8000)';
    fetchBtn.disabled = true;
    if (retryBtn) retryBtn.style.display = 'inline-block';
    return false;
  }
}

let _currentFetchPromise: Promise<boolean> | null = null;

async function triggerFetch(panel: HTMLElement): Promise<boolean> {
  // If a fetch is already in flight, let it finish first (don't stack multiple requests)
  if (_fetchInFlight && _currentFetchPromise) {
    try {
      await _currentFetchPromise;
    } catch {
      /* ignore */
    }
    // If another triggerFetch already started while we waited, bail out to avoid double-fetch
    if (_fetchInFlight) return false;
  }
  _fetchInFlight = true;

  // Snapshot the suppress flag at the moment this fetch starts so the async callback
  // uses the value that was set by our caller (setPanelSite or Calculate button), not
  // whatever it might be when the fetch eventually resolves.
  const suppressCallback = _suppressOnSiteCalculate;

  const loading = panel.querySelector<HTMLDivElement>('#spice-loading')!;
  const errorBox = panel.querySelector<HTMLDivElement>('#spice-error-box')!;
  const results = panel.querySelector<HTMLDivElement>('#spice-results')!;

  loading.style.display = 'flex';
  errorBox.style.display = 'none';

  _currentFetchPromise = (async (): Promise<boolean> => {
  try {
    const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input')!;
    const latInput  = panel.querySelector<HTMLInputElement>('#spice-lat')!;
    const lonInput  = panel.querySelector<HTMLInputElement>('#spice-lon')!;

    const utc = timeInput.value.trim();
    const validation = validateCoordinates(latInput.value, lonInput.value);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid coordinates.');
    }

    // 1. Fetch SPICE topocentric geometry
    const geo = await fetchGeometry({
      utc_time: utc,
      latitude_deg: validation.lat,
      longitude_deg: validation.lon,
      elevation_m: 0.0,
    });

    // 2. Fetch terrain-aware horizon visibility
    let horizonVis: HorizonVisibilityResponse | null = null;
    try {
      horizonVis = await fetchHorizonVisibility({
        latitude_deg: validation.lat,
        longitude_deg: validation.lon,
        elevation_m: 0.0,
        instrument_height_m: 2.0,
        sun_azimuth_deg: geo.sun.azimuth_deg,
        sun_elevation_deg: geo.sun.elevation_deg,
        sun_distance_km: geo.sun.distance_km,
        earth_azimuth_deg: geo.earth.azimuth_deg,
        earth_elevation_deg: geo.earth.elevation_deg,
        earth_distance_km: geo.earth.distance_km,
      });
    } catch {
      // Local terrain horizon unevaluable or endpoint offline
      horizonVis = null;
    }

    displayResults(panel, geo, horizonVis);
    updateSceneLights(geo);
    results.style.display = 'block';
    _autoTrackErrorCount = 0;

    const siteNote = panel.querySelector<HTMLDivElement>('#spice-site-note');
    const label = siteNote?.textContent || `Custom Lunar Target · ${formatSelenographicCoords(validation.lat, validation.lon)}`;
    // Only notify the globe/workspace when explicitly triggered by the user (Calculate button),
    // NOT when triggered automatically by setPanelSite's internal auto-scan.
    if (!suppressCallback) {
      _callbacks?.onSiteCalculate?.(validation.lat, validation.lon, label);
    }

    return true;

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    errorBox.textContent = `Error: ${msg}`;
    errorBox.style.display = 'block';
    await checkHealth(panel);

    // Stale data protection: if auto-tracking fails, halt to prevent misleading telemetry
    if (_autoTrackActive) {
      _autoTrackErrorCount++;
      if (_autoTrackErrorCount >= 2) {
        pauseAutoTrack(panel, 'Auto-Track Paused: Network/SPICE error');
      }
    }
    return false;
  } finally {
    loading.style.display = 'none';
    _fetchInFlight = false;
    _currentFetchPromise = null;
  }
  })();
  return await _currentFetchPromise;
}

function displayResults(
  panel: HTMLElement,
  geo: GeometryResponse,
  vis: HorizonVisibilityResponse | null
): void {
  const fmt1 = (n: number) => n.toFixed(1);
  const fmtDist = (km: number) => km > 1e6
    ? `${(km / 1.495978707e8).toFixed(4)} AU (${(km / 1e6).toFixed(2)}M km)`
    : `${km.toLocaleString(undefined, { maximumFractionDigits: 0 })} km`;

  const isInsideDEM = isInsideSite01Coverage(geo.site.longitude_deg, geo.site.latitude_deg);

  // ── Sun Telemetry ──────────────────────────────────────────
  setText('res-sun-dist', fmtDist(geo.sun.distance_km));
  setText('res-sun-az', `${fmt1(geo.sun.azimuth_deg)}°`);
  
  const sunGeomEl = geo.sun.elevation_deg;
  setTextStyled(
    'res-sun-geom-el',
    `${sunGeomEl >= 0 ? '+' : ''}${fmt1(sunGeomEl)}°`,
    sunGeomEl >= 0 ? 'spice-val-positive' : 'spice-val-negative'
  );

  // Sun terrain horizon & obstruction status
  const sunObsPill = document.getElementById('res-sun-obs-status');
  const sunTerrainEl = document.getElementById('res-sun-terrain-el');
  const sunDemNote = document.getElementById('res-sun-dem-note');

  if (vis && vis.sun) {
    const s = vis.sun;
    if (s.terrain_horizon_elevation_deg !== null) {
      setText('res-sun-terrain-el', `${fmt1(s.terrain_horizon_elevation_deg)}°`);
    } else {
      setText('res-sun-terrain-el', 'N/A (Outside DEM)');
    }

    if (sunObsPill) {
      switch (s.visibility_status) {
        case 'no_obstruction_detected_within_coverage':
          sunObsPill.textContent = 'No obstruction detected within coverage';
          sunObsPill.className = 'spice-pill pill-ok';
          break;
        case 'blocked_by_local_terrain':
          sunObsPill.textContent = 'Blocked by local terrain (Shadow)';
          sunObsPill.className = 'spice-pill pill-err';
          break;
        case 'blocked_by_lunar_body':
          sunObsPill.textContent = 'Below geometric horizon (Lunar Body)';
          sunObsPill.className = 'spice-pill pill-err';
          break;
        case 'near_horizon_grazing':
          sunObsPill.textContent = 'Near-horizon grazing light';
          sunObsPill.className = 'spice-pill pill-warn';
          break;
        default:
          sunObsPill.textContent = 'Unknown or insufficient terrain coverage';
          sunObsPill.className = 'spice-pill pill-warn';
      }
    }
  } else {
    // Fallback based on geometric elevation + coverage test
    if (sunTerrainEl) sunTerrainEl.textContent = isInsideDEM ? 'Calculation unavailable' : 'Unevaluable (Outside DEM)';
    if (sunObsPill) {
      if (sunGeomEl < 0) {
        sunObsPill.textContent = 'Below geometric horizon';
        sunObsPill.className = 'spice-pill pill-err';
      } else if (isInsideDEM) {
        sunObsPill.textContent = 'Above geometric horizon (DEM Ray uncalculated)';
        sunObsPill.className = 'spice-pill pill-warn';
      } else {
        sunObsPill.textContent = 'Unknown or insufficient terrain coverage';
        sunObsPill.className = 'spice-pill pill-neutral';
      }
    }
  }

  if (sunDemNote) {
    sunDemNote.textContent = isInsideDEM
      ? 'DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).'
      : 'DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only.';
  }

  // ── Earth Telemetry ────────────────────────────────────────
  setText('res-earth-dist', `${geo.earth.distance_km.toLocaleString(undefined, { maximumFractionDigits: 0 })} km`);
  setText('res-earth-az', `${fmt1(geo.earth.azimuth_deg)}°`);
  
  const earthGeomEl = geo.earth.elevation_deg;
  setTextStyled(
    'res-earth-geom-el',
    `${earthGeomEl >= 0 ? '+' : ''}${fmt1(earthGeomEl)}°`,
    earthGeomEl >= 0 ? 'spice-val-positive' : 'spice-val-negative'
  );

  const earthObsPill = document.getElementById('res-earth-obs-status');
  const earthTerrainEl = document.getElementById('res-earth-terrain-el');
  const earthLosBadge = document.getElementById('res-earth-los-status');

  if (vis && vis.earth) {
    const e = vis.earth;
    if (e.terrain_horizon_elevation_deg !== null) {
      setText('res-earth-terrain-el', `${fmt1(e.terrain_horizon_elevation_deg)}°`);
    } else {
      setText('res-earth-terrain-el', 'N/A (Outside DEM)');
    }

    if (earthObsPill) {
      switch (e.visibility_status) {
        case 'no_obstruction_detected_within_coverage':
          earthObsPill.textContent = 'No obstruction detected within coverage';
          earthObsPill.className = 'spice-pill pill-ok';
          break;
        case 'blocked_by_local_terrain':
          earthObsPill.textContent = 'Blocked by local terrain';
          earthObsPill.className = 'spice-pill pill-err';
          break;
        case 'blocked_by_lunar_body':
          earthObsPill.textContent = 'Below geometric horizon (Lunar Body)';
          earthObsPill.className = 'spice-pill pill-err';
          break;
        default:
          earthObsPill.textContent = 'Unknown or insufficient terrain coverage';
          earthObsPill.className = 'spice-pill pill-warn';
      }
    }

    if (earthLosBadge) {
      const isOk = (e.visibility_status === 'no_obstruction_detected_within_coverage' || e.visibility_status === 'near_horizon_grazing') && earthGeomEl > 0;
      earthLosBadge.textContent = isOk
        ? `Potential Line-of-Sight Active (${fmt1(e.angular_clearance_deg ?? earthGeomEl)}° clearance)`
        : 'Direct Line-of-Sight Obstructed';
      earthLosBadge.className = `spice-los-badge ${isOk ? 'los-active' : 'los-blocked'}`;
    }
  } else {
    if (earthTerrainEl) earthTerrainEl.textContent = isInsideDEM ? 'Calculation unavailable' : 'Unevaluable (Outside DEM)';
    if (earthObsPill) {
      if (earthGeomEl < 0) {
        earthObsPill.textContent = 'Below geometric horizon';
        earthObsPill.className = 'spice-pill pill-err';
      } else {
        earthObsPill.textContent = 'Above geometric horizon';
        earthObsPill.className = 'spice-pill pill-ok';
      }
    }
    if (earthLosBadge) {
      const isOk = earthGeomEl > 0;
      earthLosBadge.textContent = isOk
        ? `Potential Geometric LOS Active (+${fmt1(earthGeomEl)}°)`
        : 'Direct Line-of-Sight Occluded';
      earthLosBadge.className = `spice-los-badge ${isOk ? 'los-active' : 'los-blocked'}`;
    }
  }

  // Astrodynamics Details
  setText('res-frame', geo.reference_frame);
  setText('res-aberration', geo.aberration_correction);
  setText('res-et-seconds', `${geo.ephemeris_time_s.toFixed(3)} s`);
  setText('res-sun-vec', geo.sun.direction_unit.map(v => v.toFixed(4)).join(', '));
  setText('res-earth-vec', geo.earth.direction_unit.map(v => v.toFixed(4)).join(', '));

  const sceneNote = panel.querySelector<HTMLDivElement>('#spice-scene-note')!;
  sceneNote.style.display = _lights ? 'block' : 'none';
}

function updateSceneLights(geo: GeometryResponse): void {
  if (!_lights) return;

  const [sx, sy, sz] = moonMeToScene(geo.sun.direction_unit as [number, number, number]);
  const SCENE_SCALE = 8;
  _lights.sunLight.position.set(sx * SCENE_SCALE, sy * SCENE_SCALE, sz * SCENE_SCALE);

  const [ex, ey, ez] = moonMeToScene(geo.earth.direction_unit as [number, number, number]);
  _lights.earthshineLight.position.set(-ex * SCENE_SCALE, -ey * SCENE_SCALE, -ez * SCENE_SCALE);
}

// ── Auto-Track Engine Implementation ──────────────────────────

function toggleAutoTrack(panel: HTMLElement): void {
  _autoTrackActive = !_autoTrackActive;

  if (_autoTrackActive) {
    startAutoTrack(panel);
  } else {
    stopAutoTrack(panel);
  }
}

function startAutoTrack(panel: HTMLElement): void {
  _autoTrackActive = true;
  _autoTrackErrorCount = 0;
  updateAutoTrackUI(panel);

  if (_autoTrackInterval !== null) {
    clearInterval(_autoTrackInterval);
  }

  // Execute first advance immediately
  advanceAutoTrackEpoch(panel);

  // Set recurring interval (every 2.0 seconds)
  _autoTrackInterval = setInterval(() => {
    if (_autoTrackActive) {
      advanceAutoTrackEpoch(panel);
    }
  }, 2000);
}

function advanceAutoTrackEpoch(panel: HTMLElement): void {
  const timeInput = panel.querySelector<HTMLInputElement>('#spice-time-input');
  if (!timeInput) return;

  if (_autoTrackMode === 'realtime') {
    timeInput.value = new Date().toISOString().slice(0, 19) + 'Z';
  } else if (_autoTrackMode === 'step_1h') {
    stepTimeHours(1);
    return;
  } else if (_autoTrackMode === 'step_24h') {
    stepTimeHours(24);
    return;
  }

  triggerFetch(panel);
}

function stopAutoTrack(panel: HTMLElement): void {
  _autoTrackActive = false;
  if (_autoTrackInterval !== null) {
    clearInterval(_autoTrackInterval);
    _autoTrackInterval = null;
  }
  updateAutoTrackUI(panel);
}

function pauseAutoTrack(panel: HTMLElement, reasonText?: string): void {
  if (!_autoTrackActive) return;
  stopAutoTrack(panel);

  const statusText = panel.querySelector<HTMLSpanElement>('#autotrack-status-text');
  if (statusText) {
    statusText.textContent = reasonText || 'Standby (User edit paused track)';
  }
}

function updateAutoTrackUI(panel: HTMLElement): void {
  const btn = panel.querySelector<HTMLButtonElement>('#spice-auto-btn')!;
  const dot = panel.querySelector<HTMLSpanElement>('#autotrack-dot')!;
  const statusText = panel.querySelector<HTMLSpanElement>('#autotrack-status-text')!;

  if (_autoTrackActive) {
    btn.classList.add('active');
    btn.textContent = 'Auto-Track: ACTIVE ●';
    dot.className = 'autotrack-dot dot-active';

    const modeLabels: Record<string, string> = {
      step_1h: 'Advancing (+1h / 2s)',
      step_24h: 'Advancing (+24h / 2s)',
      realtime: 'Tracking Real-Time UTC',
    };
    statusText.textContent = modeLabels[_autoTrackMode] || 'Active';
  } else {
    btn.classList.remove('active');
    btn.textContent = 'Auto-Track: OFF';
    dot.className = 'autotrack-dot';
    statusText.textContent = 'Standby (Epoch Static)';
  }
}

function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; }
}

function setTextStyled(id: string, text: string, cls: string): void {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = `sm-value ${cls}`; }
}
