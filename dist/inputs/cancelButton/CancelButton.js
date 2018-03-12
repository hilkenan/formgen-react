"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomButton_1 = require("../customButton/CustomButton");
/**
 * Cancel button. Cancel Action call when clicked.
 */
var CancelButton = /** @class */ (function (_super) {
    __extends(CancelButton, _super);
    function CancelButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CancelButton;
}(CustomButton_1.CustomButton));
exports.CancelButton = CancelButton;
//# sourceMappingURL=CancelButton.js.map