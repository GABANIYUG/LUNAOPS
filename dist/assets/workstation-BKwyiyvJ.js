var Mi=Object.defineProperty;var Ci=(o,t,i)=>t in o?Mi(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var b=(o,t,i)=>Ci(o,typeof t!="symbol"?t+"":t,i);import{X as $i,d as E,Y as fe,Z as ye,_ as Pt,$ as It,V as O,a0 as Ti,a1 as ki,l as dt,a2 as Gt,G as Re,a3 as Li,B as we,a4 as Pe,g as Se,a5 as Di,v as Ze,r as Q,o as Ie,M as G,x as Pi,a6 as lt,a7 as Ii,j as xe,W as Ai,S as Wt,A as Oi,a as Ni,C as Bt,b as Ri,i as Fi,D as Vt,E as zi,R as Ui,U as ji,c as Hi,T as qi,e as Gi,f as Wi,h as Bi,k as Kt,F as Vi,z as Ki,N as At,K as Yt,J as Zt,a8 as Yi,n as Zi,a9 as Xi,aa as Ji}from"./UnrealBloomPass-pUmJrMJ0.js";const Ot={type:"change"},nt={type:"start"},Nt={type:"end"},Be=new Ti,Rt=new ki,Qi=Math.cos(70*dt.DEG2RAD);class es extends $i{constructor(t,i){super(),this.object=t,this.domElement=i,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fe.ROTATE,MIDDLE:fe.DOLLY,RIGHT:fe.PAN},this.touches={ONE:ye.ROTATE,TWO:ye.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(n){n.addEventListener("keydown",at),this._domElementKeyEvents=n},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",at),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Ot),e.update(),a=s.NONE},this.update=function(){const n=new E,g=new It().setFromUnitVectors(t.up,new E(0,1,0)),x=g.clone().invert(),T=new E,A=new It,ae=new E,j=2*Math.PI;return function(_i=null){const Lt=e.object.position;n.copy(Lt).sub(e.target),n.applyQuaternion(g),c.setFromVector3(n),e.autoRotate&&a===s.NONE&&ie(Ge(_i)),e.enableDamping?(c.theta+=d.theta*e.dampingFactor,c.phi+=d.phi*e.dampingFactor):(c.theta+=d.theta,c.phi+=d.phi);let Y=e.minAzimuthAngle,Z=e.maxAzimuthAngle;isFinite(Y)&&isFinite(Z)&&(Y<-Math.PI?Y+=j:Y>Math.PI&&(Y-=j),Z<-Math.PI?Z+=j:Z>Math.PI&&(Z-=j),Y<=Z?c.theta=Math.max(Y,Math.min(Z,c.theta)):c.theta=c.theta>(Y+Z)/2?Math.max(Y,c.theta):Math.min(Z,c.theta)),c.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,c.phi)),c.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(l,e.dampingFactor):e.target.add(l),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor);let Le=!1;if(e.zoomToCursor&&le||e.object.isOrthographicCamera)c.radius=m(c.radius);else{const X=c.radius;c.radius=m(c.radius*r),Le=X!=c.radius}if(n.setFromSpherical(c),n.applyQuaternion(x),Lt.copy(e.target).add(n),e.object.lookAt(e.target),e.enableDamping===!0?(d.theta*=1-e.dampingFactor,d.phi*=1-e.dampingFactor,l.multiplyScalar(1-e.dampingFactor)):(d.set(0,0,0),l.set(0,0,0)),e.zoomToCursor&&le){let X=null;if(e.object.isPerspectiveCamera){const De=n.length();X=m(De*r);const We=De-X;e.object.position.addScaledVector(U,We),e.object.updateMatrixWorld(),Le=!!We}else if(e.object.isOrthographicCamera){const De=new E(D.x,D.y,0);De.unproject(e.object);const We=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/r)),e.object.updateProjectionMatrix(),Le=We!==e.object.zoom;const Dt=new E(D.x,D.y,0);Dt.unproject(e.object),e.object.position.sub(Dt).add(De),e.object.updateMatrixWorld(),X=n.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;X!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(X).add(e.object.position):(Be.origin.copy(e.object.position),Be.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(Be.direction))<Qi?t.lookAt(e.target):(Rt.setFromNormalAndCoplanarPoint(e.object.up,e.target),Be.intersectPlane(Rt,e.target))))}else if(e.object.isOrthographicCamera){const X=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/r)),X!==e.object.zoom&&(e.object.updateProjectionMatrix(),Le=!0)}return r=1,le=!1,Le||T.distanceToSquared(e.object.position)>p||8*(1-A.dot(e.object.quaternion))>p||ae.distanceToSquared(e.target)>p?(e.dispatchEvent(Ot),T.copy(e.object.position),A.copy(e.object.quaternion),ae.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",Tt),e.domElement.removeEventListener("pointerdown",Et),e.domElement.removeEventListener("pointercancel",ke),e.domElement.removeEventListener("wheel",_t),e.domElement.removeEventListener("pointermove",st),e.domElement.removeEventListener("pointerup",ke),e.domElement.getRootNode().removeEventListener("keydown",Mt,{capture:!0}),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",at),e._domElementKeyEvents=null)};const e=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=s.NONE;const p=1e-6,c=new Pt,d=new Pt;let r=1;const l=new E,h=new O,u=new O,v=new O,y=new O,f=new O,S=new O,C=new O,M=new O,_=new O,U=new E,D=new O;let le=!1;const k=[],te={};let me=!1;function Ge(n){return n!==null?2*Math.PI/60*e.autoRotateSpeed*n:2*Math.PI/60/60*e.autoRotateSpeed}function ce(n){const g=Math.abs(n*.01);return Math.pow(.95,e.zoomSpeed*g)}function ie(n){d.theta-=n}function de(n){d.phi-=n}const Ce=function(){const n=new E;return function(x,T){n.setFromMatrixColumn(T,0),n.multiplyScalar(-x),l.add(n)}}(),$e=function(){const n=new E;return function(x,T){e.screenSpacePanning===!0?n.setFromMatrixColumn(T,1):(n.setFromMatrixColumn(T,0),n.crossVectors(e.object.up,n)),n.multiplyScalar(x),l.add(n)}}(),K=function(){const n=new E;return function(x,T){const A=e.domElement;if(e.object.isPerspectiveCamera){const ae=e.object.position;n.copy(ae).sub(e.target);let j=n.length();j*=Math.tan(e.object.fov/2*Math.PI/180),Ce(2*x*j/A.clientHeight,e.object.matrix),$e(2*T*j/A.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(Ce(x*(e.object.right-e.object.left)/e.object.zoom/A.clientWidth,e.object.matrix),$e(T*(e.object.top-e.object.bottom)/e.object.zoom/A.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function ge(n){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?r/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Te(n){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?r*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ve(n,g){if(!e.zoomToCursor)return;le=!0;const x=e.domElement.getBoundingClientRect(),T=n-x.left,A=g-x.top,ae=x.width,j=x.height;D.x=T/ae*2-1,D.y=-(A/j)*2+1,U.set(D.x,D.y,1).unproject(e.object).sub(e.object.position).normalize()}function m(n){return Math.max(e.minDistance,Math.min(e.maxDistance,n))}function w(n){h.set(n.clientX,n.clientY)}function $(n){ve(n.clientX,n.clientX),C.set(n.clientX,n.clientY)}function L(n){y.set(n.clientX,n.clientY)}function N(n){u.set(n.clientX,n.clientY),v.subVectors(u,h).multiplyScalar(e.rotateSpeed);const g=e.domElement;ie(2*Math.PI*v.x/g.clientHeight),de(2*Math.PI*v.y/g.clientHeight),h.copy(u),e.update()}function se(n){M.set(n.clientX,n.clientY),_.subVectors(M,C),_.y>0?ge(ce(_.y)):_.y<0&&Te(ce(_.y)),C.copy(M),e.update()}function tt(n){f.set(n.clientX,n.clientY),S.subVectors(f,y).multiplyScalar(e.panSpeed),K(S.x,S.y),y.copy(f),e.update()}function it(n){ve(n.clientX,n.clientY),n.deltaY<0?Te(ce(n.deltaY)):n.deltaY>0&&ge(ce(n.deltaY)),e.update()}function ui(n){let g=!1;switch(n.code){case e.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?de(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):K(0,e.keyPanSpeed),g=!0;break;case e.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?de(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):K(0,-e.keyPanSpeed),g=!0;break;case e.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?ie(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):K(e.keyPanSpeed,0),g=!0;break;case e.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?ie(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):K(-e.keyPanSpeed,0),g=!0;break}g&&(n.preventDefault(),e.update())}function bt(n){if(k.length===1)h.set(n.pageX,n.pageY);else{const g=be(n),x=.5*(n.pageX+g.x),T=.5*(n.pageY+g.y);h.set(x,T)}}function ft(n){if(k.length===1)y.set(n.pageX,n.pageY);else{const g=be(n),x=.5*(n.pageX+g.x),T=.5*(n.pageY+g.y);y.set(x,T)}}function yt(n){const g=be(n),x=n.pageX-g.x,T=n.pageY-g.y,A=Math.sqrt(x*x+T*T);C.set(0,A)}function hi(n){e.enableZoom&&yt(n),e.enablePan&&ft(n)}function mi(n){e.enableZoom&&yt(n),e.enableRotate&&bt(n)}function St(n){if(k.length==1)u.set(n.pageX,n.pageY);else{const x=be(n),T=.5*(n.pageX+x.x),A=.5*(n.pageY+x.y);u.set(T,A)}v.subVectors(u,h).multiplyScalar(e.rotateSpeed);const g=e.domElement;ie(2*Math.PI*v.x/g.clientHeight),de(2*Math.PI*v.y/g.clientHeight),h.copy(u)}function wt(n){if(k.length===1)f.set(n.pageX,n.pageY);else{const g=be(n),x=.5*(n.pageX+g.x),T=.5*(n.pageY+g.y);f.set(x,T)}S.subVectors(f,y).multiplyScalar(e.panSpeed),K(S.x,S.y),y.copy(f)}function xt(n){const g=be(n),x=n.pageX-g.x,T=n.pageY-g.y,A=Math.sqrt(x*x+T*T);M.set(0,A),_.set(0,Math.pow(M.y/C.y,e.zoomSpeed)),ge(_.y),C.copy(M);const ae=(n.pageX+g.x)*.5,j=(n.pageY+g.y)*.5;ve(ae,j)}function gi(n){e.enableZoom&&xt(n),e.enablePan&&wt(n)}function vi(n){e.enableZoom&&xt(n),e.enableRotate&&St(n)}function Et(n){e.enabled!==!1&&(k.length===0&&(e.domElement.setPointerCapture(n.pointerId),e.domElement.addEventListener("pointermove",st),e.domElement.addEventListener("pointerup",ke)),!Ei(n)&&(wi(n),n.pointerType==="touch"?$t(n):bi(n)))}function st(n){e.enabled!==!1&&(n.pointerType==="touch"?Si(n):fi(n))}function ke(n){switch(xi(n),k.length){case 0:e.domElement.releasePointerCapture(n.pointerId),e.domElement.removeEventListener("pointermove",st),e.domElement.removeEventListener("pointerup",ke),e.dispatchEvent(Nt),a=s.NONE;break;case 1:const g=k[0],x=te[g];$t({pointerId:g,pageX:x.x,pageY:x.y});break}}function bi(n){let g;switch(n.button){case 0:g=e.mouseButtons.LEFT;break;case 1:g=e.mouseButtons.MIDDLE;break;case 2:g=e.mouseButtons.RIGHT;break;default:g=-1}switch(g){case fe.DOLLY:if(e.enableZoom===!1)return;$(n),a=s.DOLLY;break;case fe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(e.enablePan===!1)return;L(n),a=s.PAN}else{if(e.enableRotate===!1)return;w(n),a=s.ROTATE}break;case fe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(e.enableRotate===!1)return;w(n),a=s.ROTATE}else{if(e.enablePan===!1)return;L(n),a=s.PAN}break;default:a=s.NONE}a!==s.NONE&&e.dispatchEvent(nt)}function fi(n){switch(a){case s.ROTATE:if(e.enableRotate===!1)return;N(n);break;case s.DOLLY:if(e.enableZoom===!1)return;se(n);break;case s.PAN:if(e.enablePan===!1)return;tt(n);break}}function _t(n){e.enabled===!1||e.enableZoom===!1||a!==s.NONE||(n.preventDefault(),e.dispatchEvent(nt),it(yi(n)),e.dispatchEvent(Nt))}function yi(n){const g=n.deltaMode,x={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(g){case 1:x.deltaY*=16;break;case 2:x.deltaY*=100;break}return n.ctrlKey&&!me&&(x.deltaY*=10),x}function Mt(n){n.key==="Control"&&(me=!0,e.domElement.getRootNode().addEventListener("keyup",Ct,{passive:!0,capture:!0}))}function Ct(n){n.key==="Control"&&(me=!1,e.domElement.getRootNode().removeEventListener("keyup",Ct,{passive:!0,capture:!0}))}function at(n){e.enabled===!1||e.enablePan===!1||ui(n)}function $t(n){switch(kt(n),k.length){case 1:switch(e.touches.ONE){case ye.ROTATE:if(e.enableRotate===!1)return;bt(n),a=s.TOUCH_ROTATE;break;case ye.PAN:if(e.enablePan===!1)return;ft(n),a=s.TOUCH_PAN;break;default:a=s.NONE}break;case 2:switch(e.touches.TWO){case ye.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;hi(n),a=s.TOUCH_DOLLY_PAN;break;case ye.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;mi(n),a=s.TOUCH_DOLLY_ROTATE;break;default:a=s.NONE}break;default:a=s.NONE}a!==s.NONE&&e.dispatchEvent(nt)}function Si(n){switch(kt(n),a){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;St(n),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;wt(n),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;gi(n),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;vi(n),e.update();break;default:a=s.NONE}}function Tt(n){e.enabled!==!1&&n.preventDefault()}function wi(n){k.push(n.pointerId)}function xi(n){delete te[n.pointerId];for(let g=0;g<k.length;g++)if(k[g]==n.pointerId){k.splice(g,1);return}}function Ei(n){for(let g=0;g<k.length;g++)if(k[g]==n.pointerId)return!0;return!1}function kt(n){let g=te[n.pointerId];g===void 0&&(g=new O,te[n.pointerId]=g),g.set(n.pageX,n.pageY)}function be(n){const g=n.pointerId===k[0]?k[1]:k[0];return te[g]}e.domElement.addEventListener("contextmenu",Tt),e.domElement.addEventListener("pointerdown",Et),e.domElement.addEventListener("pointercancel",ke),e.domElement.addEventListener("wheel",_t,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",Mt,{passive:!0,capture:!0}),this.update()}}const ee="http://localhost:8001";async function Xt(){const o=await fetch(`${ee}/api/spice/health`,{headers:{Accept:"application/json"}});if(!o.ok)throw new Error(`Health check failed: HTTP ${o.status}`);return o.json()}async function Jt(o){var i;const t=await fetch(`${ee}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Geometry request failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function ts(o){var i;const t=await fetch(`${ee}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Horizon profile failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function is(o){var i;const t=await fetch(`${ee}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Horizon visibility failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function ss(o){var i;const t=await fetch(`${ee}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Mission timeline calculation failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function as(o){var i;const t=await fetch(`${ee}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Candidate comparison failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function Qt(o){var i;const t=await fetch(`${ee}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(o)});if(!t.ok){let e=`Landing windows scan failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}function ct(o){const[t,i,e]=o,s=t,a=e,p=i,c=Math.sqrt(s*s+a*a+p*p);return c<1e-10?[0,1,0]:[s/c,a/c,p/c]}let Fe=null,ot=!1,rt=!1,Ve=null;const Ee={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};let H=null;async function Xe(o,t,i,e){if(!H)return;const s=H.querySelector("#spice-lat"),a=H.querySelector("#spice-lon"),p=H.querySelector("#spice-time-input"),c=H.querySelector("#spice-site-note"),d=H.querySelector("#spice-predicted-badge");s&&(s.value=o.toFixed(3)),a&&(a.value=t.toFixed(2)),c&&(c.textContent=i),H.querySelectorAll(".spice-preset-btn").forEach(r=>{const l=parseFloat(r.dataset.lat||"999"),h=parseFloat(r.dataset.lon||"999");Math.abs(l-o)<.05&&Math.abs(h-t)<.05?r.classList.add("active"):r.classList.remove("active")}),d&&(d.textContent="⏳ Predicting optimal landing window...",d.style.display="block");try{const r=new Date,l=r.toISOString().slice(0,10),h=new Date(r.getTime()+60*24*3600*1e3).toISOString().slice(0,10),u=await Qt({start_date:l,end_date:h,latitude_deg:o,longitude_deg:t});let v=u.summary.best_window_start,y=0;if(!v&&u.days.length>0){const f=u.days.filter(S=>S.is_safe_for_landing);if(f.length>0)v=f[0].date,y=f[0].safety_score;else{const S=[...u.days].sort((C,M)=>M.safety_score-C.safety_score);v=S[0].date,y=S[0].safety_score}}else if(v){const f=u.days.find(S=>S.date===v);y=(f==null?void 0:f.safety_score)??100}if(v){const f=`${v}T12:00:00Z`;p&&(p.value=f),d&&(d.innerHTML=`🎯 Predicted Safe Window: <strong>${v}</strong> (${y}/100)`,d.style.display="block")}else p&&(p.value=new Date().toISOString().slice(0,19)+"Z"),d&&(d.style.display="none")}catch(r){console.warn("[SPICE] Landing window prediction scan failed, falling back to current time",r),p&&(p.value=new Date().toISOString().slice(0,19)+"Z"),d&&(d.style.display="none")}Me(H)}function ns(o){if(!H)return;const t=H.querySelector("#spice-time-input");t&&(t.value=o,Me(H))}function os(o){var a;Fe=o;const t=document.createElement("div");t.id="spice-panel",t.innerHTML=rs(),document.body.appendChild(t),H=t,t.querySelector("#spice-fetch-btn").addEventListener("click",()=>Me(t)),t.querySelector("#spice-auto-btn").addEventListener("click",()=>ds(t)),(a=t.querySelector("#spice-now-btn"))==null||a.addEventListener("click",()=>{const p=t.querySelector("#spice-time-input");p&&(p.value=new Date().toISOString().slice(0,19)+"Z",Me(t))}),t.querySelectorAll(".spice-preset-btn").forEach(p=>{p.addEventListener("click",()=>{const c=parseFloat(p.dataset.lat||"-90"),d=parseFloat(p.dataset.lon||"0"),r=p.dataset.label||"South Pole Site";Xe(c,d,r),t.querySelectorAll(".spice-preset-btn").forEach(l=>l.classList.remove("active")),p.classList.add("active")})});const i=t.querySelector(".spice-header"),e=t.querySelector(".spice-body");i.addEventListener("click",()=>{const p=e.style.display==="none";e.style.display=p?"":"none",i.querySelector(".spice-collapse-icon").textContent=p?"▼":"▶"});const s=t.querySelector("#spice-time-input");return s.value=new Date().toISOString().slice(0,19)+"Z",ei(t).then(()=>{Xe(Ee.lat,Ee.lon,Ee.label)}),t}function rs(){return`
<div class="spice-header">
  <span class="spice-title">☀ SPICE Geometry</span>
  <span class="spice-subtitle">NASA/JPL · SOUTH POLE</span>
  <span class="spice-collapse-icon">▼</span>
</div>
<div class="spice-body">
  <div class="spice-status-row" id="spice-status-row">
    <span class="spice-status-dot" id="spice-status-dot"></span>
    <span id="spice-status-text">Checking backend…</span>
  </div>

  <div class="spice-section">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="spice-label">PREDICT DATE / UTC TIME</div>
      <button type="button" id="spice-now-btn" class="spice-now-btn" title="Refresh to current UTC time">Now ⟳</button>
    </div>
    <input type="text" id="spice-time-input" class="spice-input"
           placeholder="2026-10-16T12:00:00Z"
           title="ISO-8601 UTC timestamp with Z suffix" />
    <div id="spice-predicted-badge" class="spice-predicted-badge" style="display:none"></div>
  </div>

  <div class="spice-section spice-site-section">
    <div class="spice-label">SOUTH POLE CANDIDATE SITES</div>
    <div class="spice-presets-row">
      <button type="button" class="spice-preset-btn active"
              data-lat="-89.463" data-lon="222.51"
              data-label="Artemis Site 01 · Shackleton–de Gerlache Ridge"
              title="NASA Artemis Candidate Site 01">Site 01 (Ridge)</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-90.0" data-lon="0.0"
              data-label="Geographic South Pole (90.0°S)"
              title="True Lunar South Pole">South Pole 90°S</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-89.78" data-lon="128.0"
              data-label="Shackleton Crater Peak"
              title="Shackleton Crater Rim Peak">Shackleton Rim</button>
    </div>

    <div class="spice-site-grid">
      <label class="spice-label-sm">Lat °</label>
      <input type="number" id="spice-lat" class="spice-input-sm"
             value="${Ee.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Ee.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Ee.label}</div>
  </div>

  <div class="spice-actions">
    <button id="spice-fetch-btn" class="spice-btn spice-btn-primary">Calculate</button>
    <button id="spice-auto-btn" class="spice-btn">Auto ●</button>
  </div>

  <div id="spice-loading" class="spice-loading" style="display:none">
    <div class="spice-spinner"></div> Querying SPICE…
  </div>
  <div id="spice-error-box" class="spice-error" style="display:none"></div>

  <!-- Sun results -->
  <div class="spice-results" id="spice-results" style="display:none">
    <div class="spice-result-group">
      <div class="spice-result-heading">☀ SUN</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-sun-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-sun-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-sun-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-sun-horizon">geometric only</span>
        <span class="spice-data-label">Terrain</span>
        <span class="spice-data-value spice-na-badge">not computed</span>
      </div>
    </div>

    <div class="spice-result-group">
      <div class="spice-result-heading">🌍 EARTH</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-earth-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-earth-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-earth-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-earth-horizon">geometric only</span>
        <span class="spice-data-label">Terrain</span>
        <span class="spice-data-value spice-na-badge">not computed</span>
      </div>
    </div>

    <div class="spice-frame-line">
      <span id="res-frame">MOON_ME</span> ·
      <span id="res-aberration">NONE (geometric)</span>
    </div>
    <div class="spice-scene-note" id="spice-scene-note" style="display:none">
      ⚡ Sun light direction updated in scene
    </div>
    <div class="spice-terrain-warning">
      ⚠ Positive elevation ≠ terrain-clear.  DEM occlusion not yet computed (step 6).
    </div>
  </div>
</div>
`}async function ei(o){const t=o.querySelector("#spice-status-dot"),i=o.querySelector("#spice-status-text"),e=o.querySelector("#spice-fetch-btn");try{const s=await Xt(),a=s.status==="ok";t.className="spice-status-dot "+(a?"dot-ok":"dot-warn"),i.textContent=a?`SPICE ready · ${s.reference_frame}`:`Backend degraded: ${s.error??"unknown error"}`,e.disabled=!a}catch{t.className="spice-status-dot dot-err",i.textContent="Backend offline - start backend on port 8000",e.disabled=!0}}async function Me(o){if(ot)return;ot=!0;const t=o.querySelector("#spice-loading"),i=o.querySelector("#spice-error-box"),e=o.querySelector("#spice-results");t.style.display="flex",i.style.display="none",e.style.display="none";try{const s=o.querySelector("#spice-time-input"),a=o.querySelector("#spice-lat"),p=o.querySelector("#spice-lon"),c=s.value.trim(),d=parseFloat(a.value),r=parseFloat(p.value),l=await Jt({utc_time:c,latitude_deg:d,longitude_deg:r,elevation_m:0});ls(o,l),cs(l)}catch(s){const a=s instanceof Error?s.message:String(s);i.textContent=`Error: ${a}`,i.style.display="block",await ei(o)}finally{t.style.display="none",ot=!1}}function ls(o,t){const i=o.querySelector("#spice-results");i.style.display="block";const e=d=>d.toFixed(1),s=d=>d>1e6?`${(d/1495978707e-1).toFixed(4)} AU`:`${d.toFixed(0)} km`;ne("res-sun-dist",s(t.sun.distance_km)),ne("res-sun-az",`${e(t.sun.azimuth_deg)}°`);const a=t.sun.elevation_deg;Ft("res-sun-el",`${e(a)}°`,a>=0?"spice-above":"spice-below"),ne("res-sun-horizon",a>=0?"↑ above horizon":"↓ below horizon"),ne("res-earth-dist",s(t.earth.distance_km)),ne("res-earth-az",`${e(t.earth.azimuth_deg)}°`);const p=t.earth.elevation_deg;Ft("res-earth-el",`${e(p)}°`,p>=0?"spice-above":"spice-below"),ne("res-earth-horizon",p>=0?"↑ above horizon":"↓ below horizon"),ne("res-frame",t.reference_frame),ne("res-aberration",t.aberration_correction);const c=o.querySelector("#spice-scene-note");c.style.display=Fe?"block":"none"}function cs(o){if(!Fe)return;const[t,i,e]=ct(o.sun.direction_unit),s=8;Fe.sunLight.position.set(t*s,i*s,e*s);const[a,p,c]=ct(o.earth.direction_unit);Fe.earthshineLight.position.set(-a*s,-p*s,-c*s)}function ds(o){const t=o.querySelector("#spice-auto-btn");if(rt=!rt,rt){t.classList.add("active"),t.textContent="Auto ■";const i=o.querySelector("#spice-time-input");i.value=new Date().toISOString().slice(0,19)+"Z",Me(o),Ve=setInterval(()=>{i.value=new Date().toISOString().slice(0,19)+"Z",Me(o)},6e4)}else t.classList.remove("active"),t.textContent="Auto ●",Ve!==null&&(clearInterval(Ve),Ve=null)}function ne(o,t){const i=document.getElementById(o);i&&(i.textContent=t,i.className="spice-data-value")}function Ft(o,t,i){const e=document.getElementById(o);e&&(e.textContent=t,e.className=`spice-data-value ${i}`)}const zt=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High illumination ridge candidate with near-continuous solar access & direct line-of-sight to Earth."},{id:"south-pole",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians on the rim of Shackleton Crater."},{id:"shackleton-rim",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering permanently shadowed regions (PSR) with potential water ice."},{id:"malapert",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth comms."}];function ps(o,t,i){const e=(90-o)*(Math.PI/180),s=(t+180)*(Math.PI/180),a=-i*Math.cos(s)*Math.sin(e),p=i*Math.cos(e),c=i*Math.sin(s)*Math.sin(e);return new E(a,p,c)}class us{constructor(t){b(this,"group");b(this,"animatedRings",[]);b(this,"interactiveMarkers",[]);b(this,"raycaster",new Gt);b(this,"mouse",new O);b(this,"onSelectSiteCallback");this.group=new Re,this.group.name="SouthPoleOverlay",this.createPolarCircles(t),this.createSouthPoleBeacon(t),this.createLandingSites(t)}setOnSelectSite(t){this.onSelectSiteCallback=t}getInteractiveObjects(){return this.interactiveMarkers}createPolarCircles(t){[{lat:-80,color:54015,opacity:.35,segments:128,name:"80S_Ring"},{lat:-85,color:4890367,opacity:.55,segments:128,name:"85S_Ring"}].forEach(({lat:p,color:c,opacity:d,segments:r,name:l})=>{const h=(90-p)*(Math.PI/180),u=t*Math.sin(h)*1.002,v=t*Math.cos(h)*1.002,f=new Li(0,0,u,u,0,2*Math.PI,!1,0).getPoints(r),S=new we().setFromPoints(f.map(_=>new E(_.x,v,_.y))),C=new Pe({color:c,transparent:!0,opacity:d,blending:Se}),M=new Di(S,C);M.name=l,this.group.add(M)});const e=new Ze(.01,t*Math.sin(10*Math.PI/180)*1.001,64);e.rotateX(-Math.PI/2);const s=new Q({color:46296,transparent:!0,opacity:.04,side:Ie,depthWrite:!1,blending:Se}),a=new G(e,s);a.position.y=-t*1.001,this.group.add(a)}createSouthPoleBeacon(t){const i=new Re;i.position.set(0,-t,0);const e=new Ze(.035,.04,32);e.rotateX(-Math.PI/2);const s=new Q({color:58879,side:Ie,transparent:!0,opacity:.8,blending:Se}),a=new G(e,s);i.add(a),this.animatedRings.push(a);const p=new Pi(.012,16);p.rotateX(-Math.PI/2);const c=new Q({color:16777215,side:Ie,transparent:!0,opacity:.9});i.add(new G(p,c));const d=new we().setFromPoints([new E(0,0,0),new E(0,-.15,0)]),r=new Pe({color:58879,transparent:!0,opacity:.7,blending:Se});i.add(new lt(d,r));const l=new we().setFromPoints([new E(-.06,0,0),new E(.06,0,0),new E(0,0,-.06),new E(0,0,.06)]),h=new Ii(l,new Pe({color:58879,transparent:!0,opacity:.6}));i.add(h);const u=new xe(.07,8,8),v=new Q({visible:!1}),y=new G(u,v);y.userData={site:zt.find(f=>f.id==="south-pole")},i.add(y),this.interactiveMarkers.push(y),this.group.add(i)}createLandingSites(t){zt.forEach(i=>{if(i.id==="south-pole")return;const e=new Re,s=ps(i.lat,i.lon,t*1.008);e.position.copy(s),e.quaternion.setFromUnitVectors(new E(0,1,0),s.clone().normalize());const a=i.id==="site-01",p=a?16758531:62932,c=a?.032:.022,d=new Ze(c*.85,c,24);d.rotateX(Math.PI/2);const r=new Q({color:p,side:Ie,transparent:!0,opacity:.85,blending:Se}),l=new G(d,r);e.add(l),this.animatedRings.push(l);const h=a?.08:.05,u=new we().setFromPoints([new E(0,0,0),new E(0,h,0)]),v=new Pe({color:p,transparent:!0,opacity:.8});e.add(new lt(u,v));const y=new xe(a?.012:.008,12,12),f=new Q({color:a?16777215:p}),S=new G(y,f);S.position.y=h,e.add(S);const C=new xe(.06,8,8),M=new Q({visible:!1}),_=new G(C,M);_.position.y=h/2,_.userData={site:i},e.add(_),this.interactiveMarkers.push(_),this.group.add(e)})}update(t){this.animatedRings.forEach((i,e)=>{const s=1+.15*Math.sin(t*3+e*.8);i.scale.set(s,s,s)})}handleClick(t,i){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,i);const e=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(e.length>0){const s=e[0].object.userData.site;return s&&this.onSelectSiteCallback&&this.onSelectSiteCallback(s),s}return null}}class ti{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(t,i){i&&(this.selectedFormat=i),this.mode="mission",this.missionContext=t,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(t,i){i&&(this.selectedFormat=i),this.mode="comparison",this.comparisonContext=t,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(t="mission"){this.isOpen?this.close():t==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var s,a,p,c,d,r,l,h;const t=this.mode==="mission",i=t?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",e=t?`${((s=this.missionContext)==null?void 0:s.scenarioName)??"Mission"} · ${((a=this.missionContext)==null?void 0:a.siteName)??"Selected Site"} (${(c=(p=this.missionContext)==null?void 0:p.latitudeDeg)==null?void 0:c.toFixed(3)}°N, ${(r=(d=this.missionContext)==null?void 0:d.longitudeDeg)==null?void 0:r.toFixed(3)}°E)`:`${((l=this.comparisonContext)==null?void 0:l.reportTitle)??"Candidate Comparison"} · ${((h=this.comparisonContext)==null?void 0:h.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
    <div class="mission-modal-backdrop" id="export-backdrop"></div>
    <div class="mission-modal-dialog export-dialog">
      <!-- Header -->
      <div class="mission-modal-header export-dialog-header">
        <div class="mission-header-info">
          <div class="export-kicker">LUNAOPS SCIENTIFIC REPRODUCIBILITY &amp; DATA EXPORT</div>
          <h2>📤 ${i}</h2>
          <p class="export-subtitle">${e}</p>
        </div>
        <div class="mission-header-controls">
          <button id="btn-close-export" class="modal-close-btn" title="Close Export Panel">✕</button>
        </div>
      </div>

      <!-- Body -->
      <div class="mission-body export-dialog-body">
        <!-- Scientific Disclaimer / Scope Notice -->
        <div class="export-disclaimer-bar">
          <span class="disclaimer-icon">⚠️</span>
          <div>
            <strong>Scientific Context &amp; Limitations:</strong>
            All ephemerides are calculated via NASA SPICE DE440s ephemerides in the <code>MOON_ME</code> reference frame.
            Terrain horizons and surface metrics use NASA LRO/LOLA DEM data where covered.
            Results are for pre-decisional planning and comparative research only; they do <em>not</em> constitute a landing-safety or operational certification.
          </div>
        </div>

        <!-- Format Selection Grid -->
        <div class="export-section-title">SELECT EXPORT ARTIFACT FORMAT</div>
        <div class="export-format-grid">
          <!-- PDF Card -->
          <div class="export-format-card ${this.selectedFormat==="pdf"?"selected":""}" data-format="pdf" id="card-fmt-pdf">
            <div class="export-fmt-icon">📄</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Scientific Report (PDF)</span>
                <span class="export-tag tag-pdf">Publication Ready</span>
              </div>
              <p class="export-fmt-desc">
                ${t?"Multi-page document containing executive metrics, reference frame definitions, illumination & visibility intervals, solar elevation chart, terrain slope profile, and SPICE provenance.":"Comprehensive comparative report with side-by-side metric tables, multi-criteria ranking results, constraint fulfillment breakdown, and synchronized visibility timelines."}
              </p>
              <div class="export-fmt-meta">Engine: ReportLab v4 · Vector tables &amp; charts · Paged layout</div>
            </div>
          </div>

          <!-- CSV Card -->
          <div class="export-format-card ${this.selectedFormat==="csv"?"selected":""}" data-format="csv" id="card-fmt-csv">
            <div class="export-fmt-icon">📊</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Numerical Time-Series (CSV)</span>
                <span class="export-tag tag-csv">Explicit Units</span>
              </div>
              <p class="export-fmt-desc">
                ${t?"Standardized columnar time-series with explicit units in headers: utc_iso, sun_elevation_deg, sun_azimuth_deg, sun_visibility, earth_elevation_deg, earth_azimuth_deg, direct_to_earth_visibility.":"Comparison summary matrix with scenario parameters, illumination percentages, Earth LOS durations, max continuous darkness, slope statistics, and MCDA scores."}
              </p>
              <div class="export-fmt-meta">Format: UTF-8 RFC 4180 CSV · Scientific notation compatible</div>
            </div>
          </div>

          <!-- JSON Card -->
          <div class="export-format-card ${this.selectedFormat==="json"?"selected":""}" data-format="json" id="card-fmt-json">
            <div class="export-fmt-icon">💾</div>
            <div class="export-fmt-content">
              <div class="export-fmt-head">
                <span class="export-fmt-label">Reproducibility Manifest (JSON)</span>
                <span class="export-tag tag-json">Machine-Readable</span>
              </div>
              <p class="export-fmt-desc">
                Full scientific provenance schema: scenario parameters, reference frame definitions (MOON_ME), SPICE kernel filenames &amp; SHA-256 digests, calculation sampling, precomputed outputs, and validation coverage status.
              </p>
              <div class="export-fmt-meta">Standard: LUNAOPS Manifest Schema v1.0 · Strict typing</div>
            </div>
          </div>
        </div>

        <!-- Contents Checklist -->
        <div class="export-contents-section">
          <div class="export-section-title">INCLUDED IN THIS EXPORT</div>
          <div class="export-contents-list">
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Scenario Coordinates:</strong> Latitude, longitude, reference sphere elevation, instrument height (MOON_ME frame).</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>SPICE Ephemeris:</strong> DE440s solar &amp; terrestrial vectors, apparent angular radii, topocentric elevation &amp; azimuth.</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Terrain &amp; Obstruction:</strong> NASA LOLA 5m/px DEM horizon evaluation (or explicit DEM outside-coverage notice).</span>
            </div>
            <div class="export-content-item">
              <span class="item-check">✓</span>
              <span><strong>Provenance &amp; Validation:</strong> Kernel catalog, calculation timestamps, methodology notes, and constraint configurations.</span>
            </div>
          </div>
        </div>

        <!-- Feedback & Status Notification -->
        ${this.renderStatus()}
      </div>

      <!-- Footer -->
      <div class="mission-footer export-dialog-footer">
        <div class="export-footer-left">
          <span class="active-fmt-indicator">Selected: <strong>${this.selectedFormat.toUpperCase()}</strong></span>
        </div>
        <div class="export-footer-actions">
          <button id="btn-cancel-export" class="btn-secondary" ${this.isGenerating?"disabled":""}>Cancel</button>
          <button id="btn-generate-export" class="btn-primary btn-highlight-compare ${this.isGenerating?"loading":""}" ${this.isGenerating?"disabled":""}>
            ${this.isGenerating?"⏳ Generating Artifact...":`📥 Download ${this.selectedFormat.toUpperCase()} Export`}
          </button>
        </div>
      </div>
    </div>
    `,this.wireEvents()}renderStatus(){if(this.isGenerating)return`
      <div class="export-status-bar status-info">
        <span class="spinner">⏳</span>
        <span>Evaluating SPICE kernels and assembling ${this.selectedFormat.toUpperCase()} artifact... please wait.</span>
      </div>`;if(this.statusMessage){const t=this.statusMessage.type==="error"?"status-error":"status-success",i=this.statusMessage.type==="error"?"❌":"✅";return`
      <div class="export-status-bar ${t}">
        <span>${i}</span>
        <span>${this.statusMessage.text}</span>
      </div>`}return""}wireEvents(){var i,e,s,a;(i=this.container.querySelector("#btn-close-export"))==null||i.addEventListener("click",()=>this.close()),(e=this.container.querySelector("#btn-cancel-export"))==null||e.addEventListener("click",()=>this.close()),(s=this.container.querySelector("#export-backdrop"))==null||s.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(p=>{p.addEventListener("click",()=>{if(this.isGenerating)return;const c=p.getAttribute("data-format")||"pdf";this.selectedFormat=c,this.render()})}),(a=this.container.querySelector("#btn-generate-export"))==null||a.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(t){console.error("[LUNAOPS] Export failed:",t),this.statusMessage={type:"error",text:t.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var c;if(!this.missionContext)throw new Error("Missing mission scenario context.");const t=this.missionContext,i={scenario_name:t.scenarioName||"Artemis Candidate Mission",notes:t.notes||"",site_name:t.siteName||"South Pole Site",latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:t.startUtc,end_utc:t.endUtc,step_minutes:t.stepMinutes,timeline_result:t.timelineResponse||null,horizon_result:t.horizonProfile||null},e=`${ee}/api/export/mission?format=${this.selectedFormat}`,s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){let d=`HTTP ${s.status}`;try{const r=await s.json();d=((c=r.detail)==null?void 0:c.message)||JSON.stringify(r.detail||r)}catch{d=await s.text()}throw new Error(`Export failed: ${d}`)}const a=(t.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await s.blob();this.triggerDownload(d,`lunaops_${a}_report_${p}.pdf`)}else if(this.selectedFormat==="csv"){const d=await s.text(),r=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(r,`lunaops_${a}_timeseries_${p}.csv`)}else{const d=await s.json(),r=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(r,`lunaops_${a}_manifest_${p}.json`)}}async exportComparison(){var c;if(!this.comparisonContext)throw new Error("Missing comparison context.");const t=this.comparisonContext;if(!t.scenarios||t.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const i=t.scenarios.map(d=>{let r=`${d.startDate}T${d.startTime}`;r.endsWith("Z")||(r+="Z");let l=`${d.endDate}T${d.endTime}`;return l.endsWith("Z")||(l+="Z"),{id:d.id,name:d.name,latitude_deg:d.latitudeDeg,longitude_deg:d.longitudeDeg,elevation_m:d.elevationM,instrument_height_m:d.instrumentHeightM,start_utc:r,end_utc:l,step_minutes:d.stepMinutes}}),e={report_title:t.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:i,constraints:t.constraints||null,ranking_weights:t.rankingWeights||null,comparison_result:t.comparisonResult||null},s=`${ee}/api/export/comparison?format=${this.selectedFormat}`,a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok){let d=`HTTP ${a.status}`;try{const r=await a.json();d=((c=r.detail)==null?void 0:c.message)||JSON.stringify(r.detail||r)}catch{d=await a.text()}throw new Error(`Comparison export failed: ${d}`)}const p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await a.blob();this.triggerDownload(d,`lunaops_comparison_report_${p}.pdf`)}else if(this.selectedFormat==="csv"){const d=await a.text(),r=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(r,`lunaops_comparison_matrix_${p}.csv`)}else{const d=await a.json(),r=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(r,`lunaops_comparison_manifest_${p}.json`)}}triggerDownload(t,i){const e=URL.createObjectURL(t),s=document.createElement("a");s.href=e,s.download=i,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(e),1e3)}}const ii=1737400,I={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function si(o,t,i=ii){const s=(o%360+360)%360*Math.PI/180,a=t*Math.PI/180,p=Math.PI/2+a,c=2*i*Math.tan(p/2),d=c*Math.sin(s),r=c*Math.cos(s);return{x:d,y:r}}function hs(o,t,i=ii){const e=Math.hypot(o,t);if(e<1e-7)return{lonDeg:0,latDeg:-90};const s=2*Math.atan2(e,2*i),a=-Math.PI/2+s,c=(Math.atan2(o,t)*180/Math.PI+360)%360,d=a*180/Math.PI;return{lonDeg:c,latDeg:d}}function ms(o,t){const i=o>=I.minX&&o<=I.maxX&&t>=I.minY&&t<=I.maxY,e=(o-I.minX)/I.pixelSizeM,s=(I.maxY-t)/I.pixelSizeM,a=e/I.fullWidthPx,p=s/I.fullHeightPx,c=Math.max(0,Math.min(511,Math.round(a*512))),d=Math.max(0,Math.min(511,Math.round(p*512)));return{pxFull:e,pyFull:s,px512:c,py512:d,isInside:i}}function gs(o,t){const i=Math.max(0,Math.min(1,o/512)),e=Math.max(0,Math.min(1,t/512)),s=I.minX+i*(I.maxX-I.minX),a=I.maxY-e*(I.maxY-I.minY),{lonDeg:p,latDeg:c}=hs(s,a);return{lonDeg:p,latDeg:c,x:s,y:a}}function ai(o,t,i){const e=(90-o)*(Math.PI/180),s=(t+180)*(Math.PI/180),a=-i*Math.cos(s)*Math.sin(e),p=i*Math.cos(e),c=i*Math.sin(s)*Math.sin(e);return new E(a,p,c)}function ni(o,t){const i=o.clone().normalize(),s=Math.asin(Math.max(-1,Math.min(1,i.y)))*180/Math.PI;let p=Math.atan2(-i.z,i.x)*180/Math.PI;return p<0&&(p+=360),{latDeg:s,lonDeg:p}}function pe(o,t){const i=`${Math.abs(o).toFixed(3)}° ${o<0?"S":"N"}`,s=`${((t%360+360)%360).toFixed(3)}° E`;return`${i}, ${s}`}class vs{constructor(){b(this,"metadata",null);b(this,"elevCanvas",null);b(this,"slopeCanvas",null);b(this,"toterrCanvas",null);b(this,"elevCtx",null);b(this,"slopeCtx",null);b(this,"toterrCtx",null);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const t=await fetch("/generated/site01_metadata.json");if(!t.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await t.json();const[i,e,s]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(i),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(e),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(s),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(t){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",t)}})(),this.loadPromise)}loadImage(t){return new Promise((i,e)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>i(s),s.onerror=a=>e(a),s.src=t})}createCanvasFromImage(t){const i=document.createElement("canvas");i.width=t.width,i.height=t.height;const e=i.getContext("2d",{willReadFrequently:!0});return e&&e.drawImage(t,0,0),i}getMetadata(){return this.metadata}sample(t,i){var d,r;const{x:e,y:s}=si(t,i),{px512:a,py512:p,isInside:c}=ms(e,s);if(!c||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:c,px:a,py:p,xM:e,yM:s};try{const l=this.elevCtx.getImageData(a,p,1,1).data[0],h=((d=this.slopeCtx)==null?void 0:d.getImageData(a,p,1,1).data[0])??0,u=((r=this.toterrCtx)==null?void 0:r.getImageData(a,p,1,1).data[0])??0,v=this.metadata.elev_max_m-this.metadata.elev_min_m,y=this.metadata.elev_min_m+l/255*v,f=h/255*this.metadata.slope_max_deg,S=u/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(y*10)/10,slopeDeg:Math.round(f*10)/10,errorM:Math.round(S*100)/100,px:a,py:p,xM:e,yM:s}}catch{return{isInside:c,px:a,py:p,xM:e,yM:s}}}}const Ut=new vs,P=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class bs{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"onSiteChangedCallback");this.selectedSite={name:P[0].name,designation:P[0].designation,latitudeDeg:P[0].lat,longitudeDeg:P[0].lon,elevationM:P[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(t){this.onSiteChangedCallback=t}setOnTimelineScrubbed(t){this.onTimelineScrubbedCallback=t}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(t,i){this.selectedSite.latitudeDeg=Math.round(t*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(i*1e3)/1e3,this.selectedSite.name="Custom Selected Location",this.selectedSite.designation="User Chosen Site",this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}async init(){await Ut.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await Xt()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const t=this.selectedSite.latitudeDeg,i=this.selectedSite.longitudeDeg,e=Ut.sample(i,t);if(this.selectedSite.isInsideSite01DEM=e.isInside,e.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=e.elevationM,this.selectedSite.sampledSlopeDeg=e.slopeDeg,this.selectedSite.sampledErrorM=e.errorM,this.selectedSite.pixelCoords={px:e.px,py:e.py,gridMax:512},this.selectedSite.polarStereoM={x:e.xM,y:e.yM},e.elevationM!==void 0&&(this.selectedSite.elevationM=e.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:s,y:a}=si(i,t);this.selectedSite.polarStereoM={x:s,y:a}}this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const t=`${this.timeline.startDate}T${this.timeline.startTime}Z`,i=Date.parse(t);if(isNaN(i))return;this.timeline.isoUtcStart=new Date(i).toISOString().replace(".000Z","Z");const e=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,s=i+this.timeline.durationValue*e;this.timeline.isoUtcEnd=new Date(s).toISOString().replace(".000Z","Z");const a=new Date(i).getUTCFullYear(),p=new Date(s).getUTCFullYear();this.timeline.isWithinKernelCoverage=a>=1900&&a<=2050&&p>=1900&&p<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var p;const t=[];(p=this.spiceHealth)!=null&&p.initialized?t.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):t.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const i=this.selectedSite.latitudeDeg,e=this.selectedSite.longitudeDeg;i>=-90&&i<=90&&e>=-180&&e<=360?t.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${pe(i,e)} · Elevation: ${this.selectedSite.elevationM} m`}):t.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?t.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):t.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?t.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):t.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let s="READY",a="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return t.some(c=>c.status==="fail")?(s="ERROR",a="One or more required parameters failed validation. Correct items marked in red."):t.some(c=>c.status==="warn")&&(s="READY_WITH_LIMITATIONS",a="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:s,summary:a,checks:t}}toScenarioJSON(){this.computeIsoTimestamps();const t=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:t,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const t=this.getReadinessEvaluation();this.container.innerHTML=`
    <div class="mission-dialog">
      <div class="mission-header">
        <div class="mission-title-group">
          <div class="mission-kicker">NASA SPACE APPS 2026 · CLPS MISSION PLANNER</div>
          <h2 class="mission-title">New Mission Analysis Workspace</h2>
        </div>
        <div class="mission-header-actions">
          <span class="readiness-pill ${t.state.toLowerCase()}">${t.state.replace(/_/g," ")}</span>
          <button id="btn-close-workspace" class="modal-close-btn" title="Close Workspace">✕</button>
        </div>
      </div>

      <div class="mission-nav-tabs">
        <button class="nav-tab ${this.currentTab==="site"?"active":""}" data-tab="site">📍 1. Landing Site & Terrain</button>
        <button class="nav-tab ${this.currentTab==="timeline"?"active":""}" data-tab="timeline">⏱ 2. Mission Timeline</button>
        <button class="nav-tab ${this.currentTab==="details"?"active":""}" data-tab="details">📝 3. Scenario Info</button>
        <button class="nav-tab ${this.currentTab==="readiness"?"active":""}" data-tab="readiness">🔍 4. Readiness & SPICE</button>
        <button class="nav-tab ${this.currentTab==="summary"?"active":""}" data-tab="summary">📋 5. Scenario Summary</button>
        <button class="nav-tab ${this.currentTab==="horizon"?"active":""}" data-tab="horizon">🌄 6. Horizon &amp; Visibility</button>
        <button class="nav-tab ${this.currentTab==="export"?"active":""}" data-tab="export">📤 7. Scientific Export</button>
        <button class="nav-tab ${this.currentTab==="windows"?"active":""}" data-tab="windows">🗓️ 8. Landing Windows</button>
      </div>

      <div class="mission-body">
        ${this.renderTabContent(t)}
      </div>

      <div class="mission-footer">
        <div class="footer-note">
          <span class="disclaimer-icon">⚠️</span>
          <span>Pre-decisional planning scenario. Does not imply formal NASA endorsement or approved CLPS landing site.</span>
        </div>
        <div class="footer-actions">
          <button id="btn-export-scenario" class="btn-secondary">📥 Quick JSON</button>
          <button id="btn-open-export-panel-footer" class="btn-highlight-compare" title="Export Scientific Report (PDF, CSV, JSON)">📤 Export Scientific Report</button>
          <button id="btn-eval-spice-footer" class="btn-primary">⚡ Evaluate Geometry (SPICE)</button>
        </div>
      </div>
    </div>
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(t){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(t);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(t);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const t=this.selectedSite.isInsideSite01DEM,i=this.horizonVisibility,e=this.horizonProfile,s=d=>d==="no_obstruction_detected_within_coverage"?"✅":d==="near_horizon_grazing"?"⚠️":d==="blocked_by_local_terrain"?"🪨":d==="blocked_by_lunar_body"?"🌑":"❓",a=d=>d==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":d==="near_horizon_grazing"?"Near-Horizon Grazing":d==="blocked_by_local_terrain"?"Blocked by Terrain":d==="blocked_by_lunar_body"?"Occulted by Moon":d==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",p=d=>d==="no_obstruction_detected_within_coverage"?"#22c55e":d==="near_horizon_grazing"?"#f59e0b":d.startsWith("blocked")?"#ef4444":"#94a3b8",c=(d,r,l)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${p(l.visibility_status)}">
          <span class="geom-body-title">${r} ${d}</span>
          <span class="horizon-badge" style="background: ${p(l.visibility_status)}22; color: ${p(l.visibility_status)}; border: 1px solid ${p(l.visibility_status)}44">
            ${s(l.visibility_status)} ${a(l.visibility_status)}
          </span>
        </div>
        <div class="geom-values">
          <div class="geom-row"><span>Azimuth:</span> <strong>${l.azimuth_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Geometric Elevation:</span> <strong>${l.geometric_elevation_deg.toFixed(2)}°</strong></div>
          ${l.terrain_horizon_elevation_deg!==null?`
          <div class="geom-row"><span>Terrain Skyline:</span> <strong>${l.terrain_horizon_elevation_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Angular Clearance:</span> <strong style="color:${(l.angular_clearance_deg??0)>0?"#22c55e":"#ef4444"}">${l.angular_clearance_deg!==null?(l.angular_clearance_deg>=0?"+":"")+l.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
          `:""}
          ${l.horizon_distance_m!==null?`<div class="geom-row"><span>Skyline Distance:</span> <strong>${(l.horizon_distance_m/1e3).toFixed(2)} km</strong></div>`:""}
        </div>
        <div class="vis-note">${l.note}</div>
      </div>
    `;return`
    <div class="tab-pane">
      <div class="horizon-eval-header">
        <div>
          <h3 style="margin:0 0 4px; color: var(--text-primary)">🌄 Terrain Horizon &amp; Sun/Earth Visibility</h3>
          <p style="margin:0; color: var(--text-muted); font-size:0.82rem">Ray-marching the NASA LOLA Site 01 5 m/px DEM to compute local skyline and line-of-sight obstruction.</p>
        </div>
        <button id="btn-eval-horizon" class="btn-primary${this.horizonLoading?" loading":""}" ${this.initialGeometry?"":'title="Evaluate SPICE geometry first (Readiness tab)"'}>
          ${this.horizonLoading?"⏳ Computing Horizon...":"🌄 Evaluate Terrain Horizon"}
        </button>
      </div>

      ${t?"":`
      <div class="outside-terrain-placeholder" style="margin-bottom:16px;padding:16px;">
        <div class="placeholder-icon">🗺️</div>
        <h4>Outside Site 01 High-Resolution DEM</h4>
        <p>Current site is outside the 16×16 km Site 01 tile. Terrain-aware horizon cannot be computed. Select Artemis Site 01 in Tab 1 for full analysis.</p>
      </div>
      `}

      ${this.horizonError?`
      <div class="check-item check-fail" style="margin-bottom:16px">
        <div class="check-icon">✕</div>
        <div class="check-body"><div class="check-label">Horizon Evaluation Error</div><div class="check-detail">${this.horizonError}</div></div>
      </div>
      `:""}

      ${!i&&!this.horizonLoading?`
      <div class="empty-geom-state">
        <p>No terrain horizon evaluation has been run yet.</p>
        <p class="hint">First evaluate SPICE geometry on the <strong>Readiness &amp; SPICE</strong> tab, then click <strong>Evaluate Terrain Horizon</strong> above to compute Sun and Earth terrain obstruction.</p>
      </div>
      `:""}

      ${i?`
      <div class="vis-cards-row">
        ${c("Sun","☀️",i.sun)}
        ${c("Earth","🌍",i.earth)}
      </div>

      <div class="panel-card" style="margin-top:16px">
        <div class="card-header">
          <h3>360° Terrain Skyline Profile</h3>
          <span style="font-size:0.78rem;color:var(--text-muted)">Angular resolution: ${(e==null?void 0:e.angular_step_deg)??2}° · Max range: 16 km</span>
        </div>
        <div class="horizon-chart-wrapper">
          <canvas id="horizon-polar-canvas" width="480" height="480" style="display:block;margin:0 auto;"></canvas>
        </div>
        <div class="geom-meta-bar" style="margin-top:8px">
          <span>DEM: <code>${i.dem_dataset}</code></span>
          <span>DEM Loaded: <code>${i.dem_loaded?"Yes":"No"}</code></span>
          <span>Coverage: <code>${i.site.is_inside_dem?"Inside Site 01":"Outside Site 01"}</code></span>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);margin:8px 16px 0">${i.note}</p>
      </div>
      `:""}
    </div>
    `}renderSiteTab(){const t=this.selectedSite.latitudeDeg,i=this.selectedSite.longitudeDeg,e=this.selectedSite.isInsideSite01DEM;return`
    <div class="tab-pane">
      <div class="grid-two-col">
        <!-- Left: Local Terrain Visualizer -->
        <div class="panel-card terrain-canvas-card">
          <div class="card-header">
            <h3>Detailed Local Terrain (Site 01)</h3>
            <div class="layer-toggle-group">
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="elev"?"active":""}" data-layer="elev">Elevation</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="slope"?"active":""}" data-layer="slope">Slope</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="toterr"?"active":""}" data-layer="toterr">Uncertainty</button>
            </div>
          </div>

          <div class="canvas-wrapper">
            ${e?`<canvas id="site01-terrain-canvas" width="512" height="512" class="terrain-canvas"></canvas>
                   <div class="canvas-overlay-crosshair-note">Click anywhere on terrain tile to target coordinates</div>`:`<div class="outside-terrain-placeholder">
                    <div class="placeholder-icon">🌐</div>
                    <h4>Outside High-Resolution Site 01 DEM Footprint</h4>
                    <p>Current coordinates (${pe(t,i)}) fall outside the 16×16 km Site 01 tile.</p>
                    <p class="placeholder-hint">Global 16 px/° LOLA elevation remains active. Select Artemis Site 01 below or click the 3D Moon near Shackleton Ridge to enter 5 m/px coverage.</p>
                    <button id="btn-jump-site01" class="btn-preset-accent">🎯 Jump to Artemis Site 01</button>
                   </div>`}
          </div>

          <div class="terrain-stat-bar">
            <div class="stat-cell">
              <span class="stat-lbl">DEM ELEVATION</span>
              <span class="stat-val ${e?"val-good":""}">
                ${this.selectedSite.sampledElevationM!==void 0?`${this.selectedSite.sampledElevationM>=0?"+":""}${this.selectedSite.sampledElevationM} m`:"—"}
              </span>
            </div>
            <div class="stat-cell">
              <span class="stat-lbl">LOCAL SLOPE</span>
              <span class="stat-val">
                ${this.selectedSite.sampledSlopeDeg!==void 0?`${this.selectedSite.sampledSlopeDeg}°`:"—"}
              </span>
            </div>
            <div class="stat-cell">
              <span class="stat-lbl">TOTAL ERROR (1σ)</span>
              <span class="stat-val">
                ${this.selectedSite.sampledErrorM!==void 0?`±${this.selectedSite.sampledErrorM} m`:"—"}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Inputs and Presets -->
        <div class="panel-card">
          <div class="card-header">
            <h3>Candidate Landing Site Presets</h3>
          </div>
          <div class="preset-list">
            ${P.map(s=>`
              <div class="preset-item ${s.lat===t&&s.lon===i?"selected":""}" data-preset-id="${s.id}">
                <div class="preset-title-row">
                  <span class="preset-name">${s.name}</span>
                  <span class="preset-tag ${s.id==="site-01"?"tag-dem":"tag-global"}">
                    ${s.id==="site-01"?"5m DEM Active":"Global 16px/°"}
                  </span>
                </div>
                <div class="preset-desc">${s.description}</div>
                <div class="preset-coords">${s.lat.toFixed(3)}° S, ${s.lon.toFixed(2)}° E (${s.elev>=0?"+":""}${s.elev} m)</div>
              </div>
            `).join("")}
          </div>

          <div class="card-header separator-header">
            <h3>Coordinate Inputs (MOON_ME Convention)</h3>
          </div>

          <div class="coord-form">
            <div class="form-row">
              <label for="inp-lat">Latitude (°)</label>
              <div class="input-with-hint">
                <input id="inp-lat" type="number" step="0.001" min="-90" max="90" value="${t.toFixed(3)}" />
                <span class="hint-pill">Negative = South (°S)</span>
              </div>
            </div>

            <div class="form-row">
              <label for="inp-lon">Longitude (°)</label>
              <div class="input-with-hint">
                <input id="inp-lon" type="number" step="0.001" min="-180" max="360" value="${i.toFixed(3)}" />
                <span class="hint-pill">East-positive [0..360)</span>
              </div>
            </div>

            <div class="form-row">
              <label for="inp-elev">Surface Elevation (m)</label>
              <div class="input-with-hint">
                <input id="inp-elev" type="number" step="1" value="${this.selectedSite.elevationM.toFixed(1)}" />
                <span class="hint-pill">Ref R = 1737.4 km</span>
              </div>
            </div>

            <div class="coverage-status-box ${e?"status-dem-active":"status-dem-outside"}">
              <div class="status-indicator-dot"></div>
              <div class="status-text">
                <strong>${e?"Inside NASA LOLA Site 01 (5 m/px) Tile":"Outside High-Resolution Site 01 DEM"}</strong>
                <p>${e?"Rigorous polar stereographic transform active. Native raster bounds: L=-19 km, R=-3 km, B=-20 km, T=-4 km.":"Coordinates will use SPICE geometric ephemeris with NASA global 16 px/° LOLA elevation relief."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}renderTimelineTab(){const t=this.selectedSite.isInsideSite01DEM,i=this.timelineResponse,e=i==null?void 0:i.summary,s=(i==null?void 0:i.samples)??[],a=s[this.scrubbedSampleIndex]??s[0],p=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},c=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},d=l=>{switch(l){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},r=l=>{switch(l){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
    <div class="tab-pane">
      <div class="grid-two-col">
        <div class="panel-card">
          <div class="card-header">
            <h3>Mission Timing &amp; Sampling Configuration</h3>
          </div>
          <div class="form-group">
            <label for="inp-start-date">Start Date (UTC)</label>
            <input id="inp-start-date" type="date" value="${this.timeline.startDate}" />
          </div>
          <div class="form-group">
            <label for="inp-start-time">Start Time (UTC Zulu)</label>
            <input id="inp-start-time" type="time" step="1" value="${this.timeline.startTime}" />
          </div>
          <div class="form-badge-row">
            <span class="badge-pill">ISO 8601 UTC:</span>
            <code class="code-pill">${this.timeline.isoUtcStart}</code>
          </div>

          <div class="card-header separator-header">
            <h3>Mission Analysis Duration</h3>
          </div>
          <div class="duration-row">
            <div class="form-group flex-1">
              <label for="inp-duration-val">Duration</label>
              <input id="inp-duration-val" type="number" min="1" max="365" value="${this.timeline.durationValue}" />
            </div>
            <div class="form-group flex-1">
              <label for="inp-duration-unit">Units</label>
              <select id="inp-duration-unit">
                <option value="days" ${this.timeline.durationUnit==="days"?"selected":""}>Days</option>
                <option value="hours" ${this.timeline.durationUnit==="hours"?"selected":""}>Hours</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="inp-timestep">Time Sampling Step</label>
            <select id="inp-timestep">
              <option value="0.25" ${this.timeline.timeStepHours===.25?"selected":""}>15 minutes (High-resolution)</option>
              <option value="0.5" ${this.timeline.timeStepHours===.5?"selected":""}>30 minutes (Operational)</option>
              <option value="1" ${this.timeline.timeStepHours===1?"selected":""}>1 hour (Standard step)</option>
              <option value="6" ${this.timeline.timeStepHours===6?"selected":""}>6 hours (Synoptic overview)</option>
              <option value="24" ${this.timeline.timeStepHours===24?"selected":""}>24 hours (Daily overview)</option>
            </select>
          </div>

          <div style="margin-top:16px;">
            <button id="btn-calc-timeline" class="btn-primary full-width${this.timelineLoading?" loading":""}" style="width:100%; justify-content:center; padding:0.75rem 1rem;">
              ${this.timelineLoading?"⏳ Computing Visibility Windows...":"⚡ Calculate Mission Timeline &amp; Visibility Windows"}
            </button>
          </div>
        </div>

        <div class="panel-card">
          <div class="card-header">
            <h3>Calculated Mission Window &amp; Coverage</h3>
          </div>
          <div class="timeline-window-card">
            <div class="timeline-milestone">
              <div class="milestone-marker start-marker">●</div>
              <div class="milestone-content">
                <div class="milestone-lbl">MISSION COMMENCEMENT</div>
                <div class="milestone-time">${this.timeline.isoUtcStart}</div>
              </div>
            </div>

            <div class="timeline-connector">
              <span class="connector-line"></span>
              <span class="connector-duration">${this.timeline.durationValue} ${this.timeline.durationUnit} analysis span</span>
            </div>

            <div class="timeline-milestone">
              <div class="milestone-marker end-marker">●</div>
              <div class="milestone-content">
                <div class="milestone-lbl">MISSION CONCLUSION</div>
                <div class="milestone-time">${this.timeline.isoUtcEnd}</div>
              </div>
            </div>
          </div>

          <div class="card-header separator-header">
            <h3>DE440s SPICE &amp; DEM Coverage Status</h3>
          </div>
          <div class="kernel-coverage-box ${this.timeline.isWithinKernelCoverage?"coverage-ok":"coverage-error"}">
            <div class="coverage-icon">${this.timeline.isWithinKernelCoverage?"✅":"❌"}</div>
            <div>
              <strong>${this.timeline.isWithinKernelCoverage?"Covered by Installed SPICE DE440s Kernel":"Time Interval Out of Kernel Range"}</strong>
              <p>NASA JPL DE440s SPK covers celestial ephemerides from Jan 1900 to Dec 2050 UTC.</p>
            </div>
          </div>

          <div class="kernel-coverage-box ${t?"coverage-ok":"coverage-warning"}" style="margin-top:8px;">
            <div class="coverage-icon">${t?"🗺️":"⚠️"}</div>
            <div>
              <strong>${t?"Site 01 High-Resolution 5 m/px DEM Active":"Outside Site 01 High-Resolution Footprint"}</strong>
              <p>${t?"Rigorous topocentric ray-marching across 16×16 km polar stereographic raster.":"Terrain occlusion cannot be evaluated outside tile footprint; results will indicate unknown coverage."}</p>
            </div>
          </div>
        </div>
      </div>

      ${this.timelineError?`
      <div class="check-item check-fail" style="margin-top:16px;">
        <div class="check-icon">✕</div>
        <div class="check-body"><div class="check-label">Timeline Calculation Error</div><div class="check-detail">${this.timelineError}</div></div>
      </div>
      `:""}

      ${i&&e?`
      <!-- KPI Metric Cards -->
      <div class="kpi-grid-row" style="margin-top:16px;">
        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>☀️ Solar Illumination Summary</h3>
            <span class="badge-pill">Apparent Disc: ~0.53°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Sunlight:</span> <strong style="color:#22c55e;">${e.sunlight.full_sunlight_hours} h (${e.sunlight.full_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Penumbral / Grazing:</span> <strong style="color:#f59e0b;">${e.sunlight.partial_sunlight_hours} h (${e.sunlight.partial_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Total Darkness:</span> <strong style="color:#94a3b8;">${e.sunlight.total_darkness_hours} h (${e.sunlight.total_darkness_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Sunlight:</span> <strong>${e.sunlight.max_continuous_sunlight_hours} h</strong></div>
            <div class="kpi-row"><span>Max Continuous Darkness:</span> <strong>${e.sunlight.max_continuous_darkness_hours} h</strong></div>
            <div class="kpi-row"><span>Sunrise / Sunset Cycles:</span> <strong>${e.sunlight.transition_count} transitions</strong></div>
          </div>
        </div>

        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>🌍 Direct-to-Earth Line of Sight</h3>
            <span class="badge-pill">Apparent Disc: ~1.9°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Disc LOS:</span> <strong style="color:#3b82f6;">${e.earth_los.full_disc_los_hours} h (${e.earth_los.full_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Centre / Partial LOS:</span> <strong style="color:#06b6d4;">${e.earth_los.partial_disc_los_hours} h (${e.earth_los.partial_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Occulted:</span> <strong style="color:#ef4444;">${e.earth_los.occulted_hours} h (${e.earth_los.occulted_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Earth LOS:</span> <strong>${e.earth_los.max_continuous_los_hours} h</strong></div>
            <div class="kpi-row"><span>Occultation Events:</span> <strong>${e.earth_los.transition_count} transitions</strong></div>
          </div>
          <div class="vis-note" style="margin-top:8px; border-radius:4px; font-size:0.72rem;">
            ${e.earth_los.communication_disclaimer}
          </div>
        </div>
      </div>

      <!-- Interactive Multi-Track Visual Timeline & Scrubber -->
      <div class="panel-card" style="margin-top:16px;">
        <div class="card-header">
          <h3>Interactive Mission Timeline &amp; Synchronized Scrubber</h3>
          <span style="font-size:0.78rem;color:var(--text-muted);">${s.length} discrete SPICE samples · Bisection refined to 60s</span>
        </div>

        <div class="timeline-visual-wrapper" style="padding:16px;">
          <!-- Track 1: Sun Illumination -->
          <div class="track-container">
            <div class="track-header">
              <span class="track-title">☀️ Sun Visibility</span>
              <span class="track-legend">
                <span class="legend-dot" style="background:#22c55e;"></span>Full Sun
                <span class="legend-dot" style="background:#f59e0b;"></span>Grazing
                <span class="legend-dot" style="background:#1e293b;"></span>Darkness
              </span>
            </div>
            <div class="timeline-bar-track">
              ${i.sun_windows.map(l=>`
                <div class="timeline-bar-seg" style="flex: ${l.duration_hours}; background: ${d(l.state)};" title="${l.state.replace(/_/g," ")}: ${l.duration_hours}h (${l.start_utc} → ${l.end_utc})"></div>
              `).join("")}
            </div>
          </div>

          <!-- Track 2: Earth Line-of-Sight -->
          <div class="track-container" style="margin-top:12px;">
            <div class="track-header">
              <span class="track-title">🌍 Potential Earth Line-of-Sight</span>
              <span class="track-legend">
                <span class="legend-dot" style="background:#3b82f6;"></span>Full Disc
                <span class="legend-dot" style="background:#06b6d4;"></span>Centre/Partial
                <span class="legend-dot" style="background:#ef4444;"></span>Occulted
              </span>
            </div>
            <div class="timeline-bar-track">
              ${i.earth_windows.map(l=>`
                <div class="timeline-bar-seg" style="flex: ${l.duration_hours}; background: ${r(l.state)};" title="${l.state.replace(/_/g," ")}: ${l.duration_hours}h (${l.start_utc} → ${l.end_utc})"></div>
              `).join("")}
            </div>
          </div>

          <!-- Range slider scrubber -->
          <div class="scrubber-container" style="margin-top:16px;">
            <input id="inp-timeline-scrubber" type="range" min="0" max="${s.length-1}" value="${this.scrubbedSampleIndex}" step="1" class="timeline-scrubber-slider" style="width:100%;" />
            <div class="scrubber-ticks">
              <span>${this.timeline.isoUtcStart}</span>
              <span style="font-weight:600; color:var(--accent-primary);">Current Scrubber Time</span>
              <span>${this.timeline.isoUtcEnd}</span>
            </div>
          </div>

          <!-- Instantaneous conditions card for selected timestamp -->
          ${a?`
          <div id="scrubbed-conditions-panel" class="scrubbed-conditions-panel" style="margin-top:16px;">
            <div class="scrubbed-header">
              <div>
                <span class="scrubbed-time-title">Selected UTC Timestamp:</span>
                <strong id="scrubbed-time-val" class="code-pill" style="font-size:0.95rem; margin-left:8px;">${a.timestamp_utc}</strong>
              </div>
              <span class="badge-pill">Sample ${this.scrubbedSampleIndex+1} of ${s.length}</span>
            </div>

            <div class="scrubbed-grid">
              <div class="scrubbed-col">
                <div class="scrubbed-col-title">☀️ Sun Ephemeris &amp; Illumination</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${p(a.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${a.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${a.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${a.sun.terrain_horizon_elevation_deg!==null?a.sun.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(a.sun.angular_clearance_deg??0)>=0?"#22c55e":"#ef4444"}">${a.sun.angular_clearance_deg!==null?(a.sun.angular_clearance_deg>=0?"+":"")+a.sun.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${c(a.earth.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${a.earth.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${a.earth.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${a.earth.terrain_horizon_elevation_deg!==null?a.earth.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(a.earth.angular_clearance_deg??0)>=0?"#3b82f6":"#ef4444"}">${a.earth.angular_clearance_deg!==null?(a.earth.angular_clearance_deg>=0?"+":"")+a.earth.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>
            </div>
          </div>
          `:""}
        </div>
      </div>

      <!-- Visibility Windows Table Breakdown -->
      <div class="panel-card" style="margin-top:16px;">
        <div class="card-header">
          <h3>Calculated Continuous Visibility Windows</h3>
          <span style="font-size:0.78rem;color:var(--text-muted);">Refined transitions (accuracy: ±60 sec)</span>
        </div>
        <div class="windows-table-wrapper" style="max-height:280px; overflow-y:auto; padding:8px 16px;">
          <table class="windows-table" style="width:100%; border-collapse:collapse; font-size:0.78rem;">
            <thead>
              <tr style="border-bottom:1px solid rgba(148,163,184,0.2); text-align:left; color:var(--text-muted);">
                <th style="padding:6px;">Target</th>
                <th style="padding:6px;">Start (UTC)</th>
                <th style="padding:6px;">End (UTC)</th>
                <th style="padding:6px;">Duration</th>
                <th style="padding:6px;">State</th>
              </tr>
            </thead>
            <tbody>
              ${i.sun_windows.map(l=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">☀️ Sun</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${l.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${p(l.state)}</td>
                </tr>
              `).join("")}
              ${i.earth_windows.map(l=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${l.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${c(l.state)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      `:`
      <div class="empty-geom-state" style="margin-top:16px;">
        <p>No mission timeline has been calculated yet.</p>
        <p class="hint">Configure the start timestamp and duration above, then click <strong>Calculate Mission Timeline &amp; Visibility Windows</strong> to run topocentric SPICE sampling and terrain ray-marching.</p>
      </div>
      `}
    </div>
    `}renderDetailsTab(){return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Mission Scenario Identity</h3>
        </div>
        <div class="form-group">
          <label for="inp-scen-name">Scenario Name</label>
          <input id="inp-scen-name" type="text" value="${this.scenarioName}" class="full-width" />
        </div>
        <div class="form-group">
          <label for="inp-scen-notes">Operational Notes & Objectives</label>
          <textarea id="inp-scen-notes" rows="4" class="full-width">${this.scenarioNotes}</textarea>
        </div>

        <div class="card-header separator-header">
          <h3>Coordinate Reference System & Scientific Standards</h3>
        </div>
        <div class="metadata-grid">
          <div class="meta-item">
            <span class="meta-lbl">CELESTIAL BODY</span>
            <span class="meta-val">Moon (NAIF ID: 301)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">REFERENCE FRAME</span>
            <span class="meta-val">MOON_ME (NAIF ID: 31001)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">COORDINATE DATUM</span>
            <span class="meta-val">IAU 2000 Sphere (R = 1,737,400.0 m)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">LONGITUDE CONVENTION</span>
            <span class="meta-val">East-Positive [0°..360°) · Prime Meridian = Earth Facing</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">HIGH-RES DEM</span>
            <span class="meta-val">NASA LOLA Artemis Site 01 (5 m/px, Polar Stereographic)</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">SPICE KERNELS</span>
            <span class="meta-val">de440s.bsp, pck00011.tpc, moon_pa_de440, moon_de440.tf</span>
          </div>
        </div>
      </div>
    </div>
    `}renderReadinessTab(t){const i=this.initialGeometry;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Data-Readiness Checklist</h3>
          <span class="readiness-pill ${t.state.toLowerCase()}">${t.state.replace(/_/g," ")}</span>
        </div>
        <p class="readiness-summary-line">${t.summary}</p>

        <div class="checks-list">
          ${t.checks.map(e=>`
            <div class="check-item check-${e.status}">
              <div class="check-icon">${e.status==="pass"?"✓":e.status==="warn"?"⚠":"✕"}</div>
              <div class="check-body">
                <div class="check-label">${e.label}</div>
                <div class="check-detail">${e.detail}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="card-header separator-header">
          <h3>SPICE Ephemeris Geometry Preview (Single Timestamp)</h3>
          <button id="btn-eval-spice-tab" class="btn-primary">⚡ Evaluate Live Geometry</button>
        </div>

        <div class="geometry-preview-area">
          ${i?`
            <div class="geom-result-grid">
              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">☀️ Sun Position</span>
                  <span class="horizon-badge ${i.sun.elevation_deg>=0?"badge-above":"badge-below"}">
                    ${i.sun.elevation_deg>=0?"↑ Above Horizon":"↓ Below Horizon"}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${i.sun.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${i.sun.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${(i.sun.distance_au??i.sun.distance_km/1495978707e-1).toFixed(4)} AU (${(i.sun.distance_km/1e6).toFixed(2)}M km)</strong></div>
                </div>
              </div>

              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">🌍 Earth Position</span>
                  <span class="horizon-badge ${i.earth.elevation_deg>=0?"badge-above":"badge-below"}">
                    ${i.earth.elevation_deg>=0?"↑ Line-of-Sight":"↓ Below Horizon"}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${i.earth.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${i.earth.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${Math.round(i.earth.distance_km).toLocaleString()} km</strong></div>
                </div>
              </div>
            </div>

            <div class="geom-meta-bar">
              <span>Epoch: <code>${i.spice_utc}</code> (ET: ${i.ephemeris_time_s.toFixed(2)} s)</span>
              <span>Frame: <code>${i.reference_frame}</code></span>
              <span>Aberration: <code>${i.aberration_correction}</code></span>
            </div>
          `:`<div class="empty-geom-state">
                  <p>No ephemeris calculation performed yet for this scenario configuration.</p>
                  <p class="hint">Click <strong>Evaluate Live Geometry</strong> above to send parameters to the SPICE backend.</p>
                 </div>`}
        </div>
      </div>
    </div>
    `}renderSummaryTab(t){var s;const i=this.selectedSite.latitudeDeg,e=this.selectedSite.longitudeDeg;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Configuration Summary</h3>
          <span class="readiness-pill ${t.state.toLowerCase()}">${t.state.replace(/_/g," ")}</span>
        </div>

        <table class="summary-table">
          <tbody>
            <tr>
              <td>Scenario Name</td>
              <td><strong>${this.scenarioName}</strong></td>
            </tr>
            <tr>
              <td>Target Region</td>
              <td>Lunar South Pole (80°S–90°S)</td>
            </tr>
            <tr>
              <td>Site Designation</td>
              <td>${this.selectedSite.name} · ${this.selectedSite.designation}</td>
            </tr>
            <tr>
              <td>Coordinates</td>
              <td><code>${pe(i,e)}</code></td>
            </tr>
            <tr>
              <td>Surface Elevation</td>
              <td>${this.selectedSite.elevationM>=0?"+":""}${this.selectedSite.elevationM} m (Datum: R = 1737.4 km)</td>
            </tr>
            <tr>
              <td>Topographic DEM</td>
              <td>${this.selectedSite.demDatasetName??"NASA LOLA Global 16 px/° (Site 01 5mpp unavailable)"}</td>
            </tr>
            <tr>
              <td>Mission Commencement</td>
              <td><code>${this.timeline.isoUtcStart}</code></td>
            </tr>
            <tr>
              <td>Mission Conclusion</td>
              <td><code>${this.timeline.isoUtcEnd}</code> (${this.timeline.durationValue} ${this.timeline.durationUnit})</td>
            </tr>
            <tr>
              <td>SPICE Kernel Engine</td>
              <td>${(s=this.spiceHealth)!=null&&s.initialized?"Online · Verified NAIF SPK/PCK/FK":"Offline"}</td>
            </tr>
            <tr>
              <td>Evaluation Status</td>
              <td>${this.initialGeometry?"Ephemeris Evaluated":"Pending Initial Calculation"}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary-actions-bar">
          <button id="btn-export-scenario-summary" class="btn-secondary">📥 Download Scenario JSON</button>
          <button id="btn-apply-3d-view" class="btn-primary">🎯 Apply & Focus Site in 3D Scene</button>
        </div>
      </div>
    </div>
    `}openExportModal(t){this.exportPanel||(this.exportPanel=new ti),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},t)}renderExportTab(){const t=this.timelineResponse!==null;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>📤 Scientific Report Export &amp; Reproducibility</h3>
          <span class="coverage-pill ${t?"coverage-inside":"coverage-pending"}">
            ${t?"TIMELINE COMPUTED":"TIMELINE PENDING"}
          </span>
        </div>

        <p class="section-intro">
          Generate formal scientific artifacts for peer review, mission reproducibility, and team collaboration.
          Select from publication-ready PDF reports, columnar CSV numerical time-series, or JSON reproducibility manifests.
        </p>

        <div class="export-tab-summary-grid">
          <div class="export-metric-box">
            <span class="export-metric-label">Scenario Name</span>
            <span class="export-metric-val">${this.scenarioName}</span>
          </div>
          <div class="export-metric-box">
            <span class="export-metric-label">Selected Site</span>
            <span class="export-metric-val">${this.selectedSite.name}</span>
          </div>
          <div class="export-metric-box">
            <span class="export-metric-label">Coordinates</span>
            <span class="export-metric-val">${this.selectedSite.latitudeDeg.toFixed(3)}°N, ${this.selectedSite.longitudeDeg.toFixed(3)}°E</span>
          </div>
          <div class="export-metric-box">
            <span class="export-metric-label">UTC Interval</span>
            <span class="export-metric-val">${this.timeline.startDate} → ${this.timeline.isoUtcEnd?this.timeline.isoUtcEnd.slice(0,10):""}</span>
          </div>
        </div>

        <div class="export-artifacts-preview">
          <div class="export-art-item">
            <div class="art-badge-icon">📄</div>
            <div class="art-details">
              <strong>Publication PDF Report</strong>
              <p>Executive overview, SPICE reference frame geometry (MOON_ME), solar elevation charts, terrain obstruction, and ephemeris provenance.</p>
            </div>
            <button class="btn-primary btn-quick-export" data-quick-fmt="pdf">📥 PDF</button>
          </div>

          <div class="export-art-item">
            <div class="art-badge-icon">📊</div>
            <div class="art-details">
              <strong>Numerical Time-Series (CSV)</strong>
              <p>Columnar UTC timeline with explicit units (deg, km, visibility flag) for external plotting and numerical analysis.</p>
            </div>
            <button class="btn-primary btn-quick-export" data-quick-fmt="csv">📥 CSV</button>
          </div>

          <div class="export-art-item">
            <div class="art-badge-icon">💾</div>
            <div class="art-details">
              <strong>Reproducibility Manifest (JSON)</strong>
              <p>Full machine-readable scenario inputs, SPICE kernel IDs, calculation parameters, results, and validation coverage status.</p>
            </div>
            <button class="btn-primary btn-quick-export" data-quick-fmt="json">📥 JSON</button>
          </div>
        </div>

        <div class="summary-actions-bar" style="margin-top: 1.5rem;">
          <button id="btn-open-full-export-dialog" class="btn-primary btn-highlight-compare" style="width: 100%; justify-content: center; padding: 0.85rem 1.25rem;">
            📤 Open Complete Scientific Export &amp; Provenance Dialog
          </button>
        </div>
      </div>
    </div>
    `}renderLandingWindowsTab(){const t=this.landingWindowsResponse,i=(t==null?void 0:t.days)??[],e=t==null?void 0:t.scan_params,s=t==null?void 0:t.summary,a=r=>{try{return new Date(r+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return r}},p=(r,l)=>{switch(r){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${l})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${l})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${l})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${l})</span>`}},c=r=>{switch(r){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},d=i.filter(r=>this.landingWindowsFilter==="safe"?r.is_safe_for_landing:this.landingWindowsFilter==="excellent"?r.safety_rating==="excellent":!0);return`
    <div class="tab-pane">
      <div class="horizon-eval-header" style="margin-bottom: 1.25rem;">
        <div>
          <h3 style="margin:0 0 4px; color: var(--text-primary)">🗓️ Multi-Month Landing Windows Scanner</h3>
          <p style="margin:0; color: var(--text-muted); font-size:0.82rem">
            Scan candidate months at 6-hour granularity using SPICE ephemerides to identify launch/landing opportunities with adequate solar illumination (power &amp; thermal) and direct-to-Earth line-of-sight (communications).
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button id="btn-scan-landing-windows" class="btn-primary${this.landingWindowsLoading?" loading":""}">
            ${this.landingWindowsLoading?"⏳ Scanning Ephemerides...":"🔍 Scan Landing Windows"}
          </button>
        </div>
      </div>

      <!-- Config & Presets Card -->
      <div class="panel-card" style="margin-bottom: 1.25rem;">
        <div class="card-header" style="margin-bottom: 0.75rem;">
          <h4 style="margin:0; font-size: 0.9rem; color: var(--text-primary);">Scanner Configuration</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            Target: <strong>${this.selectedSite.name}</strong> (${this.selectedSite.latitudeDeg.toFixed(3)}° S, ${this.selectedSite.longitudeDeg.toFixed(2)}° E · ${this.selectedSite.isInsideSite01DEM?"LOLA 5m DEM Terrain-Aware":"Geometric SPICE"})
          </span>
        </div>
        <div class="windows-config-grid">
          <div class="form-group" style="margin-bottom:0;">
            <label for="inp-windows-start-date" style="font-size:0.75rem; color:var(--text-muted); display:block; margin-bottom:4px;">Start Date (UTC)</label>
            <input id="inp-windows-start-date" type="date" value="${this.landingWindowsStartDate}" class="windows-date-input" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label for="inp-windows-end-date" style="font-size:0.75rem; color:var(--text-muted); display:block; margin-bottom:4px;">End Date (UTC)</label>
            <input id="inp-windows-end-date" type="date" value="${this.landingWindowsEndDate}" class="windows-date-input" />
          </div>
          <div class="form-group" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:flex-end;">
            <span style="font-size:0.72rem; color:var(--text-muted); margin-bottom:4px;">Quick Date Presets</span>
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
              <button class="btn-preset-pill btn-window-preset" data-preset="30d">Next 30 Days</button>
              <button class="btn-preset-pill btn-window-preset" data-preset="q4-2026">Q4 2026 (Artemis III)</button>
              <button class="btn-preset-pill btn-window-preset" data-preset="q1-2027">Q1 2027</button>
            </div>
          </div>
        </div>
      </div>

      ${this.landingWindowsError?`
      <div class="check-item check-fail" style="margin-bottom: 16px;">
        <div class="check-icon">✕</div>
        <div class="check-body">
          <div class="check-label">Landing Windows Scan Error</div>
          <div class="check-detail">${this.landingWindowsError}</div>
        </div>
      </div>
      `:""}

      ${this.landingWindowsLoading?`
      <div class="windows-loading-state">
        <div class="spinner-circle"></div>
        <h4>Scanning SPICE Ephemerides &amp; Horizon Obscuration</h4>
        <p>Evaluating solar elevation, line-of-sight communications, and terrain obstruction across ${this.landingWindowsStartDate} → ${this.landingWindowsEndDate}...</p>
      </div>
      `:""}

      ${!t&&!this.landingWindowsLoading&&!this.landingWindowsError?`
      <div class="empty-geom-state" style="padding: 2.5rem 1.5rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🗓️</div>
        <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem;">No Landing Windows Scan Computed Yet</p>
        <p class="hint" style="max-width: 560px; margin: 0 auto 1.25rem;">
          Click <strong>Scan Landing Windows</strong> above to analyze solar power availability, illumination, and direct-to-Earth communications across the selected date range.
        </p>
        <button id="btn-run-initial-scan" class="btn-primary">⚡ Run Scan for Selected Range</button>
      </div>
      `:""}

      ${t&&!this.landingWindowsLoading?`
      <!-- Summary KPI Grid -->
      <div class="windows-kpi-grid">
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">TOTAL DAYS SCANNED</span>
          <span class="windows-kpi-val">${(e==null?void 0:e.total_days)??0} days</span>
          <span class="windows-kpi-sub">${(e==null?void 0:e.step_hours)??6}h step · ${((e==null?void 0:e.total_days)??0)*((e==null?void 0:e.samples_per_day)??4)} samples</span>
        </div>
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">SAFE LANDING DAYS</span>
          <span class="windows-kpi-val val-good">${(s==null?void 0:s.safe_days_count)??0} days</span>
          <span class="windows-kpi-sub">${Math.round(((s==null?void 0:s.safe_days_count)??0)/((e==null?void 0:e.total_days)||1)*100)}% of window (≥6h Sun &amp; Comms)</span>
        </div>
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">PRIME CONDITIONS</span>
          <span class="windows-kpi-val val-prime">${(s==null?void 0:s.excellent_days_count)??0} days</span>
          <span class="windows-kpi-sub">Composite safety rating ≥ 75</span>
        </div>
        <div class="windows-kpi-card windows-kpi-streak">
          <span class="windows-kpi-title">LONGEST SAFE STREAK</span>
          <span class="windows-kpi-val">${s!=null&&s.best_window_start?s.best_window_start:"None detected"}</span>
          ${s!=null&&s.best_window_start?`
          <button class="btn-preset-accent btn-sm" id="btn-apply-best-window" data-date="${s.best_window_start}" style="margin-top:4px;">
            🚀 Set as Mission Start
          </button>
          `:'<span class="windows-kpi-sub">No continuous streak</span>'}
        </div>
      </div>

      <!-- Multi-day Ribbon Heatmap -->
      <div class="panel-card" style="margin-bottom: 1.25rem;">
        <div class="card-header" style="margin-bottom: 0.5rem;">
          <h4 style="margin:0; font-size: 0.85rem; color: var(--text-primary);">Window Timeline Heatmap Overview</h4>
          <div class="windows-legend">
            <span><span class="legend-dot" style="background:#22c55e"></span> Excellent</span>
            <span><span class="legend-dot" style="background:#38bdf8"></span> Good</span>
            <span><span class="legend-dot" style="background:#f59e0b"></span> Marginal</span>
            <span><span class="legend-dot" style="background:#475569"></span> Poor</span>
          </div>
        </div>
        <div class="windows-heatmap-ribbon">
          ${i.map(r=>`
            <div class="heatmap-ribbon-seg"
                 style="background: ${c(r.safety_rating)}; flex: 1;"
                 title="${r.date}: ${r.safety_rating.toUpperCase()} (Score: ${r.safety_score}) · Sun: ${r.sunlight.full_hours}h · Earth: ${r.earth_los.full_hours}h">
            </div>
          `).join("")}
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); margin-top:4px; font-family:var(--font-mono);">
          <span>${e==null?void 0:e.start_date}</span>
          <span>${i.length} days scanned</span>
          <span>${e==null?void 0:e.end_date}</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="windows-filter-bar">
        <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">FILTER DAYS:</span>
        <div class="filter-pills-group">
          <button class="btn-filter-pill ${this.landingWindowsFilter==="all"?"active":""} btn-window-filter" data-filter="all">
            All Days (${i.length})
          </button>
          <button class="btn-filter-pill ${this.landingWindowsFilter==="safe"?"active":""} btn-window-filter" data-filter="safe">
            ✓ Safe Only (${(s==null?void 0:s.safe_days_count)??0})
          </button>
          <button class="btn-filter-pill ${this.landingWindowsFilter==="excellent"?"active":""} btn-window-filter" data-filter="excellent">
            🌟 Excellent Only (${(s==null?void 0:s.excellent_days_count)??0})
          </button>
        </div>
      </div>

      <!-- Days Grid -->
      <div class="windows-cards-grid">
        ${d.map(r=>`
          <div class="window-day-card ${r.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${a(r.date)}</span>
                <span class="window-day-iso">${r.date}</span>
              </div>
              <div>
                ${p(r.safety_rating,r.safety_score)}
              </div>
            </div>

            <div class="window-safe-row">
              ${r.is_safe_for_landing?'<span class="safe-pill pass">✓ Safe for Landing</span>':'<span class="safe-pill fail">⚠️ Marginal Comms/Sun</span>'}
              <span class="window-score-num">Safety: <strong>${r.safety_score}</strong>/100</span>
            </div>

            <div class="score-bar-track">
              <div class="score-bar-fill ${r.safety_rating}" style="width: ${Math.min(100,Math.max(0,r.safety_score))}%;"></div>
            </div>

            <div class="window-day-metrics-grid">
              <div class="window-metric-col">
                <span class="window-metric-header">☀️ SUNLIGHT</span>
                <div class="window-metric-row"><span>Full Sun:</span> <strong>${r.sunlight.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Penumbral:</span> <strong>${r.sunlight.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Darkness:</span> <strong>${r.sunlight.darkness_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${r.sunlight.avg_elevation_deg>=0?"+":""}${r.sunlight.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
              <div class="window-metric-col">
                <span class="window-metric-header">🌍 EARTH LOS</span>
                <div class="window-metric-row"><span>Full LOS:</span> <strong>${r.earth_los.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Partial:</span> <strong>${r.earth_los.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Occulted:</span> <strong>${r.earth_los.occulted_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${r.earth_los.avg_elevation_deg>=0?"+":""}${r.earth_los.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
            </div>

            <div class="window-card-action">
              <button class="btn-secondary btn-apply-window-date" data-date="${r.date}">
                ⏱ Set as Mission Start Date
              </button>
            </div>
          </div>
        `).join("")}
      </div>
      `:""}
    </div>
    `}drawTerrainCanvas(){setTimeout(()=>{const t=document.getElementById("site01-terrain-canvas");if(!t)return;this.terrainCtx=t.getContext("2d");const i=new Image;i.crossOrigin="anonymous";const e=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";i.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(i,0,0,512,512),this.selectedSite.pixelCoords)){const{px:s,py:a}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(s-14,a),this.terrainCtx.lineTo(s+14,a),this.terrainCtx.moveTo(s,a-14),this.terrainCtx.lineTo(s,a+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(s,a,6,0,2*Math.PI),this.terrainCtx.stroke()}},i.src=e},50)}wireEvents(){var le,k,te,me,Ge,ce,ie,de,Ce,$e,K,ge,Te,ve;(le=this.container.querySelector("#btn-close-workspace"))==null||le.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(m=>{m.addEventListener("click",w=>{const $=w.currentTarget;this.currentTab=$.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(m=>{m.addEventListener("click",w=>{const L=w.currentTarget.dataset.presetId,N=P.find(se=>se.id===L);N&&(this.selectedSite.name=N.name,this.selectedSite.designation=N.designation,this.selectedSite.latitudeDeg=N.lat,this.selectedSite.longitudeDeg=N.lon,this.selectedSite.elevationM=N.elev,this.updateSiteCoverageAndSample(),this.render())})}),(k=this.container.querySelector("#btn-jump-site01"))==null||k.addEventListener("click",()=>{const m=P[0];this.selectedSite.name=m.name,this.selectedSite.designation=m.designation,this.selectedSite.latitudeDeg=m.lat,this.selectedSite.longitudeDeg=m.lon,this.selectedSite.elevationM=m.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(m=>{m.addEventListener("click",w=>{const $=w.currentTarget;this.activeTerrainLayer=$.dataset.layer||"elev",this.render()})});const t=this.container.querySelector("#inp-lat"),i=this.container.querySelector("#inp-lon"),e=this.container.querySelector("#inp-elev"),s=()=>{if(!t||!i||!e)return;const m=parseFloat(t.value),w=parseFloat(i.value),$=parseFloat(e.value);!isNaN(m)&&!isNaN(w)&&(this.selectedSite.latitudeDeg=m,this.selectedSite.longitudeDeg=w,this.selectedSite.elevationM=isNaN($)?0:$,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};t==null||t.addEventListener("change",s),i==null||i.addEventListener("change",s),e==null||e.addEventListener("change",s);const a=this.container.querySelector("#site01-terrain-canvas");a==null||a.addEventListener("click",m=>{const w=a.getBoundingClientRect(),$=m.clientX-w.left,L=m.clientY-w.top,N=Math.round($/w.width*512),se=Math.round(L/w.height*512),{lonDeg:tt,latDeg:it}=gs(N,se);this.selectedSite.latitudeDeg=Math.round(it*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(tt*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${N}, ${se})`,this.updateSiteCoverageAndSample(),this.render()});const p=this.container.querySelector("#inp-start-date"),c=this.container.querySelector("#inp-start-time"),d=this.container.querySelector("#inp-duration-val"),r=this.container.querySelector("#inp-duration-unit"),l=this.container.querySelector("#inp-timestep"),h=()=>{p&&(this.timeline.startDate=p.value),c&&(this.timeline.startTime=c.value),d&&(this.timeline.durationValue=parseInt(d.value,10)||1),r&&(this.timeline.durationUnit=r.value),l&&(this.timeline.timeStepHours=parseFloat(l.value)||1),this.computeIsoTimestamps(),this.render()};p==null||p.addEventListener("change",h),c==null||c.addEventListener("change",h),d==null||d.addEventListener("change",h),r==null||r.addEventListener("change",h),l==null||l.addEventListener("change",h);const u=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const m=Math.round(this.timeline.timeStepHours*60),w=await ss({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:m,refinement_tolerance_sec:60});this.timelineResponse=w,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),w.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w.samples[0])}catch(m){this.timelineLoading=!1,this.timelineError=m.message??String(m),this.render()}};(te=this.container.querySelector("#btn-calc-timeline"))==null||te.addEventListener("click",u);const v=this.container.querySelector("#inp-timeline-scrubber");v==null||v.addEventListener("input",()=>{var $;const m=parseInt(v.value,10);this.scrubbedSampleIndex=m;const w=($=this.timelineResponse)==null?void 0:$.samples[m];w&&(this.updateScrubbedReadout(w),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w))});const y=this.container.querySelector("#inp-scen-name"),f=this.container.querySelector("#inp-scen-notes");y==null||y.addEventListener("input",()=>{this.scenarioName=y.value}),f==null||f.addEventListener("input",()=>{this.scenarioNotes=f.value});const S=async()=>{try{const m=this.container.querySelector("#btn-eval-spice-tab"),w=this.container.querySelector("#btn-eval-spice-footer");m&&(m.disabled=!0,m.textContent="Calculating SPICE..."),w&&(w.disabled=!0,w.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const $=await Jt({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=$,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(m){console.error("[MissionWorkspace] SPICE Calculation Error:",m),this.currentTab="readiness",this.render();const w=this.container.querySelector(".geometry-preview-area");w&&(w.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${m.message||m}</p>
            </div>
          `)}};(me=this.container.querySelector("#btn-eval-spice-tab"))==null||me.addEventListener("click",S),(Ge=this.container.querySelector("#btn-eval-spice-footer"))==null||Ge.addEventListener("click",S),(ce=this.container.querySelector("#btn-eval-horizon"))==null||ce.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const m=this.initialGeometry,[w,$]=await Promise.all([ts({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),is({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:m.sun.azimuth_deg,sun_elevation_deg:m.sun.elevation_deg,sun_distance_km:m.sun.distance_km,earth_azimuth_deg:m.earth.azimuth_deg,earth_elevation_deg:m.earth.elevation_deg,earth_distance_km:m.earth.distance_km})]);this.horizonProfile=w,this.horizonVisibility=$,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(m){this.horizonLoading=!1,this.horizonError=m.message??String(m),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const C=()=>{const m=this.toScenarioJSON(),w=new Blob([JSON.stringify(m,null,2)],{type:"application/json"}),$=URL.createObjectURL(w),L=document.createElement("a");L.href=$,L.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,L.click(),URL.revokeObjectURL($)};(ie=this.container.querySelector("#btn-export-scenario"))==null||ie.addEventListener("click",C),(de=this.container.querySelector("#btn-open-export-panel-footer"))==null||de.addEventListener("click",()=>this.openExportModal()),(Ce=this.container.querySelector("#btn-open-full-export-dialog"))==null||Ce.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(m=>{m.addEventListener("click",()=>{const w=m.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(w)})}),($e=this.container.querySelector("#btn-export-scenario-summary"))==null||$e.addEventListener("click",C);const M=this.container.querySelector("#inp-windows-start-date"),_=this.container.querySelector("#inp-windows-end-date");M==null||M.addEventListener("change",()=>{M.value&&(this.landingWindowsStartDate=M.value)}),_==null||_.addEventListener("change",()=>{_.value&&(this.landingWindowsEndDate=_.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(m=>{m.addEventListener("click",w=>{const L=w.currentTarget.dataset.preset;if(L==="30d"){const N=new Date(this.timeline.startDate+"T00:00:00Z"),se=new Date(N.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=N.toISOString().slice(0,10),this.landingWindowsEndDate=se.toISOString().slice(0,10)}else L==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):L==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(m=>{m.addEventListener("click",w=>{const L=w.currentTarget.dataset.filter;L&&(this.landingWindowsFilter=L,this.render())})});const U=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const m=await Qt({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=m,this.landingWindowsLoading=!1,this.render()}catch(m){this.landingWindowsLoading=!1,this.landingWindowsError=m.message??String(m),this.render()}};(K=this.container.querySelector("#btn-scan-landing-windows"))==null||K.addEventListener("click",U),(ge=this.container.querySelector("#btn-run-initial-scan"))==null||ge.addEventListener("click",U);const D=m=>{this.timeline.startDate=m,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(Te=this.container.querySelector("#btn-apply-best-window"))==null||Te.addEventListener("click",m=>{const $=m.currentTarget.dataset.date;$&&D($)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(m=>{m.addEventListener("click",w=>{const L=w.currentTarget.dataset.date;L&&D(L)})}),(ve=this.container.querySelector("#btn-apply-3d-view"))==null||ve.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const t=document.getElementById("horizon-polar-canvas");if(!t||!this.horizonProfile)return;const i=this.horizonProfile,e=t.getContext("2d");if(!e)return;const s=t.width,a=t.height,p=s/2,c=a/2,d=Math.min(s,a)/2-32;e.clearRect(0,0,s,a),e.fillStyle="#0a0f1e",e.fillRect(0,0,s,a);const r=Math.max(...i.profile.map(v=>v.horizon_elevation_deg),10);[0,r*.25,r*.5,r*.75,r].forEach(v=>{const y=d*(1-v/r);e.beginPath(),e.arc(p,c,Math.max(y,1),0,2*Math.PI),e.strokeStyle="rgba(148,163,184,0.15)",e.lineWidth=1,e.stroke(),v>0&&(e.fillStyle="rgba(148,163,184,0.5)",e.font="10px Inter, sans-serif",e.fillText(`${v.toFixed(1)}°`,p+4,c-y+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([v,y])=>{const f=(Number(y)-90)*Math.PI/180;e.beginPath(),e.moveTo(p,c),e.lineTo(p+d*Math.cos(f),c+d*Math.sin(f)),e.strokeStyle="rgba(148,163,184,0.2)",e.lineWidth=1,e.stroke(),e.fillStyle="#94a3b8",e.font="bold 11px Inter, sans-serif",e.fillText(String(v),p+(d+16)*Math.cos(f)-4,c+(d+16)*Math.sin(f)+4)}),e.beginPath(),i.profile.forEach((v,y)=>{const f=(v.azimuth_deg-90)*Math.PI/180,S=d*(1-Math.min(v.horizon_elevation_deg,r)/r),C=p+S*Math.cos(f),M=c+S*Math.sin(f);y===0?e.moveTo(C,M):e.lineTo(C,M)}),e.closePath(),e.fillStyle="rgba(56,189,248,0.15)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=2,e.stroke();const u=this.horizonVisibility;if(u){const v=(y,f,S,C)=>{const M=(y-90)*Math.PI/180,_=d*(1-Math.max(0,Math.min(f,r))/r),U=p+_*Math.cos(M),D=c+_*Math.sin(M);e.beginPath(),e.arc(U,D,8,0,2*Math.PI),e.fillStyle=S,e.fill(),e.fillStyle="#fff",e.font="bold 10px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(C,U,D),e.textAlign="start",e.textBaseline="alphabetic"};v(u.sun.azimuth_deg,u.sun.geometric_elevation_deg,"#f59e0b","☀"),v(u.earth.azimuth_deg,u.earth.geometric_elevation_deg,"#3b82f6","🌍")}e.beginPath(),e.arc(p,c,4,0,2*Math.PI),e.fillStyle="#38bdf8",e.fill()}updateScrubbedReadout(t){var d,r;const i=this.container.querySelector("#scrubbed-time-val");i&&(i.textContent=t.timestamp_utc);const e=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},s=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},a=this.container.querySelector("#scrubbed-sun-state");a&&(a.innerHTML=e(t.sun.visibility_state));const p=this.container.querySelector("#scrubbed-earth-state");p&&(p.innerHTML=s(t.earth.visibility_state));const c=this.container.querySelector("#scrubbed-conditions-panel");if(c){const l=(d=c.querySelectorAll(".scrubbed-col")[0])==null?void 0:d.querySelectorAll(".scrubbed-val-row strong");if(l&&l.length>=4){l[0].textContent=`${t.sun.azimuth_deg.toFixed(2)}°`,l[1].textContent=`${t.sun.elevation_deg.toFixed(2)}°`,l[2].textContent=t.sun.terrain_horizon_elevation_deg!==null?`${t.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=t.sun.angular_clearance_deg;l[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",l[3].style.color=(u??0)>=0?"#22c55e":"#ef4444"}const h=(r=c.querySelectorAll(".scrubbed-col")[1])==null?void 0:r.querySelectorAll(".scrubbed-val-row strong");if(h&&h.length>=4){h[0].textContent=`${t.earth.azimuth_deg.toFixed(2)}°`,h[1].textContent=`${t.earth.elevation_deg.toFixed(2)}°`,h[2].textContent=t.earth.terrain_horizon_elevation_deg!==null?`${t.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=t.earth.angular_clearance_deg;h[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",h[3].style.color=(u??0)>=0?"#3b82f6":"#ef4444"}}}}class fs{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new ti),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(t){this.onInspectSiteOnGlobe=t}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:P[0].lat,longitudeDeg:P[0].lon,elevationM:P[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:P[3].lat,longitudeDeg:P[3].lon,elevationM:P[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(t){var s,a,p,c;const i=P.find(d=>d.id===t)||P[0],e=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${e} · ${i.name}`,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elev,instrumentHeightM:2,startDate:((s=this.scenarios[0])==null?void 0:s.startDate)||"2026-10-16",startTime:((a=this.scenarios[0])==null?void 0:a.startTime)||"12:00:00",endDate:((p=this.scenarios[0])==null?void 0:p.endDate)||"2026-10-23",endTime:((c=this.scenarios[0])==null?void 0:c.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(t){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(i=>i.id!==t),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const t=this.scenarios.map(e=>({id:e.id,name:e.name,latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:`${e.startDate}T${e.startTime}Z`,end_utc:`${e.endDate}T${e.endTime}Z`,step_minutes:e.stepMinutes})),i=await as({scenarios:t,constraints:this.constraints});this.comparisonResult=i}catch(t){this.errorMessage=t.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
    <div class="mission-dialog comparison-dialog">
      <div class="mission-header">
        <div class="mission-title-group">
          <div class="mission-kicker">NASA SPACE APPS 2026 · PHASE 5 SCIENTIFIC COMPARISON</div>
          <h2 class="mission-title">Landing Site &amp; Mission Date Comparison</h2>
        </div>
        <div class="mission-header-actions">
          <span class="readiness-pill ready">${this.scenarios.length} SCENARIOS CONFIGURED</span>
          <button id="btn-close-comparison" class="modal-close-btn" title="Close Comparison">✕</button>
        </div>
      </div>

      <div class="comparison-scroll-content">
        <!-- Configuration Bar -->
        <section class="comparison-config-section">
          <div class="section-title-bar">
            <div>
              <h3 class="config-subtitle">Candidate Scenario Setup</h3>
              <p class="config-desc">Configure at least two landing scenarios. Compare distinct candidate sites over identical mission windows, or test the same location across different seasons.</p>
            </div>
            <div class="config-actions">
              <button id="btn-add-candidate" class="btn-secondary" title="Add another scenario to compare">+ Add Scenario</button>
              <button id="btn-sync-dates" class="btn-secondary" title="Synchronize all scenarios to Scenario 1 dates">⟲ Sync Dates</button>
              <button id="btn-run-comparison" class="btn-primary" ${this.isLoading?"disabled":""}>
                ${this.isLoading?"⏳ Computing Ephemerides…":"⚖️ Run Comparison Analysis"}
              </button>
            </div>
          </div>

          <div class="scenario-cards-grid">
            ${this.scenarios.map((t,i)=>this.renderScenarioCard(t,i)).join("")}
          </div>
        </section>

        <!-- Constraints Panel -->
        <section class="constraints-section">
          <div class="collapsible-header">
            <h4>⚙️ User-Defined Evaluation Constraints</h4>
            <span class="constraints-hint">Thresholds are scientifically evaluated against computed results (Met, Unmet, or Unevaluable)</span>
          </div>
          <div class="constraints-grid">
            <div class="constraint-input-box">
              <label>Min Solar Illumination (%):</label>
              <input type="number" id="constraint-min-sun" min="0" max="100" step="5" value="${this.constraints.min_sunlight_percent??""}" placeholder="e.g. 50">
            </div>
            <div class="constraint-input-box">
              <label>Min Direct Earth LOS (%):</label>
              <input type="number" id="constraint-min-earth" min="0" max="100" step="5" value="${this.constraints.min_earth_los_percent??""}" placeholder="e.g. 70">
            </div>
            <div class="constraint-input-box">
              <label>Max Terrain Slope (°):</label>
              <input type="number" id="constraint-max-slope" min="0" max="45" step="1" value="${this.constraints.max_slope_deg??""}" placeholder="e.g. 12">
            </div>
            <div class="constraint-input-box">
              <label>Max Continuous Darkness (hrs):</label>
              <input type="number" id="constraint-max-dark" min="0" max="720" step="6" value="${this.constraints.max_continuous_darkness_hours??""}" placeholder="e.g. 24">
            </div>
          </div>
        </section>

        ${this.errorMessage?`<div class="error-banner">⚠️ ${this.errorMessage}</div>`:""}

        <!-- Results Dashboard -->
        ${this.comparisonResult?this.renderComparisonResults():this.renderPlaceholder()}
      </div>

      <div class="mission-footer">
        <div class="footer-note">
          <span class="disclaimer-icon">⚠️</span>
          <span>Scientific comparison uses topocentric SPICE DE440s ephemerides and NASA LOLA 5m/px DEM terrain relief. Low slope or high illumination does not guarantee landing safety.</span>
        </div>
        <div class="footer-actions">
          <button id="btn-export-comparison-panel" class="btn-highlight-compare" title="Export Scientific Comparison Report (PDF, CSV, JSON)">
            📤 Export Comparison Report
          </button>
        </div>
      </div>
    </div>
    `,this.wireEvents(),this.comparisonResult&&this.drawSynchronizedTimelines()}renderScenarioCard(t,i){const e=t.latitudeDeg<=-89.4&&t.latitudeDeg>=-89.55&&t.longitudeDeg>=221&&t.longitudeDeg<=224;return`
    <div class="scenario-setup-card" data-id="${t.id}">
      <div class="scenario-card-header">
        <span class="scenario-number-tag">SCENARIO ${i+1}</span>
        <button class="btn-remove-scenario" data-id="${t.id}" title="Remove this candidate" ${this.scenarios.length<=2?"disabled":""}>✕</button>
      </div>

      <div class="scenario-input-group">
        <label>Scenario Label:</label>
        <input type="text" class="input-sc-name" data-id="${t.id}" value="${t.name}">
      </div>

      <div class="scenario-input-group">
        <label>Quick Preset:</label>
        <select class="select-preset" data-id="${t.id}">
          <option value="">— Select Candidate Landing Site —</option>
          ${P.map(s=>`<option value="${s.id}" ${s.name.includes(t.name.split("·")[0].trim())?"selected":""}>${s.name} (${s.lat}°S, ${s.lon}°E)</option>`).join("")}
        </select>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Latitude (°S):</label>
          <input type="number" class="input-lat" data-id="${t.id}" step="0.001" min="-90" max="90" value="${t.latitudeDeg}">
        </div>
        <div class="scenario-input-group">
          <label>Longitude (°E):</label>
          <input type="number" class="input-lon" data-id="${t.id}" step="0.01" min="-180" max="360" value="${t.longitudeDeg}">
        </div>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Elevation (m):</label>
          <input type="number" class="input-elev" data-id="${t.id}" step="10" value="${t.elevationM}">
        </div>
        <div class="scenario-input-group">
          <label>Sampling (min):</label>
          <select class="input-step" data-id="${t.id}">
            <option value="15" ${t.stepMinutes===15?"selected":""}>15 min</option>
            <option value="30" ${t.stepMinutes===30?"selected":""}>30 min</option>
            <option value="60" ${t.stepMinutes===60?"selected":""}>60 min</option>
          </select>
        </div>
      </div>

      <div class="dates-dual-grid">
        <div class="scenario-input-group">
          <label>Start UTC:</label>
          <input type="date" class="input-start-date" data-id="${t.id}" value="${t.startDate}">
        </div>
        <div class="scenario-input-group">
          <label>End UTC:</label>
          <input type="date" class="input-end-date" data-id="${t.id}" value="${t.endDate}">
        </div>
      </div>

      <div class="card-footer-status">
        <span class="dem-tag ${e?"inside":"outside"}">
          ${e?"✓ Site 01 5m DEM Covered":"⚠ Outside High-Res DEM Footprint"}
        </span>
        <button class="btn-inspect-globe" data-id="${t.id}" title="Focus camera on 3D Moon to view site">🎯 View on Moon</button>
      </div>
    </div>
    `}renderPlaceholder(){return`
    <div class="comparison-placeholder">
      <div class="placeholder-icon">⚖️</div>
      <h3>Ready for Side-by-Side Comparison</h3>
      <p>Configure your candidate sites and click <strong>Run Comparison Analysis</strong> above. The engine will calculate time-dependent solar illumination, potential Direct-to-Earth line of sight, slope distributions, and evaluate all engineering constraints using verified SPICE and LOLA DEM data.</p>
    </div>
    `}renderComparisonResults(){if(!this.comparisonResult)return"";const t=this.comparisonResult;return`
    <div class="results-dashboard-wrapper">
      <div class="dashboard-header-bar">
        <h3>Side-by-Side Comparison Dashboard</h3>
        <span class="badge-blue">${t.compared_count} Scenarios Evaluated</span>
      </div>

      <!-- Comparison Metrics Cards Table -->
      <div class="comparison-table-responsive">
        <table class="comparison-data-table">
          <thead>
            <tr>
              <th>Candidate Metric</th>
              ${t.scenarios.map(i=>`<th>${i.scenario_name}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-header">📍 Selenographic Location</td>
              ${t.scenarios.map(i=>`
                <td>
                  <strong>${pe(i.inputs.latitude_deg,i.inputs.longitude_deg)}</strong>
                  <br><button class="btn-mini-inspect" data-id="${i.scenario_id}">🎯 Focus 3D Moon</button>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">⏱ Mission Interval</td>
              ${t.scenarios.map(i=>`
                <td>
                  <span class="mono-sub">${i.inputs.start_utc.split("T")[0]} → ${i.inputs.end_utc.split("T")[0]}</span>
                  <br><span class="muted-text">(${i.timeline_result.mission_scenario.total_duration_hours.toFixed(0)} hours)</span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">🏔 Topographic DEM Coverage</td>
              ${t.scenarios.map(i=>`
                <td>
                  <span class="status-badge ${i.terrain_statistics.coverage_available?"badge-green":"badge-slate"}">
                    ${i.terrain_statistics.coverage_available?"NASA LOLA Site 01 (5 m/px)":"Outside DEM (Sphere Only)"}
                  </span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">☀️ Total Solar Illumination</td>
              ${t.scenarios.map(i=>{const e=i.timeline_result.summary.sunlight,s=(e.full_sunlight_percent+e.partial_sunlight_percent).toFixed(1),a=(e.full_sunlight_hours+e.partial_sunlight_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${s}%; background: #f59e0b;"></div></div>
                    <span class="muted-text">Full: ${e.full_sunlight_percent}% · Partial: ${e.partial_sunlight_percent}%</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">🌑 Continuous Darkness Max</td>
              ${t.scenarios.map(i=>{const e=i.timeline_result.summary.sunlight;return`
                  <td>
                    <strong>${e.max_continuous_darkness_hours.toFixed(1)} hrs</strong>
                    <br><span class="muted-text">Transitions: ${e.transition_count}</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📡 Direct-to-Earth LOS Clearance</td>
              ${t.scenarios.map(i=>{const e=i.timeline_result.summary.earth_los,s=(e.full_disc_los_percent+e.partial_disc_los_percent).toFixed(1),a=(e.full_disc_los_hours+e.partial_disc_los_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${s}%; background: #38bdf8;"></div></div>
                    <span class="muted-text">Full disc: ${e.full_disc_los_percent}% · Max window: ${e.max_continuous_los_hours.toFixed(1)}h</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📐 Terrain Slope Statistics</td>
              ${t.scenarios.map(i=>{const e=i.terrain_statistics.slope;return e?`
                  <td>
                    <strong>${e.mean_deg.toFixed(1)}° mean</strong> (max ${e.max_deg.toFixed(1)}°)
                    <br><span class="muted-text">Std: ±${e.std_deg.toFixed(1)}° · Center: ${e.point_deg.toFixed(1)}°</span>
                  </td>
                `:'<td><span class="badge-slate">Unavailable (No DEM)</span><br><span class="muted-text">Site outside 16x16 km tile</span></td>'}).join("")}
            </tr>
            <tr>
              <td class="row-header">🎯 Elevation &amp; Uncertainty</td>
              ${t.scenarios.map(i=>{const e=i.terrain_statistics.elevation,s=i.terrain_statistics.uncertainty;return e?`
                  <td>
                    <strong>${e.mean_m.toFixed(1)} m</strong> <span class="muted-text">(range ${e.min_m.toFixed(0)}..${e.max_m.toFixed(0)}m)</span>
                    <br><span class="muted-text">Error: ±${s?s.mean_m.toFixed(2):"—"} m (LOLA)</span>
                  </td>
                `:`<td>${i.inputs.elevation_m.toFixed(1)} m <span class="muted-text">(User/Sphere)</span><br><span class="badge-slate">Uncertainty: Unavailable</span></td>`}).join("")}
            </tr>
            <tr>
              <td class="row-header">📋 Constraint Satisfaction</td>
              ${t.scenarios.map(i=>{const e=i.constraints_evaluation,s=e.all_met;return`
                  <td>
                    <span class="status-badge ${s?"badge-green":e.unmet_count>0?"badge-red":"badge-amber"}">
                      ${s?"✓ ALL CONSTRAINTS MET":`${e.met_count} Met / ${e.unmet_count} Unmet / ${e.unevaluable_count} Unevaluable`}
                    </span>
                    <div class="constraint-mini-list">
                      ${e.items.map(a=>`
                        <div class="constraint-mini-row ${a.status}">
                          <span class="mini-status">${a.status==="met"?"✓":a.status==="unmet"?"✗":"❓"}</span>
                          <span>${a.label}: <strong>${a.actual}</strong> (${a.threshold})</span>
                        </div>
                      `).join("")}
                    </div>
                  </td>
                `}).join("")}
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Synchronized Multi-Scenario Timeline View -->
      <section class="synchronized-timelines-section">
        <div class="timeline-header-group">
          <h4>📊 Synchronized Mission Timelines &amp; Ephemeris Comparison</h4>
          <span class="timeline-sub">Compare hourly Sun and Earth elevation and terrain skylines across candidates</span>
        </div>
        <div class="timeline-canvas-container">
          <canvas id="synced-timeline-canvas" width="1000" height="260"></canvas>
        </div>
        <div class="timeline-legend">
          <span class="legend-item"><span class="legend-dot" style="background: #f59e0b;"></span> Solar Illumination Window</span>
          <span class="legend-item"><span class="legend-dot" style="background: #38bdf8;"></span> Earth LOS Window</span>
          <span class="legend-item"><span class="legend-dot" style="background: #64748b;"></span> Darkness / Occulted</span>
          <span class="legend-item"><span class="legend-dot" style="background: #9333ea;"></span> Unevaluable (Outside DEM)</span>
        </div>
      </section>

      <!-- Transparent Multi-Criteria Ranking & Scientific Integrity -->
      <section class="ranking-section">
        <div class="ranking-header">
          <h4>🏆 Transparent Multi-Criteria Evaluation</h4>
          <span class="ranking-weights-info">Normalized Weights: Sunlight (35%) · Earth LOS (25%) · Low Slope (20%) · Min Darkness (20%)</span>
        </div>

        <div class="ranking-grid">
          ${t.ranking.ranking.map(i=>`
            <div class="ranking-card ${i.rank===1?"leader":""}">
              <div class="rank-tag">RANK ${i.rank}</div>
              <h5 class="rank-name">${i.scenario_name}</h5>
              <div class="rank-score-val">${i.composite_score.toFixed(1)} <span class="score-max">/ 100</span></div>

              ${i.has_unevaluable_metrics?`
                <div class="unevaluable-warning-box">
                  ⚠️ Contains unevaluable metrics:
                  <ul>
                    ${i.unevaluable_reasons.map(e=>`<li>${e}</li>`).join("")}
                  </ul>
                </div>
              `:`
                <div class="eval-success-note">✓ All criteria evaluated against 5m DEM &amp; SPICE ephemerides</div>
              `}

              <div class="criteria-score-breakdown">
                ${Object.entries(i.criteria_scores).map(([e,s])=>`
                  <div class="crit-row">
                    <span>${e.replace(/_/g," ")}:</span>
                    <span>${s!==null?`${s.toFixed(1)} pts`:'<span class="badge-slate">N/A</span>'}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="scientific-integrity-banner">
          <div class="integrity-title">🛡️ Scientific Integrity &amp; Operational Caveat</div>
          <p>${t.ranking.disclaimer}</p>
        </div>
      </section>
    </div>
    `}drawSynchronizedTimelines(){const t=document.getElementById("synced-timeline-canvas");if(!t||!this.comparisonResult)return;const i=t.getContext("2d");if(!i)return;const e=t.width,s=t.height;i.clearRect(0,0,e,s);const a=this.comparisonResult.scenarios;if(a.length===0)return;const p=Math.floor((s-40)/a.length);i.fillStyle="#94a3b8",i.font="10px JetBrains Mono, monospace",i.fillText("MISSION TIMELINE EPOCHS",15,18),a.forEach((c,d)=>{const r=30+d*p,l=p-12;i.fillStyle="#e2e8f0",i.font="11px Inter, sans-serif",i.fillText(`${c.scenario_name}`,15,r-4),i.fillStyle="rgba(15, 23, 42, 0.6)",i.fillRect(15,r,e-30,l);const h=c.timeline_result.sun_windows,u=Date.parse(c.inputs.start_utc),y=Date.parse(c.inputs.end_utc)-u;y>0&&(h.forEach(S=>{const C=Date.parse(S.start_utc),M=Date.parse(S.end_utc),_=15+(C-u)/y*(e-30),U=15+(M-u)/y*(e-30),D=Math.max(1,U-_);S.state==="full_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.9)":S.state==="partial_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.5)":S.state==="total_darkness"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(_,r,D,l/2-1)}),c.timeline_result.earth_windows.forEach(S=>{const C=Date.parse(S.start_utc),M=Date.parse(S.end_utc),_=15+(C-u)/y*(e-30),U=15+(M-u)/y*(e-30),D=Math.max(1,U-_);S.state==="full_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.9)":S.state==="centre_only_los"||S.state==="partial_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.5)":S.state==="occulted"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(_,r+l/2+1,D,l/2-2)})),i.strokeStyle="rgba(148, 163, 184, 0.15)",i.strokeRect(15,r,e-30,l)})}wireEvents(){var t,i,e,s,a,p,c,d;(t=document.getElementById("btn-close-comparison"))==null||t.addEventListener("click",()=>{this.close()}),(i=document.getElementById("btn-add-candidate"))==null||i.addEventListener("click",()=>{this.addScenario()}),(e=document.getElementById("btn-sync-dates"))==null||e.addEventListener("click",()=>{if(this.scenarios.length>=2){const r=this.scenarios[0];for(let l=1;l<this.scenarios.length;l++)this.scenarios[l].startDate=r.startDate,this.scenarios[l].startTime=r.startTime,this.scenarios[l].endDate=r.endDate,this.scenarios[l].endTime=r.endTime;this.render()}}),(s=document.getElementById("btn-run-comparison"))==null||s.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(r=>{r.addEventListener("click",l=>{const h=l.currentTarget.getAttribute("data-id");h&&this.removeScenario(h)})}),this.container.querySelectorAll(".select-preset").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=h.getAttribute("data-id"),v=h.value,y=P.find(f=>f.id===v);if(u&&y){const f=this.scenarios.find(S=>S.id===u);f&&(f.name=y.name,f.latitudeDeg=y.lat,f.longitudeDeg=y.lon,f.elevationM=y.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(r=>{r.addEventListener("input",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.name=h.value)})}),this.container.querySelectorAll(".input-lat").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.latitudeDeg=parseFloat(h.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.longitudeDeg=parseFloat(h.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.elevationM=parseFloat(h.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.startDate=h.value)})}),this.container.querySelectorAll(".input-end-date").forEach(r=>{r.addEventListener("change",l=>{const h=l.currentTarget,u=this.scenarios.find(v=>v.id===h.getAttribute("data-id"));u&&(u.endDate=h.value)})}),(a=document.getElementById("constraint-min-sun"))==null||a.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.min_sunlight_percent=l!==""?parseFloat(l):null}),(p=document.getElementById("constraint-min-earth"))==null||p.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.min_earth_los_percent=l!==""?parseFloat(l):null}),(c=document.getElementById("constraint-max-slope"))==null||c.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.max_slope_deg=l!==""?parseFloat(l):null}),(d=document.getElementById("constraint-max-dark"))==null||d.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.max_continuous_darkness_hours=l!==""?parseFloat(l):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(r=>{r.addEventListener("click",l=>{const h=l.currentTarget.getAttribute("data-id"),u=this.scenarios.find(v=>v.id===h);u&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:u.name,lat:u.latitudeDeg,lon:u.longitudeDeg,elevationM:u.elevationM})})})}}const _e=1.6,oi=1737.4,pt=-8.9815,ri=10.6855,ys=ri-pt,jt=512,Ss=66825;let V=null,R,ue=null,F=null,re=null,J=null,Ae=!0,Ke=.6,Oe=!1,Ne=!1,ze=null,Ht=null,Ye=null,B=null;function Je(o,t,i=1.2){B={startPos:q.position.clone(),targetPos:o.clone(),startLook:z.target.clone(),targetLook:t.clone(),startTime:performance.now(),duration:i*1e3}}const je=document.createElement("canvas"),ws=document.getElementById("app");ws.appendChild(je);const W=new Ai({canvas:je,antialias:!0,powerPreference:"high-performance"});W.setSize(window.innerWidth,window.innerHeight);W.setPixelRatio(Math.min(window.devicePixelRatio,2));W.outputColorSpace=Wt;W.toneMapping=Oi;W.toneMappingExposure=1;W.shadowMap.enabled=!1;const he=new Ni;he.background=new Bt(Ss);const q=new Ri(38,window.innerWidth/window.innerHeight,.01,500);q.position.set(0,.2,4);const z=new es(q,W.domElement);z.enableDamping=!0;z.dampingFactor=.06;z.minDistance=1.8;z.maxDistance=14;z.enablePan=!1;z.rotateSpeed=.45;z.zoomSpeed=.7;let ut=!1;z.addEventListener("start",()=>{ut=!0});z.addEventListener("end",()=>{ut=!1});const xs=new Fi(657944,.06);he.add(xs);const He=new Vt(16775408,3.2);He.position.set(5,1.5,3);he.add(He);const ht=new Vt(3359914,.08);ht.position.set(-5,0,-3);he.add(ht);const qe=new zi(W),Es=new Ui(he,q);qe.addPass(Es);const li=new ji(new O(window.innerWidth,window.innerHeight),.12,.5,.88);qe.addPass(li);const _s={uniforms:{tDiffuse:{value:null},offset:{value:.9},darkness:{value:1.3}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float vig = smoothstep(offset, offset - 0.5, dist * (darkness + offset));
      color.rgb *= vig;
      gl_FragColor = color;
    }
  `},Ms=new Hi(_s);qe.addPass(Ms);function Cs(){[{count:1500,rMin:60,rMax:90,size:.04,opacity:.5},{count:2e3,rMin:100,rMax:150,size:.06,opacity:.7},{count:500,rMin:40,rMax:60,size:.12,opacity:.9}].forEach(({count:t,rMin:i,rMax:e,size:s,opacity:a})=>{const p=new Float32Array(t*3);for(let r=0;r<t;r++){const l=Math.random()*Math.PI*2,h=Math.acos(2*Math.random()-1),u=i+Math.random()*(e-i);p[r*3]=u*Math.sin(h)*Math.cos(l),p[r*3+1]=u*Math.sin(h)*Math.sin(l),p[r*3+2]=u*Math.cos(h)}const c=new we;c.setAttribute("position",new Gi(p,3));const d=new Wi({size:s,color:14544639,transparent:!0,opacity:a,sizeAttenuation:!0});he.add(new Bi(c,d))})}Cs();const Ue=document.createElement("div");Ue.id="loading-overlay";Ue.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing high-fidelity lunar model…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(Ue);function oe(o,t){const i=document.getElementById("load-status");if(i&&(i.textContent=o),t!==void 0){const e=document.getElementById("progress-fill");e&&(e.style.width=`${Math.min(100,t)}%`)}}function $s(){Ue.style.opacity="0",setTimeout(()=>Ue.remove(),800)}const Ts=2;function ks(o,t){return new Zi({map:o,normalMap:t||void 0,normalScale:t?new O(.45,.45):void 0,roughness:.95,metalness:0,envMapIntensity:0})}function Ls(o,t,i,e,s){const a=(o%1+1)%1*(i-1),p=dt.clamp(1-t,0,1)*(e-1),c=Math.floor(a),d=(c+1)%i,r=Math.floor(p),l=Math.min(r+1,e-1),h=a-c,u=p-r,v=s[(r*i+c)*4]/255,y=s[(r*i+d)*4]/255,f=s[(l*i+c)*4]/255,S=s[(l*i+d)*4]/255,C=v*(1-h)+y*h,M=f*(1-h)+S*h,_=C*(1-u)+M*u;return pt+_*ys}function Ds(o,t){const i=o.attributes.position,e=o.attributes.uv,s=i.count,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const p=a.getContext("2d");p.drawImage(t,0,0);const d=p.getImageData(0,0,a.width,a.height).data;Ht=new Float32Array(i.array.length),Ht.set(i.array),ze=new Float32Array(s),Ye=new Float32Array(i.array.length);const r=new E,l=new E,h=Ts;for(let u=0;u<s;u++){r.fromBufferAttribute(i,u);const v=e.getX(u),y=e.getY(u),f=Ls(v,y,a.width,a.height,d);ze[u]=f;const S=f/oi*_e;l.copy(r).normalize();const C=r.clone().add(l.clone().multiplyScalar(S));Ye[u*3]=C.x,Ye[u*3+1]=C.y,Ye[u*3+2]=C.z,r.add(l.multiplyScalar(S*h)),i.setXYZ(u,r.x,r.y,r.z)}i.needsUpdate=!0,o.computeVertexNormals(),o.computeBoundingSphere()}function Ps(o){return o.colorSpace=Wt,o.anisotropy=W.capabilities.getMaxAnisotropy(),o.minFilter=Xi,o.magFilter=Ji,o.generateMipmaps=!0,o.wrapS=Yt,o.wrapT=Zt,o.needsUpdate=!0,o}const ci=new qi;async function Is(){const o=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,t=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K (Fallback)",is4K:!1},{url:o,label:"NASA LROC 2K (Fallback)",is4K:!1}];let i=null;for(const e of t)try{oe(`Loading ${e.label}…`,e.is4K?12:25);const s=await new Promise((a,p)=>{ci.load(e.url,c=>a(c),void 0,c=>p(c))});return Ps(s),console.log(`[LUNAOPS] Successfully loaded color texture: ${e.label} (${e.url})`),{texture:s,label:e.label,is4K:e.is4K}}catch(s){i=s,console.warn(`[LUNAOPS] Could not load ${e.label} from ${e.url}. Trying next fallback…`,s)}throw new Error(`[LUNAOPS] All color texture candidates failed to load: ${i}`)}async function As(){const{texture:o,label:t,is4K:i}=await Is();oe("Loading DEM normal map…",35);let e=null;try{e=await new Promise((p,c)=>{ci.load("/generated/ldem_normal_map_half.png",d=>{d.colorSpace=At,d.anisotropy=W.capabilities.getMaxAnisotropy(),d.wrapS=Yt,d.wrapT=Zt,p(d)},void 0,c)})}catch{console.warn("[LUNAOPS] Normal map not available — craters will lack micro-detail")}oe("Loading elevation displacement data…",55);let s=null,a=null;try{a=await new Promise((p,c)=>{const d=new Image;d.crossOrigin="anonymous",d.onload=()=>p(d),d.onerror=c,d.src="/generated/ldem_displacement_8bit.png"}),s=new Yi(a),s.colorSpace=At,s.needsUpdate=!0}catch{console.warn("[LUNAOPS] Displacement map not available — using smooth sphere")}return{color:o,colorLabel:t,is4K:i,normal:e,displacement:s,displacementImg:a}}let di={is4K:!0};async function Os(){const o=await As();di={label:o.colorLabel,is4K:o.is4K};const t=document.getElementById("telem-color");t&&(t.textContent=o.is4K?"NASA LROC 4K":"NASA LROC 2K (Fallback)"),oe("Generating high-polygon sphere geometry…",70),await new Promise(c=>setTimeout(c,50));const i=new xe(_e,jt,jt/2);oe("Applying NASA elevation data…",80),await new Promise(c=>setTimeout(c,50)),o.displacementImg&&Ds(i,o.displacementImg),oe("Applying surface materials…",92),await new Promise(c=>setTimeout(c,50));const e=ks(o.color,o.normal);V=new G(i,e),V.castShadow=!1,V.receiveShadow=!1,R=new Re,R.rotation.x=dt.degToRad(6.68),R.add(V),ue=new us(_e),ue.setOnSelectSite(c=>{Xe(c.lat,c.lon,`${c.name} · ${c.designation}`);const d=document.getElementById("readout-coords"),r=document.getElementById("readout-elev");d&&(d.textContent=`${Math.abs(c.lat).toFixed(2)}° S, ${c.lon.toFixed(1)}° E`),r&&(r.textContent=`${c.elevationM>=0?"+":""}${(c.elevationM/1e3).toFixed(2)} km`)}),R.add(ue.group),he.add(R);const s=new xe(_e*1.015,64,32),a=new Kt({transparent:!0,side:Vi,depthWrite:!1,blending:Se,uniforms:{glowColor:{value:new Bt(8952251)},viewVector:{value:q.position},intensity:{value:.35}},vertexShader:`
      uniform vec3 viewVector;
      varying float vIntensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vViewDir = normalize(normalMatrix * viewVector);
        vIntensity = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.5);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform float intensity;
      varying float vIntensity;
      void main() {
        float alpha = vIntensity * intensity;
        gl_FragColor = vec4(glowColor, alpha);
      }
    `}),p=new G(s,a);R.add(p),oe("Ready",100),setTimeout($s,500)}Os().catch(o=>{console.error("[LUNAOPS] Build error:",o),oe("Failed to initialize — see console",0)});const mt=document.createElement("div");mt.id="ui-layer";mt.innerHTML=`
<div class="hud-top">
  <div class="brand">
    <div class="brand-header-row">
      <span class="brand-dot"></span>
      <h1 class="title">LUNAOPS</h1>
    </div>
    <p class="subtitle">SELENE LABS · NASA Space Apps 2026</p>
    <div class="mission-badge"><span class="mission-badge-dot"></span>MISSION FOCUS: LUNAR SOUTH POLE LANDING SAFETY</div>
    <div class="data-readout" id="data-readout">
      <span class="readout-label">TARGET</span>
      <span class="readout-value" id="active-site-display">Artemis Site 01 (Ridge)</span>
      <span class="readout-label">COORDINATES</span>
      <span class="readout-value" id="readout-coords">—</span>
      <span class="readout-label">ELEVATION</span>
      <span class="readout-value" id="readout-elev">—</span>
    </div>
  </div>
  <div class="controls-panel">
    <div class="controls-group">
      <button id="btn-new-mission" title="Launch Mission Scenario Configuration &amp; Landing Site Selection">🚀 New Mission Analysis</button>
      <button id="btn-compare-sites" class="btn-highlight-compare" title="Open Candidate-Site Comparison Workspace (Side-by-side analysis &amp; ranking)">⚖️ Compare Sites</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-south-pole" title="Focus camera directly on Lunar South Pole &amp; Artemis Candidate Sites">🎯 South Pole</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-auto" title="Toggle auto-rotation">⏸ Auto-Rotate</button>
      <button id="btn-sun" title="Animate solar terminator position">☀ Sun Cycle</button>
      <button id="btn-reset" title="Reset camera to default view">⟲ Reset</button>
    </div>
  </div>
</div>
<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO/LOLA</span>
    <span class="telem-item"><span class="telem-label">COLOR</span> <span id="telem-color">${di.is4K?"NASA LROC 4K":"NASA LROC 2K (Fallback)"}</span></span>
    <span class="telem-item"><span class="telem-label">RES</span> 16 px/° DEM</span>
    <span class="telem-item"><span class="telem-label">ELEV</span> ${pt.toFixed(1)} to +${ri.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">REF</span> ${oi} km</span>
    <span class="telem-item"><span class="telem-label">SUN AZ/EL</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Hover or click Moon surface for coordinates &amp; elevation &nbsp;|&nbsp; <a href="/" style="color:var(--cyan-400);text-decoration:none;font-family:var(--font-mono);font-size:0.72em;letter-spacing:0.08em;opacity:0.7;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">← LANDING</a></p>
</div>
`;document.body.appendChild(mt);os({sunLight:He,earthshineLight:ht});F=new bs;document.getElementById("btn-new-mission").addEventListener("click",()=>{F==null||F.toggle()});re=new fs;document.getElementById("btn-compare-sites").addEventListener("click",()=>{re==null||re.toggle()});re.setOnInspectSiteOnGlobe(o=>{gt({name:o.name,designation:"Candidate Site",latitudeDeg:o.lat,longitudeDeg:o.lon,elevationM:o.elevationM,isInsideSite01DEM:o.lat<=-89.4&&o.lat>=-89.55&&o.lon>=221&&o.lon<=224});const i=ai(o.lat,o.lon,_e).clone().applyMatrix4(R.matrixWorld),e=i.clone().normalize(),s=i.clone().add(e.clone().multiplyScalar(.75));Je(s,i,1.2)});function gt(o){if(!R)return;if(!J){J=new Re,J.name="TargetSiteMarker";const p=new Ze(.012,.018,32),c=new Q({color:3718648,side:Ie,transparent:!0,opacity:.9}),d=new G(p,c);J.add(d);const r=new xe(.006,16,16),l=new Q({color:16777215}),h=new G(r,l);J.add(h);const u=new we().setFromPoints([new E(0,0,0),new E(0,0,.06)]),v=new Pe({color:3718648,transparent:!0,opacity:.85}),y=new lt(u,v);J.add(y),R.add(J)}const t=ai(o.latitudeDeg,o.longitudeDeg,_e*1.002);J.position.copy(t);const i=t.clone().normalize();J.quaternion.setFromUnitVectors(new E(0,0,1),i);const e=document.getElementById("active-site-display");e&&(e.textContent=`${o.name} · ${o.designation}`);const s=document.getElementById("readout-coords"),a=document.getElementById("readout-elev");s&&(s.textContent=pe(o.latitudeDeg,o.longitudeDeg)),a&&(a.textContent=`${o.elevationM>=0?"+":""}${(o.elevationM/1e3).toFixed(2)} km`),Xe(o.latitudeDeg,o.longitudeDeg,`${o.name} · ${o.designation}`)}F.setOnSiteChanged(o=>{gt(o)});F.setOnTimelineScrubbed(o=>{const[t,i,e]=ct(o.sun.direction_unit),s=8;He.position.set(t*s,i*s,e*s);const a=document.getElementById("telem-sun-az");a&&(a.textContent=`${o.sun.azimuth_deg.toFixed(1)}° / ${o.sun.elevation_deg.toFixed(1)}°`);const p=document.getElementById("utc-clock");p&&(p.textContent=o.timestamp_utc),ns(o.timestamp_utc)});gt({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100});document.getElementById("btn-south-pole").addEventListener("click",()=>{Ne=!Ne,document.getElementById("btn-south-pole").classList.toggle("active",Ne),Ne?Je(new E(0,-2.75,.7),new E(0,-.2,0),1.3):Je(new E(0,.2,4),new E(0,0,0),1.2)});document.getElementById("btn-reset").addEventListener("click",()=>{var o;Ne=!1,(o=document.getElementById("btn-south-pole"))==null||o.classList.remove("active"),Je(new E(0,.2,4),new E(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{Ae=!Ae;const o=document.getElementById("btn-auto");o.textContent=Ae?"⏸ Auto-Rotate":"▶ Auto-Rotate",o.classList.toggle("active",Ae)});document.getElementById("btn-sun").addEventListener("click",()=>{Oe=!Oe;const o=document.getElementById("btn-sun");o.classList.toggle("active",Oe),o.textContent=Oe?"☀ Sun Cycle ●":"☀ Sun Cycle"});const Qe=new Gt,et=new O;let vt=!1;je.addEventListener("mousemove",o=>{et.x=o.clientX/window.innerWidth*2-1,et.y=-(o.clientY/window.innerHeight)*2+1,vt=!0});je.addEventListener("mouseleave",()=>{vt=!1;const o=document.getElementById("readout-coords"),t=document.getElementById("readout-elev");o&&(o.textContent="—"),t&&(t.textContent="—")});je.addEventListener("click",o=>{if(ue){const i=ue.handleClick(o,q);if(i){console.log(`[LUNAOPS] Selected preset site: ${i.name} (${i.lat}°S, ${i.lon}°E)`),F&&F.setCoordinatesFromGlobe(i.lat,i.lon);return}}if(!V)return;Qe.setFromCamera(et,q);const t=Qe.intersectObject(V);if(t.length>0){const i=t[0],e=V.worldToLocal(i.point.clone()),{latDeg:s,lonDeg:a}=ni(e);console.log(`[LUNAOPS] Moon surface clicked: ${pe(s,a)}`),F&&F.setCoordinatesFromGlobe(s,a)}});function Ns(){if(!vt||!V||!ze)return;Qe.setFromCamera(et,q);const o=Qe.intersectObject(V),t=document.getElementById("readout-coords"),i=document.getElementById("readout-elev");if(o.length>0){const e=o[0],s=V.worldToLocal(e.point.clone()),{latDeg:a,lonDeg:p}=ni(s);t&&(t.textContent=pe(a,p));const c=e.face;if(c){const d=c.a;if(d<ze.length){const r=ze[d];i&&(i.textContent=`${r>=0?"+":""}${r.toFixed(2)} km`)}}}else t&&(t.textContent="—"),i&&(i.textContent="—")}function Rs(){const o=window.innerWidth,t=window.innerHeight;q.aspect=o/t,q.updateProjectionMatrix(),W.setSize(o,t),qe.setSize(o,t),li.resolution.set(o,t)}window.addEventListener("resize",Rs);const qt=new Ki;function pi(){requestAnimationFrame(pi);const o=qt.getDelta(),t=qt.getElapsedTime();if(z.update(),B){const e=performance.now()-B.startTime,s=Math.min(1,e/B.duration),a=s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2;q.position.lerpVectors(B.startPos,B.targetPos,a),z.target.lerpVectors(B.startLook,B.targetLook,a),z.update(),s>=1&&(B=null)}ue&&ue.update(t);const i=!!(F!=null&&F.getIsOpen())||!!(re!=null&&re.getIsOpen());if(R&&Ae&&!ut&&!B&&!i&&(R.rotation.y+=.03*o),Oe){Ke+=.15*o;const e=8;He.position.set(Math.cos(Ke)*e,Math.sin(Ke*.3)*2,Math.sin(Ke)*e)}if(R){const e=R.children[1];e&&e.material instanceof Kt&&e.material.uniforms.viewVector.value.copy(q.position)}Math.floor(t*60)%3===0&&Ns(),qe.render()}pi();
