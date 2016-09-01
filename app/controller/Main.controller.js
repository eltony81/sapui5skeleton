sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller'
], function(jQuery, MessageToast, Controller) {
    "use strict";

    var MainController = Controller.extend("myapp.controller.Main", {


        onInit: function() {

            var params = jQuery.sap.getUriParameters(window.location.href);
            console.log(params);

        },

        onAfterRendering: function() {


        },

        onToTmpPage: function(event) {

            this.getOwnerComponent().getRouter().navTo("tmp");

        }

    });

    return MainController;

});