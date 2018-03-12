"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var json2typescript_1 = require("json2typescript");
var ObjectTranslate_1 = require("./ObjectTranslate");
var ControlConverter_1 = require("./jsonConverters/ControlConverter");
var RowConverter_1 = require("./jsonConverters/RowConverter");
var ControlTypeConverter_1 = require("./jsonConverters/ControlTypeConverter");
var Enums_1 = require("../Enums");
var LabelPositionConverter_1 = require("./jsonConverters/LabelPositionConverter");
var TransConverter_1 = require("./jsonConverters/TransConverter");
var Validators_1 = require("../validators/Validators");
var Helper_1 = require("../Helper");
var FormValidator_1 = require("./FormValidator");
var ActionLink_1 = require("./ActionLink");
var LocalsCommon_1 = require("../locales/LocalsCommon");
/**
 * Data Class for the Control
 */
var Control = /** @class */ (function () {
    function Control() {
        this.ID = "";
        this.Title = undefined;
        this.Info = undefined;
        this.Value = undefined;
        this.ReadOnly = false;
        this.TitleTranslates = undefined;
        this.RequiredMessageTranslates = undefined;
        this.ConfigTranslation = undefined;
        this.InfoTranslates = undefined;
        this.InfoAction = undefined;
        this.SubRows = undefined;
        this.SubControls = undefined;
        this.SubControlLabwlWith = undefined;
        this.Config = undefined;
        this.RenderType = Enums_1.ControlTypes.Textbox;
        this.CustomTypeName = "";
        this.LabelPosition = Enums_1.LabelPositions.Top;
        this.CssClass = undefined;
        this.DataBinders = [];
        this.Styles = undefined;
        this.FormValidators = [];
    }
    /**
     * Get the Control element ans JSX Element back includes all needed configs
     * @param rendering Rendering Engine with the types that can be used.
     * @param rootKey The Key for the control (root) like form.firstControl.secondControl
     * @param labelWith The Css Number from UI Fabric for the with 1-12
     */
    Control.prototype.getControlElement = function (rendering, rootKey, labelWith) {
        var _this = this;
        var tag = this.RenderType == Enums_1.ControlTypes.Custom ?
            rendering.controls.find(function (t) { return t.typeName == _this.CustomTypeName; }) :
            rendering.controls.find(function (t) { return t.typeName == _this.RenderType; });
        var element = (React.createElement("div", null));
        var key = rootKey + "." + this.ID;
        var inputKey = Helper_1.Helper.cleanUpKey(key);
        if (tag) {
            var TagName = tag.controlType;
            var validators = this._getConfiguredValidators(rendering);
            var usedDataBinder = [];
            var _loop_1 = function (dataBinder) {
                var binder = rendering.dataBinders.find(function (b) { return b.typeName == inputKey + "_" + dataBinder; });
                if (binder) {
                    usedDataBinder.push(binder);
                }
            };
            for (var _i = 0, _a = this.DataBinders; _i < _a.length; _i++) {
                var dataBinder = _a[_i];
                _loop_1(dataBinder);
            }
            if (this.SubRows)
                element = React.createElement(TagName, { labelWith: labelWith, value: this.Value, dataBinder: usedDataBinder, key: key, inputKey: inputKey, control: this, validators: validators }, rendering.buildRowWlements(key + "/R", this.SubRows));
            else if (this.SubControls)
                element = React.createElement(TagName, { labelWith: labelWith, value: this.Value, dataBinder: usedDataBinder, key: key, inputKey: inputKey, control: this, validators: validators }, rendering.buildControlElements(key + "/E", this.SubControls, this.SubControlLabwlWith));
            else if (this.RenderType == Enums_1.ControlTypes.CancelButton && rendering.cancelEvent)
                element = React.createElement(TagName, { labelWith: labelWith, value: this.Value, dataBinder: usedDataBinder, onClick: rendering.cancelEvent, key: key, inputKey: inputKey, control: this, validators: validators });
            else if (this.RenderType == Enums_1.ControlTypes.CustomButton) {
                var action_1 = rendering.customActions.find(function (ca) { return ca.typeName == _this.CustomTypeName; });
                if (action_1)
                    element = React.createElement(TagName, { labelWith: labelWith, value: this.Value, dataBinder: usedDataBinder, onClick: function () { return rendering.callCustomEvent(action_1); }, key: key, inputKey: inputKey, control: this, validators: validators });
            }
            else
                element = React.createElement(TagName, { labelWith: labelWith, dataBinder: usedDataBinder, key: key, inputKey: inputKey, control: this, validators: validators });
        }
        return element;
    };
    /**
     * Get the validator that are configured back, includes the required validator if defined.
     * @param rendering Rendering Engine with the types that can be used.
     */
    Control.prototype._getConfiguredValidators = function (rendering) {
        var validators = [];
        if (this.FormValidators) {
            var _loop_2 = function (validator) {
                var message = Helper_1.Helper.getTranslatedMessage(Enums_1.TranslatedProperty.Message, validator, false);
                switch (validator.ValidatorType) {
                    case Enums_1.ValidatorTypes.Required:
                        if (!message && message == "") {
                            var commonFormater = Helper_1.Helper.getTranslator("common");
                            message = commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.required);
                        }
                        validators.push(Validators_1.Validators.required(message));
                        break;
                    case Enums_1.ValidatorTypes.Integer:
                        validators.push(Validators_1.Validators.isInteger(message));
                        break;
                    case Enums_1.ValidatorTypes.Number:
                        validators.push(Validators_1.Validators.isNumber(message));
                        break;
                    case Enums_1.ValidatorTypes.MaxLength:
                        validators.push(Validators_1.Validators.maxLength(validator.Value, function (length) { return message; }));
                        break;
                    case Enums_1.ValidatorTypes.MinLength:
                        validators.push(Validators_1.Validators.maxLength(validator.Value, function (length) { return message; }));
                        break;
                    case Enums_1.ValidatorTypes.Length:
                        validators.push(Validators_1.Validators.length(validator.Value, function (length) { return message; }));
                        break;
                    case Enums_1.ValidatorTypes.MinValue:
                        validators.push(Validators_1.Validators.minValue(validator.Value, function (bound) { return message; }));
                        break;
                    case Enums_1.ValidatorTypes.MaxValue:
                        validators.push(Validators_1.Validators.maxValue(validator.Value, function (bound) { return message; }));
                        break;
                    case Enums_1.ValidatorTypes.Regex:
                        var pattern = new RegExp(validator.Regex);
                        validators.push(Validators_1.Validators.regex(pattern, message));
                        break;
                    case Enums_1.ValidatorTypes.Custom:
                        var customValidator = rendering.customValidators.find(function (v) { return v.typeName == validator.CustomTypeName; });
                        if (customValidator)
                            validators.push(customValidator.validatorType);
                        break;
                }
            };
            for (var _i = 0, _a = this.FormValidators; _i < _a.length; _i++) {
                var validator = _a[_i];
                _loop_2(validator);
            }
        }
        return (validators.length == 0) ? undefined : validators;
    };
    __decorate([
        json2typescript_1.JsonProperty("id", String)
    ], Control.prototype, "ID", void 0);
    __decorate([
        json2typescript_1.JsonProperty("title", String, true)
    ], Control.prototype, "Title", void 0);
    __decorate([
        json2typescript_1.JsonProperty("info", String, true)
    ], Control.prototype, "Info", void 0);
    __decorate([
        json2typescript_1.JsonProperty("value", json2typescript_1.Any, true)
    ], Control.prototype, "Value", void 0);
    __decorate([
        json2typescript_1.JsonProperty("read_only", Boolean, true)
    ], Control.prototype, "ReadOnly", void 0);
    __decorate([
        json2typescript_1.JsonProperty("title_trans", TransConverter_1.TransConverter, true)
    ], Control.prototype, "TitleTranslates", void 0);
    __decorate([
        json2typescript_1.JsonProperty("required_trans", TransConverter_1.TransConverter, true)
    ], Control.prototype, "RequiredMessageTranslates", void 0);
    __decorate([
        json2typescript_1.JsonProperty("config_trans", ObjectTranslate_1.ObjectTranslate, true)
    ], Control.prototype, "ConfigTranslation", void 0);
    __decorate([
        json2typescript_1.JsonProperty("info_trans", TransConverter_1.TransConverter, true)
    ], Control.prototype, "InfoTranslates", void 0);
    __decorate([
        json2typescript_1.JsonProperty("info_action", ActionLink_1.ActionLink, true)
    ], Control.prototype, "InfoAction", void 0);
    __decorate([
        json2typescript_1.JsonProperty("subrows", RowConverter_1.RowConverter, true)
    ], Control.prototype, "SubRows", void 0);
    __decorate([
        json2typescript_1.JsonProperty("subcontrols", ControlConverter_1.ControlConverter, true)
    ], Control.prototype, "SubControls", void 0);
    __decorate([
        json2typescript_1.JsonProperty("subcontrol_label_with", Number, true)
    ], Control.prototype, "SubControlLabwlWith", void 0);
    __decorate([
        json2typescript_1.JsonProperty("config", json2typescript_1.Any, true)
    ], Control.prototype, "Config", void 0);
    __decorate([
        json2typescript_1.JsonProperty("control_type", ControlTypeConverter_1.ControlTypeConverter)
    ], Control.prototype, "RenderType", void 0);
    __decorate([
        json2typescript_1.JsonProperty("customtype_name", String, true)
    ], Control.prototype, "CustomTypeName", void 0);
    __decorate([
        json2typescript_1.JsonProperty("label_position", LabelPositionConverter_1.LabelPositionConverter, true)
    ], Control.prototype, "LabelPosition", void 0);
    __decorate([
        json2typescript_1.JsonProperty("css_class", String, true)
    ], Control.prototype, "CssClass", void 0);
    __decorate([
        json2typescript_1.JsonProperty("databinders", [String], true)
    ], Control.prototype, "DataBinders", void 0);
    __decorate([
        json2typescript_1.JsonProperty("styles", json2typescript_1.Any, true)
    ], Control.prototype, "Styles", void 0);
    __decorate([
        json2typescript_1.JsonProperty("validators", [FormValidator_1.FormValidator], true)
    ], Control.prototype, "FormValidators", void 0);
    Control = __decorate([
        json2typescript_1.JsonObject
    ], Control);
    return Control;
}());
exports.Control = Control;
//# sourceMappingURL=Control.js.map