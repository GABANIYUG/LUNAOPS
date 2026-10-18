/**
 * missionWorkspace.ts — LUNAOPS Mission Scenario Configuration Workspace.
 *
 * Implements the complete Phase 3A user-facing workflow:
 *  1. Mission Details (Scenario name, notes, target region, disclaimer)
 *  2. Landing-Site Selection (Interactive Site 01 local terrain canvas + manual coordinates)
 *  3. Mission Timeline & Duration (Start UTC, Duration, Computed End UTC, DE440s check)
 *  4. Data Readiness Panel (SPICE health, coverage validation, actionable statuses)
 *  5. SPICE Live Geometry Evaluation (Real-time single-timestamp ephemeris via /api/spice/geometry)
 *  6. Scenario Summary & JSON Export
 */

import {
  fetchSpiceHealth,
  fetchGeometry,
  fetchHorizonProfile,
  fetchHorizonVisibility,
  fetchMissionTimeline,
  type GeometryResponse,
  type SpiceHealth,
  type HorizonProfileResponse,
  type HorizonVisibilityResponse,
  type TargetObstruction,
  type MissionTimelineResponse,
  type TimelineSample,
} from './spiceClient';
import {
  selenographicToPolarStereo,
  previewPixelToSelenographic,
  formatSelenographicCoords,
} from './utils/coordinates';
import { terrainSampler } from './utils/terrainSampler';
import type {
  MissionScenario,
  LandingSiteConfig,
  TimelineConfig,
  ReadinessState,
  ReadinessCheck,
} from './types/mission';

export interface SitePreset {
  id: string;
  name: string;
  designation: string;
  lat: number;
  lon: number;
  elev: number;
  description: string;
}

export const MISSION_PRESETS: SitePreset[] = [
  {
    id: 'site-01',
    name: 'Artemis Site 01',
    designation: 'Shackleton–de Gerlache Connecting Ridge',
    lat: -89.463,
    lon: 222.51,
    elev: 1100.0,
    description: 'High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth.',
  },
  {
    id: 'shackleton-peak',
    name: 'Shackleton Crater Peak',
    designation: 'Artemis Candidate Site 04',
    lat: -89.780,
    lon: 128.00,
    elev: 1450.0,
    description: 'Elevated rim peak bordering deep permanently shadowed craters (PSR).',
  },
  {
    id: 'south-pole-90',
    name: 'Lunar South Pole',
    designation: 'Geographic 90°S Pole',
    lat: -90.000,
    lon: 0.00,
    elev: -250.0,
    description: 'Intersection of all lunar meridians on the undulating rim crest of Shackleton.',
  },
  {
    id: 'malapert-peak',
    name: 'Malapert Mountain',
    designation: 'Malapert Peak (Artemis Candidate)',
    lat: -86.040,
    lon: 2.70,
    elev: 5000.0,
    description: 'Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight.',
  },
];

export class MissionWorkspace {
  private container: HTMLElement;
  private isOpen = false;
  private currentTab = 'site'; // 'details' | 'site' | 'timeline' | 'readiness' | 'summary'

  // Model state
  private scenarioName = 'Artemis III Candidate — South Pole Ridge';
  private scenarioNotes = 'Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.';
  private selectedSite: LandingSiteConfig;
  private timeline: TimelineConfig;
  private spiceHealth: SpiceHealth | null = null;
  private initialGeometry: GeometryResponse | null = null;
  private horizonProfile: HorizonProfileResponse | null = null;
  private horizonVisibility: HorizonVisibilityResponse | null = null;
  private horizonLoading = false;
  private horizonError: string | null = null;
  private activeTerrainLayer: 'elev' | 'slope' | 'toterr' = 'elev';

  // Timeline state (Phase 4)
  private timelineResponse: MissionTimelineResponse | null = null;
  private timelineLoading = false;
  private timelineError: string | null = null;
  private scrubbedSampleIndex = 0;
  private onTimelineScrubbedCallback?: (sample: TimelineSample) => void;

  // Canvas interaction
  private terrainCtx: CanvasRenderingContext2D | null = null;

  // Callback to sync with 3D Moon
  private onSiteChangedCallback?: (site: LandingSiteConfig) => void;

  constructor() {
    // Default site: Artemis Site 01
    this.selectedSite = {
      name: MISSION_PRESETS[0].name,
      designation: MISSION_PRESETS[0].designation,
      latitudeDeg: MISSION_PRESETS[0].lat,
      longitudeDeg: MISSION_PRESETS[0].lon,
      elevationM: MISSION_PRESETS[0].elev,
      coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
      referenceDatum: 'IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame',
      isInsideSite01DEM: true,
      demDatasetName: 'NASA LOLA Artemis Site 01 (5 m/px)',
    };

    // Default timeline
    this.timeline = {
      startDate: '2026-10-16',
      startTime: '12:00:00',
      isoUtcStart: '2026-10-16T12:00:00Z',
      durationValue: 14,
      durationUnit: 'days',
      isoUtcEnd: '2026-10-30T12:00:00Z',
      timeStepHours: 1,
      isWithinKernelCoverage: true,
    };

    this.container = document.createElement('div');
    this.container.id = 'mission-workspace-modal';
    this.container.className = 'mission-modal hidden';
    document.body.appendChild(this.container);

    this.init();
  }

  public setOnSiteChanged(cb: (site: LandingSiteConfig) => void) {
    this.onSiteChangedCallback = cb;
  }

  public setOnTimelineScrubbed(cb: (sample: TimelineSample) => void) {
    this.onTimelineScrubbedCallback = cb;
  }

  public open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
    this.refreshHealthAndSample();
    this.render();
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  public toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  /**
   * Called when the user clicks on the 3D Moon to update site coordinates.
   */
  public setCoordinatesFromGlobe(latDeg: number, lonDeg: number) {
    this.selectedSite.latitudeDeg = Math.round(latDeg * 1000) / 1000;
    this.selectedSite.longitudeDeg = Math.round(lonDeg * 1000) / 1000;
    this.selectedSite.name = 'Custom Selected Location';
    this.selectedSite.designation = 'User Chosen Site';
    this.updateSiteCoverageAndSample();
    if (this.isOpen) this.render();
  }

  private async init() {
    await terrainSampler.init();
    this.updateSiteCoverageAndSample();
    this.checkSpiceHealth();
  }

  private async checkSpiceHealth() {
    try {
      this.spiceHealth = await fetchSpiceHealth();
    } catch {
      this.spiceHealth = null;
    }
  }

  private async refreshHealthAndSample() {
    await this.checkSpiceHealth();
    this.updateSiteCoverageAndSample();
  }

  private updateSiteCoverageAndSample() {
    const lat = this.selectedSite.latitudeDeg;
    const lon = this.selectedSite.longitudeDeg;

    const sample = terrainSampler.sample(lon, lat);
    this.selectedSite.isInsideSite01DEM = sample.isInside;

    if (sample.isInside) {
      this.selectedSite.demDatasetName = 'NASA LOLA Artemis Site 01 (5 m/px)';
      this.selectedSite.sampledElevationM = sample.elevationM;
      this.selectedSite.sampledSlopeDeg = sample.slopeDeg;
      this.selectedSite.sampledErrorM = sample.errorM;
      this.selectedSite.pixelCoords = { px: sample.px, py: sample.py, gridMax: 512 };
      this.selectedSite.polarStereoM = { x: sample.xM, y: sample.yM };

      // Update elevation if user hasn't explicitly customized it wildly
      if (sample.elevationM !== undefined) {
        this.selectedSite.elevationM = sample.elevationM;
      }
    } else {
      this.selectedSite.demDatasetName = undefined;
      this.selectedSite.sampledElevationM = undefined;
      this.selectedSite.sampledSlopeDeg = undefined;
      this.selectedSite.sampledErrorM = undefined;
      this.selectedSite.pixelCoords = undefined;
      const { x, y } = selenographicToPolarStereo(lon, lat);
      this.selectedSite.polarStereoM = { x, y };
    }

    if (this.onSiteChangedCallback) {
      this.onSiteChangedCallback(this.selectedSite);
    }
  }

