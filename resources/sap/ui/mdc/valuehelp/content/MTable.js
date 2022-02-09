/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/valuehelp/base/FilterableListContent','sap/ui/mdc/condition/FilterConverter','sap/ui/mdc/util/loadModules','sap/m/library','sap/ui/model/FilterType','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/ui/model/FilterProcessor','sap/ui/mdc/util/Common','sap/base/strings/formatMessage','sap/base/util/merge','sap/ui/mdc/enum/SelectType','sap/base/Log'],function(F,a,l,b,c,d,e,f,C,g,m,S,L){"use strict";var h=b.ListMode;var j=b.Sticky;var M=F.extend("sap.ui.mdc.valuehelp.content.MTable",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.ITypeaheadContent","sap.ui.mdc.valuehelp.IDialogContent"],properties:{},aggregations:{table:{type:"sap.m.Table",multiple:false}},events:{contentUpdated:{}},defaultAggregation:"table"}});M.prototype.init=function(){F.prototype.init.apply(this,arguments);this._oObserver.observe(this,{aggregations:["table"]});this._addPromise("listBinding");this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");this._oMResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");};M.prototype.getValueHelpIcon=function(){if(this.getUseAsValueHelp()){return"sap-icon://slim-arrow-down";}else{return null;}};function _(){if(this._oTable){var i=this._oTable.getItems();var r=this.getConditions();for(var I in i){var s=i[I];var t=this._isItemSelected(s,r);s.setSelected(t);}}}M.prototype.applyFilters=function(s){var i=this._getListBinding();var v=this._isValueHelpDelegateInitialized();if((!i||!v)&&(this.isContainerOpening()||this.isTypeahead())){Promise.all([this._retrievePromise("listBinding"),this._awaitValueHelpDelegate()]).then(function(){if(!this.bIsDestroyed){this.applyFilters(s);}}.bind(this));return;}if(!v||(!this.isTypeahead()&&!this.isContainerOpen()&&i.isSuspended())){return;}var D=this._getValueHelpDelegate();var r=this._getValueHelpDelegatePayload();var t=this._getPriorityFilterBar();var u=t?t.getInternalConditions():this.getProperty("inConditions");var w=u&&this._getTypesForConditions(u);var x=u&&a.createFilters(u,w,undefined,this.getCaseSensitive());var y=x&&[x];var z=this.isTypeahead()?s:t&&t.getSearch();var U=true;var A;try{A=i.getFilterInfo();}catch(B){L.info("ValueHelp-Filter: getFilterInfo threw error");}if(!y){y=[];}if(y.length===0&&!A){U=false;}if(D&&D.isSearchSupported(r,i)){if(!i.isSuspended()&&U){i.suspend();}D.executeSearch(r,i,z);L.info("ValueHelp-Search: "+z);}if(U){i.filter(y,c.Application);L.info("ValueHelp-Filter: "+this._prettyPrintFilters.call(this,y));}if(i.isSuspended()){i.resume();}};M.prototype._handleSelectionChange=function(E){var i=this.isTypeahead();if(!i||!this._isSingleSelect()){var P=E.getParameters();var r=P.listItems||P.listItem&&[P.listItem];var s=r.map(function(I){var v=this._getItemFromContext(I.getBindingContext());return v&&this._createCondition(v.key,v.description,v.inParameters,v.outParameters);}.bind(this));this.fireSelect({type:P.selected?S.Add:S.Remove,conditions:s});if(i){this.fireConfirm();}}};M.prototype._handleItemPress=function(E){var i=E.getParameter("listItem");var v=this._getItemFromContext(i.getBindingContext());var I=this._isSingleSelect();var s=I?true:!i.getSelected();var r=S.Set;if(!I){i.setSelected(s);r=s?S.Add:S.Remove;}var t=this._createCondition(v.key,v.description,v.inParameters,v.outParameters);this.fireSelect({type:r,conditions:[t]});if(this.isTypeahead()){this.fireConfirm({close:true});}};M.prototype._handleUpdateFinished=function(){_.apply(this);this.fireContentUpdated();};M.prototype._getTable=function(){return this._oTable;};M.prototype.onShow=function(){var t=this._getTable();if(t){if(!t.hasStyleClass("sapMComboBoxList")){t.addStyleClass("sapMComboBoxList");}}F.prototype.onShow.apply(this,arguments);};M.prototype.onHide=function(){F.prototype.onHide.apply(this,arguments);var t=this.getTable();if(t){this.removeFocus();if(t.hasStyleClass("sapMComboBoxList")){t.removeStyleClass("sapMComboBoxList");}}};M.prototype._handleConditionsUpdate=function(i){_.call(this);};M.prototype.getContent=function(){if(!this.isTypeahead()){return this._retrievePromise("wrappedContent",function(){return l(["sap/ui/layout/FixFlex","sap/m/VBox","sap/m/Panel","sap/m/ScrollContainer","sap/ui/model/resource/ResourceModel"]).then(function(i){var r=i[0];var V=i[1];var P=i[2];var s=i[3];var R=i[4];if(!this._oContentLayout){this._oFilterBarVBox=new V(this.getId()+"-FilterBarBox");this._oFilterBarVBox.addStyleClass("sapMdcValueHelpPanelFilterbar");this._oFilterBarVBox._oWrapper=this;this._oFilterBarVBox.getItems=function(){return[this._oWrapper._getPriorityFilterBar.call(this._oWrapper)];};this.setModel(new R({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");var t=function(T){var I=0;if(I===0){T=this.getModel("$i18n").getResourceBundle().getText("valuehelp.TABLETITLENONUMBER");}return g(T,I);};this._oTablePanel=new P(this.getId()+"-TablePanel",{expanded:true,height:"100%",headerText:{parts:['$i18n>valuehelp.TABLETITLE'],formatter:t}});this._oTablePanel.addStyleClass("sapMdcTablePanel");this._oContentLayout=new r(this.getId()+"-FF",{minFlexSize:200,fixContent:this._oFilterBarVBox,flexContent:this._oTablePanel});this._oScrollContainer=new s(this.getId()+"-SC",{height:"100%",width:"100%",vertical:true});this._oScrollContainer._oWrapper=this;this._oScrollContainer.getContent=function(){var v=[];var T=this._oWrapper&&this._oWrapper._oTable;if(T){v.push(T);}return v;};this._oTablePanel.addContent(this._oScrollContainer);}this.setAggregation("displayContent",this._oContentLayout);var u=this._getPriorityFilterBar();if(!u){return this._createDefaultFilterBar().then(function(){return this._oContentLayout;}.bind(this));}return this._oContentLayout;}.bind(this));}.bind(this));}return this._oTable;};M.prototype.getItemForValue=function(i){if(!i.checkKey&&i.parsedValue&&!i.checkDescription){return null;}i.caseSensitive=i.caseSensitive||this.getCaseSensitive();return k.call(this).then(function(P){var r;if(!P){var t=this.getTable();r=n.call(this,i,t.getItems());}if(!r){r=this._loadItemForValue(i);}return r;}.bind(this));};function k(){return this._retrievePromise("listBinding").then(function(i){var D=this._getValueHelpDelegate();var r=this._getValueHelpDelegatePayload();var s=this._getListBindingInfo();if(i&&D){return D.checkListBindingPending(r,i,s);}else{return true;}}.bind(this));}function n(r,I){if(I.length===0){return;}var s=[];if(r.checkKey&&r.hasOwnProperty("parsedValue")){s.push({path:this.getKeyPath(),value:r.parsedValue});}if(r.checkDescription&&r.value){s.push({path:this.getDescriptionPath(),value:r.value});}var t=function(y,P){var B=y.isA("sap.ui.model.Context")?y:y.getBindingContext();return B.getProperty(P);};var u;var v=[];var w;var O;var i=0;for(i=0;i<s.length;i++){if(!s[i].path){throw new Error("path for filter missing");}v.push(new d({path:s[i].path,operator:e.EQ,value1:s[i].value,caseSensitive:r.caseSensitive}));}if(v.length===1){u=v[0];}else{u=new d({filters:v,and:false});}if(r.inParameters){v=[u];if(r.inParameters){v.push(r.inParameters);w=[];if(!r.inParameters.aFilters){w.push(r.inParameters.sPath);}else{for(i=0;i<r.inParameters.aFilters.length;i++){if(w.indexOf(r.inParameters.aFilters[i].sPath)<0){w.push(r.inParameters.aFilters[i].sPath);}}}}u=new d({filters:v,and:true});}var x=f.apply(I,u,t);if(x.length===1){var V=this._getItemFromContext(x[0].getBindingContext(),{inParameters:w,outParameters:O});return{key:V.key,description:V.description,inParameters:V.inParameters,outParameters:V.outParameters};}else if(x.length>1){if(!r.caseSensitive){var N=m({},r);N.caseSensitive=true;return n.call(this,N,I);}throw o.call(this,r.exception,true,s[0].value);}}M.prototype._getListBinding=function(){var t=this._getTable();return t&&t.getBinding("items");};M.prototype._getListBindingInfo=function(){var t=this._getTable();return t&&t.getBindingInfo("items");};M.prototype._loadItemForValue=function(r){if(!r.checkKey&&r.parsedValue&&!r.checkDescription){return null;}var K=this.getKeyPath();var D=this.getDescriptionPath();var u=this.getUseFirstMatch();var s=r.caseSensitive;var t=this._getTable();var v=t&&t.getBinding("items");var B=v&&v.getContext();var w=v&&v.getModel();var P=v&&v.getPath();var x=this._getValueHelpDelegate();var y=this._getValueHelpDelegatePayload();var z=["loadItemForValue",P,K,r.parsedValue||r.value].join("_");return this._retrievePromise(z,function(){var A=[];if(r.checkKey&&r.hasOwnProperty("parsedValue")){A.push(new d({path:K,operator:e.EQ,value1:r.parsedValue,caseSensitive:s}));}if(r.checkDescription&&r.value){A.push(new d({path:D,operator:e.EQ,value1:r.value,caseSensitive:s}));}var E=A.length>1?new d({filters:A,and:false}):A[0];A=[E];var I;if(r.inParameters){A.push(r.inParameters);I=[];if(!r.inParameters.aFilters){I.push(r.inParameters.sPath);}else{for(var i=0;i<r.inParameters.aFilters.length;i++){if(I.indexOf(r.inParameters.aFilters[i].sPath)<0){I.push(r.inParameters.aFilters[i].sPath);}}}}E=A.length>1?new d({filters:A,and:true}):A[0];var G=w.bindList(P,B);return x.executeFilter(y,G,E,2).then(function(H){var J=H.getContexts();setTimeout(function(){G.destroy();},0);if(J.length&&(J.length<2||u)){return this._getItemFromContext(J[0],{keyPath:K,descriptionPath:D,inParameters:I});}else if(r.checkKey&&r.parsedValue===""&&J.length===0){return null;}else{var N=o.call(this,r.exception,J.length>1,r.value);throw N;}}.bind(this));}.bind(this));};function o(E,N,v){var s;if(N){s=this._oResourceBundle.getText("valuehelp.VALUE_NOT_UNIQUE",[v]);}else{s=this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[v]);}var i=new E(s);i._bNotUnique=N;return i;}M.prototype.isValidationSupported=function(i){return true;};M.prototype.navigate=function(s){var i=this._getListBinding();if(!i||!i.getLength()){return k.call(this).then(function(P){if(!P&&i.getLength()!==0){return this.navigate(s);}return false;}.bind(this));}var t=this._getTable();t.addStyleClass("sapMListFocus");var I=this._oTable.getItems();var r=t.getSelectedItem();var u=I.length;var v=0;var w=false;if(r){v=I.indexOf(r);v=v+s;}else if(s>=0){v=s-1;}else{v=u+s;}if(this._getMaxConditions()!==1){if(this.getParent().isOpen()){t.focus();return;}}var x;if(v<0){v=0;x=true;w=true;}else if(v>=u-1){v=u-1;x=false;}else{x=s>=0;}while(I[v]&&I[v].isA("sap.m.GroupHeaderListItem")){if(x){v++;}else{v--;}}if(v<0||v>u-1){x=!x;w=v<0;v=v<0?0:u-1;while(I[v]&&I[v].isA("sap.m.GroupHeaderListItem")){if(x){v++;}else{v--;}}}var y=I[v];if(y){var z;if(y!==r){y.setSelected(true);var V=this._getItemFromContext(y.getBindingContext());z=V&&this._createCondition(V.key,V.description,V.inParameters,V.outParameters);this.setProperty("conditions",[z],true);if(this._bVisible){this._handleScrolling(y);}this.fireNavigated({condition:z,itemId:y.getId(),leaveFocus:false});}else if(w){this.fireNavigated({condition:undefined,itemId:undefined,leaveFocus:w});}}};M.prototype._handleScrolling=function(i){var s=this.getScrollDelegate();if(s){var t=this._getTable();var I=!isNaN(i)?i:t.indexOfItem(i);t.scrollToIndex(I).catch(function(E){});return true;}return false;};M.prototype.getScrollDelegate=function(){if(this._oScrollContainer){return this._oScrollContainer.getScrollDelegate();}return F.prototype.getScrollDelegate.apply(this,arguments);};M.prototype.removeFocus=function(){var t=this.getTable();if(t){t.removeStyleClass("sapMListFocus");}};M.prototype.getAriaAttributes=function(i){var t=this.getTable();return{contentId:t&&t.getId(),ariaHasPopup:"listbox",roleDescription:null};};M.prototype.getContainerConfig=function(){return{'sap.ui.mdc.valuehelp.Popover':{getContentHeight:function(){var t=this._getTable();var D=t&&t.getDomRef();return D&&Math.round(D.getBoundingClientRect().height);}.bind(this),getFooter:function(){return this._retrievePromise("footer",function(){return this._retrievePromise("listBinding").then(function(i){var B=this._getListBindingInfo();if(B&&B.length){return l(["sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer"]).then(function(r){var s=r[0];var T=r[1];var t=r[2];var u=new s(this.getId()+"-showAllItems",{text:this._oMResourceBundle.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){this.fireRequestSwitchToDialog();}.bind(this)});var v=[new t(this.getId()+"-Spacer")].concat(u);var w=new T(this.getId()+"-TB",{content:v});return w;}.bind(this));}}.bind(this));}.bind(this));}.bind(this)}};};function p(){if(this._oTable&&this.getParent()){var s=this._oTable.getSticky();if(!s||s.length===0){this._oTable.setSticky([j.ColumnHeaders]);}if(this.isTypeahead()){if(this._isSingleSelect()){this._oTable.setMode(h.SingleSelectMaster);}else{this._oTable.setMode(h.MultiSelect);}}else if(this._isSingleSelect()){this._oTable.setMode(h.SingleSelectLeft);}else{this._oTable.setMode(h.MultiSelect);}}}M.prototype.setParent=function(P){F.prototype.setParent.apply(this,arguments);p.call(this);};var q=function(){return this.applyFilters(this.getFilterValue());};M.prototype._observeChanges=function(i){var r,D;if(i.name==="_defaultFilterBar"){D=i.child;if(i.mutation==="insert"){r=this.getFilterBar();if(!r){D.attachSearch(q,this);}}else{D.detachSearch(q,this);}}if(i.name==="filterBar"){r=i.child;D=this.getAggregation("_defaultFilterBar");if(i.mutation==="insert"){if(D){D.detachSearch(q,this);}r.attachSearch(q,this);}else{if(D){D.attachSearch(q,this);}r.detachSearch(q,this);this._createDefaultFilterBar();}}if(i.name==="config"){p.call(this);}if(i.name==="items"&&i.mutation==="ready"){this._resolvePromise("listBinding",i.bindingInfo.binding);}if(i.name==="table"){var t=i.child;if(i.mutation==="remove"){this._oObserver.unobserve(t);t.removeDelegate(this._oTableDelegate);this._oTable.detachItemPress(this._handleItemPress,this);this._oTable.detachSelectionChange(this._handleSelectionChange,this);this._oTable.detachUpdateFinished(this._handleUpdateFinished,this);this._oTable=null;this._removePromise("footer");this._addPromise("listBinding");}else{this._oTable=t;p.call(this);this._oTable.attachItemPress(this._handleItemPress,this);this._oTable.attachSelectionChange(this._handleSelectionChange,this);this._oTable.attachUpdateFinished(this._handleUpdateFinished,this);this._oTableDelegate=this._oTableDelegate||{onsapprevious:this._handleTableEvent,onsapnext:this._handleTableEvent,cellClick:this._handleTableEvent};t.addDelegate(this._oTableDelegate,true,this);var s=t.getBinding("items");if(s){this._resolvePromise("listBinding",s);}else{this._oObserver.observe(i.child,{bindings:["items"]});}}}F.prototype._observeChanges.apply(this,arguments);};M.prototype._handleTableEvent=function(E){if(!this.isTypeahead()){return;}var t=this._getTable();var i=jQuery(E.target).control(0);switch(E.type){case"sapprevious":if(i.isA("sap.m.ListItemBase")){if(t.indexOfItem(i)===0){this.fireNavigated({condition:undefined,itemId:undefined,leaveFocus:true});E.preventDefault();E.stopPropagation();E.stopImmediatePropagation(true);}}break;default:break;}};M.prototype.isQuickSelectSupported=function(){return true;};M.prototype.shouldOpenOnNavigate=function(){return true;};M.prototype.exit=function(){C.cleanup(this,["_sTableWidth","_oTable","_oScrollContainer","_oContentLayout","_oTablePanel","_oFilterBarVBox","_oMResourceBundle","_oResourceBundle"]);F.prototype.exit.apply(this,arguments);};return M;});