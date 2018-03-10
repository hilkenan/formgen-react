import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { IToggleProps, Toggle } from 'office-ui-fabric-react';

/**
 * Toggle input for the Form. Displays a boolean value as a Toggle
 */
export class FormToggle extends FormBaseInput<IToggleProps, IFormBaseInputProps, IFormBaseInputState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
    this.validateProps(this.ConfigProperties);
  }

  /**
   * Render a Toggle
   */
  public render(): JSX.Element {
    return (
    <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
      <Toggle
          defaultChecked={ this.state.currentValue ? this.state.currentValue as boolean : undefined }            
          {...this.ConfigProperties}
          // These props cannot be overridden
          ref={(input) => this.innerControl = input }      
          key={ this.props.inputKey }  
          label=""
          onChanged={ this._onChange }
        />
      { this.state.currentValue && (this.state.currentValue as boolean) == true  && 
        this.props.children
      }        
      </InnerControl>);
 }
 
  @autobind
  private _onChange(isChecked: boolean): void {
    this.setValue(isChecked);
  }
}
