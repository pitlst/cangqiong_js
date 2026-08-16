
(() => {
    const DT_BUNDLE = `(()=>{var Nf=Object.create;var zu=Object.defineProperty;var Lf=Object.getOwnPropertyDescriptor;var Vf=Object.getOwnPropertyNames;var Df=Object.getPrototypeOf,$f=Object.prototype.hasOwnProperty;var Mt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Tf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Vf(t))!$f.call(e,l)&&l!==n&&zu(e,l,{get:()=>t[l],enumerable:!(r=Lf(t,l))||r.enumerable});return e};var yr=(e,t,n)=>(n=e!=null?Nf(Df(e)):{},Tf(t||!e||!e.__esModule?zu(n,"default",{value:e,enumerable:!0}):n,e));var Uu=Mt(z=>{"use strict";var Rn=Symbol.for("react.element"),Of=Symbol.for("react.portal"),Hf=Symbol.for("react.fragment"),Af=Symbol.for("react.strict_mode"),jf=Symbol.for("react.profiler"),Bf=Symbol.for("react.provider"),Uf=Symbol.for("react.context"),Gf=Symbol.for("react.forward_ref"),Wf=Symbol.for("react.suspense"),Qf=Symbol.for("react.memo"),Kf=Symbol.for("react.lazy"),Nu=Symbol.iterator;function Xf(e){return e===null||typeof e!="object"?null:(e=Nu&&e[Nu]||e["@@iterator"],typeof e=="function"?e:null)}var Du={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$u=Object.assign,Tu={};function Wt(e,t,n){this.props=e,this.context=t,this.refs=Tu,this.updater=n||Du}Wt.prototype.isReactComponent={};Wt.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Wt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ou(){}Ou.prototype=Wt.prototype;function Xl(e,t,n){this.props=e,this.context=t,this.refs=Tu,this.updater=n||Du}var ql=Xl.prototype=new Ou;ql.constructor=Xl;$u(ql,Wt.prototype);ql.isPureReactComponent=!0;var Lu=Array.isArray,Hu=Object.prototype.hasOwnProperty,Yl={current:null},Au={key:!0,ref:!0,__self:!0,__source:!0};function ju(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Hu.call(t,r)&&!Au.hasOwnProperty(r)&&(l[r]=t[r]);var u=arguments.length-2;if(u===1)l.children=n;else if(1<u){for(var s=Array(u),a=0;a<u;a++)s[a]=arguments[a+2];l.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)l[r]===void 0&&(l[r]=u[r]);return{$typeof:Rn,type:e,key:o,ref:i,props:l,_owner:Yl.current}}function qf(e,t){return{$typeof:Rn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zl(e){return typeof e=="object"&&e!==null&&e.$typeof===Rn}function Yf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Vu=/\\/+/g;function Kl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Yf(""+e.key):t.toString(36)}function wr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$typeof){case Rn:case Of:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Kl(i,0):r,Lu(l)?(n="",e!=null&&(n=e.replace(Vu,"(() => {/")+"/"),wr(l,t,n,"",function(a){return a})):l!=null&&(Zl(l)&&(l=qf(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Vu,"(() => {/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",Lu(e))for(var u=0;u<e.length;u++){o=e[u];var s=r+Kl(o,u);i+=wr(o,t,n,s,l)}else if(s=Xf(e),typeof s=="function")for(e=s.call(e),u=0;!(o=e.next()).done;)o=o.value,s=r+Kl(o,u++),i+=wr(o,t,n,s,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Sr(e,t,n){if(e==null)return e;var r=[],l=0;return wr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Zf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},Cr={transition:null},Jf={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:Cr,ReactCurrentOwner:Yl};function Bu(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:Sr,forEach:function(e,t,n){Sr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sr(e,function(){t++}),t},toArray:function(e){return Sr(e,function(t){return t})||[]},only:function(e){if(!Zl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=Wt;z.Fragment=Hf;z.Profiler=jf;z.PureComponent=Xl;z.StrictMode=Af;z.Suspense=Wf;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jf;z.act=Bu;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=$u({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Yl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)Hu.call(t,s)&&!Au.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&u!==void 0?u[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){u=Array(s);for(var a=0;a<s;a++)u[a]=arguments[a+2];r.children=u}return{$typeof:Rn,type:e.type,key:l,ref:o,props:r,_owner:i}};z.createContext=function(e){return e={$typeof:Uf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$typeof:Bf,_context:e},e.Consumer=e};z.createElement=ju;z.createFactory=function(e){var t=ju.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$typeof:Gf,render:e}};z.isValidElement=Zl;z.lazy=function(e){return{$typeof:Kf,_payload:{_status:-1,_result:e},_init:Zf}};z.memo=function(e,t){return{$typeof:Qf,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=Cr.transition;Cr.transition={};try{e()}finally{Cr.transition=t}};z.unstable_act=Bu;z.useCallback=function(e,t){return ue.current.useCallback(e,t)};z.useContext=function(e){return ue.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};z.useEffect=function(e,t){return ue.current.useEffect(e,t)};z.useId=function(){return ue.current.useId()};z.useImperativeHandle=function(e,t,n){return ue.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return ue.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return ue.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return ue.current.useMemo(e,t)};z.useReducer=function(e,t,n){return ue.current.useReducer(e,t,n)};z.useRef=function(e){return ue.current.useRef(e)};z.useState=function(e){return ue.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return ue.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return ue.current.useTransition()};z.version="18.3.1"});var _r=Mt((Zp,Gu)=>{"use strict";Gu.exports=Uu()});var es=Mt(D=>{"use strict";function to(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<Rr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function Ne(e){return e.length===0?null:e[0]}function Er(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,u=e[i],s=i+1,a=e[s];if(0>Rr(u,n))s<l&&0>Rr(a,u)?(e[r]=a,e[s]=n,r=s):(e[r]=u,e[i]=n,r=i);else if(s<l&&0>Rr(a,n))e[r]=a,e[s]=n,r=s;else break e}}return t}function Rr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Wu=performance,D.unstable_now=function(){return Wu.now()}):(Jl=Date,Qu=Jl.now(),D.unstable_now=function(){return Jl.now()-Qu});var Wu,Jl,Qu,Be=[],it=[],bf=1,ke=null,te=3,xr=!1,It=!1,En=!1,qu=typeof setTimeout=="function"?setTimeout:null,Yu=typeof clearTimeout=="function"?clearTimeout:null,Ku=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function no(e){for(var t=Ne(it);t!==null;){if(t.callback===null)Er(it);else if(t.startTime<=e)Er(it),t.sortIndex=t.expirationTime,to(Be,t);else break;t=Ne(it)}}function ro(e){if(En=!1,no(e),!It)if(Ne(Be)!==null)It=!0,oo(lo);else{var t=Ne(it);t!==null&&io(ro,t.startTime-e)}}function lo(e,t){It=!1,En&&(En=!1,Yu(xn),xn=-1),xr=!0;var n=te;try{for(no(t),ke=Ne(Be);ke!==null&&(!(ke.expirationTime>t)||e&&!bu());){var r=ke.callback;if(typeof r=="function"){ke.callback=null,te=ke.priorityLevel;var l=r(ke.expirationTime<=t);t=D.unstable_now(),typeof l=="function"?ke.callback=l:ke===Ne(Be)&&Er(Be),no(t)}else Er(Be);ke=Ne(Be)}if(ke!==null)var o=!0;else{var i=Ne(it);i!==null&&io(ro,i.startTime-t),o=!1}return o}finally{ke=null,te=n,xr=!1}}var Pr=!1,kr=null,xn=-1,Zu=5,Ju=-1;function bu(){return!(D.unstable_now()-Ju<Zu)}function bl(){if(kr!==null){var e=D.unstable_now();Ju=e;var t=!0;try{t=kr(!0,e)}finally{t?kn():(Pr=!1,kr=null)}}else Pr=!1}var kn;typeof Ku=="function"?kn=function(){Ku(bl)}:typeof MessageChannel!="undefined"?(eo=new MessageChannel,Xu=eo.port2,eo.port1.onmessage=bl,kn=function(){Xu.postMessage(null)}):kn=function(){qu(bl,0)};var eo,Xu;function oo(e){kr=e,Pr||(Pr=!0,kn())}function io(e,t){xn=qu(function(){e(D.unstable_now())},t)}D.unstable_IdlePriority=5;D.unstable_ImmediatePriority=1;D.unstable_LowPriority=4;D.unstable_NormalPriority=3;D.unstable_Profiling=null;D.unstable_UserBlockingPriority=2;D.unstable_cancelCallback=function(e){e.callback=null};D.unstable_continueExecution=function(){It||xr||(It=!0,oo(lo))};D.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Zu=0<e?Math.floor(1e3/e):5};D.unstable_getCurrentPriorityLevel=function(){return te};D.unstable_getFirstCallbackNode=function(){return Ne(Be)};D.unstable_next=function(e){switch(te){case 1:case 2:case 3:var t=3;break;default:t=te}var n=te;te=t;try{return e()}finally{te=n}};D.unstable_pauseExecution=function(){};D.unstable_requestPaint=function(){};D.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=te;te=e;try{return t()}finally{te=n}};D.unstable_scheduleCallback=function(e,t,n){var r=D.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:bf++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,to(it,e),Ne(Be)===null&&e===Ne(it)&&(En?(Yu(xn),xn=-1):En=!0,io(ro,n-r))):(e.sortIndex=l,to(Be,e),It||xr||(It=!0,oo(lo))),e};D.unstable_shouldYield=bu;D.unstable_wrapCallback=function(e){var t=te;return function(){var n=te;te=t;try{return e.apply(this,arguments)}finally{te=n}}}});var ns=Mt((bp,ts)=>{"use strict";ts.exports=es()});var uf=Mt(Ce=>{"use strict";var ed=_r(),Se=ns();function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var aa=new Set,Xn={};function Ut(e,t){gn(e,t),gn(e+"Capture",t)}function gn(e,t){for(Xn[e]=t,e=0;e<t.length;e++)aa.add(t[e])}var be=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),Io=Object.prototype.hasOwnProperty,td=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,rs={},ls={};function nd(e){return Io.call(ls,e)?!0:Io.call(rs,e)?!1:td.test(e)?ls[e]=!0:(rs[e]=!0,!1)}function rd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ld(e,t,n,r){if(t===null||typeof t=="undefined"||rd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ce(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ee[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ee[t]=new ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ee[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ee[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ee[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ee[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ee[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ee[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ee[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var _i=/[\\-:]([a-z])/g;function Ri(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(_i,Ri);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});ee.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ki(e,t,n,r){var l=ee.hasOwnProperty(t)?ee[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ld(t,n,l,r)&&(n=null),r||l===null?nd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var rt=ed.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fr=Symbol.for("react.element"),Xt=Symbol.for("react.portal"),qt=Symbol.for("react.fragment"),Ei=Symbol.for("react.strict_mode"),zo=Symbol.for("react.profiler"),ca=Symbol.for("react.provider"),fa=Symbol.for("react.context"),xi=Symbol.for("react.forward_ref"),No=Symbol.for("react.suspense"),Lo=Symbol.for("react.suspense_list"),Pi=Symbol.for("react.memo"),st=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var da=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var os=Symbol.iterator;function Pn(e){return e===null||typeof e!="object"?null:(e=os&&e[os]||e["@@iterator"],typeof e=="function"?e:null)}var G=Object.assign,uo;function Dn(e){if(uo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\\n( *(at )?)/);uo=t&&t[1]||""}return\`
\`+uo+e}var so=!1;function ao(e,t){if(!e||so)return"";so=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(a){var r=a}Reflect.construct(e,[],t)}else{try{t.call()}catch(a){r=a}e.call(t.prototype)}else{try{throw Error()}catch(a){r=a}e()}}catch(a){if(a&&r&&typeof a.stack=="string"){for(var l=a.stack.split(\`
\`),o=r.stack.split(\`
\`),i=l.length-1,u=o.length-1;1<=i&&0<=u&&l[i]!==o[u];)u--;for(;1<=i&&0<=u;i--,u--)if(l[i]!==o[u]){if(i!==1||u!==1)do if(i--,u--,0>u||l[i]!==o[u]){var s=\`
\`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=u);break}}}finally{so=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Dn(e):""}function od(e){switch(e.tag){case 5:return Dn(e.type);case 16:return Dn("Lazy");case 13:return Dn("Suspense");case 19:return Dn("SuspenseList");case 0:case 2:case 15:return e=ao(e.type,!1),e;case 11:return e=ao(e.type.render,!1),e;case 1:return e=ao(e.type,!0),e;default:return""}}function Vo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case qt:return"Fragment";case Xt:return"Portal";case zo:return"Profiler";case Ei:return"StrictMode";case No:return"Suspense";case Lo:return"SuspenseList"}if(typeof e=="object")switch(e.$typeof){case fa:return(e.displayName||"Context")+".Consumer";case ca:return(e._context.displayName||"Context")+".Provider";case xi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pi:return t=e.displayName||null,t!==null?t:Vo(e.type)||"Memo";case st:t=e._payload,e=e._init;try{return Vo(e(t))}catch(n){}}return null}function id(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Vo(t);case 8:return t===Ei?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function _t(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ga(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ud(e){var t=ga(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mr(e){e._valueTracker||(e._valueTracker=ud(e))}function pa(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ga(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function rl(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Do(e,t){var n=t.checked;return G({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function is(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=_t(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ma(e,t){t=t.checked,t!=null&&ki(e,"checked",t,!1)}function $o(e,t){ma(e,t);var n=_t(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?To(e,t.type,n):t.hasOwnProperty("defaultValue")&&To(e,t.type,_t(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function us(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function To(e,t,n){(t!=="number"||rl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var $n=Array.isArray;function un(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+_t(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Oo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(w(91));return G({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ss(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(w(92));if($n(n)){if(1<n.length)throw Error(w(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:_t(n)}}function ha(e,t){var n=_t(t.value),r=_t(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function as(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function va(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ho(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?va(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ir,ya=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ir=Ir||document.createElement("div"),Ir.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ir.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Hn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},sd=["Webkit","ms","Moz","O"];Object.keys(Hn).forEach(function(e){sd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Hn[t]=Hn[e]})});function Sa(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Hn.hasOwnProperty(e)&&Hn[e]?(""+t).trim():t+"px"}function wa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Sa(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var ad=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ao(e,t){if(t){if(ad[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(w(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(w(61))}if(t.style!=null&&typeof t.style!="object")throw Error(w(62))}}function jo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bo=null;function Fi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Uo=null,sn=null,an=null;function cs(e){if(e=gr(e)){if(typeof Uo!="function")throw Error(w(280));var t=e.stateNode;t&&(t=zl(t),Uo(e.stateNode,e.type,t))}}function Ca(e){sn?an?an.push(e):an=[e]:sn=e}function _a(){if(sn){var e=sn,t=an;if(an=sn=null,cs(e),t)for(e=0;e<t.length;e++)cs(t[e])}}function Ra(e,t){return e(t)}function ka(){}var co=!1;function Ea(e,t,n){if(co)return e(t,n);co=!0;try{return Ra(e,t,n)}finally{co=!1,(sn!==null||an!==null)&&(ka(),_a())}}function Yn(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(w(231,t,typeof n));return n}var Go=!1;if(be)try{Qt={},Object.defineProperty(Qt,"passive",{get:function(){Go=!0}}),window.addEventListener("test",Qt,Qt),window.removeEventListener("test",Qt,Qt)}catch(e){Go=!1}var Qt;function cd(e,t,n,r,l,o,i,u,s){var a=Array.prototype.slice.call(arguments,3);try{t.apply(n,a)}catch(p){this.onError(p)}}var An=!1,ll=null,ol=!1,Wo=null,fd={onError:function(e){An=!0,ll=e}};function dd(e,t,n,r,l,o,i,u,s){An=!1,ll=null,cd.apply(fd,arguments)}function gd(e,t,n,r,l,o,i,u,s){if(dd.apply(this,arguments),An){if(An){var a=ll;An=!1,ll=null}else throw Error(w(198));ol||(ol=!0,Wo=a)}}function Gt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function xa(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function fs(e){if(Gt(e)!==e)throw Error(w(188))}function pd(e){var t=e.alternate;if(!t){if(t=Gt(e),t===null)throw Error(w(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return fs(l),e;if(o===r)return fs(l),t;o=o.sibling}throw Error(w(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,u=l.child;u;){if(u===n){i=!0,n=l,r=o;break}if(u===r){i=!0,r=l,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=l;break}if(u===r){i=!0,r=o,n=l;break}u=u.sibling}if(!i)throw Error(w(189))}}if(n.alternate!==r)throw Error(w(190))}if(n.tag!==3)throw Error(w(188));return n.stateNode.current===n?e:t}function Pa(e){return e=pd(e),e!==null?Fa(e):null}function Fa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fa(e);if(t!==null)return t;e=e.sibling}return null}var Ma=Se.unstable_scheduleCallback,ds=Se.unstable_cancelCallback,md=Se.unstable_shouldYield,hd=Se.unstable_requestPaint,Q=Se.unstable_now,vd=Se.unstable_getCurrentPriorityLevel,Mi=Se.unstable_ImmediatePriority,Ia=Se.unstable_UserBlockingPriority,il=Se.unstable_NormalPriority,yd=Se.unstable_LowPriority,za=Se.unstable_IdlePriority,Pl=null,Qe=null;function Sd(e){if(Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(Pl,e,void 0,(e.current.flags&128)===128)}catch(t){}}var Te=Math.clz32?Math.clz32:_d,wd=Math.log,Cd=Math.LN2;function _d(e){return e>>>=0,e===0?32:31-(wd(e)/Cd|0)|0}var zr=64,Nr=4194304;function Tn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ul(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~l;u!==0?r=Tn(u):(o&=i,o!==0&&(r=Tn(o)))}else i=n&~l,i!==0?r=Tn(i):o!==0&&(r=Tn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Te(t),l=1<<n,r|=e[n],t&=~l;return r}function Rd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Te(o),u=1<<i,s=l[i];s===-1?((u&n)===0||(u&r)!==0)&&(l[i]=Rd(u,t)):s<=t&&(e.expiredLanes|=u),o&=~u}}function Qo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Na(){var e=zr;return zr<<=1,(zr&4194240)===0&&(zr=64),e}function fo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Te(t),e[t]=n}function Ed(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Te(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Ii(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Te(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var V=0;function La(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Va,zi,Da,$a,Ta,Ko=!1,Lr=[],pt=null,mt=null,ht=null,Zn=new Map,Jn=new Map,ct=[],xd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gs(e,t){switch(e){case"focusin":case"focusout":pt=null;break;case"dragenter":case"dragleave":mt=null;break;case"mouseover":case"mouseout":ht=null;break;case"pointerover":case"pointerout":Zn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jn.delete(t.pointerId)}}function Fn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=gr(t),t!==null&&zi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Pd(e,t,n,r,l){switch(t){case"focusin":return pt=Fn(pt,e,t,n,r,l),!0;case"dragenter":return mt=Fn(mt,e,t,n,r,l),!0;case"mouseover":return ht=Fn(ht,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Zn.set(o,Fn(Zn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Jn.set(o,Fn(Jn.get(o)||null,e,t,n,r,l)),!0}return!1}function Oa(e){var t=Lt(e.target);if(t!==null){var n=Gt(t);if(n!==null){if(t=n.tag,t===13){if(t=xa(n),t!==null){e.blockedOn=t,Ta(e.priority,function(){Da(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Xo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Bo=r,n.target.dispatchEvent(r),Bo=null}else return t=gr(n),t!==null&&zi(t),e.blockedOn=n,!1;t.shift()}return!0}function ps(e,t,n){Kr(e)&&n.delete(t)}function Fd(){Ko=!1,pt!==null&&Kr(pt)&&(pt=null),mt!==null&&Kr(mt)&&(mt=null),ht!==null&&Kr(ht)&&(ht=null),Zn.forEach(ps),Jn.forEach(ps)}function Mn(e,t){e.blockedOn===t&&(e.blockedOn=null,Ko||(Ko=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,Fd)))}function bn(e){function t(l){return Mn(l,e)}if(0<Lr.length){Mn(Lr[0],e);for(var n=1;n<Lr.length;n++){var r=Lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(pt!==null&&Mn(pt,e),mt!==null&&Mn(mt,e),ht!==null&&Mn(ht,e),Zn.forEach(t),Jn.forEach(t),n=0;n<ct.length;n++)r=ct[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ct.length&&(n=ct[0],n.blockedOn===null);)Oa(n),n.blockedOn===null&&ct.shift()}var cn=rt.ReactCurrentBatchConfig,sl=!0;function Md(e,t,n,r){var l=V,o=cn.transition;cn.transition=null;try{V=1,Ni(e,t,n,r)}finally{V=l,cn.transition=o}}function Id(e,t,n,r){var l=V,o=cn.transition;cn.transition=null;try{V=4,Ni(e,t,n,r)}finally{V=l,cn.transition=o}}function Ni(e,t,n,r){if(sl){var l=Xo(e,t,n,r);if(l===null)So(e,t,r,al,n),gs(e,r);else if(Pd(l,e,t,n,r))r.stopPropagation();else if(gs(e,r),t&4&&-1<xd.indexOf(e)){for(;l!==null;){var o=gr(l);if(o!==null&&Va(o),o=Xo(e,t,n,r),o===null&&So(e,t,r,al,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else So(e,t,r,null,n)}}var al=null;function Xo(e,t,n,r){if(al=null,e=Fi(r),e=Lt(e),e!==null)if(t=Gt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=xa(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return al=e,null}function Ha(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vd()){case Mi:return 1;case Ia:return 4;case il:case yd:return 16;case za:return 536870912;default:return 16}default:return 16}}var dt=null,Li=null,Xr=null;function Aa(){if(Xr)return Xr;var e,t=Li,n=t.length,r,l="value"in dt?dt.value:dt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Xr=l.slice(e,1<r?1-r:void 0)}function qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function ms(){return!1}function we(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(o):o[u]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vr:ms,this.isPropagationStopped=ms,this}return G(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vi=we(wn),dr=G({},wn,{view:0,detail:0}),zd=we(dr),go,po,In,Fl=G({},dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Di,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==In&&(In&&e.type==="mousemove"?(go=e.screenX-In.screenX,po=e.screenY-In.screenY):po=go=0,In=e),go)},movementY:function(e){return"movementY"in e?e.movementY:po}}),hs=we(Fl),Nd=G({},Fl,{dataTransfer:0}),Ld=we(Nd),Vd=G({},dr,{relatedTarget:0}),mo=we(Vd),Dd=G({},wn,{animationName:0,elapsedTime:0,pseudoElement:0}),$d=we(Dd),Td=G({},wn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Od=we(Td),Hd=G({},wn,{data:0}),vs=we(Hd),Ad={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ud(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bd[e])?!!t[e]:!1}function Di(){return Ud}var Gd=G({},dr,{key:function(e){if(e.key){var t=Ad[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Di,charCode:function(e){return e.type==="keypress"?qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wd=we(Gd),Qd=G({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ys=we(Qd),Kd=G({},dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Di}),Xd=we(Kd),qd=G({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yd=we(qd),Zd=G({},Fl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Jd=we(Zd),bd=[9,13,27,32],$i=be&&"CompositionEvent"in window,jn=null;be&&"documentMode"in document&&(jn=document.documentMode);var eg=be&&"TextEvent"in window&&!jn,ja=be&&(!$i||jn&&8<jn&&11>=jn),Ss=" ",ws=!1;function Ba(e,t){switch(e){case"keyup":return bd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ua(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Yt=!1;function tg(e,t){switch(e){case"compositionend":return Ua(t);case"keypress":return t.which!==32?null:(ws=!0,Ss);case"textInput":return e=t.data,e===Ss&&ws?null:e;default:return null}}function ng(e,t){if(Yt)return e==="compositionend"||!$i&&Ba(e,t)?(e=Aa(),Xr=Li=dt=null,Yt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ja&&t.locale!=="ko"?null:t.data;default:return null}}var rg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!rg[e.type]:t==="textarea"}function Ga(e,t,n,r){Ca(r),t=cl(t,"onChange"),0<t.length&&(n=new Vi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Bn=null,er=null;function lg(e){tc(e,0)}function Ml(e){var t=bt(e);if(pa(t))return e}function og(e,t){if(e==="change")return t}var Wa=!1;be&&(be?($r="oninput"in document,$r||(ho=document.createElement("div"),ho.setAttribute("oninput","return;"),$r=typeof ho.oninput=="function"),Dr=$r):Dr=!1,Wa=Dr&&(!document.documentMode||9<document.documentMode));var Dr,$r,ho;function _s(){Bn&&(Bn.detachEvent("onpropertychange",Qa),er=Bn=null)}function Qa(e){if(e.propertyName==="value"&&Ml(er)){var t=[];Ga(t,er,e,Fi(e)),Ea(lg,t)}}function ig(e,t,n){e==="focusin"?(_s(),Bn=t,er=n,Bn.attachEvent("onpropertychange",Qa)):e==="focusout"&&_s()}function ug(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ml(er)}function sg(e,t){if(e==="click")return Ml(t)}function ag(e,t){if(e==="input"||e==="change")return Ml(t)}function cg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var He=typeof Object.is=="function"?Object.is:cg;function tr(e,t){if(He(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Io.call(t,l)||!He(e[l],t[l]))return!1}return!0}function Rs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ks(e,t){var n=Rs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Rs(n)}}function Ka(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ka(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xa(){for(var e=window,t=rl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch(r){n=!1}if(n)e=t.contentWindow;else break;t=rl(e.document)}return t}function Ti(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function fg(e){var t=Xa(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ka(n.ownerDocument.documentElement,n)){if(r!==null&&Ti(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=ks(n,o);var i=ks(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var dg=be&&"documentMode"in document&&11>=document.documentMode,Zt=null,qo=null,Un=null,Yo=!1;function Es(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Yo||Zt==null||Zt!==rl(r)||(r=Zt,"selectionStart"in r&&Ti(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Un&&tr(Un,r)||(Un=r,r=cl(qo,"onSelect"),0<r.length&&(t=new Vi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Zt)))}function Tr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Jt={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionend:Tr("Transition","TransitionEnd")},vo={},qa={};be&&(qa=document.createElement("div").style,"AnimationEvent"in window||(delete Jt.animationend.animation,delete Jt.animationiteration.animation,delete Jt.animationstart.animation),"TransitionEvent"in window||delete Jt.transitionend.transition);function Il(e){if(vo[e])return vo[e];if(!Jt[e])return e;var t=Jt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qa)return vo[e]=t[n];return e}var Ya=Il("animationend"),Za=Il("animationiteration"),Ja=Il("animationstart"),ba=Il("transitionend"),ec=new Map,xs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kt(e,t){ec.set(e,t),Ut(t,[e])}for(Or=0;Or<xs.length;Or++)Hr=xs[Or],Ps=Hr.toLowerCase(),Fs=Hr[0].toUpperCase()+Hr.slice(1),kt(Ps,"on"+Fs);var Hr,Ps,Fs,Or;kt(Ya,"onAnimationEnd");kt(Za,"onAnimationIteration");kt(Ja,"onAnimationStart");kt("dblclick","onDoubleClick");kt("focusin","onFocus");kt("focusout","onBlur");kt(ba,"onTransitionEnd");gn("onMouseEnter",["mouseout","mouseover"]);gn("onMouseLeave",["mouseout","mouseover"]);gn("onPointerEnter",["pointerout","pointerover"]);gn("onPointerLeave",["pointerout","pointerover"]);Ut("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ut("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ut("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ut("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ut("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ut("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var On="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gg=new Set("cancel close invalid load scroll toggle".split(" ").concat(On));function Ms(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,gd(r,t,void 0,e),e.currentTarget=null}function tc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],s=u.instance,a=u.currentTarget;if(u=u.listener,s!==o&&l.isPropagationStopped())break e;Ms(l,u,a),o=s}else for(i=0;i<r.length;i++){if(u=r[i],s=u.instance,a=u.currentTarget,u=u.listener,s!==o&&l.isPropagationStopped())break e;Ms(l,u,a),o=s}}}if(ol)throw e=Wo,ol=!1,Wo=null,e}function O(e,t){var n=t[ti];n===void 0&&(n=t[ti]=new Set);var r=e+"__bubble";n.has(r)||(nc(t,e,2,!1),n.add(r))}function yo(e,t,n){var r=0;t&&(r|=4),nc(n,e,r,t)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function nr(e){if(!e[Ar]){e[Ar]=!0,aa.forEach(function(n){n!=="selectionchange"&&(gg.has(n)||yo(n,!1,e),yo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ar]||(t[Ar]=!0,yo("selectionchange",!1,t))}}function nc(e,t,n,r){switch(Ha(t)){case 1:var l=Md;break;case 4:l=Id;break;default:l=Ni}n=l.bind(null,t,n,e),l=void 0,!Go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function So(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;u!==null;){if(i=Lt(u),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}u=u.parentNode}}r=r.return}Ea(function(){var a=o,p=Fi(n),h=[];e:{var d=ec.get(e);if(d!==void 0){var c=Vi,v=e;switch(e){case"keypress":if(qr(n)===0)break e;case"keydown":case"keyup":c=Wd;break;case"focusin":v="focus",c=mo;break;case"focusout":v="blur",c=mo;break;case"beforeblur":case"afterblur":c=mo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=hs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=Ld;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=Xd;break;case Ya:case Za:case Ja:c=$d;break;case ba:c=Yd;break;case"scroll":c=zd;break;case"wheel":c=Jd;break;case"copy":case"cut":case"paste":c=Od;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=ys}var y=(t&4)!==0,k=!y&&e==="scroll",g=y?d!==null?d+"Capture":null:d;y=[];for(var f=a,m;f!==null;){m=f;var S=m.stateNode;if(m.tag===5&&S!==null&&(m=S,g!==null&&(S=Yn(f,g),S!=null&&y.push(rr(f,S,m)))),k)break;f=f.return}0<y.length&&(d=new c(d,v,null,n,p),h.push({event:d,listeners:y}))}}if((t&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",c=e==="mouseout"||e==="pointerout",d&&n!==Bo&&(v=n.relatedTarget||n.fromElement)&&(Lt(v)||v[et]))break e;if((c||d)&&(d=p.window===p?p:(d=p.ownerDocument)?d.defaultView||d.parentWindow:window,c?(v=n.relatedTarget||n.toElement,c=a,v=v?Lt(v):null,v!==null&&(k=Gt(v),v!==k||v.tag!==5&&v.tag!==6)&&(v=null)):(c=null,v=a),c!==v)){if(y=hs,S="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(y=ys,S="onPointerLeave",g="onPointerEnter",f="pointer"),k=c==null?d:bt(c),m=v==null?d:bt(v),d=new y(S,f+"leave",c,n,p),d.target=k,d.relatedTarget=m,S=null,Lt(p)===a&&(y=new y(g,f+"enter",v,n,p),y.target=m,y.relatedTarget=k,S=y),k=S,c&&v)t:{for(y=c,g=v,f=0,m=y;m;m=Kt(m))f++;for(m=0,S=g;S;S=Kt(S))m++;for(;0<f-m;)y=Kt(y),f--;for(;0<m-f;)g=Kt(g),m--;for(;f--;){if(y===g||g!==null&&y===g.alternate)break t;y=Kt(y),g=Kt(g)}y=null}else y=null;c!==null&&Is(h,d,c,y,!1),v!==null&&k!==null&&Is(h,k,v,y,!0)}}e:{if(d=a?bt(a):window,c=d.nodeName&&d.nodeName.toLowerCase(),c==="select"||c==="input"&&d.type==="file")var C=og;else if(Cs(d))if(Wa)C=ag;else{C=ug;var E=ig}else(c=d.nodeName)&&c.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(C=sg);if(C&&(C=C(e,a))){Ga(h,C,n,p);break e}E&&E(e,d,a),e==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&To(d,"number",d.value)}switch(E=a?bt(a):window,e){case"focusin":(Cs(E)||E.contentEditable==="true")&&(Zt=E,qo=a,Un=null);break;case"focusout":Un=qo=Zt=null;break;case"mousedown":Yo=!0;break;case"contextmenu":case"mouseup":case"dragend":Yo=!1,Es(h,n,p);break;case"selectionchange":if(dg)break;case"keydown":case"keyup":Es(h,n,p)}var _;if($i)e:{switch(e){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else Yt?Ba(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(ja&&n.locale!=="ko"&&(Yt||x!=="onCompositionStart"?x==="onCompositionEnd"&&Yt&&(_=Aa()):(dt=p,Li="value"in dt?dt.value:dt.textContent,Yt=!0)),E=cl(a,x),0<E.length&&(x=new vs(x,e,null,n,p),h.push({event:x,listeners:E}),_?x.data=_:(_=Ua(n),_!==null&&(x.data=_)))),(_=eg?tg(e,n):ng(e,n))&&(a=cl(a,"onBeforeInput"),0<a.length&&(p=new vs("onBeforeInput","beforeinput",null,n,p),h.push({event:p,listeners:a}),p.data=_))}tc(h,t)})}function rr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function cl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Yn(e,n),o!=null&&r.unshift(rr(e,o,l)),o=Yn(e,t),o!=null&&r.push(rr(e,o,l))),e=e.return}return r}function Kt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Is(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var u=n,s=u.alternate,a=u.stateNode;if(s!==null&&s===r)break;u.tag===5&&a!==null&&(u=a,l?(s=Yn(n,o),s!=null&&i.unshift(rr(n,s,u))):l||(s=Yn(n,o),s!=null&&i.push(rr(n,s,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var pg=/\\r\\n?/g,mg=/\\u0000|\\uFFFD/g;function zs(e){return(typeof e=="string"?e:""+e).replace(pg,\`
\`).replace(mg,"")}function jr(e,t,n){if(t=zs(t),zs(e)!==t&&n)throw Error(w(425))}function fl(){}var Zo=null,Jo=null;function bo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ei=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,Ns=typeof Promise=="function"?Promise:void 0,vg=typeof queueMicrotask=="function"?queueMicrotask:typeof Ns!="undefined"?function(e){return Ns.resolve(null).then(e).catch(yg)}:ei;function yg(e){setTimeout(function(){throw e})}function wo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),bn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);bn(t)}function vt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ls(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Cn=Math.random().toString(36).slice(2),We="__reactFiber$"+Cn,lr="__reactProps$"+Cn,et="__reactContainer$"+Cn,ti="__reactEvents$"+Cn,Sg="__reactListeners$"+Cn,wg="__reactHandles$"+Cn;function Lt(e){var t=e[We];if(t)return t;for(var n=e.parentNode;n;){if(t=n[et]||n[We]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ls(e);e!==null;){if(n=e[We])return n;e=Ls(e)}return t}e=n,n=e.parentNode}return null}function gr(e){return e=e[We]||e[et],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function bt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function zl(e){return e[lr]||null}var ni=[],en=-1;function Et(e){return{current:e}}function H(e){0>en||(e.current=ni[en],ni[en]=null,en--)}function $(e,t){en++,ni[en]=e.current,e.current=t}var Rt={},oe=Et(Rt),ge=Et(!1),Ot=Rt;function pn(e,t){var n=e.type.contextTypes;if(!n)return Rt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function pe(e){return e=e.childContextTypes,e!=null}function dl(){H(ge),H(oe)}function Vs(e,t,n){if(oe.current!==Rt)throw Error(w(168));$(oe,t),$(ge,n)}function rc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(w(108,id(e)||"Unknown",l));return G({},n,r)}function gl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Ot=oe.current,$(oe,e),$(ge,ge.current),!0}function Ds(e,t,n){var r=e.stateNode;if(!r)throw Error(w(169));n?(e=rc(e,t,Ot),r.__reactInternalMemoizedMergedChildContext=e,H(ge),H(oe),$(oe,e)):H(ge),$(ge,n)}var qe=null,Nl=!1,Co=!1;function lc(e){qe===null?qe=[e]:qe.push(e)}function Cg(e){Nl=!0,lc(e)}function xt(){if(!Co&&qe!==null){Co=!0;var e=0,t=V;try{var n=qe;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}qe=null,Nl=!1}catch(l){throw qe!==null&&(qe=qe.slice(e+1)),Ma(Mi,xt),l}finally{V=t,Co=!1}}return null}var tn=[],nn=0,pl=null,ml=0,Ee=[],xe=0,Ht=null,Ye=1,Ze="";function zt(e,t){tn[nn++]=ml,tn[nn++]=pl,pl=e,ml=t}function oc(e,t,n){Ee[xe++]=Ye,Ee[xe++]=Ze,Ee[xe++]=Ht,Ht=e;var r=Ye;e=Ze;var l=32-Te(r)-1;r&=~(1<<l),n+=1;var o=32-Te(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Ye=1<<32-Te(t)+l|n<<l|r,Ze=o+e}else Ye=1<<o|n<<l|r,Ze=e}function Oi(e){e.return!==null&&(zt(e,1),oc(e,1,0))}function Hi(e){for(;e===pl;)pl=tn[--nn],tn[nn]=null,ml=tn[--nn],tn[nn]=null;for(;e===Ht;)Ht=Ee[--xe],Ee[xe]=null,Ze=Ee[--xe],Ee[xe]=null,Ye=Ee[--xe],Ee[xe]=null}var ye=null,ve=null,j=!1,$e=null;function ic(e,t){var n=Pe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function $s(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ye=e,ve=vt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ye=e,ve=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ht!==null?{id:Ye,overflow:Ze}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Pe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ye=e,ve=null,!0):!1;default:return!1}}function ri(e){return(e.mode&1)!==0&&(e.flags&128)===0}function li(e){if(j){var t=ve;if(t){var n=t;if(!$s(e,t)){if(ri(e))throw Error(w(418));t=vt(n.nextSibling);var r=ye;t&&$s(e,t)?ic(r,n):(e.flags=e.flags&-4097|2,j=!1,ye=e)}}else{if(ri(e))throw Error(w(418));e.flags=e.flags&-4097|2,j=!1,ye=e}}}function Ts(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ye=e}function Br(e){if(e!==ye)return!1;if(!j)return Ts(e),j=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!bo(e.type,e.memoizedProps)),t&&(t=ve)){if(ri(e))throw uc(),Error(w(418));for(;t;)ic(e,t),t=vt(t.nextSibling)}if(Ts(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ve=vt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ve=null}}else ve=ye?vt(e.stateNode.nextSibling):null;return!0}function uc(){for(var e=ve;e;)e=vt(e.nextSibling)}function mn(){ve=ye=null,j=!1}function Ai(e){$e===null?$e=[e]:$e.push(e)}var _g=rt.ReactCurrentBatchConfig;function zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(w(309));var r=n.stateNode}if(!r)throw Error(w(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var u=l.refs;i===null?delete u[o]:u[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(w(284));if(!n._owner)throw Error(w(290,e))}return e}function Ur(e,t){throw e=Object.prototype.toString.call(t),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Os(e){var t=e._init;return t(e._payload)}function sc(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function n(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function r(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function l(g,f){return g=Ct(g,f),g.index=0,g.sibling=null,g}function o(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function i(g){return e&&g.alternate===null&&(g.flags|=2),g}function u(g,f,m,S){return f===null||f.tag!==6?(f=Fo(m,g.mode,S),f.return=g,f):(f=l(f,m),f.return=g,f)}function s(g,f,m,S){var C=m.type;return C===qt?p(g,f,m.props.children,S,m.key):f!==null&&(f.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===st&&Os(C)===f.type)?(S=l(f,m.props),S.ref=zn(g,f,m),S.return=g,S):(S=nl(m.type,m.key,m.props,null,g.mode,S),S.ref=zn(g,f,m),S.return=g,S)}function a(g,f,m,S){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=Mo(m,g.mode,S),f.return=g,f):(f=l(f,m.children||[]),f.return=g,f)}function p(g,f,m,S,C){return f===null||f.tag!==7?(f=Tt(m,g.mode,S,C),f.return=g,f):(f=l(f,m),f.return=g,f)}function h(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Fo(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$typeof){case Fr:return m=nl(f.type,f.key,f.props,null,g.mode,m),m.ref=zn(g,null,f),m.return=g,m;case Xt:return f=Mo(f,g.mode,m),f.return=g,f;case st:var S=f._init;return h(g,S(f._payload),m)}if($n(f)||Pn(f))return f=Tt(f,g.mode,m,null),f.return=g,f;Ur(g,f)}return null}function d(g,f,m,S){var C=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return C!==null?null:u(g,f,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$typeof){case Fr:return m.key===C?s(g,f,m,S):null;case Xt:return m.key===C?a(g,f,m,S):null;case st:return C=m._init,d(g,f,C(m._payload),S)}if($n(m)||Pn(m))return C!==null?null:p(g,f,m,S,null);Ur(g,m)}return null}function c(g,f,m,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(m)||null,u(f,g,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$typeof){case Fr:return g=g.get(S.key===null?m:S.key)||null,s(f,g,S,C);case Xt:return g=g.get(S.key===null?m:S.key)||null,a(f,g,S,C);case st:var E=S._init;return c(g,f,m,E(S._payload),C)}if($n(S)||Pn(S))return g=g.get(m)||null,p(f,g,S,C,null);Ur(f,S)}return null}function v(g,f,m,S){for(var C=null,E=null,_=f,x=f=0,A=null;_!==null&&x<m.length;x++){_.index>x?(A=_,_=null):A=_.sibling;var N=d(g,_,m[x],S);if(N===null){_===null&&(_=A);break}e&&_&&N.alternate===null&&t(g,_),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N,_=A}if(x===m.length)return n(g,_),j&&zt(g,x),C;if(_===null){for(;x<m.length;x++)_=h(g,m[x],S),_!==null&&(f=o(_,f,x),E===null?C=_:E.sibling=_,E=_);return j&&zt(g,x),C}for(_=r(g,_);x<m.length;x++)A=c(_,g,x,m[x],S),A!==null&&(e&&A.alternate!==null&&_.delete(A.key===null?x:A.key),f=o(A,f,x),E===null?C=A:E.sibling=A,E=A);return e&&_.forEach(function(M){return t(g,M)}),j&&zt(g,x),C}function y(g,f,m,S){var C=Pn(m);if(typeof C!="function")throw Error(w(150));if(m=C.call(m),m==null)throw Error(w(151));for(var E=C=null,_=f,x=f=0,A=null,N=m.next();_!==null&&!N.done;x++,N=m.next()){_.index>x?(A=_,_=null):A=_.sibling;var M=d(g,_,N.value,S);if(M===null){_===null&&(_=A);break}e&&_&&M.alternate===null&&t(g,_),f=o(M,f,x),E===null?C=M:E.sibling=M,E=M,_=A}if(N.done)return n(g,_),j&&zt(g,x),C;if(_===null){for(;!N.done;x++,N=m.next())N=h(g,N.value,S),N!==null&&(f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return j&&zt(g,x),C}for(_=r(g,_);!N.done;x++,N=m.next())N=c(_,g,x,N.value,S),N!==null&&(e&&N.alternate!==null&&_.delete(N.key===null?x:N.key),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return e&&_.forEach(function(T){return t(g,T)}),j&&zt(g,x),C}function k(g,f,m,S){if(typeof m=="object"&&m!==null&&m.type===qt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$typeof){case Fr:e:{for(var C=m.key,E=f;E!==null;){if(E.key===C){if(C=m.type,C===qt){if(E.tag===7){n(g,E.sibling),f=l(E,m.props.children),f.return=g,g=f;break e}}else if(E.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===st&&Os(C)===E.type){n(g,E.sibling),f=l(E,m.props),f.ref=zn(g,E,m),f.return=g,g=f;break e}n(g,E);break}else t(g,E);E=E.sibling}m.type===qt?(f=Tt(m.props.children,g.mode,S,m.key),f.return=g,g=f):(S=nl(m.type,m.key,m.props,null,g.mode,S),S.ref=zn(g,f,m),S.return=g,g=S)}return i(g);case Xt:e:{for(E=m.key;f!==null;){if(f.key===E)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(g,f.sibling),f=l(f,m.children||[]),f.return=g,g=f;break e}else{n(g,f);break}else t(g,f);f=f.sibling}f=Mo(m,g.mode,S),f.return=g,g=f}return i(g);case st:return E=m._init,k(g,f,E(m._payload),S)}if($n(m))return v(g,f,m,S);if(Pn(m))return y(g,f,m,S);Ur(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(g,f.sibling),f=l(f,m),f.return=g,g=f):(n(g,f),f=Fo(m,g.mode,S),f.return=g,g=f),i(g)):n(g,f)}return k}var hn=sc(!0),ac=sc(!1),hl=Et(null),vl=null,rn=null,ji=null;function Bi(){ji=rn=vl=null}function Ui(e){var t=hl.current;H(hl),e._currentValue=t}function oi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function fn(e,t){vl=e,ji=rn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(de=!0),e.firstContext=null)}function Me(e){var t=e._currentValue;if(ji!==e)if(e={context:e,memoizedValue:t,next:null},rn===null){if(vl===null)throw Error(w(308));rn=e,vl.dependencies={lanes:0,firstContext:e}}else rn=rn.next=e;return t}var Vt=null;function Gi(e){Vt===null?Vt=[e]:Vt.push(e)}function cc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Gi(t)):(n.next=l.next,l.next=n),t.interleaved=n,tt(e,r)}function tt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var at=!1;function Wi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Je(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(L&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,tt(e,n)}return l=r.interleaved,l===null?(t.next=t,Gi(r)):(t.next=l.next,l.next=t),r.interleaved=t,tt(e,n)}function Yr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ii(e,n)}}function Hs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function yl(e,t,n,r){var l=e.updateQueue;at=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var s=u,a=s.next;s.next=null,i===null?o=a:i.next=a,i=s;var p=e.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==i&&(u===null?p.firstBaseUpdate=a:u.next=a,p.lastBaseUpdate=s))}if(o!==null){var h=l.baseState;i=0,p=a=s=null,u=o;do{var d=u.lane,c=u.eventTime;if((r&d)===d){p!==null&&(p=p.next={eventTime:c,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var v=e,y=u;switch(d=t,c=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){h=v.call(c,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,d=typeof v=="function"?v.call(c,h,d):v,d==null)break e;h=G({},h,d);break e;case 2:at=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,d=l.effects,d===null?l.effects=[u]:d.push(u))}else c={eventTime:c,lane:d,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(a=p=c,s=h):p=p.next=c,i|=d;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;d=u,u=d.next,d.next=null,l.lastBaseUpdate=d,l.shared.pending=null}}while(!0);if(p===null&&(s=h),l.baseState=s,l.firstBaseUpdate=a,l.lastBaseUpdate=p,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);jt|=i,e.lanes=i,e.memoizedState=h}}function As(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(w(191,l));l.call(r)}}}var pr={},Ke=Et(pr),or=Et(pr),ir=Et(pr);function Dt(e){if(e===pr)throw Error(w(174));return e}function Qi(e,t){switch($(ir,t),$(or,e),$(Ke,pr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ho(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ho(t,e)}H(Ke),$(Ke,t)}function vn(){H(Ke),H(or),H(ir)}function dc(e){Dt(ir.current);var t=Dt(Ke.current),n=Ho(t,e.type);t!==n&&($(or,e),$(Ke,n))}function Ki(e){or.current===e&&(H(Ke),H(or))}var B=Et(0);function Sl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=[];function Xi(){for(var e=0;e<_o.length;e++)_o[e]._workInProgressVersionPrimary=null;_o.length=0}var Zr=rt.ReactCurrentDispatcher,Ro=rt.ReactCurrentBatchConfig,At=0,U=null,X=null,Y=null,wl=!1,Gn=!1,ur=0,Rg=0;function ne(){throw Error(w(321))}function qi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!He(e[n],t[n]))return!1;return!0}function Yi(e,t,n,r,l,o){if(At=o,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Zr.current=e===null||e.memoizedState===null?Pg:Fg,e=n(r,l),Gn){o=0;do{if(Gn=!1,ur=0,25<=o)throw Error(w(301));o+=1,Y=X=null,t.updateQueue=null,Zr.current=Mg,e=n(r,l)}while(Gn)}if(Zr.current=Cl,t=X!==null&&X.next!==null,At=0,Y=X=U=null,wl=!1,t)throw Error(w(300));return e}function Zi(){var e=ur!==0;return ur=0,e}function Ge(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Y===null?U.memoizedState=Y=e:Y=Y.next=e,Y}function Ie(){if(X===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=Y===null?U.memoizedState:Y.next;if(t!==null)Y=t,X=e;else{if(e===null)throw Error(w(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},Y===null?U.memoizedState=Y=e:Y=Y.next=e}return Y}function sr(e,t){return typeof t=="function"?t(e):t}function ko(e){var t=Ie(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=X,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var u=i=null,s=null,a=o;do{var p=a.lane;if((At&p)===p)s!==null&&(s=s.next={lane:0,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null}),r=a.hasEagerState?a.eagerState:e(r,a.action);else{var h={lane:p,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null};s===null?(u=s=h,i=r):s=s.next=h,U.lanes|=p,jt|=p}a=a.next}while(a!==null&&a!==o);s===null?i=r:s.next=u,He(r,t.memoizedState)||(de=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,U.lanes|=o,jt|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Eo(e){var t=Ie(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);He(o,t.memoizedState)||(de=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function gc(){}function pc(e,t){var n=U,r=Ie(),l=t(),o=!He(r.memoizedState,l);if(o&&(r.memoizedState=l,de=!0),r=r.queue,Ji(vc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Y!==null&&Y.memoizedState.tag&1){if(n.flags|=2048,ar(9,hc.bind(null,n,r,l,t),void 0,null),Z===null)throw Error(w(349));(At&30)!==0||mc(n,t,l)}return l}function mc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hc(e,t,n,r){t.value=n,t.getSnapshot=r,yc(t)&&Sc(e)}function vc(e,t,n){return n(function(){yc(t)&&Sc(e)})}function yc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!He(e,n)}catch(r){return!0}}function Sc(e){var t=tt(e,1);t!==null&&Oe(t,e,1,-1)}function js(e){var t=Ge();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sr,lastRenderedState:e},t.queue=e,e=e.dispatch=xg.bind(null,U,e),[t.memoizedState,e]}function ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wc(){return Ie().memoizedState}function Jr(e,t,n,r){var l=Ge();U.flags|=e,l.memoizedState=ar(1|t,n,void 0,r===void 0?null:r)}function Ll(e,t,n,r){var l=Ie();r=r===void 0?null:r;var o=void 0;if(X!==null){var i=X.memoizedState;if(o=i.destroy,r!==null&&qi(r,i.deps)){l.memoizedState=ar(t,n,o,r);return}}U.flags|=e,l.memoizedState=ar(1|t,n,o,r)}function Bs(e,t){return Jr(8390656,8,e,t)}function Ji(e,t){return Ll(2048,8,e,t)}function Cc(e,t){return Ll(4,2,e,t)}function _c(e,t){return Ll(4,4,e,t)}function Rc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function kc(e,t,n){return n=n!=null?n.concat([e]):null,Ll(4,4,Rc.bind(null,t,e),n)}function bi(){}function Ec(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Pc(e,t,n){return(At&21)===0?(e.baseState&&(e.baseState=!1,de=!0),e.memoizedState=n):(He(n,t)||(n=Na(),U.lanes|=n,jt|=n,e.baseState=!0),t)}function kg(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=Ro.transition;Ro.transition={};try{e(!1),t()}finally{V=n,Ro.transition=r}}function Fc(){return Ie().memoizedState}function Eg(e,t,n){var r=wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Mc(e))Ic(t,n);else if(n=cc(e,t,n,r),n!==null){var l=ae();Oe(n,e,r,l),zc(n,t,r)}}function xg(e,t,n){var r=wt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mc(e))Ic(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,u=o(i,n);if(l.hasEagerState=!0,l.eagerState=u,He(u,i)){var s=t.interleaved;s===null?(l.next=l,Gi(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch(a){}finally{}n=cc(e,t,l,r),n!==null&&(l=ae(),Oe(n,e,r,l),zc(n,t,r))}}function Mc(e){var t=e.alternate;return e===U||t!==null&&t===U}function Ic(e,t){Gn=wl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function zc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ii(e,n)}}var Cl={readContext:Me,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},Pg={readContext:Me,useCallback:function(e,t){return Ge().memoizedState=[e,t===void 0?null:t],e},useContext:Me,useEffect:Bs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4194308,4,Rc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jr(4,2,e,t)},useMemo:function(e,t){var n=Ge();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ge();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Eg.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Ge();return e={current:e},t.memoizedState=e},useState:js,useDebugValue:bi,useDeferredValue:function(e){return Ge().memoizedState=e},useTransition:function(){var e=js(!1),t=e[0];return e=kg.bind(null,e[1]),Ge().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=U,l=Ge();if(j){if(n===void 0)throw Error(w(407));n=n()}else{if(n=t(),Z===null)throw Error(w(349));(At&30)!==0||mc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Bs(vc.bind(null,r,o,e),[e]),r.flags|=2048,ar(9,hc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ge(),t=Z.identifierPrefix;if(j){var n=Ze,r=Ye;n=(r&~(1<<32-Te(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ur++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Rg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Fg={readContext:Me,useCallback:Ec,useContext:Me,useEffect:Ji,useImperativeHandle:kc,useInsertionEffect:Cc,useLayoutEffect:_c,useMemo:xc,useReducer:ko,useRef:wc,useState:function(){return ko(sr)},useDebugValue:bi,useDeferredValue:function(e){var t=Ie();return Pc(t,X.memoizedState,e)},useTransition:function(){var e=ko(sr)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:pc,useId:Fc,unstable_isNewReconciler:!1},Mg={readContext:Me,useCallback:Ec,useContext:Me,useEffect:Ji,useImperativeHandle:kc,useInsertionEffect:Cc,useLayoutEffect:_c,useMemo:xc,useReducer:Eo,useRef:wc,useState:function(){return Eo(sr)},useDebugValue:bi,useDeferredValue:function(e){var t=Ie();return X===null?t.memoizedState=e:Pc(t,X.memoizedState,e)},useTransition:function(){var e=Eo(sr)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:pc,useId:Fc,unstable_isNewReconciler:!1};function Ve(e,t){if(e&&e.defaultProps){t=G({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ii(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:G({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vl={isMounted:function(e){return(e=e._reactInternals)?Gt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ae(),l=wt(e),o=Je(r,l);o.payload=t,n!=null&&(o.callback=n),t=yt(e,o,l),t!==null&&(Oe(t,e,l,r),Yr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ae(),l=wt(e),o=Je(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=yt(e,o,l),t!==null&&(Oe(t,e,l,r),Yr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ae(),r=wt(e),l=Je(n,r);l.tag=2,t!=null&&(l.callback=t),t=yt(e,l,r),t!==null&&(Oe(t,e,r,n),Yr(t,e,r))}};function Us(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!tr(n,r)||!tr(l,o):!0}function Nc(e,t,n){var r=!1,l=Rt,o=t.contextType;return typeof o=="object"&&o!==null?o=Me(o):(l=pe(t)?Ot:oe.current,r=t.contextTypes,o=(r=r!=null)?pn(e,l):Rt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Vl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Gs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vl.enqueueReplaceState(t,t.state,null)}function ui(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Wi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=Me(o):(o=pe(t)?Ot:oe.current,l.context=pn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ii(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Vl.enqueueReplaceState(l,l.state,null),yl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function yn(e,t){try{var n="",r=t;do n+=od(r),r=r.return;while(r);var l=n}catch(o){l=\`
Error generating stack: \`+o.message+\`
\`+o.stack}return{value:e,source:t,stack:l,digest:null}}function xo(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function si(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ig=typeof WeakMap=="function"?WeakMap:Map;function Lc(e,t,n){n=Je(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Rl||(Rl=!0,yi=r),si(e,t)},n}function Vc(e,t,n){n=Je(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){si(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){si(e,t),typeof r!="function"&&(St===null?St=new Set([this]):St.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ws(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ig;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Gg.bind(null,e,t,n),t.then(e,e))}function Qs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ks(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Je(-1,1),t.tag=2,yt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var zg=rt.ReactCurrentOwner,de=!1;function se(e,t,n,r){t.child=e===null?ac(t,null,n,r):hn(t,e.child,n,r)}function Xs(e,t,n,r,l){n=n.render;var o=t.ref;return fn(t,l),r=Yi(e,t,n,r,o,l),n=Zi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,nt(e,t,l)):(j&&n&&Oi(t),t.flags|=1,se(e,t,r,l),t.child)}function qs(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!uu(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Dc(e,t,o,r,l)):(e=nl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:tr,n(i,r)&&e.ref===t.ref)return nt(e,t,l)}return t.flags|=1,e=Ct(o,r),e.ref=t.ref,e.return=t,t.child=e}function Dc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(tr(o,r)&&e.ref===t.ref)if(de=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(de=!0);else return t.lanes=e.lanes,nt(e,t,l)}return ai(e,t,n,r,l)}function $c(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(on,he),he|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(on,he),he|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,$(on,he),he|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,$(on,he),he|=r;return se(e,t,l,n),t.child}function Tc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ai(e,t,n,r,l){var o=pe(n)?Ot:oe.current;return o=pn(t,o),fn(t,l),n=Yi(e,t,n,r,o,l),r=Zi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,nt(e,t,l)):(j&&r&&Oi(t),t.flags|=1,se(e,t,n,l),t.child)}function Ys(e,t,n,r,l){if(pe(n)){var o=!0;gl(t)}else o=!1;if(fn(t,l),t.stateNode===null)br(e,t),Nc(t,n,r),ui(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var s=i.context,a=n.contextType;typeof a=="object"&&a!==null?a=Me(a):(a=pe(n)?Ot:oe.current,a=pn(t,a));var p=n.getDerivedStateFromProps,h=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||s!==a)&&Gs(t,i,r,a),at=!1;var d=t.memoizedState;i.state=d,yl(t,r,i,l),s=t.memoizedState,u!==r||d!==s||ge.current||at?(typeof p=="function"&&(ii(t,n,p,r),s=t.memoizedState),(u=at||Us(t,n,u,r,d,s,a))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=a,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,fc(e,t),u=t.memoizedProps,a=t.type===t.elementType?u:Ve(t.type,u),i.props=a,h=t.pendingProps,d=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Me(s):(s=pe(n)?Ot:oe.current,s=pn(t,s));var c=n.getDerivedStateFromProps;(p=typeof c=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==h||d!==s)&&Gs(t,i,r,s),at=!1,d=t.memoizedState,i.state=d,yl(t,r,i,l);var v=t.memoizedState;u!==h||d!==v||ge.current||at?(typeof c=="function"&&(ii(t,n,c,r),v=t.memoizedState),(a=at||Us(t,n,a,r,d,v,s)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),i.props=r,i.state=v,i.context=s,r=a):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return ci(e,t,n,r,o,l)}function ci(e,t,n,r,l,o){Tc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Ds(t,n,!1),nt(e,t,o);r=t.stateNode,zg.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=hn(t,e.child,null,o),t.child=hn(t,null,u,o)):se(e,t,u,o),t.memoizedState=r.state,l&&Ds(t,n,!0),t.child}function Oc(e){var t=e.stateNode;t.pendingContext?Vs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Vs(e,t.context,!1),Qi(e,t.containerInfo)}function Zs(e,t,n,r,l){return mn(),Ai(l),t.flags|=256,se(e,t,n,r),t.child}var fi={dehydrated:null,treeContext:null,retryLane:0};function di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hc(e,t,n){var r=t.pendingProps,l=B.current,o=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),$(B,l&1),e===null)return li(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Tl(i,r,0,null),e=Tt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=di(n),t.memoizedState=fi,e):eu(t,i));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return Ng(e,t,i,r,u,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,u=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Ct(l,s),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?o=Ct(u,o):(o=Tt(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?di(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=fi,r}return o=e.child,e=o.sibling,r=Ct(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function eu(e,t){return t=Tl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gr(e,t,n,r){return r!==null&&Ai(r),hn(t,e.child,null,n),e=eu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ng(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=xo(Error(w(422))),Gr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Tl({mode:"visible",children:r.children},l,0,null),o=Tt(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&hn(t,e.child,null,i),t.child.memoizedState=di(i),t.memoizedState=fi,o);if((t.mode&1)===0)return Gr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,o=Error(w(419)),r=xo(o,r,void 0),Gr(e,t,i,r)}if(u=(i&e.childLanes)!==0,de||u){if(r=Z,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,tt(e,l),Oe(r,e,l,-1))}return iu(),r=xo(Error(w(421))),Gr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Wg.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,ve=vt(l.nextSibling),ye=t,j=!0,$e=null,e!==null&&(Ee[xe++]=Ye,Ee[xe++]=Ze,Ee[xe++]=Ht,Ye=e.id,Ze=e.overflow,Ht=t),t=eu(t,r.children),t.flags|=4096,t)}function Js(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),oi(e.return,t,n)}function Po(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Ac(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(se(e,t,r.children,n),r=B.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Js(e,n,t);else if(e.tag===19)Js(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if($(B,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Sl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Po(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Sl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Po(t,!0,n,null,o);break;case"together":Po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function br(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function nt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),jt|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(w(153));if(t.child!==null){for(e=t.child,n=Ct(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ct(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lg(e,t,n){switch(t.tag){case 3:Oc(t),mn();break;case 5:dc(t);break;case 1:pe(t.type)&&gl(t);break;case 4:Qi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;$(hl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?($(B,B.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Hc(e,t,n):($(B,B.current&1),e=nt(e,t,n),e!==null?e.sibling:null);$(B,B.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Ac(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),$(B,B.current),r)break;return null;case 22:case 23:return t.lanes=0,$c(e,t,n)}return nt(e,t,n)}var jc,gi,Bc,Uc;jc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};gi=function(){};Bc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Dt(Ke.current);var o=null;switch(n){case"input":l=Do(e,l),r=Do(e,r),o=[];break;case"select":l=G({},l,{value:void 0}),r=G({},r,{value:void 0}),o=[];break;case"textarea":l=Oo(e,l),r=Oo(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fl)}Ao(n,r);var i;n=null;for(a in l)if(!r.hasOwnProperty(a)&&l.hasOwnProperty(a)&&l[a]!=null)if(a==="style"){var u=l[a];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else a!=="dangerouslySetInnerHTML"&&a!=="children"&&a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Xn.hasOwnProperty(a)?o||(o=[]):(o=o||[]).push(a,null));for(a in r){var s=r[a];if(u=l!=null?l[a]:void 0,r.hasOwnProperty(a)&&s!==u&&(s!=null||u!=null))if(a==="style")if(u){for(i in u)!u.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&u[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(o||(o=[]),o.push(a,n)),n=s;else a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,u=u?u.__html:void 0,s!=null&&u!==s&&(o=o||[]).push(a,s)):a==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(a,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&(Xn.hasOwnProperty(a)?(s!=null&&a==="onScroll"&&O("scroll",e),o||u===s||(o=[])):(o=o||[]).push(a,s))}n&&(o=o||[]).push("style",n);var a=o;(t.updateQueue=a)&&(t.flags|=4)}};Uc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Nn(e,t){if(!j)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vg(e,t,n){var r=t.pendingProps;switch(Hi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return pe(t.type)&&dl(),re(t),null;case 3:return r=t.stateNode,vn(),H(ge),H(oe),Xi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Br(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,$e!==null&&(Ci($e),$e=null))),gi(e,t),re(t),null;case 5:Ki(t);var l=Dt(ir.current);if(n=t.type,e!==null&&t.stateNode!=null)Bc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(w(166));return re(t),null}if(e=Dt(Ke.current),Br(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[We]=t,r[lr]=o,e=(t.mode&1)!==0,n){case"dialog":O("cancel",r),O("close",r);break;case"iframe":case"object":case"embed":O("load",r);break;case"video":case"audio":for(l=0;l<On.length;l++)O(On[l],r);break;case"source":O("error",r);break;case"img":case"image":case"link":O("error",r),O("load",r);break;case"details":O("toggle",r);break;case"input":is(r,o),O("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},O("invalid",r);break;case"textarea":ss(r,o),O("invalid",r)}Ao(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="children"?typeof u=="string"?r.textContent!==u&&(o.suppressHydrationWarning!==!0&&jr(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(o.suppressHydrationWarning!==!0&&jr(r.textContent,u,e),l=["children",""+u]):Xn.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&O("scroll",r)}switch(n){case"input":Mr(r),us(r,o,!0);break;case"textarea":Mr(r),as(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=fl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=va(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[We]=t,e[lr]=r,jc(e,t,!1,!1),t.stateNode=e;e:{switch(i=jo(n,r),n){case"dialog":O("cancel",e),O("close",e),l=r;break;case"iframe":case"object":case"embed":O("load",e),l=r;break;case"video":case"audio":for(l=0;l<On.length;l++)O(On[l],e);l=r;break;case"source":O("error",e),l=r;break;case"img":case"image":case"link":O("error",e),O("load",e),l=r;break;case"details":O("toggle",e),l=r;break;case"input":is(e,r),l=Do(e,r),O("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=G({},r,{value:void 0}),O("invalid",e);break;case"textarea":ss(e,r),l=Oo(e,r),O("invalid",e);break;default:l=r}Ao(n,l),u=l;for(o in u)if(u.hasOwnProperty(o)){var s=u[o];o==="style"?wa(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ya(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&qn(e,s):typeof s=="number"&&qn(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Xn.hasOwnProperty(o)?s!=null&&o==="onScroll"&&O("scroll",e):s!=null&&ki(e,o,s,i))}switch(n){case"input":Mr(e),us(e,r,!1);break;case"textarea":Mr(e),as(e);break;case"option":r.value!=null&&e.setAttribute("value",""+_t(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?un(e,!!r.multiple,o,!1):r.defaultValue!=null&&un(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=fl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)Uc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(w(166));if(n=Dt(ir.current),Dt(Ke.current),Br(t)){if(r=t.stateNode,n=t.memoizedProps,r[We]=t,(o=r.nodeValue!==n)&&(e=ye,e!==null))switch(e.tag){case 3:jr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&jr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[We]=t,t.stateNode=r}return re(t),null;case 13:if(H(B),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(j&&ve!==null&&(t.mode&1)!==0&&(t.flags&128)===0)uc(),mn(),t.flags|=98560,o=!1;else if(o=Br(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(w(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(w(317));o[We]=t}else mn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;re(t),o=!1}else $e!==null&&(Ci($e),$e=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(B.current&1)!==0?q===0&&(q=3):iu())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return vn(),gi(e,t),e===null&&nr(t.stateNode.containerInfo),re(t),null;case 10:return Ui(t.type._context),re(t),null;case 17:return pe(t.type)&&dl(),re(t),null;case 19:if(H(B),o=t.memoizedState,o===null)return re(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Nn(o,!1);else{if(q!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Sl(e),i!==null){for(t.flags|=128,Nn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(B,B.current&1|2),t.child}e=e.sibling}o.tail!==null&&Q()>Sn&&(t.flags|=128,r=!0,Nn(o,!1),t.lanes=4194304)}else{if(!r)if(e=Sl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Nn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!j)return re(t),null}else 2*Q()-o.renderingStartTime>Sn&&n!==1073741824&&(t.flags|=128,r=!0,Nn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Q(),t.sibling=null,n=B.current,$(B,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return ou(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(he&1073741824)!==0&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(w(156,t.tag))}function Dg(e,t){switch(Hi(t),t.tag){case 1:return pe(t.type)&&dl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return vn(),H(ge),H(oe),Xi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Ki(t),null;case 13:if(H(B),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(w(340));mn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(B),null;case 4:return vn(),null;case 10:return Ui(t.type._context),null;case 22:case 23:return ou(),null;case 24:return null;default:return null}}var Wr=!1,le=!1,$g=typeof WeakSet=="function"?WeakSet:Set,R=null;function ln(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){W(e,t,r)}else n.current=null}function pi(e,t,n){try{n()}catch(r){W(e,t,r)}}var bs=!1;function Tg(e,t){if(Zo=sl,e=Xa(),Ti(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch(S){n=null;break e}var i=0,u=-1,s=-1,a=0,p=0,h=e,d=null;t:for(;;){for(var c;h!==n||l!==0&&h.nodeType!==3||(u=i+l),h!==o||r!==0&&h.nodeType!==3||(s=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(c=h.firstChild)!==null;)d=h,h=c;for(;;){if(h===e)break t;if(d===n&&++a===l&&(u=i),d===o&&++p===r&&(s=i),(c=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=c}n=u===-1||s===-1?null:{start:u,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Jo={focusedElem:e,selectionRange:n},sl=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var v=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,k=v.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:Ve(t.type,y),k);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(S){W(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return v=bs,bs=!1,v}function Wn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&pi(t,n,o)}l=l.next}while(l!==r)}}function Dl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function mi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Gc(e){var t=e.alternate;t!==null&&(e.alternate=null,Gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[We],delete t[lr],delete t[ti],delete t[Sg],delete t[wg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wc(e){return e.tag===5||e.tag===3||e.tag===4}function ea(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function hi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fl));else if(r!==4&&(e=e.child,e!==null))for(hi(e,t,n),e=e.sibling;e!==null;)hi(e,t,n),e=e.sibling}function vi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(vi(e,t,n),e=e.sibling;e!==null;)vi(e,t,n),e=e.sibling}var J=null,De=!1;function ut(e,t,n){for(n=n.child;n!==null;)Qc(e,t,n),n=n.sibling}function Qc(e,t,n){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(Pl,n)}catch(u){}switch(n.tag){case 5:le||ln(n,t);case 6:var r=J,l=De;J=null,ut(e,t,n),J=r,De=l,J!==null&&(De?(e=J,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):J.removeChild(n.stateNode));break;case 18:J!==null&&(De?(e=J,n=n.stateNode,e.nodeType===8?wo(e.parentNode,n):e.nodeType===1&&wo(e,n),bn(e)):wo(J,n.stateNode));break;case 4:r=J,l=De,J=n.stateNode.containerInfo,De=!0,ut(e,t,n),J=r,De=l;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&pi(n,t,i),l=l.next}while(l!==r)}ut(e,t,n);break;case 1:if(!le&&(ln(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){W(n,t,u)}ut(e,t,n);break;case 21:ut(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,ut(e,t,n),le=r):ut(e,t,n);break;default:ut(e,t,n)}}function ta(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $g),t.forEach(function(r){var l=Qg.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Le(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:J=u.stateNode,De=!1;break e;case 3:J=u.stateNode.containerInfo,De=!0;break e;case 4:J=u.stateNode.containerInfo,De=!0;break e}u=u.return}if(J===null)throw Error(w(160));Qc(o,i,l),J=null,De=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(a){W(l,t,a)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Kc(t,e),t=t.sibling}function Kc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(t,e),Ue(e),r&4){try{Wn(3,e,e.return),Dl(3,e)}catch(y){W(e,e.return,y)}try{Wn(5,e,e.return)}catch(y){W(e,e.return,y)}}break;case 1:Le(t,e),Ue(e),r&512&&n!==null&&ln(n,n.return);break;case 5:if(Le(t,e),Ue(e),r&512&&n!==null&&ln(n,n.return),e.flags&32){var l=e.stateNode;try{qn(l,"")}catch(y){W(e,e.return,y)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,u=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{u==="input"&&o.type==="radio"&&o.name!=null&&ma(l,o),jo(u,i);var a=jo(u,o);for(i=0;i<s.length;i+=2){var p=s[i],h=s[i+1];p==="style"?wa(l,h):p==="dangerouslySetInnerHTML"?ya(l,h):p==="children"?qn(l,h):ki(l,p,h,a)}switch(u){case"input":$o(l,o);break;case"textarea":ha(l,o);break;case"select":var d=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var c=o.value;c!=null?un(l,!!o.multiple,c,!1):d!==!!o.multiple&&(o.defaultValue!=null?un(l,!!o.multiple,o.defaultValue,!0):un(l,!!o.multiple,o.multiple?[]:"",!1))}l[lr]=o}catch(y){W(e,e.return,y)}}break;case 6:if(Le(t,e),Ue(e),r&4){if(e.stateNode===null)throw Error(w(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(y){W(e,e.return,y)}}break;case 3:if(Le(t,e),Ue(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{bn(t.containerInfo)}catch(y){W(e,e.return,y)}break;case 4:Le(t,e),Ue(e);break;case 13:Le(t,e),Ue(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ru=Q())),r&4&&ta(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(le=(a=le)||p,Le(t,e),le=a):Le(t,e),Ue(e),r&8192){if(a=e.memoizedState!==null,(e.stateNode.isHidden=a)&&!p&&(e.mode&1)!==0)for(R=e,p=e.child;p!==null;){for(h=R=p;R!==null;){switch(d=R,c=d.child,d.tag){case 0:case 11:case 14:case 15:Wn(4,d,d.return);break;case 1:ln(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){r=d,n=d.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(y){W(r,n,y)}}break;case 5:ln(d,d.return);break;case 22:if(d.memoizedState!==null){ra(h);continue}}c!==null?(c.return=d,R=c):ra(h)}p=p.sibling}e:for(p=null,h=e;;){if(h.tag===5){if(p===null){p=h;try{l=h.stateNode,a?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(u=h.stateNode,s=h.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,u.style.display=Sa("display",i))}catch(y){W(e,e.return,y)}}}else if(h.tag===6){if(p===null)try{h.stateNode.nodeValue=a?"":h.memoizedProps}catch(y){W(e,e.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;p===h&&(p=null),h=h.return}p===h&&(p=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Le(t,e),Ue(e),r&4&&ta(e);break;case 21:break;default:Le(t,e),Ue(e)}}function Ue(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wc(n)){var r=n;break e}n=n.return}throw Error(w(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(qn(l,""),r.flags&=-33);var o=ea(e);vi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,u=ea(e);hi(e,u,i);break;default:throw Error(w(161))}}catch(s){W(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Og(e,t,n){R=e,Xc(e,t,n)}function Xc(e,t,n){for(var r=(e.mode&1)!==0;R!==null;){var l=R,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Wr;if(!i){var u=l.alternate,s=u!==null&&u.memoizedState!==null||le;u=Wr;var a=le;if(Wr=i,(le=s)&&!a)for(R=l;R!==null;)i=R,s=i.child,i.tag===22&&i.memoizedState!==null?la(l):s!==null?(s.return=i,R=s):la(l);for(;o!==null;)R=o,Xc(o,t,n),o=o.sibling;R=l,Wr=u,le=a}na(e,t,n)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,R=o):na(e,t,n)}}function na(e){for(;R!==null;){var t=R;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:le||Dl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Ve(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&As(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}As(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var a=t.alternate;if(a!==null){var p=a.memoizedState;if(p!==null){var h=p.dehydrated;h!==null&&bn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}le||t.flags&512&&mi(t)}catch(d){W(t,t.return,d)}}if(t===e){R=null;break}if(n=t.sibling,n!==null){n.return=t.return,R=n;break}R=t.return}}function ra(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var n=t.sibling;if(n!==null){n.return=t.return,R=n;break}R=t.return}}function la(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Dl(4,t)}catch(s){W(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){W(t,l,s)}}var o=t.return;try{mi(t)}catch(s){W(t,o,s)}break;case 5:var i=t.return;try{mi(t)}catch(s){W(t,i,s)}}}catch(s){W(t,t.return,s)}if(t===e){R=null;break}var u=t.sibling;if(u!==null){u.return=t.return,R=u;break}R=t.return}}var Hg=Math.ceil,_l=rt.ReactCurrentDispatcher,tu=rt.ReactCurrentOwner,Fe=rt.ReactCurrentBatchConfig,L=0,Z=null,K=null,b=0,he=0,on=Et(0),q=0,cr=null,jt=0,$l=0,nu=0,Qn=null,fe=null,ru=0,Sn=1/0,Xe=null,Rl=!1,yi=null,St=null,Qr=!1,gt=null,kl=0,Kn=0,Si=null,el=-1,tl=0;function ae(){return(L&6)!==0?Q():el!==-1?el:el=Q()}function wt(e){return(e.mode&1)===0?1:(L&2)!==0&&b!==0?b&-b:_g.transition!==null?(tl===0&&(tl=Na()),tl):(e=V,e!==0||(e=window.event,e=e===void 0?16:Ha(e.type)),e)}function Oe(e,t,n,r){if(50<Kn)throw Kn=0,Si=null,Error(w(185));fr(e,n,r),((L&2)===0||e!==Z)&&(e===Z&&((L&2)===0&&($l|=n),q===4&&ft(e,b)),me(e,r),n===1&&L===0&&(t.mode&1)===0&&(Sn=Q()+500,Nl&&xt()))}function me(e,t){var n=e.callbackNode;kd(e,t);var r=ul(e,e===Z?b:0);if(r===0)n!==null&&ds(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ds(n),t===1)e.tag===0?Cg(oa.bind(null,e)):lc(oa.bind(null,e)),vg(function(){(L&6)===0&&xt()}),n=null;else{switch(La(r)){case 1:n=Mi;break;case 4:n=Ia;break;case 16:n=il;break;case 536870912:n=za;break;default:n=il}n=nf(n,qc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qc(e,t){if(el=-1,tl=0,(L&6)!==0)throw Error(w(327));var n=e.callbackNode;if(dn()&&e.callbackNode!==n)return null;var r=ul(e,e===Z?b:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=El(e,r);else{t=r;var l=L;L|=2;var o=Zc();(Z!==e||b!==t)&&(Xe=null,Sn=Q()+500,$t(e,t));do try{Bg();break}catch(u){Yc(e,u)}while(!0);Bi(),_l.current=o,L=l,K!==null?t=0:(Z=null,b=0,t=q)}if(t!==0){if(t===2&&(l=Qo(e),l!==0&&(r=l,t=wi(e,l))),t===1)throw n=cr,$t(e,0),ft(e,r),me(e,Q()),n;if(t===6)ft(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Ag(l)&&(t=El(e,r),t===2&&(o=Qo(e),o!==0&&(r=o,t=wi(e,o))),t===1))throw n=cr,$t(e,0),ft(e,r),me(e,Q()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(w(345));case 2:Nt(e,fe,Xe);break;case 3:if(ft(e,r),(r&130023424)===r&&(t=ru+500-Q(),10<t)){if(ul(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ae(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ei(Nt.bind(null,e,fe,Xe),t);break}Nt(e,fe,Xe);break;case 4:if(ft(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-Te(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Hg(r/1960))-r,10<r){e.timeoutHandle=ei(Nt.bind(null,e,fe,Xe),r);break}Nt(e,fe,Xe);break;case 5:Nt(e,fe,Xe);break;default:throw Error(w(329))}}}return me(e,Q()),e.callbackNode===n?qc.bind(null,e):null}function wi(e,t){var n=Qn;return e.current.memoizedState.isDehydrated&&($t(e,t).flags|=256),e=El(e,t),e!==2&&(t=fe,fe=n,t!==null&&Ci(t)),e}function Ci(e){fe===null?fe=e:fe.push.apply(fe,e)}function Ag(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!He(o(),l))return!1}catch(i){return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ft(e,t){for(t&=~nu,t&=~$l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Te(t),r=1<<n;e[n]=-1,t&=~r}}function oa(e){if((L&6)!==0)throw Error(w(327));dn();var t=ul(e,0);if((t&1)===0)return me(e,Q()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=Qo(e);r!==0&&(t=r,n=wi(e,r))}if(n===1)throw n=cr,$t(e,0),ft(e,t),me(e,Q()),n;if(n===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Nt(e,fe,Xe),me(e,Q()),null}function lu(e,t){var n=L;L|=1;try{return e(t)}finally{L=n,L===0&&(Sn=Q()+500,Nl&&xt())}}function Bt(e){gt!==null&&gt.tag===0&&(L&6)===0&&dn();var t=L;L|=1;var n=Fe.transition,r=V;try{if(Fe.transition=null,V=1,e)return e()}finally{V=r,Fe.transition=n,L=t,(L&6)===0&&xt()}}function ou(){he=on.current,H(on)}function $t(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,hg(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Hi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&dl();break;case 3:vn(),H(ge),H(oe),Xi();break;case 5:Ki(r);break;case 4:vn();break;case 13:H(B);break;case 19:H(B);break;case 10:Ui(r.type._context);break;case 22:case 23:ou()}n=n.return}if(Z=e,K=e=Ct(e.current,null),b=he=t,q=0,cr=null,nu=$l=jt=0,fe=Qn=null,Vt!==null){for(t=0;t<Vt.length;t++)if(n=Vt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Vt=null}return e}function Yc(e,t){do{var n=K;try{if(Bi(),Zr.current=Cl,wl){for(var r=U.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}wl=!1}if(At=0,Y=X=U=null,Gn=!1,ur=0,tu.current=null,n===null||n.return===null){q=1,cr=t,K=null;break}e:{var o=e,i=n.return,u=n,s=t;if(t=b,u.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var a=s,p=u,h=p.tag;if((p.mode&1)===0&&(h===0||h===11||h===15)){var d=p.alternate;d?(p.updateQueue=d.updateQueue,p.memoizedState=d.memoizedState,p.lanes=d.lanes):(p.updateQueue=null,p.memoizedState=null)}var c=Qs(i);if(c!==null){c.flags&=-257,Ks(c,i,u,o,t),c.mode&1&&Ws(o,a,t),t=c,s=a;var v=t.updateQueue;if(v===null){var y=new Set;y.add(s),t.updateQueue=y}else v.add(s);break e}else{if((t&1)===0){Ws(o,a,t),iu();break e}s=Error(w(426))}}else if(j&&u.mode&1){var k=Qs(i);if(k!==null){(k.flags&65536)===0&&(k.flags|=256),Ks(k,i,u,o,t),Ai(yn(s,u));break e}}o=s=yn(s,u),q!==4&&(q=2),Qn===null?Qn=[o]:Qn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Lc(o,s,t);Hs(o,g);break e;case 1:u=s;var f=o.type,m=o.stateNode;if((o.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(St===null||!St.has(m)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=Vc(o,u,t);Hs(o,S);break e}}o=o.return}while(o!==null)}bc(n)}catch(C){t=C,K===n&&n!==null&&(K=n=n.return);continue}break}while(!0)}function Zc(){var e=_l.current;return _l.current=Cl,e===null?Cl:e}function iu(){(q===0||q===3||q===2)&&(q=4),Z===null||(jt&268435455)===0&&($l&268435455)===0||ft(Z,b)}function El(e,t){var n=L;L|=2;var r=Zc();(Z!==e||b!==t)&&(Xe=null,$t(e,t));do try{jg();break}catch(l){Yc(e,l)}while(!0);if(Bi(),L=n,_l.current=r,K!==null)throw Error(w(261));return Z=null,b=0,q}function jg(){for(;K!==null;)Jc(K)}function Bg(){for(;K!==null&&!md();)Jc(K)}function Jc(e){var t=tf(e.alternate,e,he);e.memoizedProps=e.pendingProps,t===null?bc(e):K=t,tu.current=null}function bc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Vg(n,t,he),n!==null){K=n;return}}else{if(n=Dg(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{q=6,K=null;return}}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);q===0&&(q=5)}function Nt(e,t,n){var r=V,l=Fe.transition;try{Fe.transition=null,V=1,Ug(e,t,n,r)}finally{Fe.transition=l,V=r}return null}function Ug(e,t,n,r){do dn();while(gt!==null);if((L&6)!==0)throw Error(w(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Ed(e,o),e===Z&&(K=Z=null,b=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Qr||(Qr=!0,nf(il,function(){return dn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=Fe.transition,Fe.transition=null;var i=V;V=1;var u=L;L|=4,tu.current=null,Tg(e,n),Kc(n,e),fg(Jo),sl=!!Zo,Jo=Zo=null,e.current=n,Og(n,e,l),hd(),L=u,V=i,Fe.transition=o}else e.current=n;if(Qr&&(Qr=!1,gt=e,kl=l),o=e.pendingLanes,o===0&&(St=null),Sd(n.stateNode,r),me(e,Q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Rl)throw Rl=!1,e=yi,yi=null,e;return(kl&1)!==0&&e.tag!==0&&dn(),o=e.pendingLanes,(o&1)!==0?e===Si?Kn++:(Kn=0,Si=e):Kn=0,xt(),null}function dn(){if(gt!==null){var e=La(kl),t=Fe.transition,n=V;try{if(Fe.transition=null,V=16>e?16:e,gt===null)var r=!1;else{if(e=gt,gt=null,kl=0,(L&6)!==0)throw Error(w(331));var l=L;for(L|=4,R=e.current;R!==null;){var o=R,i=o.child;if((R.flags&16)!==0){var u=o.deletions;if(u!==null){for(var s=0;s<u.length;s++){var a=u[s];for(R=a;R!==null;){var p=R;switch(p.tag){case 0:case 11:case 15:Wn(8,p,o)}var h=p.child;if(h!==null)h.return=p,R=h;else for(;R!==null;){p=R;var d=p.sibling,c=p.return;if(Gc(p),p===a){R=null;break}if(d!==null){d.return=c,R=d;break}R=c}}}var v=o.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var k=y.sibling;y.sibling=null,y=k}while(y!==null)}}R=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,R=i;else e:for(;R!==null;){if(o=R,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Wn(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,R=g;break e}R=o.return}}var f=e.current;for(R=f;R!==null;){i=R;var m=i.child;if((i.subtreeFlags&2064)!==0&&m!==null)m.return=i,R=m;else e:for(i=f;R!==null;){if(u=R,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:Dl(9,u)}}catch(C){W(u,u.return,C)}if(u===i){R=null;break e}var S=u.sibling;if(S!==null){S.return=u.return,R=S;break e}R=u.return}}if(L=l,xt(),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(Pl,e)}catch(C){}r=!0}return r}finally{V=n,Fe.transition=t}}return!1}function ia(e,t,n){t=yn(n,t),t=Lc(e,t,1),e=yt(e,t,1),t=ae(),e!==null&&(fr(e,1,t),me(e,t))}function W(e,t,n){if(e.tag===3)ia(e,e,n);else for(;t!==null;){if(t.tag===3){ia(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(St===null||!St.has(r))){e=yn(n,e),e=Vc(t,e,1),t=yt(t,e,1),e=ae(),t!==null&&(fr(t,1,e),me(t,e));break}}t=t.return}}function Gg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ae(),e.pingedLanes|=e.suspendedLanes&n,Z===e&&(b&n)===n&&(q===4||q===3&&(b&130023424)===b&&500>Q()-ru?$t(e,0):nu|=n),me(e,t)}function ef(e,t){t===0&&((e.mode&1)===0?t=1:(t=Nr,Nr<<=1,(Nr&130023424)===0&&(Nr=4194304)));var n=ae();e=tt(e,t),e!==null&&(fr(e,t,n),me(e,n))}function Wg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ef(e,n)}function Qg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(t),ef(e,n)}var tf;tf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ge.current)de=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return de=!1,Lg(e,t,n);de=(e.flags&131072)!==0}else de=!1,j&&(t.flags&1048576)!==0&&oc(t,ml,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;br(e,t),e=t.pendingProps;var l=pn(t,oe.current);fn(t,n),l=Yi(null,t,r,e,l,n);var o=Zi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,pe(r)?(o=!0,gl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Wi(t),l.updater=Vl,t.stateNode=l,l._reactInternals=t,ui(t,r,e,n),t=ci(null,t,r,!0,o,n)):(t.tag=0,j&&o&&Oi(t),se(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(br(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Xg(r),e=Ve(r,e),l){case 0:t=ai(null,t,r,e,n);break e;case 1:t=Ys(null,t,r,e,n);break e;case 11:t=Xs(null,t,r,e,n);break e;case 14:t=qs(null,t,r,Ve(r.type,e),n);break e}throw Error(w(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ve(r,l),ai(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ve(r,l),Ys(e,t,r,l,n);case 3:e:{if(Oc(t),e===null)throw Error(w(387));r=t.pendingProps,o=t.memoizedState,l=o.element,fc(e,t),yl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=yn(Error(w(423)),t),t=Zs(e,t,r,n,l);break e}else if(r!==l){l=yn(Error(w(424)),t),t=Zs(e,t,r,n,l);break e}else for(ve=vt(t.stateNode.containerInfo.firstChild),ye=t,j=!0,$e=null,n=ac(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(mn(),r===l){t=nt(e,t,n);break e}se(e,t,r,n)}t=t.child}return t;case 5:return dc(t),e===null&&li(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,bo(r,l)?i=null:o!==null&&bo(r,o)&&(t.flags|=32),Tc(e,t),se(e,t,i,n),t.child;case 6:return e===null&&li(t),null;case 13:return Hc(e,t,n);case 4:return Qi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=hn(t,null,r,n):se(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ve(r,l),Xs(e,t,r,l,n);case 7:return se(e,t,t.pendingProps,n),t.child;case 8:return se(e,t,t.pendingProps.children,n),t.child;case 12:return se(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,$(hl,r._currentValue),r._currentValue=i,o!==null)if(He(o.value,i)){if(o.children===l.children&&!ge.current){t=nt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var u=o.dependencies;if(u!==null){i=o.child;for(var s=u.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=Je(-1,n&-n),s.tag=2;var a=o.updateQueue;if(a!==null){a=a.shared;var p=a.pending;p===null?s.next=s:(s.next=p.next,p.next=s),a.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),oi(o.return,n,t),u.lanes|=n;break}s=s.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(w(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),oi(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}se(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,fn(t,n),l=Me(l),r=r(l),t.flags|=1,se(e,t,r,n),t.child;case 14:return r=t.type,l=Ve(r,t.pendingProps),l=Ve(r.type,l),qs(e,t,r,l,n);case 15:return Dc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ve(r,l),br(e,t),t.tag=1,pe(r)?(e=!0,gl(t)):e=!1,fn(t,n),Nc(t,r,l),ui(t,r,l,n),ci(null,t,r,!0,e,n);case 19:return Ac(e,t,n);case 22:return $c(e,t,n)}throw Error(w(156,t.tag))};function nf(e,t){return Ma(e,t)}function Kg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,n,r){return new Kg(e,t,n,r)}function uu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xg(e){if(typeof e=="function")return uu(e)?1:0;if(e!=null){if(e=e.$typeof,e===xi)return 11;if(e===Pi)return 14}return 2}function Ct(e,t){var n=e.alternate;return n===null?(n=Pe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function nl(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")uu(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case qt:return Tt(n.children,l,o,t);case Ei:i=8,l|=8;break;case zo:return e=Pe(12,n,t,l|2),e.elementType=zo,e.lanes=o,e;case No:return e=Pe(13,n,t,l),e.elementType=No,e.lanes=o,e;case Lo:return e=Pe(19,n,t,l),e.elementType=Lo,e.lanes=o,e;case da:return Tl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$typeof){case ca:i=10;break e;case fa:i=9;break e;case xi:i=11;break e;case Pi:i=14;break e;case st:i=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return t=Pe(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Tt(e,t,n,r){return e=Pe(7,e,r,t),e.lanes=n,e}function Tl(e,t,n,r){return e=Pe(22,e,r,t),e.elementType=da,e.lanes=n,e.stateNode={isHidden:!1},e}function Fo(e,t,n){return e=Pe(6,e,null,t),e.lanes=n,e}function Mo(e,t,n){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qg(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fo(0),this.expirationTimes=fo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function su(e,t,n,r,l,o,i,u,s){return e=new qg(e,t,n,u,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Pe(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wi(o),e}function Yg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$typeof:Xt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rf(e){if(!e)return Rt;e=e._reactInternals;e:{if(Gt(e)!==e||e.tag!==1)throw Error(w(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(pe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(w(171))}if(e.tag===1){var n=e.type;if(pe(n))return rc(e,n,t)}return t}function lf(e,t,n,r,l,o,i,u,s){return e=su(n,r,!0,e,l,o,i,u,s),e.context=rf(null),n=e.current,r=ae(),l=wt(n),o=Je(r,l),o.callback=t!=null?t:null,yt(n,o,l),e.current.lanes=l,fr(e,l,r),me(e,r),e}function Ol(e,t,n,r){var l=t.current,o=ae(),i=wt(l);return n=rf(n),t.context===null?t.context=n:t.pendingContext=n,t=Je(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=yt(l,t,i),e!==null&&(Oe(e,l,i,o),Yr(e,l,i)),i}function xl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ua(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function au(e,t){ua(e,t),(e=e.alternate)&&ua(e,t)}function Zg(){return null}var of=typeof reportError=="function"?reportError:function(e){console.error(e)};function cu(e){this._internalRoot=e}Hl.prototype.render=cu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(w(409));Ol(e,t,null,null)};Hl.prototype.unmount=cu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Bt(function(){Ol(null,e,null,null)}),t[et]=null}};function Hl(e){this._internalRoot=e}Hl.prototype.unstable_scheduleHydration=function(e){if(e){var t=$a();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ct.length&&t!==0&&t<ct[n].priority;n++);ct.splice(n,0,e),n===0&&Oa(e)}};function fu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function sa(){}function Jg(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var a=xl(i);o.call(a)}}var i=lf(t,r,e,0,null,!1,!1,"",sa);return e._reactRootContainer=i,e[et]=i.current,nr(e.nodeType===8?e.parentNode:e),Bt(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var a=xl(s);u.call(a)}}var s=su(e,0,!1,null,null,!1,!1,"",sa);return e._reactRootContainer=s,e[et]=s.current,nr(e.nodeType===8?e.parentNode:e),Bt(function(){Ol(t,s,n,r)}),s}function jl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var u=l;l=function(){var s=xl(i);u.call(s)}}Ol(t,i,e,l)}else i=Jg(n,t,e,l,r);return xl(i)}Va=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Tn(t.pendingLanes);n!==0&&(Ii(t,n|1),me(t,Q()),(L&6)===0&&(Sn=Q()+500,xt()))}break;case 13:Bt(function(){var r=tt(e,1);if(r!==null){var l=ae();Oe(r,e,1,l)}}),au(e,1)}};zi=function(e){if(e.tag===13){var t=tt(e,134217728);if(t!==null){var n=ae();Oe(t,e,134217728,n)}au(e,134217728)}};Da=function(e){if(e.tag===13){var t=wt(e),n=tt(e,t);if(n!==null){var r=ae();Oe(n,e,t,r)}au(e,t)}};$a=function(){return V};Ta=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};Uo=function(e,t,n){switch(t){case"input":if($o(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=zl(r);if(!l)throw Error(w(90));pa(r),$o(r,l)}}}break;case"textarea":ha(e,n);break;case"select":t=n.value,t!=null&&un(e,!!n.multiple,t,!1)}};Ra=lu;ka=Bt;var bg={usingClientEntryPoint:!1,Events:[gr,bt,zl,Ca,_a,lu]},Ln={findFiberByHostInstance:Lt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ep={bundleType:Ln.bundleType,version:Ln.version,rendererPackageName:Ln.rendererPackageName,rendererConfig:Ln.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Pa(e),e===null?null:e.stateNode},findFiberByHostInstance:Ln.findFiberByHostInstance||Zg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&(Vn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Vn.isDisabled&&Vn.supportsFiber))try{Pl=Vn.inject(ep),Qe=Vn}catch(e){}var Vn;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bg;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fu(t))throw Error(w(200));return Yg(e,t,null,n)};Ce.createRoot=function(e,t){if(!fu(e))throw Error(w(299));var n=!1,r="",l=of;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=su(e,1,!1,null,null,n,!1,r,l),e[et]=t.current,nr(e.nodeType===8?e.parentNode:e),new cu(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=Pa(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return Bt(e)};Ce.hydrate=function(e,t,n){if(!Al(t))throw Error(w(200));return jl(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!fu(e))throw Error(w(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=of;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=lf(t,null,e,1,n!=null?n:null,l,!1,o,i),e[et]=t.current,nr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Hl(t)};Ce.render=function(e,t,n){if(!Al(t))throw Error(w(200));return jl(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Al(e))throw Error(w(40));return e._reactRootContainer?(Bt(function(){jl(null,null,e,!1,function(){e._reactRootContainer=null,e[et]=null})}),!0):!1};Ce.unstable_batchedUpdates=lu;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return jl(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var du=Mt((tm,af)=>{"use strict";function sf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sf)}catch(e){console.error(e)}}sf(),af.exports=uf()});var ff=Mt(gu=>{"use strict";var cf=du();gu.createRoot=cf.createRoot,gu.hydrateRoot=cf.hydrateRoot;var nm});var Re=yr(_r()),Mf=yr(ff()),If=yr(du());var vr=yr(_r(),1);function Pt(e,t){return typeof e=="function"?e(t):e}function _e(e,t){return n=>{t.setState(r=>({...r,[e]:Pt(n,r[e])}))}}function Wl(e){return e instanceof Function}function tp(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function np(e,t){let n=[],r=l=>{l.forEach(o=>{n.push(o);let i=t(o);i!=null&&i.length&&r(i)})};return r(e),n}function P(e,t,n){let r=[],l;return o=>{let i;n.key&&n.debug&&(i=Date.now());let u=e(o);if(!(u.length!==r.length||u.some((p,h)=>r[h]!==p)))return l;r=u;let a;if(n.key&&n.debug&&(a=Date.now()),l=t(...u),n==null||n.onChange==null||n.onChange(l),n.key&&n.debug&&n!=null&&n.debug()){let p=Math.round((Date.now()-i)*100)/100,h=Math.round((Date.now()-a)*100)/100,d=h/16,c=(v,y)=>{for(v=String(v);v.length<y;)v=" "+v;return v};console.info(\`%c\\u23F1 \${c(h,5)} /\${c(p,5)} ms\`,\`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(\${Math.max(0,Math.min(120-120*d,120))}deg 100% 31%);\`,n==null?void 0:n.key)}return l}}function F(e,t,n,r){return{debug:()=>{var l;return(l=e==null?void 0:e.debugAll)!=null?l:e[t]},key:!1,onChange:r}}function rp(e,t,n,r){let l=()=>{var i;return(i=o.getValue())!=null?i:e.options.renderFallbackValue},o={id:\`\${t.id}_\${n.id}\`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:l,getContext:P(()=>[e,n,t,o],(i,u,s,a)=>({table:i,column:u,row:s,cell:a,getValue:a.getValue,renderValue:a.renderValue}),F(e.options,"debugCells","cell.getContext"))};return e._features.forEach(i=>{i.createCell==null||i.createCell(o,n,t,e)},{}),o}function lp(e,t,n,r){var l,o;let u={...e._getDefaultColumnDef(),...t},s=u.accessorKey,a=(l=(o=u.id)!=null?o:s?typeof String.prototype.replaceAll=="function"?s.replaceAll(".","_"):s.replace(/\\./g,"_"):void 0)!=null?l:typeof u.header=="string"?u.header:void 0,p;if(u.accessorFn?p=u.accessorFn:s&&(s.includes(".")?p=d=>{let c=d;for(let y of s.split(".")){var v;c=(v=c)==null?void 0:v[y]}return c}:p=d=>d[u.accessorKey]),!a)throw new Error;let h={id:\`\${String(a)}\`,accessorFn:p,parent:r,depth:n,columnDef:u,columns:[],getFlatColumns:P(()=>[!0],()=>{var d;return[h,...(d=h.columns)==null?void 0:d.flatMap(c=>c.getFlatColumns())]},F(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:P(()=>[e._getOrderColumnsFn()],d=>{var c;if((c=h.columns)!=null&&c.length){let v=h.columns.flatMap(y=>y.getLeafColumns());return d(v)}return[h]},F(e.options,"debugColumns","column.getLeafColumns"))};for(let d of e._features)d.createColumn==null||d.createColumn(h,e);return h}var ie="debugHeaders";function df(e,t,n){var r;let o={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{let i=[],u=s=>{s.subHeaders&&s.subHeaders.length&&s.subHeaders.map(u),i.push(s)};return u(o),i},getContext:()=>({table:e,header:o,column:t})};return e._features.forEach(i=>{i.createHeader==null||i.createHeader(o,e)}),o}var op={createTable:e=>{e.getHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>{var o,i;let u=(o=r==null?void 0:r.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?o:[],s=(i=l==null?void 0:l.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?i:[],a=n.filter(h=>!(r!=null&&r.includes(h.id))&&!(l!=null&&l.includes(h.id)));return Bl(t,[...u,...a,...s],e)},F(e.options,ie,"getHeaderGroups")),e.getCenterHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>(n=n.filter(o=>!(r!=null&&r.includes(o.id))&&!(l!=null&&l.includes(o.id))),Bl(t,n,e,"center")),F(e.options,ie,"getCenterHeaderGroups")),e.getLeftHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Bl(t,o,e,"left")},F(e.options,ie,"getLeftHeaderGroups")),e.getRightHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Bl(t,o,e,"right")},F(e.options,ie,"getRightHeaderGroups")),e.getFooterGroups=P(()=>[e.getHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getFooterGroups")),e.getLeftFooterGroups=P(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getLeftFooterGroups")),e.getCenterFooterGroups=P(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getCenterFooterGroups")),e.getRightFooterGroups=P(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getRightFooterGroups")),e.getFlatHeaders=P(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getFlatHeaders")),e.getLeftFlatHeaders=P(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getLeftFlatHeaders")),e.getCenterFlatHeaders=P(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getCenterFlatHeaders")),e.getRightFlatHeaders=P(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getRightFlatHeaders")),e.getCenterLeafHeaders=P(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getCenterLeafHeaders")),e.getLeftLeafHeaders=P(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getLeftLeafHeaders")),e.getRightLeafHeaders=P(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getRightLeafHeaders")),e.getLeafHeaders=P(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var l,o,i,u,s,a;return[...(l=(o=t[0])==null?void 0:o.headers)!=null?l:[],...(i=(u=n[0])==null?void 0:u.headers)!=null?i:[],...(s=(a=r[0])==null?void 0:a.headers)!=null?s:[]].map(p=>p.getLeafHeaders()).flat()},F(e.options,ie,"getLeafHeaders"))}};function Bl(e,t,n,r){var l,o;let i=0,u=function(d,c){c===void 0&&(c=1),i=Math.max(i,c),d.filter(v=>v.getIsVisible()).forEach(v=>{var y;(y=v.columns)!=null&&y.length&&u(v.columns,c+1)},0)};u(e);let s=[],a=(d,c)=>{let v={depth:c,id:[r,\`\${c}\`].filter(Boolean).join("_"),headers:[]},y=[];d.forEach(k=>{let g=[...y].reverse()[0],f=k.column.depth===v.depth,m,S=!1;if(f&&k.column.parent?m=k.column.parent:(m=k.column,S=!0),g&&(g==null?void 0:g.column)===m)g.subHeaders.push(k);else{let C=df(n,m,{id:[r,c,m.id,k==null?void 0:k.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?\`\${y.filter(E=>E.column===m).length}\`:void 0,depth:c,index:y.length});C.subHeaders.push(k),y.push(C)}v.headers.push(k),k.headerGroup=v}),s.push(v),c>0&&a(y,c-1)},p=t.map((d,c)=>df(n,d,{depth:i,index:c}));a(p,i-1),s.reverse();let h=d=>d.filter(v=>v.column.getIsVisible()).map(v=>{let y=0,k=0,g=[0];v.subHeaders&&v.subHeaders.length?(g=[],h(v.subHeaders).forEach(m=>{let{colSpan:S,rowSpan:C}=m;y+=S,g.push(C)})):y=1;let f=Math.min(...g);return k=k+f,v.colSpan=y,v.rowSpan=k,{colSpan:y,rowSpan:k}});return h((l=(o=s[0])==null?void 0:o.headers)!=null?l:[]),s}var xu=(e,t,n,r,l,o,i)=>{let u={id:t,index:r,original:n,depth:l,parentId:i,_valuesCache:{},_uniqueValuesCache:{},getValue:s=>{if(u._valuesCache.hasOwnProperty(s))return u._valuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return u._valuesCache[s]=a.accessorFn(u.original,r),u._valuesCache[s]},getUniqueValues:s=>{if(u._uniqueValuesCache.hasOwnProperty(s))return u._uniqueValuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return a.columnDef.getUniqueValues?(u._uniqueValuesCache[s]=a.columnDef.getUniqueValues(u.original,r),u._uniqueValuesCache[s]):(u._uniqueValuesCache[s]=[u.getValue(s)],u._uniqueValuesCache[s])},renderValue:s=>{var a;return(a=u.getValue(s))!=null?a:e.options.renderFallbackValue},subRows:o!=null?o:[],getLeafRows:()=>np(u.subRows,s=>s.subRows),getParentRow:()=>u.parentId?e.getRow(u.parentId,!0):void 0,getParentRows:()=>{let s=[],a=u;for(;;){let p=a.getParentRow();if(!p)break;s.push(p),a=p}return s.reverse()},getAllCells:P(()=>[e.getAllLeafColumns()],s=>s.map(a=>rp(e,u,a,a.id)),F(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:P(()=>[u.getAllCells()],s=>s.reduce((a,p)=>(a[p.column.id]=p,a),{}),F(e.options,"debugRows","getAllCellsByColumnId"))};for(let s=0;s<e._features.length;s++){let a=e._features[s];a==null||a.createRow==null||a.createRow(u,e)}return u},ip={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},pf=(e,t,n)=>{var r,l;let o=n==null||(r=n.toString())==null?void 0:r.toLowerCase();return!!(!((l=e.getValue(t))==null||(l=l.toString())==null||(l=l.toLowerCase())==null)&&l.includes(o))};pf.autoRemove=e=>Ae(e);var mf=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};mf.autoRemove=e=>Ae(e);var hf=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};hf.autoRemove=e=>Ae(e);var vf=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};vf.autoRemove=e=>Ae(e)||!(e!=null&&e.length);var yf=(e,t,n)=>!n.some(r=>{var l;return!((l=e.getValue(t))!=null&&l.includes(r))});yf.autoRemove=e=>Ae(e)||!(e!=null&&e.length);var Sf=(e,t,n)=>n.some(r=>{var l;return(l=e.getValue(t))==null?void 0:l.includes(r)});Sf.autoRemove=e=>Ae(e)||!(e!=null&&e.length);var wf=(e,t,n)=>e.getValue(t)===n;wf.autoRemove=e=>Ae(e);var Cf=(e,t,n)=>e.getValue(t)==n;Cf.autoRemove=e=>Ae(e);var Pu=(e,t,n)=>{let[r,l]=n,o=e.getValue(t);return o>=r&&o<=l};Pu.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,l=typeof n!="number"?parseFloat(n):n,o=t===null||Number.isNaN(r)?-1/0:r,i=n===null||Number.isNaN(l)?1/0:l;if(o>i){let u=o;o=i,i=u}return[o,i]};Pu.autoRemove=e=>Ae(e)||Ae(e[0])&&Ae(e[1]);var lt={includesString:pf,includesStringSensitive:mf,equalsString:hf,arrIncludes:vf,arrIncludesAll:yf,arrIncludesSome:Sf,equals:wf,weakEquals:Cf,inNumberRange:Pu};function Ae(e){return e==null||e===""}var up={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:_e("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?lt.includesString:typeof r=="number"?lt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?lt.equals:Array.isArray(r)?lt.arrIncludes:lt.weakEquals},e.getFilterFn=()=>{var n,r;return Wl(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:lt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,l;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{let l=e.getFilterFn(),o=r==null?void 0:r.find(p=>p.id===e.id),i=Pt(n,o?o.value:void 0);if(gf(l,i,e)){var u;return(u=r==null?void 0:r.filter(p=>p.id!==e.id))!=null?u:[]}let s={id:e.id,value:i};if(o){var a;return(a=r==null?void 0:r.map(p=>p.id===e.id?s:p))!=null?a:[]}return r!=null&&r.length?[...r,s]:[s]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{let n=e.getAllLeafColumns(),r=l=>{var o;return(o=Pt(t,l))==null?void 0:o.filter(i=>{let u=n.find(s=>s.id===i.id);if(u){let s=u.getFilterFn();if(gf(s,i.value,u))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function gf(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t=="undefined"||typeof t=="string"&&!t}var sp=(e,t,n)=>n.reduce((r,l)=>{let o=l.getValue(e);return r+(typeof o=="number"?o:0)},0),ap=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r>o||r===void 0&&o>=o)&&(r=o)}),r},cp=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r<o||r===void 0&&o>=o)&&(r=o)}),r},fp=(e,t,n)=>{let r,l;return n.forEach(o=>{let i=o.getValue(e);i!=null&&(r===void 0?i>=i&&(r=l=i):(r>i&&(r=i),l<i&&(l=i)))}),[r,l]},dp=(e,t)=>{let n=0,r=0;if(t.forEach(l=>{let o=l.getValue(e);o!=null&&(o=+o)>=o&&(++n,r+=o)}),n)return r/n},gp=(e,t)=>{if(!t.length)return;let n=t.map(o=>o.getValue(e));if(!tp(n))return;if(n.length===1)return n[0];let r=Math.floor(n.length/2),l=n.sort((o,i)=>o-i);return n.length%2!==0?l[r]:(l[r-1]+l[r])/2},pp=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),mp=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,hp=(e,t)=>t.length,pu={sum:sp,min:ap,max:cp,extent:fp,mean:dp,median:gp,unique:pp,uniqueCount:mp,count:hp},vp={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:_e("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n!=null?n:[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{let n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return pu.sum;if(Object.prototype.toString.call(r)==="[object Date]")return pu.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return Wl(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:pu[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];let r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var l;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((l=n.subRows)!=null&&l.length)}}};function yp(e,t,n){if(!(t!=null&&t.length)||!n)return e;let r=e.filter(o=>!t.includes(o.id));return n==="remove"?r:[...t.map(o=>e.find(i=>i.id===o)).filter(Boolean),...r]}var Sp={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:_e("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=P(n=>[hr(t,n)],n=>n.findIndex(r=>r.id===e.id),F(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=hr(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;let l=hr(t,n);return((r=l[l.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=P(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>l=>{let o=[];if(!(t!=null&&t.length))o=l;else{let i=[...t],u=[...l];for(;u.length&&i.length;){let s=i.shift(),a=u.findIndex(p=>p.id===s);a>-1&&o.push(u.splice(a,1)[0])}o=[...o,...u]}return yp(o,n,r)},F(e.options,"debugTable","_getOrderColumnsFn"))}},mu=()=>({left:[],right:[]}),wp={getInitialState:e=>({columnPinning:mu(),...e}),getDefaultOptions:e=>({onColumnPinningChange:_e("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{let r=e.getLeafColumns().map(l=>l.id).filter(Boolean);t.setColumnPinning(l=>{var o,i;if(n==="right"){var u,s;return{left:((u=l==null?void 0:l.left)!=null?u:[]).filter(h=>!(r!=null&&r.includes(h))),right:[...((s=l==null?void 0:l.right)!=null?s:[]).filter(h=>!(r!=null&&r.includes(h))),...r]}}if(n==="left"){var a,p;return{left:[...((a=l==null?void 0:l.left)!=null?a:[]).filter(h=>!(r!=null&&r.includes(h))),...r],right:((p=l==null?void 0:l.right)!=null?p:[]).filter(h=>!(r!=null&&r.includes(h)))}}return{left:((o=l==null?void 0:l.left)!=null?o:[]).filter(h=>!(r!=null&&r.includes(h))),right:((i=l==null?void 0:l.right)!=null?i:[]).filter(h=>!(r!=null&&r.includes(h)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var l,o,i;return((l=r.columnDef.enablePinning)!=null?l:!0)&&((o=(i=t.options.enableColumnPinning)!=null?i:t.options.enablePinning)!=null?o:!0)}),e.getIsPinned=()=>{let n=e.getLeafColumns().map(u=>u.id),{left:r,right:l}=t.getState().columnPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"left":i?"right":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();return l?(n=(r=t.getState().columnPinning)==null||(r=r[l])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,l)=>{let o=[...r!=null?r:[],...l!=null?l:[]];return n.filter(i=>!o.includes(i.column.id))},F(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"left"})),F(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"right"})),F(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?mu():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:mu())},e.getIsSomeColumnsPinned=t=>{var n;let r=e.getState().columnPinning;if(!t){var l,o;return!!((l=r.left)!=null&&l.length||(o=r.right)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{let l=[...n!=null?n:[],...r!=null?r:[]];return t.filter(o=>!l.includes(o.id))},F(e.options,"debugColumns","getCenterLeafColumns"))}},Ul={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},hu=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Cp={getDefaultColumnDef:()=>Ul,getInitialState:e=>({columnSizing:{},columnSizingInfo:hu(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:_e("columnSizing",e),onColumnSizingInfoChange:_e("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,l;let o=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Ul.minSize,(r=o!=null?o:e.columnDef.size)!=null?r:Ul.size),(l=e.columnDef.maxSize)!=null?l:Ul.maxSize)},e.getStart=P(n=>[n,hr(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getStart")),e.getAfter=P(n=>[n,hr(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...l}=n;return l})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0,r=l=>{if(l.subHeaders.length)l.subHeaders.forEach(r);else{var o;n+=(o=l.column.getSize())!=null?o:0}};return r(e),n},e.getStart=()=>{if(e.index>0){let n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{let r=t.getColumn(e.column.id),l=r==null?void 0:r.getCanResize();return o=>{if(!r||!l||(o.persist==null||o.persist(),vu(o)&&o.touches&&o.touches.length>1))return;let i=e.getSize(),u=e?e.getLeafHeaders().map(g=>[g.column.id,g.column.getSize()]):[[r.id,r.getSize()]],s=vu(o)?Math.round(o.touches[0].clientX):o.clientX,a={},p=(g,f)=>{typeof f=="number"&&(t.setColumnSizingInfo(m=>{var S,C;let E=t.options.columnResizeDirection==="rtl"?-1:1,_=(f-((S=m==null?void 0:m.startOffset)!=null?S:0))*E,x=Math.max(_/((C=m==null?void 0:m.startSize)!=null?C:0),-.999999);return m.columnSizingStart.forEach(A=>{let[N,M]=A;a[N]=Math.round(Math.max(M+M*x,0)*100)/100}),{...m,deltaOffset:_,deltaPercentage:x}}),(t.options.columnResizeMode==="onChange"||g==="end")&&t.setColumnSizing(m=>({...m,...a})))},h=g=>p("move",g),d=g=>{p("end",g),t.setColumnSizingInfo(f=>({...f,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},c=n||typeof document!="undefined"?document:null,v={moveHandler:g=>h(g.clientX),upHandler:g=>{c==null||c.removeEventListener("mousemove",v.moveHandler),c==null||c.removeEventListener("mouseup",v.upHandler),d(g.clientX)}},y={moveHandler:g=>(g.cancelable&&(g.preventDefault(),g.stopPropagation()),h(g.touches[0].clientX),!1),upHandler:g=>{var f;c==null||c.removeEventListener("touchmove",y.moveHandler),c==null||c.removeEventListener("touchend",y.upHandler),g.cancelable&&(g.preventDefault(),g.stopPropagation()),d((f=g.touches[0])==null?void 0:f.clientX)}},k=_p()?{passive:!1}:!1;vu(o)?(c==null||c.addEventListener("touchmove",y.moveHandler,k),c==null||c.addEventListener("touchend",y.upHandler,k)):(c==null||c.addEventListener("mousemove",v.moveHandler,k),c==null||c.addEventListener("mouseup",v.upHandler,k)),t.setColumnSizingInfo(g=>({...g,startOffset:s,startSize:i,deltaOffset:0,deltaPercentage:0,columnSizingStart:u,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?hu():(n=e.initialState.columnSizingInfo)!=null?n:hu())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0}}},Gl=null;function _p(){if(typeof Gl=="boolean")return Gl;let e=!1;try{let t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch(t){e=!1}return Gl=e,Gl}function vu(e){return e.type==="touchstart"}var Rp={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:_e("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n!=null?n:!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;let l=e.columns;return(n=l.length?l.some(o=>o.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=P(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),F(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=P(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,l)=>[...n,...r,...l],F(t.options,"debugRows","getVisibleCells"))},createTable:e=>{let t=(n,r)=>P(()=>[r(),r().filter(l=>l.getIsVisible()).map(l=>l.id).join("_")],l=>l.filter(o=>o.getIsVisible==null?void 0:o.getIsVisible()),F(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((l,o)=>({...l,[o.id]:n||!(o.getCanHide!=null&&o.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function hr(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}var kp={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Ep={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:_e("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;let r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,l,o;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&((o=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?o:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>lt.includesString,e.getGlobalFilterFn=()=>{var t,n;let{globalFilterFn:r}=e.options;return Wl(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:lt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},xp={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:_e("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{(r!=null?r:!e.getIsAllRowsExpanded())?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var l,o;e.setExpanded(r?{}:(l=(o=e.initialState)==null?void 0:o.expanded)!=null?l:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{let r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{let r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(l=>!l.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(o=>{let i=o.split(".");r=Math.max(r,i.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var l;let o=r===!0?!0:!!(r!=null&&r[e.id]),i={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(u=>{i[u]=!0}):i=r,n=(l=n)!=null?l:!o,!o&&n)return{...i,[e.id]:!0};if(o&&!n){let{[e.id]:u,...s}=i;return s}return r})},e.getIsExpanded=()=>{var n;let r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,l;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((l=e.subRows)!=null&&l.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{let n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},Cu=0,_u=10,yu=()=>({pageIndex:Cu,pageSize:_u}),Pp={getInitialState:e=>({...e,pagination:{...yu(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:_e("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{let l=o=>Pt(r,o);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(l)},e.resetPagination=r=>{var l;e.setPagination(r?yu():(l=e.initialState.pagination)!=null?l:yu())},e.setPageIndex=r=>{e.setPagination(l=>{let o=Pt(r,l.pageIndex),i=typeof e.options.pageCount=="undefined"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return o=Math.max(0,Math.min(o,i)),{...l,pageIndex:o}})},e.resetPageIndex=r=>{var l,o;e.setPageIndex(r?Cu:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageIndex)!=null?l:Cu)},e.resetPageSize=r=>{var l,o;e.setPageSize(r?_u:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageSize)!=null?l:_u)},e.setPageSize=r=>{e.setPagination(l=>{let o=Math.max(1,Pt(r,l.pageSize)),i=l.pageSize*l.pageIndex,u=Math.floor(i/o);return{...l,pageIndex:u,pageSize:o}})},e.setPageCount=r=>e.setPagination(l=>{var o;let i=Pt(r,(o=e.options.pageCount)!=null?o:-1);return typeof i=="number"&&(i=Math.max(-1,i)),{...l,pageCount:i}}),e.getPageOptions=P(()=>[e.getPageCount()],r=>{let l=[];return r&&r>0&&(l=[...new Array(r)].fill(null).map((o,i)=>i)),l},F(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{let{pageIndex:r}=e.getState().pagination,l=e.getPageCount();return l===-1?!0:l===0?!1:r<l-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Su=()=>({top:[],bottom:[]}),Fp={getInitialState:e=>({rowPinning:Su(),...e}),getDefaultOptions:e=>({onRowPinningChange:_e("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,l)=>{let o=r?e.getLeafRows().map(s=>{let{id:a}=s;return a}):[],i=l?e.getParentRows().map(s=>{let{id:a}=s;return a}):[],u=new Set([...i,e.id,...o]);t.setRowPinning(s=>{var a,p;if(n==="bottom"){var h,d;return{top:((h=s==null?void 0:s.top)!=null?h:[]).filter(y=>!(u!=null&&u.has(y))),bottom:[...((d=s==null?void 0:s.bottom)!=null?d:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)]}}if(n==="top"){var c,v;return{top:[...((c=s==null?void 0:s.top)!=null?c:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)],bottom:((v=s==null?void 0:s.bottom)!=null?v:[]).filter(y=>!(u!=null&&u.has(y)))}}return{top:((a=s==null?void 0:s.top)!=null?a:[]).filter(y=>!(u!=null&&u.has(y))),bottom:((p=s==null?void 0:s.bottom)!=null?p:[]).filter(y=>!(u!=null&&u.has(y)))}})},e.getCanPin=()=>{var n;let{enableRowPinning:r,enablePinning:l}=t.options;return typeof r=="function"?r(e):(n=r!=null?r:l)!=null?n:!0},e.getIsPinned=()=>{let n=[e.id],{top:r,bottom:l}=t.getState().rowPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"top":i?"bottom":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();if(!l)return-1;let o=(n=l==="top"?t.getTopRows():t.getBottomRows())==null?void 0:n.map(i=>{let{id:u}=i;return u});return(r=o==null?void 0:o.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Su():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Su())},e.getIsSomeRowsPinned=t=>{var n;let r=e.getState().rowPinning;if(!t){var l,o;return!!((l=r.top)!=null&&l.length||(o=r.bottom)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=(t,n,r)=>{var l;return((l=e.options.keepPinnedRows)==null||l?(n!=null?n:[]).map(i=>{let u=e.getRow(i,!0);return u.getIsAllParentsExpanded()?u:null}):(n!=null?n:[]).map(i=>t.find(u=>u.id===i))).filter(Boolean).map(i=>({...i,position:r}))},e.getTopRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(t,n)=>e._getPinnedRows(t,n,"top"),F(e.options,"debugRows","getTopRows")),e.getBottomRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(t,n)=>e._getPinnedRows(t,n,"bottom"),F(e.options,"debugRows","getBottomRows")),e.getCenterRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{let l=new Set([...n!=null?n:[],...r!=null?r:[]]);return t.filter(o=>!l.has(o.id))},F(e.options,"debugRows","getCenterRows"))}},Mp={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:_e("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t!="undefined"?t:!e.getIsAllRowsSelected();let r={...n},l=e.getPreGroupedRowModel().flatRows;return t?l.forEach(o=>{o.getCanSelect()&&(r[o.id]=!0)}):l.forEach(o=>{delete r[o.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{let r=typeof t!="undefined"?t:!e.getIsAllPageRowsSelected(),l={...n};return e.getRowModel().rows.forEach(o=>{Ru(l,o.id,r,!0,e)}),l}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=P(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=P(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=P(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?wu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{let t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState(),r=!!(t.length&&Object.keys(n).length);return r&&t.some(l=>l.getCanSelect()&&!n[l.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows.filter(l=>l.getCanSelect()),{rowSelection:n}=e.getState(),r=!!t.length;return r&&t.some(l=>!n[l.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;let n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{let l=e.getIsSelected();t.setRowSelection(o=>{var i;if(n=typeof n!="undefined"?n:!l,e.getCanSelect()&&l===n)return o;let u={...o};return Ru(u,e.id,n,(i=r==null?void 0:r.selectChildren)!=null?i:!0,t),u})},e.getIsSelected=()=>{let{rowSelection:n}=t.getState();return Fu(e,n)},e.getIsSomeSelected=()=>{let{rowSelection:n}=t.getState();return ku(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{let{rowSelection:n}=t.getState();return ku(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{let n=e.getCanSelect();return r=>{var l;n&&e.toggleSelected((l=r.target)==null?void 0:l.checked)}}}},Ru=(e,t,n,r,l)=>{var o;let i=l.getRow(t,!0);n?(i.getCanMultiSelect()||Object.keys(e).forEach(u=>delete e[u]),i.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(o=i.subRows)!=null&&o.length&&i.getCanSelectSubRows()&&i.subRows.forEach(u=>Ru(e,u.id,n,r,l))};function wu(e,t){let n=e.getState().rowSelection,r=[],l={},o=function(i,u){return i.map(s=>{var a;let p=Fu(s,n);if(p&&(r.push(s),l[s.id]=s),(a=s.subRows)!=null&&a.length&&(s={...s,subRows:o(s.subRows)}),p)return s}).filter(Boolean)};return{rows:o(t.rows),flatRows:r,rowsById:l}}function Fu(e,t){var n;return(n=t[e.id])!=null?n:!1}function ku(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let l=!0,o=!1;return e.subRows.forEach(i=>{if(!(o&&!l)&&(i.getCanSelect()&&(Fu(i,t)?o=!0:l=!1),i.subRows&&i.subRows.length)){let u=ku(i,t);u==="all"?o=!0:(u==="some"&&(o=!0),l=!1)}}),l?"all":o?"some":!1}var Eu=/([0-9]+)/gm,Ip=(e,t,n)=>_f(Ft(e.getValue(n)).toLowerCase(),Ft(t.getValue(n)).toLowerCase()),zp=(e,t,n)=>_f(Ft(e.getValue(n)),Ft(t.getValue(n))),Np=(e,t,n)=>Mu(Ft(e.getValue(n)).toLowerCase(),Ft(t.getValue(n)).toLowerCase()),Lp=(e,t,n)=>Mu(Ft(e.getValue(n)),Ft(t.getValue(n))),Vp=(e,t,n)=>{let r=e.getValue(n),l=t.getValue(n);return r>l?1:r<l?-1:0},Dp=(e,t,n)=>Mu(e.getValue(n),t.getValue(n));function Mu(e,t){return e===t?0:e>t?1:-1}function Ft(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function _f(e,t){let n=e.split(Eu).filter(Boolean),r=t.split(Eu).filter(Boolean);for(;n.length&&r.length;){let l=n.shift(),o=r.shift(),i=parseInt(l,10),u=parseInt(o,10),s=[i,u].sort();if(isNaN(s[0])){if(l>o)return 1;if(o>l)return-1;continue}if(isNaN(s[1]))return isNaN(i)?-1:1;if(i>u)return 1;if(u>i)return-1}return n.length-r.length}var mr={alphanumeric:Ip,alphanumericCaseSensitive:zp,text:Np,textCaseSensitive:Lp,datetime:Vp,basic:Dp},$p={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:_e("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{let n=t.getFilteredRowModel().flatRows.slice(10),r=!1;for(let l of n){let o=l==null?void 0:l.getValue(e.id);if(Object.prototype.toString.call(o)==="[object Date]")return mr.datetime;if(typeof o=="string"&&(r=!0,o.split(Eu).length>1))return mr.alphanumeric}return r?mr.text:mr.basic},e.getAutoSortDir=()=>{let n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return Wl(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:mr[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{let l=e.getNextSortingOrder(),o=typeof n!="undefined"&&n!==null;t.setSorting(i=>{let u=i==null?void 0:i.find(c=>c.id===e.id),s=i==null?void 0:i.findIndex(c=>c.id===e.id),a=[],p,h=o?n:l==="desc";if(i!=null&&i.length&&e.getCanMultiSort()&&r?u?p="toggle":p="add":i!=null&&i.length&&s!==i.length-1?p="replace":u?p="toggle":p="replace",p==="toggle"&&(o||l||(p="remove")),p==="add"){var d;a=[...i,{id:e.id,desc:h}],a.splice(0,a.length-((d=t.options.maxMultiSortColCount)!=null?d:Number.MAX_SAFE_INTEGER))}else p==="toggle"?a=i.map(c=>c.id===e.id?{...c,desc:h}:c):p==="remove"?a=i.filter(c=>c.id!==e.id):a=[{id:e.id,desc:h}];return a})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,l;let o=e.getFirstSortDir(),i=e.getIsSorted();return i?i!==o&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(l=t.options.enableMultiRemove)!=null)||l)?!1:i==="desc"?"asc":"desc":o},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;let r=(n=t.getState().sorting)==null?void 0:n.find(l=>l.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{let n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Tp=[op,Rp,Sp,wp,ip,up,kp,Ep,$p,vp,xp,Pp,Fp,Mp,Cp];function Rf(e){var t,n;let r=[...Tp,...(t=e._features)!=null?t:[]],l={_features:r},o=l._features.reduce((d,c)=>Object.assign(d,c.getDefaultOptions==null?void 0:c.getDefaultOptions(l)),{}),i=d=>l.options.mergeOptions?l.options.mergeOptions(o,d):{...o,...d},s={...{},...(n=e.initialState)!=null?n:{}};l._features.forEach(d=>{var c;s=(c=d.getInitialState==null?void 0:d.getInitialState(s))!=null?c:s});let a=[],p=!1,h={_features:r,options:{...o,...e},initialState:s,_queue:d=>{a.push(d),p||(p=!0,Promise.resolve().then(()=>{for(;a.length;)a.shift()();p=!1}).catch(c=>setTimeout(()=>{throw c})))},reset:()=>{l.setState(l.initialState)},setOptions:d=>{let c=Pt(d,l.options);l.options=i(c)},getState:()=>l.options.state,setState:d=>{l.options.onStateChange==null||l.options.onStateChange(d)},_getRowId:(d,c,v)=>{var y;return(y=l.options.getRowId==null?void 0:l.options.getRowId(d,c,v))!=null?y:\`\${v?[v.id,c].join("."):c}\`},getCoreRowModel:()=>(l._getCoreRowModel||(l._getCoreRowModel=l.options.getCoreRowModel(l)),l._getCoreRowModel()),getRowModel:()=>l.getPaginationRowModel(),getRow:(d,c)=>{let v=(c?l.getPrePaginationRowModel():l.getRowModel()).rowsById[d];if(!v&&(v=l.getCoreRowModel().rowsById[d],!v))throw new Error;return v},_getDefaultColumnDef:P(()=>[l.options.defaultColumn],d=>{var c;return d=(c=d)!=null?c:{},{header:v=>{let y=v.header.column.columnDef;return y.accessorKey?y.accessorKey:y.accessorFn?y.id:null},cell:v=>{var y,k;return(y=(k=v.renderValue())==null||k.toString==null?void 0:k.toString())!=null?y:null},...l._features.reduce((v,y)=>Object.assign(v,y.getDefaultColumnDef==null?void 0:y.getDefaultColumnDef()),{}),...d}},F(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>l.options.columns,getAllColumns:P(()=>[l._getColumnDefs()],d=>{let c=function(v,y,k){return k===void 0&&(k=0),v.map(g=>{let f=lp(l,g,k,y),m=g;return f.columns=m.columns?c(m.columns,f,k+1):[],f})};return c(d)},F(e,"debugColumns","getAllColumns")),getAllFlatColumns:P(()=>[l.getAllColumns()],d=>d.flatMap(c=>c.getFlatColumns()),F(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:P(()=>[l.getAllFlatColumns()],d=>d.reduce((c,v)=>(c[v.id]=v,c),{}),F(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:P(()=>[l.getAllColumns(),l._getOrderColumnsFn()],(d,c)=>{let v=d.flatMap(y=>y.getLeafColumns());return c(v)},F(e,"debugColumns","getAllLeafColumns")),getColumn:d=>l._getAllFlatColumnsById()[d]};Object.assign(l,h);for(let d=0;d<l._features.length;d++){let c=l._features[d];c==null||c.createTable==null||c.createTable(l)}return l}function kf(){return e=>P(()=>[e.options.data],t=>{let n={rows:[],flatRows:[],rowsById:{}},r=function(l,o,i){o===void 0&&(o=0);let u=[];for(let a=0;a<l.length;a++){let p=xu(e,e._getRowId(l[a],a,i),l[a],a,o,void 0,i==null?void 0:i.id);if(n.flatRows.push(p),n.rowsById[p.id]=p,u.push(p),e.options.getSubRows){var s;p.originalSubRows=e.options.getSubRows(l[a],a),(s=p.originalSubRows)!=null&&s.length&&(p.subRows=r(p.originalSubRows,o+1,p))}}return u};return n.rows=r(t),n},F(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Op(e){let t=[],n=r=>{var l;t.push(r),(l=r.subRows)!=null&&l.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Hp(e,t,n){return n.options.filterFromLeafRows?Ap(e,t,n):jp(e,t,n)}function Ap(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){var h;let c=s[d],v=xu(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);if(v.columnFilters=c.columnFilters,(h=c.subRows)!=null&&h.length&&a<i){if(v.subRows=u(c.subRows,a+1),c=v,t(c)&&!v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}if(t(c)||v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}}else c=v,t(c)&&(p.push(c),o[c.id]=c,l.push(c))}return p};return{rows:u(e),flatRows:l,rowsById:o}}function jp(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){let c=s[d];if(t(c)){var h;if((h=c.subRows)!=null&&h.length&&a<i){let y=xu(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);y.subRows=u(c.subRows,a+1),c=y}p.push(c),l.push(c),o[c.id]=c}}return p};return{rows:u(e),flatRows:l,rowsById:o}}function Ef(){return e=>P(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let d=0;d<t.flatRows.length;d++)t.flatRows[d].columnFilters={},t.flatRows[d].columnFiltersMeta={};return t}let l=[],o=[];(n!=null?n:[]).forEach(d=>{var c;let v=e.getColumn(d.id);if(!v)return;let y=v.getFilterFn();y&&l.push({id:d.id,filterFn:y,resolvedValue:(c=y.resolveFilterValue==null?void 0:y.resolveFilterValue(d.value))!=null?c:d.value})});let i=(n!=null?n:[]).map(d=>d.id),u=e.getGlobalFilterFn(),s=e.getAllLeafColumns().filter(d=>d.getCanGlobalFilter());r&&u&&s.length&&(i.push("__global__"),s.forEach(d=>{var c;o.push({id:d.id,filterFn:u,resolvedValue:(c=u.resolveFilterValue==null?void 0:u.resolveFilterValue(r))!=null?c:r})}));let a,p;for(let d=0;d<t.flatRows.length;d++){let c=t.flatRows[d];if(c.columnFilters={},l.length)for(let v=0;v<l.length;v++){a=l[v];let y=a.id;c.columnFilters[y]=a.filterFn(c,y,a.resolvedValue,k=>{c.columnFiltersMeta[y]=k})}if(o.length){for(let v=0;v<o.length;v++){p=o[v];let y=p.id;if(p.filterFn(c,y,p.resolvedValue,k=>{c.columnFiltersMeta[y]=k})){c.columnFilters.__global__=!0;break}}c.columnFilters.__global__!==!0&&(c.columnFilters.__global__=!1)}}let h=d=>{for(let c=0;c<i.length;c++)if(d.columnFilters[i[c]]===!1)return!1;return!0};return Hp(t.rows,h,e)},F(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function xf(e){return t=>P(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;let{pageSize:l,pageIndex:o}=n,{rows:i,flatRows:u,rowsById:s}=r,a=l*o,p=a+l;i=i.slice(a,p);let h;t.options.paginateExpandedRows?h={rows:i,flatRows:u,rowsById:s}:h=Op({rows:i,flatRows:u,rowsById:s}),h.flatRows=[];let d=c=>{h.flatRows.push(c),c.subRows.length&&c.subRows.forEach(d)};return h.rows.forEach(d),h},F(t.options,"debugTable","getPaginationRowModel"))}function Pf(){return e=>P(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;let r=e.getState().sorting,l=[],o=r.filter(s=>{var a;return(a=e.getColumn(s.id))==null?void 0:a.getCanSort()}),i={};o.forEach(s=>{let a=e.getColumn(s.id);a&&(i[s.id]={sortUndefined:a.columnDef.sortUndefined,invertSorting:a.columnDef.invertSorting,sortingFn:a.getSortingFn()})});let u=s=>{let a=s.map(p=>({...p}));return a.sort((p,h)=>{for(let c=0;c<o.length;c+=1){var d;let v=o[c],y=i[v.id],k=y.sortUndefined,g=(d=v==null?void 0:v.desc)!=null?d:!1,f=0;if(k){let m=p.getValue(v.id),S=h.getValue(v.id),C=m===void 0,E=S===void 0;if(C||E){if(k==="first")return C?-1:1;if(k==="last")return C?1:-1;f=C&&E?0:C?k:-k}}if(f===0&&(f=y.sortingFn(p,h,v.id)),f!==0)return g&&(f*=-1),y.invertSorting&&(f*=-1),f}return p.index-h.index}),a.forEach(p=>{var h;l.push(p),(h=p.subRows)!=null&&h.length&&(p.subRows=u(p.subRows))}),a};return{rows:u(n.rows),flatRows:l,rowsById:n.rowsById}},F(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}function Ql(e,t){return e?Bp(e)?vr.createElement(e,t):e:null}function Bp(e){return Up(e)||typeof e=="function"||Gp(e)}function Up(e){return typeof e=="function"&&(()=>{let t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Gp(e){return typeof e=="object"&&typeof e.$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$typeof.description)}function Ff(e){let t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=vr.useState(()=>({current:Rf(t)})),[r,l]=vr.useState(()=>n.current.initialState);return n.current.setOptions(o=>({...o,...e,state:{...r,...e.state},onStateChange:i=>{l(i),e.onStateChange==null||e.onStateChange(i)}})),n.current}var I=Re.default.createElement;function Wp(){return I("span",{className:"th-sort-icon","aria-hidden":"true"},I("svg",{className:"sort-up",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 0 8 5H0z"})),I("svg",{className:"sort-down",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 5 0 0h8z"})))}function Qp(e,t){let n=[];return t&&n.push({id:"select",header:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.table.getIsAllPageRowsSelected(),ref:function(l){l&&(l.indeterminate=r.table.getIsSomePageRowsSelected()&&!r.table.getIsAllPageRowsSelected())},onChange:r.table.getToggleAllPageRowsSelectedHandler(),"aria-label":"\\u5168\\u9009\\u5F53\\u524D\\u9875"})},cell:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.row.getIsSelected(),onChange:r.row.getToggleSelectedHandler(),"aria-label":"\\u9009\\u62E9\\u884C"})},enableSorting:!1,enableGlobalFilter:!1}),(e||[]).forEach(function(r){n.push({accessorKey:r.key,header:r.label,enableSorting:r.sortable!==!1,meta:{badge:r.badge,mono:r.mono,numeric:r.numeric,key:r.key,compact:r.compact},cell:function(l){var o=l.getValue(),i=l.column.columnDef.meta||{};if(i.badge)return I("span",{className:"badge"},o!=null?String(o):"");if(i.numeric&&o!=null&&o!==""){if(i.key==="weight")return String(o);var u=Number(o);return u!==u?String(o):Math.abs(u%1)<1e-9?String(Math.round(u)):String(Math.round(u*100)/100)}return i.mono?o!=null?String(o):"":r.link?I("button",{type:"button",className:"org-name-btn",onClick:r.onLinkClick?function(){r.onLinkClick(l.row.original)}:void 0},o!=null?String(o):""):o!=null?String(o):""}})}),n}function zf(){try{if(window.__cqDtRoot&&typeof window.__cqDtRoot.getElementById=="function")return window.__cqDtRoot}catch(e){}return document}function Kp(e){var t=e.columnDefs,n=e.data||[],r=e.pageSize||10,l=e.filterPlaceholder||"\\u641C\\u7D22\\u5168\\u90E8\\u5217\\u2026",o=!!e.selectable,i=e.selectedIds||{},u=(0,Re.useState)([]),s=u[0],a=u[1],p=(0,Re.useState)([]),h=p[0],d=p[1],c=(0,Re.useState)(""),v=c[0],y=c[1],k=(0,Re.useState)({}),g=k[0],f=k[1],m=(0,Re.useState)({pageIndex:0,pageSize:r}),S=m[0],C=m[1];(0,Re.useEffect)(function(){if(o){var M={};Object.keys(i).forEach(function(T){i[T]&&(M[T]=!0)}),f(M)}},[i,o]);var E=(0,Re.useMemo)(function(){return Qp(t,o)},[t,o]),_=Ff({data:n,columns:E,state:{sorting:s,columnFilters:h,globalFilter:v,rowSelection:g,pagination:S},enableRowSelection:o,getRowId:function(M,T){return M._rowId!=null?String(M._rowId):M.id!=null?String(M.id):M.no!=null?String(M.no):M.code!=null?String(M.code):M._idx!=null?String(M._idx):String(T)},onSortingChange:a,onColumnFiltersChange:d,onGlobalFilterChange:y,onRowSelectionChange:function(M){f(function(T){var ze=typeof M=="function"?M(T):M;return e.onSelectionChange&&e.onSelectionChange(ze),ze})},onPaginationChange:C,getCoreRowModel:kf(),getSortedRowModel:Pf(),getFilteredRowModel:Ef(),getPaginationRowModel:xf(),globalFilterFn:"includesString"}),x=I(Re.default.Fragment,null,I("input",{className:"dt-filter-input",type:"search",placeholder:l,value:v!=null?v:"",onChange:function(M){y(M.target.value)}}),I("span",{className:"dt-meta"},"\\u5171 "+n.length+" \\u6761 \\xB7 \\u7B5B\\u9009\\u540E "+_.getFilteredRowModel().rows.length+" \\u6761")),A=null;try{e.filterHostId&&(A=zf().getElementById(e.filterHostId))}catch(M){}var N=A?(0,If.createPortal)(x,A):I("div",{className:"dt-toolbar"},x);return I("div",{className:"data-table"},N,I("div",{className:"table-wrap dt-table-wrap"},I("table",{className:"table"},I("thead",null,_.getHeaderGroups().map(function(M){return I("tr",{key:M.id},M.headers.map(function(T){var ze=T.column.columnDef.meta||{},je=T.column.getCanSort(),Iu=T.column.getIsSorted(),_n=(je?"th-sort":"")+(Iu?" is-"+Iu:"");return T.id==="select"?_n="th-chk":(ze.compact||ze.numeric||ze.badge)&&(_n=(_n?_n+" ":"")+"th-compact"),I("th",{key:T.id,className:_n,onClick:je?T.column.getToggleSortingHandler():void 0},je?I("span",{className:"th-sort-inner"},Ql(T.column.columnDef.header,T.getContext()),I(Wp,null)):Ql(T.column.columnDef.header,T.getContext()))}))})),I("tbody",null,_.getRowModel().rows.length?_.getRowModel().rows.map(function(M){return I("tr",{key:M.id},M.getVisibleCells().map(function(T){var ze=T.column.columnDef.meta||{},je="";return T.column.id==="select"?je="td-chk":ze.mono&&(je="cfg"),(ze.compact||ze.numeric||ze.badge)&&(je=je?je+" td-compact":"td-compact"),I("td",{key:T.id,className:je},Ql(T.column.columnDef.cell,T.getContext()))}))}):I("tr",null,I("td",{colSpan:E.length,className:"dt-empty"},"\\u6682\\u65E0\\u6570\\u636E"))))),I("div",{className:"dt-pagination"},I("span",{className:"dt-page-info"},"\\u7B2C "+(_.getState().pagination.pageIndex+1)+" / "+Math.max(1,_.getPageCount())+" \\u9875"),I("span",{className:"org-pager"},I("button",{className:"icon-btn sm",type:"button",disabled:!_.getCanPreviousPage(),onClick:function(){_.previousPage()},"aria-label":"\\u4E0A\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m15 18-6-6 6-6"}))),I("select",{className:"dt-page-size",value:String(_.getState().pagination.pageSize),onChange:function(M){_.setPageSize(Number(M.target.value))},"aria-label":"\\u6BCF\\u9875\\u6761\\u6570"},[10,20,50,100].map(function(M){return I("option",{key:M,value:String(M)},M+"\\u6761/\\u9875")})),I("button",{className:"icon-btn sm",type:"button",disabled:!_.getCanNextPage(),onClick:function(){_.nextPage()},"aria-label":"\\u4E0B\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m9 18 6-6-6-6"}))))))}var ot={};function Xp(e,t,n,r,l){var o=zf().getElementById(t);if(!o)return;if(ot[e]){try{ot[e].root.unmount()}catch(p){}delete ot[e];try{o.innerHTML=""}catch(p){}}var i=r||[],u=l||{},s=(0,Mf.createRoot)(o);function a(p,h){p&&(i=p),h&&(u=Object.assign({},u,h)),s.render(I(Kp,{columnDefs:n,data:i,pageSize:u.pageSize,filterPlaceholder:u.filterPlaceholder,selectable:u.selectable,selectedIds:u.selectedIds,onSelectionChange:u.onSelectionChange,filterHostId:u.filterHostId}))}ot[e]={render:a,root:s},a(r,l)}window.__cqDataTable={mount:Xp,setData:function(e,t,n){ot[e]&&ot[e].render(t,n)},unmountAll:function(){Object.keys(ot).forEach(function(e){try{ot[e].root.unmount()}catch(t){}delete ot[e]})}};typeof window.__CQ_TABLE_BOOT=="function"&&window.__CQ_TABLE_BOOT();})();
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
            --dt-col-max: calc(var(--font-size) * 16);
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
            min-height: 0;
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
            min-height: 0;
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
            min-height: 0;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) - 4px);
            overflow: auto;
            background: color-mix(in oklch, var(--background) 42%, transparent);
            backdrop-filter: blur(20px) saturate(1.15);
            -webkit-backdrop-filter: blur(20px) saturate(1.15);
        }

        .table {
            width: 100%;
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
            padding: .4rem .4375rem;
            text-align: left;
            vertical-align: middle;
            font-weight: 500;
            color: var(--foreground);
            background: color-mix(in oklch, var(--background) 48%, transparent);
            backdrop-filter: blur(20px) saturate(1.15);
            -webkit-backdrop-filter: blur(20px) saturate(1.15);
            max-width: var(--dt-col-max);
            white-space: normal;
            overflow-wrap: break-word;
            word-break: break-word;
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
            padding: .375rem .4375rem;
            vertical-align: top;
            max-width: var(--dt-col-max);
            white-space: normal;
            overflow-wrap: break-word;
            word-break: break-word;
            line-height: 1.45;
            font-variant-numeric: tabular-nums;
            background: transparent;
        }

        .table th.th-compact,
        .table td.td-compact {
            white-space: nowrap;
            max-width: none;
            vertical-align: middle;
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
                lastAppHomeHead: "",
                lastDeductionHead: "",
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
                snap.lastAppHomeLen = String(lastAppHomePayload || "").length;
                snap.lastDeductionLen = String(lastDeductionPayload || "").length;
                snap.lastAppHomeHead = String(lastAppHomePayload || "").slice(0, 500);
                snap.lastDeductionHead = String(lastDeductionPayload || "").slice(0, 500);
            } catch (e4) { }
            try {
                var pw = parentWin();
                snap.parentWinHref = safeHref(pw);
                snap.hasJQuery = !!(pw && (pw.jQuery || pw.$) && (pw.jQuery || pw.$).ajax);
                var doc = pw.document;
                snap.clicks = {
                    app: !!findClickAnywhere("应用"),
                    party: !!findClickAnywhere("党费"),
                    deductionMenu: !!findClickAnywhere("扣分项台账")
                };
                snap.sessionHref = sessionWin ? safeHref(sessionWin) : "";
                var fetchFrame = hostWin().document.getElementById("cq-fetch-frame");
                snap.fetchFrameSrc = fetchFrame ? String(fetchFrame.src || "") : "";
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
                    { key: "org", label: "党组织", sortable: true },
                    { key: "typeName", label: "配置类型", sortable: true },
                    { key: "config", label: "配置json", sortable: true, mono: true }
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
        function randConfigRow() {
            var st = randStatus();
            var types = [
                "季度党群绩效评价规则",
                "季度创先争优评价规则",
                "年度党群绩效评价规则",
                "年度创先争优评价规则"
            ];
            return {
                no: randNo("CQ"),
                statusText: st.text,
                statusCode: st.code,
                org: ORGS[Math.floor(Math.random() * ORGS.length)],
                typeName: types[Math.floor(Math.random() * types.length)],
                config: JSON.stringify({ auto: Math.random() < 0.5, level: Math.floor(Math.random() * 5) + 1 })
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
            { key: "parentName", label: "上级名称", sortable: true }
        ];
        var ORG_DIALOG_COLUMNS = [
            { key: "_idx", label: "序号", sortable: true },
            { key: "name", label: "组织名称", sortable: true, link: true },
            { key: "status", label: "数据状态", sortable: true, badge: true },
            { key: "parentName", label: "上级名称", sortable: true }
        ];

        function mapOrgRows(rows) {
            return rows.map(function (r, idx) {
                return {
                    id: r.id,
                    name: r.name,
                    status: r.status,
                    parentName: r.parentName,
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
        function refreshDataTable(tabId) {
            if (window.__cqDataTable && TABLE_DEFS[tabId] && TABLE_DEFS[tabId].columns) {
                window.__cqDataTable.setData(tabId, TABLE_DEFS[tabId].rows);
            }
        }
        window.__CQ_TABLE_BOOT = function () {
            try {
            if (!window.__cqDataTable) return;
            var dt = window.__cqDataTable;
            ["quarterly", "annual", "config", "deduction", "partyQuarterly"].forEach(function (id) {
                dt.mount(id, "dt-" + id, TABLE_DEFS[id].columns, TABLE_DEFS[id].rows, {
                    pageSize: 10,
                    filterPlaceholder: "搜索" + TABLE_DEFS[id].label + "…",
                    filterHostId: "dt-filter-" + id
                });
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
            if (tabId === "org") renderOrgView();
            if (tabId === "deduction" && !deductionLoading && !deductionReady) {
                loadDeductionFromCq();
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
            TABLE_DEFS.quarterly.rows = [];
            TABLE_DEFS.annual.rows = [];
            TABLE_DEFS.config.rows = [];
            TABLE_DEFS.partyQuarterly.rows = [];
            for (var i = 0; i < 8; i++) TABLE_DEFS.quarterly.rows.push(randQuarterlyRow());
            for (var j = 0; j < 6; j++) TABLE_DEFS.annual.rows.push(randAnnualRow());
            for (var k = 0; k < 5; k++) TABLE_DEFS.config.rows.push(randConfigRow());
            for (var p = 0; p < 10; p++) TABLE_DEFS.partyQuarterly.rows.push(randPartyQuarterlyRow());
            ["quarterly", "annual", "config", "partyQuarterly"].forEach(refreshDataTable);
        }
        var alertTimer = 0;
        var alertLeaveTimer = 0;
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
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            host.innerHTML = "";
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
            alertTimer = setTimeout(function () {
                el.classList.add("is-leaving");
                alertLeaveTimer = setTimeout(function () {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    alertTimer = 0;
                    alertLeaveTimer = 0;
                }, 250);
            }, 5000);
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

        // 扣分项台账：selectTab(应用) → gotoapp(党费) → treeMenuClick → loadData。签名走父页 ajax。
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
        var deductionLoading = false;
        var deductionReady = false;
        var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
        var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };
        var watchedTenantPageId = "";
        var sessionWin = null;
        var cqDisposed = false;
        var fetchFrameTimer = 0;
        var onCqKeydown = null;

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
            } catch (e2) { }
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
            lastDeductionPayload = "";
            lastAppHomePayload = "";
            if (alertTimer) { clearTimeout(alertTimer); alertTimer = 0; }
            if (alertLeaveTimer) { clearTimeout(alertLeaveTimer); alertLeaveTimer = 0; }
            if (fetchFrameTimer) { clearTimeout(fetchFrameTimer); fetchFrameTimer = 0; }
            try { if (window.__cqDataTable && window.__cqDataTable.unmountAll) window.__cqDataTable.unmountAll(); } catch (e0) { }
            walkWindows(unhookFetchOn);
            sessionWin = null;
            removeFetchFrames();
            try { if (onCqKeydown) document.removeEventListener("keydown", onCqKeydown); } catch (e1) { }
            removeBundleScripts();
            try { window.__cqFetchDeduction = null; } catch (e2) { }
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
            if (sessionWin) {
                try { if (sessionWin.document) return sessionWin; } catch (e0) { }
            }
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
        function openFetchFrame() {
            return new Promise(function (resolve, reject) {
                if (cqDisposed) return reject(new Error("aborted"));
                removeFetchFrames();
                var iframe = document.createElement("iframe");
                iframe.id = "cq-fetch-frame";
                iframe.setAttribute("data-cq-fetch", "1");
                iframe.title = "cq-fetch";
                iframe.setAttribute("style", "position:fixed;left:0;top:0;width:1400px;height:900px;opacity:0;pointer-events:none;border:0;z-index:1;");
                var url = consoleHomeUrl();
                iframe.src = url;
                var settled = false;
                var startedWait = false;
                fetchFrameTimer = setTimeout(function () {
                    if (settled || cqDisposed) return;
                    settled = true;
                    reject(new Error("主控台 iframe 加载超时 " + url));
                }, 30000);
                iframe.onload = function () {
                    if (startedWait || settled || cqDisposed) return;
                    startedWait = true;
                    try { sessionWin = iframe.contentWindow; } catch (e) { }
                    hookParentForTenant();
                    waitFor(function () {
                        return findClickAnywhere("党费") || findClickAnywhere("应用");
                    }, 22000, 400, "主控台 iframe 中等待「应用/党费」").then(function (hit) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(fetchFrameTimer);
                        fetchFrameTimer = 0;
                        resolve(hit && hit.win ? hit.win : sessionWin);
                    }, function (err) {
                        if (settled || cqDisposed) return;
                        settled = true;
                        clearTimeout(fetchFrameTimer);
                        fetchFrameTimer = 0;
                        reject(err);
                    });
                };
                (pageDoc().body || pageDoc().documentElement).appendChild(iframe);
            });
        }
        function ensureSessionWin() {
            if (cqDisposed) return Promise.reject(new Error("aborted"));
            var existing = findClickAnywhere("党费") || findClickAnywhere("应用");
            var reuse = false;
            if (existing && existing.win) {
                var fromFetch = isFetchFrameWin(existing.win);
                try { if (!fromFetch && existing.win.top) fromFetch = isFetchFrameWin(existing.win.top); } catch (e0) { }
                reuse = !fromFetch;
            }
            if (reuse) {
                try { sessionWin = existing.win.top; } catch (e1) { sessionWin = existing.win; }
                clog("已有应用入口", safeHref(sessionWin));
                return Promise.resolve(sessionWin);
            }
            clog("打开隐藏主控台 iframe", consoleHomeUrl());
            return openFetchFrame();
        }
        var lastDeductionPayload = "";
        var lastAppHomePayload = "";
        function hookFetchOn(win) {
            if (!win || cqDisposed) return;
            if (win.__cqTenantHooked) return;
            if (typeof win.fetch !== "function") return;
            var orig = win.fetch.bind(win);
            win.__cqOrigFetch = orig;
            win.__cqTenantHooked = true;
            win.fetch = function (input, init) {
                if (cqDisposed) return orig(input, init);
                var url = typeof input === "string" ? input : (input && input.url);
                noteTenantFromUrl(url, init && init.body);
                return orig(input, init).then(function (res) {
                    if (cqDisposed) return res;
                    try {
                        var u = String(url || "");
                        if (u.indexOf("crrc_deduction_log") >= 0 && u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                if (text && !hasTimeoutText(text)) lastDeductionPayload = text;
                            }).catch(function () { });
                        }
                        if (u.indexOf("crrc_party_dues_apphome") >= 0 && u.indexOf("ac=loadData") >= 0) {
                            res.clone().text().then(function (text) {
                                if (cqDisposed) return;
                                if (text && !hasTimeoutText(text)) lastAppHomePayload = text;
                            }).catch(function () { });
                        }
                    } catch (e) { }
                    return res;
                });
            };
        }
        function hookParentForTenant() {
            var seen = [];
            function walk(win, depth) {
                if (!win || depth > 6) return;
                var s;
                for (s = 0; s < seen.length; s++) if (seen[s] === win) return;
                seen.push(win);
                try { hookFetchOn(win); } catch (e) { }
                try {
                    var frames = win.frames;
                    var f;
                    for (f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
                } catch (e2) { }
            }
            walk(parentWin(), 0);
            walk(hostWin(), 0);
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
        function cqInvoke(appId, formId, action, pageId, params) {
            var origin = cqOrigin();
            var url = origin + "/ierp/form/batchInvokeAction.do?appId=" + encodeURIComponent(appId)
                + "&f=" + encodeURIComponent(formId) + "&ac=" + encodeURIComponent(action);
            var payload = {
                pageId: pageId,
                appId: appId,
                params: JSON.stringify(params)
            };
            var jq = null;
            try { jq = parentWin().jQuery || parentWin().$; } catch (e) { }
            return new Promise(function (resolve, reject) {
                if (jq && typeof jq.ajax === "function") {
                    jq.ajax({
                        url: url,
                        type: "POST",
                        data: payload,
                        xhrFields: { withCredentials: true },
                        headers: { ajax: "true", cqappid: appId },
                        success: function (data) {
                            var s = "";
                            try { s = typeof data === "string" ? data : JSON.stringify(data); } catch (e) { s = String(data); }
                            if (hasTimeoutText(s)) reject(new Error("表单会话超时"));
                            else resolve(data);
                        },
                        error: function (xhr, status, err) {
                            var body = xhr && xhr.responseText ? String(xhr.responseText).slice(0, 400) : "";
                            reject(new Error((status || "ajax") + " " + (err || "") + " " + body));
                        }
                    });
                    return;
                }
                var body = "pageId=" + encodeURIComponent(pageId)
                    + "&appId=" + encodeURIComponent(appId)
                    + "&params=" + encodeURIComponent(JSON.stringify(params));
                parentWin().fetch(url, {
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
                }).then(resolve, reject);
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
            if (key === "crrc_radiooptgroupfield" || key.indexOf("radioopt") >= 0) {
                var pd = String(cqCell(raw));
                return PERIOD_TEXT[pd] || pd;
            }
            if (key === "crrc_datefield" || key.indexOf("datefield") >= 0) {
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
            return v == null ? "" : v;
        }
        function collectDeductionCaptions(payload, pack) {
            var map = {};
            walkCq(payload, function (obj) {
                if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
                var di = obj.dataindex != null ? obj.dataindex : (obj.dataIndex != null ? obj.dataIndex : obj.fieldId);
                var cap = obj.caption != null ? obj.caption : (obj.title != null ? obj.title : obj.header);
                if (typeof di === "string" && di && typeof cap === "string" && cap) {
                    if (!map[di]) map[di] = cap;
                }
            }, 0, []);
            var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
            if (Array.isArray(packCols)) {
                for (var i = 0; i < packCols.length; i++) {
                    var col = packCols[i];
                    if (!col || typeof col !== "object") continue;
                    var cdi = col.dataindex || col.dataIndex || col.fieldId;
                    var ccap = col.caption || col.title || col.header;
                    if (typeof cdi === "string" && cdi && typeof ccap === "string" && ccap) map[cdi] = ccap;
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
                return { key: key, label: label, sortable: true, numeric: numeric, badge: badge, compact: compact };
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
            hookParentForTenant();
            var trail = [];
            function step(name, info) {
                trail.push({ name: name, info: info || null });
                clog("step", name, info || "");
            }
            var task = Promise.resolve().then(function () {
                if (cqDisposed) throw new Error("aborted");
                return ensureSessionWin();
            }).then(function () {
                if (cqDisposed) throw new Error("aborted");
                hookParentForTenant();
                var consolePageId = findConsolePageId();
                var suffix = extractRootSuffix(consolePageId);
                step("session", {
                    consolePageId: consolePageId,
                    suffix: suffix,
                    sessionHref: safeHref(sessionWin || parentWin())
                });
                clog("扣分项 consolePageId", consolePageId, "suffix", suffix, "session", safeHref(sessionWin || parentWin()));
                if (!consolePageId || !suffix) {
                    throw new Error("未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。");
                }
                var menuPageId = CQ_DEDUCTION.menuAppId + suffix;
                var listPageId = CQ_DEDUCTION.menuItemId + suffix;
                lastDeductionPayload = "";
                lastAppHomePayload = "";
                function treeMenuThenLoad() {
                    step("treeMenuThenLoad", { menuPageId: menuPageId, listPageId: listPageId });
                    return cqInvoke(
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
                            CQ_DEDUCTION.dataAppId,
                            CQ_DEDUCTION.dataFormId,
                            "loadData",
                            listPageId,
                            [{ key: "", methodName: "loadData", args: [], postData: [] }]
                        );
                    });
                }
                return Promise.resolve().then(function () {
                    var alreadyParty = findClickAnywhere("党费");
                    var appHit = findClickAnywhere("应用", ".kd-cq-homepage-tab-item-text") || findClickAnywhere("应用");
                    step("before-click-app", { alreadyParty: !!alreadyParty, hasApp: !!appHit });
                    if (alreadyParty) return;
                    if (appHit) {
                        clog("点击应用");
                        fireParentClick(appHit.el, appHit.win);
                    }
                }).then(function () {
                    return waitFor(function () { return findClickAnywhere("党费"); }, 15000, 250, "等待出现「党费」入口");
                }).then(function (partyHit) {
                    clog("点击党费");
                    step("click-party", { ok: !!(partyHit && partyHit.el) });
                    fireParentClick(partyHit.el, partyHit.win);
                    return waitFor(function () { return lastAppHomePayload; }, 15000, 250, "等待党费首页 loadData").catch(function () {
                        clog("未捕获到党费首页 loadData，仍继续");
                        step("app-home-payload-miss", { lastAppHomeLen: String(lastAppHomePayload || "").length });
                        return new Promise(function (resolve) { setTimeout(resolve, 1500); });
                    });
                }).then(function () {
                    return new Promise(function (resolve) { setTimeout(resolve, 400); });
                }).then(function () {
                    var menuHit = findClickAnywhere("扣分项台账");
                    step("find-menu", { hasMenu: !!(menuHit && menuHit.el) });
                    if (menuHit) {
                        clog("点击扣分项台账");
                        fireParentClick(menuHit.el, menuHit.win);
                        return waitFor(function () { return lastDeductionPayload; }, 15000, 250, "等待扣分项 loadData").catch(function () {
                            clog("点击后未捕获列表 loadData，改请求链");
                            step("click-menu-no-payload", {});
                            return treeMenuThenLoad();
                        });
                    }
                    return treeMenuThenLoad();
                }).then(function (res) {
                    if (cqDisposed) return [];
                    var data = parseMaybeJson(lastDeductionPayload || res);
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
        try { parentWin().__cqFetchDeduction = loadDeductionFromCq; } catch (e) { }
        try { window.__cqDisposeOverlay = disposeCqResources; } catch (eDisp) { }

        // ---------- 党组织：树 + 表（布局对齐官方选择器，样式走当前 shadcn 主题） ----------
        var orgState = {
            activeId: "crrc-dw",
            expanded: { all: true, "crrc-dw": true },
            includeSelf: false,
            selected: {},
            page: 1,
            pageSize: 100
        };
        var orgViewState = {
            activeId: "crrc-dw",
            expanded: { all: true, "crrc-dw": true }
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
                rows.push({
                    id: node.id,
                    name: node.name,
                    status: node.status || "已审核",
                    parentName: p && p.id !== "all" ? p.name : ""
                });
            }
            (node.children || []).forEach(function (c) {
                rows.push({
                    id: c.id,
                    name: c.name,
                    status: c.status || "已审核",
                    parentName: node.id === "all" ? "" : node.name
                });
            });
            return rows;
        }
        function orgViewTableSource() {
            var meta = findOrgMeta(orgViewState.activeId);
            var node = meta ? meta.node : ORG_TREE;
            var rows = [];
            (node.children || []).forEach(function (c) {
                rows.push({
                    id: c.id,
                    name: c.name,
                    status: c.status || "已审核",
                    parentName: node.id === "all" ? "" : node.name
                });
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
            orgState.activeId = "crrc-dw";
            orgState.expanded = { all: true, "crrc-dw": true };
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
        function renderConfigPanel() {
            if (!dlgConfigPanel || !dlgType) return;
            var type = dlgType.value;
            configDraft = defaultConfigForType(type);
            if (isPartyPerfType(type)) renderPartyPerfPanel(configDraft);
            else if (isExcellenceType(type)) renderExcellencePanel(configDraft, type);
            else if (isGrassrootsType(type)) renderGrassrootsPanel(configDraft);
            else dlgConfigPanel.innerHTML = "";
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
        function buildConfigJson(type, data) {
            return JSON.stringify({ type: type, typeName: CONFIG_TYPES[type] || type, config: data });
        }

        function openDialog() {
            if (!dlg) { clog("弹窗元素不存在 #dlg-overlay"); return; }
            if (dlgType) dlgType.selectedIndex = 0;
            renderConfigPanel();
            resetOrgPicker();
            dlg.hidden = false;
            if (dlgType) dlgType.focus();
        }
        function closeDialog() {
            if (dlg) dlg.hidden = true;
        }
        if (dlgType) dlgType.onchange = renderConfigPanel;
        bind("tblnew", async () => {
            var selfBtn = document.getElementById("tblnew");
            var got = await waitEl("tblnew");
            var addBtn = got.getElement();
            if (!addBtn) {
                setStatus("未找到父页面 #tblnew，父页面新增逻辑未执行");
                clog("wait('tblnew') 在父页面未找到元素");
                return;
            }
            // 本地单独打开 index.html 时 parent === 当前页，#tblnew 就是自己，不能再 click 以免递归
            if (addBtn !== selfBtn) {
                addBtn.click();
                clog("已 click 父页面 #tblnew", addBtn.tagName);
            } else {
                clog("父页面 #tblnew 与当前按钮为同一元素（本地预览），跳过 click");
            }
            openDialog();
            setStatus("已触发父页面新增，请填写配置项");
        });
        bind("dlg-close", closeDialog);
        bind("dlg-cancel", closeDialog);
        // 点遮罩关闭（与 shadcn Dialog 行为一致）
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) closeDialog();
            });
        }
        bind("dlg-ok", () => {
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
            var cfg = buildConfigJson(type, configDraft);
            var org = names.join("、");
            var no = randNo("CQ");
            TABLE_DEFS.config.rows.unshift({
                no: no,
                statusText: "暂存",
                statusCode: "A",
                org: org,
                typeName: typeName,
                config: cfg
            });
            refreshDataTable("config");
            switchTab("config");
            closeDialog();
            setStatus("已新增「" + org + " / " + typeName + "」 " + no);
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
