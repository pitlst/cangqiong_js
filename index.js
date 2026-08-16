
(() => {
    const DT_BUNDLE = `(()=>{var If=Object.create;var Iu=Object.defineProperty;var zf=Object.getOwnPropertyDescriptor;var Nf=Object.getOwnPropertyNames;var Lf=Object.getPrototypeOf,Vf=Object.prototype.hasOwnProperty;var Pt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var $f=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Nf(t))!Vf.call(e,l)&&l!==n&&Iu(e,l,{get:()=>t[l],enumerable:!(r=zf(t,l))||r.enumerable});return e};var mr=(e,t,n)=>(n=e!=null?If(Lf(e)):{},$f(t||!e||!e.__esModule?Iu(n,"default",{value:e,enumerable:!0}):n,e));var Bu=Pt(z=>{"use strict";var wn=Symbol.for("react.element"),Df=Symbol.for("react.portal"),Tf=Symbol.for("react.fragment"),Of=Symbol.for("react.strict_mode"),Hf=Symbol.for("react.profiler"),Af=Symbol.for("react.provider"),jf=Symbol.for("react.context"),Bf=Symbol.for("react.forward_ref"),Uf=Symbol.for("react.suspense"),Gf=Symbol.for("react.memo"),Wf=Symbol.for("react.lazy"),zu=Symbol.iterator;function Qf(e){return e===null||typeof e!="object"?null:(e=zu&&e[zu]||e["@@iterator"],typeof e=="function"?e:null)}var Vu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$u=Object.assign,Du={};function Ut(e,t,n){this.props=e,this.context=t,this.refs=Du,this.updater=n||Vu}Ut.prototype.isReactComponent={};Ut.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ut.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Tu(){}Tu.prototype=Ut.prototype;function Wl(e,t,n){this.props=e,this.context=t,this.refs=Du,this.updater=n||Vu}var Ql=Wl.prototype=new Tu;Ql.constructor=Wl;$u(Ql,Ut.prototype);Ql.isPureReactComponent=!0;var Nu=Array.isArray,Ou=Object.prototype.hasOwnProperty,Kl={current:null},Hu={key:!0,ref:!0,__self:!0,__source:!0};function Au(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Ou.call(t,r)&&!Hu.hasOwnProperty(r)&&(l[r]=t[r]);var u=arguments.length-2;if(u===1)l.children=n;else if(1<u){for(var s=Array(u),a=0;a<u;a++)s[a]=arguments[a+2];l.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)l[r]===void 0&&(l[r]=u[r]);return{$typeof:wn,type:e,key:o,ref:i,props:l,_owner:Kl.current}}function Kf(e,t){return{$typeof:wn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Xl(e){return typeof e=="object"&&e!==null&&e.$typeof===wn}function Xf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Lu=/\\/+/g;function Gl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Xf(""+e.key):t.toString(36)}function vr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$typeof){case wn:case Df:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Gl(i,0):r,Nu(l)?(n="",e!=null&&(n=e.replace(Lu,"(() => {/")+"/"),vr(l,t,n,"",function(a){return a})):l!=null&&(Xl(l)&&(l=Kf(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Lu,"(() => {/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",Nu(e))for(var u=0;u<e.length;u++){o=e[u];var s=r+Gl(o,u);i+=vr(o,t,n,s,l)}else if(s=Qf(e),typeof s=="function")for(e=s.call(e),u=0;!(o=e.next()).done;)o=o.value,s=r+Gl(o,u++),i+=vr(o,t,n,s,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function hr(e,t,n){if(e==null)return e;var r=[],l=0;return vr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function qf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},yr={transition:null},Yf={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:yr,ReactCurrentOwner:Kl};function ju(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:hr,forEach:function(e,t,n){hr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return hr(e,function(){t++}),t},toArray:function(e){return hr(e,function(t){return t})||[]},only:function(e){if(!Xl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=Ut;z.Fragment=Tf;z.Profiler=Hf;z.PureComponent=Wl;z.StrictMode=Of;z.Suspense=Uf;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Yf;z.act=ju;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=$u({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Kl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)Ou.call(t,s)&&!Hu.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&u!==void 0?u[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){u=Array(s);for(var a=0;a<s;a++)u[a]=arguments[a+2];r.children=u}return{$typeof:wn,type:e.type,key:l,ref:o,props:r,_owner:i}};z.createContext=function(e){return e={$typeof:jf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$typeof:Af,_context:e},e.Consumer=e};z.createElement=Au;z.createFactory=function(e){var t=Au.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$typeof:Bf,render:e}};z.isValidElement=Xl;z.lazy=function(e){return{$typeof:Wf,_payload:{_status:-1,_result:e},_init:qf}};z.memo=function(e,t){return{$typeof:Gf,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=yr.transition;yr.transition={};try{e()}finally{yr.transition=t}};z.unstable_act=ju;z.useCallback=function(e,t){return ue.current.useCallback(e,t)};z.useContext=function(e){return ue.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};z.useEffect=function(e,t){return ue.current.useEffect(e,t)};z.useId=function(){return ue.current.useId()};z.useImperativeHandle=function(e,t,n){return ue.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return ue.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return ue.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return ue.current.useMemo(e,t)};z.useReducer=function(e,t,n){return ue.current.useReducer(e,t,n)};z.useRef=function(e){return ue.current.useRef(e)};z.useState=function(e){return ue.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return ue.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return ue.current.useTransition()};z.version="18.3.1"});var Sr=Pt((qp,Uu)=>{"use strict";Uu.exports=Bu()});var bu=Pt($=>{"use strict";function Jl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<wr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function ze(e){return e.length===0?null:e[0]}function Rr(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,u=e[i],s=i+1,a=e[s];if(0>wr(u,n))s<l&&0>wr(a,u)?(e[r]=a,e[s]=n,r=s):(e[r]=u,e[i]=n,r=i);else if(s<l&&0>wr(a,n))e[r]=a,e[s]=n,r=s;else break e}}return t}function wr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Gu=performance,$.unstable_now=function(){return Gu.now()}):(ql=Date,Wu=ql.now(),$.unstable_now=function(){return ql.now()-Wu});var Gu,ql,Wu,je=[],lt=[],Zf=1,ke=null,te=3,_r=!1,Ft=!1,Rn=!1,Xu=typeof setTimeout=="function"?setTimeout:null,qu=typeof clearTimeout=="function"?clearTimeout:null,Qu=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function bl(e){for(var t=ze(lt);t!==null;){if(t.callback===null)Rr(lt);else if(t.startTime<=e)Rr(lt),t.sortIndex=t.expirationTime,Jl(je,t);else break;t=ze(lt)}}function eo(e){if(Rn=!1,bl(e),!Ft)if(ze(je)!==null)Ft=!0,no(to);else{var t=ze(lt);t!==null&&ro(eo,t.startTime-e)}}function to(e,t){Ft=!1,Rn&&(Rn=!1,qu(_n),_n=-1),_r=!0;var n=te;try{for(bl(t),ke=ze(je);ke!==null&&(!(ke.expirationTime>t)||e&&!Ju());){var r=ke.callback;if(typeof r=="function"){ke.callback=null,te=ke.priorityLevel;var l=r(ke.expirationTime<=t);t=$.unstable_now(),typeof l=="function"?ke.callback=l:ke===ze(je)&&Rr(je),bl(t)}else Rr(je);ke=ze(je)}if(ke!==null)var o=!0;else{var i=ze(lt);i!==null&&ro(eo,i.startTime-t),o=!1}return o}finally{ke=null,te=n,_r=!1}}var kr=!1,Cr=null,_n=-1,Yu=5,Zu=-1;function Ju(){return!($.unstable_now()-Zu<Yu)}function Yl(){if(Cr!==null){var e=$.unstable_now();Zu=e;var t=!0;try{t=Cr(!0,e)}finally{t?Cn():(kr=!1,Cr=null)}}else kr=!1}var Cn;typeof Qu=="function"?Cn=function(){Qu(Yl)}:typeof MessageChannel!="undefined"?(Zl=new MessageChannel,Ku=Zl.port2,Zl.port1.onmessage=Yl,Cn=function(){Ku.postMessage(null)}):Cn=function(){Xu(Yl,0)};var Zl,Ku;function no(e){Cr=e,kr||(kr=!0,Cn())}function ro(e,t){_n=Xu(function(){e($.unstable_now())},t)}$.unstable_IdlePriority=5;$.unstable_ImmediatePriority=1;$.unstable_LowPriority=4;$.unstable_NormalPriority=3;$.unstable_Profiling=null;$.unstable_UserBlockingPriority=2;$.unstable_cancelCallback=function(e){e.callback=null};$.unstable_continueExecution=function(){Ft||_r||(Ft=!0,no(to))};$.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Yu=0<e?Math.floor(1e3/e):5};$.unstable_getCurrentPriorityLevel=function(){return te};$.unstable_getFirstCallbackNode=function(){return ze(je)};$.unstable_next=function(e){switch(te){case 1:case 2:case 3:var t=3;break;default:t=te}var n=te;te=t;try{return e()}finally{te=n}};$.unstable_pauseExecution=function(){};$.unstable_requestPaint=function(){};$.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=te;te=e;try{return t()}finally{te=n}};$.unstable_scheduleCallback=function(e,t,n){var r=$.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:Zf++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,Jl(lt,e),ze(je)===null&&e===ze(lt)&&(Rn?(qu(_n),_n=-1):Rn=!0,ro(eo,n-r))):(e.sortIndex=l,Jl(je,e),Ft||_r||(Ft=!0,no(to))),e};$.unstable_shouldYield=Ju;$.unstable_wrapCallback=function(e){var t=te;return function(){var n=te;te=t;try{return e.apply(this,arguments)}finally{te=n}}}});var ts=Pt((Zp,es)=>{"use strict";es.exports=bu()});var of=Pt(Ce=>{"use strict";var Jf=Sr(),Se=ts();function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sa=new Set,Wn={};function jt(e,t){fn(e,t),fn(e+"Capture",t)}function fn(e,t){for(Wn[e]=t,e=0;e<t.length;e++)sa.add(t[e])}var Je=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),Po=Object.prototype.hasOwnProperty,bf=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,ns={},rs={};function ed(e){return Po.call(rs,e)?!0:Po.call(ns,e)?!1:bf.test(e)?rs[e]=!0:(ns[e]=!0,!1)}function td(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function nd(e,t,n,r){if(t===null||typeof t=="undefined"||td(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ce(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ee[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ee[t]=new ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ee[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ee[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ee[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ee[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ee[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ee[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ee[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var Si=/[\\-:]([a-z])/g;function wi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Si,wi);ee[t]=new ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Si,wi);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Si,wi);ee[t]=new ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});ee.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ee[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ci(e,t,n,r){var l=ee.hasOwnProperty(t)?ee[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(nd(t,n,l,r)&&(n=null),r||l===null?ed(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var nt=Jf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Er=Symbol.for("react.element"),Qt=Symbol.for("react.portal"),Kt=Symbol.for("react.fragment"),Ri=Symbol.for("react.strict_mode"),Fo=Symbol.for("react.profiler"),aa=Symbol.for("react.provider"),ca=Symbol.for("react.context"),_i=Symbol.for("react.forward_ref"),Mo=Symbol.for("react.suspense"),Io=Symbol.for("react.suspense_list"),ki=Symbol.for("react.memo"),it=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var fa=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var ls=Symbol.iterator;function kn(e){return e===null||typeof e!="object"?null:(e=ls&&e[ls]||e["@@iterator"],typeof e=="function"?e:null)}var G=Object.assign,lo;function Nn(e){if(lo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\\n( *(at )?)/);lo=t&&t[1]||""}return\`
\`+lo+e}var oo=!1;function io(e,t){if(!e||oo)return"";oo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(a){var r=a}Reflect.construct(e,[],t)}else{try{t.call()}catch(a){r=a}e.call(t.prototype)}else{try{throw Error()}catch(a){r=a}e()}}catch(a){if(a&&r&&typeof a.stack=="string"){for(var l=a.stack.split(\`
\`),o=r.stack.split(\`
\`),i=l.length-1,u=o.length-1;1<=i&&0<=u&&l[i]!==o[u];)u--;for(;1<=i&&0<=u;i--,u--)if(l[i]!==o[u]){if(i!==1||u!==1)do if(i--,u--,0>u||l[i]!==o[u]){var s=\`
\`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=u);break}}}finally{oo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Nn(e):""}function rd(e){switch(e.tag){case 5:return Nn(e.type);case 16:return Nn("Lazy");case 13:return Nn("Suspense");case 19:return Nn("SuspenseList");case 0:case 2:case 15:return e=io(e.type,!1),e;case 11:return e=io(e.type.render,!1),e;case 1:return e=io(e.type,!0),e;default:return""}}function zo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Kt:return"Fragment";case Qt:return"Portal";case Fo:return"Profiler";case Ri:return"StrictMode";case Mo:return"Suspense";case Io:return"SuspenseList"}if(typeof e=="object")switch(e.$typeof){case ca:return(e.displayName||"Context")+".Consumer";case aa:return(e._context.displayName||"Context")+".Provider";case _i:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ki:return t=e.displayName||null,t!==null?t:zo(e.type)||"Memo";case it:t=e._payload,e=e._init;try{return zo(e(t))}catch(n){}}return null}function ld(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return zo(t);case 8:return t===Ri?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function wt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function da(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function od(e){var t=da(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function xr(e){e._valueTracker||(e._valueTracker=od(e))}function ga(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=da(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function el(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch(t){return e.body}}function No(e,t){var n=t.checked;return G({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function os(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=wt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pa(e,t){t=t.checked,t!=null&&Ci(e,"checked",t,!1)}function Lo(e,t){pa(e,t);var n=wt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Vo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Vo(e,t.type,wt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function is(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Vo(e,t,n){(t!=="number"||el(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ln=Array.isArray;function ln(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+wt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function $o(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(w(91));return G({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function us(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(w(92));if(Ln(n)){if(1<n.length)throw Error(w(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:wt(n)}}function ma(e,t){var n=wt(t.value),r=wt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ss(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ha(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Do(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ha(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Pr,va=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Pr=Pr||document.createElement("div"),Pr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Pr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Qn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Dn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},id=["Webkit","ms","Moz","O"];Object.keys(Dn).forEach(function(e){id.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Dn[t]=Dn[e]})});function ya(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Dn.hasOwnProperty(e)&&Dn[e]?(""+t).trim():t+"px"}function Sa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ya(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var ud=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function To(e,t){if(t){if(ud[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(w(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(w(61))}if(t.style!=null&&typeof t.style!="object")throw Error(w(62))}}function Oo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ho=null;function Ei(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ao=null,on=null,un=null;function as(e){if(e=cr(e)){if(typeof Ao!="function")throw Error(w(280));var t=e.stateNode;t&&(t=Fl(t),Ao(e.stateNode,e.type,t))}}function wa(e){on?un?un.push(e):un=[e]:on=e}function Ca(){if(on){var e=on,t=un;if(un=on=null,as(e),t)for(e=0;e<t.length;e++)as(t[e])}}function Ra(e,t){return e(t)}function _a(){}var uo=!1;function ka(e,t,n){if(uo)return e(t,n);uo=!0;try{return Ra(e,t,n)}finally{uo=!1,(on!==null||un!==null)&&(_a(),Ca())}}function Kn(e,t){var n=e.stateNode;if(n===null)return null;var r=Fl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(w(231,t,typeof n));return n}var jo=!1;if(Je)try{Gt={},Object.defineProperty(Gt,"passive",{get:function(){jo=!0}}),window.addEventListener("test",Gt,Gt),window.removeEventListener("test",Gt,Gt)}catch(e){jo=!1}var Gt;function sd(e,t,n,r,l,o,i,u,s){var a=Array.prototype.slice.call(arguments,3);try{t.apply(n,a)}catch(p){this.onError(p)}}var Tn=!1,tl=null,nl=!1,Bo=null,ad={onError:function(e){Tn=!0,tl=e}};function cd(e,t,n,r,l,o,i,u,s){Tn=!1,tl=null,sd.apply(ad,arguments)}function fd(e,t,n,r,l,o,i,u,s){if(cd.apply(this,arguments),Tn){if(Tn){var a=tl;Tn=!1,tl=null}else throw Error(w(198));nl||(nl=!0,Bo=a)}}function Bt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ea(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cs(e){if(Bt(e)!==e)throw Error(w(188))}function dd(e){var t=e.alternate;if(!t){if(t=Bt(e),t===null)throw Error(w(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return cs(l),e;if(o===r)return cs(l),t;o=o.sibling}throw Error(w(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,u=l.child;u;){if(u===n){i=!0,n=l,r=o;break}if(u===r){i=!0,r=l,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=l;break}if(u===r){i=!0,r=o,n=l;break}u=u.sibling}if(!i)throw Error(w(189))}}if(n.alternate!==r)throw Error(w(190))}if(n.tag!==3)throw Error(w(188));return n.stateNode.current===n?e:t}function xa(e){return e=dd(e),e!==null?Pa(e):null}function Pa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pa(e);if(t!==null)return t;e=e.sibling}return null}var Fa=Se.unstable_scheduleCallback,fs=Se.unstable_cancelCallback,gd=Se.unstable_shouldYield,pd=Se.unstable_requestPaint,Q=Se.unstable_now,md=Se.unstable_getCurrentPriorityLevel,xi=Se.unstable_ImmediatePriority,Ma=Se.unstable_UserBlockingPriority,rl=Se.unstable_NormalPriority,hd=Se.unstable_LowPriority,Ia=Se.unstable_IdlePriority,kl=null,We=null;function vd(e){if(We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(kl,e,void 0,(e.current.flags&128)===128)}catch(t){}}var De=Math.clz32?Math.clz32:wd,yd=Math.log,Sd=Math.LN2;function wd(e){return e>>>=0,e===0?32:31-(yd(e)/Sd|0)|0}var Fr=64,Mr=4194304;function Vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ll(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~l;u!==0?r=Vn(u):(o&=i,o!==0&&(r=Vn(o)))}else i=n&~l,i!==0?r=Vn(i):o!==0&&(r=Vn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-De(t),l=1<<n,r|=e[n],t&=~l;return r}function Cd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-De(o),u=1<<i,s=l[i];s===-1?((u&n)===0||(u&r)!==0)&&(l[i]=Cd(u,t)):s<=t&&(e.expiredLanes|=u),o&=~u}}function Uo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function za(){var e=Fr;return Fr<<=1,(Fr&4194240)===0&&(Fr=64),e}function so(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function sr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-De(t),e[t]=n}function _d(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-De(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Pi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-De(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var V=0;function Na(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var La,Fi,Va,$a,Da,Go=!1,Ir=[],dt=null,gt=null,pt=null,Xn=new Map,qn=new Map,st=[],kd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ds(e,t){switch(e){case"focusin":case"focusout":dt=null;break;case"dragenter":case"dragleave":gt=null;break;case"mouseover":case"mouseout":pt=null;break;case"pointerover":case"pointerout":Xn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":qn.delete(t.pointerId)}}function En(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=cr(t),t!==null&&Fi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Ed(e,t,n,r,l){switch(t){case"focusin":return dt=En(dt,e,t,n,r,l),!0;case"dragenter":return gt=En(gt,e,t,n,r,l),!0;case"mouseover":return pt=En(pt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Xn.set(o,En(Xn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,qn.set(o,En(qn.get(o)||null,e,t,n,r,l)),!0}return!1}function Ta(e){var t=zt(e.target);if(t!==null){var n=Bt(t);if(n!==null){if(t=n.tag,t===13){if(t=Ea(n),t!==null){e.blockedOn=t,Da(e.priority,function(){Va(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Gr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Wo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ho=r,n.target.dispatchEvent(r),Ho=null}else return t=cr(n),t!==null&&Fi(t),e.blockedOn=n,!1;t.shift()}return!0}function gs(e,t,n){Gr(e)&&n.delete(t)}function xd(){Go=!1,dt!==null&&Gr(dt)&&(dt=null),gt!==null&&Gr(gt)&&(gt=null),pt!==null&&Gr(pt)&&(pt=null),Xn.forEach(gs),qn.forEach(gs)}function xn(e,t){e.blockedOn===t&&(e.blockedOn=null,Go||(Go=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,xd)))}function Yn(e){function t(l){return xn(l,e)}if(0<Ir.length){xn(Ir[0],e);for(var n=1;n<Ir.length;n++){var r=Ir[n];r.blockedOn===e&&(r.blockedOn=null)}}for(dt!==null&&xn(dt,e),gt!==null&&xn(gt,e),pt!==null&&xn(pt,e),Xn.forEach(t),qn.forEach(t),n=0;n<st.length;n++)r=st[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<st.length&&(n=st[0],n.blockedOn===null);)Ta(n),n.blockedOn===null&&st.shift()}var sn=nt.ReactCurrentBatchConfig,ol=!0;function Pd(e,t,n,r){var l=V,o=sn.transition;sn.transition=null;try{V=1,Mi(e,t,n,r)}finally{V=l,sn.transition=o}}function Fd(e,t,n,r){var l=V,o=sn.transition;sn.transition=null;try{V=4,Mi(e,t,n,r)}finally{V=l,sn.transition=o}}function Mi(e,t,n,r){if(ol){var l=Wo(e,t,n,r);if(l===null)ho(e,t,r,il,n),ds(e,r);else if(Ed(l,e,t,n,r))r.stopPropagation();else if(ds(e,r),t&4&&-1<kd.indexOf(e)){for(;l!==null;){var o=cr(l);if(o!==null&&La(o),o=Wo(e,t,n,r),o===null&&ho(e,t,r,il,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else ho(e,t,r,null,n)}}var il=null;function Wo(e,t,n,r){if(il=null,e=Ei(r),e=zt(e),e!==null)if(t=Bt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ea(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return il=e,null}function Oa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(md()){case xi:return 1;case Ma:return 4;case rl:case hd:return 16;case Ia:return 536870912;default:return 16}default:return 16}}var ct=null,Ii=null,Wr=null;function Ha(){if(Wr)return Wr;var e,t=Ii,n=t.length,r,l="value"in ct?ct.value:ct.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Wr=l.slice(e,1<r?1-r:void 0)}function Qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zr(){return!0}function ps(){return!1}function we(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(o):o[u]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?zr:ps,this.isPropagationStopped=ps,this}return G(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=zr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=zr)},persist:function(){},isPersistent:zr}),t}var yn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zi=we(yn),ar=G({},yn,{view:0,detail:0}),Md=we(ar),ao,co,Pn,El=G({},ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ni,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Pn&&(Pn&&e.type==="mousemove"?(ao=e.screenX-Pn.screenX,co=e.screenY-Pn.screenY):co=ao=0,Pn=e),ao)},movementY:function(e){return"movementY"in e?e.movementY:co}}),ms=we(El),Id=G({},El,{dataTransfer:0}),zd=we(Id),Nd=G({},ar,{relatedTarget:0}),fo=we(Nd),Ld=G({},yn,{animationName:0,elapsedTime:0,pseudoElement:0}),Vd=we(Ld),$d=G({},yn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Dd=we($d),Td=G({},yn,{data:0}),hs=we(Td),Od={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ad={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ad[e])?!!t[e]:!1}function Ni(){return jd}var Bd=G({},ar,{key:function(e){if(e.key){var t=Od[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ni,charCode:function(e){return e.type==="keypress"?Qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ud=we(Bd),Gd=G({},El,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vs=we(Gd),Wd=G({},ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ni}),Qd=we(Wd),Kd=G({},yn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=we(Kd),qd=G({},El,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Yd=we(qd),Zd=[9,13,27,32],Li=Je&&"CompositionEvent"in window,On=null;Je&&"documentMode"in document&&(On=document.documentMode);var Jd=Je&&"TextEvent"in window&&!On,Aa=Je&&(!Li||On&&8<On&&11>=On),ys=" ",Ss=!1;function ja(e,t){switch(e){case"keyup":return Zd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ba(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function bd(e,t){switch(e){case"compositionend":return Ba(t);case"keypress":return t.which!==32?null:(Ss=!0,ys);case"textInput":return e=t.data,e===ys&&Ss?null:e;default:return null}}function eg(e,t){if(Xt)return e==="compositionend"||!Li&&ja(e,t)?(e=Ha(),Wr=Ii=ct=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Aa&&t.locale!=="ko"?null:t.data;default:return null}}var tg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ws(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!tg[e.type]:t==="textarea"}function Ua(e,t,n,r){wa(r),t=ul(t,"onChange"),0<t.length&&(n=new zi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Hn=null,Zn=null;function ng(e){ec(e,0)}function xl(e){var t=Zt(e);if(ga(t))return e}function rg(e,t){if(e==="change")return t}var Ga=!1;Je&&(Je?(Lr="oninput"in document,Lr||(go=document.createElement("div"),go.setAttribute("oninput","return;"),Lr=typeof go.oninput=="function"),Nr=Lr):Nr=!1,Ga=Nr&&(!document.documentMode||9<document.documentMode));var Nr,Lr,go;function Cs(){Hn&&(Hn.detachEvent("onpropertychange",Wa),Zn=Hn=null)}function Wa(e){if(e.propertyName==="value"&&xl(Zn)){var t=[];Ua(t,Zn,e,Ei(e)),ka(ng,t)}}function lg(e,t,n){e==="focusin"?(Cs(),Hn=t,Zn=n,Hn.attachEvent("onpropertychange",Wa)):e==="focusout"&&Cs()}function og(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xl(Zn)}function ig(e,t){if(e==="click")return xl(t)}function ug(e,t){if(e==="input"||e==="change")return xl(t)}function sg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Oe=typeof Object.is=="function"?Object.is:sg;function Jn(e,t){if(Oe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Po.call(t,l)||!Oe(e[l],t[l]))return!1}return!0}function Rs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function _s(e,t){var n=Rs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Rs(n)}}function Qa(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qa(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ka(){for(var e=window,t=el();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch(r){n=!1}if(n)e=t.contentWindow;else break;t=el(e.document)}return t}function Vi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ag(e){var t=Ka(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Qa(n.ownerDocument.documentElement,n)){if(r!==null&&Vi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=_s(n,o);var i=_s(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var cg=Je&&"documentMode"in document&&11>=document.documentMode,qt=null,Qo=null,An=null,Ko=!1;function ks(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ko||qt==null||qt!==el(r)||(r=qt,"selectionStart"in r&&Vi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),An&&Jn(An,r)||(An=r,r=ul(Qo,"onSelect"),0<r.length&&(t=new zi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=qt)))}function Vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Yt={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionend:Vr("Transition","TransitionEnd")},po={},Xa={};Je&&(Xa=document.createElement("div").style,"AnimationEvent"in window||(delete Yt.animationend.animation,delete Yt.animationiteration.animation,delete Yt.animationstart.animation),"TransitionEvent"in window||delete Yt.transitionend.transition);function Pl(e){if(po[e])return po[e];if(!Yt[e])return e;var t=Yt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Xa)return po[e]=t[n];return e}var qa=Pl("animationend"),Ya=Pl("animationiteration"),Za=Pl("animationstart"),Ja=Pl("transitionend"),ba=new Map,Es="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){ba.set(e,t),jt(t,[e])}for($r=0;$r<Es.length;$r++)Dr=Es[$r],xs=Dr.toLowerCase(),Ps=Dr[0].toUpperCase()+Dr.slice(1),Rt(xs,"on"+Ps);var Dr,xs,Ps,$r;Rt(qa,"onAnimationEnd");Rt(Ya,"onAnimationIteration");Rt(Za,"onAnimationStart");Rt("dblclick","onDoubleClick");Rt("focusin","onFocus");Rt("focusout","onBlur");Rt(Ja,"onTransitionEnd");fn("onMouseEnter",["mouseout","mouseover"]);fn("onMouseLeave",["mouseout","mouseover"]);fn("onPointerEnter",["pointerout","pointerover"]);fn("onPointerLeave",["pointerout","pointerover"]);jt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jt("onBeforeInput",["compositionend","keypress","textInput","paste"]);jt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $n="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fg=new Set("cancel close invalid load scroll toggle".split(" ").concat($n));function Fs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,fd(r,t,void 0,e),e.currentTarget=null}function ec(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],s=u.instance,a=u.currentTarget;if(u=u.listener,s!==o&&l.isPropagationStopped())break e;Fs(l,u,a),o=s}else for(i=0;i<r.length;i++){if(u=r[i],s=u.instance,a=u.currentTarget,u=u.listener,s!==o&&l.isPropagationStopped())break e;Fs(l,u,a),o=s}}}if(nl)throw e=Bo,nl=!1,Bo=null,e}function T(e,t){var n=t[Jo];n===void 0&&(n=t[Jo]=new Set);var r=e+"__bubble";n.has(r)||(tc(t,e,2,!1),n.add(r))}function mo(e,t,n){var r=0;t&&(r|=4),tc(n,e,r,t)}var Tr="_reactListening"+Math.random().toString(36).slice(2);function bn(e){if(!e[Tr]){e[Tr]=!0,sa.forEach(function(n){n!=="selectionchange"&&(fg.has(n)||mo(n,!1,e),mo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Tr]||(t[Tr]=!0,mo("selectionchange",!1,t))}}function tc(e,t,n,r){switch(Oa(t)){case 1:var l=Pd;break;case 4:l=Fd;break;default:l=Mi}n=l.bind(null,t,n,e),l=void 0,!jo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function ho(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;u!==null;){if(i=zt(u),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}u=u.parentNode}}r=r.return}ka(function(){var a=o,p=Ei(n),h=[];e:{var d=ba.get(e);if(d!==void 0){var c=zi,v=e;switch(e){case"keypress":if(Qr(n)===0)break e;case"keydown":case"keyup":c=Ud;break;case"focusin":v="focus",c=fo;break;case"focusout":v="blur",c=fo;break;case"beforeblur":case"afterblur":c=fo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=ms;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=zd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=Qd;break;case qa:case Ya:case Za:c=Vd;break;case Ja:c=Xd;break;case"scroll":c=Md;break;case"wheel":c=Yd;break;case"copy":case"cut":case"paste":c=Dd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=vs}var y=(t&4)!==0,k=!y&&e==="scroll",g=y?d!==null?d+"Capture":null:d;y=[];for(var f=a,m;f!==null;){m=f;var S=m.stateNode;if(m.tag===5&&S!==null&&(m=S,g!==null&&(S=Kn(f,g),S!=null&&y.push(er(f,S,m)))),k)break;f=f.return}0<y.length&&(d=new c(d,v,null,n,p),h.push({event:d,listeners:y}))}}if((t&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",c=e==="mouseout"||e==="pointerout",d&&n!==Ho&&(v=n.relatedTarget||n.fromElement)&&(zt(v)||v[be]))break e;if((c||d)&&(d=p.window===p?p:(d=p.ownerDocument)?d.defaultView||d.parentWindow:window,c?(v=n.relatedTarget||n.toElement,c=a,v=v?zt(v):null,v!==null&&(k=Bt(v),v!==k||v.tag!==5&&v.tag!==6)&&(v=null)):(c=null,v=a),c!==v)){if(y=ms,S="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(y=vs,S="onPointerLeave",g="onPointerEnter",f="pointer"),k=c==null?d:Zt(c),m=v==null?d:Zt(v),d=new y(S,f+"leave",c,n,p),d.target=k,d.relatedTarget=m,S=null,zt(p)===a&&(y=new y(g,f+"enter",v,n,p),y.target=m,y.relatedTarget=k,S=y),k=S,c&&v)t:{for(y=c,g=v,f=0,m=y;m;m=Wt(m))f++;for(m=0,S=g;S;S=Wt(S))m++;for(;0<f-m;)y=Wt(y),f--;for(;0<m-f;)g=Wt(g),m--;for(;f--;){if(y===g||g!==null&&y===g.alternate)break t;y=Wt(y),g=Wt(g)}y=null}else y=null;c!==null&&Ms(h,d,c,y,!1),v!==null&&k!==null&&Ms(h,k,v,y,!0)}}e:{if(d=a?Zt(a):window,c=d.nodeName&&d.nodeName.toLowerCase(),c==="select"||c==="input"&&d.type==="file")var C=rg;else if(ws(d))if(Ga)C=ug;else{C=og;var E=lg}else(c=d.nodeName)&&c.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(C=ig);if(C&&(C=C(e,a))){Ua(h,C,n,p);break e}E&&E(e,d,a),e==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&Vo(d,"number",d.value)}switch(E=a?Zt(a):window,e){case"focusin":(ws(E)||E.contentEditable==="true")&&(qt=E,Qo=a,An=null);break;case"focusout":An=Qo=qt=null;break;case"mousedown":Ko=!0;break;case"contextmenu":case"mouseup":case"dragend":Ko=!1,ks(h,n,p);break;case"selectionchange":if(cg)break;case"keydown":case"keyup":ks(h,n,p)}var R;if(Li)e:{switch(e){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else Xt?ja(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(Aa&&n.locale!=="ko"&&(Xt||x!=="onCompositionStart"?x==="onCompositionEnd"&&Xt&&(R=Ha()):(ct=p,Ii="value"in ct?ct.value:ct.textContent,Xt=!0)),E=ul(a,x),0<E.length&&(x=new hs(x,e,null,n,p),h.push({event:x,listeners:E}),R?x.data=R:(R=Ba(n),R!==null&&(x.data=R)))),(R=Jd?bd(e,n):eg(e,n))&&(a=ul(a,"onBeforeInput"),0<a.length&&(p=new hs("onBeforeInput","beforeinput",null,n,p),h.push({event:p,listeners:a}),p.data=R))}ec(h,t)})}function er(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ul(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Kn(e,n),o!=null&&r.unshift(er(e,o,l)),o=Kn(e,t),o!=null&&r.push(er(e,o,l))),e=e.return}return r}function Wt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ms(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var u=n,s=u.alternate,a=u.stateNode;if(s!==null&&s===r)break;u.tag===5&&a!==null&&(u=a,l?(s=Kn(n,o),s!=null&&i.unshift(er(n,s,u))):l||(s=Kn(n,o),s!=null&&i.push(er(n,s,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var dg=/\\r\\n?/g,gg=/\\u0000|\\uFFFD/g;function Is(e){return(typeof e=="string"?e:""+e).replace(dg,\`
\`).replace(gg,"")}function Or(e,t,n){if(t=Is(t),Is(e)!==t&&n)throw Error(w(425))}function sl(){}var Xo=null,qo=null;function Yo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Zo=typeof setTimeout=="function"?setTimeout:void 0,pg=typeof clearTimeout=="function"?clearTimeout:void 0,zs=typeof Promise=="function"?Promise:void 0,mg=typeof queueMicrotask=="function"?queueMicrotask:typeof zs!="undefined"?function(e){return zs.resolve(null).then(e).catch(hg)}:Zo;function hg(e){setTimeout(function(){throw e})}function vo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Yn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Yn(t)}function mt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ns(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Sn=Math.random().toString(36).slice(2),Ge="__reactFiber$"+Sn,tr="__reactProps$"+Sn,be="__reactContainer$"+Sn,Jo="__reactEvents$"+Sn,vg="__reactListeners$"+Sn,yg="__reactHandles$"+Sn;function zt(e){var t=e[Ge];if(t)return t;for(var n=e.parentNode;n;){if(t=n[be]||n[Ge]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ns(e);e!==null;){if(n=e[Ge])return n;e=Ns(e)}return t}e=n,n=e.parentNode}return null}function cr(e){return e=e[Ge]||e[be],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function Fl(e){return e[tr]||null}var bo=[],Jt=-1;function _t(e){return{current:e}}function O(e){0>Jt||(e.current=bo[Jt],bo[Jt]=null,Jt--)}function D(e,t){Jt++,bo[Jt]=e.current,e.current=t}var Ct={},oe=_t(Ct),ge=_t(!1),Dt=Ct;function dn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function pe(e){return e=e.childContextTypes,e!=null}function al(){O(ge),O(oe)}function Ls(e,t,n){if(oe.current!==Ct)throw Error(w(168));D(oe,t),D(ge,n)}function nc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(w(108,ld(e)||"Unknown",l));return G({},n,r)}function cl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Dt=oe.current,D(oe,e),D(ge,ge.current),!0}function Vs(e,t,n){var r=e.stateNode;if(!r)throw Error(w(169));n?(e=nc(e,t,Dt),r.__reactInternalMemoizedMergedChildContext=e,O(ge),O(oe),D(oe,e)):O(ge),D(ge,n)}var Xe=null,Ml=!1,yo=!1;function rc(e){Xe===null?Xe=[e]:Xe.push(e)}function Sg(e){Ml=!0,rc(e)}function kt(){if(!yo&&Xe!==null){yo=!0;var e=0,t=V;try{var n=Xe;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xe=null,Ml=!1}catch(l){throw Xe!==null&&(Xe=Xe.slice(e+1)),Fa(xi,kt),l}finally{V=t,yo=!1}}return null}var bt=[],en=0,fl=null,dl=0,Ee=[],xe=0,Tt=null,qe=1,Ye="";function Mt(e,t){bt[en++]=dl,bt[en++]=fl,fl=e,dl=t}function lc(e,t,n){Ee[xe++]=qe,Ee[xe++]=Ye,Ee[xe++]=Tt,Tt=e;var r=qe;e=Ye;var l=32-De(r)-1;r&=~(1<<l),n+=1;var o=32-De(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,qe=1<<32-De(t)+l|n<<l|r,Ye=o+e}else qe=1<<o|n<<l|r,Ye=e}function $i(e){e.return!==null&&(Mt(e,1),lc(e,1,0))}function Di(e){for(;e===fl;)fl=bt[--en],bt[en]=null,dl=bt[--en],bt[en]=null;for(;e===Tt;)Tt=Ee[--xe],Ee[xe]=null,Ye=Ee[--xe],Ee[xe]=null,qe=Ee[--xe],Ee[xe]=null}var ye=null,ve=null,A=!1,$e=null;function oc(e,t){var n=Pe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function $s(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ye=e,ve=mt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ye=e,ve=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Tt!==null?{id:qe,overflow:Ye}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Pe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ye=e,ve=null,!0):!1;default:return!1}}function ei(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ti(e){if(A){var t=ve;if(t){var n=t;if(!$s(e,t)){if(ei(e))throw Error(w(418));t=mt(n.nextSibling);var r=ye;t&&$s(e,t)?oc(r,n):(e.flags=e.flags&-4097|2,A=!1,ye=e)}}else{if(ei(e))throw Error(w(418));e.flags=e.flags&-4097|2,A=!1,ye=e}}}function Ds(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ye=e}function Hr(e){if(e!==ye)return!1;if(!A)return Ds(e),A=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Yo(e.type,e.memoizedProps)),t&&(t=ve)){if(ei(e))throw ic(),Error(w(418));for(;t;)oc(e,t),t=mt(t.nextSibling)}if(Ds(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ve=mt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ve=null}}else ve=ye?mt(e.stateNode.nextSibling):null;return!0}function ic(){for(var e=ve;e;)e=mt(e.nextSibling)}function gn(){ve=ye=null,A=!1}function Ti(e){$e===null?$e=[e]:$e.push(e)}var wg=nt.ReactCurrentBatchConfig;function Fn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(w(309));var r=n.stateNode}if(!r)throw Error(w(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var u=l.refs;i===null?delete u[o]:u[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(w(284));if(!n._owner)throw Error(w(290,e))}return e}function Ar(e,t){throw e=Object.prototype.toString.call(t),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ts(e){var t=e._init;return t(e._payload)}function uc(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function n(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function r(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function l(g,f){return g=St(g,f),g.index=0,g.sibling=null,g}function o(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function i(g){return e&&g.alternate===null&&(g.flags|=2),g}function u(g,f,m,S){return f===null||f.tag!==6?(f=Eo(m,g.mode,S),f.return=g,f):(f=l(f,m),f.return=g,f)}function s(g,f,m,S){var C=m.type;return C===Kt?p(g,f,m.props.children,S,m.key):f!==null&&(f.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===it&&Ts(C)===f.type)?(S=l(f,m.props),S.ref=Fn(g,f,m),S.return=g,S):(S=br(m.type,m.key,m.props,null,g.mode,S),S.ref=Fn(g,f,m),S.return=g,S)}function a(g,f,m,S){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=xo(m,g.mode,S),f.return=g,f):(f=l(f,m.children||[]),f.return=g,f)}function p(g,f,m,S,C){return f===null||f.tag!==7?(f=$t(m,g.mode,S,C),f.return=g,f):(f=l(f,m),f.return=g,f)}function h(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Eo(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$typeof){case Er:return m=br(f.type,f.key,f.props,null,g.mode,m),m.ref=Fn(g,null,f),m.return=g,m;case Qt:return f=xo(f,g.mode,m),f.return=g,f;case it:var S=f._init;return h(g,S(f._payload),m)}if(Ln(f)||kn(f))return f=$t(f,g.mode,m,null),f.return=g,f;Ar(g,f)}return null}function d(g,f,m,S){var C=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return C!==null?null:u(g,f,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$typeof){case Er:return m.key===C?s(g,f,m,S):null;case Qt:return m.key===C?a(g,f,m,S):null;case it:return C=m._init,d(g,f,C(m._payload),S)}if(Ln(m)||kn(m))return C!==null?null:p(g,f,m,S,null);Ar(g,m)}return null}function c(g,f,m,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(m)||null,u(f,g,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$typeof){case Er:return g=g.get(S.key===null?m:S.key)||null,s(f,g,S,C);case Qt:return g=g.get(S.key===null?m:S.key)||null,a(f,g,S,C);case it:var E=S._init;return c(g,f,m,E(S._payload),C)}if(Ln(S)||kn(S))return g=g.get(m)||null,p(f,g,S,C,null);Ar(f,S)}return null}function v(g,f,m,S){for(var C=null,E=null,R=f,x=f=0,H=null;R!==null&&x<m.length;x++){R.index>x?(H=R,R=null):H=R.sibling;var N=d(g,R,m[x],S);if(N===null){R===null&&(R=H);break}e&&R&&N.alternate===null&&t(g,R),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N,R=H}if(x===m.length)return n(g,R),A&&Mt(g,x),C;if(R===null){for(;x<m.length;x++)R=h(g,m[x],S),R!==null&&(f=o(R,f,x),E===null?C=R:E.sibling=R,E=R);return A&&Mt(g,x),C}for(R=r(g,R);x<m.length;x++)H=c(R,g,x,m[x],S),H!==null&&(e&&H.alternate!==null&&R.delete(H.key===null?x:H.key),f=o(H,f,x),E===null?C=H:E.sibling=H,E=H);return e&&R.forEach(function(M){return t(g,M)}),A&&Mt(g,x),C}function y(g,f,m,S){var C=kn(m);if(typeof C!="function")throw Error(w(150));if(m=C.call(m),m==null)throw Error(w(151));for(var E=C=null,R=f,x=f=0,H=null,N=m.next();R!==null&&!N.done;x++,N=m.next()){R.index>x?(H=R,R=null):H=R.sibling;var M=d(g,R,N.value,S);if(M===null){R===null&&(R=H);break}e&&R&&M.alternate===null&&t(g,R),f=o(M,f,x),E===null?C=M:E.sibling=M,E=M,R=H}if(N.done)return n(g,R),A&&Mt(g,x),C;if(R===null){for(;!N.done;x++,N=m.next())N=h(g,N.value,S),N!==null&&(f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return A&&Mt(g,x),C}for(R=r(g,R);!N.done;x++,N=m.next())N=c(R,g,x,N.value,S),N!==null&&(e&&N.alternate!==null&&R.delete(N.key===null?x:N.key),f=o(N,f,x),E===null?C=N:E.sibling=N,E=N);return e&&R.forEach(function(j){return t(g,j)}),A&&Mt(g,x),C}function k(g,f,m,S){if(typeof m=="object"&&m!==null&&m.type===Kt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$typeof){case Er:e:{for(var C=m.key,E=f;E!==null;){if(E.key===C){if(C=m.type,C===Kt){if(E.tag===7){n(g,E.sibling),f=l(E,m.props.children),f.return=g,g=f;break e}}else if(E.elementType===C||typeof C=="object"&&C!==null&&C.$typeof===it&&Ts(C)===E.type){n(g,E.sibling),f=l(E,m.props),f.ref=Fn(g,E,m),f.return=g,g=f;break e}n(g,E);break}else t(g,E);E=E.sibling}m.type===Kt?(f=$t(m.props.children,g.mode,S,m.key),f.return=g,g=f):(S=br(m.type,m.key,m.props,null,g.mode,S),S.ref=Fn(g,f,m),S.return=g,g=S)}return i(g);case Qt:e:{for(E=m.key;f!==null;){if(f.key===E)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(g,f.sibling),f=l(f,m.children||[]),f.return=g,g=f;break e}else{n(g,f);break}else t(g,f);f=f.sibling}f=xo(m,g.mode,S),f.return=g,g=f}return i(g);case it:return E=m._init,k(g,f,E(m._payload),S)}if(Ln(m))return v(g,f,m,S);if(kn(m))return y(g,f,m,S);Ar(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(g,f.sibling),f=l(f,m),f.return=g,g=f):(n(g,f),f=Eo(m,g.mode,S),f.return=g,g=f),i(g)):n(g,f)}return k}var pn=uc(!0),sc=uc(!1),gl=_t(null),pl=null,tn=null,Oi=null;function Hi(){Oi=tn=pl=null}function Ai(e){var t=gl.current;O(gl),e._currentValue=t}function ni(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function an(e,t){pl=e,Oi=tn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(de=!0),e.firstContext=null)}function Me(e){var t=e._currentValue;if(Oi!==e)if(e={context:e,memoizedValue:t,next:null},tn===null){if(pl===null)throw Error(w(308));tn=e,pl.dependencies={lanes:0,firstContext:e}}else tn=tn.next=e;return t}var Nt=null;function ji(e){Nt===null?Nt=[e]:Nt.push(e)}function ac(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,ji(t)):(n.next=l.next,l.next=n),t.interleaved=n,et(e,r)}function et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ut=!1;function Bi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function cc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ze(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ht(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(L&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,et(e,n)}return l=r.interleaved,l===null?(t.next=t,ji(r)):(t.next=l.next,l.next=t),r.interleaved=t,et(e,n)}function Kr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Pi(e,n)}}function Os(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ml(e,t,n,r){var l=e.updateQueue;ut=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var s=u,a=s.next;s.next=null,i===null?o=a:i.next=a,i=s;var p=e.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==i&&(u===null?p.firstBaseUpdate=a:u.next=a,p.lastBaseUpdate=s))}if(o!==null){var h=l.baseState;i=0,p=a=s=null,u=o;do{var d=u.lane,c=u.eventTime;if((r&d)===d){p!==null&&(p=p.next={eventTime:c,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var v=e,y=u;switch(d=t,c=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){h=v.call(c,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,d=typeof v=="function"?v.call(c,h,d):v,d==null)break e;h=G({},h,d);break e;case 2:ut=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,d=l.effects,d===null?l.effects=[u]:d.push(u))}else c={eventTime:c,lane:d,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(a=p=c,s=h):p=p.next=c,i|=d;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;d=u,u=d.next,d.next=null,l.lastBaseUpdate=d,l.shared.pending=null}}while(!0);if(p===null&&(s=h),l.baseState=s,l.firstBaseUpdate=a,l.lastBaseUpdate=p,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);Ht|=i,e.lanes=i,e.memoizedState=h}}function Hs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(w(191,l));l.call(r)}}}var fr={},Qe=_t(fr),nr=_t(fr),rr=_t(fr);function Lt(e){if(e===fr)throw Error(w(174));return e}function Ui(e,t){switch(D(rr,t),D(nr,e),D(Qe,fr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Do(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Do(t,e)}O(Qe),D(Qe,t)}function mn(){O(Qe),O(nr),O(rr)}function fc(e){Lt(rr.current);var t=Lt(Qe.current),n=Do(t,e.type);t!==n&&(D(nr,e),D(Qe,n))}function Gi(e){nr.current===e&&(O(Qe),O(nr))}var B=_t(0);function hl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var So=[];function Wi(){for(var e=0;e<So.length;e++)So[e]._workInProgressVersionPrimary=null;So.length=0}var Xr=nt.ReactCurrentDispatcher,wo=nt.ReactCurrentBatchConfig,Ot=0,U=null,X=null,Y=null,vl=!1,jn=!1,lr=0,Cg=0;function ne(){throw Error(w(321))}function Qi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Oe(e[n],t[n]))return!1;return!0}function Ki(e,t,n,r,l,o){if(Ot=o,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xr.current=e===null||e.memoizedState===null?Eg:xg,e=n(r,l),jn){o=0;do{if(jn=!1,lr=0,25<=o)throw Error(w(301));o+=1,Y=X=null,t.updateQueue=null,Xr.current=Pg,e=n(r,l)}while(jn)}if(Xr.current=yl,t=X!==null&&X.next!==null,Ot=0,Y=X=U=null,vl=!1,t)throw Error(w(300));return e}function Xi(){var e=lr!==0;return lr=0,e}function Ue(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Y===null?U.memoizedState=Y=e:Y=Y.next=e,Y}function Ie(){if(X===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=Y===null?U.memoizedState:Y.next;if(t!==null)Y=t,X=e;else{if(e===null)throw Error(w(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},Y===null?U.memoizedState=Y=e:Y=Y.next=e}return Y}function or(e,t){return typeof t=="function"?t(e):t}function Co(e){var t=Ie(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=X,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var u=i=null,s=null,a=o;do{var p=a.lane;if((Ot&p)===p)s!==null&&(s=s.next={lane:0,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null}),r=a.hasEagerState?a.eagerState:e(r,a.action);else{var h={lane:p,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null};s===null?(u=s=h,i=r):s=s.next=h,U.lanes|=p,Ht|=p}a=a.next}while(a!==null&&a!==o);s===null?i=r:s.next=u,Oe(r,t.memoizedState)||(de=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,U.lanes|=o,Ht|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ro(e){var t=Ie(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Oe(o,t.memoizedState)||(de=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function dc(){}function gc(e,t){var n=U,r=Ie(),l=t(),o=!Oe(r.memoizedState,l);if(o&&(r.memoizedState=l,de=!0),r=r.queue,qi(hc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Y!==null&&Y.memoizedState.tag&1){if(n.flags|=2048,ir(9,mc.bind(null,n,r,l,t),void 0,null),Z===null)throw Error(w(349));(Ot&30)!==0||pc(n,t,l)}return l}function pc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function mc(e,t,n,r){t.value=n,t.getSnapshot=r,vc(t)&&yc(e)}function hc(e,t,n){return n(function(){vc(t)&&yc(e)})}function vc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Oe(e,n)}catch(r){return!0}}function yc(e){var t=et(e,1);t!==null&&Te(t,e,1,-1)}function As(e){var t=Ue();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:or,lastRenderedState:e},t.queue=e,e=e.dispatch=kg.bind(null,U,e),[t.memoizedState,e]}function ir(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Sc(){return Ie().memoizedState}function qr(e,t,n,r){var l=Ue();U.flags|=e,l.memoizedState=ir(1|t,n,void 0,r===void 0?null:r)}function Il(e,t,n,r){var l=Ie();r=r===void 0?null:r;var o=void 0;if(X!==null){var i=X.memoizedState;if(o=i.destroy,r!==null&&Qi(r,i.deps)){l.memoizedState=ir(t,n,o,r);return}}U.flags|=e,l.memoizedState=ir(1|t,n,o,r)}function js(e,t){return qr(8390656,8,e,t)}function qi(e,t){return Il(2048,8,e,t)}function wc(e,t){return Il(4,2,e,t)}function Cc(e,t){return Il(4,4,e,t)}function Rc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _c(e,t,n){return n=n!=null?n.concat([e]):null,Il(4,4,Rc.bind(null,t,e),n)}function Yi(){}function kc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ec(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function xc(e,t,n){return(Ot&21)===0?(e.baseState&&(e.baseState=!1,de=!0),e.memoizedState=n):(Oe(n,t)||(n=za(),U.lanes|=n,Ht|=n,e.baseState=!0),t)}function Rg(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=wo.transition;wo.transition={};try{e(!1),t()}finally{V=n,wo.transition=r}}function Pc(){return Ie().memoizedState}function _g(e,t,n){var r=yt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Fc(e))Mc(t,n);else if(n=ac(e,t,n,r),n!==null){var l=ae();Te(n,e,r,l),Ic(n,t,r)}}function kg(e,t,n){var r=yt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Fc(e))Mc(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,u=o(i,n);if(l.hasEagerState=!0,l.eagerState=u,Oe(u,i)){var s=t.interleaved;s===null?(l.next=l,ji(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch(a){}finally{}n=ac(e,t,l,r),n!==null&&(l=ae(),Te(n,e,r,l),Ic(n,t,r))}}function Fc(e){var t=e.alternate;return e===U||t!==null&&t===U}function Mc(e,t){jn=vl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ic(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Pi(e,n)}}var yl={readContext:Me,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},Eg={readContext:Me,useCallback:function(e,t){return Ue().memoizedState=[e,t===void 0?null:t],e},useContext:Me,useEffect:js,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,qr(4194308,4,Rc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return qr(4194308,4,e,t)},useInsertionEffect:function(e,t){return qr(4,2,e,t)},useMemo:function(e,t){var n=Ue();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ue();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=_g.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Ue();return e={current:e},t.memoizedState=e},useState:As,useDebugValue:Yi,useDeferredValue:function(e){return Ue().memoizedState=e},useTransition:function(){var e=As(!1),t=e[0];return e=Rg.bind(null,e[1]),Ue().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=U,l=Ue();if(A){if(n===void 0)throw Error(w(407));n=n()}else{if(n=t(),Z===null)throw Error(w(349));(Ot&30)!==0||pc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,js(hc.bind(null,r,o,e),[e]),r.flags|=2048,ir(9,mc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ue(),t=Z.identifierPrefix;if(A){var n=Ye,r=qe;n=(r&~(1<<32-De(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Cg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},xg={readContext:Me,useCallback:kc,useContext:Me,useEffect:qi,useImperativeHandle:_c,useInsertionEffect:wc,useLayoutEffect:Cc,useMemo:Ec,useReducer:Co,useRef:Sc,useState:function(){return Co(or)},useDebugValue:Yi,useDeferredValue:function(e){var t=Ie();return xc(t,X.memoizedState,e)},useTransition:function(){var e=Co(or)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:dc,useSyncExternalStore:gc,useId:Pc,unstable_isNewReconciler:!1},Pg={readContext:Me,useCallback:kc,useContext:Me,useEffect:qi,useImperativeHandle:_c,useInsertionEffect:wc,useLayoutEffect:Cc,useMemo:Ec,useReducer:Ro,useRef:Sc,useState:function(){return Ro(or)},useDebugValue:Yi,useDeferredValue:function(e){var t=Ie();return X===null?t.memoizedState=e:xc(t,X.memoizedState,e)},useTransition:function(){var e=Ro(or)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:dc,useSyncExternalStore:gc,useId:Pc,unstable_isNewReconciler:!1};function Le(e,t){if(e&&e.defaultProps){t=G({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ri(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:G({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zl={isMounted:function(e){return(e=e._reactInternals)?Bt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ae(),l=yt(e),o=Ze(r,l);o.payload=t,n!=null&&(o.callback=n),t=ht(e,o,l),t!==null&&(Te(t,e,l,r),Kr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ae(),l=yt(e),o=Ze(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=ht(e,o,l),t!==null&&(Te(t,e,l,r),Kr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ae(),r=yt(e),l=Ze(n,r);l.tag=2,t!=null&&(l.callback=t),t=ht(e,l,r),t!==null&&(Te(t,e,r,n),Kr(t,e,r))}};function Bs(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!Jn(n,r)||!Jn(l,o):!0}function zc(e,t,n){var r=!1,l=Ct,o=t.contextType;return typeof o=="object"&&o!==null?o=Me(o):(l=pe(t)?Dt:oe.current,r=t.contextTypes,o=(r=r!=null)?dn(e,l):Ct),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=zl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zl.enqueueReplaceState(t,t.state,null)}function li(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Bi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=Me(o):(o=pe(t)?Dt:oe.current,l.context=dn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ri(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&zl.enqueueReplaceState(l,l.state,null),ml(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function hn(e,t){try{var n="",r=t;do n+=rd(r),r=r.return;while(r);var l=n}catch(o){l=\`
Error generating stack: \`+o.message+\`
\`+o.stack}return{value:e,source:t,stack:l,digest:null}}function _o(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function oi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Fg=typeof WeakMap=="function"?WeakMap:Map;function Nc(e,t,n){n=Ze(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wl||(wl=!0,mi=r),oi(e,t)},n}function Lc(e,t,n){n=Ze(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){oi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){oi(e,t),typeof r!="function"&&(vt===null?vt=new Set([this]):vt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Gs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fg;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Bg.bind(null,e,t,n),t.then(e,e))}function Ws(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qs(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ze(-1,1),t.tag=2,ht(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Mg=nt.ReactCurrentOwner,de=!1;function se(e,t,n,r){t.child=e===null?sc(t,null,n,r):pn(t,e.child,n,r)}function Ks(e,t,n,r,l){n=n.render;var o=t.ref;return an(t,l),r=Ki(e,t,n,r,o,l),n=Xi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(A&&n&&$i(t),t.flags|=1,se(e,t,r,l),t.child)}function Xs(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!lu(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Vc(e,t,o,r,l)):(e=br(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Jn,n(i,r)&&e.ref===t.ref)return tt(e,t,l)}return t.flags|=1,e=St(o,r),e.ref=t.ref,e.return=t,t.child=e}function Vc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(Jn(o,r)&&e.ref===t.ref)if(de=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(de=!0);else return t.lanes=e.lanes,tt(e,t,l)}return ii(e,t,n,r,l)}function $c(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(rn,he),he|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,D(rn,he),he|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,D(rn,he),he|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,D(rn,he),he|=r;return se(e,t,l,n),t.child}function Dc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ii(e,t,n,r,l){var o=pe(n)?Dt:oe.current;return o=dn(t,o),an(t,l),n=Ki(e,t,n,r,o,l),r=Xi(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(A&&r&&$i(t),t.flags|=1,se(e,t,n,l),t.child)}function qs(e,t,n,r,l){if(pe(n)){var o=!0;cl(t)}else o=!1;if(an(t,l),t.stateNode===null)Yr(e,t),zc(t,n,r),li(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var s=i.context,a=n.contextType;typeof a=="object"&&a!==null?a=Me(a):(a=pe(n)?Dt:oe.current,a=dn(t,a));var p=n.getDerivedStateFromProps,h=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||s!==a)&&Us(t,i,r,a),ut=!1;var d=t.memoizedState;i.state=d,ml(t,r,i,l),s=t.memoizedState,u!==r||d!==s||ge.current||ut?(typeof p=="function"&&(ri(t,n,p,r),s=t.memoizedState),(u=ut||Bs(t,n,u,r,d,s,a))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=a,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,cc(e,t),u=t.memoizedProps,a=t.type===t.elementType?u:Le(t.type,u),i.props=a,h=t.pendingProps,d=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Me(s):(s=pe(n)?Dt:oe.current,s=dn(t,s));var c=n.getDerivedStateFromProps;(p=typeof c=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==h||d!==s)&&Us(t,i,r,s),ut=!1,d=t.memoizedState,i.state=d,ml(t,r,i,l);var v=t.memoizedState;u!==h||d!==v||ge.current||ut?(typeof c=="function"&&(ri(t,n,c,r),v=t.memoizedState),(a=ut||Bs(t,n,a,r,d,v,s)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),i.props=r,i.state=v,i.context=s,r=a):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return ui(e,t,n,r,o,l)}function ui(e,t,n,r,l,o){Dc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Vs(t,n,!1),tt(e,t,o);r=t.stateNode,Mg.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=pn(t,e.child,null,o),t.child=pn(t,null,u,o)):se(e,t,u,o),t.memoizedState=r.state,l&&Vs(t,n,!0),t.child}function Tc(e){var t=e.stateNode;t.pendingContext?Ls(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ls(e,t.context,!1),Ui(e,t.containerInfo)}function Ys(e,t,n,r,l){return gn(),Ti(l),t.flags|=256,se(e,t,n,r),t.child}var si={dehydrated:null,treeContext:null,retryLane:0};function ai(e){return{baseLanes:e,cachePool:null,transitions:null}}function Oc(e,t,n){var r=t.pendingProps,l=B.current,o=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),D(B,l&1),e===null)return ti(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Vl(i,r,0,null),e=$t(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ai(n),t.memoizedState=si,e):Zi(t,i));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return Ig(e,t,i,r,u,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,u=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=St(l,s),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?o=St(u,o):(o=$t(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?ai(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=si,r}return o=e.child,e=o.sibling,r=St(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Zi(e,t){return t=Vl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function jr(e,t,n,r){return r!==null&&Ti(r),pn(t,e.child,null,n),e=Zi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ig(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=_o(Error(w(422))),jr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Vl({mode:"visible",children:r.children},l,0,null),o=$t(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&pn(t,e.child,null,i),t.child.memoizedState=ai(i),t.memoizedState=si,o);if((t.mode&1)===0)return jr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,o=Error(w(419)),r=_o(o,r,void 0),jr(e,t,i,r)}if(u=(i&e.childLanes)!==0,de||u){if(r=Z,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,et(e,l),Te(r,e,l,-1))}return ru(),r=_o(Error(w(421))),jr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Ug.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,ve=mt(l.nextSibling),ye=t,A=!0,$e=null,e!==null&&(Ee[xe++]=qe,Ee[xe++]=Ye,Ee[xe++]=Tt,qe=e.id,Ye=e.overflow,Tt=t),t=Zi(t,r.children),t.flags|=4096,t)}function Zs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ni(e.return,t,n)}function ko(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Hc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(se(e,t,r.children,n),r=B.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zs(e,n,t);else if(e.tag===19)Zs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(D(B,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&hl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),ko(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&hl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}ko(t,!0,n,null,o);break;case"together":ko(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Yr(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ht|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(w(153));if(t.child!==null){for(e=t.child,n=St(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=St(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function zg(e,t,n){switch(t.tag){case 3:Tc(t),gn();break;case 5:fc(t);break;case 1:pe(t.type)&&cl(t);break;case 4:Ui(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;D(gl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(D(B,B.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Oc(e,t,n):(D(B,B.current&1),e=tt(e,t,n),e!==null?e.sibling:null);D(B,B.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Hc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),D(B,B.current),r)break;return null;case 22:case 23:return t.lanes=0,$c(e,t,n)}return tt(e,t,n)}var Ac,ci,jc,Bc;Ac=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ci=function(){};jc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Lt(Qe.current);var o=null;switch(n){case"input":l=No(e,l),r=No(e,r),o=[];break;case"select":l=G({},l,{value:void 0}),r=G({},r,{value:void 0}),o=[];break;case"textarea":l=$o(e,l),r=$o(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=sl)}To(n,r);var i;n=null;for(a in l)if(!r.hasOwnProperty(a)&&l.hasOwnProperty(a)&&l[a]!=null)if(a==="style"){var u=l[a];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else a!=="dangerouslySetInnerHTML"&&a!=="children"&&a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Wn.hasOwnProperty(a)?o||(o=[]):(o=o||[]).push(a,null));for(a in r){var s=r[a];if(u=l!=null?l[a]:void 0,r.hasOwnProperty(a)&&s!==u&&(s!=null||u!=null))if(a==="style")if(u){for(i in u)!u.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&u[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(o||(o=[]),o.push(a,n)),n=s;else a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,u=u?u.__html:void 0,s!=null&&u!==s&&(o=o||[]).push(a,s)):a==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(a,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&(Wn.hasOwnProperty(a)?(s!=null&&a==="onScroll"&&T("scroll",e),o||u===s||(o=[])):(o=o||[]).push(a,s))}n&&(o=o||[]).push("style",n);var a=o;(t.updateQueue=a)&&(t.flags|=4)}};Bc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Mn(e,t){if(!A)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ng(e,t,n){var r=t.pendingProps;switch(Di(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return pe(t.type)&&al(),re(t),null;case 3:return r=t.stateNode,mn(),O(ge),O(oe),Wi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Hr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,$e!==null&&(yi($e),$e=null))),ci(e,t),re(t),null;case 5:Gi(t);var l=Lt(rr.current);if(n=t.type,e!==null&&t.stateNode!=null)jc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(w(166));return re(t),null}if(e=Lt(Qe.current),Hr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Ge]=t,r[tr]=o,e=(t.mode&1)!==0,n){case"dialog":T("cancel",r),T("close",r);break;case"iframe":case"object":case"embed":T("load",r);break;case"video":case"audio":for(l=0;l<$n.length;l++)T($n[l],r);break;case"source":T("error",r);break;case"img":case"image":case"link":T("error",r),T("load",r);break;case"details":T("toggle",r);break;case"input":os(r,o),T("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},T("invalid",r);break;case"textarea":us(r,o),T("invalid",r)}To(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="children"?typeof u=="string"?r.textContent!==u&&(o.suppressHydrationWarning!==!0&&Or(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(o.suppressHydrationWarning!==!0&&Or(r.textContent,u,e),l=["children",""+u]):Wn.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&T("scroll",r)}switch(n){case"input":xr(r),is(r,o,!0);break;case"textarea":xr(r),ss(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=sl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ha(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Ge]=t,e[tr]=r,Ac(e,t,!1,!1),t.stateNode=e;e:{switch(i=Oo(n,r),n){case"dialog":T("cancel",e),T("close",e),l=r;break;case"iframe":case"object":case"embed":T("load",e),l=r;break;case"video":case"audio":for(l=0;l<$n.length;l++)T($n[l],e);l=r;break;case"source":T("error",e),l=r;break;case"img":case"image":case"link":T("error",e),T("load",e),l=r;break;case"details":T("toggle",e),l=r;break;case"input":os(e,r),l=No(e,r),T("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=G({},r,{value:void 0}),T("invalid",e);break;case"textarea":us(e,r),l=$o(e,r),T("invalid",e);break;default:l=r}To(n,l),u=l;for(o in u)if(u.hasOwnProperty(o)){var s=u[o];o==="style"?Sa(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&va(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Qn(e,s):typeof s=="number"&&Qn(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Wn.hasOwnProperty(o)?s!=null&&o==="onScroll"&&T("scroll",e):s!=null&&Ci(e,o,s,i))}switch(n){case"input":xr(e),is(e,r,!1);break;case"textarea":xr(e),ss(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?ln(e,!!r.multiple,o,!1):r.defaultValue!=null&&ln(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=sl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)Bc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(w(166));if(n=Lt(rr.current),Lt(Qe.current),Hr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ge]=t,(o=r.nodeValue!==n)&&(e=ye,e!==null))switch(e.tag){case 3:Or(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Or(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ge]=t,t.stateNode=r}return re(t),null;case 13:if(O(B),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(A&&ve!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ic(),gn(),t.flags|=98560,o=!1;else if(o=Hr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(w(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(w(317));o[Ge]=t}else gn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;re(t),o=!1}else $e!==null&&(yi($e),$e=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(B.current&1)!==0?q===0&&(q=3):ru())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return mn(),ci(e,t),e===null&&bn(t.stateNode.containerInfo),re(t),null;case 10:return Ai(t.type._context),re(t),null;case 17:return pe(t.type)&&al(),re(t),null;case 19:if(O(B),o=t.memoizedState,o===null)return re(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Mn(o,!1);else{if(q!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=hl(e),i!==null){for(t.flags|=128,Mn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return D(B,B.current&1|2),t.child}e=e.sibling}o.tail!==null&&Q()>vn&&(t.flags|=128,r=!0,Mn(o,!1),t.lanes=4194304)}else{if(!r)if(e=hl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Mn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!A)return re(t),null}else 2*Q()-o.renderingStartTime>vn&&n!==1073741824&&(t.flags|=128,r=!0,Mn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Q(),t.sibling=null,n=B.current,D(B,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return nu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(he&1073741824)!==0&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(w(156,t.tag))}function Lg(e,t){switch(Di(t),t.tag){case 1:return pe(t.type)&&al(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return mn(),O(ge),O(oe),Wi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Gi(t),null;case 13:if(O(B),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(w(340));gn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(B),null;case 4:return mn(),null;case 10:return Ai(t.type._context),null;case 22:case 23:return nu(),null;case 24:return null;default:return null}}var Br=!1,le=!1,Vg=typeof WeakSet=="function"?WeakSet:Set,_=null;function nn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){W(e,t,r)}else n.current=null}function fi(e,t,n){try{n()}catch(r){W(e,t,r)}}var Js=!1;function $g(e,t){if(Xo=ol,e=Ka(),Vi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch(S){n=null;break e}var i=0,u=-1,s=-1,a=0,p=0,h=e,d=null;t:for(;;){for(var c;h!==n||l!==0&&h.nodeType!==3||(u=i+l),h!==o||r!==0&&h.nodeType!==3||(s=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(c=h.firstChild)!==null;)d=h,h=c;for(;;){if(h===e)break t;if(d===n&&++a===l&&(u=i),d===o&&++p===r&&(s=i),(c=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=c}n=u===-1||s===-1?null:{start:u,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(qo={focusedElem:e,selectionRange:n},ol=!1,_=t;_!==null;)if(t=_,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,_=e;else for(;_!==null;){t=_;try{var v=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,k=v.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:Le(t.type,y),k);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(S){W(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,_=e;break}_=t.return}return v=Js,Js=!1,v}function Bn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&fi(t,n,o)}l=l.next}while(l!==r)}}function Nl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function di(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Uc(e){var t=e.alternate;t!==null&&(e.alternate=null,Uc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ge],delete t[tr],delete t[Jo],delete t[vg],delete t[yg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Gc(e){return e.tag===5||e.tag===3||e.tag===4}function bs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sl));else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}function pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(pi(e,t,n),e=e.sibling;e!==null;)pi(e,t,n),e=e.sibling}var J=null,Ve=!1;function ot(e,t,n){for(n=n.child;n!==null;)Wc(e,t,n),n=n.sibling}function Wc(e,t,n){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(kl,n)}catch(u){}switch(n.tag){case 5:le||nn(n,t);case 6:var r=J,l=Ve;J=null,ot(e,t,n),J=r,Ve=l,J!==null&&(Ve?(e=J,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):J.removeChild(n.stateNode));break;case 18:J!==null&&(Ve?(e=J,n=n.stateNode,e.nodeType===8?vo(e.parentNode,n):e.nodeType===1&&vo(e,n),Yn(e)):vo(J,n.stateNode));break;case 4:r=J,l=Ve,J=n.stateNode.containerInfo,Ve=!0,ot(e,t,n),J=r,Ve=l;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&fi(n,t,i),l=l.next}while(l!==r)}ot(e,t,n);break;case 1:if(!le&&(nn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){W(n,t,u)}ot(e,t,n);break;case 21:ot(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,ot(e,t,n),le=r):ot(e,t,n);break;default:ot(e,t,n)}}function ea(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Vg),t.forEach(function(r){var l=Gg.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Ne(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:J=u.stateNode,Ve=!1;break e;case 3:J=u.stateNode.containerInfo,Ve=!0;break e;case 4:J=u.stateNode.containerInfo,Ve=!0;break e}u=u.return}if(J===null)throw Error(w(160));Wc(o,i,l),J=null,Ve=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(a){W(l,t,a)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qc(t,e),t=t.sibling}function Qc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ne(t,e),Be(e),r&4){try{Bn(3,e,e.return),Nl(3,e)}catch(y){W(e,e.return,y)}try{Bn(5,e,e.return)}catch(y){W(e,e.return,y)}}break;case 1:Ne(t,e),Be(e),r&512&&n!==null&&nn(n,n.return);break;case 5:if(Ne(t,e),Be(e),r&512&&n!==null&&nn(n,n.return),e.flags&32){var l=e.stateNode;try{Qn(l,"")}catch(y){W(e,e.return,y)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,u=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{u==="input"&&o.type==="radio"&&o.name!=null&&pa(l,o),Oo(u,i);var a=Oo(u,o);for(i=0;i<s.length;i+=2){var p=s[i],h=s[i+1];p==="style"?Sa(l,h):p==="dangerouslySetInnerHTML"?va(l,h):p==="children"?Qn(l,h):Ci(l,p,h,a)}switch(u){case"input":Lo(l,o);break;case"textarea":ma(l,o);break;case"select":var d=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var c=o.value;c!=null?ln(l,!!o.multiple,c,!1):d!==!!o.multiple&&(o.defaultValue!=null?ln(l,!!o.multiple,o.defaultValue,!0):ln(l,!!o.multiple,o.multiple?[]:"",!1))}l[tr]=o}catch(y){W(e,e.return,y)}}break;case 6:if(Ne(t,e),Be(e),r&4){if(e.stateNode===null)throw Error(w(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(y){W(e,e.return,y)}}break;case 3:if(Ne(t,e),Be(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Yn(t.containerInfo)}catch(y){W(e,e.return,y)}break;case 4:Ne(t,e),Be(e);break;case 13:Ne(t,e),Be(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(eu=Q())),r&4&&ea(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(le=(a=le)||p,Ne(t,e),le=a):Ne(t,e),Be(e),r&8192){if(a=e.memoizedState!==null,(e.stateNode.isHidden=a)&&!p&&(e.mode&1)!==0)for(_=e,p=e.child;p!==null;){for(h=_=p;_!==null;){switch(d=_,c=d.child,d.tag){case 0:case 11:case 14:case 15:Bn(4,d,d.return);break;case 1:nn(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){r=d,n=d.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(y){W(r,n,y)}}break;case 5:nn(d,d.return);break;case 22:if(d.memoizedState!==null){na(h);continue}}c!==null?(c.return=d,_=c):na(h)}p=p.sibling}e:for(p=null,h=e;;){if(h.tag===5){if(p===null){p=h;try{l=h.stateNode,a?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(u=h.stateNode,s=h.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,u.style.display=ya("display",i))}catch(y){W(e,e.return,y)}}}else if(h.tag===6){if(p===null)try{h.stateNode.nodeValue=a?"":h.memoizedProps}catch(y){W(e,e.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;p===h&&(p=null),h=h.return}p===h&&(p=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Ne(t,e),Be(e),r&4&&ea(e);break;case 21:break;default:Ne(t,e),Be(e)}}function Be(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Gc(n)){var r=n;break e}n=n.return}throw Error(w(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Qn(l,""),r.flags&=-33);var o=bs(e);pi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,u=bs(e);gi(e,u,i);break;default:throw Error(w(161))}}catch(s){W(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Dg(e,t,n){_=e,Kc(e,t,n)}function Kc(e,t,n){for(var r=(e.mode&1)!==0;_!==null;){var l=_,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Br;if(!i){var u=l.alternate,s=u!==null&&u.memoizedState!==null||le;u=Br;var a=le;if(Br=i,(le=s)&&!a)for(_=l;_!==null;)i=_,s=i.child,i.tag===22&&i.memoizedState!==null?ra(l):s!==null?(s.return=i,_=s):ra(l);for(;o!==null;)_=o,Kc(o,t,n),o=o.sibling;_=l,Br=u,le=a}ta(e,t,n)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,_=o):ta(e,t,n)}}function ta(e){for(;_!==null;){var t=_;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:le||Nl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Le(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Hs(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Hs(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var a=t.alternate;if(a!==null){var p=a.memoizedState;if(p!==null){var h=p.dehydrated;h!==null&&Yn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}le||t.flags&512&&di(t)}catch(d){W(t,t.return,d)}}if(t===e){_=null;break}if(n=t.sibling,n!==null){n.return=t.return,_=n;break}_=t.return}}function na(e){for(;_!==null;){var t=_;if(t===e){_=null;break}var n=t.sibling;if(n!==null){n.return=t.return,_=n;break}_=t.return}}function ra(e){for(;_!==null;){var t=_;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Nl(4,t)}catch(s){W(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){W(t,l,s)}}var o=t.return;try{di(t)}catch(s){W(t,o,s)}break;case 5:var i=t.return;try{di(t)}catch(s){W(t,i,s)}}}catch(s){W(t,t.return,s)}if(t===e){_=null;break}var u=t.sibling;if(u!==null){u.return=t.return,_=u;break}_=t.return}}var Tg=Math.ceil,Sl=nt.ReactCurrentDispatcher,Ji=nt.ReactCurrentOwner,Fe=nt.ReactCurrentBatchConfig,L=0,Z=null,K=null,b=0,he=0,rn=_t(0),q=0,ur=null,Ht=0,Ll=0,bi=0,Un=null,fe=null,eu=0,vn=1/0,Ke=null,wl=!1,mi=null,vt=null,Ur=!1,ft=null,Cl=0,Gn=0,hi=null,Zr=-1,Jr=0;function ae(){return(L&6)!==0?Q():Zr!==-1?Zr:Zr=Q()}function yt(e){return(e.mode&1)===0?1:(L&2)!==0&&b!==0?b&-b:wg.transition!==null?(Jr===0&&(Jr=za()),Jr):(e=V,e!==0||(e=window.event,e=e===void 0?16:Oa(e.type)),e)}function Te(e,t,n,r){if(50<Gn)throw Gn=0,hi=null,Error(w(185));sr(e,n,r),((L&2)===0||e!==Z)&&(e===Z&&((L&2)===0&&(Ll|=n),q===4&&at(e,b)),me(e,r),n===1&&L===0&&(t.mode&1)===0&&(vn=Q()+500,Ml&&kt()))}function me(e,t){var n=e.callbackNode;Rd(e,t);var r=ll(e,e===Z?b:0);if(r===0)n!==null&&fs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&fs(n),t===1)e.tag===0?Sg(la.bind(null,e)):rc(la.bind(null,e)),mg(function(){(L&6)===0&&kt()}),n=null;else{switch(Na(r)){case 1:n=xi;break;case 4:n=Ma;break;case 16:n=rl;break;case 536870912:n=Ia;break;default:n=rl}n=tf(n,Xc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Xc(e,t){if(Zr=-1,Jr=0,(L&6)!==0)throw Error(w(327));var n=e.callbackNode;if(cn()&&e.callbackNode!==n)return null;var r=ll(e,e===Z?b:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Rl(e,r);else{t=r;var l=L;L|=2;var o=Yc();(Z!==e||b!==t)&&(Ke=null,vn=Q()+500,Vt(e,t));do try{Ag();break}catch(u){qc(e,u)}while(!0);Hi(),Sl.current=o,L=l,K!==null?t=0:(Z=null,b=0,t=q)}if(t!==0){if(t===2&&(l=Uo(e),l!==0&&(r=l,t=vi(e,l))),t===1)throw n=ur,Vt(e,0),at(e,r),me(e,Q()),n;if(t===6)at(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Og(l)&&(t=Rl(e,r),t===2&&(o=Uo(e),o!==0&&(r=o,t=vi(e,o))),t===1))throw n=ur,Vt(e,0),at(e,r),me(e,Q()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(w(345));case 2:It(e,fe,Ke);break;case 3:if(at(e,r),(r&130023424)===r&&(t=eu+500-Q(),10<t)){if(ll(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ae(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Zo(It.bind(null,e,fe,Ke),t);break}It(e,fe,Ke);break;case 4:if(at(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-De(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Tg(r/1960))-r,10<r){e.timeoutHandle=Zo(It.bind(null,e,fe,Ke),r);break}It(e,fe,Ke);break;case 5:It(e,fe,Ke);break;default:throw Error(w(329))}}}return me(e,Q()),e.callbackNode===n?Xc.bind(null,e):null}function vi(e,t){var n=Un;return e.current.memoizedState.isDehydrated&&(Vt(e,t).flags|=256),e=Rl(e,t),e!==2&&(t=fe,fe=n,t!==null&&yi(t)),e}function yi(e){fe===null?fe=e:fe.push.apply(fe,e)}function Og(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Oe(o(),l))return!1}catch(i){return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function at(e,t){for(t&=~bi,t&=~Ll,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-De(t),r=1<<n;e[n]=-1,t&=~r}}function la(e){if((L&6)!==0)throw Error(w(327));cn();var t=ll(e,0);if((t&1)===0)return me(e,Q()),null;var n=Rl(e,t);if(e.tag!==0&&n===2){var r=Uo(e);r!==0&&(t=r,n=vi(e,r))}if(n===1)throw n=ur,Vt(e,0),at(e,t),me(e,Q()),n;if(n===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,It(e,fe,Ke),me(e,Q()),null}function tu(e,t){var n=L;L|=1;try{return e(t)}finally{L=n,L===0&&(vn=Q()+500,Ml&&kt())}}function At(e){ft!==null&&ft.tag===0&&(L&6)===0&&cn();var t=L;L|=1;var n=Fe.transition,r=V;try{if(Fe.transition=null,V=1,e)return e()}finally{V=r,Fe.transition=n,L=t,(L&6)===0&&kt()}}function nu(){he=rn.current,O(rn)}function Vt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,pg(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Di(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&al();break;case 3:mn(),O(ge),O(oe),Wi();break;case 5:Gi(r);break;case 4:mn();break;case 13:O(B);break;case 19:O(B);break;case 10:Ai(r.type._context);break;case 22:case 23:nu()}n=n.return}if(Z=e,K=e=St(e.current,null),b=he=t,q=0,ur=null,bi=Ll=Ht=0,fe=Un=null,Nt!==null){for(t=0;t<Nt.length;t++)if(n=Nt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Nt=null}return e}function qc(e,t){do{var n=K;try{if(Hi(),Xr.current=yl,vl){for(var r=U.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}vl=!1}if(Ot=0,Y=X=U=null,jn=!1,lr=0,Ji.current=null,n===null||n.return===null){q=1,ur=t,K=null;break}e:{var o=e,i=n.return,u=n,s=t;if(t=b,u.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var a=s,p=u,h=p.tag;if((p.mode&1)===0&&(h===0||h===11||h===15)){var d=p.alternate;d?(p.updateQueue=d.updateQueue,p.memoizedState=d.memoizedState,p.lanes=d.lanes):(p.updateQueue=null,p.memoizedState=null)}var c=Ws(i);if(c!==null){c.flags&=-257,Qs(c,i,u,o,t),c.mode&1&&Gs(o,a,t),t=c,s=a;var v=t.updateQueue;if(v===null){var y=new Set;y.add(s),t.updateQueue=y}else v.add(s);break e}else{if((t&1)===0){Gs(o,a,t),ru();break e}s=Error(w(426))}}else if(A&&u.mode&1){var k=Ws(i);if(k!==null){(k.flags&65536)===0&&(k.flags|=256),Qs(k,i,u,o,t),Ti(hn(s,u));break e}}o=s=hn(s,u),q!==4&&(q=2),Un===null?Un=[o]:Un.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Nc(o,s,t);Os(o,g);break e;case 1:u=s;var f=o.type,m=o.stateNode;if((o.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(vt===null||!vt.has(m)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=Lc(o,u,t);Os(o,S);break e}}o=o.return}while(o!==null)}Jc(n)}catch(C){t=C,K===n&&n!==null&&(K=n=n.return);continue}break}while(!0)}function Yc(){var e=Sl.current;return Sl.current=yl,e===null?yl:e}function ru(){(q===0||q===3||q===2)&&(q=4),Z===null||(Ht&268435455)===0&&(Ll&268435455)===0||at(Z,b)}function Rl(e,t){var n=L;L|=2;var r=Yc();(Z!==e||b!==t)&&(Ke=null,Vt(e,t));do try{Hg();break}catch(l){qc(e,l)}while(!0);if(Hi(),L=n,Sl.current=r,K!==null)throw Error(w(261));return Z=null,b=0,q}function Hg(){for(;K!==null;)Zc(K)}function Ag(){for(;K!==null&&!gd();)Zc(K)}function Zc(e){var t=ef(e.alternate,e,he);e.memoizedProps=e.pendingProps,t===null?Jc(e):K=t,Ji.current=null}function Jc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ng(n,t,he),n!==null){K=n;return}}else{if(n=Lg(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{q=6,K=null;return}}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);q===0&&(q=5)}function It(e,t,n){var r=V,l=Fe.transition;try{Fe.transition=null,V=1,jg(e,t,n,r)}finally{Fe.transition=l,V=r}return null}function jg(e,t,n,r){do cn();while(ft!==null);if((L&6)!==0)throw Error(w(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(_d(e,o),e===Z&&(K=Z=null,b=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ur||(Ur=!0,tf(rl,function(){return cn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=Fe.transition,Fe.transition=null;var i=V;V=1;var u=L;L|=4,Ji.current=null,$g(e,n),Qc(n,e),ag(qo),ol=!!Xo,qo=Xo=null,e.current=n,Dg(n,e,l),pd(),L=u,V=i,Fe.transition=o}else e.current=n;if(Ur&&(Ur=!1,ft=e,Cl=l),o=e.pendingLanes,o===0&&(vt=null),vd(n.stateNode,r),me(e,Q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(wl)throw wl=!1,e=mi,mi=null,e;return(Cl&1)!==0&&e.tag!==0&&cn(),o=e.pendingLanes,(o&1)!==0?e===hi?Gn++:(Gn=0,hi=e):Gn=0,kt(),null}function cn(){if(ft!==null){var e=Na(Cl),t=Fe.transition,n=V;try{if(Fe.transition=null,V=16>e?16:e,ft===null)var r=!1;else{if(e=ft,ft=null,Cl=0,(L&6)!==0)throw Error(w(331));var l=L;for(L|=4,_=e.current;_!==null;){var o=_,i=o.child;if((_.flags&16)!==0){var u=o.deletions;if(u!==null){for(var s=0;s<u.length;s++){var a=u[s];for(_=a;_!==null;){var p=_;switch(p.tag){case 0:case 11:case 15:Bn(8,p,o)}var h=p.child;if(h!==null)h.return=p,_=h;else for(;_!==null;){p=_;var d=p.sibling,c=p.return;if(Uc(p),p===a){_=null;break}if(d!==null){d.return=c,_=d;break}_=c}}}var v=o.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var k=y.sibling;y.sibling=null,y=k}while(y!==null)}}_=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,_=i;else e:for(;_!==null;){if(o=_,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Bn(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,_=g;break e}_=o.return}}var f=e.current;for(_=f;_!==null;){i=_;var m=i.child;if((i.subtreeFlags&2064)!==0&&m!==null)m.return=i,_=m;else e:for(i=f;_!==null;){if(u=_,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:Nl(9,u)}}catch(C){W(u,u.return,C)}if(u===i){_=null;break e}var S=u.sibling;if(S!==null){S.return=u.return,_=S;break e}_=u.return}}if(L=l,kt(),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(kl,e)}catch(C){}r=!0}return r}finally{V=n,Fe.transition=t}}return!1}function oa(e,t,n){t=hn(n,t),t=Nc(e,t,1),e=ht(e,t,1),t=ae(),e!==null&&(sr(e,1,t),me(e,t))}function W(e,t,n){if(e.tag===3)oa(e,e,n);else for(;t!==null;){if(t.tag===3){oa(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vt===null||!vt.has(r))){e=hn(n,e),e=Lc(t,e,1),t=ht(t,e,1),e=ae(),t!==null&&(sr(t,1,e),me(t,e));break}}t=t.return}}function Bg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ae(),e.pingedLanes|=e.suspendedLanes&n,Z===e&&(b&n)===n&&(q===4||q===3&&(b&130023424)===b&&500>Q()-eu?Vt(e,0):bi|=n),me(e,t)}function bc(e,t){t===0&&((e.mode&1)===0?t=1:(t=Mr,Mr<<=1,(Mr&130023424)===0&&(Mr=4194304)));var n=ae();e=et(e,t),e!==null&&(sr(e,t,n),me(e,n))}function Ug(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),bc(e,n)}function Gg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(t),bc(e,n)}var ef;ef=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ge.current)de=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return de=!1,zg(e,t,n);de=(e.flags&131072)!==0}else de=!1,A&&(t.flags&1048576)!==0&&lc(t,dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Yr(e,t),e=t.pendingProps;var l=dn(t,oe.current);an(t,n),l=Ki(null,t,r,e,l,n);var o=Xi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,pe(r)?(o=!0,cl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Bi(t),l.updater=zl,t.stateNode=l,l._reactInternals=t,li(t,r,e,n),t=ui(null,t,r,!0,o,n)):(t.tag=0,A&&o&&$i(t),se(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Yr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Qg(r),e=Le(r,e),l){case 0:t=ii(null,t,r,e,n);break e;case 1:t=qs(null,t,r,e,n);break e;case 11:t=Ks(null,t,r,e,n);break e;case 14:t=Xs(null,t,r,Le(r.type,e),n);break e}throw Error(w(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Le(r,l),ii(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Le(r,l),qs(e,t,r,l,n);case 3:e:{if(Tc(t),e===null)throw Error(w(387));r=t.pendingProps,o=t.memoizedState,l=o.element,cc(e,t),ml(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=hn(Error(w(423)),t),t=Ys(e,t,r,n,l);break e}else if(r!==l){l=hn(Error(w(424)),t),t=Ys(e,t,r,n,l);break e}else for(ve=mt(t.stateNode.containerInfo.firstChild),ye=t,A=!0,$e=null,n=sc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(gn(),r===l){t=tt(e,t,n);break e}se(e,t,r,n)}t=t.child}return t;case 5:return fc(t),e===null&&ti(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,Yo(r,l)?i=null:o!==null&&Yo(r,o)&&(t.flags|=32),Dc(e,t),se(e,t,i,n),t.child;case 6:return e===null&&ti(t),null;case 13:return Oc(e,t,n);case 4:return Ui(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=pn(t,null,r,n):se(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Le(r,l),Ks(e,t,r,l,n);case 7:return se(e,t,t.pendingProps,n),t.child;case 8:return se(e,t,t.pendingProps.children,n),t.child;case 12:return se(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,D(gl,r._currentValue),r._currentValue=i,o!==null)if(Oe(o.value,i)){if(o.children===l.children&&!ge.current){t=tt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var u=o.dependencies;if(u!==null){i=o.child;for(var s=u.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=Ze(-1,n&-n),s.tag=2;var a=o.updateQueue;if(a!==null){a=a.shared;var p=a.pending;p===null?s.next=s:(s.next=p.next,p.next=s),a.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),ni(o.return,n,t),u.lanes|=n;break}s=s.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(w(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),ni(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}se(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,an(t,n),l=Me(l),r=r(l),t.flags|=1,se(e,t,r,n),t.child;case 14:return r=t.type,l=Le(r,t.pendingProps),l=Le(r.type,l),Xs(e,t,r,l,n);case 15:return Vc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Le(r,l),Yr(e,t),t.tag=1,pe(r)?(e=!0,cl(t)):e=!1,an(t,n),zc(t,r,l),li(t,r,l,n),ui(null,t,r,!0,e,n);case 19:return Hc(e,t,n);case 22:return $c(e,t,n)}throw Error(w(156,t.tag))};function tf(e,t){return Fa(e,t)}function Wg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,n,r){return new Wg(e,t,n,r)}function lu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qg(e){if(typeof e=="function")return lu(e)?1:0;if(e!=null){if(e=e.$typeof,e===_i)return 11;if(e===ki)return 14}return 2}function St(e,t){var n=e.alternate;return n===null?(n=Pe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function br(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")lu(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Kt:return $t(n.children,l,o,t);case Ri:i=8,l|=8;break;case Fo:return e=Pe(12,n,t,l|2),e.elementType=Fo,e.lanes=o,e;case Mo:return e=Pe(13,n,t,l),e.elementType=Mo,e.lanes=o,e;case Io:return e=Pe(19,n,t,l),e.elementType=Io,e.lanes=o,e;case fa:return Vl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$typeof){case aa:i=10;break e;case ca:i=9;break e;case _i:i=11;break e;case ki:i=14;break e;case it:i=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return t=Pe(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function $t(e,t,n,r){return e=Pe(7,e,r,t),e.lanes=n,e}function Vl(e,t,n,r){return e=Pe(22,e,r,t),e.elementType=fa,e.lanes=n,e.stateNode={isHidden:!1},e}function Eo(e,t,n){return e=Pe(6,e,null,t),e.lanes=n,e}function xo(e,t,n){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Kg(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=so(0),this.expirationTimes=so(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=so(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ou(e,t,n,r,l,o,i,u,s){return e=new Kg(e,t,n,u,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Pe(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bi(o),e}function Xg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$typeof:Qt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function nf(e){if(!e)return Ct;e=e._reactInternals;e:{if(Bt(e)!==e||e.tag!==1)throw Error(w(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(pe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(w(171))}if(e.tag===1){var n=e.type;if(pe(n))return nc(e,n,t)}return t}function rf(e,t,n,r,l,o,i,u,s){return e=ou(n,r,!0,e,l,o,i,u,s),e.context=nf(null),n=e.current,r=ae(),l=yt(n),o=Ze(r,l),o.callback=t!=null?t:null,ht(n,o,l),e.current.lanes=l,sr(e,l,r),me(e,r),e}function $l(e,t,n,r){var l=t.current,o=ae(),i=yt(l);return n=nf(n),t.context===null?t.context=n:t.pendingContext=n,t=Ze(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ht(l,t,i),e!==null&&(Te(e,l,i,o),Kr(e,l,i)),i}function _l(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ia(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function iu(e,t){ia(e,t),(e=e.alternate)&&ia(e,t)}function qg(){return null}var lf=typeof reportError=="function"?reportError:function(e){console.error(e)};function uu(e){this._internalRoot=e}Dl.prototype.render=uu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(w(409));$l(e,t,null,null)};Dl.prototype.unmount=uu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;At(function(){$l(null,e,null,null)}),t[be]=null}};function Dl(e){this._internalRoot=e}Dl.prototype.unstable_scheduleHydration=function(e){if(e){var t=$a();e={blockedOn:null,target:e,priority:t};for(var n=0;n<st.length&&t!==0&&t<st[n].priority;n++);st.splice(n,0,e),n===0&&Ta(e)}};function su(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Tl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ua(){}function Yg(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var a=_l(i);o.call(a)}}var i=rf(t,r,e,0,null,!1,!1,"",ua);return e._reactRootContainer=i,e[be]=i.current,bn(e.nodeType===8?e.parentNode:e),At(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var a=_l(s);u.call(a)}}var s=ou(e,0,!1,null,null,!1,!1,"",ua);return e._reactRootContainer=s,e[be]=s.current,bn(e.nodeType===8?e.parentNode:e),At(function(){$l(t,s,n,r)}),s}function Ol(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var u=l;l=function(){var s=_l(i);u.call(s)}}$l(t,i,e,l)}else i=Yg(n,t,e,l,r);return _l(i)}La=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vn(t.pendingLanes);n!==0&&(Pi(t,n|1),me(t,Q()),(L&6)===0&&(vn=Q()+500,kt()))}break;case 13:At(function(){var r=et(e,1);if(r!==null){var l=ae();Te(r,e,1,l)}}),iu(e,1)}};Fi=function(e){if(e.tag===13){var t=et(e,134217728);if(t!==null){var n=ae();Te(t,e,134217728,n)}iu(e,134217728)}};Va=function(e){if(e.tag===13){var t=yt(e),n=et(e,t);if(n!==null){var r=ae();Te(n,e,t,r)}iu(e,t)}};$a=function(){return V};Da=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};Ao=function(e,t,n){switch(t){case"input":if(Lo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Fl(r);if(!l)throw Error(w(90));ga(r),Lo(r,l)}}}break;case"textarea":ma(e,n);break;case"select":t=n.value,t!=null&&ln(e,!!n.multiple,t,!1)}};Ra=tu;_a=At;var Zg={usingClientEntryPoint:!1,Events:[cr,Zt,Fl,wa,Ca,tu]},In={findFiberByHostInstance:zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Jg={bundleType:In.bundleType,version:In.version,rendererPackageName:In.rendererPackageName,rendererConfig:In.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:nt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xa(e),e===null?null:e.stateNode},findFiberByHostInstance:In.findFiberByHostInstance||qg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&(zn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!zn.isDisabled&&zn.supportsFiber))try{kl=zn.inject(Jg),We=zn}catch(e){}var zn;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zg;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!su(t))throw Error(w(200));return Xg(e,t,null,n)};Ce.createRoot=function(e,t){if(!su(e))throw Error(w(299));var n=!1,r="",l=lf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ou(e,1,!1,null,null,n,!1,r,l),e[be]=t.current,bn(e.nodeType===8?e.parentNode:e),new uu(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=xa(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return At(e)};Ce.hydrate=function(e,t,n){if(!Tl(t))throw Error(w(200));return Ol(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!su(e))throw Error(w(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=lf;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=rf(t,null,e,1,n!=null?n:null,l,!1,o,i),e[be]=t.current,bn(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Dl(t)};Ce.render=function(e,t,n){if(!Tl(t))throw Error(w(200));return Ol(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Tl(e))throw Error(w(40));return e._reactRootContainer?(At(function(){Ol(null,null,e,!1,function(){e._reactRootContainer=null,e[be]=null})}),!0):!1};Ce.unstable_batchedUpdates=tu;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Tl(n))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return Ol(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var au=Pt((bp,sf)=>{"use strict";function uf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(uf)}catch(e){console.error(e)}}uf(),sf.exports=of()});var cf=Pt(cu=>{"use strict";var af=au();cu.createRoot=af.createRoot,cu.hydrateRoot=af.hydrateRoot;var em});var _e=mr(Sr()),Ff=mr(cf()),Mf=mr(au());var pr=mr(Sr(),1);function Et(e,t){return typeof e=="function"?e(t):e}function Re(e,t){return n=>{t.setState(r=>({...r,[e]:Et(n,r[e])}))}}function Bl(e){return e instanceof Function}function bg(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function ep(e,t){let n=[],r=l=>{l.forEach(o=>{n.push(o);let i=t(o);i!=null&&i.length&&r(i)})};return r(e),n}function P(e,t,n){let r=[],l;return o=>{let i;n.key&&n.debug&&(i=Date.now());let u=e(o);if(!(u.length!==r.length||u.some((p,h)=>r[h]!==p)))return l;r=u;let a;if(n.key&&n.debug&&(a=Date.now()),l=t(...u),n==null||n.onChange==null||n.onChange(l),n.key&&n.debug&&n!=null&&n.debug()){let p=Math.round((Date.now()-i)*100)/100,h=Math.round((Date.now()-a)*100)/100,d=h/16,c=(v,y)=>{for(v=String(v);v.length<y;)v=" "+v;return v};console.info(\`%c\\u23F1 \${c(h,5)} /\${c(p,5)} ms\`,\`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(\${Math.max(0,Math.min(120-120*d,120))}deg 100% 31%);\`,n==null?void 0:n.key)}return l}}function F(e,t,n,r){return{debug:()=>{var l;return(l=e==null?void 0:e.debugAll)!=null?l:e[t]},key:!1,onChange:r}}function tp(e,t,n,r){let l=()=>{var i;return(i=o.getValue())!=null?i:e.options.renderFallbackValue},o={id:\`\${t.id}_\${n.id}\`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:l,getContext:P(()=>[e,n,t,o],(i,u,s,a)=>({table:i,column:u,row:s,cell:a,getValue:a.getValue,renderValue:a.renderValue}),F(e.options,"debugCells","cell.getContext"))};return e._features.forEach(i=>{i.createCell==null||i.createCell(o,n,t,e)},{}),o}function np(e,t,n,r){var l,o;let u={...e._getDefaultColumnDef(),...t},s=u.accessorKey,a=(l=(o=u.id)!=null?o:s?typeof String.prototype.replaceAll=="function"?s.replaceAll(".","_"):s.replace(/\\./g,"_"):void 0)!=null?l:typeof u.header=="string"?u.header:void 0,p;if(u.accessorFn?p=u.accessorFn:s&&(s.includes(".")?p=d=>{let c=d;for(let y of s.split(".")){var v;c=(v=c)==null?void 0:v[y]}return c}:p=d=>d[u.accessorKey]),!a)throw new Error;let h={id:\`\${String(a)}\`,accessorFn:p,parent:r,depth:n,columnDef:u,columns:[],getFlatColumns:P(()=>[!0],()=>{var d;return[h,...(d=h.columns)==null?void 0:d.flatMap(c=>c.getFlatColumns())]},F(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:P(()=>[e._getOrderColumnsFn()],d=>{var c;if((c=h.columns)!=null&&c.length){let v=h.columns.flatMap(y=>y.getLeafColumns());return d(v)}return[h]},F(e.options,"debugColumns","column.getLeafColumns"))};for(let d of e._features)d.createColumn==null||d.createColumn(h,e);return h}var ie="debugHeaders";function ff(e,t,n){var r;let o={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{let i=[],u=s=>{s.subHeaders&&s.subHeaders.length&&s.subHeaders.map(u),i.push(s)};return u(o),i},getContext:()=>({table:e,header:o,column:t})};return e._features.forEach(i=>{i.createHeader==null||i.createHeader(o,e)}),o}var rp={createTable:e=>{e.getHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>{var o,i;let u=(o=r==null?void 0:r.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?o:[],s=(i=l==null?void 0:l.map(h=>n.find(d=>d.id===h)).filter(Boolean))!=null?i:[],a=n.filter(h=>!(r!=null&&r.includes(h.id))&&!(l!=null&&l.includes(h.id)));return Hl(t,[...u,...a,...s],e)},F(e.options,ie,"getHeaderGroups")),e.getCenterHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,l)=>(n=n.filter(o=>!(r!=null&&r.includes(o.id))&&!(l!=null&&l.includes(o.id))),Hl(t,n,e,"center")),F(e.options,ie,"getCenterHeaderGroups")),e.getLeftHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Hl(t,o,e,"left")},F(e.options,ie,"getLeftHeaderGroups")),e.getRightHeaderGroups=P(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var l;let o=(l=r==null?void 0:r.map(i=>n.find(u=>u.id===i)).filter(Boolean))!=null?l:[];return Hl(t,o,e,"right")},F(e.options,ie,"getRightHeaderGroups")),e.getFooterGroups=P(()=>[e.getHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getFooterGroups")),e.getLeftFooterGroups=P(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getLeftFooterGroups")),e.getCenterFooterGroups=P(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getCenterFooterGroups")),e.getRightFooterGroups=P(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),F(e.options,ie,"getRightFooterGroups")),e.getFlatHeaders=P(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getFlatHeaders")),e.getLeftFlatHeaders=P(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getLeftFlatHeaders")),e.getCenterFlatHeaders=P(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getCenterFlatHeaders")),e.getRightFlatHeaders=P(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),F(e.options,ie,"getRightFlatHeaders")),e.getCenterLeafHeaders=P(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getCenterLeafHeaders")),e.getLeftLeafHeaders=P(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getLeftLeafHeaders")),e.getRightLeafHeaders=P(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),F(e.options,ie,"getRightLeafHeaders")),e.getLeafHeaders=P(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var l,o,i,u,s,a;return[...(l=(o=t[0])==null?void 0:o.headers)!=null?l:[],...(i=(u=n[0])==null?void 0:u.headers)!=null?i:[],...(s=(a=r[0])==null?void 0:a.headers)!=null?s:[]].map(p=>p.getLeafHeaders()).flat()},F(e.options,ie,"getLeafHeaders"))}};function Hl(e,t,n,r){var l,o;let i=0,u=function(d,c){c===void 0&&(c=1),i=Math.max(i,c),d.filter(v=>v.getIsVisible()).forEach(v=>{var y;(y=v.columns)!=null&&y.length&&u(v.columns,c+1)},0)};u(e);let s=[],a=(d,c)=>{let v={depth:c,id:[r,\`\${c}\`].filter(Boolean).join("_"),headers:[]},y=[];d.forEach(k=>{let g=[...y].reverse()[0],f=k.column.depth===v.depth,m,S=!1;if(f&&k.column.parent?m=k.column.parent:(m=k.column,S=!0),g&&(g==null?void 0:g.column)===m)g.subHeaders.push(k);else{let C=ff(n,m,{id:[r,c,m.id,k==null?void 0:k.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?\`\${y.filter(E=>E.column===m).length}\`:void 0,depth:c,index:y.length});C.subHeaders.push(k),y.push(C)}v.headers.push(k),k.headerGroup=v}),s.push(v),c>0&&a(y,c-1)},p=t.map((d,c)=>ff(n,d,{depth:i,index:c}));a(p,i-1),s.reverse();let h=d=>d.filter(v=>v.column.getIsVisible()).map(v=>{let y=0,k=0,g=[0];v.subHeaders&&v.subHeaders.length?(g=[],h(v.subHeaders).forEach(m=>{let{colSpan:S,rowSpan:C}=m;y+=S,g.push(C)})):y=1;let f=Math.min(...g);return k=k+f,v.colSpan=y,v.rowSpan=k,{colSpan:y,rowSpan:k}});return h((l=(o=s[0])==null?void 0:o.headers)!=null?l:[]),s}var _u=(e,t,n,r,l,o,i)=>{let u={id:t,index:r,original:n,depth:l,parentId:i,_valuesCache:{},_uniqueValuesCache:{},getValue:s=>{if(u._valuesCache.hasOwnProperty(s))return u._valuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return u._valuesCache[s]=a.accessorFn(u.original,r),u._valuesCache[s]},getUniqueValues:s=>{if(u._uniqueValuesCache.hasOwnProperty(s))return u._uniqueValuesCache[s];let a=e.getColumn(s);if(a!=null&&a.accessorFn)return a.columnDef.getUniqueValues?(u._uniqueValuesCache[s]=a.columnDef.getUniqueValues(u.original,r),u._uniqueValuesCache[s]):(u._uniqueValuesCache[s]=[u.getValue(s)],u._uniqueValuesCache[s])},renderValue:s=>{var a;return(a=u.getValue(s))!=null?a:e.options.renderFallbackValue},subRows:o!=null?o:[],getLeafRows:()=>ep(u.subRows,s=>s.subRows),getParentRow:()=>u.parentId?e.getRow(u.parentId,!0):void 0,getParentRows:()=>{let s=[],a=u;for(;;){let p=a.getParentRow();if(!p)break;s.push(p),a=p}return s.reverse()},getAllCells:P(()=>[e.getAllLeafColumns()],s=>s.map(a=>tp(e,u,a,a.id)),F(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:P(()=>[u.getAllCells()],s=>s.reduce((a,p)=>(a[p.column.id]=p,a),{}),F(e.options,"debugRows","getAllCellsByColumnId"))};for(let s=0;s<e._features.length;s++){let a=e._features[s];a==null||a.createRow==null||a.createRow(u,e)}return u},lp={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},gf=(e,t,n)=>{var r,l;let o=n==null||(r=n.toString())==null?void 0:r.toLowerCase();return!!(!((l=e.getValue(t))==null||(l=l.toString())==null||(l=l.toLowerCase())==null)&&l.includes(o))};gf.autoRemove=e=>He(e);var pf=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};pf.autoRemove=e=>He(e);var mf=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};mf.autoRemove=e=>He(e);var hf=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};hf.autoRemove=e=>He(e)||!(e!=null&&e.length);var vf=(e,t,n)=>!n.some(r=>{var l;return!((l=e.getValue(t))!=null&&l.includes(r))});vf.autoRemove=e=>He(e)||!(e!=null&&e.length);var yf=(e,t,n)=>n.some(r=>{var l;return(l=e.getValue(t))==null?void 0:l.includes(r)});yf.autoRemove=e=>He(e)||!(e!=null&&e.length);var Sf=(e,t,n)=>e.getValue(t)===n;Sf.autoRemove=e=>He(e);var wf=(e,t,n)=>e.getValue(t)==n;wf.autoRemove=e=>He(e);var ku=(e,t,n)=>{let[r,l]=n,o=e.getValue(t);return o>=r&&o<=l};ku.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,l=typeof n!="number"?parseFloat(n):n,o=t===null||Number.isNaN(r)?-1/0:r,i=n===null||Number.isNaN(l)?1/0:l;if(o>i){let u=o;o=i,i=u}return[o,i]};ku.autoRemove=e=>He(e)||He(e[0])&&He(e[1]);var rt={includesString:gf,includesStringSensitive:pf,equalsString:mf,arrIncludes:hf,arrIncludesAll:vf,arrIncludesSome:yf,equals:Sf,weakEquals:wf,inNumberRange:ku};function He(e){return e==null||e===""}var op={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Re("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?rt.includesString:typeof r=="number"?rt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?rt.equals:Array.isArray(r)?rt.arrIncludes:rt.weakEquals},e.getFilterFn=()=>{var n,r;return Bl(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:rt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,l;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{let l=e.getFilterFn(),o=r==null?void 0:r.find(p=>p.id===e.id),i=Et(n,o?o.value:void 0);if(df(l,i,e)){var u;return(u=r==null?void 0:r.filter(p=>p.id!==e.id))!=null?u:[]}let s={id:e.id,value:i};if(o){var a;return(a=r==null?void 0:r.map(p=>p.id===e.id?s:p))!=null?a:[]}return r!=null&&r.length?[...r,s]:[s]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{let n=e.getAllLeafColumns(),r=l=>{var o;return(o=Et(t,l))==null?void 0:o.filter(i=>{let u=n.find(s=>s.id===i.id);if(u){let s=u.getFilterFn();if(df(s,i.value,u))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function df(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t=="undefined"||typeof t=="string"&&!t}var ip=(e,t,n)=>n.reduce((r,l)=>{let o=l.getValue(e);return r+(typeof o=="number"?o:0)},0),up=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r>o||r===void 0&&o>=o)&&(r=o)}),r},sp=(e,t,n)=>{let r;return n.forEach(l=>{let o=l.getValue(e);o!=null&&(r<o||r===void 0&&o>=o)&&(r=o)}),r},ap=(e,t,n)=>{let r,l;return n.forEach(o=>{let i=o.getValue(e);i!=null&&(r===void 0?i>=i&&(r=l=i):(r>i&&(r=i),l<i&&(l=i)))}),[r,l]},cp=(e,t)=>{let n=0,r=0;if(t.forEach(l=>{let o=l.getValue(e);o!=null&&(o=+o)>=o&&(++n,r+=o)}),n)return r/n},fp=(e,t)=>{if(!t.length)return;let n=t.map(o=>o.getValue(e));if(!bg(n))return;if(n.length===1)return n[0];let r=Math.floor(n.length/2),l=n.sort((o,i)=>o-i);return n.length%2!==0?l[r]:(l[r-1]+l[r])/2},dp=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),gp=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,pp=(e,t)=>t.length,fu={sum:ip,min:up,max:sp,extent:ap,mean:cp,median:fp,unique:dp,uniqueCount:gp,count:pp},mp={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Re("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n!=null?n:[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{let n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{let n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return fu.sum;if(Object.prototype.toString.call(r)==="[object Date]")return fu.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return Bl(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:fu[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];let r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var l;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((l=n.subRows)!=null&&l.length)}}};function hp(e,t,n){if(!(t!=null&&t.length)||!n)return e;let r=e.filter(o=>!t.includes(o.id));return n==="remove"?r:[...t.map(o=>e.find(i=>i.id===o)).filter(Boolean),...r]}var vp={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Re("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=P(n=>[gr(t,n)],n=>n.findIndex(r=>r.id===e.id),F(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=gr(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;let l=gr(t,n);return((r=l[l.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=P(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>l=>{let o=[];if(!(t!=null&&t.length))o=l;else{let i=[...t],u=[...l];for(;u.length&&i.length;){let s=i.shift(),a=u.findIndex(p=>p.id===s);a>-1&&o.push(u.splice(a,1)[0])}o=[...o,...u]}return hp(o,n,r)},F(e.options,"debugTable","_getOrderColumnsFn"))}},du=()=>({left:[],right:[]}),yp={getInitialState:e=>({columnPinning:du(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Re("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{let r=e.getLeafColumns().map(l=>l.id).filter(Boolean);t.setColumnPinning(l=>{var o,i;if(n==="right"){var u,s;return{left:((u=l==null?void 0:l.left)!=null?u:[]).filter(h=>!(r!=null&&r.includes(h))),right:[...((s=l==null?void 0:l.right)!=null?s:[]).filter(h=>!(r!=null&&r.includes(h))),...r]}}if(n==="left"){var a,p;return{left:[...((a=l==null?void 0:l.left)!=null?a:[]).filter(h=>!(r!=null&&r.includes(h))),...r],right:((p=l==null?void 0:l.right)!=null?p:[]).filter(h=>!(r!=null&&r.includes(h)))}}return{left:((o=l==null?void 0:l.left)!=null?o:[]).filter(h=>!(r!=null&&r.includes(h))),right:((i=l==null?void 0:l.right)!=null?i:[]).filter(h=>!(r!=null&&r.includes(h)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var l,o,i;return((l=r.columnDef.enablePinning)!=null?l:!0)&&((o=(i=t.options.enableColumnPinning)!=null?i:t.options.enablePinning)!=null?o:!0)}),e.getIsPinned=()=>{let n=e.getLeafColumns().map(u=>u.id),{left:r,right:l}=t.getState().columnPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"left":i?"right":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();return l?(n=(r=t.getState().columnPinning)==null||(r=r[l])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,l)=>{let o=[...r!=null?r:[],...l!=null?l:[]];return n.filter(i=>!o.includes(i.column.id))},F(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"left"})),F(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=P(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r!=null?r:[]).map(o=>n.find(i=>i.column.id===o)).filter(Boolean).map(o=>({...o,position:"right"})),F(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?du():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:du())},e.getIsSomeColumnsPinned=t=>{var n;let r=e.getState().columnPinning;if(!t){var l,o;return!!((l=r.left)!=null&&l.length||(o=r.right)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n!=null?n:[]).map(r=>t.find(l=>l.id===r)).filter(Boolean),F(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=P(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{let l=[...n!=null?n:[],...r!=null?r:[]];return t.filter(o=>!l.includes(o.id))},F(e.options,"debugColumns","getCenterLeafColumns"))}},Al={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},gu=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Sp={getDefaultColumnDef:()=>Al,getInitialState:e=>({columnSizing:{},columnSizingInfo:gu(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Re("columnSizing",e),onColumnSizingInfoChange:Re("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,l;let o=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Al.minSize,(r=o!=null?o:e.columnDef.size)!=null?r:Al.size),(l=e.columnDef.maxSize)!=null?l:Al.maxSize)},e.getStart=P(n=>[n,gr(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getStart")),e.getAfter=P(n=>[n,gr(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((l,o)=>l+o.getSize(),0),F(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...l}=n;return l})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0,r=l=>{if(l.subHeaders.length)l.subHeaders.forEach(r);else{var o;n+=(o=l.column.getSize())!=null?o:0}};return r(e),n},e.getStart=()=>{if(e.index>0){let n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{let r=t.getColumn(e.column.id),l=r==null?void 0:r.getCanResize();return o=>{if(!r||!l||(o.persist==null||o.persist(),pu(o)&&o.touches&&o.touches.length>1))return;let i=e.getSize(),u=e?e.getLeafHeaders().map(g=>[g.column.id,g.column.getSize()]):[[r.id,r.getSize()]],s=pu(o)?Math.round(o.touches[0].clientX):o.clientX,a={},p=(g,f)=>{typeof f=="number"&&(t.setColumnSizingInfo(m=>{var S,C;let E=t.options.columnResizeDirection==="rtl"?-1:1,R=(f-((S=m==null?void 0:m.startOffset)!=null?S:0))*E,x=Math.max(R/((C=m==null?void 0:m.startSize)!=null?C:0),-.999999);return m.columnSizingStart.forEach(H=>{let[N,M]=H;a[N]=Math.round(Math.max(M+M*x,0)*100)/100}),{...m,deltaOffset:R,deltaPercentage:x}}),(t.options.columnResizeMode==="onChange"||g==="end")&&t.setColumnSizing(m=>({...m,...a})))},h=g=>p("move",g),d=g=>{p("end",g),t.setColumnSizingInfo(f=>({...f,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},c=n||typeof document!="undefined"?document:null,v={moveHandler:g=>h(g.clientX),upHandler:g=>{c==null||c.removeEventListener("mousemove",v.moveHandler),c==null||c.removeEventListener("mouseup",v.upHandler),d(g.clientX)}},y={moveHandler:g=>(g.cancelable&&(g.preventDefault(),g.stopPropagation()),h(g.touches[0].clientX),!1),upHandler:g=>{var f;c==null||c.removeEventListener("touchmove",y.moveHandler),c==null||c.removeEventListener("touchend",y.upHandler),g.cancelable&&(g.preventDefault(),g.stopPropagation()),d((f=g.touches[0])==null?void 0:f.clientX)}},k=wp()?{passive:!1}:!1;pu(o)?(c==null||c.addEventListener("touchmove",y.moveHandler,k),c==null||c.addEventListener("touchend",y.upHandler,k)):(c==null||c.addEventListener("mousemove",v.moveHandler,k),c==null||c.addEventListener("mouseup",v.upHandler,k)),t.setColumnSizingInfo(g=>({...g,startOffset:s,startSize:i,deltaOffset:0,deltaPercentage:0,columnSizingStart:u,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?gu():(n=e.initialState.columnSizingInfo)!=null?n:gu())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,l)=>r+l.getSize(),0))!=null?t:0}}},jl=null;function wp(){if(typeof jl=="boolean")return jl;let e=!1;try{let t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch(t){e=!1}return jl=e,jl}function pu(e){return e.type==="touchstart"}var Cp={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Re("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n!=null?n:!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;let l=e.columns;return(n=l.length?l.some(o=>o.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=P(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),F(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=P(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,l)=>[...n,...r,...l],F(t.options,"debugRows","getVisibleCells"))},createTable:e=>{let t=(n,r)=>P(()=>[r(),r().filter(l=>l.getIsVisible()).map(l=>l.id).join("_")],l=>l.filter(o=>o.getIsVisible==null?void 0:o.getIsVisible()),F(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((l,o)=>({...l,[o.id]:n||!(o.getCanHide!=null&&o.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function gr(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}var Rp={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},_p={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Re("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;let r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,l,o;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((l=t.options.enableFilters)!=null?l:!0)&&((o=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?o:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>rt.includesString,e.getGlobalFilterFn=()=>{var t,n;let{globalFilterFn:r}=e.options;return Bl(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:rt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},kp={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Re("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{(r!=null?r:!e.getIsAllRowsExpanded())?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var l,o;e.setExpanded(r?{}:(l=(o=e.initialState)==null?void 0:o.expanded)!=null?l:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{let r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{let r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(l=>!l.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(o=>{let i=o.split(".");r=Math.max(r,i.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var l;let o=r===!0?!0:!!(r!=null&&r[e.id]),i={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(u=>{i[u]=!0}):i=r,n=(l=n)!=null?l:!o,!o&&n)return{...i,[e.id]:!0};if(o&&!n){let{[e.id]:u,...s}=i;return s}return r})},e.getIsExpanded=()=>{var n;let r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,l;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((l=e.subRows)!=null&&l.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{let n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},yu=0,Su=10,mu=()=>({pageIndex:yu,pageSize:Su}),Ep={getInitialState:e=>({...e,pagination:{...mu(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Re("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,l;if(!t){e._queue(()=>{t=!0});return}if((r=(l=e.options.autoResetAll)!=null?l:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{let l=o=>Et(r,o);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(l)},e.resetPagination=r=>{var l;e.setPagination(r?mu():(l=e.initialState.pagination)!=null?l:mu())},e.setPageIndex=r=>{e.setPagination(l=>{let o=Et(r,l.pageIndex),i=typeof e.options.pageCount=="undefined"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return o=Math.max(0,Math.min(o,i)),{...l,pageIndex:o}})},e.resetPageIndex=r=>{var l,o;e.setPageIndex(r?yu:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageIndex)!=null?l:yu)},e.resetPageSize=r=>{var l,o;e.setPageSize(r?Su:(l=(o=e.initialState)==null||(o=o.pagination)==null?void 0:o.pageSize)!=null?l:Su)},e.setPageSize=r=>{e.setPagination(l=>{let o=Math.max(1,Et(r,l.pageSize)),i=l.pageSize*l.pageIndex,u=Math.floor(i/o);return{...l,pageIndex:u,pageSize:o}})},e.setPageCount=r=>e.setPagination(l=>{var o;let i=Et(r,(o=e.options.pageCount)!=null?o:-1);return typeof i=="number"&&(i=Math.max(-1,i)),{...l,pageCount:i}}),e.getPageOptions=P(()=>[e.getPageCount()],r=>{let l=[];return r&&r>0&&(l=[...new Array(r)].fill(null).map((o,i)=>i)),l},F(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{let{pageIndex:r}=e.getState().pagination,l=e.getPageCount();return l===-1?!0:l===0?!1:r<l-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},hu=()=>({top:[],bottom:[]}),xp={getInitialState:e=>({rowPinning:hu(),...e}),getDefaultOptions:e=>({onRowPinningChange:Re("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,l)=>{let o=r?e.getLeafRows().map(s=>{let{id:a}=s;return a}):[],i=l?e.getParentRows().map(s=>{let{id:a}=s;return a}):[],u=new Set([...i,e.id,...o]);t.setRowPinning(s=>{var a,p;if(n==="bottom"){var h,d;return{top:((h=s==null?void 0:s.top)!=null?h:[]).filter(y=>!(u!=null&&u.has(y))),bottom:[...((d=s==null?void 0:s.bottom)!=null?d:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)]}}if(n==="top"){var c,v;return{top:[...((c=s==null?void 0:s.top)!=null?c:[]).filter(y=>!(u!=null&&u.has(y))),...Array.from(u)],bottom:((v=s==null?void 0:s.bottom)!=null?v:[]).filter(y=>!(u!=null&&u.has(y)))}}return{top:((a=s==null?void 0:s.top)!=null?a:[]).filter(y=>!(u!=null&&u.has(y))),bottom:((p=s==null?void 0:s.bottom)!=null?p:[]).filter(y=>!(u!=null&&u.has(y)))}})},e.getCanPin=()=>{var n;let{enableRowPinning:r,enablePinning:l}=t.options;return typeof r=="function"?r(e):(n=r!=null?r:l)!=null?n:!0},e.getIsPinned=()=>{let n=[e.id],{top:r,bottom:l}=t.getState().rowPinning,o=n.some(u=>r==null?void 0:r.includes(u)),i=n.some(u=>l==null?void 0:l.includes(u));return o?"top":i?"bottom":!1},e.getPinnedIndex=()=>{var n,r;let l=e.getIsPinned();if(!l)return-1;let o=(n=l==="top"?t.getTopRows():t.getBottomRows())==null?void 0:n.map(i=>{let{id:u}=i;return u});return(r=o==null?void 0:o.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?hu():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:hu())},e.getIsSomeRowsPinned=t=>{var n;let r=e.getState().rowPinning;if(!t){var l,o;return!!((l=r.top)!=null&&l.length||(o=r.bottom)!=null&&o.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=(t,n,r)=>{var l;return((l=e.options.keepPinnedRows)==null||l?(n!=null?n:[]).map(i=>{let u=e.getRow(i,!0);return u.getIsAllParentsExpanded()?u:null}):(n!=null?n:[]).map(i=>t.find(u=>u.id===i))).filter(Boolean).map(i=>({...i,position:r}))},e.getTopRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(t,n)=>e._getPinnedRows(t,n,"top"),F(e.options,"debugRows","getTopRows")),e.getBottomRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(t,n)=>e._getPinnedRows(t,n,"bottom"),F(e.options,"debugRows","getBottomRows")),e.getCenterRows=P(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{let l=new Set([...n!=null?n:[],...r!=null?r:[]]);return t.filter(o=>!l.has(o.id))},F(e.options,"debugRows","getCenterRows"))}},Pp={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Re("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t!="undefined"?t:!e.getIsAllRowsSelected();let r={...n},l=e.getPreGroupedRowModel().flatRows;return t?l.forEach(o=>{o.getCanSelect()&&(r[o.id]=!0)}):l.forEach(o=>{delete r[o.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{let r=typeof t!="undefined"?t:!e.getIsAllPageRowsSelected(),l={...n};return e.getRowModel().rows.forEach(o=>{wu(l,o.id,r,!0,e)}),l}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=P(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?vu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=P(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?vu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=P(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?vu(e,n):{rows:[],flatRows:[],rowsById:{}},F(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{let t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState(),r=!!(t.length&&Object.keys(n).length);return r&&t.some(l=>l.getCanSelect()&&!n[l.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows.filter(l=>l.getCanSelect()),{rowSelection:n}=e.getState(),r=!!t.length;return r&&t.some(l=>!n[l.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;let n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{let t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{let l=e.getIsSelected();t.setRowSelection(o=>{var i;if(n=typeof n!="undefined"?n:!l,e.getCanSelect()&&l===n)return o;let u={...o};return wu(u,e.id,n,(i=r==null?void 0:r.selectChildren)!=null?i:!0,t),u})},e.getIsSelected=()=>{let{rowSelection:n}=t.getState();return Eu(e,n)},e.getIsSomeSelected=()=>{let{rowSelection:n}=t.getState();return Cu(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{let{rowSelection:n}=t.getState();return Cu(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{let n=e.getCanSelect();return r=>{var l;n&&e.toggleSelected((l=r.target)==null?void 0:l.checked)}}}},wu=(e,t,n,r,l)=>{var o;let i=l.getRow(t,!0);n?(i.getCanMultiSelect()||Object.keys(e).forEach(u=>delete e[u]),i.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(o=i.subRows)!=null&&o.length&&i.getCanSelectSubRows()&&i.subRows.forEach(u=>wu(e,u.id,n,r,l))};function vu(e,t){let n=e.getState().rowSelection,r=[],l={},o=function(i,u){return i.map(s=>{var a;let p=Eu(s,n);if(p&&(r.push(s),l[s.id]=s),(a=s.subRows)!=null&&a.length&&(s={...s,subRows:o(s.subRows)}),p)return s}).filter(Boolean)};return{rows:o(t.rows),flatRows:r,rowsById:l}}function Eu(e,t){var n;return(n=t[e.id])!=null?n:!1}function Cu(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let l=!0,o=!1;return e.subRows.forEach(i=>{if(!(o&&!l)&&(i.getCanSelect()&&(Eu(i,t)?o=!0:l=!1),i.subRows&&i.subRows.length)){let u=Cu(i,t);u==="all"?o=!0:(u==="some"&&(o=!0),l=!1)}}),l?"all":o?"some":!1}var Ru=/([0-9]+)/gm,Fp=(e,t,n)=>Cf(xt(e.getValue(n)).toLowerCase(),xt(t.getValue(n)).toLowerCase()),Mp=(e,t,n)=>Cf(xt(e.getValue(n)),xt(t.getValue(n))),Ip=(e,t,n)=>xu(xt(e.getValue(n)).toLowerCase(),xt(t.getValue(n)).toLowerCase()),zp=(e,t,n)=>xu(xt(e.getValue(n)),xt(t.getValue(n))),Np=(e,t,n)=>{let r=e.getValue(n),l=t.getValue(n);return r>l?1:r<l?-1:0},Lp=(e,t,n)=>xu(e.getValue(n),t.getValue(n));function xu(e,t){return e===t?0:e>t?1:-1}function xt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Cf(e,t){let n=e.split(Ru).filter(Boolean),r=t.split(Ru).filter(Boolean);for(;n.length&&r.length;){let l=n.shift(),o=r.shift(),i=parseInt(l,10),u=parseInt(o,10),s=[i,u].sort();if(isNaN(s[0])){if(l>o)return 1;if(o>l)return-1;continue}if(isNaN(s[1]))return isNaN(i)?-1:1;if(i>u)return 1;if(u>i)return-1}return n.length-r.length}var dr={alphanumeric:Fp,alphanumericCaseSensitive:Mp,text:Ip,textCaseSensitive:zp,datetime:Np,basic:Lp},Vp={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Re("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{let n=t.getFilteredRowModel().flatRows.slice(10),r=!1;for(let l of n){let o=l==null?void 0:l.getValue(e.id);if(Object.prototype.toString.call(o)==="[object Date]")return dr.datetime;if(typeof o=="string"&&(r=!0,o.split(Ru).length>1))return dr.alphanumeric}return r?dr.text:dr.basic},e.getAutoSortDir=()=>{let n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return Bl(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:dr[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{let l=e.getNextSortingOrder(),o=typeof n!="undefined"&&n!==null;t.setSorting(i=>{let u=i==null?void 0:i.find(c=>c.id===e.id),s=i==null?void 0:i.findIndex(c=>c.id===e.id),a=[],p,h=o?n:l==="desc";if(i!=null&&i.length&&e.getCanMultiSort()&&r?u?p="toggle":p="add":i!=null&&i.length&&s!==i.length-1?p="replace":u?p="toggle":p="replace",p==="toggle"&&(o||l||(p="remove")),p==="add"){var d;a=[...i,{id:e.id,desc:h}],a.splice(0,a.length-((d=t.options.maxMultiSortColCount)!=null?d:Number.MAX_SAFE_INTEGER))}else p==="toggle"?a=i.map(c=>c.id===e.id?{...c,desc:h}:c):p==="remove"?a=i.filter(c=>c.id!==e.id):a=[{id:e.id,desc:h}];return a})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,l;let o=e.getFirstSortDir(),i=e.getIsSorted();return i?i!==o&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(l=t.options.enableMultiRemove)!=null)||l)?!1:i==="desc"?"asc":"desc":o},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;let r=(n=t.getState().sorting)==null?void 0:n.find(l=>l.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(l=>l.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{let n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},$p=[rp,Cp,vp,yp,lp,op,Rp,_p,Vp,mp,kp,Ep,xp,Pp,Sp];function Rf(e){var t,n;let r=[...$p,...(t=e._features)!=null?t:[]],l={_features:r},o=l._features.reduce((d,c)=>Object.assign(d,c.getDefaultOptions==null?void 0:c.getDefaultOptions(l)),{}),i=d=>l.options.mergeOptions?l.options.mergeOptions(o,d):{...o,...d},s={...{},...(n=e.initialState)!=null?n:{}};l._features.forEach(d=>{var c;s=(c=d.getInitialState==null?void 0:d.getInitialState(s))!=null?c:s});let a=[],p=!1,h={_features:r,options:{...o,...e},initialState:s,_queue:d=>{a.push(d),p||(p=!0,Promise.resolve().then(()=>{for(;a.length;)a.shift()();p=!1}).catch(c=>setTimeout(()=>{throw c})))},reset:()=>{l.setState(l.initialState)},setOptions:d=>{let c=Et(d,l.options);l.options=i(c)},getState:()=>l.options.state,setState:d=>{l.options.onStateChange==null||l.options.onStateChange(d)},_getRowId:(d,c,v)=>{var y;return(y=l.options.getRowId==null?void 0:l.options.getRowId(d,c,v))!=null?y:\`\${v?[v.id,c].join("."):c}\`},getCoreRowModel:()=>(l._getCoreRowModel||(l._getCoreRowModel=l.options.getCoreRowModel(l)),l._getCoreRowModel()),getRowModel:()=>l.getPaginationRowModel(),getRow:(d,c)=>{let v=(c?l.getPrePaginationRowModel():l.getRowModel()).rowsById[d];if(!v&&(v=l.getCoreRowModel().rowsById[d],!v))throw new Error;return v},_getDefaultColumnDef:P(()=>[l.options.defaultColumn],d=>{var c;return d=(c=d)!=null?c:{},{header:v=>{let y=v.header.column.columnDef;return y.accessorKey?y.accessorKey:y.accessorFn?y.id:null},cell:v=>{var y,k;return(y=(k=v.renderValue())==null||k.toString==null?void 0:k.toString())!=null?y:null},...l._features.reduce((v,y)=>Object.assign(v,y.getDefaultColumnDef==null?void 0:y.getDefaultColumnDef()),{}),...d}},F(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>l.options.columns,getAllColumns:P(()=>[l._getColumnDefs()],d=>{let c=function(v,y,k){return k===void 0&&(k=0),v.map(g=>{let f=np(l,g,k,y),m=g;return f.columns=m.columns?c(m.columns,f,k+1):[],f})};return c(d)},F(e,"debugColumns","getAllColumns")),getAllFlatColumns:P(()=>[l.getAllColumns()],d=>d.flatMap(c=>c.getFlatColumns()),F(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:P(()=>[l.getAllFlatColumns()],d=>d.reduce((c,v)=>(c[v.id]=v,c),{}),F(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:P(()=>[l.getAllColumns(),l._getOrderColumnsFn()],(d,c)=>{let v=d.flatMap(y=>y.getLeafColumns());return c(v)},F(e,"debugColumns","getAllLeafColumns")),getColumn:d=>l._getAllFlatColumnsById()[d]};Object.assign(l,h);for(let d=0;d<l._features.length;d++){let c=l._features[d];c==null||c.createTable==null||c.createTable(l)}return l}function _f(){return e=>P(()=>[e.options.data],t=>{let n={rows:[],flatRows:[],rowsById:{}},r=function(l,o,i){o===void 0&&(o=0);let u=[];for(let a=0;a<l.length;a++){let p=_u(e,e._getRowId(l[a],a,i),l[a],a,o,void 0,i==null?void 0:i.id);if(n.flatRows.push(p),n.rowsById[p.id]=p,u.push(p),e.options.getSubRows){var s;p.originalSubRows=e.options.getSubRows(l[a],a),(s=p.originalSubRows)!=null&&s.length&&(p.subRows=r(p.originalSubRows,o+1,p))}}return u};return n.rows=r(t),n},F(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Dp(e){let t=[],n=r=>{var l;t.push(r),(l=r.subRows)!=null&&l.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Tp(e,t,n){return n.options.filterFromLeafRows?Op(e,t,n):Hp(e,t,n)}function Op(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){var h;let c=s[d],v=_u(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);if(v.columnFilters=c.columnFilters,(h=c.subRows)!=null&&h.length&&a<i){if(v.subRows=u(c.subRows,a+1),c=v,t(c)&&!v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}if(t(c)||v.subRows.length){p.push(c),o[c.id]=c,l.push(c);continue}}else c=v,t(c)&&(p.push(c),o[c.id]=c,l.push(c))}return p};return{rows:u(e),flatRows:l,rowsById:o}}function Hp(e,t,n){var r;let l=[],o={},i=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,u=function(s,a){a===void 0&&(a=0);let p=[];for(let d=0;d<s.length;d++){let c=s[d];if(t(c)){var h;if((h=c.subRows)!=null&&h.length&&a<i){let y=_u(n,c.id,c.original,c.index,c.depth,void 0,c.parentId);y.subRows=u(c.subRows,a+1),c=y}p.push(c),l.push(c),o[c.id]=c}}return p};return{rows:u(e),flatRows:l,rowsById:o}}function kf(){return e=>P(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let d=0;d<t.flatRows.length;d++)t.flatRows[d].columnFilters={},t.flatRows[d].columnFiltersMeta={};return t}let l=[],o=[];(n!=null?n:[]).forEach(d=>{var c;let v=e.getColumn(d.id);if(!v)return;let y=v.getFilterFn();y&&l.push({id:d.id,filterFn:y,resolvedValue:(c=y.resolveFilterValue==null?void 0:y.resolveFilterValue(d.value))!=null?c:d.value})});let i=(n!=null?n:[]).map(d=>d.id),u=e.getGlobalFilterFn(),s=e.getAllLeafColumns().filter(d=>d.getCanGlobalFilter());r&&u&&s.length&&(i.push("__global__"),s.forEach(d=>{var c;o.push({id:d.id,filterFn:u,resolvedValue:(c=u.resolveFilterValue==null?void 0:u.resolveFilterValue(r))!=null?c:r})}));let a,p;for(let d=0;d<t.flatRows.length;d++){let c=t.flatRows[d];if(c.columnFilters={},l.length)for(let v=0;v<l.length;v++){a=l[v];let y=a.id;c.columnFilters[y]=a.filterFn(c,y,a.resolvedValue,k=>{c.columnFiltersMeta[y]=k})}if(o.length){for(let v=0;v<o.length;v++){p=o[v];let y=p.id;if(p.filterFn(c,y,p.resolvedValue,k=>{c.columnFiltersMeta[y]=k})){c.columnFilters.__global__=!0;break}}c.columnFilters.__global__!==!0&&(c.columnFilters.__global__=!1)}}let h=d=>{for(let c=0;c<i.length;c++)if(d.columnFilters[i[c]]===!1)return!1;return!0};return Tp(t.rows,h,e)},F(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function Ef(e){return t=>P(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;let{pageSize:l,pageIndex:o}=n,{rows:i,flatRows:u,rowsById:s}=r,a=l*o,p=a+l;i=i.slice(a,p);let h;t.options.paginateExpandedRows?h={rows:i,flatRows:u,rowsById:s}:h=Dp({rows:i,flatRows:u,rowsById:s}),h.flatRows=[];let d=c=>{h.flatRows.push(c),c.subRows.length&&c.subRows.forEach(d)};return h.rows.forEach(d),h},F(t.options,"debugTable","getPaginationRowModel"))}function xf(){return e=>P(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;let r=e.getState().sorting,l=[],o=r.filter(s=>{var a;return(a=e.getColumn(s.id))==null?void 0:a.getCanSort()}),i={};o.forEach(s=>{let a=e.getColumn(s.id);a&&(i[s.id]={sortUndefined:a.columnDef.sortUndefined,invertSorting:a.columnDef.invertSorting,sortingFn:a.getSortingFn()})});let u=s=>{let a=s.map(p=>({...p}));return a.sort((p,h)=>{for(let c=0;c<o.length;c+=1){var d;let v=o[c],y=i[v.id],k=y.sortUndefined,g=(d=v==null?void 0:v.desc)!=null?d:!1,f=0;if(k){let m=p.getValue(v.id),S=h.getValue(v.id),C=m===void 0,E=S===void 0;if(C||E){if(k==="first")return C?-1:1;if(k==="last")return C?1:-1;f=C&&E?0:C?k:-k}}if(f===0&&(f=y.sortingFn(p,h,v.id)),f!==0)return g&&(f*=-1),y.invertSorting&&(f*=-1),f}return p.index-h.index}),a.forEach(p=>{var h;l.push(p),(h=p.subRows)!=null&&h.length&&(p.subRows=u(p.subRows))}),a};return{rows:u(n.rows),flatRows:l,rowsById:n.rowsById}},F(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}function Ul(e,t){return e?Ap(e)?pr.createElement(e,t):e:null}function Ap(e){return jp(e)||typeof e=="function"||Bp(e)}function jp(e){return typeof e=="function"&&(()=>{let t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Bp(e){return typeof e=="object"&&typeof e.$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$typeof.description)}function Pf(e){let t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=pr.useState(()=>({current:Rf(t)})),[r,l]=pr.useState(()=>n.current.initialState);return n.current.setOptions(o=>({...o,...e,state:{...r,...e.state},onStateChange:i=>{l(i),e.onStateChange==null||e.onStateChange(i)}})),n.current}var I=_e.default.createElement;function Up(){return I("span",{className:"th-sort-icon","aria-hidden":"true"},I("svg",{className:"sort-up",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 0 8 5H0z"})),I("svg",{className:"sort-down",width:8,height:5,viewBox:"0 0 8 5",fill:"currentColor"},I("path",{d:"M4 5 0 0h8z"})))}function Gp(e,t){let n=[];return t&&n.push({id:"select",header:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.table.getIsAllPageRowsSelected(),ref:function(l){l&&(l.indeterminate=r.table.getIsSomePageRowsSelected()&&!r.table.getIsAllPageRowsSelected())},onChange:r.table.getToggleAllPageRowsSelectedHandler(),"aria-label":"\\u5168\\u9009\\u5F53\\u524D\\u9875"})},cell:function(r){return I("input",{type:"checkbox",className:"chk",checked:r.row.getIsSelected(),onChange:r.row.getToggleSelectedHandler(),"aria-label":"\\u9009\\u62E9\\u884C"})},enableSorting:!1,enableGlobalFilter:!1}),(e||[]).forEach(function(r){n.push({accessorKey:r.key,header:r.label,enableSorting:r.sortable!==!1,meta:{badge:r.badge,mono:r.mono,numeric:r.numeric,key:r.key},cell:function(l){var o=l.getValue(),i=l.column.columnDef.meta||{};return i.badge?I("span",{className:"badge"},o!=null?String(o):""):i.numeric&&o!=null?i.key==="weight"?String(o):Number(o).toFixed(1):i.mono?o!=null?String(o):"":r.link?I("button",{type:"button",className:"org-name-btn",onClick:r.onLinkClick?function(){r.onLinkClick(l.row.original)}:void 0},o!=null?String(o):""):o!=null?String(o):""}})}),n}function Wp(e){var t=e.columnDefs,n=e.data||[],r=e.pageSize||10,l=e.filterPlaceholder||"\\u641C\\u7D22\\u5168\\u90E8\\u5217\\u2026",o=!!e.selectable,i=e.selectedIds||{},u=(0,_e.useState)([]),s=u[0],a=u[1],p=(0,_e.useState)([]),h=p[0],d=p[1],c=(0,_e.useState)(""),v=c[0],y=c[1],k=(0,_e.useState)({}),g=k[0],f=k[1],m=(0,_e.useState)({pageIndex:0,pageSize:r}),S=m[0],C=m[1];(0,_e.useEffect)(function(){if(o){var M={};Object.keys(i).forEach(function(j){i[j]&&(M[j]=!0)}),f(M)}},[i,o]);var E=(0,_e.useMemo)(function(){return Gp(t,o)},[t,o]),R=Pf({data:n,columns:E,state:{sorting:s,columnFilters:h,globalFilter:v,rowSelection:g,pagination:S},enableRowSelection:o,getRowId:function(M){return String(M.id!=null?M.id:M.no!=null?M.no:M.code!=null?M.code:M._idx)},onSortingChange:a,onColumnFiltersChange:d,onGlobalFilterChange:y,onRowSelectionChange:function(M){f(function(j){var Ae=typeof M=="function"?M(j):M;return e.onSelectionChange&&e.onSelectionChange(Ae),Ae})},onPaginationChange:C,getCoreRowModel:_f(),getSortedRowModel:xf(),getFilteredRowModel:kf(),getPaginationRowModel:Ef(),globalFilterFn:"includesString"}),x=I(_e.default.Fragment,null,I("input",{className:"dt-filter-input",type:"search",placeholder:l,value:v!=null?v:"",onChange:function(M){y(M.target.value)}}),I("span",{className:"dt-meta"},"\\u5171 "+n.length+" \\u6761 \\xB7 \\u7B5B\\u9009\\u540E "+R.getFilteredRowModel().rows.length+" \\u6761")),H=null;try{e.filterHostId&&(H=document.getElementById(e.filterHostId))}catch(M){}var N=H?(0,Mf.createPortal)(x,H):I("div",{className:"dt-toolbar"},x);return I("div",{className:"data-table"},N,I("div",{className:"table-wrap dt-table-wrap"},I("table",{className:"table"},I("thead",null,R.getHeaderGroups().map(function(M){return I("tr",{key:M.id},M.headers.map(function(j){var Ae=j.column.getCanSort(),Fu=j.column.getIsSorted(),Mu=(Ae?"th-sort":"")+(Fu?" is-"+Fu:"");return j.id==="select"&&(Mu="th-chk"),I("th",{key:j.id,className:Mu,onClick:Ae?j.column.getToggleSortingHandler():void 0},Ae?I("span",{className:"th-sort-inner"},Ul(j.column.columnDef.header,j.getContext()),I(Up,null)):Ul(j.column.columnDef.header,j.getContext()))}))})),I("tbody",null,R.getRowModel().rows.length?R.getRowModel().rows.map(function(M){return I("tr",{key:M.id},M.getVisibleCells().map(function(j){var Ae="";return j.column.id==="select"?Ae="td-chk":j.column.columnDef.meta&&j.column.columnDef.meta.mono&&(Ae="cfg"),I("td",{key:j.id,className:Ae},Ul(j.column.columnDef.cell,j.getContext()))}))}):I("tr",null,I("td",{colSpan:E.length,className:"dt-empty"},"\\u6682\\u65E0\\u6570\\u636E"))))),I("div",{className:"dt-pagination"},I("span",{className:"dt-page-info"},"\\u7B2C "+(R.getState().pagination.pageIndex+1)+" / "+Math.max(1,R.getPageCount())+" \\u9875"),I("span",{className:"org-pager"},I("button",{className:"icon-btn sm",type:"button",disabled:!R.getCanPreviousPage(),onClick:function(){R.previousPage()},"aria-label":"\\u4E0A\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m15 18-6-6 6-6"}))),I("select",{className:"dt-page-size",value:String(R.getState().pagination.pageSize),onChange:function(M){R.setPageSize(Number(M.target.value))},"aria-label":"\\u6BCF\\u9875\\u6761\\u6570"},[10,20,50,100].map(function(M){return I("option",{key:M,value:String(M)},M+"\\u6761/\\u9875")})),I("button",{className:"icon-btn sm",type:"button",disabled:!R.getCanNextPage(),onClick:function(){R.nextPage()},"aria-label":"\\u4E0B\\u4E00\\u9875"},I("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},I("path",{d:"m9 18 6-6-6-6"}))))))}var Pu={};function Qp(e,t,n,r,l){var o=document.getElementById(t);if(!o)return;var i=r||[],u=l||{},s=(0,Ff.createRoot)(o);function a(p,h){p&&(i=p),h&&(u=Object.assign({},u,h)),s.render(I(Wp,{columnDefs:n,data:i,pageSize:u.pageSize,filterPlaceholder:u.filterPlaceholder,selectable:u.selectable,selectedIds:u.selectedIds,onSelectionChange:u.onSelectionChange,filterHostId:u.filterHostId}))}Pu[e]={render:a,root:s},a(r,l)}window.__cqDataTable={mount:Qp,setData:function(e,t,n){Pu[e]&&Pu[e].render(t,n)}};typeof window.__CQ_TABLE_BOOT=="function"&&window.__CQ_TABLE_BOOT();})();
`;
    const ROOT_ID = "shadcn-hello-inject-root";
    document.getElementById(ROOT_ID)?.remove();

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
        }

        body {
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
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
            font-size: .9375rem;
            font-weight: 600;
            letter-spacing: -.02em;
            color: var(--sidebar-foreground);
            line-height: 1.3;
        }

        .sidebar-sub {
            display: block;
            margin-top: 2px;
            font-size: 11px;
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
            font-size: .8125rem;
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
            font-size: 10px;
            font-weight: 600;
            letter-spacing: .06em;
            color: var(--muted-foreground);
            user-select: none;
        }

        .readonly-hint {
            flex-shrink: 0;
            font-size: 12px;
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
            font-size: 1.25rem;
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
            font-size: 1.375rem;
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
        }

        .data-table-mount {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
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
            font-size: .8125rem;
        }

        .dt-filter-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--background), 0 0 0 4px color-mix(in oklch, var(--ring) 30%, transparent);
        }

        .dt-meta {
            font-size: 12px;
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
            font-size: 12px;
            color: var(--muted-foreground);
        }

        .dt-page-size {
            height: 28px;
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            font-size: 12px;
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
            font-size: 11px;
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
            font-size: .8125rem;
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
            font-size: .8125rem;
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
            height: 2.25rem;
            padding: 0 .4375rem;
            text-align: left;
            vertical-align: middle;
            font-weight: 500;
            color: var(--foreground);
            background: color-mix(in oklch, var(--background) 48%, transparent);
            backdrop-filter: blur(20px) saturate(1.15);
            -webkit-backdrop-filter: blur(20px) saturate(1.15);
            white-space: nowrap;
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
            vertical-align: middle;
            white-space: nowrap;
            font-variant-numeric: tabular-nums;
            background: transparent;
        }

        .table td.cfg {
            font: 12px/1.4 ui-monospace, Consolas, monospace;
            color: var(--muted-foreground);
        }

        .status-line {
            min-height: 1.3em;
            font-size: 12px;
            color: var(--muted-foreground);
            line-height: 1.5;
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
            font-size: 1rem;
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
            font-size: 12px;
            color: var(--muted-foreground);
        }
        .dialog-field select,
        .dialog-field textarea {
            border: 1px solid var(--input);
            border-radius: calc(var(--radius) - 4px);
            background: var(--background);
            color: var(--foreground);
            padding: 0 8px;
            font-size: 13px;
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
            font-size: 12px;
            font-weight: 500;
            color: var(--foreground);
        }
        .cfg-panel-hint {
            font-size: 11px;
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
            font-size: 12px;
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
            font-size: 11px;
            color: var(--muted-foreground);
            text-align: right;
        }
        .cfg-row-suffix {
            flex-shrink: 0;
            font-size: 11px;
            color: var(--muted-foreground);
        }
        .cfg-text-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .cfg-text-field label {
            font-size: 11px;
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
            font-size: 12px;
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
            font-size: 13px;
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
            font-size: 12px;
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
            font-size: 12px;
            color: var(--muted-foreground);
        }
        .btn-link {
            border: none;
            background: transparent;
            color: var(--primary);
            font: inherit;
            font-size: 12px;
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
            font-size: 12px;
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
                    <span class="sidebar-title">党群绩效评价</span>
                    <span class="sidebar-sub">评价与配置管理</span>
                </div>
                <nav class="sidebar-nav" role="tablist" aria-label="主导航">
                    <button class="nav-item is-active" id="tab-quarterly" type="button" role="tab"
                        aria-selected="true" aria-controls="panel-quarterly" data-tab="quarterly">季度评价结果</button>
                    <button class="nav-item" id="tab-annual" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-annual" data-tab="annual">年度评价结果</button>
                    <button class="nav-item" id="tab-config" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-config" data-tab="config">配置项管理</button>
                    <span class="nav-group-label">基础数据（只读）</span>
                    <button class="nav-item" id="tab-deduction" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-deduction" data-tab="deduction">扣分项台账</button>
                    <button class="nav-item" id="tab-party-quarterly" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-partyQuarterly" data-tab="partyQuarterly">季度党群绩效</button>
                    <button class="nav-item" id="tab-org" type="button" role="tab"
                        aria-selected="false" aria-controls="panel-org" data-tab="org">党组织</button>
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
                <p class="readonly-hint">只读展示扣分项台账，后续将对接苍穹数据源。</p>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-outline" id="tbl-deduction-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-deduction"></div>
                </div>
                <div class="data-table-mount" id="dt-deduction"></div>
            </section>

            <section class="tab-panel" id="panel-partyQuarterly" role="tabpanel" aria-labelledby="tab-party-quarterly" hidden>
                <p class="readonly-hint">只读展示季度党群绩效贡献度，后续将对接苍穹数据源。</p>
                <div class="toolbar">
                    <div class="toolbar-actions">
                        <button class="btn btn-outline" id="tbl-partyQuarterly-export" type="button">导出</button>
                    </div>
                    <div class="toolbar-right" id="dt-filter-partyQuarterly"></div>
                </div>
                <div class="data-table-mount" id="dt-partyQuarterly"></div>
            </section>

            <section class="tab-panel" id="panel-org" role="tabpanel" aria-labelledby="tab-org" hidden>
                <p class="readonly-hint">只读展示当前党组织树形结构，点击左侧节点查看下级组织。</p>
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

                <p class="status-line" id="demo-status">就绪：所有表格已切换为 shadcn Data Table（@tanstack/react-table）；支持排序、筛选与分页。</p>
            </div>
        </div>
    </div>

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
                window.parent.console.log.apply(window.parent.console, ["[cq-demo]"].concat([].slice.call(arguments)));
            } catch (e) { }
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
            try {
                window.parent.document.getElementById("${ROOT_ID}")?.remove();
            } catch (e) { }
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
                    { key: "code", label: "项点编号", sortable: true },
                    { key: "name", label: "扣分项名称", sortable: true },
                    { key: "standard", label: "扣分标准", sortable: true },
                    { key: "score", label: "扣分分值", sortable: true, numeric: true },
                    { key: "quarter", label: "适用季度", sortable: true },
                    { key: "statusText", label: "状态", sortable: true, badge: true }
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
            refreshOrgViewTable();
            refreshOrgDialogTable();
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
            var hint = TABLE_DEFS[tabId].readonly
                ? "（只读 Data Table：排序 / 筛选 / 分页）"
                : "（Data Table：排序 / 筛选 / 分页）";
            setStatus("当前页面：" + TABLE_DEFS[tabId].label + hint);
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
            TABLE_DEFS.quarterly.rows = [];
            TABLE_DEFS.annual.rows = [];
            TABLE_DEFS.config.rows = [];
            TABLE_DEFS.deduction.rows = [];
            TABLE_DEFS.partyQuarterly.rows = [];
            for (var i = 0; i < 8; i++) TABLE_DEFS.quarterly.rows.push(randQuarterlyRow());
            for (var j = 0; j < 6; j++) TABLE_DEFS.annual.rows.push(randAnnualRow());
            for (var k = 0; k < 5; k++) TABLE_DEFS.config.rows.push(randConfigRow());
            for (var d = 0; d < 7; d++) TABLE_DEFS.deduction.rows.push(randDeductionRow(d));
            for (var p = 0; p < 10; p++) TABLE_DEFS.partyQuarterly.rows.push(randPartyQuarterlyRow());
            ["quarterly", "annual", "config", "deduction", "partyQuarterly"].forEach(refreshDataTable);
        }
        function setStatus(msg) {
            var el = document.getElementById("demo-status");
            if (el) el.textContent = msg;
        }
        // 模拟官方 this.wait：异步等待渲染完成后返回 { getElement() }。
        // 官方脚本的 this 绑定在苍穹页面上下文，控件 DOM 在父页面（window.parent.document）。
        // 只查父页面；跨域时访问 parent 会抛异常，记日志后 getElement() 为 null。
        function waitEl(id, ms) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var el = null;
                    try {
                        el = window.parent.document.getElementById(id);
                    } catch (e) {
                        clog("无法访问父页面 #" + id + ": " + (e && e.message));
                    }
                    resolve({ getElement: function () { return el; } });
                }, ms || 150);
            });
        }

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

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                if (dlg && !dlg.hidden) { closeDialog(); return; } // 弹窗优先关闭
                unmount();
            }
        });
        try {
            syncThemeButton();
            initTableData();
            initTabs();
        } catch (err) {
            clog("初始化失败: " + (err && err.message));
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
