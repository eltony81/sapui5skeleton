sap.ui.define(['sap/ui/core/UIComponent'], function (UIComponent) {
    "use strict";
    return UIComponent.extend("myapp.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            //var logLevel = jQuery.sap.log.Level.INFO;
            //jQuery.sap.log.setLevel(logLevel);
            //initialize resources

            // Parse the current url and display the targets of the route that matches the hash
            this.getRouter().initialize();
        }

    });
}, /* bExport= */ true);
