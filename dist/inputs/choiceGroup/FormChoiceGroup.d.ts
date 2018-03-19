import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IChoiceGroupProps } from "office-ui-fabric-react/lib";
/**
 * ChoiceGroup input for Form
 */
export declare class FormChoiceGroup extends FormBaseInput<IChoiceGroupProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric Dropdown
     */
    render(): JSX.Element;
    /**
     * Stores the state of the checkbox to the state.
     * @param ev The Check event
     * @param option the selected option of the choice group
     */
    private _onChange(ev?, option?);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateChoiceGroupProps(props?);
}
