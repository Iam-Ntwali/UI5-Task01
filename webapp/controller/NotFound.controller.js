sap.ui.define([
    "ui5task01/controller//BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("ui5task01.controller.NotFound", {

        onInit: function () {
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("EmployeesList");
        }
    });
});