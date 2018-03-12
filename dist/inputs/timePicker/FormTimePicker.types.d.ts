import { IFormBaseInputState } from "../../formBaseInput/FormBaseInput.types";
export interface IFormTimePickerState extends IFormBaseInputState {
    focused: boolean;
    hour: string;
    minute: string;
}
