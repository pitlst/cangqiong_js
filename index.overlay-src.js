
(() => {
    const DT_BUNDLE = `(()=>{var Nf=Object.create;var zu=Object.defineProperty;var Lf=Object.getOwnPropertyDescriptor;var Vf=Object.getOwnPropertyNames;var Df=Object.getPrototypeOf,$f=Object.prototype.hasOwnProperty;var It=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Tf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Vf(t))!$f.call(e,l)&&l!==n&&zu(e,l,{get:()=>t[l],enumerable:!(r=Lf(t,l))||r.enumerable});return e};var yr=(e,t,n)=>(n=e!=null?Nf(Df(e)):{},Tf(t||!e||!e.__esModule?zu(n,"default",{value:e,enumerable:!0}):n,e));var Uu=It(z=>{"use strict";var Rn=Symbol.for("react.element"),Of=Symbol.for("react.portal"),Hf=Symbol.for("react.fragment"),Af=Symbol.for("react.strict_mode"),jf=Symbol.for("react.profiler"),Bf=Symbol.for("react.provider"),Uf=Symbol.for("react.context"),Gf=Symbol.for("react.forward_ref"),Wf=Symbol.for("react.suspense"),Qf=Symbol.for("react.memo"),Kf=Symbol.for("react.lazy"),Nu=Symbol.iterator;function Xf(e){return e===null||typeof e!="object"?null:(e=Nu&&e[Nu]||e["@@iterator"],typeof e=="function"?e:null)}var Du={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$u=Object.assign,Tu={};function Qt(e,t,n){this.props=e,this.context=t,this.refs=Tu,this.updater=n||Du}Qt.prototype.isReactComponent={};Qt.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Qt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ou(){}Ou.prototype=Qt.prototype;function Xl(e,t,n){this.props=e,this.context=t,this.refs=Tu,this.updater=n||Du}var ql=Xl.prototype=new Ou;ql.constructor=Xl;$u(ql,Qt.prototype);ql.isPureReactComponent=!0;var Lu=Array.isArray,Hu=Object.prototype.hasOwnProperty,Yl={current:null},Au={key:!0,ref:!0,__self:!0,__source:!0};function ju(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Hu.call(t,r)&&!Au.hasOwnProperty(r)&&(l[r]=t[r]);var u=arguments.length-2;if(u===1)l.children=n;else if(1<u){for(var s=Array(u),a=0;a<u;a++)s[a]=arguments[a+2];l.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)l[r]===void 0&&(l[r]=u[r]);return{$typeof:Rn,type:e,key:o,ref:i,props:l,_owner:Yl.current}}function qf(e,t){return{$typeof:Rn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zl(e){return typeof e=="object"&&e!==null&&e.$typeof===Rn}function Yf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Vu=/\\/+/g;function Kl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Yf(""+e.key):t.toString(36)}function wr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$typeof){case Rn:case Of:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Kl(i,0):r,Lu(l)?(n="",e!=null&&(n=e.replace(Vu,"(() => {/")+"/"),wr(l,t,n,"",function(a){return a})):l!=null&&(Zl(l)&&(l=qf(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Vu,"(() => {/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",Lu(e))for(var u=0;u<e.length;u++){o=e[u];var s=r+Kl(o,u);i+=wr(o,t,n,s,l)}else if(s=Xf(e),typeof s=="function")for(e=s.call(e),u=0;!(o=e.next()).done;)o=o.value,s=r+Kl(o,u++),i+=wr(o,t,n,s,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Sr(e,t,n){if(e==null)return e;var r=[],l=0;return wr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Zf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},Cr={transition:null},Jf={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:Cr,ReactCurrentOwner:Yl};function Bu(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:Sr,forEach:function(e,t,n){Sr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sr(e,function(){t++}),t},toArray:function(e){return Sr(e,function(t){return t})||[]},only:function(e){if(!Zl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=Qt;z.Fragment=Hf;z.Profiler=jf;z.PureComponent=Xl;z.StrictMode=Af;z.Suspense=Wf;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jf;z.act=Bu;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=$u({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Yl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)Hu.call(t,s)&&!Au.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&u!==void 0?u[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){u=Array(s);for(var a=0;a<s;a++)u[a]=arguments[a+2];r.children=u}return{$typeof:Rn,type:e.type,key:l,ref:o,props:r,_owner:i}};z.createContext=function(e){return e={$typeof:Uf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$typeof:Bf,_context:e},e.Consumer=e};z.createElement=ju;z.createFactory=function(e){var t=ju.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$typeof:Gf,render:e}};z.isValidElement=Zl;z.lazy=function(e){return{$typeof:Kf,_payload:{_status:-1,_result:e},_init:Zf}};z.memo=function(e,t){return{$typeof:Qf,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=Cr.transition;Cr.transition={};try{e()}finally{Cr.transition=t}};z.unstable_act=Bu;z.useCallback=function(e,t){return ue.current.useCallback(e,t)};z.useContext=function(e){return ue.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};z.useEffect=function(e,t){return ue.current.useEffect(e,t)};z.useId=function(){return ue.current.useId()};z.useImperativeHandle=function(e,t,n){return ue.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return ue.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return ue.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return ue.current.useMemo(e,t)};z.useReducer=function(e,t,n){return ue.current.useReducer(e,t,n)};z.useRef=function(e){return ue.current.useRef(e)};z.useState=function(e){return ue.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return ue.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return ue.current.useTransition()};z.version="18.3.1"});var _r=It((Zp,Gu)=>{"use strict";Gu.exports=Uu()});var es=It(D=>{"use strict";function to(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<Rr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function Le(e){return e.length===0?null:e[0]}function Er(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,u=e[i],s=i+1,a=e[s];if(0>Rr(u,n))s<l&&0>Rr(a,u)?(e[r]=a,e[s]=n,r=s):(e[r]=u,e[i]=n,r=i);else if(s<l&&0>Rr(a,n))e[r]=a,e[s]=n,r=s;else break e}}return t}function Rr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Wu=performance,D.unstable_now=function(){return Wu.now()}):(Jl=Date,Qu=Jl.now(),D.unstable_now=function(){return Jl.now()-Qu});var Wu,Jl,Qu,Be=[],ut=[],bf=1,xe=null,te=3,xr=!1,zt=!1,En=!1,qu=typeof setTimeout=="function"?setTimeout:null,Yu=typeof clearTimeout=="function"?clearTimeout:null,Ku=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function no(e){for(var t=Le(ut);t!==null;){if(t.callback===null)Er(ut);else if(t.startTime<=e)Er(ut),t.sortIndex=t.expirationTime,to(Be,t);else break;t=Le(ut)}}function ro(e){if(En=!1,no(e),!zt)if(Le(Be)!==null)zt=!0,oo(lo);else{var t=Le(ut);t!==null&&io(ro,t.startTime-e)}}function lo(e,t){zt=!1,En&&(En=!1,Yu(xn),xn=-1),xr=!0;var n=te;try{for(no(t),xe=Le(Be);xe!==null&&(!(xe.expirationTime>t)||e&&!bu());){var r=xe.callback;if(typeof r=="function"){xe.callback=null,te=xe.priorityLevel;var l=r(xe.expirationTime<=t);t=D.unstable_now(),typeof l=="function"?xe.callback=l:xe===Le(Be)&&Er(Be),no(t)}else Er(Be);xe=Le(Be)}if(xe!==null)var o=!0;else{var i=Le(ut);i!==null&&io(ro,i.startTime-t),o=!1}return o}finally{xe=null,te=n,xr=!1}}var Pr=!1,kr=null,xn=-1,Zu=5,Ju=-1;function bu(){return!(D.unstable_now()-Ju<Zu)}function bl(){if(kr!==null){var e=D.unstable_now();Ju=e;var t=!0;try{t=kr(!0,e)}finally{t?kn():(Pr=!1,kr=null)}}else Pr=!1}var kn;typeof Ku=="function"?kn=function(){Ku(bl)}:typeof MessageChannel!="undefined"?(eo=new MessageChannel,Xu=eo.port2,eo.port1.onmessage=bl,kn=function(){Xu.postMessage(null)}):kn=function(){qu(bl,0)};var eo,Xu;function oo(e){kr=e,Pr||(Pr=!0,kn())}function io(e,t){xn=qu(function(){e(D.unstable_now())},t)}D.unstable_IdlePriority=5;D.unstable_ImmediatePriority=1;D.unstable_LowPriority=4;D.unstable_NormalPriority=3;D.unstable_Profiling=null;D.unstable_UserBlockingPriority=2;D.unstable_cancelCallback=function(e){e.callback=null};D.unstable_continueExecution=function(){zt||xr||(zt=!0,oo(lo))};D.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Zu=0<e?Math.floor(1e3/e):5};D.unstable_getCurrentPriorityLevel=function(){return te};D.unstable_getFirstCallbackNode=function(){return Le(Be)};D.unstable_next=function(e){switch(te){case 1:case 2:case 3:var t=3;break;default:t=te}var n=te;te=t;try{return e()}finally{te=n}};D.unstable_pauseExecution=function(){};D.unstable_requestPaint=function(){};D.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=te;te=e;try{return t()}finally{te=n}};D.unstable_scheduleCallback=function(e,t,n){var r=D.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:bf++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,to(ut,e),Le(Be)===null&&e===Le(ut)&&(En?(Yu(xn),xn=-1):En=!0,io(ro,n-r))):(e.sortIndex=l,to(Be,e),zt||xr||(zt=!0,oo(lo))),e};D.unstable_shouldYield=bu;D.unstable_wrapCallback=function(e){var t=te;return function(){var n=te;te=t;try{return e.apply(this,arguments)}finally{te=n}}}});var ns=It((bp,ts)=>{"use strict";ts.exports=es()});var uf=It(Re=>{"use strict";var ed=_r(),Ce=ns();function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var aa=new Set,Xn={};function Gt(e,t){pn(e,t),pn(e+"Capture",t)}function pn(e,t){for(Xn[e]=t,e=0;e<t.length;e++)aa.add(t[e])}var be=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),Io=Object.prototype.hasOwnProperty,td=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,rs={},ls={};function nd(e){return Io.call(ls,e)?!0:Io.call(rs,e)?!1:td.test(e)?ls[e]=!0:(rs[e]=!0,!1)}function rd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ld(e,t,n,r){if(t===null||typeof t=="undefined"||rd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ce(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ee[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ee[t]=new ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ee[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ee[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ee[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ee[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ee[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ee[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ee[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var _i=/[\\-:]([a-z])/g;function Ri(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});ee.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ki(e,t,n,r){var l=ee.hasOwnProperty(t)?ee[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ld(t,n,l,r)&&(n=null),r||l===null?nd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var rt=ed.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fr=Symbol.for("react.element"),qt=Symbol.for("react.portal"),Yt=Symbol.for("react.fragment"),Ei=Symbol.for("react.strict_mode"),zo=Symbol.for("react.profiler"),ca=Symbol.for("react.provider"),fa=Symbol.for("react.context"),xi=Symbol.for("react.forward_ref"),No=Symbol.for("react.suspense"),Lo=Symbol.for("react.suspense_list"),Pi=Symbol.for("react.memo"),at=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var da=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var os=Symbol.iterator;function Pn(e){return e===null||typeof e!="object"?null:(e=os&&e[os]||e["@@iterator"],typeof e=="function"?e:null)}var G=Object.assign,uo;function Dn(e){if(uo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\\n( *(at )?)/);uo=t&&t[1]||""}return\`
\`+uo+e}var so=!1;function ao(e,t){if(!e||so)return"";so=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(a){var r=a}Reflect.construct(e,[],t)}else{try{t.call()}catch(a){r=a}e.call(t.prototype)}else{try{throw Error()}catch(a){r=a}e()}}catch(a){if(a&&r&&typeof a.stack=="string"){for(var l=a.stack.split(\`
\`),o=r.stack.split(\`
\`),i=l.length-1,u=o.length-1;1<=i&&0<=u&&l[i]!==o[u];)u--;for(;1<=i&&0<=u;i--,u--)if(l[i]!==o[u]){if(i!==1||u!==1)do if(i--,u--,0>u||l[i]!==o[u]){var s=\`
\`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=u);break}}}finally{so=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Dn(e):""}function od(e){switch(e.tag){case 5:return Dn(e.type);case 16:return Dn("Lazy");case 13:return Dn("Suspense");case 19:return Dn("SuspenseList");case 0:case 2:case 15:return e=ao(e.type,!1),e;case 11:return e=ao(e.type.render,!1),e;case 1:return e=ao(e.type,!0),e;default:return""}}function Vo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Yt:return"Fragment";case qt:return"Portal";case zo:return"Profiler";case Ei:return"StrictMode";case No:return"Suspense";case Lo:return"SuspenseList"}if(typeof e=="object")switch(e.$typeof){case fa:return(e.displayName||"Context")+".Consumer";case ca:return(e._context.displayName||"Context")+".Provider";case xi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pi:return t=e.displayName||null,t!==null?t:Vo(e.type)||"Memo";case at:t=e._payload,e=e._init;try{return Vo(e(t))}catch(n){}}return null}function id(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Vo(t);case 8:return t===Ei?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Rt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ga(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ud(e){var t=ga(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mr(e){e._valueTracker||(e._valueTracker=ud(e))}function pa(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ga(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function rl(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Do(e,t){var n=t.checked;return G({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function is(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Rt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ma(e,t){t=t.checked,t!=null&&ki(e,"checked",t,!1)}function $o(e,t){ma(e,t);var n=Rt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?To(e,t.type,n):t.hasOwnProperty("defaultValue")&&To(e,t.type,Rt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function us(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function To(e,t,n){(t!=="number"||rl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var $n=Array.isArray;function sn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Rt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Oo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(w(91));return G({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ss(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(w(92));if($n(n)){if(1<n.length)throw Error(w(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Rt(n)}}function ha(e,t){var n=Rt(t.value),r=Rt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function as(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function va(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ho(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?va(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ir,ya=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ir=Ir||document.createElement("div"),Ir.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ir.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Hn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},sd=["Webkit","ms","Moz","O"];Object.keys(Hn).forEach(function(e){sd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Hn[t]=Hn[e]})});function Sa(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Hn.hasOwnProperty(e)&&Hn[e]?(""+t).trim():t+"px"}function wa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Sa(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var ad=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ao(e,t){if(t){if(ad[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(w(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(w(61))}if(t.style!=null&&typeof t.style!="object")throw Error(w(62))}}function jo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bo=null;function Fi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Uo=null,an=null,cn=null;function cs(e){if(e=gr(e)){if(typeof Uo!="function")throw Error(w(280));var t=e.stateNode;t&&(t=zl(t),Uo(e.stateNode,e.type,t))}}function Ca(e){an?cn?cn.push(e):cn=[e]:an=e}function _a(){if(an){var e=an,t=cn;if(cn=an=null,cs(e),t)for(e=0;e<t.length;e++)cs(t[e])}}function Ra(e,t){return e(t)}function ka(){}var co=!1;function Ea(e,t,n){if(co)return e(t,n);co=!0;try{return Ra(e,t,n)}finally{co=!1,(an!==null||cn!==null)&&(ka(),_a())}}function Yn(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(w(231,t,typeof n));return n}var Go=!1;if(be)try{Kt={},Object.defineProperty(Kt,"passive",{get:function(){Go=!0}}),window.addEventListener("test",Kt,Kt),window.removeEventListener("test",Kt,Kt)}catch(e){Go=!1}var Kt;function cd(e,t,n,r,l,o,i,u,s){var a=Array.prototype.slice.call(arguments,3);try{t.apply(n,a)}catch(p){this.onError(p)}}var An=!1,ll=null,ol=!1,Wo=null,fd={onError:function(e){An=!0,ll=e}};function dd(e,t,n,r,l,o,i,u,s){An=!1,ll=null,cd.apply(fd,arguments)}function gd(e,t,n,r,l,o,i,u,s){if(dd.apply(this,arguments),An){if(An){var a=ll;An=!1,ll=null}else throw Error(w(198));ol||(ol=!0,Wo=a)}}function Wt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function xa(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function fs(e){if(Wt(e)!==e)throw Error(w(188))}function pd(e){var t=e.alternate;if(!t){if(t=Wt(e),t===null)throw Error(w(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return fs(l),e;if(o===r)return fs(l),t;o=o.sibling}throw Error(w(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,u=l.child;u;){if(u===n){i=!0,n=l,r=o;break}if(u===r){i=!0,r=l,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=l;break}if(u===r){i=!0,r=o,n=l;break}u=u.sibling}if(!i)throw Error(w(189))}}if(n.alternate!==r)throw Error(w(190))}if(n.tag!==3)throw Error(w(188));return n.stateNode.current===n?e:t}function Pa(e){return e=pd(e),e!==null?Fa(e):null}function Fa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fa(e);if(t!==null)return t;e=e.sibling}return null}var Ma=Ce.unstable_scheduleCallback,ds=Ce.unstable_cancelCallback,md=Ce.unstable_shouldYield,hd=Ce.unstable_requestPaint,Q=Ce.unstable_now,vd=Ce.unstable_getCurrentPriorityLevel,Mi=Ce.unstable_ImmediatePriority,Ia=Ce.unstable_UserBlockingPriority,il=Ce.unstable_NormalPriority,yd=Ce.unstable_LowPriority,za=Ce.unstable_IdlePriority,Pl=null,Qe=null;function Sd(e){if(Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(Pl,e,void 0,(e.current.flags&128)===128)}catch(t){}}var Oe=Math.clz32?Math.clz32:_d,wd=Math.log,Cd=Math.LN2;function _d(e){return e>>>=0,e===0?32:31-(wd(e)/Cd|0)|0}var zr=64,Nr=4194304;function Tn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ul(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~l;u!==0?r=Tn(u):(o&=i,o!==0&&(r=Tn(o)))}else i=n&~l,i!==0?r=Tn(i):o!==0&&(r=Tn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Oe(t),l=1<<n,r|=e[n],t&=~l;return r}function Rd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Oe(o),u=1<<i,s=l[i];s===-1?((u&n)===0||(u&r)!==0)&&(l[i]=Rd(u,t)):s<=t&&(e.expiredLanes|=u),o&=~u}}function Qo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Na(){var e=zr;return zr<<=1,(zr&4194240)===0&&(zr=64),e}function fo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Oe(t),e[t]=n}function Ed(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Oe(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Ii(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Oe(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var V=0;function La(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Va,zi,Da,$a,Ta,Ko=!1,Lr=[],mt=null,ht=null,vt=null,Zn=new Map,Jn=new Map,ft=[],xd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gs(e,t){switch(e){case"focusin":case"focusout":mt=null;break;case"dragenter":case"dragleave":ht=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":Zn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jn.delete(t.pointerId)}}function Fn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=gr(t),t!==null&&zi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Pd(e,t,n,r,l){switch(t){case"focusin":return mt=Fn(mt,e,t,n,r,l),!0;case"dragenter":return ht=Fn(ht,e,t,n,r,l),!0;case"mouseover":return vt=Fn(vt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Zn.set(o,Fn(Zn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Jn.set(o,Fn(Jn.get(o)||null,e,t,n,r,l)),!0}return!1}function Oa(e){var t=Vt(e.target);if(t!==null){var n=Wt(t);if(n!==null){if(t=n.tag,t===13){if(t=xa(n),t!==null){e.blockedOn=t,Ta(e.priority,function(){Da(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Xo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Bo=r,n.target.dispatchEvent(r),Bo=null}else return t=gr(n),t!==null&&zi(t),e.blockedOn=n,!1;t.shift()}return!0}function ps(e,t,n){Kr(e)&&n.delete(t)}function Fd(){Ko=!1,mt!==null&&Kr(mt)&&(mt=null),ht!==null&&Kr(ht)&&(ht=null),vt!==null&&Kr(vt)&&(vt=null),Zn.forEach(ps),Jn.forEach(ps)}function Mn(e,t){e.blockedOn===t&&(e.blockedOn=null,Ko||(Ko=!0,Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority,Fd)))}function bn(e){function t(l){return Mn(l,e)}if(0<Lr.length){Mn(Lr[0],e);for(var n=1;n<Lr.length;n++){var r=Lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(mt!==null&&Mn(mt,e),ht!==null&&Mn(ht,e),vt!==null&&Mn(vt,e),Zn.forEach(t),Jn.forEach(t),n=0;n<ft.length;n++)r=ft[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&(n=ft[0],n.blockedOn===null);)Oa(n),n.blockedOn===null&&ft.shift()}var fn=rt.ReactCurrentBatchConfig,sl=!0;function Md(e,t,n,r){var l=V,o=fn.transition;fn.transition=null;try{V=1,Ni(e,t,n,r)}finally{V=l,fn.transition=o}}function Id(e,t,n,r){var l=V,o=fn.transition;fn.transition=null;try{V=4,Ni(e,t,n,r)}finally{V=l,fn.transition=o}}function Ni(e,t,n,r){if(sl){var l=Xo(e,t,n,r);if(l===null)So(e,t,r,al,n),gs(e,r);else if(Pd(l,e,t,n,r))r.stopPropagation();else if(gs(e,r),t&4&&-1<xd.indexOf(e)){for(;l!==null;){var o=gr(l);if(o!==null&&Va(o),o=Xo(e,t,n,r),o===null&&So(e,t,r,al,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else So(e,t,r,null,n)}}var al=null;function Xo(e,t,n,r){if(al=null,e=Fi(r),e=Vt(e),e!==null)if(t=Wt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=xa(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return al=e,null}function Ha(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vd()){case Mi:return 1;case Ia:return 4;case il:case yd:return 16;case za:return 536870912;default:return 16}default:return 16}}var gt=null,Li=null,Xr=null;function Aa(){if(Xr)return Xr;var e,t=Li,n=t.length,r,l="value"in gt?gt.value:gt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Xr=l.slice(e,1<r?1-r:void 0)}function qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function ms(){return!1}function _e(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(o):o[u]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vr:ms,this.isPropagationStopped=ms,this}return G(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vi=_e(Cn),dr=G({},Cn,{view:0,detail:0}),zd=_e(dr),go,po,In,Fl=G({},dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Di,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==In&&(In&&e.type==="mousemove"?(go=e.screenX-In.screenX,po=e.screenY-In.screenY):po=go=0,In=e),go)},movementY:function(e){return"movementY"in e?e.movementY:po}}),hs=_e(Fl),Nd=G({},Fl,{dataTransfer:0}),Ld=_e(Nd),Vd=G({},dr,{relatedTarget:0}),mo=_e(Vd),Dd=G({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0}),$d=_e(Dd),Td=G({},Cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Od=_e(Td),Hd=G({},Cn,{data:0}),vs=_e(Hd),Ad={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ud(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bd[e])?!!t[e]:!1}function Di(){return Ud}var Gd=G({},dr,{key:function(e){if(e.key){var t=Ad[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Di,charCode:function(e){return e.type==="keypress"?qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wd=_e(Gd),Qd=G({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ys=_e(Qd),Kd=G({},dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Di}),Xd=_e(Kd),qd=G({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yd=_e(qd),Zd=G({},Fl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Jd=_e(Zd),bd=[9,13,27,32],$i=be&&"CompositionEvent"in window,jn=null;be&&"documentMode"in document&&(jn=document.documentMode);var eg=be&&"TextEvent"in window&&!jn,ja=be&&(!$i||jn&&8<jn&&11>=jn),Ss=" ",ws=!1;function Ba(e,t){switch(e){case"keyup":return bd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ua(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zt=!1;function tg(e,t){switch(e){case"compositionend":return Ua(t);case"keypress":return t.which!==32?null:(ws=!0,Ss);case"textInput":return e=t.data,e===Ss&&ws?null:e;default:return null}}function ng(e,t){if(Zt)return e==="compositionend"||!$i&&Ba(e,t)?(e=Aa(),Xr=Li=gt=null,Zt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ja&&t.locale!=="ko"?null:t.data;default:return null}}var rg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!rg[e.type]:t==="textarea"}function Ga(e,t,n,r){Ca(r),t=cl(t,"onChange"),0<t.length&&(n=new Vi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Bn=null,er=null;function lg(e){tc(e,0)}function Ml(e){var t=en(e);if(pa(t))return e}function og(e,t){if(e==="change")return t}var Wa=!1;be&&(be?($r="oninput"in document,$r||(ho=document.createElement("div"),ho.setAttribute("oninput","return;"),$r=typeof ho.oninput=="function"),Dr=$r):Dr=!1,Wa=Dr&&(!document.documentMode||9<document.documentMode));var Dr,$r,ho;function _s(){Bn&&(Bn.detachEvent("onpropertychange",Qa),er=Bn=null)}function Qa(e){if(e.propertyName==="value"&&Ml(er)){var t=[];Ga(t,er,e,Fi(e)),Ea(lg,t)}}function ig(e,t,n){e==="focusin"?(_s(),Bn=t,er=n,Bn.attachEvent("onpropertychange",Qa)):e==="focusout"&&_s()}function ug(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ml(er)}function sg(e,t){if(e==="click")return Ml(t)}function ag(e,t){if(e==="input"||e==="change")return Ml(t)}function cg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ae=typeof Object.is=="function"?Object.is:cg;function tr(e,t){if(Ae(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Io.call(t,l)||!Ae(e[l],t[l]))return!1}return!0}function Rs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ks(e,t){var n=Rs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Rs(n)}}function Ka(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ka(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xa(){for(var e=window,t=rl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch(r){n=!1}if(n)e=t.contentWindow;else break;t=rl(e.document)}return t}function Ti(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function fg(e){var t=Xa(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ka(n.ownerDocument.documentElement,n)){if(r!==null&&Ti(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=ks(n,o);var i=ks(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var dg=be&&"documentMode"in document&&11>=document.documentMode,Jt=null,qo=null,Un=null,Yo=!1;function Es(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Yo||Jt==null||Jt!==rl(r)||(r=Jt,"selectionStart"in r&&Ti(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Un&&tr(Un,r)||(Un=r,r=cl(qo,"onSelect"),0<r.length&&(t=new Vi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Jt)))}function Tr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var bt={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionend:Tr("Transition","TransitionEnd")},vo={},qa={};be&&(qa=document.createElement("div").style,"AnimationEvent"in window||(delete bt.animationend.animation,delete bt.animationiteration.animation,delete bt.animationstart.animation),"TransitionEvent"in window||delete bt.transitionend.transition);function Il(e){if(vo[e])return vo[e];if(!bt[e])return e;var t=bt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qa)return vo[e]=t[n];return e}var Ya=Il("animationend"),Za=Il("animationiteration"),Ja=Il("animationstart"),ba=Il("transitionend"),ec=new Map,xs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Et(e,t){ec.set(e,t),Gt(t,[e])}for(Or=0;Or<xs.length;Or++)Hr=xs[Or],Ps=Hr.toLowerCase(),Fs=Hr[0].toUpperCase()+Hr.slice(1),Et(Ps,"on"+Fs);var Hr,Ps,Fs,Or;Et(Ya,"onAnimationEnd");Et(Za,"onAnimationIteration");Et(Ja,"onAnimationStart");Et("dblclick","onDoubleClick");Et("focusin","onFocus");Et("focusout","onBlur");Et(ba,"onTransitionEnd");pn("onMouseEnter",["mouseout","mouseover"]);pn("onMouseLeave",["mouseout","mouseover"]);pn("onPointerEnter",["pointerout","pointerover"]);pn("onPointerLeave",["pointerout","pointerover"]);Gt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Gt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Gt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Gt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Gt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Gt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var On="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gg=new Set("cancel close invalid load scroll toggle".split(" ").concat(On));function Ms(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,gd(r,t,void 0,e),e.currentTarget=null}function tc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],s=u.instance,a=u.currentTarget;if(u=u.listener,s!==o&&l.isPropagationStopped())break e;Ms(l,u,a),o=s}else for(i=0;i<r.length;i++){if(u=r[i],s=u.instance,a=u.currentTarget,u=u.listener,s!==o&&l.isPropagationStopped())break e;Ms(l,u,a),o=s}}}if(ol)throw e=Wo,ol=!1,Wo=null,e}function O(e,t){var n=t[ti];n===void 0&&(n=t[ti]=new Set);var r=e+"__bubble";n.has(r)||(nc(t,e,2,!1),n.add(r))}function yo(e,t,n){var r=0;t&&(r|=4),nc(n,e,r,t)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function nr(e){if(!e[Ar]){e[Ar]=!0,aa.forEach(function(n){n!=="selectionchange"&&(gg.has(n)||yo(n,!1,e),yo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ar]||(t[Ar]=!0,yo("selectionchange",!1,t))}}function nc(e,t,n,r){switch(Ha(t)){case 1:var l=Md;break;case 4:l=Id;break;default:l=Ni}n=l.bind(null,t,n,e),l=void 0,!Go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function So(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;u!==null;){if(i=Vt(u),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}u=u.parentNode}}r=r.return}Ea(function(){var a=o,p=Fi(n),h=[];e:{var d=ec.get(e);if(d!==void 0){var c=Vi,v=e;switch(e){case"keypress":if(qr(n)===0)break e;case"keydown":case"keyup":c=Wd;break;case"focusin":v="focus",c=mo;break;case"focusout":v="blur",c=mo;break;case"beforeblur":case"afterblur":c=mo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=hs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=Ld;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=Xd;break;case Ya:case Za:case Ja:c=$d;break;case ba:c=Yd;break;case"scroll":c=zd;break;case"wheel":c=Jd;break;case"copy":case"cut":case"paste":c=Od;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=ys}var y=(t&4)!==0,k=!y&&e==="scroll",g=y?d!==null?d+"Capture":null:d;y=[];for(var f=a,m;f!==null;){m=f;var S=m.stateNode;if(m.tag===5&&S!==null&&(m=S,g!==null&&(S=Yn(f,g),S!=null&&y.push(rr(f,S,m)))),k)break;f=f.return}0<y.length&&(d=new c(d,v,null,n,p),h.push({event:d,listeners:y}))}}if((t&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",c=e==="mouseout"||e==="pointerout",d&&n!==Bo&&(v=n.relatedTarget||n.fromElement)&&(Vt(v)||v[et]))break e;if((c||d)&&(d=p.window===p?p:(d=p.ownerDocument)?d.defaultView||d.parentWindow:window,c?(v=n.relatedTarget||n.toElement,c=a,v=v?Vt(v):null,v!==null&&(k=Wt(v),v!==k||v.tag!==5&&v.tag!==6)&&(v=null)):(c=null,v=a),c!==v)){if(y=hs,S="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(y=ys,S="onPointerLeave",g="onPointerEnter",f="pointer"),k=c==null?d:en(c),m=v==null?d:en(v),d=new y(S,f+"leave",c,n,p),d.target=k,d.relatedTarget=m,S=null,Vt(p)===a&&(y=new y(g,f+"enter",v,n,p),y.target=m,y.relatedTarget=k,S=y),k=S,c&&v)t:{for(y=c,g=v,f=0,m=y;m;m=Xt(m))f++;for(m=0,S=g;S;S=Xt(S))m++;for(;0<f-m;)y=Xt(y),f--;for(;0<m-f;)g=Xt(g),m--;for(;f--;){if(y===g||g!==null&&y===g.alternate)break t;y=Xt(y),g=Xt(g)}y=null}else y=null;c!==null&&Is(h,d,c,y,!1),v!==null&&k!==null&&Is(h,k,v,y,!0)}}e:{if(d=a?en(a):window,c=d.nodeName&&d.nodeName.toLowerCase(),c==="select"||c==="input"&&d.type==="file")var C=og;else if(Cs(d))if(Wa)C=ag;else{C=ug;var E=ig}else(c=d.nodeName)&&c.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(C=sg);if(C&&(C=C(e,a))){Ga(h,C,n,p);break e}E&&E(e,d,a),e==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&To(d,"number",d.value)}switch(E=a?en(a):window,e){case"focusin":(Cs(E)||E.contentEditable==="true")&&(Jt=E,qo=a,Un=null);break;case"focusout":Un=qo=Jt=null;break;case"mousedown":Yo=!0;break;case"contextmenu":case"mouseup":case"dragend":Yo=!1,Es(h,n,p);break;case"selectionchange":if(dg)break;case"keydown":case"keyup":Es(h,n,p)}var _;if($i)e:{switch(e){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else Zt?Ba(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(ja&&n.locale!=="ko"&&(Zt||x!=="onCompositionStart"?x==="onCompositionEnd"&&Zt&&(_=Aa()):(gt=p,Li="value"in gt?gt.value:gt.textContent,Zt=!0)),E=cl(a,x),0<E.length&&(x=new vs(x,e,null,n,p),h.push({event:x,listeners:E}),_?x.data=_:(_=Ua(n),_!==null&&(x.data=_)))),(_=eg?tg(e,n):ng(e,n))&&(a=cl(a,"onBeforeInput"),0<a.length&&(p=new vs("onBeforeInput","beforeinput",null,n,p),h.push({event:p,listeners:a}),p.data=_))}tc(h,t)})}function rr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function cl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Yn(e,n),o!=null&&r.unshift(rr(e,o,l)),o=Yn(e,t),o!=null&&r.push(rr(e,o,l))),e=e.return}return r}function Xt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Is(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var u=n,s=u.alternate,a=u.stateNode;if(s!==null&&s===r)break;u.tag===5&&a!==null&&(u=a,l?(s=Yn(n,o),s!=null&&i.unshift(rr(n,s,u))):l||(s=Yn(n,o),s!=null&&i.push(rr(n,s,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var pg=/\\r\\n?/g,mg=/\\u0000|\\uFFFD/g;function zs(e){return(typeof e=="string"?e:""+e).replace(pg,\`
\`).replace(mg,"")}function jr(e,t,n){if(t=zs(t),zs(e)!==t&&n)throw Error(w(425))}function fl(){}var Zo=null,Jo=null;function bo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ei=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,Ns=typeof Promise=="function"?Promise:void 0,vg=typeof queueMicrotask=="function"?queueMicrotask:typeof Ns!="undefined"?function(e){return Ns.resolve(null).then(e).catch(yg)}:ei;function yg(e){setTimeout(function(){throw e})}function wo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),bn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);bn(t)}function yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ls(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _n=Math.random().toString(36).slice(2),We="__reactFiber$"+_n,lr="__reactProps$"+_n,et="__reactContainer$"+_n,ti="__reactEvents$"+_n,Sg="__reactListeners$"+_n,wg="__reactHandles$"+_n;function Vt(e){var t=e[We];if(t)return t;for(var n=e.parentNode;n;){if(t=n[et]||n[We]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ls(e);e!==null;){if(n=e[We])return n;e=Ls(e)}return t}e=n,n=e.parentNode}return null}function gr(e){return e=e[We]||e[et],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function en(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function zl(e){return e[lr]||null}var ni=[],tn=-1;function xt(e){return{current:e}}function H(e){0>tn||(e.current=ni[tn],ni[tn]=null,tn--)}function $(e,t){tn++,ni[tn]=e.current,e.current=t}var kt={},oe=xt(kt),ge=xt(!1),Ht=kt;function mn(e,t){var n=e.type.contextTypes;if(!n)return kt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function pe(e){return e=e.childContextTypes,e!=null}function dl(){H(ge),H(oe)}function Vs(e,t,n){if(oe.current!==kt)throw Error(w(168));$(oe,t),$(ge,n)}function rc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(w(108,id(e)||"Unknown",l));return G({},n,r)}function gl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||kt,Ht=oe.current,$(oe,e),$(ge,ge.current),!0}function Ds(e,t,n){var r=e.stateNode;if(!r)throw Error(w(169));n?(e=rc(e,t,Ht),r.__reactInternalMemoizedMergedChildContext=e,H(ge),H(oe),$(oe,e)):H(ge),$(ge,n)}var qe=null,Nl=!1,Co=!1;function lc(e){qe===null?qe=[e]:qe.push(e)}function Cg(e){Nl=!0,lc(e)}function Pt(){if(!Co&&qe!==null){Co=!0;var e=0,t=V;try{var n=qe;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}qe=null,Nl=!1}catch(l){throw qe!==null&&(qe=qe.slice(e+1)),Ma(Mi,Pt),l}finally{V=t,Co=!1}}return null}var nn=[],rn=0,pl=null,ml=0,Pe=[],Fe=0,At=null,Ye=1,Ze="";function Nt(e,t){nn[rn++]=ml,nn[rn++]=pl,pl=e,ml=t}function oc(e,t,n){Pe[Fe++]=Ye,Pe[Fe++]=Ze,Pe[Fe++]=At,At=e;var r=Ye;e=Ze;var l=32-Oe(r)-1;r&=~(1<<l),n+=1;var o=32-Oe(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Ye=1<<32-Oe(t)+l|n<<l|r,Ze=o+e}else Ye=1<<o|n<<l|r,Ze=e}function Oi(e){e.return!==null&&(Nt(e,1),oc(e,1,0))}function Hi(e){for(;e===pl;)pl=nn[--rn],nn[rn]=null,ml=nn[--rn],nn[rn]=null;for(;e===At;)At=Pe[--Fe],Pe[Fe]=null,Ze=Pe[--Fe],Pe[Fe]=null,Ye=Pe[--Fe],Pe[Fe]=null}var we=null,Se=null,j=!1,Te=null;function ic(e,t){var n=Me(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function $s(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,Se=yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,Se=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=At!==null?{id:Ye,overflow:Ze}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Me(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,Se=null,!0):!1;default:return!1}}function ri(e){return(e.mode&1)!==0&&(e.flags&128)===0}function li(e){if(j){var t=Se;if(t){var n=t;if(!$s(e,t)){if(ri(e))throw Error(w(418));t=yt(n.nextSibling);var r=we;t&&$s(e,t)?ic(r,n):(e.flags=e.flags&-4097|2,j=!1,we=e)}}else{if(ri(e))throw Error(w(418));e.flags=e.flags&-4097|2,j=!1,we=e}}}function Ts(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Br(e){if(e!==we)return!1;if(!j)return Ts(e),j=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!bo(e.type,e.memoizedProps)),t&&(t=Se)){if(ri(e))throw uc(),Error(w(418));for(;t;)ic(e,t),t=yt(t.nextSibling)}if(Ts(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Se=yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Se=null}}else Se=we?yt(e.stateNode.nextSibling):null;return!0}function uc(){for(var e=Se;e;)e=yt(e.nextSibling)}function hn(){Se=we=null,j=!1}function Ai(e){Te===null?Te=[e]:Te.push(e)}var _g=rt.ReactCurrentBatchConfig;function zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(w(309));var r=n.stateNode}if(!r)throw Error(w(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var u=l.refs;i===null?delete u[o]:u[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(w(284));if(!n._owner)throw Error(w(290,e))}return e}function Ur(e,t){throw e=Object.prototype.toString.call(t),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Os(e){var t=e._init;return t(e._payload)}function sc(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function n(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function r(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function l(g,f){return g=_t(g,f),g.index=0,g.sibling=null,g}function o(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function i(g){return e&&g.alternate===null&&(g.flags|=2),g}function u(g,f,m,S){return f===null||f.tag!==6?(f=Fo(m,g.mode,S),f.return=g,f):(f=l(f,m),f.return=g,f)}function s(g,f,m,S){var C=m.type;return C===Yt?p(g,f,m.props.children,S,m.key):f!==null&&(f.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===at&&Os(C)===f.type)?(S=l(f,m.props),S.ref=zn(g,f,m),S.return=g,S):(S=nl(m.type,m.key,m.props,null,g.mode,S),S.ref=zn(g,f,m),S.return=g,S)}function a(g,f,m,S){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=Mo(m,g.mode,S),f.return=g,f):(f=l(f,m.children||[]),f.return=g,f)}function p(g,f,m,S,C){return f===null||f.tag!==7?(f=Ot(m,g.mode,S,C),f.return=g,f):(f=l(f,m),f.return=g,f)}function h(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Fo(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$typeof){case Fr:return m=nl(f.type,f.key,f.props,null,g.mode,m),m.ref=zn(g,null,f),m.return=g,m;case qt:return f=Mo(f,g.mode,m),f.return=g,f;case at:var S=f._init;return h(g,S(f._payload),m)}if($n(f)||Pn(f))return f=Ot(f,g.mode,m,null),f.return=g,f;Ur(g,f)}return null}function d(g,f,m,S){var C=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return C!==null?null:u(g,f,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$typeof){case Fr:return m.key===C?s(g,f,m,S):null;case qt:return m.key===C?a(g,f,m,S):null;case at:return C=m._init,d(g,f,C(m._payload),S)}if($n(m)||Pn(m))return C!==null?null:p(g,f,m,S,null);Ur(g,m)}return null}function c(g,f,m,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(m)||null,u(f,g,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$typeof){case Fr:return g=g.get(S.key===null?m:S.key)||null,s(f,g,S,C);case qt:return g=g.get(S.key===null?m:S.key)||null,a(f,g,S,C);case at:var E=S._init;return c(g,f,m,E(S._payload),C)}if($n(S)||Pn(S))return g=g.get(m)||null,p(f,g,S,C,null);Ur(f,S)}return null}function v(g,f,m,S){for(var C=null,E=null,_=f,x=f=0,A=null;_!==null&&x<m.length;x++){_.index>x?(A=_,_=null):A=_.sibling;var N=d(g,_,m[x],S);if(N===null){_===null&&(_=A);break}e&&_&&N.alternate===null&&t(g,_),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N,_=A}if(x===m.length)return n(g,_),j&&Nt(g,x),C;if(_===null){for(;x<m.length;x++)_=h(g,m[x],S),_!==null&&(f=o(_,f,x),E===null?C=_:E.sibling=_,E=_);return j&&Nt(g,x),C}for(_=r(g,_);x<m.length;x++)A=c(_,g,x,m[x],S),A!==null&&(e&&A.alternate!==null&&_.delete(A.key===null?x:A.key),f=o(A,f,x),E===null?C=A:E.sibling=A,E=A);return e&&_.forEach(function(M){return t(g,M)}),j&&Nt(g,x),C}function y(g,f,m,S){var C=Pn(m);if(typeof C!="function")throw Error(w(150));if(m=C.call(m),m==null)throw Error(w(151));for(var E=C=null,_=f,x=f=0,A=null,N=m.next();_!==null&&!N.done;x++,N=m.next()){_.index>x?(A=_,_=null):A=_.sibling;var M=d(g,_,N.value,S);if(M===null){_===null&&(_=A);break}e&&_&&M.alternate===null&&t(g,_),f=o(M,f,x),E===null?C=M:E.sibling=M,E=M,_=A}if(N.done)return n(g,_),j&&Nt(g,x),C;if(_===null){for(;!N.done;x++,N=m.next())N=h(g,N.value,S),N!==null&&(f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return j&&Nt(g,x),C}for(_=r(g,_);!N.done;x++,N=m.next())N=c(_,g,x,N.value,S),N!==null&&(e&&N.alternate!==null&&_.delete(N.key===null?x:N.key),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return e&&_.forEach(function(T){return t(g,T)}),j&&Nt(g,x),C}function k(g,f,m,S){if(typeof m=="object"&&m!==null&&m.type===Yt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$typeof){case Fr:e:{for(var C=m.key,E=f;E!==null;){if(E.key===C){if(C=m.type,C===Yt){if(E.tag===7){n(g,E.sibling),f=l(E,m.props.children),f.return=g,g=f;break e}}else if(E.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===at&&Os(C)===E.type){n(g,E.sibling),f=l(E,m.props),f.ref=zn(g,E,m),f.return=g,g=f;break e}n(g,E);break}else t(g,E);E=E.sibling}m.type===Yt?(f=Ot(m.props.children,g.mode,S,m.key),f.return=g,g=f):(S=nl(m.type,m.key,m.props,null,g.mode,S),S.ref=zn(g,f,m),S.return=g,g=S)}return i(g);case qt:e:{for(E=m.key;f!==null;){if(f.key===E)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(g,f.sibling),f=l(f,m.children||[]),f.return=g,g=f;break e}else{n(g,f);break}else t(g,f);f=f.sibling}f=Mo(m,g.mode,S),f.return=g,g=f}return i(g);case at:return E=m._init,k(g,f,E(m._payload),S)}if($n(m))return v(g,f,m,S);if(Pn(m))return y(g,f,m,S);Ur(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(g,f.sibling),f=l(f,m),f.return=g,g=f):(n(g,f),f=Fo(m,g.mode,S),f.return=g,g=f),i(g)):n(g,f)}return k}var vn=sc(!0),ac=sc(!1),hl=xt(null),vl=null,ln=null,ji=null;function Bi(){ji=ln=vl=null}function Ui(e){var t=hl.current;H(hl),e._currentValue=t}function oi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function dn(e,t){vl=e,ji=ln=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(de=!0),e.firstContext=null)}function ze(e){var t=e._currentValue;if(ji!==e)if(e={context:e,memoizedValue:t,next:null},ln===null){if(vl===null)throw Error(w(308));ln=e,vl.dependencies={lanes:0,firstContext:e}}else ln=ln.next=e;return t}var Dt=null;function Gi(e){Dt===null?Dt=[e]:Dt.push(e)}function cc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Gi(t)):(n.next=l.next,l.next=n),t.interleaved=n,tt(e,r)}function tt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ct=!1;function Wi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Je(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function St(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(L&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,tt(e,n)}return l=r.interleaved,l===null?(t.next=t,Gi(r)):(t.next=l.next,l.next=t),r.interleaved=t,tt(e,n)}function Yr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ii(e,n)}}function Hs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function yl(e,t,n,r){var l=e.updateQueue;ct=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var s=u,a=s.next;s.next=null,i===null?o=a:i.next=a,i=s;var p=e.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==i&&(u===null?p.firstBaseUpdate=a:u.next=a,p.lastBaseUpdate=s))}if(o!==null){var h=l.baseState;i=0,p=a=s=null,u=o;do{var d=u.lane,c=u.eventTime;if((r&d)===d){p!==null&&(p=p.next={eventTime:c,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var v=e,y=u;switch(d=t,c=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){h=v.call(c,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,d=typeof v=="function"?v.call(c,h,d):v,d==null)break e;h=G({},h,d);break e;case 2:ct=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,d=l.effects,d===null?l.effects=[u]:d.push(u))}else c={eventTime:c,lane:d,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(a=p=c,s=h):p=p.next=c,i|=d;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;d=u,u=d.next,d.next=null,l.lastBaseUpdate=d,l.shared.pending=null}}while(!0);if(p===null&&(s=h),l.baseState=s,l.firstBaseUpdate=a,l.lastBaseUpdate=p,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);Bt|=i,e.lanes=i,e.memoizedState=h}}function As(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(w(191,l));l.call(r)}}}var pr={},Ke=xt(pr),or=xt(pr),ir=xt(pr);function $t(e){if(e===pr)throw Error(w(174));return e}function Qi(e,t){switch($(ir,t),$(or,e),$(Ke,pr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ho(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ho(t,e)}H(Ke),$(Ke,t)}function yn(){H(Ke),H(or),H(ir)}function dc(e){$t(ir.current);var t=$t(Ke.current),n=Ho(t,e.type);t!==n&&($(or,e),$(Ke,n))}function Ki(e){or.current===e&&(H(Ke),H(or))}var B=xt(0);function Sl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=[];function Xi(){for(var e=0;e<_o.length;e++)_o[e]._workInProgressVersionPrimary=null;_o.length=0}var Zr=rt.ReactCurrentDispatcher,Ro=rt.ReactCurrentBatchConfig,jt=0,U=null,X=null,Y=null,wl=!1,Gn=!1,ur=0,Rg=0;function ne(){throw Error(w(321))}function qi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ae(e[n],t[n]))return!1;return!0}function Yi(e,t,n,r,l,o){if(jt=o,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Zr.current=e===null||e.memoizedState===null?Pg:Fg,e=n(r,l),Gn){o=0;do{if(Gn=!1,ur=0,25<=o)throw Error(w(301));o+=1,Y=X=null,t.updateQueue=null,Zr.current=Mg,e=n(r,l)}while(Gn)}if(Zr.current=Cl,t=X!==null&&X.next!==null,jt=0,Y=X=U=null,wl=!1,t)throw Error(w(300));return e}function Zi(){var e=ur!==0;return ur=0,e}function Ge(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Y===null?U.memoizedState=Y=e:Y=Y.next=e,Y}function Ne(){if(X===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=Y===null?U.memoizedState:Y.next;if(t!==null)Y=t,X=e;else{if(e===null)throw Error(w(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},Y===null?U.memoizedState=Y=e:Y=Y.next=e}return Y}function sr(e,t){return typeof t=="function"?t(e):t}function ko(e){var t=Ne(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=X,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var u=i=null,s=null,a=o;do{var p=a.lane;if((jt&p)===p)s!==null&&(s=s.next={lane:0,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null}),r=a.hasEagerState?a.eagerState:e(r,a.action);else{var h={lane:p,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null};s===null?(u=s=h,i=r):s=s.next=h,U.lanes|=p,Bt|=p}a=a.next}while(a!==null&&a!==o);s===null?i=r:s.next=u,Ae(r,t.memoizedState)||(de=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,U.lanes|=o,Bt|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Eo(e){var t=Ne(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Ae(o,t.memoizedState)||(de=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function gc(){}function pc(e,t){var n=U,r=Ne(),l=t(),o=!Ae(r.memoizedState,l);if(o&&(r.memoizedState=l,de=!0),r=r.queue,Ji(vc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Y!==null&&Y.memoizedState.tag&1){if(n.flags|=2048,ar(9,hc.bind(null,n,r,l,t),void 0,null),Z===null)throw Error(w(349));(jt&30)!==0||mc(n,t,l)}return l}function mc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hc(e,t,n,r){t.value=n,t.getSnapshot=r,yc(t)&&Sc(e)}function vc(e,t,n){return n(function(){yc(t)&&Sc(e)})}function yc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ae(e,n)}catch(r){return!0}}function Sc(e){var t=tt(e,1);t!==null&&He(t,e,1,-1)}function js(e){var t=Ge();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sr,lastRenderedState:e},t.queue=e,e=e.dispatch=xg.bind(null,U,e),[t.memoizedState,e]}function ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wc(){return Ne().memoizedState}function Jr(e,t,n,r){var l=Ge();U.flags|=e,l.memoizedState=ar(1|t,n,void 0,r===void 0?null:r)}function Ll(e,t,n,r){var l=Ne();r=r===void 0?null:r;var o=void 0;if(X!==null){var i=X.memoizedState;if(o=i.destroy,r!==null&&qi(r,i.deps)){l.memoizedState=ar(t,n,o,r);return}}U.flags|=e,l.memoizedState=ar(1|t,n,o,r)}function Bs(e,t){return Jr(8390656,8,e,t)}function Ji(e,t){return Ll(2048,8,e,t)}function Cc(e,t){return Ll(4,2,e,t)}function _c(e,t){return Ll(4,4,e,t)}function Rc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function kc(e,t,n){return n=n!=null?n.concat([e]):null,Ll(4,4,Rc.bind(null,t,e),n)}function bi(){}function Ec(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xc(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Pc(e,t,n){return(jt&21)===0?(e.baseState&&(e.baseState=!1,de=!0),e.memoizedState=n):(Ae(n,t)||(n=Na(),U.lanes|=n,Bt|=n,e.baseState=!0),t)}function kg(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=Ro.transition;Ro.transition={};try{e(!1),t()}finally{V=n,Ro.transition=r}}function Fc(){return Ne().memoizedState}function Eg(e,t,n){var r=Ct(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Mc(e))Ic(t,n);else if(n=cc(e,t,n,r),n!==null){var l=ae();He(n,e,r,l),zc(n,t,r)}}function xg(e,t,n){var r=Ct(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mc(e))Ic(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,u=o(i,n);if(l.hasEagerState=!0,l.eagerState=u,Ae(u,i)){var s=t.interleaved;s===null?(l.next=l,Gi(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch(a){}finally{}n=cc(e,t,l,r),n!==null&&(l=ae(),He(n,e,r,l),zc(n,t,r))}}function Mc(e){var t=e.alternate;return e===U||t!==null&&t===U}function Ic(e,t){Gn=wl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function zc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ii(e,n)}}var Cl={readContext:ze,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},Pg={readContext:ze,useCallback:function(e,t){return Ge().memoizedState=[e,t===void 0?null:t],e},useContext:ze,useEffect:Bs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4194308,4,Rc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jr(4,2,e,t)},useMemo:function(e,t){var n=Ge();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ge();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Eg.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Ge();return e={current:e},t.memoizedState=e},useState:js,useDebugValue:bi,useDeferredValue:function(e){return Ge().memoizedState=e},useTransition:function(){var e=js(!1),t=e[0];return e=kg.bind(null,e[1]),Ge().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=U,l=Ge();if(j){if(n===void 0)throw Error(w(407));n=n()}else{if(n=t(),Z===null)throw Error(w(349));(jt&30)!==0||mc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Bs(vc.bind(null,r,o,e),[e]),r.flags|=2048,ar(9,hc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ge(),t=Z.identifierPrefix;if(j){var n=Ze,r=Ye;n=(r&~(1<<32-Oe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ur++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Rg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Fg={readContext:ze,useCallback:Ec,useContext:ze,useEffect:Ji,useImperativeHandle:kc,useInsertionEffect:Cc,useLayoutEffect:_c,useMemo:xc,useReducer:ko,useRef:wc,useState:function(){return ko(sr)},useDebugValue:bi,useDeferredValue:function(e){var t=Ne();return Pc(t,X.memoizedState,e)},useTransition:function(){var e=ko(sr)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:pc,useId:Fc,unstable_isNewReconciler:!1},Mg={readContext:ze,useCallback:Ec,useContext:ze,useEffect:Ji,useImperativeHandle:kc,useInsertionEffect:Cc,useLayoutEffect:_c,useMemo:xc,useReducer:Eo,useRef:wc,useState:function(){return Eo(sr)},useDebugValue:bi,useDeferredValue:function(e){var t=Ne();return X===null?t.memoizedState=e:Pc(t,X.memoizedState,e)},useTransition:function(){var e=Eo(sr)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:pc,useId:Fc,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=G({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ii(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:G({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vl={isMounted:function(e){return(e=e._reactInternals)?Wt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ae(),l=Ct(e),o=Je(r,l);o.payload=t,n!=null&&(o.callback=n),t=St(e,o,l),t!==null&&(He(t,e,l,r),Yr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ae(),l=Ct(e),o=Je(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=St(e,o,l),t!==null&&(He(t,e,l,r),Yr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ae(),r=Ct(e),l=Je(n,r);l.tag=2,t!=null&&(l.callback=t),t=St(e,l,r),t!==null&&(He(t,e,r,n),Yr(t,e,r))}};function Us(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!tr(n,r)||!tr(l,o):!0}function Nc(e,t,n){var r=!1,l=kt,o=t.contextType;return typeof o=="object"&&o!==null?o=ze(o):(l=pe(t)?Ht:oe.current,r=t.contextTypes,o=(r=r!=null)?mn(e,l):kt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Vl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Gs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vl.enqueueReplaceState(t,t.state,null)}function ui(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Wi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=ze(o):(o=pe(t)?Ht:oe.current,l.context=mn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ii(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Vl.enqueueReplaceState(l,l.state,null),yl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Sn(e,t){try{var n="",r=t;do n+=od(r),r=r.return;while(r);var l=n}catch(o){l=\`
Error generating stack: \`+o.message+\`
\`+o.stack}return{value:e,source:t,stack:l,digest:null}}function xo(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function si(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ig=typeof WeakMap=="function"?WeakMap:Map;function Lc(e,t,n){n=Je(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Rl||(Rl=!0,yi=r),si(e,t)},n}function Vc(e,t,n){n=Je(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){si(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){si(e,t),typeof r!="function"&&(wt===null?wt=new Set([this]):wt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ws(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ig;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Gg.bind(null,e,t,n),t.then(e,e))}function Qs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ks(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Je(-1,1),t.tag=2,St(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var zg=rt.ReactCurrentOwner,de=!1;function se(e,t,n,r){t.child=e===null?ac(t,null,n,r):vn(t,e.child,n,r)}function Xs(e,t,n,r,l){n=n.render;var o=t.ref;return dn(t,l),r=Yi(e,t,n,r,o,l),n=Zi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,nt(e,t,l)):(j&&n&&Oi(t),t.flags|=1,se(e,t,r,l),t.child)}function qs(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!uu(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Dc(e,t,o,r,l)):(e=nl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:tr,n(i,r)&&e.ref===t.ref)return nt(e,t,l)}return t.flags|=1,e=_t(o,r),e.ref=t.ref,e.return=t,t.child=e}function Dc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(tr(o,r)&&e.ref===t.ref)if(de=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(de=!0);else return t.lanes=e.lanes,nt(e,t,l)}return ai(e,t,n,r,l)}function $c(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(un,ye),ye|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(un,ye),ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,$(un,ye),ye|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,$(un,ye),ye|=r;return se(e,t,l,n),t.child}function Tc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ai(e,t,n,r,l){var o=pe(n)?Ht:oe.current;return o=mn(t,o),dn(t,l),n=Yi(e,t,n,r,o,l),r=Zi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,nt(e,t,l)):(j&&r&&Oi(t),t.flags|=1,se(e,t,n,l),t.child)}function Ys(e,t,n,r,l){if(pe(n)){var o=!0;gl(t)}else o=!1;if(dn(t,l),t.stateNode===null)br(e,t),Nc(t,n,r),ui(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var s=i.context,a=n.contextType;typeof a=="object"&&a!==null?a=ze(a):(a=pe(n)?Ht:oe.current,a=mn(t,a));var p=n.getDerivedStateFromProps,h=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||s!==a)&&Gs(t,i,r,a),ct=!1;var d=t.memoizedState;i.state=d,yl(t,r,i,l),s=t.memoizedState,u!==r||d!==s||ge.current||ct?(typeof p=="function"&&(ii(t,n,p,r),s=t.memoizedState),(u=ct||Us(t,n,u,r,d,s,a))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=a,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,fc(e,t),u=t.memoizedProps,a=t.type===t.elementType?u:De(t.type,u),i.props=a,h=t.pendingProps,d=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=ze(s):(s=pe(n)?Ht:oe.current,s=mn(t,s));var c=n.getDerivedStateFromProps;(p=typeof c=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==h||d!==s)&&Gs(t,i,r,s),ct=!1,d=t.memoizedState,i.state=d,yl(t,r,i,l);var v=t.memoizedState;u!==h||d!==v||ge.current||ct?(typeof c=="function"&&(ii(t,n,c,r),v=t.memoizedState),(a=ct||Us(t,n,a,r,d,v,s)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),i.props=r,i.state=v,i.context=s,r=a):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return ci(e,t,n,r,o,l)}function ci(e,t,n,r,l,o){Tc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Ds(t,n,!1),nt(e,t,o);r=t.stateNode,zg.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=vn(t,e.child,null,o),t.child=vn(t,null,u,o)):se(e,t,u,o),t.memoizedState=r.state,l&&Ds(t,n,!0),t.child}function Oc(e){var t=e.stateNode;t.pendingContext?Vs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Vs(e,t.context,!1),Qi(e,t.containerInfo)}function Zs(e,t,n,r,l){return hn(),Ai(l),t.flags|=256,se(e,t,n,r),t.child}var fi={dehydrated:null,treeContext:null,retryLane:0};function di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hc(e,t,n){var r=t.pendingProps,l=B.current,o=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),$(B,l&1),e===null)return li(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Tl(i,r,0,null),e=Ot(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=di(n),t.memoizedState=fi,e):eu(t,i));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return Ng(e,t,i,r,u,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,u=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=_t(l,s),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?o=_t(u,o):(o=Ot(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?di(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=fi,r}return o=e.child,e=o.sibling,r=_t(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function eu(e,t){return t=Tl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gr(e,t,n,r){return r!==null&&Ai(r),vn(t,e.child,null,n),e=eu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ng(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=xo(Error(w(422))),Gr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Tl({mode:"visible",children:r.children},l,0,null),o=Ot(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&vn(t,e.child,null,i),t.child.memoizedState=di(i),t.memoizedState=fi,o);if((t.mode&1)===0)return Gr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,o=Error(w(419)),r=xo(o,r,void 0),Gr(e,t,i,r)}if(u=(i&e.childLanes)!==0,de||u){if(r=Z,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,tt(e,l),He(r,e,l,-1))}return iu(),r=xo(Error(w(421))),Gr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Wg.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,Se=yt(l.nextSibling),we=t,j=!0,Te=null,e!==null&&(Pe[Fe++]=Ye,Pe[Fe++]=Ze,Pe[Fe++]=At,Ye=e.id,Ze=e.overflow,At=t),t=eu(t,r.children),t.flags|=4096,t)}function Js(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),oi(e.return,t,n)}function Po(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Ac(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(se(e,t,r.children,n),r=B.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Js(e,n,t);else if(e.tag===19)Js(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if($(B,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Sl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Po(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Sl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Po(t,!0,n,null,o);break;case"together":Po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function br(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function nt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Bt|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(w(153));if(t.child!==null){for(e=t.child,n=_t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=_t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lg(e,t,n){switch(t.tag){case 3:Oc(t),hn();break;case 5:dc(t);break;case 1:pe(t.type)&&gl(t);break;case 4:Qi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;$(hl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?($(B,B.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Hc(e,t,n):($(B,B.current&1),e=nt(e,t,n),e!==null?e.sibling:null);$(B,B.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Ac(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),$(B,B.current),r)break;return null;case 22:case 23:return t.lanes=0,$c(e,t,n)}return nt(e,t,n)}var jc,gi,Bc,Uc;jc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};gi=function(){};Bc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,$t(Ke.current);var o=null;switch(n){case"input":l=Do(e,l),r=Do(e,r),o=[];break;case"select":l=G({},l,{value:void 0}),r=G({},r,{value:void 0}),o=[];break;case"textarea":l=Oo(e,l),r=Oo(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fl)}Ao(n,r);var i;n=null;for(a in l)if(!r.hasOwnProperty(a)&&l.hasOwnProperty(a)&&l[a]!=null)if(a==="style"){var u=l[a];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else a!=="dangerouslySetInnerHTML"&&a!=="children"&&a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Xn.hasOwnProperty(a)?o||(o=[]):(o=o||[]).push(a,null));for(a in r){var s=r[a];if(u=l!=null?l[a]:void 0,r.hasOwnProperty(a)&&s!==u&&(s!=null||u!=null))if(a==="style")if(u){for(i in u)!u.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&u[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(o||(o=[]),o.push(a,n)),n=s;else a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,u=u?u.__html:void 0,s!=null&&u!==s&&(o=o||[]).push(a,s)):a==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(a,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&(Xn.hasOwnProperty(a)?(s!=null&&a==="onScroll"&&O("scroll",e),o||u===s||(o=[])):(o=o||[]).push(a,s))}n&&(o=o||[]).push("style",n);var a=o;(t.updateQueue=a)&&(t.flags|=4)}};Uc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Nn(e,t){if(!j)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vg(e,t,n){var r=t.pendingProps;switch(Hi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return pe(t.type)&&dl(),re(t),null;case 3:return r=t.stateNode,yn(),H(ge),H(oe),Xi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Br(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Te!==null&&(Ci(Te),Te=null))),gi(e,t),re(t),null;case 5:Ki(t);var l=$t(ir.current);if(n=t.type,e!==null&&t.stateNode!=null)Bc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(w(166));return re(t),null}if(e=$t(Ke.current),Br(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[We]=t,r[lr]=o,e=(t.mode&1)!==0,n){case"dialog":O("cancel",r),O("close",r);break;case"iframe":case"object":case"embed":O("load",r);break;case"video":case"audio":for(l=0;l<On.length;l++)O(On[l],r);break;case"source":O("error",r);break;case"img":case"image":case"link":O("error",r),O("load",r);break;case"details":O("toggle",r);break;case"input":is(r,o),O("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},O("invalid",r);break;case"textarea":ss(r,o),O("invalid",r)}Ao(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="children"?typeof u=="string"?r.textContent!==u&&(o.suppressHydrationWarning!==!0&&jr(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(o.suppressHydrationWarning!==!0&&jr(r.textContent,u,e),l=["children",""+u]):Xn.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&O("scroll",r)}switch(n){case"input":Mr(r),us(r,o,!0);break;case"textarea":Mr(r),as(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=fl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=va(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[We]=t,e[lr]=r,jc(e,t,!1,!1),t.stateNode=e;e:{switch(i=jo(n,r),n){case"dialog":O("cancel",e),O("close",e),l=r;break;case"iframe":case"object":case"embed":O("load",e),l=r;break;case"video":case"audio":for(l=0;l<On.length;l++)O(On[l],e);l=r;break;case"source":O("error",e),l=r;break;case"img":case"image":case"link":O("error",e),O("load",e),l=r;break;case"details":O("toggle",e),l=r;break;case"input":is(e,r),l=Do(e,r),O("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=G({},r,{value:void 0}),O("invalid",e);break;case"textarea":ss(e,r),l=Oo(e,r),O("invalid",e);break;default:l=r}Ao(n,l),u=l;for(o in u)if(u.hasOwnProperty(o)){var s=u[o];o==="style"?wa(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ya(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&qn(e,s):typeof s=="number"&&qn(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Xn.hasOwnProperty(o)?s!=null&&o==="onScroll"&&O("scroll",e):s!=null&&ki(e,o,s,i))}switch(n){case"input":Mr(e),us(e,r,!1);break;case"textarea":Mr(e),as(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Rt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?sn(e,!!r.multiple,o,!1):r.defaultValue!=null&&sn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=fl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)Uc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(w(166));if(n=$t(ir.current),$t(Ke.current),Br(t)){if(r=t.stateNode,n=t.memoizedProps,r[We]=t,(o=r.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:jr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&jr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[We]=t,t.stateNode=r}return re(t),null;case 13:if(H(B),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(j&&Se!==null&&(t.mode&1)!==0&&(t.flags&128)===0)uc(),hn(),t.flags|=98560,o=!1;else if(o=Br(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(w(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(w(317));o[We]=t}else hn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;re(t),o=!1}else Te!==null&&(Ci(Te),Te=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(B.current&1)!==0?q===0&&(q=3):iu())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return yn(),gi(e,t),e===null&&nr(t.stateNode.containerInfo),re(t),null;case 10:return Ui(t.type._context),re(t),null;case 17:return pe(t.type)&&dl(),re(t),null;case 19:if(H(B),o=t.memoizedState,o===null)return re(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Nn(o,!1);else{if(q!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Sl(e),i!==null){for(t.flags|=128,Nn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(B,B.current&1|2),t.child}e=e.sibling}o.tail!==null&&Q()>wn&&(t.flags|=128,r=!0,Nn(o,!1),t.lanes=4194304)}else{if(!r)if(e=Sl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Nn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!j)return re(t),null}else 2*Q()-o.renderingStartTime>wn&&n!==1073741824&&(t.flags|=128,r=!0,Nn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Q(),t.sibling=null,n=B.current,$(B,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return ou(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(ye&1073741824)!==0&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(w(156,t.tag))}function Dg(e,t){switch(Hi(t),t.tag){case 1:return pe(t.type)&&dl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return yn(),H(ge),H(oe),Xi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Ki(t),null;case 13:if(H(B),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(w(340));hn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(B),null;case 4:return yn(),null;case 10:return Ui(t.type._context),null;case 22:case 23:return ou(),null;case 24:return null;default:return null}}var Wr=!1,le=!1,$g=typeof WeakSet=="function"?WeakSet:Set,R=null;function on(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){W(e,t,r)}else n.current=null}function pi(e,t,n){try{n()}catch(r){W(e,t,r)}}var bs=!1;function Tg(e,t){if(Zo=sl,e=Xa(),Ti(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch(S){n=null;break e}var i=0,u=-1,s=-1,a=0,p=0,h=e,d=null;t:for(;;){for(var c;h!==n||l!==0&&h.nodeType!==3||(u=i+l),h!==o||r!==0&&h.nodeType!==3||(s=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(c=h.firstChild)!==null;)d=h,h=c;for(;;){if(h===e)break t;if(d===n&&++a===l&&(u=i),d===o&&++p===r&&(s=i),(c=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=c}n=u===-1||s===-1?null:{start:u,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Jo={focusedElem:e,selectionRange:n},sl=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var v=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,k=v.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:De(t.type,y),k);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(S){W(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return v=bs,bs=!1,v}function Wn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&pi(t,n,o)}l=l.next}while(l!==r)}}function Dl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function mi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Gc(e){var t=e.alternate;t!==null&&(e.alternate=null,Gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[We],delete t[lr],delete t[ti],delete t[Sg],delete t[wg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wc(e){return e.tag===5||e.tag===3||e.tag===4}function ea(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function hi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fl));else if(r!==4&&(e=e.child,e!==null))for(hi(e,t,n),e=e.sibling;e!==null;)hi(e,t,n),e=e.sibling}function vi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(vi(e,t,n),e=e.sibling;e!==null;)vi(e,t,n),e=e.sibling}var J=null,$e=!1;function st(e,t,n){for(n=n.child;n!==null;)Qc(e,t,n),n=n.sibling}function Qc(e,t,n){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(Pl,n)}catch(u){}switch(n.tag){case 5:le||on(n,t);case 6:var r=J,l=$e;J=null,st(e,t,n),J=r,$e=l,J!==null&&($e?(e=J,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):J.removeChild(n.stateNode));break;case 18:J!==null&&($e?(e=J,n=n.stateNode,e.nodeType===8?wo(e.parentNode,n):e.nodeType===1&&wo(e,n),bn(e)):wo(J,n.stateNode));break;case 4:r=J,l=$e,J=n.stateNode.containerInfo,$e=!0,st(e,t,n),J=r,$e=l;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&pi(n,t,i),l=l.next}while(l!==r)}st(e,t,n);break;case 1:if(!le&&(on(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){W(n,t,u)}st(e,t,n);break;case 21:st(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,st(e,t,n),le=r):st(e,t,n);break;default:st(e,t,n)}}function ta(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $g),t.forEach(function(r){var l=Qg.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:J=u.stateNode,$e=!1;break e;case 3:J=u.stateNode.containerInfo,$e=!0;break e;case 4:J=u.stateNode.containerInfo,$e=!0;break e}u=u.return}if(J===null)throw Error(w(160));Qc(o,i,l),J=null,$e=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(a){W(l,t,a)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Kc(t,e),t=t.sibling}function Kc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),Ue(e),r&4){try{Wn(3,e,e.return),Dl(3,e)}catch(y){W(e,e.return,y)}try{Wn(5,e,e.return)}catch(y){W(e,e.return,y)}}break;case 1:Ve(t,e),Ue(e),r&512&&n!==null&&on(n,n.return);break;case 5:if(Ve(t,e),Ue(e),r&512&&n!==null&&on(n,n.return),e.flags&32){var l=e.stateNode;try{qn(l,"")}catch(y){W(e,e.return,y)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,u=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{u==="input"&&o.type==="radio"&&o.name!=null&&ma(l,o),jo(u,i);var a=jo(u,o);for(i=0;i<s.length;i+=2){var p=s[i],h=s[i+1];p==="style"?wa(l,h):p==="dangerouslySetInnerHTML"?ya(l,h):p==="children"?qn(l,h):ki(l,p,h,a)}switch(u){case"input":$o(l,o);break;case"textarea":ha(l,o);break;case"select":var d=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var c=o.value;c!=null?sn(l,!!o.multiple,c,!1):d!==!!o.multiple&&(o.defaultValue!=null?sn(l,!!o.multiple,o.defaultValue,!0):sn(l,!!o.multiple,o.multiple?[]:"",!1))}l[lr]=o}catch(y){W(e,e.return,y)}}break;case 6:if(Ve(t,e),Ue(e),r&4){if(e.stateNode===null)throw Error(w(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(y){W(e,e.return,y)}}break;case 3:if(Ve(t,e),Ue(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{bn(t.containerInfo)}catch(y){W(e,e.return,y)}break;case 4:Ve(t,e),Ue(e);break;case 13:Ve(t,e),Ue(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ru=Q())),r&4&&ta(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(le=(a=le)||p,Ve(t,e),le=a):Ve(t,e),Ue(e),r&8192){if(a=e.memoizedState!==null,(e.stateNode.isHidden=a)&&!p&&(e.mode&1)!==0)for(R=e,p=e.child;p!==null;){for(h=R=p;R!==null;){switch(d=R,c=d.child,d.tag){case 0:case 11:case 14:case 15:Wn(4,d,d.return);break;case 1:on(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){r=d,n=d.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(y){W(r,n,y)}}break;case 5:on(d,d.return);break;case 22:if(d.memoizedState!==null){ra(h);continue}}c!==null?(c.return=d,R=c):ra(h)}p=p.sibling}e:for(p=null,h=e;;){if(h.tag===5){if(p===null){p=h;try{l=h.stateNode,a?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(u=h.stateNode,s=h.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,u.style.display=Sa("display",i))}catch(y){W(e,e.return,y)}}}else if(h.tag===6){if(p===null)try{h.stateNode.nodeValue=a?"":h.memoizedProps}catch(y){W(e,e.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;p===h&&(p=null),h=h.return}p===h&&(p=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Ve(t,e),Ue(e),r&4&&ta(e);break;case 21:break;default:Ve(t,e),Ue(e)}}function Ue(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wc(n)){var r=n;break e}n=n.return}throw Error(w(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(qn(l,""),r.flags&=-33);var o=ea(e);vi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,u=ea(e);hi(e,u,i);break;default:throw Error(w(161))}}catch(s){W(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Og(e,t,n){R=e,Xc(e,t,n)}function Xc(e,t,n){for(var r=(e.mode&1)!==0;R!==null;){var l=R,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Wr;if(!i){var u=l.alternate,s=u!==null&&u.memoizedState!==null||le;u=Wr;var a=le;if(Wr=i,(le=s)&&!a)for(R=l;R!==null;)i=R,s=i.child,i.tag===22&&i.memoizedState!==null?la(l):s!==null?(s.return=i,R=s):la(l);for(;o!==null;)R=o,Xc(o,t,n),o=o.sibling;R=l,Wr=u,le=a}na(e,t,n)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,R=o):na(e,t,n)}}function na(e){for(;R!==null;){var t=R;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:le||Dl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:De(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&As(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}As(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var a=t.alternate;if(a!==null){var p=a.memoizedState;if(p!==null){var h=p.dehydrated;h!==null&&bn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}le||t.flags&512&&mi(t)}catch(d){W(t,t.return,d)}}if(t===e){R=null;break}if(n=t.sibling,n!==null){n.return=t.return,R=n;break}R=t.return}}function ra(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var n=t.sibling;if(n!==null){n.return=t.return,R=n;break}R=t.return}}function la(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Dl(4,t)}catch(s){W(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){W(t,l,s)}}var o=t.return;try{mi(t)}catch(s){W(t,o,s)}break;case 5:var i=t.return;try{mi(t)}catch(s){W(t,i,s)}}}catch(s){W(t,t.return,s)}if(t===e){R=null;break}var u=t.sibling;if(u!==null){u.return=t.return,R=u;break}R=t.return}}var Hg=Math.ceil,_l=rt.ReactCurrentDispatcher,tu=rt.ReactCurrentOwner,Ie=rt.ReactCurrentBatchConfig,L=0,Z=null,K=null,b=0,ye=0,un=xt(0),q=0,cr=null,Bt=0,$l=0,nu=0,Qn=null,fe=null,ru=0,wn=1/0,Xe=null,Rl=!1,yi=null,wt=null,Qr=!1,pt=null,kl=0,Kn=0,Si=null,el=-1,tl=0;function ae(){return(L&6)!==0?Q():el!==-1?el:el=Q()}function Ct(e){return(e.mode&1)===0?1:(L&2)!==0&&b!==0?b&-b:_g.transition!==null?(tl===0&&(tl=Na()),tl):(e=V,e!==0||(e=window.event,e=e===void 0?16:Ha(e.type)),e)}function He(e,t,n,r){if(50<Kn)throw Kn=0,Si=null,Error(w(185));fr(e,n,r),((L&2)===0||e!==Z)&&(e===Z&&((L&2)===0&&($l|=n),q===4&&dt(e,b)),me(e,r),n===1&&L===0&&(t.mode&1)===0&&(wn=Q()+500,Nl&&Pt()))}function me(e,t){var n=e.callbackNode;kd(e,t);var r=ul(e,e===Z?b:0);if(r===0)n!==null&&ds(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ds(n),t===1)e.tag===0?Cg(oa.bind(null,e)):lc(oa.bind(null,e)),vg(function(){(L&6)===0&&Pt()}),n=null;else{switch(La(r)){case 1:n=Mi;break;case 4:n=Ia;break;case 16:n=il;break;case 536870912:n=za;break;default:n=il}n=nf(n,qc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qc(e,t){if(el=-1,tl=0,(L&6)!==0)throw Error(w(327));var n=e.callbackNode;if(gn()&&e.callbackNode!==n)return null;var r=ul(e,e===Z?b:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=El(e,r);else{t=r;var l=L;L|=2;var o=Zc();(Z!==e||b!==t)&&(Xe=null,wn=Q()+500,Tt(e,t));do try{Bg();break}catch(u){Yc(e,u)}while(!0);Bi(),_l.current=o,L=l,K!==null?t=0:(Z=null,b=0,t=q)}if(t!==0){if(t===2&&(l=Qo(e),l!==0&&(r=l,t=wi(e,l))),t===1)throw n=cr,Tt(e,0),dt(e,r),me(e,Q()),n;if(t===6)dt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Ag(l)&&(t=El(e,r),t===2&&(o=Qo(e),o!==0&&(r=o,t=wi(e,o))),t===1))throw n=cr,Tt(e,0),dt(e,r),me(e,Q()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(w(345));case 2:Lt(e,fe,Xe);break;case 3:if(dt(e,r),(r&130023424)===r&&(t=ru+500-Q(),10<t)){if(ul(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ae(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ei(Lt.bind(null,e,fe,Xe),t);break}Lt(e,fe,Xe);break;case 4:if(dt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-Oe(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Hg(r/1960))-r,10<r){e.timeoutHandle=ei(Lt.bind(null,e,fe,Xe),r);break}Lt(e,fe,Xe);break;case 5:Lt(e,fe,Xe);break;default:throw Error(w(329))}}}return me(e,Q()),e.callbackNode===n?qc.bind(null,e):null}function wi(e,t){var n=Qn;return e.current.memoizedState.isDehydrated&&(Tt(e,t).flags|=256),e=El(e,t),e!==2&&(t=fe,fe=n,t!==null&&Ci(t)),e}function Ci(e){fe===null?fe=e:fe.push.apply(fe,e)}function Ag(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Ae(o(),l))return!1}catch(i){return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~nu,t&=~$l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Oe(t),r=1<<n;e[n]=-1,t&=~r}}function oa(e){if((L&6)!==0)throw Error(w(327));gn();var t=ul(e,0);if((t&1)===0)return me(e,Q()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=Qo(e);r!==0&&(t=r,n=wi(e,r))}if(n===1)throw n=cr,Tt(e,0),dt(e,t),me(e,Q()),n;if(n===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lt(e,fe,Xe),me(e,Q()),null}function lu(e,t){var n=L;L|=1;try{return e(t)}finally{L=n,L===0&&(wn=Q()+500,Nl&&Pt())}}function Ut(e){pt!==null&&pt.tag===0&&(L&6)===0&&gn();var t=L;L|=1;var n=Ie.transition,r=V;try{if(Ie.transition=null,V=1,e)return e()}finally{V=r,Ie.transition=n,L=t,(L&6)===0&&Pt()}}function ou(){ye=un.current,H(un)}function Tt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,hg(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Hi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&dl();break;case 3:yn(),H(ge),H(oe),Xi();break;case 5:Ki(r);break;case 4:yn();break;case 13:H(B);break;case 19:H(B);break;case 10:Ui(r.type._context);break;case 22:case 23:ou()}n=n.return}if(Z=e,K=e=_t(e.current,null),b=ye=t,q=0,cr=null,nu=$l=Bt=0,fe=Qn=null,Dt!==null){for(t=0;t<Dt.length;t++)if(n=Dt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Dt=null}return e}function Yc(e,t){do{var n=K;try{if(Bi(),Zr.current=Cl,wl){for(var r=U.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}wl=!1}if(jt=0,Y=X=U=null,Gn=!1,ur=0,tu.current=null,n===null||n.return===null){q=1,cr=t,K=null;break}e:{var o=e,i=n.return,u=n,s=t;if(t=b,u.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var a=s,p=u,h=p.tag;if((p.mode&1)===0&&(h===0||h===11||h===15)){var d=p.alternate;d?(p.updateQueue=d.updateQueue,p.memoizedState=d.memoizedState,p.lanes=d.lanes):(p.updateQueue=null,p.memoizedState=null)}var c=Qs(i);if(c!==null){c.flags&=-257,Ks(c,i,u,o,t),c.mode&1&&Ws(o,a,t),t=c,s=a;var v=t.updateQueue;if(v===null){var y=new Set;y.add(s),t.updateQueue=y}else v.add(s);break e}else{if((t&1)===0){Ws(o,a,t),iu();break e}s=Error(w(426))}}else if(j&&u.mode&1){var k=Qs(i);if(k!==null){(k.flags&65536)===0&&(k.flags|=256),Ks(k,i,u,o,t),Ai(Sn(s,u));break e}}o=s=Sn(s,u),q!==4&&(q=2),Qn===null?Qn=[o]:Qn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Lc(o,s,t);Hs(o,g);break e;case 1:u=s;var f=o.type,m=o.stateNode;if((o.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(wt===null||!wt.has(m)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=Vc(o,u,t);Hs(o,S);break e}}o=o.return}while(o!==null)}bc(n)}catch(C){t=C,K===n&&n!==null&&(K=n=n.return);continue}break}while(!0)}function Zc(){var e=_l.current;return _l.current=Cl,e===null?Cl:e}function iu(){(q===0||q===3||q===2)&&(q=4),Z===null||(Bt&268435455)===0&&($l&268435455)===0||dt(Z,b)}function El(e,t){var n=L;L|=2;var r=Zc();(Z!==e||b!==t)&&(Xe=null,Tt(e,t));do try{jg();break}catch(l){Yc(e,l)}while(!0);if(Bi(),L=n,_l.current=r,K!==null)throw Error(w(261));return Z=null,b=0,q}function jg(){for(;K!==null;)Jc(K)}function Bg(){for(;K!==null&&!md();)Jc(K)}function Jc(e){var t=tf(e.alternate,e,ye);e.memoizedProps=e.pendingProps,t===null?bc(e):K=t,tu.current=null}function bc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Vg(n,t,ye),n!==null){K=n;return}}else{if(n=Dg(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{q=6,K=null;return}}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);q===0&&(q=5)}function Lt(e,t,n){var r=V,l=Ie.transition;try{Ie.transition=null,V=1,Ug(e,t,n,r)}finally{Ie.transition=l,V=r}return null}function Ug(e,t,n,r){do gn();while(pt!==null);if((L&6)!==0)throw Error(w(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Ed(e,o),e===Z&&(K=Z=null,b=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Qr||(Qr=!0,nf(il,function(){return gn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=Ie.transition,Ie.transition=null;var i=V;V=1;var u=L;L|=4,tu.current=null,Tg(e,n),Kc(n,e),fg(Jo),sl=!!Zo,Jo=Zo=null,e.current=n,Og(n,e,l),hd(),L=u,V=i,Ie.transition=o}else e.current=n;if(Qr&&(Qr=!1,pt=e,kl=l),o=e.pendingLanes,o===0&&(wt=null),Sd(n.stateNode,r),me(e,Q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Rl)throw Rl=!1,e=yi,yi=null,e;return(kl&1)!==0&&e.tag!==0&&gn(),o=e.pendingLanes,(o&1)!==0?e===Si?Kn++:(Kn=0,Si=e):Kn=0,Pt(),null}function gn(){if(pt!==null){var e=La(kl),t=Ie.transition,n=V;try{if(Ie.transition=null,V=16>e?16:e,pt===null)var r=!1;else{if(e=pt,pt=null,kl=0,(L&6)!==0)throw Error(w(331));var l=L;for(L|=4,R=e.current;R!==null;){var o=R,i=o.child;if((R.flags&16)!==0){var u=o.deletions;if(u!==null){for(var s=0;s<u.length;s++){var a=u[s];for(R=a;R!==null;){var p=R;switch(p.tag){case 0:case 11:case 15:Wn(8,p,o)}var h=p.child;if(h!==null)h.return=p,R=h;else for(;R!==null;){p=R;var d=p.sibling,c=p.return;if(Gc(p),p===a){R=null;break}if(d!==null){d.return=c,R=d;break}R=c}}}var v=o.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var k=y.sibling;y.sibling=null,y=k}while(y!==null)}}R=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,R=i;else e:for(;R!==null;){if(o=R,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Wn(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,R=g;break e}R=o.return}}var f=e.current;for(R=f;R!==null;){i=R;var m=i.child;if((i.subtreeFlags&2064)!==0&&m!==null)m.return=i,R=m;else e:for(i=f;R!==null;){if(u=R,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:Dl(9,u)}}catch(C){W(u,u.return,C)}if(u===i){R=null;break e}var S=u.sibling;if(S!==null){S.return=u.return,R=S;break e}R=u.return}}if(L=l,Pt(),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(Pl,e)}catch(C){}r=!0}return r}finally{V=n,Ie.transition=t}}return!1}function ia(e,t,n){t=Sn(n,t),t=Lc(e,t,1),e=St(e,t,1),t=ae(),e!==null&&(fr(e,1,t),me(e,t))}function W(e,t,n){if(e.tag===3)ia(e,e,n);else for(;t!==null;){if(t.tag===3){ia(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wt===null||!wt.has(r))){e=Sn(n,e),e=Vc(t,e,1),t=St(t,e,1),e=ae(),t!==null&&(fr(t,1,e),me(t,e));break}}t=t.return}}function Gg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ae(),e.pingedLanes|=e.suspendedLanes&n,Z===e&&(b&n)===n&&(q===4||q===3&&(b&130023424)===b&&500>Q()-ru?Tt(e,0):nu|=n),me(e,t)}function ef(e,t){t===0&&((e.mode&1)===0?t=1:(t=Nr,Nr<<=1,(Nr&130023424)===0&&(Nr=4194304)));var n=ae();e=tt(e,t),e!==null&&(fr(e,t,n),me(e,n))}function Wg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ef(e,n)}function Qg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(t),ef(e,n)}var tf;tf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ge.current)de=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return de=!1,Lg(e,t,n);de=(e.flags&131072)!==0}else de=!1,j&&(t.flags&1048576)!==0&&oc(t,ml,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;br(e,t),e=t.pendingProps;var l=mn(t,oe.current);dn(t,n),l=Yi(null,t,r,e,l,n);var o=Zi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,pe(r)?(o=!0,gl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Wi(t),l.updater=Vl,t.stateNode=l,l._reactInternals=t,ui(t,r,e,n),t=ci(null,t,r,!0,o,n)):(t.tag=0,j&&o&&Oi(t),se(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(br(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Xg(r),e=De(r,e),l){case 0:t=ai(null,t,r,e,n);break e;case 1:t=Ys(null,t,r,e,n);break e;case 11:t=Xs(null,t,r,e,n);break e;case 14:t=qs(null,t,r,De(r.type,e),n);break e}throw Error(w(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),ai(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),Ys(e,t,r,l,n);case 3:e:{if(Oc(t),e===null)throw Error(w(387));r=t.pendingProps,o=t.memoizedState,l=o.element,fc(e,t),yl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Sn(Error(w(423)),t),t=Zs(e,t,r,n,l);break e}else if(r!==l){l=Sn(Error(w(424)),t),t=Zs(e,t,r,n,l);break e}else for(Se=yt(t.stateNode.containerInfo.firstChild),we=t,j=!0,Te=null,n=ac(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(hn(),r===l){t=nt(e,t,n);break e}se(e,t,r,n)}t=t.child}return t;case 5:return dc(t),e===null&&li(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,bo(r,l)?i=null:o!==null&&bo(r,o)&&(t.flags|=32),Tc(e,t),se(e,t,i,n),t.child;case 6:return e===null&&li(t),null;case 13:return Hc(e,t,n);case 4:return Qi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=vn(t,null,r,n):se(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),Xs(e,t,r,l,n);case 7:return se(e,t,t.pendingProps,n),t.child;case 8:return se(e,t,t.pendingProps.children,n),t.child;case 12:return se(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,$(hl,r._currentValue),r._currentValue=i,o!==null)if(Ae(o.value,i)){if(o.children===l.children&&!ge.current){t=nt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var u=o.dependencies;if(u!==null){i=o.child;for(var s=u.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=Je(-1,n&-n),s.tag=2;var a=o.updateQueue;if(a!==null){a=a.shared;var p=a.pending;p===null?s.next=s:(s.next=p.next,p.next=s),a.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),oi(o.return,n,t),u.lanes|=n;break}s=s.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(w(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),oi(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}se(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,dn(t,n),l=ze(l),r=r(l),t.flags|=1,se(e,t,r,n),t.child;case 14:return r=t.type,l=De(r,t.pendingProps),l=De(r.type,l),qs(e,t,r,l,n);case 15:return Dc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:De(r,l),br(e,t),t.tag=1,pe(r)?(e=!0,gl(t)):e=!1,dn(t,n),Nc(t,r,l),ui(t,r,l,n),ci(null,t,r,!0,e,n);case 19:return Ac(e,t,n);case 22:return $c(e,t,n)}throw Error(w(156,t.tag))};function nf(e,t){return Ma(e,t)}function Kg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Me(e,t,n,r){return new Kg(e,t,n,r)}function uu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xg(e){if(typeof e=="function")return uu(e)?1:0;if(e!=null){if(e=e.$typeof,e===xi)return 11;if(e===Pi)return 14}return 2}function _t(e,t){var n=e.alternate;return n===null?(n=Me(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function nl(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")uu(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Yt:return Ot(n.children,l,o,t);case Ei:i=8,l|=8;break;case zo:return e=Me(12,n,t,l|2),e.elementType=zo,e.lanes=o,e;case No:return e=Me(13,n,t,l),e.elementType=No,e.lanes=o,e;case Lo:return e=Me(19,n,t,l),e.elementType=Lo,e.lanes=o,e;case da:return Tl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$typeof){case ca:i=10;break e;case fa:i=9;break e;case xi:i=11;break e;case Pi:i=14;break e;case at:i=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return t=Me(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Ot(e,t,n,r){return e=Me(7,e,r,t),e.lanes=n,e}function Tl(e,t,n,r){return e=Me(22,e,r,t),e.elementType=da,e.lanes=n,e.stateNode={isHidden:!1},e}function Fo(e,t,n){return e=Me(6,e,null,t),e.lanes=n,e}function Mo(e,t,n){return t=Me(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qg(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fo(0),this.expirationTimes=fo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function su(e,t,n,r,l,o,i,u,s){return e=new qg(e,t,n,u,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Me(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wi(o),e}function Yg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$typeof:qt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rf(e){if(!e)return kt;e=e._reactInternals;e:{if(Wt(e)!==e||e.tag!==1)throw Error(w(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(pe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(w(171))}if(e.tag===1){var n=e.type;if(pe(n))return rc(e,n,t)}return t}function lf(e,t,n,r,l,o,i,u,s){return e=su(n,r,!0,e,l,o,i,u,s),e.context=rf(null),n=e.current,r=ae(),l=Ct(n),o=Je(r,l),o.callback=t!=null?t:null,St(n,o,l),e.current.lanes=l,fr(e,l,r),me(e,r),e}function Ol(e,t,n,r){var l=t.current,o=ae(),i=Ct(l);return n=rf(n),t.context===null?t.context=n:t.pendingContext=n,t=Je(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=St(l,t,i),e!==null&&(He(e,l,i,o),Yr(e,l,i)),i}function xl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ua(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function au(e,t){ua(e,t),(e=e.alternate)&&ua(e,t)}function Zg(){return null}var of=typeof reportError=="function"?reportError:function(e){console.error(e)};function cu(e){this._internalRoot=e}Hl.prototype.render=cu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(w(409));Ol(e,t,null,null)};Hl.prototype.unmount=cu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ut(function(){Ol(null,e,null,null)}),t[et]=null}};function Hl(e){this._internalRoot=e}Hl.prototype.unstable_scheduleHydration=function(e){if(e){var t=$a();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ft.length&&t!==0&&t<ft[n].priority;n++);ft.splice(n,0,e),n===0&&Oa(e)}};function fu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function sa(){}function Jg(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var a=xl(i);o.call(a)}}var i=lf(t,r,e,0,null,!1,!1,"",sa);return e._reactRootContainer=i,e[et]=i.current,nr(e.nodeType===8?e.parentNode:e),Ut(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var a=xl(s);u.call(a)}}var s=su(e,0,!1,null,null,!1,!1,"",sa);return e._reactRootContainer=s,e[et]=s.current,nr(e.nodeType===8?e.parentNode:e),Ut(function(){Ol(t,s,n,r)}),s}function jl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var u=l;l=function(){var s=xl(i);u.call(s)}}Ol(t,i,e,l)}else i=Jg(n,t,e,l,r);return xl(i)}Va=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Tn(t.pendingLanes);n!==0&&(Ii(t,n|1),me(t,Q()),(L&6)===0&&(wn=Q()+500,Pt()))}break;case 13:Ut(function(){var r=tt(e,1);if(r!==null){var l=ae();He(r,e,1,l)}}),au(e,1)}};zi=function(e){if(e.tag===13){var t=tt(e,134217728);if(t!==null){var n=ae();He(t,e,134217728,n)}au(e,134217728)}};Da=function(e){if(e.tag===13){var t=Ct(e),n=tt(e,t);if(n!==null){var r=ae();He(n,e,t,r)}au(e,t)}};$a=function(){return V};Ta=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};Uo=function(e,t,n){switch(t){case"input":if($o(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=zl(r);if(!l)throw Error(w(90));pa(r),$o(r,l)}}}break;case"textarea":ha(e,n);break;case"select":t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}};Ra=lu;ka=Ut;var bg={usingClientEntryPoint:!1,Events:[gr,en,zl,Ca,_a,lu]},Ln={findFiberByHostInstance:Vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ep={bundleType:Ln.bundleType,version:Ln.version,rendererPackageName:Ln.rendererPackageName,rendererConfig:Ln.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Pa(e),e===null?null:e.stateNode},findFiberByHostInstance:Ln.findFiberByHostInstance||Zg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&(Vn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Vn.isDisabled&&Vn.supportsFiber))try{Pl=Vn.inject(ep),Qe=Vn}catch(e){}var Vn;Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bg;Re.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fu(t))throw Error(w(200));return Yg(e,t,null,n)};Re.createRoot=function(e,t){if(!fu(e))throw Error(w(299));var n=!1,r="",l=of;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=su(e,1,!1,null,null,n,!1,r,l),e[et]=t.current,nr(e.nodeType===8?e.parentNode:e),new cu(t)};Re.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=Pa(t),e=e===null?null:e.stateNode,e};Re.flushSync=function(e){return Ut(e)};Re.hydrate=function(e,t,n){if(!Al(t))throw Error(w(200));return jl(null,e,t,!0,n)};Re.hydrateRoot=function(e,t,n){if(!fu(e))throw Error(w(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=of;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=lf(t,null,e,1,n!=null?n:null,l,!1,o,i),e[et]=t.current,nr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Hl(t)};Re.render=function(e,t,n){if(!Al(t))throw Error(w(200));return jl(null,e,t,!1,n)};Re.unmountComponentAtNode=function(e){if(!Al(e))throw Error(w(40));return e._reactRootContainer?(Ut(function(){jl(null,null,e,!1,function(){e._reactRootContainer=null,e[et]=null})}),!0):!1};Re.unstable_batchedUpdates=lu;Re.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return jl(e,t,n,!1,r)};Re.version="18.3.1-next-f1338f8080-20240426"});var du=It((tm,af)=>{"use strict";function sf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sf)}catch(e){console.error(e)}}sf(),af.exports=uf()});var ff=It(gu=>{"use strict";var cf=du();gu.createRoot=cf.createRoot,gu.hydrateRoot=cf.hydrateRoot;var nm});var Ee=yr(_r()),Mf=yr(ff()),If=yr(du());var vr=yr(_r(),1);function Ft(e,t){return typeof e=="function"?e(t):e}function ke(e,t){return n=>{t.setState(r=>({...r,[e]:Ft(n,r[e])}))}}function Wl(e){return e instanceof Function}function tp(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function np(e,t){let n=[],r=l=>{l.forEach(o=>{n.push(o);let i=t(o);i!=null&&i.length&&r(i)})};return r(e),n}function P(e,t,n){let r=[],l;return o=>{let i;n.key&&n.debug&&(i=Date.now());let u=e(o);if(!(u.length!==r.length||u.some((p,h)=>r[h]!==p)))return l;r=u;let a;if(n.key&&n.debug&&(a=Date.now()),l=t(...u),n==null||n.onChange==null||n.onChange(l),n.key&&n.debug&&n!=null&&n.debug()){let p=Math.round((Date.now()-i)*100)/100,h=Math.round((Date.now()-a)*100)/100,d=h/16,c=(v,y)=>{for(v=String(v);v.length<y;)v=" "+v;return v};console.info(\`%c\\u23F1 \${c(h,5)} /\${c(p,5)} ms\`,\`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(\${Math.max(0,Math.min(120-120*d,120))}deg 100% 31%);\`,n==null?void 0:n.key)}return l}}function F(e,t,n,r){return{debug:()=>{var l;return(l=e==null?void 0:e.debugAll)!=null?l:e[t]},key:!1,onChange:r}}function rp(e,t,n,r){let l=()=>{var i;return(i=o.getValue())!=null?i:e.options.renderFallbackValue},o={id:\`\${t.id}_\${n.id}\`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:l,getContext:P(()=>[e,n,t,o],(i,u,s,a)=>({table:i,column:u,row:s,cell:a,getValue:a.getValue,renderValue:a.renderValue}),F(e.options,"debugCells","cell.getContext"))};return e._features.forEach(i=>{i.createCell==null||i.createCell(o,n,t,e)},{}),o}function lp(e,t,n,r){var l,o;let u={...e._getDefaultColumnDef(),...t},s=u.accessorKey,a=(l=(o=u.id)!=null?o:s?typeof String.prototype.replaceAll=="function"?s.replaceAll(".","_"):s.replace(/\\./g,"_"):void 0)!=null?l:typeof u.header=="string"?u.header:void 0,p;if(u.accessorFn?p=u.accessorFn:s&&(s.includes(".")?p=d=>{let c=d;for(let y of s.split(".")){var v;c=(v=c)==null?void 0:v[y]}return c}:p=d=>d[u.accessorKey]),!a)throw new Error;let h={id:\`\${String(a)}\`,accessorFn:p,parent:r,depth:n,columnDef:u,columns:[],getFlatColumns:P(()=>[!0],()=>{var d;return[h,...(d=h.columns)==null?void 0:d.flatMap(c=>c.getFlatColumns())]},F(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:P(()=>[e._getOrderColumnsFn()],d=>{var c;if((c=h.columns)!=null&&c.length){let v=h.columns.flatMap(y=>y.getLeafColumns());return d(v)}return[h]},F(e.options,"debugColumns","column.getLeafColumns"))};for(let d of e._features)d.createColumn==null||d.createColumn(h,e);return h}var ie="debugHeaders";function df(e,t,n){var r;let o={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{let i=[],u=s=>{s.subHeaders&&s.subHeaders.length&&s.subHeaders.map(u),i.push(s)};return u(o),i},getContext:()=>({table:e,header:o,column:t})};return e._features.forEach(i=>{i.createHeader==null||i.createHeader(o,e)}),o}var op={createTable:e=>{e.getHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>{var o,i;let u=(o=r==null?void 0:r.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?o:[],s=(i=l==null?void 0:l.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?i:[],a=n.filter(h=>!(r!=null&&r.includes(h.id))&&!(l!=null&&l.includes(h.id)));return Bl(t,[...u,...a,...s],e)},F(e.options,ie,"getHeaderGroups")),e.getCenterHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>(n=n.filter(o=>!(r!=null&&r.includes(o.id))&&!(l!=null&&l.includes(o.id))),Bl(t,n,e,"center")),F(e.options,ie,"getCenterHeaderGroups")),e.getLeftHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Bl(t,o,e,"left")},F(e.options,ie,"getLeftHeaderGroups")),e.getRightHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Bl(t,o,e,"right")},F(e.options,ie,"getRightHeaderGroups")),e.getFooterGroups=P(()=>[e.getHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getFooterGroups")),e.getLeftFooterGroups=P(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getLeftFooterGroups")),e.getCenterFooterGroups=P(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getCenterFooterGroups")),e.getRightFooterGroups=P(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getRightFooterGroups")),e.getFlatHeaders=P(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getFlatHeaders")),e.getLeftFlatHeaders=P(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getLeftFlatHeaders")),e.getCenterFlatHeaders=P(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getCenterFlatHeaders")),e.getRightFlatHeaders=P(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getRightFlatHeaders")),e.getCenterLeafHeaders=P(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getCenterLeafHeaders")),e.getLeftLeafHeaders=P(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getLeftLeafHeaders")),e.getRightLeafHeaders=P(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getRightLeafHeaders")),e.getLeafHeaders=P(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var l,o,i,u,s,a;return[...(l=(o=t[0])==null?void 0:o.headers)!=null?l:[],...(i=(u=n[0])==null?void 0:u.headers)!=null?i:[],...(s=(a=r[0])==null?void 0:a.headers)!=null?s:[]].map(p=>p.getLeafHeaders()).flat()},F(e.options,ie,"getLeafHeaders"))}};function Bl(e,t,n,r){var l,o;let i=0,u=function(d,c){c===void 0&&(c=1),i=Math.max(i,c),d.filter(v=>v.getIsVisible()).forEach(v=>{var y;(y=v.columns)!=null&&y.length&&u(v.columns,c+1)},0)};u(e);let s=[],a=(d,c)=>{let v={depth:c,id:[r,\`\${c}\`].filter(Boolean).join("_"),headers:[]},y=[];d.forEach(k=>{let g=[...y].reverse()[0],f=k.column.depth===v.depth,m,S=!1;if(f&&k.column.parent?m=k.column.parent:(m=k.column,S=!0),g&&(g==null?void 0:g.column)===m)g.subHeaders.push(k);else{let C=df(n,m,{id:[r,c,m.id,k==null?void 0:k.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?\`\${y.filter(E=>E.column===m).length}\`:void 0,depth:c,index:y.length});C.subHeaders.push(k),y.push(C)}v.headers.push(k),k.headerGroup=v}),s.push(v),c>0&&a(y,c-1)},p=t.map((d,c)=>df(n,d,{depth:i,index:c}));a(p,i-1),s.reverse();let h=d=>d.filter(v=>v.column.getIsVisible()).map(v=>{let y=0,k=0,g=[0];v.subHeaders&&v.subHeaders.length?(g=[],h(v.subHeaders).forEach(m=>{let{colSpan:S,rowSpan:C}=m;y+=S,g.push(C)})):y=1;let f=Math.min(...g);return k=k+f,v.colSpan=y,v.rowSpan=k,{colSpan:y,rowSpan:k}});return h((l=(o=s[0])==null?void 0:o.headers)!=null?l:[]),s}var xu=(e,t,n,r,l,o,i)=>{let u={id:t,index:r,original:n,depth:l,parentId:i,_valuesCache:{},_uniqueValuesCache:{},getValue:s=>{if(u._valuesCache.hasOwnProperty(s))return u._valuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return u._valuesCache[s]=a.accessorFn(u.original,r),u._valuesCache[s]},getUniqueValues:s=>{if(u._uniqueValuesCache.hasOwnProperty(s))return u._uniqueValuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return a.columnDef.getUniqueValues?(u._uniqueValuesCache[s]=a.columnDef.getUniqueValues(u.original,r),u._uniqueValuesCache[s]):(u._uniqueValuesCache[s]=[u.getValue(s)],u._uniqueValuesCache[s])},renderValue:s=>{var a;return(a=u.getValue(s))!=null?a:e.options.renderFallbackValue},subRows:o!=null?o:[],getLeafRows:()=>np(u.subRows,s=>s.subRows),getParentRow:()=>u.parentId?e.getRow(u.parentId,!0):void 0,getParentRows:()=>{let s=[],a=u;for(;;){let p=a.getParentRow();if(!p)break;s.push(p),a=p}return s.reverse()},getAllCells:P(()=>[e.getAllLeafColumns()],s=>s.map(a=>rp(e,u,a,a.id)),F(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:P(()=>[u.getAllCells()],s=>s.reduce((a,p)=>(a[p.column.id]=p,a),{}),F(e.options,"debugRows","getAllCellsByColumnId"))};for(let s=0;s<e._features.length;s++){let a=e._features[s];a==null||a.createRow==null||a.createRow(u,e)}return u},ip={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},pf=(e,t,n)=>{var r,l;let o=n==null||(r=n.toString())==null?void 0:r.toLowerCase();return!!(!((l=e.getValue(t))==null||(l=l.toString())==null||(l=l.toLowerCase())==null)&&l.includes(o))};pf.autoRemove=e=>je(e);var mf=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};mf.autoRemove=e=>je(e);var hf=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};hf.autoRemove=e=>je(e);var vf=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};vf.autoRemove=e=>je(e)||!(e!=null&&e.length);var yf=(e,t,n)=>!n.some(r=>{var l;return!((l=e.getValue(t))!=null&&l.includes(r))});yf.autoRemove=e=>je(e)||!(e!=null&&e.length);var Sf=(e,t,n)=>n.some(r=>{var l;return(l=e.getValue(t))==null?void 0:l.includes(r)});Sf.autoRemove=e=>je(e)||!(e!=null&&e.length);var wf=(e,t,n)=>e.getValue(t)===n;wf.autoRemove=e=>je(e);var Cf=(e,t,n)=>e.getValue(t)==n;Cf.autoRemove=e=>je(e);var Pu=(e,t,n)=>{let[r,l]=n,o=e.getValue(t);return o>=r&&o<=l};Pu.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,l=typeof n!="number"?parseFloat(n):n,o=t===null||Number.isNaN(r)?-1/0:r,i=n===null||Number.isNaN(l)?1/0:l;if(o>i){let u=o;o=i,i=u}return[o,i]};Pu.autoRemove=e=>je(e)||je(e[0])&&je(e[1]);var lt={includesString:pf,includesStringSensitive:mf,equalsString:hf,arrIncludes:vf,arrIncludesAll:yf,arrIncludesSome:Sf,equals:wf,weakEquals:Cf,inNumberRange:Pu};function je(e){return e==null||e===""}var up={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:ke("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?lt.includesString:typeof r=="number"?lt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?lt.equals:Array.isArray(r)?lt.arrIncludes:lt.weakEquals},e.getFilterFn=()=>{var n,r;return Wl(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:lt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,l;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{let l=e.getFilterFn(),o=r==null?void 0:r.find(p=>p.id===e.id),i=Ft(n,o?o.value:void 0);if(gf(l,i,e)){var u;return(u=r==null?void 0:r.filter(p=>p.id!==e.id))!=null?u:[]}let s={id:e.id,value:i};if(o){var a;return(a=r==null?void 0:r.map(p=>p.id===e.id?s:p))!=null?a:[]}return r!=null&&r.length?[...r,s]:[s]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{let n=e.getAllLeafColumns(),r=l=>{var o;return(o=Ft(t,l))==null?void 0:o.filter(i=>{let u=n.find(s=>s.id===i.id);if(u){let s=u.getFilterFn();if(gf(s,i.value,u))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function gf(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t=="undefined"||typeof t=="string"&&!t}var sp=(e,t,n)=>n.reduce((r,l)=>{let o=l.getValue(e);return r+(typeof o=="number"?o:0)},0),ap=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r>o||r===void 0&&o>=o)&&(r=o)}),r},cp=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r<o||r===void 0&&o>=o)&&(r=o)}),r},fp=(e,t,n)=>{let r,l;return n.forEach(o=>{let i=o.getValue(e);i!=null&&(r===void 0?i>=i&&(r=l=i):(r>i&&(r=i),l<i&&(l=i)))}),[r,l]},dp=(e,t)=>{let n=0,r=0;if(t.forEach(l=>{let o=l.getValue(e);o!=null&&(o=+o)>=o&&(++n,r+=o)}),n)return r/n},gp=(e,t)=>{if(!t.length)return;let n=t.map(o=>o.getValue(e));if(!tp(n))return;if(n.length===1)return n[0];let r=Math.floor(n.length/2),l=n.sort((o,i)=>o-i);return n.length%2!==0?l[r]:(l[r-1]+l[r])/2},pp=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),mp=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,hp=(e,t)=>t.length,pu={sum:sp,min:ap,max:cp,extent:fp,mean:dp,median:gp,unique:pp,uniqueCount:mp,count:hp},vp={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:ke("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n!=null?n:[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{let n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return pu.sum;if(Object.prototype.toString.call(r)==="[object Date]")return pu.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return Wl(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:pu[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];let r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var l;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((l=n.subRows)!=null&&l.length)}}};function yp(e,t,n){if(!(t!=null&&t.length)||!n)return e;let r=e.filter(o=>!t.includes(o.id));return n==="remove"?r:[...t.map(o=>e.find(i=>i.id===o)).filter(Boolean),...r]}var Sp={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:ke("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=P(n=>[hr(t,n)],n=>n.findIndex(r=>r.id===e.id),F(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=hr(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;let l=hr(t,n);return((r=l[l.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=P(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>l=>{let o=[];if(!(t!=null&&t.length))o=l;else{let i=[...t],u=[...l];for(;u.length&&i.length;){let s=i.shift(),a=u.findIndex(p=>p.id===s);a>-1&&o.push(u.splice(a,1)[0])}o=[...o,...u]}return yp(o,n,r)},F(e.options,"debugTable","_getOrderColumnsFn"))}},mu=()=>({left:[],right:[]}),wp={getInitialState:e=>({columnPinning:mu(),...e}),getDefaultOptions:e=>({onColumnPinningChange:ke("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{let r=e.getLeafColumns().map(l=>l.id).filter(Boolean);t.setColumnPinning(l=>{var o,i;if(n==="right"){var u,s;return{left:((u=l==null?void 0:l.left)!=null?u:[]).filter(h=>!(r!=null&&r.includes(h))),right:[...((s=l==null?void 0:l.right)!=null?s:[]).filter(h=>!(r!=null&&r.includes(h))),...r]}}if(n==="left"){var a,p;return{left:[...((a=l==null?void 0:l.left)!=null?a:[]).filter(h=>!(r!=null&&r.includes(h))),...r],right:((p=l==null?void 0:l.right)!=null?p:[]).filter(h=>!(r!=null&&r.includes(h)))}}return{left:((o=l==null?void 0:l.left)!=null?o:[]).filter(h=>!(r!=null&&r.includes(h))),right:((i=l==null?void 0:l.right)!=null?i:[]).filter(h=>!(r!=null&&r.includes(h)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var l,o,i;return((l=r.columnDef.enablePinning)!=null?l:!0)&&((o=(i=t.options.enableColumnPinning)!=null?i:t.options.enablePinning)!=null?o:!0)}),e.getIsPinned=()=>{let n=e.getLeafColumns().map(u=>u.id),{left:r,right:l}=t.getState().columnPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"left":i?"right":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();return l?(n=(r=t.getState().columnPinning)==null||(r=r[l])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,l)=>{let o=[...r!=null?r:[],...l!=null?l:[]];return n.filter(i=>!o.includes(i.column.id))},F(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"left"})),F(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"right"})),F(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?mu():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:mu())},e.getIsSomeColumnsPinned=t=>{var n;let r=e.getState().columnPinning;if(!t){var l,o;return!!((l=r.left)!=null&&l.length||(o=r.right)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{let l=[...n!=null?n:[],...r!=null?r:[]];return t.filter(o=>!l.includes(o.id))},F(e.options,"debugColumns","getCenterLeafColumns"))}},Ul={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},hu=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Cp={getDefaultColumnDef:()=>Ul,getInitialState:e=>({columnSizing:{},columnSizingInfo:hu(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:ke("columnSizing",e),onColumnSizingInfoChange:ke("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,l;let o=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Ul.minSize,(r=o!=null?o:e.columnDef.size)!=null?r:Ul.size),(l=e.columnDef.maxSize)!=null?l:Ul.maxSize)},e.getStart=P(n=>[n,hr(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getStart")),e.getAfter=P(n=>[n,hr(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...l}=n;return l})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0,r=l=>{if(l.subHeaders.length)l.subHeaders.forEach(r);else{var o;n+=(o=l.column.getSize())!=null?o:0}};return r(e),n},e.getStart=()=>{if(e.index>0){let n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{let r=t.getColumn(e.column.id),l=r==null?void 0:r.getCanResize();return o=>{if(!r||!l||(o.persist==null||o.persist(),vu(o)&&o.touches&&o.touches.length>1))return;let i=e.getSize(),u=e?e.getLeafHeaders().map(g=>[g.column.id,g.column.getSize()]):[[r.id,r.getSize()]],s=vu(o)?Math.round(o.touches[0].clientX):o.clientX,a={},p=(g,f)=>{typeof f=="number"&&(t.setColumnSizingInfo(m=>{var S,C;let E=t.options.columnResizeDirection==="rtl"?-1:1,_=(f-((S=m==null?void 0:m.startOffset)!=null?S:0))*E,x=Math.max(_/((C=m==null?void 0:m.startSize)!=null?C:0),-.999999);return m.columnSizingStart.forEach(A=>{let[N,M]=A;a[N]=Math.round(Math.max(M+M*x,0)*100)/100}),{...m,deltaOffset:_,deltaPercentage:x}}),(t.options.columnResizeMode==="onChange"||g==="end")&&t.setColumnSizing(m=>({...m,...a})))},h=g=>p("move",g),d=g=>{p("end",g),t.setColumnSizingInfo(f=>({...f,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},c=n||typeof document!="undefined"?document:null,v={moveHandler:g=>h(g.clientX),upHandler:g=>{c==null||c.removeEventListener("mousemove",v.moveHandler),c==null||c.removeEventListener("mouseup",v.upHandler),d(g.clientX)}},y={moveHandler:g=>(g.cancelable&&(g.preventDefault(),g.stopPropagation()),h(g.touches[0].clientX),!1),upHandler:g=>{var f;c==null||c.removeEventListener("touchmove",y.moveHandler),c==null||c.removeEventListener("touchend",y.upHandler),g.cancelable&&(g.preventDefault(),g.stopPropagation()),d((f=g.touches[0])==null?void 0:f.clientX)}},k=_p()?{passive:!1}:!1;vu(o)?(c==null||c.addEventListener("touchmove",y.moveHandler,k),c==null||c.addEventListener("touchend",y.upHandler,k)):(c==null||c.addEventListener("mousemove",v.moveHandler,k),c==null||c.addEventListener("mouseup",v.upHandler,k)),t.setColumnSizingInfo(g=>({...g,startOffset:s,startSize:i,deltaOffset:0,deltaPercentage:0,columnSizingStart:u,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?hu():(n=e.initialState.columnSizingInfo)!=null?n:hu())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0}}},Gl=null;function _p(){if(typeof Gl=="boolean")return Gl;let e=!1;try{let t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch(t){e=!1}return Gl=e,Gl}function vu(e){return e.type==="touchstart"}var Rp={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:ke("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n!=null?n:!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;let l=e.columns;return(n=l.length?l.some(o=>o.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=P(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),F(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=P(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,l)=>[...n,...r,...l],F(t.options,"debugRows","getVisibleCells"))},createTable:e=>{let t=(n,r)=>P(()=>[r(),r().filter(l=>l.getIsVisible()).map(l=>l.id).join("_")],l=>l.filter(o=>o.getIsVisible==null?void 0:o.getIsVisible()),F(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((l,o)=>({...l,[o.id]:n||!(o.getCanHide!=null&&o.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function hr(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}var kp={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Ep={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:ke("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;let r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,l,o;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&((o=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?o:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>lt.includesString,e.getGlobalFilterFn=()=>{var t,n;let{globalFilterFn:r}=e.options;return Wl(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:lt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},xp={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:ke("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{(r!=null?r:!e.getIsAllRowsExpanded())?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var l,o;e.setExpanded(r?{}:(l=(o=e.initialState)==null?void 0:o.expanded)!=null?l:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{let r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{let r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(l=>!l.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(o=>{let i=o.split(".");r=Math.max(r,i.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var l;let o=r===!0?!0:!!(r!=null&&r[e.id]),i={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(u=>{i[u]=!0}):i=r,n=(l=n)!=null?l:!o,!o&&n)return{...i,[e.id]:!0};if(o&&!n){let{[e.id]:u,...s}=i;return s}return r})},e.getIsExpanded=()=>{var n;let r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,l;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((l=e.subRows)!=null&&l.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{let n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},Cu=0,_u=10,yu=()=>({pageIndex:Cu,pageSize:_u}),Pp={getInitialState:e=>({...e,pagination:{...yu(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:ke("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{let l=o=>Ft(r,o);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(l)},e.resetPagination=r=>{var l;e.setPagination(r?yu():(l=e.initialState.pagination)!=null?l:yu())},e.setPageIndex=r=>{e.setPagination(l=>{let o=Ft(r,l.pageIndex),i=typeof e.options.pageCount=="undefined"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return o=Math.max(0,Math.min(o,i)),{...l,pageIndex:o}})},e.resetPageIndex=r=>{var l,o;e.setPageIndex(r?Cu:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageIndex)!=null?l:Cu)},e.resetPageSize=r=>{var l,o;e.setPageSize(r?_u:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageSize)!=null?l:_u)},e.setPageSize=r=>{e.setPagination(l=>{let o=Math.max(1,Ft(r,l.pageSize)),i=l.pageSize*l.pageIndex,u=Math.floor(i/o);return{...l,pageIndex:u,pageSize:o}})},e.setPageCount=r=>e.setPagination(l=>{var o;let i=Ft(r,(o=e.options.pageCount)!=null?o:-1);return typeof i=="number"&&(i=Math.max(-1,i)),{...l,pageCount:i}}),e.getPageOptions=P(()=>[e.getPageCount()],r=>{let l=[];return r&&r>0&&(l=[...new Array(r)].fill(null).map((o,i)=>i)),l},F(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{let{pageIndex:r}=e.getState().pagination,l=e.getPageCount();return l===-1?!0:l===0?!1:r<l-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Su=()=>({top:[],bottom:[]}),Fp={getInitialState:e=>({rowPinning:Su(),...e}),getDefaultOptions:e=>({onRowPinningChange:ke("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,l)=>{let o=r?e.getLeafRows().map(s=>{let{id:a}=s;return a}):[],i=l?e.getParentRows().map(s=>{let{id:a}=s;return a}):[],u=new Set([...i,e.id,...o]);t.setRowPinning(s=>{var a,p;if(n==="bottom"){var h,d;return{top:((h=s==null?void 0:s.top)!=null?h:[]).filter(y=>!(u!=null&&u.has(y))),bottom:[...((d=s==null?void 0:s.bottom)!=null?d:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)]}}if(n==="top"){var c,v;return{top:[...((c=s==null?void 0:s.top)!=null?c:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)],bottom:((v=s==null?void 0:s.bottom)!=null?v:[]).filter(y=>!(u!=null&&u.has(y)))}}return{top:((a=s==null?void 0:s.top)!=null?a:[]).filter(y=>!(u!=null&&u.has(y))),bottom:((p=s==null?void 0:s.bottom)!=null?p:[]).filter(y=>!(u!=null&&u.has(y)))}})},e.getCanPin=()=>{var n;let{enableRowPinning:r,enablePinning:l}=t.options;return typeof r=="function"?r(e):(n=r!=null?r:l)!=null?n:!0},e.getIsPinned=()=>{let n=[e.id],{top:r,bottom:l}=t.getState().rowPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"top":i?"bottom":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();if(!l)return-1;let o=(n=l==="top"?t.getTopRows():t.getBottomRows())==null?void 0:n.map(i=>{let{id:u}=i;return u});return(r=o==null?void 0:o.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Su():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Su())},e.getIsSomeRowsPinned=t=>{var n;let r=e.getState().rowPinning;if(!t){var l,o;return!!((l=r.top)!=null&&l.length||(o=r.bottom)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=(t,n,r)=>{var l;return((l=e.options.keepPinnedRows)==null||l?(n!=null?n:[]).map(i=>{let u=e.getRow(i,!0);return u.getIsAllParentsExpanded()?u:null}):(n!=null?n:[]).map(i=>t.find(u=>u.id===i))).filter(Boolean).map(i=>({...i,position:r}))},e.getTopRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(t,n)=>e._getPinnedRows(t,n,"top"),F(e.options,"debugRows","getTopRows")),e.getBottomRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(t,n)=>e._getPinnedRows(t,n,"bottom"),F(e.options,"debugRows","getBottomRows")),e.getCenterRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{let l=new Set([...n!=null?n:[],...r!=null?r:[]]);return t.filter(o=>!l.has(o.id))},F(e.options,"debugRows","getCenterRows"))}},Mp={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:ke("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t!="undefined"?t:!e.getIsAllRowsSelected();let r={...n},l=e.getPreGroupedRowModel().flatRows;return t?l.forEach(o=>{o.getCanSelect()&&(r[o.id]=!0)}):l.forEach(o=>{delete r[o.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{let r=typeof t!="undefined"?t:!e.getIsAllPageRowsSelected(),l={...n};return e.getRowModel().rows.forEach(o=>{Ru(l,o.id,r,!0,e)}),l}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=P(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=P(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=P(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{let t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState(),r=!!(t.length&&Object.keys(n).length);return r&&t.some(l=>l.getCanSelect()&&!n[l.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows.filter(l=>l.getCanSelect()),{rowSelection:n}=e.getState(),r=!!t.length;return r&&t.some(l=>!n[l.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;let n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{let l=e.getIsSelected();t.setRowSelection(o=>{var i;if(n=typeof n!="undefined"?n:!l,e.getCanSelect()&&l===n)return o;let u={...o};return Ru(u,e.id,n,(i=r==null?void 0:r.selectChildren)!=null?i:!0,t),u})},e.getIsSelected=()=>{let{rowSelection:n}=t.getState();return Fu(e,n)},e.getIsSomeSelected=()=>{let{rowSelection:n}=t.getState();return ku(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{let{rowSelection:n}=t.getState();return ku(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{let n=e.getCanSelect();return r=>{var l;n&&e.toggleSelected((l=r.target)==null?void 0:l.checked)}}}},Ru=(e,t,n,r,l)=>{var o;let i=l.getRow(t,!0);n?(i.getCanMultiSelect()||Object.keys(e).forEach(u=>delete e[u]),i.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(o=i.subRows)!=null&&o.length&&i.getCanSelectSubRows()&&i.subRows.forEach(u=>Ru(e,u.id,n,r,l))};function wu(e,t){let n=e.getState().rowSelection,r=[],l={},o=function(i,u){return i.map(s=>{var a;let p=Fu(s,n);if(p&&(r.push(s),l[s.id]=s),(a=s.subRows)!=null&&a.length&&(s={...s,subRows:o(s.subRows)}),p)return s}).filter(Boolean)};return{rows:o(t.rows),flatRows:r,rowsById:l}}function Fu(e,t){var n;return(n=t[e.id])!=null?n:!1}function ku(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let l=!0,o=!1;return e.subRows.forEach(i=>{if(!(o&&!l)&&(i.getCanSelect()&&(Fu(i,t)?o=!0:l=!1),i.subRows&&i.subRows.length)){let u=ku(i,t);u==="all"?o=!0:(u==="some"&&(o=!0),l=!1)}}),l?"all":o?"some":!1}var Eu=/([0-9]+)/gm,Ip=(e,t,n)=>_f(Mt(e.getValue(n)).toLowerCase(),Mt(t.getValue(n)).toLowerCase()),zp=(e,t,n)=>_f(Mt(e.getValue(n)),Mt(t.getValue(n))),Np=(e,t,n)=>Mu(Mt(e.getValue(n)).toLowerCase(),Mt(t.getValue(n)).toLowerCase()),Lp=(e,t,n)=>Mu(Mt(e.getValue(n)),Mt(t.getValue(n))),Vp=(e,t,n)=>{let r=e.getValue(n),l=t.getValue(n);return r>l?1:r<l?-1:0},Dp=(e,t,n)=>Mu(e.getValue(n),t.getValue(n));function Mu(e,t){return e===t?0:e>t?1:-1}function Mt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function _f(e,t){let n=e.split(Eu).filter(Boolean),r=t.split(Eu).filter(Boolean);for(;n.length&&r.length;){let l=n.shift(),o=r.shift(),i=parseInt(l,10),u=parseInt(o,10),s=[i,u].sort();if(isNaN(s[0])){if(l>o)return 1;if(o>l)return-1;continue}if(isNaN(s[1]))return isNaN(i)?-1:1;if(i>u)return 1;if(u>i)return-1}return n.length-r.length}var mr={alphanumeric:Ip,alphanumericCaseSensitive:zp,text:Np,textCaseSensitive:Lp,datetime:Vp,basic:Dp},$p={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:ke("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{let n=t.getFilteredRowModel().flatRows.slice(10),r=!1;for(let l of n){let o=l==null?void 0:l.getValue(e.id);if(Object.prototype.toString.call(o)==="[object Date]")return mr.datetime;if(typeof o=="string"&&(r=!0,o.split(Eu).length>1))return mr.alphanumeric}return r?mr.text:mr.basic},e.getAutoSortDir=()=>{let n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return Wl(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:mr[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{let l=e.getNextSortingOrder(),o=typeof n!="undefined"&&n!==null;t.setSorting(i=>{let u=i==null?void 0:i.find(c=>c.id===e.id),s=i==null?void 0:i.findIndex(c=>c.id===e.id),a=[],p,h=o?n:l==="desc";if(i!=null&&i.length&&e.getCanMultiSort()&&r?u?p="toggle":p="add":i!=null&&i.length&&s!==i.length-1?p="replace":u?p="toggle":p="replace",p==="toggle"&&(o||l||(p="remove")),p==="add"){var d;a=[...i,{id:e.id,desc:h}],a.splice(0,a.length-((d=t.options.maxMultiSortColCount)!=null?d:Number.MAX_SAFE_INTEGER))}else p==="toggle"?a=i.map(c=>c.id===e.id?{...c,desc:h}:c):p==="remove"?a=i.filter(c=>c.id!==e.id):a=[{id:e.id,desc:h}];return a})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,l;let o=e.getFirstSortDir(),i=e.getIsSorted();return i?i!==o&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(l=t.options.enableMultiRemove)!=null)||l)?!1:i==="desc"?"asc":"desc":o},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;let r=(n=t.getState().sorting)==null?void 0:n.find(l=>l.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{let n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Tp=[op,Rp,Sp,wp,ip,up,kp,Ep,$p,vp,xp,Pp,Fp,Mp,Cp];function Rf(e){var t,n;let r=[...Tp,...(t=e._features)!=null?t:[]],l={_features:r},o=l._features.reduce((d,c)=>Object.assign(d,c.getDefaultOptions==null?void 0:c.getDefaultOptions(l)),{}),i=d=>l.options.mergeOptions?l.options.mergeOptions(o,d):{...o,...d},s={...{},...(n=e.initialState)!=null?n:{}};l._features.forEach(d=>{var c;s=(c=d.getInitialState==null?void 0:d.getInitialState(s))!=null?c:s});let a=[],p=!1,h={_features:r,options:{...o,...e},initialState:s,_queue:d=>{a.push(d),p||(p=!0,Promise.resolve().then(()=>{for(;a.length;)a.shift()();p=!1}).catch(c=>setTimeout(()=>{throw c})))},reset:()=>{l.setState(l.initialState)},setOptions:d=>{let c=Ft(d,l.options);l.options=i(c)},getState:()=>l.options.state,setState:d=>{l.options.onStateChange==null||l.options.onStateChange(d)},_getRowId:(d,c,v)=>{var y;return(y=l.options.getRowId==null?void 0:l.options.getRowId(d,c,v))!=null?y:\`\${v?[v.id,c].join("."):c}\`},getCoreRowModel:()=>(l._getCoreRowModel||(l._getCoreRowModel=l.options.getCoreRowModel(l)),l._getCoreRowModel()),getRowModel:()=>l.getPaginationRowModel(),getRow:(d,c)=>{let v=(c?l.getPrePaginationRowModel():l.getRowModel()).rowsById[d];if(!v&&(v=l.getCoreRowModel().rowsById[d],!v))throw new Error;return v},_getDefaultColumnDef:P(()=>[l.options.defaultColumn],d=>{var c;return d=(c=d)!=null?c:{},{header:v=>{let y=v.header.column.columnDef;return y.accessorKey?y.accessorKey:y.accessorFn?y.id:null},cell:v=>{var y,k;return(y=(k=v.renderValue())==null||k.toString==null?void 0:k.toString())!=null?y:null},...l._features.reduce((v,y)=>Object.assign(v,y.getDefaultColumnDef==null?void 0:y.getDefaultColumnDef()),{}),...d}},F(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>l.options.columns,getAllColumns:P(()=>[l._getColumnDefs()],d=>{let c=function(v,y,k){return k===void 0&&(k=0),v.map(g=>{let f=lp(l,g,k,y),m=g;return f.columns=m.columns?c(m.columns,f,k+1):[],f})};return c(d)},F(e,"debugColumns","getAllColumns")),getAllFlatColumns:P(()=>[l.getAllColumns()],d=>d.flatMap(c=>c.getFlatColumns()),F(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:P(()=>[l.getAllFlatColumns()],d=>d.reduce((c,v)=>(c[v.id]=v,c),{}),F(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:P(()=>[l.getAllColumns(),l._getOrderColumnsFn()],(d,c)=>{let v=d.flatMap(y=>y.getLeafColumns());return c(v)},F(e,"debugColumns","getAllLeafColumns")),getColumn:d=>l._getAllFlatColumnsById()[d]};Object.assign(l,h);for(let d=0;d<l._features.length;d++){let c=l._features[d];c==null||c.createTable==null||c.createTable(l)}return l}function kf(){return e=>P(()=>[e.options.data],t=>{let n={rows:[],flatRows:[],rowsById:{}},r=function(l,o,i){o===void 0&&(o=0);let u=[];for(let a=0;a<l.length;a++){let p=xu(e,e._getRowId(l[a],a,i),l[a],a,o,void 0,i==null?void 0:i.id);if(n.flatRows.push(p),n.rowsById[p.id]=p,u.push(p),e.options.getSubRows){var s;p.originalSubRows=e.options.getSubRows(l[a],a),(s=p.originalSubRows)!=null&&s.length&&(p.subRows=r(p.originalSubRows,o+1,p))}}return u};return n.rows=r(t),n},F(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Op(e){let t=[],n=r=>{var l;t.push(r),(l=r.subRows)!=null&&l.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Hp(e,t,n){return n.options.filterFromLeafRows?Ap(e,t,n):jp(e,t,n)}function Ap(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){var h;let c=s[d],v=xu(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);if(v.columnFilters=c.columnFilters,(h=c.subRows)!=null&&h.length&&a<i){if(v.subRows=u(c.subRows,a+1),c=v,t(c)&&!v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}if(t(c)||v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}}else c=v,t(c)&&(p.push(c),o[c.id]=c,l.push(c))}return p};return{rows:u(e),flatRows:l,rowsById:o}}function jp(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){let c=s[d];if(t(c)){var h;if((h=c.subRows)!=null&&h.length&&a<i){let y=xu(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);y.subRows=u(c.subRows,a+1),c=y}p.push(c),l.push(c),o[c.id]=c}}return p};return{rows:u(e),flatRows:l,rowsById:o}}function Ef(){return e=>P(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let d=0;d<t.flatRows.length;d++)t.flatRows[d].columnFilters={},t.flatRows[d].columnFiltersMeta={};return t}let l=[],o=[];(n!=null?n:[]).forEach(d=>{var c;let v=e.getColumn(d.id);if(!v)return;let y=v.getFilterFn();y&&l.push({id:d.id,filterFn:y,resolvedValue:(c=y.resolveFilterValue==null?void 0:y.resolveFilterValue(d.value))!=null?c:d.value})});let i=(n!=null?n:[]).map(d=>d.id),u=e.getGlobalFilterFn(),s=e.getAllLeafColumns().filter(d=>d.getCanGlobalFilter());r&&u&&s.length&&(i.push("__global__"),s.forEach(d=>{var c;o.push({id:d.id,filterFn:u,resolvedValue:(c=u.resolveFilterValue==null?void 0:u.resolveFilterValue(r))!=null?c:r})}));let a,p;for(let d=0;d<t.flatRows.length;d++){let c=t.flatRows[d];if(c.columnFilters={},l.length)for(let v=0;v<l.length;v++){a=l[v];let y=a.id;c.columnFilters[y]=a.filterFn(c,y,a.resolvedValue,k=>{c.columnFiltersMeta[y]=k})}if(o.length){for(let v=0;v<o.length;v++){p=o[v];let y=p.id;if(p.filterFn(c,y,p.resolvedValue,k=>{c.columnFiltersMeta[y]=k})){c.columnFilters.__global__=!0;break}}c.columnFilters.__global__!==!0&&(c.columnFilters.__global__=!1)}}let h=d=>{for(let c=0;c<i.length;c++)if(d.columnFilters[i[c]]===!1)return!1;return!0};return Hp(t.rows,h,e)},F(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function xf(e){return t=>P(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;let{pageSize:l,pageIndex:o}=n,{rows:i,flatRows:u,rowsById:s}=r,a=l*o,p=a+l;i=i.slice(a,p);let h;t.options.paginateExpandedRows?h={rows:i,flatRows:u,rowsById:s}:h=Op({rows:i,flatRows:u,rowsById:s}),h.flatRows=[];let d=c=>{h.flatRows.push(c),c.subRows.length&&c.subRows.forEach(d)};return h.rows.forEach(d),h},F(t.options,"debugTable","getPaginationRowModel"))}function Pf(){return e=>P(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;let r=e.getState().sorting,l=[],o=r.filter(s=>{var a;return(a=e.getColumn(s.id))==null?void 0:a.getCanSort()}),i={};o.forEach(s=>{let a=e.getColumn(s.id);a&&(i[s.id]={sortUndefined:a.columnDef.sortUndefined,invertSorting:a.columnDef.invertSorting,sortingFn:a.getSortingFn()})});let u=s=>{let a=s.map(p=>({...p}));return a.sort((p,h)=>{for(let c=0;c<o.length;c+=1){var d;let v=o[c],y=i[v.id],k=y.sortUndefined,g=(d=v==null?void 0:v.desc)!=null?d:!1,f=0;if(k){let m=p.getValue(v.id),S=h.getValue(v.id),C=m===void 0,E=S===void 0;if(C||E){if(k==="first")return C?-1:1;if(k==="last")return C?1:-1;f=C&&E?0:C?k:-k}}if(f===0&&(f=y.sortingFn(p,h,v.id)),f!==0)return g&&(f*=-1),y.invertSorting&&(f*=-1),f}return p.index-h.index}),a.forEach(p=>{var h;l.push(p),(h=p.subRows)!=null&&h.length&&(p.subRows=u(p.subRows))}),a};return{rows:u(n.rows),flatRows:l,rowsById:n.rowsById}},F(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}function Ql(e,t){return e?Bp(e)?vr.createElement(e,t):e:null}function Bp(e){return Up(e)||typeof e=="function"||Gp(e)}function Up(e){return typeof e=="function"&&(()=>{let t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Gp(e){return typeof e=="object"&&typeof e.$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$typeof.description)}function Ff(e){let t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=vr.useState(()=>({current:Rf(t)})),[r,l]=vr.useState(()=>n.current.initialState);return n.current.setOptions(o=>({...o,...e,state:{...r,...e.state},onStateChange:i=>{l(i),e.onStateChange==null||e.onStateChange(i)}})),n.current}var I=Ee.default.createElement;function Wp(){return I("span",{className:"th-sort-icon","aria-hidden":"true"},I("svg",{className:"sort-up",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 0 8 5H0z"})),I("svg",{className:"sort-down",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 5 0 0h8z"})))}function Qp(e,t){let n=[];return t&&n.push({id:"select",header:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.table.getIsAllPageRowsSelected(),ref:function(l){l&&(l.indeterminate=r.table.getIsSomePageRowsSelected()&&!r.table.getIsAllPageRowsSelected())},onChange:r.table.getToggleAllPageRowsSelectedHandler(),"aria-label":"\\u5168\\u9009\\u5F53\\u524D\\u9875"})},cell:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.row.getIsSelected(),onChange:r.row.getToggleSelectedHandler(),"aria-label":"\\u9009\\u62E9\\u884C"})},enableSorting:!1,enableGlobalFilter:!1}),(e||[]).forEach(function(r){n.push({accessorKey:r.key,header:r.label,enableSorting:r.sortable!==!1,meta:{badge:r.badge,mono:r.mono,numeric:r.numeric,key:r.key,compact:r.compact,wrap:r.wrap},cell:function(l){var o=l.getValue(),i=l.column.columnDef.meta||{};if(i.badge)return I("span",{className:"badge"},o!=null?String(o):"");if(i.numeric&&o!=null&&o!==""){if(i.key==="weight")return String(o);var u=Number(o);return u!==u?String(o):Math.abs(u%1)<1e-9?String(Math.round(u)):String(Math.round(u*100)/100)}return i.mono?o!=null?String(o):"":r.link?I("button",{type:"button",className:"org-name-btn",onClick:r.onLinkClick?function(){r.onLinkClick(l.row.original)}:void 0},o!=null?String(o):""):o!=null?String(o):""}})}),n}function zf(){try{if(window.__cqDtRoot&&typeof window.__cqDtRoot.getElementById=="function")return window.__cqDtRoot}catch(e){}return document}function Kp(e){var t=e.columnDefs,n=e.data||[],r=e.pageSize||10,l=e.filterPlaceholder||"\\u641C\\u7D22\\u5168\\u90E8\\u5217\\u2026",o=!!e.selectable,i=e.selectedIds||{},u=(0,Ee.useState)([]),s=u[0],a=u[1],p=(0,Ee.useState)([]),h=p[0],d=p[1],c=(0,Ee.useState)(""),v=c[0],y=c[1],k=(0,Ee.useState)({}),g=k[0],f=k[1],m=(0,Ee.useState)({pageIndex:0,pageSize:r}),S=m[0],C=m[1];(0,Ee.useEffect)(function(){if(o){var M={};Object.keys(i).forEach(function(T){i[T]&&(M[T]=!0)}),f(M)}},[i,o]);var E=(0,Ee.useMemo)(function(){return Qp(t,o)},[t,o]),_=Ff({data:n,columns:E,state:{sorting:s,columnFilters:h,globalFilter:v,rowSelection:g,pagination:S},enableRowSelection:o,getRowId:function(M,T){return M._rowId!=null?String(M._rowId):M.id!=null?String(M.id):M.no!=null?String(M.no):M.code!=null?String(M.code):M._idx!=null?String(M._idx):String(T)},onSortingChange:a,onColumnFiltersChange:d,onGlobalFilterChange:y,onRowSelectionChange:function(M){f(function(T){var he=typeof M=="function"?M(T):M;return e.onSelectionChange&&e.onSelectionChange(he),he})},onPaginationChange:C,getCoreRowModel:kf(),getSortedRowModel:Pf(),getFilteredRowModel:Ef(),getPaginationRowModel:xf(),globalFilterFn:"includesString"}),x=I(Ee.default.Fragment,null,I("input",{className:"dt-filter-input",type:"search",placeholder:l,value:v!=null?v:"",onChange:function(M){y(M.target.value)}}),I("span",{className:"dt-meta"},"\\u5171 "+n.length+" \\u6761 \\xB7 \\u7B5B\\u9009\\u540E "+_.getFilteredRowModel().rows.length+" \\u6761")),A=null;try{e.filterHostId&&(A=zf().getElementById(e.filterHostId))}catch(M){}var N=A?(0,If.createPortal)(x,A):I("div",{className:"dt-toolbar"},x);return I("div",{className:"data-table"},N,I("div",{className:"table-wrap dt-table-wrap"},I("table",{className:"table"},I("thead",null,_.getHeaderGroups().map(function(M){return I("tr",{key:M.id},M.headers.map(function(T){var he=T.column.columnDef.meta||{},ve=T.column.getCanSort(),Iu=T.column.getIsSorted(),it=(ve?"th-sort":"")+(Iu?" is-"+Iu:"");return T.id==="select"?it="th-chk":he.wrap?it=(it?it+" ":"")+"th-wrap":(he.compact||he.numeric||he.badge)&&(it=(it?it+" ":"")+"th-compact"),I("th",{key:T.id,className:it,onClick:ve?T.column.getToggleSortingHandler():void 0},ve?I("span",{className:"th-sort-inner"},Ql(T.column.columnDef.header,T.getContext()),I(Wp,null)):Ql(T.column.columnDef.header,T.getContext()))}))})),I("tbody",null,_.getRowModel().rows.length?_.getRowModel().rows.map(function(M){return I("tr",{key:M.id},M.getVisibleCells().map(function(T){var he=T.column.columnDef.meta||{},ve="";return T.column.id==="select"?ve="td-chk":he.mono&&(ve="cfg"),he.wrap?ve=ve?ve+" td-wrap":"td-wrap":(he.compact||he.numeric||he.badge)&&(ve=ve?ve+" td-compact":"td-compact"),I("td",{key:T.id,className:ve},Ql(T.column.columnDef.cell,T.getContext()))}))}):I("tr",null,I("td",{colSpan:E.length,className:"dt-empty"},"\\u6682\\u65E0\\u6570\\u636E"))))),I("div",{className:"dt-pagination"},I("span",{className:"dt-page-info"},"\\u7B2C "+(_.getState().pagination.pageIndex+1)+" / "+Math.max(1,_.getPageCount())+" \\u9875"),I("span",{className:"org-pager"},I("button",{className:"icon-btn sm",type:"button",disabled:!_.getCanPreviousPage(),onClick:function(){_.previousPage()},"aria-label":"\\u4E0A\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m15 18-6-6 6-6"}))),I("select",{className:"dt-page-size",value:String(_.getState().pagination.pageSize),onChange:function(M){_.setPageSize(Number(M.target.value))},"aria-label":"\\u6BCF\\u9875\\u6761\\u6570"},[10,20,50,100].map(function(M){return I("option",{key:M,value:String(M)},M+"\\u6761/\\u9875")})),I("button",{className:"icon-btn sm",type:"button",disabled:!_.getCanNextPage(),onClick:function(){_.nextPage()},"aria-label":"\\u4E0B\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m9 18 6-6-6-6"}))))))}var ot={};function Xp(e,t,n,r,l){var o=zf().getElementById(t);if(!o)return;if(ot[e]){try{ot[e].root.unmount()}catch(p){}delete ot[e];try{o.innerHTML=""}catch(p){}}var i=r||[],u=l||{},s=(0,Mf.createRoot)(o);function a(p,h){p&&(i=p),h&&(u=Object.assign({},u,h)),s.render(I(Kp,{columnDefs:n,data:i,pageSize:u.pageSize,filterPlaceholder:u.filterPlaceholder,selectable:u.selectable,selectedIds:u.selectedIds,onSelectionChange:u.onSelectionChange,filterHostId:u.filterHostId}))}ot[e]={render:a,root:s},a(r,l)}window.__cqDataTable={mount:Xp,setData:function(e,t,n){ot[e]&&ot[e].render(t,n)},unmountAll:function(){Object.keys(ot).forEach(function(e){try{ot[e].root.unmount()}catch(t){}delete ot[e]})}};typeof window.__CQ_TABLE_BOOT=="function"&&window.__CQ_TABLE_BOOT();})();
`;
    const ROOT_ID = "shadcn-hello-inject-root";
    var oldRoot = document.getElementById(ROOT_ID);
    if (oldRoot) oldRoot.remove();

    const iframe = document.createElement("iframe");
    iframe.id = ROOT_ID;
    iframe.title = "shadcn Hello World";
    Object.assign(iframe.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        border: "0",
        zIndex: "2147483647",
        background: "transparent",
    });
    (document.documentElement || document.body).appendChild(iframe);

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>列表编辑页面</title>
    <style>
        :root {
            --background: oklch(1 0 0);
            --foreground: oklch(0.145 0 0);
            --card: oklch(1 0 0);
            --card-foreground: oklch(0.145 0 0);
            --popover: oklch(1 0 0);
            --popover-foreground: oklch(0.145 0 0);
            --primary: oklch(0.505 0.213 27.518);
            --primary-foreground: oklch(0.971 0.013 17.38);
            --secondary: oklch(0.967 0.001 286.375);
            --secondary-foreground: oklch(0.21 0.006 285.885);
            --muted: oklch(0.97 0 0);
            --muted-foreground: oklch(0.556 0 0);
            --accent: oklch(0.97 0 0);
            --accent-foreground: oklch(0.205 0 0);
            --destructive: oklch(0.577 0.245 27.325);
            --border: oklch(0.922 0 0);
            --input: oklch(0.922 0 0);
            --ring: oklch(0.708 0 0);
            --chart-1: oklch(0.808 0.114 19.571);
            --chart-2: oklch(0.637 0.237 25.331);
            --chart-3: oklch(0.577 0.245 27.325);
            --chart-4: oklch(0.505 0.213 27.518);
            --chart-5: oklch(0.444 0.177 26.899);
            --radius: 0.625rem;
            --sidebar: oklch(0.985 0 0);
            --sidebar-foreground: oklch(0.145 0 0);
            --sidebar-primary: oklch(0.577 0.245 27.325);
            --sidebar-primary-foreground: oklch(0.971 0.013 17.38);
            --sidebar-accent: oklch(0.97 0 0);
            --sidebar-accent-foreground: oklch(0.205 0 0);
            --sidebar-border: oklch(0.922 0 0);
            --sidebar-ring: oklch(0.708 0 0);
            --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
            --font-mono: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            --font-size: 14px;
            --text-xs: calc(var(--font-size) * 0.75);
            --text-sm: calc(var(--font-size) * 0.875);
            --text-base: var(--font-size);
            --text-lg: calc(var(--font-size) * 1.125);
            --text-xl: calc(var(--font-size) * 1.25);
            --text-2xl: calc(var(--font-size) * 1.5);
            --dt-col-min: 6.5rem;
            --dt-col-max: 22rem;
            font-family: var(--font-sans);
            font-size: var(--font-size);
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }

        .dark {
            --background: #0a0a0a;
            --foreground: oklch(0.985 0 0);
            --card: oklch(0.205 0 0);
            --card-foreground: oklch(0.985 0 0);
            --popover: oklch(0.205 0 0);
            --popover-foreground: oklch(0.985 0 0);
            --primary: oklch(0.444 0.177 26.899);
            --primary-foreground: oklch(0.971 0.013 17.38);
            --secondary: oklch(0.274 0.006 286.033);
            --secondary-foreground: oklch(0.985 0 0);
            --muted: oklch(0.269 0 0);
            --muted-foreground: oklch(0.708 0 0);
            --accent: oklch(0.269 0 0);
            --accent-foreground: oklch(0.985 0 0);
            --destructive: oklch(0.704 0.191 22.216);
            --border: oklch(1 0 0 / 10%);
            --input: oklch(1 0 0 / 15%);
            --ring: oklch(0.556 0 0);
            --chart-1: oklch(0.808 0.114 19.571);
            --chart-2: oklch(0.637 0.237 25.331);
            --chart-3: oklch(0.577 0.245 27.325);
            --chart-4: oklch(0.505 0.213 27.518);
            --chart-5: oklch(0.444 0.177 26.899);
            --sidebar: oklch(0.205 0 0);
            --sidebar-foreground: oklch(0.985 0 0);
            --sidebar-primary: oklch(0.637 0.237 25.331);
            --sidebar-primary-foreground: oklch(0.971 0.013 17.38);
            --sidebar-accent: oklch(0.269 0 0);
            --sidebar-accent-foreground: oklch(0.985 0 0);
            --sidebar-border: oklch(1 0 0 / 10%);
            --sidebar-ring: oklch(0.556 0 0);
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html,
        body {
            height: 100%;
            font-family: var(--font-sans);
            font-size: var(--font-size);
            line-height: 1.5;
            background: var(--background);
            color: var(--foreground);
            -webkit-font-smoothing: antialiased;
        }

        .page {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 0;
            font-family: var(--font-sans);
            font-size: var(--text-sm);
            line-height: 1.5;
            color: var(--foreground);
            background:
                radial-gradient(1200px 600px at 50% -10%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 60%),
                var(--background);
        }

        .page > * {
            position: relative;
            z-index: 1;
        }

        .app-shell {
            flex: 1;
            min-height: 0;
            display: flex;
            align-items: stretch;
        }

        .sidebar {
            width: 220px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--sidebar-border);
            background: color-mix(in oklch, var(--sidebar) 92%, transparent);
            backdrop-filter: blur(16px) saturate(1.1);
            -webkit-backdrop-filter: blur(16px) saturate(1.1);
        }

        .sidebar-brand {
            padding: 20px 16px 14px;
            border-bottom: 1px solid var(--sidebar-border);
        }

        .sidebar-title {
            display: block;
            font-size: var(--text-base);
            font-weight: 600;
            letter-spacing: -.02em;
            color: var(--sidebar-foreground);
            line-height: 1.3;
        }

        .sidebar-sub {
            display: block;
            margin-top: 2px;
            font-size: var(--text-xs);
            color: var(--muted-foreground);
        }

        .sidebar-nav {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 10px;
            overflow: auto;
        }

        .nav-item {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            min-height: 38px;
            padding: 0 12px 0 14px;
            border: none;
            border-radius: calc(var(--radius) - 4px);
            background: transparent;
            color: var(--sidebar-foreground);
            font: inherit;
            font-size: var(--text-sm);
            font-weight: 500;
            text-align: left;
            cursor: pointer;
            transition: background .15s, color .15s;
        }

        .nav-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 3px;
            height: 0;
            border-radius: 0 2px 2px 0;
            background: var(--sidebar-primary);
            transform: translateY(-50%);
            transition: height .15s;
        }

        .nav-item:hover {
            background: var(--sidebar-accent);
            color: var(--sidebar-accent-foreground);
        }

        .nav-item.is-active {
            background: color-mix(in oklch, var(--sidebar-primary) 12%, var(--sidebar-accent));
            color: var(--sidebar-accent-foreground);
        }

        .nav-item.is-active::before {
            height: 18px;
        }

        .nav-group-label {
            padding: 10px 14px 4px;
            font-size: var(--text-xs);
            font-weight: 600;
            letter-spacing: .06em;
            color: var(--muted-foreground);
            user-select: none;
        }

        .readonly-hint {
            flex-shrink: 0;
            font-size: var(--text-sm);
            color: var(--muted-foreground);
            line-height: 1.5;
            padding: 8px 12px;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            background: color-mix(in oklch, var(--muted) 40%, transparent);
        }

        .org-view-split {
            flex: 1;
            min-height: 0;
        }

        .org-view-split .org-tree-row {
            cursor: default;
        }

        .org-view-table-wrap {
            flex: 1;
            border: none;
            border-radius: 0;
            border-top: 1px solid var(--border);
        }

        .sidebar-foot {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 14px;
            border-top: 1px solid var(--sidebar-border);
        }

        .main {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 18px 22px 14px;
        }

        .main-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-shrink: 0;
        }

        .main-title {
            font-size: var(--text-xl);
            font-weight: 600;
            letter-spacing: -.025em;
            line-height: 1.2;
        }

        /* DeepSeek Harness 暗色：#0a0a0a + 钢蓝体积光 + 极淡网格（边缘淡出） */
        .dark .page {
            background-color: #0a0a0a;
            background-image: none;
            overflow: hidden;
        }
        .dark .page::before,
        .dark .page::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
        }
        .dark .page::before {
            background:
                radial-gradient(ellipse 90% 70% at 58% 32%, rgba(118, 142, 186, 0.22) 0%, transparent 58%),
                radial-gradient(ellipse 55% 45% at 18% 78%, rgba(70, 90, 130, 0.12) 0%, transparent 55%),
                radial-gradient(ellipse 50% 35% at 82% 88%, rgba(90, 110, 150, 0.08) 0%, transparent 50%);
        }
        .dark .page::after {
            background-image:
                linear-gradient(to right, rgba(186, 204, 230, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(186, 204, 230, 0.08) 1px, transparent 1px);
            background-size: 90px 90px;
            opacity: 0.32;
            -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 12%, transparent 72%);
            mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 12%, transparent 72%);
        }

        .page-title {
            font-size: var(--text-2xl);
            font-weight: 600;
            letter-spacing: -.025em;
            line-height: 1.2;
        }

        .tab-panels {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .tab-panel {
            flex: 1;
            min-height: 0;
            display: none;
            flex-direction: column;
            gap: 10px;
        }

        .tab-panel.is-active {
            display: flex;
        }

        .data-table {
            flex: 1;
            min-width: 0;
            min-height: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
        }

        .data-table-mount {
            flex: 1;
            min-width: 0;
            min-height: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
        }

        .dt-toolbar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
            flex-shrink: 0;
        }

        .dt-filter-input {
            width: 220px;
            max-width: 100%;
            flex: 0 0 auto;
            height: 32px;
            padding: 0 10px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            font: inherit;
            font-size: var(--text-sm);
        }

        .dt-filter-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--background), 0 0 0 4px color-mix(in oklch, var(--ring) 30%, transparent);
        }

        .dt-meta {
            font-size: var(--text-sm);
            color: var(--muted-foreground);
            white-space: nowrap;
        }

        .dt-table-wrap {
            flex: 1;
            min-width: 0;
            min-height: 0;
        }

        .dt-pagination {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            flex-shrink: 0;
            padding-top: 2px;
        }

        .dt-page-info {
            font-size: var(--text-sm);
            color: var(--muted-foreground);
        }

        .dt-page-size {
            height: 28px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            font-size: var(--text-sm);
            padding: 0 6px;
        }

        .dt-empty {
            text-align: center;
            color: var(--muted-foreground);
            padding: 24px 12px !important;
        }

        .org-dialog-dt {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .table th.th-sort {
            cursor: pointer;
            user-select: none;
        }

        .table th.th-sort:hover {
            background: color-mix(in oklch, var(--accent) 65%, transparent);
        }

        .th-sort-inner {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
        }

        .th-sort-icon {
            display: inline-flex;
            flex-direction: column;
            gap: 1px;
            opacity: .35;
            line-height: 0;
        }

        .th-sort.is-asc .th-sort-icon,
        .th-sort.is-desc .th-sort-icon {
            opacity: 1;
            color: var(--primary);
        }

        .th-sort.is-asc .sort-down,
        .th-sort.is-desc .sort-up,
        .th-sort:not(.is-asc):not(.is-desc) .sort-up,
        .th-sort:not(.is-asc):not(.is-desc) .sort-down {
            opacity: .2;
        }

        .th-sort.is-asc .sort-up {
            opacity: 1;
        }

        .th-sort.is-desc .sort-down {
            opacity: 1;
        }

        .toolbar {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            column-gap: 12px;
            row-gap: 8px;
            flex-shrink: 0;
        }

        .toolbar-actions {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            min-width: 0;
        }

        .toolbar-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
        }

        .icon-btn {
            width: 32px;
            height: 32px;
            border-radius: calc(var(--radius) - 2px);
            border: 1px solid var(--border);
            background: var(--background);
            color: var(--foreground);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background .15s, color .15s, border-color .15s;
        }

        .icon-btn:hover {
            background: var(--accent);
            color: var(--accent-foreground);
        }

        .icon-btn .icon-sun {
            display: none;
        }

        .dark .icon-btn .icon-sun {
            display: block;
        }

        .dark .icon-btn .icon-moon {
            display: none;
        }

        /* mira Badge — default */
        .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 9999px;
            border: 1px solid transparent;
            padding: 2px 9px;
            font-size: var(--text-xs);
            font-weight: 600;
            line-height: 1.35;
            width: fit-content;
            background: var(--primary);
            color: var(--primary-foreground);
        }

        /* mira Button */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            white-space: nowrap;
            border-radius: calc(var(--radius) - 2px);
            font-size: var(--text-sm);
            font-weight: 500;
            height: 32px;
            padding: 0 14px;
            border: 1px solid transparent;
            cursor: pointer;
            transition: background .15s, color .15s, border-color .15s, opacity .15s;
        }

        .btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--background), 0 0 0 4px color-mix(in oklch, var(--ring) 30%, transparent);
        }

        .btn:disabled {
            pointer-events: none;
            opacity: .5;
        }

        .btn-default {
            background: var(--primary);
            color: var(--primary-foreground);
        }

        .btn-default:hover {
            background: color-mix(in oklch, var(--primary) 80%, transparent);
        }

        .btn-outline {
            background: transparent;
            border-color: var(--border);
            color: var(--foreground);
        }

        .dark .btn-outline {
            background: color-mix(in oklch, var(--input) 30%, transparent);
        }

        .btn-outline:hover {
            background: color-mix(in oklch, var(--input) 50%, transparent);
        }

        /* shadcn Table（结构对齐 Table/TableHeader/TableRow/TableHead/TableBody/TableCell，
           样式用现有 CSS 变量主题，亮暗色自动跟随） */
        .table-wrap {
            flex: 1;
            min-width: 0;
            min-height: 0;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            overflow: auto;
            background: color-mix(in oklch, var(--background) 42%, transparent);
            backdrop-filter: blur(20px) saturate(1.15);
            -webkit-backdrop-filter: blur(20px) saturate(1.15);
        }

        .table {
            width: max-content;
            min-width: 100%;
            table-layout: auto;
            font-size: var(--text-sm);
            border-collapse: collapse;
            caption-side: bottom;
            background: transparent;
        }

        .table thead tr {
            border-bottom: 1px solid var(--border);
            background: transparent;
        }

        .table th {
            position: sticky;
            top: 0;
            z-index: 1;
            min-height: 2.25rem;
            height: auto;
            padding: .4rem .625rem;
            text-align: left;
            vertical-align: middle;
            font-weight: 500;
            color: var(--foreground);
            background: color-mix(in oklch, var(--background) 48%, transparent);
            backdrop-filter: blur(20px) saturate(1.15);
            -webkit-backdrop-filter: blur(20px) saturate(1.15);
            min-width: var(--dt-col-min);
            max-width: none;
            white-space: nowrap;
            overflow-wrap: normal;
            word-break: normal;
            line-height: 1.4;
        }

        .table tbody tr {
            border-bottom: 1px solid var(--border);
            background: transparent;
            transition: background .15s;
        }

        .table tbody tr:last-child {
            border-bottom: 0;
        }

        .table tbody tr:hover {
            background: color-mix(in oklch, var(--foreground) 6%, transparent);
        }

        .table td {
            padding: .375rem .625rem;
            vertical-align: middle;
            min-width: var(--dt-col-min);
            max-width: none;
            white-space: nowrap;
            overflow-wrap: normal;
            word-break: normal;
            line-height: 1.45;
            font-variant-numeric: tabular-nums;
            background: transparent;
        }

        .table th.th-compact,
        .table td.td-compact {
            white-space: nowrap;
            min-width: 4.5rem;
            max-width: none;
            vertical-align: middle;
        }

        .table th.th-wrap,
        .table td.td-wrap {
            white-space: normal;
            min-width: 12rem;
            max-width: var(--dt-col-max);
            overflow-wrap: break-word;
            word-break: break-word;
            vertical-align: top;
        }

        .table td.cfg {
            font-size: var(--text-xs);
            font-family: var(--font-mono);
            line-height: 1.4;
            color: var(--muted-foreground);
        }

        /* shadcn Alert（右上角弹出，5 秒后消失） */
        .alert-host {
            position: fixed;
            top: 18px;
            right: 22px;
            z-index: 70;
            width: min(392px, calc(100vw - 40px));
            display: flex;
            flex-direction: column;
            gap: 8px;
            pointer-events: none;
        }
        .alert {
            pointer-events: auto;
            position: relative;
            display: grid;
            grid-template-columns: 16px 1fr;
            column-gap: 12px;
            row-gap: 2px;
            align-items: start;
            width: 100%;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            background: var(--card);
            color: var(--card-foreground);
            padding: 12px 16px;
            font-size: var(--text-sm);
            box-shadow:
                0 0 0 1px color-mix(in oklch, var(--foreground) 6%, transparent),
                0 12px 32px rgba(0, 0, 0, .14);
            animation: alert-in .2s ease-out;
        }
        .alert > svg {
            width: 16px;
            height: 16px;
            margin-top: 2px;
            color: currentColor;
        }
        .alert-title {
            grid-column: 2;
            font-weight: 500;
            line-height: 1.3;
            letter-spacing: -.01em;
        }
        .alert-description {
            grid-column: 2;
            color: var(--muted-foreground);
            line-height: 1.5;
        }
        .alert-destructive {
            color: var(--destructive);
            border-color: color-mix(in oklch, var(--destructive) 28%, var(--border));
        }
        .alert-destructive .alert-description {
            color: color-mix(in oklch, var(--destructive) 78%, var(--muted-foreground));
        }
        .alert.is-leaving {
            animation: alert-out .25s ease-in forwards;
        }
        @keyframes alert-in {
            from { opacity: 0; transform: translate(8px, -8px); }
            to { opacity: 1; transform: none; }
        }
        @keyframes alert-out {
            from { opacity: 1; }
            to { opacity: 0; transform: translate(8px, -6px); }
        }

        /* shadcn Dialog（结构对齐 Dialog/Overlay/Content/Header/Title/Description/Footer/Close，
           样式用现有 CSS 变量主题） */
        .dialog-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
        }
        .dialog-overlay[hidden] {
            display: none;
        }
        .dialog-content {
            width: 100%;
            max-width: min(1360px, calc(100vw - 40px));
            height: min(680px, calc(100vh - 40px));
            display: flex;
            flex-direction: column;
            border-radius: var(--radius);
            background: var(--card);
            color: var(--card-foreground);
            box-shadow:
                0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent),
                0 20px 40px rgba(0, 0, 0, 0.25);
            overflow: hidden;
        }
        .dialog-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
            padding: 16px 20px 12px;
            flex-shrink: 0;
        }
        .dialog-title {
            font-size: var(--text-lg);
            font-weight: 600;
            letter-spacing: -.01em;
            line-height: 1.3;
        }
        .dialog-close {
            width: 24px;
            height: 24px;
            border: none;
            background: transparent;
            color: var(--muted-foreground);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: calc(var(--radius) - 2px);
        }
        .dialog-close:hover {
            background: var(--accent);
            color: var(--accent-foreground);
        }
        .dialog-body {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: row;
            align-items: stretch;
            gap: 16px;
            padding: 0 20px 12px;
        }
        .dialog-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .dialog-field label,
        .dlg-col-label {
            font-size: var(--text-sm);
            color: var(--muted-foreground);
        }
        .dialog-field select,
        .dialog-field textarea {
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            padding: 0 8px;
            font-size: var(--text-sm);
            font-family: inherit;
        }
        .dialog-field select {
            height: 32px;
        }
        .dialog-field textarea {
            padding: 8px;
            line-height: 1.5;
            resize: vertical;
        }
        .dialog-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 12px 20px 16px;
            flex-shrink: 0;
            border-top: 1px solid var(--border);
        }
        .chk {
            width: 14px;
            height: 14px;
            accent-color: var(--primary);
            cursor: pointer;
        }
        .dlg-org-col {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .dlg-form-col {
            flex: 0 0 380px;
            width: 380px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
        }
        .dlg-field-grow {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }
        .cfg-panel {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            padding: 10px;
            overflow: auto;
        }
        .cfg-panel-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            flex-shrink: 0;
        }
        .cfg-panel-title {
            font-size: var(--text-sm);
            font-weight: 500;
            color: var(--foreground);
        }
        .cfg-panel-hint {
            font-size: var(--text-xs);
            color: var(--muted-foreground);
            line-height: 1.4;
        }
        .cfg-panel-hint.is-error {
            color: var(--destructive);
        }
        .cfg-panel-hint.is-ok {
            color: color-mix(in oklch, var(--primary) 70%, var(--foreground));
        }
        .cfg-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .cfg-row {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .cfg-row input[type="text"],
        .cfg-row input[type="number"] {
            height: 30px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            padding: 0 8px;
            font-size: var(--text-sm);
            font-family: inherit;
        }
        .cfg-row input[type="text"] {
            flex: 1;
            min-width: 0;
        }
        .cfg-row input[type="number"] {
            width: 72px;
            font-variant-numeric: tabular-nums;
        }
        .cfg-row-label {
            flex-shrink: 0;
            width: 28px;
            font-size: var(--text-xs);
            color: var(--muted-foreground);
            text-align: right;
        }
        .cfg-row-suffix {
            flex-shrink: 0;
            font-size: var(--text-xs);
            color: var(--muted-foreground);
        }
        .cfg-text-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .cfg-text-field label {
            font-size: var(--text-xs);
            color: var(--muted-foreground);
            line-height: 1.35;
        }
        .cfg-text-field input {
            height: 30px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            padding: 0 8px;
            font-size: var(--text-sm);
            font-family: inherit;
        }
        .btn-icon {
            width: 28px;
            height: 28px;
            flex-shrink: 0;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--muted-foreground);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background .15s, color .15s;
        }
        .btn-icon:hover {
            background: var(--accent);
            color: var(--accent-foreground);
        }
        .btn-icon.danger:hover {
            color: var(--destructive);
        }
        .org-split {
            flex: 1;
            min-height: 0;
            display: flex;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            overflow: hidden;
            background: var(--background);
        }
        .org-tree-pane {
            width: 280px;
            min-width: 260px;
            max-width: 560px;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }
        .org-tree {
            flex: 1;
            min-height: 0;
            overflow: auto;
            padding: 4px;
        }
        .org-tree-row {
            display: flex;
            align-items: center;
            gap: 2px;
            width: max-content;
            min-width: 100%;
            border: none;
            background: transparent;
            color: var(--foreground);
            font: inherit;
            font-size: var(--text-sm);
            text-align: left;
            border-radius: calc(var(--radius) - 4px);
            padding: 5px 6px;
            cursor: pointer;
            line-height: 1.3;
            white-space: nowrap;
        }
        .org-tree-row:hover,
        .org-tree-row.is-active {
            background: var(--accent);
            color: var(--accent-foreground);
        }
        .org-tree-row.is-active {
            font-weight: 500;
        }
        .org-tree-row > span:last-child {
            flex-shrink: 0;
            white-space: nowrap;
        }
        .org-tree-toggle {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--muted-foreground);
        }
        .org-tree-toggle.is-empty {
            visibility: hidden;
        }
        .org-tree-toggle svg {
            transition: transform .15s;
        }
        .org-tree-toggle.is-open svg {
            transform: rotate(90deg);
        }
        .org-tree-children {
            padding-left: 12px;
        }
        .org-tree-foot {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 10px;
            border-top: 1px solid var(--border);
            font-size: var(--text-sm);
            color: var(--foreground);
            cursor: pointer;
            user-select: none;
        }
        .org-resizer {
            width: 10px;
            flex-shrink: 0;
            cursor: col-resize;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--muted-foreground);
            background: var(--background);
            border-left: 1px solid var(--border);
            border-right: 1px solid var(--border);
        }
        .org-resizer:hover,
        .org-resizer.is-dragging {
            background: var(--accent);
            color: var(--accent-foreground);
        }
        .org-table-pane {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
        }
        .org-table-toolbar {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            column-gap: 12px;
            row-gap: 8px;
            padding: 6px 8px;
            flex-shrink: 0;
        }
        .org-selected-meta {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: var(--text-sm);
            color: var(--muted-foreground);
        }
        .btn-link {
            border: none;
            background: transparent;
            color: var(--primary);
            font: inherit;
            font-size: var(--text-sm);
            cursor: pointer;
            padding: 0;
        }
        .btn-link:hover {
            text-decoration: underline;
        }
        .org-pager {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .org-pager select {
            height: 28px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            font-size: var(--text-sm);
            padding: 0 6px;
        }
        .org-table-wrap {
            flex: 1;
            border: none;
            border-radius: 0;
            border-top: 1px solid var(--border);
        }
        .table th.th-chk,
        .table td.td-chk {
            width: 32px;
            text-align: center;
        }
        .org-name-btn {
            border: none;
            background: transparent;
            color: var(--primary);
            font: inherit;
            cursor: pointer;
            padding: 0;
            text-align: left;
        }
        .org-name-btn:hover {
            text-decoration: underline;
        }
        .icon-btn.sm {
            width: 28px;
            height: 28px;
        }
    </style>
</head>

<body>
    <div class="page">
        <div class="app-shell">
            <aside class="sidebar">
                <div class="sidebar-brand">
                    <span class="sidebar-title">党群绩效与创先争优评价</span>
                    <span class="sidebar-sub">党委组织部绩效输出管理</span>
                </div>
                <nav class="sidebar-nav" role="tablist" aria-label="主导航">
                    <button class="nav-item is-active" id="tab-quarterly" type="button" role="tab"
                        aria-selected="true" aria-controls="panel-quarterly" data-tab="quarterly">季度评价结果</button>
                    <button class="nav-item" id="tab-annual" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-annual" data-tab="annual">年度评价结果</button>
                    <button class="nav-item" id="tab-config" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-config" data-tab="config">配置项管理</button>
                    <span class="nav-group-label"> 来源数据 </span>
                    <button class="nav-item" id="tab-deduction" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-deduction" data-tab="deduction">扣分项台账</button>
                    <button class="nav-item" id="tab-party-quarterly" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-partyQuarterly" data-tab="partyQuarterly">季度党群绩效</button>
                    <button class="nav-item" id="tab-org" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-org" data-tab="org">党组织查询</button>
                </nav>
                <div class="sidebar-foot">
                    <button class="icon-btn" id="theme-btn" type="button" aria-label="切换暗色模式" title="切换暗色模式">
                        <svg class="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                        <svg class="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                    </button>
                    <button class="icon-btn" id="close-btn" type="button" aria-label="关闭" title="关闭 (Esc)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
            </aside>

            <div class="main">
                <header class="main-header">
                    <h1 class="main-title" id="main-title">季度评价结果</h1>
                </header>

                <div class="tab-panels">
            <section class="tab-panel is-active" id="panel-quarterly" role="tabpanel" aria-labelledby="tab-quarterly">
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-default" id="tbl-quarterly-new" type="button">新增</button>
                        <button class="btn btn-outline" id="tbl-quarterly-edit" type="button">修改</button>
                        <button class="btn btn-outline" id="tbl-quarterly-del" type="button">删除</button>
                        <button class="btn btn-outline" id="tbl-quarterly-calc-score" type="button">计算绩效得分</button>
                        <button class="btn btn-outline" id="tbl-quarterly-calc-eval" type="button">计算绩效评价结果</button>
                        <button class="btn btn-outline" id="tbl-quarterly-calc-excellence" type="button">计算创先争优结果</button>
                        <button class="btn btn-outline" id="tbl-quarterly-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-quarterly"></div>
                </div>
                <div class="data-table-mount" id="dt-quarterly"></div>
            </section>

            <section class="tab-panel" id="panel-annual" role="tabpanel" aria-labelledby="tab-annual" hidden>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-default" id="tbl-annual-new" type="button">新增</button>
                        <button class="btn btn-outline" id="tbl-annual-edit" type="button">修改</button>
                        <button class="btn btn-outline" id="tbl-annual-del" type="button">删除</button>
                        <button class="btn btn-outline" id="tbl-annual-calc-score" type="button">计算绩效得分</button>
                        <button class="btn btn-outline" id="tbl-annual-calc-eval" type="button">计算绩效评价结果</button>
                        <button class="btn btn-outline" id="tbl-annual-calc-excellence" type="button">计算创先争优结果</button>
                        <button class="btn btn-outline" id="tbl-annual-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-annual"></div>
                </div>
                <div class="data-table-mount" id="dt-annual"></div>
            </section>

            <section class="tab-panel" id="panel-config" role="tabpanel" aria-labelledby="tab-config" hidden>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-default" id="tblnew" type="button">新增</button>
                        <button class="btn btn-outline" id="tbl-config-edit" type="button">修改</button>
                        <button class="btn btn-outline" id="tbl-config-del" type="button">删除</button>
                        <button class="btn btn-outline" id="tbl-config-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-config"></div>
                </div>
                <div class="data-table-mount" id="dt-config"></div>
            </section>

            <section class="tab-panel" id="panel-deduction" role="tabpanel" aria-labelledby="tab-deduction" hidden>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-outline" id="tbl-deduction-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-deduction"></div>
                </div>
                <div class="data-table-mount" id="dt-deduction"></div>
            </section>

            <section class="tab-panel" id="panel-partyQuarterly" role="tabpanel" aria-labelledby="tab-party-quarterly" hidden>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-outline" id="tbl-partyQuarterly-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-partyQuarterly"></div>
                </div>
                <div class="data-table-mount" id="dt-partyQuarterly"></div>
            </section>

            <section class="tab-panel" id="panel-org" role="tabpanel" aria-labelledby="tab-org" hidden>
                <div class="org-split org-view-split" id="org-view-split">
                    <div class="org-tree-pane" id="org-view-tree-pane">
                        <div class="org-tree" id="org-view-tree"></div>
                    </div>
                    <div class="org-table-pane">
                        <div class="org-table-toolbar">
                            <div class="toolbar-actions">
                                <button class="btn btn-outline" id="tbl-orgView-export" type="button">导出</button>
                                <span class="org-selected-meta" id="org-view-meta">当前节点下级组织</span>
                            </div>
                            <div class="toolbar-right" id="dt-filter-orgView"></div>
                        </div>
                        <div class="data-table-mount org-dialog-dt" id="dt-orgView"></div>
                    </div>
                </div>
            </section>
                </div>
            </div>
        </div>
    </div>

    <div class="alert-host" id="cq-alert-host" aria-live="polite"></div>

    <div class="dialog-overlay" id="dlg-overlay" hidden>
        <div class="dialog-content" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
            <div class="dialog-header">
                <h2 class="dialog-title" id="dlg-title">新增配置项</h2>
                <button class="dialog-close" id="dlg-close" type="button" aria-label="关闭" title="关闭">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <div class="dialog-body">
                <div class="dlg-org-col">
                    <span class="dlg-col-label">党组织</span>
                    <div class="org-split" id="org-split">
                        <div class="org-tree-pane" id="org-tree-pane">
                            <div class="org-tree" id="org-tree"></div>
                            <label class="org-tree-foot" for="org-include-self">
                                <input class="chk" id="org-include-self" type="checkbox" />
                                包含本级
                            </label>
                        </div>
                        <div class="org-resizer" id="org-resizer" title="拖动调整宽度">
                            <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true">
                                <circle cx="3" cy="3" r="1" />
                                <circle cx="7" cy="3" r="1" />
                                <circle cx="3" cy="7" r="1" />
                                <circle cx="7" cy="7" r="1" />
                                <circle cx="3" cy="11" r="1" />
                                <circle cx="7" cy="11" r="1" />
                            </svg>
                        </div>
                        <div class="org-table-pane">
                            <div class="org-table-toolbar">
                                <div class="toolbar-actions">
                                    <button class="btn btn-outline" id="tbl-orgDialog-export" type="button">导出</button>
                                    <span class="org-selected-meta">
                                        已选 <span id="org-selected-count">0</span>
                                        <button class="btn-link" id="org-clear" type="button">清空</button>
                                    </span>
                                </div>
                                <div class="toolbar-right" id="dt-filter-orgDialog"></div>
                            </div>
                            <div class="data-table-mount org-dialog-dt" id="dt-orgDialog"></div>
                        </div>
                    </div>
                </div>
                <div class="dlg-form-col">
                    <div class="dialog-field">
                        <label for="dlg-type">配置类型</label>
                        <select id="dlg-type">
                            <option value="quarterly_party_perf">季度党群绩效评价规则</option>
                            <option value="quarterly_excellence">季度创先争优评价规则</option>
                            <option value="quarterly_grassroots">季度基层党组织创先争优评价项点</option>
                            <option value="annual_party_perf">年度党群绩效评价规则</option>
                            <option value="annual_excellence">年度创先争优评价规则</option>
                            <option value="annual_grassroots">年度基层党组织创先争优评价项点</option>
                        </select>
                    </div>
                    <div class="dialog-field dlg-field-grow">
                        <label>具体配置</label>
                        <div class="cfg-panel" id="dlg-config-panel"></div>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="btn btn-outline" id="dlg-cancel" type="button">取消</button>
                <button class="btn btn-default" id="dlg-ok" type="button">确定</button>
            </div>
        </div>
    </div>
    <script>
        // 日志写到父页面控制台，方便在苍穹环境里定位问题
        function clog() {
            try {
                var c = (window.parent && window.parent.console) || window.console;
                c.log.apply(c, ["[cq-demo]"].concat([].slice.call(arguments)));
            } catch (e) { }
        }
        var cqDebugLog = [];
        function errToInfo(err) {
            if (err == null) return null;
            if (typeof err !== "object") return { message: String(err) };
            return {
                name: err.name || "",
                message: err.message || String(err),
                stack: err.stack ? String(err.stack) : ""
            };
        }
        function safeHref(win) {
            try { return win.location.href; } catch (e) { return "(cross-origin)"; }
        }
        function snapshotCq(extra) {
            var snap = {
                extra: extra || {},
                href: "",
                parentHref: "",
                topHref: "",
                consolePageId: "",
                suffix: "",
                watchedTenantPageId: typeof watchedTenantPageId === "undefined" ? "" : watchedTenantPageId,
                lastAppHomeLen: 0,
                lastDeductionLen: 0,
                lastPartyLen: 0,
                lastOrgLen: 0,
                lastAppHomeHead: "",
                lastDeductionHead: "",
                lastPartyHead: "",
                lastOrgHead: "",
                clicks: {},
                iframeSrcs: [],
                hasJQuery: false,
                parentWinHref: ""
            };
            try { snap.href = String(location.href || ""); } catch (e0) { }
            try { snap.parentHref = String(window.parent.location.href || ""); } catch (e1) { snap.parentHref = "(blocked)"; }
            try { snap.topHref = String(window.top.location.href || ""); } catch (e2) { snap.topHref = "(blocked)"; }
            try {
                snap.consolePageId = findConsolePageId();
                snap.suffix = extractRootSuffix(snap.consolePageId);
            } catch (e3) { }
            try {
                var dSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-deduction"];
                var pSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-party"];
                var oSess = cqFetchSessions && cqFetchSessions["cq-fetch-frame-org"];
                snap.lastAppHomeLen = String((dSess && dSess.lastAppHome) || (pSess && pSess.lastAppHome) || (oSess && oSess.lastAppHome) || "").length;
                snap.lastDeductionLen = String((dSess && dSess.lastList) || "").length;
                snap.lastPartyLen = String((pSess && pSess.lastList) || "").length;
                snap.lastOrgLen = String((oSess && oSess.lastList) || "").length;
                snap.lastAppHomeHead = String((dSess && dSess.lastAppHome) || (pSess && pSess.lastAppHome) || (oSess && oSess.lastAppHome) || "").slice(0, 500);
                snap.lastDeductionHead = String((dSess && dSess.lastList) || "").slice(0, 500);
                snap.lastPartyHead = String((pSess && pSess.lastBill) || (pSess && pSess.lastList) || "").slice(0, 500);
                snap.lastOrgHead = String((oSess && oSess.lastList) || "").slice(0, 500);
            } catch (e4) { }
            try {
                var pw = parentWin();
                snap.parentWinHref = safeHref(pw);
                snap.hasJQuery = !!(pw && (pw.jQuery || pw.$) && (pw.jQuery || pw.$).ajax);
                var doc = pw.document;
                snap.clicks = {
                    app: !!findClickAnywhere("应用"),
                    party: !!findClickAnywhere("党费"),
                    deductionMenu: !!findClickAnywhere("扣分项台账"),
                    partyMenu: !!findClickAnywhere("季度党群绩效贡献度"),
                    orgMenu: !!findClickAnywhere("党组织查询")
                };
                snap.sessionHref = sessionWin ? safeHref(sessionWin) : "";
                var fetchDedEl = hostWin().document.getElementById("cq-fetch-frame-deduction");
                var fetchPartyEl = hostWin().document.getElementById("cq-fetch-frame-party");
                var fetchOrgEl = hostWin().document.getElementById("cq-fetch-frame-org");
                var fetchOldEl = hostWin().document.getElementById("cq-fetch-frame");
                snap.fetchFrameSrc = fetchDedEl ? String(fetchDedEl.src || "") : (fetchOldEl ? String(fetchOldEl.src || "") : "");
                snap.fetchPartyFrameSrc = fetchPartyEl ? String(fetchPartyEl.src || "") : "";
                snap.fetchOrgFrameSrc = fetchOrgEl ? String(fetchOrgEl.src || "") : "";
                var ifs = doc.querySelectorAll("iframe[src]");
                var i;
                for (i = 0; i < ifs.length && i < 25; i++) {
                    snap.iframeSrcs.push(String(ifs[i].src || "").slice(0, 300));
                }
            } catch (e5) {
                snap.parentScanError = e5 && e5.message ? e5.message : String(e5);
            }
            return snap;
        }
        function reportError(kind, err, extra) {
            var payload = {
                kind: kind,
                at: (new Date()).toISOString(),
                error: errToInfo(err),
                snapshot: snapshotCq(extra)
            };
            cqDebugLog.push(payload);
            try {
                window.__cqLastError = payload;
                window.__cqDebugLog = cqDebugLog;
            } catch (e0) { }
            var text = "";
            try { text = JSON.stringify(payload, null, 2); } catch (e1) { text = String(kind) + " " + String(err); }
            clog("ERROR_JSON");
            clog(text);
            return payload;
        }
        // 安全绑定：元素不存在时记日志而不是中断整个脚本
        function bind(id, handler) {
            var el = document.getElementById(id);
            if (!el) {
                clog("未找到元素 #" + id + "，跳过绑定");
                return;
            }
            el.onclick = handler;
        }
        function unmount() {
            disposeCqResources();
        }
        bind("close-btn", unmount);
        function syncThemeButton() {
            var btn = document.getElementById("theme-btn");
            if (!btn) return;
            var dark = document.documentElement.classList.contains("dark");
            btn.setAttribute("aria-label", dark ? "切换亮色模式" : "切换暗色模式");
            btn.title = dark ? "切换亮色模式" : "切换暗色模式";
        }
        bind("theme-btn", function () {
            document.documentElement.classList.toggle("dark");
            syncThemeButton();
        });

        // ---------- 页签 + 可排序表格 ----------
        var STATUS = [["A", "暂存"], ["B", "已提交"], ["C", "已审核"]];
        var QUARTERS = ["2026-Q1", "2026-Q2", "2025-Q4", "2025-Q3", "2025-Q2"];
        var YEARS = ["2026", "2025", "2024"];
        var GRADES = ["优秀", "良好", "合格", "待改进"];
        var activeTab = "quarterly";

        var ORG_TREE = {
            id: "all",
            name: "全部",
            status: "已审核",
            children: [{
                id: "crrc-dw",
                name: "中车株洲电力机车有限公司党委",
                status: "已审核",
                children: [
                    { id: "org-kj", name: "科技管理部党支部", status: "已审核" },
                    { id: "org-zl", name: "质量保证部党支部", status: "已审核" },
                    { id: "org-gy", name: "工艺技术部党支部", status: "已审核" },
                    { id: "org-zz", name: "制造中心党支部", status: "已审核" },
                    { id: "org-cg", name: "采购中心党支部", status: "已审核" },
                    { id: "org-cw", name: "财务部党支部", status: "已审核" },
                    { id: "org-rl", name: "人力资源部党支部", status: "已审核" },
                    { id: "org-dwgz", name: "党委工作部党支部", status: "已审核" },
                    { id: "org-jw", name: "纪委办公室党支部", status: "已审核" },
                    { id: "org-aq", name: "安全环保部党支部", status: "已审核" },
                    { id: "org-yy", name: "运营管理部党支部", status: "已审核" },
                    { id: "org-sc", name: "市场营销部党支部", status: "已审核" }
                ]
            }]
        };
        var ORGS = [];
        (function collectOrgNames(node) {
            if (node.id !== "all") ORGS.push(node.name);
            (node.children || []).forEach(collectOrgNames);
        })(ORG_TREE);

        var TABLE_DEFS = {
            quarterly: {
                label: "季度评价结果",
                sortKey: "quarter",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "quarter", label: "评价季度", sortable: true },
                    { key: "org", label: "党组织", sortable: true },
                    { key: "partyScore", label: "党群绩效得分", sortable: true, numeric: true },
                    { key: "excellenceScore", label: "创先争优得分", sortable: true, numeric: true },
                    { key: "totalScore", label: "综合得分", sortable: true, numeric: true },
                    { key: "grade", label: "评价等级", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true }
                ],
                rows: []
            },
            annual: {
                label: "年度评价结果",
                sortKey: "year",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "year", label: "评价年度", sortable: true },
                    { key: "org", label: "党组织", sortable: true },
                    { key: "partyScore", label: "党群绩效得分", sortable: true, numeric: true },
                    { key: "excellenceScore", label: "创先争优得分", sortable: true, numeric: true },
                    { key: "totalScore", label: "综合得分", sortable: true, numeric: true },
                    { key: "grade", label: "评价等级", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true }
                ],
                rows: []
            },
            config: {
                label: "配置项管理",
                sortKey: "no",
                sortDir: "desc",
                columns: [
                    { key: "no", label: "单据编号", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true },
                    { key: "typeName", label: "配置类型", sortable: true },
                    { key: "configDetail", label: "配置详情", sortable: true, wrap: true },
                    { key: "org", label: "对应党组织", sortable: true, wrap: true }
                ],
                rows: []
            },
            deduction: {
                label: "扣分项台账",
                sortKey: "code",
                sortDir: "asc",
                readonly: true,
                columns: [
                    { key: "code", label: "单据编号", sortable: true },
                    { key: "statusText", label: "单据状态", sortable: true, badge: true },
                    { key: "year", label: "年份", sortable: true },
                    { key: "quarter", label: "季度", sortable: true },
                    { key: "name", label: "扣分事项", sortable: true },
                    { key: "standard", label: "扣分依据", sortable: true },
                    { key: "score", label: "扣分分数", sortable: true, numeric: true },
                    { key: "org", label: "被扣分组织", sortable: true },
                    { key: "dept", label: "输出部门.名称", sortable: true }
                ],
                rows: []
            },
            partyQuarterly: {
                label: "季度党群绩效",
                sortKey: "org",
                sortDir: "asc",
                readonly: true,
                columns: [
                    { key: "org", label: "党组织", sortable: true },
                    { key: "quarter", label: "评价季度", sortable: true },
                    { key: "itemName", label: "项点名称", sortable: true },
                    { key: "contribution", label: "贡献度得分", sortable: true, numeric: true },
                    { key: "weight", label: "权重(%)", sortable: true, numeric: true },
                    { key: "remark", label: "备注", sortable: true }
                ],
                rows: []
            },
            org: {
                label: "党组织",
                readonly: true
            }
        };

        function randNo(prefix) {
            return (prefix || "CQ") + new Date().getFullYear() + String(Math.floor(Math.random() * 9000) + 1000);
        }
        function randStatus() {
            var st = STATUS[Math.floor(Math.random() * STATUS.length)];
            return { code: st[0], text: st[1] };
        }
        function randScore() {
            return Number((70 + Math.random() * 28).toFixed(1));
        }
        function randQuarterlyRow() {
            var party = randScore();
            var excellence = randScore();
            var st = randStatus();
            return {
                no: randNo("QJ"),
                quarter: QUARTERS[Math.floor(Math.random() * QUARTERS.length)],
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                partyScore: party,
                excellenceScore: excellence,
                totalScore: Number(((party + excellence) / 2).toFixed(1)),
                grade: GRADES[Math.floor(Math.random() * GRADES.length)],
                statusText: st.text,
                statusCode: st.code
            };
        }
        function randAnnualRow() {
            var party = randScore();
            var excellence = randScore();
            var st = randStatus();
            return {
                no: randNo("ND"),
                year: YEARS[Math.floor(Math.random() * YEARS.length)],
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                partyScore: party,
                excellenceScore: excellence,
                totalScore: Number(((party + excellence) / 2).toFixed(1)),
                grade: GRADES[Math.floor(Math.random() * GRADES.length)],
                statusText: st.text,
                statusCode: st.code
            };
        }
        var DEDUCTION_NAMES = [
            "未按时参加组织生活",
            "党建工作台账不完整",
            "党员教育管理不到位",
            "组织关系转接不及时",
            "党费缴纳不规范",
            "民主评议程序缺失",
            "意识形态工作落实不力"
        ];
        var PARTY_ITEMS = ["理论学习", "组织建设", "服务群众", "作风建设", "创新实践"];
        function randDeductionRow(idx) {
            var st = randStatus();
            return {
                code: "KF" + String(1001 + idx),
                name: DEDUCTION_NAMES[idx % DEDUCTION_NAMES.length],
                standard: "每发生一次扣 " + (1 + (idx % 3)) + " 分",
                score: Number((1 + (idx % 5) * 0.5).toFixed(1)),
                quarter: QUARTERS[idx % QUARTERS.length],
                statusText: st.text,
                statusCode: st.code
            };
        }
        function randPartyQuarterlyRow() {
            var weight = [40, 30, 20, 10][Math.floor(Math.random() * 4)];
            return {
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                quarter: QUARTERS[Math.floor(Math.random() * QUARTERS.length)],
                itemName: PARTY_ITEMS[Math.floor(Math.random() * PARTY_ITEMS.length)],
                contribution: randScore(),
                weight: weight,
                remark: Math.random() < 0.3 ? "—" : "按季度统计"
            };
        }

        var ORG_TABLE_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true },
            { key: "orgType", label: "党组织类别", sortable: true, compact: true },
            { key: "foundedAt", label: "成立时间", sortable: true, compact: true },
            { key: "number", label: "编码", sortable: true, compact: true },
            { key: "level", label: "级次", sortable: true, compact: true }
        ];
        var ORG_DIALOG_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true, link: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true },
            { key: "orgType", label: "党组织类别", sortable: true, compact: true },
            { key: "foundedAt", label: "成立时间", sortable: true, compact: true },
            { key: "number", label: "编码", sortable: true, compact: true },
            { key: "level", label: "级次", sortable: true, compact: true }
        ];

        function mapOrgRows(rows) {
            return rows.map(function (r, idx) {
                return {
                    id: r.id,
                    name: r.name,
                    status: r.status,
                    parentName: r.parentName,
                    orgType: r.orgType || "",
                    foundedAt: r.foundedAt || "",
                    number: r.number || "",
                    level: r.level == null || r.level === "" ? "" : r.level,
                    _idx: idx + 1
                };
            });
        }
        function onOrgDialogSelectionChange(selection) {
            orgState.selected = {};
            Object.keys(selection || {}).forEach(function (id) {
                if (selection[id]) orgState.selected[id] = true;
            });
            var countEl = document.getElementById("org-selected-count");
            if (countEl) countEl.textContent = String(selectedOrgNames().length);
        }
        function refreshOrgDialogTable() {
            var rows = mapOrgRows(orgTableSource());
            if (!window.__cqDataTable) return;
            window.__cqDataTable.setData("orgDialog", rows, {
                selectedIds: orgState.selected,
                onSelectionChange: onOrgDialogSelectionChange
            });
            var countEl = document.getElementById("org-selected-count");
            if (countEl) countEl.textContent = String(selectedOrgNames().length);
        }
        var configSelected = {};
        function onConfigSelectionChange(selection) {
            configSelected = selection || {};
        }
        function refreshDataTable(tabId) {
            if (window.__cqDataTable && TABLE_DEFS[tabId] && TABLE_DEFS[tabId].columns) {
                if (tabId === "config") {
                    window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows, {
                        selectable: true,
                        selectedIds: configSelected,
                        onSelectionChange: onConfigSelectionChange
                    });
                } else {
                    window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows);
                }
            }
        }
        window.__CQ_TABLE_BOOT = function () {
            try {
            if (!window.__cqDataTable) return;
            var dt = window.__cqDataTable;
            ["quarterly", "annual", "deduction", "partyQuarterly"].forEach(function (id) {
                dt.mount(id, "dt-" + id, TABLE_DEFS[id].columns, TABLE_DEFS[id].rows, {
                    pageSize: 10,
                    filterPlaceholder: "搜索" + TABLE_DEFS[id].label + "…",
                    filterHostId: "dt-filter-" + id
                });
            });
            dt.mount("config", "dt-config", TABLE_DEFS.config.columns, TABLE_DEFS.config.rows, {
                pageSize: 10,
                selectable: true,
                selectedIds: configSelected,
                onSelectionChange: onConfigSelectionChange,
                filterPlaceholder: "搜索" + TABLE_DEFS.config.label + "…",
                filterHostId: "dt-filter-config"
            });
            dt.mount("orgView", "dt-orgView", ORG_TABLE_COLUMNS, [], {
                pageSize: 20,
                filterPlaceholder: "搜索组织…",
                filterHostId: "dt-filter-orgView"
            });
            ORG_DIALOG_COLUMNS[1].onLinkClick = function (row) {
                if (orgState.selected[row.id]) delete orgState.selected[row.id];
                else orgState.selected[row.id] = true;
                refreshOrgDialogTable();
            };
            dt.mount("orgDialog", "dt-orgDialog", ORG_DIALOG_COLUMNS, [], {
                pageSize: 20,
                selectable: true,
                selectedIds: orgState.selected,
                onSelectionChange: onOrgDialogSelectionChange,
                filterPlaceholder: "搜索组织…",
                filterHostId: "dt-filter-orgDialog"
            });
            renderOrgViewTable();
            refreshOrgDialogTable();
            } catch (bootErr) {
                reportError("table-boot", bootErr, { hasDt: !!window.__cqDataTable });
            }
        };

        function switchTab(tabId) {
            if (!TABLE_DEFS[tabId]) return;
            activeTab = tabId;
            document.querySelectorAll(".nav-item").forEach(function (btn) {
                var on = btn.getAttribute("data-tab") === tabId;
                btn.classList.toggle("is-active", on);
                btn.setAttribute("aria-selected", on ? "true" : "false");
            });
            document.querySelectorAll(".tab-panel").forEach(function (panel) {
                var on = panel.id === "panel-" + tabId;
                panel.classList.toggle("is-active", on);
                if (on) panel.removeAttribute("hidden");
                else panel.setAttribute("hidden", "");
            });
            var titleEl = document.getElementById("main-title");
            if (titleEl) titleEl.textContent = TABLE_DEFS[tabId].label;
            if (tabId === "org") {
                renderOrgView();
                if (!orgLoading && !orgReady) {
                    var orgMetaEl = document.getElementById("org-view-meta");
                    if (orgMetaEl) orgMetaEl.textContent = "正在加载党组织…";
                    loadOrgFromCq();
                }
            }
            if (tabId === "deduction" && !deductionLoading && !deductionReady) {
                loadDeductionFromCq();
            }
            if (tabId === "partyQuarterly" && !partyLoading && !partyReady) {
                loadPartyQuarterlyFromCq();
            }
            if (tabId === "config" && !configLoading && !configReady) {
                loadConfigFromCq();
            }
        }
        function initTabs() {
            document.querySelectorAll(".nav-item").forEach(function (btn) {
                btn.onclick = function () {
                    switchTab(btn.getAttribute("data-tab"));
                };
            });
            switchTab(activeTab);
        }
        function initTableData() {
            loadDeductionFromCq();
            loadPartyQuarterlyFromCq();
            TABLE_DEFS.quarterly.rows = [];
            TABLE_DEFS.annual.rows = [];
            TABLE_DEFS.config.rows = [];
            TABLE_DEFS.partyQuarterly.rows = [];
            for (var i = 0; i < 8; i++) TABLE_DEFS.quarterly.rows.push(randQuarterlyRow());
            for (var j = 0; j < 6; j++) TABLE_DEFS.annual.rows.push(randAnnualRow());
            ["quarterly", "annual", "config"].forEach(refreshDataTable);
            loadConfigFromCq();
        }
        var alertTimer = 0;
        var alertLeaveTimer = 0;
        var alertTimers = [];
        function makeAlertIcon(kind) {
            var ns = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(ns, "svg");
            svg.setAttribute("width", "16");
            svg.setAttribute("height", "16");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");
            svg.setAttribute("aria-hidden", "true");
            function node(name, attrs) {
                var n = document.createElementNS(ns, name);
                var keys = Object.keys(attrs);
                for (var i = 0; i < keys.length; i++) n.setAttribute(keys[i], attrs[keys[i]]);
                svg.appendChild(n);
            }
            node("circle", { cx: "12", cy: "12", r: "10" });
            if (kind === "destructive") {
                node("line", { x1: "12", x2: "12", y1: "8", y2: "12" });
                node("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" });
            } else {
                node("path", { d: "m9 12 2 2 4-4" });
            }
            return svg;
        }
        function showAlert(variant, title, desc) {
            if (cqDisposed) return;
            var host = document.getElementById("cq-alert-host");
            if (!host) return;
            var el = document.createElement("div");
            el.className = "alert" + (variant === "destructive" ? " alert-destructive" : "");
            el.setAttribute("role", "alert");
            el.appendChild(makeAlertIcon(variant));
            var t = document.createElement("div");
            t.className = "alert-title";
            t.textContent = title || "";
            el.appendChild(t);
            if (desc) {
                var d = document.createElement("div");
                d.className = "alert-description";
                d.textContent = desc;
                el.appendChild(d);
            }
            host.appendChild(el);
            var leaveTimer = 0;
            var hideTimer = setTimeout(function () {
                el.classList.add("is-leaving");
                leaveTimer = setTimeout(function () {
                    if (el.parentNode) el.parentNode.removeChild(el);
                }, 250);
                alertTimers.push(leaveTimer);
            }, 5000);
            alertTimers.push(hideTimer);
        }
        function setStatus(msg) {
            if (!msg) return;
            showAlert("default", "提示", msg);
        }
        // 模拟官方 this.wait：异步等待渲染完成后返回 { getElement() }。
        // 官方脚本的 this 绑定在苍穹页面上下文，控件 DOM 在父页面（window.parent.document）。
        // 只查父页面；跨域时访问 parent 会抛异常，记日志后 getElement() 为 null。
        function waitEl(id, ms) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var el = null;
                    try {
                        el = hostWin().document.getElementById(id);
                    } catch (e) {
                        clog("无法访问宿主页面 #" + id + ": " + (e && e.message));
                    }
                    resolve({ getElement: function () { return el; } });
                }, ms || 150);
            });
        }

        // 扣分项 / 季度党群绩效：各开一个隐藏主控台 iframe，并行点「应用 → 党费 → 菜单」。
        var CQ_DEDUCTION = {
            consoleAppId: "bos",
            consoleForm: "pc_main_console",
            appTabKey: "tabap",
            appTabArg: "appbeta",
            myAppForm: "tenant_myapp",
            myAppControl: "bizcustomlistap",
            partyApp: {
                appnumber: "crrc_party_dues",
                appid: "5NBN/3EAL5OQ",
                alluserapp: "0",
                appname: "党费"
            },
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2524686743156851712",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_deduction_log"
        };
        var CQ_PARTY = {
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2546583953733611520",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_cb_count",
            listControl: "billlistap",
            pkField: "crrc_dj_cb_count_id",
            menuTexts: ["季度党群绩效贡献度", "季度党群绩效"],
            maxBills: 40
        };
        var CQ_ORG = {
            menuAppId: "crrc_party_dues",
            menuFormId: "crrc_party_dues_apphome",
            menuControl: "navigationbar",
            menuRoot: "root",
            menuItemId: "2546603181119401984",
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_org_tree_ext",
            menuTexts: ["党组织查询", "党组织"]
        };
        var CQ_CONFIG = {
            dataAppId: "crrc_dj",
            dataFormId: "crrc_dj_config_new"
        };
        var deductionLoading = false;
        var deductionReady = false;
        var partyLoading = false;
        var partyReady = false;
        var orgLoading = false;
        var orgReady = false;
        var configLoading = false;
        var configReady = false;
        var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
        var ORG_TYPE_TEXT = { "1": "党委", "2": "党总支", "3": "党支部", "4": "党小组" };
        var ORG_ENABLE_TEXT = { "0": "禁用", "1": "可用" };
        var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };
        var watchedTenantPageId = "";
        var sessionWin = null;
        var cqDisposed = false;
        var fetchFrameTimer = 0;
        var onCqKeydown = null;
        var cqFetchSessions = {};

        function pageDoc() {
            try { return hostWin().document; } catch (e) { return document; }
        }
        function isFetchFrameWin(win) {
            if (!win) return false;
            try {
                var fe = win.frameElement;
                if (fe && fe.getAttribute("data-cq-fetch") === "1") return true;
            } catch (e0) { }
            try {
                if (win.parent && win.parent !== win) {
                    var pfe = win.parent.frameElement;
                    if (pfe && pfe.getAttribute("data-cq-fetch") === "1") return true;
                }
            } catch (e1) { }
            return false;
        }
        function unhookFetchOn(win) {
            if (!win) return;
            try {
                if (win.__cqOrigFetch) win.fetch = win.__cqOrigFetch;
                try { delete win.__cqOrigFetch; } catch (e0) { win.__cqOrigFetch = null; }
                try { delete win.__cqTenantHooked; } catch (e1) { win.__cqTenantHooked = false; }
                try { delete win.__cqOurFetch; } catch (e2) { win.__cqOurFetch = null; }
                try { delete win.__cqFetchSess; } catch (e3) { win.__cqFetchSess = null; }
            } catch (e4) { }
        }
        function walkWindows(fn) {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { fn(win); } catch (e0) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e1) { }
            }
            try { walk(window, 0); } catch (e2) { }
            try { walk(hostWin(), 0); } catch (e3) { }
            try { if (sessionWin) walk(sessionWin, 0); } catch (e4) { }
            try {
                var ids = Object.keys(cqFetchSessions || {});
                var si;
                for (si = 0; si < ids.length; si++) {
                    var sw = cqFetchSessions[ids[si]] && cqFetchSessions[ids[si]].win;
                    if (sw) walk(sw, 0);
                }
            } catch (e5) { }
        }
        function removeFetchFrames() {
            var nodes = [];
            try {
                var byId = hostWin().document.getElementById("cq-fetch-frame");
                if (byId) nodes.push(byId);
            } catch (e0) { }
            try {
                var list = pageDoc().querySelectorAll("iframe[data-cq-fetch='1']");
                var i;
                for (i = 0; i < list.length; i++) nodes.push(list[i]);
            } catch (e1) { }
            var seen = [];
            var n;
            for (n = 0; n < nodes.length; n++) {
                var el = nodes[n];
                if (!el || seen.indexOf(el) >= 0) continue;
                seen.push(el);
                try { el.onload = null; } catch (e2) { }
                try { el.src = "about:blank"; } catch (e3) { }
                try { if (el.parentNode) el.parentNode.removeChild(el); } catch (e4) { }
            }
        }
        function removeBundleScripts() {
            try {
                var list = pageDoc().querySelectorAll("script[data-cq-dt-bundle='1']");
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i].parentNode) list[i].parentNode.removeChild(list[i]);
                }
            } catch (e) { }
        }
        function disposeCqResources() {
            if (cqDisposed) {
                removeFetchFrames();
                return;
            }
            cqDisposed = true;
            deductionLoading = false;
            partyLoading = false;
            orgLoading = false;
            configLoading = false;
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            if (alertTimers && alertTimers.length) {
                var ati;
                for (ati = 0; ati < alertTimers.length; ati++) clearTimeout(alertTimers[ati]);
                alertTimers = [];
            }
            if (fetchFrameTimer) { clearTimeout(fetchFrameTimer); fetchFrameTimer = 0; }
            try {
                var sessIds = Object.keys(cqFetchSessions || {});
                var sxi;
                for (sxi = 0; sxi < sessIds.length; sxi++) {
                    var sx = cqFetchSessions[sessIds[sxi]];
                    if (sx && sx.timer) clearTimeout(sx.timer);
                }
            } catch (eSess) { }
            cqFetchSessions = {};
            try { if (window.__cqDataTable && window.__cqDataTable.unmountAll) window.__cqDataTable.unmountAll(); } catch (e0) { }
            walkWindows(unhookFetchOn);
            sessionWin = null;
            removeFetchFrames();
            try { if (onCqKeydown) document.removeEventListener("keydown", onCqKeydown); } catch (e1) { }
            removeBundleScripts();
            try { window.__cqFetchDeduction = null; } catch (e2) { }
            try { window.__cqFetchPartyQuarterly = null; } catch (e2b) { }
            try { window.__cqFetchOrg = null; } catch (e2c) { }
            try { window.__cqFetchConfig = null; } catch (e2d) { }
            try { window.__cqDisposeOverlay = null; } catch (e3) { }
            try { window.__cqDtRoot = null; } catch (e4) { }
            try { unmountHost(); } catch (e5) { }
            try {
                var hostEl = hostWin().document.getElementById("shadcn-hello-inject-root");
                if (hostEl && hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
            } catch (e6) { }
        }

        function hostWin() {
            try { return window.parent; } catch (e) { return window; }
        }
        function parentWin() {
            var start = hostWin();
            var best = start;
            try {
                var cur = start;
                var n = 0;
                while (cur && n < 8) {
                    n++;
                    try {
                        if (cur.$ && typeof cur.$.ajax === "function") best = cur;
                    } catch (e1) { }
                    var next = null;
                    try {
                        if (cur.top && cur !== cur.top) next = cur.parent;
                        else break;
                    } catch (e2) { break; }
                    if (!next || next === cur) break;
                    cur = next;
                }
                return best || start;
            } catch (e) {
                return start || window;
            }
        }
        function cqOrigin() {
            try { return parentWin().location.origin; } catch (e) { return ""; }
        }
        function hasTimeoutText(s) {
            s = String(s || "");
            return s.indexOf("pagetimeout") >= 0 || s.indexOf("会话超时") >= 0;
        }
        function collapseWs(s) {
            var t = String(s || ""), out = "", prev = false, i, c;
            for (i = 0; i < t.length; i++) {
                c = t.charAt(i);
                if (c === " " || c === String.fromCharCode(10) || c === String.fromCharCode(13) || c === String.fromCharCode(9)) {
                    if (!prev) out += " ";
                    prev = true;
                } else {
                    out += c;
                    prev = false;
                }
            }
            return out.trim();
        }
        function takeQueryParam(url, name) {
            var u = String(url || "");
            var needle = name + "=";
            var i = u.indexOf("?" + needle);
            if (i < 0) i = u.indexOf("&" + needle);
            if (i < 0) return "";
            var start = i + 1 + needle.length;
            var end = u.indexOf("&", start);
            if (end < 0) end = u.length;
            try { return decodeURIComponent(u.slice(start, end)); } catch (e) { return u.slice(start, end); }
        }
        function findRootToken(pageId) {
            var raw = String(pageId || "");
            var s = raw.toLowerCase();
            var i = s.indexOf("root");
            if (i < 0) return "";
            var hex = "0123456789abcdef";
            var j = i + 4;
            while (j < s.length && hex.indexOf(s.charAt(j)) >= 0) j++;
            if (j - (i + 4) < 16) return "";
            return raw.slice(i, j);
        }
        function extractRootSuffix(pageId) {
            return findRootToken(pageId);
        }
        function isConsoleRootPageId(id) {
            var s = String(id || "");
            return s.indexOf("root") === 0 && findRootToken(s) === s;
        }
        function isGuidPageId(id) {
            var s = String(id || "");
            if (s.length !== 32) return false;
            var hex = "0123456789abcdef";
            for (var i = 0; i < 32; i++) {
                if (hex.indexOf(s.charAt(i).toLowerCase()) < 0) return false;
            }
            return true;
        }
        function keyLooksLikeForm(key) {
            key = String(key || "").toLowerCase();
            return key.indexOf("formid") >= 0 || key.indexOf("pageid") >= 0 || key.indexOf("form") >= 0 || key.indexOf("page") >= 0;
        }
        function collectPageIds(win, depth, out, seen) {
            out = out || [];
            seen = seen || [];
            if (!win || depth > 8) return out;
            for (var s = 0; s < seen.length; s++) if (seen[s] === win) return out;
            seen.push(win);
            try {
                var href = win.location.href;
                var u = new URL(href);
                var pid = u.searchParams.get("pageId") || u.searchParams.get("byPageId");
                if (pid) out.push(pid);
                var fid = u.searchParams.get("formId");
                if (fid === CQ_DEDUCTION.myAppForm && pid) watchedTenantPageId = pid;
            } catch (e) { }
            try {
                var doc = win.document;
                if (doc) {
                    var roots = doc.querySelectorAll("[id^='root']");
                    for (var r = 0; r < roots.length; r++) {
                        if (isConsoleRootPageId(roots[r].id)) out.push(roots[r].id);
                    }
                    var nodes = doc.querySelectorAll("iframe[src], [pageid], [data-pageid]");
                    for (var i = 0; i < nodes.length; i++) {
                        var el = nodes[i];
                        var src = el.getAttribute("src") || "";
                        var pidFromSrc = takeQueryParam(src, "pageId");
                        if (pidFromSrc) out.push(pidFromSrc);
                        if (src.indexOf(CQ_DEDUCTION.myAppForm) >= 0 && pidFromSrc) watchedTenantPageId = pidFromSrc;
                        var attr = el.getAttribute("pageid") || el.getAttribute("data-pageid");
                        if (attr) out.push(attr);
                    }
                }
            } catch (e2) { }
            try {
                var frames = win.frames;
                for (var f = 0; f < frames.length; f++) collectPageIds(frames[f], depth + 1, out, seen);
            } catch (e3) { }
            return out;
        }
        function findConsolePageId() {
            var ids = collectPageIds(parentWin(), 0, [], []);
            for (var i = 0; i < ids.length; i++) if (isConsoleRootPageId(ids[i])) return ids[i];
            return "";
        }
        function addUnique(arr, id) {
            if (!id || arr.indexOf(id) >= 0) return;
            arr.push(id);
        }
        function pickPageIdFromObj(obj, hits, depth, seen) {
            if (!obj || typeof obj !== "object" || depth > 6) return;
            if (seen.indexOf(obj) >= 0) return;
            seen.push(obj);
            var fid = obj.formId || obj.formid || obj.formID || "";
            var pid = obj.pageId || obj.pageid || obj.PageId || "";
            if (pid && String(fid) === CQ_DEDUCTION.myAppForm) addUnique(hits, String(pid));
            if (depth >= 4) return;
            if (Array.isArray(obj)) {
                for (var i = 0; i < obj.length && i < 20; i++) pickPageIdFromObj(obj[i], hits, depth + 1, seen);
                return;
            }
            var keys = Object.keys(obj);
            for (var k = 0; k < keys.length && k < 40; k++) {
                if (keyLooksLikeForm(keys[k])) pickPageIdFromObj(obj[keys[k]], hits, depth + 1, seen);
            }
        }
        function collectTenantCandidates() {
            var hits = [];
            var win = parentWin();
            var doc = null;
            try { doc = win.document; } catch (e) { }
            if (watchedTenantPageId) addUnique(hits, watchedTenantPageId);
            collectPageIds(win, 0, [], []);
            if (watchedTenantPageId) addUnique(hits, watchedTenantPageId);
            if (doc) {
                try {
                    var iframes = doc.querySelectorAll("iframe[src]");
                    for (var i = 0; i < iframes.length; i++) {
                        var src = iframes[i].src || "";
                        if (src.indexOf(CQ_DEDUCTION.myAppForm) >= 0) {
                            var pid = takeQueryParam(src, "pageId");
                            if (pid) addUnique(hits, pid);
                        }
                    }
                    var attrNodes = doc.querySelectorAll("[pageid], [data-pageid], [data-page-id], [formid], [data-formid]");
                    for (var a = 0; a < attrNodes.length; a++) {
                        var el = attrNodes[a];
                        var formAttr = el.getAttribute("formid") || el.getAttribute("data-formid") || "";
                        var pageAttr = el.getAttribute("pageid") || el.getAttribute("data-pageid") || el.getAttribute("data-page-id") || "";
                        if (formAttr === CQ_DEDUCTION.myAppForm && pageAttr) addUnique(hits, pageAttr);
                    }
                } catch (e2) { }
            }
            try {
                var wkeys = Object.getOwnPropertyNames(win);
                for (var w = 0; w < wkeys.length && w < 400; w++) {
                    var val = null;
                    try { val = win[wkeys[w]]; } catch (e3) { continue; }
                    if (!val || (typeof val !== "object" && typeof val !== "function")) continue;
                    try { pickPageIdFromObj(val, hits, 0, []); } catch (e4) { }
                }
            } catch (e5) { }
            return hits;
        }
        function collectGuidIdsNearAppTab() {
            var out = [];
            var win = parentWin();
            var doc = null;
            try { doc = win.document; } catch (e) { return out; }
            var sels = ["#homepagetabap", "#flexpanelap", "#appbeta", "[id^='root']"];
            for (var s = 0; s < sels.length; s++) {
                var nodes = [];
                try { nodes = doc.querySelectorAll(sels[s]); } catch (e2) { }
                for (var n = 0; n < nodes.length; n++) {
                    var root = nodes[n];
                    if (isGuidPageId(root.id)) addUnique(out, root.id);
                    var kids = [];
                    try { kids = root.querySelectorAll("[id]"); } catch (e3) { }
                    for (var i = 0; i < kids.length && i < 2000; i++) {
                        if (isGuidPageId(kids[i].id)) addUnique(out, kids[i].id);
                    }
                }
            }
            return out;
        }
        function findTenantMyAppPageId() {
            if (watchedTenantPageId) return watchedTenantPageId;
            var hits = collectTenantCandidates();
            return hits[0] || "";
        }
        function buildTenantTryList(consolePageId) {
            var list = [];
            function add(id, src) {
                if (!id) return;
                for (var i = 0; i < list.length; i++) if (list[i].id === id) return;
                list.push({ id: id, src: src });
            }
            var hits = collectTenantCandidates();
            for (var h = 0; h < hits.length; h++) add(hits[h], "scan");
            var guids = collectGuidIdsNearAppTab();
            for (var g = 0; g < guids.length && g < 8; g++) add(guids[g], "dom-guid");
            add(consolePageId, "console-fallback");
            return list;
        }
        function noteTenantFromUrl(url, body) {
            var u = String(url || "");
            if (u.indexOf(CQ_DEDUCTION.myAppForm) < 0) return;
            var pid = takeQueryParam(u, "pageId");
            if (pid) watchedTenantPageId = pid;
            if (body) {
                var text = typeof body === "string" ? body : "";
                try {
                    if (body && typeof body === "object" && body.pageId) watchedTenantPageId = body.pageId;
                    var sp = new URLSearchParams(text);
                    if (sp.get("pageId")) watchedTenantPageId = sp.get("pageId");
                } catch (e) { }
            }
        }
        function findParentClickTarget(doc, text, selector) {
            if (!doc) return null;
            var nodes = [];
            try { nodes = doc.querySelectorAll(selector || "div, span, a, li, button, p, td, label"); } catch (e) { return null; }
            var fallback = null;
            var best = null;
            var bestLen = Infinity;
            var i;
            for (i = 0; i < nodes.length; i++) {
                var el = nodes[i];
                try {
                    if (el.closest && el.closest("#shadcn-hello-inject-root")) continue;
                } catch (eSkip) { }
                var raw = collapseWs(el.innerText || el.textContent || "");
                if (raw !== text) continue;
                if (!fallback) fallback = el;
                if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;
                var len = (el.innerHTML || "").length;
                if (len < bestLen) { bestLen = len; best = el; }
            }
            if (best || fallback) return best || fallback;
            try {
                var labeled = doc.querySelectorAll("[title], [aria-label]");
                for (i = 0; i < labeled.length; i++) {
                    var lab = labeled[i];
                    var t = collapseWs(lab.getAttribute("title") || lab.getAttribute("aria-label") || "");
                    if (t === text) return lab;
                }
            } catch (e2) { }
            return null;
        }
        function findClickInTree(win, text, selector, depth, seen) {
            depth = depth || 0;
            seen = seen || [];
            if (!win || depth > 8) return null;
            var s;
            for (s = 0; s < seen.length; s++) if (seen[s] === win) return null;
            seen.push(win);
            try {
                var el = findParentClickTarget(win.document, text, selector);
                if (el) return { win: win, el: el };
            } catch (e) { }
            try {
                var frames = win.frames;
                var f;
                for (f = 0; f < frames.length; f++) {
                    var hit = findClickInTree(frames[f], text, selector, depth + 1, seen);
                    if (hit) return hit;
                }
            } catch (e2) { }
            return null;
        }
        function findClickAnywhere(text, selector) {
            var roots = [];
            if (sessionWin) roots.push(sessionWin);
            try { roots.push(parentWin()); } catch (e0) { }
            roots.push(window);
            var r;
            for (r = 0; r < roots.length; r++) {
                var hit = findClickInTree(roots[r], text, selector, 0, []);
                if (hit) return hit;
            }
            return null;
        }
        function fireParentClick(el, win) {
            if (!el) return false;
            try { el.scrollIntoView({ block: "center", inline: "nearest" }); } catch (e) { }
            var view = win;
            try { if (!view) view = el.ownerDocument.defaultView; } catch (e1) { }
            if (!view) view = parentWin();
            try {
                var opts = { bubbles: true, cancelable: true, view: view };
                el.dispatchEvent(new MouseEvent("pointerdown", opts));
                el.dispatchEvent(new MouseEvent("mousedown", opts));
                el.dispatchEvent(new MouseEvent("pointerup", opts));
                el.dispatchEvent(new MouseEvent("mouseup", opts));
                el.dispatchEvent(new MouseEvent("click", opts));
            } catch (e2) {
                try { el.click(); } catch (e3) { return false; }
            }
            return true;
        }
        function consoleHomeUrl() {
            var origin = "";
            try { origin = location.origin; } catch (e) { origin = cqOrigin(); }
            return origin + "/ierp/";
        }
        function makeFetchSession(frameId) {
            return {
                frameId: frameId,
                win: null,
                lastAppHome: "",
                lastList: "",
                lastBill: "",
                requests: [],
                timer: 0,
                listPageId: "",
                dataFormId: "",
                dataAppId: "",
                billFormId: "",
                pkField: "",
                postcols: null
            };
        }
        function getFetchSession(frameId) {
            if (!cqFetchSessions[frameId]) cqFetchSessions[frameId] = makeFetchSession(frameId);
            return cqFetchSessions[frameId];
        }
        function findClickInSession(sess, text, selector) {
            if (!sess || !sess.win) return null;
            return findClickInTree(sess.win, text, selector, 0, []);
        }
        function findConsolePageIdFrom(win) {
            var ids = collectPageIds(win, 0, [], []);
            var i;
            for (i = 0; i < ids.length; i++) if (isConsoleRootPageId(ids[i])) return ids[i];
            return "";
        }
        function removeFetchFrameById(frameId) {
            var nodes = [];
            try {
                var byId = hostWin().document.getElementById(frameId);
                if (byId) nodes.push(byId);
            } catch (e0) { }
            var n;
            for (n = 0; n < nodes.length; n++) {
                var el = nodes[n];
                try { el.onload = null; } catch (e2) { }
                try { el.src = "about:blank"; } catch (e3) { }
                try { if (el.parentNode) el.parentNode.removeChild(el); } catch (e4) { }
            }
        }
        function waitMs(ms) {
            return new Promise(function (resolve) { setTimeout(resolve, ms); });
        }
        function pushSessReq(sess, url, text) {
            if (!sess) return;
            var u = String(url || "");
            var pageId = takeQueryParam(u, "pageId");
            var formId = takeQueryParam(u, "f");
            var ac = takeQueryParam(u, "ac");
            var appId = takeQueryParam(u, "appId");
            var entry = {
                t: Date.now(),
                url: u.slice(0, 500),
                pageId: pageId,
                appId: appId,
                query: { ac: ac, f: formId, appId: appId },
                response: text
            };
            sess.requests.push(entry);
            if (sess.requests.length > 240) sess.requests.splice(0, sess.requests.length - 240);
            if (ac !== "loadData" || !text || hasTimeoutText(text)) return;
            if (formId === "crrc_party_dues_apphome") sess.lastAppHome = text;
            if (formId === "crrc_deduction_log") sess.lastList = text;
            if (formId === "crrc_dj_org_tree_ext") sess.lastList = text;
            if (formId === "crrc_dj_cb_count") {
                if (isPartyBillPageId(pageId, sess.listPageId, formId)) sess.lastBill = text;
                else sess.lastList = text;
            }
        }
        function isPartyBillPageId(pageId, listPageId, formId) {
            var pid = String(pageId || "");
            if (!pid) return false;
            if (listPageId && pid.indexOf(listPageId + "_") === 0) return true;
            if (formId && pid.indexOf("_" + formId + "_") >= 0) return true;
            return false;
        }
        function openFetchFrame(sess) {
            return new Promise(function (resolve, reject) {
                if (cqDisposed) return reject(new Error("aborted"));
                removeFetchFrameById(sess.frameId);
                var hostDoc = pageDoc();
                var iframe = hostDoc.createElement("iframe");
                iframe.id = sess.frameId;
                iframe.setAttribute("data-cq-fetch", "1");
                iframe.title = sess.frameId;
                var leftPx = "0";
                if (sess.frameId.indexOf("party") >= 0) leftPx = "8px";
                if (sess.frameId.indexOf("-org") >= 0) leftPx = "16px";
                iframe.setAttribute("style", "position:fixed;left:" + leftPx + ";top:0;width:1400px;height:900px;opacity:0;pointer-events:none;border:0;z-index:1;");
                var url = consoleHomeUrl();
                iframe.src = url;
                var settled = false;
                var startedWait = false;
                sess.timer = setTimeout(function () {
                    if (settled || cqDisposed) return;
                    settled = true;
                    reject(new Error("主控台 iframe 加载超时 " + url));
                }, 30000);
                iframe.onload = function () {
                    if (startedWait || settled || cqDisposed) return;
                    startedWait = true;
                    try { sess.win = iframe.contentWindow; sessionWin = sess.win; } catch (e) { }
                    hookSessionTree(sess);
                    waitFor(function () {
                        return findClickInSession(sess, "党费") || findClickInSession(sess, "应用");
                    }, 22000, 400, "主控台 iframe 中等待「应用/党费」").then(function (hit) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(sess.timer);
                        sess.timer = 0;
                        resolve(hit && hit.win ? hit.win : sess.win);
                    }, function (err) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(sess.timer);
                        sess.timer = 0;
                        reject(err);
                    });
                };
                (hostDoc.body || hostDoc.documentElement).appendChild(iframe);
            });
        }
        function ensureFetchSession(sess) {
            if (cqDisposed) return Promise.reject(new Error("aborted"));
            if (sess.win && (findClickInSession(sess, "党费") || findClickInSession(sess, "应用"))) {
                hookSessionTree(sess);
                clog("复用隐藏主控台 iframe", sess.frameId, safeHref(sess.win));
                return Promise.resolve(sess.win);
            }
            clog("打开隐藏主控台 iframe", sess.frameId, consoleHomeUrl());
            return openFetchFrame(sess);
        }
        function hookFetchOn(win, sess) {
            if (!win || cqDisposed || !sess) return;
            if (typeof win.fetch !== "function") return;
            if (win.__cqOurFetch && win.fetch === win.__cqOurFetch) {
                win.__cqFetchSess = sess;
                return;
            }
            var orig = win.fetch.bind(win);
            win.__cqOrigFetch = orig;
            win.__cqTenantHooked = true;
            win.__cqFetchSess = sess;
            win.fetch = function (input, init) {
                if (cqDisposed) return orig(input, init);
                var url = typeof input === "string" ? input : (input && input.url);
                noteTenantFromUrl(url, init && init.body);
                return orig(input, init).then(function (res) {
                    if (cqDisposed) return res;
                    try {
                        var u = String(url || "");
                        if (u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                pushSessReq(win.__cqFetchSess || sess, u, text);
                            }).catch(function () { });
                        }
                    } catch (e) { }
                    return res;
                });
            };
            win.__cqOurFetch = win.fetch;
        }
        function hookSessionTree(sess) {
            if (!sess || !sess.win) return;
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { hookFetchOn(win, sess); } catch (e) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e2) { }
            }
            walk(sess.win, 0);
        }
        function hookParentForTenant() {
            var dSess = cqFetchSessions["cq-fetch-frame-deduction"];
            var pSess = cqFetchSessions["cq-fetch-frame-party"];
            var oSess = cqFetchSessions["cq-fetch-frame-org"];
            if (dSess) hookSessionTree(dSess);
            if (pSess) hookSessionTree(pSess);
            if (oSess) hookSessionTree(oSess);
        }
        function waitFor(fn, timeout, step, label) {
            var t0 = Date.now();
            return new Promise(function (resolve, reject) {
                function tick() {
                    if (cqDisposed) return reject(new Error("aborted"));
                    var v = fn();
                    if (v) return resolve(v);
                    if (Date.now() - t0 > (timeout || 8000)) {
                        return reject(new Error(label || "等待超时"));
                    }
                    setTimeout(tick, step || 250);
                }
                tick();
            });
        }
        function cqInvoke(win, appId, formId, action, pageId, params) {
            var w = win || parentWin();
            var origin = "";
            try { origin = w.location.origin; } catch (e0) { origin = cqOrigin(); }
            var url = origin + "/ierp/form/batchInvokeAction.do?appId=" + encodeURIComponent(appId)
                + "&f=" + encodeURIComponent(formId) + "&ac=" + encodeURIComponent(action);
            var body = "pageId=" + encodeURIComponent(pageId)
                + "&appId=" + encodeURIComponent(appId)
                + "&params=" + encodeURIComponent(JSON.stringify(params));
            var fetchFn = (w.fetch ? w.fetch.bind(w) : fetch);
            return fetchFn(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
                    ajax: "true",
                    cqappid: appId
                },
                body: body
            }).then(function (res) {
                return res.text().then(function (text) {
                    if (!res.ok) throw new Error("HTTP " + res.status + " " + text.slice(0, 400));
                    if (hasTimeoutText(text)) throw new Error("表单会话超时");
                    try { return JSON.parse(text); } catch (e) { return text; }
                });
            });
        }
        function parseMaybeJson(data) {
            if (typeof data !== "string") return data;
            var text = data;
            if (text.indexOf(")]}',") === 0) text = text.slice(5);
            else if (text.indexOf(")]}'") === 0) text = text.slice(4);
            var brace = text.indexOf("{");
            var bracket = text.indexOf("[");
            var start = brace < 0 ? bracket : (bracket < 0 ? brace : Math.min(brace, bracket));
            if (start > 0) text = text.slice(start);
            try { return JSON.parse(text); } catch (e) { return data; }
        }
        function walkCq(obj, fn, depth, seen) {
            if (!obj || typeof obj !== "object" || depth > 14) return;
            if (seen.indexOf(obj) >= 0) return;
            seen.push(obj);
            fn(obj);
            if (!Array.isArray(obj)) {
                var mnSkip = String(obj.methodname || obj.methodName || "");
                if (mnSkip === "addNodes" || mnSkip === "updateNodes") return;
            }
            if (Array.isArray(obj)) {
                var n = Math.min(obj.length, 400);
                for (var i = 0; i < n; i++) walkCq(obj[i], fn, depth + 1, seen);
                return;
            }
            var keys = Object.keys(obj);
            for (var k = 0; k < keys.length && k < 400; k++) walkCq(obj[keys[k]], fn, depth + 1, seen);
        }
        function cqCell(val) {
            if (val == null) return "";
            if (Array.isArray(val)) {
                if (val.length >= 2 && typeof val[1] === "number") return val[1];
                if (val.length >= 2 && val[1] != null && val[1] !== "") return val[1];
                if (val[0] != null) return val[0];
                return "";
            }
            return val;
        }
        function deductionFieldLabel(key) {
            var map = {
                billno: "单据编号",
                billstatus: "单据状态",
                crrc_datefield: "年份",
                crrc_radiooptgroupfield: "季度",
                crrc_textfield: "扣分事项",
                crrc_textfield1: "扣分依据",
                crrc_decimalfield: "扣分分数",
                crrc_basedatafield: "被扣分组织",
                crrc_basedatafield_name: "被扣分组织",
                "crrc_basedatafield.name": "被扣分组织",
                crrc_orgfield: "输出部门",
                crrc_orgfield_name: "输出部门.名称",
                "crrc_orgfield.name": "输出部门.名称"
            };
            if (map[key]) return map[key];
            if (key.length > 5 && key.slice(key.length - 5) === "_name") {
                var base = key.slice(0, key.length - 5);
                if (map[base]) return map[base] + ".名称";
            }
            return key;
        }
        function deductionRowKey(dataindex) {
            return String(dataindex || "").split(".").join("_");
        }
        function shouldSkipDeductionKey(key, idx) {
            if (!key) return true;
            var low = String(key).toLowerCase();
            if (low === "rk" || low === "fseq" || low === "s" || low === "cprop") return true;
            if (low === "seq" || low === "rowkey" || low === "id") return true;
            if (key.length >= 3 && key.slice(key.length - 3) === "_id") return true;
            if (key.indexOf("entryentity") >= 0) return true;
            if (idx[key + "_name"] != null || idx[key + ".name"] != null) return true;
            return false;
        }
        function formatDeductionValue(key, raw) {
            if (raw == null || raw === "") return "";
            if (key === "billstatus" || key.indexOf("billstatus") >= 0) {
                var st = String(cqCell(raw));
                return STATUS_TEXT[st] || st;
            }
            if (key === "crrc_radiooptgroupfield" || key.indexOf("radioopt") >= 0 || key === "crrc_combofield" || key.indexOf("combofield") >= 0) {
                var pd = String(cqCell(raw));
                return PERIOD_TEXT[pd] || pd;
            }
            if (key === "crrc_datefield" || key === "crrc_datetimefield") {
                if (Array.isArray(raw)) {
                    var y0 = raw[0];
                    if (y0 != null && String(y0) !== "") {
                        var ys = String(y0);
                        if (ys.length >= 4) return ys.slice(0, 4);
                    }
                    if (raw[1] != null) return String(raw[1]).slice(0, 4);
                }
                var ds = String(cqCell(raw));
                return ds.length >= 4 ? ds.slice(0, 4) : ds;
            }
            var v = cqCell(raw);
            if (v && typeof v === "object") return "";
            return v == null ? "" : v;
        }
        function captionText(cap) {
            if (cap == null) return "";
            if (typeof cap === "string") return cap;
            if (typeof cap === "object") return cap.zh_CN || cap.en_US || cap.zh_TW || "";
            return String(cap);
        }
        function collectDeductionCaptions(payload, pack) {
            var map = {};
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var di = obj.dataindex != null ? obj.dataindex : (obj.dataIndex != null ? obj.dataIndex : obj.fieldId);
                var cap = obj.caption != null ? obj.caption : (obj.title != null ? obj.title : obj.header);
                var text = captionText(cap);
                if (typeof di === "string" && di && text) {
                    if (!map[di]) map[di] = text;
                }
            }, 0, []);
            var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
            if (Array.isArray(packCols)) {
                for (var i = 0; i < packCols.length; i++) {
                    var col = packCols[i];
                    if (!col || typeof col !== "object") continue;
                    var cdi = col.dataindex || col.dataIndex || col.fieldId;
                    var ccap = captionText(col.caption || col.title || col.header);
                    if (typeof cdi === "string" && cdi && ccap) map[cdi] = ccap;
                }
            }
            return map;
        }
        function parseDeductionTable(payload) {
            var pack = null;
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object") return;
                if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
            }, 0, []);
            if (!pack) return { columns: [], rows: [] };
            var idx = pack.dataindex || {};
            var captions = collectDeductionCaptions(payload, pack);
            var keys = Object.keys(idx);
            keys.sort(function (a, b) { return Number(idx[a]) - Number(idx[b]); });
            var fieldKeys = [];
            var used = {};
            var i;
            for (i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (shouldSkipDeductionKey(k, idx)) continue;
                var rowKey = deductionRowKey(k);
                if (used[rowKey]) continue;
                used[rowKey] = true;
                var known = deductionFieldLabel(k);
                fieldKeys.push({ dataindex: k, caption: known !== k ? known : (captions[k] || k) });
            }
            var columns = fieldKeys.map(function (f) {
                var key = deductionRowKey(f.dataindex);
                var label = f.caption || deductionFieldLabel(f.dataindex);
                var numeric = key.indexOf("decimal") >= 0 || label.indexOf("分数") >= 0 || label.indexOf("得分") >= 0;
                var badge = key.indexOf("billstatus") >= 0 || label.indexOf("状态") >= 0;
                var compact = numeric || badge
                    || key === "billno"
                    || key.indexOf("datefield") >= 0
                    || key.indexOf("radioopt") >= 0
                    || label === "年份"
                    || label === "季度"
                    || label === "单据编号";
                var wrap = !compact && (key.indexOf("textfield") >= 0 || key.indexOf("largetext") >= 0 || label.indexOf("依据") >= 0 || label.indexOf("事项") >= 0);
                return { key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact, wrap: wrap };
            });
            var rows = (pack.rows || []).map(function (row, ridx) {
                var out = { _rowId: "d" + ridx };
                for (var j = 0; j < fieldKeys.length; j++) {
                    var f = fieldKeys[j];
                    var key = deductionRowKey(f.dataindex);
                    var pos = idx[f.dataindex];
                    var raw = pos != null ? row[pos] : "";
                    var formatted = formatDeductionValue(f.dataindex, raw);
                    if (columns[j] && columns[j].numeric && formatted !== "" && typeof formatted !== "number") {
                        var num = Number(formatted);
                        out[key] = num !== num ? formatted : num;
                    } else {
                        out[key] = formatted == null ? "" : formatted;
                    }
                }
                return out;
            });
            return { columns: columns, rows: rows, fieldKeys: fieldKeys };
        }
        function remountDeductionTable() {
            var def = TABLE_DEFS.deduction;
            if (!window.__cqDataTable || !def) return;
            window.__cqDataTable.mount("deduction", "dt-deduction", def.columns, def.rows, {
                pageSize: 10,
                filterPlaceholder: "搜索" + def.label + "…",
                filterHostId: "dt-filter-deduction"
            });
        }
        function applyDeductionTable(parsed) {
            if (parsed.columns && parsed.columns.length) TABLE_DEFS.deduction.columns = parsed.columns;
            TABLE_DEFS.deduction.rows = parsed.rows || [];
            remountDeductionTable();
        }
        function loadDeductionFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (deductionLoading) return deductionLoading;
            var sess = getFetchSession("cq-fetch-frame-deduction");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win || parentWin())
                });
                clog("扣分项 consolePageId", consolePageId, "suffix", suffix, "session", safeHref(sess.win));
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_DEDUCTION.menuAppId + suffix;
                var listPageId = CQ_DEDUCTION.menuItemId + suffix;
                sess.lastList = "";
                sess.lastAppHome = "";
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_DEDUCTION.menuAppId,
                        CQ_DEDUCTION.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_DEDUCTION.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_DEDUCTION.menuRoot, CQ_DEDUCTION.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_DEDUCTION.dataAppId,
                            CQ_DEDUCTION.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                return clickAppThenParty(sess, step).then(function () {
                    var menuHit = findClickInSession(sess, "扣分项台账");
                    step("find-menu", { hasMenu: !!(menuHit && menuHit.el) });
                    if (menuHit) {
                        clog("点击扣分项台账");
                        fireParentClick(menuHit.el, menuHit.win);
                        return waitFor(function () { return sess.lastList; }, 15000, 250, "等待扣分项 loadData").catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var data = parseMaybeJson(sess.lastList || res);
                    var parsed = parseDeductionTable(data);
                    var rows = parsed.rows || [];
                    var colLabels = (parsed.columns || []).map(function (c) { return c.label; }).join(",");
                    clog("扣分项 loadData 解析行数", rows.length, "列", colLabels);
                    if (!rows.length) {
                        var preview = "";
                        try { preview = JSON.stringify(data).slice(0, 1200); } catch (e) { preview = String(data).slice(0, 1200); }
                        clog("扣分项未能解析行，预览", preview);
                        reportError("deduction-empty", new Error("loadData 已返回但未能识别行"), { trail: trail, preview: preview });
                    }
                    deductionReady = !!(parsed.columns && parsed.columns.length) || rows.length > 0;
                    applyDeductionTable(parsed);
                    try { window.__cqLastDeductionParse = parsed; } catch (e3) { }
                    if (deductionReady) {
                        showAlert("default", "扣分项台账加载成功", "已加载 " + rows.length + " 条，" + (parsed.columns || []).length + " 列");
                    } else {
                        showAlert("destructive", "扣分项台账加载失败", "已返回数据但未能识别行，请查看控制台预览");
                    }
                    return rows;
                });
            }).then(function (rows) {
                deductionLoading = false;
                return rows;
            }, function (err) {
                deductionLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("扣分项加载失败", err && err.message);
                reportError("deduction-load", err, { trail: trail });
                showAlert("destructive", "扣分项台账加载失败", err && err.message ? String(err.message) : String(err));
            });
            deductionLoading = task;
            return task;
        }
        function clickAppThenParty(sess, step) {
            return Promise.resolve().then(function () {
                hookSessionTree(sess);
                var alreadyParty = findClickInSession(sess, "党费");
                var appHit = findClickInSession(sess, "应用", ".kd-cq-homepage-tab-item-text") || findClickInSession(sess, "应用");
                if (step) step("before-click-app", { alreadyParty: !!alreadyParty, hasApp: !!appHit, frameId: sess.frameId });
                if (alreadyParty) return;
                if (appHit) {
                    clog("点击应用", sess.frameId);
                    fireParentClick(appHit.el, appHit.win);
                }
            }).then(function () {
                return waitFor(function () { return findClickInSession(sess, "党费"); }, 15000, 250, "等待出现「党费」入口");
            }).then(function (partyHit) {
                hookSessionTree(sess);
                clog("点击党费", sess.frameId);
                if (step) step("click-party", { ok: !!(partyHit && partyHit.el) });
                fireParentClick(partyHit.el, partyHit.win);
                return waitFor(function () { return sess.lastAppHome; }, 15000, 250, "等待党费首页 loadData").catch(function () {
                    clog("未捕获到党费首页 loadData，仍继续", sess.frameId);
                    if (step) step("app-home-payload-miss", { lastAppHomeLen: String(sess.lastAppHome || "").length });
                    return waitMs(1500);
                });
            }).then(function () {
                hookSessionTree(sess);
                return waitMs(400);
            });
        }
        try { parentWin().__cqFetchDeduction = loadDeductionFromCq; } catch (e) { }
        try { window.__cqFetchDeduction = loadDeductionFromCq; } catch (eWin) { }
        try { window.__cqDisposeOverlay = disposeCqResources; } catch (eDisp) { }

        function partyFieldLabel(key) {
            var raw = String(key || "");
            if (raw.indexOf("entry_") === 0) raw = raw.slice(6);
            var map = {
                billno: "编号",
                billstatus: "数据状态",
                crrc_datetimefield: "统计年",
                crrc_combofield: "季度",
                crrc_basedatafield: "组织类型",
                crrc_basedatafield1: "党组织",
                crrc_decimalfield13: "合计得分",
                seq: "分录序号",
                fseq: "分录序号"
            };
            if (map[raw]) return map[raw];
            if (raw.length > 5 && raw.slice(raw.length - 5) === "_name") {
                var base = raw.slice(0, raw.length - 5);
                if (map[base]) return map[base] + ".名称";
            }
            return key;
        }
        function isReservedForm(formId) {
            return formId === CQ_DEDUCTION.consoleForm
                || formId === CQ_DEDUCTION.myAppForm
                || formId === CQ_DEDUCTION.menuFormId
                || formId === CQ_PARTY.menuFormId;
        }
        function waitForSessReq(sess, pred, timeout, label) {
            return waitFor(function () {
                var arr = sess.requests || [];
                var i;
                for (i = arr.length - 1; i >= 0; i--) {
                    if (pred(arr[i])) return arr[i];
                }
                return null;
            }, timeout || 15000, 200, label || "等待苍穹请求");
        }
        function isPartyListLoad(r, sess) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return false;
            var f = r.query.f;
            if (!f || isReservedForm(f)) return false;
            if (sess.listPageId && r.pageId === sess.listPageId) return true;
            return f === CQ_PARTY.dataFormId && String(r.response).indexOf("billlistap") >= 0;
        }
        function isPartyBillLoad(r, sess, minTs) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            if (minTs && r.t && r.t < minTs - 300) return false;
            if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return true;
            return String(r.response).indexOf("entryentity") >= 0;
        }
        function findBillListPack(payload) {
            var pack = null;
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object") return;
                if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
            }, 0, []);
            return pack;
        }
        function shouldSkipPartyKey(key, idx, opts) {
            if (!key) return true;
            opts = opts || {};
            var low = String(key).toLowerCase();
            if (low === "rk" || low === "s" || low === "cprop" || low === "l" || low === "vi" || low === "u") return true;
            if (!opts.keepSeq && (low === "fseq" || low === "seq")) return true;
            if (low === "rowkey" || low === "id") return true;
            if (key.length >= 3 && key.slice(key.length - 3) === "_id") return true;
            if (!opts.keepEntryKey && key.indexOf("entryentity") >= 0) return true;
            if (idx && (idx[key + "_name"] != null || idx[key + ".name"] != null)) return true;
            return false;
        }
        function mapPartyPack(pack, payload, opts) {
            opts = opts || {};
            var idx = pack.dataindex || {};
            var captions = collectDeductionCaptions(payload || pack, pack);
            var keys = Object.keys(idx);
            keys.sort(function (a, b) { return Number(idx[a]) - Number(idx[b]); });
            var fieldKeys = [];
            var used = {};
            var i;
            for (i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (shouldSkipPartyKey(k, idx, opts) || used[k]) continue;
                used[k] = true;
                var cap = captions[k] || partyFieldLabel(k);
                fieldKeys.push({ dataindex: k, caption: cap });
            }
            var rows = (pack.rows || []).map(function (row) {
                var out = {};
                var j;
                for (j = 0; j < fieldKeys.length; j++) {
                    var f = fieldKeys[j];
                    var pos = idx[f.dataindex];
                    var raw = pos != null ? row[pos] : "";
                    out[f.dataindex] = formatDeductionValue(f.dataindex, raw);
                }
                return out;
            });
            return { columns: fieldKeys, rows: rows };
        }
        function packCellAt(pack, row, key) {
            var idx = (pack && pack.dataindex) || {};
            if (idx[key] == null) return "";
            return cqCell(row[idx[key]]);
        }
        function findPkField(pack, payload) {
            var idx = (pack && pack.dataindex) || {};
            if (idx[CQ_PARTY.pkField] != null) return CQ_PARTY.pkField;
            if (idx.id != null) return "id";
            var found = "";
            walkCq(parseMaybeJson(payload), function (obj) {
                if (found || !obj || typeof obj !== "object") return;
                var pk = obj.pkFieldName || obj.pkfieldname;
                if (typeof pk !== "string" || !pk) return;
                var short = pk.split(".").pop();
                if (idx[pk] != null) found = pk;
                else if (idx[short] != null) found = short;
            }, 0, []);
            if (found) return found;
            var keys = Object.keys(idx);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === "_id") return keys[i];
            }
            return CQ_PARTY.pkField;
        }
        function extractPartyListBills(payload, sess) {
            var parsedPayload = parseMaybeJson(payload);
            var pack = findBillListPack(parsedPayload);
            if (!pack) return { columns: [], rows: [] };
            var table = mapPartyPack(pack, parsedPayload, {});
            var pkField = findPkField(pack, parsedPayload);
            sess.pkField = pkField;
            if (Array.isArray(pack.postcols) && pack.postcols.length) sess.postcols = pack.postcols.slice();
            var rows = (pack.rows || []).map(function (row, i) {
                var mapped = {};
                var src = table.rows[i] || {};
                var sk = Object.keys(src);
                var s;
                for (s = 0; s < sk.length; s++) mapped[sk[s]] = src[sk[s]];
                mapped._pkId = String(packCellAt(pack, row, pkField) || packCellAt(pack, row, "id") || "");
                mapped._billno = String(mapped.billno || packCellAt(pack, row, "billno") || "");
                mapped._billstatus = String(packCellAt(pack, row, "billstatus") || "");
                mapped._rowIndex = i;
                return mapped;
            });
            return { columns: table.columns, rows: rows };
        }
        function isEntryName(name) {
            var s = String(name || "").toLowerCase();
            return !!s && (s.indexOf("entry") >= 0 || s.indexOf("billentry") >= 0);
        }
        function packFromObj(obj) {
            if (!obj || typeof obj !== "object") return null;
            if (Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) return obj;
            if (obj.data && Array.isArray(obj.data.rows) && obj.data.dataindex) return obj.data;
            if (obj.p && Array.isArray(obj.p.rows) && obj.p.dataindex) return obj.p;
            return null;
        }
        function findEntryPacks(payload) {
            var packs = [];
            function add(key, data) {
                if (!data || !Array.isArray(data.rows)) return;
                var i;
                for (i = 0; i < packs.length; i++) if (packs[i].data === data) return;
                packs.push({ key: String(key || "entry"), data: data });
            }
            walkCq(parseMaybeJson(payload), function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var k = obj.k || obj.c || obj.key || "";
                if (isEntryName(k)) {
                    var p = packFromObj(obj);
                    if (p) add(k, p);
                }
                var keys = Object.keys(obj);
                var i;
                for (i = 0; i < keys.length; i++) {
                    if (!isEntryName(keys[i])) continue;
                    var pack = packFromObj(obj[keys[i]]);
                    if (pack) add(keys[i], pack);
                }
            }, 0, []);
            return packs;
        }
        function pickBestEntryPack(packs) {
            if (!packs || !packs.length) return null;
            var named = [];
            var i;
            for (i = 0; i < packs.length; i++) if (isEntryName(packs[i].key)) named.push(packs[i]);
            var list = named.length ? named : packs;
            var best = list[0];
            var j;
            for (j = 1; j < list.length; j++) {
                if ((list[j].data.rows || []).length > (best.data.rows || []).length) best = list[j];
            }
            return best;
        }
        function isSkipHeaderKey(key) {
            if (!key || key.charAt(0) === "_") return true;
            var skip = {
                k: 1, c: 1, a: 1, p: 1, u: 1, l: 1, vi: 1, data: 1, dataindex: 1,
                rows: 1, cols: 1, columns: 1, pageId: 1, appId: 1, params: 1
            };
            if (skip[key]) return true;
            var low = String(key).toLowerCase();
            if (low.indexOf("entry") >= 0) return true;
            if (low === "billlistap" || (low.length >= 2 && low.slice(low.length - 2) === "ap")) return true;
            return false;
        }
        function headerFromListBill(bill) {
            var header = {};
            if (!bill) return header;
            var keys = Object.keys(bill);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].charAt(0) === "_") continue;
                header[keys[i]] = bill[keys[i]];
            }
            return header;
        }
        function setHeaderVal(header, key, raw) {
            if (isSkipHeaderKey(key)) return;
            if (raw && typeof raw === "object" && !Array.isArray(raw) && (raw.rows || raw.dataindex)) return;
            var val = formatDeductionValue(key, raw);
            if (val == null || val === "") return;
            if (typeof val === "object") return;
            if (header[key] == null || header[key] === "") header[key] = val;
        }
        function extractBillHeader(payload, listBill) {
            var header = {};
            var root = parseMaybeJson(payload);
            walkCq(root, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var k = obj.k || obj.c;
                if (typeof k === "string" && k && obj.v !== undefined && !isSkipHeaderKey(k)) {
                    setHeaderVal(header, k, obj.v);
                }
            }, 0, []);
            var listHeader = headerFromListBill(listBill);
            var lk = Object.keys(listHeader);
            var j;
            for (j = 0; j < lk.length; j++) {
                if (header[lk[j]] == null || header[lk[j]] === "") header[lk[j]] = listHeader[lk[j]];
            }
            return header;
        }
        function flattenPartyBill(header, entry, meta) {
            var out = {};
            var hk = Object.keys(header || {});
            var i;
            for (i = 0; i < hk.length; i++) {
                if (hk[i].charAt(0) === "_") continue;
                out[hk[i]] = header[hk[i]];
            }
            if (entry) {
                var ek = Object.keys(entry);
                var j;
                for (j = 0; j < ek.length; j++) {
                    var k = ek[j];
                    if (k.charAt(0) === "_") continue;
                    out[Object.prototype.hasOwnProperty.call(out, k) ? "entry_" + k : k] = entry[k];
                }
            }
            out._billPkId = (meta && meta.pk) || "";
            out._entrySeq = meta && meta.seq != null ? meta.seq : "";
            return out;
        }
        function combinePartyColumns(headerCols, entryCols, header) {
            var cols = (headerCols || []).slice();
            var seen = {};
            var i;
            for (i = 0; i < cols.length; i++) seen[cols[i].dataindex] = true;
            var j;
            for (j = 0; j < (entryCols || []).length; j++) {
                var c = entryCols[j];
                var key = header && Object.prototype.hasOwnProperty.call(header, c.dataindex) ? "entry_" + c.dataindex : c.dataindex;
                if (seen[key]) continue;
                seen[key] = true;
                cols.push({ dataindex: key, caption: c.caption || partyFieldLabel(c.dataindex), part: "entry" });
            }
            return cols;
        }
        function extractPartyBillData(payload, listBill) {
            var parsedPayload = parseMaybeJson(payload);
            var header = extractBillHeader(parsedPayload, listBill);
            var pack = pickBestEntryPack(findEntryPacks(parsedPayload));
            var mapped = pack ? mapPartyPack(pack.data, parsedPayload, { keepSeq: true }) : { columns: [], rows: [] };
            var entries = mapped.rows || [];
            var headerCols = [];
            var hk = Object.keys(header);
            var hi;
            var captions = collectDeductionCaptions(parsedPayload, pack && pack.data);
            for (hi = 0; hi < hk.length; hi++) {
                if (hk[hi].charAt(0) === "_") continue;
                headerCols.push({
                    dataindex: hk[hi],
                    caption: captions[hk[hi]] || partyFieldLabel(hk[hi]),
                    part: "header"
                });
            }
            var pk = (listBill && listBill._pkId) || header[CQ_PARTY.pkField] || "";
            var flat = [];
            if (!entries.length) {
                flat.push(flattenPartyBill(header, null, { pk: pk, seq: -1 }));
            } else {
                var ei;
                for (ei = 0; ei < entries.length; ei++) {
                    flat.push(flattenPartyBill(header, entries[ei], { pk: pk, seq: ei }));
                }
            }
            return {
                header: header,
                headerColumns: headerCols,
                entries: entries,
                entryColumns: mapped.columns || [],
                columns: combinePartyColumns(headerCols, mapped.columns || [], header),
                rows: flat
            };
        }
        function partyColsToTable(columns, rows) {
            var defs = [];
            var used = {};
            var numericKeys = {};
            var i;
            for (i = 0; i < (columns || []).length; i++) {
                var di = columns[i].dataindex;
                var key = deductionRowKey(di);
                if (used[key]) continue;
                used[key] = true;
                var label = columns[i].caption || partyFieldLabel(di);
                if (!label || label === di) label = partyFieldLabel(di);
                var numeric = key.indexOf("decimal") >= 0 || label.indexOf("分数") >= 0 || label.indexOf("得分") >= 0;
                var badge = key.indexOf("billstatus") >= 0 || label.indexOf("状态") >= 0;
                var compact = numeric || badge
                    || key === "billno"
                    || key.indexOf("datetimefield") >= 0
                    || key.indexOf("combofield") >= 0
                    || label === "统计年"
                    || label === "季度"
                    || label === "编号";
                var wrap = !compact && (key.indexOf("largetext") >= 0 || key.indexOf("textfield") >= 0 || label.indexOf("说明") >= 0 || label.indexOf("备注") >= 0);
                if (numeric) numericKeys[key] = true;
                defs.push({ key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact, wrap: wrap });
            }
            var outRows = (rows || []).map(function (row, ridx) {
                var o = { _rowId: "p" + ridx };
                var j;
                for (j = 0; j < (columns || []).length; j++) {
                    var k = deductionRowKey(columns[j].dataindex);
                    var val = row[columns[j].dataindex];
                    if (numericKeys[k] && val !== "" && typeof val !== "number") {
                        var num = Number(val);
                        o[k] = num !== num ? val : num;
                    } else {
                        o[k] = val == null ? "" : val;
                    }
                }
                return o;
            });
            return { columns: defs, rows: outRows };
        }
        function remountPartyTable() {
            var def = TABLE_DEFS.partyQuarterly;
            if (!window.__cqDataTable || !def) return;
            window.__cqDataTable.mount("partyQuarterly", "dt-partyQuarterly", def.columns, def.rows, {
                pageSize: 20,
                filterPlaceholder: "搜索" + def.label + "…",
                filterHostId: "dt-filter-partyQuarterly"
            });
        }
        function applyPartyTable(parsed) {
            if (parsed.columns && parsed.columns.length) TABLE_DEFS.partyQuarterly.columns = parsed.columns;
            TABLE_DEFS.partyQuarterly.rows = parsed.rows || [];
            remountPartyTable();
        }
        function findPartyMenu(sess) {
            var texts = CQ_PARTY.menuTexts;
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findClickInSession(sess, texts[i]);
                if (hit) return { hit: hit, text: texts[i] };
            }
            return null;
        }
        function findBillLinkInSession(sess, bill) {
            var no = bill && (bill._billno || bill.billno);
            if (!no || !sess.win) return null;
            var doc = sess.win.document;
            var el = findParentClickTarget(doc, String(no), "span.link-cell-content, span.link-color, a, span")
                || findParentClickTarget(doc, String(no));
            if (!el) return null;
            return { el: el, win: sess.win };
        }
        function closeBillInSession(sess, bill) {
            var no = bill && (bill._billno || bill.billno);
            var doc = sess.win && sess.win.document;
            if (!doc) return waitMs(200);
            if (no) {
                var tabs = [];
                try { tabs = doc.querySelectorAll(".kd-cq-tab-item, .kd-cq-homepage-tab-item, [role='tab']"); } catch (e0) { }
                var i;
                for (i = 0; i < tabs.length; i++) {
                    var title = collapseWs(tabs[i].innerText || tabs[i].textContent || "");
                    if (title.indexOf(String(no)) < 0) continue;
                    var closeBtn = tabs[i].querySelector(".close, .kd-cq-tab-close, [class*='close']");
                    if (closeBtn) {
                        fireParentClick(closeBtn, sess.win);
                        return waitMs(400);
                    }
                }
            }
            var btn = findClickInSession(sess, "关闭") || findClickInSession(sess, "取消");
            if (btn) {
                fireParentClick(btn.el, btn.win);
                return waitMs(400);
            }
            return waitMs(200);
        }
        function partyListSelData(sess, bill) {
            var postcols = sess.postcols;
            if (!Array.isArray(postcols) || !postcols.length) {
                postcols = [sess.pkField || CQ_PARTY.pkField, "billstatus", "billno"];
            }
            return postcols.map(function (col) {
                if (col === "billno") return bill._billno || bill.billno || "";
                if (col === "billstatus") return bill._billstatus || "";
                if (col === (sess.pkField || CQ_PARTY.pkField) || String(col).slice(-3) === "_id") return bill._pkId || "";
                if (bill[col] != null && bill[col] !== "") return String(bill[col]);
                return "";
            });
        }
        function invokePartyBillOpen(sess, rowIndex, bill) {
            var appId = sess.dataAppId || CQ_PARTY.dataAppId;
            var formId = sess.dataFormId || CQ_PARTY.dataFormId;
            var pageId = sess.listPageId;
            var field = "billno";
            var ctrl = CQ_PARTY.listControl;
            var sel = partyListSelData(sess, bill);
            return cqInvoke(sess.win, appId, formId, "entryRowClick", pageId, [
                {
                    key: ctrl,
                    methodName: "entryRowClick",
                    args: [rowIndex, field],
                    postData: [{
                        billlistap: {
                            fieldKey: field,
                            row: rowIndex,
                            selRows: [rowIndex],
                            selDatas: [sel],
                            isClientNewRow: false,
                            clientNewRows: ""
                        }
                    }, []]
                },
                {
                    key: ctrl,
                    methodName: "hyperLinkClick",
                    args: [field, rowIndex],
                    postData: [{}, []]
                }
            ]);
        }
        function openOnePartyBill(sess, bill, rowIndex) {
            var started = Date.now();
            function waitBill(ms) {
                return waitForSessReq(sess, function (r) {
                    return isPartyBillLoad(r, sess, started);
                }, ms || 20000, "等待单据 loadData");
            }
            return waitFor(function () {
                return findBillLinkInSession(sess, bill);
            }, 8000, 200, "等待单据编号链接").then(function (link) {
                clog("点击编号打开单据", bill._billno || bill.billno || "");
                fireParentClick(link.el, link.win);
                return waitBill(12000);
            }).catch(function () {
                clog("改用 entryRowClick 打开单据", bill._billno || "");
                return invokePartyBillOpen(sess, rowIndex, bill).then(function () {
                    return waitBill(20000);
                });
            }).then(function (billReq) {
                if (!billReq) throw new Error("未等到单据 loadData");
                sess.dataFormId = (billReq.query && billReq.query.f) || sess.dataFormId || CQ_PARTY.dataFormId;
                sess.dataAppId = billReq.appId || sess.dataAppId || CQ_PARTY.dataAppId;
                var parsed = extractPartyBillData(billReq.response, bill);
                if (!parsed.entries.length && String(billReq.response || "").indexOf("entryentity") < 0) {
                    throw new Error("单据已开但未解析到分录 entryentity");
                }
                return closeBillInSession(sess, bill).then(function () { return parsed; });
            });
        }
        function collectPartyEntries(sess, bills) {
            var allRows = [];
            var headerCols = [];
            var entryCols = [];
            var allHeader = {};
            var opened = 0;
            var failed = 0;
            var entryCount = 0;
            var n = Math.min(bills.length, CQ_PARTY.maxBills || 40);
            function mergeCols(into, add) {
                var seen = {};
                var i;
                for (i = 0; i < into.length; i++) seen[into[i].dataindex] = true;
                for (i = 0; i < (add || []).length; i++) {
                    if (!add[i] || seen[add[i].dataindex]) continue;
                    seen[add[i].dataindex] = true;
                    into.push(add[i]);
                }
            }
            function pushParsed(bill, parsed) {
                var header = (parsed && parsed.header) || headerFromListBill(bill);
                var rows = (parsed && parsed.rows) || [];
                if (!rows.length) rows = [flattenPartyBill(header, null, { pk: bill._pkId || "", seq: -1 })];
                entryCount += (parsed && parsed.entries ? parsed.entries.length : 0);
                mergeCols(headerCols, parsed && parsed.headerColumns);
                mergeCols(entryCols, parsed && parsed.entryColumns);
                var hk = Object.keys(header);
                var hi;
                for (hi = 0; hi < hk.length; hi++) allHeader[hk[hi]] = header[hk[hi]];
                var r;
                for (r = 0; r < rows.length; r++) allRows.push(rows[r]);
            }
            function step(i) {
                if (cqDisposed) return Promise.resolve({ rows: allRows, headerCols: headerCols, entryCols: entryCols, allHeader: allHeader, opened: opened, failed: failed, entryCount: entryCount });
                if (i >= n) {
                    return Promise.resolve({
                        rows: allRows,
                        headerCols: headerCols,
                        entryCols: entryCols,
                        allHeader: allHeader,
                        opened: opened,
                        failed: failed,
                        entryCount: entryCount
                    });
                }
                var bill = bills[i];
                var idx = bill._rowIndex != null ? bill._rowIndex : i;
                clog("打开单据", (i + 1) + "/" + n, bill._billno || bill.billno || "");
                hookSessionTree(sess);
                return openOnePartyBill(sess, bill, idx).then(function (parsed) {
                    opened += 1;
                    pushParsed(bill, parsed);
                    return waitMs(350).then(function () { return step(i + 1); });
                }, function (err) {
                    failed += 1;
                    clog("打开单据失败，保留列表头", bill._billno || bill._pkId, err && err.message);
                    pushParsed(bill, {
                        header: headerFromListBill(bill),
                        headerColumns: [],
                        entries: [],
                        entryColumns: [],
                        rows: [flattenPartyBill(headerFromListBill(bill), null, { pk: bill._pkId || "", seq: -1 })]
                    });
                    return waitMs(250).then(function () { return step(i + 1); });
                });
            }
            return step(0);
        }
        function loadPartyQuarterlyFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (partyLoading) return partyLoading;
            var sess = getFetchSession("cq-fetch-frame-party");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("pq-step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win)
                });
                clog("季度党群绩效 consolePageId", consolePageId, "suffix", suffix);
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_PARTY.menuAppId + suffix;
                var listPageId = CQ_PARTY.menuItemId + suffix;
                sess.listPageId = listPageId;
                sess.dataFormId = CQ_PARTY.dataFormId;
                sess.dataAppId = CQ_PARTY.dataAppId;
                sess.lastList = "";
                sess.lastBill = "";
                sess.lastAppHome = "";
                sess.requests = [];
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_PARTY.menuAppId,
                        CQ_PARTY.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_PARTY.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_PARTY.menuRoot, CQ_PARTY.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_PARTY.dataAppId,
                            CQ_PARTY.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                function waitListLoad() {
                    return waitForSessReq(sess, function (r) {
                        return isPartyListLoad(r, sess);
                    }, 15000, "等待季度党群绩效列表 loadData");
                }
                return clickAppThenParty(sess, step).then(function () {
                    var hit = findPartyMenu(sess);
                    step("find-menu", { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : "" });
                    if (hit && hit.hit) {
                        clog("点击", hit.text);
                        fireParentClick(hit.hit.el, hit.hit.win);
                        return waitListLoad().catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var payload = sess.lastList;
                    if (!payload && res && res.query) payload = res.response;
                    if (!payload) payload = res;
                    var list = extractPartyListBills(payload, sess);
                    if (!list.rows.length) {
                        var ri;
                        for (ri = sess.requests.length - 1; ri >= 0; ri--) {
                            if (!isPartyListLoad(sess.requests[ri], sess)) continue;
                            list = extractPartyListBills(sess.requests[ri].response, sess);
                            payload = sess.requests[ri].response;
                            if (list.rows.length) break;
                        }
                    }
                    clog("季度党群绩效列表单据", list.rows.length);
                    if (!list.rows.length) {
                        partyReady = true;
                        applyPartyTable({ columns: [], rows: [] });
                        showAlert("default", "季度党群绩效加载成功", "列表为空，无单据可打开分录");
                        return [];
                    }
                    sess.dataFormId = CQ_PARTY.dataFormId;
                    applyPartyTable(partyColsToTable(list.columns, list.rows));
                    return waitFor(function () {
                        return findBillLinkInSession(sess, list.rows[0]);
                    }, 8000, 200, "等待列表编号").catch(function () {
                        return null;
                    }).then(function () {
                        return collectPartyEntries(sess, list.rows);
                    }).then(function (got) {
                        var cols = combinePartyColumns(got.headerCols, got.entryCols, got.allHeader);
                        var table = partyColsToTable(cols, got.rows);
                        partyReady = table.rows.length > 0 || !!(table.columns && table.columns.length);
                        applyPartyTable(table);
                        try { window.__cqLastPartyParse = { table: table, opened: got.opened, failed: got.failed, entryCount: got.entryCount }; } catch (e3) { }
                        clog("季度党群绩效摊平", "单据", got.opened, "失败", got.failed, "分录", got.entryCount, "行", table.rows.length);
                        if (partyReady) {
                            showAlert(
                                "default",
                                "季度党群绩效加载成功",
                                "单据 " + got.opened + " 张，分录 " + got.entryCount + " 行，列表 " + table.rows.length + " 条"
                            );
                        } else {
                            showAlert("destructive", "季度党群绩效加载失败", "已返回数据但未能识别行");
                        }
                        return table.rows;
                    });
                });
            }).then(function (rows) {
                partyLoading = false;
                return rows;
            }, function (err) {
                partyLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("季度党群绩效加载失败", err && err.message);
                reportError("party-load", err, { trail: trail });
                showAlert("destructive", "季度党群绩效加载失败", err && err.message ? String(err.message) : String(err));
            });
            partyLoading = task;
            return task;
        }
        try { parentWin().__cqFetchPartyQuarterly = loadPartyQuarterlyFromCq; } catch (ePq) { }
        try { window.__cqFetchPartyQuarterly = loadPartyQuarterlyFromCq; } catch (ePq2) { }

        function formatOrgValue(key, raw) {
            if (raw == null || raw === "") return "";
            var v = cqCell(raw);
            if (key === "status" || key === "billstatus") {
                var st = String(v);
                return STATUS_TEXT[st] || st;
            }
            if (key === "crrc_combofield") {
                var t = String(v);
                return ORG_TYPE_TEXT[t] || t;
            }
            if (key === "enable") {
                var en = String(v);
                return ORG_ENABLE_TEXT[en] || en;
            }
            if (v && typeof v === "object") return "";
            return v == null ? "" : v;
        }
        function looksLikeOrgTreeNode(obj) {
            if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
            var id = obj.id != null ? String(obj.id) : "";
            var name = obj.text || obj.name;
            return !!(id && name);
        }
        function orgTreeArgsOf(obj) {
            var args = obj.args;
            if (!Array.isArray(args) || !args.length) return null;
            var first = args[0];
            if (Array.isArray(first) && first.length && looksLikeOrgTreeNode(first[0])) return first;
            if (looksLikeOrgTreeNode(first)) return [first];
            return null;
        }
        function countOrgTree(nodes) {
            if (!nodes) return 0;
            var arr = Array.isArray(nodes) ? nodes : [nodes];
            var n = 0;
            var i;
            for (i = 0; i < arr.length; i++) {
                n += 1;
                n += countOrgTree(arr[i] && arr[i].children);
            }
            return n;
        }
        function findOrgAddNodes(payload) {
            var best = null;
            var bestCount = -1;
            var bestMethod = "";
            function walk(obj, depth, seen) {
                if (!obj || typeof obj !== "object" || depth > 16) return;
                if (seen.indexOf(obj) >= 0) return;
                seen.push(obj);
                if (!Array.isArray(obj)) {
                    var mn = String(obj.methodname || obj.methodName || "");
                    if (mn === "addNodes" || mn === "updateNodes") {
                        var arr = orgTreeArgsOf(obj);
                        if (arr && arr.length) {
                            var c = countOrgTree(arr);
                            if (c > bestCount || (c === bestCount && mn === "addNodes" && bestMethod !== "addNodes")) {
                                best = arr;
                                bestCount = c;
                                bestMethod = mn;
                            }
                        }
                        return;
                    }
                }
                if (Array.isArray(obj)) {
                    var n = Math.min(obj.length, 80);
                    var i;
                    for (i = 0; i < n; i++) walk(obj[i], depth + 1, seen);
                    return;
                }
                var keys = Object.keys(obj);
                var k;
                for (k = 0; k < keys.length && k < 80; k++) {
                    if (keys[k] === "args") continue;
                    walk(obj[keys[k]], depth + 1, seen);
                }
            }
            walk(parseMaybeJson(payload), 0, []);
            return best;
        }
        function findOrgBillListPack(payload) {
            var pack = null;
            function walk(obj, depth, seen) {
                if (!obj || typeof obj !== "object" || depth > 16) return;
                if (seen.indexOf(obj) >= 0) return;
                seen.push(obj);
                if (!Array.isArray(obj)) {
                    var mn = String(obj.methodname || obj.methodName || "");
                    if (mn === "addNodes" || mn === "updateNodes") return;
                    if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
                    else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
                    else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
                }
                if (Array.isArray(obj)) {
                    var n = Math.min(obj.length, 80);
                    var i;
                    for (i = 0; i < n; i++) walk(obj[i], depth + 1, seen);
                    return;
                }
                var keys = Object.keys(obj);
                var k;
                for (k = 0; k < keys.length && k < 80; k++) {
                    if (keys[k] === "args") continue;
                    walk(obj[keys[k]], depth + 1, seen);
                }
            }
            walk(parseMaybeJson(payload), 0, []);
            return pack;
        }
        function mapOrgListRows(pack) {
            var map = {};
            if (!pack || !Array.isArray(pack.rows)) return map;
            var idx = pack.dataindex || {};
            var i;
            for (i = 0; i < pack.rows.length; i++) {
                var row = pack.rows[i];
                function cell(key) {
                    if (idx[key] == null) return "";
                    return formatOrgValue(key, row[idx[key]]);
                }
                var id = String(cell("crrc_dj_org_tree_ext_id") || "");
                if (!id) continue;
                map[id] = {
                    name: cell("name"),
                    status: cell("status"),
                    parent_name: cell("parent_name"),
                    orgType: cell("crrc_combofield"),
                    foundedAt: cell("crrc_datefield"),
                    number: cell("number"),
                    level: cell("level"),
                    longnumber: cell("longnumber"),
                    enable: cell("enable")
                };
            }
            return map;
        }
        function mapCqOrgNode(n, parentName, listMap) {
            var rawId = n && n.id != null ? String(n.id) : "";
            var name = n && (n.text || n.name) ? String(n.text || n.name) : "";
            var parentid = n && n.parentid != null ? String(n.parentid) : "";
            var id = rawId;
            if (name === "全部" && !parentid) id = "all";
            var extra = listMap[rawId] || {};
            var node = {
                id: id,
                name: name,
                parentid: parentid,
                parentName: extra.parent_name || parentName || "",
                status: extra.status || "",
                orgType: extra.orgType || "",
                foundedAt: extra.foundedAt || "",
                number: extra.number || "",
                level: extra.level == null || extra.level === "" ? "" : extra.level,
                longnumber: extra.longnumber || n.longNumber || n.longnumber || "",
                enable: extra.enable || "",
                children: []
            };
            var kids = (n && n.children) || [];
            var ki;
            for (ki = 0; ki < kids.length; ki++) {
                node.children.push(mapCqOrgNode(kids[ki], name, listMap));
            }
            return node;
        }
        function buildOrgRoot(nodes, listMap) {
            if (!nodes || !nodes.length) return null;
            if (nodes.length === 1) return mapCqOrgNode(nodes[0], "", listMap);
            var wrap = { id: "all", name: "全部", status: "", children: [] };
            var wi;
            for (wi = 0; wi < nodes.length; wi++) wrap.children.push(mapCqOrgNode(nodes[wi], "", listMap));
            return wrap;
        }
        function buildOrgRootFromList(listMap) {
            var ids = Object.keys(listMap);
            var children = [];
            var li;
            for (li = 0; li < ids.length; li++) {
                var extra = listMap[ids[li]];
                children.push({
                    id: ids[li],
                    name: extra.name,
                    status: extra.status,
                    parentName: extra.parent_name,
                    orgType: extra.orgType,
                    foundedAt: extra.foundedAt,
                    number: extra.number,
                    level: extra.level,
                    longnumber: extra.longnumber,
                    enable: extra.enable,
                    children: []
                });
            }
            var companyName = children.length && children[0].parentName ? children[0].parentName : "中车株洲电力机车有限公司党委";
            return {
                id: "all",
                name: "全部",
                status: "",
                children: [{
                    id: "crrc-dw",
                    name: companyName,
                    status: "",
                    children: children
                }]
            };
        }
        function rebuildOrgNames() {
            ORGS = [];
            function walk(node) {
                if (!node) return;
                if (node.id !== "all") ORGS.push(node.name);
                var ch = node.children || [];
                var wi;
                for (wi = 0; wi < ch.length; wi++) walk(ch[wi]);
            }
            walk(ORG_TREE);
        }
        function defaultOrgCompanyId() {
            var ch = ORG_TREE && ORG_TREE.children;
            if (ch && ch.length) return ch[0].id;
            return "crrc-dw";
        }
        function defaultOrgExpanded() {
            var exp = { all: true };
            var cid = defaultOrgCompanyId();
            if (cid) exp[cid] = true;
            return exp;
        }
        function orgRowFromNode(node, parentName) {
            return {
                id: node.id,
                name: node.name,
                status: node.status || "",
                parentName: parentName || node.parentName || "",
                orgType: node.orgType || "",
                foundedAt: node.foundedAt || "",
                number: node.number || "",
                level: node.level == null || node.level === "" ? "" : node.level
            };
        }
        function applyOrgTree(root) {
            if (!root) return;
            ORG_TREE = root;
            rebuildOrgNames();
            var companyId = defaultOrgCompanyId();
            orgViewState.activeId = companyId;
            orgViewState.expanded = defaultOrgExpanded();
            orgState.activeId = companyId;
            orgState.expanded = defaultOrgExpanded();
            orgState.selected = {};
            orgState.page = 1;
            renderOrgView();
            renderOrgTree();
            refreshOrgDialogTable();
        }
        function isOrgListLoad(r, sess) {
            if (!r || !r.query || r.query.ac !== "loadData") return false;
            if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false;
            var f = r.query.f;
            if (!f || isReservedForm(f)) return false;
            if (sess && sess.listPageId && r.pageId === sess.listPageId) return true;
            if (f === CQ_ORG.dataFormId) return true;
            var s = String(r.response);
            return s.indexOf("addNodes") >= 0 && s.indexOf("crrc_dj_org_tree_ext") >= 0;
        }
        function findOrgMenu(sess) {
            var texts = CQ_ORG.menuTexts;
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findClickInSession(sess, texts[i]);
                if (hit) return { hit: hit, text: texts[i] };
            }
            return null;
        }
        function pickOrgPayload(sess, res) {
            if (res && typeof res === "object" && !res.query) return res;
            var last = sess && sess.lastList;
            if (last && String(last).indexOf("addNodes") >= 0) return last;
            if (res && res.response && String(res.response).indexOf("addNodes") >= 0) return res.response;
            if (last) return last;
            if (res && res.response) return res.response;
            return res;
        }
        function loadOrgFromCq() {
            if (cqDisposed) return Promise.resolve(null);
            if (orgLoading) return orgLoading;
            var sess = getFetchSession("cq-fetch-frame-org");
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("org-step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureFetchSession(sess);
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookSessionTree(sess);
                var consolePageId = findConsolePageIdFrom(sess.win);
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    frameId: sess.frameId,
                    sessionHref: safeHref(sess.win)
                });
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_ORG.menuAppId + suffix;
                var listPageId = CQ_ORG.menuItemId + suffix;
                sess.listPageId = listPageId;
                sess.dataFormId = CQ_ORG.dataFormId;
                sess.dataAppId = CQ_ORG.dataAppId;
                sess.lastList = "";
                sess.lastBill = "";
                sess.lastAppHome = "";
                sess.requests = [];
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
                        sess.win,
                        CQ_ORG.menuAppId,
                        CQ_ORG.menuFormId,
                        "treeMenuClick",
                        menuPageId,
                        [{
                            key: CQ_ORG.menuControl,
                            methodName: "treeMenuClick",
                            args: [CQ_ORG.menuRoot, CQ_ORG.menuItemId],
                            postData: [{}, []]
                        }]
                    ).then(function () {
                        return cqInvoke(
                            sess.win,
                            CQ_ORG.dataAppId,
                            CQ_ORG.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                function waitListLoad() {
                    return waitForSessReq(sess, function (r) {
                        return isOrgListLoad(r, sess);
                    }, 25000, "等待党组织查询 loadData");
                }
                return clickAppThenParty(sess, step).then(function () {
                    var hit = findOrgMenu(sess);
                    step("find-menu", { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : "" });
                    if (hit && hit.hit) {
                        clog("点击", hit.text);
                        fireParentClick(hit.hit.el, hit.hit.win);
                        return waitListLoad().catch(function () {
                            clog("点击后未捕获党组织 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return null;
                    var payload = pickOrgPayload(sess, res);
                    var nodes = findOrgAddNodes(payload);
                    var pack = findOrgBillListPack(payload);
                    if (!nodes) {
                        var ri;
                        for (ri = sess.requests.length - 1; ri >= 0; ri--) {
                            if (!isOrgListLoad(sess.requests[ri], sess)) continue;
                            var cand = sess.requests[ri].response;
                            nodes = findOrgAddNodes(cand);
                            if (!pack) pack = findOrgBillListPack(cand);
                            if (nodes) {
                                payload = cand;
                                break;
                            }
                        }
                    }
                    var listMap = mapOrgListRows(pack);
                    var listCount = 0;
                    try { listCount = Object.keys(listMap).length; } catch (eLc) { listCount = 0; }
                    var root = nodes && nodes.length ? buildOrgRoot(nodes, listMap) : null;
                    var usedFallback = false;
                    if (!root && listCount) {
                        root = buildOrgRootFromList(listMap);
                        usedFallback = true;
                    }
                    clog("党组织树", nodes ? countOrgTree(nodes) : 0, "列表", listCount, usedFallback ? "fallback" : "");
                    if (!root) {
                        orgReady = true;
                        showAlert("default", "党组织加载成功", "列表为空");
                        return null;
                    }
                    applyOrgTree(root);
                    orgReady = true;
                    var treeCount = countOrgTree(root);
                    try { window.__cqLastOrgParse = { treeCount: treeCount, listCount: listCount, usedFallback: usedFallback }; } catch (e3) { }
                    if (usedFallback) {
                        showAlert("default", "党组织加载成功", "列表 " + listCount + " 行（树未解析，仅一级）");
                    } else {
                        showAlert("default", "党组织加载成功", "树节点 " + treeCount + "，列表 " + listCount + " 行");
                    }
                    return root;
                });
            }).then(function (root) {
                orgLoading = false;
                return root;
            }, function (err) {
                orgLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return null;
                clog("党组织加载失败", err && err.message);
                reportError("org-load", err, { trail: trail });
                showAlert("destructive", "党组织加载失败", err && err.message ? String(err.message) : String(err));
            });
            orgLoading = task;
            return task;
        }
        try { parentWin().__cqFetchOrg = loadOrgFromCq; } catch (eOrg) { }
        try { window.__cqFetchOrg = loadOrgFromCq; } catch (eOrg2) { }

        // ---------- 党组织：树 + 表（布局对齐官方选择器，样式走当前 shadcn 主题） ----------
        var orgState = {
            activeId: defaultOrgCompanyId(),
            expanded: defaultOrgExpanded(),
            includeSelf: false,
            selected: {},
            page: 1,
            pageSize: 100
        };
        var orgViewState = {
            activeId: defaultOrgCompanyId(),
            expanded: defaultOrgExpanded()
        };
        function findOrgMeta(id, node, parent) {
            node = node || ORG_TREE;
            parent = parent || null;
            if (node.id === id) return { node: node, parent: parent };
            var ch = node.children || [];
            for (var i = 0; i < ch.length; i++) {
                var hit = findOrgMeta(id, ch[i], node);
                if (hit) return hit;
            }
            return null;
        }
        function selectedOrgNames() {
            return Object.keys(orgState.selected).filter(function (id) {
                return orgState.selected[id];
            }).map(function (id) {
                var m = findOrgMeta(id);
                return m ? m.node.name : id;
            });
        }
        function orgTableSource() {
            var meta = findOrgMeta(orgState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            if (orgState.includeSelf && node.id !== "all") {
                var p = meta && meta.parent ? meta.parent : null;
                rows.push(orgRowFromNode(node, p && p.id !== "all" ? p.name : ""));
            }
            (node.children || []).forEach(function (c) {
                rows.push(orgRowFromNode(c, node.id === "all" ? "" : node.name));
            });
            return rows;
        }
        function orgViewTableSource() {
            var meta = findOrgMeta(orgViewState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            (node.children || []).forEach(function (c) {
                rows.push(orgRowFromNode(c, node.id === "all" ? "" : node.name));
            });
            return { node: node, rows: rows };
        }
        function paintOrgTreeNode(node, wrap, state, treeRootId, onSelect) {
            var hasKids = !!(node.children && node.children.length);
            var row = document.createElement("button");
            row.type = "button";
            row.className = "org-tree-row" + (node.id === state.activeId ? " is-active" : "");
            var tog = document.createElement("span");
            tog.className = "org-tree-toggle" + (hasKids ? (state.expanded[node.id] ? " is-open" : "") : " is-empty");
            tog.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
            if (hasKids) {
                tog.onclick = function (e) {
                    e.stopPropagation();
                    state.expanded[node.id] = !state.expanded[node.id];
                    if (treeRootId === "org-view-tree") renderOrgViewTree();
                    else renderOrgTree();
                };
            }
            var label = document.createElement("span");
            label.textContent = node.name;
            row.appendChild(tog);
            row.appendChild(label);
            row.onclick = function () {
                state.activeId = node.id;
                if (state.page != null) state.page = 1;
                if (onSelect) onSelect();
                else if (treeRootId === "org-view-tree") renderOrgView();
                else {
                    renderOrgTree();
                    renderOrgTable();
                }
            };
            wrap.appendChild(row);
            if (hasKids && state.expanded[node.id]) {
                var kids = document.createElement("div");
                kids.className = "org-tree-children";
                node.children.forEach(function (c) {
                    paintOrgTreeNode(c, kids, state, treeRootId, onSelect);
                });
                wrap.appendChild(kids);
            }
        }
        function renderOrgViewTree() {
            var root = document.getElementById("org-view-tree");
            if (!root) return;
            root.innerHTML = "";
            paintOrgTreeNode(ORG_TREE, root, orgViewState, "org-view-tree");
        }
        function renderOrgViewTable() {
            var metaEl = document.getElementById("org-view-meta");
            var src = orgViewTableSource();
            if (metaEl) {
                metaEl.textContent = src.node.name + " · 下级 " + src.rows.length + " 个组织";
            }
            if (window.__cqDataTable) {
                window.__cqDataTable.setData("orgView", mapOrgRows(src.rows));
            }
        }
        function renderOrgView() {
            renderOrgViewTree();
            renderOrgViewTable();
        }
        function renderOrgTree() {
            var root = document.getElementById("org-tree");
            if (!root) return;
            root.innerHTML = "";
            paintOrgTreeNode(ORG_TREE, root, orgState, "org-tree");
        }
        function renderOrgTable() {
            refreshOrgDialogTable();
        }
        function resetOrgPicker() {
            orgState.activeId = defaultOrgCompanyId();
            orgState.expanded = defaultOrgExpanded();
            orgState.includeSelf = false;
            orgState.selected = {};
            orgState.page = 1;
            var inc = document.getElementById("org-include-self");
            if (inc) inc.checked = false;
            renderOrgTree();
            refreshOrgDialogTable();
        }
        (function initOrgPicker() {
            var inc = document.getElementById("org-include-self");
            if (inc) inc.onchange = function () {
                orgState.includeSelf = !!inc.checked;
                orgState.page = 1;
                refreshOrgDialogTable();
            };
            bind("org-clear", function () {
                orgState.selected = {};
                refreshOrgDialogTable();
            });
            var handle = document.getElementById("org-resizer");
            var pane = document.getElementById("org-tree-pane");
            if (handle && pane) {
                handle.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    handle.classList.add("is-dragging");
                    var startX = e.clientX;
                    var startW = pane.getBoundingClientRect().width;
                    function move(ev) {
                        var w = Math.min(560, Math.max(260, startW + ev.clientX - startX));
                        pane.style.width = w + "px";
                    }
                    function up() {
                        handle.classList.remove("is-dragging");
                        document.body.style.userSelect = "";
                        document.removeEventListener("mousemove", move);
                        document.removeEventListener("mouseup", up);
                    }
                    document.body.style.userSelect = "none";
                    document.addEventListener("mousemove", move);
                    document.addEventListener("mouseup", up);
                });
            }
        })();

        // ---------- 苍穹配置单据：按钮绑定与字段读写 ----------
        var CQ_CONFIG_FIELDS = {
            type: "crrc_textfield",
            json: "crrc_largetextfield",
            billno: "billno",
            billstatus: "billstatus"
        };
        var CQ_TOOLBAR_SEL = ".kd-cq-toolbar-item, .kd-cq-toolbar button, .kd-cq-btn, button, [role='button']";
        var CQ_DIALOG_SEL = ".kd-modal button, .kd-cq-dialog button, .kd-message-box button, .kd-cq-btn, button, span";
        var configDlgMode = "add";
        var configEditRow = null;
        var configBusy = false;
        var configPanelLock = false;
        var configOpenedOfficial = false;

        function isOverlayFrameWin(win) {
            try {
                if (!win) return false;
                var fe = win.frameElement;
                if (fe && fe.getAttribute("data-cq-fetch") === "1") return true;
            } catch (e0) { }
            try {
                var od = win.document;
                if (od && od.getElementById("dlg-overlay") && od.getElementById("panel-config") && od.getElementById("tblnew")) return true;
            } catch (e1) { }
            return false;
        }
        function isOverlayNode(el) {
            if (!el) return false;
            try {
                if (el.closest && el.closest("#shadcn-hello-inject-root")) return true;
            } catch (e0) { }
            try {
                var view = el.ownerDocument && el.ownerDocument.defaultView;
                if (view && isOverlayFrameWin(view)) return true;
            } catch (e1) { }
            return false;
        }
        function officialSearchRoots() {
            var roots = [];
            function add(win) {
                if (!win) return;
                var i;
                for (i = 0; i < roots.length; i++) if (roots[i] === win) return;
                roots.push(win);
            }
            try { add(hostWin()); } catch (e0) { }
            try { add(parentWin()); } catch (e1) { }
            if (sessionWin) add(sessionWin);
            return roots;
        }
        function findOfficialClick(text, selector) {
            var found = null;
            function walk(win, depth, seen) {
                if (found || !win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                if (isOverlayFrameWin(win)) return;
                try {
                    var el = findParentClickTarget(win.document, text, selector);
                    if (el && !isOverlayNode(el)) found = { win: win, el: el };
                } catch (e) { }
                if (found) return;
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1, seen);
                } catch (e2) { }
            }
            var roots = officialSearchRoots();
            var r;
            for (r = 0; r < roots.length && !found; r++) walk(roots[r], 0, []);
            return found;
        }
        function clickOfficialByText(texts, selector) {
            if (typeof texts === "string") texts = [texts];
            var i;
            for (i = 0; i < texts.length; i++) {
                var hit = findOfficialClick(texts[i], selector || CQ_TOOLBAR_SEL);
                if (hit && fireParentClick(hit.el, hit.win)) {
                    clog("已点击苍穹按钮", texts[i]);
                    return true;
                }
            }
            return false;
        }
        function waitUntil(fn, timeout, label) {
            var start = Date.now();
            var limit = timeout || 8000;
            return new Promise(function (resolve, reject) {
                function tick() {
                    if (cqDisposed) return reject(new Error("aborted"));
                    var v = null;
                    try { v = fn(); } catch (e) { v = null; }
                    if (v) return resolve(v);
                    if (Date.now() - start > limit) return reject(new Error(label || "等待超时"));
                    setTimeout(tick, 200);
                }
                tick();
            });
        }
        function walkOfficialWindows(fn) {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 8) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                if (isOverlayFrameWin(win)) return;
                try { fn(win); } catch (e0) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e1) { }
            }
            var roots = officialSearchRoots();
            var r;
            for (r = 0; r < roots.length; r++) walk(roots[r], 0);
        }
        function findOfficialField(fieldId) {
            var found = null;
            walkOfficialWindows(function (win) {
                if (found) return;
                try {
                    var doc = win.document;
                    var el = doc.getElementById(fieldId);
                    if (el && !isOverlayNode(el)) found = { win: win, el: el, doc: doc };
                } catch (e) { }
            });
            return found;
        }
        function fieldInputs(el) {
            if (!el) return [];
            var tag = (el.tagName || "").toLowerCase();
            if (tag === "input" || tag === "textarea") return [el];
            var list = [];
            try { list = el.querySelectorAll("textarea, input"); } catch (e) { }
            var out = [];
            var i;
            for (i = 0; i < list.length; i++) out.push(list[i]);
            if (!out.length && el.isContentEditable) out.push(el);
            return out;
        }
        function fillNativeValue(el, value) {
            var str = value == null ? "" : String(value);
            if (el.isContentEditable) {
                try { el.focus(); } catch (e0) { }
                el.innerText = str;
                try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e1) { }
                try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e2) { }
                return;
            }
            try {
                var tag = (el.tagName || "").toLowerCase();
                var proto = tag === "textarea" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
                var desc = Object.getOwnPropertyDescriptor(proto, "value");
                if (desc && desc.set) desc.set.call(el, str);
                else el.value = str;
            } catch (e3) {
                el.value = str;
            }
            try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e4) { }
            try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e5) { }
            try { el.blur(); } catch (e6) { }
        }
        function tryWinFieldApi(win, key, value, reading) {
            if (!win) return { ok: false };
            var dollar = win.$;
            if (typeof dollar === "function") {
                try {
                    var field = dollar.call(win, key);
                    if (reading) {
                        if (field && typeof field.getValue === "function") {
                            var gv = field.getValue();
                            if (gv != null && gv !== "") return { ok: true, value: gv };
                        }
                    } else if (field && typeof field.setValue === "function") {
                        field.setValue(value);
                        if (typeof field.updateView === "function") field.updateView();
                        return { ok: true };
                    }
                } catch (e0) { }
            }
            try {
                var model = win.formModel || (win.KDApi && win.KDApi.formModel) || null;
                if (model && typeof model.getValue === "function" && typeof model.setValue === "function") {
                    if (reading) {
                        var mv = model.getValue(key);
                        if (mv != null && mv !== "") return { ok: true, value: mv };
                    } else {
                        model.setValue(key, value);
                        return { ok: true };
                    }
                }
            } catch (e1) { }
            return { ok: false };
        }
        function setOfficialField(fieldId, value) {
            var hit = findOfficialField(fieldId);
            if (!hit) return false;
            var api = tryWinFieldApi(hit.win, fieldId, value, false);
            if (api.ok) return true;
            var inputs = fieldInputs(hit.el);
            if (!inputs.length) return false;
            var i;
            for (i = 0; i < inputs.length; i++) fillNativeValue(inputs[i], value);
            return true;
        }
        function getOfficialField(fieldId) {
            var hit = findOfficialField(fieldId);
            if (!hit) return "";
            var api = tryWinFieldApi(hit.win, fieldId, null, true);
            if (api.ok && api.value != null) return String(cqCell(api.value));
            var inputs = fieldInputs(hit.el);
            var i;
            for (i = 0; i < inputs.length; i++) {
                var v = inputs[i].isContentEditable ? (inputs[i].innerText || "") : (inputs[i].value || "");
                if (String(v).trim() !== "") return String(v);
            }
            if (fieldId === CQ_CONFIG_FIELDS.json) return "";
            return collapseWs(hit.el.innerText || hit.el.textContent || "");
        }
        function waitOfficialBillFields(timeout) {
            return waitUntil(function () {
                return findOfficialField(CQ_CONFIG_FIELDS.json) || findOfficialField(CQ_CONFIG_FIELDS.type);
            }, timeout || 12000, "等待苍穹单据字段加载");
        }
        function selectOfficialListRow(billno) {
            if (!billno) return false;
            var hit = findOfficialClick(String(billno), "span.link-cell-content, span.link-color, a, span, td")
                || findOfficialClick(String(billno));
            if (!hit) return false;
            return fireParentClick(hit.el, hit.win);
        }
        function formatBillStatus(val) {
            var s = String(val == null ? "" : cqCell(val)).trim();
            if (!s) return "暂存";
            if (STATUS_TEXT[s]) return STATUS_TEXT[s];
            return s;
        }
        function statusCodeOf(text) {
            var s = String(text || "");
            if (STATUS_TEXT[s]) return s;
            var keys = Object.keys(STATUS_TEXT);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (STATUS_TEXT[keys[i]] === s) return keys[i];
            }
            return "A";
        }
        function selectedConfigRows() {
            var ids = Object.keys(configSelected).filter(function (id) { return configSelected[id]; });
            if (!ids.length) return [];
            return TABLE_DEFS.config.rows.filter(function (row) {
                var rid = String(row._rowId || row.no || "");
                return ids.indexOf(rid) >= 0 || ids.indexOf(String(row.no || "")) >= 0;
            });
        }
        function cloneJson(v) {
            try { return JSON.parse(JSON.stringify(v)); } catch (e) { return null; }
        }

        // ---------- 配置类型与动态配置面板 ----------
        var CONFIG_TYPES = {
            quarterly_party_perf: "季度党群绩效评价规则",
            quarterly_excellence: "季度创先争优评价规则",
            quarterly_grassroots: "季度基层党组织创先争优评价项点",
            annual_party_perf: "年度党群绩效评价规则",
            annual_excellence: "年度创先争优评价规则",
            annual_grassroots: "年度基层党组织创先争优评价项点"
        };
        var DEFAULT_PARTY_PERF = [
            { label: "A", percent: 40 },
            { label: "B", percent: 40 },
            { label: "C", percent: 20 }
        ];
        var DEFAULT_GRASSROOTS = [
            { name: "项点一", score: 10 },
            { name: "项点二", score: 10 }
        ];
        var dlg = document.getElementById("dlg-overlay");
        var dlgType = document.getElementById("dlg-type");
        var dlgConfigPanel = document.getElementById("dlg-config-panel");
        var configDraft = null;

        function isPartyPerfType(type) {
            return type === "quarterly_party_perf" || type === "annual_party_perf";
        }
        function isExcellenceType(type) {
            return type === "quarterly_excellence" || type === "annual_excellence";
        }
        function isGrassrootsType(type) {
            return type === "quarterly_grassroots" || type === "annual_grassroots";
        }
        function defaultConfigForType(type) {
            if (isPartyPerfType(type)) {
                return { items: DEFAULT_PARTY_PERF.map(function (x) { return { label: x.label, percent: x.percent }; }) };
            }
            if (isExcellenceType(type)) {
                var period = type.indexOf("quarterly") === 0 ? "季度" : "年度";
                return {
                    partyPerfLabel: "在" + period + "党群绩效评价为",
                    adminPerfLabel: "行政绩效为",
                    excellenceLabel: "创先争优评价为"
                };
            }
            if (isGrassrootsType(type)) {
                return { items: DEFAULT_GRASSROOTS.map(function (x) { return { name: x.name, score: x.score }; }) };
            }
            return {};
        }
        function sumPercents(items) {
            return items.reduce(function (sum, item) {
                return sum + (Number(item.percent) || 0);
            }, 0);
        }
        function renderPartyPerfPanel(data) {
            dlgConfigPanel.innerHTML = "";
            var head = document.createElement("div");
            head.className = "cfg-panel-head";
            var title = document.createElement("span");
            title.className = "cfg-panel-title";
            title.textContent = "项点与占比";
            var addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.className = "btn btn-outline";
            addBtn.style.height = "28px";
            addBtn.style.padding = "0 10px";
            addBtn.style.fontSize = "12px";
            addBtn.textContent = "添加项点";
            head.appendChild(title);
            head.appendChild(addBtn);
            dlgConfigPanel.appendChild(head);
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.id = "cfg-sum-hint";
            hint.textContent = "各项占比之和须为 100%";
            dlgConfigPanel.appendChild(hint);
            var list = document.createElement("div");
            list.className = "cfg-list";
            list.id = "cfg-perf-list";
            dlgConfigPanel.appendChild(list);

            function updateHint() {
                var total = sumPercents(data.items);
                hint.textContent = "当前占比合计：" + total + "%（须为 100%）";
                hint.className = "cfg-panel-hint" + (total === 100 ? " is-ok" : total > 100 ? " is-error" : "");
            }
            function paint() {
                list.innerHTML = "";
                data.items.forEach(function (item, idx) {
                    var row = document.createElement("div");
                    row.className = "cfg-row";
                    var no = document.createElement("span");
                    no.className = "cfg-row-label";
                    no.textContent = String(idx + 1);
                    var labelInput = document.createElement("input");
                    labelInput.type = "text";
                    labelInput.placeholder = "项点文本";
                    labelInput.value = item.label || "";
                    labelInput.oninput = function () {
                        item.label = labelInput.value.trim();
                    };
                    var percentInput = document.createElement("input");
                    percentInput.type = "number";
                    percentInput.min = "0";
                    percentInput.max = "100";
                    percentInput.step = "1";
                    percentInput.value = item.percent != null ? item.percent : "";
                    percentInput.oninput = function () {
                        item.percent = Number(percentInput.value);
                        updateHint();
                    };
                    var suffix = document.createElement("span");
                    suffix.className = "cfg-row-suffix";
                    suffix.textContent = "%";
                    var delBtn = document.createElement("button");
                    delBtn.type = "button";
                    delBtn.className = "btn-icon danger";
                    delBtn.title = "删除";
                    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
                    delBtn.onclick = function () {
                        if (data.items.length <= 1) return;
                        data.items.splice(idx, 1);
                        paint();
                        updateHint();
                    };
                    row.appendChild(no);
                    row.appendChild(labelInput);
                    row.appendChild(percentInput);
                    row.appendChild(suffix);
                    row.appendChild(delBtn);
                    list.appendChild(row);
                });
                updateHint();
            }
            addBtn.onclick = function () {
                data.items.push({ label: "", percent: 0 });
                paint();
            };
            paint();
        }
        function renderExcellencePanel(data, type) {
            dlgConfigPanel.innerHTML = "";
            var period = type.indexOf("quarterly") === 0 ? "季度" : "年度";
            var fields = [
                { key: "partyPerfLabel", label: "在" + period + "党群绩效评价为（文本）" },
                { key: "adminPerfLabel", label: "行政绩效为（文本）" },
                { key: "excellenceLabel", label: "创先争优评价为（文本）" }
            ];
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.textContent = "配置填报时各评价维度对应的提示文本";
            dlgConfigPanel.appendChild(hint);
            fields.forEach(function (f) {
                var wrap = document.createElement("div");
                wrap.className = "cfg-text-field";
                var label = document.createElement("label");
                label.textContent = f.label;
                var input = document.createElement("input");
                input.type = "text";
                input.value = data[f.key] || "";
                input.placeholder = "请输入提示文本";
                input.oninput = function () {
                    data[f.key] = input.value.trim();
                };
                wrap.appendChild(label);
                wrap.appendChild(input);
                dlgConfigPanel.appendChild(wrap);
            });
        }
        function renderGrassrootsPanel(data) {
            dlgConfigPanel.innerHTML = "";
            var head = document.createElement("div");
            head.className = "cfg-panel-head";
            var title = document.createElement("span");
            title.className = "cfg-panel-title";
            title.textContent = "项点名称与分数";
            var addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.className = "btn btn-outline";
            addBtn.style.height = "28px";
            addBtn.style.padding = "0 10px";
            addBtn.style.fontSize = "12px";
            addBtn.textContent = "添加项点";
            head.appendChild(title);
            head.appendChild(addBtn);
            dlgConfigPanel.appendChild(head);
            var hint = document.createElement("div");
            hint.className = "cfg-panel-hint";
            hint.textContent = "可添加任意数量项点，每项包含名称与分数";
            dlgConfigPanel.appendChild(hint);
            var list = document.createElement("div");
            list.className = "cfg-list";
            dlgConfigPanel.appendChild(list);

            function paint() {
                list.innerHTML = "";
                data.items.forEach(function (item, idx) {
                    var row = document.createElement("div");
                    row.className = "cfg-row";
                    var no = document.createElement("span");
                    no.className = "cfg-row-label";
                    no.textContent = String(idx + 1);
                    var nameInput = document.createElement("input");
                    nameInput.type = "text";
                    nameInput.placeholder = "项点名称";
                    nameInput.value = item.name || "";
                    nameInput.oninput = function () {
                        item.name = nameInput.value.trim();
                    };
                    var scoreInput = document.createElement("input");
                    scoreInput.type = "number";
                    scoreInput.min = "0";
                    scoreInput.step = "0.5";
                    scoreInput.placeholder = "分数";
                    scoreInput.value = item.score != null ? item.score : "";
                    scoreInput.oninput = function () {
                        item.score = Number(scoreInput.value);
                    };
                    var delBtn = document.createElement("button");
                    delBtn.type = "button";
                    delBtn.className = "btn-icon danger";
                    delBtn.title = "删除";
                    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
                    delBtn.onclick = function () {
                        if (data.items.length <= 1) return;
                        data.items.splice(idx, 1);
                        paint();
                    };
                    row.appendChild(no);
                    row.appendChild(nameInput);
                    row.appendChild(scoreInput);
                    row.appendChild(delBtn);
                    list.appendChild(row);
                });
            }
            addBtn.onclick = function () {
                data.items.push({ name: "", score: 0 });
                paint();
            };
            paint();
        }
        function paintConfigDraft(type, data) {
            if (!dlgConfigPanel) return;
            if (isPartyPerfType(type)) renderPartyPerfPanel(data);
            else if (isExcellenceType(type)) renderExcellencePanel(data, type);
            else if (isGrassrootsType(type)) renderGrassrootsPanel(data);
            else dlgConfigPanel.innerHTML = "";
        }
        function renderConfigPanel() {
            if (!dlgConfigPanel || !dlgType) return;
            var type = dlgType.value;
            configDraft = defaultConfigForType(type);
            paintConfigDraft(type, configDraft);
        }
        function validateConfig(type, data) {
            if (isPartyPerfType(type)) {
                if (!data.items || !data.items.length) return "请至少配置一个项点";
                for (var i = 0; i < data.items.length; i++) {
                    if (!data.items[i].label) return "第 " + (i + 1) + " 项点文本不能为空";
                    if (data.items[i].percent == null || isNaN(data.items[i].percent) || data.items[i].percent < 0) {
                        return "第 " + (i + 1) + " 项占比无效";
                    }
                }
                if (sumPercents(data.items) !== 100) return "项点占比之和须为 100%，当前为 " + sumPercents(data.items) + "%";
                return "";
            }
            if (isExcellenceType(type)) {
                if (!data.partyPerfLabel) return "请填写党群绩效评价提示文本";
                if (!data.adminPerfLabel) return "请填写行政绩效提示文本";
                if (!data.excellenceLabel) return "请填写创先争优评价提示文本";
                return "";
            }
            if (isGrassrootsType(type)) {
                if (!data.items || !data.items.length) return "请至少配置一个项点";
                for (var j = 0; j < data.items.length; j++) {
                    if (!data.items[j].name) return "第 " + (j + 1) + " 项点名称不能为空";
                    if (data.items[j].score == null || isNaN(data.items[j].score) || data.items[j].score < 0) {
                        return "第 " + (j + 1) + " 项分数无效";
                    }
                }
                return "";
            }
            return "未知配置类型";
        }
        function formatConfigDetail(type, data) {
            data = data || {};
            if (isPartyPerfType(type) && data.items) {
                return data.items.map(function (x) {
                    return (x.label || "") + " " + (x.percent != null ? x.percent : "") + "%";
                }).join("；");
            }
            if (isExcellenceType(type)) {
                return [data.partyPerfLabel, data.adminPerfLabel, data.excellenceLabel].filter(Boolean).join(" / ");
            }
            if (isGrassrootsType(type) && data.items) {
                return data.items.map(function (x) {
                    return (x.name || "") + " " + (x.score != null ? x.score : "") + "分";
                }).join("；");
            }
            return "";
        }
        function buildConfigJson(orgs, data) {
            return JSON.stringify({ orgs: orgs || [], config: data || {} });
        }
        function parseConfigPayload(raw) {
            var empty = { orgs: [], config: null, type: "", typeName: "" };
            if (raw == null || raw === "") return empty;
            var obj = raw;
            if (typeof raw === "string") {
                try { obj = JSON.parse(raw); } catch (e) { return empty; }
            }
            if (!obj || typeof obj !== "object") return empty;
            var orgs = obj.orgs;
            if (orgs == null && obj.org != null) orgs = obj.org;
            if (typeof orgs === "string") {
                orgs = orgs.split(/[、,，]/).map(function (s) { return s.trim(); }).filter(Boolean);
            }
            if (!Array.isArray(orgs)) orgs = [];
            var data = obj.config;
            if (data == null && (obj.items || obj.partyPerfLabel)) data = obj;
            return {
                orgs: orgs,
                config: data || null,
                type: obj.type || "",
                typeName: obj.typeName || ""
            };
        }
        function typeFromField(val) {
            var s = String(val || "").trim();
            if (!s) return "";
            if (CONFIG_TYPES[s]) return s;
            var keys = Object.keys(CONFIG_TYPES);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (CONFIG_TYPES[keys[i]] === s) return keys[i];
            }
            return s;
        }
        function findOrgIdByName(name, node) {
            node = node || ORG_TREE;
            if (node.name === name) return node.id;
            var ch = node.children || [];
            var i;
            for (i = 0; i < ch.length; i++) {
                var id = findOrgIdByName(name, ch[i]);
                if (id) return id;
            }
            return "";
        }
        function selectOrgsByNames(names) {
            resetOrgPicker();
            var selected = {};
            (names || []).forEach(function (name) {
                var id = findOrgIdByName(name) || name;
                if (id) selected[id] = true;
            });
            orgState.selected = selected;
            refreshOrgDialogTable();
        }
        function makeConfigRow(opts) {
            opts = opts || {};
            var type = opts.type || "";
            var typeName = opts.typeName || CONFIG_TYPES[type] || type;
            var data = opts.config || {};
            var orgs = opts.orgs || [];
            if (!Array.isArray(orgs)) orgs = orgs ? [orgs] : [];
            var org = orgs.join("、");
            var statusText = opts.statusText || "暂存";
            return {
                _rowId: opts._rowId || opts.no || ("cfg-" + Date.now()),
                no: opts.no || "",
                statusText: statusText,
                statusCode: opts.statusCode || statusCodeOf(statusText),
                type: type,
                typeName: typeName,
                org: org,
                orgs: orgs,
                config: buildConfigJson(orgs, data),
                configDetail: formatConfigDetail(type, data)
            };
        }
        function upsertConfigRow(row, replaceNo) {
            var idx = -1;
            if (replaceNo) {
                var i;
                for (i = 0; i < TABLE_DEFS.config.rows.length; i++) {
                    if (String(TABLE_DEFS.config.rows[i].no) === String(replaceNo)
                        || String(TABLE_DEFS.config.rows[i]._rowId) === String(replaceNo)) {
                        idx = i;
                        break;
                    }
                }
            }
            if (idx >= 0) TABLE_DEFS.config.rows[idx] = row;
            else TABLE_DEFS.config.rows.unshift(row);
            refreshDataTable("config");
        }
        function isConfigFormId(f) {
            f = String(f || "");
            return f === CQ_CONFIG.dataFormId || f.indexOf("crrc_dj_config") >= 0;
        }
        function collectConfigListContexts() {
            var list = [];
            function add(win, href) {
                href = String(href || "");
                if (!href) return;
                var f = takeQueryParam(href, "formId") || takeQueryParam(href, "f") || takeQueryParam(href, "billFormId");
                var pid = takeQueryParam(href, "pageId") || takeQueryParam(href, "byPageId");
                var app = takeQueryParam(href, "appId") || CQ_CONFIG.dataAppId;
                if (!pid) return;
                if (!isConfigFormId(f) && href.indexOf("crrc_dj_config") < 0) return;
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i].pageId === pid && list[i].formId === (isConfigFormId(f) ? f : CQ_CONFIG.dataFormId)) return;
                }
                list.push({
                    win: win || parentWin(),
                    appId: app,
                    formId: isConfigFormId(f) ? f : CQ_CONFIG.dataFormId,
                    pageId: pid
                });
            }
            walkOfficialWindows(function (win) {
                try { add(win, win.location.href); } catch (e0) { }
                try {
                    var doc = win.document;
                    var nodes = doc.querySelectorAll("iframe[src]");
                    var i;
                    for (i = 0; i < nodes.length; i++) add(win, nodes[i].getAttribute("src") || "");
                } catch (e1) { }
            });
            return list;
        }
        function mapConfigPackKey(idx, names, allowContains) {
            var i;
            for (i = 0; i < names.length; i++) {
                if (idx[names[i]] != null) return names[i];
            }
            if (!allowContains) return "";
            var keys = Object.keys(idx);
            var j;
            for (i = 0; i < keys.length; i++) {
                for (j = 0; j < names.length; j++) {
                    if (keys[i].indexOf(names[j]) >= 0) return keys[i];
                }
            }
            return "";
        }
        function stringifyConfigCell(val) {
            if (val == null || val === "") return "";
            if (typeof val === "string") return val;
            if (typeof val === "object") {
                try { return JSON.stringify(val); } catch (e) { return String(cqCell(val) || ""); }
            }
            return String(val);
        }
        function mapConfigListPayload(payload) {
            var parsed = parseMaybeJson(payload);
            var pack = findBillListPack(parsed);
            if (!pack) return null;
            var idx = pack.dataindex || {};
            var billnoKey = mapConfigPackKey(idx, ["billno"]);
            var statusKey = mapConfigPackKey(idx, ["billstatus"]);
            var typeKey = mapConfigPackKey(idx, ["crrc_textfield"]);
            var jsonKey = mapConfigPackKey(idx, ["crrc_largetextfield"], true);
            if (!jsonKey) jsonKey = mapConfigPackKey(idx, ["largetext"], true);
            var pkKey = "";
            var keys = Object.keys(idx);
            var i;
            for (i = 0; i < keys.length; i++) {
                if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === "_id") {
                    pkKey = keys[i];
                    break;
                }
            }
            return (pack.rows || []).map(function (row, ridx) {
                var billno = String(packCellAt(pack, row, billnoKey) || "");
                var statusRaw = String(packCellAt(pack, row, statusKey) || "");
                var typeVal = String(packCellAt(pack, row, typeKey) || "");
                var jsonVal = stringifyConfigCell(packCellAt(pack, row, jsonKey));
                var parsedCfg = parseConfigPayload(jsonVal);
                var type = typeFromField(typeVal) || parsedCfg.type || typeFromField(parsedCfg.typeName);
                var typeName = CONFIG_TYPES[type] || parsedCfg.typeName || typeVal || type;
                var orgs = parsedCfg.orgs && parsedCfg.orgs.length ? parsedCfg.orgs : [];
                var mapped = makeConfigRow({
                    _rowId: billno || ("cfg-" + ridx),
                    no: billno,
                    statusText: formatBillStatus(statusRaw),
                    statusCode: STATUS_TEXT[statusRaw] ? statusRaw : statusCodeOf(formatBillStatus(statusRaw)),
                    type: type,
                    typeName: typeName,
                    orgs: orgs,
                    config: parsedCfg.config || {}
                });
                if (jsonVal) mapped.config = jsonVal;
                if (!mapped.configDetail && jsonVal && jsonVal.charAt(0) !== "{") mapped.configDetail = jsonVal;
                mapped._pkId = String(packCellAt(pack, row, pkKey) || "");
                return mapped;
            });
        }
        function headerIndex(headers, names) {
            var i, j;
            for (j = 0; j < names.length; j++) {
                for (i = 0; i < headers.length; i++) {
                    if (headers[i] === names[j]) return i;
                }
            }
            return -1;
        }
        function mapConfigDomTable(table) {
            if (!table) return null;
            var ths = table.querySelectorAll("thead th");
            if (!ths.length) ths = table.querySelectorAll("tr:first-child th");
            if (!ths.length) return null;
            var headers = [];
            var i;
            for (i = 0; i < ths.length; i++) headers.push(collapseWs(ths[i].innerText || ths[i].textContent || ""));
            var noIdx = headerIndex(headers, ["单据编号"]);
            var stIdx = headerIndex(headers, ["单据状态"]);
            if (noIdx < 0 && stIdx < 0) return null;
            var typeIdx = headerIndex(headers, ["配置类型", "数据类型"]);
            var detailIdx = headerIndex(headers, ["配置详情", "配置json", "配置"]);
            var orgIdx = headerIndex(headers, ["对应党组织", "党组织"]);
            var bodyRows = table.querySelectorAll("tbody tr");
            var out = [];
            var r;
            for (r = 0; r < bodyRows.length; r++) {
                var cells = bodyRows[r].querySelectorAll("td");
                if (!cells.length) continue;
                function cellAt(idx) {
                    if (idx < 0 || idx >= cells.length) return "";
                    return collapseWs(cells[idx].innerText || cells[idx].textContent || "");
                }
                var billno = cellAt(noIdx);
                var statusText = cellAt(stIdx);
                if (!billno && !statusText) continue;
                var typeVal = cellAt(typeIdx);
                var jsonVal = cellAt(detailIdx);
                var orgText = cellAt(orgIdx);
                var parsedCfg = parseConfigPayload(jsonVal);
                var type = typeFromField(typeVal) || parsedCfg.type;
                var orgs = parsedCfg.orgs.length ? parsedCfg.orgs : (orgText ? orgText.split("、") : []);
                var mapped = makeConfigRow({
                    _rowId: billno || ("cfg-dom-" + r),
                    no: billno,
                    statusText: formatBillStatus(statusText),
                    type: type,
                    typeName: CONFIG_TYPES[type] || typeVal || parsedCfg.typeName,
                    orgs: orgs,
                    config: parsedCfg.config || {}
                });
                if (jsonVal) mapped.config = jsonVal;
                if (!mapped.configDetail && jsonVal && jsonVal.charAt(0) !== "{") mapped.configDetail = jsonVal;
                out.push(mapped);
            }
            return out.length ? out : null;
        }
        function parseConfigListFromDom() {
            var rows = [];
            walkOfficialWindows(function (win) {
                if (rows.length) return;
                try {
                    var doc = win.document;
                    var tables = doc.querySelectorAll("table");
                    var t;
                    for (t = 0; t < tables.length; t++) {
                        var table = tables[t];
                        if (isOverlayNode(table)) continue;
                        var mapped = mapConfigDomTable(table);
                        if (mapped && mapped.length) {
                            rows = mapped;
                            return;
                        }
                    }
                } catch (e) { }
            });
            return rows;
        }
        function applyConfigRows(rows) {
            TABLE_DEFS.config.rows = rows || [];
            configSelected = {};
            refreshDataTable("config");
        }
        async function fetchConfigListRows() {
            var ctxs = collectConfigListContexts();
            var i;
            for (i = 0; i < ctxs.length; i++) {
                try {
                    clog("配置项 loadData", ctxs[i].formId, ctxs[i].pageId);
                    var res = await cqInvoke(
                        ctxs[i].win,
                        ctxs[i].appId,
                        ctxs[i].formId,
                        "loadData",
                        ctxs[i].pageId,
                        [{ key: "", methodName: "loadData", args: [], postData: [] }]
                    );
                    var mapped = mapConfigListPayload(res);
                    if (mapped) return mapped;
                } catch (e) {
                    clog("配置项 loadData 失败", ctxs[i].pageId, e && e.message);
                }
            }
            clickOfficialByText(["刷新", "查询"]);
            await waitMs(600);
            return parseConfigListFromDom();
        }
        function loadConfigFromCq() {
            if (cqDisposed) return Promise.resolve([]);
            if (configLoading) return configLoading;
            var task = fetchConfigListRows().then(function (rows) {
                if (cqDisposed) return [];
                applyConfigRows(rows || []);
                configReady = true;
                var n = (rows || []).length;
                showAlert("default", "配置项已加载", n ? ("已加载 " + n + " 条") : "当前没有配置项");
                return rows || [];
            }, function (err) {
                configLoading = false;
                if (cqDisposed || (err && err.message === "aborted")) return [];
                clog("配置项加载失败", err && err.message);
                reportError("config-load", err, {});
                applyConfigRows([]);
                showAlert("destructive", "配置项加载失败", err && err.message ? String(err.message) : String(err));
                return [];
            }).then(function (rows) {
                configLoading = false;
                return rows;
            });
            configLoading = task;
            return task;
        }
        try { parentWin().__cqFetchConfig = loadConfigFromCq; } catch (eCfg) { }
        try { window.__cqFetchConfig = loadConfigFromCq; } catch (eCfg2) { }

        function openConfigDialog(mode, preset) {
            if (!dlg) { clog("弹窗元素不存在 #dlg-overlay"); return; }
            configDlgMode = mode || "add";
            configEditRow = (preset && preset.row) || null;
            var title = document.getElementById("dlg-title");
            if (title) title.textContent = configDlgMode === "edit" ? "修改配置项" : "新增配置项";
            configPanelLock = true;
            try {
                if (preset && preset.type && dlgType && CONFIG_TYPES[preset.type]) dlgType.value = preset.type;
                else if (dlgType) dlgType.selectedIndex = 0;
                var type = dlgType ? dlgType.value : "";
                if (preset && preset.config) {
                    configDraft = cloneJson(preset.config) || defaultConfigForType(type);
                    paintConfigDraft(type, configDraft);
                } else {
                    renderConfigPanel();
                }
                if (preset && preset.orgs && preset.orgs.length) selectOrgsByNames(preset.orgs);
                else resetOrgPicker();
            } finally {
                configPanelLock = false;
            }
            dlg.hidden = false;
            if (dlgType) dlgType.focus();
        }
        function closeDialog() {
            if (dlg) dlg.hidden = true;
            configEditRow = null;
            configDlgMode = "add";
        }
        async function readConfigBill() {
            await waitOfficialBillFields();
            var typeVal = getOfficialField(CQ_CONFIG_FIELDS.type);
            var jsonVal = getOfficialField(CQ_CONFIG_FIELDS.json);
            return {
                typeVal: typeVal,
                jsonVal: jsonVal,
                billno: getOfficialField(CQ_CONFIG_FIELDS.billno),
                billstatus: getOfficialField(CQ_CONFIG_FIELDS.billstatus)
            };
        }
        async function writeConfigBill(typeName, json) {
            try {
                await waitOfficialBillFields(configOpenedOfficial ? 12000 : 600);
            } catch (eWait) {
                throw new Error("未找到苍穹单据字段 crrc_textfield / crrc_largetextfield");
            }
            var typeOk = setOfficialField(CQ_CONFIG_FIELDS.type, typeName);
            var jsonOk = setOfficialField(CQ_CONFIG_FIELDS.json, json);
            if (!typeOk && !jsonOk) throw new Error("未找到苍穹字段 crrc_textfield / crrc_largetextfield");
            if (!typeOk) throw new Error("写入配置类型失败（crrc_textfield）");
            if (!jsonOk) throw new Error("写入配置详情失败（crrc_largetextfield）");
            await waitMs(250);
            if (!clickOfficialByText(["保存", "暂存"])) {
                throw new Error("未找到苍穹「保存」按钮");
            }
            await waitMs(800);
            return {
                billno: getOfficialField(CQ_CONFIG_FIELDS.billno),
                billstatus: formatBillStatus(getOfficialField(CQ_CONFIG_FIELDS.billstatus))
            };
        }
        if (dlgType) dlgType.onchange = function () {
            if (configPanelLock) return;
            renderConfigPanel();
        };
        bind("tblnew", async function () {
            if (configBusy) return;
            var clicked = clickOfficialByText(["新增"]);
            configOpenedOfficial = !!clicked;
            if (!clicked) {
                clog("未找到苍穹「新增」按钮，仅打开本地面板");
                setStatus("未找到苍穹「新增」按钮，已打开本地面板");
            } else {
                setStatus("已打开苍穹新增单据，请填写配置后确定");
            }
            openConfigDialog("add");
        });
        bind("tbl-config-edit", async function () {
            if (configBusy) return;
            var rows = selectedConfigRows();
            if (rows.length !== 1) {
                setStatus("请先选择一条要修改的配置");
                return;
            }
            var row = rows[0];
            if (row.statusCode === "B" || row.statusCode === "C") {
                setStatus("已提交/已审核的单据不能修改");
                return;
            }
            configBusy = true;
            try {
                if (row.no) selectOfficialListRow(row.no);
                await waitMs(250);
                var clicked = clickOfficialByText(["修改", "编辑"]);
                configOpenedOfficial = !!clicked;
                if (!clicked) {
                    setStatus("未找到苍穹「修改」按钮，已用列表中的配置打开");
                    var parsedLocal = parseConfigPayload(row.config);
                    openConfigDialog("edit", {
                        row: row,
                        type: row.type || typeFromField(row.typeName) || parsedLocal.type,
                        config: parsedLocal.config,
                        orgs: parsedLocal.orgs.length ? parsedLocal.orgs : (row.orgs || [])
                    });
                    return;
                }
                setStatus("正在读取单据配置…");
                var bill = null;
                try {
                    bill = await readConfigBill();
                } catch (readErr) {
                    clog("读取单据配置失败，回退列表数据", readErr && readErr.message);
                }
                var parsed = parseConfigPayload(bill && bill.jsonVal ? bill.jsonVal : row.config);
                var type = typeFromField(bill && bill.typeVal) || parsed.type || row.type || typeFromField(row.typeName);
                openConfigDialog("edit", {
                    row: row,
                    type: type,
                    config: parsed.config,
                    orgs: parsed.orgs.length ? parsed.orgs : (row.orgs || [])
                });
                setStatus("已读取单据配置，修改后确定将重新保存");
            } catch (err) {
                setStatus((err && err.message) || "打开修改失败");
                reportError("config-edit", err, {});
            } finally {
                configBusy = false;
            }
        });
        bind("tbl-config-del", async function () {
            if (configBusy) return;
            var rows = selectedConfigRows();
            if (!rows.length) {
                setStatus("请先选择要删除的配置");
                return;
            }
            var row = rows[0];
            configBusy = true;
            try {
                if (row.no) selectOfficialListRow(row.no);
                await waitMs(250);
                if (!clickOfficialByText(["删除"])) {
                    setStatus("未找到苍穹「删除」按钮");
                    return;
                }
                await waitMs(300);
                clickOfficialByText(["确定", "是", "确认"], CQ_DIALOG_SEL);
                await waitMs(500);
                await loadConfigFromCq();
                setStatus("已删除「" + (row.no || row.typeName || "") + "」");
            } catch (err) {
                setStatus((err && err.message) || "删除失败");
                reportError("config-del", err, {});
            } finally {
                configBusy = false;
            }
        });
        bind("dlg-close", closeDialog);
        bind("dlg-cancel", closeDialog);
        // 点遮罩关闭（与 shadcn Dialog 行为一致）
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) closeDialog();
            });
        }
        bind("dlg-ok", async function () {
            if (configBusy) return;
            var names = selectedOrgNames();
            if (!names.length) {
                setStatus("请选择党组织");
                return;
            }
            var type = dlgType ? dlgType.value : "";
            var typeName = CONFIG_TYPES[type] || type;
            var err = validateConfig(type, configDraft || {});
            if (err) {
                setStatus(err);
                return;
            }
            var cfg = buildConfigJson(names, configDraft);
            configBusy = true;
            try {
                var wroteOfficial = false;
                try {
                    await writeConfigBill(typeName, cfg);
                    wroteOfficial = true;
                } catch (writeErr) {
                    clog("写入苍穹单据失败", writeErr && writeErr.message);
                    if (findOfficialField(CQ_CONFIG_FIELDS.json) || findOfficialField(CQ_CONFIG_FIELDS.type)) {
                        setStatus((writeErr && writeErr.message) || "写入苍穹单据失败");
                        return;
                    }
                    setStatus("未检测到苍穹单据字段，已仅更新本地面板");
                }
                var modeLabel = configDlgMode === "edit" ? "已修改「" : "已新增「";
                var summary = names.join("、") + " / " + typeName;
                if (wroteOfficial) {
                    switchTab("config");
                    closeDialog();
                    await waitMs(500);
                    await loadConfigFromCq();
                    setStatus(modeLabel + summary + "」");
                    return;
                }
                var replaceKey = configEditRow && (configEditRow._rowId || configEditRow.no);
                var row = makeConfigRow({
                    _rowId: configEditRow && configEditRow._rowId,
                    no: (configEditRow && configEditRow.no) || "",
                    statusText: (configEditRow && configEditRow.statusText) || "暂存",
                    type: type,
                    typeName: typeName,
                    orgs: names,
                    config: configDraft
                });
                upsertConfigRow(row, replaceKey);
                switchTab("config");
                closeDialog();
                setStatus(modeLabel + summary + "」");
            } catch (okErr) {
                setStatus((okErr && okErr.message) || "保存配置失败");
                reportError("config-ok", okErr, {});
            } finally {
                configBusy = false;
            }
        });

        function xmlEscape(s) {
            return String(s == null ? "" : s)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
        }
        function excelSheetName(name) {
            var s = String(name || "Sheet1");
            var bad = String.fromCharCode(92) + "/?*[]:";
            var out = "";
            var i;
            for (i = 0; i < s.length; i++) {
                out += bad.indexOf(s.charAt(i)) >= 0 ? "_" : s.charAt(i);
            }
            if (out.length > 31) out = out.slice(0, 31);
            return out || "Sheet1";
        }
        function exportStamp() {
            var d = new Date();
            function pad(n) { return n < 10 ? "0" + n : String(n); }
            return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
                + "_" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
        }
        function triggerBlobDownload(blob, filename) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.rel = "noopener";
            a.style.display = "none";
            (document.body || document.documentElement).appendChild(a);
            a.click();
            setTimeout(function () {
                try { URL.revokeObjectURL(url); } catch (e0) { }
                if (a.parentNode) a.parentNode.removeChild(a);
            }, 800);
        }
        function excelCellXml(value, numeric) {
            if (numeric && value !== "" && value != null && isFinite(Number(value))) {
                return '<Cell><Data ss:Type="Number">' + Number(value) + "</Data></Cell>";
            }
            var nl = String.fromCharCode(10);
            var cr = String.fromCharCode(13);
            var text = String(value == null ? "" : value).split(cr + nl).join(nl).split(cr).join(nl);
            return '<Cell><Data ss:Type="String">' + xmlEscape(text).split(nl).join("&#10;") + "</Data></Cell>";
        }
        function buildExcelXml(sheetName, columns, rows) {
            var xml = [];
            xml.push('<?xml version="1.0" encoding="UTF-8"?>');
            xml.push('<?mso-application progid="Excel.Sheet"?>');
            xml.push('<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"');
            xml.push(' xmlns:o="urn:schemas-microsoft-com:office:office"');
            xml.push(' xmlns:x="urn:schemas-microsoft-com:office:excel"');
            xml.push(' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">');
            xml.push('<Styles><Style ss:ID="hdr"><Font ss:Bold="1"/></Style></Styles>');
            xml.push('<Worksheet ss:Name="' + xmlEscape(excelSheetName(sheetName)) + '"><Table>');
            xml.push("<Row>");
            columns.forEach(function (col) {
                xml.push('<Cell ss:StyleID="hdr"><Data ss:Type="String">' + xmlEscape(col.label || col.key) + "</Data></Cell>");
            });
            xml.push("</Row>");
            rows.forEach(function (row) {
                xml.push("<Row>");
                columns.forEach(function (col) {
                    xml.push(excelCellXml(row[col.key], !!col.numeric));
                });
                xml.push("</Row>");
            });
            xml.push("</Table></Worksheet></Workbook>");
            return xml.join("");
        }
        function getExportSource(tabId) {
            if (tabId === "orgView") {
                var view = orgViewTableSource();
                return {
                    label: "党组织",
                    columns: ORG_TABLE_COLUMNS,
                    rows: mapOrgRows((view && view.rows) || [])
                };
            }
            if (tabId === "orgDialog") {
                return {
                    label: "选择党组织",
                    columns: ORG_DIALOG_COLUMNS,
                    rows: mapOrgRows(orgTableSource())
                };
            }
            var def = TABLE_DEFS[tabId];
            if (!def || !def.columns) return null;
            return {
                label: def.label || tabId,
                columns: def.columns,
                rows: def.rows || []
            };
        }
        function exportCurrentExcel(tabId) {
            var src = getExportSource(tabId);
            if (!src) {
                setStatus("未找到可导出的表格");
                return;
            }
            if (!src.rows.length) {
                setStatus("当前没有可导出的数据");
                return;
            }
            var xml = buildExcelXml(src.label, src.columns, src.rows);
            var blob = new Blob([String.fromCharCode(0xFEFF) + xml], { type: "application/vnd.ms-excel;charset=utf-8;" });
            var filename = src.label + "_" + exportStamp() + ".xls";
            triggerBlobDownload(blob, filename);
            setStatus("已导出「" + src.label + "」" + src.rows.length + " 条");
        }
        [
            ["tbl-quarterly-export", "quarterly"],
            ["tbl-annual-export", "annual"],
            ["tbl-config-export", "config"],
            ["tbl-deduction-export", "deduction"],
            ["tbl-partyQuarterly-export", "partyQuarterly"],
            ["tbl-orgView-export", "orgView"],
            ["tbl-orgDialog-export", "orgDialog"]
        ].forEach(function (pair) {
            bind(pair[0], function () { exportCurrentExcel(pair[1]); });
        });

        onCqKeydown = function (e) {
            if (e.key === "Escape") {
                if (dlg && !dlg.hidden) { closeDialog(); return; }
                unmount();
            }
        };
        document.addEventListener("keydown", onCqKeydown);
        try {
            syncThemeButton();
            initTableData();
            initTabs();
        } catch (err) {
            clog("初始化失败: " + (err && err.message));
            reportError("init", err, {});
        }
    <\/script>
</body>

</html>
        `);
    doc.close();
    const modEl = doc.createElement("script");
    modEl.textContent = DT_BUNDLE;
    doc.body.appendChild(modEl);
})();
