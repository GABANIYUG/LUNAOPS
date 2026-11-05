import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './style.css';
import { createGeometryPanel, setPanelSite, setPanelTime } from './geometryPanel';
import { SouthPoleOverlay, SOUTH_POLE_SITES } from './southPoleOverlay';
import { SouthPoleExplorer } from './southPoleExplorer';
import { MissionWorkspace } from './missionWorkspace';
import { CandidateComparisonWorkspace } from './candidateComparison';
import { moonMeToScene } from './spiceClient';
import {
  moonVectorToSelenographic,
  selenographicToMoonVector,
  formatSelenographicCoords,
  validateCoordinates,
  distanceToSouthPoleKm,
  isInsideSite01Coverage,
} from './utils/coordinates';
import type { LandingSiteConfig } from './types/mission';

// ── Constants ──────────────────────────────────────────────────
const MOON_RADIUS = 1.6;                     // Display radius in scene units
const MOON_REAL_RADIUS_KM = 1737.4;          // Reference sphere radius
const ELEV_MIN_KM = -8.9815;                 // From NASA LDEM metadata
const ELEV_MAX_KM = 10.6855;
const ELEV_RANGE_KM = ELEV_MAX_KM - ELEV_MIN_KM;
const SPHERE_SEGMENTS = 512;                 // High-poly for displacement detail
const BG_COLOR = 0x020509;

// ── State ──────────────────────────────────────────────────────
let moonMesh: THREE.Mesh | null = null;
let moonGroup: THREE.Group;
let southPoleOverlay: SouthPoleOverlay | null = null;
let southPoleExplorer: SouthPoleExplorer | null = null;
let missionWorkspace: MissionWorkspace | null = null;
let candidateComparisonWorkspace: CandidateComparisonWorkspace | null = null;
let targetSiteMarker: THREE.Group | null = null;
let _targetSweepRing: THREE.Mesh | null = null;
let _targetOuterHalo: THREE.Mesh | null = null;
let hoverReticle: THREE.Group | null = null;
let pendingSelectionMarker: THREE.Group | null = null;
let autoRotate = false;                       // Default to stable view for scientific analysis
let sunAngle = 0.6;                          // Radians
let animateSun = false;
let isSouthPoleView = false;
let activeSiteLat = -89.463;
let activeSiteLon = 222.51;
let displacementData: Float32Array | null = null;
let originalPositions: Float32Array | null = null;
let displacedPositions: Float32Array | null = null;
let dispCanvasPixels: Uint8ClampedArray | null = null;
let dispCanvasWidth = 0;
let dispCanvasHeight = 0;

// Temporary user selection pending confirmation
let pendingCoordinates: { latDeg: number; lonDeg: number; elevKm: number } | null = null;

// Camera transition state
let cameraTween: {
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  startLook: THREE.Vector3;
  targetLook: THREE.Vector3;
  startTime: number;
  duration: number;
} | null = null;

function animateCameraTo(targetPos: THREE.Vector3, targetLook: THREE.Vector3, duration = 1.2) {
  cameraTween = {
    startPos: camera.position.clone(),
    targetPos: targetPos.clone(),
    startLook: controls.target.clone(),
    targetLook: targetLook.clone(),
    startTime: performance.now(),
    duration: duration * 1000,
  };
}

// ── Renderer ───────────────────────────────────────────────────
const canvas = document.createElement('canvas');
const app = document.getElementById('app')!;
app.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = false;

// ── Scene ──────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(BG_COLOR);

// ── Camera ─────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  36,
  window.innerWidth / window.innerHeight,
  0.01,
  500,
);
camera.position.set(0, 0.2, 4.0);

// ── Controls ───────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.75;
controls.maxDistance = 12;
controls.enablePan = false;
controls.rotateSpeed = 0.45;
controls.zoomSpeed = 0.7;

let isUserInteractingWithControls = false;
controls.addEventListener('start', () => {
  isUserInteractingWithControls = true;
});
controls.addEventListener('end', () => {
  isUserInteractingWithControls = false;
});

// ── Lighting (Physically Motivated Lunar Environment) ─────────
// Deep space has virtually zero ambient light; very faint fill for shadowed crater structure
const ambient = new THREE.AmbientLight(0x060913, 0.04);
scene.add(ambient);

// Primary solar illuminator: stark parallel directional light
const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.4);
sunLight.position.set(5.0, 1.2, 3.2);
scene.add(sunLight);

// Earthshine: very subtle blue-gray fill reflecting from full/gibbous Earth
const earthshineLight = new THREE.DirectionalLight(0x223355, 0.035);
earthshineLight.position.set(-5.0, 0, -3.2);
scene.add(earthshineLight);

// ── Post-processing ────────────────────────────────────────────
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Very restrained bloom to capture high-albedo polar mountain peaks without gaming glare
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.08,    // very subtle
  0.4,
  0.92,
);
composer.addPass(bloomPass);

// Subtle vignetting for depth
const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 0.95 },
    darkness: { value: 1.15 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float vig = smoothstep(offset, offset - 0.45, dist * (darkness + offset));
      color.rgb *= vig;
      gl_FragColor = color;
    }
  `,
};
const vignettePass = new ShaderPass(VignetteShader);
composer.addPass(vignettePass);

// ── Background Starfield ───────────────────────────────────────
function createStars() {
  const layers = [
    { count: 1200, rMin: 70, rMax: 110, size: 0.035, opacity: 0.45 },
    { count: 1800, rMin: 110, rMax: 160, size: 0.05, opacity: 0.65 },
    { count: 350, rMin: 45, rMax: 70, size: 0.09, opacity: 0.85 },
  ];
  layers.forEach(({ count, rMin, rMax, size, opacity }) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = rMin + Math.random() * (rMax - rMin);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size,
      color: 0xd8e8ff,
      transparent: true,
      opacity,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(geo, mat));
  });
}
createStars();

// ── Loading UI ─────────────────────────────────────────────────
const loadingOverlay = document.createElement('div');
loadingOverlay.id = 'loading-overlay';
loadingOverlay.innerHTML = `
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;
document.body.appendChild(loadingOverlay);

function setLoadStatus(text: string, pct?: number) {
  const el = document.getElementById('load-status');
  if (el) el.textContent = text;
  if (pct !== undefined) {
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = `${Math.min(100, pct)}%`;
  }
}

function hideLoading() {
  loadingOverlay.style.opacity = '0';
  setTimeout(() => loadingOverlay.remove(), 700);
}

// ── Lunar Topography & Elevation ──────────────────────────────
const FIXED_RELIEF_FACTOR = 1.8; // Calibrated true-feel topography

function createLunarMaterial(
  colorMap: THREE.Texture,
  normalMap: THREE.Texture | null,
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap || undefined,
    normalScale: normalMap ? new THREE.Vector2(0.5, 0.5) : undefined,
    roughness: 0.94,      // Powdery anorthositic & basaltic regolith
    metalness: 0.0,
    envMapIntensity: 0.0,
  });
}