  private computeIsoTimestamps() {
    try {
      const startStr = `${this.timeline.startDate}T${this.timeline.startTime}Z`;
      const startMs = Date.parse(startStr);
      if (isNaN(startMs)) return;

      this.timeline.isoUtcStart = new Date(startMs).toISOString().replace('.000Z', 'Z');

      const mult = this.timeline.durationUnit === 'days' ? 24 * 3600 * 1000 : 3600 * 1000;
      const endMs = startMs + this.timeline.durationValue * mult;
      this.timeline.isoUtcEnd = new Date(endMs).toISOString().replace('.000Z', 'Z');

      // DE440s SPK covers 1900 to 2050
      const startYear = new Date(startMs).getUTCFullYear();
      const endYear = new Date(endMs).getUTCFullYear();
      this.timeline.isWithinKernelCoverage =
        startYear >= 1900 && startYear <= 2050 && endYear >= 1900 && endYear <= 2050;
    } catch {
      this.timeline.isWithinKernelCoverage = false;
    }
  }

  private getReadinessEvaluation(): { state: ReadinessState; summary: string; checks: ReadinessCheck[] } {
    const checks: ReadinessCheck[] = [];

    // Check 1: SPICE Service
    if (this.spiceHealth?.initialized) {
      checks.push({
        id: 'spice',
        label: 'NASA SPICE Ephemeris Service',
        status: 'pass',
        detail: `Online · 5 NAIF kernels loaded · MOON_ME reference frame active`,
      });
    } else {
      checks.push({
        id: 'spice',
        label: 'NASA SPICE Ephemeris Service',
        status: 'fail',
        detail: `Backend unavailable at http://127.0.0.1:8000. Start backend server.`,
      });
    }

    // Check 2: Coordinates
    const lat = this.selectedSite.latitudeDeg;
    const lon = this.selectedSite.longitudeDeg;
    if (lat >= -90.0 && lat <= 90.0 && lon >= -180.0 && lon <= 360.0) {
      checks.push({
        id: 'coords',
        label: 'Site Selenographic Coordinates',
        status: 'pass',
        detail: `Valid · ${formatSelenographicCoords(lat, lon)} · Elevation: ${this.selectedSite.elevationM} m`,
      });
    } else {
      checks.push({
        id: 'coords',
        label: 'Site Selenographic Coordinates',
        status: 'fail',
        detail: `Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360].`,
      });
    }

    // Check 3: Terrain Coverage
    if (this.selectedSite.isInsideSite01DEM) {
      checks.push({
        id: 'terrain',
        label: 'Topographic DEM Coverage',
        status: 'pass',
        detail: `Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active`,
      });
    } else {
      checks.push({
        id: 'terrain',
        label: 'Topographic DEM Coverage',
        status: 'warn',
        detail: `Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles.`,
      });
    }

    // Check 4: Timeline
    if (this.timeline.isWithinKernelCoverage) {
      checks.push({
        id: 'timeline',
        label: 'Mission Interval & DE440s Coverage',
        status: 'pass',
        detail: `Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`,
      });
    } else {
      checks.push({
        id: 'timeline',
        label: 'Mission Interval & DE440s Coverage',
        status: 'fail',
        detail: `Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC).`,
      });
    }

    let state: ReadinessState = 'READY';
    let summary = 'All mission parameters and datasets are verified. Ready for ephemeris evaluation.';

    if (checks.some((c) => c.status === 'fail')) {
      state = 'ERROR';
      summary = 'One or more required parameters failed validation. Correct items marked in red.';
    } else if (checks.some((c) => c.status === 'warn')) {
      state = 'READY_WITH_LIMITATIONS';
      summary = 'Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM).';
    }

    return { state, summary, checks };
  }

  public toScenarioJSON(): MissionScenario {
    this.computeIsoTimestamps();
    const readiness = this.getReadinessEvaluation();

    return {
      id: `LUNAOPS-${Date.now()}`,
      name: this.scenarioName,
      notes: this.scenarioNotes,
      createdAt: new Date().toISOString(),
      targetRegion: 'Lunar South Pole (80°S–90°S)',
      site: { ...this.selectedSite },
      timeline: { ...this.timeline },
      readiness,
      initialGeometry: this.initialGeometry ?? undefined,
    };
  }

  // ── Render UI ─────────────────────────────────────────────────────────────

  public render() {
    this.computeIsoTimestamps();
    const readiness = this.getReadinessEvaluation();

    this.container.innerHTML = `
    <div class="mission-dialog">
      <div class="mission-header">
        <div class="mission-title-group">
          <div class="mission-kicker">NASA SPACE APPS 2026 · CLPS MISSION PLANNER</div>
          <h2 class="mission-title">New Mission Analysis Workspace</h2>
        </div>
        <div class="mission-header-actions">
          <span class="readiness-pill ${readiness.state.toLowerCase()}">${readiness.state.replace(/_/g, ' ')}</span>
          <button id="btn-close-workspace" class="modal-close-btn" title="Close Workspace">✕</button>
        </div>
      </div>

      <div class="mission-nav-tabs">
        <button class="nav-tab ${this.currentTab === 'site' ? 'active' : ''}" data-tab="site">📍 1. Landing Site & Terrain</button>
        <button class="nav-tab ${this.currentTab === 'timeline' ? 'active' : ''}" data-tab="timeline">⏱ 2. Mission Timeline</button>
        <button class="nav-tab ${this.currentTab === 'details' ? 'active' : ''}" data-tab="details">📝 3. Scenario Info</button>
        <button class="nav-tab ${this.currentTab === 'readiness' ? 'active' : ''}" data-tab="readiness">🔍 4. Readiness & SPICE</button>
        <button class="nav-tab ${this.currentTab === 'summary' ? 'active' : ''}" data-tab="summary">📋 5. Scenario Summary</button>
        <button class="nav-tab ${this.currentTab === 'horizon' ? 'active' : ''}" data-tab="horizon">🌄 6. Horizon &amp; Visibility</button>
      </div>

      <div class="mission-body">
        ${this.renderTabContent(readiness)}
      </div>

      <div class="mission-footer">
        <div class="footer-note">
          <span class="disclaimer-icon">⚠️</span>
          <span>Pre-decisional planning scenario. Does not imply formal NASA endorsement or approved CLPS landing site.</span>
        </div>
        <div class="footer-actions">
          <button id="btn-export-scenario" class="btn-secondary">📥 Export Scenario JSON</button>
          <button id="btn-eval-spice-footer" class="btn-primary">⚡ Evaluate Geometry (SPICE)</button>
        </div>
      </div>
    </div>
    `;

    this.wireEvents();
    if (this.currentTab === 'site' && this.selectedSite.isInsideSite01DEM) {
      this.drawTerrainCanvas();
    }
    if (this.currentTab === 'horizon' && this.horizonProfile) {
      this.drawHorizonPolarChart();
    }
  }

  private renderTabContent(readiness: ReturnType<typeof this.getReadinessEvaluation>): string {
    switch (this.currentTab) {
      case 'site':
        return this.renderSiteTab();
      case 'timeline':
        return this.renderTimelineTab();
      case 'details':
        return this.renderDetailsTab();
      case 'readiness':
        return this.renderReadinessTab(readiness);
      case 'horizon':
        return this.renderHorizonTab();
      case 'summary':
        return this.renderSummaryTab(readiness);
      default:
        return this.renderSiteTab();
    }
  }

