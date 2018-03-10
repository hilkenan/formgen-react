import { IFormBaseInputState } from "../../formBaseInput/FormBaseInput.types";
import { IPersonaProps, IPeoplePickerProps } from "office-ui-fabric-react";


export interface IFormPeoplePickerState extends IFormBaseInputState {
    mostRecentlyUsed: IPersonaProps[];
    peopleList: IPersonaProps[];
}

export interface IFormPeoplePickerProps extends IPeoplePickerProps {
    allowMultiple?: boolean;
}