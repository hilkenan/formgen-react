import '../../styles/FormDatePicker.css';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { IFormDatePickerProps } from './FormDatePicker.types';
/**
 * DatePicker input for Form
 */
export declare class FormDatePicker extends FormBaseInput<IFormDatePickerProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric DatePicker
     */
    render(): JSX.Element;
    /**
     * Return for the UI Formated To Date and store it to the state.
     * @param date The date to formate
     */
    private _onFormatDateTo(date);
    /**
     * Stores the selected date as utc
     * @param date the selected date
     */
    private _onDateChanged(date);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateDatePickerProps(props?);
}
