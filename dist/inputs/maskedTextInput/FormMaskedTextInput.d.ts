import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
/**
 * TextBox input for the Form.
 */
export declare class FormMaskedTextInput extends FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
    /**
     * Stores the set value of the textbox to the state.
     * @param event The event from the change with the new value.
     */
    private _onChange(event);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateTextFieldProps(props?);
}
