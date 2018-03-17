/// <reference types="react" />
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
    /**
     * Stores the selected option from the combobox.
     * @param option the selected option of the choice group
     * @param index The index of the selected item
     * @param value The Value use. Used when enter new data is allowed.
     */
    private _onChanged(option?, index?, value?);
}
