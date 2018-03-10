import {JsonCustomConvert, JsonConverter} from "json2typescript";
import { ValidatorTypes } from "../../Enums";

/**
* Json Converter for a ValidatorTypes Enum
*/ 
@JsonConverter
export class ValidatorTypeConverter implements JsonCustomConvert<ValidatorTypes> {
    serialize(validatorType: ValidatorTypes): any {
        return JSON.parse("[\"" + validatorType.toString() + "\"]");
    }
    deserialize(typeJson: any): ValidatorTypes {
        let value = JSON.stringify(typeJson[0]).replace("\"","").replace("\"","");
        return ValidatorTypes[value];
    }
}
