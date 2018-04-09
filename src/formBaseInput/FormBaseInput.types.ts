import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IValidator } from '../validators/Validators';
import { Control } from '../objects/Control';
import { DataBinder } from '../objects/DataBinder.types';
import { JFormData } from '..';

/**
 * The Types to use for injection
 */
export const typesForInject = { IDataProviderCollection: "IDataProviderCollection" };

/**
 * The collection of data services to use
 */
export interface IDataProviderCollection {

  /** Collection of all used data service providers */
  providers: IDataProviderService[];
}

/**
 * The Service to load any data from a injected data store system.
 */
export interface IDataProviderService {

  /** Provider Service key to identify an provider  */
  providerServiceKey: string
  
  /** The current Form Data  */
  formData?: JFormData
  
  /** 
   * Retrieve list data from the store 
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
  retrieveListData?(configKey:string, controlConfig: Control, lang:string):Promise<any[]>
  
  /** 
   * Retrieve list data from the store filtered and optional limited with count of result items
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   * @param filter The filterstring to use
   * @param limitResults Count of items to return at max.
   */
  retrieveFilteredListData?(configKey:string, controlConfig: Control, lang:string, filter: string, limitResults?: number):Promise<any[]>
  
  /** 
   * Retrieve singel data from the store based on an key. Variations of Key format:
   * MyUserDataProvider.firstName --> Get for the current control from the "MyUserDataProvider (= providerServiceKey) the Information "firstName"
   * MyUserDataProvider.manager.firstName --> Get for the current control from the element manager the firstName. This type of object for this control has to support sub elements.
   * MyUserDataProvider.[thisForm.manager].firstName --> Get for control "thisForm.manager" the element "firstName"
   * MyUserDataProvider.[thisForm.anyUser].manager.firstName --> Get for control "thisForm.anyUser" from the element manager the firstName. This type of object for this control has to support sub elements.
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param senderControl The control config that sends the request.
   * @param receiverControl The control config that receives the value.
   * @param lang The current language to use.
   */
  retrieveSingleData?(configKey:string, senderControl: Control, receiverControl: Control, lang:string):Promise<any>

  /** 
   * Add a file to the data store
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param controlConfig The control that calls the request.
   * @param fileName The FileName to be stored.
   * @param fileContent The Content of the file.
   * @returns The full path where the file was stored.
   */
  addFile(configKey:string, controlConfig: Control, fileName:string, fileContent: any) : string;

  /** 
   * Remove a file from the data store
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param controlConfig The control that calls the request.
   * @param fileName The FileName to be removed.
   */
  removeFile(configKey:string, controlConfig: Control, fileName:string);
}

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
  currentFilter?: string;
  dataStores?: DataStoreEntry[];
}

/**
 * An data Store Entry object.
 */
export class DataStoreEntry {
  key: string;
  data: any[];
  onLoading?: boolean;
  waitText?: string;  
}