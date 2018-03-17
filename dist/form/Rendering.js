"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Helper_1 = require("../Helper");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var FormInputs_1 = require("./FormInputs");
/**
 * Rendering Engine for the Form
 */
var Rendering = /** @class */ (function () {
    /**
     * Initialize all arrays with the params and load the control mapping.
     */
    function Rendering(getCurrentFormData, customControls, customValidators, customActions, dataBinders, formInputs, cancelEvent) {
        this.controls = [];
        this.customValidators = [];
        this.customActions = [];
        this.dataBinders = [];
        this.controls = formInputs ? formInputs.getStandartControls() : (new FormInputs_1.FormInputs).getStandartControls();
        if (customControls)
            (_a = this.controls).push.apply(_a, customControls);
        if (customValidators)
            this.customValidators = customValidators;
        if (cancelEvent)
            this.cancelEvent = cancelEvent;
        if (customActions)
            this.customActions = customActions;
        if (dataBinders)
            this.dataBinders = dataBinders;
        this.getCurrentFormData = getCurrentFormData;
        var _a;
    }
    /**
    * Call the Custom Action Event with the Form Data
    * @param customAction Custom Action to call with the form data.
    */
    Rendering.prototype.callCustomEvent = function (customAction) {
        if (customAction)
            customAction.actionType(this.getCurrentFormData());
    };
    /**
    * Build the Controls rendered control
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param controls The Control definition to load the control types with.
    * @param labelWith Defined Label with form the parent column
    */
    Rendering.prototype.buildControlElements = function (rootKey, controls, labelWith) {
        var ctrlElements = [];
        if (!controls)
            return ctrlElements;
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var ctrl = controls_1[_i];
            ctrlElements.push(ctrl.getControlElement(this, rootKey, labelWith));
        }
        return ctrlElements;
    };
    /**
    * Build the Column Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param columns The columns definition to load
    */
    Rendering.prototype.buildColElements = function (rootKey, columns) {
        var colElements = [];
        var cssNr = Helper_1.Helper.calculateCssClassColNb(columns.length);
        var counter = 0;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            var className = col.CssClass ? col.CssClass : "";
            colElements.push(React.createElement("div", { key: rootKey + "col" + counter, style: col.Styles ? col.Styles : undefined, className: "colElements ms-sm" + cssNr + " " + className }, this.buildControlElements(rootKey, col.Controls, col.LabelWith)));
            counter++;
        }
        return colElements;
    };
    /**
    * Build the Rows Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param rows The rows to load to the tree
    */
    Rendering.prototype.buildRowWlements = function (rootKey, rows) {
        var rowElements = [];
        if (!rows)
            return rowElements;
        var counter = 0;
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            rowElements.push(React.createElement("div", { key: rootKey + "row" + counter, className: 'rowElements' }, this.buildColElements(rootKey, row.Columns)));
            counter++;
        }
        return rowElements;
    };
    /**
    * Renders an Error div.
    * @param errorMessage The Error Message to show in the div.
    */
    Rendering.renderError = function (errorMessage) {
        return (React.createElement("div", { className: office_ui_fabric_react_1.css('forminputError') },
            React.createElement(office_ui_fabric_react_1.Icon, { iconName: 'Error' }),
            errorMessage));
    };
    return Rendering;
}());
exports.default = Rendering;
//# sourceMappingURL=Rendering.js.map