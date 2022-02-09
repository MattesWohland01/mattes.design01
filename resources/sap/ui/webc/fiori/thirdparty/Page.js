sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/MediaRange","./types/PageBackgroundDesign","./generated/templates/PageTemplate.lit","./generated/themes/Page.css"],function(e,t,n,a,r,o,i){"use strict";function s(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var d=s(e);var g=s(t);var p=s(n);var u=s(a);const l={tag:"ui5-page",managedSlots:true,languageAware:true,properties:{backgroundDesign:{type:String,defaultValue:r.Solid},disableScrolling:{type:Boolean},floatingFooter:{type:Boolean},hideFooter:{type:Boolean},mediaRange:{type:String}},slots:{header:{type:HTMLElement},default:{propertyName:"content",type:HTMLElement},footer:{type:HTMLElement}},events:{}};class h extends d{static get metadata(){return l}static get render(){return g}static get styles(){return i}static get template(){return o}constructor(){super();this._updateMediaRange=this.updateMediaRange.bind(this)}onEnterDOM(){p.register(this,this._updateMediaRange)}onExitDOM(){p.deregister(this,this._updateMediaRange)}updateMediaRange(){this.mediaRange=u.getCurrentRange(u.RANGESETS.RANGE_4STEPS,this.getDomRef().offsetWidth)}get _contentBottom(){return!this.floatingFooter&&!this.hideFooter?"2.75rem":"0"}get _contentPaddingBottom(){return this.floatingFooter&&!this.hideFooter?"3.5rem":"0"}get _contentTop(){return this.header.length?"2.75rem":"0rem"}get styles(){return{content:{"padding-bottom":this.footer.length&&this._contentPaddingBottom,bottom:this.footer.length&&this._contentBottom,top:this._contentTop},footer:{}}}}h.define();return h});