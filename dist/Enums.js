"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum for the type of the standard Controls
 */
var ControlTypes;
(function (ControlTypes) {
    ControlTypes["DropDown"] = "DropDown";
    ControlTypes["CascadingDropDown"] = "CascadingDropDown";
    ControlTypes["ComboBox"] = "ComboBox";
    ControlTypes["ChoiceGroup"] = "ChoiceGroup";
    ControlTypes["Checkbox"] = "Checkbox";
    ControlTypes["Textbox"] = "Textbox";
    ControlTypes["RichtTex"] = "RichtTex";
    ControlTypes["MaskedTextbox"] = "MaskedTextbox";
    ControlTypes["DatePicker"] = "DatePicker";
    ControlTypes["Time"] = "Time";
    ControlTypes["InfoText"] = "InfoText";
    ControlTypes["Rating"] = "Rating";
    ControlTypes["Slider"] = "Slider";
    ControlTypes["SpinButton"] = "SpinButton";
    ControlTypes["Toggle"] = "Toggle";
    ControlTypes["TabContainer"] = "TabContainer";
    ControlTypes["Tab"] = "Tab";
    ControlTypes["Custom"] = "Custom";
    ControlTypes["SubmitButton"] = "SubmitButton";
    ControlTypes["CancelButton"] = "CancelButton";
    ControlTypes["CustomButton"] = "CustomButton";
    ControlTypes["PeoplePicker"] = "PeoplePicker";
    ControlTypes["DateTimePicker"] = "DateTimePicker";
    ControlTypes["TimePicker"] = "TimePicker";
    ControlTypes["FileUpload"] = "FileUpload";
})(ControlTypes = exports.ControlTypes || (exports.ControlTypes = {}));
/**
 * Enum for all current supported Languages
 */
var SupportedLanguages;
(function (SupportedLanguages) {
    SupportedLanguages["de"] = "de";
    SupportedLanguages["en"] = "en";
    SupportedLanguages["fr"] = "fr";
    SupportedLanguages["es"] = "es";
    SupportedLanguages["it"] = "it";
})(SupportedLanguages = exports.SupportedLanguages || (exports.SupportedLanguages = {}));
/**
 * Enum for Rendering the position of lablels
 */
var LabelPositions;
(function (LabelPositions) {
    LabelPositions["Top"] = "Top";
    LabelPositions["Left"] = "Left";
    LabelPositions["Right"] = "Right";
})(LabelPositions = exports.LabelPositions || (exports.LabelPositions = {}));
/**
 * Enum for the Type of used Type of Binders.
 */
var BinderType;
(function (BinderType) {
    BinderType["Sync"] = "Sync";
    BinderType["Async"] = "Async";
    BinderType["AsyncFilter"] = "AsyncFilter";
})(BinderType = exports.BinderType || (exports.BinderType = {}));
/**
 * Enum for Translation Properites
 */
var TranslatedProperty;
(function (TranslatedProperty) {
    TranslatedProperty["Title"] = "Title";
    TranslatedProperty["Info"] = "Info";
    TranslatedProperty["Message"] = "Message";
    TranslatedProperty["Default"] = "Default";
})(TranslatedProperty = exports.TranslatedProperty || (exports.TranslatedProperty = {}));
/**
 * Enum for used Form Actions
 */
var FormActions;
(function (FormActions) {
    FormActions["Submit"] = "Submit";
    FormActions["InvalidSubmit"] = "InvalidSubmit";
    FormActions["Cancel"] = "Cancel";
    FormActions["Reset"] = "Reset";
    FormActions["Custom"] = "Custom";
})(FormActions = exports.FormActions || (exports.FormActions = {}));
/**
 * Enum for possible form control validators
 */
var ValidatorTypes;
(function (ValidatorTypes) {
    ValidatorTypes["Required"] = "Required";
    ValidatorTypes["Integer"] = "Integer";
    ValidatorTypes["Number"] = "Number";
    ValidatorTypes["MaxLength"] = "MaxLength";
    ValidatorTypes["MinLength"] = "MinLength";
    ValidatorTypes["MinValue"] = "MinValue";
    ValidatorTypes["MaxValue"] = "MaxValue";
    ValidatorTypes["Length"] = "Length";
    ValidatorTypes["Regex"] = "Regex";
    ValidatorTypes["Custom"] = "Custom";
})(ValidatorTypes = exports.ValidatorTypes || (exports.ValidatorTypes = {}));
//# sourceMappingURL=Enums.js.map