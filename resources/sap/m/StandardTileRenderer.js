/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./TileRenderer','sap/ui/core/ValueStateSupport','sap/ui/core/Renderer','sap/m/library','sap/ui/core/library'],function(T,V,R,l,c){"use strict";var a=c.ValueState;var S=l.StandardTileType;var b=R.extend(T);b.apiVersion=2;b._renderContent=function(r,t){var i=t.getInfoState();r.openStart("div");r.class("sapMStdTileTopRow");r.openEnd();if(t.getIcon()){r.openStart("div");r.class("sapMStdTileIconDiv");switch(t.getType()){case S.Monitor:r.class("sapMStdIconMonitor");break;case S.Create:r.class("sapMStdIconCreate");break;}r.openEnd();r.renderControl(t._getImage());r.close("div");}if(t.getNumber()){r.openStart("div");r.class("sapMStdTileNumDiv");r.openEnd();r.openStart("div",t.getId()+"-number");var n=t.getNumber().length;if(n<5){r.class("sapMStdTileNum");}else if(n<8){r.class("sapMStdTileNumM");}else{r.class("sapMStdTileNumS");}r.openEnd();r.text(t.getNumber());r.close("div");if(t.getNumberUnit()){r.openStart("div",t.getId()+"-numberUnit");r.class("sapMStdTileNumUnit");r.openEnd();r.text(t.getNumberUnit());r.close("div");}r.close("div");}r.close("div");r.openStart("div");r.class("sapMStdTileBottomRow");if(t.getType()===S.Monitor){r.class("sapMStdTileMonitorType");}r.openEnd();r.openStart("div",t.getId()+"-title");r.class("sapMStdTileTitle");r.openEnd();if(t.getTitle()){r.text(t.getTitle());}r.close("div");if(t.getInfo()){r.openStart("div",t.getId()+"-info");r.class("sapMStdTileInfo");r.class("sapMStdTileInfo"+i);if(i!=a.None){r.accessibilityState(t,{ariaDescribedBy:{value:t.getId()+"-sapSRH",append:true}});}r.openEnd();if(t.getInfo()){r.text(t.getInfo());}r.close("div");}if(i!=a.None){r.openStart("span",t.getId()+"-sapSRH");r.class("sapUiInvisibleText");r.accessibilityState({hidden:false});r.openEnd();r.text(V.getAdditionalText(i));r.close("span");}r.close("div");};return b;},true);