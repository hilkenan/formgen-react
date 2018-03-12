import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import { IFormTimePickerState } from './FormTimePicker.types';
/**
 * TextBox input for the Form.
 */
export declare class FormTimePicker extends FormBaseInput<any, IFormBaseInputProps, IFormTimePickerState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
    onHourChange(hour: any): void;
    onMinuteChange(minute: any): void;
    onTimeChange(time: any): void;
    onFocusChange(focused: any): void;
    handleFocusedChange(): void;
    private _validateTimePickerProps(props?);
}
