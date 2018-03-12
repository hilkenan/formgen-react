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
    private _onChange(value);
    private _validateTextFieldProps(props?);
}
