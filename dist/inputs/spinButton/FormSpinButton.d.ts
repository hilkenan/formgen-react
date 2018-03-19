import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormSpinButtonProps } from './FormSpinButton.types';
/**
 * Spin Button input for the Form.
 */
export declare class FormSpinButton extends FormBaseInput<IFormSpinButtonProps, IFormBaseInputProps, IFormBaseInputState> {
    private sufixToUse;
    private stepValue;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric SpinButton
     */
    render(): JSX.Element;
    /**
     * Event for Validating
     * @param value Numberic value with suffix to store
     */
    private onValidate(value);
    /**
     * Event for Inkrementing
     * @param value Numberic value with suffix to store
     */
    private onIncrement(value);
    /**
     * Event for Dekrementing
     * @param value Numberic value with suffix to store
     */
    private onDecrement(value);
}
