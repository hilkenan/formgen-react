import { ObjectTranslate } from "./objects/ObjectTranslate";
import { TranslatedProperty, SupportedLanguages } from "./Enums";
import { Translate } from "./objects/jsonConverters/TransConverter";
import { IDatePickerStrings } from "office-ui-fabric-react";
import { DayPickerStrings } from "./locales/DayPickerStrings";
import { IntlProvider } from "react-intl";
import { LocalsCommon } from "./locales/LocalsCommon";
import { DataStoreEntry } from "./formBaseInput/FormBaseInput.types";
import { FormLanguage } from "./form/Form";
let locale = require('browser-locale')()

/**
 * Helper Class with static variables for the Form 
 */    
export class Helper {

    /**
     * Get if available the control key between square brackets in a key
     * @param key The full key to get the value from
     */    
    public static getControlKeyFromConfigKey(key: string):string {
        let result = key.match("\\[(.*)]")
        if (result)
            return result[0].substring(1,result[0].length-1);
        else
            return undefined;
    }

    /**
     * Replace the all occurencies from search in the target with replacments
     * @param target the origin string
     * @param search the search string
     * @param replacement the replacment string
     */                 
    public static replaceAll(target:string, search:string, replacement: string) {
        return target.split(search).join(replacement);
    }
    
    /**
     * Get from a key definition everything after the second .
     * @param key The full key to get the value from
     */    
    public static getConfigKeyFromProviderKey(key:string): string {
        let startIndex = key.indexOf("]");
        let startIndexDot = key.indexOf(".");
        
        if (startIndex == -1 && startIndexDot != -1) {
            return key.substring(startIndexDot + 1)
        }
        else if (startIndex != -1) {
            return key.substring(startIndex + 2)
        }
        else
            return key;
    }

    /**
     * Compare two arrays.
     */    
    public static compareArrays(x:any[], y:any[]) {
        var objectsAreSame = true;
        if (x.length == 0 && y.length == 0) return true;
        if (x.length != y.length) return false;
        for(let i = 0;i < x.length;i++) {
            let objectA = x[i];
            let objectB = y[i];
            for(var propertyName in objectA) {
                if(objectA[propertyName] !== objectB[propertyName]) {
                    objectsAreSame = false;
                    break;
                }
            }
        }
        return objectsAreSame;
    }

    /**
     * Return even the Language set at the form 
     * or when not set the language from the users browser.
     */    
    public static getLanguage() {
        if (FormLanguage != undefined && FormLanguage != "") return FormLanguage;
        return locale.split('-')[0];
    }

    /**
     * Day Picker strings in the correct language
     */    
    public static getDayPickerStrings():IDatePickerStrings | undefined {
        return Helper.getLanguage().toUpperCase() != "EN" ? DayPickerStrings[Helper.getLanguage().toUpperCase()] : undefined;
    }

    /**
     * Replace the Row and Element Markes in the Input Key
     * @param inputKey Clean the input key from the Element and Row identifier 
     */    
    public static cleanUpKey(inputKey:string) {
        inputKey = inputKey.replace(new RegExp("/E", 'g'), "");
        return inputKey.replace(new RegExp("/R", 'g'), "");
    }

    /**
     * Translate an object with properties. structure of the key is the structure for the object. Delimited with .
     * @param orgObject Orignal Object to translate. 
     * @param translations Translations for the object.
     */    
    public static getTranslatedObject(orgObject?: any, translations?: ObjectTranslate): any {
        if (translations && orgObject) {
            for(let prop of translations.Properties) {
                let keys:string[] = prop.Key.split(".");
                let objectToTrans:any;
                if (keys.length > 1) {
                    let lastKeyName = keys[keys.length-1];
                    let key = "";
                    let index = -1;
                    for(let i = 0; i < keys.length-1; i++) {
                        let startSqare:number = keys[i].indexOf("[");
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
                        objectToTrans = Helper.getTranslatedPropertyFromObject(lastKeyName,objectToTrans, prop.ObjectTranslates)
                        if (orgObject[key]) {
                            if (index > -1)
                            orgObject[key][index][lastKeyName]  = objectToTrans;
                        else
                            orgObject[key][lastKeyName] = objectToTrans;
                        }
                    }
                }
                else {
                    orgObject[prop.Key] = Helper.getTranslatedPropertyFromObject(prop.Key,orgObject, prop.ObjectTranslates)
                }
            }
        }
        return orgObject;
    }     

