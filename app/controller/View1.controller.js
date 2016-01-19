sap.ui.define( ["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("sapui5skeleton.controller.View1", {
		onInit : function () {
			var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("page2");
			this.byId("link").setHref(sUrl);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({'locale': 'none'}, true);
            this.getView().setModel(oModel);
		},

		onToPage2 : function () {
			this.getOwnerComponent().getRouter().navTo("page2");
		},
		
		getLocale : function(){
			var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
			console.log ( 'currentLocale = ' + sCurrentLocale);
			var oBundle = jQuery.sap.resources({url : "locales/locale.properties", locale: sCurrentLocale});
			var oModel = this.getView().getModel();
			oModel.setData({'locale': sCurrentLocale, 'mylabel': oBundle.getText("WELCOME_INFO")}, true);
		},
		
		getForcedLocale : function(){
			var oModel = this.getView().getModel();
			var forcedLocale = oModel.getProperty('/locale');
			console.log ( 'forcedLocale = ' + forcedLocale);
			var oBundle = jQuery.sap.resources({url : "locales/locale.properties", locale: forcedLocale});
			var oModel = this.getView().getModel();
			oModel.setData({'locale': forcedLocale, 'mylabel': oBundle.getText("WELCOME_INFO")}, true);
		}
	});

}, /* bExport= */ true);
