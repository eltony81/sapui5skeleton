sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    './../utils/OdataManager',
    'sap/ui/core/routing/History',
    'sap/ui/core/mvc/Controller'
], function(jQuery, MessageToast, OdataManager, History, Controller) {
    "use strict";

    var TmpController = Controller.extend("myapp.controller.Tmp", {

        oDataModel: null,

        onInit: function() {

            this.oDataModel = OdataManager.getOdata();
            this.getView().setModel(this.oDataModel);

        },

        onAfterRendering: function() {

        },

        onNavBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", true);
            }
        },

        getInvoices: function(odata) {

            var mParameters = {
                context: null,
                urlParameters: null,
                success: function(data, response) {
                    console.log("success: " + data);
                },
                error: function(err) {
                    console.log("error: " + err);
                },
                filters: null,
                sorters: null,
                groupId: null,
                batchGroupId: null,
                headers: null
            };

            try {
                odata.read("/Invoices", mParameters);
            } catch (err) {
                jQuery.sap.log.debug(err);
            }
        },

        onPress: function(oEvent) {

            this.getInvoices(this.oDataModel);
            
        }

    });

    return TmpController;

});
