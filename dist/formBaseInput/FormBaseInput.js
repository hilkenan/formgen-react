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
var PropTypes = require("prop-types");
var FormBaseInput_types_1 = require("./FormBaseInput.types");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Enums_1 = require("../Enums");
var utilities_1 = require("@uifabric/utilities");
var LocalsCommon_1 = require("../locales/LocalsCommon");
var Helper_1 = require("../Helper");
/**
 * Default Debaunce of 250 Ticks.
 */
exports.DEFAULT_DEBOUNCE = 250;
/**
 * The base class that all simple form inputs should inherit from
 * The T generic should be the type of value this input accepts. For example, a TextBox would probably define T as string
 */
var FormBaseInput = /** @class */ (function (_super) {
    __extends(FormBaseInput, _super);
    /**
     * Constructor for any Simple Form input
     * @param props The props for this component
     * @param context The context for this component
     * @param leadingDebounce Sets the debounce setting for updates on this input.
     * If leading, the component will update immediately and then debounce.
     * Otherwise, the component will only update after the debounce interval. Defaults to true
     */
    function FormBaseInput(props, context, leadingDebounce) {
        var _this = _super.call(this, props, context) || this;
        _this.commonFormater = Helper_1.Helper.getTranslator("common");
        /** Loaded data for this Control. */
        _this.dataStore = {};
        /** The Asynchronous Filter Methods. */
        _this.retrievFilterData = {};
        _this.formContext = context;
        _this.debouncedSubmitValue = _this._async.debounce(_this.formContext.submitValue, ((_this.props.debounceInterval !== null && _this.props.debounceInterval !== undefined) ?
            _this.props.debounceInterval : exports.DEFAULT_DEBOUNCE), {
            leading: (leadingDebounce === null || leadingDebounce === undefined ? true : leadingDebounce)
        });
        if (props.control.Config)
            _this.ConfigProperties = props.control.Config;
        else
            _this.ConfigProperties = {};
        _this.ConfigProperties = Helper_1.Helper.getTranslatedObject(_this.ConfigProperties, _this.props.control.ConfigTranslation);
        _this.TranslatedTitle = Helper_1.Helper.getTranslatedProperty(Enums_1.TranslatedProperty.Title, _this.props.control);
        _this.TranslatedInfo = Helper_1.Helper.getTranslatedProperty(Enums_1.TranslatedProperty.Info, _this.props.control);
        _this.ControlClassName = _this.props.control.CssClass ? _this.props.control.CssClass : "";
        return _this;
    }
    /**
     * React Lifecycle Method - Because this method uses state when rendering, the state must be
     * updated when the prop's value updates
     * @param nextProps The props that the component is receiving
     */
    FormBaseInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.control.Value !== this.props.control.Value && this.props.control.Value === this.state.currentValue) {
            // If the props have changed and the previous props are equal to the current value, then we want to update the internal state value
            this.setState(function (prevState) {
                prevState.currentValue = nextProps.control.Value;
                return prevState;
            });
        }
    };
    /**
     * Store the options to the state
     * @param dataKey The databinder key to use
     * @param data The Array with the Data.
     * @param waitText The Wait Text for async loading
     * @param isAsync True if async loading.
     */
    FormBaseInput.prototype.storeOptions = function (dataKey, data, waitText, isAsync) {
        var options = this.state.dataStores;
        if (!options)
            options = [];
        var entry = options.find(function (d) { return d.key == dataKey; });
        var refresh = false;
        if (entry && !entry.data)
            entry.data = [];
        if (entry && (!Helper_1.Helper.compareArrays(entry.data, data) || entry.onLoading != isAsync || entry.waitText != waitText)) {
            refresh = true;
            entry.data = data && data.length == 0 ? undefined : data;
            entry.onLoading = isAsync;
            entry.waitText = waitText;
        }
        else if (!entry) {
            refresh = true;
            options.push({
                key: dataKey,
                data: data && data.length == 0 ? undefined : data,
                onLoading: isAsync,
                waitText: waitText
            });
        }
        if (refresh)
            this.setState({ dataStores: options });
    };
    /**
    * Get the Error Message back after falidation the Value.
    */
    FormBaseInput.prototype.getErrorMessage = function () {
        if (this.state.currentValue) {
            var result = this.doValidate();
            return result.errorMessage;
        }
        return "";
    };
    /**
    * Check the proprties and warn if the default are used.
    * @param props The property Object to check.
    */
    FormBaseInput.prototype.validateProps = function (props) {
        if (props) {
            if (props.ref) {
                console.warn(this.props.inputKey + " 'ref' prop was specified and will be ignored");
            }
            if (props.id) {
                console.warn(this.props.inputKey + " 'id' prop was specified and will be ignored");
            }
            if (props.name) {
                console.warn(this.props.inputKey + " 'name' prop was specified and will be ignored");
            }
            if (props.label) {
                console.warn(this.props.inputKey + " 'label' prop was specified and will be ignored");
            }
            if (props.onChange) {
                console.warn(this.props.inputKey + " 'onChange' prop was specified and will be ignored");
            }
        }
    };
    /**
    * Loads the data from the Store async with a filter teext
    * If Async loading the return true
    * @param configKey The Key from the datastore
    * @param provider The Data Provider for Async Filter
    * @param loadedFunction The funtion to call after data is loaded
    * @param waitText The Waiting Text for async loading controls.
    * @param control The sender Control that has the Filter Text
    * @param filter The Filter Text.
    */
    FormBaseInput.prototype.loadDataFromStoreWithFilter = function (configKey, provider, loadedFunction, waitText, control, filter) {
        var _this = this;
        if (provider) {
            var entry = this.state.dataStores ? this.state.dataStores.find(function (e) { return e.key == configKey; }) : undefined;
            if (!entry) {
                var waitText_1 = this.commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.loadData);
                loadedFunction(configKey, undefined, waitText_1, true);
            }
            provider.retrieveFilteredListData(configKey, control, Helper_1.Helper.getLanguage(), filter).then(function (list) {
                var waitTextA = !list || list.length == 0 ?
                    _this.commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.nothingFound) : waitText;
                loadedFunction(configKey, list, waitTextA, false);
            });
        }
    };
    /**
    * Loads the data from the Store async or sync.
    * If Async loading the return true
    * @param dataStoreKey The Key from the datastore
    * @param loadedFunction The funtion to call after data is loaded
    * @param waitText The Waiting Text for async loading controls.
    */
    FormBaseInput.prototype.loadDataFromStore = function (dataStoreKey, loadedFunction, waitText) {
        var dataBinderAsync = this.dataStore[dataStoreKey];
        var dataBinder = this.dataStore[dataStoreKey];
        if (dataBinderAsync && dataBinderAsync.then) {
            var waitText_2 = this.commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.loadData);
            loadedFunction(dataStoreKey, undefined, waitText_2, true);
            dataBinderAsync.then(function (optionList) {
                loadedFunction(dataStoreKey, optionList, "", false);
            });
            return true;
        }
        else if (dataBinder) {
            loadedFunction(dataStoreKey, dataBinder, waitText, false);
        }
        return false;
    };
    /**
    * Get the Data options entry
    * @param staticData Static data array from config.
    * @param key DataStore key (config or databinder)
    * @param defaultPlaceholder Default placholder text.
    */
    FormBaseInput.prototype.getDataOptionEntry = function (staticData, key, defaultPlaceholder) {
        var optionsEntry;
        var controlKey = Helper_1.Helper.getControlKeyFromConfigKey(key);
        if (controlKey && this.state.currentFilter) {
            var provider = this.retrievFilterData[key];
            var waitText = Helper_1.Helper.getPlaceHolderText(optionsEntry, defaultPlaceholder);
            this.loadDataFromStoreWithFilter(key, provider, this.storeOptions, waitText, this.props.control, this.state.currentFilter);
            var entry = this.state.dataStores ?
                this.state.dataStores.find(function (e) { return e.key == key; }) : undefined;
            return entry;
        }
        else {
            if (!staticData && this.state.dataStores) {
                optionsEntry = this.state.dataStores.find(function (e) { return e.key == key; });
            }
            if (optionsEntry) {
                optionsEntry.waitText = Helper_1.Helper.getPlaceHolderText(optionsEntry, defaultPlaceholder);
            }
            else {
                optionsEntry = {
                    key: "default",
                    data: staticData,
                    onLoading: false,
                    waitText: Helper_1.Helper.getPlaceHolderText(undefined, defaultPlaceholder)
                };
            }
            if (this.props.control.ReadOnly)
                optionsEntry.onLoading = true;
            return optionsEntry;
        }
    };
    /** True if the Required validator is set. */
    FormBaseInput.prototype.IsRequired = function () {
        return this.props.control.FormValidators && this.props.control.FormValidators.find(function (v) { return v.ValidatorType == Enums_1.ValidatorTypes.Required; }) != undefined;
    };
    /**
    * Load the Databinder. Sync and Async are loaded. AsyncFilter is loade when user type an filter.
    */
    FormBaseInput.prototype.componentWillMount = function () {
        this.formContext.mountInput(this);
        var formData = this.formContext.formData;
        var container = this.formContext.container;
        if (this.props.dataBinder) {
            for (var _i = 0, _a = this.props.dataBinder; _i < _a.length; _i++) {
                var binder = _a[_i];
                var binderSync = binder.binderFunction;
                var binderAsync = binder.binderFunction;
                var binderAsyncFilter = binder.binderFunction;
                if (binder.binderType == Enums_1.BinderType.Sync)
                    this.dataStore[binder.typeName] = binderSync.retrieveData(this.props.control, Helper_1.Helper.getLanguage());
                else if (binder.binderType == Enums_1.BinderType.Async)
                    this.dataStore[binder.typeName] = binderAsync.retrieveData(this.props.control, Helper_1.Helper.getLanguage());
                else if (binder.binderType == Enums_1.BinderType.AsyncFilter)
                    this.retrievFilterData[binder.typeName] = binderAsyncFilter;
            }
        }
        if (this.props.control.DataProviderConfigKeys.length > 0 && container == undefined)
            throw "No Data Service Container found";
        if (this.props.control.DataProviderConfigKeys.length > 0) {
            var dataProviders = container.get(FormBaseInput_types_1.typesForInject.IDataProviderCollection);
            if (dataProviders == undefined || dataProviders.providers.length == 0)
                throw "No Data Service found";
            var _loop_1 = function (configKey) {
                var keyParts = configKey.split(".");
                this_1.dataProviderService = dataProviders.providers.find(function (p) { return p.providerServiceKey == keyParts[0]; });
                if (this_1.dataProviderService == undefined)
                    throw "No DataProvider found with key " + keyParts[0] + " name is: " + dataProviders.providers[0].providerServiceKey;
                this_1.dataProviderService.formData = formData;
                this_1.dataProviderService.initialize();
                var result = Helper_1.Helper.getControlKeyFromConfigKey(configKey);
                if (result && this_1.dataProviderService.retrieveFilteredListData) {
                    var binderFuntion = this_1.dataProviderService;
                    this_1.retrievFilterData[configKey] = binderFuntion;
                }
                else {
                    var providerConfigKey = Helper_1.Helper.getConfigKeyFromProviderKey(configKey);
                    this_1.dataProviderService.formData = formData;
                    this_1.dataProviderService.initialize();
                    this_1.dataStore[configKey] = this_1.dataProviderService.retrieveListData(providerConfigKey, this_1.props.control, Helper_1.Helper.getLanguage());
                    this_1.loadDataFromStore(configKey, this_1.storeOptions, "");
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = this.props.control.DataProviderConfigKeys; _b < _c.length; _b++) {
                var configKey = _c[_b];
                _loop_1(configKey);
            }
        }
        for (var _d = 0, _e = this.props.control.DataBinders; _d < _e.length; _d++) {
            var binder = _e[_d];
            var key = this.props.inputKey + "_" + binder;
            if (this.ConfigProperties[binder])
                this.storeOptions(key, this.ConfigProperties[binder], "", false);
            else {
                this.loadDataFromStore(key, this.storeOptions, "");
            }
        }
    };
    /**
     * Unmount the current control.
     */
    FormBaseInput.prototype.componentWillUnmount = function () {
        this.debouncedSubmitValue.flush();
        this.formContext.unmountInput(this);
    };
    /**
     * Validate the input. By default, this function will run through all the validators and ensure they pass
     */
    FormBaseInput.prototype.doValidate = function () {
        var _a = this.props.validators, validators = _a === void 0 ? [] : _a;
        var validationResult = {
            isValid: true,
            component: this
        };
        for (var _i = 0, _b = validators; _i < _b.length; _i++) {
            var validator = _b[_i];
            var error = validator(this.state.currentValue);
            if (error) {
                validationResult.isValid = false;
                validationResult.errorMessage = error;
                return validationResult;
            }
        }
        return validationResult;
    };
    /**
     * Set the error state of this input
     * @param errorMessage Message to set to the state.
     */
    FormBaseInput.prototype.setError = function (errorMessage) {
        this.setState(function (prevState) {
            prevState.isValid = false;
            prevState.currentError = errorMessage;
            return prevState;
        });
    };
    /**
     * Clear any errors from this input
     */
    FormBaseInput.prototype.clearError = function () {
        this.setState(function (prevState) {
            prevState.isValid = true;
            prevState.currentError = undefined;
            return prevState;
        });
    };
    /**
     * Set the current value of this input and validate it
     * @param value The value to set
     * @param validate True if the value should be validated.
     */
    FormBaseInput.prototype.setValue = function (value, validate, skipSendValue) {
        var _this = this;
        this.setState(function (prevState) {
            _this.props.control.Value = value;
            prevState.currentValue = value;
            return prevState;
        }, function () {
            _this.debouncedSubmitValue(_this, validate, skipSendValue);
        });
    };
    FormBaseInput.contextTypes = {
        isFormValid: PropTypes.func.isRequired,
        mountInput: PropTypes.func.isRequired,
        unmountInput: PropTypes.func.isRequired,
        submitValue: PropTypes.func.isRequired,
        formData: PropTypes.object.isRequired,
        container: PropTypes.object.isRequired
    };
    __decorate([
        utilities_1.autobind
    ], FormBaseInput.prototype, "storeOptions", null);
    __decorate([
        utilities_1.autobind
    ], FormBaseInput.prototype, "getErrorMessage", null);
    return FormBaseInput;
}(Utilities_1.BaseComponent));
exports.FormBaseInput = FormBaseInput;
//# sourceMappingURL=FormBaseInput.js.map