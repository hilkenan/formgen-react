/* tslint:disable:no-any */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IFormBaseInputProps, IFormBaseInputState, DataStoreEntry, typesForInject, IDataProviderCollection, IDataProviderService } from './FormBaseInput.types';
export { IFormBaseInputProps };
import { BaseComponent, ICancelable } from 'office-ui-fabric-react/lib/Utilities';
import { TranslatedProperty, ValidatorTypes, BinderType } from '../Enums';
import { IFormContext, IFormValidationResult } from '../form/Form.types';
import { autobind } from '@uifabric/utilities';
import { IDataBinder, IDataBinderAsync, IDataBinderFilterAsync, IDataProviderFilterAsync } from '../objects/DataBinder.types';
import { LocalsCommon } from '../locales/LocalsCommon';
import { Helper } from '../Helper';
import { Control } from '..';

/**
 * Default Debaunce of 250 Ticks.
 */
export const DEFAULT_DEBOUNCE = 250;

/**
 * Type alias for any simple form input
 */
export type GenericFormInput = FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState>;

/**
 * Type alias for any simple form input
 */
export type DataLoadedFunction = (key: string, data: any[], waitText: string, isAsync: boolean)  => void;

/**
 * The base class that all simple form inputs should inherit from
 * The T generic should be the type of value this input accepts. For example, a TextBox would probably define T as string
 */
