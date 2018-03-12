import { ValidatorTypes } from "../Enums";
import { Translate } from "./jsonConverters/TransConverter";
export declare class FormValidator {
    Message: string;
    ValidatorType: ValidatorTypes;
    MessageTranslates?: Translate[];
    Value: number;
    Regex: string;
    CustomTypeName: string;
}
