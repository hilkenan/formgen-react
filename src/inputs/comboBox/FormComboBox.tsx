import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState, DataStoreEntry } from '../../formBaseInput/FormBaseInput.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { ComboBox, IComboBoxProps, IComboBoxOption } from "office-ui-fabric-react/lib";
import { Helper } from '../../Helper';

/**
 * ComboBox input for Form
 */
export class FormComboBox extends FormBaseInput<IComboBoxProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore = this.props.inputKey + "_options"

    constructor(props: IFormBaseInputProps, context: IFormContext) {
        super(props, context);
        this.state = {
            isValid: true,
            currentValue: this.props.control.Value !== null && 
                this.props.control.Value !== undefined ?
                this.props.control.Value : '',
            currentError: undefined
        };
        this.validateProps(this.ConfigProperties);
    }

    /**
     * Render a Fabric Dropdown
     */
    public render(): JSX.Element { 
        let key:string = this.props.control.DataProviderConfigKeys.length > 0 ?
            this.props.control.DataProviderConfigKeys[0] :
            this.optionsDataStore;
        let optionsEntry:DataStoreEntry = this.getDataOptionEntry(this.ConfigProperties.options, key, this.ConfigProperties.value);
        let value = Helper.getPlaceHolderText(optionsEntry, this.ConfigProperties.value);
        
        return (
        <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
            <ComboBox
                disabled={ optionsEntry.onLoading }
                className="ms-ComboBox-FormInput"
                {...this.ConfigProperties}
                // These props cannot be overridden
                options={ optionsEntry.data }                    
                ref={(input) => this.innerControl = input }        
                id={ this.props.inputKey }
                errorMessage= { this.getErrorMessage() }
                onChanged={ this._onChanged }
                value={this.state.currentValue == '' || !this.state.currentValue ? value : undefined }
                label=""
                //Its mutually exclusive, but not works correct without set value and selectedKey
                selectedKey = { this.state.currentValue }
            />
        </InnerControl>);
    }

    /**
     * Stores the selected option from the combobox.
     * @param option the selected option of the choice group
     * @param index The index of the selected item 
     * @param value The Value use. Used when enter new data is allowed.
     */
    @autobind
    private _onChanged(option?: IComboBoxOption, index?: number, value?: string): void {
        let inputValue = option == undefined ? value : option.key;
        this.setValue(inputValue, true);
    }   
}
