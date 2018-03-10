import {JsonObject, JsonProperty, Any } from "json2typescript";
import { Control } from "./Control";

/**
* Column object for Rendering
*/  
@JsonObject
export class Column {
    @JsonProperty("css_class", String, true) 
    CssClass?: string = undefined;

    @JsonProperty("styles", Any, true) 
    Styles?: any = undefined;

    @JsonProperty("label_with", Number, true) 
    LabelWith?: number = undefined;

    @JsonProperty("controls", [Control]) 
    Controls: Control[] = [];
}