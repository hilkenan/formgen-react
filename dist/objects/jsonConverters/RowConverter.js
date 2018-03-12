"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json2typescript_1 = require("json2typescript");
var ObjectFabric_1 = require("../ObjectFabric");
/**
* Json Converter for a Row
*/
var RowConverter = /** @class */ (function () {
    function RowConverter() {
    }
    RowConverter.prototype.serialize = function (rows) {
        var rowsJson = [];
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            rowsJson.push(ObjectFabric_1.ObjectFabric.getJsonFromRow(row));
        }
        return rowsJson;
    };
    RowConverter.prototype.deserialize = function (rowsJson) {
        var rows = [];
        for (var _i = 0, rowsJson_1 = rowsJson; _i < rowsJson_1.length; _i++) {
            var rowJson = rowsJson_1[_i];
            rows.push(ObjectFabric_1.ObjectFabric.getRow(rowJson));
        }
        return rows;
    };
    RowConverter = __decorate([
        json2typescript_1.JsonConverter
    ], RowConverter);
    return RowConverter;
}());
exports.RowConverter = RowConverter;
//# sourceMappingURL=RowConverter.js.map