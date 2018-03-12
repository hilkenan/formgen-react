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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
require("../../styles/FormInfoCallout.css");
var styling_1 = require("@uifabric/styling");
/**
 * Class for the Info Callout (icon with mouse over info)
 */
var InfoCallout = /** @class */ (function (_super) {
    __extends(InfoCallout, _super);
    function InfoCallout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            IsInfoVisible: false
        };
        return _this;
    }
    InfoCallout.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: this.props.MarginTop ? { marginTop: this.props.MarginTop } : undefined, className: styling_1.ColorClassNames.themePrimary + ' ms-Grid-col ms-sm0 ms-textAlignLeft infoIconSmall', ref: function (icon) { return _this.infoCalloutElement = icon; } },
            React.createElement(office_ui_fabric_react_1.Icon, { iconName: "Info", onMouseOver: this.onShowInfoClicked }),
            this.state.IsInfoVisible && (React.createElement(office_ui_fabric_react_1.Callout, { key: this.props.Key, directionalHint: 3 /* topAutoEdge */, className: 'ms-InfoCalloutForm-callout', target: this.infoCalloutElement, onDismiss: this.onCalloutDismiss, gapSpace: 0, beakWidth: 20, isBeakVisible: true },
                React.createElement("div", { className: 'ms-InfoCalloutForm-header' },
                    React.createElement("p", { className: 'ms-InfoCalloutForm-title' }, this.props.HeaderText)),
                React.createElement("div", { className: 'ms-InfoCalloutForm-inner' },
                    React.createElement("div", { className: 'ms-InfoCalloutForm-content' },
                        React.createElement("p", { className: 'ms-InfoCalloutForm-subText' }, this.props.children)),
                    this.props.ActionLink && (React.createElement("div", { className: 'ms-InfoCalloutForm-actions' },
                        React.createElement(office_ui_fabric_react_1.Link, { className: 'ms-InfoCalloutForm-link', href: this.props.ActionLink.Link }, this.props.ActionLink.Text))))))));
    };
    /**
    * Hide Info visibility
    */
    InfoCallout.prototype.onCalloutDismiss = function () {
        this.setState({
            IsInfoVisible: false
        });
    };
    /**
    * Swtich Info visibility
    */
    InfoCallout.prototype.onShowInfoClicked = function () {
        this.setState({
            IsInfoVisible: !this.state.IsInfoVisible
        });
    };
    __decorate([
        Utilities_1.autobind
    ], InfoCallout.prototype, "onCalloutDismiss", null);
    __decorate([
        Utilities_1.autobind
    ], InfoCallout.prototype, "onShowInfoClicked", null);
    return InfoCallout;
}(React.Component));
exports.InfoCallout = InfoCallout;
exports.default = InfoCallout;
//# sourceMappingURL=InfoCallout.js.map