import '../../styles/FormDatePicker.css';
import * as React from 'react';
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { DayOfWeek } from 'office-ui-fabric-react';
import { Helper } from '../../Helper';
import * as moment from 'moment';
import { IFormDatePickerProps } from './FormDatePicker.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import Rendering from '../../form/Rendering';
require('moment/min/locales')

/**
 * DatePicker input for Form
 */
export class FormDatePicker extends FormBaseInput<IFormDatePickerProps, IFormBaseInputProps, IFormBaseInputState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value,
      currentError: undefined
    };
    this._validateDatePickerProps(this.ConfigProperties);
  }

  /**
   * Render a Fabric DatePicker
   */
  public render(): JSX.Element {
    let firstDayOfWeek:DayOfWeek = DayOfWeek.Monday;
    if (this.ConfigProperties.firstDayOfWeek)
      firstDayOfWeek = this.ConfigProperties.firstDayOfWeek;
    return (
    <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith }  >
      <div className="form-date-picker formDatePicker">
          <DatePicker   
              {...this.ConfigProperties}
              // These props cannot be overridden
              ref={(input) => this.innerControl = input }   
              strings={Helper.getDayPickerStrings() } 
              firstDayOfWeek={ firstDayOfWeek }
              formatDate={ this._onFormatDateTo }
              key={ this.props.inputKey }
              label=''
              value={ this.state.currentValue ? moment.utc(this.state.currentValue).toDate() : undefined }
              onSelectDate={ this._onDateChanged }
            />
          { this.state.currentError && Rendering.renderError(this.state.currentError) }        
        </div>
      </InnerControl>);
  }

  /**
   * Return for the UI Formated To Date and store it to the state.
   * @param date The date to formate
   */
  @autobind
  private _onFormatDateTo(date: Date): string {
    moment.locale(Helper.getLanguage());
    let dateFormat = this.ConfigProperties.shortDateFormat==true ? "L" : "LL";
    return moment(date).format(dateFormat);
  }

  /**
   * Stores the selected date as utc
   * @param date the selected date
   */
  @autobind
  private _onDateChanged(date: Date): void {
    this.setValue(moment(date).toJSON());
  }

  /**
   * Validate the properties from the config. warn at console
   * @param props The property object to validate 
   */
  private _validateDatePickerProps(props?: IDatePickerProps): void {
    this.validateProps(props);
   if (props) {
      if (props.onSelectDate) {
        console.warn(`FormDatePicker: 'onSelectDate' prop was specified and will be ignored`);
      }
      if (props.formatDate) {
        console.warn(`FormDatePicker: 'formatDate' prop was specified and will be ignored`);
      }
      if (props.strings) {
        console.warn(`FormDatePicker: 'strings' prop was specified and will be ignored`);
      }
    }
  }
}
