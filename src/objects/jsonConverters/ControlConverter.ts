import {JsonCustomConvert, JsonConverter} from "json2typescript";
import { ObjectFabric } from "../ObjectFabric";
import { Control } from "../Control";

/**
* Json Converter for a Control
*/ 
@JsonConverter
export class ControlConverter implements JsonCustomConvert<Control[]> {
    serialize(controls: Control[]): any {
        let ctrlJson:any[] = [];
        for(let ctrl of controls)
            ctrlJson.push(ObjectFabric.getJsonFromControl(ctrl));
        return ctrlJson;
    }
    deserialize(controlsJson: any):Control[] {
        let ctrls:Control[] = [];
        for(let ctrlJson of controlsJson)
            ctrls.push(ObjectFabric.getControl(ctrlJson));
        return ctrls;
    }
}
