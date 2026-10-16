/**
 * southPoleOverlay.ts — LUNAOPS South Pole & Artemis Landing Site 3D Overlay.
 *
 * Adds high-visibility, scientifically registered visual overlays targeting
 * the lunar South Pole region (80°S - 90°S), including:
 *  - 80°S & 85°S polar circle rings (Artemis exploration boundary)
 *  - 90°S True South Pole pinpoint beacon and reticle
 *  - Artemis Site 01 (Shackleton - de Gerlache Connecting Ridge) landing zone
 *  - Interactive site markers with animated holographic rings
 */

import * as THREE from 'three';

export interface SiteInfo {
  id: string;
  name: string;
  designation: string;
  lat: number;
  lon: number;
  elevationM: number;
  description: string;
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
    description: 'High illumination ridge candidate with near-continuous solar access & direct line-of-sight to Earth.',
  },
  {
    id: 'south-pole',
    name: 'Lunar South Pole',
    designation: 'Geographic 90°S Pole',
    lat: -90.0,
    lon: 0.0,
    elevationM: -250,
    description: 'Intersection of all lunar meridians on the rim of Shackleton Crater.',
  },
  {
    id: 'shackleton-rim',
    name: 'Shackleton Crater Peak',
    designation: 'Artemis Candidate Site 04',
    lat: -89.78,
    lon: 128.0,
    elevationM: 1450,
    description: 'Elevated crater rim bordering permanently shadowed regions (PSR) with potential water ice.',
  },
  {
    id: 'malapert',
    name: 'Malapert Mountain',
    designation: 'Malapert Peak (Artemis Candidate)',
    lat: -86.04,
    lon: 2.7,
    elevationM: 5000,
    description: 'Prominent 5 km topographic massif providing extended solar visibility and Earth comms.',
  },
];

export function latLonToMoonVector(
  latDeg: number,
  lonDeg: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - latDeg) * (Math.PI / 180);
  const theta = (lonDeg + 180) * (Math.PI / 180);

  const x = -radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(theta) * Math.sin(phi);

  return new THREE.Vector3(x, y, z);
}

export class SouthPoleOverlay {
  public group: THREE.Group;
  private animatedRings: THREE.Mesh[] = [];
  private interactiveMarkers: THREE.Object3D[] = [];
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private onSelectSiteCallback?: (site: SiteInfo) => void;

  constructor(moonRadius: number) {
    this.group = new THREE.Group();
    this.group.name = 'SouthPoleOverlay';

    this.createPolarCircles(moonRadius);
    this.createSouthPoleBeacon(moonRadius);
    this.createLandingSites(moonRadius);
  }

  public setOnSelectSite(cb: (site: SiteInfo) => void) {
    this.onSelectSiteCallback = cb;
  }

  public getInteractiveObjects(): THREE.Object3D[] {
    return this.interactiveMarkers;
  }

