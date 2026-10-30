import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './style.css';
import { createGeometryPanel, setPanelSite, setPanelTime } from './geometryPanel';
import { SouthPoleOverlay } from './southPoleOverlay';
import { MissionWorkspace } from './missionWorkspace';
import { CandidateComparisonWorkspace } from './candidateComparison';
import { moonMeToScene } from './spiceClient';
import {
  moonVectorToSelenographic,
  selenographicToMoonVector,
  formatSelenographicCoords,
} from './utils/coordinates';
import type { LandingSiteConfig } from './types/mission';

// ── Constants ──────────────────────────────────────────────────
const MOON_RADIUS = 1.6;                     // Display radius in scene units
const MOON_REAL_RADIUS_KM = 1737.4;          // Reference sphere radius
const ELEV_MIN_KM = -8.9815;                 // From NASA LDEM metadata
const ELEV_MAX_KM = 10.6855;
const ELEV_RANGE_KM = ELEV_MAX_KM - ELEV_MIN_KM;
const SPHERE_SEGMENTS = 512;                 // High-poly for displacement detail
const BG_COLOR = 0x010509;

// ── State ──────────────────────────────────────────────────────
let moonMesh: THREE.Mesh | null = null;
let moonGroup: THREE.Group;
let southPoleOverlay: SouthPoleOverlay | null = null;
let missionWorkspace: MissionWorkspace | null = null;
let candidateComparisonWorkspace: CandidateComparisonWorkspace | null = null;
let targetSiteMarker: THREE.Group | null = null;
let autoRotate = true;
let isWireframe = false;
let sunAngle = 0.6;                          // Radians, animatable
let animateSun = false;
let isSouthPoleView = false;
let displacementData: Float32Array | null = null;
let originalPositions: Float32Array | null = null;
let displacedPositions: Float32Array | null = null;

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
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = false;

// ── Scene ──────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(BG_COLOR);

// ── Camera ─────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  38,
  window.innerWidth / window.innerHeight,
  0.01,
  500,
);
camera.position.set(0, 0.2, 4.0);

// ── Controls ───────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.8;
controls.maxDistance = 14;
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

// ── Lighting (physically motivated) ───────────────────────────
// Very faint ambient — the moon in space only has light from the Sun
const ambient = new THREE.AmbientLight(0x0a0a18, 0.06);
scene.add(ambient);

// Main "Sun" — strong parallel directional light
const sunLight = new THREE.DirectionalLight(0xfff8f0, 3.2);
sunLight.position.set(5, 1.5, 3);
scene.add(sunLight);

// Very subtle counter-fill from Earthshine
const earthshineLight = new THREE.DirectionalLight(0x3344aa, 0.08);
earthshineLight.position.set(-5, 0, -3);
scene.add(earthshineLight);

// ── Post-processing ────────────────────────────────────────────
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Subtle bloom for limb glow
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.12,    // strength — very subtle
  0.5,     // radius
  0.88,    // threshold
);
composer.addPass(bloomPass);

