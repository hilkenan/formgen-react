import { JsonObject, JsonProperty } from "json2typescript";
import { Translate, TransConverter } from "./jsonConverters/TransConverter";

/**
* Property for an Translation of an Property at an object. The key has to be delimited with .
* Eg: Object.SubObject.propertyName
*/  
@JsonObject
export class Property {
    @JsonProperty("key", String)
    Key:string = "";    

    @JsonProperty("object_trans", TransConverter, true)
    ObjectTranslates: Translate[] = [];     
}

/**
* Collection of Properties to translate in an object.
*/  
@JsonObject
export class ObjectTranslate {
    @JsonProperty("properties", [Property], true)
    Properties:Property[] = [];      
}



