/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./AccButton","./IconTabFilterExpandButtonBadge","sap/ui/core/library","sap/ui/core/Core","sap/ui/core/Item","sap/ui/core/Renderer","sap/ui/core/IconPool",'sap/ui/core/InvisibleMessage','sap/ui/Device',"sap/m/BadgeCustomData","sap/m/Button","sap/m/ResponsivePopover","sap/m/IconTabBarSelectList","sap/m/BadgeEnabler"],function(l,A,I,c,C,a,R,b,d,D,B,e,f,g,h){"use strict";var T=c.TextAlign;var j=c.TextDirection;var k=l.ButtonType;var P=l.PlacementType;var m=l.ImageHelper;var n=l.IconTabFilterDesign;var o=l.BadgeStyle;var p=l.BadgeState;var q=c.IconColor;var r=c.aria.HasPopup;var s=3000;var t=c.InvisibleMessageMode;var u=-8;var v=a.extend("sap.m.IconTabFilter",{metadata:{interfaces:["sap.m.IconTab","sap.ui.core.PopupInterface","sap.m.IBadge"],library:"sap.m",designtime:"sap/m/designtime/IconTabFilter.designtime",properties:{count:{type:"string",group:"Data",defaultValue:''},showAll:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:''},iconColor:{type:"sap.ui.core.IconColor",group:"Appearance",defaultValue:q.Default},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},design:{type:"sap.m.IconTabFilterDesign",group:"Appearance",defaultValue:n.Vertical}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},items:{type:"sap.m.IconTab",multiple:true,singularName:"item"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButtonBadge:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});h.call(v.prototype);var w=C.getLibraryResourceBundle("sap.m");v._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault','sapMITBFilterNeutral'];v.prototype._getImageControl=function(i,x,y){var z={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};if(z.src){this._oImageControl=m.getImageControl(this.getId()+"-icon",this._oImageControl,x,z,i,y);}else if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null;}return this._oImageControl;};v.prototype.init=function(){this._oDragEventDelegate={onlongdragover:this._handleOnLongDragOver,ondragover:this._handleOnDragOver,ondragleave:this._handleOnDragLeave,ondrop:this._handleOnDrop};this.initBadgeEnablement({style:o.Attention,selector:{selector:".sapMITBBadgeHolder"}});this._oCloneInList=null;this.setAggregation("_expandButtonBadge",new I());};v.prototype.exit=function(E){if(this._oImageControl){this._oImageControl.destroy();}if(a.prototype.exit){a.prototype.exit.call(this,E);}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}if(this._oExpandButton){this._oExpandButton.removeEventDelegate(this._oDragEventDelegate);this._oExpandButton.destroy();this._oExpandButton=null;}this.removeEventDelegate(this._oDragEventDelegate);this._oDragEventDelegate=null;if(this._iHideBadgeTimeout){clearTimeout(this._iHideBadgeTimeout);}};v.prototype.invalidate=function(){var i=this.getParent(),x,O;if(!i){return;}x=i.getParent();if(!(x instanceof sap.m.IconTabBar)){i.invalidate();return;}O=x.getParent();if(O instanceof sap.m.ObjectHeader){O.invalidate();}else{x.invalidate();}};v.prototype.setProperty=function(i,V,S){switch(i){case'textDirection':case'text':case'count':case'showAll':case'icon':case'iconColor':case'iconDensityAware':case'design':if(this.getProperty(i)===V){return this;}a.prototype.setProperty.call(this,i,V,true);if(!S){var x=this.getParent();if(x instanceof sap.m.IconTabHeader){x.invalidate();}}break;default:a.prototype.setProperty.apply(this,arguments);break;}return this;};v.prototype._getNonEmptyKey=function(){var K=this.getKey();if(K){return K;}return this.getId();};v.prototype._getRealTab=function(){return this._oRealItem||this;};v.prototype._getRootTab=function(){var i=this._getRealTab(),x=i.getParent();while(x&&x.isA("sap.m.IconTabFilter")){i=x;x=x.getParent();}return i;};v.prototype._getNestedLevel=function(){var i=this._getRealTab().getParent(),L;for(L=1;i&&i.isA("sap.m.IconTabFilter");L++){i=i.getParent();}return L;};v.prototype.render=function(i,V,x){if(!this.getVisible()){return;}var y=this.getParent(),z=y.getParent();if(y.getEnableTabReordering()){this._prepareDragEventDelegate();}var H=y._isInsideIconTabBar(),E={role:"tab"},F=this.getId(),G=this.getCount(),J=this.getText(),K=this.getIcon(),L=this.getIconColor(),M=this.getEnabled(),S=this._shouldReadIconColor(),N=this.getDesign()===n.Horizontal,O=y._bTextOnly,Q=y._bInLine||y.isInlineMode(),U=this.getShowAll(),W=this.getTextDirection();if(this._isOverflow()){E.role="button";}if(H){E.controls=z.getId()+"-content";}if(this.getItems().length){E.roledescription=w.getText("ICONTABFILTER_SPLIT_TAB");}if(J.length||G!==""||K){var X=[];if(G!==""&&!Q){X.push(F+"-count");}if(J.length){X.push(F+"-text");}if(K){X.push(F+"-icon");}if(S){X.push(F+"-iconColor");}E.labelledby=X.join(" ");}if(V!==undefined&&x!==undefined){Object.assign(E,{posinset:V+1,setsize:x});}i.openStart("div",this).accessibilityState(E).class("sapMITBItem");if(!G){i.class("sapMITBItemNoCount");}if(N){i.class("sapMITBHorizontal");}else{i.class("sapMITBVertical");}if(U){i.class("sapMITBAll");}else{i.class("sapMITBFilter");}if(!U&&M){i.class("sapMITBFilter"+L);}if(y._isUnselectable(this)){i.class("sapMITHUnselectable");}if(this.getItems().length>0){i.class("sapMITBFilterWithItems");}if(!M){i.class("sapMITBDisabled").attr("aria-disabled",true);}if(!this._isOverflow()){i.attr("aria-selected",false);}var Y=this.getTooltip_AsString();if(Y){i.attr("title",Y);}if(this._isOverflow()||this.getItems().length){i.attr("aria-haspopup","menu");}i.openEnd();if(S){this._renderIconColorDescription(i);}i.openStart("div").class("sapMITBFilterWrapper").openEnd();if(!Q){i.openStart("div",F+"-tab").class("sapMITBTab").openEnd();if(!U||!K){var Z=["sapMITBFilterIcon","sapMITBBadgeHolder"];if(M){Z.push("sapMITBFilter"+L);}i.renderControl(this._getImageControl(Z,y,v._aAllIconColors));}if(!U&&!K&&!O){i.openStart("span").class("sapMITBFilterNoIcon").openEnd().close("span");}if(N&&!U){i.close("div");i.openStart("div").class("sapMITBHorizontalWrapper").openEnd();}i.openStart("span",F+"-count").class("sapMITBCount");if(U||(!K&&!J.length)){i.class("sapMITBBadgeHolder");}i.openEnd();if(G===""&&N){i.unsafeHtml("&nbsp;");}else{i.text(G);}i.close("span");if(!N){i.close("div");}}if(J.length){i.openStart("div",F+"-text").class("sapMITBText");if(!K&&!U){i.class("sapMITBBadgeHolder");}if(H&&z.getUpperCase()){i.class("sapMITBTextUpperCase");}i.openEnd();if(Q&&K){this._renderIcon(i);}i.openStart("span").class("sapMITHTextContent").attr("dir",W!==j.Inherit?W.toLowerCase():"auto");i.openEnd().text(y._getDisplayText(this)).close("span");if(this._isOverflow()||this.getItems().length&&y._isUnselectable(this)){i.openStart("span",this.getId()+"-expandButton").class("sapMITHShowSubItemsIcon").openEnd();i.icon(b.getIconURI("slim-arrow-down"),null,{"title":null,"aria-hidden":true});i.close("span");}i.close("div");}if(!Q&&N){i.close("div");}i.openStart("div").class("sapMITBContentArrow").openEnd().close("div");i.close("div");if(this.getItems().length&&!y._isUnselectable(this)){i.openStart("span").accessibilityState({role:"separator"}).openEnd().close("span");i.renderControl(this._getExpandButton());}i.renderControl(this.getAggregation("_expandButtonBadge"));if(this.getItems().length){this._updateExpandButtonBadge();}i.close("div");};v.prototype.renderInSelectList=function(i,S,x,y,z){if(!this.getVisible()){return;}var E=true,F=S._bIconOnly,G=S._oIconTabHeader,H=this.getIconColor(),J=this.getEnabled();if(G){E=G._bTextOnly;}i.openStart("li",this).class("sapMITBSelectItem").attr("tabindex","-1").attr("role","menuitem");if(z){i.style("padding-left",z+"rem");}if(x!==undefined&&y!==undefined){i.attr("aria-posinset",x+1);i.attr("aria-setsize",y);i.attr("aria-level",this._getNestedLevel());}var K=this.getTooltip_AsString();if(K){i.attr("title",K);}if(G._isUnselectable(this)){i.class("sapMITHUnselectable");}if(!J){i.class("sapMITBDisabled").attr("aria-disabled",true);}if(S.getSelectedItem()==this){i.class("sapMITBSelectItemSelected");i.attr("aria-selected",true);}if(J){i.class("sapMITBFilter"+H);}var L=this.getId(),M=this._shouldReadIconColor(),N=[];if(!F){N.push(L+"-text");}if(!E&&this.getIcon()){N.push(L+"-icon");}if(M){N.push(L+"-iconColor");}i.accessibilityState({labelledby:N.join(" ")}).openEnd();if(M){this._renderIconColorDescription(i);}if(!E){this._renderIcon(i,F);}if(!F){this._renderText(i);}i.close("li");};v.prototype._onAfterParentRendering=function(){this._renderBadge();d.getInstance();};v.prototype._renderIcon=function(i,x){var y=this.getIcon();if(y){var z=b.getIconInfo(y),E=["sapMITBSelectItemIcon"];if(z&&!z.suppressMirroring){E.push("sapUiIconMirrorInRTL");}if(x){E.push("sapMITBBadgeHolder");}if(this._getIconTabHeader().isInlineMode()){E.push("sapMITBInlineIcon");}i.icon(y,E,{id:this.getId()+"-icon","aria-hidden":true});}else{i.openStart("span").class("sapUiIcon").openEnd().close("span");}};v.prototype._renderIconColorDescription=function(i){i.openStart("div",this.getId()+"-iconColor").style("display","none").openEnd().text(w.getText("ICONTABBAR_ICONCOLOR_"+this.getIconColor().toUpperCase())).close("div");};v.prototype._renderText=function(i){var x=this.getText(),y=this.getCount(),z=C.getConfiguration().getRTL(),E=this.getTextDirection();i.openStart("span",this.getId()+"-text").attr("dir",E!==j.Inherit?E.toLowerCase():"auto").class("sapMText").class("sapMTextNoWrap").class("sapMITBText").class("sapMITBBadgeHolder");var F=R.getTextAlign(T.Begin,E);if(F){i.style("text-align",F);}if(y){if(z){x='('+y+') '+x;}else{x+=' ('+y+')';}}i.openEnd().text(x).close("span");};v.prototype._getSelectList=function(){if(!this._oSelectList){this._oSelectList=new g({selectionChange:function(E){var i=E.getParameter("selectedItem");this._oIconTabHeader.setSelectedItem(i._getRealTab());this._oTabFilter._closePopover();}});this._oSelectList._oIconTabHeader=this.getParent();this._oSelectList._oTabFilter=this;this._oSelectList._bIsOverflow=this._isOverflow();}return this._oSelectList;};v.prototype._prepareDragEventDelegate=function(){if(this.getEnabled()){this.addEventDelegate(this._oDragEventDelegate,this);}else{this.removeEventDelegate(this._oDragEventDelegate);}};v.prototype._updateTabCountText=function(){if(!this._isOverflow()){return;}var i=this._getIconTabHeader()._getItemsForOverflow(this._bIsStartOverflow).filter(function(x){return x.isA("sap.m.IconTabFilter");}).length;this.setText("+"+i);};v.prototype._getExpandButton=function(){this._oExpandButton=this.getAggregation("_expandButton");if(!this._oExpandButton){this._oExpandButton=new A(this.getId()+"-expandButton",{type:k.Transparent,icon:b.getIconURI("slim-arrow-down"),tooltip:w.getText("ICONTABHEADER_OVERFLOW_MORE"),tabIndex:"-1",ariaHasPopup:r.Menu,press:this._expandButtonPress.bind(this)}).addStyleClass("sapMITBFilterExpandBtn");this.setAggregation("_expandButton",this._oExpandButton);}return this._oExpandButton;};v.prototype._updateExpandButtonBadge=function(){var E=this.getAggregation("_expandButtonBadge"),H=E.getBadgeCustomData()&&E.getBadgeCustomData().getVisible(),i=this._hasChildWithBadge();if(i&&!H){E.addCustomData(new B({visible:true}));}else if(!i&&H){E.getBadgeCustomData().setVisible(false);}};v.prototype._hasChildWithBadge=function(){var i=this._isOverflow()?this._getIconTabHeader()._getItemsForOverflow(this._bIsStartOverflow):this._getAllSubItems();return i.some(function(x){return x.isA("sap.m.IBadge")&&x.getBadgeCustomData()&&x.getBadgeCustomData().getVisible();});};v.prototype._expandButtonPress=function(){if(!this.getEnabled()){return;}this.$().trigger("focus");if(!this._oPopover){this._oPopover=new f({showArrow:false,showHeader:false,offsetY:0,offsetX:0,placement:P.VerticalPreferredBottom}).addStyleClass("sapMITBFilterPopover");this._oPopover.attachBeforeClose(function(){this._getSelectList().destroyItems();},this);if(D.system.phone){this._oPopover._oControl.addButton(this._createPopoverCloseButton());}if(this._getIconTabHeader()._isInsideToolHeader()){this._oPopover.addStyleClass("sapMITBFilterPopoverInToolHeader");this._oPopover.setOffsetY(u);if(!D.system.phone){this._oPopover.addEventDelegate({onAfterRendering:function(E){this._oPopover.getDomRef().style.minWidth=this.$().outerWidth(true)+"px";}.bind(this)});}}this.addDependent(this._oPopover);this._oPopover._oControl._adaptPositionParams=function(){var i=this.$().parents().hasClass("sapUiSizeCompact");this._arrowOffset=0;if(i){this._offsets=["0 0","0 0","0 4","0 0"];}else{this._offsets=["0 0","0 0","0 5","0 0"];}this._atPositions=["end top","end top","end bottom","begin top"];this._myPositions=["end bottom","begin top","end top","end top"];};}var H=this._setSelectListItems();var S=this._getSelectList();this._oPopover.removeAllContent();if(this.getItems().length||this._isOverflow()){this._oPopover.addContent(S);this._oPopover.setInitialFocus(H?S.getSelectedItem():S.getVisibleTabFilters()[0]);this._oPopover.openBy(this);}};v.prototype._getAllSubItems=function(){var i=[];this._getRealTab().getItems().forEach(function(x){if(x.isA("sap.m.IconTabFilter")){i=i.concat(x,x._getAllSubItems());}else{i=i.concat(x);}});return i;};v.prototype._getAllSubFilters=function(){return this._getAllSubItems().filter(function(i){return i.isA("sap.m.IconTabFilter");});};v.prototype._getAllSubFiltersDomRefs=function(){return this._getAllSubFilters().filter(function(S){return Boolean(S._getRealTab().getDomRef());}).map(function(S){return S._getRealTab().getDomRef();});};v.prototype._getFirstAvailableSubFilter=function(){var x=this._getAllSubFilters();for(var i=0;i<x.length;i++){var y=x[i];if(y.getContent().length&&y.getVisible()){return y;}}return this;};v.prototype._isParentOf=function(x){var y=this._getAllSubFilters();for(var i=0;i<y.length;i++){if(y[i]._getRealTab()===x){return true;}}return false;};v.prototype._createPopoverCloseButton=function(){return new e({text:w.getText("SELECT_CANCEL_BUTTON"),press:this._closePopover.bind(this)});};v.prototype._closePopover=function(){if(this._oPopover){this._oPopover.close();this._oPopover.removeAllContent();}if(this._isOverflow()&&this.getParent().oSelectedItem){(this.getParent()._oSelectedRootItem||this.getParent().oSelectedItem._getRootTab()).$().trigger("focus");}};v.prototype._handleOnDragOver=function(E){if(this._isDropPossible(E)){this.getDomRef().classList.add("sapMITHDragOver");E.preventDefault();}};v.prototype._handleOnLongDragOver=function(E){if(this._isDropPossible(E)){if(this._oPopover&&this._oPopover.isOpen()){return;}this._expandButtonPress();}};v.prototype._handleOnDrop=function(){this.getDomRef().classList.remove("sapMITHDragOver");};v.prototype._handleOnDragLeave=function(){this.getDomRef().classList.remove("sapMITHDragOver");};v.prototype._isDropPossible=function(E){var i=this._getIconTabHeader(),x=E.dragSession.getDragControl()._getRealTab(),S=i.oSelectedItem;if(i!==x._getIconTabHeader()){return false;}if(x===this||x._isParentOf(this)){return false;}if(!this._isOverflow()&&!i.getMaxNestingLevel()){return false;}if(this._isOverflow()&&S&&(S===x||S._getRootTab()===x)){return false;}return true;};v.prototype._setSelectListItems=function(){var x=this.getParent(),S=this._getSelectList(),y=this._getAllSubItems(),z=x.oSelectedItem,H=false,E,L,F,i,G;if(this._isOverflow()){y=x._getItemsForOverflow(this._bIsStartOverflow);}S.destroyItems();S.setSelectedItem(null);for(i=0;i<y.length;i++){E=y[i];L=E.clone(undefined,undefined,{cloneChildren:false,cloneBindings:true});E._oCloneInList=L;F=E.getCustomData();for(G=0;G<F.length;G++){L.addCustomData(F[G].clone());}L._oRealItem=E;S.addItem(L);if(E.isA("sap.m.IconTabSeparator")){continue;}if(L._getRealTab()===z){S.setSelectedItem(L);H=true;continue;}if(L._getRealTab()._isParentOf(z)){S.setSelectedItem(z._getRealTab());H=true;}}return H;};v.prototype._isOverflow=function(){return this._bIsOverflow||this._bIsStartOverflow;};v.prototype._getIconTabHeader=function(){return this._getRootTab().getParent();};v.prototype.onsapdown=function(E){if(!this.getEnabled()){return;}if(this._isOverflow()||((this._getNestedLevel()===1&&this._getRealTab()===this)&&this._getRealTab().getItems().length!==0)){E.stopImmediatePropagation();this._expandButtonPress();}};v.prototype._startBadgeHiding=function(){if(this._iHideBadgeTimeout){return;}this._iHideBadgeTimeout=setTimeout(this._hideBadge.bind(this),s);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge();}};v.prototype._hideBadge=function(){var i=this.getBadgeCustomData();if(!i){return;}i.setVisible(false);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge();}if(this._oCloneInList&&!this._oCloneInList.bIsDestroyed&&this._oCloneInList.getBadgeCustomData()){this._oCloneInList.getBadgeCustomData().setVisible(false);this._oCloneInList=null;}if(this._isInOverflow()){this._getIconTabHeader()._getOverflow()._updateExpandButtonBadge();}if(this._isInStartOverflow()){this._getIconTabHeader()._getStartOverflow()._updateExpandButtonBadge();}this._iHideBadgeTimeout=null;};v.prototype._isInOverflow=function(){return!this._bIsOverflow&&this._getIconTabHeader()._getItemsInStrip().indexOf(this._getRealTab())===-1;};v.prototype._isInStartOverflow=function(){return!this._bIsStartOverflow&&this._getIconTabHeader()._getItemsInStrip().indexOf(this._getRealTab())===-1;};v.prototype.onBadgeUpdate=function(V,S,i){var x=this.getDomRef(),y=this._getIconTabHeader(),z,E,F,G,O,H,J,K;if(!y){return;}if(x){F=x.getAttribute("aria-labelledby")||"";switch(S){case p.Appear:F=i+" "+F;break;case p.Disappear:F=F.replace(i,"").trim();break;}x.setAttribute("aria-labelledby",F);}if(!y._isRendered()){return;}z=this._getRootTab();if(z._isInOverflow()){O=this._getIconTabHeader()._getOverflow();O._updateExpandButtonBadge();}if(z._isInStartOverflow()){H=this._getIconTabHeader()._getStartOverflow();H._updateExpandButtonBadge();}else if(z!==this){z._updateExpandButtonBadge();}if(S!==p.Appear){return;}this._enableMotion();if((this._isInOverflow()||this._isInStartOverflow())&&this._oCloneInList){this._oCloneInList.addCustomData(new B());}E=d.getInstance();G=this.getText();if(z._isInOverflow()){J="ICONTABFILTER_SUB_ITEM_BADGE";K=[G,O.getText()];}if(z._isInStartOverflow()){J="ICONTABFILTER_SUB_ITEM_BADGE";K=[G,H.getText()];}else{if(z!==this){J="ICONTABFILTER_SUB_ITEM_BADGE";K=[G,z.getText()];}else{J="ICONTABFILTER_BADGE_MSG";K=G;}}E.announce(w.getText(J,K),t.Assertive);};v.prototype.getAriaLabelBadgeText=function(){return w.getText("ICONTABFILTER_BADGE");};v.prototype._enableMotion=function(){if(this._getRealTab()._isInOverflow()||this._getRealTab()._isInStartOverflow()){if(this._oCloneInList&&this._oCloneInList.getDomRef()){this._oCloneInList.getDomRef().classList.add("sapMITBFilterBadgeMotion");}}else if(this.getDomRef()){this.getDomRef().classList.add("sapMITBFilterBadgeMotion");}};v.prototype._shouldReadIconColor=function(){var i=this.getIconColor();return this.getEnabled()&&(i==="Positive"||i==="Critical"||i==="Negative"||i==="Neutral");};return v;});