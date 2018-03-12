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
    private _onChanged(option);
    private _validateDropdownProps(props?);
}
