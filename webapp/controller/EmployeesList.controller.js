sap.ui.define(
  [
    "ui5task01/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "ui5task01/model/formatter",
    "sap/m/MessageToast"
  ],
  function (BaseController, Filter, FilterOperator, NumberFormatter, MessageToast) {
    "use strict";

    return BaseController.extend("ui5task01.controller.EmployeesList", {
      formatter: NumberFormatter,

      onInit: function () {
        var oModel = this.getOwnerComponent().getModel("EmployeeV2Model");
        if (oModel) {
          oModel.setProperty("/tableLoading", true);

          setTimeout(function () {
            oModel.setProperty("/tableLoading", false);
          }, 1000);
        }
      },

      /* Handles navigation to employee detail page */
      onEmployeePress: function (oEvent) {
        var oContext = oEvent.getSource().getBindingContext("EmployeeV2Model");
        var sId = oContext.getProperty("id");
        this.getRouter().navTo("EmployeeDetail", { employeeId: sId });
      },

      /* Handles employee search/filter functionality */
      onFilterEmployees: function (oEvent) {
        // Get the search query from the event parameters
        const sQuery =
          oEvent.getParameter("query") || oEvent.getParameter("newValue");
        const oTable = this.byId("employeeTable");
        const oBinding = oTable.getBinding("items");

        let aFilters = [];

        if (sQuery && sQuery.length > 0) {
          const aAllFilters = [
            new Filter("name", FilterOperator.Contains, sQuery),
            new Filter("role", FilterOperator.Contains, sQuery),
            new Filter("department", FilterOperator.Contains, sQuery),
          ];

          // Also filter by ID if the query is a number
          if (!isNaN(sQuery)) {
            aAllFilters.push(
              new Filter("id", FilterOperator.EQ, parseInt(sQuery, 10))
            );
          }

          aFilters = [
            new Filter({
              filters: aAllFilters,
              and: false, // Use OR logic for the filters
            }),
          ];
        }

        oBinding.filter(aFilters);
      },



      /* Opens dialog to add new employee */
      onAddEmployee: function () {
        this.getEmployeeDialog().then(function (oDialog) {
          var oDialogModel = this.createDialogModel(null, "add");
          oDialog.setModel(oDialogModel, "dialogModel");
          oDialog.open();
        }.bind(this));
      },

      /* Handles dialog opening event */
      onBeforeOpenDialog: function () {
        // Clear any previous validation states
        this._clearValidationStates();
      },

      /* Handles dialog closing event  */
      onAfterCloseDialog: function () {
        // Clean up dialog model
        if (this._oEmployeeDialog) {
          this._oEmployeeDialog.getModel("dialogModel").destroy();
        }
      },

      /* Handles input change events for validation */
      onInputChange: function (oEvent) {
        var oDialogModel = this._oEmployeeDialog.getModel("dialogModel");
        var oEmployee = oDialogModel.getProperty("/employee");

        // Validate the current employee data
        var oValidationResult = this.validateEmployee(oEmployee);

        // Update validation states
        oDialogModel.setProperty("/validation", oValidationResult.validation);
        oDialogModel.setProperty("/formValid", oValidationResult.isValid);
      },

      /* Saves employee data */
      onSaveEmployee: function () {
        var oDialogModel = this._oEmployeeDialog.getModel("dialogModel");
        var oEmployee = oDialogModel.getProperty("/employee");
        var sMode = oDialogModel.getProperty("/mode");

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

        if (sMode === "add") {
          // Add new employee
          aEmployees.push(oEmployee);
          MessageToast.show(oResourceBundle.getText("addSuccess"), {
            duration: 3000,
            width: "15em"
          });
        } else {
          // Update existing employee
          var iIndex = aEmployees.findIndex(emp => emp.id === oEmployee.id);
          if (iIndex !== -1) {
            aEmployees[iIndex] = oEmployee;
            MessageToast.show(oResourceBundle.getText("saveSuccess"), {
              duration: 3000,
              width: "15em"
            });
          }
        }

        // Update model and close dialog
        oModel.setProperty("/employeeData", aEmployees);

        // Force refresh of the model to trigger all bindings
        oModel.refresh(true);

        this._oEmployeeDialog.close();
      },

      /* Cancels dialog operation*/
      onCancelDialog: function () {
        this._oEmployeeDialog.close();
      },

      /* Refreshes the employee list */
      onRefresh: function () {
        var oModel = this.getView().getModel("EmployeeV2Model");
        oModel.setProperty("/tableLoading", true);

        // Simulate refresh delay
        setTimeout(function () {
          oModel.setProperty("/tableLoading", false);
          MessageToast.show("Data refreshed", {
            duration: 2000,
            width: "10em"
          });
        }, 500);
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
  }
);
