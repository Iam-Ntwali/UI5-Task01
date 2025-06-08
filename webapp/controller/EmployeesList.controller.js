sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/UIComponent",
        "ui5task01/model/formater",
    ],
    function (Controller, Filter, FilterOperator, UIComponent, NumberFormatter) {
        "use strict";

        return Controller.extend("ui5task01.controller.EmployeesList", {

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

            onEmployeeSelect: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                if (oSelectedItem) {
                    var oBindingContext =
                        oSelectedItem.getBindingContext("EmployeeV2Model");
                    var nEmployeeId = oBindingContext.getProperty("id");
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("employeeDetail", {
                        employeeId: nEmployeeId.toString(),
                    });
                }
            },

            onEmployeePress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext("EmployeeV2Model");
                var sId = oContext.getProperty("id");

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("EmployeeDetail", { employeeId: sId });
            },

            onFilterEmployees: function (oEvent) {
                var oModel = this.getOwnerComponent().getModel("EmployeeV2Model");
                if (oModel) {
                    oModel.setProperty("/tableLoading", true);
                }

                var sQuery =
                    oEvent.getParameter("newValue") || oEvent.getParameter("query");
                var oTable = this.byId("employeeTable");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];

                if (sQuery && sQuery.length > 0) {
                    var oFilterName = new Filter("name", FilterOperator.Contains, sQuery);
                    var oFilterRole = new Filter("role", FilterOperator.Contains, sQuery);

                    var aAllFilters = [oFilterName, oFilterRole];

                    if (!isNaN(sQuery) && sQuery.trim() !== "") {
                        var oFilterId = new Filter(
                            "id",
                            FilterOperator.EQ,
                            parseInt(sQuery, 10)
                        );
                        aAllFilters.push(oFilterId);
                    }

                    var oCombinedFilter = new Filter({
                        filters: aAllFilters,
                        and: false,
                    });

                    aFilters.push(oCombinedFilter);
                }

                oBinding.filter(aFilters);

                setTimeout(function () {
                    if (oModel) {
                        oModel.setProperty("/tableLoading", false);
                    }
                }, 2000);
            },
        });
    }
);
