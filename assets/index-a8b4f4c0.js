(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const Js="parameters",Ic={torsoOffsetPercentage:3,torsoThickCount:120,torsoThickRadius:.4,torsoMediumCount:8,torsoMediumRadius:.2,torsoSmallCount:15,torsoSmallRadius:.1,limbsOffsetPercentage:1,limbsThickCount:60,limbsThickRadius:.4,limbsMediumCount:8,limbsMediumRadius:.2,limbsSmallCount:15,limbsSmallRadius:.05,cameraZ:6,cameraZoom:100,amountShapes:3,minPosesScore:20,videoDeviceId:""},Nc="{}";function Uc(){window.localStorage.getItem(Js)||xl()}function xl(){const o=JSON.stringify(Ic);window.localStorage.setItem(Js,o)}function Qn(){const o=window.localStorage.getItem(Js)??Nc;return JSON.parse(o)}function zc(o){const t=JSON.stringify(o);window.localStorage.setItem(Js,t)}const Xs={width:640,height:480};function Fc(o,t=Xs.width,e=Xs.height){return new Promise((n,i)=>{navigator!=null&&navigator.mediaDevices||i("No media devices"),navigator.mediaDevices.getUserMedia({video:{deviceId:o,width:t,height:e}}).then(s=>{const r=document.createElement("video");r.srcObject=s,r.onloadedmetadata=()=>{r.play(),n(r)}}).catch(i)})}async function yl(){return navigator!=null&&navigator.mediaDevices?(await navigator.mediaDevices.enumerateDevices()).filter(({kind:t})=>t==="videoinput"):[]}async function Ml(){var n;const t=((n=(await yl())[0])==null?void 0:n.deviceId)??null,{videoDeviceId:e}=Qn();return e??t}function js(o,t){return Math.floor(Math.random()*(t-o+1))+o}function Ye(o,t){return Math.random()*(t-o)+o}function Sl(o=[]){if(!o.length)return;const t=js(0,o.length-1);return o[t]}function wl(o,t=e=>e){let e=0;for(let n=0;n<o.length;n++){const i=t(o[n]);e+=i}return e}function gs(o){return wl(o)/o.length}function Oc(o){return!isNaN(parseFloat(o))}const{poseDetection:bo}=window;let $r,Zr,cr=!1;async function Bc(){const o=bo.SupportedModels.BlazePose,t={runtime:"mediapipe",solutionPath:"https://cdn.jsdelivr.net/npm/@mediapipe/pose"};return await bo.createDetector(o,t)}async function Vc(){try{const o=await Ml();$r=await Fc(o),Zr=await Bc()}catch(o){console.error(o)}}async function Gc(){if(!(Zr&&$r))return[];const o=await Zr.estimatePoses($r,{});if(!(o!=null&&o.length))return[];const{keypoints:t}=o[0],e=wl(t,i=>(i==null?void 0:i.score)??0),{minPosesScore:n}=Qn();return e<n?[]:o}async function kc(){const o=await Gc(),t=!!o.length,e=!t&&cr,n=t&&!cr;return cr=t,{poses:o,posesLost:e,posesFound:n}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ao="151",Hc=0,Eo=1,Wc=2,bl=1,qc=2,Ki=3,Pn=0,Le=1,_n=2,Cn=0,bi=1,To=2,Ao=3,Co=4,Xc=5,yi=100,jc=101,Yc=102,Lo=103,Po=104,Kc=200,$c=201,Zc=202,Jc=203,El=204,Tl=205,Qc=206,tu=207,eu=208,nu=209,iu=210,su=0,ru=1,ou=2,Jr=3,au=4,lu=5,cu=6,uu=7,Al=0,hu=1,du=2,yn=0,fu=1,pu=2,mu=3,gu=4,vu=5,Cl=300,Pi=301,Ri=302,Qr=303,to=304,Qs=306,eo=1e3,qe=1001,no=1002,Me=1003,Ro=1004,ur=1005,Ae=1006,_u=1007,ts=1008,Yn=1009,xu=1010,yu=1011,Ll=1012,Mu=1013,Wn=1014,qn=1015,es=1016,Su=1017,wu=1018,Ei=1020,bu=1021,Xe=1023,Eu=1024,Tu=1025,Xn=1026,Di=1027,Au=1028,Cu=1029,Lu=1030,Pu=1031,Ru=1033,hr=33776,dr=33777,fr=33778,pr=33779,Do=35840,Io=35841,No=35842,Uo=35843,Du=36196,zo=37492,Fo=37496,Oo=37808,Bo=37809,Vo=37810,Go=37811,ko=37812,Ho=37813,Wo=37814,qo=37815,Xo=37816,jo=37817,Yo=37818,Ko=37819,$o=37820,Zo=37821,mr=36492,Iu=36283,Jo=36284,Qo=36285,ta=36286,Kn=3e3,qt=3001,Nu=3200,Uu=3201,Pl=0,zu=1,sn="srgb",ns="srgb-linear",Rl="display-p3",gr=7680,Fu=519,ea=35044,na="300 es",io=1035;class Ni{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ia=1234567;const Ji=Math.PI/180,is=180/Math.PI;function Ui(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ge[o&255]+ge[o>>8&255]+ge[o>>16&255]+ge[o>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]).toLowerCase()}function Se(o,t,e){return Math.max(t,Math.min(e,o))}function lo(o,t){return(o%t+t)%t}function Ou(o,t,e,n,i){return n+(o-t)*(i-n)/(e-t)}function Bu(o,t,e){return o!==t?(e-o)/(t-o):0}function Qi(o,t,e){return(1-e)*o+e*t}function Vu(o,t,e,n){return Qi(o,t,1-Math.exp(-e*n))}function Gu(o,t=1){return t-Math.abs(lo(o,t*2)-t)}function ku(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*(3-2*o))}function Hu(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*o*(o*(o*6-15)+10))}function Wu(o,t){return o+Math.floor(Math.random()*(t-o+1))}function qu(o,t){return o+Math.random()*(t-o)}function Xu(o){return o*(.5-Math.random())}function ju(o){o!==void 0&&(ia=o);let t=ia+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Yu(o){return o*Ji}function Ku(o){return o*is}function so(o){return(o&o-1)===0&&o!==0}function $u(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function Dl(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function Zu(o,t,e,n,i){const s=Math.cos,r=Math.sin,a=s(e/2),l=r(e/2),c=s((t+n)/2),u=r((t+n)/2),d=s((t-n)/2),h=r((t-n)/2),p=s((n-t)/2),g=r((n-t)/2);switch(i){case"XYX":o.set(a*u,l*d,l*h,a*c);break;case"YZY":o.set(l*h,a*u,l*d,a*c);break;case"ZXZ":o.set(l*d,l*h,a*u,a*c);break;case"XZX":o.set(a*u,l*g,l*p,a*c);break;case"YXY":o.set(l*p,a*u,l*g,a*c);break;case"ZYZ":o.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $i(o,t){switch(t.constructor){case Float32Array:return o;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Te(o,t){switch(t.constructor){case Float32Array:return o;case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Ju={DEG2RAD:Ji,RAD2DEG:is,generateUUID:Ui,clamp:Se,euclideanModulo:lo,mapLinear:Ou,inverseLerp:Bu,lerp:Qi,damp:Vu,pingpong:Gu,smoothstep:ku,smootherstep:Hu,randInt:Wu,randFloat:qu,randFloatSpread:Xu,seededRandom:ju,degToRad:Yu,radToDeg:Ku,isPowerOfTwo:so,ceilPowerOfTwo:$u,floorPowerOfTwo:Dl,setQuaternionFromProperEuler:Zu,normalize:Te,denormalize:$i};class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,s,r,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],v=i[0],m=i[3],f=i[6],_=i[1],M=i[4],y=i[7],w=i[2],A=i[5],P=i[8];return s[0]=r*v+a*_+l*w,s[3]=r*m+a*M+l*A,s[6]=r*f+a*y+l*P,s[1]=c*v+u*_+d*w,s[4]=c*m+u*M+d*A,s[7]=c*f+u*y+d*P,s[2]=h*v+p*_+g*w,s[5]=h*m+p*M+g*A,s[8]=h*f+p*y+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*r*u-e*a*c-n*s*u+n*a*l+i*s*c-i*r*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*r-a*c,h=a*l-u*s,p=c*s-r*l,g=e*d+n*h+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*c-u*n)*v,t[2]=(a*n-i*r)*v,t[3]=h*v,t[4]=(u*e-i*l)*v,t[5]=(i*s-a*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(r*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*a)+r+t,-i*c,i*l,-i*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(vr.makeScale(t,e)),this}rotate(t){return this.premultiply(vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(vr.makeTranslation(t,e)),this}makeTranslation(t,e){return this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const vr=new It;function Il(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function ss(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Ti(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function _r(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}const Qu=new It().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),th=new It().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function eh(o){return o.convertSRGBToLinear().applyMatrix3(th)}function nh(o){return o.applyMatrix3(Qu).convertLinearToSRGB()}const ih={[ns]:o=>o,[sn]:o=>o.convertSRGBToLinear(),[Rl]:eh},sh={[ns]:o=>o,[sn]:o=>o.convertLinearToSRGB(),[Rl]:nh},De={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(o){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!o},get workingColorSpace(){return ns},set workingColorSpace(o){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(o,t,e){if(this.enabled===!1||t===e||!t||!e)return o;const n=ih[t],i=sh[e];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${t}" to "${e}".`);return i(n(o))},fromWorkingColorSpace:function(o,t){return this.convert(o,this.workingColorSpace,t)},toWorkingColorSpace:function(o,t){return this.convert(o,t,this.workingColorSpace)}};let ei;class Nl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=ss("canvas")),ei.width=t.width,ei.height=t.height;const n=ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ss("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Ti(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ti(e[n]/255)*255):e[n]=Ti(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class Ul{constructor(t=null){this.isSource=!0,this.uuid=Ui(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(xr(i[r].image)):s.push(xr(i[r]))}else s=xr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function xr(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Nl.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rh=0;class we extends Ni{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=qe,i=qe,s=Ae,r=ts,a=Xe,l=Yn,c=we.DEFAULT_ANISOTROPY,u=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Ui(),this.name="",this.source=new Ul(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case eo:t.x=t.x-Math.floor(t.x);break;case qe:t.x=t.x<0?0:1;break;case no:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case eo:t.y=t.y-Math.floor(t.y);break;case qe:t.y=t.y<0?0:1;break;case no:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=Cl;we.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,y=(p+1)/2,w=(f+1)/2,A=(u+h)/4,P=(d+v)/4,D=(g+m)/4;return M>y&&M>w?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=A/n,s=P/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=A/i,s=D/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=P/s,i=D/s),this.set(n,i,s,e),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(h-u)/_,this.w=Math.acos((c+p+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $n extends Ni{constructor(t=1,e=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new we(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ae,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ul(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zl extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Me,this.minFilter=Me,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oh extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Me,this.minFilter=Me,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let cs=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=s[r+0],p=s[r+1],g=s[r+2],v=s[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==h||c!==p||u!==g){let m=1-a;const f=l*h+c*p+u*g+d*v,_=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const w=Math.sqrt(M),A=Math.atan2(w,f*_);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}const y=a*_;if(l=l*m+h*y,c=c*m+p*y,u=u*m+g*y,d=d*m+v*y,m===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=w,c*=w,u*=w,d*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,r){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[r],h=s[r+1],p=s[r+2],g=s[r+3];return t[e]=a*g+u*d+l*p-c*h,t[e+1]=l*g+u*h+c*d-a*p,t[e+2]=c*g+u*p+a*h-l*d,t[e+3]=u*g-a*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){const n=t._x,i=t._y,s=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),h=l(n/2),p=l(i/2),g=l(s/2);switch(r){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(i+r)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(s-c)/p,this._x=(i+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(r-i)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,r=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+r*a+i*c-s*l,this._y=i*u+r*l+s*a-n*c,this._z=s*u+r*c+n*l-i*a,this._w=r*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=r*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z,l=t.w,c=l*e+r*i-a*n,u=l*n+a*e-s*i,d=l*i+s*n-r*e,h=-s*e-r*n-a*i;return this.x=c*l+h*-s+u*-a-d*-r,this.y=u*l+h*-r+d*-s-c*-a,this.z=d*l+h*-a+c*-r-u*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,r=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*r-n*l,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return yr.copy(this).projectOnVector(t),this.sub(yr)}reflect(t){return this.sub(yr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yr=new O,sa=new cs;class zi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){if(t.updateWorldMatrix(!1,!1),t.boundingBox!==void 0)t.boundingBox===null&&t.computeBoundingBox(),ni.copy(t.boundingBox),ni.applyMatrix4(t.matrixWorld),this.union(ni);else{const i=t.geometry;if(i!==void 0)if(e&&i.attributes!==void 0&&i.attributes.position!==void 0){const s=i.attributes.position;for(let r=0,a=s.count;r<a;r++)cn.fromBufferAttribute(s,r).applyMatrix4(t.matrixWorld),this.expandByPoint(cn)}else i.boundingBox===null&&i.computeBoundingBox(),ni.copy(i.boundingBox),ni.applyMatrix4(t.matrixWorld),this.union(ni)}const n=t.children;for(let i=0,s=n.length;i<s;i++)this.expandByObject(n[i],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gi),vs.subVectors(this.max,Gi),ii.subVectors(t.a,Gi),si.subVectors(t.b,Gi),ri.subVectors(t.c,Gi),wn.subVectors(si,ii),bn.subVectors(ri,si),Nn.subVectors(ii,ri);let e=[0,-wn.z,wn.y,0,-bn.z,bn.y,0,-Nn.z,Nn.y,wn.z,0,-wn.x,bn.z,0,-bn.x,Nn.z,0,-Nn.x,-wn.y,wn.x,0,-bn.y,bn.x,0,-Nn.y,Nn.x,0];return!Mr(e,ii,si,ri,vs)||(e=[1,0,0,0,1,0,0,0,1],!Mr(e,ii,si,ri,vs))?!1:(_s.crossVectors(wn,bn),e=[_s.x,_s.y,_s.z],Mr(e,ii,si,ri,vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ln=[new O,new O,new O,new O,new O,new O,new O,new O],cn=new O,ni=new zi,ii=new O,si=new O,ri=new O,wn=new O,bn=new O,Nn=new O,Gi=new O,vs=new O,_s=new O,Un=new O;function Mr(o,t,e,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){Un.fromArray(o,s);const a=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),l=t.dot(Un),c=e.dot(Un),u=n.dot(Un);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ah=new zi,ki=new O,Sr=new O;let co=class{constructor(t=new O,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ah.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ki.subVectors(t,this.center);const e=ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ki,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ki.copy(t.center).add(Sr)),this.expandByPoint(ki.copy(t.center).sub(Sr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}};const un=new O,wr=new O,xs=new O,En=new O,br=new O,ys=new O,Er=new O;let lh=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){wr.copy(t).add(e).multiplyScalar(.5),xs.copy(e).sub(t).normalize(),En.copy(this.origin).sub(wr);const s=t.distanceTo(e)*.5,r=-this.direction.dot(xs),a=En.dot(this.direction),l=-En.dot(xs),c=En.lengthSq(),u=Math.abs(1-r*r);let d,h,p,g;if(u>0)if(d=r*l-a,h=r*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,p=d*(d+r*h+2*a)+h*(r*d+h+2*l)+c}else h=s,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-r*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(r*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=r>0?-s:s,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(wr).addScaledVector(xs,h),p}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),i=un.dot(un)-n*n,s=t.radius*t.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,r,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,i=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,i=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,i,s){br.subVectors(e,t),ys.subVectors(n,t),Er.crossVectors(br,ys);let r=this.direction.dot(Er),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;En.subVectors(this.origin,t);const l=a*this.direction.dot(ys.crossVectors(En,ys));if(l<0)return null;const c=a*this.direction.dot(br.cross(En));if(c<0||l+c>r)return null;const u=-a*En.dot(Er);return u<0?null:this.at(u/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class pe{constructor(){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,s,r,a,l,c,u,d,h,p,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=r,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/oi.setFromMatrixColumn(t,0).length(),s=1/oi.setFromMatrixColumn(t,1).length(),r=1/oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const h=r*u,p=r*d,g=a*u,v=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=g+p*c,e[10]=r*l}else if(t.order==="YXZ"){const h=l*u,p=l*d,g=c*u,v=c*d;e[0]=h+v*a,e[4]=g*a-p,e[8]=r*c,e[1]=r*d,e[5]=r*u,e[9]=-a,e[2]=p*a-g,e[6]=v+h*a,e[10]=r*l}else if(t.order==="ZXY"){const h=l*u,p=l*d,g=c*u,v=c*d;e[0]=h-v*a,e[4]=-r*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=r*u,e[9]=v-h*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const h=r*u,p=r*d,g=a*u,v=a*d;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const h=r*l,p=r*c,g=a*l,v=a*c;e[0]=l*u,e[4]=v-h*d,e[8]=g*d+p,e[1]=d,e[5]=r*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*d+g,e[10]=h-v*d}else if(t.order==="XZY"){const h=r*l,p=r*c,g=a*l,v=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+v,e[5]=r*u,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ch,t,uh)}lookAt(t,e,n){const i=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),Tn.crossVectors(n,Ie),Tn.lengthSq()===0&&(Math.abs(n.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),Tn.crossVectors(n,Ie)),Tn.normalize(),Ms.crossVectors(Ie,Tn),i[0]=Tn.x,i[4]=Ms.x,i[8]=Ie.x,i[1]=Tn.y,i[5]=Ms.y,i[9]=Ie.y,i[2]=Tn.z,i[6]=Ms.z,i[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],_=n[3],M=n[7],y=n[11],w=n[15],A=i[0],P=i[4],D=i[8],S=i[12],E=i[1],V=i[5],F=i[9],C=i[13],R=i[2],I=i[6],U=i[10],Z=i[14],G=i[3],Y=i[7],Q=i[11],ft=i[15];return s[0]=r*A+a*E+l*R+c*G,s[4]=r*P+a*V+l*I+c*Y,s[8]=r*D+a*F+l*U+c*Q,s[12]=r*S+a*C+l*Z+c*ft,s[1]=u*A+d*E+h*R+p*G,s[5]=u*P+d*V+h*I+p*Y,s[9]=u*D+d*F+h*U+p*Q,s[13]=u*S+d*C+h*Z+p*ft,s[2]=g*A+v*E+m*R+f*G,s[6]=g*P+v*V+m*I+f*Y,s[10]=g*D+v*F+m*U+f*Q,s[14]=g*S+v*C+m*Z+f*ft,s[3]=_*A+M*E+y*R+w*G,s[7]=_*P+M*V+y*I+w*Y,s[11]=_*D+M*F+y*U+w*Q,s[15]=_*S+M*C+y*Z+w*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+s*l*d-i*c*d-s*a*h+n*c*h+i*a*p-n*l*p)+v*(+e*l*p-e*c*h+s*r*h-i*r*p+i*c*u-s*l*u)+m*(+e*c*d-e*a*p-s*r*d+n*r*p+s*a*u-n*c*u)+f*(-i*a*u-e*l*d+e*a*h+i*r*d-n*r*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],_=d*m*c-v*h*c+v*l*p-a*m*p-d*l*f+a*h*f,M=g*h*c-u*m*c-g*l*p+r*m*p+u*l*f-r*h*f,y=u*v*c-g*d*c+g*a*p-r*v*p-u*a*f+r*d*f,w=g*d*l-u*v*l-g*a*h+r*v*h+u*a*m-r*d*m,A=e*_+n*M+i*y+s*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return t[0]=_*P,t[1]=(v*h*s-d*m*s-v*i*p+n*m*p+d*i*f-n*h*f)*P,t[2]=(a*m*s-v*l*s+v*i*c-n*m*c-a*i*f+n*l*f)*P,t[3]=(d*l*s-a*h*s-d*i*c+n*h*c+a*i*p-n*l*p)*P,t[4]=M*P,t[5]=(u*m*s-g*h*s+g*i*p-e*m*p-u*i*f+e*h*f)*P,t[6]=(g*l*s-r*m*s-g*i*c+e*m*c+r*i*f-e*l*f)*P,t[7]=(r*h*s-u*l*s+u*i*c-e*h*c-r*i*p+e*l*p)*P,t[8]=y*P,t[9]=(g*d*s-u*v*s-g*n*p+e*v*p+u*n*f-e*d*f)*P,t[10]=(r*v*s-g*a*s+g*n*c-e*v*c-r*n*f+e*a*f)*P,t[11]=(u*a*s-r*d*s-u*n*c+e*d*c+r*n*p-e*a*p)*P,t[12]=w*P,t[13]=(u*v*i-g*d*i+g*n*h-e*v*h-u*n*m+e*d*m)*P,t[14]=(g*a*i-r*v*i-g*n*l+e*v*l+r*n*m-e*a*m)*P,t[15]=(r*d*i-u*a*i+u*n*l-e*d*l-r*n*h+e*a*h)*P,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,a=t.y,l=t.z,c=s*r,u=s*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*r,0,c*l-i*a,u*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,r=e._y,a=e._z,l=e._w,c=s+s,u=r+r,d=a+a,h=s*c,p=s*u,g=s*d,v=r*u,m=r*d,f=a*d,_=l*c,M=l*u,y=l*d,w=n.x,A=n.y,P=n.z;return i[0]=(1-(v+f))*w,i[1]=(p+y)*w,i[2]=(g-M)*w,i[3]=0,i[4]=(p-y)*A,i[5]=(1-(h+f))*A,i[6]=(m+_)*A,i[7]=0,i[8]=(g+M)*P,i[9]=(m-_)*P,i[10]=(1-(h+v))*P,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=oi.set(i[0],i[1],i[2]).length();const r=oi.set(i[4],i[5],i[6]).length(),a=oi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Ve.copy(this);const c=1/s,u=1/r,d=1/a;return Ve.elements[0]*=c,Ve.elements[1]*=c,Ve.elements[2]*=c,Ve.elements[4]*=u,Ve.elements[5]*=u,Ve.elements[6]*=u,Ve.elements[8]*=d,Ve.elements[9]*=d,Ve.elements[10]*=d,e.setFromRotationMatrix(Ve),n.x=s,n.y=r,n.z=a,this}makePerspective(t,e,n,i,s,r){const a=this.elements,l=2*s/(e-t),c=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),h=-(r+s)/(r-s),p=-2*r*s/(r-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=d,a[13]=0,a[2]=0,a[6]=0,a[10]=h,a[14]=p,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,r){const a=this.elements,l=1/(e-t),c=1/(n-i),u=1/(r-s),d=(e+t)*l,h=(n+i)*c,p=(r+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-d,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-h,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-p,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oi=new O,Ve=new pe,ch=new O(0,0,0),uh=new O(1,1,1),Tn=new O,Ms=new O,Ie=new O,ra=new pe,oa=new cs;class us{constructor(t=0,e=0,n=0,i=us.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],r=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Se(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ra.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ra,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oa.setFromEuler(this),this.setFromQuaternion(oa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}us.DEFAULT_ORDER="XYZ";class Fl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hh=0;const aa=new O,ai=new cs,hn=new pe,Ss=new O,Hi=new O,dh=new O,fh=new cs,la=new O(1,0,0),ca=new O(0,1,0),ua=new O(0,0,1),ph={type:"added"},ha={type:"removed"};class Pe extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new O,e=new us,n=new cs,i=new O(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new pe},normalMatrix:{value:new It}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(la,t)}rotateY(t){return this.rotateOnAxis(ca,t)}rotateZ(t){return this.rotateOnAxis(ua,t)}translateOnAxis(t,e){return aa.copy(t).applyQuaternion(this.quaternion),this.position.add(aa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(la,t)}translateY(t){return this.translateOnAxis(ca,t)}translateZ(t){return this.translateOnAxis(ua,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ss.copy(t):Ss.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Hi,Ss,this.up):hn.lookAt(Ss,Hi,this.up),this.quaternion.setFromRotationMatrix(hn),i&&(hn.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(hn),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(ph)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ha)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(ha)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(hn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e){let n=[];this[t]===e&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectsByProperty(t,e);r.length>0&&(n=n.concat(r))}return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,t,dh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,fh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Pe.DEFAULT_UP=new O(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new O,dn=new O,Tr=new O,fn=new O,li=new O,ci=new O,da=new O,Ar=new O,Cr=new O,Lr=new O;let ws=!1;class We{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ge.subVectors(t,e),i.cross(Ge);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ge.subVectors(i,e),dn.subVectors(n,e),Tr.subVectors(t,e);const r=Ge.dot(Ge),a=Ge.dot(dn),l=Ge.dot(Tr),c=dn.dot(dn),u=dn.dot(Tr),d=r*c-a*a;if(d===0)return s.set(-2,-1,-1);const h=1/d,p=(c*l-a*u)*h,g=(r*u-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,fn),fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getUV(t,e,n,i,s,r,a,l){return ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ws=!0),this.getInterpolation(t,e,n,i,s,r,a,l)}static getInterpolation(t,e,n,i,s,r,a,l){return this.getBarycoord(t,e,n,i,fn),l.setScalar(0),l.addScaledVector(s,fn.x),l.addScaledVector(r,fn.y),l.addScaledVector(a,fn.z),l}static isFrontFacing(t,e,n,i){return Ge.subVectors(n,e),dn.subVectors(t,e),Ge.cross(dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),Ge.cross(dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ws=!0),We.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}getInterpolation(t,e,n,i,s){return We.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let r,a;li.subVectors(i,n),ci.subVectors(s,n),Ar.subVectors(t,n);const l=li.dot(Ar),c=ci.dot(Ar);if(l<=0&&c<=0)return e.copy(n);Cr.subVectors(t,i);const u=li.dot(Cr),d=ci.dot(Cr);if(u>=0&&d<=u)return e.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),e.copy(n).addScaledVector(li,r);Lr.subVectors(t,s);const p=li.dot(Lr),g=ci.dot(Lr);if(g>=0&&p<=g)return e.copy(s);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ci,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return da.subVectors(s,i),a=(d-u)/(d-u+(p-g)),e.copy(i).addScaledVector(da,a);const f=1/(m+v+h);return r=v*f,a=h*f,e.copy(n).addScaledVector(li,r).addScaledVector(ci,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let mh=0,Fi=class extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=bi,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=El,this.blendDst=Tl,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gr,this.stencilZFail=gr,this.stencilZPass=gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(e){const s=i(t.textures),r=i(t.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};const Ol={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ke={h:0,s:0,l:0},bs={h:0,s:0,l:0};function Pr(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,De.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=De.workingColorSpace){return this.r=t,this.g=e,this.b=n,De.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=De.workingColorSpace){if(t=lo(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Pr(r,s,t+1/3),this.g=Pr(r,s,t),this.b=Pr(r,s,t-1/3)}return De.toWorkingColorSpace(this,i),this}setStyle(t,e=sn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,De.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,De.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,u=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,u,e)}break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const n=Ol[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}copyLinearToSRGB(t){return this.r=_r(t.r),this.g=_r(t.g),this.b=_r(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return De.fromWorkingColorSpace(ve.copy(this),t),Se(ve.r*255,0,255)<<16^Se(ve.g*255,0,255)<<8^Se(ve.b*255,0,255)<<0}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=De.workingColorSpace){De.fromWorkingColorSpace(ve.copy(this),e);const n=ve.r,i=ve.g,s=ve.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=u<=.5?d/(r+a):d/(2-r-a),r){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=De.workingColorSpace){return De.fromWorkingColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=sn){De.fromWorkingColorSpace(ve.copy(this),t);const e=ve.r,n=ve.g,i=ve.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${e*255|0},${n*255|0},${i*255|0})`}offsetHSL(t,e,n){return this.getHSL(ke),ke.h+=t,ke.s+=e,ke.l+=n,this.setHSL(ke.h,ke.s,ke.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ke),t.getHSL(bs);const n=Qi(ke.h,bs.h,e),i=Qi(ke.s,bs.s,e),s=Qi(ke.l,bs.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new Gt;Gt.NAMES=Ol;class Bl extends Fi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Qt=new O,Es=new kt;class on{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ea,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Es.fromBufferAttribute(this,e),Es.applyMatrix3(t),this.setXY(e,Es.x,Es.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Qt.fromBufferAttribute(this,e),Qt.applyMatrix3(t),this.setXYZ(e,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Qt.fromBufferAttribute(this,e),Qt.applyMatrix4(t),this.setXYZ(e,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qt.fromBufferAttribute(this,e),Qt.applyNormalMatrix(t),this.setXYZ(e,Qt.x,Qt.y,Qt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qt.fromBufferAttribute(this,e),Qt.transformDirection(t),this.setXYZ(e,Qt.x,Qt.y,Qt.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$i(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$i(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$i(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),i=Te(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),i=Te(i,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ea&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Vl extends on{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gl extends on{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ue extends on{constructor(t,e,n){super(new Float32Array(t),e,n)}}let gh=0;const Fe=new pe,Rr=new Pe,ui=new O,Ne=new zi,Wi=new zi,ue=new O;class Mn extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Il(t)?Gl:Vl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new It().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,n){return Fe.makeTranslation(t,e,n),this.applyMatrix4(Fe),this}scale(t,e,n){return Fe.makeScale(t,e,n),this.applyMatrix4(Fe),this}lookAt(t){return Rr.lookAt(t),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ne.setFromBufferAttribute(s),this.morphTargetsRelative?(ue.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(ue),ue.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(ue)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new co);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const a=e[s];Wi.setFromBufferAttribute(a),this.morphTargetsRelative?(ue.addVectors(Ne.min,Wi.min),Ne.expandByPoint(ue),ue.addVectors(Ne.max,Wi.max),Ne.expandByPoint(ue)):(Ne.expandByPoint(Wi.min),Ne.expandByPoint(Wi.max))}Ne.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)ue.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ue));if(e)for(let s=0,r=e.length;s<r;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ue.fromBufferAttribute(a,c),l&&(ui.fromBufferAttribute(t,c),ue.add(ui)),i=Math.max(i,n.distanceToSquared(ue))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,r=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new on(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let E=0;E<a;E++)c[E]=new O,u[E]=new O;const d=new O,h=new O,p=new O,g=new kt,v=new kt,m=new kt,f=new O,_=new O;function M(E,V,F){d.fromArray(i,E*3),h.fromArray(i,V*3),p.fromArray(i,F*3),g.fromArray(r,E*2),v.fromArray(r,V*2),m.fromArray(r,F*2),h.sub(d),p.sub(d),v.sub(g),m.sub(g);const C=1/(v.x*m.y-m.x*v.y);isFinite(C)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(C),_.copy(p).multiplyScalar(v.x).addScaledVector(h,-m.x).multiplyScalar(C),c[E].add(f),c[V].add(f),c[F].add(f),u[E].add(_),u[V].add(_),u[F].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let E=0,V=y.length;E<V;++E){const F=y[E],C=F.start,R=F.count;for(let I=C,U=C+R;I<U;I+=3)M(n[I+0],n[I+1],n[I+2])}const w=new O,A=new O,P=new O,D=new O;function S(E){P.fromArray(s,E*3),D.copy(P);const V=c[E];w.copy(V),w.sub(P.multiplyScalar(P.dot(V))).normalize(),A.crossVectors(D,V);const C=A.dot(u[E])<0?-1:1;l[E*4]=w.x,l[E*4+1]=w.y,l[E*4+2]=w.z,l[E*4+3]=C}for(let E=0,V=y.length;E<V;++E){const F=y[E],C=F.start,R=F.count;for(let I=C,U=C+R;I<U;I+=3)S(n[I+0]),S(n[I+1]),S(n[I+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new on(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const i=new O,s=new O,r=new O,a=new O,l=new O,c=new O,u=new O,d=new O;if(t)for(let h=0,p=t.count;h<p;h+=3){const g=t.getX(h+0),v=t.getX(h+1),m=t.getX(h+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,m),u.subVectors(r,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)i.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ue.fromBufferAttribute(t,e),ue.normalize(),t.setXYZ(e,ue.x,ue.y,ue.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new on(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Mn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=t(h,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fa=new pe,Je=new lh,Ts=new co,pa=new O,hi=new O,di=new O,fi=new O,Dr=new O,As=new O,Cs=new kt,Ls=new kt,Ps=new kt,ma=new O,ga=new O,va=new O,Rs=new O,Ds=new O;class Ce extends Pe{constructor(t=new Mn,e=new Bl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){As.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Dr.fromBufferAttribute(d,t),r?As.addScaledVector(Dr,u):As.addScaledVector(Dr.sub(e),u))}e.add(As)}return this.isSkinnedMesh&&this.applyBoneTransform(t,e),e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(s),Je.copy(t.ray).recast(t.near),Ts.containsPoint(Je.origin)===!1&&(Je.intersectSphere(Ts,pa)===null||Je.origin.distanceToSquared(pa)>(t.far-t.near)**2))||(fa.copy(s).invert(),Je.copy(t.ray).applyMatrix4(fa),n.boundingBox!==null&&Je.intersectsBox(n.boundingBox)===!1))return;let r;const a=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv2,d=n.attributes.normal,h=n.groups,p=n.drawRange;if(a!==null)if(Array.isArray(i))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=i[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,w=M;y<w;y+=3){const A=a.getX(y),P=a.getX(y+1),D=a.getX(y+2);r=Is(this,f,t,Je,c,u,d,A,P,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=a.getX(m),M=a.getX(m+1),y=a.getX(m+2);r=Is(this,i,t,Je,c,u,d,_,M,y),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(i))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=i[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,w=M;y<w;y+=3){const A=y,P=y+1,D=y+2;r=Is(this,f,t,Je,c,u,d,A,P,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=m,M=m+1,y=m+2;r=Is(this,i,t,Je,c,u,d,_,M,y),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function vh(o,t,e,n,i,s,r,a){let l;if(t.side===Le?l=n.intersectTriangle(r,s,i,!0,a):l=n.intersectTriangle(i,s,r,t.side===Pn,a),l===null)return null;Ds.copy(a),Ds.applyMatrix4(o.matrixWorld);const c=e.ray.origin.distanceTo(Ds);return c<e.near||c>e.far?null:{distance:c,point:Ds.clone(),object:o}}function Is(o,t,e,n,i,s,r,a,l,c){o.getVertexPosition(a,hi),o.getVertexPosition(l,di),o.getVertexPosition(c,fi);const u=vh(o,t,e,n,hi,di,fi,Rs);if(u){i&&(Cs.fromBufferAttribute(i,a),Ls.fromBufferAttribute(i,l),Ps.fromBufferAttribute(i,c),u.uv=We.getInterpolation(Rs,hi,di,fi,Cs,Ls,Ps,new kt)),s&&(Cs.fromBufferAttribute(s,a),Ls.fromBufferAttribute(s,l),Ps.fromBufferAttribute(s,c),u.uv2=We.getInterpolation(Rs,hi,di,fi,Cs,Ls,Ps,new kt)),r&&(ma.fromBufferAttribute(r,a),ga.fromBufferAttribute(r,l),va.fromBufferAttribute(r,c),u.normal=We.getInterpolation(Rs,hi,di,fi,ma,ga,va,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new O,materialIndex:0};We.getNormal(hi,di,fi,d.normal),u.face=d}return u}class hs extends Mn{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,e,t,r,s,0),g("z","y","x",1,-1,n,e,-t,r,s,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(d,2));function g(v,m,f,_,M,y,w,A,P,D,S){const E=y/P,V=w/D,F=y/2,C=w/2,R=A/2,I=P+1,U=D+1;let Z=0,G=0;const Y=new O;for(let Q=0;Q<U;Q++){const ft=Q*V-C;for(let W=0;W<I;W++){const H=W*E-F;Y[v]=H*_,Y[m]=ft*M,Y[f]=R,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[f]=A>0?1:-1,u.push(Y.x,Y.y,Y.z),d.push(W/P),d.push(1-Q/D),Z+=1}}for(let Q=0;Q<D;Q++)for(let ft=0;ft<P;ft++){const W=h+ft+I*Q,H=h+ft+I*(Q+1),J=h+(ft+1)+I*(Q+1),st=h+(ft+1)+I*Q;l.push(W,H,st),l.push(H,J,st),G+=6}a.addGroup(p,G,S),p+=G,h+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ii(o){const t={};for(const e in o){t[e]={};for(const n in o[e]){const i=o[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ye(o){const t={};for(let e=0;e<o.length;e++){const n=Ii(o[e]);for(const i in n)t[i]=n[i]}return t}function _h(o){const t=[];for(let e=0;e<o.length;e++)t.push(o[e].clone());return t}function kl(o){return o.getRenderTarget()===null&&o.outputEncoding===qt?sn:ns}const xh={clone:Ii,merge:ye};var yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Fi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yh,this.fragmentShader=Mh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ii(t.uniforms),this.uniformsGroups=_h(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Hl extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Oe extends Hl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ji*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,e-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const pi=-90,mi=1;class Sh extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new Oe(pi,mi,t,e);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new Oe(pi,mi,t,e);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const r=new Oe(pi,mi,t,e);r.layers=this.layers,r.up.set(0,0,-1),r.lookAt(0,1,0),this.add(r);const a=new Oe(pi,mi,t,e);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new Oe(pi,mi,t,e);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Oe(pi,mi,t,e);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,r,a,l,c]=this.children,u=t.getRenderTarget(),d=t.toneMapping,h=t.xr.enabled;t.toneMapping=yn,t.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,r),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=p,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(u),t.toneMapping=d,t.xr.enabled=h,n.texture.needsPMREMUpdate=!0}}class Wl extends we{constructor(t,e,n,i,s,r,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Pi,super(t,e,n,i,s,r,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wh extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Wl(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ae}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new hs(5,5,5),s=new Zn({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Cn});s.uniforms.tEquirect.value=e;const r=new Ce(i,s),a=e.minFilter;return e.minFilter===ts&&(e.minFilter=Ae),new Sh(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(s)}}const Ir=new O,bh=new O,Eh=new It;class Vn{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ir.subVectors(n,e).cross(bh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ir),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Eh.getNormalMatrix(t),i=this.coplanarPoint(Ir).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zn=new co,Ns=new O;class ql{constructor(t=new Vn,e=new Vn,n=new Vn,i=new Vn,s=new Vn,r=new Vn){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],s=n[1],r=n[2],a=n[3],l=n[4],c=n[5],u=n[6],d=n[7],h=n[8],p=n[9],g=n[10],v=n[11],m=n[12],f=n[13],_=n[14],M=n[15];return e[0].setComponents(a-i,d-l,v-h,M-m).normalize(),e[1].setComponents(a+i,d+l,v+h,M+m).normalize(),e[2].setComponents(a+s,d+c,v+p,M+f).normalize(),e[3].setComponents(a-s,d-c,v-p,M-f).normalize(),e[4].setComponents(a-r,d-u,v-g,M-_).normalize(),e[5].setComponents(a+r,d+u,v+g,M+_).normalize(),this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zn)}intersectsSprite(t){return zn.center.set(0,0,0),zn.radius=.7071067811865476,zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(zn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ns.x=i.normal.x>0?t.max.x:t.min.x,Ns.y=i.normal.y>0?t.max.y:t.min.y,Ns.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xl(){let o=null,t=!1,e=null,n=null;function i(s,r){e(s,r),n=o.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=o.requestAnimationFrame(i),t=!0)},stop:function(){o.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){o=s}}}function Th(o,t){const e=t.isWebGL2,n=new WeakMap;function i(c,u){const d=c.array,h=c.usage,p=o.createBuffer();o.bindBuffer(u,p),o.bufferData(u,d,h),c.onUploadCallback();let g;if(d instanceof Float32Array)g=5126;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(d instanceof Int16Array)g=5122;else if(d instanceof Uint32Array)g=5125;else if(d instanceof Int32Array)g=5124;else if(d instanceof Int8Array)g=5120;else if(d instanceof Uint8Array)g=5121;else if(d instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:p,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,d){const h=u.array,p=u.updateRange;o.bindBuffer(d,c),p.count===-1?o.bufferSubData(d,0,h):(e?o.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):o.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(o.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=n.get(c);(!h||h.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d===void 0?n.set(c,i(c,u)):d.version<c.version&&(s(d.buffer,c,u),d.version=c.version)}return{get:r,remove:a,update:l}}class uo extends Mn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,r=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=t/a,h=e/l,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){const _=f*h-r;for(let M=0;M<c;M++){const y=M*d-s;g.push(y,-_,0),v.push(0,0,1),m.push(M/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<a;_++){const M=_+c*f,y=_+c*(f+1),w=_+1+c*(f+1),A=_+1+c*f;p.push(M,y,A),p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uo(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ch=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ph=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Dh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ih="vec3 transformed = vec3( position );",Nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Fh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yh=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$h=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qh="gl_FragColor = linearToOutputTexel( gl_FragColor );",td=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ed=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ud=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gd=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Md=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,Sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wd=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ld=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Id=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Od=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,Gd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$d=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,hf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,_f=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,xf=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Lf=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Rf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Df=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Uf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ff=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ct={alphamap_fragment:Ah,alphamap_pars_fragment:Ch,alphatest_fragment:Lh,alphatest_pars_fragment:Ph,aomap_fragment:Rh,aomap_pars_fragment:Dh,begin_vertex:Ih,beginnormal_vertex:Nh,bsdfs:Uh,iridescence_fragment:zh,bumpmap_pars_fragment:Fh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:Bh,clipping_planes_pars_vertex:Vh,clipping_planes_vertex:Gh,color_fragment:kh,color_pars_fragment:Hh,color_pars_vertex:Wh,color_vertex:qh,common:Xh,cube_uv_reflection_fragment:jh,defaultnormal_vertex:Yh,displacementmap_pars_vertex:Kh,displacementmap_vertex:$h,emissivemap_fragment:Zh,emissivemap_pars_fragment:Jh,encodings_fragment:Qh,encodings_pars_fragment:td,envmap_fragment:ed,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:gd,envmap_vertex:rd,fog_vertex:od,fog_pars_vertex:ad,fog_fragment:ld,fog_pars_fragment:cd,gradientmap_pars_fragment:ud,lightmap_fragment:hd,lightmap_pars_fragment:dd,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:vd,lights_toon_pars_fragment:_d,lights_phong_fragment:xd,lights_phong_pars_fragment:yd,lights_physical_fragment:Md,lights_physical_pars_fragment:Sd,lights_fragment_begin:wd,lights_fragment_maps:bd,lights_fragment_end:Ed,logdepthbuf_fragment:Td,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Cd,logdepthbuf_vertex:Ld,map_fragment:Pd,map_pars_fragment:Rd,map_particle_fragment:Dd,map_particle_pars_fragment:Id,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Ud,morphcolor_vertex:zd,morphnormal_vertex:Fd,morphtarget_pars_vertex:Od,morphtarget_vertex:Bd,normal_fragment_begin:Vd,normal_fragment_maps:Gd,normal_pars_fragment:kd,normal_pars_vertex:Hd,normal_vertex:Wd,normalmap_pars_fragment:qd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Yd,iridescence_pars_fragment:Kd,output_fragment:$d,packing:Zd,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:tf,dithering_pars_fragment:ef,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:of,shadowmap_vertex:af,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:uf,skinning_vertex:hf,skinnormal_vertex:df,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:vf,transmission_pars_fragment:_f,uv_pars_fragment:xf,uv_pars_vertex:yf,uv_vertex:Mf,worldpos_vertex:Sf,background_vert:wf,background_frag:bf,backgroundCube_vert:Ef,backgroundCube_frag:Tf,cube_vert:Af,cube_frag:Cf,depth_vert:Lf,depth_frag:Pf,distanceRGBA_vert:Rf,distanceRGBA_frag:Df,equirect_vert:If,equirect_frag:Nf,linedashed_vert:Uf,linedashed_frag:zf,meshbasic_vert:Ff,meshbasic_frag:Of,meshlambert_vert:Bf,meshlambert_frag:Vf,meshmatcap_vert:Gf,meshmatcap_frag:kf,meshnormal_vert:Hf,meshnormal_frag:Wf,meshphong_vert:qf,meshphong_frag:Xf,meshphysical_vert:jf,meshphysical_frag:Yf,meshtoon_vert:Kf,meshtoon_frag:$f,points_vert:Zf,points_frag:Jf,shadow_vert:Qf,shadow_frag:tp,sprite_vert:ep,sprite_frag:np},it={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaTest:{value:0}}},rn={basic:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Ct.meshbasic_vert,fragmentShader:Ct.meshbasic_frag},lambert:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ct.meshlambert_vert,fragmentShader:Ct.meshlambert_frag},phong:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ct.meshphong_vert,fragmentShader:Ct.meshphong_frag},standard:{uniforms:ye([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag},toon:{uniforms:ye([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ct.meshtoon_vert,fragmentShader:Ct.meshtoon_frag},matcap:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Ct.meshmatcap_vert,fragmentShader:Ct.meshmatcap_frag},points:{uniforms:ye([it.points,it.fog]),vertexShader:Ct.points_vert,fragmentShader:Ct.points_frag},dashed:{uniforms:ye([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ct.linedashed_vert,fragmentShader:Ct.linedashed_frag},depth:{uniforms:ye([it.common,it.displacementmap]),vertexShader:Ct.depth_vert,fragmentShader:Ct.depth_frag},normal:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Ct.meshnormal_vert,fragmentShader:Ct.meshnormal_frag},sprite:{uniforms:ye([it.sprite,it.fog]),vertexShader:Ct.sprite_vert,fragmentShader:Ct.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ct.background_vert,fragmentShader:Ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ct.backgroundCube_vert,fragmentShader:Ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ct.cube_vert,fragmentShader:Ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ct.equirect_vert,fragmentShader:Ct.equirect_frag},distanceRGBA:{uniforms:ye([it.common,it.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ct.distanceRGBA_vert,fragmentShader:Ct.distanceRGBA_frag},shadow:{uniforms:ye([it.lights,it.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ct.shadow_vert,fragmentShader:Ct.shadow_frag}};rn.physical={uniforms:ye([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag};const Us={r:0,b:0,g:0};function ip(o,t,e,n,i,s,r){const a=new Gt(0);let l=s===!0?0:1,c,u,d=null,h=0,p=null;function g(m,f){let _=!1,M=f.isScene===!0?f.background:null;M&&M.isTexture&&(M=(f.backgroundBlurriness>0?e:t).get(M));const y=o.xr,w=y.getSession&&y.getSession();w&&w.environmentBlendMode==="additive"&&(M=null),M===null?v(a,l):M&&M.isColor&&(v(M,1),_=!0),(o.autoClear||_)&&o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil),M&&(M.isCubeTexture||M.mapping===Qs)?(u===void 0&&(u=new Ce(new hs(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Ii(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=M.encoding!==qt,(d!==M||h!==M.version||p!==o.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,p=o.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ce(new uo(2,2),new Zn({name:"BackgroundMaterial",uniforms:Ii(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=M.encoding!==qt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||p!==o.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,p=o.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,f){m.getRGB(Us,kl(o)),n.buffers.color.setClear(Us.r,Us.g,Us.b,f,r)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:g}}function sp(o,t,e,n){const i=o.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),r=n.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function d(R,I,U,Z,G){let Y=!1;if(r){const Q=v(Z,U,I);c!==Q&&(c=Q,p(c.object)),Y=f(R,Z,U,G),Y&&_(R,Z,U,G)}else{const Q=I.wireframe===!0;(c.geometry!==Z.id||c.program!==U.id||c.wireframe!==Q)&&(c.geometry=Z.id,c.program=U.id,c.wireframe=Q,Y=!0)}G!==null&&e.update(G,34963),(Y||u)&&(u=!1,D(R,I,U,Z),G!==null&&o.bindBuffer(34963,e.get(G).buffer))}function h(){return n.isWebGL2?o.createVertexArray():s.createVertexArrayOES()}function p(R){return n.isWebGL2?o.bindVertexArray(R):s.bindVertexArrayOES(R)}function g(R){return n.isWebGL2?o.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function v(R,I,U){const Z=U.wireframe===!0;let G=a[R.id];G===void 0&&(G={},a[R.id]=G);let Y=G[I.id];Y===void 0&&(Y={},G[I.id]=Y);let Q=Y[Z];return Q===void 0&&(Q=m(h()),Y[Z]=Q),Q}function m(R){const I=[],U=[],Z=[];for(let G=0;G<i;G++)I[G]=0,U[G]=0,Z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:Z,object:R,attributes:{},index:null}}function f(R,I,U,Z){const G=c.attributes,Y=I.attributes;let Q=0;const ft=U.getAttributes();for(const W in ft)if(ft[W].location>=0){const J=G[W];let st=Y[W];if(st===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(st=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(st=R.instanceColor)),J===void 0||J.attribute!==st||st&&J.data!==st.data)return!0;Q++}return c.attributesNum!==Q||c.index!==Z}function _(R,I,U,Z){const G={},Y=I.attributes;let Q=0;const ft=U.getAttributes();for(const W in ft)if(ft[W].location>=0){let J=Y[W];J===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(J=R.instanceColor));const st={};st.attribute=J,J&&J.data&&(st.data=J.data),G[W]=st,Q++}c.attributes=G,c.attributesNum=Q,c.index=Z}function M(){const R=c.newAttributes;for(let I=0,U=R.length;I<U;I++)R[I]=0}function y(R){w(R,0)}function w(R,I){const U=c.newAttributes,Z=c.enabledAttributes,G=c.attributeDivisors;U[R]=1,Z[R]===0&&(o.enableVertexAttribArray(R),Z[R]=1),G[R]!==I&&((n.isWebGL2?o:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,I),G[R]=I)}function A(){const R=c.newAttributes,I=c.enabledAttributes;for(let U=0,Z=I.length;U<Z;U++)I[U]!==R[U]&&(o.disableVertexAttribArray(U),I[U]=0)}function P(R,I,U,Z,G,Y){n.isWebGL2===!0&&(U===5124||U===5125)?o.vertexAttribIPointer(R,I,U,G,Y):o.vertexAttribPointer(R,I,U,Z,G,Y)}function D(R,I,U,Z){if(n.isWebGL2===!1&&(R.isInstancedMesh||Z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;M();const G=Z.attributes,Y=U.getAttributes(),Q=I.defaultAttributeValues;for(const ft in Y){const W=Y[ft];if(W.location>=0){let H=G[ft];if(H===void 0&&(ft==="instanceMatrix"&&R.instanceMatrix&&(H=R.instanceMatrix),ft==="instanceColor"&&R.instanceColor&&(H=R.instanceColor)),H!==void 0){const J=H.normalized,st=H.itemSize,ot=e.get(H);if(ot===void 0)continue;const k=ot.buffer,Tt=ot.type,bt=ot.bytesPerElement;if(H.isInterleavedBufferAttribute){const rt=H.data,Mt=rt.stride,Ft=H.offset;if(rt.isInstancedInterleavedBuffer){for(let vt=0;vt<W.locationSize;vt++)w(W.location+vt,rt.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let vt=0;vt<W.locationSize;vt++)y(W.location+vt);o.bindBuffer(34962,k);for(let vt=0;vt<W.locationSize;vt++)P(W.location+vt,st/W.locationSize,Tt,J,Mt*bt,(Ft+st/W.locationSize*vt)*bt)}else{if(H.isInstancedBufferAttribute){for(let rt=0;rt<W.locationSize;rt++)w(W.location+rt,H.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let rt=0;rt<W.locationSize;rt++)y(W.location+rt);o.bindBuffer(34962,k);for(let rt=0;rt<W.locationSize;rt++)P(W.location+rt,st/W.locationSize,Tt,J,st*bt,st/W.locationSize*rt*bt)}}else if(Q!==void 0){const J=Q[ft];if(J!==void 0)switch(J.length){case 2:o.vertexAttrib2fv(W.location,J);break;case 3:o.vertexAttrib3fv(W.location,J);break;case 4:o.vertexAttrib4fv(W.location,J);break;default:o.vertexAttrib1fv(W.location,J)}}}}A()}function S(){F();for(const R in a){const I=a[R];for(const U in I){const Z=I[U];for(const G in Z)g(Z[G].object),delete Z[G];delete I[U]}delete a[R]}}function E(R){if(a[R.id]===void 0)return;const I=a[R.id];for(const U in I){const Z=I[U];for(const G in Z)g(Z[G].object),delete Z[G];delete I[U]}delete a[R.id]}function V(R){for(const I in a){const U=a[I];if(U[R.id]===void 0)continue;const Z=U[R.id];for(const G in Z)g(Z[G].object),delete Z[G];delete U[R.id]}}function F(){C(),u=!0,c!==l&&(c=l,p(c.object))}function C(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfProgram:V,initAttributes:M,enableAttribute:y,disableUnusedAttributes:A}}function rp(o,t,e,n){const i=n.isWebGL2;let s;function r(c){s=c}function a(c,u){o.drawArrays(s,c,u),e.update(u,s,1)}function l(c,u,d){if(d===0)return;let h,p;if(i)h=o,p="drawArraysInstanced";else if(h=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](s,c,u,d),e.update(u,s,d)}this.setMode=r,this.render=a,this.renderInstances=l}function op(o,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");n=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(P){if(P==="highp"){if(o.getShaderPrecisionFormat(35633,36338).precision>0&&o.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(35633,36337).precision>0&&o.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&o.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=r||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,d=o.getParameter(34930),h=o.getParameter(35660),p=o.getParameter(3379),g=o.getParameter(34076),v=o.getParameter(34921),m=o.getParameter(36347),f=o.getParameter(36348),_=o.getParameter(36349),M=h>0,y=r||t.has("OES_texture_float"),w=M&&y,A=r?o.getParameter(36183):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:_,vertexTextures:M,floatFragmentTextures:y,floatVertexTextures:w,maxSamples:A}}function ap(o){const t=this;let e=null,n=0,i=!1,s=!1;const r=new Vn,a=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||i;return i=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=o.get(d);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const _=s?0:n,M=_*4;let y=f.clippingState||null;l.value=y,y=u(g,h,M,p);for(let w=0;w!==M;++w)y[w]=e[w];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,p,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,y=p;M!==v;++M,y+=4)r.copy(d[M]).applyMatrix4(_,a),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function lp(o){let t=new WeakMap;function e(r,a){return a===Qr?r.mapping=Pi:a===to&&(r.mapping=Ri),r}function n(r){if(r&&r.isTexture&&r.isRenderTargetTexture===!1){const a=r.mapping;if(a===Qr||a===to)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new wh(l.height/2);return c.fromEquirectangularTexture(o,r),t.set(r,c),r.addEventListener("dispose",i),e(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class cp extends Hl{constructor(t=-1,e=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,r=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Si=4,_a=[.125,.215,.35,.446,.526,.582],kn=20,Nr=new cp,xa=new Gt;let Ur=null;const Gn=(1+Math.sqrt(5))/2,gi=1/Gn,ya=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,Gn,gi),new O(0,Gn,-gi),new O(gi,0,Gn),new O(-gi,0,Gn),new O(Gn,gi,0),new O(-Gn,gi,0)];class Ma{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ur=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ba(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ur),t.scissorTest=!1,zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Ri?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ur=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:es,format:Xe,encoding:Kn,depthBuffer:!1},i=Sa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sa(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=up(s)),this._blurMaterial=hp(s,t,e)}return i}_compileMaterial(t){const e=new Ce(this._lodPlanes[0],t);this._renderer.compile(e,Nr)}_sceneToCubeUV(t,e,n,i){const a=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(xa),u.toneMapping=yn,u.autoClear=!1;const p=new Bl({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new Ce(new hs,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(xa),v=!0);for(let f=0;f<6;f++){const _=f%3;_===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):_===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const M=this._cubeSize;zs(i,_*M,f>2?M:0,M,M),u.setRenderTarget(i),v&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Pi||t.mapping===Ri;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ba()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wa());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new Ce(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,Nr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),r=ya[(i-1)%ya.length];this._blur(t,i-1,i,s,r)}e.autoClear=n}_blur(t,e,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",s),this._halfBlur(r,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ce(this._lodPlanes[i],c),h=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*kn-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):kn;m>kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${kn}`);const f=[];let _=0;for(let P=0;P<kn;++P){const D=P/v,S=Math.exp(-D*D/2);f.push(S),P===0?_+=S:P<m&&(_+=2*S)}for(let P=0;P<f.length;P++)f[P]=f[P]/_;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=r==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:M}=this;h.dTheta.value=g,h.mipInt.value=M-n;const y=this._sizeLods[i],w=3*y*(i>M-Si?i-M+Si:0),A=4*(this._cubeSize-y);zs(e,w,A,3*y,2*y),l.setRenderTarget(e),l.render(d,Nr)}}function up(o){const t=[],e=[],n=[];let i=o;const s=o-Si+1+_a.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);let l=1/a;r>o-Si?l=_a[r-o+Si-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,v=3,m=2,f=1,_=new Float32Array(v*g*p),M=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const P=A%3*2/3-1,D=A>2?0:-1,S=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];_.set(S,v*g*A),M.set(h,m*g*A);const E=[A,A,A,A,A,A];y.set(E,f*g*A)}const w=new Mn;w.setAttribute("position",new on(_,v)),w.setAttribute("uv",new on(M,m)),w.setAttribute("faceIndex",new on(y,f)),t.push(w),i>Si&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sa(o,t,e){const n=new $n(o,t,e);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(o,t,e,n,i){o.viewport.set(t,e,n,i),o.scissor.set(t,e,n,i)}function hp(o,t,e){const n=new Float32Array(kn),i=new O(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function wa(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ba(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ho(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dp(o){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Qr||l===to,u=l===Pi||l===Ri;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new Ma(o)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||u&&d&&i(d)){e===null&&(e=new Ma(o));const h=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function fp(o){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function pp(o,t,e,n){const i={},s=new WeakMap;function r(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete i[h.id];const p=s.get(h);p&&(t.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",r),i[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)t.update(h[g],34962);const p=d.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)t.update(v[m],34962)}}function c(d){const h=[],p=d.index,g=d.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let M=0,y=_.length;M<y;M+=3){const w=_[M+0],A=_[M+1],P=_[M+2];h.push(w,A,A,P,P,w)}}else{const _=g.array;v=g.version;for(let M=0,y=_.length/3-1;M<y;M+=3){const w=M+0,A=M+1,P=M+2;h.push(w,A,A,P,P,w)}}const m=new(Il(h)?Gl:Vl)(h,1);m.version=v;const f=s.get(d);f&&t.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function mp(o,t,e,n){const i=n.isWebGL2;let s;function r(h){s=h}let a,l;function c(h){a=h.type,l=h.bytesPerElement}function u(h,p){o.drawElements(s,p,a,h*l),e.update(p,s,1)}function d(h,p,g){if(g===0)return;let v,m;if(i)v=o,m="drawElementsInstanced";else if(v=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[m](s,p,a,h*l,g),e.update(p,s,g)}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=d}function gp(o){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(e.calls++,r){case 4:e.triangles+=a*(s/3);break;case 1:e.lines+=a*(s/2);break;case 3:e.lines+=a*(s-1);break;case 2:e.lines+=a*s;break;case 0:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function vp(o,t){return o[0]-t[0]}function _p(o,t){return Math.abs(t[1])-Math.abs(o[1])}function xp(o,t,e){const n={},i=new Float32Array(8),s=new WeakMap,r=new fe,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,d){const h=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==v){let I=function(){C.dispose(),s.delete(u),u.removeEventListener("dispose",I)};var p=I;m!==void 0&&m.texture.dispose();const M=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,w=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],P=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let S=0;M===!0&&(S=1),y===!0&&(S=2),w===!0&&(S=3);let E=u.attributes.position.count*S,V=1;E>t.maxTextureSize&&(V=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const F=new Float32Array(E*V*4*v),C=new zl(F,E,V,v);C.type=qn,C.needsUpdate=!0;const R=S*4;for(let U=0;U<v;U++){const Z=A[U],G=P[U],Y=D[U],Q=E*V*4*U;for(let ft=0;ft<Z.count;ft++){const W=ft*R;M===!0&&(r.fromBufferAttribute(Z,ft),F[Q+W+0]=r.x,F[Q+W+1]=r.y,F[Q+W+2]=r.z,F[Q+W+3]=0),y===!0&&(r.fromBufferAttribute(G,ft),F[Q+W+4]=r.x,F[Q+W+5]=r.y,F[Q+W+6]=r.z,F[Q+W+7]=0),w===!0&&(r.fromBufferAttribute(Y,ft),F[Q+W+8]=r.x,F[Q+W+9]=r.y,F[Q+W+10]=r.z,F[Q+W+11]=Y.itemSize===4?r.w:1)}}m={count:v,texture:C,size:new kt(E,V)},s.set(u,m),u.addEventListener("dispose",I)}let f=0;for(let M=0;M<h.length;M++)f+=h[M];const _=u.morphTargetsRelative?1:1-f;d.getUniforms().setValue(o,"morphTargetBaseInfluence",_),d.getUniforms().setValue(o,"morphTargetInfluences",h),d.getUniforms().setValue(o,"morphTargetsTexture",m.texture,e),d.getUniforms().setValue(o,"morphTargetsTextureSize",m.size)}else{const g=h===void 0?0:h.length;let v=n[u.id];if(v===void 0||v.length!==g){v=[];for(let y=0;y<g;y++)v[y]=[y,0];n[u.id]=v}for(let y=0;y<g;y++){const w=v[y];w[0]=y,w[1]=h[y]}v.sort(_p);for(let y=0;y<8;y++)y<g&&v[y][1]?(a[y][0]=v[y][0],a[y][1]=v[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(vp);const m=u.morphAttributes.position,f=u.morphAttributes.normal;let _=0;for(let y=0;y<8;y++){const w=a[y],A=w[0],P=w[1];A!==Number.MAX_SAFE_INTEGER&&P?(m&&u.getAttribute("morphTarget"+y)!==m[A]&&u.setAttribute("morphTarget"+y,m[A]),f&&u.getAttribute("morphNormal"+y)!==f[A]&&u.setAttribute("morphNormal"+y,f[A]),i[y]=P,_+=P):(m&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),f&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),i[y]=0)}const M=u.morphTargetsRelative?1:1-_;d.getUniforms().setValue(o,"morphTargetBaseInfluence",M),d.getUniforms().setValue(o,"morphTargetInfluences",i)}}return{update:l}}function yp(o,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);return i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),d}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:r}}const jl=new we,Yl=new zl,Kl=new oh,$l=new Wl,Ea=[],Ta=[],Aa=new Float32Array(16),Ca=new Float32Array(9),La=new Float32Array(4);function Oi(o,t,e){const n=o[0];if(n<=0||n>0)return o;const i=t*e;let s=Ea[i];if(s===void 0&&(s=new Float32Array(i),Ea[i]=s),t!==0){n.toArray(s,0);for(let r=1,a=0;r!==t;++r)a+=e,o[r].toArray(s,a)}return s}function re(o,t){if(o.length!==t.length)return!1;for(let e=0,n=o.length;e<n;e++)if(o[e]!==t[e])return!1;return!0}function oe(o,t){for(let e=0,n=t.length;e<n;e++)o[e]=t[e]}function tr(o,t){let e=Ta[t];e===void 0&&(e=new Int32Array(t),Ta[t]=e);for(let n=0;n!==t;++n)e[n]=o.allocateTextureUnit();return e}function Mp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1f(this.addr,t),e[0]=t)}function Sp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;o.uniform2fv(this.addr,t),oe(e,t)}}function wp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(re(e,t))return;o.uniform3fv(this.addr,t),oe(e,t)}}function bp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;o.uniform4fv(this.addr,t),oe(e,t)}}function Ep(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;o.uniformMatrix2fv(this.addr,!1,t),oe(e,t)}else{if(re(e,n))return;La.set(n),o.uniformMatrix2fv(this.addr,!1,La),oe(e,n)}}function Tp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;o.uniformMatrix3fv(this.addr,!1,t),oe(e,t)}else{if(re(e,n))return;Ca.set(n),o.uniformMatrix3fv(this.addr,!1,Ca),oe(e,n)}}function Ap(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;o.uniformMatrix4fv(this.addr,!1,t),oe(e,t)}else{if(re(e,n))return;Aa.set(n),o.uniformMatrix4fv(this.addr,!1,Aa),oe(e,n)}}function Cp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1i(this.addr,t),e[0]=t)}function Lp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;o.uniform2iv(this.addr,t),oe(e,t)}}function Pp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(re(e,t))return;o.uniform3iv(this.addr,t),oe(e,t)}}function Rp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;o.uniform4iv(this.addr,t),oe(e,t)}}function Dp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1ui(this.addr,t),e[0]=t)}function Ip(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;o.uniform2uiv(this.addr,t),oe(e,t)}}function Np(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(re(e,t))return;o.uniform3uiv(this.addr,t),oe(e,t)}}function Up(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;o.uniform4uiv(this.addr,t),oe(e,t)}}function zp(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||jl,i)}function Fp(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Kl,i)}function Op(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||$l,i)}function Bp(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Yl,i)}function Vp(o){switch(o){case 5126:return Mp;case 35664:return Sp;case 35665:return wp;case 35666:return bp;case 35674:return Ep;case 35675:return Tp;case 35676:return Ap;case 5124:case 35670:return Cp;case 35667:case 35671:return Lp;case 35668:case 35672:return Pp;case 35669:case 35673:return Rp;case 5125:return Dp;case 36294:return Ip;case 36295:return Np;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return zp;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Bp}}function Gp(o,t){o.uniform1fv(this.addr,t)}function kp(o,t){const e=Oi(t,this.size,2);o.uniform2fv(this.addr,e)}function Hp(o,t){const e=Oi(t,this.size,3);o.uniform3fv(this.addr,e)}function Wp(o,t){const e=Oi(t,this.size,4);o.uniform4fv(this.addr,e)}function qp(o,t){const e=Oi(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,e)}function Xp(o,t){const e=Oi(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,e)}function jp(o,t){const e=Oi(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,e)}function Yp(o,t){o.uniform1iv(this.addr,t)}function Kp(o,t){o.uniform2iv(this.addr,t)}function $p(o,t){o.uniform3iv(this.addr,t)}function Zp(o,t){o.uniform4iv(this.addr,t)}function Jp(o,t){o.uniform1uiv(this.addr,t)}function Qp(o,t){o.uniform2uiv(this.addr,t)}function tm(o,t){o.uniform3uiv(this.addr,t)}function em(o,t){o.uniform4uiv(this.addr,t)}function nm(o,t,e){const n=this.cache,i=t.length,s=tr(e,i);re(n,s)||(o.uniform1iv(this.addr,s),oe(n,s));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||jl,s[r])}function im(o,t,e){const n=this.cache,i=t.length,s=tr(e,i);re(n,s)||(o.uniform1iv(this.addr,s),oe(n,s));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Kl,s[r])}function sm(o,t,e){const n=this.cache,i=t.length,s=tr(e,i);re(n,s)||(o.uniform1iv(this.addr,s),oe(n,s));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||$l,s[r])}function rm(o,t,e){const n=this.cache,i=t.length,s=tr(e,i);re(n,s)||(o.uniform1iv(this.addr,s),oe(n,s));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Yl,s[r])}function om(o){switch(o){case 5126:return Gp;case 35664:return kp;case 35665:return Hp;case 35666:return Wp;case 35674:return qp;case 35675:return Xp;case 35676:return jp;case 5124:case 35670:return Yp;case 35667:case 35671:return Kp;case 35668:case 35672:return $p;case 35669:case 35673:return Zp;case 5125:return Jp;case 36294:return Qp;case 36295:return tm;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return nm;case 35679:case 36299:case 36307:return im;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return rm}}class am{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=Vp(e.type)}}class lm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=om(e.type)}}class cm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const zr=/(\w+)(\])?(\[|\.)?/g;function Pa(o,t){o.seq.push(t),o.map[t.id]=t}function um(o,t,e){const n=o.name,i=n.length;for(zr.lastIndex=0;;){const s=zr.exec(n),r=zr.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){Pa(e,c===void 0?new am(a,o,t):new lm(a,o,t));break}else{let d=e.map[a];d===void 0&&(d=new cm(a),Pa(e,d)),e=d}}}class qs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),r=t.getUniformLocation(e,s.name);um(s,r,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Ra(o,t,e){const n=o.createShader(t);return o.shaderSource(n,e),o.compileShader(n),n}let hm=0;function dm(o,t){const e=o.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function fm(o){switch(o){case Kn:return["Linear","( value )"];case qt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",o),["Linear","( value )"]}}function Da(o,t,e){const n=o.getShaderParameter(t,35713),i=o.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+dm(o.getShaderSource(t),r)}else return i}function pm(o,t){const e=fm(t);return"vec4 "+o+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function mm(o,t){let e;switch(t){case fu:e="Linear";break;case pu:e="Reinhard";break;case mu:e="OptimizedCineon";break;case gu:e="ACESFilmic";break;case vu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+o+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function gm(o){return[o.extensionDerivatives||o.envMapCubeUVHeight||o.bumpMap||o.normalMapTangentSpace||o.clearcoatNormalMap||o.flatShading||o.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(o.extensionFragDepth||o.logarithmicDepthBuffer)&&o.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",o.extensionDrawBuffers&&o.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(o.extensionShaderTextureLOD||o.envMap||o.transmission)&&o.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zi).join(`
`)}function vm(o){const t=[];for(const e in o){const n=o[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function _m(o,t){const e={},n=o.getProgramParameter(t,35721);for(let i=0;i<n;i++){const s=o.getActiveAttrib(t,i),r=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),e[r]={type:s.type,location:o.getAttribLocation(t,r),locationSize:a}}return e}function Zi(o){return o!==""}function Ia(o,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Na(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ro(o){return o.replace(xm,ym)}function ym(o,t){const e=Ct[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return ro(e)}const Mm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ua(o){return o.replace(Mm,Sm)}function Sm(o,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function za(o){let t="precision "+o.precision+` float;
precision `+o.precision+" int;";return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wm(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===bl?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===qc?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ki&&(t="SHADOWMAP_TYPE_VSM"),t}function bm(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Pi:case Ri:t="ENVMAP_TYPE_CUBE";break;case Qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Em(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Ri:t="ENVMAP_MODE_REFRACTION";break}return t}function Tm(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case Al:t="ENVMAP_BLENDING_MULTIPLY";break;case hu:t="ENVMAP_BLENDING_MIX";break;case du:t="ENVMAP_BLENDING_ADD";break}return t}function Am(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Cm(o,t,e,n){const i=o.getContext(),s=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=wm(e),c=bm(e),u=Em(e),d=Tm(e),h=Am(e),p=e.isWebGL2?"":gm(e),g=vm(s),v=i.createProgram();let m,f,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=[g].filter(Zi).join(`
`),m.length>0&&(m+=`
`),f=[p,g].filter(Zi).join(`
`),f.length>0&&(f+=`
`)):(m=[za(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),f=[p,za(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yn?"#define TONE_MAPPING":"",e.toneMapping!==yn?Ct.tonemapping_pars_fragment:"",e.toneMapping!==yn?mm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ct.encodings_pars_fragment,pm("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zi).join(`
`)),r=ro(r),r=Ia(r,e),r=Na(r,e),a=ro(a),a=Ia(a,e),a=Na(a,e),r=Ua(r),a=Ua(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===na?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=_+m+r,y=_+f+a,w=Ra(i,35633,M),A=Ra(i,35632,y);if(i.attachShader(v,w),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),o.debug.checkShaderErrors){const S=i.getProgramInfoLog(v).trim(),E=i.getShaderInfoLog(w).trim(),V=i.getShaderInfoLog(A).trim();let F=!0,C=!0;if(i.getProgramParameter(v,35714)===!1)if(F=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,v,w,A);else{const R=Da(i,w,"vertex"),I=Da(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,35715)+`

Program Info Log: `+S+`
`+R+`
`+I)}else S!==""?console.warn("THREE.WebGLProgram: Program Info Log:",S):(E===""||V==="")&&(C=!1);C&&(this.diagnostics={runnable:F,programLog:S,vertexShader:{log:E,prefix:m},fragmentShader:{log:V,prefix:f}})}i.deleteShader(w),i.deleteShader(A);let P;this.getUniforms=function(){return P===void 0&&(P=new qs(i,v)),P};let D;return this.getAttributes=function(){return D===void 0&&(D=_m(i,v)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.name=e.shaderName,this.id=hm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=A,this}let Lm=0;class Pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Rm(t),e.set(t,n)),n}}class Rm{constructor(t){this.id=Lm++,this.code=t,this.usedTimes=0}}function Dm(o,t,e,n,i,s,r){const a=new Fl,l=new Pm,c=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,h=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return S===1?"uv2":"uv"}function m(S,E,V,F,C){const R=F.fog,I=C.geometry,U=S.isMeshStandardMaterial?F.environment:null,Z=(S.isMeshStandardMaterial?e:t).get(S.envMap||U),G=Z&&Z.mapping===Qs?Z.image.height:null,Y=g[S.type];S.precision!==null&&(p=i.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const Q=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ft=Q!==void 0?Q.length:0;let W=0;I.morphAttributes.position!==void 0&&(W=1),I.morphAttributes.normal!==void 0&&(W=2),I.morphAttributes.color!==void 0&&(W=3);let H,J,st,ot;if(Y){const lt=rn[Y];H=lt.vertexShader,J=lt.fragmentShader}else H=S.vertexShader,J=S.fragmentShader,l.update(S),st=l.getVertexShaderID(S),ot=l.getFragmentShaderID(S);const k=o.getRenderTarget(),Tt=C.isInstancedMesh===!0,bt=!!S.map,rt=!!S.matcap,Mt=!!Z,Ft=!!S.aoMap,vt=!!S.lightMap,Rt=!!S.bumpMap,ae=!!S.normalMap,he=!!S.displacementMap,le=!!S.emissiveMap,ie=!!S.metalnessMap,Ot=!!S.roughnessMap,Kt=S.clearcoat>0,be=S.iridescence>0,L=S.sheen>0,b=S.transmission>0,q=Kt&&!!S.clearcoatMap,et=Kt&&!!S.clearcoatNormalMap,nt=Kt&&!!S.clearcoatRoughnessMap,at=be&&!!S.iridescenceMap,St=be&&!!S.iridescenceThicknessMap,dt=L&&!!S.sheenColorMap,K=L&&!!S.sheenRoughnessMap,pt=!!S.specularMap,_t=!!S.specularColorMap,yt=!!S.specularIntensityMap,ht=b&&!!S.transmissionMap,mt=b&&!!S.thicknessMap,Nt=!!S.gradientMap,Bt=!!S.alphaMap,$t=S.alphaTest>0,N=!!S.extensions,j=!!I.attributes.uv2;return{isWebGL2:u,shaderID:Y,shaderName:S.type,vertexShader:H,fragmentShader:J,defines:S.defines,customVertexShaderID:st,customFragmentShaderID:ot,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,instancing:Tt,instancingColor:Tt&&C.instanceColor!==null,supportsVertexTextures:h,outputEncoding:k===null?o.outputEncoding:k.isXRRenderTarget===!0?k.texture.encoding:Kn,map:bt,matcap:rt,envMap:Mt,envMapMode:Mt&&Z.mapping,envMapCubeUVHeight:G,aoMap:Ft,lightMap:vt,bumpMap:Rt,normalMap:ae,displacementMap:h&&he,emissiveMap:le,normalMapObjectSpace:ae&&S.normalMapType===zu,normalMapTangentSpace:ae&&S.normalMapType===Pl,decodeVideoTexture:bt&&S.map.isVideoTexture===!0&&S.map.encoding===qt,metalnessMap:ie,roughnessMap:Ot,clearcoat:Kt,clearcoatMap:q,clearcoatNormalMap:et,clearcoatRoughnessMap:nt,iridescence:be,iridescenceMap:at,iridescenceThicknessMap:St,sheen:L,sheenColorMap:dt,sheenRoughnessMap:K,specularMap:pt,specularColorMap:_t,specularIntensityMap:yt,transmission:b,transmissionMap:ht,thicknessMap:mt,gradientMap:Nt,opaque:S.transparent===!1&&S.blending===bi,alphaMap:Bt,alphaTest:$t,combine:S.combine,mapUv:bt&&v(S.map.channel),aoMapUv:Ft&&v(S.aoMap.channel),lightMapUv:vt&&v(S.lightMap.channel),bumpMapUv:Rt&&v(S.bumpMap.channel),normalMapUv:ae&&v(S.normalMap.channel),displacementMapUv:he&&v(S.displacementMap.channel),emissiveMapUv:le&&v(S.emissiveMap.channel),metalnessMapUv:ie&&v(S.metalnessMap.channel),roughnessMapUv:Ot&&v(S.roughnessMap.channel),clearcoatMapUv:q&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:et&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:St&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:K&&v(S.sheenRoughnessMap.channel),specularMapUv:pt&&v(S.specularMap.channel),specularColorMapUv:_t&&v(S.specularColorMap.channel),specularIntensityMapUv:yt&&v(S.specularIntensityMap.channel),transmissionMapUv:ht&&v(S.transmissionMap.channel),thicknessMapUv:mt&&v(S.thicknessMap.channel),alphaMapUv:Bt&&v(S.alphaMap.channel),vertexTangents:ae&&!!I.attributes.tangent,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUvs2:j,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(bt||Bt),fog:!!R,useFog:S.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:C.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:W,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:o.shadowMap.enabled&&V.length>0,shadowMapType:o.shadowMap.type,toneMapping:S.toneMapped?o.toneMapping:yn,useLegacyLights:o.useLegacyLights,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_n,flipSided:S.side===Le,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:N&&S.extensions.derivatives===!0,extensionFragDepth:N&&S.extensions.fragDepth===!0,extensionDrawBuffers:N&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:N&&S.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const V in S.defines)E.push(V),E.push(S.defines[V]);return S.isRawShaderMaterial===!1&&(_(E,S),M(E,S),E.push(o.outputEncoding)),E.push(S.customProgramCacheKey),E.join()}function _(S,E){S.push(E.precision),S.push(E.outputEncoding),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function M(S,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUvs2&&a.enable(13),E.vertexTangents&&a.enable(14),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.decodeVideoTexture&&a.enable(17),E.opaque&&a.enable(18),E.pointsUvs&&a.enable(19),S.push(a.mask)}function y(S){const E=g[S.type];let V;if(E){const F=rn[E];V=xh.clone(F.uniforms)}else V=S.uniforms;return V}function w(S,E){let V;for(let F=0,C=c.length;F<C;F++){const R=c[F];if(R.cacheKey===E){V=R,++V.usedTimes;break}}return V===void 0&&(V=new Cm(o,E,S,s),c.push(V)),V}function A(S){if(--S.usedTimes===0){const E=c.indexOf(S);c[E]=c[c.length-1],c.pop(),S.destroy()}}function P(S){l.remove(S)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:w,releaseProgram:A,releaseShaderCache:P,programs:c,dispose:D}}function Im(){let o=new WeakMap;function t(s){let r=o.get(s);return r===void 0&&(r={},o.set(s,r)),r}function e(s){o.delete(s)}function n(s,r,a){o.get(s)[r]=a}function i(){o=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Nm(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function Fa(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Oa(){const o=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function r(d,h,p,g,v,m){let f=o[t];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},o[t]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=v,f.group=m),t++,f}function a(d,h,p,g,v,m){const f=r(d,h,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(d,h,p,g,v,m){const f=r(d,h,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(d,h){e.length>1&&e.sort(d||Nm),n.length>1&&n.sort(h||Fa),i.length>1&&i.sort(h||Fa)}function u(){for(let d=t,h=o.length;d<h;d++){const p=o[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function Um(){let o=new WeakMap;function t(n,i){const s=o.get(n);let r;return s===void 0?(r=new Oa,o.set(n,[r])):i>=s.length?(r=new Oa,s.push(r)):r=s[i],r}function e(){o=new WeakMap}return{get:t,dispose:e}}function zm(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Gt};break;case"SpotLight":e={position:new O,direction:new O,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new O,halfWidth:new O,halfHeight:new O};break}return o[t.id]=e,e}}}function Fm(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=e,e}}}let Om=0;function Bm(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function Vm(o,t){const e=new zm,n=Fm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new O);const s=new O,r=new pe,a=new pe;function l(u,d){let h=0,p=0,g=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let v=0,m=0,f=0,_=0,M=0,y=0,w=0,A=0,P=0,D=0;u.sort(Bm);const S=d===!0?Math.PI:1;for(let V=0,F=u.length;V<F;V++){const C=u[V],R=C.color,I=C.intensity,U=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=R.r*I*S,p+=R.g*I*S,g+=R.b*I*S;else if(C.isLightProbe)for(let G=0;G<9;G++)i.probe[G].addScaledVector(C.sh.coefficients[G],I);else if(C.isDirectionalLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity*S),C.castShadow){const Y=C.shadow,Q=n.get(C);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,i.directionalShadow[v]=Q,i.directionalShadowMap[v]=Z,i.directionalShadowMatrix[v]=C.shadow.matrix,y++}i.directional[v]=G,v++}else if(C.isSpotLight){const G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(R).multiplyScalar(I*S),G.distance=U,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,i.spot[f]=G;const Y=C.shadow;if(C.map&&(i.spotLightMap[P]=C.map,P++,Y.updateMatrices(C),C.castShadow&&D++),i.spotLightMatrix[f]=Y.matrix,C.castShadow){const Q=n.get(C);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,i.spotShadow[f]=Q,i.spotShadowMap[f]=Z,A++}f++}else if(C.isRectAreaLight){const G=e.get(C);G.color.copy(R).multiplyScalar(I),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),i.rectArea[_]=G,_++}else if(C.isPointLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity*S),G.distance=C.distance,G.decay=C.decay,C.castShadow){const Y=C.shadow,Q=n.get(C);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,Q.shadowCameraNear=Y.camera.near,Q.shadowCameraFar=Y.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=Z,i.pointShadowMatrix[m]=C.shadow.matrix,w++}i.point[m]=G,m++}else if(C.isHemisphereLight){const G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(I*S),G.groundColor.copy(C.groundColor).multiplyScalar(I*S),i.hemi[M]=G,M++}}_>0&&(t.isWebGL2||o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):o.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=g;const E=i.hash;(E.directionalLength!==v||E.pointLength!==m||E.spotLength!==f||E.rectAreaLength!==_||E.hemiLength!==M||E.numDirectionalShadows!==y||E.numPointShadows!==w||E.numSpotShadows!==A||E.numSpotMaps!==P)&&(i.directional.length=v,i.spot.length=f,i.rectArea.length=_,i.point.length=m,i.hemi.length=M,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=A+P-D,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=D,E.directionalLength=v,E.pointLength=m,E.spotLength=f,E.rectAreaLength=_,E.hemiLength=M,E.numDirectionalShadows=y,E.numPointShadows=w,E.numSpotShadows=A,E.numSpotMaps=P,i.version=Om++)}function c(u,d){let h=0,p=0,g=0,v=0,m=0;const f=d.matrixWorldInverse;for(let _=0,M=u.length;_<M;_++){const y=u[_];if(y.isDirectionalLight){const w=i.directional[h];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(f),h++}else if(y.isSpotLight){const w=i.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(f),g++}else if(y.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),a.identity(),r.copy(y.matrixWorld),r.premultiply(f),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){const w=i.point[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const w=i.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:i}}function Ba(o,t){const e=new Vm(o,t),n=[],i=[];function s(){n.length=0,i.length=0}function r(d){n.push(d)}function a(d){i.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:a}}function Gm(o,t){let e=new WeakMap;function n(s,r=0){const a=e.get(s);let l;return a===void 0?(l=new Ba(o,t),e.set(s,[l])):r>=a.length?(l=new Ba(o,t),a.push(l)):l=a[r],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class km extends Fi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hm extends Fi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Xm(o,t,e){let n=new ql;const i=new kt,s=new kt,r=new fe,a=new km({depthPacking:Uu}),l=new Hm,c={},u=e.maxTextureSize,d={[Pn]:Le,[Le]:Pn,[_n]:_n},h=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:Wm,fragmentShader:qm}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Mn;g.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ce(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bl,this.render=function(y,w,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const P=o.getRenderTarget(),D=o.getActiveCubeFace(),S=o.getActiveMipmapLevel(),E=o.state;E.setBlending(Cn),E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);for(let V=0,F=y.length;V<F;V++){const C=y[V],R=C.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",C,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;i.copy(R.mapSize);const I=R.getFrameExtents();if(i.multiply(I),s.copy(R.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/I.x),i.x=s.x*I.x,R.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/I.y),i.y=s.y*I.y,R.mapSize.y=s.y)),R.map===null){const Z=this.type!==Ki?{minFilter:Me,magFilter:Me}:{};R.map=new $n(i.x,i.y,Z),R.map.texture.name=C.name+".shadowMap",R.camera.updateProjectionMatrix()}o.setRenderTarget(R.map),o.clear();const U=R.getViewportCount();for(let Z=0;Z<U;Z++){const G=R.getViewport(Z);r.set(s.x*G.x,s.y*G.y,s.x*G.z,s.y*G.w),E.viewport(r),R.updateMatrices(C,Z),n=R.getFrustum(),M(w,A,R.camera,C,this.type)}R.isPointLightShadow!==!0&&this.type===Ki&&f(R,A),R.needsUpdate=!1}m.needsUpdate=!1,o.setRenderTarget(P,D,S)};function f(y,w){const A=t.update(v);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new $n(i.x,i.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,o.setRenderTarget(y.mapPass),o.clear(),o.renderBufferDirect(w,null,A,h,v,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,o.setRenderTarget(y.map),o.clear(),o.renderBufferDirect(w,null,A,p,v,null)}function _(y,w,A,P){let D=null;const S=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(S!==void 0)D=S;else if(D=A.isPointLight===!0?l:a,o.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const E=D.uuid,V=w.uuid;let F=c[E];F===void 0&&(F={},c[E]=F);let C=F[V];C===void 0&&(C=D.clone(),F[V]=C),D=C}if(D.visible=w.visible,D.wireframe=w.wireframe,P===Ki?D.side=w.shadowSide!==null?w.shadowSide:w.side:D.side=w.shadowSide!==null?w.shadowSide:d[w.side],D.alphaMap=w.alphaMap,D.alphaTest=w.alphaTest,D.map=w.map,D.clipShadows=w.clipShadows,D.clippingPlanes=w.clippingPlanes,D.clipIntersection=w.clipIntersection,D.displacementMap=w.displacementMap,D.displacementScale=w.displacementScale,D.displacementBias=w.displacementBias,D.wireframeLinewidth=w.wireframeLinewidth,D.linewidth=w.linewidth,A.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const E=o.properties.get(D);E.light=A}return D}function M(y,w,A,P,D){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&D===Ki)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const V=t.update(y),F=y.material;if(Array.isArray(F)){const C=V.groups;for(let R=0,I=C.length;R<I;R++){const U=C[R],Z=F[U.materialIndex];if(Z&&Z.visible){const G=_(y,Z,P,D);o.renderBufferDirect(A,null,V,G,y,U)}}}else if(F.visible){const C=_(y,F,P,D);o.renderBufferDirect(A,null,V,C,y,null)}}const E=y.children;for(let V=0,F=E.length;V<F;V++)M(E[V],w,A,P,D)}}function jm(o,t,e){const n=e.isWebGL2;function i(){let N=!1;const j=new fe;let tt=null;const lt=new fe(0,0,0,0);return{setMask:function(gt){tt!==gt&&!N&&(o.colorMask(gt,gt,gt,gt),tt=gt)},setLocked:function(gt){N=gt},setClear:function(gt,Ht,Yt,me,Sn){Sn===!0&&(gt*=me,Ht*=me,Yt*=me),j.set(gt,Ht,Yt,me),lt.equals(j)===!1&&(o.clearColor(gt,Ht,Yt,me),lt.copy(j))},reset:function(){N=!1,tt=null,lt.set(-1,0,0,0)}}}function s(){let N=!1,j=null,tt=null,lt=null;return{setTest:function(gt){gt?k(2929):Tt(2929)},setMask:function(gt){j!==gt&&!N&&(o.depthMask(gt),j=gt)},setFunc:function(gt){if(tt!==gt){switch(gt){case su:o.depthFunc(512);break;case ru:o.depthFunc(519);break;case ou:o.depthFunc(513);break;case Jr:o.depthFunc(515);break;case au:o.depthFunc(514);break;case lu:o.depthFunc(518);break;case cu:o.depthFunc(516);break;case uu:o.depthFunc(517);break;default:o.depthFunc(515)}tt=gt}},setLocked:function(gt){N=gt},setClear:function(gt){lt!==gt&&(o.clearDepth(gt),lt=gt)},reset:function(){N=!1,j=null,tt=null,lt=null}}}function r(){let N=!1,j=null,tt=null,lt=null,gt=null,Ht=null,Yt=null,me=null,Sn=null;return{setTest:function(Zt){N||(Zt?k(2960):Tt(2960))},setMask:function(Zt){j!==Zt&&!N&&(o.stencilMask(Zt),j=Zt)},setFunc:function(Zt,ze,Ze){(tt!==Zt||lt!==ze||gt!==Ze)&&(o.stencilFunc(Zt,ze,Ze),tt=Zt,lt=ze,gt=Ze)},setOp:function(Zt,ze,Ze){(Ht!==Zt||Yt!==ze||me!==Ze)&&(o.stencilOp(Zt,ze,Ze),Ht=Zt,Yt=ze,me=Ze)},setLocked:function(Zt){N=Zt},setClear:function(Zt){Sn!==Zt&&(o.clearStencil(Zt),Sn=Zt)},reset:function(){N=!1,j=null,tt=null,lt=null,gt=null,Ht=null,Yt=null,me=null,Sn=null}}}const a=new i,l=new s,c=new r,u=new WeakMap,d=new WeakMap;let h={},p={},g=new WeakMap,v=[],m=null,f=!1,_=null,M=null,y=null,w=null,A=null,P=null,D=null,S=!1,E=null,V=null,F=null,C=null,R=null;const I=o.getParameter(35661);let U=!1,Z=0;const G=o.getParameter(7938);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),U=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),U=Z>=2);let Y=null,Q={};const ft=o.getParameter(3088),W=o.getParameter(2978),H=new fe().fromArray(ft),J=new fe().fromArray(W);function st(N,j,tt){const lt=new Uint8Array(4),gt=o.createTexture();o.bindTexture(N,gt),o.texParameteri(N,10241,9728),o.texParameteri(N,10240,9728);for(let Ht=0;Ht<tt;Ht++)o.texImage2D(j+Ht,0,6408,1,1,0,6408,5121,lt);return gt}const ot={};ot[3553]=st(3553,3553,1),ot[34067]=st(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),k(2929),l.setFunc(Jr),he(!1),le(Eo),k(2884),Rt(Cn);function k(N){h[N]!==!0&&(o.enable(N),h[N]=!0)}function Tt(N){h[N]!==!1&&(o.disable(N),h[N]=!1)}function bt(N,j){return p[N]!==j?(o.bindFramebuffer(N,j),p[N]=j,n&&(N===36009&&(p[36160]=j),N===36160&&(p[36009]=j)),!0):!1}function rt(N,j){let tt=v,lt=!1;if(N)if(tt=g.get(j),tt===void 0&&(tt=[],g.set(j,tt)),N.isWebGLMultipleRenderTargets){const gt=N.texture;if(tt.length!==gt.length||tt[0]!==36064){for(let Ht=0,Yt=gt.length;Ht<Yt;Ht++)tt[Ht]=36064+Ht;tt.length=gt.length,lt=!0}}else tt[0]!==36064&&(tt[0]=36064,lt=!0);else tt[0]!==1029&&(tt[0]=1029,lt=!0);lt&&(e.isWebGL2?o.drawBuffers(tt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(tt))}function Mt(N){return m!==N?(o.useProgram(N),m=N,!0):!1}const Ft={[yi]:32774,[jc]:32778,[Yc]:32779};if(n)Ft[Lo]=32775,Ft[Po]=32776;else{const N=t.get("EXT_blend_minmax");N!==null&&(Ft[Lo]=N.MIN_EXT,Ft[Po]=N.MAX_EXT)}const vt={[Kc]:0,[$c]:1,[Zc]:768,[El]:770,[iu]:776,[eu]:774,[Qc]:772,[Jc]:769,[Tl]:771,[nu]:775,[tu]:773};function Rt(N,j,tt,lt,gt,Ht,Yt,me){if(N===Cn){f===!0&&(Tt(3042),f=!1);return}if(f===!1&&(k(3042),f=!0),N!==Xc){if(N!==_||me!==S){if((M!==yi||A!==yi)&&(o.blendEquation(32774),M=yi,A=yi),me)switch(N){case bi:o.blendFuncSeparate(1,771,1,771);break;case To:o.blendFunc(1,1);break;case Ao:o.blendFuncSeparate(0,769,0,1);break;case Co:o.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case bi:o.blendFuncSeparate(770,771,1,771);break;case To:o.blendFunc(770,1);break;case Ao:o.blendFuncSeparate(0,769,0,1);break;case Co:o.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,w=null,P=null,D=null,_=N,S=me}return}gt=gt||j,Ht=Ht||tt,Yt=Yt||lt,(j!==M||gt!==A)&&(o.blendEquationSeparate(Ft[j],Ft[gt]),M=j,A=gt),(tt!==y||lt!==w||Ht!==P||Yt!==D)&&(o.blendFuncSeparate(vt[tt],vt[lt],vt[Ht],vt[Yt]),y=tt,w=lt,P=Ht,D=Yt),_=N,S=!1}function ae(N,j){N.side===_n?Tt(2884):k(2884);let tt=N.side===Le;j&&(tt=!tt),he(tt),N.blending===bi&&N.transparent===!1?Rt(Cn):Rt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),a.setMask(N.colorWrite);const lt=N.stencilWrite;c.setTest(lt),lt&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ot(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?k(32926):Tt(32926)}function he(N){E!==N&&(N?o.frontFace(2304):o.frontFace(2305),E=N)}function le(N){N!==Hc?(k(2884),N!==V&&(N===Eo?o.cullFace(1029):N===Wc?o.cullFace(1028):o.cullFace(1032))):Tt(2884),V=N}function ie(N){N!==F&&(U&&o.lineWidth(N),F=N)}function Ot(N,j,tt){N?(k(32823),(C!==j||R!==tt)&&(o.polygonOffset(j,tt),C=j,R=tt)):Tt(32823)}function Kt(N){N?k(3089):Tt(3089)}function be(N){N===void 0&&(N=33984+I-1),Y!==N&&(o.activeTexture(N),Y=N)}function L(N,j,tt){tt===void 0&&(Y===null?tt=33984+I-1:tt=Y);let lt=Q[tt];lt===void 0&&(lt={type:void 0,texture:void 0},Q[tt]=lt),(lt.type!==N||lt.texture!==j)&&(Y!==tt&&(o.activeTexture(tt),Y=tt),o.bindTexture(N,j||ot[N]),lt.type=N,lt.texture=j)}function b(){const N=Q[Y];N!==void 0&&N.type!==void 0&&(o.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function q(){try{o.compressedTexImage2D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{o.compressedTexImage3D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{o.texSubImage2D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{o.texSubImage3D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{o.texStorage2D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{o.texStorage3D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{o.texImage2D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function yt(){try{o.texImage3D.apply(o,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ht(N){H.equals(N)===!1&&(o.scissor(N.x,N.y,N.z,N.w),H.copy(N))}function mt(N){J.equals(N)===!1&&(o.viewport(N.x,N.y,N.z,N.w),J.copy(N))}function Nt(N,j){let tt=d.get(j);tt===void 0&&(tt=new WeakMap,d.set(j,tt));let lt=tt.get(N);lt===void 0&&(lt=o.getUniformBlockIndex(j,N.name),tt.set(N,lt))}function Bt(N,j){const lt=d.get(j).get(N);u.get(j)!==lt&&(o.uniformBlockBinding(j,lt,N.__bindingPointIndex),u.set(j,lt))}function $t(){o.disable(3042),o.disable(2884),o.disable(2929),o.disable(32823),o.disable(3089),o.disable(2960),o.disable(32926),o.blendEquation(32774),o.blendFunc(1,0),o.blendFuncSeparate(1,0,1,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(513),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(519,0,4294967295),o.stencilOp(7680,7680,7680),o.clearStencil(0),o.cullFace(1029),o.frontFace(2305),o.polygonOffset(0,0),o.activeTexture(33984),o.bindFramebuffer(36160,null),n===!0&&(o.bindFramebuffer(36009,null),o.bindFramebuffer(36008,null)),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},Y=null,Q={},p={},g=new WeakMap,v=[],m=null,f=!1,_=null,M=null,y=null,w=null,A=null,P=null,D=null,S=!1,E=null,V=null,F=null,C=null,R=null,H.set(0,0,o.canvas.width,o.canvas.height),J.set(0,0,o.canvas.width,o.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:k,disable:Tt,bindFramebuffer:bt,drawBuffers:rt,useProgram:Mt,setBlending:Rt,setMaterial:ae,setFlipSided:he,setCullFace:le,setLineWidth:ie,setPolygonOffset:Ot,setScissorTest:Kt,activeTexture:be,bindTexture:L,unbindTexture:b,compressedTexImage2D:q,compressedTexImage3D:et,texImage2D:_t,texImage3D:yt,updateUBOMapping:Nt,uniformBlockBinding:Bt,texStorage2D:K,texStorage3D:pt,texSubImage2D:nt,texSubImage3D:at,compressedTexSubImage2D:St,compressedTexSubImage3D:dt,scissor:ht,viewport:mt,reset:$t}}function Ym(o,t,e,n,i,s,r){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,d=i.maxSamples,h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let v;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,b){return f?new OffscreenCanvas(L,b):ss("canvas")}function M(L,b,q,et){let nt=1;if((L.width>et||L.height>et)&&(nt=et/Math.max(L.width,L.height)),nt<1||b===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const at=b?Dl:Math.floor,St=at(nt*L.width),dt=at(nt*L.height);v===void 0&&(v=_(St,dt));const K=q?_(St,dt):v;return K.width=St,K.height=dt,K.getContext("2d").drawImage(L,0,0,St,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+St+"x"+dt+")."),K}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function y(L){return so(L.width)&&so(L.height)}function w(L){return a?!1:L.wrapS!==qe||L.wrapT!==qe||L.minFilter!==Me&&L.minFilter!==Ae}function A(L,b){return L.generateMipmaps&&b&&L.minFilter!==Me&&L.minFilter!==Ae}function P(L){o.generateMipmap(L)}function D(L,b,q,et,nt=!1){if(a===!1)return b;if(L!==null){if(o[L]!==void 0)return o[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let at=b;return b===6403&&(q===5126&&(at=33326),q===5131&&(at=33325),q===5121&&(at=33321)),b===33319&&(q===5126&&(at=33328),q===5131&&(at=33327),q===5121&&(at=33323)),b===6408&&(q===5126&&(at=34836),q===5131&&(at=34842),q===5121&&(at=et===qt&&nt===!1?35907:32856),q===32819&&(at=32854),q===32820&&(at=32855)),(at===33325||at===33326||at===33327||at===33328||at===34842||at===34836)&&t.get("EXT_color_buffer_float"),at}function S(L,b,q){return A(L,q)===!0||L.isFramebufferTexture&&L.minFilter!==Me&&L.minFilter!==Ae?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function E(L){return L===Me||L===Ro||L===ur?9728:9729}function V(L){const b=L.target;b.removeEventListener("dispose",V),C(b),b.isVideoTexture&&g.delete(b)}function F(L){const b=L.target;b.removeEventListener("dispose",F),I(b)}function C(L){const b=n.get(L);if(b.__webglInit===void 0)return;const q=L.source,et=m.get(q);if(et){const nt=et[b.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&R(L),Object.keys(et).length===0&&m.delete(q)}n.remove(L)}function R(L){const b=n.get(L);o.deleteTexture(b.__webglTexture);const q=L.source,et=m.get(q);delete et[b.__cacheKey],r.memory.textures--}function I(L){const b=L.texture,q=n.get(L),et=n.get(b);if(et.__webglTexture!==void 0&&(o.deleteTexture(et.__webglTexture),r.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++)o.deleteFramebuffer(q.__webglFramebuffer[nt]),q.__webglDepthbuffer&&o.deleteRenderbuffer(q.__webglDepthbuffer[nt]);else{if(o.deleteFramebuffer(q.__webglFramebuffer),q.__webglDepthbuffer&&o.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&o.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let nt=0;nt<q.__webglColorRenderbuffer.length;nt++)q.__webglColorRenderbuffer[nt]&&o.deleteRenderbuffer(q.__webglColorRenderbuffer[nt]);q.__webglDepthRenderbuffer&&o.deleteRenderbuffer(q.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let nt=0,at=b.length;nt<at;nt++){const St=n.get(b[nt]);St.__webglTexture&&(o.deleteTexture(St.__webglTexture),r.memory.textures--),n.remove(b[nt])}n.remove(b),n.remove(L)}let U=0;function Z(){U=0}function G(){const L=U;return L>=l&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l),U+=1,L}function Y(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.encoding),b.join()}function Q(L,b){const q=n.get(L);if(L.isVideoTexture&&Kt(L),L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){const et=L.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(q,L,b);return}}e.bindTexture(3553,q.__webglTexture,33984+b)}function ft(L,b){const q=n.get(L);if(L.version>0&&q.__version!==L.version){Tt(q,L,b);return}e.bindTexture(35866,q.__webglTexture,33984+b)}function W(L,b){const q=n.get(L);if(L.version>0&&q.__version!==L.version){Tt(q,L,b);return}e.bindTexture(32879,q.__webglTexture,33984+b)}function H(L,b){const q=n.get(L);if(L.version>0&&q.__version!==L.version){bt(q,L,b);return}e.bindTexture(34067,q.__webglTexture,33984+b)}const J={[eo]:10497,[qe]:33071,[no]:33648},st={[Me]:9728,[Ro]:9984,[ur]:9986,[Ae]:9729,[_u]:9985,[ts]:9987};function ot(L,b,q){if(q?(o.texParameteri(L,10242,J[b.wrapS]),o.texParameteri(L,10243,J[b.wrapT]),(L===32879||L===35866)&&o.texParameteri(L,32882,J[b.wrapR]),o.texParameteri(L,10240,st[b.magFilter]),o.texParameteri(L,10241,st[b.minFilter])):(o.texParameteri(L,10242,33071),o.texParameteri(L,10243,33071),(L===32879||L===35866)&&o.texParameteri(L,32882,33071),(b.wrapS!==qe||b.wrapT!==qe)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),o.texParameteri(L,10240,E(b.magFilter)),o.texParameteri(L,10241,E(b.minFilter)),b.minFilter!==Me&&b.minFilter!==Ae&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const et=t.get("EXT_texture_filter_anisotropic");if(b.magFilter===Me||b.minFilter!==ur&&b.minFilter!==ts||b.type===qn&&t.has("OES_texture_float_linear")===!1||a===!1&&b.type===es&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(o.texParameterf(L,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function k(L,b){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",V));const et=b.source;let nt=m.get(et);nt===void 0&&(nt={},m.set(et,nt));const at=Y(b);if(at!==L.__cacheKey){nt[at]===void 0&&(nt[at]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,q=!0),nt[at].usedTimes++;const St=nt[L.__cacheKey];St!==void 0&&(nt[L.__cacheKey].usedTimes--,St.usedTimes===0&&R(b)),L.__cacheKey=at,L.__webglTexture=nt[at].texture}return q}function Tt(L,b,q){let et=3553;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(et=35866),b.isData3DTexture&&(et=32879);const nt=k(L,b),at=b.source;e.bindTexture(et,L.__webglTexture,33984+q);const St=n.get(at);if(at.version!==St.__version||nt===!0){e.activeTexture(33984+q),o.pixelStorei(37440,b.flipY),o.pixelStorei(37441,b.premultiplyAlpha),o.pixelStorei(3317,b.unpackAlignment),o.pixelStorei(37443,0);const dt=w(b)&&y(b.image)===!1;let K=M(b.image,dt,!1,u);K=be(b,K);const pt=y(K)||a,_t=s.convert(b.format,b.encoding);let yt=s.convert(b.type),ht=D(b.internalFormat,_t,yt,b.encoding,b.isVideoTexture);ot(et,b,pt);let mt;const Nt=b.mipmaps,Bt=a&&b.isVideoTexture!==!0,$t=St.__version===void 0||nt===!0,N=S(b,K,pt);if(b.isDepthTexture)ht=6402,a?b.type===qn?ht=36012:b.type===Wn?ht=33190:b.type===Ei?ht=35056:ht=33189:b.type===qn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Xn&&ht===6402&&b.type!==Ll&&b.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Wn,yt=s.convert(b.type)),b.format===Di&&ht===6402&&(ht=34041,b.type!==Ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Ei,yt=s.convert(b.type))),$t&&(Bt?e.texStorage2D(3553,1,ht,K.width,K.height):e.texImage2D(3553,0,ht,K.width,K.height,0,_t,yt,null));else if(b.isDataTexture)if(Nt.length>0&&pt){Bt&&$t&&e.texStorage2D(3553,N,ht,Nt[0].width,Nt[0].height);for(let j=0,tt=Nt.length;j<tt;j++)mt=Nt[j],Bt?e.texSubImage2D(3553,j,0,0,mt.width,mt.height,_t,yt,mt.data):e.texImage2D(3553,j,ht,mt.width,mt.height,0,_t,yt,mt.data);b.generateMipmaps=!1}else Bt?($t&&e.texStorage2D(3553,N,ht,K.width,K.height),e.texSubImage2D(3553,0,0,0,K.width,K.height,_t,yt,K.data)):e.texImage2D(3553,0,ht,K.width,K.height,0,_t,yt,K.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Bt&&$t&&e.texStorage3D(35866,N,ht,Nt[0].width,Nt[0].height,K.depth);for(let j=0,tt=Nt.length;j<tt;j++)mt=Nt[j],b.format!==Xe?_t!==null?Bt?e.compressedTexSubImage3D(35866,j,0,0,0,mt.width,mt.height,K.depth,_t,mt.data,0,0):e.compressedTexImage3D(35866,j,ht,mt.width,mt.height,K.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?e.texSubImage3D(35866,j,0,0,0,mt.width,mt.height,K.depth,_t,yt,mt.data):e.texImage3D(35866,j,ht,mt.width,mt.height,K.depth,0,_t,yt,mt.data)}else{Bt&&$t&&e.texStorage2D(3553,N,ht,Nt[0].width,Nt[0].height);for(let j=0,tt=Nt.length;j<tt;j++)mt=Nt[j],b.format!==Xe?_t!==null?Bt?e.compressedTexSubImage2D(3553,j,0,0,mt.width,mt.height,_t,mt.data):e.compressedTexImage2D(3553,j,ht,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?e.texSubImage2D(3553,j,0,0,mt.width,mt.height,_t,yt,mt.data):e.texImage2D(3553,j,ht,mt.width,mt.height,0,_t,yt,mt.data)}else if(b.isDataArrayTexture)Bt?($t&&e.texStorage3D(35866,N,ht,K.width,K.height,K.depth),e.texSubImage3D(35866,0,0,0,0,K.width,K.height,K.depth,_t,yt,K.data)):e.texImage3D(35866,0,ht,K.width,K.height,K.depth,0,_t,yt,K.data);else if(b.isData3DTexture)Bt?($t&&e.texStorage3D(32879,N,ht,K.width,K.height,K.depth),e.texSubImage3D(32879,0,0,0,0,K.width,K.height,K.depth,_t,yt,K.data)):e.texImage3D(32879,0,ht,K.width,K.height,K.depth,0,_t,yt,K.data);else if(b.isFramebufferTexture){if($t)if(Bt)e.texStorage2D(3553,N,ht,K.width,K.height);else{let j=K.width,tt=K.height;for(let lt=0;lt<N;lt++)e.texImage2D(3553,lt,ht,j,tt,0,_t,yt,null),j>>=1,tt>>=1}}else if(Nt.length>0&&pt){Bt&&$t&&e.texStorage2D(3553,N,ht,Nt[0].width,Nt[0].height);for(let j=0,tt=Nt.length;j<tt;j++)mt=Nt[j],Bt?e.texSubImage2D(3553,j,0,0,_t,yt,mt):e.texImage2D(3553,j,ht,_t,yt,mt);b.generateMipmaps=!1}else Bt?($t&&e.texStorage2D(3553,N,ht,K.width,K.height),e.texSubImage2D(3553,0,0,0,_t,yt,K)):e.texImage2D(3553,0,ht,_t,yt,K);A(b,pt)&&P(et),St.__version=at.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function bt(L,b,q){if(b.image.length!==6)return;const et=k(L,b),nt=b.source;e.bindTexture(34067,L.__webglTexture,33984+q);const at=n.get(nt);if(nt.version!==at.__version||et===!0){e.activeTexture(33984+q),o.pixelStorei(37440,b.flipY),o.pixelStorei(37441,b.premultiplyAlpha),o.pixelStorei(3317,b.unpackAlignment),o.pixelStorei(37443,0);const St=b.isCompressedTexture||b.image[0].isCompressedTexture,dt=b.image[0]&&b.image[0].isDataTexture,K=[];for(let j=0;j<6;j++)!St&&!dt?K[j]=M(b.image[j],!1,!0,c):K[j]=dt?b.image[j].image:b.image[j],K[j]=be(b,K[j]);const pt=K[0],_t=y(pt)||a,yt=s.convert(b.format,b.encoding),ht=s.convert(b.type),mt=D(b.internalFormat,yt,ht,b.encoding),Nt=a&&b.isVideoTexture!==!0,Bt=at.__version===void 0||et===!0;let $t=S(b,pt,_t);ot(34067,b,_t);let N;if(St){Nt&&Bt&&e.texStorage2D(34067,$t,mt,pt.width,pt.height);for(let j=0;j<6;j++){N=K[j].mipmaps;for(let tt=0;tt<N.length;tt++){const lt=N[tt];b.format!==Xe?yt!==null?Nt?e.compressedTexSubImage2D(34069+j,tt,0,0,lt.width,lt.height,yt,lt.data):e.compressedTexImage2D(34069+j,tt,mt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(34069+j,tt,0,0,lt.width,lt.height,yt,ht,lt.data):e.texImage2D(34069+j,tt,mt,lt.width,lt.height,0,yt,ht,lt.data)}}}else{N=b.mipmaps,Nt&&Bt&&(N.length>0&&$t++,e.texStorage2D(34067,$t,mt,K[0].width,K[0].height));for(let j=0;j<6;j++)if(dt){Nt?e.texSubImage2D(34069+j,0,0,0,K[j].width,K[j].height,yt,ht,K[j].data):e.texImage2D(34069+j,0,mt,K[j].width,K[j].height,0,yt,ht,K[j].data);for(let tt=0;tt<N.length;tt++){const gt=N[tt].image[j].image;Nt?e.texSubImage2D(34069+j,tt+1,0,0,gt.width,gt.height,yt,ht,gt.data):e.texImage2D(34069+j,tt+1,mt,gt.width,gt.height,0,yt,ht,gt.data)}}else{Nt?e.texSubImage2D(34069+j,0,0,0,yt,ht,K[j]):e.texImage2D(34069+j,0,mt,yt,ht,K[j]);for(let tt=0;tt<N.length;tt++){const lt=N[tt];Nt?e.texSubImage2D(34069+j,tt+1,0,0,yt,ht,lt.image[j]):e.texImage2D(34069+j,tt+1,mt,yt,ht,lt.image[j])}}}A(b,_t)&&P(34067),at.__version=nt.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function rt(L,b,q,et,nt){const at=s.convert(q.format,q.encoding),St=s.convert(q.type),dt=D(q.internalFormat,at,St,q.encoding);n.get(b).__hasExternalTextures||(nt===32879||nt===35866?e.texImage3D(nt,0,dt,b.width,b.height,b.depth,0,at,St,null):e.texImage2D(nt,0,dt,b.width,b.height,0,at,St,null)),e.bindFramebuffer(36160,L),Ot(b)?h.framebufferTexture2DMultisampleEXT(36160,et,nt,n.get(q).__webglTexture,0,ie(b)):(nt===3553||nt>=34069&&nt<=34074)&&o.framebufferTexture2D(36160,et,nt,n.get(q).__webglTexture,0),e.bindFramebuffer(36160,null)}function Mt(L,b,q){if(o.bindRenderbuffer(36161,L),b.depthBuffer&&!b.stencilBuffer){let et=33189;if(q||Ot(b)){const nt=b.depthTexture;nt&&nt.isDepthTexture&&(nt.type===qn?et=36012:nt.type===Wn&&(et=33190));const at=ie(b);Ot(b)?h.renderbufferStorageMultisampleEXT(36161,at,et,b.width,b.height):o.renderbufferStorageMultisample(36161,at,et,b.width,b.height)}else o.renderbufferStorage(36161,et,b.width,b.height);o.framebufferRenderbuffer(36160,36096,36161,L)}else if(b.depthBuffer&&b.stencilBuffer){const et=ie(b);q&&Ot(b)===!1?o.renderbufferStorageMultisample(36161,et,35056,b.width,b.height):Ot(b)?h.renderbufferStorageMultisampleEXT(36161,et,35056,b.width,b.height):o.renderbufferStorage(36161,34041,b.width,b.height),o.framebufferRenderbuffer(36160,33306,36161,L)}else{const et=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let nt=0;nt<et.length;nt++){const at=et[nt],St=s.convert(at.format,at.encoding),dt=s.convert(at.type),K=D(at.internalFormat,St,dt,at.encoding),pt=ie(b);q&&Ot(b)===!1?o.renderbufferStorageMultisample(36161,pt,K,b.width,b.height):Ot(b)?h.renderbufferStorageMultisampleEXT(36161,pt,K,b.width,b.height):o.renderbufferStorage(36161,K,b.width,b.height)}}o.bindRenderbuffer(36161,null)}function Ft(L,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q(b.depthTexture,0);const et=n.get(b.depthTexture).__webglTexture,nt=ie(b);if(b.depthTexture.format===Xn)Ot(b)?h.framebufferTexture2DMultisampleEXT(36160,36096,3553,et,0,nt):o.framebufferTexture2D(36160,36096,3553,et,0);else if(b.depthTexture.format===Di)Ot(b)?h.framebufferTexture2DMultisampleEXT(36160,33306,3553,et,0,nt):o.framebufferTexture2D(36160,33306,3553,et,0);else throw new Error("Unknown depthTexture format")}function vt(L){const b=n.get(L),q=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!b.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Ft(b.__webglFramebuffer,L)}else if(q){b.__webglDepthbuffer=[];for(let et=0;et<6;et++)e.bindFramebuffer(36160,b.__webglFramebuffer[et]),b.__webglDepthbuffer[et]=o.createRenderbuffer(),Mt(b.__webglDepthbuffer[et],L,!1)}else e.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=o.createRenderbuffer(),Mt(b.__webglDepthbuffer,L,!1);e.bindFramebuffer(36160,null)}function Rt(L,b,q){const et=n.get(L);b!==void 0&&rt(et.__webglFramebuffer,L,L.texture,36064,3553),q!==void 0&&vt(L)}function ae(L){const b=L.texture,q=n.get(L),et=n.get(b);L.addEventListener("dispose",F),L.isWebGLMultipleRenderTargets!==!0&&(et.__webglTexture===void 0&&(et.__webglTexture=o.createTexture()),et.__version=b.version,r.memory.textures++);const nt=L.isWebGLCubeRenderTarget===!0,at=L.isWebGLMultipleRenderTargets===!0,St=y(L)||a;if(nt){q.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)q.__webglFramebuffer[dt]=o.createFramebuffer()}else{if(q.__webglFramebuffer=o.createFramebuffer(),at)if(i.drawBuffers){const dt=L.texture;for(let K=0,pt=dt.length;K<pt;K++){const _t=n.get(dt[K]);_t.__webglTexture===void 0&&(_t.__webglTexture=o.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&Ot(L)===!1){const dt=at?b:[b];q.__webglMultisampledFramebuffer=o.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,q.__webglMultisampledFramebuffer);for(let K=0;K<dt.length;K++){const pt=dt[K];q.__webglColorRenderbuffer[K]=o.createRenderbuffer(),o.bindRenderbuffer(36161,q.__webglColorRenderbuffer[K]);const _t=s.convert(pt.format,pt.encoding),yt=s.convert(pt.type),ht=D(pt.internalFormat,_t,yt,pt.encoding,L.isXRRenderTarget===!0),mt=ie(L);o.renderbufferStorageMultisample(36161,mt,ht,L.width,L.height),o.framebufferRenderbuffer(36160,36064+K,36161,q.__webglColorRenderbuffer[K])}o.bindRenderbuffer(36161,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=o.createRenderbuffer(),Mt(q.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(36160,null)}}if(nt){e.bindTexture(34067,et.__webglTexture),ot(34067,b,St);for(let dt=0;dt<6;dt++)rt(q.__webglFramebuffer[dt],L,b,36064,34069+dt);A(b,St)&&P(34067),e.unbindTexture()}else if(at){const dt=L.texture;for(let K=0,pt=dt.length;K<pt;K++){const _t=dt[K],yt=n.get(_t);e.bindTexture(3553,yt.__webglTexture),ot(3553,_t,St),rt(q.__webglFramebuffer,L,_t,36064+K,3553),A(_t,St)&&P(3553)}e.unbindTexture()}else{let dt=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?dt=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(dt,et.__webglTexture),ot(dt,b,St),rt(q.__webglFramebuffer,L,b,36064,dt),A(b,St)&&P(dt),e.unbindTexture()}L.depthBuffer&&vt(L)}function he(L){const b=y(L)||a,q=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let et=0,nt=q.length;et<nt;et++){const at=q[et];if(A(at,b)){const St=L.isWebGLCubeRenderTarget?34067:3553,dt=n.get(at).__webglTexture;e.bindTexture(St,dt),P(St),e.unbindTexture()}}}function le(L){if(a&&L.samples>0&&Ot(L)===!1){const b=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],q=L.width,et=L.height;let nt=16384;const at=[],St=L.stencilBuffer?33306:36096,dt=n.get(L),K=L.isWebGLMultipleRenderTargets===!0;if(K)for(let pt=0;pt<b.length;pt++)e.bindFramebuffer(36160,dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+pt,36161,null),e.bindFramebuffer(36160,dt.__webglFramebuffer),o.framebufferTexture2D(36009,36064+pt,3553,null,0);e.bindFramebuffer(36008,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,dt.__webglFramebuffer);for(let pt=0;pt<b.length;pt++){at.push(36064+pt),L.depthBuffer&&at.push(St);const _t=dt.__ignoreDepthValues!==void 0?dt.__ignoreDepthValues:!1;if(_t===!1&&(L.depthBuffer&&(nt|=256),L.stencilBuffer&&(nt|=1024)),K&&o.framebufferRenderbuffer(36008,36064,36161,dt.__webglColorRenderbuffer[pt]),_t===!0&&(o.invalidateFramebuffer(36008,[St]),o.invalidateFramebuffer(36009,[St])),K){const yt=n.get(b[pt]).__webglTexture;o.framebufferTexture2D(36009,36064,3553,yt,0)}o.blitFramebuffer(0,0,q,et,0,0,q,et,nt,9728),p&&o.invalidateFramebuffer(36008,at)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),K)for(let pt=0;pt<b.length;pt++){e.bindFramebuffer(36160,dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(36160,36064+pt,36161,dt.__webglColorRenderbuffer[pt]);const _t=n.get(b[pt]).__webglTexture;e.bindFramebuffer(36160,dt.__webglFramebuffer),o.framebufferTexture2D(36009,36064+pt,3553,_t,0)}e.bindFramebuffer(36009,dt.__webglMultisampledFramebuffer)}}function ie(L){return Math.min(d,L.samples)}function Ot(L){const b=n.get(L);return a&&L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Kt(L){const b=r.render.frame;g.get(L)!==b&&(g.set(L,b),L.update())}function be(L,b){const q=L.encoding,et=L.format,nt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===io||q!==Kn&&(q===qt?a===!1?t.has("EXT_sRGB")===!0&&et===Xe?(L.format=io,L.minFilter=Ae,L.generateMipmaps=!1):b=Nl.sRGBToLinear(b):(et!==Xe||nt!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",q)),b}this.allocateTextureUnit=G,this.resetTextureUnits=Z,this.setTexture2D=Q,this.setTexture2DArray=ft,this.setTexture3D=W,this.setTextureCube=H,this.rebindTextures=Rt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Ot}function Km(o,t,e){const n=e.isWebGL2;function i(s,r=null){let a;if(s===Yn)return 5121;if(s===Su)return 32819;if(s===wu)return 32820;if(s===xu)return 5120;if(s===yu)return 5122;if(s===Ll)return 5123;if(s===Mu)return 5124;if(s===Wn)return 5125;if(s===qn)return 5126;if(s===es)return n?5131:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===bu)return 6406;if(s===Xe)return 6408;if(s===Eu)return 6409;if(s===Tu)return 6410;if(s===Xn)return 6402;if(s===Di)return 34041;if(s===io)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Au)return 6403;if(s===Cu)return 36244;if(s===Lu)return 33319;if(s===Pu)return 33320;if(s===Ru)return 36249;if(s===hr||s===dr||s===fr||s===pr)if(r===qt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===hr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===dr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===fr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===hr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===dr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===fr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Do||s===Io||s===No||s===Uo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Do)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Io)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===No)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Uo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Du)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===zo||s===Fo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===zo)return r===qt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Fo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Oo||s===Bo||s===Vo||s===Go||s===ko||s===Ho||s===Wo||s===qo||s===Xo||s===jo||s===Yo||s===Ko||s===$o||s===Zo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Oo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Bo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Vo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Go)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ko)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ho)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Wo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===qo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Xo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Yo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ko)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===$o)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Zo)return r===qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===mr)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===mr)return r===qt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===Iu||s===Jo||s===Qo||s===ta)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===mr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Jo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Qo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ta)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ei?n?34042:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):o[s]!==void 0?o[s]:null}return{convert:i}}class $m extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ke extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zm={type:"move"};class Fr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Jm extends we{constructor(t,e,n,i,s,r,a,l,c,u){if(u=u!==void 0?u:Xn,u!==Xn&&u!==Di)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Xn&&(n=Wn),n===void 0&&u===Di&&(n=Ei),super(null,i,s,r,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Me,this.minFilter=l!==void 0?l:Me,this.flipY=!1,this.generateMipmaps=!1}}class Qm extends Ni{constructor(t,e){super();const n=this;let i=null,s=1,r=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const v=e.getContextAttributes();let m=null,f=null;const _=[],M=[],y=new Set,w=new Map,A=new Oe;A.layers.enable(1),A.viewport=new fe;const P=new Oe;P.layers.enable(2),P.viewport=new fe;const D=[A,P],S=new $m;S.layers.enable(1),S.layers.enable(2);let E=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let J=_[H];return J===void 0&&(J=new Fr,_[H]=J),J.getTargetRaySpace()},this.getControllerGrip=function(H){let J=_[H];return J===void 0&&(J=new Fr,_[H]=J),J.getGripSpace()},this.getHand=function(H){let J=_[H];return J===void 0&&(J=new Fr,_[H]=J),J.getHandSpace()};function F(H){const J=M.indexOf(H.inputSource);if(J===-1)return;const st=_[J];st!==void 0&&st.dispatchEvent({type:H.type,data:H.inputSource})}function C(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",C),i.removeEventListener("inputsourceschange",R);for(let H=0;H<_.length;H++){const J=M[H];J!==null&&(M[H]=null,_[H].disconnect(J))}E=null,V=null,t.setRenderTarget(m),p=null,h=null,d=null,i=null,f=null,W.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",C),i.addEventListener("inputsourceschange",R),v.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const J={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:v.alpha,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,J),i.updateRenderState({baseLayer:p}),f=new $n(p.framebufferWidth,p.framebufferHeight,{format:Xe,type:Yn,encoding:t.outputEncoding,stencilBuffer:v.stencil})}else{let J=null,st=null,ot=null;v.depth&&(ot=v.stencil?35056:33190,J=v.stencil?Di:Xn,st=v.stencil?Ei:Wn);const k={colorFormat:32856,depthFormat:ot,scaleFactor:s};d=new XRWebGLBinding(i,e),h=d.createProjectionLayer(k),i.updateRenderState({layers:[h]}),f=new $n(h.textureWidth,h.textureHeight,{format:Xe,type:Yn,depthTexture:new Jm(h.textureWidth,h.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:v.stencil,encoding:t.outputEncoding,samples:v.antialias?4:0});const Tt=t.properties.get(f);Tt.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),W.setContext(i),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function R(H){for(let J=0;J<H.removed.length;J++){const st=H.removed[J],ot=M.indexOf(st);ot>=0&&(M[ot]=null,_[ot].disconnect(st))}for(let J=0;J<H.added.length;J++){const st=H.added[J];let ot=M.indexOf(st);if(ot===-1){for(let Tt=0;Tt<_.length;Tt++)if(Tt>=M.length){M.push(st),ot=Tt;break}else if(M[Tt]===null){M[Tt]=st,ot=Tt;break}if(ot===-1)break}const k=_[ot];k&&k.connect(st)}}const I=new O,U=new O;function Z(H,J,st){I.setFromMatrixPosition(J.matrixWorld),U.setFromMatrixPosition(st.matrixWorld);const ot=I.distanceTo(U),k=J.projectionMatrix.elements,Tt=st.projectionMatrix.elements,bt=k[14]/(k[10]-1),rt=k[14]/(k[10]+1),Mt=(k[9]+1)/k[5],Ft=(k[9]-1)/k[5],vt=(k[8]-1)/k[0],Rt=(Tt[8]+1)/Tt[0],ae=bt*vt,he=bt*Rt,le=ot/(-vt+Rt),ie=le*-vt;J.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(ie),H.translateZ(le),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const Ot=bt+le,Kt=rt+le,be=ae-ie,L=he+(ot-ie),b=Mt*rt/Kt*Ot,q=Ft*rt/Kt*Ot;H.projectionMatrix.makePerspective(be,L,b,q,Ot,Kt),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function G(H,J){J===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(J.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;S.near=P.near=A.near=H.near,S.far=P.far=A.far=H.far,(E!==S.near||V!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,V=S.far);const J=H.parent,st=S.cameras;G(S,J);for(let ot=0;ot<st.length;ot++)G(st[ot],J);st.length===2?Z(S,A,P):S.projectionMatrix.copy(A.projectionMatrix),Y(H,S,J)};function Y(H,J,st){st===null?H.matrix.copy(J.matrixWorld):(H.matrix.copy(st.matrixWorld),H.matrix.invert(),H.matrix.multiply(J.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0);const ot=H.children;for(let k=0,Tt=ot.length;k<Tt;k++)ot[k].updateMatrixWorld(!0);H.projectionMatrix.copy(J.projectionMatrix),H.projectionMatrixInverse.copy(J.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=is*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)},this.getPlanes=function(){return y};let Q=null;function ft(H,J){if(u=J.getViewerPose(c||r),g=J,u!==null){const st=u.views;p!==null&&(t.setRenderTargetFramebuffer(f,p.framebuffer),t.setRenderTarget(f));let ot=!1;st.length!==S.cameras.length&&(S.cameras.length=0,ot=!0);for(let k=0;k<st.length;k++){const Tt=st[k];let bt=null;if(p!==null)bt=p.getViewport(Tt);else{const Mt=d.getViewSubImage(h,Tt);bt=Mt.viewport,k===0&&(t.setRenderTargetTextures(f,Mt.colorTexture,h.ignoreDepthValues?void 0:Mt.depthStencilTexture),t.setRenderTarget(f))}let rt=D[k];rt===void 0&&(rt=new Oe,rt.layers.enable(k),rt.viewport=new fe,D[k]=rt),rt.matrix.fromArray(Tt.transform.matrix),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.projectionMatrix.fromArray(Tt.projectionMatrix),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert(),rt.viewport.set(bt.x,bt.y,bt.width,bt.height),k===0&&(S.matrix.copy(rt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ot===!0&&S.cameras.push(rt)}}for(let st=0;st<_.length;st++){const ot=M[st],k=_[st];ot!==null&&k!==void 0&&k.update(ot,J,c||r)}if(Q&&Q(H,J),J.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:J.detectedPlanes});let st=null;for(const ot of y)J.detectedPlanes.has(ot)||(st===null&&(st=[]),st.push(ot));if(st!==null)for(const ot of st)y.delete(ot),w.delete(ot),n.dispatchEvent({type:"planeremoved",data:ot});for(const ot of J.detectedPlanes)if(!y.has(ot))y.add(ot),w.set(ot,J.lastChangedTime),n.dispatchEvent({type:"planeadded",data:ot});else{const k=w.get(ot);ot.lastChangedTime>k&&(w.set(ot,ot.lastChangedTime),n.dispatchEvent({type:"planechanged",data:ot}))}}g=null}const W=new Xl;W.setAnimationLoop(ft),this.setAnimationLoop=function(H){Q=H},this.dispose=function(){}}}function tg(o,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,kl(o)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,_,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,_,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Le&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Le&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const _=t.get(f).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const M=o.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*M,e(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=M*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),t.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Le&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function eg(o,t,e,n){let i={},s={},r=[];const a=e.isWebGL2?o.getParameter(35375):0;function l(_,M){const y=M.program;n.uniformBlockBinding(_,y)}function c(_,M){let y=i[_.id];y===void 0&&(g(_),y=u(_),i[_.id]=y,_.addEventListener("dispose",m));const w=M.program;n.updateUBOMapping(_,w);const A=t.render.frame;s[_.id]!==A&&(h(_),s[_.id]=A)}function u(_){const M=d();_.__bindingPointIndex=M;const y=o.createBuffer(),w=_.__size,A=_.usage;return o.bindBuffer(35345,y),o.bufferData(35345,w,A),o.bindBuffer(35345,null),o.bindBufferBase(35345,M,y),y}function d(){for(let _=0;_<a;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const M=i[_.id],y=_.uniforms,w=_.__cache;o.bindBuffer(35345,M);for(let A=0,P=y.length;A<P;A++){const D=y[A];if(p(D,A,w)===!0){const S=D.__offset,E=Array.isArray(D.value)?D.value:[D.value];let V=0;for(let F=0;F<E.length;F++){const C=E[F],R=v(C);typeof C=="number"?(D.__data[0]=C,o.bufferSubData(35345,S+V,D.__data)):C.isMatrix3?(D.__data[0]=C.elements[0],D.__data[1]=C.elements[1],D.__data[2]=C.elements[2],D.__data[3]=C.elements[0],D.__data[4]=C.elements[3],D.__data[5]=C.elements[4],D.__data[6]=C.elements[5],D.__data[7]=C.elements[0],D.__data[8]=C.elements[6],D.__data[9]=C.elements[7],D.__data[10]=C.elements[8],D.__data[11]=C.elements[0]):(C.toArray(D.__data,V),V+=R.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(35345,S,D.__data)}}o.bindBuffer(35345,null)}function p(_,M,y){const w=_.value;if(y[M]===void 0){if(typeof w=="number")y[M]=w;else{const A=Array.isArray(w)?w:[w],P=[];for(let D=0;D<A.length;D++)P.push(A[D].clone());y[M]=P}return!0}else if(typeof w=="number"){if(y[M]!==w)return y[M]=w,!0}else{const A=Array.isArray(y[M])?y[M]:[y[M]],P=Array.isArray(w)?w:[w];for(let D=0;D<A.length;D++){const S=A[D];if(S.equals(P[D])===!1)return S.copy(P[D]),!0}}return!1}function g(_){const M=_.uniforms;let y=0;const w=16;let A=0;for(let P=0,D=M.length;P<D;P++){const S=M[P],E={boundary:0,storage:0},V=Array.isArray(S.value)?S.value:[S.value];for(let F=0,C=V.length;F<C;F++){const R=V[F],I=v(R);E.boundary+=I.boundary,E.storage+=I.storage}if(S.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=y,P>0){A=y%w;const F=w-A;A!==0&&F-E.boundary<0&&(y+=w-A,S.__offset=y)}y+=E.storage}return A=y%w,A>0&&(y+=w-A),_.__size=y,_.__cache={},this}function v(_){const M={boundary:0,storage:0};return typeof _=="number"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),M}function m(_){const M=_.target;M.removeEventListener("dispose",m);const y=r.indexOf(M.__bindingPointIndex);r.splice(y,1),o.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function f(){for(const _ in i)o.deleteBuffer(i[_]);r=[],i={},s={}}return{bind:l,update:c,dispose:f}}function ng(){const o=ss("canvas");return o.style.display="block",o}class Zl{constructor(t={}){const{canvas:e=ng(),context:n=null,depth:i=!0,stencil:s=!0,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=r;let p=null,g=null;const v=[],m=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Kn,this.useLegacyLights=!0,this.toneMapping=yn,this.toneMappingExposure=1;const f=this;let _=!1,M=0,y=0,w=null,A=-1,P=null;const D=new fe,S=new fe;let E=null,V=e.width,F=e.height,C=1,R=null,I=null;const U=new fe(0,0,V,F),Z=new fe(0,0,V,F);let G=!1;const Y=new ql;let Q=!1,ft=!1,W=null;const H=new pe,J=new O,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ot(){return w===null?C:1}let k=n;function Tt(T,B){for(let X=0;X<T.length;X++){const z=T[X],$=e.getContext(z,B);if($!==null)return $}return null}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ao}`),e.addEventListener("webglcontextlost",mt,!1),e.addEventListener("webglcontextrestored",Nt,!1),e.addEventListener("webglcontextcreationerror",Bt,!1),k===null){const B=["webgl2","webgl","experimental-webgl"];if(f.isWebGL1Renderer===!0&&B.shift(),k=Tt(B,T),k===null)throw Tt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let bt,rt,Mt,Ft,vt,Rt,ae,he,le,ie,Ot,Kt,be,L,b,q,et,nt,at,St,dt,K,pt,_t;function yt(){bt=new fp(k),rt=new op(k,bt,t),bt.init(rt),K=new Km(k,bt,rt),Mt=new jm(k,bt,rt),Ft=new gp,vt=new Im,Rt=new Ym(k,bt,Mt,vt,rt,K,Ft),ae=new lp(f),he=new dp(f),le=new Th(k,rt),pt=new sp(k,bt,le,rt),ie=new pp(k,le,Ft,pt),Ot=new yp(k,ie,le,Ft),at=new xp(k,rt,Rt),q=new ap(vt),Kt=new Dm(f,ae,he,bt,rt,pt,q),be=new tg(f,vt),L=new Um,b=new Gm(bt,rt),nt=new ip(f,ae,he,Mt,Ot,h,l),et=new Xm(f,Ot,rt),_t=new eg(k,Ft,rt,Mt),St=new rp(k,bt,Ft,rt),dt=new mp(k,bt,Ft,rt),Ft.programs=Kt.programs,f.capabilities=rt,f.extensions=bt,f.properties=vt,f.renderLists=L,f.shadowMap=et,f.state=Mt,f.info=Ft}yt();const ht=new Qm(f,k);this.xr=ht,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=bt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=bt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(T){T!==void 0&&(C=T,this.setSize(V,F,!1))},this.getSize=function(T){return T.set(V,F)},this.setSize=function(T,B,X=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,F=B,e.width=Math.floor(T*C),e.height=Math.floor(B*C),X===!0&&(e.style.width=T+"px",e.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(V*C,F*C).floor()},this.setDrawingBufferSize=function(T,B,X){V=T,F=B,C=X,e.width=Math.floor(T*X),e.height=Math.floor(B*X),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(U)},this.setViewport=function(T,B,X,z){T.isVector4?U.set(T.x,T.y,T.z,T.w):U.set(T,B,X,z),Mt.viewport(D.copy(U).multiplyScalar(C).floor())},this.getScissor=function(T){return T.copy(Z)},this.setScissor=function(T,B,X,z){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,B,X,z),Mt.scissor(S.copy(Z).multiplyScalar(C).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(T){Mt.setScissorTest(G=T)},this.setOpaqueSort=function(T){R=T},this.setTransparentSort=function(T){I=T},this.getClearColor=function(T){return T.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(T=!0,B=!0,X=!0){let z=0;T&&(z|=16384),B&&(z|=256),X&&(z|=1024),k.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",mt,!1),e.removeEventListener("webglcontextrestored",Nt,!1),e.removeEventListener("webglcontextcreationerror",Bt,!1),L.dispose(),b.dispose(),vt.dispose(),ae.dispose(),he.dispose(),Ot.dispose(),pt.dispose(),_t.dispose(),Kt.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",gt),ht.removeEventListener("sessionend",Ht),W&&(W.dispose(),W=null),Yt.stop()};function mt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function Nt(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const T=Ft.autoReset,B=et.enabled,X=et.autoUpdate,z=et.needsUpdate,$=et.type;yt(),Ft.autoReset=T,et.enabled=B,et.autoUpdate=X,et.needsUpdate=z,et.type=$}function Bt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function $t(T){const B=T.target;B.removeEventListener("dispose",$t),N(B)}function N(T){j(T),vt.remove(T)}function j(T){const B=vt.get(T).programs;B!==void 0&&(B.forEach(function(X){Kt.releaseProgram(X)}),T.isShaderMaterial&&Kt.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,X,z,$,xt){B===null&&(B=st);const wt=$.isMesh&&$.matrixWorld.determinant()<0,Et=Lc(T,B,X,z,$);Mt.setMaterial(z,wt);let At=X.index,Lt=1;z.wireframe===!0&&(At=ie.getWireframeAttribute(X),Lt=2);const Pt=X.drawRange,Dt=X.attributes.position;let Vt=Pt.start*Lt,_e=(Pt.start+Pt.count)*Lt;xt!==null&&(Vt=Math.max(Vt,xt.start*Lt),_e=Math.min(_e,(xt.start+xt.count)*Lt)),At!==null?(Vt=Math.max(Vt,0),_e=Math.min(_e,At.count)):Dt!=null&&(Vt=Math.max(Vt,0),_e=Math.min(_e,Dt.count));const Be=_e-Vt;if(Be<0||Be===1/0)return;pt.setup($,z,Et,X,At);let Rn,Jt=St;if(At!==null&&(Rn=le.get(At),Jt=dt,Jt.setIndex(Rn)),$.isMesh)z.wireframe===!0?(Mt.setLineWidth(z.wireframeLinewidth*ot()),Jt.setMode(1)):Jt.setMode(4);else if($.isLine){let Ut=z.linewidth;Ut===void 0&&(Ut=1),Mt.setLineWidth(Ut*ot()),$.isLineSegments?Jt.setMode(1):$.isLineLoop?Jt.setMode(2):Jt.setMode(3)}else $.isPoints?Jt.setMode(0):$.isSprite&&Jt.setMode(4);if($.isInstancedMesh)Jt.renderInstances(Vt,Be,$.count);else if(X.isInstancedBufferGeometry){const Ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,rr=Math.min(X.instanceCount,Ut);Jt.renderInstances(Vt,Be,rr)}else Jt.render(Vt,Be)},this.compile=function(T,B){function X(z,$,xt){z.transparent===!0&&z.side===_n&&z.forceSinglePass===!1?(z.side=Le,z.needsUpdate=!0,ms(z,$,xt),z.side=Pn,z.needsUpdate=!0,ms(z,$,xt),z.side=_n):ms(z,$,xt)}g=b.get(T),g.init(),m.push(g),T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(g.pushLight(z),z.castShadow&&g.pushShadow(z))}),g.setupLights(f.useLegacyLights),T.traverse(function(z){const $=z.material;if($)if(Array.isArray($))for(let xt=0;xt<$.length;xt++){const wt=$[xt];X(wt,T,z)}else X($,T,z)}),m.pop(),g=null};let tt=null;function lt(T){tt&&tt(T)}function gt(){Yt.stop()}function Ht(){Yt.start()}const Yt=new Xl;Yt.setAnimationLoop(lt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(T){tt=T,ht.setAnimationLoop(T),T===null?Yt.stop():Yt.start()},ht.addEventListener("sessionstart",gt),ht.addEventListener("sessionend",Ht),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(B),B=ht.getCamera()),T.isScene===!0&&T.onBeforeRender(f,T,B,w),g=b.get(T,m.length),g.init(),m.push(g),H.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Y.setFromProjectionMatrix(H),ft=this.localClippingEnabled,Q=q.init(this.clippingPlanes,ft),p=L.get(T,v.length),p.init(),v.push(p),me(T,B,0,f.sortObjects),p.finish(),f.sortObjects===!0&&p.sort(R,I),Q===!0&&q.beginShadows();const X=g.state.shadowsArray;if(et.render(X,T,B),Q===!0&&q.endShadows(),this.info.autoReset===!0&&this.info.reset(),nt.render(p,T),g.setupLights(f.useLegacyLights),B.isArrayCamera){const z=B.cameras;for(let $=0,xt=z.length;$<xt;$++){const wt=z[$];Sn(p,T,wt,wt.viewport)}}else Sn(p,T,B);w!==null&&(Rt.updateMultisampleRenderTarget(w),Rt.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(f,T,B),pt.resetDefaultState(),A=-1,P=null,m.pop(),m.length>0?g=m[m.length-1]:g=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function me(T,B,X,z){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){z&&J.setFromMatrixPosition(T.matrixWorld).applyMatrix4(H);const wt=Ot.update(T),Et=T.material;Et.visible&&p.push(T,wt,Et,X,J.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(T.isSkinnedMesh&&T.skeleton.frame!==Ft.render.frame&&(T.skeleton.update(),T.skeleton.frame=Ft.render.frame),!T.frustumCulled||Y.intersectsObject(T))){z&&J.setFromMatrixPosition(T.matrixWorld).applyMatrix4(H);const wt=Ot.update(T),Et=T.material;if(Array.isArray(Et)){const At=wt.groups;for(let Lt=0,Pt=At.length;Lt<Pt;Lt++){const Dt=At[Lt],Vt=Et[Dt.materialIndex];Vt&&Vt.visible&&p.push(T,wt,Vt,X,J.z,Dt)}}else Et.visible&&p.push(T,wt,Et,X,J.z,null)}}const xt=T.children;for(let wt=0,Et=xt.length;wt<Et;wt++)me(xt[wt],B,X,z)}function Sn(T,B,X,z){const $=T.opaque,xt=T.transmissive,wt=T.transparent;g.setupLightsView(X),Q===!0&&q.setGlobalState(f.clippingPlanes,X),xt.length>0&&Zt($,xt,B,X),z&&Mt.viewport(D.copy(z)),$.length>0&&ze($,B,X),xt.length>0&&ze(xt,B,X),wt.length>0&&ze(wt,B,X),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Zt(T,B,X,z){if(W===null){const Et=rt.isWebGL2;W=new $n(1024,1024,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")?es:Yn,minFilter:ts,samples:Et&&a===!0?4:0})}const $=f.getRenderTarget();f.setRenderTarget(W),f.clear();const xt=f.toneMapping;f.toneMapping=yn,ze(T,X,z),Rt.updateMultisampleRenderTarget(W),Rt.updateRenderTargetMipmap(W);let wt=!1;for(let Et=0,At=B.length;Et<At;Et++){const Lt=B[Et],Pt=Lt.object,Dt=Lt.geometry,Vt=Lt.material,_e=Lt.group;if(Vt.side===_n&&Pt.layers.test(z.layers)){const Be=Vt.side;Vt.side=Le,Vt.needsUpdate=!0,Ze(Pt,X,z,Dt,Vt,_e),Vt.side=Be,Vt.needsUpdate=!0,wt=!0}}wt===!0&&(Rt.updateMultisampleRenderTarget(W),Rt.updateRenderTargetMipmap(W)),f.setRenderTarget($),f.toneMapping=xt}function ze(T,B,X){const z=B.isScene===!0?B.overrideMaterial:null;for(let $=0,xt=T.length;$<xt;$++){const wt=T[$],Et=wt.object,At=wt.geometry,Lt=z===null?wt.material:z,Pt=wt.group;Et.layers.test(X.layers)&&Ze(Et,B,X,At,Lt,Pt)}}function Ze(T,B,X,z,$,xt){T.onBeforeRender(f,B,X,z,$,xt),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(f,B,X,z,T,xt),$.transparent===!0&&$.side===_n&&$.forceSinglePass===!1?($.side=Le,$.needsUpdate=!0,f.renderBufferDirect(X,B,z,$,T,xt),$.side=Pn,$.needsUpdate=!0,f.renderBufferDirect(X,B,z,$,T,xt),$.side=_n):f.renderBufferDirect(X,B,z,$,T,xt),T.onAfterRender(f,B,X,z,$,xt)}function ms(T,B,X){B.isScene!==!0&&(B=st);const z=vt.get(T),$=g.state.lights,xt=g.state.shadowsArray,wt=$.state.version,Et=Kt.getParameters(T,$.state,xt,B,X),At=Kt.getProgramCacheKey(Et);let Lt=z.programs;z.environment=T.isMeshStandardMaterial?B.environment:null,z.fog=B.fog,z.envMap=(T.isMeshStandardMaterial?he:ae).get(T.envMap||z.environment),Lt===void 0&&(T.addEventListener("dispose",$t),Lt=new Map,z.programs=Lt);let Pt=Lt.get(At);if(Pt!==void 0){if(z.currentProgram===Pt&&z.lightsStateVersion===wt)return Mo(T,Et),Pt}else Et.uniforms=Kt.getUniforms(T),T.onBuild(X,Et,f),T.onBeforeCompile(Et,f),Pt=Kt.acquireProgram(Et,At),Lt.set(At,Pt),z.uniforms=Et.uniforms;const Dt=z.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=q.uniform),Mo(T,Et),z.needsLights=Rc(T),z.lightsStateVersion=wt,z.needsLights&&(Dt.ambientLightColor.value=$.state.ambient,Dt.lightProbe.value=$.state.probe,Dt.directionalLights.value=$.state.directional,Dt.directionalLightShadows.value=$.state.directionalShadow,Dt.spotLights.value=$.state.spot,Dt.spotLightShadows.value=$.state.spotShadow,Dt.rectAreaLights.value=$.state.rectArea,Dt.ltc_1.value=$.state.rectAreaLTC1,Dt.ltc_2.value=$.state.rectAreaLTC2,Dt.pointLights.value=$.state.point,Dt.pointLightShadows.value=$.state.pointShadow,Dt.hemisphereLights.value=$.state.hemi,Dt.directionalShadowMap.value=$.state.directionalShadowMap,Dt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Dt.spotShadowMap.value=$.state.spotShadowMap,Dt.spotLightMatrix.value=$.state.spotLightMatrix,Dt.spotLightMap.value=$.state.spotLightMap,Dt.pointShadowMap.value=$.state.pointShadowMap,Dt.pointShadowMatrix.value=$.state.pointShadowMatrix);const Vt=Pt.getUniforms(),_e=qs.seqWithValue(Vt.seq,Dt);return z.currentProgram=Pt,z.uniformsList=_e,Pt}function Mo(T,B){const X=vt.get(T);X.outputEncoding=B.outputEncoding,X.instancing=B.instancing,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function Lc(T,B,X,z,$){B.isScene!==!0&&(B=st),Rt.resetTextureUnits();const xt=B.fog,wt=z.isMeshStandardMaterial?B.environment:null,Et=w===null?f.outputEncoding:w.isXRRenderTarget===!0?w.texture.encoding:Kn,At=(z.isMeshStandardMaterial?he:ae).get(z.envMap||wt),Lt=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Pt=!!z.normalMap&&!!X.attributes.tangent,Dt=!!X.morphAttributes.position,Vt=!!X.morphAttributes.normal,_e=!!X.morphAttributes.color,Be=z.toneMapped?f.toneMapping:yn,Rn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Jt=Rn!==void 0?Rn.length:0,Ut=vt.get(z),rr=g.state.lights;if(Q===!0&&(ft===!0||T!==P)){const Re=T===P&&z.id===A;q.setState(z,T,Re)}let ce=!1;z.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==rr.state.version||Ut.outputEncoding!==Et||$.isInstancedMesh&&Ut.instancing===!1||!$.isInstancedMesh&&Ut.instancing===!0||$.isSkinnedMesh&&Ut.skinning===!1||!$.isSkinnedMesh&&Ut.skinning===!0||Ut.envMap!==At||z.fog===!0&&Ut.fog!==xt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==q.numPlanes||Ut.numIntersection!==q.numIntersection)||Ut.vertexAlphas!==Lt||Ut.vertexTangents!==Pt||Ut.morphTargets!==Dt||Ut.morphNormals!==Vt||Ut.morphColors!==_e||Ut.toneMapping!==Be||rt.isWebGL2===!0&&Ut.morphTargetsCount!==Jt)&&(ce=!0):(ce=!0,Ut.__version=z.version);let Dn=Ut.currentProgram;ce===!0&&(Dn=ms(z,B,$));let So=!1,Vi=!1,or=!1;const xe=Dn.getUniforms(),In=Ut.uniforms;if(Mt.useProgram(Dn.program)&&(So=!0,Vi=!0,or=!0),z.id!==A&&(A=z.id,Vi=!0),So||P!==T){if(xe.setValue(k,"projectionMatrix",T.projectionMatrix),rt.logarithmicDepthBuffer&&xe.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),P!==T&&(P=T,Vi=!0,or=!0),z.isShaderMaterial||z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshStandardMaterial||z.envMap){const Re=xe.map.cameraPosition;Re!==void 0&&Re.setValue(k,J.setFromMatrixPosition(T.matrixWorld))}(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&xe.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial||z.isShadowMaterial||$.isSkinnedMesh)&&xe.setValue(k,"viewMatrix",T.matrixWorldInverse)}if($.isSkinnedMesh){xe.setOptional(k,$,"bindMatrix"),xe.setOptional(k,$,"bindMatrixInverse");const Re=$.skeleton;Re&&(rt.floatVertexTextures?(Re.boneTexture===null&&Re.computeBoneTexture(),xe.setValue(k,"boneTexture",Re.boneTexture,Rt),xe.setValue(k,"boneTextureSize",Re.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ar=X.morphAttributes;if((ar.position!==void 0||ar.normal!==void 0||ar.color!==void 0&&rt.isWebGL2===!0)&&at.update($,X,Dn),(Vi||Ut.receiveShadow!==$.receiveShadow)&&(Ut.receiveShadow=$.receiveShadow,xe.setValue(k,"receiveShadow",$.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(In.envMap.value=At,In.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),Vi&&(xe.setValue(k,"toneMappingExposure",f.toneMappingExposure),Ut.needsLights&&Pc(In,or),xt&&z.fog===!0&&be.refreshFogUniforms(In,xt),be.refreshMaterialUniforms(In,z,C,F,W),qs.upload(k,Ut.uniformsList,In,Rt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(qs.upload(k,Ut.uniformsList,In,Rt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&xe.setValue(k,"center",$.center),xe.setValue(k,"modelViewMatrix",$.modelViewMatrix),xe.setValue(k,"normalMatrix",$.normalMatrix),xe.setValue(k,"modelMatrix",$.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Re=z.uniformsGroups;for(let lr=0,Dc=Re.length;lr<Dc;lr++)if(rt.isWebGL2){const wo=Re[lr];_t.update(wo,Dn),_t.bind(wo,Dn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Dn}function Pc(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Rc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,B,X){vt.get(T.texture).__webglTexture=B,vt.get(T.depthTexture).__webglTexture=X;const z=vt.get(T);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=X===void 0,z.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,B){const X=vt.get(T);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,X=0){w=T,M=B,y=X;let z=!0,$=null,xt=!1,wt=!1;if(T){const At=vt.get(T);At.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(36160,null),z=!1):At.__webglFramebuffer===void 0?Rt.setupRenderTarget(T):At.__hasExternalTextures&&Rt.rebindTextures(T,vt.get(T.texture).__webglTexture,vt.get(T.depthTexture).__webglTexture);const Lt=T.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(wt=!0);const Pt=vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?($=Pt[B],xt=!0):rt.isWebGL2&&T.samples>0&&Rt.useMultisampledRTT(T)===!1?$=vt.get(T).__webglMultisampledFramebuffer:$=Pt,D.copy(T.viewport),S.copy(T.scissor),E=T.scissorTest}else D.copy(U).multiplyScalar(C).floor(),S.copy(Z).multiplyScalar(C).floor(),E=G;if(Mt.bindFramebuffer(36160,$)&&rt.drawBuffers&&z&&Mt.drawBuffers(T,$),Mt.viewport(D),Mt.scissor(S),Mt.setScissorTest(E),xt){const At=vt.get(T.texture);k.framebufferTexture2D(36160,36064,34069+B,At.__webglTexture,X)}else if(wt){const At=vt.get(T.texture),Lt=B||0;k.framebufferTextureLayer(36160,36064,At.__webglTexture,X||0,Lt)}A=-1},this.readRenderTargetPixels=function(T,B,X,z,$,xt,wt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&wt!==void 0&&(Et=Et[wt]),Et){Mt.bindFramebuffer(36160,Et);try{const At=T.texture,Lt=At.format,Pt=At.type;if(Lt!==Xe&&K.convert(Lt)!==k.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Dt=Pt===es&&(bt.has("EXT_color_buffer_half_float")||rt.isWebGL2&&bt.has("EXT_color_buffer_float"));if(Pt!==Yn&&K.convert(Pt)!==k.getParameter(35738)&&!(Pt===qn&&(rt.isWebGL2||bt.has("OES_texture_float")||bt.has("WEBGL_color_buffer_float")))&&!Dt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-z&&X>=0&&X<=T.height-$&&k.readPixels(B,X,z,$,K.convert(Lt),K.convert(Pt),xt)}finally{const At=w!==null?vt.get(w).__webglFramebuffer:null;Mt.bindFramebuffer(36160,At)}}},this.copyFramebufferToTexture=function(T,B,X=0){const z=Math.pow(2,-X),$=Math.floor(B.image.width*z),xt=Math.floor(B.image.height*z);Rt.setTexture2D(B,0),k.copyTexSubImage2D(3553,X,0,0,T.x,T.y,$,xt),Mt.unbindTexture()},this.copyTextureToTexture=function(T,B,X,z=0){const $=B.image.width,xt=B.image.height,wt=K.convert(X.format),Et=K.convert(X.type);Rt.setTexture2D(X,0),k.pixelStorei(37440,X.flipY),k.pixelStorei(37441,X.premultiplyAlpha),k.pixelStorei(3317,X.unpackAlignment),B.isDataTexture?k.texSubImage2D(3553,z,T.x,T.y,$,xt,wt,Et,B.image.data):B.isCompressedTexture?k.compressedTexSubImage2D(3553,z,T.x,T.y,B.mipmaps[0].width,B.mipmaps[0].height,wt,B.mipmaps[0].data):k.texSubImage2D(3553,z,T.x,T.y,wt,Et,B.image),z===0&&X.generateMipmaps&&k.generateMipmap(3553),Mt.unbindTexture()},this.copyTextureToTexture3D=function(T,B,X,z,$=0){if(f.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const xt=T.max.x-T.min.x+1,wt=T.max.y-T.min.y+1,Et=T.max.z-T.min.z+1,At=K.convert(z.format),Lt=K.convert(z.type);let Pt;if(z.isData3DTexture)Rt.setTexture3D(z,0),Pt=32879;else if(z.isDataArrayTexture)Rt.setTexture2DArray(z,0),Pt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(37440,z.flipY),k.pixelStorei(37441,z.premultiplyAlpha),k.pixelStorei(3317,z.unpackAlignment);const Dt=k.getParameter(3314),Vt=k.getParameter(32878),_e=k.getParameter(3316),Be=k.getParameter(3315),Rn=k.getParameter(32877),Jt=X.isCompressedTexture?X.mipmaps[0]:X.image;k.pixelStorei(3314,Jt.width),k.pixelStorei(32878,Jt.height),k.pixelStorei(3316,T.min.x),k.pixelStorei(3315,T.min.y),k.pixelStorei(32877,T.min.z),X.isDataTexture||X.isData3DTexture?k.texSubImage3D(Pt,$,B.x,B.y,B.z,xt,wt,Et,At,Lt,Jt.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Pt,$,B.x,B.y,B.z,xt,wt,Et,At,Jt.data)):k.texSubImage3D(Pt,$,B.x,B.y,B.z,xt,wt,Et,At,Lt,Jt),k.pixelStorei(3314,Dt),k.pixelStorei(32878,Vt),k.pixelStorei(3316,_e),k.pixelStorei(3315,Be),k.pixelStorei(32877,Rn),$===0&&z.generateMipmaps&&k.generateMipmap(Pt),Mt.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?Rt.setTextureCube(T,0):T.isData3DTexture?Rt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Rt.setTexture2DArray(T,0):Rt.setTexture2D(T,0),Mt.unbindTexture()},this.resetState=function(){M=0,y=0,w=null,Mt.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(t){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!t}}class ig extends Zl{}ig.prototype.isWebGL1Renderer=!0;class sg extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}}class rg extends we{constructor(t,e,n,i,s,r,a,l,c){super(t,e,n,i,s,r,a,l,c),this.isVideoTexture=!0,this.minFilter=r!==void 0?r:Ae,this.magFilter=s!==void 0?s:Ae,this.generateMipmaps=!1;const u=this;function d(){u.needsUpdate=!0,t.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(d)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class ds extends Mn{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],p=[];let g=0;const v=[],m=n/2;let f=0;_(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(p,2));function _(){const y=new O,w=new O;let A=0;const P=(e-t)/n;for(let D=0;D<=s;D++){const S=[],E=D/s,V=E*(e-t)+t;for(let F=0;F<=i;F++){const C=F/i,R=C*l+a,I=Math.sin(R),U=Math.cos(R);w.x=V*I,w.y=-E*n+m,w.z=V*U,d.push(w.x,w.y,w.z),y.set(I,P,U).normalize(),h.push(y.x,y.y,y.z),p.push(C,1-E),S.push(g++)}v.push(S)}for(let D=0;D<i;D++)for(let S=0;S<s;S++){const E=v[S][D],V=v[S+1][D],F=v[S+1][D+1],C=v[S][D+1];u.push(E,V,C),u.push(V,F,C),A+=6}c.addGroup(f,A,0),f+=A}function M(y){const w=g,A=new kt,P=new O;let D=0;const S=y===!0?t:e,E=y===!0?1:-1;for(let F=1;F<=i;F++)d.push(0,m*E,0),h.push(0,E,0),p.push(.5,.5),g++;const V=g;for(let F=0;F<=i;F++){const R=F/i*l+a,I=Math.cos(R),U=Math.sin(R);P.x=S*U,P.y=m*E,P.z=S*I,d.push(P.x,P.y,P.z),h.push(0,E,0),A.x=I*.5+.5,A.y=U*.5*E+.5,p.push(A.x,A.y),g++}for(let F=0;F<i;F++){const C=w+F,R=V+F;y===!0?u.push(R,R+1,C):u.push(R+1,R,C),D+=3}c.addGroup(f,D,y===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class er extends ds{constructor(t=1,e=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(t){return new er(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nr extends Mn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const u=[],d=new O,h=new O,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const _=[],M=f/n;let y=0;f===0&&r===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){const A=w/e;d.x=-t*Math.cos(i+A*s)*Math.sin(r+M*a),d.y=t*Math.cos(r+M*a),d.z=t*Math.sin(i+A*s)*Math.sin(r+M*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),m.push(A+y,1-M),_.push(c++)}u.push(_)}for(let f=0;f<n;f++)for(let _=0;_<e;_++){const M=u[f][_+1],y=u[f][_],w=u[f+1][_],A=u[f+1][_+1];(f!==0||r>0)&&p.push(M,y,A),(f!==n-1||l<Math.PI)&&p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fo extends Fi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Va={enabled:!1,files:{},add:function(o,t){this.enabled!==!1&&(this.files[o]=t)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class og{constructor(t,e,n){const i=this;let s=!1,r=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,r,a),s=!0},this.itemEnd=function(u){r++,i.onProgress!==void 0&&i.onProgress(u,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const ag=new og;class Jl{constructor(t){this.manager=t!==void 0?t:ag,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}class lg extends Jl{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,r=Va.get(t);if(r!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(r),s.manager.itemEnd(t)},0),r;const a=ss("img");function l(){u(),Va.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(d){u(),i&&i(d),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class cg extends Jl{constructor(t){super(t)}load(t,e,n,i){const s=new we,r=new lg(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class ug extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class hg extends ug{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ao}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ao);function dg(){const{width:o,height:t}=ti().userData,e=-o/2,n=o/2,i=t/2,s=-t/2;return{left:e,right:n,top:i,bottom:s}}function fg(o){const{width:t}=ti().userData,{width:e}=Xs;return((e-o)/e-.5)*t}function pg(o){const{height:t}=ti().userData,{height:e}=Xs;return(.5-o/e)*t}function po(o,t){const e=t.x-o.x,n=t.y-o.y;return Math.atan2(n,e)}function mg(){const o=Or(),t=Or(),e=Or();return new us(o,t,e)}function Ql(o){o.material instanceof Fi&&o.material.dispose(),o.geometry.dispose()}function gg(o,t){o.traverse(e=>{e instanceof Ce&&(Ql(e),t&&t(e))})}function vg(o,t=0){const e=o.position.z,n=t<e?t-e:t+e,i=o.fov*Math.PI/180;return 2*Math.tan(i/2)*Math.abs(n)}function _g(o,t){return t*o.aspect}function Or(){const o=js(0,359);return Ju.degToRad(o)}let Ai,Mi,Ln;function xg(){Ln=new sg,ec(),Sg(),wg()}function ti(){return Ln}function yg(){Mi.render(Ln,Ai)}function Mg(){Ln.clear(),ec()}function tc(){const{cameraZ:o,cameraZoom:t}=Qn();Ai.position.z=o,Ai.zoom=t/100,Ai.updateProjectionMatrix()}function Sg(){Ai=new Oe(75,window.innerWidth/window.innerHeight,.1,1e3),tc(),bg(Ai)}function wg(){Mi=new Zl({antialias:!0}),document.body.appendChild(Mi.domElement),Mi.shadowMap.enabled=!0,Mi.setClearColor("#000000"),Mi.setSize(window.innerWidth,window.innerHeight)}function ec(){const o=new hg(16777215,1);Ln.add(o)}function bg(o){Ln.userData.height=vg(o),Ln.userData.width=_g(o,Ln.userData.height)}class $e{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new x);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new x);const n=this.elements,i=t.x,s=t.y,r=t.z;return e.x=n[0]*i+n[1]*s+n[2]*r,e.y=n[3]*i+n[4]*s+n[5]*r,e.z=n[6]*i+n[7]*s+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new $e);const n=this.elements,i=t.elements,s=e.elements,r=n[0],a=n[1],l=n[2],c=n[3],u=n[4],d=n[5],h=n[6],p=n[7],g=n[8],v=i[0],m=i[1],f=i[2],_=i[3],M=i[4],y=i[5],w=i[6],A=i[7],P=i[8];return s[0]=r*v+a*_+l*w,s[1]=r*m+a*M+l*A,s[2]=r*f+a*y+l*P,s[3]=c*v+u*_+d*w,s[4]=c*m+u*M+d*A,s[5]=c*f+u*y+d*P,s[6]=h*v+p*_+g*w,s[7]=h*m+p*M+g*A,s[8]=h*f+p*y+g*P,e}scale(t,e){e===void 0&&(e=new $e);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new x);const n=3,i=4,s=[];let r,a;for(r=0;r<n*i;r++)s.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)s[r+i*a]=this.elements[r+3*a];s[3+4*0]=t.x,s[3+4*1]=t.y,s[3+4*2]=t.z;let l=3;const c=l;let u;const d=4;let h;do{if(r=c-l,s[r+i*r]===0){for(a=r+1;a<c;a++)if(s[r+i*a]!==0){u=d;do h=d-u,s[h+i*r]+=s[h+i*a];while(--u);break}}if(s[r+i*r]!==0)for(a=r+1;a<c;a++){const p=s[r+i*a]/s[r+i*r];u=d;do h=d-u,s[h+i*a]=h<=r?0:s[h+i*a]-s[h+i*r]*p;while(--u)}}while(--l);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new $e);const e=3,n=6,i=Eg;let s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)i[s+n*r]=this.elements[s+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const l=a;let c;const u=n;let d;do{if(s=l-a,i[s+n*s]===0){for(r=s+1;r<l;r++)if(i[s+n*r]!==0){c=u;do d=u-c,i[d+n*s]+=i[d+n*r];while(--c);break}}if(i[s+n*s]!==0)for(r=s+1;r<l;r++){const h=i[s+n*r]/i[s+n*s];c=u;do d=u-c,i[d+n*r]=d<=s?0:i[d+n*r]-i[d+n*s]*h;while(--c)}}while(--a);s=2;do{r=s-1;do{const h=i[s+n*r]/i[s+n*s];c=n;do d=n-c,i[d+n*r]=i[d+n*r]-i[d+n*s]*h;while(--c)}while(r--)}while(--s);s=2;do{const h=1/i[s+n*s];c=n;do d=n-c,i[d+n*s]=i[d+n*s]*h;while(--c)}while(s--);s=2;do{r=2;do{if(d=i[e+r+n*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,r,d)}while(r--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,r=e+e,a=n+n,l=i+i,c=e*r,u=e*a,d=e*l,h=n*a,p=n*l,g=i*l,v=s*r,m=s*a,f=s*l,_=this.elements;return _[3*0+0]=1-(h+g),_[3*0+1]=u-f,_[3*0+2]=d+m,_[3*1+0]=u+f,_[3*1+1]=1-(c+g),_[3*1+2]=p-v,_[3*2+0]=d-m,_[3*2+1]=p+v,_[3*2+2]=1-(c+h),this}transpose(t){t===void 0&&(t=new $e);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Eg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class x{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new x);const n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,l=this.z;return e.x=a*s-l*i,e.y=l*n-r*s,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new x(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new x(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new $e([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new x);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return(s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new x);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new x),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new x),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new x),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Tg,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const r=Ag;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Ga),Ga.almostEquals(t,e)}clone(){return new x(this.x,this.y,this.z)}}x.ZERO=new x(0,0,0);x.UNIT_X=new x(1,0,0);x.UNIT_Y=new x(0,1,0);x.UNIT_Z=new x(0,0,1);const Tg=new x,Ag=new x,Ga=new x;class jt{constructor(t){t===void 0&&(t={}),this.lowerBound=new x,this.upperBound=new x,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,r=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),r.copy(s);for(let l=1;l<t.length;l++){let c=t[l];a&&(a.vmult(c,ka),c=ka),c.x>r.x&&(r.x=c.x),c.x<s.x&&(s.x=c.x),c.y>r.y&&(r.y=c.y),c.y<s.y&&(s.y=c.y),c.z>r.z&&(r.z=c.z),c.z<s.z&&(s.z=c.z)}return e&&(e.vadd(s,s),e.vadd(r,r)),i&&(s.x-=i,s.y-=i,s.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new jt().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,r=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,l=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return r&&a&&l}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,r,a,l){const c=this.lowerBound,u=this.upperBound;t.copy(c),e.set(u.x,c.y,c.z),n.set(u.x,u.y,c.z),i.set(c.x,u.y,u.z),s.set(u.x,c.y,u.z),r.set(c.x,u.y,c.z),a.set(c.x,c.y,u.z),l.copy(u)}toLocalFrame(t,e){const n=Ha,i=n[0],s=n[1],r=n[2],a=n[3],l=n[4],c=n[5],u=n[6],d=n[7];this.getCorners(i,s,r,a,l,c,u,d);for(let h=0;h!==8;h++){const p=n[h];t.pointToLocal(p,p)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Ha,i=n[0],s=n[1],r=n[2],a=n[3],l=n[4],c=n[5],u=n[6],d=n[7];this.getCorners(i,s,r,a,l,c,u,d);for(let h=0;h!==8;h++){const p=n[h];t.pointToWorld(p,p)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,l=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*s,u=(this.upperBound.y-n.y)*s,d=(this.lowerBound.z-n.z)*r,h=(this.upperBound.z-n.z)*r,p=Math.max(Math.max(Math.min(a,l),Math.min(c,u)),Math.min(d,h)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,u)),Math.max(d,h));return!(g<0||p>g)}}const ka=new x,Ha=[new x,new x,new x,new x,new x,new x,new x,new x];class Wa{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const r=s;s=i,i=r}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class nc{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class ne{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new x),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=Cg,i=Lg;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new ne);const n=this.x,i=this.y,s=this.z,r=this.w,a=t.x,l=t.y,c=t.z,u=t.w;return e.x=n*u+r*a+i*c-s*l,e.y=i*u+r*l+s*a-n*c,e.z=s*u+r*c+n*l-i*a,e.w=r*u-n*a-i*l-s*c,e}inverse(t){t===void 0&&(t=new ne);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+s*s);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new ne),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new x);const n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,l=this.z,c=this.w,u=c*n+a*s-l*i,d=c*i+l*n-r*s,h=c*s+r*i-a*n,p=-r*n-a*i-l*s;return e.x=u*c+p*-r+d*-l-h*-a,e.y=d*c+p*-a+h*-r-u*-l,e.z=h*c+p*-l+u*-a-d*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const r=this.x,a=this.y,l=this.z,c=this.w;switch(e){case"YZX":const u=r*a+l*c;if(u>.499&&(n=2*Math.atan2(r,c),i=Math.PI/2,s=0),u<-.499&&(n=-2*Math.atan2(r,c),i=-Math.PI/2,s=0),n===void 0){const d=r*r,h=a*a,p=l*l;n=Math.atan2(2*a*c-2*r*l,1-2*h-2*p),i=Math.asin(2*u),s=Math.atan2(2*r*c-2*a*l,1-2*d-2*p)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),l=Math.sin(t/2),c=Math.sin(e/2),u=Math.sin(n/2);return i==="XYZ"?(this.x=l*r*a+s*c*u,this.y=s*c*a-l*r*u,this.z=s*r*u+l*c*a,this.w=s*r*a-l*c*u):i==="YXZ"?(this.x=l*r*a+s*c*u,this.y=s*c*a-l*r*u,this.z=s*r*u-l*c*a,this.w=s*r*a+l*c*u):i==="ZXY"?(this.x=l*r*a-s*c*u,this.y=s*c*a+l*r*u,this.z=s*r*u+l*c*a,this.w=s*r*a-l*c*u):i==="ZYX"?(this.x=l*r*a-s*c*u,this.y=s*c*a+l*r*u,this.z=s*r*u-l*c*a,this.w=s*r*a+l*c*u):i==="YZX"?(this.x=l*r*a+s*c*u,this.y=s*c*a+l*r*u,this.z=s*r*u-l*c*a,this.w=s*r*a-l*c*u):i==="XZY"&&(this.x=l*r*a-s*c*u,this.y=s*c*a-l*r*u,this.z=s*r*u+l*c*a,this.w=s*r*a+l*c*u),this}clone(){return new ne(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new ne);const i=this.x,s=this.y,r=this.z,a=this.w;let l=t.x,c=t.y,u=t.z,d=t.w,h,p,g,v,m;return p=i*l+s*c+r*u+a*d,p<0&&(p=-p,l=-l,c=-c,u=-u,d=-d),1-p>1e-6?(h=Math.acos(p),g=Math.sin(h),v=Math.sin((1-e)*h)/g,m=Math.sin(e*h)/g):(v=1-e,m=e),n.x=v*i+m*l,n.y=v*s+m*c,n.z=v*r+m*u,n.w=v*a+m*d,n}integrate(t,e,n,i){i===void 0&&(i=new ne);const s=t.x*n.x,r=t.y*n.y,a=t.z*n.z,l=this.x,c=this.y,u=this.z,d=this.w,h=e*.5;return i.x+=h*(s*d+r*u-a*c),i.y+=h*(r*d+a*l-s*u),i.z+=h*(a*d+s*c-r*l),i.w+=h*(-s*l-r*c-a*u),i}}const Cg=new x,Lg=new x,Pg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class ct{constructor(t){t===void 0&&(t={}),this.id=ct.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}ct.idCounter=0;ct.types=Pg;class zt{constructor(t){t===void 0&&(t={}),this.position=new x,this.quaternion=new ne,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return zt.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return zt.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new x),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new x),n.vsub(t,i),e.conjugate(qa),qa.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new x),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new x),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new x),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const qa=new ne;class Ci extends ct{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:r}=t;super({type:ct.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new x;for(let s=0;s!==t.length;s++){const r=t[s],a=r.length;for(let l=0;l!==a;l++){const c=(l+1)%a;e[r[l]].vsub(e[r[c]],i),i.normalize();let u=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){u=!0;break}u||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new x;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],r=this.vertices[n[2]];Ci.computeNormal(i,s,r,e)}static computeNormal(t,e,n,i){const s=new x,r=new x;e.vsub(t,r),n.vsub(e,s),s.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,r,a,l,c){const u=new x;let d=-1,h=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){u.copy(n.faceNormals[g]),s.vmult(u,u);const v=u.dot(r);v>h&&(h=v,d=g)}const p=[];for(let g=0;g<n.faces[d].length;g++){const v=n.vertices[n.faces[d][g]],m=new x;m.copy(v),s.vmult(m,m),i.vadd(m,m),p.push(m)}d>=0&&this.clipFaceAgainstHull(r,t,e,p,a,l,c)}findSeparatingAxis(t,e,n,i,s,r,a,l){const c=new x,u=new x,d=new x,h=new x,p=new x,g=new x;let v=Number.MAX_VALUE;const m=this;if(m.uniqueAxes)for(let f=0;f!==m.uniqueAxes.length;f++){n.vmult(m.uniqueAxes[f],c);const _=m.testSepAxis(c,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,r.copy(c))}else{const f=a?a.length:m.faces.length;for(let _=0;_<f;_++){const M=a?a[_]:_;c.copy(m.faceNormals[M]),n.vmult(c,c);const y=m.testSepAxis(c,t,e,n,i,s);if(y===!1)return!1;y<v&&(v=y,r.copy(c))}}if(t.uniqueAxes)for(let f=0;f!==t.uniqueAxes.length;f++){s.vmult(t.uniqueAxes[f],u);const _=m.testSepAxis(u,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,r.copy(u))}else{const f=l?l.length:t.faces.length;for(let _=0;_<f;_++){const M=l?l[_]:_;u.copy(t.faceNormals[M]),s.vmult(u,u);const y=m.testSepAxis(u,t,e,n,i,s);if(y===!1)return!1;y<v&&(v=y,r.copy(u))}}for(let f=0;f!==m.uniqueEdges.length;f++){n.vmult(m.uniqueEdges[f],h);for(let _=0;_!==t.uniqueEdges.length;_++)if(s.vmult(t.uniqueEdges[_],p),h.cross(p,g),!g.almostZero()){g.normalize();const M=m.testSepAxis(g,t,e,n,i,s);if(M===!1)return!1;M<v&&(v=M,r.copy(g))}}return i.vsub(e,d),d.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,s,r){const a=this;Ci.project(a,t,n,i,Br),Ci.project(e,t,s,r,Vr);const l=Br[0],c=Br[1],u=Vr[0],d=Vr[1];if(l<d||u<c)return!1;const h=l-d,p=u-c;return h<p?h:p}calculateLocalInertia(t,e){const n=new x,i=new x;this.computeLocalAABB(i,n);const s=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,r,a){const l=new x,c=new x,u=new x,d=new x,h=new x,p=new x,g=new x,v=new x,m=this,f=[],_=i,M=f;let y=-1,w=Number.MAX_VALUE;for(let E=0;E<m.faces.length;E++){l.copy(m.faceNormals[E]),n.vmult(l,l);const V=l.dot(t);V<w&&(w=V,y=E)}if(y<0)return;const A=m.faces[y];A.connectedFaces=[];for(let E=0;E<m.faces.length;E++)for(let V=0;V<m.faces[E].length;V++)A.indexOf(m.faces[E][V])!==-1&&E!==y&&A.connectedFaces.indexOf(E)===-1&&A.connectedFaces.push(E);const P=A.length;for(let E=0;E<P;E++){const V=m.vertices[A[E]],F=m.vertices[A[(E+1)%P]];V.vsub(F,c),u.copy(c),n.vmult(u,u),e.vadd(u,u),d.copy(this.faceNormals[y]),n.vmult(d,d),e.vadd(d,d),u.cross(d,h),h.negate(h),p.copy(V),n.vmult(p,p),e.vadd(p,p);const C=A.connectedFaces[E];g.copy(this.faceNormals[C]);const R=this.getPlaneConstantOfFace(C);v.copy(g),n.vmult(v,v);const I=R-v.dot(e);for(this.clipFaceAgainstPlane(_,M,v,I);_.length;)_.shift();for(;M.length;)_.push(M.shift())}g.copy(this.faceNormals[y]);const D=this.getPlaneConstantOfFace(y);v.copy(g),n.vmult(v,v);const S=D-v.dot(e);for(let E=0;E<_.length;E++){let V=v.dot(_[E])+S;if(V<=s&&(console.log(`clamped: depth=${V} to minDist=${s}`),V=s),V<=r){const F=_[E];if(V<=1e-6){const C={point:F,normal:v,depth:V};a.push(C)}}}}clipFaceAgainstPlane(t,e,n,i){let s,r;const a=t.length;if(a<2)return e;let l=t[t.length-1],c=t[0];s=n.dot(l)+i;for(let u=0;u<a;u++){if(c=t[u],r=n.dot(c)+i,s<0)if(r<0){const d=new x;d.copy(c),e.push(d)}else{const d=new x;l.lerp(c,s/(s-r),d),e.push(d)}else if(r<0){const d=new x;l.lerp(c,s/(s-r),d),e.push(d),e.push(c)}l=c,s=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new x);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new x);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let r,a,l,c,u,d,h=new x;for(let p=0;p<s.length;p++){h.copy(s[p]),e.vmult(h,h),t.vadd(h,h);const g=h;(r===void 0||g.x<r)&&(r=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(u===void 0||g.y>u)&&(u=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(r,a,l),i.set(c,u,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new x);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const r=i[s];e.vmult(r,r)}for(let s=0;s<this.faceNormals.length;s++){const r=this.faceNormals[s];e.vmult(r,r)}}if(t)for(let s=0;s<n;s++){const r=i[s];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=null,r=new x;this.getAveragePointLocal(r);for(let a=0;a<this.faces.length;a++){let l=i[a];const c=e[n[a][0]],u=new x;t.vsub(c,u);const d=l.dot(u),h=new x;r.vsub(c,h);const p=l.dot(h);if(d<0&&p>0||d>0&&p<0)return!1}return s?1:-1}static project(t,e,n,i,s){const r=t.vertices.length,a=Rg;let l=0,c=0;const u=Dg,d=t.vertices;u.setZero(),zt.vectorToLocalFrame(n,i,e,a),zt.pointToLocalFrame(n,i,u,u);const h=u.dot(a);c=l=d[0].dot(a);for(let p=1;p<r;p++){const g=d[p].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=h,l-=h,c>l){const p=c;c=l,l=p}s[0]=l,s[1]=c}}const Br=[],Vr=[];new x;const Rg=new x,Dg=new x;class mo extends ct{constructor(t){super({type:ct.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=x,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],l=new Ci({vertices:s,faces:r,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new x),mo.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<s.length;r++)An.set(s[r][0],s[r][1],s[r][2]),e.vmult(An,An),t.vadd(An,An),n(An.x,An.y,An.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;Qe[0].set(s.x,s.y,s.z),Qe[1].set(-s.x,s.y,s.z),Qe[2].set(-s.x,-s.y,s.z),Qe[3].set(-s.x,-s.y,-s.z),Qe[4].set(s.x,-s.y,-s.z),Qe[5].set(s.x,s.y,-s.z),Qe[6].set(-s.x,s.y,-s.z),Qe[7].set(s.x,-s.y,s.z);const r=Qe[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const l=Qe[a];e.vmult(l,l),t.vadd(l,l);const c=l.x,u=l.y,d=l.z;c>i.x&&(i.x=c),u>i.y&&(i.y=u),d>i.z&&(i.z=d),c<n.x&&(n.x=c),u<n.y&&(n.y=u),d<n.z&&(n.z=d)}}}const An=new x,Qe=[new x,new x,new x,new x,new x,new x,new x,new x],go={DYNAMIC:1,STATIC:2,KINEMATIC:4},vo={AWAKE:0,SLEEPY:1,SLEEPING:2};class ut extends nc{constructor(t){t===void 0&&(t={}),super(),this.id=ut.idCounter++,this.index=-1,this.world=null,this.vlambda=new x,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new x,this.previousPosition=new x,this.interpolatedPosition=new x,this.initPosition=new x,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new x,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new x,this.force=new x;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?ut.STATIC:ut.DYNAMIC,typeof t.type==typeof ut.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=ut.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new x,this.quaternion=new ne,this.initQuaternion=new ne,this.previousQuaternion=new ne,this.interpolatedQuaternion=new ne,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new x,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new x,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new x,this.invInertia=new x,this.invInertiaWorld=new $e,this.invMassSolve=0,this.invInertiaSolve=new x,this.invInertiaWorldSolve=new $e,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new x(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new x(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new jt,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new x,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=ut.AWAKE,this.wakeUpAfterNarrowphase=!1,t===ut.SLEEPING&&this.dispatchEvent(ut.wakeupEvent)}sleep(){this.sleepState=ut.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===ut.AWAKE&&n<i?(this.sleepState=ut.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(ut.sleepyEvent)):e===ut.SLEEPY&&n>i?this.wakeUp():e===ut.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(ut.sleepEvent))}}updateSolveMassProperties(){this.sleepState===ut.SLEEPING||this.type===ut.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new x),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new x),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new x),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new x),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new x,s=new ne;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const r=t[s];r.updateBoundingSphereRadius();const a=e[s].length(),l=r.boundingSphereRadius;a+l>i&&(i=a+l)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Ig,r=Ng,a=this.quaternion,l=this.aabb,c=Ug;for(let u=0;u!==i;u++){const d=t[u];a.vmult(e[u],s),s.vadd(this.position,s),a.mult(n[u],r),d.calculateWorldAABB(s,r,c.lowerBound,c.upperBound),u===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=zg,i=Fg;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new x),this.type!==ut.DYNAMIC)return;this.sleepState===ut.SLEEPING&&this.wakeUp();const n=Og;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new x),this.type!==ut.DYNAMIC)return;const n=Bg,i=Vg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===ut.DYNAMIC&&(this.sleepState===ut.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new x),this.type!==ut.DYNAMIC)return;this.sleepState===ut.SLEEPING&&this.wakeUp();const n=e,i=Gg;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=kg;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new x),this.type!==ut.DYNAMIC)return;const n=Hg,i=Wg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=qg;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),mo.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new x;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===ut.DYNAMIC||this.type===ut.KINEMATIC)||this.sleepState===ut.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,r=this.position,a=this.force,l=this.torque,c=this.quaternion,u=this.invMass,d=this.invInertiaWorld,h=this.linearFactor,p=u*t;i.x+=a.x*p*h.x,i.y+=a.y*p*h.y,i.z+=a.z*p*h.z;const g=d.elements,v=this.angularFactor,m=l.x*v.x,f=l.y*v.y,_=l.z*v.z;s.x+=t*(g[0]*m+g[1]*f+g[2]*_),s.y+=t*(g[3]*m+g[4]*f+g[5]*_),s.z+=t*(g[6]*m+g[7]*f+g[8]*_),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,c.integrate(this.angularVelocity,t,this.angularFactor,c),e&&(n?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}ut.idCounter=0;ut.COLLIDE_EVENT_NAME="collide";ut.DYNAMIC=go.DYNAMIC;ut.STATIC=go.STATIC;ut.KINEMATIC=go.KINEMATIC;ut.AWAKE=vo.AWAKE;ut.SLEEPY=vo.SLEEPY;ut.SLEEPING=vo.SLEEPING;ut.wakeupEvent={type:"wakeup"};ut.sleepyEvent={type:"sleepy"};ut.sleepEvent={type:"sleep"};const Ig=new x,Ng=new ne,Ug=new jt,zg=new $e,Fg=new $e;new $e;const Og=new x,Bg=new x,Vg=new x,Gg=new x,kg=new x,Hg=new x,Wg=new x,qg=new x;class Xg{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&ut.STATIC||t.sleepState===ut.SLEEPING)&&(e.type&ut.STATIC||e.sleepState===ut.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=jg;e.position.vsub(t.position,s);const r=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Yg,i=Kg,s=$g,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const l=i[a].id,c=s[a].id,u=l<c?`${l},${c}`:`${c},${l}`;n[u]=a,n.keys.push(u)}for(let a=0;a!==n.keys.length;a++){const l=n.keys.pop(),c=n[l];t.push(i[c]),e.push(s[c]),delete n[l]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new x;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const jg=new x;new x;new ne;new x;const Yg={keys:[]},Kg=[],$g=[];new x;new x;new x;class Zg extends Xg{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let r,a;for(let l=0;l!==s;l++)for(let c=0;c!==l;c++)r=i[l],a=i[c],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class Ys{constructor(){this.rayFromWorld=new x,this.rayToWorld=new x,this.hitNormalWorld=new x,this.hitPointWorld=new x,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=r,this.distance=a}}let ic,sc,rc,oc,ac,lc,cc;const _o={CLOSEST:1,ANY:2,ALL:4};ic=ct.types.SPHERE;sc=ct.types.PLANE;rc=ct.types.BOX;oc=ct.types.CYLINDER;ac=ct.types.CONVEXPOLYHEDRON;lc=ct.types.HEIGHTFIELD;cc=ct.types.TRIMESH;class te{get[ic](){return this._intersectSphere}get[sc](){return this._intersectPlane}get[rc](){return this._intersectBox}get[oc](){return this._intersectConvex}get[ac](){return this._intersectConvex}get[lc](){return this._intersectHeightfield}get[cc](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new x),e===void 0&&(e=new x),this.from=t.clone(),this.to=e.clone(),this.direction=new x,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=te.ANY,this.result=new Ys,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||te.ANY,this.result=e.result||new Ys,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Xa),Gr.length=0,t.broadphase.aabbQuery(t,Xa,Gr),this.intersectBodies(Gr),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=Jg,s=Qg;for(let r=0,a=t.shapes.length;r<a;r++){const l=t.shapes[r];if(!(n&&!l.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],s),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(l,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(fv(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const r=this.from,a=this.to,l=this.direction,c=new x(0,0,1);e.vmult(c,c);const u=new x;r.vsub(n,u);const d=u.dot(c);a.vsub(n,u);const h=u.dot(c);if(d*h>0||r.distanceTo(a)<d)return;const p=c.dot(l);if(Math.abs(p)<this.precision)return;const g=new x,v=new x,m=new x;r.vsub(n,g);const f=-c.dot(g)/p;l.scale(f,v),r.vadd(v,m),this.reportIntersection(c,m,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const r=tv;r.from.copy(this.from),r.to.copy(this.to),zt.pointToLocalFrame(n,e,r.from,r.from),zt.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=ev;let l,c,u,d;l=c=0,u=d=t.data.length-1;const h=new jt;r.getAABB(h),t.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),t.getIndexOfPosition(h.upperBound.x,h.upperBound.y,a,!0),u=Math.min(u,a[0]+1),d=Math.min(d,a[1]+1);for(let p=l;p<u;p++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(p,g,h),!!h.overlapsRay(r)){if(t.getConvexTrianglePillar(p,g,!1),zt.pointToWorldFrame(n,e,t.pillarOffset,Fs),this._intersectConvex(t.pillarConvex,e,Fs,i,s,ja),this.result.shouldStop)return;t.getConvexTrianglePillar(p,g,!0),zt.pointToWorldFrame(n,e,t.pillarOffset,Fs),this._intersectConvex(t.pillarConvex,e,Fs,i,s,ja)}}}_intersectSphere(t,e,n,i,s){const r=this.from,a=this.to,l=t.radius,c=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,u=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),d=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-l**2,h=u**2-4*c*d,p=nv,g=iv;if(!(h<0))if(h===0)r.lerp(a,h,p),p.vsub(n,g),g.normalize(),this.reportIntersection(g,p,s,i,-1);else{const v=(-u-Math.sqrt(h))/(2*c),m=(-u+Math.sqrt(h))/(2*c);if(v>=0&&v<=1&&(r.lerp(a,v,p),p.vsub(n,g),g.normalize(),this.reportIntersection(g,p,s,i,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(r.lerp(a,m,p),p.vsub(n,g),g.normalize(),this.reportIntersection(g,p,s,i,-1))}}_intersectConvex(t,e,n,i,s,r){const a=sv,l=Ya,c=r&&r.faceList||null,u=t.faces,d=t.vertices,h=t.faceNormals,p=this.direction,g=this.from,v=this.to,m=g.distanceTo(v),f=c?c.length:u.length,_=this.result;for(let M=0;!_.shouldStop&&M<f;M++){const y=c?c[M]:M,w=u[y],A=h[y],P=e,D=n;l.copy(d[w[0]]),P.vmult(l,l),l.vadd(D,l),l.vsub(g,l),P.vmult(A,a);const S=p.dot(a);if(Math.abs(S)<this.precision)continue;const E=a.dot(l)/S;if(!(E<0)){p.scale(E,Ee),Ee.vadd(g,Ee),He.copy(d[w[0]]),P.vmult(He,He),D.vadd(He,He);for(let V=1;!_.shouldStop&&V<w.length-1;V++){tn.copy(d[w[V]]),en.copy(d[w[V+1]]),P.vmult(tn,tn),P.vmult(en,en),D.vadd(tn,tn),D.vadd(en,en);const F=Ee.distanceTo(g);!(te.pointInTriangle(Ee,He,tn,en)||te.pointInTriangle(Ee,tn,He,en))||F>m||this.reportIntersection(a,Ee,s,i,y)}}}}_intersectTrimesh(t,e,n,i,s,r){const a=rv,l=hv,c=dv,u=Ya,d=ov,h=av,p=lv,g=uv,v=cv,m=t.indices;t.vertices;const f=this.from,_=this.to,M=this.direction;c.position.copy(n),c.quaternion.copy(e),zt.vectorToLocalFrame(n,e,M,d),zt.pointToLocalFrame(n,e,f,h),zt.pointToLocalFrame(n,e,_,p),p.x*=t.scale.x,p.y*=t.scale.y,p.z*=t.scale.z,h.x*=t.scale.x,h.y*=t.scale.y,h.z*=t.scale.z,p.vsub(h,d),d.normalize();const y=h.distanceSquared(p);t.tree.rayQuery(this,c,l);for(let w=0,A=l.length;!this.result.shouldStop&&w!==A;w++){const P=l[w];t.getNormal(P,a),t.getVertex(m[P*3],He),He.vsub(h,u);const D=d.dot(a),S=a.dot(u)/D;if(S<0)continue;d.scale(S,Ee),Ee.vadd(h,Ee),t.getVertex(m[P*3+1],tn),t.getVertex(m[P*3+2],en);const E=Ee.distanceSquared(h);!(te.pointInTriangle(Ee,tn,He,en)||te.pointInTriangle(Ee,He,tn,en))||E>y||(zt.vectorToWorldFrame(e,a,v),zt.pointToWorldFrame(n,e,Ee,g),this.reportIntersection(v,g,s,i,P))}l.length=0}reportIntersection(t,e,n,i,s){const r=this.from,a=this.to,l=r.distanceTo(e),c=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(c.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case te.ALL:this.hasHit=!0,c.set(r,a,t,e,n,i,l),c.hasHit=!0,this.callback(c);break;case te.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(r,a,t,e,n,i,l));break;case te.ANY:this.hasHit=!0,c.hasHit=!0,c.set(r,a,t,e,n,i,l),c.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,Hn),n.vsub(e,qi),t.vsub(e,kr);const s=Hn.dot(Hn),r=Hn.dot(qi),a=Hn.dot(kr),l=qi.dot(qi),c=qi.dot(kr);let u,d;return(u=l*a-r*c)>=0&&(d=s*c-r*a)>=0&&u+d<s*l-r*r}}te.CLOSEST=_o.CLOSEST;te.ANY=_o.ANY;te.ALL=_o.ALL;const Xa=new jt,Gr=[],qi=new x,kr=new x,Jg=new x,Qg=new ne,Ee=new x,He=new x,tn=new x,en=new x;new x;new Ys;const ja={faceList:[0]},Fs=new x,tv=new te,ev=[],nv=new x,iv=new x,sv=new x;new x;new x;const Ya=new x,rv=new x,ov=new x,av=new x,lv=new x,cv=new x,uv=new x;new jt;const hv=[],dv=new zt,Hn=new x,Os=new x;function fv(o,t,e){e.vsub(o,Hn);const n=Hn.dot(t);return t.scale(n,Os),Os.vadd(o,Os),e.distanceTo(Os)}class pv{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class Ka{constructor(){this.spatial=new x,this.rotational=new x}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class fs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=fs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Ka,this.jacobianElementB=new Ka,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),r=this.computeGiMf();return-s*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,r=i.position;return t.spatial.dot(s)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,r=i.velocity,a=n.angularVelocity,l=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(r,l)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,r=i.vlambda,a=n.wlambda,l=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(r,l)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,r=n.torque,a=i.force,l=i.torque,c=n.invMassSolve,u=i.invMassSolve;return s.scale(c,$a),a.scale(u,Za),n.invInertiaWorldSolve.vmult(r,Ja),i.invInertiaWorldSolve.vmult(l,Qa),t.multiplyVectors($a,Ja)+e.multiplyVectors(Za,Qa)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,l=i.invInertiaWorldSolve;let c=s+r;return a.vmult(t.rotational,Bs),c+=Bs.dot(t.rotational),l.vmult(e.rotational,Bs),c+=Bs.dot(e.rotational),c}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,r=mv;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,r),s.wlambda.addScaledVector(t,r,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}fs.idCounter=0;const $a=new x,Za=new x,Ja=new x,Qa=new x,Bs=new x,mv=new x;class gv extends fs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new x,this.rj=new x,this.ni=new x}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,r=this.ri,a=this.rj,l=vv,c=_v,u=i.velocity,d=i.angularVelocity;i.force,i.torque;const h=s.velocity,p=s.angularVelocity;s.force,s.torque;const g=xv,v=this.jacobianElementA,m=this.jacobianElementB,f=this.ni;r.cross(f,l),a.cross(f,c),f.negate(v.spatial),l.negate(v.rotational),m.spatial.copy(f),m.rotational.copy(c),g.copy(s.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(r,g);const _=f.dot(g),M=this.restitution+1,y=M*h.dot(f)-M*u.dot(f)+p.dot(c)-d.dot(l),w=this.computeGiMf();return-_*e-y*n-t*w}getImpactVelocityAlongNormal(){const t=yv,e=Mv,n=Sv,i=wv,s=bv;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const vv=new x,_v=new x,xv=new x,yv=new x,Mv=new x,Sv=new x,wv=new x,bv=new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;class tl extends fs{constructor(t,e,n){super(t,e,-n,n),this.ri=new x,this.rj=new x,this.t=new x}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=Ev,r=Tv,a=this.t;n.cross(a,s),i.cross(a,r);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),s.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(r);const u=this.computeGW(),d=this.computeGiMf();return-u*e-t*d}}const Ev=new x,Tv=new x;class ps{constructor(t,e,n){n=pv.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=ps.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}ps.idCounter=0;class Bi{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Bi.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Bi.idCounter=0;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new te;new x;new x;new x;new x(1,0,0),new x(0,1,0),new x(0,0,1);new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;class Av extends ct{constructor(t){if(super({type:ct.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new x);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const s=this.radius,r=["x","y","z"];for(let a=0;a<r.length;a++){const l=r[a];n[l]=t[l]-s,i[l]=t[l]+s}}}new x;new x;new x;new x;new x;new x;new x;new x;new x;class el extends Ci{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,r=[],a=[],l=[],c=[],u=[],d=Math.cos,h=Math.sin;r.push(new x(-e*h(0),-n*.5,e*d(0))),c.push(0),r.push(new x(-t*h(0),n*.5,t*d(0))),u.push(1);for(let g=0;g<s;g++){const v=2*Math.PI/s*(g+1),m=2*Math.PI/s*(g+.5);g<s-1?(r.push(new x(-e*h(v),-n*.5,e*d(v))),c.push(2*g+2),r.push(new x(-t*h(v),n*.5,t*d(v))),u.push(2*g+3),l.push([2*g,2*g+1,2*g+3,2*g+2])):l.push([2*g,2*g+1,1,0]),(s%2===1||g<s/2)&&a.push(new x(-h(m),0,d(m)))}l.push(c),a.push(new x(0,1,0));const p=[];for(let g=0;g<u.length;g++)p.push(u[u.length-g-1]);l.push(p),super({vertices:r,faces:l,axes:a}),this.type=ct.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;class nn{constructor(t){t===void 0&&(t={}),this.root=t.root||null,this.aabb=t.aabb?t.aabb.clone():new jt,this.data=[],this.children=[]}reset(){this.children.length=this.data.length=0}insert(t,e,n){n===void 0&&(n=0);const i=this.data;if(!this.aabb.contains(t))return!1;const s=this.children,r=this.maxDepth||this.root.maxDepth;if(n<r){let a=!1;s.length||(this.subdivide(),a=!0);for(let l=0;l!==8;l++)if(s[l].insert(t,e,n+1))return!0;a&&(s.length=0)}return i.push(e),!0}subdivide(){const t=this.aabb,e=t.lowerBound,n=t.upperBound,i=this.children;i.push(new nn({aabb:new jt({lowerBound:new x(0,0,0)})}),new nn({aabb:new jt({lowerBound:new x(1,0,0)})}),new nn({aabb:new jt({lowerBound:new x(1,1,0)})}),new nn({aabb:new jt({lowerBound:new x(1,1,1)})}),new nn({aabb:new jt({lowerBound:new x(0,1,1)})}),new nn({aabb:new jt({lowerBound:new x(0,0,1)})}),new nn({aabb:new jt({lowerBound:new x(1,0,1)})}),new nn({aabb:new jt({lowerBound:new x(0,1,0)})})),n.vsub(e,Fn),Fn.scale(.5,Fn);const s=this.root||this;for(let r=0;r!==8;r++){const a=i[r];a.root=s;const l=a.aabb.lowerBound;l.x*=Fn.x,l.y*=Fn.y,l.z*=Fn.z,l.vadd(e,l),l.vadd(Fn,a.aabb.upperBound)}}aabbQuery(t,e){this.data,this.children;const n=[this];for(;n.length;){const i=n.pop();i.aabb.overlaps(t)&&Array.prototype.push.apply(e,i.data),Array.prototype.push.apply(n,i.children)}return e}rayQuery(t,e,n){return t.getAABB(Vs),Vs.toLocalFrame(e,Vs),this.aabbQuery(Vs,n),n}removeEmptyNodes(){for(let t=this.children.length-1;t>=0;t--)this.children[t].removeEmptyNodes(),!this.children[t].children.length&&!this.children[t].data.length&&this.children.splice(t,1)}}class Cv extends nn{constructor(t,e){e===void 0&&(e={}),super({root:null,aabb:t}),this.maxDepth=typeof e.maxDepth<"u"?e.maxDepth:8}}const Fn=new x,Vs=new jt;class Ks extends ct{constructor(t,e){super({type:ct.types.TRIMESH}),this.vertices=new Float32Array(t),this.indices=new Int16Array(e),this.normals=new Float32Array(e.length),this.aabb=new jt,this.edges=null,this.scale=new x(1,1,1),this.tree=new Cv,this.updateEdges(),this.updateNormals(),this.updateAABB(),this.updateBoundingSphereRadius(),this.updateTree()}updateTree(){const t=this.tree;t.reset(),t.aabb.copy(this.aabb);const e=this.scale;t.aabb.lowerBound.x*=1/e.x,t.aabb.lowerBound.y*=1/e.y,t.aabb.lowerBound.z*=1/e.z,t.aabb.upperBound.x*=1/e.x,t.aabb.upperBound.y*=1/e.y,t.aabb.upperBound.z*=1/e.z;const n=new jt,i=new x,s=new x,r=new x,a=[i,s,r];for(let l=0;l<this.indices.length/3;l++){const c=l*3;this._getUnscaledVertex(this.indices[c],i),this._getUnscaledVertex(this.indices[c+1],s),this._getUnscaledVertex(this.indices[c+2],r),n.setFromPoints(a),t.insert(n,l)}t.removeEmptyNodes()}getTrianglesInAABB(t,e){Gs.copy(t);const n=this.scale,i=n.x,s=n.y,r=n.z,a=Gs.lowerBound,l=Gs.upperBound;return a.x/=i,a.y/=s,a.z/=r,l.x/=i,l.y/=s,l.z/=r,this.tree.aabbQuery(Gs,e)}setScale(t){const e=this.scale.x===this.scale.y&&this.scale.y===this.scale.z,n=t.x===t.y&&t.y===t.z;e&&n||this.updateNormals(),this.scale.copy(t),this.updateAABB(),this.updateBoundingSphereRadius()}updateNormals(){const t=Lv,e=this.normals;for(let n=0;n<this.indices.length/3;n++){const i=n*3,s=this.indices[i],r=this.indices[i+1],a=this.indices[i+2];this.getVertex(s,sl),this.getVertex(r,rl),this.getVertex(a,ol),Ks.computeNormal(rl,sl,ol,t),e[i]=t.x,e[i+1]=t.y,e[i+2]=t.z}}updateEdges(){const t={},e=(i,s)=>{const r=i<s?`${i}_${s}`:`${s}_${i}`;t[r]=!0};for(let i=0;i<this.indices.length/3;i++){const s=i*3,r=this.indices[s],a=this.indices[s+1],l=this.indices[s+2];e(r,a),e(a,l),e(l,r)}const n=Object.keys(t);this.edges=new Int16Array(n.length*2);for(let i=0;i<n.length;i++){const s=n[i].split("_");this.edges[2*i]=parseInt(s[0],10),this.edges[2*i+1]=parseInt(s[1],10)}}getEdgeVertex(t,e,n){const i=this.edges[t*2+(e?1:0)];this.getVertex(i,n)}getEdgeVector(t,e){const n=Pv,i=Rv;this.getEdgeVertex(t,0,n),this.getEdgeVertex(t,1,i),i.vsub(n,e)}static computeNormal(t,e,n,i){e.vsub(t,il),n.vsub(e,nl),nl.cross(il,i),i.isZero()||i.normalize()}getVertex(t,e){const n=this.scale;return this._getUnscaledVertex(t,e),e.x*=n.x,e.y*=n.y,e.z*=n.z,e}_getUnscaledVertex(t,e){const n=t*3,i=this.vertices;return e.set(i[n],i[n+1],i[n+2])}getWorldVertex(t,e,n,i){return this.getVertex(t,i),zt.pointToWorldFrame(e,n,i,i),i}getTriangleVertices(t,e,n,i){const s=t*3;this.getVertex(this.indices[s],e),this.getVertex(this.indices[s+1],n),this.getVertex(this.indices[s+2],i)}getNormal(t,e){const n=t*3;return e.set(this.normals[n],this.normals[n+1],this.normals[n+2])}calculateLocalInertia(t,e){this.computeLocalAABB(On);const n=On.upperBound.x-On.lowerBound.x,i=On.upperBound.y-On.lowerBound.y,s=On.upperBound.z-On.lowerBound.z;return e.set(1/12*t*(2*i*2*i+2*s*2*s),1/12*t*(2*n*2*n+2*s*2*s),1/12*t*(2*i*2*i+2*n*2*n))}computeLocalAABB(t){const e=t.lowerBound,n=t.upperBound,i=this.vertices.length;this.vertices;const s=Dv;this.getVertex(0,s),e.copy(s),n.copy(s);for(let r=0;r!==i;r++)this.getVertex(r,s),s.x<e.x?e.x=s.x:s.x>n.x&&(n.x=s.x),s.y<e.y?e.y=s.y:s.y>n.y&&(n.y=s.y),s.z<e.z?e.z=s.z:s.z>n.z&&(n.z=s.z)}updateAABB(){this.computeLocalAABB(this.aabb)}updateBoundingSphereRadius(){let t=0;const e=this.vertices,n=new x;for(let i=0,s=e.length/3;i!==s;i++){this.getVertex(i,n);const r=n.lengthSquared();r>t&&(t=r)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=Iv,r=Nv;s.position=t,s.quaternion=e,this.aabb.toWorldFrame(s,r),n.copy(r.lowerBound),i.copy(r.upperBound)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}static createTorus(t,e,n,i,s){t===void 0&&(t=1),e===void 0&&(e=.5),n===void 0&&(n=8),i===void 0&&(i=6),s===void 0&&(s=Math.PI*2);const r=[],a=[];for(let l=0;l<=n;l++)for(let c=0;c<=i;c++){const u=c/i*s,d=l/n*Math.PI*2,h=(t+e*Math.cos(d))*Math.cos(u),p=(t+e*Math.cos(d))*Math.sin(u),g=e*Math.sin(d);r.push(h,p,g)}for(let l=1;l<=n;l++)for(let c=1;c<=i;c++){const u=(i+1)*l+c-1,d=(i+1)*(l-1)+c-1,h=(i+1)*(l-1)+c,p=(i+1)*l+c;a.push(u,d,p),a.push(d,h,p)}return new Ks(r,a)}}const Lv=new x,Gs=new jt,Pv=new x,Rv=new x,nl=new x,il=new x,sl=new x,rl=new x,ol=new x,On=new jt,Dv=new x,Iv=new zt,Nv=new jt;class Uv{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class zv extends Uv{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,r=this.equations,a=r.length,l=e.bodies,c=l.length,u=t;let d,h,p,g,v,m;if(a!==0)for(let y=0;y!==c;y++)l[y].updateSolveMassProperties();const f=Ov,_=Bv,M=Fv;f.length=a,_.length=a,M.length=a;for(let y=0;y!==a;y++){const w=r[y];M[y]=0,_[y]=w.computeB(u),f[y]=1/w.computeC()}if(a!==0){for(let A=0;A!==c;A++){const P=l[A],D=P.vlambda,S=P.wlambda;D.set(0,0,0),S.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let A=0;A!==a;A++){const P=r[A];d=_[A],h=f[A],m=M[A],v=P.computeGWlambda(),p=h*(d-v-P.eps*m),m+p<P.minForce?p=P.minForce-m:m+p>P.maxForce&&(p=P.maxForce-m),M[A]+=p,g+=p>0?p:-p,P.addToWlambda(p)}if(g*g<s)break}for(let A=0;A!==c;A++){const P=l[A],D=P.velocity,S=P.angularVelocity;P.vlambda.vmul(P.linearFactor,P.vlambda),D.vadd(P.vlambda,D),P.wlambda.vmul(P.angularFactor,P.wlambda),S.vadd(P.wlambda,S)}let y=r.length;const w=1/u;for(;y--;)r[y].multiplier=M[y]*w}return n}}const Fv=[],Ov=[],Bv=[];ut.STATIC;class Vv{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class Gv extends Vv{constructor(){super(...arguments),this.type=x}constructObject(){return new x}}const Wt={sphereSphere:ct.types.SPHERE,spherePlane:ct.types.SPHERE|ct.types.PLANE,boxBox:ct.types.BOX|ct.types.BOX,sphereBox:ct.types.SPHERE|ct.types.BOX,planeBox:ct.types.PLANE|ct.types.BOX,convexConvex:ct.types.CONVEXPOLYHEDRON,sphereConvex:ct.types.SPHERE|ct.types.CONVEXPOLYHEDRON,planeConvex:ct.types.PLANE|ct.types.CONVEXPOLYHEDRON,boxConvex:ct.types.BOX|ct.types.CONVEXPOLYHEDRON,sphereHeightfield:ct.types.SPHERE|ct.types.HEIGHTFIELD,boxHeightfield:ct.types.BOX|ct.types.HEIGHTFIELD,convexHeightfield:ct.types.CONVEXPOLYHEDRON|ct.types.HEIGHTFIELD,sphereParticle:ct.types.PARTICLE|ct.types.SPHERE,planeParticle:ct.types.PLANE|ct.types.PARTICLE,boxParticle:ct.types.BOX|ct.types.PARTICLE,convexParticle:ct.types.PARTICLE|ct.types.CONVEXPOLYHEDRON,cylinderCylinder:ct.types.CYLINDER,sphereCylinder:ct.types.SPHERE|ct.types.CYLINDER,planeCylinder:ct.types.PLANE|ct.types.CYLINDER,boxCylinder:ct.types.BOX|ct.types.CYLINDER,convexCylinder:ct.types.CONVEXPOLYHEDRON|ct.types.CYLINDER,heightfieldCylinder:ct.types.HEIGHTFIELD|ct.types.CYLINDER,particleCylinder:ct.types.PARTICLE|ct.types.CYLINDER,sphereTrimesh:ct.types.SPHERE|ct.types.TRIMESH,planeTrimesh:ct.types.PLANE|ct.types.TRIMESH};class kv{get[Wt.sphereSphere](){return this.sphereSphere}get[Wt.spherePlane](){return this.spherePlane}get[Wt.boxBox](){return this.boxBox}get[Wt.sphereBox](){return this.sphereBox}get[Wt.planeBox](){return this.planeBox}get[Wt.convexConvex](){return this.convexConvex}get[Wt.sphereConvex](){return this.sphereConvex}get[Wt.planeConvex](){return this.planeConvex}get[Wt.boxConvex](){return this.boxConvex}get[Wt.sphereHeightfield](){return this.sphereHeightfield}get[Wt.boxHeightfield](){return this.boxHeightfield}get[Wt.convexHeightfield](){return this.convexHeightfield}get[Wt.sphereParticle](){return this.sphereParticle}get[Wt.planeParticle](){return this.planeParticle}get[Wt.boxParticle](){return this.boxParticle}get[Wt.convexParticle](){return this.convexParticle}get[Wt.cylinderCylinder](){return this.convexConvex}get[Wt.sphereCylinder](){return this.sphereConvex}get[Wt.planeCylinder](){return this.planeConvex}get[Wt.boxCylinder](){return this.boxConvex}get[Wt.convexCylinder](){return this.convexConvex}get[Wt.heightfieldCylinder](){return this.heightfieldCylinder}get[Wt.particleCylinder](){return this.particleCylinder}get[Wt.sphereTrimesh](){return this.sphereTrimesh}get[Wt.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Gv,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new gv(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=n.material||t.material,u=i.material||e.material;return c&&u&&c.restitution>=0&&u.restitution>=0&&(a.restitution=c.restitution*u.restitution),a.si=s||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,r=t.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const u=s.material||n.material,d=r.material||i.material;if(u&&d&&u.friction>=0&&d.friction>=0&&(c=u.friction*d.friction),c>0){const h=c*(a.frictionGravity||a.gravity).length();let p=n.invMass+i.invMass;p>0&&(p=1/p);const g=this.frictionEquationPool,v=g.length?g.pop():new tl(n,i,h*p),m=g.length?g.pop():new tl(n,i,h*p);return v.bi=m.bi=n,v.bj=m.bj=i,v.minForce=m.minForce=-h*p,v.maxForce=m.maxForce=h*p,v.ri.copy(t.ri),v.rj.copy(t.rj),m.ri.copy(t.ri),m.rj.copy(t.rj),t.ni.tangents(v.t,m.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),m.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=m.enabled=t.enabled,e.push(v,m),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];Bn.setZero(),vi.setZero(),_i.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(Bn.vadd(e.ni,Bn),vi.vadd(e.ri,vi),_i.vadd(e.rj,_i)):(Bn.vsub(e.ni,Bn),vi.vadd(e.rj,vi),_i.vadd(e.ri,_i));const r=1/t;vi.scale(r,n.ri),_i.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),Bn.normalize(),Bn.tangents(n.t,i.t)}getContacts(t,e,n,i,s,r,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const l=qv,c=Xv,u=Hv,d=Wv;for(let h=0,p=t.length;h!==p;h++){const g=t[h],v=e[h];let m=null;g.material&&v.material&&(m=n.getContactMaterial(g.material,v.material)||null);const f=g.type&ut.KINEMATIC&&v.type&ut.STATIC||g.type&ut.STATIC&&v.type&ut.KINEMATIC||g.type&ut.KINEMATIC&&v.type&ut.KINEMATIC;for(let _=0;_<g.shapes.length;_++){g.quaternion.mult(g.shapeOrientations[_],l),g.quaternion.vmult(g.shapeOffsets[_],u),u.vadd(g.position,u);const M=g.shapes[_];for(let y=0;y<v.shapes.length;y++){v.quaternion.mult(v.shapeOrientations[y],c),v.quaternion.vmult(v.shapeOffsets[y],d),d.vadd(v.position,d);const w=v.shapes[y];if(!(M.collisionFilterMask&w.collisionFilterGroup&&w.collisionFilterMask&M.collisionFilterGroup)||u.distanceTo(d)>M.boundingSphereRadius+w.boundingSphereRadius)continue;let A=null;M.material&&w.material&&(A=n.getContactMaterial(M.material,w.material)||null),this.currentContactMaterial=A||m||n.defaultContactMaterial;const P=M.type|w.type,D=this[P];if(D){let S=!1;M.type<w.type?S=D.call(this,M,w,u,d,l,c,g,v,M,w,f):S=D.call(this,w,M,d,u,c,l,v,g,M,w,f),S&&f&&(n.shapeOverlapKeeper.set(M.id,w.id),n.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(t,e,n,i,s,r,a,l,c,u,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const h=this.createContactEquation(a,l,t,e,c,u);i.vsub(n,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(t.radius,h.ri),h.rj.scale(-e.radius,h.rj),h.ri.vadd(n,h.ri),h.ri.vsub(a.position,h.ri),h.rj.vadd(i,h.rj),h.rj.vsub(l.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(t,e,n,i,s,r,a,l,c,u,d){const h=this.createContactEquation(a,l,t,e,c,u);if(h.ni.set(0,0,1),r.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(t.radius,h.ri),n.vsub(i,ks),h.ni.scale(h.ni.dot(ks),al),ks.vsub(al,h.rj),-ks.dot(h.ni)<=t.radius){if(d)return!0;const p=h.ri,g=h.rj;p.vadd(n,p),p.vsub(a.position,p),g.vadd(i,g),g.vsub(l.position,g),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(t,e,n,i,s,r,a,l,c,u,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,r,a,l,t,e,d)}sphereBox(t,e,n,i,s,r,a,l,c,u,d){const h=this.v3pool,p=__;n.vsub(i,Hs),e.getSideNormals(p,r);const g=t.radius;let v=!1;const m=y_,f=M_,_=S_;let M=null,y=0,w=0,A=0,P=null;for(let U=0,Z=p.length;U!==Z&&v===!1;U++){const G=m_;G.copy(p[U]);const Y=G.length();G.normalize();const Q=Hs.dot(G);if(Q<Y+g&&Q>0){const ft=g_,W=v_;ft.copy(p[(U+1)%3]),W.copy(p[(U+2)%3]);const H=ft.length(),J=W.length();ft.normalize(),W.normalize();const st=Hs.dot(ft),ot=Hs.dot(W);if(st<H&&st>-H&&ot<J&&ot>-J){const k=Math.abs(Q-Y-g);if((P===null||k<P)&&(P=k,w=st,A=ot,M=Y,m.copy(G),f.copy(ft),_.copy(W),y++,d))return!0}}}if(y){v=!0;const U=this.createContactEquation(a,l,t,e,c,u);m.scale(-g,U.ri),U.ni.copy(m),U.ni.negate(U.ni),m.scale(M,m),f.scale(w,f),m.vadd(f,m),_.scale(A,_),m.vadd(_,U.rj),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),U.rj.vadd(i,U.rj),U.rj.vsub(l.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}let D=h.get();const S=x_;for(let U=0;U!==2&&!v;U++)for(let Z=0;Z!==2&&!v;Z++)for(let G=0;G!==2&&!v;G++)if(D.set(0,0,0),U?D.vadd(p[0],D):D.vsub(p[0],D),Z?D.vadd(p[1],D):D.vsub(p[1],D),G?D.vadd(p[2],D):D.vsub(p[2],D),i.vadd(D,S),S.vsub(n,S),S.lengthSquared()<g*g){if(d)return!0;v=!0;const Y=this.createContactEquation(a,l,t,e,c,u);Y.ri.copy(S),Y.ri.normalize(),Y.ni.copy(Y.ri),Y.ri.scale(g,Y.ri),Y.rj.copy(D),Y.ri.vadd(n,Y.ri),Y.ri.vsub(a.position,Y.ri),Y.rj.vadd(i,Y.rj),Y.rj.vsub(l.position,Y.rj),this.result.push(Y),this.createFrictionEquationsFromContact(Y,this.frictionResult)}h.release(D),D=null;const E=h.get(),V=h.get(),F=h.get(),C=h.get(),R=h.get(),I=p.length;for(let U=0;U!==I&&!v;U++)for(let Z=0;Z!==I&&!v;Z++)if(U%3!==Z%3){p[Z].cross(p[U],E),E.normalize(),p[U].vadd(p[Z],V),F.copy(n),F.vsub(V,F),F.vsub(i,F);const G=F.dot(E);E.scale(G,C);let Y=0;for(;Y===U%3||Y===Z%3;)Y++;R.copy(n),R.vsub(C,R),R.vsub(V,R),R.vsub(i,R);const Q=Math.abs(G),ft=R.length();if(Q<p[Y].length()&&ft<g){if(d)return!0;v=!0;const W=this.createContactEquation(a,l,t,e,c,u);V.vadd(C,W.rj),W.rj.copy(W.rj),R.negate(W.ni),W.ni.normalize(),W.ri.copy(W.rj),W.ri.vadd(i,W.ri),W.ri.vsub(n,W.ri),W.ri.normalize(),W.ri.scale(g,W.ri),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}}h.release(E,V,F,C,R)}planeBox(t,e,n,i,s,r,a,l,c,u,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,r,a,l,t,e,d)}convexConvex(t,e,n,i,s,r,a,l,c,u,d,h,p){const g=F_;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,r,g,h,p)){const v=[],m=O_;t.clipAgainstHull(n,s,e,i,r,g,-100,100,v);let f=0;for(let _=0;_!==v.length;_++){if(d)return!0;const M=this.createContactEquation(a,l,t,e,c,u),y=M.ri,w=M.rj;g.negate(M.ni),v[_].normal.negate(m),m.scale(v[_].depth,m),v[_].point.vadd(m,y),w.copy(v[_].point),y.vsub(n,y),w.vsub(i,w),y.vadd(n,y),y.vsub(a.position,y),w.vadd(i,w),w.vsub(l.position,w),this.result.push(M),f++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(M,this.frictionResult)}this.enableFrictionReduction&&f&&this.createFrictionFromAverage(f)}}sphereConvex(t,e,n,i,s,r,a,l,c,u,d){const h=this.v3pool;n.vsub(i,w_);const p=e.faceNormals,g=e.faces,v=e.vertices,m=t.radius;let f=!1;for(let _=0;_!==v.length;_++){const M=v[_],y=A_;r.vmult(M,y),i.vadd(y,y);const w=T_;if(y.vsub(n,w),w.lengthSquared()<m*m){if(d)return!0;f=!0;const A=this.createContactEquation(a,l,t,e,c,u);A.ri.copy(w),A.ri.normalize(),A.ni.copy(A.ri),A.ri.scale(m,A.ri),y.vsub(i,A.rj),A.ri.vadd(n,A.ri),A.ri.vsub(a.position,A.ri),A.rj.vadd(i,A.rj),A.rj.vsub(l.position,A.rj),this.result.push(A),this.createFrictionEquationsFromContact(A,this.frictionResult);return}}for(let _=0,M=g.length;_!==M&&f===!1;_++){const y=p[_],w=g[_],A=C_;r.vmult(y,A);const P=L_;r.vmult(v[w[0]],P),P.vadd(i,P);const D=P_;A.scale(-m,D),n.vadd(D,D);const S=R_;D.vsub(P,S);const E=S.dot(A),V=D_;if(n.vsub(P,V),E<0&&V.dot(A)>0){const F=[];for(let C=0,R=w.length;C!==R;C++){const I=h.get();r.vmult(v[w[C]],I),i.vadd(I,I),F.push(I)}if(p_(F,A,n)){if(d)return!0;f=!0;const C=this.createContactEquation(a,l,t,e,c,u);A.scale(-m,C.ri),A.negate(C.ni);const R=h.get();A.scale(-E,R);const I=h.get();A.scale(-m,I),n.vsub(i,C.rj),C.rj.vadd(I,C.rj),C.rj.vadd(R,C.rj),C.rj.vadd(i,C.rj),C.rj.vsub(l.position,C.rj),C.ri.vadd(n,C.ri),C.ri.vsub(a.position,C.ri),h.release(R),h.release(I),this.result.push(C),this.createFrictionEquationsFromContact(C,this.frictionResult);for(let U=0,Z=F.length;U!==Z;U++)h.release(F[U]);return}else for(let C=0;C!==w.length;C++){const R=h.get(),I=h.get();r.vmult(v[w[(C+1)%w.length]],R),r.vmult(v[w[(C+2)%w.length]],I),i.vadd(R,R),i.vadd(I,I);const U=b_;I.vsub(R,U);const Z=E_;U.unit(Z);const G=h.get(),Y=h.get();n.vsub(R,Y);const Q=Y.dot(Z);Z.scale(Q,G),G.vadd(R,G);const ft=h.get();if(G.vsub(n,ft),Q>0&&Q*Q<U.lengthSquared()&&ft.lengthSquared()<m*m){if(d)return!0;const W=this.createContactEquation(a,l,t,e,c,u);G.vsub(i,W.rj),G.vsub(n,W.ni),W.ni.normalize(),W.ni.scale(m,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult);for(let H=0,J=F.length;H!==J;H++)h.release(F[H]);h.release(R),h.release(I),h.release(G),h.release(ft),h.release(Y);return}h.release(R),h.release(I),h.release(G),h.release(ft),h.release(Y)}for(let C=0,R=F.length;C!==R;C++)h.release(F[C])}}}planeConvex(t,e,n,i,s,r,a,l,c,u,d){const h=I_,p=N_;p.set(0,0,1),s.vmult(p,p);let g=0;const v=U_;for(let m=0;m!==e.vertices.length;m++)if(h.copy(e.vertices[m]),r.vmult(h,h),i.vadd(h,h),h.vsub(n,v),p.dot(v)<=0){if(d)return!0;const _=this.createContactEquation(a,l,t,e,c,u),M=z_;p.scale(p.dot(v),M),h.vsub(M,M),M.vsub(n,_.ri),_.ni.copy(p),h.vsub(i,_.rj),_.ri.vadd(n,_.ri),_.ri.vsub(a.position,_.ri),_.rj.vadd(i,_.rj),_.rj.vsub(l.position,_.rj),this.result.push(_),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,s,r,a,l,c,u,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,r,a,l,t,e,d)}sphereHeightfield(t,e,n,i,s,r,a,l,c,u,d){const h=e.data,p=t.radius,g=e.elementSize,v=$_,m=K_;zt.pointToLocalFrame(i,r,n,m);let f=Math.floor((m.x-p)/g)-1,_=Math.ceil((m.x+p)/g)+1,M=Math.floor((m.y-p)/g)-1,y=Math.ceil((m.y+p)/g)+1;if(_<0||y<0||f>h.length||M>h[0].length)return;f<0&&(f=0),_<0&&(_=0),M<0&&(M=0),y<0&&(y=0),f>=h.length&&(f=h.length-1),_>=h.length&&(_=h.length-1),y>=h[0].length&&(y=h[0].length-1),M>=h[0].length&&(M=h[0].length-1);const w=[];e.getRectMinMax(f,M,_,y,w);const A=w[0],P=w[1];if(m.z-p>P||m.z+p<A)return;const D=this.result;for(let S=f;S<_;S++)for(let E=M;E<y;E++){const V=D.length;let F=!1;if(e.getConvexTrianglePillar(S,E,!1),zt.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,v,s,r,a,l,t,e,d)),d&&F||(e.getConvexTrianglePillar(S,E,!0),zt.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,v,s,r,a,l,t,e,d)),d&&F))return!0;if(D.length-V>2)return}}boxHeightfield(t,e,n,i,s,r,a,l,c,u,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,r,a,l,t,e,d)}convexHeightfield(t,e,n,i,s,r,a,l,c,u,d){const h=e.data,p=e.elementSize,g=t.boundingSphereRadius,v=j_,m=Y_,f=X_;zt.pointToLocalFrame(i,r,n,f);let _=Math.floor((f.x-g)/p)-1,M=Math.ceil((f.x+g)/p)+1,y=Math.floor((f.y-g)/p)-1,w=Math.ceil((f.y+g)/p)+1;if(M<0||w<0||_>h.length||y>h[0].length)return;_<0&&(_=0),M<0&&(M=0),y<0&&(y=0),w<0&&(w=0),_>=h.length&&(_=h.length-1),M>=h.length&&(M=h.length-1),w>=h[0].length&&(w=h[0].length-1),y>=h[0].length&&(y=h[0].length-1);const A=[];e.getRectMinMax(_,y,M,w,A);const P=A[0],D=A[1];if(!(f.z-g>D||f.z+g<P))for(let S=_;S<M;S++)for(let E=y;E<w;E++){let V=!1;if(e.getConvexTrianglePillar(S,E,!1),zt.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(V=this.convexConvex(t,e.pillarConvex,n,v,s,r,a,l,null,null,d,m,null)),d&&V||(e.getConvexTrianglePillar(S,E,!0),zt.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(V=this.convexConvex(t,e.pillarConvex,n,v,s,r,a,l,null,null,d,m,null)),d&&V))return!0}}sphereParticle(t,e,n,i,s,r,a,l,c,u,d){const h=k_;if(h.set(0,0,1),i.vsub(n,h),h.lengthSquared()<=t.radius*t.radius){if(d)return!0;const g=this.createContactEquation(l,a,e,t,c,u);h.normalize(),g.rj.copy(h),g.rj.scale(t.radius,g.rj),g.ni.copy(h),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,s,r,a,l,c,u,d){const h=B_;h.set(0,0,1),a.quaternion.vmult(h,h);const p=V_;if(i.vsub(a.position,p),h.dot(p)<=0){if(d)return!0;const v=this.createContactEquation(l,a,e,t,c,u);v.ni.copy(h),v.ni.negate(v.ni),v.ri.set(0,0,0);const m=G_;h.scale(h.dot(i),m),i.vsub(m,m),v.rj.copy(m),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,s,r,a,l,c,u,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,r,a,l,t,e,d)}convexParticle(t,e,n,i,s,r,a,l,c,u,d){let h=-1;const p=W_,g=q_;let v=null;const m=H_;if(m.copy(i),m.vsub(n,m),s.conjugate(ll),ll.vmult(m,m),t.pointIsInside(m)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let f=0,_=t.faces.length;f!==_;f++){const M=[t.worldVertices[t.faces[f][0]]],y=t.worldFaceNormals[f];i.vsub(M[0],cl);const w=-y.dot(cl);if(v===null||Math.abs(w)<Math.abs(v)){if(d)return!0;v=w,h=f,p.copy(y)}}if(h!==-1){const f=this.createContactEquation(l,a,e,t,c,u);p.scale(v,g),g.vadd(i,g),g.vsub(n,g),f.rj.copy(g),p.negate(f.ni),f.ri.set(0,0,0);const _=f.ri,M=f.rj;_.vadd(i,_),_.vsub(l.position,_),M.vadd(n,M),M.vsub(a.position,M),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,r,a,l,c,u,d){return this.convexHeightfield(e,t,i,n,r,s,l,a,c,u,d)}particleCylinder(t,e,n,i,s,r,a,l,c,u,d){return this.convexParticle(e,t,i,n,r,s,l,a,c,u,d)}sphereTrimesh(t,e,n,i,s,r,a,l,c,u,d){const h=t_,p=e_,g=n_,v=i_,m=s_,f=r_,_=c_,M=Qv,y=Zv,w=u_;zt.pointToLocalFrame(i,r,n,m);const A=t.radius;_.lowerBound.set(m.x-A,m.y-A,m.z-A),_.upperBound.set(m.x+A,m.y+A,m.z+A),e.getTrianglesInAABB(_,w);const P=Jv,D=t.radius*t.radius;for(let C=0;C<w.length;C++)for(let R=0;R<3;R++)if(e.getVertex(e.indices[w[C]*3+R],P),P.vsub(m,y),y.lengthSquared()<=D){if(M.copy(P),zt.pointToWorldFrame(i,r,M,P),P.vsub(n,y),d)return!0;let I=this.createContactEquation(a,l,t,e,c,u);I.ni.copy(y),I.ni.normalize(),I.ri.copy(I.ni),I.ri.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),I.rj.copy(P),I.rj.vsub(l.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}for(let C=0;C<w.length;C++)for(let R=0;R<3;R++){e.getVertex(e.indices[w[C]*3+R],h),e.getVertex(e.indices[w[C]*3+(R+1)%3],p),p.vsub(h,g),m.vsub(p,f);const I=f.dot(g);m.vsub(h,f);let U=f.dot(g);if(U>0&&I<0&&(m.vsub(h,f),v.copy(g),v.normalize(),U=f.dot(v),v.scale(U,f),f.vadd(h,f),f.distanceTo(m)<t.radius)){if(d)return!0;const G=this.createContactEquation(a,l,t,e,c,u);f.vsub(m,G.ni),G.ni.normalize(),G.ni.scale(t.radius,G.ri),G.ri.vadd(n,G.ri),G.ri.vsub(a.position,G.ri),zt.pointToWorldFrame(i,r,f,f),f.vsub(l.position,G.rj),zt.vectorToWorldFrame(r,G.ni,G.ni),zt.vectorToWorldFrame(r,G.ri,G.ri),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}}const S=o_,E=a_,V=l_,F=$v;for(let C=0,R=w.length;C!==R;C++){e.getTriangleVertices(w[C],S,E,V),e.getNormal(w[C],F),m.vsub(S,f);let I=f.dot(F);if(F.scale(I,f),m.vsub(f,f),I=f.distanceTo(m),te.pointInTriangle(f,S,E,V)&&I<t.radius){if(d)return!0;let U=this.createContactEquation(a,l,t,e,c,u);f.vsub(m,U.ni),U.ni.normalize(),U.ni.scale(t.radius,U.ri),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),zt.pointToWorldFrame(i,r,f,f),f.vsub(l.position,U.rj),zt.vectorToWorldFrame(r,U.ni,U.ni),zt.vectorToWorldFrame(r,U.ri,U.ri),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}}w.length=0}planeTrimesh(t,e,n,i,s,r,a,l,c,u,d){const h=new x,p=jv;p.set(0,0,1),s.vmult(p,p);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,h);const v=new x;v.copy(h),zt.pointToWorldFrame(i,r,v,h);const m=Yv;if(h.vsub(n,m),p.dot(m)<=0){if(d)return!0;const _=this.createContactEquation(a,l,t,e,c,u);_.ni.copy(p);const M=Kv;p.scale(m.dot(p),M),h.vsub(M,M),_.ri.copy(M),_.ri.vsub(a.position,_.ri),_.rj.copy(h),_.rj.vsub(l.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}}const Bn=new x,vi=new x,_i=new x,Hv=new x,Wv=new x,qv=new ne,Xv=new ne,jv=new x,Yv=new x,Kv=new x,$v=new x,Zv=new x;new x;const Jv=new x,Qv=new x,t_=new x,e_=new x,n_=new x,i_=new x,s_=new x,r_=new x,o_=new x,a_=new x,l_=new x,c_=new jt,u_=[],ks=new x,al=new x,h_=new x,d_=new x,f_=new x;function p_(o,t,e){let n=null;const i=o.length;for(let s=0;s!==i;s++){const r=o[s],a=h_;o[(s+1)%i].vsub(r,a);const l=d_;a.cross(t,l);const c=f_;e.vsub(r,c);const u=l.dot(c);if(n===null||u>0&&n===!0||u<=0&&n===!1){n===null&&(n=u>0);continue}else return!1}return!0}const Hs=new x,m_=new x,g_=new x,v_=new x,__=[new x,new x,new x,new x,new x,new x],x_=new x,y_=new x,M_=new x,S_=new x,w_=new x,b_=new x,E_=new x,T_=new x,A_=new x,C_=new x,L_=new x,P_=new x,R_=new x,D_=new x;new x;new x;const I_=new x,N_=new x,U_=new x,z_=new x,F_=new x,O_=new x,B_=new x,V_=new x,G_=new x,k_=new x,ll=new ne,H_=new x;new x;const W_=new x,cl=new x,q_=new x,X_=new x,j_=new x,Y_=[0],K_=new x,$_=new x;class ul{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let r=i.length-1;r>=s;r--)i[r+1]=i[r];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,r=i.length;let a=0;for(let l=0;l<s;l++){let c=!1;const u=n[l];for(;u>i[a];)a++;c=u===i[a],c||hl(t,u)}a=0;for(let l=0;l<r;l++){let c=!1;const u=i[l];for(;u>n[a];)a++;c=n[a]===u,c||hl(e,u)}}}function hl(o,t){o.push((t&4294901760)>>16,t&65535)}const Hr=(o,t)=>o<t?`${o}-${t}`:`${t}-${o}`;class Z_{constructor(){this.data={keys:[]}}get(t,e){const n=Hr(t,e);return this.data[n]}set(t,e,n){const i=Hr(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=Hr(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class J_ extends nc{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new x,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new x,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Zg,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new zv,this.constraints=[],this.narrowphase=new kv(this),this.collisionMatrix=new Wa,this.collisionMatrixPrevious=new Wa,this.bodyOverlapKeeper=new ul,this.shapeOverlapKeeper=new ul,this.contactmaterials=[],this.contactMaterialTable=new Z_,this.defaultMaterial=new Bi("default"),this.defaultContactMaterial=new ps(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Ys?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=te.ALL,n.from=t,n.to=e,n.callback=i,Wr.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=te.ANY,n.from=t,n.to=e,n.result=i,Wr.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=te.CLOSEST,n.from=t,n.to=e,n.result=i,Wr.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof ut&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const r=i[s];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=se.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=se.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(se.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,r,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,r,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=i0,i=s0,s=this.bodies.length,r=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,u=this.profile,d=ut.DYNAMIC;let h=-1/0;const p=this.constraints,g=n0;l.length();const v=l.x,m=l.y,f=l.z;let _=0;for(c&&(h=se.now()),_=0;_!==s;_++){const C=r[_];if(C.type===d){const R=C.force,I=C.mass;R.x+=I*v,R.y+=I*m,R.z+=I*f}}for(let C=0,R=this.subsystems.length;C!==R;C++)this.subsystems[C].update();c&&(h=se.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),c&&(u.broadphase=se.now()-h);let M=p.length;for(_=0;_!==M;_++){const C=p[_];if(!C.collideConnected)for(let R=n.length-1;R>=0;R-=1)(C.bodyA===n[R]&&C.bodyB===i[R]||C.bodyB===n[R]&&C.bodyA===i[R])&&(n.splice(R,1),i.splice(R,1))}this.collisionMatrixTick(),c&&(h=se.now());const y=e0,w=e.length;for(_=0;_!==w;_++)y.push(e[_]);e.length=0;const A=this.frictionEquations.length;for(_=0;_!==A;_++)g.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,y,this.frictionEquations,g),c&&(u.narrowphase=se.now()-h),c&&(h=se.now()),_=0;_<this.frictionEquations.length;_++)a.addEquation(this.frictionEquations[_]);const P=e.length;for(let C=0;C!==P;C++){const R=e[C],I=R.bi,U=R.bj,Z=R.si,G=R.sj;let Y;if(I.material&&U.material?Y=this.getContactMaterial(I.material,U.material)||this.defaultContactMaterial:Y=this.defaultContactMaterial,Y.friction,I.material&&U.material&&(I.material.friction>=0&&U.material.friction>=0&&I.material.friction*U.material.friction,I.material.restitution>=0&&U.material.restitution>=0&&(R.restitution=I.material.restitution*U.material.restitution)),a.addEquation(R),I.allowSleep&&I.type===ut.DYNAMIC&&I.sleepState===ut.SLEEPING&&U.sleepState===ut.AWAKE&&U.type!==ut.STATIC){const Q=U.velocity.lengthSquared()+U.angularVelocity.lengthSquared(),ft=U.sleepSpeedLimit**2;Q>=ft*2&&(I.wakeUpAfterNarrowphase=!0)}if(U.allowSleep&&U.type===ut.DYNAMIC&&U.sleepState===ut.SLEEPING&&I.sleepState===ut.AWAKE&&I.type!==ut.STATIC){const Q=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),ft=I.sleepSpeedLimit**2;Q>=ft*2&&(U.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(I,U,!0),this.collisionMatrixPrevious.get(I,U)||(Xi.body=U,Xi.contact=R,I.dispatchEvent(Xi),Xi.body=I,U.dispatchEvent(Xi)),this.bodyOverlapKeeper.set(I.id,U.id),this.shapeOverlapKeeper.set(Z.id,G.id)}for(this.emitContactEvents(),c&&(u.makeContactConstraints=se.now()-h,h=se.now()),_=0;_!==s;_++){const C=r[_];C.wakeUpAfterNarrowphase&&(C.wakeUp(),C.wakeUpAfterNarrowphase=!1)}for(M=p.length,_=0;_!==M;_++){const C=p[_];C.update();for(let R=0,I=C.equations.length;R!==I;R++){const U=C.equations[R];a.addEquation(U)}}a.solve(t,this),c&&(u.solve=se.now()-h),a.removeAllEquations();const D=Math.pow;for(_=0;_!==s;_++){const C=r[_];if(C.type&d){const R=D(1-C.linearDamping,t),I=C.velocity;I.scale(R,I);const U=C.angularVelocity;if(U){const Z=D(1-C.angularDamping,t);U.scale(Z,U)}}}this.dispatchEvent(t0),c&&(h=se.now());const E=this.stepnumber%(this.quatNormalizeSkip+1)===0,V=this.quatNormalizeFast;for(_=0;_!==s;_++)r[_].integrate(t,E,V);this.clearForces(),this.broadphase.dirty=!0,c&&(u.integrate=se.now()-h),this.stepnumber+=1,this.dispatchEvent(Q_);let F=!0;if(this.allowSleep)for(F=!1,_=0;_!==s;_++){const C=r[_];C.sleepTick(this.time),C.sleepState!==ut.SLEEPING&&(F=!0)}this.hasActiveBodies=F}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(pn,mn),t){for(let s=0,r=pn.length;s<r;s+=2)ji.bodyA=this.getBodyById(pn[s]),ji.bodyB=this.getBodyById(pn[s+1]),this.dispatchEvent(ji);ji.bodyA=ji.bodyB=null}if(e){for(let s=0,r=mn.length;s<r;s+=2)Yi.bodyA=this.getBodyById(mn[s]),Yi.bodyB=this.getBodyById(mn[s+1]),this.dispatchEvent(Yi);Yi.bodyA=Yi.bodyB=null}pn.length=mn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(pn,mn),n){for(let s=0,r=pn.length;s<r;s+=2){const a=this.getShapeById(pn[s]),l=this.getShapeById(pn[s+1]);gn.shapeA=a,gn.shapeB=l,a&&(gn.bodyA=a.body),l&&(gn.bodyB=l.body),this.dispatchEvent(gn)}gn.bodyA=gn.bodyB=gn.shapeA=gn.shapeB=null}if(i){for(let s=0,r=mn.length;s<r;s+=2){const a=this.getShapeById(mn[s]),l=this.getShapeById(mn[s+1]);vn.shapeA=a,vn.shapeB=l,a&&(vn.bodyA=a.body),l&&(vn.bodyB=l.body),this.dispatchEvent(vn)}vn.bodyA=vn.bodyB=vn.shapeA=vn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new jt;const Wr=new te,se=globalThis.performance||{};if(!se.now){let o=Date.now();se.timing&&se.timing.navigationStart&&(o=se.timing.navigationStart),se.now=()=>Date.now()-o}new x;const Q_={type:"postStep"},t0={type:"preStep"},Xi={type:ut.COLLIDE_EVENT_NAME,body:null,contact:null},e0=[],n0=[],i0=[],s0=[],pn=[],mn=[],ji={type:"beginContact",bodyA:null,bodyB:null},Yi={type:"endContact",bodyA:null,bodyB:null},gn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},vn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},r0={friction:0,restitution:1};let rs;function o0(){rs=new J_,rs.gravity.set(0,0,0)}function Jn(){return rs}function a0(){rs.step(1/60)}function uc(o,t,e=r0){const n=new ps(o,t,e);rs.addContactMaterial(n)}function xo(o,t,e=0){const n=l0(o),{x:i,y:s,z:r}=o.position,a=new x(i,s,r);return new ut({mass:e,shape:n,position:a,material:t})}function l0(o){const{geometry:t}=o;if(t instanceof nr){const{radius:s}=t.parameters;return new Av(s)}else if(t instanceof er){const{radius:s,height:r,radialSegments:a}=t.parameters;return new el(1e-4,s,r,a)}else if(t instanceof ds){const{radiusTop:s,radiusBottom:r,height:a,radialSegments:l}=t.parameters;return new el(s,r,a,l)}const{position:e}=t.attributes,n=e.array??[],i=Object.keys(n).map(Number);return new Ks(n,i)}function c0(o){const t=new Map;if(!o.length)return t;for(let e=0;e<o.length;e++){const n=o[e];t.set(n.name,n)}return u0(t),t}function wi(o,t){const e=o.get(t);return e?h0(e):null}function u0(o){const t=dl({keypointsMap:o,name:"neck",startKeypointName:"left_shoulder",endKeypointName:"right_shoulder"});t&&o.set(t.name,t);const e=dl({keypointsMap:o,name:"stomach",startKeypointName:"left_hip",endKeypointName:"right_hip"});e&&o.set(e.name,e)}function dl({name:o,keypointsMap:t,startKeypointName:e,endKeypointName:n}){const i=t.get(e),s=t.get(n);if(!i||!s)return null;const r=gs([i.x,s.x]),a=gs([i.y,s.y]),l=i.z&&s.z?gs([i.z,s.z]):0,c=i.score&&s.score?gs([i.score,s.score]):0;return{name:o,x:r,y:a,z:l,score:c}}function h0(o){const t=fg(o.x),e=pg(o.y);return new O(t,e,0)}const yo=new Bi("bubbleMaterial");function hc(o){d0(o),f0(o)}function d0(o){var n;const t=(n=o.userData)==null?void 0:n.body;if(!t)return;let e=new O;o.getWorldPosition(e),e.z=0,t.position.copy(e),t.quaternion.copy(o.quaternion)}function f0(o){var s,r;const t=(s=o.userData)==null?void 0:s.body;if(!t)return;const e=o.visible&&(!o.parent||o.parent.visible),n=(r=o.userData)==null?void 0:r.bodyInWorld,i=e&&!n;i?Jn().addBody(t):Jn().removeBody(t),o.userData.bodyInWorld=i}function p0(o,t){const{keypoints:e}=t,n=c0(e);n.size&&(m0(o,n),g0(o,n))}function m0(o,t){const e=o.getObjectByName("HEAD");if(!e)return;const n=wi(t,"left_eye_outer"),i=wi(t,"right_eye_outer"),s=wi(t,"nose"),r=wi(t,"neck");if(!(n&&i&&r&&s)){e.visible=!1;return}const a=r.y+e.userData.radius*2;e.position.set(s.x,a,s.z);const l=po(n,i);for(let c=0;c<e.children.length;c++){const u=e.children[c];u instanceof Ce&&(u.rotation.z=u.userData.rotation.z+l,hc(u))}e.visible=!0}function g0(o,t){const e=o.getObjectByName("BODY");e&&e.traverse(n=>{n instanceof Ke&&v0(t,n)})}function v0(o,t){const{userData:e}=t;if(!(e!=null&&e.startKeypointName)||!(e!=null&&e.endKeypointName))return;const n=wi(o,e.startKeypointName),i=wi(o,e.endKeypointName);if(!n||!i){t.visible=!1;return}const s=i.clone().sub(n),r=po(i,n);for(let a=0;a<t.children.length;a++){const l=t.children[a];if(!(l instanceof Ce))continue;const c=a/t.children.length,u=n.clone().add(s.clone().multiplyScalar(c));u.add(l.userData.offset),l.position.copy(u),l.rotation.z=l.userData.rotation.z+r,hc(l)}t.visible=!0}const _0="assets/images/",x0=["static_1.png","static_2.png","static_3.png","static_4.png","static_5.png","static_6.png","static_7.png","static_stripe_1.png","static_stripe_2.png","static_stripe_3.png","static_stripe_4.png","static_stripe_5.png"],y0=M0(x0);function M0(o){return o.map(t=>S0(t))}function S0(o,t=-1.57,e=.5,n=.5){const i=`${_0}${o}`,s=new cg().load(i);return s.rotation=t,s.center.set(e,n),s}const w0="assets/videos/",b0=["h_video.mp4","s_video.mp4","texture_anim_1.mp4","texture_anim_2.mp4","texture_anim_3.mp4","texture_anim_4.mp4","texture_anim_5.mp4"],E0=C0(b0);function T0(o){const t=document.createElement("video"),e=`${w0}${o}`;return Object.entries({id:o,src:e,autoplay:!0,muted:!0,loop:!0,type:"video/mp4",crossorigin:"anonymous",playsinline:!0,"webkit-playsinline":!0,style:"display: none"}).forEach(([i,s])=>{t.setAttribute(i,s.toString())}),t.muted=!0,t.play(),t}function A0(o,t=-1.57,e=.5,n=.5){const i=new rg(o);return i.rotation=t,i.center.set(e,n),i}function C0(o){return o.map(t=>{const e=T0(t);return A0(e)})}const L0=[...E0,...y0];function dc(){return Sl(L0)}function P0(o,t=.8,e=2,n=32){const i=new er(t,e,n),s=new fo({map:o}),r=new Ce(i,s);return r.castShadow=!0,r.receiveShadow=!0,r}function R0(o,t=.3,e=.3,n=3,i=20){const s=new ds(t,e,n,i),r=new fo({map:o}),a=new Ce(s,r);return a.castShadow=!0,a.receiveShadow=!0,a}function fc(o,t=.6){const e=new nr(t),n=new fo({map:o}),i=new Ce(e,n);return i.castShadow=!0,i.receiveShadow=!0,i}function pc({radius:o=.4,x:t=0,y:e=0,z:n=0,offset:i=.5,rotation:s=mg(),texture:r=dc()}={}){const a=fc(r,o);return a.position.set(t,e,n),a.userData.rotation=s,a.userData.offset=D0(i),a}const D0=o=>{const t=-o/2,e=o/2,n=Ye(t,e),i=Ye(t,e),s=Ye(t,e);return new O(n,i,s)};function I0(){const o=new Ke;return o.name="BODY",o.add(N0()),o.add(U0()),o}function N0(){const{torsoThickRadius:o,torsoThickCount:t,torsoOffsetPercentage:e,torsoMediumRadius:n,torsoMediumCount:i,torsoSmallRadius:s,torsoSmallCount:r}=Qn(),a={startKeypointName:"neck",endKeypointName:"stomach"},l=Li(o,t,e,a),c=Li(n,i,e,a),u=Li(s,r,e,a),d=new Ke;return d.name="TORSO",d.add(l),d.add(c),d.add(u),d}function U0(){const o=[["left_elbow","left_shoulder"],["left_wrist","left_elbow"],["stomach","left_knee"],["neck","right_shoulder"],["right_elbow","right_wrist"],["stomach","right_knee"],["left_knee","left_foot_index"],["right_knee","right_foot_index"],["right_shoulder","right_elbow"],["left_shoulder","neck"]],{limbsThickRadius:t,limbsThickCount:e,limbsOffsetPercentage:n,limbsMediumRadius:i,limbsMediumCount:s,limbsSmallRadius:r,limbsSmallCount:a}=Qn(),l=new Ke;l.name="LIMBS";for(let[c,u]of o){const d={startKeypointName:c,endKeypointName:u},h=Li(t,e,n,d),p=Li(i,s,n,d),g=Li(r,a,n,d);l.add(h),l.add(p),l.add(g)}return l}function Li(o=.2,t=5,e=0,n={}){const i=new Ke;i.visible=!1,i.userData=n;for(let s=0;s<t;s++){const r=s*o*2,a=pc({x:r,radius:o,offset:e});a.userData.body=xo(a,yo,0),i.add(a)}return i}function z0(o=1.2,t=50){const e=new Ke;e.name="HEAD",e.visible=!1,e.userData.radius=o;for(let n=0;n<t;n++){const i=F0(o);e.add(i)}return e}function F0(o){const t=Ye(.1,.4),e=pc({radius:t,offset:0}),n=js(0,50),i=js(0,50),s=o*Math.sin(n)*Math.cos(i),r=o*Math.sin(n)*Math.sin(i),a=o*Ye(0,.5);return e.position.set(s,r,a),e.userData.body=xo(e,yo,0),e}let je=null;async function O0(){const{poses:o,posesLost:t,posesFound:e}=await kc();t?gc():e&&mc(),!(!o.length||!je)&&p0(je,o[0])}function B0(){gc(),mc()}function mc(){je=new Ke;const o=z0(),t=I0();je.name="FIGURE",je.add(o),je.add(t),ti().add(je)}function gc(){je&&(ti().remove(je),gg(je,o=>{var t;(t=o.userData)!=null&&t.body&&Jn().removeBody(o.userData.body)}),je=null)}var qr=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Xr(o,t,e,n){o.addEventListener?o.addEventListener(t,e,n):o.attachEvent&&o.attachEvent("on".concat(t),function(){e(window.event)})}function vc(o,t){for(var e=t.slice(0,t.length-1),n=0;n<e.length;n++)e[n]=o[e[n].toLowerCase()];return e}function _c(o){typeof o!="string"&&(o=""),o=o.replace(/\s/g,"");for(var t=o.split(","),e=t.lastIndexOf("");e>=0;)t[e-1]+=",",t.splice(e,1),e=t.lastIndexOf("");return t}function V0(o,t){for(var e=o.length>=t.length?o:t,n=o.length>=t.length?t:o,i=!0,s=0;s<e.length;s++)n.indexOf(e[s])===-1&&(i=!1);return i}var os={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":qr?173:189,"=":qr?61:187,";":qr?59:186,"'":222,"[":219,"]":221,"\\":220},an={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},oo={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},de={16:!1,18:!1,17:!1,91:!1},ee={};for(var Ws=1;Ws<20;Ws++)os["f".concat(Ws)]=111+Ws;var Xt=[],fl=!1,xc="all",yc=[],ir=function(t){return os[t.toLowerCase()]||an[t.toLowerCase()]||t.toUpperCase().charCodeAt(0)},G0=function(t){return Object.keys(os).find(function(e){return os[e]===t})},k0=function(t){return Object.keys(an).find(function(e){return an[e]===t})};function Mc(o){xc=o||"all"}function as(){return xc||"all"}function H0(){return Xt.slice(0)}function W0(){return Xt.map(function(o){return G0(o)||k0(o)||String.fromCharCode(o)})}function q0(o){var t=o.target||o.srcElement,e=t.tagName,n=!0;return(t.isContentEditable||(e==="INPUT"||e==="TEXTAREA"||e==="SELECT")&&!t.readOnly)&&(n=!1),n}function X0(o){return typeof o=="string"&&(o=ir(o)),Xt.indexOf(o)!==-1}function j0(o,t){var e,n;o||(o=as());for(var i in ee)if(Object.prototype.hasOwnProperty.call(ee,i))for(e=ee[i],n=0;n<e.length;)e[n].scope===o?e.splice(n,1):n++;as()===o&&Mc(t||"all")}function Y0(o){var t=o.keyCode||o.which||o.charCode,e=Xt.indexOf(t);if(e>=0&&Xt.splice(e,1),o.key&&o.key.toLowerCase()==="meta"&&Xt.splice(0,Xt.length),(t===93||t===224)&&(t=91),t in de){de[t]=!1;for(var n in an)an[n]===t&&(xn[n]=!1)}}function K0(o){if(typeof o>"u")Object.keys(ee).forEach(function(r){return delete ee[r]});else if(Array.isArray(o))o.forEach(function(r){r.key&&jr(r)});else if(typeof o=="object")o.key&&jr(o);else if(typeof o=="string"){for(var t=arguments.length,e=new Array(t>1?t-1:0),n=1;n<t;n++)e[n-1]=arguments[n];var i=e[0],s=e[1];typeof i=="function"&&(s=i,i=""),jr({key:o,scope:i,method:s,splitKey:"+"})}}var jr=function(t){var e=t.key,n=t.scope,i=t.method,s=t.splitKey,r=s===void 0?"+":s,a=_c(e);a.forEach(function(l){var c=l.split(r),u=c.length,d=c[u-1],h=d==="*"?"*":ir(d);if(ee[h]){n||(n=as());var p=u>1?vc(an,c):[];ee[h]=ee[h].filter(function(g){var v=i?g.method===i:!0;return!(v&&g.scope===n&&V0(g.mods,p))})}})};function pl(o,t,e,n){if(t.element===n){var i;if(t.scope===e||t.scope==="all"){i=t.mods.length>0;for(var s in de)Object.prototype.hasOwnProperty.call(de,s)&&(!de[s]&&t.mods.indexOf(+s)>-1||de[s]&&t.mods.indexOf(+s)===-1)&&(i=!1);(t.mods.length===0&&!de[16]&&!de[18]&&!de[17]&&!de[91]||i||t.shortcut==="*")&&t.method(o,t)===!1&&(o.preventDefault?o.preventDefault():o.returnValue=!1,o.stopPropagation&&o.stopPropagation(),o.cancelBubble&&(o.cancelBubble=!0))}}}function ml(o,t){var e=ee["*"],n=o.keyCode||o.which||o.charCode;if(xn.filter.call(this,o)){if((n===93||n===224)&&(n=91),Xt.indexOf(n)===-1&&n!==229&&Xt.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach(function(g){var v=oo[g];o[g]&&Xt.indexOf(v)===-1?Xt.push(v):!o[g]&&Xt.indexOf(v)>-1?Xt.splice(Xt.indexOf(v),1):g==="metaKey"&&o[g]&&Xt.length===3&&(o.ctrlKey||o.shiftKey||o.altKey||(Xt=Xt.slice(Xt.indexOf(v))))}),n in de){de[n]=!0;for(var i in an)an[i]===n&&(xn[i]=!0);if(!e)return}for(var s in de)Object.prototype.hasOwnProperty.call(de,s)&&(de[s]=o[oo[s]]);o.getModifierState&&!(o.altKey&&!o.ctrlKey)&&o.getModifierState("AltGraph")&&(Xt.indexOf(17)===-1&&Xt.push(17),Xt.indexOf(18)===-1&&Xt.push(18),de[17]=!0,de[18]=!0);var r=as();if(e)for(var a=0;a<e.length;a++)e[a].scope===r&&(o.type==="keydown"&&e[a].keydown||o.type==="keyup"&&e[a].keyup)&&pl(o,e[a],r,t);if(n in ee){for(var l=0;l<ee[n].length;l++)if((o.type==="keydown"&&ee[n][l].keydown||o.type==="keyup"&&ee[n][l].keyup)&&ee[n][l].key){for(var c=ee[n][l],u=c.splitKey,d=c.key.split(u),h=[],p=0;p<d.length;p++)h.push(ir(d[p]));h.sort().join("")===Xt.sort().join("")&&pl(o,c,r,t)}}}}function $0(o){return yc.indexOf(o)>-1}function xn(o,t,e){Xt=[];var n=_c(o),i=[],s="all",r=document,a=0,l=!1,c=!0,u="+",d=!1;for(e===void 0&&typeof t=="function"&&(e=t),Object.prototype.toString.call(t)==="[object Object]"&&(t.scope&&(s=t.scope),t.element&&(r=t.element),t.keyup&&(l=t.keyup),t.keydown!==void 0&&(c=t.keydown),t.capture!==void 0&&(d=t.capture),typeof t.splitKey=="string"&&(u=t.splitKey)),typeof t=="string"&&(s=t);a<n.length;a++)o=n[a].split(u),i=[],o.length>1&&(i=vc(an,o)),o=o[o.length-1],o=o==="*"?"*":ir(o),o in ee||(ee[o]=[]),ee[o].push({keyup:l,keydown:c,scope:s,mods:i,shortcut:n[a],method:e,key:n[a],splitKey:u,element:r});typeof r<"u"&&!$0(r)&&window&&(yc.push(r),Xr(r,"keydown",function(h){ml(h,r)},d),fl||(fl=!0,Xr(window,"focus",function(){Xt=[]},d)),Xr(r,"keyup",function(h){ml(h,r),Y0(h)},d))}function Z0(o){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(ee).forEach(function(e){var n=ee[e].filter(function(i){return i.scope===t&&i.shortcut===o});n.forEach(function(i){i&&i.method&&i.method()})})}var Yr={getPressedKeyString:W0,setScope:Mc,getScope:as,deleteScope:j0,getPressedKeyCodes:H0,isPressed:X0,filter:q0,trigger:Z0,unbind:K0,keyMap:os,modifier:an,modifierMap:oo};for(var Kr in Yr)Object.prototype.hasOwnProperty.call(Yr,Kr)&&(xn[Kr]=Yr[Kr]);if(typeof window<"u"){var J0=window.hotkeys;xn.noConflict=function(o){return o&&window.hotkeys===xn&&(window.hotkeys=J0),xn},window.hotkeys=xn}function Q0(o){return new URLSearchParams(window.location.search).get(o)}function tx(o,t,e){const n=document.createElement("option");return n.value=t,n.textContent=o,t===e&&(n.selected=!0),n}function ex(o,t){const e=document.getElementsByName(o);if(!e.length)throw Error(`Didn't find input name ${o}`);e.forEach(n=>{n.value=t})}function nx(o){const e=new FormData(o).entries(),n={};for(const[i,s]of e){const r=s.toString(),a=Oc(r);n[i]=a?parseFloat(r):r}return n}async function ix({onSubmit:o}){Sc(),await sx(),rx(o),lx()}function Sc(){const o=Qn();Object.entries(o).forEach(([t,e])=>ex(t,e))}async function sx(){const[o]=document.getElementsByName("videoDeviceId");if(!o)throw Error("Haven't found video control input name videoDeviceId");const t=await yl(),e=await Ml();t.forEach(({deviceId:n,label:i})=>{const s=tx(i,n,e);o.appendChild(s)})}function rx(o){const t=document.getElementById("controls"),e=document.getElementById("reset");if(!t||!e)throw Error("Form controls and reset button not found :(");t.onsubmit=n=>ox(n,o),e.onclick=()=>ax(o)}function ox(o,t){o.preventDefault();const e=nx(o.target);zc(e),t()}function ax(o){xl(),Sc(),o()}function lx(){Q0("controls")&&gl(),xn("ctrl+k, command+k",()=>gl())}function gl(){const o=document.getElementById("controls");if(!o)throw Error("Form controls not found");o.classList.toggle("hidden")}const $s=new Bi("shapeMaterial"),Zs=0,cx=[fc,R0,P0],vl={min:2,max:7},xi={min:-5,max:5},ux=5,hx=1;let ls,sr,jn=[];function wc(){Mx(),px(),fx();const{amountShapes:o}=Qn();for(let t=0;t<o;t++){const e=bc();jn.push(e)}}function dx(){for(let o=0;o<jn.length;o++){const t=jn[o];Tc(t),mx(t)||(Ec(t),jn[o]=bc())}}function bc(){const o=dc(),t=Sl(cx);if(!t)throw Error("No shape factory found");const e=t(o),n=xo(e,$s,hx);return e.userData={body:n,trajectory:null},Tc(e),ti().add(e),Jn().addBody(e.userData.body),e}function Ec(o){ti().remove(o),Jn().removeBody(o.userData.body),Ql(o)}function fx(){Jn().addEventListener("postStep",Ac),uc($s,$s)}function px(){ls=_l(),sr=_l(ux)}function _l(o=0){const{top:t,right:e,bottom:n,left:i}=dg(),s=new O(i-o,n-o,Zs),r=new O(e+o,t+o,Zs);return new zi(s,r)}function Tc(o){o.userData.trajectory||(o.userData.trajectory=_x(),gx(o)),vx(o)}function mx(o){return o?sr.containsPoint(o.position):!1}function gx(o){const{rotation:t,velocity:e,start:n}=o.userData.trajectory;o.userData.body.position.copy(n),o.userData.body.velocity.x=e.x,o.userData.body.velocity.y=e.y,o.userData.body.angularVelocity.copy(t),o.userData.body.angularVelocity.normalize()}function vx(o){o.position.copy(o.userData.body.position),o.quaternion.copy(o.userData.body.quaternion)}function _x(){const o=new O(Ye(ls.min.x,ls.max.x),sr.max.y,Zs),t=xx(o),e=new O(Ye(xi.min,xi.max),Ye(xi.min,xi.max),Ye(xi.min,xi.max));return{start:o,rotation:e,velocity:t}}function xx(o){const t=new O(Ye(ls.min.x,ls.max.x),sr.min.y,o.z),e=Ye(vl.min,vl.max),n=po(o,t);return yx(n,e,o.z)}function yx(o,t,e){const n=t*Math.cos(o),i=t*Math.sin(o);return new O(n,i,e)}function Mx(){for(let o of jn)Ec(o);jn=[],Jn().removeEventListener("postStep",Ac)}function Ac(){for(let o of jn)o.userData.body.position.z=Zs,o.position.copy(o.userData.body.position)}const Cc=async function(){requestAnimationFrame(Cc),a0(),dx(),await O0(),yg()};async function Sx(){Uc(),xg(),o0(),await ix({onSubmit:wx}),wc(),uc(yo,$s),Cc(),await Vc()}function wx(){Mg(),B0(),tc(),wc()}Sx();
