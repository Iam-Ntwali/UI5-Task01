sap.ui.define([], function () {
  "use strict";

  return {
    formatCurrency: function (value) {
      if (!value || isNaN(value)) {
        return "$0";
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      return (
        "$" +
        numValue.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    },

    // Misc formatter functions
    formatEmployeeId: function (id) {
      return id ? `EMP-${String(id).padStart(3, "0")}` : "";
    },

    /* Formats employee count for display */
    formatEmployeeCount: function (employeeData) {
      if (!employeeData || !Array.isArray(employeeData)) {
        return 0;
      }
      return employeeData.length;
    },

    formatDepartmentIcon: function (department) {
      switch (department) {
        case "IT":
          return "sap-icon://technical-object";
        case "Finance":
          return "sap-icon://money-bills";
        case "Human Resources":
          return "sap-icon://group";
        case "Management":
          return "sap-icon://manager";
        default:
          return "sap-icon://building";
      }
    },

    formatInitials: function (name) {
      if (!name) return "";
      return name
        .split(" ")
        .map(function (n) {
          return n[0];
        })
        .join("")
        .toUpperCase();
    },
  };
});
