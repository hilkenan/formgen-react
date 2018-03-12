"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var Helper_1 = require("../../Helper");
var Rendering_1 = require("../../form/Rendering");
/**
 * Spin Button input for the Form.
 */
var FormSpinButton = /** @class */ (function (_super) {
    __extends(FormSpinButton, _super);
    function FormSpinButton(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        _this.sufixToUse = _this.ConfigProperties.sufix ?
            " " + _this.ConfigProperties.sufix : '';
        _this.stepValue = _this.ConfigProperties.step != undefined ? _this.ConfigProperties.step : 1;
        return _this;
    }
    /**
     * Render a Fabric SpinButton
     */
    FormSpinButton.prototype.render = function () {
        var _this = this;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(office_ui_fabric_react_1.SpinButton, __assign({ value: this.state.currentValue + this.sufixToUse }, this.ConfigProperties, { ref: function (input) { return _this.innerControl = input; }, key: this.props.inputKey, label: "", onValidate: this.onValidate, onIncrement: this.onIncrement, onDecrement: this.onDecrement })),
            this.state.currentError && Rendering_1.default.renderError(this.state.currentError)));
    };
    /**
     * Event for Validating
     */
    FormSpinButton.prototype.onValidate = function (value) {
        value = Helper_1.Helper.removeSuffix(value, this.sufixToUse);
        if (isNaN(+value)) {
            return '0' + this.sufixToUse;
        }
        var newValue = +value;
        this.setValue(newValue, true);
        return String(value) + this.sufixToUse;
    };
    /**
     * Event for Inkrementing
     */
    FormSpinButton.prototype.onIncrement = function (value) {
        value = Helper_1.Helper.removeSuffix(value, this.sufixToUse);
        var newValue = +value + this.stepValue;
        this.setValue(newValue, true);
        return String(newValue) + this.sufixToUse;
    };
    /**
     * Event for Dekrementing
     */
    FormSpinButton.prototype.onDecrement = function (value) {
        value = Helper_1.Helper.removeSuffix(value, this.sufixToUse);
        var newValue = +value - this.stepValue;
        this.setValue(newValue, true);
        return String(newValue) + this.sufixToUse;
    };
    __decorate([
        Utilities_1.autobind
    ], FormSpinButton.prototype, "onValidate", null);
    __decorate([
        Utilities_1.autobind
    ], FormSpinButton.prototype, "onIncrement", null);
    __decorate([
        Utilities_1.autobind
    ], FormSpinButton.prototype, "onDecrement", null);
    return FormSpinButton;
}(FormBaseInput_1.FormBaseInput));
exports.FormSpinButton = FormSpinButton;
//# sourceMappingURL=FormSpinButton.js.map