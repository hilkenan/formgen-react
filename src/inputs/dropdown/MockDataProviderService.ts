import { IDataProviderService, IDataProviderCollection } from '../../formBaseInput/FormBaseInput.types';
import { Control } from '../..';
import { IDropdownOption } from 'office-ui-fabric-react';
import { injectable } from 'inversify';

export class MockDataProviderService implements IDataProviderService {

    providerServiceKey = "mockDataService";

    /** 
   * Retrieve data from the store 
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param formData The Current complete Form Model. Here the config should be found.
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
  public retrieveListData(configKey:string, controlConfig: Control, lang:string):Promise<any[]> {
    return new Promise<any[]>((resolve, reject)  => {
        let dropDonwEntries:IDropdownOption[] = [{
            key: 1,
            text: "Test 1"
        },
        {
            key: 2,
            text: "Test2"
        }];
        setTimeout(() => resolve(dropDonwEntries), 5000);
    });
  }

  public retrieveSingleData(configKey:string, senderControl: Control, receiverControl: Control, lang:string):Promise<any> {
    return new Promise<any>((resolve, reject)  => {
        if (senderControl && senderControl.Value == "11:00:01"){
            resolve("nothing else");
            return;
        } 
        if (configKey == "testA") {
            resolve("1");
            return;
        }
        else {
            resolve("");
            return;
        }
    });
  }

  public retrieveFilteredListData?(configKey:string, controlConfig: Control, lang:string, filter: string, limitResults?: number):Promise<any[]> {
    return new Promise<any[]>((resolve, reject)  => {
        let dropDonwEntries:IDropdownOption[] = [];

        if (filter == "1") {
            dropDonwEntries.push({
                key: 1,
                text: "Test 1"
            })
        }
        if (filter == "2") {
            dropDonwEntries.push({
                key: 2,
                text: "Test2"
            })
        }
        setTimeout(() => resolve(dropDonwEntries), 1000);
    });
  }
}

@injectable()
export class MockDataProviderCollection implements IDataProviderCollection {
    constructor() {
        let mockProvider = new MockDataProviderService();
        mockProvider.providerServiceKey 
        this.providers.push(mockProvider);
    }
    providers:IDataProviderService[] = [];
}
