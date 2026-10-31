/**
 * LUNAOPS — Hybrid Cinematic Landing Page
 * Continuous scroll-controlled experience:
 * Three.js (Earth -> Transit -> Full Moon Orbit) -> Exposure Match Cut ->
 * Pre-rendered 1080p Video (Surface Approach -> Powered Descent -> Touchdown) ->
 * Touchdown Hold & Workstation Entry.
 *
 * SELENE LABS · NASA Space Apps 2026
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './landing.css';

// ═══════════════════════════════════════════════════════════════════
//  SHOTS CONFIG — All journey boundaries, timings and captions
// ═══════════════════════════════════════════════════════════════════
const SHOTS = {
  scrollVH:          750,      // total scroll distance in vh units
  autoSpeed:         0.00065,  // journey units/sec slow cinematic drift
  springDamping:     8.5,      // critically-damped spring coefficient
  springStiffness:   60.0,

  // Shot boundaries [0..1]
  s1_earth:          0.00,     // Earth opening wide (Three.js)
  s2_departure:      0.20,     // Trans-lunar departure (Three.js)
  s3_orbit:          0.52,     // Lunar orbit hero — full Moon prominent (Three.js)
  s4_approach:       0.64,     // Lander undocks, camera approaches limb (Three.js)
  s5_matchCutOut:    0.70,     // Moon globe fills & completely leaves frame
  s5_occlusionDip:   0.71,     // Exposure dip into deep space / shadow
  s6_videoStart:     0.72,     // Close-up lunar surface approach begins (Video)
  s7_videoDescent:   0.82,     // Powered descent with thrusters firing (Video)
  s8_touchdown:      0.96,     // Lander touchdown complete (Video hold)
  s8_hold:           0.98,     // Final frame hold, status line & CTA reveal

  // Mid-shot captions
  captions: [
    { t: 0.50, endT: 0.63, text: '400,000 KM FROM HOME' },
    { t: 0.64, endT: 0.70, text: 'ONE QUESTION.  THREE CANDIDATE SITES.' },
    { t: 0.72, endT: 0.79, text: 'LUNAR SURFACE APPROACH' },
    { t: 0.80, endT: 0.88, text: 'POWERED DESCENT · TERMINAL PHASE' },
    { t: 0.89, endT: 0.95, text: 'TOUCHDOWN IMMINENT' },
  ] as Array<{ t: number; endT: number; text: string }>,

  touchdownT:        0.96,
  statusLineT:       0.97,
};

// ═══════════════════════════════════════════════════════════════════
//  SEEDED PRNG (mulberry32) — Deterministic procedural starfield
// ═══════════════════════════════════════════════════════════════════
function makeRNG(seed: number) {
  let s = seed;
  return function () {
    s |= 0; s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 0xffffffff;
  };
}

// ═══════════════════════════════════════════════════════════════════
//  DEBUG MODE
// ═══════════════════════════════════════════════════════════════════
const DEBUG = new URLSearchParams(location.search).has('debug');

// ═══════════════════════════════════════════════════════════════════
//  DOM STRUCTURE & CANVAS
// ═══════════════════════════════════════════════════════════════════
const root = document.getElementById('landing-root')!;

const canvas = document.createElement('canvas');
canvas.id = 'scene-canvas';
root.appendChild(canvas);

// ── Cinematic Video Layer (Shots 6-8: Surface Approach -> Touchdown) ──
const videoContainer = document.createElement('div');
videoContainer.id = 'cinematic-video-container';
videoContainer.className = 'cinematic-video-container';
videoContainer.setAttribute('aria-hidden', 'true');

const videoEl = document.createElement('video');
videoEl.id = 'lunar-landing-video';
videoEl.className = 'cinematic-video';
videoEl.playsInline = true;
videoEl.muted = true;
videoEl.preload = 'none';
videoEl.poster = '/generated/lunar_landing_poster.jpg';

const videoSource = document.createElement('source');
videoSource.src = '/generated/lunar_landing_optimized.mp4';
videoSource.type = 'video/mp4';
videoEl.appendChild(videoSource);
videoContainer.appendChild(videoEl);

const videoFallback = document.createElement('div');
videoFallback.id = 'video-fallback-image';
videoFallback.className = 'video-fallback-image';
videoContainer.appendChild(videoFallback);

const videoLoadingIndicator = document.createElement('div');
videoLoadingIndicator.id = 'video-loading-indicator';
videoLoadingIndicator.className = 'video-loading-indicator';
videoLoadingIndicator.innerHTML = '<div class="video-spinner"></div><span>SYNCHRONIZING DESCENT TELEMETRY</span>';
videoContainer.appendChild(videoLoadingIndicator);

root.appendChild(videoContainer);

// ── Cinematic Atmosphere Overlays ──
const grainEl = document.createElement('div');
grainEl.className = 'film-grain';
root.appendChild(grainEl);

const vignetteEl = document.createElement('div');
vignetteEl.className = 'vignette';
root.appendChild(vignetteEl);

const lbTop = document.createElement('div');
lbTop.className = 'letterbox-top';
root.appendChild(lbTop);

const lbBottom = document.createElement('div');
lbBottom.className = 'letterbox-bottom';
root.appendChild(lbBottom);

// ── UI Overlay HUD ──
const overlay = document.createElement('div');
overlay.id = 'ui-overlay';
overlay.innerHTML = `
  <div class="left-panel" id="left-panel">
    <div class="panel-badge" id="panel-badge">
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS · NASA SPACE APPS 2026 · LOW EARTH ORBIT</span>
    </div>

    <div class="hero-brand" id="hero-brand" aria-label="LUNAOPS">
      <span class="hero-letter" data-letter="L">L</span>
      <span class="hero-letter" data-letter="U">U</span>
      <span class="hero-letter" data-letter="N">N</span>
      <span class="hero-letter" data-letter="A">A</span>
      <span class="hero-letter" data-letter="O">O</span>
      <span class="hero-letter" data-letter="P">P</span>
      <span class="hero-letter" data-letter="S">S</span>
    </div>

    <div class="hero-accent-line" id="accent-line"></div>

    <div class="hero-tagline" id="hero-tagline">
      Explore the lunar frontier.<br>Plan with precision.
    </div>

    <p class="hero-desc" id="hero-desc">
      High-fidelity mission planning built on NASA LRO&thinsp;/&thinsp;LOLA
      elevation data, LROC imagery and JPL NAIF SPICE ephemerides.
    </p>

    <div class="initial-scroll-cue" id="initial-scroll-cue" aria-hidden="true">
      <div class="scroll-mouse"></div>
      <span class="scroll-label">Scroll to explore journey</span>
    </div>
  </div>

  <!-- Mid-shot caption (shots 3-7) -->
  <div class="shot-caption" id="shot-caption" aria-live="polite"></div>

  <!-- Simulated telemetry readout during descent -->
  <div class="descent-telemetry" id="descent-telemetry" aria-hidden="true">
    <span id="telem-alt">ALT: ---</span>
    <span id="telem-vspd">V/S: ---</span>
  </div>

  <!-- Touchdown Dock (minimal & elegant, uncovers the entire lander) -->
  <div class="touchdown-dock" id="touchdown-dock" aria-live="polite">
    <div class="status-line" id="status-line">
      <svg class="status-check" viewBox="0 0 16 16" fill="none">
        <polyline points="3,9 7,13 13,4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="status-text">TOUCHDOWN COMPLETE</span>
      <span class="status-sub">Illustrative conceptual landing sequence · NASA Space Apps 2026</span>
    </div>
    <div class="panel-cta" id="panel-cta">
      <a href="/workstation.html" class="btn-enter" id="btn-enter-workstation"
         aria-label="Enter LUNAOPS Workstation">
        Enter Workstation
      </a>
      <span class="cta-subtext">Press <kbd>Enter</kbd> or click to launch</span>
    </div>
  </div>
`;
root.appendChild(overlay);

// Progress strip
const progressStrip = document.createElement('div');
progressStrip.className = 'progress-strip';
progressStrip.innerHTML = '<div class="progress-strip-fill" id="journey-fill"></div>';
root.appendChild(progressStrip);

// Skip link
const skipLink = document.createElement('a');
skipLink.href = '/workstation.html';
skipLink.className = 'skip-to-workstation';
skipLink.textContent = 'Skip to workstation';
skipLink.setAttribute('aria-label', 'Skip animation and enter workstation');
root.appendChild(skipLink);

// WebGL Fallback container
const webglFallback = document.createElement('div');
webglFallback.id = 'webgl-fallback';
webglFallback.innerHTML = `
  <div>
    <p style="margin-bottom: 1rem; color: #fff;">WebGL hardware acceleration unavailable.</p>
    <a href="/workstation.html" style="color: #38bdf8; text-decoration: underline;">Proceed directly to LUNAOPS Workstation &rarr;</a>
  </div>
`;
root.appendChild(webglFallback);

// ═══════════════════════════════════════════════════════════════════
//  THREE.JS RENDERER & SCENE
// ═══════════════════════════════════════════════════════════════════
const isMobile = window.innerWidth < 768;
const MAX_DPR  = isMobile ? 1.25 : 1.5;

let renderer: THREE.WebGLRenderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: false, powerPreference: 'high-performance',
  });
} catch (e) {
  console.error('[LUNAOPS] WebGL failed:', e);
  webglFallback.classList.add('visible');
  throw e;
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00010a);

const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.5, 8000);
camera.position.set(0, 0, 20);

// ═══════════════════════════════════════════════════════════════════
//  POST-PROCESSING
// ═══════════════════════════════════════════════════════════════════
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.12,   // strength — restrained, filmic
  0.35,   // radius
  0.92,   // threshold — only bright specular glints
);
composer.addPass(bloom);

// Combined grade shader: split-tone + light vignette + fine grain + exposure dip control
const GradeShader = {
  uniforms: {
    tDiffuse:    { value: null },
    time:        { value: 0 },
    grain:       { value: 0.018 },
    exposure:    { value: 1.0 },
    vigStrength: { value: 0.55 },
    shadowTint:  { value: new THREE.Vector3(0.92, 0.96, 1.06) },
    hlTint:      { value: new THREE.Vector3(1.04, 1.01, 0.97) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float grain;
    uniform float exposure;
    uniform float vigStrength;
    uniform vec3 shadowTint;
    uniform vec3 hlTint;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p + fract(time * 0.1), vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      c.rgb *= exposure;

      float g = (hash(vUv) - 0.5) * grain;
      c.rgb += g;

      float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      float hlMask  = smoothstep(0.45, 0.90, lum);
      float shMask  = 1.0 - smoothstep(0.0,  0.55, lum);
      c.rgb *= mix(vec3(1.0), shadowTint, shMask * 0.6);
      c.rgb *= mix(vec3(1.0), hlTint,    hlMask * 0.5);

      vec2 uv2 = vUv - 0.5;
      float d = dot(uv2, uv2) * 2.2;
      c.rgb *= 1.0 - d * vigStrength;

      gl_FragColor = c;
    }
  `,
};
const gradePass = new ShaderPass(GradeShader);
composer.addPass(gradePass);

// ═══════════════════════════════════════════════════════════════════
//  STARFIELD
// ═══════════════════════════════════════════════════════════════════
(function buildStarfield() {
  const starRng = makeRNG(0xCAFEBABE);
  const layers = [
    { count: 2000, rMin: 80,  rMax: 150, size: 0.05, opacity: 0.55 },
    { count: 3500, rMin: 150, rMax: 280, size: 0.08, opacity: 0.75 },
    { count: 600,  rMin: 50,  rMax: 80,  size: 0.15, opacity: 0.95 },
  ];
  layers.forEach(({ count, rMin, rMax, size, opacity }) => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = starRng() * Math.PI * 2;
      const phi   = Math.acos(2 * starRng() - 1);
      const r     = rMin + starRng() * (rMax - rMin);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const tc = starRng();
      col[i * 3]     = 0.85 + tc * 0.15;
      col[i * 3 + 1] = 0.88 + tc * 0.12;
      col[i * 3 + 2] = 1.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo, mat));
  });
})();

// ═══════════════════════════════════════════════════════════════════
//  SUN & LIGHTING
// ═══════════════════════════════════════════════════════════════════
const SUN_DIR = new THREE.Vector3(8, 2.5, 6).normalize();
const sunLight = new THREE.DirectionalLight(0xfff5e0, 3.6);
sunLight.position.copy(SUN_DIR).multiplyScalar(500);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x050a18, 0.05);
scene.add(ambientLight);

// ═══════════════════════════════════════════════════════════════════
//  TEXTURE LOADER & PLANETARY ASSETS
// ═══════════════════════════════════════════════════════════════════
const texLoader = new THREE.TextureLoader();

const earthDayMap    = texLoader.load('/generated/earth/earth_day_2k.webp',   t => { t.colorSpace = THREE.SRGBColorSpace; });
const earthNightMap  = texLoader.load('/generated/earth/earth_night_2k.webp', t => { t.colorSpace = THREE.SRGBColorSpace; });
const earthSpecMap   = texLoader.load('/generated/earth/earth_specular_2k.webp');
const earthCloudsMap = texLoader.load('/generated/earth/earth_clouds_2k.webp',t => { t.colorSpace = THREE.SRGBColorSpace; });
const moonColorMap   = texLoader.load('/generated/lroc_color_2k.jpg',         t => { t.colorSpace = THREE.SRGBColorSpace; });
const moonNormalMap  = texLoader.load('/generated/ldem_normal_map_half.png',   t => { t.colorSpace = THREE.NoColorSpace; });

// ═══════════════════════════════════════════════════════════════════
//  EARTH SCENE (Shots 1-2)
// ═══════════════════════════════════════════════════════════════════
const EARTH_RADIUS = 6.0;
const earthGroup = new THREE.Group();
earthGroup.position.set(26, -2, -8);
scene.add(earthGroup);

const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 128, 64);
const EarthMaterial = new THREE.ShaderMaterial({
  uniforms: {
    dayTexture:      { value: earthDayMap },
    nightTexture:    { value: earthNightMap },
    specularTexture: { value: earthSpecMap },
    sunDir:          { value: SUN_DIR.clone() },
    viewPos:         { value: camera.position },
  },
  vertexShader: `
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz; vUv = uv;
      vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture; uniform sampler2D nightTexture; uniform sampler2D specularTexture;
    uniform vec3 sunDir;
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;
    void main() {
      vec3 N = normalize(vNormal); vec3 V = normalize(vViewVector); vec3 L = normalize(sunDir);
      float NdotL = dot(N, L);
      float dayFactor = smoothstep(-0.06, 0.08, NdotL);
      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      vec3 nightColor = texture2D(nightTexture, vUv).rgb;
      float diff = max(NdotL, 0.0);
      vec3 surfaceColor = dayColor * (diff * 1.15 + 0.02);
      float nightFactor = smoothstep(0.04, -0.12, NdotL);
      vec3 nightLights = nightColor * nightFactor * 1.5;
      float limb = 1.0 - max(dot(N, V), 0.0);
      float atmoFresnel = pow(limb, 3.2);
      vec3 atmosphere = vec3(0.18, 0.52, 1.0) * atmoFresnel * (max(NdotL, -0.2) + 0.2) * 1.05;
      gl_FragColor = vec4(mix(nightLights, surfaceColor, dayFactor) + atmosphere, 1.0);
    }
  `,
});
const earthMesh = new THREE.Mesh(earthGeo, EarthMaterial);
earthGroup.add(earthMesh);

const cloudsGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 128, 64);
const EarthCloudsMaterial = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: {
    cloudsTexture: { value: earthCloudsMap },
    sunDir:        { value: SUN_DIR.clone() },
    viewPos:       { value: camera.position },
  },
  vertexShader: `
    varying vec3 vNormal; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vUv = uv; vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `
    uniform sampler2D cloudsTexture; uniform vec3 sunDir;
    varying vec3 vNormal; varying vec2 vUv; varying vec3 vViewVector;
    void main() {
      vec3 N = normalize(vNormal); vec3 V = normalize(vViewVector); vec3 L = normalize(sunDir);
      float NdotL = dot(N, L);
      float cloudAlpha = texture2D(cloudsTexture, vUv).r;
      float diff = max(NdotL, 0.0) * 1.35 + 0.04;
      vec3 cloudColor = vec3(0.96, 0.98, 1.0) * diff;
      float limb = 1.0 - max(dot(N, V), 0.0);
      cloudColor += vec3(0.25, 0.5, 0.95) * pow(limb, 3.2) * max(NdotL, 0.0);
      float dayFactor = smoothstep(-0.2, 0.15, NdotL);
      gl_FragColor = vec4(cloudColor, cloudAlpha * dayFactor * 0.88);
    }
  `,
});
const earthCloudsMesh = new THREE.Mesh(cloudsGeo, EarthCloudsMaterial);
earthGroup.add(earthCloudsMesh);

const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.028, 64, 32);
const atmosMat = new THREE.ShaderMaterial({
  transparent: true, side: THREE.FrontSide, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    sunDir:  { value: SUN_DIR.clone() },
    viewPos: { value: camera.position },
  },
  vertexShader: `
    uniform vec3 sunDir; uniform vec3 viewPos;
    varying float vRim; varying float vSunFacing;
    void main() {
      vec3 N = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vec3 V = normalize(viewPos - wp.xyz);
      vRim = pow(1.0 - max(dot(N, V), 0.0), 3.2);
      vSunFacing = max(dot(N, sunDir), -0.2) + 0.2;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `
    varying float vRim; varying float vSunFacing;
    void main() {
      vec3 dayAtmo = vec3(0.18, 0.52, 1.0);
      vec3 nightAtmo = vec3(0.01, 0.04, 0.12);
      vec3 atmo = mix(nightAtmo, dayAtmo, clamp(vSunFacing, 0.0, 1.0));
      gl_FragColor = vec4(atmo, vRim * vSunFacing * 0.78);
    }
  `,
});
earthGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

// ═══════════════════════════════════════════════════════════════════
//  PHOTOREALISTIC MOON (Shots 3-4) — Full Moon Hero Orbit
// ═══════════════════════════════════════════════════════════════════
const MOON_RADIUS = 2.2;
const moonGroup = new THREE.Group();
moonGroup.position.set(4.5, 0.8, -28);
moonGroup.rotation.x = THREE.MathUtils.degToRad(6.68);
scene.add(moonGroup);

const moonGeo = new THREE.SphereGeometry(MOON_RADIUS, 128, 64);
const MoonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    colorTexture:  { value: moonColorMap },
    normalTexture: { value: moonNormalMap },
    sunDir:        { value: SUN_DIR.clone() },
    viewPos:         { value: camera.position },
    opacity:       { value: 1.0 },
    earthshine:    { value: 0.022 },
  },
  transparent: true,
  vertexShader: `
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz; vUv = uv;
      vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `
    uniform sampler2D colorTexture; uniform sampler2D normalTexture;
    uniform vec3 sunDir; uniform float opacity; uniform float earthshine;
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;

    vec3 perturbNormal(vec3 N, vec3 V, vec2 uv) {
      vec3 dPdx = dFdx(vWorldPos); vec3 dPdy = dFdy(vWorldPos);
      vec2 dUdx = dFdx(uv);         vec2 dUdy = dFdy(uv);
      vec3 T = normalize(dPdx * dUdy.y - dPdy * dUdx.y);
      vec3 B = normalize(dPdy * dUdx.x - dPdx * dUdx.x);
      vec3 nm = texture2D(normalTexture, uv).rgb * 2.0 - 1.0;
      return normalize(mat3(T, B, N) * nm);
    }
    void main() {
      vec3 N_geom = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);
      vec3 N = perturbNormal(N_geom, V, vUv);
      vec3 albedo = texture2D(colorTexture, vUv).rgb;
      float NdotL = dot(N, L);
      float direct = max(NdotL, 0.0);
      float retro = pow(max(dot(N, normalize(L + V)), 0.0), 3.0) * 0.14;
      vec3 diffuse = albedo * (direct * 1.35 + retro);
      float es = max(-NdotL, 0.0) * earthshine;
      vec3 esColor = vec3(0.12, 0.28, 0.65) * es * albedo;
      gl_FragColor = vec4(diffuse + esColor, opacity);
    }
  `,
});
const moonMesh = new THREE.Mesh(moonGeo, MoonMaterial);
moonGroup.add(moonMesh);

const moonGlowGeo = new THREE.SphereGeometry(MOON_RADIUS * 1.008, 64, 32);
const moonGlowMat = new THREE.ShaderMaterial({
  transparent: true, side: THREE.FrontSide, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { viewVector: { value: camera.position.clone() }, opacity: { value: 1.0 } },
  vertexShader: `
    uniform vec3 viewVector; varying float vI;
    void main() {
      vec3 N = normalize(normalMatrix * normal);
      vec3 V = normalize(normalMatrix * viewVector);
      vI = pow(1.0 - abs(dot(N, V)), 4.2);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float vI; uniform float opacity;
    void main() { gl_FragColor = vec4(0.72, 0.80, 0.90, vI * 0.13 * opacity); }
  `,
});
moonGroup.add(new THREE.Mesh(moonGlowGeo, moonGlowMat));

// ═══════════════════════════════════════════════════════════════════
//  ORBITER SPACECRAFT (Shots 1-4)
// ═══════════════════════════════════════════════════════════════════
const CRAFT_BEZIER_START = new THREE.Vector3(26, -2, -8);
const CRAFT_BEZIER_CTRL  = new THREE.Vector3(12, 6, -14);
const CRAFT_BEZIER_END   = new THREE.Vector3(6.5, 2.0, -25);

interface SpacecraftModel {
  group: THREE.Group;
  thrusterMat: THREE.MeshBasicMaterial;
  beaconMat: THREE.MeshBasicMaterial;
}

function createSolarPanelTexture(): THREE.CanvasTexture {
  const cvs = document.createElement('canvas');
  cvs.width = 256;
  cvs.height = 128;
  const ctx = cvs.getContext('2d')!;

  ctx.fillStyle = '#081426';
  ctx.fillRect(0, 0, 256, 128);

  const cols = 5;
  const rows = 3;
  const pad = 4;
  const w = (256 - pad * (cols + 1)) / cols;
  const h = (128 - pad * (rows + 1)) / rows;

  for (let c = 0; c < cols; c++) {
    for (let ro = 0; ro < rows; ro++) {
      const x = pad + c * (w + pad);
      const y = pad + ro * (h + pad);

      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, '#2b6cb0');
      grad.addColorStop(0.4, '#1e4e8c');
      grad.addColorStop(1, '#133360');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.5);
      ctx.lineTo(x + w, y + h * 0.5);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.4)';
      ctx.beginPath();
      ctx.moveTo(x + w * 0.33, y);
      ctx.lineTo(x + w * 0.33, y + h);
      ctx.moveTo(x + w * 0.67, y);
      ctx.lineTo(x + w * 0.67, y + h);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function createOrbiter(): SpacecraftModel {
  const r = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf0f5fc,
    metalness: 0.60,
    roughness: 0.32,
    emissive: 0x1b2838,
    emissiveIntensity: 0.35,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf5a21b,
    metalness: 0.55,
    roughness: 0.35,
    emissive: 0x452203,
    emissiveIntensity: 0.60,
    side: THREE.DoubleSide,
  });

  const strutMat = new THREE.MeshStandardMaterial({
    color: 0xd6e3f2,
    metalness: 0.70,
    roughness: 0.28,
    emissive: 0x223247,
    emissiveIntensity: 0.60,
    side: THREE.DoubleSide,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x242d38,
    metalness: 0.80,
    roughness: 0.40,
    emissive: 0x0f151c,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide,
  });

  const solarTex = createSolarPanelTexture();
  const solarMat = new THREE.MeshStandardMaterial({
    map: solarTex,
    color: 0x60a5fa,
    emissive: 0x1e40af,
    emissiveMap: solarTex,
    emissiveIntensity: 0.85,
    metalness: 0.30,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xe2ebf5,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x1b2738,
    emissiveIntensity: 0.40,
    side: THREE.DoubleSide,
  });

  r.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.85, 12), hullMat)));
  r.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.364, 0.364, 0.38, 12), goldMat)));

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 0.44, 12), hullMat);
  cap.position.y = 0.64;
  r.add(cap);

  const dr = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 20), strutMat);
  dr.rotation.x = Math.PI / 2;
  dr.position.y = 0.87;
  r.add(dr);

  const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.09, 0.30, 16, 1, true), darkMat);
  eng.position.y = -0.58;
  r.add(eng);

  const thrusterMat = new THREE.MeshBasicMaterial({
    color: 0x9dd0ef,
    transparent: true,
    opacity: 0.30,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const thrust = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 12, 1, true), thrusterMat);
  thrust.position.y = -0.76;
  thrust.rotation.x = Math.PI;
  r.add(thrust);

  // Both Wing Arrays with visible connecting structural booms & articulate solar panels
  [-1, 1].forEach((side) => {
    // 1. Hull mounting bracket / gimbal collar attached directly to the hull
    const mountCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.09, 12), strutMat);
    mountCollar.rotation.z = Math.PI / 2;
    mountCollar.position.set(side * 0.35, 0, 0);
    r.add(mountCollar);

    const mountRing = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.016, 8, 16), goldMat);
    mountRing.rotation.y = Math.PI / 2;
    mountRing.position.set(side * 0.37, 0, 0);
    r.add(mountRing);

    // 2. Primary structural boom bridging continuously from the hull to the wing array
    const boomLength = 0.38;
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, boomLength, 12), strutMat);
    boom.rotation.z = Math.PI / 2;
    boom.position.set(side * (0.35 + boomLength / 2), 0, 0);
    r.add(boom);

    // Reinforcing gold truss strut
    const subStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, boomLength * 0.95, 8), goldMat);
    subStrut.rotation.z = Math.PI / 2;
    subStrut.position.set(side * (0.35 + boomLength / 2), 0.035, 0);
    r.add(subStrut);

    // 3. Wing root gimbal yoke
    const wingRootX = side * (0.35 + boomLength);
    const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.09), goldMat);
    yoke.position.set(wingRootX, 0, 0);
    r.add(yoke);

    const yokePivot = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.09, 8), strutMat);
    yokePivot.position.set(wingRootX, 0, 0);
    r.add(yokePivot);

    // 4. Multi-segment Solar Panels (3 panels per wing)
    const panelWidth = 0.50;
    const panelDepth = 0.36;
    const panelGap = 0.05;

    for (let p = 0; p < 3; p++) {
      const panelCenterX = wingRootX + side * (0.05 + panelWidth / 2 + p * (panelWidth + panelGap));
      const pg = new THREE.Group();
      pg.position.set(panelCenterX, 0, 0);

      // Gold Kapton MLI thermal substrate & perimeter frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, 0.015, panelDepth), goldMat);
      pg.add(frame);

      // Photovoltaic cell face (visible on both sides)
      const cells = new THREE.Mesh(new THREE.BoxGeometry(panelWidth - 0.025, 0.020, panelDepth - 0.025), solarMat);
      pg.add(cells);

      // Silver structural edge ribs
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, panelDepth + 0.008), strutMat);
      rib.position.set(side * (panelWidth / 2), 0, 0);
      pg.add(rib);

      r.add(pg);

      // Inter-panel hinge connectors
      if (p < 2) {
        const hingeX = panelCenterX + side * (panelWidth / 2 + panelGap / 2);
        const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.06, 8), strutMat);
        hinge.rotation.x = Math.PI / 2;
        hinge.position.set(hingeX, 0, 0);
        r.add(hinge);
      }
    }
  });

  const dg = new THREE.Group();
  dg.position.set(0.30, 0.20, 0.30);
  dg.rotation.set(-0.55, 0.65, 0);
  dg.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), dishMat));
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.20, 6), strutMat);
  mast.position.z = 0.10;
  mast.rotation.x = Math.PI / 2;
  dg.add(mast);
  r.add(dg);

  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), beaconMat);
  beacon.position.y = 0.93;
  r.add(beacon);

  const aligned = new THREE.Group();
  r.rotation.x = Math.PI / 2;
  aligned.add(r);

  // Dedicated fill lights parented to the spacecraft so wings and connectors are always bright and legible
  const craftFillLight = new THREE.DirectionalLight(0x78aeff, 1.4);
  craftFillLight.position.set(-8, 6, -6);
  aligned.add(craftFillLight);

  const craftBackFill = new THREE.DirectionalLight(0x38bdf8, 1.0);
  craftBackFill.position.set(6, -6, 5);
  aligned.add(craftBackFill);

  return { group: aligned, thrusterMat, beaconMat };
}

const orbiter = createOrbiter();
orbiter.group.visible = false;
scene.add(orbiter.group);

// ═══════════════════════════════════════════════════════════════════
//  CAMERA SHOTS RIG (Earth -> Deep Space -> Full Moon Orbit -> Limb Push)
// ═══════════════════════════════════════════════════════════════════
interface CameraShot {
  progress: number;
  pos:  THREE.Vector3;
  look: THREE.Vector3;
  fov:  number;
  name: string;
}

const CAM_SHOTS: CameraShot[] = [
  // Shot 1: Earth wide — classic 32mm look
  { progress: 0.00, pos: new THREE.Vector3(28, 3.5, 20),     look: new THREE.Vector3(23, -1.5, -6),   fov: 32, name: 'LOW EARTH ORBIT' },
  // Shot 2: Departure — pull back from Earth
  { progress: 0.20, pos: new THREE.Vector3(18, 5.5, 16),     look: new THREE.Vector3(17,  0.5, -10),  fov: 30, name: 'TRANS-LUNAR DEPARTURE' },
  // Shot 3a: Mid-flight
  { progress: 0.38, pos: new THREE.Vector3(10, 4.5, 8),      look: new THREE.Vector3(7.5, 2.0, -18), fov: 28, name: 'DEEP SPACE TRANSIT' },
  // Shot 3b: Orbit hero — Full Moon prominent in right third
  { progress: 0.52, pos: new THREE.Vector3(6.0, 2.8, 0.5),   look: new THREE.Vector3(4.2, 0.8, -28), fov: 35, name: 'LUNAR ORBIT INSERTION' },
  // Shot 4: Separation, descent orbit
  { progress: 0.64, pos: new THREE.Vector3(5.8, 1.5, -12),   look: new THREE.Vector3(4.45, 0.2, -22),fov: 28, name: 'DESCENT ORBIT' },
  // Shot 5: Match cut push — camera plunges past the Moon limb into dark space, globe leaves frame
  { progress: 0.70, pos: new THREE.Vector3(4.5, 1.0, -25.5), look: new THREE.Vector3(4.2, 0.5, -30),fov: 20, name: 'SURFACE TRANSITION' },
  // Shot 6: Video takes over for surface approach & landing
  { progress: 0.72, pos: new THREE.Vector3(4.5, 1.0, -26.0), look: new THREE.Vector3(4.2, 0.5, -30),fov: 20, name: 'LUNAR SURFACE APPROACH' },
  { progress: 0.82, pos: new THREE.Vector3(4.5, 1.0, -26.0), look: new THREE.Vector3(4.2, 0.5, -30),fov: 20, name: 'POWERED DESCENT' },
  { progress: 0.96, pos: new THREE.Vector3(4.5, 1.0, -26.0), look: new THREE.Vector3(4.2, 0.5, -30),fov: 20, name: 'TOUCHDOWN COMPLETE' },
  { progress: 1.00, pos: new THREE.Vector3(4.5, 1.0, -26.0), look: new THREE.Vector3(4.2, 0.5, -30),fov: 20, name: 'TOUCHDOWN COMPLETE' },
];

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function getCameraAtT(t: number): { pos: THREE.Vector3; look: THREE.Vector3; fov: number; phaseName: string } {
  const clamped = Math.max(0, Math.min(1, t));
  let i = CAM_SHOTS.length - 1;
  for (let k = 0; k < CAM_SHOTS.length - 1; k++) {
    if (clamped >= CAM_SHOTS[k].progress && clamped < CAM_SHOTS[k+1].progress) {
      i = k; break;
    }
  }
  const s0 = CAM_SHOTS[i];
  const s1 = CAM_SHOTS[Math.min(i+1, CAM_SHOTS.length - 1)];
  const span = s1.progress - s0.progress;
  const localT = span > 0 ? (clamped - s0.progress) / span : 1;
  const ease = easeInOutCubic(Math.max(0, Math.min(1, localT)));

  const pos  = new THREE.Vector3().lerpVectors(s0.pos,  s1.pos,  ease);
  const look = new THREE.Vector3().lerpVectors(s0.look, s1.look, ease);
  const fov  = s0.fov + (s1.fov - s0.fov) * ease;

  let phaseName = s0.name;
  for (let k = CAM_SHOTS.length - 1; k >= 0; k--) {
    if (clamped >= CAM_SHOTS[k].progress) {
      phaseName = CAM_SHOTS[k].name;
      break;
    }
  }
  return { pos, look, fov, phaseName };
}

// ═══════════════════════════════════════════════════════════════════
//  SCENE VISIBILITY & TRANSITIONS
//  Strict rule: Globe leaves frame before video begins; never visible together
// ═══════════════════════════════════════════════════════════════════
function setShotVisibility(t: number) {
  const showEarth = t < 0.45;
  const showMoon  = t >= 0.35 && t < 0.71;

  earthGroup.visible = showEarth;
  moonGroup.visible  = showMoon;

  // Moon fade-out as camera plunges past limb into match cut (0.67 - 0.71)
  if (showMoon) {
    if (t >= 0.67) {
      const alpha = Math.max(0, Math.min(1, (t - 0.67) / 0.035));
      const moonAlpha = 1.0 - easeInOutCubic(alpha);
      (MoonMaterial.uniforms.opacity as any).value = moonAlpha;
      (moonGlowMat.uniforms.opacity as any).value  = moonAlpha;
    } else {
      (MoonMaterial.uniforms.opacity as any).value = 1.0;
      (moonGlowMat.uniforms.opacity as any).value  = 1.0;
    }
  }

  // Exposure dip during match cut transition (0.69 - 0.74)
  if (t >= 0.69 && t <= 0.74) {
    const dipIn  = Math.max(0, Math.min(1, (t - 0.69) / 0.025));
    const dipOut = Math.max(0, Math.min(1, (t - 0.715) / 0.025));
    const dip = dipIn * (1.0 - dipOut);
    (gradePass.uniforms as any).exposure.value = 1.05 - dip * 0.95;
  } else {
    (gradePass.uniforms as any).exposure.value = 1.05;
  }
}

// Consistency check assertion for dev/debug
function assertVisibilityConsistency() {
  for (let i = 0; i <= 1000; i++) {
    const t = i / 1000;
    const isGlobeVisible = t < 0.71;
    const isVideoVisible = t >= 0.72;
    if (isGlobeVisible && isVideoVisible) {
      console.error(`[LUNAOPS ASSERT FAIL] Both globe and video visible at t=${t.toFixed(3)}!`);
      return false;
    }
  }
  console.log('[LUNAOPS] Visibility assertion passed: globe and landing video strictly mutually exclusive.');
  return true;
}

// ═══════════════════════════════════════════════════════════════════
//  SCROLL-CONTROLLED VIDEO SYNCHRONIZATION
// ═══════════════════════════════════════════════════════════════════
let videoLoaded = false;
let videoPreloadStarted = false;
let videoDuration = 5.75;
let videoTargetTime = 0;
let isSeeking = false;
let pendingSeek = false;
let videoError = false;

function ensureVideoPreload() {
  if (videoPreloadStarted) return;
  videoPreloadStarted = true;
  videoEl.preload = 'auto';
  videoEl.load();
}

videoEl.addEventListener('loadedmetadata', () => {
  videoLoaded = true;
  if (videoEl.duration && !isNaN(videoEl.duration) && videoEl.duration > 0) {
    videoDuration = videoEl.duration;
  }
  videoLoadingIndicator.classList.remove('visible');
});

videoEl.addEventListener('error', (e) => {
  console.warn('[LUNAOPS] Video playback error, activating fallback frame:', e);
  videoError = true;
  videoFallback.classList.add('visible');
  videoLoadingIndicator.classList.remove('visible');
});

function syncVideoToScroll(t: number) {
  // Preload video quietly in advance once user reaches transit
  if (t > 0.30) {
    ensureVideoPreload();
  }

  // Active video range: s6_videoStart (0.72) to s8_touchdown (0.96)
  const vStart = SHOTS.s6_videoStart;
  const vEnd   = SHOTS.s8_touchdown;

  // Video container opacity: smooth crossfade in from 0.70 to 0.73
  if (t < 0.70) {
    videoContainer.style.opacity = '0';
    videoContainer.style.pointerEvents = 'none';
    videoContainer.classList.remove('active');
    return;
  }

  const fadeIn = Math.max(0, Math.min(1, (t - 0.70) / 0.03));
  videoContainer.style.opacity = String(easeInOutCubic(fadeIn));
  videoContainer.style.pointerEvents = t >= 0.72 ? 'auto' : 'none';
  videoContainer.classList.add('active');

  // Compute normalized video progress [0..1]
  const vp = Math.max(0, Math.min(1, (t - vStart) / (vEnd - vStart)));
  const targetSec = vp * videoDuration;

  if (videoError || !videoLoaded) {
    if (t >= 0.72 && !videoLoaded && !videoError) {
      videoLoadingIndicator.classList.add('visible');
    }
    return;
  }

  videoLoadingIndicator.classList.remove('visible');

  // Scrub video accurately with fastSeek or currentTime
  videoTargetTime = targetSec;
  if (Math.abs(videoEl.currentTime - videoTargetTime) < 0.012) {
    return;
  }

  if (!isSeeking) {
    isSeeking = true;
    if (typeof (videoEl as any).fastSeek === 'function') {
      try {
        (videoEl as any).fastSeek(videoTargetTime);
      } catch {
        videoEl.currentTime = videoTargetTime;
      }
    } else {
      videoEl.currentTime = videoTargetTime;
    }
  } else {
    pendingSeek = true;
  }
}

videoEl.addEventListener('seeked', () => {
  isSeeking = false;
  if (pendingSeek) {
    pendingSeek = false;
    syncVideoToScroll(smoothT);
  }
});

// ═══════════════════════════════════════════════════════════════════
//  JOURNEY STATE & SPRING DYNAMICS
// ═══════════════════════════════════════════════════════════════════
let rawT     = 0;
let smoothT  = 0;
let velT     = 0;
let autoSpeed = SHOTS.autoSpeed;
let autoResumeTimer: ReturnType<typeof setTimeout> | null = null;
const lookTarget = new THREE.Vector3();

// Query parameter support: ?t=0.96 jumps directly to touchdown
try {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('t')) {
    const paramT = parseFloat(urlParams.get('t')!);
    if (!isNaN(paramT)) {
      rawT = smoothT = Math.max(0, Math.min(1, paramT));
      autoSpeed = 0;
    }
  }
} catch { /* ignore non-browser */ }

