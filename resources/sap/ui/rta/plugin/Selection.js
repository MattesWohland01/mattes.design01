/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/rta/Utils","sap/ui/dt/OverlayRegistry","sap/ui/events/KeyCodes","sap/ui/dt/Overlay","sap/base/util/restricted/_intersection","sap/m/InstanceManager","sap/ui/Device"],function(P,U,O,K,a,_,I,D){"use strict";var S=P.extend("sap.ui.rta.plugin.Selection",{metadata:{library:"sap.ui.rta",properties:{multiSelectionRequiredPlugins:{type:"string[]"},isActive:{type:"boolean",defaultValue:true}},associations:{},events:{elementEditableChange:{parameters:{editable:{type:"boolean"}}}}}});function p(e){e.preventDefault();e.stopPropagation();}function h(e,m){var s=m.slice();e.forEach(function(E){s=_(s,E.getEditableByPlugins());});return s.length>0;}function b(e){return e.every(function(E){return E.getRelevantContainer()===e[0].getRelevantContainer();});}function c(e){return e.every(function(E){return E.getParentElementOverlay()===e[0].getParentElementOverlay();});}function i(e){return e.every(function(E){return E.getElement().getMetadata().getName()===e[0].getElement().getMetadata().getName();});}S.prototype.init=function(){this._multiSelectionValidator=this._multiSelectionValidator.bind(this);P.prototype.init.apply(this,arguments);};S.prototype._checkDeveloperMode=function(o,d){if(d){var e=this.getCommandFactory().getFlexSettings().developerMode;if(e&&this.hasStableId(o)){o.setEditable(true);o.setSelectable(true);this.fireElementEditableChange({editable:true});return true;}}return false;};S.prototype.registerElementOverlay=function(o){var d=o.getDesignTimeMetadata();if(!d.markedAsNotAdaptable()&&!this._checkDeveloperMode(o,d)){o.attachEditableChange(this._onEditableChange,this);this._adaptSelectable(o);}o.attachBrowserEvent("click",this._selectOverlay,this);o.attachBrowserEvent("contextmenu",this._selectOverlay,this);o.attachBrowserEvent("keydown",this._onKeyDown,this);o.attachBrowserEvent("mousedown",this._onMouseDown,this);o.attachBrowserEvent("mouseover",this._onMouseover,this);o.attachBrowserEvent("mouseleave",this._onMouseleave,this);};S.prototype._onEditableChange=function(e){var o=e.getSource();this._adaptSelectable(o);};S.prototype._adaptSelectable=function(o){var s=o.getEditable();if(o.getSelectable()!==s){o.setSelectable(s);if(!s){this._removePreviousHover();}this.fireElementEditableChange({editable:s});}};S.prototype.deregisterElementOverlay=function(o){o.detachBrowserEvent("click",this._selectOverlay,this);o.detachBrowserEvent("contextmenu",this._selectOverlay,this);o.detachBrowserEvent("keydown",this._onKeyDown,this);o.detachBrowserEvent("mousedown",this._onMouseDown,this);o.detachBrowserEvent("mouseover",this._onMouseover,this);o.detachBrowserEvent("mouseleave",this._onMouseleave,this);o.detachEditableChange(this._onEditableChange,this);};S.prototype._setFocusOnOverlay=function(o,e){if(o&&o.getSelectable()){o.focus();e.stopPropagation();}};S.prototype._onKeyDown=function(e){if(!this.getIsActive()){return;}var o=U.getFocusedOverlay();if(e.keyCode===K.ENTER){this._selectOverlay(e);}else if(e.keyCode===K.ARROW_UP&&e.shiftKey===false&&e.altKey===false){if(o){var d=U.getFocusableParentOverlay(o);this._setFocusOnOverlay(d,e);e.preventDefault();}}else if(e.keyCode===K.ARROW_DOWN&&e.shiftKey===false&&e.altKey===false){if(o){var f=U.getFirstFocusableDescendantOverlay(o);this._setFocusOnOverlay(f,e);e.preventDefault();}}else if(e.keyCode===K.ARROW_LEFT&&e.shiftKey===false&&e.altKey===false){if(o){var g=U.getPreviousFocusableSiblingOverlay(o);this._setFocusOnOverlay(g,e);e.preventDefault();}}else if(e.keyCode===K.ARROW_RIGHT&&e.shiftKey===false&&e.altKey===false){if(o){var n=U.getNextFocusableSiblingOverlay(o);this._setFocusOnOverlay(n,e);e.preventDefault();}}else if(e.keyCode===K.ESCAPE){if(o){this._deselectOverlays();}}};S.prototype._deselectOverlays=function(){this.getDesignTime().getSelectionManager().reset();};S.prototype._selectOverlay=function(e){if(!this.getIsActive()){p(e);return;}var o=O.getOverlay(e.currentTarget.id);var m=e.metaKey||e.ctrlKey;var C=e.type==="contextmenu";if(o&&o.getSelectable()){if(o.isSelected()){if(!C){this.getDesignTime().getSelectionManager().remove(o);}}else if(m){this.getDesignTime().getSelectionManager().add(o);}else{this.getDesignTime().getSelectionManager().set(o);}p(e);}else if(o&&o.isRoot()){p(e);}};S.prototype._onMouseDown=function(e){if(!this.getIsActive()){p(e);I.getOpenPopovers().forEach(function(d){if(d._bOpenedByChangeIndicator){d.close();}});return;}if(D.browser.name==="ie"){var t=O.getOverlay(e.target.id);var T=jQuery(e.target).hasClass("sapUiDtOverlayScrollContainer");var o=O.getOverlay(e.currentTarget.id);if(o&&(T||t instanceof a)){if(o.getSelectable()){o.focus();e.stopPropagation();}else{o.getDomRef().blur();}}}};S.prototype._onMouseover=function(e){if(!this.getIsActive()){p(e);return;}var o=O.getOverlay(e.currentTarget.id);if(o.isSelectable()){if(o!==this._oHoverTarget){this._removePreviousHover();this._oHoverTarget=o;o.addStyleClass("sapUiRtaOverlayHover");}p(e);}};S.prototype._onMouseleave=function(e){if(!this.getIsActive()){p(e);return;}var o=O.getOverlay(e.currentTarget.id);if(o.isSelectable()){this._removePreviousHover();p(e);}};S.prototype._removePreviousHover=function(){if(this._oHoverTarget){this._oHoverTarget.removeStyleClass("sapUiRtaOverlayHover");}delete this._oHoverTarget;};S.prototype.setDesignTime=function(){if(this.getDesignTime()){this.getDesignTime().getSelectionManager().removeValidator(this._multiSelectionValidator);}P.prototype.setDesignTime.apply(this,arguments);if(this.getDesignTime()){this.getDesignTime().getSelectionManager().addValidator(this._multiSelectionValidator);}};S.prototype._multiSelectionValidator=function(e){return(e.length===1||(h(e,this.getMultiSelectionRequiredPlugins())&&b(e)&&(c(e)||i(e))));};return S;});