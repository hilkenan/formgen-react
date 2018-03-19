import { IDataProviderService } from '../../formBaseInput/FormBaseInput.types';
import { Control } from '../..';
import { IDropdownOption } from 'office-ui-fabric-react';
import { injectable } from 'inversify';

@injectable()
export class MockDataProviderService implements IDataProviderService {

    /** 
   * Retrieve data from the store 
   * @param configKey Config Key from the control. This will use the by the provider to finde the correct configuration for this request
   * @param formData The Current complete Form Model. Here the config should be found.
   * @param controlConfig The control that calls the request.
   * @param lang The current language to use.
   */
  public retrieveListData(configKey:string, controlConfig: Control, lang:string):Promise<any[]> {
    console.log("START SENDING")
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
}