/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Page"],function(e,t){"use strict";var a=t.PageBackgroundDesign;var o=e.extend("sap.ui.webc.fiori.Page",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-page-ui5",properties:{backgroundDesign:{type:"sap.ui.webc.fiori.PageBackgroundDesign",defaultValue:a.Solid},disableScrolling:{type:"boolean",defaultValue:false},floatingFooter:{type:"boolean",defaultValue:true},height:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},hideFooter:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},footer:{type:"sap.ui.core.Control",multiple:true,slot:"footer"},header:{type:"sap.ui.core.Control",multiple:true,slot:"header"}}}});return o});