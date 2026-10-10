import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './style.css';

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
let autoRotate = true;
let isWireframe = false;
let sunAngle = 0.6;                          // Radians, animatable
let animateSun = false;
let displacementData: Float32Array | null = null;
let originalPositions: Float32Array | null = null;
let displacedPositions: Float32Array | null = null;

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

// ── Relief scale modes ─────────────────────────────────────────
const RELIEF_MODES = [
  { label: '⛰ Relief: 1× (True Scale)', factor: 1.0 },
  { label: '⛰ Relief: 2× (Subtle)', factor: 2.0 },
  { label: '⛰ Relief: 4× (Exag.)', factor: 4.0 },
  { label: '⛰ Relief: Off (Sphere)', factor: 0.0 },
];
let currentReliefMode = 0; // Default: 1x (True Scientific Scale)

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

  const factor = RELIEF_MODES[currentReliefMode].factor;

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

// ── Load all textures and build the moon ───────────────────────
const textureLoader = new THREE.TextureLoader();

interface LoadedTextures {
  color: THREE.Texture;
  normal: THREE.Texture | null;
  displacement: THREE.Texture | null;
  displacementImg: HTMLImageElement | null;
}

async function loadTextures(): Promise<LoadedTextures> {
  setLoadStatus('Loading NASA color texture…', 10);

  // Import the color texture via Vite
  const colorTex = await new Promise<THREE.Texture>((resolve, reject) => {
    textureLoader.load(
      new URL('../Resources/lroc_color_2k.jpg', import.meta.url).href,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        resolve(tex);
      },
      undefined,
      reject,
    );
  });

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

  return { color: colorTex, normal: normalTex, displacement: dispTex, displacementImg: dispImg };
}

async function buildMoon() {
  const textures = await loadTextures();

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
    <h1 class="title">LUNAOPS</h1>
    <p class="subtitle">SELENE LABS · NASA Space Apps 2026</p>
    <div class="data-readout" id="data-readout">
      <span class="readout-label">COORDINATES</span>
      <span class="readout-value" id="readout-coords">—</span>
      <span class="readout-label">ELEVATION</span>
      <span class="readout-value" id="readout-elev">—</span>
    </div>
  </div>
  <div class="controls-panel">
    <button id="btn-reset" title="Reset camera to default view">⟲ Reset</button>
    <button id="btn-auto" title="Toggle auto-rotation">⏸ Auto-Rotate</button>
    <button id="btn-topo" class="active" title="Toggle 3D elevation relief scale">⛰ Relief: 1× (True Scale)</button>
    <button id="btn-wire" title="Toggle wireframe overlay">◇ Wireframe</button>
    <button id="btn-sun" title="Animate solar terminator position">☀ Sun Cycle</button>
  </div>
</div>
<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">SRC</span> NASA LRO/LOLA</span>
    <span class="telem-item"><span class="telem-label">RES</span> 16 px/°</span>
    <span class="telem-item"><span class="telem-label">ELEV</span> ${ELEV_MIN_KM.toFixed(1)} to +${ELEV_MAX_KM.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">REF</span> ${MOON_REAL_RADIUS_KM} km</span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Hover for elevation data</p>
</div>
`;
document.body.appendChild(hud);

// ── Button handlers ────────────────────────────────────────────
document.getElementById('btn-reset')!.addEventListener('click', () => {
  camera.position.set(0, 0.2, 4.0);
  controls.target.set(0, 0, 0);
  controls.update();
});

document.getElementById('btn-auto')!.addEventListener('click', () => {
  autoRotate = !autoRotate;
  const btn = document.getElementById('btn-auto')!;
  btn.textContent = autoRotate ? '⏸ Auto-Rotate' : '▶ Auto-Rotate';
  btn.classList.toggle('active', autoRotate);
});

document.getElementById('btn-topo')!.addEventListener('click', () => {
  currentReliefMode = (currentReliefMode + 1) % RELIEF_MODES.length;
  const mode = RELIEF_MODES[currentReliefMode];
  applyReliefFactor(mode.factor);
  const btn = document.getElementById('btn-topo')!;
  btn.textContent = mode.label;
  btn.classList.toggle('active', mode.factor > 0);
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

function updateElevationReadout() {
  if (!isHovering || !moonMesh || !displacementData) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(moonMesh);

  const coordsEl = document.getElementById('readout-coords');
  const elevEl = document.getElementById('readout-elev');

  if (intersects.length > 0) {
    const hit = intersects[0];
    const face = hit.face;
    if (!face) return;

    // Get the UV from the intersection
    const uv = hit.uv;
    if (uv) {
      // Convert UV to lat/lon
      const lon = (uv.x * 360 - 180).toFixed(1);
      const lat = ((1 - uv.y) * 180 - 90).toFixed(1);
      if (coordsEl) coordsEl.textContent = `${lat}° N, ${lon}° E`;
    }

    // Get elevation from nearest vertex
    const vertIdx = face.a;
    if (vertIdx < displacementData.length) {
      const elev = displacementData[vertIdx];
      if (elevEl) elevEl.textContent = `${elev >= 0 ? '+' : ''}${elev.toFixed(2)} km`;
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

  // Slow, gentle auto-rotation (real moon synodic rotation ~ 27.3 days)
  if (moonGroup && autoRotate) {
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
