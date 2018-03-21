import {JsonObject, JsonProperty, Any } from "json2typescript";
import { Control } from "./Control";
import { NumberTypeConverter } from "./jsonConverters/NumberTypeConverter";
import { ControlConverter } from "./jsonConverters/ControlConverter";

/**
* Column object for Rendering
*/  
@JsonObject
export class Column {
    @JsonProperty("css_class", String, true) 
    CssClass?: string = undefined;

    @JsonProperty("styles", Any, true) 
    Styles?: any = undefined;

    @JsonProperty("label_with", NumberTypeConverter, true) 
    LabelWith?: number = undefined;

    @JsonProperty("controls", ControlConverter) 
    Controls?:Control[] = [];
}