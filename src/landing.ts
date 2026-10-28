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

// ── Texture Loader & NASA Assets ─────────────────────────────
const texLoader = new THREE.TextureLoader();

// Earth NASA maps
const earthDayMap = texLoader.load('/generated/earth/earth_day_2k.webp');
earthDayMap.colorSpace = THREE.SRGBColorSpace;

const earthNightMap = texLoader.load('/generated/earth/earth_night_2k.webp');
earthNightMap.colorSpace = THREE.SRGBColorSpace;

const earthSpecMap = texLoader.load('/generated/earth/earth_specular_2k.webp');

const earthCloudsMap = texLoader.load('/generated/earth/earth_clouds_2k.webp');
earthCloudsMap.colorSpace = THREE.SRGBColorSpace;

// Moon NASA LROC & LOLA maps
const moonColorMap = texLoader.load('/generated/lroc_color_2k.jpg');
moonColorMap.colorSpace = THREE.SRGBColorSpace;

const moonNormalMap = texLoader.load('/generated/ldem_normal_map_half.png');
moonNormalMap.colorSpace = THREE.NoColorSpace;

// ── Earth (Photorealistic NASA Multi-Layer Model) ────────────
const EARTH_RADIUS = 6.0;
const earthGroup = new THREE.Group();
earthGroup.position.set(26, -2, -8);  // shifted right so 3D appears in right 60%
scene.add(earthGroup);

// 1. Earth Surface (Day / Night / Specular Oceans / Atmospheric Terminator)
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
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying vec3 vViewVector;
    uniform vec3 viewPos;

    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      vUv = uv;
      vViewVector = normalize(viewPos - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D specularTexture;
    uniform vec3 sunDir;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying vec3 vViewVector;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);

      float NdotL = dot(N, L);
      float dayFactor = smoothstep(-0.08, 0.12, NdotL);

      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      vec3 nightColor = texture2D(nightTexture, vUv).rgb;
      float specMask = texture2D(specularTexture, vUv).r;

      // Specular reflection (sun glinting off ocean surface)
      vec3 R = reflect(-L, N);
      float spec = pow(max(dot(R, V), 0.0), 28.0) * specMask * dayFactor;
      vec3 sunSpecular = vec3(1.0, 0.96, 0.88) * spec * 2.2;

      // Direct sunlight with smooth terminator
      float diff = max(NdotL, 0.0);
      vec3 surfaceColor = dayColor * (diff * 1.25 + 0.02);

      // Night city lights on dark side
      float nightFactor = smoothstep(0.08, -0.15, NdotL);
      vec3 nightLights = nightColor * nightFactor * 1.8;

      // Sunset terminator warm sliver along twilight
      float terminator = 1.0 - abs(NdotL * 5.0);
      terminator = clamp(terminator, 0.0, 1.0) * max(dot(N, V), 0.0);
      vec3 sunsetColor = vec3(0.95, 0.45, 0.12) * terminator * 0.4;

      // Rayleigh limb haze (blue horizon)
      float limb = 1.0 - max(dot(N, V), 0.0);
      float atmoFresnel = pow(limb, 3.0);
      vec3 atmosphere = vec3(0.2, 0.55, 1.0) * atmoFresnel * (max(NdotL, -0.2) + 0.2) * 1.15;

      vec3 finalColor = mix(nightLights, surfaceColor + sunSpecular, dayFactor);
      finalColor += sunsetColor + atmosphere;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
});

const earthMesh = new THREE.Mesh(earthGeo, EarthMaterial);
earthGroup.add(earthMesh);

