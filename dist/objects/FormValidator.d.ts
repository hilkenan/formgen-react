import { ValidatorTypes } from "../Enums";
import { Translate } from "./jsonConverters/TransConverter";
/**
 * Form Validator Representation for an validator json object.
 */
export declare class FormValidator {
    Message: string;
    ValidatorType: ValidatorTypes;
    MessageTranslates?: Translate[];
    Value: Number;
    Regex: string;
    CustomTypeName: string;
}