function sampleElevationBilinear(
  u: number,
  v: number,
  width: number,
  height: number,
  pixels: Uint8ClampedArray,
): number {
  const x = ((u % 1.0 + 1.0) % 1.0) * (width - 1);
  const y = THREE.MathUtils.clamp(1.0 - v, 0.0, 1.0) * (height - 1);

  const x0 = Math.floor(x);
  const x1 = (x0 + 1) % width;
  const y0 = Math.floor(y);
  const y1 = Math.min(y0 + 1, height - 1);

  const fx = x - x0;
  const fy = y - y0;

  const v00 = pixels[(y0 * width + x0) * 4] / 255.0;
  const v10 = pixels[(y0 * width + x1) * 4] / 255.0;
  const v01 = pixels[(y1 * width + x0) * 4] / 255.0;
  const v11 = pixels[(y1 * width + x1) * 4] / 255.0;

  const top = v00 * (1 - fx) + v10 * fx;
  const bottom = v01 * (1 - fx) + v11 * fx;
  const raw = top * (1 - fy) + bottom * fy;

  return ELEV_MIN_KM + raw * ELEV_RANGE_KM;
}

function sampleElevationAtLatLon(latDeg: number, lonDeg: number): number {
  if (dispCanvasPixels && dispCanvasWidth > 0 && dispCanvasHeight > 0) {
    const v = THREE.MathUtils.clamp((latDeg + 90.0) / 180.0, 0.0, 1.0);
    const normLon = ((lonDeg % 360.0) + 360.0) % 360.0;
    const u = ((normLon + 180.0) % 360.0) / 360.0;
    return sampleElevationBilinear(u, v, dispCanvasWidth, dispCanvasHeight, dispCanvasPixels);
  }
  return 0;
}

function applyDisplacementToGeometry(
  geometry: THREE.SphereGeometry,
  dispTexture: HTMLImageElement,
) {
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  const count = pos.count;

  const cvs = document.createElement('canvas');
  cvs.width = dispTexture.width;
  cvs.height = dispTexture.height;
  const ctx = cvs.getContext('2d')!;
  ctx.drawImage(dispTexture, 0, 0);
  const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const pixels = imgData.data;

  dispCanvasPixels = pixels;
  dispCanvasWidth = cvs.width;
  dispCanvasHeight = cvs.height;

  originalPositions = new Float32Array(pos.array.length);
  originalPositions.set(pos.array as Float32Array);

  displacementData = new Float32Array(count);
  displacedPositions = new Float32Array(pos.array.length);

  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const factor = FIXED_RELIEF_FACTOR;

  for (let i = 0; i < count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const u = uv.getX(i);
    const v = uv.getY(i);

    const elevKm = sampleElevationBilinear(u, v, cvs.width, cvs.height, pixels);
    displacementData[i] = elevKm;

    const baseDisp = (elevKm / MOON_REAL_RADIUS_KM) * MOON_RADIUS;
    normal.copy(vertex).normalize();

    const p1x = vertex.clone().add(normal.clone().multiplyScalar(baseDisp));
    displacedPositions[i * 3]     = p1x.x;
    displacedPositions[i * 3 + 1] = p1x.y;
    displacedPositions[i * 3 + 2] = p1x.z;

    vertex.add(normal.multiplyScalar(baseDisp * factor));
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

function configureColorTexture(tex: THREE.Texture): THREE.Texture {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

const textureLoader = new THREE.TextureLoader();

async function loadTextures() {
  const fallback2kUrl = new URL('../Resources/lroc_color_2k.jpg', import.meta.url).href;
  const candidates = [
    { url: '/generated/lroc_color_4k.webp', label: 'NASA LROC 4K (WebP)', is4K: true },
    { url: '/generated/lroc_color_4k.jpg', label: 'NASA LROC 4K (JPEG)', is4K: true },
    { url: '/generated/lroc_color_2k.jpg', label: 'NASA LROC 2K', is4K: false },
    { url: fallback2kUrl, label: 'NASA LROC 2K', is4K: false },
  ];

  let colorTex: THREE.Texture | null = null;
  let colorLabel = 'NASA LROC 2K';
  let is4K = false;

  for (const c of candidates) {
    try {
      setLoadStatus(`Loading ${c.label}…`, 25);
      colorTex = await new Promise<THREE.Texture>((res, rej) => {
        textureLoader.load(c.url, t => res(t), undefined, e => rej(e));
      });
      configureColorTexture(colorTex);
      colorLabel = c.label;
      is4K = c.is4K;
      break;
    } catch {
      /* continue to fallback */
    }
  }

  if (!colorTex) {
    throw new Error('All color texture candidates failed to load.');
  }

  setLoadStatus('Loading LOLA normal map…', 50);
  let normalTex: THREE.Texture | null = null;
  try {
    normalTex = await new Promise<THREE.Texture>((res, rej) => {
      textureLoader.load('/generated/ldem_normal_map_half.png', t => {
        t.colorSpace = THREE.NoColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.ClampToEdgeWrapping;
        res(t);
      }, undefined, rej);
    });
  } catch {
    console.warn('[LUNAOPS] Normal map unavailable.');
  }

  setLoadStatus('Loading LOLA DEM topography…', 75);
  let dispImg: HTMLImageElement | null = null;
  try {
    dispImg = await new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = '/generated/ldem_displacement_8bit.png';
    });
  } catch {
    console.warn('[LUNAOPS] Displacement map unavailable.');
  }

  return { color: colorTex, colorLabel, is4K, normal: normalTex, dispImg };
}

let activeColorDetails = { label: 'NASA LROC 4K', is4K: true };

async function buildMoon() {
  const textures = await loadTextures();
  activeColorDetails = { label: textures.colorLabel, is4K: textures.is4K };

  const telemColorEl = document.getElementById('telem-color');
  if (telemColorEl) {
    telemColorEl.textContent = textures.is4K ? 'NASA LROC 4K' : 'NASA LROC 2K';
  }

  setLoadStatus('Generating lunar mesh…', 85);
  await new Promise(r => setTimeout(r, 40));

  const geometry = new THREE.SphereGeometry(MOON_RADIUS, SPHERE_SEGMENTS, SPHERE_SEGMENTS / 2);

  if (textures.dispImg) {
    applyDisplacementToGeometry(geometry, textures.dispImg);
  }

  setLoadStatus('Configuring shaders…', 95);
  await new Promise(r => setTimeout(r, 40));

  const material = createLunarMaterial(textures.color, textures.normal);
  moonMesh = new THREE.Mesh(geometry, material);
  moonMesh.castShadow = false;
  moonMesh.receiveShadow = false;

  moonGroup = new THREE.Group();
  // Physical axial tilt of the Moon relative to the ecliptic plane (~6.68°)
  moonGroup.rotation.x = THREE.MathUtils.degToRad(6.68);
  moonGroup.add(moonMesh);

  // ── South Pole & Artemis Candidate Landing Sites Overlay ─────
  southPoleOverlay = new SouthPoleOverlay(MOON_RADIUS);
  southPoleOverlay.setOnSelectSite((site) => {
    selectMissionSite({
      name: site.name,
      designation: site.designation,
      latitudeDeg: site.lat,
      longitudeDeg: site.lon,
      elevationM: site.elevationM,
      coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
      referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
      isInsideSite01DEM: Boolean(site.isInsideSite01DEM),
    });
  });
  moonGroup.add(southPoleOverlay.group);

  // ── Interactive Hover & Pending Selection Markers ────────────
  createHoverReticle();
  createPendingSelectionMarker();

  scene.add(moonGroup);

  setLoadStatus('Ready', 100);
  setTimeout(hideLoading, 400);
}

function createHoverReticle() {
  hoverReticle = new THREE.Group();
  hoverReticle.name = 'HoverReticle';
  hoverReticle.visible = false;

  const ringGeo = new THREE.RingGeometry(0.012, 0.015, 32);
  ringGeo.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  hoverReticle.add(ring);

  const dotGeo = new THREE.CircleGeometry(0.003, 16);
  dotGeo.rotateX(Math.PI / 2);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  hoverReticle.add(new THREE.Mesh(dotGeo, dotMat));

  moonGroup.add(hoverReticle);
}

function createPendingSelectionMarker() {
  pendingSelectionMarker = new THREE.Group();
  pendingSelectionMarker.name = 'PendingSelectionMarker';
  pendingSelectionMarker.visible = false;

  const ringGeo = new THREE.RingGeometry(0.018, 0.024, 32);
  ringGeo.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b, // Amber pending confirmation
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
  pendingSelectionMarker.add(new THREE.Mesh(ringGeo, ringMat));

  const stemGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.06, 0),
  ]);
  const stemMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 });
  pendingSelectionMarker.add(new THREE.Line(stemGeo, stemMat));

  moonGroup.add(pendingSelectionMarker);
}

