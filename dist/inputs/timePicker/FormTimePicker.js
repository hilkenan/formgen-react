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
var Rendering_1 = require("../../form/Rendering");
var TimePicker_1 = require("react-times/lib/components/TimePicker");
require("react-times/css/material/default.css");
require("react-times/css/classic/default.css");
var Helper_1 = require("../../Helper");
/**
 * Time Picker Controls render an react-times control (classic or material theme)
 */
var FormTimePicker = /** @class */ (function (_super) {
    __extends(FormTimePicker, _super);
    function FormTimePicker(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        var hour = '';
        var minute = '';
        if (_this.props.control.Value) {
            _a = _this.props.control.Value.toString().split(/:/), hour = _a[0], minute = _a[1];
        }
        else if (_this.ConfigProperties.defaultTime) {
            _b = _this.ConfigProperties.defaultTime.split(/:/), hour = _b[0], minute = _b[1];
        }
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined,
            minute: minute,
            hour: hour,
            focused: false
        };
        _this._validateTimePickerProps(_this.ConfigProperties);
        return _this;
        var _a, _b;
    }
    /**
     * Render a Fabric react-times tiempicker
     */
    FormTimePicker.prototype.render = function () {
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement("div", { style: { width: 150 } },
                React.createElement(TimePicker_1.default, __assign({ theme: "classic" }, this.ConfigProperties, { focused: this.state.focused, onFocusChange: this.onFocusChange, onHourChange: this.onHourChange, onMinuteChange: this.onMinuteChange, onTimeChange: this.onTimeChange, language: Helper_1.Helper.getLanguage(), time: this.state.hour && this.state.minute ? this.state.hour + ":" + this.state.minute : null })),
                this.state.currentError && Rendering_1.default.renderError(this.state.currentError))));
    };
    /**
     * Stores the selected hour to the hour state.
     * @param hour the number hours to store
     */
    FormTimePicker.prototype.onHourChange = function (hour) {
        this.setState({ hour: hour });
    };
    /**
     * Stores the selected minut to the minut state.
     * @param minute the number minut to store
     */
    FormTimePicker.prototype.onMinuteChange = function (minute) {
        this.setState({ minute: minute });
    };
    /**
     * Stores the selected time to the value
     * @param time the time in format hh:mm
     */
    FormTimePicker.prototype.onTimeChange = function (time) {
        var _a = time.split(':'), hour = _a[0], minute = _a[1];
        this.setState({ hour: hour, minute: minute });
        this.setValue(hour + ":" + minute, true);
    };
    /**
     * Event when the focus has chanced
     * @param focused the current focus value
     */
    FormTimePicker.prototype.onFocusChange = function (focused) {
        this.setState({ focused: focused });
    };
    /**
     * Handels an focus change
     */
    FormTimePicker.prototype.handleFocusedChange = function () {
        var focused = this.state.focused;
        this.setState({ focused: !focused });
    };
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    FormTimePicker.prototype._validateTimePickerProps = function (props) {
        this.validateProps(props);
        if (props) {
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
    ], FormTimePicker.prototype, "onHourChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormTimePicker.prototype, "onMinuteChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormTimePicker.prototype, "onTimeChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormTimePicker.prototype, "onFocusChange", null);
    __decorate([
        Utilities_1.autobind
    ], FormTimePicker.prototype, "handleFocusedChange", null);
    return FormTimePicker;
}(FormBaseInput_1.FormBaseInput));
exports.FormTimePicker = FormTimePicker;
//# sourceMappingURL=FormTimePicker.js.map