import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { IToggleProps } from 'office-ui-fabric-react';
/**
 * Toggle input for the Form. Displays a boolean value as a Toggle
 */
export declare class FormToggle extends FormBaseInput<IToggleProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Toggle
     */
    render(): JSX.Element;
    /**
     * Stores the selected value of the toggle to the state.
     * @param isChecked True if on
     */
    private _onChange(isChecked);
}
