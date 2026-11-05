var vi=Object.defineProperty;var bi=(a,e,s)=>e in a?vi(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var b=(a,e,s)=>bi(a,typeof e!="symbol"?e+"":e,s);import{X as fi,d as S,Y as Ye,Z as Ve,_ as ws,$ as Es,V as j,a0 as Si,a1 as yi,l as It,a2 as As,G as Re,B as ee,a3 as ne,g as Ae,a4 as oe,v as xe,r as B,o as be,M as z,j as ke,W as wi,S as Os,A as Ei,a as Mi,C as _i,b as Ci,i as Ti,D as Rs,E as ki,R as xi,U as Li,c as Di,T as Ii,e as Pi,f as $i,h as Ai,z as Oi,N as Ri,K as Ns,J as Fs,n as Ni,x as Fi,a5 as zi,a6 as Hi}from"./UnrealBloomPass-CF8Vl7q6.js";const Ms={type:"change"},zt={type:"start"},_s={type:"end"},vt=new Si,Cs=new yi,Ui=Math.cos(70*It.DEG2RAD);class Bi extends fi{constructor(e,s){super(),this.object=e,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ye.ROTATE,MIDDLE:Ye.DOLLY,RIGHT:Ye.PAN},this.touches={ONE:Ve.ROTATE,TWO:Ve.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(p){p.addEventListener("keydown",Ft),this._domElementKeyEvents=p},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ft),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(Ms),t.update(),n=i.NONE},this.update=function(){const p=new S,w=new Es().setFromUnitVectors(e.up,new S(0,1,0)),x=w.clone().invert(),$=new S,K=new Es,$e=new S,le=2*Math.PI;return function(gi=null){const Ss=t.object.position;p.copy(Ss).sub(t.target),p.applyQuaternion(w),o.setFromVector3(p),t.autoRotate&&n===i.NONE&&G(X(gi)),t.enableDamping?(o.theta+=c.theta*t.dampingFactor,o.phi+=c.phi*t.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Ee=t.minAzimuthAngle,Me=t.maxAzimuthAngle;isFinite(Ee)&&isFinite(Me)&&(Ee<-Math.PI?Ee+=le:Ee>Math.PI&&(Ee-=le),Me<-Math.PI?Me+=le:Me>Math.PI&&(Me-=le),Ee<=Me?o.theta=Math.max(Ee,Math.min(Me,o.theta)):o.theta=o.theta>(Ee+Me)/2?Math.max(Ee,o.theta):Math.min(Me,o.theta)),o.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,o.phi)),o.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(d,t.dampingFactor):t.target.add(d),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor);let it=!1;if(t.zoomToCursor&&O||t.object.isOrthographicCamera)o.radius=y(o.radius);else{const _e=o.radius;o.radius=y(o.radius*l),it=_e!=o.radius}if(p.setFromSpherical(o),p.applyQuaternion(x),Ss.copy(t.target).add(p),t.object.lookAt(t.target),t.enableDamping===!0?(c.theta*=1-t.dampingFactor,c.phi*=1-t.dampingFactor,d.multiplyScalar(1-t.dampingFactor)):(c.set(0,0,0),d.set(0,0,0)),t.zoomToCursor&&O){let _e=null;if(t.object.isPerspectiveCamera){const at=p.length();_e=y(at*l);const gt=at-_e;t.object.position.addScaledVector(E,gt),t.object.updateMatrixWorld(),it=!!gt}else if(t.object.isOrthographicCamera){const at=new S(k.x,k.y,0);at.unproject(t.object);const gt=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),it=gt!==t.object.zoom;const ys=new S(k.x,k.y,0);ys.unproject(t.object),t.object.position.sub(ys).add(at),t.object.updateMatrixWorld(),_e=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;_e!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(_e).add(t.object.position):(vt.origin.copy(t.object.position),vt.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(vt.direction))<Ui?e.lookAt(t.target):(Cs.setFromNormalAndCoplanarPoint(t.object.up,t.target),vt.intersectPlane(Cs,t.target))))}else if(t.object.isOrthographicCamera){const _e=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),_e!==t.object.zoom&&(t.object.updateProjectionMatrix(),it=!0)}return l=1,O=!1,it||$.distanceToSquared(t.object.position)>r||8*(1-K.dot(t.object.quaternion))>r||$e.distanceToSquared(t.target)>r?(t.dispatchEvent(Ms),$.copy(t.object.position),K.copy(t.object.quaternion),$e.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",bs),t.domElement.removeEventListener("pointerdown",us),t.domElement.removeEventListener("pointercancel",st),t.domElement.removeEventListener("wheel",hs),t.domElement.removeEventListener("pointermove",Nt),t.domElement.removeEventListener("pointerup",st),t.domElement.getRootNode().removeEventListener("keydown",ms,{capture:!0}),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",Ft),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let n=i.NONE;const r=1e-6,o=new ws,c=new ws;let l=1;const d=new S,u=new j,h=new j,g=new j,v=new j,m=new j,f=new j,M=new j,_=new j,T=new j,E=new S,k=new j;let O=!1;const D=[],A={};let L=!1;function X(p){return p!==null?2*Math.PI/60*t.autoRotateSpeed*p:2*Math.PI/60/60*t.autoRotateSpeed}function W(p){const w=Math.abs(p*.01);return Math.pow(.95,t.zoomSpeed*w)}function G(p){c.theta-=p}function ie(p){c.phi-=p}const we=function(){const p=new S;return function(x,$){p.setFromMatrixColumn($,0),p.multiplyScalar(-x),d.add(p)}}(),ze=function(){const p=new S;return function(x,$){t.screenSpacePanning===!0?p.setFromMatrixColumn($,1):(p.setFromMatrixColumn($,0),p.crossVectors(t.object.up,p)),p.multiplyScalar(x),d.add(p)}}(),ce=function(){const p=new S;return function(x,$){const K=t.domElement;if(t.object.isPerspectiveCamera){const $e=t.object.position;p.copy($e).sub(t.target);let le=p.length();le*=Math.tan(t.object.fov/2*Math.PI/180),we(2*x*le/K.clientHeight,t.object.matrix),ze(2*$*le/K.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(we(x*(t.object.right-t.object.left)/t.object.zoom/K.clientWidth,t.object.matrix),ze($*(t.object.top-t.object.bottom)/t.object.zoom/K.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function je(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l/=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function tt(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l*=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function We(p,w){if(!t.zoomToCursor)return;O=!0;const x=t.domElement.getBoundingClientRect(),$=p-x.left,K=w-x.top,$e=x.width,le=x.height;k.x=$/$e*2-1,k.y=-(K/le)*2+1,E.set(k.x,k.y,1).unproject(t.object).sub(t.object.position).normalize()}function y(p){return Math.max(t.minDistance,Math.min(t.maxDistance,p))}function C(p){u.set(p.clientX,p.clientY)}function P(p){We(p.clientX,p.clientX),M.set(p.clientX,p.clientY)}function R(p){v.set(p.clientX,p.clientY)}function Q(p){h.set(p.clientX,p.clientY),g.subVectors(h,u).multiplyScalar(t.rotateSpeed);const w=t.domElement;G(2*Math.PI*g.x/w.clientHeight),ie(2*Math.PI*g.y/w.clientHeight),u.copy(h),t.update()}function Pe(p){_.set(p.clientX,p.clientY),T.subVectors(_,M),T.y>0?je(W(T.y)):T.y<0&&tt(W(T.y)),M.copy(_),t.update()}function Ot(p){m.set(p.clientX,p.clientY),f.subVectors(m,v).multiplyScalar(t.panSpeed),ce(f.x,f.y),v.copy(m),t.update()}function Rt(p){We(p.clientX,p.clientY),p.deltaY<0?tt(W(p.deltaY)):p.deltaY>0&&je(W(p.deltaY)),t.update()}function ii(p){let w=!1;switch(p.code){case t.keys.UP:p.ctrlKey||p.metaKey||p.shiftKey?ie(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ce(0,t.keyPanSpeed),w=!0;break;case t.keys.BOTTOM:p.ctrlKey||p.metaKey||p.shiftKey?ie(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ce(0,-t.keyPanSpeed),w=!0;break;case t.keys.LEFT:p.ctrlKey||p.metaKey||p.shiftKey?G(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ce(t.keyPanSpeed,0),w=!0;break;case t.keys.RIGHT:p.ctrlKey||p.metaKey||p.shiftKey?G(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ce(-t.keyPanSpeed,0),w=!0;break}w&&(p.preventDefault(),t.update())}function os(p){if(D.length===1)u.set(p.pageX,p.pageY);else{const w=qe(p),x=.5*(p.pageX+w.x),$=.5*(p.pageY+w.y);u.set(x,$)}}function rs(p){if(D.length===1)v.set(p.pageX,p.pageY);else{const w=qe(p),x=.5*(p.pageX+w.x),$=.5*(p.pageY+w.y);v.set(x,$)}}function ls(p){const w=qe(p),x=p.pageX-w.x,$=p.pageY-w.y,K=Math.sqrt(x*x+$*$);M.set(0,K)}function ai(p){t.enableZoom&&ls(p),t.enablePan&&rs(p)}function ni(p){t.enableZoom&&ls(p),t.enableRotate&&os(p)}function ds(p){if(D.length==1)h.set(p.pageX,p.pageY);else{const x=qe(p),$=.5*(p.pageX+x.x),K=.5*(p.pageY+x.y);h.set($,K)}g.subVectors(h,u).multiplyScalar(t.rotateSpeed);const w=t.domElement;G(2*Math.PI*g.x/w.clientHeight),ie(2*Math.PI*g.y/w.clientHeight),u.copy(h)}function cs(p){if(D.length===1)m.set(p.pageX,p.pageY);else{const w=qe(p),x=.5*(p.pageX+w.x),$=.5*(p.pageY+w.y);m.set(x,$)}f.subVectors(m,v).multiplyScalar(t.panSpeed),ce(f.x,f.y),v.copy(m)}function ps(p){const w=qe(p),x=p.pageX-w.x,$=p.pageY-w.y,K=Math.sqrt(x*x+$*$);_.set(0,K),T.set(0,Math.pow(_.y/M.y,t.zoomSpeed)),je(T.y),M.copy(_);const $e=(p.pageX+w.x)*.5,le=(p.pageY+w.y)*.5;We($e,le)}function oi(p){t.enableZoom&&ps(p),t.enablePan&&cs(p)}function ri(p){t.enableZoom&&ps(p),t.enableRotate&&ds(p)}function us(p){t.enabled!==!1&&(D.length===0&&(t.domElement.setPointerCapture(p.pointerId),t.domElement.addEventListener("pointermove",Nt),t.domElement.addEventListener("pointerup",st)),!mi(p)&&(ui(p),p.pointerType==="touch"?vs(p):li(p)))}function Nt(p){t.enabled!==!1&&(p.pointerType==="touch"?pi(p):di(p))}function st(p){switch(hi(p),D.length){case 0:t.domElement.releasePointerCapture(p.pointerId),t.domElement.removeEventListener("pointermove",Nt),t.domElement.removeEventListener("pointerup",st),t.dispatchEvent(_s),n=i.NONE;break;case 1:const w=D[0],x=A[w];vs({pointerId:w,pageX:x.x,pageY:x.y});break}}function li(p){let w;switch(p.button){case 0:w=t.mouseButtons.LEFT;break;case 1:w=t.mouseButtons.MIDDLE;break;case 2:w=t.mouseButtons.RIGHT;break;default:w=-1}switch(w){case Ye.DOLLY:if(t.enableZoom===!1)return;P(p),n=i.DOLLY;break;case Ye.ROTATE:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enablePan===!1)return;R(p),n=i.PAN}else{if(t.enableRotate===!1)return;C(p),n=i.ROTATE}break;case Ye.PAN:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enableRotate===!1)return;C(p),n=i.ROTATE}else{if(t.enablePan===!1)return;R(p),n=i.PAN}break;default:n=i.NONE}n!==i.NONE&&t.dispatchEvent(zt)}function di(p){switch(n){case i.ROTATE:if(t.enableRotate===!1)return;Q(p);break;case i.DOLLY:if(t.enableZoom===!1)return;Pe(p);break;case i.PAN:if(t.enablePan===!1)return;Ot(p);break}}function hs(p){t.enabled===!1||t.enableZoom===!1||n!==i.NONE||(p.preventDefault(),t.dispatchEvent(zt),Rt(ci(p)),t.dispatchEvent(_s))}function ci(p){const w=p.deltaMode,x={clientX:p.clientX,clientY:p.clientY,deltaY:p.deltaY};switch(w){case 1:x.deltaY*=16;break;case 2:x.deltaY*=100;break}return p.ctrlKey&&!L&&(x.deltaY*=10),x}function ms(p){p.key==="Control"&&(L=!0,t.domElement.getRootNode().addEventListener("keyup",gs,{passive:!0,capture:!0}))}function gs(p){p.key==="Control"&&(L=!1,t.domElement.getRootNode().removeEventListener("keyup",gs,{passive:!0,capture:!0}))}function Ft(p){t.enabled===!1||t.enablePan===!1||ii(p)}function vs(p){switch(fs(p),D.length){case 1:switch(t.touches.ONE){case Ve.ROTATE:if(t.enableRotate===!1)return;os(p),n=i.TOUCH_ROTATE;break;case Ve.PAN:if(t.enablePan===!1)return;rs(p),n=i.TOUCH_PAN;break;default:n=i.NONE}break;case 2:switch(t.touches.TWO){case Ve.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;ai(p),n=i.TOUCH_DOLLY_PAN;break;case Ve.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;ni(p),n=i.TOUCH_DOLLY_ROTATE;break;default:n=i.NONE}break;default:n=i.NONE}n!==i.NONE&&t.dispatchEvent(zt)}function pi(p){switch(fs(p),n){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;ds(p),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;cs(p),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;oi(p),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;ri(p),t.update();break;default:n=i.NONE}}function bs(p){t.enabled!==!1&&p.preventDefault()}function ui(p){D.push(p.pointerId)}function hi(p){delete A[p.pointerId];for(let w=0;w<D.length;w++)if(D[w]==p.pointerId){D.splice(w,1);return}}function mi(p){for(let w=0;w<D.length;w++)if(D[w]==p.pointerId)return!0;return!1}function fs(p){let w=A[p.pointerId];w===void 0&&(w=new j,A[p.pointerId]=w),w.set(p.pageX,p.pageY)}function qe(p){const w=p.pointerId===D[0]?D[1]:D[0];return A[w]}t.domElement.addEventListener("contextmenu",bs),t.domElement.addEventListener("pointerdown",us),t.domElement.addEventListener("pointercancel",st),t.domElement.addEventListener("wheel",hs,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",ms,{passive:!0,capture:!0}),this.update()}}const Ie="http://127.0.0.1:8000";async function Yt(){const a=await fetch(`${Ie}/api/spice/health`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`Health check failed: HTTP ${a.status}`);return a.json()}async function zs(a){var s;const e=await fetch(`${Ie}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Geometry request failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Gi(a){var s;const e=await fetch(`${Ie}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Horizon profile failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Hs(a){var s;const e=await fetch(`${Ie}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Horizon visibility failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function ji(a){var s;const e=await fetch(`${Ie}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Mission timeline calculation failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Wi(a){var s;const e=await fetch(`${Ie}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Candidate comparison failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Us(a){var s;const e=await fetch(`${Ie}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Landing windows scan failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}function Bt(a){const[e,s,t]=a,i=e,n=t,r=s,o=Math.sqrt(i*i+n*n+r*r);return o<1e-10?[0,1,0]:[i/o,n/o,r/o]}const Bs=1737400,qi=1737.4,I={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function Oe(a,e,s=Bs){const i=(a%360+360)%360*Math.PI/180,n=e*Math.PI/180,r=Math.PI/2+n,o=2*s*Math.tan(r/2),c=o*Math.sin(i),l=o*Math.cos(i);return{x:c,y:l}}function Vt(a,e,s=Bs){const t=Math.hypot(a,e);if(t<1e-7)return{lonDeg:0,latDeg:-90};const i=2*Math.atan2(t,2*s),n=-Math.PI/2+i,o=(Math.atan2(a,e)*180/Math.PI+360)%360,c=n*180/Math.PI;return{lonDeg:o,latDeg:c}}function Be(a,e){if(e>-80)return!1;const{x:s,y:t}=Oe(a,e);return s>=I.minX&&s<=I.maxX&&t>=I.minY&&t<=I.maxY}function Yi(a,e){const s=a>=I.minX&&a<=I.maxX&&e>=I.minY&&e<=I.maxY,t=(a-I.minX)/I.pixelSizeM,i=(I.maxY-e)/I.pixelSizeM,n=t/I.fullWidthPx,r=i/I.fullHeightPx,o=Math.max(0,Math.min(511,Math.round(n*512))),c=Math.max(0,Math.min(511,Math.round(r*512)));return{pxFull:t,pyFull:i,px512:o,py512:c,isInside:s}}function Vi(a,e){const s=Math.max(0,Math.min(1,a/512)),t=Math.max(0,Math.min(1,e/512)),i=I.minX+s*(I.maxX-I.minX),n=I.maxY-t*(I.maxY-I.minY),{lonDeg:r,latDeg:o}=Vt(i,n);return{lonDeg:r,latDeg:o,x:i,y:n}}function Ne(a,e,s){const t=Math.max(-90,Math.min(90,a));if(Math.abs(t+90)<1e-7)return new S(0,-s,0);if(Math.abs(t-90)<1e-7)return new S(0,s,0);const i=(90-t)*(Math.PI/180),n=(e+180)*(Math.PI/180),r=-s*Math.cos(n)*Math.sin(i),o=s*Math.cos(i),c=s*Math.sin(n)*Math.sin(i);return new S(r,o,c)}function pt(a){const e=(90-Math.max(-90,Math.min(90,a)))*(Math.PI/180);return(Math.PI-e)*qi}function Gs(a,e){const s=a.clone().normalize(),i=Math.asin(Math.max(-1,Math.min(1,s.y)))*180/Math.PI;if(i<=-89.9999)return{latDeg:-90,lonDeg:0};if(i>=89.9999)return{latDeg:90,lonDeg:0};let r=Math.atan2(-s.z,s.x)*180/Math.PI;return r<0&&(r+=360),{latDeg:i,lonDeg:r}}function Pt(a,e){const s=typeof a=="number"?a:parseFloat(a),t=typeof e=="number"?e:parseFloat(e);if(isNaN(s)||isNaN(t))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(s<-90||s>90)return{valid:!1,lat:s,lon:t,error:"Latitude must be between -90.0° and +90.0°."};const i=(t%360+360)%360;return{valid:!0,lat:s,lon:i}}function V(a,e){if(Math.abs(a+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(a-90)<.001)return"90.000° N (True Lunar North Pole)";const s=`${Math.abs(a).toFixed(3)}° ${a<0?"S":"N"}`,i=`${((e%360+360)%360).toFixed(3)}° E`;return`${s}, ${i}`}let dt=null,q=null,bt=!1,Y=null,ot=!1,ft=0,Le=!1,ct="step_1h",Ke=null,wt=0;const Ze={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};let Ht=null,Ut=null;async function Et(a,e,s,t){if(!Y)return!1;if(!t&&Ht!==null&&Ut!==null&&Math.abs(Ht-a)<1e-4&&Math.abs(Ut-e)<1e-4)return!0;Ht=a,Ut=e;const i=++ft,n=Y.querySelector("#spice-lat"),r=Y.querySelector("#spice-lon"),o=Y.querySelector("#spice-time-input"),c=Y.querySelector("#spice-site-note"),l=Y.querySelector("#spice-window-card");if(n&&(n.value=a.toFixed(3)),r&&(r.value=e.toFixed(2)),c&&(c.textContent=s),Y.querySelectorAll(".spice-preset-btn").forEach(d=>{const u=parseFloat(d.dataset.lat||"999"),h=parseFloat(d.dataset.lon||"999");Math.abs(u-a)<.05&&Math.abs(h-e)<.05?d.classList.add("active"):d.classList.remove("active")}),t){o&&(o.value=t),ot=!0;try{return await ve(Y)}finally{ot=!1}}l&&(l.style.display="block",l.innerHTML=`
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `);try{const h=await Us({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:a,longitude_deg:e});if(i!==ft)return!1;Xi(l,h,a,e);let g=h.summary.best_window_start;if(!g&&h.days.length>0){const v=h.days.filter(m=>m.is_safe_for_landing);v.length>0&&(g=v[0].date)}g&&o?o.value=`${g}T12:00:00Z`:o&&!o.value&&(o.value="2026-10-16T12:00:00Z")}catch(d){if(i!==ft)return!1;console.warn("[SPICE] Candidate window scan error",d),l&&(l.innerHTML=`
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `),o&&!o.value&&(o.value="2026-10-16T12:00:00Z")}if(i!==ft)return!1;ot=!0;try{return await ve(Y)}finally{ot=!1}}function Xi(a,e,s,t){if(!a)return;const i=e.summary,n=Be(t,s),r=i.best_window_start,o=i.safe_days_count;let c=r,l=0;if(r&&e.days.length>0){const d=e.days.findIndex(u=>u.date===r);if(d!==-1){let u=d;for(;u<e.days.length&&e.days[u].is_safe_for_landing;)c=e.days[u].date,l++,u++}}if(l===0&&o>0&&(l=1),r&&o>0){const d=e.days.find(v=>v.date===r),u=d?d.sunlight.full_hours:12,h=d?d.earth_los.full_hours:24,g=d?d.safety_score:80;a.innerHTML=`
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
          <span class="smw-val">${r}T00:00Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">WINDOW END</span>
          <span class="smw-val">${c||r}T23:59Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">SAFE DURATION</span>
          <span class="smw-val">${l} Continuous Days (${l*24} hrs)</span>
        </div>
      </div>

      <!-- Configured Evaluation Criteria & Status -->
      <div class="smw-criteria-box">
        <div class="smw-crit-title">EVALUATION CRITERIA:</div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Continuous Solar Illumination ≥ 6.0 h/day (Calculated: ${u.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Direct-To-Earth (DTE) LOS ≥ 6.0 h/day (Calculated: ${h.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit ${n?"crit-met":"crit-uneval"}">${n?"MET":"UNEVALUABLE"}</span>
          <span class="smw-crit-desc">
            ${n?"Local DEM Horizon Clearance: Validated within 5m/px Site 01 DEM":"Local DEM Clearance: Outside 5m/px DEM footprint (Global LOLA only)"}
          </span>
        </div>
      </div>

      <div class="smw-footer">
        <span class="smw-index-pill">Heuristic Index: ${g.toFixed(1)} / 100</span>
        <span class="smw-note">*Unvalidated internal estimate from joint illumination & LOS fractions. Not a landing probability.</span>
      </div>
    `}else a.innerHTML=`
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
    `}function Ki(a){if(!Y)return!1;const e=Y.querySelector("#spice-time-input");e&&(e.value=a,ve(Y))}function Zi(a,e){var u,h,g,v,m,f,M,_,T;dt=a,q=e||null;const s=document.createElement("div");s.id="spice-panel",s.innerHTML=Ji(),document.body.appendChild(s),Y=s,s.querySelector("#spice-fetch-btn").addEventListener("click",()=>ve(s)),s.querySelector("#spice-auto-btn").addEventListener("click",()=>ta(s)),(u=s.querySelector("#spice-autotrack-mode"))==null||u.addEventListener("change",E=>{ct=E.target.value,Xt(s)}),(h=s.querySelector("#spice-retry-btn"))==null||h.addEventListener("click",()=>Gt(s,!0)),(g=s.querySelector("#spice-now-btn"))==null||g.addEventListener("click",()=>{Te(s);const E=s.querySelector("#spice-time-input");E&&(E.value=new Date().toISOString().slice(0,19)+"Z",ve(s))}),(v=s.querySelector("#spice-epoch-artemis"))==null||v.addEventListener("click",()=>{Te(s);const E=s.querySelector("#spice-time-input");E&&(E.value="2026-10-16T12:00:00Z",ve(s))}),(m=s.querySelector("#spice-step-back-24"))==null||m.addEventListener("click",()=>{Te(s),Xe(-24)}),(f=s.querySelector("#spice-step-back-1"))==null||f.addEventListener("click",()=>{Te(s),Xe(-1)}),(M=s.querySelector("#spice-step-fwd-1"))==null||M.addEventListener("click",()=>{Te(s),Xe(1)}),(_=s.querySelector("#spice-step-fwd-24"))==null||_.addEventListener("click",()=>{Te(s),Xe(24)}),s.querySelectorAll(".spice-preset-btn").forEach(E=>{E.addEventListener("click",()=>{var A;const k=parseFloat(E.dataset.lat||"-90"),O=parseFloat(E.dataset.lon||"0"),D=E.dataset.label||"South Pole Site";Et(k,O,D),s.querySelectorAll(".spice-preset-btn").forEach(L=>L.classList.remove("active")),E.classList.add("active"),(A=q==null?void 0:q.onPresetSelect)==null||A.call(q,k,O,D)})});const t=s.querySelector("#spice-lat"),i=s.querySelector("#spice-lon"),n=s.querySelector("#spice-site-note");let r=null;const o=()=>{var D;if(!t||!i)return;Te(s);const E=Pt(t.value,i.value);if(!E.valid)return;const k=[{lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"},{lat:-90,lon:0,label:"Geographic South Pole (90.0°S · Datum)"},{lat:-89.78,lon:128,label:"Shackleton Crater Peak"},{lat:-86.04,lon:2.7,label:"Malapert Mountain (Massif)"}].find(A=>Math.abs(A.lat-E.lat)<.05&&Math.abs(A.lon-E.lon)<.05);s.querySelectorAll(".spice-preset-btn").forEach(A=>{const L=parseFloat(A.dataset.lat||"999"),X=parseFloat(A.dataset.lon||"999");A.classList.toggle("active",Math.abs(L-E.lat)<.05&&Math.abs(X-E.lon)<.05)});const O=k?k.label:`Custom Lunar Target · ${V(E.lat,E.lon)}`;n&&(n.textContent=O),(D=q==null?void 0:q.onSiteInput)==null||D.call(q,E.lat,E.lon,O)};t==null||t.addEventListener("input",()=>{r!==null&&clearTimeout(r),r=window.setTimeout(o,350)}),i==null||i.addEventListener("input",()=>{r!==null&&clearTimeout(r),r=window.setTimeout(o,350)}),t==null||t.addEventListener("change",()=>{r!==null&&clearTimeout(r),o()}),i==null||i.addEventListener("change",()=>{r!==null&&clearTimeout(r),o()}),t==null||t.addEventListener("keydown",E=>{E.key==="Enter"&&(r!==null&&clearTimeout(r),o(),ve(s))}),i==null||i.addEventListener("keydown",E=>{E.key==="Enter"&&(r!==null&&clearTimeout(r),o(),ve(s))}),(T=s.querySelector("#spice-time-input"))==null||T.addEventListener("focus",()=>{Te(s)});const c=s.querySelector(".spice-header"),l=s.querySelector(".spice-body");c.addEventListener("click",()=>{const E=l.style.display==="none";l.style.display=E?"":"none",c.querySelector(".spice-collapse-icon").textContent=E?"▼":"▶"});const d=s.querySelector("#spice-time-input");return d.value="2026-10-16T12:00:00Z",Gt(s).then(()=>{Et(Ze.lat,Ze.lon,Ze.label,"2026-10-16T12:00:00Z")}),s}function Xe(a){if(!Y)return;const e=Y.querySelector("#spice-time-input");if(e)try{const s=new Date(e.value);if(!isNaN(s.getTime())){const t=new Date(s.getTime()+a*3600*1e3);e.value=t.toISOString().slice(0,19)+"Z",ve(Y)}}catch{}}function Ji(){return`
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
             value="${Ze.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Ze.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Ze.label}</div>
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
`}async function Gt(a,e=!1){const s=a.querySelector("#spice-status-dot"),t=a.querySelector("#spice-status-text"),i=a.querySelector("#spice-fetch-btn"),n=a.querySelector("#spice-retry-btn");e&&(t.textContent="Connecting to SPICE backend…",s.className="spice-status-dot");try{const r=await Yt(),o=r.status==="ok";return s.className="spice-status-dot "+(o?"dot-ok":"dot-warn"),t.textContent=o?`SPICE Online · ${r.reference_frame}`:`Backend Degraded: ${r.error??"Kernel warning"}`,i.disabled=!o,n&&(n.style.display=o?"none":"inline-block"),o}catch{return s.className="spice-status-dot dot-err",t.textContent="Backend Offline (port 8000)",i.disabled=!0,n&&(n.style.display="inline-block"),!1}}let nt=null;async function ve(a){if(bt&&nt){try{await nt}catch{}if(bt)return!1}bt=!0;const e=ot,s=a.querySelector("#spice-loading"),t=a.querySelector("#spice-error-box"),i=a.querySelector("#spice-results");return s.style.display="flex",t.style.display="none",nt=(async()=>{var n;try{const r=a.querySelector("#spice-time-input"),o=a.querySelector("#spice-lat"),c=a.querySelector("#spice-lon"),l=r.value.trim(),d=Pt(o.value,c.value);if(!d.valid)throw new Error(d.error||"Invalid coordinates.");const u=await zs({utc_time:l,latitude_deg:d.lat,longitude_deg:d.lon,elevation_m:0});let h=null;try{h=await Hs({latitude_deg:d.lat,longitude_deg:d.lon,elevation_m:0,instrument_height_m:2,sun_azimuth_deg:u.sun.azimuth_deg,sun_elevation_deg:u.sun.elevation_deg,sun_distance_km:u.sun.distance_km,earth_azimuth_deg:u.earth.azimuth_deg,earth_elevation_deg:u.earth.elevation_deg,earth_distance_km:u.earth.distance_km})}catch{h=null}Qi(a,u,h),ea(u),i.style.display="block",wt=0;const g=a.querySelector("#spice-site-note"),v=(g==null?void 0:g.textContent)||`Custom Lunar Target · ${V(d.lat,d.lon)}`;return e||(n=q==null?void 0:q.onSiteCalculate)==null||n.call(q,d.lat,d.lon,v),!0}catch(r){const o=r instanceof Error?r.message:String(r);return t.textContent=`Error: ${o}`,t.style.display="block",await Gt(a),Le&&(wt++,wt>=2&&Te(a,"Auto-Track Paused: Network/SPICE error")),!1}finally{s.style.display="none",bt=!1,nt=null}})(),await nt}function Qi(a,e,s){const t=m=>m.toFixed(1),i=m=>m>1e6?`${(m/1495978707e-1).toFixed(4)} AU (${(m/1e6).toFixed(2)}M km)`:`${m.toLocaleString(void 0,{maximumFractionDigits:0})} km`,n=Be(e.site.longitude_deg,e.site.latitude_deg);ae("res-sun-dist",i(e.sun.distance_km)),ae("res-sun-az",`${t(e.sun.azimuth_deg)}°`);const r=e.sun.elevation_deg;ks("res-sun-geom-el",`${r>=0?"+":""}${t(r)}°`,r>=0?"spice-val-positive":"spice-val-negative");const o=document.getElementById("res-sun-obs-status"),c=document.getElementById("res-sun-terrain-el"),l=document.getElementById("res-sun-dem-note");if(s&&s.sun){const m=s.sun;if(m.terrain_horizon_elevation_deg!==null?ae("res-sun-terrain-el",`${t(m.terrain_horizon_elevation_deg)}°`):ae("res-sun-terrain-el","N/A (Outside DEM)"),o)switch(m.visibility_status){case"no_obstruction_detected_within_coverage":o.textContent="No obstruction detected within coverage",o.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":o.textContent="Blocked by local terrain (Shadow)",o.className="spice-pill pill-err";break;case"blocked_by_lunar_body":o.textContent="Below geometric horizon (Lunar Body)",o.className="spice-pill pill-err";break;case"near_horizon_grazing":o.textContent="Near-horizon grazing light",o.className="spice-pill pill-warn";break;default:o.textContent="Unknown or insufficient terrain coverage",o.className="spice-pill pill-warn"}}else c&&(c.textContent=n?"Calculation unavailable":"Unevaluable (Outside DEM)"),o&&(r<0?(o.textContent="Below geometric horizon",o.className="spice-pill pill-err"):n?(o.textContent="Above geometric horizon (DEM Ray uncalculated)",o.className="spice-pill pill-warn"):(o.textContent="Unknown or insufficient terrain coverage",o.className="spice-pill pill-neutral"));l&&(l.textContent=n?"DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).":"DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only."),ae("res-earth-dist",`${e.earth.distance_km.toLocaleString(void 0,{maximumFractionDigits:0})} km`),ae("res-earth-az",`${t(e.earth.azimuth_deg)}°`);const d=e.earth.elevation_deg;ks("res-earth-geom-el",`${d>=0?"+":""}${t(d)}°`,d>=0?"spice-val-positive":"spice-val-negative");const u=document.getElementById("res-earth-obs-status"),h=document.getElementById("res-earth-terrain-el"),g=document.getElementById("res-earth-los-status");if(s&&s.earth){const m=s.earth;if(m.terrain_horizon_elevation_deg!==null?ae("res-earth-terrain-el",`${t(m.terrain_horizon_elevation_deg)}°`):ae("res-earth-terrain-el","N/A (Outside DEM)"),u)switch(m.visibility_status){case"no_obstruction_detected_within_coverage":u.textContent="No obstruction detected within coverage",u.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":u.textContent="Blocked by local terrain",u.className="spice-pill pill-err";break;case"blocked_by_lunar_body":u.textContent="Below geometric horizon (Lunar Body)",u.className="spice-pill pill-err";break;default:u.textContent="Unknown or insufficient terrain coverage",u.className="spice-pill pill-warn"}if(g){const f=(m.visibility_status==="no_obstruction_detected_within_coverage"||m.visibility_status==="near_horizon_grazing")&&d>0;g.textContent=f?`Potential Line-of-Sight Active (${t(m.angular_clearance_deg??d)}° clearance)`:"Direct Line-of-Sight Obstructed",g.className=`spice-los-badge ${f?"los-active":"los-blocked"}`}}else if(h&&(h.textContent=n?"Calculation unavailable":"Unevaluable (Outside DEM)"),u&&(d<0?(u.textContent="Below geometric horizon",u.className="spice-pill pill-err"):(u.textContent="Above geometric horizon",u.className="spice-pill pill-ok")),g){const m=d>0;g.textContent=m?`Potential Geometric LOS Active (+${t(d)}°)`:"Direct Line-of-Sight Occluded",g.className=`spice-los-badge ${m?"los-active":"los-blocked"}`}ae("res-frame",e.reference_frame),ae("res-aberration",e.aberration_correction),ae("res-et-seconds",`${e.ephemeris_time_s.toFixed(3)} s`),ae("res-sun-vec",e.sun.direction_unit.map(m=>m.toFixed(4)).join(", ")),ae("res-earth-vec",e.earth.direction_unit.map(m=>m.toFixed(4)).join(", "));const v=a.querySelector("#spice-scene-note");v.style.display=dt?"block":"none"}function ea(a){if(!dt)return;const[e,s,t]=Bt(a.sun.direction_unit),i=8;dt.sunLight.position.set(e*i,s*i,t*i);const[n,r,o]=Bt(a.earth.direction_unit);dt.earthshineLight.position.set(-n*i,-r*i,-o*i)}function ta(a){Le=!Le,Le?sa(a):js(a)}function sa(a){Le=!0,wt=0,Xt(a),Ke!==null&&clearInterval(Ke),Ts(a),Ke=setInterval(()=>{Le&&Ts(a)},2e3)}function Ts(a){const e=a.querySelector("#spice-time-input");if(e){if(ct==="realtime")e.value=new Date().toISOString().slice(0,19)+"Z";else if(ct==="step_1h"){Xe(1);return}else if(ct==="step_24h"){Xe(24);return}ve(a)}}function js(a){Le=!1,Ke!==null&&(clearInterval(Ke),Ke=null),Xt(a)}function Te(a,e){if(!Le)return;js(a);const s=a.querySelector("#autotrack-status-text");s&&(s.textContent=e||"Standby (User edit paused track)")}function Xt(a){const e=a.querySelector("#spice-auto-btn"),s=a.querySelector("#autotrack-dot"),t=a.querySelector("#autotrack-status-text");if(Le){e.classList.add("active"),e.textContent="Auto-Track: ACTIVE ●",s.className="autotrack-dot dot-active";const i={step_1h:"Advancing (+1h / 2s)",step_24h:"Advancing (+24h / 2s)",realtime:"Tracking Real-Time UTC"};t.textContent=i[ct]||"Active"}else e.classList.remove("active"),e.textContent="Auto-Track: OFF",s.className="autotrack-dot",t.textContent="Standby (Epoch Static)"}function ae(a,e){const s=document.getElementById(a);s&&(s.textContent=e)}function ks(a,e,s){const t=document.getElementById(a);t&&(t.textContent=e,t.className=`sm-value ${s}`)}const te=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM (NASA LOLA Site 01)",coverageType:"High-Resolution Regional DEM"},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians. Geodetic reference benchmark.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry",isGeodeticDatum:!0},{id:"shackleton-rim",name:"Shackleton Rim",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering PSR with high water-ice deposition probability.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"malapert",name:"Malapert Massif",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km massif providing extended solar visibility and DTE comms.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"haworth-rim",name:"Haworth Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with volatile concentrations.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"de-gerlache-rim",name:"de Gerlache Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim offering favorable sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"nobile-rim-1",name:"Nobile Rim",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"}],Ce=1,pe={POLE_RING:2282478,POLE_CROSS:6809849,POLE_DOT:16777215,SITE01_MAIN:16096779,GRID_PRIME:3900150,GRID_SEC:1981023,DEM_BOX:3718648,SEC:{"shackleton-rim":3718648,malapert:3462041,"haworth-rim":10980346,"de-gerlache-rim":6333946,"nobile-rim-1":16020150}};class ia{constructor(e){b(this,"group");b(this,"interactiveMarkers",[]);b(this,"siteMarkerGroups",new Map);b(this,"raycaster",new As);b(this,"mouse",new j);b(this,"onSelectSiteCallback");b(this,"disposables",[]);this.group=new Re,this.group.name="SouthPoleOverlay",this._buildPolarGrid(e),this._buildDEMFootprint(e),this._buildSouthPoleMarker(e),this._buildCandidateSites(e)}setOnSelectSite(e){this.onSelectSiteCallback=e}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(e){this.siteMarkerGroups.forEach((s,t)=>{const i=t===e,n=s.getObjectByName("Ring");if(n){n.scale.setScalar(i?1.25:1);const r=n.material;r&&"opacity"in r&&(r.opacity=i?1:xs(t))}["Dot","Cx0","Cx1","Cx2","Cx3","Bk0","Bk1","Bk2","Bk3","Stem","Cap"].forEach(r=>{const o=s.getObjectByName(r);if(!o)return;const c=o.material;c&&"opacity"in c&&(c.opacity=i?1:xs(t,r))})})}_buildPolarGrid(e){const s=new Re;s.name="PolarGrid";const t=e*1.0012;[[-80,1982639,.35,240],[-85,1920728,.28,180],[-88,1981023,.2,120]].forEach(([i,n,r,o])=>{const c=[];for(let u=0;u<=o;u++)c.push(Ne(i,u/o*360,t));const l=new ee().setFromPoints(c),d=new ne({color:n,transparent:!0,opacity:r,blending:Ae});s.add(new oe(l,d)),this.disposables.push(l,d)}),[[0,pe.GRID_PRIME,.45],[90,pe.GRID_SEC,.2],[180,pe.GRID_SEC,.2],[270,pe.GRID_SEC,.2]].forEach(([i,n,r])=>{const o=[];for(let d=0;d<=36;d++)o.push(Ne(-80-10*(d/36),i,t));const c=new ee().setFromPoints(o),l=new ne({color:n,transparent:!0,opacity:r,blending:Ae});s.add(new oe(c,l)),this.disposables.push(c,l)}),this.group.add(s)}_buildDEMFootprint(e){const{minX:s,maxX:t,minY:i,maxY:n}=I,r=e*1.002,o=16,c=[];for(let h=0;h<=o;h++)c.push({x:s+(t-s)*(h/o),y:n});for(let h=0;h<=o;h++)c.push({x:t,y:n+(i-n)*(h/o)});for(let h=0;h<=o;h++)c.push({x:t+(s-t)*(h/o),y:i});for(let h=0;h<=o;h++)c.push({x:s,y:i+(n-i)*(h/o)});const l=c.map(h=>{const{lonDeg:g,latDeg:v}=Vt(h.x,h.y);return Ne(v,g,r)}),d=new ee().setFromPoints(l),u=new ne({color:pe.DEM_BOX,transparent:!0,opacity:.45});this.group.add(new oe(d,u)),this.disposables.push(d,u)}_buildSouthPoleMarker(e){const s=new Re;s.name="TrueSouthPoleMarker",s.position.set(0,-e*1.0025,0);const t=.013*Ce,i=new xe(t,t*1.3,64);i.rotateX(Math.PI/2);const n=new B({color:pe.POLE_RING,side:be,transparent:!0,opacity:.95,blending:Ae}),r=new z(i,n);r.name="Ring",s.add(r),this.disposables.push(i,n);const o=new xe(t*1.8,t*1.95,64);o.rotateX(Math.PI/2);const c=new B({color:pe.POLE_RING,side:be,transparent:!0,opacity:.4,blending:Ae});s.add(new z(o,c)),this.disposables.push(o,c);const l=t*.45,d=t*2.6;[[-1,0],[1,0],[0,-1],[0,1]].forEach(([M,_],T)=>{const E=new ee().setFromPoints([new S(M*l,0,_*l),new S(M*d,0,_*d)]),k=new ne({color:pe.POLE_CROSS,transparent:!0,opacity:.75}),O=new oe(E,k);O.name=`Cx${T}`,s.add(O),this.disposables.push(E,k)});const u=new ke(.003*Ce,12,12),h=new B({color:pe.POLE_DOT,transparent:!0,opacity:1}),g=new z(u,h);g.name="Dot",s.add(g),this.disposables.push(u,h);const v=new ke(.022,8,8),m=new B({visible:!1}),f=new z(v,m);f.userData={site:te.find(M=>M.id==="south-pole")},s.add(f),this.interactiveMarkers.push(f),this.disposables.push(v,m),this.siteMarkerGroups.set("south-pole",s),this.group.add(s)}_buildCandidateSites(e){te.forEach(s=>{if(s.id==="south-pole")return;const t=s.id==="site-01",i=t?pe.SITE01_MAIN:pe.SEC[s.id]??9741240,n=new Re;n.name=`SiteMarker_${s.id}`;const r=Ne(s.lat,s.lon,e*1.0025),o=r.clone().normalize();n.position.copy(r),n.quaternion.setFromUnitVectors(new S(0,1,0),o),t?this._buildPrimaryMarker(n,i):this._buildSecondaryMarker(n,i);const c=new ke(.022,8,8),l=new B({visible:!1}),d=new z(c,l);d.position.y=.02,d.userData={site:s},n.add(d),this.interactiveMarkers.push(d),this.disposables.push(c,l),this.siteMarkerGroups.set(s.id,n),this.group.add(n)})}_buildPrimaryMarker(e,s){const t=.018*Ce,i=[new S(0,0,-t),new S(t,0,0),new S(0,0,t),new S(-t,0,0),new S(0,0,-t)],n=new ee().setFromPoints(i),r=new ne({color:s,transparent:!0,opacity:.95}),o=new oe(n,r);o.name="Ring",e.add(o),this.disposables.push(n,r);const c=[new S(0,0,-t*.55),new S(t*.55,0,0),new S(0,0,t*.55),new S(-t*.55,0,0),new S(0,0,-t*.55)],l=new ee().setFromPoints(c),d=new ne({color:s,transparent:!0,opacity:.55});e.add(new oe(l,d)),this.disposables.push(l,d);const u=t*1.9,h=t*.55;[[0,-u,h],[0,u,h],[-u,0,h],[u,0,h]].forEach((D,A)=>{const L=[];A===0?(L.push(new S(-h*.5,0,-u+h)),L.push(new S(-h*.5,0,-u)),L.push(new S(h*.5,0,-u)),L.push(new S(h*.5,0,-u+h))):A===1?(L.push(new S(-h*.5,0,u-h)),L.push(new S(-h*.5,0,u)),L.push(new S(h*.5,0,u)),L.push(new S(h*.5,0,u-h))):A===2?(L.push(new S(-u+h,0,-h*.5)),L.push(new S(-u,0,-h*.5)),L.push(new S(-u,0,h*.5)),L.push(new S(-u+h,0,h*.5))):(L.push(new S(u-h,0,-h*.5)),L.push(new S(u,0,-h*.5)),L.push(new S(u,0,h*.5)),L.push(new S(u-h,0,h*.5)));const X=new ee().setFromPoints(L),W=new ne({color:s,transparent:!0,opacity:.8}),G=new oe(X,W);G.name=`Bk${A}`,e.add(G),this.disposables.push(X,W)});const g=new ke(.0045*Ce,12,12),v=new B({color:16569165,transparent:!0,opacity:1}),m=new z(g,v);m.name="Dot",e.add(m),this.disposables.push(g,v);const f=.085*Ce,M=new ee().setFromPoints([new S(0,0,0),new S(0,f,0)]),_=new ne({color:s,transparent:!0,opacity:.7,blending:Ae}),T=new oe(M,_);T.name="Stem",e.add(T),this.disposables.push(M,_);const E=new ke(.0055*Ce,10,10),k=new B({color:s,transparent:!0,opacity:.9}),O=new z(E,k);O.position.y=f,O.name="Cap",e.add(O),this.disposables.push(E,k)}_buildSecondaryMarker(e,s){const t=.009*Ce,i=new xe(t,t*1.45,36);i.rotateX(Math.PI/2);const n=new B({color:s,side:be,transparent:!0,opacity:.75}),r=new z(i,n);r.name="Ring",e.add(r),this.disposables.push(i,n);const o=new ke(.0025*Ce,10,10),c=new B({color:s,transparent:!0,opacity:.9}),l=new z(o,c);l.name="Dot",e.add(l),this.disposables.push(o,c);const d=.028*Ce,u=new ee().setFromPoints([new S(0,0,0),new S(0,d,0)]),h=new ne({color:s,transparent:!0,opacity:.55}),g=new oe(u,h);g.name="Stem",e.add(g),this.disposables.push(u,h)}update(e){}handleClick(e,s){var i;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,s);const t=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(t.length>0){let n=null,r=1/0;for(const o of t){const c=o.object.userData.site;if(!c)continue;const l=this.siteMarkerGroups.get(c.id),d=l?l.position:o.object.position,u=o.point.distanceTo(d);u<r&&(r=u,n=c)}if(n)return this.highlightSite(n.id),(i=this.onSelectSiteCallback)==null||i.call(this,n),n}return null}dispose(){this.disposables.forEach(e=>{try{e.dispose()}catch{}}),this.disposables=[]}}function xs(a,e="Ring"){return a==="south-pole"?e==="Stem"?0:.8:a==="site-01"?e==="Stem"||e==="Cap"?.55:.75:e==="Stem"?.4:.6}class aa{constructor(){b(this,"container");b(this,"canvas");b(this,"ctx");b(this,"tooltipEl");b(this,"isVisible",!1);b(this,"selectedSiteId","site-01");b(this,"hoveredSite",null);b(this,"customSelection",null);b(this,"onSelectCallback");b(this,"onApplyAndCalculateCallback");b(this,"onRecenterCallback");b(this,"MAX_EXTENT_M",36e4);b(this,"mapWidth",480);b(this,"mapHeight",480);b(this,"centerX",240);b(this,"centerY",240);b(this,"scalePxPerM",240/33e4);b(this,"terrainImage",null);b(this,"isTerrainImageLoaded",!1);b(this,"site01DetailImage",null);b(this,"isSite01ImageLoaded",!1);this.container=document.createElement("div"),this.container.id="south-pole-explorer-panel",this.container.className="south-pole-explorer hidden",this.container.innerHTML=this.buildHTML(),document.body.appendChild(this.container),this.canvas=this.container.querySelector("#polar-map-canvas"),this.ctx=this.canvas.getContext("2d"),this.tooltipEl=this.container.querySelector("#polar-map-tooltip"),this.resizeCanvas(),this.loadBackdrop(),this.attachEvents()}setOnSelect(e){this.onSelectCallback=e}setOnApplyAndCalculate(e){this.onApplyAndCalculateCallback=e}setOnRecenter(e){this.onRecenterCallback=e}open(){this.isVisible=!0,this.container.classList.remove("hidden"),this.resizeCanvas(),this.draw()}close(){this.isVisible=!1,this.container.classList.add("hidden")}toggle(){return this.isVisible?this.close():this.open(),this.isVisible}getIsOpen(){return this.isVisible}setSelectedSite(e,s,t){e&&te.some(i=>i.id===e)?(this.selectedSiteId=e,this.customSelection=null):s!==void 0&&t!==void 0&&(this.selectedSiteId="custom",this.customSelection={lat:s,lon:t,elevM:0,isInsideDEM:Be(t,s)}),this.isVisible&&this.draw()}resizeCanvas(){const e=Math.min(520,Math.max(380,window.innerWidth>900?460:360));this.mapWidth=e,this.mapHeight=e,this.canvas.width=e*window.devicePixelRatio,this.canvas.height=e*window.devicePixelRatio,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.ctx.setTransform(1,0,0,1,0,0),this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.centerX=e/2,this.centerY=e/2,this.scalePxPerM=e/2/this.MAX_EXTENT_M}loadBackdrop(){const e=new Image;e.crossOrigin="anonymous",e.src="/generated/south_pole_polar_relief.png",e.onload=()=>{this.terrainImage=e,this.isTerrainImageLoaded=!0,this.isVisible&&this.draw()};const s=new Image;s.crossOrigin="anonymous",s.src="/generated/site01_elev_norm.png",s.onload=()=>{this.site01DetailImage=s,this.isSite01ImageLoaded=!0,this.isVisible&&this.draw()}}buildHTML(){return`
<div class="spe-header">
  <div class="spe-title-row">
    <span class="spe-dot"></span>
    <span class="spe-title">SOUTH POLE EXPLORER</span>
    <span class="spe-badge">USGS POLAR STEREO · 80°S–90°S</span>
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
`}attachEvents(){var t;(t=this.container.querySelector("#spe-close-btn"))==null||t.addEventListener("click",()=>this.close()),this.canvas.addEventListener("mousemove",i=>this.handleMouseMove(i)),this.canvas.addEventListener("mouseleave",()=>{this.hoveredSite=null,this.tooltipEl.classList.add("hidden"),this.draw()}),this.canvas.addEventListener("click",i=>this.handleClick(i));const e=this.container.querySelector("#spe-btn-apply");e==null||e.addEventListener("click",async()=>{if(!e||e.disabled)return;const i=this.getCurrentSiteData(),n=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spe-spinner"></span> Computing SPICE…';try{let r=!0;if(this.onApplyAndCalculateCallback?r=await this.onApplyAndCalculateCallback(i):this.onSelectCallback&&this.onSelectCallback(i),r!==!1)e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success");else try{const o=await Yt();o&&o.status==="ok"?(e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success")):(e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error"))}catch{e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error")}setTimeout(()=>{e.disabled=!1,e.innerHTML=n,e.classList.remove("spe-btn-success","spe-btn-warn")},2500)}catch(r){const o=r instanceof Error?r.message:String(r);e.innerHTML="⚠ Calculation Failed",e.classList.add("spe-btn-error"),console.error("[SPE] Apply failed:",o),setTimeout(()=>{e.disabled=!1,e.innerHTML=n,e.classList.remove("spe-btn-error")},3e3)}});const s=this.container.querySelector("#spe-btn-recenter");s==null||s.addEventListener("click",()=>{const i=this.getCurrentSiteData();this.onRecenterCallback&&this.onRecenterCallback({lat:i.latitudeDeg,lon:i.longitudeDeg});const n=s.textContent;s.textContent="✓ 3D Centered",setTimeout(()=>{s.textContent=n},1500)}),window.addEventListener("resize",()=>{this.isVisible&&(this.resizeCanvas(),this.draw())}),window.addEventListener("keydown",i=>{i.key==="Escape"&&this.isVisible&&this.close()})}getCurrentSiteData(){if(this.selectedSiteId==="custom"&&this.customSelection)return{name:"Custom Selected Location",designation:V(this.customSelection.lat,this.customSelection.lon),latitudeDeg:this.customSelection.lat,longitudeDeg:this.customSelection.lon,elevationM:this.customSelection.elevM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:this.customSelection.isInsideDEM,demDatasetName:this.customSelection.isInsideDEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"};const e=te.find(s=>s.id===this.selectedSiteId)||te[0];return{name:e.name,designation:e.designation,latitudeDeg:e.lat,longitudeDeg:e.lon,elevationM:e.elevationM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:!!e.isInsideSite01DEM,demDatasetName:e.isInsideSite01DEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"}}projectMetersToCanvas(e,s){return{cx:this.centerX+e*this.scalePxPerM,cy:this.centerY-s*this.scalePxPerM}}unprojectCanvasToMeters(e,s){return{x:(e-this.centerX)/this.scalePxPerM,y:(this.centerY-s)/this.scalePxPerM}}draw(){const e=this.ctx,s=this.mapWidth,t=this.mapHeight;e.clearRect(0,0,s,t),e.fillStyle="#040711",e.fillRect(0,0,s,t),this.drawTerrainRelief(e),this.drawSite01DEMBoundary(e),this.drawPolarGrid(e),this.drawEphemerisVectors(e),this.drawScaleAndOrientation(e),this.drawTrueSouthPole(e),this.drawCandidateSites(e),this.customSelection&&this.drawCustomSelectionMarker(e),this.updateInfoCard()}drawTerrainRelief(e){if(this.isTerrainImageLoaded&&this.terrainImage){e.save();const t=33e4*this.scalePxPerM,i=this.centerX-t,n=this.centerY-t,r=t*2;e.drawImage(this.terrainImage,i,n,r,r),e.restore()}else{const s=e.createRadialGradient(this.centerX,this.centerY,10,this.centerX,this.centerY,this.mapWidth/2);s.addColorStop(0,"#151d2c"),s.addColorStop(.5,"#0f1624"),s.addColorStop(1,"#060a12"),e.fillStyle=s,e.fillRect(0,0,this.mapWidth,this.mapHeight)}}drawSite01DEMBoundary(e){const s=this.projectMetersToCanvas(I.minX,I.maxY),t=this.projectMetersToCanvas(I.maxX,I.maxY),i=this.projectMetersToCanvas(I.maxX,I.minY),n=this.projectMetersToCanvas(I.minX,I.minY),r=t.cx-s.cx,o=n.cy-s.cy;e.save(),this.isSite01ImageLoaded&&this.site01DetailImage&&(e.save(),e.globalAlpha=.85,e.drawImage(this.site01DetailImage,s.cx,s.cy,r,o),e.restore()),e.beginPath(),e.moveTo(s.cx,s.cy),e.lineTo(t.cx,t.cy),e.lineTo(i.cx,i.cy),e.lineTo(n.cx,n.cy),e.closePath(),e.fillStyle="rgba(56, 189, 248, 0.12)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=1.4,e.setLineDash([4,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 DEM [5 m/px]",s.cx+3,s.cy-4),e.restore()}drawPolarGrid(e){[{lat:-80,label:"LAT 80.00°S (OUTER PERIMETER)",color:"rgba(56, 189, 248, 0.40)",dash:[]},{lat:-85,label:"LAT 85.00°S (TRAVERSE RANGE)",color:"rgba(56, 189, 248, 0.32)",dash:[6,4]},{lat:-88,label:"LAT 88.00°S (ARTEMIS CORRIDOR)",color:"rgba(56, 189, 248, 0.32)",dash:[3,3]}].forEach(({lat:n,label:r,color:o,dash:c})=>{const{y:l}=Oe(0,n),d=Math.abs(l)*this.scalePxPerM;e.beginPath(),e.arc(this.centerX,this.centerY,d,0,2*Math.PI),e.strokeStyle=o,e.lineWidth=1,e.setLineDash(c),e.stroke(),e.setLineDash([]);const u=-Math.PI*.64,h=this.centerX+Math.cos(u)*d,g=this.centerY+Math.sin(u)*d;e.save(),e.font='bold 7.5px "JetBrains Mono", monospace';const v=e.measureText(r).width;e.fillStyle="rgba(6, 11, 22, 0.90)",e.strokeStyle="rgba(56, 189, 248, 0.40)",e.lineWidth=1,e.beginPath(),e.roundRect(h-v/2-5,g-7,v+10,14,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(r,h,g),e.restore()});const t=this.mapWidth/2-8;[{angleRad:-Math.PI/2,label:"0° PRIME · TO EARTH ↑",align:"center",isTopHeader:!0},{angleRad:0,label:"90°E · EAST LIMB →",align:"right",isTopHeader:!1},{angleRad:Math.PI/2,label:"180° · FAR SIDE ↓",align:"center",isTopHeader:!1},{angleRad:Math.PI,label:"← 270°E · WEST LIMB",align:"left",isTopHeader:!1}].forEach(n=>{const r=this.centerX+Math.cos(n.angleRad)*t,o=this.centerY+Math.sin(n.angleRad)*t;e.beginPath(),e.moveTo(this.centerX,this.centerY),e.lineTo(r,o),e.strokeStyle="rgba(148, 163, 184, 0.20)",e.lineWidth=1,e.stroke(),e.save(),e.font='bold 8px "JetBrains Mono", monospace';const c=e.measureText(n.label).width;if(n.isTopHeader){const l=this.centerX,d=14;e.fillStyle="rgba(6, 12, 24, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.50)",e.lineWidth=1,e.beginPath(),e.roundRect(l-c/2-6,d-8,c+12,16,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(n.label,l,d)}else{const d=this.centerX+Math.cos(n.angleRad)*(t-12),u=this.centerY+Math.sin(n.angleRad)*(t-12);e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle="rgba(148, 163, 184, 0.35)",e.lineWidth=1,e.beginPath(),e.roundRect(d-c/2-5,u-7,c+10,14,3),e.fill(),e.stroke(),e.fillStyle="#cbd5e1",e.textAlign="center",e.textBaseline="middle",e.fillText(n.label,d,u)}e.restore()})}drawEphemerisVectors(e){const s=-Math.PI*.58,t=this.mapWidth*.4,i=this.centerX-10,n=this.centerY+20,r=i+Math.cos(s)*t,o=n+Math.sin(s)*t;e.save(),e.strokeStyle="rgba(245, 158, 11, 0.75)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,n),e.lineTo(r,o),e.stroke(),e.setLineDash([]);const c=7,l=Math.PI/7;e.fillStyle="#f59e0b",e.beginPath(),e.moveTo(r,o),e.lineTo(r-c*Math.cos(s-l),o-c*Math.sin(s-l)),e.lineTo(r-c*Math.cos(s+l),o-c*Math.sin(s+l)),e.closePath(),e.fill();const d=i+Math.cos(s)*(t*.52),u=n+Math.sin(s)*(t*.52),h="SOLAR INCIDENCE 1.1° EL ↗";e.font='bold 7.5px "JetBrains Mono", monospace';const g=e.measureText(h).width;e.fillStyle="rgba(18, 12, 4, 0.94)",e.strokeStyle="rgba(245, 158, 11, 0.65)",e.lineWidth=1,e.beginPath(),e.roundRect(d-g/2-5,u-7,g+10,14,3),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.textAlign="center",e.textBaseline="middle",e.fillText(h,d,u);const v=Math.PI*.72,m=this.mapWidth*.36,f=i+Math.cos(v)*m,M=n+Math.sin(v)*m;e.strokeStyle="rgba(56, 189, 248, 0.70)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,n),e.lineTo(f,M),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(f,M),e.lineTo(f-c*Math.cos(v-l),M-c*Math.sin(v-l)),e.lineTo(f-c*Math.cos(v+l),M-c*Math.sin(v+l)),e.closePath(),e.fill();const _=i+Math.cos(v)*(m*.55),T=n+Math.sin(v)*(m*.55),E="EARTH LOS (OCCULTED -6.3°) ✓";e.font='bold 7.5px "JetBrains Mono", monospace';const k=e.measureText(E).width;e.fillStyle="rgba(4, 14, 26, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.55)",e.lineWidth=1,e.beginPath(),e.roundRect(_-k/2-5,T-7,k+10,14,3),e.fill(),e.stroke(),e.fillStyle="#7dd3fc",e.textAlign="center",e.textBaseline="middle",e.fillText(E,_,T),e.restore()}drawScaleAndOrientation(e){const t=1e5*this.scalePxPerM,i=22,n=this.mapHeight-22;e.strokeStyle="#94a3b8",e.lineWidth=1.5,e.beginPath(),e.moveTo(i,n),e.lineTo(i+t,n),e.moveTo(i,n-4),e.lineTo(i,n+4),e.moveTo(i+t/2,n-2),e.lineTo(i+t/2,n+2),e.moveTo(i+t,n-4),e.lineTo(i+t,n+4),e.stroke(),e.fillStyle="#94a3b8",e.font='8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("0",i-2,n-6),e.textAlign="center",e.fillText("50 km",i+t/2,n-6),e.textAlign="right",e.fillText("100 km",i+t,n-6);const r=this.mapWidth-32,o=32;e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(r,o,13,0,2*Math.PI),e.stroke(),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(r,o-11),e.lineTo(r-4,o+2),e.lineTo(r+4,o+2),e.closePath(),e.fill(),e.fillStyle="#cbd5e1",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("N (0°)",r,o+11)}drawTrueSouthPole(e){var u;const{cx:s,cy:t}=this.projectMetersToCanvas(0,0),i=this.selectedSiteId==="south-pole",n=((u=this.hoveredSite)==null?void 0:u.id)==="south-pole";e.save(),e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.60)",e.lineWidth=i?1.5:1;const r=i?10:7;e.beginPath(),e.moveTo(s-r,t),e.lineTo(s+r,t),e.moveTo(s,t-r),e.lineTo(s,t+r),e.stroke(),e.strokeStyle=i?"#22d3ee":n?"#67e8f9":"rgba(34, 211, 238, 0.85)",e.lineWidth=i?2:1.3,e.beginPath(),e.arc(s,t,i?6.5:4.5,0,2*Math.PI),e.stroke(),i&&(e.strokeStyle="rgba(34, 211, 238, 0.40)",e.lineWidth=1,e.beginPath(),e.arc(s,t,10.5,0,2*Math.PI),e.stroke()),e.fillStyle="#ffffff",e.beginPath(),e.arc(s,t,i?2.2:1.6,0,2*Math.PI),e.fill();const o=i?"● 90.0°S True Pole (-0.25km)":"90°S True Pole";e.font=i?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const c=e.measureText(o).width,l=s-c-14,d=t-10;e.strokeStyle=i?"rgba(34, 211, 238, 0.65)":"rgba(34, 211, 238, 0.25)",e.lineWidth=1,e.beginPath(),e.moveTo(s-5,t-3),e.lineTo(l+c+4,d+6),e.stroke(),e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.40)",e.lineWidth=i?1.4:1,e.beginPath(),e.roundRect(l,d,c+8,13,2),e.fill(),e.stroke(),e.fillStyle=i?"#67e8f9":"#a5f3fc",e.textAlign="left",e.textBaseline="middle",e.fillText(o,l+4,d+6.5),e.restore()}drawCandidateSites(e){te.filter(t=>t.id!=="south-pole").forEach(t=>{var T;const{x:i,y:n}=Oe(t.lon,t.lat),{cx:r,cy:o}=this.projectMetersToCanvas(i,n),c=t.id===this.selectedSiteId,l=((T=this.hoveredSite)==null?void 0:T.id)===t.id,d=t.id==="site-01";if(e.save(),d)e.save(),e.translate(r,o),e.rotate(Math.PI/4),c&&(e.strokeStyle="rgba(245, 158, 11, 0.45)",e.lineWidth=1,e.strokeRect(-9,-9,18,18)),e.strokeStyle=c?"#f59e0b":l?"#fcd34d":"rgba(245, 158, 11, 0.85)",e.lineWidth=c?1.8:1.3,e.strokeRect(-4.5,-4.5,9,9),e.restore(),e.fillStyle=c?"#fcd34d":"#f59e0b",e.beginPath(),e.arc(r,o,c?2.2:1.6,0,2*Math.PI),e.fill();else{const E=l?"#67e8f9":t.id==="malapert"?"#34d399":t.id==="shackleton-rim"?"#38bdf8":"#94a3b8",k=c?"#38bdf8":E;c&&(e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(r,o,9.5,0,2*Math.PI),e.stroke()),e.strokeStyle=c?"#38bdf8":k,e.lineWidth=c?1.8:1.2,e.beginPath(),e.arc(r,o,c?5.5:3.8,0,2*Math.PI),e.stroke(),e.fillStyle=c?"#ffffff":k,e.beginPath(),e.arc(r,o,c?2:1.5,0,2*Math.PI),e.fill()}const u=(t.elevationM/1e3).toFixed(1),h=t.elevationM>=0?"+":"",g=c?`● ${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${h}${u}km)`:`${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${h}${u}km)`;e.font=c?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const v=e.measureText(g).width;let m=0,f=0;switch(t.id){case"shackleton-rim":m=r+12,f=o+12;break;case"malapert":m=r+10,f=o-8;break;case"nobile-rim-1":m=r+10,f=o+8;break;case"haworth-rim":m=r-v-14,f=o-8;break;case"de-gerlache-rim":m=r-v-14,f=o+6;break;case"site-01":m=r-v-14,f=o+16;break;default:m=r>=this.centerX?r+10:r-v-14,f=o>=this.centerY?o+8:o-8;break}e.strokeStyle=c?d?"rgba(245, 158, 11, 0.70)":"rgba(56, 189, 248, 0.70)":"rgba(148, 163, 184, 0.25)",e.lineWidth=1,e.beginPath();const M=m>r?m:m+v+8,_=f+6.5;e.moveTo(r,o),e.lineTo(M,_),e.stroke(),e.fillStyle="rgba(6, 12, 22, 0.92)",e.strokeStyle=c?d?"#f59e0b":"#38bdf8":l?"rgba(103, 232, 249, 0.60)":"rgba(148, 163, 184, 0.28)",e.lineWidth=c?1.4:1,e.beginPath(),e.roundRect(m,f,v+8,13,2),e.fill(),e.stroke(),e.fillStyle=c?d?"#fef08a":"#ffffff":l?"#e2e8f0":"#cbd5e1",e.textAlign="left",e.textBaseline="middle",e.fillText(g,m+4,f+6.5),e.restore()})}drawCustomSelectionMarker(e){if(!this.customSelection)return;const{x:s,y:t}=Oe(this.customSelection.lon,this.customSelection.lat),{cx:i,cy:n}=this.projectMetersToCanvas(s,t);e.save(),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.beginPath(),e.arc(i,n,6,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(i-9,n),e.lineTo(i+9,n),e.moveTo(i,n-9),e.lineTo(i,n+9),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i,n,2,0,2*Math.PI),e.fill();const r=`● Custom Target: ${Math.abs(this.customSelection.lat).toFixed(2)}°S, ${this.customSelection.lon.toFixed(1)}°E`;e.font='bold 7.5px "JetBrains Mono", monospace';const o=e.measureText(r).width,c=i>=this.centerX?i+12:i-o-14,l=n-6;e.strokeStyle="rgba(245, 158, 11, 0.70)",e.lineWidth=1,e.beginPath(),e.moveTo(i,n),e.lineTo(c>i?c:c+o+8,l+6.5),e.stroke(),e.fillStyle="rgba(8, 14, 26, 0.95)",e.strokeStyle="#f59e0b",e.lineWidth=1.4,e.beginPath(),e.roundRect(c,l,o+8,13,2),e.fill(),e.stroke(),e.fillStyle="#fef08a",e.textAlign="left",e.textBaseline="middle",e.fillText(r,c+4,l+6.5),e.restore()}handleMouseMove(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;let n=null,r=14;for(const o of te){const{x:c,y:l}=Oe(o.lon,o.lat),{cx:d,cy:u}=this.projectMetersToCanvas(c,l),h=Math.hypot(t-d,i-u);h<r&&(r=h,n=o)}n?(this.hoveredSite=n,this.canvas.style.cursor="pointer",this.showTooltip(n,e.clientX,e.clientY),this.draw()):(this.hoveredSite=null,this.canvas.style.cursor="crosshair",this.tooltipEl.classList.add("hidden"),this.draw())}showTooltip(e,s,t){const i=e.id==="site-01",n=e.id==="south-pole",r=i?"#f59e0b":n?"#22d3ee":"#38bdf8";this.tooltipEl.innerHTML=`
      <span class="spe-tt-dot" style="background:${r};box-shadow:0 0 6px ${r};"></span>
      <span class="spe-tt-name">${e.name}</span>
      <span class="spe-tt-lat">· ${Math.abs(e.lat).toFixed(1)}°S</span>
    `;const o=Math.min(s+14,window.innerWidth-180),c=Math.max(10,Math.min(t-20,window.innerHeight-50));this.tooltipEl.style.left=`${o}px`,this.tooltipEl.style.top=`${c}px`,this.tooltipEl.classList.remove("hidden")}handleClick(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;this.tooltipEl.classList.add("hidden");let n=null,r=14;for(const g of te){const{x:v,y:m}=Oe(g.lon,g.lat),{cx:f,cy:M}=this.projectMetersToCanvas(v,m),_=Math.hypot(t-f,i-M);_<r&&(r=_,n=g)}if(n){this.selectedSiteId=n.id,this.customSelection=null,this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData());return}const{x:o,y:c}=this.unprojectCanvasToMeters(t,i);if(Math.hypot(o,c)>this.MAX_EXTENT_M)return;const{lonDeg:d,latDeg:u}=Vt(o,c),h=Be(d,u);this.selectedSiteId="custom",this.customSelection={lat:Number(u.toFixed(3)),lon:Number(d.toFixed(2)),elevM:0,isInsideDEM:h},this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData())}updateInfoCard(){if(!this.container.querySelector("#spe-info-card"))return;let s="Artemis Site 01",t="Shackleton–de Gerlache Connecting Ridge",i=-89.463,n=222.51,r=1100,o="High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",c=!0,l="CANDIDATE SITE";if(this.selectedSiteId==="custom"&&this.customSelection)s="Custom Selected Location",t="User Chosen Lunar Site",i=this.customSelection.lat,n=this.customSelection.lon,r=this.customSelection.elevM,c=this.customSelection.isInsideDEM,l="CUSTOM LOCATION",o=c?"Location lies within the validated 5 m/px high-resolution Site 01 DEM.":"Location lies outside the 5 m/px DEM footprint. Global LOLA ~60 m/px altimetry will be used for geometric ephemerides.";else{const u=te.find(h=>h.id===this.selectedSiteId)||te[0];s=u.name,t=u.designation,i=u.lat,n=u.lon,r=u.elevationM,o=u.description,c=!!u.isInsideSite01DEM,l=u.id==="south-pole"?"GEODETIC DATUM":"VERIFIED CANDIDATE"}const d=pt(i);this.setText("#spe-site-type",l),this.setText("#spe-site-cov",c?"5 m/px High-Resolution DEM":"Global LOLA (~60 m/px)"),this.setText("#spe-site-name",s),this.setText("#spe-site-desig",t),this.setText("#spe-cell-lat",`${i>=0?"+":""}${i.toFixed(3)}° S`),this.setText("#spe-cell-lon",`${n.toFixed(2)}° E`),this.setText("#spe-cell-elev",`${r>=0?"+":""}${r.toLocaleString()} m`),this.setText("#spe-cell-dist",`${d.toFixed(1)} km`),this.setText("#spe-site-desc",o)}setText(e,s){const t=this.container.querySelector(e);t&&(t.textContent=s)}}class Ws{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(e,s){s&&(this.selectedFormat=s),this.mode="mission",this.missionContext=e,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(e,s){s&&(this.selectedFormat=s),this.mode="comparison",this.comparisonContext=e,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(e="mission"){this.isOpen?this.close():e==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var i,n,r,o,c,l,d,u;const e=this.mode==="mission",s=e?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",t=e?`${((i=this.missionContext)==null?void 0:i.scenarioName)??"Mission"} · ${((n=this.missionContext)==null?void 0:n.siteName)??"Selected Site"} (${(o=(r=this.missionContext)==null?void 0:r.latitudeDeg)==null?void 0:o.toFixed(3)}°N, ${(l=(c=this.missionContext)==null?void 0:c.longitudeDeg)==null?void 0:l.toFixed(3)}°E)`:`${((d=this.comparisonContext)==null?void 0:d.reportTitle)??"Candidate Comparison"} · ${((u=this.comparisonContext)==null?void 0:u.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
    <div class="mission-modal-backdrop" id="export-backdrop"></div>
    <div class="mission-modal-dialog export-dialog">
      <!-- Header -->
      <div class="mission-modal-header export-dialog-header">
        <div class="mission-header-info">
          <div class="export-kicker">LUNAOPS SCIENTIFIC REPRODUCIBILITY &amp; DATA EXPORT</div>
          <h2>📤 ${s}</h2>
          <p class="export-subtitle">${t}</p>
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
                ${e?"Multi-page document containing executive metrics, reference frame definitions, illumination & visibility intervals, solar elevation chart, terrain slope profile, and SPICE provenance.":"Comprehensive comparative report with side-by-side metric tables, multi-criteria ranking results, constraint fulfillment breakdown, and synchronized visibility timelines."}
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
                ${e?"Standardized columnar time-series with explicit units in headers: utc_iso, sun_elevation_deg, sun_azimuth_deg, sun_visibility, earth_elevation_deg, earth_azimuth_deg, direct_to_earth_visibility.":"Comparison summary matrix with scenario parameters, illumination percentages, Earth LOS durations, max continuous darkness, slope statistics, and MCDA scores."}
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
      </div>`;if(this.statusMessage){const e=this.statusMessage.type==="error"?"status-error":"status-success",s=this.statusMessage.type==="error"?"❌":"✅";return`
      <div class="export-status-bar ${e}">
        <span>${s}</span>
        <span>${this.statusMessage.text}</span>
      </div>`}return""}wireEvents(){var s,t,i,n;(s=this.container.querySelector("#btn-close-export"))==null||s.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#btn-cancel-export"))==null||t.addEventListener("click",()=>this.close()),(i=this.container.querySelector("#export-backdrop"))==null||i.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(r=>{r.addEventListener("click",()=>{if(this.isGenerating)return;const o=r.getAttribute("data-format")||"pdf";this.selectedFormat=o,this.render()})}),(n=this.container.querySelector("#btn-generate-export"))==null||n.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(e){console.error("[LUNAOPS] Export failed:",e),this.statusMessage={type:"error",text:e.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var o;if(!this.missionContext)throw new Error("Missing mission scenario context.");const e=this.missionContext,s={scenario_name:e.scenarioName||"Artemis Candidate Mission",notes:e.notes||"",site_name:e.siteName||"South Pole Site",latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:e.startUtc,end_utc:e.endUtc,step_minutes:e.stepMinutes,timeline_result:e.timelineResponse||null,horizon_result:e.horizonProfile||null},t=`${Ie}/api/export/mission?format=${this.selectedFormat}`,i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok){let c=`HTTP ${i.status}`;try{const l=await i.json();c=((o=l.detail)==null?void 0:o.message)||JSON.stringify(l.detail||l)}catch{c=await i.text()}throw new Error(`Export failed: ${c}`)}const n=(e.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),r=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const c=await i.blob();this.triggerDownload(c,`lunaops_${n}_report_${r}.pdf`)}else if(this.selectedFormat==="csv"){const c=await i.text(),l=new Blob([c],{type:"text/csv;charset=utf-8;"});this.triggerDownload(l,`lunaops_${n}_timeseries_${r}.csv`)}else{const c=await i.json(),l=new Blob([JSON.stringify(c,null,2)],{type:"application/json"});this.triggerDownload(l,`lunaops_${n}_manifest_${r}.json`)}}async exportComparison(){var o;if(!this.comparisonContext)throw new Error("Missing comparison context.");const e=this.comparisonContext;if(!e.scenarios||e.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const s=e.scenarios.map(c=>{let l=`${c.startDate}T${c.startTime}`;l.endsWith("Z")||(l+="Z");let d=`${c.endDate}T${c.endTime}`;return d.endsWith("Z")||(d+="Z"),{id:c.id,name:c.name,latitude_deg:c.latitudeDeg,longitude_deg:c.longitudeDeg,elevation_m:c.elevationM,instrument_height_m:c.instrumentHeightM,start_utc:l,end_utc:d,step_minutes:c.stepMinutes}}),t={report_title:e.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:s,constraints:e.constraints||null,ranking_weights:e.rankingWeights||null,comparison_result:e.comparisonResult||null},i=`${Ie}/api/export/comparison?format=${this.selectedFormat}`,n=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok){let c=`HTTP ${n.status}`;try{const l=await n.json();c=((o=l.detail)==null?void 0:o.message)||JSON.stringify(l.detail||l)}catch{c=await n.text()}throw new Error(`Comparison export failed: ${c}`)}const r=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const c=await n.blob();this.triggerDownload(c,`lunaops_comparison_report_${r}.pdf`)}else if(this.selectedFormat==="csv"){const c=await n.text(),l=new Blob([c],{type:"text/csv;charset=utf-8;"});this.triggerDownload(l,`lunaops_comparison_matrix_${r}.csv`)}else{const c=await n.json(),l=new Blob([JSON.stringify(c,null,2)],{type:"application/json"});this.triggerDownload(l,`lunaops_comparison_manifest_${r}.json`)}}triggerDownload(e,s){const t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}class na{constructor(){b(this,"metadata",null);b(this,"elevCanvas",null);b(this,"slopeCanvas",null);b(this,"toterrCanvas",null);b(this,"elevCtx",null);b(this,"slopeCtx",null);b(this,"toterrCtx",null);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const e=await fetch("/generated/site01_metadata.json");if(!e.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await e.json();const[s,t,i]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(s),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(t),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(i),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(e){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",e)}})(),this.loadPromise)}loadImage(e){return new Promise((s,t)=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>s(i),i.onerror=n=>t(n),i.src=e})}createCanvasFromImage(e){const s=document.createElement("canvas");s.width=e.width,s.height=e.height;const t=s.getContext("2d",{willReadFrequently:!0});return t&&t.drawImage(e,0,0),s}getMetadata(){return this.metadata}sample(e,s){var c,l;const{x:t,y:i}=Oe(e,s),{px512:n,py512:r,isInside:o}=Yi(t,i);if(!o||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:o,px:n,py:r,xM:t,yM:i};try{const d=this.elevCtx.getImageData(n,r,1,1).data[0],u=((c=this.slopeCtx)==null?void 0:c.getImageData(n,r,1,1).data[0])??0,h=((l=this.toterrCtx)==null?void 0:l.getImageData(n,r,1,1).data[0])??0,g=this.metadata.elev_max_m-this.metadata.elev_min_m,v=this.metadata.elev_min_m+d/255*g,m=u/255*this.metadata.slope_max_deg,f=h/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(v*10)/10,slopeDeg:Math.round(m*10)/10,errorM:Math.round(f*100)/100,px:n,py:r,xM:t,yM:i}}catch{return{isInside:o,px:n,py:r,xM:t,yM:i}}}}const Ls=new na,U=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class oa{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"_isSyncingFromGlobe",!1);b(this,"onSiteChangedCallback");this.selectedSite={name:U[0].name,designation:U[0].designation,latitudeDeg:U[0].lat,longitudeDeg:U[0].lon,elevationM:U[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(e){this.onSiteChangedCallback=e}setOnTimelineScrubbed(e){this.onTimelineScrubbedCallback=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(e,s,t,i){this._isSyncingFromGlobe=!0;try{if(this.selectedSite.latitudeDeg=Math.round(e*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(s*1e3)/1e3,t&&!t.toLowerCase().includes("custom"))this.selectedSite.name=t,this.selectedSite.designation=i||"Landing Candidate";else{const n=te.find(r=>Math.abs(r.lat-e)<.08&&Math.abs(r.lon-s)<.08);n?(this.selectedSite.name=n.name,this.selectedSite.designation=n.designation):(this.selectedSite.name=t||"Custom Selected Location",this.selectedSite.designation=i||"User Chosen Site")}this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}finally{this._isSyncingFromGlobe=!1}}async init(){await Ls.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await Yt()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const e=this.selectedSite.latitudeDeg,s=this.selectedSite.longitudeDeg,t=Ls.sample(s,e);if(this.selectedSite.isInsideSite01DEM=t.isInside,t.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords={px:t.px,py:t.py,gridMax:512},this.selectedSite.polarStereoM={x:t.xM,y:t.yM},t.elevationM!==void 0&&(this.selectedSite.elevationM=t.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:i,y:n}=Oe(s,e);this.selectedSite.polarStereoM={x:i,y:n};const r=te.find(o=>Math.abs(o.lat-e)<.08&&Math.abs(o.lon-s)<.08);r&&(this.selectedSite.elevationM=r.elevationM)}!this._isSyncingFromGlobe&&this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const e=`${this.timeline.startDate}T${this.timeline.startTime}Z`,s=Date.parse(e);if(isNaN(s))return;this.timeline.isoUtcStart=new Date(s).toISOString().replace(".000Z","Z");const t=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,i=s+this.timeline.durationValue*t;this.timeline.isoUtcEnd=new Date(i).toISOString().replace(".000Z","Z");const n=new Date(s).getUTCFullYear(),r=new Date(i).getUTCFullYear();this.timeline.isWithinKernelCoverage=n>=1900&&n<=2050&&r>=1900&&r<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var r;const e=[];(r=this.spiceHealth)!=null&&r.initialized?e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const s=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;s>=-90&&s<=90&&t>=-180&&t<=360?e.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${V(s,t)} · Elevation: ${this.selectedSite.elevationM} m`}):e.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?e.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):e.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let i="READY",n="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return e.some(o=>o.status==="fail")?(i="ERROR",n="One or more required parameters failed validation. Correct items marked in red."):e.some(o=>o.status==="warn")&&(i="READY_WITH_LIMITATIONS",n="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:i,summary:n,checks:e}}toScenarioJSON(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:e,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();this.container.innerHTML=`
    <div class="mission-dialog">
      <div class="mission-header">
        <div class="mission-title-group">
          <div class="mission-kicker">NASA SPACE APPS 2026 · CLPS MISSION PLANNER</div>
          <h2 class="mission-title">New Mission Analysis Workspace</h2>
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
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(e){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(e);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(e);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.horizonVisibility,t=this.horizonProfile,i=c=>c==="no_obstruction_detected_within_coverage"?"✅":c==="near_horizon_grazing"?"⚠️":c==="blocked_by_local_terrain"?"🪨":c==="blocked_by_lunar_body"?"🌑":"❓",n=c=>c==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":c==="near_horizon_grazing"?"Near-Horizon Grazing":c==="blocked_by_local_terrain"?"Blocked by Terrain":c==="blocked_by_lunar_body"?"Occulted by Moon":c==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",r=c=>c==="no_obstruction_detected_within_coverage"?"#22c55e":c==="near_horizon_grazing"?"#f59e0b":c.startsWith("blocked")?"#ef4444":"#94a3b8",o=(c,l,d)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${r(d.visibility_status)}">
          <span class="geom-body-title">${l} ${c}</span>
          <span class="horizon-badge" style="background: ${r(d.visibility_status)}22; color: ${r(d.visibility_status)}; border: 1px solid ${r(d.visibility_status)}44">
            ${i(d.visibility_status)} ${n(d.visibility_status)}
          </span>
        </div>
        <div class="geom-values">
          <div class="geom-row"><span>Azimuth:</span> <strong>${d.azimuth_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Geometric Elevation:</span> <strong>${d.geometric_elevation_deg.toFixed(2)}°</strong></div>
          ${d.terrain_horizon_elevation_deg!==null?`
          <div class="geom-row"><span>Terrain Skyline:</span> <strong>${d.terrain_horizon_elevation_deg.toFixed(2)}°</strong></div>
          <div class="geom-row"><span>Angular Clearance:</span> <strong style="color:${(d.angular_clearance_deg??0)>0?"#22c55e":"#ef4444"}">${d.angular_clearance_deg!==null?(d.angular_clearance_deg>=0?"+":"")+d.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
          `:""}
          ${d.horizon_distance_m!==null?`<div class="geom-row"><span>Skyline Distance:</span> <strong>${(d.horizon_distance_m/1e3).toFixed(2)} km</strong></div>`:""}
        </div>
        <div class="vis-note">${d.note}</div>
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
        ${o("Sun","☀️",s.sun)}
        ${o("Earth","🌍",s.earth)}
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
            <h3>Detailed Local Terrain (Site 01)</h3>
            <div class="layer-toggle-group">
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="elev"?"active":""}" data-layer="elev">Elevation</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="slope"?"active":""}" data-layer="slope">Slope</button>
              <button class="btn-layer-toggle ${this.activeTerrainLayer==="toterr"?"active":""}" data-layer="toterr">Uncertainty</button>
            </div>
          </div>

          <div class="canvas-wrapper">
            ${t?`<canvas id="site01-terrain-canvas" width="512" height="512" class="terrain-canvas"></canvas>
                   <div class="canvas-overlay-crosshair-note">Click anywhere on terrain tile to target coordinates</div>`:`<div class="outside-terrain-placeholder">
                    <div class="placeholder-icon">🌐</div>
                    <h4>Outside High-Resolution Site 01 DEM Footprint</h4>
                    <p>Current coordinates (${V(e,s)}) fall outside the 16×16 km Site 01 tile.</p>
                    <p class="placeholder-hint">Global 16 px/° LOLA elevation remains active. Select Artemis Site 01 below or click the 3D Moon near Shackleton Ridge to enter 5 m/px coverage.</p>
                    <button id="btn-jump-site01" class="btn-preset-accent">🎯 Jump to Artemis Site 01</button>
                   </div>`}
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
            ${U.map(i=>`
              <div class="preset-item ${i.lat===e&&i.lon===s?"selected":""}" data-preset-id="${i.id}">
                <div class="preset-title-row">
                  <span class="preset-name">${i.name}</span>
                  <span class="preset-tag ${i.id==="site-01"?"tag-dem":"tag-global"}">
                    ${i.id==="site-01"?"5m DEM Active":"Global 16px/°"}
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
                <strong>${t?"Inside NASA LOLA Site 01 (5 m/px) Tile":"Outside High-Resolution Site 01 DEM"}</strong>
                <p>${t?"Rigorous polar stereographic transform active. Native raster bounds: L=-19 km, R=-3 km, B=-20 km, T=-4 km.":"Coordinates will use SPICE geometric ephemeris with NASA global 16 px/° LOLA elevation relief."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}renderTimelineTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.timelineResponse,t=s==null?void 0:s.summary,i=(s==null?void 0:s.samples)??[],n=i[this.scrubbedSampleIndex]??i[0],r=d=>{switch(d){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},o=d=>{switch(d){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},c=d=>{switch(d){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},l=d=>{switch(d){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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
              ${s.sun_windows.map(d=>`
                <div class="timeline-bar-seg" style="flex: ${d.duration_hours}; background: ${c(d.state)};" title="${d.state.replace(/_/g," ")}: ${d.duration_hours}h (${d.start_utc} → ${d.end_utc})"></div>
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
              ${s.earth_windows.map(d=>`
                <div class="timeline-bar-seg" style="flex: ${d.duration_hours}; background: ${l(d.state)};" title="${d.state.replace(/_/g," ")}: ${d.duration_hours}h (${d.start_utc} → ${d.end_utc})"></div>
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
          ${n?`
          <div id="scrubbed-conditions-panel" class="scrubbed-conditions-panel" style="margin-top:16px;">
            <div class="scrubbed-header">
              <div>
                <span class="scrubbed-time-title">Selected UTC Timestamp:</span>
                <strong id="scrubbed-time-val" class="code-pill" style="font-size:0.95rem; margin-left:8px;">${n.timestamp_utc}</strong>
              </div>
              <span class="badge-pill">Sample ${this.scrubbedSampleIndex+1} of ${i.length}</span>
            </div>

            <div class="scrubbed-grid">
              <div class="scrubbed-col">
                <div class="scrubbed-col-title">☀️ Sun Ephemeris &amp; Illumination</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${r(n.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${n.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${n.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${n.sun.terrain_horizon_elevation_deg!==null?n.sun.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(n.sun.angular_clearance_deg??0)>=0?"#22c55e":"#ef4444"}">${n.sun.angular_clearance_deg!==null?(n.sun.angular_clearance_deg>=0?"+":"")+n.sun.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${o(n.earth.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${n.earth.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${n.earth.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${n.earth.terrain_horizon_elevation_deg!==null?n.earth.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(n.earth.angular_clearance_deg??0)>=0?"#3b82f6":"#ef4444"}">${n.earth.angular_clearance_deg!==null?(n.earth.angular_clearance_deg>=0?"+":"")+n.earth.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
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
              ${s.sun_windows.map(d=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">☀️ Sun</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${d.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${r(d.state)}</td>
                </tr>
              `).join("")}
              ${s.earth_windows.map(d=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${d.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${o(d.state)}</td>
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
    `}openExportModal(e){this.exportPanel||(this.exportPanel=new Ws),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},e)}renderExportTab(){const e=this.timelineResponse!==null;return`
    <div class="tab-pane">
      <div class="panel-card">
        <div class="card-header">
          <h3>📤 Scientific Report Export &amp; Reproducibility</h3>
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
    `}renderLandingWindowsTab(){const e=this.landingWindowsResponse,s=(e==null?void 0:e.days)??[],t=e==null?void 0:e.scan_params,i=e==null?void 0:e.summary,n=l=>{try{return new Date(l+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return l}},r=(l,d)=>{switch(l){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${d})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${d})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${d})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${d})</span>`}},o=l=>{switch(l){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},c=s.filter(l=>this.landingWindowsFilter==="safe"?l.is_safe_for_landing:this.landingWindowsFilter==="excellent"?l.safety_rating==="excellent":!0);return`
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
          ${s.map(l=>`
            <div class="heatmap-ribbon-seg"
                 style="background: ${o(l.safety_rating)}; flex: 1;"
                 title="${l.date}: ${l.safety_rating.toUpperCase()} (Score: ${l.safety_score}) · Sun: ${l.sunlight.full_hours}h · Earth: ${l.earth_los.full_hours}h">
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
        ${c.map(l=>`
          <div class="window-day-card ${l.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${n(l.date)}</span>
                <span class="window-day-iso">${l.date}</span>
              </div>
              <div>
                ${r(l.safety_rating,l.safety_score)}
              </div>
            </div>

            <div class="window-safe-row">
              ${l.is_safe_for_landing?'<span class="safe-pill pass">✓ Safe for Landing</span>':'<span class="safe-pill fail">⚠️ Marginal Comms/Sun</span>'}
              <span class="window-score-num">Safety: <strong>${l.safety_score}</strong>/100</span>
            </div>

            <div class="score-bar-track">
              <div class="score-bar-fill ${l.safety_rating}" style="width: ${Math.min(100,Math.max(0,l.safety_score))}%;"></div>
            </div>

            <div class="window-day-metrics-grid">
              <div class="window-metric-col">
                <span class="window-metric-header">☀️ SUNLIGHT</span>
                <div class="window-metric-row"><span>Full Sun:</span> <strong>${l.sunlight.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Penumbral:</span> <strong>${l.sunlight.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Darkness:</span> <strong>${l.sunlight.darkness_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${l.sunlight.avg_elevation_deg>=0?"+":""}${l.sunlight.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
              <div class="window-metric-col">
                <span class="window-metric-header">🌍 EARTH LOS</span>
                <div class="window-metric-row"><span>Full LOS:</span> <strong>${l.earth_los.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Partial:</span> <strong>${l.earth_los.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Occulted:</span> <strong>${l.earth_los.occulted_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${l.earth_los.avg_elevation_deg>=0?"+":""}${l.earth_los.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
            </div>

            <div class="window-card-action">
              <button class="btn-secondary btn-apply-window-date" data-date="${l.date}">
                ⏱ Set as Mission Start Date
              </button>
            </div>
          </div>
        `).join("")}
      </div>
      `:""}
    </div>
    `}drawTerrainCanvas(){setTimeout(()=>{const e=document.getElementById("site01-terrain-canvas");if(!e)return;this.terrainCtx=e.getContext("2d");const s=new Image;s.crossOrigin="anonymous";const t=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";s.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(s,0,0,512,512),this.selectedSite.pixelCoords)){const{px:i,py:n}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(i-14,n),this.terrainCtx.lineTo(i+14,n),this.terrainCtx.moveTo(i,n-14),this.terrainCtx.lineTo(i,n+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(i,n,6,0,2*Math.PI),this.terrainCtx.stroke()}},s.src=t},50)}wireEvents(){var O,D,A,L,X,W,G,ie,we,ze,ce,je,tt,We;(O=this.container.querySelector("#btn-close-workspace"))==null||O.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(y=>{y.addEventListener("click",C=>{const P=C.currentTarget;this.currentTab=P.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(y=>{y.addEventListener("click",C=>{const R=C.currentTarget.dataset.presetId,Q=U.find(Pe=>Pe.id===R);Q&&(this.selectedSite.name=Q.name,this.selectedSite.designation=Q.designation,this.selectedSite.latitudeDeg=Q.lat,this.selectedSite.longitudeDeg=Q.lon,this.selectedSite.elevationM=Q.elev,this.updateSiteCoverageAndSample(),this.render())})}),(D=this.container.querySelector("#btn-jump-site01"))==null||D.addEventListener("click",()=>{const y=U[0];this.selectedSite.name=y.name,this.selectedSite.designation=y.designation,this.selectedSite.latitudeDeg=y.lat,this.selectedSite.longitudeDeg=y.lon,this.selectedSite.elevationM=y.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(y=>{y.addEventListener("click",C=>{const P=C.currentTarget;this.activeTerrainLayer=P.dataset.layer||"elev",this.render()})});const e=this.container.querySelector("#inp-lat"),s=this.container.querySelector("#inp-lon"),t=this.container.querySelector("#inp-elev"),i=()=>{if(!e||!s||!t)return;const y=parseFloat(e.value),C=parseFloat(s.value),P=parseFloat(t.value);!isNaN(y)&&!isNaN(C)&&(this.selectedSite.latitudeDeg=y,this.selectedSite.longitudeDeg=C,this.selectedSite.elevationM=isNaN(P)?0:P,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};e==null||e.addEventListener("change",i),s==null||s.addEventListener("change",i),t==null||t.addEventListener("change",i);const n=this.container.querySelector("#site01-terrain-canvas");n==null||n.addEventListener("click",y=>{const C=n.getBoundingClientRect(),P=y.clientX-C.left,R=y.clientY-C.top,Q=Math.round(P/C.width*512),Pe=Math.round(R/C.height*512),{lonDeg:Ot,latDeg:Rt}=Vi(Q,Pe);this.selectedSite.latitudeDeg=Math.round(Rt*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(Ot*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${Q}, ${Pe})`,this.updateSiteCoverageAndSample(),this.render()});const r=this.container.querySelector("#inp-start-date"),o=this.container.querySelector("#inp-start-time"),c=this.container.querySelector("#inp-duration-val"),l=this.container.querySelector("#inp-duration-unit"),d=this.container.querySelector("#inp-timestep"),u=()=>{r&&(this.timeline.startDate=r.value),o&&(this.timeline.startTime=o.value),c&&(this.timeline.durationValue=parseInt(c.value,10)||1),l&&(this.timeline.durationUnit=l.value),d&&(this.timeline.timeStepHours=parseFloat(d.value)||1),this.computeIsoTimestamps(),this.render()};r==null||r.addEventListener("change",u),o==null||o.addEventListener("change",u),c==null||c.addEventListener("change",u),l==null||l.addEventListener("change",u),d==null||d.addEventListener("change",u);const h=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const y=Math.round(this.timeline.timeStepHours*60),C=await ji({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:y,refinement_tolerance_sec:60});this.timelineResponse=C,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),C.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(C.samples[0])}catch(y){this.timelineLoading=!1,this.timelineError=y.message??String(y),this.render()}};(A=this.container.querySelector("#btn-calc-timeline"))==null||A.addEventListener("click",h);const g=this.container.querySelector("#inp-timeline-scrubber");g==null||g.addEventListener("input",()=>{var P;const y=parseInt(g.value,10);this.scrubbedSampleIndex=y;const C=(P=this.timelineResponse)==null?void 0:P.samples[y];C&&(this.updateScrubbedReadout(C),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(C))});const v=this.container.querySelector("#inp-scen-name"),m=this.container.querySelector("#inp-scen-notes");v==null||v.addEventListener("input",()=>{this.scenarioName=v.value}),m==null||m.addEventListener("input",()=>{this.scenarioNotes=m.value});const f=async()=>{try{const y=this.container.querySelector("#btn-eval-spice-tab"),C=this.container.querySelector("#btn-eval-spice-footer");y&&(y.disabled=!0,y.textContent="Calculating SPICE..."),C&&(C.disabled=!0,C.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const P=await zs({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=P,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(y){console.error("[MissionWorkspace] SPICE Calculation Error:",y),this.currentTab="readiness",this.render();const C=this.container.querySelector(".geometry-preview-area");C&&(C.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${y.message||y}</p>
            </div>
          `)}};(L=this.container.querySelector("#btn-eval-spice-tab"))==null||L.addEventListener("click",f),(X=this.container.querySelector("#btn-eval-spice-footer"))==null||X.addEventListener("click",f),(W=this.container.querySelector("#btn-eval-horizon"))==null||W.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const y=this.initialGeometry,[C,P]=await Promise.all([Gi({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),Hs({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:y.sun.azimuth_deg,sun_elevation_deg:y.sun.elevation_deg,sun_distance_km:y.sun.distance_km,earth_azimuth_deg:y.earth.azimuth_deg,earth_elevation_deg:y.earth.elevation_deg,earth_distance_km:y.earth.distance_km})]);this.horizonProfile=C,this.horizonVisibility=P,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(y){this.horizonLoading=!1,this.horizonError=y.message??String(y),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const M=()=>{const y=this.toScenarioJSON(),C=new Blob([JSON.stringify(y,null,2)],{type:"application/json"}),P=URL.createObjectURL(C),R=document.createElement("a");R.href=P,R.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,R.click(),URL.revokeObjectURL(P)};(G=this.container.querySelector("#btn-export-scenario"))==null||G.addEventListener("click",M),(ie=this.container.querySelector("#btn-open-export-panel-footer"))==null||ie.addEventListener("click",()=>this.openExportModal()),(we=this.container.querySelector("#btn-open-full-export-dialog"))==null||we.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(y=>{y.addEventListener("click",()=>{const C=y.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(C)})}),(ze=this.container.querySelector("#btn-export-scenario-summary"))==null||ze.addEventListener("click",M);const _=this.container.querySelector("#inp-windows-start-date"),T=this.container.querySelector("#inp-windows-end-date");_==null||_.addEventListener("change",()=>{_.value&&(this.landingWindowsStartDate=_.value)}),T==null||T.addEventListener("change",()=>{T.value&&(this.landingWindowsEndDate=T.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(y=>{y.addEventListener("click",C=>{const R=C.currentTarget.dataset.preset;if(R==="30d"){const Q=new Date(this.timeline.startDate+"T00:00:00Z"),Pe=new Date(Q.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=Q.toISOString().slice(0,10),this.landingWindowsEndDate=Pe.toISOString().slice(0,10)}else R==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):R==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(y=>{y.addEventListener("click",C=>{const R=C.currentTarget.dataset.filter;R&&(this.landingWindowsFilter=R,this.render())})});const E=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const y=await Us({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=y,this.landingWindowsLoading=!1,this.render()}catch(y){this.landingWindowsLoading=!1,this.landingWindowsError=y.message??String(y),this.render()}};(ce=this.container.querySelector("#btn-scan-landing-windows"))==null||ce.addEventListener("click",E),(je=this.container.querySelector("#btn-run-initial-scan"))==null||je.addEventListener("click",E);const k=y=>{this.timeline.startDate=y,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(tt=this.container.querySelector("#btn-apply-best-window"))==null||tt.addEventListener("click",y=>{const P=y.currentTarget.dataset.date;P&&k(P)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(y=>{y.addEventListener("click",C=>{const R=C.currentTarget.dataset.date;R&&k(R)})}),(We=this.container.querySelector("#btn-apply-3d-view"))==null||We.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const e=document.getElementById("horizon-polar-canvas");if(!e||!this.horizonProfile)return;const s=this.horizonProfile,t=e.getContext("2d");if(!t)return;const i=e.width,n=e.height,r=i/2,o=n/2,c=Math.min(i,n)/2-32;t.clearRect(0,0,i,n),t.fillStyle="#0a0f1e",t.fillRect(0,0,i,n);const l=Math.max(...s.profile.map(g=>g.horizon_elevation_deg),10);[0,l*.25,l*.5,l*.75,l].forEach(g=>{const v=c*(1-g/l);t.beginPath(),t.arc(r,o,Math.max(v,1),0,2*Math.PI),t.strokeStyle="rgba(148,163,184,0.15)",t.lineWidth=1,t.stroke(),g>0&&(t.fillStyle="rgba(148,163,184,0.5)",t.font="10px Inter, sans-serif",t.fillText(`${g.toFixed(1)}°`,r+4,o-v+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([g,v])=>{const m=(Number(v)-90)*Math.PI/180;t.beginPath(),t.moveTo(r,o),t.lineTo(r+c*Math.cos(m),o+c*Math.sin(m)),t.strokeStyle="rgba(148,163,184,0.2)",t.lineWidth=1,t.stroke(),t.fillStyle="#94a3b8",t.font="bold 11px Inter, sans-serif",t.fillText(String(g),r+(c+16)*Math.cos(m)-4,o+(c+16)*Math.sin(m)+4)}),t.beginPath(),s.profile.forEach((g,v)=>{const m=(g.azimuth_deg-90)*Math.PI/180,f=c*(1-Math.min(g.horizon_elevation_deg,l)/l),M=r+f*Math.cos(m),_=o+f*Math.sin(m);v===0?t.moveTo(M,_):t.lineTo(M,_)}),t.closePath(),t.fillStyle="rgba(56,189,248,0.15)",t.fill(),t.strokeStyle="#38bdf8",t.lineWidth=2,t.stroke();const h=this.horizonVisibility;if(h){const g=(v,m,f,M)=>{const _=(v-90)*Math.PI/180,T=c*(1-Math.max(0,Math.min(m,l))/l),E=r+T*Math.cos(_),k=o+T*Math.sin(_);t.beginPath(),t.arc(E,k,8,0,2*Math.PI),t.fillStyle=f,t.fill(),t.fillStyle="#fff",t.font="bold 10px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(M,E,k),t.textAlign="start",t.textBaseline="alphabetic"};g(h.sun.azimuth_deg,h.sun.geometric_elevation_deg,"#f59e0b","☀"),g(h.earth.azimuth_deg,h.earth.geometric_elevation_deg,"#3b82f6","🌍")}t.beginPath(),t.arc(r,o,4,0,2*Math.PI),t.fillStyle="#38bdf8",t.fill()}updateScrubbedReadout(e){var c,l;const s=this.container.querySelector("#scrubbed-time-val");s&&(s.textContent=e.timestamp_utc);const t=d=>{switch(d){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},i=d=>{switch(d){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},n=this.container.querySelector("#scrubbed-sun-state");n&&(n.innerHTML=t(e.sun.visibility_state));const r=this.container.querySelector("#scrubbed-earth-state");r&&(r.innerHTML=i(e.earth.visibility_state));const o=this.container.querySelector("#scrubbed-conditions-panel");if(o){const d=(c=o.querySelectorAll(".scrubbed-col")[0])==null?void 0:c.querySelectorAll(".scrubbed-val-row strong");if(d&&d.length>=4){d[0].textContent=`${e.sun.azimuth_deg.toFixed(2)}°`,d[1].textContent=`${e.sun.elevation_deg.toFixed(2)}°`,d[2].textContent=e.sun.terrain_horizon_elevation_deg!==null?`${e.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const h=e.sun.angular_clearance_deg;d[3].textContent=h!==null?`${h>=0?"+":""}${h.toFixed(2)}°`:"—",d[3].style.color=(h??0)>=0?"#22c55e":"#ef4444"}const u=(l=o.querySelectorAll(".scrubbed-col")[1])==null?void 0:l.querySelectorAll(".scrubbed-val-row strong");if(u&&u.length>=4){u[0].textContent=`${e.earth.azimuth_deg.toFixed(2)}°`,u[1].textContent=`${e.earth.elevation_deg.toFixed(2)}°`,u[2].textContent=e.earth.terrain_horizon_elevation_deg!==null?`${e.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const h=e.earth.angular_clearance_deg;u[3].textContent=h!==null?`${h>=0?"+":""}${h.toFixed(2)}°`:"—",u[3].style.color=(h??0)>=0?"#3b82f6":"#ef4444"}}}}class ra{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new Ws),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(e){this.onInspectSiteOnGlobe=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:U[0].lat,longitudeDeg:U[0].lon,elevationM:U[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:U[3].lat,longitudeDeg:U[3].lon,elevationM:U[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(e){var i,n,r,o;const s=U.find(c=>c.id===e)||U[0],t=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${t} · ${s.name}`,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elev,instrumentHeightM:2,startDate:((i=this.scenarios[0])==null?void 0:i.startDate)||"2026-10-16",startTime:((n=this.scenarios[0])==null?void 0:n.startTime)||"12:00:00",endDate:((r=this.scenarios[0])==null?void 0:r.endDate)||"2026-10-23",endTime:((o=this.scenarios[0])==null?void 0:o.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(e){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(s=>s.id!==e),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=this.scenarios.map(t=>({id:t.id,name:t.name,latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:`${t.startDate}T${t.startTime}Z`,end_utc:`${t.endDate}T${t.endTime}Z`,step_minutes:t.stepMinutes})),s=await Wi({scenarios:e,constraints:this.constraints});this.comparisonResult=s}catch(e){this.errorMessage=e.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
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
          ${U.map(i=>`<option value="${i.id}" ${i.name.includes(e.name.split("·")[0].trim())?"selected":""}>${i.name} (${i.lat}°S, ${i.lon}°E)</option>`).join("")}
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
              ${e.scenarios.map(s=>{const t=s.timeline_result.summary.sunlight,i=(t.full_sunlight_percent+t.partial_sunlight_percent).toFixed(1),n=(t.full_sunlight_hours+t.partial_sunlight_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${i}% <span class="unit">(${n} hrs)</span></div>
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
              ${e.scenarios.map(s=>{const t=s.timeline_result.summary.earth_los,i=(t.full_disc_los_percent+t.partial_disc_los_percent).toFixed(1),n=(t.full_disc_los_hours+t.partial_disc_los_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${i}% <span class="unit">(${n} hrs)</span></div>
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
                      ${t.items.map(n=>`
                        <div class="constraint-mini-row ${n.status}">
                          <span class="mini-status">${n.status==="met"?"✓":n.status==="unmet"?"✗":"❓"}</span>
                          <span>${n.label}: <strong>${n.actual}</strong> (${n.threshold})</span>
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
    `}drawSynchronizedTimelines(){const e=document.getElementById("synced-timeline-canvas");if(!e||!this.comparisonResult)return;const s=e.getContext("2d");if(!s)return;const t=e.width,i=e.height;s.clearRect(0,0,t,i);const n=this.comparisonResult.scenarios;if(n.length===0)return;const r=Math.floor((i-40)/n.length);s.fillStyle="#94a3b8",s.font="10px JetBrains Mono, monospace",s.fillText("MISSION TIMELINE EPOCHS",15,18),n.forEach((o,c)=>{const l=30+c*r,d=r-12;s.fillStyle="#e2e8f0",s.font="11px Inter, sans-serif",s.fillText(`${o.scenario_name}`,15,l-4),s.fillStyle="rgba(15, 23, 42, 0.6)",s.fillRect(15,l,t-30,d);const u=o.timeline_result.sun_windows,h=Date.parse(o.inputs.start_utc),v=Date.parse(o.inputs.end_utc)-h;v>0&&(u.forEach(f=>{const M=Date.parse(f.start_utc),_=Date.parse(f.end_utc),T=15+(M-h)/v*(t-30),E=15+(_-h)/v*(t-30),k=Math.max(1,E-T);f.state==="full_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.9)":f.state==="partial_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.5)":f.state==="total_darkness"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,l,k,d/2-1)}),o.timeline_result.earth_windows.forEach(f=>{const M=Date.parse(f.start_utc),_=Date.parse(f.end_utc),T=15+(M-h)/v*(t-30),E=15+(_-h)/v*(t-30),k=Math.max(1,E-T);f.state==="full_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.9)":f.state==="centre_only_los"||f.state==="partial_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.5)":f.state==="occulted"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,l+d/2+1,k,d/2-2)})),s.strokeStyle="rgba(148, 163, 184, 0.15)",s.strokeRect(15,l,t-30,d)})}wireEvents(){var e,s,t,i,n,r,o,c;(e=document.getElementById("btn-close-comparison"))==null||e.addEventListener("click",()=>{this.close()}),(s=document.getElementById("btn-add-candidate"))==null||s.addEventListener("click",()=>{this.addScenario()}),(t=document.getElementById("btn-sync-dates"))==null||t.addEventListener("click",()=>{if(this.scenarios.length>=2){const l=this.scenarios[0];for(let d=1;d<this.scenarios.length;d++)this.scenarios[d].startDate=l.startDate,this.scenarios[d].startTime=l.startTime,this.scenarios[d].endDate=l.endDate,this.scenarios[d].endTime=l.endTime;this.render()}}),(i=document.getElementById("btn-run-comparison"))==null||i.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(l=>{l.addEventListener("click",d=>{const u=d.currentTarget.getAttribute("data-id");u&&this.removeScenario(u)})}),this.container.querySelectorAll(".select-preset").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=u.getAttribute("data-id"),g=u.value,v=U.find(m=>m.id===g);if(h&&v){const m=this.scenarios.find(f=>f.id===h);m&&(m.name=v.name,m.latitudeDeg=v.lat,m.longitudeDeg=v.lon,m.elevationM=v.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(l=>{l.addEventListener("input",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.name=u.value)})}),this.container.querySelectorAll(".input-lat").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.latitudeDeg=parseFloat(u.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.longitudeDeg=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.elevationM=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.startDate=u.value)})}),this.container.querySelectorAll(".input-end-date").forEach(l=>{l.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));h&&(h.endDate=u.value)})}),(n=document.getElementById("constraint-min-sun"))==null||n.addEventListener("change",l=>{const d=l.currentTarget.value;this.constraints.min_sunlight_percent=d!==""?parseFloat(d):null}),(r=document.getElementById("constraint-min-earth"))==null||r.addEventListener("change",l=>{const d=l.currentTarget.value;this.constraints.min_earth_los_percent=d!==""?parseFloat(d):null}),(o=document.getElementById("constraint-max-slope"))==null||o.addEventListener("change",l=>{const d=l.currentTarget.value;this.constraints.max_slope_deg=d!==""?parseFloat(d):null}),(c=document.getElementById("constraint-max-dark"))==null||c.addEventListener("change",l=>{const d=l.currentTarget.value;this.constraints.max_continuous_darkness_hours=d!==""?parseFloat(d):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(l=>{l.addEventListener("click",d=>{const u=d.currentTarget.getAttribute("data-id"),h=this.scenarios.find(g=>g.id===u);h&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:h.name,lat:h.latitudeDeg,lon:h.longitudeDeg,elevationM:h.elevationM})})})}}const Fe=1.6,qs=1737.4,Kt=-8.9815,Ys=10.6855,la=Ys-Kt,Ds=512,da=132361;let fe=null,H,De=null,J=null,se=null,ue=null,N=null,Mt=null,_t=null,Z=null,F=null,rt=!1,St=.6,lt=!1,ge=!1,Ct=-89.463,Tt=222.51,Qe=null,Is=null,yt=null,jt=null,Wt=0,qt=0,Se=null,me=null;function kt(a,e,s=1.2){me={startPos:de.position.clone(),targetPos:a.clone(),startLook:re.target.clone(),targetLook:e.clone(),startTime:performance.now(),duration:s*1e3}}const et=document.createElement("canvas"),ca=document.getElementById("app");ca.appendChild(et);const he=new wi({canvas:et,antialias:!0,powerPreference:"high-performance"});he.setSize(window.innerWidth,window.innerHeight);he.setPixelRatio(Math.min(window.devicePixelRatio,2));he.outputColorSpace=Os;he.toneMapping=Ei;he.toneMappingExposure=.95;he.shadowMap.enabled=!1;const Ge=new Mi;Ge.background=new _i(da);const de=new Ci(36,window.innerWidth/window.innerHeight,.01,500);de.position.set(0,.2,4);const re=new Bi(de,he.domElement);re.enableDamping=!0;re.dampingFactor=.06;re.minDistance=1.75;re.maxDistance=12;re.enablePan=!1;re.rotateSpeed=.45;re.zoomSpeed=.7;let Zt=!1;re.addEventListener("start",()=>{Zt=!0});re.addEventListener("end",()=>{Zt=!1});const pa=new Ti(395539,.04);Ge.add(pa);const ht=new Rs(16775406,3.4);ht.position.set(5,1.2,3.2);Ge.add(ht);const Jt=new Rs(2241365,.035);Jt.position.set(-5,0,-3.2);Ge.add(Jt);const mt=new ki(he),ua=new xi(Ge,de);mt.addPass(ua);const Vs=new Li(new j(window.innerWidth,window.innerHeight),.08,.4,.92);mt.addPass(Vs);const ha={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
  `},ma=new Di(ha);mt.addPass(ma);function ga(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:e,rMin:s,rMax:t,size:i,opacity:n})=>{const r=new Float32Array(e*3);for(let l=0;l<e;l++){const d=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1),h=s+Math.random()*(t-s);r[l*3]=h*Math.sin(u)*Math.cos(d),r[l*3+1]=h*Math.sin(u)*Math.sin(d),r[l*3+2]=h*Math.cos(u)}const o=new ee;o.setAttribute("position",new Pi(r,3));const c=new $i({size:i,color:14215423,transparent:!0,opacity:n,sizeAttenuation:!0});Ge.add(new Ai(o,c))})}ga();const ut=document.createElement("div");ut.id="loading-overlay";ut.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(ut);function He(a,e){const s=document.getElementById("load-status");if(s&&(s.textContent=a),e!==void 0){const t=document.getElementById("progress-fill");t&&(t.style.width=`${Math.min(100,e)}%`)}}function va(){ut.style.opacity="0",setTimeout(()=>ut.remove(),700)}const ba=1.8;function fa(a,e){return new Ni({map:a,normalMap:e||void 0,normalScale:e?new j(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function Xs(a,e,s,t,i){const n=(a%1+1)%1*(s-1),r=It.clamp(1-e,0,1)*(t-1),o=Math.floor(n),c=(o+1)%s,l=Math.floor(r),d=Math.min(l+1,t-1),u=n-o,h=r-l,g=i[(l*s+o)*4]/255,v=i[(l*s+c)*4]/255,m=i[(d*s+o)*4]/255,f=i[(d*s+c)*4]/255,M=g*(1-u)+v*u,_=m*(1-u)+f*u,T=M*(1-h)+_*h;return Kt+T*la}function xt(a,e){if(jt&&Wt>0&&qt>0){const s=It.clamp((a+90)/180,0,1),i=((e%360+360)%360+180)%360/360;return Xs(i,s,Wt,qt,jt)}return 0}function Sa(a,e){const s=a.attributes.position,t=a.attributes.uv,i=s.count,n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0);const c=r.getImageData(0,0,n.width,n.height).data;jt=c,Wt=n.width,qt=n.height,Is=new Float32Array(s.array.length),Is.set(s.array),Qe=new Float32Array(i),yt=new Float32Array(s.array.length);const l=new S,d=new S,u=ba;for(let h=0;h<i;h++){l.fromBufferAttribute(s,h);const g=t.getX(h),v=t.getY(h),m=Xs(g,v,n.width,n.height,c);Qe[h]=m;const f=m/qs*Fe;d.copy(l).normalize();const M=l.clone().add(d.clone().multiplyScalar(f));yt[h*3]=M.x,yt[h*3+1]=M.y,yt[h*3+2]=M.z,l.add(d.multiplyScalar(f*u)),s.setXYZ(h,l.x,l.y,l.z)}s.needsUpdate=!0,a.computeVertexNormals(),a.computeBoundingSphere()}function ya(a){return a.colorSpace=Os,a.anisotropy=he.capabilities.getMaxAnisotropy(),a.minFilter=zi,a.magFilter=Hi,a.generateMipmaps=!0,a.wrapS=Ns,a.wrapT=Fs,a.needsUpdate=!0,a}const Ps=new Ii;async function wa(){const a=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,e=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:a,label:"NASA LROC 2K",is4K:!1}];let s=null,t="NASA LROC 2K",i=!1;for(const o of e)try{He(`Loading ${o.label}…`,25),s=await new Promise((c,l)=>{Ps.load(o.url,d=>c(d),void 0,d=>l(d))}),ya(s),t=o.label,i=o.is4K;break}catch{}if(!s)throw new Error("All color texture candidates failed to load.");He("Loading LOLA normal map…",50);let n=null;try{n=await new Promise((o,c)=>{Ps.load("/generated/ldem_normal_map_half.png",l=>{l.colorSpace=Ri,l.anisotropy=he.capabilities.getMaxAnisotropy(),l.wrapS=Ns,l.wrapT=Fs,o(l)},void 0,c)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}He("Loading LOLA DEM topography…",75);let r=null;try{r=await new Promise((o,c)=>{const l=new Image;l.crossOrigin="anonymous",l.onload=()=>o(l),l.onerror=c,l.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:s,colorLabel:t,is4K:i,normal:n,dispImg:r}}let Ks={is4K:!0};async function Ea(){const a=await wa();Ks={label:a.colorLabel,is4K:a.is4K};const e=document.getElementById("telem-color");e&&(e.textContent=a.is4K?"NASA LROC 4K":"NASA LROC 2K"),He("Generating lunar mesh…",85),await new Promise(i=>setTimeout(i,40));const s=new ke(Fe,Ds,Ds/2);a.dispImg&&Sa(s,a.dispImg),He("Configuring shaders…",95),await new Promise(i=>setTimeout(i,40));const t=fa(a.color,a.normal);fe=new z(s,t),fe.castShadow=!1,fe.receiveShadow=!1,H=new Re,H.rotation.x=It.degToRad(6.68),H.add(fe),De=new ia(Fe),De.setOnSelectSite(i=>{ye({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})}),H.add(De.group),Ma(),_a(),Ge.add(H),He("Ready",100),setTimeout(va,400)}function Ma(){Z=new Re,Z.name="HoverReticle",Z.visible=!1;const a=new xe(.012,.015,32);a.rotateX(Math.PI/2);const e=new B({color:3718648,side:be,transparent:!0,opacity:.8}),s=new z(a,e);Z.add(s);const t=new Fi(.003,16);t.rotateX(Math.PI/2);const i=new B({color:16777215,side:be});Z.add(new z(t,i)),H.add(Z)}function _a(){F=new Re,F.name="PendingSelectionMarker",F.visible=!1;const a=new xe(.018,.024,32);a.rotateX(Math.PI/2);const e=new B({color:16096779,side:be,transparent:!0,opacity:.95});F.add(new z(a,e));const s=new ee().setFromPoints([new S(0,0,0),new S(0,.06,0)]),t=new ne({color:16096779,transparent:!0,opacity:.85});F.add(new oe(s,t)),H.add(F)}Ea().catch(a=>{console.error("[LUNAOPS] Build error:",a),He("Failed to initialize — see console",0)});const Qt=document.createElement("div");Qt.id="ui-layer";Qt.innerHTML=`
<div class="hud-top">
  <!-- Brand Header -->
  <div class="brand">
    <div class="brand-header-row">
      <span class="brand-dot"></span>
      <h1 class="title">LUNAOPS</h1>
      <span class="geodetic-badge">IAU MOON_ME</span>
    </div>
    <p class="subtitle">NASA Space Apps 2026 · SELENE LABS · LUNAR SOUTH POLE MISSION PLANNER</p>
    
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
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Kt.toFixed(1)} to +${Ys.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${qs} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(Qt);Zi({sunLight:ht,earthshineLight:Jt},{onSiteInput:(a,e)=>{ss(a,e,void 0,!0)},onSiteCalculate:(a,e,s)=>{const t=document.getElementById("selection-confirm-toast");t&&(t.style.display="none"),F&&(F.visible=!1),Se=null;const i=Be(e,a),n=s.includes("·")?s.split("·")[0].trim():i?"Site 01 Target":"Custom Lunar Target";ye({name:n,designation:V(a,e),latitudeDeg:a,longitudeDeg:e,elevationM:Math.round(xt(a,e)*1e3),isInsideSite01DEM:i},!1,!1)},onPresetSelect:(a,e,s)=>{const t=document.getElementById("selection-confirm-toast");t&&(t.style.display="none"),F&&(F.visible=!1),Se=null;const i=Be(e,a),n=s.includes("·")?s.split("·")[0].trim():s;ye({name:n,designation:V(a,e),latitudeDeg:a,longitudeDeg:e,elevationM:Math.round(xt(a,e)*1e3),isInsideSite01DEM:i},!0,!1)}});J=new aa;J.setOnSelect(a=>{ye(a,!1,!1)});J.setOnApplyAndCalculate(async a=>{ye(a,!1,!1);try{return await Et(a.latitudeDeg,a.longitudeDeg,`${a.name} · ${a.designation}`)}catch{return!1}});J.setOnRecenter(a=>{es(a.lat,a.lon)});se=new oa;document.getElementById("btn-new-mission").addEventListener("click",()=>{se==null||se.toggle()});ue=new ra;document.getElementById("btn-compare-sites").addEventListener("click",()=>{ue==null||ue.toggle()});ue.setOnInspectSiteOnGlobe(a=>{ye({name:a.name,designation:"Candidate Site",latitudeDeg:a.lat,longitudeDeg:a.lon,elevationM:a.elevationM,isInsideSite01DEM:a.lat<=-89.4&&a.lat>=-89.55&&a.lon>=221&&a.lon<=224})});se.setOnSiteChanged(a=>{Zs(a,!1)});se.setOnTimelineScrubbed(a=>{const[e,s,t]=Bt(a.sun.direction_unit),i=8;ht.position.set(e*i,s*i,t*i);const n=document.getElementById("telem-sun-az");n&&(n.textContent=`${a.sun.azimuth_deg.toFixed(1)}° / ${a.sun.elevation_deg.toFixed(1)}°`);const r=document.getElementById("utc-clock");r&&(r.textContent=a.timestamp_utc),Ki(a.timestamp_utc)});function ye(a,e=!0,s=!0){Ct=a.latitudeDeg,Tt=a.longitudeDeg,Zs(a,s);const t=te.find(i=>Math.abs(i.lat-a.latitudeDeg)<.05&&Math.abs(i.lon-a.longitudeDeg)<.05);De&&De.highlightSite(t?t.id:null),J&&J.setSelectedSite(t?t.id:null,a.latitudeDeg,a.longitudeDeg),document.querySelectorAll(".cand-btn").forEach(i=>{i.classList.toggle("active",(t==null?void 0:t.id)===i.dataset.site)}),se&&se.setCoordinatesFromGlobe(a.latitudeDeg,a.longitudeDeg,a.name,a.designation),e&&H&&es(a.latitudeDeg,a.longitudeDeg)}function Zs(a,e=!0){if(!H)return;if(!N){N=new Re,N.name="TargetSiteMarker";const l=new xe(.04,.045,64);l.rotateX(Math.PI/2);const d=new B({color:3718648,side:be,transparent:!0,opacity:.28,blending:Ae});_t=new z(l,d),N.add(_t);const u=new xe(.028,.032,64,1,0,Math.PI*1.3);u.rotateX(Math.PI/2);const h=new B({color:8246268,side:be,transparent:!0,opacity:.7,blending:Ae});Mt=new z(u,h),N.add(Mt);const g=new xe(.019,.023,48);g.rotateX(Math.PI/2);const v=new B({color:3718648,side:be,transparent:!0,opacity:.95});N.add(new z(g,v));const m=new xe(.009,.012,32);m.rotateX(Math.PI/2);const f=new B({color:8246268,side:be,transparent:!0,opacity:.9});N.add(new z(m,f)),[[-1,0],[1,0],[0,-1],[0,1]].forEach(([X,W])=>{const G=[new S(X*.006,0,W*.006),new S(X*.016,0,W*.016)],ie=new ee().setFromPoints(G),we=new ne({color:3718648,transparent:!0,opacity:.9});N.add(new oe(ie,we))});const M=.03,_=.009;[[1,-1],[-1,-1],[1,1],[-1,1]].forEach(([X,W])=>{const G=X*M*.707,ie=W*M*.707,we=[new S(G,0,ie-W*_),new S(G,0,ie),new S(G-X*_,0,ie)],ze=new ee().setFromPoints(we),ce=new ne({color:3718648,transparent:!0,opacity:.85});N.add(new oe(ze,ce))});const T=new ke(.006,16,16),E=new B({color:16777215});N.add(new z(T,E));const k=new ee().setFromPoints([new S(0,0,0),new S(0,.11,0)]),O=new ne({color:3718648,transparent:!0,opacity:.85,blending:Ae});N.add(new oe(k,O));const D=new ke(.009,12,12),A=new B({color:3718648}),L=new z(D,A);L.position.y=.11,N.add(L),H.add(N)}const s=Ne(a.latitudeDeg,a.longitudeDeg,Fe*1.002);N.position.copy(s),N.visible=!ge;const t=s.clone().normalize();N.quaternion.setFromUnitVectors(new S(0,1,0),t);const i=document.getElementById("active-site-display");i&&(i.textContent=`${a.name} · ${a.designation}`);const n=document.getElementById("hud-3d-site-card");if(n){const l=a.name.includes("Site 01")||a.name.includes("Custom");n.className=l?"hud-3d-site-card card-amber":"hud-3d-site-card";const d=document.getElementById("hud-3d-card-title"),u=document.getElementById("hud-3d-card-desig"),h=document.getElementById("hud-3d-val-coords"),g=document.getElementById("hud-3d-val-elev"),v=document.getElementById("hud-3d-val-dist"),m=document.getElementById("hud-3d-val-cov"),f=document.getElementById("hud-3d-comm"),M=document.getElementById("hud-3d-illum");d&&(d.textContent=a.name.toUpperCase()),u&&(u.textContent=a.designation),h&&(h.textContent=V(a.latitudeDeg,a.longitudeDeg)),g&&(g.textContent=`${a.elevationM>=0?"+":""}${a.elevationM.toLocaleString()} m`),v&&(v.textContent=`${pt(a.latitudeDeg).toFixed(1)} km`),m&&(m.textContent=a.isInsideSite01DEM?"★ Validated 5 m/px DEM":"Global LOLA (~60 m/px)"),f&&(f.textContent=a.name.includes("Site 01")?"COMM: LOS 84%":"COMM: DTE VISIBLE"),M&&(M.textContent=a.name.includes("Site 01")?"ILLUM: 96%":"ILLUM: POLAR SUN")}const r=document.getElementById("readout-coords"),o=document.getElementById("readout-elev"),c=document.getElementById("readout-pole-dist");if(r&&(r.textContent=V(a.latitudeDeg,a.longitudeDeg)),o&&(o.textContent=`${a.elevationM>=0?"+":""}${(a.elevationM/1e3).toFixed(2)} km`),c){const l=pt(a.latitudeDeg);c.textContent=`${l.toFixed(1)} km to 90°S`}if(e)return Et(a.latitudeDeg,a.longitudeDeg,`${a.name} · ${a.designation}`)}function es(a,e){H.updateMatrixWorld(!0);const t=Ne(a,e,Fe).clone().applyMatrix4(H.matrixWorld),i=t.clone().normalize(),n=t.clone().add(i.clone().multiplyScalar(.85));kt(n,t,1.2)}function Js(){if(ge=!ge,document.getElementById("btn-south-pole").classList.toggle("active",ge),J&&(ge?J.open():J.close()),N&&(N.visible=!ge),ge){H.updateMatrixWorld(!0);const s=new S(0,-Fe,0).clone().applyMatrix4(H.matrixWorld),i=s.clone().normalize().clone().multiplyScalar(2.65);i.addScaledVector(new S(1,0,0),.15),i.addScaledVector(new S(0,0,1),.15),kt(i,s,1.3)}else kt(new S(0,.2,4),new S(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",Js);document.getElementById("btn-reset").addEventListener("click",()=>{var a;ge=!1,(a=document.getElementById("btn-south-pole"))==null||a.classList.remove("active"),J==null||J.close(),N&&(N.visible=!0),kt(new S(0,.2,4),new S(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{rt=!rt;const a=document.getElementById("btn-auto");a.textContent=rt?"⏸ Auto-Rotate":"▶ Auto-Rotate",a.classList.toggle("active",rt)});document.getElementById("btn-sun").addEventListener("click",()=>{lt=!lt;const a=document.getElementById("btn-sun");a.classList.toggle("active",lt),a.textContent=lt?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.site,s=te.find(t=>t.id===e);s&&ye({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})})});const ts=document.getElementById("coords-modal"),Je=document.getElementById("manual-lat"),$t=document.getElementById("manual-lon"),Ue=document.getElementById("coords-error-msg"),Ca=document.getElementById("coords-preview-line");function ss(a,e,s,t=!1){var d;if(s===void 0&&(s=xt(a,e)),Se={latDeg:a,lonDeg:e,elevKm:s},F){const u=Ne(a,e,Fe*1.002);F.position.copy(u);const h=u.clone().normalize();F.quaternion.setFromUnitVectors(new S(0,1,0),h),F.visible=!0}t&&H&&(ge&&a>-80&&(ge=!1,(d=document.getElementById("btn-south-pole"))==null||d.classList.remove("active"),J==null||J.close()),es(a,e));const i=document.getElementById("readout-coords");i&&(i.textContent=V(a,e));const n=document.getElementById("readout-elev");n&&(n.textContent=`${s>=0?"+":""}${s.toFixed(2)} km`);const r=document.getElementById("selection-confirm-toast"),o=document.getElementById("toast-coords-text"),c=document.getElementById("toast-elev-text");o.textContent=V(a,e);const l=pt(a);c.textContent=`Elevation: ${s>=0?"+":""}${s.toFixed(2)} km · Distance to 90°S: ${l.toFixed(1)} km`,r.style.display="block"}function Ta(){Je.value=Ct.toFixed(3),$t.value=Tt.toFixed(2),Ue.style.display="none",is(),document.getElementById("selection-confirm-toast").style.display="none",F&&(F.visible=!1),Se=null,ts.style.display="flex",setTimeout(()=>{Je.focus(),Je.select()},40)}function At(){ts.style.display="none",Ue.style.display="none"}function Qs(){const a=Pt(Je.value,$t.value);if(!a.valid){Ue.textContent=a.error||"Invalid coordinates.",Ue.style.display="block";return}At(),ss(a.lat,a.lon,void 0,!0)}document.getElementById("btn-manual-coords").addEventListener("click",Ta);document.getElementById("btn-close-coords-modal").addEventListener("click",At);document.getElementById("btn-cancel-manual-coords").addEventListener("click",At);document.getElementById("btn-apply-manual-coords").addEventListener("click",Qs);ts.addEventListener("keydown",a=>{a.key==="Escape"?(a.stopPropagation(),At()):a.key==="Enter"&&(a.preventDefault(),Qs())});function is(){const a=Pt(Je.value,$t.value);if(!a.valid)Ue.textContent=a.error||"Invalid coordinates.",Ue.style.display="block";else{Ue.style.display="none";const e=a.lat<=-80,s=pt(a.lat);Ca.innerHTML=`Format: <strong>${V(a.lat,a.lon)}</strong><br />Region: <strong>${e?"South Polar Region (80°S–90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${s.toFixed(1)} km</strong>`}}Je.addEventListener("input",is);$t.addEventListener("input",is);const Lt=new As,Dt=new j;let ei=new j,ti=0,as=!1,ns=!1;et.addEventListener("pointerdown",a=>{ei.set(a.clientX,a.clientY),ti=performance.now(),as=!1});et.addEventListener("pointermove",a=>{ei.distanceTo(new j(a.clientX,a.clientY))>5&&(as=!0),Dt.x=a.clientX/window.innerWidth*2-1,Dt.y=-(a.clientY/window.innerHeight)*2+1,ns=!0});et.addEventListener("pointerleave",()=>{ns=!1,Z&&(Z.visible=!1)});et.addEventListener("click",a=>{if(as||performance.now()-ti>350)return;if(De){const s=De.handleClick(a,de);if(s){ye({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM});return}}if(!fe)return;Lt.setFromCamera(Dt,de);const e=Lt.intersectObject(fe);if(e.length>0){const s=e[0],t=fe.worldToLocal(s.point.clone()),{latDeg:i,lonDeg:n}=Gs(t);let r=0;s.face&&Qe?r=Qe[s.face.a]??0:r=xt(i,n),ss(i,n,r,!1)}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(Se){const{latDeg:a,lonDeg:e,elevKm:s}=Se,t=Be(e,a);ye({name:t?"Site 01 Target":"Custom Lunar Target",designation:V(a,e),latitudeDeg:a,longitudeDeg:e,elevationM:Math.round(s*1e3),isInsideSite01DEM:t})}document.getElementById("selection-confirm-toast").style.display="none",F&&(F.visible=!1),Se=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",F&&(F.visible=!1),Se=null});function ka(){if(!ns||!fe||!Z){Z&&(Z.visible=!1);return}Lt.setFromCamera(Dt,de);const a=Lt.intersectObject(fe);if(a.length>0){const e=a[0],s=fe.worldToLocal(e.point.clone()),{latDeg:t,lonDeg:i}=Gs(s),n=document.getElementById("readout-coords");n&&!Se&&(n.textContent=V(t,i));const r=s.clone().normalize();if(Z.position.copy(s.clone().multiplyScalar(1.0015)),Z.quaternion.setFromUnitVectors(new S(0,1,0),r),Z.visible=!0,e.face&&Qe){const o=Qe[e.face.a],c=document.getElementById("readout-elev");c&&!Se&&(c.textContent=`${o>=0?"+":""}${o.toFixed(2)} km`)}}else Z.visible=!1}window.addEventListener("keydown",a=>{var e,s,t;if(!(a.target instanceof HTMLInputElement||a.target instanceof HTMLTextAreaElement))switch(a.key.toLowerCase()){case" ":a.preventDefault(),(e=document.getElementById("btn-auto"))==null||e.click();break;case"p":a.preventDefault(),Js();break;case"r":a.preventDefault(),(s=document.getElementById("btn-reset"))==null||s.click();break;case"s":a.preventDefault(),(t=document.getElementById("btn-sun"))==null||t.click();break;case"m":a.preventDefault(),se==null||se.toggle();break;case"c":a.preventDefault(),ue==null||ue.toggle();break}});function xa(){const a=window.innerWidth,e=window.innerHeight;de.aspect=a/e,de.updateProjectionMatrix(),he.setSize(a,e),mt.setSize(a,e),Vs.resolution.set(a,e)}window.addEventListener("resize",xa);ye({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100,isInsideSite01DEM:!0},!1);const $s=new Oi;function La(){const a=document.getElementById("hud-3d-site-card");if(!a||!H||isNaN(Ct)||isNaN(Tt)){a&&(a.style.display="none");return}const s=Ne(Ct,Tt,Fe*1.002).clone().applyMatrix4(H.matrixWorld),t=de.position.clone().sub(s).normalize();if(s.clone().normalize().dot(t)<=.05){a.style.display="none";return}const r=s.clone().project(de);if(r.z>=1){a.style.display="none";return}const o=(r.x*.5+.5)*window.innerWidth,c=(-(r.y*.5)+.5)*window.innerHeight,l=230,d=140,u=o+32+l>window.innerWidth?o-l-24:o+32,h=Math.max(16,Math.min(c-45,window.innerHeight-d-16));a.style.display="flex",a.style.left=`${u}px`,a.style.top=`${h}px`}function si(){requestAnimationFrame(si);const a=$s.getDelta(),e=$s.getElapsedTime();if(re.update(),me){const t=performance.now()-me.startTime,i=Math.min(1,t/me.duration),n=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;de.position.lerpVectors(me.startPos,me.targetPos,n),re.target.lerpVectors(me.startLook,me.targetLook,n),re.update(),i>=1&&(me=null)}if(De&&De.update(e),Mt&&(Mt.rotation.y=e*1.8),_t){const t=.22+.12*Math.sin(e*2.2);_t.material.opacity=t}const s=!!(se!=null&&se.getIsOpen())||!!(ue!=null&&ue.getIsOpen());if(H&&rt&&!Zt&&!me&&!s&&(H.rotation.y+=.02*a),lt){St+=.12*a;const t=8;ht.position.set(Math.cos(St)*t,Math.sin(St*.25)*2,Math.sin(St)*t)}ka(),La(),mt.render()}si();
