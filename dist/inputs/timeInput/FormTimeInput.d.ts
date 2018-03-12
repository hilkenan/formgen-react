import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormTimeState, IFormTimeProps } from './FormTimeInput.types';
/**
 * TextBox input for the Form.
 */
export declare class FormTimeInput extends FormBaseInput<IFormTimeProps, IFormBaseInputProps, IFormTimeState> {
    private hideSeconds;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
    /**
     * Validate the Input string.
     */
    private validateTime(event);
    /**
     * Convert the time string in seconds
     */
    private _getSecondsFromTime(value);
    /**
     * Convert the number in seconds to an time string
     */
    private _getTimeFromSeconds(value, hideSeconds);
    /**
     * Convert the number in seconds to an time string
     */
    private _isTimeStringValid(value, hideSeconds);
    /**
     * Set the Control to Invalid
     */
    private setControlToInValid(value);
}
