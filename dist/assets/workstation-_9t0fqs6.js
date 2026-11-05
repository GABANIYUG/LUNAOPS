var pi=Object.defineProperty;var ui=(a,e,s)=>e in a?pi(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var b=(a,e,s)=>ui(a,typeof e!="symbol"?e+"":e,s);import{X as hi,d as S,Y as We,Z as qe,_ as ms,$ as gs,V as U,a0 as mi,a1 as gi,l as Tt,a2 as ks,G as Pe,B as Z,a3 as ie,g as De,a4 as ae,v as Me,r as z,o as ge,M as R,j as Ee,W as vi,S as xs,A as bi,a as fi,C as Si,b as yi,i as wi,D as Ls,E as Ei,R as Mi,U as _i,c as Ci,T as Ti,e as ki,f as xi,h as Li,z as Di,N as Ii,K as Ds,J as Is,n as Pi,x as $i,a5 as Ai,a6 as Oi}from"./UnrealBloomPass-CF8Vl7q6.js";const vs={type:"change"},$t={type:"start"},bs={type:"end"},mt=new mi,fs=new gi,Ri=Math.cos(70*Tt.DEG2RAD);class Ni extends hi{constructor(e,s){super(),this.object=e,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:We.ROTATE,MIDDLE:We.DOLLY,RIGHT:We.PAN},this.touches={ONE:qe.ROTATE,TWO:qe.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(p){p.addEventListener("keydown",Pt),this._domElementKeyEvents=p},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pt),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(vs),t.update(),n=i.NONE},this.update=function(){const p=new S,w=new gs().setFromUnitVectors(e.up,new S(0,1,0)),T=w.clone().invert(),I=new S,Y=new gs,xe=new S,oe=2*Math.PI;return function(ci=null){const us=t.object.position;p.copy(us).sub(t.target),p.applyQuaternion(w),r.setFromVector3(p),t.autoRotate&&n===i.NONE&&H(ee(ci)),t.enableDamping?(r.theta+=c.theta*t.dampingFactor,r.phi+=c.phi*t.dampingFactor):(r.theta+=c.theta,r.phi+=c.phi);let fe=t.minAzimuthAngle,Se=t.maxAzimuthAngle;isFinite(fe)&&isFinite(Se)&&(fe<-Math.PI?fe+=oe:fe>Math.PI&&(fe-=oe),Se<-Math.PI?Se+=oe:Se>Math.PI&&(Se-=oe),fe<=Se?r.theta=Math.max(fe,Math.min(Se,r.theta)):r.theta=r.theta>(fe+Se)/2?Math.max(fe,r.theta):Math.min(Se,r.theta)),r.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,r.phi)),r.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(d,t.dampingFactor):t.target.add(d),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor);let tt=!1;if(t.zoomToCursor&&B||t.object.isOrthographicCamera)r.radius=y(r.radius);else{const ye=r.radius;r.radius=y(r.radius*o),tt=ye!=r.radius}if(p.setFromSpherical(r),p.applyQuaternion(T),us.copy(t.target).add(p),t.object.lookAt(t.target),t.enableDamping===!0?(c.theta*=1-t.dampingFactor,c.phi*=1-t.dampingFactor,d.multiplyScalar(1-t.dampingFactor)):(c.set(0,0,0),d.set(0,0,0)),t.zoomToCursor&&B){let ye=null;if(t.object.isPerspectiveCamera){const st=p.length();ye=y(st*o);const ht=st-ye;t.object.position.addScaledVector(P,ht),t.object.updateMatrixWorld(),tt=!!ht}else if(t.object.isOrthographicCamera){const st=new S(k.x,k.y,0);st.unproject(t.object);const ht=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),t.object.updateProjectionMatrix(),tt=ht!==t.object.zoom;const hs=new S(k.x,k.y,0);hs.unproject(t.object),t.object.position.sub(hs).add(st),t.object.updateMatrixWorld(),ye=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;ye!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(ye).add(t.object.position):(mt.origin.copy(t.object.position),mt.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(mt.direction))<Ri?e.lookAt(t.target):(fs.setFromNormalAndCoplanarPoint(t.object.up,t.target),mt.intersectPlane(fs,t.target))))}else if(t.object.isOrthographicCamera){const ye=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),ye!==t.object.zoom&&(t.object.updateProjectionMatrix(),tt=!0)}return o=1,B=!1,tt||I.distanceToSquared(t.object.position)>l||8*(1-Y.dot(t.object.quaternion))>l||xe.distanceToSquared(t.target)>l?(t.dispatchEvent(vs),I.copy(t.object.position),Y.copy(t.object.quaternion),xe.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",cs),t.domElement.removeEventListener("pointerdown",ns),t.domElement.removeEventListener("pointercancel",et),t.domElement.removeEventListener("wheel",os),t.domElement.removeEventListener("pointermove",It),t.domElement.removeEventListener("pointerup",et),t.domElement.getRootNode().removeEventListener("keydown",rs,{capture:!0}),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",Pt),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let n=i.NONE;const l=1e-6,r=new ms,c=new ms;let o=1;const d=new S,u=new U,h=new U,v=new U,g=new U,m=new U,f=new U,E=new U,_=new U,C=new U,P=new S,k=new U;let B=!1;const $=[],q={};let L=!1;function ee(p){return p!==null?2*Math.PI/60*t.autoRotateSpeed*p:2*Math.PI/60/60*t.autoRotateSpeed}function j(p){const w=Math.abs(p*.01);return Math.pow(.95,t.zoomSpeed*w)}function H(p){c.theta-=p}function te(p){c.phi-=p}const be=function(){const p=new S;return function(T,I){p.setFromMatrixColumn(I,0),p.multiplyScalar(-T),d.add(p)}}(),Fe=function(){const p=new S;return function(T,I){t.screenSpacePanning===!0?p.setFromMatrixColumn(I,1):(p.setFromMatrixColumn(I,0),p.crossVectors(t.object.up,p)),p.multiplyScalar(T),d.add(p)}}(),de=function(){const p=new S;return function(T,I){const Y=t.domElement;if(t.object.isPerspectiveCamera){const xe=t.object.position;p.copy(xe).sub(t.target);let oe=p.length();oe*=Math.tan(t.object.fov/2*Math.PI/180),be(2*T*oe/Y.clientHeight,t.object.matrix),Fe(2*I*oe/Y.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(be(T*(t.object.right-t.object.left)/t.object.zoom/Y.clientWidth,t.object.matrix),Fe(I*(t.object.top-t.object.bottom)/t.object.zoom/Y.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function Be(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o/=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function Qe(p){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o*=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function je(p,w){if(!t.zoomToCursor)return;B=!0;const T=t.domElement.getBoundingClientRect(),I=p-T.left,Y=w-T.top,xe=T.width,oe=T.height;k.x=I/xe*2-1,k.y=-(Y/oe)*2+1,P.set(k.x,k.y,1).unproject(t.object).sub(t.object.position).normalize()}function y(p){return Math.max(t.minDistance,Math.min(t.maxDistance,p))}function M(p){u.set(p.clientX,p.clientY)}function D(p){je(p.clientX,p.clientX),E.set(p.clientX,p.clientY)}function A(p){g.set(p.clientX,p.clientY)}function K(p){h.set(p.clientX,p.clientY),v.subVectors(h,u).multiplyScalar(t.rotateSpeed);const w=t.domElement;H(2*Math.PI*v.x/w.clientHeight),te(2*Math.PI*v.y/w.clientHeight),u.copy(h),t.update()}function ke(p){_.set(p.clientX,p.clientY),C.subVectors(_,E),C.y>0?Be(j(C.y)):C.y<0&&Qe(j(C.y)),E.copy(_),t.update()}function Lt(p){m.set(p.clientX,p.clientY),f.subVectors(m,g).multiplyScalar(t.panSpeed),de(f.x,f.y),g.copy(m),t.update()}function Dt(p){je(p.clientX,p.clientY),p.deltaY<0?Qe(j(p.deltaY)):p.deltaY>0&&Be(j(p.deltaY)),t.update()}function Js(p){let w=!1;switch(p.code){case t.keys.UP:p.ctrlKey||p.metaKey||p.shiftKey?te(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):de(0,t.keyPanSpeed),w=!0;break;case t.keys.BOTTOM:p.ctrlKey||p.metaKey||p.shiftKey?te(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):de(0,-t.keyPanSpeed),w=!0;break;case t.keys.LEFT:p.ctrlKey||p.metaKey||p.shiftKey?H(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):de(t.keyPanSpeed,0),w=!0;break;case t.keys.RIGHT:p.ctrlKey||p.metaKey||p.shiftKey?H(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):de(-t.keyPanSpeed,0),w=!0;break}w&&(p.preventDefault(),t.update())}function Qt(p){if($.length===1)u.set(p.pageX,p.pageY);else{const w=Ge(p),T=.5*(p.pageX+w.x),I=.5*(p.pageY+w.y);u.set(T,I)}}function es(p){if($.length===1)g.set(p.pageX,p.pageY);else{const w=Ge(p),T=.5*(p.pageX+w.x),I=.5*(p.pageY+w.y);g.set(T,I)}}function ts(p){const w=Ge(p),T=p.pageX-w.x,I=p.pageY-w.y,Y=Math.sqrt(T*T+I*I);E.set(0,Y)}function Qs(p){t.enableZoom&&ts(p),t.enablePan&&es(p)}function ei(p){t.enableZoom&&ts(p),t.enableRotate&&Qt(p)}function ss(p){if($.length==1)h.set(p.pageX,p.pageY);else{const T=Ge(p),I=.5*(p.pageX+T.x),Y=.5*(p.pageY+T.y);h.set(I,Y)}v.subVectors(h,u).multiplyScalar(t.rotateSpeed);const w=t.domElement;H(2*Math.PI*v.x/w.clientHeight),te(2*Math.PI*v.y/w.clientHeight),u.copy(h)}function is(p){if($.length===1)m.set(p.pageX,p.pageY);else{const w=Ge(p),T=.5*(p.pageX+w.x),I=.5*(p.pageY+w.y);m.set(T,I)}f.subVectors(m,g).multiplyScalar(t.panSpeed),de(f.x,f.y),g.copy(m)}function as(p){const w=Ge(p),T=p.pageX-w.x,I=p.pageY-w.y,Y=Math.sqrt(T*T+I*I);_.set(0,Y),C.set(0,Math.pow(_.y/E.y,t.zoomSpeed)),Be(C.y),E.copy(_);const xe=(p.pageX+w.x)*.5,oe=(p.pageY+w.y)*.5;je(xe,oe)}function ti(p){t.enableZoom&&as(p),t.enablePan&&is(p)}function si(p){t.enableZoom&&as(p),t.enableRotate&&ss(p)}function ns(p){t.enabled!==!1&&($.length===0&&(t.domElement.setPointerCapture(p.pointerId),t.domElement.addEventListener("pointermove",It),t.domElement.addEventListener("pointerup",et)),!di(p)&&(ri(p),p.pointerType==="touch"?ds(p):ii(p)))}function It(p){t.enabled!==!1&&(p.pointerType==="touch"?oi(p):ai(p))}function et(p){switch(li(p),$.length){case 0:t.domElement.releasePointerCapture(p.pointerId),t.domElement.removeEventListener("pointermove",It),t.domElement.removeEventListener("pointerup",et),t.dispatchEvent(bs),n=i.NONE;break;case 1:const w=$[0],T=q[w];ds({pointerId:w,pageX:T.x,pageY:T.y});break}}function ii(p){let w;switch(p.button){case 0:w=t.mouseButtons.LEFT;break;case 1:w=t.mouseButtons.MIDDLE;break;case 2:w=t.mouseButtons.RIGHT;break;default:w=-1}switch(w){case We.DOLLY:if(t.enableZoom===!1)return;D(p),n=i.DOLLY;break;case We.ROTATE:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enablePan===!1)return;A(p),n=i.PAN}else{if(t.enableRotate===!1)return;M(p),n=i.ROTATE}break;case We.PAN:if(p.ctrlKey||p.metaKey||p.shiftKey){if(t.enableRotate===!1)return;M(p),n=i.ROTATE}else{if(t.enablePan===!1)return;A(p),n=i.PAN}break;default:n=i.NONE}n!==i.NONE&&t.dispatchEvent($t)}function ai(p){switch(n){case i.ROTATE:if(t.enableRotate===!1)return;K(p);break;case i.DOLLY:if(t.enableZoom===!1)return;ke(p);break;case i.PAN:if(t.enablePan===!1)return;Lt(p);break}}function os(p){t.enabled===!1||t.enableZoom===!1||n!==i.NONE||(p.preventDefault(),t.dispatchEvent($t),Dt(ni(p)),t.dispatchEvent(bs))}function ni(p){const w=p.deltaMode,T={clientX:p.clientX,clientY:p.clientY,deltaY:p.deltaY};switch(w){case 1:T.deltaY*=16;break;case 2:T.deltaY*=100;break}return p.ctrlKey&&!L&&(T.deltaY*=10),T}function rs(p){p.key==="Control"&&(L=!0,t.domElement.getRootNode().addEventListener("keyup",ls,{passive:!0,capture:!0}))}function ls(p){p.key==="Control"&&(L=!1,t.domElement.getRootNode().removeEventListener("keyup",ls,{passive:!0,capture:!0}))}function Pt(p){t.enabled===!1||t.enablePan===!1||Js(p)}function ds(p){switch(ps(p),$.length){case 1:switch(t.touches.ONE){case qe.ROTATE:if(t.enableRotate===!1)return;Qt(p),n=i.TOUCH_ROTATE;break;case qe.PAN:if(t.enablePan===!1)return;es(p),n=i.TOUCH_PAN;break;default:n=i.NONE}break;case 2:switch(t.touches.TWO){case qe.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Qs(p),n=i.TOUCH_DOLLY_PAN;break;case qe.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;ei(p),n=i.TOUCH_DOLLY_ROTATE;break;default:n=i.NONE}break;default:n=i.NONE}n!==i.NONE&&t.dispatchEvent($t)}function oi(p){switch(ps(p),n){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;ss(p),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;is(p),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;ti(p),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;si(p),t.update();break;default:n=i.NONE}}function cs(p){t.enabled!==!1&&p.preventDefault()}function ri(p){$.push(p.pointerId)}function li(p){delete q[p.pointerId];for(let w=0;w<$.length;w++)if($[w]==p.pointerId){$.splice(w,1);return}}function di(p){for(let w=0;w<$.length;w++)if($[w]==p.pointerId)return!0;return!1}function ps(p){let w=q[p.pointerId];w===void 0&&(w=new U,q[p.pointerId]=w),w.set(p.pageX,p.pageY)}function Ge(p){const w=p.pointerId===$[0]?$[1]:$[0];return q[w]}t.domElement.addEventListener("contextmenu",cs),t.domElement.addEventListener("pointerdown",ns),t.domElement.addEventListener("pointercancel",et),t.domElement.addEventListener("wheel",os,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",rs,{passive:!0,capture:!0}),this.update()}}const Te="http://127.0.0.1:8000";async function Ht(){const a=await fetch(`${Te}/api/spice/health`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`Health check failed: HTTP ${a.status}`);return a.json()}async function Ps(a){var s;const e=await fetch(`${Te}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Geometry request failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Fi(a){var s;const e=await fetch(`${Te}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Horizon profile failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function $s(a){var s;const e=await fetch(`${Te}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Horizon visibility failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function zi(a){var s;const e=await fetch(`${Te}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Mission timeline calculation failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function Hi(a){var s;const e=await fetch(`${Te}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Candidate comparison failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}async function As(a){var s;const e=await fetch(`${Te}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){let t=`Landing windows scan failed: HTTP ${e.status}`;try{const i=await e.json();t+=` — ${((s=i==null?void 0:i.detail)==null?void 0:s.message)??JSON.stringify(i)}`}catch{}throw new Error(t)}return e.json()}function Ot(a){const[e,s,t]=a,i=e,n=t,l=s,r=Math.sqrt(i*i+n*n+l*l);return r<1e-10?[0,1,0]:[i/r,n/r,l/r]}const Os=1737400,Ui=1737.4,x={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function Ie(a,e,s=Os){const i=(a%360+360)%360*Math.PI/180,n=e*Math.PI/180,l=Math.PI/2+n,r=2*s*Math.tan(l/2),c=r*Math.sin(i),o=r*Math.cos(i);return{x:c,y:o}}function Ut(a,e,s=Os){const t=Math.hypot(a,e);if(t<1e-7)return{lonDeg:0,latDeg:-90};const i=2*Math.atan2(t,2*s),n=-Math.PI/2+i,r=(Math.atan2(a,e)*180/Math.PI+360)%360,c=n*180/Math.PI;return{lonDeg:r,latDeg:c}}function lt(a,e){if(e>-80)return!1;const{x:s,y:t}=Ie(a,e);return s>=x.minX&&s<=x.maxX&&t>=x.minY&&t<=x.maxY}function Bi(a,e){const s=a>=x.minX&&a<=x.maxX&&e>=x.minY&&e<=x.maxY,t=(a-x.minX)/x.pixelSizeM,i=(x.maxY-e)/x.pixelSizeM,n=t/x.fullWidthPx,l=i/x.fullHeightPx,r=Math.max(0,Math.min(511,Math.round(n*512))),c=Math.max(0,Math.min(511,Math.round(l*512)));return{pxFull:t,pyFull:i,px512:r,py512:c,isInside:s}}function ji(a,e){const s=Math.max(0,Math.min(1,a/512)),t=Math.max(0,Math.min(1,e/512)),i=x.minX+s*(x.maxX-x.minX),n=x.maxY-t*(x.maxY-x.minY),{lonDeg:l,latDeg:r}=Ut(i,n);return{lonDeg:l,latDeg:r,x:i,y:n}}function $e(a,e,s){const t=Math.max(-90,Math.min(90,a));if(Math.abs(t+90)<1e-7)return new S(0,-s,0);if(Math.abs(t-90)<1e-7)return new S(0,s,0);const i=(90-t)*(Math.PI/180),n=(e+180)*(Math.PI/180),l=-s*Math.cos(n)*Math.sin(i),r=s*Math.cos(i),c=s*Math.sin(n)*Math.sin(i);return new S(l,r,c)}function dt(a){const e=(90-Math.max(-90,Math.min(90,a)))*(Math.PI/180);return(Math.PI-e)*Ui}function Rs(a,e){const s=a.clone().normalize(),i=Math.asin(Math.max(-1,Math.min(1,s.y)))*180/Math.PI;if(i<=-89.9999)return{latDeg:-90,lonDeg:0};if(i>=89.9999)return{latDeg:90,lonDeg:0};let l=Math.atan2(-s.z,s.x)*180/Math.PI;return l<0&&(l+=360),{latDeg:i,lonDeg:l}}function Bt(a,e){const s=typeof a=="number"?a:parseFloat(a),t=typeof e=="number"?e:parseFloat(e);if(isNaN(s)||isNaN(t))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(s<-90||s>90)return{valid:!1,lat:s,lon:t,error:"Latitude must be between -90.0° and +90.0°."};const i=(t%360+360)%360;return{valid:!0,lat:s,lon:i}}function re(a,e){if(Math.abs(a+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(a-90)<.001)return"90.000° N (True Lunar North Pole)";const s=`${Math.abs(a).toFixed(3)}° ${a<0?"S":"N"}`,i=`${((e%360+360)%360).toFixed(3)}° E`;return`${s}, ${i}`}let ot=null,At=!1,G=null,_e=!1,rt="step_1h",Ve=null,bt=0;const Xe={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};async function ft(a,e,s,t){if(!G)return!1;const i=G.querySelector("#spice-lat"),n=G.querySelector("#spice-lon"),l=G.querySelector("#spice-time-input"),r=G.querySelector("#spice-site-note"),c=G.querySelector("#spice-window-card");if(i&&(i.value=a.toFixed(3)),n&&(n.value=e.toFixed(2)),r&&(r.textContent=s),G.querySelectorAll(".spice-preset-btn").forEach(o=>{const d=parseFloat(o.dataset.lat||"999"),u=parseFloat(o.dataset.lon||"999");Math.abs(d-a)<.05&&Math.abs(u-e)<.05?o.classList.add("active"):o.classList.remove("active")}),t)return l&&(l.value=t),await Ae(G);c&&(c.style.display="block",c.innerHTML=`
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `);try{const u=await As({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:a,longitude_deg:e});Gi(c,u,a,e);let h=u.summary.best_window_start;if(!h&&u.days.length>0){const v=u.days.filter(g=>g.is_safe_for_landing);v.length>0&&(h=v[0].date)}h&&l?l.value=`${h}T12:00:00Z`:l&&!l.value&&(l.value="2026-10-16T12:00:00Z")}catch(o){console.warn("[SPICE] Candidate window scan error",o),c&&(c.innerHTML=`
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `),l&&!l.value&&(l.value="2026-10-16T12:00:00Z")}return await Ae(G)}function Gi(a,e,s,t){if(!a)return;const i=e.summary,n=lt(t,s),l=i.best_window_start,r=i.safe_days_count;let c=l,o=0;if(l&&e.days.length>0){const d=e.days.findIndex(u=>u.date===l);if(d!==-1){let u=d;for(;u<e.days.length&&e.days[u].is_safe_for_landing;)c=e.days[u].date,o++,u++}}if(o===0&&r>0&&(o=1),l&&r>0){const d=e.days.find(g=>g.date===l),u=d?d.sunlight.full_hours:12,h=d?d.earth_los.full_hours:24,v=d?d.safety_score:80;a.innerHTML=`
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
          <span class="smw-val">${c||l}T23:59Z</span>
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
        <span class="smw-index-pill">Heuristic Index: ${v.toFixed(1)} / 100</span>
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
    `}function Wi(a){if(!G)return!1;const e=G.querySelector("#spice-time-input");e&&(e.value=a,Ae(G))}function qi(a){var n,l,r,c,o,d,u,h,v;ot=a;const e=document.createElement("div");e.id="spice-panel",e.innerHTML=Yi(),document.body.appendChild(e),G=e,e.querySelector("#spice-fetch-btn").addEventListener("click",()=>Ae(e)),e.querySelector("#spice-auto-btn").addEventListener("click",()=>Ki(e)),(n=e.querySelector("#spice-autotrack-mode"))==null||n.addEventListener("change",g=>{rt=g.target.value,jt(e)}),(l=e.querySelector("#spice-retry-btn"))==null||l.addEventListener("click",()=>Rt(e,!0)),(r=e.querySelector("#spice-now-btn"))==null||r.addEventListener("click",()=>{Le(e);const g=e.querySelector("#spice-time-input");g&&(g.value=new Date().toISOString().slice(0,19)+"Z",Ae(e))}),(c=e.querySelector("#spice-epoch-artemis"))==null||c.addEventListener("click",()=>{Le(e);const g=e.querySelector("#spice-time-input");g&&(g.value="2026-10-16T12:00:00Z",Ae(e))}),(o=e.querySelector("#spice-step-back-24"))==null||o.addEventListener("click",()=>{Le(e),Ye(-24)}),(d=e.querySelector("#spice-step-back-1"))==null||d.addEventListener("click",()=>{Le(e),Ye(-1)}),(u=e.querySelector("#spice-step-fwd-1"))==null||u.addEventListener("click",()=>{Le(e),Ye(1)}),(h=e.querySelector("#spice-step-fwd-24"))==null||h.addEventListener("click",()=>{Le(e),Ye(24)}),e.querySelectorAll(".spice-preset-btn").forEach(g=>{g.addEventListener("click",()=>{const m=parseFloat(g.dataset.lat||"-90"),f=parseFloat(g.dataset.lon||"0"),E=g.dataset.label||"South Pole Site";ft(m,f,E),e.querySelectorAll(".spice-preset-btn").forEach(_=>_.classList.remove("active")),g.classList.add("active")})}),(v=e.querySelector("#spice-time-input"))==null||v.addEventListener("focus",()=>{Le(e)});const s=e.querySelector(".spice-header"),t=e.querySelector(".spice-body");s.addEventListener("click",()=>{const g=t.style.display==="none";t.style.display=g?"":"none",s.querySelector(".spice-collapse-icon").textContent=g?"▼":"▶"});const i=e.querySelector("#spice-time-input");return i.value="2026-10-16T12:00:00Z",Rt(e).then(()=>{ft(Xe.lat,Xe.lon,Xe.label,"2026-10-16T12:00:00Z")}),e}function Ye(a){if(!G)return;const e=G.querySelector("#spice-time-input");if(e)try{const s=new Date(e.value);if(!isNaN(s.getTime())){const t=new Date(s.getTime()+a*3600*1e3);e.value=t.toISOString().slice(0,19)+"Z",Ae(G)}}catch{}}function Yi(){return`
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
             value="${Xe.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Xe.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Xe.label}</div>
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
`}async function Rt(a,e=!1){const s=a.querySelector("#spice-status-dot"),t=a.querySelector("#spice-status-text"),i=a.querySelector("#spice-fetch-btn"),n=a.querySelector("#spice-retry-btn");e&&(t.textContent="Connecting to SPICE backend…",s.className="spice-status-dot");try{const l=await Ht(),r=l.status==="ok";return s.className="spice-status-dot "+(r?"dot-ok":"dot-warn"),t.textContent=r?`SPICE Online · ${l.reference_frame}`:`Backend Degraded: ${l.error??"Kernel warning"}`,i.disabled=!r,n&&(n.style.display=r?"none":"inline-block"),r}catch{return s.className="spice-status-dot dot-err",t.textContent="Backend Offline (port 8000)",i.disabled=!0,n&&(n.style.display="inline-block"),!1}}let it=null;async function Ae(a){if(At&&it)try{await it}catch{}At=!0;const e=a.querySelector("#spice-loading"),s=a.querySelector("#spice-error-box"),t=a.querySelector("#spice-results");return e.style.display="flex",s.style.display="none",it=(async()=>{try{const i=a.querySelector("#spice-time-input"),n=a.querySelector("#spice-lat"),l=a.querySelector("#spice-lon"),r=i.value.trim(),c=Bt(n.value,l.value);if(!c.valid)throw new Error(c.error||"Invalid coordinates.");const o=await Ps({utc_time:r,latitude_deg:c.lat,longitude_deg:c.lon,elevation_m:0});let d=null;try{d=await $s({latitude_deg:c.lat,longitude_deg:c.lon,elevation_m:0,instrument_height_m:2,sun_azimuth_deg:o.sun.azimuth_deg,sun_elevation_deg:o.sun.elevation_deg,sun_distance_km:o.sun.distance_km,earth_azimuth_deg:o.earth.azimuth_deg,earth_elevation_deg:o.earth.elevation_deg,earth_distance_km:o.earth.distance_km})}catch{d=null}return Vi(a,o,d),Xi(o),t.style.display="block",bt=0,!0}catch(i){const n=i instanceof Error?i.message:String(i);return s.textContent=`Error: ${n}`,s.style.display="block",await Rt(a),_e&&(bt++,bt>=2&&Le(a,"Auto-Track Paused: Network/SPICE error")),!1}finally{e.style.display="none",At=!1,it=null}})(),await it}function Vi(a,e,s){const t=m=>m.toFixed(1),i=m=>m>1e6?`${(m/1495978707e-1).toFixed(4)} AU (${(m/1e6).toFixed(2)}M km)`:`${m.toLocaleString(void 0,{maximumFractionDigits:0})} km`,n=lt(e.site.longitude_deg,e.site.latitude_deg);se("res-sun-dist",i(e.sun.distance_km)),se("res-sun-az",`${t(e.sun.azimuth_deg)}°`);const l=e.sun.elevation_deg;ys("res-sun-geom-el",`${l>=0?"+":""}${t(l)}°`,l>=0?"spice-val-positive":"spice-val-negative");const r=document.getElementById("res-sun-obs-status"),c=document.getElementById("res-sun-terrain-el"),o=document.getElementById("res-sun-dem-note");if(s&&s.sun){const m=s.sun;if(m.terrain_horizon_elevation_deg!==null?se("res-sun-terrain-el",`${t(m.terrain_horizon_elevation_deg)}°`):se("res-sun-terrain-el","N/A (Outside DEM)"),r)switch(m.visibility_status){case"no_obstruction_detected_within_coverage":r.textContent="No obstruction detected within coverage",r.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":r.textContent="Blocked by local terrain (Shadow)",r.className="spice-pill pill-err";break;case"blocked_by_lunar_body":r.textContent="Below geometric horizon (Lunar Body)",r.className="spice-pill pill-err";break;case"near_horizon_grazing":r.textContent="Near-horizon grazing light",r.className="spice-pill pill-warn";break;default:r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-warn"}}else c&&(c.textContent=n?"Calculation unavailable":"Unevaluable (Outside DEM)"),r&&(l<0?(r.textContent="Below geometric horizon",r.className="spice-pill pill-err"):n?(r.textContent="Above geometric horizon (DEM Ray uncalculated)",r.className="spice-pill pill-warn"):(r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-neutral"));o&&(o.textContent=n?"DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).":"DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only."),se("res-earth-dist",`${e.earth.distance_km.toLocaleString(void 0,{maximumFractionDigits:0})} km`),se("res-earth-az",`${t(e.earth.azimuth_deg)}°`);const d=e.earth.elevation_deg;ys("res-earth-geom-el",`${d>=0?"+":""}${t(d)}°`,d>=0?"spice-val-positive":"spice-val-negative");const u=document.getElementById("res-earth-obs-status"),h=document.getElementById("res-earth-terrain-el"),v=document.getElementById("res-earth-los-status");if(s&&s.earth){const m=s.earth;if(m.terrain_horizon_elevation_deg!==null?se("res-earth-terrain-el",`${t(m.terrain_horizon_elevation_deg)}°`):se("res-earth-terrain-el","N/A (Outside DEM)"),u)switch(m.visibility_status){case"no_obstruction_detected_within_coverage":u.textContent="No obstruction detected within coverage",u.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":u.textContent="Blocked by local terrain",u.className="spice-pill pill-err";break;case"blocked_by_lunar_body":u.textContent="Below geometric horizon (Lunar Body)",u.className="spice-pill pill-err";break;default:u.textContent="Unknown or insufficient terrain coverage",u.className="spice-pill pill-warn"}if(v){const f=(m.visibility_status==="no_obstruction_detected_within_coverage"||m.visibility_status==="near_horizon_grazing")&&d>0;v.textContent=f?`Potential Line-of-Sight Active (${t(m.angular_clearance_deg??d)}° clearance)`:"Direct Line-of-Sight Obstructed",v.className=`spice-los-badge ${f?"los-active":"los-blocked"}`}}else if(h&&(h.textContent=n?"Calculation unavailable":"Unevaluable (Outside DEM)"),u&&(d<0?(u.textContent="Below geometric horizon",u.className="spice-pill pill-err"):(u.textContent="Above geometric horizon",u.className="spice-pill pill-ok")),v){const m=d>0;v.textContent=m?`Potential Geometric LOS Active (+${t(d)}°)`:"Direct Line-of-Sight Occluded",v.className=`spice-los-badge ${m?"los-active":"los-blocked"}`}se("res-frame",e.reference_frame),se("res-aberration",e.aberration_correction),se("res-et-seconds",`${e.ephemeris_time_s.toFixed(3)} s`),se("res-sun-vec",e.sun.direction_unit.map(m=>m.toFixed(4)).join(", ")),se("res-earth-vec",e.earth.direction_unit.map(m=>m.toFixed(4)).join(", "));const g=a.querySelector("#spice-scene-note");g.style.display=ot?"block":"none"}function Xi(a){if(!ot)return;const[e,s,t]=Ot(a.sun.direction_unit),i=8;ot.sunLight.position.set(e*i,s*i,t*i);const[n,l,r]=Ot(a.earth.direction_unit);ot.earthshineLight.position.set(-n*i,-l*i,-r*i)}function Ki(a){_e=!_e,_e?Zi(a):Ns(a)}function Zi(a){_e=!0,bt=0,jt(a),Ve!==null&&clearInterval(Ve),Ss(a),Ve=setInterval(()=>{_e&&Ss(a)},2e3)}function Ss(a){const e=a.querySelector("#spice-time-input");if(e){if(rt==="realtime")e.value=new Date().toISOString().slice(0,19)+"Z";else if(rt==="step_1h"){Ye(1);return}else if(rt==="step_24h"){Ye(24);return}Ae(a)}}function Ns(a){_e=!1,Ve!==null&&(clearInterval(Ve),Ve=null),jt(a)}function Le(a,e){if(!_e)return;Ns(a);const s=a.querySelector("#autotrack-status-text");s&&(s.textContent=e||"Standby (User edit paused track)")}function jt(a){const e=a.querySelector("#spice-auto-btn"),s=a.querySelector("#autotrack-dot"),t=a.querySelector("#autotrack-status-text");if(_e){e.classList.add("active"),e.textContent="Auto-Track: ACTIVE ●",s.className="autotrack-dot dot-active";const i={step_1h:"Advancing (+1h / 2s)",step_24h:"Advancing (+24h / 2s)",realtime:"Tracking Real-Time UTC"};t.textContent=i[rt]||"Active"}else e.classList.remove("active"),e.textContent="Auto-Track: OFF",s.className="autotrack-dot",t.textContent="Standby (Epoch Static)"}function se(a,e){const s=document.getElementById(a);s&&(s.textContent=e)}function ys(a,e,s){const t=document.getElementById(a);t&&(t.textContent=e,t.className=`sm-value ${s}`)}const J=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM (NASA LOLA Site 01)",coverageType:"High-Resolution Regional DEM"},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians. Geodetic reference benchmark.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry",isGeodeticDatum:!0},{id:"shackleton-rim",name:"Shackleton Rim",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering PSR with high water-ice deposition probability.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"malapert",name:"Malapert Massif",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km massif providing extended solar visibility and DTE comms.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"haworth-rim",name:"Haworth Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with volatile concentrations.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"de-gerlache-rim",name:"de Gerlache Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim offering favorable sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"nobile-rim-1",name:"Nobile Rim",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"}],we=1,ce={POLE_RING:2282478,POLE_CROSS:6809849,POLE_DOT:16777215,SITE01_MAIN:16096779,GRID_PRIME:3900150,GRID_SEC:1981023,DEM_BOX:3718648,SEC:{"shackleton-rim":3718648,malapert:3462041,"haworth-rim":10980346,"de-gerlache-rim":6333946,"nobile-rim-1":16020150}};class Ji{constructor(e){b(this,"group");b(this,"interactiveMarkers",[]);b(this,"siteMarkerGroups",new Map);b(this,"raycaster",new ks);b(this,"mouse",new U);b(this,"onSelectSiteCallback");b(this,"disposables",[]);this.group=new Pe,this.group.name="SouthPoleOverlay",this._buildPolarGrid(e),this._buildDEMFootprint(e),this._buildSouthPoleMarker(e),this._buildCandidateSites(e)}setOnSelectSite(e){this.onSelectSiteCallback=e}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(e){this.siteMarkerGroups.forEach((s,t)=>{const i=t===e,n=s.getObjectByName("Ring");if(n){n.scale.setScalar(i?1.25:1);const l=n.material;l&&"opacity"in l&&(l.opacity=i?1:ws(t))}["Dot","Cx0","Cx1","Cx2","Cx3","Bk0","Bk1","Bk2","Bk3","Stem","Cap"].forEach(l=>{const r=s.getObjectByName(l);if(!r)return;const c=r.material;c&&"opacity"in c&&(c.opacity=i?1:ws(t,l))})})}_buildPolarGrid(e){const s=new Pe;s.name="PolarGrid";const t=e*1.0012;[[-80,1982639,.35,240],[-85,1920728,.28,180],[-88,1981023,.2,120]].forEach(([i,n,l,r])=>{const c=[];for(let u=0;u<=r;u++)c.push($e(i,u/r*360,t));const o=new Z().setFromPoints(c),d=new ie({color:n,transparent:!0,opacity:l,blending:De});s.add(new ae(o,d)),this.disposables.push(o,d)}),[[0,ce.GRID_PRIME,.45],[90,ce.GRID_SEC,.2],[180,ce.GRID_SEC,.2],[270,ce.GRID_SEC,.2]].forEach(([i,n,l])=>{const r=[];for(let d=0;d<=36;d++)r.push($e(-80-10*(d/36),i,t));const c=new Z().setFromPoints(r),o=new ie({color:n,transparent:!0,opacity:l,blending:De});s.add(new ae(c,o)),this.disposables.push(c,o)}),this.group.add(s)}_buildDEMFootprint(e){const{minX:s,maxX:t,minY:i,maxY:n}=x,l=e*1.002,r=16,c=[];for(let h=0;h<=r;h++)c.push({x:s+(t-s)*(h/r),y:n});for(let h=0;h<=r;h++)c.push({x:t,y:n+(i-n)*(h/r)});for(let h=0;h<=r;h++)c.push({x:t+(s-t)*(h/r),y:i});for(let h=0;h<=r;h++)c.push({x:s,y:i+(n-i)*(h/r)});const o=c.map(h=>{const{lonDeg:v,latDeg:g}=Ut(h.x,h.y);return $e(g,v,l)}),d=new Z().setFromPoints(o),u=new ie({color:ce.DEM_BOX,transparent:!0,opacity:.45});this.group.add(new ae(d,u)),this.disposables.push(d,u)}_buildSouthPoleMarker(e){const s=new Pe;s.name="TrueSouthPoleMarker",s.position.set(0,-e*1.0025,0);const t=.013*we,i=new Me(t,t*1.3,64);i.rotateX(Math.PI/2);const n=new z({color:ce.POLE_RING,side:ge,transparent:!0,opacity:.95,blending:De}),l=new R(i,n);l.name="Ring",s.add(l),this.disposables.push(i,n);const r=new Me(t*1.8,t*1.95,64);r.rotateX(Math.PI/2);const c=new z({color:ce.POLE_RING,side:ge,transparent:!0,opacity:.4,blending:De});s.add(new R(r,c)),this.disposables.push(r,c);const o=t*.45,d=t*2.6;[[-1,0],[1,0],[0,-1],[0,1]].forEach(([E,_],C)=>{const P=new Z().setFromPoints([new S(E*o,0,_*o),new S(E*d,0,_*d)]),k=new ie({color:ce.POLE_CROSS,transparent:!0,opacity:.75}),B=new ae(P,k);B.name=`Cx${C}`,s.add(B),this.disposables.push(P,k)});const u=new Ee(.003*we,12,12),h=new z({color:ce.POLE_DOT,transparent:!0,opacity:1}),v=new R(u,h);v.name="Dot",s.add(v),this.disposables.push(u,h);const g=new Ee(.022,8,8),m=new z({visible:!1}),f=new R(g,m);f.userData={site:J.find(E=>E.id==="south-pole")},s.add(f),this.interactiveMarkers.push(f),this.disposables.push(g,m),this.siteMarkerGroups.set("south-pole",s),this.group.add(s)}_buildCandidateSites(e){J.forEach(s=>{if(s.id==="south-pole")return;const t=s.id==="site-01",i=t?ce.SITE01_MAIN:ce.SEC[s.id]??9741240,n=new Pe;n.name=`SiteMarker_${s.id}`;const l=$e(s.lat,s.lon,e*1.0025),r=l.clone().normalize();n.position.copy(l),n.quaternion.setFromUnitVectors(new S(0,1,0),r),t?this._buildPrimaryMarker(n,i):this._buildSecondaryMarker(n,i);const c=new Ee(.022,8,8),o=new z({visible:!1}),d=new R(c,o);d.position.y=.02,d.userData={site:s},n.add(d),this.interactiveMarkers.push(d),this.disposables.push(c,o),this.siteMarkerGroups.set(s.id,n),this.group.add(n)})}_buildPrimaryMarker(e,s){const t=.018*we,i=[new S(0,0,-t),new S(t,0,0),new S(0,0,t),new S(-t,0,0),new S(0,0,-t)],n=new Z().setFromPoints(i),l=new ie({color:s,transparent:!0,opacity:.95}),r=new ae(n,l);r.name="Ring",e.add(r),this.disposables.push(n,l);const c=[new S(0,0,-t*.55),new S(t*.55,0,0),new S(0,0,t*.55),new S(-t*.55,0,0),new S(0,0,-t*.55)],o=new Z().setFromPoints(c),d=new ie({color:s,transparent:!0,opacity:.55});e.add(new ae(o,d)),this.disposables.push(o,d);const u=t*1.9,h=t*.55;[[0,-u,h],[0,u,h],[-u,0,h],[u,0,h]].forEach(($,q)=>{const L=[];q===0?(L.push(new S(-h*.5,0,-u+h)),L.push(new S(-h*.5,0,-u)),L.push(new S(h*.5,0,-u)),L.push(new S(h*.5,0,-u+h))):q===1?(L.push(new S(-h*.5,0,u-h)),L.push(new S(-h*.5,0,u)),L.push(new S(h*.5,0,u)),L.push(new S(h*.5,0,u-h))):q===2?(L.push(new S(-u+h,0,-h*.5)),L.push(new S(-u,0,-h*.5)),L.push(new S(-u,0,h*.5)),L.push(new S(-u+h,0,h*.5))):(L.push(new S(u-h,0,-h*.5)),L.push(new S(u,0,-h*.5)),L.push(new S(u,0,h*.5)),L.push(new S(u-h,0,h*.5)));const ee=new Z().setFromPoints(L),j=new ie({color:s,transparent:!0,opacity:.8}),H=new ae(ee,j);H.name=`Bk${q}`,e.add(H),this.disposables.push(ee,j)});const v=new Ee(.0045*we,12,12),g=new z({color:16569165,transparent:!0,opacity:1}),m=new R(v,g);m.name="Dot",e.add(m),this.disposables.push(v,g);const f=.085*we,E=new Z().setFromPoints([new S(0,0,0),new S(0,f,0)]),_=new ie({color:s,transparent:!0,opacity:.7,blending:De}),C=new ae(E,_);C.name="Stem",e.add(C),this.disposables.push(E,_);const P=new Ee(.0055*we,10,10),k=new z({color:s,transparent:!0,opacity:.9}),B=new R(P,k);B.position.y=f,B.name="Cap",e.add(B),this.disposables.push(P,k)}_buildSecondaryMarker(e,s){const t=.009*we,i=new Me(t,t*1.45,36);i.rotateX(Math.PI/2);const n=new z({color:s,side:ge,transparent:!0,opacity:.75}),l=new R(i,n);l.name="Ring",e.add(l),this.disposables.push(i,n);const r=new Ee(.0025*we,10,10),c=new z({color:s,transparent:!0,opacity:.9}),o=new R(r,c);o.name="Dot",e.add(o),this.disposables.push(r,c);const d=.028*we,u=new Z().setFromPoints([new S(0,0,0),new S(0,d,0)]),h=new ie({color:s,transparent:!0,opacity:.55}),v=new ae(u,h);v.name="Stem",e.add(v),this.disposables.push(u,h)}update(e){}handleClick(e,s){var i;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,s);const t=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(t.length>0){let n=null,l=1/0;for(const r of t){const c=r.object.userData.site;if(!c)continue;const o=this.siteMarkerGroups.get(c.id),d=o?o.position:r.object.position,u=r.point.distanceTo(d);u<l&&(l=u,n=c)}if(n)return this.highlightSite(n.id),(i=this.onSelectSiteCallback)==null||i.call(this,n),n}return null}dispose(){this.disposables.forEach(e=>{try{e.dispose()}catch{}}),this.disposables=[]}}function ws(a,e="Ring"){return a==="south-pole"?e==="Stem"?0:.8:a==="site-01"?e==="Stem"||e==="Cap"?.55:.75:e==="Stem"?.4:.6}class Qi{constructor(){b(this,"container");b(this,"canvas");b(this,"ctx");b(this,"tooltipEl");b(this,"isVisible",!1);b(this,"selectedSiteId","site-01");b(this,"hoveredSite",null);b(this,"customSelection",null);b(this,"onSelectCallback");b(this,"onApplyAndCalculateCallback");b(this,"onRecenterCallback");b(this,"MAX_EXTENT_M",36e4);b(this,"mapWidth",480);b(this,"mapHeight",480);b(this,"centerX",240);b(this,"centerY",240);b(this,"scalePxPerM",240/33e4);b(this,"terrainImage",null);b(this,"isTerrainImageLoaded",!1);b(this,"site01DetailImage",null);b(this,"isSite01ImageLoaded",!1);this.container=document.createElement("div"),this.container.id="south-pole-explorer-panel",this.container.className="south-pole-explorer hidden",this.container.innerHTML=this.buildHTML(),document.body.appendChild(this.container),this.canvas=this.container.querySelector("#polar-map-canvas"),this.ctx=this.canvas.getContext("2d"),this.tooltipEl=this.container.querySelector("#polar-map-tooltip"),this.resizeCanvas(),this.loadBackdrop(),this.attachEvents()}setOnSelect(e){this.onSelectCallback=e}setOnApplyAndCalculate(e){this.onApplyAndCalculateCallback=e}setOnRecenter(e){this.onRecenterCallback=e}open(){this.isVisible=!0,this.container.classList.remove("hidden"),this.resizeCanvas(),this.draw()}close(){this.isVisible=!1,this.container.classList.add("hidden")}toggle(){return this.isVisible?this.close():this.open(),this.isVisible}getIsOpen(){return this.isVisible}setSelectedSite(e,s,t){e&&J.some(i=>i.id===e)?(this.selectedSiteId=e,this.customSelection=null):s!==void 0&&t!==void 0&&(this.selectedSiteId="custom",this.customSelection={lat:s,lon:t,elevM:0,isInsideDEM:lt(t,s)}),this.isVisible&&this.draw()}resizeCanvas(){const e=Math.min(520,Math.max(380,window.innerWidth>900?460:360));this.mapWidth=e,this.mapHeight=e,this.canvas.width=e*window.devicePixelRatio,this.canvas.height=e*window.devicePixelRatio,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.ctx.setTransform(1,0,0,1,0,0),this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.centerX=e/2,this.centerY=e/2,this.scalePxPerM=e/2/this.MAX_EXTENT_M}loadBackdrop(){const e=new Image;e.crossOrigin="anonymous",e.src="/generated/south_pole_polar_relief.png",e.onload=()=>{this.terrainImage=e,this.isTerrainImageLoaded=!0,this.isVisible&&this.draw()};const s=new Image;s.crossOrigin="anonymous",s.src="/generated/site01_elev_norm.png",s.onload=()=>{this.site01DetailImage=s,this.isSite01ImageLoaded=!0,this.isVisible&&this.draw()}}buildHTML(){return`
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
`}attachEvents(){var t;(t=this.container.querySelector("#spe-close-btn"))==null||t.addEventListener("click",()=>this.close()),this.canvas.addEventListener("mousemove",i=>this.handleMouseMove(i)),this.canvas.addEventListener("mouseleave",()=>{this.hoveredSite=null,this.tooltipEl.classList.add("hidden"),this.draw()}),this.canvas.addEventListener("click",i=>this.handleClick(i));const e=this.container.querySelector("#spe-btn-apply");e==null||e.addEventListener("click",async()=>{if(!e||e.disabled)return;const i=this.getCurrentSiteData(),n=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spe-spinner"></span> Computing SPICE…';try{let l=!0;if(this.onApplyAndCalculateCallback?l=await this.onApplyAndCalculateCallback(i):this.onSelectCallback&&this.onSelectCallback(i),l!==!1)e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success");else try{const r=await Ht();r&&r.status==="ok"?(e.innerHTML="✓ Target &amp; SPICE Active",e.classList.add("spe-btn-success")):(e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error"))}catch{e.innerHTML="⚠ SPICE Offline",e.classList.add("spe-btn-error")}setTimeout(()=>{e.disabled=!1,e.innerHTML=n,e.classList.remove("spe-btn-success","spe-btn-warn")},2500)}catch(l){const r=l instanceof Error?l.message:String(l);e.innerHTML="⚠ Calculation Failed",e.classList.add("spe-btn-error"),console.error("[SPE] Apply failed:",r),setTimeout(()=>{e.disabled=!1,e.innerHTML=n,e.classList.remove("spe-btn-error")},3e3)}});const s=this.container.querySelector("#spe-btn-recenter");s==null||s.addEventListener("click",()=>{const i=this.getCurrentSiteData();this.onRecenterCallback&&this.onRecenterCallback({lat:i.latitudeDeg,lon:i.longitudeDeg});const n=s.textContent;s.textContent="✓ 3D Centered",setTimeout(()=>{s.textContent=n},1500)}),window.addEventListener("resize",()=>{this.isVisible&&(this.resizeCanvas(),this.draw())}),window.addEventListener("keydown",i=>{i.key==="Escape"&&this.isVisible&&this.close()})}getCurrentSiteData(){if(this.selectedSiteId==="custom"&&this.customSelection)return{name:"Custom Selected Location",designation:re(this.customSelection.lat,this.customSelection.lon),latitudeDeg:this.customSelection.lat,longitudeDeg:this.customSelection.lon,elevationM:this.customSelection.elevM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:this.customSelection.isInsideDEM,demDatasetName:this.customSelection.isInsideDEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"};const e=J.find(s=>s.id===this.selectedSiteId)||J[0];return{name:e.name,designation:e.designation,latitudeDeg:e.lat,longitudeDeg:e.lon,elevationM:e.elevationM,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere · MOON_ME frame",isInsideSite01DEM:!!e.isInsideSite01DEM,demDatasetName:e.isInsideSite01DEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"}}projectMetersToCanvas(e,s){return{cx:this.centerX+e*this.scalePxPerM,cy:this.centerY-s*this.scalePxPerM}}unprojectCanvasToMeters(e,s){return{x:(e-this.centerX)/this.scalePxPerM,y:(this.centerY-s)/this.scalePxPerM}}draw(){const e=this.ctx,s=this.mapWidth,t=this.mapHeight;e.clearRect(0,0,s,t),e.fillStyle="#040711",e.fillRect(0,0,s,t),this.drawTerrainRelief(e),this.drawSite01DEMBoundary(e),this.drawPolarGrid(e),this.drawEphemerisVectors(e),this.drawScaleAndOrientation(e),this.drawTrueSouthPole(e),this.drawCandidateSites(e),this.customSelection&&this.drawCustomSelectionMarker(e),this.updateInfoCard()}drawTerrainRelief(e){if(this.isTerrainImageLoaded&&this.terrainImage){e.save();const t=33e4*this.scalePxPerM,i=this.centerX-t,n=this.centerY-t,l=t*2;e.drawImage(this.terrainImage,i,n,l,l),e.restore()}else{const s=e.createRadialGradient(this.centerX,this.centerY,10,this.centerX,this.centerY,this.mapWidth/2);s.addColorStop(0,"#151d2c"),s.addColorStop(.5,"#0f1624"),s.addColorStop(1,"#060a12"),e.fillStyle=s,e.fillRect(0,0,this.mapWidth,this.mapHeight)}}drawSite01DEMBoundary(e){const s=this.projectMetersToCanvas(x.minX,x.maxY),t=this.projectMetersToCanvas(x.maxX,x.maxY),i=this.projectMetersToCanvas(x.maxX,x.minY),n=this.projectMetersToCanvas(x.minX,x.minY),l=t.cx-s.cx,r=n.cy-s.cy;e.save(),this.isSite01ImageLoaded&&this.site01DetailImage&&(e.save(),e.globalAlpha=.85,e.drawImage(this.site01DetailImage,s.cx,s.cy,l,r),e.restore()),e.beginPath(),e.moveTo(s.cx,s.cy),e.lineTo(t.cx,t.cy),e.lineTo(i.cx,i.cy),e.lineTo(n.cx,n.cy),e.closePath(),e.fillStyle="rgba(56, 189, 248, 0.12)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=1.4,e.setLineDash([4,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 DEM [5 m/px]",s.cx+3,s.cy-4),e.restore()}drawPolarGrid(e){[{lat:-80,label:"LAT 80.00°S (OUTER PERIMETER)",color:"rgba(56, 189, 248, 0.40)",dash:[]},{lat:-85,label:"LAT 85.00°S (TRAVERSE RANGE)",color:"rgba(56, 189, 248, 0.32)",dash:[6,4]},{lat:-88,label:"LAT 88.00°S (ARTEMIS CORRIDOR)",color:"rgba(56, 189, 248, 0.32)",dash:[3,3]}].forEach(({lat:n,label:l,color:r,dash:c})=>{const{y:o}=Ie(0,n),d=Math.abs(o)*this.scalePxPerM;e.beginPath(),e.arc(this.centerX,this.centerY,d,0,2*Math.PI),e.strokeStyle=r,e.lineWidth=1,e.setLineDash(c),e.stroke(),e.setLineDash([]);const u=-Math.PI*.64,h=this.centerX+Math.cos(u)*d,v=this.centerY+Math.sin(u)*d;e.save(),e.font='bold 7.5px "JetBrains Mono", monospace';const g=e.measureText(l).width;e.fillStyle="rgba(6, 11, 22, 0.90)",e.strokeStyle="rgba(56, 189, 248, 0.40)",e.lineWidth=1,e.beginPath(),e.roundRect(h-g/2-5,v-7,g+10,14,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(l,h,v),e.restore()});const t=this.mapWidth/2-8;[{angleRad:-Math.PI/2,label:"0° PRIME · TO EARTH ↑",align:"center",isTopHeader:!0},{angleRad:0,label:"90°E · EAST LIMB →",align:"right",isTopHeader:!1},{angleRad:Math.PI/2,label:"180° · FAR SIDE ↓",align:"center",isTopHeader:!1},{angleRad:Math.PI,label:"← 270°E · WEST LIMB",align:"left",isTopHeader:!1}].forEach(n=>{const l=this.centerX+Math.cos(n.angleRad)*t,r=this.centerY+Math.sin(n.angleRad)*t;e.beginPath(),e.moveTo(this.centerX,this.centerY),e.lineTo(l,r),e.strokeStyle="rgba(148, 163, 184, 0.20)",e.lineWidth=1,e.stroke(),e.save(),e.font='bold 8px "JetBrains Mono", monospace';const c=e.measureText(n.label).width;if(n.isTopHeader){const o=this.centerX,d=14;e.fillStyle="rgba(6, 12, 24, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.50)",e.lineWidth=1,e.beginPath(),e.roundRect(o-c/2-6,d-8,c+12,16,3),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.textAlign="center",e.textBaseline="middle",e.fillText(n.label,o,d)}else{const d=this.centerX+Math.cos(n.angleRad)*(t-12),u=this.centerY+Math.sin(n.angleRad)*(t-12);e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle="rgba(148, 163, 184, 0.35)",e.lineWidth=1,e.beginPath(),e.roundRect(d-c/2-5,u-7,c+10,14,3),e.fill(),e.stroke(),e.fillStyle="#cbd5e1",e.textAlign="center",e.textBaseline="middle",e.fillText(n.label,d,u)}e.restore()})}drawEphemerisVectors(e){const s=-Math.PI*.58,t=this.mapWidth*.4,i=this.centerX-10,n=this.centerY+20,l=i+Math.cos(s)*t,r=n+Math.sin(s)*t;e.save(),e.strokeStyle="rgba(245, 158, 11, 0.75)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,n),e.lineTo(l,r),e.stroke(),e.setLineDash([]);const c=7,o=Math.PI/7;e.fillStyle="#f59e0b",e.beginPath(),e.moveTo(l,r),e.lineTo(l-c*Math.cos(s-o),r-c*Math.sin(s-o)),e.lineTo(l-c*Math.cos(s+o),r-c*Math.sin(s+o)),e.closePath(),e.fill();const d=i+Math.cos(s)*(t*.52),u=n+Math.sin(s)*(t*.52),h="SOLAR INCIDENCE 1.1° EL ↗";e.font='bold 7.5px "JetBrains Mono", monospace';const v=e.measureText(h).width;e.fillStyle="rgba(18, 12, 4, 0.94)",e.strokeStyle="rgba(245, 158, 11, 0.65)",e.lineWidth=1,e.beginPath(),e.roundRect(d-v/2-5,u-7,v+10,14,3),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.textAlign="center",e.textBaseline="middle",e.fillText(h,d,u);const g=Math.PI*.72,m=this.mapWidth*.36,f=i+Math.cos(g)*m,E=n+Math.sin(g)*m;e.strokeStyle="rgba(56, 189, 248, 0.70)",e.lineWidth=1.3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(i,n),e.lineTo(f,E),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(f,E),e.lineTo(f-c*Math.cos(g-o),E-c*Math.sin(g-o)),e.lineTo(f-c*Math.cos(g+o),E-c*Math.sin(g+o)),e.closePath(),e.fill();const _=i+Math.cos(g)*(m*.55),C=n+Math.sin(g)*(m*.55),P="EARTH LOS (OCCULTED -6.3°) ✓";e.font='bold 7.5px "JetBrains Mono", monospace';const k=e.measureText(P).width;e.fillStyle="rgba(4, 14, 26, 0.94)",e.strokeStyle="rgba(56, 189, 248, 0.55)",e.lineWidth=1,e.beginPath(),e.roundRect(_-k/2-5,C-7,k+10,14,3),e.fill(),e.stroke(),e.fillStyle="#7dd3fc",e.textAlign="center",e.textBaseline="middle",e.fillText(P,_,C),e.restore()}drawScaleAndOrientation(e){const t=1e5*this.scalePxPerM,i=22,n=this.mapHeight-22;e.strokeStyle="#94a3b8",e.lineWidth=1.5,e.beginPath(),e.moveTo(i,n),e.lineTo(i+t,n),e.moveTo(i,n-4),e.lineTo(i,n+4),e.moveTo(i+t/2,n-2),e.lineTo(i+t/2,n+2),e.moveTo(i+t,n-4),e.lineTo(i+t,n+4),e.stroke(),e.fillStyle="#94a3b8",e.font='8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("0",i-2,n-6),e.textAlign="center",e.fillText("50 km",i+t/2,n-6),e.textAlign="right",e.fillText("100 km",i+t,n-6);const l=this.mapWidth-32,r=32;e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(l,r,13,0,2*Math.PI),e.stroke(),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(l,r-11),e.lineTo(l-4,r+2),e.lineTo(l+4,r+2),e.closePath(),e.fill(),e.fillStyle="#cbd5e1",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("N (0°)",l,r+11)}drawTrueSouthPole(e){var u;const{cx:s,cy:t}=this.projectMetersToCanvas(0,0),i=this.selectedSiteId==="south-pole",n=((u=this.hoveredSite)==null?void 0:u.id)==="south-pole";e.save(),e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.60)",e.lineWidth=i?1.5:1;const l=i?10:7;e.beginPath(),e.moveTo(s-l,t),e.lineTo(s+l,t),e.moveTo(s,t-l),e.lineTo(s,t+l),e.stroke(),e.strokeStyle=i?"#22d3ee":n?"#67e8f9":"rgba(34, 211, 238, 0.85)",e.lineWidth=i?2:1.3,e.beginPath(),e.arc(s,t,i?6.5:4.5,0,2*Math.PI),e.stroke(),i&&(e.strokeStyle="rgba(34, 211, 238, 0.40)",e.lineWidth=1,e.beginPath(),e.arc(s,t,10.5,0,2*Math.PI),e.stroke()),e.fillStyle="#ffffff",e.beginPath(),e.arc(s,t,i?2.2:1.6,0,2*Math.PI),e.fill();const r=i?"● 90.0°S True Pole (-0.25km)":"90°S True Pole";e.font=i?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const c=e.measureText(r).width,o=s-c-14,d=t-10;e.strokeStyle=i?"rgba(34, 211, 238, 0.65)":"rgba(34, 211, 238, 0.25)",e.lineWidth=1,e.beginPath(),e.moveTo(s-5,t-3),e.lineTo(o+c+4,d+6),e.stroke(),e.fillStyle="rgba(6, 12, 24, 0.90)",e.strokeStyle=i?"#22d3ee":"rgba(34, 211, 238, 0.40)",e.lineWidth=i?1.4:1,e.beginPath(),e.roundRect(o,d,c+8,13,2),e.fill(),e.stroke(),e.fillStyle=i?"#67e8f9":"#a5f3fc",e.textAlign="left",e.textBaseline="middle",e.fillText(r,o+4,d+6.5),e.restore()}drawCandidateSites(e){J.filter(t=>t.id!=="south-pole").forEach(t=>{var C;const{x:i,y:n}=Ie(t.lon,t.lat),{cx:l,cy:r}=this.projectMetersToCanvas(i,n),c=t.id===this.selectedSiteId,o=((C=this.hoveredSite)==null?void 0:C.id)===t.id,d=t.id==="site-01";if(e.save(),d)e.save(),e.translate(l,r),e.rotate(Math.PI/4),c&&(e.strokeStyle="rgba(245, 158, 11, 0.45)",e.lineWidth=1,e.strokeRect(-9,-9,18,18)),e.strokeStyle=c?"#f59e0b":o?"#fcd34d":"rgba(245, 158, 11, 0.85)",e.lineWidth=c?1.8:1.3,e.strokeRect(-4.5,-4.5,9,9),e.restore(),e.fillStyle=c?"#fcd34d":"#f59e0b",e.beginPath(),e.arc(l,r,c?2.2:1.6,0,2*Math.PI),e.fill();else{const P=o?"#67e8f9":t.id==="malapert"?"#34d399":t.id==="shackleton-rim"?"#38bdf8":"#94a3b8",k=c?"#38bdf8":P;c&&(e.strokeStyle="rgba(56, 189, 248, 0.45)",e.lineWidth=1,e.beginPath(),e.arc(l,r,9.5,0,2*Math.PI),e.stroke()),e.strokeStyle=c?"#38bdf8":k,e.lineWidth=c?1.8:1.2,e.beginPath(),e.arc(l,r,c?5.5:3.8,0,2*Math.PI),e.stroke(),e.fillStyle=c?"#ffffff":k,e.beginPath(),e.arc(l,r,c?2:1.5,0,2*Math.PI),e.fill()}const u=(t.elevationM/1e3).toFixed(1),h=t.elevationM>=0?"+":"",v=c?`● ${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${h}${u}km)`:`${t.name} ${Math.abs(t.lat).toFixed(1)}°S (${h}${u}km)`;e.font=c?'bold 7.5px "JetBrains Mono", monospace':'7.5px "JetBrains Mono", monospace';const g=e.measureText(v).width;let m=0,f=0;switch(t.id){case"shackleton-rim":m=l+12,f=r+12;break;case"malapert":m=l+10,f=r-8;break;case"nobile-rim-1":m=l+10,f=r+8;break;case"haworth-rim":m=l-g-14,f=r-8;break;case"de-gerlache-rim":m=l-g-14,f=r+6;break;case"site-01":m=l-g-14,f=r+16;break;default:m=l>=this.centerX?l+10:l-g-14,f=r>=this.centerY?r+8:r-8;break}e.strokeStyle=c?d?"rgba(245, 158, 11, 0.70)":"rgba(56, 189, 248, 0.70)":"rgba(148, 163, 184, 0.25)",e.lineWidth=1,e.beginPath();const E=m>l?m:m+g+8,_=f+6.5;e.moveTo(l,r),e.lineTo(E,_),e.stroke(),e.fillStyle="rgba(6, 12, 22, 0.92)",e.strokeStyle=c?d?"#f59e0b":"#38bdf8":o?"rgba(103, 232, 249, 0.60)":"rgba(148, 163, 184, 0.28)",e.lineWidth=c?1.4:1,e.beginPath(),e.roundRect(m,f,g+8,13,2),e.fill(),e.stroke(),e.fillStyle=c?d?"#fef08a":"#ffffff":o?"#e2e8f0":"#cbd5e1",e.textAlign="left",e.textBaseline="middle",e.fillText(v,m+4,f+6.5),e.restore()})}drawCustomSelectionMarker(e){if(!this.customSelection)return;const{x:s,y:t}=Ie(this.customSelection.lon,this.customSelection.lat),{cx:i,cy:n}=this.projectMetersToCanvas(s,t);e.save(),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.beginPath(),e.arc(i,n,6,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(i-9,n),e.lineTo(i+9,n),e.moveTo(i,n-9),e.lineTo(i,n+9),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i,n,2,0,2*Math.PI),e.fill();const l=`● Custom Target: ${Math.abs(this.customSelection.lat).toFixed(2)}°S, ${this.customSelection.lon.toFixed(1)}°E`;e.font='bold 7.5px "JetBrains Mono", monospace';const r=e.measureText(l).width,c=i>=this.centerX?i+12:i-r-14,o=n-6;e.strokeStyle="rgba(245, 158, 11, 0.70)",e.lineWidth=1,e.beginPath(),e.moveTo(i,n),e.lineTo(c>i?c:c+r+8,o+6.5),e.stroke(),e.fillStyle="rgba(8, 14, 26, 0.95)",e.strokeStyle="#f59e0b",e.lineWidth=1.4,e.beginPath(),e.roundRect(c,o,r+8,13,2),e.fill(),e.stroke(),e.fillStyle="#fef08a",e.textAlign="left",e.textBaseline="middle",e.fillText(l,c+4,o+6.5),e.restore()}handleMouseMove(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;let n=null,l=14;for(const r of J){const{x:c,y:o}=Ie(r.lon,r.lat),{cx:d,cy:u}=this.projectMetersToCanvas(c,o),h=Math.hypot(t-d,i-u);h<l&&(l=h,n=r)}n?(this.hoveredSite=n,this.canvas.style.cursor="pointer",this.showTooltip(n,e.clientX,e.clientY),this.draw()):(this.hoveredSite=null,this.canvas.style.cursor="crosshair",this.tooltipEl.classList.add("hidden"),this.draw())}showTooltip(e,s,t){const i=e.id==="site-01",n=e.id==="south-pole",l=i?"#f59e0b":n?"#22d3ee":"#38bdf8";this.tooltipEl.innerHTML=`
      <span class="spe-tt-dot" style="background:${l};box-shadow:0 0 6px ${l};"></span>
      <span class="spe-tt-name">${e.name}</span>
      <span class="spe-tt-lat">· ${Math.abs(e.lat).toFixed(1)}°S</span>
    `;const r=Math.min(s+14,window.innerWidth-180),c=Math.max(10,Math.min(t-20,window.innerHeight-50));this.tooltipEl.style.left=`${r}px`,this.tooltipEl.style.top=`${c}px`,this.tooltipEl.classList.remove("hidden")}handleClick(e){const s=this.canvas.getBoundingClientRect(),t=e.clientX-s.left,i=e.clientY-s.top;this.tooltipEl.classList.add("hidden");let n=null,l=14;for(const v of J){const{x:g,y:m}=Ie(v.lon,v.lat),{cx:f,cy:E}=this.projectMetersToCanvas(g,m),_=Math.hypot(t-f,i-E);_<l&&(l=_,n=v)}if(n){this.selectedSiteId=n.id,this.customSelection=null,this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData());return}const{x:r,y:c}=this.unprojectCanvasToMeters(t,i);if(Math.hypot(r,c)>this.MAX_EXTENT_M)return;const{lonDeg:d,latDeg:u}=Ut(r,c),h=lt(d,u);this.selectedSiteId="custom",this.customSelection={lat:Number(u.toFixed(3)),lon:Number(d.toFixed(2)),elevM:0,isInsideDEM:h},this.draw(),this.onSelectCallback&&this.onSelectCallback(this.getCurrentSiteData())}updateInfoCard(){if(!this.container.querySelector("#spe-info-card"))return;let s="Artemis Site 01",t="Shackleton–de Gerlache Connecting Ridge",i=-89.463,n=222.51,l=1100,r="High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",c=!0,o="CANDIDATE SITE";if(this.selectedSiteId==="custom"&&this.customSelection)s="Custom Selected Location",t="User Chosen Lunar Site",i=this.customSelection.lat,n=this.customSelection.lon,l=this.customSelection.elevM,c=this.customSelection.isInsideDEM,o="CUSTOM LOCATION",r=c?"Location lies within the validated 5 m/px high-resolution Site 01 DEM.":"Location lies outside the 5 m/px DEM footprint. Global LOLA ~60 m/px altimetry will be used for geometric ephemerides.";else{const u=J.find(h=>h.id===this.selectedSiteId)||J[0];s=u.name,t=u.designation,i=u.lat,n=u.lon,l=u.elevationM,r=u.description,c=!!u.isInsideSite01DEM,o=u.id==="south-pole"?"GEODETIC DATUM":"VERIFIED CANDIDATE"}const d=dt(i);this.setText("#spe-site-type",o),this.setText("#spe-site-cov",c?"5 m/px High-Resolution DEM":"Global LOLA (~60 m/px)"),this.setText("#spe-site-name",s),this.setText("#spe-site-desig",t),this.setText("#spe-cell-lat",`${i>=0?"+":""}${i.toFixed(3)}° S`),this.setText("#spe-cell-lon",`${n.toFixed(2)}° E`),this.setText("#spe-cell-elev",`${l>=0?"+":""}${l.toLocaleString()} m`),this.setText("#spe-cell-dist",`${d.toFixed(1)} km`),this.setText("#spe-site-desc",r)}setText(e,s){const t=this.container.querySelector(e);t&&(t.textContent=s)}}class Fs{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(e,s){s&&(this.selectedFormat=s),this.mode="mission",this.missionContext=e,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(e,s){s&&(this.selectedFormat=s),this.mode="comparison",this.comparisonContext=e,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(e="mission"){this.isOpen?this.close():e==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var i,n,l,r,c,o,d,u;const e=this.mode==="mission",s=e?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",t=e?`${((i=this.missionContext)==null?void 0:i.scenarioName)??"Mission"} · ${((n=this.missionContext)==null?void 0:n.siteName)??"Selected Site"} (${(r=(l=this.missionContext)==null?void 0:l.latitudeDeg)==null?void 0:r.toFixed(3)}°N, ${(o=(c=this.missionContext)==null?void 0:c.longitudeDeg)==null?void 0:o.toFixed(3)}°E)`:`${((d=this.comparisonContext)==null?void 0:d.reportTitle)??"Candidate Comparison"} · ${((u=this.comparisonContext)==null?void 0:u.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
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
      </div>`}return""}wireEvents(){var s,t,i,n;(s=this.container.querySelector("#btn-close-export"))==null||s.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#btn-cancel-export"))==null||t.addEventListener("click",()=>this.close()),(i=this.container.querySelector("#export-backdrop"))==null||i.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(l=>{l.addEventListener("click",()=>{if(this.isGenerating)return;const r=l.getAttribute("data-format")||"pdf";this.selectedFormat=r,this.render()})}),(n=this.container.querySelector("#btn-generate-export"))==null||n.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(e){console.error("[LUNAOPS] Export failed:",e),this.statusMessage={type:"error",text:e.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var r;if(!this.missionContext)throw new Error("Missing mission scenario context.");const e=this.missionContext,s={scenario_name:e.scenarioName||"Artemis Candidate Mission",notes:e.notes||"",site_name:e.siteName||"South Pole Site",latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:e.startUtc,end_utc:e.endUtc,step_minutes:e.stepMinutes,timeline_result:e.timelineResponse||null,horizon_result:e.horizonProfile||null},t=`${Te}/api/export/mission?format=${this.selectedFormat}`,i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok){let c=`HTTP ${i.status}`;try{const o=await i.json();c=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{c=await i.text()}throw new Error(`Export failed: ${c}`)}const n=(e.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const c=await i.blob();this.triggerDownload(c,`lunaops_${n}_report_${l}.pdf`)}else if(this.selectedFormat==="csv"){const c=await i.text(),o=new Blob([c],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_${n}_timeseries_${l}.csv`)}else{const c=await i.json(),o=new Blob([JSON.stringify(c,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_${n}_manifest_${l}.json`)}}async exportComparison(){var r;if(!this.comparisonContext)throw new Error("Missing comparison context.");const e=this.comparisonContext;if(!e.scenarios||e.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const s=e.scenarios.map(c=>{let o=`${c.startDate}T${c.startTime}`;o.endsWith("Z")||(o+="Z");let d=`${c.endDate}T${c.endTime}`;return d.endsWith("Z")||(d+="Z"),{id:c.id,name:c.name,latitude_deg:c.latitudeDeg,longitude_deg:c.longitudeDeg,elevation_m:c.elevationM,instrument_height_m:c.instrumentHeightM,start_utc:o,end_utc:d,step_minutes:c.stepMinutes}}),t={report_title:e.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:s,constraints:e.constraints||null,ranking_weights:e.rankingWeights||null,comparison_result:e.comparisonResult||null},i=`${Te}/api/export/comparison?format=${this.selectedFormat}`,n=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok){let c=`HTTP ${n.status}`;try{const o=await n.json();c=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{c=await n.text()}throw new Error(`Comparison export failed: ${c}`)}const l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const c=await n.blob();this.triggerDownload(c,`lunaops_comparison_report_${l}.pdf`)}else if(this.selectedFormat==="csv"){const c=await n.text(),o=new Blob([c],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_comparison_matrix_${l}.csv`)}else{const c=await n.json(),o=new Blob([JSON.stringify(c,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_comparison_manifest_${l}.json`)}}triggerDownload(e,s){const t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}class ea{constructor(){b(this,"metadata",null);b(this,"elevCanvas",null);b(this,"slopeCanvas",null);b(this,"toterrCanvas",null);b(this,"elevCtx",null);b(this,"slopeCtx",null);b(this,"toterrCtx",null);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const e=await fetch("/generated/site01_metadata.json");if(!e.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await e.json();const[s,t,i]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(s),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(t),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(i),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(e){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",e)}})(),this.loadPromise)}loadImage(e){return new Promise((s,t)=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>s(i),i.onerror=n=>t(n),i.src=e})}createCanvasFromImage(e){const s=document.createElement("canvas");s.width=e.width,s.height=e.height;const t=s.getContext("2d",{willReadFrequently:!0});return t&&t.drawImage(e,0,0),s}getMetadata(){return this.metadata}sample(e,s){var c,o;const{x:t,y:i}=Ie(e,s),{px512:n,py512:l,isInside:r}=Bi(t,i);if(!r||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:r,px:n,py:l,xM:t,yM:i};try{const d=this.elevCtx.getImageData(n,l,1,1).data[0],u=((c=this.slopeCtx)==null?void 0:c.getImageData(n,l,1,1).data[0])??0,h=((o=this.toterrCtx)==null?void 0:o.getImageData(n,l,1,1).data[0])??0,v=this.metadata.elev_max_m-this.metadata.elev_min_m,g=this.metadata.elev_min_m+d/255*v,m=u/255*this.metadata.slope_max_deg,f=h/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(g*10)/10,slopeDeg:Math.round(m*10)/10,errorM:Math.round(f*100)/100,px:n,py:l,xM:t,yM:i}}catch{return{isInside:r,px:n,py:l,xM:t,yM:i}}}}const Es=new ea,F=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class ta{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"onSiteChangedCallback");this.selectedSite={name:F[0].name,designation:F[0].designation,latitudeDeg:F[0].lat,longitudeDeg:F[0].lon,elevationM:F[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(e){this.onSiteChangedCallback=e}setOnTimelineScrubbed(e){this.onTimelineScrubbedCallback=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(e,s,t,i){if(this.selectedSite.latitudeDeg=Math.round(e*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(s*1e3)/1e3,t&&!t.toLowerCase().includes("custom"))this.selectedSite.name=t,this.selectedSite.designation=i||"Landing Candidate";else{const n=J.find(l=>Math.abs(l.lat-e)<.08&&Math.abs(l.lon-s)<.08);n?(this.selectedSite.name=n.name,this.selectedSite.designation=n.designation):(this.selectedSite.name=t||"Custom Selected Location",this.selectedSite.designation=i||"User Chosen Site")}this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}async init(){await Es.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await Ht()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const e=this.selectedSite.latitudeDeg,s=this.selectedSite.longitudeDeg,t=Es.sample(s,e);if(this.selectedSite.isInsideSite01DEM=t.isInside,t.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords={px:t.px,py:t.py,gridMax:512},this.selectedSite.polarStereoM={x:t.xM,y:t.yM},t.elevationM!==void 0&&(this.selectedSite.elevationM=t.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:i,y:n}=Ie(s,e);this.selectedSite.polarStereoM={x:i,y:n};const l=J.find(r=>Math.abs(r.lat-e)<.08&&Math.abs(r.lon-s)<.08);l&&(this.selectedSite.elevationM=l.elevationM)}this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const e=`${this.timeline.startDate}T${this.timeline.startTime}Z`,s=Date.parse(e);if(isNaN(s))return;this.timeline.isoUtcStart=new Date(s).toISOString().replace(".000Z","Z");const t=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,i=s+this.timeline.durationValue*t;this.timeline.isoUtcEnd=new Date(i).toISOString().replace(".000Z","Z");const n=new Date(s).getUTCFullYear(),l=new Date(i).getUTCFullYear();this.timeline.isWithinKernelCoverage=n>=1900&&n<=2050&&l>=1900&&l<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var l;const e=[];(l=this.spiceHealth)!=null&&l.initialized?e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const s=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;s>=-90&&s<=90&&t>=-180&&t<=360?e.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${re(s,t)} · Elevation: ${this.selectedSite.elevationM} m`}):e.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?e.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):e.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let i="READY",n="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return e.some(r=>r.status==="fail")?(i="ERROR",n="One or more required parameters failed validation. Correct items marked in red."):e.some(r=>r.status==="warn")&&(i="READY_WITH_LIMITATIONS",n="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:i,summary:n,checks:e}}toScenarioJSON(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:e,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();this.container.innerHTML=`
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
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(e){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(e);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(e);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.horizonVisibility,t=this.horizonProfile,i=c=>c==="no_obstruction_detected_within_coverage"?"✅":c==="near_horizon_grazing"?"⚠️":c==="blocked_by_local_terrain"?"🪨":c==="blocked_by_lunar_body"?"🌑":"❓",n=c=>c==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":c==="near_horizon_grazing"?"Near-Horizon Grazing":c==="blocked_by_local_terrain"?"Blocked by Terrain":c==="blocked_by_lunar_body"?"Occulted by Moon":c==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",l=c=>c==="no_obstruction_detected_within_coverage"?"#22c55e":c==="near_horizon_grazing"?"#f59e0b":c.startsWith("blocked")?"#ef4444":"#94a3b8",r=(c,o,d)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${l(d.visibility_status)}">
          <span class="geom-body-title">${o} ${c}</span>
          <span class="horizon-badge" style="background: ${l(d.visibility_status)}22; color: ${l(d.visibility_status)}; border: 1px solid ${l(d.visibility_status)}44">
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
                    <p>Current coordinates (${re(e,s)}) fall outside the 16×16 km Site 01 tile.</p>
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
            ${F.map(i=>`
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
    `}renderTimelineTab(){const e=this.selectedSite.isInsideSite01DEM,s=this.timelineResponse,t=s==null?void 0:s.summary,i=(s==null?void 0:s.samples)??[],n=i[this.scrubbedSampleIndex]??i[0],l=d=>{switch(d){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},r=d=>{switch(d){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},c=d=>{switch(d){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},o=d=>{switch(d){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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
                <div class="timeline-bar-seg" style="flex: ${d.duration_hours}; background: ${o(d.state)};" title="${d.state.replace(/_/g," ")}: ${d.duration_hours}h (${d.start_utc} → ${d.end_utc})"></div>
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
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${l(n.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${n.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${n.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${n.sun.terrain_horizon_elevation_deg!==null?n.sun.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(n.sun.angular_clearance_deg??0)>=0?"#22c55e":"#ef4444"}">${n.sun.angular_clearance_deg!==null?(n.sun.angular_clearance_deg>=0?"+":"")+n.sun.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${r(n.earth.visibility_state)}</span></div>
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
                  <td style="padding:6px;">${l(d.state)}</td>
                </tr>
              `).join("")}
              ${s.earth_windows.map(d=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${d.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${d.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${r(d.state)}</td>
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
              <td><code>${re(s,t)}</code></td>
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
    `}openExportModal(e){this.exportPanel||(this.exportPanel=new Fs),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},e)}renderExportTab(){const e=this.timelineResponse!==null;return`
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
    `}renderLandingWindowsTab(){const e=this.landingWindowsResponse,s=(e==null?void 0:e.days)??[],t=e==null?void 0:e.scan_params,i=e==null?void 0:e.summary,n=o=>{try{return new Date(o+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return o}},l=(o,d)=>{switch(o){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${d})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${d})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${d})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${d})</span>`}},r=o=>{switch(o){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},c=s.filter(o=>this.landingWindowsFilter==="safe"?o.is_safe_for_landing:this.landingWindowsFilter==="excellent"?o.safety_rating==="excellent":!0);return`
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
        ${c.map(o=>`
          <div class="window-day-card ${o.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${n(o.date)}</span>
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
    `}drawTerrainCanvas(){setTimeout(()=>{const e=document.getElementById("site01-terrain-canvas");if(!e)return;this.terrainCtx=e.getContext("2d");const s=new Image;s.crossOrigin="anonymous";const t=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";s.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(s,0,0,512,512),this.selectedSite.pixelCoords)){const{px:i,py:n}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(i-14,n),this.terrainCtx.lineTo(i+14,n),this.terrainCtx.moveTo(i,n-14),this.terrainCtx.lineTo(i,n+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(i,n,6,0,2*Math.PI),this.terrainCtx.stroke()}},s.src=t},50)}wireEvents(){var B,$,q,L,ee,j,H,te,be,Fe,de,Be,Qe,je;(B=this.container.querySelector("#btn-close-workspace"))==null||B.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(y=>{y.addEventListener("click",M=>{const D=M.currentTarget;this.currentTab=D.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(y=>{y.addEventListener("click",M=>{const A=M.currentTarget.dataset.presetId,K=F.find(ke=>ke.id===A);K&&(this.selectedSite.name=K.name,this.selectedSite.designation=K.designation,this.selectedSite.latitudeDeg=K.lat,this.selectedSite.longitudeDeg=K.lon,this.selectedSite.elevationM=K.elev,this.updateSiteCoverageAndSample(),this.render())})}),($=this.container.querySelector("#btn-jump-site01"))==null||$.addEventListener("click",()=>{const y=F[0];this.selectedSite.name=y.name,this.selectedSite.designation=y.designation,this.selectedSite.latitudeDeg=y.lat,this.selectedSite.longitudeDeg=y.lon,this.selectedSite.elevationM=y.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(y=>{y.addEventListener("click",M=>{const D=M.currentTarget;this.activeTerrainLayer=D.dataset.layer||"elev",this.render()})});const e=this.container.querySelector("#inp-lat"),s=this.container.querySelector("#inp-lon"),t=this.container.querySelector("#inp-elev"),i=()=>{if(!e||!s||!t)return;const y=parseFloat(e.value),M=parseFloat(s.value),D=parseFloat(t.value);!isNaN(y)&&!isNaN(M)&&(this.selectedSite.latitudeDeg=y,this.selectedSite.longitudeDeg=M,this.selectedSite.elevationM=isNaN(D)?0:D,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};e==null||e.addEventListener("change",i),s==null||s.addEventListener("change",i),t==null||t.addEventListener("change",i);const n=this.container.querySelector("#site01-terrain-canvas");n==null||n.addEventListener("click",y=>{const M=n.getBoundingClientRect(),D=y.clientX-M.left,A=y.clientY-M.top,K=Math.round(D/M.width*512),ke=Math.round(A/M.height*512),{lonDeg:Lt,latDeg:Dt}=ji(K,ke);this.selectedSite.latitudeDeg=Math.round(Dt*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(Lt*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${K}, ${ke})`,this.updateSiteCoverageAndSample(),this.render()});const l=this.container.querySelector("#inp-start-date"),r=this.container.querySelector("#inp-start-time"),c=this.container.querySelector("#inp-duration-val"),o=this.container.querySelector("#inp-duration-unit"),d=this.container.querySelector("#inp-timestep"),u=()=>{l&&(this.timeline.startDate=l.value),r&&(this.timeline.startTime=r.value),c&&(this.timeline.durationValue=parseInt(c.value,10)||1),o&&(this.timeline.durationUnit=o.value),d&&(this.timeline.timeStepHours=parseFloat(d.value)||1),this.computeIsoTimestamps(),this.render()};l==null||l.addEventListener("change",u),r==null||r.addEventListener("change",u),c==null||c.addEventListener("change",u),o==null||o.addEventListener("change",u),d==null||d.addEventListener("change",u);const h=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const y=Math.round(this.timeline.timeStepHours*60),M=await zi({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:y,refinement_tolerance_sec:60});this.timelineResponse=M,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),M.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(M.samples[0])}catch(y){this.timelineLoading=!1,this.timelineError=y.message??String(y),this.render()}};(q=this.container.querySelector("#btn-calc-timeline"))==null||q.addEventListener("click",h);const v=this.container.querySelector("#inp-timeline-scrubber");v==null||v.addEventListener("input",()=>{var D;const y=parseInt(v.value,10);this.scrubbedSampleIndex=y;const M=(D=this.timelineResponse)==null?void 0:D.samples[y];M&&(this.updateScrubbedReadout(M),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(M))});const g=this.container.querySelector("#inp-scen-name"),m=this.container.querySelector("#inp-scen-notes");g==null||g.addEventListener("input",()=>{this.scenarioName=g.value}),m==null||m.addEventListener("input",()=>{this.scenarioNotes=m.value});const f=async()=>{try{const y=this.container.querySelector("#btn-eval-spice-tab"),M=this.container.querySelector("#btn-eval-spice-footer");y&&(y.disabled=!0,y.textContent="Calculating SPICE..."),M&&(M.disabled=!0,M.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const D=await Ps({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=D,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(y){console.error("[MissionWorkspace] SPICE Calculation Error:",y),this.currentTab="readiness",this.render();const M=this.container.querySelector(".geometry-preview-area");M&&(M.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${y.message||y}</p>
            </div>
          `)}};(L=this.container.querySelector("#btn-eval-spice-tab"))==null||L.addEventListener("click",f),(ee=this.container.querySelector("#btn-eval-spice-footer"))==null||ee.addEventListener("click",f),(j=this.container.querySelector("#btn-eval-horizon"))==null||j.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const y=this.initialGeometry,[M,D]=await Promise.all([Fi({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),$s({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:y.sun.azimuth_deg,sun_elevation_deg:y.sun.elevation_deg,sun_distance_km:y.sun.distance_km,earth_azimuth_deg:y.earth.azimuth_deg,earth_elevation_deg:y.earth.elevation_deg,earth_distance_km:y.earth.distance_km})]);this.horizonProfile=M,this.horizonVisibility=D,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(y){this.horizonLoading=!1,this.horizonError=y.message??String(y),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const E=()=>{const y=this.toScenarioJSON(),M=new Blob([JSON.stringify(y,null,2)],{type:"application/json"}),D=URL.createObjectURL(M),A=document.createElement("a");A.href=D,A.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,A.click(),URL.revokeObjectURL(D)};(H=this.container.querySelector("#btn-export-scenario"))==null||H.addEventListener("click",E),(te=this.container.querySelector("#btn-open-export-panel-footer"))==null||te.addEventListener("click",()=>this.openExportModal()),(be=this.container.querySelector("#btn-open-full-export-dialog"))==null||be.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(y=>{y.addEventListener("click",()=>{const M=y.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(M)})}),(Fe=this.container.querySelector("#btn-export-scenario-summary"))==null||Fe.addEventListener("click",E);const _=this.container.querySelector("#inp-windows-start-date"),C=this.container.querySelector("#inp-windows-end-date");_==null||_.addEventListener("change",()=>{_.value&&(this.landingWindowsStartDate=_.value)}),C==null||C.addEventListener("change",()=>{C.value&&(this.landingWindowsEndDate=C.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(y=>{y.addEventListener("click",M=>{const A=M.currentTarget.dataset.preset;if(A==="30d"){const K=new Date(this.timeline.startDate+"T00:00:00Z"),ke=new Date(K.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=K.toISOString().slice(0,10),this.landingWindowsEndDate=ke.toISOString().slice(0,10)}else A==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):A==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(y=>{y.addEventListener("click",M=>{const A=M.currentTarget.dataset.filter;A&&(this.landingWindowsFilter=A,this.render())})});const P=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const y=await As({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=y,this.landingWindowsLoading=!1,this.render()}catch(y){this.landingWindowsLoading=!1,this.landingWindowsError=y.message??String(y),this.render()}};(de=this.container.querySelector("#btn-scan-landing-windows"))==null||de.addEventListener("click",P),(Be=this.container.querySelector("#btn-run-initial-scan"))==null||Be.addEventListener("click",P);const k=y=>{this.timeline.startDate=y,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(Qe=this.container.querySelector("#btn-apply-best-window"))==null||Qe.addEventListener("click",y=>{const D=y.currentTarget.dataset.date;D&&k(D)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(y=>{y.addEventListener("click",M=>{const A=M.currentTarget.dataset.date;A&&k(A)})}),(je=this.container.querySelector("#btn-apply-3d-view"))==null||je.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const e=document.getElementById("horizon-polar-canvas");if(!e||!this.horizonProfile)return;const s=this.horizonProfile,t=e.getContext("2d");if(!t)return;const i=e.width,n=e.height,l=i/2,r=n/2,c=Math.min(i,n)/2-32;t.clearRect(0,0,i,n),t.fillStyle="#0a0f1e",t.fillRect(0,0,i,n);const o=Math.max(...s.profile.map(v=>v.horizon_elevation_deg),10);[0,o*.25,o*.5,o*.75,o].forEach(v=>{const g=c*(1-v/o);t.beginPath(),t.arc(l,r,Math.max(g,1),0,2*Math.PI),t.strokeStyle="rgba(148,163,184,0.15)",t.lineWidth=1,t.stroke(),v>0&&(t.fillStyle="rgba(148,163,184,0.5)",t.font="10px Inter, sans-serif",t.fillText(`${v.toFixed(1)}°`,l+4,r-g+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([v,g])=>{const m=(Number(g)-90)*Math.PI/180;t.beginPath(),t.moveTo(l,r),t.lineTo(l+c*Math.cos(m),r+c*Math.sin(m)),t.strokeStyle="rgba(148,163,184,0.2)",t.lineWidth=1,t.stroke(),t.fillStyle="#94a3b8",t.font="bold 11px Inter, sans-serif",t.fillText(String(v),l+(c+16)*Math.cos(m)-4,r+(c+16)*Math.sin(m)+4)}),t.beginPath(),s.profile.forEach((v,g)=>{const m=(v.azimuth_deg-90)*Math.PI/180,f=c*(1-Math.min(v.horizon_elevation_deg,o)/o),E=l+f*Math.cos(m),_=r+f*Math.sin(m);g===0?t.moveTo(E,_):t.lineTo(E,_)}),t.closePath(),t.fillStyle="rgba(56,189,248,0.15)",t.fill(),t.strokeStyle="#38bdf8",t.lineWidth=2,t.stroke();const h=this.horizonVisibility;if(h){const v=(g,m,f,E)=>{const _=(g-90)*Math.PI/180,C=c*(1-Math.max(0,Math.min(m,o))/o),P=l+C*Math.cos(_),k=r+C*Math.sin(_);t.beginPath(),t.arc(P,k,8,0,2*Math.PI),t.fillStyle=f,t.fill(),t.fillStyle="#fff",t.font="bold 10px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(E,P,k),t.textAlign="start",t.textBaseline="alphabetic"};v(h.sun.azimuth_deg,h.sun.geometric_elevation_deg,"#f59e0b","☀"),v(h.earth.azimuth_deg,h.earth.geometric_elevation_deg,"#3b82f6","🌍")}t.beginPath(),t.arc(l,r,4,0,2*Math.PI),t.fillStyle="#38bdf8",t.fill()}updateScrubbedReadout(e){var c,o;const s=this.container.querySelector("#scrubbed-time-val");s&&(s.textContent=e.timestamp_utc);const t=d=>{switch(d){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},i=d=>{switch(d){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},n=this.container.querySelector("#scrubbed-sun-state");n&&(n.innerHTML=t(e.sun.visibility_state));const l=this.container.querySelector("#scrubbed-earth-state");l&&(l.innerHTML=i(e.earth.visibility_state));const r=this.container.querySelector("#scrubbed-conditions-panel");if(r){const d=(c=r.querySelectorAll(".scrubbed-col")[0])==null?void 0:c.querySelectorAll(".scrubbed-val-row strong");if(d&&d.length>=4){d[0].textContent=`${e.sun.azimuth_deg.toFixed(2)}°`,d[1].textContent=`${e.sun.elevation_deg.toFixed(2)}°`,d[2].textContent=e.sun.terrain_horizon_elevation_deg!==null?`${e.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const h=e.sun.angular_clearance_deg;d[3].textContent=h!==null?`${h>=0?"+":""}${h.toFixed(2)}°`:"—",d[3].style.color=(h??0)>=0?"#22c55e":"#ef4444"}const u=(o=r.querySelectorAll(".scrubbed-col")[1])==null?void 0:o.querySelectorAll(".scrubbed-val-row strong");if(u&&u.length>=4){u[0].textContent=`${e.earth.azimuth_deg.toFixed(2)}°`,u[1].textContent=`${e.earth.elevation_deg.toFixed(2)}°`,u[2].textContent=e.earth.terrain_horizon_elevation_deg!==null?`${e.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const h=e.earth.angular_clearance_deg;u[3].textContent=h!==null?`${h>=0?"+":""}${h.toFixed(2)}°`:"—",u[3].style.color=(h??0)>=0?"#3b82f6":"#ef4444"}}}}class sa{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new Fs),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(e){this.onInspectSiteOnGlobe=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:F[0].lat,longitudeDeg:F[0].lon,elevationM:F[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:F[3].lat,longitudeDeg:F[3].lon,elevationM:F[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(e){var i,n,l,r;const s=F.find(c=>c.id===e)||F[0],t=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${t} · ${s.name}`,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elev,instrumentHeightM:2,startDate:((i=this.scenarios[0])==null?void 0:i.startDate)||"2026-10-16",startTime:((n=this.scenarios[0])==null?void 0:n.startTime)||"12:00:00",endDate:((l=this.scenarios[0])==null?void 0:l.endDate)||"2026-10-23",endTime:((r=this.scenarios[0])==null?void 0:r.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(e){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(s=>s.id!==e),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=this.scenarios.map(t=>({id:t.id,name:t.name,latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:`${t.startDate}T${t.startTime}Z`,end_utc:`${t.endDate}T${t.endTime}Z`,step_minutes:t.stepMinutes})),s=await Hi({scenarios:e,constraints:this.constraints});this.comparisonResult=s}catch(e){this.errorMessage=e.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
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
          ${F.map(i=>`<option value="${i.id}" ${i.name.includes(e.name.split("·")[0].trim())?"selected":""}>${i.name} (${i.lat}°S, ${i.lon}°E)</option>`).join("")}
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
                  <strong>${re(s.inputs.latitude_deg,s.inputs.longitude_deg)}</strong>
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
    `}drawSynchronizedTimelines(){const e=document.getElementById("synced-timeline-canvas");if(!e||!this.comparisonResult)return;const s=e.getContext("2d");if(!s)return;const t=e.width,i=e.height;s.clearRect(0,0,t,i);const n=this.comparisonResult.scenarios;if(n.length===0)return;const l=Math.floor((i-40)/n.length);s.fillStyle="#94a3b8",s.font="10px JetBrains Mono, monospace",s.fillText("MISSION TIMELINE EPOCHS",15,18),n.forEach((r,c)=>{const o=30+c*l,d=l-12;s.fillStyle="#e2e8f0",s.font="11px Inter, sans-serif",s.fillText(`${r.scenario_name}`,15,o-4),s.fillStyle="rgba(15, 23, 42, 0.6)",s.fillRect(15,o,t-30,d);const u=r.timeline_result.sun_windows,h=Date.parse(r.inputs.start_utc),g=Date.parse(r.inputs.end_utc)-h;g>0&&(u.forEach(f=>{const E=Date.parse(f.start_utc),_=Date.parse(f.end_utc),C=15+(E-h)/g*(t-30),P=15+(_-h)/g*(t-30),k=Math.max(1,P-C);f.state==="full_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.9)":f.state==="partial_sunlight"?s.fillStyle="rgba(245, 158, 11, 0.5)":f.state==="total_darkness"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(C,o,k,d/2-1)}),r.timeline_result.earth_windows.forEach(f=>{const E=Date.parse(f.start_utc),_=Date.parse(f.end_utc),C=15+(E-h)/g*(t-30),P=15+(_-h)/g*(t-30),k=Math.max(1,P-C);f.state==="full_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.9)":f.state==="centre_only_los"||f.state==="partial_disc_los"?s.fillStyle="rgba(56, 189, 248, 0.5)":f.state==="occulted"?s.fillStyle="rgba(30, 41, 59, 0.9)":s.fillStyle="rgba(147, 51, 234, 0.6)",s.fillRect(C,o+d/2+1,k,d/2-2)})),s.strokeStyle="rgba(148, 163, 184, 0.15)",s.strokeRect(15,o,t-30,d)})}wireEvents(){var e,s,t,i,n,l,r,c;(e=document.getElementById("btn-close-comparison"))==null||e.addEventListener("click",()=>{this.close()}),(s=document.getElementById("btn-add-candidate"))==null||s.addEventListener("click",()=>{this.addScenario()}),(t=document.getElementById("btn-sync-dates"))==null||t.addEventListener("click",()=>{if(this.scenarios.length>=2){const o=this.scenarios[0];for(let d=1;d<this.scenarios.length;d++)this.scenarios[d].startDate=o.startDate,this.scenarios[d].startTime=o.startTime,this.scenarios[d].endDate=o.endDate,this.scenarios[d].endTime=o.endTime;this.render()}}),(i=document.getElementById("btn-run-comparison"))==null||i.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(o=>{o.addEventListener("click",d=>{const u=d.currentTarget.getAttribute("data-id");u&&this.removeScenario(u)})}),this.container.querySelectorAll(".select-preset").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=u.getAttribute("data-id"),v=u.value,g=F.find(m=>m.id===v);if(h&&g){const m=this.scenarios.find(f=>f.id===h);m&&(m.name=g.name,m.latitudeDeg=g.lat,m.longitudeDeg=g.lon,m.elevationM=g.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(o=>{o.addEventListener("input",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.name=u.value)})}),this.container.querySelectorAll(".input-lat").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.latitudeDeg=parseFloat(u.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.longitudeDeg=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.elevationM=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.startDate=u.value)})}),this.container.querySelectorAll(".input-end-date").forEach(o=>{o.addEventListener("change",d=>{const u=d.currentTarget,h=this.scenarios.find(v=>v.id===u.getAttribute("data-id"));h&&(h.endDate=u.value)})}),(n=document.getElementById("constraint-min-sun"))==null||n.addEventListener("change",o=>{const d=o.currentTarget.value;this.constraints.min_sunlight_percent=d!==""?parseFloat(d):null}),(l=document.getElementById("constraint-min-earth"))==null||l.addEventListener("change",o=>{const d=o.currentTarget.value;this.constraints.min_earth_los_percent=d!==""?parseFloat(d):null}),(r=document.getElementById("constraint-max-slope"))==null||r.addEventListener("change",o=>{const d=o.currentTarget.value;this.constraints.max_slope_deg=d!==""?parseFloat(d):null}),(c=document.getElementById("constraint-max-dark"))==null||c.addEventListener("change",o=>{const d=o.currentTarget.value;this.constraints.max_continuous_darkness_hours=d!==""?parseFloat(d):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(o=>{o.addEventListener("click",d=>{const u=d.currentTarget.getAttribute("data-id"),h=this.scenarios.find(v=>v.id===u);h&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:h.name,lat:h.latitudeDeg,lon:h.longitudeDeg,elevationM:h.elevationM})})})}}const Re=1.6,zs=1737.4,Gt=-8.9815,Hs=10.6855,ia=Hs-Gt,Ms=512,aa=132361;let ve=null,N,Ce=null,X=null,Q=null,pe=null,O=null,St=null,yt=null,V=null,W=null,at=!1,gt=.6,nt=!1,me=!1,wt=-89.463,Et=222.51,Ze=null,_s=null,vt=null,Nt=null,Ft=0,zt=0,Oe=null,he=null;function Mt(a,e,s=1.2){he={startPos:le.position.clone(),targetPos:a.clone(),startLook:ne.target.clone(),targetLook:e.clone(),startTime:performance.now(),duration:s*1e3}}const Je=document.createElement("canvas"),na=document.getElementById("app");na.appendChild(Je);const ue=new vi({canvas:Je,antialias:!0,powerPreference:"high-performance"});ue.setSize(window.innerWidth,window.innerHeight);ue.setPixelRatio(Math.min(window.devicePixelRatio,2));ue.outputColorSpace=xs;ue.toneMapping=bi;ue.toneMappingExposure=.95;ue.shadowMap.enabled=!1;const Ue=new fi;Ue.background=new Si(aa);const le=new yi(36,window.innerWidth/window.innerHeight,.01,500);le.position.set(0,.2,4);const ne=new Ni(le,ue.domElement);ne.enableDamping=!0;ne.dampingFactor=.06;ne.minDistance=1.75;ne.maxDistance=12;ne.enablePan=!1;ne.rotateSpeed=.45;ne.zoomSpeed=.7;let Wt=!1;ne.addEventListener("start",()=>{Wt=!0});ne.addEventListener("end",()=>{Wt=!1});const oa=new wi(395539,.04);Ue.add(oa);const pt=new Ls(16775406,3.4);pt.position.set(5,1.2,3.2);Ue.add(pt);const qt=new Ls(2241365,.035);qt.position.set(-5,0,-3.2);Ue.add(qt);const ut=new Ei(ue),ra=new Mi(Ue,le);ut.addPass(ra);const Us=new _i(new U(window.innerWidth,window.innerHeight),.08,.4,.92);ut.addPass(Us);const la={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
  `},da=new Ci(la);ut.addPass(da);function ca(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:e,rMin:s,rMax:t,size:i,opacity:n})=>{const l=new Float32Array(e*3);for(let o=0;o<e;o++){const d=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1),h=s+Math.random()*(t-s);l[o*3]=h*Math.sin(u)*Math.cos(d),l[o*3+1]=h*Math.sin(u)*Math.sin(d),l[o*3+2]=h*Math.cos(u)}const r=new Z;r.setAttribute("position",new ki(l,3));const c=new xi({size:i,color:14215423,transparent:!0,opacity:n,sizeAttenuation:!0});Ue.add(new Li(r,c))})}ca();const ct=document.createElement("div");ct.id="loading-overlay";ct.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(ct);function ze(a,e){const s=document.getElementById("load-status");if(s&&(s.textContent=a),e!==void 0){const t=document.getElementById("progress-fill");t&&(t.style.width=`${Math.min(100,e)}%`)}}function pa(){ct.style.opacity="0",setTimeout(()=>ct.remove(),700)}const ua=1.8;function ha(a,e){return new Pi({map:a,normalMap:e||void 0,normalScale:e?new U(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function Bs(a,e,s,t,i){const n=(a%1+1)%1*(s-1),l=Tt.clamp(1-e,0,1)*(t-1),r=Math.floor(n),c=(r+1)%s,o=Math.floor(l),d=Math.min(o+1,t-1),u=n-r,h=l-o,v=i[(o*s+r)*4]/255,g=i[(o*s+c)*4]/255,m=i[(d*s+r)*4]/255,f=i[(d*s+c)*4]/255,E=v*(1-u)+g*u,_=m*(1-u)+f*u,C=E*(1-h)+_*h;return Gt+C*ia}function js(a,e){if(Nt&&Ft>0&&zt>0){const s=Tt.clamp((a+90)/180,0,1),i=((e%360+360)%360+180)%360/360;return Bs(i,s,Ft,zt,Nt)}return 0}function ma(a,e){const s=a.attributes.position,t=a.attributes.uv,i=s.count,n=document.createElement("canvas");n.width=e.width,n.height=e.height;const l=n.getContext("2d");l.drawImage(e,0,0);const c=l.getImageData(0,0,n.width,n.height).data;Nt=c,Ft=n.width,zt=n.height,_s=new Float32Array(s.array.length),_s.set(s.array),Ze=new Float32Array(i),vt=new Float32Array(s.array.length);const o=new S,d=new S,u=ua;for(let h=0;h<i;h++){o.fromBufferAttribute(s,h);const v=t.getX(h),g=t.getY(h),m=Bs(v,g,n.width,n.height,c);Ze[h]=m;const f=m/zs*Re;d.copy(o).normalize();const E=o.clone().add(d.clone().multiplyScalar(f));vt[h*3]=E.x,vt[h*3+1]=E.y,vt[h*3+2]=E.z,o.add(d.multiplyScalar(f*u)),s.setXYZ(h,o.x,o.y,o.z)}s.needsUpdate=!0,a.computeVertexNormals(),a.computeBoundingSphere()}function ga(a){return a.colorSpace=xs,a.anisotropy=ue.capabilities.getMaxAnisotropy(),a.minFilter=Ai,a.magFilter=Oi,a.generateMipmaps=!0,a.wrapS=Ds,a.wrapT=Is,a.needsUpdate=!0,a}const Cs=new Ti;async function va(){const a=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,e=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:a,label:"NASA LROC 2K",is4K:!1}];let s=null,t="NASA LROC 2K",i=!1;for(const r of e)try{ze(`Loading ${r.label}…`,25),s=await new Promise((c,o)=>{Cs.load(r.url,d=>c(d),void 0,d=>o(d))}),ga(s),t=r.label,i=r.is4K;break}catch{}if(!s)throw new Error("All color texture candidates failed to load.");ze("Loading LOLA normal map…",50);let n=null;try{n=await new Promise((r,c)=>{Cs.load("/generated/ldem_normal_map_half.png",o=>{o.colorSpace=Ii,o.anisotropy=ue.capabilities.getMaxAnisotropy(),o.wrapS=Ds,o.wrapT=Is,r(o)},void 0,c)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}ze("Loading LOLA DEM topography…",75);let l=null;try{l=await new Promise((r,c)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>r(o),o.onerror=c,o.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:s,colorLabel:t,is4K:i,normal:n,dispImg:l}}let Gs={is4K:!0};async function ba(){const a=await va();Gs={label:a.colorLabel,is4K:a.is4K};const e=document.getElementById("telem-color");e&&(e.textContent=a.is4K?"NASA LROC 4K":"NASA LROC 2K"),ze("Generating lunar mesh…",85),await new Promise(i=>setTimeout(i,40));const s=new Ee(Re,Ms,Ms/2);a.dispImg&&ma(s,a.dispImg),ze("Configuring shaders…",95),await new Promise(i=>setTimeout(i,40));const t=ha(a.color,a.normal);ve=new R(s,t),ve.castShadow=!1,ve.receiveShadow=!1,N=new Pe,N.rotation.x=Tt.degToRad(6.68),N.add(ve),Ce=new Ji(Re),Ce.setOnSelectSite(i=>{Ne({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})}),N.add(Ce.group),fa(),Sa(),Ue.add(N),ze("Ready",100),setTimeout(pa,400)}function fa(){V=new Pe,V.name="HoverReticle",V.visible=!1;const a=new Me(.012,.015,32);a.rotateX(Math.PI/2);const e=new z({color:3718648,side:ge,transparent:!0,opacity:.8}),s=new R(a,e);V.add(s);const t=new $i(.003,16);t.rotateX(Math.PI/2);const i=new z({color:16777215,side:ge});V.add(new R(t,i)),N.add(V)}function Sa(){W=new Pe,W.name="PendingSelectionMarker",W.visible=!1;const a=new Me(.018,.024,32);a.rotateX(Math.PI/2);const e=new z({color:16096779,side:ge,transparent:!0,opacity:.95});W.add(new R(a,e));const s=new Z().setFromPoints([new S(0,0,0),new S(0,.06,0)]),t=new ie({color:16096779,transparent:!0,opacity:.85});W.add(new ae(s,t)),N.add(W)}ba().catch(a=>{console.error("[LUNAOPS] Build error:",a),ze("Failed to initialize — see console",0)});const Yt=document.createElement("div");Yt.id="ui-layer";Yt.innerHTML=`
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
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${Gs.is4K?"NASA LROC 4K":"NASA LROC 2K"}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Gt.toFixed(1)} to +${Hs.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${zs} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(Yt);qi({sunLight:pt,earthshineLight:qt});X=new Qi;X.setOnSelect(a=>{Ne(a,!1,!1)});X.setOnApplyAndCalculate(async a=>{Ne(a,!1,!1);try{return await ft(a.latitudeDeg,a.longitudeDeg,`${a.name} · ${a.designation}`)}catch{return!1}});X.setOnRecenter(a=>{Vt(a.lat,a.lon)});Q=new ta;document.getElementById("btn-new-mission").addEventListener("click",()=>{Q==null||Q.toggle()});pe=new sa;document.getElementById("btn-compare-sites").addEventListener("click",()=>{pe==null||pe.toggle()});pe.setOnInspectSiteOnGlobe(a=>{Ne({name:a.name,designation:"Candidate Site",latitudeDeg:a.lat,longitudeDeg:a.lon,elevationM:a.elevationM,isInsideSite01DEM:a.lat<=-89.4&&a.lat>=-89.55&&a.lon>=221&&a.lon<=224})});Q.setOnSiteChanged(a=>{Ws(a)});Q.setOnTimelineScrubbed(a=>{const[e,s,t]=Ot(a.sun.direction_unit),i=8;pt.position.set(e*i,s*i,t*i);const n=document.getElementById("telem-sun-az");n&&(n.textContent=`${a.sun.azimuth_deg.toFixed(1)}° / ${a.sun.elevation_deg.toFixed(1)}°`);const l=document.getElementById("utc-clock");l&&(l.textContent=a.timestamp_utc),Wi(a.timestamp_utc)});function Ne(a,e=!0,s=!0){wt=a.latitudeDeg,Et=a.longitudeDeg,Ws(a,s);const t=J.find(i=>Math.abs(i.lat-a.latitudeDeg)<.05&&Math.abs(i.lon-a.longitudeDeg)<.05);Ce&&Ce.highlightSite(t?t.id:null),X&&X.setSelectedSite(t?t.id:null,a.latitudeDeg,a.longitudeDeg),document.querySelectorAll(".cand-btn").forEach(i=>{i.classList.toggle("active",(t==null?void 0:t.id)===i.dataset.site)}),Q&&Q.setCoordinatesFromGlobe(a.latitudeDeg,a.longitudeDeg,a.name,a.designation),e&&N&&Vt(a.latitudeDeg,a.longitudeDeg)}function Ws(a,e=!0){if(!N)return;if(!O){O=new Pe,O.name="TargetSiteMarker";const o=new Me(.04,.045,64);o.rotateX(Math.PI/2);const d=new z({color:3718648,side:ge,transparent:!0,opacity:.28,blending:De});yt=new R(o,d),O.add(yt);const u=new Me(.028,.032,64,1,0,Math.PI*1.3);u.rotateX(Math.PI/2);const h=new z({color:8246268,side:ge,transparent:!0,opacity:.7,blending:De});St=new R(u,h),O.add(St);const v=new Me(.019,.023,48);v.rotateX(Math.PI/2);const g=new z({color:3718648,side:ge,transparent:!0,opacity:.95});O.add(new R(v,g));const m=new Me(.009,.012,32);m.rotateX(Math.PI/2);const f=new z({color:8246268,side:ge,transparent:!0,opacity:.9});O.add(new R(m,f)),[[-1,0],[1,0],[0,-1],[0,1]].forEach(([ee,j])=>{const H=[new S(ee*.006,0,j*.006),new S(ee*.016,0,j*.016)],te=new Z().setFromPoints(H),be=new ie({color:3718648,transparent:!0,opacity:.9});O.add(new ae(te,be))});const E=.03,_=.009;[[1,-1],[-1,-1],[1,1],[-1,1]].forEach(([ee,j])=>{const H=ee*E*.707,te=j*E*.707,be=[new S(H,0,te-j*_),new S(H,0,te),new S(H-ee*_,0,te)],Fe=new Z().setFromPoints(be),de=new ie({color:3718648,transparent:!0,opacity:.85});O.add(new ae(Fe,de))});const C=new Ee(.006,16,16),P=new z({color:16777215});O.add(new R(C,P));const k=new Z().setFromPoints([new S(0,0,0),new S(0,.11,0)]),B=new ie({color:3718648,transparent:!0,opacity:.85,blending:De});O.add(new ae(k,B));const $=new Ee(.009,12,12),q=new z({color:3718648}),L=new R($,q);L.position.y=.11,O.add(L),N.add(O)}const s=$e(a.latitudeDeg,a.longitudeDeg,Re*1.002);O.position.copy(s),O.visible=!me;const t=s.clone().normalize();O.quaternion.setFromUnitVectors(new S(0,1,0),t);const i=document.getElementById("active-site-display");i&&(i.textContent=`${a.name} · ${a.designation}`);const n=document.getElementById("hud-3d-site-card");if(n){const o=a.name.includes("Site 01")||a.name.includes("Custom");n.className=o?"hud-3d-site-card card-amber":"hud-3d-site-card";const d=document.getElementById("hud-3d-card-title"),u=document.getElementById("hud-3d-card-desig"),h=document.getElementById("hud-3d-val-coords"),v=document.getElementById("hud-3d-val-elev"),g=document.getElementById("hud-3d-val-dist"),m=document.getElementById("hud-3d-val-cov"),f=document.getElementById("hud-3d-comm"),E=document.getElementById("hud-3d-illum");d&&(d.textContent=a.name.toUpperCase()),u&&(u.textContent=a.designation),h&&(h.textContent=re(a.latitudeDeg,a.longitudeDeg)),v&&(v.textContent=`${a.elevationM>=0?"+":""}${a.elevationM.toLocaleString()} m`),g&&(g.textContent=`${dt(a.latitudeDeg).toFixed(1)} km`),m&&(m.textContent=a.isInsideSite01DEM?"★ Validated 5 m/px DEM":"Global LOLA (~60 m/px)"),f&&(f.textContent=a.name.includes("Site 01")?"COMM: LOS 84%":"COMM: DTE VISIBLE"),E&&(E.textContent=a.name.includes("Site 01")?"ILLUM: 96%":"ILLUM: POLAR SUN")}const l=document.getElementById("readout-coords"),r=document.getElementById("readout-elev"),c=document.getElementById("readout-pole-dist");if(l&&(l.textContent=re(a.latitudeDeg,a.longitudeDeg)),r&&(r.textContent=`${a.elevationM>=0?"+":""}${(a.elevationM/1e3).toFixed(2)} km`),c){const o=dt(a.latitudeDeg);c.textContent=`${o.toFixed(1)} km to 90°S`}if(e)return ft(a.latitudeDeg,a.longitudeDeg,`${a.name} · ${a.designation}`)}function Vt(a,e){N.updateMatrixWorld(!0);const t=$e(a,e,Re).clone().applyMatrix4(N.matrixWorld),i=t.clone().normalize(),n=t.clone().add(i.clone().multiplyScalar(.85));Mt(n,t,1.2)}function qs(){if(me=!me,document.getElementById("btn-south-pole").classList.toggle("active",me),X&&(me?X.open():X.close()),O&&(O.visible=!me),me){N.updateMatrixWorld(!0);const s=new S(0,-Re,0).clone().applyMatrix4(N.matrixWorld),i=s.clone().normalize().clone().multiplyScalar(2.65);i.addScaledVector(new S(1,0,0),.15),i.addScaledVector(new S(0,0,1),.15),Mt(i,s,1.3)}else Mt(new S(0,.2,4),new S(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",qs);document.getElementById("btn-reset").addEventListener("click",()=>{var a;me=!1,(a=document.getElementById("btn-south-pole"))==null||a.classList.remove("active"),X==null||X.close(),O&&(O.visible=!0),Mt(new S(0,.2,4),new S(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{at=!at;const a=document.getElementById("btn-auto");a.textContent=at?"⏸ Auto-Rotate":"▶ Auto-Rotate",a.classList.toggle("active",at)});document.getElementById("btn-sun").addEventListener("click",()=>{nt=!nt;const a=document.getElementById("btn-sun");a.classList.toggle("active",nt),a.textContent=nt?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.site,s=J.find(t=>t.id===e);s&&Ne({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})})});const Xt=document.getElementById("coords-modal"),Ke=document.getElementById("manual-lat"),kt=document.getElementById("manual-lon"),He=document.getElementById("coords-error-msg"),ya=document.getElementById("coords-preview-line");function Ys(a,e,s,t=!1){var d;if(s===void 0&&(s=js(a,e)),Oe={latDeg:a,lonDeg:e,elevKm:s},W){const u=$e(a,e,Re*1.002);W.position.copy(u);const h=u.clone().normalize();W.quaternion.setFromUnitVectors(new S(0,1,0),h),W.visible=!0}t&&N&&(me&&a>-80&&(me=!1,(d=document.getElementById("btn-south-pole"))==null||d.classList.remove("active"),X==null||X.close()),Vt(a,e));const i=document.getElementById("readout-coords");i&&(i.textContent=re(a,e));const n=document.getElementById("readout-elev");n&&(n.textContent=`${s>=0?"+":""}${s.toFixed(2)} km`);const l=document.getElementById("selection-confirm-toast"),r=document.getElementById("toast-coords-text"),c=document.getElementById("toast-elev-text");r.textContent=re(a,e);const o=dt(a);c.textContent=`Elevation: ${s>=0?"+":""}${s.toFixed(2)} km · Distance to 90°S: ${o.toFixed(1)} km`,l.style.display="block"}function wa(){Ke.value=wt.toFixed(3),kt.value=Et.toFixed(2),He.style.display="none",Kt(),document.getElementById("selection-confirm-toast").style.display="none",W&&(W.visible=!1),Oe=null,Xt.style.display="flex",setTimeout(()=>{Ke.focus(),Ke.select()},40)}function xt(){Xt.style.display="none",He.style.display="none"}function Vs(){const a=Bt(Ke.value,kt.value);if(!a.valid){He.textContent=a.error||"Invalid coordinates.",He.style.display="block";return}xt(),Ys(a.lat,a.lon,void 0,!0)}document.getElementById("btn-manual-coords").addEventListener("click",wa);document.getElementById("btn-close-coords-modal").addEventListener("click",xt);document.getElementById("btn-cancel-manual-coords").addEventListener("click",xt);document.getElementById("btn-apply-manual-coords").addEventListener("click",Vs);Xt.addEventListener("keydown",a=>{a.key==="Escape"?(a.stopPropagation(),xt()):a.key==="Enter"&&(a.preventDefault(),Vs())});function Kt(){const a=Bt(Ke.value,kt.value);if(!a.valid)He.textContent=a.error||"Invalid coordinates.",He.style.display="block";else{He.style.display="none";const e=a.lat<=-80,s=dt(a.lat);ya.innerHTML=`Format: <strong>${re(a.lat,a.lon)}</strong><br />Region: <strong>${e?"South Polar Region (80°S–90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${s.toFixed(1)} km</strong>`}}Ke.addEventListener("input",Kt);kt.addEventListener("input",Kt);const _t=new ks,Ct=new U;let Xs=new U,Ks=0,Zt=!1,Jt=!1;Je.addEventListener("pointerdown",a=>{Xs.set(a.clientX,a.clientY),Ks=performance.now(),Zt=!1});Je.addEventListener("pointermove",a=>{Xs.distanceTo(new U(a.clientX,a.clientY))>5&&(Zt=!0),Ct.x=a.clientX/window.innerWidth*2-1,Ct.y=-(a.clientY/window.innerHeight)*2+1,Jt=!0});Je.addEventListener("pointerleave",()=>{Jt=!1,V&&(V.visible=!1)});Je.addEventListener("click",a=>{if(Zt||performance.now()-Ks>350)return;if(Ce){const s=Ce.handleClick(a,le);if(s){Ne({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM});return}}if(!ve)return;_t.setFromCamera(Ct,le);const e=_t.intersectObject(ve);if(e.length>0){const s=e[0],t=ve.worldToLocal(s.point.clone()),{latDeg:i,lonDeg:n}=Rs(t);let l=0;s.face&&Ze?l=Ze[s.face.a]??0:l=js(i,n),Ys(i,n,l,!1)}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(Oe){const{latDeg:a,lonDeg:e,elevKm:s}=Oe,t=lt(e,a);Ne({name:t?"Site 01 Target":"Custom Lunar Target",designation:re(a,e),latitudeDeg:a,longitudeDeg:e,elevationM:Math.round(s*1e3),isInsideSite01DEM:t})}document.getElementById("selection-confirm-toast").style.display="none",W&&(W.visible=!1),Oe=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",W&&(W.visible=!1),Oe=null});function Ea(){if(!Jt||!ve||!V){V&&(V.visible=!1);return}_t.setFromCamera(Ct,le);const a=_t.intersectObject(ve);if(a.length>0){const e=a[0],s=ve.worldToLocal(e.point.clone()),{latDeg:t,lonDeg:i}=Rs(s),n=document.getElementById("readout-coords");n&&!Oe&&(n.textContent=re(t,i));const l=s.clone().normalize();if(V.position.copy(s.clone().multiplyScalar(1.0015)),V.quaternion.setFromUnitVectors(new S(0,1,0),l),V.visible=!0,e.face&&Ze){const r=Ze[e.face.a],c=document.getElementById("readout-elev");c&&!Oe&&(c.textContent=`${r>=0?"+":""}${r.toFixed(2)} km`)}}else V.visible=!1}window.addEventListener("keydown",a=>{var e,s,t;if(!(a.target instanceof HTMLInputElement||a.target instanceof HTMLTextAreaElement))switch(a.key.toLowerCase()){case" ":a.preventDefault(),(e=document.getElementById("btn-auto"))==null||e.click();break;case"p":a.preventDefault(),qs();break;case"r":a.preventDefault(),(s=document.getElementById("btn-reset"))==null||s.click();break;case"s":a.preventDefault(),(t=document.getElementById("btn-sun"))==null||t.click();break;case"m":a.preventDefault(),Q==null||Q.toggle();break;case"c":a.preventDefault(),pe==null||pe.toggle();break}});function Ma(){const a=window.innerWidth,e=window.innerHeight;le.aspect=a/e,le.updateProjectionMatrix(),ue.setSize(a,e),ut.setSize(a,e),Us.resolution.set(a,e)}window.addEventListener("resize",Ma);Ne({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100,isInsideSite01DEM:!0},!1);const Ts=new Di;function _a(){const a=document.getElementById("hud-3d-site-card");if(!a||!N||isNaN(wt)||isNaN(Et)){a&&(a.style.display="none");return}const s=$e(wt,Et,Re*1.002).clone().applyMatrix4(N.matrixWorld),t=le.position.clone().sub(s).normalize();if(s.clone().normalize().dot(t)<=.05){a.style.display="none";return}const l=s.clone().project(le);if(l.z>=1){a.style.display="none";return}const r=(l.x*.5+.5)*window.innerWidth,c=(-(l.y*.5)+.5)*window.innerHeight,o=230,d=140,u=r+32+o>window.innerWidth?r-o-24:r+32,h=Math.max(16,Math.min(c-45,window.innerHeight-d-16));a.style.display="flex",a.style.left=`${u}px`,a.style.top=`${h}px`}function Zs(){requestAnimationFrame(Zs);const a=Ts.getDelta(),e=Ts.getElapsedTime();if(ne.update(),he){const t=performance.now()-he.startTime,i=Math.min(1,t/he.duration),n=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;le.position.lerpVectors(he.startPos,he.targetPos,n),ne.target.lerpVectors(he.startLook,he.targetLook,n),ne.update(),i>=1&&(he=null)}if(Ce&&Ce.update(e),St&&(St.rotation.y=e*1.8),yt){const t=.22+.12*Math.sin(e*2.2);yt.material.opacity=t}const s=!!(Q!=null&&Q.getIsOpen())||!!(pe!=null&&pe.getIsOpen());if(N&&at&&!Wt&&!he&&!s&&(N.rotation.y+=.02*a),nt){gt+=.12*a;const t=8;pt.position.set(Math.cos(gt)*t,Math.sin(gt*.25)*2,Math.sin(gt)*t)}Ea(),_a(),ut.render()}Zs();
