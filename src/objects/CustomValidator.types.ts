import { IValidator } from "../validators/Validators";

/**
 * Class for the Custom Validators. The Name as to be Name of Custom Validator
 * The Type of Validator has to be the type of an Validator that Implement IValidator.
 */
export class CustomValidator {
    typeName:string;
    validatorType: IValidator;
}