// 2. Earth Clouds Layer (independent drifting sphere)
const cloudsGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 128, 64);
const EarthCloudsMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  uniforms: {
    cloudsTexture: { value: earthCloudsMap },
    sunDir:        { value: SUN_DIR.clone() },
    viewPos:       { value: camera.position },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vViewVector;
    uniform vec3 viewPos;

    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vUv = uv;
      vViewVector = normalize(viewPos - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDir;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vViewVector;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);

      float NdotL = dot(N, L);
      float cloudAlpha = texture2D(cloudsTexture, vUv).r;

      // Sunlight on clouds
      float diff = max(NdotL, 0.0) * 1.35 + 0.04;
      vec3 cloudColor = vec3(0.96, 0.98, 1.0) * diff;

      // Cloud limb brightening
      float limb = 1.0 - max(dot(N, V), 0.0);
      cloudColor += vec3(0.25, 0.5, 0.95) * pow(limb, 3.2) * max(NdotL, 0.0);

      // Fade out clouds on deep night side
      float dayFactor = smoothstep(-0.2, 0.15, NdotL);

      gl_FragColor = vec4(cloudColor, cloudAlpha * dayFactor * 0.88);
    }
  `,
});

const earthCloudsMesh = new THREE.Mesh(cloudsGeo, EarthCloudsMaterial);
earthGroup.add(earthCloudsMesh);

// 3. Atmosphere Rayleigh Shell
const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.028, 64, 32);
const atmosMat = new THREE.ShaderMaterial({
  transparent: true, side: THREE.FrontSide, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    sunDir:  { value: SUN_DIR.clone() },
    viewPos: { value: camera.position },
  },
  vertexShader: `
    uniform vec3 sunDir;
    uniform vec3 viewPos;
    varying float vRim;
    varying float vSunFacing;

    void main() {
      vec3 N = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vec3 V = normalize(viewPos - worldPos.xyz);
      vRim = pow(1.0 - max(dot(N, V), 0.0), 3.2);
      vSunFacing = max(dot(N, sunDir), -0.2) + 0.2;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    varying float vRim;
    varying float vSunFacing;

    void main() {
      vec3 dayAtmo   = vec3(0.18, 0.52, 1.0);
      vec3 nightAtmo = vec3(0.01, 0.04, 0.12);
      vec3 atmo      = mix(nightAtmo, dayAtmo, clamp(vSunFacing, 0.0, 1.0));
      gl_FragColor   = vec4(atmo, vRim * vSunFacing * 0.78);
    }
  `,
});
earthGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

// ── Moon (Photorealistic NASA LROC & LOLA DEM Model) ─────────
const MOON_RADIUS = 1.65;
const moonGroup = new THREE.Group();
moonGroup.position.set(4, 1.2, -22);  // shifted right to match Earth offset
moonGroup.rotation.x = THREE.MathUtils.degToRad(6.68);
scene.add(moonGroup);

const moonGeo = new THREE.SphereGeometry(MOON_RADIUS, 128, 64);
const MoonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    colorTexture:  { value: moonColorMap },
    normalTexture: { value: moonNormalMap },
    sunDir:        { value: SUN_DIR.clone() },
    viewPos:       { value: camera.position },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying vec3 vViewVector;
    uniform vec3 viewPos;

    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      vUv = uv;
      vViewVector = normalize(viewPos - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform sampler2D colorTexture;
    uniform sampler2D normalTexture;
    uniform vec3 sunDir;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying vec3 vViewVector;

    vec3 perturbNormal(vec3 N, vec3 V, vec2 uv, vec3 normalTex) {
      vec3 dPdx = dFdx(vWorldPos);
      vec3 dPdy = dFdy(vWorldPos);
      vec2 dUvdx = dFdx(uv);
      vec2 dUvdy = dFdy(uv);

      vec3 Np = normalize(N);
      vec3 T = normalize(dPdx * dUvdy.y - dPdy * dUvdx.y);
      vec3 B = normalize(dPdy * dUvdx.x - dPdx * dUvdx.x);
      mat3 TBN = mat3(T, B, Np);

      return normalize(TBN * (normalTex * 2.0 - 1.0));
    }

    void main() {
      vec3 N_geom = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);

      // Sample LOLA DEM normal map to perturb surface
      vec3 normalSample = texture2D(normalTexture, vUv).rgb;
      vec3 N = perturbNormal(N_geom, V, vUv, normalSample);

      // Sample genuine NASA LROC texture
      vec3 albedo = texture2D(colorTexture, vUv).rgb;

      float NdotL = dot(N, L);

      // Real lunar photometric response (crisp terminator without atmosphere)
      float direct = max(NdotL, 0.0);

      // Regolith retro-reflection surge (opposition effect)
      float retro = pow(max(dot(N, normalize(L + V)), 0.0), 3.0) * 0.14;

      vec3 diffuse = albedo * (direct * 1.35 + retro);

      // Subtle Earthshine on the night side facing Earth
      float earthshine = max(-NdotL, 0.0) * 0.022;
      vec3 earthshineColor = vec3(0.12, 0.28, 0.65) * earthshine * albedo;

      vec3 finalColor = diffuse + earthshineColor;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
});

const moonMesh = new THREE.Mesh(moonGeo, MoonMaterial);
moonGroup.add(moonMesh);

// Moon rim glow (faint silver)
const moonGlowGeo = new THREE.SphereGeometry(MOON_RADIUS * 1.01, 64, 32);
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
    void main() { gl_FragColor = vec4(vec3(0.75, 0.82, 0.9), vI * 0.16); }
  `,
});
moonGroup.add(new THREE.Mesh(moonGlowGeo, moonGlowMat));

