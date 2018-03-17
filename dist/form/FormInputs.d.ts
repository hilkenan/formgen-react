import { DynamicControl } from "../objects/DynamicControl.types";
/**
* Class the prepare the matching from the ControlTypes enum to the real control types.
*/
export declare class FormInputs {
    /**
    * Array with all registered Controls to that can be used in the form.
    */
    protected controls: DynamicControl[];
    /**
    * Ge tall defined standart controls as Dynamic Control array
    */
    getStandartControls(): DynamicControl[];
}
