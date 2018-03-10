import * as React from 'react';
import { JsonObject, JsonProperty, Any } from "json2typescript";
import { ObjectTranslate } from './ObjectTranslate';
import { Row } from './Row';
import { ControlConverter } from './jsonConverters/ControlConverter';
import { RowConverter } from './jsonConverters/RowConverter';
import { ControlTypeConverter } from './jsonConverters/ControlTypeConverter';
import { ControlTypes, LabelPositions, TranslatedProperty, ValidatorTypes } from '../Enums';
import { LabelPositionConverter } from './jsonConverters/LabelPositionConverter';
import { TransConverter, Translate } from './jsonConverters/TransConverter';
import Rendering from '../form/Rendering';
import { IValidator, Validators } from '../validators/Validators';
import { Helper } from '../Helper';
import { FormValidator } from './FormValidator';
import { DataBinder } from './DataBinder';
import { ActionLink } from "./ActionLink";
import { LocalsCommon } from '../locales/LocalsCommon';

/**
 * Data Class for the Control
 */
@JsonObject
export class Control {
    /**
     * Get the Control element ans JSX Element back includes all needed configs
     * @param rendering Rendering Engine with the types that can be used.
     * @param rootKey The Key for the control (root) like form.firstControl.secondControl
     * @param labelWith The Css Number from UI Fabric for the with 1-12
     */    
    public getControlElement(rendering:Rendering, rootKey: string, labelWith?: number): JSX.Element {
        let tag = this.RenderType == ControlTypes.Custom ?
            rendering.controls.find(t => t.typeName == this.CustomTypeName) : 
            rendering.controls.find(t => t.typeName == this.RenderType);

        let element:JSX.Element = (<div />);
        let key = rootKey + "." + this.ID;

        let inputKey = Helper.cleanUpKey(key);
        if (tag) {
            let TagName = tag.controlType;
            let validators = this._getConfiguredValidators(rendering);

            let usedDataBinder: DataBinder[] = [];
            for(let dataBinder of this.DataBinders) {
                let binder = rendering.dataBinders.find(b => b.typeName == inputKey + "_" + dataBinder);
                if (binder) {
                    usedDataBinder.push(binder);
                }
            }

            if (this.SubRows)
                element = <TagName labelWith={labelWith} value={ this.Value } dataBinder={ usedDataBinder }  key={ key } inputKey={ inputKey } control={ this } validators={ validators } >{ rendering.buildRowWlements(key + "/R", this.SubRows) }</TagName>
            else if (this.SubControls)
                element = <TagName labelWith={labelWith} value={ this.Value } dataBinder={ usedDataBinder } key={ key } inputKey={ inputKey } control={ this } validators={ validators }>{ rendering.buildControlElements(key + "/E", this.SubControls, this.SubControlLabwlWith) }</TagName>
            else if (this.RenderType == ControlTypes.CancelButton && rendering.cancelEvent)
                element = <TagName labelWith={labelWith} value={ this.Value } dataBinder={ usedDataBinder } onClick={ rendering.cancelEvent } key={ key } inputKey={ inputKey } control={ this } validators={ validators }/>
            else if (this.RenderType == ControlTypes.CustomButton) {
                let action = rendering.customActions.find(ca => ca.typeName == this.CustomTypeName);
                if (action)
                    element = <TagName labelWith={labelWith} value={ this.Value } dataBinder={ usedDataBinder } onClick={ () => rendering.callCustomEvent(action) } key={ key } inputKey={ inputKey } control={ this } validators={ validators }/>
            }
            else
                element = <TagName labelWith={labelWith} dataBinder={ usedDataBinder } key={ key } inputKey={ inputKey } control={ this } validators={ validators }/>
        }
        return element;
    }

