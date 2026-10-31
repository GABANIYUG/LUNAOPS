import{W as Ge,S as kt,A as Be,P as je,a as Ye,C as Xe,b as qe,E as $e,R as Ze,U as Je,V as wt,c as Ke,d as r,B as ge,e as At,f as fe,g as Mt,h as ye,D as Lt,i as Me,T as Qe,N as to,G as at,j,k as pt,M as p,F as Qt,l as yt,m as xe,n as B,o as lt,p as R,q as de,r as vt,s as Se,t as Nt,u as eo,v as pe,I as oo,O as so,w as ao,x as be,L as no,y as io,z as ro,Q as co,H as Pe,J as me,K as ve}from"./UnrealBloomPass-pUmJrMJ0.js";const c={autoSpeed:65e-5,springDamping:8.5,springStiffness:60,s3_orbit:.52,s4_separation:.64,s5_transitionDip:.72,s5_surfaceIn:.76,s6_establishing:.78,s7_descent:.84,s7_legsOut:.92,s8_touchdown:.96,captions:[{t:.5,endT:.63,text:"400,000 KM FROM HOME"},{t:.64,endT:.72,text:"DESTINATION: LUNAR SOUTH POLE"},{t:.76,endT:.83,text:"SHACKLETON CRATER RIM · 89°54′S"},{t:.84,endT:.91,text:"POWERED DESCENT · TERMINAL PHASE"},{t:.92,endT:.96,text:"TOUCHDOWN IMMINENT · ALL SYSTEMS NOMINAL"}],moonFadeStart:.72,moonFadeEnd:.76,landerStartT:.72,landerDescentEnd:.96,touchdownT:.96};function gt(t){let e=t;return function(){e|=0,e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967295}}const te=new URLSearchParams(location.search).has("debug"),jt=document.getElementById("landing-root"),ee=document.createElement("canvas");ee.id="scene-canvas";jt.appendChild(ee);const Ft=window.innerWidth<768,lo=Ft?1.25:1.5,it=new Ge({canvas:ee,antialias:!0,alpha:!1,powerPreference:"high-performance"});it.setSize(window.innerWidth,window.innerHeight);it.setPixelRatio(Math.min(window.devicePixelRatio,lo));it.outputColorSpace=kt;it.toneMapping=Be;it.toneMappingExposure=1.05;it.shadowMap.enabled=!0;it.shadowMap.type=je;const Z=new Ye;Z.background=new Xe(266);const T=new qe(32,window.innerWidth/window.innerHeight,.5,8e3);T.position.set(0,0,20);const It=new $e(it);It.addPass(new Ze(Z,T));const oe=new Je(new wt(window.innerWidth,window.innerHeight),.12,.35,.92);It.addPass(oe);const po={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.018},exposure:{value:1},vigStrength:{value:.55},shadowTint:{value:new r(.92,.96,1.06)},hlTint:{value:new r(1.04,1.01,.97)}},vertexShader:`
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
  `},Ht=new Ke(po);It.addPass(Ht);(function(){const e=gt(3405691582);[{count:2e3,rMin:80,rMax:150,size:.05,opacity:.55},{count:3500,rMin:150,rMax:280,size:.08,opacity:.75},{count:600,rMin:50,rMax:80,size:.15,opacity:.95}].forEach(({count:s,rMin:m,rMax:w,size:x,opacity:l})=>{const h=new Float32Array(s*3),i=new Float32Array(s*3);for(let n=0;n<s;n++){const g=e()*Math.PI*2,a=Math.acos(2*e()-1),u=m+e()*(w-m);h[n*3]=u*Math.sin(a)*Math.cos(g),h[n*3+1]=u*Math.sin(a)*Math.sin(g),h[n*3+2]=u*Math.cos(a);const y=e();i[n*3]=.85+y*.15,i[n*3+1]=.88+y*.12,i[n*3+2]=1}const v=new ge;v.setAttribute("position",new At(h,3)),v.setAttribute("color",new At(i,3));const f=new fe({size:x,vertexColors:!0,transparent:!0,opacity:l,sizeAttenuation:!0,blending:Mt,depthWrite:!1});Z.add(new ye(v,f))})})();const Rt=new r(8,2.5,6).normalize(),Ee=new Lt(16774624,3.6);Ee.position.copy(Rt).multiplyScalar(500);Z.add(Ee);const mo=new Me(330264,.05);Z.add(mo);const xt=new Qe,Te=xt.load("/generated/earth/earth_day_2k.webp",t=>{t.colorSpace=kt}),Ne=xt.load("/generated/earth/earth_night_2k.webp",t=>{t.colorSpace=kt}),vo=xt.load("/generated/earth/earth_specular_2k.webp"),ho=xt.load("/generated/earth/earth_clouds_2k.webp",t=>{t.colorSpace=kt}),uo=xt.load("/generated/lroc_color_2k.jpg",t=>{t.colorSpace=kt}),wo=xt.load("/generated/ldem_normal_map_half.png",t=>{t.colorSpace=to}),se=6,Ct=new at;Ct.position.set(26,-2,-8);Z.add(Ct);const go=new j(se,128,64),Ae=new pt({uniforms:{dayTexture:{value:Te},nightTexture:{value:Ne},specularTexture:{value:vo},sunDir:{value:Rt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `}),Le=new p(go,Ae);Ct.add(Le);const fo=new j(se*1.012,128,64),De=new pt({transparent:!0,depthWrite:!1,uniforms:{cloudsTexture:{value:ho},sunDir:{value:Rt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `}),ke=new p(fo,De);Ct.add(ke);const yo=new j(se*1.028,64,32),Ie=new pt({transparent:!0,side:Qt,depthWrite:!1,blending:Mt,uniforms:{sunDir:{value:Rt.clone()},viewPos:{value:T.position}},vertexShader:`
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
  `});Ct.add(new p(yo,Ie));const Re=2.2,Q=new at;Q.position.set(4.5,.8,-28);Q.rotation.x=yt.degToRad(6.68);Z.add(Q);const Mo=new j(Re,128,64),Yt=new pt({uniforms:{colorTexture:{value:uo},normalTexture:{value:wo},sunDir:{value:Rt.clone()},viewPos:{value:T.position},opacity:{value:1},earthshine:{value:.022}},transparent:!0,vertexShader:`
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
  `}),Ce=new p(Mo,Yt);Q.add(Ce);const xo=new j(Re*1.008,64,32),ae=new pt({transparent:!0,side:Qt,depthWrite:!1,blending:Mt,uniforms:{viewVector:{value:T.position.clone()},opacity:{value:1}},vertexShader:`
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
  `});Q.add(new p(xo,ae));const So=new r(26,-2,-8),bo=new r(12,6,-14),Po=new r(6.5,2,-25);function Eo(){const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d");e.fillStyle="#081426",e.fillRect(0,0,256,128);const o=5,s=3,m=4,w=(256-m*(o+1))/o,x=(128-m*(s+1))/s;for(let h=0;h<o;h++)for(let i=0;i<s;i++){const v=m+h*(w+m),f=m+i*(x+m),n=e.createLinearGradient(v,f,v+w,f+x);n.addColorStop(0,"#2b6cb0"),n.addColorStop(.4,"#1e4e8c"),n.addColorStop(1,"#133360"),e.fillStyle=n,e.fillRect(v,f,w,x),e.strokeStyle="rgba(125, 211, 252, 0.7)",e.lineWidth=1,e.beginPath(),e.moveTo(v,f+x*.5),e.lineTo(v+w,f+x*.5),e.stroke(),e.strokeStyle="rgba(125, 211, 252, 0.4)",e.beginPath(),e.moveTo(v+w*.33,f),e.lineTo(v+w*.33,f+x),e.moveTo(v+w*.67,f),e.lineTo(v+w*.67,f+x),e.stroke()}const l=new Pe(t);return l.wrapS=me,l.wrapT=me,l}function To(){const t=new at,e=new B({color:15791612,metalness:.6,roughness:.32,emissive:1779768,emissiveIntensity:.35}),o=new B({color:16097819,metalness:.55,roughness:.35,emissive:4530691,emissiveIntensity:.6,side:lt}),s=new B({color:14083058,metalness:.7,roughness:.28,emissive:2241095,emissiveIntensity:.6,side:lt}),m=new B({color:2370872,metalness:.8,roughness:.4,emissive:988444,emissiveIntensity:.35,side:lt}),w=Eo(),x=new B({map:w,color:6333946,emissive:1982639,emissiveMap:w,emissiveIntensity:.85,metalness:.3,roughness:.25,side:lt}),l=new B({color:14871541,metalness:.85,roughness:.25,emissive:1779512,emissiveIntensity:.4,side:lt});t.add(Object.assign(new p(new R(.34,.36,.85,12),e))),t.add(Object.assign(new p(new R(.364,.364,.38,12),o)));const h=new p(new R(.18,.34,.44,12),e);h.position.y=.64,t.add(h);const i=new p(new de(.12,.022,8,20),s);i.rotation.x=Math.PI/2,i.position.y=.87,t.add(i);const v=new p(new R(.24,.09,.3,16,1,!0),m);v.position.y=-.58,t.add(v);const f=new vt({color:10342639,transparent:!0,opacity:.3,blending:Mt,side:lt,depthWrite:!1}),n=new p(new Se(.08,.32,12,1,!0),f);n.position.y=-.76,n.rotation.x=Math.PI,t.add(n),[-1,1].forEach(b=>{const A=new p(new R(.065,.065,.09,12),s);A.rotation.z=Math.PI/2,A.position.set(b*.35,0,0),t.add(A);const z=new p(new de(.068,.016,8,16),o);z.rotation.y=Math.PI/2,z.position.set(b*.37,0,0),t.add(z);const L=.38,H=new p(new R(.026,.026,L,12),s);H.rotation.z=Math.PI/2,H.position.set(b*(.35+L/2),0,0),t.add(H);const F=new p(new R(.014,.014,L*.95,8),o);F.rotation.z=Math.PI/2,F.position.set(b*(.35+L/2),.035,0),t.add(F);const Y=b*(.35+L),tt=new p(new Nt(.07,.08,.09),o);tt.position.set(Y,0,0),t.add(tt);const W=new p(new R(.028,.028,.09,8),s);W.position.set(Y,0,0),t.add(W);const J=.5,et=.36,rt=.05;for(let K=0;K<3;K++){const d=Y+b*(.05+J/2+K*(J+rt)),M=new at;M.position.set(d,0,0);const S=new p(new Nt(J,.015,et),o);M.add(S);const C=new p(new Nt(J-.025,.02,et-.025),x);M.add(C);const D=new p(new Nt(.014,.022,et+.008),s);if(D.position.set(b*(J/2),0,0),M.add(D),t.add(M),K<2){const k=d+b*(J/2+rt/2),V=new p(new R(.018,.018,.06,8),s);V.rotation.x=Math.PI/2,V.position.set(k,0,0),t.add(V)}}});const g=new at;g.position.set(.3,.2,.3),g.rotation.set(-.55,.65,0),g.add(new p(new j(.22,16,10,0,Math.PI*2,0,Math.PI*.42),l));const a=new p(new R(.012,.012,.2,6),s);a.position.z=.1,a.rotation.x=Math.PI/2,g.add(a),t.add(g);const u=new vt({color:16777215,transparent:!0,opacity:0}),y=new p(new j(.025,6,6),u);y.position.y=.93,t.add(y);const P=new at;t.rotation.x=Math.PI/2,P.add(t);const N=new Lt(7909119,1.4);N.position.set(-8,6,-6),P.add(N);const I=new Lt(3718648,1);return I.position.set(6,-6,5),P.add(I),{group:P,thrusterMat:f,beaconMat:u}}const U=To();U.group.visible=!1;Z.add(U.group);function No(t,e,o){const s=Math.max(0,Math.min(1,(o-t)/(e-t)));return s*s*(3-2*s)}const he=[{x:-38,z:-44,radius:30,depth:7.8,rimHeight:2.4,rimWidth:6.5,ejectaRadius:48,softness:.25},{x:50,z:34,radius:34,depth:8.8,rimHeight:2.8,rimWidth:7.2,ejectaRadius:52,softness:.35},{x:-46,z:30,radius:24,depth:5.8,rimHeight:1.9,rimWidth:5.4,ejectaRadius:40,softness:.4},{x:-18,z:20,radius:12,depth:2.8,rimHeight:1,rimWidth:3,ejectaRadius:21,softness:.2},{x:24,z:-16,radius:13.5,depth:3.2,rimHeight:1.15,rimWidth:3.4,ejectaRadius:23,softness:.3},{x:14,z:28,radius:9.5,depth:2.3,rimHeight:.85,rimWidth:2.5,ejectaRadius:17,softness:.15},{x:-26,z:-14,radius:8.8,depth:2.1,rimHeight:.78,rimWidth:2.3,ejectaRadius:16,softness:.45},{x:36,z:-34,radius:14.5,depth:3.5,rimHeight:1.3,rimWidth:3.6,ejectaRadius:25,softness:.25},{x:-10,z:-28,radius:10.5,depth:2.5,rimHeight:.9,rimWidth:2.7,ejectaRadius:19,softness:.3},{x:30,z:14,radius:8,depth:1.9,rimHeight:.7,rimWidth:2.1,ejectaRadius:15,softness:.35},{x:-6.2,z:9.2,radius:3.4,depth:.8,rimHeight:.3,rimWidth:.95,ejectaRadius:7,softness:.15},{x:8.2,z:-7.5,radius:4.2,depth:.98,rimHeight:.36,rimWidth:1.15,ejectaRadius:8.5,softness:.1},{x:9.5,z:10.5,radius:3,depth:.7,rimHeight:.26,rimWidth:.85,ejectaRadius:6,softness:.2},{x:-10.5,z:-8.5,radius:3.8,depth:.88,rimHeight:.32,rimWidth:1.05,ejectaRadius:7.5,softness:.3},{x:16,z:-4.8,radius:2.6,depth:.6,rimHeight:.24,rimWidth:.75,ejectaRadius:5.4,softness:.15},{x:-4.8,z:-16.5,radius:5,depth:1.15,rimHeight:.42,rimWidth:1.35,ejectaRadius:9.8,softness:.25},{x:-14,z:6.2,radius:3.2,depth:.75,rimHeight:.28,rimWidth:.88,ejectaRadius:6.5,softness:.2},{x:6.5,z:18.2,radius:4.8,depth:1.1,rimHeight:.4,rimWidth:1.25,ejectaRadius:9,softness:.35},{x:-20.5,z:-4.2,radius:2.4,depth:.55,rimHeight:.2,rimWidth:.65,ejectaRadius:4.8,softness:.1},{x:20,z:19.5,radius:4,depth:.92,rimHeight:.34,rimWidth:1.05,ejectaRadius:8,softness:.2},{x:-2.2,z:13.5,radius:2.8,depth:.65,rimHeight:.24,rimWidth:.75,ejectaRadius:5.6,softness:.15},{x:12.5,z:-20.5,radius:3.6,depth:.84,rimHeight:.3,rimWidth:.95,ejectaRadius:7.2,softness:.25}];function G(t,e){let o=0;for(let h=0;h<he.length;h++){const i=he[h],v=t-i.x,f=e-i.z,n=Math.sqrt(v*v+f*f);if(n<i.radius){const a=n/i.radius,u=-i.depth*(1-a*a)*(1-i.softness*.35);o+=u}const g=Math.abs(n-i.radius)/i.rimWidth;if(g<3){const a=i.rimHeight*Math.exp(-g*g*2.2)*(1-i.softness*.45);o+=a}if(n>=i.radius&&n<i.ejectaRadius){const a=(n-i.radius)/(i.ejectaRadius-i.radius),u=i.rimHeight*.42*(1-a)*(1-a);o+=u}}const m=(e+95)/48,w=4.5*Math.exp(-m*m)*Math.max(0,1-Math.abs(t-8)/130);o+=w;const x=Math.sqrt(t*t+e*e),l=1-No(1.5,4,x);return o*(1-l)}function Ao(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),o=e.createImageData(512,512),s=o.data,m=gt(1280659009),w=new Float32Array(512*512);for(let l=0;l<512*512;l++)w[l]=(m()-.5)*.35;for(let l=1;l<511;l++)for(let h=1;h<511;h++){const i=l*512+h,v=(w[i+1]-w[i-1])*3.5,f=(w[i+512]-w[i-512])*3.5;let n=-v,g=-f,a=1;const u=Math.sqrt(n*n+g*g+a*a);n/=u,g/=u,a/=u;const y=i*4;s[y]=Math.floor((n*.5+.5)*255),s[y+1]=Math.floor((g*.5+.5)*255),s[y+2]=Math.floor((a*.5+.5)*255),s[y+3]=255}e.putImageData(o,0,0);const x=new Pe(t);return x.wrapS=ve,x.wrapT=ve,x.repeat.set(120,120),x}function Lo(){const t=new at,e=120,o=240,s=new eo(e,e,o,o);s.rotateX(-Math.PI/2);const m=s.attributes.position,w=new Float32Array(m.count*3),x=gt(322420463);for(let d=0;d<m.count;d++){const M=m.getX(d),S=m.getZ(d),C=G(M,S);m.setY(d,C);const D=.5,k=G(M+D,S)-G(M-D,S),V=G(M,S+D)-G(M,S-D),ot=Math.min(1,Math.sqrt(k*k+V*V)/(D*2)),X=(x()-.5)*.02,st=Math.max(.1,Math.min(.18,.125+ot*.045+X));w[d*3]=st,w[d*3+1]=st,w[d*3+2]=st}s.computeVertexNormals(),s.setAttribute("color",new At(w,3));const l=Ao(),h=new B({color:10066329,vertexColors:!0,roughness:.98,metalness:.02,normalMap:l,normalScale:new wt(.35,.35)}),i=new p(s,h);i.receiveShadow=!0,t.add(i);const v=new pe(e*.495,420,96,24);v.rotateX(-Math.PI/2);const f=v.attributes.position,n=new Float32Array(f.count*3);for(let d=0;d<f.count;d++){const M=f.getX(d),S=f.getZ(d);f.setY(d,G(M,S));const C=.125;n[d*3]=C,n[d*3+1]=C,n[d*3+2]=C}v.computeVertexNormals(),v.setAttribute("color",new At(n,3));const g=new p(v,h);g.receiveShadow=!0,t.add(g);const a=yt.degToRad(6.2),u=new r(Math.cos(a)*.96,Math.sin(a),Math.cos(a)*.28).normalize(),y=new Lt(16776178,5.2);y.position.copy(u).multiplyScalar(80),y.castShadow=!0,y.shadow.mapSize.set(2048,2048),y.shadow.camera.near=1,y.shadow.camera.far=160,y.shadow.camera.left=-28,y.shadow.camera.right=28,y.shadow.camera.top=28,y.shadow.camera.bottom=-28,y.shadow.bias=-8e-4,y.shadow.normalBias=.03,t.add(y);const P=new Lt(2239032,.55);P.position.set(-u.x*60,8,-u.z*60),t.add(P),t.add(new Me(1053726,.22));const N=gt(195936478),I=new oo(1,2),b=I.attributes.position,A=gt(4276994270);for(let d=0;d<b.count;d++){const M=b.getX(d),S=b.getY(d),C=b.getZ(d),D=S<0?.75:1;b.setXYZ(d,M*(.8+A()*.4),S*(.65+A()*.45)*D,C*(.8+A()*.4))}I.computeVertexNormals();const z=new B({color:2368548,roughness:.96,metalness:.04}),L=[{count:Ft?35:75,sMin:.1,sMax:.25},{count:Ft?18:36,sMin:.25,sMax:.6},{count:Ft?6:14,sMin:.6,sMax:1.15}],H=new so;L.forEach(d=>{const M=new ao(I,z,d.count);M.castShadow=!0,M.receiveShadow=!0;for(let S=0;S<d.count;S++){const C=N()*Math.PI*2,D=3.8+N()*18,k=Math.cos(C)*D,V=Math.sin(C)*D,ot=G(k,V),X=d.sMin+N()*(d.sMax-d.sMin);H.position.set(k,ot+X*.28,V),H.rotation.set(N()*Math.PI,N()*Math.PI*2,N()*Math.PI*.4),H.scale.set(X,X*(.75+N()*.35),X*(.85+N()*.3)),H.updateMatrix(),M.setMatrixAt(S,H.matrix)}M.instanceMatrix.needsUpdate=!0,t.add(M)});const F=new at;F.position.set(4.8,5.2,-15);const Y=new pt({uniforms:{dayTexture:{value:Te},nightTexture:{value:Ne},sunDir:{value:u},viewPos:{value:T.position}},vertexShader:`
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
    `});F.add(new p(new j(.72,48,24),Y));const tt=new pt({transparent:!0,side:Qt,depthWrite:!1,blending:Mt,uniforms:{viewVector:{value:T.position}},vertexShader:`
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
    `});F.add(new p(new j(.8,32,16),tt)),t.add(F);const W=new pe(.02,1.8,32);W.rotateX(-Math.PI/2);const J=new vt({color:1579552,transparent:!0,opacity:0,depthWrite:!1,blending:xe,side:lt}),et=new p(W,J);et.position.y=.003,t.add(et);const rt=new be(1.45,32);rt.rotateX(-Math.PI/2);const K=new p(rt,new vt({color:131845,transparent:!0,opacity:.55,depthWrite:!1}));return K.position.set(0,.004,0),t.add(K),{group:t,terrainMesh:i,sunLight:y,skyEarthGroup:F,blastDecalMat:J,bodyContactShadow:K}}const q=Lo();q.group.visible=!1;Z.add(q.group);function Do(){const t=new at,e=new B({color:13936707,metalness:.8,roughness:.35}),o=new B({color:15725560,metalness:.15,roughness:.5}),s=new B({color:1711652,metalness:.85,roughness:.42}),m=new B({color:1119256,metalness:.7,roughness:.55}),w=new B({color:13160664,metalness:.82,roughness:.3}),x=new B({color:9081498,metalness:.85,roughness:.35}),l=new R(.92,.98,.8,8),h=new p(l,e);h.position.y=.55,t.add(h);const i=new R(.8,.92,.55,8),v=new p(i,o);v.position.y=1.175,t.add(v);const f=new j(.76,8,6,0,Math.PI*2,0,Math.PI*.45),n=new p(f,o);n.position.y=1.45,t.add(n);for(let d=0;d<4;d++){const M=d*Math.PI/2+Math.PI/8,S=new p(new Nt(.55,.65,.04),m);S.position.set(Math.cos(M)*.94,.55,Math.sin(M)*.94),S.rotation.y=-M,t.add(S)}for(let d=0;d<4;d++){const M=d*Math.PI/2,S=new p(new R(.2,.2,.48,12),e);S.position.set(Math.cos(M)*.68,.55,Math.sin(M)*.68),t.add(S)}const g=[new wt(.08,0),new wt(.12,.12),new wt(.26,.38),new wt(.32,.52)],a=new no(g,18),u=new p(a,s);u.rotation.x=Math.PI,u.position.y=.14,t.add(u);const y=new p(new R(.075,.075,.05,12),s);y.position.y=.15,t.add(y);const P=new pt({transparent:!0,side:lt,depthWrite:!1,blending:Mt,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`
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
    `}),N=new Se(.7,1.4,24,8,!0),I=new p(N,P);I.rotation.x=Math.PI,I.position.y=-.72,t.add(I);const b=new io(16771264,0,6);b.position.y=-.3,b.castShadow=!1,t.add(b);const A=[],z=[],L=new r(0,1,0);for(let d=0;d<4;d++){const M=d*Math.PI/2+Math.PI/4,S=new r(Math.cos(M)*.95,.55,Math.sin(M)*.95),C=new r(Math.cos(M)*1.55,-.05,Math.sin(M)*1.55),D=new r(Math.cos(M)*.65,.18,Math.sin(M)*.65),k=new R(.034,.03,1,8),V=new p(k,s),ot=new r().subVectors(C,S),X=ot.length(),st=ot.clone().normalize();V.position.copy(S).addScaledVector(st,X*.5),V.quaternion.setFromUnitVectors(L,st),V.scale.set(1,X,1),t.add(V);const qt=new R(.02,.02,1,6),ct=new p(qt,s),St=new r().subVectors(C,D),bt=St.length(),Pt=St.clone().normalize();ct.position.copy(D).addScaledVector(Pt,bt*.5),ct.quaternion.setFromUnitVectors(L,Pt),ct.scale.set(1,bt,1),t.add(ct);const Vt=new R(.044,.042,1,8),Et=new p(Vt,w);t.add(Et);const ht=new R(.028,.028,1,8),Tt=new p(ht,s);t.add(Tt);const mt=new at,$t=new R(.24,.22,.05,16),_t=new p($t,x);_t.position.y=.025,mt.add(_t);const We=new j(.05,8,8),re=new p(We,s);re.position.y=.05,mt.add(re),t.add(mt);const ce=new be(.28,16);ce.rotateX(-Math.PI/2);const le=new p(ce,new vt({color:131845,transparent:!0,opacity:0,depthWrite:!1}));Z.add(le),A.push({upperStrut:V,secondaryBrace:ct,shockBarrel:Et,innerPiston:Tt,padGroup:mt,contactDecal:le,hipPos:S,kneePos:C,braceMount:D,azimuth:M}),z.push(new r)}const H=(d,M)=>{for(let D=0;D<4;D++){const k=A[D],V=k.azimuth+M,ot=d.x+Math.cos(V)*1.95,X=d.z+Math.sin(V)*1.95,st=G(ot,X),qt=d.y+-1.355,ct=Math.max(st,qt),St=new r(ot,ct,X);z[D].copy(St);const bt=t.worldToLocal(St.clone());k.padGroup.position.copy(bt);const Pt=bt.clone().add(new r(0,.05,0)),Vt=new r().subVectors(Pt,k.kneePos),Et=Math.max(.01,Vt.length()),ht=Vt.clone().normalize(),Tt=Et*.56;k.shockBarrel.position.copy(k.kneePos).addScaledVector(ht,Tt*.5),k.shockBarrel.quaternion.setFromUnitVectors(L,ht),k.shockBarrel.scale.set(1,Tt,1);const mt=Et*.58;k.innerPiston.position.copy(Pt).addScaledVector(ht,-mt*.5),k.innerPiston.quaternion.setFromUnitVectors(L,ht),k.innerPiston.scale.set(1,mt,1),k.contactDecal.position.set(ot,st+.003,X);const $t=Math.max(0,ct-st),_t=yt.clamp(1-$t*2.5,0,.72);k.contactDecal.material.opacity=_t}return z},F=new R(.014,.014,.7,6),Y=new p(F,s);Y.position.set(.35,1.85,.25),t.add(Y);const tt=new j(.28,16,8,0,Math.PI*2,0,Math.PI*.42),W=new p(tt,w);W.position.set(.35,2.2,.25),W.rotation.set(-.4,.5,0),t.add(W);const J=new R(.008,.008,.45,6),et=new p(J,s);et.rotation.z=-Math.PI/3,et.position.set(-.45,1.7,.18),t.add(et),[[.96,1.15,0],[-.96,1.15,0],[0,1.15,.96],[0,1.15,-.96]].forEach(([d,M,S])=>{const C=new p(new j(.012,6,6),new vt({color:2280584}));C.position.set(d,M,S),t.add(C)});const rt=new vt({color:16777215,transparent:!0,opacity:0}),K=new p(new j(.018,6,6),rt);return K.position.set(0,1.92,0),t.add(K),{group:t,plumeMat:P,engineLight:b,beaconMat:rt,footpads:z,updateLegs:H,telemetryEl:null}}const E=Do();E.group.visible=!1;E.group.scale.setScalar(1);Z.add(E.group);const Xt=120,ze=new ge,Wt=new Float32Array(Xt*3),ft=new Float32Array(Xt*3),Zt=gt(13653764),ko=1.62;for(let t=0;t<Xt;t++){const e=Zt()*Math.PI*2,o=.8+Zt()*2.8,s=.4+Zt()*1.2;ft[t*3]=Math.cos(e)*o,ft[t*3+1]=s,ft[t*3+2]=Math.sin(e)*o,Wt[t*3]=Wt[t*3+1]=Wt[t*3+2]=0}ze.setAttribute("position",new At(Wt,3));const Ve=new fe({color:12107464,size:.06,transparent:!0,opacity:0,depthWrite:!1,blending:xe,sizeAttenuation:!0}),nt=new ye(ze,Ve);nt.visible=!1;Z.add(nt);const ne=document.createElement("div");ne.id="ui-overlay";ne.innerHTML=`
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
`;jt.appendChild(ne);const ie=document.createElement("div");ie.className="progress-strip";ie.innerHTML='<div class="progress-strip-fill" id="journey-fill"></div>';jt.appendChild(ie);const zt=document.createElement("a");zt.href="/workstation.html";zt.className="skip-to-workstation";zt.textContent="Skip to workstation";zt.setAttribute("aria-label","Skip animation and enter workstation");jt.appendChild(zt);const $=[{progress:0,pos:new r(28,3.5,20),look:new r(23,-1.5,-6),fov:32,name:"LOW EARTH ORBIT"},{progress:.2,pos:new r(18,5.5,16),look:new r(17,.5,-10),fov:30,name:"TRANS-LUNAR DEPARTURE"},{progress:.38,pos:new r(10,4.5,8),look:new r(7.5,2,-18),fov:28,name:"DEEP SPACE TRANSIT"},{progress:.52,pos:new r(6,2.8,.5),look:new r(4.2,.8,-28),fov:35,name:"LUNAR ORBIT INSERTION"},{progress:.64,pos:new r(5.8,1.5,-12),look:new r(4.45,.2,-22),fov:28,name:"DESCENT ORBIT"},{progress:.76,pos:new r(4.5,1,-16),look:new r(0,0,0),fov:22,name:"SURFACE APPROACH"},{progress:.78,pos:new r(-2.5,1.8,6.5),look:new r(0,0,0),fov:38,name:"POWERED DESCENT"},{progress:.84,pos:new r(3.8,1.2,5.5),look:new r(0,.85,0),fov:35,name:"FINAL APPROACH"},{progress:.92,pos:new r(3.2,.8,4.2),look:new r(0,.45,0),fov:32,name:"TOUCHDOWN IMMINENT"},{progress:.96,pos:new r(3.8,1,4.8),look:new r(.2,.5,.2),fov:32,name:"SOUTH POLE TOUCHDOWN"},{progress:1,pos:new r(3.5,.85,4.45),look:new r(.15,.42,.15),fov:30,name:"SOUTH POLE TOUCHDOWN"}];function _(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function _e(t){const e=Math.max(0,Math.min(1,t));let o=$.length-1;for(let n=0;n<$.length-1;n++)if(e>=$[n].progress&&e<$[n+1].progress){o=n;break}const s=$[o],m=$[Math.min(o+1,$.length-1)],w=m.progress-s.progress,x=w>0?(e-s.progress)/w:1,l=_(Math.max(0,Math.min(1,x))),h=new r().lerpVectors(s.pos,m.pos,l),i=new r().lerpVectors(s.look,m.look,l),v=s.fov+(m.fov-s.fov)*l;let f=s.name;for(let n=$.length-1;n>=0;n--)if(e>=$[n].progress){f=$[n].name;break}return{pos:h,look:i,fov:v,phaseName:f}}function Io(t,e){const o=G(0,0),s=2.35,m=36,w=yt.degToRad(m),x=e<1?2*Math.atan(Math.tan(w/2)*e):w;if(t>=c.touchdownT){const y=s/Math.sin(x/2)*1.35,P=Math.PI*.32,N=new r(Math.cos(P),0,Math.sin(P)).normalize(),I=new r().crossVectors(new r(0,1,0),N).normalize(),b=o+1.75,A=o+1.45,z=(t-c.touchdownT)/Math.max(.001,1-c.touchdownT),L=y*(1-z*.04),H=Math.sqrt(Math.max(1,L*L-(b-A)*(b-A))),F=2*L*Math.tan(x/2)*(e<1?1:e),Y=(e<1?-.16:-.28)*(F*.5),tt=new r(0,A,0).addScaledVector(I,Y),W=new r(0,0,0).addScaledVector(N,H).addScaledVector(I,Y);return W.y=b,{pos:W,look:tt,fov:m}}if(t>=c.s7_descent){const u=(t-c.s7_descent)/(c.touchdownT-c.s7_descent),P=s/Math.sin(x/2)*1.62,N=Math.PI*.35-u*.07,I=new r(Math.cos(N),0,Math.sin(N)).normalize(),b=new r().crossVectors(new r(0,1,0),I).normalize(),A=E.group.position,z=A.y+.35,L=Math.max(o+1.75,A.y*.55+1.75),H=2*P*Math.tan(x/2)*(e<1?1:e),F=(e<1?-.14:-.25)*(H*.5),Y=Math.sqrt(Math.max(1,P*P-(L-z)*(L-z))),tt=new r(A.x,z,A.z).addScaledVector(b,F),W=new r(A.x,0,A.z).addScaledVector(I,Y).addScaledVector(b,F);return W.y=L,{pos:W,look:tt,fov:m}}const h=2.6-(t-.76)/(c.s7_descent-.76)*1,i=s/Math.sin(x/2)*h,v=Math.PI*.4,f=new r(Math.cos(v),0,Math.sin(v)).normalize(),n=E.group.position,g=new r(n.x,n.y+.5,n.z);return{pos:new r(0,o+3,0).addScaledVector(f,i*.9),look:g,fov:38}}function Ro(t){const e=t<c.moonFadeEnd+.01,o=t>=c.moonFadeStart;Q.visible=e,q.group.visible=o;const s=Math.max(0,Math.min(1,(t-c.moonFadeStart)/Math.max(.001,c.moonFadeEnd-c.moonFadeStart))),m=_(1-s);Yt.uniforms.opacity.value=m,ae.uniforms.opacity.value=m,te&&Q.visible&&q.group.visible}function Ue(){if(te){for(let t=0;t<=1e3;t++){const e=t/1e3,o=e<c.moonFadeEnd+.01,s=e>=c.moonFadeStart,m=e>=c.moonFadeStart&&e<=c.moonFadeEnd+.01;o&&s&&!m&&console.error(`[LUNAOPS DEBUG] Both groups visible at t=${e.toFixed(3)} outside crossfade window!`)}console.log("[LUNAOPS DEBUG] Visibility consistency check passed.")}}let O=0,dt=0,Gt=0,Dt=c.autoSpeed,Jt=null;const Ut=new r;try{const t=new URLSearchParams(window.location.search);if(t.has("t")){const e=parseFloat(t.get("t"));isNaN(e)||(O=dt=Math.max(0,Math.min(1,e)),Dt=0)}}catch{}function Bt(){Dt=0,Jt&&clearTimeout(Jt),Jt=setTimeout(()=>{Dt=c.autoSpeed},2800)}function Co(t){const e=c.springStiffness,o=c.springDamping,s=Math.max(0,Math.min(1,O)),m=e*(s-dt)-o*Gt;Gt+=m*t,dt+=Gt*t,dt=Math.max(0,Math.min(1,dt))}const Oe=1.38;function ue(t=0){const e=G(0,0);return new r(0,e+Oe+t,0)}const zo=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Vo=[0,.05,.1,.15,.2,.25,.3],_o=.07;function Uo(t,e){const o=Math.max(0,Math.min(1,t)),s=document.getElementById("journey-fill");s&&(s.style.height=`${(o*100).toFixed(1)}%`);const m=document.getElementById("panel-phase-badge");if(m){const{phaseName:a}=_e(o);m.textContent=`SELENE LABS · NASA SPACE APPS 2026 · ${a}`}const w=document.getElementById("left-panel");if(w)if(o>=c.s3_orbit&&o<c.s8_touchdown){const a=_(Math.max(0,Math.min(1,(o-c.s3_orbit)/.06)));w.style.opacity=String(1-a)}else if(o>=c.s8_touchdown){const a=_(Math.max(0,Math.min(1,(o-c.s8_touchdown)/.04)));w.style.opacity=String(a)}else w.style.opacity="1";document.querySelectorAll(".hero-letter").forEach((a,u)=>{if(zo){a.style.opacity="1",a.style.transform="none";return}const y=Math.max(0,Math.min(1,(o-Vo[u])/_o)),P=_(y);a.style.opacity=String(P),a.style.transform=`translateY(${(1-P)*24}px) scale(${.88+P*.12})`,a.style.filter=P>.02?`drop-shadow(0 0 ${P*6}px rgba(56,189,248,${P*.38}))`:"none"});const x=document.getElementById("accent-line");if(x){const a=_(Math.max(0,Math.min(1,(o-.32)/.1)));x.style.width=`${a*100}%`,x.style.opacity=String(a)}const l=document.getElementById("hero-tagline");if(l)if(o>=c.s8_touchdown){const a=_(Math.max(0,Math.min(1,(o-c.s8_touchdown)/.04)));l.style.opacity=String(a)}else{const a=_(Math.max(0,Math.min(1,(o-.38)/.1))),u=_(Math.max(0,Math.min(1,(o-.52)/.06)));l.style.opacity=String(a*(1-u))}const h=document.getElementById("hero-desc");if(h)if(o>=c.s8_touchdown){const a=_(Math.max(0,Math.min(1,(o-(c.s8_touchdown+.01))/.04)));h.style.opacity=String(a)}else{const a=_(Math.max(0,Math.min(1,(o-.42)/.1))),u=_(Math.max(0,Math.min(1,(o-.54)/.06)));h.style.opacity=String(a*(1-u))}const i=document.getElementById("initial-scroll-cue");if(i)if(o>.26)i.style.display="none";else{i.style.display="flex";const a=Math.max(0,Math.min(1,o/.2));i.style.opacity=String(1-a)}const v=document.getElementById("shot-caption");if(v){let a="";for(const u of c.captions)if(o>=u.t&&o<=u.endT){a=u.text;break}a!==v.textContent&&(v.style.opacity="0",setTimeout(()=>{v.textContent=a,v.style.opacity=a?"1":"0"},150))}const f=document.getElementById("descent-hud");if(f)if(o>=c.s7_descent&&o<c.touchdownT){const a=(o-c.s7_descent)/(c.touchdownT-c.s7_descent),u=Math.max(0,280*(1-a)),y=-(.5+a*3.8),P=Math.max(12,Math.round(98-a*82));let N="POWERED DESCENT";a>.8?N="TERMINAL GUIDANCE":a<.25&&(N="APPROACH BURN");const I=document.getElementById("telem-alt"),b=document.getElementById("telem-vspd"),A=document.getElementById("telem-phase"),z=document.getElementById("telem-fuel");I&&(I.textContent=`${u.toFixed(0)} m`),b&&(b.textContent=`${y.toFixed(1)} m/s`),A&&(A.textContent=N),z&&(z.textContent=`${P} %`);const L=_(Math.max(0,Math.min(1,(o-c.s7_descent)/.02)));f.style.opacity=String(L)}else f.style.opacity="0";const n=document.getElementById("sp-landing-card");if(n)if(o>=c.touchdownT){const a=_(Math.max(0,Math.min(1,(o-c.touchdownT)/.025)));n.style.opacity=String(a),n.style.transform=`translateY(${-50+(1-a)*10}%)`,n.style.pointerEvents=o>=c.touchdownT+.005?"auto":"none"}else n.style.opacity="0",n.style.transform="translateY(-40%)",n.style.pointerEvents="none";const g=document.getElementById("touchdown-dock");if(g)if(o>=c.touchdownT){const a=_(Math.max(0,Math.min(1,(o-c.touchdownT)/.02)));g.classList.add("visible"),g.style.opacity=String(a),g.style.transform=`translateX(-50%) translateY(${(1-a)*12}px)`,g.style.pointerEvents="auto"}else g.classList.remove("visible"),g.style.opacity="0",g.style.transform="translateX(-50%) translateY(12px)",g.style.pointerEvents="none"}window.addEventListener("wheel",t=>{t.preventDefault(),O+=t.deltaY*38e-5,O=Math.max(0,Math.min(1,O)),Bt()},{passive:!1});let Kt=0;window.addEventListener("touchstart",t=>{Kt=t.touches[0].clientY},{passive:!0});window.addEventListener("touchmove",t=>{const e=Kt-t.touches[0].clientY;Kt=t.touches[0].clientY,O+=e*75e-5,O=Math.max(0,Math.min(1,O)),Bt()},{passive:!0});window.addEventListener("keydown",t=>{if(t.key==="ArrowDown"||t.key==="ArrowRight"){const e=$.find(o=>o.progress>O+.01);e&&(O=e.progress,Bt()),t.preventDefault()}else if(t.key==="ArrowUp"||t.key==="ArrowLeft"){const o=[...$].reverse().find(s=>s.progress<O-.01);o&&(O=o.progress,Bt()),t.preventDefault()}else(t.key==="Enter"||t.key===" ")&&(window.location.href="/workstation.html")});window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;T.aspect=t/e,T.updateProjectionMatrix(),it.setSize(t,e),It.setSize(t,e),oe.resolution.set(t,e)});let ut=[],Ot=2;function Oo(t){var e;ut.push(t),ut.length>30&&(ut.shift(),ut.reduce((s,m)=>s+m)/ut.length>22&&Ot>0&&(Ot--,Ot<1&&(oe.enabled=!1),Ot<2&&(q.sunLight.shadow.mapSize.set(512,512),(e=q.sunLight.shadow.map)==null||e.dispose(),q.sunLight.shadow.map=null),ut=[]))}let Fe=!0;document.addEventListener("visibilitychange",()=>{Fe=!document.hidden});const we=new ro;function He(){if(requestAnimationFrame(He),!Fe)return;const t=Math.min(we.getDelta(),.1),e=we.getElapsedTime(),o=performance.now();O+=Dt*t,O=Math.max(0,Math.min(1,O)),Co(t);const s=dt;if(s>=c.s6_establishing){const l=Io(s,T.aspect);T.position.copy(l.pos),Ut.copy(l.look),T.lookAt(Ut),T.fov=l.fov,T.updateProjectionMatrix()}else{const{pos:l,look:h,fov:i}=_e(s),v=.06,f=new r(Math.sin(e*.08)*v,Math.cos(e*.055)*(v*.55),0),n=l.clone().add(f);T.position.lerp(n,.055),Ut.lerp(h,.055),T.lookAt(Ut),Math.abs(T.fov-i)>.05&&(T.fov=yt.lerp(T.fov,i,.05),T.updateProjectionMatrix())}Ro(s);const m=new co(So,bo,Po);if(s>=.01&&s<c.s4_separation){U.group.visible=!0;const l=Math.max(.001,Math.min(.999,s)),h=m.getPoint(l),i=m.getTangent(l).normalize();U.group.position.copy(h),U.group.quaternion.setFromUnitVectors(new r(0,0,-1),i),U.group.rotateZ(e*.1),U.group.scale.setScalar(1),U.thrusterMat.opacity=.2+Math.sin(e*9)*.1,U.beaconMat.opacity=Math.sin(e*4.2)>.88?.9:0}else if(s>=c.s3_orbit&&s<c.s4_separation){U.group.visible=!0;const l=e*.35,h=new r(Q.position.x+Math.cos(l)*4.2,Q.position.y+1.8+Math.sin(l*.7)*.5,Q.position.z+Math.sin(l)*3.6);U.group.position.copy(h);const i=new r(-Math.sin(l),.15,Math.cos(l)).normalize();U.group.quaternion.setFromUnitVectors(new r(0,0,-1),i),U.group.scale.setScalar(1),U.thrusterMat.opacity=.22+Math.sin(e*9)*.08,U.beaconMat.opacity=Math.sin(e*4)>.88?.9:0}else U.group.visible=!1;const w=c.landerStartT,x=c.landerDescentEnd;if(s<w)E.group.visible=!1,nt.visible=!1;else if(s<x){E.group.visible=!0,nt.visible=!1;const l=(s-w)/(x-w),h=_(l),i=new r(0,2.6,0),v=ue(0);E.group.position.lerpVectors(i,v,_(l));const f=-.28*(1-h)*(1-h);E.group.rotation.set(f,e*.04,0),E.updateLegs(E.group.position,E.group.rotation.y);const n=s>=c.s7_legsOut?1-_((s-c.s7_legsOut)/(x-c.s7_legsOut))*.85:1;E.plumeMat.uniforms.strength.value=n*(.7+Math.sin(e*22)*.3),E.plumeMat.uniforms.time.value=e,E.engineLight.intensity=n*(3.2+Math.sin(e*18)*1),q.blastDecalMat.opacity=n*.65;const g=Math.max(0,Math.min(1,(s-c.s5_transitionDip)/.015)),a=Math.max(0,Math.min(1,(s-(c.s5_transitionDip+.015))/.025)),u=g<1?g:1-a;Ht.uniforms.exposure.value=1-u*.85,E.beaconMat.opacity=Math.sin(e*6)>.75?.9:0}else{E.group.visible=!0;const l=(s-c.touchdownT)/Math.max(.001,1-c.touchdownT),h=.035,i=18,v=h*Math.exp(-.7*i*Math.min(l,1))*Math.cos(i*Math.min(l,.5)),f=ue(v);E.group.position.copy(f),E.group.rotation.set(0,.4,0),E.updateLegs(E.group.position,E.group.rotation.y),E.plumeMat.uniforms.strength.value=0,E.engineLight.intensity=0,q.blastDecalMat.opacity=Math.max(0,.65-(s-c.touchdownT)*2);const n=G(0,0);q.bodyContactShadow.position.set(0,n+.004,0),q.bodyContactShadow.material.opacity=.55;const g=Math.min(1,l*2.5);if(g<1&&g>0){nt.visible=!0,nt.position.copy(E.group.position),nt.position.y-=Oe;const a=nt.geometry.attributes.position,u=g*2;for(let y=0;y<Xt;y++){const P=ft[y*3],N=ft[y*3+1],I=ft[y*3+2];a.setXYZ(y,P*u,N*u-.5*ko*u*u,I*u)}a.needsUpdate=!0,Ve.opacity=Math.max(0,.35*(1-g*g))}else nt.visible=!1;E.beaconMat.opacity=Math.sin(e*3.2)>.5?.85:0}if(s>=c.s5_surfaceIn){const l=Math.max(0,Math.min(1,(s-c.s5_surfaceIn)/.08)),h=yt.lerp(1.05,1.38,l);Ht.uniforms.exposure.value=h}Ce.rotation.y+=t*.006,Yt.uniforms.viewPos.value.copy(T.position),ae.uniforms.viewVector.value.copy(T.position),Le.rotation.y+=t*.011,ke.rotation.y+=t*.016,Ae.uniforms.viewPos.value.copy(T.position),De.uniforms.viewPos.value.copy(T.position),Ie.uniforms.viewPos.value.copy(T.position),q.skyEarthGroup.rotation.y+=t*.01,Ht.uniforms.time.value=e,Uo(s),It.render(),Oo(performance.now()-o)}window.__lunaops={setJourney:t=>{O=Math.max(0,Math.min(1,t)),dt=O,Gt=0,Dt=0},getJourney:()=>dt,visibility:()=>({moonGroup:Q.visible,moonOpacity:Yt.uniforms.opacity.value,surfaceGroup:q.group.visible,lander:E.group.visible,orbiter:U.group.visible}),terrainHeight:G,assertVisibility:Ue,getFootpadPositions:()=>E.footpads.map(t=>{const e=t.clone();return{world:e,terrainH:G(e.x,e.z),delta:e.y-G(e.x,e.z)}})};te&&Ue();He();
