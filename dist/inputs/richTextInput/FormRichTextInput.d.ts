/// <reference types="react" />
import { ComponentProps } from 'react-quill';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import 'react-quill/dist/quill.snow.css';
/**
 * TextBox input for the Form.
 */
export declare class FormRichTextInput extends FormBaseInput<ComponentProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
    /**
     * Stores the html content to the state.
     * @param value html value to store
     */
    private _onChange(value);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateTextFieldProps(props?);
}
