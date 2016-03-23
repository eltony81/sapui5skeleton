sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/ui/base/Object'
], function (jQuery, JSONModel, Object) {
    "use strict";

    var MyRequestUtil = Object.extend("myapp.controller.MyRequestUtil", {

        utilSprintf: sprintf,

        getRequest: function () {

		    return "request";

        }

    });

    return MyRequestUtil;

});
