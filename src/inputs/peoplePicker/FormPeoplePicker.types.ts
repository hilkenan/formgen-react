import { IFormBaseInputState } from "../../formBaseInput/FormBaseInput.types";
import { IPersonaProps, IPeoplePickerProps } from "office-ui-fabric-react";

/**
 * The People picker state
 */
export interface IFormPeoplePickerState extends IFormBaseInputState {
    mostRecentlyUsed: IPersonaProps[];
    peopleList: IPersonaProps[];
}

/**
 * The People picker properties
 */
export interface IFormPeoplePickerProps extends IPeoplePickerProps {
    allowMultiple?: boolean;
}