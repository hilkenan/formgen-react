import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Data Class for the Action Links in Info Callouts
 */
@JsonObject
export class ActionLink { 
    @JsonProperty("link", String) 
    Link: string = "";

    @JsonProperty("text", String) 
    Text: string = "";
}