/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/Core"],function(I,D,C){"use strict";var R={apiVersion:2},s="px";R.render=function(r,c){var t=this;this.initSharedState(c);this.renderControlContainer(r,c,function(){t.renderSelectedItems(r,c);t.renderUnselectedItems(r,c);t.renderHoverItems(r,c);t.renderSelectorDiv(r,c);});};R.renderControlContainer=function(r,c,i){var e=c.getEnabled(),E=c.getEditable(),d=c.getDisplayOnly();r.openStart("div",c);r.style("width",this._iWidth+"px");r.style("height",this._iHeight+"px");if(e&&!d){r.attr("tabindex","0");r.class("sapMPointer");if(!E){r.class("sapMRIReadOnly");}}else{r.attr("tabindex","-1");e?r.class("sapMRIDisplayOnly"):r.class("sapMRIDisabled");}r.class("sapMRI");r.class("sapUiRatingIndicator"+c._getIconSizeLabel(this._fIconSize));this.writeTooltip(r,c);this.writeAccessibility(r,c);r.openEnd();i();r.close("div");};R.initSharedState=function(c){var r=c._roundValueToVisualMode(c.getValue()),i=c._iPxIconSize,f=c._iPxPaddingSize,S=r*i+(Math.round(r)-1)*f;if(S<0){S=0;}this._bUseGradient=D.browser.chrome||D.browser.safari;this._sLabelID=c.getId()+"-ariaLabel";this._iSymbolCount=c.getMaxValue();this._iWidth=this._iSymbolCount*(i+f)-f;this._iHeight=i;this._iSelectedWidth=S;this._fIconSize=i;};R.writeTooltip=function(r,c){var t=c.getTooltip_AsString();if(t){r.attr("title",t);}};R.writeAccessibility=function(r,c){var o=C.getLibraryResourceBundle("sap.m");r.accessibilityState(c,{role:"slider",orientation:"horizontal",valuemin:0,disabled:!c.getEnabled()||c.getDisplayOnly(),roledescription:o.getText("RATING_INDICATOR_ARIA_ROLEDESCRIPTION")});};R.renderSelectedItems=function(r,c){r.openStart("div",c.getId()+"-sel");r.class("sapMRISel");if(this._bUseGradient){r.class("sapMRIGrd");}r.style("width",this._iSelectedWidth+s);r.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("SELECTED",r,c);}r.close("div");};R.renderUnselectedItems=function(r,c){r.openStart("div",c.getId()+"-unsel-wrapper");r.class("sapMRIUnselWrapper");r.style("width",this._iWidth-this._iSelectedWidth+s);r.openEnd();r.openStart("div",c.getId()+"-unsel");r.class("sapMRIUnsel");if(this._bUseGradient&&(c.getEnabled()||!c.getDisplayOnly())){r.class("sapMRIGrd");}r.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("UNSELECTED",r,c);}r.close("div");r.close("div");};R.renderHoverItems=function(r,c){if(c.getEnabled()||!c.getDisplayOnly()){r.openStart("div",c.getId()+"-hov");r.class("sapMRIHov");r.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("HOVERED",r,c);}r.close("div");}};R.renderSelectorDiv=function(r,c){r.openStart("div",c.getId()+"-selector");r.class("sapMRISelector");r.openEnd();r.close("div");};R.renderIcon=function(i,r,c){var a=this.getIconURI(i,c),t=this.getIconTag(a),b=I.isIconURI(a),S=this._fIconSize+s;if(t==="img"){r.voidStart(t);}else{r.openStart(t);}if(i==="UNSELECTED"&&!c.getEditable()){i="READONLY";}r.class("sapUiIcon");r.class(this.getIconClass(i));r.style("width",S);r.style("height",S);r.style("line-height",S);r.style("font-size",S);if(!b){r.attr("src",a);}if(t==="img"){r.voidEnd();}else{r.openEnd();if(b){r.text(I.getIconInfo(a).content);}r.close(t);}};R.getIconClass=function(i){switch(i){case"SELECTED":return"sapMRIIconSel";case"UNSELECTED":return"sapMRIIconUnsel";case"HOVERED":return"sapMRIIconHov";case"READONLY":return"sapMRIIconReadOnly";}};R.getIconURI=function(S,c){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){if(S==="UNSELECTED"&&(c.getEnabled()&&!c.getDisplayOnly())){return I.getIconURI("unfavorite");}return I.getIconURI("favorite");}switch(S){case"SELECTED":return c.getIconSelected()||I.getIconURI("favorite");case"UNSELECTED":if(c.getEditable()&&!c.getDisplayOnly()){return c.getIconUnselected()||I.getIconURI("unfavorite");}else{return c.getIconUnselected()||I.getIconURI("favorite");}case"HOVERED":return c.getIconHovered()||I.getIconURI("favorite");}};R.getIconTag=function(i){if(I.isIconURI(i)){return"span";}return"img";};return R;},true);