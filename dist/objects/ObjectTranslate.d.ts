import { Translate } from "./jsonConverters/TransConverter";
/**
* Property for an Translation of an Property at an object. The key has to be delimited with .
* Eg: Object.SubObject.propertyName
*/
export declare class Property {
    Key: string;
    ObjectTranslates: Translate[];
}
/**
* Collection of Properties to translate in an object.
*/
export declare class ObjectTranslate {
    Properties: Property[];
}
