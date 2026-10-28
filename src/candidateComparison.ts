import { ExportPanel } from './exportPanel';
/**
 * candidateComparison.ts — LUNAOPS Multi-Scenario Candidate Comparison Workspace.
 *
 * Implements Phase 5: Candidate-Site Comparison
 *  - Lets scientists configure and compare at least two candidate scenarios.
 *  - Compares different landing sites over the same period OR the same site over different mission dates.
 *  - Validates coordinates, SPICE kernel coverage (1900-2050), and DEM footprint (Site 01 16x16 km).
 *  - Evaluates user-defined constraints (sunlight, Earth LOS, max slope, max darkness).
 *  - Displays side-by-side comparison cards, synchronized timeline charts, and MCDA ranking.
 *  - Provides one-click camera focus to inspect each candidate on the 3D Moon.
 *  - Strict scientific integrity: never fabricates values or substitutes zero for missing DEM metrics.
 */

import {
  fetchCandidateComparison,
  type CandidateScenarioPayload,
  type ComparisonConstraintsPayload,
  type CandidateComparisonResponse,
} from './spiceClient';
import { MISSION_PRESETS } from './missionWorkspace';
import { formatSelenographicCoords } from './utils/coordinates';

export interface CandidateScenarioInput {
  id: string;
  name: string;
  latitudeDeg: number;
  longitudeDeg: number;
  elevationM: number;
  instrumentHeightM: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  stepMinutes: number;
}

export class CandidateComparisonWorkspace {
  private container: HTMLElement;
  private isOpen = false;
  private scenarios: CandidateScenarioInput[] = [];
  private constraints: ComparisonConstraintsPayload = {
    min_sunlight_percent: 50.0,
    min_earth_los_percent: 70.0,
    max_slope_deg: 12.0,
    max_continuous_darkness_hours: 24.0,
  };
  private comparisonResult: CandidateComparisonResponse | null = null;
  private isLoading = false;
  private errorMessage: string | null = null;
  private exportPanel: ExportPanel | null = null;

  // Callback to inspect candidate on 3D Moon
  private onInspectSiteOnGlobe?: (site: { name: string; lat: number; lon: number; elevationM: number }) => void;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'candidate-comparison-modal';
    this.container.className = 'mission-modal hidden';
    document.body.appendChild(this.container);

