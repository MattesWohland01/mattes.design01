/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/ui/thirdparty/jquery"],function(a,L,q){"use strict";var I={};var r={},e=[];var p="_POPOVER_",d="_DIALOG_",l="_LIGHTBOX_";I.addInstance=function(c,i){a(c,"In sap.m.InstanceManager.addInstance method, the parameter sCategoryId can't be null or empty string");a(i instanceof Object,"In sap.m.InstanceManager.addInstance method, the parameter oInstance should be an object");if(!r[c]){r[c]=[];}if(r[c].indexOf(i)===-1){r[c].push(i);}return this;};I.removeInstance=function(c,o){var C=r[c],i;a(c,"In sap.m.InstanceManager.removeInstance method, the parameter sCategoryId can't be null or empty string");a(o instanceof Object,"In sap.m.InstanceManager.removeInstance method, the parameter oInstance should be an object");if(!C){return null;}i=C.indexOf(o);return(i===-1)?null:C.splice(i,1);};I.getInstancesByCategoryId=function(c){a(c,"In sap.m.InstanceManager.getInstancesByCategoryId method, the parameter sCategoryId can't be null or empty string");return r[c]||e;};I.isInstanceManaged=function(c,i){a(c,"In sap.m.InstanceManager.isInstanceManaged method, the parameter sCategoryId can't be null or empty string");a(i instanceof Object,"In sap.m.InstanceManager.isInstanceManaged method, the parameter oInstance should be an object");var C=r[c];if(!C||!i){return false;}return C.indexOf(i)!==-1;};I.isCategoryEmpty=function(c){a(c,"In sap.m.InstanceManager.isCategoryEmpty method, the parameter sCategoryId can't be null or empty string");var C=r[c];return!C||C.length===0;};I.addPopoverInstance=function(P){if(typeof P.close==="function"){I.addInstance(p,P);}else{L.warning("In method addPopoverInstance: the parameter doesn't have a close method and can't be managed.");}return this;};I.addDialogInstance=function(D){if(typeof D.close==="function"){I.addInstance(d,D);}else{L.warning("In method addDialogInstance: the parameter doesn't have a close method and can't be managed.");}return this;};I.addLightBoxInstance=function(o){if(typeof o.close==="function"){I.addInstance(l,o);}else{L.warning("In method addLightBoxInstance: the parameter doesn't have a close method and can't be managed.");}return this;};I.removePopoverInstance=function(P){return I.removeInstance(p,P);};I.removeDialogInstance=function(D){return I.removeInstance(d,D);};I.removeLightBoxInstance=function(o){return I.removeInstance(l,o);};I.hasOpenPopover=function(){return!I.isCategoryEmpty(p);};I.hasOpenDialog=function(){return!I.isCategoryEmpty(d);};I.hasOpenLightBox=function(){return!I.isCategoryEmpty(l);};I.isDialogOpen=function(D){return I.isInstanceManaged(d,D);};I.isPopoverOpen=function(P){return I.isInstanceManaged(p,P);};I.isLightBoxOpen=function(o){return I.isInstanceManaged(l,o);};I.getOpenPopovers=function(){return I.getInstancesByCategoryId(p);};I.getOpenDialogs=function(){return I.getInstancesByCategoryId(d);};I.getOpenLightBoxes=function(){return I.getInstancesByCategoryId(l);};I.closeAllPopovers=function(){var b=I.getOpenPopovers(),i;for(i=0;i<b.length;i++){b[i].close();}return this;};I.closeAllDialogs=function(c){var D,b=[],f=I.getOpenDialogs(),g,i;for(i=0;i<f.length;i++){g=f[i];if(!g.getCloseOnNavigation()){continue;}if(c){D=new q.Deferred().done();b.push(D);g.attachEvent("afterClose",(function(h){return function(){h.resolve();};}(D)));}g.close();}if(c){q.when.apply(this,b).then(c);}return this;};I.closeAllLightBoxes=function(){var i=I.getOpenLightBoxes(),b=i.length,c;for(c=0;c<b;c+=1){i[c].close();}return this;};return I;},true);
