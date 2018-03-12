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
    private _pad(num, size);
    /**
     * Render a Fabric DatePicker
     */
    render(): JSX.Element;
    private onHourChange(hour);
    private onMinuteChange(minute);
    private onTimeChange(time);
    private onFocusChange(focused);
    private handleFocusedChange();
    /**
     * Return for the UI Formated To Date and store it to the state.
     */
    private _onFormatDateTo(date);
    private _onDateChanged(date);
    private _validateDateTimePickerProps(props?);
}
