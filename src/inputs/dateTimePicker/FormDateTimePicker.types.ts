import { IFormDatePickerProps } from '../datePicker/FormDatePicker.types';
import { IFormTimeProps } from '../timeInput/FormTimeInput.types';
import { IFormTimePickerState } from '../timePicker/FormTimePicker.types';

export interface IFormDateTimePickerProps extends IFormDatePickerProps, IFormTimeProps {
  defaultDateTime?: string;
}

export interface IFormDateTimePickerState extends IFormTimePickerState {
  date: Date;
}