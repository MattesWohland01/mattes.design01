/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/ComboBox"],function(e,a,t){"use strict";var l=t.ValueState;var i=e.extend("sap.ui.webc.main.ComboBox",{metadata:{library:"sap.ui.webc.main",tag:"ui5-combobox-ui5",properties:{accessibleName:{type:"string"},accessibleNameRef:{type:"string",defaultValue:""},disabled:{type:"boolean",defaultValue:false},filter:{type:"string",defaultValue:"StartsWithPerTerm"},loading:{type:"boolean",defaultValue:false},placeholder:{type:"string",defaultValue:""},readonly:{type:"boolean",defaultValue:false},required:{type:"boolean",defaultValue:false},value:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:l.None},valueStateMessage:{type:"string",defaultValue:"",mapping:{type:"slot",to:"div"}},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},defaultAggregation:"items",aggregations:{icon:{type:"sap.ui.webc.main.IIcon",multiple:false,slot:"icon"},items:{type:"sap.ui.webc.main.IComboBoxItem",multiple:true}},events:{change:{parameters:{}},input:{parameters:{}},selectionChange:{parameters:{item:{type:"HTMLElement"}}}}}});return i});