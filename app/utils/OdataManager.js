sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/odata/ODataModel',
    'sap/ui/base/Object'
], function(jQuery, ODataModel, Object) {
    "use strict";

    var instance = null;

    var OdataManager = Object.extend("myapp.utils.OdataManager", {

        _odata: null,

        __mainComponent: null,

        constructor: function() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one OdataManager, use OdataManager.getInstance()");
            }
        },

        _getRemoteDatasourceURI: function() {

            var sapuiconf = this.__mainComponent.getMetadata().getManifestEntry("sap.ui5");
            var remoteDsURI;
            remoteDsURI = sapuiconf.config.remoteDS;
            jQuery.sap.log.debug("OdataManager: remoteDsURI=" + remoteDsURI);
            return remoteDsURI;

        },

        __initialize: function(mainComponent) {

            this.__mainComponent = mainComponent;
            var remoteDsURI = this._getRemoteDatasourceURI();

            this._odata = new ODataModel(remoteDsURI, {
                "json": true,
                "useBatch": true
            });

        },

        getOdata: function() {

            return this._odata;

        },

    });

    OdataManager.getInstance = function() {

        if (instance === null) {
            instance = new OdataManager();
        }
        return instance;
    };

    return OdataManager.getInstance();

});