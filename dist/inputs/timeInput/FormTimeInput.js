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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MaskedInput = require('react-maskedinput/lib/index');
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var moment = require("moment");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var Rendering_1 = require("../../form/Rendering");
/**
 * TextBox input for the Form.
 */
var FormTimeInput = /** @class */ (function (_super) {
    __extends(FormTimeInput, _super);
    function FormTimeInput(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        _this.hideSeconds = _this.ConfigProperties.hideSeconds != undefined ? _this.ConfigProperties.hideSeconds : false;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        return _this;
    }
    /**
     * Render a Fabric TextBox
     */
    FormTimeInput.prototype.render = function () {
        var _this = this;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(MaskedInput, { title: this.ConfigProperties.title, ref: function (input) { return _this.innerControl = input; }, placeholder: this.hideSeconds ? "hh:mm" : "hh:mm:ss", mask: this.hideSeconds ? "11:11" : "11:11:11", className: !this.state.isValid ? "timePickerInvalid" : null, name: this.props.inputKey, value: this.state.currentValue != undefined ? this._getTimeFromSeconds(this.state.currentValue, this.hideSeconds) : this.state.currentText, onBlur: this.validateTime }),
            this.state.currentError && Rendering_1.default.renderError(this.state.currentError)));
    };
    /**
     * Validate the Input string.
     */
    FormTimeInput.prototype.validateTime = function (event) {
        var value = event.target["value"];
        if (value == "" && this.IsRequired) {
            this.setControlToInValid(value);
            return false;
        }
        if (value == "" && !this.IsRequired) {
            this.setState({
                currentText: value,
                currentValue: undefined,
                isValid: true,
            });
            return true;
        }
        if (!this._isTimeStringValid(value, this.hideSeconds)) {
            this.setControlToInValid(value);
            return false;
        }
        var timeValue = this._getSecondsFromTime(value);
        if (this.ConfigProperties.maxSeconds != undefined && timeValue > this.ConfigProperties.maxSeconds) {
            timeValue = this.ConfigProperties.maxSeconds;
            this.setControlToInValid(this._getTimeFromSeconds(this.ConfigProperties.maxSeconds, this.hideSeconds));
            return false;
        }
        this.setValue(timeValue, true);
        return true;
    };
    /**
     * Convert the time string in seconds
     */
    FormTimeInput.prototype._getSecondsFromTime = function (value) {
        return moment.duration(value).asSeconds();
    };
    /**
     * Convert the number in seconds to an time string
     */
    FormTimeInput.prototype._getTimeFromSeconds = function (value, hideSeconds) {
        if (value == 86400)
            return hideSeconds ? "24:00" : "24:00:00";
        var d = moment.duration({ s: value });
        var time = moment().startOf('day').add(d).format(hideSeconds ? 'HH:mm' : 'HH:mm:ss');
        return time;
    };
    /**
     * Convert the number in seconds to an time string
     */
    FormTimeInput.prototype._isTimeStringValid = function (value, hideSeconds) {
        var timeParts = value.split(":");
        if ((hideSeconds && timeParts.length != 2) || (!hideSeconds && timeParts.length != 3))
            return false;
        var hours = parseInt(timeParts[0]);
        var minutes = parseInt(timeParts[1]);
        var seconds = hideSeconds ? 0 : parseInt(timeParts[2]);
        if (hours < 0 || hours > 24)
            return false;
        if (hours == 24 && (minutes != 0 || seconds != 0))
            return false;
        if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59)
            return false;
        return true;
    };
    /**
     * Set the Control to Invalid
     */
    FormTimeInput.prototype.setControlToInValid = function (value) {
        var control = document.getElementsByName(this.props.inputKey);
        if (control.length > 0)
            control[0].focus();
        this.setState({
            currentText: value,
            currentValue: undefined,
            isValid: false,
        });
    };
    __decorate([
        Utilities_1.autobind
    ], FormTimeInput.prototype, "validateTime", null);
    __decorate([
        Utilities_1.autobind
    ], FormTimeInput.prototype, "setControlToInValid", null);
    return FormTimeInput;
}(FormBaseInput_1.FormBaseInput));
exports.FormTimeInput = FormTimeInput;
//# sourceMappingURL=FormTimeInput.js.map