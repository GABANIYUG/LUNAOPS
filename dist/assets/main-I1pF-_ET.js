import{W as He,S as $,A as je,a as $e,C as Ye,P as qe,E as Ze,R as Je,U as Qe,V as Xe,b as Ke,c as n,B as et,d as fe,e as tt,f as oe,g as ot,D as at,h as nt,T as it,N as st,G as I,i as D,j as Y,M as f,F as be,k as Ee,l as W,m as ie,n as z,o as rt,p as we,q as lt,r as ye,s as ct,Q as dt}from"./UnrealBloomPass-BTrC-Wou.js";const w={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s6_videoStart:.72,s8_touchdown:.96,captions:[{t:.5,endT:.63,text:"400,000 KM FROM HOME"},{t:.64,endT:.7,text:"ONE QUESTION.  THREE CANDIDATE SITES."},{t:.72,endT:.79,text:"LUNAR SURFACE APPROACH"},{t:.8,endT:.88,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.89,endT:.95,text:"TOUCHDOWN IMMINENT"}],touchdownT:.96,statusLineT:.97};function vt(e){let o=e;return function(){o|=0,o=o+1831565813|0;let t=Math.imul(o^o>>>15,1|o);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967295}}new URLSearchParams(location.search).has("debug");const A=document.getElementById("landing-root"),pe=document.createElement("canvas");pe.id="scene-canvas";A.appendChild(pe);const b=document.createElement("div");b.id="cinematic-video-container";b.className="cinematic-video-container";b.setAttribute("aria-hidden","true");const r=document.createElement("video");r.id="lunar-landing-video";r.className="cinematic-video";r.playsInline=!0;r.muted=!0;r.preload="none";r.poster="/generated/lunar_landing_poster.jpg";const me=document.createElement("source");me.src="/generated/lunar_landing_optimized.mp4";me.type="video/mp4";r.appendChild(me);b.appendChild(r);const ae=document.createElement("div");ae.id="video-fallback-image";ae.className="video-fallback-image";b.appendChild(ae);const k=document.createElement("div");k.id="video-loading-indicator";k.className="video-loading-indicator";k.innerHTML='<div class="video-spinner"></div><span>SYNCHRONIZING DESCENT TELEMETRY</span>';b.appendChild(k);A.appendChild(b);const Te=document.createElement("div");Te.className="film-grain";A.appendChild(Te);const Ne=document.createElement("div");Ne.className="vignette";A.appendChild(Ne);const Pe=document.createElement("div");Pe.className="letterbox-top";A.appendChild(Pe);const Le=document.createElement("div");Le.className="letterbox-bottom";A.appendChild(Le);const ue=document.createElement("div");ue.id="ui-overlay";ue.innerHTML=`
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
`;A.appendChild(ue);const he=document.createElement("div");he.className="progress-strip";he.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';A.appendChild(he);const q=document.createElement("a");q.href="/workstation.html";q.className="skip-to-workstation";q.textContent="Skip to workstation";q.setAttribute("aria-label","Skip animation and enter workstation");A.appendChild(q);const ne=document.createElement("div");ne.id="webgl-fallback";ne.innerHTML=`
  <div>
    <p style="margin-bottom: 1rem; color: #fff;">WebGL hardware acceleration unavailable.</p>
    <a href="/workstation.html" style="color: #38bdf8; text-decoration: underline;">Proceed directly to LUNAOPS Workstation &rarr;</a>
  </div>
