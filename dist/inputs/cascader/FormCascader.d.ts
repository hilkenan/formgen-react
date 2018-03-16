import 'rc-cascader/assets/index.css';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
/**
 * Cascading Dropdown input for Form. Use rc-cascader
 */
export declare class FormCascader extends FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Cascading Drop Down from rs-cascader
     */
    render(): JSX.Element;
    /**
     * Store the selected Value as JSON in the form state.
     * @param value Value string to store
     * @param selectedOptions the Selected options with the full data
     */
    private _onChange(value, selectedOptions);
    /**
     * Get the correct Label Value set.
     */
    private _getLabels(options);
}
