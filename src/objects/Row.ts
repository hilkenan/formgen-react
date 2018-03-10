import { JsonProperty, JsonObject } from "json2typescript";
import { Column } from "./Column";

/**
* Row object for Rendering
*/  
@JsonObject
export class Row {
    @JsonProperty("columns", [Column])
    Columns: Column[] = [];    
}