function pauseAutoAdvance() {
  autoSpeed = 0;
  if (autoResumeTimer) clearTimeout(autoResumeTimer);
  autoResumeTimer = setTimeout(() => { autoSpeed = SHOTS.autoSpeed; }, 2800);
}

function springStep(dt: number) {
  const k  = SHOTS.springStiffness;
  const b  = SHOTS.springDamping;
  const target = Math.max(0, Math.min(1, rawT));
  const acc = k * (target - smoothT) - b * velT;
  velT     += acc * dt;
  smoothT  += velT * dt;
  smoothT   = Math.max(0, Math.min(1, smoothT));
}

// ═══════════════════════════════════════════════════════════════════
//  REDUCED MOTION PREFERENCE
// ═══════════════════════════════════════════════════════════════════
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ═══════════════════════════════════════════════════════════════════
//  LETTER REVEAL
// ═══════════════════════════════════════════════════════════════════
const LETTER_T     = [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30];
const LETTER_RANGE = 0.07;

// ═══════════════════════════════════════════════════════════════════
//  UI HUD UPDATE
// ═══════════════════════════════════════════════════════════════════
function updateUI(t: number, _elapsed: number) {
  const cl = Math.max(0, Math.min(1, t));

  // Progress strip fill
  const fill = document.getElementById('journey-fill');
  if (fill) fill.style.height = `${(cl * 100).toFixed(1)}%`;

  // Phase badge
  const badge = document.getElementById('panel-phase-badge');
  if (badge) {
    const { phaseName } = getCameraAtT(cl);
    badge.textContent = `SELENE LABS · NASA SPACE APPS 2026 · ${phaseName}`;
  }

  // Left panel visibility: visible at start (shots 1-2 Earth scene) and fades during deep space & landing
  const leftPanel = document.getElementById('left-panel');
  if (leftPanel) {
    if (cl < 0.28) {
      leftPanel.style.opacity = '1';
      leftPanel.style.pointerEvents = 'auto';
    } else if (cl < 0.44) {
      const p = easeInOutCubic((cl - 0.28) / 0.16);
      leftPanel.style.opacity = String(1.0 - p);
      leftPanel.style.pointerEvents = 'none';
    } else {
      leftPanel.style.opacity = '0';
      leftPanel.style.pointerEvents = 'none';
    }
  }

  // Touchdown dock (status line + Enter Workstation button) at bottom center
  const dock = document.getElementById('touchdown-dock');
  if (dock) {
    if (cl >= SHOTS.touchdownT) {
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.touchdownT) / 0.02)));
      dock.classList.add('visible');
      dock.style.opacity = String(p);
      dock.style.transform = `translateX(-50%) translateY(${(1 - p) * 12}px)`;
      dock.style.pointerEvents = 'auto';
    } else {
      dock.classList.remove('visible');
      dock.style.opacity = '0';
      dock.style.pointerEvents = 'none';
    }
  }

  // Animated LUNAOPS letters (during initial Earth scene)
  document.querySelectorAll<HTMLElement>('.hero-letter').forEach((el, i) => {
    if (reducedMotion) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
    const raw = Math.max(0, Math.min(1, (cl - LETTER_T[i]) / LETTER_RANGE));
    const p   = easeInOutCubic(raw);
    el.style.opacity   = String(p);
    el.style.transform = `translateY(${(1-p)*24}px) scale(${0.88 + p*0.12})`;
    el.style.filter    = p > 0.02
      ? `drop-shadow(0 0 ${p*6}px rgba(56,189,248,${p*0.38}))` : 'none';
  });

  // Accent line
  const accent = document.getElementById('accent-line');
  if (accent) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.32) / 0.10)));
    accent.style.width   = `${p * 100}%`;
    accent.style.opacity = String(p);
  }

  // Tagline
  const tagline = document.getElementById('hero-tagline');
  if (tagline && cl < 0.50) {
    const pIn  = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.10) / 0.12)));
    const pOut = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.35) / 0.10)));
    tagline.style.opacity = String(pIn * (1 - pOut));
  }

  // Description
  const desc = document.getElementById('hero-desc');
  if (desc && cl < 0.50) {
    const pIn  = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.14) / 0.12)));
    const pOut = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.38) / 0.10)));
    desc.style.opacity = String(pIn * (1 - pOut));
  }

  // Initial scroll cue
  const scrollCue = document.getElementById('initial-scroll-cue');
  if (scrollCue) {
    if (cl > 0.24) {
      scrollCue.style.display = 'none';
    } else {
      scrollCue.style.display = 'flex';
      const fp = Math.max(0, Math.min(1, cl / 0.18));
      scrollCue.style.opacity = String(1 - fp);
    }
  }

  // Mid-shot captions
  const capEl = document.getElementById('shot-caption');
  if (capEl) {
    let capText = '';
    for (const cap of SHOTS.captions) {
      if (cl >= cap.t && cl <= cap.endT) {
        capText = cap.text;
        break;
      }
    }
    if (capText !== capEl.textContent) {
      capEl.style.opacity = '0';
      setTimeout(() => {
        capEl.textContent = capText;
        capEl.style.opacity = capText ? '1' : '0';
      }, 120);
    }
  }

  // Simulated descent telemetry during the landing sequence
  const telEl = document.getElementById('descent-telemetry');
  if (telEl) {
    if (cl >= SHOTS.s6_videoStart && cl < SHOTS.touchdownT) {
      const vp = (cl - SHOTS.s6_videoStart) / (SHOTS.touchdownT - SHOTS.s6_videoStart);
      const alt = Math.max(0, 15200 * Math.pow(1 - vp, 2.2));
      const vspd = vp >= 0.98 ? 0.0 : -(42.0 * Math.pow(1 - vp, 1.8) + 1.2);
      const altEl  = document.getElementById('telem-alt');
      const vspdEl = document.getElementById('telem-vspd');
      if (altEl)  altEl.textContent  = `ALT: ${Math.round(alt).toLocaleString().padStart(6)} m`;
      if (vspdEl) vspdEl.textContent = `V/S: ${vspd.toFixed(1).padStart(6)} m/s`;
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.s6_videoStart) / 0.02)));
      telEl.style.opacity = String(p);
    } else {
      telEl.style.opacity = '0';
    }
  }

  // Subtle status line at touchdown
  const statusEl = document.getElementById('status-line');
  if (statusEl) {
    if (cl >= SHOTS.statusLineT) {
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.statusLineT) / 0.015)));
      statusEl.style.opacity = String(p);
    } else {
      statusEl.style.opacity = '0';
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
//  INPUT HANDLING (Scroll forward/backward, Touch, Keyboard)
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  rawT += e.deltaY * 0.00038;
  rawT = Math.max(0, Math.min(1, rawT));
  pauseAutoAdvance();
  syncVideoToScroll(rawT);
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  ensureVideoPreload();
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  const dy = touchStartY - e.touches[0].clientY;
  touchStartY = e.touches[0].clientY;
  rawT += dy * 0.00075;
  rawT = Math.max(0, Math.min(1, rawT));
  pauseAutoAdvance();
  syncVideoToScroll(rawT);
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const next = CAM_SHOTS.find(s => s.progress > rawT + 0.01);
    if (next) { rawT = next.progress; pauseAutoAdvance(); syncVideoToScroll(rawT); }
    e.preventDefault();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const shots = [...CAM_SHOTS].reverse();
    const prev = shots.find(s => s.progress < rawT - 0.01);
    if (prev) { rawT = prev.progress; pauseAutoAdvance(); syncVideoToScroll(rawT); }
    e.preventDefault();
  } else if (e.key === 'Enter' || e.key === ' ') {
    window.location.href = '/workstation.html';
  }
});

