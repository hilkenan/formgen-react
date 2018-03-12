"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var Column_1 = require("./Column");
/**
* Row object for Rendering
*/
var Row = /** @class */ (function () {
    function Row() {
        this.Columns = [];
    }
    __decorate([
        json2typescript_1.JsonProperty("columns", [Column_1.Column])
    ], Row.prototype, "Columns", void 0);
    Row = __decorate([
        json2typescript_1.JsonObject
    ], Row);
    return Row;
}());
exports.Row = Row;
//# sourceMappingURL=Row.js.map