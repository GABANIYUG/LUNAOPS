var ai=Object.defineProperty;var ni=(n,e,s)=>e in n?ai(n,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[e]=s;var b=(n,e,s)=>ni(n,typeof e!="symbol"?e+"":e,s);import{X as oi,d as f,Y as We,Z as qe,_ as os,$ as rs,V as U,a0 as ri,a1 as li,l as Pt,a2 as Ss,G as $e,B as V,a3 as te,g as Le,a4 as se,v as we,r as F,o as ue,M as R,j as ye,W as ci,S as ys,A as di,a as pi,C as ui,b as mi,i as hi,D as ws,E as gi,R as vi,U as bi,c as fi,T as Si,e as yi,f as wi,h as Ei,z as Mi,N as _i,K as Es,J as Ms,n as Ci,x as Ti,a5 as ki,a6 as xi}from"./UnrealBloomPass-CF8Vl7q6.js";const ls={type:"change"},Dt={type:"start"},cs={type:"end"},mt=new ri,ds=new li,Di=Math.cos(70*Pt.DEG2RAD);class Li extends oi{constructor(e,s){super(),this.object=e,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new f,this.cursor=new f,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:We.ROTATE,MIDDLE:We.DOLLY,RIGHT:We.PAN},this.touches={ONE:qe.ROTATE,TWO:qe.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(p){p.addEventListener("keydown",xt),this._domElementKeyEvents=p},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",xt),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(ls),t.update(),a=i.NONE},this.update=function(){const p=new f,y=new rs().setFromUnitVectors(e.up,new f(0,1,0)),C=y.clone().invert(),I=new f,q=new rs,ke=new f,ae=2*Math.PI;return function(ii=null){const as=t.object.position;p.copy(as).sub(t.target),p.applyQuaternion(y),r.setFromVector3(p),t.autoRotate&&a===i.NONE&&z(Q(ii)),t.enableDamping?(r.theta+=d.theta*t.dampingFactor,r.phi+=d.phi*t.dampingFactor):(r.theta+=d.theta,r.phi+=d.phi);let ve=t.minAzimuthAngle,be=t.maxAzimuthAngle;isFinite(ve)&&isFinite(be)&&(ve<-Math.PI?ve+=ae:ve>Math.PI&&(ve-=ae),be<-Math.PI?be+=ae:be>Math.PI&&(be-=ae),ve<=be?r.theta=Math.max(ve,Math.min(be,r.theta)):r.theta=r.theta>(ve+be)/2?Math.max(ve,r.theta):Math.min(be,r.theta)),r.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,r.phi)),r.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor);let tt=!1;if(t.zoomToCursor&&H||t.object.isOrthographicCamera)r.radius=S(r.radius);else{const fe=r.radius;r.radius=S(r.radius*o),tt=fe!=r.radius}if(p.setFromSpherical(r),p.applyQuaternion(C),as.copy(t.target).add(p),t.object.lookAt(t.target),t.enableDamping===!0?(d.theta*=1-t.dampingFactor,d.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(d.set(0,0,0),c.set(0,0,0)),t.zoomToCursor&&H){let fe=null;if(t.object.isPerspectiveCamera){const st=p.length();fe=S(st*o);const ut=st-fe;t.object.position.addScaledVector($,ut),t.object.updateMatrixWorld(),tt=!!ut}else if(t.object.isOrthographicCamera){const st=new f(x.x,x.y,0);st.unproject(t.object);const ut=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),t.object.updateProjectionMatrix(),tt=ut!==t.object.zoom;const ns=new f(x.x,x.y,0);ns.unproject(t.object),t.object.position.sub(ns).add(st),t.object.updateMatrixWorld(),fe=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;fe!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(fe).add(t.object.position):(mt.origin.copy(t.object.position),mt.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(mt.direction))<Di?e.lookAt(t.target):(ds.setFromNormalAndCoplanarPoint(t.object.up,t.target),mt.intersectPlane(ds,t.target))))}else if(t.object.isOrthographicCamera){const fe=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),fe!==t.object.zoom&&(t.object.updateProjectionMatrix(),tt=!0)}return o=1,H=!1,tt||I.distanceToSquared(t.object.position)>l||8*(1-q.dot(t.object.quaternion))>l||ke.distanceToSquared(t.target)>l?(t.dispatchEvent(ls),I.copy(t.object.position),q.copy(t.object.quaternion),ke.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",ss),t.domElement.removeEventListener("pointerdown",Zt),t.domElement.removeEventListener("pointercancel",et),t.domElement.removeEventListener("wheel",Jt),t.domElement.removeEventListener("pointermove",kt),t.domElement.removeEventListener("pointerup",et),t.domElement.getRootNode().removeEventListener("keydown",Qt,{capture:!0}),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",xt),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=i.NONE;const l=1e-6,r=new os,d=new os;let o=1;const c=new f,m=new U,u=new U,h=new U,g=new U,v=new U,w=new U,M=new U,_=new U,T=new U,$=new f,x=new U;let H=!1;const P=[],j={};let k=!1;function Q(p){return p!==null?2*Math.PI/60*t.autoRotateSpeed*p:2*Math.PI/60/60*t.autoRotateSpeed}function B(p){const y=Math.abs(p*.01);return Math.pow(.95,t.zoomSpeed*y)}function z(p){d.theta-=p}function re(p){d.phi-=p}const Oe=function(){const p=new f;return function(C,I){p.setFromMatrixColumn(I,0),p.multiplyScalar(-C),c.add(p)}}(),Re=function(){const p=new f;return function(C,I){t.screenSpacePanning===!0?p.setFromMatrixColumn(I,1):(p.setFromMatrixColumn(I,0),p.crossVectors(t.object.up,p)),p.multiplyScalar(C),c.add(p)}}(),ge=function(){const p=new f;return function(C,I){const q=t.domElement;if(t.object.isPerspectiveCamera){const ke=t.object.position;p.copy(ke).sub(t.target);let ae=p.length();ae*=Math.tan(t.object.fov/2*Math.PI/180),Oe(2*C*ae/q.clientHeight,t.object.matrix),Re(2*I*ae/q.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(Oe(C*(t.object.right-t.object.left)/t.object.zoom/q.clientWidth,t.object.matrix),Re(I*(t.object.top-t.object.bottom)/t.object.zoom/q.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function je(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o/=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function Qe(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o*=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function Be(p,y){if(!t.zoomToCursor)return;H=!0;const C=t.domElement.getBoundingClientRect(),I=p-C.left,q=y-C.top,ke=C.width,ae=C.height;x.x=I/ke*2-1,x.y=-(q/ae)*2+1,$.set(x.x,x.y,1).unproject(t.object).sub(t.object.position).normalize()}function S(p){return Math.max(t.minDistance,Math.min(t.maxDistance,p))}function E(p){m.set(p.clientX,p.clientY)}function L(p){Be(p.clientX,p.clientX),M.set(p.clientX,p.clientY)}function A(p){g.set(p.clientX,p.clientY)}function X(p){u.set(p.clientX,p.clientY),h.subVectors(u,m).multiplyScalar(t.rotateSpeed);const y=t.domElement;z(2*Math.PI*h.x/y.clientHeight),re(2*Math.PI*h.y/y.clientHeight),m.copy(u),t.update()}function Te(p){_.set(p.clientX,p.clientY),T.subVectors(_,M),T.y>0?je(B(T.y)):T.y<0&&Qe(B(T.y)),M.copy(_),t.update()}function Ct(p){v.set(p.clientX,p.clientY),w.subVectors(v,g).multiplyScalar(t.panSpeed),ge(w.x,w.y),g.copy(v),t.update()}function Tt(p){Be(p.clientX,p.clientY),p.deltaY<0?Qe(B(p.deltaY)):p.deltaY>0&&je(B(p.deltaY)),t.update()}function Ws(p){let y=!1;switch(p.code){case t.keys.UP:p.ctrlKey||p.metaKey||p.shiftKey?re(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ge(0,t.keyPanSpeed),y=!0;break;case t.keys.BOTTOM:p.ctrlKey||p.metaKey||p.shiftKey?re(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ge(0,-t.keyPanSpeed),y=!0;break;case t.keys.LEFT:p.ctrlKey||p.metaKey||p.shiftKey?z(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ge(t.keyPanSpeed,0),y=!0;break;case t.keys.RIGHT:p.ctrlKey||p.metaKey||p.shiftKey?z(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ge(-t.keyPanSpeed,0),y=!0;break}y&&(p.preventDefault(),t.update())}function Wt(p){if(P.length===1)m.set(p.pageX,p.pageY);else{const y=Ge(p),C=.5*(p.pageX+y.x),I=.5*(p.pageY+y.y);m.set(C,I)}}function qt(p){if(P.length===1)g.set(p.pageX,p.pageY);else{const y=Ge(p),C=.5*(p.pageX+y.x),I=.5*(p.pageY+y.y);g.set(C,I)}}function Yt(p){const y=Ge(p),C=p.pageX-y.x,I=p.pageY-y.y,q=Math.sqrt(C*C+I*I);M.set(0,q)}function qs(p){t.enableZoom&&Yt(p),t.enablePan&&qt(p)}function Ys(p){t.enableZoom&&Yt(p),t.enableRotate&&Wt(p)}function Xt(p){if(P.length==1)u.set(p.pageX,p.pageY);else{const C=Ge(p),I=.5*(p.pageX+C.x),q=.5*(p.pageY+C.y);u.set(I,q)}h.subVectors(u,m).multiplyScalar(t.rotateSpeed);const y=t.domElement;z(2*Math.PI*h.x/y.clientHeight),re(2*Math.PI*h.y/y.clientHeight),m.copy(u)}function Vt(p){if(P.length===1)v.set(p.pageX,p.pageY);else{const y=Ge(p),C=.5*(p.pageX+y.x),I=.5*(p.pageY+y.y);v.set(C,I)}w.subVectors(v,g).multiplyScalar(t.panSpeed),ge(w.x,w.y),g.copy(v)}function Kt(p){const y=Ge(p),C=p.pageX-y.x,I=p.pageY-y.y,q=Math.sqrt(C*C+I*I);_.set(0,q),T.set(0,Math.pow(_.y/M.y,t.zoomSpeed)),je(T.y),M.copy(_);const ke=(p.pageX+y.x)*.5,ae=(p.pageY+y.y)*.5;Be(ke,ae)}function Xs(p){t.enableZoom&&Kt(p),t.enablePan&&Vt(p)}function Vs(p){t.enableZoom&&Kt(p),t.enableRotate&&Xt(p)}function Zt(p){t.enabled!==!1&&(P.length===0&&(t.domElement.setPointerCapture(p.pointerId),t.domElement.addEventListener("pointermove",kt),t.domElement.addEventListener("pointerup",et)),!si(p)&&(ei(p),p.pointerType==="touch"?ts(p):Ks(p)))}function kt(p){t.enabled!==!1&&(p.pointerType==="touch"?Qs(p):Zs(p))}function et(p){switch(ti(p),P.length){case 0:t.domElement.releasePointerCapture(p.pointerId),t.domElement.removeEventListener("pointermove",kt),t.domElement.removeEventListener("pointerup",et),t.dispatchEvent(cs),a=i.NONE;break;case 1:const y=P[0],C=j[y];ts({pointerId:y,pageX:C.x,pageY:C.y});break}}function Ks(p){let y;switch(p.button){case 0:y=t.mouseButtons.LEFT;break;case 1:y=t.mouseButtons.MIDDLE;break;case 2:y=t.mouseButtons.RIGHT;break;default:y=-1}switch(y){case We.DOLLY:if(t.enableZoom===!1)return;L(p),a=i.DOLLY;break;case We.ROTATE:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enablePan===!1)return;A(p),a=i.PAN}else{if(t.enableRotate===!1)return;E(p),a=i.ROTATE}break;case We.PAN:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enableRotate===!1)return;E(p),a=i.ROTATE}else{if(t.enablePan===!1)return;A(p),a=i.PAN}break;default:a=i.NONE}a!==i.NONE&&t.dispatchEvent(Dt)}function Zs(p){switch(a){case i.ROTATE:if(t.enableRotate===!1)return;X(p);break;case i.DOLLY:if(t.enableZoom===!1)return;Te(p);break;case i.PAN:if(t.enablePan===!1)return;Ct(p);break}}function Jt(p){t.enabled===!1||t.enableZoom===!1||a!==i.NONE||(p.preventDefault(),t.dispatchEvent(Dt),Tt(Js(p)),t.dispatchEvent(cs))}function Js(p){const y=p.deltaMode,C={clientX:p.clientX,clientY:p.clientY,deltaY:p.deltaY};switch(y){case 1:C.deltaY*=16;break;case 2:C.deltaY*=100;break}return p.ctrlKey&&!k&&(C.deltaY*=10),C}function Qt(p){p.key==="Control"&&(k=!0,t.domElement.getRootNode().addEventListener("keyup",es,{passive:!0,capture:!0}))}function es(p){p.key==="Control"&&(k=!1,t.domElement.getRootNode().removeEventListener("keyup",es,{passive:!0,capture:!0}))}function xt(p){t.enabled===!1||t.enablePan===!1||Ws(p)}function ts(p){switch(is(p),P.length){case 1:switch(t.touches.ONE){case qe.ROTATE:if(t.enableRotate===!1)return;Wt(p),a=i.TOUCH_ROTATE;break;case qe.PAN:if(t.enablePan===!1)return;qt(p),a=i.TOUCH_PAN;break;default:a=i.NONE}break;case 2:switch(t.touches.TWO){case qe.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;qs(p),a=i.TOUCH_DOLLY_PAN;break;case qe.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Ys(p),a=i.TOUCH_DOLLY_ROTATE;break;default:a=i.NONE}break;default:a=i.NONE}a!==i.NONE&&t.dispatchEvent(Dt)}function Qs(p){switch(is(p),a){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;Xt(p),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;Vt(p),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Xs(p),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Vs(p),t.update();break;default:a=i.NONE}}function ss(p){t.enabled!==!1&&p.preventDefault()}function ei(p){P.push(p.pointerId)}function ti(p){delete j[p.pointerId];for(let y=0;y<P.length;y++)if(P[y]==p.pointerId){P.splice(y,1);return}}function si(p){for(let y=0;y<P.length;y++)if(P[y]==p.pointerId)return!0;return!1}function is(p){let y=j[p.pointerId];y===void 0&&(y=new U,j[p.pointerId]=y),y.set(p.pageX,p.pageY)}function Ge(p){const y=p.pointerId===P[0]?P[1]:P[0];return j[y]}t.domElement.addEventListener("contextmenu",ss),t.domElement.addEventListener("pointerdown",Zt),t.domElement.addEventListener("pointercancel",et),t.domElement.addEventListener("wheel",Jt,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",Qt,{passive:!0,capture:!0}),this.update()}}const _e="http://127.0.0.1:8000";async function _s(){const n=await fetch(`${_e}/api/spice/health`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`Health check failed: HTTP ${n.status}`);return n.json()}async function Cs(n){var s;const e=await fetch(`${_e}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Geometry request failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Ii(n){var s;const e=await fetch(`${_e}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon profile failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Ts(n){var s;const e=await fetch(`${_e}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon visibility failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function $i(n){var s;const e=await fetch(`${_e}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Mission timeline calculation failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Pi(n){var s;const e=await fetch(`${_e}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Candidate comparison failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function ks(n){var s;const e=await fetch(`${_e}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Landing windows scan failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}function It(n){const[e,s,t]=n,i=e,a=t,l=s,r=Math.sqrt(i*i+a*a+l*l);return r<1e-10?[0,1,0]:[i/r,a/r,l/r]}const xs=1737400,Ai=1737.4,D={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function Ie(n,e,s=xs){const i=(n%360+360)%360*Math.PI/180,a=e*Math.PI/180,l=Math.PI/2+a,r=2*s*Math.tan(l/2),d=r*Math.sin(i),o=r*Math.cos(i);return{x:d,y:o}}function At(n,e,s=xs){const t=Math.hypot(n,e);if(t<1e-7)return{lonDeg:0,latDeg:-90};const i=2*Math.atan2(t,2*s),a=-Math.PI/2+i,r=(Math.atan2(n,e)*180/Math.PI+360)%360,d=a*180/Math.PI;return{lonDeg:r,latDeg:d}}function rt(n,e){if(e>-80)return!1;const{x:s,y:t}=Ie(n,e);return s>=D.minX&&s<=D.maxX&&t>=D.minY&&t<=D.maxY}function Oi(n,e){const s=n>=D.minX&&n<=D.maxX&&e>=D.minY&&e<=D.maxY,t=(n-D.minX)/D.pixelSizeM,i=(D.maxY-e)/D.pixelSizeM,a=t/D.fullWidthPx,l=i/D.fullHeightPx,r=Math.max(0,Math.min(511,Math.round(a*512))),d=Math.max(0,Math.min(511,Math.round(l*512)));return{pxFull:t,pyFull:i,px512:r,py512:d,isInside:s}}function Ri(n,e){const s=Math.max(0,Math.min(1,n/512)),t=Math.max(0,Math.min(1,e/512)),i=D.minX+s*(D.maxX-D.minX),a=D.maxY-t*(D.maxY-D.minY),{lonDeg:l,latDeg:r}=At(i,a);return{lonDeg:l,latDeg:r,x:i,y:a}}function Ne(n,e,s){const t=Math.max(-90,Math.min(90,n));if(Math.abs(t+90)<1e-7)return new f(0,-s,0);if(Math.abs(t-90)<1e-7)return new f(0,s,0);const i=(90-t)*(Math.PI/180),a=(e+180)*(Math.PI/180),l=-s*Math.cos(a)*Math.sin(i),r=s*Math.cos(i),d=s*Math.sin(a)*Math.sin(i);return new f(l,r,d)}function lt(n){const e=(90-Math.max(-90,Math.min(90,n)))*(Math.PI/180);return(Math.PI-e)*Ai}function Ds(n,e){const s=n.clone().normalize(),i=Math.asin(Math.max(-1,Math.min(1,s.y)))*180/Math.PI;if(i<=-89.9999)return{latDeg:-90,lonDeg:0};if(i>=89.9999)return{latDeg:90,lonDeg:0};let l=Math.atan2(-s.z,s.x)*180/Math.PI;return l<0&&(l+=360),{latDeg:i,lonDeg:l}}function Ot(n,e){const s=typeof n=="number"?n:parseFloat(n),t=typeof e=="number"?e:parseFloat(e);if(isNaN(s)||isNaN(t))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(s<-90||s>90)return{valid:!1,lat:s,lon:t,error:"Latitude must be between -90.0° and +90.0°."};const i=(t%360+360)%360;return{valid:!0,lat:s,lon:i}}function Z(n,e){if(Math.abs(n+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(n-90)<.001)return"90.000° N (True Lunar North Pole)";const s=`${Math.abs(n).toFixed(3)}° ${n<0?"S":"N"}`,i=`${((e%360+360)%360).toFixed(3)}° E`;return`${s}, ${i}`}let nt=null,Lt=!1,G=null,Ee=!1,ot="step_1h",Xe=null,vt=0;const Ve={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};async function bt(n,e,s,t){if(!G)return!1;const i=G.querySelector("#spice-lat"),a=G.querySelector("#spice-lon"),l=G.querySelector("#spice-time-input"),r=G.querySelector("#spice-site-note"),d=G.querySelector("#spice-window-card");if(i&&(i.value=n.toFixed(3)),a&&(a.value=e.toFixed(2)),r&&(r.textContent=s),G.querySelectorAll(".spice-preset-btn").forEach(o=>{const c=parseFloat(o.dataset.lat||"999"),m=parseFloat(o.dataset.lon||"999");Math.abs(c-n)<.05&&Math.abs(m-e)<.05?o.classList.add("active"):o.classList.remove("active")}),t)return l&&(l.value=t),await Pe(G);d&&(d.style.display="block",d.innerHTML=`
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `);try{const m=await ks({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:n,longitude_deg:e});Ni(d,m,n,e);let u=m.summary.best_window_start;if(!u&&m.days.length>0){const h=m.days.filter(g=>g.is_safe_for_landing);h.length>0&&(u=h[0].date)}u&&l?l.value=`${u}T12:00:00Z`:l&&!l.value&&(l.value="2026-10-16T12:00:00Z")}catch(o){console.warn("[SPICE] Candidate window scan error",o),d&&(d.innerHTML=`
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `),l&&!l.value&&(l.value="2026-10-16T12:00:00Z")}return await Pe(G)}function Ni(n,e,s,t){if(!n)return;const i=e.summary,a=rt(t,s),l=i.best_window_start,r=i.safe_days_count;let d=l,o=0;if(l&&e.days.length>0){const c=e.days.findIndex(m=>m.date===l);if(c!==-1){let m=c;for(;m<e.days.length&&e.days[m].is_safe_for_landing;)d=e.days[m].date,o++,m++}}if(o===0&&r>0&&(o=1),l&&r>0){const c=e.days.find(g=>g.date===l),m=c?c.sunlight.full_hours:12,u=c?c.earth_los.full_hours:24,h=c?c.safety_score:80;n.innerHTML=`
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
          <span class="smw-val">${l}T00:00Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">WINDOW END</span>
          <span class="smw-val">${d||l}T23:59Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">SAFE DURATION</span>
          <span class="smw-val">${o} Continuous Days (${o*24} hrs)</span>
        </div>
      </div>

      <!-- Configured Evaluation Criteria & Status -->
      <div class="smw-criteria-box">
        <div class="smw-crit-title">EVALUATION CRITERIA:</div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit crit-met">MET</span>
          <span class="smw-crit-desc">Continuous Solar Illumination ≥ 6.0 h/day (Calculated: ${m.toFixed(1)} h)</span>
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
        <span class="smw-index-pill">Heuristic Index: ${h.toFixed(1)} / 100</span>
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
    `}function Fi(n){if(!G)return!1;const e=G.querySelector("#spice-time-input");e&&(e.value=n,Pe(G))}function zi(n){var a,l,r,d,o,c,m,u,h;nt=n;const e=document.createElement("div");e.id="spice-panel",e.innerHTML=Ui(),document.body.appendChild(e),G=e,e.querySelector("#spice-fetch-btn").addEventListener("click",()=>Pe(e)),e.querySelector("#spice-auto-btn").addEventListener("click",()=>Bi(e)),(a=e.querySelector("#spice-autotrack-mode"))==null||a.addEventListener("change",g=>{ot=g.target.value,Rt(e)}),(l=e.querySelector("#spice-retry-btn"))==null||l.addEventListener("click",()=>$t(e,!0)),(r=e.querySelector("#spice-now-btn"))==null||r.addEventListener("click",()=>{xe(e);const g=e.querySelector("#spice-time-input");g&&(g.value=new Date().toISOString().slice(0,19)+"Z",Pe(e))}),(d=e.querySelector("#spice-epoch-artemis"))==null||d.addEventListener("click",()=>{xe(e);const g=e.querySelector("#spice-time-input");g&&(g.value="2026-10-16T12:00:00Z",Pe(e))}),(o=e.querySelector("#spice-step-back-24"))==null||o.addEventListener("click",()=>{xe(e),Ye(-24)}),(c=e.querySelector("#spice-step-back-1"))==null||c.addEventListener("click",()=>{xe(e),Ye(-1)}),(m=e.querySelector("#spice-step-fwd-1"))==null||m.addEventListener("click",()=>{xe(e),Ye(1)}),(u=e.querySelector("#spice-step-fwd-24"))==null||u.addEventListener("click",()=>{xe(e),Ye(24)}),e.querySelectorAll(".spice-preset-btn").forEach(g=>{g.addEventListener("click",()=>{const v=parseFloat(g.dataset.lat||"-90"),w=parseFloat(g.dataset.lon||"0"),M=g.dataset.label||"South Pole Site";bt(v,w,M),e.querySelectorAll(".spice-preset-btn").forEach(_=>_.classList.remove("active")),g.classList.add("active")})}),(h=e.querySelector("#spice-time-input"))==null||h.addEventListener("focus",()=>{xe(e)});const s=e.querySelector(".spice-header"),t=e.querySelector(".spice-body");s.addEventListener("click",()=>{const g=t.style.display==="none";t.style.display=g?"":"none",s.querySelector(".spice-collapse-icon").textContent=g?"▼":"▶"});const i=e.querySelector("#spice-time-input");return i.value="2026-10-16T12:00:00Z",$t(e).then(()=>{bt(Ve.lat,Ve.lon,Ve.label,"2026-10-16T12:00:00Z")}),e}function Ye(n){if(!G)return;const e=G.querySelector("#spice-time-input");if(e)try{const s=new Date(e.value);if(!isNaN(s.getTime())){const t=new Date(s.getTime()+n*3600*1e3);e.value=t.toISOString().slice(0,19)+"Z",Pe(G)}}catch{}}function Ui(){return`
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
             value="${Ve.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Ve.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Ve.label}</div>
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
`}async function $t(n,e=!1){const s=n.querySelector("#spice-status-dot"),t=n.querySelector("#spice-status-text"),i=n.querySelector("#spice-fetch-btn"),a=n.querySelector("#spice-retry-btn");e&&(t.textContent="Connecting to SPICE backend…",s.className="spice-status-dot");try{const l=await _s(),r=l.status==="ok";return s.className="spice-status-dot "+(r?"dot-ok":"dot-warn"),t.textContent=r?`SPICE Online · ${l.reference_frame}`:`Backend Degraded: ${l.error??"Kernel warning"}`,i.disabled=!r,a&&(a.style.display=r?"none":"inline-block"),r}catch{return s.className="spice-status-dot dot-err",t.textContent="Backend Offline (port 8000)",i.disabled=!0,a&&(a.style.display="inline-block"),!1}}async function Pe(n){if(Lt)return!1;Lt=!0;const e=n.querySelector("#spice-loading"),s=n.querySelector("#spice-error-box"),t=n.querySelector("#spice-results");e.style.display="flex",s.style.display="none";try{const i=n.querySelector("#spice-time-input"),a=n.querySelector("#spice-lat"),l=n.querySelector("#spice-lon"),r=i.value.trim(),d=Ot(a.value,l.value);if(!d.valid)throw new Error(d.error||"Invalid coordinates.");const o=await Cs({utc_time:r,latitude_deg:d.lat,longitude_deg:d.lon,elevation_m:0});let c=null;try{c=await Ts({latitude_deg:d.lat,longitude_deg:d.lon,elevation_m:0,instrument_height_m:2,sun_azimuth_deg:o.sun.azimuth_deg,sun_elevation_deg:o.sun.elevation_deg,sun_distance_km:o.sun.distance_km,earth_azimuth_deg:o.earth.azimuth_deg,earth_elevation_deg:o.earth.elevation_deg,earth_distance_km:o.earth.distance_km})}catch{c=null}return Hi(n,o,c),ji(o),t.style.display="block",vt=0,!0}catch(i){const a=i instanceof Error?i.message:String(i);return s.textContent=`Error: ${a}`,s.style.display="block",await $t(n),Ee&&(vt++,vt>=2&&xe(n,"Auto-Track Paused: Network/SPICE error")),!1}finally{e.style.display="none",Lt=!1}}function Hi(n,e,s){const t=v=>v.toFixed(1),i=v=>v>1e6?`${(v/1495978707e-1).toFixed(4)} AU (${(v/1e6).toFixed(2)}M km)`:`${v.toLocaleString(void 0,{maximumFractionDigits:0})} km`,a=rt(e.site.longitude_deg,e.site.latitude_deg);ee("res-sun-dist",i(e.sun.distance_km)),ee("res-sun-az",`${t(e.sun.azimuth_deg)}°`);const l=e.sun.elevation_deg;us("res-sun-geom-el",`${l>=0?"+":""}${t(l)}°`,l>=0?"spice-val-positive":"spice-val-negative");const r=document.getElementById("res-sun-obs-status"),d=document.getElementById("res-sun-terrain-el"),o=document.getElementById("res-sun-dem-note");if(s&&s.sun){const v=s.sun;if(v.terrain_horizon_elevation_deg!==null?ee("res-sun-terrain-el",`${t(v.terrain_horizon_elevation_deg)}°`):ee("res-sun-terrain-el","N/A (Outside DEM)"),r)switch(v.visibility_status){case"no_obstruction_detected_within_coverage":r.textContent="No obstruction detected within coverage",r.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":r.textContent="Blocked by local terrain (Shadow)",r.className="spice-pill pill-err";break;case"blocked_by_lunar_body":r.textContent="Below geometric horizon (Lunar Body)",r.className="spice-pill pill-err";break;case"near_horizon_grazing":r.textContent="Near-horizon grazing light",r.className="spice-pill pill-warn";break;default:r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-warn"}}else d&&(d.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),r&&(l<0?(r.textContent="Below geometric horizon",r.className="spice-pill pill-err"):a?(r.textContent="Above geometric horizon (DEM Ray uncalculated)",r.className="spice-pill pill-warn"):(r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-neutral"));o&&(o.textContent=a?"DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).":"DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only."),ee("res-earth-dist",`${e.earth.distance_km.toLocaleString(void 0,{maximumFractionDigits:0})} km`),ee("res-earth-az",`${t(e.earth.azimuth_deg)}°`);const c=e.earth.elevation_deg;us("res-earth-geom-el",`${c>=0?"+":""}${t(c)}°`,c>=0?"spice-val-positive":"spice-val-negative");const m=document.getElementById("res-earth-obs-status"),u=document.getElementById("res-earth-terrain-el"),h=document.getElementById("res-earth-los-status");if(s&&s.earth){const v=s.earth;if(v.terrain_horizon_elevation_deg!==null?ee("res-earth-terrain-el",`${t(v.terrain_horizon_elevation_deg)}°`):ee("res-earth-terrain-el","N/A (Outside DEM)"),m)switch(v.visibility_status){case"no_obstruction_detected_within_coverage":m.textContent="No obstruction detected within coverage",m.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":m.textContent="Blocked by local terrain",m.className="spice-pill pill-err";break;case"blocked_by_lunar_body":m.textContent="Below geometric horizon (Lunar Body)",m.className="spice-pill pill-err";break;default:m.textContent="Unknown or insufficient terrain coverage",m.className="spice-pill pill-warn"}if(h){const w=(v.visibility_status==="no_obstruction_detected_within_coverage"||v.visibility_status==="near_horizon_grazing")&&c>0;h.textContent=w?`Potential Line-of-Sight Active (${t(v.angular_clearance_deg??c)}° clearance)`:"Direct Line-of-Sight Obstructed",h.className=`spice-los-badge ${w?"los-active":"los-blocked"}`}}else if(u&&(u.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),m&&(c<0?(m.textContent="Below geometric horizon",m.className="spice-pill pill-err"):(m.textContent="Above geometric horizon",m.className="spice-pill pill-ok")),h){const v=c>0;h.textContent=v?`Potential Geometric LOS Active (+${t(c)}°)`:"Direct Line-of-Sight Occluded",h.className=`spice-los-badge ${v?"los-active":"los-blocked"}`}ee("res-frame",e.reference_frame),ee("res-aberration",e.aberration_correction),ee("res-et-seconds",`${e.ephemeris_time_s.toFixed(3)} s`),ee("res-sun-vec",e.sun.direction_unit.map(v=>v.toFixed(4)).join(", ")),ee("res-earth-vec",e.earth.direction_unit.map(v=>v.toFixed(4)).join(", "));const g=n.querySelector("#spice-scene-note");g.style.display=nt?"block":"none"}function ji(n){if(!nt)return;const[e,s,t]=It(n.sun.direction_unit),i=8;nt.sunLight.position.set(e*i,s*i,t*i);const[a,l,r]=It(n.earth.direction_unit);nt.earthshineLight.position.set(-a*i,-l*i,-r*i)}function Bi(n){Ee=!Ee,Ee?Gi(n):Ls(n)}function Gi(n){Ee=!0,vt=0,Rt(n),Xe!==null&&clearInterval(Xe),ps(n),Xe=setInterval(()=>{Ee&&ps(n)},2e3)}function ps(n){const e=n.querySelector("#spice-time-input");if(e){if(ot==="realtime")e.value=new Date().toISOString().slice(0,19)+"Z";else if(ot==="step_1h"){Ye(1);return}else if(ot==="step_24h"){Ye(24);return}Pe(n)}}function Ls(n){Ee=!1,Xe!==null&&(clearInterval(Xe),Xe=null),Rt(n)}function xe(n,e){if(!Ee)return;Ls(n);const s=n.querySelector("#autotrack-status-text");s&&(s.textContent=e||"Standby (User edit paused track)")}function Rt(n){const e=n.querySelector("#spice-auto-btn"),s=n.querySelector("#autotrack-dot"),t=n.querySelector("#autotrack-status-text");if(Ee){e.classList.add("active"),e.textContent="Auto-Track: ACTIVE ●",s.className="autotrack-dot dot-active";const i={step_1h:"Advancing (+1h / 2s)",step_24h:"Advancing (+24h / 2s)",realtime:"Tracking Real-Time UTC"};t.textContent=i[ot]||"Active"}else e.classList.remove("active"),e.textContent="Auto-Track: OFF",s.className="autotrack-dot",t.textContent="Standby (Epoch Static)"}function ee(n,e){const s=document.getElementById(n);s&&(s.textContent=e)}function us(n,e,s){const t=document.getElementById(n);t&&(t.textContent=e,t.className=`sm-value ${s}`)}const ne=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM (NASA LOLA Site 01)",coverageType:"High-Resolution Regional DEM"},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians. Geodetic reference benchmark.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry",isGeodeticDatum:!0},{id:"shackleton-rim",name:"Shackleton Rim",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering PSR with high water-ice deposition probability.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"malapert",name:"Malapert Massif",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km massif providing extended solar visibility and DTE comms.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"haworth-rim",name:"Haworth Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with volatile concentrations.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"de-gerlache-rim",name:"de Gerlache Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim offering favorable sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"nobile-rim-1",name:"Nobile Rim",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"}],Se=1,le={POLE_RING:2282478,POLE_CROSS:6809849,POLE_DOT:16777215,SITE01_MAIN:16096779,GRID_PRIME:3900150,GRID_SEC:1981023,DEM_BOX:3718648,SEC:{"shackleton-rim":3718648,malapert:3462041,"haworth-rim":10980346,"de-gerlache-rim":6333946,"nobile-rim-1":16020150}};class Wi{constructor(e){b(this,"group");b(this,"interactiveMarkers",[]);b(this,"siteMarkerGroups",new Map);b(this,"raycaster",new Ss);b(this,"mouse",new U);b(this,"onSelectSiteCallback");b(this,"disposables",[]);this.group=new $e,this.group.name="SouthPoleOverlay",this._buildPolarGrid(e),this._buildDEMFootprint(e),this._buildSouthPoleMarker(e),this._buildCandidateSites(e)}setOnSelectSite(e){this.onSelectSiteCallback=e}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(e){this.siteMarkerGroups.forEach((s,t)=>{const i=t===e,a=s.getObjectByName("Ring");if(a){a.scale.setScalar(i?1.25:1);const l=a.material;l&&"opacity"in l&&(l.opacity=i?1:ms(t))}["Dot","Cx0","Cx1","Cx2","Cx3","Bk0","Bk1","Bk2","Bk3","Stem","Cap"].forEach(l=>{const r=s.getObjectByName(l);if(!r)return;const d=r.material;d&&"opacity"in d&&(d.opacity=i?1:ms(t,l))})})}_buildPolarGrid(e){const s=new $e;s.name="PolarGrid";const t=e*1.0012;[[-80,1982639,.35,240],[-85,1920728,.28,180],[-88,1981023,.2,120]].forEach(([i,a,l,r])=>{const d=[];for(let m=0;m<=r;m++)d.push(Ne(i,m/r*360,t));const o=new V().setFromPoints(d),c=new te({color:a,transparent:!0,opacity:l,blending:Le});s.add(new se(o,c)),this.disposables.push(o,c)}),[[0,le.GRID_PRIME,.45],[90,le.GRID_SEC,.2],[180,le.GRID_SEC,.2],[270,le.GRID_SEC,.2]].forEach(([i,a,l])=>{const r=[];for(let c=0;c<=36;c++)r.push(Ne(-80-10*(c/36),i,t));const d=new V().setFromPoints(r),o=new te({color:a,transparent:!0,opacity:l,blending:Le});s.add(new se(d,o)),this.disposables.push(d,o)}),this.group.add(s)}_buildDEMFootprint(e){const{minX:s,maxX:t,minY:i,maxY:a}=D,l=e*1.002,r=16,d=[];for(let u=0;u<=r;u++)d.push({x:s+(t-s)*(u/r),y:a});for(let u=0;u<=r;u++)d.push({x:t,y:a+(i-a)*(u/r)});for(let u=0;u<=r;u++)d.push({x:t+(s-t)*(u/r),y:i});for(let u=0;u<=r;u++)d.push({x:s,y:i+(a-i)*(u/r)});const o=d.map(u=>{const{lonDeg:h,latDeg:g}=At(u.x,u.y);return Ne(g,h,l)}),c=new V().setFromPoints(o),m=new te({color:le.DEM_BOX,transparent:!0,opacity:.45});this.group.add(new se(c,m)),this.disposables.push(c,m)}_buildSouthPoleMarker(e){const s=new $e;s.name="TrueSouthPoleMarker",s.position.set(0,-e*1.0025,0);const t=.013*Se,i=new we(t,t*1.3,64);i.rotateX(Math.PI/2);const a=new F({color:le.POLE_RING,side:ue,transparent:!0,opacity:.95,blending:Le}),l=new R(i,a);l.name="Ring",s.add(l),this.disposables.push(i,a);const r=new we(t*1.8,t*1.95,64);r.rotateX(Math.PI/2);const d=new F({color:le.POLE_RING,side:ue,transparent:!0,opacity:.4,blending:Le});s.add(new R(r,d)),this.disposables.push(r,d);const o=t*.45,c=t*2.6;[[-1,0],[1,0],[0,-1],[0,1]].forEach(([M,_],T)=>{const $=new V().setFromPoints([new f(M*o,0,_*o),new f(M*c,0,_*c)]),x=new te({color:le.POLE_CROSS,transparent:!0,opacity:.75}),H=new se($,x);H.name=`Cx${T}`,s.add(H),this.disposables.push($,x)});const m=new ye(.003*Se,12,12),u=new F({color:le.POLE_DOT,transparent:!0,opacity:1}),h=new R(m,u);h.name="Dot",s.add(h),this.disposables.push(m,u);const g=new ye(.055,8,8),v=new F({visible:!1}),w=new R(g,v);w.userData={site:ne.find(M=>M.id==="south-pole")},s.add(w),this.interactiveMarkers.push(w),this.disposables.push(g,v),this.siteMarkerGroups.set("south-pole",s),this.group.add(s)}_buildCandidateSites(e){ne.forEach(s=>{if(s.id==="south-pole")return;const t=s.id==="site-01",i=t?le.SITE01_MAIN:le.SEC[s.id]??9741240,a=new $e;a.name=`SiteMarker_${s.id}`;const l=Ne(s.lat,s.lon,e*1.0025),r=l.clone().normalize();a.position.copy(l),a.quaternion.setFromUnitVectors(new f(0,1,0),r),t?this._buildPrimaryMarker(a,i):this._buildSecondaryMarker(a,i);const d=new ye(.04,8,8),o=new F({visible:!1}),c=new R(d,o);c.position.y=.02,c.userData={site:s},a.add(c),this.interactiveMarkers.push(c),this.disposables.push(d,o),this.siteMarkerGroups.set(s.id,a),this.group.add(a)})}_buildPrimaryMarker(e,s){const t=.018*Se,i=[new f(0,0,-t),new f(t,0,0),new f(0,0,t),new f(-t,0,0),new f(0,0,-t)],a=new V().setFromPoints(i),l=new te({color:s,transparent:!0,opacity:.95}),r=new se(a,l);r.name="Ring",e.add(r),this.disposables.push(a,l);const d=[new f(0,0,-t*.55),new f(t*.55,0,0),new f(0,0,t*.55),new f(-t*.55,0,0),new f(0,0,-t*.55)],o=new V().setFromPoints(d),c=new te({color:s,transparent:!0,opacity:.55});e.add(new se(o,c)),this.disposables.push(o,c);const m=t*1.9,u=t*.55;[[0,-m,u],[0,m,u],[-m,0,u],[m,0,u]].forEach((P,j)=>{const k=[];j===0?(k.push(new f(-u*.5,0,-m+u)),k.push(new f(-u*.5,0,-m)),k.push(new f(u*.5,0,-m)),k.push(new f(u*.5,0,-m+u))):j===1?(k.push(new f(-u*.5,0,m-u)),k.push(new f(-u*.5,0,m)),k.push(new f(u*.5,0,m)),k.push(new f(u*.5,0,m-u))):j===2?(k.push(new f(-m+u,0,-u*.5)),k.push(new f(-m,0,-u*.5)),k.push(new f(-m,0,u*.5)),k.push(new f(-m+u,0,u*.5))):(k.push(new f(m-u,0,-u*.5)),k.push(new f(m,0,-u*.5)),k.push(new f(m,0,u*.5)),k.push(new f(m-u,0,u*.5)));const Q=new V().setFromPoints(k),B=new te({color:s,transparent:!0,opacity:.8}),z=new se(Q,B);z.name=`Bk${j}`,e.add(z),this.disposables.push(Q,B)});const h=new ye(.0045*Se,12,12),g=new F({color:16569165,transparent:!0,opacity:1}),v=new R(h,g);v.name="Dot",e.add(v),this.disposables.push(h,g);const w=.085*Se,M=new V().setFromPoints([new f(0,0,0),new f(0,w,0)]),_=new te({color:s,transparent:!0,opacity:.7,blending:Le}),T=new se(M,_);T.name="Stem",e.add(T),this.disposables.push(M,_);const $=new ye(.0055*Se,10,10),x=new F({color:s,transparent:!0,opacity:.9}),H=new R($,x);H.position.y=w,H.name="Cap",e.add(H),this.disposables.push($,x)}_buildSecondaryMarker(e,s){const t=.009*Se,i=new we(t,t*1.45,36);i.rotateX(Math.PI/2);const a=new F({color:s,side:ue,transparent:!0,opacity:.75}),l=new R(i,a);l.name="Ring",e.add(l),this.disposables.push(i,a);const r=new ye(.0025*Se,10,10),d=new F({color:s,transparent:!0,opacity:.9}),o=new R(r,d);o.name="Dot",e.add(o),this.disposables.push(r,d);const c=.028*Se,m=new V().setFromPoints([new f(0,0,0),new f(0,c,0)]),u=new te({color:s,transparent:!0,opacity:.55}),h=new se(m,u);h.name="Stem",e.add(h),this.disposables.push(m,u)}update(e){}handleClick(e,s){var i;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,s);const t=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(t.length>0){const a=t[0].object.userData.site;if(a)return this.highlightSite(a.id),(i=this.onSelectSiteCallback)==null||i.call(this,a),a}return null}dispose(){this.disposables.forEach(e=>{try{e.dispose()}catch{}}),this.disposables=[]}}function ms(n,e="Ring"){return n==="south-pole"?e==="Stem"?0:.8:n==="site-01"?e==="Stem"||e==="Cap"?.55:.75:e==="Stem"?.4:.6}class qi{constructor(){b(this,"container");b(this,"canvas");b(this,"ctx");b(this,"tooltipEl");b(this,"isVisible",!1);b(this,"selectedSiteId","site-01");b(this,"hoveredSite",null);b(this,"customSelection",null);b(this,"onSelectCallback");b(this,"onApplyAndCalculateCallback");b(this,"onRecenterCallback");b(this,"MAX_EXTENT_M",33e4);b(this,"mapWidth",480);b(this,"mapHeight",480);b(this,"centerX",240);b(this,"centerY",240);b(this,"scalePxPerM",240/33e4);b(this,"terrainImage",null);b(this,"isTerrainImageLoaded",!1);b(this,"site01DetailImage",null);b(this,"isSite01ImageLoaded",!1);this.container=document.createElement("div"),this.container.id="south-pole-explorer-panel",this.container.className="south-pole-explorer hidden",this.container.innerHTML=this.buildHTML(),document.body.appendChild(this.container),this.canvas=this.container.querySelector("#polar-map-canvas"),this.ctx=this.canvas.getContext("2d"),this.tooltipEl=this.container.querySelector("#polar-map-tooltip"),this.resizeCanvas(),this.loadBackdrop(),this.attachEvents()}setOnSelect(e){this.onSelectCallback=e}setOnApplyAndCalculate(e){this.onApplyAndCalculateCallback=e}setOnRecenter(e){this.onRecenterCallback=e}open(){this.isVisible=!0,this.container.classList.remove("hidden"),this.resizeCanvas(),this.draw()}close(){this.isVisible=!1,this.container.classList.add("hidden")}toggle(){return this.isVisible?this.close():this.open(),this.isVisible}getIsOpen(){return this.isVisible}setSelectedSite(e,s,t){e&&ne.some(i=>i.id===e)?(this.selectedSiteId=e,this.customSelection=null):s!==void 0&&t!==void 0&&(this.selectedSiteId="custom",this.customSelection={lat:s,lon:t,elevM:0,isInsideDEM:rt(t,s)}),this.isVisible&&this.draw()}resizeCanvas(){const e=Math.min(520,Math.max(380,window.innerWidth>900?460:360));this.mapWidth=e,this.mapHeight=e,this.canvas.width=e*window.devicePixelRatio,this.canvas.height=e*window.devicePixelRatio,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.ctx.setTransform(1,0,0,1,0,0),this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.centerX=e/2,this.centerY=e/2,this.scalePxPerM=e/2/this.MAX_EXTENT_M}loadBackdrop(){const e=new Image;e.crossOrigin="anonymous",e.src="/generated/south_pole_polar_relief.png",e.onload=()=>{this.terrainImage=e,this.isTerrainImageLoaded=!0,this.isVisible&&this.draw()};const s=new Image;s.crossOrigin="anonymous",s.src="/generated/site01_elev_norm.png",s.onload=()=>{this.site01DetailImage=s,this.isSite01ImageLoaded=!0,this.isVisible&&this.draw()}}buildHTML(){return`
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
`}attachEvents(){var t;(t=this.container.querySelector("#spe-close-btn"))==null||t.addEventListener("click",()=>this.close()),this.canvas.addEventListener("mousemove",i=>this.handleMouseMove(i)),this.canvas.addEventListener("mouseleave",()=>{this.hoveredSite=null,this.tooltipEl.classList.add("hidden"),this.draw()}),this.canvas.addEventListener("click",i=>this.handleClick(i));const e=this.container.querySelector("#spe-btn-apply");e==null||e.addEventListener("click",async()=>{if(!e||e.disabled)return;const i=this.getCurrentSiteData(),a=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spe-spinner"></span> Computing SPICE…';try{let l=!0;if(this.onApplyAndCalculateCallback?l=await this.onApplyAndCalculateCallback(i):this.onSelectCallback&&this.onSelectCallback(i),l===!1)throw new Error("SPICE calculation returned unsuccessful status");e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success"),setTimeout(()=>{e.disabled=!1,e.innerHTML=a,e.classList.remove("spe-btn-success")},2e3)}catch(l){const r=l instanceof Error?l.message:String(l);e.innerHTML="⚠ Calculation Failed",e.classList.add("spe-btn-error"),console.error("[SPE] Apply failed:",r),setTimeout(()=>{e.disabled=!1,e.innerHTML=a,e.classList.remove("spe-btn-error")},3e3)}});const s=this.container.querySelector("#spe-btn-recenter");s==null||s.addEventListener("click",()=>{const i=this.getCurrentSiteData();this.onRecenterCallback&&this.onRecenterCallback({lat:i.latitudeDeg,lon:i.longitudeDeg});const a=s.textContent;s.textContent="✓ 3D Centered",setTimeout(()=>{s.textContent=a},1500)}),window.addEventListener("resize",()=>{this.isVisible&&(this.resizeCanvas(),this.draw())}),window.addEventListener("keydown",i=>{i.key==="Escape"&&this.isVisible&&this.close()})}getCurrentSiteData(){if(this.selectedSiteId==="custom"&&this.customSelection)return{name:"Custom Selected Location",designation:Z(this.customSelection.lat,this.customSelection.lon),latitudeDeg:this.customSelection.lat,longitudeDeg:this.customSelection.lon,elevationM:this.customSelection.elevM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:this.customSelection.isInsideDEM,demDatasetName:this.customSelection.isInsideDEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"};const e=ne.find(s=>s.id===this.selectedSiteId)||ne[0];return{name:e.name,designation:e.designation,latitudeDeg:e.lat,longitudeDeg:e.lon,elevationM:e.elevationM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:!!e.isInsideSite01DEM,demDatasetName:e.isInsideSite01DEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"}}projectMetersToCanvas(e,s){return{cx:this.centerX+e*this.scalePxPerM,cy:this.centerY-s*this.scalePxPerM}}unprojectCanvasToMeters(e,s){return{x:(e-this.centerX)/this.scalePxPerM,y:(this.centerY-s)/this.scalePxPerM}}draw(){const e=this.ctx,s=this.mapWidth,t=this.mapHeight;e.clearRect(0,0,s,t),e.fillStyle="#040711",e.fillRect(0,0,s,t),this.drawTerrainRelief(e),this.drawSite01DEMBoundary(e),this.drawPolarGrid(e),this.drawEphemerisVectors(e),this.drawScaleAndOrientation(e),this.drawTrueSouthPole(e),this.drawCandidateSites(e),this.customSelection&&this.drawCustomSelectionMarker(e),this.updateInfoCard()}drawTerrainRelief(e){if(this.isTerrainImageLoaded&&this.terrainImage)e.save(),e.drawImage(this.terrainImage,0,0,this.mapWidth,this.mapHeight),e.restore();else{const s=e.createRadialGradient(this.centerX,this.centerY,10,this.centerX,this.centerY,this.mapWidth/2);s.addColorStop(0,"#151d2c"),s.addColorStop(.5,"#0f1624"),s.addColorStop(1,"#060a12"),e.fillStyle=s,e.fillRect(0,0,this.mapWidth,this.mapHeight)}}drawSite01DEMBoundary(e){const s=this.projectMetersToCanvas(D.minX,D.maxY),t=this.projectMetersToCanvas(D.maxX,D.maxY),i=this.projectMetersToCanvas(D.maxX,D.minY),a=this.projectMetersToCanvas(D.minX,D.minY),l=t.cx-s.cx,r=a.cy-s.cy;e.save(),this.isSite01ImageLoaded&&this.site01DetailImage&&(e.save(),e.globalAlpha=.85,e.drawImage(this.site01DetailImage,s.cx,s.cy,l,r),e.restore()),e.beginPath(),e.moveTo(s.cx,s.cy),e.lineTo(t.cx,t.cy),e.lineTo(i.cx,i.cy),e.lineTo(a.cx,a.cy),e.closePath(),e.fillStyle="rgba(56, 189, 248, 0.12)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=1.4,e.setLineDash([4,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 DEM [5 m/px]",s.cx+3,s.cy-4),e.restore()}drawPolarGrid(e){[{lat:-80,label:"LAT 80.00°S (OUTER PERIMETER)",color:"rgba(56, 189, 248, 0.38)",dash:[]},{lat:-85,label:"LAT 85.00°S (TRAVERSE RANGE)",color:"rgba(56, 189, 248, 0.32)",dash:[6,4]},{lat:-88,label:"LAT 88.00°S (ARTEMIS CORRIDOR)",color:"rgba(56, 189, 248, 0.32)",dash:[3,3]}].forEach(({lat:a,label:l,color:r,dash:d})=>{const{y:o}=Ie(0,a),c=Math.abs(o)*this.scalePxPerM;e.beginPath(),e.arc(this.centerX,this.centerY,c,0,2*Math.PI),e.strokeStyle=r,e.lineWidth=1,e.setLineDash(d),e.stroke(),e.setLineDash([]),e.fillStyle="rgba(56, 189, 248, 0.85)",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText(l,this.centerX+15,this.centerY-c-3)});const t=this.mapWidth/2;[{angleRad:-Math.PI/2,label:"0° PRIME (TO EARTH)",align:"center",textBaseline:"top",offY:6},{angleRad:0,label:"90°E (EAST LIMB)",align:"right",textBaseline:"middle",offX:-6},{angleRad:Math.PI/2,label:"180° (FAR SIDE)",align:"center",textBaseline:"bottom",offY:-6},{angleRad:Math.PI,label:"270°E (WEST LIMB)",align:"left",textBaseline:"middle",offX:6}].forEach(a=>{const l=this.centerX+Math.cos(a.angleRad)*t,r=this.centerY+Math.sin(a.angleRad)*t;e.beginPath(),e.moveTo(this.centerX,this.centerY),e.lineTo(l,r),e.strokeStyle="rgba(148, 163, 184, 0.22)",e.lineWidth=1,e.stroke();const d=l+(a.offX||0),o=r+(a.offY||0);e.fillStyle="#94a3b8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign=a.align,e.textBaseline=a.textBaseline,e.fillText(a.label,d,o)})}drawEphemerisVectors(e){const s=-Math.PI*.58,t=this.mapWidth*.42,i=this.centerX-10,a=this.centerY+20,l=i+Math.cos(s)*t,r=a+Math.sin(s)*t;e.save(),e.strokeStyle="rgba(245, 158, 11, 0.75)",e.lineWidth=1.2,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,a),e.lineTo(l,r),e.stroke();const d=7,o=Math.PI/7;e.fillStyle="#f59e0b",e.beginPath(),e.moveTo(l,r),e.lineTo(l-d*Math.cos(s-o),r-d*Math.sin(s-o)),e.lineTo(l-d*Math.cos(s+o),r-d*Math.sin(s+o)),e.closePath(),e.fill(),e.save();const c=(i+l)/2,m=(a+r)/2;e.translate(c,m),e.rotate(s+Math.PI/2),e.fillStyle="#f59e0b",e.font='bold 7.5px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("SOLAR INCIDENCE 1.1° EL",0,-4),e.restore();const u=Math.PI*.72,h=this.mapWidth*.38,g=i+Math.cos(u)*h,v=a+Math.sin(u)*h;e.strokeStyle="rgba(248, 113, 113, 0.70)",e.lineWidth=1.2,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,a),e.lineTo(g,v),e.stroke(),e.fillStyle="#f87171",e.beginPath(),e.moveTo(g,v),e.lineTo(g-d*Math.cos(u-o),v-d*Math.sin(u-o)),e.lineTo(g-d*Math.cos(u+o),v-d*Math.sin(u+o)),e.closePath(),e.fill(),e.save();const w=(i+g)/2,M=(a+v)/2;e.translate(w,M),e.rotate(u-Math.PI/2),e.fillStyle="#f87171",e.font='bold 7.5px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("EARTH LOS (OCCULTED -6.3°)",0,-4),e.restore(),e.restore()}drawScaleAndOrientation(e){const t=1e5*this.scalePxPerM,i=20,a=this.mapHeight-20;e.strokeStyle="#94a3b8",e.lineWidth=1.5,e.beginPath(),e.moveTo(i,a),e.lineTo(i+t,a),e.moveTo(i,a-4),e.lineTo(i,a+4),e.moveTo(i+t/2,a-2),e.lineTo(i+t/2,a+2),e.moveTo(i+t,a-4),e.lineTo(i+t,a+4),e.stroke(),e.fillStyle="#94a3b8",e.font='8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("0",i-2,a-6),e.textAlign="center",e.fillText("50 km",i+t/2,a-6),e.textAlign="right",e.fillText("100 km",i+t,a-6);const l=this.mapWidth-32,r=32;e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(l,r,13,0,2*Math.PI),e.stroke(),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(l,r-11),e.lineTo(l-4,r+2),e.lineTo(l+4,r+2),e.closePath(),e.fill(),e.fillStyle="#cbd5e1",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("N (0°)",l,r+11)}drawTrueSouthPole(e){const{cx:s,cy:t}=this.projectMetersToCanvas(0,0);e.save(),e.strokeStyle="#22d3ee",e.lineWidth=1.8,e.beginPath(),e.arc(s,t,6.5,0,2*Math.PI),e.stroke(),e.strokeStyle="rgba(34, 211, 238, 0.65)",e.lineWidth=1,e.beginPath(),e.roundRect(s-10,t-10,20,20,3),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(s,t,2.5,0,2*Math.PI),e.fill();const i=s+22,a=t-6,l=148,r=28;e.strokeStyle="rgba(34, 211, 238, 0.75)",e.lineWidth=1,e.beginPath(),e.moveTo(s+10,t),e.lineTo(i,t),e.stroke(),e.fillStyle="rgba(8, 20, 38, 0.90)",e.strokeStyle="#22d3ee",e.lineWidth=1.2,e.beginPath(),e.roundRect(i,a-5,l,r,4),e.fill(),e.stroke(),e.fillStyle="#22d3ee",e.fillRect(i+6,a+1,5,5),e.font='bold 8.5px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("TRUE SOUTH POLE 90.000°S",i+16,a+6),e.fillStyle="#94a3b8",e.font='7.5px "JetBrains Mono", monospace',e.fillText("DATUM REF · ELEV -0.25 KM",i+16,a+17),e.restore()}drawCandidateSites(e){const t=ne.filter(i=>i.id!=="south-pole").map(i=>{var g;const{x:a,y:l}=Ie(i.lon,i.lat),{cx:r,cy:d}=this.projectMetersToCanvas(a,l),o=i.id===this.selectedSiteId,c=((g=this.hoveredSite)==null?void 0:g.id)===i.id,m=i.id==="site-01",u=m?38:r>=this.centerX?32:-32,h=m?-28:d>=this.centerY?18:-18;return{site:i,cx:r,cy:d,lblX:r+u,lblY:d+h,isSelected:o,isHovered:c}});for(let i=0;i<t.length;i++)for(let a=i+1;a<t.length;a++){const l=t[i],r=t[a],d=Math.abs(l.lblY-r.lblY),o=Math.abs(l.lblX-r.lblX);d<20&&o<110&&(r.lblY+=r.lblY>=l.lblY?18:-18)}t.forEach(({site:i,cx:a,cy:l,lblX:r,lblY:d,isSelected:o,isHovered:c})=>{if(i.id==="site-01"){e.save(),e.strokeStyle=o?"#f59e0b":"rgba(245, 158, 11, 0.70)",e.lineWidth=1.2,e.beginPath(),e.moveTo(a,l);const u=(a+r)/2;e.lineTo(u,l),e.lineTo(r,d),e.stroke(),e.save(),e.translate(a,l),e.rotate(Math.PI/4),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.strokeRect(-7,-7,14,14),e.strokeStyle="rgba(245, 158, 11, 0.60)",e.lineWidth=1,e.strokeRect(-11,-11,22,22),e.restore(),e.fillStyle="#fcd34d",e.beginPath(),e.arc(a,l,3,0,2*Math.PI),e.fill();const h=168,g=28,v=r>a?r:r-h,w=d-14;e.fillStyle="rgba(12, 19, 34, 0.92)",e.strokeStyle=o?"#f59e0b":"rgba(245, 158, 11, 0.75)",e.lineWidth=o?1.4:1,e.beginPath(),e.roundRect(v,w,h,g,4),e.fill(),e.stroke(),e.fillStyle="#f59e0b",e.beginPath(),e.arc(v+10,w+9,3,0,2*Math.PI),e.fill(),e.fillStyle="#f59e0b",e.font='bold 8.5px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 (CONNECTING RIDGE)",v+17,w+11),e.fillStyle="#e2e8f0",e.font='7.5px "JetBrains Mono", monospace',e.fillText("89.463° S, 222.510° E | +1,100m",v+17,w+22),e.restore()}else{const u=o?"#38bdf8":c?"#67e8f9":"#94a3b8";e.save(),e.strokeStyle=o?"rgba(56, 189, 248, 0.85)":"rgba(148, 163, 184, 0.40)",e.lineWidth=1,e.setLineDash(o?[]:[2,2]),e.beginPath(),e.moveTo(a,l);const h=(a+r)/2;e.lineTo(h,l),e.lineTo(r,d),e.stroke(),e.setLineDash([]),e.strokeStyle=u,e.lineWidth=o?1.8:1.2,e.beginPath(),e.arc(a,l,o?5.5:4,0,2*Math.PI),e.stroke(),e.fillStyle=o?"#38bdf8":"#ffffff",e.beginPath(),e.arc(a,l,1.8,0,2*Math.PI),e.fill();const g=(i.elevationM/1e3).toFixed(1),v=i.elevationM>=0?"+":"",w=`${i.name.toUpperCase()} ${Math.abs(i.lat).toFixed(1)}°S (${v}${g}km)`;e.font=o?'bold 8px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const _=e.measureText(w).width+14,T=16,$=r>a?r:r-_,x=d-8;e.fillStyle=o?"rgba(14, 165, 233, 0.25)":"rgba(10, 16, 28, 0.85)",e.strokeStyle=o?"#38bdf8":"rgba(148, 163, 184, 0.35)",e.lineWidth=o?1.2:.8,e.beginPath(),e.roundRect($,x,_,T,3),e.fill(),e.stroke(),e.fillStyle=o?"#38bdf8":"#cbd5e1",e.textAlign="left",e.textBaseline="middle",e.fillText(w,$+7,x+T/2),e.restore()}})}drawCustomSelectionMarker(e){if(!this.customSelection)return;const{x:s,y:t}=Ie(this.customSelection.lon,this.customSelection.lat),{cx:i,cy:a}=this.projectMetersToCanvas(s,t);e.save(),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.beginPath(),e.arc(i,a,7,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(i-9,a),e.lineTo(i+9,a),e.moveTo(i,a-9),e.lineTo(i,a+9),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i,a,2.5,0,2*Math.PI),e.fill(),e.fillStyle="#f59e0b",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("CUSTOM TARGET",i+11,a-3),e.fillStyle="#e2e8f0",e.font='7px "JetBrains Mono", monospace',e.fillText(Z(this.customSelection.lat,this.customSelection.lon),i+11,a+7),e.restore()}handleMouseMove(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;let a=null;const l=13;for(const r of ne){const{x:d,y:o}=Ie(r.lon,r.lat),{cx:c,cy:m}=this.projectMetersToCanvas(d,o);if(Math.hypot(t-c,i-m)<=l){a=r;break}}a?(this.hoveredSite=a,this.canvas.style.cursor="pointer",this.showTooltip(a,e.clientX,e.clientY),this.draw()):(this.hoveredSite=null,this.canvas.style.cursor="crosshair",this.tooltipEl.classList.add("hidden"),this.draw())}showTooltip(e,s,t){const i=lt(e.lat),a=e.isInsideSite01DEM?"★ Validated 5 m/px DEM (NASA Site 01)":"Global LOLA Altimetry (~60 m/px)";this.tooltipEl.innerHTML=`
      <div class="spe-tt-name">${e.name}</div>
      <div class="spe-tt-desig">${e.designation}</div>
      <div class="spe-tt-grid">
        <span>Coords:</span><span>${Z(e.lat,e.lon)}</span>
        <span>Elevation:</span><span>${e.elevationM>=0?"+":""}${e.elevationM.toLocaleString()} m</span>
        <span>Pole Dist:</span><span>${i.toFixed(1)} km</span>
        <span>Dataset:</span><span>${a}</span>
      </div>
      <div class="spe-tt-action">Click to inspect candidate</div>
    `;const l=Math.min(s+14,window.innerWidth-260),r=Math.max(10,Math.min(t-20,window.innerHeight-150));this.tooltipEl.style.left=`${l}px`,this.tooltipEl.style.top=`${r}px`,this.tooltipEl.classList.remove("hidden")}handleClick(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;for(const m of ne){const{x:u,y:h}=Ie(m.lon,m.lat),{cx:g,cy:v}=this.projectMetersToCanvas(u,h);if(Math.hypot(t-g,i-v)<=14){this.selectedSiteId=m.id,this.customSelection=null,this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData());return}}const{x:a,y:l}=this.unprojectCanvasToMeters(t,i);if(Math.hypot(a,l)>this.MAX_EXTENT_M)return;const{lonDeg:d,latDeg:o}=At(a,l),c=rt(d,o);this.selectedSiteId="custom",this.customSelection={lat:Number(o.toFixed(3)),lon:Number(d.toFixed(2)),elevM:0,isInsideDEM:c},this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData())}updateInfoCard(){if(!this.container.querySelector("#spe-info-card"))return;let s="Artemis Site 01",t="Shackleton–de Gerlache Connecting Ridge",i=-89.463,a=222.51,l=1100,r="High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",d=!0,o="CANDIDATE SITE";if(this.selectedSiteId==="custom"&&this.customSelection)s="Custom Selected Location",t="User Chosen Lunar Site",i=this.customSelection.lat,a=this.customSelection.lon,l=this.customSelection.elevM,d=this.customSelection.isInsideDEM,o="CUSTOM LOCATION",r=d?"Location lies within the validated 5 m/px high-resolution Site 01 DEM.":"Location lies outside the 5 m/px DEM footprint. Global LOLA ~60 m/px altimetry will be used for geometric ephemerides.";else{const m=ne.find(u=>u.id===this.selectedSiteId)||ne[0];s=m.name,t=m.designation,i=m.lat,a=m.lon,l=m.elevationM,r=m.description,d=!!m.isInsideSite01DEM,o=m.id==="south-pole"?"GEODETIC DATUM":"VERIFIED CANDIDATE"}const c=lt(i);this.setText("#spe-site-type",o),this.setText("#spe-site-cov",d?"5 m/px High-Resolution DEM":"Global LOLA (~60 m/px)"),this.setText("#spe-site-name",s),this.setText("#spe-site-desig",t),this.setText("#spe-cell-lat",`${i>=0?"+":""}${i.toFixed(3)}° S`),this.setText("#spe-cell-lon",`${a.toFixed(2)}° E`),this.setText("#spe-cell-elev",`${l>=0?"+":""}${l.toLocaleString()} m`),this.setText("#spe-cell-dist",`${c.toFixed(1)} km`),this.setText("#spe-site-desc",r)}setText(e,s){const t=this.container.querySelector(e);t&&(t.textContent=s)}}class Is{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(e,s){s&&(this.selectedFormat=s),this.mode="mission",this.missionContext=e,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(e,s){s&&(this.selectedFormat=s),this.mode="comparison",this.comparisonContext=e,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(e="mission"){this.isOpen?this.close():e==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var i,a,l,r,d,o,c,m;const e=this.mode==="mission",s=e?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",t=e?`${((i=this.missionContext)==null?void 0:i.scenarioName)??"Mission"} · ${((a=this.missionContext)==null?void 0:a.siteName)??"Selected Site"} (${(r=(l=this.missionContext)==null?void 0:l.latitudeDeg)==null?void 0:r.toFixed(3)}°N, ${(o=(d=this.missionContext)==null?void 0:d.longitudeDeg)==null?void 0:o.toFixed(3)}°E)`:`${((c=this.comparisonContext)==null?void 0:c.reportTitle)??"Candidate Comparison"} · ${((m=this.comparisonContext)==null?void 0:m.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
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
      </div>`}return""}wireEvents(){var s,t,i,a;(s=this.container.querySelector("#btn-close-export"))==null||s.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#btn-cancel-export"))==null||t.addEventListener("click",()=>this.close()),(i=this.container.querySelector("#export-backdrop"))==null||i.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(l=>{l.addEventListener("click",()=>{if(this.isGenerating)return;const r=l.getAttribute("data-format")||"pdf";this.selectedFormat=r,this.render()})}),(a=this.container.querySelector("#btn-generate-export"))==null||a.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(e){console.error("[LUNAOPS] Export failed:",e),this.statusMessage={type:"error",text:e.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var r;if(!this.missionContext)throw new Error("Missing mission scenario context.");const e=this.missionContext,s={scenario_name:e.scenarioName||"Artemis Candidate Mission",notes:e.notes||"",site_name:e.siteName||"South Pole Site",latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:e.startUtc,end_utc:e.endUtc,step_minutes:e.stepMinutes,timeline_result:e.timelineResponse||null,horizon_result:e.horizonProfile||null},t=`${_e}/api/export/mission?format=${this.selectedFormat}`,i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok){let d=`HTTP ${i.status}`;try{const o=await i.json();d=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{d=await i.text()}throw new Error(`Export failed: ${d}`)}const a=(e.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await i.blob();this.triggerDownload(d,`lunaops_${a}_report_${l}.pdf`)}else if(this.selectedFormat==="csv"){const d=await i.text(),o=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_${a}_timeseries_${l}.csv`)}else{const d=await i.json(),o=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_${a}_manifest_${l}.json`)}}async exportComparison(){var r;if(!this.comparisonContext)throw new Error("Missing comparison context.");const e=this.comparisonContext;if(!e.scenarios||e.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const s=e.scenarios.map(d=>{let o=`${d.startDate}T${d.startTime}`;o.endsWith("Z")||(o+="Z");let c=`${d.endDate}T${d.endTime}`;return c.endsWith("Z")||(c+="Z"),{id:d.id,name:d.name,latitude_deg:d.latitudeDeg,longitude_deg:d.longitudeDeg,elevation_m:d.elevationM,instrument_height_m:d.instrumentHeightM,start_utc:o,end_utc:c,step_minutes:d.stepMinutes}}),t={report_title:e.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:s,constraints:e.constraints||null,ranking_weights:e.rankingWeights||null,comparison_result:e.comparisonResult||null},i=`${_e}/api/export/comparison?format=${this.selectedFormat}`,a=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok){let d=`HTTP ${a.status}`;try{const o=await a.json();d=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{d=await a.text()}throw new Error(`Comparison export failed: ${d}`)}const l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await a.blob();this.triggerDownload(d,`lunaops_comparison_report_${l}.pdf`)}else if(this.selectedFormat==="csv"){const d=await a.text(),o=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_comparison_matrix_${l}.csv`)}else{const d=await a.json(),o=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_comparison_manifest_${l}.json`)}}triggerDownload(e,s){const t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}class Yi{constructor(){b(this,"metadata",null);b(this,"elevCanvas",null);b(this,"slopeCanvas",null);b(this,"toterrCanvas",null);b(this,"elevCtx",null);b(this,"slopeCtx",null);b(this,"toterrCtx",null);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const e=await fetch("/generated/site01_metadata.json");if(!e.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await e.json();const[s,t,i]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(s),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(t),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(i),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(e){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",e)}})(),this.loadPromise)}loadImage(e){return new Promise((s,t)=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>s(i),i.onerror=a=>t(a),i.src=e})}createCanvasFromImage(e){const s=document.createElement("canvas");s.width=e.width,s.height=e.height;const t=s.getContext("2d",{willReadFrequently:!0});return t&&t.drawImage(e,0,0),s}getMetadata(){return this.metadata}sample(e,s){var d,o;const{x:t,y:i}=Ie(e,s),{px512:a,py512:l,isInside:r}=Oi(t,i);if(!r||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:r,px:a,py:l,xM:t,yM:i};try{const c=this.elevCtx.getImageData(a,l,1,1).data[0],m=((d=this.slopeCtx)==null?void 0:d.getImageData(a,l,1,1).data[0])??0,u=((o=this.toterrCtx)==null?void 0:o.getImageData(a,l,1,1).data[0])??0,h=this.metadata.elev_max_m-this.metadata.elev_min_m,g=this.metadata.elev_min_m+c/255*h,v=m/255*this.metadata.slope_max_deg,w=u/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(g*10)/10,slopeDeg:Math.round(v*10)/10,errorM:Math.round(w*100)/100,px:a,py:l,xM:t,yM:i}}catch{return{isInside:r,px:a,py:l,xM:t,yM:i}}}}const hs=new Yi,N=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class Xi{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"onSiteChangedCallback");this.selectedSite={name:N[0].name,designation:N[0].designation,latitudeDeg:N[0].lat,longitudeDeg:N[0].lon,elevationM:N[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(e){this.onSiteChangedCallback=e}setOnTimelineScrubbed(e){this.onTimelineScrubbedCallback=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(e,s){this.selectedSite.latitudeDeg=Math.round(e*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(s*1e3)/1e3,this.selectedSite.name="Custom Selected Location",this.selectedSite.designation="User Chosen Site",this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}async init(){await hs.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await _s()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const e=this.selectedSite.latitudeDeg,s=this.selectedSite.longitudeDeg,t=hs.sample(s,e);if(this.selectedSite.isInsideSite01DEM=t.isInside,t.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords={px:t.px,py:t.py,gridMax:512},this.selectedSite.polarStereoM={x:t.xM,y:t.yM},t.elevationM!==void 0&&(this.selectedSite.elevationM=t.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:i,y:a}=Ie(s,e);this.selectedSite.polarStereoM={x:i,y:a}}this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const e=`${this.timeline.startDate}T${this.timeline.startTime}Z`,s=Date.parse(e);if(isNaN(s))return;this.timeline.isoUtcStart=new Date(s).toISOString().replace(".000Z","Z");const t=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,i=s+this.timeline.durationValue*t;this.timeline.isoUtcEnd=new Date(i).toISOString().replace(".000Z","Z");const a=new Date(s).getUTCFullYear(),l=new Date(i).getUTCFullYear();this.timeline.isWithinKernelCoverage=a>=1900&&a<=2050&&l>=1900&&l<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var l;const e=[];(l=this.spiceHealth)!=null&&l.initialized?e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const s=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;s>=-90&&s<=90&&t>=-180&&t<=360?e.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${Z(s,t)} · Elevation: ${this.selectedSite.elevationM} m`}):e.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?e.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):e.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let i="READY",a="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return e.some(r=>r.status==="fail")?(i="ERROR",a="One or more required parameters failed validation. Correct items marked in red."):e.some(r=>r.status==="warn")&&(i="READY_WITH_LIMITATIONS",a="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:i,summary:a,checks:e}}toScenarioJSON(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:e,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();this.container.innerHTML=`
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
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(e){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(e);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(e);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.horizonVisibility,t=this.horizonProfile,i=d=>d==="no_obstruction_detected_within_coverage"?"✅":d==="near_horizon_grazing"?"⚠️":d==="blocked_by_local_terrain"?"🪨":d==="blocked_by_lunar_body"?"🌑":"❓",a=d=>d==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":d==="near_horizon_grazing"?"Near-Horizon Grazing":d==="blocked_by_local_terrain"?"Blocked by Terrain":d==="blocked_by_lunar_body"?"Occulted by Moon":d==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",l=d=>d==="no_obstruction_detected_within_coverage"?"#22c55e":d==="near_horizon_grazing"?"#f59e0b":d.startsWith("blocked")?"#ef4444":"#94a3b8",r=(d,o,c)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${l(c.visibility_status)}">
          <span class="geom-body-title">${o} ${d}</span>
          <span class="horizon-badge" style="background: ${l(c.visibility_status)}22; color: ${l(c.visibility_status)}; border: 1px solid ${l(c.visibility_status)}44">
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
                    <p>Current coordinates (${Z(e,s)}) fall outside the 16×16 km Site 01 tile.</p>
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
            ${N.map(i=>`
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
    `}renderTimelineTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.timelineResponse,t=s==null?void 0:s.summary,i=(s==null?void 0:s.samples)??[],a=i[this.scrubbedSampleIndex]??i[0],l=c=>{switch(c){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},r=c=>{switch(c){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},d=c=>{switch(c){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},o=c=>{switch(c){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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
                <div class="timeline-bar-seg" style="flex: ${c.duration_hours}; background: ${d(c.state)};" title="${c.state.replace(/_/g," ")}: ${c.duration_hours}h (${c.start_utc} → ${c.end_utc})"></div>
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
                <div class="timeline-bar-seg" style="flex: ${c.duration_hours}; background: ${o(c.state)};" title="${c.state.replace(/_/g," ")}: ${c.duration_hours}h (${c.start_utc} → ${c.end_utc})"></div>
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
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${l(a.sun.visibility_state)}</span></div>
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
                  <td style="padding:6px;">${l(c.state)}</td>
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
              <td><code>${Z(s,t)}</code></td>
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
    `}openExportModal(e){this.exportPanel||(this.exportPanel=new Is),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},e)}renderExportTab(){const e=this.timelineResponse!==null;return`
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
    `}renderLandingWindowsTab(){const e=this.landingWindowsResponse,s=(e==null?void 0:e.days)??[],t=e==null?void 0:e.scan_params,i=e==null?void 0:e.summary,a=o=>{try{return new Date(o+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return o}},l=(o,c)=>{switch(o){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${c})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${c})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${c})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${c})</span>`}},r=o=>{switch(o){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},d=s.filter(o=>this.landingWindowsFilter==="safe"?o.is_safe_for_landing:this.landingWindowsFilter==="excellent"?o.safety_rating==="excellent":!0);return`
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
          ${s.map(o=>`
            <div class="heatmap-ribbon-seg"
                 style="background: ${r(o.safety_rating)}; flex: 1;"
                 title="${o.date}: ${o.safety_rating.toUpperCase()} (Score: ${o.safety_score}) · Sun: ${o.sunlight.full_hours}h · Earth: ${o.earth_los.full_hours}h">
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
        ${d.map(o=>`
          <div class="window-day-card ${o.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${a(o.date)}</span>
                <span class="window-day-iso">${o.date}</span>
              </div>
              <div>
                ${l(o.safety_rating,o.safety_score)}
              </div>
            </div>

            <div class="window-safe-row">
              ${o.is_safe_for_landing?'<span class="safe-pill pass">✓ Safe for Landing</span>':'<span class="safe-pill fail">⚠️ Marginal Comms/Sun</span>'}
              <span class="window-score-num">Safety: <strong>${o.safety_score}</strong>/100</span>
            </div>

            <div class="score-bar-track">
              <div class="score-bar-fill ${o.safety_rating}" style="width: ${Math.min(100,Math.max(0,o.safety_score))}%;"></div>
            </div>

            <div class="window-day-metrics-grid">
              <div class="window-metric-col">
                <span class="window-metric-header">☀️ SUNLIGHT</span>
                <div class="window-metric-row"><span>Full Sun:</span> <strong>${o.sunlight.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Penumbral:</span> <strong>${o.sunlight.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Darkness:</span> <strong>${o.sunlight.darkness_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${o.sunlight.avg_elevation_deg>=0?"+":""}${o.sunlight.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
              <div class="window-metric-col">
                <span class="window-metric-header">🌍 EARTH LOS</span>
                <div class="window-metric-row"><span>Full LOS:</span> <strong>${o.earth_los.full_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Partial:</span> <strong>${o.earth_los.partial_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Occulted:</span> <strong>${o.earth_los.occulted_hours.toFixed(1)} h</strong></div>
                <div class="window-metric-row"><span>Mean El:</span> <strong>${o.earth_los.avg_elevation_deg>=0?"+":""}${o.earth_los.avg_elevation_deg.toFixed(1)}°</strong></div>
              </div>
            </div>

            <div class="window-card-action">
              <button class="btn-secondary btn-apply-window-date" data-date="${o.date}">
                ⏱ Set as Mission Start Date
              </button>
            </div>
          </div>
        `).join("")}
      </div>
      `:""}
    </div>
    `}drawTerrainCanvas(){setTimeout(()=>{const e=document.getElementById("site01-terrain-canvas");if(!e)return;this.terrainCtx=e.getContext("2d");const s=new Image;s.crossOrigin="anonymous";const t=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";s.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(s,0,0,512,512),this.selectedSite.pixelCoords)){const{px:i,py:a}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(i-14,a),this.terrainCtx.lineTo(i+14,a),this.terrainCtx.moveTo(i,a-14),this.terrainCtx.lineTo(i,a+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(i,a,6,0,2*Math.PI),this.terrainCtx.stroke()}},s.src=t},50)}wireEvents(){var H,P,j,k,Q,B,z,re,Oe,Re,ge,je,Qe,Be;(H=this.container.querySelector("#btn-close-workspace"))==null||H.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(S=>{S.addEventListener("click",E=>{const L=E.currentTarget;this.currentTab=L.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(S=>{S.addEventListener("click",E=>{const A=E.currentTarget.dataset.presetId,X=N.find(Te=>Te.id===A);X&&(this.selectedSite.name=X.name,this.selectedSite.designation=X.designation,this.selectedSite.latitudeDeg=X.lat,this.selectedSite.longitudeDeg=X.lon,this.selectedSite.elevationM=X.elev,this.updateSiteCoverageAndSample(),this.render())})}),(P=this.container.querySelector("#btn-jump-site01"))==null||P.addEventListener("click",()=>{const S=N[0];this.selectedSite.name=S.name,this.selectedSite.designation=S.designation,this.selectedSite.latitudeDeg=S.lat,this.selectedSite.longitudeDeg=S.lon,this.selectedSite.elevationM=S.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(S=>{S.addEventListener("click",E=>{const L=E.currentTarget;this.activeTerrainLayer=L.dataset.layer||"elev",this.render()})});const e=this.container.querySelector("#inp-lat"),s=this.container.querySelector("#inp-lon"),t=this.container.querySelector("#inp-elev"),i=()=>{if(!e||!s||!t)return;const S=parseFloat(e.value),E=parseFloat(s.value),L=parseFloat(t.value);!isNaN(S)&&!isNaN(E)&&(this.selectedSite.latitudeDeg=S,this.selectedSite.longitudeDeg=E,this.selectedSite.elevationM=isNaN(L)?0:L,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};e==null||e.addEventListener("change",i),s==null||s.addEventListener("change",i),t==null||t.addEventListener("change",i);const a=this.container.querySelector("#site01-terrain-canvas");a==null||a.addEventListener("click",S=>{const E=a.getBoundingClientRect(),L=S.clientX-E.left,A=S.clientY-E.top,X=Math.round(L/E.width*512),Te=Math.round(A/E.height*512),{lonDeg:Ct,latDeg:Tt}=Ri(X,Te);this.selectedSite.latitudeDeg=Math.round(Tt*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(Ct*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${X}, ${Te})`,this.updateSiteCoverageAndSample(),this.render()});const l=this.container.querySelector("#inp-start-date"),r=this.container.querySelector("#inp-start-time"),d=this.container.querySelector("#inp-duration-val"),o=this.container.querySelector("#inp-duration-unit"),c=this.container.querySelector("#inp-timestep"),m=()=>{l&&(this.timeline.startDate=l.value),r&&(this.timeline.startTime=r.value),d&&(this.timeline.durationValue=parseInt(d.value,10)||1),o&&(this.timeline.durationUnit=o.value),c&&(this.timeline.timeStepHours=parseFloat(c.value)||1),this.computeIsoTimestamps(),this.render()};l==null||l.addEventListener("change",m),r==null||r.addEventListener("change",m),d==null||d.addEventListener("change",m),o==null||o.addEventListener("change",m),c==null||c.addEventListener("change",m);const u=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const S=Math.round(this.timeline.timeStepHours*60),E=await $i({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:S,refinement_tolerance_sec:60});this.timelineResponse=E,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),E.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(E.samples[0])}catch(S){this.timelineLoading=!1,this.timelineError=S.message??String(S),this.render()}};(j=this.container.querySelector("#btn-calc-timeline"))==null||j.addEventListener("click",u);const h=this.container.querySelector("#inp-timeline-scrubber");h==null||h.addEventListener("input",()=>{var L;const S=parseInt(h.value,10);this.scrubbedSampleIndex=S;const E=(L=this.timelineResponse)==null?void 0:L.samples[S];E&&(this.updateScrubbedReadout(E),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(E))});const g=this.container.querySelector("#inp-scen-name"),v=this.container.querySelector("#inp-scen-notes");g==null||g.addEventListener("input",()=>{this.scenarioName=g.value}),v==null||v.addEventListener("input",()=>{this.scenarioNotes=v.value});const w=async()=>{try{const S=this.container.querySelector("#btn-eval-spice-tab"),E=this.container.querySelector("#btn-eval-spice-footer");S&&(S.disabled=!0,S.textContent="Calculating SPICE..."),E&&(E.disabled=!0,E.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const L=await Cs({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=L,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(S){console.error("[MissionWorkspace] SPICE Calculation Error:",S),this.currentTab="readiness",this.render();const E=this.container.querySelector(".geometry-preview-area");E&&(E.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${S.message||S}</p>
            </div>
          `)}};(k=this.container.querySelector("#btn-eval-spice-tab"))==null||k.addEventListener("click",w),(Q=this.container.querySelector("#btn-eval-spice-footer"))==null||Q.addEventListener("click",w),(B=this.container.querySelector("#btn-eval-horizon"))==null||B.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const S=this.initialGeometry,[E,L]=await Promise.all([Ii({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),Ts({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:S.sun.azimuth_deg,sun_elevation_deg:S.sun.elevation_deg,sun_distance_km:S.sun.distance_km,earth_azimuth_deg:S.earth.azimuth_deg,earth_elevation_deg:S.earth.elevation_deg,earth_distance_km:S.earth.distance_km})]);this.horizonProfile=E,this.horizonVisibility=L,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(S){this.horizonLoading=!1,this.horizonError=S.message??String(S),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const M=()=>{const S=this.toScenarioJSON(),E=new Blob([JSON.stringify(S,null,2)],{type:"application/json"}),L=URL.createObjectURL(E),A=document.createElement("a");A.href=L,A.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,A.click(),URL.revokeObjectURL(L)};(z=this.container.querySelector("#btn-export-scenario"))==null||z.addEventListener("click",M),(re=this.container.querySelector("#btn-open-export-panel-footer"))==null||re.addEventListener("click",()=>this.openExportModal()),(Oe=this.container.querySelector("#btn-open-full-export-dialog"))==null||Oe.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(S=>{S.addEventListener("click",()=>{const E=S.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(E)})}),(Re=this.container.querySelector("#btn-export-scenario-summary"))==null||Re.addEventListener("click",M);const _=this.container.querySelector("#inp-windows-start-date"),T=this.container.querySelector("#inp-windows-end-date");_==null||_.addEventListener("change",()=>{_.value&&(this.landingWindowsStartDate=_.value)}),T==null||T.addEventListener("change",()=>{T.value&&(this.landingWindowsEndDate=T.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(S=>{S.addEventListener("click",E=>{const A=E.currentTarget.dataset.preset;if(A==="30d"){const X=new Date(this.timeline.startDate+"T00:00:00Z"),Te=new Date(X.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=X.toISOString().slice(0,10),this.landingWindowsEndDate=Te.toISOString().slice(0,10)}else A==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):A==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(S=>{S.addEventListener("click",E=>{const A=E.currentTarget.dataset.filter;A&&(this.landingWindowsFilter=A,this.render())})});const $=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const S=await ks({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=S,this.landingWindowsLoading=!1,this.render()}catch(S){this.landingWindowsLoading=!1,this.landingWindowsError=S.message??String(S),this.render()}};(ge=this.container.querySelector("#btn-scan-landing-windows"))==null||ge.addEventListener("click",$),(je=this.container.querySelector("#btn-run-initial-scan"))==null||je.addEventListener("click",$);const x=S=>{this.timeline.startDate=S,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(Qe=this.container.querySelector("#btn-apply-best-window"))==null||Qe.addEventListener("click",S=>{const L=S.currentTarget.dataset.date;L&&x(L)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(S=>{S.addEventListener("click",E=>{const A=E.currentTarget.dataset.date;A&&x(A)})}),(Be=this.container.querySelector("#btn-apply-3d-view"))==null||Be.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const e=document.getElementById("horizon-polar-canvas");if(!e||!this.horizonProfile)return;const s=this.horizonProfile,t=e.getContext("2d");if(!t)return;const i=e.width,a=e.height,l=i/2,r=a/2,d=Math.min(i,a)/2-32;t.clearRect(0,0,i,a),t.fillStyle="#0a0f1e",t.fillRect(0,0,i,a);const o=Math.max(...s.profile.map(h=>h.horizon_elevation_deg),10);[0,o*.25,o*.5,o*.75,o].forEach(h=>{const g=d*(1-h/o);t.beginPath(),t.arc(l,r,Math.max(g,1),0,2*Math.PI),t.strokeStyle="rgba(148,163,184,0.15)",t.lineWidth=1,t.stroke(),h>0&&(t.fillStyle="rgba(148,163,184,0.5)",t.font="10px Inter, sans-serif",t.fillText(`${h.toFixed(1)}°`,l+4,r-g+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([h,g])=>{const v=(Number(g)-90)*Math.PI/180;t.beginPath(),t.moveTo(l,r),t.lineTo(l+d*Math.cos(v),r+d*Math.sin(v)),t.strokeStyle="rgba(148,163,184,0.2)",t.lineWidth=1,t.stroke(),t.fillStyle="#94a3b8",t.font="bold 11px Inter, sans-serif",t.fillText(String(h),l+(d+16)*Math.cos(v)-4,r+(d+16)*Math.sin(v)+4)}),t.beginPath(),s.profile.forEach((h,g)=>{const v=(h.azimuth_deg-90)*Math.PI/180,w=d*(1-Math.min(h.horizon_elevation_deg,o)/o),M=l+w*Math.cos(v),_=r+w*Math.sin(v);g===0?t.moveTo(M,_):t.lineTo(M,_)}),t.closePath(),t.fillStyle="rgba(56,189,248,0.15)",t.fill(),t.strokeStyle="#38bdf8",t.lineWidth=2,t.stroke();const u=this.horizonVisibility;if(u){const h=(g,v,w,M)=>{const _=(g-90)*Math.PI/180,T=d*(1-Math.max(0,Math.min(v,o))/o),$=l+T*Math.cos(_),x=r+T*Math.sin(_);t.beginPath(),t.arc($,x,8,0,2*Math.PI),t.fillStyle=w,t.fill(),t.fillStyle="#fff",t.font="bold 10px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(M,$,x),t.textAlign="start",t.textBaseline="alphabetic"};h(u.sun.azimuth_deg,u.sun.geometric_elevation_deg,"#f59e0b","☀"),h(u.earth.azimuth_deg,u.earth.geometric_elevation_deg,"#3b82f6","🌍")}t.beginPath(),t.arc(l,r,4,0,2*Math.PI),t.fillStyle="#38bdf8",t.fill()}updateScrubbedReadout(e){var d,o;const s=this.container.querySelector("#scrubbed-time-val");s&&(s.textContent=e.timestamp_utc);const t=c=>{switch(c){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},i=c=>{switch(c){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},a=this.container.querySelector("#scrubbed-sun-state");a&&(a.innerHTML=t(e.sun.visibility_state));const l=this.container.querySelector("#scrubbed-earth-state");l&&(l.innerHTML=i(e.earth.visibility_state));const r=this.container.querySelector("#scrubbed-conditions-panel");if(r){const c=(d=r.querySelectorAll(".scrubbed-col")[0])==null?void 0:d.querySelectorAll(".scrubbed-val-row strong");if(c&&c.length>=4){c[0].textContent=`${e.sun.azimuth_deg.toFixed(2)}°`,c[1].textContent=`${e.sun.elevation_deg.toFixed(2)}°`,c[2].textContent=e.sun.terrain_horizon_elevation_deg!==null?`${e.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=e.sun.angular_clearance_deg;c[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",c[3].style.color=(u??0)>=0?"#22c55e":"#ef4444"}const m=(o=r.querySelectorAll(".scrubbed-col")[1])==null?void 0:o.querySelectorAll(".scrubbed-val-row strong");if(m&&m.length>=4){m[0].textContent=`${e.earth.azimuth_deg.toFixed(2)}°`,m[1].textContent=`${e.earth.elevation_deg.toFixed(2)}°`,m[2].textContent=e.earth.terrain_horizon_elevation_deg!==null?`${e.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=e.earth.angular_clearance_deg;m[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",m[3].style.color=(u??0)>=0?"#3b82f6":"#ef4444"}}}}class Vi{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new Is),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(e){this.onInspectSiteOnGlobe=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:N[0].lat,longitudeDeg:N[0].lon,elevationM:N[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:N[3].lat,longitudeDeg:N[3].lon,elevationM:N[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(e){var i,a,l,r;const s=N.find(d=>d.id===e)||N[0],t=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${t} · ${s.name}`,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elev,instrumentHeightM:2,startDate:((i=this.scenarios[0])==null?void 0:i.startDate)||"2026-10-16",startTime:((a=this.scenarios[0])==null?void 0:a.startTime)||"12:00:00",endDate:((l=this.scenarios[0])==null?void 0:l.endDate)||"2026-10-23",endTime:((r=this.scenarios[0])==null?void 0:r.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(e){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(s=>s.id!==e),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=this.scenarios.map(t=>({id:t.id,name:t.name,latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:`${t.startDate}T${t.startTime}Z`,end_utc:`${t.endDate}T${t.endTime}Z`,step_minutes:t.stepMinutes})),s=await Pi({scenarios:e,constraints:this.constraints});this.comparisonResult=s}catch(e){this.errorMessage=e.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
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
          ${N.map(i=>`<option value="${i.id}" ${i.name.includes(e.name.split("·")[0].trim())?"selected":""}>${i.name} (${i.lat}°S, ${i.lon}°E)</option>`).join("")}
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
                  <strong>${Z(s.inputs.latitude_deg,s.inputs.longitude_deg)}</strong>
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
    `}drawSynchronizedTimelines(){const e=document.getElementById("synced-timeline-canvas");if(!e||!this.comparisonResult)return;const s=e.getContext("2d");if(!s)return;const t=e.width,i=e.height;s.clearRect(0,0,t,i);const a=this.comparisonResult.scenarios;if(a.length===0)return;const l=Math.floor((i-40)/a.length);s.fillStyle="#94a3b8",s.font="10px JetBrains Mono, monospace",s.fillText("MISSION TIMELINE EPOCHS",15,18),a.forEach((r,d)=>{const o=30+d*l,c=l-12;s.fillStyle="#e2e8f0",s.font="11px Inter, sans-serif",s.fillText(`${r.scenario_name}`,15,o-4),s.fillStyle="rgba(15, 23, 42, 0.6)",s.fillRect(15,o,t-30,c);const m=r.timeline_result.sun_windows,u=Date.parse(r.inputs.start_utc),g=Date.parse(r.inputs.end_utc)-u;g>0&&(m.forEach(w=>{const M=Date.parse(w.start_utc),_=Date.parse(w.end_utc),T=15+(M-u)/g*(t-30),$=15+(_-u)/g*(t-30),x=Math.max(1,$-T);w.state==="full_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.9)":w.state==="partial_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.5)":w.state==="total_darkness"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,o,x,c/2-1)}),r.timeline_result.earth_windows.forEach(w=>{const M=Date.parse(w.start_utc),_=Date.parse(w.end_utc),T=15+(M-u)/g*(t-30),$=15+(_-u)/g*(t-30),x=Math.max(1,$-T);w.state==="full_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.9)":w.state==="centre_only_los"||w.state==="partial_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.5)":w.state==="occulted"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(T,o+c/2+1,x,c/2-2)})),s.strokeStyle="rgba(148, 163, 184, 0.15)",s.strokeRect(15,o,t-30,c)})}wireEvents(){var e,s,t,i,a,l,r,d;(e=document.getElementById("btn-close-comparison"))==null||e.addEventListener("click",()=>{this.close()}),(s=document.getElementById("btn-add-candidate"))==null||s.addEventListener("click",()=>{this.addScenario()}),(t=document.getElementById("btn-sync-dates"))==null||t.addEventListener("click",()=>{if(this.scenarios.length>=2){const o=this.scenarios[0];for(let c=1;c<this.scenarios.length;c++)this.scenarios[c].startDate=o.startDate,this.scenarios[c].startTime=o.startTime,this.scenarios[c].endDate=o.endDate,this.scenarios[c].endTime=o.endTime;this.render()}}),(i=document.getElementById("btn-run-comparison"))==null||i.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(o=>{o.addEventListener("click",c=>{const m=c.currentTarget.getAttribute("data-id");m&&this.removeScenario(m)})}),this.container.querySelectorAll(".select-preset").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=m.getAttribute("data-id"),h=m.value,g=N.find(v=>v.id===h);if(u&&g){const v=this.scenarios.find(w=>w.id===u);v&&(v.name=g.name,v.latitudeDeg=g.lat,v.longitudeDeg=g.lon,v.elevationM=g.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(o=>{o.addEventListener("input",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.name=m.value)})}),this.container.querySelectorAll(".input-lat").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.latitudeDeg=parseFloat(m.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.longitudeDeg=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.elevationM=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.startDate=m.value)})}),this.container.querySelectorAll(".input-end-date").forEach(o=>{o.addEventListener("change",c=>{const m=c.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.endDate=m.value)})}),(a=document.getElementById("constraint-min-sun"))==null||a.addEventListener("change",o=>{const c=o.currentTarget.value;this.constraints.min_sunlight_percent=c!==""?parseFloat(c):null}),(l=document.getElementById("constraint-min-earth"))==null||l.addEventListener("change",o=>{const c=o.currentTarget.value;this.constraints.min_earth_los_percent=c!==""?parseFloat(c):null}),(r=document.getElementById("constraint-max-slope"))==null||r.addEventListener("change",o=>{const c=o.currentTarget.value;this.constraints.max_slope_deg=c!==""?parseFloat(c):null}),(d=document.getElementById("constraint-max-dark"))==null||d.addEventListener("change",o=>{const c=o.currentTarget.value;this.constraints.max_continuous_darkness_hours=c!==""?parseFloat(c):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(o=>{o.addEventListener("click",c=>{const m=c.currentTarget.getAttribute("data-id"),u=this.scenarios.find(h=>h.id===m);u&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:u.name,lat:u.latitudeDeg,lon:u.longitudeDeg,elevationM:u.elevationM})})})}}const Ue=1.6,$s=1737.4,Nt=-8.9815,Ps=10.6855,Ki=Ps-Nt,gs=512,Zi=132361;let me=null,W,Me=null,oe=null,J=null,ce=null,O=null,ft=null,St=null,Y=null,K=null,it=!1,ht=.6,at=!1,De=!1,As=-89.463,Os=222.51,Ze=null,vs=null,gt=null,Ae=null,pe=null;function yt(n,e,s=1.2){pe={startPos:he.position.clone(),targetPos:n.clone(),startLook:ie.target.clone(),targetLook:e.clone(),startTime:performance.now(),duration:s*1e3}}const Je=document.createElement("canvas"),Ji=document.getElementById("app");Ji.appendChild(Je);const de=new ci({canvas:Je,antialias:!0,powerPreference:"high-performance"});de.setSize(window.innerWidth,window.innerHeight);de.setPixelRatio(Math.min(window.devicePixelRatio,2));de.outputColorSpace=ys;de.toneMapping=di;de.toneMappingExposure=.95;de.shadowMap.enabled=!1;const He=new pi;He.background=new ui(Zi);const he=new mi(36,window.innerWidth/window.innerHeight,.01,500);he.position.set(0,.2,4);const ie=new Li(he,de.domElement);ie.enableDamping=!0;ie.dampingFactor=.06;ie.minDistance=1.75;ie.maxDistance=12;ie.enablePan=!1;ie.rotateSpeed=.45;ie.zoomSpeed=.7;let Ft=!1;ie.addEventListener("start",()=>{Ft=!0});ie.addEventListener("end",()=>{Ft=!1});const Qi=new hi(395539,.04);He.add(Qi);const dt=new ws(16775406,3.4);dt.position.set(5,1.2,3.2);He.add(dt);const zt=new ws(2241365,.035);zt.position.set(-5,0,-3.2);He.add(zt);const pt=new gi(de),ea=new vi(He,he);pt.addPass(ea);const Rs=new bi(new U(window.innerWidth,window.innerHeight),.08,.4,.92);pt.addPass(Rs);const ta={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
  `},sa=new fi(ta);pt.addPass(sa);function ia(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:e,rMin:s,rMax:t,size:i,opacity:a})=>{const l=new Float32Array(e*3);for(let o=0;o<e;o++){const c=Math.random()*Math.PI*2,m=Math.acos(2*Math.random()-1),u=s+Math.random()*(t-s);l[o*3]=u*Math.sin(m)*Math.cos(c),l[o*3+1]=u*Math.sin(m)*Math.sin(c),l[o*3+2]=u*Math.cos(m)}const r=new V;r.setAttribute("position",new yi(l,3));const d=new wi({size:i,color:14215423,transparent:!0,opacity:a,sizeAttenuation:!0});He.add(new Ei(r,d))})}ia();const ct=document.createElement("div");ct.id="loading-overlay";ct.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(ct);function Fe(n,e){const s=document.getElementById("load-status");if(s&&(s.textContent=n),e!==void 0){const t=document.getElementById("progress-fill");t&&(t.style.width=`${Math.min(100,e)}%`)}}function aa(){ct.style.opacity="0",setTimeout(()=>ct.remove(),700)}const na=1.8;function oa(n,e){return new Ci({map:n,normalMap:e||void 0,normalScale:e?new U(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function ra(n,e,s,t,i){const a=(n%1+1)%1*(s-1),l=Pt.clamp(1-e,0,1)*(t-1),r=Math.floor(a),d=(r+1)%s,o=Math.floor(l),c=Math.min(o+1,t-1),m=a-r,u=l-o,h=i[(o*s+r)*4]/255,g=i[(o*s+d)*4]/255,v=i[(c*s+r)*4]/255,w=i[(c*s+d)*4]/255,M=h*(1-m)+g*m,_=v*(1-m)+w*m,T=M*(1-u)+_*u;return Nt+T*Ki}function la(n,e){const s=n.attributes.position,t=n.attributes.uv,i=s.count,a=document.createElement("canvas");a.width=e.width,a.height=e.height;const l=a.getContext("2d");l.drawImage(e,0,0);const d=l.getImageData(0,0,a.width,a.height).data;vs=new Float32Array(s.array.length),vs.set(s.array),Ze=new Float32Array(i),gt=new Float32Array(s.array.length);const o=new f,c=new f,m=na;for(let u=0;u<i;u++){o.fromBufferAttribute(s,u);const h=t.getX(u),g=t.getY(u),v=ra(h,g,a.width,a.height,d);Ze[u]=v;const w=v/$s*Ue;c.copy(o).normalize();const M=o.clone().add(c.clone().multiplyScalar(w));gt[u*3]=M.x,gt[u*3+1]=M.y,gt[u*3+2]=M.z,o.add(c.multiplyScalar(w*m)),s.setXYZ(u,o.x,o.y,o.z)}s.needsUpdate=!0,n.computeVertexNormals(),n.computeBoundingSphere()}function ca(n){return n.colorSpace=ys,n.anisotropy=de.capabilities.getMaxAnisotropy(),n.minFilter=ki,n.magFilter=xi,n.generateMipmaps=!0,n.wrapS=Es,n.wrapT=Ms,n.needsUpdate=!0,n}const bs=new Si;async function da(){const n=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,e=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:n,label:"NASA LROC 2K",is4K:!1}];let s=null,t="NASA LROC 2K",i=!1;for(const r of e)try{Fe(`Loading ${r.label}…`,25),s=await new Promise((d,o)=>{bs.load(r.url,c=>d(c),void 0,c=>o(c))}),ca(s),t=r.label,i=r.is4K;break}catch{}if(!s)throw new Error("All color texture candidates failed to load.");Fe("Loading LOLA normal map…",50);let a=null;try{a=await new Promise((r,d)=>{bs.load("/generated/ldem_normal_map_half.png",o=>{o.colorSpace=_i,o.anisotropy=de.capabilities.getMaxAnisotropy(),o.wrapS=Es,o.wrapT=Ms,r(o)},void 0,d)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}Fe("Loading LOLA DEM topography…",75);let l=null;try{l=await new Promise((r,d)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>r(o),o.onerror=d,o.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:s,colorLabel:t,is4K:i,normal:a,dispImg:l}}let Ns={is4K:!0};async function pa(){const n=await da();Ns={label:n.colorLabel,is4K:n.is4K};const e=document.getElementById("telem-color");e&&(e.textContent=n.is4K?"NASA LROC 4K":"NASA LROC 2K"),Fe("Generating lunar mesh…",85),await new Promise(i=>setTimeout(i,40));const s=new ye(Ue,gs,gs/2);n.dispImg&&la(s,n.dispImg),Fe("Configuring shaders…",95),await new Promise(i=>setTimeout(i,40));const t=oa(n.color,n.normal);me=new R(s,t),me.castShadow=!1,me.receiveShadow=!1,W=new $e,W.rotation.x=Pt.degToRad(6.68),W.add(me),Me=new Wi(Ue),Me.setOnSelectSite(i=>{Ce({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})}),W.add(Me.group),ua(),ma(),He.add(W),Fe("Ready",100),setTimeout(aa,400)}function ua(){Y=new $e,Y.name="HoverReticle",Y.visible=!1;const n=new we(.012,.015,32);n.rotateX(Math.PI/2);const e=new F({color:3718648,side:ue,transparent:!0,opacity:.8}),s=new R(n,e);Y.add(s);const t=new Ti(.003,16);t.rotateX(Math.PI/2);const i=new F({color:16777215,side:ue});Y.add(new R(t,i)),W.add(Y)}function ma(){K=new $e,K.name="PendingSelectionMarker",K.visible=!1;const n=new we(.018,.024,32);n.rotateX(Math.PI/2);const e=new F({color:16096779,side:ue,transparent:!0,opacity:.95});K.add(new R(n,e));const s=new V().setFromPoints([new f(0,0,0),new f(0,.06,0)]),t=new te({color:16096779,transparent:!0,opacity:.85});K.add(new se(s,t)),W.add(K)}pa().catch(n=>{console.error("[LUNAOPS] Build error:",n),Fe("Failed to initialize — see console",0)});const Ut=document.createElement("div");Ut.id="ui-layer";Ut.innerHTML=`
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
<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO / LOLA / LROC</span>
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${Ns.is4K?"NASA LROC 4K":"NASA LROC 2K"}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Nt.toFixed(1)} to +${Ps.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${$s} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(Ut);zi({sunLight:dt,earthshineLight:zt});oe=new qi;oe.setOnSelect(n=>{Ce(n,!1,!1)});oe.setOnApplyAndCalculate(async n=>(Ce(n,!1,!1),await bt(n.latitudeDeg,n.longitudeDeg,`${n.name} · ${n.designation}`)));oe.setOnRecenter(n=>{zs(n.lat,n.lon)});J=new Xi;document.getElementById("btn-new-mission").addEventListener("click",()=>{J==null||J.toggle()});ce=new Vi;document.getElementById("btn-compare-sites").addEventListener("click",()=>{ce==null||ce.toggle()});ce.setOnInspectSiteOnGlobe(n=>{Ce({name:n.name,designation:"Candidate Site",latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:n.elevationM,isInsideSite01DEM:n.lat<=-89.4&&n.lat>=-89.55&&n.lon>=221&&n.lon<=224})});J.setOnSiteChanged(n=>{Fs(n)});J.setOnTimelineScrubbed(n=>{const[e,s,t]=It(n.sun.direction_unit),i=8;dt.position.set(e*i,s*i,t*i);const a=document.getElementById("telem-sun-az");a&&(a.textContent=`${n.sun.azimuth_deg.toFixed(1)}° / ${n.sun.elevation_deg.toFixed(1)}°`);const l=document.getElementById("utc-clock");l&&(l.textContent=n.timestamp_utc),Fi(n.timestamp_utc)});function Ce(n,e=!0,s=!0){As=n.latitudeDeg,Os=n.longitudeDeg,Fs(n,s);const t=ne.find(i=>Math.abs(i.lat-n.latitudeDeg)<.05&&Math.abs(i.lon-n.longitudeDeg)<.05);Me&&Me.highlightSite(t?t.id:null),oe&&oe.setSelectedSite(t?t.id:null,n.latitudeDeg,n.longitudeDeg),document.querySelectorAll(".cand-btn").forEach(i=>{i.classList.toggle("active",(t==null?void 0:t.id)===i.dataset.site)}),J&&J.setCoordinatesFromGlobe(n.latitudeDeg,n.longitudeDeg),e&&W&&zs(n.latitudeDeg,n.longitudeDeg)}function Fs(n,e=!0){if(!W)return;if(!O){O=new $e,O.name="TargetSiteMarker";const d=new we(.04,.045,64);d.rotateX(Math.PI/2);const o=new F({color:3718648,side:ue,transparent:!0,opacity:.28,blending:Le});St=new R(d,o),O.add(St);const c=new we(.028,.032,64,1,0,Math.PI*1.3);c.rotateX(Math.PI/2);const m=new F({color:8246268,side:ue,transparent:!0,opacity:.7,blending:Le});ft=new R(c,m),O.add(ft);const u=new we(.019,.023,48);u.rotateX(Math.PI/2);const h=new F({color:3718648,side:ue,transparent:!0,opacity:.95});O.add(new R(u,h));const g=new we(.009,.012,32);g.rotateX(Math.PI/2);const v=new F({color:8246268,side:ue,transparent:!0,opacity:.9});O.add(new R(g,v)),[[-1,0],[1,0],[0,-1],[0,1]].forEach(([k,Q])=>{const B=[new f(k*.006,0,Q*.006),new f(k*.016,0,Q*.016)],z=new V().setFromPoints(B),re=new te({color:3718648,transparent:!0,opacity:.9});O.add(new se(z,re))});const w=.03,M=.009;[[1,-1],[-1,-1],[1,1],[-1,1]].forEach(([k,Q])=>{const B=k*w*.707,z=Q*w*.707,re=[new f(B,0,z-Q*M),new f(B,0,z),new f(B-k*M,0,z)],Oe=new V().setFromPoints(re),Re=new te({color:3718648,transparent:!0,opacity:.85});O.add(new se(Oe,Re))});const _=new ye(.006,16,16),T=new F({color:16777215});O.add(new R(_,T));const $=new V().setFromPoints([new f(0,0,0),new f(0,.11,0)]),x=new te({color:3718648,transparent:!0,opacity:.85,blending:Le});O.add(new se($,x));const H=new ye(.009,12,12),P=new F({color:3718648}),j=new R(H,P);j.position.y=.11,O.add(j),W.add(O)}const s=Ne(n.latitudeDeg,n.longitudeDeg,Ue*1.002);O.position.copy(s),O.visible=!De;const t=s.clone().normalize();O.quaternion.setFromUnitVectors(new f(0,1,0),t);const i=document.getElementById("active-site-display");i&&(i.textContent=`${n.name} · ${n.designation}`);const a=document.getElementById("readout-coords"),l=document.getElementById("readout-elev"),r=document.getElementById("readout-pole-dist");if(a&&(a.textContent=Z(n.latitudeDeg,n.longitudeDeg)),l&&(l.textContent=`${n.elevationM>=0?"+":""}${(n.elevationM/1e3).toFixed(2)} km`),r){const d=lt(n.latitudeDeg);r.textContent=`${d.toFixed(1)} km to 90°S`}if(e)return bt(n.latitudeDeg,n.longitudeDeg,`${n.name} · ${n.designation}`)}function zs(n,e){W.updateMatrixWorld(!0);const t=Ne(n,e,Ue).clone().applyMatrix4(W.matrixWorld),i=t.clone().normalize(),a=t.clone().add(i.clone().multiplyScalar(.85));yt(a,t,1.2)}function Us(){if(De=!De,document.getElementById("btn-south-pole").classList.toggle("active",De),oe&&(De?oe.open():oe.close()),O&&(O.visible=!De),De){W.updateMatrixWorld(!0);const s=new f(0,-Ue,0).clone().applyMatrix4(W.matrixWorld),i=s.clone().normalize().clone().multiplyScalar(2.65);i.addScaledVector(new f(1,0,0),.15),i.addScaledVector(new f(0,0,1),.15),yt(i,s,1.3)}else yt(new f(0,.2,4),new f(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",Us);document.getElementById("btn-reset").addEventListener("click",()=>{var n;De=!1,(n=document.getElementById("btn-south-pole"))==null||n.classList.remove("active"),oe==null||oe.close(),O&&(O.visible=!0),yt(new f(0,.2,4),new f(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{it=!it;const n=document.getElementById("btn-auto");n.textContent=it?"⏸ Auto-Rotate":"▶ Auto-Rotate",n.classList.toggle("active",it)});document.getElementById("btn-sun").addEventListener("click",()=>{at=!at;const n=document.getElementById("btn-sun");n.classList.toggle("active",at),n.textContent=at?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.site,s=ne.find(t=>t.id===e);s&&Ce({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})})});const Ht=document.getElementById("coords-modal"),Ke=document.getElementById("manual-lat"),Mt=document.getElementById("manual-lon"),ze=document.getElementById("coords-error-msg"),ha=document.getElementById("coords-preview-line");function ga(){Ke.value=As.toFixed(3),Mt.value=Os.toFixed(2),ze.style.display="none",jt(),Ht.style.display="flex",setTimeout(()=>{Ke.focus(),Ke.select()},40)}function _t(){Ht.style.display="none",ze.style.display="none"}function Hs(){const n=Ot(Ke.value,Mt.value);if(!n.valid){ze.textContent=n.error||"Invalid coordinates.",ze.style.display="block";return}_t(),rt(n.lon,n.lat),Ce({name:"Manual Coordinate Target",designation:Z(n.lat,n.lon),latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:0})}document.getElementById("btn-manual-coords").addEventListener("click",ga);document.getElementById("btn-close-coords-modal").addEventListener("click",_t);document.getElementById("btn-cancel-manual-coords").addEventListener("click",_t);document.getElementById("btn-apply-manual-coords").addEventListener("click",Hs);Ht.addEventListener("keydown",n=>{n.key==="Escape"?(n.stopPropagation(),_t()):n.key==="Enter"&&(n.preventDefault(),Hs())});function jt(){const n=Ot(Ke.value,Mt.value);if(!n.valid)ze.textContent=n.error||"Invalid coordinates.",ze.style.display="block";else{ze.style.display="none";const e=n.lat<=-80,s=lt(n.lat);ha.innerHTML=`Format: <strong>${Z(n.lat,n.lon)}</strong><br />Region: <strong>${e?"South Polar Region (80°S–90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${s.toFixed(1)} km</strong>`}}Ke.addEventListener("input",jt);Mt.addEventListener("input",jt);const wt=new Ss,Et=new U;let js=new U,Bs=0,Bt=!1,Gt=!1;Je.addEventListener("pointerdown",n=>{js.set(n.clientX,n.clientY),Bs=performance.now(),Bt=!1});Je.addEventListener("pointermove",n=>{js.distanceTo(new U(n.clientX,n.clientY))>5&&(Bt=!0),Et.x=n.clientX/window.innerWidth*2-1,Et.y=-(n.clientY/window.innerHeight)*2+1,Gt=!0});Je.addEventListener("pointerleave",()=>{Gt=!1,Y&&(Y.visible=!1)});Je.addEventListener("click",n=>{if(Bt||performance.now()-Bs>350)return;if(Me){const s=Me.handleClick(n,he);if(s){Ce({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM});return}}if(!me)return;wt.setFromCamera(Et,he);const e=wt.intersectObject(me);if(e.length>0){const s=e[0],t=me.worldToLocal(s.point.clone()),{latDeg:i,lonDeg:a}=Ds(t),l=document.getElementById("readout-coords");l&&!Ae&&(l.textContent=Z(i,a));let r=0;if(s.face&&Ze&&(r=Ze[s.face.a]??0),Ae={latDeg:i,lonDeg:a,elevKm:r},K){const u=Ne(i,a,Ue*1.002);K.position.copy(u);const h=u.clone().normalize();K.quaternion.setFromUnitVectors(new f(0,1,0),h),K.visible=!0}const d=document.getElementById("selection-confirm-toast"),o=document.getElementById("toast-coords-text"),c=document.getElementById("toast-elev-text");o.textContent=Z(i,a);const m=lt(i);c.textContent=`Elevation: ${r>=0?"+":""}${r.toFixed(2)} km · Distance to 90°S: ${m.toFixed(1)} km`,d.style.display="block"}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(Ae){const{latDeg:n,lonDeg:e,elevKm:s}=Ae;Ce({name:"Custom Lunar Target",designation:Z(n,e),latitudeDeg:n,longitudeDeg:e,elevationM:s*1e3})}document.getElementById("selection-confirm-toast").style.display="none",K&&(K.visible=!1),Ae=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",K&&(K.visible=!1),Ae=null});function va(){if(!Gt||!me||!Y){Y&&(Y.visible=!1);return}wt.setFromCamera(Et,he);const n=wt.intersectObject(me);if(n.length>0){const e=n[0],s=me.worldToLocal(e.point.clone()),{latDeg:t,lonDeg:i}=Ds(s),a=document.getElementById("readout-coords");a&&!Ae&&(a.textContent=Z(t,i));const l=s.clone().normalize();if(Y.position.copy(s.clone().multiplyScalar(1.0015)),Y.quaternion.setFromUnitVectors(new f(0,1,0),l),Y.visible=!0,e.face&&Ze){const r=Ze[e.face.a],d=document.getElementById("readout-elev");d&&!Ae&&(d.textContent=`${r>=0?"+":""}${r.toFixed(2)} km`)}}else Y.visible=!1}window.addEventListener("keydown",n=>{var e,s,t;if(!(n.target instanceof HTMLInputElement||n.target instanceof HTMLTextAreaElement))switch(n.key.toLowerCase()){case" ":n.preventDefault(),(e=document.getElementById("btn-auto"))==null||e.click();break;case"p":n.preventDefault(),Us();break;case"r":n.preventDefault(),(s=document.getElementById("btn-reset"))==null||s.click();break;case"s":n.preventDefault(),(t=document.getElementById("btn-sun"))==null||t.click();break;case"m":n.preventDefault(),J==null||J.toggle();break;case"c":n.preventDefault(),ce==null||ce.toggle();break}});function ba(){const n=window.innerWidth,e=window.innerHeight;he.aspect=n/e,he.updateProjectionMatrix(),de.setSize(n,e),pt.setSize(n,e),Rs.resolution.set(n,e)}window.addEventListener("resize",ba);Ce({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100},!1);const fs=new Mi;function Gs(){requestAnimationFrame(Gs);const n=fs.getDelta(),e=fs.getElapsedTime();if(ie.update(),pe){const t=performance.now()-pe.startTime,i=Math.min(1,t/pe.duration),a=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;he.position.lerpVectors(pe.startPos,pe.targetPos,a),ie.target.lerpVectors(pe.startLook,pe.targetLook,a),ie.update(),i>=1&&(pe=null)}if(Me&&Me.update(e),ft&&(ft.rotation.y=e*1.8),St){const t=.22+.12*Math.sin(e*2.2);St.material.opacity=t}const s=!!(J!=null&&J.getIsOpen())||!!(ce!=null&&ce.getIsOpen());if(W&&it&&!Ft&&!pe&&!s&&(W.rotation.y+=.02*n),at){ht+=.12*n;const t=8;dt.position.set(Math.cos(ht)*t,Math.sin(ht*.25)*2,Math.sin(ht)*t)}va(),pt.render()}Gs();
