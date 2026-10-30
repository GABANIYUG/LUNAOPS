import{W as re,S as se,A as ce,a as le,C as I,F as ve,P as de,E as me,R as fe,U as ue,V as pe,b as he,c as t,D as ge,d as we,e as Me,f as g,g as U,M as p,G as H,h as k,i as Y,j as xe,O as ye,k as be,B as Z,l as _,m as Se,n as Pe,Q as q,L as Ue,o as ke,p as De}from"./UnrealBloomPass-DCegvv6Z.js";const D=document.getElementById("landing-root"),V=document.createElement("canvas");V.id="scene-canvas";D.appendChild(V);const f=new re({canvas:V,antialias:!0,alpha:!1,powerPreference:"high-performance"});f.setSize(window.innerWidth,window.innerHeight);f.setPixelRatio(Math.min(window.devicePixelRatio,2));f.outputColorSpace=se;f.toneMapping=ce;f.toneMappingExposure=.95;const r=new le;r.background=new I(518);r.fog=new ve(1032,8e-4);const i=new de(32,window.innerWidth/window.innerHeight,.05,600);i.position.set(0,0,20);const w=new me(f);w.addPass(new fe(r,i));const Q=new ue(new pe(window.innerWidth,window.innerHeight),.22,.6,.82);w.addPass(Q);const Ne={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.026},vigOffset:{value:.88},vigDark:{value:1.25}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,fragmentShader:`
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
  `},J=new he(Ne);w.addPass(J);function Ee(){[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:o,rMin:d,rMax:v,size:m,opacity:a})=>{const n=new Float32Array(o*3),s=new Float32Array(o*3);for(let l=0;l<o;l++){const b=Math.random()*Math.PI*2,A=Math.acos(2*Math.random()-1),C=d+Math.random()*(v-d);n[l*3]=C*Math.sin(A)*Math.cos(b),n[l*3+1]=C*Math.sin(A)*Math.sin(b),n[l*3+2]=C*Math.cos(A);const B=Math.random();s[l*3]=.85+B*.15,s[l*3+1]=.88+B*.12,s[l*3+2]=1}const c=new Z;c.setAttribute("position",new _(n,3)),c.setAttribute("color",new _(s,3));const E=new Se({size:m,vertexColors:!0,transparent:!0,opacity:a,sizeAttenuation:!0,blending:U,depthWrite:!1});r.add(new Pe(c,E))})}Ee();const M=new t(8,2.5,6).normalize(),$=new ge(16774624,4.5);$.position.copy(M).multiplyScalar(50);r.add($);const Ae=new we(330264,.06);r.add(Ae);const Ce=new Me(12,12),Le=new g({transparent:!0,depthWrite:!1,blending:U,uniforms:{color:{value:new I(16773296)}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,fragmentShader:`
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float d = length(vUv - 0.5) * 2.0;
      float a = exp(-d * d * 4.5) * 0.55;
      gl_FragColor = vec4(color, a);
    }
  `}),N=new p(Ce,Le);N.position.copy(M).multiplyScalar(55);N.lookAt(i.position);r.add(N);const K=6,x=new H;x.position.set(18,-2,-8);r.add(x);const ze=new k(K,128,64),F=new g({uniforms:{sunDir:{value:M.clone()},time:{value:0},cloudOffset:{value:0}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv       = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
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
  `}),X=new p(ze,F);x.add(X);const Fe=new k(K*1.025,64,32),Oe=new g({transparent:!0,side:Y,depthWrite:!1,blending:U,uniforms:{sunDir:{value:M.clone()}},vertexShader:`
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
  `,fragmentShader:`
    varying float vRim;
    varying float vSunFacing;
    void main() {
      vec3 dayAtmo   = vec3(0.15, 0.45, 1.0);
      vec3 nightAtmo = vec3(0.02, 0.06, 0.18);
      vec3 atmo      = mix(nightAtmo, dayAtmo, vSunFacing);
      float alpha    = vRim * 0.7;
      gl_FragColor   = vec4(atmo, alpha);
    }
  `});x.add(new p(Fe,Oe));const ee=1.65,y=new H;y.position.set(-4,1.2,-22);y.rotation.x=xe.degToRad(6.68);r.add(y);const Ge=new k(ee,96,48),oe=new g({uniforms:{sunDir:{value:M.clone()},time:{value:0}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv       = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
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
  `}),te=new p(Ge,oe);y.add(te);const Ve=new k(ee*1.012,64,32),ae=new g({transparent:!0,side:Y,depthWrite:!1,blending:U,uniforms:{viewVector:{value:i.position.clone()}},vertexShader:`
    uniform vec3 viewVector;
    varying float vI;
    void main() {
      vec3 N = normalize(normalMatrix * normal);
      vec3 V = normalize(normalMatrix * viewVector);
      vI = pow(1.0 - abs(dot(N,V)), 4.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,fragmentShader:`
    varying float vI;
    void main() { gl_FragColor = vec4(vec3(0.75, 0.82, 0.9), vI * 0.22); }
  `});y.add(new p(Ve,ae));function We(){const e=[],o=new t(18,-2,-8),d=new t(-4,1.2,-22),v=new t(2,8,-10),m=new q(o,v,d);for(let c=0;c<=100;c++)e.push(m.getPoint(c/100));const a=new Z().setFromPoints(e),n=new Ue({color:2783999,linewidth:1,dashSize:.8,gapSize:1.2,transparent:!0,opacity:.18}),s=new ke(a,n);s.computeLineDistances(),r.add(s)}We();const Te=new ye(.12,0),Re=new be({color:3718648,wireframe:!1}),h=new p(Te,Re);h.visible=!1;r.add(h);const W=document.createElement("div");W.id="ui-overlay";W.innerHTML=`
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
`;D.appendChild(W);const T=document.createElement("div");T.className="progress-strip";T.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';D.appendChild(T);const R=document.createElement("div");R.id="webgl-fallback";R.textContent="WebGL is required to view this experience. Please use a modern browser.";D.appendChild(R);const S=[{pos:new t(22,5,22),look:new t(16,-4,-6),phase:0,progress:0},{pos:new t(8,5,16),look:new t(6,0,-8),phase:1,progress:.33},{pos:new t(-1,3,8),look:new t(-2,.5,-18),phase:2,progress:.66},{pos:new t(-3,2,4),look:new t(-4,1.2,-22),phase:3,progress:1}];let u=0,O=.003;const L=new t;new t;function Be(e){const d=Math.max(0,Math.min(1,e))*(S.length-1),v=Math.floor(d),m=Math.min(v+1,S.length-1),a=d-v,n=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2,s=S[v],c=S[m],E=new t().lerpVectors(s.pos,c.pos,n),l=new t().lerpVectors(s.look,c.look,n),b=e<=.33?0:e<=.66?1:e<=.88?2:3;return{pos:E,look:l,phase:b}}function _e(e){const o=document.getElementById("journey-fill");o&&(o.style.height=`${(Math.max(0,Math.min(1,e))*100).toFixed(1)}%`)}let P=0,z=null;function ne(){O=0,z&&clearTimeout(z),z=setTimeout(()=>{O=8e-4},2800)}window.addEventListener("wheel",e=>{e.preventDefault(),P+=e.deltaY*42e-5,ne()},{passive:!1});let G=0;window.addEventListener("touchstart",e=>{G=e.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",e=>{const o=G-e.touches[0].clientY;G=e.touches[0].clientY,P+=o*85e-5,ne()},{passive:!0});window.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const e=window.innerWidth,o=window.innerHeight;i.aspect=e/o,i.updateProjectionMatrix(),f.setSize(e,o),w.setSize(e,o),Q.resolution.set(e,o)});const j=new De;x.position.clone();function ie(){requestAnimationFrame(ie);const e=j.getDelta(),o=j.getElapsedTime();u=Math.max(0,Math.min(1,u+O*e+P)),P=0;const{pos:v,look:m}=Be(u),a=new t(Math.sin(o*.07)*.08,Math.cos(o*.05)*.05,0);i.position.lerpVectors(i.position,v.clone().add(a),.025),L.lerpVectors(L,m,.025),i.lookAt(L),_e(u);const n=new q(new t(18,-2,-8),new t(2,8,-10),new t(-4,1.2,-22));h.position.copy(n.getPoint(Math.min(u,1))),h.rotation.y+=e*.8,u>.05&&(h.visible=!0),X.rotation.y+=e*.012,F.uniforms.cloudOffset.value+=e*.003,F.uniforms.time.value=o,te.rotation.y+=e*.008,oe.uniforms.time.value=o,ae.uniforms.viewVector.value.copy(i.position),N.lookAt(i.position),J.uniforms.time.value=o*8,w.render()}ie();
