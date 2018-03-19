import { JsonCustomConvert } from "json2typescript";
/**
* Json Converter for a ValidatorTypes Enum
*/
export declare class NumberTypeConverter implements JsonCustomConvert<Number> {
    serialize(number: any): any;
    deserialize(typeJson: any): number;
}
