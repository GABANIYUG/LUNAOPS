import{W as Gt,S as Ie,A as Bt,P as jt,a as Yt,C as Xt,b as qt,E as Zt,R as $t,U as Jt,V as we,c as Kt,d as i,B as gt,e as Ae,f as ft,g as Me,h as yt,D as Le,i as Mt,T as Qt,N as eo,G as ae,j as B,k as pe,M as p,F as Qe,l as ye,m as xt,n as G,o as le,p as R,q as dt,r as me,s as St,t as Ne,u as to,v as pt,I as oo,O as so,w as ao,x as bt,L as no,y as io,z as ro,Q as co,H as Tt,J as vt,K as mt}from"./UnrealBloomPass-pUmJrMJ0.js";const c={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s2_departure:.18,s3_orbit:.56,s5_transitionDip:.74,s5_surfaceIn:.77,s6_establishing:.79,s7_descent:.85,s7_legsOut:.92,s8_touchdown:.96,captions:[{t:.18,endT:.34,text:"TRANS-LUNAR INJECTION · EARTH DEPARTURE"},{t:.36,endT:.54,text:"400,000 KM TRANSIT · EN ROUTE TO THE MOON"},{t:.56,endT:.68,text:"LUNAR ORBIT INSERTION · SATELLITE AT THE MOON"},{t:.69,endT:.76,text:"DESTINATION: LUNAR SOUTH POLE · 89°54′S"},{t:.79,endT:.84,text:"SHACKLETON CRATER RIM · DESCENT INITIATION"},{t:.85,endT:.91,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.92,endT:.96,text:"TOUCHDOWN IMMINENT · ALL SYSTEMS NOMINAL"}],moonFadeStart:.74,moonFadeEnd:.77,landerStartT:.77,landerDescentEnd:.96,touchdownT:.96};function ge(e){let t=e;return function(){t|=0,t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967295}}const et=new URLSearchParams(location.search).has("debug"),je=document.getElementById("landing-root"),tt=document.createElement("canvas");tt.id="scene-canvas";je.appendChild(tt);const Fe=window.innerWidth<768,lo=Fe?1.25:1.5,ie=new Gt({canvas:tt,antialias:!0,alpha:!1,powerPreference:"high-performance"});ie.setSize(window.innerWidth,window.innerHeight);ie.setPixelRatio(Math.min(window.devicePixelRatio,lo));ie.outputColorSpace=Ie;ie.toneMapping=Bt;ie.toneMappingExposure=1.05;ie.shadowMap.enabled=!0;ie.shadowMap.type=jt;const Z=new Yt;Z.background=new Xt(266);const P=new qt(32,window.innerWidth/window.innerHeight,.5,8e3);P.position.set(0,0,20);const ke=new Zt(ie);ke.addPass(new $t(Z,P));const ot=new Jt(new we(window.innerWidth,window.innerHeight),.12,.35,.92);ke.addPass(ot);const po={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new i(.92,.96,1.06)},hlTint:{value:new i(1.04,1.01,.97)}},vertexShader:`
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
  `},He=new Kt(po);ke.addPass(He);(function(){const t=ge(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:o,rMin:v,rMax:h,size:x,opacity:l})=>{const u=new Float32Array(o*3),n=new Float32Array(o*3);for(let a=0;a<o;a++){const w=t()*Math.PI*2,r=Math.acos(2*t()-1),f=v+t()*(h-v);u[a*3]=f*Math.sin(r)*Math.cos(w),u[a*3+1]=f*Math.sin(r)*Math.sin(w),u[a*3+2]=f*Math.cos(r);const M=t();n[a*3]=.85+M*.15,n[a*3+1]=.88+M*.12,n[a*3+2]=1}const m=new gt;m.setAttribute("position",new Ae(u,3)),m.setAttribute("color",new Ae(n,3));const g=new ft({size:x,vertexColors:!0,transparent:!0,opacity:l,sizeAttenuation:!0,blending:Me,depthWrite:!1});Z.add(new yt(m,g))})})();const Re=new i(8,2.5,6).normalize(),Pt=new Le(16774624,3.6);Pt.position.copy(Re).multiplyScalar(500);Z.add(Pt);const vo=new Mt(330264,.05);Z.add(vo);const xe=new Qt,Et=xe.load("/generated/earth/earth_day_2k.webp",e=>{e.colorSpace=Ie}),Nt=xe.load("/generated/earth/earth_night_2k.webp",e=>{e.colorSpace=Ie}),mo=xe.load("/generated/earth/earth_specular_2k.webp"),uo=xe.load("/generated/earth/earth_clouds_2k.webp",e=>{e.colorSpace=Ie}),ho=xe.load("/generated/lroc_color_2k.jpg",e=>{e.colorSpace=Ie}),wo=xe.load("/generated/ldem_normal_map_half.png",e=>{e.colorSpace=eo}),st=6,Ce=new ae;Ce.position.set(26,-2,-8);Z.add(Ce);const go=new B(st,128,64),At=new pe({uniforms:{dayTexture:{value:Et},nightTexture:{value:Nt},specularTexture:{value:mo},sunDir:{value:Re.clone()},viewPos:{value:P.position}},vertexShader:`
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
  `}),Lt=new p(go,At);Ce.add(Lt);const fo=new B(st*1.012,128,64),Dt=new pe({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:uo},sunDir:{value:Re.clone()},viewPos:{value:P.position}},vertexShader:`
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
  `}),It=new p(fo,Dt);Ce.add(It);const yo=new B(st*1.028,64,32),kt=new pe({transparent:!0,side:Qe,depthWrite:!1,blending:Me,uniforms:{sunDir:{value:Re.clone()},viewPos:{value:P.position}},vertexShader:`
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
  `});Ce.add(new p(yo,kt));const Rt=2.2,K=new ae;K.position.set(4.5,.8,-28);K.rotation.x=ye.degToRad(6.68);Z.add(K);const Mo=new B(Rt,128,64),Ye=new pe({uniforms:{colorTexture:{value:ho},normalTexture:{value:wo},sunDir:{value:Re.clone()},viewPos:{value:P.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),Ct=new p(Mo,Ye);K.add(Ct);const xo=new B(Rt*1.008,64,32),at=new pe({transparent:!0,side:Qe,depthWrite:!1,blending:Me,uniforms:{viewVector:{value:P.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});K.add(new p(xo,at));const So=new i(25,-1,-5),bo=new i(14,4,-15),To=new i(7.4,2,-25.5);function Po(){const e=document.createElement("canvas");e.width=256,e.height=128;const t=e.getContext("2d");t.fillStyle="#081426",t.fillRect(0,0,256,128);const s=5,o=3,v=4,h=(256-v*(s+1))/s,x=(128-v*(o+1))/o;for(let u=0;u<s;u++)for(let n=0;n<o;n++){const m=v+u*(h+v),g=v+n*(x+v),a=t.createLinearGradient(m,g,m+h,g+x);a.addColorStop(0,"#2b6cb0"),a.addColorStop(.4,"#1e4e8c"),a.addColorStop(1,"#133360"),t.fillStyle=a,t.fillRect(m,g,h,x),t.strokeStyle="rgba(125, 211, 252, 0.7)",t.lineWidth=1,t.beginPath(),t.moveTo(m,g+x*.5),t.lineTo(m+h,g+x*.5),t.stroke(),t.strokeStyle="rgba(125, 211, 252, 0.4)",t.beginPath(),t.moveTo(m+h*.33,g),t.lineTo(m+h*.33,g+x),t.moveTo(m+h*.67,g),t.lineTo(m+h*.67,g+x),t.stroke()}const l=new Tt(e);return l.wrapS=vt,l.wrapT=vt,l}function Eo(){const e=new ae,t=new G({color:15791612,metalness:.6,roughness:.32,emissive:1779768,emissiveIntensity:.35}),s=new G({color:16097819,metalness:.55,roughness:.35,emissive:4530691,emissiveIntensity:.6,side:le}),o=new G({color:14083058,metalness:.7,roughness:.28,emissive:2241095,emissiveIntensity:.6,side:le}),v=new G({color:2370872,metalness:.8,roughness:.4,emissive:988444,emissiveIntensity:.35,side:le}),h=Po(),x=new G({map:h,color:6333946,emissive:1982639,emissiveMap:h,emissiveIntensity:.85,metalness:.3,roughness:.25,side:le}),l=new G({color:14871541,metalness:.85,roughness:.25,emissive:1779512,emissiveIntensity:.4,side:le});e.add(Object.assign(new p(new R(.34,.36,.85,12),t))),e.add(Object.assign(new p(new R(.364,.364,.38,12),s)));const u=new p(new R(.18,.34,.44,12),t);u.position.y=.64,e.add(u);const n=new p(new dt(.12,.022,8,20),o);n.rotation.x=Math.PI/2,n.position.y=.87,e.add(n);const m=new p(new R(.24,.09,.3,16,1,!0),v);m.position.y=-.58,e.add(m);const g=new me({color:10342639,transparent:!0,opacity:.3,blending:Me,side:le,depthWrite:!1}),a=new p(new St(.08,.32,12,1,!0),g);a.position.y=-.76,a.rotation.x=Math.PI,e.add(a),[-1,1].forEach(b=>{const N=new p(new R(.065,.065,.09,12),o);N.rotation.z=Math.PI/2,N.position.set(b*.35,0,0),e.add(N);const z=new p(new dt(.068,.016,8,16),s);z.rotation.y=Math.PI/2,z.position.set(b*.37,0,0),e.add(z);const A=.38,F=new p(new R(.026,.026,A,12),o);F.rotation.z=Math.PI/2,F.position.set(b*(.35+A/2),0,0),e.add(F);const O=new p(new R(.014,.014,A*.95,8),s);O.rotation.z=Math.PI/2,O.position.set(b*(.35+A/2),.035,0),e.add(O);const j=b*(.35+A),Q=new p(new Ne(.07,.08,.09),s);Q.position.set(j,0,0),e.add(Q);const H=new p(new R(.028,.028,.09,8),o);H.position.set(j,0,0),e.add(H);const $=.5,ee=.36,re=.05;for(let J=0;J<3;J++){const d=j+b*(.05+$/2+J*($+re)),y=new ae;y.position.set(d,0,0);const S=new p(new Ne($,.015,ee),s);y.add(S);const C=new p(new Ne($-.025,.02,ee-.025),x);y.add(C);const L=new p(new Ne(.014,.022,ee+.008),o);if(L.position.set(b*($/2),0,0),y.add(L),e.add(y),J<2){const D=d+b*($/2+re/2),U=new p(new R(.018,.018,.06,8),o);U.rotation.x=Math.PI/2,U.position.set(D,0,0),e.add(U)}}});const w=new ae;w.position.set(.3,.2,.3),w.rotation.set(-.55,.65,0),w.add(new p(new B(.22,16,10,0,Math.PI*2,0,Math.PI*.42),l));const r=new p(new R(.012,.012,.2,6),o);r.position.z=.1,r.rotation.x=Math.PI/2,w.add(r),e.add(w);const f=new me({color:16777215,transparent:!0,opacity:0}),M=new p(new B(.025,6,6),f);M.position.y=.93,e.add(M);const I=new ae;e.rotation.x=Math.PI/2,I.add(e);const E=new Le(7909119,1.4);E.position.set(-8,6,-6),I.add(E);const k=new Le(3718648,1);return k.position.set(6,-6,5),I.add(k),{group:I,thrusterMat:g,beaconMat:f}}const V=Eo();V.group.visible=!1;Z.add(V.group);function No(e,t,s){const o=Math.max(0,Math.min(1,(s-e)/(t-e)));return o*o*(3-2*o)}const ut=[{x:-38,z:-44,radius:30,depth:7.8,rimHeight:2.4,rimWidth:6.5,ejectaRadius:48,softness:.25},{x:50,z:34,radius:34,depth:8.8,rimHeight:2.8,rimWidth:7.2,ejectaRadius:52,softness:.35},{x:-46,z:30,radius:24,depth:5.8,rimHeight:1.9,rimWidth:5.4,ejectaRadius:40,softness:.4},{x:-18,z:20,radius:12,depth:2.8,rimHeight:1,rimWidth:3,ejectaRadius:21,softness:.2},{x:24,z:-16,radius:13.5,depth:3.2,rimHeight:1.15,rimWidth:3.4,ejectaRadius:23,softness:.3},{x:14,z:28,radius:9.5,depth:2.3,rimHeight:.85,rimWidth:2.5,ejectaRadius:17,softness:.15},{x:-26,z:-14,radius:8.8,depth:2.1,rimHeight:.78,rimWidth:2.3,ejectaRadius:16,softness:.45},{x:36,z:-34,radius:14.5,depth:3.5,rimHeight:1.3,rimWidth:3.6,ejectaRadius:25,softness:.25},{x:-10,z:-28,radius:10.5,depth:2.5,rimHeight:.9,rimWidth:2.7,ejectaRadius:19,softness:.3},{x:30,z:14,radius:8,depth:1.9,rimHeight:.7,rimWidth:2.1,ejectaRadius:15,softness:.35},{x:-6.2,z:9.2,radius:3.4,depth:.8,rimHeight:.3,rimWidth:.95,ejectaRadius:7,softness:.15},{x:8.2,z:-7.5,radius:4.2,depth:.98,rimHeight:.36,rimWidth:1.15,ejectaRadius:8.5,softness:.1},{x:9.5,z:10.5,radius:3,depth:.7,rimHeight:.26,rimWidth:.85,ejectaRadius:6,softness:.2},{x:-10.5,z:-8.5,radius:3.8,depth:.88,rimHeight:.32,rimWidth:1.05,ejectaRadius:7.5,softness:.3},{x:16,z:-4.8,radius:2.6,depth:.6,rimHeight:.24,rimWidth:.75,ejectaRadius:5.4,softness:.15},{x:-4.8,z:-16.5,radius:5,depth:1.15,rimHeight:.42,rimWidth:1.35,ejectaRadius:9.8,softness:.25},{x:-14,z:6.2,radius:3.2,depth:.75,rimHeight:.28,rimWidth:.88,ejectaRadius:6.5,softness:.2},{x:6.5,z:18.2,radius:4.8,depth:1.1,rimHeight:.4,rimWidth:1.25,ejectaRadius:9,softness:.35},{x:-20.5,z:-4.2,radius:2.4,depth:.55,rimHeight:.2,rimWidth:.65,ejectaRadius:4.8,softness:.1},{x:20,z:19.5,radius:4,depth:.92,rimHeight:.34,rimWidth:1.05,ejectaRadius:8,softness:.2},{x:-2.2,z:13.5,radius:2.8,depth:.65,rimHeight:.24,rimWidth:.75,ejectaRadius:5.6,softness:.15},{x:12.5,z:-20.5,radius:3.6,depth:.84,rimHeight:.3,rimWidth:.95,ejectaRadius:7.2,softness:.25}];function W(e,t){let s=0;for(let u=0;u<ut.length;u++){const n=ut[u],m=e-n.x,g=t-n.z,a=Math.sqrt(m*m+g*g);if(a<n.radius){const r=a/n.radius,f=-n.depth*(1-r*r)*(1-n.softness*.35);s+=f}const w=Math.abs(a-n.radius)/n.rimWidth;if(w<3){const r=n.rimHeight*Math.exp(-w*w*2.2)*(1-n.softness*.45);s+=r}if(a>=n.radius&&a<n.ejectaRadius){const r=(a-n.radius)/(n.ejectaRadius-n.radius),f=n.rimHeight*.42*(1-r)*(1-r);s+=f}}const v=(t+95)/48,h=4.5*Math.exp(-v*v)*Math.max(0,1-Math.abs(e-8)/130);s+=h;const x=Math.sqrt(e*e+t*t),l=1-No(1.5,4,x);return s*(1-l)}function Ao(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d"),s=t.createImageData(512,512),o=s.data,v=ge(1280659009),h=new Float32Array(512*512);for(let l=0;l<512*512;l++)h[l]=(v()-.5)*.35;for(let l=1;l<511;l++)for(let u=1;u<511;u++){const n=l*512+u,m=(h[n+1]-h[n-1])*3.5,g=(h[n+512]-h[n-512])*3.5;let a=-m,w=-g,r=1;const f=Math.sqrt(a*a+w*w+r*r);a/=f,w/=f,r/=f;const M=n*4;o[M]=Math.floor((a*.5+.5)*255),o[M+1]=Math.floor((w*.5+.5)*255),o[M+2]=Math.floor((r*.5+.5)*255),o[M+3]=255}t.putImageData(s,0,0);const x=new Tt(e);return x.wrapS=mt,x.wrapT=mt,x.repeat.set(120,120),x}function Lo(){const e=new ae,t=120,s=240,o=new to(t,t,s,s);o.rotateX(-Math.PI/2);const v=o.attributes.position,h=new Float32Array(v.count*3),x=ge(322420463);for(let d=0;d<v.count;d++){const y=v.getX(d),S=v.getZ(d),C=W(y,S);v.setY(d,C);const L=.5,D=W(y+L,S)-W(y-L,S),U=W(y,S+L)-W(y,S-L),te=Math.min(1,Math.sqrt(D*D+U*U)/(L*2)),Y=(x()-.5)*.02,oe=Math.max(.1,Math.min(.18,.125+te*.045+Y));h[d*3]=oe,h[d*3+1]=oe,h[d*3+2]=oe}o.computeVertexNormals(),o.setAttribute("color",new Ae(h,3));const l=Ao(),u=new G({color:10066329,vertexColors:!0,roughness:.98,metalness:.02,normalMap:l,normalScale:new we(.35,.35)}),n=new p(o,u);n.receiveShadow=!0,e.add(n);const m=new pt(t*.495,420,96,24);m.rotateX(-Math.PI/2);const g=m.attributes.position,a=new Float32Array(g.count*3);for(let d=0;d<g.count;d++){const y=g.getX(d),S=g.getZ(d);g.setY(d,W(y,S));const C=.125;a[d*3]=C,a[d*3+1]=C,a[d*3+2]=C}m.computeVertexNormals(),m.setAttribute("color",new Ae(a,3));const w=new p(m,u);w.receiveShadow=!0,e.add(w);const r=ye.degToRad(6.2),f=new i(Math.cos(r)*.96,Math.sin(r),Math.cos(r)*.28).normalize(),M=new Le(16776178,5.2);M.position.copy(f).multiplyScalar(80),M.castShadow=!0,M.shadow.mapSize.set(2048,2048),M.shadow.camera.near=1,M.shadow.camera.far=160,M.shadow.camera.left=-28,M.shadow.camera.right=28,M.shadow.camera.top=28,M.shadow.camera.bottom=-28,M.shadow.bias=-8e-4,M.shadow.normalBias=.03,e.add(M);const I=new Le(2239032,.55);I.position.set(-f.x*60,8,-f.z*60),e.add(I),e.add(new Mt(1053726,.22));const E=ge(195936478),k=new oo(1,2),b=k.attributes.position,N=ge(4276994270);for(let d=0;d<b.count;d++){const y=b.getX(d),S=b.getY(d),C=b.getZ(d),L=S<0?.75:1;b.setXYZ(d,y*(.8+N()*.4),S*(.65+N()*.45)*L,C*(.8+N()*.4))}k.computeVertexNormals();const z=new G({color:2368548,roughness:.96,metalness:.04}),A=[{count:Fe?35:75,sMin:.1,sMax:.25},{count:Fe?18:36,sMin:.25,sMax:.6},{count:Fe?6:14,sMin:.6,sMax:1.15}],F=new so;A.forEach(d=>{const y=new ao(k,z,d.count);y.castShadow=!0,y.receiveShadow=!0;for(let S=0;S<d.count;S++){const C=E()*Math.PI*2,L=3.8+E()*18,D=Math.cos(C)*L,U=Math.sin(C)*L,te=W(D,U),Y=d.sMin+E()*(d.sMax-d.sMin);F.position.set(D,te+Y*.28,U),F.rotation.set(E()*Math.PI,E()*Math.PI*2,E()*Math.PI*.4),F.scale.set(Y,Y*(.75+E()*.35),Y*(.85+E()*.3)),F.updateMatrix(),y.setMatrixAt(S,F.matrix)}y.instanceMatrix.needsUpdate=!0,e.add(y)});const O=new ae;O.position.set(4.8,5.2,-15);const j=new pe({uniforms:{dayTexture:{value:Et},nightTexture:{value:Nt},sunDir:{value:f},viewPos:{value:P.position}},vertexShader:`
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
    `});O.add(new p(new B(.72,48,24),j));const Q=new pe({transparent:!0,side:Qe,depthWrite:!1,blending:Me,uniforms:{viewVector:{value:P.position}},vertexShader:`
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
    `});O.add(new p(new B(.8,32,16),Q)),e.add(O);const H=new pt(.02,1.8,32);H.rotateX(-Math.PI/2);const $=new me({color:1579552,transparent:!0,opacity:0,depthWrite:!1,blending:xt,side:le}),ee=new p(H,$);ee.position.y=.003,e.add(ee);const re=new bt(1.45,32);re.rotateX(-Math.PI/2);const J=new p(re,new me({color:131845,transparent:!0,opacity:.55,depthWrite:!1}));return J.position.set(0,.004,0),e.add(J),{group:e,terrainMesh:n,sunLight:M,skyEarthGroup:O,blastDecalMat:$,bodyContactShadow:J}}const X=Lo();X.group.visible=!1;Z.add(X.group);function Do(){const e=new ae,t=new G({color:13936707,metalness:.8,roughness:.35}),s=new G({color:15725560,metalness:.15,roughness:.5}),o=new G({color:1711652,metalness:.85,roughness:.42}),v=new G({color:1119256,metalness:.7,roughness:.55}),h=new G({color:13160664,metalness:.82,roughness:.3}),x=new G({color:9081498,metalness:.85,roughness:.35}),l=new R(.92,.98,.8,8),u=new p(l,t);u.position.y=.55,e.add(u);const n=new R(.8,.92,.55,8),m=new p(n,s);m.position.y=1.175,e.add(m);const g=new B(.76,8,6,0,Math.PI*2,0,Math.PI*.45),a=new p(g,s);a.position.y=1.45,e.add(a);for(let d=0;d<4;d++){const y=d*Math.PI/2+Math.PI/8,S=new p(new Ne(.55,.65,.04),v);S.position.set(Math.cos(y)*.94,.55,Math.sin(y)*.94),S.rotation.y=-y,e.add(S)}for(let d=0;d<4;d++){const y=d*Math.PI/2,S=new p(new R(.2,.2,.48,12),t);S.position.set(Math.cos(y)*.68,.55,Math.sin(y)*.68),e.add(S)}const w=[new we(.08,0),new we(.12,.12),new we(.26,.38),new we(.32,.52)],r=new no(w,18),f=new p(r,o);f.rotation.x=Math.PI,f.position.y=.14,e.add(f);const M=new p(new R(.075,.075,.05,12),o);M.position.y=.15,e.add(M);const I=new pe({transparent:!0,side:le,depthWrite:!1,blending:Me,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`
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
    `}),E=new St(.7,1.4,24,8,!0),k=new p(E,I);k.rotation.x=Math.PI,k.position.y=-.72,e.add(k);const b=new io(16771264,0,6);b.position.y=-.3,b.castShadow=!1,e.add(b);const N=[],z=[],A=new i(0,1,0);for(let d=0;d<4;d++){const y=d*Math.PI/2+Math.PI/4,S=new i(Math.cos(y)*.95,.55,Math.sin(y)*.95),C=new i(Math.cos(y)*1.55,-.05,Math.sin(y)*1.55),L=new i(Math.cos(y)*.65,.18,Math.sin(y)*.65),D=new R(.034,.03,1,8),U=new p(D,o),te=new i().subVectors(C,S),Y=te.length(),oe=te.clone().normalize();U.position.copy(S).addScaledVector(oe,Y*.5),U.quaternion.setFromUnitVectors(A,oe),U.scale.set(1,Y,1),e.add(U);const qe=new R(.02,.02,1,6),ce=new p(qe,o),Se=new i().subVectors(C,L),be=Se.length(),Te=Se.clone().normalize();ce.position.copy(L).addScaledVector(Te,be*.5),ce.quaternion.setFromUnitVectors(A,Te),ce.scale.set(1,be,1),e.add(ce);const Ue=new R(.044,.042,1,8),Pe=new p(Ue,h);e.add(Pe);const ue=new R(.028,.028,1,8),Ee=new p(ue,o);e.add(Ee);const ve=new ae,Ze=new R(.24,.22,.05,16),Ve=new p(Ze,x);Ve.position.y=.025,ve.add(Ve);const Wt=new B(.05,8,8),rt=new p(Wt,o);rt.position.y=.05,ve.add(rt),e.add(ve);const ct=new bt(.28,16);ct.rotateX(-Math.PI/2);const lt=new p(ct,new me({color:131845,transparent:!0,opacity:0,depthWrite:!1}));Z.add(lt),N.push({upperStrut:U,secondaryBrace:ce,shockBarrel:Pe,innerPiston:Ee,padGroup:ve,contactDecal:lt,hipPos:S,kneePos:C,braceMount:L,azimuth:y}),z.push(new i)}const F=(d,y)=>{for(let L=0;L<4;L++){const D=N[L],U=D.azimuth+y,te=d.x+Math.cos(U)*1.95,Y=d.z+Math.sin(U)*1.95,oe=W(te,Y),qe=d.y+-1.355,ce=Math.max(oe,qe),Se=new i(te,ce,Y);z[L].copy(Se);const be=e.worldToLocal(Se.clone());D.padGroup.position.copy(be);const Te=be.clone().add(new i(0,.05,0)),Ue=new i().subVectors(Te,D.kneePos),Pe=Math.max(.01,Ue.length()),ue=Ue.clone().normalize(),Ee=Pe*.56;D.shockBarrel.position.copy(D.kneePos).addScaledVector(ue,Ee*.5),D.shockBarrel.quaternion.setFromUnitVectors(A,ue),D.shockBarrel.scale.set(1,Ee,1);const ve=Pe*.58;D.innerPiston.position.copy(Te).addScaledVector(ue,-ve*.5),D.innerPiston.quaternion.setFromUnitVectors(A,ue),D.innerPiston.scale.set(1,ve,1),D.contactDecal.position.set(te,oe+.003,Y);const Ze=Math.max(0,ce-oe),Ve=ye.clamp(1-Ze*2.5,0,.72);D.contactDecal.material.opacity=Ve}return z},O=new R(.014,.014,.7,6),j=new p(O,o);j.position.set(.35,1.85,.25),e.add(j);const Q=new B(.28,16,8,0,Math.PI*2,0,Math.PI*.42),H=new p(Q,h);H.position.set(.35,2.2,.25),H.rotation.set(-.4,.5,0),e.add(H);const $=new R(.008,.008,.45,6),ee=new p($,o);ee.rotation.z=-Math.PI/3,ee.position.set(-.45,1.7,.18),e.add(ee),[[.96,1.15,0],[-.96,1.15,0],[0,1.15,.96],[0,1.15,-.96]].forEach(([d,y,S])=>{const C=new p(new B(.012,6,6),new me({color:2280584}));C.position.set(d,y,S),e.add(C)});const re=new me({color:16777215,transparent:!0,opacity:0}),J=new p(new B(.018,6,6),re);return J.position.set(0,1.92,0),e.add(J),{group:e,plumeMat:I,engineLight:b,beaconMat:re,footpads:z,updateLegs:F,telemetryEl:null}}const T=Do();T.group.visible=!1;T.group.scale.setScalar(1);Z.add(T.group);const Xe=120,zt=new gt,We=new Float32Array(Xe*3),fe=new Float32Array(Xe*3),$e=ge(13653764),Io=1.62;for(let e=0;e<Xe;e++){const t=$e()*Math.PI*2,s=.8+$e()*2.8,o=.4+$e()*1.2;fe[e*3]=Math.cos(t)*s,fe[e*3+1]=o,fe[e*3+2]=Math.sin(t)*s,We[e*3]=We[e*3+1]=We[e*3+2]=0}zt.setAttribute("position",new Ae(We,3));const Ut=new ft({color:12107464,size:.06,transparent:!0,opacity:0,depthWrite:!1,blending:xt,sizeAttenuation:!0}),ne=new yt(zt,Ut);ne.visible=!1;Z.add(ne);const nt=document.createElement("div");nt.id="ui-overlay";nt.innerHTML=`
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
`;je.appendChild(nt);const it=document.createElement("div");it.className="progress-strip";it.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';je.appendChild(it);const ze=document.createElement("a");ze.href="/workstation.html";ze.className="skip-to-workstation";ze.textContent="Skip to workstation";ze.setAttribute("aria-label","Skip animation and enter workstation");je.appendChild(ze);const q=[{progress:0,pos:new i(28,3.5,20),look:new i(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.18,pos:new i(18,5.5,16),look:new i(16,1,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.36,pos:new i(12,4.5,6),look:new i(7,2,-20),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.56,pos:new i(6.2,2.6,-14),look:new i(4.5,.8,-28),fov:34,name:"LUNAR ORBIT INSERTION"},{progress:.68,pos:new i(5.2,1.6,-20),look:new i(4.5,.5,-28),fov:28,name:"LUNAR DESCENT ORBIT"},{progress:.77,pos:new i(4.5,.8,-23),look:new i(4.5,-.6,-28),fov:22,name:"SURFACE APPROACH"},{progress:.79,pos:new i(-2.5,1.8,6.5),look:new i(0,0,0),fov:38,name:"POWERED DESCENT"},{progress:.85,pos:new i(3.8,1.2,5.5),look:new i(0,.85,0),fov:35,name:"FINAL APPROACH"},{progress:.92,pos:new i(3.2,.8,4.2),look:new i(0,.45,0),fov:32,name:"TOUCHDOWN IMMINENT"},{progress:.96,pos:new i(3.8,1,4.8),look:new i(.2,.5,.2),fov:32,name:"SOUTH POLE TOUCHDOWN"},{progress:1,pos:new i(3.5,.85,4.45),look:new i(.15,.42,.15),fov:30,name:"SOUTH POLE TOUCHDOWN"}];function se(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Vt(e){const t=Math.max(0,Math.min(1,e));let s=q.length-1;for(let a=0;a<q.length-1;a++)if(t>=q[a].progress&&t<q[a+1].progress){s=a;break}const o=q[s],v=q[Math.min(s+1,q.length-1)],h=v.progress-o.progress,x=h>0?(t-o.progress)/h:1,l=se(Math.max(0,Math.min(1,x))),u=new i().lerpVectors(o.pos,v.pos,l),n=new i().lerpVectors(o.look,v.look,l),m=o.fov+(v.fov-o.fov)*l;let g=o.name;for(let a=q.length-1;a>=0;a--)if(t>=q[a].progress){g=q[a].name;break}return{pos:u,look:n,fov:m,phaseName:g}}function ko(e,t){const s=W(0,0),o=2.35,v=36,h=ye.degToRad(v),x=t<1?2*Math.atan(Math.tan(h/2)*t):h;if(e>=c.touchdownT){const M=o/Math.sin(x/2)*1.35,I=Math.PI*.32,E=new i(Math.cos(I),0,Math.sin(I)).normalize(),k=new i().crossVectors(new i(0,1,0),E).normalize(),b=s+1.75,N=s+1.45,z=(e-c.touchdownT)/Math.max(.001,1-c.touchdownT),A=M*(1-z*.04),F=Math.sqrt(Math.max(1,A*A-(b-N)*(b-N))),O=2*A*Math.tan(x/2)*(t<1?1:t),j=(t<1?-.16:-.28)*(O*.5),Q=new i(0,N,0).addScaledVector(k,j),H=new i(0,0,0).addScaledVector(E,F).addScaledVector(k,j);return H.y=b,{pos:H,look:Q,fov:v}}if(e>=c.s7_descent){const f=(e-c.s7_descent)/(c.touchdownT-c.s7_descent),I=o/Math.sin(x/2)*1.62,E=Math.PI*.35-f*.07,k=new i(Math.cos(E),0,Math.sin(E)).normalize(),b=new i().crossVectors(new i(0,1,0),k).normalize(),N=T.group.position,z=N.y+.35,A=Math.max(s+1.75,N.y*.55+1.75),F=2*I*Math.tan(x/2)*(t<1?1:t),O=(t<1?-.14:-.25)*(F*.5),j=Math.sqrt(Math.max(1,I*I-(A-z)*(A-z))),Q=new i(N.x,z,N.z).addScaledVector(b,O),H=new i(N.x,0,N.z).addScaledVector(k,j).addScaledVector(b,O);return H.y=A,{pos:H,look:Q,fov:v}}const u=2.6-Math.max(0,Math.min(1,(e-c.s5_surfaceIn)/Math.max(.001,c.s7_descent-c.s5_surfaceIn)))*1,n=o/Math.sin(x/2)*u,m=Math.PI*.4,g=new i(Math.cos(m),0,Math.sin(m)).normalize(),a=T.group.position,w=new i(a.x,a.y+.5,a.z);return{pos:new i(0,s+3,0).addScaledVector(g,n*.9),look:w,fov:38}}function Ro(e){const t=e<c.moonFadeEnd+.01,s=e>=c.moonFadeStart;K.visible=t,X.group.visible=s;const o=Math.max(0,Math.min(1,(e-c.moonFadeStart)/Math.max(.001,c.moonFadeEnd-c.moonFadeStart))),v=se(1-o);Ye.uniforms.opacity.value=v,at.uniforms.opacity.value=v,et&&K.visible&&X.group.visible}function _t(){if(et){for(let e=0;e<=1e3;e++){const t=e/1e3,s=t<c.moonFadeEnd+.01,o=t>=c.moonFadeStart,v=t>=c.moonFadeStart&&t<=c.moonFadeEnd+.01;s&&o&&!v&&console.error(`[LUNAOPS DEBUG] Both groups visible at t=${t.toFixed(3)} outside crossfade window!`)}console.log("[LUNAOPS DEBUG] Visibility consistency check passed.")}}let _=0,de=0,Ge=0,De=c.autoSpeed,Je=null;const _e=new i;try{const e=new URLSearchParams(window.location.search);if(e.has("t")){const t=parseFloat(e.get("t"));isNaN(t)||(_=de=Math.max(0,Math.min(1,t)),De=0)}}catch{}function Be(){De=0,Je&&clearTimeout(Je),Je=setTimeout(()=>{De=c.autoSpeed},2800)}function Co(e){const t=c.springStiffness,s=c.springDamping,o=Math.max(0,Math.min(1,_)),v=t*(o-de)-s*Ge;Ge+=v*e,de+=Ge*e,de=Math.max(0,Math.min(1,de))}const Ot=1.38;function ht(e=0){const t=W(0,0);return new i(0,t+Ot+e,0)}function zo(e,t){const s=Math.max(0,Math.min(1,e)),o=document.getElementById("journey-fill");o&&(o.style.height=`${(s*100).toFixed(1)}%`);const v=document.getElementById("panel-phase-badge");if(v){const{phaseName:r}=Vt(s);v.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${r}`}const h=document.getElementById("left-panel");if(h)if(s>=c.s2_departure&&s<c.s8_touchdown){const r=se(Math.max(0,Math.min(1,(s-c.s2_departure)/.08)));h.style.opacity=String(1-r)}else if(s>=c.s8_touchdown){const r=se(Math.max(0,Math.min(1,(s-c.s8_touchdown)/.03)));h.style.opacity=String(r)}else h.style.opacity="1";document.querySelectorAll(".hero-letter").forEach(r=>{r.style.opacity="1",r.style.transform="none"});const x=document.getElementById("accent-line");x&&(x.style.width="100%",x.style.opacity="1");const l=document.getElementById("hero-tagline");l&&(l.style.opacity="1");const u=document.getElementById("hero-desc");u&&(u.style.opacity="1");const n=document.getElementById("initial-scroll-cue");if(n)if(s>.26)n.style.display="none";else{n.style.display="flex";const r=Math.max(0,Math.min(1,s/.2));n.style.opacity=String(1-r)}const m=document.getElementById("shot-caption");if(m){let r="";for(const f of c.captions)if(s>=f.t&&s<=f.endT){r=f.text;break}r!==m.textContent&&(m.style.opacity="0",setTimeout(()=>{m.textContent=r,m.style.opacity=r?"1":"0"},150))}const g=document.getElementById("descent-hud");if(g)if(s>=c.s7_descent&&s<c.touchdownT){const r=(s-c.s7_descent)/(c.touchdownT-c.s7_descent),f=Math.max(0,280*(1-r)),M=-(.5+r*3.8),I=Math.max(12,Math.round(98-r*82));let E="POWERED DESCENT";r>.8?E="TERMINAL GUIDANCE":r<.25&&(E="APPROACH BURN");const k=document.getElementById("telem-alt"),b=document.getElementById("telem-vspd"),N=document.getElementById("telem-phase"),z=document.getElementById("telem-fuel");k&&(k.textContent=`${f.toFixed(0)} m`),b&&(b.textContent=`${M.toFixed(1)} m/s`),N&&(N.textContent=E),z&&(z.textContent=`${I} %`);const A=se(Math.max(0,Math.min(1,(s-c.s7_descent)/.02)));g.style.opacity=String(A)}else g.style.opacity="0";const a=document.getElementById("sp-landing-card");if(a)if(s>=c.touchdownT){const r=se(Math.max(0,Math.min(1,(s-c.touchdownT)/.025)));a.style.opacity=String(r),a.style.transform=`translateY(${-50+(1-r)*10}%)`,a.style.pointerEvents=s>=c.touchdownT+.005?"auto":"none"}else a.style.opacity="0",a.style.transform="translateY(-40%)",a.style.pointerEvents="none";const w=document.getElementById("touchdown-dock");if(w)if(s>=c.touchdownT){const r=se(Math.max(0,Math.min(1,(s-c.touchdownT)/.02)));w.classList.add("visible"),w.style.opacity=String(r),w.style.transform=`translateX(-50%) translateY(${(1-r)*12}px)`,w.style.pointerEvents="auto"}else w.classList.remove("visible"),w.style.opacity="0",w.style.transform="translateX(-50%) translateY(12px)",w.style.pointerEvents="none"}window.addEventListener("wheel",e=>{e.preventDefault(),_+=e.deltaY*38e-5,_=Math.max(0,Math.min(1,_)),Be()},{passive:!1});let Ke=0;window.addEventListener("touchstart",e=>{Ke=e.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",e=>{const t=Ke-e.touches[0].clientY;Ke=e.touches[0].clientY,_+=t*75e-5,_=Math.max(0,Math.min(1,_)),Be()},{passive:!0});window.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowRight"){const t=q.find(s=>s.progress>_+.01);t&&(_=t.progress,Be()),e.preventDefault()}else if(e.key==="ArrowUp"||e.key==="ArrowLeft"){const s=[...q].reverse().find(o=>o.progress<_-.01);s&&(_=s.progress,Be()),e.preventDefault()}else(e.key==="Enter"||e.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const e=window.innerWidth,t=window.innerHeight;P.aspect=e/t,P.updateProjectionMatrix(),ie.setSize(e,t),ke.setSize(e,t),ot.resolution.set(e,t)});let he=[],Oe=2;function Uo(e){var t;he.push(e),he.length>30&&(he.shift(),he.reduce((o,v)=>o+v)/he.length>22&&Oe>0&&(Oe--,Oe<1&&(ot.enabled=!1),Oe<2&&(X.sunLight.shadow.mapSize.set(512,512),(t=X.sunLight.shadow.map)==null||t.dispose(),X.sunLight.shadow.map=null),he=[]))}let Ft=!0;document.addEventListener("visibilitychange",()=>{Ft=!document.hidden});const wt=new ro;function Ht(){if(requestAnimationFrame(Ht),!Ft)return;const e=Math.min(wt.getDelta(),.1),t=wt.getElapsedTime(),s=performance.now();_+=De*e,_=Math.max(0,Math.min(1,_)),Co(e);const o=de;if(o>=c.s6_establishing){const l=ko(o,P.aspect);P.position.copy(l.pos),_e.copy(l.look),P.lookAt(_e),P.fov=l.fov,P.updateProjectionMatrix()}else{const{pos:l,look:u,fov:n}=Vt(o),m=.06,g=new i(Math.sin(t*.08)*m,Math.cos(t*.055)*(m*.55),0),a=l.clone().add(g);P.position.lerp(a,.055),_e.lerp(u,.055),P.lookAt(_e),Math.abs(P.fov-n)>.05&&(P.fov=ye.lerp(P.fov,n,.05),P.updateProjectionMatrix())}Ro(o);const v=new co(So,bo,To);if(o>=.01&&o<c.s3_orbit){V.group.visible=!0;const l=Math.max(.001,Math.min(.999,(o-.01)/Math.max(.001,c.s3_orbit-.01))),u=v.getPoint(l),n=v.getTangent(l).normalize();V.group.position.copy(u),V.group.quaternion.setFromUnitVectors(new i(0,0,-1),n),V.group.rotateZ(t*.1),V.group.scale.setScalar(1),V.thrusterMat.opacity=.2+Math.sin(t*9)*.1,V.beaconMat.opacity=Math.sin(t*4.2)>.88?.9:0}else if(o>=c.s3_orbit&&o<c.moonFadeStart){V.group.visible=!0;const l=t*.35,u=new i(K.position.x+Math.cos(l)*4.2,K.position.y+1.8+Math.sin(l*.7)*.5,K.position.z+Math.sin(l)*3.6);V.group.position.copy(u);const n=new i(-Math.sin(l),.15,Math.cos(l)).normalize();V.group.quaternion.setFromUnitVectors(new i(0,0,-1),n),V.group.scale.setScalar(1),V.thrusterMat.opacity=.22+Math.sin(t*9)*.08,V.beaconMat.opacity=Math.sin(t*4)>.88?.9:0}else V.group.visible=!1;const h=c.landerStartT,x=c.landerDescentEnd;if(o<h)T.group.visible=!1,ne.visible=!1;else if(o<x){T.group.visible=!0,ne.visible=!1;const l=(o-h)/(x-h),u=se(l),n=new i(0,2.6,0),m=ht(0);T.group.position.lerpVectors(n,m,se(l));const g=-.28*(1-u)*(1-u);T.group.rotation.set(g,t*.04,0),T.updateLegs(T.group.position,T.group.rotation.y);const a=o>=c.s7_legsOut?1-se((o-c.s7_legsOut)/(x-c.s7_legsOut))*.85:1;T.plumeMat.uniforms.strength.value=a*(.7+Math.sin(t*22)*.3),T.plumeMat.uniforms.time.value=t,T.engineLight.intensity=a*(3.2+Math.sin(t*18)*1),X.blastDecalMat.opacity=a*.65;const w=Math.max(0,Math.min(1,(o-c.s5_transitionDip)/.015)),r=Math.max(0,Math.min(1,(o-(c.s5_transitionDip+.015))/.025)),f=w<1?w:1-r;He.uniforms.exposure.value=1-f*.85,T.beaconMat.opacity=Math.sin(t*6)>.75?.9:0}else{T.group.visible=!0;const l=(o-c.touchdownT)/Math.max(.001,1-c.touchdownT),u=.035,n=18,m=u*Math.exp(-.7*n*Math.min(l,1))*Math.cos(n*Math.min(l,.5)),g=ht(m);T.group.position.copy(g),T.group.rotation.set(0,.4,0),T.updateLegs(T.group.position,T.group.rotation.y),T.plumeMat.uniforms.strength.value=0,T.engineLight.intensity=0,X.blastDecalMat.opacity=Math.max(0,.65-(o-c.touchdownT)*2);const a=W(0,0);X.bodyContactShadow.position.set(0,a+.004,0),X.bodyContactShadow.material.opacity=.55;const w=Math.min(1,l*2.5);if(w<1&&w>0){ne.visible=!0,ne.position.copy(T.group.position),ne.position.y-=Ot;const r=ne.geometry.attributes.position,f=w*2;for(let M=0;M<Xe;M++){const I=fe[M*3],E=fe[M*3+1],k=fe[M*3+2];r.setXYZ(M,I*f,E*f-.5*Io*f*f,k*f)}r.needsUpdate=!0,Ut.opacity=Math.max(0,.35*(1-w*w))}else ne.visible=!1;T.beaconMat.opacity=Math.sin(t*3.2)>.5?.85:0}if(o>=c.s5_surfaceIn){const l=Math.max(0,Math.min(1,(o-c.s5_surfaceIn)/.08)),u=ye.lerp(1.05,1.38,l);He.uniforms.exposure.value=u}Ct.rotation.y+=e*.006,Ye.uniforms.viewPos.value.copy(P.position),at.uniforms.viewVector.value.copy(P.position),Lt.rotation.y+=e*.011,It.rotation.y+=e*.016,At.uniforms.viewPos.value.copy(P.position),Dt.uniforms.viewPos.value.copy(P.position),kt.uniforms.viewPos.value.copy(P.position),X.skyEarthGroup.rotation.y+=e*.01,He.uniforms.time.value=t,zo(o),ke.render(),Uo(performance.now()-s)}window.__lunaops={setJourney:e=>{_=Math.max(0,Math.min(1,e)),de=_,Ge=0,De=0},getJourney:()=>de,visibility:()=>({moonGroup:K.visible,moonOpacity:Ye.uniforms.opacity.value,surfaceGroup:X.group.visible,lander:T.group.visible,orbiter:V.group.visible}),terrainHeight:W,assertVisibility:_t,getFootpadPositions:()=>T.footpads.map(e=>{const t=e.clone();return{world:t,terrainH:W(t.x,t.z),delta:t.y-W(t.x,t.z)}})};et&&_t();Ht();
