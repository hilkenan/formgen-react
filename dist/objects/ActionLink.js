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
 * Data Class for the Action Links in Info Callouts
 */
var ActionLink = /** @class */ (function () {
    function ActionLink() {
        this.Link = "";
        this.Text = "";
    }
    __decorate([
        json2typescript_1.JsonProperty("link", String)
    ], ActionLink.prototype, "Link", void 0);
    __decorate([
        json2typescript_1.JsonProperty("text", String)
    ], ActionLink.prototype, "Text", void 0);
    ActionLink = __decorate([
        json2typescript_1.JsonObject
    ], ActionLink);
    return ActionLink;
}());
exports.ActionLink = ActionLink;
//# sourceMappingURL=ActionLink.js.map