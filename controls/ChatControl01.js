
    sap.ui.define(
    [	"sap/ui/core/Control",
      "sap/m/Button",
      "sap/ui/core/IconPool",
      "sap/m/Dialog",
      "sap/m/List",
      "sap/m/FeedListItem",
      "sap/m/FeedInput",
      "sap/m/ResponsivePopover",
      "sap/m/VBox",
      "sap/m/ScrollContainer",
      "sap/m/Bar",
      "sap/m/Title",
      "sap/ui/core/ResizeHandler"
    ],
    function(Control, Button, IconPool, Dialog, List, FeedListItem, FeedInput, ResponsivePopover, VBox, ScrollContainer, Bar, Title, ResizeHandler) 
{
    'use strict';
    return Control.extend('wohland.de.controls.ChatControl01',
    {
        metadata : {
			properties : {
				title: {type: "string", group: "Appearance", defaultValue: null},
			    
			    width: {type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue: null},
				height: {type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue: null},
			    
			    buttonIcon: {type: "sap.ui.core.URI", group: "Appearance", defaultValue: null},
				robotIcon: {type: "sap.ui.core.URI", group: "Appearance", defaultValue: null},
				userIcon: {type: "sap.ui.core.URI", group: "Appearance", defaultValue: null},
				
				initialMessage: {type: "string", group: "Appearance", defaultValue: "Hello, How can I help?"},
				placeHolder: {type: "string", group: "Appearance", defaultValue: "Post something here"}
			
			},
			aggregations : {
				_chatButton:  {type: "sap.m.Button", multiple: false},
				_popover: {type: "sap.m.ResponsivePopover", multiple: false}
				
			},
			events : {
				send: {
            		parameters : {
						text : {type : "string"}
					}
            	}
			}
		},

        init: function() 
        {
//          initialisation code, in this case, ensure css is imported
            var libraryPath = jQuery.sap.getModulePath("wohland.de"); 
//            jQuery.sap.includeStyleSheet(libraryPath + "/css/bkChat.css"); 
            jQuery.sap.includeStyleSheet(libraryPath + "/css/style.css");             
			
        	var oBtn = new Button(this.getId() + "-bkChatButton", {
		        press: this._onOpenChat.bind(this)
	        });
	        this.setAggregation("_chatButton", oBtn);
        },

        renderer  : function(oRm, oControl) {
    		
            var oChatBtn = oControl.getAggregation("_chatButton");
            var oPop = oControl.getAggregation("_popover");
        
            oRm.write("<div ");
            oRm.addClass("bkChatButton");
            oRm.writeClasses();
            oRm.write(">");
                    
            oRm.renderControl(oChatBtn);
                oRm.renderControl(oPop);
            oRm.write("</div>");
        }	,

        setButtonIcon: function(sButtonIcon){
            this.setProperty("buttonIcon", sButtonIcon, true);
            sap.ui.getCore().byId(this.getId() + "-bkChatButton").setIcon(sButtonIcon);
        },        

/*        
        _onResize: function()
        {
            console.log('resize to width:', this.$().width());
            this._renderViz();            
        },

        onBeforeRendering: function() {
           ResizeHandler.deregister(this._sResizeHandlerId) 
        },

        exit: function() {
            ResizeHandler.deregister(this._sResizeHandlerId) 
         },

        onAfterRendering: function() 
        {
            this._sResizeHandlerId =  ResizeHandler.register(this, this._onResize.bind(this));
            this._renderViz();
        },
*/
        _onOpenChat: function(oEvent)
        {
            this.getAggregation("_popover").openBy(this.getAggregation("_chatButton"));
            this.getAggregation("_popover").setContentHeight(this.getProperty("height"));
            this.getAggregation("_popover").setContentWidth(this.getProperty("width"));
        }


                    



    });


    var oFeedIn = new FeedInput(this.getId() + "-bkChatInput", {
        post: this._onPost.bind(this),
        showicon: true
    }).addStyleClass("sapUiTinyMargin");    

    oFeedIn.addEventDelegate({
        onsapenter: function(oEvent) {
                    
            oEvent.preventDefault();
                    
            var sTxt = oFeedIn.getValue();
            if(sTxt.length > 0){
                oFeedIn.fireEvent("post", {
                value: sTxt
            }, true, false);
            oFeedIn.setValue(null); 
            }
                    
    }
});    

}



);