export abstract class FormBaseInput<T, P extends IFormBaseInputProps, S extends IFormBaseInputState> extends BaseComponent<P, S> {
  protected commonFormater = Helper.getTranslator("common");
  public static contextTypes: React.ValidationMap<IFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired
  };

  public innerControl: any;

  /**
   * The debounced version of formContext.submitValue
   */
  protected readonly debouncedSubmitValue: ICancelable<void> & ((input: GenericFormInput, validateIt?: boolean, skipSendValue?: boolean) => void);

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
  constructor(props: P,  context: IFormContext, leadingDebounce?: boolean) {
    super(props, context);
      this.formContext = context;
      this.debouncedSubmitValue = this._async.debounce(
      this.formContext.submitValue, (
        (this.props.debounceInterval !== null && this.props.debounceInterval !== undefined) ?
          this.props.debounceInterval : DEFAULT_DEBOUNCE
      ),
      {
        leading: (leadingDebounce === null || leadingDebounce === undefined ? true : leadingDebounce)
      });    
      if (props.control.Config)
          this.ConfigProperties = props.control.Config as T;
      else
          this.ConfigProperties = {} as T;

      this.ConfigProperties = Helper.getTranslatedObject(this.ConfigProperties, this.props.control.ConfigTranslation);
      this.TranslatedTitle = Helper.getTranslatedProperty(TranslatedProperty.Title,this.props.control);
      this.TranslatedInfo = Helper.getTranslatedProperty(TranslatedProperty.Info,this.props.control);
      this.ControlClassName = this.props.control.CssClass ? this.props.control.CssClass : "";
  }

  /**
   * React Lifecycle Method - Because this method uses state when rendering, the state must be
   * updated when the prop's value updates
   * @param nextProps The props that the component is receiving
   */
  public componentWillReceiveProps(nextProps: P): void {
    if (nextProps.control.Value !== this.props.control.Value && this.props.control.Value === this.state.currentValue) {
      // If the props have changed and the previous props are equal to the current value, then we want to update the internal state value
      this.setState((prevState: S) => {
        prevState.currentValue = nextProps.control.Value;
        return prevState;
      });
    }
  }

    /**
     * Store the options to the state
     * @param dataKey The databinder key to use
     * @param data The Array with the Data.
     * @param waitText The Wait Text for async loading
     * @param isAsync True if async loading.
     */
    @autobind
    private storeOptions(dataKey: string, data: any[], waitText: string, isAsync: boolean): void {
      let options:DataStoreEntry[] = this.state.dataStores;
      if (!options) 
        options = [];
      let entry = options.find(d => d.key == dataKey);
      let refresh = false;
      if (entry && !entry.data) entry.data = [];
      if (entry && (!Helper.compareArrays(entry.data, data) || entry.onLoading != isAsync || entry.waitText != waitText)) {
        refresh = true;
        entry.data = data && data.length == 0 ? undefined : data;
        entry.onLoading = isAsync;
        entry.waitText = waitText;
      }
      else if (!entry) {
        refresh = true;
        options.push({
          key: dataKey,
          data: data && data.length == 0 ? undefined : data,
          onLoading: isAsync,
          waitText: waitText
        });
      }

      if (refresh)
        this.setState({dataStores: options});
    }

  /**
  * Get the Error Message back after falidation the Value.
  */
  @autobind
  protected getErrorMessage() {
      if (this.state.currentValue){
          let result = this.doValidate();
          return result.errorMessage;
      }
      return "";
  }  
  
  /**
  * Check the proprties and warn if the default are used.
  * @param props The property Object to check.
  */
  protected validateProps(props?: any): void {
    if (props) {
      if (props.ref) {
        console.warn(this.props.inputKey +  " 'ref' prop was specified and will be ignored");
      }
      if (props.id) {
        console.warn(this.props.inputKey +  " 'id' prop was specified and will be ignored");
      }
      if (props.name) {
        console.warn(this.props.inputKey +  " 'name' prop was specified and will be ignored");
      }
      if (props.label) {
        console.warn(this.props.inputKey +  " 'label' prop was specified and will be ignored");
      }
      if (props.onChange) {
        console.warn(this.props.inputKey +  " 'onChange' prop was specified and will be ignored");
      }  
    }
  }


  /**
  * Loads the data from the Store async with a filter teext
  * If Async loading the return true
  * @param configKey The Key from the datastore
  * @param provider The Data Provider for Async Filter
  * @param loadedFunction The funtion to call after data is loaded
  * @param waitText The Waiting Text for async loading controls.
  * @param control The sender Control that has the Filter Text
  * @param filter The Filter Text.
  */
 public loadDataFromStoreWithFilter(configKey:string, provider:IDataProviderFilterAsync, loadedFunction:DataLoadedFunction, 
    waitText: string, control:Control, filter:string) {
  if (provider) {
    let entry = this.state.dataStores ? this.state.dataStores.find(e => e.key == configKey) : undefined;
    if (!entry) {
      let waitText = this.commonFormater.formatMessage(LocalsCommon.loadData);
      loadedFunction(configKey, undefined, waitText, true);
    }
    provider.retrieveFilteredListData(configKey,control,Helper.getLanguage(), filter).then((list) => {
      let waitTextA = !list || list.length == 0 ?
        this.commonFormater.formatMessage(LocalsCommon.nothingFound) : waitText;
      loadedFunction(configKey, list, waitTextA, false);
    });
  }
}

  /**
  * Loads the data from the Store async or sync.
  * If Async loading the return true
  * @param dataStoreKey The Key from the datastore
  * @param loadedFunction The funtion to call after data is loaded
  * @param waitText The Waiting Text for async loading controls.
  */
 public loadDataFromStore(dataStoreKey:string, loadedFunction:DataLoadedFunction, waitText: string): boolean {
    let dataBinderAsync:Promise<any[]> = this.dataStore[dataStoreKey] as Promise<any[]>;
    let dataBinder:any[] = this.dataStore[dataStoreKey] as any[];

    if (dataBinderAsync && dataBinderAsync.then) {
      let waitText = this.commonFormater.formatMessage(LocalsCommon.loadData);
      loadedFunction(dataStoreKey, undefined, waitText, true);
      dataBinderAsync.then((optionList) => {
        loadedFunction(dataStoreKey, optionList, "", false);
      });
      return true;
    }
    else if (dataBinder) {
      loadedFunction(dataStoreKey, dataBinder, waitText, false);
    }
    return false;
  }

  /**
  * Get the Data options entry 
  * @param staticData Static data array from config.
  * @param key DataStore key (config or databinder)
  * @param defaultPlaceholder Default placholder text.
  */ 
 protected getDataOptionEntry(staticData: any[], key:string, defaultPlaceholder: string): DataStoreEntry {
    let optionsEntry:DataStoreEntry;
    let controlKey = Helper.getControlKeyFromConfigKey(key);
    if (controlKey && this.state.currentFilter) {
        let provider = this.retrievFilterData[key] as IDataProviderFilterAsync;
        let waitText = Helper.getPlaceHolderText(optionsEntry, defaultPlaceholder);
        this.loadDataFromStoreWithFilter(key, provider, this.storeOptions, waitText, this.props.control, this.state.currentFilter);
        let entry = this.state.dataStores ?
          this.state.dataStores.find(e => e.key == key) : undefined;
        return entry;
    }
    else {
      if (!staticData && this.state.dataStores){
        optionsEntry = this.state.dataStores.find(e => e.key == key);
      }
      if (optionsEntry) {
          optionsEntry.waitText = Helper.getPlaceHolderText(optionsEntry, defaultPlaceholder);
      }
      else {
        optionsEntry = {
          key: "default",
          data: staticData,
          onLoading: false,
          waitText: Helper.getPlaceHolderText(undefined, defaultPlaceholder)
        }
      }
      if (this.props.control.ReadOnly)
        optionsEntry.onLoading = true;

      return optionsEntry;
    }
  }

  /**
  * Property for the Control. In case of UI Fabric Controls the UI Fabric Interface class can be used. This Config will overgiven to the 
  * Inner Control
  */ 
  protected ConfigProperties:T;

  /** Translation for the Title */ 
  public TranslatedTitle?:string;

  /** The cofigured class name or '' */ 
  public ControlClassName:string;

  /** True if the Required validator is set. */ 
  public IsRequired(): boolean {
    return this.props.control.FormValidators && this.props.control.FormValidators.find(v => v.ValidatorType == ValidatorTypes.Required) != undefined;
  }

  /** Translaiton for the Info */ 
  public TranslatedInfo?:string;

  /** Loaded data for this Control. */ 
  protected dataStore:{ [key: string]: any[] | Promise<any[]> } = {}

  /** The Asynchronous Filter Methods. */ 
  protected retrievFilterData: { [key: string]: IDataBinderFilterAsync | IDataProviderFilterAsync } = {}

  /** The Data Provier Service used for this control */ 
  protected dataProviderService?: IDataProviderService;

  /**
  * Load the Databinder. Sync and Async are loaded. AsyncFilter is loade when user type an filter.
  */ 
 public componentWillMount(): void {
    this.formContext.mountInput(this);
    let formData = this.formContext.formData;
    let container = this.formContext.container;
    
    if (this.props.dataBinder) {
      for(let binder of this.props.dataBinder) {
        let binderSync = binder.binderFunction as IDataBinder;
        let binderAsync = binder.binderFunction as IDataBinderAsync;
        let binderAsyncFilter = binder.binderFunction as IDataBinderFilterAsync;
        
        if (binder.binderType == BinderType.Sync)
          this.dataStore[binder.typeName] = binderSync.retrieveData(this.props.control, Helper.getLanguage()); 
        else if (binder.binderType == BinderType.Async)
          this.dataStore[binder.typeName] = binderAsync.retrieveData(this.props.control, Helper.getLanguage()); 
        else if (binder.binderType == BinderType.AsyncFilter)
          this.retrievFilterData[binder.typeName] = binderAsyncFilter; 
      }    
    }
    if (this.props.control.DataProviderConfigKeys.length > 0 && container == undefined)
      throw "No Data Service Container found"
    if (this.props.control.DataProviderConfigKeys.length > 0) {
      let dataProviders = container.get<IDataProviderCollection>(typesForInject.IDataProviderCollection);
      if (dataProviders == undefined || dataProviders.providers.length == 0)
        throw "No Data Service found"
      for(let configKey of this.props.control.DataProviderConfigKeys) {
        let keyParts = configKey.split(".");
        this.dataProviderService = dataProviders.providers.find(p => p.providerServiceKey ==  keyParts[0])
        if (this.dataProviderService == undefined)
          throw "No DataProvider found with key " + keyParts[0] + " name is: " + dataProviders.providers[0].providerServiceKey;
        this.dataProviderService.formData = formData;
        this.dataProviderService.initialize();

        let result = Helper.getControlKeyFromConfigKey(configKey);
        if (result && this.dataProviderService.retrieveFilteredListData) {
          let binderFuntion = this.dataProviderService as IDataProviderFilterAsync;
          this.retrievFilterData[configKey] = binderFuntion; 
        }
        else {
          let providerConfigKey = Helper.getConfigKeyFromProviderKey(configKey);
          this.dataStore[configKey] = this.dataProviderService.retrieveListData(providerConfigKey, this.props.control, Helper.getLanguage()); 
          this.loadDataFromStore(configKey,this.storeOptions, "");
        }
      }
    }

    for(let binder of this.props.control.DataBinders) {
      let key = this.props.inputKey + "_" + binder;
      if (this.ConfigProperties[binder]) 
          this.storeOptions(key, this.ConfigProperties[binder], "", false);
      else {
          this.loadDataFromStore(key,this.storeOptions, "");
      }
    }  
  }

  /**
   * Unmount the current control.
   */
  public componentWillUnmount(): void {
    this.debouncedSubmitValue.flush();
    this.formContext.unmountInput(this);
  }

  /**
   * Validate the input. By default, this function will run through all the validators and ensure they pass
   */
  public doValidate(): IFormValidationResult {
    const {
      validators = []
    } = this.props;

    let validationResult: IFormValidationResult = {
      isValid: true,
      component: this
    };

    for (let validator of (validators as any)) {
      let error: string = validator(this.state.currentValue);
      if (error) {
        validationResult.isValid = false;
        validationResult.errorMessage = error;
        return validationResult;
      }
    }

    return validationResult;
  }

  /**
   * Set the error state of this input
   * @param errorMessage Message to set to the state.
   */
  public setError(errorMessage?: string): void {
    this.setState((prevState: S) => {
      prevState.isValid = false;
      prevState.currentError = errorMessage;
      return prevState;
    });
  }

  /**
   * Clear any errors from this input
   */
  public clearError(): void {
    this.setState((prevState: S) => {
      prevState.isValid = true;
      prevState.currentError = undefined;
      return prevState;
    });
  }

  /**
   * Set the current value of this input and validate it
   * @param value The value to set
   * @param validate True if the value should be validated.
   */
  public setValue(value: any, validate?: boolean, skipSendValue?: boolean): void {
    this.setState((prevState: S): S => {
        this.props.control.Value = value;
        prevState.currentValue = value;
        return prevState;
      },
      () => {
        this.debouncedSubmitValue(this, validate, skipSendValue);
      }
    );
  }
}