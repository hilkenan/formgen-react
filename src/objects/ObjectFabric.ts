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
    * @param json The Json object.
    */  
    static getForm<T extends JFormData>(json: any, formType: new () => T): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, formType);
    }

    /**
    * Get the Json from a FormData object
    * @param form The Form Control tree.
    */  
    static getJsonFromForm<T extends JFormData>(form: T): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(form);
    }

    /**
    * Get a Row object
    * @param json The json object the get the row from.
    */  
    static getRow(json: any): Row {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, Row);
    }

    /**
    * Get a Json from a Row object
    * @param row The row to serialize.
    */  
    static getJsonFromRow(row: Row): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(row);
    }

    /**
    * Get a Control object
    * @param json The json object the get the control from.
    */  
    static getControl(json: any): Control {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(json, Control);
    }

    /**
    * Get the Json from an given Control
    * @param ctrol The Control to serialize.
    */  
   static getJsonFromControl(ctrl: Control): any {
        let jsonConvert: JsonConvert = new JsonConvert();
        return jsonConvert.serializeObject(ctrl);
    }
}