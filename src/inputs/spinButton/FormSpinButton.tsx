import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { SpinButton } from 'office-ui-fabric-react';
import { IFormSpinButtonProps } from './FormSpinButton.types';
import { Helper } from '../../Helper';
import Rendering from '../../form/Rendering';

/**
 * Spin Button input for the Form.
 */
export class FormSpinButton extends FormBaseInput<IFormSpinButtonProps, IFormBaseInputProps, IFormBaseInputState> {
  private sufixToUse: string;
  private stepValue:number;

  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
    this.sufixToUse = this.ConfigProperties.sufix ? 
      " " + this.ConfigProperties.sufix : '';

      this.stepValue = this.ConfigProperties.step != undefined ? this.ConfigProperties.step : 1;
  }

  /**
   * Render a Fabric SpinButton
   */
  public render(): JSX.Element {
    return (
      <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
        <SpinButton 
            value={ this.state.currentValue + this.sufixToUse }                      
            {...this.ConfigProperties}      
            ref={(input) => this.innerControl = input }
            key={ this.props.inputKey }
            label=""
            onValidate={ this.onValidate }
            onIncrement={ this.onIncrement }
            onDecrement={ this.onDecrement }
        />
          { this.state.currentError && Rendering.renderError(this.state.currentError) }        
      </InnerControl>);
  }

  /**
   * Event for Validating
   */
  @autobind
  private onValidate(value: string) {
      value = Helper.removeSuffix(value, this.sufixToUse);
      if (isNaN(+value)) {
          return '0' + this.sufixToUse;
      }
      let newValue:number = +value;
      this.setValue(newValue, true);
      return String(value) + this.sufixToUse;
  }

  /**
   * Event for Inkrementing
   */
  @autobind
  private onIncrement(value: string) {
      value = Helper.removeSuffix(value, this.sufixToUse);
      let newValue:number = +value + this.stepValue;
      this.setValue(newValue, true);
      return String(newValue) + this.sufixToUse;
  }

  /**
   * Event for Dekrementing
   */
  @autobind
  private onDecrement(value: string) {
      value = Helper.removeSuffix(value, this.sufixToUse);
      let newValue:number = +value - this.stepValue;
      this.setValue(newValue, true);
      return String(newValue) + this.sufixToUse;
  }
}
