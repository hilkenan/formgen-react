import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { Slider, ISliderProps } from 'office-ui-fabric-react';
import Rendering from '../../form/Rendering';

/**
 * Slider input for the Form.
 */
export class FormSlider extends FormBaseInput<ISliderProps, IFormBaseInputProps, IFormBaseInputState> {
  private stepValue:number;

  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
    this.stepValue = this.ConfigProperties.step != undefined ? this.ConfigProperties.step : 1;
  }

  /**
   * Render a Fabric Slider
   */
  public render(): JSX.Element {
    return (
      <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
        <Slider
            value={ this.state.currentValue  }                      
            {...this.ConfigProperties} 
            label=''
            ref={(input) => this.innerControl = input }
            key={ this.props.inputKey }
            step={ this.stepValue }
            onChange={ this._onChange }
          />      
          { this.state.currentError && Rendering.renderError(this.state.currentError) }        
      </InnerControl>);
  }

  /**
   * Stores the selected value of the slider to the state.
   * @param value the number to store
   */
  @autobind
  private _onChange(value: number): void {
    this.setValue(value, true);
  }
}