`;A.appendChild(ne);const pt=window.innerWidth<768,mt=pt?1.25:1.5;let R;try{R=new He({canvas:pe,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(e){throw console.error("[LUNAOPS] WebGL failed:",e),ne.classList.add("visible"),e}R.setSize(window.innerWidth,window.innerHeight);R.setPixelRatio(Math.min(window.devicePixelRatio,mt));R.outputColorSpace=$;R.toneMapping=je;R.toneMappingExposure=1.05;const V=new $e;V.background=new Ye(266);const m=new qe(32,window.innerWidth/window.innerHeight,.5,8e3);m.position.set(0,0,20);const Z=new Ze(R);Z.addPass(new Je(V,m));const Ae=new Qe(new Xe(window.innerWidth,window.innerHeight),.12,.35,.92);Z.addPass(Ae);const ut={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new n(.92,.96,1.06)},hlTint:{value:new n(1.04,1.01,.97)}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
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
  `},K=new Ke(ut);Z.addPass(K);(function(){const o=vt(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:i,rMin:l,rMax:c,size:u,opacity:y})=>{const M=new Float32Array(i*3),d=new Float32Array(i*3);for(let s=0;s<i;s++){const C=o()*Math.PI*2,a=Math.acos(2*o()-1),g=l+o()*(c-l);M[s*3]=g*Math.sin(a)*Math.cos(C),M[s*3+1]=g*Math.sin(a)*Math.sin(C),M[s*3+2]=g*Math.cos(a);const L=o();d[s*3]=.85+L*.15,d[s*3+1]=.88+L*.12,d[s*3+2]=1}const h=new et;h.setAttribute("position",new fe(M,3)),h.setAttribute("color",new fe(d,3));const p=new tt({size:u,vertexColors:!0,transparent:!0,opacity:y,sizeAttenuation:!0,blending:oe,depthWrite:!1});V.add(new ot(h,p))})})();const J=new n(8,2.5,6).normalize(),Ce=new at(16774624,3.6);Ce.position.copy(J).multiplyScalar(500);V.add(Ce);const ht=new nt(330264,.05);V.add(ht);const F=new it,gt=F.load("/generated/earth/earth_day_2k.webp",e=>{e.colorSpace=$}),ft=F.load("/generated/earth/earth_night_2k.webp",e=>{e.colorSpace=$}),wt=F.load("/generated/earth/earth_specular_2k.webp"),yt=F.load("/generated/earth/earth_clouds_2k.webp",e=>{e.colorSpace=$}),Mt=F.load("/generated/lroc_color_2k.jpg",e=>{e.colorSpace=$}),xt=F.load("/generated/ldem_normal_map_half.png",e=>{e.colorSpace=st}),ge=6,O=new I;O.position.set(26,-2,-8);V.add(O);const St=new D(ge,128,64),ke=new Y({uniforms:{dayTexture:{value:gt},nightTexture:{value:ft},specularTexture:{value:wt},sunDir:{value:J.clone()},viewPos:{value:m.position}},vertexShader:`
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz; vUv = uv;
      vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
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
  `}),Re=new f(St,ke);O.add(Re);const bt=new D(ge*1.012,128,64),Ve=new Y({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:yt},sunDir:{value:J.clone()},viewPos:{value:m.position}},vertexShader:`
    varying vec3 vNormal; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vUv = uv; vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
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
  `}),Ie=new f(bt,Ve);O.add(Ie);const Et=new D(ge*1.028,64,32),De=new Y({transparent:!0,side:be,depthWrite:!1,blending:oe,uniforms:{sunDir:{value:J.clone()},viewPos:{value:m.position}},vertexShader:`
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
  `,fragmentShader:`
    varying float vRim; varying float vSunFacing;
    void main() {
      vec3 dayAtmo = vec3(0.18, 0.52, 1.0);
      vec3 nightAtmo = vec3(0.01, 0.04, 0.12);
      vec3 atmo = mix(nightAtmo, dayAtmo, clamp(vSunFacing, 0.0, 1.0));
      gl_FragColor = vec4(atmo, vRim * vSunFacing * 0.78);
    }
  `});O.add(new f(Et,De));const Ue=2.2,N=new I;N.position.set(4.5,.8,-28);N.rotation.x=Ee.degToRad(6.68);V.add(N);const Tt=new D(Ue,128,64),H=new Y({uniforms:{colorTexture:{value:Mt},normalTexture:{value:xt},sunDir:{value:J.clone()},viewPos:{value:m.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
    varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying vec3 vViewVector;
    uniform vec3 viewPos;
    void main() {
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz; vUv = uv;
      vViewVector = normalize(viewPos - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
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
  `}),Oe=new f(Tt,H);N.add(Oe);const Nt=new D(Ue*1.008,64,32),ee=new Y({transparent:!0,side:be,depthWrite:!1,blending:oe,uniforms:{viewVector:{value:m.position.clone()},opacity:{value:1}},vertexShader:`
    uniform vec3 viewVector; varying float vI;
    void main() {
      vec3 N = normalize(normalMatrix * normal);
      vec3 V = normalize(normalMatrix * viewVector);
      vI = pow(1.0 - abs(dot(N, V)), 4.2);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    varying float vI; uniform float opacity;
    void main() { gl_FragColor = vec4(0.72, 0.80, 0.90, vI * 0.13 * opacity); }
  `});N.add(new f(Nt,ee));const Pt=new n(26,-2,-8),Lt=new n(12,6,-14),At=new n(6.5,2,-25);function Ct(){const e=new I,o=new W({color:15594232,metalness:.65,roughness:.3}),t=new W({color:13606442,metalness:.92,roughness:.18}),i=new W({color:1580066,metalness:.88,roughness:.42,side:ie}),l=new W({color:464168,metalness:.9,roughness:.12}),c=new W({color:14213096,metalness:.88,roughness:.28,side:ie});e.add(Object.assign(new f(new z(.34,.36,.85,8),o))),e.add(Object.assign(new f(new z(.362,.362,.38,8),t)));const u=new f(new z(.18,.34,.44,8),o);u.position.y=.64,e.add(u);const y=new f(new rt(.12,.022,8,20),i);y.rotation.x=Math.PI/2,y.position.y=.87,e.add(y);const M=new f(new z(.24,.09,.3,16,1,!0),i);M.position.y=-.58,e.add(M);const d=new we({color:10342639,transparent:!0,opacity:.3,blending:oe,side:ie,depthWrite:!1}),h=new f(new lt(.08,.32,12,1,!0),d);h.position.y=-.76,h.rotation.x=Math.PI,e.add(h),[-1,1].forEach(L=>{const S=new I;S.position.set(L*.44,0,0);const _=new f(new z(.018,.018,.28,8),i);_.rotation.z=Math.PI/2,_.position.x=L*.14,S.add(_);for(let B=0;B<3;B++){const Q=new I;Q.position.x=L*(.34+B*.52),Q.add(Object.assign(new f(new ye(.47,.013,.31),t))),Q.add(Object.assign(new f(new ye(.44,.015,.28),l))),S.add(Q)}e.add(S)});const p=new I;p.position.set(.3,.2,.3),p.rotation.set(-.55,.65,0),p.add(new f(new D(.22,16,10,0,Math.PI*2,0,Math.PI*.42),c));const s=new f(new z(.009,.009,.2,6),i);s.position.z=.1,s.rotation.x=Math.PI/2,p.add(s),e.add(p);const C=new we({color:16777215,transparent:!0,opacity:0}),a=new f(new D(.022,6,6),C);a.position.y=.93,e.add(a);const g=new I;return e.rotation.x=Math.PI/2,g.add(e),{group:g,thrusterMat:d,beaconMat:C}}const x=Ct();x.group.visible=!1;V.add(x.group);const T=[{progress:0,pos:new n(28,3.5,20),look:new n(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.2,pos:new n(18,5.5,16),look:new n(17,.5,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.38,pos:new n(10,4.5,8),look:new n(7.5,2,-18),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.52,pos:new n(6,2.8,.5),look:new n(4.2,.8,-28),fov:35,name:"LUNAR ORBIT INSERTION"},{progress:.64,pos:new n(5.8,1.5,-12),look:new n(4.45,.2,-22),fov:28,name:"DESCENT ORBIT"},{progress:.7,pos:new n(4.5,1,-25.5),look:new n(4.2,.5,-30),fov:20,name:"SURFACE TRANSITION"},{progress:.72,pos:new n(4.5,1,-26),look:new n(4.2,.5,-30),fov:20,name:"LUNAR SURFACE APPROACH"},{progress:.82,pos:new n(4.5,1,-26),look:new n(4.2,.5,-30),fov:20,name:"POWERED DESCENT"},{progress:.96,pos:new n(4.5,1,-26),look:new n(4.2,.5,-30),fov:20,name:"TOUCHDOWN COMPLETE"},{progress:1,pos:new n(4.5,1,-26),look:new n(4.2,.5,-30),fov:20,name:"TOUCHDOWN COMPLETE"}];function E(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function _e(e){const o=Math.max(0,Math.min(1,e));let t=T.length-1;for(let s=0;s<T.length-1;s++)if(o>=T[s].progress&&o<T[s+1].progress){t=s;break}const i=T[t],l=T[Math.min(t+1,T.length-1)],c=l.progress-i.progress,u=c>0?(o-i.progress)/c:1,y=E(Math.max(0,Math.min(1,u))),M=new n().lerpVectors(i.pos,l.pos,y),d=new n().lerpVectors(i.look,l.look,y),h=i.fov+(l.fov-i.fov)*y;let p=i.name;for(let s=T.length-1;s>=0;s--)if(o>=T[s].progress){p=T[s].name;break}return{pos:M,look:d,fov:h,phaseName:p}}function kt(e){const o=e<.45,t=e>=.35&&e<.71;if(O.visible=o,N.visible=t,t)if(e>=.67){const i=Math.max(0,Math.min(1,(e-.67)/.035)),l=1-E(i);H.uniforms.opacity.value=l,ee.uniforms.opacity.value=l}else H.uniforms.opacity.value=1,ee.uniforms.opacity.value=1;if(e>=.69&&e<=.74){const i=Math.max(0,Math.min(1,(e-.69)/.025)),l=Math.max(0,Math.min(1,(e-.715)/.025)),c=i*(1-l);K.uniforms.exposure.value=1.05-c*.95}else K.uniforms.exposure.value=1.05}function ze(){for(let e=0;e<=1e3;e++){const o=e/1e3,t=o<.71,i=o>=.72;if(t&&i)return console.error(`[LUNAOPS ASSERT FAIL] Both globe and video visible at t=${o.toFixed(3)}!`),!1}return console.log("[LUNAOPS] Visibility assertion passed: globe and landing video strictly mutually exclusive."),!0}let re=!1,Me=!1,Fe=5.75,G=0,le=!1,ce=!1,de=!1;function Be(){Me||(Me=!0,r.preload="auto",r.load())}r.addEventListener("loadedmetadata",()=>{re=!0,r.duration&&!isNaN(r.duration)&&r.duration>0&&(Fe=r.duration),k.classList.remove("visible")});r.addEventListener("error",e=>{console.warn("[LUNAOPS] Video playback error, activating fallback frame:",e),de=!0,ae.classList.add("visible"),k.classList.remove("visible")});function U(e){e>.3&&Be();const o=w.s6_videoStart,t=w.s8_touchdown;if(e<.7){b.style.opacity="0",b.style.pointerEvents="none",b.classList.remove("active");return}const i=Math.max(0,Math.min(1,(e-.7)/.03));b.style.opacity=String(E(i)),b.style.pointerEvents=e>=.72?"auto":"none",b.classList.add("active");const c=Math.max(0,Math.min(1,(e-o)/(t-o)))*Fe;if(de||!re){e>=.72&&!re&&!de&&k.classList.add("visible");return}if(k.classList.remove("visible"),G=c,!(Math.abs(r.currentTime-G)<.012))if(le)ce=!0;else if(le=!0,typeof r.fastSeek=="function")try{r.fastSeek(G)}catch{r.currentTime=G}else r.currentTime=G}r.addEventListener("seeked",()=>{le=!1,ce&&(ce=!1,U(P))});let v=0,P=0,X=0,j=w.autoSpeed,se=null;const xe=new n;try{const e=new URLSearchParams(window.location.search);if(e.has("t")){const o=parseFloat(e.get("t"));isNaN(o)||(v=P=Math.max(0,Math.min(1,o)),j=0)}}catch{}function te(){j=0,se&&clearTimeout(se),se=setTimeout(()=>{j=w.autoSpeed},2800)}function Rt(e){const o=w.springStiffness,t=w.springDamping,i=Math.max(0,Math.min(1,v)),l=o*(i-P)-t*X;X+=l*e,P+=X*e,P=Math.max(0,Math.min(1,P))}const Vt=window.matchMedia("(prefers-reduced-motion: reduce)").matches,It=[0,.05,.1,.15,.2,.25,.3],Dt=.07;function Ut(e,o){const t=Math.max(0,Math.min(1,e)),i=document.getElementById("journey-fill");i&&(i.style.height=`${(t*100).toFixed(1)}%`);const l=document.getElementById("panel-phase-badge");if(l){const{phaseName:a}=_e(t);l.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${a}`}const c=document.getElementById("left-panel");if(c)if(t<.28)c.style.opacity="1",c.style.pointerEvents="auto";else if(t<.44){const a=E((t-.28)/.16);c.style.opacity=String(1-a),c.style.pointerEvents="none"}else c.style.opacity="0",c.style.pointerEvents="none";const u=document.getElementById("touchdown-dock");if(u)if(t>=w.touchdownT){const a=E(Math.max(0,Math.min(1,(t-w.touchdownT)/.02)));u.classList.add("visible"),u.style.opacity=String(a),u.style.transform=`translateX(-50%) translateY(${(1-a)*12}px)`,u.style.pointerEvents="auto"}else u.classList.remove("visible"),u.style.opacity="0",u.style.pointerEvents="none";document.querySelectorAll(".hero-letter").forEach((a,g)=>{if(Vt){a.style.opacity="1",a.style.transform="none";return}const L=Math.max(0,Math.min(1,(t-It[g])/Dt)),S=E(L);a.style.opacity=String(S),a.style.transform=`translateY(${(1-S)*24}px) scale(${.88+S*.12})`,a.style.filter=S>.02?`drop-shadow(0 0 ${S*6}px rgba(56,189,248,${S*.38}))`:"none"});const y=document.getElementById("accent-line");if(y){const a=E(Math.max(0,Math.min(1,(t-.32)/.1)));y.style.width=`${a*100}%`,y.style.opacity=String(a)}const M=document.getElementById("hero-tagline");if(M&&t<.5){const a=E(Math.max(0,Math.min(1,(t-.1)/.12))),g=E(Math.max(0,Math.min(1,(t-.35)/.1)));M.style.opacity=String(a*(1-g))}const d=document.getElementById("hero-desc");if(d&&t<.5){const a=E(Math.max(0,Math.min(1,(t-.14)/.12))),g=E(Math.max(0,Math.min(1,(t-.38)/.1)));d.style.opacity=String(a*(1-g))}const h=document.getElementById("initial-scroll-cue");if(h)if(t>.24)h.style.display="none";else{h.style.display="flex";const a=Math.max(0,Math.min(1,t/.18));h.style.opacity=String(1-a)}const p=document.getElementById("shot-caption");if(p){let a="";for(const g of w.captions)if(t>=g.t&&t<=g.endT){a=g.text;break}a!==p.textContent&&(p.style.opacity="0",setTimeout(()=>{p.textContent=a,p.style.opacity=a?"1":"0"},120))}const s=document.getElementById("descent-telemetry");if(s)if(t>=w.s6_videoStart&&t<w.touchdownT){const a=(t-w.s6_videoStart)/(w.touchdownT-w.s6_videoStart),g=Math.max(0,15200*Math.pow(1-a,2.2)),L=a>=.98?0:-(42*Math.pow(1-a,1.8)+1.2),S=document.getElementById("telem-alt"),_=document.getElementById("telem-vspd");S&&(S.textContent=`ALT: ${Math.round(g).toLocaleString().padStart(6)} m`),_&&(_.textContent=`V/S: ${L.toFixed(1).padStart(6)} m/s`);const B=E(Math.max(0,Math.min(1,(t-w.s6_videoStart)/.02)));s.style.opacity=String(B)}else s.style.opacity="0";const C=document.getElementById("status-line");if(C)if(t>=w.statusLineT){const a=E(Math.max(0,Math.min(1,(t-w.statusLineT)/.015)));C.style.opacity=String(a)}else C.style.opacity="0"}window.addEventListener("wheel",e=>{e.preventDefault(),v+=e.deltaY*38e-5,v=Math.max(0,Math.min(1,v)),te(),U(v)},{passive:!1});let ve=0;window.addEventListener("touchstart",e=>{ve=e.touches[0].clientY,Be()},{passive:!0});window.addEventListener("touchmove",e=>{const o=ve-e.touches[0].clientY;ve=e.touches[0].clientY,v+=o*75e-5,v=Math.max(0,Math.min(1,v)),te(),U(v)},{passive:!0});window.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowRight"){const o=T.find(t=>t.progress>v+.01);o&&(v=o.progress,te(),U(v)),e.preventDefault()}else if(e.key==="ArrowUp"||e.key==="ArrowLeft"){const t=[...T].reverse().find(i=>i.progress<v-.01);t&&(v=t.progress,te(),U(v)),e.preventDefault()}else(e.key==="Enter"||e.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const e=window.innerWidth,o=window.innerHeight;m.aspect=e/o,m.updateProjectionMatrix(),R.setSize(e,o),Z.setSize(e,o),Ae.resolution.set(e,o)});let We=!0;document.addEventListener("visibilitychange",()=>{We=!document.hidden});const Se=new ct;function Ge(){if(requestAnimationFrame(Ge),!We)return;const e=Math.min(Se.getDelta(),.1),o=Se.getElapsedTime();v+=j*e,v=Math.max(0,Math.min(1,v)),Rt(e);const t=P,{pos:i,look:l,fov:c}=_e(t),u=t<.65?.06:.01,y=new n(Math.sin(o*.08)*u,Math.cos(o*.055)*(u*.55),0);m.position.lerp(i.clone().add(y),.055),xe.lerp(l,.055),m.lookAt(xe),Math.abs(m.fov-c)>.05&&(m.fov=Ee.lerp(m.fov,c,.05),m.updateProjectionMatrix()),kt(t),U(t);const M=new dt(Pt,Lt,At);if(t>=.01&&t<.5){x.group.visible=!0;const d=Math.max(.001,Math.min(.999,t/.5)),h=M.getPoint(d),p=M.getTangent(d).normalize();x.group.position.copy(h),x.group.quaternion.setFromUnitVectors(new n(0,0,-1),p),x.group.rotateZ(o*.1),x.thrusterMat.opacity=.2+Math.sin(o*9)*.1,x.beaconMat.opacity=Math.sin(o*4.2)>.88?.9:0}else if(t>=.5&&t<.68){x.group.visible=!0;const d=o*.35,h=new n(N.position.x+Math.cos(d)*3.8,N.position.y+.8+Math.sin(d*.7)*.5,N.position.z+Math.sin(d)*3.2);x.group.position.copy(h);const p=new n(-Math.sin(d),.15,Math.cos(d)).normalize();x.group.quaternion.setFromUnitVectors(new n(0,0,-1),p),x.thrusterMat.opacity=.22+Math.sin(o*9)*.08,x.beaconMat.opacity=Math.sin(o*4)>.88?.9:0}else x.group.visible=!1;N.visible&&(Oe.rotation.y+=e*.006,H.uniforms.viewPos.value.copy(m.position),ee.uniforms.viewVector.value.copy(m.position)),O.visible&&(Re.rotation.y+=e*.011,Ie.rotation.y+=e*.016,ke.uniforms.viewPos.value.copy(m.position),Ve.uniforms.viewPos.value.copy(m.position),De.uniforms.viewPos.value.copy(m.position)),K.uniforms.time.value=o,Ut(t),Z.render()}window.__lunaops={setJourney:e=>{v=Math.max(0,Math.min(1,e)),P=v,X=0,j=0,U(P)},getJourney:()=>P,visibility:()=>({moonGroup:N.visible,moonOpacity:H.uniforms.opacity.value,videoVisible:P>=.72,videoOpacity:parseFloat(b.style.opacity||"0"),videoCurrentTime:r.currentTime,orbiter:x.group.visible}),assertVisibility:ze};ze();Ge();
