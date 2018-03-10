import {JsonCustomConvert, JsonConverter} from "json2typescript";

/**
* Translation Bag Converter 
*/  
@JsonConverter
export class TransConverter implements JsonCustomConvert<Translate[]> {
    serialize(translations: Translate[]): any {
        if (translations.length == 0) return undefined;
        let text = "{";
        for(let trans of translations) {
            text += "\"" + trans.Lang + "\":" + "\"" + trans.Text + "\",";
        }
        text = text.substr(0, text.length-1) + "}";
        return JSON.parse(text);
    }
    deserialize(lang: any): Translate[] {
        let traslates:Translate[] = [];

        Object.keys(lang).map(key =>{
            traslates.push({
                Lang: key,
                Text: lang[key]
            })
        });
        return traslates;
    }
}

/**
* Translation Bag
*/  
export class Translate {
    Lang: string;
    Text: string;
}