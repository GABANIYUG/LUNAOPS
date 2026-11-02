import{W as Be,S as kt,A as je,P as Ye,a as Xe,C as qe,b as $e,E as Ze,R as Je,U as Ke,V as wt,c as Qe,d as i,B as fe,e as Lt,f as ye,g as Mt,h as Me,D as Dt,i as xe,T as to,N as eo,G as at,j as X,k as pt,M as p,F as te,l as yt,m as Se,n as Y,o as lt,p as U,q as pe,r as ht,s as Te,t as At,u as oo,v as me,I as so,O as ao,w as no,x as be,L as io,y as ro,z as co,Q as lo,H as Ee,J as he,K as ve}from"./UnrealBloomPass-pUmJrMJ0.js";const r={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s2_departure:.18,s3_orbit:.56,s5_transitionDip:.74,s5_surfaceIn:.77,s6_establishing:.79,s7_descent:.85,s7_legsOut:.92,captions:[{t:.18,endT:.34,text:"TRANS-LUNAR INJECTION · EARTH DEPARTURE"},{t:.36,endT:.54,text:"400,000 KM TRANSIT · EN ROUTE TO THE MOON"},{t:.56,endT:.68,text:"LUNAR ORBIT INSERTION · SATELLITE AT THE MOON"},{t:.69,endT:.76,text:"DESTINATION: LUNAR SOUTH POLE · 89°54′S"},{t:.79,endT:.84,text:"SHACKLETON CRATER RIM · DESCENT INITIATION"},{t:.85,endT:.91,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.92,endT:.96,text:"TOUCHDOWN IMMINENT · ALL SYSTEMS NOMINAL"}],moonFadeStart:.74,moonFadeEnd:.77,landerStartT:.77,landerDescentEnd:.96,touchdownT:.96};function gt(t){let e=t;return function(){e|=0,e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967295}}const ee=new URLSearchParams(location.search).has("debug"),Yt=document.getElementById("landing-root"),oe=document.createElement("canvas");oe.id="scene-canvas";Yt.appendChild(oe);const Ht=window.innerWidth<768,po=Ht?1.25:1.5,it=new Be({canvas:oe,antialias:!0,alpha:!1,powerPreference:"high-performance"});it.setSize(window.innerWidth,window.innerHeight);it.setPixelRatio(Math.min(window.devicePixelRatio,po));it.outputColorSpace=kt;it.toneMapping=je;it.toneMappingExposure=1.05;it.shadowMap.enabled=!0;it.shadowMap.type=Ye;const Q=new Xe;Q.background=new qe(266);const A=new $e(32,window.innerWidth/window.innerHeight,.5,8e3);A.position.set(0,0,20);const Rt=new Ze(it);Rt.addPass(new Je(Q,A));const se=new Ke(new wt(window.innerWidth,window.innerHeight),.12,.35,.92);Rt.addPass(se);const mo={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new i(.92,.96,1.06)},hlTint:{value:new i(1.04,1.01,.97)}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
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
  `},Wt=new Qe(mo);Rt.addPass(Wt);(function(){const e=gt(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:s,rMin:m,rMax:u,size:x,opacity:c})=>{const v=new Float32Array(s*3),n=new Float32Array(s*3);for(let a=0;a<s;a++){const S=e()*Math.PI*2,T=Math.acos(2*e()-1),M=m+e()*(u-m);v[a*3]=M*Math.sin(T)*Math.cos(S),v[a*3+1]=M*Math.sin(T)*Math.sin(S),v[a*3+2]=M*Math.cos(T);const g=e();n[a*3]=.85+g*.15,n[a*3+1]=.88+g*.12,n[a*3+2]=1}const h=new fe;h.setAttribute("position",new Lt(v,3)),h.setAttribute("color",new Lt(n,3));const w=new ye({size:x,vertexColors:!0,transparent:!0,opacity:c,sizeAttenuation:!0,blending:Mt,depthWrite:!1});Q.add(new Me(h,w))})})();const Ct=new i(8,2.5,6).normalize(),Pe=new Dt(16774624,3.6);Pe.position.copy(Ct).multiplyScalar(500);Q.add(Pe);const ho=new xe(330264,.05);Q.add(ho);const xt=new to,Ne=xt.load("/generated/earth/earth_day_2k.webp",t=>{t.colorSpace=kt}),Ae=xt.load("/generated/earth/earth_night_2k.webp",t=>{t.colorSpace=kt}),vo=xt.load("/generated/earth/earth_specular_2k.webp"),uo=xt.load("/generated/earth/earth_clouds_2k.webp",t=>{t.colorSpace=kt}),wo=xt.load("/generated/lroc_color_2k.jpg",t=>{t.colorSpace=kt}),go=xt.load("/generated/ldem_normal_map_half.png",t=>{t.colorSpace=eo}),ae=6,zt=new at;zt.position.set(26,-2,-8);Q.add(zt);const fo=new X(ae,128,64),Le=new pt({uniforms:{dayTexture:{value:Ne},nightTexture:{value:Ae},specularTexture:{value:vo},sunDir:{value:Ct.clone()},viewPos:{value:A.position}},vertexShader:`
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
  `}),De=new p(fo,Le);zt.add(De);const yo=new X(ae*1.012,128,64),Ie=new pt({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:uo},sunDir:{value:Ct.clone()},viewPos:{value:A.position}},vertexShader:`
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
  `}),ke=new p(yo,Ie);zt.add(ke);const Mo=new X(ae*1.028,64,32),Re=new pt({transparent:!0,side:te,depthWrite:!1,blending:Mt,uniforms:{sunDir:{value:Ct.clone()},viewPos:{value:A.position}},vertexShader:`
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
  `});zt.add(new p(Mo,Re));const Ce=2.2,et=new at;et.position.set(4.5,.8,-28);et.rotation.x=yt.degToRad(6.68);Q.add(et);const xo=new X(Ce,128,64),Xt=new pt({uniforms:{colorTexture:{value:wo},normalTexture:{value:go},sunDir:{value:Ct.clone()},viewPos:{value:A.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),ze=new p(xo,Xt);et.add(ze);const So=new X(Ce*1.008,64,32),ne=new pt({transparent:!0,side:te,depthWrite:!1,blending:Mt,uniforms:{viewVector:{value:A.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});et.add(new p(So,ne));const To=new i(25,-1,-5),bo=new i(14,4,-15),Eo=new i(7.4,2,-25.5);function Po(){const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d");e.fillStyle="#081426",e.fillRect(0,0,256,128);const o=5,s=3,m=4,u=(256-m*(o+1))/o,x=(128-m*(s+1))/s;for(let v=0;v<o;v++)for(let n=0;n<s;n++){const h=m+v*(u+m),w=m+n*(x+m),a=e.createLinearGradient(h,w,h+u,w+x);a.addColorStop(0,"#2b6cb0"),a.addColorStop(.4,"#1e4e8c"),a.addColorStop(1,"#133360"),e.fillStyle=a,e.fillRect(h,w,u,x),e.strokeStyle="rgba(125, 211, 252, 0.7)",e.lineWidth=1,e.beginPath(),e.moveTo(h,w+x*.5),e.lineTo(h+u,w+x*.5),e.stroke(),e.strokeStyle="rgba(125, 211, 252, 0.4)",e.beginPath(),e.moveTo(h+u*.33,w),e.lineTo(h+u*.33,w+x),e.moveTo(h+u*.67,w),e.lineTo(h+u*.67,w+x),e.stroke()}const c=new Ee(t);return c.wrapS=he,c.wrapT=he,c}function No(){const t=new at,e=new Y({color:15791612,metalness:.6,roughness:.32,emissive:1779768,emissiveIntensity:.35}),o=new Y({color:16097819,metalness:.55,roughness:.35,emissive:4530691,emissiveIntensity:.6,side:lt}),s=new Y({color:14083058,metalness:.7,roughness:.28,emissive:2241095,emissiveIntensity:.6,side:lt}),m=new Y({color:2370872,metalness:.8,roughness:.4,emissive:988444,emissiveIntensity:.35,side:lt}),u=Po(),x=new Y({map:u,color:6333946,emissive:1982639,emissiveMap:u,emissiveIntensity:.85,metalness:.3,roughness:.25,side:lt}),c=new Y({color:14871541,metalness:.85,roughness:.25,emissive:1779512,emissiveIntensity:.4,side:lt});t.add(Object.assign(new p(new U(.34,.36,.85,12),e))),t.add(Object.assign(new p(new U(.364,.364,.38,12),o)));const v=new p(new U(.18,.34,.44,12),e);v.position.y=.64,t.add(v);const n=new p(new pe(.12,.022,8,20),s);n.rotation.x=Math.PI/2,n.position.y=.87,t.add(n);const h=new p(new U(.24,.09,.3,16,1,!0),m);h.position.y=-.58,t.add(h);const w=new ht({color:10342639,transparent:!0,opacity:.3,blending:Mt,side:lt,depthWrite:!1}),a=new p(new Te(.08,.32,12,1,!0),w);a.position.y=-.76,a.rotation.x=Math.PI,t.add(a),[-1,1].forEach(b=>{const l=new p(new U(.065,.065,.09,12),s);l.rotation.z=Math.PI/2,l.position.set(b*.35,0,0),t.add(l);const P=new p(new pe(.068,.016,8,16),o);P.rotation.y=Math.PI/2,P.position.set(b*.37,0,0),t.add(P);const f=.38,_=new p(new U(.026,.026,f,12),s);_.rotation.z=Math.PI/2,_.position.set(b*(.35+f/2),0,0),t.add(_);const k=new p(new U(.014,.014,f*.95,8),o);k.rotation.z=Math.PI/2,k.position.set(b*(.35+f/2),.035,0),t.add(k);const z=b*(.35+f),q=new p(new At(.07,.08,.09),o);q.position.set(z,0,0),t.add(q);const F=new p(new U(.028,.028,.09,8),s);F.position.set(z,0,0),t.add(F);const B=.5,J=.36,rt=.05;for(let tt=0;tt<3;tt++){const d=z+b*(.05+B/2+tt*(B+rt)),y=new at;y.position.set(d,0,0);const E=new p(new At(B,.015,J),o);y.add(E);const V=new p(new At(B-.025,.02,J-.025),x);y.add(V);const R=new p(new At(.014,.022,J+.008),s);if(R.position.set(b*(B/2),0,0),y.add(R),t.add(y),tt<2){const C=d+b*(B/2+rt/2),H=new p(new U(.018,.018,.06,8),s);H.rotation.x=Math.PI/2,H.position.set(C,0,0),t.add(H)}}});const S=new at;S.position.set(.3,.2,.3),S.rotation.set(-.55,.65,0),S.add(new p(new X(.22,16,10,0,Math.PI*2,0,Math.PI*.42),c));const T=new p(new U(.012,.012,.2,6),s);T.position.z=.1,T.rotation.x=Math.PI/2,S.add(T),t.add(S);const M=new ht({color:16777215,transparent:!0,opacity:0}),g=new p(new X(.025,6,6),M);g.position.y=.93,t.add(g);const D=new at;t.rotation.x=Math.PI/2,D.add(t);const I=new Dt(7909119,1.4);I.position.set(-8,6,-6),D.add(I);const L=new Dt(3718648,1);return L.position.set(6,-6,5),D.add(L),{group:D,thrusterMat:w,beaconMat:M}}const W=No();W.group.visible=!1;Q.add(W.group);function Ao(t,e,o){const s=Math.max(0,Math.min(1,(o-t)/(e-t)));return s*s*(3-2*s)}const ue=[{x:-38,z:-44,radius:30,depth:7.8,rimHeight:2.4,rimWidth:6.5,ejectaRadius:48,softness:.25},{x:50,z:34,radius:34,depth:8.8,rimHeight:2.8,rimWidth:7.2,ejectaRadius:52,softness:.35},{x:-46,z:30,radius:24,depth:5.8,rimHeight:1.9,rimWidth:5.4,ejectaRadius:40,softness:.4},{x:-18,z:20,radius:12,depth:2.8,rimHeight:1,rimWidth:3,ejectaRadius:21,softness:.2},{x:24,z:-16,radius:13.5,depth:3.2,rimHeight:1.15,rimWidth:3.4,ejectaRadius:23,softness:.3},{x:14,z:28,radius:9.5,depth:2.3,rimHeight:.85,rimWidth:2.5,ejectaRadius:17,softness:.15},{x:-26,z:-14,radius:8.8,depth:2.1,rimHeight:.78,rimWidth:2.3,ejectaRadius:16,softness:.45},{x:36,z:-34,radius:14.5,depth:3.5,rimHeight:1.3,rimWidth:3.6,ejectaRadius:25,softness:.25},{x:-10,z:-28,radius:10.5,depth:2.5,rimHeight:.9,rimWidth:2.7,ejectaRadius:19,softness:.3},{x:30,z:14,radius:8,depth:1.9,rimHeight:.7,rimWidth:2.1,ejectaRadius:15,softness:.35},{x:-6.2,z:9.2,radius:3.4,depth:.8,rimHeight:.3,rimWidth:.95,ejectaRadius:7,softness:.15},{x:8.2,z:-7.5,radius:4.2,depth:.98,rimHeight:.36,rimWidth:1.15,ejectaRadius:8.5,softness:.1},{x:9.5,z:10.5,radius:3,depth:.7,rimHeight:.26,rimWidth:.85,ejectaRadius:6,softness:.2},{x:-10.5,z:-8.5,radius:3.8,depth:.88,rimHeight:.32,rimWidth:1.05,ejectaRadius:7.5,softness:.3},{x:16,z:-4.8,radius:2.6,depth:.6,rimHeight:.24,rimWidth:.75,ejectaRadius:5.4,softness:.15},{x:-4.8,z:-16.5,radius:5,depth:1.15,rimHeight:.42,rimWidth:1.35,ejectaRadius:9.8,softness:.25},{x:-14,z:6.2,radius:3.2,depth:.75,rimHeight:.28,rimWidth:.88,ejectaRadius:6.5,softness:.2},{x:6.5,z:18.2,radius:4.8,depth:1.1,rimHeight:.4,rimWidth:1.25,ejectaRadius:9,softness:.35},{x:-20.5,z:-4.2,radius:2.4,depth:.55,rimHeight:.2,rimWidth:.65,ejectaRadius:4.8,softness:.1},{x:20,z:19.5,radius:4,depth:.92,rimHeight:.34,rimWidth:1.05,ejectaRadius:8,softness:.2},{x:-2.2,z:13.5,radius:2.8,depth:.65,rimHeight:.24,rimWidth:.75,ejectaRadius:5.6,softness:.15},{x:12.5,z:-20.5,radius:3.6,depth:.84,rimHeight:.3,rimWidth:.95,ejectaRadius:7.2,softness:.25}];function j(t,e){let o=0;for(let v=0;v<ue.length;v++){const n=ue[v],h=t-n.x,w=e-n.z,a=Math.sqrt(h*h+w*w);if(a<n.radius){const T=a/n.radius,M=-n.depth*(1-T*T)*(1-n.softness*.35);o+=M}const S=Math.abs(a-n.radius)/n.rimWidth;if(S<3){const T=n.rimHeight*Math.exp(-S*S*2.2)*(1-n.softness*.45);o+=T}if(a>=n.radius&&a<n.ejectaRadius){const T=(a-n.radius)/(n.ejectaRadius-n.radius),M=n.rimHeight*.42*(1-T)*(1-T);o+=M}}const m=(e+95)/48,u=4.5*Math.exp(-m*m)*Math.max(0,1-Math.abs(t-8)/130);o+=u;const x=Math.sqrt(t*t+e*e),c=1-Ao(1.5,4,x);return o*(1-c)}function Lo(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),o=e.createImageData(512,512),s=o.data,m=gt(1280659009),u=new Float32Array(512*512);for(let c=0;c<512*512;c++)u[c]=(m()-.5)*.35;for(let c=1;c<511;c++)for(let v=1;v<511;v++){const n=c*512+v,h=(u[n+1]-u[n-1])*3.5,w=(u[n+512]-u[n-512])*3.5;let a=-h,S=-w,T=1;const M=Math.sqrt(a*a+S*S+T*T);a/=M,S/=M,T/=M;const g=n*4;s[g]=Math.floor((a*.5+.5)*255),s[g+1]=Math.floor((S*.5+.5)*255),s[g+2]=Math.floor((T*.5+.5)*255),s[g+3]=255}e.putImageData(o,0,0);const x=new Ee(t);return x.wrapS=ve,x.wrapT=ve,x.repeat.set(120,120),x}function Do(){const t=new at,e=120,o=240,s=new oo(e,e,o,o);s.rotateX(-Math.PI/2);const m=s.attributes.position,u=new Float32Array(m.count*3),x=gt(322420463);for(let d=0;d<m.count;d++){const y=m.getX(d),E=m.getZ(d),V=j(y,E);m.setY(d,V);const R=.5,C=j(y+R,E)-j(y-R,E),H=j(y,E+R)-j(y,E-R),ot=Math.min(1,Math.sqrt(C*C+H*H)/(R*2)),$=(x()-.5)*.02,st=Math.max(.1,Math.min(.18,.125+ot*.045+$));u[d*3]=st,u[d*3+1]=st,u[d*3+2]=st}s.computeVertexNormals(),s.setAttribute("color",new Lt(u,3));const c=Lo(),v=new Y({color:10066329,vertexColors:!0,roughness:.98,metalness:.02,normalMap:c,normalScale:new wt(.35,.35)}),n=new p(s,v);n.receiveShadow=!0,t.add(n);const h=new me(e*.495,420,96,24);h.rotateX(-Math.PI/2);const w=h.attributes.position,a=new Float32Array(w.count*3);for(let d=0;d<w.count;d++){const y=w.getX(d),E=w.getZ(d);w.setY(d,j(y,E));const V=.125;a[d*3]=V,a[d*3+1]=V,a[d*3+2]=V}h.computeVertexNormals(),h.setAttribute("color",new Lt(a,3));const S=new p(h,v);S.receiveShadow=!0,t.add(S);const T=yt.degToRad(6.2),M=new i(Math.cos(T)*.96,Math.sin(T),Math.cos(T)*.28).normalize(),g=new Dt(16776178,5.2);g.position.copy(M).multiplyScalar(80),g.castShadow=!0,g.shadow.mapSize.set(2048,2048),g.shadow.camera.near=1,g.shadow.camera.far=160,g.shadow.camera.left=-28,g.shadow.camera.right=28,g.shadow.camera.top=28,g.shadow.camera.bottom=-28,g.shadow.bias=-8e-4,g.shadow.normalBias=.03,t.add(g);const D=new Dt(2239032,.55);D.position.set(-M.x*60,8,-M.z*60),t.add(D),t.add(new xe(1053726,.22));const I=gt(195936478),L=new so(1,2),b=L.attributes.position,l=gt(4276994270);for(let d=0;d<b.count;d++){const y=b.getX(d),E=b.getY(d),V=b.getZ(d),R=E<0?.75:1;b.setXYZ(d,y*(.8+l()*.4),E*(.65+l()*.45)*R,V*(.8+l()*.4))}L.computeVertexNormals();const P=new Y({color:2368548,roughness:.96,metalness:.04}),f=[{count:Ht?35:75,sMin:.1,sMax:.25},{count:Ht?18:36,sMin:.25,sMax:.6},{count:Ht?6:14,sMin:.6,sMax:1.15}],_=new ao;f.forEach(d=>{const y=new no(L,P,d.count);y.castShadow=!0,y.receiveShadow=!0;for(let E=0;E<d.count;E++){const V=I()*Math.PI*2,R=3.8+I()*18,C=Math.cos(V)*R,H=Math.sin(V)*R,ot=j(C,H),$=d.sMin+I()*(d.sMax-d.sMin);_.position.set(C,ot+$*.28,H),_.rotation.set(I()*Math.PI,I()*Math.PI*2,I()*Math.PI*.4),_.scale.set($,$*(.75+I()*.35),$*(.85+I()*.3)),_.updateMatrix(),y.setMatrixAt(E,_.matrix)}y.instanceMatrix.needsUpdate=!0,t.add(y)});const k=new at;k.position.set(4.8,5.2,-15);const z=new pt({uniforms:{dayTexture:{value:Ne},nightTexture:{value:Ae},sunDir:{value:M},viewPos:{value:A.position}},vertexShader:`
      varying vec3 vNormal; varying vec2 vUv; varying vec3 vViewVector;
      uniform vec3 viewPos;
      void main() {
        vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vUv = uv; vViewVector = normalize(viewPos - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
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
    `});k.add(new p(new X(.72,48,24),z));const q=new pt({transparent:!0,side:te,depthWrite:!1,blending:Mt,uniforms:{viewVector:{value:A.position}},vertexShader:`
      uniform vec3 viewVector; varying float vI;
      void main() {
        vec3 N = normalize(normalMatrix * normal);
        vec3 V = normalize(normalMatrix * viewVector);
        vI = pow(1.0 - abs(dot(N, V)), 3.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying float vI;
      void main() { gl_FragColor = vec4(0.20, 0.58, 1.0, vI * 0.82); }
    `});k.add(new p(new X(.8,32,16),q)),t.add(k);const F=new me(.02,1.8,32);F.rotateX(-Math.PI/2);const B=new ht({color:1579552,transparent:!0,opacity:0,depthWrite:!1,blending:Se,side:lt}),J=new p(F,B);J.position.y=.003,t.add(J);const rt=new be(1.45,32);rt.rotateX(-Math.PI/2);const tt=new p(rt,new ht({color:131845,transparent:!0,opacity:.55,depthWrite:!1}));return tt.position.set(0,.004,0),t.add(tt),{group:t,terrainMesh:n,sunLight:g,skyEarthGroup:k,blastDecalMat:B,bodyContactShadow:tt}}const Z=Do();Z.group.visible=!1;Q.add(Z.group);function Io(){const t=new at,e=new Y({color:13936707,metalness:.8,roughness:.35}),o=new Y({color:15725560,metalness:.15,roughness:.5}),s=new Y({color:1711652,metalness:.85,roughness:.42}),m=new Y({color:1119256,metalness:.7,roughness:.55}),u=new Y({color:13160664,metalness:.82,roughness:.3}),x=new Y({color:9081498,metalness:.85,roughness:.35}),c=new U(.92,.98,.8,8),v=new p(c,e);v.position.y=.55,t.add(v);const n=new U(.8,.92,.55,8),h=new p(n,o);h.position.y=1.175,t.add(h);const w=new X(.76,8,6,0,Math.PI*2,0,Math.PI*.45),a=new p(w,o);a.position.y=1.45,t.add(a);for(let d=0;d<4;d++){const y=d*Math.PI/2+Math.PI/8,E=new p(new At(.55,.65,.04),m);E.position.set(Math.cos(y)*.94,.55,Math.sin(y)*.94),E.rotation.y=-y,t.add(E)}for(let d=0;d<4;d++){const y=d*Math.PI/2,E=new p(new U(.2,.2,.48,12),e);E.position.set(Math.cos(y)*.68,.55,Math.sin(y)*.68),t.add(E)}const S=[new wt(.08,0),new wt(.12,.12),new wt(.26,.38),new wt(.32,.52)],T=new io(S,18),M=new p(T,s);M.rotation.x=Math.PI,M.position.y=.14,t.add(M);const g=new p(new U(.075,.075,.05,12),s);g.position.y=.15,t.add(g);const D=new pt({transparent:!0,side:lt,depthWrite:!1,blending:Mt,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`
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
    `,fragmentShader:`
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
    `}),I=new Te(.7,1.4,24,8,!0),L=new p(I,D);L.rotation.x=Math.PI,L.position.y=-.72,t.add(L);const b=new ro(16771264,0,6);b.position.y=-.3,b.castShadow=!1,t.add(b);const l=[],P=[],f=new i(0,1,0);for(let d=0;d<4;d++){const y=d*Math.PI/2+Math.PI/4,E=new i(Math.cos(y)*.95,.55,Math.sin(y)*.95),V=new i(Math.cos(y)*1.55,-.05,Math.sin(y)*1.55),R=new i(Math.cos(y)*.65,.18,Math.sin(y)*.65),C=new U(.034,.03,1,8),H=new p(C,s),ot=new i().subVectors(V,E),$=ot.length(),st=ot.clone().normalize();H.position.copy(E).addScaledVector(st,$*.5),H.quaternion.setFromUnitVectors(f,st),H.scale.set(1,$,1),t.add(H);const $t=new U(.02,.02,1,6),ct=new p($t,s),St=new i().subVectors(V,R),Tt=St.length(),bt=St.clone().normalize();ct.position.copy(R).addScaledVector(bt,Tt*.5),ct.quaternion.setFromUnitVectors(f,bt),ct.scale.set(1,Tt,1),t.add(ct);const Vt=new U(.044,.042,1,8),Et=new p(Vt,u);t.add(Et);const vt=new U(.028,.028,1,8),Pt=new p(vt,s);t.add(Pt);const mt=new at,Zt=new U(.24,.22,.05,16),_t=new p(Zt,x);_t.position.y=.025,mt.add(_t);const Ge=new X(.05,8,8),ce=new p(Ge,s);ce.position.y=.05,mt.add(ce),t.add(mt);const le=new be(.28,16);le.rotateX(-Math.PI/2);const de=new p(le,new ht({color:131845,transparent:!0,opacity:0,depthWrite:!1}));Q.add(de),l.push({upperStrut:H,secondaryBrace:ct,shockBarrel:Et,innerPiston:Pt,padGroup:mt,contactDecal:de,hipPos:E,kneePos:V,braceMount:R,azimuth:y}),P.push(new i)}const _=(d,y)=>{for(let R=0;R<4;R++){const C=l[R],H=C.azimuth+y,ot=d.x+Math.cos(H)*1.95,$=d.z+Math.sin(H)*1.95,st=j(ot,$),$t=d.y+-1.355,ct=Math.max(st,$t),St=new i(ot,ct,$);P[R].copy(St);const Tt=t.worldToLocal(St.clone());C.padGroup.position.copy(Tt);const bt=Tt.clone().add(new i(0,.05,0)),Vt=new i().subVectors(bt,C.kneePos),Et=Math.max(.01,Vt.length()),vt=Vt.clone().normalize(),Pt=Et*.56;C.shockBarrel.position.copy(C.kneePos).addScaledVector(vt,Pt*.5),C.shockBarrel.quaternion.setFromUnitVectors(f,vt),C.shockBarrel.scale.set(1,Pt,1);const mt=Et*.58;C.innerPiston.position.copy(bt).addScaledVector(vt,-mt*.5),C.innerPiston.quaternion.setFromUnitVectors(f,vt),C.innerPiston.scale.set(1,mt,1),C.contactDecal.position.set(ot,st+.003,$);const Zt=Math.max(0,ct-st),_t=yt.clamp(1-Zt*2.5,0,.72);C.contactDecal.material.opacity=_t}return P},k=new U(.014,.014,.7,6),z=new p(k,s);z.position.set(.35,1.85,.25),t.add(z);const q=new X(.28,16,8,0,Math.PI*2,0,Math.PI*.42),F=new p(q,u);F.position.set(.35,2.2,.25),F.rotation.set(-.4,.5,0),t.add(F);const B=new U(.008,.008,.45,6),J=new p(B,s);J.rotation.z=-Math.PI/3,J.position.set(-.45,1.7,.18),t.add(J),[[.96,1.15,0],[-.96,1.15,0],[0,1.15,.96],[0,1.15,-.96]].forEach(([d,y,E])=>{const V=new p(new X(.012,6,6),new ht({color:2280584}));V.position.set(d,y,E),t.add(V)});const rt=new ht({color:16777215,transparent:!0,opacity:0}),tt=new p(new X(.018,6,6),rt);return tt.position.set(0,1.92,0),t.add(tt),{group:t,plumeMat:D,engineLight:b,beaconMat:rt,footpads:P,updateLegs:_,telemetryEl:null}}const N=Io();N.group.visible=!1;N.group.scale.setScalar(1);Q.add(N.group);const qt=120,Ue=new fe,Gt=new Float32Array(qt*3),ft=new Float32Array(qt*3),Jt=gt(13653764),ko=1.62;for(let t=0;t<qt;t++){const e=Jt()*Math.PI*2,o=.8+Jt()*2.8,s=.4+Jt()*1.2;ft[t*3]=Math.cos(e)*o,ft[t*3+1]=s,ft[t*3+2]=Math.sin(e)*o,Gt[t*3]=Gt[t*3+1]=Gt[t*3+2]=0}Ue.setAttribute("position",new Lt(Gt,3));const Ve=new ye({color:12107464,size:.06,transparent:!0,opacity:0,depthWrite:!1,blending:Se,sizeAttenuation:!0}),nt=new Me(Ue,Ve);nt.visible=!1;Q.add(nt);const ie=document.createElement("div");ie.id="ui-overlay";ie.innerHTML=`
  <div class="film-grain"></div>
  <div class="vignette"></div>

  <!-- Left panel (floating hero text without card container) -->
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
`;Yt.appendChild(ie);const re=document.createElement("div");re.className="progress-strip";re.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';Yt.appendChild(re);const Ut=document.createElement("a");Ut.href="/workstation.html";Ut.className="skip-to-workstation";Ut.textContent="Skip to workstation";Ut.setAttribute("aria-label","Skip animation and enter workstation");Yt.appendChild(Ut);const K=[{progress:0,pos:new i(28,3.5,20),look:new i(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.18,pos:new i(18,5.5,16),look:new i(16,1,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.36,pos:new i(12,4.5,6),look:new i(7,2,-20),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.56,pos:new i(6.2,2.6,-14),look:new i(4.5,.8,-28),fov:34,name:"LUNAR ORBIT INSERTION"},{progress:.68,pos:new i(5.2,1.6,-20),look:new i(4.5,.5,-28),fov:28,name:"LUNAR DESCENT ORBIT"},{progress:.77,pos:new i(4.5,.8,-23),look:new i(4.5,-.6,-28),fov:22,name:"SURFACE APPROACH"},{progress:.79,pos:new i(-2.5,1.8,6.5),look:new i(0,0,0),fov:38,name:"POWERED DESCENT"},{progress:.85,pos:new i(3.8,1.2,5.5),look:new i(0,.85,0),fov:35,name:"FINAL APPROACH"},{progress:.92,pos:new i(3.2,.8,4.2),look:new i(0,.45,0),fov:32,name:"TOUCHDOWN IMMINENT"},{progress:.96,pos:new i(3.8,1,4.8),look:new i(.2,.5,.2),fov:32,name:"SOUTH POLE TOUCHDOWN"},{progress:1,pos:new i(3.5,.85,4.45),look:new i(.15,.42,.15),fov:30,name:"SOUTH POLE TOUCHDOWN"}];function O(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function _e(t){const e=Math.max(0,Math.min(1,t));let o=K.length-1;for(let a=0;a<K.length-1;a++)if(e>=K[a].progress&&e<K[a+1].progress){o=a;break}const s=K[o],m=K[Math.min(o+1,K.length-1)],u=m.progress-s.progress,x=u>0?(e-s.progress)/u:1,c=O(Math.max(0,Math.min(1,x))),v=new i().lerpVectors(s.pos,m.pos,c),n=new i().lerpVectors(s.look,m.look,c),h=s.fov+(m.fov-s.fov)*c;let w=s.name;for(let a=K.length-1;a>=0;a--)if(e>=K[a].progress){w=K[a].name;break}return{pos:v,look:n,fov:h,phaseName:w}}function Ro(t,e){const o=j(0,0),s=2.35,m=36,u=yt.degToRad(m),x=e<1?2*Math.atan(Math.tan(u/2)*e):u;if(t>=r.touchdownT){const g=s/Math.sin(x/2)*1.35,D=Math.PI*.32,I=new i(Math.cos(D),0,Math.sin(D)).normalize(),L=new i().crossVectors(new i(0,1,0),I).normalize(),b=o+1.75,l=o+1.45,P=(t-r.touchdownT)/Math.max(.001,1-r.touchdownT),f=g*(1-P*.04),_=Math.sqrt(Math.max(1,f*f-(b-l)*(b-l))),k=2*f*Math.tan(x/2)*(e<1?1:e),z=(e<1?-.16:-.28)*(k*.5),q=new i(0,l,0).addScaledVector(L,z),F=new i(0,0,0).addScaledVector(I,_).addScaledVector(L,z);return F.y=b,{pos:F,look:q,fov:m}}if(t>=r.s7_descent){const M=(t-r.s7_descent)/(r.touchdownT-r.s7_descent),D=s/Math.sin(x/2)*1.62,I=Math.PI*.35-M*.07,L=new i(Math.cos(I),0,Math.sin(I)).normalize(),b=new i().crossVectors(new i(0,1,0),L).normalize(),l=N.group.position,P=l.y+.35,f=Math.max(o+1.75,l.y*.55+1.75),_=2*D*Math.tan(x/2)*(e<1?1:e),k=(e<1?-.14:-.25)*(_*.5),z=Math.sqrt(Math.max(1,D*D-(f-P)*(f-P))),q=new i(l.x,P,l.z).addScaledVector(b,k),F=new i(l.x,0,l.z).addScaledVector(L,z).addScaledVector(b,k);return F.y=f,{pos:F,look:q,fov:m}}const v=2.6-Math.max(0,Math.min(1,(t-r.s5_surfaceIn)/Math.max(.001,r.s7_descent-r.s5_surfaceIn)))*1,n=s/Math.sin(x/2)*v,h=Math.PI*.4,w=new i(Math.cos(h),0,Math.sin(h)).normalize(),a=N.group.position,S=new i(a.x,a.y+.5,a.z);return{pos:new i(0,o+3,0).addScaledVector(w,n*.9),look:S,fov:38}}function Co(t){const e=t<r.moonFadeEnd+.01,o=t>=r.moonFadeStart;et.visible=e,Z.group.visible=o;const s=Math.max(0,Math.min(1,(t-r.moonFadeStart)/Math.max(.001,r.moonFadeEnd-r.moonFadeStart))),m=O(1-s);Xt.uniforms.opacity.value=m,ne.uniforms.opacity.value=m,ee&&et.visible&&Z.group.visible}function Oe(){if(ee){for(let t=0;t<=1e3;t++){const e=t/1e3,o=e<r.moonFadeEnd+.01,s=e>=r.moonFadeStart,m=e>=r.moonFadeStart&&e<=r.moonFadeEnd+.01;o&&s&&!m&&console.error(`[LUNAOPS DEBUG] Both groups visible at t=${e.toFixed(3)} outside crossfade window!`)}console.log("[LUNAOPS DEBUG] Visibility consistency check passed.")}}let G=0,dt=0,Bt=0,It=r.autoSpeed,Kt=null;const Ot=new i;try{const t=new URLSearchParams(window.location.search);if(t.has("t")){const e=parseFloat(t.get("t"));isNaN(e)||(G=dt=Math.max(0,Math.min(1,e)),It=0)}}catch{}function jt(){It=0,Kt&&clearTimeout(Kt),Kt=setTimeout(()=>{It=r.autoSpeed},2800)}function zo(t){const e=r.springStiffness,o=r.springDamping,s=Math.max(0,Math.min(1,G)),m=e*(s-dt)-o*Bt;Bt+=m*t,dt+=Bt*t,dt=Math.max(0,Math.min(1,dt))}const Fe=1.38;function we(t=0){const e=j(0,0);return new i(0,e+Fe+t,0)}let Nt=null;function Uo(t,e){const o=Math.max(0,Math.min(1,t)),s=document.getElementById("journey-fill");s&&(s.style.height=`${(o*100).toFixed(1)}%`);const m=document.getElementById("panel-phase-badge");if(m){const{phaseName:l}=_e(o);m.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${l}`}const u=document.getElementById("left-panel");if(u)if(o<r.s2_departure+.08)if(o>=r.s2_departure){const l=O(Math.max(0,Math.min(1,(o-r.s2_departure)/.08)));u.style.opacity=String(1-l)}else u.style.opacity="1";else o>=r.touchdownT?u.style.opacity="1":u.style.opacity="0";const x=o>=r.touchdownT;x?Nt===null&&(Nt=e):Nt=null;let c=0;const v=[0,0,0,0,0,0,0];let n=0,h=0,w=0;if(x){const l=Math.max(0,Math.min(1,(o-r.touchdownT)/.035)),P=Nt!==null?Math.max(0,Math.min(1,(e-Nt)/2.4)):0,f=Math.max(l,P);c=O(Math.max(0,Math.min(1,(f-0)/.15)));const _=[.08,.16,.24,.32,.4,.48,.56],k=.12;for(let z=0;z<7;z++)v[z]=O(Math.max(0,Math.min(1,(f-_[z])/k)));n=O(Math.max(0,Math.min(1,(f-.6)/.15))),h=O(Math.max(0,Math.min(1,(f-.7)/.15))),w=O(Math.max(0,Math.min(1,(f-.8)/.18)))}else if(o<r.s2_departure+.1){c=O(Math.max(0,Math.min(1,(o-.005)/.025)));const l=[.02,.035,.05,.065,.08,.095,.11],P=.025;for(let f=0;f<7;f++)v[f]=O(Math.max(0,Math.min(1,(o-l[f])/P)));n=O(Math.max(0,Math.min(1,(o-.125)/.035))),h=O(Math.max(0,Math.min(1,(o-.15)/.04))),w=O(Math.max(0,Math.min(1,(o-.18)/.045)))}const a=document.getElementById("panel-badge");a&&(a.style.opacity=String(c),a.style.transform=`translateY(${(1-c)*12}px)`),document.querySelectorAll(".hero-letter").forEach((l,P)=>{const f=v[P]??0;l.style.opacity=String(f),l.style.transform=`translateY(${(1-f)*24}px) scale(${.85+f*.15})`,l.style.filter=f>.02?`drop-shadow(0 0 ${f*8}px rgba(66,221,245,${(f*.5).toFixed(2)}))`:"none"});const S=document.getElementById("accent-line");S&&(S.style.width=`${n*100}%`,S.style.opacity=String(n));const T=document.getElementById("hero-tagline");T&&(T.style.opacity=String(h),T.style.transform=`translateY(${(1-h)*14}px)`);const M=document.getElementById("hero-desc");M&&(M.style.opacity=String(w),M.style.transform=`translateY(${(1-w)*14}px)`);const g=document.getElementById("initial-scroll-cue");if(g)if(o>.26)g.style.display="none";else{g.style.display="flex";const l=Math.max(0,Math.min(1,o/.2));g.style.opacity=String(1-l)}const D=document.getElementById("shot-caption");if(D){let l="";for(const P of r.captions)if(o>=P.t&&o<=P.endT){l=P.text;break}l!==D.textContent&&(D.style.opacity="0",setTimeout(()=>{D.textContent=l,D.style.opacity=l?"1":"0"},150))}const I=document.getElementById("descent-hud");if(I)if(o>=r.s7_descent&&o<r.touchdownT){const l=(o-r.s7_descent)/(r.touchdownT-r.s7_descent),P=Math.max(0,280*(1-l)),f=-(.5+l*3.8),_=Math.max(12,Math.round(98-l*82));let k="POWERED DESCENT";l>.8?k="TERMINAL GUIDANCE":l<.25&&(k="APPROACH BURN");const z=document.getElementById("telem-alt"),q=document.getElementById("telem-vspd"),F=document.getElementById("telem-phase"),B=document.getElementById("telem-fuel");z&&(z.textContent=`${P.toFixed(0)} m`),q&&(q.textContent=`${f.toFixed(1)} m/s`),F&&(F.textContent=k),B&&(B.textContent=`${_} %`);const J=O(Math.max(0,Math.min(1,(o-r.s7_descent)/.02)));I.style.opacity=String(J)}else I.style.opacity="0";const L=document.getElementById("sp-landing-card");if(L)if(o>=r.touchdownT){const l=O(Math.max(0,Math.min(1,(o-r.touchdownT)/.025)));L.style.opacity=String(l),L.style.transform=`translateY(${-50+(1-l)*10}%)`,L.style.pointerEvents=o>=r.touchdownT+.005?"auto":"none"}else L.style.opacity="0",L.style.transform="translateY(-40%)",L.style.pointerEvents="none";const b=document.getElementById("touchdown-dock");if(b)if(o>=r.touchdownT){const l=O(Math.max(0,Math.min(1,(o-r.touchdownT)/.02)));b.classList.add("visible"),b.style.opacity=String(l),b.style.transform=`translateX(-50%) translateY(${(1-l)*12}px)`,b.style.pointerEvents="auto"}else b.classList.remove("visible"),b.style.opacity="0",b.style.transform="translateX(-50%) translateY(12px)",b.style.pointerEvents="none"}window.addEventListener("wheel",t=>{t.preventDefault(),G+=t.deltaY*38e-5,G=Math.max(0,Math.min(1,G)),jt()},{passive:!1});let Qt=0;window.addEventListener("touchstart",t=>{Qt=t.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",t=>{const e=Qt-t.touches[0].clientY;Qt=t.touches[0].clientY,G+=e*75e-5,G=Math.max(0,Math.min(1,G)),jt()},{passive:!0});window.addEventListener("keydown",t=>{if(t.key==="ArrowDown"||t.key==="ArrowRight"){const e=K.find(o=>o.progress>G+.01);e&&(G=e.progress,jt()),t.preventDefault()}else if(t.key==="ArrowUp"||t.key==="ArrowLeft"){const o=[...K].reverse().find(s=>s.progress<G-.01);o&&(G=o.progress,jt()),t.preventDefault()}else(t.key==="Enter"||t.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;A.aspect=t/e,A.updateProjectionMatrix(),it.setSize(t,e),Rt.setSize(t,e),se.resolution.set(t,e)});let ut=[],Ft=2;function Vo(t){var e;ut.push(t),ut.length>30&&(ut.shift(),ut.reduce((s,m)=>s+m)/ut.length>22&&Ft>0&&(Ft--,Ft<1&&(se.enabled=!1),Ft<2&&(Z.sunLight.shadow.mapSize.set(512,512),(e=Z.sunLight.shadow.map)==null||e.dispose(),Z.sunLight.shadow.map=null),ut=[]))}let He=!0;document.addEventListener("visibilitychange",()=>{He=!document.hidden});const ge=new co;function We(){if(requestAnimationFrame(We),!He)return;const t=Math.min(ge.getDelta(),.1),e=ge.getElapsedTime(),o=performance.now();G+=It*t,G=Math.max(0,Math.min(1,G)),zo(t);const s=dt;if(s>=r.s6_establishing){const c=Ro(s,A.aspect);A.position.copy(c.pos),Ot.copy(c.look),A.lookAt(Ot),A.fov=c.fov,A.updateProjectionMatrix()}else{const{pos:c,look:v,fov:n}=_e(s),h=.06,w=new i(Math.sin(e*.08)*h,Math.cos(e*.055)*(h*.55),0),a=c.clone().add(w);A.position.lerp(a,.055),Ot.lerp(v,.055),A.lookAt(Ot),Math.abs(A.fov-n)>.05&&(A.fov=yt.lerp(A.fov,n,.05),A.updateProjectionMatrix())}Co(s);const m=new lo(To,bo,Eo);if(s>=.01&&s<r.s3_orbit){W.group.visible=!0;const c=Math.max(.001,Math.min(.999,(s-.01)/Math.max(.001,r.s3_orbit-.01))),v=m.getPoint(c),n=m.getTangent(c).normalize();W.group.position.copy(v),W.group.quaternion.setFromUnitVectors(new i(0,0,-1),n),W.group.rotateZ(e*.1),W.group.scale.setScalar(1),W.thrusterMat.opacity=.2+Math.sin(e*9)*.1,W.beaconMat.opacity=Math.sin(e*4.2)>.88?.9:0}else if(s>=r.s3_orbit&&s<r.moonFadeStart){W.group.visible=!0;const c=e*.35,v=new i(et.position.x+Math.cos(c)*4.2,et.position.y+1.8+Math.sin(c*.7)*.5,et.position.z+Math.sin(c)*3.6);W.group.position.copy(v);const n=new i(-Math.sin(c),.15,Math.cos(c)).normalize();W.group.quaternion.setFromUnitVectors(new i(0,0,-1),n),W.group.scale.setScalar(1),W.thrusterMat.opacity=.22+Math.sin(e*9)*.08,W.beaconMat.opacity=Math.sin(e*4)>.88?.9:0}else W.group.visible=!1;const u=r.landerStartT,x=r.landerDescentEnd;if(s<u)N.group.visible=!1,nt.visible=!1;else if(s<x){N.group.visible=!0,nt.visible=!1;const c=(s-u)/(x-u),v=O(c),n=new i(0,2.6,0),h=we(0);N.group.position.lerpVectors(n,h,O(c));const w=-.28*(1-v)*(1-v);N.group.rotation.set(w,e*.04,0),N.updateLegs(N.group.position,N.group.rotation.y);const a=s>=r.s7_legsOut?1-O((s-r.s7_legsOut)/(x-r.s7_legsOut))*.85:1;N.plumeMat.uniforms.strength.value=a*(.7+Math.sin(e*22)*.3),N.plumeMat.uniforms.time.value=e,N.engineLight.intensity=a*(3.2+Math.sin(e*18)*1),Z.blastDecalMat.opacity=a*.65;const S=Math.max(0,Math.min(1,(s-r.s5_transitionDip)/.015)),T=Math.max(0,Math.min(1,(s-(r.s5_transitionDip+.015))/.025)),M=S<1?S:1-T;Wt.uniforms.exposure.value=1-M*.85,N.beaconMat.opacity=Math.sin(e*6)>.75?.9:0}else{N.group.visible=!0;const c=(s-r.touchdownT)/Math.max(.001,1-r.touchdownT),v=.035,n=18,h=v*Math.exp(-.7*n*Math.min(c,1))*Math.cos(n*Math.min(c,.5)),w=we(h);N.group.position.copy(w),N.group.rotation.set(0,.4,0),N.updateLegs(N.group.position,N.group.rotation.y),N.plumeMat.uniforms.strength.value=0,N.engineLight.intensity=0,Z.blastDecalMat.opacity=Math.max(0,.65-(s-r.touchdownT)*2);const a=j(0,0);Z.bodyContactShadow.position.set(0,a+.004,0),Z.bodyContactShadow.material.opacity=.55;const S=Math.min(1,c*2.5);if(S<1&&S>0){nt.visible=!0,nt.position.copy(N.group.position),nt.position.y-=Fe;const T=nt.geometry.attributes.position,M=S*2;for(let g=0;g<qt;g++){const D=ft[g*3],I=ft[g*3+1],L=ft[g*3+2];T.setXYZ(g,D*M,I*M-.5*ko*M*M,L*M)}T.needsUpdate=!0,Ve.opacity=Math.max(0,.35*(1-S*S))}else nt.visible=!1;N.beaconMat.opacity=Math.sin(e*3.2)>.5?.85:0}if(s>=r.s5_surfaceIn){const c=Math.max(0,Math.min(1,(s-r.s5_surfaceIn)/.08)),v=yt.lerp(1.05,1.38,c);Wt.uniforms.exposure.value=v}ze.rotation.y+=t*.006,Xt.uniforms.viewPos.value.copy(A.position),ne.uniforms.viewVector.value.copy(A.position),De.rotation.y+=t*.011,ke.rotation.y+=t*.016,Le.uniforms.viewPos.value.copy(A.position),Ie.uniforms.viewPos.value.copy(A.position),Re.uniforms.viewPos.value.copy(A.position),Z.skyEarthGroup.rotation.y+=t*.01,Wt.uniforms.time.value=e,Uo(s,e),Rt.render(),Vo(performance.now()-o)}window.__lunaops={setJourney:t=>{G=Math.max(0,Math.min(1,t)),dt=G,Bt=0,It=0},getJourney:()=>dt,visibility:()=>({moonGroup:et.visible,moonOpacity:Xt.uniforms.opacity.value,surfaceGroup:Z.group.visible,lander:N.group.visible,orbiter:W.group.visible}),terrainHeight:j,assertVisibility:Oe,getFootpadPositions:()=>N.footpads.map(t=>{const e=t.clone();return{world:e,terrainH:j(e.x,e.z),delta:e.y-j(e.x,e.z)}})};ee&&Oe();We();