// ── Spacecraft path indicator (subtle dashed line) ───────────
const CRAFT_BEZIER_START = new THREE.Vector3(26, -2, -8);
const CRAFT_BEZIER_CTRL  = new THREE.Vector3(12, 7, -12); // Bezier ctrl point
const CRAFT_BEZIER_END   = new THREE.Vector3(6.4, 2.2, -20.8); // High lunar orbit insertion point

function buildOrbitPath() {
  const points: THREE.Vector3[] = [];
  const curve = new THREE.QuadraticBezierCurve3(CRAFT_BEZIER_START, CRAFT_BEZIER_CTRL, CRAFT_BEZIER_END);
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

// ── Realistic Spacecraft / Satellite 3D Model ────────────────
interface SpacecraftModel {
  group: THREE.Group;
  thrusterMat: THREE.Material;
  beaconMat: THREE.Material;
}

function createSpacecraft(): SpacecraftModel {
  const root = new THREE.Group();

  // Materials
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.6,
    roughness: 0.35,
  });

  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: 0xdeb841,
    metalness: 0.95,
    roughness: 0.2,
  });

  const darkTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x1e2025,
    metalness: 0.9,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const solarCellMat = new THREE.MeshStandardMaterial({
    color: 0x081a38,
    metalness: 0.88,
    roughness: 0.15,
  });

  const solarFrameMat = new THREE.MeshStandardMaterial({
    color: 0xca9834,
    metalness: 0.92,
    roughness: 0.28,
  });

  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xdde2ea,
    metalness: 0.9,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x071524,
    metalness: 0.95,
    roughness: 0.1,
  });

  // 1. Central Bus (octagonal service module)
  const busGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.85, 8);
  const busMesh = new THREE.Mesh(busGeo, hullMat);
  root.add(busMesh);

  // Gold foil thermal blanket band
  const foilGeo = new THREE.CylinderGeometry(0.362, 0.362, 0.38, 8);
  const foilMesh = new THREE.Mesh(foilGeo, goldFoilMat);
  root.add(foilMesh);

  // 2. Command Module / Forward Crew Capsule
  const capsuleGeo = new THREE.CylinderGeometry(0.18, 0.34, 0.45, 8);
  const capsuleMesh = new THREE.Mesh(capsuleGeo, hullMat);
  capsuleMesh.position.y = 0.65;
  root.add(capsuleMesh);

  // Docking ring
  const dockRingGeo = new THREE.TorusGeometry(0.12, 0.022, 8, 20);
  const dockRing = new THREE.Mesh(dockRingGeo, darkTitaniumMat);
  dockRing.rotation.x = Math.PI / 2;
  dockRing.position.y = 0.88;
  root.add(dockRing);

  // Windows / sensor visor
  const windowGeo = new THREE.BoxGeometry(0.08, 0.05, 0.02);
  const windowL = new THREE.Mesh(windowGeo, glassMat);
  windowL.position.set(-0.08, 0.68, 0.22);
  windowL.rotation.x = -0.25;
  root.add(windowL);

  const windowR = new THREE.Mesh(windowGeo, glassMat);
  windowR.position.set(0.08, 0.68, 0.22);
  windowR.rotation.x = -0.25;
  root.add(windowR);

  // 3. Engine Nozzle (aft)
  const engineGeo = new THREE.CylinderGeometry(0.24, 0.1, 0.32, 16, 1, true);
  const engineMesh = new THREE.Mesh(engineGeo, darkTitaniumMat);
  engineMesh.position.y = -0.58;
  root.add(engineMesh);

  // Ion thruster plasma glow
  const thrusterGeo = new THREE.ConeGeometry(0.14, 0.5, 12, 1, true);
  const thrusterMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const thrusterMesh = new THREE.Mesh(thrusterGeo, thrusterMat);
  thrusterMesh.position.y = -0.82;
  thrusterMesh.rotation.x = Math.PI; // point exhaust backward
  root.add(thrusterMesh);

  // 4. Solar Wings (Port & Starboard)
  [-1, 1].forEach((side) => {
    const wingGroup = new THREE.Group();
    wingGroup.position.set(side * 0.45, 0, 0);

    // Boom
    const boomGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const boomMesh = new THREE.Mesh(boomGeo, darkTitaniumMat);
    boomMesh.rotation.z = Math.PI / 2;
    boomMesh.position.x = side * 0.15;
    wingGroup.add(boomMesh);

    // 3 panels
    for (let p = 0; p < 3; p++) {
      const panelGroup = new THREE.Group();
      panelGroup.position.x = side * (0.35 + p * 0.52);

      const frameGeo = new THREE.BoxGeometry(0.48, 0.014, 0.32);
      const frameMesh = new THREE.Mesh(frameGeo, solarFrameMat);
      panelGroup.add(frameMesh);

      const cellGeo = new THREE.BoxGeometry(0.45, 0.016, 0.29);
      const cellMesh = new THREE.Mesh(cellGeo, solarCellMat);
      panelGroup.add(cellMesh);

      wingGroup.add(panelGroup);
    }

    // Wingtip navigation beacon
    const tipBeaconGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const tipBeaconMat = new THREE.MeshBasicMaterial({
      color: side === -1 ? 0xff3344 : 0x00ff88,
    });
    const tipBeacon = new THREE.Mesh(tipBeaconGeo, tipBeaconMat);
    tipBeacon.position.set(side * 1.95, 0.02, 0.16);
    wingGroup.add(tipBeacon);

    root.add(wingGroup);
  });

  // 5. High-Gain Dish Antenna
  const dishGroup = new THREE.Group();
  dishGroup.position.set(0.32, 0.2, 0.32);
  dishGroup.rotation.set(-0.6, 0.7, 0);

  const dishGeo = new THREE.SphereGeometry(0.24, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishGroup.add(dishMesh);

  const feedMastGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.22, 6);
  const feedMast = new THREE.Mesh(feedMastGeo, darkTitaniumMat);
  feedMast.position.z = 0.11;
  feedMast.rotation.x = Math.PI / 2;
  dishGroup.add(feedMast);

  const feedHornGeo = new THREE.ConeGeometry(0.035, 0.06, 8);
  const feedHorn = new THREE.Mesh(feedHornGeo, goldFoilMat);
  feedHorn.position.z = 0.22;
  feedHorn.rotation.x = -Math.PI / 2;
  dishGroup.add(feedHorn);

  root.add(dishGroup);

  // 6. RCS Thruster Pods (4 corners)
  const rcsAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  rcsAngles.forEach((angle) => {
    const rcsGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const rcsMesh = new THREE.Mesh(rcsGeo, darkTitaniumMat);
    rcsMesh.position.set(Math.cos(angle) * 0.35, 0.3, Math.sin(angle) * 0.35);
    root.add(rcsMesh);
  });

  // 7. Flashing Strobe Navigation Beacon (center top)
  const beaconGeo = new THREE.SphereGeometry(0.03, 8, 8);
  const beaconMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1.0,
  });
  const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
  beaconMesh.position.y = 0.95;
  root.add(beaconMesh);

  // Align model orientation:
  // Flight forward is along -Z
  const alignedRoot = new THREE.Group();
  root.rotation.x = Math.PI / 2;
  alignedRoot.add(root);

  return { group: alignedRoot, thrusterMat, beaconMat };
}

