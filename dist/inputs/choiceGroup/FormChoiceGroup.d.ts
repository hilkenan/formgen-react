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
    private _onChange(ev?, option?);
    private _validateChoiceGroupProps(props?);
}
