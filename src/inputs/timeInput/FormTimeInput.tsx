import * as React from 'react';
var MaskedInput = require('react-maskedinput/lib/index')
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import * as moment from 'moment';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { SyntheticEvent } from 'react';
import Rendering from '../../form/Rendering';
import { IFormTimeState, IFormTimeProps } from './FormTimeInput.types';

/**
 * TextBox input for the Form.
 */
export class FormTimeInput extends FormBaseInput<IFormTimeProps, IFormBaseInputProps, IFormTimeState> {
  private hideSeconds: boolean;
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);

    this.hideSeconds = this.ConfigProperties.hideSeconds != undefined ? this.ConfigProperties.hideSeconds : false;
    
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
  }

  /**
   * Render a Fabric TextBox
   */
  public render(): JSX.Element {
    return (
      <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
        <MaskedInput 
          title={ this.ConfigProperties.title }
          ref={(input) => this.innerControl = input }
          placeholder={ this.hideSeconds ? "hh:mm" :  "hh:mm:ss" }
          mask={ this.hideSeconds ? "11:11" : "11:11:11" }
          className= { !this.state.isValid ? "timePickerInvalid" : null }
          name={ this.props.inputKey }
          value={ this.state.currentValue != undefined ? this._getTimeFromSeconds(this.state.currentValue, this.hideSeconds) : this.state.currentText }
          onBlur={ this.validateTime } />    
          { this.state.currentError && Rendering.renderError(this.state.currentError) }
      </InnerControl>);
  }
  
  /**
   * Validate the Input string.
   */
  @autobind
  private validateTime(event: SyntheticEvent<string>) {
    let value:string = event.target["value"];
    if (value == "" && this.IsRequired) {
      this.setControlToInValid(value);
      return false;
    }

    if (value == "" && !this.IsRequired) {
        this.setState({
          currentText: value,
          currentValue: undefined,
          isValid: true,
        })
        return true;
    }

    if (!this._isTimeStringValid(value, this.hideSeconds)) {
      this.setControlToInValid(value);
      return false;
    }
    let timeValue = this._getSecondsFromTime(value);
    if (this.ConfigProperties.maxSeconds != undefined && timeValue > this.ConfigProperties.maxSeconds) {
      timeValue = this.ConfigProperties.maxSeconds;
      this.setControlToInValid(this._getTimeFromSeconds(this.ConfigProperties.maxSeconds, this.hideSeconds));
      return false;
    }

    this.setValue(timeValue, true);
    return true;
  }  

  /**
   * Convert the time string in seconds
   */    
  private _getSecondsFromTime(value:string): number  {
    return moment.duration(value).asSeconds();
  }
  
  /**
   * Convert the number in seconds to an time string
   */    
  private _getTimeFromSeconds(value:number, hideSeconds: boolean): string {
    if (value == 86400) return hideSeconds ? "24:00" : "24:00:00";
    let d = moment.duration({s: value});
    let time = moment().startOf('day').add(d).format(hideSeconds ? 'HH:mm' :'HH:mm:ss');
    return time;
  }

  /**
   * Convert the number in seconds to an time string
   */    
  private _isTimeStringValid(value:string, hideSeconds: boolean) {
    let timeParts = value.split(":");
    if ((hideSeconds && timeParts.length != 2) || (!hideSeconds && timeParts.length != 3 ))
        return false;

    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let seconds = hideSeconds ? 0 : parseInt(timeParts[2]);

    if (hours < 0 || hours > 24)
        return false;

    if (hours == 24 && (minutes != 0 || seconds != 0))
        return false;
    
    if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59)
        return false;
    
    return true;
  }

  /**
   * Set the Control to Invalid
   */
  @autobind
  private setControlToInValid(value: string) {
    var control = document.getElementsByName(this.props.inputKey);
    if (control.length > 0) control[0].focus();
    this.setState({
      currentText: value,
      currentValue: undefined,
      isValid: false,
    })
  }  
}
