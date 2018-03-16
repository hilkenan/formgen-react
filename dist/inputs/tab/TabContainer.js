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
var Pivot_1 = require("office-ui-fabric-react/lib/Pivot");
var Pivot_2 = require("office-ui-fabric-react/lib/components/Pivot");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var Helper_1 = require("../../Helper");
var Enums_1 = require("../../Enums");
/**
 * Container Control for the Tabs (Pivot)
 */
var TabContainer = /** @class */ (function (_super) {
    __extends(TabContainer, _super);
    function TabContainer(props, context) {
        var _this = _super.call(this, props, context, false /* Leading edge debounce */) || this;
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || '',
            currentError: undefined
        };
        _this.contextTab = context;
        _this.validateProps(_this.ConfigProperties);
        return _this;
    }
    /**
     * Goes at when mounted to each child (pivotitem) and find in this al components and register them in the context.
     */
    TabContainer.prototype.componentDidMount = function () {
        if (this.props.children) {
            for (var _i = 0, _a = this.props.children; _i < _a.length; _i++) {
                var node = _a[_i];
                this.findeComponents(node.props.children);
            }
        }
    };
    /**
     * Goes trough each node and find in this al components and register them in the context.
     * @param children React node
     */
    TabContainer.prototype.findeComponents = function (children) {
        if (children) {
            for (var _i = 0, _a = children; _i < _a.length; _i++) {
                var gen = _a[_i];
                if (gen && gen.props.inputKey) {
                    this.contextTab.mountInput(gen);
                }
            }
            for (var _b = 0, _c = children; _b < _c.length; _b++) {
                var comp = _c[_b];
                this.findeComponents(comp.props.children);
            }
        }
    };
    /**
    * Get the Pivot Items that are generated as Child objects
    */
    TabContainer.prototype.getPivotItems = function () {
        var pivots = [];
        if (this.props.children) {
            for (var _i = 0, _a = this.props.children; _i < _a.length; _i++) {
                var tab = _a[_i];
                var pivotProbs = {};
                if (tab.props.control.Config)
                    pivotProbs = tab.props.control.Config;
                pivotProbs = Helper_1.Helper.getTranslatedObject(pivotProbs, tab.props.control.ConfigTranslation);
                if (!pivotProbs.linkText)
                    pivotProbs.linkText = Helper_1.Helper.getTranslatedProperty(Enums_1.TranslatedProperty.Title, tab.props.control);
                pivots.push(React.createElement(Pivot_2.PivotItem, __assign({ key: tab.props.inputKey }, pivotProbs), tab.props.children));
            }
        }
        return pivots;
    };
    /**
     * Renders the Pivot with the configured Pivot items.
     */
    TabContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement(Pivot_1.Pivot, __assign({}, this.ConfigProperties, { key: Helper_1.Helper.cleanUpKey(this.props.inputKey), ref: function (input) { return _this.innerControl = input; } }), this.getPivotItems()));
    };
    return TabContainer;
}(FormBaseInput_1.FormBaseInput));
exports.TabContainer = TabContainer;
//# sourceMappingURL=TabContainer.js.map