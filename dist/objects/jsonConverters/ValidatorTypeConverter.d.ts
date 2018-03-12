import { JsonCustomConvert } from "json2typescript";
import { ValidatorTypes } from "../../Enums";
/**
* Json Converter for a ValidatorTypes Enum
*/
export declare class ValidatorTypeConverter implements JsonCustomConvert<ValidatorTypes> {
    serialize(validatorType: ValidatorTypes): any;
    deserialize(typeJson: any): ValidatorTypes;
}