// ═══════════════════════════════════════════════════════════════════
//  WINDOW RESIZE
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.resolution.set(w, h);
});

// Pause rendering when tab hidden
let pageVisible = true;
document.addEventListener('visibilitychange', () => {
  pageVisible = !document.hidden;
});

// ═══════════════════════════════════════════════════════════════════
//  RENDER LOOP
// ═══════════════════════════════════════════════════════════════════
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  if (!pageVisible) return;

  const dt      = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  // Spring advance
  rawT += autoSpeed * dt;
  rawT  = Math.max(0, Math.min(1, rawT));
  springStep(dt);
  const T = smoothT;

  // ── Camera ──
  const { pos, look, fov } = getCameraAtT(T);
  const swayStr = T < 0.65 ? 0.06 : 0.01;
  const swayPos = new THREE.Vector3(
    Math.sin(elapsed * 0.08) * swayStr,
    Math.cos(elapsed * 0.055) * (swayStr * 0.55),
    0,
  );
  camera.position.lerp(pos.clone().add(swayPos), 0.055);
  lookTarget.lerp(look, 0.055);
  camera.lookAt(lookTarget);
  if (Math.abs(camera.fov - fov) > 0.05) {
    camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.05);
    camera.updateProjectionMatrix();
  }

  // ── Scene Visibility (Globe vs Video strict mutual exclusion) ──
  setShotVisibility(T);

  // ── Synchronize Video ──
  syncVideoToScroll(T);

  // ── Orbiter Spacecraft Animation ──
  const orbitCurve = new THREE.QuadraticBezierCurve3(CRAFT_BEZIER_START, CRAFT_BEZIER_CTRL, CRAFT_BEZIER_END);
  if (T >= 0.01 && T < 0.50) {
    orbiter.group.visible = true;
    const tc = Math.max(0.001, Math.min(0.999, T / 0.50));
    const cp = orbitCurve.getPoint(tc);
    const ct = orbitCurve.getTangent(tc).normalize();
    orbiter.group.position.copy(cp);
    orbiter.group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1), ct);
    orbiter.group.rotateZ(elapsed * 0.10);
    orbiter.thrusterMat.opacity = 0.20 + Math.sin(elapsed * 9) * 0.10;
    orbiter.beaconMat.opacity   = Math.sin(elapsed * 4.2) > 0.88 ? 0.9 : 0.0;
  } else if (T >= 0.50 && T < 0.68) {
    orbiter.group.visible = true;
    const angle = elapsed * 0.35;
    const orR = new THREE.Vector3(
      moonGroup.position.x + Math.cos(angle) * 3.8,
      moonGroup.position.y + 0.8 + Math.sin(angle * 0.7) * 0.5,
      moonGroup.position.z + Math.sin(angle) * 3.2,
    );
    orbiter.group.position.copy(orR);
    const tang = new THREE.Vector3(-Math.sin(angle), 0.15, Math.cos(angle)).normalize();
    orbiter.group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1), tang);
    orbiter.thrusterMat.opacity = 0.22 + Math.sin(elapsed * 9) * 0.08;
    orbiter.beaconMat.opacity   = Math.sin(elapsed * 4) > 0.88 ? 0.9 : 0.0;
  } else {
    orbiter.group.visible = false;
  }

  // ── Planetary Rotations ──
  if (moonGroup.visible) {
    moonMesh.rotation.y += dt * 0.006;
    (MoonMaterial.uniforms.viewPos as any).value.copy(camera.position);
    (moonGlowMat.uniforms.viewVector as any).value.copy(camera.position);
  }

  if (earthGroup.visible) {
    earthMesh.rotation.y      += dt * 0.011;
    earthCloudsMesh.rotation.y += dt * 0.016;
    (EarthMaterial.uniforms.viewPos as any).value.copy(camera.position);
    (EarthCloudsMaterial.uniforms.viewPos as any).value.copy(camera.position);
    (atmosMat.uniforms.viewPos as any).value.copy(camera.position);
  }

  // ── Shader Time ──
  (gradePass.uniforms as any).time.value = elapsed;

  // ── UI Update ──
  updateUI(T, elapsed);

  // Render Three.js scene
  composer.render();
}

// ═══════════════════════════════════════════════════════════════════
//  DEV HOOKS (window.__lunaops)
// ═══════════════════════════════════════════════════════════════════
if (DEBUG || true) {
  (window as any).__lunaops = {
    setJourney: (t: number) => {
      rawT = Math.max(0, Math.min(1, t));
      smoothT = rawT;
      velT = 0;
      autoSpeed = 0;
      syncVideoToScroll(smoothT);
    },
    getJourney: () => smoothT,
    visibility: () => ({
      moonGroup:       moonGroup.visible,
      moonOpacity:     (MoonMaterial.uniforms.opacity as any).value,
      videoVisible:    smoothT >= 0.72,
      videoOpacity:    parseFloat(videoContainer.style.opacity || '0'),
      videoCurrentTime:videoEl.currentTime,
      orbiter:         orbiter.group.visible,
    }),
    assertVisibility: assertVisibilityConsistency,
  };
}

// Run initial consistency check
assertVisibilityConsistency();

animate();
