/// <reference types="react" />
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormTimeState, IFormTimeProps } from './FormTimeInput.types';
/**
 * Masked time input. Stores the entered time as seconds from 00:00. Maximal to 24:00
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
     * @param event The Even where to start the validation.
     */
    private validateTime(event);
    /**
     * Convert the time string in seconds
     * @param value The time to convert
     */
    private _getSecondsFromTime(value);
    /**
     * Convert the number in seconds to an time string
     * @param value The time to convert
     * @param hideSeconds True if no seconds are shown
     */
    private _getTimeFromSeconds(value, hideSeconds);
    /**
     * Convert the number in seconds to an time string
     * @param value The time to check if valid
     * @param hideSeconds True if no seconds to check.
     */
    private _isTimeStringValid(value, hideSeconds);
    /**
     * Set the Control to Invalid
     * @param value the value to invalidate.
     */
    private setControlToInValid(value);
}
