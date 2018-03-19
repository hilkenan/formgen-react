import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ISliderProps } from 'office-ui-fabric-react';
/**
 * Slider input for the Form.
 */
export declare class FormSlider extends FormBaseInput<ISliderProps, IFormBaseInputProps, IFormBaseInputState> {
    private stepValue;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric Slider
     */
    render(): JSX.Element;
    /**
     * Stores the selected value of the slider to the state.
     * @param value the number to store
     */
    private _onChange(value);
}
