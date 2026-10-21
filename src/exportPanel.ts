/**
 * exportPanel.ts — LUNAOPS Scientific Report Export & Reproducibility Workspace.
 *
 * Implements Phase 6: Scientific Report Export & Reproducibility
 *  - Formats: PDF (ReportLab multi-page publication-ready report), CSV (numerical time-series / comparison matrix),
 *             JSON (reproducibility manifest with provenance, coordinate frames, software/kernel versions).
 *  - Supports both Single-Mission Analysis and Candidate-Site Comparison exports.
 *  - Strictly distinguishes calculated, user-specified, and unevaluable/missing metrics.
 *  - Provides direct one-click downloading with live progress spinners and scientific caveat disclosures.
 */

import { SPICE_API_BASE } from './spiceClient';

export interface MissionExportContext {
  scenarioName: string;
  notes?: string;
  siteName: string;
  latitudeDeg: number;
  longitudeDeg: number;
  elevationM: number;
  instrumentHeightM: number;
  startUtc: string;
  endUtc: string;
  stepMinutes: number;
  timelineResponse?: any;
  horizonProfile?: any;
}

export interface ComparisonScenarioItem {
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

export interface ComparisonExportContext {
  reportTitle?: string;
  scenarios: ComparisonScenarioItem[];
  constraints?: any;
  rankingWeights?: Record<string, number>;
  comparisonResult?: any;
}

type ExportMode = 'mission' | 'comparison';
type ExportFormat = 'pdf' | 'csv' | 'json';

export class ExportPanel {
  private container: HTMLElement;
  private isOpen = false;
  private mode: ExportMode = 'mission';
  private missionContext: MissionExportContext | null = null;
  private comparisonContext: ComparisonExportContext | null = null;

  private selectedFormat: ExportFormat = 'pdf';
  private isGenerating = false;
  private statusMessage: { type: 'info' | 'success' | 'error'; text: string } | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'export-panel-modal';
    this.container.className = 'mission-modal hidden';
    document.body.appendChild(this.container);
  }

  public openForMission(ctx: MissionExportContext, initialFormat?: ExportFormat) {
    if (initialFormat) this.selectedFormat = initialFormat;
    this.mode = 'mission';
    this.missionContext = ctx;
    this.comparisonContext = null;
    this.statusMessage = null;
    this.isOpen = true;
    this.container.classList.remove('hidden');
    this.render();
  }

