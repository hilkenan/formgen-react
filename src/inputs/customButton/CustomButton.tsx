import * as React from 'react';
import { IFormContext } from '../../form/Form.types';
import { FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { DefaultButton } from 'office-ui-fabric-react';
import { ICustomButtonProps, ICustomButtonInputProps } from './CustomButton.types';
import { LocalsCommon } from '../../locales/LocalsCommon';

/**
 * Custom button for the form which is 
 */
export class CustomButton extends FormBaseInput<ICustomButtonProps, ICustomButtonInputProps, IFormBaseInputState> {
  constructor(props: ICustomButtonInputProps, context: IFormContext) {
    super(props, context, true);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
    this.validateProps(this.ConfigProperties);
  }

  /**
   * Render Primary Button
   */
  public render(): JSX.Element {
    let cancelText = this.commonFormater.formatMessage(LocalsCommon.buttonCancel);
    return (
      <DefaultButton
        onClick={ this.props.onClick }
        text={ this.props.control.Title ? this.TranslatedTitle : cancelText }
        {...this.ConfigProperties} 
        ref={(input) => this.innerControl = input }              
        key={ this.props.inputKey }            
       >
      </DefaultButton>
    );
  }
}
