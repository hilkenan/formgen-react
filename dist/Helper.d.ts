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
    static getLanguage(): any;
    /**
     * Day Picker strings in the correct language
     */
    static getDayPickerStrings(): IDatePickerStrings | undefined;
    /**
     * Replace the Row and Element Markes in the Input Key
     */
    static cleanUpKey(inputKey: string): string;
    /**
     * Translate an object with properties. structure of the key is the structure for the object. Delimited with .
     */
    static getTranslatedObject(orgObject?: any, translations?: ObjectTranslate): any;
    /**
     * Get from the given translatable Property the Translated String or default.
     */
    static getTranslatedPropertyFromObject(property: string, object: any, transBag: Translate[]): string;
    /**
     * Calculate the possible Css Number from the UI Fabric React responsive framework min 1 max 12
     */
    static calculateCssClassColNb(countElements: number): number;
    /**
     * Get the translator object to translate the string from given Component.
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
     */
    static removeSuffix(string: string, suffix: string): string;
    /**
     * Check if hafe the suffix.
     */
    static hasSuffix(string: string, suffix: string): Boolean;
    /**
     * Get even the wait text from the state or Pleace wait text.
     * @param state State object.
     */
    static getPlaceHolderText(entry: DataStoreEntry, defaultText: string): string;
}
