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
require("core-js/es6/map");
require("core-js/es6/set");
var React = require("react");
var ObjectFabric_1 = require("../objects/ObjectFabric");
var Helper_1 = require("../Helper");
var Styling_1 = require("office-ui-fabric-react/lib/Styling");
var icons_1 = require("@uifabric/icons");
var JFormData_1 = require("../objects/JFormData");
var styling_1 = require("@uifabric/styling");
var PropTypes = require("prop-types");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
require("../styles/main.css");
var Enums_1 = require("../Enums");
var react_intl_1 = require("react-intl");
require("babel-polyfill/browser.js");
var Rendering_1 = require("./Rendering");
require("reflect-metadata");
var FormBaseInput_types_1 = require("../formBaseInput/FormBaseInput.types");
global.Intl = require('intl');
var frLocaleData = require('react-intl/locale-data/fr');
var deLocaleData = require('react-intl/locale-data/de');
var enLocaleData = require('react-intl/locale-data/en');
var esLocaleData = require('react-intl/locale-data/es');
var itLocaleData = require('react-intl/locale-data/id');
react_intl_1.addLocaleData(frLocaleData);
react_intl_1.addLocaleData(deLocaleData);
react_intl_1.addLocaleData(enLocaleData);
react_intl_1.addLocaleData(itLocaleData);
react_intl_1.addLocaleData(esLocaleData);
icons_1.initializeIcons();
exports.FormLanguage = "";
/**
 * The main Form Control that renders the Control Tree
 */
