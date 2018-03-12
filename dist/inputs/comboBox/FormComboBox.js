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
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var lib_1 = require("office-ui-fabric-react/lib");
var Helper_1 = require("../../Helper");
/**
 * ComboBox input for Form
 */
var FormComboBox = /** @class */ (function (_super) {
    __extends(FormComboBox, _super);
    function FormComboBox(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.optionsDataStore = _this.props.inputKey + "_options";
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value !== null &&
                _this.props.control.Value !== undefined ?
                _this.props.control.Value : '',
            currentError: undefined
        };
        _this.validateProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render a Fabric Dropdown
     */
    FormComboBox.prototype.render = function () {
        var _this = this;
        var optionsEntry = this.state.dataStores ?
            this.state.dataStores.find(function (e) { return e.key == _this.optionsDataStore; }) : undefined;
        var value = Helper_1.Helper.getPlaceHolderText(optionsEntry, this.ConfigProperties.value);
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(lib_1.ComboBox, __assign({ disabled: optionsEntry && optionsEntry.onLoading, className: "ms-ComboBox-FormInput" }, this.ConfigProperties, { 
                // These props cannot be overridden
                options: optionsEntry && optionsEntry.data ? optionsEntry.data : this.ConfigProperties.options, ref: function (input) { return _this.innerControl = input; }, id: this.props.inputKey, errorMessage: this.getErrorMessage(), onChanged: this._onChanged, value: this.state.currentValue == '' || !this.state.currentValue ? value : undefined, label: "", 
                //Its mutually exclusive, but not works correct without set value and selectedKey
                selectedKey: this.state.currentValue }))));
    };
    FormComboBox.prototype._onChanged = function (option, index, value) {
        var inputValue = option == undefined ? value : option.key;
        this.setValue(inputValue, true);
    };
    __decorate([
        Utilities_1.autobind
    ], FormComboBox.prototype, "_onChanged", null);
    return FormComboBox;
}(FormBaseInput_1.FormBaseInput));
exports.FormComboBox = FormComboBox;
//# sourceMappingURL=FormComboBox.js.map