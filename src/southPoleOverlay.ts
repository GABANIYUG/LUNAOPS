/**
 * southPoleOverlay.ts — LUNAOPS High-Precision Lunar South Pole & Landing Site Overlay.
 *
 * Mathematically rigorous visual overlays for lunar South Polar exploration (80°S - 90°S):
 *  - Geodetic 90°S True Lunar South Pole pinpoint reticle and datum beacon
 *  - Calibrated 80°S, 85°S, and 88°S polar latitude parallels (conforming to Moon sphere)
 *  - Principal meridian axes (0° Prime / Earth-facing, 90°E, 180° Far-side, 270°E)
 *  - Actual Site 01 16x16 km 5m/px DEM footprint boundary polygon on Moon surface
 *  - Candidate landing sites (Artemis Site 01 Ridge, Shackleton Peak, Malapert, Haworth, etc.)
 *  - Interactive site markers with aerospace target beacons and telemetry hitboxes
 *  - Full resource disposal
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
    description: 'High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.',
    isInsideSite01DEM: true,
    terrainResolution: '5 m/px DEM (NASA LOLA Site 01)',
    coverageType: 'High-Resolution Regional DEM',
  },
  {
    id: 'south-pole',
    name: 'Lunar South Pole',
    designation: 'Geographic 90°00\'00" S Pole',
    lat: -90.0,
    lon: 0.0,
    elevationM: -250,
    description: 'Intersection of all lunar meridians on the undulating rim crest of Shackleton Crater. Geodetic reference benchmark.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
    isGeodeticDatum: true,
  },
  {
    id: 'shackleton-rim',
    name: 'Shackleton Crater Peak',
    designation: 'Artemis Candidate Site 04',
    lat: -89.78,
    lon: 128.0,
    elevationM: 1450,
    description: 'Elevated crater rim bordering permanently shadowed regions (PSR) with high water-ice deposition probability.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'malapert',
    name: 'Malapert Mountain',
    designation: 'Malapert Peak Massif (Artemis Candidate)',
    lat: -86.04,
    lon: 2.7,
    elevationM: 5000,
    description: 'Prominent 5 km topographic massif providing extended solar visibility and continuous Direct-To-Earth comms.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'haworth-rim',
    name: 'Haworth Crater Rim',
    designation: 'Haworth Crater Artemis Candidate',
    lat: -87.4,
    lon: 355.0,
    elevationM: 1200,
    description: 'Rim region flanking deep cold traps with potential volatile concentrations.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'de-gerlache-rim',
    name: 'de Gerlache Crater Rim',
    designation: 'de Gerlache Rim Artemis Candidate',
    lat: -88.5,
    lon: 271.0,
    elevationM: 1600,
    description: 'Crater rim massif offering favorable low-elevation sun geometry and line-of-sight to Site 01.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
  {
    id: 'nobile-rim-1',
    name: 'Nobile Crater Rim 1',
    designation: 'VIPER / Artemis Candidate',
    lat: -85.2,
    lon: 35.8,
    elevationM: 3200,
    description: 'Extensive highland plateau surveyed for robotic and crewed polar surface mobility.',
    isInsideSite01DEM: false,
    terrainResolution: 'Global LOLA Altimetry (~60 m/px)',
    coverageType: 'Global Altimetry',
  },
];

export class SouthPoleOverlay {
  public group: THREE.Group;
  private animatedElements: Array<{ object: THREE.Object3D; baseScale?: number; pulseSpeed?: number }> = [];
  private interactiveMarkers: THREE.Object3D[] = [];
  private siteMarkerGroups: Map<string, THREE.Group> = new Map();
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private onSelectSiteCallback?: (site: SiteInfo) => void;
  private disposables: Array<{ dispose: () => void }> = [];

  constructor(moonRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'SouthPoleOverlay';

    this.createPolarGrid(moonRadius);
    this.createDEMFootprint(moonRadius);
    this.createSouthPoleBeacon(moonRadius);
    this.createLandingSites(moonRadius);
  }

  public setOnSelectSite(cb: (site: SiteInfo) => void) {
    this.onSelectSiteCallback = cb;
  }

  public getInteractiveObjects(): THREE.Object3D[] {
    return this.interactiveMarkers;
  }

  public highlightSite(siteId: string | null) {
    this.siteMarkerGroups.forEach((group, id) => {
      const isSelected = id === siteId;
      const targetRing = group.getObjectByName('TargetRing') as THREE.Mesh | undefined;
      const beaconLine = group.getObjectByName('BeaconLine') as THREE.Line | undefined;
      const pinHead = group.getObjectByName('PinHead') as THREE.Mesh | undefined;

      if (targetRing) {
        const mat = targetRing.material as THREE.MeshBasicMaterial;
        mat.color.setHex(isSelected ? 0x38bdf8 : (id === 'site-01' ? 0x0ea5e9 : 0x64748b));
        mat.opacity = isSelected ? 0.95 : 0.6;
        targetRing.scale.setScalar(isSelected ? 1.3 : 1.0);
      }
      if (beaconLine) {
        const mat = beaconLine.material as THREE.LineBasicMaterial;
        mat.color.setHex(isSelected ? 0x38bdf8 : (id === 'site-01' ? 0x0ea5e9 : 0x64748b));
        mat.opacity = isSelected ? 0.95 : 0.5;
      }
      if (pinHead) {
        const mat = pinHead.material as THREE.MeshBasicMaterial;
        mat.color.setHex(isSelected ? 0xffffff : (id === 'site-01' ? 0x38bdf8 : 0x94a3b8));
      }
    });
  }

  /**
   * Scientific polar reference grid:
   *  - 80°S parallel: Artemis study boundary (303 km radius)
   *  - 85°S parallel: 152 km radius circle
   *  - 88°S parallel: 61 km radius near-polar circle
   *  - 0° / 180° and 90° / 270° principal meridians
   */
  private createPolarGrid(moonRadius: number) {
    const gridGroup = new THREE.Group();
    gridGroup.name = 'PolarReferenceGrid';

    // Latitude circles conforming to the 3D Moon sphere
    const parallels = [
      { lat: -80.0, color: 0x38bdf8, opacity: 0.35, segments: 180 },
      { lat: -85.0, color: 0x0284c7, opacity: 0.40, segments: 180 },
      { lat: -88.0, color: 0x0369a1, opacity: 0.30, segments: 120 },
    ];

    parallels.forEach(({ lat, color, opacity, segments }) => {
      const points: THREE.Vector3[] = [];
      const r = moonRadius * 1.0015; // float slightly above terrain displacement
      for (let i = 0; i <= segments; i++) {
        const lon = (i / segments) * 360.0;
        points.push(selenographicToMoonVector(lat, lon, r));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      gridGroup.add(line);
      this.disposables.push(geo, mat);
    });

    // Principal polar meridians from 80°S to 89.8°S
    const meridians = [
      { lon: 0.0, color: 0x38bdf8, opacity: 0.55, name: 'Meridian_0_EarthFacing' },
      { lon: 90.0, color: 0x0284c7, opacity: 0.35, name: 'Meridian_90E' },
      { lon: 180.0, color: 0x0284c7, opacity: 0.35, name: 'Meridian_180_FarSide' },
      { lon: 270.0, color: 0x0284c7, opacity: 0.35, name: 'Meridian_270E' },
    ];

    meridians.forEach(({ lon, color, opacity, name }) => {
      const points: THREE.Vector3[] = [];
      const r = moonRadius * 1.0015;
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const lat = -80.0 - (10.0 * (i / steps));
        points.push(selenographicToMoonVector(lat, lon, r));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      line.name = name;
      gridGroup.add(line);
      this.disposables.push(geo, mat);
    });

    this.group.add(gridGroup);
  }

  /**
   * Actual Site 01 16x16 km 5m/px DEM footprint boundary polygon on Moon surface.
   */
  private createDEMFootprint(moonRadius: number) {
    const demGroup = new THREE.Group();
    demGroup.name = 'Site01DEMFootprint';

    const r = moonRadius * 1.002;
    const { minX, maxX, minY, maxY } = SITE01_BOUNDS;

    // Subdivide the 4 edges of the bounding box to conform precisely to the Moon sphere
    const edgePoints: Array<{ x: number; y: number }> = [];
    const steps = 16;

    // Top edge: (minX -> maxX, maxY)
    for (let i = 0; i <= steps; i++) {
      edgePoints.push({ x: minX + (maxX - minX) * (i / steps), y: maxY });
    }
    // Right edge: (maxX, maxY -> minY)
    for (let i = 0; i <= steps; i++) {
      edgePoints.push({ x: maxX, y: maxY + (minY - maxY) * (i / steps) });
    }
    // Bottom edge: (maxX -> minX, minY)
    for (let i = 0; i <= steps; i++) {
      edgePoints.push({ x: maxX + (minX - maxX) * (i / steps), y: minY });
    }
    // Left edge: (minX, minY -> maxY)
    for (let i = 0; i <= steps; i++) {
      edgePoints.push({ x: minX, y: minY + (maxY - minY) * (i / steps) });
    }

    const vectorPoints = edgePoints.map((pt) => {
      const { lonDeg, latDeg } = polarStereoToSelenographic(pt.x, pt.y);
      return selenographicToMoonVector(latDeg, lonDeg, r);
    });

    const geo = new THREE.BufferGeometry().setFromPoints(vectorPoints);
    const mat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });
    const perimeterLine = new THREE.Line(geo, mat);
    demGroup.add(perimeterLine);
    this.disposables.push(geo, mat);

    this.group.add(demGroup);
  }

  /**
   * Geographic 90°00'00" S True Lunar South Pole Pinpoint & Geodetic Reticle
   * Exactly anchored at (0, -moonRadius, 0) in Moon body-fixed frame.
   */
  private createSouthPoleBeacon(moonRadius: number) {
    const spGroup = new THREE.Group();
    spGroup.name = 'TrueSouthPoleMarker';
    spGroup.position.set(0, -moonRadius, 0);

    // Primary precision geodetic reticle (concentric rings in local XZ plane)
    const ringGeo1 = new THREE.RingGeometry(0.018, 0.022, 48);
    ringGeo1.rotateX(-Math.PI / 2);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Scientific amber/gold for unique pole identification
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.name = 'PoleReticleRing';
    spGroup.add(ring1);
    this.animatedElements.push({ object: ring1, baseScale: 1.0, pulseSpeed: 2.0 });
    this.disposables.push(ringGeo1, ringMat1);

    // Inner 10 km scale reference circle
    const ringGeo2 = new THREE.RingGeometry(0.009, 0.011, 32);
    ringGeo2.rotateX(-Math.PI / 2);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    spGroup.add(ring2);
    this.disposables.push(ringGeo2, ringMat2);

    // Center pinpoint dot (mathematical pole)
    const dotGeo = new THREE.SphereGeometry(0.004, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    spGroup.add(dot);
    this.disposables.push(dotGeo, dotMat);

    // Geodetic crosshairs (oriented with 0°-180° and 90°-270° axes)
    const crossPoints = [
      new THREE.Vector3(-0.035, 0, 0), new THREE.Vector3(0.035, 0, 0),
      new THREE.Vector3(0, 0, -0.035), new THREE.Vector3(0, 0, 0.035),
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossMat = new THREE.LineSegments(crossGeo, new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
    }));
    spGroup.add(crossMat);
    this.disposables.push(crossGeo, crossMat.material as THREE.Material);

    // Vertical datum beacon pointing directly outward along the polar axis (-Y direction)
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.18, 0),
    ]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.8,
    });
    const beamLine = new THREE.Line(beamGeo, beamMat);
    spGroup.add(beamLine);
    this.disposables.push(beamGeo, beamMat);

    // Interactive hitbox for mouse selection
    const hitGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.userData = { site: SOUTH_POLE_SITES.find(s => s.id === 'south-pole') };
    spGroup.add(hitMesh);
    this.interactiveMarkers.push(hitMesh);
    this.disposables.push(hitGeo, hitMat);

    this.siteMarkerGroups.set('south-pole', spGroup);
    this.group.add(spGroup);
  }

  /**
   * Candidate Landing Sites (Site 01, Shackleton Peak, Malapert Mountain, etc.)
   */
  private createLandingSites(moonRadius: number) {
    SOUTH_POLE_SITES.forEach((site) => {
      if (site.id === 'south-pole') return; // Handled separately above

      const isPrimary = site.id === 'site-01';
      const siteGroup = new THREE.Group();
      siteGroup.name = `SiteMarker_${site.id}`;

      // Local 3D vector on Moon surface
      const pos = selenographicToMoonVector(site.lat, site.lon, moonRadius * 1.002);
      siteGroup.position.copy(pos);

      // Normal orientation radially outward
      const normal = pos.clone().normalize();
      siteGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      const colorHex = isPrimary ? 0x38bdf8 : 0x0284c7;

      // Landing zone target boundary ring
      const ringRadius = isPrimary ? 0.024 : 0.016;
      const ringGeo = new THREE.RingGeometry(ringRadius * 0.8, ringRadius, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isPrimary ? 0.9 : 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.name = 'TargetRing';
      siteGroup.add(ringMesh);
      this.animatedElements.push({ object: ringMesh, baseScale: 1.0, pulseSpeed: isPrimary ? 2.5 : 1.5 });
      this.disposables.push(ringGeo, ringMat);

      // Vertical beacon line
      const stemHeight = isPrimary ? 0.075 : 0.045;
      const stemGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, stemHeight, 0),
      ]);
      const stemMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.75,
      });
      const beaconLine = new THREE.Line(stemGeo, stemMat);
      beaconLine.name = 'BeaconLine';
      siteGroup.add(beaconLine);
      this.disposables.push(stemGeo, stemMat);

      // Pinhead sphere
      const headGeo = new THREE.SphereGeometry(isPrimary ? 0.007 : 0.005, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({
        color: isPrimary ? 0xffffff : 0x94a3b8,
      });
      const pinHead = new THREE.Mesh(headGeo, headMat);
      pinHead.name = 'PinHead';
      pinHead.position.y = stemHeight;
      siteGroup.add(pinHead);
      this.disposables.push(headGeo, headMat);

      // Interactive hit sphere
      const hitGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.y = stemHeight * 0.5;
      hitMesh.userData = { site };
      siteGroup.add(hitMesh);
      this.interactiveMarkers.push(hitMesh);
      this.disposables.push(hitGeo, hitMat);

      this.siteMarkerGroups.set(site.id, siteGroup);
      this.group.add(siteGroup);
    });
  }

  /**
   * Update animation loop for reticles
   */
  public update(elapsedSec: number) {
    this.animatedElements.forEach(({ object, baseScale = 1.0, pulseSpeed = 2.0 }) => {
      const s = baseScale * (1.0 + 0.08 * Math.sin(elapsedSec * pulseSpeed));
      object.scale.set(s, s, s);
    });
  }

  /**
   * Raycasting click handler for South Pole & Candidate Site markers
   */
  public handleClick(event: MouseEvent, camera: THREE.Camera): SiteInfo | null {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMarkers, false);

    if (intersects.length > 0) {
      const site = intersects[0].object.userData.site as SiteInfo;
      if (site) {
        this.highlightSite(site.id);
        if (this.onSelectSiteCallback) {
          this.onSelectSiteCallback(site);
        }
        return site;
      }
    }
    return null;
  }

  /**
   * Cleanly dispose of all geometries and materials
   */
  public dispose() {
    this.disposables.forEach(d => {
      try {
        d.dispose();
      } catch {
        /* ignore */
      }
    });
    this.disposables = [];
  }
}
