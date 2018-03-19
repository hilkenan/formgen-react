import '../../styles/FormDatePicker.css';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormDateTimePickerProps, IFormDateTimePickerState } from './FormDateTimePicker.types';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
/**
 * DatePicker and Time Picker input for Form
 */
export declare class FormDateTimePicker extends FormBaseInput<IFormDateTimePickerProps, IFormBaseInputProps, IFormDateTimePickerState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Fill the value with amount of needed n 0. Eg. 5 with 2 size will be 05
     * @param num The number
     * @param size Maximal Size of string.
     */
    private _pad(num, size);
    /**
     * Render a Fabric DatePicker
     */
    render(): JSX.Element;
    /**
     * Stores the selected hour
     * @param hour the selected hour
     */
    private onHourChange(hour);
    /**
     * Stores the selected minute
     * @param minute the selected minute
     */
    private onMinuteChange(minute);
    /**
     * Stores the selected time as utc with the date
     * @param time the selected time
     */
    private onTimeChange(time);
    /**
     * Set the focus state to the state.
     */
    private onFocusChange(focused);
    /**
     * Handles the focus change of the time picker
     */
    private handleFocusedChange();
    /**
     * Return for the UI Formated To Date and store it to the state.
     * @param date the selected date
     */
    private _onFormatDateTo(date);
    /**
     * Stores the selected date as utc with the time
     * @param date the selected date
     */
    private _onDateChanged(date);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateDateTimePickerProps(props?);
}
