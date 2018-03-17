import * as React from 'react';
import { DynamicControl } from '../objects/DynamicControl.types';
import { GenericFormInput } from '../formBaseInput/FormBaseInput';
import { CustomValidator } from '../objects/CustomValidator.types';
import { CustomActions } from '../objects/CustomActions.types';
import { DataBinder } from '../objects/DataBinder.types';
import { FormInputs } from './FormInputs';
/**
 * The state for Form
 */
export interface IFormState {
    /** The current validation results for the inputs in the form */
    validationResults: {
        [key: string]: IFormValidationResult;
    };
}
/**
 * The props for Form
 */
export interface IFormProps extends React.AllHTMLAttributes<HTMLFormElement> {
    componentRef?: (component: any) => void;
    /** The Form Layout and controls in Json format. Is converted to JFormData*/
    jsonFormData: any;
    /** All used custom Controls has to be added here */
    customControls?: DynamicControl[];
    /** All used custom Validators has to be added here */
    customValidators?: CustomValidator[];
    /** All used custom Actions has to be added here */
    customActions?: CustomActions[];
    /** All used Databinder for the the databoundet Controls */
    dataBinders?: DataBinder[];
    /** Event when the form is mounted and all controls are loaded */
    formDidMount?(controls: GenericFormInput[]): void;
    /** Event on Submit the Form after Validating  and if success*/
    onSubmitForm?(formData: any): void;
    /** Event on Submit the Form after Validating and if fail */
    onInvalidSubmitForm?(formData: any): void;
    /** Event on Cancel the Form */
    onCancelForm?(): void;
    /** Event on Updated the Form */
    onUpdated?(key: string, value: any): void;
    /** Should the form show errors when it is pristine? */
    showErrorsWhenPristine?: boolean;
    /** The Language to use for the Form. If not set then User Language is used. */
    Language?: string;
    /** Form inputs can be delivered from a inherinting form genreator. */
    formInputs?: FormInputs;
}
/**
 * Validation result for a simple form input. All calls to validate return this type
 */
export declare type IFormValidationResult = {
    /** Is the field valid? */
    isValid: boolean;
    /** Optional error message */
    errorMessage?: string;
    /** The validated input */
    component: GenericFormInput;
};
/**
 * The child context for form inputs to use
 */
export declare type IFormContext = {
    /** Is the form valid currently? */
    isFormValid: () => boolean;
    /** Register the input with SimpleForm. Should be called during componentWillMount */
    mountInput: (input: GenericFormInput) => void;
    /** Unregister the input with SimpleForm. Should be called during componentWillUnmount */
    unmountInput: (input: GenericFormInput) => void;
    /** Validate the passed in field, set its error state, and call the onUpdate handler if there is one */
    submitValue: (input: GenericFormInput, validate?: boolean) => void;
};
