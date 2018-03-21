import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormContext } from '../../form/Form.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState, DataStoreEntry } from '../../formBaseInput/FormBaseInput.types';
  
/**
 * Dropdown input for Form
 */
export class FormDropdown extends FormBaseInput<IDropdownProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore = this.props.inputKey + "_options";

    constructor(props: IFormBaseInputProps, context: IFormContext) {
        super(props, context);
        this.state = {
            isValid: true,
            currentValue: this.props.control.Value !== null && this.props.control.Value !== undefined ?
              this.props.control.Value :
              (
                (this.ConfigProperties && this.ConfigProperties.options && this.ConfigProperties.options.length > 0) ?
                this.ConfigProperties.options[0].key : undefined
              ),
            currentError: undefined,
            dataStores: []
          };
          this._validateDropdownProps(this.ConfigProperties);
    }

    /**
     * Render a Fabric Dropdown
     */
    public render(): JSX.Element {
        let key:string = this.props.control.DataProviderConfigKeys.length > 0 ?
            this.props.control.DataProviderConfigKeys[0] :
            this.optionsDataStore;
        let optionsEntry:DataStoreEntry = this.getDataOptionEntry(this.ConfigProperties.options, key, this.ConfigProperties.placeHolder);

        return (
        <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
            <Dropdown
                disabled={ optionsEntry.onLoading }
                {...this.ConfigProperties}              
                // These props cannot be overridden
                placeHolder={ optionsEntry.waitText }
                options={ optionsEntry.data }                    
                ref={(input) => this.innerControl = input }      
                id={ this.props.inputKey }
                onChanged={ this._onChanged }
                errorMessage= { this.getErrorMessage() }
                label=""
                selectedKey={ this.state.currentValue }
            />
        </InnerControl>);
    }

    /**
     * Stores the selected value of the dropdown to the state.
     * @param option the selected option to store the kay as value.
     */
    @autobind
    private _onChanged(option: IDropdownOption): void {
        this.setValue(option.key);
    }

    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate 
     */
    private _validateDropdownProps(props?: IDropdownProps): void {
        this.validateProps(props);
        if (props) {
        if (props.selectedKey !== null && props.selectedKey !== undefined) {
            console.warn(`FormDropdown: 'selectedKey' prop was specified and will be ignored`);
        }
    }
  }
}
