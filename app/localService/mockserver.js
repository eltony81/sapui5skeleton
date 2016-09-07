sap.ui.define(['jquery.sap.global',
    'sap/ui/core/util/MockServer'
], function (jQuery, MockServer) {
    "use strict";
    return {
        init: function () {

            var oMockServer, oUriParameters, sPath;
            // create
            oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/SAP/ZAPP1_SRV/"
            });
            oUriParameters = jQuery.sap.getUriParameters();
            // configure
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 1000
            });
            // simulate
            sPath = jQuery.sap.getModulePath("myapp.localService");
            oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");
            // start
            oMockServer.start();
        }
    };
});
