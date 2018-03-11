/**
 * Class for the Custom Actions. The Name as to be Name of Custom Action Type
 * The Type of Action has to be the type of an Action that is type of onCustomAction.
 */
export class CustomActions {
    typeName:string;
    actionType: onCustomAction;
}

export declare type onCustomAction = (formData: any) => void;