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
var TimePicker_1 = require("react-times/lib/components/TimePicker");
require("react-times/css/material/default.css");
require("react-times/css/classic/default.css");
var icons_1 = require("react-times/lib/utils/icons");
require('moment/min/locales');
/**
 * DatePicker and Time Picker input for Form
 */
var FormDateTimePicker = /** @class */ (function (_super) {
    __extends(FormDateTimePicker, _super);
    function FormDateTimePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        moment.locale(Helper_1.Helper.getLanguage());
        var hour = '';
        var minute = '';
        var date = new Date();
        var dateTimeValue = _this.props.control.Value ? _this.props.control.Value : _this.ConfigProperties.defaultDateTime;
        var dateMomen = moment(new Date());
        if (dateTimeValue) {
            dateMomen = moment.utc(dateTimeValue);
        }
        date = dateMomen.toDate();
        hour = dateMomen.toDate().getHours().toString();
        minute = dateMomen.toDate().getMinutes().toString();
        _this.state = {
            isValid: true,
            date: date,
            currentValue: _this.props.control.Value || '',
            currentError: undefined,
            minute: minute,
            hour: hour,
            focused: false
        };
        _this._validateDateTimePickerProps(_this.ConfigProperties);
        return _this;
    }
    FormDateTimePicker.prototype._pad = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    /**
     * Render a Fabric DatePicker
     */
    FormDateTimePicker.prototype.render = function () {
        var _this = this;
        var firstDayOfWeek = office_ui_fabric_react_1.DayOfWeek.Monday;
        if (this.ConfigProperties.firstDayOfWeek)
            firstDayOfWeek = this.ConfigProperties.firstDayOfWeek;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement("div", { className: "md-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col", style: { width: this.ConfigProperties.shortDateFormat == true ? 110 : 145 } },
                        React.createElement(DatePicker_1.DatePicker, __assign({}, this.ConfigProperties, { 
                            // These props cannot be overridden
                            ref: function (input) { return _this.innerControl = input; }, strings: Helper_1.Helper.getDayPickerStrings(), firstDayOfWeek: firstDayOfWeek, formatDate: this._onFormatDateTo, key: this.props.inputKey, label: '', value: this.state.currentValue ? moment.utc(this.state.currentValue).toDate() : this.state.date, onSelectDate: this._onDateChanged }))),
                    React.createElement("div", { className: "ms-Grid-col" },
                        React.createElement(TimePicker_1.default, __assign({ theme: "classic" }, this.ConfigProperties, { trigger: (React.createElement("div", { className: "timePickerIcon", onClick: this.handleFocusedChange },
                                React.createElement("div", null, icons_1.default.time),
                                React.createElement("div", null, this._pad(this.state.hour, 2) + ":" + this._pad(this.state.minute, 2)))), focused: this.state.focused, onFocusChange: this.onFocusChange, onHourChange: this.onHourChange, onMinuteChange: this.onMinuteChange, onTimeChange: this.onTimeChange, language: Helper_1.Helper.getLanguage(), time: this.state.hour && this.state.minute ? this._pad(this.state.hour, 2) + ":" + this._pad(this.state.minute, 2) : null })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col" }, this.state.currentError && Rendering_1.default.renderError(this.state.currentError))))));
    };
    FormDateTimePicker.prototype.onHourChange = function (hour) {
        this.setState({ hour: hour });
    };
    FormDateTimePicker.prototype.onMinuteChange = function (minute) {
        this.setState({ minute: minute });
    };
    FormDateTimePicker.prototype.onTimeChange = function (time) {
        var _a = time.split(':'), hour = _a[0], minute = _a[1];
        this.setState({ hour: hour, minute: minute });
        var momentDate = moment.utc(this.state.date);
        momentDate = momentDate.set("m", parseInt(this.state.minute));
        momentDate.set("h", parseInt(this.state.hour));
        this.setValue(momentDate.toJSON());
    };
    FormDateTimePicker.prototype.onFocusChange = function (focused) {
        this.setState({ focused: focused });
    };
    FormDateTimePicker.prototype.handleFocusedChange = function () {
        var focused = this.state.focused;
        this.setState({ focused: !focused });
    };
    /**
     * Return for the UI Formated To Date and store it to the state.
     */
    FormDateTimePicker.prototype._onFormatDateTo = function (date) {
        moment.locale(Helper_1.Helper.getLanguage());
        var dateFormat = this.ConfigProperties.shortDateFormat == true ? "L" : "LL";
        return moment(date).format(dateFormat);
    };
    FormDateTimePicker.prototype._onDateChanged = function (date) {
        var momentDate = moment(date).set("m", parseInt(this.state.minute));
        momentDate.set("h", parseInt(this.state.hour));
        this.setValue(momentDate.toJSON());
    };
    FormDateTimePicker.prototype._validateDateTimePickerProps = function (props) {
        this.validateProps(props);
        if (props) {
            if (props.onSelectDate) {
                console.warn("FormDateTimePicker: 'onSelectDate' prop was specified and will be ignored");
            }
            if (props.firstDayOfWeek) {
                console.warn("FormDateTimePicker: 'firstDayOfWeek' prop was specified and will be ignored");
            }
            if (props.formatDate) {
                console.warn("FormDateTimePicker: 'formatDate' prop was specified and will be ignored");
            }
            if (props.strings) {
                console.warn("FormDateTimePicker: 'strings' prop was specified and will be ignored");
            }
            if (props.focused) {
                console.warn("FormTimePicker: 'focused' prop was specified and will be ignored");
            }
            if (props.onFocusChange) {
                console.warn("FormTimePicker: 'onFocusChange' prop was specified and will be ignored");
            }
            if (props.onHourChange) {
                console.warn("FormTimePicker: 'onHourChange' prop was specified and will be ignored");
            }
            if (props.onMinuteChange) {
                console.warn("FormTimePicker: 'onMinuteChange' prop was specified and will be ignored");
            }
            if (props.onTimeChange) {
                console.warn("FormTimePicker: 'onTimeChange' prop was specified and will be ignored");
            }
            if (props.language) {
                console.warn("FormTimePicker: 'language' prop was specified and will be ignored");
            }
            if (props.time) {
                console.warn("FormTimePicker: 'time' prop was specified and will be ignored");
            }
        }
    };
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "onHourChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "onMinuteChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "onTimeChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "onFocusChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "handleFocusedChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "_onFormatDateTo", null);
    __decorate([
        Utilities_1.autobind
    ], FormDateTimePicker.prototype, "_onDateChanged", null);
    return FormDateTimePicker;
}(FormBaseInput_1.FormBaseInput));
exports.FormDateTimePicker = FormDateTimePicker;
//# sourceMappingURL=FormDateTimePicker.js.map