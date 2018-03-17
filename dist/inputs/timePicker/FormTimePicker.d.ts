/// <reference types="react" />
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import { IFormTimePickerState } from './FormTimePicker.types';
/**
 * Time Picker Controls render an react-times control (classic or material theme)
 */
export declare class FormTimePicker extends FormBaseInput<any, IFormBaseInputProps, IFormTimePickerState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric react-times tiempicker
     */
    render(): JSX.Element;
    /**
     * Stores the selected hour to the hour state.
     * @param hour the number hours to store
     */
    onHourChange(hour: any): void;
    /**
     * Stores the selected minut to the minut state.
     * @param minute the number minut to store
     */
    onMinuteChange(minute: any): void;
    /**
     * Stores the selected time to the value
     * @param time the time in format hh:mm
     */
    onTimeChange(time: any): void;
    /**
     * Event when the focus has chanced
     * @param focused the current focus value
     */
    onFocusChange(focused: any): void;
    /**
     * Handels an focus change
     */
    handleFocusedChange(): void;
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateTimePickerProps(props?);
}
