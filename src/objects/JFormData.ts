import {JsonObject, JsonProperty } from "json2typescript";
import { Row } from "./Row";
import { TransConverter, Translate } from "./jsonConverters/TransConverter";

/**
* FormData object for Rendering
*/  
@JsonObject
export class JFormData {
    @JsonProperty("id", String) 
    ID: string = "";
    
    @JsonProperty("title", String, true) 
    Title: string = "";

    @JsonProperty("theme", String, true) 
    Theme?: string = "";

    @JsonProperty("title_trans", TransConverter, true)
    TitleTranslates?: Translate[] = undefined;    

    @JsonProperty("rows", [Row], true)
    Rows?: Row[] = undefined;    

    @JsonProperty("label_with", Number, true) 
    LabelWith?: number = undefined;
}