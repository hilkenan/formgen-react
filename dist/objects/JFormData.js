"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var Row_1 = require("./Row");
var TransConverter_1 = require("./jsonConverters/TransConverter");
/**
* FormData object for Rendering
*/
var JFormData = /** @class */ (function () {
    function JFormData() {
        this.ID = "";
        this.Title = "";
        this.Theme = "";
        this.TitleTranslates = undefined;
        this.Rows = undefined;
        this.LabelWith = undefined;
    }
    __decorate([
        json2typescript_1.JsonProperty("id", String)
    ], JFormData.prototype, "ID", void 0);
    __decorate([
        json2typescript_1.JsonProperty("title", String, true)
    ], JFormData.prototype, "Title", void 0);
    __decorate([
        json2typescript_1.JsonProperty("theme", String, true)
    ], JFormData.prototype, "Theme", void 0);
    __decorate([
        json2typescript_1.JsonProperty("title_trans", TransConverter_1.TransConverter, true)
    ], JFormData.prototype, "TitleTranslates", void 0);
    __decorate([
        json2typescript_1.JsonProperty("rows", [Row_1.Row], true)
    ], JFormData.prototype, "Rows", void 0);
    __decorate([
        json2typescript_1.JsonProperty("label_with", Number, true)
    ], JFormData.prototype, "LabelWith", void 0);
    JFormData = __decorate([
        json2typescript_1.JsonObject
    ], JFormData);
    return JFormData;
}());
exports.JFormData = JFormData;
//# sourceMappingURL=JFormData.js.map