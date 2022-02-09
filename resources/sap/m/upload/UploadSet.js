/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Icon","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer","sap/m/upload/UploaderHttpRequestMethod"],function(C,I,K,L,d,M,B,D,a,b,O,S,T,c,F,U,e,R,f){"use strict";var g=C.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:null},noDataDescription:{type:"string",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:f.Post}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},selectionChanged:{parameters:{items:{type:"sap.m.upload.UploadSetItem[]"}}}}},renderer:R});var h=M.UploadState;g.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=null;this._oNoDataIcon=new I(this.getId()+"-no-data-icon",{src:"sap-icon://document",size:"6rem",noTabStop:true});this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null;};g.prototype.exit=function(){this._unbindDragAndDrop();this._oNoDataIcon.destroy();this._oNoDataIcon=null;};g.prototype.onBeforeRendering=function(){this._unbindDragAndDrop();};g.prototype.onAfterRendering=function(){var i;if(this._oEditedItem){i=this._oEditedItem._getFileNameEdit().$("inner");if(i){i.on("focus",function(){i.selectText(0,i.val().length);});i.trigger("focus");}}this._bindDragAndDrop();};g.prototype.onkeydown=function(E){var l,i;if(this._oEditedItem&&this._oEditedItem._getFileNameEdit().$("inner")[0]===E.target){i=this._oEditedItem;}else if(E.target){l=sap.ui.getCore().byId(E.target.id);if(l){i=this._mListItemIdToItemMap[l.getId()];}}if(!i){return;}switch(E.keyCode){case K.F2:if(i._bInEditMode){this._handleItemEditConfirmation(E,i);}else{this._handleItemEdit(E,i);}break;case K.ESCAPE:this._handleItemEditCancelation(E,i);break;case K.DELETE:if(!i.$("fileNameEdit").hasClass("sapMInputFocused")){this._handleItemDelete(E,i);}break;case K.ENTER:if(i===this._oEditedItem){this._handleItemEditConfirmation(E,i);}else{i._handleFileNamePressed();}break;default:return;}};g.prototype.getToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new O(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new c(),this.getDefaultFileUploader()]});this.addDependent(this._oToolbar);}else{this._oToolbar.addContent(this.getDefaultFileUploader());}}return this._oToolbar;};g.prototype.getNoDataText=function(){var n=this.getProperty("noDataText");n=n||this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT");return n;};g.prototype.getNoDataDescription=function(){var n=this.getProperty("noDataDescription");n=n||this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");return n;};g.prototype.setToolbar=function(t){this.setAggregation("toolbar",t);this.getToolbar();return this;};g.prototype.addAggregation=function(A,o,s){C.prototype.addAggregation.call(this,A,o,s);if(o&&(A==="items"||A==="incompleteItems")){this._projectToNewListItem(o);this._refreshInnerListStyle();}};g.prototype.insertAggregation=function(A,o,i,s){C.prototype.insertAggregation.call(this,A,o,i,s);if(o&&(A==="items"||A==="incompleteItems")){this._projectToNewListItem(o,i||0);this._refreshInnerListStyle();}};g.prototype.removeAggregation=function(A,o,s){var l;C.prototype.removeAggregation.call(this,A,o,s);if(o&&(A==="items"||A==="incompleteItems")){l=o._getListItem();var i=this.getList().removeAggregation("items",l,s);if(i&&o){o.destroy();i.destroy();}this._refreshInnerListStyle();}};g.prototype.removeAllAggregation=function(A,s){if(A==="items"){this.getItems().forEach(function(i){this.getList().removeAggregation("items",i._getListItem(),s);}.bind(this));}else if(A==="incompleteItems"){this.getIncompleteItems().forEach(function(i){this.getList().removeAggregation("items",i._getListItem(),s);}.bind(this));}C.prototype.removeAllAggregation.call(this,A,s);};g.prototype.destroyAggregation=function(A,s){if(A==="items"||A==="incompleteItems"){this.removeAllAggregation(A,s);}if(this.getList().getItems().length===0){this.getList().destroyAggregation("items",s);}C.prototype.destroyAggregation.call(this,A,s);};g.prototype.setFileTypes=function(n){var t=n||null;if(typeof t==="string"){t=t.split(",");}t=(t||[]).map(function(s){return s?s.toLowerCase():"";});if(!d(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this._checkRestrictions();}return this;};g.prototype.setMaxFileNameLength=function(n){if(this.getMaxFileNameLength()!==n){this.setProperty("maxFileNameLength",n,true);this._checkRestrictions();}return this;};g.prototype.setMaxFileSize=function(n){if(this.getMaxFileSize()!==n){this.setProperty("maxFileSize",n,true);this._checkRestrictions();}return this;};g.prototype.setMediaTypes=function(n){var t=n||null;if(typeof t==="string"){t=t.split(",");}t=(t||[]).map(function(s){return s?s.toLowerCase():"";});if(!d(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this._checkRestrictions();}return this;};g.prototype.setShowIcons=function(s){if(s!==this.getShowIcons()){this._getAllItems().forEach(function(i){i._getIcon().setVisible(s);});this.setProperty("showIcons",s,false);}return this;};g.prototype.setTerminationEnabled=function(E){if(E!==this.getTerminationEnabled()){this._getAllItems().forEach(function(i){if(i.getUploadState()===h.Uploading){i._getTerminateButton().setVisible(E);}});this.setProperty("terminationEnabled",E,false);}return this;};g.prototype.setUploadEnabled=function(E){if(E!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(E);this.setProperty("uploadEnabled",E,false);}return this;};g.prototype.getList=function(){if(!this._oList){this._oList=new a(this.getId()+"-list",{selectionChange:[this._handleSelectionChange,this],headerToolbar:this.getToolbar()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList);}return this._oList;};g.prototype.upload=function(){if(!this.getUploadEnabled()){L.warning("Upload is currently disabled for this upload set.");return;}this.getIncompleteItems().forEach(function(i){this._uploadItemIfGoodToGo(i);}.bind(this));};g.prototype.uploadItem=function(i){this._uploadItemIfGoodToGo(i);};g.prototype.getDefaultFileUploader=function(){var t=this._oRb.getText("UPLOADCOLLECTION_UPLOAD");if(!this._oFileUploader){this._oFileUploader=new F(this.getId()+"-uploader",{buttonOnly:true,buttonText:t,tooltip:t,iconOnly:false,enabled:this.getUploadEnabled(),fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),icon:"",iconFirst:false,multiple:true,style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this],typeMissmatch:[this._fireFileTypeMismatch,this],fileSizeExceed:[this._fireFileSizeExceed,this],filenameLengthExceed:[this._fireFilenameLengthExceed,this]});}return this._oFileUploader;};g.prototype.registerUploaderEvents=function(u){u.attachUploadStarted(this._onUploadStarted.bind(this));u.attachUploadProgressed(this._onUploadProgressed.bind(this));u.attachUploadCompleted(this._onUploadCompleted.bind(this));u.attachUploadAborted(this._onUploadAborted.bind(this));};g.prototype._onFileUploaderChange=function(E){var o=E.getParameter("files");this._processNewFileObjects(o);};g.prototype._onUploadStarted=function(E){var i=E.getParameter("item");i.setUploadState(h.Uploading);};g.prototype._onUploadProgressed=function(E){var i=E.getParameter("item"),p=Math.round(E.getParameter("loaded")/E.getParameter("total")*100);i.setProgress(p);};g.prototype._onUploadCompleted=function(E){var i=E.getParameter("item");i.setProgress(100);this.insertItem(i,0);i.setUploadState(h.Complete);this.fireUploadCompleted({item:i});};g.prototype._onUploadAborted=function(E){var i=E.getParameter("item");i.setUploadState(h.Error);this.fireUploadTerminated({item:i});};g.prototype._handleItemEdit=function(E,i){if(this._oEditedItem){this._handleItemEditConfirmation(E,this._oEditedItem);}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:i})){this._oEditedItem=i;this._oEditedItem._setInEditMode(true);}}};g.prototype._handleItemRestart=function(E,i){i.setUploadState(h.Ready);this._uploadItemIfGoodToGo(i);};g.prototype._handleItemEditConfirmation=function(E,i){var o=i._getFileNameEdit(),n,N,s=i.getFileName(),j=U._splitFileName(s);n=o.getValue().trim();if(!n||n.length===0){i._setContainsError(true);return;}if(j.name!==n){N=j.extension?n+"."+j.extension:n;i.setFileName(N);}i._setContainsError(false);i._setInEditMode(false);this.fireAfterItemEdited({item:i});this._oEditedItem=null;};g.prototype._handleItemEditCancelation=function(E,i){i._setContainsError(false);i._setInEditMode(false);this._oEditedItem=null;};g.prototype._handleItemDelete=function(E,i){var m;if(this._oEditedItem){this._handleItemEditConfirmation(E,this._oEditedItem);if(this._oEditedItem){return;}}if(!i.fireRemovePressed({item:i})){return;}if(!this.fireBeforeItemRemoved({item:i})){return;}if(!i.getFileName()){m=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT");}else{m=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",i.getFileName());}this._oItemToBeDeleted=i;b.show(m,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[b.Action.OK,b.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""});};g.prototype._handleClosedDeleteDialog=function(A){if(A!==b.Action.OK){return;}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this.fireAfterItemRemoved({item:this._oItemToBeDeleted});this._oItemToBeDeleted=null;};g.prototype._handleTerminateRequest=function(i,o){var j=new a({items:[new S({title:o.getFileName(),icon:o._getIcon().getSrc()})]}),k=new D({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new T({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),j],buttons:[new B({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),press:[l,this]}),new B({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){k.close();}})],afterClose:function(){k.destroy();}});k.open();function l(){if(o.getUploadState()===h.Uploading){if(this.fireBeforeUploadTermination({item:o})){this._handleUploadTermination(o);}}else if(o.getUploadState()===h.Complete){this.removeItem(o);}k.close();this.invalidate();}};g.prototype._handleUploadTermination=function(i){this._getActiveUploader().terminateItem(i);};g.prototype._handleSelectionChange=function(E){var l=E.getParameter("listItems"),i=[];l.forEach(function(o){i.push(this._mListItemIdToItemMap[o.getId()]);}.bind(this));this.fireSelectionChanged({items:i});};g.prototype._onDragEnterSet=function(E){if(E.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDropIndicator");}};g.prototype._onDragLeaveSet=function(E){if(E.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");}};g.prototype._onDragOverSet=function(E){E.preventDefault();};g.prototype._onDropOnSet=function(E){var o;E.preventDefault();if(E.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");o=E.originalEvent.dataTransfer.files;this._processNewFileObjects(o);}};g.prototype._onDragEnterBody=function(E){if(this.getUploadEnabled()){this._oLastEnteredTarget=E.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide");}};g.prototype._onDragLeaveBody=function(E){if(this._oLastEnteredTarget===E.target&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");}};g.prototype._onDragOverBody=function(E){E.preventDefault();if(this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide");}};g.prototype._onDropOnBody=function(E){if(this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");}};g.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems());};g.prototype._refreshInnerListStyle=function(){var m=this.getList().length-1;this._oList.getItems().forEach(function(l,i){l.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(i===0&&m===0){l.addStyleClass("sapMUCListSingleItem");}else if(i===0){l.addStyleClass("sapMUCListFirstItem");}else if(i===m){l.addStyleClass("sapMUCListLastItem");}else{l.addStyleClass("sapMUCListItem");}});};g.prototype._processNewFileObjects=function(o){var j=[],k;for(var i=0;i<o.length;i++){j.push(o[i]);}j.forEach(function(l){k=new U({uploadState:h.Ready});k._setFileObject(l);k.setFileName(l.name);if(!this.fireBeforeItemAdded({item:k})){return;}this.insertIncompleteItem(k);this.fireAfterItemAdded({item:k});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(k);}}.bind(this));};g.prototype._projectToNewListItem=function(i,j){var l=i._getListItem();this._mListItemIdToItemMap[l.getId()]=i;if(j||j===0){this.getList().insertAggregation("items",l,j,true);}else{this.getList().addAggregation("items",l,true);}this._checkRestrictionsForItem(i);};g.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new e({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader);}return this._oUploader;};g.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader();};g.prototype._uploadItemIfGoodToGo=function(i){if(i.getUploadState()===h.Ready&&!i._isRestricted()){if(this.fireBeforeUploadStarts({item:i})){var H=i.getHeaderFields().length?i.getHeaderFields():this.getHeaderFields();this._getActiveUploader().uploadItem(i,H);}}};g.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{"dragenter":this._onDragEnterBody.bind(this),"dragleave":this._onDragLeaveBody.bind(this),"dragover":this._onDragOverBody.bind(this),"drop":this._onDropOnBody.bind(this)},set:{"dragenter":this._onDragEnterSet.bind(this),"dragleave":this._onDragLeaveSet.bind(this),"dragover":this._onDragOverSet.bind(this),"drop":this._onDropOnSet.bind(this)}};}return this._oDragDropHandlers;};g.prototype._bindDragAndDrop=function(){this._$Body=jQuery(document.body);Object.keys(this._getDragDropHandlers().body).forEach(function(E){this._$Body.on(E,this._getDragDropHandlers().body[E]);}.bind(this));this._$DragDropArea=this.$("drag-drop-area");Object.keys(this._getDragDropHandlers().set).forEach(function(E){this.$().on(E,this._getDragDropHandlers().set[E]);}.bind(this));};g.prototype._unbindDragAndDrop=function(){if(this._$Body){Object.keys(this._getDragDropHandlers().body).forEach(function(E){this._$Body.off(E,this._getDragDropHandlers().body[E]);}.bind(this));}Object.keys(this._getDragDropHandlers().set).forEach(function(E){this.$().off(E,this._getDragDropHandlers().set[E]);}.bind(this));};g.prototype._checkRestrictions=function(){this.getIncompleteItems().forEach(function(i){this._checkRestrictionsForItem(i);}.bind(this));};g.prototype._checkRestrictionsForItem=function(i){i._checkTypeRestriction(this.getFileTypes());i._checkNameLengthRestriction(this.getMaxFileNameLength());i._checkSizeRestriction(this.getMaxFileSize());i._checkMediaTypeRestriction(this.getMediaTypes());};g.prototype._fireFileTypeMismatch=function(i){var m=this.getMediaTypes();var j=this.getFileTypes();var s=i.getParameter("fileType");var k=i.getParameter("mimeType");var l=(!!m&&(m.length>0)&&!!k&&m.indexOf(k)===-1);var n=(!!j&&(j.length>0)&&!!s&&j.indexOf(s)===-1);if(l){this.fireMediaTypeMismatch({item:i});}else if(n){this.fireFileTypeMismatch({item:i});}};g.prototype._fireFileSizeExceed=function(i){this.fireFileSizeExceeded({item:i});};g.prototype._fireFilenameLengthExceed=function(i){this.fireFileNameLengthExceeded({item:i});};return g;});