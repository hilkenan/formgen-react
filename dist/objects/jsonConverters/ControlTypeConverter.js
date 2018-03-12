"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var Enums_1 = require("../../Enums");
/**
* Json Converter for a ControlType Enum
*/
var ControlTypeConverter = /** @class */ (function () {
    function ControlTypeConverter() {
    }
    ControlTypeConverter.prototype.serialize = function (controlType) {
        return JSON.parse("[\"" + controlType.toString() + "\"]");
    };
    ControlTypeConverter.prototype.deserialize = function (typeJson) {
        var value = JSON.stringify(typeJson[0]).replace("\"", "").replace("\"", "");
        return Enums_1.ControlTypes[value];
    };
    ControlTypeConverter = __decorate([
        json2typescript_1.JsonConverter
    ], ControlTypeConverter);
    return ControlTypeConverter;
}());
exports.ControlTypeConverter = ControlTypeConverter;
//# sourceMappingURL=ControlTypeConverter.js.map