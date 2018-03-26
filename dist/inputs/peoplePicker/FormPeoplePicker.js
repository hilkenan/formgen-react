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
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var FormBaseInput_1 = require("../../formBaseInput/FormBaseInput");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var InnerControl_1 = require("../../controls/innerControl/InnerControl");
var Rendering_1 = require("../../form/Rendering");
;
var Helper_1 = require("../../Helper");
var LocalsPeoplePicker_1 = require("../../locales/LocalsPeoplePicker");
/**
 * People picker control. Let choose one ore more Persons.
 */
var FormPeoplePicker = /** @class */ (function (_super) {
    __extends(FormPeoplePicker, _super);
    function FormPeoplePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.peopleListFilterFunction = _this.props.inputKey + "_filteredPeoples";
        _this.state = {
            isValid: true,
            currentValue: _this.props.control.Value,
            currentError: undefined,
            mostRecentlyUsed: [],
            peopleList: [],
        };
        _this.pickerSuggestionsProps = _this._getTranslatedTexts();
        return _this;
    }
    /**
     * Translate all the UI text in the correct langauge.
     */
    FormPeoplePicker.prototype._getTranslatedTexts = function () {
        var ppFormater = Helper_1.Helper.getTranslator("peoplepicker").formatMessage;
        var suggestionProps = {
            suggestionsHeaderText: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.suggestionsHeaderText),
            mostRecentlyUsedHeaderText: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.mostRecentlyUsedHeaderText),
            noResultsFoundText: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.noResultsFoundText),
            loadingText: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.loadingText),
            showRemoveButtons: true,
            suggestionsAvailableAlertText: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.suggestionsAvailableAlertText),
            suggestionsContainerAriaLabel: ppFormater(LocalsPeoplePicker_1.LocalsPeoplePicker.suggestionsContainerAriaLabel),
        };
        return suggestionProps;
    };
    /**
     * Render a Fabric DatePicker
     */
    FormPeoplePicker.prototype.render = function () {
        var _this = this;
        return (React.createElement(InnerControl_1.InnerControl, { BaseControl: this, LabelWith: this.props.labelWith },
            React.createElement(office_ui_fabric_react_1.CompactPeoplePicker, __assign({ pickerSuggestionsProps: this.pickerSuggestionsProps }, this.ConfigProperties, { 
                // These props cannot be overridden
                ref: function (input) { return _this.innerControl = input; }, key: this.props.inputKey, onRemoveSuggestion: this._onRemoveSuggestion, onResolveSuggestions: this._onFilterChanged, className: 'ms-PeoplePicker', selectedItems: this.state.currentValue, onChange: this._onItemsChange, getTextFromItem: this._getTextFromItem, onEmptyInputFocus: this._returnMostRecentlyUsed, onValidateInput: this._validateInput })),
            this.state.currentError && Rendering_1.default.renderError(this.state.currentError)));
    };
    /**
     * Event when user want remove an person from the sugestion list.
     * @param item The Person that should removed
     */
    FormPeoplePicker.prototype._onRemoveSuggestion = function (item) {
        var _a = this.state, peopleList = _a.peopleList, mruState = _a.mostRecentlyUsed;
        var indexPeopleList = peopleList.indexOf(item);
        var indexMostRecentlyUsed = mruState.indexOf(item);
        if (indexPeopleList >= 0) {
            var newPeople = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
            this.setState({ peopleList: newPeople });
        }
        if (indexMostRecentlyUsed >= 0) {
            var newSuggestedPeople = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
            this.setState({ mostRecentlyUsed: newSuggestedPeople });
        }
    };
    /**
     * Returns an array of person with the most recend used persons
     * @param currentPersonas The Persons that allready are choosed
     */
    FormPeoplePicker.prototype._returnMostRecentlyUsed = function (currentPersonas) {
        var mostRecentlyUsed = this.state.mostRecentlyUsed;
        mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
        return mostRecentlyUsed;
    };
    /**
     * Remove dupplicate persons
     * @param personas The Person array with the persons to check,
     * @param possibleDupes Array of Persons with potential dupplicates
     */
    FormPeoplePicker.prototype._removeDuplicates = function (personas, possibleDupes) {
        var _this = this;
        return personas.filter(function (persona) { return !_this._listContainsPersona(persona, possibleDupes); });
    };
    /**
     * Check if a person exist in the list.
     * @param persona The Person to check
     * @param personas Array of Persons to search in
     */
    FormPeoplePicker.prototype._listContainsPersona = function (persona, personas) {
        if (!personas || !personas.length || personas.length === 0) {
            return false;
        }
        return personas.filter(function (item) { return item.primaryText === persona.primaryText; }).length > 0;
    };
    /**
     * Resolve the Dipslay name of an Person
     * @param persona The Person to resolve
     */
    FormPeoplePicker.prototype._getTextFromItem = function (persona) {
        return persona.primaryText;
    };
    /**
     * Validate any input string. If an (@) is in the string then its a valid email.
     * @param input String to validate
     */
    FormPeoplePicker.prototype._validateInput = function (input) {
        if (input.indexOf('@') !== -1) {
            return office_ui_fabric_react_1.ValidationState.valid;
        }
        else if (input.length > 1) {
            return office_ui_fabric_react_1.ValidationState.warning;
        }
        else {
            return office_ui_fabric_react_1.ValidationState.invalid;
        }
    };
    /**
     * Event when a user enter a filter criteria. Call the databinding store with the filter to search for persons.
     * @param filterText Entered Filtertext.
     * @param currentPersonas The current set persons (for remove the dupplicates)
     * @param limitResults Maximal amount of numbers to return
     */
    FormPeoplePicker.prototype._onFilterChanged = function (filterText, currentPersonas, limitResults) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (filterText && _this.retrievFilterData[_this.peopleListFilterFunction]) {
                var retrieverBinder = _this.retrievFilterData[_this.peopleListFilterFunction];
                retrieverBinder.retrieveData(_this.props.control, Helper_1.Helper.getLanguage(), filterText, limitResults).then(function (filteredPersonas) {
                    filteredPersonas = _this._removeDuplicates(filteredPersonas, currentPersonas);
                    _this.setState({ mostRecentlyUsed: filteredPersonas });
                    resolve(filteredPersonas);
                });
            }
            else {
                resolve([]);
            }
        });
    };
    /**
     * Event when the selection has changed. Store the array of persons.
     * @param items Array of personas to store
     */
    FormPeoplePicker.prototype._onItemsChange = function (items) {
        var alloMulti = this.ConfigProperties.allowMultiple != undefined ? this.ConfigProperties.allowMultiple : true;
        var personas = alloMulti ? items : items.splice(items.length - 1, 1);
        this.setValue(personas, true);
    };
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_onRemoveSuggestion", null);
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_returnMostRecentlyUsed", null);
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_getTextFromItem", null);
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_validateInput", null);
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_onFilterChanged", null);
    __decorate([
        Utilities_1.autobind
    ], FormPeoplePicker.prototype, "_onItemsChange", null);
    return FormPeoplePicker;
}(FormBaseInput_1.FormBaseInput));
exports.FormPeoplePicker = FormPeoplePicker;
//# sourceMappingURL=FormPeoplePicker.js.map