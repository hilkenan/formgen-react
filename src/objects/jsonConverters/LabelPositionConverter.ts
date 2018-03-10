import {JsonCustomConvert, JsonConverter} from "json2typescript";
import { LabelPositions } from "../../Enums";

/**
* Json Converter for a LabelPorision Enum
*/ 
@JsonConverter
export class LabelPositionConverter implements JsonCustomConvert<LabelPositions> {
    serialize(position: LabelPositions): any {
        return JSON.parse("[\"" + position.toString() + "\"]");
    }
    deserialize(typeJson: any): LabelPositions {
        let value = JSON.stringify(typeJson[0]).replace("\"","").replace("\"","");
        return LabelPositions[value];
    }
}
