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
* Translation Bag Converter
*/
var TransConverter = /** @class */ (function () {
    function TransConverter() {
    }
    TransConverter.prototype.serialize = function (translations) {
        if (translations.length == 0)
            return undefined;
        var text = "{";
        for (var _i = 0, translations_1 = translations; _i < translations_1.length; _i++) {
            var trans = translations_1[_i];
            text += "\"" + trans.Lang + "\":" + "\"" + trans.Text + "\",";
        }
        text = text.substr(0, text.length - 1) + "}";
        return JSON.parse(text);
    };
    TransConverter.prototype.deserialize = function (lang) {
        var traslates = [];
        Object.keys(lang).map(function (key) {
            traslates.push({
                Lang: key,
                Text: lang[key]
            });
        });
        return traslates;
    };
    TransConverter = __decorate([
        json2typescript_1.JsonConverter
    ], TransConverter);
    return TransConverter;
}());
exports.TransConverter = TransConverter;
/**
* Translation Bag
*/
var Translate = /** @class */ (function () {
    function Translate() {
    }
    return Translate;
}());
exports.Translate = Translate;
//# sourceMappingURL=TransConverter.js.map