import { DynamicControl } from '../objects/DynamicControl.types';
import { Control } from '../objects/Control';
import { Row } from '../objects/Row';
import { DataBinder } from '../objects/DataBinder.types';
import { CustomValidator } from '../objects/CustomValidator.types';
import { CustomActions } from '../objects/CustomActions.types';
/**
 * Rendering Engine for the Form
 */
declare class Rendering {
    constructor(getCurrentFormData: () => any, customControls?: DynamicControl[], customValidators?: CustomValidator[], customActions?: CustomActions[], dataBinders?: DataBinder[], cancelEvent?: () => void);
    private getCurrentFormData;
    controls: DynamicControl[];
    customValidators: CustomValidator[];
    customActions: CustomActions[];
    dataBinders: DataBinder[];
    cancelEvent?(): void;
    /**
    * Call the Custom Action Event with the Form Data
    * @param The Custom Action to call with the form data.
    */
    callCustomEvent(customAction?: CustomActions): void;
    /**
    * Build the Controls rendered control
    */
    buildControlElements(rootKey: string, controls?: Control[], labelWith?: number): JSX.Element[];
    /**
    * Build the Column Controls as Divs with all Sub elements
    */
    private buildColElements(rootKey, columns);
    /**
    * Build the Rows Controls as Divs with all Sub elements
    */
    buildRowWlements(rootKey: string, rows?: Row[]): JSX.Element[];
    /**
    * Renders an Error div.
    */
    static renderError(errorMessage: string): JSX.Element;
}
export default Rendering;
