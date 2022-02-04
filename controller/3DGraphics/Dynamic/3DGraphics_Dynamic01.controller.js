sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/Popover",
	"sap/m/Button"
	
], function (
	Controller,
	History,
	 Popover,
	 Button
	  ) 
{
	"use strict";
	return Controller.extend("wohland.de.controller.3DGraphics.Dynamic.3DGraphics_Dynamic01", 
	{

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

//  Menu-Bereich		
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
						text: 'Infosystem',
	//					type: ButtonType.Transparent,
						press: [this.onPressNavChartsButton, this]
					}),					
					new Button({
						text: 'On Board Menu',
	//					type: ButtonType.Transparent,
						press: [this.onPressNavMenuButton, this]
					}),
					new Button({
						text: 'On Board Chat',
	//					type: ButtonType.Transparent,
						press: [this.onPressNavChatButton, this]
					}),
					new Button({
						text: 'coming soon : Trivial Pursuit Europe',
	//					type: ButtonType.Transparent,
						press: [this.onPressNavBildbearbeitungButton, this]
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
		onPressNavChartsButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("onPressNavChartsButton");
			oRouter.navTo("chartsRoute");						
		}
		,
		onPressNavMenuButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("onPressNavMenuButton");
			oRouter.navTo("menuContainerRoute");			
		}		
		,
		onPressNavChatButton: function(oEvent)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("onPressNavChatButton");
			oRouter.navTo("chatRoute");						
		},
		
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

//   Ende - Menubereich		
	});
});
