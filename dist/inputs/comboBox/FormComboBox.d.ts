import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IComboBoxProps } from "office-ui-fabric-react/lib";
/**
 * ComboBox input for Form
 */
export declare class FormComboBox extends FormBaseInput<IComboBoxProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric Dropdown
     */
    render(): JSX.Element;
    private _onChanged(option?, index?, value?);
}
