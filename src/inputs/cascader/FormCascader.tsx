import * as React from 'react';
import 'rc-cascader/assets/index.css';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { autobind } from '@uifabric/utilities';
import { CascadingOption } from './FormCascader.types';
import { InnerControl } from "../../controls/innerControl/InnerControl";
import { TextField } from "office-ui-fabric-react/lib";
import { Helper } from '../../Helper';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
var Cascader = require('rc-cascader/lib/Cascader')

/**
 * Cascading Dropdown input for Form
 */
export class FormCascader extends FormBaseInput<any, IFormBaseInputProps, IFormBaseInputState> {
    private optionsDataStore = this.props.inputKey + "_options"
    constructor(props: IFormBaseInputProps, context: IFormContext) {
        super(props, context);
        this.state = {
            isValid: true,
            currentValue: this.props.control.Value || '',
            currentError: undefined,
        };
        this.validateProps(this.ConfigProperties);
    }

    /**
     * Render a Cascading Drop Down from rs-cascader
     */
    public render(): JSX.Element {
        let optionsEntry = this.state.dataStores.find(e => e.key == this.optionsDataStore);
        let placeHolder = Helper.getPlaceHolderText(optionsEntry, this.ConfigProperties.placeHolder);
        
        return (       
        <InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
            <Cascader
            popupClassName="cascaderPopupClassName"
            onChange={ this._onChange } 
            ref={(input) => this.innerControl = input }        
            {...this.ConfigProperties } 
            options={ optionsEntry.data }                    
            id={ this.props.inputKey }>
          <TextField
            key={ this.props.inputKey }
            name={ this.props.inputKey }
            placeholder={ placeHolder }
            disabled={ optionsEntry.onLoading }
            errorMessage= { this.getErrorMessage() }
            readOnly={true}
            label=""
            value={ this._getLabels(this.state.currentValue) }
          />
        </Cascader>
      </InnerControl>);             
    }

    /**
     * Store the selected Value as JSON in the form state.
     */
    @autobind
    private _onChange(value:string, selectedOptions:CascadingOption[]): void {
        this.setValue(selectedOptions);
    }

    /**
     * Get the correct Label Value set.
     */
    private _getLabels(options:CascadingOption[]) {
        if (!options) return undefined;
        return options.map(o => o.label).join(', ');            
    }
}
