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
    /**
     * Get if available the control key between square brackets in a key
     * @param key The full key to get the value from
     */
    Helper.getControlKeyFromConfigKey = function (key) {
        var result = key.match("\\[(.*)]");
        if (result)
            return result[0].substring(1, result[0].length - 1);
        else
            return undefined;
    };
    /**
     * Replace the all occurencies from search in the target with replacments
     * @param target the origin string
     * @param search the search string
     * @param replacement the replacment string
     */
    Helper.replaceAll = function (target, search, replacement) {
        return target.split(search).join(replacement);
    };
    /**
     * Get from a key definition everything after the second .
     * @param key The full key to get the value from
     */
    Helper.getConfigKeyFromProviderKey = function (key) {
        var startIndex = key.indexOf("]");
        var startIndexDot = key.indexOf(".");
        if (startIndex == -1 && startIndexDot != -1) {
            return key.substring(startIndexDot + 1);
        }
        else if (startIndex != -1) {
            return key.substring(startIndex + 2);
        }
        else
            return key;
    };
    /**
     * Compare two arrays.
     */
    Helper.compareArrays = function (x, y) {
        var objectsAreSame = true;
        if (x.length == 0 && y.length == 0)
            return true;
        if (x.length != y.length)
            return false;
        for (var i = 0; i < x.length; i++) {
            var objectA = x[i];
            var objectB = y[i];
            for (var propertyName in objectA) {
                if (objectA[propertyName] !== objectB[propertyName]) {
                    objectsAreSame = false;
                    break;
                }
            }
        }
        return objectsAreSame;
    };
    /**
     * Return even the Language set at the form
     * or when not set the language from the users browser.
     */
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
     * @param inputKey Clean the input key from the Element and Row identifier
     */
    Helper.cleanUpKey = function (inputKey) {
        inputKey = inputKey.replace(new RegExp("/E", 'g'), "");
        return inputKey.replace(new RegExp("/R", 'g'), "");
    };
    /**
     * Translate an object with properties. structure of the key is the structure for the object. Delimited with .
     * @param orgObject Orignal Object to translate.
     * @param translations Translations for the object.
     */
    Helper.getTranslatedObject = function (orgObject, translations) {
        if (translations && orgObject) {
            for (var _i = 0, _a = translations.Properties; _i < _a.length; _i++) {
                var prop = _a[_i];
                var keys = prop.Key.split(".");
                var objectToTrans = void 0;
                if (keys.length > 1) {
                    var lastKeyName = keys[keys.length - 1];
                    var key = "";
                    var index = -1;
                    for (var i = 0; i < keys.length - 1; i++) {
                        var startSqare = keys[i].indexOf("[");
                        if (keys[i].indexOf("[") > 0) {
                            key = keys[i].substring(0, startSqare);
                            index = parseInt(keys[i].substring((startSqare + 1), keys[i].indexOf("]")));
                            objectToTrans = orgObject[key][index];
                        }
                        else {
                            key = keys[i];
                            objectToTrans = orgObject[key];
                        }
                    }
                    if (objectToTrans) {
                        objectToTrans = Helper.getTranslatedPropertyFromObject(lastKeyName, objectToTrans, prop.ObjectTranslates);
                        if (orgObject[key]) {
                            if (index > -1)
                                orgObject[key][index][lastKeyName] = objectToTrans;
                            else
                                orgObject[key][lastKeyName] = objectToTrans;
                        }
                    }
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
     * @param property Translate the property
     * @param object The Object with the property to translate
     * @param transBag Translation Bag with all translations
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
     * @param countElements Count of Elements that is used. 12 is the maximum of elements that can be used.
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
     * @param control The name of the control string that has to be return an translator. The are stored at the locals/translation folder
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
     * @param string The string to remove an suffix
     * @param suffix The suffix to remove
     */
    Helper.removeSuffix = function (string, suffix) {
        if (!Helper.hasSuffix(string, suffix)) {
            return string;
        }
        return string.substr(0, string.length - suffix.length);
    };
    /**
     * Check if hafe the suffix.
     * @param string The string to check an suffix
     * @param suffix The suffix to check
     */
    Helper.hasSuffix = function (string, suffix) {
        if (!suffix)
            return false;
        var subString = string.substr(string.length - suffix.length);
        return subString === suffix;
    };
    /**
     * Get even the wait text from the state or Pleace wait text.
     * @param entry The Data store entry.
     * @param defaultText The default Text for the placeholder
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