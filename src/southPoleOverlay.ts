/**
 * southPoleOverlay.ts — LUNAOPS Precision Lunar South Pole Overlay
 *
 * Aerospace HUD-grade 3D markers — inspired by premium mission planning interfaces.
 *
 * Visual identity — ZERO overlap, every marker is visually distinct:
 *   TRUE SOUTH POLE  → cyan circle + fine crosshair arms, solid center dot
 *   SITE 01 (primary)→ amber filled diamond + corner L-brackets + tall beacon stem
 *   SECONDARY SITES  → per-hue single ring + tiny center dot + short stem
 *   POLAR GRID       → three latitude parallels (80°/85°/88°S) + 4 meridian axes
 *   DEM FOOTPRINT    → thin cyan dashed-rectangle around Site-01 high-res DEM area
 *
 * Sizing calibrated for south-pole camera zoom ~2.65 scene units.
 * No constant pulsing noise — only the SELECTED element scales up slightly.
 */

import * as THREE from 'three';
import {
  selenographicToMoonVector,
  polarStereoToSelenographic,
  SITE01_BOUNDS,
} from './utils/coordinates';

export interface SiteInfo {
  id: string;
  name: string;
  designation: string;
  lat: number;
  lon: number;
  elevationM: number;
  description: string;
  isInsideSite01DEM?: boolean;
  terrainResolution: string;
  coverageType: string;
  isGeodeticDatum?: boolean;
  markerObject?: THREE.Object3D;
}

