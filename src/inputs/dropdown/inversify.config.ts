import { Container } from 'inversify';
import { IDataProviderService, typesForInject } from '../../formBaseInput/FormBaseInput.types';
import { MockDataProviderService } from './MockDataProviderService';

/**
* Inversion Of Control class container
*/
export class MockContainer extends Container {
    constructor() {
      super();
      this.declareDependencies();
    }
  
    declareDependencies() {
      this.bind<IDataProviderService>(typesForInject.IDataProviderService).to(MockDataProviderService)
    }
}