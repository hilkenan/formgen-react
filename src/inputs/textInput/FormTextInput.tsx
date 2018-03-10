import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';

/**
 * TextBox input for the Form.
 */
export class FormTextInput extends FormBaseInput<ITextFieldProps, IFormBaseInputProps, IFormBaseInputState> {
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
        <TextField
            value={ this.state.currentValue }
            {...this.ConfigProperties}      
            ref={(input) => this.innerControl = input }
            key={ this.props.inputKey }
            name={ this.props.inputKey }
            label=""
            onBeforeChange={ this._onChange }
            errorMessage={ this.state.currentError }
          />
      </InnerControl>);
  }

  @autobind
  private _onChange(value: string): void {
    this.setValue(value, true);
  }

  private _validateTextFieldProps(props?: ITextFieldProps): void {
    this.validateProps(props);
    if (props) {
      if (props.errorMessage) {
        console.warn(`FormTextBox: 'errorMessage' prop was specified and will be ignored`);
      }
      if (props.onBeforeChange) {
        console.warn(`FormTextBox: 'onBeforeChange' prop was specified and will be ignored`);
      }
      if (props.onBlur) {
        console.warn(`FormTextBox: 'onBlur' prop was specified and will be ignored`);
      }
    }
  }
}
