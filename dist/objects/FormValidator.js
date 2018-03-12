"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var Enums_1 = require("../Enums");
var ValidatorTypeConverter_1 = require("./jsonConverters/ValidatorTypeConverter");
var TransConverter_1 = require("./jsonConverters/TransConverter");
var FormValidator = /** @class */ (function () {
    function FormValidator() {
        this.Message = "";
        this.ValidatorType = Enums_1.ValidatorTypes.Required;
        this.MessageTranslates = undefined;
        this.Value = 0;
        this.Regex = "";
        this.CustomTypeName = "";
    }
    __decorate([
        json2typescript_1.JsonProperty("message", String, true)
    ], FormValidator.prototype, "Message", void 0);
    __decorate([
        json2typescript_1.JsonProperty("validator_type", ValidatorTypeConverter_1.ValidatorTypeConverter)
    ], FormValidator.prototype, "ValidatorType", void 0);
    __decorate([
        json2typescript_1.JsonProperty("message_trans", TransConverter_1.TransConverter, true)
    ], FormValidator.prototype, "MessageTranslates", void 0);
    __decorate([
        json2typescript_1.JsonProperty("value", Number, true)
    ], FormValidator.prototype, "Value", void 0);
    __decorate([
        json2typescript_1.JsonProperty("regex", String, true)
    ], FormValidator.prototype, "Regex", void 0);
    __decorate([
        json2typescript_1.JsonProperty("custom_type", String, true)
    ], FormValidator.prototype, "CustomTypeName", void 0);
    FormValidator = __decorate([
        json2typescript_1.JsonObject
    ], FormValidator);
    return FormValidator;
}());
exports.FormValidator = FormValidator;
//# sourceMappingURL=FormValidator.js.map