  /**
   * 80°S and 85°S exploration circle rings on the sphere surface
   */
  private createPolarCircles(moonRadius: number) {
    const latitudes = [
      { lat: -80.0, color: 0x00d2ff, opacity: 0.35, segments: 128, name: '80S_Ring' },
      { lat: -85.0, color: 0x4a9eff, opacity: 0.55, segments: 128, name: '85S_Ring' },
    ];

    latitudes.forEach(({ lat, color, opacity, segments, name }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringRadius = moonRadius * Math.sin(phi) * 1.002;
      const yPos = moonRadius * Math.cos(phi) * 1.002;

      const curve = new THREE.EllipseCurve(
        0, 0,
        ringRadius, ringRadius,
        0, 2 * Math.PI,
        false, 0
      );

      const points = curve.getPoints(segments);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, yPos, p.y))
      );

      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.LineLoop(ringGeo, ringMat);
      line.name = name;
      this.group.add(line);
    });

    // Polar cone / subtle ground zone ring between 80°S and 90°S
    const polarGlowGeo = new THREE.RingGeometry(0.01, moonRadius * Math.sin(10 * Math.PI / 180) * 1.001, 64);
    polarGlowGeo.rotateX(-Math.PI / 2);
    const polarGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const polarGlowMesh = new THREE.Mesh(polarGlowGeo, polarGlowMat);
    polarGlowMesh.position.y = -moonRadius * 1.001;
    this.group.add(polarGlowMesh);
  }

  /**
   * Geographic 90°S South Pole Pinpoint & Target Reticle
   */
  private createSouthPoleBeacon(moonRadius: number) {
    const spGroup = new THREE.Group();
    spGroup.position.set(0, -moonRadius, 0);

    // Reticle rings on the surface
    const ringGeo = new THREE.RingGeometry(0.035, 0.04, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    spGroup.add(ring);
    this.animatedRings.push(ring);

    // Inner target dot
    const dotGeo = new THREE.CircleGeometry(0.012, 16);
    dotGeo.rotateX(-Math.PI / 2);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    spGroup.add(new THREE.Mesh(dotGeo, dotMat));

    // Vertical beacon beam pointing outward from the South Pole (-Y direction)
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.15, 0),
    ]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    spGroup.add(new THREE.Line(beamGeo, beamMat));

    // Outer crosshairs
    const crossGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.06, 0, 0), new THREE.Vector3(0.06, 0, 0),
      new THREE.Vector3(0, 0, -0.06), new THREE.Vector3(0, 0, 0.06),
    ]);
    const crossMat = new THREE.LineSegments(crossGeo, new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.6,
    }));
    spGroup.add(crossMat);

    // Attach click hit sphere
    const hitGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.userData = { site: SOUTH_POLE_SITES.find(s => s.id === 'south-pole') };
    spGroup.add(hitMesh);
    this.interactiveMarkers.push(hitMesh);

    this.group.add(spGroup);
  }

  /**
   * Artemis candidate landing sites (Site 01, Shackleton Rim, Malapert)
   */
  private createLandingSites(moonRadius: number) {
    SOUTH_POLE_SITES.forEach((site) => {
      if (site.id === 'south-pole') return; // Handled above

      const siteGroup = new THREE.Group();
      const pos = latLonToMoonVector(site.lat, site.lon, moonRadius * 1.008);
      siteGroup.position.copy(pos);

      // Orient group so +Y points radially outward from Moon center
      siteGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        pos.clone().normalize()
      );

      // Is primary Artemis Site 01?
      const isPrimary = site.id === 'site-01';
      const mainColor = isPrimary ? 0xffb703 : 0x00f5d4; // Amber for Site 01, Emerald for others

      // Landing zone target ring
      const ringRadius = isPrimary ? 0.032 : 0.022;
      const ringGeo = new THREE.RingGeometry(ringRadius * 0.85, ringRadius, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: mainColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      siteGroup.add(ringMesh);
      this.animatedRings.push(ringMesh);

      // Pin stem
      const stemHeight = isPrimary ? 0.08 : 0.05;
      const stemGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, stemHeight, 0),
      ]);
      const stemMat = new THREE.LineBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.8,
      });
      siteGroup.add(new THREE.Line(stemGeo, stemMat));

      // Pinhead sphere
      const headGeo = new THREE.SphereGeometry(isPrimary ? 0.012 : 0.008, 12, 12);
      const headMat = new THREE.MeshBasicMaterial({
        color: isPrimary ? 0xffffff : mainColor,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.y = stemHeight;
      siteGroup.add(headMesh);

      // Hit box for mouse selection
      const hitGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.y = stemHeight / 2;
      hitMesh.userData = { site };
      siteGroup.add(hitMesh);
      this.interactiveMarkers.push(hitMesh);

      this.group.add(siteGroup);
    });
  }

  /**
   * Update animation loop for pulsing reticles
   */
  public update(elapsedSec: number) {
    this.animatedRings.forEach((ring, idx) => {
      const p = 1.0 + 0.15 * Math.sin(elapsedSec * 3.0 + idx * 0.8);
      ring.scale.set(p, p, p);
    });
  }

  /**
   * Handle raycasting click on South Pole markers
   */
  public handleClick(event: MouseEvent, camera: THREE.Camera): SiteInfo | null {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMarkers, false);

    if (intersects.length > 0) {
      const site = intersects[0].object.userData.site as SiteInfo;
      if (site && this.onSelectSiteCallback) {
        this.onSelectSiteCallback(site);
      }
      return site;
    }
    return null;
  }
}
