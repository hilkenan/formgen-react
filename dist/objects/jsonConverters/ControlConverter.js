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
* Json Converter for a Control
*/
var ControlConverter = /** @class */ (function () {
    function ControlConverter() {
    }
    ControlConverter.prototype.serialize = function (controls) {
        var ctrlJson = [];
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var ctrl = controls_1[_i];
            ctrlJson.push(ObjectFabric_1.ObjectFabric.getJsonFromControl(ctrl));
        }
        return ctrlJson;
    };
    ControlConverter.prototype.deserialize = function (controlsJson) {
        var ctrls = [];
        for (var _i = 0, controlsJson_1 = controlsJson; _i < controlsJson_1.length; _i++) {
            var ctrlJson = controlsJson_1[_i];
            ctrls.push(ObjectFabric_1.ObjectFabric.getControl(ctrlJson));
        }
        return ctrls;
    };
    ControlConverter = __decorate([
        json2typescript_1.JsonConverter
    ], ControlConverter);
    return ControlConverter;
}());
exports.ControlConverter = ControlConverter;
//# sourceMappingURL=ControlConverter.js.map