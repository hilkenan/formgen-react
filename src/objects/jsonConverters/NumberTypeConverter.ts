import { JsonConverter, JsonCustomConvert } from "json2typescript";

/**
* Json Converter for a ValidatorTypes Enum
*/ 
@JsonConverter
export class NumberTypeConverter implements JsonCustomConvert<Number> {
    serialize(number: any): any {
        return JSON.parse(number);
    }
    deserialize(typeJson: any): number {
        let value = JSON.stringify(typeJson);
        return parseFloat(value)
    }
}
