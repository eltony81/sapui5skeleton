sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    './../utils/OdataManager',
    'sap/ui/core/routing/History',
    'sap/ui/core/mvc/Controller',
    "sap/ui/vk/ContentResource"
], function (jQuery, MessageToast, OdataManager, History, Controller, ContentResource) {
    "use strict";

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

            var mainScene;

            var view = this.getView();
            var viewport = view.byId("viewport1");
            var graphicsCore = viewport.getGraphicsCore();

            if (graphicsCore === undefined || graphicsCore === null) {
                graphicsCore = new sap.ui.vk.GraphicsCore({}, {
                    //the drawing buffer will perform antialiasing using its choice of technique (multisample/supersample) and quality
                    antialias: true,
                    //the drawing buffer has an alpha channel for the purposes of performing OpenGL destination alpha operations and compositing with the page
                    alpha: true,
                    //the page compositor will assume that colors in the drawing buffer are not premultiplied.
                    premultipliedAlpha: false
                });


                viewport.setGraphicsCore(graphicsCore);
            }

            var contentResource = new ContentResource({
                source: "3d/998 Clutch.vds",
                sourceType: "vds",
                sourceId: "abc"
            });
            graphicsCore.loadContentResourcesAsync([contentResource], function (sourcesFailedToLoad) {
                if (sourcesFailedToLoad) {
                    // Creates a new error-level entry in the log with the given message
                    jQuery.sap.log.error("Some of content resources cannot be loaded.");
                } else {
                    //Builds a scene tree from the hierarchy of content resources. The content resources must be already loaded.
                    var scene = graphicsCore.buildSceneTree([contentResource]);
                    if (scene) {
                        mainScene = scene;
                        //Scene class provides the interface for the 3D model.
                        viewport.setScene(mainScene);
                    } else {
                        jQuery.sap.log.error("Failed to load viewport");
                    }
                }
            });
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
