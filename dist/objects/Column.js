"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var Control_1 = require("./Control");
/**
* Column object for Rendering
*/
var Column = /** @class */ (function () {
    function Column() {
        this.CssClass = undefined;
        this.Styles = undefined;
        this.LabelWith = undefined;
        this.Controls = [];
    }
    __decorate([
        json2typescript_1.JsonProperty("css_class", String, true)
    ], Column.prototype, "CssClass", void 0);
    __decorate([
        json2typescript_1.JsonProperty("styles", json2typescript_1.Any, true)
    ], Column.prototype, "Styles", void 0);
    __decorate([
        json2typescript_1.JsonProperty("label_with", Number, true)
    ], Column.prototype, "LabelWith", void 0);
    __decorate([
        json2typescript_1.JsonProperty("controls", [Control_1.Control])
    ], Column.prototype, "Controls", void 0);
    Column = __decorate([
        json2typescript_1.JsonObject
    ], Column);
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=Column.js.map