    /**
     * Get the validator that are configured back, includes the required validator if defined.
     * @param rendering Rendering Engine with the types that can be used.
     */    
    private _getConfiguredValidators(rendering:Rendering): IValidator[] | undefined {
        let validators:IValidator[] = [];

        if (this.FormValidators) {
            for(let validator of this.FormValidators) {
                let message = Helper.getTranslatedMessage(TranslatedProperty.Message, validator, false);
                switch(validator.ValidatorType) {
                    case ValidatorTypes.Required:
                        if (!message && message == "") {
                            let commonFormater = Helper.getTranslator("common");
                            message = commonFormater.formatMessage(LocalsCommon.required) ;
                        }
                        validators.push(Validators.required(message));
                        break;
                    case ValidatorTypes.Integer:
                        validators.push(Validators.isInteger(message));
                        break;
                    case ValidatorTypes.Number:
                        validators.push(Validators.isNumber(message));
                        break;
                    case ValidatorTypes.MaxLength:
                        validators.push(Validators.maxLength(validator.Value, (length: number) => message));
                        break;
                    case ValidatorTypes.MinLength:
                        validators.push(Validators.maxLength(validator.Value, (length: number) => message));
                        break;
                    case ValidatorTypes.Length:
                        validators.push(Validators.length(validator.Value, (length: number) => message));
                        break;
                    case ValidatorTypes.MinValue:
                        validators.push(Validators.minValue(validator.Value, (bound: number) => message));
                        break;
                    case ValidatorTypes.MaxValue:
                        validators.push(Validators.maxValue(validator.Value, (bound: number) => message));
                        break;
                    case ValidatorTypes.Regex:
                        let pattern=new RegExp(validator.Regex)
                        validators.push(Validators.regex(pattern, message));
                        break;
                    case ValidatorTypes.Custom:
                        let customValidator = rendering.customValidators.find(v => v.typeName == validator.CustomTypeName);
                        if (customValidator)
                            validators.push(customValidator.validatorType);
                        break;
                }
            }
        }
        return (validators.length == 0) ? undefined : validators;
    }

    @JsonProperty("id", String) 
    ID: string = "";

    @JsonProperty("title", String, true) 
    Title?: string = undefined;

    @JsonProperty("info", String, true) 
    Info?: string = undefined;

    @JsonProperty("value", Any, true) 
    Value?: any = undefined;

    @JsonProperty("read_only", Boolean, true) 
    ReadOnly:boolean = false;

    @JsonProperty("title_trans", TransConverter, true)
    TitleTranslates?: Translate[] = undefined;    

    @JsonProperty("required_trans", TransConverter, true)
    RequiredMessageTranslates?: Translate[] = undefined;    
    
    @JsonProperty("config_trans", ObjectTranslate, true)
    ConfigTranslation?: ObjectTranslate = undefined

    @JsonProperty("info_trans", TransConverter, true)
    InfoTranslates?: Translate[] = undefined;    

    @JsonProperty("info_action", ActionLink, true) 
    InfoAction?: ActionLink = undefined;

    @JsonProperty("subrows", RowConverter, true) 
    SubRows?:Row[] = undefined;

    @JsonProperty("subcontrols", ControlConverter, true) 
    SubControls?:Control[] = undefined;

    @JsonProperty("subcontrol_label_with", Number, true) 
    SubControlLabwlWith?:number = undefined;
    
    @JsonProperty("config", Any, true) 
    Config?: any = undefined;

    @JsonProperty("control_type", ControlTypeConverter) 
    RenderType:ControlTypes = ControlTypes.Textbox;  

    @JsonProperty("customtype_name", String, true) 
    CustomTypeName?: string = "";

    @JsonProperty("label_position", LabelPositionConverter, true) 
    LabelPosition:LabelPositions = LabelPositions.Top;  

    @JsonProperty("css_class", String, true) 
    CssClass?: string = undefined;

    @JsonProperty("databinders", [String], true) 
    DataBinders: string[] = [];

    @JsonProperty("styles", Any, true) 
    Styles?: any = undefined;

    @JsonProperty("validators", [FormValidator], true) 
    FormValidators:FormValidator[] = [];
}
