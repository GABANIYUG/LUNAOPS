import{W as pt,S as Z,A as mt,a as ut,C as ht,P as gt,E as ft,R as wt,U as yt,V as Mt,b as xt,c as i,B as St,d as De,e as bt,f as le,g as Et,D as ye,h as Tt,T as Nt,N as Pt,G as W,i as U,j as J,M as m,F as We,k as Ge,l as F,m as B,n as C,o as Ue,p as _e,q as Lt,r as ne,s as Ct,Q as kt,t as At,u as Oe}from"./UnrealBloomPass-Cp108JUZ.js";const M={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s6_videoStart:.72,s8_touchdown:.96,captions:[{t:.5,endT:.63,text:"400,000 KM FROM HOME"},{t:.64,endT:.7,text:"ONE QUESTION.  THREE CANDIDATE SITES."},{t:.72,endT:.79,text:"LUNAR SURFACE APPROACH"},{t:.8,endT:.88,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.89,endT:.95,text:"TOUCHDOWN IMMINENT"}],touchdownT:.96,statusLineT:.97};function It(e){let t=e;return function(){t|=0,t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967295}}new URLSearchParams(location.search).has("debug");const k=document.getElementById("landing-root"),Te=document.createElement("canvas");Te.id="scene-canvas";k.appendChild(Te);const b=document.createElement("div");b.id="cinematic-video-container";b.className="cinematic-video-container";b.setAttribute("aria-hidden","true");const u=document.createElement("video");u.id="lunar-landing-video";u.className="cinematic-video";u.playsInline=!0;u.muted=!0;u.preload="none";u.poster="/generated/lunar_landing_poster.jpg";const Ne=document.createElement("source");Ne.src="/generated/lunar_landing_optimized.mp4";Ne.type="video/mp4";u.appendChild(Ne);b.appendChild(u);const ce=document.createElement("div");ce.id="video-fallback-image";ce.className="video-fallback-image";b.appendChild(ce);const R=document.createElement("div");R.id="video-loading-indicator";R.className="video-loading-indicator";R.innerHTML='<div class="video-spinner"></div><span>SYNCHRONIZING DESCENT TELEMETRY</span>';b.appendChild(R);k.appendChild(b);const He=document.createElement("div");He.className="film-grain";k.appendChild(He);const je=document.createElement("div");je.className="vignette";k.appendChild(je);const $e=document.createElement("div");$e.className="letterbox-top";k.appendChild($e);const Ye=document.createElement("div");Ye.className="letterbox-bottom";k.appendChild(Ye);const Pe=document.createElement("div");Pe.id="ui-overlay";Pe.innerHTML=`
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
`;k.appendChild(Pe);const Le=document.createElement("div");Le.className="progress-strip";Le.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';k.appendChild(Le);const Q=document.createElement("a");Q.href="/workstation.html";Q.className="skip-to-workstation";Q.textContent="Skip to workstation";Q.setAttribute("aria-label","Skip animation and enter workstation");k.appendChild(Q);const de=document.createElement("div");de.id="webgl-fallback";de.innerHTML=`
  <div>
    <p style="margin-bottom: 1rem; color: #fff;">WebGL hardware acceleration unavailable.</p>
    <a href="/workstation.html" style="color: #38bdf8; text-decoration: underline;">Proceed directly to LUNAOPS Workstation &rarr;</a>
  </div>
