import { JsonCustomConvert } from "json2typescript";
import { LabelPositions } from "../../Enums";
/**
* Json Converter for a LabelPorision Enum
*/
export declare class LabelPositionConverter implements JsonCustomConvert<LabelPositions> {
    serialize(position: LabelPositions): any;
    deserialize(typeJson: any): LabelPositions;
}