// ── Vignette shader for cinematic feel ─────────────────────────
const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 0.9 },
    darkness: { value: 1.3 },
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
      float vig = smoothstep(offset, offset - 0.5, dist * (darkness + offset));
      color.rgb *= vig;
      gl_FragColor = color;
    }
  `,
};
const vignettePass = new ShaderPass(VignetteShader);
composer.addPass(vignettePass);

// ── Stars (multi-layer for depth) ──────────────────────────────
function createStars() {
  const layers = [
    { count: 1500, rMin: 60, rMax: 90, size: 0.04, opacity: 0.5 },
    { count: 2000, rMin: 100, rMax: 150, size: 0.06, opacity: 0.7 },
    { count: 500, rMin: 40, rMax: 60, size: 0.12, opacity: 0.9 },
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
      color: 0xddeeff,
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
    <p class="loader-sub" id="load-status">Initializing high-fidelity lunar model…</p>
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
  setTimeout(() => loadingOverlay.remove(), 800);
}

// ── Fixed Relief Scale (2× Subtle Relief) ──────────────────────
const FIXED_RELIEF_FACTOR = 2.0;

// ── Custom Lunar Material (MeshStandardMaterial) ───────────────
function createLunarMaterial(
  colorMap: THREE.Texture,
  normalMap: THREE.Texture | null,
): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap || undefined,
    // Realistic normal scale: 0.4 gives crisp, natural crater relief along the terminator
    normalScale: normalMap ? new THREE.Vector2(0.45, 0.45) : undefined,
    roughness: 0.95,      // Powdery regolith reflects diffusely
    metalness: 0.0,
    envMapIntensity: 0.0,
  });
  return mat;
}

// ── Smooth Bilinear Elevation Sampler ──────────────────────────
function sampleElevationBilinear(
  u: number,
  v: number,
  width: number,
  height: number,
  pixels: Uint8ClampedArray,
): number {
  // Wrap longitude horizontally [0..1)
  const x = ((u % 1.0 + 1.0) % 1.0) * (width - 1);
  // Clamp latitude vertically [0..1]
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

// ── Build Moon Geometry with CPU displacement ──────────────────
function applyDisplacementToGeometry(
  geometry: THREE.SphereGeometry,
  dispTexture: HTMLImageElement,
) {
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  const count = pos.count;

  // Read displacement from canvas
  const cvs = document.createElement('canvas');
  cvs.width = dispTexture.width;
  cvs.height = dispTexture.height;
  const ctx = cvs.getContext('2d')!;
  ctx.drawImage(dispTexture, 0, 0);
  const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const pixels = imgData.data;

  // Store original smooth sphere positions
  originalPositions = new Float32Array(pos.array.length);
  originalPositions.set(pos.array as Float32Array);

  // Store scientific elevation values for readout (in true km)
  displacementData = new Float32Array(count);

  // Precompute 1x true displacement
  displacedPositions = new Float32Array(pos.array.length);

  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();

  const factor = FIXED_RELIEF_FACTOR;

  for (let i = 0; i < count; i++) {
    vertex.fromBufferAttribute(pos, i);

    const u = uv.getX(i);
    const v = uv.getY(i);

    // Smooth bilinear sampling — prevents any stepping or jagged artifacts
    const elevKm = sampleElevationBilinear(u, v, cvs.width, cvs.height, pixels);
    displacementData[i] = elevKm;

    // True physical scale: elevation / lunar radius (1737.4 km)
    // In true 1:1 scale, the Moon is naturally spherical with real mountains (e.g. 5-10 km peaks)
    const baseDisp = (elevKm / MOON_REAL_RADIUS_KM) * MOON_RADIUS;

    normal.copy(vertex).normalize();

    // Store standard 1x true scale
    const p1x = vertex.clone().add(normal.clone().multiplyScalar(baseDisp));
    displacedPositions[i * 3]     = p1x.x;
    displacedPositions[i * 3 + 1] = p1x.y;
    displacedPositions[i * 3 + 2] = p1x.z;

    // Apply current factor
    vertex.add(normal.multiplyScalar(baseDisp * factor));
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

function applyReliefFactor(factor: number) {
  if (!moonMesh || !originalPositions || !displacementData) return;
  const pos = moonMesh.geometry.attributes.position;
  const count = pos.count;
  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    vertex.set(
      originalPositions[i * 3],
      originalPositions[i * 3 + 1],
      originalPositions[i * 3 + 2],
    );
    const elevKm = displacementData[i];
    const baseDisp = (elevKm / MOON_REAL_RADIUS_KM) * MOON_RADIUS;
    normal.copy(vertex).normalize();
    vertex.add(normal.multiplyScalar(baseDisp * factor));
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  pos.needsUpdate = true;
  moonMesh.geometry.computeVertexNormals();
}

// ── Texture Configuration Helper ──────────────────────────────
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

// ── Load all textures and build the moon ───────────────────────
const textureLoader = new THREE.TextureLoader();

interface ColorTextureResult {
  texture: THREE.Texture;
  label: string;
  is4K: boolean;
}

async function loadColorTexture(): Promise<ColorTextureResult> {
  const fallback2kUrl = new URL('../Resources/lroc_color_2k.jpg', import.meta.url).href;

  const candidateSources = [
    { url: '/generated/lroc_color_4k.webp', label: 'NASA LROC 4K (WebP)', is4K: true },
    { url: '/generated/lroc_color_4k.jpg', label: 'NASA LROC 4K (JPEG)', is4K: true },
    { url: '/generated/lroc_color_2k.jpg', label: 'NASA LROC 2K (Fallback)', is4K: false },
    { url: fallback2kUrl, label: 'NASA LROC 2K (Fallback)', is4K: false },
  ];

  let lastError: unknown = null;
  for (const candidate of candidateSources) {
    try {
      setLoadStatus(`Loading ${candidate.label}…`, candidate.is4K ? 12 : 25);
      const tex = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          candidate.url,
          (t) => resolve(t),
          undefined,
          (err) => reject(err),
        );
      });
      configureColorTexture(tex);
      console.log(`[LUNAOPS] Successfully loaded color texture: ${candidate.label} (${candidate.url})`);
      return { texture: tex, label: candidate.label, is4K: candidate.is4K };
    } catch (err) {
      lastError = err;
      console.warn(`[LUNAOPS] Could not load ${candidate.label} from ${candidate.url}. Trying next fallback…`, err);
    }
  }

  throw new Error(`[LUNAOPS] All color texture candidates failed to load: ${lastError}`);
}

interface LoadedTextures {
  color: THREE.Texture;
  colorLabel: string;
  is4K: boolean;
  normal: THREE.Texture | null;
  displacement: THREE.Texture | null;
  displacementImg: HTMLImageElement | null;
}

async function loadTextures(): Promise<LoadedTextures> {
  const { texture: colorTex, label: colorLabel, is4K } = await loadColorTexture();

  setLoadStatus('Loading DEM normal map…', 35);

  // Normal map (optional — gracefully degrade)
  let normalTex: THREE.Texture | null = null;
  try {
    normalTex = await new Promise<THREE.Texture>((resolve, reject) => {
      textureLoader.load(
        '/generated/ldem_normal_map_half.png',
        (tex) => {
          tex.colorSpace = THREE.NoColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          resolve(tex);
        },
        undefined,
        reject,
      );
    });
  } catch {
    console.warn('[LUNAOPS] Normal map not available — craters will lack micro-detail');
  }

  setLoadStatus('Loading elevation displacement data…', 55);

  // Displacement map (8-bit full-res for CPU displacement)
  let dispTex: THREE.Texture | null = null;
  let dispImg: HTMLImageElement | null = null;
  try {
    dispImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = '/generated/ldem_displacement_8bit.png';
    });

    dispTex = new THREE.Texture(dispImg);
    dispTex.colorSpace = THREE.NoColorSpace;
    dispTex.needsUpdate = true;
  } catch {
    console.warn('[LUNAOPS] Displacement map not available — using smooth sphere');
  }

  return {
    color: colorTex,
    colorLabel,
    is4K,
    normal: normalTex,
    displacement: dispTex,
    displacementImg: dispImg,
  };
}

let activeColorDetails = { label: 'NASA LROC 4K', is4K: true };

async function buildMoon() {
  const textures = await loadTextures();
  activeColorDetails = { label: textures.colorLabel, is4K: textures.is4K };

  // Update telemetry readout if HUD is already initialized
  const telemColorEl = document.getElementById('telem-color');
  if (telemColorEl) {
    telemColorEl.textContent = textures.is4K ? 'NASA LROC 4K' : 'NASA LROC 2K (Fallback)';
  }

  setLoadStatus('Generating high-polygon sphere geometry…', 70);

  // Give the browser a frame to update the loading UI
  await new Promise(r => setTimeout(r, 50));

  // Create high-poly sphere
  const geometry = new THREE.SphereGeometry(MOON_RADIUS, SPHERE_SEGMENTS, SPHERE_SEGMENTS / 2);

  setLoadStatus('Applying NASA elevation data…', 80);
  await new Promise(r => setTimeout(r, 50));

  // CPU-side vertex displacement for accurate topography
  if (textures.displacementImg) {
    applyDisplacementToGeometry(geometry, textures.displacementImg);
  }

  setLoadStatus('Applying surface materials…', 92);
  await new Promise(r => setTimeout(r, 50));

  const material = createLunarMaterial(textures.color, textures.normal);
  // We used CPU displacement so don't need the GPU displacementMap param
  moonMesh = new THREE.Mesh(geometry, material);
  moonMesh.castShadow = false;
  moonMesh.receiveShadow = false;

  moonGroup = new THREE.Group();
  // Tilt the moon ~6.68° (axial tilt relative to ecliptic)
  moonGroup.rotation.x = THREE.MathUtils.degToRad(6.68);
  moonGroup.add(moonMesh);

  // ── South Pole & Artemis Candidate Landing Sites Overlay ─────
  southPoleOverlay = new SouthPoleOverlay(MOON_RADIUS);
  southPoleOverlay.setOnSelectSite((site) => {
    setPanelSite(site.lat, site.lon, `${site.name} · ${site.designation}`);
    const coordsEl = document.getElementById('readout-coords');
    const elevEl = document.getElementById('readout-elev');
    if (coordsEl) coordsEl.textContent = `${Math.abs(site.lat).toFixed(2)}° S, ${site.lon.toFixed(1)}° E`;
    if (elevEl) elevEl.textContent = `${site.elevationM >= 0 ? '+' : ''}${(site.elevationM / 1000).toFixed(2)} km`;
  });
  moonGroup.add(southPoleOverlay.group);

  scene.add(moonGroup);

  // ── Limb atmosphere glow (Fresnel rim effect) ─────────────────
  const glowGeometry = new THREE.SphereGeometry(MOON_RADIUS * 1.015, 64, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      glowColor: { value: new THREE.Color(0x8899bb) },
      viewVector: { value: camera.position },
      intensity: { value: 0.35 },
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float vIntensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vViewDir = normalize(normalMatrix * viewVector);
        vIntensity = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.5);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float intensity;
      varying float vIntensity;
      void main() {
        float alpha = vIntensity * intensity;
        gl_FragColor = vec4(glowColor, alpha);
      }
    `,
  });
  const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  moonGroup.add(glowMesh);

  setLoadStatus('Ready', 100);
  setTimeout(hideLoading, 500);
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
  <div class="brand">
    <div class="brand-header-row">
      <span class="brand-dot"></span>
      <h1 class="title">LUNAOPS</h1>
    </div>
    <p class="subtitle">SELENE LABS · NASA Space Apps 2026</p>
    <div class="mission-badge"><span class="mission-badge-dot"></span>MISSION FOCUS: LUNAR SOUTH POLE LANDING SAFETY</div>
    <div class="data-readout" id="data-readout">
      <span class="readout-label">TARGET</span>
      <span class="readout-value" id="active-site-display">Artemis Site 01 (Ridge)</span>
      <span class="readout-label">COORDINATES</span>
      <span class="readout-value" id="readout-coords">—</span>
      <span class="readout-label">ELEVATION</span>
      <span class="readout-value" id="readout-elev">—</span>
    </div>
  </div>
  <div class="controls-panel">
    <div class="controls-group">
      <button id="btn-new-mission" title="Launch Mission Scenario Configuration &amp; Landing Site Selection">🚀 New Mission Analysis</button>
      <button id="btn-compare-sites" class="btn-highlight-compare" title="Open Candidate-Site Comparison Workspace (Side-by-side analysis &amp; ranking)">⚖️ Compare Sites</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-south-pole" title="Focus camera directly on Lunar South Pole &amp; Artemis Candidate Sites">🎯 South Pole</button>    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-auto" title="Toggle auto-rotation">⏸ Auto-Rotate</button>
      <button id="btn-wire" title="Toggle wireframe overlay">◇ Wireframe</button>
      <button id="btn-sun" title="Animate solar terminator position">☀ Sun Cycle</button>
      <button id="btn-reset" title="Reset camera to default view">⟲ Reset</button>
    </div>
  </div>
