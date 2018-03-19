import { IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { IFormContext } from '../../form/Form.types';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
/**
 * Dropdown input for Form
 */
export declare class FormDropdown extends FormBaseInput<IDropdownProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric Dropdown
     */
    render(): JSX.Element;
    /**
     * Stores the selected value of the dropdown to the state.
     * @param option the selected option to store the kay as value.
     */
    private _onChanged(option);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateDropdownProps(props?);
}
