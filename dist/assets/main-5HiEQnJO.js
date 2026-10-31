import{W as Fe,S as At,A as He,P as We,a as Ge,C as Be,b as je,E as Ye,R as qe,U as Xe,V as ut,c as $e,d as i,B as he,e as Tt,f as we,g as gt,h as ge,D as Zt,i as fe,T as Ze,N as Je,G as Z,j as H,k as nt,M as m,F as Qt,l as wt,m as ye,n as G,o as Et,p as C,q as Ke,r as ct,s as Me,t as Jt,u as Qe,v as de,I as to,O as eo,w as oo,x as xe,L as so,y as ao,z as no,Q as io,H as ro,J as pe}from"./UnrealBloomPass-D4WWXORl.js";const r={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s3_orbit:.52,s4_separation:.64,s5_transitionDip:.72,s5_surfaceIn:.76,s6_establishing:.78,s7_descent:.84,s7_legsOut:.92,s8_touchdown:.96,captions:[{t:.5,endT:.63,text:"400,000 KM FROM HOME"},{t:.64,endT:.72,text:"DESTINATION: LUNAR SOUTH POLE"},{t:.76,endT:.83,text:"SHACKLETON CRATER RIM · 89°54′S"},{t:.84,endT:.91,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.92,endT:.96,text:"TOUCHDOWN IMMINENT · ALL SYSTEMS NOMINAL"}],moonFadeStart:.72,moonFadeEnd:.76,landerStartT:.72,landerDescentEnd:.96,touchdownT:.96};function vt(t){let e=t;return function(){e|=0,e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967295}}const te=new URLSearchParams(location.search).has("debug"),Gt=document.getElementById("landing-root"),ee=document.createElement("canvas");ee.id="scene-canvas";Gt.appendChild(ee);const Ut=window.innerWidth<768,co=Ut?1.25:1.5,ot=new Fe({canvas:ee,antialias:!0,alpha:!1,powerPreference:"high-performance"});ot.setSize(window.innerWidth,window.innerHeight);ot.setPixelRatio(Math.min(window.devicePixelRatio,co));ot.outputColorSpace=At;ot.toneMapping=He;ot.toneMappingExposure=1.05;ot.shadowMap.enabled=!0;ot.shadowMap.type=We;const X=new Ge;X.background=new Be(266);const E=new je(32,window.innerWidth/window.innerHeight,.5,8e3);E.position.set(0,0,20);const Lt=new Ye(ot);Lt.addPass(new qe(X,E));const oe=new Xe(new ut(window.innerWidth,window.innerHeight),.12,.35,.92);Lt.addPass(oe);const lo={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new i(.92,.96,1.06)},hlTint:{value:new i(1.04,1.01,.97)}},vertexShader:`
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
  `},Ot=new $e(lo);Lt.addPass(Ot);(function(){const e=vt(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:s,rMin:h,rMax:y,size:x,opacity:l})=>{const u=new Float32Array(s*3),c=new Float32Array(s*3);for(let n=0;n<s;n++){const w=e()*Math.PI*2,a=Math.acos(2*e()-1),p=h+e()*(y-h);u[n*3]=p*Math.sin(a)*Math.cos(w),u[n*3+1]=p*Math.sin(a)*Math.sin(w),u[n*3+2]=p*Math.cos(a);const v=e();c[n*3]=.85+v*.15,c[n*3+1]=.88+v*.12,c[n*3+2]=1}const g=new he;g.setAttribute("position",new Tt(u,3)),g.setAttribute("color",new Tt(c,3));const f=new we({size:x,vertexColors:!0,transparent:!0,opacity:l,sizeAttenuation:!0,blending:gt,depthWrite:!1});X.add(new ge(g,f))})})();const Dt=new i(8,2.5,6).normalize(),Se=new Zt(16774624,3.6);Se.position.copy(Dt).multiplyScalar(500);X.add(Se);const po=new fe(330264,.05);X.add(po);const ft=new Ze,be=ft.load("/generated/earth/earth_day_2k.webp",t=>{t.colorSpace=At}),Pe=ft.load("/generated/earth/earth_night_2k.webp",t=>{t.colorSpace=At}),mo=ft.load("/generated/earth/earth_specular_2k.webp"),uo=ft.load("/generated/earth/earth_clouds_2k.webp",t=>{t.colorSpace=At}),vo=ft.load("/generated/lroc_color_2k.jpg",t=>{t.colorSpace=At}),ho=ft.load("/generated/ldem_normal_map_half.png",t=>{t.colorSpace=Je}),se=6,kt=new Z;kt.position.set(26,-2,-8);X.add(kt);const wo=new H(se,128,64),Ee=new nt({uniforms:{dayTexture:{value:be},nightTexture:{value:Pe},specularTexture:{value:mo},sunDir:{value:Dt.clone()},viewPos:{value:E.position}},vertexShader:`
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
  `}),Te=new m(wo,Ee);kt.add(Te);const go=new H(se*1.012,128,64),Ne=new nt({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:uo},sunDir:{value:Dt.clone()},viewPos:{value:E.position}},vertexShader:`
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
  `}),Ae=new m(go,Ne);kt.add(Ae);const fo=new H(se*1.028,64,32),Le=new nt({transparent:!0,side:Qt,depthWrite:!1,blending:gt,uniforms:{sunDir:{value:Dt.clone()},viewPos:{value:E.position}},vertexShader:`
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
  `});kt.add(new m(fo,Le));const De=2.2,J=new Z;J.position.set(4.5,.8,-28);J.rotation.x=wt.degToRad(6.68);X.add(J);const yo=new H(De,128,64),Bt=new nt({uniforms:{colorTexture:{value:vo},normalTexture:{value:ho},sunDir:{value:Dt.clone()},viewPos:{value:E.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),ke=new m(yo,Bt);J.add(ke);const Mo=new H(De*1.008,64,32),ae=new nt({transparent:!0,side:Qt,depthWrite:!1,blending:gt,uniforms:{viewVector:{value:E.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});J.add(new m(Mo,ae));const xo=new i(26,-2,-8),So=new i(12,6,-14),bo=new i(6.5,2,-25);function Po(){const t=new Z,e=new G({color:15594232,metalness:.65,roughness:.3}),o=new G({color:13606442,metalness:.92,roughness:.18}),s=new G({color:1580066,metalness:.88,roughness:.42,side:Et}),h=new G({color:464168,metalness:.9,roughness:.12}),y=new G({color:14213096,metalness:.88,roughness:.28,side:Et});t.add(Object.assign(new m(new C(.34,.36,.85,8),e))),t.add(Object.assign(new m(new C(.362,.362,.38,8),o)));const x=new m(new C(.18,.34,.44,8),e);x.position.y=.64,t.add(x);const l=new m(new Ke(.12,.022,8,20),s);l.rotation.x=Math.PI/2,l.position.y=.87,t.add(l);const u=new m(new C(.24,.09,.3,16,1,!0),s);u.position.y=-.58,t.add(u);const c=new ct({color:10342639,transparent:!0,opacity:.3,blending:gt,side:Et,depthWrite:!1}),g=new m(new Me(.08,.32,12,1,!0),c);g.position.y=-.76,g.rotation.x=Math.PI,t.add(g),[-1,1].forEach(v=>{const S=new Z;S.position.set(v*.44,0,0);const T=new m(new C(.018,.018,.28,8),s);T.rotation.z=Math.PI/2,T.position.x=v*.14,S.add(T);for(let A=0;A<3;A++){const N=new Z;N.position.x=v*(.34+A*.52),N.add(Object.assign(new m(new Jt(.47,.013,.31),o))),N.add(Object.assign(new m(new Jt(.44,.015,.28),h))),S.add(N)}t.add(S)});const f=new Z;f.position.set(.3,.2,.3),f.rotation.set(-.55,.65,0),f.add(new m(new H(.22,16,10,0,Math.PI*2,0,Math.PI*.42),y));const n=new m(new C(.009,.009,.2,6),s);n.position.z=.1,n.rotation.x=Math.PI/2,f.add(n),t.add(f);const w=new ct({color:16777215,transparent:!0,opacity:0}),a=new m(new H(.022,6,6),w);a.position.y=.93,t.add(a);const p=new Z;return t.rotation.x=Math.PI/2,p.add(t),{group:p,thrusterMat:c,beaconMat:w}}const z=Po();z.group.visible=!1;X.add(z.group);function Eo(t,e,o){const s=Math.max(0,Math.min(1,(o-t)/(e-t)));return s*s*(3-2*s)}const me=[{x:-38,z:-44,radius:30,depth:7.8,rimHeight:2.4,rimWidth:6.5,ejectaRadius:48,softness:.25},{x:50,z:34,radius:34,depth:8.8,rimHeight:2.8,rimWidth:7.2,ejectaRadius:52,softness:.35},{x:-46,z:30,radius:24,depth:5.8,rimHeight:1.9,rimWidth:5.4,ejectaRadius:40,softness:.4},{x:-18,z:20,radius:12,depth:2.8,rimHeight:1,rimWidth:3,ejectaRadius:21,softness:.2},{x:24,z:-16,radius:13.5,depth:3.2,rimHeight:1.15,rimWidth:3.4,ejectaRadius:23,softness:.3},{x:14,z:28,radius:9.5,depth:2.3,rimHeight:.85,rimWidth:2.5,ejectaRadius:17,softness:.15},{x:-26,z:-14,radius:8.8,depth:2.1,rimHeight:.78,rimWidth:2.3,ejectaRadius:16,softness:.45},{x:36,z:-34,radius:14.5,depth:3.5,rimHeight:1.3,rimWidth:3.6,ejectaRadius:25,softness:.25},{x:-10,z:-28,radius:10.5,depth:2.5,rimHeight:.9,rimWidth:2.7,ejectaRadius:19,softness:.3},{x:30,z:14,radius:8,depth:1.9,rimHeight:.7,rimWidth:2.1,ejectaRadius:15,softness:.35},{x:-6.2,z:9.2,radius:3.4,depth:.8,rimHeight:.3,rimWidth:.95,ejectaRadius:7,softness:.15},{x:8.2,z:-7.5,radius:4.2,depth:.98,rimHeight:.36,rimWidth:1.15,ejectaRadius:8.5,softness:.1},{x:9.5,z:10.5,radius:3,depth:.7,rimHeight:.26,rimWidth:.85,ejectaRadius:6,softness:.2},{x:-10.5,z:-8.5,radius:3.8,depth:.88,rimHeight:.32,rimWidth:1.05,ejectaRadius:7.5,softness:.3},{x:16,z:-4.8,radius:2.6,depth:.6,rimHeight:.24,rimWidth:.75,ejectaRadius:5.4,softness:.15},{x:-4.8,z:-16.5,radius:5,depth:1.15,rimHeight:.42,rimWidth:1.35,ejectaRadius:9.8,softness:.25},{x:-14,z:6.2,radius:3.2,depth:.75,rimHeight:.28,rimWidth:.88,ejectaRadius:6.5,softness:.2},{x:6.5,z:18.2,radius:4.8,depth:1.1,rimHeight:.4,rimWidth:1.25,ejectaRadius:9,softness:.35},{x:-20.5,z:-4.2,radius:2.4,depth:.55,rimHeight:.2,rimWidth:.65,ejectaRadius:4.8,softness:.1},{x:20,z:19.5,radius:4,depth:.92,rimHeight:.34,rimWidth:1.05,ejectaRadius:8,softness:.2},{x:-2.2,z:13.5,radius:2.8,depth:.65,rimHeight:.24,rimWidth:.75,ejectaRadius:5.6,softness:.15},{x:12.5,z:-20.5,radius:3.6,depth:.84,rimHeight:.3,rimWidth:.95,ejectaRadius:7.2,softness:.25}];function F(t,e){let o=0;for(let u=0;u<me.length;u++){const c=me[u],g=t-c.x,f=e-c.z,n=Math.sqrt(g*g+f*f);if(n<c.radius){const a=n/c.radius,p=-c.depth*(1-a*a)*(1-c.softness*.35);o+=p}const w=Math.abs(n-c.radius)/c.rimWidth;if(w<3){const a=c.rimHeight*Math.exp(-w*w*2.2)*(1-c.softness*.45);o+=a}if(n>=c.radius&&n<c.ejectaRadius){const a=(n-c.radius)/(c.ejectaRadius-c.radius),p=c.rimHeight*.42*(1-a)*(1-a);o+=p}}const h=(e+95)/48,y=4.5*Math.exp(-h*h)*Math.max(0,1-Math.abs(t-8)/130);o+=y;const x=Math.sqrt(t*t+e*e),l=1-Eo(1.5,4,x);return o*(1-l)}function To(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),o=e.createImageData(512,512),s=o.data,h=vt(1280659009),y=new Float32Array(512*512);for(let l=0;l<512*512;l++)y[l]=(h()-.5)*.35;for(let l=1;l<511;l++)for(let u=1;u<511;u++){const c=l*512+u,g=(y[c+1]-y[c-1])*3.5,f=(y[c+512]-y[c-512])*3.5;let n=-g,w=-f,a=1;const p=Math.sqrt(n*n+w*w+a*a);n/=p,w/=p,a/=p;const v=c*4;s[v]=Math.floor((n*.5+.5)*255),s[v+1]=Math.floor((w*.5+.5)*255),s[v+2]=Math.floor((a*.5+.5)*255),s[v+3]=255}e.putImageData(o,0,0);const x=new ro(t);return x.wrapS=pe,x.wrapT=pe,x.repeat.set(120,120),x}function No(){const t=new Z,e=120,o=240,s=new Qe(e,e,o,o);s.rotateX(-Math.PI/2);const h=s.attributes.position,y=new Float32Array(h.count*3),x=vt(322420463);for(let d=0;d<h.count;d++){const M=h.getX(d),b=h.getZ(d),R=F(M,b);h.setY(d,R);const k=.5,D=F(M+k,b)-F(M-k,b),O=F(M,b+k)-F(M,b-k),K=Math.min(1,Math.sqrt(D*D+O*O)/(k*2)),W=(x()-.5)*.02,Q=Math.max(.1,Math.min(.18,.125+K*.045+W));y[d*3]=Q,y[d*3+1]=Q,y[d*3+2]=Q}s.computeVertexNormals(),s.setAttribute("color",new Tt(y,3));const l=To(),u=new G({color:10066329,vertexColors:!0,roughness:.98,metalness:.02,normalMap:l,normalScale:new ut(.35,.35)}),c=new m(s,u);c.receiveShadow=!0,t.add(c);const g=new de(e*.495,420,96,24);g.rotateX(-Math.PI/2);const f=g.attributes.position,n=new Float32Array(f.count*3);for(let d=0;d<f.count;d++){const M=f.getX(d),b=f.getZ(d);f.setY(d,F(M,b));const R=.125;n[d*3]=R,n[d*3+1]=R,n[d*3+2]=R}g.computeVertexNormals(),g.setAttribute("color",new Tt(n,3));const w=new m(g,u);w.receiveShadow=!0,t.add(w);const a=wt.degToRad(6.2),p=new i(Math.cos(a)*.96,Math.sin(a),Math.cos(a)*.28).normalize(),v=new Zt(16776178,5.2);v.position.copy(p).multiplyScalar(80),v.castShadow=!0,v.shadow.mapSize.set(2048,2048),v.shadow.camera.near=1,v.shadow.camera.far=160,v.shadow.camera.left=-28,v.shadow.camera.right=28,v.shadow.camera.top=28,v.shadow.camera.bottom=-28,v.shadow.bias=-8e-4,v.shadow.normalBias=.03,t.add(v);const S=new Zt(2239032,.55);S.position.set(-p.x*60,8,-p.z*60),t.add(S),t.add(new fe(1053726,.22));const T=vt(195936478),A=new to(1,2),N=A.attributes.position,L=vt(4276994270);for(let d=0;d<N.count;d++){const M=N.getX(d),b=N.getY(d),R=N.getZ(d),k=b<0?.75:1;N.setXYZ(d,M*(.8+L()*.4),b*(.65+L()*.45)*k,R*(.8+L()*.4))}A.computeVertexNormals();const U=new G({color:2368548,roughness:.96,metalness:.04}),_=[{count:Ut?35:75,sMin:.1,sMax:.25},{count:Ut?18:36,sMin:.25,sMax:.6},{count:Ut?6:14,sMin:.6,sMax:1.15}],$=new eo;_.forEach(d=>{const M=new oo(A,U,d.count);M.castShadow=!0,M.receiveShadow=!0;for(let b=0;b<d.count;b++){const R=T()*Math.PI*2,k=3.8+T()*18,D=Math.cos(R)*k,O=Math.sin(R)*k,K=F(D,O),W=d.sMin+T()*(d.sMax-d.sMin);$.position.set(D,K+W*.28,O),$.rotation.set(T()*Math.PI,T()*Math.PI*2,T()*Math.PI*.4),$.scale.set(W,W*(.75+T()*.35),W*(.85+T()*.3)),$.updateMatrix(),M.setMatrixAt(b,$.matrix)}M.instanceMatrix.needsUpdate=!0,t.add(M)});const j=new Z;j.position.set(4.8,5.2,-15);const tt=new nt({uniforms:{dayTexture:{value:be},nightTexture:{value:Pe},sunDir:{value:p},viewPos:{value:E.position}},vertexShader:`
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
    `});j.add(new m(new H(.72,48,24),tt));const it=new nt({transparent:!0,side:Qt,depthWrite:!1,blending:gt,uniforms:{viewVector:{value:E.position}},vertexShader:`
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
    `});j.add(new m(new H(.8,32,16),it)),t.add(j);const Y=new de(.02,1.8,32);Y.rotateX(-Math.PI/2);const It=new ct({color:1579552,transparent:!0,opacity:0,depthWrite:!1,blending:ye,side:Et}),lt=new m(Y,It);lt.position.y=.003,t.add(lt);const yt=new xe(1.45,32);yt.rotateX(-Math.PI/2);const dt=new m(yt,new ct({color:131845,transparent:!0,opacity:.55,depthWrite:!1}));return dt.position.set(0,.004,0),t.add(dt),{group:t,terrainMesh:c,sunLight:v,skyEarthGroup:j,blastDecalMat:It,bodyContactShadow:dt}}const B=No();B.group.visible=!1;X.add(B.group);function Ao(){const t=new Z,e=new G({color:13936707,metalness:.8,roughness:.35}),o=new G({color:15725560,metalness:.15,roughness:.5}),s=new G({color:1711652,metalness:.85,roughness:.42}),h=new G({color:1119256,metalness:.7,roughness:.55}),y=new G({color:13160664,metalness:.82,roughness:.3}),x=new G({color:9081498,metalness:.85,roughness:.35}),l=new C(.92,.98,.8,8),u=new m(l,e);u.position.y=.55,t.add(u);const c=new C(.8,.92,.55,8),g=new m(c,o);g.position.y=1.175,t.add(g);const f=new H(.76,8,6,0,Math.PI*2,0,Math.PI*.45),n=new m(f,o);n.position.y=1.45,t.add(n);for(let d=0;d<4;d++){const M=d*Math.PI/2+Math.PI/8,b=new m(new Jt(.55,.65,.04),h);b.position.set(Math.cos(M)*.94,.55,Math.sin(M)*.94),b.rotation.y=-M,t.add(b)}for(let d=0;d<4;d++){const M=d*Math.PI/2,b=new m(new C(.2,.2,.48,12),e);b.position.set(Math.cos(M)*.68,.55,Math.sin(M)*.68),t.add(b)}const w=[new ut(.08,0),new ut(.12,.12),new ut(.26,.38),new ut(.32,.52)],a=new so(w,18),p=new m(a,s);p.rotation.x=Math.PI,p.position.y=.14,t.add(p);const v=new m(new C(.075,.075,.05,12),s);v.position.y=.15,t.add(v);const S=new nt({transparent:!0,side:Et,depthWrite:!1,blending:gt,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`
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
    `}),T=new Me(.7,1.4,24,8,!0),A=new m(T,S);A.rotation.x=Math.PI,A.position.y=-.72,t.add(A);const N=new ao(16771264,0,6);N.position.y=-.3,N.castShadow=!1,t.add(N);const L=[],U=[],_=new i(0,1,0);for(let d=0;d<4;d++){const M=d*Math.PI/2+Math.PI/4,b=new i(Math.cos(M)*.95,.55,Math.sin(M)*.95),R=new i(Math.cos(M)*1.55,-.05,Math.sin(M)*1.55),k=new i(Math.cos(M)*.65,.18,Math.sin(M)*.65),D=new C(.034,.03,1,8),O=new m(D,s),K=new i().subVectors(R,b),W=K.length(),Q=K.clone().normalize();O.position.copy(b).addScaledVector(Q,W*.5),O.quaternion.setFromUnitVectors(_,Q),O.scale.set(1,W,1),t.add(O);const Yt=new C(.02,.02,1,6),st=new m(Yt,s),Mt=new i().subVectors(R,k),xt=Mt.length(),St=Mt.clone().normalize();st.position.copy(k).addScaledVector(St,xt*.5),st.quaternion.setFromUnitVectors(_,St),st.scale.set(1,xt,1),t.add(st);const zt=new C(.044,.042,1,8),bt=new m(zt,y);t.add(bt);const pt=new C(.028,.028,1,8),Pt=new m(pt,s);t.add(Pt);const rt=new Z,qt=new C(.24,.22,.05,16),Ct=new m(qt,x);Ct.position.y=.025,rt.add(Ct);const Oe=new H(.05,8,8),re=new m(Oe,s);re.position.y=.05,rt.add(re),t.add(rt);const ce=new xe(.28,16);ce.rotateX(-Math.PI/2);const le=new m(ce,new ct({color:131845,transparent:!0,opacity:0,depthWrite:!1}));X.add(le),L.push({upperStrut:O,secondaryBrace:st,shockBarrel:bt,innerPiston:Pt,padGroup:rt,contactDecal:le,hipPos:b,kneePos:R,braceMount:k,azimuth:M}),U.push(new i)}const $=(d,M)=>{for(let k=0;k<4;k++){const D=L[k],O=D.azimuth+M,K=d.x+Math.cos(O)*1.95,W=d.z+Math.sin(O)*1.95,Q=F(K,W),Yt=d.y+-1.355,st=Math.max(Q,Yt),Mt=new i(K,st,W);U[k].copy(Mt);const xt=t.worldToLocal(Mt.clone());D.padGroup.position.copy(xt);const St=xt.clone().add(new i(0,.05,0)),zt=new i().subVectors(St,D.kneePos),bt=Math.max(.01,zt.length()),pt=zt.clone().normalize(),Pt=bt*.56;D.shockBarrel.position.copy(D.kneePos).addScaledVector(pt,Pt*.5),D.shockBarrel.quaternion.setFromUnitVectors(_,pt),D.shockBarrel.scale.set(1,Pt,1);const rt=bt*.58;D.innerPiston.position.copy(St).addScaledVector(pt,-rt*.5),D.innerPiston.quaternion.setFromUnitVectors(_,pt),D.innerPiston.scale.set(1,rt,1),D.contactDecal.position.set(K,Q+.003,W);const qt=Math.max(0,st-Q),Ct=wt.clamp(1-qt*2.5,0,.72);D.contactDecal.material.opacity=Ct}return U},j=new C(.014,.014,.7,6),tt=new m(j,s);tt.position.set(.35,1.85,.25),t.add(tt);const it=new H(.28,16,8,0,Math.PI*2,0,Math.PI*.42),Y=new m(it,y);Y.position.set(.35,2.2,.25),Y.rotation.set(-.4,.5,0),t.add(Y);const It=new C(.008,.008,.45,6),lt=new m(It,s);lt.rotation.z=-Math.PI/3,lt.position.set(-.45,1.7,.18),t.add(lt),[[.96,1.15,0],[-.96,1.15,0],[0,1.15,.96],[0,1.15,-.96]].forEach(([d,M,b])=>{const R=new m(new H(.012,6,6),new ct({color:2280584}));R.position.set(d,M,b),t.add(R)});const yt=new ct({color:16777215,transparent:!0,opacity:0}),dt=new m(new H(.018,6,6),yt);return dt.position.set(0,1.92,0),t.add(dt),{group:t,plumeMat:S,engineLight:N,beaconMat:yt,footpads:U,updateLegs:$,telemetryEl:null}}const P=Ao();P.group.visible=!1;P.group.scale.setScalar(1);X.add(P.group);const jt=120,Re=new he,Ft=new Float32Array(jt*3),ht=new Float32Array(jt*3),Xt=vt(13653764),Lo=1.62;for(let t=0;t<jt;t++){const e=Xt()*Math.PI*2,o=.8+Xt()*2.8,s=.4+Xt()*1.2;ht[t*3]=Math.cos(e)*o,ht[t*3+1]=s,ht[t*3+2]=Math.sin(e)*o,Ft[t*3]=Ft[t*3+1]=Ft[t*3+2]=0}Re.setAttribute("position",new Tt(Ft,3));const Ie=new we({color:12107464,size:.06,transparent:!0,opacity:0,depthWrite:!1,blending:ye,sizeAttenuation:!0}),et=new ge(Re,Ie);et.visible=!1;X.add(et);const ne=document.createElement("div");ne.id="ui-overlay";ne.innerHTML=`
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
`;Gt.appendChild(ne);const ie=document.createElement("div");ie.className="progress-strip";ie.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';Gt.appendChild(ie);const Rt=document.createElement("a");Rt.href="/workstation.html";Rt.className="skip-to-workstation";Rt.textContent="Skip to workstation";Rt.setAttribute("aria-label","Skip animation and enter workstation");Gt.appendChild(Rt);const q=[{progress:0,pos:new i(28,3.5,20),look:new i(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.2,pos:new i(18,5.5,16),look:new i(17,.5,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.38,pos:new i(10,4.5,8),look:new i(7.5,2,-18),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.52,pos:new i(6,2.8,.5),look:new i(4.2,.8,-28),fov:35,name:"LUNAR ORBIT INSERTION"},{progress:.64,pos:new i(5.8,1.5,-12),look:new i(4.45,.2,-22),fov:28,name:"DESCENT ORBIT"},{progress:.76,pos:new i(4.5,1,-16),look:new i(0,0,0),fov:22,name:"SURFACE APPROACH"},{progress:.78,pos:new i(-2.5,1.8,6.5),look:new i(0,0,0),fov:38,name:"POWERED DESCENT"},{progress:.84,pos:new i(3.8,1.2,5.5),look:new i(0,.85,0),fov:35,name:"FINAL APPROACH"},{progress:.92,pos:new i(3.2,.8,4.2),look:new i(0,.45,0),fov:32,name:"TOUCHDOWN IMMINENT"},{progress:.96,pos:new i(3.8,1,4.8),look:new i(.2,.5,.2),fov:32,name:"SOUTH POLE TOUCHDOWN"},{progress:1,pos:new i(3.5,.85,4.45),look:new i(.15,.42,.15),fov:30,name:"SOUTH POLE TOUCHDOWN"}];function I(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function ze(t){const e=Math.max(0,Math.min(1,t));let o=q.length-1;for(let n=0;n<q.length-1;n++)if(e>=q[n].progress&&e<q[n+1].progress){o=n;break}const s=q[o],h=q[Math.min(o+1,q.length-1)],y=h.progress-s.progress,x=y>0?(e-s.progress)/y:1,l=I(Math.max(0,Math.min(1,x))),u=new i().lerpVectors(s.pos,h.pos,l),c=new i().lerpVectors(s.look,h.look,l),g=s.fov+(h.fov-s.fov)*l;let f=s.name;for(let n=q.length-1;n>=0;n--)if(e>=q[n].progress){f=q[n].name;break}return{pos:u,look:c,fov:g,phaseName:f}}function Do(t,e){const o=F(0,0),s=2.35,h=36,y=wt.degToRad(h),x=e<1?2*Math.atan(Math.tan(y/2)*e):y;if(t>=r.touchdownT){const v=s/Math.sin(x/2)*1.35,S=Math.PI*.32,T=new i(Math.cos(S),0,Math.sin(S)).normalize(),A=new i().crossVectors(new i(0,1,0),T).normalize(),N=o+1.75,L=o+1.45,U=(t-r.touchdownT)/Math.max(.001,1-r.touchdownT),_=v*(1-U*.04),$=Math.sqrt(Math.max(1,_*_-(N-L)*(N-L))),j=2*_*Math.tan(x/2)*(e<1?1:e),tt=(e<1?-.16:-.28)*(j*.5),it=new i(0,L,0).addScaledVector(A,tt),Y=new i(0,0,0).addScaledVector(T,$).addScaledVector(A,tt);return Y.y=N,{pos:Y,look:it,fov:h}}if(t>=r.s7_descent){const p=(t-r.s7_descent)/(r.touchdownT-r.s7_descent),S=s/Math.sin(x/2)*1.62,T=Math.PI*.35-p*.07,A=new i(Math.cos(T),0,Math.sin(T)).normalize(),N=new i().crossVectors(new i(0,1,0),A).normalize(),L=P.group.position,U=L.y+.35,_=Math.max(o+1.75,L.y*.55+1.75),$=2*S*Math.tan(x/2)*(e<1?1:e),j=(e<1?-.14:-.25)*($*.5),tt=Math.sqrt(Math.max(1,S*S-(_-U)*(_-U))),it=new i(L.x,U,L.z).addScaledVector(N,j),Y=new i(L.x,0,L.z).addScaledVector(A,tt).addScaledVector(N,j);return Y.y=_,{pos:Y,look:it,fov:h}}const u=2.6-(t-.76)/(r.s7_descent-.76)*1,c=s/Math.sin(x/2)*u,g=Math.PI*.4,f=new i(Math.cos(g),0,Math.sin(g)).normalize(),n=P.group.position,w=new i(n.x,n.y+.5,n.z);return{pos:new i(0,o+3,0).addScaledVector(f,c*.9),look:w,fov:38}}function ko(t){const e=t<r.moonFadeEnd+.01,o=t>=r.moonFadeStart;J.visible=e,B.group.visible=o;const s=Math.max(0,Math.min(1,(t-r.moonFadeStart)/Math.max(.001,r.moonFadeEnd-r.moonFadeStart))),h=I(1-s);Bt.uniforms.opacity.value=h,ae.uniforms.opacity.value=h,te&&J.visible&&B.group.visible}function Ce(){if(te){for(let t=0;t<=1e3;t++){const e=t/1e3,o=e<r.moonFadeEnd+.01,s=e>=r.moonFadeStart,h=e>=r.moonFadeStart&&e<=r.moonFadeEnd+.01;o&&s&&!h&&console.error(`[LUNAOPS DEBUG] Both groups visible at t=${e.toFixed(3)} outside crossfade window!`)}console.log("[LUNAOPS DEBUG] Visibility consistency check passed.")}}let V=0,at=0,Ht=0,Nt=r.autoSpeed,$t=null;const Vt=new i;try{const t=new URLSearchParams(window.location.search);if(t.has("t")){const e=parseFloat(t.get("t"));isNaN(e)||(V=at=Math.max(0,Math.min(1,e)),Nt=0)}}catch{}function Wt(){Nt=0,$t&&clearTimeout($t),$t=setTimeout(()=>{Nt=r.autoSpeed},2800)}function Ro(t){const e=r.springStiffness,o=r.springDamping,s=Math.max(0,Math.min(1,V)),h=e*(s-at)-o*Ht;Ht+=h*t,at+=Ht*t,at=Math.max(0,Math.min(1,at))}const Ve=1.38;function ue(t=0){const e=F(0,0);return new i(0,e+Ve+t,0)}const Io=window.matchMedia("(prefers-reduced-motion: reduce)").matches,zo=[0,.05,.1,.15,.2,.25,.3],Co=.07;function Vo(t,e){const o=Math.max(0,Math.min(1,t)),s=document.getElementById("journey-fill");s&&(s.style.height=`${(o*100).toFixed(1)}%`);const h=document.getElementById("panel-phase-badge");if(h){const{phaseName:a}=ze(o);h.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${a}`}const y=document.getElementById("left-panel");if(y)if(o>=r.s3_orbit&&o<r.s8_touchdown){const a=I(Math.max(0,Math.min(1,(o-r.s3_orbit)/.06)));y.style.opacity=String(1-a)}else if(o>=r.s8_touchdown){const a=I(Math.max(0,Math.min(1,(o-r.s8_touchdown)/.04)));y.style.opacity=String(a)}else y.style.opacity="1";document.querySelectorAll(".hero-letter").forEach((a,p)=>{if(Io){a.style.opacity="1",a.style.transform="none";return}const v=Math.max(0,Math.min(1,(o-zo[p])/Co)),S=I(v);a.style.opacity=String(S),a.style.transform=`translateY(${(1-S)*24}px) scale(${.88+S*.12})`,a.style.filter=S>.02?`drop-shadow(0 0 ${S*6}px rgba(56,189,248,${S*.38}))`:"none"});const x=document.getElementById("accent-line");if(x){const a=I(Math.max(0,Math.min(1,(o-.32)/.1)));x.style.width=`${a*100}%`,x.style.opacity=String(a)}const l=document.getElementById("hero-tagline");if(l)if(o>=r.s8_touchdown){const a=I(Math.max(0,Math.min(1,(o-r.s8_touchdown)/.04)));l.style.opacity=String(a)}else{const a=I(Math.max(0,Math.min(1,(o-.38)/.1))),p=I(Math.max(0,Math.min(1,(o-.52)/.06)));l.style.opacity=String(a*(1-p))}const u=document.getElementById("hero-desc");if(u)if(o>=r.s8_touchdown){const a=I(Math.max(0,Math.min(1,(o-(r.s8_touchdown+.01))/.04)));u.style.opacity=String(a)}else{const a=I(Math.max(0,Math.min(1,(o-.42)/.1))),p=I(Math.max(0,Math.min(1,(o-.54)/.06)));u.style.opacity=String(a*(1-p))}const c=document.getElementById("initial-scroll-cue");if(c)if(o>.26)c.style.display="none";else{c.style.display="flex";const a=Math.max(0,Math.min(1,o/.2));c.style.opacity=String(1-a)}const g=document.getElementById("shot-caption");if(g){let a="";for(const p of r.captions)if(o>=p.t&&o<=p.endT){a=p.text;break}a!==g.textContent&&(g.style.opacity="0",setTimeout(()=>{g.textContent=a,g.style.opacity=a?"1":"0"},150))}const f=document.getElementById("descent-hud");if(f)if(o>=r.s7_descent&&o<r.touchdownT){const a=(o-r.s7_descent)/(r.touchdownT-r.s7_descent),p=Math.max(0,280*(1-a)),v=-(.5+a*3.8),S=Math.max(12,Math.round(98-a*82));let T="POWERED DESCENT";a>.8?T="TERMINAL GUIDANCE":a<.25&&(T="APPROACH BURN");const A=document.getElementById("telem-alt"),N=document.getElementById("telem-vspd"),L=document.getElementById("telem-phase"),U=document.getElementById("telem-fuel");A&&(A.textContent=`${p.toFixed(0)} m`),N&&(N.textContent=`${v.toFixed(1)} m/s`),L&&(L.textContent=T),U&&(U.textContent=`${S} %`);const _=I(Math.max(0,Math.min(1,(o-r.s7_descent)/.02)));f.style.opacity=String(_)}else f.style.opacity="0";const n=document.getElementById("sp-landing-card");if(n)if(o>=r.touchdownT){const a=I(Math.max(0,Math.min(1,(o-r.touchdownT)/.025)));n.style.opacity=String(a),n.style.transform=`translateY(${-50+(1-a)*10}%)`,n.style.pointerEvents=o>=r.touchdownT+.005?"auto":"none"}else n.style.opacity="0",n.style.transform="translateY(-40%)",n.style.pointerEvents="none";const w=document.getElementById("touchdown-dock");if(w)if(o>=r.touchdownT){const a=I(Math.max(0,Math.min(1,(o-r.touchdownT)/.02)));w.classList.add("visible"),w.style.opacity=String(a),w.style.transform=`translateX(-50%) translateY(${(1-a)*12}px)`,w.style.pointerEvents="auto"}else w.classList.remove("visible"),w.style.opacity="0",w.style.transform="translateX(-50%) translateY(12px)",w.style.pointerEvents="none"}window.addEventListener("wheel",t=>{t.preventDefault(),V+=t.deltaY*38e-5,V=Math.max(0,Math.min(1,V)),Wt()},{passive:!1});let Kt=0;window.addEventListener("touchstart",t=>{Kt=t.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",t=>{const e=Kt-t.touches[0].clientY;Kt=t.touches[0].clientY,V+=e*75e-5,V=Math.max(0,Math.min(1,V)),Wt()},{passive:!0});window.addEventListener("keydown",t=>{if(t.key==="ArrowDown"||t.key==="ArrowRight"){const e=q.find(o=>o.progress>V+.01);e&&(V=e.progress,Wt()),t.preventDefault()}else if(t.key==="ArrowUp"||t.key==="ArrowLeft"){const o=[...q].reverse().find(s=>s.progress<V-.01);o&&(V=o.progress,Wt()),t.preventDefault()}else(t.key==="Enter"||t.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;E.aspect=t/e,E.updateProjectionMatrix(),ot.setSize(t,e),Lt.setSize(t,e),oe.resolution.set(t,e)});let mt=[],_t=2;function _o(t){var e;mt.push(t),mt.length>30&&(mt.shift(),mt.reduce((s,h)=>s+h)/mt.length>22&&_t>0&&(_t--,_t<1&&(oe.enabled=!1),_t<2&&(B.sunLight.shadow.mapSize.set(512,512),(e=B.sunLight.shadow.map)==null||e.dispose(),B.sunLight.shadow.map=null),mt=[]))}let _e=!0;document.addEventListener("visibilitychange",()=>{_e=!document.hidden});const ve=new no;function Ue(){if(requestAnimationFrame(Ue),!_e)return;const t=Math.min(ve.getDelta(),.1),e=ve.getElapsedTime(),o=performance.now();V+=Nt*t,V=Math.max(0,Math.min(1,V)),Ro(t);const s=at;if(s>=r.s6_establishing){const l=Do(s,E.aspect);E.position.copy(l.pos),Vt.copy(l.look),E.lookAt(Vt),E.fov=l.fov,E.updateProjectionMatrix()}else{const{pos:l,look:u,fov:c}=ze(s),g=.06,f=new i(Math.sin(e*.08)*g,Math.cos(e*.055)*(g*.55),0),n=l.clone().add(f);E.position.lerp(n,.055),Vt.lerp(u,.055),E.lookAt(Vt),Math.abs(E.fov-c)>.05&&(E.fov=wt.lerp(E.fov,c,.05),E.updateProjectionMatrix())}ko(s);const h=new io(xo,So,bo);if(s>=.01&&s<r.s4_separation){z.group.visible=!0;const l=Math.max(.001,Math.min(.999,s)),u=h.getPoint(l),c=h.getTangent(l).normalize();z.group.position.copy(u),z.group.quaternion.setFromUnitVectors(new i(0,0,-1),c),z.group.rotateZ(e*.1),z.group.scale.setScalar(1),z.thrusterMat.opacity=.2+Math.sin(e*9)*.1,z.beaconMat.opacity=Math.sin(e*4.2)>.88?.9:0}else if(s>=r.s3_orbit&&s<r.s4_separation){z.group.visible=!0;const l=e*.35,u=new i(J.position.x+Math.cos(l)*4.2,J.position.y+1.8+Math.sin(l*.7)*.5,J.position.z+Math.sin(l)*3.6);z.group.position.copy(u);const c=new i(-Math.sin(l),.15,Math.cos(l)).normalize();z.group.quaternion.setFromUnitVectors(new i(0,0,-1),c),z.group.scale.setScalar(1),z.thrusterMat.opacity=.22+Math.sin(e*9)*.08,z.beaconMat.opacity=Math.sin(e*4)>.88?.9:0}else z.group.visible=!1;const y=r.landerStartT,x=r.landerDescentEnd;if(s<y)P.group.visible=!1,et.visible=!1;else if(s<x){P.group.visible=!0,et.visible=!1;const l=(s-y)/(x-y),u=I(l),c=new i(0,2.6,0),g=ue(0);P.group.position.lerpVectors(c,g,I(l));const f=-.28*(1-u)*(1-u);P.group.rotation.set(f,e*.04,0),P.updateLegs(P.group.position,P.group.rotation.y);const n=s>=r.s7_legsOut?1-I((s-r.s7_legsOut)/(x-r.s7_legsOut))*.85:1;P.plumeMat.uniforms.strength.value=n*(.7+Math.sin(e*22)*.3),P.plumeMat.uniforms.time.value=e,P.engineLight.intensity=n*(3.2+Math.sin(e*18)*1),B.blastDecalMat.opacity=n*.65;const w=Math.max(0,Math.min(1,(s-r.s5_transitionDip)/.015)),a=Math.max(0,Math.min(1,(s-(r.s5_transitionDip+.015))/.025)),p=w<1?w:1-a;Ot.uniforms.exposure.value=1-p*.85,P.beaconMat.opacity=Math.sin(e*6)>.75?.9:0}else{P.group.visible=!0;const l=(s-r.touchdownT)/Math.max(.001,1-r.touchdownT),u=.035,c=18,g=u*Math.exp(-.7*c*Math.min(l,1))*Math.cos(c*Math.min(l,.5)),f=ue(g);P.group.position.copy(f),P.group.rotation.set(0,.4,0),P.updateLegs(P.group.position,P.group.rotation.y),P.plumeMat.uniforms.strength.value=0,P.engineLight.intensity=0,B.blastDecalMat.opacity=Math.max(0,.65-(s-r.touchdownT)*2);const n=F(0,0);B.bodyContactShadow.position.set(0,n+.004,0),B.bodyContactShadow.material.opacity=.55;const w=Math.min(1,l*2.5);if(w<1&&w>0){et.visible=!0,et.position.copy(P.group.position),et.position.y-=Ve;const a=et.geometry.attributes.position,p=w*2;for(let v=0;v<jt;v++){const S=ht[v*3],T=ht[v*3+1],A=ht[v*3+2];a.setXYZ(v,S*p,T*p-.5*Lo*p*p,A*p)}a.needsUpdate=!0,Ie.opacity=Math.max(0,.35*(1-w*w))}else et.visible=!1;P.beaconMat.opacity=Math.sin(e*3.2)>.5?.85:0}if(s>=r.s5_surfaceIn){const l=Math.max(0,Math.min(1,(s-r.s5_surfaceIn)/.08)),u=wt.lerp(1.05,1.38,l);Ot.uniforms.exposure.value=u}ke.rotation.y+=t*.006,Bt.uniforms.viewPos.value.copy(E.position),ae.uniforms.viewVector.value.copy(E.position),Te.rotation.y+=t*.011,Ae.rotation.y+=t*.016,Ee.uniforms.viewPos.value.copy(E.position),Ne.uniforms.viewPos.value.copy(E.position),Le.uniforms.viewPos.value.copy(E.position),B.skyEarthGroup.rotation.y+=t*.01,Ot.uniforms.time.value=e,Vo(s),Lt.render(),_o(performance.now()-o)}window.__lunaops={setJourney:t=>{V=Math.max(0,Math.min(1,t)),at=V,Ht=0,Nt=0},getJourney:()=>at,visibility:()=>({moonGroup:J.visible,moonOpacity:Bt.uniforms.opacity.value,surfaceGroup:B.group.visible,lander:P.group.visible,orbiter:z.group.visible}),terrainHeight:F,assertVisibility:Ce,getFootpadPositions:()=>P.footpads.map(t=>{const e=t.clone();return{world:e,terrainH:F(e.x,e.z),delta:e.y-F(e.x,e.z)}})};te&&Ce();Ue();
