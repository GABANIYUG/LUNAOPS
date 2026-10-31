/**
 * LUNAOPS — Cinematic Landing Page v2
 * Premium film-trailer-quality Earth-to-Moon-to-South-Pole journey.
 * SELENE LABS · NASA Space Apps 2026
 *
 * Architecture rules:
 *  - Pure function of smoothedT (critically-damped spring from raw scrollAccum)
 *  - seededRNG for all procedural generation — deterministic at any T
 *  - moonGroup and surfaceGroup NEVER both visible (assertion in debug mode)
 *  - 1 unit = 1 meter in surface scene; camera near 0.5, far 8000
 *  - All shot timings in SHOTS config
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './landing.css';

// ═══════════════════════════════════════════════════════════════════
//  SHOTS CONFIG — all timings and captions in one place
// ═══════════════════════════════════════════════════════════════════
const SHOTS = {
  scrollVH:          750,      // total scroll distance in vh units
  autoSpeed:         0.00065,  // journey units/sec slow drift
  springDamping:     8.5,      // critically-damped spring coefficient
  springStiffness:   60.0,

  // Shot boundaries [0..1]
  s1_earth:          0.00,     // Earth opening wide
  s2_departure:      0.20,     // Trans-lunar departure
  s3_orbit:          0.52,     // Lunar orbit hero — full Moon
  s4_separation:     0.64,     // Lander undocks, pole approach
  s5_transitionDip:  0.72,     // Scene swap inside exposure dip
  s5_surfaceIn:      0.76,     // Surface fades in
  s6_establishing:   0.78,     // Wide establishing, lander tiny dot
  s7_descent:        0.84,     // Powered descent, follow shot
  s7_legsOut:        0.92,     // Legs deploy
  s8_touchdown:      0.96,     // Contact + settle
  s8_hold:           0.99,     // Slow push-in, status line

  // Captions
  captions: [
    { t: 0.50, endT: 0.63, text: '400,000 KM FROM HOME' },
    { t: 0.64, endT: 0.72, text: 'DESTINATION: LUNAR SOUTH POLE' },
    { t: 0.76, endT: 0.83, text: 'SHACKLETON CRATER RIM · 89°54′S' },
    { t: 0.84, endT: 0.91, text: 'POWERED DESCENT · TERMINAL PHASE' },
    { t: 0.92, endT: 0.96, text: 'TOUCHDOWN IMMINENT · ALL SYSTEMS NOMINAL' },
  ] as Array<{ t: number; endT: number; text: string }>,

  // Moon-to-surface crossfade timing
  moonFadeStart:     0.72,
  moonFadeEnd:       0.76,

  // Lander
  landerStartT:      0.72,     // lander becomes active
  landerDescentEnd:  0.96,     // touchdown
  touchdownT:        0.96,
  statusLineT:       0.985,
};

// ═══════════════════════════════════════════════════════════════════
//  SEEDED PRNG (mulberry32) — deterministic, no Math.random at render time
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
//  CANVAS & RENDERER
// ═══════════════════════════════════════════════════════════════════
const root = document.getElementById('landing-root')!;
const canvas = document.createElement('canvas');
canvas.id = 'scene-canvas';
root.appendChild(canvas);

const isMobile = window.innerWidth < 768;
const MAX_DPR  = isMobile ? 1.25 : 1.5;

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, alpha: false, powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ═══════════════════════════════════════════════════════════════════
//  SCENE & CAMERA
// ═══════════════════════════════════════════════════════════════════
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00010a);

// Two cameras: space scene uses 32mm look, surface scene uses wider 50mm
const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.5, 8000);
camera.position.set(0, 0, 20);

// ═══════════════════════════════════════════════════════════════════
//  POST-PROCESSING
// ═══════════════════════════════════════════════════════════════════
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom: high threshold — only glints and emissives
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.12,   // strength — restrained
  0.35,   // radius
  0.92,   // threshold — only bright glints
);
composer.addPass(bloom);

// Combined grade shader: split-tone + light vignette + fine grain + tiny chroma AB
const GradeShader = {
  uniforms: {
    tDiffuse:    { value: null },
    time:        { value: 0 },
    grain:       { value: 0.018 },
    exposure:    { value: 1.0 },
    // Vignette params — lighter than before
    vigStrength: { value: 0.55 },
    // Split tone: cool shadows, neutral-warm highlights
    shadowTint:  { value: new THREE.Vector3(0.92, 0.96, 1.06) },
    hlTint:      { value: new THREE.Vector3(1.04, 1.01, 0.97) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
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

      // Fine grain
      float g = (hash(vUv) - 0.5) * grain;
      c.rgb += g;

      // Split tone
      float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      float hlMask  = smoothstep(0.45, 0.90, lum);
      float shMask  = 1.0 - smoothstep(0.0,  0.55, lum);
      c.rgb *= mix(vec3(1.0), shadowTint, shMask * 0.6);
      c.rgb *= mix(vec3(1.0), hlTint,    hlMask * 0.5);

      // Light vignette (radial, not elliptical to avoid heavy mud)
      vec2 uv2 = vUv - 0.5;
      float d = dot(uv2, uv2) * 2.2;
      c.rgb *= 1.0 - d * vigStrength;

      // Chromatic aberration completely removed to eliminate colored pixel specks

      gl_FragColor = c;
    }
  `,
};
const gradePass = new ShaderPass(GradeShader);
composer.addPass(gradePass);

// ═══════════════════════════════════════════════════════════════════
//  STARFIELD (restored from original git baseline)
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
      // Faint blue-white to pure white
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
//  GLOBAL SUN LIGHT (space scene)
// ═══════════════════════════════════════════════════════════════════
const SUN_DIR = new THREE.Vector3(8, 2.5, 6).normalize();
const sunLight = new THREE.DirectionalLight(0xfff5e0, 3.6);
sunLight.position.copy(SUN_DIR).multiplyScalar(500);
scene.add(sunLight);
const ambientLight = new THREE.AmbientLight(0x050a18, 0.05);
scene.add(ambientLight);

// ═══════════════════════════════════════════════════════════════════
//  TEXTURE LOADER & NASA ASSETS
// ═══════════════════════════════════════════════════════════════════
const texLoader = new THREE.TextureLoader();

const earthDayMap    = texLoader.load('/generated/earth/earth_day_2k.webp',   t => { t.colorSpace = THREE.SRGBColorSpace; });
const earthNightMap  = texLoader.load('/generated/earth/earth_night_2k.webp', t => { t.colorSpace = THREE.SRGBColorSpace; });
const earthSpecMap   = texLoader.load('/generated/earth/earth_specular_2k.webp');
const earthCloudsMap = texLoader.load('/generated/earth/earth_clouds_2k.webp',t => { t.colorSpace = THREE.SRGBColorSpace; });
const moonColorMap   = texLoader.load('/generated/lroc_color_2k.jpg',         t => { t.colorSpace = THREE.SRGBColorSpace; });
const moonNormalMap  = texLoader.load('/generated/ldem_normal_map_half.png',   t => { t.colorSpace = THREE.NoColorSpace; });

// ═══════════════════════════════════════════════════════════════════
//  EARTH (unchanged photorealistic model — shots 1-2)
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
//  MOON GROUP (shots 3-4) — larger, positioned for orbit hero shot
// ═══════════════════════════════════════════════════════════════════
const MOON_RADIUS = 2.2;  // bigger for orbit hero shot
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
    viewPos:       { value: camera.position },
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
//  ORBITER SPACECRAFT (shots 1-4)
// ═══════════════════════════════════════════════════════════════════
const CRAFT_BEZIER_START = new THREE.Vector3(26, -2, -8);
const CRAFT_BEZIER_CTRL  = new THREE.Vector3(12, 6, -14);
const CRAFT_BEZIER_END   = new THREE.Vector3(6.5, 2.0, -25);

interface SpacecraftModel {
  group: THREE.Group;
  thrusterMat: THREE.MeshBasicMaterial;
  beaconMat: THREE.MeshBasicMaterial;
}

function createOrbiter(): SpacecraftModel {
  // Scale: roughly 12m long, visible at arms-length scale
  const r = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({ color: 0xedf2f8, metalness: 0.65, roughness: 0.30 });
  const goldMat  = new THREE.MeshStandardMaterial({ color: 0xcf9e2a, metalness: 0.92, roughness: 0.18 });
  const darkMat  = new THREE.MeshStandardMaterial({ color: 0x181c22, metalness: 0.88, roughness: 0.42, side: THREE.DoubleSide });
  const solarMat = new THREE.MeshStandardMaterial({ color: 0x071528, metalness: 0.90, roughness: 0.12 });
  const dishMat  = new THREE.MeshStandardMaterial({ color: 0xd8dfe8, metalness: 0.88, roughness: 0.28, side: THREE.DoubleSide });

  // Bus
  r.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.85, 8), hullMat)));
  r.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.362, 0.362, 0.38, 8), goldMat)));

  // Capsule
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 0.44, 8), hullMat);
  cap.position.y = 0.64; r.add(cap);

  // Docking ring
  const dr = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 20), darkMat);
  dr.rotation.x = Math.PI / 2; dr.position.y = 0.87; r.add(dr);

  // Engine bell
  const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.09, 0.30, 16, 1, true), darkMat);
  eng.position.y = -0.58; r.add(eng);

  // Ion thruster — faint, small, not saturated blue
  const thrusterMat = new THREE.MeshBasicMaterial({
    color: 0x9dd0ef, transparent: true, opacity: 0.30,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
  });
  const thrust = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 12, 1, true), thrusterMat);
  thrust.position.y = -0.76; thrust.rotation.x = Math.PI; r.add(thrust);

  // Solar wings
  [-1, 1].forEach(side => {
    const wg = new THREE.Group();
    wg.position.set(side * 0.44, 0, 0);
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.28, 8), darkMat);
    boom.rotation.z = Math.PI / 2; boom.position.x = side * 0.14; wg.add(boom);
    for (let p = 0; p < 3; p++) {
      const pg = new THREE.Group(); pg.position.x = side * (0.34 + p * 0.52);
      pg.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.013, 0.31), goldMat)));
      pg.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.015, 0.28), solarMat)));
      wg.add(pg);
    }
    r.add(wg);
  });

  // Dish
  const dg = new THREE.Group();
  dg.position.set(0.30, 0.20, 0.30); dg.rotation.set(-0.55, 0.65, 0);
  dg.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), dishMat));
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.20, 6), darkMat);
  mast.position.z = 0.10; mast.rotation.x = Math.PI / 2; dg.add(mast);
  r.add(dg);

  // Strobe (tiny, parented to root, not a separate scene object)
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), beaconMat);
  beacon.position.y = 0.93; r.add(beacon);

  const aligned = new THREE.Group();
  r.rotation.x = Math.PI / 2;
  aligned.add(r);
  return { group: aligned, thrusterMat, beaconMat };
}

const orbiter = createOrbiter();
orbiter.group.visible = false;
scene.add(orbiter.group);

// ═══════════════════════════════════════════════════════════════════
//  TERRAIN HEIGHT FUNCTION — pure, deterministic, drives mesh+rocks
// ═══════════════════════════════════════════════════════════════════
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ═══════════════════════════════════════════════════════════════════
//  CRATERS & TOPOGRAPHY (22 stamp craters in 3 size classes, NO sine waves)
// ═══════════════════════════════════════════════════════════════════
interface CraterStamp {
  x: number;
  z: number;
  radius: number;     // rim radius in meters
  depth: number;      // bowl depth in meters
  rimHeight: number;  // raised rim height in meters
  rimWidth: number;   // rim crest width in meters
  ejectaRadius: number; // outer ejecta limit
  softness: number;   // degradation factor (0.1 to 0.5)
}

const CRATER_STAMPS: CraterStamp[] = [
  // Large size class (radius 20m - 34m, depth 5m - 9m)
  { x: -38, z: -44, radius: 30, depth: 7.8, rimHeight: 2.4, rimWidth: 6.5, ejectaRadius: 48, softness: 0.25 },
  { x: 50,  z: 34,  radius: 34, depth: 8.8, rimHeight: 2.8, rimWidth: 7.2, ejectaRadius: 52, softness: 0.35 },
  { x: -46, z: 30,  radius: 24, depth: 5.8, rimHeight: 1.9, rimWidth: 5.4, ejectaRadius: 40, softness: 0.40 },

  // Medium size class (radius 7.5m - 14m, depth 1.8m - 3.4m)
  { x: -18, z: 20,  radius: 12.0, depth: 2.8, rimHeight: 1.00, rimWidth: 3.0, ejectaRadius: 21, softness: 0.20 },
  { x: 24,  z: -16, radius: 13.5, depth: 3.2, rimHeight: 1.15, rimWidth: 3.4, ejectaRadius: 23, softness: 0.30 },
  { x: 14,  z: 28,  radius: 9.5,  depth: 2.3, rimHeight: 0.85, rimWidth: 2.5, ejectaRadius: 17, softness: 0.15 },
  { x: -26, z: -14, radius: 8.8,  depth: 2.1, rimHeight: 0.78, rimWidth: 2.3, ejectaRadius: 16, softness: 0.45 },
  { x: 36,  z: -34, radius: 14.5, depth: 3.5, rimHeight: 1.30, rimWidth: 3.6, ejectaRadius: 25, softness: 0.25 },
  { x: -10, z: -28, radius: 10.5, depth: 2.5, rimHeight: 0.90, rimWidth: 2.7, ejectaRadius: 19, softness: 0.30 },
  { x: 30,  z: 14,  radius: 8.0,  depth: 1.9, rimHeight: 0.70, rimWidth: 2.1, ejectaRadius: 15, softness: 0.35 },

  // Small size class (radius 2.2m - 5.0m, depth 0.5m - 1.2m)
  { x: -6.2, z: 9.2,  radius: 3.4, depth: 0.80, rimHeight: 0.30, rimWidth: 0.95, ejectaRadius: 7.0, softness: 0.15 },
  { x: 8.2,  z: -7.5, radius: 4.2, depth: 0.98, rimHeight: 0.36, rimWidth: 1.15, ejectaRadius: 8.5, softness: 0.10 },
  { x: 9.5,  z: 10.5, radius: 3.0, depth: 0.70, rimHeight: 0.26, rimWidth: 0.85, ejectaRadius: 6.0, softness: 0.20 },
  { x: -10.5,z: -8.5, radius: 3.8, depth: 0.88, rimHeight: 0.32, rimWidth: 1.05, ejectaRadius: 7.5, softness: 0.30 },
  { x: 16.0, z: -4.8, radius: 2.6, depth: 0.60, rimHeight: 0.24, rimWidth: 0.75, ejectaRadius: 5.4, softness: 0.15 },
  { x: -4.8, z:-16.5, radius: 5.0, depth: 1.15, rimHeight: 0.42, rimWidth: 1.35, ejectaRadius: 9.8, softness: 0.25 },
  { x: -14.0,z: 6.2,  radius: 3.2, depth: 0.75, rimHeight: 0.28, rimWidth: 0.88, ejectaRadius: 6.5, softness: 0.20 },
  { x: 6.5,  z: 18.2, radius: 4.8, depth: 1.10, rimHeight: 0.40, rimWidth: 1.25, ejectaRadius: 9.0, softness: 0.35 },
  { x: -20.5,z: -4.2, radius: 2.4, depth: 0.55, rimHeight: 0.20, rimWidth: 0.65, ejectaRadius: 4.8, softness: 0.10 },
  { x: 20.0, z: 19.5, radius: 4.0, depth: 0.92, rimHeight: 0.34, rimWidth: 1.05, ejectaRadius: 8.0, softness: 0.20 },
  { x: -2.2, z: 13.5, radius: 2.8, depth: 0.65, rimHeight: 0.24, rimWidth: 0.75, ejectaRadius: 5.6, softness: 0.15 },
  { x: 12.5, z:-20.5, radius: 3.6, depth: 0.84, rimHeight: 0.30, rimWidth: 0.95, ejectaRadius: 7.2, softness: 0.25 },
];

function terrainHeight(x: number, z: number): number {
  let elevation = 0;

  for (let i = 0; i < CRATER_STAMPS.length; i++) {
    const c = CRATER_STAMPS[i];
    const dx = x - c.x;
    const dz = z - c.z;
    const d = Math.sqrt(dx * dx + dz * dz);

    if (d < c.radius) {
      // Parabolic crater bowl
      const normD = d / c.radius;
      const bowl = -c.depth * (1.0 - normD * normD) * (1.0 - c.softness * 0.35);
      elevation += bowl;
    }
    // Raised rim crest
    const rimDist = Math.abs(d - c.radius) / c.rimWidth;
    if (rimDist < 3.0) {
      const rim = c.rimHeight * Math.exp(-rimDist * rimDist * 2.2) * (1.0 - c.softness * 0.45);
      elevation += rim;
    }
    // Ejecta blanket
    if (d >= c.radius && d < c.ejectaRadius) {
      const ejectaDist = (d - c.radius) / (c.ejectaRadius - c.radius);
      const ejecta = c.rimHeight * 0.42 * (1.0 - ejectaDist) * (1.0 - ejectaDist);
      elevation += ejecta;
    }
  }

  // Distant South Pole Massif / Ridge (Gaussian, no sine waves)
  const ridgeZ = z + 95.0;
  const ridgeDist = ridgeZ / 48.0;
  const ridge = 4.5 * Math.exp(-ridgeDist * ridgeDist) * Math.max(0, 1.0 - Math.abs(x - 8.0) / 130.0);
  elevation += ridge;

  // Flatten the immediate landing pad at origin (0, 0)
  const distFromCenter = Math.sqrt(x * x + z * z);
  const padMask = 1.0 - smoothstep(1.5, 4.0, distFromCenter);
  return elevation * (1.0 - padMask);
}

// Runtime-generated detail normal map (512x512 micro-regolith texture)
function createDetailNormalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(512, 512);
  const data = imgData.data;

  const nrng = makeRNG(0x4C554E41);
  const heights = new Float32Array(512 * 512);
  for (let i = 0; i < 512 * 512; i++) {
    heights[i] = (nrng() - 0.5) * 0.35;
  }

  for (let y = 1; y < 511; y++) {
    for (let x = 1; x < 511; x++) {
      const idx = y * 512 + x;
      const dhx = (heights[idx + 1] - heights[idx - 1]) * 3.5;
      const dhy = (heights[idx + 512] - heights[idx - 512]) * 3.5;
      let nx = -dhx;
      let ny = -dhy;
      let nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      nx /= len; ny /= len; nz /= len;

      const pidx = idx * 4;
      data[pidx]     = Math.floor((nx * 0.5 + 0.5) * 255);
      data[pidx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      data[pidx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      data[pidx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(120, 120);
  return tex;
}

// ═══════════════════════════════════════════════════════════════════
//  SURFACE GROUP (shots 5-8)
// ═══════════════════════════════════════════════════════════════════
interface SurfaceEnv {
  group: THREE.Group;
  terrainMesh: THREE.Mesh;
  sunLight: THREE.DirectionalLight;
  skyEarthGroup: THREE.Group;
  blastDecalMat: THREE.MeshBasicMaterial;
  bodyContactShadow: THREE.Mesh;
}

function createSurfaceEnvironment(): SurfaceEnv {
  const g = new THREE.Group();

  // 1. High-resolution fine patch: 120m x 120m at 0.5m cells (240x240 subdivisions)
  const FINE_SIZE = 120;
  const FINE_SEGS = 240;
  const fineGeo = new THREE.PlaneGeometry(FINE_SIZE, FINE_SIZE, FINE_SEGS, FINE_SEGS);
  fineGeo.rotateX(-Math.PI / 2);

  const finePos = fineGeo.attributes.position as THREE.BufferAttribute;
  const fineCol = new Float32Array(finePos.count * 3);
  const vColorRng = makeRNG(0x1337BEEF);

  for (let i = 0; i < finePos.count; i++) {
    const x = finePos.getX(i);
    const z = finePos.getZ(i);
    const h = terrainHeight(x, z);
    finePos.setY(i, h);

    // Approximate slope
    const eps = 0.5;
    const hx = terrainHeight(x + eps, z) - terrainHeight(x - eps, z);
    const hz = terrainHeight(x, z + eps) - terrainHeight(x, z - eps);
    const slope = Math.min(1.0, Math.sqrt(hx * hx + hz * hz) / (eps * 2.0));

    // Neutral gray albedo variation: strictly 0.10 - 0.18, NO color cast (R=G=B)
    const noise = (vColorRng() - 0.5) * 0.02;
    const gray = Math.max(0.10, Math.min(0.18, 0.125 + slope * 0.045 + noise));
    fineCol[i * 3]     = gray;
    fineCol[i * 3 + 1] = gray;
    fineCol[i * 3 + 2] = gray;
  }
  fineGeo.computeVertexNormals();
  fineGeo.setAttribute('color', new THREE.BufferAttribute(fineCol, 3));

  const detailNormalMap = createDetailNormalTexture();
  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x999999,
    vertexColors: true,
    roughness: 0.98,
    metalness: 0.02,
    normalMap: detailNormalMap,
    normalScale: new THREE.Vector2(0.35, 0.35),
  });

  const terrainMesh = new THREE.Mesh(fineGeo, terrainMat);
  terrainMesh.receiveShadow = true;
  g.add(terrainMesh);

  // 1b. Coarser outer skirt (matching edge height seamlessly)
  const skirtGeo = new THREE.RingGeometry(FINE_SIZE * 0.495, 420, 96, 24);
  skirtGeo.rotateX(-Math.PI / 2);
  const skirtPos = skirtGeo.attributes.position as THREE.BufferAttribute;
  const skirtCol = new Float32Array(skirtPos.count * 3);
  for (let i = 0; i < skirtPos.count; i++) {
    const x = skirtPos.getX(i);
    const z = skirtPos.getZ(i);
    skirtPos.setY(i, terrainHeight(x, z));
    const gray = 0.125;
    skirtCol[i * 3] = gray; skirtCol[i * 3 + 1] = gray; skirtCol[i * 3 + 2] = gray;
  }
  skirtGeo.computeVertexNormals();
  skirtGeo.setAttribute('color', new THREE.BufferAttribute(skirtCol, 3));
  const skirtMesh = new THREE.Mesh(skirtGeo, terrainMat);
  skirtMesh.receiveShadow = true;
  g.add(skirtMesh);

  // 2. Sun — low-angle grazing sunlight at 6.2° elevation
  const SUN_ELEVATION_RAD = THREE.MathUtils.degToRad(6.2);
  const sunDir = new THREE.Vector3(
    Math.cos(SUN_ELEVATION_RAD) * 0.96,
    Math.sin(SUN_ELEVATION_RAD),
    Math.cos(SUN_ELEVATION_RAD) * 0.28
  ).normalize();

  const sunLight = new THREE.DirectionalLight(0xfffbf2, 5.2);
  sunLight.position.copy(sunDir).multiplyScalar(80);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 1.0;
  sunLight.shadow.camera.far  = 160;
  sunLight.shadow.camera.left = -28;
  sunLight.shadow.camera.right = 28;
  sunLight.shadow.camera.top  =  28;
  sunLight.shadow.camera.bottom = -28;
  sunLight.shadow.bias = -0.0008;
  sunLight.shadow.normalBias = 0.03;
  g.add(sunLight);

  // Cool fill light from opposite horizon so shadow areas are not pure black
  const fillLight = new THREE.DirectionalLight(0x222a38, 0.55);
  fillLight.position.set(-sunDir.x * 60, 8, -sunDir.z * 60);
  g.add(fillLight);

  // Subtle ambient light
  g.add(new THREE.AmbientLight(0x10141e, 0.22));

  // 3. Smooth-shaded noise-displaced icosahedra rocks (0.1m - 1.15m, none larger than 1.2m)
  const rockRng = makeRNG(0xBADC0DE);
  const rockBaseGeo = new THREE.IcosahedronGeometry(1.0, 2);
  const rpa = rockBaseGeo.attributes.position as THREE.BufferAttribute;
  const dRng = makeRNG(0xFEEDC0DE);
  for (let i = 0; i < rpa.count; i++) {
    const rx = rpa.getX(i);
    const ry = rpa.getY(i);
    const rz = rpa.getZ(i);
    // Flatten bottom slightly so it sits naturally, asymmetrical noise displacement
    const bottomFactor = ry < 0 ? 0.75 : 1.0;
    rpa.setXYZ(i,
      rx * (0.80 + dRng() * 0.40),
      ry * (0.65 + dRng() * 0.45) * bottomFactor,
      rz * (0.80 + dRng() * 0.40)
    );
  }
  rockBaseGeo.computeVertexNormals();

  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    roughness: 0.96,
    metalness: 0.04,
  });

  // Size classes: small (0.10–0.25m), medium (0.25–0.60m), large (0.60–1.15m)
  const sizeBands = [
    { count: isMobile ? 35 : 75,  sMin: 0.10, sMax: 0.25 },
    { count: isMobile ? 18 : 36,  sMin: 0.25, sMax: 0.60 },
    { count: isMobile ? 6  : 14,  sMin: 0.60, sMax: 1.15 },
  ];

  const dummy = new THREE.Object3D();
  sizeBands.forEach((band) => {
    const inst = new THREE.InstancedMesh(rockBaseGeo, rockMat, band.count);
    inst.castShadow = true;
    inst.receiveShadow = true;
    for (let i = 0; i < band.count; i++) {
      // Clustered near crater rims, completely clearing the central pad (dist > 3.8m)
      const angle = rockRng() * Math.PI * 2;
      const dist  = 3.8 + rockRng() * 18.0;
      const rx = Math.cos(angle) * dist;
      const rz = Math.sin(angle) * dist;
      const ry = terrainHeight(rx, rz);
      const scale = band.sMin + rockRng() * (band.sMax - band.sMin);
      dummy.position.set(rx, ry + scale * 0.28, rz);
      dummy.rotation.set(
        rockRng() * Math.PI,
        rockRng() * Math.PI * 2,
        rockRng() * Math.PI * 0.4
      );
      dummy.scale.set(scale, scale * (0.75 + rockRng() * 0.35), scale * (0.85 + rockRng() * 0.30));
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    g.add(inst);
  });

  // 4. Earth in lunar sky — small, low on horizon
  const skyEarthGroup = new THREE.Group();
  skyEarthGroup.position.set(4.8, 5.2, -15);
  const skyEarthMat = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture:   { value: earthDayMap },
      nightTexture: { value: earthNightMap },
      sunDir:       { value: sunDir },
      viewPos:      { value: camera.position },
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
      uniform sampler2D dayTexture; uniform sampler2D nightTexture; uniform vec3 sunDir;
      varying vec3 vNormal; varying vec2 vUv; varying vec3 vViewVector;
      void main() {
        vec3 N = normalize(vNormal); vec3 V = normalize(vViewVector); vec3 L = normalize(sunDir);
        float NdotL = dot(N, L);
        float df = smoothstep(-0.05, 0.08, NdotL);
        vec3 dc = texture2D(dayTexture, vUv).rgb * (max(NdotL, 0.0) * 1.2 + 0.02);
        vec3 nc = texture2D(nightTexture, vUv).rgb * smoothstep(0.04, -0.12, NdotL) * 1.5;
        float limb = 1.0 - max(dot(N, V), 0.0);
        vec3 atmo = vec3(0.2, 0.55, 1.0) * pow(limb, 3.0) * 1.1;
        gl_FragColor = vec4(mix(nc, dc, df) + atmo, 1.0);
      }
    `,
  });
  skyEarthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.72, 48, 24), skyEarthMat));

  // Atmosphere glow
  const haloMat = new THREE.ShaderMaterial({
    transparent: true, side: THREE.FrontSide, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { viewVector: { value: camera.position } },
    vertexShader: `
      uniform vec3 viewVector; varying float vI;
      void main() {
        vec3 N = normalize(normalMatrix * normal);
        vec3 V = normalize(normalMatrix * viewVector);
        vI = pow(1.0 - abs(dot(N, V)), 3.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vI;
      void main() { gl_FragColor = vec4(0.20, 0.58, 1.0, vI * 0.82); }
    `,
  });
  skyEarthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.80, 32, 16), haloMat));
  g.add(skyEarthGroup);

  // 5. Blast scour decal (flat ring on terrain, fades in with plume)
  const blastGeo = new THREE.RingGeometry(0.02, 1.8, 32);
  blastGeo.rotateX(-Math.PI / 2);
  const blastDecalMat = new THREE.MeshBasicMaterial({
    color: 0x181a20,
    transparent: true, opacity: 0,
    depthWrite: false,
    blending: THREE.NormalBlending,
    side: THREE.DoubleSide,
  });
  const blastMesh = new THREE.Mesh(blastGeo, blastDecalMat);
  blastMesh.position.y = 0.003;
  g.add(blastMesh);

  // 6. Contact ambient shadow under lander body (anchors vehicle to ground)
  const bodyShadowGeo = new THREE.CircleGeometry(1.45, 32);
  bodyShadowGeo.rotateX(-Math.PI / 2);
  const bodyContactShadow = new THREE.Mesh(
    bodyShadowGeo,
    new THREE.MeshBasicMaterial({ color: 0x020305, transparent: true, opacity: 0.55, depthWrite: false })
  );
  bodyContactShadow.position.set(0, 0.004, 0);
  g.add(bodyContactShadow);

  return { group: g, terrainMesh, sunLight, skyEarthGroup, blastDecalMat, bodyContactShadow };
}

const surfaceEnv = createSurfaceEnvironment();
surfaceEnv.group.visible = false;
scene.add(surfaceEnv.group);

// ═══════════════════════════════════════════════════════════════════
//  LANDER MODEL — 3.8m tall, 5.5m leg span, no yellow spheres
// ═══════════════════════════════════════════════════════════════════
interface LanderModel {
  group: THREE.Group;
  plumeMat: THREE.ShaderMaterial;
  engineLight: THREE.PointLight;
  beaconMat: THREE.MeshBasicMaterial;
  footpads: THREE.Vector3[];  // world-space pad positions (updated each frame)
  updateLegs: (landerWorldPos: THREE.Vector3, landerRotationY: number) => THREE.Vector3[];
  telemetryEl: HTMLElement | null;
}

function createLander(): LanderModel {
  // Scale: 1 unit = 1m. Body ~0.95m radius, 1.1m tall. Legs span ~3.9m. Total height ~2.45m.
  const g = new THREE.Group();

  const mliMat   = new THREE.MeshStandardMaterial({ color: 0xd4a843, metalness: 0.80, roughness: 0.35 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xeff3f8, metalness: 0.15, roughness: 0.50 });
  const darkMat  = new THREE.MeshStandardMaterial({ color: 0x1a1e24, metalness: 0.85, roughness: 0.42 });
  const radMat   = new THREE.MeshStandardMaterial({ color: 0x111418, metalness: 0.70, roughness: 0.55 });
  const alMat    = new THREE.MeshStandardMaterial({ color: 0xc8d0d8, metalness: 0.82, roughness: 0.30 });
  // Neutral metallic gray for footpads (NOT orange!)
  const padMat   = new THREE.MeshStandardMaterial({ color: 0x8a929a, metalness: 0.85, roughness: 0.35 });

  // Chamfered octagonal body — lower bus (MLI gold)
  const busGeo = new THREE.CylinderGeometry(0.92, 0.98, 0.80, 8);
  const bus = new THREE.Mesh(busGeo, mliMat);
  bus.position.y = 0.55;
  g.add(bus);

  // Upper payload / avionics deck (white)
  const upperGeo = new THREE.CylinderGeometry(0.80, 0.92, 0.55, 8);
  const upper = new THREE.Mesh(upperGeo, whiteMat);
  upper.position.y = 1.175;
  g.add(upper);

  // Top dome / structure cap
  const capGeo = new THREE.SphereGeometry(0.76, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const cap = new THREE.Mesh(capGeo, whiteMat);
  cap.position.y = 1.45;
  g.add(cap);

  // Matte black radiator panels (4 sides)
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 8;
    const rad = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.04), radMat);
    rad.position.set(Math.cos(a) * 0.94, 0.55, Math.sin(a) * 0.94);
    rad.rotation.y = -a;
    g.add(rad);
  }

  // Non-spherical tank housings (4 cylinders, slightly visible)
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2;
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.48, 12), mliMat);
    tank.position.set(Math.cos(a) * 0.68, 0.55, Math.sin(a) * 0.68);
    g.add(tank);
  }

  // Main descent engine bell (LatheGeometry)
  const lathePoints = [
    new THREE.Vector2(0.08, 0.0),
    new THREE.Vector2(0.12, 0.12),
    new THREE.Vector2(0.26, 0.38),
    new THREE.Vector2(0.32, 0.52),
  ];
  const bellGeo = new THREE.LatheGeometry(lathePoints, 18);
  const bell = new THREE.Mesh(bellGeo, darkMat);
  bell.rotation.x = Math.PI;
  bell.position.y = 0.14;
  g.add(bell);

  // Throat (dark interior)
  const throat = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 12), darkMat);
  throat.position.y = 0.15;
  g.add(throat);

  // Vacuum plume — faint, wide, pale cone with Fresnel fade
  const plumeMat = new THREE.ShaderMaterial({
    transparent: true, side: THREE.DoubleSide, depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      strength: { value: 0.0 },
      time:     { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv; varying float vFresnel;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.x += sin(pos.y * 8.0 + time * 12.0) * 0.015 * pos.y;
        pos.z += cos(pos.y * 7.0 + time * 10.0) * 0.015 * pos.y;
        vFresnel = 1.0 - abs(dot(normalize(normal), vec3(0.0, 0.0, 1.0)));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float strength;
      uniform float time;
      varying vec2 vUv;
      varying float vFresnel;
      void main() {
        float coreAlpha = exp(-vUv.x * vUv.x * 28.0);
        float rimAlpha  = exp(-vUv.x * vUv.x * 4.0) * (1.0 - vUv.y) * 0.5;
        float alpha = (coreAlpha * 0.55 + rimAlpha * 0.45) * strength;
        vec3 col = mix(vec3(1.0, 0.97, 0.88), vec3(0.88, 0.94, 1.0), vUv.y);
        gl_FragColor = vec4(col, alpha * 0.75);
      }
    `,
  });

  const plumeGeo = new THREE.ConeGeometry(0.70, 1.40, 24, 8, true);
  const plumeMesh = new THREE.Mesh(plumeGeo, plumeMat);
  plumeMesh.rotation.x = Math.PI;
  plumeMesh.position.y = -0.72;
  g.add(plumeMesh);

  // Engine illumination (synced with plume)
  const engineLight = new THREE.PointLight(0xffe8c0, 0, 6.0);
  engineLight.position.y = -0.3;
  engineLight.castShadow = false;
  g.add(engineLight);

  // 4 landing legs — articulated hip-to-knee upper strut + telescoping knee-to-pad strut + secondary brace
  interface LegRigItem {
    upperStrut: THREE.Mesh;
    secondaryBrace: THREE.Mesh;
    shockBarrel: THREE.Mesh;
    innerPiston: THREE.Mesh;
    padGroup: THREE.Group;
    contactDecal: THREE.Mesh;
    hipPos: THREE.Vector3;
    kneePos: THREE.Vector3;
    braceMount: THREE.Vector3;
    azimuth: number;
  }
  const legRigs: LegRigItem[] = [];
  const footpads: THREE.Vector3[] = [];
  const upUnit = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    const hipPos     = new THREE.Vector3(Math.cos(a) * 0.95, 0.55, Math.sin(a) * 0.95);
    const kneePos    = new THREE.Vector3(Math.cos(a) * 1.55, -0.05, Math.sin(a) * 1.55);
    const braceMount = new THREE.Vector3(Math.cos(a) * 0.65, 0.18, Math.sin(a) * 0.65);

    // 1. Upper Strut: Hip to Knee
    const upperGeo = new THREE.CylinderGeometry(0.034, 0.030, 1.0, 8);
    const upperStrut = new THREE.Mesh(upperGeo, darkMat);
    const upperVec = new THREE.Vector3().subVectors(kneePos, hipPos);
    const upperLen = upperVec.length();
    const upperDir = upperVec.clone().normalize();
    upperStrut.position.copy(hipPos).addScaledVector(upperDir, upperLen * 0.5);
    upperStrut.quaternion.setFromUnitVectors(upUnit, upperDir);
    upperStrut.scale.set(1, upperLen, 1);
    g.add(upperStrut);

    // 2. Secondary Brace: Body mount to Knee
    const braceGeo = new THREE.CylinderGeometry(0.020, 0.020, 1.0, 6);
    const secondaryBrace = new THREE.Mesh(braceGeo, darkMat);
    const braceVec = new THREE.Vector3().subVectors(kneePos, braceMount);
    const braceLen = braceVec.length();
    const braceDir = braceVec.clone().normalize();
    secondaryBrace.position.copy(braceMount).addScaledVector(braceDir, braceLen * 0.5);
    secondaryBrace.quaternion.setFromUnitVectors(upUnit, braceDir);
    secondaryBrace.scale.set(1, braceLen, 1);
    g.add(secondaryBrace);

    // 3. Lower Telescoping Strut — Shock Barrel (outer sleeve from knee)
    const barrelGeo = new THREE.CylinderGeometry(0.044, 0.042, 1.0, 8);
    const shockBarrel = new THREE.Mesh(barrelGeo, alMat);
    g.add(shockBarrel);

    // 4. Lower Telescoping Strut — Inner Piston (from pad socket)
    const pistonGeo = new THREE.CylinderGeometry(0.028, 0.028, 1.0, 8);
    const innerPiston = new THREE.Mesh(pistonGeo, darkMat);
    g.add(innerPiston);

    // 5. Footpad Dish — Neutral Metallic Gray (NOT orange!)
    const padGroup = new THREE.Group();
    const padDishGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.05, 16);
    const padMesh = new THREE.Mesh(padDishGeo, padMat);
    padMesh.position.y = 0.025; // bottom of dish is at y = 0
    padGroup.add(padMesh);

    // Ball socket joint atop pad
    const socketGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const socketMesh = new THREE.Mesh(socketGeo, darkMat);
    socketMesh.position.y = 0.05;
    padGroup.add(socketMesh);
    g.add(padGroup);

    // 6. Ground Contact Shadow Decal
    const decalGeo = new THREE.CircleGeometry(0.28, 16);
    decalGeo.rotateX(-Math.PI / 2);
    const contactDecal = new THREE.Mesh(
      decalGeo,
      new THREE.MeshBasicMaterial({ color: 0x020305, transparent: true, opacity: 0.0, depthWrite: false })
    );
    scene.add(contactDecal);

    legRigs.push({
      upperStrut, secondaryBrace, shockBarrel, innerPiston,
      padGroup, contactDecal,
      hipPos, kneePos, braceMount, azimuth: a,
    });

    footpads.push(new THREE.Vector3());
  }

  const updateLegs = (landerWorldPos: THREE.Vector3, landerRotationY: number): THREE.Vector3[] => {
    const PAD_RADIUS = 1.95;
    const NOMINAL_EXTENDED_Y = -1.355; // local nominal extension during descent

    for (let i = 0; i < 4; i++) {
      const leg = legRigs[i];
      const aWorld = leg.azimuth + landerRotationY;
      const wx = landerWorldPos.x + Math.cos(aWorld) * PAD_RADIUS;
      const wz = landerWorldPos.z + Math.sin(aWorld) * PAD_RADIUS;
      const groundH = terrainHeight(wx, wz);

      // Pad bottom contact height: groundH
      // Nominal world pad bottom height: landerWorldPos.y + NOMINAL_EXTENDED_Y
      const nominalBottomY = landerWorldPos.y + NOMINAL_EXTENDED_Y;
      const padBottomY = Math.max(groundH, nominalBottomY);

      // World pad position (bottom of pad)
      const worldPadPos = new THREE.Vector3(wx, padBottomY, wz);
      footpads[i].copy(worldPadPos);

      // Transform pad bottom to local space
      const localPadBottom = g.worldToLocal(worldPadPos.clone());
      leg.padGroup.position.copy(localPadBottom);

      // Socket position (where lower strut connects)
      const socketLocal = localPadBottom.clone().add(new THREE.Vector3(0, 0.05, 0));
      const strutVec = new THREE.Vector3().subVectors(socketLocal, leg.kneePos);
      const strutLen = Math.max(0.01, strutVec.length());
      const strutDir = strutVec.clone().normalize();

      // Shock barrel extends 56% of length from knee
      const barrelLen = strutLen * 0.56;
      leg.shockBarrel.position.copy(leg.kneePos).addScaledVector(strutDir, barrelLen * 0.5);
      leg.shockBarrel.quaternion.setFromUnitVectors(upUnit, strutDir);
      leg.shockBarrel.scale.set(1, barrelLen, 1);

      // Inner piston extends 58% of length from socket
      const pistonLen = strutLen * 0.58;
      leg.innerPiston.position.copy(socketLocal).addScaledVector(strutDir, -pistonLen * 0.5);
      leg.innerPiston.quaternion.setFromUnitVectors(upUnit, strutDir);
      leg.innerPiston.scale.set(1, pistonLen, 1);

      // Contact shadow decal on terrain
      leg.contactDecal.position.set(wx, groundH + 0.003, wz);
      const distAbove = Math.max(0, padBottomY - groundH);
      const shadowAlpha = THREE.MathUtils.clamp(1.0 - distAbove * 2.5, 0.0, 0.72);
      (leg.contactDecal.material as THREE.MeshBasicMaterial).opacity = shadowAlpha;
    }

    return footpads;
  };

  // Mast antenna
  const mastGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.70, 6);
  const mast = new THREE.Mesh(mastGeo, darkMat);
  mast.position.set(0.35, 1.85, 0.25);
  g.add(mast);

  // Dish on mast
  const dishGeo = new THREE.SphereGeometry(0.28, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const dish = new THREE.Mesh(dishGeo, alMat);
  dish.position.set(0.35, 2.20, 0.25);
  dish.rotation.set(-0.4, 0.5, 0);
  g.add(dish);

  // Instrument boom
  const boomGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.45, 6);
  const boom = new THREE.Mesh(boomGeo, darkMat);
  boom.rotation.z = -Math.PI / 3;
  boom.position.set(-0.45, 1.70, 0.18);
  g.add(boom);

  // Tiny LED indicators (no large yellow spheres)
  [[0.96, 1.15, 0], [-0.96, 1.15, 0], [0, 1.15, 0.96], [0, 1.15, -0.96]].forEach(([x, y, z]) => {
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0x22cc88 })
    );
    led.position.set(x, y, z);
    g.add(led);
  });

  // Status strobe — tiny, parented to vehicle
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), beaconMat);
  beacon.position.set(0, 1.92, 0);
  g.add(beacon);

  return { group: g, plumeMat, engineLight, beaconMat, footpads, updateLegs, telemetryEl: null };
}

const lander = createLander();
lander.group.visible = false;
lander.group.scale.setScalar(1.0);  // 1 unit = 1m, model is 3.8m tall
scene.add(lander.group);

// Ballistic dust particles (Points with shader, seeded)
const DUST_COUNT = 120;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(DUST_COUNT * 3);
const dustVel = new Float32Array(DUST_COUNT * 3);  // initial velocities (seeded)
const dustRng  = makeRNG(0xD05704);
const LUNAR_G  = 1.62;  // m/s^2

// Seed velocities once — deterministic
for (let i = 0; i < DUST_COUNT; i++) {
  const angle = dustRng() * Math.PI * 2;
  const speed = 0.8 + dustRng() * 2.8;
  const upV   = 0.4 + dustRng() * 1.2;
  dustVel[i*3]   = Math.cos(angle) * speed;
  dustVel[i*3+1] = upV;
  dustVel[i*3+2] = Math.sin(angle) * speed;
  dustPos[i*3] = dustPos[i*3+1] = dustPos[i*3+2] = 0;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

const dustMat = new THREE.PointsMaterial({
  color: 0xb8bec8,
  size: 0.06,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.NormalBlending,
  sizeAttenuation: true,
});
const dustPoints = new THREE.Points(dustGeo, dustMat);
dustPoints.visible = false;
scene.add(dustPoints);

// ═══════════════════════════════════════════════════════════════════
//  HTML OVERLAY
// ═══════════════════════════════════════════════════════════════════
const overlay = document.createElement('div');
overlay.id = 'ui-overlay';
overlay.innerHTML = `
  <div class="film-grain"></div>
  <div class="vignette"></div>
  <div class="letterbox-top"></div>
  <div class="letterbox-bottom"></div>

  <!-- Left panel (glassmorphic mission card with generous top & bottom margins) -->
  <div class="left-panel" id="left-panel">
    <div class="panel-badge" id="panel-badge">
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS &middot; NASA SPACE APPS 2026 &middot; LOW EARTH ORBIT</span>
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

  <!-- Live Descent Telemetry HUD (shots 6-8) -->
  <div class="descent-hud" id="descent-hud" aria-hidden="true">
    <div class="descent-hud-header">
      <div class="dhud-signal-dot"></div>
      <span class="dhud-label">LUNAOPS &middot; LIVE TELEMETRY</span>
    </div>
    <div class="dhud-grid">
      <div class="dhud-row">
        <span class="dhud-key">ALTITUDE</span>
        <span class="dhud-val" id="telem-alt">--- m</span>
      </div>
      <div class="dhud-row">
        <span class="dhud-key">V/S</span>
        <span class="dhud-val" id="telem-vspd">--- m/s</span>
      </div>
      <div class="dhud-row">
        <span class="dhud-key">PHASE</span>
        <span class="dhud-val" id="telem-phase">APPROACH</span>
      </div>
      <div class="dhud-row">
        <span class="dhud-key">FUEL</span>
        <span class="dhud-val" id="telem-fuel">--- %</span>
      </div>
      <div class="dhud-divider"></div>
      <div class="dhud-row">
        <span class="dhud-key">LAT</span>
        <span class="dhud-val dhud-coord">89&deg;54&prime;26&Prime; S</span>
      </div>
      <div class="dhud-row">
        <span class="dhud-key">LON</span>
        <span class="dhud-val dhud-coord">0&deg;00&prime;00&Prime; E</span>
      </div>
      <div class="dhud-row">
        <span class="dhud-key">SITE</span>
        <span class="dhud-val dhud-site">SHACKLETON RIM</span>
      </div>
    </div>
  </div>

  <!-- South Pole Safe Landing Analysis Card (reveals at touchdown) -->
  <div class="sp-landing-card" id="sp-landing-card" aria-live="polite">
    <div class="sp-card-header">
      <div class="sp-pole-icon">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" stroke="#42DDF5" stroke-width="1.2" opacity="0.5"/>
          <circle cx="20" cy="34" r="2.5" fill="#42DDF5"/>
          <ellipse cx="20" cy="34" rx="5"  ry="1.8" stroke="#42DDF5" stroke-width="0.8" opacity="0.45"/>
          <ellipse cx="20" cy="27" rx="11" ry="3.2" stroke="#42DDF5" stroke-width="0.7" opacity="0.35"/>
          <ellipse cx="20" cy="20" rx="16" ry="4.5" stroke="#42DDF5" stroke-width="0.7" opacity="0.25"/>
          <line x1="20" y1="4" x2="20" y2="36" stroke="#42DDF5" stroke-width="0.7" opacity="0.30"/>
          <text x="20" y="38.5" text-anchor="middle" font-size="4" fill="#42DDF5" font-family="monospace" opacity="0.9">S</text>
        </svg>
      </div>
      <div class="sp-card-title-block">
        <div class="sp-card-eyebrow">LUNAOPS &middot; MISSION COMPLETE</div>
        <div class="sp-card-title">LUNAR SOUTH POLE</div>
        <div class="sp-card-subtitle">SHACKLETON CRATER RIM &middot; 89&deg;54&prime;S</div>
      </div>
      <div class="sp-status-badge">
        <svg viewBox="0 0 20 20" fill="none"><polyline points="4,11 8,15 16,5" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>SAFE</span>
      </div>
    </div>

    <div class="sp-card-body">
      <div class="sp-metrics-row">
        <div class="sp-metric">
          <div class="sp-metric-val">89.91&deg;</div>
          <div class="sp-metric-lbl">SOUTH LATITUDE</div>
        </div>
        <div class="sp-metric">
          <div class="sp-metric-val">~1.5&deg;</div>
          <div class="sp-metric-lbl">SUN ELEVATION</div>
        </div>
        <div class="sp-metric">
          <div class="sp-metric-val">&minus;183&deg;C</div>
          <div class="sp-metric-lbl">AVG SURFACE TEMP</div>
        </div>
        <div class="sp-metric">
          <div class="sp-metric-val">H&#8322;O</div>
          <div class="sp-metric-lbl">ICE CONFIRMED</div>
        </div>
      </div>

      <div class="sp-card-divider"></div>

      <div class="sp-why-block">
        <div class="sp-why-label">WHY SOUTH POLE?</div>
        <div class="sp-why-pills">
          <span class="sp-pill sp-pill-water">&#128167; Water Ice Deposits</span>
          <span class="sp-pill sp-pill-solar">&#9728;&#65039; Near-Permanent Sunlight on Ridges</span>
          <span class="sp-pill sp-pill-science">&#128300; Pristine Ancient Regolith</span>
          <span class="sp-pill sp-pill-artemis">&#128640; Artemis Program Target</span>
        </div>
      </div>

      <div class="sp-card-divider"></div>

      <div class="sp-analysis-block">
        <div class="sp-analysis-label">LUNAOPS ANALYSIS</div>
        <div class="sp-analysis-row">
          <span class="sp-analysis-key">Landing hazard score</span>
          <span class="sp-analysis-bar-wrap">
            <span class="sp-analysis-bar sp-bar-low"></span>
          </span>
          <span class="sp-analysis-val sp-val-green">LOW &middot; 0.12</span>
        </div>
        <div class="sp-analysis-row">
          <span class="sp-analysis-key">Slope angle</span>
          <span class="sp-analysis-bar-wrap">
            <span class="sp-analysis-bar sp-bar-slope"></span>
          </span>
          <span class="sp-analysis-val sp-val-green">2.4&deg;</span>
        </div>
        <div class="sp-analysis-row">
          <span class="sp-analysis-key">Surface roughness</span>
          <span class="sp-analysis-bar-wrap">
            <span class="sp-analysis-bar sp-bar-rough"></span>
          </span>
          <span class="sp-analysis-val sp-val-amber">MODERATE</span>
        </div>
        <div class="sp-analysis-row">
          <span class="sp-analysis-key">Comm window (Earth)</span>
          <span class="sp-analysis-bar-wrap">
            <span class="sp-analysis-bar sp-bar-comm"></span>
          </span>
          <span class="sp-analysis-val sp-val-green">18.4 h/day</span>
        </div>
      </div>
    </div>

    <div class="sp-card-footer">
      <span class="sp-footer-note">Data: NASA LRO &middot; LOLA DEM &middot; LROC NAC &middot; JPL NAIF SPICE</span>
    </div>
  </div>

  <!-- Touchdown Dock (Center-Bottom Glass Bar) -->
  <div class="touchdown-dock" id="touchdown-dock" aria-live="polite">
    <div class="status-line" id="status-line">
      <svg class="status-check" viewBox="0 0 16 16" fill="none">
        <polyline points="3,9 7,13 13,4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="status-text">TOUCHDOWN COMPLETE &middot; SOUTH POLE</span>
      <span class="status-sub">Shackleton Crater Rim &middot; 89&deg;54&prime;S &middot; NASA Space Apps 2026</span>
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

// ═══════════════════════════════════════════════════════════════════
//  CAMERA — shot-based with FOV changes
// ═══════════════════════════════════════════════════════════════════
interface CameraShot {
  progress: number;
  pos:  THREE.Vector3;
  look: THREE.Vector3;
  fov:  number;
  name: string;
}

// Positions relative to the Earth/Moon scene scale
const CAM_SHOTS: CameraShot[] = [
  // Shot 1: Earth wide — classic 32mm look
  { progress: 0.00, pos: new THREE.Vector3(28, 3.5, 20),    look: new THREE.Vector3(23, -1.5, -6),    fov: 32, name: 'LOW EARTH ORBIT' },
  // Shot 2: Departure — pull back from Earth
  { progress: 0.20, pos: new THREE.Vector3(18, 5.5, 16),    look: new THREE.Vector3(17,  0.5, -10),   fov: 30, name: 'TRANS-LUNAR DEPARTURE' },
  // Shot 3a: Mid-flight
  { progress: 0.38, pos: new THREE.Vector3(10, 4.5, 8),     look: new THREE.Vector3(7.5, 2.0, -18),  fov: 28, name: 'DEEP SPACE TRANSIT' },
  // Shot 3b: Orbit hero — Moon right third, 35mm, slight dolly
  { progress: 0.52, pos: new THREE.Vector3(6.0, 2.8, 0.5),  look: new THREE.Vector3(4.2, 0.8, -28),  fov: 35, name: 'LUNAR ORBIT INSERTION' },
  // Shot 4: Separation, pole approach — FOV narrows
  { progress: 0.64, pos: new THREE.Vector3(5.8, 1.5, -12),  look: new THREE.Vector3(4.45, 0.2, -22), fov: 28, name: 'DESCENT ORBIT' },
  // Shot 5: Surface transition — push in (FOV narrowing)
  { progress: 0.76, pos: new THREE.Vector3(4.5, 1.0, -16),  look: new THREE.Vector3(0.0, 0.0, 0.0),  fov: 22, name: 'SURFACE APPROACH' },
  // Shot 6: Establishing wide — low crane
  { progress: 0.78, pos: new THREE.Vector3(-2.5, 1.8, 6.5), look: new THREE.Vector3(0.0, 0.0, 0.0),  fov: 38, name: 'POWERED DESCENT' },
  // Shot 7: Descent follow — side-low
  { progress: 0.84, pos: new THREE.Vector3(3.8, 1.2, 5.5),  look: new THREE.Vector3(0.0, 0.85, 0.0), fov: 35, name: 'FINAL APPROACH' },
  // Shot 7b: Leg deploy
  { progress: 0.92, pos: new THREE.Vector3(3.2, 0.8, 4.2),  look: new THREE.Vector3(0.0, 0.45, 0.0), fov: 32, name: 'TOUCHDOWN IMMINENT' },
  // Shot 8: Touchdown hero — slow push-in, lander right third
  { progress: 0.96, pos: new THREE.Vector3(3.8, 1.0, 4.8),  look: new THREE.Vector3(0.2, 0.5, 0.2),  fov: 32, name: 'SOUTH POLE TOUCHDOWN' },
  // Shot 8b: Hold with push-in
  { progress: 1.00, pos: new THREE.Vector3(3.5, 0.85, 4.45),look: new THREE.Vector3(0.15, 0.42, 0.15),fov: 30, name: 'SOUTH POLE TOUCHDOWN' },
];

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3) / 2;
}

function getCameraAtT(t: number): { pos: THREE.Vector3; look: THREE.Vector3; fov: number; phaseName: string } {
  const clamped = Math.max(0, Math.min(1, t));
  // Find surrounding shots
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
  // Pick the most advanced shot name
  for (let k = CAM_SHOTS.length - 1; k >= 0; k--) {
    if (clamped >= CAM_SHOTS[k].progress) {
      phaseName = CAM_SHOTS[k].name;
      break;
    }
  }
  return { pos, look, fov, phaseName };
}

// ═══════════════════════════════════════════════════════════════════
//  ANALYTICAL SURFACE CAMERA RIG (Bounding sphere fit, low 35-50mm lens)
// ═══════════════════════════════════════════════════════════════════
function computeSurfaceCamera(t: number, aspect: number): { pos: THREE.Vector3; look: THREE.Vector3; fov: number } {
  const padH = terrainHeight(0, 0); // 0.0
  const r_bound = 2.35; // bounding sphere includes bus, avionics, dish antenna, and all 4 footpads

  // Low 35-50mm lens: 36° vertical FOV (~40mm lens)
  const fovV = 36.0;
  const fovRad = THREE.MathUtils.degToRad(fovV);

  // Responsive effective FOV (accounts for portrait mobile where horizontal FOV is narrower)
  const effFov = aspect < 1 ? 2 * Math.atan(Math.tan(fovRad / 2) * aspect) : fovRad;

  // Touchdown & Hold Shot (t >= 0.96)
  if (t >= SHOTS.touchdownT) {
    const margin = 1.35;
    const d = (r_bound / Math.sin(effFov / 2)) * margin;

    // Azimuth: from south-east (showing lander with sky Earth in background)
    const azimuth = Math.PI * 0.32;
    const camDir = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth)).normalize();
    const camRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), camDir).normalize();

    // Camera height: 1.85m above ground, looking slightly up at vehicle center (y = padH + 1.45m)
    const camHeight = padH + 1.75;
    const lookTargetY = padH + 1.45;

    // Subtle push-in progression during hold (t = 0.96 to 1.0)
    const holdP = (t - SHOTS.touchdownT) / Math.max(0.001, 1.0 - SHOTS.touchdownT);
    const dCurrent = d * (1.0 - holdP * 0.04);

    const d_xz = Math.sqrt(Math.max(1.0, dCurrent * dCurrent - (camHeight - lookTargetY) * (camHeight - lookTargetY)));

    // Frustum width at target distance
    const frustumWidth = 2 * dCurrent * Math.tan(effFov / 2) * (aspect < 1 ? 1 : aspect);

    // Place vehicle on the RIGHT THIRD of the frame:
    // Shift look target to the left
    const lateralShift = (aspect < 1 ? -0.16 : -0.28) * (frustumWidth * 0.5);

    const look = new THREE.Vector3(0, lookTargetY, 0).addScaledVector(camRight, lateralShift);
    const pos = new THREE.Vector3(0, 0, 0)
      .addScaledVector(camDir, d_xz)
      .addScaledVector(camRight, lateralShift);
    pos.y = camHeight;

    return { pos, look, fov: fovV };
  }

  // Descent Follow Shot (t between 0.84 and 0.96)
  if (t >= SHOTS.s7_descent) {
    const descentP = (t - SHOTS.s7_descent) / (SHOTS.touchdownT - SHOTS.s7_descent);
    const margin = 1.62; // looser margin so vehicle never leaves frame during descent
    const d = (r_bound / Math.sin(effFov / 2)) * margin;

    const azimuth = Math.PI * 0.35 - descentP * 0.07;
    const camDir = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth)).normalize();
    const camRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), camDir).normalize();

    const landerPos = lander.group.position;
    const targetY = landerPos.y + 0.35;
    const camHeight = Math.max(padH + 1.75, landerPos.y * 0.55 + 1.75);

    const frustumWidth = 2 * d * Math.tan(effFov / 2) * (aspect < 1 ? 1 : aspect);
    const lateralShift = (aspect < 1 ? -0.14 : -0.25) * (frustumWidth * 0.5);

    const d_xz = Math.sqrt(Math.max(1.0, d * d - (camHeight - targetY) * (camHeight - targetY)));

    const look = new THREE.Vector3(landerPos.x, targetY, landerPos.z).addScaledVector(camRight, lateralShift);
    const pos = new THREE.Vector3(landerPos.x, 0, landerPos.z)
      .addScaledVector(camDir, d_xz)
      .addScaledVector(camRight, lateralShift);
    pos.y = camHeight;

    return { pos, look, fov: fovV };
  }

  // Establishing Wide Shot (t between 0.76 and 0.84)
  const estP = (t - 0.76) / (SHOTS.s7_descent - 0.76);
  const estMargin = 2.6 - estP * 1.0;
  const dEst = (r_bound / Math.sin(effFov / 2)) * estMargin;
  const azimuth = Math.PI * 0.40;
  const camDir = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth)).normalize();
  const landerPos = lander.group.position;
  const look = new THREE.Vector3(landerPos.x, landerPos.y + 0.5, landerPos.z);
  const pos = new THREE.Vector3(0, padH + 3.0, 0).addScaledVector(camDir, dEst * 0.9);
  return { pos, look, fov: 38 };
}

// ═══════════════════════════════════════════════════════════════════
//  SCENE VISIBILITY — moonGroup/surfaceGroup never both visible
// ═══════════════════════════════════════════════════════════════════
function setShotVisibility(t: number) {
  const showMoon    = t < SHOTS.moonFadeEnd + 0.01;
  const showSurface = t >= SHOTS.moonFadeStart;

  moonGroup.visible    = showMoon;
  surfaceEnv.group.visible = showSurface;

  // Opacity-based crossfade on moon shaders
  const alpha = Math.max(0, Math.min(1, (t - SHOTS.moonFadeStart) / Math.max(0.001, SHOTS.moonFadeEnd - SHOTS.moonFadeStart)));
  const moonAlpha = easeInOutCubic(1.0 - alpha);
  (MoonMaterial.uniforms.opacity as any).value    = moonAlpha;
  (moonGlowMat.uniforms.opacity as any).value     = moonAlpha;

  if (DEBUG) {
    if (moonGroup.visible && surfaceEnv.group.visible) {
      // Overlap is intentional during crossfade — both can be visible during transition
      // But the moon should be at opacity < 1 during that window
      if (moonAlpha > 0.01 && alpha > 0.01) {
        // This is valid — crossfade in progress
      }
    }
  }
}

// Dev assertion for debug mode: sample full range
function assertVisibilityConsistency() {
  if (!DEBUG) return;
  for (let i = 0; i <= 1000; i++) {
    const t = i / 1000;
    const isMoonVisible    = t < SHOTS.moonFadeEnd + 0.01;
    const isSurfaceVisible = t >= SHOTS.moonFadeStart;
    // They can both be visible ONLY during the crossfade window
    const inCrossfade = t >= SHOTS.moonFadeStart && t <= SHOTS.moonFadeEnd + 0.01;
    if (isMoonVisible && isSurfaceVisible && !inCrossfade) {
      console.error(`[LUNAOPS DEBUG] Both groups visible at t=${t.toFixed(3)} outside crossfade window!`);
    }
  }
  console.log('[LUNAOPS DEBUG] Visibility consistency check passed.');
}

// ═══════════════════════════════════════════════════════════════════
//  JOURNEY STATE — critically damped spring
// ═══════════════════════════════════════════════════════════════════
let rawT     = 0;      // raw accumulated target
let smoothT  = 0;      // spring-smoothed value used for rendering
let velT     = 0;      // spring velocity
let autoSpeed = SHOTS.autoSpeed;
let autoResumeTimer: ReturnType<typeof setTimeout> | null = null;
const lookTarget = new THREE.Vector3();

// Query parameter support: ?t=0.90 freezes camera directly at specified shot
try {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('t')) {
    const paramT = parseFloat(urlParams.get('t')!);
    if (!isNaN(paramT)) {
      rawT = smoothT = Math.max(0, Math.min(1, paramT));
      autoSpeed = 0;
    }
  }
} catch { /* ignore in non-browser */ }

