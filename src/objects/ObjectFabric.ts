import { JsonConvert } from 'json2typescript';
import { JFormData } from './JFormData';
import { Control } from './Control';
import { Row } from './Row';

/**
* Object Fabric to convert json objects to javascript objects.
*/  
export class ObjectFabric {
    /**
    * Get a FormData object
    */  
    static getForm(json: any): JFormData {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, JFormData);
    }

    /**
    * Get the Json from a FormData object
    */  
    static getJsonFromForm(form: JFormData): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(form);
    }

    /**
    * Get a Row object
    */  
    static getRow(json: any): Row {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, Row);
    }

    /**
    * Get a Json from a Row object
    */  
    static getJsonFromRow(row: Row): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(row);
    }

    /**
    * Get a Control object
    */  
    static getControl(json: any): Control {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, Control);
    }

    /**
    * Get the Json from an given Control
    */  
   static getJsonFromControl(ctrl: Control): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(ctrl);
    }
}