  private renderHorizonTab(): string {
    const isInside = this.selectedSite.isInsideSite01DEM;
    const vis = this.horizonVisibility;
    const profile = this.horizonProfile;

    const statusIcon = (status: string): string => {
      if (status === 'no_obstruction_detected_within_coverage') return '✅';
      if (status === 'near_horizon_grazing') return '⚠️';
      if (status === 'blocked_by_local_terrain') return '🪨';
      if (status === 'blocked_by_lunar_body') return '🌑';
      return '❓';
    };

    const statusLabel = (status: string): string => {
      if (status === 'no_obstruction_detected_within_coverage') return 'Clear Line-of-Sight';
      if (status === 'near_horizon_grazing') return 'Near-Horizon Grazing';
      if (status === 'blocked_by_local_terrain') return 'Blocked by Terrain';
      if (status === 'blocked_by_lunar_body') return 'Occulted by Moon';
      if (status === 'unknown_insufficient_coverage') return 'Coverage Insufficient';
      return 'Unavailable';
    };

    const statusColor = (status: string): string => {
      if (status === 'no_obstruction_detected_within_coverage') return '#22c55e';
      if (status === 'near_horizon_grazing') return '#f59e0b';
      if (status.startsWith('blocked')) return '#ef4444';
      return '#94a3b8';
    };

    const renderVisCard = (label: string, emoji: string, obs: TargetObstruction): string => `
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${statusColor(obs.visibility_status)}">
          <span class="geom-body-title">${emoji} ${label}</span>
          <span class="horizon-badge" style="background: ${statusColor(obs.visibility_status)}22; color: ${statusColor(obs.visibility_status)}; border: 1px solid ${statusColor(obs.visibility_status)}44">
            ${statusIcon(obs.visibility_status)} ${statusLabel(obs.visibility_status)}
          </span>
        </div>
        <div class="geom-values">
          <div class="geom-row"><span>Azimuth:</span> <strong>${obs.azimuth_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Geometric Elevation:</span> <strong>${obs.geometric_elevation_deg.toFixed(2)}°</strong></div>
          ${obs.terrain_horizon_elevation_deg !== null ? `
          <div class="geom-row"><span>Terrain Skyline:</span> <strong>${obs.terrain_horizon_elevation_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Angular Clearance:</span> <strong style="color:${(obs.angular_clearance_deg ?? 0) > 0 ? '#22c55e' : '#ef4444'}">${obs.angular_clearance_deg !== null ? (obs.angular_clearance_deg >= 0 ? '+' : '') + obs.angular_clearance_deg.toFixed(2) + '°' : '—'}</strong></div>
          ` : ''}
          ${obs.horizon_distance_m !== null ? `<div class="geom-row"><span>Skyline Distance:</span> <strong>${(obs.horizon_distance_m / 1000).toFixed(2)} km</strong></div>` : ''}
        </div>
        <div class="vis-note">${obs.note}</div>
      </div>
    `;

    return `
    <div class="tab-pane">
      <div class="horizon-eval-header">
        <div>
          <h3 style="margin:0 0 4px; color: var(--text-primary)">🌄 Terrain Horizon &amp; Sun/Earth Visibility</h3>
          <p style="margin:0; color: var(--text-muted); font-size:0.82rem">Ray-marching the NASA LOLA Site 01 5 m/px DEM to compute local skyline and line-of-sight obstruction.</p>
        </div>
        <button id="btn-eval-horizon" class="btn-primary${this.horizonLoading ? ' loading' : ''}" ${!this.initialGeometry ? 'title="Evaluate SPICE geometry first (Readiness tab)"' : ''}>
          ${this.horizonLoading ? '⏳ Computing Horizon...' : '🌄 Evaluate Terrain Horizon'}
        </button>
      </div>

      ${!isInside ? `
      <div class="outside-terrain-placeholder" style="margin-bottom:16px;padding:16px;">
        <div class="placeholder-icon">🗺️</div>
        <h4>Outside Site 01 High-Resolution DEM</h4>
        <p>Current site is outside the 16×16 km Site 01 tile. Terrain-aware horizon cannot be computed. Select Artemis Site 01 in Tab 1 for full analysis.</p>
      </div>
      ` : ''}

      ${this.horizonError ? `
      <div class="check-item check-fail" style="margin-bottom:16px">
        <div class="check-icon">✕</div>
        <div class="check-body"><div class="check-label">Horizon Evaluation Error</div><div class="check-detail">${this.horizonError}</div></div>
      </div>
      ` : ''}

      ${!vis && !this.horizonLoading ? `
      <div class="empty-geom-state">
        <p>No terrain horizon evaluation has been run yet.</p>
        <p class="hint">First evaluate SPICE geometry on the <strong>Readiness &amp; SPICE</strong> tab, then click <strong>Evaluate Terrain Horizon</strong> above to compute Sun and Earth terrain obstruction.</p>
      </div>
      ` : ''}

      ${vis ? `
      <div class="vis-cards-row">
        ${renderVisCard('Sun', '☀️', vis.sun)}
        ${renderVisCard('Earth', '🌍', vis.earth)}
      </div>

      <div class="panel-card" style="margin-top:16px">
        <div class="card-header">
          <h3>360° Terrain Skyline Profile</h3>
          <span style="font-size:0.78rem;color:var(--text-muted)">Angular resolution: ${profile?.angular_step_deg ?? 2}° · Max range: 16 km</span>
        </div>
        <div class="horizon-chart-wrapper">
          <canvas id="horizon-polar-canvas" width="480" height="480" style="display:block;margin:0 auto;"></canvas>
        </div>
        <div class="geom-meta-bar" style="margin-top:8px">
          <span>DEM: <code>${vis.dem_dataset}</code></span>
          <span>DEM Loaded: <code>${vis.dem_loaded ? 'Yes' : 'No'}</code></span>
          <span>Coverage: <code>${vis.site.is_inside_dem ? 'Inside Site 01' : 'Outside Site 01'}</code></span>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);margin:8px 16px 0">${vis.note}</p>
      </div>
      ` : ''}
    </div>
    `;
  }

