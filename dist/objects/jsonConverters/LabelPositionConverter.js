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
* Json Converter for a LabelPorision Enum
*/
var LabelPositionConverter = /** @class */ (function () {
    function LabelPositionConverter() {
    }
    LabelPositionConverter.prototype.serialize = function (position) {
        return JSON.parse("[\"" + position.toString() + "\"]");
    };
    LabelPositionConverter.prototype.deserialize = function (typeJson) {
        var value = JSON.stringify(typeJson[0]).replace("\"", "").replace("\"", "");
        return Enums_1.LabelPositions[value];
    };
    LabelPositionConverter = __decorate([
        json2typescript_1.JsonConverter
    ], LabelPositionConverter);
    return LabelPositionConverter;
}());
exports.LabelPositionConverter = LabelPositionConverter;
//# sourceMappingURL=LabelPositionConverter.js.map