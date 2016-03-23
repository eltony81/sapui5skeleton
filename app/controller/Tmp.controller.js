sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    './MyUtils',
    'sap/ui/core/routing/History',
    'sap/ui/core/mvc/Controller'
], function (jQuery, MessageToast, MyUtils, History, Controller) {
    "use strict";

    var TmpController = Controller.extend("myapp.controller.Tmp", {


        onInit: function () {

        },

        onAfterRendering: function () {


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
        }

    });

    return TmpController;

});
