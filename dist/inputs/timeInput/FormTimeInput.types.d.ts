import { IFormBaseInputState } from "../../formBaseInput/FormBaseInput.types";
export interface IFormTimeState extends IFormBaseInputState {
    currentText?: string;
}
export interface IFormTimeProps {
    hideSeconds?: boolean;
    title?: string;
    maxSeconds?: number;
}