var GenericForm = /** @class */ (function (_super) {
    __extends(GenericForm, _super);
    /**
     * Load the correct langauge, UI Fabric theme and the rendering engine.
     */
    function GenericForm(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.Language) {
            exports.FormLanguage = _this.props.Language;
        }
        _this._rendering = new Rendering_1.default(function () { return ObjectFabric_1.ObjectFabric.getJsonFromForm(_this.formData); }, props.customControls, props.customValidators, props.customActions, props.dataBinders, props.formInputs, props.onCancelForm);
        _this.formData = ObjectFabric_1.ObjectFabric.getForm(props.jsonFormData, props.formType ? props.formType : JFormData_1.JFormData);
        _this._mountedInputs = [];
        _this._controlEvents = [];
        _this._pristine = true;
        _this.state = {
            validationResults: {}
        };
        _this._container = props.container;
        if (_this.formData.Theme) {
            Styling_1.loadTheme({
                palette: {
                    'themePrimary': _this.formData.Theme
                }
            });
        }
        return _this;
    }
    /**
     * Call the formDidMount event and take over the mounted controls
     */
    GenericForm.prototype.componentDidMount = function () {
        var _loop_1 = function (eventControl) {
            var input = this_1._mountedInputs.find(function (c) { return c.props.inputKey == eventControl.senderControlKey; });
            this_1._sendValutToControls(eventControl, input, true);
        };
        var this_1 = this;
        for (var _i = 0, _a = this._controlEvents; _i < _a.length; _i++) {
            var eventControl = _a[_i];
            _loop_1(eventControl);
        }
        if (this.props.formDidMount) {
            this.props.formDidMount(this._mountedInputs);
        }
    };
    GenericForm.prototype.render = function () {
        var nativeProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("form", __assign({}, nativeProps, { onSubmit: this._onSubmit, key: this.formData.ID }),
            React.createElement("div", { className: "Form", key: this.formData.ID + "div1" },
                Enums_1.TranslatedProperty.Title && (React.createElement("header", { className: [
                        "Form-header",
                        styling_1.FontClassNames.medium
                    ].join(' '), key: this.formData.ID + "heder" },
                    React.createElement("h1", { key: this.formData.ID + "h1" }, Helper_1.Helper.getTranslatedProperty(Enums_1.TranslatedProperty.Title, this.formData)))),
                React.createElement("div", { className: 'Form-content', key: this.formData.ID + "Container" }, this._rendering.buildRowWlements(this.formData.ID + "/R", this.formData.Rows)))));
    };
    /**
     * Get the context for child components to use
     */
    GenericForm.prototype.getChildContext = function () {
        return {
            isFormValid: this._isFormValid,
            mountInput: this._mountInput,
            unmountInput: this._unmountInput,
            submitValue: this._submitValue,
            formData: this.formData,
            container: this._container
        };
    };
    /**
     * Finde with the full control id the Control in the tree.
     * @param inputKey The full control id to finde the corresponding control
     */
    GenericForm.prototype._findeControlFromKey = function (inputKey) {
        var control;
        var controlStruct = inputKey.split(".");
        if (this.formData.Rows)
            control = this._findeControlInRow(this.formData.Rows, controlStruct, 1);
        return control;
    };
    /**
     * Validate an individual input and set its error state
     * Returns the validation result
     * @param input The input to validate
     * @param showValidation Set to true if the error message shoul be set
     */
    GenericForm.prototype._validateComponent = function (input, showValidation) {
        if (!input.doValidate && input.props.validators) {
            var control = this._findeControlFromKey(input.props.inputKey);
            if (control && control.FormValidators.find(function (v) { return v.ValidatorType == Enums_1.ValidatorTypes.Required; })) {
                return {
                    isValid: false,
                    component: input,
                };
            }
        }
        else if (input.doValidate) {
            var validationResult = input.doValidate();
            if (showValidation && !validationResult.isValid)
                input.setError(validationResult.errorMessage);
            else if (!validationResult.isValid && (this.props.showErrorsWhenPristine || !this._pristine)) {
                input.setError(validationResult.errorMessage);
            }
            else {
                input.clearError();
            }
            return validationResult;
        }
        return {
            isValid: true,
            component: input,
        };
    };
    /**
     * Validate all the individual inputs and set their error state
     * Returns a list of the validation results
     */
    GenericForm.prototype._validateForm = function () {
        var _this = this;
        var validationResults = {};
        this._mountedInputs.forEach(function (input) {
            validationResults[input.props.inputKey] = _this._validateComponent(input);
        });
        this.setState(function (prevState) {
            prevState.validationResults = validationResults;
            return prevState;
        });
        return validationResults;
    };
    /**
     * When the form is submitted. This will validate the form and call the appropriate submit callback
     * @param event The form event
     */
    GenericForm.prototype._onSubmit = function (event) {
        event.preventDefault();
        if (this._pristine) {
            this._pristine = false;
        }
        var validationResults = this._validateForm();
        var formIsValid = this._isFormValid(validationResults);
        var jsonData = ObjectFabric_1.ObjectFabric.getJsonFromForm(this.formData);
        if (formIsValid && this.props.onSubmitForm) {
            this.props.onSubmitForm(jsonData);
        }
        else if (this.props.onInvalidSubmitForm) {
            this.props.onInvalidSubmitForm(jsonData);
        }
    };
    /**
     * Find the Control with the ID in the tree of controls
     * @param rows Row Array
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    GenericForm.prototype._findeControlInRow = function (rows, controlStruct, level) {
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            for (var _a = 0, _b = row.Columns; _a < _b.length; _a++) {
                var col = _b[_a];
                var control = this._findeControlInControls(col.Controls, controlStruct, level);
                if (control)
                    return control;
            }
        }
        return undefined;
    };
    /**
     * Find the Control with the ID in the tree of controls
     * @param controls Control Array
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    GenericForm.prototype._findeControlInControls = function (controls, controlStruct, level) {
        var id = Helper_1.Helper.cleanUpKey(controlStruct[level]);
        var control = controls.find(function (c) { return c.ID == id; });
        if (controlStruct.length - 1 != level)
            if (control && control.SubRows)
                control = this._findeControlInRow(control.SubRows, controlStruct, level + 1);
            else if (control && control.SubControls)
                control = this._findeControlInControls(control.SubControls, controlStruct, level + 1);
        return control;
    };
    /**
     * Register an input with the form
     * @param input The input to register
     */
    GenericForm.prototype._mountInput = function (input) {
        var _this = this;
        var foundControl = this._mountedInputs.find(function (g) { return g.props.inputKey == input.props.inputKey; });
        if (foundControl == undefined) {
            if (!input.doValidate)
                this._mountedInputs.push(input);
            this.setState(function (prevState) {
                prevState.validationResults[input.props.inputKey] = _this._validateComponent(input);
                return prevState;
            });
        }
        else if (input.doValidate && !foundControl.doValidate) {
            this._unmountInput(foundControl);
            this._mountInput(input);
        }
        var control = input.props.control;
        this._registerEvents(input, control.DataProviderDefaultValueConfigKey);
        this._registerEvents(input, control.DataProviderValueConfigKey);
        for (var _i = 0, _a = control.DataProviderConfigKeys; _i < _a.length; _i++) {
            var listProviderKey = _a[_i];
            this._registerEvents(input, listProviderKey);
        }
    };
    /**
     * Register if available the event on the control defined between squer brackets
     * @param input The input that has rais an update
     * @param key The key with square brackets
     */
    GenericForm.prototype._registerEvents = function (input, key) {
        if (key) {
            var controlKey = Helper_1.Helper.getControlKeyFromConfigKey(key);
            if (controlKey) {
                this._registerEventInControlEvents(controlKey, input);
            }
            else if (!controlKey) {
                this._registerEventInControlEvents(input.props.inputKey, input);
            }
            else
                throw "Control definitions are maximal one allowed per key definition: " + key;
        }
    };
    /**
     * Register the input in the controlEvents
     * @param controlKey The key from the control to register
     * @param input The input that has to register.
     */
    GenericForm.prototype._registerEventInControlEvents = function (controlKey, input) {
        var eventType = this._controlEvents.find(function (c) { return c.senderControlKey == controlKey; });
        var index = -1;
        if (eventType == undefined) {
            index = this._controlEvents.push({
                senderControlKey: controlKey,
                receiverControl: []
            }) - 1;
        }
        else {
            index = this._controlEvents.indexOf(eventType);
        }
        this._controlEvents[index].receiverControl.push(input);
    };
    /**
     * Set the validation result, if Valid the control Value and if defined call the onUpdated Method
     * @param input The input that has rais an update
     * @param validate True if the input should validated.
     * @param skipSendValue True if the sendValutToControls should to be used (avoid recalling the event)
     */
    GenericForm.prototype._submitValue = function (input, validate, skipSendValue) {
        var validationResult = this._validateComponent(input, validate);
        this.setState(function (prevState) {
            prevState.validationResults[input.props.inputKey] = validationResult;
            return prevState;
        });
        console.log("sender:" + input.props.inputKey + ":" + validationResult.isValid);
        if (validationResult.isValid) {
            var control = this._findeControlFromKey(input.props.inputKey);
            if (control) {
                control.Value = input.state.currentValue;
            }
            var eventControl = this._controlEvents.find(function (c) { return c.senderControlKey == input.props.inputKey; });
            if (eventControl && !skipSendValue) {
                this._sendValutToControls(eventControl, input);
            }
            if (this.props.onUpdated) {
                this.props.onUpdated(input.props.inputKey, input.state.currentValue);
            }
        }
    };
    /**
     * Sed the senderControl Infos to the Receiver at the bound Control
     * @param eventControl The EventControl to get the receiver from
     * @param senderControl The sending controll
     * @param loadInitials If true then load also the controls that receiver and sender are the same control
    */
    GenericForm.prototype._sendValutToControls = function (eventControl, senderControl, loadInitials) {
        for (var _i = 0, _a = eventControl.receiverControl; _i < _a.length; _i++) {
            var receiverControl = _a[_i];
            if (!senderControl || receiverControl.props.inputKey == senderControl.props.inputKey) {
                if (loadInitials) {
                    this._sendValutToControl(receiverControl, undefined);
                }
            }
            else {
                this._sendValutToControl(receiverControl, senderControl);
            }
        }
    };
    /**
     * Send the value to an given control. If need convert it with the provider key to another value
     * @param input The input that has rais an update
     * @param value The value to be send
     */
    GenericForm.prototype._sendValutToControl = function (receiverControl, senderControl) {
        var _this = this;
        for (var _i = 0, _a = receiverControl.props.control.DataProviderConfigKeys; _i < _a.length; _i++) {
            var providerKey = _a[_i];
            var result = Helper_1.Helper.getControlKeyFromConfigKey(providerKey);
            if (result && senderControl) {
                receiverControl.setState({ currentFilter: senderControl.state.currentValue });
            }
        }
        this._getValueFromProvider(receiverControl, senderControl, receiverControl.props.control.DataProviderValueConfigKey).then(function (valutToUse) {
            if (valutToUse && receiverControl.props.control.DataProviderValueConfigKey) {
                receiverControl.setValue(valutToUse, true, true);
            }
            if (receiverControl.props.control.DataProviderDefaultValueConfigKey && _this.props.isNewForm && !receiverControl.state.currentValue) {
                _this._getValueFromProvider(receiverControl, senderControl, receiverControl.props.control.DataProviderDefaultValueConfigKey).then(function (defaultValutToUse) {
                    if (defaultValutToUse)
                        receiverControl.setValue(defaultValutToUse, true, true);
                });
            }
        });
    };
    /**
     * Get the value from a defined provider or default value.
     * @param input The input that has rais an update
     * @param value The value to be used when nothing others devined
     * @param keyToResolve The Key to resolve with the provider
     */
    GenericForm.prototype._getValueFromProvider = function (receiverControl, senderControl, keyToResolve) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((!keyToResolve || keyToResolve == "") && senderControl) {
                resolve(senderControl.state.currentValue);
                return;
            }
            if ((!keyToResolve || keyToResolve == "") && !senderControl) {
                resolve(undefined);
                return;
            }
            var controlKey = Helper_1.Helper.getControlKeyFromConfigKey(keyToResolve);
            if (controlKey)
                keyToResolve = keyToResolve.replace(controlKey, controlKey.replace(".", "/"));
            var keyParts = keyToResolve.split(".");
            if (keyToResolve.startsWith("[") && keyParts.length == 1 && senderControl) {
                resolve(senderControl.state.currentValue);
                return;
            }
            if (keyToResolve.startsWith("[") && senderControl && senderControl.state.currentValue) {
                var objectToUse = senderControl.state.currentValue[keyParts[1]];
                if (keyParts.length > 2) {
                    for (var i = 2; i < keyParts.length; i++) {
                        if (objectToUse != undefined) {
                            objectToUse = objectToUse[keyParts[i]];
                        }
                    }
                }
                resolve(objectToUse);
                return;
            }
            else {
                var providerKey_1 = keyParts[0];
                var dataProviders = _this._container.get(FormBaseInput_types_1.typesForInject.IDataProviderCollection);
                if (dataProviders == undefined)
                    throw "No DataProviders defined";
                var provider = dataProviders.providers.find(function (p) { return p.providerServiceKey == providerKey_1; });
                if (provider == undefined)
                    throw "DataProvider with key " + providerKey_1 + " not found";
                var providerConfigKey = Helper_1.Helper.getConfigKeyFromProviderKey(keyToResolve);
                var sender = senderControl ? senderControl.props.control : undefined;
                provider.retrieveSingleData(providerConfigKey, sender, receiverControl.props.control, Helper_1.Helper.getLanguage()).then(function (value) {
                    resolve(value);
                });
            }
        });
    };
    /**
     * Unregister an input with the form
     * @param input The input to unregister
     */
    GenericForm.prototype._unmountInput = function (input) {
        var currentIndex = this._mountedInputs.indexOf(input);
        if (currentIndex > -1) {
            this._mountedInputs.splice(currentIndex, 1);
            this.setState(function (prevState) {
                delete prevState.validationResults[input.props.inputKey];
                return prevState;
            });
        }
    };
    /**
     * Check if the form is valid. If all validations are ok then reutrn true.
     * @param validationResults All validation results from the control tree.
     */
    GenericForm.prototype._isFormValid = function (validationResults) {
        if (validationResults === void 0) { validationResults = this.state.validationResults; }
        for (var key in validationResults) {
            if (!validationResults[key].isValid) {
                return false;
            }
        }
        return true;
    };
    /**
     * This is needed because React 15's context does not work well with typescript
     */
    GenericForm.childContextTypes = {
        isFormValid: PropTypes.func.isRequired,
        mountInput: PropTypes.func.isRequired,
        unmountInput: PropTypes.func.isRequired,
        submitValue: PropTypes.func.isRequired,
        formData: PropTypes.object.isRequired,
        container: PropTypes.object.isRequired
    };
    __decorate([
        Utilities_1.autobind
    ], GenericForm.prototype, "_onSubmit", null);
    __decorate([
        Utilities_1.autobind
    ], GenericForm.prototype, "_mountInput", null);
    __decorate([
        Utilities_1.autobind
    ], GenericForm.prototype, "_submitValue", null);
    __decorate([
        Utilities_1.autobind
    ], GenericForm.prototype, "_unmountInput", null);
    __decorate([
        Utilities_1.autobind
    ], GenericForm.prototype, "_isFormValid", null);
    return GenericForm;
}(Utilities_1.BaseComponent));
exports.GenericForm = GenericForm;
/**
 * Type alias for any simple form input
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    /**
     * Load basic form
     */
    function Form(props) {
        return _super.call(this, props) || this;
    }
    return Form;
}(GenericForm));
exports.Form = Form;
//# sourceMappingURL=Form.js.map