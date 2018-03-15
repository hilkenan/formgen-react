import * as React from 'react';
import { ComponentProps } from 'react-quill'; 
var ReactQuill = require("react-quill");
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import 'react-quill/dist/quill.snow.css'; // ES6
import Rendering from '../../form/Rendering';

/**
 * TextBox input for the Form.
 */
export class FormRichTextInput extends FormBaseInput<ComponentProps, IFormBaseInputProps, IFormBaseInputState> {
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
        <ReactQuill
            defaultValue={ this.state.currentValue }
            {...this.ConfigProperties}      
            ref={(input) => this.innerControl = input }
            key={ this.props.inputKey }
            onChange={ this._onChange }
          />
          { this.state.currentError && Rendering.renderError(this.state.currentError) }
      </InnerControl>);
  }

  /**
   * Stores the html content to the state.
   * @param value html value to store
   */
  @autobind
  private _onChange(value: string): void {
    if (value == "<p></p>" || value == "<p><br></p>") value = undefined;
    this.setValue(value, true);
  }

    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate 
     */
    private _validateTextFieldProps(props?: ComponentProps): void {
    this.validateProps(props);
    if (props) {
      if (props.onBlur) {
        console.warn(`FormTextBox: 'onBlur' prop was specified and will be ignored`);
      }
    }
  }
}
