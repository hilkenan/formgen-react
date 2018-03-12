import { JFormData } from './JFormData';
import { Control } from './Control';
import { Row } from './Row';
/**
* Object Fabric to convert json objects to javascript objects.
*/
export declare class ObjectFabric {
    /**
    * Get a FormData object
    */
    static getForm(json: any): JFormData;
    /**
    * Get the Json from a FormData object
    */
    static getJsonFromForm(form: JFormData): any;
    /**
    * Get a Row object
    */
    static getRow(json: any): Row;
    /**
    * Get a Json from a Row object
    */
    static getJsonFromRow(row: Row): any;
    /**
    * Get a Control object
    */
    static getControl(json: any): Control;
    /**
    * Get the Json from an given Control
    */
    static getJsonFromControl(ctrl: Control): any;
}
