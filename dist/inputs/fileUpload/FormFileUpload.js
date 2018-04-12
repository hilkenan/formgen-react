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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var react_dropzone_1 = require("react-dropzone");
var utilities_1 = require("@uifabric/utilities");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var Helper_1 = require("../../Helper");
var LocalsCommon_1 = require("../../locales/LocalsCommon");
var Rendering_1 = require("../../form/Rendering");
/**
 * File upload drag & drop control
 */
var FormFileUpload = /** @class */ (function (_super) {
    __extends(FormFileUpload, _super);
    function FormFileUpload(props, context) {
        var _this = _super.call(this, props, context, false) || this;
        _this.bytes = "";
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value || [],
            currentError: undefined
        };
        _this._validateDropZoneProps(_this.ConfigProperties);
        var commonFormater = Helper_1.Helper.getTranslator("common");
        _this.bytes = commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.bytes);
        return _this;
    }
    /**
     * Remove the file from the store
     * @param fileName the File Name to remove
     */
    FormFileUpload.prototype.onRemove = function (fileName) {
        if (this.dataProviderService == undefined)
            throw "Provider must be specified for upload files";
        if (this.props.control.DataProviderConfigKeys.length != 1)
            throw "Only one Data Provider is allowed for file management";
        var providerConfigKey = Helper_1.Helper.getConfigKeyFromProviderKey(this.props.control.DataProviderConfigKeys[0]);
        this.dataProviderService.removeFile(providerConfigKey, this.props.control, fileName);
        var usedFiles = this.state.currentValue;
        var index = usedFiles.findIndex(function (f) { return f.fileName == fileName; });
        usedFiles.splice(index, 1);
        this.setValue(usedFiles, true);
    };
    /**
     * Add the (accepted) files to the store.
     * @param acceptedFiles All accepted files.
     */
    FormFileUpload.prototype.onDrop = function (acceptedFiles) {
        var _this = this;
        if (this.dataProviderService == undefined)
            throw "Provider must be specified for upload files";
        if (this.props.control.DataProviderConfigKeys.length != 1)
            throw "Only one Data Provider is allowed for file management";
        if (this.dataProviderService.addFile == undefined)
            throw "The Provider does not suppoort adding files.";
        var providerConfigKey = Helper_1.Helper.getConfigKeyFromProviderKey(this.props.control.DataProviderConfigKeys[0]);
        var storedFiles = this.state.currentValue;
        acceptedFiles.forEach(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var fileAsBinaryArray = reader.result;
                var fileName = file.name;
                var storedPath = _this.dataProviderService.addFile(providerConfigKey, _this.props.control, fileName, fileAsBinaryArray);
                storedFiles.push({
                    fileName: fileName,
                    fileSize: file.size,
                    storedPath: storedPath,
                    preview: file.preview
                });
            };
            reader.onabort = function () { return console.log('file reading was aborted'); };
            reader.onerror = function () { return console.log('file reading has failed'); };
            reader.readAsArrayBuffer(file);
        });
        this.setValue(storedFiles, true);
    };
    /**
    * Render a Fabric TextBox
    */
    FormFileUpload.prototype.render = function () {
        var _this = this;
        var files = this.state.currentValue;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement("section", null,
                React.createElement("div", { className: "dropzone" },
                    React.createElement(react_dropzone_1.default, __assign({}, this.ConfigProperties, { onDrop: this.onDrop }),
                        React.createElement("p", null,
                            this.ConfigProperties.DropZoneText,
                            " "))),
                this.ConfigProperties.ShowFiles && (React.createElement("aside", null,
                    React.createElement("h2", null,
                        this.ConfigProperties.DropedFilesText,
                        " "),
                    React.createElement("div", { className: "md-Grid" }, files.map(function (f) { return _this._onRenderCell(f); }))))),
            this.state.currentError && Rendering_1.default.renderError(this.state.currentError)));
    };
    /**
     * Render a row of the grid.
     */
    FormFileUpload.prototype._onRenderCell = function (item) {
        var _this = this;
        return (React.createElement("div", { className: "ms-Grid-row" },
            !this.ConfigProperties.disablePreview && (React.createElement("div", { className: "ms-Grid-col ms-sm0" },
                React.createElement("img", { src: item.preview, style: { width: 30, height: 30 } }))),
            React.createElement("div", { className: "ms-Grid-col ms-sm3" },
                React.createElement("a", { target: "_blank", href: item.storedPath }, item.fileName)),
            React.createElement("div", { className: "ms-Grid-col ms-sm2" },
                item.fileSize,
                " ",
                this.bytes),
            this.dataProviderService.removeFile && (React.createElement("div", { className: "ms-Grid-col ms-sm0" },
                React.createElement("a", { className: "ms-Icon ms-Icon--Delete", "aria-hidden": "true", onClick: function () { return _this.onRemove(item.fileName); } })))));
    };
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    FormFileUpload.prototype._validateDropZoneProps = function (props) {
        this.validateProps(props);
        if (props) {
            if (props.onDrop) {
                console.warn("FormFileUpload: 'onDrop' prop was specified and will be ignored");
            }
        }
    };
    __decorate([
        utilities_1.autobind
    ], FormFileUpload.prototype, "onRemove", null);
    __decorate([
        utilities_1.autobind
    ], FormFileUpload.prototype, "onDrop", null);
    return FormFileUpload;
}(FormBaseInput_1.FormBaseInput));
exports.FormFileUpload = FormFileUpload;
//# sourceMappingURL=FormFileUpload.js.map