import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { Rating, IRatingProps } from 'office-ui-fabric-react';
import Rendering from '../../form/Rendering';

/**
 * Rating input for the Form. Displays a boolean value as a Rating
 */
export class FormRating extends FormBaseInput<IRatingProps, IFormBaseInputProps, IFormBaseInputState> {
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
      <Rating
          rating={ this.state.currentValue ? this.state.currentValue as number : undefined }            
          {...this.ConfigProperties}
          // These props cannot be overridden      
          id={ this.props.inputKey }                        
          key={ this.props.inputKey }  
          label=""
          onChanged={ this._onChange }
        />
        { this.state.currentError && Rendering.renderError(this.state.currentError) }        
      </InnerControl>);
 }

  @autobind
  private _onChange(rating: number): void {
    this.setValue(rating, true);
  }
}
