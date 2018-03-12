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
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
/**
 * Checkbox input for the Form. Displays a boolean value as a checkbox
 */
var FormCheckBox = /** @class */ (function (_super) {
    __extends(FormCheckBox, _super);
    function FormCheckBox(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        _this.validateProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render a checkbox
     */
    FormCheckBox.prototype.render = function () {
        var _this = this;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith, ControlWith: 1 },
            React.createElement("div", { style: { marginTop: 5 } },
                React.createElement(Checkbox_1.Checkbox, __assign({ defaultChecked: this.state.currentValue ? this.state.currentValue : undefined }, this.ConfigProperties, { 
                    // These props cannot be overridden
                    ref: function (input) { return _this.innerControl = input; }, id: this.props.inputKey, key: this.props.inputKey, label: "", name: this.props.inputKey, onChange: this._onChange }))),
            this.state.currentValue && this.state.currentValue == true &&
                this.props.children));
    };
    FormCheckBox.prototype._onChange = function (event, isChecked) {
        this.setValue(isChecked);
    };
    __decorate([
        Utilities_1.autobind
    ], FormCheckBox.prototype, "_onChange", null);
    return FormCheckBox;
}(FormBaseInput_1.FormBaseInput));
exports.FormCheckBox = FormCheckBox;
//# sourceMappingURL=FormCheckBox.js.map