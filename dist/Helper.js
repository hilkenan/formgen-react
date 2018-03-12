"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("./Enums");
var DayPickerStrings_1 = require("./locales/DayPickerStrings");
var react_intl_1 = require("react-intl");
var LocalsCommon_1 = require("./locales/LocalsCommon");
var Form_1 = require("./form/Form");
var locale = require('browser-locale')();
/**
 * Helper Class with static variables for the Form
 */
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getLanguage = function () {
        if (Form_1.FormLanguage != undefined && Form_1.FormLanguage != "")
            return Form_1.FormLanguage;
        return locale.split('-')[0];
    };
    /**
     * Day Picker strings in the correct language
     */
    Helper.getDayPickerStrings = function () {
        return Helper.getLanguage().toUpperCase() != "EN" ? DayPickerStrings_1.DayPickerStrings[Helper.getLanguage().toUpperCase()] : undefined;
    };
    /**
     * Replace the Row and Element Markes in the Input Key
     */
    Helper.cleanUpKey = function (inputKey) {
        inputKey = inputKey.replace(new RegExp("/E", 'g'), "");
        return inputKey.replace(new RegExp("/R", 'g'), "");
    };
    /**
     * Translate an object with properties. structure of the key is the structure for the object. Delimited with .
     */
    Helper.getTranslatedObject = function (orgObject, translations) {
        if (translations && orgObject) {
            for (var _i = 0, _a = translations.Properties; _i < _a.length; _i++) {
                var prop = _a[_i];
                var keys = prop.Key.split(".");
                var objectToTrans = orgObject;
                if (keys.length > 1) {
                    var lastKeyName = keys[keys.length - 1];
                    for (var i = 0; i < keys.length - 2; i++) {
                        objectToTrans = orgObject[keys[i]];
                    }
                    objectToTrans = Helper.getTranslatedPropertyFromObject(lastKeyName, objectToTrans, prop.ObjectTranslates);
                }
                else {
                    orgObject[prop.Key] = Helper.getTranslatedPropertyFromObject(prop.Key, orgObject, prop.ObjectTranslates);
                }
            }
        }
        return orgObject;
    };
    /**
     * Get from the given translatable Property the Translated String or default.
     */
    Helper.getTranslatedPropertyFromObject = function (property, object, transBag) {
        var defaultName = object[property];
        if (transBag && transBag.length > 0) {
            var translation = transBag.find(function (l) { return l.Lang == Helper.getLanguage().toLowerCase(); });
            if (translation)
                return translation.Text;
        }
        return defaultName;
    };
    /**
     * Calculate the possible Css Number from the UI Fabric React responsive framework min 1 max 12
     */
    Helper.calculateCssClassColNb = function (countElements) {
        var cssNr = 12 / countElements;
        if (cssNr < 1)
            cssNr = 1;
        cssNr = parseInt(cssNr.toString());
        if (cssNr > 12)
            cssNr = 12;
        return cssNr;
    };
    /**
     * Get the translator object to translate the string from given Component.
     */
    Helper.getTranslator = function (control) {
        var messages = null;
        var language = Helper.getLanguage();
        var lang = Enums_1.SupportedLanguages[language];
        if (lang != undefined && lang != "en")
            messages = require('./locales/translations/' + control + '-' + language + '.json');
        else if (lang != "en")
            messages = require('./locales/translations/' + control + '-de.json');
        var intl = new react_intl_1.IntlProvider({
            locale: language,
            messages: messages != null ? messages.messages : null
        }).getChildContext().intl;
        return intl;
    };
    /**
     * Get from the given translatable Property the Translated String or default.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     */
    Helper.getTranslatedProperty = function (property, object) {
        var defaultName = object[property];
        var transBag = object[property + "Translates"];
        if (transBag && transBag.length > 0) {
            var translation = transBag.find(function (l) { return l.Lang == Helper.getLanguage().toLowerCase(); });
            if (translation)
                return translation.Text;
        }
        return defaultName;
    };
    /**
     * Get from the given translatable Property the Translated String or default. If not defined then return message back.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     * @param usemissing If true then use the missing literal if not defined otherwise return undefined
     */
    Helper.getTranslatedMessage = function (property, object, usemissing) {
        var missingMessage = "<Message not defined>";
        var defaultName = object[property];
        if (!defaultName && (usemissing === true))
            return missingMessage;
        return Helper.getTranslatedProperty(property, object);
    };
    /**
     * Removes the Suffix from the string
     */
    Helper.removeSuffix = function (string, suffix) {
        if (!Helper.hasSuffix(string, suffix)) {
            return string;
        }
        return string.substr(0, string.length - suffix.length);
    };
    /**
     * Check if hafe the suffix.
     */
    Helper.hasSuffix = function (string, suffix) {
        if (!suffix)
            return false;
        var subString = string.substr(string.length - suffix.length);
        return subString === suffix;
    };
    /**
     * Get even the wait text from the state or Pleace wait text.
     * @param state State object.
     */
    Helper.getPlaceHolderText = function (entry, defaultText) {
        var placeHolder = "";
        if (entry && entry.waitText)
            placeHolder = entry.waitText;
        else if (defaultText) {
            placeHolder = defaultText;
        }
        else {
            var commonFormater = Helper.getTranslator("common");
            placeHolder = commonFormater.formatMessage(LocalsCommon_1.LocalsCommon.pleaseSelect);
        }
        return placeHolder;
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map