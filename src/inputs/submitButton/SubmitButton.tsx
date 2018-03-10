import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IFormContext } from '../../form/Form.types';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ISubmitButtonProps } from './SubmitButton.types';
import { LocalsCommon } from '../../locales/LocalsCommon';

/**
 * Submit button for the form which is disabled when the form is invalid
 */
export class SubmitButton extends FormBaseInput<ISubmitButtonProps, IFormBaseInputProps, IFormBaseInputState> {
  constructor(props: IFormBaseInputProps, context: IFormContext) {
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
    let submitText = this.commonFormater.formatMessage(LocalsCommon.buttonSend);
    
    return (
      <PrimaryButton
        ref={(input) => this.innerControl = input }              
        key={ this.props.inputKey }      
        type='submit'
        disabled={ !this.formContext.isFormValid() }
        {...this.ConfigProperties} >
        { this.props.control.Title ? this.TranslatedTitle : submitText }
      </PrimaryButton>
    );
  }
}
