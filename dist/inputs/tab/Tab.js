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
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
/**
* The Tab Control. Only used as Placeholder. Rendered in the TabContainer.
*/
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props, context) {
        var _this = _super.call(this, props, context, false /* Leading edge debounce */) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        return _this;
    }
    return Tab;
}(FormBaseInput_1.FormBaseInput));
exports.Tab = Tab;
//# sourceMappingURL=Tab.js.map