const spacecraft = createSpacecraft();
spacecraft.group.visible = false;
scene.add(spacecraft.group);

// ── HTML overlay: left-panel + cinematic overlays ─────────────────
const overlay = document.createElement('div');
overlay.id = 'ui-overlay';
overlay.innerHTML = `
  <!-- Cinematic layer effects -->
  <div class="film-grain"></div>
  <div class="vignette"></div>
  <div class="letterbox-top"></div>
  <div class="letterbox-bottom"></div>

  <!-- Left panel: scroll-driven text reveal -->
  <div class="left-panel" id="left-panel">

    <!-- Top badge -->
    <div class="panel-badge">
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS &middot; NASA SPACE APPS 2026 &middot; LOW EARTH ORBIT</span>
    </div>

    <!-- Giant letter-by-letter wordmark -->
    <div class="hero-letters-wrap">
      <div class="hero-letters" aria-label="LUNAOPS">
        <span class="hero-letter" data-idx="0" aria-hidden="true">L</span>
        <span class="hero-letter" data-idx="1" aria-hidden="true">U</span>
        <span class="hero-letter" data-idx="2" aria-hidden="true">N</span>
        <span class="hero-letter" data-idx="3" aria-hidden="true">A</span>
        <span class="hero-letter" data-idx="4" aria-hidden="true">O</span>
        <span class="hero-letter" data-idx="5" aria-hidden="true">P</span>
        <span class="hero-letter" data-idx="6" aria-hidden="true">S</span>
      </div>
      <div class="hero-accent-line" id="accent-line"></div>
    </div>

    <!-- Tagline -->
    <div class="hero-tagline" id="hero-tagline">
      Explore the lunar frontier.<br>Plan with precision.
    </div>

    <!-- Description -->
    <p class="hero-desc" id="hero-desc">
      High-fidelity mission planning built on NASA LRO&thinsp;/&thinsp;LOLA
      elevation data, LROC imagery and JPL NAIF SPICE ephemerides.
    </p>

    <!-- Stats row -->
    <div class="panel-stats" id="panel-stats" aria-label="Key specifications">
      <div class="stat-item">
        <span class="stat-val">16 px/&deg;</span>
        <span class="stat-lbl">DEM Resolution</span>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <span class="stat-val">&plusmn;10.7 km</span>
        <span class="stat-lbl">Elevation Range</span>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <span class="stat-val">SPICE</span>
        <span class="stat-lbl">Ephemeris Engine</span>
      </div>
    </div>

    <!-- CTA block -->
    <div class="panel-cta" id="panel-cta">
      <a href="/workstation.html" class="btn-enter" id="btn-enter-workstation"
         aria-label="Enter LUNAOPS Workstation">
        Enter Workstation
      </a>
      <span class="cta-subtext">Press <kbd>Enter</kbd> or click to launch</span>
    </div>

    <!-- Initial scroll cue (visible early, fades out as user progresses) -->
    <div class="initial-scroll-cue" id="initial-scroll-cue" aria-hidden="true">
      <div class="scroll-mouse"></div>
      <span class="scroll-label">Scroll to explore journey</span>
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

// Camera stops — all look targets shifted +8 X to match world object shift.
// Objects are in the right 60% of screen so the left panel text is unobstructed.
const CAMERA_STOPS: CameraStop[] = [
  { pos: new THREE.Vector3(30,  5, 22),  look: new THREE.Vector3(24, -3, -6),   phase: 0, progress: 0 },
  { pos: new THREE.Vector3(16,  5, 18),  look: new THREE.Vector3(14,  0, -8),   phase: 1, progress: 0.33 },
  { pos: new THREE.Vector3( 6,  3,  8),  look: new THREE.Vector3( 5,  0.5,-18), phase: 2, progress: 0.66 },
  { pos: new THREE.Vector3( 5,  2,  4),  look: new THREE.Vector3( 4,  1.2,-22), phase: 3, progress: 1 },
];

let journeyT = 0;       // 0-1, overall journey progress
let autoSpeed = 0.0008; // units/second — slow cinematic drift

const lookTarget = new THREE.Vector3();

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

// Per-letter reveal thresholds: letter i starts appearing at LETTER_T[i]
// and is fully opaque at LETTER_T[i] + LETTER_RANGE
const LETTER_T = [0.00, 0.06, 0.12, 0.18, 0.24, 0.30, 0.36];
const LETTER_RANGE = 0.08;

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2,3)/2;
}

function updateJourneyUI(t: number) {
  const clampedT = Math.max(0, Math.min(1, t));

  // ── Progress strip ──
  const fill = document.getElementById('journey-fill');
  if (fill) fill.style.height = `${(clampedT * 100).toFixed(1)}%`;

  // ── Mission phase in badge ──
  const phaseBadge = document.getElementById('panel-phase-badge');
  if (phaseBadge) {
    let currentPhase = PHASES[0].name;
    for (let i = PHASES.length - 1; i >= 0; i--) {
      if (clampedT >= PHASES[i].progress) {
        currentPhase = PHASES[i].name;
        break;
      }
    }
    phaseBadge.textContent = `SELENE LABS · NASA SPACE APPS 2026 · ${currentPhase}`;
  }

  // ── Letters (scroll-driven, letter-by-letter reveal) ──
  document.querySelectorAll<HTMLElement>('.hero-letter').forEach((el, i) => {
    const raw = Math.max(0, Math.min(1, (clampedT - LETTER_T[i]) / LETTER_RANGE));
    const p   = easeInOutCubic(raw);
    el.style.opacity   = String(p);
    el.style.transform = `translateY(${(1-p)*28}px) scale(${0.88 + p*0.12})`;
    el.style.filter    = p > 0.02 ? `drop-shadow(0 0 ${p * 8}px rgba(56, 189, 248, ${p * 0.45}))` : 'none';
  });

  // ── Accent underline (grows left-to-right after letter 6 starts) ──
  const accent = document.getElementById('accent-line');
  if (accent) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (clampedT - 0.38) / 0.12)));
    accent.style.width   = `${p * 100}%`;
    accent.style.opacity = String(p);
  }

  // ── Tagline (after accent line) ──
  const tagline = document.getElementById('hero-tagline');
  if (tagline) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (clampedT - 0.46) / 0.12)));
    tagline.style.opacity   = String(p);
    tagline.style.transform = `translateY(${(1-p)*14}px)`;
  }

  // ── Description ──
  const desc = document.getElementById('hero-desc');
  if (desc) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (clampedT - 0.56) / 0.12)));
    desc.style.opacity   = String(p);
    desc.style.transform = `translateY(${(1-p)*12}px)`;
  }

  // ── Stats ──
  const stats = document.getElementById('panel-stats');
  if (stats) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (clampedT - 0.66) / 0.12)));
    stats.style.opacity   = String(p);
    stats.style.transform = `translateY(${(1-p)*10}px)`;
  }

  // ── CTA block ──
  const cta = document.getElementById('panel-cta');
  if (cta) {
    const p = easeInOutCubic(Math.max(0, Math.min(1, (clampedT - 0.76) / 0.12)));
    cta.style.opacity   = String(p);
    cta.style.transform = `translateY(${(1-p)*8}px)`;
    cta.style.pointerEvents = p > 0.5 ? 'auto' : 'none';
  }

  // ── Initial scroll cue (visible early, hides cleanly as user progresses) ──
  const scrollCue = document.getElementById('initial-scroll-cue');
  if (scrollCue) {
    if (clampedT > 0.30) {
      scrollCue.style.display = 'none';
    } else {
      scrollCue.style.display = 'flex';
      const fadeOutP = Math.max(0, Math.min(1, clampedT / 0.25));
      scrollCue.style.opacity = String(1 - fadeOutP);
      scrollCue.style.transform = `translateY(${fadeOutP * 12}px)`;
    }
  }
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

  // Craft position along bezier & orbital insertion around Moon
  const curve = new THREE.QuadraticBezierCurve3(
    CRAFT_BEZIER_START, CRAFT_BEZIER_CTRL, CRAFT_BEZIER_END
  );
  const tClamped = Math.max(0.001, Math.min(0.999, journeyT));
  let craftPoint = curve.getPoint(tClamped);
  let craftTangent = curve.getTangent(tClamped).normalize();

  if (journeyT >= 0.88) {
    const orbitT = Math.min(1.0, (journeyT - 0.88) / 0.12);
    const angle = elapsed * 0.45;
    const orbitRadiusX = 2.45;
    const orbitRadiusZ = 2.15;
    const orbitPoint = new THREE.Vector3(
      moonGroup.position.x + Math.cos(angle) * orbitRadiusX,
      moonGroup.position.y + Math.sin(angle * 0.7) * 0.5,
      moonGroup.position.z + Math.sin(angle) * orbitRadiusZ
    );
    craftPoint = craftPoint.lerp(orbitPoint, orbitT);
    craftTangent = new THREE.Vector3(-Math.sin(angle), Math.cos(angle * 0.7) * 0.35, Math.cos(angle)).normalize();
  }

  spacecraft.group.position.copy(craftPoint);
  spacecraft.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), craftTangent);
  spacecraft.group.rotateZ(elapsed * 0.12);

  // Pulse the blue ion plasma thruster
  (spacecraft.thrusterMat as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(elapsed * 12.0) * 0.25;

  // Strobe beacon flash
  (spacecraft.beaconMat as THREE.MeshBasicMaterial).opacity = Math.sin(elapsed * 4.5) > 0.82 ? 1.0 : 0.05;

  spacecraft.group.visible = journeyT > 0.01;

  // Earth slow rotation & cloud drift
  earthMesh.rotation.y += dt * 0.011;
  earthCloudsMesh.rotation.y += dt * 0.016; // clouds drift independently
  (EarthMaterial.uniforms.viewPos as any).value.copy(camera.position);
  (EarthCloudsMaterial.uniforms.viewPos as any).value.copy(camera.position);
  (atmosMat.uniforms.viewPos as any).value.copy(camera.position);

  // Moon slow rotation & shader camera position
  moonMesh.rotation.y += dt * 0.006;
  (MoonMaterial.uniforms.viewPos as any).value.copy(camera.position);

  // Update glow view vectors
  (moonGlowMat.uniforms.viewVector as any).value.copy(camera.position);

  // Sun billboard always faces camera
  sunGlowMesh.lookAt(camera.position);

  // Film grain shader time
  (filmPass.uniforms as any).time.value = elapsed * 8;

  composer.render();
}

animate();