    this.initDefaultScenarios();
  }

  public openExportModal() {
    if (!this.exportPanel) {
      this.exportPanel = new ExportPanel();
    }
    this.exportPanel.openForComparison({
      reportTitle: 'LUNAOPS Candidate-Site Comparison Analysis',
      scenarios: this.scenarios,
      constraints: this.constraints,
      rankingWeights: {
        sunlight: 0.35,
        earth_los: 0.25,
        slope: 0.20,
        max_darkness: 0.20,
      },
      comparisonResult: this.comparisonResult,
    });
  }

  public setOnInspectSiteOnGlobe(cb: (site: { name: string; lat: number; lon: number; elevationM: number }) => void) {
    this.onInspectSiteOnGlobe = cb;
  }

  public open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
    this.render();
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  public getIsOpen(): boolean {
    return this.isOpen;
  }

  public toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  private initDefaultScenarios() {
    // Scenario A: Artemis Site 01 (Ridge) in October 2026
    this.scenarios = [
      {
        id: 'candidate-a',
        name: 'Artemis Site 01 — Peak Illumination',
        latitudeDeg: MISSION_PRESETS[0].lat,
        longitudeDeg: MISSION_PRESETS[0].lon,
        elevationM: MISSION_PRESETS[0].elev,
        instrumentHeightM: 2.0,
        startDate: '2026-10-16',
        startTime: '12:00:00',
        endDate: '2026-10-23',
        endTime: '12:00:00',
        stepMinutes: 60,
      },
      {
        id: 'candidate-b',
        name: 'Malapert Mountain — Topographic Massif',
        latitudeDeg: MISSION_PRESETS[3].lat,
        longitudeDeg: MISSION_PRESETS[3].lon,
        elevationM: MISSION_PRESETS[3].elev,
        instrumentHeightM: 2.0,
        startDate: '2026-10-16',
        startTime: '12:00:00',
        endDate: '2026-10-23',
        endTime: '12:00:00',
        stepMinutes: 60,
      },
    ];
  }

  public addScenario(presetId?: string) {
    const preset = MISSION_PRESETS.find((p) => p.id === presetId) || MISSION_PRESETS[0];
    const newIdx = this.scenarios.length + 1;
    this.scenarios.push({
      id: `candidate-${Date.now()}`,
      name: `Candidate ${newIdx} · ${preset.name}`,
      latitudeDeg: preset.lat,
      longitudeDeg: preset.lon,
      elevationM: preset.elev,
      instrumentHeightM: 2.0,
      startDate: this.scenarios[0]?.startDate || '2026-10-16',
      startTime: this.scenarios[0]?.startTime || '12:00:00',
      endDate: this.scenarios[0]?.endDate || '2026-10-23',
      endTime: this.scenarios[0]?.endTime || '12:00:00',
      stepMinutes: 60,
    });
    this.render();
  }

  public removeScenario(id: string) {
    if (this.scenarios.length <= 2) {
      alert('At least two candidate scenarios are required for side-by-side comparison.');
      return;
    }
    this.scenarios = this.scenarios.filter((s) => s.id !== id);
    this.render();
  }

  private async runComparison() {
    this.isLoading = true;
    this.errorMessage = null;
    this.render();

    try {
      const payloadScenarios: CandidateScenarioPayload[] = this.scenarios.map((s) => ({
        id: s.id,
        name: s.name,
        latitude_deg: s.latitudeDeg,
        longitude_deg: s.longitudeDeg,
        elevation_m: s.elevationM,
        instrument_height_m: s.instrumentHeightM,
        start_utc: `${s.startDate}T${s.startTime}Z`,
        end_utc: `${s.endDate}T${s.endTime}Z`,
        step_minutes: s.stepMinutes,
      }));

      const res = await fetchCandidateComparison({
        scenarios: payloadScenarios,
        constraints: this.constraints,
      });

      this.comparisonResult = res;
    } catch (err: any) {
      this.errorMessage = err.message || 'Comparison failed';
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  // ── Render UI ─────────────────────────────────────────────────────────────

  public render() {
    this.container.innerHTML = `
    <div class="mission-dialog comparison-dialog">
      <div class="mission-header">
        <div class="mission-title-group">
          <div class="mission-kicker">NASA SPACE APPS 2026 · PHASE 5 SCIENTIFIC COMPARISON</div>
          <h2 class="mission-title">Landing Site &amp; Mission Date Comparison</h2>
        </div>
        <div class="mission-header-actions">
          <span class="readiness-pill ready">${this.scenarios.length} SCENARIOS CONFIGURED</span>
          <button id="btn-close-comparison" class="modal-close-btn" title="Close Comparison">✕</button>
        </div>
      </div>

      <div class="comparison-scroll-content">
        <!-- Configuration Bar -->
        <section class="comparison-config-section">
          <div class="section-title-bar">
            <div>
              <h3 class="config-subtitle">Candidate Scenario Setup</h3>
              <p class="config-desc">Configure at least two landing scenarios. Compare distinct candidate sites over identical mission windows, or test the same location across different seasons.</p>
            </div>
            <div class="config-actions">
              <button id="btn-add-candidate" class="btn-secondary" title="Add another scenario to compare">+ Add Scenario</button>
              <button id="btn-sync-dates" class="btn-secondary" title="Synchronize all scenarios to Scenario 1 dates">⟲ Sync Dates</button>
              <button id="btn-run-comparison" class="btn-primary" ${this.isLoading ? 'disabled' : ''}>
                ${this.isLoading ? '⏳ Computing Ephemerides…' : '⚖️ Run Comparison Analysis'}
              </button>
            </div>
          </div>

          <div class="scenario-cards-grid">
            ${this.scenarios.map((sc, idx) => this.renderScenarioCard(sc, idx)).join('')}
          </div>
        </section>

        <!-- Constraints Panel -->
        <section class="constraints-section">
          <div class="collapsible-header">
            <h4>⚙️ User-Defined Evaluation Constraints</h4>
            <span class="constraints-hint">Thresholds are scientifically evaluated against computed results (Met, Unmet, or Unevaluable)</span>
          </div>
          <div class="constraints-grid">
            <div class="constraint-input-box">
              <label>Min Solar Illumination (%):</label>
              <input type="number" id="constraint-min-sun" min="0" max="100" step="5" value="${this.constraints.min_sunlight_percent ?? ''}" placeholder="e.g. 50">
            </div>
            <div class="constraint-input-box">
              <label>Min Direct Earth LOS (%):</label>
              <input type="number" id="constraint-min-earth" min="0" max="100" step="5" value="${this.constraints.min_earth_los_percent ?? ''}" placeholder="e.g. 70">
            </div>
            <div class="constraint-input-box">
              <label>Max Terrain Slope (°):</label>
              <input type="number" id="constraint-max-slope" min="0" max="45" step="1" value="${this.constraints.max_slope_deg ?? ''}" placeholder="e.g. 12">
            </div>
            <div class="constraint-input-box">
              <label>Max Continuous Darkness (hrs):</label>
              <input type="number" id="constraint-max-dark" min="0" max="720" step="6" value="${this.constraints.max_continuous_darkness_hours ?? ''}" placeholder="e.g. 24">
            </div>
          </div>
        </section>

        ${this.errorMessage ? `<div class="error-banner">⚠️ ${this.errorMessage}</div>` : ''}

        <!-- Results Dashboard -->
        ${this.comparisonResult ? this.renderComparisonResults() : this.renderPlaceholder()}
      </div>

      <div class="mission-footer">
        <div class="footer-note">
          <span class="disclaimer-icon">⚠️</span>
          <span>Scientific comparison uses topocentric SPICE DE440s ephemerides and NASA LOLA 5m/px DEM terrain relief. Low slope or high illumination does not guarantee landing safety.</span>
        </div>
        <div class="footer-actions">
          <button id="btn-export-comparison-panel" class="btn-highlight-compare" title="Export Scientific Comparison Report (PDF, CSV, JSON)">
            📤 Export Comparison Report
          </button>
        </div>
      </div>
    </div>
    `;

    this.wireEvents();
    if (this.comparisonResult) {
      this.drawSynchronizedTimelines();
    }
  }

  private renderScenarioCard(sc: CandidateScenarioInput, idx: number): string {
    const isInsideSite01 = sc.latitudeDeg <= -89.4 && sc.latitudeDeg >= -89.55 && sc.longitudeDeg >= 221.0 && sc.longitudeDeg <= 224.0;

    return `
    <div class="scenario-setup-card" data-id="${sc.id}">
      <div class="scenario-card-header">
        <span class="scenario-number-tag">SCENARIO ${idx + 1}</span>
        <button class="btn-remove-scenario" data-id="${sc.id}" title="Remove this candidate" ${this.scenarios.length <= 2 ? 'disabled' : ''}>✕</button>
      </div>

      <div class="scenario-input-group">
        <label>Scenario Label:</label>
        <input type="text" class="input-sc-name" data-id="${sc.id}" value="${sc.name}">
      </div>

      <div class="scenario-input-group">
        <label>Quick Preset:</label>
        <select class="select-preset" data-id="${sc.id}">
          <option value="">— Select Candidate Landing Site —</option>
          ${MISSION_PRESETS.map((p) => `<option value="${p.id}" ${p.name.includes(sc.name.split('·')[0].trim()) ? 'selected' : ''}>${p.name} (${p.lat}°S, ${p.lon}°E)</option>`).join('')}
        </select>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Latitude (°S):</label>
          <input type="number" class="input-lat" data-id="${sc.id}" step="0.001" min="-90" max="90" value="${sc.latitudeDeg}">
        </div>
        <div class="scenario-input-group">
          <label>Longitude (°E):</label>
          <input type="number" class="input-lon" data-id="${sc.id}" step="0.01" min="-180" max="360" value="${sc.longitudeDeg}">
        </div>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Elevation (m):</label>
          <input type="number" class="input-elev" data-id="${sc.id}" step="10" value="${sc.elevationM}">
        </div>
        <div class="scenario-input-group">
          <label>Sampling (min):</label>
          <select class="input-step" data-id="${sc.id}">
            <option value="15" ${sc.stepMinutes === 15 ? 'selected' : ''}>15 min</option>
            <option value="30" ${sc.stepMinutes === 30 ? 'selected' : ''}>30 min</option>
            <option value="60" ${sc.stepMinutes === 60 ? 'selected' : ''}>60 min</option>
          </select>
        </div>
      </div>

      <div class="dates-dual-grid">
        <div class="scenario-input-group">
          <label>Start UTC:</label>
          <input type="date" class="input-start-date" data-id="${sc.id}" value="${sc.startDate}">
        </div>
        <div class="scenario-input-group">
          <label>End UTC:</label>
          <input type="date" class="input-end-date" data-id="${sc.id}" value="${sc.endDate}">
        </div>
      </div>

      <div class="card-footer-status">
        <span class="dem-tag ${isInsideSite01 ? 'inside' : 'outside'}">
          ${isInsideSite01 ? '✓ Site 01 5m DEM Covered' : '⚠ Outside High-Res DEM Footprint'}
        </span>
        <button class="btn-inspect-globe" data-id="${sc.id}" title="Focus camera on 3D Moon to view site">🎯 View on Moon</button>
      </div>
    </div>
    `;
  }

  private renderPlaceholder(): string {
    return `
    <div class="comparison-placeholder">
      <div class="placeholder-icon">⚖️</div>
      <h3>Ready for Side-by-Side Comparison</h3>
      <p>Configure your candidate sites and click <strong>Run Comparison Analysis</strong> above. The engine will calculate time-dependent solar illumination, potential Direct-to-Earth line of sight, slope distributions, and evaluate all engineering constraints using verified SPICE and LOLA DEM data.</p>
    </div>
    `;
  }

  private renderComparisonResults(): string {
    if (!this.comparisonResult) return '';
    const res = this.comparisonResult;

    return `
    <div class="results-dashboard-wrapper">
      <div class="dashboard-header-bar">
        <h3>Side-by-Side Comparison Dashboard</h3>
        <span class="badge-blue">${res.compared_count} Scenarios Evaluated</span>
      </div>

      <!-- Comparison Metrics Cards Table -->
      <div class="comparison-table-responsive">
        <table class="comparison-data-table">
          <thead>
            <tr>
              <th>Candidate Metric</th>
              ${res.scenarios.map((sc) => `<th>${sc.scenario_name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-header">📍 Selenographic Location</td>
              ${res.scenarios.map((sc) => `
                <td>
                  <strong>${formatSelenographicCoords(sc.inputs.latitude_deg, sc.inputs.longitude_deg)}</strong>
                  <br><button class="btn-mini-inspect" data-id="${sc.scenario_id}">🎯 Focus 3D Moon</button>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="row-header">⏱ Mission Interval</td>
              ${res.scenarios.map((sc) => `
                <td>
                  <span class="mono-sub">${sc.inputs.start_utc.split('T')[0]} → ${sc.inputs.end_utc.split('T')[0]}</span>
                  <br><span class="muted-text">(${sc.timeline_result.mission_scenario.total_duration_hours.toFixed(0)} hours)</span>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="row-header">🏔 Topographic DEM Coverage</td>
              ${res.scenarios.map((sc) => `
                <td>
                  <span class="status-badge ${sc.terrain_statistics.coverage_available ? 'badge-green' : 'badge-slate'}">
                    ${sc.terrain_statistics.coverage_available ? 'NASA LOLA Site 01 (5 m/px)' : 'Outside DEM (Sphere Only)'}
                  </span>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="row-header">☀️ Total Solar Illumination</td>
              ${res.scenarios.map((sc) => {
                const s = sc.timeline_result.summary.sunlight;
                const totPct = (s.full_sunlight_percent + s.partial_sunlight_percent).toFixed(1);
                const totHrs = (s.full_sunlight_hours + s.partial_sunlight_hours).toFixed(1);
                return `
                  <td>
                    <div class="metric-highlight">${totPct}% <span class="unit">(${totHrs} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${totPct}%; background: #f59e0b;"></div></div>
                    <span class="muted-text">Full: ${s.full_sunlight_percent}% · Partial: ${s.partial_sunlight_percent}%</span>
                  </td>
                `;
              }).join('')}
            </tr>
            <tr>
              <td class="row-header">🌑 Continuous Darkness Max</td>
              ${res.scenarios.map((sc) => {
                const s = sc.timeline_result.summary.sunlight;
                return `
                  <td>
                    <strong>${s.max_continuous_darkness_hours.toFixed(1)} hrs</strong>
                    <br><span class="muted-text">Transitions: ${s.transition_count}</span>
                  </td>
                `;
              }).join('')}
            </tr>
            <tr>
              <td class="row-header">📡 Direct-to-Earth LOS Clearance</td>
              ${res.scenarios.map((sc) => {
                const e = sc.timeline_result.summary.earth_los;
                const totPct = (e.full_disc_los_percent + e.partial_disc_los_percent).toFixed(1);
                const totHrs = (e.full_disc_los_hours + e.partial_disc_los_hours).toFixed(1);
                return `
                  <td>
                    <div class="metric-highlight">${totPct}% <span class="unit">(${totHrs} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${totPct}%; background: #38bdf8;"></div></div>
                    <span class="muted-text">Full disc: ${e.full_disc_los_percent}% · Max window: ${e.max_continuous_los_hours.toFixed(1)}h</span>
                  </td>
                `;
              }).join('')}
            </tr>
            <tr>
              <td class="row-header">📐 Terrain Slope Statistics</td>
              ${res.scenarios.map((sc) => {
                const slp = sc.terrain_statistics.slope;
                if (!slp) {
                  return `<td><span class="badge-slate">Unavailable (No DEM)</span><br><span class="muted-text">Site outside 16x16 km tile</span></td>`;
                }
                return `
                  <td>
                    <strong>${slp.mean_deg.toFixed(1)}° mean</strong> (max ${slp.max_deg.toFixed(1)}°)
                    <br><span class="muted-text">Std: ±${slp.std_deg.toFixed(1)}° · Center: ${slp.point_deg.toFixed(1)}°</span>
                  </td>
                `;
              }).join('')}
            </tr>
            <tr>
              <td class="row-header">🎯 Elevation &amp; Uncertainty</td>
              ${res.scenarios.map((sc) => {
                const elev = sc.terrain_statistics.elevation;
                const err = sc.terrain_statistics.uncertainty;
                if (!elev) {
                  return `<td>${sc.inputs.elevation_m.toFixed(1)} m <span class="muted-text">(User/Sphere)</span><br><span class="badge-slate">Uncertainty: Unavailable</span></td>`;
                }
                return `
                  <td>
                    <strong>${elev.mean_m.toFixed(1)} m</strong> <span class="muted-text">(range ${elev.min_m.toFixed(0)}..${elev.max_m.toFixed(0)}m)</span>
                    <br><span class="muted-text">Error: ±${err ? err.mean_m.toFixed(2) : '—'} m (LOLA)</span>
                  </td>
                `;
              }).join('')}
            </tr>
            <tr>
              <td class="row-header">📋 Constraint Satisfaction</td>
              ${res.scenarios.map((sc) => {
                const ce = sc.constraints_evaluation;
                const allMet = ce.all_met;
                return `
                  <td>
                    <span class="status-badge ${allMet ? 'badge-green' : ce.unmet_count > 0 ? 'badge-red' : 'badge-amber'}">
                      ${allMet ? '✓ ALL CONSTRAINTS MET' : `${ce.met_count} Met / ${ce.unmet_count} Unmet / ${ce.unevaluable_count} Unevaluable`}
                    </span>
                    <div class="constraint-mini-list">
                      ${ce.items.map((it) => `
                        <div class="constraint-mini-row ${it.status}">
                          <span class="mini-status">${it.status === 'met' ? '✓' : it.status === 'unmet' ? '✗' : '❓'}</span>
                          <span>${it.label}: <strong>${it.actual}</strong> (${it.threshold})</span>
                        </div>
                      `).join('')}
                    </div>
                  </td>
                `;
              }).join('')}
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Synchronized Multi-Scenario Timeline View -->
      <section class="synchronized-timelines-section">
        <div class="timeline-header-group">
          <h4>📊 Synchronized Mission Timelines &amp; Ephemeris Comparison</h4>
          <span class="timeline-sub">Compare hourly Sun and Earth elevation and terrain skylines across candidates</span>
        </div>
        <div class="timeline-canvas-container">
          <canvas id="synced-timeline-canvas" width="1000" height="260"></canvas>
        </div>
        <div class="timeline-legend">
          <span class="legend-item"><span class="legend-dot" style="background: #f59e0b;"></span> Solar Illumination Window</span>
          <span class="legend-item"><span class="legend-dot" style="background: #38bdf8;"></span> Earth LOS Window</span>
          <span class="legend-item"><span class="legend-dot" style="background: #64748b;"></span> Darkness / Occulted</span>
          <span class="legend-item"><span class="legend-dot" style="background: #9333ea;"></span> Unevaluable (Outside DEM)</span>
        </div>
      </section>

      <!-- Transparent Multi-Criteria Ranking & Scientific Integrity -->
      <section class="ranking-section">
        <div class="ranking-header">
          <h4>🏆 Transparent Multi-Criteria Evaluation</h4>
          <span class="ranking-weights-info">Normalized Weights: Sunlight (35%) · Earth LOS (25%) · Low Slope (20%) · Min Darkness (20%)</span>
        </div>

        <div class="ranking-grid">
          ${res.ranking.ranking.map((rk) => `
            <div class="ranking-card ${rk.rank === 1 ? 'leader' : ''}">
              <div class="rank-tag">RANK ${rk.rank}</div>
              <h5 class="rank-name">${rk.scenario_name}</h5>
              <div class="rank-score-val">${rk.composite_score.toFixed(1)} <span class="score-max">/ 100</span></div>

              ${rk.has_unevaluable_metrics ? `
                <div class="unevaluable-warning-box">
                  ⚠️ Contains unevaluable metrics:
                  <ul>
                    ${rk.unevaluable_reasons.map((r) => `<li>${r}</li>`).join('')}
                  </ul>
                </div>
              ` : `
                <div class="eval-success-note">✓ All criteria evaluated against 5m DEM &amp; SPICE ephemerides</div>
              `}

              <div class="criteria-score-breakdown">
                ${Object.entries(rk.criteria_scores).map(([crit, val]) => `
                  <div class="crit-row">
                    <span>${crit.replace(/_/g, ' ')}:</span>
                    <span>${val !== null ? `${val.toFixed(1)} pts` : '<span class="badge-slate">N/A</span>'}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="scientific-integrity-banner">
          <div class="integrity-title">🛡️ Scientific Integrity &amp; Operational Caveat</div>
          <p>${res.ranking.disclaimer}</p>
        </div>
      </section>
    </div>
    `;
  }

  private drawSynchronizedTimelines() {
    const canvas = document.getElementById('synced-timeline-canvas') as HTMLCanvasElement;
    if (!canvas || !this.comparisonResult) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const scenarios = this.comparisonResult.scenarios;
    if (scenarios.length === 0) return;

    const laneHeight = Math.floor((height - 40) / scenarios.length);

    // Draw time grid headers
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('MISSION TIMELINE EPOCHS', 15, 18);

    scenarios.forEach((sc, idx) => {
      const y = 30 + idx * laneHeight;
      const h = laneHeight - 12;

      // Label
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`${sc.scenario_name}`, 15, y - 4);

      // Background lane
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fillRect(15, y, width - 30, h);

      // Draw sun windows
      const sunWindows = sc.timeline_result.sun_windows;
      const startMs = Date.parse(sc.inputs.start_utc);
      const endMs = Date.parse(sc.inputs.end_utc);
      const totalSpanMs = endMs - startMs;

      if (totalSpanMs > 0) {
        sunWindows.forEach((w) => {
          const wStartMs = Date.parse(w.start_utc);
          const wEndMs = Date.parse(w.end_utc);
          const x0 = 15 + ((wStartMs - startMs) / totalSpanMs) * (width - 30);
          const x1 = 15 + ((wEndMs - startMs) / totalSpanMs) * (width - 30);
          const barW = Math.max(1, x1 - x0);

          if (w.state === 'full_sunlight') {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
          } else if (w.state === 'partial_sunlight') {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.5)';
          } else if (w.state === 'total_darkness') {
            ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
          } else {
            ctx.fillStyle = 'rgba(147, 51, 234, 0.6)';
          }
          ctx.fillRect(x0, y, barW, h / 2 - 1);
        });

        // Draw Earth windows (bottom half of lane)
        const earthWindows = sc.timeline_result.earth_windows;
        earthWindows.forEach((w) => {
          const wStartMs = Date.parse(w.start_utc);
          const wEndMs = Date.parse(w.end_utc);
          const x0 = 15 + ((wStartMs - startMs) / totalSpanMs) * (width - 30);
          const x1 = 15 + ((wEndMs - startMs) / totalSpanMs) * (width - 30);
          const barW = Math.max(1, x1 - x0);

          if (w.state === 'full_disc_los') {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
          } else if (w.state === 'centre_only_los' || w.state === 'partial_disc_los') {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
          } else if (w.state === 'occulted') {
            ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
          } else {
            ctx.fillStyle = 'rgba(147, 51, 234, 0.6)';
          }
          ctx.fillRect(x0, y + h / 2 + 1, barW, h / 2 - 2);
        });
      }

      // Lane separator
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.strokeRect(15, y, width - 30, h);
    });
  }

  private wireEvents() {
    // Close button
    document.getElementById('btn-close-comparison')?.addEventListener('click', () => {
      this.close();
    });

    // Add candidate button
    document.getElementById('btn-add-candidate')?.addEventListener('click', () => {
      this.addScenario();
    });

    // Sync dates button
    document.getElementById('btn-sync-dates')?.addEventListener('click', () => {
      if (this.scenarios.length >= 2) {
        const s1 = this.scenarios[0];
        for (let i = 1; i < this.scenarios.length; i++) {
          this.scenarios[i].startDate = s1.startDate;
          this.scenarios[i].startTime = s1.startTime;
          this.scenarios[i].endDate = s1.endDate;
          this.scenarios[i].endTime = s1.endTime;
        }
        this.render();
      }
    });

    // Run comparison button
    document.getElementById('btn-run-comparison')?.addEventListener('click', () => {
      this.runComparison();
    });

    // Remove buttons
    this.container.querySelectorAll('.btn-remove-scenario').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) this.removeScenario(id);
      });
    });

    // Preset dropdowns
    this.container.querySelectorAll('.select-preset').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const target = e.currentTarget as HTMLSelectElement;
        const id = target.getAttribute('data-id');
        const pId = target.value;
        const preset = MISSION_PRESETS.find((p) => p.id === pId);
        if (id && preset) {
          const sc = this.scenarios.find((s) => s.id === id);
          if (sc) {
            sc.name = preset.name;
            sc.latitudeDeg = preset.lat;
            sc.longitudeDeg = preset.lon;
            sc.elevationM = preset.elev;
            this.render();
          }
        }
      });
    });

    // Coords & date inputs sync
    this.container.querySelectorAll('.input-sc-name').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.name = t.value;
      });
    });
    this.container.querySelectorAll('.input-lat').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.latitudeDeg = parseFloat(t.value) || -90.0;
      });
    });
    this.container.querySelectorAll('.input-lon').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.longitudeDeg = parseFloat(t.value) || 0.0;
      });
    });
    this.container.querySelectorAll('.input-elev').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.elevationM = parseFloat(t.value) || 0.0;
      });
    });
    this.container.querySelectorAll('.input-start-date').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.startDate = t.value;
      });
    });
    this.container.querySelectorAll('.input-end-date').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const t = e.currentTarget as HTMLInputElement;
        const sc = this.scenarios.find((s) => s.id === t.getAttribute('data-id'));
        if (sc) sc.endDate = t.value;
      });
    });

    // Constraints inputs
    document.getElementById('constraint-min-sun')?.addEventListener('change', (e) => {
      const val = (e.currentTarget as HTMLInputElement).value;
      this.constraints.min_sunlight_percent = val !== '' ? parseFloat(val) : null;
    });
    document.getElementById('constraint-min-earth')?.addEventListener('change', (e) => {
      const val = (e.currentTarget as HTMLInputElement).value;
      this.constraints.min_earth_los_percent = val !== '' ? parseFloat(val) : null;
    });
    document.getElementById('constraint-max-slope')?.addEventListener('change', (e) => {
      const val = (e.currentTarget as HTMLInputElement).value;
      this.constraints.max_slope_deg = val !== '' ? parseFloat(val) : null;
    });
    document.getElementById('constraint-max-dark')?.addEventListener('change', (e) => {
      const val = (e.currentTarget as HTMLInputElement).value;
      this.constraints.max_continuous_darkness_hours = val !== '' ? parseFloat(val) : null;
    });

    // Globe inspection buttons
    this.container.querySelectorAll('.btn-inspect-globe, .btn-mini-inspect').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const sc = this.scenarios.find((s) => s.id === id);
        if (sc && this.onInspectSiteOnGlobe) {
          this.onInspectSiteOnGlobe({
            name: sc.name,
            lat: sc.latitudeDeg,
            lon: sc.longitudeDeg,
            elevationM: sc.elevationM,
          });
        }
      });
    });
  }
}
