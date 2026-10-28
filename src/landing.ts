/**
 * LUNAOPS — Cinematic Landing Page
 * Earth-to-Moon journey: a high-budget sci-fi film opener in Three.js
 * SELENE LABS · NASA Space Apps 2026
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './landing.css';

// ── Scene phases ───────────────────────────────────────────────
const PHASES = [
  { name: 'LOW EARTH ORBIT',  progress: 0 },
  { name: 'TRANS-LUNAR',      progress: 0.35 },
  { name: 'LUNAR APPROACH',   progress: 0.7 },
  { name: 'ORBITAL INSERTION',progress: 1 },
];

// ── Canvas & Renderer ──────────────────────────────────────────
const root = document.getElementById('landing-root')!;
const canvas = document.createElement('canvas');
canvas.id = 'scene-canvas';
root.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;

// ── Scene & Camera ─────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000206);
scene.fog = new THREE.FogExp2(0x000408, 0.0008);

const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.05, 600);
camera.position.set(0, 0, 20);

// ── Post-processing chain ─────────────────────────────────────
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.22, 0.6, 0.82);
composer.addPass(bloom);

// Film grain + vignette shader pass
const FilmGrainVignetteShader = {
  uniforms: {
    tDiffuse:  { value: null },
    time:      { value: 0 },
    grain:     { value: 0.026 },
    vigOffset: { value: 0.88 },
    vigDark:   { value: 1.25 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float grain;
    uniform float vigOffset;
    uniform float vigDark;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co + time, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      // Grain
      float g = (rand(vUv) - 0.5) * grain;
      color.rgb += g;
      // Vignette
      vec2 c = vUv - 0.5;
      float d = length(c);
      float vig = smoothstep(vigOffset, vigOffset - 0.45, d * (vigDark + vigOffset));
      color.rgb *= vig;
      // Subtle blue channel shift for cinematic look
      color.b *= 1.03;
      color.r *= 0.97;
      gl_FragColor = color;
    }
  `,
};

const filmPass = new ShaderPass(FilmGrainVignetteShader);
composer.addPass(filmPass);

// ── Multi-layer Starfield ────────────────────────────────────
function buildStarfield() {
  const layers = [
    { count: 2000, rMin: 80, rMax: 150, size: 0.05, opacity: 0.55 },
    { count: 3500, rMin: 150, rMax: 280, size: 0.08, opacity: 0.75 },
    { count: 600,  rMin: 50,  rMax: 80,  size: 0.15, opacity: 0.95 },
  ];

  layers.forEach(({ count, rMin, rMax, size, opacity }) => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = rMin + Math.random() * (rMax - rMin);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      // Slight color variation: blue-white to pure white
      const t = Math.random();
      colors[i * 3]     = 0.85 + t * 0.15;
      colors[i * 3 + 1] = 0.88 + t * 0.12;
      colors[i * 3 + 2] = 1.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo, mat));
  });
}

buildStarfield();

// ── Sun (Directional light + glow sprite) ────────────────────
const SUN_DIR = new THREE.Vector3(8, 2.5, 6).normalize();

const sunLight = new THREE.DirectionalLight(0xfff5e0, 4.5);
sunLight.position.copy(SUN_DIR).multiplyScalar(50);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x050a18, 0.06);
scene.add(ambientLight);

// Sun glow (billboard)
const sunGlowGeo = new THREE.PlaneGeometry(12, 12);
const sunGlowMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { color: { value: new THREE.Color(0xfff0b0) } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float d = length(vUv - 0.5) * 2.0;
      float a = exp(-d * d * 4.5) * 0.55;
      gl_FragColor = vec4(color, a);
    }
  `,
});

const sunGlowMesh = new THREE.Mesh(sunGlowGeo, sunGlowMat);
sunGlowMesh.position.copy(SUN_DIR).multiplyScalar(55);
sunGlowMesh.lookAt(camera.position);
scene.add(sunGlowMesh);

// ── Earth ─────────────────────────────────────────────────────
const EARTH_RADIUS = 6.0;
const earthGroup = new THREE.Group();
earthGroup.position.set(18, -2, -8);
scene.add(earthGroup);

// Earth sphere (procedural shader — no texture needed for cinematic look)
const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 128, 64);
const EarthMaterial = new THREE.ShaderMaterial({
  uniforms: {
    sunDir:      { value: SUN_DIR.clone() },
    time:        { value: 0 },
    cloudOffset: { value: 0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv       = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3  sunDir;
    uniform float time;
    uniform float cloudOffset;
    varying vec3  vNormal;
    varying vec3  vWorldPos;
    varying vec2  vUv;

    // Simple noise for continents / clouds
    float hash(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      f = f*f*(3.0-2.0*f);
      float a = hash(i);
      float b = hash(i+vec2(1,0));
      float c = hash(i+vec2(0,1));
      float d = hash(i+vec2(1,1));
      return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      for(int i=0;i<5;i++) { v += a*noise(p); p*=2.1; a*=0.5; }
      return v;
    }

    void main() {
      vec3 N = normalize(vNormal);
      float NdotL = max(dot(N, sunDir), 0.0);
      float limb  = 1.0 - max(dot(N, normalize(vec3(0.0, 0.0, 1.0))), 0.0);

      // Ocean base color
      vec3 ocean = vec3(0.04, 0.12, 0.32);
      // Land (using fbm on UV)
      float land = fbm(vUv * 6.5 + vec2(1.3, 0.7));
      land = smoothstep(0.52, 0.58, land);
      vec3 landColor = mix(vec3(0.08, 0.22, 0.06), vec3(0.32, 0.24, 0.14), fbm(vUv*14.0));
      vec3 base = mix(ocean, landColor, land);

      // Polar ice
      float lat = abs(vUv.y - 0.5) * 2.0;
      float ice = smoothstep(0.76, 0.88, lat);
      base = mix(base, vec3(0.88, 0.93, 1.0), ice);

      // Cloud layer
      float cloud = fbm(vUv * 5.0 + vec2(cloudOffset, cloudOffset * 0.3));
      cloud = smoothstep(0.55, 0.72, cloud);
      base = mix(base, vec3(1.0), cloud * 0.88);

      // Lighting
      vec3 diffuse = base * (NdotL * 1.1 + 0.04);

      // Atmosphere rim glow (deep blue)
      float atmosphere = pow(limb, 2.8) * 0.65;
      vec3 atmo = vec3(0.1, 0.25, 0.8) * atmosphere;

      // Night-side city glow (subtle warm)
      float night = max(1.0 - NdotL * 3.0, 0.0);
      vec3 cities = vec3(0.8, 0.55, 0.15) * night * 0.06 * land;

      gl_FragColor = vec4(diffuse + atmo + cities, 1.0);
    }
  `,
});

const earthMesh = new THREE.Mesh(earthGeo, EarthMaterial);
earthGroup.add(earthMesh);

// Atmosphere shell around Earth
const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.025, 64, 32);
const atmosMat = new THREE.ShaderMaterial({
  transparent: true, side: THREE.FrontSide, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { sunDir: { value: SUN_DIR.clone() } },
  vertexShader: `
    uniform vec3 sunDir;
    varying float vRim;
    varying float vSunFacing;
    void main() {
      vec3 N = normalize(normalMatrix * normal);
      vec3 V = normalize(normalMatrix * vec3(0.0,0.0,1.0));
      vRim = pow(1.0 - abs(dot(N, V)), 3.0);
      vSunFacing = max(dot(N, sunDir), 0.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float vRim;
    varying float vSunFacing;
    void main() {
      vec3 dayAtmo   = vec3(0.15, 0.45, 1.0);
      vec3 nightAtmo = vec3(0.02, 0.06, 0.18);
      vec3 atmo      = mix(nightAtmo, dayAtmo, vSunFacing);
      float alpha    = vRim * 0.7;
      gl_FragColor   = vec4(atmo, alpha);
    }
  `,
});
earthGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

// ── Moon ──────────────────────────────────────────────────────
const MOON_RADIUS = 1.65;
const moonGroup = new THREE.Group();
moonGroup.position.set(-4, 1.2, -22);
moonGroup.rotation.x = THREE.MathUtils.degToRad(6.68);
scene.add(moonGroup);

const moonGeo = new THREE.SphereGeometry(MOON_RADIUS, 96, 48);
const MoonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    sunDir:  { value: SUN_DIR.clone() },
    time:    { value: 0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv       = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3  sunDir;
    uniform float time;
    varying vec3  vNormal;
    varying vec3  vWorldPos;
    varying vec2  vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(127.1, 311.7));
      p += dot(p, p + 23.4);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                 mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
    }

    float fbm(vec2 p) {
      float v=0.0; float a=0.5;
      for(int i=0;i<5;i++){v+=a*noise(p);p*=2.2;a*=0.48;}
      return v;
    }

    float craterSDF(vec2 uv, vec2 center, float r, float rimW) {
      float d = length(uv - center);
      float rim = smoothstep(r, r - rimW, d) - smoothstep(r - rimW, r - rimW*2.0, d);
      float floor_ = smoothstep(r*0.85, r*0.5, d) * 0.08;
      return rim * 0.12 - floor_;
    }

    void main() {
      vec3 N = normalize(vNormal);
      float NdotL = max(dot(N, sunDir), 0.0);

      // Regolith base — silver-gray with regional variation
      float regional = fbm(vUv * 3.5 + vec2(0.8, 1.4));
      vec3 highland  = vec3(0.70, 0.70, 0.68);
      vec3 mare      = vec3(0.35, 0.34, 0.33);
      vec3 base      = mix(highland, mare, smoothstep(0.42, 0.62, regional));

      // Micro-texture
      base *= 0.9 + fbm(vUv * 18.0) * 0.2;

      // Procedural crater highlights
      float craterBump = 0.0;
      craterBump += craterSDF(vUv, vec2(0.23, 0.46), 0.06, 0.012);
      craterBump += craterSDF(vUv, vec2(0.68, 0.31), 0.09, 0.018);
      craterBump += craterSDF(vUv, vec2(0.42, 0.72), 0.04, 0.009);
      craterBump += craterSDF(vUv, vec2(0.15, 0.65), 0.07, 0.014);
      craterBump += craterSDF(vUv, vec2(0.80, 0.58), 0.05, 0.010);
      base += craterBump;

      // Diffuse lighting — harsh terminator, minimal scattering
      float diff = NdotL * 1.15 + 0.02;
      vec3 color = base * diff;

      // Earthshine — very faint blue fill on dark side
      float earthshine = max(1.0 - NdotL * 4.0, 0.0) * 0.04;
      color += vec3(0.2, 0.4, 0.8) * earthshine;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

const moonMesh = new THREE.Mesh(moonGeo, MoonMaterial);
moonGroup.add(moonMesh);

// Moon rim glow (faint silver)
const moonGlowGeo = new THREE.SphereGeometry(MOON_RADIUS * 1.012, 64, 32);
const moonGlowMat = new THREE.ShaderMaterial({
  transparent: true, side: THREE.FrontSide, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { viewVector: { value: camera.position.clone() } },
  vertexShader: `
    uniform vec3 viewVector;
    varying float vI;
    void main() {
      vec3 N = normalize(normalMatrix * normal);
      vec3 V = normalize(normalMatrix * viewVector);
      vI = pow(1.0 - abs(dot(N,V)), 4.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    varying float vI;
    void main() { gl_FragColor = vec4(vec3(0.75, 0.82, 0.9), vI * 0.22); }
  `,
});
moonGroup.add(new THREE.Mesh(moonGlowGeo, moonGlowMat));

// ── Spacecraft path indicator (subtle dashed line) ───────────
function buildOrbitPath() {
  const points: THREE.Vector3[] = [];
  const start = new THREE.Vector3(18, -2, -8);
  const end   = new THREE.Vector3(-4, 1.2, -22);
  const ctrl  = new THREE.Vector3(2, 8, -10); // Bezier ctrl point
  const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
  for (let i = 0; i <= 100; i++) points.push(curve.getPoint(i / 100));

  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineDashedMaterial({
    color: 0x2a7aff, linewidth: 1,
    dashSize: 0.8, gapSize: 1.2,
    transparent: true, opacity: 0.18,
  });
  const line = new THREE.Line(geo, mat);
  line.computeLineDistances();
  scene.add(line);
}
buildOrbitPath();

// ── Small spacecraft indicator ────────────────────────────────
const craftGeo = new THREE.OctahedronGeometry(0.12, 0);
const craftMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: false });
const craftMesh = new THREE.Mesh(craftGeo, craftMat);
craftMesh.visible = false; // shown after intro
scene.add(craftMesh);

// ── HTML overlay (3-zone: top wordmark / clear centre / bottom CTA) ──────
const overlay = document.createElement('div');
overlay.id = 'ui-overlay';
overlay.innerHTML = `
  <div class="film-grain"></div>
  <div class="vignette"></div>
  <div class="letterbox-top"></div>
  <div class="letterbox-bottom"></div>

  <!-- TOP ZONE: compact wordmark only -->
  <div class="top-zone">
    <div class="wordmark-title">LUNAOPS</div>
    <div class="wordmark-desc">Explore the lunar frontier. Plan with precision.</div>
  </div>

  <!-- CENTRE ZONE: intentionally empty — 3D canvas shows through -->
  <div class="centre-zone" aria-hidden="true"></div>

  <!-- BOTTOM ZONE: Enter Workstation + scroll cue -->
  <div class="bottom-zone">
    <a href="/workstation.html" class="btn-enter" id="btn-enter-workstation"
       aria-label="Enter LUNAOPS Workstation">
      Enter Workstation
    </a>
    <div class="scroll-cue" aria-hidden="true">
      <div class="scroll-mouse"></div>
    </div>
  </div>
`;
root.appendChild(overlay);

// Thin progress strip — separate element at z-index 12, outside overlay flow
const progressStrip = document.createElement('div');
progressStrip.className = 'progress-strip';
progressStrip.innerHTML = '<div class="progress-strip-fill" id="journey-fill"></div>';
root.appendChild(progressStrip);

// WebGL fallback
const fallback = document.createElement('div');
fallback.id = 'webgl-fallback';
fallback.textContent = 'WebGL is required to view this experience. Please use a modern browser.';
root.appendChild(fallback);

// ── Camera journey animation ───────────────────────────────────
// The camera travels slowly from an Earth-centric view toward the Moon
// Total journey completes over ~60 seconds when idle, user scroll scrubs it

interface CameraStop {
  pos:  THREE.Vector3;
  look: THREE.Vector3;
  phase: number;      // index into PHASES
  progress: number;   // 0-1
}

// Camera stops are tuned so that:
// Stop 0: Earth is lower-right, open sky upper-left — wordmark zone stays clear
// Stop 1: Pull back, both bodies visible, Earth fading left, Moon entering right
// Stop 2: Mid-journey, spacecraft and Moon dominate centre
// Stop 3: Lunar close approach, Moon fills frame right-of-centre
const CAMERA_STOPS: CameraStop[] = [
  { pos: new THREE.Vector3(22,  5, 22),  look: new THREE.Vector3(16, -4, -6),   phase: 0, progress: 0 },
  { pos: new THREE.Vector3(8,   5, 16),  look: new THREE.Vector3(6,  0, -8),    phase: 1, progress: 0.33 },
  { pos: new THREE.Vector3(-1,  3,  8),  look: new THREE.Vector3(-2, 0.5, -18), phase: 2, progress: 0.66 },
  { pos: new THREE.Vector3(-3,  2,  4),  look: new THREE.Vector3(-4, 1.2, -22), phase: 3, progress: 1 },
];

let journeyT = 0;       // 0-1, overall journey progress
let autoSpeed = 0.003;  // units/second at 60fps

const lookTarget = new THREE.Vector3();
const camPos     = new THREE.Vector3();

function getCameraAtT(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled  = clamped * (CAMERA_STOPS.length - 1);
  const idx0    = Math.floor(scaled);
  const idx1    = Math.min(idx0 + 1, CAMERA_STOPS.length - 1);
  const localT  = scaled - idx0;
  const ease    = localT < 0.5
    ? 4 * localT * localT * localT
    : 1 - Math.pow(-2 * localT + 2, 3) / 2;

  const s0 = CAMERA_STOPS[idx0];
  const s1 = CAMERA_STOPS[idx1];

  const pos  = new THREE.Vector3().lerpVectors(s0.pos,  s1.pos,  ease);
  const look = new THREE.Vector3().lerpVectors(s0.look, s1.look, ease);
  const phase = t <= 0.33 ? 0 : t <= 0.66 ? 1 : t <= 0.88 ? 2 : 3;
  return { pos, look, phase };
}

function updateJourneyUI(t: number) {
  const fill = document.getElementById('journey-fill');
  if (fill) fill.style.height = `${(Math.max(0, Math.min(1, t)) * 100).toFixed(1)}%`;
}

// ── Scroll / wheel input scrubs journey (supports reversal) ──
let scrollAccum = 0;
let autoResumeTimer: ReturnType<typeof setTimeout> | null = null;

function pauseAutoAdvance() {
  autoSpeed = 0;
  if (autoResumeTimer) clearTimeout(autoResumeTimer);
  autoResumeTimer = setTimeout(() => { autoSpeed = 0.0008; }, 2800);
}

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  // Allow negative delta to reverse the journey
  scrollAccum += e.deltaY * 0.00042;
  pauseAutoAdvance();
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchmove', (e) => {
  const dy = touchStartY - e.touches[0].clientY;
  touchStartY = e.touches[0].clientY;
  scrollAccum += dy * 0.00085;
  pauseAutoAdvance();
}, { passive: true });

// ── Keyboard navigation ─────────────────────────────────────
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    window.location.href = '/workstation.html';
  }
});

// ── Resize handler ──────────────────────────────────────────
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.resolution.set(w, h);
});

// ── Render loop ─────────────────────────────────────────────
const clock = new THREE.Clock();
const earthStart = earthGroup.position.clone();

function animate() {
  requestAnimationFrame(animate);
  const dt      = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Advance journey — scrollAccum can be negative to allow reversal
  const totalT = Math.max(0, Math.min(1, journeyT + autoSpeed * dt + scrollAccum));
  journeyT = totalT;
  scrollAccum = 0;

  // Apply camera
  const { pos, look } = getCameraAtT(journeyT);
  // Gentle camera sway
  const sway = new THREE.Vector3(
    Math.sin(elapsed * 0.07) * 0.08,
    Math.cos(elapsed * 0.05) * 0.05,
    0
  );
  camera.position.lerpVectors(camera.position, pos.clone().add(sway), 0.025);
  lookTarget.lerpVectors(lookTarget, look, 0.025);
  camera.lookAt(lookTarget);

  // Update journey UI
  updateJourneyUI(journeyT);

  // Craft position along bezier
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(18, -2, -8),
    new THREE.Vector3(2, 8, -10),
    new THREE.Vector3(-4, 1.2, -22)
  );
  craftMesh.position.copy(curve.getPoint(Math.min(journeyT, 1)));
  craftMesh.rotation.y += dt * 0.8;
  if (journeyT > 0.05) craftMesh.visible = true;

  // Earth slow rotation
  earthMesh.rotation.y += dt * 0.012;
  (EarthMaterial.uniforms.cloudOffset as any).value += dt * 0.003;
  (EarthMaterial.uniforms.time as any).value = elapsed;

  // Moon slow rotation
  moonMesh.rotation.y += dt * 0.008;
  (MoonMaterial.uniforms.time as any).value = elapsed;

  // Update glow view vectors
  (moonGlowMat.uniforms.viewVector as any).value.copy(camera.position);

  // Sun billboard always faces camera
  sunGlowMesh.lookAt(camera.position);

  // Film grain shader time
  (filmPass.uniforms as any).time.value = elapsed * 8;

  composer.render();
}

animate();
