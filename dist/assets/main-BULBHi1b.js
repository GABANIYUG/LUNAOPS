import{W as Ge,S as zt,A as Oe,P as We,a as He,C as Be,b as je,E as Ye,R as qe,U as Xe,V as mt,c as Ze,d as s,B as ve,e as Et,f as we,g as gt,h as ge,D as $t,i as fe,T as $e,N as Je,G as $,j as G,k as st,M as u,F as Kt,l as wt,m as Me,n as W,o as Tt,p as k,q as Qe,r as ct,s as ye,t as Jt,u as Ke,v as de,I as to,O as eo,w as oo,x as xe,L as no,y as ao,z as so,Q as io,H as ro,J as pe}from"./UnrealBloomPass-D4WWXORl.js";const r={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s3_orbit:.52,s4_separation:.64,s5_transitionDip:.72,s5_surfaceIn:.76,s6_establishing:.78,s7_descent:.84,s7_legsOut:.92,s8_touchdown:.96,s8_hold:.99,captions:[{t:.52,endT:.63,text:"400,000 KM FROM HOME"},{t:.64,endT:.72,text:"ONE QUESTION.  THREE ANSWERS."},{t:.78,endT:.84,text:"IS THE GROUND SAFE?"}],moonFadeStart:.72,moonFadeEnd:.76,landerStartT:.72,landerDescentEnd:.96,touchdownT:.96,statusLineT:.985};function ht(t){let e=t;return function(){e|=0,e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967295}}const te=new URLSearchParams(location.search).has("debug"),Ht=document.getElementById("landing-root"),ee=document.createElement("canvas");ee.id="scene-canvas";Ht.appendChild(ee);const Ut=window.innerWidth<768,co=Ut?1.25:1.5,ot=new Ge({canvas:ee,antialias:!0,alpha:!1,powerPreference:"high-performance"});ot.setSize(window.innerWidth,window.innerHeight);ot.setPixelRatio(Math.min(window.devicePixelRatio,co));ot.outputColorSpace=zt;ot.toneMapping=Oe;ot.toneMappingExposure=1.05;ot.shadowMap.enabled=!0;ot.shadowMap.type=We;const X=new He;X.background=new Be(266);const T=new je(32,window.innerWidth/window.innerHeight,.5,8e3);T.position.set(0,0,20);const _t=new Ye(ot);_t.addPass(new qe(X,T));const oe=new Xe(new mt(window.innerWidth,window.innerHeight),.12,.35,.92);_t.addPass(oe);const lo={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new s(.92,.96,1.06)},hlTint:{value:new s(1.04,1.01,.97)}},vertexShader:`
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
  `},Ft=new Ze(lo);_t.addPass(Ft);(function(){const e=ht(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:n,rMin:h,rMax:S,size:y,opacity:l})=>{const m=new Float32Array(n*3),c=new Float32Array(n*3);for(let i=0;i<n;i++){const f=e()*Math.PI*2,g=Math.acos(2*e()-1),a=h+e()*(S-h);m[i*3]=a*Math.sin(g)*Math.cos(f),m[i*3+1]=a*Math.sin(g)*Math.sin(f),m[i*3+2]=a*Math.cos(g);const d=e();c[i*3]=.85+d*.15,c[i*3+1]=.88+d*.12,c[i*3+2]=1}const v=new ve;v.setAttribute("position",new Et(m,3)),v.setAttribute("color",new Et(c,3));const w=new we({size:y,vertexColors:!0,transparent:!0,opacity:l,sizeAttenuation:!0,blending:gt,depthWrite:!1});X.add(new ge(v,w))})})();const Lt=new s(8,2.5,6).normalize(),Se=new $t(16774624,3.6);Se.position.copy(Lt).multiplyScalar(500);X.add(Se);const po=new fe(330264,.05);X.add(po);const ft=new $e,be=ft.load("/generated/earth/earth_day_2k.webp",t=>{t.colorSpace=zt}),Pe=ft.load("/generated/earth/earth_night_2k.webp",t=>{t.colorSpace=zt}),uo=ft.load("/generated/earth/earth_specular_2k.webp"),mo=ft.load("/generated/earth/earth_clouds_2k.webp",t=>{t.colorSpace=zt}),ho=ft.load("/generated/lroc_color_2k.jpg",t=>{t.colorSpace=zt}),vo=ft.load("/generated/ldem_normal_map_half.png",t=>{t.colorSpace=Je}),ne=6,At=new $;At.position.set(26,-2,-8);X.add(At);const wo=new G(ne,128,64),Te=new st({uniforms:{dayTexture:{value:be},nightTexture:{value:Pe},specularTexture:{value:uo},sunDir:{value:Lt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `}),Ee=new u(wo,Te);At.add(Ee);const go=new G(ne*1.012,128,64),Ne=new st({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:mo},sunDir:{value:Lt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `}),ze=new u(go,Ne);At.add(ze);const fo=new G(ne*1.028,64,32),_e=new st({transparent:!0,side:Kt,depthWrite:!1,blending:gt,uniforms:{sunDir:{value:Lt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `});At.add(new u(fo,_e));const Le=2.2,J=new $;J.position.set(4.5,.8,-28);J.rotation.x=wt.degToRad(6.68);X.add(J);const Mo=new G(Le,128,64),Bt=new st({uniforms:{colorTexture:{value:ho},normalTexture:{value:vo},sunDir:{value:Lt.clone()},viewPos:{value:T.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),Ae=new u(Mo,Bt);J.add(Ae);const yo=new G(Le*1.008,64,32),ae=new st({transparent:!0,side:Kt,depthWrite:!1,blending:gt,uniforms:{viewVector:{value:T.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});J.add(new u(yo,ae));const xo=new s(26,-2,-8),So=new s(12,6,-14),bo=new s(6.5,2,-25);function Po(){const t=new $,e=new W({color:15594232,metalness:.65,roughness:.3}),o=new W({color:13606442,metalness:.92,roughness:.18}),n=new W({color:1580066,metalness:.88,roughness:.42,side:Tt}),h=new W({color:464168,metalness:.9,roughness:.12}),S=new W({color:14213096,metalness:.88,roughness:.28,side:Tt});t.add(Object.assign(new u(new k(.34,.36,.85,8),e))),t.add(Object.assign(new u(new k(.362,.362,.38,8),o)));const y=new u(new k(.18,.34,.44,8),e);y.position.y=.64,t.add(y);const l=new u(new Qe(.12,.022,8,20),n);l.rotation.x=Math.PI/2,l.position.y=.87,t.add(l);const m=new u(new k(.24,.09,.3,16,1,!0),n);m.position.y=-.58,t.add(m);const c=new ct({color:10342639,transparent:!0,opacity:.3,blending:gt,side:Tt,depthWrite:!1}),v=new u(new ye(.08,.32,12,1,!0),c);v.position.y=-.76,v.rotation.x=Math.PI,t.add(v),[-1,1].forEach(d=>{const N=new $;N.position.set(d*.44,0,0);const x=new u(new k(.018,.018,.28,8),n);x.rotation.z=Math.PI/2,x.position.x=d*.14,N.add(x);for(let z=0;z<3;z++){const E=new $;E.position.x=d*(.34+z*.52),E.add(Object.assign(new u(new Jt(.47,.013,.31),o))),E.add(Object.assign(new u(new Jt(.44,.015,.28),h))),N.add(E)}t.add(N)});const w=new $;w.position.set(.3,.2,.3),w.rotation.set(-.55,.65,0),w.add(new u(new G(.22,16,10,0,Math.PI*2,0,Math.PI*.42),S));const i=new u(new k(.009,.009,.2,6),n);i.position.z=.1,i.rotation.x=Math.PI/2,w.add(i),t.add(w);const f=new ct({color:16777215,transparent:!0,opacity:0}),g=new u(new G(.022,6,6),f);g.position.y=.93,t.add(g);const a=new $;return t.rotation.x=Math.PI/2,a.add(t),{group:a,thrusterMat:c,beaconMat:f}}const R=Po();R.group.visible=!1;X.add(R.group);function To(t,e,o){const n=Math.max(0,Math.min(1,(o-t)/(e-t)));return n*n*(3-2*n)}const ue=[{x:-38,z:-44,radius:30,depth:7.8,rimHeight:2.4,rimWidth:6.5,ejectaRadius:48,softness:.25},{x:50,z:34,radius:34,depth:8.8,rimHeight:2.8,rimWidth:7.2,ejectaRadius:52,softness:.35},{x:-46,z:30,radius:24,depth:5.8,rimHeight:1.9,rimWidth:5.4,ejectaRadius:40,softness:.4},{x:-18,z:20,radius:12,depth:2.8,rimHeight:1,rimWidth:3,ejectaRadius:21,softness:.2},{x:24,z:-16,radius:13.5,depth:3.2,rimHeight:1.15,rimWidth:3.4,ejectaRadius:23,softness:.3},{x:14,z:28,radius:9.5,depth:2.3,rimHeight:.85,rimWidth:2.5,ejectaRadius:17,softness:.15},{x:-26,z:-14,radius:8.8,depth:2.1,rimHeight:.78,rimWidth:2.3,ejectaRadius:16,softness:.45},{x:36,z:-34,radius:14.5,depth:3.5,rimHeight:1.3,rimWidth:3.6,ejectaRadius:25,softness:.25},{x:-10,z:-28,radius:10.5,depth:2.5,rimHeight:.9,rimWidth:2.7,ejectaRadius:19,softness:.3},{x:30,z:14,radius:8,depth:1.9,rimHeight:.7,rimWidth:2.1,ejectaRadius:15,softness:.35},{x:-6.2,z:9.2,radius:3.4,depth:.8,rimHeight:.3,rimWidth:.95,ejectaRadius:7,softness:.15},{x:8.2,z:-7.5,radius:4.2,depth:.98,rimHeight:.36,rimWidth:1.15,ejectaRadius:8.5,softness:.1},{x:9.5,z:10.5,radius:3,depth:.7,rimHeight:.26,rimWidth:.85,ejectaRadius:6,softness:.2},{x:-10.5,z:-8.5,radius:3.8,depth:.88,rimHeight:.32,rimWidth:1.05,ejectaRadius:7.5,softness:.3},{x:16,z:-4.8,radius:2.6,depth:.6,rimHeight:.24,rimWidth:.75,ejectaRadius:5.4,softness:.15},{x:-4.8,z:-16.5,radius:5,depth:1.15,rimHeight:.42,rimWidth:1.35,ejectaRadius:9.8,softness:.25},{x:-14,z:6.2,radius:3.2,depth:.75,rimHeight:.28,rimWidth:.88,ejectaRadius:6.5,softness:.2},{x:6.5,z:18.2,radius:4.8,depth:1.1,rimHeight:.4,rimWidth:1.25,ejectaRadius:9,softness:.35},{x:-20.5,z:-4.2,radius:2.4,depth:.55,rimHeight:.2,rimWidth:.65,ejectaRadius:4.8,softness:.1},{x:20,z:19.5,radius:4,depth:.92,rimHeight:.34,rimWidth:1.05,ejectaRadius:8,softness:.2},{x:-2.2,z:13.5,radius:2.8,depth:.65,rimHeight:.24,rimWidth:.75,ejectaRadius:5.6,softness:.15},{x:12.5,z:-20.5,radius:3.6,depth:.84,rimHeight:.3,rimWidth:.95,ejectaRadius:7.2,softness:.25}];function F(t,e){let o=0;for(let m=0;m<ue.length;m++){const c=ue[m],v=t-c.x,w=e-c.z,i=Math.sqrt(v*v+w*w);if(i<c.radius){const g=i/c.radius,a=-c.depth*(1-g*g)*(1-c.softness*.35);o+=a}const f=Math.abs(i-c.radius)/c.rimWidth;if(f<3){const g=c.rimHeight*Math.exp(-f*f*2.2)*(1-c.softness*.45);o+=g}if(i>=c.radius&&i<c.ejectaRadius){const g=(i-c.radius)/(c.ejectaRadius-c.radius),a=c.rimHeight*.42*(1-g)*(1-g);o+=a}}const h=(e+95)/48,S=4.5*Math.exp(-h*h)*Math.max(0,1-Math.abs(t-8)/130);o+=S;const y=Math.sqrt(t*t+e*e),l=1-To(1.5,4,y);return o*(1-l)}function Eo(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),o=e.createImageData(512,512),n=o.data,h=ht(1280659009),S=new Float32Array(512*512);for(let l=0;l<512*512;l++)S[l]=(h()-.5)*.35;for(let l=1;l<511;l++)for(let m=1;m<511;m++){const c=l*512+m,v=(S[c+1]-S[c-1])*3.5,w=(S[c+512]-S[c-512])*3.5;let i=-v,f=-w,g=1;const a=Math.sqrt(i*i+f*f+g*g);i/=a,f/=a,g/=a;const d=c*4;n[d]=Math.floor((i*.5+.5)*255),n[d+1]=Math.floor((f*.5+.5)*255),n[d+2]=Math.floor((g*.5+.5)*255),n[d+3]=255}e.putImageData(o,0,0);const y=new ro(t);return y.wrapS=pe,y.wrapT=pe,y.repeat.set(120,120),y}function No(){const t=new $,e=120,o=240,n=new Ke(e,e,o,o);n.rotateX(-Math.PI/2);const h=n.attributes.position,S=new Float32Array(h.count*3),y=ht(322420463);for(let p=0;p<h.count;p++){const M=h.getX(p),b=h.getZ(p),D=F(M,b);h.setY(p,D);const L=.5,_=F(M+L,b)-F(M-L,b),U=F(M,b+L)-F(M,b-L),Q=Math.min(1,Math.sqrt(_*_+U*U)/(L*2)),O=(y()-.5)*.02,K=Math.max(.1,Math.min(.18,.125+Q*.045+O));S[p*3]=K,S[p*3+1]=K,S[p*3+2]=K}n.computeVertexNormals(),n.setAttribute("color",new Et(S,3));const l=Eo(),m=new W({color:10066329,vertexColors:!0,roughness:.98,metalness:.02,normalMap:l,normalScale:new mt(.35,.35)}),c=new u(n,m);c.receiveShadow=!0,t.add(c);const v=new de(e*.495,420,96,24);v.rotateX(-Math.PI/2);const w=v.attributes.position,i=new Float32Array(w.count*3);for(let p=0;p<w.count;p++){const M=w.getX(p),b=w.getZ(p);w.setY(p,F(M,b));const D=.125;i[p*3]=D,i[p*3+1]=D,i[p*3+2]=D}v.computeVertexNormals(),v.setAttribute("color",new Et(i,3));const f=new u(v,m);f.receiveShadow=!0,t.add(f);const g=wt.degToRad(6.2),a=new s(Math.cos(g)*.96,Math.sin(g),Math.cos(g)*.28).normalize(),d=new $t(16776178,5.2);d.position.copy(a).multiplyScalar(80),d.castShadow=!0,d.shadow.mapSize.set(2048,2048),d.shadow.camera.near=1,d.shadow.camera.far=160,d.shadow.camera.left=-28,d.shadow.camera.right=28,d.shadow.camera.top=28,d.shadow.camera.bottom=-28,d.shadow.bias=-8e-4,d.shadow.normalBias=.03,t.add(d);const N=new $t(2239032,.55);N.position.set(-a.x*60,8,-a.z*60),t.add(N),t.add(new fe(1053726,.22));const x=ht(195936478),z=new to(1,2),E=z.attributes.position,V=ht(4276994270);for(let p=0;p<E.count;p++){const M=E.getX(p),b=E.getY(p),D=E.getZ(p),L=b<0?.75:1;E.setXYZ(p,M*(.8+V()*.4),b*(.65+V()*.45)*L,D*(.8+V()*.4))}z.computeVertexNormals();const B=new W({color:2368548,roughness:.96,metalness:.04}),C=[{count:Ut?35:75,sMin:.1,sMax:.25},{count:Ut?18:36,sMin:.25,sMax:.6},{count:Ut?6:14,sMin:.6,sMax:1.15}],Z=new eo;C.forEach(p=>{const M=new oo(z,B,p.count);M.castShadow=!0,M.receiveShadow=!0;for(let b=0;b<p.count;b++){const D=x()*Math.PI*2,L=3.8+x()*18,_=Math.cos(D)*L,U=Math.sin(D)*L,Q=F(_,U),O=p.sMin+x()*(p.sMax-p.sMin);Z.position.set(_,Q+O*.28,U),Z.rotation.set(x()*Math.PI,x()*Math.PI*2,x()*Math.PI*.4),Z.scale.set(O,O*(.75+x()*.35),O*(.85+x()*.3)),Z.updateMatrix(),M.setMatrixAt(b,Z.matrix)}M.instanceMatrix.needsUpdate=!0,t.add(M)});const j=new $;j.position.set(4.8,5.2,-15);const tt=new st({uniforms:{dayTexture:{value:be},nightTexture:{value:Pe},sunDir:{value:a},viewPos:{value:T.position}},vertexShader:`
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
    `});j.add(new u(new G(.72,48,24),tt));const it=new st({transparent:!0,side:Kt,depthWrite:!1,blending:gt,uniforms:{viewVector:{value:T.position}},vertexShader:`
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
    `});j.add(new u(new G(.8,32,16),it)),t.add(j);const Y=new de(.02,1.8,32);Y.rotateX(-Math.PI/2);const Vt=new ct({color:1579552,transparent:!0,opacity:0,depthWrite:!1,blending:Me,side:Tt}),lt=new u(Y,Vt);lt.position.y=.003,t.add(lt);const Mt=new xe(1.45,32);Mt.rotateX(-Math.PI/2);const dt=new u(Mt,new ct({color:131845,transparent:!0,opacity:.55,depthWrite:!1}));return dt.position.set(0,.004,0),t.add(dt),{group:t,terrainMesh:c,sunLight:d,skyEarthGroup:j,blastDecalMat:Vt,bodyContactShadow:dt}}const H=No();H.group.visible=!1;X.add(H.group);function zo(){const t=new $,e=new W({color:13936707,metalness:.8,roughness:.35}),o=new W({color:15725560,metalness:.15,roughness:.5}),n=new W({color:1711652,metalness:.85,roughness:.42}),h=new W({color:1119256,metalness:.7,roughness:.55}),S=new W({color:13160664,metalness:.82,roughness:.3}),y=new W({color:9081498,metalness:.85,roughness:.35}),l=new k(.92,.98,.8,8),m=new u(l,e);m.position.y=.55,t.add(m);const c=new k(.8,.92,.55,8),v=new u(c,o);v.position.y=1.175,t.add(v);const w=new G(.76,8,6,0,Math.PI*2,0,Math.PI*.45),i=new u(w,o);i.position.y=1.45,t.add(i);for(let p=0;p<4;p++){const M=p*Math.PI/2+Math.PI/8,b=new u(new Jt(.55,.65,.04),h);b.position.set(Math.cos(M)*.94,.55,Math.sin(M)*.94),b.rotation.y=-M,t.add(b)}for(let p=0;p<4;p++){const M=p*Math.PI/2,b=new u(new k(.2,.2,.48,12),e);b.position.set(Math.cos(M)*.68,.55,Math.sin(M)*.68),t.add(b)}const f=[new mt(.08,0),new mt(.12,.12),new mt(.26,.38),new mt(.32,.52)],g=new no(f,18),a=new u(g,n);a.rotation.x=Math.PI,a.position.y=.14,t.add(a);const d=new u(new k(.075,.075,.05,12),n);d.position.y=.15,t.add(d);const N=new st({transparent:!0,side:Tt,depthWrite:!1,blending:gt,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`
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
    `}),x=new ye(.7,1.4,24,8,!0),z=new u(x,N);z.rotation.x=Math.PI,z.position.y=-.72,t.add(z);const E=new ao(16771264,0,6);E.position.y=-.3,E.castShadow=!1,t.add(E);const V=[],B=[],C=new s(0,1,0);for(let p=0;p<4;p++){const M=p*Math.PI/2+Math.PI/4,b=new s(Math.cos(M)*.95,.55,Math.sin(M)*.95),D=new s(Math.cos(M)*1.55,-.05,Math.sin(M)*1.55),L=new s(Math.cos(M)*.65,.18,Math.sin(M)*.65),_=new k(.034,.03,1,8),U=new u(_,n),Q=new s().subVectors(D,b),O=Q.length(),K=Q.clone().normalize();U.position.copy(b).addScaledVector(K,O*.5),U.quaternion.setFromUnitVectors(C,K),U.scale.set(1,O,1),t.add(U);const Yt=new k(.02,.02,1,6),nt=new u(Yt,n),yt=new s().subVectors(D,L),xt=yt.length(),St=yt.clone().normalize();nt.position.copy(L).addScaledVector(St,xt*.5),nt.quaternion.setFromUnitVectors(C,St),nt.scale.set(1,xt,1),t.add(nt);const Rt=new k(.044,.042,1,8),bt=new u(Rt,S);t.add(bt);const pt=new k(.028,.028,1,8),Pt=new u(pt,n);t.add(Pt);const rt=new $,qt=new k(.24,.22,.05,16),kt=new u(qt,y);kt.position.y=.025,rt.add(kt);const Fe=new G(.05,8,8),re=new u(Fe,n);re.position.y=.05,rt.add(re),t.add(rt);const ce=new xe(.28,16);ce.rotateX(-Math.PI/2);const le=new u(ce,new ct({color:131845,transparent:!0,opacity:0,depthWrite:!1}));X.add(le),V.push({upperStrut:U,secondaryBrace:nt,shockBarrel:bt,innerPiston:Pt,padGroup:rt,contactDecal:le,hipPos:b,kneePos:D,braceMount:L,azimuth:M}),B.push(new s)}const Z=(p,M)=>{for(let L=0;L<4;L++){const _=V[L],U=_.azimuth+M,Q=p.x+Math.cos(U)*1.95,O=p.z+Math.sin(U)*1.95,K=F(Q,O),Yt=p.y+-1.355,nt=Math.max(K,Yt),yt=new s(Q,nt,O);B[L].copy(yt);const xt=t.worldToLocal(yt.clone());_.padGroup.position.copy(xt);const St=xt.clone().add(new s(0,.05,0)),Rt=new s().subVectors(St,_.kneePos),bt=Math.max(.01,Rt.length()),pt=Rt.clone().normalize(),Pt=bt*.56;_.shockBarrel.position.copy(_.kneePos).addScaledVector(pt,Pt*.5),_.shockBarrel.quaternion.setFromUnitVectors(C,pt),_.shockBarrel.scale.set(1,Pt,1);const rt=bt*.58;_.innerPiston.position.copy(St).addScaledVector(pt,-rt*.5),_.innerPiston.quaternion.setFromUnitVectors(C,pt),_.innerPiston.scale.set(1,rt,1),_.contactDecal.position.set(Q,K+.003,O);const qt=Math.max(0,nt-K),kt=wt.clamp(1-qt*2.5,0,.72);_.contactDecal.material.opacity=kt}return B},j=new k(.014,.014,.7,6),tt=new u(j,n);tt.position.set(.35,1.85,.25),t.add(tt);const it=new G(.28,16,8,0,Math.PI*2,0,Math.PI*.42),Y=new u(it,S);Y.position.set(.35,2.2,.25),Y.rotation.set(-.4,.5,0),t.add(Y);const Vt=new k(.008,.008,.45,6),lt=new u(Vt,n);lt.rotation.z=-Math.PI/3,lt.position.set(-.45,1.7,.18),t.add(lt),[[.96,1.15,0],[-.96,1.15,0],[0,1.15,.96],[0,1.15,-.96]].forEach(([p,M,b])=>{const D=new u(new G(.012,6,6),new ct({color:2280584}));D.position.set(p,M,b),t.add(D)});const Mt=new ct({color:16777215,transparent:!0,opacity:0}),dt=new u(new G(.018,6,6),Mt);return dt.position.set(0,1.92,0),t.add(dt),{group:t,plumeMat:N,engineLight:E,beaconMat:Mt,footpads:B,updateLegs:Z,telemetryEl:null}}const P=zo();P.group.visible=!1;P.group.scale.setScalar(1);X.add(P.group);const jt=120,De=new ve,Gt=new Float32Array(jt*3),vt=new Float32Array(jt*3),Xt=ht(13653764),_o=1.62;for(let t=0;t<jt;t++){const e=Xt()*Math.PI*2,o=.8+Xt()*2.8,n=.4+Xt()*1.2;vt[t*3]=Math.cos(e)*o,vt[t*3+1]=n,vt[t*3+2]=Math.sin(e)*o,Gt[t*3]=Gt[t*3+1]=Gt[t*3+2]=0}De.setAttribute("position",new Et(Gt,3));const Ve=new we({color:12107464,size:.06,transparent:!0,opacity:0,depthWrite:!1,blending:Me,sizeAttenuation:!0}),et=new ge(De,Ve);et.visible=!1;X.add(et);const se=document.createElement("div");se.id="ui-overlay";se.innerHTML=`
  <div class="film-grain"></div>
  <div class="vignette"></div>
  <div class="letterbox-top"></div>
  <div class="letterbox-bottom"></div>

  <!-- Left panel -->
  <div class="left-panel" id="left-panel">
    <div class="panel-badge">
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS &middot; NASA SPACE APPS 2026 &middot; LOW EARTH ORBIT</span>
    </div>

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

    <div class="hero-tagline" id="hero-tagline">
      Explore the lunar frontier.<br>Plan with precision.
    </div>

    <p class="hero-desc" id="hero-desc">
      High-fidelity mission planning built on NASA LRO&thinsp;/&thinsp;LOLA
      elevation data, LROC imagery and JPL NAIF SPICE ephemerides.
    </p>

    <div class="panel-cta" id="panel-cta">
      <a href="/workstation.html" class="btn-enter" id="btn-enter-workstation"
         aria-label="Enter LUNAOPS Workstation">
        Enter Workstation
      </a>
      <span class="cta-subtext">Press <kbd>Enter</kbd> or click to launch</span>
    </div>

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
    <span id="telem-vspd">VS: ---</span>
  </div>

  <!-- Subtle status line at touchdown -->
  <div class="status-line" id="status-line" aria-live="polite">
    <svg class="status-check" viewBox="0 0 16 16" fill="none">
      <polyline points="3,9 7,13 13,4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="status-text">TOUCHDOWN COMPLETE</span>
    <span class="status-sub">Conceptual lunar landing sequence</span>
  </div>
`;Ht.appendChild(se);const ie=document.createElement("div");ie.className="progress-strip";ie.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';Ht.appendChild(ie);const Dt=document.createElement("a");Dt.href="/workstation.html";Dt.className="skip-to-workstation";Dt.textContent="Skip to workstation";Dt.setAttribute("aria-label","Skip animation and enter workstation");Ht.appendChild(Dt);const q=[{progress:0,pos:new s(28,3.5,20),look:new s(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.2,pos:new s(18,5.5,16),look:new s(17,.5,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.38,pos:new s(10,4.5,8),look:new s(7.5,2,-18),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.52,pos:new s(6,2.8,.5),look:new s(4.2,.8,-28),fov:35,name:"LUNAR ORBIT INSERTION"},{progress:.64,pos:new s(5.8,1.5,-12),look:new s(4.45,.2,-22),fov:28,name:"DESCENT ORBIT"},{progress:.76,pos:new s(4.5,1,-16),look:new s(0,0,0),fov:22,name:"SURFACE APPROACH"},{progress:.78,pos:new s(-2.5,1.8,6.5),look:new s(0,0,0),fov:38,name:"POWERED DESCENT"},{progress:.84,pos:new s(3.8,1.2,5.5),look:new s(0,.85,0),fov:35,name:"FINAL APPROACH"},{progress:.92,pos:new s(3.2,.8,4.2),look:new s(0,.45,0),fov:32,name:"TOUCHDOWN IMMINENT"},{progress:.96,pos:new s(3.8,1,4.8),look:new s(.2,.5,.2),fov:32,name:"SOUTH POLE TOUCHDOWN"},{progress:1,pos:new s(3.5,.85,4.45),look:new s(.15,.42,.15),fov:30,name:"SOUTH POLE TOUCHDOWN"}];function A(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function Re(t){const e=Math.max(0,Math.min(1,t));let o=q.length-1;for(let i=0;i<q.length-1;i++)if(e>=q[i].progress&&e<q[i+1].progress){o=i;break}const n=q[o],h=q[Math.min(o+1,q.length-1)],S=h.progress-n.progress,y=S>0?(e-n.progress)/S:1,l=A(Math.max(0,Math.min(1,y))),m=new s().lerpVectors(n.pos,h.pos,l),c=new s().lerpVectors(n.look,h.look,l),v=n.fov+(h.fov-n.fov)*l;let w=n.name;for(let i=q.length-1;i>=0;i--)if(e>=q[i].progress){w=q[i].name;break}return{pos:m,look:c,fov:v,phaseName:w}}function Lo(t,e){const o=F(0,0),n=2.35,h=36,S=wt.degToRad(h),y=e<1?2*Math.atan(Math.tan(S/2)*e):S;if(t>=r.touchdownT){const d=n/Math.sin(y/2)*1.35,N=Math.PI*.32,x=new s(Math.cos(N),0,Math.sin(N)).normalize(),z=new s().crossVectors(new s(0,1,0),x).normalize(),E=o+1.75,V=o+1.45,B=(t-r.touchdownT)/Math.max(.001,1-r.touchdownT),C=d*(1-B*.04),Z=Math.sqrt(Math.max(1,C*C-(E-V)*(E-V))),j=2*C*Math.tan(y/2)*(e<1?1:e),tt=(e<1?-.16:-.28)*(j*.5),it=new s(0,V,0).addScaledVector(z,tt),Y=new s(0,0,0).addScaledVector(x,Z).addScaledVector(z,tt);return Y.y=E,{pos:Y,look:it,fov:h}}if(t>=r.s7_descent){const a=(t-r.s7_descent)/(r.touchdownT-r.s7_descent),N=n/Math.sin(y/2)*1.62,x=Math.PI*.35-a*.07,z=new s(Math.cos(x),0,Math.sin(x)).normalize(),E=new s().crossVectors(new s(0,1,0),z).normalize(),V=P.group.position,B=V.y+.35,C=Math.max(o+1.75,V.y*.55+1.75),Z=2*N*Math.tan(y/2)*(e<1?1:e),j=(e<1?-.14:-.25)*(Z*.5),tt=Math.sqrt(Math.max(1,N*N-(C-B)*(C-B))),it=new s(V.x,B,V.z).addScaledVector(E,j),Y=new s(V.x,0,V.z).addScaledVector(z,tt).addScaledVector(E,j);return Y.y=C,{pos:Y,look:it,fov:h}}const m=2.6-(t-.76)/(r.s7_descent-.76)*1,c=n/Math.sin(y/2)*m,v=Math.PI*.4,w=new s(Math.cos(v),0,Math.sin(v)).normalize(),i=P.group.position,f=new s(i.x,i.y+.5,i.z);return{pos:new s(0,o+3,0).addScaledVector(w,c*.9),look:f,fov:38}}function Ao(t){const e=t<r.moonFadeEnd+.01,o=t>=r.moonFadeStart;J.visible=e,H.group.visible=o;const n=Math.max(0,Math.min(1,(t-r.moonFadeStart)/Math.max(.001,r.moonFadeEnd-r.moonFadeStart))),h=A(1-n);Bt.uniforms.opacity.value=h,ae.uniforms.opacity.value=h,te&&J.visible&&H.group.visible}function ke(){if(te){for(let t=0;t<=1e3;t++){const e=t/1e3,o=e<r.moonFadeEnd+.01,n=e>=r.moonFadeStart,h=e>=r.moonFadeStart&&e<=r.moonFadeEnd+.01;o&&n&&!h&&console.error(`[LUNAOPS DEBUG] Both groups visible at t=${e.toFixed(3)} outside crossfade window!`)}console.log("[LUNAOPS DEBUG] Visibility consistency check passed.")}}let I=0,at=0,Ot=0,Nt=r.autoSpeed,Zt=null;const It=new s;try{const t=new URLSearchParams(window.location.search);if(t.has("t")){const e=parseFloat(t.get("t"));isNaN(e)||(I=at=Math.max(0,Math.min(1,e)),Nt=0)}}catch{}function Wt(){Nt=0,Zt&&clearTimeout(Zt),Zt=setTimeout(()=>{Nt=r.autoSpeed},2800)}function Do(t){const e=r.springStiffness,o=r.springDamping,n=Math.max(0,Math.min(1,I)),h=e*(n-at)-o*Ot;Ot+=h*t,at+=Ot*t,at=Math.max(0,Math.min(1,at))}const Ie=1.38;function me(t=0){const e=F(0,0);return new s(0,e+Ie+t,0)}const Vo=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Ro=[0,.05,.1,.15,.2,.25,.3],ko=.07;function Io(t,e){const o=Math.max(0,Math.min(1,t)),n=document.getElementById("journey-fill");n&&(n.style.height=`${(o*100).toFixed(1)}%`);const h=document.getElementById("panel-phase-badge");if(h){const{phaseName:a}=Re(o);h.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${a}`}const S=o<r.s3_orbit||o>=r.s8_touchdown,y=document.getElementById("left-panel");if(y)if(o>=r.s3_orbit&&o<r.s8_touchdown){const a=A(Math.max(0,Math.min(1,(o-r.s3_orbit)/.06))),d=A(Math.max(0,Math.min(1,(o-r.s8_touchdown)/.06)));y.style.opacity=String(S?1:1-a+d)}else if(o>=r.s8_touchdown){const a=A(Math.max(0,Math.min(1,(o-r.s8_touchdown)/.04)));y.style.opacity=String(a)}else y.style.opacity="1";document.querySelectorAll(".hero-letter").forEach((a,d)=>{if(Vo){a.style.opacity="1",a.style.transform="none";return}const N=Math.max(0,Math.min(1,(o-Ro[d])/ko)),x=A(N);a.style.opacity=String(x),a.style.transform=`translateY(${(1-x)*24}px) scale(${.88+x*.12})`,a.style.filter=x>.02?`drop-shadow(0 0 ${x*6}px rgba(56,189,248,${x*.38}))`:"none"});const l=document.getElementById("accent-line");if(l){const a=A(Math.max(0,Math.min(1,(o-.32)/.1)));l.style.width=`${a*100}%`,l.style.opacity=String(a)}const m=document.getElementById("hero-tagline");if(m)if(o>=r.s8_touchdown){const a=A(Math.max(0,Math.min(1,(o-r.s8_touchdown)/.04)));m.style.opacity=String(a)}else{const a=A(Math.max(0,Math.min(1,(o-.38)/.1))),d=A(Math.max(0,Math.min(1,(o-.52)/.06)));m.style.opacity=String(a*(1-d))}const c=document.getElementById("hero-desc");if(c)if(o>=r.s8_touchdown){const a=A(Math.max(0,Math.min(1,(o-(r.s8_touchdown+.01))/.04)));c.style.opacity=String(a)}else{const a=A(Math.max(0,Math.min(1,(o-.42)/.1))),d=A(Math.max(0,Math.min(1,(o-.54)/.06)));c.style.opacity=String(a*(1-d))}const v=document.getElementById("panel-cta");if(v){const a=A(Math.max(0,Math.min(1,(o-r.s8_hold)/.015)));v.style.opacity=String(a),v.style.transform=`translateY(${(1-a)*6}px)`,v.style.pointerEvents=a>.5?"auto":"none"}const w=document.getElementById("initial-scroll-cue");if(w)if(o>.26)w.style.display="none";else{w.style.display="flex";const a=Math.max(0,Math.min(1,o/.2));w.style.opacity=String(1-a)}const i=document.getElementById("shot-caption");if(i){let a="";for(const d of r.captions)if(o>=d.t&&o<=d.endT){a=d.text;break}a!==i.textContent&&(i.style.opacity="0",setTimeout(()=>{i.textContent=a,i.style.opacity=a?"1":"0"},150))}const f=document.getElementById("descent-telemetry");if(f)if(o>=r.s7_descent&&o<r.touchdownT){const a=(o-r.s7_descent)/(r.touchdownT-r.s7_descent),d=Math.max(0,280*(1-a)),N=-(.5+a*3.8),x=document.getElementById("telem-alt"),z=document.getElementById("telem-vspd");x&&(x.textContent=`ALT: ${d.toFixed(0).padStart(4)} m`),z&&(z.textContent=`V/S: ${N.toFixed(1).padStart(6)} m/s`);const E=A(Math.max(0,Math.min(1,(o-r.s7_descent)/.02)));f.style.opacity=String(E)}else f.style.opacity="0";const g=document.getElementById("status-line");if(g)if(o>=r.statusLineT){const a=A(Math.max(0,Math.min(1,(o-r.statusLineT)/.015)));g.style.opacity=String(a)}else g.style.opacity="0"}window.addEventListener("wheel",t=>{t.preventDefault(),I+=t.deltaY*38e-5,I=Math.max(0,Math.min(1,I)),Wt()},{passive:!1});let Qt=0;window.addEventListener("touchstart",t=>{Qt=t.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",t=>{const e=Qt-t.touches[0].clientY;Qt=t.touches[0].clientY,I+=e*75e-5,I=Math.max(0,Math.min(1,I)),Wt()},{passive:!0});window.addEventListener("keydown",t=>{if(t.key==="ArrowDown"||t.key==="ArrowRight"){const e=q.find(o=>o.progress>I+.01);e&&(I=e.progress,Wt()),t.preventDefault()}else if(t.key==="ArrowUp"||t.key==="ArrowLeft"){const o=[...q].reverse().find(n=>n.progress<I-.01);o&&(I=o.progress,Wt()),t.preventDefault()}else(t.key==="Enter"||t.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;T.aspect=t/e,T.updateProjectionMatrix(),ot.setSize(t,e),_t.setSize(t,e),oe.resolution.set(t,e)});let ut=[],Ct=2;function Co(t){var e;ut.push(t),ut.length>30&&(ut.shift(),ut.reduce((n,h)=>n+h)/ut.length>22&&Ct>0&&(Ct--,Ct<1&&(oe.enabled=!1),Ct<2&&(H.sunLight.shadow.mapSize.set(512,512),(e=H.sunLight.shadow.map)==null||e.dispose(),H.sunLight.shadow.map=null),ut=[]))}let Ce=!0;document.addEventListener("visibilitychange",()=>{Ce=!document.hidden});const he=new so;function Ue(){if(requestAnimationFrame(Ue),!Ce)return;const t=Math.min(he.getDelta(),.1),e=he.getElapsedTime(),o=performance.now();I+=Nt*t,I=Math.max(0,Math.min(1,I)),Do(t);const n=at;if(n>=r.s6_establishing){const l=Lo(n,T.aspect);T.position.copy(l.pos),It.copy(l.look),T.lookAt(It),T.fov=l.fov,T.updateProjectionMatrix()}else{const{pos:l,look:m,fov:c}=Re(n),v=.06,w=new s(Math.sin(e*.08)*v,Math.cos(e*.055)*(v*.55),0),i=l.clone().add(w);T.position.lerp(i,.055),It.lerp(m,.055),T.lookAt(It),Math.abs(T.fov-c)>.05&&(T.fov=wt.lerp(T.fov,c,.05),T.updateProjectionMatrix())}Ao(n);const h=new io(xo,So,bo);if(n>=.01&&n<r.s4_separation){R.group.visible=!0;const l=Math.max(.001,Math.min(.999,n)),m=h.getPoint(l),c=h.getTangent(l).normalize();R.group.position.copy(m),R.group.quaternion.setFromUnitVectors(new s(0,0,-1),c),R.group.rotateZ(e*.1),R.group.scale.setScalar(1),R.thrusterMat.opacity=.2+Math.sin(e*9)*.1,R.beaconMat.opacity=Math.sin(e*4.2)>.88?.9:0}else if(n>=r.s3_orbit&&n<r.s4_separation){R.group.visible=!0;const l=e*.35,m=new s(J.position.x+Math.cos(l)*4.2,J.position.y+1.8+Math.sin(l*.7)*.5,J.position.z+Math.sin(l)*3.6);R.group.position.copy(m);const c=new s(-Math.sin(l),.15,Math.cos(l)).normalize();R.group.quaternion.setFromUnitVectors(new s(0,0,-1),c),R.group.scale.setScalar(1),R.thrusterMat.opacity=.22+Math.sin(e*9)*.08,R.beaconMat.opacity=Math.sin(e*4)>.88?.9:0}else R.group.visible=!1;const S=r.landerStartT,y=r.landerDescentEnd;if(n<S)P.group.visible=!1,et.visible=!1;else if(n<y){P.group.visible=!0,et.visible=!1;const l=(n-S)/(y-S),m=A(l),c=new s(0,2.6,0),v=me(0);P.group.position.lerpVectors(c,v,A(l));const w=-.28*(1-m)*(1-m);P.group.rotation.set(w,e*.04,0),P.updateLegs(P.group.position,P.group.rotation.y);const i=n>=r.s7_legsOut?1-A((n-r.s7_legsOut)/(y-r.s7_legsOut))*.85:1;P.plumeMat.uniforms.strength.value=i*(.7+Math.sin(e*22)*.3),P.plumeMat.uniforms.time.value=e,P.engineLight.intensity=i*(3.2+Math.sin(e*18)*1),H.blastDecalMat.opacity=i*.65;const f=Math.max(0,Math.min(1,(n-r.s5_transitionDip)/.015)),g=Math.max(0,Math.min(1,(n-(r.s5_transitionDip+.015))/.025)),a=f<1?f:1-g;Ft.uniforms.exposure.value=1-a*.85,P.beaconMat.opacity=Math.sin(e*6)>.75?.9:0}else{P.group.visible=!0;const l=(n-r.touchdownT)/Math.max(.001,1-r.touchdownT),m=.035,c=18,v=m*Math.exp(-.7*c*Math.min(l,1))*Math.cos(c*Math.min(l,.5)),w=me(v);P.group.position.copy(w),P.group.rotation.set(0,.4,0),P.updateLegs(P.group.position,P.group.rotation.y),P.plumeMat.uniforms.strength.value=0,P.engineLight.intensity=0,H.blastDecalMat.opacity=Math.max(0,.65-(n-r.touchdownT)*2);const i=F(0,0);H.bodyContactShadow.position.set(0,i+.004,0),H.bodyContactShadow.material.opacity=.55;const f=Math.min(1,l*2.5);if(f<1&&f>0){et.visible=!0,et.position.copy(P.group.position),et.position.y-=Ie;const g=et.geometry.attributes.position,a=f*2;for(let d=0;d<jt;d++){const N=vt[d*3],x=vt[d*3+1],z=vt[d*3+2];g.setXYZ(d,N*a,x*a-.5*_o*a*a,z*a)}g.needsUpdate=!0,Ve.opacity=Math.max(0,.35*(1-f*f))}else et.visible=!1;P.beaconMat.opacity=Math.sin(e*3.2)>.5?.85:0}if(n>=r.s5_surfaceIn){const l=Math.max(0,Math.min(1,(n-r.s5_surfaceIn)/.08)),m=wt.lerp(1.05,1.38,l);Ft.uniforms.exposure.value=m}Ae.rotation.y+=t*.006,Bt.uniforms.viewPos.value.copy(T.position),ae.uniforms.viewVector.value.copy(T.position),Ee.rotation.y+=t*.011,ze.rotation.y+=t*.016,Te.uniforms.viewPos.value.copy(T.position),Ne.uniforms.viewPos.value.copy(T.position),_e.uniforms.viewPos.value.copy(T.position),H.skyEarthGroup.rotation.y+=t*.01,Ft.uniforms.time.value=e,Io(n),_t.render(),Co(performance.now()-o)}window.__lunaops={setJourney:t=>{I=Math.max(0,Math.min(1,t)),at=I,Ot=0,Nt=0},getJourney:()=>at,visibility:()=>({moonGroup:J.visible,moonOpacity:Bt.uniforms.opacity.value,surfaceGroup:H.group.visible,lander:P.group.visible,orbiter:R.group.visible}),terrainHeight:F,assertVisibility:ke,getFootpadPositions:()=>P.footpads.map(t=>{const e=t.clone();return{world:e,terrainH:F(e.x,e.z),delta:e.y-F(e.x,e.z)}})};te&&ke();Ue();
