import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';

/**
 * Checkbox input for the Form. Displays a boolean value as a checkbox
 */
export class FormCheckBox extends FormBaseInput<ICheckboxProps, IFormBaseInputProps, IFormBaseInputState> {
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
   * Render a checkbox
   */
  public render(): JSX.Element {
    return (
    <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } ControlWith={1} >
      <div style={{ marginTop:5 }}>
        <Checkbox
            defaultChecked={ this.state.currentValue ? this.state.currentValue as boolean : undefined }            
            {...this.ConfigProperties}
            // These props cannot be overridden
            ref={(input) => this.innerControl = input }      
            id={ this.props.inputKey }  
            key={ this.props.inputKey }  
            label=""
            name={ this.props.inputKey }
            onChange={ this._onChange }
          />
      </div>
      { this.state.currentValue && (this.state.currentValue as boolean) == true  && 
        this.props.children
      }
      </InnerControl>);
 }

  @autobind
  private _onChange(event: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    this.setValue(isChecked);
  }
}
