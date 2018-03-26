/// <reference types="react-intl" />
import { ObjectTranslate } from "./objects/ObjectTranslate";
import { TranslatedProperty } from "./Enums";
import { Translate } from "./objects/jsonConverters/TransConverter";
import { IDatePickerStrings } from "office-ui-fabric-react";
import { DataStoreEntry } from "./formBaseInput/FormBaseInput.types";
/**
 * Helper Class with static variables for the Form
 */
export declare class Helper {
    /**
     * Get if available the control key between square brackets in a key
     * @param key The full key to get the value from
     */
    static getControlKeyFromConfigKey(key: string): string;
    /**
     * Get from a key definition everything after the second .
     * @param key The full key to get the value from
     */
    static getConfigKeyFromProviderKey(key: string): string;
    /**
     * Compare two arrays.
     */
    static compareArrays(x: any[], y: any[]): boolean;
    /**
     * Return even the Language set at the form
     * or when not set the language from the users browser.
     */
    static getLanguage(): any;
    /**
     * Day Picker strings in the correct language
     */
    static getDayPickerStrings(): IDatePickerStrings | undefined;
    /**
     * Replace the Row and Element Markes in the Input Key
     * @param inputKey Clean the input key from the Element and Row identifier
     */
    static cleanUpKey(inputKey: string): string;
    /**
     * Translate an object with properties. structure of the key is the structure for the object. Delimited with .
     * @param orgObject Orignal Object to translate.
     * @param translations Translations for the object.
     */
    static getTranslatedObject(orgObject?: any, translations?: ObjectTranslate): any;
    /**
     * Get from the given translatable Property the Translated String or default.
     * @param property Translate the property
     * @param object The Object with the property to translate
     * @param transBag Translation Bag with all translations
     */
    static getTranslatedPropertyFromObject(property: string, object: any, transBag: Translate[]): string;
    /**
     * Calculate the possible Css Number from the UI Fabric React responsive framework min 1 max 12
     * @param countElements Count of Elements that is used. 12 is the maximum of elements that can be used.
     */
    static calculateCssClassColNb(countElements: number): number;
    /**
     * Get the translator object to translate the string from given Component.
     * @param control The name of the control string that has to be return an translator. The are stored at the locals/translation folder
     */
    static getTranslator(control: string): ReactIntl.InjectedIntl;
    /**
     * Get from the given translatable Property the Translated String or default.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     */
    static getTranslatedProperty(property: TranslatedProperty, object: any): string;
    /**
     * Get from the given translatable Property the Translated String or default. If not defined then return message back.
     * @param property Translation Property Type to translate
     * @param object The Source object where the default and the translate bag is located.
     * @param usemissing If true then use the missing literal if not defined otherwise return undefined
     */
    static getTranslatedMessage(property: TranslatedProperty, object: any, usemissing?: boolean): string;
    /**
     * Removes the Suffix from the string
     * @param string The string to remove an suffix
     * @param suffix The suffix to remove
     */
    static removeSuffix(string: string, suffix: string): string;
    /**
     * Check if hafe the suffix.
     * @param string The string to check an suffix
     * @param suffix The suffix to check
     */
    static hasSuffix(string: string, suffix: string): Boolean;
    /**
     * Get even the wait text from the state or Pleace wait text.
     * @param entry The Data store entry.
     * @param defaultText The default Text for the placeholder
     */
    static getPlaceHolderText(entry: DataStoreEntry, defaultText: string): string;
}
