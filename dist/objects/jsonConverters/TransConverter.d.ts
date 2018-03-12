import { JsonCustomConvert } from "json2typescript";
/**
* Translation Bag Converter
*/
export declare class TransConverter implements JsonCustomConvert<Translate[]> {
    serialize(translations: Translate[]): any;
    deserialize(lang: any): Translate[];
}
/**
* Translation Bag
*/
export declare class Translate {
    Lang: string;
    Text: string;
}
