sap.ui.define([
	//  "jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button"
	
	], function(
				  Controller, 
				  Log, 
				  JSONModel,
				  Popover,
				  Button                
				) 
	  {
	  "use strict";
	
	//  var FullScreenController = Controller.extend("wohland.de.controller.FullScreen");
	
	  return Controller.extend("wohland.de.controller.GraphicsIntegration.GraphicsIntegration", 
	  {
		onInit: function() 
		{
	//      Log.info(this.getView().getControllerName(), "onInit");
		  // set mock model
		  var sPath = sap.ui.require.toUrl("wohland/de/localData/home/home_information.json");
		  var oModel = new JSONModel(sPath);
		  this.getView().setModel(oModel);


		
		}
		,
		onExit: function () 
		{
		  this.sPath = null;
		  if (this._oDetailsPopover) {
			this._oDetailsPopover.destroy();
		  }
		  if (this._oNewAppointmentDialog) {
			this._oNewAppointmentDialog.destroy();
		  }
		},
		onBackPressed: function() {
		  this.getOwnerComponent().getRouter().navTo("mainChatRoute");
		},
	
		handleMenuLeftPress: function (event) 
		{
			var oPopover = new Popover({
				showHeader: false,
	//			placement: PlacementType.Bottom,
				content: [
					new Button({
						text: 'Home',
	//						type: ButtonType.Transparent,
						press: [this.onPressNavHomeButton, this]
					}),														
					new Button({
						text: 'Graphics Integration',
	//					type: ButtonType.Transparent,
						press: [this.onPressNavGraphicsIntegrationButton, this]
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
	
			oPopover.openBy(event.getSource());
		},		    

		onPressNavHomeButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("homeRoute");
		},
		onPressNavGraphicsIntegrationButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("onPressNavGraphicsIntegrationButton");
			oRouter.navTo("graphicsintegrationRoute");						
		}
		,
		
		onPressNavAgendaButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("agendaRoute");
		},		
		onPressNavImpressumButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("impressumRoute");
		},		
		handleMenuInfoPress: function (event) 
		{
			var oPopover = new Popover({
				showHeader: false,
//				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: 'Infos',
//						type: ButtonType.Transparent,
						press: [this.onPressNavAgendaButton, this]
					}),					
					new sap.m.Text({
						text: 'OnBoard Companion ist ein didaktisches Projekt, in welchem Features und Vorgehensweisen beim Erstellen von SAPUI5 Anwendungen demonstriert werden.'

					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

		oPopover.openBy(event.getSource());
		}	    				
		
// Ende menubereich		
		,		
		onPressNav2DGraphicsDynamic01Button: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("2dgraphicsdynamic01Route");				
		},		  
		onPressNav2DGraphicsDynamic02Button: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//			oRouter.navTo("chartscat02Route");
//			oRouter.navTo("employeeList");			
			oRouter.navTo("2dgraphicsdynamic02Route");						
		},		  
		onPressNav2DGraphicsDynamic03Button: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("2dgraphicsdynamic03Route");	
		}	
		,		
		onPressNav3DGraphicsDynamic01Button: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("3dgraphicsdynamic01Route");				
		}		
		
		
	});
	
	
	
});