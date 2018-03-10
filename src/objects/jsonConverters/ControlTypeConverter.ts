import {JsonCustomConvert, JsonConverter} from "json2typescript";
import { ControlTypes } from "../../Enums";

/**
* Json Converter for a ControlType Enum
*/ 
@JsonConverter
export class ControlTypeConverter implements JsonCustomConvert<ControlTypes> {
    serialize(controlType: ControlTypes): any {
        return JSON.parse("[\"" + controlType.toString() + "\"]");
    }
    deserialize(typeJson: any): ControlTypes {
        let value = JSON.stringify(typeJson[0]).replace("\"","").replace("\"","");
        return ControlTypes[value];
    }
}
