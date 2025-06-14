sap.ui.define([
    "ui5task01/controller/BaseController",
    "ui5task01/model/formatter",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (BaseController, NumberFormatter, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("ui5task01.controller.EmployeeDetail", {

        formatter: NumberFormatter,

        onInit: function () {
            this.getRouter().getRoute("EmployeeDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        /* Handles route matching for employee detail page */
        _onRouteMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            var oModel = this.getView().getModel("EmployeeV2Model");
            var aEmployees = oModel.getProperty("/employeeData");

            var sPath = aEmployees.findIndex(e => e.id.toString() === sEmployeeId);

            if (sPath !== -1) {
                this.getView().bindElement({
                    path: "/employeeData/" + sPath,
                    model: "EmployeeV2Model",
                });

                // Store current employee data for operations
                this._iCurrentEmployeeIndex = sPath;
                this._oCurrentEmployee = aEmployees[sPath];
            } else {
                this.getRouter().getTargets().display("notFound", {
                    fromTarget: "EmployeesList"
                });
            }
        },

        /*Opens dialog to edit current employee */
        onEditEmployee: function () {
            if (!this._oCurrentEmployee) {
                MessageToast.show("No employee data available", {
                    duration: 3000,
                    width: "15em"
                });
                return;
            }

            this.getEmployeeDialog().then(function (oDialog) {
                var oDialogModel = this.createDialogModel(this._oCurrentEmployee, "edit");
                oDialog.setModel(oDialogModel, "dialogModel");
                oDialog.open();
            }.bind(this));
        },

        /* Handles dialog opening event */
        onBeforeOpenDialog: function () {
            // Clear any previous validation states
            this._clearValidationStates();
        },

        /* Handles dialog closing event */
        onAfterCloseDialog: function () {
            // Clean up dialog model
            if (this._oEmployeeDialog) {
                this._oEmployeeDialog.getModel("dialogModel").destroy();
            }
        },

        /* Handles input change events for validation from base control */
        onInputChange: function (oEvent) {
            var oDialogModel = this._oEmployeeDialog.getModel("dialogModel");
            var oEmployee = oDialogModel.getProperty("/employee");

            // Validate the current employee data
            var oValidationResult = this.validateEmployee(oEmployee);

            // Update validation states
            oDialogModel.setProperty("/validation", oValidationResult.validation);
            oDialogModel.setProperty("/formValid", oValidationResult.isValid);
        },

        /* Saves employee data (update) */
        onSaveEmployee: function () {
            var oDialogModel = this._oEmployeeDialog.getModel("dialogModel");
            var oEmployee = oDialogModel.getProperty("/employee");

            // Final validation
            var oValidationResult = this.validateEmployee(oEmployee);
            if (!oValidationResult.isValid) {
                oDialogModel.setProperty("/validation", oValidationResult.validation);
                oDialogModel.setProperty("/formValid", false);
                return;
            }

            var oModel = this.getView().getModel("EmployeeV2Model");
            var aEmployees = oModel.getProperty("/employeeData");
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            // Update existing employee
            if (this._iCurrentEmployeeIndex !== -1) {
                aEmployees[this._iCurrentEmployeeIndex] = oEmployee;
                this._oCurrentEmployee = oEmployee;

                // Update model
                oModel.setProperty("/employeeData", aEmployees);

                // Force refresh of the model to trigger all bindings
                oModel.refresh(true);

                // Refresh the binding
                this.getView().getElementBinding("EmployeeV2Model").refresh();

                MessageToast.show(oResourceBundle.getText("saveSuccess"), {
                    duration: 3000,
                    width: "15em"
                });
            }

            this._oEmployeeDialog.close();
        },

        /**
         * Cancels dialog operation
         */
        onCancelDialog: function () {
            this._oEmployeeDialog.close();
        },

        /* Deletes current employee with confirmation */
        onDeleteEmployee: function () {
            if (!this._oCurrentEmployee) {
                MessageToast.show("No employee data available", {
                    duration: 3000,
                    width: "15em"
                });
                return;
            }

            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var sMessage = oResourceBundle.getText("confirmDelete");
            var sTitle = oResourceBundle.getText("confirm");

            MessageBox.confirm(sMessage, {
                title: sTitle,
                onClose: this._onDeleteConfirm.bind(this)
            });
        },

        /* Handles delete confirmation */
        _onDeleteConfirm: function (sAction) {
            if (sAction === MessageBox.Action.OK) {
                var oModel = this.getView().getModel("EmployeeV2Model");
                var aEmployees = oModel.getProperty("/employeeData");
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                // Remove employee from array
                aEmployees.splice(this._iCurrentEmployeeIndex, 1);

                // Update model
                oModel.setProperty("/employeeData", aEmployees);

                // Force refresh of the model to trigger all bindings
                oModel.refresh(true);

                MessageToast.show(oResourceBundle.getText("deleteSuccess"), {
                    duration: 3000,
                    width: "15em"
                });

                // Navigate back to list
                this.onNavBack();
            }
        },

        /* Clears validation states on dialog inputs */
        _clearValidationStates: function () {
            var aInputIds = ["nameInput", "emailInput", "phoneInput", "roleInput", "departmentComboBox", "salaryInput"];

            aInputIds.forEach(function (sId) {
                var oInput = this.byId(sId);
                if (oInput) {
                    oInput.setValueState("None");
                    oInput.setValueStateText("");
                }
            }.bind(this));
        }
    });
});