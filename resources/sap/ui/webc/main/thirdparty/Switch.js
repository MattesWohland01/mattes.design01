sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/icons/accept","sap/ui/webc/common/thirdparty/icons/decline","./Icon","./types/SwitchDesign","./generated/i18n/i18n-defaults","./generated/templates/SwitchTemplate.lit","./generated/themes/Switch.css"],function(e,t,i,s,n,a,c,r,h,d,u,l){"use strict";function o(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var g=o(e);var p=o(t);const f={tag:"ui5-switch",languageAware:true,properties:{design:{type:h,defaultValue:h.Textual},checked:{type:Boolean},disabled:{type:Boolean},textOn:{type:String},textOff:{type:String}},events:{change:{}}};class b extends g{static get metadata(){return f}static get styles(){return l}static get render(){return p}static get template(){return u}constructor(){super();this.i18nBundle=n.getI18nBundle("@ui5/webcomponents")}_onclick(e){this.toggle()}_onkeydown(e){if(i.isSpace(e)){e.preventDefault()}if(i.isEnter(e)){this.toggle()}}_onkeyup(e){if(i.isSpace(e)){this.toggle()}}toggle(){if(!this.disabled){this.checked=!this.checked;this.fireEvent("change");this.fireEvent("value-changed")}}get graphical(){return this.design===h.Graphical}get _textOn(){return this.graphical?"":this.textOn}get _textOff(){return this.graphical?"":this.textOff}get tabIndex(){return this.disabled?undefined:"0"}get classes(){const e=this.graphical||this.textOn||this.textOff;return{main:{"ui5-switch-desktop":s.isDesktop(),"ui5-switch--disabled":this.disabled,"ui5-switch--checked":this.checked,"ui5-switch--semantic":this.graphical,"ui5-switch--no-label":!e}}}get ariaDisabled(){return this.disabled?"true":undefined}get accessibilityOnText(){return this._textOn||this.i18nBundle.getText(d.SWITCH_ON)}get accessibilityOffText(){return this._textOff||this.i18nBundle.getText(d.SWITCH_OFF)}get hiddenText(){return this.checked?this.accessibilityOnText:this.accessibilityOffText}static get dependencies(){return[r]}static async onDefine(){await n.fetchI18nBundle("@ui5/webcomponents")}}b.define();return b});