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
require("../../styles/FormDatePicker.css");
var React = require("react");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var Helper_1 = require("../../Helper");
var moment = require("moment");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var Rendering_1 = require("../../form/Rendering");
require('moment/min/locales');
/**
 * DatePicker input for Form
 */
var FormDatePicker = /** @class */ (function (_super) {
    __extends(FormDatePicker, _super);
    function FormDatePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value,
            currentError: undefined
        };
        _this._validateDatePickerProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render a Fabric DatePicker
     */
    FormDatePicker.prototype.render = function () {
        var _this = this;
        var firstDayOfWeek = office_ui_fabric_react_1.DayOfWeek.Monday;
        if (this.ConfigProperties.firstDayOfWeek)
            firstDayOfWeek = this.ConfigProperties.firstDayOfWeek;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement("div", { className: "form-date-picker formDatePicker" },
                React.createElement(DatePicker_1.DatePicker, __assign({}, this.ConfigProperties, { 
                    // These props cannot be overridden
                    ref: function (input) { return _this.innerControl = input; }, strings: Helper_1.Helper.getDayPickerStrings(), firstDayOfWeek: firstDayOfWeek, formatDate: this._onFormatDateTo, key: this.props.inputKey, label: '', value: this.state.currentValue ? moment.utc(this.state.currentValue).toDate() : undefined, onSelectDate: this._onDateChanged })),
                this.state.currentError && Rendering_1.default.renderError(this.state.currentError))));
    };
    /**
     * Return for the UI Formated To Date and store it to the state.
     * @param date The date to formate
     */
    FormDatePicker.prototype._onFormatDateTo = function (date) {
        moment.locale(Helper_1.Helper.getLanguage());
        var dateFormat = this.ConfigProperties.shortDateFormat == true ? "L" : "LL";
        return moment(date).format(dateFormat);
    };
    /**
     * Stores the selected date as utc
     * @param date the selected date
     */
    FormDatePicker.prototype._onDateChanged = function (date) {
        this.setValue(moment(date).toJSON());
    };
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    FormDatePicker.prototype._validateDatePickerProps = function (props) {
        this.validateProps(props);
        if (props) {
            if (props.onSelectDate) {
                console.warn("FormDatePicker: 'onSelectDate' prop was specified and will be ignored");
            }
            if (props.formatDate) {
                console.warn("FormDatePicker: 'formatDate' prop was specified and will be ignored");
            }
            if (props.strings) {
                console.warn("FormDatePicker: 'strings' prop was specified and will be ignored");
            }
        }
    };
    __decorate([
        Utilities_1.autobind
    ], FormDatePicker.prototype, "_onFormatDateTo", null);
    __decorate([
        Utilities_1.autobind
    ], FormDatePicker.prototype, "_onDateChanged", null);
    return FormDatePicker;
}(FormBaseInput_1.FormBaseInput));
exports.FormDatePicker = FormDatePicker;
//# sourceMappingURL=FormDatePicker.js.map