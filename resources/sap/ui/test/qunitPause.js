/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/test/qunitPause",[],function(){"use strict";var P={NONE:"none",TIMEOUT:"timeout",ASSERT:"assert",POLL:"poll"};var t={};var _={pause:[],resume:[]};var a={};var p=false;var b=P.NONE;var c=false;function s(){return b!==P.NONE&&b!==P.POLL;}function d(){return b.indexOf(P.ASSERT)>-1;}function e(){return b.indexOf(P.POLL)>-1;}function i(){return QUnit.test.length===2;}function f(){var O=window.setTimeout;window.setTimeout=function w(C,D){var I=O.apply(null,arguments);t[I]={delay:D||0,callback:C,startTime:Date.now()};return I;};}function g(){var u=i()?"pushResult":"push";var v=QUnit.assert[u];QUnit.assert[u]=function(){var w=this;var A=arguments;var x=i()?arguments[0].result:arguments[0];var I=w.test&&sap.ui.test&&sap.ui.test.Opa&&sap.ui.test.Opa.config.testName===w.test.testName;if(I&&!x&&d()){var O=new sap.ui.test.Opa();var y=true;k();var z=new Promise(function(B){j(function(){if(y){y=false;B();}});v.apply(w,A);});O.iWaitForPromise(z);}else{v.apply(w,A);}};}function h(){if(s()){a=t[QUnit.config.timeout];if(!a){throw new Error("QUnitPause should be loaded before QUnit!");}a.originalCallback=a.callback;a.callback=function(){k();j(function(){var N=Math.max(0,a.delay-(Date.now()-a.startTime));QUnit.config.timeout=setTimeout(a.originalCallback,N);});};clearTimeout(QUnit.config.timeout);QUnit.config.timeout=setTimeout(a.callback,QUnit.config.testTimeout);t={};}}function o(){return q("pause").apply(this,arguments);}function j(){return q("resume").apply(this,arguments);}function k(){if(s()&&!p){p=true;r("pause");clearTimeout(QUnit.config.timeout);}else if(!d()){setTimeout(function(){l();},0);}}function l(){r("resume",true);p=false;}function m(u,C){QUnit.begin(function(){c=false;});var v=false;if(!QUnit){throw new Error("QUnitPause should start polling after QUnit is loaded!");}else if(c){C({qunitDone:true});}else if(e()){QUnit.done(function(){c=true;if(!v){C({qunitDone:true});}});setTimeout(function(){if(!c&&!v){v=true;C({qunitDone:false});}},u);}}function n(R){var I=false;for(var K in P){if(P[K]===R){I=true;}}return I;}function q(E){return function(C,T,A){_[E].push({cb:C,context:T,args:A,called:false});};}function r(E,C){_[E].forEach(function(L){if(!C||!L.called){L.cb.apply(L.context,L.args);L.called=true;}});}return{PAUSE_RULES:P,paused:p,get pauseRule(){return b;},set pauseRule(R){var u=R.split(",");b="";var N=u.filter(n).join(",");b=N?N:P.NONE;},shouldPause:s,shouldPauseOnAssert:d,shouldPoll:e,setupAfterQUnit:g,setupBeforeQUnit:f,setupBeforeOpaTest:h,onPause:o,onResume:j,emitPause:k,emitResume:l,pollForQUnitDone:m};},true);
