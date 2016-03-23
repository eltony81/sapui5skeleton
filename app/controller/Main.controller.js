sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    './MyUtils',
    'sap/ui/core/mvc/Controller'
], function (jQuery, MessageToast, MyUtils, Controller) {
    "use strict";

    var MainController = Controller.extend("myapp.controller.Main", {


        onInit: function () {


        },

        onAfterRendering: function () {


        },

        onToTmpPage: function(event){

            this.getOwnerComponent().getRouter().navTo("tmp");

        }

    });

    return MainController;

});
