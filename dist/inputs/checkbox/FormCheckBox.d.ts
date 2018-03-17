/// <reference types="react" />
import { ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
/**
 * Checkbox input for the Form. Displays a boolean value as a checkbox
 */
export declare class FormCheckBox extends FormBaseInput<ICheckboxProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a checkbox
     */
    render(): JSX.Element;
    /**
     * Stores the state of the checkbox to the state.
     * @param event The Check event
     * @param isChecked the state of the checkbox
     */
    private _onChange(event, isChecked);
}
