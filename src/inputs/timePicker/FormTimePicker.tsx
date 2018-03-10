import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import Rendering from '../../form/Rendering';
import TimePicker from 'react-times/lib/components/TimePicker';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import { Helper } from '../../Helper';
import { IFormTimePickerState } from './FormTimePicker.types';

/**
 * TextBox input for the Form.
 */
export class FormTimePicker extends FormBaseInput<any, IFormBaseInputProps, IFormTimePickerState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);

    let hour = '';
    let minute = '';
    if (this.props.control.Value) {
      [hour, minute] = this.props.control.Value.toString().split(/:/);
    } else if (this.ConfigProperties.defaultTime) {
      [hour, minute] = this.ConfigProperties.defaultTime.split(/:/);
    }

    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined,
      minute: minute,
      hour: hour,
      focused: false
    };
    this._validateTimePickerProps(this.ConfigProperties);
  }

  /**
   * Render a Fabric TextBox
   */
  public render(): JSX.Element {
    return (
      <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
        <div style={{ width:150 }}>
          <TimePicker
            theme="classic"          
            {...this.ConfigProperties}      
            focused={ this.state.focused }          
            onFocusChange={this.onFocusChange}
            onHourChange={this.onHourChange}
            onMinuteChange={this.onMinuteChange}
            onTimeChange={this.onTimeChange}
            language={ Helper.getLanguage()}
            time={this.state.hour && this.state.minute ? this.state.hour + ":" + this.state.minute : null}            
          />      
          { this.state.currentError && Rendering.renderError(this.state.currentError) }
       </div>
      </InnerControl>);
  }
  
  @autobind
  onHourChange(hour) {
    this.setState({ hour });
  }

  @autobind
  onMinuteChange(minute) {
    this.setState({ minute });
  }

  @autobind
  onTimeChange(time) {
    const [hour, minute] = time.split(':');
    this.setState({ hour, minute });
    this.setValue( hour + ":" + minute, true)
  }

  @autobind
  onFocusChange(focused) {
    this.setState({ focused });
  }

  @autobind
  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  private _validateTimePickerProps(props?: any): void {
    this.validateProps(props);
    if (props) {
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
