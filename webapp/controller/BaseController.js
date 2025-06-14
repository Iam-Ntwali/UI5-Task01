sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, History, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("ui5task01.controller.BaseController", {

        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("EmployeesList", {}, true);
            }
        },


        /* Creates or retrieves the employee dialog fragment */
        getEmployeeDialog: function () {
            if (!this._oEmployeeDialog) {
                return Fragment.load({
                    id: this.getView().getId(),
                    name: "ui5task01.fragment.EmployeeDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oEmployeeDialog = oDialog;
                    this.getView().addDependent(this._oEmployeeDialog);
                    return this._oEmployeeDialog;
                }.bind(this));
            }
            return Promise.resolve(this._oEmployeeDialog);
        },

        /* Generates the next available employee ID */
        getNextEmployeeId: function () {
            var oModel = this.getView().getModel("EmployeeV2Model");
            var aEmployees = oModel.getProperty("/employeeData") || [];
            var maxId = 0;

            aEmployees.forEach(function (employee) {
                if (employee.id > maxId) {
                    maxId = employee.id;
                }
            });

            return maxId + 1;
        },

        /* Validates employee data */
        validateEmployee: function (oEmployee) {
            var oValidation = {
                name: { state: "None", message: "" },
                email: { state: "None", message: "" },
                phone: { state: "None", message: "" },
                role: { state: "None", message: "" },
                department: { state: "None", message: "" },
                salary: { state: "None", message: "" }
            };

            var bIsValid = true;
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            // Name validation
            if (!oEmployee.name || oEmployee.name.trim() === "") {
                oValidation.name.state = "Error";
                oValidation.name.message = oResourceBundle.getText("nameRequired");
                bIsValid = false;
            }

            // Email validation
            if (!oEmployee.email || oEmployee.email.trim() === "") {
                oValidation.email.state = "Error";
                oValidation.email.message = oResourceBundle.getText("emailRequired");
                bIsValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(oEmployee.email)) {
                oValidation.email.state = "Error";
                oValidation.email.message = oResourceBundle.getText("emailInvalid");
                bIsValid = false;
            }

            // Phone validation
            if (!oEmployee.phone || oEmployee.phone.trim() === "") {
                oValidation.phone.state = "Error";
                oValidation.phone.message = oResourceBundle.getText("phoneRequired");
                bIsValid = false;
            }

            // Role validation
            if (!oEmployee.role || oEmployee.role.trim() === "") {
                oValidation.role.state = "Error";
                oValidation.role.message = oResourceBundle.getText("roleRequired");
                bIsValid = false;
            }

            // Department validation
            if (!oEmployee.department || oEmployee.department.trim() === "") {
                oValidation.department.state = "Error";
                oValidation.department.message = oResourceBundle.getText("departmentRequired");
                bIsValid = false;
            }

            // Salary validation
            if (!oEmployee.salary || isNaN(oEmployee.salary) || oEmployee.salary <= 0) {
                oValidation.salary.state = "Error";
                oValidation.salary.message = oResourceBundle.getText("salaryRequired");
                bIsValid = false;
            }

            return {
                isValid: bIsValid,
                validation: oValidation
            };
        },

        /* Creates dialog model with initial data */
        createDialogModel: function (oEmployee, sMode) {
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var oDefaultEmployee = {
                id: sMode === "add" ? this.getNextEmployeeId() : oEmployee.id,
                name: "",
                email: "",
                phone: "",
                role: "",
                department: "",
                salary: ""
            };

            var oEmployeeData = sMode === "edit" ? Object.assign({}, oEmployee) : oDefaultEmployee;

            return new JSONModel({
                mode: sMode,
                title: sMode === "add" ? oResourceBundle.getText("addEmployee") : oResourceBundle.getText("editEmployee"),
                buttonText: oResourceBundle.getText("save"),
                employee: oEmployeeData,
                originalEmployee: sMode === "edit" ? Object.assign({}, oEmployee) : null,
                validation: {
                    name: { state: "None", message: "" },
                    email: { state: "None", message: "" },
                    phone: { state: "None", message: "" },
                    role: { state: "None", message: "" },
                    department: { state: "None", message: "" },
                    salary: { state: "None", message: "" }
                },
                formValid: sMode === "edit" // Edit mode starts as valid, add mode needs validation
            });
        }
    });
});