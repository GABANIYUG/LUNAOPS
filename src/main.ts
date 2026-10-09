import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './style.css';

// ── Asset URLs (resolved by Vite) ──────────────────────────────
// @ts-ignore
import glbUrl from '../Resources/Moon_NASA_LRO_8k_Topo_Small.glb?url';

// ── Constants ──────────────────────────────────────────────────
const MOON_DISPLAY_RADIUS = 1.6;   // Target display radius in Three.js units
const BG_COLOR = 0x020810;

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
renderer.toneMappingExposure = 1.2;
renderer.shadowMap.enabled = false;

// ── Scene ──────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(BG_COLOR);

// ── Camera ─────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.01,
  500,
);
camera.position.set(0, 0.3, 4.2);

// ── Controls ───────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 2.0;
controls.maxDistance = 12;
controls.enablePan = false;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 0.8;

// ── Lighting (cinematic, directional sunlight) ─────────────────
// Faint ambient so dark side isn't pure black
const ambient = new THREE.AmbientLight(0x1a1a2e, 0.15);
scene.add(ambient);

// Main "Sun" — strong, warm-white directional light
const sunLight = new THREE.DirectionalLight(0xfff5e6, 3.0);
sunLight.position.set(5, 2, 3);
scene.add(sunLight);

// Subtle fill / rim light from behind to outline the dark limb
const rimLight = new THREE.DirectionalLight(0x4466aa, 0.3);
rimLight.position.set(-4, -1, -3);
scene.add(rimLight);

// ── Post-processing (subtle bloom for lunar glow) ──────────────
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.15,   // strength  — very subtle, not glaring
  0.4,    // radius
  0.85,   // threshold
);
composer.addPass(bloomPass);

// ── Stars ──────────────────────────────────────────────────────
function createStars() {
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Distribute on a large sphere shell
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 80 + Math.random() * 40;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = 0.15 + Math.random() * 0.35;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.08,
    color: 0xddeeff,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(geo, mat));
}
createStars();

// ── State ──────────────────────────────────────────────────────
let moonGroup: THREE.Group | null = null;
let moonMeshRef: THREE.Mesh | null = null;
let topoGeometry: THREE.BufferGeometry | null = null;
let plainGeometry: THREE.BufferGeometry | null = null;
let normalMapTexture: THREE.Texture | null = null;
let autoRotate = true;
let isWireframe = false;
let isRelief = true;