    /**
     * Get from the given translatable Property the Translated String or default.
     * @param property Translate the property
     * @param object The Object with the property to translate
     * @param transBag Translation Bag with all translations
     */    
    public static getTranslatedPropertyFromObject(property:string, object:any, transBag:Translate[]): string{
        let defaultName = object[property];
        if (transBag && transBag.length > 0) {
            let translation = transBag.find(l => l.Lang == Helper.getLanguage().toLowerCase());
            if (translation)
                return translation.Text;
        }
        return defaultName;
    }
    
    /**
     * Calculate the possible Css Number from the UI Fabric React responsive framework min 1 max 12
     * @param countElements Count of Elements that is used. 12 is the maximum of elements that can be used.
     */    
    public static calculateCssClassColNb(countElements: number) {
        let cssNr:number = 12 / countElements;
        if (cssNr < 1) 
            cssNr = 1;

        cssNr = parseInt(cssNr.toString());
        if (cssNr > 12)
            cssNr = 12;
        return cssNr;
    }

    /**
     * Get the translator object to translate the string from given Component.
     * @param control The name of the control string that has to be return an translator. The are stored at the locals/translation folder
     */    
    public static getTranslator(control:string) {
        let messages = null;
        let language = Helper.getLanguage();
        let lang = SupportedLanguages[language];

        if (lang != undefined && lang != "en")
          messages = require('./locales/translations/' + control + '-' + language + '.json');
        else if (lang != "en")
          messages = require('./locales/translations/' + control + '-de.json');
  
        const { intl } = new IntlProvider({
            locale: language,
            messages: messages != null ? messages.messages : null
        }).getChildContext();
        return intl;
      }
      
    /**
     * Get from the given translatable Property the Translated String or default.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     */    
    public static getTranslatedProperty(property:TranslatedProperty, object:any): string{
        let defaultName = object[property];
        let transBag = object[property + "Translates"] as Array<Translate>;
        if (transBag && transBag.length > 0) {
            let translation = transBag.find(l => l.Lang == Helper.getLanguage().toLowerCase());
            if (translation)
                return translation.Text;
        }
        return defaultName;
    }

    /**
     * Get from the given translatable Property the Translated String or default. If not defined then return message back.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     * @param usemissing If true then use the missing literal if not defined otherwise return undefined
     */    
    public static getTranslatedMessage(property:TranslatedProperty, object:any, usemissing?:boolean): string{
        let missingMessage = "<Message not defined>";
        let defaultName = object[property];
        if (!defaultName && (usemissing === true)) return missingMessage;
        return Helper.getTranslatedProperty(property, object);
    }

    /**
     * Removes the Suffix from the string
     * @param string The string to remove an suffix
     * @param suffix The suffix to remove
     */    
    public static removeSuffix(string: string, suffix: string): string {
        if (!Helper.hasSuffix(string, suffix)) {
          return string;
        }
        return string.substr(0, string.length - suffix.length);
    }

    /**
     * Check if hafe the suffix.
     * @param string The string to check an suffix
     * @param suffix The suffix to check
     */    
    public static hasSuffix(string: string, suffix: string): Boolean {
        if (!suffix) return false;
        let subString = string.substr(string.length - suffix.length);
        return subString === suffix;
    }    
    
    /**
     * Get even the wait text from the state or Pleace wait text.
     * @param entry The Data store entry.
     * @param defaultText The default Text for the placeholder
     */    
    public static getPlaceHolderText(entry: DataStoreEntry, defaultText: string): string {
        let placeHolder = "";
        if (entry && entry.waitText)
            placeHolder = entry.waitText;
        else if (defaultText) {
            placeHolder = defaultText;
        } else {
            let commonFormater = Helper.getTranslator("common");
            placeHolder = commonFormater.formatMessage(LocalsCommon.pleaseSelect) ;            
        }

        return placeHolder;
    }
}
