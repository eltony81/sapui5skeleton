sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/format/DateFormat'
], function (jQuery, JSONModel, MessageBox, MessageToast, DateFormat) {
    "use strict";

    var MyUtils = {

        oDateFormat: DateFormat.getDateTimeInstance({
            pattern: "dd/MM/yyyy"
        })

    };

    return MyUtils;

}, /* bExport= */ true);
