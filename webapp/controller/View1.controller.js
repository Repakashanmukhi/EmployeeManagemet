sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";
    return Controller.extend("employeemanagement.controller.View1", {
        onInit: function () {
            // Initialize a JSONModel to store employee data
            var oEmployeeModel = new JSONModel({
                Employees: []
            });
            this.getView().setModel(oEmployeeModel, "employeeModel");
        },
        Submitfun: function () {
            var oView = this.getView();
            var oEmployeeModel = this.getView().getModel("employeeModel");
            var aEmployees = oEmployeeModel.getProperty("/Employees");
            // Get input values
            var sEmpId = oView.byId("page").getContent()[1].getContent()[1].getValue();
            var sName = oView.byId("page").getContent()[1].getContent()[3].getValue();
            var sEmail = oView.byId("page").getContent()[1].getContent()[5].getValue();
            var sAddress = oView.byId("page").getContent()[1].getContent()[7].getValue();
            var sMobileNo = oView.byId("page").getContent()[1].getContent()[9].getValue();
            if (sEmpId && sName && sEmail && sAddress && sMobileNo) {
                // Create a new employee object
                var oNewEmployee = {
                    EmpId: sEmpId,
                    Name: sName,
                    Email: sEmail,
                    Address: sAddress,
                    MobileNo: sMobileNo
                };
                // Add the new employee to the array
                aEmployees.push(oNewEmployee);
                // Update the model with the new data
                oEmployeeModel.setProperty("/Employees", aEmployees);
                // Clear form fields
                this._clearFormFields();
                // Show success message
                MessageToast.show("Employee details submitted successfully.");
            } else {
                // Show error message if any field is missing
                MessageToast.show("Please fill all fields before submitting.");
            }
        },
        Restfun: function () {
            this._clearFormFields();
            MessageToast.show("Form reset successfully.");
        },
        _clearFormFields: function () {
            var oView = this.getView();
            var Fields = oView.byId("page").getContent()[1].getContent();
            Fields[1].setValue("");
            Fields[3].setValue("");
            Fields[5].setValue("");
            Fields[7].setValue("");
            Fields[9].setValue("");
        },
        onValidateName: function () {
            var sName = this.byId("idInputField").getValue(); 
            // Function to check if the name is valid
            function isValidName(name) {
                for (let i = 0; i < name.length; i++) {
                    const char = name[i];
                    if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || char === ' ')) {
                        return false; 
                    }
                }
                return true; 
            }
            if (!sName || !isValidName(sName)) {
                MessageToast.show("Please enter a valid name (letters and spaces only)");
                return;
            }
            MessageToast.show("Name is valid!");
        }
    });
});




