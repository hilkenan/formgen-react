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
require("rc-cascader/assets/index.css");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var utilities_1 = require("@uifabric/utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var lib_1 = require("office-ui-fabric-react/lib");
var Helper_1 = require("../../Helper");
var Cascader = require('rc-cascader/lib/Cascader');
/**
 * Cascading Dropdown input for Form. Use rc-cascader
 */
var FormCascader = /** @class */ (function (_super) {
    __extends(FormCascader, _super);
    function FormCascader(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.optionsDataStore = _this.props.inputKey + "_options";
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined,
        };
        _this.validateProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render a Cascading Drop Down from rs-cascader
     */
    FormCascader.prototype.render = function () {
        var _this = this;
        var optionsEntry = this.state.dataStores.find(function (e) { return e.key == _this.optionsDataStore; });
        var placeHolder = Helper_1.Helper.getPlaceHolderText(optionsEntry, this.ConfigProperties.placeHolder);
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(Cascader, __assign({ popupClassName: "cascaderPopupClassName", onChange: this._onChange, ref: function (input) { return _this.innerControl = input; } }, this.ConfigProperties, { options: optionsEntry.data, id: this.props.inputKey }),
                React.createElement(lib_1.TextField, { key: this.props.inputKey, name: this.props.inputKey, placeholder: placeHolder, disabled: optionsEntry.onLoading, errorMessage: this.getErrorMessage(), readOnly: true, label: "", value: this._getLabels(this.state.currentValue) }))));
    };
    /**
     * Store the selected Value as JSON in the form state.
     * @param value Value string to store
     * @param selectedOptions the Selected options with the full data
     */
    FormCascader.prototype._onChange = function (value, selectedOptions) {
        this.setValue(selectedOptions);
    };
    /**
     * Get the correct Label Value set.
     */
    FormCascader.prototype._getLabels = function (options) {
        if (!options)
            return undefined;
        return options.map(function (o) { return o.label; }).join(', ');
    };
    __decorate([
        utilities_1.autobind
    ], FormCascader.prototype, "_onChange", null);
    return FormCascader;
}(FormBaseInput_1.FormBaseInput));
exports.FormCascader = FormCascader;
//# sourceMappingURL=FormCascader.js.map