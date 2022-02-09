/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/deepExtend","sap/base/util/JSTokenizer","sap/base/util/ObjectPath","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/core/Component","sap/ui/core/XMLTemplateProcessor","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/Context","sap/ui/performance/Measurement"],function(L,d,J,O,B,M,S,C,X,a,b,c,f){"use strict";var N="http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1",x="sap.ui.core.util.XMLPreprocessor",p=[x],P=x+"/getResolvedBinding",s=x+"/insertFragment",g=x+".process",o=S.resolve(),h=S.resolve(true),t=Object.prototype.toString,v={},W=M.extend("sap.ui.core.util._with",{metadata:{library:"sap.ui.core",properties:{any:"any"},aggregations:{child:{multiple:false,type:"sap.ui.core.util._with"}}},updateProperty:function(){this.setAny(this.mBindingInfos.any.binding.getExternalValue());}}),R=W.extend("sap.ui.core.util._repeat",{metadata:{library:"sap.ui.core",aggregations:{list:{multiple:true,type:"n/a",_doesNotRequireFactory:true}}},updateList:function(){}});function j(w,e,i,n){function r(y){if(!n){n=w.getBinding("any");if(n instanceof b){n=n.getBindings();if(i!==undefined){n=n[i];}}}return Array.isArray(n)?n[y]:n;}function u(y){return y instanceof c?y.getPath():y.getModel().resolve(y.getPath(),y.getContext());}return{getInterface:function(y,z){var A,D,E;if(typeof y==="string"){z=y;y=undefined;}r();if(Array.isArray(n)){if(y>=0&&y<n.length){D=n[y];}else{throw new Error("Invalid index of part: "+y);}}else if(y!==undefined){throw new Error("Not the root formatter of a composite binding");}else if(z){D=n;}else{throw new Error("Missing path");}if(z){E=D.getModel();if(z.charAt(0)!=='/'){A=D instanceof c?D:E.createBindingContext(D.getPath(),D.getContext());}D=E.createBindingContext(z,A);if(!D){throw new Error("Model could not create binding context synchronously: "+E);}}return j(null,e,undefined,D);},getModel:function(y){var z=r(y);return z&&z.getModel();},getPath:function(y){var z=r(y);return z&&u(z);},getSetting:function(y){if(y==="bindingContexts"||y==="models"){throw new Error("Illegal argument: "+y);}return e[y];}};}function k(w,n,r,u,A){var V=false;function y(I,i){var F=I.formatter,z,D=I.model;if(I.path&&I.path.indexOf(">")>0){D=I.path.slice(0,I.path.indexOf(">"));}z=w.getModel(D);if(F&&F.requiresIContext===true){F=I.formatter=F.bind(null,j(w,r,i));}if(F&&A&&(z&&z.$$valueAsPromise||i===undefined&&V)){I.formatter=function(){var E=this;return S.all(arguments).then(function(G){return F.apply(E,G);});};I.formatter.textFragments=F.textFragments;}I.mode=a.OneTime;I.parameters=I.parameters||{};I.parameters.scope=u;if(A&&z&&z.$$valueAsPromise){V=I.parameters.$$valueAsPromise=true;}}try{if(n.parts){n.parts.forEach(y);}y(n);w.bindProperty("any",n);return w.getBinding("any")?S.resolve(w.getAny()):null;}catch(e){return S.reject(e);}finally{w.unbindProperty("any",true);}}function l(e,n){var i=-1;function r(F){if(F){return e[i];}i+=1;if(i<e.length){return n(e[i],i,e).then(r);}}return e.length?r():o;}function m(e){var A,r=e.attributes,T="<"+e.nodeName,i,n;for(i=0,n=r.length;i<n;i+=1){A=r.item(i);T+=" "+A.name+'="'+A.value+'"';}return T+(e.childNodes.length?">":"/>");}function q(e,i){return i.visitNode(e);}return{plugIn:function(V,n,e){var i=v[n];if(V!==null&&typeof V!=="function"||V===q){throw new Error("Invalid visitor: "+V);}if(!n||n===N||n==="sap.ui.core"||n.indexOf(" ")>=0){throw new Error("Invalid namespace: "+n);}L.debug("Plug-in visitor for namespace '"+n+"', local name '"+e+"'",V,x);if(e){n=n+" "+e;i=v[n]||i;}v[n]=V;return i||q;},visitNodeWrapper:q,process:function(r,V,u){var w=V.caller,D=L.isLoggable(L.Level.DEBUG,x),y=D,z=V.name,F={},A,E=0,G={},H=V._supportInfo,I=L.isLoggable(L.Level.WARNING,x);function K(i){return{find:function(n,q1){try{return S.resolve(l(n,q1));}catch(e){return S.reject(e);}},getContext:function(e){var n,q1,r1;e=e||"";if(e[0]==="{"){throw new Error("Must be a simple path, not a binding: "+e);}n=B.simpleParser("{"+e+"}");q1=i.getModel(n.model);if(!q1){throw new Error("Unknown model '"+n.model+"': "+e);}r1=q1.resolve(n.path,i.getBindingContext(n.model));if(!r1){throw new Error("Cannot resolve path: "+e);}return q1.createBindingContext(r1);},getResult:function(e,n){return _(e,n,i,true);},getSettings:function(){return u;},getViewInfo:function(){return d({},V);},insertFragment:function(e,n){return a1(e,n,i);},visitAttribute:function(e,n){return l1(e,n,i);},visitAttributes:function(e){return m1(e,i);},visitChildNodes:function(n){return n1(n,i);},visitNode:function(n){try{return o1(n,i);}catch(e){return S.reject(e);}},"with":function(e,n){var q1,r1=false,A,s1=new W();if(!n){i.setChild(s1);}for(A in e){q1=e[A];r1=true;s1.setModel(q1.getModel(),A);s1.bindObject({model:A,path:q1.getPath()});}return r1||n?K(s1):this;}};}function Q(e){if(D){L.debug(Z()+Array.prototype.slice.call(arguments,1).join(" "),e&&m(e),x);}}function T(e){if(D){L.debug(Z()+"Finished","</"+e.nodeName+">",x);}}function U(e,i){e=e+m(i);L.error(e,w,x);throw new Error(w+": "+e);}function Y(e){var q1,r1=Array.prototype.filter.call(e.childNodes,t1),i,n,s1=false;function t1(v1){return v1.nodeType===1;}function u1(v1,w1){return v1.namespaceURI===N&&v1.localName===w1;}if(!r1.length||!u1(r1[0],"then")){return null;}for(i=1,n=r1.length;i<n;i+=1){q1=r1[i];if(s1){U("Expected </"+e.prefix+":if>, but instead saw ",q1);}if(u1(q1,"else")){s1=true;}else if(!u1(q1,"elseif")){U("Expected <"+e.prefix+":elseif> or <"+e.prefix+":else>, but instead saw ",r1[i]);}}return r1;}function Z(){return(E<10?"[ ":"[")+E+"] ";}function $(A){return A&&A.charAt(0)==="."?O.get(A.slice(1),G):O.get(A||"",G)||O.get(A||"");}function _(i,n,q1,r1,s1){var t1,u1;f.average(P,"",p);try{t1=B.complexParser(i,G,r1,true,true,true)||i;}catch(e){return S.reject(e);}if(t1.functionsNotFound){if(r1){p1(n,'Function name(s)',t1.functionsNotFound.join(", "),'not found');}f.end(P);return null;}if(typeof t1==="object"){u1=k(q1,t1,u,G,!V.sync);if(r1&&!u1){p1(n,'Binding not ready');}else if(V.sync&&u1&&u1.isPending()){U("Async formatter in sync view in "+i+" of ",n);}}else{u1=S.resolve(t1);if(s1){s1();}}f.end(P);return u1;}function a1(e,i,n){var q1,r1=V.sync?X.loadTemplate:X.loadTemplatePromise,s1=z;n.$mFragmentContexts=n.$mFragmentContexts||{};if(n.$mFragmentContexts[e]){U("Cyclic reference to fragment '"+e+"' ",i);}E++;Q(i,"fragmentName =",e);n.$mFragmentContexts[e]=true;z=e;f.average(s,"",p);q1=F[e];if(!q1){F[e]=q1=S.resolve(r1(e,"fragment"));}return q1.then(function(t1){t1=i.ownerDocument.importNode(t1,true);f.end(s);return d1(t1).then(function(){if(t1.namespaceURI==="sap.ui.core"&&t1.localName==="FragmentDefinition"){return b1(t1,n,i);}i.parentNode.insertBefore(t1,i);return o1(t1,n);});}).then(function(){i.parentNode.removeChild(i);z=s1;n.$mFragmentContexts[e]=false;T(i);E-=1;});}function b1(e,i,n){return n1(e,i).then(function(){var q1;n=n||e;while((q1=e.firstChild)){n.parentNode.insertBefore(q1,n);}});}function c1(e,i){var n=p1.bind(null,e,'Constant test condition'),q1=_(e.getAttribute("test"),e,i,true,n)||S.resolve(false);return q1.catch(function(ex){p1(e,'Error in formatter:',ex);}).then(function(r1){var s1=!!r1&&r1!=="false";if(D){if(typeof r1==="string"){r1=JSON.stringify(r1);}else if(r1===undefined){r1="undefined";}else if(Array.isArray(r1)){r1="[object Array]";}Q(e,"test ==",r1,"-->",s1);}return s1;});}function d1(e){var n={},q1=e.getAttributeNodeNS(N,"require"),r1,s1;function t1(){return new S(function(i,u1){var v1=s1.map(sap.ui.require);if(v1.every(Boolean)){i(v1);}else{sap.ui.require(s1,function(){i(arguments);},u1);}}).then(function(u1){Object.keys(n).forEach(function(v1,i){G[v1]=u1[i];});});}if(q1&&q1.value){r1=q1.value;e.removeAttributeNode(q1);if(r1[0]==="{"){n=J.parseJS(r1);s1=Object.keys(n).map(function(i){return n[i];});return t1();}s1=r1.split(" ").map(function(i){return i.replace(/\./g,"/");});if(!V.sync){return t1();}s1.forEach(sap.ui.requireSync);}return o;}function e1(e,i,n){var q1=_(i.value,e,n,false);if(!q1){Q(e,'Binding not ready for attribute',i.name);return o;}return q1.then(function(r1){if(r1===undefined){Q(e,"Removed attribute",i.name);e.removeAttributeNode(i);}else if(r1!==i.value){switch(typeof r1){case"boolean":case"number":case"string":Q(e,i.name,"=",r1);i.value=r1;break;default:Q(e,"Ignoring",t.call(r1),"value for attribute",i.name);}}},function(r1){Q(e,"Error in formatter of attribute",i.name,r1);});}function f1(e,i){var A=e.getAttribute("name"),n,q1,r1=e.getAttribute("value");if(A&&A[0]==="."){A=A.slice(1);}if(!A||A.includes(".")){U("Missing proper relative name in ",e);}n=$(r1);if(!n){U("Invalid value in ",e);}q1=G[A];G[A]=n;return b1(e,i).then(function(){e.parentNode.removeChild(e);G[A]=q1;});}function g1(e,i){var n=e.getAttribute("name"),q1=_(n,e,i,true);if(!q1){return h;}return q1.then(function(A){var r1;if(A!==n){Q(e,"name =",A);}r1=C.getCustomizing(V.componentId,{extensionName:A,name:z,type:"sap.ui.viewExtensions"});if(r1&&r1.className==="sap.ui.core.Fragment"&&r1.type==="XML"){return a1(r1.fragmentName,e,i);}return true;},function(ex){p1(e,'Error in formatter:',ex);return true;});}function h1(e,i){var n=e.getAttribute("fragmentName"),q1=_(n,e,i,true);if(!q1){return o;}return q1.then(function(n){var r1=G;G=Object.create(G);return a1(n,e,i).then(function(){G=r1;});},function(ex){p1(e,'Error in formatter:',ex);});}function i1(i,e){E++;return l(Y(i)||[i],function(n){if(n.localName==="else"){return h;}if(n.localName==="then"){n=i;}return c1(n,e);}).then(function(n){return(n?b1(n,e,i):o).then(function(){i.parentNode.removeChild(i);T(i);E-=1;});});}function j1(e,n){var q1=e.getAttribute("list")||"",r1=B.complexParser(q1,G,false,true,true,true),s1,t1,u1,v1,w1,x1=e.getAttribute("var");if(x1===""){U("Missing variable name for ",e);}if(!r1){U("Missing binding for ",e);}if(r1.functionsNotFound){p1(e,'Function name(s)',r1.functionsNotFound.join(", "),'not found');}v1=new R();n.setChild(v1);r1.mode=a.OneTime;v1.bindAggregation("list",r1);t1=v1.getBinding("list");v1.unbindAggregation("list",true);u1=r1.model;if(!t1){U("Missing model '"+u1+"' in ",e);}t1.enableExtendedChangeDetection();s1=t1.getContexts(r1.startIndex,r1.length||Infinity);if(!V.sync&&s1.dataRequested){w1=new S(function(i){t1.attachEventOnce("change",i);}).then(function(){return t1.getContexts(r1.startIndex,r1.length);});}else{w1=S.resolve(s1);}x1=x1||u1;v1.setModel(t1.getModel(),x1);E++;Q(e,"Starting");return w1.then(function(s1){return l(s1,function(y1,i){var z1=(i===s1.length-1)?e:e.cloneNode(true);v1.setBindingContext(y1,x1);Q(e,x1,"=",y1.getPath());return b1(z1,v1,e);}).then(function(){T(e);E-=1;e.parentNode.removeChild(e);});});}function k1(e,i){var n,q1,r1,s1,t1=e.getAttribute("helper"),u1,v1=e.getAttribute("path"),w1,x1,y1=e.getAttribute("var");if(y1===""){U("Missing variable name for ",e);}r1=new W();i.setChild(r1);n=B.simpleParser("{"+v1+"}");y1=y1||n.model;if(t1||y1){q1=i.getModel(n.model);if(!q1){U("Missing model '"+n.model+"' in ",e);}x1=q1.resolve(n.path,i.getBindingContext(n.model));if(!x1){U("Cannot resolve path for ",e);}u1=q1.createBindingContext(x1);if(t1){s1=$(t1);if(typeof s1!=="function"){U("Cannot resolve helper for ",e);}u1=s1(u1);}w1=S.resolve(u1);if(V.sync&&w1.isPending()){U("Async helper in sync view in ",e);}w1=w1.then(function(u1){if(u1 instanceof c){q1=u1.getModel();x1=u1.getPath();}else if(u1!==undefined){if(typeof u1!=="string"||u1===""){U("Illegal helper result '"+u1+"' in ",e);}x1=u1;}r1.setModel(q1,y1);r1.bindObject({model:y1,path:x1});});}else{x1=v1;r1.bindObject(x1);w1=o;}return w1.then(function(){E++;Q(e,y1,"=",x1);if(r1.getBindingContext(y1)===i.getBindingContext(y1)){p1(e,'Set unchanged path:',x1);r1=i;}return b1(e,r1).then(function(){e.parentNode.removeChild(e);T(e);E-=1;});});}function l1(e,i,n){if(H){H({context:undefined,env:{caller:"visitAttribute",before:{name:i.name,value:i.value}}});}return e1(e,i,n).then(function(){if(H){H({context:undefined,env:{caller:"visitAttribute",after:{name:i.name,value:i.value}}});}});}function m1(e,i){function n(q1,r1){return q1.name.localeCompare(r1.name);}return l(Array.prototype.slice.apply(e.attributes).sort(n),function(q1){return l1(e,q1,i);});}function n1(n,e){return l(Array.prototype.slice.apply(n.childNodes),function(i){return o1(i,e);});}function o1(n,e){var i;function q1(){return m1(n,e).then(function(){return n1(n,e);}).then(function(){if(H){H({context:n,env:{caller:"visitNode",after:{name:n.tagName}}});}});}if(n.nodeType!==1){return o;}if(H){H({context:n,env:{caller:"visitNode",before:{name:n.tagName}}});}if(n.namespaceURI===N){switch(n.localName){case"alias":return f1(n,e);case"if":return i1(n,e);case"repeat":return j1(n,e);case"with":return k1(n,e);default:U("Unexpected tag ",n);}}else if(n.namespaceURI==="sap.ui.core"){switch(n.localName){case"ExtensionPoint":return g1(n,e).then(function(r1){if(r1){return q1();}});case"Fragment":if(n.getAttribute("type")==="XML"){return h1(n,e);}break;}}else{i=v[n.namespaceURI+" "+n.localName]||v[n.namespaceURI];if(i){E++;Q(n,"Calling visitor");return i(n,K(e)).then(function(r1){if(r1!==undefined){U("Unexpected return value from visitor for ",n);}T(n);E-=1;});}}return q1();}function p1(e){if(I){if(!y){y=true;L.warning("Warning(s) during processing of "+w,null,x);}L.warning(Z()+Array.prototype.slice.call(arguments,1).join(" "),e&&m(e),x);}}f.average(g,"",p);u=u||{};if(D){Q(undefined,"Start processing",w);if(u.bindingContexts instanceof c){Q(undefined,"undefined =",u.bindingContexts);}else{for(A in u.bindingContexts){Q(undefined,A,"=",u.bindingContexts[A]);}}}if(H){H({context:r,env:{caller:"view",viewinfo:d({},V),settings:d({},u),clone:r.cloneNode(true),type:"template"}});}return d1(r).then(function(){return o1(r,new W({models:u.models,bindingContexts:u.bindingContexts}));}).then(function(){Q(undefined,"Finished processing",w);f.end(g);return r;}).unwrap();}};},true);