export const SOUTH_POLE_SITES: SiteInfo[] = [
  {
    id: 'site-01',
    name: 'Artemis Site 01',
    designation: 'Shackleton–de Gerlache Connecting Ridge',
    lat: -89.463,
    lon: 222.51,
    elevationM: 1100,
    description:
      'High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.',
    isInsideSite01DEM: true,
    terrainResolution: '5 m/px DEM (NASA LOLA Site 01)',
    coverageType: 'High-Resolution Regional DEM',
  },
  {
    id: 'south-pole',
    name: 'Lunar South Pole',
    designation: "Geographic 90°00'00\" S Pole",
    lat: -90.0,
    lon: 0.0,
    elevationM: -250,
    description: 'Intersection of all lunar meridians. Geodetic reference benchmark.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
    isGeodeticDatum: true,
  },
  {
    id: 'shackleton-rim',
    name: 'Shackleton Rim',
    designation: 'Artemis Candidate Site 04',
    lat: -89.78,
    lon: 128.0,
    elevationM: 1450,
    description:
      'Elevated crater rim bordering PSR with high water-ice deposition probability.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'malapert',
    name: 'Malapert Massif',
    designation: 'Malapert Peak Massif (Artemis Candidate)',
    lat: -86.04,
    lon: 2.7,
    elevationM: 5000,
    description:
      'Prominent 5 km massif providing extended solar visibility and DTE comms.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'haworth-rim',
    name: 'Haworth Rim',
    designation: 'Haworth Crater Artemis Candidate',
    lat: -87.4,
    lon: 355.0,
    elevationM: 1200,
    description: 'Rim region flanking deep cold traps with volatile concentrations.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'de-gerlache-rim',
    name: 'de Gerlache Rim',
    designation: 'de Gerlache Rim Artemis Candidate',
    lat: -88.5,
    lon: 271.0,
    elevationM: 1600,
    description: 'Crater rim offering favorable sun geometry and line-of-sight to Site 01.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'nobile-rim-1',
    name: 'Nobile Rim',
    designation: 'VIPER / Artemis Candidate',
    lat: -85.2,
    lon: 35.8,
    elevationM: 3200,
    description:
      'Highland plateau surveyed for robotic and crewed polar surface mobility.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
];

// ── Global scale multiplier — tune here if camera zoom changes
const S = 1.0;

// ── Color palette — clearly distinct per role
const C = {
  POLE_RING:    0x22d3ee,  // bright cyan — geodetic datum ring
  POLE_CROSS:   0x67e8f9,  // lighter cyan for crosshair arms
  POLE_DOT:     0xffffff,  // white center pinpoint
  SITE01_MAIN:  0xf59e0b,  // amber — primary mission site
  SITE01_DIM:   0xd97706,  // darker amber when unselected
  GRID_PRIME:   0x3b82f6,  // blue-500 prime meridian
  GRID_SEC:     0x1e3a5f,  // dark navy secondary meridians
  DEM_BOX:      0x38bdf8,  // sky-blue DEM footprint
  // secondary site hues
  SEC: {
    'shackleton-rim':   0x38bdf8,  // cyan
    'malapert':         0x34d399,  // emerald
    'haworth-rim':      0xa78bfa,  // violet
    'de-gerlache-rim':  0x60a5fa,  // blue
    'nobile-rim-1':     0xf472b6,  // pink
  } as Record<string, number>,
};

export class SouthPoleOverlay {
  public group: THREE.Group;

  private interactiveMarkers: THREE.Object3D[] = [];
  private siteMarkerGroups: Map<string, THREE.Group> = new Map();
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private onSelectSiteCallback?: (site: SiteInfo) => void;
  private disposables: Array<{ dispose: () => void }> = [];

  constructor(moonRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'SouthPoleOverlay';

    this._buildPolarGrid(moonRadius);
    this._buildDEMFootprint(moonRadius);
    this._buildSouthPoleMarker(moonRadius);
    this._buildCandidateSites(moonRadius);
  }

  public setOnSelectSite(cb: (site: SiteInfo) => void): void {
    this.onSelectSiteCallback = cb;
  }

  public getInteractiveObjects(): THREE.Object3D[] {
    return this.interactiveMarkers;
  }

  // ── Highlight selected site — brighten it, dim others ─────────
  public highlightSite(siteId: string | null): void {
    this.siteMarkerGroups.forEach((grp, id) => {
      const selected = id === siteId;

      // Every marker has a 'Ring' child — scale it on selection
      const ring = grp.getObjectByName('Ring') as THREE.Mesh | THREE.Line | undefined;
      if (ring) {
        ring.scale.setScalar(selected ? 1.25 : 1.0);
        const m = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
        if (m && 'opacity' in m) m.opacity = selected ? 1.0 : _baseOpacity(id);
      }

      // Dim/brighten all named sub-elements
      ['Dot', 'Cx0', 'Cx1', 'Cx2', 'Cx3', 'Bk0', 'Bk1', 'Bk2', 'Bk3', 'Stem', 'Cap'].forEach(n => {
        const el = grp.getObjectByName(n) as THREE.Mesh | THREE.Line | undefined;
        if (!el) return;
        const m = (el as THREE.Mesh).material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
        if (m && 'opacity' in m) m.opacity = selected ? 1.0 : _baseOpacity(id, n);
      });
    });
  }

  // ── Polar Reference Grid ────────────────────────────────────────
  private _buildPolarGrid(r: number): void {
    const grp = new THREE.Group();
    grp.name = 'PolarGrid';
    const rr = r * 1.0012;

    // Latitude parallels at 80°, 85°, 88°S
    ([
      [-80, 0x1e40af, 0.35, 240],
      [-85, 0x1d4ed8, 0.28, 180],
      [-88, 0x1e3a5f, 0.20, 120],
    ] as [number, number, number, number][]).forEach(([lat, col, op, seg]) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= seg; i++) pts.push(selenographicToMoonVector(lat, (i / seg) * 360, rr));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op, blending: THREE.AdditiveBlending });
      grp.add(new THREE.Line(geo, mat));
      this.disposables.push(geo, mat);
    });

    // 4 meridian axes (0°, 90°, 180°, 270°)
    ([
      [0,   C.GRID_PRIME, 0.45],
      [90,  C.GRID_SEC,   0.20],
      [180, C.GRID_SEC,   0.20],
      [270, C.GRID_SEC,   0.20],
    ] as [number, number, number][]).forEach(([lon, col, op]) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 36; i++) pts.push(selenographicToMoonVector(-80 - 10 * (i / 36), lon, rr));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op, blending: THREE.AdditiveBlending });
      grp.add(new THREE.Line(geo, mat));
      this.disposables.push(geo, mat);
    });

    this.group.add(grp);
  }

  // ── Site 01 DEM boundary box ────────────────────────────────────
  private _buildDEMFootprint(r: number): void {
    const { minX, maxX, minY, maxY } = SITE01_BOUNDS;
    const rr = r * 1.002;
    const steps = 16;
    const edgePts: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) edgePts.push({ x: minX + (maxX - minX) * (i / steps), y: maxY });
    for (let i = 0; i <= steps; i++) edgePts.push({ x: maxX, y: maxY + (minY - maxY) * (i / steps) });
    for (let i = 0; i <= steps; i++) edgePts.push({ x: maxX + (minX - maxX) * (i / steps), y: minY });
    for (let i = 0; i <= steps; i++) edgePts.push({ x: minX, y: minY + (maxY - minY) * (i / steps) });

    const vPts = edgePts.map(pt => {
      const { lonDeg, latDeg } = polarStereoToSelenographic(pt.x, pt.y);
      return selenographicToMoonVector(latDeg, lonDeg, rr);
    });
    const geo = new THREE.BufferGeometry().setFromPoints(vPts);
    const mat = new THREE.LineBasicMaterial({ color: C.DEM_BOX, transparent: true, opacity: 0.45 });
    this.group.add(new THREE.Line(geo, mat));
    this.disposables.push(geo, mat);
  }

  // ── True South Pole: cyan circle + fine crosshairs ─────────────
  //   DISTINCT from Site 01 — different shape, different color family
  private _buildSouthPoleMarker(moonRadius: number): void {
    const grp = new THREE.Group();
    grp.name = 'TrueSouthPoleMarker';
    // Place directly at the geographic south pole
    grp.position.set(0, -moonRadius * 1.0025, 0);

    const rR = 0.013 * S;  // ring radius

    // ── Primary circle ring (not a diamond — clearly different from Site 01)
    const ringGeo = new THREE.RingGeometry(rR, rR * 1.30, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: C.POLE_RING,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.name = 'Ring';
    grp.add(ring);
    this.disposables.push(ringGeo, ringMat);

    // ── Outer accent ring (thinner, slightly larger)
    const outerGeo = new THREE.RingGeometry(rR * 1.80, rR * 1.95, 64);
    outerGeo.rotateX(Math.PI / 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: C.POLE_RING,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending,
    });
    grp.add(new THREE.Mesh(outerGeo, outerMat));
    this.disposables.push(outerGeo, outerMat);

    // ── 4 crosshair arms (gap at center, extending beyond outer ring)
    const cGap = rR * 0.45, cEnd = rR * 2.60;
    ([[-1,0],[1,0],[0,-1],[0,1]] as [number,number][]).forEach(([dx, dz], i) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(dx * cGap, 0, dz * cGap),
        new THREE.Vector3(dx * cEnd,  0, dz * cEnd),
      ]);
      const mat = new THREE.LineBasicMaterial({ color: C.POLE_CROSS, transparent: true, opacity: 0.75 });
      const l = new THREE.Line(geo, mat);
      l.name = `Cx${i}`;
      grp.add(l);
      this.disposables.push(geo, mat);
    });

    // ── Bright center pinpoint
    const dotGeo = new THREE.SphereGeometry(0.0030 * S, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: C.POLE_DOT, transparent: true, opacity: 1.0 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.name = 'Dot';
    grp.add(dot);
    this.disposables.push(dotGeo, dotMat);

    // ── Invisible hitbox for raycasting
    const hitGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hit = new THREE.Mesh(hitGeo, hitMat);
    hit.userData = { site: SOUTH_POLE_SITES.find(s => s.id === 'south-pole') };
    grp.add(hit);
    this.interactiveMarkers.push(hit);
    this.disposables.push(hitGeo, hitMat);

    this.siteMarkerGroups.set('south-pole', grp);
    this.group.add(grp);
  }

  // ── Candidate Landing Sites ─────────────────────────────────────
  private _buildCandidateSites(moonRadius: number): void {
    SOUTH_POLE_SITES.forEach(site => {
      if (site.id === 'south-pole') return;

      const isPrimary = site.id === 'site-01';
      const color = isPrimary ? C.SITE01_MAIN : (C.SEC[site.id] ?? 0x94a3b8);

      const grp = new THREE.Group();
      grp.name = `SiteMarker_${site.id}`;

      const pos    = selenographicToMoonVector(site.lat, site.lon, moonRadius * 1.0025);
      const normal = pos.clone().normalize();
      grp.position.copy(pos);
      grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      if (isPrimary) {
        this._buildPrimaryMarker(grp, color);
      } else {
        this._buildSecondaryMarker(grp, color);
      }

      // ── Hitbox sphere (invisible, calibrated for easy clicking)
      const hitGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.y = 0.02;
      hit.userData = { site };
      grp.add(hit);
      this.interactiveMarkers.push(hit);
      this.disposables.push(hitGeo, hitMat);

      this.siteMarkerGroups.set(site.id, grp);
      this.group.add(grp);
    });
  }

  /**
   * Site 01 — amber DIAMOND (rotated 45°) + 4 corner L-brackets + tall beacon stem.
   * Intentionally different from the True South Pole circle marker.
   */
  private _buildPrimaryMarker(g: THREE.Group, color: number): void {
    const rD = 0.018 * S;  // diamond "radius" (tip-to-center)

    // ── Diamond outline (rotated 45° square)
    const diamondPts = [
      new THREE.Vector3(0,    0, -rD),   // top
      new THREE.Vector3(rD,   0,   0),   // right
      new THREE.Vector3(0,    0,  rD),   // bottom
      new THREE.Vector3(-rD,  0,   0),   // left
      new THREE.Vector3(0,    0, -rD),   // close
    ];
    const dGeo = new THREE.BufferGeometry().setFromPoints(diamondPts);
    const dMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    const diamond = new THREE.Line(dGeo, dMat);
    diamond.name = 'Ring';
    g.add(diamond);
    this.disposables.push(dGeo, dMat);

    // ── Filled center diamond (thicker visual weight)
    const fillPts = [
      new THREE.Vector3(0,    0, -rD * 0.55),
      new THREE.Vector3(rD  * 0.55, 0, 0),
      new THREE.Vector3(0,    0,  rD * 0.55),
      new THREE.Vector3(-rD * 0.55, 0, 0),
      new THREE.Vector3(0,    0, -rD * 0.55),
    ];
    const fGeo = new THREE.BufferGeometry().setFromPoints(fillPts);
    const fMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
    g.add(new THREE.Line(fGeo, fMat));
    this.disposables.push(fGeo, fMat);

    // ── 4 corner L-brackets (outside the diamond, at axis tips ×1.9)
    const bOff = rD * 1.90;  // offset of bracket corner
    const bArm = rD * 0.55;  // arm length of each L
    // brackets at ±X and ±Z tips (axis-aligned, matching diamond axes)
    ([
      [0, -bOff,  bArm],   // top bracket
      [0,  bOff,  bArm],   // bottom
      [-bOff, 0,  bArm],   // left
      [ bOff, 0,  bArm],   // right
    ] as const).forEach((_bracket, i) => {
      // Each L-bracket: two arms meeting at the corner
      const pts: THREE.Vector3[] = [];
      if (i === 0) {
        // top: corner at (0, -bOff), arms extend right/left and inward
        pts.push(new THREE.Vector3(-bArm * 0.5, 0, -bOff + bArm));
        pts.push(new THREE.Vector3(-bArm * 0.5, 0, -bOff));
        pts.push(new THREE.Vector3( bArm * 0.5, 0, -bOff));
        pts.push(new THREE.Vector3( bArm * 0.5, 0, -bOff + bArm));
      } else if (i === 1) {
        // bottom
        pts.push(new THREE.Vector3(-bArm * 0.5, 0, bOff - bArm));
        pts.push(new THREE.Vector3(-bArm * 0.5, 0, bOff));
        pts.push(new THREE.Vector3( bArm * 0.5, 0, bOff));
        pts.push(new THREE.Vector3( bArm * 0.5, 0, bOff - bArm));
      } else if (i === 2) {
        // left
        pts.push(new THREE.Vector3(-bOff + bArm, 0, -bArm * 0.5));
        pts.push(new THREE.Vector3(-bOff,         0, -bArm * 0.5));
        pts.push(new THREE.Vector3(-bOff,         0,  bArm * 0.5));
        pts.push(new THREE.Vector3(-bOff + bArm,  0,  bArm * 0.5));
      } else {
        // right
        pts.push(new THREE.Vector3(bOff - bArm, 0, -bArm * 0.5));
        pts.push(new THREE.Vector3(bOff,         0, -bArm * 0.5));
        pts.push(new THREE.Vector3(bOff,         0,  bArm * 0.5));
        pts.push(new THREE.Vector3(bOff - bArm,  0,  bArm * 0.5));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.80 });
      const l = new THREE.Line(geo, mat);
      l.name = `Bk${i}`;
      g.add(l);
      this.disposables.push(geo, mat);
    });

    // ── Center dot (bright amber)
    const dotGeo = new THREE.SphereGeometry(0.0045 * S, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xfcd34d, transparent: true, opacity: 1.0 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.name = 'Dot';
    g.add(dot);
    this.disposables.push(dotGeo, dotMat);

    // ── Tall beacon stem (extends upward from surface = outward from Moon)
    const stemH = 0.085 * S;
    const stGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, stemH, 0),
    ]);
    const stMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.70, blending: THREE.AdditiveBlending });
    const stem = new THREE.Line(stGeo, stMat);
    stem.name = 'Stem';
    g.add(stem);
    this.disposables.push(stGeo, stMat);

    // ── Stem cap glow
    const capGeo = new THREE.SphereGeometry(0.0055 * S, 10, 10);
    const capMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.90 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = stemH;
    cap.name = 'Cap';
    g.add(cap);
    this.disposables.push(capGeo, capMat);
  }

  /**
   * Secondary candidates — single ring (unique hue per site) + tiny center dot + short stem.
   * No concentric rings, no overlapping geometry.
   */
  private _buildSecondaryMarker(g: THREE.Group, color: number): void {
    const rR = 0.009 * S;

    // ── Single clean ring (filled, not just outline)
    const ringGeo = new THREE.RingGeometry(rR, rR * 1.45, 36);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.name = 'Ring';
    g.add(ring);
    this.disposables.push(ringGeo, ringMat);

    // ── Tiny center dot
    const dotGeo = new THREE.SphereGeometry(0.0025 * S, 10, 10);
    const dotMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.90 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.name = 'Dot';
    g.add(dot);
    this.disposables.push(dotGeo, dotMat);

    // ── Short stem
    const stemH = 0.028 * S;
    const stGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, stemH, 0),
    ]);
    const stMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
    const stem = new THREE.Line(stGeo, stMat);
    stem.name = 'Stem';
    g.add(stem);
    this.disposables.push(stGeo, stMat);
  }

  // ── Animation tick — called from render loop ───────────────────
  public update(_elapsedSec: number): void {
    // Reserved for future subtle pulse if needed
    // Currently: static markers only — no constant animation noise
  }

  // ── Raycasting ─────────────────────────────────────────────────
  public handleClick(event: MouseEvent, camera: THREE.Camera): SiteInfo | null {
    this.mouse.x =  (event.clientX / window.innerWidth)  * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, camera);
    const hits = this.raycaster.intersectObjects(this.interactiveMarkers, false);
    if (hits.length > 0) {
      let bestSite: SiteInfo | null = null;
      let minSiteDist = Infinity;
      for (const h of hits) {
        const s = h.object.userData.site as SiteInfo;
        if (!s) continue;
        const grp = this.siteMarkerGroups.get(s.id);
        const markerPos = grp ? grp.position : h.object.position;
        const d = h.point.distanceTo(markerPos);
        if (d < minSiteDist) {
          minSiteDist = d;
          bestSite = s;
        }
      }
      if (bestSite) {
        this.highlightSite(bestSite.id);
        this.onSelectSiteCallback?.(bestSite);
        return bestSite;
      }
    }
    return null;
  }

  public dispose(): void {
    this.disposables.forEach(d => { try { d.dispose(); } catch { /* */ } });
    this.disposables = [];
  }
}

// ── Helper: base opacity per element type and site role ────────────
function _baseOpacity(siteId: string, elementName = 'Ring'): number {
  if (siteId === 'south-pole') {
    return elementName === 'Stem' ? 0.0 : 0.80;
  }
  if (siteId === 'site-01') {
    if (elementName === 'Stem' || elementName === 'Cap') return 0.55;
    return 0.75;
  }
  // secondary
  if (elementName === 'Stem') return 0.40;
  return 0.60;
}
