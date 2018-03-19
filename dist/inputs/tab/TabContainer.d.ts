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
    /**
     * Goes at when mounted to each child (pivotitem) and find in this al components and register them in the context.
     */
    componentDidMount(): void;
    /**
     * Goes trough each node and find in this al components and register them in the context.
     * @param children React node
     */
    private findeComponents(children);
    /**
    * Get the Pivot Items that are generated as Child objects
    */
    private getPivotItems();
    /**
     * Renders the Pivot with the configured Pivot items.
     */
    render(): JSX.Element;
}
