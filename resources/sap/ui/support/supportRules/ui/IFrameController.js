/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/Constants"],function(q,M,C,c,a){"use strict";var i=null;var f;var F;var s;function b(u){var e=new window.URI(u);var O=(e.protocol()||window.location.protocol.replace(':',''))+'://'+(e.host()||window.location.host);return O;}function g(){return''+ +new Date();}function o(u){var t=document.createElement("IFRAME");var e=t.style;t.id="sap-ui-supportToolsFrame";t.src=u;e.width="100%";e.height="28px";e.position="absolute";e.left="0";e.bottom="0";e.border="none";e.borderRadius="1px";e.zIndex="1001";e.boxShadow="1px -10px 42px -4px #888";document.body.appendChild(t);setInterval(function(){if(t.parentNode.nodeName!=="BODY"){document.body.appendChild(t);window.communicationWindows.supportTool=t.contentWindow;}},1000);window.communicationWindows.supportTool=t.contentWindow;}function d(u){window.communicationWindows.supportTool=window.open(u,"sapUiSupportTool","width=1024,height=400,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=no");window.communicationWindows.supportTool.window.onload=function(){window.communicationWindows.supportTool.document.title=a.SUPPORT_ASSISTANT_NAME;};}var I=M.extend("sap.ui.support.IFrameController",{constructor:function(){if(!i){M.apply(this,arguments);}else{q.sap.log.warning("Only one support tool allowed");return i;}}});I.prototype._setCommunicationSubscriptions=function(){C.subscribe(c.ENSURE_FRAME_OPENED,function(){if(document.getElementById("sap-ui-supportToolsFrame").style.height==="28px"){this.resizeFrame(true);this.toggleHide();}},this);C.subscribe(c.RESIZE_FRAME,function(p){i.resizeFrame(p.bigger);});};I.prototype.injectFrame=function(e){F=g();s=q.sap.getModulePath("sap.ui.support.supportRules.ui","/overlay.html?sap-ui-xx-formfactor=compact&sap-ui-xx-support-origin="+window.location.protocol+"//"+window.location.host+"&"+"sap-ui-xx-frame-identifier="+F);f=b(s);window.communicationWindows=window.communicationWindows||{};if(e.indexOf("window")>-1){d(s);}else{o(s);this._setCommunicationSubscriptions();}};I.prototype.resizeFrame=function(e){var t=document.getElementById("sap-ui-supportToolsFrame").style;if(e){if(t.height==="50%"){t.height="100%";}else if(t.height==="28px"){t.height="50%";}}else{if(t.height==="100%"){t.height="50%";}else if(t.height==="50%"){t.height="28px";}}};I.prototype.toggleHide=function(h){var t=document.getElementById("sap-ui-supportToolsFrame").style;if(h){this._originalSize={width:t.width,height:t.height};t.width="170px";t.height="28px";}else{if(this._originalSize){t.width=this._originalSize.width;t.height=this._originalSize.height;this._originalSize=null;}}};I.prototype._stop=function(){this._oCssLink.parentNode.removeChild(this._oCssLink);this._oDomRef.parentNode.removeChild(this._oCssLink);this._oCore=null;};I.prototype.getCommunicationInfo=function(){return{origin:f,identifier:F,url:s};};i=new I();return i;},true);
