import * as React from 'react';
var MaskedInput = require('react-maskedinput/lib/index')
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { SyntheticEvent } from 'react';
import Rendering from '../../form/Rendering';;

/**
 * TextBox input for the Form.
 */
export class FormMaskedTextInput extends FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
    this._validateTextFieldProps(this.ConfigProperties);
  }

  /**
   * Render a Fabric TextBox
   */
  public render(): JSX.Element {
    return (
      <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
        <MaskedInput 
          value={ this.state.currentValue }
          {...this.ConfigProperties}      
          ref={(input) => this.innerControl = input }
          id={ this.props.inputKey }                      
          key={ this.props.inputKey }
          name={ this.props.inputKey }
          label=""
          onChange={ this._onChange }
          />    
          { this.state.currentError && Rendering.renderError(this.state.currentError) }
      </InnerControl>);
  }
  
  @autobind
  private _onChange(event: SyntheticEvent<any>): void {
    this.setValue(event.currentTarget.value, true);
  }

  private _validateTextFieldProps(props?: any): void {
    this.validateProps(props);
    if (props) {
      if (props.errorMessage) {
        console.warn(`FormMaskedTextInput: 'errorMessage' prop was specified and will be ignored`);
      }
      if (props.onBeforeChange) {
        console.warn(`FormMaskedTextInput: 'onBeforeChange' prop was specified and will be ignored`);
      }
      if (props.onBlur) {
        console.warn(`FormMaskedTextInput: 'onBlur' prop was specified and will be ignored`);
      }
    }
  }
}
