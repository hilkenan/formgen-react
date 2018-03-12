"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var TransConverter_1 = require("./jsonConverters/TransConverter");
/**
* Property for an Translation of an Property at an object. The key has to be delimited with .
* Eg: Object.SubObject.propertyName
*/
var Property = /** @class */ (function () {
    function Property() {
        this.Key = "";
        this.ObjectTranslates = [];
    }
    __decorate([
        json2typescript_1.JsonProperty("key", String)
    ], Property.prototype, "Key", void 0);
    __decorate([
        json2typescript_1.JsonProperty("object_trans", TransConverter_1.TransConverter, true)
    ], Property.prototype, "ObjectTranslates", void 0);
    Property = __decorate([
        json2typescript_1.JsonObject
    ], Property);
    return Property;
}());
exports.Property = Property;
/**
* Collection of Properties to translate in an object.
*/
var ObjectTranslate = /** @class */ (function () {
    function ObjectTranslate() {
        this.Properties = [];
    }
    __decorate([
        json2typescript_1.JsonProperty("properties", [Property], true)
    ], ObjectTranslate.prototype, "Properties", void 0);
    ObjectTranslate = __decorate([
        json2typescript_1.JsonObject
    ], ObjectTranslate);
    return ObjectTranslate;
}());
exports.ObjectTranslate = ObjectTranslate;
//# sourceMappingURL=ObjectTranslate.js.map