  private renderSiteTab(): string {
    const lat = this.selectedSite.latitudeDeg;
    const lon = this.selectedSite.longitudeDeg;
    const isInside = this.selectedSite.isInsideSite01DEM;

    return `
    <div class="tab-pane">
      <div class="grid-two-col">
        <!-- Left: Local Terrain Visualizer -->
        <div class="panel-card terrain-canvas-card">
          <div class="card-header">
            <h3>Detailed Local Terrain (Site 01)</h3>
            <div class="layer-toggle-group">
              <button class="btn-layer-toggle ${this.activeTerrainLayer === 'elev' ? 'active' : ''}" data-layer="elev">Elevation</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer === 'slope' ? 'active' : ''}" data-layer="slope">Slope</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer === 'toterr' ? 'active' : ''}" data-layer="toterr">Uncertainty</button>
            </div>
          </div>

          <div class="canvas-wrapper">
            ${
              isInside
                ? `<canvas id="site01-terrain-canvas" width="512" height="512" class="terrain-canvas"></canvas>
                   <div class="canvas-overlay-crosshair-note">Click anywhere on terrain tile to target coordinates</div>`
                : `<div class="outside-terrain-placeholder">
                    <div class="placeholder-icon">🌐</div>
                    <h4>Outside High-Resolution Site 01 DEM Footprint</h4>
                    <p>Current coordinates (${formatSelenographicCoords(lat, lon)}) fall outside the 16×16 km Site 01 tile.</p>
                    <p class="placeholder-hint">Global 16 px/° LOLA elevation remains active. Select Artemis Site 01 below or click the 3D Moon near Shackleton Ridge to enter 5 m/px coverage.</p>
                    <button id="btn-jump-site01" class="btn-preset-accent">🎯 Jump to Artemis Site 01</button>
                   </div>`
            }
          </div>

          <div class="terrain-stat-bar">
            <div class="stat-cell">
              <span class="stat-lbl">DEM ELEVATION</span>
              <span class="stat-val ${isInside ? 'val-good' : ''}">
                ${this.selectedSite.sampledElevationM !== undefined ? `${this.selectedSite.sampledElevationM >= 0 ? '+' : ''}${this.selectedSite.sampledElevationM} m` : '—'}
              </span>
            </div>
            <div class="stat-cell">
              <span class="stat-lbl">LOCAL SLOPE</span>
              <span class="stat-val">
                ${this.selectedSite.sampledSlopeDeg !== undefined ? `${this.selectedSite.sampledSlopeDeg}°` : '—'}
              </span>
            </div>
            <div class="stat-cell">
              <span class="stat-lbl">TOTAL ERROR (1σ)</span>
              <span class="stat-val">
                ${this.selectedSite.sampledErrorM !== undefined ? `±${this.selectedSite.sampledErrorM} m` : '—'}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Inputs and Presets -->
        <div class="panel-card">
          <div class="card-header">
            <h3>Candidate Landing Site Presets</h3>
          </div>
          <div class="preset-list">
            ${MISSION_PRESETS.map(
              (p) => `
              <div class="preset-item ${p.lat === lat && p.lon === lon ? 'selected' : ''}" data-preset-id="${p.id}">
                <div class="preset-title-row">
                  <span class="preset-name">${p.name}</span>
                  <span class="preset-tag ${p.id === 'site-01' ? 'tag-dem' : 'tag-global'}">
                    ${p.id === 'site-01' ? '5m DEM Active' : 'Global 16px/°'}
                  </span>
                </div>
                <div class="preset-desc">${p.description}</div>
                <div class="preset-coords">${p.lat.toFixed(3)}° S, ${p.lon.toFixed(2)}° E (${p.elev >= 0 ? '+' : ''}${p.elev} m)</div>
              </div>
            `,
            ).join('')}
          </div>

          <div class="card-header separator-header">
            <h3>Coordinate Inputs (MOON_ME Convention)</h3>
          </div>

          <div class="coord-form">
            <div class="form-row">
              <label for="inp-lat">Latitude (°)</label>
              <div class="input-with-hint">
                <input id="inp-lat" type="number" step="0.001" min="-90" max="90" value="${lat.toFixed(3)}" />
                <span class="hint-pill">Negative = South (°S)</span>
              </div>
            </div>

            <div class="form-row">
              <label for="inp-lon">Longitude (°)</label>
              <div class="input-with-hint">
                <input id="inp-lon" type="number" step="0.001" min="-180" max="360" value="${lon.toFixed(3)}" />
                <span class="hint-pill">East-positive [0..360)</span>
              </div>
            </div>

            <div class="form-row">
              <label for="inp-elev">Surface Elevation (m)</label>
              <div class="input-with-hint">
                <input id="inp-elev" type="number" step="1" value="${this.selectedSite.elevationM.toFixed(1)}" />
                <span class="hint-pill">Ref R = 1737.4 km</span>
              </div>
            </div>

            <div class="coverage-status-box ${isInside ? 'status-dem-active' : 'status-dem-outside'}">
              <div class="status-indicator-dot"></div>
              <div class="status-text">
                <strong>${isInside ? 'Inside NASA LOLA Site 01 (5 m/px) Tile' : 'Outside High-Resolution Site 01 DEM'}</strong>
                <p>${
                  isInside
                    ? 'Rigorous polar stereographic transform active. Native raster bounds: L=-19 km, R=-3 km, B=-20 km, T=-4 km.'
                    : 'Coordinates will use SPICE geometric ephemeris with NASA global 16 px/° LOLA elevation relief.'
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  private renderTimelineTab(): string {
    const isInside = this.selectedSite.isInsideSite01DEM;
    const resp = this.timelineResponse;
    const summary = resp?.summary;
    const samples = resp?.samples ?? [];
    const currentSample = samples[this.scrubbedSampleIndex] ?? samples[0];

    const sunStatusBadge = (state: string) => {
      switch (state) {
        case 'full_sunlight':
          return '<span class="status-badge badge-green">☀️ Full Sunlight</span>';
        case 'partial_sunlight':
          return '<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';
        case 'total_darkness':
          return '<span class="status-badge badge-slate">🌑 Total Darkness</span>';
        default:
          return '<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>';
      }
    };

    const earthStatusBadge = (state: string) => {
      switch (state) {
        case 'full_disc_los':
          return '<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';
        case 'centre_only_los':
          return '<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';
        case 'partial_disc_los':
          return '<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';
        case 'occulted':
          return '<span class="status-badge badge-red">🌑 Occulted</span>';
        default:
          return '<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>';
      }
    };

    const sunTrackColor = (state: string) => {
      switch (state) {
        case 'full_sunlight': return '#22c55e';
        case 'partial_sunlight': return '#f59e0b';
        case 'total_darkness': return '#1e293b';
        default: return '#6b21a8';
      }
    };

    const earthTrackColor = (state: string) => {
      switch (state) {
        case 'full_disc_los': return '#3b82f6';
        case 'centre_only_los': return '#06b6d4';
        case 'partial_disc_los': return '#f59e0b';
        case 'occulted': return '#ef4444';
        default: return '#6b21a8';
      }
    };

    return `
    <div class="tab-pane">
      <div class="grid-two-col">
        <div class="panel-card">
          <div class="card-header">
            <h3>Mission Timing &amp; Sampling Configuration</h3>
          </div>
          <div class="form-group">
            <label for="inp-start-date">Start Date (UTC)</label>
            <input id="inp-start-date" type="date" value="${this.timeline.startDate}" />
          </div>
          <div class="form-group">
            <label for="inp-start-time">Start Time (UTC Zulu)</label>
            <input id="inp-start-time" type="time" step="1" value="${this.timeline.startTime}" />
          </div>
          <div class="form-badge-row">
            <span class="badge-pill">ISO 8601 UTC:</span>
            <code class="code-pill">${this.timeline.isoUtcStart}</code>
          </div>

          <div class="card-header separator-header">
            <h3>Mission Analysis Duration</h3>
          </div>
          <div class="duration-row">
            <div class="form-group flex-1">
              <label for="inp-duration-val">Duration</label>
              <input id="inp-duration-val" type="number" min="1" max="365" value="${this.timeline.durationValue}" />
            </div>
            <div class="form-group flex-1">
              <label for="inp-duration-unit">Units</label>
              <select id="inp-duration-unit">
                <option value="days" ${this.timeline.durationUnit === 'days' ? 'selected' : ''}>Days</option>
                <option value="hours" ${this.timeline.durationUnit === 'hours' ? 'selected' : ''}>Hours</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="inp-timestep">Time Sampling Step</label>
            <select id="inp-timestep">
              <option value="0.25" ${this.timeline.timeStepHours === 0.25 ? 'selected' : ''}>15 minutes (High-resolution)</option>
              <option value="0.5" ${this.timeline.timeStepHours === 0.5 ? 'selected' : ''}>30 minutes (Operational)</option>
              <option value="1" ${this.timeline.timeStepHours === 1 ? 'selected' : ''}>1 hour (Standard step)</option>
              <option value="6" ${this.timeline.timeStepHours === 6 ? 'selected' : ''}>6 hours (Synoptic overview)</option>
              <option value="24" ${this.timeline.timeStepHours === 24 ? 'selected' : ''}>24 hours (Daily overview)</option>
            </select>
          </div>

          <div style="margin-top:16px;">
            <button id="btn-calc-timeline" class="btn-primary full-width${this.timelineLoading ? ' loading' : ''}" style="width:100%; justify-content:center; padding:0.75rem 1rem;">
              ${this.timelineLoading ? '⏳ Computing Visibility Windows...' : '⚡ Calculate Mission Timeline &amp; Visibility Windows'}
            </button>
          </div>
        </div>

        <div class="panel-card">
          <div class="card-header">
            <h3>Calculated Mission Window &amp; Coverage</h3>
          </div>
          <div class="timeline-window-card">
            <div class="timeline-milestone">
              <div class="milestone-marker start-marker">●</div>
              <div class="milestone-content">
                <div class="milestone-lbl">MISSION COMMENCEMENT</div>
                <div class="milestone-time">${this.timeline.isoUtcStart}</div>
              </div>
            </div>

            <div class="timeline-connector">
              <span class="connector-line"></span>
              <span class="connector-duration">${this.timeline.durationValue} ${this.timeline.durationUnit} analysis span</span>
            </div>

            <div class="timeline-milestone">
              <div class="milestone-marker end-marker">●</div>
              <div class="milestone-content">
                <div class="milestone-lbl">MISSION CONCLUSION</div>
                <div class="milestone-time">${this.timeline.isoUtcEnd}</div>
              </div>
            </div>
          </div>

          <div class="card-header separator-header">
            <h3>DE440s SPICE &amp; DEM Coverage Status</h3>
          </div>
          <div class="kernel-coverage-box ${this.timeline.isWithinKernelCoverage ? 'coverage-ok' : 'coverage-error'}">
            <div class="coverage-icon">${this.timeline.isWithinKernelCoverage ? '✅' : '❌'}</div>
            <div>
              <strong>${this.timeline.isWithinKernelCoverage ? 'Covered by Installed SPICE DE440s Kernel' : 'Time Interval Out of Kernel Range'}</strong>
              <p>NASA JPL DE440s SPK covers celestial ephemerides from Jan 1900 to Dec 2050 UTC.</p>
            </div>
          </div>

          <div class="kernel-coverage-box ${isInside ? 'coverage-ok' : 'coverage-warning'}" style="margin-top:8px;">
            <div class="coverage-icon">${isInside ? '🗺️' : '⚠️'}</div>
            <div>
              <strong>${isInside ? 'Site 01 High-Resolution 5 m/px DEM Active' : 'Outside Site 01 High-Resolution Footprint'}</strong>
              <p>${isInside ? 'Rigorous topocentric ray-marching across 16×16 km polar stereographic raster.' : 'Terrain occlusion cannot be evaluated outside tile footprint; results will indicate unknown coverage.'}</p>
            </div>
          </div>
        </div>
      </div>

      ${this.timelineError ? `
      <div class="check-item check-fail" style="margin-top:16px;">
        <div class="check-icon">✕</div>
        <div class="check-body"><div class="check-label">Timeline Calculation Error</div><div class="check-detail">${this.timelineError}</div></div>
      </div>
      ` : ''}

      ${resp && summary ? `
      <!-- KPI Metric Cards -->
      <div class="kpi-grid-row" style="margin-top:16px;">
        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>☀️ Solar Illumination Summary</h3>
            <span class="badge-pill">Apparent Disc: ~0.53°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Sunlight:</span> <strong style="color:#22c55e;">${summary.sunlight.full_sunlight_hours} h (${summary.sunlight.full_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Penumbral / Grazing:</span> <strong style="color:#f59e0b;">${summary.sunlight.partial_sunlight_hours} h (${summary.sunlight.partial_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Total Darkness:</span> <strong style="color:#94a3b8;">${summary.sunlight.total_darkness_hours} h (${summary.sunlight.total_darkness_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Sunlight:</span> <strong>${summary.sunlight.max_continuous_sunlight_hours} h</strong></div>
            <div class="kpi-row"><span>Max Continuous Darkness:</span> <strong>${summary.sunlight.max_continuous_darkness_hours} h</strong></div>
            <div class="kpi-row"><span>Sunrise / Sunset Cycles:</span> <strong>${summary.sunlight.transition_count} transitions</strong></div>
          </div>
        </div>

        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>🌍 Direct-to-Earth Line of Sight</h3>
            <span class="badge-pill">Apparent Disc: ~1.9°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Disc LOS:</span> <strong style="color:#3b82f6;">${summary.earth_los.full_disc_los_hours} h (${summary.earth_los.full_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Centre / Partial LOS:</span> <strong style="color:#06b6d4;">${summary.earth_los.partial_disc_los_hours} h (${summary.earth_los.partial_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Occulted:</span> <strong style="color:#ef4444;">${summary.earth_los.occulted_hours} h (${summary.earth_los.occulted_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Earth LOS:</span> <strong>${summary.earth_los.max_continuous_los_hours} h</strong></div>
            <div class="kpi-row"><span>Occultation Events:</span> <strong>${summary.earth_los.transition_count} transitions</strong></div>
          </div>
          <div class="vis-note" style="margin-top:8px; border-radius:4px; font-size:0.72rem;">
            ${summary.earth_los.communication_disclaimer}
          </div>
        </div>
      </div>

      <!-- Interactive Multi-Track Visual Timeline & Scrubber -->
      <div class="panel-card" style="margin-top:16px;">
        <div class="card-header">
          <h3>Interactive Mission Timeline &amp; Synchronized Scrubber</h3>
          <span style="font-size:0.78rem;color:var(--text-muted);">${samples.length} discrete SPICE samples · Bisection refined to 60s</span>
        </div>

        <div class="timeline-visual-wrapper" style="padding:16px;">
          <!-- Track 1: Sun Illumination -->
          <div class="track-container">
            <div class="track-header">
              <span class="track-title">☀️ Sun Visibility</span>
              <span class="track-legend">
                <span class="legend-dot" style="background:#22c55e;"></span>Full Sun
                <span class="legend-dot" style="background:#f59e0b;"></span>Grazing
                <span class="legend-dot" style="background:#1e293b;"></span>Darkness
              </span>
            </div>
            <div class="timeline-bar-track">
              ${resp.sun_windows.map((w) => `
                <div class="timeline-bar-seg" style="flex: ${w.duration_hours}; background: ${sunTrackColor(w.state)};" title="${w.state.replace(/_/g, ' ')}: ${w.duration_hours}h (${w.start_utc} → ${w.end_utc})"></div>
              `).join('')}
            </div>
          </div>

          <!-- Track 2: Earth Line-of-Sight -->
          <div class="track-container" style="margin-top:12px;">
            <div class="track-header">
              <span class="track-title">🌍 Potential Earth Line-of-Sight</span>
              <span class="track-legend">
                <span class="legend-dot" style="background:#3b82f6;"></span>Full Disc
                <span class="legend-dot" style="background:#06b6d4;"></span>Centre/Partial
                <span class="legend-dot" style="background:#ef4444;"></span>Occulted
              </span>
            </div>
            <div class="timeline-bar-track">
              ${resp.earth_windows.map((w) => `
                <div class="timeline-bar-seg" style="flex: ${w.duration_hours}; background: ${earthTrackColor(w.state)};" title="${w.state.replace(/_/g, ' ')}: ${w.duration_hours}h (${w.start_utc} → ${w.end_utc})"></div>
              `).join('')}
            </div>
          </div>

          <!-- Range slider scrubber -->
          <div class="scrubber-container" style="margin-top:16px;">
            <input id="inp-timeline-scrubber" type="range" min="0" max="${samples.length - 1}" value="${this.scrubbedSampleIndex}" step="1" class="timeline-scrubber-slider" style="width:100%;" />
            <div class="scrubber-ticks">
              <span>${this.timeline.isoUtcStart}</span>
              <span style="font-weight:600; color:var(--accent-primary);">Current Scrubber Time</span>
              <span>${this.timeline.isoUtcEnd}</span>
            </div>
          </div>

          <!-- Instantaneous conditions card for selected timestamp -->
          ${currentSample ? `
          <div id="scrubbed-conditions-panel" class="scrubbed-conditions-panel" style="margin-top:16px;">
            <div class="scrubbed-header">
              <div>
                <span class="scrubbed-time-title">Selected UTC Timestamp:</span>
                <strong id="scrubbed-time-val" class="code-pill" style="font-size:0.95rem; margin-left:8px;">${currentSample.timestamp_utc}</strong>
              </div>
              <span class="badge-pill">Sample ${this.scrubbedSampleIndex + 1} of ${samples.length}</span>
            </div>

            <div class="scrubbed-grid">
              <div class="scrubbed-col">
                <div class="scrubbed-col-title">☀️ Sun Ephemeris &amp; Illumination</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${sunStatusBadge(currentSample.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${currentSample.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${currentSample.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${currentSample.sun.terrain_horizon_elevation_deg !== null ? currentSample.sun.terrain_horizon_elevation_deg.toFixed(2) + '°' : '—'}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(currentSample.sun.angular_clearance_deg ?? 0) >= 0 ? '#22c55e' : '#ef4444'}">${currentSample.sun.angular_clearance_deg !== null ? (currentSample.sun.angular_clearance_deg >= 0 ? '+' : '') + currentSample.sun.angular_clearance_deg.toFixed(2) + '°' : '—'}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${earthStatusBadge(currentSample.earth.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${currentSample.earth.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${currentSample.earth.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${currentSample.earth.terrain_horizon_elevation_deg !== null ? currentSample.earth.terrain_horizon_elevation_deg.toFixed(2) + '°' : '—'}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(currentSample.earth.angular_clearance_deg ?? 0) >= 0 ? '#3b82f6' : '#ef4444'}">${currentSample.earth.angular_clearance_deg !== null ? (currentSample.earth.angular_clearance_deg >= 0 ? '+' : '') + currentSample.earth.angular_clearance_deg.toFixed(2) + '°' : '—'}</strong></div>
              </div>
            </div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Visibility Windows Table Breakdown -->
      <div class="panel-card" style="margin-top:16px;">
        <div class="card-header">
          <h3>Calculated Continuous Visibility Windows</h3>
          <span style="font-size:0.78rem;color:var(--text-muted);">Refined transitions (accuracy: ±60 sec)</span>
        </div>
        <div class="windows-table-wrapper" style="max-height:280px; overflow-y:auto; padding:8px 16px;">
          <table class="windows-table" style="width:100%; border-collapse:collapse; font-size:0.78rem;">
            <thead>
              <tr style="border-bottom:1px solid rgba(148,163,184,0.2); text-align:left; color:var(--text-muted);">
                <th style="padding:6px;">Target</th>
                <th style="padding:6px;">Start (UTC)</th>
                <th style="padding:6px;">End (UTC)</th>
                <th style="padding:6px;">Duration</th>
                <th style="padding:6px;">State</th>
              </tr>
            </thead>
            <tbody>
              ${resp.sun_windows.map((w) => `
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">☀️ Sun</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${w.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${w.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${w.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${sunStatusBadge(w.state)}</td>
                </tr>
              `).join('')}
              ${resp.earth_windows.map((w) => `
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${w.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${w.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${w.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${earthStatusBadge(w.state)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ` : `
      <div class="empty-geom-state" style="margin-top:16px;">
        <p>No mission timeline has been calculated yet.</p>
        <p class="hint">Configure the start timestamp and duration above, then click <strong>Calculate Mission Timeline &amp; Visibility Windows</strong> to run topocentric SPICE sampling and terrain ray-marching.</p>
      </div>
      `}
    </div>
    `;
  }

  private renderDetailsTab(): string {
    return `
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Mission Scenario Identity</h3>
        </div>
        <div class="form-group">
          <label for="inp-scen-name">Scenario Name</label>
          <input id="inp-scen-name" type="text" value="${this.scenarioName}" class="full-width" />
        </div>
        <div class="form-group">
          <label for="inp-scen-notes">Operational Notes & Objectives</label>
          <textarea id="inp-scen-notes" rows="4" class="full-width">${this.scenarioNotes}</textarea>
        </div>

        <div class="card-header separator-header">
          <h3>Coordinate Reference System & Scientific Standards</h3>
        </div>
        <div class="metadata-grid">
          <div class="meta-item">
            <span class="meta-lbl">CELESTIAL BODY</span>
            <span class="meta-val">Moon (NAIF ID: 301)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">REFERENCE FRAME</span>
            <span class="meta-val">MOON_ME (NAIF ID: 31001)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">COORDINATE DATUM</span>
            <span class="meta-val">IAU 2000 Sphere (R = 1,737,400.0 m)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">LONGITUDE CONVENTION</span>
            <span class="meta-val">East-Positive [0°..360°) · Prime Meridian = Earth Facing</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">HIGH-RES DEM</span>
            <span class="meta-val">NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">SPICE KERNELS</span>
            <span class="meta-val">de440s.bsp, pck00011.tpc, moon_pa_de440, moon_de440.tf</span>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  private renderReadinessTab(readiness: ReturnType<typeof this.getReadinessEvaluation>): string {
    const geom = this.initialGeometry;

    return `
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Data-Readiness Checklist</h3>
          <span class="readiness-pill ${readiness.state.toLowerCase()}">${readiness.state.replace(/_/g, ' ')}</span>
        </div>
        <p class="readiness-summary-line">${readiness.summary}</p>

        <div class="checks-list">
          ${readiness.checks
            .map(
              (c) => `
            <div class="check-item check-${c.status}">
              <div class="check-icon">${c.status === 'pass' ? '✓' : c.status === 'warn' ? '⚠' : '✕'}</div>
              <div class="check-body">
                <div class="check-label">${c.label}</div>
                <div class="check-detail">${c.detail}</div>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>

        <div class="card-header separator-header">
          <h3>SPICE Ephemeris Geometry Preview (Single Timestamp)</h3>
          <button id="btn-eval-spice-tab" class="btn-primary">⚡ Evaluate Live Geometry</button>
        </div>

        <div class="geometry-preview-area">
          ${
            geom
              ? `
            <div class="geom-result-grid">
              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">☀️ Sun Position</span>
                  <span class="horizon-badge ${geom.sun.elevation_deg >= 0 ? 'badge-above' : 'badge-below'}">
                    ${geom.sun.elevation_deg >= 0 ? '↑ Above Horizon' : '↓ Below Horizon'}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${geom.sun.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${geom.sun.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${(geom.sun.distance_au ?? geom.sun.distance_km / 1.495978707e8).toFixed(4)} AU (${(geom.sun.distance_km / 1e6).toFixed(2)}M km)</strong></div>
                </div>
              </div>

              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">🌍 Earth Position</span>
                  <span class="horizon-badge ${geom.earth.elevation_deg >= 0 ? 'badge-above' : 'badge-below'}">
                    ${geom.earth.elevation_deg >= 0 ? '↑ Line-of-Sight' : '↓ Below Horizon'}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${geom.earth.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${geom.earth.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${Math.round(geom.earth.distance_km).toLocaleString()} km</strong></div>
                </div>
              </div>
            </div>

            <div class="geom-meta-bar">
              <span>Epoch: <code>${geom.spice_utc}</code> (ET: ${geom.ephemeris_time_s.toFixed(2)} s)</span>
              <span>Frame: <code>${geom.reference_frame}</code></span>
              <span>Aberration: <code>${geom.aberration_correction}</code></span>
            </div>
          `
              : `<div class="empty-geom-state">
                  <p>No ephemeris calculation performed yet for this scenario configuration.</p>
                  <p class="hint">Click <strong>Evaluate Live Geometry</strong> above to send parameters to the SPICE backend.</p>
                 </div>`
          }
        </div>
      </div>
    </div>
    `;
  }

  private renderSummaryTab(readiness: ReturnType<typeof this.getReadinessEvaluation>): string {
    const lat = this.selectedSite.latitudeDeg;
    const lon = this.selectedSite.longitudeDeg;

    return `
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Configuration Summary</h3>
          <span class="readiness-pill ${readiness.state.toLowerCase()}">${readiness.state.replace(/_/g, ' ')}</span>
        </div>

        <table class="summary-table">
          <tbody>
            <tr>
              <td>Scenario Name</td>
              <td><strong>${this.scenarioName}</strong></td>
            </tr>
            <tr>
              <td>Target Region</td>
              <td>Lunar South Pole (80°S–90°S)</td>
            </tr>
            <tr>
              <td>Site Designation</td>
              <td>${this.selectedSite.name} · ${this.selectedSite.designation}</td>
            </tr>
            <tr>
              <td>Coordinates</td>
              <td><code>${formatSelenographicCoords(lat, lon)}</code></td>
            </tr>
            <tr>
              <td>Surface Elevation</td>
              <td>${this.selectedSite.elevationM >= 0 ? '+' : ''}${this.selectedSite.elevationM} m (Datum: R = 1737.4 km)</td>
            </tr>
            <tr>
              <td>Topographic DEM</td>
              <td>${this.selectedSite.demDatasetName ?? 'NASA LOLA Global 16 px/° (Site 01 5mpp unavailable)'}</td>
            </tr>
            <tr>
              <td>Mission Commencement</td>
              <td><code>${this.timeline.isoUtcStart}</code></td>
            </tr>
            <tr>
              <td>Mission Conclusion</td>
              <td><code>${this.timeline.isoUtcEnd}</code> (${this.timeline.durationValue} ${this.timeline.durationUnit})</td>
            </tr>
            <tr>
              <td>SPICE Kernel Engine</td>
              <td>${this.spiceHealth?.initialized ? 'Online · Verified NAIF SPK/PCK/FK' : 'Offline'}</td>
            </tr>
            <tr>
              <td>Evaluation Status</td>
              <td>${this.initialGeometry ? 'Ephemeris Evaluated' : 'Pending Initial Calculation'}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary-actions-bar">
          <button id="btn-export-scenario-summary" class="btn-secondary">📥 Download Scenario JSON</button>
          <button id="btn-apply-3d-view" class="btn-primary">🎯 Apply & Focus Site in 3D Scene</button>
        </div>
      </div>
    </div>
    `;
  }

  // ── Terrain Canvas Drawing ────────────────────────────────────────────────

  private drawTerrainCanvas() {
    setTimeout(() => {
      const canvas = document.getElementById('site01-terrain-canvas') as HTMLCanvasElement;
      if (!canvas) return;
      this.terrainCtx = canvas.getContext('2d');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      const layerSrc =
        this.activeTerrainLayer === 'slope'
          ? '/generated/site01_slope.png'
          : this.activeTerrainLayer === 'toterr'
          ? '/generated/site01_toterr.png'
          : '/generated/site01_elev_norm.png';

      img.onload = () => {
        if (!this.terrainCtx) return;
        this.terrainCtx.clearRect(0, 0, 512, 512);
        this.terrainCtx.drawImage(img, 0, 0, 512, 512);

        // Draw crosshair at current selected site pixel
        if (this.selectedSite.pixelCoords) {
          const { px, py } = this.selectedSite.pixelCoords;
          this.terrainCtx.strokeStyle = '#38bdf8';
          this.terrainCtx.lineWidth = 2;
          this.terrainCtx.beginPath();
          // Horizontal line
          this.terrainCtx.moveTo(px - 14, py);
          this.terrainCtx.lineTo(px + 14, py);
          // Vertical line
          this.terrainCtx.moveTo(px, py - 14);
          this.terrainCtx.lineTo(px, py + 14);
          this.terrainCtx.stroke();

          // Circle
          this.terrainCtx.beginPath();
          this.terrainCtx.arc(px, py, 6, 0, 2 * Math.PI);
          this.terrainCtx.stroke();
        }
      };
      img.src = layerSrc;
    }, 50);
  }

  // ── Event Wiring ──────────────────────────────────────────────────────────

  private wireEvents() {
    // Close button
    this.container.querySelector('#btn-close-workspace')?.addEventListener('click', () => this.close());

    // Tabs
    this.container.querySelectorAll('.nav-tab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const btn = e.currentTarget as HTMLElement;
        this.currentTab = btn.dataset.tab || 'site';
        this.render();
      });
    });

    // Preset selection
    this.container.querySelectorAll('.preset-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const presetId = target.dataset.presetId;
        const preset = MISSION_PRESETS.find((p) => p.id === presetId);
        if (preset) {
          this.selectedSite.name = preset.name;
          this.selectedSite.designation = preset.designation;
          this.selectedSite.latitudeDeg = preset.lat;
          this.selectedSite.longitudeDeg = preset.lon;
          this.selectedSite.elevationM = preset.elev;
          this.updateSiteCoverageAndSample();
          this.render();
        }
      });
    });

    // Jump to Site 01 button
    this.container.querySelector('#btn-jump-site01')?.addEventListener('click', () => {
      const p = MISSION_PRESETS[0];
      this.selectedSite.name = p.name;
      this.selectedSite.designation = p.designation;
      this.selectedSite.latitudeDeg = p.lat;
      this.selectedSite.longitudeDeg = p.lon;
      this.selectedSite.elevationM = p.elev;
      this.updateSiteCoverageAndSample();
      this.render();
    });

    // Layer toggles
    this.container.querySelectorAll('.btn-layer-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.activeTerrainLayer = (target.dataset.layer as any) || 'elev';
        this.render();
      });
    });

    // Coordinate input changes
    const latInp = this.container.querySelector('#inp-lat') as HTMLInputElement;
    const lonInp = this.container.querySelector('#inp-lon') as HTMLInputElement;
    const elevInp = this.container.querySelector('#inp-elev') as HTMLInputElement;

    const onCoordChange = () => {
      if (!latInp || !lonInp || !elevInp) return;
      const lat = parseFloat(latInp.value);
      const lon = parseFloat(lonInp.value);
      const elev = parseFloat(elevInp.value);

      if (!isNaN(lat) && !isNaN(lon)) {
        this.selectedSite.latitudeDeg = lat;
        this.selectedSite.longitudeDeg = lon;
        this.selectedSite.elevationM = isNaN(elev) ? 0 : elev;
        this.selectedSite.name = 'Custom Coordinates';
        this.selectedSite.designation = 'User Input';
        this.updateSiteCoverageAndSample();
        this.render();
      }
    };

    latInp?.addEventListener('change', onCoordChange);
    lonInp?.addEventListener('change', onCoordChange);
    elevInp?.addEventListener('change', onCoordChange);

    // Canvas click
    const canvas = this.container.querySelector('#site01-terrain-canvas') as HTMLCanvasElement;
    canvas?.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const px = Math.round((clickX / rect.width) * 512);
      const py = Math.round((clickY / rect.height) * 512);

      const { lonDeg, latDeg } = previewPixelToSelenographic(px, py);
      this.selectedSite.latitudeDeg = Math.round(latDeg * 1000) / 1000;
      this.selectedSite.longitudeDeg = Math.round(lonDeg * 1000) / 1000;
      this.selectedSite.name = 'Site 01 Targeted Point';
      this.selectedSite.designation = `Terrain Pixel (${px}, ${py})`;
      this.updateSiteCoverageAndSample();
      this.render();
    });

    // Timeline inputs
    const startDateInp = this.container.querySelector('#inp-start-date') as HTMLInputElement;
    const startTimeInp = this.container.querySelector('#inp-start-time') as HTMLInputElement;
    const durValInp = this.container.querySelector('#inp-duration-val') as HTMLInputElement;
    const durUnitInp = this.container.querySelector('#inp-duration-unit') as HTMLSelectElement;
    const timeStepInp = this.container.querySelector('#inp-timestep') as HTMLSelectElement;

    const onTimelineChange = () => {
      if (startDateInp) this.timeline.startDate = startDateInp.value;
      if (startTimeInp) this.timeline.startTime = startTimeInp.value;
      if (durValInp) this.timeline.durationValue = parseInt(durValInp.value, 10) || 1;
      if (durUnitInp) this.timeline.durationUnit = durUnitInp.value as any;
      if (timeStepInp) this.timeline.timeStepHours = parseFloat(timeStepInp.value) || 1;
      this.computeIsoTimestamps();
      this.render();
    };

    startDateInp?.addEventListener('change', onTimelineChange);
    startTimeInp?.addEventListener('change', onTimelineChange);
    durValInp?.addEventListener('change', onTimelineChange);
    durUnitInp?.addEventListener('change', onTimelineChange);
    timeStepInp?.addEventListener('change', onTimelineChange);

    // Calculate Timeline
    const triggerTimelineCalc = async () => {
      this.timelineLoading = true;
      this.timelineError = null;
      this.render();
      try {
        this.computeIsoTimestamps();
        const stepMins = Math.round(this.timeline.timeStepHours * 60);
        const resp = await fetchMissionTimeline({
          start_utc: this.timeline.isoUtcStart,
          end_utc: this.timeline.isoUtcEnd,
          latitude_deg: this.selectedSite.latitudeDeg,
          longitude_deg: this.selectedSite.longitudeDeg,
          elevation_m: this.selectedSite.elevationM,
          instrument_height_m: 2.0,
          step_minutes: stepMins,
          refinement_tolerance_sec: 60,
        });
        this.timelineResponse = resp;
        this.scrubbedSampleIndex = 0;
        this.timelineLoading = false;
        this.render();
        if (resp.samples.length > 0 && this.onTimelineScrubbedCallback) {
          this.onTimelineScrubbedCallback(resp.samples[0]);
        }
      } catch (err: any) {
        this.timelineLoading = false;
        this.timelineError = err.message ?? String(err);
        this.render();
      }
    };
    this.container.querySelector('#btn-calc-timeline')?.addEventListener('click', triggerTimelineCalc);

    // Timeline scrubber slider
    const scrubber = this.container.querySelector('#inp-timeline-scrubber') as HTMLInputElement | null;
    scrubber?.addEventListener('input', () => {
      const idx = parseInt(scrubber.value, 10);
      this.scrubbedSampleIndex = idx;
      const sample = this.timelineResponse?.samples[idx];
      if (sample) {
        this.updateScrubbedReadout(sample);
        if (this.onTimelineScrubbedCallback) {
          this.onTimelineScrubbedCallback(sample);
        }
      }
    });

    // Details inputs
    const scenNameInp = this.container.querySelector('#inp-scen-name') as HTMLInputElement;
    const scenNotesInp = this.container.querySelector('#inp-scen-notes') as HTMLTextAreaElement;
    scenNameInp?.addEventListener('input', () => {
      this.scenarioName = scenNameInp.value;
    });
    scenNotesInp?.addEventListener('input', () => {
      this.scenarioNotes = scenNotesInp.value;
    });

    // Evaluate SPICE buttons
    const triggerSpiceEval = async () => {
      try {
        const btn1 = this.container.querySelector('#btn-eval-spice-tab') as HTMLButtonElement;
        const btn2 = this.container.querySelector('#btn-eval-spice-footer') as HTMLButtonElement;
        if (btn1) {
          btn1.disabled = true;
          btn1.textContent = 'Calculating SPICE...';
        }
        if (btn2) {
          btn2.disabled = true;
          btn2.textContent = 'Calculating SPICE...';
        }

        this.computeIsoTimestamps();
        const resp = await fetchGeometry({
          utc_time: this.timeline.isoUtcStart,
          latitude_deg: this.selectedSite.latitudeDeg,
          longitude_deg: this.selectedSite.longitudeDeg,
          elevation_m: this.selectedSite.elevationM,
        });

        this.initialGeometry = resp;
        // Reset horizon results when new geometry is computed
        this.horizonProfile = null;
        this.horizonVisibility = null;
        this.horizonError = null;
        this.currentTab = 'readiness';
        this.render();
      } catch (err: any) {
        console.error('[MissionWorkspace] SPICE Calculation Error:', err);
        this.currentTab = 'readiness';
        this.render();
        const area = this.container.querySelector('.geometry-preview-area');
        if (area) {
          area.innerHTML = `
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${err.message || err}</p>
            </div>
          `;
        }
      }
    };

    this.container.querySelector('#btn-eval-spice-tab')?.addEventListener('click', triggerSpiceEval);
    this.container.querySelector('#btn-eval-spice-footer')?.addEventListener('click', triggerSpiceEval);

    // Horizon evaluation
    this.container.querySelector('#btn-eval-horizon')?.addEventListener('click', async () => {
      if (!this.initialGeometry) {
        this.horizonError = 'Please evaluate SPICE geometry first (Readiness & SPICE tab).';
        this.render();
        return;
      }
      if (!this.selectedSite.isInsideSite01DEM) {
        this.horizonError = 'Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.';
        this.render();
        return;
      }
      this.horizonLoading = true;
      this.horizonError = null;
      this.render();
      try {
        const geom = this.initialGeometry!;
        const [profile, vis] = await Promise.all([
          fetchHorizonProfile({
            latitude_deg: this.selectedSite.latitudeDeg,
            longitude_deg: this.selectedSite.longitudeDeg,
            elevation_m: this.selectedSite.elevationM,
            instrument_height_m: 2.0,
            angular_step_deg: 2.0,
          }),
          fetchHorizonVisibility({
            latitude_deg: this.selectedSite.latitudeDeg,
            longitude_deg: this.selectedSite.longitudeDeg,
            elevation_m: this.selectedSite.elevationM,
            instrument_height_m: 2.0,
            sun_azimuth_deg: geom.sun.azimuth_deg,
            sun_elevation_deg: geom.sun.elevation_deg,
            sun_distance_km: geom.sun.distance_km,
            earth_azimuth_deg: geom.earth.azimuth_deg,
            earth_elevation_deg: geom.earth.elevation_deg,
            earth_distance_km: geom.earth.distance_km,
          }),
        ]);
        this.horizonProfile = profile;
        this.horizonVisibility = vis;
        this.horizonLoading = false;
        this.render();
        // Draw polar chart after DOM update
        setTimeout(() => this.drawHorizonPolarChart(), 60);
      } catch (err: any) {
        this.horizonLoading = false;
        this.horizonError = err.message ?? String(err);
        this.render();
      }
    });

    // Draw polar chart when tab is already populated
    if (this.currentTab === 'horizon' && this.horizonProfile) {
      setTimeout(() => this.drawHorizonPolarChart(), 60);
    }

    // Export Scenario JSON
    const exportJSON = () => {
      const scenario = this.toScenarioJSON();
      const blob = new Blob([JSON.stringify(scenario, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    this.container.querySelector('#btn-export-scenario')?.addEventListener('click', exportJSON);
    this.container.querySelector('#btn-export-scenario-summary')?.addEventListener('click', exportJSON);

    // Apply & Focus Site
    this.container.querySelector('#btn-apply-3d-view')?.addEventListener('click', () => {
      if (this.onSiteChangedCallback) {
        this.onSiteChangedCallback(this.selectedSite);
      }
      this.close();
    });
  }

  // ── Horizon Polar Chart ────────────────────────────────────────────────────

  private drawHorizonPolarChart(): void {
    const canvas = document.getElementById('horizon-polar-canvas') as HTMLCanvasElement | null;
    if (!canvas || !this.horizonProfile) return;
    const profile = this.horizonProfile;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(W, H) / 2 - 32;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#0a0f1e';
    ctx.fillRect(0, 0, W, H);

    // Max skyline elevation to scale
    const maxEl = Math.max(...profile.profile.map((p) => p.horizon_elevation_deg), 10);

    // Concentric elevation rings
    const rings = [0, maxEl * 0.25, maxEl * 0.5, maxEl * 0.75, maxEl];
    rings.forEach((el) => {
      const r = maxR * (1 - el / maxEl);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(r, 1), 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(148,163,184,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      if (el > 0) {
        ctx.fillStyle = 'rgba(148,163,184,0.5)';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(`${el.toFixed(1)}°`, cx + 4, cy - r + 12);
      }
    });

    // Cardinal direction spokes
    const cardinals = [['N', 0], ['E', 90], ['S', 180], ['W', 270]];
    cardinals.forEach(([label, azDeg]) => {
      const rad = (Number(azDeg) - 90) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(rad), cy + maxR * Math.sin(rad));
      ctx.strokeStyle = 'rgba(148,163,184,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(String(label), cx + (maxR + 16) * Math.cos(rad) - 4, cy + (maxR + 16) * Math.sin(rad) + 4);
    });

    // Horizon skyline polygon
    ctx.beginPath();
    profile.profile.forEach((pt, i) => {
      const az = (pt.azimuth_deg - 90) * Math.PI / 180;
      const r = maxR * (1 - Math.min(pt.horizon_elevation_deg, maxEl) / maxEl);
      const x = cx + r * Math.cos(az);
      const y = cy + r * Math.sin(az);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(56,189,248,0.15)';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sun direction marker
    const vis = this.horizonVisibility;
    if (vis) {
      const drawTarget = (azDeg: number, elDeg: number, color: string, symbol: string) => {
        const rad = (azDeg - 90) * Math.PI / 180;
        const r = maxR * (1 - Math.max(0, Math.min(elDeg, maxEl)) / maxEl);
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol, x, y);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
      };
      drawTarget(vis.sun.azimuth_deg, vis.sun.geometric_elevation_deg, '#f59e0b', '☀');
      drawTarget(vis.earth.azimuth_deg, vis.earth.geometric_elevation_deg, '#3b82f6', '🌍');
    }

    // Centre dot
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
  }

  private updateScrubbedReadout(sample: TimelineSample): void {
    const timeValEl = this.container.querySelector('#scrubbed-time-val');
    if (timeValEl) timeValEl.textContent = sample.timestamp_utc;

    const sunStatusBadge = (state: string) => {
      switch (state) {
        case 'full_sunlight': return '<span class="status-badge badge-green">☀️ Full Sunlight</span>';
        case 'partial_sunlight': return '<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';
        case 'total_darkness': return '<span class="status-badge badge-slate">🌑 Total Darkness</span>';
        default: return '<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>';
      }
    };

    const earthStatusBadge = (state: string) => {
      switch (state) {
        case 'full_disc_los': return '<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';
        case 'centre_only_los': return '<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';
        case 'partial_disc_los': return '<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';
        case 'occulted': return '<span class="status-badge badge-red">🌑 Occulted</span>';
        default: return '<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>';
      }
    };

    const sunStateEl = this.container.querySelector('#scrubbed-sun-state');
    if (sunStateEl) sunStateEl.innerHTML = sunStatusBadge(sample.sun.visibility_state);

    const earthStateEl = this.container.querySelector('#scrubbed-earth-state');
    if (earthStateEl) earthStateEl.innerHTML = earthStatusBadge(sample.earth.visibility_state);

    const panel = this.container.querySelector('#scrubbed-conditions-panel');
    if (panel) {
      const sunCols = panel.querySelectorAll('.scrubbed-col')[0]?.querySelectorAll('.scrubbed-val-row strong');
      if (sunCols && sunCols.length >= 4) {
        sunCols[0].textContent = `${sample.sun.azimuth_deg.toFixed(2)}°`;
        sunCols[1].textContent = `${sample.sun.elevation_deg.toFixed(2)}°`;
        sunCols[2].textContent = sample.sun.terrain_horizon_elevation_deg !== null ? `${sample.sun.terrain_horizon_elevation_deg.toFixed(2)}°` : '—';
        const clr = sample.sun.angular_clearance_deg;
        sunCols[3].textContent = clr !== null ? `${clr >= 0 ? '+' : ''}${clr.toFixed(2)}°` : '—';
        (sunCols[3] as HTMLElement).style.color = (clr ?? 0) >= 0 ? '#22c55e' : '#ef4444';
      }
      const earthCols = panel.querySelectorAll('.scrubbed-col')[1]?.querySelectorAll('.scrubbed-val-row strong');
      if (earthCols && earthCols.length >= 4) {
        earthCols[0].textContent = `${sample.earth.azimuth_deg.toFixed(2)}°`;
        earthCols[1].textContent = `${sample.earth.elevation_deg.toFixed(2)}°`;
        earthCols[2].textContent = sample.earth.terrain_horizon_elevation_deg !== null ? `${sample.earth.terrain_horizon_elevation_deg.toFixed(2)}°` : '—';
        const clr = sample.earth.angular_clearance_deg;
        earthCols[3].textContent = clr !== null ? `${clr >= 0 ? '+' : ''}${clr.toFixed(2)}°` : '—';
        (earthCols[3] as HTMLElement).style.color = (clr ?? 0) >= 0 ? '#3b82f6' : '#ef4444';
      }
    }
  }
}
