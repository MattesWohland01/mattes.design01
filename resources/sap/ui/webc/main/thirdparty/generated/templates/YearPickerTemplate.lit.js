sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,s,t)=>e.html`<div class="ui5-yp-root" role="grid" aria-readonly="false" aria-multiselectable="false" @keydown=${i._onkeydown} @keyup=${i._onkeyup} @click=${i._selectYear} @focusin=${i._onfocusin}>${e.repeat(i._years,(e,i)=>e._id||i,(e,i)=>a(e))}</div>`;const a=(i,a,t,d,n)=>e.html`<div class="ui5-yp-interval-container">${e.repeat(i,(e,i)=>e._id||i,(e,i)=>s(e))}</div>`;const s=(i,a,s,t,d)=>e.html`<div data-sap-timestamp="${e.ifDefined(i.timestamp)}" tabindex="${e.ifDefined(i._tabIndex)}" ?data-sap-focus-ref="${i.focusRef}" class="${e.ifDefined(i.classes)}" role="gridcell" aria-selected="${e.ifDefined(i.ariaSelected)}">${e.ifDefined(i.year)}</div>`;return i});