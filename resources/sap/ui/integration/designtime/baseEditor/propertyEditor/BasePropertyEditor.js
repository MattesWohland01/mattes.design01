/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./../util/isTemplate","sap/ui/model/json/JSONModel","sap/m/Label","sap/ui/core/Fragment","sap/base/util/restricted/_omit","sap/ui/base/ManagedObjectObserver","sap/ui/integration/designtime/baseEditor/propertyEditor/PropertyEditorFactory","sap/ui/integration/designtime/baseEditor/util/createPromise","sap/base/util/restricted/_CancelablePromise","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/isPlainObject","sap/base/util/values","sap/base/util/each","sap/ui/integration/designtime/baseEditor/validator/ValidatorRegistry","sap/ui/integration/designtime/baseEditor/util/BaseDefaultValidatorModules","sap/ui/integration/designtime/baseEditor/util/cleanupDesigntimeMetadata"],function(C,i,J,L,F,_,M,P,c,a,d,b,e,v,f,V,B,g){"use strict";var h=C.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor",{metadata:{library:"sap.ui.integration",interfaces:["sap.ui.core.IFormContent"],properties:{"renderLabel":{type:"boolean",defaultValue:true},"value":{type:"any"},"config":{type:"object"}},aggregations:{"_label":{type:"sap.m.Label",visibility:"hidden",multiple:false},"content":{type:"sap.ui.core.Control",multiple:false}},events:{beforeValueChange:{parameters:{path:{type:"string"},value:{type:"any"},nextValue:{type:"any"}}},valueChange:{parameters:{path:{type:"string"},value:{type:"any"},previousValue:{type:"any"}}},designtimeMetadataChange:{parameters:{path:{type:"string"},value:{type:"any"},previousValue:{type:"any"}}},configChange:{parameters:{previousConfig:{type:"object"},config:{type:"object"}}},fragmentChange:{parameters:{previousFragment:{type:"string"},fragment:{type:"string"}}},ready:{},init:{},validationErrorChange:{parameters:{hasError:{type:"boolean"}}}}},xmlFragment:null,_currentXmlFragment:null,_bFragmentReady:false,constructor:function(){this._iExpectedWrapperCount=0;this._currentXmlFragment=this.xmlFragment;C.prototype.constructor.apply(this,arguments);this._oDefaultModel=new J({value:this.getValue(),config:this.getConfig(),displayValue:this._formatValue(this.getValue())});this._oDefaultModel.setDefaultBindingMode("OneWay");this.setBindingContext(this._oDefaultModel.getContext("/"));this.setModel(this._oDefaultModel);this.bindProperty("visible","config/visible");this._setReady(false);this._aEditorWrappers=[];this._bInitFinished=false;this.attachBeforeValueChange(function(E){this._iExpectedWrapperCount=this.getExpectedWrapperCount(E.getParameter("nextValue"));},this);this.attachValueChange(function(E){var m=E.getParameter("value");this._oDefaultModel.setData(Object.assign({},this._oDefaultModel.getData(),{value:m,displayValue:this._formatValue(m)}));this._checkReadyState();},this);this.attachConfigChange(function(E){var p=E.getParameter("previousConfig");var m=E.getParameter("config");if(p&&m&&!b(p.validators,m.validators)){this._validate(this.getValue());}this._oDefaultModel.setData(Object.assign({},this._oDefaultModel.getData(),{config:m}));},this);this.asyncInit().then(function(){this._bInitFinished=true;this.fireInit();this._checkReadyState();}.bind(this));if(this.getFragment()){this._initFragment(this.getFragment());}},renderer:function(r,p){r.openStart("div",p);r.addStyle("display","inline-block");r.addStyle("width","100%");r.openEnd();if(p.getRenderLabel()&&p.getLabel()){r.openStart("div");r.openEnd();r.renderControl(p.getLabel());r.close("div");}r.renderControl(p.getContent());r.close("div");}});h.prototype.init=function(){this.attachFragmentChange(function(E){if(this.getContent()){this.getContent().destroy();}var s=E.getParameter("fragment");this._initFragment(s);},this);};h.prototype.asyncInit=function(){return Promise.resolve();};h.prototype.onFragmentReady=function(){};h.prototype.setValue=function(m,s){var n=this.getValue();var p=this.getConfig()||{};var N=m;if(p.type==="integer"&&Number.isInteger(Number(m))){N=parseInt(m);}if(p.visible===false){return;}if(typeof N==="undefined"&&typeof p.defaultValue!=="undefined"){N=d(p.defaultValue);}this._validate(N,function(r){if((r||s)&&!b(N,n)){this.fireBeforeValueChange({path:p.path,value:n,nextValue:N});this.setProperty("value",N);this.fireValueChange({path:p.path,previousValue:n,value:N});}this.setHasOwnError(!r);}.bind(this));};h.prototype.setDesigntimeMetadata=function(m){var n=this.getDesigntimeMetadata();var N=m;g(N);var p=this.getConfig();if(!b(n,N)){this.fireDesigntimeMetadataChange({path:p.path,previousValue:n,value:N});}};h.prototype.getDesigntimeMetadata=function(){return(this.getConfig()||{}).designtime||{};};h.prototype.setDesigntimeMetadataValue=function(m){this.setDesigntimeMetadata(Object.assign({},this.getConfig().designtime,{__value:m}));};h.prototype.getNestedDesigntimeMetadata=function(K){var D=(this.getConfig()||{}).designtime||{};return D[K];};h.prototype.getNestedDesigntimeMetadataValue=function(K){return(this.getNestedDesigntimeMetadata(K)||{}).__value||{};};h.prototype.getDesigntimeMetadataValue=function(){var D=(this.getConfig()||{}).designtime||{};return D.__value||{};};h.prototype._getValidators=function(){var p=this.getConfig().validators||{};return v(Object.assign({},this.getDefaultValidators(),p)).filter(function(m){return m.isEnabled!==false;});};h.prototype.getDefaultValidators=function(){return{};};h.prototype._validate=function(m,n){var E=[];var p=this._getValidators();p=p.map(function(r){var s=V.hasValidator(r.type)?V.getValidator(r.type):this.getDefaultValidatorModules()[r.type];if(!s){throw new Error("Unknown validator: "+r.type);}var t={};var u=r.errorMessage||s.errorMessage;var w=[];var x=u;if(e(u)){w=u.placeholders(r.config);x=u.message;}Object.keys(r.config||{}).forEach(function(y){var z=r.config[y];if(typeof z==="function"){z=z(this);}t[y]=z;}.bind(this));return{validator:s,config:t,errorMessage:this.getI18nProperty(x,w),type:r.type};}.bind(this));var q=function(){var r=E.length===0;this.setInputState(!r,E[0]);if(typeof n==="function"){n(r);}}.bind(this);p.forEach(function(r){if(!r.validator.validate(m,r.config)){E.push(r.errorMessage);}});q();};h.prototype.setInputState=function(H,E){this._sErrorMessage=H&&E;if(this.isReady()){this._setInputState();}};h.prototype._setInputState=function(){var I=this.getContent();if(!I||!I.setValueState){return;}var E=this._sErrorMessage;if(E){I.setValueState("Error");I.setValueStateText(E);}else{I.setValueState("None");}};h.prototype.getDefaultValidatorModules=function(){return B;};h.prototype._formatValue=function(m){return this.formatValue(d(m));};h.prototype.formatValue=function(m){return m;};h.prototype.getExpectedWrapperCount=function(){return 0;};h.prototype._checkReadyState=function(){if(this._mWrapperReadyCheck){this._mWrapperReadyCheck.cancel();}if(!this._bInitFinished){this._setReady(false);return;}if(!this._bFragmentReady){this._setReady(false);return;}if(this._iExpectedWrapperCount===0){this._setReady(true);return;}if(this._iExpectedWrapperCount===this._aEditorWrappers.length){if(this._aEditorWrappers.every(function(w){return w.isReady();})){this._setReady(true);}else{this._setReady(false);this._mWrapperReadyCheck=c(function(r){Promise.all(this._aEditorWrappers.map(function(w){return w.ready();})).then(r);}.bind(this));this._mWrapperReadyCheck.promise.then(function(){this._setReady(true);delete this._mWrapperReadyCheck;}.bind(this));}}else{this._setReady(false);}};h.prototype.wrapperInit=function(E){if(!this._oWrapperObserver){this._oWrapperObserver=new M(function(m){var O=m.object;switch(m.type){case'destroy':this._aEditorWrappers=this._aEditorWrappers.filter(function(n){return n!==O;});this._checkReadyState();this._checkForError();break;case'parent':k(O).forEach(function(w){if(!i(w,this)){this._registerWrapper(w);}else{o(this._oWrapperObserver,w);}}.bind(this));this._oWrapperObserver.unobserve(O);break;default:return;}}.bind(this));}var w=E.getSource();if(i(w,this)){o(this._oWrapperObserver,w);return;}this._registerWrapper(w);};function o(w,W){var r=j(W);if(!w.isObserved(r,{parent:true})){w.observe(r,{parent:true});}}function j(E){var p=E.getParent();return p?j(p):E;}function k(E){return l(E)?[E]:E.findAggregatedObjects(true,function(E){return l(E);});}function l(E){return E.isA("sap.ui.integration.designtime.baseEditor.PropertyEditors")||E.isA("sap.ui.integration.designtime.baseEditor.PropertyEditor");}h.prototype._registerWrapper=function(w){this._aEditorWrappers.push(w);w.attachReady(function(E){this._setReady(false);this._checkReadyState();}.bind(this));w.attachValidationErrorChange(this._checkForError.bind(this));if(w.isA("sap.ui.integration.designtime.baseEditor.PropertyEditor")){w.attachPropertyEditorChange(function(E){var p=E.getParameter("propertyEditor");if(!p){this._setReady(false);}},this);}this._oWrapperObserver.observe(w,{destroy:true});this._checkReadyState();};h.prototype._setReady=function(r){var p=this._bIsReady;this._bIsReady=r;if(p!==true&&r===true){this.fireReady();}};h.prototype.isReady=function(){return!!this._bIsReady;};h.prototype.setHasOwnError=function(H){this._bHasOwnError=H;this._checkForError();};h.prototype._checkForError=function(){var H=this.hasError();if(H!==this._bHasError){this._bHasError=H;this.fireValidationErrorChange({hasError:H});}};h.prototype.hasError=function(){return!!this._bHasOwnError||this._aEditorWrappers.some(function(w){return w.hasError();});};h.prototype.ready=function(){return new Promise(function(r){if(this.isReady()){r();}else{this.attachEventOnce("ready",r);}}.bind(this));};h.prototype.setFragment=function(s,G){if(this._currentXmlFragment!==s){var p=this._currentXmlFragment;this._currentXmlFragment=s;if(typeof G==='function'){this.getExpectedWrapperCount=G;}this.fireFragmentChange({previousFragment:p,fragment:s});}};h.prototype.getFragment=function(){return this._currentXmlFragment;};h.prototype._initFragment=function(s){this._setReady(false);this._bFragmentReady=false;if(this._oFragmentPromise){this._oFragmentPromise.cancel();}var m=new a(function(r,R,n){n.shouldReject=false;this._loadFragment(s).then(r,R);}.bind(this));this._oFragmentPromise=m;return m.then(function(n){if(m.isCanceled){n.destroy();return;}this._bFragmentReady=true;this.setContent(n);this.onFragmentReady();this._setInputState();this._checkReadyState();}.bind(this));};h.prototype._loadFragment=function(s){return F.load({name:s,controller:this});};h.prototype.clone=function(){this.destroyContent();return C.prototype.clone.apply(this,arguments);};h.prototype.exit=function(){this._oDefaultModel.destroy();if(this._oConfigBinding){this._oConfigBinding.destroy();}if(this._oWrapperObserver){this._oWrapperObserver.destroy();}if(this._oFragmentPromise){this._oFragmentPromise.cancel();}};h.configMetadata={visible:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},typeLabel:{defaultValue:"BASE_EDITOR.FALLBACK_TYPE"}};h.prototype.setConfig=function(m){var p=this.getConfig();var D={};var n=P.getByClassName(this.getMetadata().getName()).configMetadata;f(n,function(s,q){D[s]=q.defaultValue;});var N=Object.assign({},D,m);N=this.onBeforeConfigChange(N);if(!b(p,N)){this.setProperty("config",N);this.fireConfigChange({previousConfig:p,config:N});}};h.prototype.onBeforeConfigChange=function(m){return m;};h.prototype.getI18nProperty=function(n,p){if(this.getModel("i18n")){return this.getModel("i18n").getResourceBundle().getText(n,p);}return n;};h.prototype.getLabel=function(){var m=this.getAggregation("_label");if(!m){m=new L({text:"{config/label}",design:"Bold"});this.setAggregation("_label",m);}return m;};h.prototype.enhanceAccessibilityState=function(E,A){var p=this.getParent();if(p&&p.enhanceAccessibilityState){p.enhanceAccessibilityState(this,A);}};h.prototype.getFocusDomRef=function(){var m=this.getContent();if(m&&m.isA("sap.ui.core.IFormContent")){return m.getFocusDomRef();}};h.prototype.getIdForLabel=function(){var m=this.getContent();if(m&&m.isA("sap.ui.core.IFormContent")){return m.getIdForLabel();}};return h;});
