import { IPivotProps } from 'office-ui-fabric-react/lib/components/Pivot';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
/**
 * Container Control for the Tabs (Pivot)
 */
export declare class TabContainer extends FormBaseInput<IPivotProps, IFormBaseInputProps, IFormBaseInputState> {
    private contextTab;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    componentDidMount(): void;
    private findeComponents(children);
    /**
    * Get the Pivot Items that are generated as Child objects
    */
    private getPivotItems();
    render(): JSX.Element;
}