// ── Loading UI ─────────────────────────────────────────────────
const loadingOverlay = document.createElement('div');
loadingOverlay.id = 'loading-overlay';
loadingOverlay.innerHTML = `
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">Initializing LUNAOPS</p>
    <p class="loader-sub" id="load-status">Loading NASA lunar assets…</p>
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
  setTimeout(() => loadingOverlay.remove(), 600);
}

// ── Load normal map (fire & forget — optional enhancement) ─────
const textureLoader = new THREE.TextureLoader();
// Try to load the DEM-derived normal map; if it doesn't exist yet, the
// moon still renders fine without it.
textureLoader.load(
  '/generated/ldem_normal_map_half.png',
  (tex) => {
    tex.colorSpace = THREE.NoColorSpace;      // Normal maps are linear data
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    normalMapTexture = tex;
    // If the moon is already loaded, hot-apply the normal map
    if (moonMeshRef) {
      const mat = moonMeshRef.material as THREE.MeshStandardMaterial;
      mat.normalMap = normalMapTexture;
      mat.normalScale.set(0.6, 0.6);
      mat.needsUpdate = true;
    }
    console.log('[LUNAOPS] Normal map loaded from DEM data');
  },
  undefined,
  () => {
    console.warn('[LUNAOPS] Normal map not found — run  python scripts/generate_normal_map.py  to enable');
  },
);

// ── Load the NASA GLB ──────────────────────────────────────────
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  glbUrl,
  (gltf) => {
    setLoadStatus('Processing geometry…', 90);

    moonGroup = new THREE.Group();
    const root = gltf.scene;
    let originalRadius = 1;

    root.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      moonMeshRef = mesh;

      // Measure original radius
      mesh.geometry.computeBoundingSphere();
      if (mesh.geometry.boundingSphere) {
        originalRadius = mesh.geometry.boundingSphere.radius;
      }

      // Store topographic geometry for toggle
      topoGeometry = mesh.geometry;
      plainGeometry = new THREE.SphereGeometry(originalRadius, 128, 64);

      // ── Material upgrade ──────────────────────────────────
      // Preserve the GLB's own texture (usually 8k) — do NOT override it
      // with the low-res 2k JPG.
      const existingMat = mesh.material as THREE.MeshStandardMaterial;
      const existingMap = existingMat.map;   // GLB's embedded texture

      if (existingMap) {
        existingMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
        existingMap.minFilter = THREE.LinearMipmapLinearFilter;
        existingMap.magFilter = THREE.LinearFilter;
        existingMap.generateMipmaps = true;
        existingMap.needsUpdate = true;
      }

      mesh.material = new THREE.MeshStandardMaterial({
        map: existingMap,                    // Keep GLB's high-res texture
        roughness: 1.0,                      // Moon regolith is extremely rough
        metalness: 0.0,
        normalMap: normalMapTexture || null,
        normalScale: new THREE.Vector2(0.6, 0.6),
      });
    });

    // Scale so rendered radius = MOON_DISPLAY_RADIUS
    const scaleFactor = MOON_DISPLAY_RADIUS / originalRadius;
    root.scale.setScalar(scaleFactor);

    moonGroup.add(root);
    scene.add(moonGroup);

    setLoadStatus('Ready', 100);
    setTimeout(hideLoading, 400);
  },
  (xhr) => {
    if (xhr.total > 0) {
      const pct = Math.round((xhr.loaded / xhr.total) * 80);
      const mb = (xhr.loaded / 1048576).toFixed(1);
      setLoadStatus(`Downloading model… ${mb} MB`, pct);
    }
  },
  (err) => {
    console.error('[LUNAOPS] GLB load error:', err);
    setLoadStatus('Failed to load lunar model – see console', 0);
  },
);

// ── Build HUD UI ───────────────────────────────────────────────
const hud = document.createElement('div');
hud.id = 'ui-layer';
hud.innerHTML = `
<div class="hud-top">
  <div class="brand">
    <h1 class="title">LUNAOPS</h1>
    <p class="subtitle">SELENE LABS · NASA Space Apps 2026</p>
  </div>
  <div class="controls-panel">
    <button id="btn-reset" title="Reset camera to default view">⟲ Reset</button>
    <button id="btn-auto" title="Toggle auto-rotation">⏸ Auto-Rotate</button>
    <button id="btn-wire" title="Toggle wireframe overlay">◇ Wireframe</button>
    <button id="btn-relief" title="Toggle topographic relief vs smooth sphere">⛰ Relief</button>
  </div>
</div>
<div class="hud-bottom">
  <p class="info-line">Drag to rotate · Scroll to zoom · Topography: NASA LRO / LOLA</p>
</div>
`;
document.body.appendChild(hud);

// ── Button handlers ────────────────────────────────────────────
document.getElementById('btn-reset')!.addEventListener('click', () => {
  camera.position.set(0, 0.3, 4.2);
  controls.target.set(0, 0, 0);
  controls.update();
});

document.getElementById('btn-auto')!.addEventListener('click', () => {
  autoRotate = !autoRotate;
  document.getElementById('btn-auto')!.textContent = autoRotate ? '⏸ Auto-Rotate' : '▶ Auto-Rotate';
});

document.getElementById('btn-wire')!.addEventListener('click', () => {
  isWireframe = !isWireframe;
  if (moonMeshRef) {
    (moonMeshRef.material as THREE.MeshStandardMaterial).wireframe = isWireframe;
  }
});

document.getElementById('btn-relief')!.addEventListener('click', () => {
  isRelief = !isRelief;
  if (moonMeshRef && topoGeometry && plainGeometry) {
    moonMeshRef.geometry = isRelief ? topoGeometry : plainGeometry;
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

// ── Render loop ────────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();
  controls.update();

  // Slow, gentle auto-rotation
  if (moonGroup && autoRotate) {
    moonGroup.rotation.y += 0.04 * dt;
  }

  composer.render();
}
animate();
