    sap.ui.define( ["sap/ui/core/UIComponent"], function (UIComponent) {
        "use strict";
        return UIComponent.extend("sapui5skeleton.routingApp.Component", {

            metadata  : { 
            manifest: "json"
            },

            init : function () {
                UIComponent.prototype.init.apply(this, arguments);

                // Parse the current url and display the targets of the route that matches the hash
                this.getRouter().initialize();
            }

        });
    }, /* bExport= */ true);
