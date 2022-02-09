/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(g,f){"use strict";if(typeof define==="function"&&define.amd){define(["URI","sinon"],function(U,s){return f(U,s);});}else{g.RequestRecorder=f(g.URI,g.sinon);}}(this,function(U,s){"use strict";var m="RequestRecorder";function r(u){return new U(u).absoluteTo(new U(document.baseURI).search("")).toString();}function _(){}_.prototype={bIsRecording:false,bIsPaused:false,aEntriesUrlFilter:[],aEntriesUrlReplace:[],fnCustomGroupNameCallback:null,sDefaultFilename:"Record",aRequests:[],mXhrNativeFunctions:{},sFilename:"",bIsDownloadDisabled:false,bPromptForDownloadFilename:false,mHarFileContent:null,sDefaultMajorHarVersion:1,sDefaultCustomGroup:"defaultCustomGroup",oSinonXhr:null,mDelaySettings:null,oLog:{info:function(t){console.info(t);},debug:function(t){console.debug(t);},warning:function(t){console.warn(t);},error:function(t){console.error(t);}},preciseDateNow:function(){return window.performance.timing.navigationStart+window.performance.now();},loadFile:function(l){var h=null;var o=new XMLHttpRequest();o.open("GET",l,false);o.addEventListener("load",function(){if(this.status===200){h=JSON.parse(this.responseText);}});o.send();try{h=JSON.parse(o.responseText);}catch(e){throw new Error("Har file could not be loaded.");}if(h&&(!h.log||!h.log.version||parseInt(h.log.version,10)!=this.sDefaultMajorHarVersion)){this.oLog.error(m+" - Incompatible version. Please provide .har file with version "+this.sDefaultMajorHarVersion+".x");}return h;},prepareEntries:function(h){var e;if(!h.log.entries||!h.log.entries.length){this.oLog.info(m+" - Empty entries array or the provided har file is empty.");e=[];}else{e=h.log.entries;for(var i=0;i<e.length;i++){e[i]._timestampStarted=new Date(e[i].startedDateTime).getTime();e[i]._timestampFinished=e[i]._timestampStarted+e[i].time;e[i]._initialOrder=i;}this.prepareEntriesOrder(e,"_timestampFinished");this.prepareEntriesOrder(e,"_timestampStarted");h._groupedEntries={};for(var j=0;j<e.length;j++){this.addEntryToMapping(h,e,j);}}h.log.entries=e;return h;},prepareEntriesOrder:function(e,f){e.sort(function(a,B){var i=a[f]-B[f];if(i===0){return a._initialOrder-B._initialOrder;}else{return i;}});},addEntryToMapping:function(h,e,i){var u=this.createUrlGroup(e[i].request.method,e[i].request.url);var c=e[i]._customGroupName?e[i]._customGroupName:this.sDefaultCustomGroup;if(!h._groupedEntries[c]){h._groupedEntries[c]={};}if(!h._groupedEntries[c][u]){h._groupedEntries[c][u]=[];}h._groupedEntries[c][u].push(i);},createUrlGroup:function(M,u){var a=new U(u).resource();a=this.replaceEntriesUrlByRegex(a);return M+a;},replaceEntriesUrlByRegex:function(u){for(var i=0;i<this.aEntriesUrlReplace.length;i++){var e=this.aEntriesUrlReplace[i];if(e.regex instanceof RegExp&&e.value!==undefined){u=u.replace(e.regex,e.value);}else{this.oLog.warning(m+" - Invalid regular expression for url replace.");}}return u;},prepareRequestForHar:function(x,S){var e={startedDateTime:new Date(S).toISOString(),time:this.preciseDateNow()-S,request:{headers:x._requestParams.headers,url:r(x._requestParams.url),method:x._requestParams.method},response:{status:x.status,content:{text:x.responseText}}};if(x._requestParams.customGroupName){e._customGroupName=x._requestParams.customGroupName;}e.response.headers=this.transformHeadersFromArrayToObject(x);return e;},transformHeadersFromArrayToObject:function(x){var t=x.getAllResponseHeaders().split("\r\n");var h=[];for(var i=0;i<t.length;i++){if(t[i]){var H=t[i].split(":");h.push({name:H[0].trim(),value:H[1].trim()});}}return h;},deleteRecordedEntries:function(){this.aRequests=[];},getHarContent:function(d){var f=(this.sFilename||this.sDefaultFilename);if(this.bPromptForDownloadFilename){f=window.prompt("Enter file name",f+".har");}else{f=f+".har";}var h={log:{version:"1.2",creator:{name:"RequestRecorder",version:"1.0"},entries:this.aRequests}};if(d){this.deleteRecordedEntries();}if(!this.bIsDownloadDisabled){var S=JSON.stringify(h,null,4);var a=document.createElement("a");document.body.appendChild(a);var B=new window.Blob([S],{type:"octet/stream"});var u=window.URL.createObjectURL(B);a.href=u;a.download=f;a.click();window.URL.revokeObjectURL(u);}return h;},calculateDelay:function(d,t){if(d){if(d.factor!==undefined&&typeof d.factor==='number'){t*=d.factor;}if(d.offset!==undefined&&typeof d.offset==='number'){t+=d.offset;}if(d.max!==undefined&&typeof d.max==='number'){t=Math.min(d.max,t);}if(d.min!==undefined&&typeof d.min==='number'){t=Math.max(d.min,t);}}return t;},respond:function(x,e){var f=function(){if(x.readyState!==0){var a=e.response.content.text;var h={};e.response.headers.forEach(function(H){h[H.name]=H.value;});if(typeof a==="function"){a=a();}x.respond(e.response.status,h,a);}};if(x.async){setTimeout(function(){f();},this.calculateDelay(this.mDelaySettings,e.time));}else{f();}},isUrlFiltered:function(u,e){if(this.bIsPaused){return true;}var t=this;return e.every(function(a){if(a instanceof RegExp){return!a.test(u);}else{t.oLog.error(m+" - Invalid regular expression for filter.");return true;}});},init:function(o){o=o||{};if(typeof o!=="object"){throw new Error("Parameter object isn't a valid object");}this.mHarFileContent=null;this.aRequests=[];this.sFilename="";this.bIsRecording=false;this.bIsPaused=false;this.bIsDownloadDisabled=false;if(this.oSinonXhr){this.oSinonXhr.filters=this.aSinonFilters;this.aSinonFilters=[];this.oSinonXhr.restore();this.oSinonXhr=null;}for(var f in this.mXhrNativeFunctions){if(this.mXhrNativeFunctions.hasOwnProperty(f)){window.XMLHttpRequest.prototype[f]=this.mXhrNativeFunctions[f];}}this.mXhrNativeFunctions={};this.bIsDownloadDisabled=o.disableDownload===true;this.bPromptForDownloadFilename=o.promptForDownloadFilename===true;if(o.delay){if(o.delay===true){this.mDelaySettings={};}else{this.mDelaySettings=o.delay;}}else{this.mDelaySettings={max:0};}if(o.entriesUrlFilter){if(Array.isArray(o.entriesUrlFilter)){this.aEntriesUrlFilter=o.entriesUrlFilter;}else{this.aEntriesUrlFilter=[o.entriesUrlFilter];}}else{this.aEntriesUrlFilter=[new RegExp(".*")];}if(o.entriesUrlReplace){if(Array.isArray(o.entriesUrlReplace)){this.aEntriesUrlReplace=o.entriesUrlReplace;}else{this.aEntriesUrlReplace=[o.entriesUrlReplace];}}else{this.aEntriesUrlReplace=[];}if(o.customGroupNameCallback&&typeof o.customGroupNameCallback==="function"){this.fnCustomGroupNameCallback=o.customGroupNameCallback;}else{this.fnCustomGroupNameCallback=function(){return false;};}},isPlayStarted:function(){return!!this.oSinonXhr;},isRecordStarted:function(){return this.bIsRecording;}};var b=new _();var R={start:function(l,o){try{this.play(l,o);}catch(e){var u=new U(l);var E=u.suffix();if(E!="har"){b.oLog.warning(m+" - Invalid file extension: "+E+", please use '.har' files.");}this.record(u.filename().replace("."+E,""),o);}},record:function(f,o){b.oLog.info(m+" - Record");if(window.XMLHttpRequest.name==='FakeXMLHttpRequest'){b.oLog.warning(m+" - Sinon FakeXMLHttpRequest is enabled by another application, recording could be defective");}if(b.isRecordStarted()){b.oLog.error(m+" - RequestRecorder is already recording, please stop first...");return;}b.init(o);b.sFilename=f;b.bIsRecording=true;b.mXhrNativeFunctions.open=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.open=function(){this._requestParams=this._requestParams||{};this._requestParams.method=arguments[0];this._requestParams.url=arguments[1];this._requestParams.customGroupName=b.fnCustomGroupNameCallback();this._requestParams.headers=this._requestParams.headers||[];b.mXhrNativeFunctions.open.apply(this,arguments);};b.mXhrNativeFunctions.setRequestHeader=window.XMLHttpRequest.prototype.setRequestHeader;window.XMLHttpRequest.prototype.setRequestHeader=function(h,H){this._requestParams=this._requestParams||{headers:[]};this._requestParams.headers.push({name:h,value:H});b.mXhrNativeFunctions.setRequestHeader.apply(this,arguments);};b.mXhrNativeFunctions.send=window.XMLHttpRequest.prototype.send;window.XMLHttpRequest.prototype.send=function(){if(!b.isUrlFiltered(this._requestParams.url,b.aEntriesUrlFilter)){var t=b.preciseDateNow();var O=this.onreadystatechange;this.onreadystatechange=function(){if(this.readyState===4){b.aRequests.push(b.prepareRequestForHar(this,t));b.oLog.info(m+" - Record XMLHttpRequest. Method: "+this._requestParams.method+", URL: "+this._requestParams.url);}if(O){O.apply(this,arguments);}};}b.mXhrNativeFunctions.send.apply(this,arguments);};},play:function(l,o){b.oLog.info(m+" - Play");if(b.isPlayStarted()){b.oLog.error(m+" - RequestRecorder is already playing, please stop first...");return;}b.init(o);var L;if(l&&Array.isArray(l)){b.mHarFileContent={};b.mHarFileContent.log={"entries":l.slice(0)};L="";}else{L=l;b.mHarFileContent=b.loadFile(L);}if(b.mHarFileContent){b.mHarFileContent=b.prepareEntries(b.mHarFileContent);b.oLog.info(m+" - Har file found, replay started ("+L+")");b.oSinonXhr=s.useFakeXMLHttpRequest();b.oSinonXhr.useFilters=true;b.aSinonFilters=b.oSinonXhr.filters;b.oSinonXhr.filters=[];b.oSinonXhr.addFilter(function(M,u,a,c,p){if(!b.isUrlFiltered(u,b.aEntriesUrlFilter)){return false;}for(var i=0;i<b.aSinonFilters.length;i++){if(b.aSinonFilters[i](M,u,a,c,p)===false){b.oLog.debug(m+" - Foreign URL filter from sinon filters are applied.");return false;}}return true;});var O=b.oSinonXhr.onCreate;b.oSinonXhr.onCreate=function(x){var X=x.send;x.send=function(){if(!b.isUrlFiltered(x.url,b.aEntriesUrlFilter)){var e;var c;var u=r(x.url);u=new U(u).resource();u=b.replaceEntriesUrlByRegex(u);var a=x.method+u;var d=b.fnCustomGroupNameCallback();if(!d){d=b.sDefaultCustomGroup;}if(!b.mHarFileContent._groupedEntries[d]){throw new Error("Custom group name does not exist: "+d);}c=b.mHarFileContent._groupedEntries[d];if(!c[a]){throw new Error("URL does not exist: "+a);}if(!c[a].length){throw new Error("No more entries left for: "+a);}e=b.mHarFileContent.log.entries[c[a].shift()];b.oLog.info(m+" - Respond XMLHttpRequest. Method: "+x.method+", URL: "+u);b.respond(x,e);}else{X.apply(this,arguments);}};if(O){O.apply(this,arguments);}};}},stop:function(){b.oLog.info(m+" - Stop");var h=null;if(b.isRecordStarted()){h=b.getHarContent(true);}b.init();return h;},pause:function(){b.oLog.info(m+" - Pause");b.bIsPaused=true;},resume:function(){b.oLog.info(m+" - Resume");b.bIsPaused=false;},getRecordings:function(d){var D=d||false;b.oLog.info(m+" - Get Recordings");return b.getHarContent(D);},addResponseJson:function(u,a,c,d,h){var H=h||[];H.push({"name":"Content-Type","value":"application/json;charset=utf-8"});this.addResponse(u,a,c,d,H);},addResponse:function(u,a,c,d,h){if(!b.isPlayStarted()){throw new Error("Start the player first before you add a response.");}var M=c||"GET";var H=h||[{"name":"Content-Type","value":"text/plain;charset=utf-8"}];var S=d||200;var e={"startedDateTime":new Date().toISOString(),"time":0,"request":{"headers":[],"url":u,"method":M},"response":{"status":S,"content":{"text":a},"headers":H}};var i=b.mHarFileContent.log.entries.push(e)-1;b.addEntryToMapping(b.mHarFileContent,b.mHarFileContent.log.entries,i);},setLogger:function(l){if(typeof l!="object"||typeof l.info!="function"||typeof l.debug!="function"||typeof l.warning!="function"||typeof l.error!="function"){throw new Error("Logger is not valid. It should implement at least the functions: info, debug, warning, error.");}b.oLog=l;}};return R;}));
