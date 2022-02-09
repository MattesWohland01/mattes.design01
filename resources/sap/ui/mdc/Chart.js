/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/mdc/Control","./chart/ChartSettings","sap/ui/base/SyncPromise","sap/ui/mdc/util/loadModules","./ChartRenderer","sap/ui/base/ManagedObjectObserver","sap/ui/model/json/JSONModel","sap/ui/mdc/library","sap/ui/model/base/ManagedObjectModel","sap/ui/model/Sorter","sap/base/Log","sap/base/util/deepEqual","sap/ui/Device","sap/ui/mdc/chart/ToolbarHandler","sap/ui/mdc/mixin/FilterIntegrationMixin","sap/m/VBox","sap/m/Text","sap/ui/mdc/p13n/subcontroller/ChartItemController","sap/ui/mdc/p13n/subcontroller/SortController","sap/ui/events/KeyCodes","sap/ui/mdc/actiontoolbar/ActionToolbarAction",'sap/ui/mdc/p13n/panels/ChartItemPanelNew'],function(C,a,b,S,l,c,M,J,d,e,f,L,g,D,T,F,V,h,m,n,K,A,o){"use strict";var p,q,r,s,t,u;var v=a.extend("sap.ui.mdc.Chart",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/chart/Chart.designtime",interfaces:["sap.ui.mdc.IxState"],defaultAggregation:"items",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/ChartDelegate"}},header:{type:"string",group:"Misc",defaultValue:null},noDataText:{type:"string"},chartType:{type:"string",group:"Misc",defaultValue:"column"},selectionMode:{type:"string",group:"Misc",defaultValue:"MULTIPLE"},p13nMode:{type:"sap.ui.mdc.ChartP13nMode[]"},legendVisible:{type:"boolean",group:"Misc",defaultValue:true},vizProperties:{type:"object",group:"Misc"},_colorings:{type:"object",visibility:"hidden",byValue:true},ignoreToolbarActions:{type:"sap.ui.mdc.ChartToolbarActionType[]",defaultValue:[]},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"240px",invalidate:true},minHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"400px",invalidate:true},sortConditions:{type:"object"},showChartTooltip:{type:"boolean",group:"Misc",defaultValue:true},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{data:{multiple:true},items:{type:"sap.ui.mdc.chart.Item",multiple:true},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getToolbar",aggregation:"actions"}},_chart:{type:"sap.chart.Chart",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.ui.mdc.ActionToolbar",multiple:false,visibility:"hidden"},_breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false,visibility:"hidden"},_noDataStruct:{type:"sap.m.VBox",multiple:false,visibility:"hidden"},selectionDetailsActions:{type:"sap.ui.mdc.chart.SelectionDetailsActions",multiple:false}},associations:{filter:{type:"sap.ui.mdc.IFilter",multiple:false}},events:{selectionDetailsActionPressed:{parameters:{action:{type:"sap.ui.core.Item"},itemContexts:{type:"sap.ui.model.Context"},level:{type:"sap.m.SelectionDetailsActionLevel"}}},dataPointsSelected:{parameters:{dataContext:{type:"object"}}}}}});var _=function(i){if(!this.oChartPromise){this._bNeedSelectionModeSet=true;return;}this.oChartPromise.then(function(j){if(this.bIsDestroyed){return;}i=i||this.getSelectionMode();j.setSelectionMode(i);if(i!=="NONE"){this._prepareSelection();}}.bind(this));};F.call(v.prototype);v.prototype.init=function(){this._oObserver=new M(this.update.bind(this));this._oObserver.observe(this,{aggregations:["items","_chart"],properties:["ignoreToolbarActions","p13nMode"]});this._oManagedObjectModel=new e(this);this.setModel(this._oManagedObjectModel,"$mdcChart");a.prototype.init.apply(this,arguments);};v.prototype.initModules=function(i){this.initControlDelegate(i[0]);p=i[1];s=i[2];t=i[3];u=i[4];};function w(){return["sap/chart/Chart","sap/ui/mdc/chart/ChartTypeButton","sap/ui/mdc/chart/MeasureItem","sap/viz/ui5/controls/VizTooltip"];}v.prototype.applySettings=function(i,j){var k;if(i){k=i.actions;}if(!this._oToolbarHandler){this._oToolbarHandler=new T();}var z=a.prototype.applySettings.apply(this,arguments);this._tempResolve;this._tempReject;this.oChartPromise=new S(function(E,G){this._tempResolve=E;this._tempReject=G;}.bind(this));var R={};R.controller={};var B=this.getP13nMode()||[];B.forEach(function(E){if(E=="Item"){R.controller["Item"]=m;}if(E=="Sort"){R.controller["Sort"]=n;}});this.getEngine().registerAdaptation(this,R);if(this.getAutoBindOnInit()){this._createChart(i,k);}else{this._mStoredSettings=i;this._mStoredActions=k;this._oToolbarHandler.createToolbar(this,k,true);this._createTempNoData();}return z;};v.prototype._getToolbar=function(){if(!this.getAggregation("_toolbar")){this._oToolbarHandler.createToolbar(this);}return this.getAggregation("_toolbar");};v.prototype._createTempNoData=function(){var N=new h({text:this.getProperty("noDataText")});var i=new V({items:[N],justifyContent:"Center",alignItems:"Center",height:"100%"});this.setAggregation("_noDataStruct",i);};v.prototype._createChart=function(i,j){var k=(i&&i.delegate)||this.getDelegate();var z=k&&k.name;var B=[z].concat(w());this.setBusyIndicatorDelay(0);this.setBusy(true);l(B).then(function G(E){this.initModules(E);if(this.bIsDestroyed){return S.reject();}return this.getControlDelegate().fetchProperties(this);}.bind(this)).then(function E(P){if(this.bIsDestroyed){return S.reject();}var I={};P.forEach(function(G){I[G.name]=G;});if(this.getAggregation("_noDataStruct")){this.getAggregation("_noDataStruct").destroy();this.setAggregation("_noDataStruct",null);}return this._createInnerChart(i,I);}.bind(this)).then(function E(I){if(!this._oToolbarHandler){this._oToolbarHandler=new T();}if(this.getAutoBindOnInit()){this._oToolbarHandler.createToolbar(this,j);}else{this._oToolbarHandler.updateToolbar(this);}this._createDrillBreadcrumbs();this._toggleChartTooltipVisibility(this.getShowChartTooltip());this._tempResolve(I);return I;}.bind(this)).catch(function G(E){this._tempReject();if(E){L.error("The control could not be initialized.",E,this.getMetadata().getName());}}.bind(this));if(!i||i.selectionMode===undefined||this._bNeedSelectionModeSet){_.apply(this);}if(i&&i.data){this._addBindingListener(i.data,"change",this._onDataLoadComplete.bind(this));}this._bInnerChartInitialized=true;this.bindAggregation("data",this.oDataInfo);};v.prototype.bindAggregation=function(N,B,i){if(N=="data"){this.oDataInfo=B;var j=this.getAggregation("_chart");if(j&&this.bDelegateInitialized){this.getControlDelegate().rebindChart(this,B,i);}else if(this.oChartPromise){this.oChartPromise.then(function(j){this.getControlDelegate().rebindChart(this,B,i);}.bind(this));}return this;}return a.prototype.bindAggregation.apply(this,arguments);};v.prototype._onDataLoadComplete=function(E){if((E.mParameters.reason==="change"||E.mParameters.reason==="filter")&&!E.mParameters.detailedReason){this.setBusy(false);}};v.prototype._addBindingListener=function(B,E,H){if(!B.events){B.events={};}if(!B.events[E]){B.events[E]=H;}else{var O=B.events[E];B.events[E]=function(){H.apply(this,arguments);O.apply(this,arguments);};}};v.prototype.getBindingInfo=function(N){if(N=="data"){return this.oDataInfo;}return a.prototype.getBindingInfo.apply(this,arguments);};v.prototype.setLegendVisible=function(i){this.setVizProperties({'legend':{'visible':i},'sizeLegend':{'visible':i}});return this.setProperty("legendVisible",i);};v.prototype._createInnerChart=function(k,I){k=k||{};var z={},B,E=[],G=[],H=[],N={};z.chartType='{$mdcChart>/chartType}';z.dimensions=[];z.measures=[];z.id=this.getId()+"--innerChart";z.height='100%';z.width='100%';z.vizProperties='{$mdcChart>/vizProperties}';k.items=k.items||[];function O(j){if(this&&this.getVizItemType()=="Dimension"){z.dimensions.push(j);}else{z.measures.push(j);}}function P(B,U){if(B.getCriticality()){U._addCriticality(B);}H.push(B.getKey());if(B.getAdditionalColoringMeasures){for(var j=0;j<B.getAdditionalColoringMeasures().length;j++){if(G.indexOf(B.getAdditionalColoringMeasures()[j])==-1){G.push(B.getAdditionalColoringMeasures()[j]);}}}}function Q(){var j,U;for(var i=0;i<G.length;i++){j=G[i];if(H.indexOf(j)==-1){U=this.getControlDelegate().retrieveAggregationItem("items",I[j]);U=t.getVizItemSettings(U.settings);E.push(t.createVizChartItem(U).then(O));}}}for(var i=0;i<k.items.length;i++){B=k.items[i];P(B,this);if(I[B.getKey()]){N=this.getControlDelegate().retrieveAggregationItem("items",I[B.getKey()]).settings;}else{N=undefined;}E.push(B.toVizChartItem(N).then(O.bind(B)));}Q();var R=function(j){this.fireDataPointsSelected({dataContext:j.getParameters()});};return Promise.all(E).then(function(){var j=new p(z);j.setVisibleDimensions([]);j.setVisibleMeasures([]);j.setInResultDimensions([]);j.attachSelectData(function(U){R.call(this,U);}.bind(this));j.attachDeselectData(function(U){R.call(this,U);}.bind(this));this._oObserver.observe(j,{bindings:["data"],aggregations:["dimensions","measures"]});this.setAggregation("_chart",j);return j;}.bind(this));};v.prototype.setSelectionMode=function(i){this.setProperty("selectionMode",i,true);i=this.getSelectionMode();_.call(this,i);return this;};v.prototype.addItem=function(i,j){var k=this.getAggregation("_chart");if(k){i.toChart(k);}else if(this.oChartPromise){this.oChartPromise.then(function(k){if(k){this.toChart(k);}}.bind(i));}this._oObserver.observe(i,{properties:["visible","inResult","role"]});return this.addAggregation("items",i,j);};v.prototype.insertItem=function(i,I,j){if(i.getCriticality()){this._addCriticality(i);}var k=this.getAggregation("_chart");if(k){i.toChart(k);}else if(this.oChartPromise){this.oChartPromise.then(function(k){if(k){this.toChart(k);}}.bind(i));}this._oObserver.observe(i,{properties:["visible","inResult","role"]});return this.insertAggregation("items",i,I,j);};v.prototype.removeItem=function(i,j){this._oObserver.unobserve(i);return this.removeAggregation("items",i,j);};v.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this.oChartPromise=null;this._oSelectionHandlerPromise=null;if(this._oToolbarHandler){this._oToolbarHandler.destroy();this._oToolbarHandler=null;}var i=this.getAggregation("_chart");if(i){i.destroy();}};v.prototype.getItemsByKeys=function(I){var j=[],k=this.getItems();I.forEach(function(z){for(var i=k.length-1;i>=0;i--){if(k[i].getKey()==z){j.push(k[i]);break;}}});return j;};v.prototype._showDrillDown=function(){if(r){if(!this._oDrillDownPopover){r.createDrillDownPopover(this);}return r.showDrillDownPopover(this);}return new Promise(function(i,j){sap.ui.require(["sap/ui/mdc/chart/DrillStackHandler"],function(k){r=k;r.createDrillDownPopover(this);r.showDrillDownPopover(this).then(function(z){i(z);});}.bind(this));}.bind(this));};v.prototype._createDrillBreadcrumbs=function(){if(r){if(!this._oDrillBreadcrumbs){return r.createDrillBreadcrumbs(this);}return Promise.resolve(this._oDrillBreadcrumbs);}return new Promise(function(i,j){sap.ui.require(["sap/ui/mdc/chart/DrillStackHandler"],function(k){r=k;r.createDrillBreadcrumbs(this).then(function(z){i(z);});}.bind(this));}.bind(this));};v.prototype._getPropertyData=function(){return new Promise(function(i,j){if(!this.aFetchedProperties){return this.oChartPromise.then(function(){return this.getControlDelegate().fetchProperties(this);}.bind(this)).then(function(k){this.aFetchedProperties=k;i(k);}.bind(this));}else{i(this.aFetchedProperties);}}.bind(this));};v.prototype.getAvailableChartTypes=function(){var j=[];var k=this.getAggregation("_chart");if(k){var z=k.getAvailableChartTypes().available;if(j){var B=C.getLibraryResourceBundle("sap.chart.messages");for(var i=0;i<z.length;i++){var E=z[i].chart;j.push({key:E,icon:s.mMatchingIcon[E],text:B.getText("info/"+E),selected:(E==this.getChartType())});}}}return j;};v.prototype.getTypeInfo=function(){var i=this.getChartType(),j=C.getLibraryResourceBundle("sap.ui.mdc");var I={icon:s&&s.mMatchingIcon[i]?s.mMatchingIcon[i]:"sap-icon://horizontal-bar-chart",text:j.getText("chart.CHART_TYPE_TOOLTIP",[i])};return I;};v.prototype.getManagedObjectModel=function(){return this._oManagedObjectModel;};v.prototype.update=function(i){var j=this.getAggregation("_chart");if(j){this._update(j,i);}else if(this.oChartPromise){this.oChartPromise.then(function(j){if(j){this._update(j,i);}}.bind(this));}};v.prototype._update=function(j,k){var I=this.getItems(),z,B,E=[],G=[],H=[],N={};if(k.name==="ignoreToolbarActions"||k.name==="p13nMode"){return;}if(k.name==="data"&&k.type==="binding"&&k.mutation==="prepare"&&k.object.isA("sap.chart.Chart")){k.bindingInfo.sorter=this._getSorters();}this._aInResultProperties=[];for(var i=0;i<I.length;i++){B=I[i];z=B.getVizItemType()=="Measure"?j.getMeasureByName(B.getKey()):j.getDimensionByName(B.getKey());if(!z){continue;}if(B.getVisible()){if(B.getVizItemType()=="Measure"){E.push(z.getName());if(B.getDataPoint()){N[z.getName()]=B.getDataPoint();}}else{G.push(z.getName());}this._aInResultProperties.push(z.getName());}if(B.getVizItemType()=="Dimension"){if(B.getInResult()){H.push(z.getName());this._aInResultProperties.push(z.getName());}}}var R=false;if(!g(G,j.getVisibleDimensions())){j.setVisibleDimensions(G);R=true;}if(!g(E,j.getVisibleMeasures())){j.setVisibleMeasures(E);R=true;}if(!g(H,j.getInResultDimensions())){j.setInResultDimensions(H);R=true;}if(R){this.rebind();this._updateSemanticalPattern(j,E,N);this._updateColoring(j,G,E);}if(r&&this.getAggregation("_breadcrumbs")){r._updateDrillBreadcrumbs(this,this.getAggregation("_breadcrumbs"));}};v.prototype._updateSemanticalPattern=function(i,j,z){for(var k=0;k<j.length;k++){var B=z[j[k]];if(B){if(B.targetValue||B.foreCastValue){var E=i.getMeasureByName(j[k]);E.setSemantics("actual");if(B.targetValue!=null){var R=i.getMeasureByName(B.targetValue);if(R){R.setSemantics("reference");}else{L.error("sap.ui.mdc.Chart: "+B.targetValue+" is not a valid measure");}}if(B.foreCastValue){var P=i.getMeasureByName(B.foreCastValue);if(P){P.setSemantics("projected");}else{L.error("sap.ui.comp.SmartChart: "+B.ForecastValue.Path+" is not a valid measure");}}E.setSemanticallyRelatedMeasures({referenceValueMeasure:B.targetValue,projectedValueMeasure:B.foreCastValue});}}}};v.prototype._updateColoring=function(i,j,z,B){var E=this.getProperty("_colorings"),k;if(E&&E.Criticality){var G;for(k=0;k<j.length;k++){if(E.Criticality.DimensionValues[j[k]]){G={coloring:"Criticality",parameters:{dimension:j[k]}};delete E.Criticality.MeasureValues;break;}}if(!G){delete E.Criticality.DimensionValues;for(var H in E.Criticality.MeasureValues){if(z.indexOf(H)==-1){delete E.Criticality.MeasureValues[H];}}G={coloring:"Criticality",parameters:{measure:z}};}if(G){i.setColorings(E);i.setActiveColoring(G);}}};v.prototype._prepareSelection=function(){if(q){q.prepareChart(this);}else{this._oSelectionHandlerPromise=l(["sap/ui/mdc/chart/SelectionHandler"]).then(function(i){q=i[0];if(this.bIsDestroyed){return;}q.prepareChart(this);}.bind(this));}};v.prototype._getSorters=function(){var i;var j=this.getSortConditions()?this.getSortConditions().sorters:[];j.forEach(function(k){if(this._aInResultProperties.indexOf(k.name)!=-1){var z=new f(k.name,k.descending);if(i){i.push(z);}else{i=[z];}}}.bind(this));return i;};v.prototype.rebind=function(){this.setBusy(true);if(!this._bInnerChartInitialized){this._createChart(this._mStoredSettings,this._mStoredActions);return;}if(!this.bDelegateInitialized){return;}var B=this.oDataInfo,i=this.getControlDelegate();if(i){i.updateBindingInfo(this,B);}if(!this.isInnerChartBound()){return;}if(B){B.sorter=this._getSorters();B.binding.bHasAnalyticalInfo=true;}this.bindAggregation("data",B);this._updateInnerChartNoDataText();this._renderOverlay(false);};v.prototype.isInnerChartBound=function(){return this.getAggregation("_chart")?this.getAggregation("_chart").isBound("data"):false;};v.prototype._onFiltersChanged=function(E){if(this.isInnerChartBound()&&E.getParameter("conditionsBased")){this._renderOverlay(true);}};v.prototype._renderOverlay=function(i){if(this.getAggregation("_chart")){var $=this.getAggregation("_chart").$(),j=$.find(".sapUiMdcChartOverlay");if(i&&j.length===0){j=jQuery("<div>").addClass("sapUiOverlay sapUiMdcChartOverlay").css("z-index","1");$.append(j);}else if(!i){j.remove();}}};v.prototype.setNoDataText=function(N){this.setProperty("noDataText",N,true);this._updateInnerChartNoDataText();return this;};v.prototype._onFilterProvided=function(){this._updateInnerChartNoDataText();};v.prototype._onFilterRemoved=function(){this._updateInnerChartNoDataText();};v.prototype._updateInnerChartNoDataText=function(){var i=this.getAggregation("_chart");if(!i){return;}i.setCustomMessages({'NO_DATA':this._getNoDataText()});};v.prototype._getNoDataText=function(){var N=this.getNoDataText();if(N){return N;}var R=C.getLibraryResourceBundle("sap.ui.mdc");if(!this.isInnerChartBound()){if(this.getFilter()){return R.getText("chart.NO_DATA_WITH_FILTERBAR");}return R.getText("chart.NO_DATA");}return R.getText("chart.NO_RESULTS");};v.prototype._addCriticality=function(i){var j=this.getProperty("_colorings");j=j||{Criticality:{DimensionValues:{},MeasureValues:{}}};var k=i.getCriticality(),z={};if(i.getVizItemType()=="Dimension"){for(var B in k){z[B]={Values:k[B]};}j.Criticality.DimensionValues[i.getKey()]=z;}else{for(var B in k){z[B]=k[B];}j.Criticality.MeasureValues[i.getKey()]=z;}this.setProperty("_colorings",j);};v.prototype.getCollectionModel=function(){var B=this.getBindingInfo("data");return B?this.getModel(B.model):null;};v.prototype.getCollectionPath=function(){var B=this.getBindingInfo("data");return B?B.path:null;};v.prototype.done=function(){return this.oChartPromise;};v.prototype.initialized=function(){return this.oChartPromise;};var x=function(i){var P=[];if(i){i.getItems().forEach(function(j,I){P.push({name:j.getKey(),role:j.getRole()});});}return P;};var y=function(i){return i.getSortConditions()?i.getSortConditions().sorters:[];};v.prototype.isFilteringEnabled=function(){var P=this.getP13nMode()||[];return P.indexOf("Filter");};v.prototype.getCurrentState=function(){var i={};var P=this.getP13nMode();if(P){if(P.indexOf("Item")>-1){i.items=x(this);}if(P.indexOf("Sort")>-1){i.sorters=y(this);}}return i;};v.prototype.setShowChartTooltip=function(i){this.setProperty("showChartTooltip",i);this._toggleChartTooltipVisibility(i);return this;};v.prototype._toggleChartTooltipVisibility=function(i){var j=this.getAggregation("_chart");if(j){this._setChartTooltipVisiblity(j,i);}else if(this.oChartPromise){this.oChartPromise.then(function(j){this._setChartTooltipVisiblity(j,i);}.bind(this));}};v.prototype._setChartTooltipVisiblity=function(i,j){if(j){if(!this._vizTooltip){this._vizTooltip=new u();}this._vizTooltip.connect(i.getVizUid());}else{if(this._vizTooltip){this._vizTooltip.destroy();}}};v.prototype.getChartTypeLayoutConfig=function(){if(this._aChartTypeLayout){return this._aChartTypeLayout;}var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var j=[{kind:"Dimension",availableRoles:[{key:d.ChartItemRoleType.category,text:i.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY')},{key:d.ChartItemRoleType.series,text:i.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_SERIES')}]},{kind:"Measure",availableRoles:[{key:d.ChartItemRoleType.axis1,text:i.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS1')}]}];this._aChartTypeLayout=[{key:"column",allowedLayoutOptions:[d.ChartItemRoleType.axis1,d.ChartItemRoleType.category,d.ChartItemRoleType.series],templateConfig:j},{key:"bar",allowedLayoutOptions:[d.ChartItemRoleType.axis1,d.ChartItemRoleType.category,d.ChartItemRoleType.series],templateConfig:j},{key:"dual_column",allowedLayoutOptions:[d.ChartItemRoleType.axis1,d.ChartItemRoleType.axis2,d.ChartItemRoleType.category,d.ChartItemRoleType.series],templateConfig:j}];return this._aChartTypeLayout;};v.prototype.getAdaptationUI=function(){var i=this.getChartTypeLayoutConfig().find(function(k){return k.key===this.getChartType();}.bind(this));var j={panelConfig:i};return Promise.resolve(new o(j));};v.prototype.getAllowedRolesForKinds=function(){return[{kind:"Measure",allowedRoles:this._getLayoutOptionsForType("aggregatable")},{kind:"Dimension",allowedRoles:this._getLayoutOptionsForType("groupable")}];};v.prototype.onkeydown=function(E){if(E.isMarked()){return;}if((E.metaKey||E.ctrlKey)&&E.which===K.COMMA){var i=C.byId(this.getId()+"-chart_settings");if(i&&i.getEnabled()&&i.getVisible()){i.firePress();E.setMarked();E.preventDefault();}}};v.prototype.addAction=function(i){if(i.getMetadata().getName()!=="sap.ui.mdc.actiontoolbar.ActionToolbarAction"){i=new A(i.getId()+"-action",{action:i});}return a.prototype.addAggregation.apply(this,["actions",i]);};v.prototype._getLayoutOptionsForType=function(i){var j=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var k={groupable:[{key:d.ChartItemRoleType.category,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY')},{key:d.ChartItemRoleType.category2,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY2')},{key:d.ChartItemRoleType.series,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_SERIES')}],aggregatable:[{key:d.ChartItemRoleType.axis1,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS1')},{key:d.ChartItemRoleType.axis2,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS2')},{key:d.ChartItemRoleType.axis3,text:j.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS3')}]};return k[i];};return v;},true);