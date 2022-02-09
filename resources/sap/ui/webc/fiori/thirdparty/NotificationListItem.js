sap.ui.define(["sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/main/thirdparty/types/Priority","sap/ui/webc/main/thirdparty/Button","sap/ui/webc/main/thirdparty/BusyIndicator","sap/ui/webc/main/thirdparty/Link","sap/ui/webc/main/thirdparty/Icon","sap/ui/webc/main/thirdparty/Popover","sap/ui/webc/main/thirdparty/types/WrappingType","./NotificationListItemBase","./generated/i18n/i18n-defaults","./generated/templates/NotificationListItemTemplate.lit","./generated/themes/NotificationListItem.css"],function(e,t,i,s,r,n,o,h,a,u,l,c,T,p,d){"use strict";function I(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var f=I(i);var _=I(r);var g=I(n);var w=I(o);var O=I(h);var y=I(a);var M=I(u);var m=I(l);const N=32;const x={tag:"ui5-li-notification",languageAware:true,managedSlots:true,properties:{wrappingType:{type:m,defaultValue:m.None},_showMorePressed:{type:Boolean},_showMore:{type:Boolean}},slots:{avatar:{type:HTMLElement},footnotes:{type:HTMLElement,propertyName:"footnotes",individualSlots:true},default:{propertyName:"description",type:Node}},events:{_press:{}}};class v extends c{constructor(){super();this._titleTextOverflowHeight=0;this._descOverflowHeight=0;this.onResizeBind=this.onResize.bind(this)}static get metadata(){return x}static get styles(){return d}static get template(){return p}static get dependencies(){return[g,y,w,O,M]}static async onDefine(){await t.fetchI18nBundle("@ui5/webcomponents-fiori")}onEnterDOM(){f.register(this,this.onResizeBind)}onExitDOM(){f.deregister(this,this.onResizeBind)}get hasDesc(){return!!this.description.length}get hasFootNotes(){return!!this.footnotes.length}get showMoreText(){if(this._showMorePressed){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_SHOW_LESS)}return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_SHOW_MORE)}get overflowBtnAccessibleName(){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE)}get closeBtnAccessibleName(){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE)}get hideShowMore(){if(this.wrappingType===m.None&&this._showMore){return undefined}return true}get descriptionDOM(){return this.shadowRoot.querySelector(".ui5-nli-description")}get titleTextDOM(){return this.shadowRoot.querySelector(".ui5-nli-title-text")}get titleTextHeight(){return this.titleTextDOM.offsetHeight}get descriptionHeight(){return this.descriptionDOM.offsetHeight}get titleTextOverflows(){const e=this.titleTextDOM;if(!e){return false}if(s.isIE()){return e.scrollHeight>N}return e.offsetHeight<e.scrollHeight}get descriptionOverflows(){const e=this.descriptionDOM;if(!e){return false}if(s.isIE()){return e.scrollHeight>N}return e.offsetHeight<e.scrollHeight}get footerItems(){return this.footnotes.map((e,t,i)=>({slotName:e._individualSlot,showDivider:t!==i.length-1}))}get ariaLabelledBy(){const e=this._id;const t=[];if(this.hasTitleText){t.push(`${e}-title-text`)}if(this.hasDesc){t.push(`${e}-description`)}if(this.hasFootNotes){t.push(`${e}-footer`)}t.push(`${e}-invisibleText`);return t.join(" ")}get priorityText(){if(this.priority===_.High){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT)}if(this.priority===_.Medium){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT)}if(this.priority===_.Low){return this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT)}return""}get accInvisibleText(){const e=this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_TXT);const t=this.read?this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_READ):this.i18nFioriBundle.getText(T.NOTIFICATION_LIST_ITEM_UNREAD);const i=this.priorityText;return`${e} ${t} ${i}`}get classes(){return{content:{"ui5-nli-content--ie":s.isIE()}}}_onclick(e){this.fireItemPress(e)}_onShowMoreClick(e){e.preventDefault();this._showMorePressed=!this._showMorePressed}_onkeydown(t){super._onkeydown(t);if(e.isEnter(t)){this.fireItemPress(t)}}_onkeyup(t){super._onkeyup(t);const i=e.isSpace(t);if(i&&t.isMarked==="link"){this._onShowMoreClick(t);return}if(i){this.fireItemPress(t)}}fireItemPress(e){if(e.isMarked==="button"||e.isMarked==="link"){return}this.fireEvent("_press",{item:this})}onResize(){if(this.wrappingType===m.Normal){this._showMore=false;return}const e=this.titleTextHeight>this._titleTextOverflowHeight;const t=this.hasDesc&&this.descriptionHeight>this._descOverflowHeight;const i=e||t;if(this._showMorePressed&&i){this._showMore=true;return}if(this.titleTextOverflows||this.descriptionOverflows){this._titleTextOverflowHeight=this.titleTextHeight;this._descOverflowHeight=this.hasDesc?this.descriptionHeight:0;this._showMore=true;return}this._showMore=false}}v.define();return v});