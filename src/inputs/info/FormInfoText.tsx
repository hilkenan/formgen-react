import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState, DataStoreEntry } from '../../formBaseInput/FormBaseInput.types';
import { ILabelProps, Label, List } from 'office-ui-fabric-react';

/**
 * Info Text input for the Form.
 */
export class FormInfoText extends FormBaseInput<ILabelProps, IFormBaseInputProps, IFormBaseInputState> {
  private listDataStore = this.props.inputKey + "_list";
  
  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || '',
      currentError: undefined
    };
  }

  /**
   * Render a row of the grid.
   */
  private _onRenderCell(item: any, index: number): JSX.Element {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          { item.text }
        </div>
      </div>
    );
  }

  /**
   * Render a Fabric TextBox
   */
  public render(): JSX.Element {
    let key:string = this.props.control.DataProviderConfigKeys.length > 0 ?
      this.props.control.DataProviderConfigKeys[0] :
      this.listDataStore;

    let optionsEntry = this.getDataOptionEntry(undefined, key, undefined) as DataStoreEntry;
    if (optionsEntry && optionsEntry.data && optionsEntry.data.length > 0) {
      return (<div><Label
        {...this.ConfigProperties}      
        ref={(input) => this.innerControl = input }
        id={ this.props.inputKey }                        
        key={ this.props.inputKey }>
          <div dangerouslySetInnerHTML={{__html: this.TranslatedTitle}} />                        
        </Label>
        <div className="md-Grid">
          <List
              items={ optionsEntry.data }
              onRenderCell={ this._onRenderCell } />      
        </div>
      </div>);
    }
    else {
      return (<Label
        {...this.ConfigProperties}      
        ref={(input) => this.innerControl = input }
        id={ this.props.inputKey }                        
        key={ this.props.inputKey }>
          <div dangerouslySetInnerHTML={{__html: this.TranslatedTitle}} />                        
        </Label>);
    }
  }
}
