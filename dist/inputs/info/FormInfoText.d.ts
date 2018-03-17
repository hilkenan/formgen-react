/// <reference types="react" />
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ILabelProps } from 'office-ui-fabric-react';
/**
 * Info Text input for the Form.
 */
export declare class FormInfoText extends FormBaseInput<ILabelProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Fabric TextBox
     */
    render(): JSX.Element;
}
