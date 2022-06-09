require("react/jsx-runtime");var t=require("react");require("firebase/auth"),require("firebase/app"),require("firebase/firestore"),require("firebase/storage"),require("react-hook-form"),require("next/router");function e(t){return t&&t.__esModule?t.default:t}function n(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map((function(t){t(n)})),(r=t.get("*"))&&r.slice().map((function(t){t(e,n)}))}}}const r={homePath:"/",loginPath:"/login",logoutPath:"/logout",verifyPath:"/verify",actionPath:"/action",userPath:"/user"},i=(0,t.createContext)({currentUser:null,connected:!1,auth:null,settings:r});n();i.Consumer;process.env.NEXT_PUBLIC_FIREBASE_API,process.env.NEXT_PUBLIC_FIREBASE_AUTH,process.env.NEXT_PUBLIC_FIREBASE_PROJECT,process.env.NEXT_PUBLIC_FIREBASE_STORAGE,process.env.NEXT_PUBLIC_FIREBASE_SENDER,process.env.NEXT_PUBLIC_FIREBASE_APP;const s=(0,t.createContext)(null);s.Consumer;var a,o,u,c,h={};a=h,o=h&&h.define,u={version:"2.13.2",areas:{},apis:{},inherit:function(t,e){for(var n in t)e.hasOwnProperty(n)||Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e},stringify:function(t,e){return void 0===t||"function"==typeof t?t+"":JSON.stringify(t,e||u.replace)},parse:function(t,e){try{return JSON.parse(t,e||u.revive)}catch(e){return t}},fn:function(t,e){for(var n in u.storeAPI[t]=e,u.apis)u.apis[n][t]=e},get:function(t,e){return t.getItem(e)},set:function(t,e,n){t.setItem(e,n)},remove:function(t,e){t.removeItem(e)},key:function(t,e){return t.key(e)},length:function(t){return t.length},clear:function(t){t.clear()},Store:function(t,e,n){var r=u.inherit(u.storeAPI,(function(t,e,n){return 0===arguments.length?r.getAll():"function"==typeof e?r.transact(t,e,n):void 0!==e?r.set(t,e,n):"string"==typeof t||"number"==typeof t?r.get(t):"function"==typeof t?r.each(t):t?r.setAll(t,e):r.clear()}));r._id=t;try{var i="__store2_test";e.setItem(i,"ok"),r._area=e,e.removeItem(i)}catch(t){r._area=u.storage("fake")}return r._ns=n||"",u.areas[t]||(u.areas[t]=r._area),u.apis[r._ns+r._id]||(u.apis[r._ns+r._id]=r),r},storeAPI:{area:function(t,e){var n=this[t];return n&&n.area||(n=u.Store(t,e,this._ns),this[t]||(this[t]=n)),n},namespace:function(t,e){if(!t)return this._ns?this._ns.substring(0,this._ns.length-1):"";var n=t,r=this[n];if(!(r&&r.namespace||(r=u.Store(this._id,this._area,this._ns+n+"."),this[n]||(this[n]=r),e)))for(var i in u.areas)r.area(i,u.areas[i]);return r},isFake:function(t){return t?(this._real=this._area,this._area=u.storage("fake")):!1===t&&(this._area=this._real||this._area),"fake"===this._area.name},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(t){return this._area.has?this._area.has(this._in(t)):!!(this._in(t)in this._area)},size:function(){return this.keys().length},each:function(t,e){for(var n=0,r=u.length(this._area);n<r;n++){var i=this._out(u.key(this._area,n));if(void 0!==i&&!1===t.call(this,i,this.get(i),e))break;r>u.length(this._area)&&(r--,n--)}return e||this},keys:function(t){return this.each((function(t,e,n){n.push(t)}),t||[])},get:function(t,e){var n,r=u.get(this._area,this._in(t));return"function"==typeof e&&(n=e,e=null),null!==r?u.parse(r,n):null!=e?e:r},getAll:function(t){return this.each((function(t,e,n){n[t]=e}),t||{})},transact:function(t,e,n){var r=this.get(t,n),i=e(r);return this.set(t,void 0===i?r:i),this},set:function(t,e,n){var r,i=this.get(t);return null!=i&&!1===n?e:("boolean"!=typeof n&&(r=n),u.set(this._area,this._in(t),u.stringify(e,r))||i)},setAll:function(t,e){var n,r;for(var i in t)r=t[i],this.set(i,r,e)!==r&&(n=!0);return n},add:function(t,e,n){var r=this.get(t);if(r instanceof Array)e=r.concat(e);else if(null!==r){var i=typeof r;if(i===typeof e&&"object"===i){for(var s in e)r[s]=e[s];e=r}else e=r+e}return u.set(this._area,this._in(t),u.stringify(e,n)),e},remove:function(t,e){var n=this.get(t,e);return u.remove(this._area,this._in(t)),n},clear:function(){return this._ns?this.each((function(t){u.remove(this._area,this._in(t))}),1):u.clear(this._area),this},clearAll:function(){var t=this._area;for(var e in u.areas)u.areas.hasOwnProperty(e)&&(this._area=u.areas[e],this.clear());return this._area=t,this},_in:function(t){return"string"!=typeof t&&(t=u.stringify(t)),this._ns?this._ns+t:t},_out:function(t){return this._ns?t&&0===t.indexOf(this._ns)?t.substring(this._ns.length):void 0:t}},storage:function(t){return u.inherit(u.storageAPI,{items:{},name:t})},storageAPI:{length:0,has:function(t){return this.items.hasOwnProperty(t)},key:function(t){var e=0;for(var n in this.items)if(this.has(n)&&t===e++)return n},setItem:function(t,e){this.has(t)||this.length++,this.items[t]=e},removeItem:function(t){this.has(t)&&(delete this.items[t],this.length--)},getItem:function(t){return this.has(t)?this.items[t]:null},clear:function(){for(var t in this.items)this.removeItem(t)}}},(c=u.Store("local",function(){try{return localStorage}catch(t){}}())).local=c,c._=u,c.area("session",function(){try{return sessionStorage}catch(t){}}()),c.area("page",u.storage("page")),"function"==typeof o&&void 0!==o.amd?o("store2",[],(function(){return c})):h?h=c:(a.store&&(u.conflict=a.store),a.store=c);const f=(0,t.createContext)({store:e(h),defaultValues:{}});f.Consumer;n(),n(),n();let _;var g;let l;var v;let p;var m;(g=_||(_={}))[g.Connecting=0]="Connecting",g[g.Inputing=1]="Inputing",g[g.Submitting=2]="Submitting",g[g.Waiting=3]="Waiting",g[g.Redirecting=4]="Redirecting",(v=l||(l={}))[v.Connecting=0]="Connecting",v[v.Redirecting=1]="Redirecting",(m=p||(p={}))[m.Connecting=0]="Connecting",m[m.Inputing=1]="Inputing",m[m.Submitting=2]="Submitting",m[m.Waiting=3]="Waiting",m[m.Redirecting=4]="Redirecting",m[m.LinkError=5]="LinkError";
//# sourceMappingURL=index.js.map
