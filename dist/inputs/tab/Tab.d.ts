import { IPivotItemProps } from 'office-ui-fabric-react/lib/components/Pivot';
import { IFormBaseInputProps, FormBaseInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
/**
* The Tab Control. Only used as Placeholder. Rendered in the TabContainer.
*/
export declare class Tab extends FormBaseInput<IPivotItemProps, IFormBaseInputProps, IFormBaseInputState> {
    constructor(props: IFormBaseInputProps, context: IFormContext);
}