function pauseAutoAdvance() {
  autoSpeed = 0;
  if (autoResumeTimer) clearTimeout(autoResumeTimer);
  autoResumeTimer = setTimeout(() => { autoSpeed = SHOTS.autoSpeed; }, 2800);
}

// Spring integration
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
//  LANDER TOUCHDOWN CONTACT SOLVE
// ═══════════════════════════════════════════════════════════════════
// Height of body above terrain when pads are touching
const LANDER_BODY_HEIGHT_ABOVE_PAD = 1.38;  // local Y of body center above pad contact

function getLanderGroundedPos(yOffset: number = 0): THREE.Vector3 {
  // Landing pad is at world origin in surface coords, terrain height ~0
  const padH = terrainHeight(0, 0);
  return new THREE.Vector3(0, padH + LANDER_BODY_HEIGHT_ABOVE_PAD + yOffset, 0);
}

// ═══════════════════════════════════════════════════════════════════
//  REDUCED MOTION
// ═══════════════════════════════════════════════════════════════════
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ═══════════════════════════════════════════════════════════════════
//  LETTER REVEAL
// ═══════════════════════════════════════════════════════════════════
const LETTER_T     = [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30];
const LETTER_RANGE = 0.07;

// ═══════════════════════════════════════════════════════════════════
//  UI UPDATE
// ═══════════════════════════════════════════════════════════════════
function updateUI(t: number, _elapsed: number) {
  const cl = Math.max(0, Math.min(1, t));

  // Progress strip
  const fill = document.getElementById('journey-fill');
  if (fill) fill.style.height = `${(cl * 100).toFixed(1)}%`;

  // Phase badge
  const badge = document.getElementById('panel-phase-badge');
  if (badge) {
    const { phaseName } = getCameraAtT(cl);
    badge.textContent = `SELENE LABS · NASA SPACE APPS 2026 · ${phaseName}`;
  }

  // Left panel visibility
  const leftPanel = document.getElementById('left-panel');
  if (leftPanel) {
    if (cl >= SHOTS.s3_orbit && cl < SHOTS.s8_touchdown) {
      const fadeOut = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.s3_orbit) / 0.06)));
      leftPanel.style.opacity = String(1 - fadeOut);
    } else if (cl >= SHOTS.s8_touchdown) {
      const pIn = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.s8_touchdown) / 0.04)));
      leftPanel.style.opacity = String(pIn);
    } else {
      leftPanel.style.opacity = '1';
    }
  }

  // Animated LUNAOPS letters
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
  if (tagline) {
    if (cl >= SHOTS.s8_touchdown) {
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.s8_touchdown) / 0.04)));
      tagline.style.opacity = String(p);
    } else {
      const pIn  = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.38) / 0.10)));
      const pOut = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.52) / 0.06)));
      tagline.style.opacity = String(pIn * (1 - pOut));
    }
  }

  // Description
  const desc = document.getElementById('hero-desc');
  if (desc) {
    if (cl >= SHOTS.s8_touchdown) {
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - (SHOTS.s8_touchdown + 0.01)) / 0.04)));
      desc.style.opacity = String(p);
    } else {
      const pIn  = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.42) / 0.10)));
      const pOut = easeInOutCubic(Math.max(0, Math.min(1, (cl - 0.54) / 0.06)));
      desc.style.opacity = String(pIn * (1 - pOut));
    }
  }

  // Initial scroll cue
  const scrollCue = document.getElementById('initial-scroll-cue');
  if (scrollCue) {
    if (cl > 0.26) {
      scrollCue.style.display = 'none';
    } else {
      scrollCue.style.display = 'flex';
      const fp = Math.max(0, Math.min(1, cl / 0.20));
      scrollCue.style.opacity = String(1 - fp);
    }
  }

  // Mid-shot captions (shots 3-7)
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
      }, 150);
    }
  }

  // Live Descent Telemetry HUD (shots 7-8)
  const descentHud = document.getElementById('descent-hud');
  if (descentHud) {
    if (cl >= SHOTS.s7_descent && cl < SHOTS.touchdownT) {
      const dp   = (cl - SHOTS.s7_descent) / (SHOTS.touchdownT - SHOTS.s7_descent);
      const alt  = Math.max(0, 280 * (1 - dp));
      const vs   = -(0.5 + dp * 3.8);
      const fuel = Math.max(12, Math.round(98 - dp * 82));
      let phase = 'POWERED DESCENT';
      if (dp > 0.8) phase = 'TERMINAL GUIDANCE';
      else if (dp < 0.25) phase = 'APPROACH BURN';

      const altEl   = document.getElementById('telem-alt');
      const vspdEl  = document.getElementById('telem-vspd');
      const phaseEl = document.getElementById('telem-phase');
      const fuelEl  = document.getElementById('telem-fuel');
      if (altEl)   altEl.textContent   = `${alt.toFixed(0)} m`;
      if (vspdEl)  vspdEl.textContent  = `${vs.toFixed(1)} m/s`;
      if (phaseEl) phaseEl.textContent = phase;
      if (fuelEl)  fuelEl.textContent  = `${fuel} %`;

      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.s7_descent) / 0.02)));
      descentHud.style.opacity = String(p);
    } else {
      descentHud.style.opacity = '0';
    }
  }

  // South Pole Safe Landing Card (reveals at touchdown)
  const spCard = document.getElementById('sp-landing-card');
  if (spCard) {
    if (cl >= SHOTS.touchdownT) {
      const p = easeInOutCubic(Math.max(0, Math.min(1, (cl - SHOTS.touchdownT) / 0.025)));
      spCard.style.opacity   = String(p);
      spCard.style.transform = `translateY(${-50 + (1 - p) * 10}%)`;
      spCard.style.pointerEvents = cl >= SHOTS.touchdownT + 0.005 ? 'auto' : 'none';
    } else {
      spCard.style.opacity = '0';
      spCard.style.transform = 'translateY(-40%)';
      spCard.style.pointerEvents = 'none';
    }
  }

  // Touchdown dock (status line + Enter Workstation button)
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
      dock.style.transform = 'translateX(-50%) translateY(12px)';
      dock.style.pointerEvents = 'none';
    }
  }
}
// ═══════════════════════════════════════════════════════════════════
//  INPUT HANDLING
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  rawT += e.deltaY * 0.00038;
  rawT = Math.max(0, Math.min(1, rawT));
  pauseAutoAdvance();
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchmove', (e) => {
  const dy = touchStartY - e.touches[0].clientY;
  touchStartY = e.touches[0].clientY;
  rawT += dy * 0.00075;
  rawT = Math.max(0, Math.min(1, rawT));
  pauseAutoAdvance();
}, { passive: true });