`;k.appendChild(de);const Rt=window.innerWidth<768,Vt=Rt?1.25:1.5;let V;try{V=new pt({canvas:Te,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(e){throw console.error("[LUNAOPS] WebGL failed:",e),de.classList.add("visible"),e}V.setSize(window.innerWidth,window.innerHeight);V.setPixelRatio(Math.min(window.devicePixelRatio,Vt));V.outputColorSpace=Z;V.toneMapping=mt;V.toneMappingExposure=1.05;const D=new ut;D.background=new ht(266);const g=new gt(32,window.innerWidth/window.innerHeight,.5,8e3);g.position.set(0,0,20);const K=new ft(V);K.addPass(new wt(D,g));const qe=new yt(new Mt(window.innerWidth,window.innerHeight),.12,.35,.92);K.addPass(qe);const Dt={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new i(.92,.96,1.06)},hlTint:{value:new i(1.04,1.01,.97)}},vertexShader:`
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
  `},ie=new xt(Dt);K.addPass(ie);(function(){const t=It(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:n,rMin:l,rMax:r,size:p,opacity:y})=>{const f=new Float32Array(n*3),v=new Float32Array(n*3);for(let s=0;s<n;s++){const T=t()*Math.PI*2,a=Math.acos(2*t()-1),w=l+t()*(r-l);f[s*3]=w*Math.sin(a)*Math.cos(T),f[s*3+1]=w*Math.sin(a)*Math.sin(T),f[s*3+2]=w*Math.cos(a);const A=t();v[s*3]=.85+A*.15,v[s*3+1]=.88+A*.12,v[s*3+2]=1}const c=new St;c.setAttribute("position",new De(f,3)),c.setAttribute("color",new De(v,3));const d=new bt({size:p,vertexColors:!0,transparent:!0,opacity:y,sizeAttenuation:!0,blending:le,depthWrite:!1});D.add(new Et(c,d))})})();const ee=new i(8,2.5,6).normalize(),Xe=new ye(16774624,3.6);Xe.position.copy(ee).multiplyScalar(500);D.add(Xe);const Ut=new Tt(330264,.05);D.add(Ut);const G=new Nt,_t=G.load("/generated/earth/earth_day_2k.webp",e=>{e.colorSpace=Z}),Ot=G.load("/generated/earth/earth_night_2k.webp",e=>{e.colorSpace=Z}),zt=G.load("/generated/earth/earth_specular_2k.webp"),Ft=G.load("/generated/earth/earth_clouds_2k.webp",e=>{e.colorSpace=Z}),Bt=G.load("/generated/lroc_color_2k.jpg",e=>{e.colorSpace=Z}),Wt=G.load("/generated/ldem_normal_map_half.png",e=>{e.colorSpace=Pt}),Ce=6,O=new W;O.position.set(26,-2,-8);D.add(O);const Gt=new U(Ce,128,64),Ze=new J({uniforms:{dayTexture:{value:_t},nightTexture:{value:Ot},specularTexture:{value:zt},sunDir:{value:ee.clone()},viewPos:{value:g.position}},vertexShader:`
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
  `}),Je=new m(Gt,Ze);O.add(Je);const Ht=new U(Ce*1.012,128,64),Qe=new J({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:Ft},sunDir:{value:ee.clone()},viewPos:{value:g.position}},vertexShader:`
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
  `}),Ke=new m(Ht,Qe);O.add(Ke);const jt=new U(Ce*1.028,64,32),et=new J({transparent:!0,side:We,depthWrite:!1,blending:le,uniforms:{sunDir:{value:ee.clone()},viewPos:{value:g.position}},vertexShader:`
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
  `});O.add(new m(jt,et));const tt=2.2,P=new W;P.position.set(4.5,.8,-28);P.rotation.x=Ge.degToRad(6.68);D.add(P);const $t=new U(tt,128,64),q=new J({uniforms:{colorTexture:{value:Bt},normalTexture:{value:Wt},sunDir:{value:ee.clone()},viewPos:{value:g.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),ot=new m($t,q);P.add(ot);const Yt=new U(tt*1.008,64,32),se=new J({transparent:!0,side:We,depthWrite:!1,blending:le,uniforms:{viewVector:{value:g.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});P.add(new m(Yt,se));const qt=new i(26,-2,-8),Xt=new i(12,6,-14),Zt=new i(6.5,2,-25);function Jt(){const e=document.createElement("canvas");e.width=256,e.height=128;const t=e.getContext("2d");t.fillStyle="#081426",t.fillRect(0,0,256,128);const o=5,n=3,l=4,r=(256-l*(o+1))/o,p=(128-l*(n+1))/n;for(let f=0;f<o;f++)for(let v=0;v<n;v++){const c=l+f*(r+l),d=l+v*(p+l),s=t.createLinearGradient(c,d,c+r,d+p);s.addColorStop(0,"#2b6cb0"),s.addColorStop(.4,"#1e4e8c"),s.addColorStop(1,"#133360"),t.fillStyle=s,t.fillRect(c,d,r,p),t.strokeStyle="rgba(125, 211, 252, 0.7)",t.lineWidth=1,t.beginPath(),t.moveTo(c,d+p*.5),t.lineTo(c+r,d+p*.5),t.stroke(),t.strokeStyle="rgba(125, 211, 252, 0.4)",t.beginPath(),t.moveTo(c+r*.33,d),t.lineTo(c+r*.33,d+p),t.moveTo(c+r*.67,d),t.lineTo(c+r*.67,d+p),t.stroke()}const y=new At(e);return y.wrapS=Oe,y.wrapT=Oe,y}function Qt(){const e=new W,t=new F({color:15791612,metalness:.6,roughness:.32,emissive:1779768,emissiveIntensity:.35}),o=new F({color:16097819,metalness:.55,roughness:.35,emissive:4530691,emissiveIntensity:.6,side:B}),n=new F({color:14083058,metalness:.7,roughness:.28,emissive:2241095,emissiveIntensity:.6,side:B}),l=new F({color:2370872,metalness:.8,roughness:.4,emissive:988444,emissiveIntensity:.35,side:B}),r=Jt(),p=new F({map:r,color:6333946,emissive:1982639,emissiveMap:r,emissiveIntensity:.85,metalness:.3,roughness:.25,side:B}),y=new F({color:14871541,metalness:.85,roughness:.25,emissive:1779512,emissiveIntensity:.4,side:B});e.add(Object.assign(new m(new C(.34,.36,.85,12),t))),e.add(Object.assign(new m(new C(.364,.364,.38,12),o)));const f=new m(new C(.18,.34,.44,12),t);f.position.y=.64,e.add(f);const v=new m(new Ue(.12,.022,8,20),n);v.rotation.x=Math.PI/2,v.position.y=.87,e.add(v);const c=new m(new C(.24,.09,.3,16,1,!0),l);c.position.y=-.58,e.add(c);const d=new _e({color:10342639,transparent:!0,opacity:.3,blending:le,side:B,depthWrite:!1}),s=new m(new Lt(.08,.32,12,1,!0),d);s.position.y=-.76,s.rotation.x=Math.PI,e.add(s),[-1,1].forEach(I=>{const ve=new m(new C(.065,.065,.09,12),n);ve.rotation.z=Math.PI/2,ve.position.set(I*.35,0,0),e.add(ve);const pe=new m(new Ue(.068,.016,8,16),o);pe.rotation.y=Math.PI/2,pe.position.set(I*.37,0,0),e.add(pe);const j=.38,me=new m(new C(.026,.026,j,12),n);me.rotation.z=Math.PI/2,me.position.set(I*(.35+j/2),0,0),e.add(me);const ue=new m(new C(.014,.014,j*.95,8),o);ue.rotation.z=Math.PI/2,ue.position.set(I*(.35+j/2),.035,0),e.add(ue);const he=I*(.35+j),ke=new m(new ne(.07,.08,.09),o);ke.position.set(he,0,0),e.add(ke);const Ae=new m(new C(.028,.028,.09,8),n);Ae.position.set(he,0,0),e.add(Ae);const z=.5,ge=.36,Ie=.05;for(let oe=0;oe<3;oe++){const Re=he+I*(.05+z/2+oe*(z+Ie)),$=new W;$.position.set(Re,0,0);const ct=new m(new ne(z,.015,ge),o);$.add(ct);const dt=new m(new ne(z-.025,.02,ge-.025),p);$.add(dt);const Ve=new m(new ne(.014,.022,ge+.008),n);if(Ve.position.set(I*(z/2),0,0),$.add(Ve),e.add($),oe<2){const vt=Re+I*(z/2+Ie/2),fe=new m(new C(.018,.018,.06,8),n);fe.rotation.x=Math.PI/2,fe.position.set(vt,0,0),e.add(fe)}}});const T=new W;T.position.set(.3,.2,.3),T.rotation.set(-.55,.65,0),T.add(new m(new U(.22,16,10,0,Math.PI*2,0,Math.PI*.42),y));const a=new m(new C(.012,.012,.2,6),n);a.position.z=.1,a.rotation.x=Math.PI/2,T.add(a),e.add(T);const w=new _e({color:16777215,transparent:!0,opacity:0}),A=new m(new U(.025,6,6),w);A.position.y=.93,e.add(A);const S=new W;e.rotation.x=Math.PI/2,S.add(e);const H=new ye(7909119,1.4);H.position.set(-8,6,-6),S.add(H);const te=new ye(3718648,1);return te.position.set(6,-6,5),S.add(te),{group:S,thrusterMat:d,beaconMat:w}}const x=Qt();x.group.visible=!1;D.add(x.group);const N=[{progress:0,pos:new i(28,3.5,20),look:new i(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.2,pos:new i(18,5.5,16),look:new i(17,.5,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.38,pos:new i(10,4.5,8),look:new i(7.5,2,-18),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.52,pos:new i(6,2.8,.5),look:new i(4.2,.8,-28),fov:35,name:"LUNAR ORBIT INSERTION"},{progress:.64,pos:new i(5.8,1.5,-12),look:new i(4.45,.2,-22),fov:28,name:"DESCENT ORBIT"},{progress:.7,pos:new i(4.5,1,-25.5),look:new i(4.2,.5,-30),fov:20,name:"SURFACE TRANSITION"},{progress:.72,pos:new i(4.5,1,-26),look:new i(4.2,.5,-30),fov:20,name:"LUNAR SURFACE APPROACH"},{progress:.82,pos:new i(4.5,1,-26),look:new i(4.2,.5,-30),fov:20,name:"POWERED DESCENT"},{progress:.96,pos:new i(4.5,1,-26),look:new i(4.2,.5,-30),fov:20,name:"TOUCHDOWN COMPLETE"},{progress:1,pos:new i(4.5,1,-26),look:new i(4.2,.5,-30),fov:20,name:"TOUCHDOWN COMPLETE"}];function E(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function nt(e){const t=Math.max(0,Math.min(1,e));let o=N.length-1;for(let s=0;s<N.length-1;s++)if(t>=N[s].progress&&t<N[s+1].progress){o=s;break}const n=N[o],l=N[Math.min(o+1,N.length-1)],r=l.progress-n.progress,p=r>0?(t-n.progress)/r:1,y=E(Math.max(0,Math.min(1,p))),f=new i().lerpVectors(n.pos,l.pos,y),v=new i().lerpVectors(n.look,l.look,y),c=n.fov+(l.fov-n.fov)*y;let d=n.name;for(let s=N.length-1;s>=0;s--)if(t>=N[s].progress){d=N[s].name;break}return{pos:f,look:v,fov:c,phaseName:d}}function Kt(e){const t=e<.45,o=e>=.35&&e<.71;if(O.visible=t,P.visible=o,o)if(e>=.67){const n=Math.max(0,Math.min(1,(e-.67)/.035)),l=1-E(n);q.uniforms.opacity.value=l,se.uniforms.opacity.value=l}else q.uniforms.opacity.value=1,se.uniforms.opacity.value=1;if(e>=.69&&e<=.74){const n=Math.max(0,Math.min(1,(e-.69)/.025)),l=Math.max(0,Math.min(1,(e-.715)/.025)),r=n*(1-l);ie.uniforms.exposure.value=1.05-r*.95}else ie.uniforms.exposure.value=1.05}function at(){for(let e=0;e<=1e3;e++){const t=e/1e3,o=t<.71,n=t>=.72;if(o&&n)return console.error(`[LUNAOPS ASSERT FAIL] Both globe and video visible at t=${t.toFixed(3)}!`),!1}return console.log("[LUNAOPS] Visibility assertion passed: globe and landing video strictly mutually exclusive."),!0}let Me=!1,ze=!1,it=5.75,Y=0,xe=!1,Se=!1,be=!1;function st(){ze||(ze=!0,u.preload="auto",u.load())}u.addEventListener("loadedmetadata",()=>{Me=!0,u.duration&&!isNaN(u.duration)&&u.duration>0&&(it=u.duration),R.classList.remove("visible")});u.addEventListener("error",e=>{console.warn("[LUNAOPS] Video playback error, activating fallback frame:",e),be=!0,ce.classList.add("visible"),R.classList.remove("visible")});function _(e){e>.3&&st();const t=M.s6_videoStart,o=M.s8_touchdown;if(e<.7){b.style.opacity="0",b.style.pointerEvents="none",b.classList.remove("active");return}const n=Math.max(0,Math.min(1,(e-.7)/.03));b.style.opacity=String(E(n)),b.style.pointerEvents=e>=.72?"auto":"none",b.classList.add("active");const r=Math.max(0,Math.min(1,(e-t)/(o-t)))*it;if(be||!Me){e>=.72&&!Me&&!be&&R.classList.add("visible");return}if(R.classList.remove("visible"),Y=r,!(Math.abs(u.currentTime-Y)<.012))if(xe)Se=!0;else if(xe=!0,typeof u.fastSeek=="function")try{u.fastSeek(Y)}catch{u.currentTime=Y}else u.currentTime=Y}u.addEventListener("seeked",()=>{xe=!1,Se&&(Se=!1,_(L))});let h=0,L=0,ae=0,X=M.autoSpeed,we=null;const Fe=new i;try{const e=new URLSearchParams(window.location.search);if(e.has("t")){const t=parseFloat(e.get("t"));isNaN(t)||(h=L=Math.max(0,Math.min(1,t)),X=0)}}catch{}function re(){X=0,we&&clearTimeout(we),we=setTimeout(()=>{X=M.autoSpeed},2800)}function eo(e){const t=M.springStiffness,o=M.springDamping,n=Math.max(0,Math.min(1,h)),l=t*(n-L)-o*ae;ae+=l*e,L+=ae*e,L=Math.max(0,Math.min(1,L))}const to=window.matchMedia("(prefers-reduced-motion: reduce)").matches,oo=[0,.05,.1,.15,.2,.25,.3],no=.07;function ao(e,t){const o=Math.max(0,Math.min(1,e)),n=document.getElementById("journey-fill");n&&(n.style.height=`${(o*100).toFixed(1)}%`);const l=document.getElementById("panel-phase-badge");if(l){const{phaseName:a}=nt(o);l.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${a}`}const r=document.getElementById("left-panel");if(r)if(o<.28)r.style.opacity="1",r.style.pointerEvents="auto";else if(o<.44){const a=E((o-.28)/.16);r.style.opacity=String(1-a),r.style.pointerEvents="none"}else r.style.opacity="0",r.style.pointerEvents="none";const p=document.getElementById("touchdown-dock");if(p)if(o>=M.touchdownT){const a=E(Math.max(0,Math.min(1,(o-M.touchdownT)/.02)));p.classList.add("visible"),p.style.opacity=String(a),p.style.transform=`translateX(-50%) translateY(${(1-a)*12}px)`,p.style.pointerEvents="auto"}else p.classList.remove("visible"),p.style.opacity="0",p.style.pointerEvents="none";document.querySelectorAll(".hero-letter").forEach((a,w)=>{if(to){a.style.opacity="1",a.style.transform="none";return}const A=Math.max(0,Math.min(1,(o-oo[w])/no)),S=E(A);a.style.opacity=String(S),a.style.transform=`translateY(${(1-S)*24}px) scale(${.88+S*.12})`,a.style.filter=S>.02?`drop-shadow(0 0 ${S*6}px rgba(56,189,248,${S*.38}))`:"none"});const y=document.getElementById("accent-line");if(y){const a=E(Math.max(0,Math.min(1,(o-.32)/.1)));y.style.width=`${a*100}%`,y.style.opacity=String(a)}const f=document.getElementById("hero-tagline");if(f&&o<.5){const a=E(Math.max(0,Math.min(1,(o-.1)/.12))),w=E(Math.max(0,Math.min(1,(o-.35)/.1)));f.style.opacity=String(a*(1-w))}const v=document.getElementById("hero-desc");if(v&&o<.5){const a=E(Math.max(0,Math.min(1,(o-.14)/.12))),w=E(Math.max(0,Math.min(1,(o-.38)/.1)));v.style.opacity=String(a*(1-w))}const c=document.getElementById("initial-scroll-cue");if(c)if(o>.24)c.style.display="none";else{c.style.display="flex";const a=Math.max(0,Math.min(1,o/.18));c.style.opacity=String(1-a)}const d=document.getElementById("shot-caption");if(d){let a="";for(const w of M.captions)if(o>=w.t&&o<=w.endT){a=w.text;break}a!==d.textContent&&(d.style.opacity="0",setTimeout(()=>{d.textContent=a,d.style.opacity=a?"1":"0"},120))}const s=document.getElementById("descent-telemetry");if(s)if(o>=M.s6_videoStart&&o<M.touchdownT){const a=(o-M.s6_videoStart)/(M.touchdownT-M.s6_videoStart),w=Math.max(0,15200*Math.pow(1-a,2.2)),A=a>=.98?0:-(42*Math.pow(1-a,1.8)+1.2),S=document.getElementById("telem-alt"),H=document.getElementById("telem-vspd");S&&(S.textContent=`ALT: ${Math.round(w).toLocaleString().padStart(6)} m`),H&&(H.textContent=`V/S: ${A.toFixed(1).padStart(6)} m/s`);const te=E(Math.max(0,Math.min(1,(o-M.s6_videoStart)/.02)));s.style.opacity=String(te)}else s.style.opacity="0";const T=document.getElementById("status-line");if(T)if(o>=M.statusLineT){const a=E(Math.max(0,Math.min(1,(o-M.statusLineT)/.015)));T.style.opacity=String(a)}else T.style.opacity="0"}window.addEventListener("wheel",e=>{e.preventDefault(),h+=e.deltaY*38e-5,h=Math.max(0,Math.min(1,h)),re(),_(h)},{passive:!1});let Ee=0;window.addEventListener("touchstart",e=>{Ee=e.touches[0].clientY,st()},{passive:!0});window.addEventListener("touchmove",e=>{const t=Ee-e.touches[0].clientY;Ee=e.touches[0].clientY,h+=t*75e-5,h=Math.max(0,Math.min(1,h)),re(),_(h)},{passive:!0});window.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowRight"){const t=N.find(o=>o.progress>h+.01);t&&(h=t.progress,re(),_(h)),e.preventDefault()}else if(e.key==="ArrowUp"||e.key==="ArrowLeft"){const o=[...N].reverse().find(n=>n.progress<h-.01);o&&(h=o.progress,re(),_(h)),e.preventDefault()}else(e.key==="Enter"||e.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const e=window.innerWidth,t=window.innerHeight;g.aspect=e/t,g.updateProjectionMatrix(),V.setSize(e,t),K.setSize(e,t),qe.resolution.set(e,t)});let rt=!0;document.addEventListener("visibilitychange",()=>{rt=!document.hidden});const Be=new Ct;function lt(){if(requestAnimationFrame(lt),!rt)return;const e=Math.min(Be.getDelta(),.1),t=Be.getElapsedTime();h+=X*e,h=Math.max(0,Math.min(1,h)),eo(e);const o=L,{pos:n,look:l,fov:r}=nt(o),p=o<.65?.06:.01,y=new i(Math.sin(t*.08)*p,Math.cos(t*.055)*(p*.55),0);g.position.lerp(n.clone().add(y),.055),Fe.lerp(l,.055),g.lookAt(Fe),Math.abs(g.fov-r)>.05&&(g.fov=Ge.lerp(g.fov,r,.05),g.updateProjectionMatrix()),Kt(o),_(o);const f=new kt(qt,Xt,Zt);if(o>=.01&&o<.5){x.group.visible=!0;const v=Math.max(.001,Math.min(.999,o/.5)),c=f.getPoint(v),d=f.getTangent(v).normalize();x.group.position.copy(c),x.group.quaternion.setFromUnitVectors(new i(0,0,-1),d),x.group.rotateZ(t*.1),x.thrusterMat.opacity=.2+Math.sin(t*9)*.1,x.beaconMat.opacity=Math.sin(t*4.2)>.88?.9:0}else if(o>=.5&&o<.68){x.group.visible=!0;const v=t*.35,c=new i(P.position.x+Math.cos(v)*3.8,P.position.y+.8+Math.sin(v*.7)*.5,P.position.z+Math.sin(v)*3.2);x.group.position.copy(c);const d=new i(-Math.sin(v),.15,Math.cos(v)).normalize();x.group.quaternion.setFromUnitVectors(new i(0,0,-1),d),x.thrusterMat.opacity=.22+Math.sin(t*9)*.08,x.beaconMat.opacity=Math.sin(t*4)>.88?.9:0}else x.group.visible=!1;P.visible&&(ot.rotation.y+=e*.006,q.uniforms.viewPos.value.copy(g.position),se.uniforms.viewVector.value.copy(g.position)),O.visible&&(Je.rotation.y+=e*.011,Ke.rotation.y+=e*.016,Ze.uniforms.viewPos.value.copy(g.position),Qe.uniforms.viewPos.value.copy(g.position),et.uniforms.viewPos.value.copy(g.position)),ie.uniforms.time.value=t,ao(o),K.render()}window.__lunaops={setJourney:e=>{h=Math.max(0,Math.min(1,e)),L=h,ae=0,X=0,_(L)},getJourney:()=>L,visibility:()=>({moonGroup:P.visible,moonOpacity:q.uniforms.opacity.value,videoVisible:L>=.72,videoOpacity:parseFloat(b.style.opacity||"0"),videoCurrentTime:u.currentTime,orbiter:x.group.visible}),assertVisibility:at};at();lt();
