import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFormContext } from '../../form/Form.types';
import { IFormBaseInputState, DataStoreEntry } from '../../formBaseInput/FormBaseInput.types';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { ChoiceGroup, IChoiceGroupProps, IChoiceGroupOption } from "office-ui-fabric-react/lib";
import Rendering from '../../form/Rendering';

/**
 * ChoiceGroup input for Form
 */
export class FormChoiceGroup extends FormBaseInput<IChoiceGroupProps, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore = this.props.inputKey + "_options"

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
            currentError: undefined
          };
          this._validateChoiceGroupProps(this.ConfigProperties);
    }

    /**
     * Render a Fabric Dropdown
     */
    public render(): JSX.Element {
        let key:string = this.props.control.DataProviderConfigKeys.length > 0 ?
            this.props.control.DataProviderConfigKeys[0] :
            this.optionsDataStore;
        let optionsEntry:DataStoreEntry = this.getDataOptionEntry(this.ConfigProperties.options, key, this.ConfigProperties.placeholder);

        return (
        <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
            <ChoiceGroup
                disabled={ optionsEntry.onLoading }            
                {...this.ConfigProperties}              
                // These props cannot be overridden
                options={ optionsEntry.data }                    
                placeholder={ optionsEntry.waitText }
                ref={(input) => this.innerControl = input }      
                id={ this.props.inputKey }
                onChange={ this._onChange }
                label=""
                selectedKey={ this.state.currentValue }
            />
            { this.state.currentError && Rendering.renderError(this.state.currentError) }
        </InnerControl>);
    }

    /**
     * Stores the state of the checkbox to the state.
     * @param ev The Check event 
     * @param option the selected option of the choice group
     */
    @autobind
    private _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        this.setValue(option ? option.key : undefined, true);
    }

    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate 
     */
    private _validateChoiceGroupProps(props?: IChoiceGroupProps): void {
        this.validateProps(props);
        if (props) {
        if (props.selectedKey !== null && props.selectedKey !== undefined) {
            console.warn(`FormChoiceGroup: 'selectedKey' prop was specified and will be ignored`);
        }
    }
  }
}
