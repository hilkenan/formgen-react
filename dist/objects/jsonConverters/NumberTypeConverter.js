"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
/**
* Json Converter for a ValidatorTypes Enum
*/
var NumberTypeConverter = /** @class */ (function () {
    function NumberTypeConverter() {
    }
    NumberTypeConverter.prototype.serialize = function (number) {
        return JSON.parse(number);
    };
    NumberTypeConverter.prototype.deserialize = function (typeJson) {
        var value = JSON.stringify(typeJson);
        return parseFloat(value);
    };
    NumberTypeConverter = __decorate([
        json2typescript_1.JsonConverter
    ], NumberTypeConverter);
    return NumberTypeConverter;
}());
exports.NumberTypeConverter = NumberTypeConverter;
//# sourceMappingURL=NumberTypeConverter.js.map