sap.ui.define(['sap/ui/core/mvc/Controller', './../utils/OdataManager'], function(Controller, OdataManager) {
    "use strict";

    return Controller.extend("myapp.controller.App", {

        onInit: function() {

            OdataManager.__initialize(this.getOwnerComponent());

            jQuery.sap.log.debug("APP starting!!!");


        }


    });

}, /* bExport= */ true);