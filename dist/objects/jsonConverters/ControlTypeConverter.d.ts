import { JsonCustomConvert } from "json2typescript";
import { ControlTypes } from "../../Enums";
/**
* Json Converter for a ControlType Enum
*/
export declare class ControlTypeConverter implements JsonCustomConvert<ControlTypes> {
    serialize(controlType: ControlTypes): any;
    deserialize(typeJson: any): ControlTypes;
}
