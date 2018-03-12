import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { IRatingProps } from 'office-ui-fabric-react';
/**
 * Rating input for the Form. Displays a boolean value as a Rating
 */
export declare class FormRating extends FormBaseInput<IRatingProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Render a Toggle
     */
    render(): JSX.Element;
    private _onChange(rating);
}
