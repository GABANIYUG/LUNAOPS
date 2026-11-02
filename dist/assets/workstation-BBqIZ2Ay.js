var Fi=Object.defineProperty;var zi=(a,t,i)=>t in a?Fi(a,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[t]=i;var f=(a,t,i)=>zi(a,typeof t!="symbol"?t+"":t,i);import{X as Hi,d as E,Y as $e,Z as Te,_ as Gt,$ as Wt,V as A,a0 as ji,a1 as Ui,l as yt,a2 as si,G as me,B as ue,a3 as fe,g as Kt,a4 as De,v as Pe,r as W,o as ye,M as q,j as Le,a5 as qi,W as Bi,S as ai,A as Gi,a as Wi,C as Ki,b as Vi,i as Yi,D as ni,E as Zi,R as Xi,U as Ji,c as Qi,T as es,e as ts,f as is,h as ss,z as as,N as ns,K as oi,J as ri,n as os,x as rs,a6 as ls,a7 as cs}from"./UnrealBloomPass-9pu3Yq5J.js";const Vt={type:"change"},mt={type:"start"},Yt={type:"end"},Qe=new ji,Zt=new Ui,ds=Math.cos(70*yt.DEG2RAD);class ps extends Hi{constructor(t,i){super(),this.object=t,this.domElement=i,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$e.ROTATE,MIDDLE:$e.DOLLY,RIGHT:$e.PAN},this.touches={ONE:Te.ROTATE,TWO:Te.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(o){o.addEventListener("keydown",ut),this._domElementKeyEvents=o},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ut),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Vt),e.update(),n=s.NONE},this.update=function(){const o=new E,v=new Wt().setFromUnitVectors(t.up,new E(0,1,0)),x=v.clone().invert(),$=new E,F=new Wt,de=new E,G=2*Math.PI;return function(Ni=null){const qt=e.object.position;o.copy(qt).sub(e.target),o.applyQuaternion(v),c.setFromVector3(o),e.autoRotate&&n===s.NONE&&le(Xe(Ni)),e.enableDamping?(c.theta+=d.theta*e.dampingFactor,c.phi+=d.phi*e.dampingFactor):(c.theta+=d.theta,c.phi+=d.phi);let ee=e.minAzimuthAngle,te=e.maxAzimuthAngle;isFinite(ee)&&isFinite(te)&&(ee<-Math.PI?ee+=G:ee>Math.PI&&(ee-=G),te<-Math.PI?te+=G:te>Math.PI&&(te-=G),ee<=te?c.theta=Math.max(ee,Math.min(te,c.theta)):c.theta=c.theta>(ee+te)/2?Math.max(ee,c.theta):Math.min(te,c.theta)),c.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,c.phi)),c.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(l,e.dampingFactor):e.target.add(l),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor);let je=!1;if(e.zoomToCursor&&ge||e.object.isOrthographicCamera)c.radius=g(c.radius);else{const ie=c.radius;c.radius=g(c.radius*r),je=ie!=c.radius}if(o.setFromSpherical(c),o.applyQuaternion(x),qt.copy(e.target).add(o),e.object.lookAt(e.target),e.enableDamping===!0?(d.theta*=1-e.dampingFactor,d.phi*=1-e.dampingFactor,l.multiplyScalar(1-e.dampingFactor)):(d.set(0,0,0),l.set(0,0,0)),e.zoomToCursor&&ge){let ie=null;if(e.object.isPerspectiveCamera){const Ue=o.length();ie=g(Ue*r);const Je=Ue-ie;e.object.position.addScaledVector(P,Je),e.object.updateMatrixWorld(),je=!!Je}else if(e.object.isOrthographicCamera){const Ue=new E(T.x,T.y,0);Ue.unproject(e.object);const Je=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/r)),e.object.updateProjectionMatrix(),je=Je!==e.object.zoom;const Bt=new E(T.x,T.y,0);Bt.unproject(e.object),e.object.position.sub(Bt).add(Ue),e.object.updateMatrixWorld(),ie=o.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;ie!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(ie).add(e.object.position):(Qe.origin.copy(e.object.position),Qe.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(Qe.direction))<ds?t.lookAt(e.target):(Zt.setFromNormalAndCoplanarPoint(e.object.up,e.target),Qe.intersectPlane(Zt,e.target))))}else if(e.object.isOrthographicCamera){const ie=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/r)),ie!==e.object.zoom&&(e.object.updateProjectionMatrix(),je=!0)}return r=1,ge=!1,je||$.distanceToSquared(e.object.position)>p||8*(1-F.dot(e.object.quaternion))>p||de.distanceToSquared(e.target)>p?(e.dispatchEvent(Vt),$.copy(e.object.position),F.copy(e.object.quaternion),de.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",jt),e.domElement.removeEventListener("pointerdown",Rt),e.domElement.removeEventListener("pointercancel",He),e.domElement.removeEventListener("wheel",Nt),e.domElement.removeEventListener("pointermove",pt),e.domElement.removeEventListener("pointerup",He),e.domElement.getRootNode().removeEventListener("keydown",Ft,{capture:!0}),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",ut),e._domElementKeyEvents=null)};const e=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let n=s.NONE;const p=1e-6,c=new Gt,d=new Gt;let r=1;const l=new E,m=new A,u=new A,h=new A,b=new A,y=new A,S=new A,_=new A,M=new A,C=new A,P=new E,T=new A;let ge=!1;const D=[],re={};let _e=!1;function Xe(o){return o!==null?2*Math.PI/60*e.autoRotateSpeed*o:2*Math.PI/60/60*e.autoRotateSpeed}function ve(o){const v=Math.abs(o*.01);return Math.pow(.95,e.zoomSpeed*v)}function le(o){d.theta-=o}function be(o){d.phi-=o}const Ne=function(){const o=new E;return function(x,$){o.setFromMatrixColumn($,0),o.multiplyScalar(-x),l.add(o)}}(),Fe=function(){const o=new E;return function(x,$){e.screenSpacePanning===!0?o.setFromMatrixColumn($,1):(o.setFromMatrixColumn($,0),o.crossVectors(e.object.up,o)),o.multiplyScalar(x),l.add(o)}}(),Q=function(){const o=new E;return function(x,$){const F=e.domElement;if(e.object.isPerspectiveCamera){const de=e.object.position;o.copy(de).sub(e.target);let G=o.length();G*=Math.tan(e.object.fov/2*Math.PI/180),Ne(2*x*G/F.clientHeight,e.object.matrix),Fe(2*$*G/F.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(Ne(x*(e.object.right-e.object.left)/e.object.zoom/F.clientWidth,e.object.matrix),Fe($*(e.object.top-e.object.bottom)/e.object.zoom/F.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function Me(o){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?r/=o:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ze(o){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?r*=o:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Ce(o,v){if(!e.zoomToCursor)return;ge=!0;const x=e.domElement.getBoundingClientRect(),$=o-x.left,F=v-x.top,de=x.width,G=x.height;T.x=$/de*2-1,T.y=-(F/G)*2+1,P.set(T.x,T.y,1).unproject(e.object).sub(e.object.position).normalize()}function g(o){return Math.max(e.minDistance,Math.min(e.maxDistance,o))}function w(o){m.set(o.clientX,o.clientY)}function k(o){Ce(o.clientX,o.clientX),_.set(o.clientX,o.clientY)}function L(o){b.set(o.clientX,o.clientY)}function H(o){u.set(o.clientX,o.clientY),h.subVectors(u,m).multiplyScalar(e.rotateSpeed);const v=e.domElement;le(2*Math.PI*h.x/v.clientHeight),be(2*Math.PI*h.y/v.clientHeight),m.copy(u),e.update()}function ce(o){M.set(o.clientX,o.clientY),C.subVectors(M,_),C.y>0?Me(ve(C.y)):C.y<0&&ze(ve(C.y)),_.copy(M),e.update()}function ct(o){y.set(o.clientX,o.clientY),S.subVectors(y,b).multiplyScalar(e.panSpeed),Q(S.x,S.y),b.copy(y),e.update()}function dt(o){Ce(o.clientX,o.clientY),o.deltaY<0?ze(ve(o.deltaY)):o.deltaY>0&&Me(ve(o.deltaY)),e.update()}function Mi(o){let v=!1;switch(o.code){case e.keys.UP:o.ctrlKey||o.metaKey||o.shiftKey?be(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):Q(0,e.keyPanSpeed),v=!0;break;case e.keys.BOTTOM:o.ctrlKey||o.metaKey||o.shiftKey?be(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):Q(0,-e.keyPanSpeed),v=!0;break;case e.keys.LEFT:o.ctrlKey||o.metaKey||o.shiftKey?le(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):Q(e.keyPanSpeed,0),v=!0;break;case e.keys.RIGHT:o.ctrlKey||o.metaKey||o.shiftKey?le(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):Q(-e.keyPanSpeed,0),v=!0;break}v&&(o.preventDefault(),e.update())}function Dt(o){if(D.length===1)m.set(o.pageX,o.pageY);else{const v=ke(o),x=.5*(o.pageX+v.x),$=.5*(o.pageY+v.y);m.set(x,$)}}function Lt(o){if(D.length===1)b.set(o.pageX,o.pageY);else{const v=ke(o),x=.5*(o.pageX+v.x),$=.5*(o.pageY+v.y);b.set(x,$)}}function Pt(o){const v=ke(o),x=o.pageX-v.x,$=o.pageY-v.y,F=Math.sqrt(x*x+$*$);_.set(0,F)}function Ci(o){e.enableZoom&&Pt(o),e.enablePan&&Lt(o)}function ki(o){e.enableZoom&&Pt(o),e.enableRotate&&Dt(o)}function It(o){if(D.length==1)u.set(o.pageX,o.pageY);else{const x=ke(o),$=.5*(o.pageX+x.x),F=.5*(o.pageY+x.y);u.set($,F)}h.subVectors(u,m).multiplyScalar(e.rotateSpeed);const v=e.domElement;le(2*Math.PI*h.x/v.clientHeight),be(2*Math.PI*h.y/v.clientHeight),m.copy(u)}function At(o){if(D.length===1)y.set(o.pageX,o.pageY);else{const v=ke(o),x=.5*(o.pageX+v.x),$=.5*(o.pageY+v.y);y.set(x,$)}S.subVectors(y,b).multiplyScalar(e.panSpeed),Q(S.x,S.y),b.copy(y)}function Ot(o){const v=ke(o),x=o.pageX-v.x,$=o.pageY-v.y,F=Math.sqrt(x*x+$*$);M.set(0,F),C.set(0,Math.pow(M.y/_.y,e.zoomSpeed)),Me(C.y),_.copy(M);const de=(o.pageX+v.x)*.5,G=(o.pageY+v.y)*.5;Ce(de,G)}function $i(o){e.enableZoom&&Ot(o),e.enablePan&&At(o)}function Ti(o){e.enableZoom&&Ot(o),e.enableRotate&&It(o)}function Rt(o){e.enabled!==!1&&(D.length===0&&(e.domElement.setPointerCapture(o.pointerId),e.domElement.addEventListener("pointermove",pt),e.domElement.addEventListener("pointerup",He)),!Ri(o)&&(Ai(o),o.pointerType==="touch"?Ht(o):Di(o)))}function pt(o){e.enabled!==!1&&(o.pointerType==="touch"?Ii(o):Li(o))}function He(o){switch(Oi(o),D.length){case 0:e.domElement.releasePointerCapture(o.pointerId),e.domElement.removeEventListener("pointermove",pt),e.domElement.removeEventListener("pointerup",He),e.dispatchEvent(Yt),n=s.NONE;break;case 1:const v=D[0],x=re[v];Ht({pointerId:v,pageX:x.x,pageY:x.y});break}}function Di(o){let v;switch(o.button){case 0:v=e.mouseButtons.LEFT;break;case 1:v=e.mouseButtons.MIDDLE;break;case 2:v=e.mouseButtons.RIGHT;break;default:v=-1}switch(v){case $e.DOLLY:if(e.enableZoom===!1)return;k(o),n=s.DOLLY;break;case $e.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(e.enablePan===!1)return;L(o),n=s.PAN}else{if(e.enableRotate===!1)return;w(o),n=s.ROTATE}break;case $e.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(e.enableRotate===!1)return;w(o),n=s.ROTATE}else{if(e.enablePan===!1)return;L(o),n=s.PAN}break;default:n=s.NONE}n!==s.NONE&&e.dispatchEvent(mt)}function Li(o){switch(n){case s.ROTATE:if(e.enableRotate===!1)return;H(o);break;case s.DOLLY:if(e.enableZoom===!1)return;ce(o);break;case s.PAN:if(e.enablePan===!1)return;ct(o);break}}function Nt(o){e.enabled===!1||e.enableZoom===!1||n!==s.NONE||(o.preventDefault(),e.dispatchEvent(mt),dt(Pi(o)),e.dispatchEvent(Yt))}function Pi(o){const v=o.deltaMode,x={clientX:o.clientX,clientY:o.clientY,deltaY:o.deltaY};switch(v){case 1:x.deltaY*=16;break;case 2:x.deltaY*=100;break}return o.ctrlKey&&!_e&&(x.deltaY*=10),x}function Ft(o){o.key==="Control"&&(_e=!0,e.domElement.getRootNode().addEventListener("keyup",zt,{passive:!0,capture:!0}))}function zt(o){o.key==="Control"&&(_e=!1,e.domElement.getRootNode().removeEventListener("keyup",zt,{passive:!0,capture:!0}))}function ut(o){e.enabled===!1||e.enablePan===!1||Mi(o)}function Ht(o){switch(Ut(o),D.length){case 1:switch(e.touches.ONE){case Te.ROTATE:if(e.enableRotate===!1)return;Dt(o),n=s.TOUCH_ROTATE;break;case Te.PAN:if(e.enablePan===!1)return;Lt(o),n=s.TOUCH_PAN;break;default:n=s.NONE}break;case 2:switch(e.touches.TWO){case Te.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ci(o),n=s.TOUCH_DOLLY_PAN;break;case Te.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ki(o),n=s.TOUCH_DOLLY_ROTATE;break;default:n=s.NONE}break;default:n=s.NONE}n!==s.NONE&&e.dispatchEvent(mt)}function Ii(o){switch(Ut(o),n){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;It(o),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;At(o),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;$i(o),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ti(o),e.update();break;default:n=s.NONE}}function jt(o){e.enabled!==!1&&o.preventDefault()}function Ai(o){D.push(o.pointerId)}function Oi(o){delete re[o.pointerId];for(let v=0;v<D.length;v++)if(D[v]==o.pointerId){D.splice(v,1);return}}function Ri(o){for(let v=0;v<D.length;v++)if(D[v]==o.pointerId)return!0;return!1}function Ut(o){let v=re[o.pointerId];v===void 0&&(v=new A,re[o.pointerId]=v),v.set(o.pageX,o.pageY)}function ke(o){const v=o.pointerId===D[0]?D[1]:D[0];return re[v]}e.domElement.addEventListener("contextmenu",jt),e.domElement.addEventListener("pointerdown",Rt),e.domElement.addEventListener("pointercancel",He),e.domElement.addEventListener("wheel",Nt,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",Ft,{passive:!0,capture:!0}),this.update()}}const oe="http://127.0.0.1:8000";async function li(){const a=await fetch(`${oe}/api/spice/health`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`Health check failed: HTTP ${a.status}`);return a.json()}async function ci(a){var i;const t=await fetch(`${oe}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Geometry request failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function us(a){var i;const t=await fetch(`${oe}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Horizon profile failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function ms(a){var i;const t=await fetch(`${oe}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Horizon visibility failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function hs(a){var i;const t=await fetch(`${oe}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Mission timeline calculation failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function gs(a){var i;const t=await fetch(`${oe}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Candidate comparison failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}async function di(a){var i;const t=await fetch(`${oe}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!t.ok){let e=`Landing windows scan failed: HTTP ${t.status}`;try{const s=await t.json();e+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(e)}return t.json()}function vt(a){const[t,i,e]=a,s=t,n=e,p=i,c=Math.sqrt(s*s+n*n+p*p);return c<1e-10?[0,1,0]:[s/c,n/c,p/c]}const pi=1737400,vs=1737.4,O={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function ui(a,t,i=pi){const s=(a%360+360)%360*Math.PI/180,n=t*Math.PI/180,p=Math.PI/2+n,c=2*i*Math.tan(p/2),d=c*Math.sin(s),r=c*Math.cos(s);return{x:d,y:r}}function bs(a,t,i=pi){const e=Math.hypot(a,t);if(e<1e-7)return{lonDeg:0,latDeg:-90};const s=2*Math.atan2(e,2*i),n=-Math.PI/2+s,c=(Math.atan2(a,t)*180/Math.PI+360)%360,d=n*180/Math.PI;return{lonDeg:c,latDeg:d}}function fs(a,t){const i=a>=O.minX&&a<=O.maxX&&t>=O.minY&&t<=O.maxY,e=(a-O.minX)/O.pixelSizeM,s=(O.maxY-t)/O.pixelSizeM,n=e/O.fullWidthPx,p=s/O.fullHeightPx,c=Math.max(0,Math.min(511,Math.round(n*512))),d=Math.max(0,Math.min(511,Math.round(p*512)));return{pxFull:e,pyFull:s,px512:c,py512:d,isInside:i}}function ys(a,t){const i=Math.max(0,Math.min(1,a/512)),e=Math.max(0,Math.min(1,t/512)),s=O.minX+i*(O.maxX-O.minX),n=O.maxY-e*(O.maxY-O.minY),{lonDeg:p,latDeg:c}=bs(s,n);return{lonDeg:p,latDeg:c,x:s,y:n}}function Ie(a,t,i){const e=Math.max(-90,Math.min(90,a));if(Math.abs(e+90)<1e-7)return new E(0,-i,0);if(Math.abs(e-90)<1e-7)return new E(0,i,0);const s=(90-e)*(Math.PI/180),n=(t+180)*(Math.PI/180),p=-i*Math.cos(n)*Math.sin(s),c=i*Math.cos(s),d=i*Math.sin(n)*Math.sin(s);return new E(p,c,d)}function St(a){const t=(90-Math.max(-90,Math.min(90,a)))*(Math.PI/180);return(Math.PI-t)*vs}function mi(a,t){const i=a.clone().normalize(),s=Math.asin(Math.max(-1,Math.min(1,i.y)))*180/Math.PI;if(s<=-89.9999)return{latDeg:-90,lonDeg:0};if(s>=89.9999)return{latDeg:90,lonDeg:0};let p=Math.atan2(-i.z,i.x)*180/Math.PI;return p<0&&(p+=360),{latDeg:s,lonDeg:p}}function wt(a,t){const i=typeof a=="number"?a:parseFloat(a),e=typeof t=="number"?t:parseFloat(t);if(isNaN(i)||isNaN(e))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(i<-90||i>90)return{valid:!1,lat:i,lon:e,error:"Latitude must be between -90.0° and +90.0°."};const s=(e%360+360)%360;return{valid:!0,lat:i,lon:s}}function K(a,t){if(Math.abs(a+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(a-90)<.001)return"90.000° N (True Lunar North Pole)";const i=`${Math.abs(a).toFixed(3)}° ${a<0?"S":"N"}`,s=`${((t%360+360)%360).toFixed(3)}° E`;return`${i}, ${s}`}let We=null,ht=!1,gt=!1,et=null,R=null;const Ae={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};async function bt(a,t,i,e){if(!R)return;const s=R.querySelector("#spice-lat"),n=R.querySelector("#spice-lon"),p=R.querySelector("#spice-time-input"),c=R.querySelector("#spice-site-note"),d=R.querySelector("#spice-predicted-badge");if(s&&(s.value=a.toFixed(3)),n&&(n.value=t.toFixed(2)),c&&(c.textContent=i),R.querySelectorAll(".spice-preset-btn").forEach(r=>{const l=parseFloat(r.dataset.lat||"999"),m=parseFloat(r.dataset.lon||"999");Math.abs(l-a)<.05&&Math.abs(m-t)<.05?r.classList.add("active"):r.classList.remove("active")}),e){p&&(p.value=e),d&&(d.textContent=`🎯 Mission Epoch: ${e}`,d.style.display="block"),ae(R);return}d&&(d.textContent="⏳ Scanning optimal illumination window...",d.style.display="block");try{const m=await di({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:a,longitude_deg:t});let u=m.summary.best_window_start,h=0;if(!u&&m.days.length>0){const b=m.days.filter(y=>y.is_safe_for_landing);if(b.length>0)u=b[0].date,h=b[0].safety_score;else{const y=[...m.days].sort((S,_)=>_.safety_score-S.safety_score);u=y[0].date,h=y[0].safety_score}}else if(u){const b=m.days.find(y=>y.date===u);h=(b==null?void 0:b.safety_score)??100}if(u){const b=`${u}T12:00:00Z`;p&&(p.value=b),d&&(d.innerHTML=`🎯 Predicted Safe Window: <strong>${u}</strong> (Score: ${h}/100)`,d.style.display="block")}else p&&(p.value="2026-10-16T12:00:00Z"),d&&(d.style.display="none")}catch(r){console.warn("[SPICE] Landing window prediction scan failed",r),p&&!p.value&&(p.value="2026-10-16T12:00:00Z"),d&&(d.style.display="none")}ae(R)}function Ss(a){if(!R)return;const t=R.querySelector("#spice-time-input");t&&(t.value=a,ae(R))}function ws(a){var n,p,c,d,r,l,m;We=a;const t=document.createElement("div");t.id="spice-panel",t.innerHTML=Es(),document.body.appendChild(t),R=t,t.querySelector("#spice-fetch-btn").addEventListener("click",()=>ae(t)),t.querySelector("#spice-auto-btn").addEventListener("click",()=>Ms(t)),(n=t.querySelector("#spice-retry-btn"))==null||n.addEventListener("click",()=>ft(t,!0)),(p=t.querySelector("#spice-now-btn"))==null||p.addEventListener("click",()=>{const u=t.querySelector("#spice-time-input");u&&(u.value=new Date().toISOString().slice(0,19)+"Z",ae(t))}),(c=t.querySelector("#spice-epoch-artemis"))==null||c.addEventListener("click",()=>{const u=t.querySelector("#spice-time-input");u&&(u.value="2026-10-16T12:00:00Z",ae(t))}),(d=t.querySelector("#spice-step-back-24"))==null||d.addEventListener("click",()=>tt(-24)),(r=t.querySelector("#spice-step-back-1"))==null||r.addEventListener("click",()=>tt(-1)),(l=t.querySelector("#spice-step-fwd-1"))==null||l.addEventListener("click",()=>tt(1)),(m=t.querySelector("#spice-step-fwd-24"))==null||m.addEventListener("click",()=>tt(24)),t.querySelectorAll(".spice-preset-btn").forEach(u=>{u.addEventListener("click",()=>{const h=parseFloat(u.dataset.lat||"-90"),b=parseFloat(u.dataset.lon||"0"),y=u.dataset.label||"South Pole Site";bt(h,b,y),t.querySelectorAll(".spice-preset-btn").forEach(S=>S.classList.remove("active")),u.classList.add("active")})});const i=t.querySelector(".spice-header"),e=t.querySelector(".spice-body");i.addEventListener("click",()=>{const u=e.style.display==="none";e.style.display=u?"":"none",i.querySelector(".spice-collapse-icon").textContent=u?"▼":"▶"});const s=t.querySelector("#spice-time-input");return s.value="2026-10-16T12:00:00Z",ft(t).then(()=>{bt(Ae.lat,Ae.lon,Ae.label,"2026-10-16T12:00:00Z")}),t}function tt(a){if(!R)return;const t=R.querySelector("#spice-time-input");if(t)try{const i=new Date(t.value);if(!isNaN(i.getTime())){const e=new Date(i.getTime()+a*3600*1e3);t.value=e.toISOString().slice(0,19)+"Z",ae(R)}}catch{}}function Es(){return`
<div class="spice-header">
  <span class="spice-title">🛰 SPICE Ephemeris</span>
  <span class="spice-subtitle">NASA/JPL · MOON_ME</span>
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

  <!-- Target Epoch Section -->
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
      <button type="button" id="spice-step-back-24" class="spice-step-btn" title="-24 Hours">-24h</button>
      <button type="button" id="spice-step-back-1" class="spice-step-btn" title="-1 Hour">-1h</button>
      <button type="button" id="spice-epoch-artemis" class="spice-step-btn spice-step-highlight" title="Artemis III Target Epoch (2026-10-16)">Artemis '26</button>
      <button type="button" id="spice-step-fwd-1" class="spice-step-btn" title="+1 Hour">+1h</button>
      <button type="button" id="spice-step-fwd-24" class="spice-step-btn" title="+24 Hours">+24h</button>
    </div>
    <div id="spice-predicted-badge" class="spice-predicted-badge" style="display:none"></div>
  </div>

  <!-- Site Selector & Coordinates -->
  <div class="spice-section spice-site-section">
    <div class="spice-label">LANDING SITE &amp; COORDINATES</div>
    <div class="spice-presets-row">
      <button type="button" class="spice-preset-btn active"
              data-lat="-89.463" data-lon="222.51"
              data-label="Artemis Site 01 · Shackleton–de Gerlache Ridge"
              title="NASA Artemis Candidate Site 01">Site 01</button>
      <button type="button" class="spice-preset-btn"
              data-lat="-90.0" data-lon="0.0"
              data-label="Geographic South Pole (90.0°S)"
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
             value="${Ae.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${Ae.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${Ae.label}</div>
  </div>

  <!-- Actions -->
  <div class="spice-actions">
    <button id="spice-fetch-btn" class="spice-btn spice-btn-primary">Calculate</button>
    <button id="spice-auto-btn" class="spice-btn">Auto-Track ●</button>
  </div>

  <div id="spice-loading" class="spice-loading" style="display:none">
    <div class="spice-spinner"></div> Computing JPL SPICE ephemerides…
  </div>
  <div id="spice-error-box" class="spice-error" style="display:none"></div>

  <!-- SPICE Results Display -->
  <div class="spice-results" id="spice-results" style="display:none">
    <!-- Sun telemetry -->
    <div class="spice-result-group">
      <div class="spice-result-heading">☀ SOLAR EPHEMERIS</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-sun-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-sun-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-sun-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-sun-horizon">—</span>
      </div>
    </div>

    <!-- Earth telemetry -->
    <div class="spice-result-group">
      <div class="spice-result-heading">🌍 EARTH (DTE COMMS)</div>
      <div class="spice-data-grid">
        <span class="spice-data-label">Distance</span>
        <span class="spice-data-value" id="res-earth-dist">—</span>
        <span class="spice-data-label">Azimuth</span>
        <span class="spice-data-value" id="res-earth-az">—</span>
        <span class="spice-data-label">Elevation</span>
        <span class="spice-data-value" id="res-earth-el">—</span>
        <span class="spice-data-label">Horizon</span>
        <span class="spice-data-value spice-geometric-badge" id="res-earth-horizon">—</span>
      </div>
    </div>

    <div class="spice-frame-line">
      Frame: <strong id="res-frame">MOON_ME</strong> ·
      Aberration: <strong id="res-aberration">NONE (geometric)</strong>
    </div>
    <div class="spice-scene-note" id="spice-scene-note" style="display:none">
      ⚡ Three.js solar illumination aligned to SPICE vector
    </div>
    <div class="spice-terrain-warning">
      ℹ Geometric elevation shown. Horizon-ray terrain occlusion computed via LOLA DEM.
    </div>
  </div>
</div>
`}async function ft(a,t=!1){const i=a.querySelector("#spice-status-dot"),e=a.querySelector("#spice-status-text"),s=a.querySelector("#spice-fetch-btn"),n=a.querySelector("#spice-retry-btn");t&&(e.textContent="Connecting to SPICE backend…",i.className="spice-status-dot");try{const p=await li(),c=p.status==="ok";return i.className="spice-status-dot "+(c?"dot-ok":"dot-warn"),e.textContent=c?`SPICE Online · ${p.reference_frame}`:`Backend Degraded: ${p.error??"Kernel warning"}`,s.disabled=!c,n&&(n.style.display=c?"none":"inline-block"),c}catch{return i.className="spice-status-dot dot-err",e.textContent="Backend Offline (port 8000)",s.disabled=!0,n&&(n.style.display="inline-block"),!1}}async function ae(a){if(ht)return;ht=!0;const t=a.querySelector("#spice-loading"),i=a.querySelector("#spice-error-box"),e=a.querySelector("#spice-results");t.style.display="flex",i.style.display="none";try{const s=a.querySelector("#spice-time-input"),n=a.querySelector("#spice-lat"),p=a.querySelector("#spice-lon"),c=s.value.trim(),d=wt(n.value,p.value);if(!d.valid)throw new Error(d.error||"Invalid coordinates.");const r=await ci({utc_time:c,latitude_deg:d.lat,longitude_deg:d.lon,elevation_m:0});xs(a,r),_s(r),e.style.display="block"}catch(s){const n=s instanceof Error?s.message:String(s);i.textContent=`Error: ${n}`,i.style.display="block",await ft(a)}finally{t.style.display="none",ht=!1}}function xs(a,t){const i=c=>c.toFixed(1),e=c=>c>1e6?`${(c/1495978707e-1).toFixed(4)} AU`:`${c.toLocaleString(void 0,{maximumFractionDigits:0})} km`;pe("res-sun-dist",e(t.sun.distance_km)),pe("res-sun-az",`${i(t.sun.azimuth_deg)}°`);const s=t.sun.elevation_deg;Xt("res-sun-el",`${i(s)}°`,s>=0?"spice-above":"spice-below"),pe("res-sun-horizon",s>=0?"↑ Above Horizon":"↓ Below Horizon"),pe("res-earth-dist",e(t.earth.distance_km)),pe("res-earth-az",`${i(t.earth.azimuth_deg)}°`);const n=t.earth.elevation_deg;Xt("res-earth-el",`${i(n)}°`,n>=0?"spice-above":"spice-below"),pe("res-earth-horizon",n>=0?"↑ DTE Visible":"↓ Occluded"),pe("res-frame",t.reference_frame),pe("res-aberration",t.aberration_correction);const p=a.querySelector("#spice-scene-note");p.style.display=We?"block":"none"}function _s(a){if(!We)return;const[t,i,e]=vt(a.sun.direction_unit),s=8;We.sunLight.position.set(t*s,i*s,e*s);const[n,p,c]=vt(a.earth.direction_unit);We.earthshineLight.position.set(-n*s,-p*s,-c*s)}function Ms(a){const t=a.querySelector("#spice-auto-btn");if(gt=!gt,gt){t.classList.add("active"),t.textContent="Tracking ■";const i=a.querySelector("#spice-time-input");i.value=new Date().toISOString().slice(0,19)+"Z",ae(a),et=setInterval(()=>{i.value=new Date().toISOString().slice(0,19)+"Z",ae(a)},3e4)}else t.classList.remove("active"),t.textContent="Auto-Track ●",et!==null&&(clearInterval(et),et=null)}function pe(a,t){const i=document.getElementById(a);i&&(i.textContent=t,i.className="spice-data-value")}function Xt(a,t,i){const e=document.getElementById(a);e&&(e.textContent=t,e.className=`spice-data-value ${i}`)}const at=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton Crater.",isInsideSite01DEM:!1},{id:"shackleton-rim",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering permanently shadowed regions (PSR) with high water-ice deposition probability.",isInsideSite01DEM:!1},{id:"malapert",name:"Malapert Mountain",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and continuous Direct-To-Earth comms.",isInsideSite01DEM:!1},{id:"haworth-rim",name:"Haworth Crater Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with potential volatile concentrations.",isInsideSite01DEM:!1},{id:"de-gerlache-rim",name:"de Gerlache Crater Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim massif offering favorable low-elevation sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1},{id:"nobile-rim-1",name:"Nobile Crater Rim 1",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Extensive highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1}];class Cs{constructor(t){f(this,"group");f(this,"animatedElements",[]);f(this,"interactiveMarkers",[]);f(this,"siteMarkerGroups",new Map);f(this,"raycaster",new si);f(this,"mouse",new A);f(this,"onSelectSiteCallback");f(this,"disposables",[]);this.group=new me,this.group.name="SouthPoleOverlay",this.createPolarGrid(t),this.createSouthPoleBeacon(t),this.createLandingSites(t)}setOnSelectSite(t){this.onSelectSiteCallback=t}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(t){this.siteMarkerGroups.forEach((i,e)=>{const s=e===t,n=i.getObjectByName("TargetRing"),p=i.getObjectByName("BeaconLine"),c=i.getObjectByName("PinHead");if(n){const d=n.material;d.color.setHex(s?3718648:e==="site-01"?959977:6583435),d.opacity=s?.95:.6,n.scale.setScalar(s?1.3:1)}if(p){const d=p.material;d.color.setHex(s?3718648:e==="site-01"?959977:6583435),d.opacity=s?.95:.5}c&&c.material.color.setHex(s?16777215:e==="site-01"?3718648:9741240)})}createPolarGrid(t){const i=new me;i.name="PolarReferenceGrid",[{lat:-80,color:3718648,opacity:.35,segments:180,label:"80°S Boundary"},{lat:-85,color:165063,opacity:.4,segments:180,label:"85°S Parallel"},{lat:-88,color:223649,opacity:.3,segments:120,label:"88°S Parallel"}].forEach(({lat:n,color:p,opacity:c,segments:d})=>{const r=[],l=t*1.0015;for(let b=0;b<=d;b++){const y=b/d*360;r.push(Ie(n,y,l))}const m=new ue().setFromPoints(r),u=new fe({color:p,transparent:!0,opacity:c,blending:Kt}),h=new De(m,u);i.add(h),this.disposables.push(m,u)}),[{lon:0,color:3718648,opacity:.55,name:"Meridian_0_EarthFacing"},{lon:90,color:165063,opacity:.35,name:"Meridian_90E"},{lon:180,color:165063,opacity:.35,name:"Meridian_180_FarSide"},{lon:270,color:165063,opacity:.35,name:"Meridian_270E"}].forEach(({lon:n,color:p,opacity:c,name:d})=>{const r=[],l=t*1.0015,m=40;for(let y=0;y<=m;y++){const S=-80-10*(y/m);r.push(Ie(S,n,l))}const u=new ue().setFromPoints(r),h=new fe({color:p,transparent:!0,opacity:c,blending:Kt}),b=new De(u,h);b.name=d,i.add(b),this.disposables.push(u,h)}),this.group.add(i)}createSouthPoleBeacon(t){const i=new me;i.name="TrueSouthPoleMarker",i.position.set(0,-t,0);const e=new Pe(.018,.022,48);e.rotateX(-Math.PI/2);const s=new W({color:16096779,side:ye,transparent:!0,opacity:.85}),n=new q(e,s);n.name="PoleReticleRing",i.add(n),this.animatedElements.push({object:n,baseScale:1,pulseSpeed:2}),this.disposables.push(e,s);const p=new Pe(.009,.011,32);p.rotateX(-Math.PI/2);const c=new W({color:16777215,side:ye,transparent:!0,opacity:.9}),d=new q(p,c);i.add(d),this.disposables.push(p,c);const r=new Le(.004,16,16),l=new W({color:16777215}),m=new q(r,l);i.add(m),this.disposables.push(r,l);const u=[new E(-.035,0,0),new E(.035,0,0),new E(0,0,-.035),new E(0,0,.035)],h=new ue().setFromPoints(u),b=new qi(h,new fe({color:16096779,transparent:!0,opacity:.75}));i.add(b),this.disposables.push(h,b.material);const y=new ue().setFromPoints([new E(0,0,0),new E(0,-.18,0)]),S=new fe({color:16096779,transparent:!0,opacity:.8}),_=new De(y,S);i.add(_),this.disposables.push(y,S);const M=new Le(.06,12,12),C=new W({visible:!1}),P=new q(M,C);P.userData={site:at.find(T=>T.id==="south-pole")},i.add(P),this.interactiveMarkers.push(P),this.disposables.push(M,C),this.siteMarkerGroups.set("south-pole",i),this.group.add(i)}createLandingSites(t){at.forEach(i=>{if(i.id==="south-pole")return;const e=i.id==="site-01",s=new me;s.name=`SiteMarker_${i.id}`;const n=Ie(i.lat,i.lon,t*1.002);s.position.copy(n);const p=n.clone().normalize();s.quaternion.setFromUnitVectors(new E(0,1,0),p);const c=e?3718648:165063,d=e?.024:.016,r=new Pe(d*.8,d,32);r.rotateX(Math.PI/2);const l=new W({color:c,side:ye,transparent:!0,opacity:e?.9:.65}),m=new q(r,l);m.name="TargetRing",s.add(m),this.animatedElements.push({object:m,baseScale:1,pulseSpeed:e?2.5:1.5}),this.disposables.push(r,l);const u=e?.075:.045,h=new ue().setFromPoints([new E(0,0,0),new E(0,u,0)]),b=new fe({color:c,transparent:!0,opacity:.75}),y=new De(h,b);y.name="BeaconLine",s.add(y),this.disposables.push(h,b);const S=new Le(e?.007:.005,16,16),_=new W({color:e?16777215:9741240}),M=new q(S,_);M.name="PinHead",M.position.y=u,s.add(M),this.disposables.push(S,_);const C=new Le(.045,8,8),P=new W({visible:!1}),T=new q(C,P);T.position.y=u*.5,T.userData={site:i},s.add(T),this.interactiveMarkers.push(T),this.disposables.push(C,P),this.siteMarkerGroups.set(i.id,s),this.group.add(s)})}update(t){this.animatedElements.forEach(({object:i,baseScale:e=1,pulseSpeed:s=2})=>{const n=e*(1+.08*Math.sin(t*s));i.scale.set(n,n,n)})}handleClick(t,i){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,i);const e=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(e.length>0){const s=e[0].object.userData.site;if(s)return this.highlightSite(s.id),this.onSelectSiteCallback&&this.onSelectSiteCallback(s),s}return null}dispose(){this.disposables.forEach(t=>{try{t.dispose()}catch{}}),this.disposables=[]}}class hi{constructor(){f(this,"container");f(this,"isOpen",!1);f(this,"mode","mission");f(this,"missionContext",null);f(this,"comparisonContext",null);f(this,"selectedFormat","pdf");f(this,"isGenerating",!1);f(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(t,i){i&&(this.selectedFormat=i),this.mode="mission",this.missionContext=t,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(t,i){i&&(this.selectedFormat=i),this.mode="comparison",this.comparisonContext=t,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(t="mission"){this.isOpen?this.close():t==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var s,n,p,c,d,r,l,m;const t=this.mode==="mission",i=t?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",e=t?`${((s=this.missionContext)==null?void 0:s.scenarioName)??"Mission"} · ${((n=this.missionContext)==null?void 0:n.siteName)??"Selected Site"} (${(c=(p=this.missionContext)==null?void 0:p.latitudeDeg)==null?void 0:c.toFixed(3)}°N, ${(r=(d=this.missionContext)==null?void 0:d.longitudeDeg)==null?void 0:r.toFixed(3)}°E)`:`${((l=this.comparisonContext)==null?void 0:l.reportTitle)??"Candidate Comparison"} · ${((m=this.comparisonContext)==null?void 0:m.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
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
      </div>`}return""}wireEvents(){var i,e,s,n;(i=this.container.querySelector("#btn-close-export"))==null||i.addEventListener("click",()=>this.close()),(e=this.container.querySelector("#btn-cancel-export"))==null||e.addEventListener("click",()=>this.close()),(s=this.container.querySelector("#export-backdrop"))==null||s.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(p=>{p.addEventListener("click",()=>{if(this.isGenerating)return;const c=p.getAttribute("data-format")||"pdf";this.selectedFormat=c,this.render()})}),(n=this.container.querySelector("#btn-generate-export"))==null||n.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(t){console.error("[LUNAOPS] Export failed:",t),this.statusMessage={type:"error",text:t.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var c;if(!this.missionContext)throw new Error("Missing mission scenario context.");const t=this.missionContext,i={scenario_name:t.scenarioName||"Artemis Candidate Mission",notes:t.notes||"",site_name:t.siteName||"South Pole Site",latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:t.startUtc,end_utc:t.endUtc,step_minutes:t.stepMinutes,timeline_result:t.timelineResponse||null,horizon_result:t.horizonProfile||null},e=`${oe}/api/export/mission?format=${this.selectedFormat}`,s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){let d=`HTTP ${s.status}`;try{const r=await s.json();d=((c=r.detail)==null?void 0:c.message)||JSON.stringify(r.detail||r)}catch{d=await s.text()}throw new Error(`Export failed: ${d}`)}const n=(t.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await s.blob();this.triggerDownload(d,`lunaops_${n}_report_${p}.pdf`)}else if(this.selectedFormat==="csv"){const d=await s.text(),r=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(r,`lunaops_${n}_timeseries_${p}.csv`)}else{const d=await s.json(),r=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(r,`lunaops_${n}_manifest_${p}.json`)}}async exportComparison(){var c;if(!this.comparisonContext)throw new Error("Missing comparison context.");const t=this.comparisonContext;if(!t.scenarios||t.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const i=t.scenarios.map(d=>{let r=`${d.startDate}T${d.startTime}`;r.endsWith("Z")||(r+="Z");let l=`${d.endDate}T${d.endTime}`;return l.endsWith("Z")||(l+="Z"),{id:d.id,name:d.name,latitude_deg:d.latitudeDeg,longitude_deg:d.longitudeDeg,elevation_m:d.elevationM,instrument_height_m:d.instrumentHeightM,start_utc:r,end_utc:l,step_minutes:d.stepMinutes}}),e={report_title:t.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:i,constraints:t.constraints||null,ranking_weights:t.rankingWeights||null,comparison_result:t.comparisonResult||null},s=`${oe}/api/export/comparison?format=${this.selectedFormat}`,n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok){let d=`HTTP ${n.status}`;try{const r=await n.json();d=((c=r.detail)==null?void 0:c.message)||JSON.stringify(r.detail||r)}catch{d=await n.text()}throw new Error(`Comparison export failed: ${d}`)}const p=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const d=await n.blob();this.triggerDownload(d,`lunaops_comparison_report_${p}.pdf`)}else if(this.selectedFormat==="csv"){const d=await n.text(),r=new Blob([d],{type:"text/csv;charset=utf-8;"});this.triggerDownload(r,`lunaops_comparison_matrix_${p}.csv`)}else{const d=await n.json(),r=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});this.triggerDownload(r,`lunaops_comparison_manifest_${p}.json`)}}triggerDownload(t,i){const e=URL.createObjectURL(t),s=document.createElement("a");s.href=e,s.download=i,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(e),1e3)}}class ks{constructor(){f(this,"metadata",null);f(this,"elevCanvas",null);f(this,"slopeCanvas",null);f(this,"toterrCanvas",null);f(this,"elevCtx",null);f(this,"slopeCtx",null);f(this,"toterrCtx",null);f(this,"isLoaded",!1);f(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const t=await fetch("/generated/site01_metadata.json");if(!t.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await t.json();const[i,e,s]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(i),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(e),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(s),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(t){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",t)}})(),this.loadPromise)}loadImage(t){return new Promise((i,e)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>i(s),s.onerror=n=>e(n),s.src=t})}createCanvasFromImage(t){const i=document.createElement("canvas");i.width=t.width,i.height=t.height;const e=i.getContext("2d",{willReadFrequently:!0});return e&&e.drawImage(t,0,0),i}getMetadata(){return this.metadata}sample(t,i){var d,r;const{x:e,y:s}=ui(t,i),{px512:n,py512:p,isInside:c}=fs(e,s);if(!c||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:c,px:n,py:p,xM:e,yM:s};try{const l=this.elevCtx.getImageData(n,p,1,1).data[0],m=((d=this.slopeCtx)==null?void 0:d.getImageData(n,p,1,1).data[0])??0,u=((r=this.toterrCtx)==null?void 0:r.getImageData(n,p,1,1).data[0])??0,h=this.metadata.elev_max_m-this.metadata.elev_min_m,b=this.metadata.elev_min_m+l/255*h,y=m/255*this.metadata.slope_max_deg,S=u/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(b*10)/10,slopeDeg:Math.round(y*10)/10,errorM:Math.round(S*100)/100,px:n,py:p,xM:e,yM:s}}catch{return{isInside:c,px:n,py:p,xM:e,yM:s}}}}const Jt=new ks,I=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class $s{constructor(){f(this,"container");f(this,"isOpen",!1);f(this,"currentTab","site");f(this,"scenarioName","Artemis III Candidate — South Pole Ridge");f(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");f(this,"selectedSite");f(this,"timeline");f(this,"spiceHealth",null);f(this,"initialGeometry",null);f(this,"horizonProfile",null);f(this,"horizonVisibility",null);f(this,"horizonLoading",!1);f(this,"horizonError",null);f(this,"exportPanel",null);f(this,"activeTerrainLayer","elev");f(this,"timelineResponse",null);f(this,"timelineLoading",!1);f(this,"timelineError",null);f(this,"scrubbedSampleIndex",0);f(this,"onTimelineScrubbedCallback");f(this,"landingWindowsResponse",null);f(this,"landingWindowsLoading",!1);f(this,"landingWindowsError",null);f(this,"landingWindowsStartDate","2026-10-01");f(this,"landingWindowsEndDate","2026-12-31");f(this,"landingWindowsFilter","all");f(this,"terrainCtx",null);f(this,"onSiteChangedCallback");this.selectedSite={name:I[0].name,designation:I[0].designation,latitudeDeg:I[0].lat,longitudeDeg:I[0].lon,elevationM:I[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(t){this.onSiteChangedCallback=t}setOnTimelineScrubbed(t){this.onTimelineScrubbedCallback=t}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(t,i){this.selectedSite.latitudeDeg=Math.round(t*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(i*1e3)/1e3,this.selectedSite.name="Custom Selected Location",this.selectedSite.designation="User Chosen Site",this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}async init(){await Jt.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await li()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const t=this.selectedSite.latitudeDeg,i=this.selectedSite.longitudeDeg,e=Jt.sample(i,t);if(this.selectedSite.isInsideSite01DEM=e.isInside,e.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=e.elevationM,this.selectedSite.sampledSlopeDeg=e.slopeDeg,this.selectedSite.sampledErrorM=e.errorM,this.selectedSite.pixelCoords={px:e.px,py:e.py,gridMax:512},this.selectedSite.polarStereoM={x:e.xM,y:e.yM},e.elevationM!==void 0&&(this.selectedSite.elevationM=e.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:s,y:n}=ui(i,t);this.selectedSite.polarStereoM={x:s,y:n}}this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const t=`${this.timeline.startDate}T${this.timeline.startTime}Z`,i=Date.parse(t);if(isNaN(i))return;this.timeline.isoUtcStart=new Date(i).toISOString().replace(".000Z","Z");const e=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,s=i+this.timeline.durationValue*e;this.timeline.isoUtcEnd=new Date(s).toISOString().replace(".000Z","Z");const n=new Date(i).getUTCFullYear(),p=new Date(s).getUTCFullYear();this.timeline.isWithinKernelCoverage=n>=1900&&n<=2050&&p>=1900&&p<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var p;const t=[];(p=this.spiceHealth)!=null&&p.initialized?t.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):t.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const i=this.selectedSite.latitudeDeg,e=this.selectedSite.longitudeDeg;i>=-90&&i<=90&&e>=-180&&e<=360?t.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${K(i,e)} · Elevation: ${this.selectedSite.elevationM} m`}):t.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?t.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):t.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?t.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):t.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let s="READY",n="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return t.some(c=>c.status==="fail")?(s="ERROR",n="One or more required parameters failed validation. Correct items marked in red."):t.some(c=>c.status==="warn")&&(s="READY_WITH_LIMITATIONS",n="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:s,summary:n,checks:t}}toScenarioJSON(){this.computeIsoTimestamps();const t=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:t,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const t=this.getReadinessEvaluation();this.container.innerHTML=`
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
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(t){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(t);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(t);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const t=this.selectedSite.isInsideSite01DEM,i=this.horizonVisibility,e=this.horizonProfile,s=d=>d==="no_obstruction_detected_within_coverage"?"✅":d==="near_horizon_grazing"?"⚠️":d==="blocked_by_local_terrain"?"🪨":d==="blocked_by_lunar_body"?"🌑":"❓",n=d=>d==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":d==="near_horizon_grazing"?"Near-Horizon Grazing":d==="blocked_by_local_terrain"?"Blocked by Terrain":d==="blocked_by_lunar_body"?"Occulted by Moon":d==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",p=d=>d==="no_obstruction_detected_within_coverage"?"#22c55e":d==="near_horizon_grazing"?"#f59e0b":d.startsWith("blocked")?"#ef4444":"#94a3b8",c=(d,r,l)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${p(l.visibility_status)}">
          <span class="geom-body-title">${r} ${d}</span>
          <span class="horizon-badge" style="background: ${p(l.visibility_status)}22; color: ${p(l.visibility_status)}; border: 1px solid ${p(l.visibility_status)}44">
            ${s(l.visibility_status)} ${n(l.visibility_status)}
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
                    <p>Current coordinates (${K(t,i)}) fall outside the 16×16 km Site 01 tile.</p>
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
            ${I.map(s=>`
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
    `}renderTimelineTab(){const t=this.selectedSite.isInsideSite01DEM,i=this.timelineResponse,e=i==null?void 0:i.summary,s=(i==null?void 0:i.samples)??[],n=s[this.scrubbedSampleIndex]??s[0],p=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},c=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},d=l=>{switch(l){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},r=l=>{switch(l){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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
          ${n?`
          <div id="scrubbed-conditions-panel" class="scrubbed-conditions-panel" style="margin-top:16px;">
            <div class="scrubbed-header">
              <div>
                <span class="scrubbed-time-title">Selected UTC Timestamp:</span>
                <strong id="scrubbed-time-val" class="code-pill" style="font-size:0.95rem; margin-left:8px;">${n.timestamp_utc}</strong>
              </div>
              <span class="badge-pill">Sample ${this.scrubbedSampleIndex+1} of ${s.length}</span>
            </div>

            <div class="scrubbed-grid">
              <div class="scrubbed-col">
                <div class="scrubbed-col-title">☀️ Sun Ephemeris &amp; Illumination</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${p(n.sun.visibility_state)}</span></div>
                <div class="scrubbed-val-row"><span>Azimuth:</span> <strong>${n.sun.azimuth_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Elevation:</span> <strong>${n.sun.elevation_deg.toFixed(2)}°</strong></div>
                <div class="scrubbed-val-row"><span>Terrain Skyline:</span> <strong>${n.sun.terrain_horizon_elevation_deg!==null?n.sun.terrain_horizon_elevation_deg.toFixed(2)+"°":"—"}</strong></div>
                <div class="scrubbed-val-row"><span>Angular Clearance:</span> <strong style="color:${(n.sun.angular_clearance_deg??0)>=0?"#22c55e":"#ef4444"}">${n.sun.angular_clearance_deg!==null?(n.sun.angular_clearance_deg>=0?"+":"")+n.sun.angular_clearance_deg.toFixed(2)+"°":"—"}</strong></div>
              </div>

              <div class="scrubbed-col">
                <div class="scrubbed-col-title">🌍 Earth Ephemeris &amp; Line of Sight</div>
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-earth-state">${c(n.earth.visibility_state)}</span></div>
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
              <td><code>${K(i,e)}</code></td>
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
    `}openExportModal(t){this.exportPanel||(this.exportPanel=new hi),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},t)}renderExportTab(){const t=this.timelineResponse!==null;return`
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
    `}renderLandingWindowsTab(){const t=this.landingWindowsResponse,i=(t==null?void 0:t.days)??[],e=t==null?void 0:t.scan_params,s=t==null?void 0:t.summary,n=r=>{try{return new Date(r+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return r}},p=(r,l)=>{switch(r){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${l})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${l})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${l})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${l})</span>`}},c=r=>{switch(r){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},d=i.filter(r=>this.landingWindowsFilter==="safe"?r.is_safe_for_landing:this.landingWindowsFilter==="excellent"?r.safety_rating==="excellent":!0);return`
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
                <span class="window-day-date">${n(r.date)}</span>
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
    `}drawTerrainCanvas(){setTimeout(()=>{const t=document.getElementById("site01-terrain-canvas");if(!t)return;this.terrainCtx=t.getContext("2d");const i=new Image;i.crossOrigin="anonymous";const e=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";i.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(i,0,0,512,512),this.selectedSite.pixelCoords)){const{px:s,py:n}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(s-14,n),this.terrainCtx.lineTo(s+14,n),this.terrainCtx.moveTo(s,n-14),this.terrainCtx.lineTo(s,n+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(s,n,6,0,2*Math.PI),this.terrainCtx.stroke()}},i.src=e},50)}wireEvents(){var ge,D,re,_e,Xe,ve,le,be,Ne,Fe,Q,Me,ze,Ce;(ge=this.container.querySelector("#btn-close-workspace"))==null||ge.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(g=>{g.addEventListener("click",w=>{const k=w.currentTarget;this.currentTab=k.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(g=>{g.addEventListener("click",w=>{const L=w.currentTarget.dataset.presetId,H=I.find(ce=>ce.id===L);H&&(this.selectedSite.name=H.name,this.selectedSite.designation=H.designation,this.selectedSite.latitudeDeg=H.lat,this.selectedSite.longitudeDeg=H.lon,this.selectedSite.elevationM=H.elev,this.updateSiteCoverageAndSample(),this.render())})}),(D=this.container.querySelector("#btn-jump-site01"))==null||D.addEventListener("click",()=>{const g=I[0];this.selectedSite.name=g.name,this.selectedSite.designation=g.designation,this.selectedSite.latitudeDeg=g.lat,this.selectedSite.longitudeDeg=g.lon,this.selectedSite.elevationM=g.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(g=>{g.addEventListener("click",w=>{const k=w.currentTarget;this.activeTerrainLayer=k.dataset.layer||"elev",this.render()})});const t=this.container.querySelector("#inp-lat"),i=this.container.querySelector("#inp-lon"),e=this.container.querySelector("#inp-elev"),s=()=>{if(!t||!i||!e)return;const g=parseFloat(t.value),w=parseFloat(i.value),k=parseFloat(e.value);!isNaN(g)&&!isNaN(w)&&(this.selectedSite.latitudeDeg=g,this.selectedSite.longitudeDeg=w,this.selectedSite.elevationM=isNaN(k)?0:k,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};t==null||t.addEventListener("change",s),i==null||i.addEventListener("change",s),e==null||e.addEventListener("change",s);const n=this.container.querySelector("#site01-terrain-canvas");n==null||n.addEventListener("click",g=>{const w=n.getBoundingClientRect(),k=g.clientX-w.left,L=g.clientY-w.top,H=Math.round(k/w.width*512),ce=Math.round(L/w.height*512),{lonDeg:ct,latDeg:dt}=ys(H,ce);this.selectedSite.latitudeDeg=Math.round(dt*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(ct*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${H}, ${ce})`,this.updateSiteCoverageAndSample(),this.render()});const p=this.container.querySelector("#inp-start-date"),c=this.container.querySelector("#inp-start-time"),d=this.container.querySelector("#inp-duration-val"),r=this.container.querySelector("#inp-duration-unit"),l=this.container.querySelector("#inp-timestep"),m=()=>{p&&(this.timeline.startDate=p.value),c&&(this.timeline.startTime=c.value),d&&(this.timeline.durationValue=parseInt(d.value,10)||1),r&&(this.timeline.durationUnit=r.value),l&&(this.timeline.timeStepHours=parseFloat(l.value)||1),this.computeIsoTimestamps(),this.render()};p==null||p.addEventListener("change",m),c==null||c.addEventListener("change",m),d==null||d.addEventListener("change",m),r==null||r.addEventListener("change",m),l==null||l.addEventListener("change",m);const u=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const g=Math.round(this.timeline.timeStepHours*60),w=await hs({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:g,refinement_tolerance_sec:60});this.timelineResponse=w,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),w.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w.samples[0])}catch(g){this.timelineLoading=!1,this.timelineError=g.message??String(g),this.render()}};(re=this.container.querySelector("#btn-calc-timeline"))==null||re.addEventListener("click",u);const h=this.container.querySelector("#inp-timeline-scrubber");h==null||h.addEventListener("input",()=>{var k;const g=parseInt(h.value,10);this.scrubbedSampleIndex=g;const w=(k=this.timelineResponse)==null?void 0:k.samples[g];w&&(this.updateScrubbedReadout(w),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w))});const b=this.container.querySelector("#inp-scen-name"),y=this.container.querySelector("#inp-scen-notes");b==null||b.addEventListener("input",()=>{this.scenarioName=b.value}),y==null||y.addEventListener("input",()=>{this.scenarioNotes=y.value});const S=async()=>{try{const g=this.container.querySelector("#btn-eval-spice-tab"),w=this.container.querySelector("#btn-eval-spice-footer");g&&(g.disabled=!0,g.textContent="Calculating SPICE..."),w&&(w.disabled=!0,w.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const k=await ci({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=k,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(g){console.error("[MissionWorkspace] SPICE Calculation Error:",g),this.currentTab="readiness",this.render();const w=this.container.querySelector(".geometry-preview-area");w&&(w.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${g.message||g}</p>
            </div>
          `)}};(_e=this.container.querySelector("#btn-eval-spice-tab"))==null||_e.addEventListener("click",S),(Xe=this.container.querySelector("#btn-eval-spice-footer"))==null||Xe.addEventListener("click",S),(ve=this.container.querySelector("#btn-eval-horizon"))==null||ve.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const g=this.initialGeometry,[w,k]=await Promise.all([us({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),ms({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:g.sun.azimuth_deg,sun_elevation_deg:g.sun.elevation_deg,sun_distance_km:g.sun.distance_km,earth_azimuth_deg:g.earth.azimuth_deg,earth_elevation_deg:g.earth.elevation_deg,earth_distance_km:g.earth.distance_km})]);this.horizonProfile=w,this.horizonVisibility=k,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(g){this.horizonLoading=!1,this.horizonError=g.message??String(g),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const _=()=>{const g=this.toScenarioJSON(),w=new Blob([JSON.stringify(g,null,2)],{type:"application/json"}),k=URL.createObjectURL(w),L=document.createElement("a");L.href=k,L.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,L.click(),URL.revokeObjectURL(k)};(le=this.container.querySelector("#btn-export-scenario"))==null||le.addEventListener("click",_),(be=this.container.querySelector("#btn-open-export-panel-footer"))==null||be.addEventListener("click",()=>this.openExportModal()),(Ne=this.container.querySelector("#btn-open-full-export-dialog"))==null||Ne.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(g=>{g.addEventListener("click",()=>{const w=g.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(w)})}),(Fe=this.container.querySelector("#btn-export-scenario-summary"))==null||Fe.addEventListener("click",_);const M=this.container.querySelector("#inp-windows-start-date"),C=this.container.querySelector("#inp-windows-end-date");M==null||M.addEventListener("change",()=>{M.value&&(this.landingWindowsStartDate=M.value)}),C==null||C.addEventListener("change",()=>{C.value&&(this.landingWindowsEndDate=C.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(g=>{g.addEventListener("click",w=>{const L=w.currentTarget.dataset.preset;if(L==="30d"){const H=new Date(this.timeline.startDate+"T00:00:00Z"),ce=new Date(H.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=H.toISOString().slice(0,10),this.landingWindowsEndDate=ce.toISOString().slice(0,10)}else L==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):L==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(g=>{g.addEventListener("click",w=>{const L=w.currentTarget.dataset.filter;L&&(this.landingWindowsFilter=L,this.render())})});const P=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const g=await di({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=g,this.landingWindowsLoading=!1,this.render()}catch(g){this.landingWindowsLoading=!1,this.landingWindowsError=g.message??String(g),this.render()}};(Q=this.container.querySelector("#btn-scan-landing-windows"))==null||Q.addEventListener("click",P),(Me=this.container.querySelector("#btn-run-initial-scan"))==null||Me.addEventListener("click",P);const T=g=>{this.timeline.startDate=g,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(ze=this.container.querySelector("#btn-apply-best-window"))==null||ze.addEventListener("click",g=>{const k=g.currentTarget.dataset.date;k&&T(k)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(g=>{g.addEventListener("click",w=>{const L=w.currentTarget.dataset.date;L&&T(L)})}),(Ce=this.container.querySelector("#btn-apply-3d-view"))==null||Ce.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const t=document.getElementById("horizon-polar-canvas");if(!t||!this.horizonProfile)return;const i=this.horizonProfile,e=t.getContext("2d");if(!e)return;const s=t.width,n=t.height,p=s/2,c=n/2,d=Math.min(s,n)/2-32;e.clearRect(0,0,s,n),e.fillStyle="#0a0f1e",e.fillRect(0,0,s,n);const r=Math.max(...i.profile.map(h=>h.horizon_elevation_deg),10);[0,r*.25,r*.5,r*.75,r].forEach(h=>{const b=d*(1-h/r);e.beginPath(),e.arc(p,c,Math.max(b,1),0,2*Math.PI),e.strokeStyle="rgba(148,163,184,0.15)",e.lineWidth=1,e.stroke(),h>0&&(e.fillStyle="rgba(148,163,184,0.5)",e.font="10px Inter, sans-serif",e.fillText(`${h.toFixed(1)}°`,p+4,c-b+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([h,b])=>{const y=(Number(b)-90)*Math.PI/180;e.beginPath(),e.moveTo(p,c),e.lineTo(p+d*Math.cos(y),c+d*Math.sin(y)),e.strokeStyle="rgba(148,163,184,0.2)",e.lineWidth=1,e.stroke(),e.fillStyle="#94a3b8",e.font="bold 11px Inter, sans-serif",e.fillText(String(h),p+(d+16)*Math.cos(y)-4,c+(d+16)*Math.sin(y)+4)}),e.beginPath(),i.profile.forEach((h,b)=>{const y=(h.azimuth_deg-90)*Math.PI/180,S=d*(1-Math.min(h.horizon_elevation_deg,r)/r),_=p+S*Math.cos(y),M=c+S*Math.sin(y);b===0?e.moveTo(_,M):e.lineTo(_,M)}),e.closePath(),e.fillStyle="rgba(56,189,248,0.15)",e.fill(),e.strokeStyle="#38bdf8",e.lineWidth=2,e.stroke();const u=this.horizonVisibility;if(u){const h=(b,y,S,_)=>{const M=(b-90)*Math.PI/180,C=d*(1-Math.max(0,Math.min(y,r))/r),P=p+C*Math.cos(M),T=c+C*Math.sin(M);e.beginPath(),e.arc(P,T,8,0,2*Math.PI),e.fillStyle=S,e.fill(),e.fillStyle="#fff",e.font="bold 10px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(_,P,T),e.textAlign="start",e.textBaseline="alphabetic"};h(u.sun.azimuth_deg,u.sun.geometric_elevation_deg,"#f59e0b","☀"),h(u.earth.azimuth_deg,u.earth.geometric_elevation_deg,"#3b82f6","🌍")}e.beginPath(),e.arc(p,c,4,0,2*Math.PI),e.fillStyle="#38bdf8",e.fill()}updateScrubbedReadout(t){var d,r;const i=this.container.querySelector("#scrubbed-time-val");i&&(i.textContent=t.timestamp_utc);const e=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},s=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},n=this.container.querySelector("#scrubbed-sun-state");n&&(n.innerHTML=e(t.sun.visibility_state));const p=this.container.querySelector("#scrubbed-earth-state");p&&(p.innerHTML=s(t.earth.visibility_state));const c=this.container.querySelector("#scrubbed-conditions-panel");if(c){const l=(d=c.querySelectorAll(".scrubbed-col")[0])==null?void 0:d.querySelectorAll(".scrubbed-val-row strong");if(l&&l.length>=4){l[0].textContent=`${t.sun.azimuth_deg.toFixed(2)}°`,l[1].textContent=`${t.sun.elevation_deg.toFixed(2)}°`,l[2].textContent=t.sun.terrain_horizon_elevation_deg!==null?`${t.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=t.sun.angular_clearance_deg;l[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",l[3].style.color=(u??0)>=0?"#22c55e":"#ef4444"}const m=(r=c.querySelectorAll(".scrubbed-col")[1])==null?void 0:r.querySelectorAll(".scrubbed-val-row strong");if(m&&m.length>=4){m[0].textContent=`${t.earth.azimuth_deg.toFixed(2)}°`,m[1].textContent=`${t.earth.elevation_deg.toFixed(2)}°`,m[2].textContent=t.earth.terrain_horizon_elevation_deg!==null?`${t.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const u=t.earth.angular_clearance_deg;m[3].textContent=u!==null?`${u>=0?"+":""}${u.toFixed(2)}°`:"—",m[3].style.color=(u??0)>=0?"#3b82f6":"#ef4444"}}}}class Ts{constructor(){f(this,"container");f(this,"isOpen",!1);f(this,"scenarios",[]);f(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});f(this,"comparisonResult",null);f(this,"isLoading",!1);f(this,"errorMessage",null);f(this,"exportPanel",null);f(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new hi),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(t){this.onInspectSiteOnGlobe=t}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:I[0].lat,longitudeDeg:I[0].lon,elevationM:I[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:I[3].lat,longitudeDeg:I[3].lon,elevationM:I[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(t){var s,n,p,c;const i=I.find(d=>d.id===t)||I[0],e=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${e} · ${i.name}`,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elev,instrumentHeightM:2,startDate:((s=this.scenarios[0])==null?void 0:s.startDate)||"2026-10-16",startTime:((n=this.scenarios[0])==null?void 0:n.startTime)||"12:00:00",endDate:((p=this.scenarios[0])==null?void 0:p.endDate)||"2026-10-23",endTime:((c=this.scenarios[0])==null?void 0:c.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(t){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(i=>i.id!==t),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const t=this.scenarios.map(e=>({id:e.id,name:e.name,latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:`${e.startDate}T${e.startTime}Z`,end_utc:`${e.endDate}T${e.endTime}Z`,step_minutes:e.stepMinutes})),i=await gs({scenarios:t,constraints:this.constraints});this.comparisonResult=i}catch(t){this.errorMessage=t.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
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
          ${I.map(s=>`<option value="${s.id}" ${s.name.includes(t.name.split("·")[0].trim())?"selected":""}>${s.name} (${s.lat}°S, ${s.lon}°E)</option>`).join("")}
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
                  <strong>${K(i.inputs.latitude_deg,i.inputs.longitude_deg)}</strong>
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
              ${t.scenarios.map(i=>{const e=i.timeline_result.summary.sunlight,s=(e.full_sunlight_percent+e.partial_sunlight_percent).toFixed(1),n=(e.full_sunlight_hours+e.partial_sunlight_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${n} hrs)</span></div>
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
              ${t.scenarios.map(i=>{const e=i.timeline_result.summary.earth_los,s=(e.full_disc_los_percent+e.partial_disc_los_percent).toFixed(1),n=(e.full_disc_los_hours+e.partial_disc_los_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${n} hrs)</span></div>
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
                      ${e.items.map(n=>`
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
    `}drawSynchronizedTimelines(){const t=document.getElementById("synced-timeline-canvas");if(!t||!this.comparisonResult)return;const i=t.getContext("2d");if(!i)return;const e=t.width,s=t.height;i.clearRect(0,0,e,s);const n=this.comparisonResult.scenarios;if(n.length===0)return;const p=Math.floor((s-40)/n.length);i.fillStyle="#94a3b8",i.font="10px JetBrains Mono, monospace",i.fillText("MISSION TIMELINE EPOCHS",15,18),n.forEach((c,d)=>{const r=30+d*p,l=p-12;i.fillStyle="#e2e8f0",i.font="11px Inter, sans-serif",i.fillText(`${c.scenario_name}`,15,r-4),i.fillStyle="rgba(15, 23, 42, 0.6)",i.fillRect(15,r,e-30,l);const m=c.timeline_result.sun_windows,u=Date.parse(c.inputs.start_utc),b=Date.parse(c.inputs.end_utc)-u;b>0&&(m.forEach(S=>{const _=Date.parse(S.start_utc),M=Date.parse(S.end_utc),C=15+(_-u)/b*(e-30),P=15+(M-u)/b*(e-30),T=Math.max(1,P-C);S.state==="full_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.9)":S.state==="partial_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.5)":S.state==="total_darkness"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(C,r,T,l/2-1)}),c.timeline_result.earth_windows.forEach(S=>{const _=Date.parse(S.start_utc),M=Date.parse(S.end_utc),C=15+(_-u)/b*(e-30),P=15+(M-u)/b*(e-30),T=Math.max(1,P-C);S.state==="full_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.9)":S.state==="centre_only_los"||S.state==="partial_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.5)":S.state==="occulted"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(C,r+l/2+1,T,l/2-2)})),i.strokeStyle="rgba(148, 163, 184, 0.15)",i.strokeRect(15,r,e-30,l)})}wireEvents(){var t,i,e,s,n,p,c,d;(t=document.getElementById("btn-close-comparison"))==null||t.addEventListener("click",()=>{this.close()}),(i=document.getElementById("btn-add-candidate"))==null||i.addEventListener("click",()=>{this.addScenario()}),(e=document.getElementById("btn-sync-dates"))==null||e.addEventListener("click",()=>{if(this.scenarios.length>=2){const r=this.scenarios[0];for(let l=1;l<this.scenarios.length;l++)this.scenarios[l].startDate=r.startDate,this.scenarios[l].startTime=r.startTime,this.scenarios[l].endDate=r.endDate,this.scenarios[l].endTime=r.endTime;this.render()}}),(s=document.getElementById("btn-run-comparison"))==null||s.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(r=>{r.addEventListener("click",l=>{const m=l.currentTarget.getAttribute("data-id");m&&this.removeScenario(m)})}),this.container.querySelectorAll(".select-preset").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=m.getAttribute("data-id"),h=m.value,b=I.find(y=>y.id===h);if(u&&b){const y=this.scenarios.find(S=>S.id===u);y&&(y.name=b.name,y.latitudeDeg=b.lat,y.longitudeDeg=b.lon,y.elevationM=b.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(r=>{r.addEventListener("input",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.name=m.value)})}),this.container.querySelectorAll(".input-lat").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.latitudeDeg=parseFloat(m.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.longitudeDeg=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.elevationM=parseFloat(m.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.startDate=m.value)})}),this.container.querySelectorAll(".input-end-date").forEach(r=>{r.addEventListener("change",l=>{const m=l.currentTarget,u=this.scenarios.find(h=>h.id===m.getAttribute("data-id"));u&&(u.endDate=m.value)})}),(n=document.getElementById("constraint-min-sun"))==null||n.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.min_sunlight_percent=l!==""?parseFloat(l):null}),(p=document.getElementById("constraint-min-earth"))==null||p.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.min_earth_los_percent=l!==""?parseFloat(l):null}),(c=document.getElementById("constraint-max-slope"))==null||c.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.max_slope_deg=l!==""?parseFloat(l):null}),(d=document.getElementById("constraint-max-dark"))==null||d.addEventListener("change",r=>{const l=r.currentTarget.value;this.constraints.max_continuous_darkness_hours=l!==""?parseFloat(l):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(r=>{r.addEventListener("click",l=>{const m=l.currentTarget.getAttribute("data-id"),u=this.scenarios.find(h=>h.id===m);u&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:u.name,lat:u.latitudeDeg,lon:u.longitudeDeg,elevationM:u.elevationM})})})}}const we=1.6,gi=1737.4,Et=-8.9815,vi=10.6855,Ds=vi-Et,Qt=512,Ls=132361;let X=null,N,ne=null,U=null,V=null,se=null,z=null,j=null,qe=!1,it=.6,Be=!1,Ge=!1,Oe=null,ei=null,st=null,he=null,Z=null;function nt(a,t,i=1.2){Z={startPos:J.position.clone(),targetPos:a.clone(),startLook:B.target.clone(),targetLook:t.clone(),startTime:performance.now(),duration:i*1e3}}const Re=document.createElement("canvas"),Ps=document.getElementById("app");Ps.appendChild(Re);const Y=new Bi({canvas:Re,antialias:!0,powerPreference:"high-performance"});Y.setSize(window.innerWidth,window.innerHeight);Y.setPixelRatio(Math.min(window.devicePixelRatio,2));Y.outputColorSpace=ai;Y.toneMapping=Gi;Y.toneMappingExposure=.95;Y.shadowMap.enabled=!1;const Ee=new Wi;Ee.background=new Ki(Ls);const J=new Vi(36,window.innerWidth/window.innerHeight,.01,500);J.position.set(0,.2,4);const B=new ps(J,Y.domElement);B.enableDamping=!0;B.dampingFactor=.06;B.minDistance=1.75;B.maxDistance=12;B.enablePan=!1;B.rotateSpeed=.45;B.zoomSpeed=.7;let xt=!1;B.addEventListener("start",()=>{xt=!0});B.addEventListener("end",()=>{xt=!1});const Is=new Yi(395539,.04);Ee.add(Is);const Ye=new ni(16775406,3.4);Ye.position.set(5,1.2,3.2);Ee.add(Ye);const _t=new ni(2241365,.035);_t.position.set(-5,0,-3.2);Ee.add(_t);const Ze=new Zi(Y),As=new Xi(Ee,J);Ze.addPass(As);const bi=new Ji(new A(window.innerWidth,window.innerHeight),.08,.4,.92);Ze.addPass(bi);const Os={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
  `},Rs=new Qi(Os);Ze.addPass(Rs);function Ns(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:t,rMin:i,rMax:e,size:s,opacity:n})=>{const p=new Float32Array(t*3);for(let r=0;r<t;r++){const l=Math.random()*Math.PI*2,m=Math.acos(2*Math.random()-1),u=i+Math.random()*(e-i);p[r*3]=u*Math.sin(m)*Math.cos(l),p[r*3+1]=u*Math.sin(m)*Math.sin(l),p[r*3+2]=u*Math.cos(m)}const c=new ue;c.setAttribute("position",new ts(p,3));const d=new is({size:s,color:14215423,transparent:!0,opacity:n,sizeAttenuation:!0});Ee.add(new ss(c,d))})}Ns();const Ve=document.createElement("div");Ve.id="loading-overlay";Ve.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(Ve);function Se(a,t){const i=document.getElementById("load-status");if(i&&(i.textContent=a),t!==void 0){const e=document.getElementById("progress-fill");e&&(e.style.width=`${Math.min(100,t)}%`)}}function Fs(){Ve.style.opacity="0",setTimeout(()=>Ve.remove(),700)}const zs=1.8;function Hs(a,t){return new os({map:a,normalMap:t||void 0,normalScale:t?new A(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function js(a,t,i,e,s){const n=(a%1+1)%1*(i-1),p=yt.clamp(1-t,0,1)*(e-1),c=Math.floor(n),d=(c+1)%i,r=Math.floor(p),l=Math.min(r+1,e-1),m=n-c,u=p-r,h=s[(r*i+c)*4]/255,b=s[(r*i+d)*4]/255,y=s[(l*i+c)*4]/255,S=s[(l*i+d)*4]/255,_=h*(1-m)+b*m,M=y*(1-m)+S*m,C=_*(1-u)+M*u;return Et+C*Ds}function Us(a,t){const i=a.attributes.position,e=a.attributes.uv,s=i.count,n=document.createElement("canvas");n.width=t.width,n.height=t.height;const p=n.getContext("2d");p.drawImage(t,0,0);const d=p.getImageData(0,0,n.width,n.height).data;ei=new Float32Array(i.array.length),ei.set(i.array),Oe=new Float32Array(s),st=new Float32Array(i.array.length);const r=new E,l=new E,m=zs;for(let u=0;u<s;u++){r.fromBufferAttribute(i,u);const h=e.getX(u),b=e.getY(u),y=js(h,b,n.width,n.height,d);Oe[u]=y;const S=y/gi*we;l.copy(r).normalize();const _=r.clone().add(l.clone().multiplyScalar(S));st[u*3]=_.x,st[u*3+1]=_.y,st[u*3+2]=_.z,r.add(l.multiplyScalar(S*m)),i.setXYZ(u,r.x,r.y,r.z)}i.needsUpdate=!0,a.computeVertexNormals(),a.computeBoundingSphere()}function qs(a){return a.colorSpace=ai,a.anisotropy=Y.capabilities.getMaxAnisotropy(),a.minFilter=ls,a.magFilter=cs,a.generateMipmaps=!0,a.wrapS=oi,a.wrapT=ri,a.needsUpdate=!0,a}const ti=new es;async function Bs(){const a=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,t=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:a,label:"NASA LROC 2K",is4K:!1}];let i=null,e="NASA LROC 2K",s=!1;for(const c of t)try{Se(`Loading ${c.label}…`,25),i=await new Promise((d,r)=>{ti.load(c.url,l=>d(l),void 0,l=>r(l))}),qs(i),e=c.label,s=c.is4K;break}catch{}if(!i)throw new Error("All color texture candidates failed to load.");Se("Loading LOLA normal map…",50);let n=null;try{n=await new Promise((c,d)=>{ti.load("/generated/ldem_normal_map_half.png",r=>{r.colorSpace=ns,r.anisotropy=Y.capabilities.getMaxAnisotropy(),r.wrapS=oi,r.wrapT=ri,c(r)},void 0,d)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}Se("Loading LOLA DEM topography…",75);let p=null;try{p=await new Promise((c,d)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>c(r),r.onerror=d,r.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:i,colorLabel:e,is4K:s,normal:n,dispImg:p}}let fi={is4K:!0};async function Gs(){const a=await Bs();fi={label:a.colorLabel,is4K:a.is4K};const t=document.getElementById("telem-color");t&&(t.textContent=a.is4K?"NASA LROC 4K":"NASA LROC 2K"),Se("Generating lunar mesh…",85),await new Promise(s=>setTimeout(s,40));const i=new Le(we,Qt,Qt/2);a.dispImg&&Us(i,a.dispImg),Se("Configuring shaders…",95),await new Promise(s=>setTimeout(s,40));const e=Hs(a.color,a.normal);X=new q(i,e),X.castShadow=!1,X.receiveShadow=!1,N=new me,N.rotation.x=yt.degToRad(6.68),N.add(X),ne=new Cs(we),ne.setOnSelectSite(s=>{xe({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})}),N.add(ne.group),Ws(),Ks(),Ee.add(N),Se("Ready",100),setTimeout(Fs,400)}function Ws(){z=new me,z.name="HoverReticle",z.visible=!1;const a=new Pe(.012,.015,32);a.rotateX(Math.PI/2);const t=new W({color:3718648,side:ye,transparent:!0,opacity:.8}),i=new q(a,t);z.add(i);const e=new rs(.003,16);e.rotateX(Math.PI/2);const s=new W({color:16777215,side:ye});z.add(new q(e,s)),N.add(z)}function Ks(){j=new me,j.name="PendingSelectionMarker",j.visible=!1;const a=new Pe(.018,.024,32);a.rotateX(Math.PI/2);const t=new W({color:16096779,side:ye,transparent:!0,opacity:.95});j.add(new q(a,t));const i=new ue().setFromPoints([new E(0,0,0),new E(0,.06,0)]),e=new fe({color:16096779,transparent:!0,opacity:.85});j.add(new De(i,e)),N.add(j)}Gs().catch(a=>{console.error("[LUNAOPS] Build error:",a),Se("Failed to initialize — see console",0)});const Mt=document.createElement("div");Mt.id="ui-layer";Mt.innerHTML=`
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
      <button id="btn-south-pole" class="btn-polar-focus" title="Focus directly on Lunar South Pole 90°S [P]">🎯 South Pole Focus</button>
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
<div class="coords-modal" id="coords-modal" style="display:none;">
  <div class="coords-modal-dialog">
    <div class="coords-modal-header">
      <h3>⌖ Manual Selenographic Coordinate Entry</h3>
      <button type="button" id="btn-close-coords-modal" class="modal-close-btn">&times;</button>
    </div>
    <div class="coords-modal-body">
      <p class="coords-modal-desc">
        Reference Datum: <strong>IAU MOON_ME Sphere (R = 1,737.4 km)</strong>.<br />
        Latitude: -90.0° to +90.0° (South negative). Longitude: 0.0° to 360.0° (East-positive).
      </p>
      <div class="coords-form-grid">
        <label for="manual-lat">Latitude (°)</label>
        <input type="number" id="manual-lat" value="-89.463" min="-90" max="90" step="0.001" />
        <label for="manual-lon">Longitude (°)</label>
        <input type="number" id="manual-lon" value="222.51" min="0" max="360" step="0.01" />
      </div>
      <div id="coords-error-msg" class="coords-error" style="display:none;"></div>
      <div class="coords-preview-line" id="coords-preview-line">
        Format: 89.463° S, 222.510° E · South Polar Region
      </div>
    </div>
    <div class="coords-modal-footer">
      <button type="button" id="btn-apply-manual-coords" class="btn-primary-action">Apply &amp; Target</button>
      <button type="button" id="btn-cancel-manual-coords" class="btn-secondary-action">Cancel</button>
    </div>
  </div>
</div>

<!-- Telemetry Bottom Bar -->
<div class="hud-bottom">
  <div class="telemetry-bar">
    <span class="telem-item"><span class="telem-label">PROVENANCE</span> NASA LRO / LOLA / LROC</span>
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${fi.is4K?"NASA LROC 4K":"NASA LROC 2K"}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Et.toFixed(1)} to +${vi.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${gi} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(Mt);ws({sunLight:Ye,earthshineLight:_t});U=new $s;document.getElementById("btn-new-mission").addEventListener("click",()=>{U==null||U.toggle()});V=new Ts;document.getElementById("btn-compare-sites").addEventListener("click",()=>{V==null||V.toggle()});V.setOnInspectSiteOnGlobe(a=>{xe({name:a.name,designation:"Candidate Site",latitudeDeg:a.lat,longitudeDeg:a.lon,elevationM:a.elevationM,isInsideSite01DEM:a.lat<=-89.4&&a.lat>=-89.55&&a.lon>=221&&a.lon<=224})});U.setOnSiteChanged(a=>{yi(a)});U.setOnTimelineScrubbed(a=>{const[t,i,e]=vt(a.sun.direction_unit),s=8;Ye.position.set(t*s,i*s,e*s);const n=document.getElementById("telem-sun-az");n&&(n.textContent=`${a.sun.azimuth_deg.toFixed(1)}° / ${a.sun.elevation_deg.toFixed(1)}°`);const p=document.getElementById("utc-clock");p&&(p.textContent=a.timestamp_utc),Ss(a.timestamp_utc)});function xe(a,t=!0){yi(a);const i=at.find(e=>Math.abs(e.lat-a.latitudeDeg)<.05&&Math.abs(e.lon-a.longitudeDeg)<.05);ne&&ne.highlightSite(i?i.id:null),document.querySelectorAll(".cand-btn").forEach(e=>{e.classList.toggle("active",(i==null?void 0:i.id)===e.dataset.site)}),U&&U.setCoordinatesFromGlobe(a.latitudeDeg,a.longitudeDeg),t&&N&&Vs(a.latitudeDeg,a.longitudeDeg)}function yi(a){if(!N)return;if(!se){se=new me,se.name="TargetSiteMarker";const c=new Pe(.018,.024,32);c.rotateX(Math.PI/2);const d=new W({color:3718648,side:ye,transparent:!0,opacity:.95});se.add(new q(c,d));const r=new Le(.005,16,16),l=new W({color:16777215});se.add(new q(r,l));const m=new ue().setFromPoints([new E(0,0,0),new E(0,.07,0)]),u=new fe({color:3718648,transparent:!0,opacity:.9});se.add(new De(m,u)),N.add(se)}const t=Ie(a.latitudeDeg,a.longitudeDeg,we*1.002);se.position.copy(t);const i=t.clone().normalize();se.quaternion.setFromUnitVectors(new E(0,1,0),i);const e=document.getElementById("active-site-display");e&&(e.textContent=`${a.name} · ${a.designation}`);const s=document.getElementById("readout-coords"),n=document.getElementById("readout-elev"),p=document.getElementById("readout-pole-dist");if(s&&(s.textContent=K(a.latitudeDeg,a.longitudeDeg)),n&&(n.textContent=`${a.elevationM>=0?"+":""}${(a.elevationM/1e3).toFixed(2)} km`),p){const c=St(a.latitudeDeg);p.textContent=`${c.toFixed(1)} km to 90°S`}bt(a.latitudeDeg,a.longitudeDeg,`${a.name} · ${a.designation}`)}function Vs(a,t){N.updateMatrixWorld(!0);const e=Ie(a,t,we).clone().applyMatrix4(N.matrixWorld),s=e.clone().normalize(),n=e.clone().add(s.clone().multiplyScalar(.85));nt(n,e,1.2)}function Si(){if(Ge=!Ge,document.getElementById("btn-south-pole").classList.toggle("active",Ge),Ge){N.updateMatrixWorld(!0);const i=new E(0,-we,0).clone().applyMatrix4(N.matrixWorld),s=i.clone().normalize().clone().multiplyScalar(2.65);s.addScaledVector(new E(1,0,0),.15),s.addScaledVector(new E(0,0,1),.15),nt(s,i,1.3)}else nt(new E(0,.2,4),new E(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",Si);document.getElementById("btn-reset").addEventListener("click",()=>{var a;Ge=!1,(a=document.getElementById("btn-south-pole"))==null||a.classList.remove("active"),nt(new E(0,.2,4),new E(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{qe=!qe;const a=document.getElementById("btn-auto");a.textContent=qe?"⏸ Auto-Rotate":"▶ Auto-Rotate",a.classList.toggle("active",qe)});document.getElementById("btn-sun").addEventListener("click",()=>{Be=!Be;const a=document.getElementById("btn-sun");a.classList.toggle("active",Be),a.textContent=Be?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(a=>{a.addEventListener("click",()=>{const t=a.dataset.site,i=at.find(e=>e.id===t);i&&xe({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})})});const lt=document.getElementById("coords-modal");document.getElementById("btn-manual-coords").addEventListener("click",()=>{lt.style.display="flex"});document.getElementById("btn-close-coords-modal").addEventListener("click",()=>{lt.style.display="none"});document.getElementById("btn-cancel-manual-coords").addEventListener("click",()=>{lt.style.display="none"});const Ct=document.getElementById("manual-lat"),kt=document.getElementById("manual-lon"),Ke=document.getElementById("coords-error-msg"),Ys=document.getElementById("coords-preview-line");function wi(){const a=wt(Ct.value,kt.value);if(!a.valid)Ke.textContent=a.error||"Invalid coordinates.",Ke.style.display="block";else{Ke.style.display="none";const t=a.lat<=-80,i=St(a.lat);Ys.innerHTML=`Format: <strong>${K(a.lat,a.lon)}</strong><br />Region: <strong>${t?"South Polar Region (80°S-90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${i.toFixed(1)} km</strong>`}}Ct.addEventListener("input",wi);kt.addEventListener("input",wi);document.getElementById("btn-apply-manual-coords").addEventListener("click",()=>{const a=wt(Ct.value,kt.value);if(!a.valid){Ke.textContent=a.error||"Invalid coordinates.",Ke.style.display="block";return}lt.style.display="none",xe({name:"Manual Coordinate Target",designation:K(a.lat,a.lon),latitudeDeg:a.lat,longitudeDeg:a.lon,elevationM:0,isInsideSite01DEM:a.lat<=-89.4&&a.lat>=-89.55&&a.lon>=221&&a.lon<=224})});const ot=new si,rt=new A;let Ei=new A,xi=0,$t=!1,Tt=!1;Re.addEventListener("pointerdown",a=>{Ei.set(a.clientX,a.clientY),xi=performance.now(),$t=!1});Re.addEventListener("pointermove",a=>{Ei.distanceTo(new A(a.clientX,a.clientY))>5&&($t=!0),rt.x=a.clientX/window.innerWidth*2-1,rt.y=-(a.clientY/window.innerHeight)*2+1,Tt=!0});Re.addEventListener("pointerleave",()=>{Tt=!1,z&&(z.visible=!1)});Re.addEventListener("click",a=>{if($t||performance.now()-xi>350)return;if(ne){const i=ne.handleClick(a,J);if(i){xe({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM});return}}if(!X)return;ot.setFromCamera(rt,J);const t=ot.intersectObject(X);if(t.length>0){const i=t[0],e=X.worldToLocal(i.point.clone()),{latDeg:s,lonDeg:n}=mi(e),p=document.getElementById("readout-coords");p&&!he&&(p.textContent=K(s,n));let c=0;if(i.face&&Oe&&(c=Oe[i.face.a]??0),he={latDeg:s,lonDeg:n,elevKm:c},j){const u=Ie(s,n,we*1.002);j.position.copy(u);const h=u.clone().normalize();j.quaternion.setFromUnitVectors(new E(0,1,0),h),j.visible=!0}const d=document.getElementById("selection-confirm-toast"),r=document.getElementById("toast-coords-text"),l=document.getElementById("toast-elev-text");r.textContent=K(s,n);const m=St(s);l.textContent=`Elevation: ${c>=0?"+":""}${c.toFixed(2)} km · Distance to 90°S: ${m.toFixed(1)} km`,d.style.display="block"}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(he){const{latDeg:a,lonDeg:t,elevKm:i}=he;xe({name:"Custom Lunar Target",designation:K(a,t),latitudeDeg:a,longitudeDeg:t,elevationM:i*1e3})}document.getElementById("selection-confirm-toast").style.display="none",j&&(j.visible=!1),he=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",j&&(j.visible=!1),he=null});function Zs(){if(!Tt||!X||!z){z&&(z.visible=!1);return}ot.setFromCamera(rt,J);const a=ot.intersectObject(X);if(a.length>0){const t=a[0],i=X.worldToLocal(t.point.clone()),{latDeg:e,lonDeg:s}=mi(i),n=document.getElementById("readout-coords");n&&!he&&(n.textContent=K(e,s));const p=i.clone().normalize();if(z.position.copy(i.clone().multiplyScalar(1.0015)),z.quaternion.setFromUnitVectors(new E(0,1,0),p),z.visible=!0,t.face&&Oe){const c=Oe[t.face.a],d=document.getElementById("readout-elev");d&&!he&&(d.textContent=`${c>=0?"+":""}${c.toFixed(2)} km`)}}else z.visible=!1}window.addEventListener("keydown",a=>{var t,i,e;if(!(a.target instanceof HTMLInputElement||a.target instanceof HTMLTextAreaElement))switch(a.key.toLowerCase()){case" ":a.preventDefault(),(t=document.getElementById("btn-auto"))==null||t.click();break;case"p":a.preventDefault(),Si();break;case"r":a.preventDefault(),(i=document.getElementById("btn-reset"))==null||i.click();break;case"s":a.preventDefault(),(e=document.getElementById("btn-sun"))==null||e.click();break;case"m":a.preventDefault(),U==null||U.toggle();break;case"c":a.preventDefault(),V==null||V.toggle();break}});function Xs(){const a=window.innerWidth,t=window.innerHeight;J.aspect=a/t,J.updateProjectionMatrix(),Y.setSize(a,t),Ze.setSize(a,t),bi.resolution.set(a,t)}window.addEventListener("resize",Xs);xe({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100},!1);const ii=new as;function _i(){requestAnimationFrame(_i);const a=ii.getDelta(),t=ii.getElapsedTime();if(B.update(),Z){const e=performance.now()-Z.startTime,s=Math.min(1,e/Z.duration),n=s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2;J.position.lerpVectors(Z.startPos,Z.targetPos,n),B.target.lerpVectors(Z.startLook,Z.targetLook,n),B.update(),s>=1&&(Z=null)}ne&&ne.update(t);const i=!!(U!=null&&U.getIsOpen())||!!(V!=null&&V.getIsOpen());if(N&&qe&&!xt&&!Z&&!i&&(N.rotation.y+=.02*a),Be){it+=.12*a;const e=8;Ye.position.set(Math.cos(it)*e,Math.sin(it*.25)*2,Math.sin(it)*e)}Zs(),Ze.render()}_i();
