/// <reference types="react" />
import { IFormContext } from '../../form/Form.types';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ISubmitButtonProps } from './SubmitButton.types';
/**
 * Submit button for the form which is disabled when the form is invalid
 */
export declare class SubmitButton extends FormBaseInput<ISubmitButtonProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render Primary Button
     */
    render(): JSX.Element;
}
