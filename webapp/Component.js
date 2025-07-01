sap.ui.define([
    "sap/ui/core/UIComponent"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("ui5task01.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        }
    });
});