// Keyboard: arrows step through shots, Enter/Space goes to workstation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const next = CAM_SHOTS.find(s => s.progress > rawT + 0.01);
    if (next) { rawT = next.progress; pauseAutoAdvance(); }
    e.preventDefault();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const shots = [...CAM_SHOTS].reverse();
    const prev = shots.find(s => s.progress < rawT - 0.01);
    if (prev) { rawT = prev.progress; pauseAutoAdvance(); }
    e.preventDefault();
  } else if (e.key === 'Enter' || e.key === ' ') {
    window.location.href = '/workstation.html';
  }
});

// ═══════════════════════════════════════════════════════════════════
//  RESIZE
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.resolution.set(w, h);
});

// ═══════════════════════════════════════════════════════════════════
//  ADAPTIVE QUALITY
// ═══════════════════════════════════════════════════════════════════
let frameTimeSamples: number[] = [];
let qualityLevel = 2;  // 2=high, 1=medium, 0=low

function adaptQuality(frameMs: number) {
  frameTimeSamples.push(frameMs);
  if (frameTimeSamples.length > 30) {
    frameTimeSamples.shift();
    const avg = frameTimeSamples.reduce((a,b) => a+b) / frameTimeSamples.length;
    if (avg > 22 && qualityLevel > 0) {
      qualityLevel--;
      if (qualityLevel < 1) { bloom.enabled = false; }
      if (qualityLevel < 2) {
        surfaceEnv.sunLight.shadow.mapSize.set(512, 512);
        surfaceEnv.sunLight.shadow.map?.dispose();
        (surfaceEnv.sunLight.shadow as any).map = null;
      }
      frameTimeSamples = [];
    }
  }
}

