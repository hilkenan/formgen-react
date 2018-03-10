import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ILabelProps, Label } from 'office-ui-fabric-react';

/**
 * Info Text input for the Form.
 */
export class FormInfoText extends FormBaseInput<ILabelProps, IFormBaseInputProps, IFormBaseInputState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
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
    return (<Label
            {...this.ConfigProperties}      
            ref={(input) => this.innerControl = input }
            key={ this.props.inputKey }>
              <div dangerouslySetInnerHTML={{__html: this.TranslatedTitle}} />                        
            </Label>);
    }
}
