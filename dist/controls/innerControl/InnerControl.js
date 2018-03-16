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
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var Enums_1 = require("../../Enums");
var InfoCallout_1 = require("../callout/InfoCallout");
/**
* Inner Control. Use show the correct inner part of an control. Renders the Label, the child properties and the Info Callout.
*/
var InnerControl = /** @class */ (function (_super) {
    __extends(InnerControl, _super);
    function InnerControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerControl.prototype.render = function () {
        var additionalClassName = this.props.BaseControl.ControlClassName;
        var styles = this.props.BaseControl.props.control.Styles ? this.props.BaseControl.props.control.Styles : undefined;
        var required = this.props.BaseControl.IsRequired();
        var hasInfo = this.props.BaseControl.props.control.Info != undefined;
        var labelCss = "";
        var contrCss = "";
        var infoCss = "";
        if (this.props.LabelWith && !this.props.ControlWith) {
            var controlNb = 12 - this.props.LabelWith + (hasInfo ? -1 : 0);
            labelCss = "ms-sm" + this.props.LabelWith;
            contrCss = "ms-sm" + controlNb;
            infoCss = "ms-sm1";
        }
        else if (this.props.LabelWith && this.props.ControlWith) {
            var infoNb = 12 - this.props.LabelWith - this.props.ControlWith;
            labelCss = "ms-sm" + this.props.LabelWith;
            contrCss = "ms-sm" + this.props.ControlWith;
            infoCss = "ms-sm" + infoNb;
        }
        else if (!this.props.LabelWith && this.props.ControlWith) {
            var infoNb = 12 - 3 - this.props.ControlWith;
            labelCss = "ms-sm3";
            contrCss = "ms-sm" + this.props.ControlWith;
            infoCss = "ms-sm" + infoNb;
        }
        else {
            var controlNb = 9 + (hasInfo ? -1 : 0);
            labelCss = "ms-sm3";
            contrCss = "ms-sm" + controlNb;
            infoCss = "ms-sm1";
        }
        if (!this.props.BaseControl.props.control.Title && !this.props.BaseControl.props.control.Info) {
            return (React.createElement("div", { className: additionalClassName, style: styles }, this.props.children));
        }
        else {
            switch (this.props.BaseControl.props.control.LabelPosition) {
                default:
                    return (React.createElement("div", { className: "ms-Grid " + additionalClassName, style: styles },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                React.createElement(office_ui_fabric_react_1.Label, { required: required }, this.props.BaseControl.TranslatedTitle))),
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm11" }, this.props.children),
                            hasInfo && (React.createElement("div", { className: "ms-Grid-col ms-sm1" },
                                React.createElement(InfoCallout_1.InfoCallout, { Key: this.props.BaseControl.props.control.ID + "Info", HeaderText: this.props.BaseControl.TranslatedTitle }, this.props.BaseControl.TranslatedInfo))))));
                case Enums_1.LabelPositions.Right:
                    return (React.createElement("div", { className: "ms-Grid " + additionalClassName, style: styles },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col " + contrCss }, this.props.children),
                            React.createElement("div", { className: "ms-Grid-col " + labelCss },
                                React.createElement(office_ui_fabric_react_1.Label, { required: required }, this.props.BaseControl.TranslatedTitle)),
                            hasInfo && (React.createElement("div", { className: "ms-Grid-col " + infoCss },
                                React.createElement(InfoCallout_1.InfoCallout, { Key: this.props.BaseControl.props.control.ID + "Info", HeaderText: this.props.BaseControl.TranslatedTitle }, this.props.BaseControl.TranslatedInfo))))));
                case Enums_1.LabelPositions.Left:
                    return (React.createElement("div", { className: "ms-Grid " + additionalClassName, style: styles },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col " + labelCss },
                                React.createElement(office_ui_fabric_react_1.Label, { required: required }, this.props.BaseControl.TranslatedTitle)),
                            React.createElement("div", { className: "ms-Grid-col " + contrCss }, this.props.children),
                            hasInfo && (React.createElement("div", { className: "ms-Grid-col " + infoCss },
                                React.createElement(InfoCallout_1.InfoCallout, { ActionLink: this.props.BaseControl.props.control.InfoAction, Key: this.props.BaseControl.props.control.ID + "Info", HeaderText: this.props.BaseControl.TranslatedTitle }, this.props.BaseControl.TranslatedInfo))))));
            }
        }
    };
    return InnerControl;
}(React.Component));
exports.InnerControl = InnerControl;
//# sourceMappingURL=InnerControl.js.map