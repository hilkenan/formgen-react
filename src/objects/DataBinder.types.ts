import { Control } from "./Control";
import { BinderType } from "../Enums";

/**
 * Class that represents one data binder object. 
 * The Generic Type is the return value from one item.
 * The target method that used the item at the end decide what type
 * here can be used.
 */
export class DataBinder {
    typeName:string;
    binderFunction: IDataBinder | IDataBinderAsync | IDataBinderFilterAsync | IDataProviderFilterAsync;
    binderType: BinderType;
}

/**
 * The Type of an Databinding Class that return the Type of any as array
 */
export interface IDataBinder {
    retrieveData(controlConfig: Control, lang:string):any[] 
}

/**
 * The Type of an Async Databinding Class that return the Type of any as array as Promise
 */
export interface IDataBinderAsync {
    retrieveData(controlConfig: Control, lang:string):Promise<any[]>
}

/**
 * The Type of an Async Databinding Class with a Filter string that return the Type of any as array as Promise
 */
export interface IDataBinderFilterAsync {
    retrieveData(controlConfig: Control, lang:string, filter: string, limitResults?: number):Promise<any[]>
}

/**
 * The Type of an Async DataService Class with a Filter string that return the Type of any as array as Promise
 */
export interface IDataProviderFilterAsync {
    retrieveFilteredListData(configKey:string, controlConfig: Control, lang:string, filter: string, limitResults?: number):Promise<any[]>       
}