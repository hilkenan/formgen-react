import { Container } from 'inversify';
import { typesForInject, IDataProviderCollection } from '../../formBaseInput/FormBaseInput.types';
import { MockDataProviderCollection } from './MockDataProviderService';

/**
* Inversion Of Control class container
*/
export class MockContainer extends Container {
    constructor() {
      super();
      this.declareDependencies();
    }
  
    declareDependencies() {
      this.bind<IDataProviderCollection>(typesForInject.IDataProviderCollection).to(MockDataProviderCollection)
    }
}