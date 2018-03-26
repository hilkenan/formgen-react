import { IDataProviderService, IDataProviderCollection } from '../../formBaseInput/FormBaseInput.types';
import { Control } from '../..';
export declare class MockDataProviderService implements IDataProviderService {
    providerServiceKey: string;
    /**
   * Retrieve data from the store
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param formData The Current complete Form Model. Here the config should be found.
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
    retrieveListData(configKey: string, controlConfig: Control, lang: string): Promise<any[]>;
    retrieveSingleData(configKey: string, senderControl: Control, receiverControl: Control, lang: string): Promise<any>;
    retrieveFilteredListData?(configKey: string, controlConfig: Control, lang: string, filter: string, limitResults?: number): Promise<any[]>;
}
export declare class MockDataProviderCollection implements IDataProviderCollection {
    constructor();
    providers: IDataProviderService[];
}
