var vi=Object.defineProperty;var bi=(n,e,s)=>e in n?vi(n,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[e]=s;var b=(n,e,s)=>bi(n,typeof e!="symbol"?e+"":e,s);import{X as fi,d as y,Y as Xe,Z as Ve,_ as Ms,$ as _s,V as q,a0 as yi,a1 as Si,l as At,a2 as Os,G as Fe,B as te,a3 as oe,g as Ne,a4 as re,v as Pe,r as j,o as we,M as z,j as De,W as wi,S as Rs,A as Ei,a as Mi,C as _i,b as Ci,i as Ti,D as Ns,E as ki,R as Li,U as xi,c as Di,T as Ii,e as Pi,f as $i,h as Ai,z as Oi,N as Ri,K as Fs,J as zs,n as Ni,x as Fi,a5 as zi,a6 as Hi}from"./UnrealBloomPass-CF8Vl7q6.js";const Cs={type:"change"},Ht={type:"start"},Ts={type:"end"},yt=new yi,ks=new Si,Ui=Math.cos(70*At.DEG2RAD);class Bi extends fi{constructor(e,s){super(),this.object=e,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new y,this.cursor=new y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:Ve.ROTATE,TWO:Ve.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(p){p.addEventListener("keydown",zt),this._domElementKeyEvents=p},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",zt),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(Cs),t.update(),a=i.NONE},this.update=function(){const p=new y,w=new _s().setFromUnitVectors(e.up,new y(0,1,0)),x=w.clone().invert(),A=new y,Z=new _s,Re=new y,pe=2*Math.PI;return function(gi=null){const ws=t.object.position;p.copy(ws).sub(t.target),p.applyQuaternion(w),r.setFromVector3(p),t.autoRotate&&a===i.NONE&&F(G(gi)),t.enableDamping?(r.theta+=l.theta*t.dampingFactor,r.phi+=l.phi*t.dampingFactor):(r.theta+=l.theta,r.phi+=l.phi);let Ce=t.minAzimuthAngle,Te=t.maxAzimuthAngle;isFinite(Ce)&&isFinite(Te)&&(Ce<-Math.PI?Ce+=pe:Ce>Math.PI&&(Ce-=pe),Te<-Math.PI?Te+=pe:Te>Math.PI&&(Te-=pe),Ce<=Te?r.theta=Math.max(Ce,Math.min(Te,r.theta)):r.theta=r.theta>(Ce+Te)/2?Math.max(Ce,r.theta):Math.min(Te,r.theta)),r.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,r.phi)),r.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor);let at=!1;if(t.zoomToCursor&&O||t.object.isOrthographicCamera)r.radius=S(r.radius);else{const ke=r.radius;r.radius=S(r.radius*d),at=ke!=r.radius}if(p.setFromSpherical(r),p.applyQuaternion(x),ws.copy(t.target).add(p),t.object.lookAt(t.target),t.enableDamping===!0?(l.theta*=1-t.dampingFactor,l.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(l.set(0,0,0),c.set(0,0,0)),t.zoomToCursor&&O){let ke=null;if(t.object.isPerspectiveCamera){const nt=p.length();ke=S(nt*d);const ft=nt-ke;t.object.position.addScaledVector(M,ft),t.object.updateMatrixWorld(),at=!!ft}else if(t.object.isOrthographicCamera){const nt=new y(L.x,L.y,0);nt.unproject(t.object);const ft=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/d)),t.object.updateProjectionMatrix(),at=ft!==t.object.zoom;const Es=new y(L.x,L.y,0);Es.unproject(t.object),t.object.position.sub(Es).add(nt),t.object.updateMatrixWorld(),ke=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;ke!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(ke).add(t.object.position):(yt.origin.copy(t.object.position),yt.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(yt.direction))<Ui?e.lookAt(t.target):(ks.setFromNormalAndCoplanarPoint(t.object.up,t.target),yt.intersectPlane(ks,t.target))))}else if(t.object.isOrthographicCamera){const ke=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/d)),ke!==t.object.zoom&&(t.object.updateProjectionMatrix(),at=!0)}return d=1,O=!1,at||A.distanceToSquared(t.object.position)>o||8*(1-Z.dot(t.object.quaternion))>o||Re.distanceToSquared(t.target)>o?(t.dispatchEvent(Cs),A.copy(t.object.position),Z.copy(t.object.quaternion),Re.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",ys),t.domElement.removeEventListener("pointerdown",ms),t.domElement.removeEventListener("pointercancel",it),t.domElement.removeEventListener("wheel",gs),t.domElement.removeEventListener("pointermove",Ft),t.domElement.removeEventListener("pointerup",it),t.domElement.getRootNode().removeEventListener("keydown",vs,{capture:!0}),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",zt),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=i.NONE;const o=1e-6,r=new Ms,l=new Ms;let d=1;const c=new y,h=new q,u=new q,m=new q,v=new q,g=new q,f=new q,E=new q,_=new q,T=new q,M=new y,L=new q;let O=!1;const I=[],P={};let D=!1;function G(p){return p!==null?2*Math.PI/60*t.autoRotateSpeed*p:2*Math.PI/60/60*t.autoRotateSpeed}function U(p){const w=Math.abs(p*.01);return Math.pow(.95,t.zoomSpeed*w)}function F(p){l.theta-=p}function K(p){l.phi-=p}const ae=function(){const p=new y;return function(x,A){p.setFromMatrixColumn(A,0),p.multiplyScalar(-x),c.add(p)}}(),be=function(){const p=new y;return function(x,A){t.screenSpacePanning===!0?p.setFromMatrixColumn(A,1):(p.setFromMatrixColumn(A,0),p.crossVectors(t.object.up,p)),p.multiplyScalar(x),c.add(p)}}(),he=function(){const p=new y;return function(x,A){const Z=t.domElement;if(t.object.isPerspectiveCamera){const Re=t.object.position;p.copy(Re).sub(t.target);let pe=p.length();pe*=Math.tan(t.object.fov/2*Math.PI/180),ae(2*x*pe/Z.clientHeight,t.object.matrix),be(2*A*pe/Z.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(ae(x*(t.object.right-t.object.left)/t.object.zoom/Z.clientWidth,t.object.matrix),be(A*(t.object.top-t.object.bottom)/t.object.zoom/Z.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function We(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?d/=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function st(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?d*=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function qe(p,w){if(!t.zoomToCursor)return;O=!0;const x=t.domElement.getBoundingClientRect(),A=p-x.left,Z=w-x.top,Re=x.width,pe=x.height;L.x=A/Re*2-1,L.y=-(Z/pe)*2+1,M.set(L.x,L.y,1).unproject(t.object).sub(t.object.position).normalize()}function S(p){return Math.max(t.minDistance,Math.min(t.maxDistance,p))}function C(p){h.set(p.clientX,p.clientY)}function k(p){qe(p.clientX,p.clientX),E.set(p.clientX,p.clientY)}function $(p){v.set(p.clientX,p.clientY)}function W(p){u.set(p.clientX,p.clientY),m.subVectors(u,h).multiplyScalar(t.rotateSpeed);const w=t.domElement;F(2*Math.PI*m.x/w.clientHeight),K(2*Math.PI*m.y/w.clientHeight),h.copy(u),t.update()}function ce(p){_.set(p.clientX,p.clientY),T.subVectors(_,E),T.y>0?We(U(T.y)):T.y<0&&st(U(T.y)),E.copy(_),t.update()}function vt(p){g.set(p.clientX,p.clientY),f.subVectors(g,v).multiplyScalar(t.panSpeed),he(f.x,f.y),v.copy(g),t.update()}function bt(p){qe(p.clientX,p.clientY),p.deltaY<0?st(U(p.deltaY)):p.deltaY>0&&We(U(p.deltaY)),t.update()}function ii(p){let w=!1;switch(p.code){case t.keys.UP:p.ctrlKey||p.metaKey||p.shiftKey?K(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):he(0,t.keyPanSpeed),w=!0;break;case t.keys.BOTTOM:p.ctrlKey||p.metaKey||p.shiftKey?K(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):he(0,-t.keyPanSpeed),w=!0;break;case t.keys.LEFT:p.ctrlKey||p.metaKey||p.shiftKey?F(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):he(t.keyPanSpeed,0),w=!0;break;case t.keys.RIGHT:p.ctrlKey||p.metaKey||p.shiftKey?F(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):he(-t.keyPanSpeed,0),w=!0;break}w&&(p.preventDefault(),t.update())}function ls(p){if(I.length===1)h.set(p.pageX,p.pageY);else{const w=Ye(p),x=.5*(p.pageX+w.x),A=.5*(p.pageY+w.y);h.set(x,A)}}function ds(p){if(I.length===1)v.set(p.pageX,p.pageY);else{const w=Ye(p),x=.5*(p.pageX+w.x),A=.5*(p.pageY+w.y);v.set(x,A)}}function cs(p){const w=Ye(p),x=p.pageX-w.x,A=p.pageY-w.y,Z=Math.sqrt(x*x+A*A);E.set(0,Z)}function ai(p){t.enableZoom&&cs(p),t.enablePan&&ds(p)}function ni(p){t.enableZoom&&cs(p),t.enableRotate&&ls(p)}function ps(p){if(I.length==1)u.set(p.pageX,p.pageY);else{const x=Ye(p),A=.5*(p.pageX+x.x),Z=.5*(p.pageY+x.y);u.set(A,Z)}m.subVectors(u,h).multiplyScalar(t.rotateSpeed);const w=t.domElement;F(2*Math.PI*m.x/w.clientHeight),K(2*Math.PI*m.y/w.clientHeight),h.copy(u)}function us(p){if(I.length===1)g.set(p.pageX,p.pageY);else{const w=Ye(p),x=.5*(p.pageX+w.x),A=.5*(p.pageY+w.y);g.set(x,A)}f.subVectors(g,v).multiplyScalar(t.panSpeed),he(f.x,f.y),v.copy(g)}function hs(p){const w=Ye(p),x=p.pageX-w.x,A=p.pageY-w.y,Z=Math.sqrt(x*x+A*A);_.set(0,Z),T.set(0,Math.pow(_.y/E.y,t.zoomSpeed)),We(T.y),E.copy(_);const Re=(p.pageX+w.x)*.5,pe=(p.pageY+w.y)*.5;qe(Re,pe)}function oi(p){t.enableZoom&&hs(p),t.enablePan&&us(p)}function ri(p){t.enableZoom&&hs(p),t.enableRotate&&ps(p)}function ms(p){t.enabled!==!1&&(I.length===0&&(t.domElement.setPointerCapture(p.pointerId),t.domElement.addEventListener("pointermove",Ft),t.domElement.addEventListener("pointerup",it)),!mi(p)&&(ui(p),p.pointerType==="touch"?fs(p):li(p)))}function Ft(p){t.enabled!==!1&&(p.pointerType==="touch"?pi(p):di(p))}function it(p){switch(hi(p),I.length){case 0:t.domElement.releasePointerCapture(p.pointerId),t.domElement.removeEventListener("pointermove",Ft),t.domElement.removeEventListener("pointerup",it),t.dispatchEvent(Ts),a=i.NONE;break;case 1:const w=I[0],x=P[w];fs({pointerId:w,pageX:x.x,pageY:x.y});break}}function li(p){let w;switch(p.button){case 0:w=t.mouseButtons.LEFT;break;case 1:w=t.mouseButtons.MIDDLE;break;case 2:w=t.mouseButtons.RIGHT;break;default:w=-1}switch(w){case Xe.DOLLY:if(t.enableZoom===!1)return;k(p),a=i.DOLLY;break;case Xe.ROTATE:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enablePan===!1)return;$(p),a=i.PAN}else{if(t.enableRotate===!1)return;C(p),a=i.ROTATE}break;case Xe.PAN:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enableRotate===!1)return;C(p),a=i.ROTATE}else{if(t.enablePan===!1)return;$(p),a=i.PAN}break;default:a=i.NONE}a!==i.NONE&&t.dispatchEvent(Ht)}function di(p){switch(a){case i.ROTATE:if(t.enableRotate===!1)return;W(p);break;case i.DOLLY:if(t.enableZoom===!1)return;ce(p);break;case i.PAN:if(t.enablePan===!1)return;vt(p);break}}function gs(p){t.enabled===!1||t.enableZoom===!1||a!==i.NONE||(p.preventDefault(),t.dispatchEvent(Ht),bt(ci(p)),t.dispatchEvent(Ts))}function ci(p){const w=p.deltaMode,x={clientX:p.clientX,clientY:p.clientY,deltaY:p.deltaY};switch(w){case 1:x.deltaY*=16;break;case 2:x.deltaY*=100;break}return p.ctrlKey&&!D&&(x.deltaY*=10),x}function vs(p){p.key==="Control"&&(D=!0,t.domElement.getRootNode().addEventListener("keyup",bs,{passive:!0,capture:!0}))}function bs(p){p.key==="Control"&&(D=!1,t.domElement.getRootNode().removeEventListener("keyup",bs,{passive:!0,capture:!0}))}function zt(p){t.enabled===!1||t.enablePan===!1||ii(p)}function fs(p){switch(Ss(p),I.length){case 1:switch(t.touches.ONE){case Ve.ROTATE:if(t.enableRotate===!1)return;ls(p),a=i.TOUCH_ROTATE;break;case Ve.PAN:if(t.enablePan===!1)return;ds(p),a=i.TOUCH_PAN;break;default:a=i.NONE}break;case 2:switch(t.touches.TWO){case Ve.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;ai(p),a=i.TOUCH_DOLLY_PAN;break;case Ve.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;ni(p),a=i.TOUCH_DOLLY_ROTATE;break;default:a=i.NONE}break;default:a=i.NONE}a!==i.NONE&&t.dispatchEvent(Ht)}function pi(p){switch(Ss(p),a){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;ps(p),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;us(p),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;oi(p),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;ri(p),t.update();break;default:a=i.NONE}}function ys(p){t.enabled!==!1&&p.preventDefault()}function ui(p){I.push(p.pointerId)}function hi(p){delete P[p.pointerId];for(let w=0;w<I.length;w++)if(I[w]==p.pointerId){I.splice(w,1);return}}function mi(p){for(let w=0;w<I.length;w++)if(I[w]==p.pointerId)return!0;return!1}function Ss(p){let w=P[p.pointerId];w===void 0&&(w=new q,P[p.pointerId]=w),w.set(p.pageX,p.pageY)}function Ye(p){const w=p.pointerId===I[0]?I[1]:I[0];return P[w]}t.domElement.addEventListener("contextmenu",ys),t.domElement.addEventListener("pointerdown",ms),t.domElement.addEventListener("pointercancel",it),t.domElement.addEventListener("wheel",gs,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",vs,{passive:!0,capture:!0}),this.update()}}const Oe="";async function Vt(){const n=await fetch(`${Oe}/api/spice/health`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`Health check failed: HTTP ${n.status}`);return n.json()}async function Hs(n){var s;const e=await fetch(`${Oe}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Geometry request failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function ji(n){var s;const e=await fetch(`${Oe}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon profile failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Us(n){var s;const e=await fetch(`${Oe}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon visibility failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Gi(n){var s;const e=await fetch(`${Oe}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Mission timeline calculation failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Wi(n){var s;const e=await fetch(`${Oe}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Candidate comparison failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Bs(n){var s;const e=await fetch(`${Oe}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Landing windows scan failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}function jt(n){const[e,s,t]=n,i=e,a=t,o=s,r=Math.sqrt(i*i+a*a+o*o);return r<1e-10?[0,1,0]:[i/r,a/r,o/r]}const js=1737400,qi=1737.4,le={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3};function Ie(n,e,s=js){const i=(n%360+360)%360*Math.PI/180,a=e*Math.PI/180,o=Math.PI/2+a,r=2*s*Math.tan(o/2),l=r*Math.sin(i),d=r*Math.cos(i);return{x:l,y:d}}function Kt(n,e,s=js){const t=Math.hypot(n,e);if(t<1e-7)return{lonDeg:0,latDeg:-90};const i=2*Math.atan2(t,2*s),a=-Math.PI/2+i,r=(Math.atan2(n,e)*180/Math.PI+360)%360,l=a*180/Math.PI;return{lonDeg:r,latDeg:l}}function He(n,e){if(e>-80)return!1;const{x:s,y:t}=Ie(n,e);return s>=le.minX&&s<=le.maxX&&t>=le.minY&&t<=le.maxY}function ze(n,e,s){const t=Math.max(-90,Math.min(90,n));if(Math.abs(t+90)<1e-7)return new y(0,-s,0);if(Math.abs(t-90)<1e-7)return new y(0,s,0);const i=(90-t)*(Math.PI/180),a=(e+180)*(Math.PI/180),o=-s*Math.cos(a)*Math.sin(i),r=s*Math.cos(i),l=s*Math.sin(a)*Math.sin(i);return new y(o,r,l)}function ut(n){const e=(90-Math.max(-90,Math.min(90,n)))*(Math.PI/180);return(Math.PI-e)*qi}function Gs(n,e){const s=n.clone().normalize(),i=Math.asin(Math.max(-1,Math.min(1,s.y)))*180/Math.PI;if(i<=-89.9999)return{latDeg:-90,lonDeg:0};if(i>=89.9999)return{latDeg:90,lonDeg:0};let o=Math.atan2(-s.z,s.x)*180/Math.PI;return o<0&&(o+=360),{latDeg:i,lonDeg:o}}function Ot(n,e){const s=typeof n=="number"?n:parseFloat(n),t=typeof e=="number"?e:parseFloat(e);if(isNaN(s)||isNaN(t))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(s<-90||s>90)return{valid:!1,lat:s,lon:t,error:"Latitude must be between -90.0° and +90.0°."};const i=(t%360+360)%360;return{valid:!0,lat:s,lon:i}}function V(n,e){if(Math.abs(n+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(n-90)<.001)return"90.000° N (True Lunar North Pole)";const s=`${Math.abs(n).toFixed(3)}° ${n<0?"S":"N"}`,i=`${((e%360+360)%360).toFixed(3)}° E`;return`${s}, ${i}`}let ct=null,Y=null,St=!1,X=null,rt=!1,wt=0,$e=!1,pt="step_1h",Ze=null,_t=0;const Je={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};let Ut=null,Bt=null;async function Ct(n,e,s,t){if(!X)return!1;if(!t&&Ut!==null&&Bt!==null&&Math.abs(Ut-n)<1e-4&&Math.abs(Bt-e)<1e-4)return!0;Ut=n,Bt=e;const i=++wt,a=X.querySelector("#spice-lat"),o=X.querySelector("#spice-lon"),r=X.querySelector("#spice-time-input"),l=X.querySelector("#spice-site-note"),d=X.querySelector("#spice-window-card");if(a&&(a.value=n.toFixed(3)),o&&(o.value=e.toFixed(2)),l&&(l.textContent=s),X.querySelectorAll(".spice-preset-btn").forEach(c=>{const h=parseFloat(c.dataset.lat||"999"),u=parseFloat(c.dataset.lon||"999");Math.abs(h-n)<.05&&Math.abs(u-e)<.05?c.classList.add("active"):c.classList.remove("active")}),t){r&&(r.value=t),rt=!0;try{return await Se(X)}finally{rt=!1}}d&&(d.style.display="block",d.innerHTML=`
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `);try{const u=await Bs({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:n,longitude_deg:e});if(i!==wt)return!1;Yi(d,u,n,e);let m=u.summary.best_window_start;if(!m&&u.days.length>0){const v=u.days.filter(g=>g.is_safe_for_landing);v.length>0&&(m=v[0].date)}m&&r?r.value=`${m}T12:00:00Z`:r&&!r.value&&(r.value="2026-10-16T12:00:00Z")}catch(c){if(i!==wt)return!1;console.warn("[SPICE] Candidate window scan error",c),d&&(d.innerHTML=`
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `),r&&!r.value&&(r.value="2026-10-16T12:00:00Z")}if(i!==wt)return!1;rt=!0;try{return await Se(X)}finally{rt=!1}}function Yi(n,e,s,t){if(!n)return;const i=e.summary,a=He(t,s),o=i.best_window_start,r=i.safe_days_count;let l=o,d=0;if(o&&e.days.length>0){const c=e.days.findIndex(h=>h.date===o);if(c!==-1){let h=c;for(;h<e.days.length&&e.days[h].is_safe_for_landing;)l=e.days[h].date,d++,h++}}if(d===0&&r>0&&(d=1),o&&r>0){const c=e.days.find(v=>v.date===o),h=c?c.sunlight.full_hours:12,u=c?c.earth_los.full_hours:24,m=c?c.safety_score:80;n.innerHTML=`
      <div class="smw-header">
        <div class="smw-title-row">
          <span class="smw-icon">🎯</span>
          <span class="smw-title">CANDIDATE MISSION WINDOW</span>
          <span class="smw-status smw-status-met">CRITERIA MET</span>
        </div>
      </div>

      <div class="smw-interval-grid">
        <div class="smw-item">
          <span class="smw-label">WINDOW START</span>
          <span class="smw-val">${o}T00:00Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">WINDOW END</span>
          <span class="smw-val">${l||o}T23:59Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">SAFE DURATION</span>
          <span class="smw-val">${d} Continuous Days (${d*24} hrs)</span>
        </div>
      </div>

      <!-- Configured Evaluation Criteria & Status -->
      <div class="smw-criteria-box">
        <div class="smw-crit-title">EVALUATION CRITERIA:</div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Continuous Solar Illumination ≥ 6.0 h/day (Calculated: ${h.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Direct-To-Earth (DTE) LOS ≥ 6.0 h/day (Calculated: ${u.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit ${a?"crit-met":"crit-uneval"}">${a?"MET":"UNEVALUABLE"}</span>
          <span class="smw-crit-desc">
            ${a?"Local DEM Horizon Clearance: Validated within 5m/px Site 01 DEM":"Local DEM Clearance: Outside 5m/px DEM footprint (Global LOLA only)"}
          </span>
        </div>
      </div>

      <div class="smw-footer">
        <span class="smw-index-pill">Heuristic Index: ${m.toFixed(1)} / 100</span>
        <span class="smw-note">*Unvalidated internal estimate from joint illumination & LOS fractions. Not a landing probability.</span>
      </div>
    `}else n.innerHTML=`
      <div class="smw-header">
        <div class="smw-title-row">
          <span class="smw-icon">⚠</span>
          <span class="smw-title">CANDIDATE MISSION WINDOW</span>
          <span class="smw-status smw-status-unmet">CRITERIA UNMET</span>
        </div>
      </div>
      <div class="smw-no-window">
        No candidate landing window satisfied the configured criteria (Sunlight ≥ 6h and Earth LOS ≥ 6h) within the scanned 90-day range (${e.scan_params.start_date} to ${e.scan_params.end_date}).
      </div>
      <div class="smw-criteria-box">
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-unmet">UNMET</span>
          <span class="smw-crit-desc">Solar Illumination: Extended darkness detected across scanned epochs.</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-unmet">UNMET</span>
          <span class="smw-crit-desc">Earth LOS: Intermittent or low-elevation occultation.</span>
        </div>
      </div>
    `}function Xi(n){if(!X)return!1;const e=X.querySelector("#spice-time-input");e&&(e.value=n,Se(X))}function Vi(n,e){var h,u,m,v,g,f,E,_,T;ct=n,Y=e||null;const s=document.createElement("div");s.id="spice-panel",s.innerHTML=Ki(),document.body.appendChild(s),X=s,s.querySelector("#spice-fetch-btn").addEventListener("click",()=>Se(s)),s.querySelector("#spice-auto-btn").addEventListener("click",()=>Qi(s)),(h=s.querySelector("#spice-autotrack-mode"))==null||h.addEventListener("change",M=>{pt=M.target.value,Zt(s)}),(u=s.querySelector("#spice-retry-btn"))==null||u.addEventListener("click",()=>Gt(s,!0)),(m=s.querySelector("#spice-now-btn"))==null||m.addEventListener("click",()=>{xe(s);const M=s.querySelector("#spice-time-input");M&&(M.value=new Date().toISOString().slice(0,19)+"Z",Se(s))}),(v=s.querySelector("#spice-epoch-artemis"))==null||v.addEventListener("click",()=>{xe(s);const M=s.querySelector("#spice-time-input");M&&(M.value="2026-10-16T12:00:00Z",Se(s))}),(g=s.querySelector("#spice-step-back-24"))==null||g.addEventListener("click",()=>{xe(s),Ke(-24)}),(f=s.querySelector("#spice-step-back-1"))==null||f.addEventListener("click",()=>{xe(s),Ke(-1)}),(E=s.querySelector("#spice-step-fwd-1"))==null||E.addEventListener("click",()=>{xe(s),Ke(1)}),(_=s.querySelector("#spice-step-fwd-24"))==null||_.addEventListener("click",()=>{xe(s),Ke(24)}),s.querySelectorAll(".spice-preset-btn").forEach(M=>{M.addEventListener("click",()=>{var P;const L=parseFloat(M.dataset.lat||"-90"),O=parseFloat(M.dataset.lon||"0"),I=M.dataset.label||"South Pole Site";Ct(L,O,I),s.querySelectorAll(".spice-preset-btn").forEach(D=>D.classList.remove("active")),M.classList.add("active"),(P=Y==null?void 0:Y.onPresetSelect)==null||P.call(Y,L,O,I)})});const t=s.querySelector("#spice-lat"),i=s.querySelector("#spice-lon"),a=s.querySelector("#spice-site-note");let o=null;const r=()=>{var I;if(!t||!i)return;xe(s);const M=Ot(t.value,i.value);if(!M.valid)return;const L=[{lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"},{lat:-90,lon:0,label:"Geographic South Pole (90.0°S · Datum)"},{lat:-89.78,lon:128,label:"Shackleton Crater Peak"},{lat:-86.04,lon:2.7,label:"Malapert Mountain (Massif)"}].find(P=>Math.abs(P.lat-M.lat)<.05&&Math.abs(P.lon-M.lon)<.05);s.querySelectorAll(".spice-preset-btn").forEach(P=>{const D=parseFloat(P.dataset.lat||"999"),G=parseFloat(P.dataset.lon||"999");P.classList.toggle("active",Math.abs(D-M.lat)<.05&&Math.abs(G-M.lon)<.05)});const O=L?L.label:`Custom Lunar Target · ${V(M.lat,M.lon)}`;a&&(a.textContent=O),(I=Y==null?void 0:Y.onSiteInput)==null||I.call(Y,M.lat,M.lon,O)};t==null||t.addEventListener("input",()=>{o!==null&&clearTimeout(o),o=window.setTimeout(r,350)}),i==null||i.addEventListener("input",()=>{o!==null&&clearTimeout(o),o=window.setTimeout(r,350)}),t==null||t.addEventListener("change",()=>{o!==null&&clearTimeout(o),r()}),i==null||i.addEventListener("change",()=>{o!==null&&clearTimeout(o),r()}),t==null||t.addEventListener("keydown",M=>{M.key==="Enter"&&(o!==null&&clearTimeout(o),r(),Se(s))}),i==null||i.addEventListener("keydown",M=>{M.key==="Enter"&&(o!==null&&clearTimeout(o),r(),Se(s))}),(T=s.querySelector("#spice-time-input"))==null||T.addEventListener("focus",()=>{xe(s)});const l=s.querySelector(".spice-header"),d=s.querySelector(".spice-body");l.addEventListener("click",()=>{const M=d.style.display==="none";d.style.display=M?"":"none",l.querySelector(".spice-collapse-icon").textContent=M?"▼":"▶"});const c=s.querySelector("#spice-time-input");return c.value="2026-10-16T12:00:00Z",Gt(s).then(()=>{Ct(Je.lat,Je.lon,Je.label,"2026-10-16T12:00:00Z")}),s}function Ke(n){if(!X)return;const e=X.querySelector("#spice-time-input");if(e)try{const s=new Date(e.value);if(!isNaN(s.getTime())){const t=new Date(s.getTime()+n*3600*1e3);e.value=t.toISOString().slice(0,19)+"Z",Se(X)}}catch{}}function Ki(){return`
<div class="spice-header">
  <div class="spice-title-block">
    <span class="spice-title">🛰 SPICE EPHEMERIS</span>
    <span class="spice-subtitle">NASA/JPL · IAU MOON_ME</span>
  </div>
  <span class="spice-collapse-icon">▼</span>
</div>

<div class="spice-body">
  <!-- Backend Connectivity Status Row -->
  <div class="spice-status-row" id="spice-status-row">
    <div style="display:flex; align-items:center; gap:0.45rem; flex:1;">
      <span class="spice-status-dot" id="spice-status-dot"></span>
      <span id="spice-status-text">Checking backend…</span>
    </div>
    <button type="button" id="spice-retry-btn" class="spice-btn-inline" title="Retry SPICE service health check">Retry ⟳</button>
  </div>

  <!-- Mission Epoch (UTC) Section -->
  <div class="spice-section">
    <div class="spice-label">
      <span>MISSION EPOCH (UTC)</span>
      <button type="button" id="spice-now-btn" class="spice-now-btn" title="Set to current UTC time">Now</button>
    </div>
    <div class="spice-time-wrapper">
      <input type="text" id="spice-time-input" class="spice-input"
             placeholder="2026-10-16T12:00:00Z"
             title="ISO-8601 UTC timestamp (e.g. 2026-10-16T12:00:00Z)" />
    </div>
    
    <!-- Quick Time Step Buttons -->
    <div class="spice-time-steps">
      <button type="button" id="spice-step-back-24" class="spice-step-btn" title="Step back 24 Hours">-24h</button>
      <button type="button" id="spice-step-back-1" class="spice-step-btn" title="Step back 1 Hour">-1h</button>
      <button type="button" id="spice-epoch-artemis" class="spice-step-btn spice-step-highlight" title="Artemis III Target Epoch (2026-10-16)">Artemis '26</button>
      <button type="button" id="spice-step-fwd-1" class="spice-step-btn" title="Step forward 1 Hour">+1h</button>
      <button type="button" id="spice-step-fwd-24" class="spice-step-btn" title="Step forward 24 Hours">+24h</button>
    </div>

    <!-- Candidate Mission Window Card -->
    <div id="spice-window-card" class="spice-window-card" style="display:none"></div>
  </div>

  <!-- Landing Site & Coordinates -->
  <div class="spice-section spice-site-section">
    <div class="spice-label">LANDING SITE &amp; COORDINATES</div>
    <div class="spice-presets-row">
      <button type="button" class="spice-preset-btn active"
              data-lat="-89.463" data-lon="222.51"
              data-label="Artemis Site 01 · Shackleton–de Gerlache Ridge"
              title="NASA Artemis Candidate Site 01">Site 01</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-90.0" data-lon="0.0"
              data-label="Geographic South Pole (90.0°S · Datum)"
              title="True Lunar South Pole">South Pole</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-89.78" data-lon="128.0"
              data-label="Shackleton Crater Peak"
              title="Shackleton Crater Rim Peak">Shackleton</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-86.04" data-lon="2.7"
              data-label="Malapert Mountain (Massif)"
              title="Malapert Mountain">Malapert</button>
    </div>

    <div class="spice-site-grid">
      <label class="spice-label-sm">Lat °</label>
      <input type="number" id="spice-lat" class="spice-input-sm"
             value="${Je.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Je.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Je.label}</div>
  </div>

  <!-- Actions & Properly Defined Auto-Track -->
  <div class="spice-actions-section">
    <div class="spice-actions-primary">
      <button id="spice-fetch-btn" class="spice-btn spice-btn-primary" title="Calculate SPICE ephemerides for current timestamp">Calculate</button>
      <button id="spice-auto-btn" class="spice-btn spice-btn-autotrack" 
              title="Automatically advance mission epoch and recompute Sun/Earth topocentric SPICE geometry while retaining the selected landing site.">
        Auto-Track: OFF
      </button>
    </div>

    <!-- Auto-Track Status & Cadence Controls -->
    <div class="spice-autotrack-bar" id="spice-autotrack-bar">
      <div class="autotrack-status-block">
        <span class="autotrack-dot" id="autotrack-dot"></span>
        <span class="autotrack-label" id="autotrack-status-text">Standby (Epoch Static)</span>
      </div>
      <div class="autotrack-rate-select">
        <label for="spice-autotrack-mode" class="autotrack-rate-lbl">Cadence:</label>
        <select id="spice-autotrack-mode" class="autotrack-select" title="Auto-Track epoch advance interval">
          <option value="step_1h" selected>+1h / 2s</option>
          <option value="step_24h">+24h / 2s</option>
          <option value="realtime">Real-Time UTC</option>
        </select>
      </div>
    </div>
  </div>

  <div id="spice-loading" class="spice-loading" style="display:none">
    <div class="spice-spinner"></div> Computing NASA SPICE &amp; LOLA terrain ray-marching…
  </div>
  <div id="spice-error-box" class="spice-error" style="display:none"></div>

  <!-- Telemetry Results Display: Separating Geometric from Terrain Horizon -->
  <div class="spice-results" id="spice-results" style="display:none">
    <!-- Sun Telemetry Card -->
    <div class="spice-card">
      <div class="spice-card-header">
        <span class="spice-card-icon">☀</span>
        <span class="spice-card-title">SOLAR EPHEMERIS</span>
      </div>
      
      <div class="spice-metric-grid">
        <div class="sm-item">
          <span class="sm-label">DISTANCE</span>
          <span class="sm-value" id="res-sun-dist">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">AZIMUTH</span>
          <span class="sm-value" id="res-sun-az">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">GEOMETRIC EL</span>
          <span class="sm-value" id="res-sun-geom-el">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">TERRAIN HORIZON</span>
          <span class="sm-value" id="res-sun-terrain-el">—</span>
        </div>
      </div>

      <!-- Terrain Obstruction Status -->
      <div class="spice-status-pill-box">
        <span class="spice-pill-label">OBSTRUCTION:</span>
        <span class="spice-pill" id="res-sun-obs-status">Unknown or insufficient terrain coverage</span>
      </div>
      
      <!-- DEM Coverage Limitation Note -->
      <div class="spice-limitation-note" id="res-sun-dem-note">
        DEM Coverage: Validated within 5 m/px Site 01 DEM.
      </div>
    </div>

    <!-- Earth DTE Comms Telemetry Card -->
    <div class="spice-card">
      <div class="spice-card-header">
        <span class="spice-card-icon">🌍</span>
        <span class="spice-card-title">EARTH (DTE COMMS)</span>
      </div>

      <div class="spice-metric-grid">
        <div class="sm-item">
          <span class="sm-label">DISTANCE</span>
          <span class="sm-value" id="res-earth-dist">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">AZIMUTH</span>
          <span class="sm-value" id="res-earth-az">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">GEOMETRIC EL</span>
          <span class="sm-value" id="res-earth-geom-el">—</span>
        </div>
        <div class="sm-item">
          <span class="sm-label">TERRAIN HORIZON</span>
          <span class="sm-value" id="res-earth-terrain-el">—</span>
        </div>
      </div>

      <!-- Terrain Obstruction & Potential LOS Status -->
      <div class="spice-status-pill-box">
        <span class="spice-pill-label">OBSTRUCTION:</span>
        <span class="spice-pill" id="res-earth-obs-status">No obstruction detected</span>
      </div>

      <div class="spice-los-badge" id="res-earth-los-status">
        Potential Direct-to-Earth Line-of-Sight Available
      </div>

      <!-- Essential Operational RF Disclaimer -->
      <div class="spice-comms-disclaimer">
        ℹ <strong>Operational Link Notice:</strong> Geometric line-of-sight does not guarantee an active RF communication link. Operational closure requires link budget closure, lander antenna pointing, and DSN ground station scheduling.
      </div>
    </div>

    <!-- Expandable Advanced SPICE Astrodynamics Details -->
    <details class="spice-advanced-details">
      <summary class="spice-details-summary">▸ Astrodynamic Frame &amp; Aberration Metadata</summary>
      <div class="spice-details-content">
        <div class="details-row">
          <span>Reference Frame:</span>
          <strong id="res-frame">MOON_ME</strong>
        </div>
        <div class="details-row">
          <span>Aberration Correction:</span>
          <strong id="res-aberration">NONE (geometric)</strong>
        </div>
        <div class="details-row">
          <span>SPICE Ephemeris Time:</span>
          <span id="res-et-seconds">—</span>
        </div>
        <div class="details-row">
          <span>Sun Vector (MOON_ME):</span>
          <span id="res-sun-vec">—</span>
        </div>
        <div class="details-row">
          <span>Earth Vector (MOON_ME):</span>
          <span id="res-earth-vec">—</span>
        </div>
      </div>
    </details>

    <div class="spice-scene-note" id="spice-scene-note" style="display:none">
      ⚡ Three.js viewport illumination aligned to topocentric SPICE vector
    </div>
  </div>
</div>
`}async function Gt(n,e=!1){const s=n.querySelector("#spice-status-dot"),t=n.querySelector("#spice-status-text"),i=n.querySelector("#spice-fetch-btn"),a=n.querySelector("#spice-retry-btn");e&&(t.textContent="Connecting to SPICE backend…",s.className="spice-status-dot");try{const o=await Vt(),r=o.status==="ok";return s.className="spice-status-dot "+(r?"dot-ok":"dot-warn"),t.textContent=r?`SPICE Online · ${o.reference_frame}`:`Backend Degraded: ${o.error??"Kernel warning"}`,i.disabled=!r,a&&(a.style.display=r?"none":"inline-block"),r}catch{return s.className="spice-status-dot dot-err",t.textContent="Backend Offline (port 8000)",i.disabled=!0,a&&(a.style.display="inline-block"),!1}}let ot=null;async function Se(n){if(St&&ot){try{await ot}catch{}if(St)return!1}St=!0;const e=rt,s=n.querySelector("#spice-loading"),t=n.querySelector("#spice-error-box"),i=n.querySelector("#spice-results");return s.style.display="flex",t.style.display="none",ot=(async()=>{var a;try{const o=n.querySelector("#spice-time-input"),r=n.querySelector("#spice-lat"),l=n.querySelector("#spice-lon"),d=o.value.trim(),c=Ot(r.value,l.value);if(!c.valid)throw new Error(c.error||"Invalid coordinates.");const h=await Hs({utc_time:d,latitude_deg:c.lat,longitude_deg:c.lon,elevation_m:0});let u=null;try{u=await Us({latitude_deg:c.lat,longitude_deg:c.lon,elevation_m:0,instrument_height_m:2,sun_azimuth_deg:h.sun.azimuth_deg,sun_elevation_deg:h.sun.elevation_deg,sun_distance_km:h.sun.distance_km,earth_azimuth_deg:h.earth.azimuth_deg,earth_elevation_deg:h.earth.elevation_deg,earth_distance_km:h.earth.distance_km})}catch{u=null}Zi(n,h,u),Ji(h),i.style.display="block",_t=0;const m=n.querySelector("#spice-site-note"),v=(m==null?void 0:m.textContent)||`Custom Lunar Target · ${V(c.lat,c.lon)}`;return e||(a=Y==null?void 0:Y.onSiteCalculate)==null||a.call(Y,c.lat,c.lon,v),!0}catch(o){const r=o instanceof Error?o.message:String(o);return t.textContent=`Error: ${r}`,t.style.display="block",await Gt(n),$e&&(_t++,_t>=2&&xe(n,"Auto-Track Paused: Network/SPICE error")),!1}finally{s.style.display="none",St=!1,ot=null}})(),await ot}function Zi(n,e,s){const t=g=>g.toFixed(1),i=g=>g>1e6?`${(g/1495978707e-1).toFixed(4)} AU (${(g/1e6).toFixed(2)}M km)`:`${g.toLocaleString(void 0,{maximumFractionDigits:0})} km`,a=He(e.site.longitude_deg,e.site.latitude_deg);ne("res-sun-dist",i(e.sun.distance_km)),ne("res-sun-az",`${t(e.sun.azimuth_deg)}°`);const o=e.sun.elevation_deg;xs("res-sun-geom-el",`${o>=0?"+":""}${t(o)}°`,o>=0?"spice-val-positive":"spice-val-negative");const r=document.getElementById("res-sun-obs-status"),l=document.getElementById("res-sun-terrain-el"),d=document.getElementById("res-sun-dem-note");if(s&&s.sun){const g=s.sun;if(g.terrain_horizon_elevation_deg!==null?ne("res-sun-terrain-el",`${t(g.terrain_horizon_elevation_deg)}°`):ne("res-sun-terrain-el","N/A (Outside DEM)"),r)switch(g.visibility_status){case"no_obstruction_detected_within_coverage":r.textContent="No obstruction detected within coverage",r.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":r.textContent="Blocked by local terrain (Shadow)",r.className="spice-pill pill-err";break;case"blocked_by_lunar_body":r.textContent="Below geometric horizon (Lunar Body)",r.className="spice-pill pill-err";break;case"near_horizon_grazing":r.textContent="Near-horizon grazing light",r.className="spice-pill pill-warn";break;default:r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-warn"}}else l&&(l.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),r&&(o<0?(r.textContent="Below geometric horizon",r.className="spice-pill pill-err"):a?(r.textContent="Above geometric horizon (DEM Ray uncalculated)",r.className="spice-pill pill-warn"):(r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-neutral"));d&&(d.textContent=a?"DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).":"DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only."),ne("res-earth-dist",`${e.earth.distance_km.toLocaleString(void 0,{maximumFractionDigits:0})} km`),ne("res-earth-az",`${t(e.earth.azimuth_deg)}°`);const c=e.earth.elevation_deg;xs("res-earth-geom-el",`${c>=0?"+":""}${t(c)}°`,c>=0?"spice-val-positive":"spice-val-negative");const h=document.getElementById("res-earth-obs-status"),u=document.getElementById("res-earth-terrain-el"),m=document.getElementById("res-earth-los-status");if(s&&s.earth){const g=s.earth;if(g.terrain_horizon_elevation_deg!==null?ne("res-earth-terrain-el",`${t(g.terrain_horizon_elevation_deg)}°`):ne("res-earth-terrain-el","N/A (Outside DEM)"),h)switch(g.visibility_status){case"no_obstruction_detected_within_coverage":h.textContent="No obstruction detected within coverage",h.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":h.textContent="Blocked by local terrain",h.className="spice-pill pill-err";break;case"blocked_by_lunar_body":h.textContent="Below geometric horizon (Lunar Body)",h.className="spice-pill pill-err";break;default:h.textContent="Unknown or insufficient terrain coverage",h.className="spice-pill pill-warn"}if(m){const f=(g.visibility_status==="no_obstruction_detected_within_coverage"||g.visibility_status==="near_horizon_grazing")&&c>0;m.textContent=f?`Potential Line-of-Sight Active (${t(g.angular_clearance_deg??c)}° clearance)`:"Direct Line-of-Sight Obstructed",m.className=`spice-los-badge ${f?"los-active":"los-blocked"}`}}else if(u&&(u.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),h&&(c<0?(h.textContent="Below geometric horizon",h.className="spice-pill pill-err"):(h.textContent="Above geometric horizon",h.className="spice-pill pill-ok")),m){const g=c>0;m.textContent=g?`Potential Geometric LOS Active (+${t(c)}°)`:"Direct Line-of-Sight Occluded",m.className=`spice-los-badge ${g?"los-active":"los-blocked"}`}ne("res-frame",e.reference_frame),ne("res-aberration",e.aberration_correction),ne("res-et-seconds",`${e.ephemeris_time_s.toFixed(3)} s`),ne("res-sun-vec",e.sun.direction_unit.map(g=>g.toFixed(4)).join(", ")),ne("res-earth-vec",e.earth.direction_unit.map(g=>g.toFixed(4)).join(", "));const v=n.querySelector("#spice-scene-note");v.style.display=ct?"block":"none"}function Ji(n){if(!ct)return;const[e,s,t]=jt(n.sun.direction_unit),i=8;ct.sunLight.position.set(e*i,s*i,t*i);const[a,o,r]=jt(n.earth.direction_unit);ct.earthshineLight.position.set(-a*i,-o*i,-r*i)}function Qi(n){$e=!$e,$e?ea(n):Ws(n)}function ea(n){$e=!0,_t=0,Zt(n),Ze!==null&&clearInterval(Ze),Ls(n),Ze=setInterval(()=>{$e&&Ls(n)},2e3)}function Ls(n){const e=n.querySelector("#spice-time-input");if(e){if(pt==="realtime")e.value=new Date().toISOString().slice(0,19)+"Z";else if(pt==="step_1h"){Ke(1);return}else if(pt==="step_24h"){Ke(24);return}Se(n)}}function Ws(n){$e=!1,Ze!==null&&(clearInterval(Ze),Ze=null),Zt(n)}function xe(n,e){if(!$e)return;Ws(n);const s=n.querySelector("#autotrack-status-text");s&&(s.textContent=e||"Standby (User edit paused track)")}function Zt(n){const e=n.querySelector("#spice-auto-btn"),s=n.querySelector("#autotrack-dot"),t=n.querySelector("#autotrack-status-text");if($e){e.classList.add("active"),e.textContent="Auto-Track: ACTIVE ●",s.className="autotrack-dot dot-active";const i={step_1h:"Advancing (+1h / 2s)",step_24h:"Advancing (+24h / 2s)",realtime:"Tracking Real-Time UTC"};t.textContent=i[pt]||"Active"}else e.classList.remove("active"),e.textContent="Auto-Track: OFF",s.className="autotrack-dot",t.textContent="Standby (Epoch Static)"}function ne(n,e){const s=document.getElementById(n);s&&(s.textContent=e)}function xs(n,e,s){const t=document.getElementById(n);t&&(t.textContent=e,t.className=`sm-value ${s}`)}const se=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM (NASA LOLA Site 01)",coverageType:"High-Resolution Regional DEM"},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians. Geodetic reference benchmark.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry",isGeodeticDatum:!0},{id:"shackleton-rim",name:"Shackleton Rim",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering PSR with high water-ice deposition probability.",isInsideSite01DEM:!1,terrainResolution:"5 m/px Site DEM (NASA LOLA)",coverageType:"High-Resolution Regional DEM"},{id:"malapert",name:"Malapert Massif",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km massif providing extended solar visibility and DTE comms.",isInsideSite01DEM:!1,terrainResolution:"5 m/px Site DEM (NASA LOLA)",coverageType:"High-Resolution Regional DEM"},{id:"haworth-rim",name:"Haworth Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with volatile concentrations.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"de-gerlache-rim",name:"de Gerlache Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim offering favorable sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"nobile-rim-1",name:"Nobile Rim",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1,terrainResolution:"5 m/px Site DEM (NASA LOLA)",coverageType:"High-Resolution Regional DEM"}],Le=1,me={POLE_RING:2282478,POLE_CROSS:6809849,POLE_DOT:16777215,SITE01_MAIN:16096779,GRID_PRIME:3900150,GRID_SEC:1981023,DEM_BOX:3718648,SEC:{"shackleton-rim":3718648,malapert:3462041,"haworth-rim":10980346,"de-gerlache-rim":6333946,"nobile-rim-1":16020150}};class ta{constructor(e){b(this,"group");b(this,"interactiveMarkers",[]);b(this,"siteMarkerGroups",new Map);b(this,"raycaster",new Os);b(this,"mouse",new q);b(this,"onSelectSiteCallback");b(this,"disposables",[]);this.group=new Fe,this.group.name="SouthPoleOverlay",this._buildPolarGrid(e),this._buildDEMFootprint(e),this._buildSouthPoleMarker(e),this._buildCandidateSites(e)}setOnSelectSite(e){this.onSelectSiteCallback=e}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(e){this.siteMarkerGroups.forEach((s,t)=>{const i=t===e,a=s.getObjectByName("Ring");if(a){a.scale.setScalar(i?1.25:1);const o=a.material;o&&"opacity"in o&&(o.opacity=i?1:Ds(t))}["Dot","Cx0","Cx1","Cx2","Cx3","Bk0","Bk1","Bk2","Bk3","Stem","Cap"].forEach(o=>{const r=s.getObjectByName(o);if(!r)return;const l=r.material;l&&"opacity"in l&&(l.opacity=i?1:Ds(t,o))})})}_buildPolarGrid(e){const s=new Fe;s.name="PolarGrid";const t=e*1.0012;[[-80,1982639,.35,240],[-85,1920728,.28,180],[-88,1981023,.2,120]].forEach(([i,a,o,r])=>{const l=[];for(let h=0;h<=r;h++)l.push(ze(i,h/r*360,t));const d=new te().setFromPoints(l),c=new oe({color:a,transparent:!0,opacity:o,blending:Ne});s.add(new re(d,c)),this.disposables.push(d,c)}),[[0,me.GRID_PRIME,.45],[90,me.GRID_SEC,.2],[180,me.GRID_SEC,.2],[270,me.GRID_SEC,.2]].forEach(([i,a,o])=>{const r=[];for(let c=0;c<=36;c++)r.push(ze(-80-10*(c/36),i,t));const l=new te().setFromPoints(r),d=new oe({color:a,transparent:!0,opacity:o,blending:Ne});s.add(new re(l,d)),this.disposables.push(l,d)}),this.group.add(s)}_buildDEMFootprint(e){const{minX:s,maxX:t,minY:i,maxY:a}=le,o=e*1.002,r=16,l=[];for(let u=0;u<=r;u++)l.push({x:s+(t-s)*(u/r),y:a});for(let u=0;u<=r;u++)l.push({x:t,y:a+(i-a)*(u/r)});for(let u=0;u<=r;u++)l.push({x:t+(s-t)*(u/r),y:i});for(let u=0;u<=r;u++)l.push({x:s,y:i+(a-i)*(u/r)});const d=l.map(u=>{const{lonDeg:m,latDeg:v}=Kt(u.x,u.y);return ze(v,m,o)}),c=new te().setFromPoints(d),h=new oe({color:me.DEM_BOX,transparent:!0,opacity:.45});this.group.add(new re(c,h)),this.disposables.push(c,h)}_buildSouthPoleMarker(e){const s=new Fe;s.name="TrueSouthPoleMarker",s.position.set(0,-e*1.0025,0);const t=.013*Le,i=new Pe(t,t*1.3,64);i.rotateX(Math.PI/2);const a=new j({color:me.POLE_RING,side:we,transparent:!0,opacity:.95,blending:Ne}),o=new z(i,a);o.name="Ring",s.add(o),this.disposables.push(i,a);const r=new Pe(t*1.8,t*1.95,64);r.rotateX(Math.PI/2);const l=new j({color:me.POLE_RING,side:we,transparent:!0,opacity:.4,blending:Ne});s.add(new z(r,l)),this.disposables.push(r,l);const d=t*.45,c=t*2.6;[[-1,0],[1,0],[0,-1],[0,1]].forEach(([E,_],T)=>{const M=new te().setFromPoints([new y(E*d,0,_*d),new y(E*c,0,_*c)]),L=new oe({color:me.POLE_CROSS,transparent:!0,opacity:.75}),O=new re(M,L);O.name=`Cx${T}`,s.add(O),this.disposables.push(M,L)});const h=new De(.003*Le,12,12),u=new j({color:me.POLE_DOT,transparent:!0,opacity:1}),m=new z(h,u);m.name="Dot",s.add(m),this.disposables.push(h,u);const v=new De(.022,8,8),g=new j({visible:!1}),f=new z(v,g);f.userData={site:se.find(E=>E.id==="south-pole")},s.add(f),this.interactiveMarkers.push(f),this.disposables.push(v,g),this.siteMarkerGroups.set("south-pole",s),this.group.add(s)}_buildCandidateSites(e){se.forEach(s=>{if(s.id==="south-pole")return;const t=s.id==="site-01",i=t?me.SITE01_MAIN:me.SEC[s.id]??9741240,a=new Fe;a.name=`SiteMarker_${s.id}`;const o=ze(s.lat,s.lon,e*1.0025),r=o.clone().normalize();a.position.copy(o),a.quaternion.setFromUnitVectors(new y(0,1,0),r),t?this._buildPrimaryMarker(a,i):this._buildSecondaryMarker(a,i);const l=new De(.022,8,8),d=new j({visible:!1}),c=new z(l,d);c.position.y=.02,c.userData={site:s},a.add(c),this.interactiveMarkers.push(c),this.disposables.push(l,d),this.siteMarkerGroups.set(s.id,a),this.group.add(a)})}_buildPrimaryMarker(e,s){const t=.018*Le,i=[new y(0,0,-t),new y(t,0,0),new y(0,0,t),new y(-t,0,0),new y(0,0,-t)],a=new te().setFromPoints(i),o=new oe({color:s,transparent:!0,opacity:.95}),r=new re(a,o);r.name="Ring",e.add(r),this.disposables.push(a,o);const l=[new y(0,0,-t*.55),new y(t*.55,0,0),new y(0,0,t*.55),new y(-t*.55,0,0),new y(0,0,-t*.55)],d=new te().setFromPoints(l),c=new oe({color:s,transparent:!0,opacity:.55});e.add(new re(d,c)),this.disposables.push(d,c);const h=t*1.9,u=t*.55;[[0,-h,u],[0,h,u],[-h,0,u],[h,0,u]].forEach((I,P)=>{const D=[];P===0?(D.push(new y(-u*.5,0,-h+u)),D.push(new y(-u*.5,0,-h)),D.push(new y(u*.5,0,-h)),D.push(new y(u*.5,0,-h+u))):P===1?(D.push(new y(-u*.5,0,h-u)),D.push(new y(-u*.5,0,h)),D.push(new y(u*.5,0,h)),D.push(new y(u*.5,0,h-u))):P===2?(D.push(new y(-h+u,0,-u*.5)),D.push(new y(-h,0,-u*.5)),D.push(new y(-h,0,u*.5)),D.push(new y(-h+u,0,u*.5))):(D.push(new y(h-u,0,-u*.5)),D.push(new y(h,0,-u*.5)),D.push(new y(h,0,u*.5)),D.push(new y(h-u,0,u*.5)));const G=new te().setFromPoints(D),U=new oe({color:s,transparent:!0,opacity:.8}),F=new re(G,U);F.name=`Bk${P}`,e.add(F),this.disposables.push(G,U)});const m=new De(.0045*Le,12,12),v=new j({color:16569165,transparent:!0,opacity:1}),g=new z(m,v);g.name="Dot",e.add(g),this.disposables.push(m,v);const f=.085*Le,E=new te().setFromPoints([new y(0,0,0),new y(0,f,0)]),_=new oe({color:s,transparent:!0,opacity:.7,blending:Ne}),T=new re(E,_);T.name="Stem",e.add(T),this.disposables.push(E,_);const M=new De(.0055*Le,10,10),L=new j({color:s,transparent:!0,opacity:.9}),O=new z(M,L);O.position.y=f,O.name="Cap",e.add(O),this.disposables.push(M,L)}_buildSecondaryMarker(e,s){const t=.009*Le,i=new Pe(t,t*1.45,36);i.rotateX(Math.PI/2);const a=new j({color:s,side:we,transparent:!0,opacity:.75}),o=new z(i,a);o.name="Ring",e.add(o),this.disposables.push(i,a);const r=new De(.0025*Le,10,10),l=new j({color:s,transparent:!0,opacity:.9}),d=new z(r,l);d.name="Dot",e.add(d),this.disposables.push(r,l);const c=.028*Le,h=new te().setFromPoints([new y(0,0,0),new y(0,c,0)]),u=new oe({color:s,transparent:!0,opacity:.55}),m=new re(h,u);m.name="Stem",e.add(m),this.disposables.push(h,u)}update(e){}handleClick(e,s){var i;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,s);const t=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(t.length>0){let a=null,o=1/0;for(const r of t){const l=r.object.userData.site;if(!l)continue;const d=this.siteMarkerGroups.get(l.id),c=d?d.position:r.object.position,h=r.point.distanceTo(c);h<o&&(o=h,a=l)}if(a)return this.highlightSite(a.id),(i=this.onSelectSiteCallback)==null||i.call(this,a),a}return null}dispose(){this.disposables.forEach(e=>{try{e.dispose()}catch{}}),this.disposables=[]}}function Ds(n,e="Ring"){return n==="south-pole"?e==="Stem"?0:.8:n==="site-01"?e==="Stem"||e==="Cap"?.55:.75:e==="Stem"?.4:.6}class sa{constructor(){b(this,"container");b(this,"canvas");b(this,"ctx");b(this,"tooltipEl");b(this,"isVisible",!1);b(this,"selectedSiteId","site-01");b(this,"hoveredSite",null);b(this,"customSelection",null);b(this,"onSelectCallback");b(this,"onApplyAndCalculateCallback");b(this,"onRecenterCallback");b(this,"MAX_EXTENT_M",36e4);b(this,"mapWidth",480);b(this,"mapHeight",480);b(this,"centerX",240);b(this,"centerY",240);b(this,"scalePxPerM",240/33e4);b(this,"terrainImage",null);b(this,"isTerrainImageLoaded",!1);b(this,"site01DetailImage",null);b(this,"isSite01ImageLoaded",!1);this.container=document.createElement("div"),this.container.id="south-pole-explorer-panel",this.container.className="south-pole-explorer hidden",this.container.innerHTML=this.buildHTML(),document.body.appendChild(this.container),this.canvas=this.container.querySelector("#polar-map-canvas"),this.ctx=this.canvas.getContext("2d"),this.tooltipEl=this.container.querySelector("#polar-map-tooltip"),this.resizeCanvas(),this.loadBackdrop(),this.attachEvents()}setOnSelect(e){this.onSelectCallback=e}setOnApplyAndCalculate(e){this.onApplyAndCalculateCallback=e}setOnRecenter(e){this.onRecenterCallback=e}open(){this.isVisible=!0,this.container.classList.remove("hidden"),this.resizeCanvas(),this.draw()}close(){this.isVisible=!1,this.container.classList.add("hidden")}toggle(){return this.isVisible?this.close():this.open(),this.isVisible}getIsOpen(){return this.isVisible}setSelectedSite(e,s,t){e&&se.some(i=>i.id===e)?(this.selectedSiteId=e,this.customSelection=null):s!==void 0&&t!==void 0&&(this.selectedSiteId="custom",this.customSelection={lat:s,lon:t,elevM:0,isInsideDEM:He(t,s)}),this.isVisible&&this.draw()}resizeCanvas(){const e=Math.min(520,Math.max(380,window.innerWidth>900?460:360));this.mapWidth=e,this.mapHeight=e,this.canvas.width=e*window.devicePixelRatio,this.canvas.height=e*window.devicePixelRatio,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.ctx.setTransform(1,0,0,1,0,0),this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.centerX=e/2,this.centerY=e/2,this.scalePxPerM=e/2/this.MAX_EXTENT_M}loadBackdrop(){const e=new Image;e.crossOrigin="anonymous",e.src="/generated/south_pole_polar_relief.png",e.onload=()=>{this.terrainImage=e,this.isTerrainImageLoaded=!0,this.isVisible&&this.draw()};const s=new Image;s.crossOrigin="anonymous",s.src="/generated/terrain/site01/elev_hill.png",s.onload=()=>{this.site01DetailImage=s,this.isSite01ImageLoaded=!0,this.isVisible&&this.draw()}}buildHTML(){return`
<div class="spe-header">
  <div class="spe-title-row">
    <img src="/lunaops-emblem.svg" class="spe-header-emblem" alt="LUNAOPS Polar Emblem" />
    <span class="spe-title">SOUTH POLE EXPLORER</span>
    <span class="spe-badge">USGS POLAR STEREO &middot; 80&deg;S&ndash;90&deg;S</span>
    <span class="spe-motto-pill">PLAN WITH PRECISION</span>
  </div>
  <button type="button" class="spe-close-btn" id="spe-close-btn" title="Close South Pole Explorer [Esc]">&times;</button>
</div>

<div class="spe-body">
  <div class="spe-canvas-wrapper">
    <canvas id="polar-map-canvas"></canvas>
    
    <!-- Georeferenced Interactive Tooltip -->
    <div id="polar-map-tooltip" class="polar-map-tooltip hidden"></div>

    <!-- Map Legend Bar -->
    <div class="spe-legend">
      <div class="spe-legend-item">
        <span class="spe-legend-swatch swatch-dem"></span>
        <span>Site 01 DEM (5 m/px)</span>
      </div>
      <div class="spe-legend-item">
        <span class="spe-legend-swatch swatch-lola"></span>
        <span>Global LOLA (~60 m/px)</span>
      </div>
      <div class="spe-legend-item">
        <span class="spe-legend-swatch swatch-pole"></span>
        <span>True 90°S Datum</span>
      </div>
    </div>
  </div>

  <!-- Selected Site / Custom Target Metadata Card -->
  <div class="spe-info-card" id="spe-info-card">
    <div class="spe-info-head">
      <span class="spe-info-tag" id="spe-site-type">CANDIDATE SITE</span>
      <span class="spe-info-coverage" id="spe-site-cov">5 m/px High-Resolution DEM</span>
    </div>
    <div class="spe-info-name" id="spe-site-name">Artemis Site 01</div>
    <div class="spe-info-desig" id="spe-site-desig">Shackleton–de Gerlache Connecting Ridge</div>
    
    <div class="spe-data-grid">
      <div class="spe-data-cell">
        <span class="spe-cell-lbl">LATITUDE</span>
        <span class="spe-cell-val" id="spe-cell-lat">-89.463° S</span>
      </div>
      <div class="spe-data-cell">
        <span class="spe-cell-lbl">LONGITUDE</span>
        <span class="spe-cell-val" id="spe-cell-lon">222.510° E</span>
      </div>
      <div class="spe-data-cell">
        <span class="spe-cell-lbl">ELEVATION</span>
        <span class="spe-cell-val" id="spe-cell-elev">+1,100 m</span>
      </div>
      <div class="spe-data-cell">
        <span class="spe-cell-lbl">DIST TO 90°S</span>
        <span class="spe-cell-val" id="spe-cell-dist">16.3 km</span>
      </div>
    </div>

    <div class="spe-info-desc" id="spe-site-desc">
      High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.
    </div>

    <!-- Functional Action Buttons -->
    <div class="spe-actions">
      <button type="button" id="spe-btn-apply" class="spe-btn spe-btn-primary" title="Apply selected site coordinates and compute topocentric SPICE ephemerides">
        Set Active Target &amp; Calculate ⌖
      </button>
      <button type="button" id="spe-btn-recenter" class="spe-btn spe-btn-secondary" title="Smoothly center 3D camera on target coordinates without re-calculation">
        Recenter 3D View
      </button>
    </div>
  </div>
</div>
`}attachEvents(){var t;(t=this.container.querySelector("#spe-close-btn"))==null||t.addEventListener("click",()=>this.close()),this.canvas.addEventListener("mousemove",i=>this.handleMouseMove(i)),this.canvas.addEventListener("mouseleave",()=>{this.hoveredSite=null,this.tooltipEl.classList.add("hidden"),this.draw()}),this.canvas.addEventListener("click",i=>this.handleClick(i));const e=this.container.querySelector("#spe-btn-apply");e==null||e.addEventListener("click",async()=>{if(!e||e.disabled)return;const i=this.getCurrentSiteData(),a=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spe-spinner"></span> Computing SPICE…';try{let o=!0;if(this.onApplyAndCalculateCallback?o=await this.onApplyAndCalculateCallback(i):this.onSelectCallback&&this.onSelectCallback(i),o!==!1)e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success");else try{const r=await Vt();r&&r.status==="ok"?(e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success")):(e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error"))}catch{e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error")}setTimeout(()=>{e.disabled=!1,e.innerHTML=a,e.classList.remove("spe-btn-success","spe-btn-warn")},2500)}catch(o){const r=o instanceof Error?o.message:String(o);e.innerHTML="⚠ Calculation Failed",e.classList.add("spe-btn-error"),console.error("[SPE] Apply failed:",r),setTimeout(()=>{e.disabled=!1,e.innerHTML=a,e.classList.remove("spe-btn-error")},3e3)}});const s=this.container.querySelector("#spe-btn-recenter");s==null||s.addEventListener("click",()=>{const i=this.getCurrentSiteData();this.onRecenterCallback&&this.onRecenterCallback({lat:i.latitudeDeg,lon:i.longitudeDeg});const a=s.textContent;s.textContent="✓ 3D Centered",setTimeout(()=>{s.textContent=a},1500)}),window.addEventListener("resize",()=>{this.isVisible&&(this.resizeCanvas(),this.draw())}),window.addEventListener("keydown",i=>{i.key==="Escape"&&this.isVisible&&this.close()})}getCurrentSiteData(){if(this.selectedSiteId==="custom"&&this.customSelection)return{name:"Custom Selected Location",designation:V(this.customSelection.lat,this.customSelection.lon),latitudeDeg:this.customSelection.lat,longitudeDeg:this.customSelection.lon,elevationM:this.customSelection.elevM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:this.customSelection.isInsideDEM,demDatasetName:this.customSelection.isInsideDEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"};const e=se.find(s=>s.id===this.selectedSiteId)||se[0];return{name:e.name,designation:e.designation,latitudeDeg:e.lat,longitudeDeg:e.lon,elevationM:e.elevationM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:!!e.isInsideSite01DEM,demDatasetName:e.isInsideSite01DEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"}}projectMetersToCanvas(e,s){return{cx:this.centerX+e*this.scalePxPerM,cy:this.centerY-s*this.scalePxPerM}}unprojectCanvasToMeters(e,s){return{x:(e-this.centerX)/this.scalePxPerM,y:(this.centerY-s)/this.scalePxPerM}}draw(){const e=this.ctx,s=this.mapWidth,t=this.mapHeight;e.clearRect(0,0,s,t),e.fillStyle="#040711",e.fillRect(0,0,s,t),this.drawTerrainRelief(e),this.drawSite01DEMBoundary(e),this.drawPolarGrid(e),this.drawEphemerisVectors(e),this.drawScaleAndOrientation(e),this.drawTrueSouthPole(e),this.drawCandidateSites(e),this.customSelection&&this.drawCustomSelectionMarker(e),this.updateInfoCard()}drawTerrainRelief(e){if(this.isTerrainImageLoaded&&this.terrainImage){e.save();const t=33e4*this.scalePxPerM,i=this.centerX-t,a=this.centerY-t,o=t*2;e.drawImage(this.terrainImage,i,a,o,o),e.restore()}else{const s=e.createRadialGradient(this.centerX,this.centerY,10,this.centerX,this.centerY,this.mapWidth/2);s.addColorStop(0,"#151d2c"),s.addColorStop(.5,"#0f1624"),s.addColorStop(1,"#060a12"),e.fillStyle=s,e.fillRect(0,0,this.mapWidth,this.mapHeight)}}drawSite01DEMBoundary(e){const s=this.projectMetersToCanvas(le.minX,le.maxY),t=this.projectMetersToCanvas(le.maxX,le.maxY),i=this.projectMetersToCanvas(le.maxX,le.minY),a=this.projectMetersToCanvas(le.minX,le.minY),o=t.cx-s.cx,r=a.cy-s.cy;e.save(),this.isSite01ImageLoaded&&this.site01DetailImage&&(e.save(),e.globalAlpha=.85,e.drawImage(this.site01DetailImage,s.cx,s.cy,o,r),e.restore()),e.beginPath(),e.moveTo(s.cx,s.cy),e.lineTo(t.cx,t.cy),e.lineTo(i.cx,i.cy),e.lineTo(a.cx,a.cy),e.closePath(),e.fillStyle="rgba(56, 189, 248, 0.12)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=1.4,e.setLineDash([4,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 DEM [5 m/px]",s.cx+3,s.cy-4),e.restore()}drawPolarGrid(e){[{lat:-80,label:"LAT 80.00°S (OUTER PERIMETER)",color:"rgba(56, 189, 248, 0.40)",dash:[]},{lat:-85,label:"LAT 85.00°S (TRAVERSE RANGE)",color:"rgba(56, 189, 248, 0.32)",dash:[6,4]},{lat:-88,label:"LAT 88.00°S (ARTEMIS CORRIDOR)",color:"rgba(56, 189, 248, 0.32)",dash:[3,3]}].forEach(({lat:a,label:o,color:r,dash:l})=>{const{y:d}=Ie(0,a),c=Math.abs(d)*this.scalePxPerM;e.beginPath(),e.arc(this.centerX,this.centerY,c,0,2*Math.PI),e.strokeStyle=r,e.lineWidth=1,e.setLineDash(l),e.stroke(),e.setLineDash([]);const h=-Math.PI*.64,u=this.centerX+Math.cos(h)*c,m=this.centerY+Math.sin(h)*c;e.save(),e.font='bold 7.5px "JetBrains Mono", monospace';const v=e.measureText(o).width;e.fillStyle="rgba(6, 11, 22, 0.90)",e.strokeStyle="rgba(56, 189, 248, 0.40)",e.lineWidth=1,e.beginPath(),e.roundRect(u-v/2-5,m-7,v+10,14,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(o,u,m),e.restore()});const t=this.mapWidth/2-8;[{angleRad:-Math.PI/2,label:"0° PRIME · TO EARTH ↑",align:"center",isTopHeader:!0},{angleRad:0,label:"90°E · EAST LIMB →",align:"right",isTopHeader:!1},{angleRad:Math.PI/2,label:"180° · FAR SIDE ↓",align:"center",isTopHeader:!1},{angleRad:Math.PI,label:"← 270°E · WEST LIMB",align:"left",isTopHeader:!1}].forEach(a=>{const o=this.centerX+Math.cos(a.angleRad)*t,r=this.centerY+Math.sin(a.angleRad)*t;e.beginPath(),e.moveTo(this.centerX,this.centerY),e.lineTo(o,r),e.strokeStyle="rgba(148, 163, 184, 0.20)",e.lineWidth=1,e.stroke(),e.save(),e.font='bold 8px "JetBrains Mono", monospace';const l=e.measureText(a.label).width;if(a.isTopHeader){const d=this.centerX,c=14;e.fillStyle="rgba(6, 12, 24, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.50)",e.lineWidth=1,e.beginPath(),e.roundRect(d-l/2-6,c-8,l+12,16,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(a.label,d,c)}else{const c=this.centerX+Math.cos(a.angleRad)*(t-12),h=this.centerY+Math.sin(a.angleRad)*(t-12);e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle="rgba(148, 163, 184, 0.35)",e.lineWidth=1,e.beginPath(),e.roundRect(c-l/2-5,h-7,l+10,14,3),e.fill(),e.stroke(),e.fillStyle="#cbd5e1",e.textAlign="center",e.textBaseline="middle",e.fillText(a.label,c,h)}e.restore()})}drawEphemerisVectors(e){const s=-Math.PI*.58,t=this.mapWidth*.4,i=this.centerX-10,a=this.centerY+20,o=i+Math.cos(s)*t,r=a+Math.sin(s)*t;e.save(),e.strokeStyle="rgba(245, 158, 11, 0.75)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,a),e.lineTo(o,r),e.stroke(),e.setLineDash([]);const l=7,d=Math.PI/7;e.fillStyle="#f59e0b",e.beginPath(),e.moveTo(o,r),e.lineTo(o-l*Math.cos(s-d),r-l*Math.sin(s-d)),e.lineTo(o-l*Math.cos(s+d),r-l*Math.sin(s+d)),e.closePath(),e.fill();const c=i+Math.cos(s)*(t*.52),h=a+Math.sin(s)*(t*.52),u="SOLAR INCIDENCE 1.1° EL ↗";e.font='bold 7.5px "JetBrains Mono", monospace';const m=e.measureText(u).width;e.fillStyle="rgba(18, 12, 4, 0.94)",e.strokeStyle="rgba(245, 158, 11, 0.65)",e.lineWidth=1,e.beginPath(),e.roundRect(c-m/2-5,h-7,m+10,14,3),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.textAlign="center",e.textBaseline="middle",e.fillText(u,c,h);const v=Math.PI*.72,g=this.mapWidth*.36,f=i+Math.cos(v)*g,E=a+Math.sin(v)*g;e.strokeStyle="rgba(56, 189, 248, 0.70)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,a),e.lineTo(f,E),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(f,E),e.lineTo(f-l*Math.cos(v-d),E-l*Math.sin(v-d)),e.lineTo(f-l*Math.cos(v+d),E-l*Math.sin(v+d)),e.closePath(),e.fill();const _=i+Math.cos(v)*(g*.55),T=a+Math.sin(v)*(g*.55),M="EARTH LOS (OCCULTED -6.3°) ✓";e.font='bold 7.5px "JetBrains Mono", monospace';const L=e.measureText(M).width;e.fillStyle="rgba(4, 14, 26, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.55)",e.lineWidth=1,e.beginPath(),e.roundRect(_-L/2-5,T-7,L+10,14,3),e.fill(),e.stroke(),e.fillStyle="#7dd3fc",e.textAlign="center",e.textBaseline="middle",e.fillText(M,_,T),e.restore()}drawScaleAndOrientation(e){const t=1e5*this.scalePxPerM,i=22,a=this.mapHeight-22;e.strokeStyle="#94a3b8",e.lineWidth=1.5,e.beginPath(),e.moveTo(i,a),e.lineTo(i+t,a),e.moveTo(i,a-4),e.lineTo(i,a+4),e.moveTo(i+t/2,a-2),e.lineTo(i+t/2,a+2),e.moveTo(i+t,a-4),e.lineTo(i+t,a+4),e.stroke(),e.fillStyle="#94a3b8",e.font='8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("0",i-2,a-6),e.textAlign="center",e.fillText("50 km",i+t/2,a-6),e.textAlign="right",e.fillText("100 km",i+t,a-6);const o=this.mapWidth-32,r=32;e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(o,r,13,0,2*Math.PI),e.stroke(),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(o,r-11),e.lineTo(o-4,r+2),e.lineTo(o+4,r+2),e.closePath(),e.fill(),e.fillStyle="#cbd5e1",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("N (0°)",o,r+11)}drawTrueSouthPole(e){var h;const{cx:s,cy:t}=this.projectMetersToCanvas(0,0),i=this.selectedSiteId==="south-pole",a=((h=this.hoveredSite)==null?void 0:h.id)==="south-pole";e.save(),e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.60)",e.lineWidth=i?1.5:1;const o=i?10:7;e.beginPath(),e.moveTo(s-o,t),e.lineTo(s+o,t),e.moveTo(s,t-o),e.lineTo(s,t+o),e.stroke(),e.strokeStyle=i?"#22d3ee":a?"#67e8f9":"rgba(34, 211, 238, 0.85)",e.lineWidth=i?2:1.3,e.beginPath(),e.arc(s,t,i?6.5:4.5,0,2*Math.PI),e.stroke(),i&&(e.strokeStyle="rgba(34, 211, 238, 0.40)",e.lineWidth=1,e.beginPath(),e.arc(s,t,10.5,0,2*Math.PI),e.stroke()),e.fillStyle="#ffffff",e.beginPath(),e.arc(s,t,i?2.2:1.6,0,2*Math.PI),e.fill();const r=i?"● 90.0°S True Pole (-0.25km)":"90°S True Pole";e.font=i?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const l=e.measureText(r).width,d=s-l-14,c=t-10;e.strokeStyle=i?"rgba(34, 211, 238, 0.65)":"rgba(34, 211, 238, 0.25)",e.lineWidth=1,e.beginPath(),e.moveTo(s-5,t-3),e.lineTo(d+l+4,c+6),e.stroke(),e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.40)",e.lineWidth=i?1.4:1,e.beginPath(),e.roundRect(d,c,l+8,13,2),e.fill(),e.stroke(),e.fillStyle=i?"#67e8f9":"#a5f3fc",e.textAlign="left",e.textBaseline="middle",e.fillText(r,d+4,c+6.5),e.restore()}drawCandidateSites(e){se.filter(t=>t.id!=="south-pole").forEach(t=>{var T;const{x:i,y:a}=Ie(t.lon,t.lat),{cx:o,cy:r}=this.projectMetersToCanvas(i,a),l=t.id===this.selectedSiteId,d=((T=this.hoveredSite)==null?void 0:T.id)===t.id,c=t.id==="site-01";if(e.save(),c)e.save(),e.translate(o,r),e.rotate(Math.PI/4),l&&(e.strokeStyle="rgba(245, 158, 11, 0.45)",e.lineWidth=1,e.strokeRect(-9,-9,18,18)),e.strokeStyle=l?"#f59e0b":d?"#fcd34d":"rgba(245, 158, 11, 0.85)",e.lineWidth=l?1.8:1.3,e.strokeRect(-4.5,-4.5,9,9),e.restore(),e.fillStyle=l?"#fcd34d":"#f59e0b",e.beginPath(),e.arc(o,r,l?2.2:1.6,0,2*Math.PI),e.fill();else{const M=d?"#67e8f9":t.id==="malapert"?"#34d399":t.id==="shackleton-rim"?"#38bdf8":"#94a3b8",L=l?"#38bdf8":M;l&&(e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(o,r,9.5,0,2*Math.PI),e.stroke()),e.strokeStyle=l?"#38bdf8":L,e.lineWidth=l?1.8:1.2,e.beginPath(),e.arc(o,r,l?5.5:3.8,0,2*Math.PI),e.stroke(),e.fillStyle=l?"#ffffff":L,e.beginPath(),e.arc(o,r,l?2:1.5,0,2*Math.PI),e.fill()}const h=(t.elevationM/1e3).toFixed(1),u=t.elevationM>=0?"+":"",m=l?`● ${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${u}${h}km)`:`${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${u}${h}km)`;e.font=l?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const v=e.measureText(m).width;let g=0,f=0;switch(t.id){case"shackleton-rim":g=o+12,f=r+12;break;case"malapert":g=o+10,f=r-8;break;case"nobile-rim-1":g=o+10,f=r+8;break;case"haworth-rim":g=o-v-14,f=r-8;break;case"de-gerlache-rim":g=o-v-14,f=r+6;break;case"site-01":g=o-v-14,f=r+16;break;default:g=o>=this.centerX?o+10:o-v-14,f=r>=this.centerY?r+8:r-8;break}e.strokeStyle=l?c?"rgba(245, 158, 11, 0.70)":"rgba(56, 189, 248, 0.70)":"rgba(148, 163, 184, 0.25)",e.lineWidth=1,e.beginPath();const E=g>o?g:g+v+8,_=f+6.5;e.moveTo(o,r),e.lineTo(E,_),e.stroke(),e.fillStyle="rgba(6, 12, 22, 0.92)",e.strokeStyle=l?c?"#f59e0b":"#38bdf8":d?"rgba(103, 232, 249, 0.60)":"rgba(148, 163, 184, 0.28)",e.lineWidth=l?1.4:1,e.beginPath(),e.roundRect(g,f,v+8,13,2),e.fill(),e.stroke(),e.fillStyle=l?c?"#fef08a":"#ffffff":d?"#e2e8f0":"#cbd5e1",e.textAlign="left",e.textBaseline="middle",e.fillText(m,g+4,f+6.5),e.restore()})}drawCustomSelectionMarker(e){if(!this.customSelection)return;const{x:s,y:t}=Ie(this.customSelection.lon,this.customSelection.lat),{cx:i,cy:a}=this.projectMetersToCanvas(s,t);e.save(),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.beginPath(),e.arc(i,a,6,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(i-9,a),e.lineTo(i+9,a),e.moveTo(i,a-9),e.lineTo(i,a+9),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i,a,2,0,2*Math.PI),e.fill();const o=`● Custom Target: ${Math.abs(this.customSelection.lat).toFixed(2)}°S, ${this.customSelection.lon.toFixed(1)}°E`;e.font='bold 7.5px "JetBrains Mono", monospace';const r=e.measureText(o).width,l=i>=this.centerX?i+12:i-r-14,d=a-6;e.strokeStyle="rgba(245, 158, 11, 0.70)",e.lineWidth=1,e.beginPath(),e.moveTo(i,a),e.lineTo(l>i?l:l+r+8,d+6.5),e.stroke(),e.fillStyle="rgba(8, 14, 26, 0.95)",e.strokeStyle="#f59e0b",e.lineWidth=1.4,e.beginPath(),e.roundRect(l,d,r+8,13,2),e.fill(),e.stroke(),e.fillStyle="#fef08a",e.textAlign="left",e.textBaseline="middle",e.fillText(o,l+4,d+6.5),e.restore()}handleMouseMove(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;let a=null,o=14;for(const r of se){const{x:l,y:d}=Ie(r.lon,r.lat),{cx:c,cy:h}=this.projectMetersToCanvas(l,d),u=Math.hypot(t-c,i-h);u<o&&(o=u,a=r)}a?(this.hoveredSite=a,this.canvas.style.cursor="pointer",this.showTooltip(a,e.clientX,e.clientY),this.draw()):(this.hoveredSite=null,this.canvas.style.cursor="crosshair",this.tooltipEl.classList.add("hidden"),this.draw())}showTooltip(e,s,t){const i=e.id==="site-01",a=e.id==="south-pole",o=i?"#f59e0b":a?"#22d3ee":"#38bdf8";this.tooltipEl.innerHTML=`
      <span class="spe-tt-dot" style="background:${o};box-shadow:0 0 6px ${o};"></span>
      <span class="spe-tt-name">${e.name}</span>
      <span class="spe-tt-lat">· ${Math.abs(e.lat).toFixed(1)}°S</span>
    `;const r=Math.min(s+14,window.innerWidth-180),l=Math.max(10,Math.min(t-20,window.innerHeight-50));this.tooltipEl.style.left=`${r}px`,this.tooltipEl.style.top=`${l}px`,this.tooltipEl.classList.remove("hidden")}handleClick(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;this.tooltipEl.classList.add("hidden");let a=null,o=14;for(const m of se){const{x:v,y:g}=Ie(m.lon,m.lat),{cx:f,cy:E}=this.projectMetersToCanvas(v,g),_=Math.hypot(t-f,i-E);_<o&&(o=_,a=m)}if(a){this.selectedSiteId=a.id,this.customSelection=null,this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData());return}const{x:r,y:l}=this.unprojectCanvasToMeters(t,i);if(Math.hypot(r,l)>this.MAX_EXTENT_M)return;const{lonDeg:c,latDeg:h}=Kt(r,l),u=He(c,h);this.selectedSiteId="custom",this.customSelection={lat:Number(h.toFixed(3)),lon:Number(c.toFixed(2)),elevM:0,isInsideDEM:u},this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData())}updateInfoCard(){if(!this.container.querySelector("#spe-info-card"))return;let s="Artemis Site 01",t="Shackleton–de Gerlache Connecting Ridge",i=-89.463,a=222.51,o=1100,r="High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",l=!0,d="CANDIDATE SITE";if(this.selectedSiteId==="custom"&&this.customSelection)s="Custom Selected Location",t="User Chosen Lunar Site",i=this.customSelection.lat,a=this.customSelection.lon,o=this.customSelection.elevM,l=this.customSelection.isInsideDEM,d="CUSTOM LOCATION",r=l?"Location lies within the validated 5 m/px high-resolution Site 01 DEM.":"Location lies outside the 5 m/px DEM footprint. Global LOLA ~60 m/px altimetry will be used for geometric ephemerides.";else{const h=se.find(u=>u.id===this.selectedSiteId)||se[0];s=h.name,t=h.designation,i=h.lat,a=h.lon,o=h.elevationM,r=h.description,l=!!h.isInsideSite01DEM,d=h.id==="south-pole"?"GEODETIC DATUM":"VERIFIED CANDIDATE"}const c=ut(i);this.setText("#spe-site-type",d),this.setText("#spe-site-cov",l?"5 m/px High-Resolution DEM":"Global LOLA (~60 m/px)"),this.setText("#spe-site-name",s),this.setText("#spe-site-desig",t),this.setText("#spe-cell-lat",`${i>=0?"+":""}${i.toFixed(3)}° S`),this.setText("#spe-cell-lon",`${a.toFixed(2)}° E`),this.setText("#spe-cell-elev",`${o>=0?"+":""}${o.toLocaleString()} m`),this.setText("#spe-cell-dist",`${c.toFixed(1)} km`),this.setText("#spe-site-desc",r)}setText(e,s){const t=this.container.querySelector(e);t&&(t.textContent=s)}}class Wt{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.isOpen&&!this.isGenerating&&this.close()})}openForMission(e,s){s&&(this.selectedFormat=s),this.mode="mission",this.missionContext=e,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(e,s){s&&(this.selectedFormat=s),this.mode="comparison",this.comparisonContext=e,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}async directMissionExport(e,s){this.selectedFormat=s,this.mode="mission",this.missionContext=e,await this.exportMission()}async directComparisonExport(e,s){this.selectedFormat=s,this.mode="comparison",this.comparisonContext=e,await this.exportComparison()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(e="mission"){this.isOpen?this.close():e==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var i,a,o;const e=this.mode==="mission",s=e?"Export Mission Scenario":"Export Candidate Comparison",t=e?`${((i=this.missionContext)==null?void 0:i.scenarioName)??"Mission"} · ${((a=this.missionContext)==null?void 0:a.siteName)??"Selected Site"}`:`${((o=this.comparisonContext)==null?void 0:o.scenarios.length)??0} Candidate Scenarios · NASA SPICE & LOLA DEM`;this.container.innerHTML=`
    <div class="mission-dialog export-dialog">
      <!-- Header -->
      <div class="mission-modal-header export-dialog-header">
        <div class="export-dialog-brand-row">
          <img src="/lunaops-emblem.svg" class="export-dialog-emblem" alt="LUNAOPS" />
          <div class="mission-header-info">
            <div class="export-title-line">
              <h2>${s}</h2>
              <span class="export-dialog-motto">PLAN WITH PRECISION</span>
            </div>
            <p class="export-subtitle">${t}</p>
          </div>
        </div>
        <div class="mission-header-controls">
          <button id="btn-close-export" class="modal-close-btn" title="Close">✕</button>
        </div>
      </div>

      <!-- Clean Body -->
      <div class="mission-body export-dialog-body">
        <!-- 3-Format Selection Grid -->
        <div class="export-format-grid">
          <!-- PDF Card -->
          <div class="export-format-card ${this.selectedFormat==="pdf"?"selected":""}" data-format="pdf" id="card-fmt-pdf">
            <div class="export-fmt-icon">📄</div>
            <div class="export-fmt-head">
              <span class="export-fmt-label">PDF Report</span>
              <span class="export-tag tag-pdf">Publication Ready</span>
            </div>
            <p class="export-fmt-desc">Comprehensive executive document with side-by-side metric tables, charts &amp; rankings.</p>
          </div>

          <!-- CSV Card -->
          <div class="export-format-card ${this.selectedFormat==="csv"?"selected":""}" data-format="csv" id="card-fmt-csv">
            <div class="export-fmt-icon">📊</div>
            <div class="export-fmt-head">
              <span class="export-fmt-label">CSV Matrix</span>
              <span class="export-tag tag-csv">Numerical Data</span>
            </div>
            <p class="export-fmt-desc">Standardized raw telemetry matrix with explicit engineering units for Python / Excel.</p>
          </div>

          <!-- JSON Card -->
          <div class="export-format-card ${this.selectedFormat==="json"?"selected":""}" data-format="json" id="card-fmt-json">
            <div class="export-fmt-icon">💾</div>
            <div class="export-fmt-head">
              <span class="export-fmt-label">JSON Manifest</span>
              <span class="export-tag tag-json">Reproducibility</span>
            </div>
            <p class="export-fmt-desc">Machine-readable provenance schema containing SPICE kernel digests &amp; parameters.</p>
          </div>
        </div>

        <!-- Telemetry Coverage Badges -->
        <div class="export-badges-row">
          <span class="export-pill">✓ Topocentric Coordinates</span>
          <span class="export-pill">✓ Solar &amp; Earth Vectors</span>
          <span class="export-pill">✓ LOLA DEM Terrain</span>
          <span class="export-pill">✓ SPICE Provenance</span>
        </div>

        <!-- Feedback & Status Notification -->
        ${this.renderStatus()}
      </div>

      <!-- Clean Footer -->
      <div class="mission-footer export-dialog-footer">
        <div class="export-footer-left">
          <span class="active-fmt-indicator">Format: <strong>${this.selectedFormat.toUpperCase()}</strong></span>
        </div>
        <div class="export-footer-actions">
          <button id="btn-cancel-export" class="btn-secondary" ${this.isGenerating?"disabled":""}>Cancel</button>
          <button id="btn-generate-export" class="btn-primary btn-highlight-compare ${this.isGenerating?"loading":""}" ${this.isGenerating?"disabled":""}>
            ${this.isGenerating?"⏳ Generating...":`📥 Download ${this.selectedFormat.toUpperCase()} Export`}
          </button>
        </div>
      </div>
    </div>
    `,this.wireEvents()}renderStatus(){if(this.isGenerating)return`
      <div class="export-status-bar status-info">
        <span class="spinner">⏳</span>
        <span>Evaluating SPICE kernels and assembling ${this.selectedFormat.toUpperCase()} artifact... please wait.</span>
      </div>`;if(this.statusMessage){const e=this.statusMessage.type==="error"?"status-error":"status-success",s=this.statusMessage.type==="error"?"❌":"✅";return`
      <div class="export-status-bar ${e}">
        <span>${s}</span>
        <span>${this.statusMessage.text}</span>
      </div>`}return""}wireEvents(){var s,t,i;(s=this.container.querySelector("#btn-close-export"))==null||s.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#btn-cancel-export"))==null||t.addEventListener("click",()=>this.close()),this.container.onclick=a=>{a.target===this.container&&!this.isGenerating&&this.close()},this.container.querySelectorAll(".export-format-card").forEach(a=>{a.addEventListener("click",()=>{if(this.isGenerating)return;const o=a.getAttribute("data-format")||"pdf";this.selectedFormat=o,this.render()})}),(i=this.container.querySelector("#btn-generate-export"))==null||i.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(e){console.error("[LUNAOPS] Export failed:",e),this.statusMessage={type:"error",text:e.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var r;if(!this.missionContext)throw new Error("Missing mission scenario context.");const e=this.missionContext,s={scenario_name:e.scenarioName||"Artemis Candidate Mission",notes:e.notes||"",site_name:e.siteName||"South Pole Site",latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:e.startUtc,end_utc:e.endUtc,step_minutes:e.stepMinutes,timeline_result:e.timelineResponse||null,horizon_result:e.horizonProfile||null},t=`/api/export/mission?format=${this.selectedFormat}`;let i;try{i=await fetch(`${Oe}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}catch{i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}if(!i.ok){let l=`HTTP ${i.status}`;try{const d=await i.json();l=((r=d.detail)==null?void 0:r.message)||JSON.stringify(d.detail||d)}catch{l=await i.text()}throw new Error(`Export failed: ${l}`)}const a=(e.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),o=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const l=await i.blob();this.triggerDownload(l,`lunaops_${a}_report_${o}.pdf`)}else if(this.selectedFormat==="csv"){const l=await i.text(),d=new Blob([l],{type:"text/csv;charset=utf-8;"});this.triggerDownload(d,`lunaops_${a}_timeseries_${o}.csv`)}else{const l=await i.json(),d=new Blob([JSON.stringify(l,null,2)],{type:"application/json"});this.triggerDownload(d,`lunaops_${a}_manifest_${o}.json`)}}async exportComparison(){var r;if(!this.comparisonContext)throw new Error("Missing comparison context.");const e=this.comparisonContext;if(!e.scenarios||e.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const s=e.scenarios.map(l=>{let d=`${l.startDate}T${l.startTime}`;d.endsWith("Z")||(d+="Z");let c=`${l.endDate}T${l.endTime}`;return c.endsWith("Z")||(c+="Z"),{id:l.id,name:l.name,latitude_deg:l.latitudeDeg,longitude_deg:l.longitudeDeg,elevation_m:l.elevationM,instrument_height_m:l.instrumentHeightM,start_utc:d,end_utc:c,step_minutes:l.stepMinutes}}),t={report_title:e.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:s,constraints:e.constraints||null,ranking_weights:e.rankingWeights||null,comparison_result:e.comparisonResult||null},i=`/api/export/comparison?format=${this.selectedFormat}`;let a;try{a=await fetch(`${Oe}${i}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch{a=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}if(!a.ok){let l=`HTTP ${a.status}`;try{const d=await a.json();l=((r=d.detail)==null?void 0:r.message)||JSON.stringify(d.detail||d)}catch{l=await a.text()}throw new Error(`Comparison export failed: ${l}`)}const o=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const l=await a.blob();this.triggerDownload(l,`lunaops_comparison_report_${o}.pdf`)}else if(this.selectedFormat==="csv"){const l=await a.text(),d=new Blob([l],{type:"text/csv;charset=utf-8;"});this.triggerDownload(d,`lunaops_comparison_matrix_${o}.csv`)}else{const l=await a.json(),d=new Blob([JSON.stringify(l,null,2)],{type:"application/json"});this.triggerDownload(d,`lunaops_comparison_manifest_${o}.json`)}}triggerDownload(e,s){const t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}class ia{constructor(){b(this,"datasets",new Map);b(this,"activeDatasetId","site01");b(this,"rasterCanvasCache",new Map);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const e=await fetch("/generated/terrain/terrain_registry.json");if(!e.ok){console.warn("[TerrainEngine] Failed loading terrain_registry.json");return}((await e.json()).datasets||[]).forEach(i=>{this.datasets.set(i.dataset_id,i)}),await this.loadDatasetRasters(this.activeDatasetId),this.isLoaded=!0}catch(e){console.warn("[TerrainEngine] Initialization error:",e)}})(),this.loadPromise)}getDatasets(){return Array.from(this.datasets.values())}getDatasetById(e){return this.datasets.get(e)}getActiveDataset(){return this.datasets.get(this.activeDatasetId)||this.datasets.get("site01")||this.getFallbackMetadata()}async setActiveDataset(e){return this.datasets.has(e)&&(this.activeDatasetId=e,await this.loadDatasetRasters(e)),this.getActiveDataset()}findBestDatasetForCoords(e,s){const{x:t,y:i}=Ie(s,e);for(const o of this.datasets.values())if(!o.is_regional){const r=o.bounds_polar_m;if(t>=r.minX&&t<=r.maxX&&i>=r.minY&&i<=r.maxY)return o}const a=this.datasets.get("region80m");if(a){const o=a.bounds_polar_m;if(t>=o.minX&&t<=o.maxX&&i>=o.minY&&i<=o.maxY)return a}return this.getActiveDataset()}findDatasetForCandidate(e){for(const t of this.datasets.values())if(t.matching_candidates.includes(e))return t;const s=this.datasets.get("region80m");return s||this.getActiveDataset()}async loadDatasetRasters(e){const s=this.datasets.get(e);if(!s)return;const t=[{key:`${e}_elev_raw`,url:s.layers.elev_raw},{key:`${e}_slope`,url:s.layers.slope},{key:`${e}_toterr`,url:s.layers.toterr},{key:`${e}_slperr`,url:s.layers.slperr},{key:`${e}_ldec`,url:s.layers.ldec}];await Promise.all(t.map(async({key:i,url:a})=>{if(!(!a||this.rasterCanvasCache.has(i)))try{const o=await this.loadImage(a),r=document.createElement("canvas");r.width=o.width,r.height=o.height;const l=r.getContext("2d",{willReadFrequently:!0});l&&l.drawImage(o,0,0),this.rasterCanvasCache.set(i,r)}catch(o){console.warn(`[TerrainEngine] Could not load layer ${i}:`,o)}}))}loadImage(e){return new Promise((s,t)=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>s(i),i.onerror=a=>t(a),i.src=e})}polarStereoToPixel(e,s,t){const i=e.bounds_polar_m,a=s>=i.minX&&s<=i.maxX&&t>=i.minY&&t<=i.maxY,o=(s-i.minX)/i.widthM,r=(i.maxY-t)/i.heightM,l=Math.max(0,Math.min(511,Math.round(o*512))),d=Math.max(0,Math.min(511,Math.round(r*512)));return{px:l,py:d,isInside:a}}pixelToPolarStereo(e,s,t){const i=e.bounds_polar_m,a=Math.max(0,Math.min(1,s/512)),o=Math.max(0,Math.min(1,t/512)),r=i.minX+a*i.widthM,l=i.maxY-o*i.heightM;return{x:r,y:l}}pixelToSelenographic(e,s,t){const{x:i,y:a}=this.pixelToPolarStereo(e,s,t),{lonDeg:o,latDeg:r}=Kt(i,a);return{latDeg:r,lonDeg:o,x:i,y:a}}sample(e,s,t){const{x:i,y:a}=Ie(e,s);let o;t&&this.datasets.has(t)?o=this.datasets.get(t):o=this.findBestDatasetForCoords(s,e);const{px:r,py:l,isInside:d}=this.polarStereoToPixel(o,i,a),c={isInside:d,datasetId:o.dataset_id,datasetName:o.dataset_name,isRegional:o.is_regional,resolutionLabel:o.resolution_label,px:r,py:l,xM:i,yM:a};if(!d)return c;try{const h=this.rasterCanvasCache.get(`${o.dataset_id}_elev_raw`),u=this.rasterCanvasCache.get(`${o.dataset_id}_slope`),m=this.rasterCanvasCache.get(`${o.dataset_id}_toterr`),v=this.rasterCanvasCache.get(`${o.dataset_id}_slperr`),g=this.rasterCanvasCache.get(`${o.dataset_id}_ldec`);if(!h)return c;const f=h.getContext("2d",{willReadFrequently:!0}),E=u==null?void 0:u.getContext("2d",{willReadFrequently:!0}),_=m==null?void 0:m.getContext("2d",{willReadFrequently:!0}),T=v==null?void 0:v.getContext("2d",{willReadFrequently:!0}),M=g==null?void 0:g.getContext("2d",{willReadFrequently:!0}),L=(f==null?void 0:f.getImageData(r,l,1,1).data[0])??0,O=(E==null?void 0:E.getImageData(r,l,1,1).data[0])??0,I=(_==null?void 0:_.getImageData(r,l,1,1).data[0])??0,P=(T==null?void 0:T.getImageData(r,l,1,1).data[0])??0,D=(M==null?void 0:M.getImageData(r,l,1,1).data[0])??0,G=o.elevation.max_m-o.elevation.min_m,U=o.elevation.min_m+L/255*G,F=O/255*o.slope.display_max_deg,K=I/255*o.elevation_uncertainty.display_max_m;let ae;o.slope_uncertainty.available&&o.slope_uncertainty.max_deg&&(ae=P/255*o.slope_uncertainty.max_deg);let be;return o.observation_density.available&&o.observation_density.max_count&&(be=Math.round(D/255*o.observation_density.max_count)),{...c,elevationM:Math.round(U*10)/10,slopeDeg:Math.round(F*10)/10,errorM:Math.round(K*100)/100,slopeErrorDeg:ae!==void 0?Math.round(ae*100)/100:void 0,obsCount:be}}catch{return c}}getMetadata(){return this.getActiveDataset()}getFallbackMetadata(){return{dataset_id:"site01",dataset_name:"NASA LOLA Artemis Site 01 (Connecting Ridge)",source:"NASA LRO / LOLA Team",is_regional:!1,resolution_m:5,resolution_label:"5.0 m/px",matching_candidates:["site-01"],original_raster:{shape:[3200,3200],resolution:5,crs:"Polar Stereographic"},bounds_polar_m:{minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,widthM:16e3,heightM:16e3},center:{lat:-89.463,lon:222.51,x_m:-11e3,y_m:-12e3},lat_range:[-89.84,-89.09],lon_range:[188.5,258.1],elevation:{min_m:-517.9,max_m:1958.3,p1_m:-177,p99_m:1897.9,units:"m"},slope:{min_deg:0,max_deg:64.6,display_max_deg:30,units:"deg"},elevation_uncertainty:{min_m:.06,max_m:5.58,display_max_m:2,units:"m"},slope_uncertainty:{available:!1,max_deg:null,units:"deg"},observation_density:{available:!1,max_count:null,units:"shots"},layers:{elev_hill:"/generated/terrain/site01/elev_hill.png",elev_raw:"/generated/terrain/site01/elev_raw.png",slope:"/generated/terrain/site01/slope.png",toterr:"/generated/terrain/site01/toterr.png",slperr:null,ldec:null}}}}const ee=new ia,B=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class aa{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"activeDatasetId","site01");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"_isSyncingFromGlobe",!1);b(this,"onSiteChangedCallback");this.selectedSite={name:B[0].name,designation:B[0].designation,latitudeDeg:B[0].lat,longitudeDeg:B[0].lon,elevationM:B[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}getActiveDatasetId(){return this.activeDatasetId}setOnSiteChanged(e){this.onSiteChangedCallback=e}setOnTimelineScrubbed(e){this.onTimelineScrubbedCallback=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(e,s,t,i){this._isSyncingFromGlobe=!0;try{if(this.selectedSite.latitudeDeg=Math.round(e*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(s*1e3)/1e3,t&&!t.toLowerCase().includes("custom"))this.selectedSite.name=t,this.selectedSite.designation=i||"Landing Candidate";else{const a=se.find(o=>Math.abs(o.lat-e)<.08&&Math.abs(o.lon-s)<.08);a?(this.selectedSite.name=a.name,this.selectedSite.designation=a.designation):(this.selectedSite.name=t||"Custom Selected Location",this.selectedSite.designation=i||"User Chosen Site")}this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}finally{this._isSyncingFromGlobe=!1}}async init(){await ee.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await Vt()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const e=this.selectedSite.latitudeDeg,s=this.selectedSite.longitudeDeg,t=ee.sample(s,e);if(this.selectedSite.isInsideSite01DEM=t.isInside&&!t.isRegional,this.activeDatasetId=t.datasetId,ee.setActiveDataset(t.datasetId).catch(()=>{}),t.isInside)this.selectedSite.demDatasetName=`${t.datasetName} (${t.resolutionLabel})`,this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords={px:t.px,py:t.py,gridMax:512},this.selectedSite.polarStereoM={x:t.xM,y:t.yM},t.elevationM!==void 0&&(this.selectedSite.elevationM=t.elevationM);else{this.selectedSite.demDatasetName=t.datasetName,this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords=void 0;const{x:i,y:a}=Ie(s,e);this.selectedSite.polarStereoM={x:i,y:a};const o=se.find(r=>Math.abs(r.lat-e)<.08&&Math.abs(r.lon-s)<.08);o&&t.elevationM===void 0&&(this.selectedSite.elevationM=o.elevationM)}!this._isSyncingFromGlobe&&this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const e=`${this.timeline.startDate}T${this.timeline.startTime}Z`,s=Date.parse(e);if(isNaN(s))return;this.timeline.isoUtcStart=new Date(s).toISOString().replace(".000Z","Z");const t=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,i=s+this.timeline.durationValue*t;this.timeline.isoUtcEnd=new Date(i).toISOString().replace(".000Z","Z");const a=new Date(s).getUTCFullYear(),o=new Date(i).getUTCFullYear();this.timeline.isWithinKernelCoverage=a>=1900&&a<=2050&&o>=1900&&o<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var o;const e=[];(o=this.spiceHealth)!=null&&o.initialized?e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const s=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;s>=-90&&s<=90&&t>=-180&&t<=360?e.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${V(s,t)} · Elevation: ${this.selectedSite.elevationM} m`}):e.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?e.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):e.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let i="READY",a="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return e.some(r=>r.status==="fail")?(i="ERROR",a="One or more required parameters failed validation. Correct items marked in red."):e.some(r=>r.status==="warn")&&(i="READY_WITH_LIMITATIONS",a="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:i,summary:a,checks:e}}toScenarioJSON(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:e,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();this.container.innerHTML=`
    <div class="mission-dialog">
      <div class="mission-header">
        <div class="mission-brand-lockup">
          <img src="/lunaops-emblem.svg" class="mission-header-emblem" alt="LUNAOPS" />
          <div class="mission-title-group">
            <div class="mission-kicker">
              <span>NASA SPACE APPS 2026 &middot; CLPS MISSION PLANNER</span>
              <span class="mission-motto-tag">PLAN WITH PRECISION</span>
            </div>
            <h2 class="mission-title">New Mission Analysis Workspace</h2>
          </div>
        </div>
        <div class="mission-header-actions">
          <span class="readiness-pill ${e.state.toLowerCase()}">${e.state.replace(/_/g," ")}</span>
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
        ${this.renderTabContent(e)}
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
    `,this.wireEvents(),this.currentTab==="site"&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(e){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(e);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(e);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.horizonVisibility,t=this.horizonProfile,i=l=>l==="no_obstruction_detected_within_coverage"?"✅":l==="near_horizon_grazing"?"⚠️":l==="blocked_by_local_terrain"?"🪨":l==="blocked_by_lunar_body"?"🌑":"❓",a=l=>l==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":l==="near_horizon_grazing"?"Near-Horizon Grazing":l==="blocked_by_local_terrain"?"Blocked by Terrain":l==="blocked_by_lunar_body"?"Occulted by Moon":l==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",o=l=>l==="no_obstruction_detected_within_coverage"?"#22c55e":l==="near_horizon_grazing"?"#f59e0b":l.startsWith("blocked")?"#ef4444":"#94a3b8",r=(l,d,c)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${o(c.visibility_status)}">
          <span class="geom-body-title">${d} ${l}</span>
          <span class="horizon-badge" style="background: ${o(c.visibility_status)}22; color: ${o(c.visibility_status)}; border: 1px solid ${o(c.visibility_status)}44">
            ${i(c.visibility_status)} ${a(c.visibility_status)}
          </span>
        </div>
        <div class="geom-values">
          <div class="geom-row"><span>Azimuth:</span> <strong>${c.azimuth_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Geometric Elevation:</span> <strong>${c.geometric_elevation_deg.toFixed(2)}°</strong></div>
          ${c.terrain_horizon_elevation_deg!==null?`
          <div class="geom-row"><span>Terrain Skyline:</span> <strong>${c.terrain_horizon_elevation_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Angular Clearance:</span> <strong style="color:${(c.angular_clearance_deg??0)>0?"#22c55e":"#ef4444"}">${c.angular_clearance_deg!==null?(c.angular_clearance_deg>=0?"+":"")+c.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
          `:""}
          ${c.horizon_distance_m!==null?`<div class="geom-row"><span>Skyline Distance:</span> <strong>${(c.horizon_distance_m/1e3).toFixed(2)} km</strong></div>`:""}
        </div>
        <div class="vis-note">${c.note}</div>
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

      ${e?"":`
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

      ${!s&&!this.horizonLoading?`
      <div class="empty-geom-state">
        <p>No terrain horizon evaluation has been run yet.</p>
        <p class="hint">First evaluate SPICE geometry on the <strong>Readiness &amp; SPICE</strong> tab, then click <strong>Evaluate Terrain Horizon</strong> above to compute Sun and Earth terrain obstruction.</p>
      </div>
      `:""}

      ${s?`
      <div class="vis-cards-row">
        ${r("Sun","☀️",s.sun)}
        ${r("Earth","🌍",s.earth)}
      </div>

      <div class="panel-card" style="margin-top:16px">
        <div class="card-header">
          <h3>360° Terrain Skyline Profile</h3>
          <span style="font-size:0.78rem;color:var(--text-muted)">Angular resolution: ${(t==null?void 0:t.angular_step_deg)??2}° · Max range: 16 km</span>
        </div>
        <div class="horizon-chart-wrapper">
          <canvas id="horizon-polar-canvas" width="480" height="480" style="display:block;margin:0 auto;"></canvas>
        </div>
        <div class="geom-meta-bar" style="margin-top:8px">
          <span>DEM: <code>${s.dem_dataset}</code></span>
          <span>DEM Loaded: <code>${s.dem_loaded?"Yes":"No"}</code></span>
          <span>Coverage: <code>${s.site.is_inside_dem?"Inside Site 01":"Outside Site 01"}</code></span>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);margin:8px 16px 0">${s.note}</p>
      </div>
      `:""}
    </div>
    `}renderSiteTab(){const e=this.selectedSite.latitudeDeg,s=this.selectedSite.longitudeDeg,t=this.selectedSite.isInsideSite01DEM;return`
    <div class="tab-pane">
      <div class="grid-two-col">
        <!-- Left: Local Terrain Visualizer -->
        <div class="panel-card terrain-canvas-card">
          <div class="card-header">
            <h3>Detailed Local Terrain (${ee.getActiveDataset().resolution_label||"Multi-Site"})</h3>
            <div class="layer-toggle-group">
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="elev"?"active":""}" data-layer="elev">Elevation</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="slope"?"active":""}" data-layer="slope">Slope</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="toterr"?"active":""}" data-layer="toterr">Uncertainty</button>
              ${ee.getActiveDataset().slope_uncertainty.available?`<button class="btn-layer-toggle ${this.activeTerrainLayer==="slperr"?"active":""}" data-layer="slperr">Slope Err</button>`:""}
              ${ee.getActiveDataset().observation_density.available?`<button class="btn-layer-toggle ${this.activeTerrainLayer==="ldec"?"active":""}" data-layer="ldec">Obs Density</button>`:""}
            </div>
          </div>

          <div class="canvas-wrapper">
            <canvas id="site01-terrain-canvas" width="512" height="512" class="terrain-canvas"></canvas>
            <div class="canvas-overlay-crosshair-note">
              ${t?"Click anywhere on terrain tile to target coordinates":`Regional coverage — ${ee.getActiveDataset().resolution_label}`}
            </div>
          </div>

          <div class="terrain-stat-bar">
            <div class="stat-cell">
              <span class="stat-lbl">DEM ELEVATION</span>
              <span class="stat-val ${t?"val-good":""}">
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
            ${B.map(i=>`
              <div class="preset-item ${i.lat===e&&i.lon===s?"selected":""}" data-preset-id="${i.id}">
                <div class="preset-title-row">
                  <span class="preset-name">${i.name}</span>
                  <span class="preset-tag ${["site-01","shackleton-rim","nobile-rim-1","malapert"].includes(i.id)?"tag-dem":"tag-global"}">
                    ${["site-01","shackleton-rim","nobile-rim-1","malapert"].includes(i.id)?"5m DEM":"Global LOLA"}
                  </span>
                </div>
                <div class="preset-desc">${i.description}</div>
                <div class="preset-coords">${i.lat.toFixed(3)}° S, ${i.lon.toFixed(2)}° E (${i.elev>=0?"+":""}${i.elev} m)</div>
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
                <input id="inp-lat" type="number" step="0.001" min="-90" max="90" value="${e.toFixed(3)}" />
                <span class="hint-pill">Negative = South (°S)</span>
              </div>
            </div>

            <div class="form-row">
              <label for="inp-lon">Longitude (°)</label>
              <div class="input-with-hint">
                <input id="inp-lon" type="number" step="0.001" min="-180" max="360" value="${s.toFixed(3)}" />
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

            <div class="coverage-status-box ${t?"status-dem-active":"status-dem-outside"}">
              <div class="status-indicator-dot"></div>
              <div class="status-text">
                <strong>${t?`Inside ${ee.getActiveDataset().dataset_name} (${ee.getActiveDataset().resolution_label})`:ee.getActiveDataset().dataset_name||"Outside High-Resolution DEM"}</strong>
                <p>${t?`Rigorous polar stereographic transform active. Source: ${ee.getActiveDataset().source}.`:"Coordinates will use SPICE geometric ephemeris with the best available LOLA elevation relief."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}renderTimelineTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.timelineResponse,t=s==null?void 0:s.summary,i=(s==null?void 0:s.samples)??[],a=i[this.scrubbedSampleIndex]??i[0],o=c=>{switch(c){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},r=c=>{switch(c){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},l=c=>{switch(c){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},d=c=>{switch(c){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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

          <div class="kernel-coverage-box ${e?"coverage-ok":"coverage-warning"}" style="margin-top:8px;">
            <div class="coverage-icon">${e?"🗺️":"⚠️"}</div>
            <div>
              <strong>${e?"Site 01 High-Resolution 5 m/px DEM Active":"Outside Site 01 High-Resolution Footprint"}</strong>
              <p>${e?"Rigorous topocentric ray-marching across 16×16 km polar stereographic raster.":"Terrain occlusion cannot be evaluated outside tile footprint; results will indicate unknown coverage."}</p>
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

      ${s&&t?`
      <!-- KPI Metric Cards -->
      <div class="kpi-grid-row" style="margin-top:16px;">
        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>☀️ Solar Illumination Summary</h3>
            <span class="badge-pill">Apparent Disc: ~0.53°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Sunlight:</span> <strong style="color:#22c55e;">${t.sunlight.full_sunlight_hours} h (${t.sunlight.full_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Penumbral / Grazing:</span> <strong style="color:#f59e0b;">${t.sunlight.partial_sunlight_hours} h (${t.sunlight.partial_sunlight_percent}%)</strong></div>
            <div class="kpi-row"><span>Total Darkness:</span> <strong style="color:#94a3b8;">${t.sunlight.total_darkness_hours} h (${t.sunlight.total_darkness_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Sunlight:</span> <strong>${t.sunlight.max_continuous_sunlight_hours} h</strong></div>
            <div class="kpi-row"><span>Max Continuous Darkness:</span> <strong>${t.sunlight.max_continuous_darkness_hours} h</strong></div>
            <div class="kpi-row"><span>Sunrise / Sunset Cycles:</span> <strong>${t.sunlight.transition_count} transitions</strong></div>
          </div>
        </div>

        <div class="panel-card kpi-card">
          <div class="card-header">
            <h3>🌍 Direct-to-Earth Line of Sight</h3>
            <span class="badge-pill">Apparent Disc: ~1.9°</span>
          </div>
          <div class="kpi-values">
            <div class="kpi-row"><span>Full Disc LOS:</span> <strong style="color:#3b82f6;">${t.earth_los.full_disc_los_hours} h (${t.earth_los.full_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Centre / Partial LOS:</span> <strong style="color:#06b6d4;">${t.earth_los.partial_disc_los_hours} h (${t.earth_los.partial_disc_los_percent}%)</strong></div>
            <div class="kpi-row"><span>Occulted:</span> <strong style="color:#ef4444;">${t.earth_los.occulted_hours} h (${t.earth_los.occulted_percent}%)</strong></div>
            <div class="kpi-row"><span>Max Continuous Earth LOS:</span> <strong>${t.earth_los.max_continuous_los_hours} h</strong></div>
            <div class="kpi-row"><span>Occultation Events:</span> <strong>${t.earth_los.transition_count} transitions</strong></div>
          </div>
          <div class="vis-note" style="margin-top:8px; border-radius:4px; font-size:0.72rem;">
            ${t.earth_los.communication_disclaimer}
          </div>
        </div>
      </div>

      <!-- Interactive Multi-Track Visual Timeline & Scrubber -->
      <div class="panel-card" style="margin-top:16px;">
        <div class="card-header">
          <h3>Interactive Mission Timeline &amp; Synchronized Scrubber</h3>
          <span style="font-size:0.78rem;color:var(--text-muted);">${i.length} discrete SPICE samples · Bisection refined to 60s</span>
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
              ${s.sun_windows.map(c=>`
                <div class="timeline-bar-seg" style="flex: ${c.duration_hours}; background: ${l(c.state)};" title="${c.state.replace(/_/g," ")}: ${c.duration_hours}h (${c.start_utc} → ${c.end_utc})"></div>
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
              ${s.earth_windows.map(c=>`
                <div class="timeline-bar-seg" style="flex: ${c.duration_hours}; background: ${d(c.state)};" title="${c.state.replace(/_/g," ")}: ${c.duration_hours}h (${c.start_utc} → ${c.end_utc})"></div>
              `).join("")}
            </div>
          </div>

          <!-- Range slider scrubber -->
          <div class="scrubber-container" style="margin-top:16px;">
            <input id="inp-timeline-scrubber" type="range" min="0" max="${i.length-1}" value="${this.scrubbedSampleIndex}" step="1" class="timeline-scrubber-slider" style="width:100%;" />
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
              <span class="badge-pill">Sample ${this.scrubbedSampleIndex+1} of ${i.length}</span>
            </div>

            <div class="scrubbed-grid">
              <div class="scrubbed-col">
                <div class="scrubbed-col-title">☀️ Sun Ephemeris &amp; Illumination</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${o(a.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${a.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${a.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${a.sun.terrain_horizon_elevation_deg!==null?a.sun.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(a.sun.angular_clearance_deg??0)>=0?"#22c55e":"#ef4444"}">${a.sun.angular_clearance_deg!==null?(a.sun.angular_clearance_deg>=0?"+":"")+a.sun.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${r(a.earth.visibility_state)}</span></div>
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
              ${s.sun_windows.map(c=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">☀️ Sun</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${c.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${c.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${c.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${o(c.state)}</td>
                </tr>
              `).join("")}
              ${s.earth_windows.map(c=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${c.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${c.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${c.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${r(c.state)}</td>
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
    `}renderReadinessTab(e){const s=this.initialGeometry;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Data-Readiness Checklist</h3>
          <span class="readiness-pill ${e.state.toLowerCase()}">${e.state.replace(/_/g," ")}</span>
        </div>
        <p class="readiness-summary-line">${e.summary}</p>

        <div class="checks-list">
          ${e.checks.map(t=>`
            <div class="check-item check-${t.status}">
              <div class="check-icon">${t.status==="pass"?"✓":t.status==="warn"?"⚠":"✕"}</div>
              <div class="check-body">
                <div class="check-label">${t.label}</div>
                <div class="check-detail">${t.detail}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="card-header separator-header">
          <h3>SPICE Ephemeris Geometry Preview (Single Timestamp)</h3>
          <button id="btn-eval-spice-tab" class="btn-primary">⚡ Evaluate Live Geometry</button>
        </div>

        <div class="geometry-preview-area">
          ${s?`
            <div class="geom-result-grid">
              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">☀️ Sun Position</span>
                  <span class="horizon-badge ${s.sun.elevation_deg>=0?"badge-above":"badge-below"}">
                    ${s.sun.elevation_deg>=0?"↑ Above Horizon":"↓ Below Horizon"}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${s.sun.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${s.sun.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${(s.sun.distance_au??s.sun.distance_km/1495978707e-1).toFixed(4)} AU (${(s.sun.distance_km/1e6).toFixed(2)}M km)</strong></div>
                </div>
              </div>

              <div class="geom-card">
                <div class="geom-card-header">
                  <span class="geom-body-title">🌍 Earth Position</span>
                  <span class="horizon-badge ${s.earth.elevation_deg>=0?"badge-above":"badge-below"}">
                    ${s.earth.elevation_deg>=0?"↑ Line-of-Sight":"↓ Below Horizon"}
                  </span>
                </div>
                <div class="geom-values">
                  <div class="geom-row"><span>Azimuth:</span> <strong>${s.earth.azimuth_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Elevation:</span> <strong>${s.earth.elevation_deg.toFixed(2)}°</strong></div>
                  <div class="geom-row"><span>Distance:</span> <strong>${Math.round(s.earth.distance_km).toLocaleString()} km</strong></div>
                </div>
              </div>
            </div>

            <div class="geom-meta-bar">
              <span>Epoch: <code>${s.spice_utc}</code> (ET: ${s.ephemeris_time_s.toFixed(2)} s)</span>
              <span>Frame: <code>${s.reference_frame}</code></span>
              <span>Aberration: <code>${s.aberration_correction}</code></span>
            </div>
          `:`<div class="empty-geom-state">
                  <p>No ephemeris calculation performed yet for this scenario configuration.</p>
                  <p class="hint">Click <strong>Evaluate Live Geometry</strong> above to send parameters to the SPICE backend.</p>
                 </div>`}
        </div>
      </div>
    </div>
    `}renderSummaryTab(e){var i;const s=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>Scenario Configuration Summary</h3>
          <span class="readiness-pill ${e.state.toLowerCase()}">${e.state.replace(/_/g," ")}</span>
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
              <td><code>${V(s,t)}</code></td>
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
              <td>${(i=this.spiceHealth)!=null&&i.initialized?"Online · Verified NAIF SPK/PCK/FK":"Offline"}</td>
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
    `}openExportModal(e){this.exportPanel||(this.exportPanel=new Wt),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},e)}renderExportTab(){const e=this.timelineResponse!==null;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <div class="export-header-brand">
            <img src="/lunaops-emblem.svg" class="export-tab-emblem" alt="LUNAOPS" />
            <div>
              <h3>Scientific Report Export &amp; Reproducibility</h3>
              <span class="export-motto-badge">EXPLORE THE LUNAR FRONTIER &middot; PLAN WITH PRECISION</span>
            </div>
          </div>
          <span class="coverage-pill ${e?"coverage-inside":"coverage-pending"}">
            ${e?"TIMELINE COMPUTED":"TIMELINE PENDING"}
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
    `}renderLandingWindowsTab(){const e=this.landingWindowsResponse,s=(e==null?void 0:e.days)??[],t=e==null?void 0:e.scan_params,i=e==null?void 0:e.summary,a=d=>{try{return new Date(d+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return d}},o=(d,c)=>{switch(d){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${c})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${c})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${c})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${c})</span>`}},r=d=>{switch(d){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},l=s.filter(d=>this.landingWindowsFilter==="safe"?d.is_safe_for_landing:this.landingWindowsFilter==="excellent"?d.safety_rating==="excellent":!0);return`
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

      ${!e&&!this.landingWindowsLoading&&!this.landingWindowsError?`
      <div class="empty-geom-state" style="padding: 2.5rem 1.5rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🗓️</div>
        <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem;">No Landing Windows Scan Computed Yet</p>
        <p class="hint" style="max-width: 560px; margin: 0 auto 1.25rem;">
          Click <strong>Scan Landing Windows</strong> above to analyze solar power availability, illumination, and direct-to-Earth communications across the selected date range.
        </p>
        <button id="btn-run-initial-scan" class="btn-primary">⚡ Run Scan for Selected Range</button>
      </div>
      `:""}

      ${e&&!this.landingWindowsLoading?`
      <!-- Summary KPI Grid -->
      <div class="windows-kpi-grid">
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">TOTAL DAYS SCANNED</span>
          <span class="windows-kpi-val">${(t==null?void 0:t.total_days)??0} days</span>
          <span class="windows-kpi-sub">${(t==null?void 0:t.step_hours)??6}h step · ${((t==null?void 0:t.total_days)??0)*((t==null?void 0:t.samples_per_day)??4)} samples</span>
        </div>
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">SAFE LANDING DAYS</span>
          <span class="windows-kpi-val val-good">${(i==null?void 0:i.safe_days_count)??0} days</span>
          <span class="windows-kpi-sub">${Math.round(((i==null?void 0:i.safe_days_count)??0)/((t==null?void 0:t.total_days)||1)*100)}% of window (≥6h Sun &amp; Comms)</span>
        </div>
        <div class="windows-kpi-card">
          <span class="windows-kpi-title">PRIME CONDITIONS</span>
          <span class="windows-kpi-val val-prime">${(i==null?void 0:i.excellent_days_count)??0} days</span>
          <span class="windows-kpi-sub">Composite safety rating ≥ 75</span>
        </div>
        <div class="windows-kpi-card windows-kpi-streak">
          <span class="windows-kpi-title">LONGEST SAFE STREAK</span>
          <span class="windows-kpi-val">${i!=null&&i.best_window_start?i.best_window_start:"None detected"}</span>
          ${i!=null&&i.best_window_start?`
          <button class="btn-preset-accent btn-sm" id="btn-apply-best-window" data-date="${i.best_window_start}" style="margin-top:4px;">
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
          ${s.map(d=>`
            <div class="heatmap-ribbon-seg"
                 style="background: ${r(d.safety_rating)}; flex: 1;"
                 title="${d.date}: ${d.safety_rating.toUpperCase()} (Score: ${d.safety_score}) · Sun: ${d.sunlight.full_hours}h · Earth: ${d.earth_los.full_hours}h">
            </div>
          `).join("")}
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); margin-top:4px; font-family:var(--font-mono);">
          <span>${t==null?void 0:t.start_date}</span>
          <span>${s.length} days scanned</span>
          <span>${t==null?void 0:t.end_date}</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="windows-filter-bar">
        <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">FILTER DAYS:</span>
        <div class="filter-pills-group">
          <button class="btn-filter-pill ${this.landingWindowsFilter==="all"?"active":""} btn-window-filter" data-filter="all">
            All Days (${s.length})
          </button>
          <button class="btn-filter-pill ${this.landingWindowsFilter==="safe"?"active":""} btn-window-filter" data-filter="safe">
            ✓ Safe Only (${(i==null?void 0:i.safe_days_count)??0})
          </button>
          <button class="btn-filter-pill ${this.landingWindowsFilter==="excellent"?"active":""} btn-window-filter" data-filter="excellent">
            🌟 Excellent Only (${(i==null?void 0:i.excellent_days_count)??0})
          </button>
        </div>
      </div>

      <!-- Days Grid -->
      <div class="windows-cards-grid">
        ${l.map(d=>`
          <div class="window-day-card ${d.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${a(d.date)}</span>
                <span class="window-day-iso">${d.date}</span>
              </div>
              <div>
                ${o(d.safety_rating,d.safety_score)}
              </div>
            </div>

            <div class="window-safe-row">
              ${d.is_safe_for_landing?'<span class="safe-pill pass">✓ Safe for Landing</span>':'<span class="safe-pill fail">⚠️ Marginal Comms/Sun</span>'}
              <span class="window-score-num">Safety: <strong>${d.safety_score}</strong>/100</span>
            </div>

            <div class="score-bar-track">
              <div class="score-bar-fill ${d.safety_rating}" style="width: ${Math.min(100,Math.max(0,d.safety_score))}%;"></div>
            </div>

            <div class="window-day-metrics-grid">
              <div class="window-metric-col">
                <span class="window-metric-header">☀️ SUNLIGHT</span>
                <div class="window-metric-row"><span>Full Sun:</span> <strong>${d.sunlight.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Penumbral:</span> <strong>${d.sunlight.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Darkness:</span> <strong>${d.sunlight.darkness_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${d.sunlight.avg_elevation_deg>=0?"+":""}${d.sunlight.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
              <div class="window-metric-col">
                <span class="window-metric-header">🌍 EARTH LOS</span>
                <div class="window-metric-row"><span>Full LOS:</span> <strong>${d.earth_los.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Partial:</span> <strong>${d.earth_los.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Occulted:</span> <strong>${d.earth_los.occulted_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${d.earth_los.avg_elevation_deg>=0?"+":""}${d.earth_los.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
            </div>

            <div class="window-card-action">
              <button class="btn-secondary btn-apply-window-date" data-date="${d.date}">
                ⏱ Set as Mission Start Date
              </button>
            </div>
          </div>
        `).join("")}
      </div>
      `:""}
    </div>
    `}drawTerrainCanvas(){setTimeout(()=>{const e=document.getElementById("site01-terrain-canvas");if(!e)return;this.terrainCtx=e.getContext("2d");const s=ee.getActiveDataset();let t;switch(this.activeTerrainLayer){case"slope":t=s.layers.slope;break;case"toterr":t=s.layers.toterr;break;case"slperr":t=s.layers.slperr??s.layers.toterr;break;case"ldec":t=s.layers.ldec??s.layers.slope;break;default:t=s.layers.elev_hill;break}const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(i,0,0,512,512),this.selectedSite.pixelCoords)){const{px:a,py:o}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(a-14,o),this.terrainCtx.lineTo(a+14,o),this.terrainCtx.moveTo(a,o-14),this.terrainCtx.lineTo(a,o+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(a,o,6,0,2*Math.PI),this.terrainCtx.stroke()}},i.src=t},50)}wireEvents(){var O,I,P,D,G,U,F,K,ae,be,he,We,st,qe;(O=this.container.querySelector("#btn-close-workspace"))==null||O.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(S=>{S.addEventListener("click",C=>{const k=C.currentTarget;this.currentTab=k.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(S=>{S.addEventListener("click",C=>{const $=C.currentTarget.dataset.presetId,W=B.find(ce=>ce.id===$);W&&(this.selectedSite.name=W.name,this.selectedSite.designation=W.designation,this.selectedSite.latitudeDeg=W.lat,this.selectedSite.longitudeDeg=W.lon,this.selectedSite.elevationM=W.elev,this.updateSiteCoverageAndSample(),this.render())})}),(I=this.container.querySelector("#btn-jump-site01"))==null||I.addEventListener("click",()=>{const S=B[0];this.selectedSite.name=S.name,this.selectedSite.designation=S.designation,this.selectedSite.latitudeDeg=S.lat,this.selectedSite.longitudeDeg=S.lon,this.selectedSite.elevationM=S.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(S=>{S.addEventListener("click",C=>{const k=C.currentTarget;this.activeTerrainLayer=k.dataset.layer||"elev",this.render()})});const e=this.container.querySelector("#inp-lat"),s=this.container.querySelector("#inp-lon"),t=this.container.querySelector("#inp-elev"),i=()=>{if(!e||!s||!t)return;const S=parseFloat(e.value),C=parseFloat(s.value),k=parseFloat(t.value);!isNaN(S)&&!isNaN(C)&&(this.selectedSite.latitudeDeg=S,this.selectedSite.longitudeDeg=C,this.selectedSite.elevationM=isNaN(k)?0:k,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};e==null||e.addEventListener("change",i),s==null||s.addEventListener("change",i),t==null||t.addEventListener("change",i);const a=this.container.querySelector("#site01-terrain-canvas");a==null||a.addEventListener("click",S=>{const C=a.getBoundingClientRect(),k=S.clientX-C.left,$=S.clientY-C.top,W=Math.round(k/C.width*512),ce=Math.round($/C.height*512),vt=ee.getActiveDataset(),bt=ee.pixelToSelenographic(vt,W,ce);this.selectedSite.latitudeDeg=Math.round(bt.latDeg*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(bt.lonDeg*1e3)/1e3,this.selectedSite.name=`${vt.dataset_name.split(" ")[0]||"Site"} Targeted Point`,this.selectedSite.designation=`Terrain Pixel (${W}, ${ce})`,this.updateSiteCoverageAndSample(),this.render()});const o=this.container.querySelector("#inp-start-date"),r=this.container.querySelector("#inp-start-time"),l=this.container.querySelector("#inp-duration-val"),d=this.container.querySelector("#inp-duration-unit"),c=this.container.querySelector("#inp-timestep"),h=()=>{o&&(this.timeline.startDate=o.value),r&&(this.timeline.startTime=r.value),l&&(this.timeline.durationValue=parseInt(l.value,10)||1),d&&(this.timeline.durationUnit=d.value),c&&(this.timeline.timeStepHours=parseFloat(c.value)||1),this.computeIsoTimestamps(),this.render()};o==null||o.addEventListener("change",h),r==null||r.addEventListener("change",h),l==null||l.addEventListener("change",h),d==null||d.addEventListener("change",h),c==null||c.addEventListener("change",h);const u=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const S=Math.round(this.timeline.timeStepHours*60),C=await Gi({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:S,refinement_tolerance_sec:60});this.timelineResponse=C,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),C.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(C.samples[0])}catch(S){this.timelineLoading=!1,this.timelineError=S.message??String(S),this.render()}};(P=this.container.querySelector("#btn-calc-timeline"))==null||P.addEventListener("click",u);const m=this.container.querySelector("#inp-timeline-scrubber");m==null||m.addEventListener("input",()=>{var k;const S=parseInt(m.value,10);this.scrubbedSampleIndex=S;const C=(k=this.timelineResponse)==null?void 0:k.samples[S];C&&(this.updateScrubbedReadout(C),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(C))});const v=this.container.querySelector("#inp-scen-name"),g=this.container.querySelector("#inp-scen-notes");v==null||v.addEventListener("input",()=>{this.scenarioName=v.value}),g==null||g.addEventListener("input",()=>{this.scenarioNotes=g.value});const f=async()=>{try{const S=this.container.querySelector("#btn-eval-spice-tab"),C=this.container.querySelector("#btn-eval-spice-footer");S&&(S.disabled=!0,S.textContent="Calculating SPICE..."),C&&(C.disabled=!0,C.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const k=await Hs({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=k,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(S){console.error("[MissionWorkspace] SPICE Calculation Error:",S),this.currentTab="readiness",this.render();const C=this.container.querySelector(".geometry-preview-area");C&&(C.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${S.message||S}</p>
            </div>
          `)}};(D=this.container.querySelector("#btn-eval-spice-tab"))==null||D.addEventListener("click",f),(G=this.container.querySelector("#btn-eval-spice-footer"))==null||G.addEventListener("click",f),(U=this.container.querySelector("#btn-eval-horizon"))==null||U.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const S=this.initialGeometry,[C,k]=await Promise.all([ji({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),Us({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:S.sun.azimuth_deg,sun_elevation_deg:S.sun.elevation_deg,sun_distance_km:S.sun.distance_km,earth_azimuth_deg:S.earth.azimuth_deg,earth_elevation_deg:S.earth.elevation_deg,earth_distance_km:S.earth.distance_km})]);this.horizonProfile=C,this.horizonVisibility=k,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(S){this.horizonLoading=!1,this.horizonError=S.message??String(S),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const E=()=>{const S=this.toScenarioJSON(),C=new Blob([JSON.stringify(S,null,2)],{type:"application/json"}),k=URL.createObjectURL(C),$=document.createElement("a");$.href=k,$.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,$.click(),URL.revokeObjectURL(k)};(F=this.container.querySelector("#btn-export-scenario"))==null||F.addEventListener("click",E),(K=this.container.querySelector("#btn-open-export-panel-footer"))==null||K.addEventListener("click",()=>this.openExportModal()),(ae=this.container.querySelector("#btn-open-full-export-dialog"))==null||ae.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(S=>{S.addEventListener("click",async C=>{C.stopPropagation();const k=C.currentTarget,$=k.getAttribute("data-quick-fmt")||"pdf",W=k.innerHTML;k.disabled=!0,k.innerHTML=`⏳ Generating ${$.toUpperCase()}...`;try{this.exportPanel||(this.exportPanel=new Wt),this.computeIsoTimestamps(),await this.exportPanel.directMissionExport({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},$),k.innerHTML=`✓ Downloaded ${$.toUpperCase()}!`,setTimeout(()=>{k.innerHTML=W,k.disabled=!1},2500)}catch(ce){console.error("[MissionWorkspace] Quick export error:",ce),k.innerHTML="❌ Failed",alert(`Export failed: ${ce.message||ce}`),setTimeout(()=>{k.innerHTML=W,k.disabled=!1},3e3)}})}),this.container.querySelectorAll(".export-art-item").forEach(S=>{S.addEventListener("click",C=>{if(C.target.closest(".btn-quick-export"))return;const k=S.querySelector(".btn-quick-export"),$=(k==null?void 0:k.getAttribute("data-quick-fmt"))||"pdf";this.openExportModal($)})}),(be=this.container.querySelector("#btn-export-scenario-summary"))==null||be.addEventListener("click",E);const _=this.container.querySelector("#inp-windows-start-date"),T=this.container.querySelector("#inp-windows-end-date");_==null||_.addEventListener("change",()=>{_.value&&(this.landingWindowsStartDate=_.value)}),T==null||T.addEventListener("change",()=>{T.value&&(this.landingWindowsEndDate=T.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(S=>{S.addEventListener("click",C=>{const $=C.currentTarget.dataset.preset;if($==="30d"){const W=new Date(this.timeline.startDate+"T00:00:00Z"),ce=new Date(W.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=W.toISOString().slice(0,10),this.landingWindowsEndDate=ce.toISOString().slice(0,10)}else $==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):$==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(S=>{S.addEventListener("click",C=>{const $=C.currentTarget.dataset.filter;$&&(this.landingWindowsFilter=$,this.render())})});const M=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const S=await Bs({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=S,this.landingWindowsLoading=!1,this.render()}catch(S){this.landingWindowsLoading=!1,this.landingWindowsError=S.message??String(S),this.render()}};(he=this.container.querySelector("#btn-scan-landing-windows"))==null||he.addEventListener("click",M),(We=this.container.querySelector("#btn-run-initial-scan"))==null||We.addEventListener("click",M);const L=S=>{this.timeline.startDate=S,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(st=this.container.querySelector("#btn-apply-best-window"))==null||st.addEventListener("click",S=>{const k=S.currentTarget.dataset.date;k&&L(k)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(S=>{S.addEventListener("click",C=>{const $=C.currentTarget.dataset.date;$&&L($)})}),(qe=this.container.querySelector("#btn-apply-3d-view"))==null||qe.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const e=document.getElementById("horizon-polar-canvas");if(!e||!this.horizonProfile)return;const s=this.horizonProfile,t=e.getContext("2d");if(!t)return;const i=e.width,a=e.height,o=i/2,r=a/2,l=Math.min(i,a)/2-32;t.clearRect(0,0,i,a),t.fillStyle="#0a0f1e",t.fillRect(0,0,i,a);const d=Math.max(...s.profile.map(m=>m.horizon_elevation_deg),10);[0,d*.25,d*.5,d*.75,d].forEach(m=>{const v=l*(1-m/d);t.beginPath(),t.arc(o,r,Math.max(v,1),0,2*Math.PI),t.strokeStyle="rgba(148,163,184,0.15)",t.lineWidth=1,t.stroke(),m>0&&(t.fillStyle="rgba(148,163,184,0.5)",t.font="10px Inter, sans-serif",t.fillText(`${m.toFixed(1)}°`,o+4,r-v+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([m,v])=>{const g=(Number(v)-90)*Math.PI/180;t.beginPath(),t.moveTo(o,r),t.lineTo(o+l*Math.cos(g),r+l*Math.sin(g)),t.strokeStyle="rgba(148,163,184,0.2)",t.lineWidth=1,t.stroke(),t.fillStyle="#94a3b8",t.font="bold 11px Inter, sans-serif",t.fillText(String(m),o+(l+16)*Math.cos(g)-4,r+(l+16)*Math.sin(g)+4)}),t.beginPath(),s.profile.forEach((m,v)=>{const g=(m.azimuth_deg-90)*Math.PI/180,f=l*(1-Math.min(m.horizon_elevation_deg,d)/d),E=o+f*Math.cos(g),_=r+f*Math.sin(g);v===0?t.moveTo(E,_):t.lineTo(E,_)}),t.closePath(),t.fillStyle="rgba(56,189,248,0.15)",t.fill(),t.strokeStyle="#38bdf8",t.lineWidth=2,t.stroke();const u=this.horizonVisibility;if(u){const m=(v,g,f,E)=>{const _=(v-90)*Math.PI/180,T=l*(1-Math.max(0,Math.min(g,d))/d),M=o+T*Math.cos(_),L=r+T*Math.sin(_);t.beginPath(),t.arc(M,L,8,0,2*Math.PI),t.fillStyle=f,t.fill(),t.fillStyle="#fff",t.font="bold 10px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(E,M,L),t.textAlign="start",t.textBaseline="alphabetic"};m(u.sun.azimuth_deg,u.sun.geometric_elevation_deg,"#f59e0b","☀"),m(u.earth.azimuth_deg,u.earth.geometric_elevation_deg,"#3b82f6","🌍")}t.beginPath(),t.arc(o,r,4,0,2*Math.PI),t.fillStyle="#38bdf8",t.fill()}updateScrubbedReadout(e){var l,d;const s=this.container.querySelector("#scrubbed-time-val");s&&(s.textContent=e.timestamp_utc);const t=c=>{switch(c){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},i=c=>{switch(c){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},a=this.container.querySelector("#scrubbed-sun-state");a&&(a.innerHTML=t(e.sun.visibility_state));const o=this.container.querySelector("#scrubbed-earth-state");o&&(o.innerHTML=i(e.earth.visibility_state));const r=this.container.querySelector("#scrubbed-conditions-panel");if(r){const c=(l=r.querySelectorAll(".scrubbed-col")[0])==null?void 0:l.querySelectorAll(".scrubbed-val-row strong");if(c&&c.length>=4){c[0].textContent=`${e.sun.azimuth_deg.toFixed(2)}°`,c[1].textContent=`${e.sun.elevation_deg.toFixed(2)}°`,c[2].textContent=e.sun.terrain_horizon_elevation_deg!==null?`${e.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=e.sun.angular_clearance_deg;c[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",c[3].style.color=(u??0)>=0?"#22c55e":"#ef4444"}const h=(d=r.querySelectorAll(".scrubbed-col")[1])==null?void 0:d.querySelectorAll(".scrubbed-val-row strong");if(h&&h.length>=4){h[0].textContent=`${e.earth.azimuth_deg.toFixed(2)}°`,h[1].textContent=`${e.earth.elevation_deg.toFixed(2)}°`,h[2].textContent=e.earth.terrain_horizon_elevation_deg!==null?`${e.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=e.earth.angular_clearance_deg;h[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",h[3].style.color=(u??0)>=0?"#3b82f6":"#ef4444"}}}}class na{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new Wt),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(e){this.onInspectSiteOnGlobe=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:B[0].lat,longitudeDeg:B[0].lon,elevationM:B[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:B[3].lat,longitudeDeg:B[3].lon,elevationM:B[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(e){var i,a,o,r;const s=B.find(l=>l.id===e)||B[0],t=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${t} · ${s.name}`,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elev,instrumentHeightM:2,startDate:((i=this.scenarios[0])==null?void 0:i.startDate)||"2026-10-16",startTime:((a=this.scenarios[0])==null?void 0:a.startTime)||"12:00:00",endDate:((o=this.scenarios[0])==null?void 0:o.endDate)||"2026-10-23",endTime:((r=this.scenarios[0])==null?void 0:r.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(e){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(s=>s.id!==e),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=this.scenarios.map(t=>({id:t.id,name:t.name,latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:`${t.startDate}T${t.startTime}Z`,end_utc:`${t.endDate}T${t.endTime}Z`,step_minutes:t.stepMinutes})),s=await Wi({scenarios:e,constraints:this.constraints});this.comparisonResult=s}catch(e){this.errorMessage=e.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
    <div class="mission-dialog comparison-dialog">
      <div class="mission-header">
        <div class="mission-brand-lockup">
          <img src="/lunaops-emblem.svg" class="mission-header-emblem" alt="LUNAOPS" />
          <div class="mission-title-group">
            <div class="mission-kicker">
              <span>NASA SPACE APPS 2026 &middot; PHASE 5 SCIENTIFIC COMPARISON</span>
              <span class="mission-motto-tag">PLAN WITH PRECISION</span>
            </div>
            <h2 class="mission-title">Landing Site &amp; Mission Date Comparison</h2>
          </div>
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
            ${this.scenarios.map((e,s)=>this.renderScenarioCard(e,s)).join("")}
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
    `,this.wireEvents(),this.comparisonResult&&this.drawSynchronizedTimelines()}renderScenarioCard(e,s){const t=e.latitudeDeg<=-89.4&&e.latitudeDeg>=-89.55&&e.longitudeDeg>=221&&e.longitudeDeg<=224;return`
    <div class="scenario-setup-card" data-id="${e.id}">
      <div class="scenario-card-header">
        <span class="scenario-number-tag">SCENARIO ${s+1}</span>
        <button class="btn-remove-scenario" data-id="${e.id}" title="Remove this candidate" ${this.scenarios.length<=2?"disabled":""}>✕</button>
      </div>

      <div class="scenario-input-group">
        <label>Scenario Label:</label>
        <input type="text" class="input-sc-name" data-id="${e.id}" value="${e.name}">
      </div>

      <div class="scenario-input-group">
        <label>Quick Preset:</label>
        <select class="select-preset" data-id="${e.id}">
          <option value="">— Select Candidate Landing Site —</option>
          ${B.map(i=>`<option value="${i.id}" ${i.name.includes(e.name.split("·")[0].trim())?"selected":""}>${i.name} (${i.lat}°S, ${i.lon}°E)</option>`).join("")}
        </select>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Latitude (°S):</label>
          <input type="number" class="input-lat" data-id="${e.id}" step="0.001" min="-90" max="90" value="${e.latitudeDeg}">
        </div>
        <div class="scenario-input-group">
          <label>Longitude (°E):</label>
          <input type="number" class="input-lon" data-id="${e.id}" step="0.01" min="-180" max="360" value="${e.longitudeDeg}">
        </div>
      </div>

      <div class="coords-dual-grid">
        <div class="scenario-input-group">
          <label>Elevation (m):</label>
          <input type="number" class="input-elev" data-id="${e.id}" step="10" value="${e.elevationM}">
        </div>
        <div class="scenario-input-group">
          <label>Sampling (min):</label>
          <select class="input-step" data-id="${e.id}">
            <option value="15" ${e.stepMinutes===15?"selected":""}>15 min</option>
            <option value="30" ${e.stepMinutes===30?"selected":""}>30 min</option>
            <option value="60" ${e.stepMinutes===60?"selected":""}>60 min</option>
          </select>
        </div>
      </div>

      <div class="dates-dual-grid">
        <div class="scenario-input-group">
          <label>Start UTC:</label>
          <input type="date" class="input-start-date" data-id="${e.id}" value="${e.startDate}">
        </div>
        <div class="scenario-input-group">
          <label>End UTC:</label>
          <input type="date" class="input-end-date" data-id="${e.id}" value="${e.endDate}">
        </div>
      </div>

      <div class="card-footer-status">
        <span class="dem-tag ${t?"inside":"outside"}">
          ${t?"✓ Site 01 5m DEM Covered":"⚠ Outside High-Res DEM Footprint"}
        </span>
        <button class="btn-inspect-globe" data-id="${e.id}" title="Focus camera on 3D Moon to view site">🎯 View on Moon</button>
      </div>
    </div>
    `}renderPlaceholder(){return`
    <div class="comparison-placeholder">
      <div class="placeholder-icon">⚖️</div>
      <h3>Ready for Side-by-Side Comparison</h3>
      <p>Configure your candidate sites and click <strong>Run Comparison Analysis</strong> above. The engine will calculate time-dependent solar illumination, potential Direct-to-Earth line of sight, slope distributions, and evaluate all engineering constraints using verified SPICE and LOLA DEM data.</p>
    </div>
    `}renderComparisonResults(){if(!this.comparisonResult)return"";const e=this.comparisonResult;return`
    <div class="results-dashboard-wrapper">
      <div class="dashboard-header-bar">
        <h3>Side-by-Side Comparison Dashboard</h3>
        <span class="badge-blue">${e.compared_count} Scenarios Evaluated</span>
      </div>

      <!-- Comparison Metrics Cards Table -->
      <div class="comparison-table-responsive">
        <table class="comparison-data-table">
          <thead>
            <tr>
              <th>Candidate Metric</th>
              ${e.scenarios.map(s=>`<th>${s.scenario_name}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-header">📍 Selenographic Location</td>
              ${e.scenarios.map(s=>`
                <td>
                  <strong>${V(s.inputs.latitude_deg,s.inputs.longitude_deg)}</strong>
                  <br><button class="btn-mini-inspect" data-id="${s.scenario_id}">🎯 Focus 3D Moon</button>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">⏱ Mission Interval</td>
              ${e.scenarios.map(s=>`
                <td>
                  <span class="mono-sub">${s.inputs.start_utc.split("T")[0]} → ${s.inputs.end_utc.split("T")[0]}</span>
                  <br><span class="muted-text">(${s.timeline_result.mission_scenario.total_duration_hours.toFixed(0)} hours)</span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">🏔 Topographic DEM Coverage</td>
              ${e.scenarios.map(s=>`
                <td>
                  <span class="status-badge ${s.terrain_statistics.coverage_available?"badge-green":"badge-slate"}">
                    ${s.terrain_statistics.coverage_available?"NASA LOLA Site 01 (5 m/px)":"Outside DEM (Sphere Only)"}
                  </span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">☀️ Total Solar Illumination</td>
              ${e.scenarios.map(s=>{const t=s.timeline_result.summary.sunlight,i=(t.full_sunlight_percent+t.partial_sunlight_percent).toFixed(1),a=(t.full_sunlight_hours+t.partial_sunlight_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${i}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${i}%; background: #f59e0b;"></div></div>
                    <span class="muted-text">Full: ${t.full_sunlight_percent}% · Partial: ${t.partial_sunlight_percent}%</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">🌑 Continuous Darkness Max</td>
              ${e.scenarios.map(s=>{const t=s.timeline_result.summary.sunlight;return`
                  <td>
                    <strong>${t.max_continuous_darkness_hours.toFixed(1)} hrs</strong>
                    <br><span class="muted-text">Transitions: ${t.transition_count}</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📡 Direct-to-Earth LOS Clearance</td>
              ${e.scenarios.map(s=>{const t=s.timeline_result.summary.earth_los,i=(t.full_disc_los_percent+t.partial_disc_los_percent).toFixed(1),a=(t.full_disc_los_hours+t.partial_disc_los_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${i}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${i}%; background: #38bdf8;"></div></div>
                    <span class="muted-text">Full disc: ${t.full_disc_los_percent}% · Max window: ${t.max_continuous_los_hours.toFixed(1)}h</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📐 Terrain Slope Statistics</td>
              ${e.scenarios.map(s=>{const t=s.terrain_statistics.slope;return t?`
                  <td>
                    <strong>${t.mean_deg.toFixed(1)}° mean</strong> (max ${t.max_deg.toFixed(1)}°)
                    <br><span class="muted-text">Std: ±${t.std_deg.toFixed(1)}° · Center: ${t.point_deg.toFixed(1)}°</span>
                  </td>
                `:'<td><span class="badge-slate">Unavailable (No DEM)</span><br><span class="muted-text">Site outside 16x16 km tile</span></td>'}).join("")}
            </tr>
            <tr>
              <td class="row-header">🎯 Elevation &amp; Uncertainty</td>
              ${e.scenarios.map(s=>{const t=s.terrain_statistics.elevation,i=s.terrain_statistics.uncertainty;return t?`
                  <td>
                    <strong>${t.mean_m.toFixed(1)} m</strong> <span class="muted-text">(range ${t.min_m.toFixed(0)}..${t.max_m.toFixed(0)}m)</span>
                    <br><span class="muted-text">Error: ±${i?i.mean_m.toFixed(2):"—"} m (LOLA)</span>
                  </td>
                `:`<td>${s.inputs.elevation_m.toFixed(1)} m <span class="muted-text">(User/Sphere)</span><br><span class="badge-slate">Uncertainty: Unavailable</span></td>`}).join("")}
            </tr>
            <tr>
              <td class="row-header">📋 Constraint Satisfaction</td>
              ${e.scenarios.map(s=>{const t=s.constraints_evaluation,i=t.all_met;return`
                  <td>
                    <span class="status-badge ${i?"badge-green":t.unmet_count>0?"badge-red":"badge-amber"}">
                      ${i?"✓ ALL CONSTRAINTS MET":`${t.met_count} Met / ${t.unmet_count} Unmet / ${t.unevaluable_count} Unevaluable`}
                    </span>
                    <div class="constraint-mini-list">
                      ${t.items.map(a=>`
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
          ${e.ranking.ranking.map(s=>`
            <div class="ranking-card ${s.rank===1?"leader":""}">
              <div class="rank-tag">RANK ${s.rank}</div>
              <h5 class="rank-name">${s.scenario_name}</h5>
              <div class="rank-score-val">${s.composite_score.toFixed(1)} <span class="score-max">/ 100</span></div>

              ${s.has_unevaluable_metrics?`
                <div class="unevaluable-warning-box">
                  ⚠️ Contains unevaluable metrics:
                  <ul>
                    ${s.unevaluable_reasons.map(t=>`<li>${t}</li>`).join("")}
                  </ul>
                </div>
              `:`
                <div class="eval-success-note">✓ All criteria evaluated against 5m DEM &amp; SPICE ephemerides</div>
              `}

              <div class="criteria-score-breakdown">
                ${Object.entries(s.criteria_scores).map(([t,i])=>`
                  <div class="crit-row">
                    <span>${t.replace(/_/g," ")}:</span>
                    <span>${i!==null?`${i.toFixed(1)} pts`:'<span class="badge-slate">N/A</span>'}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="scientific-integrity-banner">
          <div class="integrity-title">🛡️ Scientific Integrity &amp; Operational Caveat</div>
          <p>${e.ranking.disclaimer}</p>
        </div>
      </section>
    </div>
    `}drawSynchronizedTimelines(){const e=document.getElementById("synced-timeline-canvas");if(!e||!this.comparisonResult)return;const s=e.getContext("2d");if(!s)return;const t=e.width,i=e.height;s.clearRect(0,0,t,i);const a=this.comparisonResult.scenarios;if(a.length===0)return;const o=Math.floor((i-40)/a.length);s.fillStyle="#94a3b8",s.font="10px JetBrains Mono, monospace",s.fillText("MISSION TIMELINE EPOCHS",15,18),a.forEach((r,l)=>{const d=30+l*o,c=o-12;s.fillStyle="#e2e8f0",s.font="11px Inter, sans-serif",s.fillText(`${r.scenario_name}`,15,d-4),s.fillStyle="rgba(15, 23, 42, 0.6)",s.fillRect(15,d,t-30,c);const h=r.timeline_result.sun_windows,u=Date.parse(r.inputs.start_utc),v=Date.parse(r.inputs.end_utc)-u;v>0&&(h.forEach(f=>{const E=Date.parse(f.start_utc),_=Date.parse(f.end_utc),T=15+(E-u)/v*(t-30),M=15+(_-u)/v*(t-30),L=Math.max(1,M-T);f.state==="full_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.9)":f.state==="partial_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.5)":f.state==="total_darkness"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,d,L,c/2-1)}),r.timeline_result.earth_windows.forEach(f=>{const E=Date.parse(f.start_utc),_=Date.parse(f.end_utc),T=15+(E-u)/v*(t-30),M=15+(_-u)/v*(t-30),L=Math.max(1,M-T);f.state==="full_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.9)":f.state==="centre_only_los"||f.state==="partial_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.5)":f.state==="occulted"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,d+c/2+1,L,c/2-2)})),s.strokeStyle="rgba(148, 163, 184, 0.15)",s.strokeRect(15,d,t-30,c)})}wireEvents(){var e,s,t,i,a,o,r,l,d,c;(e=document.getElementById("btn-close-comparison"))==null||e.addEventListener("click",()=>{this.close()}),(s=document.getElementById("btn-add-candidate"))==null||s.addEventListener("click",()=>{this.addScenario()}),(t=document.getElementById("btn-sync-dates"))==null||t.addEventListener("click",()=>{if(this.scenarios.length>=2){const h=this.scenarios[0];for(let u=1;u<this.scenarios.length;u++)this.scenarios[u].startDate=h.startDate,this.scenarios[u].startTime=h.startTime,this.scenarios[u].endDate=h.endDate,this.scenarios[u].endTime=h.endTime;this.render()}}),(i=document.getElementById("btn-run-comparison"))==null||i.addEventListener("click",()=>{this.runComparison()}),(a=this.container.querySelector("#btn-export-comparison-panel"))==null||a.addEventListener("click",()=>{this.openExportModal()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(h=>{h.addEventListener("click",u=>{const m=u.currentTarget.getAttribute("data-id");m&&this.removeScenario(m)})}),this.container.querySelectorAll(".select-preset").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=m.getAttribute("data-id"),g=m.value,f=B.find(E=>E.id===g);if(v&&f){const E=this.scenarios.find(_=>_.id===v);E&&(E.name=f.name,E.latitudeDeg=f.lat,E.longitudeDeg=f.lon,E.elevationM=f.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(h=>{h.addEventListener("input",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.name=m.value)})}),this.container.querySelectorAll(".input-lat").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.latitudeDeg=parseFloat(m.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.longitudeDeg=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.elevationM=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.startDate=m.value)})}),this.container.querySelectorAll(".input-end-date").forEach(h=>{h.addEventListener("change",u=>{const m=u.currentTarget,v=this.scenarios.find(g=>g.id===m.getAttribute("data-id"));v&&(v.endDate=m.value)})}),(o=document.getElementById("constraint-min-sun"))==null||o.addEventListener("change",h=>{const u=h.currentTarget.value;this.constraints.min_sunlight_percent=u!==""?parseFloat(u):null}),(r=document.getElementById("constraint-min-earth"))==null||r.addEventListener("change",h=>{const u=h.currentTarget.value;this.constraints.min_earth_los_percent=u!==""?parseFloat(u):null}),(l=document.getElementById("constraint-max-slope"))==null||l.addEventListener("change",h=>{const u=h.currentTarget.value;this.constraints.max_slope_deg=u!==""?parseFloat(u):null}),(d=document.getElementById("constraint-max-dark"))==null||d.addEventListener("change",h=>{const u=h.currentTarget.value;this.constraints.max_continuous_darkness_hours=u!==""?parseFloat(u):null}),(c=this.container.querySelector("#btn-export-comparison-panel"))==null||c.addEventListener("click",()=>{this.openExportModal()}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(h=>{h.addEventListener("click",u=>{const m=u.currentTarget.getAttribute("data-id"),v=this.scenarios.find(g=>g.id===m);v&&this.onInspectSiteOnGlobe&&(this.close(),this.onInspectSiteOnGlobe({name:v.name,lat:v.latitudeDeg,lon:v.longitudeDeg,elevationM:v.elevationM}))})})}}const Ue=1.6,qs=1737.4,Jt=-8.9815,Ys=10.6855,oa=Ys-Jt,Is=512,ra=132361;let Ee=null,H,Ae=null,Q=null,ie=null,ge=null,R=null,Tt=null,kt=null,J=null,N=null,lt=!1,Et=.6,dt=!1,ye=!1,Lt=-89.463,xt=222.51,et=null,Ps=null,Mt=null,qt=null,Yt=0,Xt=0,Me=null,fe=null;function Dt(n,e,s=1.2){fe={startPos:ue.position.clone(),targetPos:n.clone(),startLook:de.target.clone(),targetLook:e.clone(),startTime:performance.now(),duration:s*1e3}}const tt=document.createElement("canvas"),la=document.getElementById("app");la.appendChild(tt);const ve=new wi({canvas:tt,antialias:!0,powerPreference:"high-performance"});ve.setSize(window.innerWidth,window.innerHeight);ve.setPixelRatio(Math.min(window.devicePixelRatio,2));ve.outputColorSpace=Rs;ve.toneMapping=Ei;ve.toneMappingExposure=.95;ve.shadowMap.enabled=!1;const Ge=new Mi;Ge.background=new _i(ra);const ue=new Ci(36,window.innerWidth/window.innerHeight,.01,500);ue.position.set(0,.2,4);const de=new Bi(ue,ve.domElement);de.enableDamping=!0;de.dampingFactor=.06;de.minDistance=1.75;de.maxDistance=12;de.enablePan=!1;de.rotateSpeed=.45;de.zoomSpeed=.7;let Qt=!1;de.addEventListener("start",()=>{Qt=!0});de.addEventListener("end",()=>{Qt=!1});const da=new Ti(395539,.04);Ge.add(da);const mt=new Ns(16775406,3.4);mt.position.set(5,1.2,3.2);Ge.add(mt);const es=new Ns(2241365,.035);es.position.set(-5,0,-3.2);Ge.add(es);const gt=new ki(ve),ca=new Li(Ge,ue);gt.addPass(ca);const Xs=new xi(new q(window.innerWidth,window.innerHeight),.08,.4,.92);gt.addPass(Xs);const pa={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
      float vig = smoothstep(offset, offset - 0.45, dist * (darkness + offset));
      color.rgb *= vig;
      gl_FragColor = color;
    }
  `},ua=new Di(pa);gt.addPass(ua);function ha(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:e,rMin:s,rMax:t,size:i,opacity:a})=>{const o=new Float32Array(e*3);for(let d=0;d<e;d++){const c=Math.random()*Math.PI*2,h=Math.acos(2*Math.random()-1),u=s+Math.random()*(t-s);o[d*3]=u*Math.sin(h)*Math.cos(c),o[d*3+1]=u*Math.sin(h)*Math.sin(c),o[d*3+2]=u*Math.cos(h)}const r=new te;r.setAttribute("position",new Pi(o,3));const l=new $i({size:i,color:14215423,transparent:!0,opacity:a,sizeAttenuation:!0});Ge.add(new Ai(r,l))})}ha();const ht=document.createElement("div");ht.id="loading-overlay";ht.innerHTML=`
  <div class="loader-content">
    <div class="loader-emblem-wrap">
      <img src="/lunaops-emblem.svg" class="loader-emblem" alt="LUNAOPS Emblem" />
    </div>
    <div class="spinner"></div>
    <p class="loader-text">LUNA<span class="loader-accent">OPS</span></p>
    <p class="loader-motto">EXPLORE THE LUNAR FRONTIER &middot; PLAN WITH PRECISION</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(ht);function Be(n,e){const s=document.getElementById("load-status");if(s&&(s.textContent=n),e!==void 0){const t=document.getElementById("progress-fill");t&&(t.style.width=`${Math.min(100,e)}%`)}}function ma(){ht.style.opacity="0",setTimeout(()=>ht.remove(),700)}const ga=1.8;function va(n,e){return new Ni({map:n,normalMap:e||void 0,normalScale:e?new q(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function Vs(n,e,s,t,i){const a=(n%1+1)%1*(s-1),o=At.clamp(1-e,0,1)*(t-1),r=Math.floor(a),l=(r+1)%s,d=Math.floor(o),c=Math.min(d+1,t-1),h=a-r,u=o-d,m=i[(d*s+r)*4]/255,v=i[(d*s+l)*4]/255,g=i[(c*s+r)*4]/255,f=i[(c*s+l)*4]/255,E=m*(1-h)+v*h,_=g*(1-h)+f*h,T=E*(1-u)+_*u;return Jt+T*oa}function It(n,e){if(qt&&Yt>0&&Xt>0){const s=At.clamp((n+90)/180,0,1),i=((e%360+360)%360+180)%360/360;return Vs(i,s,Yt,Xt,qt)}return 0}function ba(n,e){const s=n.attributes.position,t=n.attributes.uv,i=s.count,a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d");o.drawImage(e,0,0);const l=o.getImageData(0,0,a.width,a.height).data;qt=l,Yt=a.width,Xt=a.height,Ps=new Float32Array(s.array.length),Ps.set(s.array),et=new Float32Array(i),Mt=new Float32Array(s.array.length);const d=new y,c=new y,h=ga;for(let u=0;u<i;u++){d.fromBufferAttribute(s,u);const m=t.getX(u),v=t.getY(u),g=Vs(m,v,a.width,a.height,l);et[u]=g;const f=g/qs*Ue;c.copy(d).normalize();const E=d.clone().add(c.clone().multiplyScalar(f));Mt[u*3]=E.x,Mt[u*3+1]=E.y,Mt[u*3+2]=E.z,d.add(c.multiplyScalar(f*h)),s.setXYZ(u,d.x,d.y,d.z)}s.needsUpdate=!0,n.computeVertexNormals(),n.computeBoundingSphere()}function fa(n){return n.colorSpace=Rs,n.anisotropy=ve.capabilities.getMaxAnisotropy(),n.minFilter=zi,n.magFilter=Hi,n.generateMipmaps=!0,n.wrapS=Fs,n.wrapT=zs,n.needsUpdate=!0,n}const $s=new Ii;async function ya(){const n=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,e=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:n,label:"NASA LROC 2K",is4K:!1}];let s=null,t="NASA LROC 2K",i=!1;for(const r of e)try{Be(`Loading ${r.label}…`,25),s=await new Promise((l,d)=>{$s.load(r.url,c=>l(c),void 0,c=>d(c))}),fa(s),t=r.label,i=r.is4K;break}catch{}if(!s)throw new Error("All color texture candidates failed to load.");Be("Loading LOLA normal map…",50);let a=null;try{a=await new Promise((r,l)=>{$s.load("/generated/ldem_normal_map_half.png",d=>{d.colorSpace=Ri,d.anisotropy=ve.capabilities.getMaxAnisotropy(),d.wrapS=Fs,d.wrapT=zs,r(d)},void 0,l)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}Be("Loading LOLA DEM topography…",75);let o=null;try{o=await new Promise((r,l)=>{const d=new Image;d.crossOrigin="anonymous",d.onload=()=>r(d),d.onerror=l,d.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:s,colorLabel:t,is4K:i,normal:a,dispImg:o}}let Ks={is4K:!0};async function Sa(){const n=await ya();Ks={label:n.colorLabel,is4K:n.is4K};const e=document.getElementById("telem-color");e&&(e.textContent=n.is4K?"NASA LROC 4K":"NASA LROC 2K"),Be("Generating lunar mesh…",85),await new Promise(i=>setTimeout(i,40));const s=new De(Ue,Is,Is/2);n.dispImg&&ba(s,n.dispImg),Be("Configuring shaders…",95),await new Promise(i=>setTimeout(i,40));const t=va(n.color,n.normal);Ee=new z(s,t),Ee.castShadow=!1,Ee.receiveShadow=!1,H=new Fe,H.rotation.x=At.degToRad(6.68),H.add(Ee),Ae=new ta(Ue),Ae.setOnSelectSite(i=>{_e({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})}),H.add(Ae.group),wa(),Ea(),Ge.add(H),Be("Ready",100),setTimeout(ma,400)}function wa(){J=new Fe,J.name="HoverReticle",J.visible=!1;const n=new Pe(.012,.015,32);n.rotateX(Math.PI/2);const e=new j({color:3718648,side:we,transparent:!0,opacity:.8}),s=new z(n,e);J.add(s);const t=new Fi(.003,16);t.rotateX(Math.PI/2);const i=new j({color:16777215,side:we});J.add(new z(t,i)),H.add(J)}function Ea(){N=new Fe,N.name="PendingSelectionMarker",N.visible=!1;const n=new Pe(.018,.024,32);n.rotateX(Math.PI/2);const e=new j({color:16096779,side:we,transparent:!0,opacity:.95});N.add(new z(n,e));const s=new te().setFromPoints([new y(0,0,0),new y(0,.06,0)]),t=new oe({color:16096779,transparent:!0,opacity:.85});N.add(new re(s,t)),H.add(N)}Sa().catch(n=>{console.error("[LUNAOPS] Build error:",n),Be("Failed to initialize — see console",0)});const ts=document.createElement("div");ts.id="ui-layer";ts.innerHTML=`
<div class="hud-top">
  <!-- Brand Header -->
  <div class="brand">
    <div class="brand-header-row">
      <a href="/" class="brand-logo-link" title="LUNAOPS &middot; Explore the lunar frontier &middot; Plan with precision">
        <img src="/lunaops-emblem.svg" class="brand-logo-emblem" alt="LUNAOPS Logo" />
      </a>
      <div class="brand-text-block">
        <div class="brand-title-line">
          <h1 class="title">LUNA<span class="title-accent">OPS</span></h1>
          <span class="geodetic-badge">IAU MOON_ME</span>
        </div>
        <div class="brand-motto-row">
          <span class="motto-text">EXPLORE THE LUNAR FRONTIER</span>
          <span class="motto-sep">&middot;</span>
          <span class="motto-accent">PLAN WITH PRECISION</span>
        </div>
      </div>
    </div>
    <p class="subtitle">NASA Space Apps 2026 &middot; SELENE LABS &middot; LUNAR SOUTH POLE MISSION PLANNER</p>
    
    <!-- Active Target Readout Card -->
    <div class="data-readout" id="data-readout">
      <div class="readout-row">
        <span class="readout-label">TARGET</span>
        <span class="readout-value" id="active-site-display">Artemis Site 01 (Ridge)</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">COORDS</span>
        <span class="readout-value" id="readout-coords">—</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">ELEVATION</span>
        <span class="readout-value" id="readout-elev">—</span>
      </div>
      <div class="readout-row">
        <span class="readout-label">POLE DIST</span>
        <span class="readout-value" id="readout-pole-dist">—</span>
      </div>
    </div>

    <!-- Candidate Sites Quick-Selector Bar -->
    <div class="candidate-bar" id="candidate-bar">
      <span class="candidate-bar-label">CANDIDATE SITES:</span>
      <button type="button" class="cand-btn active" data-site="site-01">Site 01 (Ridge)</button>
      <button type="button" class="cand-btn" data-site="south-pole">South Pole 90°S</button>
      <button type="button" class="cand-btn" data-site="shackleton-rim">Shackleton Peak</button>
      <button type="button" class="cand-btn" data-site="malapert">Malapert Massif</button>
      <button type="button" class="cand-btn" data-site="haworth-rim">Haworth Rim</button>
      <button type="button" class="cand-btn" data-site="de-gerlache-rim">de Gerlache</button>
      <button type="button" class="cand-btn" data-site="nobile-rim-1">Nobile Rim</button>
    </div>
  </div>

  <!-- Primary Top Toolbar -->
  <div class="controls-panel">
    <div class="controls-group">
      <button id="btn-new-mission" class="btn-primary-action" title="Launch Mission Scenario Configuration [M]">🚀 Mission Workspace</button>
      <button id="btn-compare-sites" class="btn-highlight-compare" title="Open Candidate-Site Comparison [C]">⚖️ Compare Sites</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-south-pole" class="btn-polar-focus" title="Open Interactive South Pole Explorer & Focus 90°S [P]">🎯 South Pole Explorer</button>
      <button id="btn-manual-coords" title="Enter manual selenographic coordinates">⌖ Enter Coords</button>
    </div>
    <div class="controls-divider"></div>
    <div class="controls-group">
      <button id="btn-auto" title="Toggle gentle auto-rotation [Space]">▶ Auto-Rotate</button>
      <button id="btn-sun" title="Simulate solar terminator transit [S]">☀ Sun Cycle</button>
      <button id="btn-reset" title="Reset camera to default equatorial view [R]">⟲ Reset</button>
    </div>
  </div>
</div>

<!-- Direct Surface Selection Confirmation Toast -->
<div class="selection-confirm-toast" id="selection-confirm-toast" style="display:none;">
  <div class="toast-content">
    <div class="toast-title">📍 Surface Coordinate Selected</div>
    <div class="toast-coords" id="toast-coords-text">89.463° S, 222.510° E</div>
    <div class="toast-elev" id="toast-elev-text">Elevation: +1.10 km · Pole Dist: 16.3 km</div>
    <div class="toast-actions">
      <button type="button" id="btn-confirm-site" class="btn-toast-confirm">Set as Mission Target</button>
      <button type="button" id="btn-cancel-site" class="btn-toast-cancel">Cancel</button>
    </div>
  </div>
</div>

<!-- Manual Coordinate Entry Modal -->
<div class="coords-modal" id="coords-modal" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="coords-modal-title">
  <div class="coords-modal-dialog">
    <div class="coords-modal-header">
      <div class="coords-modal-title-row">
        <span class="coords-modal-icon">⌖</span>
        <h3 id="coords-modal-title">Manual Selenographic Coordinate Entry</h3>
      </div>
      <button type="button" id="btn-close-coords-modal" class="coords-modal-close" title="Close [Esc]">&times;</button>
    </div>
    <div class="coords-modal-body">
      <div class="coords-modal-datum-box">
        <span class="datum-badge">REFERENCE DATUM</span>
        <div class="datum-text"><strong>IAU MOON_ME Sphere</strong> (R = 1,737.4 km)</div>
        <div class="datum-subtext">Latitude: -90.000° to +90.000° (South negative) · Longitude: 0.00° to 360.00° (East-positive)</div>
      </div>
      <div class="coords-form-grid">
        <div class="coords-field">
          <label for="manual-lat">Latitude (°)</label>
          <input type="number" id="manual-lat" class="coords-input" value="-89.463" min="-90" max="90" step="0.001" placeholder="-89.463" />
          <span class="coords-field-hint">-90.0° (South Pole) to +90.0° (North)</span>
        </div>
        <div class="coords-field">
          <label for="manual-lon">Longitude (°)</label>
          <input type="number" id="manual-lon" class="coords-input" value="222.51" min="0" max="360" step="0.01" placeholder="222.51" />
          <span class="coords-field-hint">0.0° (Earth-facing) to 360.0° East</span>
        </div>
      </div>
      <div id="coords-error-msg" class="coords-error" style="display:none;"></div>
      <div class="coords-preview-line" id="coords-preview-line">
        Format: 89.463° S, 222.510° E · South Polar Region
      </div>
    </div>
    <div class="coords-modal-footer">
      <button type="button" id="btn-cancel-manual-coords" class="coords-btn coords-btn-cancel">Cancel</button>
      <button type="button" id="btn-apply-manual-coords" class="coords-btn coords-btn-apply">Apply &amp; Target ⌖</button>
    </div>
  </div>
</div>

<!-- Telemetry Bottom Bar -->
<!-- 3D Model Floating Callout Card (shown for selected site only) -->
<div id="hud-3d-site-card" class="hud-3d-site-card card-amber" style="display:none;">
  <div class="hud-3d-card-header">
    <span class="hud-3d-card-dot"></span>
    <span class="hud-3d-card-title" id="hud-3d-card-title">SITE 01 (CONNECTING RIDGE)</span>
  </div>
  <div class="hud-3d-card-desig" id="hud-3d-card-desig">Shackleton–de Gerlache Connecting Ridge</div>
  <div class="hud-3d-card-divider"></div>
  <div class="hud-3d-card-grid">
    <span class="hud-3d-lbl">Coords:</span>
    <span class="hud-3d-val" id="hud-3d-val-coords">89.463° S, 222.510° E</span>
    <span class="hud-3d-lbl">Elevation:</span>
    <span class="hud-3d-val" id="hud-3d-val-elev">+1,100 m</span>
    <span class="hud-3d-lbl">Pole Dist:</span>
    <span class="hud-3d-val" id="hud-3d-val-dist">16.3 km</span>
    <span class="hud-3d-lbl">Dataset:</span>
    <span class="hud-3d-val" id="hud-3d-val-cov">★ Validated 5 m/px DEM</span>
  </div>
  <div class="hud-3d-card-status" id="hud-3d-card-status">
    <span class="hud-3d-comm" id="hud-3d-comm">COMM: LOS 84%</span>
    <span class="hud-3d-illum" id="hud-3d-illum">ILLUM: 96%</span>
  </div>
</div>

<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO / LOLA / LROC</span>
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${Ks.is4K?"NASA LROC 4K":"NASA LROC 2K"}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Jt.toFixed(1)} to +${Ys.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${qs} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(ts);Vi({sunLight:mt,earthshineLight:es},{onSiteInput:(n,e)=>{as(n,e,void 0,!0)},onSiteCalculate:(n,e,s)=>{const t=document.getElementById("selection-confirm-toast");t&&(t.style.display="none"),N&&(N.visible=!1),Me=null;const i=He(e,n),a=s.includes("·")?s.split("·")[0].trim():i?"Site 01 Target":"Custom Lunar Target";_e({name:a,designation:V(n,e),latitudeDeg:n,longitudeDeg:e,elevationM:Math.round(It(n,e)*1e3),isInsideSite01DEM:i},!1,!1)},onPresetSelect:(n,e,s)=>{const t=document.getElementById("selection-confirm-toast");t&&(t.style.display="none"),N&&(N.visible=!1),Me=null;const i=He(e,n),a=s.includes("·")?s.split("·")[0].trim():s;_e({name:a,designation:V(n,e),latitudeDeg:n,longitudeDeg:e,elevationM:Math.round(It(n,e)*1e3),isInsideSite01DEM:i},!0,!1)}});Q=new sa;Q.setOnSelect(n=>{_e(n,!1,!1)});Q.setOnApplyAndCalculate(async n=>{_e(n,!1,!1);try{return await Ct(n.latitudeDeg,n.longitudeDeg,`${n.name} · ${n.designation}`)}catch{return!1}});Q.setOnRecenter(n=>{ss(n.lat,n.lon)});ie=new aa;document.getElementById("btn-new-mission").addEventListener("click",()=>{ie==null||ie.toggle()});ge=new na;document.getElementById("btn-compare-sites").addEventListener("click",()=>{ge==null||ge.toggle()});ge.setOnInspectSiteOnGlobe(n=>{const e=He(n.lon,n.lat);_e({name:n.name,designation:V(n.lat,n.lon),latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:n.elevationM,isInsideSite01DEM:e},!0,!0)});ie.setOnSiteChanged(n=>{Zs(n,!1)});ie.setOnTimelineScrubbed(n=>{const[e,s,t]=jt(n.sun.direction_unit),i=8;mt.position.set(e*i,s*i,t*i);const a=document.getElementById("telem-sun-az");a&&(a.textContent=`${n.sun.azimuth_deg.toFixed(1)}° / ${n.sun.elevation_deg.toFixed(1)}°`);const o=document.getElementById("utc-clock");o&&(o.textContent=n.timestamp_utc),Xi(n.timestamp_utc)});function _e(n,e=!0,s=!0){Lt=n.latitudeDeg,xt=n.longitudeDeg,Zs(n,s);const t=se.find(i=>Math.abs(i.lat-n.latitudeDeg)<.05&&Math.abs(i.lon-n.longitudeDeg)<.05);Ae&&Ae.highlightSite(t?t.id:null),Q&&Q.setSelectedSite(t?t.id:null,n.latitudeDeg,n.longitudeDeg),document.querySelectorAll(".cand-btn").forEach(i=>{i.classList.toggle("active",(t==null?void 0:t.id)===i.dataset.site)}),ie&&ie.setCoordinatesFromGlobe(n.latitudeDeg,n.longitudeDeg,n.name,n.designation),e&&H&&ss(n.latitudeDeg,n.longitudeDeg)}function Zs(n,e=!0){if(!H)return;if(!R){R=new Fe,R.name="TargetSiteMarker";const d=new Pe(.04,.045,64);d.rotateX(Math.PI/2);const c=new j({color:3718648,side:we,transparent:!0,opacity:.28,blending:Ne});kt=new z(d,c),R.add(kt);const h=new Pe(.028,.032,64,1,0,Math.PI*1.3);h.rotateX(Math.PI/2);const u=new j({color:8246268,side:we,transparent:!0,opacity:.7,blending:Ne});Tt=new z(h,u),R.add(Tt);const m=new Pe(.019,.023,48);m.rotateX(Math.PI/2);const v=new j({color:3718648,side:we,transparent:!0,opacity:.95});R.add(new z(m,v));const g=new Pe(.009,.012,32);g.rotateX(Math.PI/2);const f=new j({color:8246268,side:we,transparent:!0,opacity:.9});R.add(new z(g,f)),[[-1,0],[1,0],[0,-1],[0,1]].forEach(([G,U])=>{const F=[new y(G*.006,0,U*.006),new y(G*.016,0,U*.016)],K=new te().setFromPoints(F),ae=new oe({color:3718648,transparent:!0,opacity:.9});R.add(new re(K,ae))});const E=.03,_=.009;[[1,-1],[-1,-1],[1,1],[-1,1]].forEach(([G,U])=>{const F=G*E*.707,K=U*E*.707,ae=[new y(F,0,K-U*_),new y(F,0,K),new y(F-G*_,0,K)],be=new te().setFromPoints(ae),he=new oe({color:3718648,transparent:!0,opacity:.85});R.add(new re(be,he))});const T=new De(.006,16,16),M=new j({color:16777215});R.add(new z(T,M));const L=new te().setFromPoints([new y(0,0,0),new y(0,.11,0)]),O=new oe({color:3718648,transparent:!0,opacity:.85,blending:Ne});R.add(new re(L,O));const I=new De(.009,12,12),P=new j({color:3718648}),D=new z(I,P);D.position.y=.11,R.add(D),H.add(R)}const s=ze(n.latitudeDeg,n.longitudeDeg,Ue*1.002);R.position.copy(s),R.visible=!ye;const t=s.clone().normalize();R.quaternion.setFromUnitVectors(new y(0,1,0),t);const i=document.getElementById("active-site-display");i&&(i.textContent=`${n.name} · ${n.designation}`);const a=document.getElementById("hud-3d-site-card");if(a){const d=n.name.includes("Site 01")||n.name.includes("Custom");a.className=d?"hud-3d-site-card card-amber":"hud-3d-site-card";const c=document.getElementById("hud-3d-card-title"),h=document.getElementById("hud-3d-card-desig"),u=document.getElementById("hud-3d-val-coords"),m=document.getElementById("hud-3d-val-elev"),v=document.getElementById("hud-3d-val-dist"),g=document.getElementById("hud-3d-val-cov"),f=document.getElementById("hud-3d-comm"),E=document.getElementById("hud-3d-illum");c&&(c.textContent=n.name.toUpperCase()),h&&(h.textContent=n.designation),u&&(u.textContent=V(n.latitudeDeg,n.longitudeDeg)),m&&(m.textContent=`${n.elevationM>=0?"+":""}${n.elevationM.toLocaleString()} m`),v&&(v.textContent=`${ut(n.latitudeDeg).toFixed(1)} km`),g&&(g.textContent=n.isInsideSite01DEM?"★ Validated 5 m/px DEM":"Global LOLA (~60 m/px)"),f&&(f.textContent=n.name.includes("Site 01")?"COMM: LOS 84%":"COMM: DTE VISIBLE"),E&&(E.textContent=n.name.includes("Site 01")?"ILLUM: 96%":"ILLUM: POLAR SUN")}const o=document.getElementById("readout-coords"),r=document.getElementById("readout-elev"),l=document.getElementById("readout-pole-dist");if(o&&(o.textContent=V(n.latitudeDeg,n.longitudeDeg)),r&&(r.textContent=`${n.elevationM>=0?"+":""}${(n.elevationM/1e3).toFixed(2)} km`),l){const d=ut(n.latitudeDeg);l.textContent=`${d.toFixed(1)} km to 90°S`}if(e)return Ct(n.latitudeDeg,n.longitudeDeg,`${n.name} · ${n.designation}`)}function ss(n,e){H.updateMatrixWorld(!0);const t=ze(n,e,Ue).clone().applyMatrix4(H.matrixWorld),i=t.clone().normalize(),a=t.clone().add(i.clone().multiplyScalar(.85));Dt(a,t,1.2)}function Js(){if(ye=!ye,document.getElementById("btn-south-pole").classList.toggle("active",ye),Q&&(ye?Q.open():Q.close()),R&&(R.visible=!ye),ye){H.updateMatrixWorld(!0);const s=new y(0,-Ue,0).clone().applyMatrix4(H.matrixWorld),i=s.clone().normalize().clone().multiplyScalar(2.65);i.addScaledVector(new y(1,0,0),.15),i.addScaledVector(new y(0,0,1),.15),Dt(i,s,1.3)}else Dt(new y(0,.2,4),new y(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",Js);document.getElementById("btn-reset").addEventListener("click",()=>{var n;ye=!1,(n=document.getElementById("btn-south-pole"))==null||n.classList.remove("active"),Q==null||Q.close(),R&&(R.visible=!0),Dt(new y(0,.2,4),new y(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{lt=!lt;const n=document.getElementById("btn-auto");n.textContent=lt?"⏸ Auto-Rotate":"▶ Auto-Rotate",n.classList.toggle("active",lt)});document.getElementById("btn-sun").addEventListener("click",()=>{dt=!dt;const n=document.getElementById("btn-sun");n.classList.toggle("active",dt),n.textContent=dt?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.site,s=se.find(t=>t.id===e);s&&_e({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})})});const is=document.getElementById("coords-modal"),Qe=document.getElementById("manual-lat"),Rt=document.getElementById("manual-lon"),je=document.getElementById("coords-error-msg"),Ma=document.getElementById("coords-preview-line");function as(n,e,s,t=!1){var c;if(s===void 0&&(s=It(n,e)),Me={latDeg:n,lonDeg:e,elevKm:s},N){const h=ze(n,e,Ue*1.002);N.position.copy(h);const u=h.clone().normalize();N.quaternion.setFromUnitVectors(new y(0,1,0),u),N.visible=!0}t&&H&&(ye&&n>-80&&(ye=!1,(c=document.getElementById("btn-south-pole"))==null||c.classList.remove("active"),Q==null||Q.close()),ss(n,e));const i=document.getElementById("readout-coords");i&&(i.textContent=V(n,e));const a=document.getElementById("readout-elev");a&&(a.textContent=`${s>=0?"+":""}${s.toFixed(2)} km`);const o=document.getElementById("selection-confirm-toast"),r=document.getElementById("toast-coords-text"),l=document.getElementById("toast-elev-text");r.textContent=V(n,e);const d=ut(n);l.textContent=`Elevation: ${s>=0?"+":""}${s.toFixed(2)} km · Distance to 90°S: ${d.toFixed(1)} km`,o.style.display="block"}function _a(){Qe.value=Lt.toFixed(3),Rt.value=xt.toFixed(2),je.style.display="none",ns(),document.getElementById("selection-confirm-toast").style.display="none",N&&(N.visible=!1),Me=null,is.style.display="flex",setTimeout(()=>{Qe.focus(),Qe.select()},40)}function Nt(){is.style.display="none",je.style.display="none"}function Qs(){const n=Ot(Qe.value,Rt.value);if(!n.valid){je.textContent=n.error||"Invalid coordinates.",je.style.display="block";return}Nt(),as(n.lat,n.lon,void 0,!0)}document.getElementById("btn-manual-coords").addEventListener("click",_a);document.getElementById("btn-close-coords-modal").addEventListener("click",Nt);document.getElementById("btn-cancel-manual-coords").addEventListener("click",Nt);document.getElementById("btn-apply-manual-coords").addEventListener("click",Qs);is.addEventListener("keydown",n=>{n.key==="Escape"?(n.stopPropagation(),Nt()):n.key==="Enter"&&(n.preventDefault(),Qs())});function ns(){const n=Ot(Qe.value,Rt.value);if(!n.valid)je.textContent=n.error||"Invalid coordinates.",je.style.display="block";else{je.style.display="none";const e=n.lat<=-80,s=ut(n.lat);Ma.innerHTML=`Format: <strong>${V(n.lat,n.lon)}</strong><br />Region: <strong>${e?"South Polar Region (80°S–90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${s.toFixed(1)} km</strong>`}}Qe.addEventListener("input",ns);Rt.addEventListener("input",ns);const Pt=new Os,$t=new q;let ei=new q,ti=0,os=!1,rs=!1;tt.addEventListener("pointerdown",n=>{ei.set(n.clientX,n.clientY),ti=performance.now(),os=!1});tt.addEventListener("pointermove",n=>{ei.distanceTo(new q(n.clientX,n.clientY))>5&&(os=!0),$t.x=n.clientX/window.innerWidth*2-1,$t.y=-(n.clientY/window.innerHeight)*2+1,rs=!0});tt.addEventListener("pointerleave",()=>{rs=!1,J&&(J.visible=!1)});tt.addEventListener("click",n=>{if(os||performance.now()-ti>350)return;if(Ae){const s=Ae.handleClick(n,ue);if(s){_e({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM});return}}if(!Ee)return;Pt.setFromCamera($t,ue);const e=Pt.intersectObject(Ee);if(e.length>0){const s=e[0],t=Ee.worldToLocal(s.point.clone()),{latDeg:i,lonDeg:a}=Gs(t);let o=0;s.face&&et?o=et[s.face.a]??0:o=It(i,a),as(i,a,o,!1)}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(Me){const{latDeg:n,lonDeg:e,elevKm:s}=Me,t=He(e,n);_e({name:t?"Site 01 Target":"Custom Lunar Target",designation:V(n,e),latitudeDeg:n,longitudeDeg:e,elevationM:Math.round(s*1e3),isInsideSite01DEM:t})}document.getElementById("selection-confirm-toast").style.display="none",N&&(N.visible=!1),Me=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",N&&(N.visible=!1),Me=null});function Ca(){if(!rs||!Ee||!J){J&&(J.visible=!1);return}Pt.setFromCamera($t,ue);const n=Pt.intersectObject(Ee);if(n.length>0){const e=n[0],s=Ee.worldToLocal(e.point.clone()),{latDeg:t,lonDeg:i}=Gs(s),a=document.getElementById("readout-coords");a&&!Me&&(a.textContent=V(t,i));const o=s.clone().normalize();if(J.position.copy(s.clone().multiplyScalar(1.0015)),J.quaternion.setFromUnitVectors(new y(0,1,0),o),J.visible=!0,e.face&&et){const r=et[e.face.a],l=document.getElementById("readout-elev");l&&!Me&&(l.textContent=`${r>=0?"+":""}${r.toFixed(2)} km`)}}else J.visible=!1}window.addEventListener("keydown",n=>{var e,s,t;if(!(n.target instanceof HTMLInputElement||n.target instanceof HTMLTextAreaElement))switch(n.key.toLowerCase()){case" ":n.preventDefault(),(e=document.getElementById("btn-auto"))==null||e.click();break;case"p":n.preventDefault(),Js();break;case"r":n.preventDefault(),(s=document.getElementById("btn-reset"))==null||s.click();break;case"s":n.preventDefault(),(t=document.getElementById("btn-sun"))==null||t.click();break;case"m":n.preventDefault(),ie==null||ie.toggle();break;case"c":n.preventDefault(),ge==null||ge.toggle();break}});function Ta(){const n=window.innerWidth,e=window.innerHeight;ue.aspect=n/e,ue.updateProjectionMatrix(),ve.setSize(n,e),gt.setSize(n,e),Xs.resolution.set(n,e)}window.addEventListener("resize",Ta);_e({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100,isInsideSite01DEM:!0},!1);const As=new Oi;function ka(){const n=document.getElementById("hud-3d-site-card");if(!n||!H||isNaN(Lt)||isNaN(xt)){n&&(n.style.display="none");return}const s=ze(Lt,xt,Ue*1.002).clone().applyMatrix4(H.matrixWorld),t=ue.position.clone().sub(s).normalize();if(s.clone().normalize().dot(t)<=.05){n.style.display="none";return}const o=s.clone().project(ue);if(o.z>=1){n.style.display="none";return}const r=(o.x*.5+.5)*window.innerWidth,l=(-(o.y*.5)+.5)*window.innerHeight,d=230,c=140,h=r+32+d>window.innerWidth?r-d-24:r+32,u=Math.max(16,Math.min(l-45,window.innerHeight-c-16));n.style.display="flex",n.style.left=`${h}px`,n.style.top=`${u}px`}function si(){requestAnimationFrame(si);const n=As.getDelta(),e=As.getElapsedTime();if(de.update(),fe){const t=performance.now()-fe.startTime,i=Math.min(1,t/fe.duration),a=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;ue.position.lerpVectors(fe.startPos,fe.targetPos,a),de.target.lerpVectors(fe.startLook,fe.targetLook,a),de.update(),i>=1&&(fe=null)}if(Ae&&Ae.update(e),Tt&&(Tt.rotation.y=e*1.8),kt){const t=.22+.12*Math.sin(e*2.2);kt.material.opacity=t}const s=!!(ie!=null&&ie.getIsOpen())||!!(ge!=null&&ge.getIsOpen());if(H&&lt&&!Qt&&!fe&&!s&&(H.rotation.y+=.02*n),dt){Et+=.12*n;const t=8;mt.position.set(Math.cos(Et)*t,Math.sin(Et*.25)*2,Math.sin(Et)*t)}Ca(),ka(),gt.render()}si();
