import '../../styles/FormDatePicker.css';
import * as React from 'react';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { DayOfWeek } from 'office-ui-fabric-react';
import { Helper } from '../../Helper';
import * as moment from 'moment';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import Rendering from '../../form/Rendering';
import { IFormDateTimePickerProps, IFormDateTimePickerState } from './FormDateTimePicker.types';
import TimePicker from 'react-times/lib/components/TimePicker';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import ICONS from 'react-times/lib/utils/icons';
require('moment/min/locales')

/**
 * DatePicker and Time Picker input for Form
 */
export class FormDateTimePicker extends FormBaseInput<IFormDateTimePickerProps, IFormBaseInputProps, IFormDateTimePickerState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context);
    moment.locale(Helper.getLanguage());

    let hour = '';
    let minute = '';
    let date:Date = new Date();
    let dateTimeValue = this.props.control.Value ? this.props.control.Value : this.ConfigProperties.defaultDateTime;
    let dateMomen = moment(new Date());
    if (dateTimeValue) {
      dateMomen = moment.utc(dateTimeValue);
    }
    date = dateMomen.toDate();
    hour = dateMomen.toDate().getHours().toString()
    minute = dateMomen.toDate().getMinutes().toString();

    this.state = {
      isValid: true,
      date: date,
      currentValue: this.props.control.Value || '',
      currentError: undefined,
      minute: minute,
      hour: hour,
      focused: false
    };

    this._validateDateTimePickerProps(this.ConfigProperties);
  }

  /**
   * Fill the value with amount of needed n 0. Eg. 5 with 2 size will be 05
   * @param num The number
   * @param size Maximal Size of string.
   */
  private _pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  /**
   * Render a Fabric DatePicker
   */
  public render(): JSX.Element {
    let firstDayOfWeek:DayOfWeek = DayOfWeek.Monday;
    if (this.ConfigProperties.firstDayOfWeek)
      firstDayOfWeek = this.ConfigProperties.firstDayOfWeek;
    return (
    <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
    <div className="md-Grid">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col" style={{ width: this.ConfigProperties.shortDateFormat==true ? 110 : 145 }}>
          <DatePicker   
              {...this.ConfigProperties}
              // These props cannot be overridden
              ref={(input) => this.innerControl = input }     
              strings={Helper.getDayPickerStrings() } 
              firstDayOfWeek={ firstDayOfWeek }
              formatDate={ this._onFormatDateTo }
              key={ this.props.inputKey }
              label=''
              value={ this.state.currentValue ? moment.utc(this.state.currentValue).toDate() : this.state.date }
              onSelectDate={ this._onDateChanged }
            />
            </div>
            <div className="ms-Grid-col">
              <TimePicker
                theme="classic"
                {...this.ConfigProperties}   
                trigger={(
                  <div className="timePickerIcon" onClick={this.handleFocusedChange}>
                    <div>
                    { ICONS.time }
                    </div>
                  <div>
                    { this._pad(this.state.hour,2) + ":" + this._pad(this.state.minute, 2)}
                  </div>
                </div>)}
                focused={ this.state.focused }          
                onFocusChange={this.onFocusChange}
                onHourChange={this.onHourChange}
                onMinuteChange={this.onMinuteChange}
                onTimeChange={this.onTimeChange}
                language={ Helper.getLanguage()}
                time={this.state.hour && this.state.minute ? this._pad(this.state.hour,2) + ":" + this._pad(this.state.minute, 2) : null}            
              />      
          </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col">
            { this.state.currentError && Rendering.renderError(this.state.currentError) }        
            </div>
          </div>
        </div>
      </InnerControl>);
  }

  /**
   * Stores the selected hour
   * @param hour the selected hour
   */
  @autobind
  private onHourChange(hour) {
    this.setState({ hour });
  }

  /**
   * Stores the selected minute
   * @param minute the selected minute
   */
  @autobind
  private onMinuteChange(minute) {
    this.setState({ minute });
  }

  /**
   * Stores the selected time as utc with the date
   * @param time the selected time
   */
  @autobind
  private onTimeChange(time) {
    const [hour, minute] = time.split(':');
    this.setState({ hour, minute });
    let momentDate = moment.utc(this.state.date);
    momentDate = momentDate.set("m", parseInt(this.state.minute));
    momentDate.set("h", parseInt(this.state.hour));
    this.setValue(momentDate.toJSON());  
  }

  /**
   * Set the focus state to the state.
   */
  @autobind
  private onFocusChange(focused) {
    this.setState({ focused });
  }

  /**
   * Handles the focus change of the time picker
   */
  @autobind
  private handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  /**
   * Return for the UI Formated To Date and store it to the state.
   * @param date the selected date
   */
  @autobind
  private _onFormatDateTo(date: Date): string {
    moment.locale(Helper.getLanguage());
    let dateFormat = this.ConfigProperties.shortDateFormat==true ? "L" : "LL";
    return moment(date).format(dateFormat);
  }

  /**
   * Stores the selected date as utc with the time
   * @param date the selected date
   */
  @autobind
  private _onDateChanged(date: Date): void {
    let momentDate = moment(date).set("m", parseInt(this.state.minute));
    momentDate.set("h", parseInt(this.state.hour));
    this.setValue(momentDate.toJSON());
  }

 /**
  * Validate the properties from the config. warn at console
  * @param props The property object to validate 
  */
  private _validateDateTimePickerProps(props?: any): void {
    this.validateProps(props);
   if (props) {
      if (props.onSelectDate) {
        console.warn(`FormDateTimePicker: 'onSelectDate' prop was specified and will be ignored`);
      }
      if (props.firstDayOfWeek) {
        console.warn(`FormDateTimePicker: 'firstDayOfWeek' prop was specified and will be ignored`);
      }
      if (props.formatDate) {
        console.warn(`FormDateTimePicker: 'formatDate' prop was specified and will be ignored`);
      }
      if (props.strings) {
        console.warn(`FormDateTimePicker: 'strings' prop was specified and will be ignored`);
      }
      if (props.focused) {
        console.warn(`FormTimePicker: 'focused' prop was specified and will be ignored`);
      }
      if (props.onFocusChange) {
        console.warn(`FormTimePicker: 'onFocusChange' prop was specified and will be ignored`);
      }
      if (props.onHourChange) {
        console.warn(`FormTimePicker: 'onHourChange' prop was specified and will be ignored`);
      }
      if (props.onMinuteChange) {
        console.warn(`FormTimePicker: 'onMinuteChange' prop was specified and will be ignored`);
      }
      if (props.onTimeChange) {
        console.warn(`FormTimePicker: 'onTimeChange' prop was specified and will be ignored`);
      }
      if (props.language) {
        console.warn(`FormTimePicker: 'language' prop was specified and will be ignored`);
      }
      if (props.time) {
        console.warn(`FormTimePicker: 'time' prop was specified and will be ignored`);
      }
    }
  }
}
