import{W as ro,S as k,A as io,a as lo,C as xe,F as co,P as vo,E as po,R as mo,U as uo,V as ho,b as go,c as i,D as wo,d as fo,e as yo,f as V,g as D,M as a,T as Mo,N as xo,G as N,h as x,i as Pe,j as Po,B as Se,k as fe,l as So,m as bo,Q as be,L as No,n as Eo,o as b,p as ee,q as A,r as To,s as _,t as ye,u as oe,v as Co}from"./UnrealBloomPass-B8Yzh5aV.js";const B=[{name:"LOW EARTH ORBIT",progress:0},{name:"TRANS-LUNAR",progress:.35},{name:"LUNAR APPROACH",progress:.7},{name:"ORBITAL INSERTION",progress:1}],j=document.getElementById("landing-root"),re=document.createElement("canvas");re.id="scene-canvas";j.appendChild(re);const E=new ro({canvas:re,antialias:!0,alpha:!1,powerPreference:"high-performance"});E.setSize(window.innerWidth,window.innerHeight);E.setPixelRatio(Math.min(window.devicePixelRatio,2));E.outputColorSpace=k;E.toneMapping=io;E.toneMappingExposure=.95;const g=new lo;g.background=new xe(518);g.fog=new co(1032,8e-4);const r=new vo(32,window.innerWidth/window.innerHeight,.05,600);r.position.set(0,0,20);const G=new po(E);G.addPass(new mo(g,r));const Ne=new uo(new ho(window.innerWidth,window.innerHeight),.22,.6,.82);G.addPass(Ne);const Ao={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.026},vigOffset:{value:.88},vigDark:{value:1.25}},vertexShader:`
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
  `},Ee=new go(Ao);G.addPass(Ee);function Lo(){[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:t,rMin:m,rMax:l,size:u,opacity:s})=>{const v=new Float32Array(t*3),c=new Float32Array(t*3);for(let o=0;o<t;o++){const n=Math.random()*Math.PI*2,w=Math.acos(2*Math.random()-1),p=m+Math.random()*(l-m);v[o*3]=p*Math.sin(w)*Math.cos(n),v[o*3+1]=p*Math.sin(w)*Math.sin(n),v[o*3+2]=p*Math.cos(w);const T=Math.random();c[o*3]=.85+T*.15,c[o*3+1]=.88+T*.12,c[o*3+2]=1}const d=new Se;d.setAttribute("position",new fe(v,3)),d.setAttribute("color",new fe(c,3));const h=new So({size:u,vertexColors:!0,transparent:!0,opacity:s,sizeAttenuation:!0,blending:D,depthWrite:!1});g.add(new bo(d,h))})}Lo();const z=new i(8,2.5,6).normalize(),Te=new wo(16774624,4.5);Te.position.copy(z).multiplyScalar(50);g.add(Te);const Vo=new fo(330264,.06);g.add(Vo);const zo=new yo(12,12),Ro=new V({transparent:!0,depthWrite:!1,blending:D,uniforms:{color:{value:new xe(16773296)}},vertexShader:`
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
  `}),H=new a(zo,Ro);H.position.copy(z).multiplyScalar(55);H.lookAt(r.position);g.add(H);const R=new Mo,Ce=R.load("/generated/earth/earth_day_2k.webp");Ce.colorSpace=k;const Ae=R.load("/generated/earth/earth_night_2k.webp");Ae.colorSpace=k;const ko=R.load("/generated/earth/earth_specular_2k.webp"),Le=R.load("/generated/earth/earth_clouds_2k.webp");Le.colorSpace=k;const Ve=R.load("/generated/lroc_color_2k.jpg");Ve.colorSpace=k;const ze=R.load("/generated/ldem_normal_map_half.png");ze.colorSpace=xo;const ie=6,U=new N;U.position.set(26,-2,-8);g.add(U);const Do=new x(ie,128,64),Re=new V({uniforms:{dayTexture:{value:Ce},nightTexture:{value:Ae},specularTexture:{value:ko},sunDir:{value:z.clone()},viewPos:{value:r.position}},vertexShader:`
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
  `,fragmentShader:`
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
  `}),ke=new a(Do,Re);U.add(ke);const Go=new x(ie*1.012,128,64),De=new V({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:Le},sunDir:{value:z.clone()},viewPos:{value:r.position}},vertexShader:`
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
  `,fragmentShader:`
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
  `}),Ge=new a(Go,De);U.add(Ge);const Uo=new x(ie*1.028,64,32),Ue=new V({transparent:!0,side:Pe,depthWrite:!1,blending:D,uniforms:{sunDir:{value:z.clone()},viewPos:{value:r.position}},vertexShader:`
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
  `,fragmentShader:`
    varying float vRim;
    varying float vSunFacing;

    void main() {
      vec3 dayAtmo   = vec3(0.18, 0.52, 1.0);
      vec3 nightAtmo = vec3(0.01, 0.04, 0.12);
      vec3 atmo      = mix(nightAtmo, dayAtmo, clamp(vSunFacing, 0.0, 1.0));
      gl_FragColor   = vec4(atmo, vRim * vSunFacing * 0.78);
    }
  `});U.add(new a(Uo,Ue));const Fe=1.65,P=new N;P.position.set(4,1.2,-22);P.rotation.x=Po.degToRad(6.68);g.add(P);const Fo=new x(Fe,128,64),Ie=new V({uniforms:{colorTexture:{value:Ve},normalTexture:{value:ze},sunDir:{value:z.clone()},viewPos:{value:r.position}},vertexShader:`
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
  `,fragmentShader:`
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
  `}),_e=new a(Fo,Ie);P.add(_e);const Io=new x(Fe*1.01,64,32),Be=new V({transparent:!0,side:Pe,depthWrite:!1,blending:D,uniforms:{viewVector:{value:r.position.clone()}},vertexShader:`
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
    void main() { gl_FragColor = vec4(vec3(0.75, 0.82, 0.9), vI * 0.16); }
  `});P.add(new a(Io,Be));const Oe=new i(26,-2,-8),We=new i(12,7,-12),je=new i(6.4,2.2,-20.8);function _o(){const e=[],t=new be(Oe,We,je);for(let s=0;s<=100;s++)e.push(t.getPoint(s/100));const m=new Se().setFromPoints(e),l=new No({color:2783999,linewidth:1,dashSize:.8,gapSize:1.2,transparent:!0,opacity:.18}),u=new Eo(m,l);u.computeLineDistances(),g.add(u)}_o();function Bo(){const e=new N,t=new b({color:15857145,metalness:.6,roughness:.35}),m=new b({color:14596161,metalness:.95,roughness:.2}),l=new b({color:1974309,metalness:.9,roughness:.4,side:ee}),u=new b({color:531e3,metalness:.88,roughness:.15}),s=new b({color:13277236,metalness:.92,roughness:.28}),v=new b({color:14541546,metalness:.9,roughness:.25,side:ee}),c=new b({color:464164,metalness:.95,roughness:.1}),d=new A(.34,.36,.85,8),h=new a(d,t);e.add(h);const o=new A(.362,.362,.38,8),n=new a(o,m);e.add(n);const w=new A(.18,.34,.45,8),p=new a(w,t);p.position.y=.65,e.add(p);const T=new To(.12,.022,8,20),$=new a(T,l);$.rotation.x=Math.PI/2,$.position.y=.88,e.add($);const ve=new _(.08,.05,.02),Y=new a(ve,c);Y.position.set(-.08,.68,.22),Y.rotation.x=-.25,e.add(Y);const q=new a(ve,c);q.position.set(.08,.68,.22),q.rotation.x=-.25,e.add(q);const Ye=new A(.24,.1,.32,16,1,!0),pe=new a(Ye,l);pe.position.y=-.58,e.add(pe);const qe=new ye(.14,.5,12,1,!0),me=new oe({color:3718648,transparent:!0,opacity:.65,blending:D,side:ee}),Z=new a(qe,me);Z.position.y=-.82,Z.rotation.x=Math.PI,e.add(Z),[-1,1].forEach(f=>{const S=new N;S.position.set(f*.45,0,0);const F=new A(.02,.02,.3,8),K=new a(F,l);K.rotation.z=Math.PI/2,K.position.x=f*.15,S.add(K);for(let X=0;X<3;X++){const I=new N;I.position.x=f*(.35+X*.52);const to=new _(.48,.014,.32),ao=new a(to,s);I.add(ao);const no=new _(.45,.016,.29),so=new a(no,u);I.add(so),S.add(I)}const eo=new x(.025,8,8),oo=new oe({color:f===-1?16724804:65416}),we=new a(eo,oo);we.position.set(f*1.95,.02,.16),S.add(we),e.add(S)});const C=new N;C.position.set(.32,.2,.32),C.rotation.set(-.6,.7,0);const Ze=new x(.24,16,10,0,Math.PI*2,0,Math.PI*.42),Je=new a(Ze,v);C.add(Je);const Qe=new A(.01,.01,.22,6),J=new a(Qe,l);J.position.z=.11,J.rotation.x=Math.PI/2,C.add(J);const Ke=new ye(.035,.06,8),Q=new a(Ke,m);Q.position.z=.22,Q.rotation.x=-Math.PI/2,C.add(Q),e.add(C),[Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4].forEach(f=>{const S=new _(.07,.07,.07),F=new a(S,l);F.position.set(Math.cos(f)*.35,.3,Math.sin(f)*.35),e.add(F)});const Xe=new x(.03,8,8),ue=new oe({color:16777215,transparent:!0,opacity:1}),he=new a(Xe,ue);he.position.y=.95,e.add(he);const ge=new N;return e.rotation.x=Math.PI/2,ge.add(e),{group:ge,thrusterMat:me,beaconMat:ue}}const M=Bo();M.group.visible=!1;g.add(M.group);const le=document.createElement("div");le.id="ui-overlay";le.innerHTML=`
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
`;j.appendChild(le);const ce=document.createElement("div");ce.className="progress-strip";ce.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';j.appendChild(ce);const de=document.createElement("div");de.id="webgl-fallback";de.textContent="WebGL is required to view this experience. Please use a modern browser.";j.appendChild(de);const O=[{pos:new i(30,5,22),look:new i(24,-3,-6),phase:0,progress:0},{pos:new i(16,5,18),look:new i(14,0,-8),phase:1,progress:.33},{pos:new i(6,3,8),look:new i(5,.5,-18),phase:2,progress:.66},{pos:new i(5,2,4),look:new i(4,1.2,-22),phase:3,progress:1}];let y=0,ne=8e-4;const te=new i;function Oo(e){const m=Math.max(0,Math.min(1,e))*(O.length-1),l=Math.floor(m),u=Math.min(l+1,O.length-1),s=m-l,v=s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,c=O[l],d=O[u],h=new i().lerpVectors(c.pos,d.pos,v),o=new i().lerpVectors(c.look,d.look,v),n=e<=.33?0:e<=.66?1:e<=.88?2:3;return{pos:h,look:o,phase:n}}const Wo=[0,.06,.12,.18,.24,.3,.36],jo=.08;function L(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Ho(e){const t=Math.max(0,Math.min(1,e)),m=document.getElementById("journey-fill");m&&(m.style.height=`${(t*100).toFixed(1)}%`);const l=document.getElementById("panel-phase-badge");if(l){let o=B[0].name;for(let n=B.length-1;n>=0;n--)if(t>=B[n].progress){o=B[n].name;break}l.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${o}`}document.querySelectorAll(".hero-letter").forEach((o,n)=>{const w=Math.max(0,Math.min(1,(t-Wo[n])/jo)),p=L(w);o.style.opacity=String(p),o.style.transform=`translateY(${(1-p)*28}px) scale(${.88+p*.12})`,o.style.filter=p>.02?`drop-shadow(0 0 ${p*8}px rgba(56, 189, 248, ${p*.45}))`:"none"});const u=document.getElementById("accent-line");if(u){const o=L(Math.max(0,Math.min(1,(t-.38)/.12)));u.style.width=`${o*100}%`,u.style.opacity=String(o)}const s=document.getElementById("hero-tagline");if(s){const o=L(Math.max(0,Math.min(1,(t-.46)/.12)));s.style.opacity=String(o),s.style.transform=`translateY(${(1-o)*14}px)`}const v=document.getElementById("hero-desc");if(v){const o=L(Math.max(0,Math.min(1,(t-.56)/.12)));v.style.opacity=String(o),v.style.transform=`translateY(${(1-o)*12}px)`}const c=document.getElementById("panel-stats");if(c){const o=L(Math.max(0,Math.min(1,(t-.66)/.12)));c.style.opacity=String(o),c.style.transform=`translateY(${(1-o)*10}px)`}const d=document.getElementById("panel-cta");if(d){const o=L(Math.max(0,Math.min(1,(t-.76)/.12)));d.style.opacity=String(o),d.style.transform=`translateY(${(1-o)*8}px)`,d.style.pointerEvents=o>.5?"auto":"none"}const h=document.getElementById("initial-scroll-cue");if(h)if(t>.3)h.style.display="none";else{h.style.display="flex";const o=Math.max(0,Math.min(1,t/.25));h.style.opacity=String(1-o),h.style.transform=`translateY(${o*12}px)`}}let W=0,ae=null;function He(){ne=0,ae&&clearTimeout(ae),ae=setTimeout(()=>{ne=8e-4},2800)}window.addEventListener("wheel",e=>{e.preventDefault(),W+=e.deltaY*42e-5,He()},{passive:!1});let se=0;window.addEventListener("touchstart",e=>{se=e.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",e=>{const t=se-e.touches[0].clientY;se=e.touches[0].clientY,W+=t*85e-5,He()},{passive:!0});window.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const e=window.innerWidth,t=window.innerHeight;r.aspect=e/t,r.updateProjectionMatrix(),E.setSize(e,t),G.setSize(e,t),Ne.resolution.set(e,t)});const Me=new Co;function $e(){requestAnimationFrame($e);const e=Me.getDelta(),t=Me.getElapsedTime();y=Math.max(0,Math.min(1,y+ne*e+W)),W=0;const{pos:l,look:u}=Oo(y),s=new i(Math.sin(t*.07)*.08,Math.cos(t*.05)*.05,0);r.position.lerpVectors(r.position,l.clone().add(s),.025),te.lerpVectors(te,u,.025),r.lookAt(te),Ho(y);const v=new be(Oe,We,je),c=Math.max(.001,Math.min(.999,y));let d=v.getPoint(c),h=v.getTangent(c).normalize();if(y>=.88){const o=Math.min(1,(y-.88)/.12),n=t*.45,w=2.45,p=2.15,T=new i(P.position.x+Math.cos(n)*w,P.position.y+Math.sin(n*.7)*.5,P.position.z+Math.sin(n)*p);d=d.lerp(T,o),h=new i(-Math.sin(n),Math.cos(n*.7)*.35,Math.cos(n)).normalize()}M.group.position.copy(d),M.group.quaternion.setFromUnitVectors(new i(0,0,-1),h),M.group.rotateZ(t*.12),M.thrusterMat.opacity=.5+Math.sin(t*12)*.25,M.beaconMat.opacity=Math.sin(t*4.5)>.82?1:.05,M.group.visible=y>.01,ke.rotation.y+=e*.011,Ge.rotation.y+=e*.016,Re.uniforms.viewPos.value.copy(r.position),De.uniforms.viewPos.value.copy(r.position),Ue.uniforms.viewPos.value.copy(r.position),_e.rotation.y+=e*.006,Ie.uniforms.viewPos.value.copy(r.position),Be.uniforms.viewVector.value.copy(r.position),H.lookAt(r.position),Ee.uniforms.time.value=t*8,G.render()}$e();
