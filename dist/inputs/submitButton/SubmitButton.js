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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var LocalsCommon_1 = require("../../locales/LocalsCommon");
/**
 * Submit button for the form which is disabled when the form is invalid
 */
var SubmitButton = /** @class */ (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton(props, context) {
        var _this = _super.call(this, props, context, true) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        _this.validateProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Render Primary Button
     */
    SubmitButton.prototype.render = function () {
        var _this = this;
        var submitText = this.commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.buttonSend);
        return (React.createElement(Button_1.PrimaryButton, __assign({ ref: function (input) { return _this.innerControl = input; }, key: this.props.inputKey, type: 'submit', disabled: !this.formContext.isFormValid() }, this.ConfigProperties), this.props.control.Title ? this.TranslatedTitle : submitText));
    };
    return SubmitButton;
}(FormBaseInput_1.FormBaseInput));
exports.SubmitButton = SubmitButton;
//# sourceMappingURL=SubmitButton.js.map