  public openForComparison(ctx: ComparisonExportContext, initialFormat?: ExportFormat) {
    if (initialFormat) this.selectedFormat = initialFormat;
    this.mode = 'comparison';
    this.comparisonContext = ctx;
    this.missionContext = null;
    this.statusMessage = null;
    this.isOpen = true;
    this.container.classList.remove('hidden');
    this.render();
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  public toggle(mode: ExportMode = 'mission') {
    if (this.isOpen) {
      this.close();
    } else {
      if (mode === 'comparison' && this.comparisonContext) {
        this.openForComparison(this.comparisonContext);
      } else if (this.missionContext) {
        this.openForMission(this.missionContext);
      }
    }
  }

  private render() {
    const isMission = this.mode === 'mission';
    const title = isMission
      ? 'Export Mission Scenario Analysis'
      : 'Export Candidate-Site Comparison';

    const subtitle = isMission
      ? `${this.missionContext?.scenarioName ?? 'Mission'} · ${this.missionContext?.siteName ?? 'Selected Site'} (${this.missionContext?.latitudeDeg?.toFixed(3)}°N, ${this.missionContext?.longitudeDeg?.toFixed(3)}°E)`
      : `${this.comparisonContext?.reportTitle ?? 'Candidate Comparison'} · ${this.comparisonContext?.scenarios.length ?? 0} Scenarios`;

    this.container.innerHTML = `
    <div class="mission-modal-backdrop" id="export-backdrop"></div>
    <div class="mission-modal-dialog export-dialog">
      <!-- Header -->
      <div class="mission-modal-header export-dialog-header">
        <div class="mission-header-info">
          <div class="export-kicker">LUNAOPS SCIENTIFIC REPRODUCIBILITY &amp; DATA EXPORT</div>
          <h2>📤 ${title}</h2>
          <p class="export-subtitle">${subtitle}</p>
        </div>
        <div class="mission-header-controls">
          <button id="btn-close-export" class="modal-close-btn" title="Close Export Panel">✕</button>
        </div>
      </div>

      <!-- Body -->
      <div class="mission-body export-dialog-body">
        <!-- Scientific Disclaimer / Scope Notice -->
        <div class="export-disclaimer-bar">
          <span class="disclaimer-icon">⚠️</span>
          <div>
            <strong>Scientific Context &amp; Limitations:</strong>
            All ephemerides are calculated via NASA SPICE DE440s ephemerides in the <code>MOON_ME</code> reference frame.
            Terrain horizons and surface metrics use NASA LRO/LOLA DEM data where covered.
            Results are for pre-decisional planning and comparative research only; they do <em>not</em> constitute a landing-safety or operational certification.
          </div>
        </div>

        <!-- Format Selection Grid -->
        <div class="export-section-title">SELECT EXPORT ARTIFACT FORMAT</div>
        <div class="export-format-grid">
          <!-- PDF Card -->
          <div class="export-format-card ${this.selectedFormat === 'pdf' ? 'selected' : ''}" data-format="pdf" id="card-fmt-pdf">
            <div class="export-fmt-icon">📄</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Scientific Report (PDF)</span>
                <span class="export-tag tag-pdf">Publication Ready</span>
              </div>
              <p class="export-fmt-desc">
                ${isMission
                  ? 'Multi-page document containing executive metrics, reference frame definitions, illumination & visibility intervals, solar elevation chart, terrain slope profile, and SPICE provenance.'
                  : 'Comprehensive comparative report with side-by-side metric tables, multi-criteria ranking results, constraint fulfillment breakdown, and synchronized visibility timelines.'}
              </p>
              <div class="export-fmt-meta">Engine: ReportLab v4 · Vector tables &amp; charts · Paged layout</div>
            </div>
          </div>

          <!-- CSV Card -->
          <div class="export-format-card ${this.selectedFormat === 'csv' ? 'selected' : ''}" data-format="csv" id="card-fmt-csv">
            <div class="export-fmt-icon">📊</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Numerical Time-Series (CSV)</span>
                <span class="export-tag tag-csv">Explicit Units</span>
              </div>
              <p class="export-fmt-desc">
                ${isMission
                  ? 'Standardized columnar time-series with explicit units in headers: utc_iso, sun_elevation_deg, sun_azimuth_deg, sun_visibility, earth_elevation_deg, earth_azimuth_deg, direct_to_earth_visibility.'
                  : 'Comparison summary matrix with scenario parameters, illumination percentages, Earth LOS durations, max continuous darkness, slope statistics, and MCDA scores.'}
              </p>
              <div class="export-fmt-meta">Format: UTF-8 RFC 4180 CSV · Scientific notation compatible</div>
            </div>
          </div>

          <!-- JSON Card -->
          <div class="export-format-card ${this.selectedFormat === 'json' ? 'selected' : ''}" data-format="json" id="card-fmt-json">
            <div class="export-fmt-icon">💾</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Reproducibility Manifest (JSON)</span>
                <span class="export-tag tag-json">Machine-Readable</span>
              </div>
              <p class="export-fmt-desc">
                Full scientific provenance schema: scenario parameters, reference frame definitions (MOON_ME), SPICE kernel filenames &amp; SHA-256 digests, calculation sampling, precomputed outputs, and validation coverage status.
              </p>
              <div class="export-fmt-meta">Standard: LUNAOPS Manifest Schema v1.0 · Strict typing</div>
            </div>
          </div>
        </div>

        <!-- Contents Checklist -->
        <div class="export-contents-section">
          <div class="export-section-title">INCLUDED IN THIS EXPORT</div>
          <div class="export-contents-list">
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Scenario Coordinates:</strong> Latitude, longitude, reference sphere elevation, instrument height (MOON_ME frame).</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>SPICE Ephemeris:</strong> DE440s solar &amp; terrestrial vectors, apparent angular radii, topocentric elevation &amp; azimuth.</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Terrain &amp; Obstruction:</strong> NASA LOLA 5m/px DEM horizon evaluation (or explicit DEM outside-coverage notice).</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Provenance &amp; Validation:</strong> Kernel catalog, calculation timestamps, methodology notes, and constraint configurations.</span>
            </div>
          </div>
        </div>

        <!-- Feedback & Status Notification -->
        ${this.renderStatus()}
      </div>

      <!-- Footer -->
      <div class="mission-footer export-dialog-footer">
        <div class="export-footer-left">
          <span class="active-fmt-indicator">Selected: <strong>${this.selectedFormat.toUpperCase()}</strong></span>
        </div>
        <div class="export-footer-actions">
          <button id="btn-cancel-export" class="btn-secondary" ${this.isGenerating ? 'disabled' : ''}>Cancel</button>
          <button id="btn-generate-export" class="btn-primary btn-highlight-compare ${this.isGenerating ? 'loading' : ''}" ${this.isGenerating ? 'disabled' : ''}>
            ${this.isGenerating ? '⏳ Generating Artifact...' : `📥 Download ${this.selectedFormat.toUpperCase()} Export`}
          </button>
        </div>
      </div>
    </div>
    `;

    this.wireEvents();
  }

  private renderStatus(): string {
    if (this.isGenerating) {
      return `
      <div class="export-status-bar status-info">
        <span class="spinner">⏳</span>
        <span>Evaluating SPICE kernels and assembling ${this.selectedFormat.toUpperCase()} artifact... please wait.</span>
      </div>`;
    }
    if (this.statusMessage) {
      const cls = this.statusMessage.type === 'error' ? 'status-error' : 'status-success';
      const icon = this.statusMessage.type === 'error' ? '❌' : '✅';
      return `
      <div class="export-status-bar ${cls}">
        <span>${icon}</span>
        <span>${this.statusMessage.text}</span>
      </div>`;
    }
    return '';
  }

  private wireEvents() {
    // Backdrop & Close
    this.container.querySelector('#btn-close-export')?.addEventListener('click', () => this.close());
    this.container.querySelector('#btn-cancel-export')?.addEventListener('click', () => this.close());
    this.container.querySelector('#export-backdrop')?.addEventListener('click', () => {
      if (!this.isGenerating) this.close();
    });

    // Format selection cards
    const cards = this.container.querySelectorAll('.export-format-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (this.isGenerating) return;
        const fmt = (card.getAttribute('data-format') as ExportFormat) || 'pdf';
        this.selectedFormat = fmt;
        this.render();
      });
    });

    // Generate Button
    this.container.querySelector('#btn-generate-export')?.addEventListener('click', () => {
      this.executeExport();
    });
  }

  private async executeExport() {
    if (this.isGenerating) return;
    this.isGenerating = true;
    this.statusMessage = null;
    this.render();

    try {
      if (this.mode === 'mission') {
        await this.exportMission();
      } else {
        await this.exportComparison();
      }
      this.statusMessage = {
        type: 'success',
        text: `Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`,
      };
    } catch (err: any) {
      console.error('[LUNAOPS] Export failed:', err);
      this.statusMessage = {
        type: 'error',
        text: err.message || 'Export request failed. Ensure backend SPICE service is running.',
      };
    } finally {
      this.isGenerating = false;
      this.render();
    }
  }

  private async exportMission() {
    if (!this.missionContext) throw new Error('Missing mission scenario context.');
    const ctx = this.missionContext;

    const payload = {
      scenario_name: ctx.scenarioName || 'Artemis Candidate Mission',
      notes: ctx.notes || '',
      site_name: ctx.siteName || 'South Pole Site',
      latitude_deg: ctx.latitudeDeg,
      longitude_deg: ctx.longitudeDeg,
      elevation_m: ctx.elevationM,
      instrument_height_m: ctx.instrumentHeightM,
      start_utc: ctx.startUtc,
      end_utc: ctx.endUtc,
      step_minutes: ctx.stepMinutes,
      timeline_result: ctx.timelineResponse || null,
      horizon_result: ctx.horizonProfile || null,
    };

    const url = `${SPICE_API_BASE}/api/export/mission?format=${this.selectedFormat}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      let errText = `HTTP ${resp.status}`;
      try {
        const json = await resp.json();
        errText = json.detail?.message || JSON.stringify(json.detail || json);
      } catch {
        errText = await resp.text();
      }
      throw new Error(`Export failed: ${errText}`);
    }

    const safeName = (ctx.siteName || 'site').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    if (this.selectedFormat === 'pdf') {
      const blob = await resp.blob();
      this.triggerDownload(blob, `lunaops_${safeName}_report_${timestamp}.pdf`);
    } else if (this.selectedFormat === 'csv') {
      const text = await resp.text();
      const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
      this.triggerDownload(blob, `lunaops_${safeName}_timeseries_${timestamp}.csv`);
    } else {
      const json = await resp.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      this.triggerDownload(blob, `lunaops_${safeName}_manifest_${timestamp}.json`);
    }
  }

  private async exportComparison() {
    if (!this.comparisonContext) throw new Error('Missing comparison context.');
    const ctx = this.comparisonContext;

    if (!ctx.scenarios || ctx.scenarios.length < 2) {
      throw new Error('At least two candidate scenarios are required to export comparison.');
    }

    // Map scenarios to backend format
    const scenariosPayload = ctx.scenarios.map((sc) => {
      // Ensure ISO-8601 UTC
      let start_utc = `${sc.startDate}T${sc.startTime}`;
      if (!start_utc.endsWith('Z')) start_utc += 'Z';
      let end_utc = `${sc.endDate}T${sc.endTime}`;
      if (!end_utc.endsWith('Z')) end_utc += 'Z';

      return {
        id: sc.id,
        name: sc.name,
        latitude_deg: sc.latitudeDeg,
        longitude_deg: sc.longitudeDeg,
        elevation_m: sc.elevationM,
        instrument_height_m: sc.instrumentHeightM,
        start_utc,
        end_utc,
        step_minutes: sc.stepMinutes,
      };
    });

    const payload = {
      report_title: ctx.reportTitle || 'LUNAOPS Candidate-Site Comparison Analysis',
      scenarios: scenariosPayload,
      constraints: ctx.constraints || null,
      ranking_weights: ctx.rankingWeights || null,
      comparison_result: ctx.comparisonResult || null,
    };

    const url = `${SPICE_API_BASE}/api/export/comparison?format=${this.selectedFormat}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      let errText = `HTTP ${resp.status}`;
      try {
        const json = await resp.json();
        errText = json.detail?.message || JSON.stringify(json.detail || json);
      } catch {
        errText = await resp.text();
      }
      throw new Error(`Comparison export failed: ${errText}`);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    if (this.selectedFormat === 'pdf') {
      const blob = await resp.blob();
      this.triggerDownload(blob, `lunaops_comparison_report_${timestamp}.pdf`);
    } else if (this.selectedFormat === 'csv') {
      const text = await resp.text();
      const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
      this.triggerDownload(blob, `lunaops_comparison_matrix_${timestamp}.csv`);
    } else {
      const json = await resp.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      this.triggerDownload(blob, `lunaops_comparison_manifest_${timestamp}.json`);
    }
  }

  private triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
