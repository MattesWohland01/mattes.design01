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
	
	//  	var FullScreenController = Controller.extend("wohland.de.controller.FullScreen");
	
		  return Controller.extend("wohland.de.controller.Home", 
		  {
			onInit: function() 
			{
	//      	Log.info(this.getView().getControllerName(), "onInit");
	// 			set mock model
				var sPath = sap.ui.require.toUrl("wohland/de/localData/home/home_information.json");
				var oModel = new JSONModel(sPath);
				this.getView().setModel(oModel);

				var oView = this.getView();
			
				// ui model
				// imageSrc : "svg/OpenUI5.inline.svg",			
				var oViewModel = new JSONModel({
					imageChat : "assets/svg/TimelessFlight_Chat2_TextPfad.svg",
					imageTE   : "assets/svg/TimelessFlight_TravelingEurope2_TextPfad.svg",
					imageMenu : "assets/svg/TimelessFlight_Menu2_TextPfad.svg",
					imageInfo : "assets/svg/TimelessFlight_Infosystem2_TextPfad.svg",					
					usePrototype : false 
				});
				oView.setModel(oViewModel, "ui");

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
			onBackPressed: function() 
			{
				this.getOwnerComponent().getRouter().navTo("mainChatRoute");
			},
	
			handleMenuLeftPress: function (event) 
			{
				var oPopover = new Popover({
					showHeader: false,
	//				placement: PlacementType.Bottom,
					content: [
						new Button({
							text: 'Home',
		//						type: ButtonType.Transparent,
							press: [this.onPressNavHomeButton, this]
						}),																	
						new Button({
							text: 'Graphics Integration',
	//						type: ButtonType.Transparent,
							press: [this.onPressNavGraphicsIntegrationButton, this]
						})
					]
				}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
	
			oPopover.openBy(event.getSource());
			},		    
// Agenda	
// Agenda-Popover
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
			},	
//  Agenda Button im Popover 			
			onPressNavAgendaButton: function(oEvent)
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("agendaRoute");
			},		

// Home				    		
			onPressNavHomeButton: function(oEvent)
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("homeRoute");
			},
// Impressum			
			onPressNavImpressumButton: function(oEvent)
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("impressumRoute");
			},		

			onPressNavGraphicsIntegrationButton: function(oEvent)
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				console.log("onPressNavGraphicsIntegrationButton");
				oRouter.navTo("graphicsintegrationRoute");						
			}
		  }
	);
	
	
	});