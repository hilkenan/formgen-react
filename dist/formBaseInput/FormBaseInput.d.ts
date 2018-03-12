/// <reference types="react-intl" />
/// <reference types="react" />
import * as React from 'react';
import { IFormBaseInputProps, IFormBaseInputState } from './FormBaseInput.types';
export { IFormBaseInputProps };
import { BaseComponent, ICancelable } from 'office-ui-fabric-react/lib/Utilities';
import { IFormContext, IFormValidationResult } from '../form/Form.types';
import { IDataBinderFilterAsync } from '../objects/DataBinder.types';
export declare const DEFAULT_DEBOUNCE = 250;
/**
 * Type alias for any simple form input
 */
export declare type GenericFormInput = FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState>;
/**
 * Type alias for any simple form input
 */
export declare type DataLoadedFunction = (key: string, data: any[], waitText: string, isAsync: boolean) => void;
/**
 * The base class that all simple form inputs should inherit from
 * The T generic should be the type of value this input accepts. For example, a TextBox would probably define T as string
 */
export declare abstract class FormBaseInput<T, P extends IFormBaseInputProps, S extends IFormBaseInputState> extends BaseComponent<P, S> {
    protected commonFormater: ReactIntl.InjectedIntl;
    static contextTypes: React.ValidationMap<IFormContext>;
    innerControl: any;
    /**
     * The debounced version of formContext.submitValue
     */
    protected readonly debouncedSubmitValue: ICancelable<void> & ((input: GenericFormInput, validateIt?: boolean) => void);
    /**
     * Form context passed by the parent form
     */
    protected formContext: IFormContext;
    /**
     * Constructor for any Simple Form input
     * @param props The props for this component
     * @param context The context for this component
     * @param leadingDebounce Sets the debounce setting for updates on this input.
     * If leading, the component will update immediately and then debounce.
     * Otherwise, the component will only update after the debounce interval. Defaults to true
     */
    constructor(props: P, context: IFormContext, leadingDebounce?: boolean);
    /**
     * React Lifecycle Method - Because this method uses state when rendering, the state must be
     * updated when the prop's value updates
     * @param nextProps The props that the component is receiving
     */
    componentWillReceiveProps(nextProps: P): void;
    /**
     * Store the options to the state
     */
    private storeOptions(dataKey, data, waitText, isAsync);
    /**
    * Get the Error Message back after falidation the Value.
    */
    protected getErrorMessage(): string;
    /**
    * Check the proprties and warn if the default are used.
    */
    protected validateProps(props?: any): void;
    /**
    * Loads the data from the Store async or sync.
    * If Async loading the return true
    * @param dataStoreKey The Key from the datastore
    * @param loadedFunction The funtion to call after data is loaded
    */
    loadDataFromStore(dataStoreKey: string, loadedFunction: DataLoadedFunction, waitText: string): boolean;
    /**
    * Calculate the Class Name for Control
    */
    protected getClassNameControl(): string;
    /**
    * Property for the Control. In case of UI Fabric Controls the UI Fabric Interface class can be used. This Config will overgiven to the
    * Inner Control
    */
    protected ConfigProperties: T;
    /**
    * Translation for the Title
    */
    TranslatedTitle?: string;
    /**
    * The cofigured class name or ''
    */
    ControlClassName: string;
    /**
    * True if the Required validator is set.
    */
    IsRequired: boolean;
    /**
    * Translaiton for the Info
    */
    TranslatedInfo?: string;
    /**
    * Loaded data for this Control.
    */
    protected dataStore: {
        [key: string]: any[] | Promise<any[]>;
    };
    /**
    * The Asynchronous Filter Methods.
    */
    protected retrievFilterData: {
        [key: string]: IDataBinderFilterAsync;
    };
    componentWillMount(): void;
    componentWillUnmount(): void;
    /**
     * Validate the input. By default, this function will run through all the validators and ensure they pass
     */
    doValidate(): IFormValidationResult;
    /**
     * Set the error state of this input
     */
    setError(errorMessage?: string): void;
    /**
     * Clear any errors from this input
     */
    clearError(): void;
    /**
     * Set the current value of this input and validate it
     */
    setValue(value: any, validate?: boolean): void;
    /**
     * Validate incoming props
     * @param props Props to validate
     */
    private _validateProps(props);
}
