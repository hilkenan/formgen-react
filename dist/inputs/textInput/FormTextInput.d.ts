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
    private _onChange(value);
    private _validateTextFieldProps(props?);
}
