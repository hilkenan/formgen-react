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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Info Text input for the Form.
 */
var FormInfoText = /** @class */ (function (_super) {
    __extends(FormInfoText, _super);
    function FormInfoText(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        return _this;
    }
    /**
     * Render a Fabric TextBox
     */
    FormInfoText.prototype.render = function () {
        var _this = this;
        return (React.createElement(office_ui_fabric_react_1.Label, __assign({}, this.ConfigProperties, { ref: function (input) { return _this.innerControl = input; }, id: this.props.inputKey, key: this.props.inputKey }),
            React.createElement("div", { dangerouslySetInnerHTML: { __html: this.TranslatedTitle } })));
    };
    return FormInfoText;
}(FormBaseInput_1.FormBaseInput));
exports.FormInfoText = FormInfoText;
//# sourceMappingURL=FormInfoText.js.map