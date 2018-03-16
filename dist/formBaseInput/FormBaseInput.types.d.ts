import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IValidator } from '../validators/Validators';
import { Control } from '../objects/Control';
import { DataBinder } from '../objects/DataBinder.types';
/**
 * The base props for any simple form input
 */
export interface IFormBaseInputProps extends IBaseProps {
    /** The key of this input. This value will be used to key form results */
    inputKey: string;
    /** Any validator functions to run when the input is updated */
    validators?: IValidator[];
    /** Databinder used in this cntrol */
    dataBinder?: DataBinder[];
    /** The interval when validation and update callbacks should be fired */
    debounceInterval?: number;
    /** Control object to configure the control */
    control: Control;
    /** the used css Style number from UI Fabric (1-12) */
    labelWith?: number;
}
/**
 * The base state for any simple form input
 */
export interface IFormBaseInputState {
    isValid: boolean;
    currentValue?: any;
    currentError?: string;
    dataStores?: DataStoreEntry[];
}
/**
 * An data Store Entry object.
 */
export declare class DataStoreEntry {
    key: string;
    data: any[];
    onLoading?: boolean;
    waitText?: string;
}
