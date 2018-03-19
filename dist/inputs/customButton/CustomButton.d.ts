import { IFormContext } from '../../form/Form.types';
import { FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { ICustomButtonProps, ICustomButtonInputProps } from './CustomButton.types';
/**
 * Custom button for the form which is
 */
export declare class CustomButton extends FormBaseInput<ICustomButtonProps, ICustomButtonInputProps, IFormBaseInputState> {
    constructor(props: ICustomButtonInputProps, context: IFormContext);
    /**
     * Render Primary Button
     */
    render(): JSX.Element;
}
