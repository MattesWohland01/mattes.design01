/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/debug/PropertyList',['sap/ui/base/DataType','sap/ui/base/EventProvider','sap/ui/core/Element','sap/ui/core/ElementMetadata','sap/base/util/isEmptyObject','sap/base/security/encodeXML','sap/ui/thirdparty/jquery','sap/ui/dom/jquery/rect'],function(D,E,a,b,c,e,q){"use strict";var P=E.extend("sap.ui.debug.PropertyList",{constructor:function(C,w,p){E.apply(this,arguments);this.oWindow=w;this.oParentDomRef=p;this.oCore=C;this.bEmbedded=window.top===w;var l=window.top.document.createElement("link");l.rel="stylesheet";l.href=window.top.sap.ui.require.toUrl("sap/ui/debug/PropertyList.css");window.top.document.head.appendChild(l);this.onchange=P.prototype.onchange.bind(this);p.addEventListener("change",this.onchange);this.onfocus=P.prototype.onfocus.bind(this);p.addEventListener("focusin",this.onfocus);this.onkeydown=P.prototype.onkeydown.bind(this);p.addEventListener("keydown",this.onkeydown);if(!this.bEmbedded){this.onmouseover=P.prototype.onmouseover.bind(this);p.addEventListener("mouseover",this.onmouseover);this.onmouseout=P.prototype.onmouseout.bind(this);p.addEventListener("mouseout",this.onmouseout);}}});P.prototype.exit=function(){this.oParentDomRef.removeEventListener("change",this.onchange);this.oParentDomRef.removeEventListener("focusin",this.onfocus);this.oParentDomRef.removeEventListener("keydown",this.onkeydown);if(!this.bEmbedded){this.oParentDomRef.removeEventListener("mouseover",this.onmouseover);this.oParentDomRef.removeEventListener("mouseout",this.onmouseout);}};P.prototype.update=function(p){var C=this.sControlId=p.getParameter("controlId");this.oParentDomRef.innerHTML="";var o=this.oCore.byId(C);if(!o){this.oParentDomRef.innerHTML="Please select a valid control";return;}var m=o.getMetadata(),h=[];h.push("<span data-sap-ui-quickhelp='"+this._calcHelpId(m)+"'>Type : "+m.getName()+"</span><br >");h.push("Id : "+o.getId()+"<br >");if(!this.bEmbedded){h.push("<div id='sap-ui-quickhelp' class='sapDbgQH'>Help</div>");}h.push("<div class='sapDbgSeparator'>&nbsp;</div>");h.push("<table class='sapDbgPropertyList' cellspacing='1'><tbody>");while(m instanceof b){var s=this.getPropertyLikeSettings(m);if(!c(s)){if(m!==o.getMetadata()){h.push("<tr><td class='sapDbgPLSubheader' colspan=\"2\">BaseType: ");h.push(m.getName());h.push("</td></tr>");}this.renderSettings(h,o,s);}m=m.getParent();}h.push("</tbody></table>");this.oParentDomRef.innerHTML=h.join("");this.mHelpDocs={};};P.prototype.getPropertyLikeSettings=function(m){var s={};Object.values(m.getProperties()).forEach(function(p){s[p.name]=p;});Object.values(m.getAggregations()).forEach(function(A){if(A.multiple===false&&A.altTypes&&A.altTypes.length&&D.getType(A.altTypes[0])!=null){s[A.name]=A;}});return s;};P.prototype.renderSettings=function(h,C,s){Object.values(s).forEach(function(S){var N=S.name,v=S.get(C),t=S.multiple===false?D.getType(S.altTypes[0]):S.getType();h.push("<tr><td>");h.push("<span data-sap-ui-quickhelp='",this._calcHelpId(S._oParent,N),"' >",N,'</span>');h.push("</td><td>");var T="";if(t.getPrimitiveType().getName()==="boolean"){h.push("<input type='checkbox' data-name='"+N+"' ");if(v==true){h.push("checked='checked'");}h.push(">");}else if(t.isEnumType()){var o=t.getEnumValues();h.push("<select data-name='"+N+"'>");for(var n in o){h.push("<option ");if(n===v){h.push(" selected ");}h.push("value='"+e(n)+"'>");h.push(e(n));h.push("</option>");}h.push("</select>");}else{var V='';if(v===null){V="class='sapDbgComplexValue'";v='(null)';}else if(v instanceof a){V="class='sapDbgComplexValue'";if(Array.isArray(v)){v=v.join(", ");}else{v=String(v);}T=' title="This aggregation currently references an Element. You can set a '+t.getName()+' value instead"';}h.push("<input type='text' "+V+" value='"+e(""+v)+"'"+T+" data-name='"+N+"'>");}h.push("</td></tr>");}.bind(this));};P.prototype.onkeydown=function(o){var s=o.target;if(o.keyCode==13&&s.tagName==="INPUT"&&s.type==="text"){this.applyChange(s);}};P.prototype.onchange=function(o){var s=o.target;if(s.tagName==="SELECT"||s.tagName==="INPUT"){this.applyChange(s);}};P.prototype.onfocus=function(o){var s=o.target;if(s.tagName==="INPUT"&&s.dataset.name){if(s.style.color==='#a5a5a5'){s.style.color='';s.value='';}}};P.prototype.applyChange=function(f){var C=this.oCore.byId(this.sControlId),n=f.dataset.name,s=C.getMetadata().getPropertyLikeSetting(n);if(s){var v=f.type==="checkbox"?String(f.checked):f.value,t=s.multiple!=null?D.getType(s.altTypes[0]):s.getType();if(t){var V=t.parseValue(v);if(t.isValid(V)&&V!=="(null)"){s.set(C,V);f.classList.remove("sapDbgComplexValue");}}}};P.prototype.showQuickHelp=function(s){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined;}var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){this.sCurrentHelpId=s.getAttribute("data-sap-ui-quickhelp");var r=q(s).rect();t.style.left=(r.left+40+10)+"px";t.style.top=(r.top-40)+"px";t.style.display='block';t.style.opacity='0.2';if(this.mHelpDocs[this.sCurrentHelpId]){this.updateQuickHelp(this.mHelpDocs[this.sCurrentHelpId],2000);}else{t.innerHTML="<b>Quickhelp</b> for "+this.sCurrentHelpId+" is being retrieved...";this.sCurrentHelpDoc=this.sCurrentHelpId;this.sCurrentHelpDocPart=undefined;if(this.sCurrentHelpId.indexOf('#')>=0){this.sCurrentHelpDoc=this.sCurrentHelpId.substring(0,this.sCurrentHelpId.indexOf('#'));this.sCurrentHelpDocPart=this.sCurrentHelpId.substring(this.sCurrentHelpId.indexOf('#')+1);}var u=this.oWindow.jQuery.sap.getModulePath(this.sCurrentHelpDoc,".control");var d=this;q.ajax({url:u,dataType:'xml',error:function(x,f){d.receiveQuickHelp(undefined);},success:function(f){d.receiveQuickHelp(f);}});this.oQuickHelpTimer=setTimeout(function(){d.hideQuickHelp();},2000);}}};P.prototype.receiveQuickHelp=function(d){if(d){var C=d.getElementsByTagName("control")[0];if(C){var g=function(x,N){var r=[];var j=x.firstChild;while(j){if(N===j.nodeName){r.push(j);}j=j.nextSibling;}return r;};var n=g(C,"name");var N='';if(n[0]){N=n[0].text||n[0].textContent;}var f=g(C,"documentation");if(f[0]){if(N&&f[0]){var h=[];h.push("<div class='sapDbgQHClassTitle'>",N.replace('/','.'),"</div>");h.push("<div class='sapDbgQHDocPadding'>",f[0].text||f[0].textContent,"</div>");this.mHelpDocs[this.sCurrentHelpDoc]=h.join("");}}var p=g(C,"properties");if(p[0]){p=g(p[0],"property");}for(var i=0,l=p.length;i<l;i++){var o=p[i];var N=o.getAttribute("name");var t=o.getAttribute("type")||"string";var s=o.getAttribute("defaultValue")||"empty/undefined";var f=g(o,"documentation");if(N&&f[0]){var h=[];h.push("<div class='sapDbgQHSettingDoc'>",N,"</div>");h.push("<div class='sapDbgQHDocPadding'><i><strong>Type</strong></i>: ",t,"</div>");h.push("<div class='sapDbgQHDocPadding'>",f[0].text||f[0].textContent,"</div>");h.push("<div class='sapDbgQHDocPadding'><i><strong>Default Value</strong></i>: ",s,"</div>");this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]=h.join("");}}var p=g(C,"aggregations");if(p[0]){p=g(p[0],"aggregation");}for(var i=0,l=p.length;i<l;i++){var o=p[i];var N=o.getAttribute("name");var t=o.getAttribute("type")||"sap.ui.core/Control";var s=o.getAttribute("defaultValue")||"empty/undefined";var f=g(o,"documentation");if(N&&f[0]&&!this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]){var h=[];h.push("<div class='sapDbgQHSettingTitle'>",N,"</div>");h.push("<div class='sapDbgQHDocPadding'><i><strong>Type</strong></i>: ",t,"</div>");h.push("<div class='sapDbgQHDocPadding'>",f[0].text||f[0].textContent,"</div>");h.push("<div class='sapDbgQHDocPadding'><i><strong>Default Value</strong></i>: ",s,"</div>");this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]=h.join("");}}}if(this.mHelpDocs[this.sCurrentHelpId]){this.updateQuickHelp(this.mHelpDocs[this.sCurrentHelpId],2000);}else{this.updateQuickHelp(undefined,0);}}else{this.updateQuickHelp(undefined,0);}};P.prototype.updateQuickHelp=function(n,t){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined;}var T=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(T){if(!n){T.innerHTML="<i>No quick help...</i>";T.style.display='none';}else{T.innerHTML=n;this.oQuickHelpTimer=setTimeout(function(){this.hideQuickHelp();}.bind(this),t);}}};P.prototype.hideQuickHelp=function(){var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){t.style.display='none';}this.bMovedOverTooltip=false;};P.prototype._calcHelpId=function(m,n){var h=m.getName();if(n){h=h+"#"+n;}return h;};P.prototype._isChildOfQuickHelp=function(d){while(d){if(d.id==="sap-ui-quickhelp"){return true;}d=d.parentNode;}return false;};P.prototype.onmouseover=function(o){var s=o.target;if(this._isChildOfQuickHelp(s)){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined;}this.bMovedOverTooltip=true;var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){t.style.opacity='';}}else if(s.getAttribute("data-sap-ui-quickhelp")){this.showQuickHelp(s);}};P.prototype.onmouseout=function(o){var s=o.target;if(this._isChildOfQuickHelp(s)){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined;}this.bMovedOverTooltip=false;this.oQuickHelpTimer=setTimeout(function(){this.hideQuickHelp();}.bind(this),50);}else if(s.getAttribute("data-sap-ui-quickhelp")){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined;}if(!this.bMovedOverTooltip){this.oQuickHelpTimer=setTimeout(function(){this.hideQuickHelp();}.bind(this),800);}}};return P;});