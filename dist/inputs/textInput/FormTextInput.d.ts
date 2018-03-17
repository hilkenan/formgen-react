/// <reference types="react" />
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
/**
 * TextBox input for the Form.
 */
export declare class FormTextInput extends FormBaseInput<ITextFieldProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
    /**
     * Stores the text of the textfield to the state.
     * @param value string to store
     */
    private _onChange(value);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateTextFieldProps(props?);
}
