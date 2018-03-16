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
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
/**
 * TextBox input for the Form.
 */
var FormTextInput = /** @class */ (function (_super) {
    __extends(FormTextInput, _super);
    function FormTextInput(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        _this._validateTextFieldProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render a Fabric TextBox
     */
    FormTextInput.prototype.render = function () {
        var _this = this;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(TextField_1.TextField, __assign({ value: this.state.currentValue }, this.ConfigProperties, { ref: function (input) { return _this.innerControl = input; }, id: this.props.inputKey, key: this.props.inputKey, name: this.props.inputKey, label: "", onBeforeChange: this._onChange, errorMessage: this.state.currentError }))));
    };
    /**
     * Stores the text of the textfield to the state.
     * @param value string to store
     */
    FormTextInput.prototype._onChange = function (value) {
        this.setValue(value, true);
    };
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    FormTextInput.prototype._validateTextFieldProps = function (props) {
        this.validateProps(props);
        if (props) {
            if (props.errorMessage) {
                console.warn("FormTextBox: 'errorMessage' prop was specified and will be ignored");
            }
            if (props.onBeforeChange) {
                console.warn("FormTextBox: 'onBeforeChange' prop was specified and will be ignored");
            }
            if (props.onBlur) {
                console.warn("FormTextBox: 'onBlur' prop was specified and will be ignored");
            }
        }
    };
    __decorate([
        Utilities_1.autobind
    ], FormTextInput.prototype, "_onChange", null);
    return FormTextInput;
}(FormBaseInput_1.FormBaseInput));
exports.FormTextInput = FormTextInput;
//# sourceMappingURL=FormTextInput.js.map