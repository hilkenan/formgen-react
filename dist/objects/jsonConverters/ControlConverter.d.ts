import { JsonCustomConvert } from "json2typescript";
import { Control } from "../Control";
/**
* Json Converter for a Control
*/
export declare class ControlConverter implements JsonCustomConvert<Control[]> {
    serialize(controls: Control[]): any;
    deserialize(controlsJson: any): Control[];
}
