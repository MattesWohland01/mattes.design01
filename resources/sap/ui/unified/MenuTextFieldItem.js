/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/ValueStateSupport','./MenuItemBase','./library','sap/ui/core/IconPool','sap/ui/core/library','sap/ui/Device','sap/base/Log','sap/ui/events/PseudoEvents','sap/ui/dom/jquery/cursorPos'],function(V,M,l,I,c,D,L,P){"use strict";var a=c.ValueState;var b=M.extend("sap.ui.unified.MenuTextFieldItem",{metadata:{library:"sap.ui.unified",properties:{label:{type:"string",group:"Appearance",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},value:{type:"string",group:"Misc",defaultValue:null},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:a.None}}}});(function(){b.prototype.render=function(r,i,m,o){var d=r,e=m.checkEnabled(i),f=i.getId();d.openStart("li",i);d.class("sapUiMnuItm").class("sapUiMnuTfItm");if(o.iItemNo==1){d.class("sapUiMnuItmFirst");}else if(o.iItemNo==o.iTotalItems){d.class("sapUiMnuItmLast");}if(!m.checkEnabled(i)){d.class("sapUiMnuItmDsbl");}if(i.getStartsSection()){d.class("sapUiMnuItmSepBefore");}if(!e){d.attr("disabled","disabled");}if(o.bAccessible){d.attr("role","menuitem");d.attr("aria-posinset",o.iItemNo);d.attr("aria-setsize",o.iTotalItems);}d.openEnd();d.openStart("div").class("sapUiMnuItmL").openEnd().close("div");d.openStart("div").class("sapUiMnuItmIco").openEnd();if(i.getIcon()){d.icon(i.getIcon(),null,{title:null});}d.close("div");d.openStart("div",f+"-txt").class("sapUiMnuItmTxt").openEnd();d.openStart("label",f+"-lbl").class("sapUiMnuTfItemLbl").openEnd();d.text(i.getLabel());d.close("label");d.openStart("div",f+"-str").class("sapUiMnuTfItmStretch").openEnd().close("div");d.openStart("div").class("sapUiMnuTfItemWrppr").openEnd();d.voidStart("input",f+"-tf").attr("tabindex","-1");d.attr("value",i.getValue());d.class("sapUiMnuTfItemTf").class(e?"sapUiMnuTfItemTfEnbl":"sapUiMnuTfItemTfDsbl");if(!e){d.attr("disabled","disabled");}if(o.bAccessible){d.accessibilityState(i,{role:"textbox",disabled:null,multiline:false,autocomplete:"none",labelledby:{value:f+"-lbl",append:true}});}d.voidEnd().close("div").close("div");d.openStart("div").class("sapUiMnuItmR").openEnd().close("div");d.close("li");};b.prototype.hover=function(h,m){this.$().toggleClass("sapUiMnuItmHov",h);if(h&&m.checkEnabled(this)){m.closeSubmenu(false,true);}};b.prototype.focus=function(m){if(this.getEnabled()&&this.getVisible()){this.$("tf").get(0).focus();}else{m.focus();}};b.prototype.onAfterRendering=function(){this._adaptSizes();this.setValueState(this.getValueState());};b.prototype.onsapup=function(e){this.getParent().onsapprevious(e);};b.prototype.onsapdown=function(e){this.getParent().onsapnext(e);};b.prototype.onsaphome=function(e){if(this._checkCursorPosForNav(false)){this.getParent().onsaphome(e);}};b.prototype.onsapend=function(e){if(this._checkCursorPosForNav(true)){this.getParent().onsapend(e);}};b.prototype.onsappageup=function(e){this.getParent().onsappageup(e);};b.prototype.onsappagedown=function(e){this.getParent().onsappagedown(e);};b.prototype.onsapescape=function(e){this.getParent().onsapescape(e);};b.prototype.onkeydown=function(e){e.stopPropagation();};b.prototype.onclick=function(e){this.getParent().closeSubmenu(false,true);if(!D.system.desktop&&this.getParent().checkEnabled(this)){this.focus();}e.stopPropagation();};b.prototype.onkeyup=function(e){if(!P.events.sapenter.fnCheck(e)&&e.key!=="Enter"){return;}var v=this.$("tf").val();this.setValue(v);this.getParent().selectItem(this);e.preventDefault();e.stopPropagation();};b.prototype.setSubmenu=function(m){L.warning("The aggregation 'submenu' is not supported for this type of menu item.","","sap.ui.unified.MenuTextFieldItem");return this;};b.prototype.setLabel=function(s){this.setProperty("label",s,true);this.$("lbl").text(s);this._adaptSizes();return this;};b.prototype.setValue=function(v){this.setProperty("value",v,true);this.$("tf").val(v);return this;};b.prototype.setValueState=function(v){this.setProperty("valueState",v,true);var $=this.$("tf");$.toggleClass("sapUiMnuTfItemTfErr",v==a.Error);$.toggleClass("sapUiMnuTfItemTfWarn",v==a.Warning);var t=V.enrichTooltip(this,this.getTooltip_AsString());this.$().attr("title",t?t:"");return this;};b.prototype.getFocusDomRef=function(){var f=this.$("tf");return f.length?f.get(0):null;};b.prototype._adaptSizes=function(){var $=this.$("tf");var d=this.$("lbl");var o=d.length?d.get(0).offsetLeft:0;if(sap.ui.getCore().getConfiguration().getRTL()){$.parent().css({"width":"auto","right":(this.$().outerWidth(true)-o+(d.outerWidth(true)-d.outerWidth()))+"px"});}else{$.parent().css({"width":"auto","left":(o+d.outerWidth(true))+"px"});}};b.prototype._checkCursorPosForNav=function(f){var r=sap.ui.getCore().getConfiguration().getRTL();var B=f?r:!r;var $=this.$("tf");var p=$.cursorPos();var i=$.val().length;if(r){p=i-p;}if((!B&&p!=i)||(B&&p!=0)){return false;}return true;};}());return b;});