// Pause rendering when hidden
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

  const dt      = Math.min(clock.getDelta(), 0.1);  // cap for tab switch recovery
  const elapsed = clock.getElapsedTime();
  const t0      = performance.now();

  // Spring-advance journey
  rawT += autoSpeed * dt;
  rawT  = Math.max(0, Math.min(1, rawT));
  springStep(dt);
  const T = smoothT;  // all rendering is a pure function of T

  // ── Camera ──
  if (T >= SHOTS.s6_establishing) {
    const camSolve = computeSurfaceCamera(T, camera.aspect);
    camera.position.copy(camSolve.pos);
    lookTarget.copy(camSolve.look);
    camera.lookAt(lookTarget);
    camera.fov = camSolve.fov;
    camera.updateProjectionMatrix();
  } else {
    const { pos, look, fov } = getCameraAtT(T);
    const swayStr = 0.06;
    const swayPos = new THREE.Vector3(
      Math.sin(elapsed * 0.08) * swayStr,
      Math.cos(elapsed * 0.055) * (swayStr * 0.55),
      0,
    );
    const surfPos = pos.clone().add(swayPos);
    camera.position.lerp(surfPos, 0.055);
    lookTarget.lerp(look, 0.055);
    camera.lookAt(lookTarget);
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.05);
      camera.updateProjectionMatrix();
    }
  }

  // ── Scene visibility (strict exclusion) ──
  setShotVisibility(T);

  // ── Orbiter ──
  const orbitCurve = new THREE.QuadraticBezierCurve3(CRAFT_BEZIER_START, CRAFT_BEZIER_CTRL, CRAFT_BEZIER_END);
  if (T >= 0.01 && T < SHOTS.s4_separation) {
    orbiter.group.visible = true;
    const tc = Math.max(0.001, Math.min(0.999, T));
    const cp = orbitCurve.getPoint(tc);
    const ct = orbitCurve.getTangent(tc).normalize();
    orbiter.group.position.copy(cp);
    orbiter.group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1), ct);
    orbiter.group.rotateZ(elapsed * 0.10);
    orbiter.group.scale.setScalar(1.0);
    orbiter.thrusterMat.opacity = 0.20 + Math.sin(elapsed * 9) * 0.10;
    orbiter.beaconMat.opacity   = Math.sin(elapsed * 4.2) > 0.88 ? 0.9 : 0.0;
  } else if (T >= SHOTS.s3_orbit && T < SHOTS.s4_separation) {
    orbiter.group.visible = true;
    const angle = elapsed * 0.35;
    const orR = new THREE.Vector3(
      moonGroup.position.x + Math.cos(angle) * 4.2,
      moonGroup.position.y + 1.8 + Math.sin(angle * 0.7) * 0.5,
      moonGroup.position.z + Math.sin(angle) * 3.6,
    );
    orbiter.group.position.copy(orR);
    const tang = new THREE.Vector3(-Math.sin(angle), 0.15, Math.cos(angle)).normalize();
    orbiter.group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1), tang);
    orbiter.group.scale.setScalar(1.0);
    orbiter.thrusterMat.opacity = 0.22 + Math.sin(elapsed * 9) * 0.08;
    orbiter.beaconMat.opacity   = Math.sin(elapsed * 4) > 0.88 ? 0.9 : 0.0;
  } else {
    orbiter.group.visible = false;
  }

  // ── Lander ──
  const TL_START = SHOTS.landerStartT;
  const TL_END   = SHOTS.landerDescentEnd;

  if (T < TL_START) {
    lander.group.visible = false;
    dustPoints.visible = false;
  } else if (T < TL_END) {
    lander.group.visible = true;
    dustPoints.visible = false;
    const dP     = (T - TL_START) / (TL_END - TL_START);
    const easeDP = easeInOutCubic(dP);

    const descentStart = new THREE.Vector3(0, 2.6, 0);
    const descentEnd   = getLanderGroundedPos(0);

    // Ease-in/ease-out descent
    lander.group.position.lerpVectors(descentStart, descentEnd, easeInOutCubic(dP));

    // Braking tilt (max -16° pitch, corrects to upright for touchdown)
    const tilt = -0.28 * (1 - easeDP) * (1 - easeDP);
    lander.group.rotation.set(tilt, elapsed * 0.04, 0);

    // Update articulated legs & pads every frame
    lander.updateLegs(lander.group.position, lander.group.rotation.y);

    // Plume strength
    const plume = T >= SHOTS.s7_legsOut ? 1.0 - easeInOutCubic((T - SHOTS.s7_legsOut) / (TL_END - SHOTS.s7_legsOut)) * 0.85 : 1.0;
    (lander.plumeMat.uniforms.strength as any).value = plume * (0.7 + Math.sin(elapsed * 22) * 0.3);
    (lander.plumeMat.uniforms.time as any).value     = elapsed;
    lander.engineLight.intensity = plume * (3.2 + Math.sin(elapsed * 18) * 1.0);

    // Blast decal fades in with plume strength
    surfaceEnv.blastDecalMat.opacity = plume * 0.65;

    // Exposure dip during transition — briefly darken
    const dipT = Math.max(0, Math.min(1, (T - SHOTS.s5_transitionDip) / 0.015));
    const dipEnd = Math.max(0, Math.min(1, (T - (SHOTS.s5_transitionDip + 0.015)) / 0.025));
    const dip = dipT < 1 ? dipT : 1 - dipEnd;
    (gradePass.uniforms as any).exposure.value = 1.0 - dip * 0.85;

    // Beacon pulse during descent
    lander.beaconMat.opacity = Math.sin(elapsed * 6) > 0.75 ? 0.9 : 0.0;

  } else {
    // ── TOUCHDOWN state ──
    lander.group.visible = true;

    // Fully grounded when hold begins — compress 3-4cm in settle
    const tTouch = (T - SHOTS.touchdownT) / Math.max(0.001, 1.0 - SHOTS.touchdownT);
    const settleAmp  = 0.035;  // 3.5cm compression
    const omegaD     = 18.0;
    const dampCoeff  = 0.7;
    const settle     = settleAmp * Math.exp(-dampCoeff * omegaD * Math.min(tTouch, 1.0))
                      * Math.cos(omegaD * Math.min(tTouch, 0.5));
    const groundPos  = getLanderGroundedPos(settle);
    lander.group.position.copy(groundPos);
    lander.group.rotation.set(0, 0.4, 0);

    // Update articulated legs & pads to solved terrain height
    lander.updateLegs(lander.group.position, lander.group.rotation.y);

    // Engine off
    (lander.plumeMat.uniforms.strength as any).value = 0.0;
    lander.engineLight.intensity = 0.0;

    // Blast decal fades out slowly
    surfaceEnv.blastDecalMat.opacity = Math.max(0, 0.65 - (T - SHOTS.touchdownT) * 2);

    // Body contact shadow
    const padH = terrainHeight(0, 0);
    surfaceEnv.bodyContactShadow.position.set(0, padH + 0.004, 0);
    (surfaceEnv.bodyContactShadow.material as THREE.MeshBasicMaterial).opacity = 0.55;

    // Ballistic dust — ejected at touchdown, pure ballistic arcs, seeded
    const dustLifeT = Math.min(1.0, tTouch * 2.5);
    if (dustLifeT < 1.0 && dustLifeT > 0) {
      dustPoints.visible = true;
      dustPoints.position.copy(lander.group.position);
      dustPoints.position.y -= LANDER_BODY_HEIGHT_ABOVE_PAD;
      const pa = dustPoints.geometry.attributes.position as THREE.BufferAttribute;
      const LUNAR_DT = dustLifeT * 2.0;
      for (let i = 0; i < DUST_COUNT; i++) {
        const vx = dustVel[i*3], vy = dustVel[i*3+1], vz = dustVel[i*3+2];
        pa.setXYZ(i,
          vx * LUNAR_DT,
          vy * LUNAR_DT - 0.5 * LUNAR_G * LUNAR_DT * LUNAR_DT,
          vz * LUNAR_DT,
        );
      }
      pa.needsUpdate = true;
      dustMat.opacity = Math.max(0, 0.35 * (1 - dustLifeT * dustLifeT));
    } else {
      dustPoints.visible = false;
    }

    // Beacon slow pulse
    lander.beaconMat.opacity = Math.sin(elapsed * 3.2) > 0.5 ? 0.85 : 0.0;
  }

  // Surface exposure enhancement — ensure lower half of frame is not muddy
  if (T >= SHOTS.s5_surfaceIn) {
    const surfT = Math.max(0, Math.min(1, (T - SHOTS.s5_surfaceIn) / 0.08));
    const targetExp = THREE.MathUtils.lerp(1.05, 1.38, surfT);
    (gradePass.uniforms as any).exposure.value = targetExp;
  }

  // ── Moon orbital animation ──
  moonMesh.rotation.y += dt * 0.006;
  (MoonMaterial.uniforms.viewPos as any).value.copy(camera.position);
  (moonGlowMat.uniforms.viewVector as any).value.copy(camera.position);

  // ── Earth scene ──
  earthMesh.rotation.y      += dt * 0.011;
  earthCloudsMesh.rotation.y += dt * 0.016;
  (EarthMaterial.uniforms.viewPos as any).value.copy(camera.position);
  (EarthCloudsMaterial.uniforms.viewPos as any).value.copy(camera.position);
  (atmosMat.uniforms.viewPos as any).value.copy(camera.position);

  // ── Sky Earth rotation ──
  surfaceEnv.skyEarthGroup.rotation.y += dt * 0.010;

  // ── Grade shader time ──
  (gradePass.uniforms as any).time.value = elapsed;

  // ── UI ──
  updateUI(T, elapsed);

  composer.render();

  adaptQuality(performance.now() - t0);
}

// ═══════════════════════════════════════════════════════════════════
//  DEV HOOKS (window.__lunaops)
// ═══════════════════════════════════════════════════════════════════
if (DEBUG || true) {  // always expose for playwright
  (window as any).__lunaops = {
    setJourney: (t: number) => {
      rawT = Math.max(0, Math.min(1, t));
      smoothT = rawT;
      velT = 0;
      autoSpeed = 0;
    },
    getJourney: () => smoothT,
    visibility: () => ({
      moonGroup:    moonGroup.visible,
      moonOpacity:  (MoonMaterial.uniforms.opacity as any).value,
      surfaceGroup: surfaceEnv.group.visible,
      lander:       lander.group.visible,
      orbiter:      orbiter.group.visible,
    }),
    terrainHeight,
    assertVisibility: assertVisibilityConsistency,
    getFootpadPositions: () => {
      return lander.footpads.map(pad => {
        const world = pad.clone();
        return {
          world,
          terrainH: terrainHeight(world.x, world.z),
          delta:    world.y - terrainHeight(world.x, world.z),
        };
      });
    },
  };
}

// Run consistency check in debug mode
if (DEBUG) assertVisibilityConsistency();

animate();
