sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    './../utils/OdataManager',
    'sap/ui/core/routing/History',
    'sap/ui/core/mvc/Controller',
    "sap/ui/vk/ContentResource"
], function (jQuery, MessageToast, OdataManager, History, Controller, ContentResource) {
    "use strict";

    var loadModelIntoViewer = function (viewer, remoteUrl, sourceType, localFile) {
        //what is currently loaded in the view is destroyed
        viewer.destroyContentResources();

        var source = remoteUrl || localFile;

        if (source) {
            //content of viewer is replaced with new data
            var contentResource = new ContentResource({
                source: source,
                sourceType: sourceType,
                sourceId: "abc"
            });

            //content: chosen path. content added to the view
            viewer.addContentResource(contentResource);
        }
    };

    var TmpController = Controller.extend("myapp.controller.Tmp", {

        oDataModel: null,

        onInit: function () {

            jQuery.sap.require("sap.ui.vk.GraphicsCore");

            //this.oDataModel = OdataManager.getOdata();
            //this.getView().setModel(this.oDataModel);

        },

        onAfterRendering: function () {

        },

        loadScene: function (event) {
            
            var view = this.getView();
            var viewer = view.byId("viewer1");
            loadModelIntoViewer(viewer, "3d/998 Clutch.vds", "vds");

        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", true);
            }
        },

        getInvoices: function (odata) {

            var mParameters = {
                context: null,
                urlParameters: null,
                success: function (data, response) {
                    console.log("success: " + data);
                },
                error: function (err) {
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

        onPress: function (oEvent) {

            this.loadScene();

            this.getInvoices(this.oDataModel);

        }

    });

    return TmpController;

});
