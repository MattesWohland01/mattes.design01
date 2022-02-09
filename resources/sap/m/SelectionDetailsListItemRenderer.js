/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/ListItemBaseRenderer"],function(R,L){"use strict";var T={"svg":{attributes:["width","height","focusable","preserveAspectRatio"]},"path":{attributes:["d","fill","transform","stroke","stroke-width"]},"line":{attributes:["x1","x2","y1","y2","stroke-width","stroke","stroke-dasharray","stroke-linecap"]}};function e(d,c){var i;if(!d){return true;}for(i=0;i<d.length;i++){if(!c(d[i])){return false;}}return true;}function a(n){if(n.nodeType!==window.Node.ELEMENT_NODE){return true;}var t=n.tagName.toLowerCase(),o=T[t],b;if(!o){return false;}b=e(n.attributes,function(c){if(c.value===""){return true;}var A=c.name.toLowerCase();return o.attributes.indexOf(A)>=0;});if(!b){return false;}if(!o.allowTextContenet&&n.textContent.trim().length>0){return false;}return e(n.childNodes,a);}var S=R.extend(L);S.apiVersion=2;S.renderLIAttributes=function(r,c){r.class("sapMSDItem");};S.renderLIContent=function(r,c){var l=c._getParentElement().getLines();r.openStart("div");r.class("sapMSDItemLines");r.openEnd();for(var i=0;i<l.length;i++){this.renderLine(r,c,l[i]);}r.close("div");L.renderType(r,c);};S._isValidSvg=function(d){try{var p=new DOMParser(),D=p.parseFromString(d,"text/html");var n=D.body.childNodes;if(n.length===0){return false;}return e(n,a);}catch(b){return false;}};S.renderLine=function(r,c,l){var u=l.getUnit().trim(),v=l._getValueToRender(),d=l.getDisplayValue(),s=l.getLineMarker();r.openStart("div");r.class("sapMSDItemLine");r.openEnd();r.openStart("div");r.class("sapMSDItemLineMarkerContainer");r.openEnd();if(s&&S._isValidSvg(s)){r.unsafeHtml(s);}r.close("div");r.openStart("div");r.class("sapMSDItemLineLabel");r.openEnd();r.text(l.getLabel());r.close("div");r.openStart("div");r.class("sapMSDItemLineValue");if(u){r.class("sapMSDItemLineBold");}r.openEnd();if(d){r.text(d);}else{r.text(v);}if(u){r.openStart("span");r.class("sapMSDItemLineUnit");r.openEnd();r.text("\u00a0");r.text(u);r.close("span");}r.close("div");r.close("div");};S.renderType=function(r,c){var t=c._getParentElement().getAggregation("_overflowToolbar");if(t){r.openStart("div");r.class("sapMSDItemActions");r.openEnd();r.renderControl(t);r.close("div");}};return S;},true);