</div>
<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO/LOLA</span>
    <span class="telem-item"><span class="telem-label">COLOR</span> <span id="telem-color">${activeColorDetails.is4K ? 'NASA LROC 4K' : 'NASA LROC 2K (Fallback)'}</span></span>
    <span class="telem-item"><span class="telem-label">RES</span> 16 px/° DEM</span>
    <span class="telem-item"><span class="telem-label">ELEV</span> ${ELEV_MIN_KM.toFixed(1)} to +${ELEV_MAX_KM.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">REF</span> ${MOON_REAL_RADIUS_KM} km</span>
    <span class="telem-item"><span class="telem-label">SUN AZ/EL</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Hover or click Moon surface for coordinates &amp; elevation &nbsp;|&nbsp; <a href="/" style="color:var(--cyan-400);text-decoration:none;font-family:var(--font-mono);font-size:0.72em;letter-spacing:0.08em;opacity:0.7;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">← LANDING</a></p>
</div>
`;
document.body.appendChild(hud);

// ── SPICE Geometry Panel ───────────────────────────────────────
// Pass the scene lights so the panel can update Sun direction from SPICE.
createGeometryPanel({ sunLight, earthshineLight });

// ── Mission Configuration Workspace (Phase 3A) ─────────────────
missionWorkspace = new MissionWorkspace();
document.getElementById('btn-new-mission')!.addEventListener('click', () => {
  missionWorkspace?.toggle();
});
// ── Candidate Comparison Workspace (Phase 5) ───────────────────
candidateComparisonWorkspace = new CandidateComparisonWorkspace();
document.getElementById('btn-compare-sites')!.addEventListener('click', () => {
  candidateComparisonWorkspace?.toggle();
});

candidateComparisonWorkspace.setOnInspectSiteOnGlobe((site) => {
  // Update marker and camera to focus on this candidate site
  updateTargetSiteMarker({
    name: site.name,
    designation: 'Candidate Site',
    latitudeDeg: site.lat,
    longitudeDeg: site.lon,
    elevationM: site.elevationM,
    coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
    referenceDatum: 'IAU Moon 2000 Sphere',
    isInsideSite01DEM: site.lat <= -89.4 && site.lat >= -89.55 && site.lon >= 221.0 && site.lon <= 224.0,
  });

  // Calculate local position on Moon sphere and target camera smoothly
  const localPos = selenographicToMoonVector(site.lat, site.lon, MOON_RADIUS);
  const worldPos = localPos.clone().applyMatrix4(moonGroup.matrixWorld);
  const normal = worldPos.clone().normalize();
  const camTarget = worldPos.clone().add(normal.clone().multiplyScalar(0.75));

  animateCameraTo(camTarget, worldPos, 1.2);
});

// Function to update the 3D target site marker
function updateTargetSiteMarker(site: LandingSiteConfig) {
  if (!moonGroup) return;

  if (!targetSiteMarker) {
    targetSiteMarker = new THREE.Group();
    targetSiteMarker.name = 'TargetSiteMarker';

    // Outer cyan ring
    const ringGeo = new THREE.RingGeometry(0.012, 0.018, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    targetSiteMarker.add(ringMesh);

    // Inner bright point
    const dotGeo = new THREE.SphereGeometry(0.006, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    targetSiteMarker.add(dotMesh);

    // Vertical beacon pointer
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0.06),
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    targetSiteMarker.add(line);

    moonGroup.add(targetSiteMarker);
  }

  // Calculate local vector on Moon sphere
  const localPos = selenographicToMoonVector(site.latitudeDeg, site.longitudeDeg, MOON_RADIUS * 1.002);
  targetSiteMarker.position.copy(localPos);

  // Orient marker to face outward along normal
  const normal = localPos.clone().normalize();
  targetSiteMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  // Synchronize readout and SPICE panel
  const siteDisplayEl = document.getElementById('active-site-display');
  if (siteDisplayEl) {
    siteDisplayEl.textContent = `${site.name} · ${site.designation}`;
  }
  const coordsEl = document.getElementById('readout-coords');
  const elevEl = document.getElementById('readout-elev');
  if (coordsEl) coordsEl.textContent = formatSelenographicCoords(site.latitudeDeg, site.longitudeDeg);
  if (elevEl) elevEl.textContent = `${site.elevationM >= 0 ? '+' : ''}${(site.elevationM / 1000).toFixed(2)} km`;
  setPanelSite(site.latitudeDeg, site.longitudeDeg, `${site.name} · ${site.designation}`);
}

missionWorkspace.setOnSiteChanged((site) => {
  updateTargetSiteMarker(site);
});

missionWorkspace.setOnTimelineScrubbed((sample) => {
  // Update directional sunlight in the Three.js scene to match real topocentric/MOON_ME ephemerides
  const [sx, sy, sz] = moonMeToScene(sample.sun.direction_unit);
  const r = 8.0;
  sunLight.position.set(sx * r, sy * r, sz * r);

  // Update telemetry and UTC readout
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

// Initialize target marker for default site
updateTargetSiteMarker({
  name: 'Artemis Site 01',
  designation: 'Shackleton–de Gerlache Ridge',
  latitudeDeg: -89.463,
  longitudeDeg: 222.51,
  elevationM: 1100.0,
  coordinateConvention: 'Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive',
  referenceDatum: 'IAU Moon 2000 Sphere',
  isInsideSite01DEM: true,
});

// ── Button handlers ────────────────────────────────────────────
document.getElementById('btn-south-pole')!.addEventListener('click', () => {
  isSouthPoleView = !isSouthPoleView;
  const btn = document.getElementById('btn-south-pole')!;
  btn.classList.toggle('active', isSouthPoleView);

  if (isSouthPoleView) {
    // Smoothly orbit camera directly underneath to inspect South Pole (90°S)
    animateCameraTo(
      new THREE.Vector3(0, -2.75, 0.7),
      new THREE.Vector3(0, -0.2, 0),
      1.3
    );
  } else {
    // Return to default equatorial vantage
    animateCameraTo(
      new THREE.Vector3(0, 0.2, 4.0),
      new THREE.Vector3(0, 0, 0),
      1.2
    );
  }
});

document.getElementById('btn-reset')!.addEventListener('click', () => {
  isSouthPoleView = false;
  document.getElementById('btn-south-pole')?.classList.remove('active');
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
document.getElementById('btn-wire')!.addEventListener('click', () => {
  isWireframe = !isWireframe;
  if (moonMesh) {
    (moonMesh.material as THREE.MeshStandardMaterial).wireframe = isWireframe;
  }
  const btn = document.getElementById('btn-wire')!;
  btn.classList.toggle('active', isWireframe);
});

document.getElementById('btn-sun')!.addEventListener('click', () => {
  animateSun = !animateSun;
  const btn = document.getElementById('btn-sun')!;
  btn.classList.toggle('active', animateSun);
  btn.textContent = animateSun ? '☀ Sun Cycle ●' : '☀ Sun Cycle';
});

// ── Raycaster for hover elevation readout ──────────────────────
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovering = false;

canvas.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  isHovering = true;
});

canvas.addEventListener('mouseleave', () => {
  isHovering = false;
  const coordsEl = document.getElementById('readout-coords');
  const elevEl = document.getElementById('readout-elev');
  if (coordsEl) coordsEl.textContent = '—';
  if (elevEl) elevEl.textContent = '—';
});

// Click interaction on South Pole markers or global Moon surface
canvas.addEventListener('click', (e) => {
  // Check if clicked on a south pole preset marker first
  if (southPoleOverlay) {
    const hitSite = southPoleOverlay.handleClick(e, camera);
    if (hitSite) {
      console.log(`[LUNAOPS] Selected preset site: ${hitSite.name} (${hitSite.lat}°S, ${hitSite.lon}°E)`);
      if (missionWorkspace) {
        missionWorkspace.setCoordinatesFromGlobe(hitSite.lat, hitSite.lon);
      }
      return;
    }
  }

  // Check if clicked directly on Moon surface
  if (!moonMesh) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(moonMesh);
  if (intersects.length > 0) {
    const hit = intersects[0];
    const localHit = moonMesh.worldToLocal(hit.point.clone());
    const { latDeg, lonDeg } = moonVectorToSelenographic(localHit, MOON_RADIUS);
    console.log(`[LUNAOPS] Moon surface clicked: ${formatSelenographicCoords(latDeg, lonDeg)}`);
    if (missionWorkspace) {
      missionWorkspace.setCoordinatesFromGlobe(latDeg, lonDeg);
    }
  }
});

function updateElevationReadout() {
  if (!isHovering || !moonMesh || !displacementData) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(moonMesh);

  const coordsEl = document.getElementById('readout-coords');
  const elevEl = document.getElementById('readout-elev');

  if (intersects.length > 0) {
    const hit = intersects[0];
    const localHit = moonMesh.worldToLocal(hit.point.clone());
    const { latDeg, lonDeg } = moonVectorToSelenographic(localHit, MOON_RADIUS);

    if (coordsEl) coordsEl.textContent = formatSelenographicCoords(latDeg, lonDeg);

    // Get elevation from nearest vertex
    const face = hit.face;
    if (face) {
      const vertIdx = face.a;
      if (vertIdx < displacementData.length) {
        const elev = displacementData[vertIdx];
        if (elevEl) elevEl.textContent = `${elev >= 0 ? '+' : ''}${elev.toFixed(2)} km`;
      }
    }
  } else {
    if (coordsEl) coordsEl.textContent = '—';
    if (elevEl) elevEl.textContent = '—';
  }
}

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

// ── Render loop ────────────────────────────────────────────────
const clock = new THREE.Clock();

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

  // Update South Pole reticles and landing site beacon animations
  if (southPoleOverlay) {
    southPoleOverlay.update(elapsed);
  }

  // Slow, gentle auto-rotation (real moon synodic rotation ~ 27.3 days)
  const isAnyModalOpen =
    Boolean(missionWorkspace?.getIsOpen()) ||
    Boolean(candidateComparisonWorkspace?.getIsOpen());

  if (moonGroup && autoRotate && !isUserInteractingWithControls && !cameraTween && !isAnyModalOpen) {
    moonGroup.rotation.y += 0.03 * dt;
  }

  // Animate sun position to show terminator movement
  if (animateSun) {
    sunAngle += 0.15 * dt;
    const r = 8;
    sunLight.position.set(
      Math.cos(sunAngle) * r,
      Math.sin(sunAngle * 0.3) * 2,
      Math.sin(sunAngle) * r,
    );
  }

  // Update glow view vector
  if (moonGroup) {
    const glowMesh = moonGroup.children[1];
    if (glowMesh && (glowMesh as THREE.Mesh).material instanceof THREE.ShaderMaterial) {
      const mat = (glowMesh as THREE.Mesh).material as THREE.ShaderMaterial;
      mat.uniforms.viewVector.value.copy(camera.position);
    }
  }

  // Elevation readout (throttled to every 3 frames)
  if (Math.floor(elapsed * 60) % 3 === 0) {
    updateElevationReadout();
  }

  composer.render();
}
animate();
