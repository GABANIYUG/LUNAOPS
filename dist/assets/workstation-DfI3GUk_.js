var Vi=Object.defineProperty;var Xi=(n,e,i)=>e in n?Vi(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i;var b=(n,e,i)=>Xi(n,typeof e!="symbol"?e+"":e,i);import{X as Ki,d as E,Y as Oe,Z as Re,_ as Qt,$ as ei,V as O,a0 as Zi,a1 as Ji,l as Ct,a2 as ui,G as ce,B as re,a3 as fe,g as ti,a4 as xe,v as Ue,r as X,o as Te,M as q,j as Fe,a5 as Qi,W as es,S as mi,A as ts,a as is,C as ss,b as as,i as ns,D as hi,E as os,R as rs,U as ls,c as cs,T as ds,e as ps,f as us,h as ms,z as hs,N as gs,K as gi,J as vi,n as vs,x as bs,a6 as fs,a7 as Ss}from"./UnrealBloomPass-9pu3Yq5J.js";const ii={type:"change"},wt={type:"start"},si={type:"end"},lt=new Zi,ai=new Ji,ys=Math.cos(70*Ct.DEG2RAD);class ws extends Ki{constructor(e,i){super(),this.object=e,this.domElement=i,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Oe.ROTATE,MIDDLE:Oe.DOLLY,RIGHT:Oe.PAN},this.touches={ONE:Re.ROTATE,TWO:Re.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(c){c.addEventListener("keydown",yt),this._domElementKeyEvents=c},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",yt),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(ii),t.update(),a=s.NONE},this.update=function(){const c=new E,S=new ei().setFromUnitVectors(e.up,new E(0,1,0)),_=S.clone().invert(),D=new E,F=new ei,ve=new E,Y=2*Math.PI;return function(Yi=null){const Zt=t.object.position;c.copy(Zt).sub(t.target),c.applyQuaternion(S),r.setFromVector3(c),t.autoRotate&&a===s.NONE&&he(ot(Yi)),t.enableDamping?(r.theta+=p.theta*t.dampingFactor,r.phi+=p.phi*t.dampingFactor):(r.theta+=p.theta,r.phi+=p.phi);let se=t.minAzimuthAngle,ae=t.maxAzimuthAngle;isFinite(se)&&isFinite(ae)&&(se<-Math.PI?se+=Y:se>Math.PI&&(se-=Y),ae<-Math.PI?ae+=Y:ae>Math.PI&&(ae-=Y),se<=ae?r.theta=Math.max(se,Math.min(ae,r.theta)):r.theta=r.theta>(se+ae)/2?Math.max(se,r.theta):Math.min(ae,r.theta)),r.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,r.phi)),r.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(l,t.dampingFactor):t.target.add(l),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor);let Xe=!1;if(t.zoomToCursor&&Ee||t.object.isOrthographicCamera)r.radius=f(r.radius);else{const ne=r.radius;r.radius=f(r.radius*o),Xe=ne!=r.radius}if(c.setFromSpherical(r),c.applyQuaternion(_),Zt.copy(t.target).add(c),t.object.lookAt(t.target),t.enableDamping===!0?(p.theta*=1-t.dampingFactor,p.phi*=1-t.dampingFactor,l.multiplyScalar(1-t.dampingFactor)):(p.set(0,0,0),l.set(0,0,0)),t.zoomToCursor&&Ee){let ne=null;if(t.object.isPerspectiveCamera){const Ke=c.length();ne=f(Ke*o);const rt=Ke-ne;t.object.position.addScaledVector(P,rt),t.object.updateMatrixWorld(),Xe=!!rt}else if(t.object.isOrthographicCamera){const Ke=new E(L.x,L.y,0);Ke.unproject(t.object);const rt=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),t.object.updateProjectionMatrix(),Xe=rt!==t.object.zoom;const Jt=new E(L.x,L.y,0);Jt.unproject(t.object),t.object.position.sub(Jt).add(Ke),t.object.updateMatrixWorld(),ne=c.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;ne!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(ne).add(t.object.position):(lt.origin.copy(t.object.position),lt.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(lt.direction))<ys?e.lookAt(t.target):(ai.setFromNormalAndCoplanarPoint(t.object.up,t.target),lt.intersectPlane(ai,t.target))))}else if(t.object.isOrthographicCamera){const ne=t.object.zoom;t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/o)),ne!==t.object.zoom&&(t.object.updateProjectionMatrix(),Xe=!0)}return o=1,Ee=!1,Xe||D.distanceToSquared(t.object.position)>d||8*(1-F.dot(t.object.quaternion))>d||ve.distanceToSquared(t.target)>d?(t.dispatchEvent(ii),D.copy(t.object.position),F.copy(t.object.quaternion),ve.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",Xt),t.domElement.removeEventListener("pointerdown",Gt),t.domElement.removeEventListener("pointercancel",Ve),t.domElement.removeEventListener("wheel",qt),t.domElement.removeEventListener("pointermove",St),t.domElement.removeEventListener("pointerup",Ve),t.domElement.getRootNode().removeEventListener("keydown",Wt,{capture:!0}),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",yt),t._domElementKeyEvents=null)};const t=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=s.NONE;const d=1e-6,r=new Qt,p=new Qt;let o=1;const l=new E,u=new O,m=new O,g=new O,h=new O,v=new O,y=new O,x=new O,M=new O,C=new O,P=new E,L=new O;let Ee=!1;const I=[],me={};let Ie=!1;function ot(c){return c!==null?2*Math.PI/60*t.autoRotateSpeed*c:2*Math.PI/60/60*t.autoRotateSpeed}function Me(c){const S=Math.abs(c*.01);return Math.pow(.95,t.zoomSpeed*S)}function he(c){p.theta-=c}function _e(c){p.phi-=c}const qe=function(){const c=new E;return function(_,D){c.setFromMatrixColumn(D,0),c.multiplyScalar(-_),l.add(c)}}(),We=function(){const c=new E;return function(_,D){t.screenSpacePanning===!0?c.setFromMatrixColumn(D,1):(c.setFromMatrixColumn(D,0),c.crossVectors(t.object.up,c)),c.multiplyScalar(_),l.add(c)}}(),ie=function(){const c=new E;return function(_,D){const F=t.domElement;if(t.object.isPerspectiveCamera){const ve=t.object.position;c.copy(ve).sub(t.target);let Y=c.length();Y*=Math.tan(t.object.fov/2*Math.PI/180),qe(2*_*Y/F.clientHeight,t.object.matrix),We(2*D*Y/F.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(qe(_*(t.object.right-t.object.left)/t.object.zoom/F.clientWidth,t.object.matrix),We(D*(t.object.top-t.object.bottom)/t.object.zoom/F.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function $e(c){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o/=c:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function Ye(c){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?o*=c:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function Pe(c,S){if(!t.zoomToCursor)return;Ee=!0;const _=t.domElement.getBoundingClientRect(),D=c-_.left,F=S-_.top,ve=_.width,Y=_.height;L.x=D/ve*2-1,L.y=-(F/Y)*2+1,P.set(L.x,L.y,1).unproject(t.object).sub(t.object.position).normalize()}function f(c){return Math.max(t.minDistance,Math.min(t.maxDistance,c))}function w(c){u.set(c.clientX,c.clientY)}function k(c){Pe(c.clientX,c.clientX),x.set(c.clientX,c.clientY)}function $(c){h.set(c.clientX,c.clientY)}function U(c){m.set(c.clientX,c.clientY),g.subVectors(m,u).multiplyScalar(t.rotateSpeed);const S=t.domElement;he(2*Math.PI*g.x/S.clientHeight),_e(2*Math.PI*g.y/S.clientHeight),u.copy(m),t.update()}function ge(c){M.set(c.clientX,c.clientY),C.subVectors(M,x),C.y>0?$e(Me(C.y)):C.y<0&&Ye(Me(C.y)),x.copy(M),t.update()}function bt(c){v.set(c.clientX,c.clientY),y.subVectors(v,h).multiplyScalar(t.panSpeed),ie(y.x,y.y),h.copy(v),t.update()}function ft(c){Pe(c.clientX,c.clientY),c.deltaY<0?Ye(Me(c.deltaY)):c.deltaY>0&&$e(Me(c.deltaY)),t.update()}function Oi(c){let S=!1;switch(c.code){case t.keys.UP:c.ctrlKey||c.metaKey||c.shiftKey?_e(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ie(0,t.keyPanSpeed),S=!0;break;case t.keys.BOTTOM:c.ctrlKey||c.metaKey||c.shiftKey?_e(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ie(0,-t.keyPanSpeed),S=!0;break;case t.keys.LEFT:c.ctrlKey||c.metaKey||c.shiftKey?he(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ie(t.keyPanSpeed,0),S=!0;break;case t.keys.RIGHT:c.ctrlKey||c.metaKey||c.shiftKey?he(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):ie(-t.keyPanSpeed,0),S=!0;break}S&&(c.preventDefault(),t.update())}function Ft(c){if(I.length===1)u.set(c.pageX,c.pageY);else{const S=Ae(c),_=.5*(c.pageX+S.x),D=.5*(c.pageY+S.y);u.set(_,D)}}function zt(c){if(I.length===1)h.set(c.pageX,c.pageY);else{const S=Ae(c),_=.5*(c.pageX+S.x),D=.5*(c.pageY+S.y);h.set(_,D)}}function Ut(c){const S=Ae(c),_=c.pageX-S.x,D=c.pageY-S.y,F=Math.sqrt(_*_+D*D);x.set(0,F)}function Ri(c){t.enableZoom&&Ut(c),t.enablePan&&zt(c)}function Ni(c){t.enableZoom&&Ut(c),t.enableRotate&&Ft(c)}function Ht(c){if(I.length==1)m.set(c.pageX,c.pageY);else{const _=Ae(c),D=.5*(c.pageX+_.x),F=.5*(c.pageY+_.y);m.set(D,F)}g.subVectors(m,u).multiplyScalar(t.rotateSpeed);const S=t.domElement;he(2*Math.PI*g.x/S.clientHeight),_e(2*Math.PI*g.y/S.clientHeight),u.copy(m)}function jt(c){if(I.length===1)v.set(c.pageX,c.pageY);else{const S=Ae(c),_=.5*(c.pageX+S.x),D=.5*(c.pageY+S.y);v.set(_,D)}y.subVectors(v,h).multiplyScalar(t.panSpeed),ie(y.x,y.y),h.copy(v)}function Bt(c){const S=Ae(c),_=c.pageX-S.x,D=c.pageY-S.y,F=Math.sqrt(_*_+D*D);M.set(0,F),C.set(0,Math.pow(M.y/x.y,t.zoomSpeed)),$e(C.y),x.copy(M);const ve=(c.pageX+S.x)*.5,Y=(c.pageY+S.y)*.5;Pe(ve,Y)}function Fi(c){t.enableZoom&&Bt(c),t.enablePan&&jt(c)}function zi(c){t.enableZoom&&Bt(c),t.enableRotate&&Ht(c)}function Gt(c){t.enabled!==!1&&(I.length===0&&(t.domElement.setPointerCapture(c.pointerId),t.domElement.addEventListener("pointermove",St),t.domElement.addEventListener("pointerup",Ve)),!Wi(c)&&(Gi(c),c.pointerType==="touch"?Vt(c):Ui(c)))}function St(c){t.enabled!==!1&&(c.pointerType==="touch"?Bi(c):Hi(c))}function Ve(c){switch(qi(c),I.length){case 0:t.domElement.releasePointerCapture(c.pointerId),t.domElement.removeEventListener("pointermove",St),t.domElement.removeEventListener("pointerup",Ve),t.dispatchEvent(si),a=s.NONE;break;case 1:const S=I[0],_=me[S];Vt({pointerId:S,pageX:_.x,pageY:_.y});break}}function Ui(c){let S;switch(c.button){case 0:S=t.mouseButtons.LEFT;break;case 1:S=t.mouseButtons.MIDDLE;break;case 2:S=t.mouseButtons.RIGHT;break;default:S=-1}switch(S){case Oe.DOLLY:if(t.enableZoom===!1)return;k(c),a=s.DOLLY;break;case Oe.ROTATE:if(c.ctrlKey||c.metaKey||c.shiftKey){if(t.enablePan===!1)return;$(c),a=s.PAN}else{if(t.enableRotate===!1)return;w(c),a=s.ROTATE}break;case Oe.PAN:if(c.ctrlKey||c.metaKey||c.shiftKey){if(t.enableRotate===!1)return;w(c),a=s.ROTATE}else{if(t.enablePan===!1)return;$(c),a=s.PAN}break;default:a=s.NONE}a!==s.NONE&&t.dispatchEvent(wt)}function Hi(c){switch(a){case s.ROTATE:if(t.enableRotate===!1)return;U(c);break;case s.DOLLY:if(t.enableZoom===!1)return;ge(c);break;case s.PAN:if(t.enablePan===!1)return;bt(c);break}}function qt(c){t.enabled===!1||t.enableZoom===!1||a!==s.NONE||(c.preventDefault(),t.dispatchEvent(wt),ft(ji(c)),t.dispatchEvent(si))}function ji(c){const S=c.deltaMode,_={clientX:c.clientX,clientY:c.clientY,deltaY:c.deltaY};switch(S){case 1:_.deltaY*=16;break;case 2:_.deltaY*=100;break}return c.ctrlKey&&!Ie&&(_.deltaY*=10),_}function Wt(c){c.key==="Control"&&(Ie=!0,t.domElement.getRootNode().addEventListener("keyup",Yt,{passive:!0,capture:!0}))}function Yt(c){c.key==="Control"&&(Ie=!1,t.domElement.getRootNode().removeEventListener("keyup",Yt,{passive:!0,capture:!0}))}function yt(c){t.enabled===!1||t.enablePan===!1||Oi(c)}function Vt(c){switch(Kt(c),I.length){case 1:switch(t.touches.ONE){case Re.ROTATE:if(t.enableRotate===!1)return;Ft(c),a=s.TOUCH_ROTATE;break;case Re.PAN:if(t.enablePan===!1)return;zt(c),a=s.TOUCH_PAN;break;default:a=s.NONE}break;case 2:switch(t.touches.TWO){case Re.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Ri(c),a=s.TOUCH_DOLLY_PAN;break;case Re.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Ni(c),a=s.TOUCH_DOLLY_ROTATE;break;default:a=s.NONE}break;default:a=s.NONE}a!==s.NONE&&t.dispatchEvent(wt)}function Bi(c){switch(Kt(c),a){case s.TOUCH_ROTATE:if(t.enableRotate===!1)return;Ht(c),t.update();break;case s.TOUCH_PAN:if(t.enablePan===!1)return;jt(c),t.update();break;case s.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Fi(c),t.update();break;case s.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;zi(c),t.update();break;default:a=s.NONE}}function Xt(c){t.enabled!==!1&&c.preventDefault()}function Gi(c){I.push(c.pointerId)}function qi(c){delete me[c.pointerId];for(let S=0;S<I.length;S++)if(I[S]==c.pointerId){I.splice(S,1);return}}function Wi(c){for(let S=0;S<I.length;S++)if(I[S]==c.pointerId)return!0;return!1}function Kt(c){let S=me[c.pointerId];S===void 0&&(S=new O,me[c.pointerId]=S),S.set(c.pageX,c.pageY)}function Ae(c){const S=c.pointerId===I[0]?I[1]:I[0];return me[S]}t.domElement.addEventListener("contextmenu",Xt),t.domElement.addEventListener("pointerdown",Gt),t.domElement.addEventListener("pointercancel",Ve),t.domElement.addEventListener("wheel",qt,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",Wt,{passive:!0,capture:!0}),this.update()}}const ue="http://127.0.0.1:8000";async function bi(){const n=await fetch(`${ue}/api/spice/health`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`Health check failed: HTTP ${n.status}`);return n.json()}async function fi(n){var i;const e=await fetch(`${ue}/api/spice/geometry`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Geometry request failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}async function Es(n){var i;const e=await fetch(`${ue}/api/horizon/profile`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon profile failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}async function Si(n){var i;const e=await fetch(`${ue}/api/horizon/visibility`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Horizon visibility failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}async function Ms(n){var i;const e=await fetch(`${ue}/api/mission/timeline`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Mission timeline calculation failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}async function _s(n){var i;const e=await fetch(`${ue}/api/mission/compare`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Candidate comparison failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}async function yi(n){var i;const e=await fetch(`${ue}/api/mission/landing-windows`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=`Landing windows scan failed: HTTP ${e.status}`;try{const s=await e.json();t+=` — ${((i=s==null?void 0:s.detail)==null?void 0:i.message)??JSON.stringify(s)}`}catch{}throw new Error(t)}return e.json()}function Mt(n){const[e,i,t]=n,s=e,a=t,d=i,r=Math.sqrt(s*s+a*a+d*d);return r<1e-10?[0,1,0]:[s/r,a/r,d/r]}const wi=1737400,xs=1737.4,T={minX:-19e3,maxX:-3e3,minY:-2e4,maxY:-4e3,pixelSizeM:5,fullWidthPx:3200,fullHeightPx:3200};function le(n,e,i=wi){const s=(n%360+360)%360*Math.PI/180,a=e*Math.PI/180,d=Math.PI/2+a,r=2*i*Math.tan(d/2),p=r*Math.sin(s),o=r*Math.cos(s);return{x:p,y:o}}function Tt(n,e,i=wi){const t=Math.hypot(n,e);if(t<1e-7)return{lonDeg:0,latDeg:-90};const s=2*Math.atan2(t,2*i),a=-Math.PI/2+s,r=(Math.atan2(n,e)*180/Math.PI+360)%360,p=a*180/Math.PI;return{lonDeg:r,latDeg:p}}function ut(n,e){if(e>-80)return!1;const{x:i,y:t}=le(n,e);return i>=T.minX&&i<=T.maxX&&t>=T.minY&&t<=T.maxY}function Cs(n,e){const i=n>=T.minX&&n<=T.maxX&&e>=T.minY&&e<=T.maxY,t=(n-T.minX)/T.pixelSizeM,s=(T.maxY-e)/T.pixelSizeM,a=t/T.fullWidthPx,d=s/T.fullHeightPx,r=Math.max(0,Math.min(511,Math.round(a*512))),p=Math.max(0,Math.min(511,Math.round(d*512)));return{pxFull:t,pyFull:s,px512:r,py512:p,isInside:i}}function Ts(n,e){const i=Math.max(0,Math.min(1,n/512)),t=Math.max(0,Math.min(1,e/512)),s=T.minX+i*(T.maxX-T.minX),a=T.maxY-t*(T.maxY-T.minY),{lonDeg:d,latDeg:r}=Tt(s,a);return{lonDeg:d,latDeg:r,x:s,y:a}}function Ce(n,e,i){const t=Math.max(-90,Math.min(90,n));if(Math.abs(t+90)<1e-7)return new E(0,-i,0);if(Math.abs(t-90)<1e-7)return new E(0,i,0);const s=(90-t)*(Math.PI/180),a=(e+180)*(Math.PI/180),d=-i*Math.cos(a)*Math.sin(s),r=i*Math.cos(s),p=i*Math.sin(a)*Math.sin(s);return new E(d,r,p)}function it(n){const e=(90-Math.max(-90,Math.min(90,n)))*(Math.PI/180);return(Math.PI-e)*xs}function Ei(n,e){const i=n.clone().normalize(),s=Math.asin(Math.max(-1,Math.min(1,i.y)))*180/Math.PI;if(s<=-89.9999)return{latDeg:-90,lonDeg:0};if(s>=89.9999)return{latDeg:90,lonDeg:0};let d=Math.atan2(-i.z,i.x)*180/Math.PI;return d<0&&(d+=360),{latDeg:s,lonDeg:d}}function kt(n,e){const i=typeof n=="number"?n:parseFloat(n),t=typeof e=="number"?e:parseFloat(e);if(isNaN(i)||isNaN(t))return{valid:!1,lat:0,lon:0,error:"Coordinates must be valid decimal numbers."};if(i<-90||i>90)return{valid:!1,lat:i,lon:t,error:"Latitude must be between -90.0° and +90.0°."};const s=(t%360+360)%360;return{valid:!0,lat:i,lon:s}}function j(n,e){if(Math.abs(n+90)<.001)return"90.000° S (True Lunar South Pole)";if(Math.abs(n-90)<.001)return"90.000° N (True Lunar North Pole)";const i=`${Math.abs(n).toFixed(3)}° ${n<0?"S":"N"}`,s=`${((e%360+360)%360).toFixed(3)}° E`;return`${i}, ${s}`}let Qe=null,Et=!1,R=null,de=!1,et="step_1h",He=null,pt=0;const je={lat:-89.463,lon:222.51,label:"Artemis Site 01 · Shackleton–de Gerlache Ridge"};async function _t(n,e,i,t){if(!R)return;const s=R.querySelector("#spice-lat"),a=R.querySelector("#spice-lon"),d=R.querySelector("#spice-time-input"),r=R.querySelector("#spice-site-note"),p=R.querySelector("#spice-window-card");if(s&&(s.value=n.toFixed(3)),a&&(a.value=e.toFixed(2)),r&&(r.textContent=i),R.querySelectorAll(".spice-preset-btn").forEach(o=>{const l=parseFloat(o.dataset.lat||"999"),u=parseFloat(o.dataset.lon||"999");Math.abs(l-n)<.05&&Math.abs(u-e)<.05?o.classList.add("active"):o.classList.remove("active")}),t){d&&(d.value=t),Se(R);return}p&&(p.style.display="block",p.innerHTML=`
      <div class="smw-scanning">
        <span class="smw-spinner"></span>
        <span>Scanning 90-day ephemerides for candidate mission windows…</span>
      </div>
    `);try{const u=await yi({start_date:"2026-10-01",end_date:"2026-12-31",latitude_deg:n,longitude_deg:e});ks(p,u,n,e);let m=u.summary.best_window_start;if(!m&&u.days.length>0){const g=u.days.filter(h=>h.is_safe_for_landing);g.length>0&&(m=g[0].date)}m&&d?d.value=`${m}T12:00:00Z`:d&&!d.value&&(d.value="2026-10-16T12:00:00Z")}catch(o){console.warn("[SPICE] Candidate window scan error",o),p&&(p.innerHTML=`
        <div class="smw-unavail">
          <div class="smw-unavail-title">ℹ Candidate Window Calculation Unavailable</div>
          <div class="smw-unavail-desc">Backend scan endpoint offline or outside ephemeris range. Manual epoch evaluation remains fully active.</div>
        </div>
      `),d&&!d.value&&(d.value="2026-10-16T12:00:00Z")}Se(R)}function ks(n,e,i,t){if(!n)return;const s=e.summary,a=ut(t,i),d=s.best_window_start,r=s.safe_days_count;let p=d,o=0;if(d&&e.days.length>0){const l=e.days.findIndex(u=>u.date===d);if(l!==-1){let u=l;for(;u<e.days.length&&e.days[u].is_safe_for_landing;)p=e.days[u].date,o++,u++}}if(o===0&&r>0&&(o=1),d&&r>0){const l=e.days.find(h=>h.date===d),u=l?l.sunlight.full_hours:12,m=l?l.earth_los.full_hours:24,g=l?l.safety_score:80;n.innerHTML=`
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
          <span class="smw-val">${d}T00:00Z</span>
        </div>
        <div class="smw-item">
          <span class="smw-label">WINDOW END</span>
          <span class="smw-val">${p||d}T23:59Z</span>
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
          <span class="smw-crit-desc">Direct-To-Earth (DTE) LOS ≥ 6.0 h/day (Calculated: ${m.toFixed(1)} h)</span>
        </div>
        <div class="smw-crit-row">
          <span class="smw-badge-crit ${a?"crit-met":"crit-uneval"}">${a?"MET":"UNEVALUABLE"}</span>
          <span class="smw-crit-desc">
            ${a?"Local DEM Horizon Clearance: Validated within 5m/px Site 01 DEM":"Local DEM Clearance: Outside 5m/px DEM footprint (Global LOLA only)"}
          </span>
        </div>
      </div>

      <div class="smw-footer">
        <span class="smw-index-pill">Heuristic Index: ${g.toFixed(1)} / 100</span>
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
    `}function Ds(n){if(!R)return;const e=R.querySelector("#spice-time-input");e&&(e.value=n,Se(R))}function Ls(n){var a,d,r,p,o,l,u,m,g;Qe=n;const e=document.createElement("div");e.id="spice-panel",e.innerHTML=Is(),document.body.appendChild(e),R=e,e.querySelector("#spice-fetch-btn").addEventListener("click",()=>Se(e)),e.querySelector("#spice-auto-btn").addEventListener("click",()=>As(e)),(a=e.querySelector("#spice-autotrack-mode"))==null||a.addEventListener("change",h=>{et=h.target.value,Dt(e)}),(d=e.querySelector("#spice-retry-btn"))==null||d.addEventListener("click",()=>xt(e,!0)),(r=e.querySelector("#spice-now-btn"))==null||r.addEventListener("click",()=>{be(e);const h=e.querySelector("#spice-time-input");h&&(h.value=new Date().toISOString().slice(0,19)+"Z",Se(e))}),(p=e.querySelector("#spice-epoch-artemis"))==null||p.addEventListener("click",()=>{be(e);const h=e.querySelector("#spice-time-input");h&&(h.value="2026-10-16T12:00:00Z",Se(e))}),(o=e.querySelector("#spice-step-back-24"))==null||o.addEventListener("click",()=>{be(e),ze(-24)}),(l=e.querySelector("#spice-step-back-1"))==null||l.addEventListener("click",()=>{be(e),ze(-1)}),(u=e.querySelector("#spice-step-fwd-1"))==null||u.addEventListener("click",()=>{be(e),ze(1)}),(m=e.querySelector("#spice-step-fwd-24"))==null||m.addEventListener("click",()=>{be(e),ze(24)}),e.querySelectorAll(".spice-preset-btn").forEach(h=>{h.addEventListener("click",()=>{const v=parseFloat(h.dataset.lat||"-90"),y=parseFloat(h.dataset.lon||"0"),x=h.dataset.label||"South Pole Site";_t(v,y,x),e.querySelectorAll(".spice-preset-btn").forEach(M=>M.classList.remove("active")),h.classList.add("active")})}),(g=e.querySelector("#spice-time-input"))==null||g.addEventListener("focus",()=>{be(e)});const i=e.querySelector(".spice-header"),t=e.querySelector(".spice-body");i.addEventListener("click",()=>{const h=t.style.display==="none";t.style.display=h?"":"none",i.querySelector(".spice-collapse-icon").textContent=h?"▼":"▶"});const s=e.querySelector("#spice-time-input");return s.value="2026-10-16T12:00:00Z",xt(e).then(()=>{_t(je.lat,je.lon,je.label,"2026-10-16T12:00:00Z")}),e}function ze(n){if(!R)return;const e=R.querySelector("#spice-time-input");if(e)try{const i=new Date(e.value);if(!isNaN(i.getTime())){const t=new Date(i.getTime()+n*3600*1e3);e.value=t.toISOString().slice(0,19)+"Z",Se(R)}}catch{}}function Is(){return`
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
             value="${je.lat}" min="-90" max="90" step="0.001" />
      <label class="spice-label-sm">Lon °</label>
      <input type="number" id="spice-lon" class="spice-input-sm"
             value="${je.lon}" min="-180" max="360" step="0.01" />
    </div>
    <div class="spice-site-note" id="spice-site-note">${je.label}</div>
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
`}async function xt(n,e=!1){const i=n.querySelector("#spice-status-dot"),t=n.querySelector("#spice-status-text"),s=n.querySelector("#spice-fetch-btn"),a=n.querySelector("#spice-retry-btn");e&&(t.textContent="Connecting to SPICE backend…",i.className="spice-status-dot");try{const d=await bi(),r=d.status==="ok";return i.className="spice-status-dot "+(r?"dot-ok":"dot-warn"),t.textContent=r?`SPICE Online · ${d.reference_frame}`:`Backend Degraded: ${d.error??"Kernel warning"}`,s.disabled=!r,a&&(a.style.display=r?"none":"inline-block"),r}catch{return i.className="spice-status-dot dot-err",t.textContent="Backend Offline (port 8000)",s.disabled=!0,a&&(a.style.display="inline-block"),!1}}async function Se(n){if(Et)return;Et=!0;const e=n.querySelector("#spice-loading"),i=n.querySelector("#spice-error-box"),t=n.querySelector("#spice-results");e.style.display="flex",i.style.display="none";try{const s=n.querySelector("#spice-time-input"),a=n.querySelector("#spice-lat"),d=n.querySelector("#spice-lon"),r=s.value.trim(),p=kt(a.value,d.value);if(!p.valid)throw new Error(p.error||"Invalid coordinates.");const o=await fi({utc_time:r,latitude_deg:p.lat,longitude_deg:p.lon,elevation_m:0});let l=null;try{l=await Si({latitude_deg:p.lat,longitude_deg:p.lon,elevation_m:0,instrument_height_m:2,sun_azimuth_deg:o.sun.azimuth_deg,sun_elevation_deg:o.sun.elevation_deg,sun_distance_km:o.sun.distance_km,earth_azimuth_deg:o.earth.azimuth_deg,earth_elevation_deg:o.earth.elevation_deg,earth_distance_km:o.earth.distance_km})}catch{l=null}$s(n,o,l),Ps(o),t.style.display="block",pt=0}catch(s){const a=s instanceof Error?s.message:String(s);i.textContent=`Error: ${a}`,i.style.display="block",await xt(n),de&&(pt++,pt>=2&&be(n,"Auto-Track Paused: Network/SPICE error"))}finally{e.style.display="none",Et=!1}}function $s(n,e,i){const t=v=>v.toFixed(1),s=v=>v>1e6?`${(v/1495978707e-1).toFixed(4)} AU (${(v/1e6).toFixed(2)}M km)`:`${v.toLocaleString(void 0,{maximumFractionDigits:0})} km`,a=ut(e.site.longitude_deg,e.site.latitude_deg);G("res-sun-dist",s(e.sun.distance_km)),G("res-sun-az",`${t(e.sun.azimuth_deg)}°`);const d=e.sun.elevation_deg;oi("res-sun-geom-el",`${d>=0?"+":""}${t(d)}°`,d>=0?"spice-val-positive":"spice-val-negative");const r=document.getElementById("res-sun-obs-status"),p=document.getElementById("res-sun-terrain-el"),o=document.getElementById("res-sun-dem-note");if(i&&i.sun){const v=i.sun;if(v.terrain_horizon_elevation_deg!==null?G("res-sun-terrain-el",`${t(v.terrain_horizon_elevation_deg)}°`):G("res-sun-terrain-el","N/A (Outside DEM)"),r)switch(v.visibility_status){case"no_obstruction_detected_within_coverage":r.textContent="No obstruction detected within coverage",r.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":r.textContent="Blocked by local terrain (Shadow)",r.className="spice-pill pill-err";break;case"blocked_by_lunar_body":r.textContent="Below geometric horizon (Lunar Body)",r.className="spice-pill pill-err";break;case"near_horizon_grazing":r.textContent="Near-horizon grazing light",r.className="spice-pill pill-warn";break;default:r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-warn"}}else p&&(p.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),r&&(d<0?(r.textContent="Below geometric horizon",r.className="spice-pill pill-err"):a?(r.textContent="Above geometric horizon (DEM Ray uncalculated)",r.className="spice-pill pill-warn"):(r.textContent="Unknown or insufficient terrain coverage",r.className="spice-pill pill-neutral"));o&&(o.textContent=a?"DEM Coverage: Validated within 5 m/px Site 01 DEM (16×16 km tile).":"DEM Coverage: Outside Site 01 DEM. Global LOLA ~60 m/px altimetry only."),G("res-earth-dist",`${e.earth.distance_km.toLocaleString(void 0,{maximumFractionDigits:0})} km`),G("res-earth-az",`${t(e.earth.azimuth_deg)}°`);const l=e.earth.elevation_deg;oi("res-earth-geom-el",`${l>=0?"+":""}${t(l)}°`,l>=0?"spice-val-positive":"spice-val-negative");const u=document.getElementById("res-earth-obs-status"),m=document.getElementById("res-earth-terrain-el"),g=document.getElementById("res-earth-los-status");if(i&&i.earth){const v=i.earth;if(v.terrain_horizon_elevation_deg!==null?G("res-earth-terrain-el",`${t(v.terrain_horizon_elevation_deg)}°`):G("res-earth-terrain-el","N/A (Outside DEM)"),u)switch(v.visibility_status){case"no_obstruction_detected_within_coverage":u.textContent="No obstruction detected within coverage",u.className="spice-pill pill-ok";break;case"blocked_by_local_terrain":u.textContent="Blocked by local terrain",u.className="spice-pill pill-err";break;case"blocked_by_lunar_body":u.textContent="Below geometric horizon (Lunar Body)",u.className="spice-pill pill-err";break;default:u.textContent="Unknown or insufficient terrain coverage",u.className="spice-pill pill-warn"}if(g){const y=(v.visibility_status==="no_obstruction_detected_within_coverage"||v.visibility_status==="near_horizon_grazing")&&l>0;g.textContent=y?`Potential Line-of-Sight Active (${t(v.angular_clearance_deg??l)}° clearance)`:"Direct Line-of-Sight Obstructed",g.className=`spice-los-badge ${y?"los-active":"los-blocked"}`}}else if(m&&(m.textContent=a?"Calculation unavailable":"Unevaluable (Outside DEM)"),u&&(l<0?(u.textContent="Below geometric horizon",u.className="spice-pill pill-err"):(u.textContent="Above geometric horizon",u.className="spice-pill pill-ok")),g){const v=l>0;g.textContent=v?`Potential Geometric LOS Active (+${t(l)}°)`:"Direct Line-of-Sight Occluded",g.className=`spice-los-badge ${v?"los-active":"los-blocked"}`}G("res-frame",e.reference_frame),G("res-aberration",e.aberration_correction),G("res-et-seconds",`${e.ephemeris_time_s.toFixed(3)} s`),G("res-sun-vec",e.sun.direction_unit.map(v=>v.toFixed(4)).join(", ")),G("res-earth-vec",e.earth.direction_unit.map(v=>v.toFixed(4)).join(", "));const h=n.querySelector("#spice-scene-note");h.style.display=Qe?"block":"none"}function Ps(n){if(!Qe)return;const[e,i,t]=Mt(n.sun.direction_unit),s=8;Qe.sunLight.position.set(e*s,i*s,t*s);const[a,d,r]=Mt(n.earth.direction_unit);Qe.earthshineLight.position.set(-a*s,-d*s,-r*s)}function As(n){de=!de,de?Os(n):Mi(n)}function Os(n){de=!0,pt=0,Dt(n),He!==null&&clearInterval(He),ni(n),He=setInterval(()=>{de&&ni(n)},2e3)}function ni(n){const e=n.querySelector("#spice-time-input");if(e){if(et==="realtime")e.value=new Date().toISOString().slice(0,19)+"Z";else if(et==="step_1h"){ze(1);return}else if(et==="step_24h"){ze(24);return}Se(n)}}function Mi(n){de=!1,He!==null&&(clearInterval(He),He=null),Dt(n)}function be(n,e){if(!de)return;Mi(n);const i=n.querySelector("#autotrack-status-text");i&&(i.textContent=e||"Standby (User edit paused track)")}function Dt(n){const e=n.querySelector("#spice-auto-btn"),i=n.querySelector("#autotrack-dot"),t=n.querySelector("#autotrack-status-text");if(de){e.classList.add("active"),e.textContent="Auto-Track: ACTIVE ●",i.className="autotrack-dot dot-active";const s={step_1h:"Advancing (+1h / 2s)",step_24h:"Advancing (+24h / 2s)",realtime:"Tracking Real-Time UTC"};t.textContent=s[et]||"Active"}else e.classList.remove("active"),e.textContent="Auto-Track: OFF",i.className="autotrack-dot",t.textContent="Standby (Epoch Static)"}function G(n,e){const i=document.getElementById(n);i&&(i.textContent=e)}function oi(n,e,i){const t=document.getElementById(n);t&&(t.textContent=e,t.className=`sm-value ${i}`)}const V=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,description:"High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM (NASA LOLA Site 01)",coverageType:"High-Resolution Regional DEM"},{id:"south-pole",name:"Lunar South Pole",designation:`Geographic 90°00'00" S Pole`,lat:-90,lon:0,elevationM:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton Crater. Geodetic reference benchmark.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry",isGeodeticDatum:!0},{id:"shackleton-rim",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elevationM:1450,description:"Elevated crater rim bordering permanently shadowed regions (PSR) with high water-ice deposition probability.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"malapert",name:"Malapert Mountain",designation:"Malapert Peak Massif (Artemis Candidate)",lat:-86.04,lon:2.7,elevationM:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and continuous Direct-To-Earth comms.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"haworth-rim",name:"Haworth Crater Rim",designation:"Haworth Crater Artemis Candidate",lat:-87.4,lon:355,elevationM:1200,description:"Rim region flanking deep cold traps with potential volatile concentrations.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"de-gerlache-rim",name:"de Gerlache Crater Rim",designation:"de Gerlache Rim Artemis Candidate",lat:-88.5,lon:271,elevationM:1600,description:"Crater rim massif offering favorable low-elevation sun geometry and line-of-sight to Site 01.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"},{id:"nobile-rim-1",name:"Nobile Crater Rim 1",designation:"VIPER / Artemis Candidate",lat:-85.2,lon:35.8,elevationM:3200,description:"Extensive highland plateau surveyed for robotic and crewed polar surface mobility.",isInsideSite01DEM:!1,terrainResolution:"Global LOLA Altimetry (~60 m/px)",coverageType:"Global Altimetry"}];class Rs{constructor(e){b(this,"group");b(this,"animatedElements",[]);b(this,"interactiveMarkers",[]);b(this,"siteMarkerGroups",new Map);b(this,"raycaster",new ui);b(this,"mouse",new O);b(this,"onSelectSiteCallback");b(this,"disposables",[]);this.group=new ce,this.group.name="SouthPoleOverlay",this.createPolarGrid(e),this.createDEMFootprint(e),this.createSouthPoleBeacon(e),this.createLandingSites(e)}setOnSelectSite(e){this.onSelectSiteCallback=e}getInteractiveObjects(){return this.interactiveMarkers}highlightSite(e){this.siteMarkerGroups.forEach((i,t)=>{const s=t===e,a=i.getObjectByName("TargetRing"),d=i.getObjectByName("BeaconLine"),r=i.getObjectByName("PinHead");if(a){const p=a.material;p.color.setHex(s?3718648:t==="site-01"?959977:6583435),p.opacity=s?.95:.6,a.scale.setScalar(s?1.3:1)}if(d){const p=d.material;p.color.setHex(s?3718648:t==="site-01"?959977:6583435),p.opacity=s?.95:.5}r&&r.material.color.setHex(s?16777215:t==="site-01"?3718648:9741240)})}createPolarGrid(e){const i=new ce;i.name="PolarReferenceGrid",[{lat:-80,color:3718648,opacity:.35,segments:180},{lat:-85,color:165063,opacity:.4,segments:180},{lat:-88,color:223649,opacity:.3,segments:120}].forEach(({lat:a,color:d,opacity:r,segments:p})=>{const o=[],l=e*1.0015;for(let h=0;h<=p;h++){const v=h/p*360;o.push(Ce(a,v,l))}const u=new re().setFromPoints(o),m=new fe({color:d,transparent:!0,opacity:r,blending:ti}),g=new xe(u,m);i.add(g),this.disposables.push(u,m)}),[{lon:0,color:3718648,opacity:.55,name:"Meridian_0_EarthFacing"},{lon:90,color:165063,opacity:.35,name:"Meridian_90E"},{lon:180,color:165063,opacity:.35,name:"Meridian_180_FarSide"},{lon:270,color:165063,opacity:.35,name:"Meridian_270E"}].forEach(({lon:a,color:d,opacity:r,name:p})=>{const o=[],l=e*1.0015,u=40;for(let v=0;v<=u;v++){const y=-80-10*(v/u);o.push(Ce(y,a,l))}const m=new re().setFromPoints(o),g=new fe({color:d,transparent:!0,opacity:r,blending:ti}),h=new xe(m,g);h.name=p,i.add(h),this.disposables.push(m,g)}),this.group.add(i)}createDEMFootprint(e){const i=new ce;i.name="Site01DEMFootprint";const t=e*1.002,{minX:s,maxX:a,minY:d,maxY:r}=T,p=[],o=16;for(let h=0;h<=o;h++)p.push({x:s+(a-s)*(h/o),y:r});for(let h=0;h<=o;h++)p.push({x:a,y:r+(d-r)*(h/o)});for(let h=0;h<=o;h++)p.push({x:a+(s-a)*(h/o),y:d});for(let h=0;h<=o;h++)p.push({x:s,y:d+(r-d)*(h/o)});const l=p.map(h=>{const{lonDeg:v,latDeg:y}=Tt(h.x,h.y);return Ce(y,v,t)}),u=new re().setFromPoints(l),m=new fe({color:3718648,transparent:!0,opacity:.75,linewidth:1.5}),g=new xe(u,m);i.add(g),this.disposables.push(u,m),this.group.add(i)}createSouthPoleBeacon(e){const i=new ce;i.name="TrueSouthPoleMarker",i.position.set(0,-e,0);const t=new Ue(.018,.022,48);t.rotateX(-Math.PI/2);const s=new X({color:16096779,side:Te,transparent:!0,opacity:.85}),a=new q(t,s);a.name="PoleReticleRing",i.add(a),this.animatedElements.push({object:a,baseScale:1,pulseSpeed:2}),this.disposables.push(t,s);const d=new Ue(.009,.011,32);d.rotateX(-Math.PI/2);const r=new X({color:16777215,side:Te,transparent:!0,opacity:.9}),p=new q(d,r);i.add(p),this.disposables.push(d,r);const o=new Fe(.004,16,16),l=new X({color:16777215}),u=new q(o,l);i.add(u),this.disposables.push(o,l);const m=[new E(-.035,0,0),new E(.035,0,0),new E(0,0,-.035),new E(0,0,.035)],g=new re().setFromPoints(m),h=new Qi(g,new fe({color:16096779,transparent:!0,opacity:.75}));i.add(h),this.disposables.push(g,h.material);const v=new re().setFromPoints([new E(0,0,0),new E(0,-.18,0)]),y=new fe({color:16096779,transparent:!0,opacity:.8}),x=new xe(v,y);i.add(x),this.disposables.push(v,y);const M=new Fe(.06,12,12),C=new X({visible:!1}),P=new q(M,C);P.userData={site:V.find(L=>L.id==="south-pole")},i.add(P),this.interactiveMarkers.push(P),this.disposables.push(M,C),this.siteMarkerGroups.set("south-pole",i),this.group.add(i)}createLandingSites(e){V.forEach(i=>{if(i.id==="south-pole")return;const t=i.id==="site-01",s=new ce;s.name=`SiteMarker_${i.id}`;const a=Ce(i.lat,i.lon,e*1.002);s.position.copy(a);const d=a.clone().normalize();s.quaternion.setFromUnitVectors(new E(0,1,0),d);const r=t?3718648:165063,p=t?.024:.016,o=new Ue(p*.8,p,32);o.rotateX(Math.PI/2);const l=new X({color:r,side:Te,transparent:!0,opacity:t?.9:.65}),u=new q(o,l);u.name="TargetRing",s.add(u),this.animatedElements.push({object:u,baseScale:1,pulseSpeed:t?2.5:1.5}),this.disposables.push(o,l);const m=t?.075:.045,g=new re().setFromPoints([new E(0,0,0),new E(0,m,0)]),h=new fe({color:r,transparent:!0,opacity:.75}),v=new xe(g,h);v.name="BeaconLine",s.add(v),this.disposables.push(g,h);const y=new Fe(t?.007:.005,16,16),x=new X({color:t?16777215:9741240}),M=new q(y,x);M.name="PinHead",M.position.y=m,s.add(M),this.disposables.push(y,x);const C=new Fe(.045,8,8),P=new X({visible:!1}),L=new q(C,P);L.position.y=m*.5,L.userData={site:i},s.add(L),this.interactiveMarkers.push(L),this.disposables.push(C,P),this.siteMarkerGroups.set(i.id,s),this.group.add(s)})}update(e){this.animatedElements.forEach(({object:i,baseScale:t=1,pulseSpeed:s=2})=>{const a=t*(1+.08*Math.sin(e*s));i.scale.set(a,a,a)})}handleClick(e,i){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,i);const t=this.raycaster.intersectObjects(this.interactiveMarkers,!1);if(t.length>0){const s=t[0].object.userData.site;if(s)return this.highlightSite(s.id),this.onSelectSiteCallback&&this.onSelectSiteCallback(s),s}return null}dispose(){this.disposables.forEach(e=>{try{e.dispose()}catch{}}),this.disposables=[]}}class Ns{constructor(){b(this,"container");b(this,"canvas");b(this,"ctx");b(this,"tooltipEl");b(this,"isVisible",!1);b(this,"selectedSiteId","site-01");b(this,"hoveredSite",null);b(this,"customSelection",null);b(this,"onSelectCallback");b(this,"MAX_RADIUS_M",304028);b(this,"mapWidth",480);b(this,"mapHeight",480);b(this,"centerX",240);b(this,"centerY",240);b(this,"scalePxPerM",220/304028);b(this,"terrainImage",null);b(this,"isTerrainImageLoaded",!1);this.container=document.createElement("div"),this.container.id="south-pole-explorer-panel",this.container.className="south-pole-explorer hidden",this.container.innerHTML=this.buildHTML(),document.body.appendChild(this.container),this.canvas=this.container.querySelector("#polar-map-canvas"),this.ctx=this.canvas.getContext("2d"),this.tooltipEl=this.container.querySelector("#polar-map-tooltip"),this.resizeCanvas(),this.loadBackdrop(),this.attachEvents()}setOnSelect(e){this.onSelectCallback=e}open(){this.isVisible=!0,this.container.classList.remove("hidden"),this.resizeCanvas(),this.draw()}close(){this.isVisible=!1,this.container.classList.add("hidden")}toggle(){return this.isVisible?this.close():this.open(),this.isVisible}getIsOpen(){return this.isVisible}setSelectedSite(e,i,t){e&&V.some(s=>s.id===e)?(this.selectedSiteId=e,this.customSelection=null):i!==void 0&&t!==void 0&&(this.selectedSiteId="custom",this.customSelection={lat:i,lon:t,elevM:0,isInsideDEM:ut(t,i)}),this.isVisible&&this.draw()}resizeCanvas(){const e=Math.min(520,Math.max(380,window.innerWidth>900?460:360));this.mapWidth=e,this.mapHeight=e,this.canvas.width=e*window.devicePixelRatio,this.canvas.height=e*window.devicePixelRatio,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.centerX=e/2,this.centerY=e/2,this.scalePxPerM=e*.44/this.MAX_RADIUS_M}loadBackdrop(){const e=new Image;e.crossOrigin="anonymous",e.src="/generated/site01_elev_norm.png",e.onload=()=>{this.terrainImage=e,this.isTerrainImageLoaded=!0,this.isVisible&&this.draw()},e.onerror=()=>{this.isTerrainImageLoaded=!1}}buildHTML(){return`
<div class="spe-header">
  <div class="spe-title-row">
    <span class="spe-dot"></span>
    <span class="spe-title">SOUTH POLE EXPLORER</span>
    <span class="spe-badge">USGS POLAR STEREO · 80°S–90°S</span>
  </div>
  <button type="button" class="spe-close-btn" id="spe-close-btn" title="Close South Pole Explorer">✕</button>
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

    <div class="spe-actions">
      <button type="button" id="spe-btn-apply" class="spe-btn spe-btn-primary">Set Active Target & Calculate ⌖</button>
      <button type="button" id="spe-btn-recenter" class="spe-btn spe-btn-secondary">Recenter 3D View</button>
    </div>
  </div>
</div>
`}attachEvents(){var e,i,t;(e=this.container.querySelector("#spe-close-btn"))==null||e.addEventListener("click",()=>this.close()),this.canvas.addEventListener("mousemove",s=>this.handleMouseMove(s)),this.canvas.addEventListener("mouseleave",()=>{this.hoveredSite=null,this.tooltipEl.classList.add("hidden"),this.draw()}),this.canvas.addEventListener("click",s=>this.handleClick(s)),(i=this.container.querySelector("#spe-btn-apply"))==null||i.addEventListener("click",()=>{this.applyCurrentSelection()}),(t=this.container.querySelector("#spe-btn-recenter"))==null||t.addEventListener("click",()=>{this.applyCurrentSelection()}),window.addEventListener("resize",()=>{this.isVisible&&(this.resizeCanvas(),this.draw())})}projectMetersToCanvas(e,i){return{cx:this.centerX+e*this.scalePxPerM,cy:this.centerY-i*this.scalePxPerM}}unprojectCanvasToMeters(e,i){return{x:(e-this.centerX)/this.scalePxPerM,y:(this.centerY-i)/this.scalePxPerM}}draw(){const e=this.ctx,i=this.mapWidth,t=this.mapHeight;e.clearRect(0,0,i,t),e.fillStyle="#060a12",e.fillRect(0,0,i,t);const s=this.MAX_RADIUS_M*this.scalePxPerM;e.save(),e.beginPath(),e.arc(this.centerX,this.centerY,s,0,2*Math.PI),e.fillStyle="#0b111e",e.fill(),e.clip(),this.drawTerrainRelief(e,s),this.drawSite01DEMBoundary(e),e.restore(),this.drawPolarGrid(e,s),this.drawScaleAndOrientation(e),this.drawTrueSouthPole(e),this.drawCandidateSites(e),this.customSelection&&this.drawCustomSelectionMarker(e),this.updateInfoCard()}drawTerrainRelief(e,i){if(this.isTerrainImageLoaded&&this.terrainImage){e.save(),e.globalAlpha=.55;const t=i*2.1;e.drawImage(this.terrainImage,this.centerX-t/2,this.centerY-t/2,t,t),e.restore()}else{const t=e.createRadialGradient(this.centerX,this.centerY,10,this.centerX,this.centerY,i);t.addColorStop(0,"#151d2c"),t.addColorStop(.4,"#101726"),t.addColorStop(.85,"#0c121e"),t.addColorStop(1,"#080d16"),e.fillStyle=t,e.fillRect(0,0,this.mapWidth,this.mapHeight)}this.drawCraterFeatures(e)}drawCraterFeatures(e){[{name:"Shackleton",lon:0,lat:-89.65,radiusKm:10.5,depth:"#070a12",rim:"#334155"},{name:"de Gerlache",lon:271,lat:-88.5,radiusKm:16,depth:"#080d16",rim:"#2d3748"},{name:"Haworth",lon:355,lat:-87.4,radiusKm:17.5,depth:"#080d16",rim:"#2d3748"},{name:"Faustini",lon:84,lat:-87.3,radiusKm:19.5,depth:"#080d16",rim:"#2d3748"},{name:"Shoemaker",lon:45,lat:-88.1,radiusKm:25,depth:"#080d16",rim:"#2d3748"},{name:"Amundsen",lon:83,lat:-84.3,radiusKm:52,depth:"#070c14",rim:"#243044"},{name:"Malapert",lon:2.7,lat:-86.04,radiusKm:34,depth:"#090e18",rim:"#3b4d66"}].forEach(t=>{const{x:s,y:a}=le(t.lon,t.lat),{cx:d,cy:r}=this.projectMetersToCanvas(s,a),p=t.radiusKm*1e3*this.scalePxPerM;e.beginPath(),e.arc(d,r,p,0,2*Math.PI),e.fillStyle=t.depth,e.fill(),e.strokeStyle=t.rim,e.lineWidth=1.2,e.stroke(),p>14&&(e.fillStyle="rgba(148, 163, 184, 0.45)",e.font='8px "Inter", -apple-system, sans-serif',e.textAlign="center",e.fillText(t.name,d,r+p+9))})}drawSite01DEMBoundary(e){const i=this.projectMetersToCanvas(T.minX,T.maxY),t=this.projectMetersToCanvas(T.maxX,T.maxY),s=this.projectMetersToCanvas(T.maxX,T.minY),a=this.projectMetersToCanvas(T.minX,T.minY);e.save(),e.beginPath(),e.moveTo(i.cx,i.cy),e.lineTo(t.cx,t.cy),e.lineTo(s.cx,s.cy),e.lineTo(a.cx,a.cy),e.closePath(),e.fillStyle="rgba(56, 189, 248, 0.08)",e.fill(),e.strokeStyle="rgba(56, 189, 248, 0.65)",e.lineWidth=1.4,e.setLineDash([4,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#38bdf8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("SITE 01 DEM [5 m/px]",i.cx+4,i.cy+11),e.restore()}drawPolarGrid(e,i){[{lat:-80,label:"80°S (Artemis Study Limit · 304 km)",color:"rgba(56, 189, 248, 0.35)",dash:[]},{lat:-85,label:"85°S (152 km)",color:"rgba(56, 189, 248, 0.25)",dash:[3,3]},{lat:-88,label:"88°S (61 km)",color:"rgba(56, 189, 248, 0.25)",dash:[2,2]}].forEach(({lat:a,label:d,color:r,dash:p})=>{const{y:o}=le(0,a),l=Math.abs(o)*this.scalePxPerM;e.beginPath(),e.arc(this.centerX,this.centerY,l,0,2*Math.PI),e.strokeStyle=r,e.lineWidth=1,e.setLineDash(p),e.stroke(),e.setLineDash([]),e.fillStyle="rgba(148, 163, 184, 0.6)",e.font='8px "JetBrains Mono", monospace',e.textAlign="right",e.fillText(d,this.centerX-l+4,this.centerY-4)}),[{angleRad:-Math.PI/2,label:"0° PRIME (TO EARTH)",align:"center",textBaseline:"bottom"},{angleRad:0,label:"90°E (EAST LIMB)",align:"left",textBaseline:"middle"},{angleRad:Math.PI/2,label:"180° (FAR SIDE)",align:"center",textBaseline:"top"},{angleRad:Math.PI,label:"270°E (WEST LIMB)",align:"right",textBaseline:"middle"}].forEach(a=>{const d=this.centerX+Math.cos(a.angleRad)*i,r=this.centerY+Math.sin(a.angleRad)*i;e.beginPath(),e.moveTo(this.centerX,this.centerY),e.lineTo(d,r),e.strokeStyle="rgba(148, 163, 184, 0.18)",e.lineWidth=1,e.stroke();const p=this.centerX+Math.cos(a.angleRad)*(i+6),o=this.centerY+Math.sin(a.angleRad)*(i+6);e.fillStyle="#94a3b8",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign=a.align,e.textBaseline=a.textBaseline,e.fillText(a.label,p,o)})}drawScaleAndOrientation(e){const t=1e5*this.scalePxPerM,s=24,a=this.mapHeight-24;e.strokeStyle="#94a3b8",e.lineWidth=1.5,e.beginPath(),e.moveTo(s,a),e.lineTo(s+t,a),e.moveTo(s,a-4),e.lineTo(s,a+4),e.moveTo(s+t/2,a-2),e.lineTo(s+t/2,a+2),e.moveTo(s+t,a-4),e.lineTo(s+t,a+4),e.stroke(),e.fillStyle="#94a3b8",e.font='8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("0",s-2,a-7),e.textAlign="center",e.fillText("50 km",s+t/2,a-7),e.textAlign="right",e.fillText("100 km",s+t,a-7);const d=this.mapWidth-36,r=36;e.strokeStyle="rgba(56, 189, 248, 0.4)",e.lineWidth=1,e.beginPath(),e.arc(d,r,14,0,2*Math.PI),e.stroke(),e.fillStyle="#38bdf8",e.beginPath(),e.moveTo(d,r-12),e.lineTo(d-4,r+2),e.lineTo(d+4,r+2),e.closePath(),e.fill(),e.fillStyle="#cbd5e1",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="center",e.fillText("N (0°)",d,r+12)}drawTrueSouthPole(e){const{cx:i,cy:t}=this.projectMetersToCanvas(0,0);e.strokeStyle="#f59e0b",e.lineWidth=1.5,e.beginPath(),e.arc(i,t,7,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(i-10,t),e.lineTo(i+10,t),e.moveTo(i,t-10),e.lineTo(i,t+10),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i,t,2,0,2*Math.PI),e.fill(),e.fillStyle="#f59e0b",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("TRUE 90°S POLE",i+12,t-4),e.fillStyle="rgba(245, 158, 11, 0.7)",e.font='7px "Inter", sans-serif',e.fillText("Geodetic Datum",i+12,t+6)}drawCandidateSites(e){const t=V.filter(s=>s.id!=="south-pole").map(s=>{var g;const{x:a,y:d}=le(s.lon,s.lat),{cx:r,cy:p}=this.projectMetersToCanvas(a,d),o=s.id===this.selectedSiteId,l=((g=this.hoveredSite)==null?void 0:g.id)===s.id,u=r>=this.centerX?32:-32,m=p>=this.centerY?20:-20;return{site:s,cx:r,cy:p,lblX:r+u,lblY:p+m,isSelected:o,isHovered:l}});for(let s=0;s<t.length;s++)for(let a=s+1;a<t.length;a++){const d=t[s],r=t[a],p=Math.abs(d.lblY-r.lblY),o=Math.abs(d.lblX-r.lblX);p<18&&o<90&&(r.lblY+=r.lblY>=d.lblY?16:-16)}t.forEach(({site:s,cx:a,cy:d,lblX:r,lblY:p,isSelected:o,isHovered:l})=>{const u=o?"#38bdf8":l?"#67e8f9":"#94a3b8",m=s.id==="site-01";e.save(),e.strokeStyle=o?"rgba(56, 189, 248, 0.85)":"rgba(148, 163, 184, 0.4)",e.lineWidth=o?1.5:1,e.setLineDash(o?[]:[2,2]),e.beginPath(),e.moveTo(a,d);const g=(a+r)/2;e.lineTo(g,d),e.lineTo(r,p),e.stroke(),e.setLineDash([]),e.restore(),e.save(),e.beginPath();const h=o?6.5:m?5.5:4.5;e.arc(a,d,h,0,2*Math.PI),e.fillStyle=o?"rgba(56, 189, 248, 0.25)":"rgba(15, 23, 42, 0.6)",e.fill(),e.strokeStyle=u,e.lineWidth=o?2:1.2,e.stroke(),e.beginPath(),e.arc(a,d,o?2.5:1.8,0,2*Math.PI),e.fillStyle=o?"#ffffff":u,e.fill(),e.restore(),e.save(),e.font=o?'bold 9px "JetBrains Mono", monospace':'8px "Inter", sans-serif';const y=e.measureText(s.name).width+12,x=14,M=r>a?r:r-y,C=p-8;e.fillStyle=o?"rgba(14, 165, 233, 0.22)":"rgba(15, 23, 42, 0.85)",e.strokeStyle=o?"#38bdf8":"rgba(148, 163, 184, 0.3)",e.lineWidth=o?1.2:.8,e.beginPath(),e.roundRect(M,C,y,x,3),e.fill(),e.stroke(),e.fillStyle=o?"#38bdf8":"#e2e8f0",e.textAlign="left",e.textBaseline="middle",e.fillText(s.name,M+6,C+x/2),s.isInsideSite01DEM&&(e.fillStyle="#0ea5e9",e.font='bold 7px "JetBrains Mono", monospace',e.fillText("5m",M+y-14,C+x/2)),e.restore()})}drawCustomSelectionMarker(e){if(!this.customSelection)return;const{x:i,y:t}=le(this.customSelection.lon,this.customSelection.lat),{cx:s,cy:a}=this.projectMetersToCanvas(i,t);e.save(),e.strokeStyle="#f59e0b",e.lineWidth=1.8,e.beginPath(),e.arc(s,a,7,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(s-9,a),e.lineTo(s+9,a),e.moveTo(s,a-9),e.lineTo(s,a+9),e.stroke(),e.fillStyle="#ffffff",e.beginPath(),e.arc(s,a,2.5,0,2*Math.PI),e.fill(),e.fillStyle="#f59e0b",e.font='bold 8px "JetBrains Mono", monospace',e.textAlign="left",e.fillText("CUSTOM TARGET",s+11,a-3),e.fillStyle="#e2e8f0",e.font='7px "JetBrains Mono", monospace',e.fillText(j(this.customSelection.lat,this.customSelection.lon),s+11,a+7),e.restore()}handleMouseMove(e){const i=this.canvas.getBoundingClientRect(),t=e.clientX-i.left,s=e.clientY-i.top;let a=null;const d=12;for(const r of V){const{x:p,y:o}=le(r.lon,r.lat),{cx:l,cy:u}=this.projectMetersToCanvas(p,o);if(Math.hypot(t-l,s-u)<=d){a=r;break}}a?(this.hoveredSite=a,this.canvas.style.cursor="pointer",this.showTooltip(a,e.clientX,e.clientY),this.draw()):(this.hoveredSite=null,this.canvas.style.cursor="crosshair",this.tooltipEl.classList.add("hidden"),this.draw())}showTooltip(e,i,t){const s=it(e.lat),a=e.isInsideSite01DEM?"★ Validated 5 m/px DEM (NASA Site 01)":"Global LOLA Coverage (~60 m/px)";this.tooltipEl.innerHTML=`
      <div class="spe-tt-name">${e.name}</div>
      <div class="spe-tt-desig">${e.designation}</div>
      <div class="spe-tt-grid">
        <span>Coords:</span><span>${j(e.lat,e.lon)}</span>
        <span>Elevation:</span><span>${e.elevationM>=0?"+":""}${e.elevationM.toLocaleString()} m</span>
        <span>Pole Dist:</span><span>${s.toFixed(1)} km</span>
        <span>Dataset:</span><span>${a}</span>
      </div>
      <div class="spe-tt-action">Click to select candidate</div>
    `,this.tooltipEl.style.left=`${i+14}px`,this.tooltipEl.style.top=`${t-20}px`,this.tooltipEl.classList.remove("hidden")}handleClick(e){const i=this.canvas.getBoundingClientRect(),t=e.clientX-i.left,s=e.clientY-i.top;for(const u of V){const{x:m,y:g}=le(u.lon,u.lat),{cx:h,cy:v}=this.projectMetersToCanvas(m,g);if(Math.hypot(t-h,s-v)<=14){this.selectedSiteId=u.id,this.customSelection=null,this.draw(),this.applyCurrentSelection();return}}const{x:a,y:d}=this.unprojectCanvasToMeters(t,s);if(Math.hypot(a,d)>this.MAX_RADIUS_M)return;const{lonDeg:p,latDeg:o}=Tt(a,d),l=ut(p,o);this.selectedSiteId="custom",this.customSelection={lat:Number(o.toFixed(3)),lon:Number(p.toFixed(2)),elevM:0,isInsideDEM:l},this.draw(),this.applyCurrentSelection()}updateInfoCard(){if(!this.container.querySelector("#spe-info-card"))return;let i="Artemis Site 01",t="Shackleton–de Gerlache Connecting Ridge",s=-89.463,a=222.51,d=1100,r="High-illumination ridge candidate with near-continuous solar access and direct Earth line-of-sight.",p=!0,o="CANDIDATE SITE";if(this.selectedSiteId==="custom"&&this.customSelection)i="Custom Selected Location",t="User Chosen Lunar Site",s=this.customSelection.lat,a=this.customSelection.lon,d=this.customSelection.elevM,p=this.customSelection.isInsideDEM,o="CUSTOM LOCATION",r=p?"Location lies within the validated 5 m/px high-resolution Site 01 DEM.":"Location lies outside the 5 m/px DEM footprint. Global LOLA ~60 m/px altimetry will be used.";else{const u=V.find(m=>m.id===this.selectedSiteId)||V[0];i=u.name,t=u.designation,s=u.lat,a=u.lon,d=u.elevationM,r=u.description,p=!!u.isInsideSite01DEM,o=u.id==="south-pole"?"GEODETIC DATUM":"VERIFIED CANDIDATE"}const l=it(s);this.setText("#spe-site-type",o),this.setText("#spe-site-cov",p?"5 m/px High-Resolution DEM":"Global LOLA (~60 m/px)"),this.setText("#spe-site-name",i),this.setText("#spe-site-desig",t),this.setText("#spe-cell-lat",`${s.toFixed(3)}° S`),this.setText("#spe-cell-lon",`${a.toFixed(2)}° E`),this.setText("#spe-cell-elev",`${d>=0?"+":""}${d.toLocaleString()} m`),this.setText("#spe-cell-dist",`${l.toFixed(1)} km`),this.setText("#spe-site-desc",r)}applyCurrentSelection(){let e={name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elevationM:1100,isInsideSite01DEM:!0,terrainResolution:"5 m/px DEM",coverageType:"High-Resolution Regional DEM"};if(this.selectedSiteId==="custom"&&this.customSelection)e={name:"Custom Selected Location",designation:j(this.customSelection.lat,this.customSelection.lon),lat:this.customSelection.lat,lon:this.customSelection.lon,elevationM:this.customSelection.elevM,isInsideSite01DEM:this.customSelection.isInsideDEM,terrainResolution:this.customSelection.isInsideDEM?"5 m/px DEM":"Global LOLA (~60 m/px)",coverageType:this.customSelection.isInsideDEM?"High-Resolution Regional DEM":"Global Altimetry"};else{const i=V.find(t=>t.id===this.selectedSiteId)||V[0];e={name:i.name,designation:i.designation,lat:i.lat,lon:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM,terrainResolution:i.isInsideSite01DEM?"5 m/px DEM":"Global LOLA (~60 m/px)",coverageType:i.isInsideSite01DEM?"High-Resolution Regional DEM":"Global Altimetry"}}this.onSelectCallback&&this.onSelectCallback(e)}setText(e,i){const t=this.container.querySelector(e);t&&(t.textContent=i)}}class _i{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"mode","mission");b(this,"missionContext",null);b(this,"comparisonContext",null);b(this,"selectedFormat","pdf");b(this,"isGenerating",!1);b(this,"statusMessage",null);this.container=document.createElement("div"),this.container.id="export-panel-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container)}openForMission(e,i){i&&(this.selectedFormat=i),this.mode="mission",this.missionContext=e,this.comparisonContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}openForComparison(e,i){i&&(this.selectedFormat=i),this.mode="comparison",this.comparisonContext=e,this.missionContext=null,this.statusMessage=null,this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}toggle(e="mission"){this.isOpen?this.close():e==="comparison"&&this.comparisonContext?this.openForComparison(this.comparisonContext):this.missionContext&&this.openForMission(this.missionContext)}render(){var s,a,d,r,p,o,l,u;const e=this.mode==="mission",i=e?"Export Mission Scenario Analysis":"Export Candidate-Site Comparison",t=e?`${((s=this.missionContext)==null?void 0:s.scenarioName)??"Mission"} · ${((a=this.missionContext)==null?void 0:a.siteName)??"Selected Site"} (${(r=(d=this.missionContext)==null?void 0:d.latitudeDeg)==null?void 0:r.toFixed(3)}°N, ${(o=(p=this.missionContext)==null?void 0:p.longitudeDeg)==null?void 0:o.toFixed(3)}°E)`:`${((l=this.comparisonContext)==null?void 0:l.reportTitle)??"Candidate Comparison"} · ${((u=this.comparisonContext)==null?void 0:u.scenarios.length)??0} Scenarios`;this.container.innerHTML=`
    <div class="mission-modal-backdrop" id="export-backdrop"></div>
    <div class="mission-modal-dialog export-dialog">
      <!-- Header -->
      <div class="mission-modal-header export-dialog-header">
        <div class="mission-header-info">
          <div class="export-kicker">LUNAOPS SCIENTIFIC REPRODUCIBILITY &amp; DATA EXPORT</div>
          <h2>📤 ${i}</h2>
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
      </div>`;if(this.statusMessage){const e=this.statusMessage.type==="error"?"status-error":"status-success",i=this.statusMessage.type==="error"?"❌":"✅";return`
      <div class="export-status-bar ${e}">
        <span>${i}</span>
        <span>${this.statusMessage.text}</span>
      </div>`}return""}wireEvents(){var i,t,s,a;(i=this.container.querySelector("#btn-close-export"))==null||i.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#btn-cancel-export"))==null||t.addEventListener("click",()=>this.close()),(s=this.container.querySelector("#export-backdrop"))==null||s.addEventListener("click",()=>{this.isGenerating||this.close()}),this.container.querySelectorAll(".export-format-card").forEach(d=>{d.addEventListener("click",()=>{if(this.isGenerating)return;const r=d.getAttribute("data-format")||"pdf";this.selectedFormat=r,this.render()})}),(a=this.container.querySelector("#btn-generate-export"))==null||a.addEventListener("click",()=>{this.executeExport()})}async executeExport(){if(!this.isGenerating){this.isGenerating=!0,this.statusMessage=null,this.render();try{this.mode==="mission"?await this.exportMission():await this.exportComparison(),this.statusMessage={type:"success",text:`Successfully generated and downloaded ${this.selectedFormat.toUpperCase()} export.`}}catch(e){console.error("[LUNAOPS] Export failed:",e),this.statusMessage={type:"error",text:e.message||"Export request failed. Ensure backend SPICE service is running."}}finally{this.isGenerating=!1,this.render()}}}async exportMission(){var r;if(!this.missionContext)throw new Error("Missing mission scenario context.");const e=this.missionContext,i={scenario_name:e.scenarioName||"Artemis Candidate Mission",notes:e.notes||"",site_name:e.siteName||"South Pole Site",latitude_deg:e.latitudeDeg,longitude_deg:e.longitudeDeg,elevation_m:e.elevationM,instrument_height_m:e.instrumentHeightM,start_utc:e.startUtc,end_utc:e.endUtc,step_minutes:e.stepMinutes,timeline_result:e.timelineResponse||null,horizon_result:e.horizonProfile||null},t=`${ue}/api/export/mission?format=${this.selectedFormat}`,s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){let p=`HTTP ${s.status}`;try{const o=await s.json();p=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{p=await s.text()}throw new Error(`Export failed: ${p}`)}const a=(e.siteName||"site").toLowerCase().replace(/[^a-z0-9_-]/g,"_"),d=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const p=await s.blob();this.triggerDownload(p,`lunaops_${a}_report_${d}.pdf`)}else if(this.selectedFormat==="csv"){const p=await s.text(),o=new Blob([p],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_${a}_timeseries_${d}.csv`)}else{const p=await s.json(),o=new Blob([JSON.stringify(p,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_${a}_manifest_${d}.json`)}}async exportComparison(){var r;if(!this.comparisonContext)throw new Error("Missing comparison context.");const e=this.comparisonContext;if(!e.scenarios||e.scenarios.length<2)throw new Error("At least two candidate scenarios are required to export comparison.");const i=e.scenarios.map(p=>{let o=`${p.startDate}T${p.startTime}`;o.endsWith("Z")||(o+="Z");let l=`${p.endDate}T${p.endTime}`;return l.endsWith("Z")||(l+="Z"),{id:p.id,name:p.name,latitude_deg:p.latitudeDeg,longitude_deg:p.longitudeDeg,elevation_m:p.elevationM,instrument_height_m:p.instrumentHeightM,start_utc:o,end_utc:l,step_minutes:p.stepMinutes}}),t={report_title:e.reportTitle||"LUNAOPS Candidate-Site Comparison Analysis",scenarios:i,constraints:e.constraints||null,ranking_weights:e.rankingWeights||null,comparison_result:e.comparisonResult||null},s=`${ue}/api/export/comparison?format=${this.selectedFormat}`,a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok){let p=`HTTP ${a.status}`;try{const o=await a.json();p=((r=o.detail)==null?void 0:r.message)||JSON.stringify(o.detail||o)}catch{p=await a.text()}throw new Error(`Comparison export failed: ${p}`)}const d=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);if(this.selectedFormat==="pdf"){const p=await a.blob();this.triggerDownload(p,`lunaops_comparison_report_${d}.pdf`)}else if(this.selectedFormat==="csv"){const p=await a.text(),o=new Blob([p],{type:"text/csv;charset=utf-8;"});this.triggerDownload(o,`lunaops_comparison_matrix_${d}.csv`)}else{const p=await a.json(),o=new Blob([JSON.stringify(p,null,2)],{type:"application/json"});this.triggerDownload(o,`lunaops_comparison_manifest_${d}.json`)}}triggerDownload(e,i){const t=URL.createObjectURL(e),s=document.createElement("a");s.href=t,s.download=i,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}class Fs{constructor(){b(this,"metadata",null);b(this,"elevCanvas",null);b(this,"slopeCanvas",null);b(this,"toterrCanvas",null);b(this,"elevCtx",null);b(this,"slopeCtx",null);b(this,"toterrCtx",null);b(this,"isLoaded",!1);b(this,"loadPromise",null)}async init(){if(!this.isLoaded)return this.loadPromise?this.loadPromise:(this.loadPromise=(async()=>{try{const e=await fetch("/generated/site01_metadata.json");if(!e.ok){console.warn("[TerrainSampler] Could not load site01_metadata.json");return}this.metadata=await e.json();const[i,t,s]=await Promise.all([this.loadImage("/generated/site01_elev_norm.png"),this.loadImage("/generated/site01_slope.png"),this.loadImage("/generated/site01_toterr.png")]);this.elevCanvas=this.createCanvasFromImage(i),this.elevCtx=this.elevCanvas.getContext("2d",{willReadFrequently:!0}),this.slopeCanvas=this.createCanvasFromImage(t),this.slopeCtx=this.slopeCanvas.getContext("2d",{willReadFrequently:!0}),this.toterrCanvas=this.createCanvasFromImage(s),this.toterrCtx=this.toterrCanvas.getContext("2d",{willReadFrequently:!0}),this.isLoaded=!0}catch(e){console.warn("[TerrainSampler] Failed to initialize terrain rasters:",e)}})(),this.loadPromise)}loadImage(e){return new Promise((i,t)=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>i(s),s.onerror=a=>t(a),s.src=e})}createCanvasFromImage(e){const i=document.createElement("canvas");i.width=e.width,i.height=e.height;const t=i.getContext("2d",{willReadFrequently:!0});return t&&t.drawImage(e,0,0),i}getMetadata(){return this.metadata}sample(e,i){var p,o;const{x:t,y:s}=le(e,i),{px512:a,py512:d,isInside:r}=Cs(t,s);if(!r||!this.isLoaded||!this.metadata||!this.elevCtx)return{isInside:r,px:a,py:d,xM:t,yM:s};try{const l=this.elevCtx.getImageData(a,d,1,1).data[0],u=((p=this.slopeCtx)==null?void 0:p.getImageData(a,d,1,1).data[0])??0,m=((o=this.toterrCtx)==null?void 0:o.getImageData(a,d,1,1).data[0])??0,g=this.metadata.elev_max_m-this.metadata.elev_min_m,h=this.metadata.elev_min_m+l/255*g,v=u/255*this.metadata.slope_max_deg,y=m/255*this.metadata.uncertainty_max_m;return{isInside:!0,elevationM:Math.round(h*10)/10,slopeDeg:Math.round(v*10)/10,errorM:Math.round(y*100)/100,px:a,py:d,xM:t,yM:s}}catch{return{isInside:r,px:a,py:d,xM:t,yM:s}}}}const ri=new Fs,A=[{id:"site-01",name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",lat:-89.463,lon:222.51,elev:1100,description:"High illumination candidate ridge with near-continuous solar access & line-of-sight to Earth."},{id:"shackleton-peak",name:"Shackleton Crater Peak",designation:"Artemis Candidate Site 04",lat:-89.78,lon:128,elev:1450,description:"Elevated rim peak bordering deep permanently shadowed craters (PSR)."},{id:"south-pole-90",name:"Lunar South Pole",designation:"Geographic 90°S Pole",lat:-90,lon:0,elev:-250,description:"Intersection of all lunar meridians on the undulating rim crest of Shackleton."},{id:"malapert-peak",name:"Malapert Mountain",designation:"Malapert Peak (Artemis Candidate)",lat:-86.04,lon:2.7,elev:5e3,description:"Prominent 5 km topographic massif providing extended solar visibility and Earth direct line-of-sight."}];class zs{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentTab","site");b(this,"scenarioName","Artemis III Candidate — South Pole Ridge");b(this,"scenarioNotes","Pre-mission landing safety and line-of-sight analysis for CLPS / Artemis lunar exploration.");b(this,"selectedSite");b(this,"timeline");b(this,"spiceHealth",null);b(this,"initialGeometry",null);b(this,"horizonProfile",null);b(this,"horizonVisibility",null);b(this,"horizonLoading",!1);b(this,"horizonError",null);b(this,"exportPanel",null);b(this,"activeTerrainLayer","elev");b(this,"timelineResponse",null);b(this,"timelineLoading",!1);b(this,"timelineError",null);b(this,"scrubbedSampleIndex",0);b(this,"onTimelineScrubbedCallback");b(this,"landingWindowsResponse",null);b(this,"landingWindowsLoading",!1);b(this,"landingWindowsError",null);b(this,"landingWindowsStartDate","2026-10-01");b(this,"landingWindowsEndDate","2026-12-31");b(this,"landingWindowsFilter","all");b(this,"terrainCtx",null);b(this,"onSiteChangedCallback");this.selectedSite={name:A[0].name,designation:A[0].designation,latitudeDeg:A[0].lat,longitudeDeg:A[0].lon,elevationM:A[0].elev,coordinateConvention:"Latitude -90° to +90° (South negative); Longitude 0° to 360° East-positive",referenceDatum:"IAU Moon 2000 Sphere (R = 1,737.4 km) · MOON_ME frame",isInsideSite01DEM:!0,demDatasetName:"NASA LOLA Artemis Site 01 (5 m/px)"},this.timeline={startDate:"2026-10-16",startTime:"12:00:00",isoUtcStart:"2026-10-16T12:00:00Z",durationValue:14,durationUnit:"days",isoUtcEnd:"2026-10-30T12:00:00Z",timeStepHours:1,isWithinKernelCoverage:!0},this.container=document.createElement("div"),this.container.id="mission-workspace-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.init()}setOnSiteChanged(e){this.onSiteChangedCallback=e}setOnTimelineScrubbed(e){this.onTimelineScrubbedCallback=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.refreshHealthAndSample(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}setCoordinatesFromGlobe(e,i){this.selectedSite.latitudeDeg=Math.round(e*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(i*1e3)/1e3,this.selectedSite.name="Custom Selected Location",this.selectedSite.designation="User Chosen Site",this.updateSiteCoverageAndSample(),this.isOpen&&this.render()}async init(){await ri.init(),this.updateSiteCoverageAndSample(),this.checkSpiceHealth()}async checkSpiceHealth(){try{this.spiceHealth=await bi()}catch{this.spiceHealth=null}}async refreshHealthAndSample(){await this.checkSpiceHealth(),this.updateSiteCoverageAndSample()}updateSiteCoverageAndSample(){const e=this.selectedSite.latitudeDeg,i=this.selectedSite.longitudeDeg,t=ri.sample(i,e);if(this.selectedSite.isInsideSite01DEM=t.isInside,t.isInside)this.selectedSite.demDatasetName="NASA LOLA Artemis Site 01 (5 m/px)",this.selectedSite.sampledElevationM=t.elevationM,this.selectedSite.sampledSlopeDeg=t.slopeDeg,this.selectedSite.sampledErrorM=t.errorM,this.selectedSite.pixelCoords={px:t.px,py:t.py,gridMax:512},this.selectedSite.polarStereoM={x:t.xM,y:t.yM},t.elevationM!==void 0&&(this.selectedSite.elevationM=t.elevationM);else{this.selectedSite.demDatasetName=void 0,this.selectedSite.sampledElevationM=void 0,this.selectedSite.sampledSlopeDeg=void 0,this.selectedSite.sampledErrorM=void 0,this.selectedSite.pixelCoords=void 0;const{x:s,y:a}=le(i,e);this.selectedSite.polarStereoM={x:s,y:a}}this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite)}computeIsoTimestamps(){try{const e=`${this.timeline.startDate}T${this.timeline.startTime}Z`,i=Date.parse(e);if(isNaN(i))return;this.timeline.isoUtcStart=new Date(i).toISOString().replace(".000Z","Z");const t=this.timeline.durationUnit==="days"?24*3600*1e3:3600*1e3,s=i+this.timeline.durationValue*t;this.timeline.isoUtcEnd=new Date(s).toISOString().replace(".000Z","Z");const a=new Date(i).getUTCFullYear(),d=new Date(s).getUTCFullYear();this.timeline.isWithinKernelCoverage=a>=1900&&a<=2050&&d>=1900&&d<=2050}catch{this.timeline.isWithinKernelCoverage=!1}}getReadinessEvaluation(){var d;const e=[];(d=this.spiceHealth)!=null&&d.initialized?e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"pass",detail:"Online · 5 NAIF kernels loaded · MOON_ME reference frame active"}):e.push({id:"spice",label:"NASA SPICE Ephemeris Service",status:"fail",detail:"Backend unavailable at http://127.0.0.1:8000. Start backend server."});const i=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;i>=-90&&i<=90&&t>=-180&&t<=360?e.push({id:"coords",label:"Site Selenographic Coordinates",status:"pass",detail:`Valid · ${j(i,t)} · Elevation: ${this.selectedSite.elevationM} m`}):e.push({id:"coords",label:"Site Selenographic Coordinates",status:"fail",detail:"Coordinates out of legal lunar bounds: Lat [-90, +90], Lon [-180, 360]."}),this.selectedSite.isInsideSite01DEM?e.push({id:"terrain",label:"Topographic DEM Coverage",status:"pass",detail:"Inside NASA LOLA Site 01 5m/px DEM footprint · True elevation & slope layers active"}):e.push({id:"terrain",label:"Topographic DEM Coverage",status:"warn",detail:"Outside high-resolution Site 01 DEM (16×16 km tile). SPICE geometric calculations are available; local terrain slope & horizon require additional regional DEM tiles."}),this.timeline.isWithinKernelCoverage?e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"pass",detail:`Valid UTC duration · Interval: ${this.timeline.isoUtcStart} → ${this.timeline.isoUtcEnd} (${this.timeline.durationValue} ${this.timeline.durationUnit})`}):e.push({id:"timeline",label:"Mission Interval & DE440s Coverage",status:"fail",detail:"Requested timeline falls outside DE440s kernel ephemeris window (1900–2050 UTC)."});let s="READY",a="All mission parameters and datasets are verified. Ready for ephemeris evaluation.";return e.some(r=>r.status==="fail")?(s="ERROR",a="One or more required parameters failed validation. Correct items marked in red."):e.some(r=>r.status==="warn")&&(s="READY_WITH_LIMITATIONS",a="Scenario is ready for geometric SPICE analysis. Detailed terrain obstruction is disabled (outside Site 01 5m/px DEM)."),{state:s,summary:a,checks:e}}toScenarioJSON(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();return{id:`LUNAOPS-${Date.now()}`,name:this.scenarioName,notes:this.scenarioNotes,createdAt:new Date().toISOString(),targetRegion:"Lunar South Pole (80°S–90°S)",site:{...this.selectedSite},timeline:{...this.timeline},readiness:e,initialGeometry:this.initialGeometry??void 0}}render(){this.computeIsoTimestamps();const e=this.getReadinessEvaluation();this.container.innerHTML=`
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
    `,this.wireEvents(),this.currentTab==="site"&&this.selectedSite.isInsideSite01DEM&&this.drawTerrainCanvas(),this.currentTab==="horizon"&&this.horizonProfile&&this.drawHorizonPolarChart()}renderTabContent(e){switch(this.currentTab){case"site":return this.renderSiteTab();case"timeline":return this.renderTimelineTab();case"details":return this.renderDetailsTab();case"readiness":return this.renderReadinessTab(e);case"horizon":return this.renderHorizonTab();case"export":return this.renderExportTab();case"summary":return this.renderSummaryTab(e);case"windows":case"landing-windows":return this.renderLandingWindowsTab();default:return this.renderSiteTab()}}renderHorizonTab(){const e=this.selectedSite.isInsideSite01DEM,i=this.horizonVisibility,t=this.horizonProfile,s=p=>p==="no_obstruction_detected_within_coverage"?"✅":p==="near_horizon_grazing"?"⚠️":p==="blocked_by_local_terrain"?"🪨":p==="blocked_by_lunar_body"?"🌑":"❓",a=p=>p==="no_obstruction_detected_within_coverage"?"Clear Line-of-Sight":p==="near_horizon_grazing"?"Near-Horizon Grazing":p==="blocked_by_local_terrain"?"Blocked by Terrain":p==="blocked_by_lunar_body"?"Occulted by Moon":p==="unknown_insufficient_coverage"?"Coverage Insufficient":"Unavailable",d=p=>p==="no_obstruction_detected_within_coverage"?"#22c55e":p==="near_horizon_grazing"?"#f59e0b":p.startsWith("blocked")?"#ef4444":"#94a3b8",r=(p,o,l)=>`
      <div class="geom-card vis-card">
        <div class="geom-card-header" style="border-left: 3px solid ${d(l.visibility_status)}">
          <span class="geom-body-title">${o} ${p}</span>
          <span class="horizon-badge" style="background: ${d(l.visibility_status)}22; color: ${d(l.visibility_status)}; border: 1px solid ${d(l.visibility_status)}44">
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

      ${!i&&!this.horizonLoading?`
      <div class="empty-geom-state">
        <p>No terrain horizon evaluation has been run yet.</p>
        <p class="hint">First evaluate SPICE geometry on the <strong>Readiness &amp; SPICE</strong> tab, then click <strong>Evaluate Terrain Horizon</strong> above to compute Sun and Earth terrain obstruction.</p>
      </div>
      `:""}

      ${i?`
      <div class="vis-cards-row">
        ${r("Sun","☀️",i.sun)}
        ${r("Earth","🌍",i.earth)}
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
          <span>DEM: <code>${i.dem_dataset}</code></span>
          <span>DEM Loaded: <code>${i.dem_loaded?"Yes":"No"}</code></span>
          <span>Coverage: <code>${i.site.is_inside_dem?"Inside Site 01":"Outside Site 01"}</code></span>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);margin:8px 16px 0">${i.note}</p>
      </div>
      `:""}
    </div>
    `}renderSiteTab(){const e=this.selectedSite.latitudeDeg,i=this.selectedSite.longitudeDeg,t=this.selectedSite.isInsideSite01DEM;return`
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
                    <p>Current coordinates (${j(e,i)}) fall outside the 16×16 km Site 01 tile.</p>
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
            ${A.map(s=>`
              <div class="preset-item ${s.lat===e&&s.lon===i?"selected":""}" data-preset-id="${s.id}">
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
                <input id="inp-lat" type="number" step="0.001" min="-90" max="90" value="${e.toFixed(3)}" />
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
    `}renderTimelineTab(){const e=this.selectedSite.isInsideSite01DEM,i=this.timelineResponse,t=i==null?void 0:i.summary,s=(i==null?void 0:i.samples)??[],a=s[this.scrubbedSampleIndex]??s[0],d=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},r=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},p=l=>{switch(l){case"full_sunlight":return"#22c55e";case"partial_sunlight":return"#f59e0b";case"total_darkness":return"#1e293b";default:return"#6b21a8"}},o=l=>{switch(l){case"full_disc_los":return"#3b82f6";case"centre_only_los":return"#06b6d4";case"partial_disc_los":return"#f59e0b";case"occulted":return"#ef4444";default:return"#6b21a8"}};return`
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

      ${i&&t?`
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
                <div class="timeline-bar-seg" style="flex: ${l.duration_hours}; background: ${p(l.state)};" title="${l.state.replace(/_/g," ")}: ${l.duration_hours}h (${l.start_utc} → ${l.end_utc})"></div>
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
                <div class="timeline-bar-seg" style="flex: ${l.duration_hours}; background: ${o(l.state)};" title="${l.state.replace(/_/g," ")}: ${l.duration_hours}h (${l.start_utc} → ${l.end_utc})"></div>
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
                <div class="scrubbed-val-row"><span>State:</span> <span id="scrubbed-sun-state">${d(a.sun.visibility_state)}</span></div>
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
              ${i.sun_windows.map(l=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">☀️ Sun</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${l.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${d(l.state)}</td>
                </tr>
              `).join("")}
              ${i.earth_windows.map(l=>`
                <tr style="border-bottom:1px dashed rgba(148,163,184,0.1);">
                  <td style="padding:6px;">🌍 Earth</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.start_utc}</td>
                  <td style="padding:6px; font-family:var(--font-mono);">${l.end_utc}</td>
                  <td style="padding:6px; font-weight:600;">${l.duration_hours.toFixed(2)} h</td>
                  <td style="padding:6px;">${r(l.state)}</td>
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
    `}renderReadinessTab(e){const i=this.initialGeometry;return`
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
    `}renderSummaryTab(e){var s;const i=this.selectedSite.latitudeDeg,t=this.selectedSite.longitudeDeg;return`
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
              <td><code>${j(i,t)}</code></td>
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
    `}openExportModal(e){this.exportPanel||(this.exportPanel=new _i),this.computeIsoTimestamps(),this.exportPanel.openForMission({scenarioName:this.scenarioName,notes:this.scenarioNotes,siteName:this.selectedSite.name,latitudeDeg:this.selectedSite.latitudeDeg,longitudeDeg:this.selectedSite.longitudeDeg,elevationM:this.selectedSite.elevationM,instrumentHeightM:2,startUtc:this.timeline.isoUtcStart,endUtc:this.timeline.isoUtcEnd,stepMinutes:Math.max(1,Math.round((this.timeline.timeStepHours||1)*60)),timelineResponse:this.timelineResponse||void 0,horizonProfile:this.horizonProfile||void 0},e)}renderExportTab(){const e=this.timelineResponse!==null;return`
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
    `}renderLandingWindowsTab(){const e=this.landingWindowsResponse,i=(e==null?void 0:e.days)??[],t=e==null?void 0:e.scan_params,s=e==null?void 0:e.summary,a=o=>{try{return new Date(o+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return o}},d=(o,l)=>{switch(o){case"excellent":return`<span class="rating-badge rating-excellent">🌟 EXCELLENT (${l})</span>`;case"good":return`<span class="rating-badge rating-good">🟢 GOOD (${l})</span>`;case"marginal":return`<span class="rating-badge rating-marginal">🟡 MARGINAL (${l})</span>`;case"poor":default:return`<span class="rating-badge rating-poor">🔴 POOR (${l})</span>`}},r=o=>{switch(o){case"excellent":return"#22c55e";case"good":return"#38bdf8";case"marginal":return"#f59e0b";case"poor":return"#475569";default:return"#334155"}},p=i.filter(o=>this.landingWindowsFilter==="safe"?o.is_safe_for_landing:this.landingWindowsFilter==="excellent"?o.safety_rating==="excellent":!0);return`
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
          <span class="windows-kpi-val val-good">${(s==null?void 0:s.safe_days_count)??0} days</span>
          <span class="windows-kpi-sub">${Math.round(((s==null?void 0:s.safe_days_count)??0)/((t==null?void 0:t.total_days)||1)*100)}% of window (≥6h Sun &amp; Comms)</span>
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
          ${i.map(o=>`
            <div class="heatmap-ribbon-seg"
                 style="background: ${r(o.safety_rating)}; flex: 1;"
                 title="${o.date}: ${o.safety_rating.toUpperCase()} (Score: ${o.safety_score}) · Sun: ${o.sunlight.full_hours}h · Earth: ${o.earth_los.full_hours}h">
            </div>
          `).join("")}
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); margin-top:4px; font-family:var(--font-mono);">
          <span>${t==null?void 0:t.start_date}</span>
          <span>${i.length} days scanned</span>
          <span>${t==null?void 0:t.end_date}</span>
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
        ${p.map(o=>`
          <div class="window-day-card ${o.safety_rating}">
            <div class="window-day-header">
              <div>
                <span class="window-day-date">${a(o.date)}</span>
                <span class="window-day-iso">${o.date}</span>
              </div>
              <div>
                ${d(o.safety_rating,o.safety_score)}
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
    `}drawTerrainCanvas(){setTimeout(()=>{const e=document.getElementById("site01-terrain-canvas");if(!e)return;this.terrainCtx=e.getContext("2d");const i=new Image;i.crossOrigin="anonymous";const t=this.activeTerrainLayer==="slope"?"/generated/site01_slope.png":this.activeTerrainLayer==="toterr"?"/generated/site01_toterr.png":"/generated/site01_elev_norm.png";i.onload=()=>{if(this.terrainCtx&&(this.terrainCtx.clearRect(0,0,512,512),this.terrainCtx.drawImage(i,0,0,512,512),this.selectedSite.pixelCoords)){const{px:s,py:a}=this.selectedSite.pixelCoords;this.terrainCtx.strokeStyle="#38bdf8",this.terrainCtx.lineWidth=2,this.terrainCtx.beginPath(),this.terrainCtx.moveTo(s-14,a),this.terrainCtx.lineTo(s+14,a),this.terrainCtx.moveTo(s,a-14),this.terrainCtx.lineTo(s,a+14),this.terrainCtx.stroke(),this.terrainCtx.beginPath(),this.terrainCtx.arc(s,a,6,0,2*Math.PI),this.terrainCtx.stroke()}},i.src=t},50)}wireEvents(){var Ee,I,me,Ie,ot,Me,he,_e,qe,We,ie,$e,Ye,Pe;(Ee=this.container.querySelector("#btn-close-workspace"))==null||Ee.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".nav-tab").forEach(f=>{f.addEventListener("click",w=>{const k=w.currentTarget;this.currentTab=k.dataset.tab||"site",this.render()})}),this.container.querySelectorAll(".preset-item").forEach(f=>{f.addEventListener("click",w=>{const $=w.currentTarget.dataset.presetId,U=A.find(ge=>ge.id===$);U&&(this.selectedSite.name=U.name,this.selectedSite.designation=U.designation,this.selectedSite.latitudeDeg=U.lat,this.selectedSite.longitudeDeg=U.lon,this.selectedSite.elevationM=U.elev,this.updateSiteCoverageAndSample(),this.render())})}),(I=this.container.querySelector("#btn-jump-site01"))==null||I.addEventListener("click",()=>{const f=A[0];this.selectedSite.name=f.name,this.selectedSite.designation=f.designation,this.selectedSite.latitudeDeg=f.lat,this.selectedSite.longitudeDeg=f.lon,this.selectedSite.elevationM=f.elev,this.updateSiteCoverageAndSample(),this.render()}),this.container.querySelectorAll(".btn-layer-toggle").forEach(f=>{f.addEventListener("click",w=>{const k=w.currentTarget;this.activeTerrainLayer=k.dataset.layer||"elev",this.render()})});const e=this.container.querySelector("#inp-lat"),i=this.container.querySelector("#inp-lon"),t=this.container.querySelector("#inp-elev"),s=()=>{if(!e||!i||!t)return;const f=parseFloat(e.value),w=parseFloat(i.value),k=parseFloat(t.value);!isNaN(f)&&!isNaN(w)&&(this.selectedSite.latitudeDeg=f,this.selectedSite.longitudeDeg=w,this.selectedSite.elevationM=isNaN(k)?0:k,this.selectedSite.name="Custom Coordinates",this.selectedSite.designation="User Input",this.updateSiteCoverageAndSample(),this.render())};e==null||e.addEventListener("change",s),i==null||i.addEventListener("change",s),t==null||t.addEventListener("change",s);const a=this.container.querySelector("#site01-terrain-canvas");a==null||a.addEventListener("click",f=>{const w=a.getBoundingClientRect(),k=f.clientX-w.left,$=f.clientY-w.top,U=Math.round(k/w.width*512),ge=Math.round($/w.height*512),{lonDeg:bt,latDeg:ft}=Ts(U,ge);this.selectedSite.latitudeDeg=Math.round(ft*1e3)/1e3,this.selectedSite.longitudeDeg=Math.round(bt*1e3)/1e3,this.selectedSite.name="Site 01 Targeted Point",this.selectedSite.designation=`Terrain Pixel (${U}, ${ge})`,this.updateSiteCoverageAndSample(),this.render()});const d=this.container.querySelector("#inp-start-date"),r=this.container.querySelector("#inp-start-time"),p=this.container.querySelector("#inp-duration-val"),o=this.container.querySelector("#inp-duration-unit"),l=this.container.querySelector("#inp-timestep"),u=()=>{d&&(this.timeline.startDate=d.value),r&&(this.timeline.startTime=r.value),p&&(this.timeline.durationValue=parseInt(p.value,10)||1),o&&(this.timeline.durationUnit=o.value),l&&(this.timeline.timeStepHours=parseFloat(l.value)||1),this.computeIsoTimestamps(),this.render()};d==null||d.addEventListener("change",u),r==null||r.addEventListener("change",u),p==null||p.addEventListener("change",u),o==null||o.addEventListener("change",u),l==null||l.addEventListener("change",u);const m=async()=>{this.timelineLoading=!0,this.timelineError=null,this.render();try{this.computeIsoTimestamps();const f=Math.round(this.timeline.timeStepHours*60),w=await Ms({start_utc:this.timeline.isoUtcStart,end_utc:this.timeline.isoUtcEnd,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,step_minutes:f,refinement_tolerance_sec:60});this.timelineResponse=w,this.scrubbedSampleIndex=0,this.timelineLoading=!1,this.render(),w.samples.length>0&&this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w.samples[0])}catch(f){this.timelineLoading=!1,this.timelineError=f.message??String(f),this.render()}};(me=this.container.querySelector("#btn-calc-timeline"))==null||me.addEventListener("click",m);const g=this.container.querySelector("#inp-timeline-scrubber");g==null||g.addEventListener("input",()=>{var k;const f=parseInt(g.value,10);this.scrubbedSampleIndex=f;const w=(k=this.timelineResponse)==null?void 0:k.samples[f];w&&(this.updateScrubbedReadout(w),this.onTimelineScrubbedCallback&&this.onTimelineScrubbedCallback(w))});const h=this.container.querySelector("#inp-scen-name"),v=this.container.querySelector("#inp-scen-notes");h==null||h.addEventListener("input",()=>{this.scenarioName=h.value}),v==null||v.addEventListener("input",()=>{this.scenarioNotes=v.value});const y=async()=>{try{const f=this.container.querySelector("#btn-eval-spice-tab"),w=this.container.querySelector("#btn-eval-spice-footer");f&&(f.disabled=!0,f.textContent="Calculating SPICE..."),w&&(w.disabled=!0,w.textContent="Calculating SPICE..."),this.computeIsoTimestamps();const k=await fi({utc_time:this.timeline.isoUtcStart,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.initialGeometry=k,this.horizonProfile=null,this.horizonVisibility=null,this.horizonError=null,this.currentTab="readiness",this.render()}catch(f){console.error("[MissionWorkspace] SPICE Calculation Error:",f),this.currentTab="readiness",this.render();const w=this.container.querySelector(".geometry-preview-area");w&&(w.innerHTML=`
            <div class="empty-geom-state" style="border-color: #ef4444; color: #f87171;">
              <p><strong>SPICE Calculation Failed:</strong> ${f.message||f}</p>
            </div>
          `)}};(Ie=this.container.querySelector("#btn-eval-spice-tab"))==null||Ie.addEventListener("click",y),(ot=this.container.querySelector("#btn-eval-spice-footer"))==null||ot.addEventListener("click",y),(Me=this.container.querySelector("#btn-eval-horizon"))==null||Me.addEventListener("click",async()=>{if(!this.initialGeometry){this.horizonError="Please evaluate SPICE geometry first (Readiness & SPICE tab).",this.render();return}if(!this.selectedSite.isInsideSite01DEM){this.horizonError="Site is outside the Site 01 DEM footprint. Select Artemis Site 01 to enable terrain horizon analysis.",this.render();return}this.horizonLoading=!0,this.horizonError=null,this.render();try{const f=this.initialGeometry,[w,k]=await Promise.all([Es({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,angular_step_deg:2}),Si({latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM,instrument_height_m:2,sun_azimuth_deg:f.sun.azimuth_deg,sun_elevation_deg:f.sun.elevation_deg,sun_distance_km:f.sun.distance_km,earth_azimuth_deg:f.earth.azimuth_deg,earth_elevation_deg:f.earth.elevation_deg,earth_distance_km:f.earth.distance_km})]);this.horizonProfile=w,this.horizonVisibility=k,this.horizonLoading=!1,this.render(),setTimeout(()=>this.drawHorizonPolarChart(),60)}catch(f){this.horizonLoading=!1,this.horizonError=f.message??String(f),this.render()}}),this.currentTab==="horizon"&&this.horizonProfile&&setTimeout(()=>this.drawHorizonPolarChart(),60);const x=()=>{const f=this.toScenarioJSON(),w=new Blob([JSON.stringify(f,null,2)],{type:"application/json"}),k=URL.createObjectURL(w),$=document.createElement("a");$.href=k,$.download=`${this.scenarioName.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.json`,$.click(),URL.revokeObjectURL(k)};(he=this.container.querySelector("#btn-export-scenario"))==null||he.addEventListener("click",x),(_e=this.container.querySelector("#btn-open-export-panel-footer"))==null||_e.addEventListener("click",()=>this.openExportModal()),(qe=this.container.querySelector("#btn-open-full-export-dialog"))==null||qe.addEventListener("click",()=>this.openExportModal()),this.container.querySelectorAll(".btn-quick-export").forEach(f=>{f.addEventListener("click",()=>{const w=f.getAttribute("data-quick-fmt")||"pdf";this.openExportModal(w)})}),(We=this.container.querySelector("#btn-export-scenario-summary"))==null||We.addEventListener("click",x);const M=this.container.querySelector("#inp-windows-start-date"),C=this.container.querySelector("#inp-windows-end-date");M==null||M.addEventListener("change",()=>{M.value&&(this.landingWindowsStartDate=M.value)}),C==null||C.addEventListener("change",()=>{C.value&&(this.landingWindowsEndDate=C.value)}),this.container.querySelectorAll(".btn-window-preset").forEach(f=>{f.addEventListener("click",w=>{const $=w.currentTarget.dataset.preset;if($==="30d"){const U=new Date(this.timeline.startDate+"T00:00:00Z"),ge=new Date(U.getTime()+30*24*3600*1e3);this.landingWindowsStartDate=U.toISOString().slice(0,10),this.landingWindowsEndDate=ge.toISOString().slice(0,10)}else $==="q4-2026"?(this.landingWindowsStartDate="2026-10-01",this.landingWindowsEndDate="2026-12-31"):$==="q1-2027"&&(this.landingWindowsStartDate="2027-01-01",this.landingWindowsEndDate="2027-03-31");this.render()})}),this.container.querySelectorAll(".btn-window-filter").forEach(f=>{f.addEventListener("click",w=>{const $=w.currentTarget.dataset.filter;$&&(this.landingWindowsFilter=$,this.render())})});const P=async()=>{this.landingWindowsLoading=!0,this.landingWindowsError=null,this.render();try{const f=await yi({start_date:this.landingWindowsStartDate,end_date:this.landingWindowsEndDate,latitude_deg:this.selectedSite.latitudeDeg,longitude_deg:this.selectedSite.longitudeDeg,elevation_m:this.selectedSite.elevationM});this.landingWindowsResponse=f,this.landingWindowsLoading=!1,this.render()}catch(f){this.landingWindowsLoading=!1,this.landingWindowsError=f.message??String(f),this.render()}};(ie=this.container.querySelector("#btn-scan-landing-windows"))==null||ie.addEventListener("click",P),($e=this.container.querySelector("#btn-run-initial-scan"))==null||$e.addEventListener("click",P);const L=f=>{this.timeline.startDate=f,this.computeIsoTimestamps(),this.currentTab="timeline",this.render()};(Ye=this.container.querySelector("#btn-apply-best-window"))==null||Ye.addEventListener("click",f=>{const k=f.currentTarget.dataset.date;k&&L(k)}),this.container.querySelectorAll(".btn-apply-window-date").forEach(f=>{f.addEventListener("click",w=>{const $=w.currentTarget.dataset.date;$&&L($)})}),(Pe=this.container.querySelector("#btn-apply-3d-view"))==null||Pe.addEventListener("click",()=>{this.onSiteChangedCallback&&this.onSiteChangedCallback(this.selectedSite),this.close()})}drawHorizonPolarChart(){const e=document.getElementById("horizon-polar-canvas");if(!e||!this.horizonProfile)return;const i=this.horizonProfile,t=e.getContext("2d");if(!t)return;const s=e.width,a=e.height,d=s/2,r=a/2,p=Math.min(s,a)/2-32;t.clearRect(0,0,s,a),t.fillStyle="#0a0f1e",t.fillRect(0,0,s,a);const o=Math.max(...i.profile.map(g=>g.horizon_elevation_deg),10);[0,o*.25,o*.5,o*.75,o].forEach(g=>{const h=p*(1-g/o);t.beginPath(),t.arc(d,r,Math.max(h,1),0,2*Math.PI),t.strokeStyle="rgba(148,163,184,0.15)",t.lineWidth=1,t.stroke(),g>0&&(t.fillStyle="rgba(148,163,184,0.5)",t.font="10px Inter, sans-serif",t.fillText(`${g.toFixed(1)}°`,d+4,r-h+12))}),[["N",0],["E",90],["S",180],["W",270]].forEach(([g,h])=>{const v=(Number(h)-90)*Math.PI/180;t.beginPath(),t.moveTo(d,r),t.lineTo(d+p*Math.cos(v),r+p*Math.sin(v)),t.strokeStyle="rgba(148,163,184,0.2)",t.lineWidth=1,t.stroke(),t.fillStyle="#94a3b8",t.font="bold 11px Inter, sans-serif",t.fillText(String(g),d+(p+16)*Math.cos(v)-4,r+(p+16)*Math.sin(v)+4)}),t.beginPath(),i.profile.forEach((g,h)=>{const v=(g.azimuth_deg-90)*Math.PI/180,y=p*(1-Math.min(g.horizon_elevation_deg,o)/o),x=d+y*Math.cos(v),M=r+y*Math.sin(v);h===0?t.moveTo(x,M):t.lineTo(x,M)}),t.closePath(),t.fillStyle="rgba(56,189,248,0.15)",t.fill(),t.strokeStyle="#38bdf8",t.lineWidth=2,t.stroke();const m=this.horizonVisibility;if(m){const g=(h,v,y,x)=>{const M=(h-90)*Math.PI/180,C=p*(1-Math.max(0,Math.min(v,o))/o),P=d+C*Math.cos(M),L=r+C*Math.sin(M);t.beginPath(),t.arc(P,L,8,0,2*Math.PI),t.fillStyle=y,t.fill(),t.fillStyle="#fff",t.font="bold 10px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(x,P,L),t.textAlign="start",t.textBaseline="alphabetic"};g(m.sun.azimuth_deg,m.sun.geometric_elevation_deg,"#f59e0b","☀"),g(m.earth.azimuth_deg,m.earth.geometric_elevation_deg,"#3b82f6","🌍")}t.beginPath(),t.arc(d,r,4,0,2*Math.PI),t.fillStyle="#38bdf8",t.fill()}updateScrubbedReadout(e){var p,o;const i=this.container.querySelector("#scrubbed-time-val");i&&(i.textContent=e.timestamp_utc);const t=l=>{switch(l){case"full_sunlight":return'<span class="status-badge badge-green">☀️ Full Sunlight</span>';case"partial_sunlight":return'<span class="status-badge badge-amber">🌓 Penumbral / Grazing</span>';case"total_darkness":return'<span class="status-badge badge-slate">🌑 Total Darkness</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},s=l=>{switch(l){case"full_disc_los":return'<span class="status-badge badge-blue">🌍 Full Disc LOS</span>';case"centre_only_los":return'<span class="status-badge badge-cyan">📡 Centre-Only LOS</span>';case"partial_disc_los":return'<span class="status-badge badge-amber">🌓 Partial Disc LOS</span>';case"occulted":return'<span class="status-badge badge-red">🌑 Occulted</span>';default:return'<span class="status-badge badge-purple">❓ Unknown (Outside DEM)</span>'}},a=this.container.querySelector("#scrubbed-sun-state");a&&(a.innerHTML=t(e.sun.visibility_state));const d=this.container.querySelector("#scrubbed-earth-state");d&&(d.innerHTML=s(e.earth.visibility_state));const r=this.container.querySelector("#scrubbed-conditions-panel");if(r){const l=(p=r.querySelectorAll(".scrubbed-col")[0])==null?void 0:p.querySelectorAll(".scrubbed-val-row strong");if(l&&l.length>=4){l[0].textContent=`${e.sun.azimuth_deg.toFixed(2)}°`,l[1].textContent=`${e.sun.elevation_deg.toFixed(2)}°`,l[2].textContent=e.sun.terrain_horizon_elevation_deg!==null?`${e.sun.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const m=e.sun.angular_clearance_deg;l[3].textContent=m!==null?`${m>=0?"+":""}${m.toFixed(2)}°`:"—",l[3].style.color=(m??0)>=0?"#22c55e":"#ef4444"}const u=(o=r.querySelectorAll(".scrubbed-col")[1])==null?void 0:o.querySelectorAll(".scrubbed-val-row strong");if(u&&u.length>=4){u[0].textContent=`${e.earth.azimuth_deg.toFixed(2)}°`,u[1].textContent=`${e.earth.elevation_deg.toFixed(2)}°`,u[2].textContent=e.earth.terrain_horizon_elevation_deg!==null?`${e.earth.terrain_horizon_elevation_deg.toFixed(2)}°`:"—";const m=e.earth.angular_clearance_deg;u[3].textContent=m!==null?`${m>=0?"+":""}${m.toFixed(2)}°`:"—",u[3].style.color=(m??0)>=0?"#3b82f6":"#ef4444"}}}}class Us{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"scenarios",[]);b(this,"constraints",{min_sunlight_percent:50,min_earth_los_percent:70,max_slope_deg:12,max_continuous_darkness_hours:24});b(this,"comparisonResult",null);b(this,"isLoading",!1);b(this,"errorMessage",null);b(this,"exportPanel",null);b(this,"onInspectSiteOnGlobe");this.container=document.createElement("div"),this.container.id="candidate-comparison-modal",this.container.className="mission-modal hidden",document.body.appendChild(this.container),this.initDefaultScenarios()}openExportModal(){this.exportPanel||(this.exportPanel=new _i),this.exportPanel.openForComparison({reportTitle:"LUNAOPS Candidate-Site Comparison Analysis",scenarios:this.scenarios,constraints:this.constraints,rankingWeights:{sunlight:.35,earth_los:.25,slope:.2,max_darkness:.2},comparisonResult:this.comparisonResult})}setOnInspectSiteOnGlobe(e){this.onInspectSiteOnGlobe=e}open(){this.isOpen=!0,this.container.classList.remove("hidden"),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}getIsOpen(){return this.isOpen}toggle(){this.isOpen?this.close():this.open()}initDefaultScenarios(){this.scenarios=[{id:"candidate-a",name:"Artemis Site 01 — Peak Illumination",latitudeDeg:A[0].lat,longitudeDeg:A[0].lon,elevationM:A[0].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60},{id:"candidate-b",name:"Malapert Mountain — Topographic Massif",latitudeDeg:A[3].lat,longitudeDeg:A[3].lon,elevationM:A[3].elev,instrumentHeightM:2,startDate:"2026-10-16",startTime:"12:00:00",endDate:"2026-10-23",endTime:"12:00:00",stepMinutes:60}]}addScenario(e){var s,a,d,r;const i=A.find(p=>p.id===e)||A[0],t=this.scenarios.length+1;this.scenarios.push({id:`candidate-${Date.now()}`,name:`Candidate ${t} · ${i.name}`,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elev,instrumentHeightM:2,startDate:((s=this.scenarios[0])==null?void 0:s.startDate)||"2026-10-16",startTime:((a=this.scenarios[0])==null?void 0:a.startTime)||"12:00:00",endDate:((d=this.scenarios[0])==null?void 0:d.endDate)||"2026-10-23",endTime:((r=this.scenarios[0])==null?void 0:r.endTime)||"12:00:00",stepMinutes:60}),this.render()}removeScenario(e){if(this.scenarios.length<=2){alert("At least two candidate scenarios are required for side-by-side comparison.");return}this.scenarios=this.scenarios.filter(i=>i.id!==e),this.render()}async runComparison(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=this.scenarios.map(t=>({id:t.id,name:t.name,latitude_deg:t.latitudeDeg,longitude_deg:t.longitudeDeg,elevation_m:t.elevationM,instrument_height_m:t.instrumentHeightM,start_utc:`${t.startDate}T${t.startTime}Z`,end_utc:`${t.endDate}T${t.endTime}Z`,step_minutes:t.stepMinutes})),i=await _s({scenarios:e,constraints:this.constraints});this.comparisonResult=i}catch(e){this.errorMessage=e.message||"Comparison failed"}finally{this.isLoading=!1,this.render()}}render(){this.container.innerHTML=`
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
            ${this.scenarios.map((e,i)=>this.renderScenarioCard(e,i)).join("")}
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
    `,this.wireEvents(),this.comparisonResult&&this.drawSynchronizedTimelines()}renderScenarioCard(e,i){const t=e.latitudeDeg<=-89.4&&e.latitudeDeg>=-89.55&&e.longitudeDeg>=221&&e.longitudeDeg<=224;return`
    <div class="scenario-setup-card" data-id="${e.id}">
      <div class="scenario-card-header">
        <span class="scenario-number-tag">SCENARIO ${i+1}</span>
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
          ${A.map(s=>`<option value="${s.id}" ${s.name.includes(e.name.split("·")[0].trim())?"selected":""}>${s.name} (${s.lat}°S, ${s.lon}°E)</option>`).join("")}
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
              ${e.scenarios.map(i=>`<th>${i.scenario_name}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-header">📍 Selenographic Location</td>
              ${e.scenarios.map(i=>`
                <td>
                  <strong>${j(i.inputs.latitude_deg,i.inputs.longitude_deg)}</strong>
                  <br><button class="btn-mini-inspect" data-id="${i.scenario_id}">🎯 Focus 3D Moon</button>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">⏱ Mission Interval</td>
              ${e.scenarios.map(i=>`
                <td>
                  <span class="mono-sub">${i.inputs.start_utc.split("T")[0]} → ${i.inputs.end_utc.split("T")[0]}</span>
                  <br><span class="muted-text">(${i.timeline_result.mission_scenario.total_duration_hours.toFixed(0)} hours)</span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">🏔 Topographic DEM Coverage</td>
              ${e.scenarios.map(i=>`
                <td>
                  <span class="status-badge ${i.terrain_statistics.coverage_available?"badge-green":"badge-slate"}">
                    ${i.terrain_statistics.coverage_available?"NASA LOLA Site 01 (5 m/px)":"Outside DEM (Sphere Only)"}
                  </span>
                </td>
              `).join("")}
            </tr>
            <tr>
              <td class="row-header">☀️ Total Solar Illumination</td>
              ${e.scenarios.map(i=>{const t=i.timeline_result.summary.sunlight,s=(t.full_sunlight_percent+t.partial_sunlight_percent).toFixed(1),a=(t.full_sunlight_hours+t.partial_sunlight_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${s}%; background: #f59e0b;"></div></div>
                    <span class="muted-text">Full: ${t.full_sunlight_percent}% · Partial: ${t.partial_sunlight_percent}%</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">🌑 Continuous Darkness Max</td>
              ${e.scenarios.map(i=>{const t=i.timeline_result.summary.sunlight;return`
                  <td>
                    <strong>${t.max_continuous_darkness_hours.toFixed(1)} hrs</strong>
                    <br><span class="muted-text">Transitions: ${t.transition_count}</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📡 Direct-to-Earth LOS Clearance</td>
              ${e.scenarios.map(i=>{const t=i.timeline_result.summary.earth_los,s=(t.full_disc_los_percent+t.partial_disc_los_percent).toFixed(1),a=(t.full_disc_los_hours+t.partial_disc_los_hours).toFixed(1);return`
                  <td>
                    <div class="metric-highlight">${s}% <span class="unit">(${a} hrs)</span></div>
                    <div class="progress-bar-small"><div class="bar-fill" style="width: ${s}%; background: #38bdf8;"></div></div>
                    <span class="muted-text">Full disc: ${t.full_disc_los_percent}% · Max window: ${t.max_continuous_los_hours.toFixed(1)}h</span>
                  </td>
                `}).join("")}
            </tr>
            <tr>
              <td class="row-header">📐 Terrain Slope Statistics</td>
              ${e.scenarios.map(i=>{const t=i.terrain_statistics.slope;return t?`
                  <td>
                    <strong>${t.mean_deg.toFixed(1)}° mean</strong> (max ${t.max_deg.toFixed(1)}°)
                    <br><span class="muted-text">Std: ±${t.std_deg.toFixed(1)}° · Center: ${t.point_deg.toFixed(1)}°</span>
                  </td>
                `:'<td><span class="badge-slate">Unavailable (No DEM)</span><br><span class="muted-text">Site outside 16x16 km tile</span></td>'}).join("")}
            </tr>
            <tr>
              <td class="row-header">🎯 Elevation &amp; Uncertainty</td>
              ${e.scenarios.map(i=>{const t=i.terrain_statistics.elevation,s=i.terrain_statistics.uncertainty;return t?`
                  <td>
                    <strong>${t.mean_m.toFixed(1)} m</strong> <span class="muted-text">(range ${t.min_m.toFixed(0)}..${t.max_m.toFixed(0)}m)</span>
                    <br><span class="muted-text">Error: ±${s?s.mean_m.toFixed(2):"—"} m (LOLA)</span>
                  </td>
                `:`<td>${i.inputs.elevation_m.toFixed(1)} m <span class="muted-text">(User/Sphere)</span><br><span class="badge-slate">Uncertainty: Unavailable</span></td>`}).join("")}
            </tr>
            <tr>
              <td class="row-header">📋 Constraint Satisfaction</td>
              ${e.scenarios.map(i=>{const t=i.constraints_evaluation,s=t.all_met;return`
                  <td>
                    <span class="status-badge ${s?"badge-green":t.unmet_count>0?"badge-red":"badge-amber"}">
                      ${s?"✓ ALL CONSTRAINTS MET":`${t.met_count} Met / ${t.unmet_count} Unmet / ${t.unevaluable_count} Unevaluable`}
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
          ${e.ranking.ranking.map(i=>`
            <div class="ranking-card ${i.rank===1?"leader":""}">
              <div class="rank-tag">RANK ${i.rank}</div>
              <h5 class="rank-name">${i.scenario_name}</h5>
              <div class="rank-score-val">${i.composite_score.toFixed(1)} <span class="score-max">/ 100</span></div>

              ${i.has_unevaluable_metrics?`
                <div class="unevaluable-warning-box">
                  ⚠️ Contains unevaluable metrics:
                  <ul>
                    ${i.unevaluable_reasons.map(t=>`<li>${t}</li>`).join("")}
                  </ul>
                </div>
              `:`
                <div class="eval-success-note">✓ All criteria evaluated against 5m DEM &amp; SPICE ephemerides</div>
              `}

              <div class="criteria-score-breakdown">
                ${Object.entries(i.criteria_scores).map(([t,s])=>`
                  <div class="crit-row">
                    <span>${t.replace(/_/g," ")}:</span>
                    <span>${s!==null?`${s.toFixed(1)} pts`:'<span class="badge-slate">N/A</span>'}</span>
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
    `}drawSynchronizedTimelines(){const e=document.getElementById("synced-timeline-canvas");if(!e||!this.comparisonResult)return;const i=e.getContext("2d");if(!i)return;const t=e.width,s=e.height;i.clearRect(0,0,t,s);const a=this.comparisonResult.scenarios;if(a.length===0)return;const d=Math.floor((s-40)/a.length);i.fillStyle="#94a3b8",i.font="10px JetBrains Mono, monospace",i.fillText("MISSION TIMELINE EPOCHS",15,18),a.forEach((r,p)=>{const o=30+p*d,l=d-12;i.fillStyle="#e2e8f0",i.font="11px Inter, sans-serif",i.fillText(`${r.scenario_name}`,15,o-4),i.fillStyle="rgba(15, 23, 42, 0.6)",i.fillRect(15,o,t-30,l);const u=r.timeline_result.sun_windows,m=Date.parse(r.inputs.start_utc),h=Date.parse(r.inputs.end_utc)-m;h>0&&(u.forEach(y=>{const x=Date.parse(y.start_utc),M=Date.parse(y.end_utc),C=15+(x-m)/h*(t-30),P=15+(M-m)/h*(t-30),L=Math.max(1,P-C);y.state==="full_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.9)":y.state==="partial_sunlight"?i.fillStyle="rgba(245, 158, 11, 0.5)":y.state==="total_darkness"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(C,o,L,l/2-1)}),r.timeline_result.earth_windows.forEach(y=>{const x=Date.parse(y.start_utc),M=Date.parse(y.end_utc),C=15+(x-m)/h*(t-30),P=15+(M-m)/h*(t-30),L=Math.max(1,P-C);y.state==="full_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.9)":y.state==="centre_only_los"||y.state==="partial_disc_los"?i.fillStyle="rgba(56, 189, 248, 0.5)":y.state==="occulted"?i.fillStyle="rgba(30, 41, 59, 0.9)":i.fillStyle="rgba(147, 51, 234, 0.6)",i.fillRect(C,o+l/2+1,L,l/2-2)})),i.strokeStyle="rgba(148, 163, 184, 0.15)",i.strokeRect(15,o,t-30,l)})}wireEvents(){var e,i,t,s,a,d,r,p;(e=document.getElementById("btn-close-comparison"))==null||e.addEventListener("click",()=>{this.close()}),(i=document.getElementById("btn-add-candidate"))==null||i.addEventListener("click",()=>{this.addScenario()}),(t=document.getElementById("btn-sync-dates"))==null||t.addEventListener("click",()=>{if(this.scenarios.length>=2){const o=this.scenarios[0];for(let l=1;l<this.scenarios.length;l++)this.scenarios[l].startDate=o.startDate,this.scenarios[l].startTime=o.startTime,this.scenarios[l].endDate=o.endDate,this.scenarios[l].endTime=o.endTime;this.render()}}),(s=document.getElementById("btn-run-comparison"))==null||s.addEventListener("click",()=>{this.runComparison()}),this.container.querySelectorAll(".btn-remove-scenario").forEach(o=>{o.addEventListener("click",l=>{const u=l.currentTarget.getAttribute("data-id");u&&this.removeScenario(u)})}),this.container.querySelectorAll(".select-preset").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=u.getAttribute("data-id"),g=u.value,h=A.find(v=>v.id===g);if(m&&h){const v=this.scenarios.find(y=>y.id===m);v&&(v.name=h.name,v.latitudeDeg=h.lat,v.longitudeDeg=h.lon,v.elevationM=h.elev,this.render())}})}),this.container.querySelectorAll(".input-sc-name").forEach(o=>{o.addEventListener("input",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.name=u.value)})}),this.container.querySelectorAll(".input-lat").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.latitudeDeg=parseFloat(u.value)||-90)})}),this.container.querySelectorAll(".input-lon").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.longitudeDeg=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-elev").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.elevationM=parseFloat(u.value)||0)})}),this.container.querySelectorAll(".input-start-date").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.startDate=u.value)})}),this.container.querySelectorAll(".input-end-date").forEach(o=>{o.addEventListener("change",l=>{const u=l.currentTarget,m=this.scenarios.find(g=>g.id===u.getAttribute("data-id"));m&&(m.endDate=u.value)})}),(a=document.getElementById("constraint-min-sun"))==null||a.addEventListener("change",o=>{const l=o.currentTarget.value;this.constraints.min_sunlight_percent=l!==""?parseFloat(l):null}),(d=document.getElementById("constraint-min-earth"))==null||d.addEventListener("change",o=>{const l=o.currentTarget.value;this.constraints.min_earth_los_percent=l!==""?parseFloat(l):null}),(r=document.getElementById("constraint-max-slope"))==null||r.addEventListener("change",o=>{const l=o.currentTarget.value;this.constraints.max_slope_deg=l!==""?parseFloat(l):null}),(p=document.getElementById("constraint-max-dark"))==null||p.addEventListener("change",o=>{const l=o.currentTarget.value;this.constraints.max_continuous_darkness_hours=l!==""?parseFloat(l):null}),this.container.querySelectorAll(".btn-inspect-globe, .btn-mini-inspect").forEach(o=>{o.addEventListener("click",l=>{const u=l.currentTarget.getAttribute("data-id"),m=this.scenarios.find(g=>g.id===u);m&&this.onInspectSiteOnGlobe&&this.onInspectSiteOnGlobe({name:m.name,lat:m.latitudeDeg,lon:m.longitudeDeg,elevationM:m.elevationM})})})}}const De=1.6,xi=1737.4,Lt=-8.9815,Ci=10.6855,Hs=Ci-Lt,li=512,js=132361;let Q=null,N,pe=null,ee=null,B=null,K=null,oe=null,z=null,H=null,Ze=!1,ct=.6,Je=!1,Ne=!1,Be=null,ci=null,dt=null,ye=null,J=null;function mt(n,e,i=1.2){J={startPos:te.position.clone(),targetPos:n.clone(),startLook:W.target.clone(),targetLook:e.clone(),startTime:performance.now(),duration:i*1e3}}const Ge=document.createElement("canvas"),Bs=document.getElementById("app");Bs.appendChild(Ge);const Z=new es({canvas:Ge,antialias:!0,powerPreference:"high-performance"});Z.setSize(window.innerWidth,window.innerHeight);Z.setPixelRatio(Math.min(window.devicePixelRatio,2));Z.outputColorSpace=mi;Z.toneMapping=ts;Z.toneMappingExposure=.95;Z.shadowMap.enabled=!1;const Le=new is;Le.background=new ss(js);const te=new as(36,window.innerWidth/window.innerHeight,.01,500);te.position.set(0,.2,4);const W=new ws(te,Z.domElement);W.enableDamping=!0;W.dampingFactor=.06;W.minDistance=1.75;W.maxDistance=12;W.enablePan=!1;W.rotateSpeed=.45;W.zoomSpeed=.7;let It=!1;W.addEventListener("start",()=>{It=!0});W.addEventListener("end",()=>{It=!1});const Gs=new ns(395539,.04);Le.add(Gs);const at=new hi(16775406,3.4);at.position.set(5,1.2,3.2);Le.add(at);const $t=new hi(2241365,.035);$t.position.set(-5,0,-3.2);Le.add($t);const nt=new os(Z),qs=new rs(Le,te);nt.addPass(qs);const Ti=new ls(new O(window.innerWidth,window.innerHeight),.08,.4,.92);nt.addPass(Ti);const Ws={uniforms:{tDiffuse:{value:null},offset:{value:.95},darkness:{value:1.15}},vertexShader:`
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
  `},Ys=new cs(Ws);nt.addPass(Ys);function Vs(){[{count:1200,rMin:70,rMax:110,size:.035,opacity:.45},{count:1800,rMin:110,rMax:160,size:.05,opacity:.65},{count:350,rMin:45,rMax:70,size:.09,opacity:.85}].forEach(({count:e,rMin:i,rMax:t,size:s,opacity:a})=>{const d=new Float32Array(e*3);for(let o=0;o<e;o++){const l=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1),m=i+Math.random()*(t-i);d[o*3]=m*Math.sin(u)*Math.cos(l),d[o*3+1]=m*Math.sin(u)*Math.sin(l),d[o*3+2]=m*Math.cos(u)}const r=new re;r.setAttribute("position",new ps(d,3));const p=new us({size:s,color:14215423,transparent:!0,opacity:a,sizeAttenuation:!0});Le.add(new ms(r,p))})}Vs();const st=document.createElement("div");st.id="loading-overlay";st.innerHTML=`
  <div class="loader-content">
    <div class="spinner"></div>
    <p class="loader-text">LUNAOPS</p>
    <p class="loader-sub" id="load-status">Initializing lunar geodetic models &amp; SPICE kernels…</p>
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
  </div>
`;document.body.appendChild(st);function ke(n,e){const i=document.getElementById("load-status");if(i&&(i.textContent=n),e!==void 0){const t=document.getElementById("progress-fill");t&&(t.style.width=`${Math.min(100,e)}%`)}}function Xs(){st.style.opacity="0",setTimeout(()=>st.remove(),700)}const Ks=1.8;function Zs(n,e){return new vs({map:n,normalMap:e||void 0,normalScale:e?new O(.5,.5):void 0,roughness:.94,metalness:0,envMapIntensity:0})}function Js(n,e,i,t,s){const a=(n%1+1)%1*(i-1),d=Ct.clamp(1-e,0,1)*(t-1),r=Math.floor(a),p=(r+1)%i,o=Math.floor(d),l=Math.min(o+1,t-1),u=a-r,m=d-o,g=s[(o*i+r)*4]/255,h=s[(o*i+p)*4]/255,v=s[(l*i+r)*4]/255,y=s[(l*i+p)*4]/255,x=g*(1-u)+h*u,M=v*(1-u)+y*u,C=x*(1-m)+M*m;return Lt+C*Hs}function Qs(n,e){const i=n.attributes.position,t=n.attributes.uv,s=i.count,a=document.createElement("canvas");a.width=e.width,a.height=e.height;const d=a.getContext("2d");d.drawImage(e,0,0);const p=d.getImageData(0,0,a.width,a.height).data;ci=new Float32Array(i.array.length),ci.set(i.array),Be=new Float32Array(s),dt=new Float32Array(i.array.length);const o=new E,l=new E,u=Ks;for(let m=0;m<s;m++){o.fromBufferAttribute(i,m);const g=t.getX(m),h=t.getY(m),v=Js(g,h,a.width,a.height,p);Be[m]=v;const y=v/xi*De;l.copy(o).normalize();const x=o.clone().add(l.clone().multiplyScalar(y));dt[m*3]=x.x,dt[m*3+1]=x.y,dt[m*3+2]=x.z,o.add(l.multiplyScalar(y*u)),i.setXYZ(m,o.x,o.y,o.z)}i.needsUpdate=!0,n.computeVertexNormals(),n.computeBoundingSphere()}function ea(n){return n.colorSpace=mi,n.anisotropy=Z.capabilities.getMaxAnisotropy(),n.minFilter=fs,n.magFilter=Ss,n.generateMipmaps=!0,n.wrapS=gi,n.wrapT=vi,n.needsUpdate=!0,n}const di=new ds;async function ta(){const n=new URL("/assets/lroc_color_2k-CuNckXFP.jpg",import.meta.url).href,e=[{url:"/generated/lroc_color_4k.webp",label:"NASA LROC 4K (WebP)",is4K:!0},{url:"/generated/lroc_color_4k.jpg",label:"NASA LROC 4K (JPEG)",is4K:!0},{url:"/generated/lroc_color_2k.jpg",label:"NASA LROC 2K",is4K:!1},{url:n,label:"NASA LROC 2K",is4K:!1}];let i=null,t="NASA LROC 2K",s=!1;for(const r of e)try{ke(`Loading ${r.label}…`,25),i=await new Promise((p,o)=>{di.load(r.url,l=>p(l),void 0,l=>o(l))}),ea(i),t=r.label,s=r.is4K;break}catch{}if(!i)throw new Error("All color texture candidates failed to load.");ke("Loading LOLA normal map…",50);let a=null;try{a=await new Promise((r,p)=>{di.load("/generated/ldem_normal_map_half.png",o=>{o.colorSpace=gs,o.anisotropy=Z.capabilities.getMaxAnisotropy(),o.wrapS=gi,o.wrapT=vi,r(o)},void 0,p)})}catch{console.warn("[LUNAOPS] Normal map unavailable.")}ke("Loading LOLA DEM topography…",75);let d=null;try{d=await new Promise((r,p)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>r(o),o.onerror=p,o.src="/generated/ldem_displacement_8bit.png"})}catch{console.warn("[LUNAOPS] Displacement map unavailable.")}return{color:i,colorLabel:t,is4K:s,normal:a,dispImg:d}}let ki={is4K:!0};async function ia(){const n=await ta();ki={label:n.colorLabel,is4K:n.is4K};const e=document.getElementById("telem-color");e&&(e.textContent=n.is4K?"NASA LROC 4K":"NASA LROC 2K"),ke("Generating lunar mesh…",85),await new Promise(s=>setTimeout(s,40));const i=new Fe(De,li,li/2);n.dispImg&&Qs(i,n.dispImg),ke("Configuring shaders…",95),await new Promise(s=>setTimeout(s,40));const t=Zs(n.color,n.normal);Q=new q(i,t),Q.castShadow=!1,Q.receiveShadow=!1,N=new ce,N.rotation.x=Ct.degToRad(6.68),N.add(Q),pe=new Rs(De),pe.setOnSelectSite(s=>{we({name:s.name,designation:s.designation,latitudeDeg:s.lat,longitudeDeg:s.lon,elevationM:s.elevationM,isInsideSite01DEM:!!s.isInsideSite01DEM})}),N.add(pe.group),sa(),aa(),Le.add(N),ke("Ready",100),setTimeout(Xs,400)}function sa(){z=new ce,z.name="HoverReticle",z.visible=!1;const n=new Ue(.012,.015,32);n.rotateX(Math.PI/2);const e=new X({color:3718648,side:Te,transparent:!0,opacity:.8}),i=new q(n,e);z.add(i);const t=new bs(.003,16);t.rotateX(Math.PI/2);const s=new X({color:16777215,side:Te});z.add(new q(t,s)),N.add(z)}function aa(){H=new ce,H.name="PendingSelectionMarker",H.visible=!1;const n=new Ue(.018,.024,32);n.rotateX(Math.PI/2);const e=new X({color:16096779,side:Te,transparent:!0,opacity:.95});H.add(new q(n,e));const i=new re().setFromPoints([new E(0,0,0),new E(0,.06,0)]),t=new fe({color:16096779,transparent:!0,opacity:.85});H.add(new xe(i,t)),N.add(H)}ia().catch(n=>{console.error("[LUNAOPS] Build error:",n),ke("Failed to initialize — see console",0)});const Pt=document.createElement("div");Pt.id="ui-layer";Pt.innerHTML=`
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
    <span class="telem-item"><span class="telem-label">TEXTURE</span> <span id="telem-color">${ki.is4K?"NASA LROC 4K":"NASA LROC 2K"}</span></span>
    <span class="telem-item"><span class="telem-label">SPICE EPHEMERIS</span> <span id="telem-spice-status">ACTIVE</span></span>
    <span class="telem-item"><span class="telem-label">ELEVATION</span> ${Lt.toFixed(1)} to +${Ci.toFixed(1)} km</span>
    <span class="telem-item"><span class="telem-label">DATUM</span> R = ${xi} km</span>
    <span class="telem-item"><span class="telem-label">SOLAR TERMINATOR</span> <span id="telem-sun-az">—</span></span>
    <span class="telem-item"><span class="telem-label">EPOCH UTC</span> <span id="utc-clock">2026-10-16T12:00:00Z</span></span>
  </div>
  <p class="info-line">Drag to rotate · Scroll to zoom · Click Moon surface to sample coordinates · Shortcuts: [P] South Pole · [Space] Rotate · [R] Reset · [M] Workspace · [C] Compare</p>
</div>
`;document.body.appendChild(Pt);Ls({sunLight:at,earthshineLight:$t});ee=new Ns;ee.setOnSelect(n=>{we({name:n.name,designation:n.designation,latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:n.elevationM,isInsideSite01DEM:n.isInsideSite01DEM,demDatasetName:n.isInsideSite01DEM?"NASA LOLA Artemis Site 01 (5 m/px)":"Global LOLA (~60 m/px)"})});B=new zs;document.getElementById("btn-new-mission").addEventListener("click",()=>{B==null||B.toggle()});K=new Us;document.getElementById("btn-compare-sites").addEventListener("click",()=>{K==null||K.toggle()});K.setOnInspectSiteOnGlobe(n=>{we({name:n.name,designation:"Candidate Site",latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:n.elevationM,isInsideSite01DEM:n.lat<=-89.4&&n.lat>=-89.55&&n.lon>=221&&n.lon<=224})});B.setOnSiteChanged(n=>{Di(n)});B.setOnTimelineScrubbed(n=>{const[e,i,t]=Mt(n.sun.direction_unit),s=8;at.position.set(e*s,i*s,t*s);const a=document.getElementById("telem-sun-az");a&&(a.textContent=`${n.sun.azimuth_deg.toFixed(1)}° / ${n.sun.elevation_deg.toFixed(1)}°`);const d=document.getElementById("utc-clock");d&&(d.textContent=n.timestamp_utc),Ds(n.timestamp_utc)});function we(n,e=!0){Di(n);const i=V.find(t=>Math.abs(t.lat-n.latitudeDeg)<.05&&Math.abs(t.lon-n.longitudeDeg)<.05);pe&&pe.highlightSite(i?i.id:null),ee&&ee.setSelectedSite(i?i.id:null,n.latitudeDeg,n.longitudeDeg),document.querySelectorAll(".cand-btn").forEach(t=>{t.classList.toggle("active",(i==null?void 0:i.id)===t.dataset.site)}),B&&B.setCoordinatesFromGlobe(n.latitudeDeg,n.longitudeDeg),e&&N&&na(n.latitudeDeg,n.longitudeDeg)}function Di(n){if(!N)return;if(!oe){oe=new ce,oe.name="TargetSiteMarker";const r=new Ue(.018,.024,32);r.rotateX(Math.PI/2);const p=new X({color:3718648,side:Te,transparent:!0,opacity:.95});oe.add(new q(r,p));const o=new Fe(.005,16,16),l=new X({color:16777215});oe.add(new q(o,l));const u=new re().setFromPoints([new E(0,0,0),new E(0,.07,0)]),m=new fe({color:3718648,transparent:!0,opacity:.9});oe.add(new xe(u,m)),N.add(oe)}const e=Ce(n.latitudeDeg,n.longitudeDeg,De*1.002);oe.position.copy(e);const i=e.clone().normalize();oe.quaternion.setFromUnitVectors(new E(0,1,0),i);const t=document.getElementById("active-site-display");t&&(t.textContent=`${n.name} · ${n.designation}`);const s=document.getElementById("readout-coords"),a=document.getElementById("readout-elev"),d=document.getElementById("readout-pole-dist");if(s&&(s.textContent=j(n.latitudeDeg,n.longitudeDeg)),a&&(a.textContent=`${n.elevationM>=0?"+":""}${(n.elevationM/1e3).toFixed(2)} km`),d){const r=it(n.latitudeDeg);d.textContent=`${r.toFixed(1)} km to 90°S`}_t(n.latitudeDeg,n.longitudeDeg,`${n.name} · ${n.designation}`)}function na(n,e){N.updateMatrixWorld(!0);const t=Ce(n,e,De).clone().applyMatrix4(N.matrixWorld),s=t.clone().normalize(),a=t.clone().add(s.clone().multiplyScalar(.85));mt(a,t,1.2)}function Li(){if(Ne=!Ne,document.getElementById("btn-south-pole").classList.toggle("active",Ne),ee&&(Ne?ee.open():ee.close()),Ne){N.updateMatrixWorld(!0);const i=new E(0,-De,0).clone().applyMatrix4(N.matrixWorld),s=i.clone().normalize().clone().multiplyScalar(2.65);s.addScaledVector(new E(1,0,0),.15),s.addScaledVector(new E(0,0,1),.15),mt(s,i,1.3)}else mt(new E(0,.2,4),new E(0,0,0),1.1)}document.getElementById("btn-south-pole").addEventListener("click",Li);document.getElementById("btn-reset").addEventListener("click",()=>{var n;Ne=!1,(n=document.getElementById("btn-south-pole"))==null||n.classList.remove("active"),ee==null||ee.close(),mt(new E(0,.2,4),new E(0,0,0),1)});document.getElementById("btn-auto").addEventListener("click",()=>{Ze=!Ze;const n=document.getElementById("btn-auto");n.textContent=Ze?"⏸ Auto-Rotate":"▶ Auto-Rotate",n.classList.toggle("active",Ze)});document.getElementById("btn-sun").addEventListener("click",()=>{Je=!Je;const n=document.getElementById("btn-sun");n.classList.toggle("active",Je),n.textContent=Je?"☀ Sun Cycle ●":"☀ Sun Cycle"});document.querySelectorAll(".cand-btn").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.site,i=V.find(t=>t.id===e);i&&we({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM})})});const vt=document.getElementById("coords-modal");document.getElementById("btn-manual-coords").addEventListener("click",()=>{vt.style.display="flex"});document.getElementById("btn-close-coords-modal").addEventListener("click",()=>{vt.style.display="none"});document.getElementById("btn-cancel-manual-coords").addEventListener("click",()=>{vt.style.display="none"});const At=document.getElementById("manual-lat"),Ot=document.getElementById("manual-lon"),tt=document.getElementById("coords-error-msg"),oa=document.getElementById("coords-preview-line");function Ii(){const n=kt(At.value,Ot.value);if(!n.valid)tt.textContent=n.error||"Invalid coordinates.",tt.style.display="block";else{tt.style.display="none";const e=n.lat<=-80,i=it(n.lat);oa.innerHTML=`Format: <strong>${j(n.lat,n.lon)}</strong><br />Region: <strong>${e?"South Polar Region (80°S-90°S)":"Equatorial/Mid-Latitude"}</strong> · Distance to Pole: <strong>${i.toFixed(1)} km</strong>`}}At.addEventListener("input",Ii);Ot.addEventListener("input",Ii);document.getElementById("btn-apply-manual-coords").addEventListener("click",()=>{const n=kt(At.value,Ot.value);if(!n.valid){tt.textContent=n.error||"Invalid coordinates.",tt.style.display="block";return}vt.style.display="none",we({name:"Manual Coordinate Target",designation:j(n.lat,n.lon),latitudeDeg:n.lat,longitudeDeg:n.lon,elevationM:0,isInsideSite01DEM:n.lat<=-89.4&&n.lat>=-89.55&&n.lon>=221&&n.lon<=224})});const ht=new ui,gt=new O;let $i=new O,Pi=0,Rt=!1,Nt=!1;Ge.addEventListener("pointerdown",n=>{$i.set(n.clientX,n.clientY),Pi=performance.now(),Rt=!1});Ge.addEventListener("pointermove",n=>{$i.distanceTo(new O(n.clientX,n.clientY))>5&&(Rt=!0),gt.x=n.clientX/window.innerWidth*2-1,gt.y=-(n.clientY/window.innerHeight)*2+1,Nt=!0});Ge.addEventListener("pointerleave",()=>{Nt=!1,z&&(z.visible=!1)});Ge.addEventListener("click",n=>{if(Rt||performance.now()-Pi>350)return;if(pe){const i=pe.handleClick(n,te);if(i){we({name:i.name,designation:i.designation,latitudeDeg:i.lat,longitudeDeg:i.lon,elevationM:i.elevationM,isInsideSite01DEM:!!i.isInsideSite01DEM});return}}if(!Q)return;ht.setFromCamera(gt,te);const e=ht.intersectObject(Q);if(e.length>0){const i=e[0],t=Q.worldToLocal(i.point.clone()),{latDeg:s,lonDeg:a}=Ei(t),d=document.getElementById("readout-coords");d&&!ye&&(d.textContent=j(s,a));let r=0;if(i.face&&Be&&(r=Be[i.face.a]??0),ye={latDeg:s,lonDeg:a,elevKm:r},H){const m=Ce(s,a,De*1.002);H.position.copy(m);const g=m.clone().normalize();H.quaternion.setFromUnitVectors(new E(0,1,0),g),H.visible=!0}const p=document.getElementById("selection-confirm-toast"),o=document.getElementById("toast-coords-text"),l=document.getElementById("toast-elev-text");o.textContent=j(s,a);const u=it(s);l.textContent=`Elevation: ${r>=0?"+":""}${r.toFixed(2)} km · Distance to 90°S: ${u.toFixed(1)} km`,p.style.display="block"}});document.getElementById("btn-confirm-site").addEventListener("click",()=>{if(ye){const{latDeg:n,lonDeg:e,elevKm:i}=ye;we({name:"Custom Lunar Target",designation:j(n,e),latitudeDeg:n,longitudeDeg:e,elevationM:i*1e3})}document.getElementById("selection-confirm-toast").style.display="none",H&&(H.visible=!1),ye=null});document.getElementById("btn-cancel-site").addEventListener("click",()=>{document.getElementById("selection-confirm-toast").style.display="none",H&&(H.visible=!1),ye=null});function ra(){if(!Nt||!Q||!z){z&&(z.visible=!1);return}ht.setFromCamera(gt,te);const n=ht.intersectObject(Q);if(n.length>0){const e=n[0],i=Q.worldToLocal(e.point.clone()),{latDeg:t,lonDeg:s}=Ei(i),a=document.getElementById("readout-coords");a&&!ye&&(a.textContent=j(t,s));const d=i.clone().normalize();if(z.position.copy(i.clone().multiplyScalar(1.0015)),z.quaternion.setFromUnitVectors(new E(0,1,0),d),z.visible=!0,e.face&&Be){const r=Be[e.face.a],p=document.getElementById("readout-elev");p&&!ye&&(p.textContent=`${r>=0?"+":""}${r.toFixed(2)} km`)}}else z.visible=!1}window.addEventListener("keydown",n=>{var e,i,t;if(!(n.target instanceof HTMLInputElement||n.target instanceof HTMLTextAreaElement))switch(n.key.toLowerCase()){case" ":n.preventDefault(),(e=document.getElementById("btn-auto"))==null||e.click();break;case"p":n.preventDefault(),Li();break;case"r":n.preventDefault(),(i=document.getElementById("btn-reset"))==null||i.click();break;case"s":n.preventDefault(),(t=document.getElementById("btn-sun"))==null||t.click();break;case"m":n.preventDefault(),B==null||B.toggle();break;case"c":n.preventDefault(),K==null||K.toggle();break}});function la(){const n=window.innerWidth,e=window.innerHeight;te.aspect=n/e,te.updateProjectionMatrix(),Z.setSize(n,e),nt.setSize(n,e),Ti.resolution.set(n,e)}window.addEventListener("resize",la);we({name:"Artemis Site 01",designation:"Shackleton–de Gerlache Connecting Ridge",latitudeDeg:-89.463,longitudeDeg:222.51,elevationM:1100},!1);const pi=new hs;function Ai(){requestAnimationFrame(Ai);const n=pi.getDelta(),e=pi.getElapsedTime();if(W.update(),J){const t=performance.now()-J.startTime,s=Math.min(1,t/J.duration),a=s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2;te.position.lerpVectors(J.startPos,J.targetPos,a),W.target.lerpVectors(J.startLook,J.targetLook,a),W.update(),s>=1&&(J=null)}pe&&pe.update(e);const i=!!(B!=null&&B.getIsOpen())||!!(K!=null&&K.getIsOpen());if(N&&Ze&&!It&&!J&&!i&&(N.rotation.y+=.02*n),Je){ct+=.12*n;const t=8;at.position.set(Math.cos(ct)*t,Math.sin(ct*.25)*2,Math.sin(ct)*t)}ra(),nt.render()}Ai();