buildMoon().catch((err) => {
  console.error('[LUNAOPS] Build error:', err);
  setLoadStatus('Failed to initialize — see console', 0);
});

// ── Build HUD UI ───────────────────────────────────────────────
const hud = document.createElement('div');
hud.id = 'ui-layer';
hud.innerHTML = `
<div class="hud-top">
  <!-- Brand Header -->
  <div class="brand">
    <div class="brand-header-row">
      <span class="brand-dot"></span>
      <h1 class="title">LUNAOPS</h1>
      <span class="geodetic-badge">IAU MOON_ME</span>
    </div>
    <p class="subtitle">NASA Space Apps 2026 · SELENE LABS · LUNAR SOUTH POLE MISSION PLANNER</p>
    
    <!-- Active Target Readout Card -->
    <div class="data-readout" id="data-readout">
      <div class="readout-row">
        <span class="readout-label">TARGET</span>
        <span class="readout-value" id="active-site-display">Artemis Site 01 (Ridge)</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">COORDS</span>
        <span class="readout-value" id="readout-coords">—</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">ELEVATION</span>
        <span class="readout-value" id="readout-elev">—</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">POLE DIST</span>
        <span class="readout-value" id="readout-pole-dist">—</span>
      </div>
    </div>

    <!-- Candidate Sites Quick-Selector Bar -->
    <div class="candidate-bar" id="candidate-bar">
      <span class="candidate-bar-label">CANDIDATE SITES:</span>
      <button type="button" class="cand-btn active" data-site="site-01">Site 01 (Ridge)</button>
      <button type="button" class="cand-btn" data-site="south-pole">South Pole 90°S</button>
      <button type="button" class="cand-btn" data-site="shackleton-rim">Shackleton Peak</button>
      <button type="button" class="cand-btn" data-site="malapert">Malapert Massif</button>
      <button type="button" class="cand-btn" data-site="haworth-rim">Haworth Rim</button>
      <button type="button" class="cand-btn" data-site="de-gerlache-rim">de Gerlache</button>
      <button type="button" class="cand-btn" data-site="nobile-rim-1">Nobile Rim</button>
    </div>
  </div>

  <!-- Primary Top Toolbar -->
  <div class="controls-panel">
    <div class="controls-group">
      <button id="btn-new-mission" class="btn-primary-action" title="Launch Mission Scenario Configuration [M]">🚀 Mission Workspace</button>
      <button id="btn-compare-sites" class="btn-highlight-compare" title="Open Candidate-Site Comparison [C]">⚖️ Compare Sites</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-south-pole" class="btn-polar-focus" title="Open Interactive South Pole Explorer & Focus 90°S [P]">🎯 South Pole Explorer</button>
      <button id="btn-manual-coords" title="Enter manual selenographic coordinates">⌖ Enter Coords</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-auto" title="Toggle gentle auto-rotation [Space]">▶ Auto-Rotate</button>
      <button id="btn-sun" title="Simulate solar terminator transit [S]">☀ Sun Cycle</button>
      <button id="btn-reset" title="Reset camera to default equatorial view [R]">⟲ Reset</button>
    </div>
  </div>
</div>

<!-- Direct Surface Selection Confirmation Toast -->
<div class="selection-confirm-toast" id="selection-confirm-toast" style="display:none;">
  <div class="toast-content">
    <div class="toast-title">📍 Surface Coordinate Selected</div>
    <div class="toast-coords" id="toast-coords-text">89.463° S, 222.510° E</div>
    <div class="toast-elev" id="toast-elev-text">Elevation: +1.10 km · Pole Dist: 16.3 km</div>
    <div class="toast-actions">
      <button type="button" id="btn-confirm-site" class="btn-toast-confirm">Set as Mission Target</button>
      <button type="button" id="btn-cancel-site" class="btn-toast-cancel">Cancel</button>
    </div>
  </div>
</div>

<!-- Manual Coordinate Entry Modal -->
<div class="coords-modal" id="coords-modal" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="coords-modal-title">
  <div class="coords-modal-dialog">
    <div class="coords-modal-header">
      <div class="coords-modal-title-row">
        <span class="coords-modal-icon">⌖</span>
        <h3 id="coords-modal-title">Manual Selenographic Coordinate Entry</h3>
      </div>
      <button type="button" id="btn-close-coords-modal" class="coords-modal-close" title="Close [Esc]">&times;</button>
    </div>
    <div class="coords-modal-body">
      <div class="coords-modal-datum-box">
        <span class="datum-badge">REFERENCE DATUM</span>
        <div class="datum-text"><strong>IAU MOON_ME Sphere</strong> (R = 1,737.4 km)</div>
        <div class="datum-subtext">Latitude: -90.000° to +90.000° (South negative) · Longitude: 0.00° to 360.00° (East-positive)</div>
      </div>
      <div class="coords-form-grid">
        <div class="coords-field">
          <label for="manual-lat">Latitude (°)</label>
          <input type="number" id="manual-lat" class="coords-input" value="-89.463" min="-90" max="90" step="0.001" placeholder="-89.463" />
          <span class="coords-field-hint">-90.0° (South Pole) to +90.0° (North)</span>
        </div>
        <div class="coords-field">
          <label for="manual-lon">Longitude (°)</label>
          <input type="number" id="manual-lon" class="coords-input" value="222.51" min="0" max="360" step="0.01" placeholder="222.51" />
          <span class="coords-field-hint">0.0° (Earth-facing) to 360.0° East</span>
        </div>
      </div>
      <div id="coords-error-msg" class="coords-error" style="display:none;"></div>
      <div class="coords-preview-line" id="coords-preview-line">
        Format: 89.463° S, 222.510° E · South Polar Region
      </div>
    </div>
    <div class="coords-modal-footer">
      <button type="button" id="btn-cancel-manual-coords" class="coords-btn coords-btn-cancel">Cancel</button>
      <button type="button" id="btn-apply-manual-coords" class="coords-btn coords-btn-apply">Apply &amp; Target ⌖</button>
    </div>
  </div>
</div>

<!-- Telemetry Bottom Bar -->
<!-- 3D Model Floating Callout Card (shown for selected site only) -->
<div id="hud-3d-site-card" class="hud-3d-site-card card-amber" style="display:none;">
  <div class="hud-3d-card-header">
    <span class="hud-3d-card-dot"></span>
    <span class="hud-3d-card-title" id="hud-3d-card-title">SITE 01 (CONNECTING RIDGE)</span>
  </div>
  <div class="hud-3d-card-desig" id="hud-3d-card-desig">Shackleton–de Gerlache Connecting Ridge</div>
  <div class="hud-3d-card-divider"></div>
  <div class="hud-3d-card-grid">
    <span class="hud-3d-lbl">Coords:</span>
    <span class="hud-3d-val" id="hud-3d-val-coords">89.463° S, 222.510° E</span>
    <span class="hud-3d-lbl">Elevation:</span>
    <span class="hud-3d-val" id="hud-3d-val-elev">+1,100 m</span>
    <span class="hud-3d-lbl">Pole Dist:</span>
    <span class="hud-3d-val" id="hud-3d-val-dist">16.3 km</span>
    <span class="hud-3d-lbl">Dataset:</span>
    <span class="hud-3d-val" id="hud-3d-val-cov">★ Validated 5 m/px DEM</span>
  </div>
  <div class="hud-3d-card-status" id="hud-3d-card-status">
    <span class="hud-3d-comm" id="hud-3d-comm">COMM: LOS 84%</span>
    <span class="hud-3d-illum" id="hud-3d-illum">ILLUM: 96%</span>
  </div>
</div>

<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO / LOLA / LROC</span>
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${activeColorDetails.is4K ? 'NASA LROC 4K' : 'NASA LROC 2K'}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${ELEV_MIN_KM.toFixed(1)} to +${ELEV_MAX_KM.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${MOON_REAL_RADIUS_KM} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;
document.body.appendChild(hud);

// ── SPICE Geometry Panel ───────────────────────────────────────
createGeometryPanel({ sunLight, earthshineLight }, {
  onSiteInput: (lat, lon) => {
    // Show surface coordinate confirmation toast menu & focus camera on lunar coordinate
    showSurfaceCoordinateConfirmation(lat, lon, undefined, true);
  },
  onSiteCalculate: (lat, lon, label) => {
    // Dismiss pending confirmation toast & marker once calculated
    const toast = document.getElementById('selection-confirm-toast');
    if (toast) toast.style.display = 'none';
    if (pendingSelectionMarker) pendingSelectionMarker.visible = false;
    pendingCoordinates = null;

    const insideDEM = isInsideSite01Coverage(lon, lat);
    const siteName = label.includes('·') ? label.split('·')[0].trim() : (insideDEM ? 'Site 01 Target' : 'Custom Lunar Target');

    selectMissionSite({
      name: siteName,
      designation: formatSelenographicCoords(lat, lon),
      latitudeDeg: lat,
      longitudeDeg: lon,
      elevationM: Math.round(sampleElevationAtLatLon(lat, lon) * 1000),
      coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
      referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
      isInsideSite01DEM: insideDEM,
      demDatasetName: insideDEM ? 'NASA LOLA Artemis Site 01 (5 m/px)' : 'Global LOLA (~60 m/px)',
    }, false, false);
  },
  onPresetSelect: (lat, lon, label) => {
    const toast = document.getElementById('selection-confirm-toast');
    if (toast) toast.style.display = 'none';
    if (pendingSelectionMarker) pendingSelectionMarker.visible = false;
    pendingCoordinates = null;

    const insideDEM = isInsideSite01Coverage(lon, lat);
    const siteName = label.includes('·') ? label.split('·')[0].trim() : label;

    selectMissionSite({
      name: siteName,
      designation: formatSelenographicCoords(lat, lon),
      latitudeDeg: lat,
      longitudeDeg: lon,
      elevationM: Math.round(sampleElevationAtLatLon(lat, lon) * 1000),
      coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
      referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
      isInsideSite01DEM: insideDEM,
      demDatasetName: insideDEM ? 'NASA LOLA Artemis Site 01 (5 m/px)' : 'Global LOLA (~60 m/px)',
    }, true, false);
  },
});

// ── Workspaces Integration ─────────────────────────────────────
southPoleExplorer = new SouthPoleExplorer();
southPoleExplorer.setOnSelect((site) => {
  selectMissionSite(site, false, false);
});

southPoleExplorer.setOnApplyAndCalculate(async (site) => {
  // Immediately sync the 3D globe and HUD to the selected site
  selectMissionSite(site, false, false);
  // Run SPICE geometry; catch landing-window scan failures gracefully
  try {
    return await setPanelSite(site.latitudeDeg, site.longitudeDeg, `${site.name} · ${site.designation}`);
  } catch {
    // 3D selection already synced; do not surface scan error as button failure
    return false;
  }
});

southPoleExplorer.setOnRecenter((coords) => {
  focusCameraOnCoordinates(coords.lat, coords.lon);
});

missionWorkspace = new MissionWorkspace();
document.getElementById('btn-new-mission')!.addEventListener('click', () => {
  missionWorkspace?.toggle();
});

candidateComparisonWorkspace = new CandidateComparisonWorkspace();
document.getElementById('btn-compare-sites')!.addEventListener('click', () => {
  candidateComparisonWorkspace?.toggle();
});

candidateComparisonWorkspace.setOnInspectSiteOnGlobe((site) => {
  const insideDEM = isInsideSite01Coverage(site.lon, site.lat);
  selectMissionSite({
    name: site.name,
    designation: formatSelenographicCoords(site.lat, site.lon),
    latitudeDeg: site.lat,
    longitudeDeg: site.lon,
    elevationM: site.elevationM,
    coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
    referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
    isInsideSite01DEM: insideDEM,
    demDatasetName: insideDEM ? 'NASA LOLA Artemis Site 01 (5 m/px)' : 'Global LOLA (~60 m/px)',
  }, true, true);
});

missionWorkspace.setOnSiteChanged((site) => {
  updateTargetSiteMarker(site, false);
});

missionWorkspace.setOnTimelineScrubbed((sample) => {
  const [sx, sy, sz] = moonMeToScene(sample.sun.direction_unit);
  const r = 8.0;
  sunLight.position.set(sx * r, sy * r, sz * r);

  const telemAzEl = document.getElementById('telem-sun-az');
  if (telemAzEl) {
    telemAzEl.textContent = `${sample.sun.azimuth_deg.toFixed(1)}° / ${sample.sun.elevation_deg.toFixed(1)}°`;
  }
  const clockEl = document.getElementById('utc-clock');
  if (clockEl) {
    clockEl.textContent = sample.timestamp_utc;
  }
  setPanelTime(sample.timestamp_utc);
});

// ── Target Marker & Site Selection Handlers ────────────────────
export function selectMissionSite(site: LandingSiteConfig, focusCamera = true, triggerCalculation = true) {
  activeSiteLat = site.latitudeDeg;
  activeSiteLon = site.longitudeDeg;
  updateTargetSiteMarker(site, triggerCalculation);

  // Sync with South Pole overlay highlighting
  const matchPreset = SOUTH_POLE_SITES.find(
    s => Math.abs(s.lat - site.latitudeDeg) < 0.05 && Math.abs(s.lon - site.longitudeDeg) < 0.05
  );
  if (southPoleOverlay) {
    southPoleOverlay.highlightSite(matchPreset ? matchPreset.id : null);
  }
  if (southPoleExplorer) {
    southPoleExplorer.setSelectedSite(matchPreset ? matchPreset.id : null, site.latitudeDeg, site.longitudeDeg);
  }

  // Sync quick-selector buttons
  document.querySelectorAll<HTMLButtonElement>('.cand-btn').forEach(b => {
    b.classList.toggle('active', matchPreset?.id === b.dataset.site);
  });

  // Sync mission workspace
  if (missionWorkspace) {
    missionWorkspace.setCoordinatesFromGlobe(site.latitudeDeg, site.longitudeDeg, site.name, site.designation);
  }

  // Smooth camera targeting
  if (focusCamera && moonGroup) {
    focusCameraOnCoordinates(site.latitudeDeg, site.longitudeDeg);
  }
}

function updateTargetSiteMarker(site: LandingSiteConfig, triggerCalculation = true) {
  if (!moonGroup) return;

  if (!targetSiteMarker) {
    targetSiteMarker = new THREE.Group();
    targetSiteMarker.name = 'TargetSiteMarker';

    // ── Outer halo (large, slow breathe)
    const haloGeo = new THREE.RingGeometry(0.040, 0.045, 64);
    haloGeo.rotateX(Math.PI / 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, side: THREE.DoubleSide,
      transparent: true, opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    _targetOuterHalo = new THREE.Mesh(haloGeo, haloMat);
    targetSiteMarker.add(_targetOuterHalo);

    // ── Sweep arc (animated rotation — shows active lock)
    const sweepGeo = new THREE.RingGeometry(0.028, 0.032, 64, 1, 0, Math.PI * 1.3);
    sweepGeo.rotateX(Math.PI / 2);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc, side: THREE.DoubleSide,
      transparent: true, opacity: 0.70,
      blending: THREE.AdditiveBlending,
    });
    _targetSweepRing = new THREE.Mesh(sweepGeo, sweepMat);
    targetSiteMarker.add(_targetSweepRing);

    // ── Mid precision ring
    const midGeo = new THREE.RingGeometry(0.019, 0.023, 48);
    midGeo.rotateX(Math.PI / 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, side: THREE.DoubleSide,
      transparent: true, opacity: 0.95,
    });
    targetSiteMarker.add(new THREE.Mesh(midGeo, midMat));

    // ── Inner ring
    const innerGeo = new THREE.RingGeometry(0.009, 0.012, 32);
    innerGeo.rotateX(Math.PI / 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc, side: THREE.DoubleSide,
      transparent: true, opacity: 0.90,
    });
    targetSiteMarker.add(new THREE.Mesh(innerGeo, innerMat));

    // ── Cross ticks (4 arms)
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dz]) => {
      const pts = [
        new THREE.Vector3(dx*0.006, 0, dz*0.006),
        new THREE.Vector3(dx*0.016, 0, dz*0.016),
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.90 });
      targetSiteMarker!.add(new THREE.Line(g, m));
    });

    // ── Corner chevron brackets
    const bR = 0.030, bL = 0.009;
    [[1,-1],[-1,-1],[1,1],[-1,1]].forEach(([sx,sz]) => {
      const cx = sx * bR * 0.707, cz = sz * bR * 0.707;
      const pts = [
        new THREE.Vector3(cx, 0, cz - sz * bL),
        new THREE.Vector3(cx, 0, cz),
        new THREE.Vector3(cx - sx * bL, 0, cz),
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
      targetSiteMarker!.add(new THREE.Line(g, m));
    });

    // ── Core pinpoint
    const dotGeo = new THREE.SphereGeometry(0.006, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    targetSiteMarker.add(new THREE.Mesh(dotGeo, dotMat));

    // ── Altitude beacon stem
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.11, 0),
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    targetSiteMarker.add(new THREE.Line(lineGeo, lineMat));

    // ── Stem cap glow
    const capGeo = new THREE.SphereGeometry(0.009, 12, 12);
    const capMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.11;
    targetSiteMarker.add(cap);

    moonGroup.add(targetSiteMarker);
  }

  const localPos = selenographicToMoonVector(site.latitudeDeg, site.longitudeDeg, MOON_RADIUS * 1.002);
  targetSiteMarker.position.copy(localPos);
  targetSiteMarker.visible = !isSouthPoleView;

  const normal = localPos.clone().normalize();
  targetSiteMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

  // Update HUD text readouts
  const siteDisplayEl = document.getElementById('active-site-display');
  if (siteDisplayEl) {
    siteDisplayEl.textContent = `${site.name} · ${site.designation}`;
  }

  // Populate 3D HUD Callout Card for selected site
  const card3d = document.getElementById('hud-3d-site-card');
  if (card3d) {
    const isAmber = site.name.includes('Site 01') || site.name.includes('Custom');
    card3d.className = isAmber ? 'hud-3d-site-card card-amber' : 'hud-3d-site-card';

    const titleEl = document.getElementById('hud-3d-card-title');
    const desigEl = document.getElementById('hud-3d-card-desig');
    const coordsVal = document.getElementById('hud-3d-val-coords');
    const elevVal = document.getElementById('hud-3d-val-elev');
    const distVal = document.getElementById('hud-3d-val-dist');
    const covVal = document.getElementById('hud-3d-val-cov');
    const commVal = document.getElementById('hud-3d-comm');
    const illumVal = document.getElementById('hud-3d-illum');

    if (titleEl) titleEl.textContent = site.name.toUpperCase();
    if (desigEl) desigEl.textContent = site.designation;
    if (coordsVal) coordsVal.textContent = formatSelenographicCoords(site.latitudeDeg, site.longitudeDeg);
    if (elevVal) elevVal.textContent = `${site.elevationM >= 0 ? '+' : ''}${site.elevationM.toLocaleString()} m`;
    if (distVal) distVal.textContent = `${distanceToSouthPoleKm(site.latitudeDeg).toFixed(1)} km`;
    if (covVal) covVal.textContent = site.isInsideSite01DEM ? '★ Validated 5 m/px DEM' : 'Global LOLA (~60 m/px)';
    if (commVal) commVal.textContent = site.name.includes('Site 01') ? 'COMM: LOS 84%' : 'COMM: DTE VISIBLE';
    if (illumVal) illumVal.textContent = site.name.includes('Site 01') ? 'ILLUM: 96%' : 'ILLUM: POLAR SUN';
  }
  const coordsEl = document.getElementById('readout-coords');
  const elevEl = document.getElementById('readout-elev');
  const poleDistEl = document.getElementById('readout-pole-dist');

  if (coordsEl) coordsEl.textContent = formatSelenographicCoords(site.latitudeDeg, site.longitudeDeg);
  if (elevEl) elevEl.textContent = `${site.elevationM >= 0 ? '+' : ''}${(site.elevationM / 1000).toFixed(2)} km`;
  if (poleDistEl) {
    const dist = distanceToSouthPoleKm(site.latitudeDeg);
    poleDistEl.textContent = `${dist.toFixed(1)} km to 90°S`;
  }

  if (triggerCalculation) {
    return setPanelSite(site.latitudeDeg, site.longitudeDeg, `${site.name} · ${site.designation}`);
  }
}

function focusCameraOnCoordinates(latDeg: number, lonDeg: number) {
  moonGroup.updateMatrixWorld(true);
  const localPos = selenographicToMoonVector(latDeg, lonDeg, MOON_RADIUS);
  const worldPos = localPos.clone().applyMatrix4(moonGroup.matrixWorld);
  const normal = worldPos.clone().normalize();

  // Position camera 0.85 units radially above the target on the lunar sphere
  const camPos = worldPos.clone().add(normal.clone().multiplyScalar(0.85));
  animateCameraTo(camPos, worldPos, 1.2);
}

// ── South Pole Dedicated Focus Mode ────────────────────────────
function toggleSouthPoleMode() {
  isSouthPoleView = !isSouthPoleView;
  const btn = document.getElementById('btn-south-pole')!;
  btn.classList.toggle('active', isSouthPoleView);

  if (southPoleExplorer) {
    if (isSouthPoleView) {
      southPoleExplorer.open();
    } else {
      southPoleExplorer.close();
    }
  }

  // Hide the global target marker when overlay is active — markers would duplicate
  if (targetSiteMarker) targetSiteMarker.visible = !isSouthPoleView;

  if (isSouthPoleView) {
    // Exact geographic South Pole at (0, -MOON_RADIUS, 0) in moonGroup space
    moonGroup.updateMatrixWorld(true);
    const spLocalPos = new THREE.Vector3(0, -MOON_RADIUS, 0);
    const spWorldPos = spLocalPos.clone().applyMatrix4(moonGroup.matrixWorld);

    // Calculate outward normal along the Moon's tilted rotational axis
    const spNormal = spWorldPos.clone().normalize();
    const camPos = spNormal.clone().multiplyScalar(2.65);
    // Slight offset toward 0° Prime Meridian for clear topographic relief of Shackleton Crater
    camPos.addScaledVector(new THREE.Vector3(1, 0, 0), 0.15);
    camPos.addScaledVector(new THREE.Vector3(0, 0, 1), 0.15);

    animateCameraTo(camPos, spWorldPos, 1.3);
  } else {
    // Return to default equatorial vantage
    animateCameraTo(
      new THREE.Vector3(0, 0.2, 4.0),
      new THREE.Vector3(0, 0, 0),
      1.1
    );
  }
}

document.getElementById('btn-south-pole')!.addEventListener('click', toggleSouthPoleMode);

document.getElementById('btn-reset')!.addEventListener('click', () => {
  isSouthPoleView = false;
  document.getElementById('btn-south-pole')?.classList.remove('active');
  southPoleExplorer?.close();
  if (targetSiteMarker) targetSiteMarker.visible = true;
  animateCameraTo(
    new THREE.Vector3(0, 0.2, 4.0),
    new THREE.Vector3(0, 0, 0),
    1.0
  );
});

document.getElementById('btn-auto')!.addEventListener('click', () => {
  autoRotate = !autoRotate;
  const btn = document.getElementById('btn-auto')!;
  btn.textContent = autoRotate ? '⏸ Auto-Rotate' : '▶ Auto-Rotate';
  btn.classList.toggle('active', autoRotate);
});

document.getElementById('btn-sun')!.addEventListener('click', () => {
  animateSun = !animateSun;
  const btn = document.getElementById('btn-sun')!;
  btn.classList.toggle('active', animateSun);
  btn.textContent = animateSun ? '☀ Sun Cycle ●' : '☀ Sun Cycle';
});

// Candidate selector bar buttons
document.querySelectorAll<HTMLButtonElement>('.cand-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const siteId = btn.dataset.site;
    const site = SOUTH_POLE_SITES.find(s => s.id === siteId);
    if (site) {
      selectMissionSite({
        name: site.name,
        designation: site.designation,
        latitudeDeg: site.lat,
        longitudeDeg: site.lon,
        elevationM: site.elevationM,
        coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
        referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
        isInsideSite01DEM: Boolean(site.isInsideSite01DEM),
      });
    }
  });
});

// ── Manual Coordinate Entry Dialog ─────────────────────────────
const coordsModal = document.getElementById('coords-modal')!;
const manualLatInput = document.getElementById('manual-lat') as HTMLInputElement;
const manualLonInput = document.getElementById('manual-lon') as HTMLInputElement;
const coordsErrorMsg = document.getElementById('coords-error-msg')!;
const coordsPreviewLine = document.getElementById('coords-preview-line')!;

function showSurfaceCoordinateConfirmation(
  latDeg: number,
  lonDeg: number,
  elevKm?: number,
  focusCamera: boolean = false,
) {
  if (elevKm === undefined) {
    elevKm = sampleElevationAtLatLon(latDeg, lonDeg);
  }

  pendingCoordinates = { latDeg, lonDeg, elevKm };

  // Place pending selection marker
  if (pendingSelectionMarker) {
    const pos = selenographicToMoonVector(latDeg, lonDeg, MOON_RADIUS * 1.002);
    pendingSelectionMarker.position.copy(pos);
    const normal = pos.clone().normalize();
    pendingSelectionMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    pendingSelectionMarker.visible = true;
  }

  // Smoothly focus camera onto coordinate if requested (e.g. manual entry)
  if (focusCamera && moonGroup) {
    if (isSouthPoleView && latDeg > -80.0) {
      isSouthPoleView = false;
      document.getElementById('btn-south-pole')?.classList.remove('active');
      southPoleExplorer?.close();
    }
    focusCameraOnCoordinates(latDeg, lonDeg);
  }

  // Update HUD telemetry readouts
  const coordsEl = document.getElementById('readout-coords');
  if (coordsEl) {
    coordsEl.textContent = formatSelenographicCoords(latDeg, lonDeg);
  }
  const elevEl = document.getElementById('readout-elev');
  if (elevEl) {
    elevEl.textContent = `${elevKm >= 0 ? '+' : ''}${elevKm.toFixed(2)} km`;
  }

  // Show confirmation toast
  const toast = document.getElementById('selection-confirm-toast')!;
  const toastCoords = document.getElementById('toast-coords-text')!;
  const toastElev = document.getElementById('toast-elev-text')!;

  toastCoords.textContent = formatSelenographicCoords(latDeg, lonDeg);
  const distKm = distanceToSouthPoleKm(latDeg);
  toastElev.textContent = `Elevation: ${elevKm >= 0 ? '+' : ''}${elevKm.toFixed(2)} km · Distance to 90°S: ${distKm.toFixed(1)} km`;
  toast.style.display = 'block';
}

function openCoordsModal() {
  manualLatInput.value = activeSiteLat.toFixed(3);
  manualLonInput.value = activeSiteLon.toFixed(2);
  coordsErrorMsg.style.display = 'none';
  updateManualCoordsPreview();

  // Dismiss any existing pending toast when entering new manual coordinates
  document.getElementById('selection-confirm-toast')!.style.display = 'none';
  if (pendingSelectionMarker) pendingSelectionMarker.visible = false;
  pendingCoordinates = null;

  coordsModal.style.display = 'flex';
  setTimeout(() => {
    manualLatInput.focus();
    manualLatInput.select();
  }, 40);
}

function closeCoordsModal() {
  coordsModal.style.display = 'none';
  coordsErrorMsg.style.display = 'none';
}

function applyManualCoords() {
  const val = validateCoordinates(manualLatInput.value, manualLonInput.value);
  if (!val.valid) {
    coordsErrorMsg.textContent = val.error || 'Invalid coordinates.';
    coordsErrorMsg.style.display = 'block';
    return;
  }
  closeCoordsModal();

  // Show surface coordinate confirmation toast menu & focus camera on lunar coordinate
  showSurfaceCoordinateConfirmation(val.lat, val.lon, undefined, true);
}

document.getElementById('btn-manual-coords')!.addEventListener('click', openCoordsModal);
document.getElementById('btn-close-coords-modal')!.addEventListener('click', closeCoordsModal);
document.getElementById('btn-cancel-manual-coords')!.addEventListener('click', closeCoordsModal);
document.getElementById('btn-apply-manual-coords')!.addEventListener('click', applyManualCoords);

// Keyboard accessibility: Escape to cancel, Enter to submit
coordsModal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
    closeCoordsModal();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    applyManualCoords();
  }
});

function updateManualCoordsPreview() {
  const val = validateCoordinates(manualLatInput.value, manualLonInput.value);
  if (!val.valid) {
    coordsErrorMsg.textContent = val.error || 'Invalid coordinates.';
    coordsErrorMsg.style.display = 'block';
  } else {
    coordsErrorMsg.style.display = 'none';
    const isPolar = val.lat <= -80.0;
    const dist = distanceToSouthPoleKm(val.lat);
    coordsPreviewLine.innerHTML = `Format: <strong>${formatSelenographicCoords(val.lat, val.lon)}</strong><br />` +
      `Region: <strong>${isPolar ? 'South Polar Region (80°S–90°S)' : 'Equatorial/Mid-Latitude'}</strong> · ` +
      `Distance to Pole: <strong>${dist.toFixed(1)} km</strong>`;
  }
}
manualLatInput.addEventListener('input', updateManualCoordsPreview);
manualLonInput.addEventListener('input', updateManualCoordsPreview);

// ── Direct Moon Surface Interaction with Drag vs Click Guard ───
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let pointerDownPos = new THREE.Vector2();
let pointerDownTime = 0;
let isPointerDragging = false;
let isMouseHovering = false;

canvas.addEventListener('pointerdown', (e) => {
  pointerDownPos.set(e.clientX, e.clientY);
  pointerDownTime = performance.now();
  isPointerDragging = false;
});

canvas.addEventListener('pointermove', (e) => {
  const dist = pointerDownPos.distanceTo(new THREE.Vector2(e.clientX, e.clientY));
  if (dist > 5) {
    isPointerDragging = true;
  }
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  isMouseHovering = true;
});

canvas.addEventListener('pointerleave', () => {
  isMouseHovering = false;
  if (hoverReticle) hoverReticle.visible = false;
});

canvas.addEventListener('click', (e) => {
  // If user dragged to rotate the Moon, do NOT trigger surface selection!
  if (isPointerDragging || (performance.now() - pointerDownTime > 350)) {
    return;
  }

  // Check if clicked directly on an established candidate site marker
  if (southPoleOverlay) {
    const hitSite = southPoleOverlay.handleClick(e, camera);
    if (hitSite) {
      selectMissionSite({
        name: hitSite.name,
        designation: hitSite.designation,
        latitudeDeg: hitSite.lat,
        longitudeDeg: hitSite.lon,
        elevationM: hitSite.elevationM,
        coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
        referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
        isInsideSite01DEM: Boolean(hitSite.isInsideSite01DEM),
      });
      return;
    }
  }

  // Intersect with Moon mesh
  if (!moonMesh) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(moonMesh);

  if (intersects.length > 0) {
    const hit = intersects[0];
    const localHit = moonMesh.worldToLocal(hit.point.clone());
    const { latDeg, lonDeg } = moonVectorToSelenographic(localHit, MOON_RADIUS);

    // Get elevation from nearest vertex or bilinear sampling
    let elevKm = 0;
    if (hit.face && displacementData) {
      elevKm = displacementData[hit.face.a] ?? 0;
    } else {
      elevKm = sampleElevationAtLatLon(latDeg, lonDeg);
    }

    showSurfaceCoordinateConfirmation(latDeg, lonDeg, elevKm, false);
  }
});

// Confirmation Toast Actions
document.getElementById('btn-confirm-site')!.addEventListener('click', () => {
  if (pendingCoordinates) {
    const { latDeg, lonDeg, elevKm } = pendingCoordinates;
    const insideDEM = isInsideSite01Coverage(lonDeg, latDeg);
    selectMissionSite({
      name: insideDEM ? 'Site 01 Target' : 'Custom Lunar Target',
      designation: formatSelenographicCoords(latDeg, lonDeg),
      latitudeDeg: latDeg,
      longitudeDeg: lonDeg,
      elevationM: Math.round(elevKm * 1000),
      coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
      referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
      isInsideSite01DEM: insideDEM,
      demDatasetName: insideDEM ? 'NASA LOLA Artemis Site 01 (5 m/px)' : 'Global LOLA (~60 m/px)',
    });
  }
  document.getElementById('selection-confirm-toast')!.style.display = 'none';
  if (pendingSelectionMarker) pendingSelectionMarker.visible = false;
  pendingCoordinates = null;
});

document.getElementById('btn-cancel-site')!.addEventListener('click', () => {
  document.getElementById('selection-confirm-toast')!.style.display = 'none';
  if (pendingSelectionMarker) pendingSelectionMarker.visible = false;
  pendingCoordinates = null;
});

function updateHoverReticle() {
  if (!isMouseHovering || !moonMesh || !hoverReticle) {
    if (hoverReticle) hoverReticle.visible = false;
    return;
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(moonMesh);

  if (intersects.length > 0) {
    const hit = intersects[0];
    const localHit = moonMesh.worldToLocal(hit.point.clone());
    const { latDeg, lonDeg } = moonVectorToSelenographic(localHit, MOON_RADIUS);
    const coordsEl = document.getElementById('readout-coords');
    if (coordsEl && !pendingCoordinates) {
      coordsEl.textContent = formatSelenographicCoords(latDeg, lonDeg);
    }

    const normal = localHit.clone().normalize();
    hoverReticle.position.copy(localHit.clone().multiplyScalar(1.0015));
    hoverReticle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    hoverReticle.visible = true;

    // Read elevation
    if (hit.face && displacementData) {
      const elev = displacementData[hit.face.a];
      const elevEl = document.getElementById('readout-elev');
      if (elevEl && !pendingCoordinates) {
        elevEl.textContent = `${elev >= 0 ? '+' : ''}${elev.toFixed(2)} km`;
      }
    }
  } else {
    hoverReticle.visible = false;
  }
}

// ── Keyboard Shortcuts ─────────────────────────────────────────
window.addEventListener('keydown', (e) => {
  // Ignore if typing inside input
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

  switch (e.key.toLowerCase()) {
    case ' ':
      e.preventDefault();
      document.getElementById('btn-auto')?.click();
      break;
    case 'p':
      e.preventDefault();
      toggleSouthPoleMode();
      break;
    case 'r':
      e.preventDefault();
      document.getElementById('btn-reset')?.click();
      break;
    case 's':
      e.preventDefault();
      document.getElementById('btn-sun')?.click();
      break;
    case 'm':
      e.preventDefault();
      missionWorkspace?.toggle();
      break;
    case 'c':
      e.preventDefault();
      candidateComparisonWorkspace?.toggle();
      break;
  }
});

// ── Resize ─────────────────────────────────────────────────────
function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloomPass.resolution.set(w, h);
}
window.addEventListener('resize', onResize);

// ── Initialize Default Site ────────────────────────────────────
selectMissionSite({
  name: 'Artemis Site 01',
  designation: 'Shackleton–de Gerlache Connecting Ridge',
  latitudeDeg: -89.463,
  longitudeDeg: 222.51,
  elevationM: 1100.0,
  coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
  referenceDatum: 'IAU Moon 2000 Sphere · MOON_ME frame',
  isInsideSite01DEM: true,
}, false);

// ── Render Loop ────────────────────────────────────────────────
const clock = new THREE.Clock();


function update3DSiteCallout() {
  const card = document.getElementById('hud-3d-site-card');
  if (!card || !moonGroup || isNaN(activeSiteLat) || isNaN(activeSiteLon)) {
    if (card) card.style.display = 'none';
    return;
  }

  // Calculate selected site world position on Moon sphere
  const localPos = selenographicToMoonVector(activeSiteLat, activeSiteLon, MOON_RADIUS * 1.002);
  const worldPos = localPos.clone().applyMatrix4(moonGroup.matrixWorld);

  // Hemispheric visibility test: is the site on the front face visible to camera?
  const toCamera = camera.position.clone().sub(worldPos).normalize();
  const normal = worldPos.clone().normalize();
  const facing = normal.dot(toCamera);

  if (facing <= 0.05) {
    card.style.display = 'none';
    return;
  }

  // Project 3D world position to screen pixels
  const proj = worldPos.clone().project(camera);
  if (proj.z >= 1.0) {
    card.style.display = 'none';
    return;
  }

  const screenX = (proj.x * 0.5 + 0.5) * window.innerWidth;
  const screenY = (-(proj.y * 0.5) + 0.5) * window.innerHeight;

  // Position card adjacent to target pinpoint with boundary clamps
  const cardW = 230;
  const cardH = 140;
  const posX = screenX + 32 + cardW > window.innerWidth ? screenX - cardW - 24 : screenX + 32;
  const posY = Math.max(16, Math.min(screenY - 45, window.innerHeight - cardH - 16));

  card.style.display = 'flex';
  card.style.left = `${posX}px`;
  card.style.top = `${posY}px`;
}

function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  controls.update();

  // Smooth camera tween
  if (cameraTween) {
    const tweenElapsed = performance.now() - cameraTween.startTime;
    const progress = Math.min(1, tweenElapsed / cameraTween.duration);
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    camera.position.lerpVectors(cameraTween.startPos, cameraTween.targetPos, ease);
    controls.target.lerpVectors(cameraTween.startLook, cameraTween.targetLook, ease);
    controls.update();

    if (progress >= 1) {
      cameraTween = null;
    }
  }

  // Update South Pole reticles & beacons
  if (southPoleOverlay) {
    southPoleOverlay.update(elapsed);
  }

  // Animate active target marker: sweep rotation + outer halo breathe
  if (_targetSweepRing) {
    _targetSweepRing.rotation.y = elapsed * 1.8;
  }
  if (_targetOuterHalo) {
    const haloPulse = 0.22 + 0.12 * Math.sin(elapsed * 2.2);
    (_targetOuterHalo.material as THREE.MeshBasicMaterial).opacity = haloPulse;
  }

  // Slow, controlled auto-rotation if enabled and user is not inspecting
  const isAnyModalOpen =
    Boolean(missionWorkspace?.getIsOpen()) ||
    Boolean(candidateComparisonWorkspace?.getIsOpen());

  if (moonGroup && autoRotate && !isUserInteractingWithControls && !cameraTween && !isAnyModalOpen) {
    moonGroup.rotation.y += 0.02 * dt;
  }

  // Solar terminator cycling
  if (animateSun) {
    sunAngle += 0.12 * dt;
    const r = 8.0;
    sunLight.position.set(
      Math.cos(sunAngle) * r,
      Math.sin(sunAngle * 0.25) * 2.0,
      Math.sin(sunAngle) * r,
    );
  }

  // Update hover reticle
  updateHoverReticle();
  update3DSiteCallout();

  composer.render();
}
animate();
