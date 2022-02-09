/**
 * @license Hyphenopoly_Loader 3.4.0 - client side hyphenation
 * ©2019  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 * Modifications SAP SE or an SAP affiliate company and OpenUI5 contributors. All rights reserved.
 */
(function u(w,d,H,o){"use strict";var s=sessionStorage;var a=w.WebAssembly;var l=new Map();var b=new Map();function c(){return o.create(null);}function g(e,f){o.keys(e).forEach(f);}(function e(){if(H.cacheFeatureTests&&s.getItem("Hyphenopoly_Loader")){H.cf=JSON.parse(s.getItem("Hyphenopoly_Loader"));}else{H.cf={"langs":c(),"polyfill":false,"wasm":null};}}());(function e(){var m=(d.currentScript)?d.currentScript.src.replace(/Hyphenopoly_Loader.js/i,""):"../";var p=m+"patterns/";if(H.paths){H.paths.maindir=H.paths.maindir||m;H.paths.patterndir=H.paths.patterndir||p;}else{H.paths=o.create({"maindir":m,"patterndir":p});}}());(function e(){if(H.setup){H.setup.selectors=H.setup.selectors||{".hyphenate":{}};H.setup.timeout=H.setup.timeout||1000;H.setup.hide=H.setup.hide||"all";}else{H.setup={"hide":"all","selectors":{".hyphenate":{}},"timeout":1000};}}());(function e(){g(H.require,function f(k){b.set(k.toLowerCase(),H.require[k]);});if(H.fallbacks){g(H.fallbacks,function f(k){l.set(k.toLowerCase(),H.fallbacks[k].toLowerCase());});}}());H.toggle=function n(e){if(e==="on"){var f=d.getElementById("H9Y_Styles");if(f){f.parentNode.removeChild(f);}}else{var v=" {visibility: hidden !important}\n";var k=d.createElement("style");var m="";k.id="H9Y_Styles";switch(H.setup.hide){case"all":m="html"+v;break;case"element":g(H.setup.selectors,function x(p){m+=p+v;});break;case"text":g(H.setup.selectors,function x(p){m+=p+" {color: transparent !important}\n";});break;}k.appendChild(d.createTextNode(m));d.head.appendChild(k);}};(function x(){var f=new Map();var k=[];var m=[];function n(e,y,z){f.set(e,{"cancellable":z,"default":y,"register":[]});}n("timeout",function y(e){H.toggle("on");w.console.info("Hyphenopolys 'FOUHC'-prevention timed out after %dms",e.delay);},false);n("error",function y(e){switch(e.lvl){case"info":w.console.info(e.msg);break;case"warn":w.console.warn(e.msg);break;default:w.console.error(e.msg);}},true);n("contentLoaded",function y(e){k.push({"data":e,"name":"contentLoaded"});},false);n("engineLoaded",function y(e){k.push({"data":e,"name":"engineLoaded"});},false);n("hpbLoaded",function y(e){k.push({"data":e,"name":"hpbLoaded"});},false);n("loadError",function y(e){k.push({"data":e,"name":"loadError"});},false);n("tearDown",null,true);function p(e,y){y=y||c();var z=false;f.get(e).register.forEach(function B(A){y.preventDefault=function C(){if(f.get(e).cancellable){z=true;}};A(y);});if(!z&&f.get(e).default){f.get(e).default(y);}}function v(e,y,z){if(f.has(e)){f.get(e).register.push(y);}else if(z){m.push({"handler":y,"name":e});}else{H.events.dispatch("error",{"lvl":"warn","msg":"unknown Event \""+e+"\" discarded"});}}if(H.handleEvent){g(H.handleEvent,function y(e){v(e,H.handleEvent[e],true);});}H.events=c();H.events.deferred=k;H.events.tempRegister=m;H.events.dispatch=p;H.events.define=n;H.events.addListener=v;}());function r(){if(typeof a==="object"&&typeof a.Instance==="function"){try{var m=new a.Module(Uint8Array.from([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,5,1,1,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]));return(new a.Instance(m).exports.t(4)!==0);}catch(e){return false;}}return false;}function h(p,f){var e=d.createElement("script");e.src=p+f;if(f==="hyphenEngine.asm.js"){e.addEventListener("load",function k(){H.events.dispatch("engineLoaded",{"msg":"asm"});});}d.head.appendChild(e);}var i=new Map();function j(e,k,v,x){function y(p,f,n,m){w.fetch(p+f).then(function C(A){if(A.ok){if(n==="hyphenEngine"){H.bins.set(n,A.arrayBuffer().then(function E(D){return new a.Module(D);}));H.events.dispatch("engineLoaded",{"msg":m});}else{var B=i.get(f);B.forEach(function E(D){H.bins.set(D,(B.length>1)?A.clone().arrayBuffer():A.arrayBuffer());H.events.dispatch("hpbLoaded",{"msg":D});});}}else{H.events.dispatch("loadError",{"file":f,"msg":m,"name":n,"path":p});}});}function z(p,f,n,m){var A=new XMLHttpRequest();A.onload=function B(){if(A.status===200){i.get(f).forEach(function D(C){H.bins.set(C,A.response);H.events.dispatch("hpbLoaded",{"msg":C});});}else{H.events.dispatch("loadError",{"file":f,"msg":m,"name":n,"path":p});}};A.open("GET",p+f);A.responseType="arraybuffer";A.send();}if(!i.has(k)){i.set(k,[x]);if(H.cf.wasm){y(e,k,v,x);}else{z(e,k,v,x);}}else if(v!=="hyphenEngine"){i.get(k).push(x);}}function q(e){var f=new Map([["de",54],["hu",205],["nb-no",91],["nl",41]]);var k=f.get(e)||32;H.specMems=H.specMems||new Map();if(H.cf.wasm){H.specMems.set(e,new a.Memory({"initial":k,"maximum":256}));}else{var m=(2<<Math.floor(Math.log(k)*Math.LOG2E))<<16;H.specMems.set(e,new ArrayBuffer(m));}}(function y(){var f=(function f(){var e=null;var n=["visibility:hidden","-moz-hyphens:auto","-webkit-hyphens:auto","-ms-hyphens:auto","hyphens:auto","width:48px","font-size:12px","line-height:12px","border:none","padding:0","word-wrap:normal"].join(";");function z(C){if(H.cf.langs[C]){return;}e=e||d.createElement("body");var D=d.createElement("div");D.lang=C;D.style.cssText=n;D.appendChild(d.createTextNode(b.get(C).toLowerCase()));e.appendChild(D);}function A(C){if(e){C.appendChild(e);return e;}return null;}function B(){if(e){e.parentNode.removeChild(e);}}return{"append":A,"clear":B,"create":z};}());function k(e){return(e.style.hyphens==="auto"||e.style.webkitHyphens==="auto"||e.style.msHyphens==="auto"||e.style["-moz-hyphens"]==="auto");}function m(n){H.hyphenators=H.hyphenators||c();if(!H.hyphenators[n]){if(w.Promise){H.hyphenators[n]=new Promise(function B(z,A){H.events.addListener("engineReady",function C(e){if(e.msg===n){z(H.createHyphenator(e.msg));}},true);H.events.addListener("loadError",function C(e){if(e.name===n||e.name==="hyphenEngine"){A(new Error("File "+e.file+" can't be loaded from "+e.path));}},false);});H.hyphenators[n].catch(function z(e){H.events.dispatch("error",{"lvl":"error","msg":e.message});});}else{H.hyphenators[n]={"then":function(){H.events.dispatch("error",{"msg":"Promises not supported in this engine. Use a polyfill."});}};}}}function p(e){var n=e+".hpb";var z=e;H.cf.polyfill=true;H.cf.langs[e]="H9Y";if(l&&l.has(e)){z=l.get(e);n=z+".hpb";}H.bins=H.bins||new Map();j(H.paths.patterndir,n,z,e);}if(H.cf.wasm===null){H.cf.wasm=r();}b.forEach(function z(e,n){if(e==="FORCEHYPHENOPOLY"||(H.cf.langs[n]&&H.cf.langs[n]==="H9Y")){p(n);}else{f.create(n);}});var v=f.append(d.documentElement);if(v!==null){var x=v.querySelectorAll("div");Array.prototype.forEach.call(x,function e(n){if(k(n)&&n.offsetHeight>12){H.cf.langs[n.lang]="CSS";}else{p(n.lang);}});f.clear();}if(H.cf.polyfill){h(H.paths.maindir,"Hyphenopoly.js");if(H.cf.wasm){j(H.paths.maindir,"hyphenEngine.wasm","hyphenEngine","wasm");}else{h(H.paths.maindir,"hyphenEngine.asm.js");}g(H.cf.langs,function n(e){if(H.cf.langs[e]==="H9Y"){q(e);m(e);}});}}());function t(){if(H.setup.hide.match(/^(?:element|text)$/)){H.toggle("off");}H.events.dispatch("contentLoaded",{"msg":["contentLoaded"]});}if(H.cf.polyfill){if(H.setup.hide==="all"){H.toggle("off");}if(H.setup.hide!=="none"){H.setup.timeOutHandler=w.setTimeout(function e(){H.toggle("on");H.events.dispatch("timeout",{"delay":H.setup.timeout});},H.setup.timeout);}if(d.readyState==="loading"){d.addEventListener("DOMContentLoaded",t,{"once":true,"passive":true});}else{t();}}else{H.events.dispatch("tearDown",{});w.Hyphenopoly=null;}if(H.cacheFeatureTests){s.setItem("Hyphenopoly_Loader",JSON.stringify(H.cf));}}(window,document,Hyphenopoly,Object));