import { DynamicControl } from '../objects/DynamicControl.types';
import { Control } from '../objects/Control';
import { Row } from '../objects/Row';
import { DataBinder } from '../objects/DataBinder.types';
import { CustomValidator } from '../objects/CustomValidator.types';
import { CustomActions } from '../objects/CustomActions.types';
import { FormInputs } from './FormInputs';
/**
 * Rendering Engine for the Form
 */
declare class Rendering {
    /**
     * Initialize all arrays with the params and load the control mapping.
     */
    constructor(getCurrentFormData: () => any, customControls?: DynamicControl[], customValidators?: CustomValidator[], customActions?: CustomActions[], dataBinders?: DataBinder[], formInputs?: FormInputs, cancelEvent?: () => void);
    cancelEvent?(): void;
    private getCurrentFormData;
    controls: DynamicControl[];
    customValidators: CustomValidator[];
    customActions: CustomActions[];
    dataBinders: DataBinder[];
    /**
    * Call the Custom Action Event with the Form Data
    * @param customAction Custom Action to call with the form data.
    */
    callCustomEvent(customAction?: CustomActions): void;
    /**
    * Build the Controls rendered control
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param controls The Control definition to load the control types with.
    * @param labelWith Defined Label with form the parent column
    */
    buildControlElements(rootKey: string, controls?: Control[], labelWith?: number): JSX.Element[];
    /**
    * Build the Column Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param columns The columns definition to load
    */
    private buildColElements(rootKey, columns);
    /**
    * Build the Rows Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param rows The rows to load to the tree
    */
    buildRowWlements(rootKey: string, rows?: Row[]): JSX.Element[];
    /**
    * Renders an Error div.
    * @param errorMessage The Error Message to show in the div.
    */
    static renderError(errorMessage: string): JSX.Element;
}
export default Rendering;
