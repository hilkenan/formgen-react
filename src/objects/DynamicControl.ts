import { ControlTypes } from "../Enums";

/**
 * Class for the Dynamic Control. The Name as to be even the ControlType or any other Name of Custom Control
 * The Type of Controls has to be the type of an control. Default Controls are defined at the folder "controls"
 */
export class DynamicControl {
    typeName:ControlTypes | string;
    controlType: any;
}