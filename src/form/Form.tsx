import 'core-js/es6/map';
import 'core-js/es6/set';
import * as React from 'react';
import { ObjectFabric } from '../objects/ObjectFabric';
import { Helper } from '../Helper';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { initializeIcons } from '@uifabric/icons';
import { JFormData } from '../objects/JFormData';
import { FontClassNames } from '@uifabric/styling';
import * as PropTypes from 'prop-types';
import { autobind, BaseComponent, getNativeProps, divProperties } from 'office-ui-fabric-react/lib/Utilities';
import '../styles/main.css';
import { IFormState, IFormProps, IFormContext, IFormValidationResult, ControlBoundEvent } from './Form.types';
import { TranslatedProperty, ValidatorTypes } from '../Enums';
import { GenericFormInput } from '../formBaseInput/FormBaseInput';
import { Control } from '../objects/Control';
import { Row } from '../objects/Row';
import { addLocaleData } from 'react-intl';
import 'babel-polyfill/browser.js';
import Rendering from './Rendering';
import "reflect-metadata";
import { Container } from 'inversify';
import { IDataProviderCollection, typesForInject } from '../formBaseInput/FormBaseInput.types';

global.Intl = require('intl');
let frLocaleData = require('react-intl/locale-data/fr');
let deLocaleData = require('react-intl/locale-data/de');
let enLocaleData = require('react-intl/locale-data/en');
let esLocaleData = require('react-intl/locale-data/es');
let itLocaleData = require('react-intl/locale-data/id');

addLocaleData(frLocaleData);
addLocaleData(deLocaleData);
addLocaleData(enLocaleData);
addLocaleData(itLocaleData);
addLocaleData(esLocaleData);
initializeIcons();

export var FormLanguage = "";

/**
 * The Interface for the dependency injection
 */
export interface IGenericForm<T extends JFormData> extends BaseComponent<IFormProps<T>, IFormState> {
}

/**
 * The main Form Control that renders the Control Tree
 */
export abstract class GenericForm<T extends JFormData> extends BaseComponent<IFormProps<T>, IFormState> implements IGenericForm<T> {

  /**
   * This is needed because React 15's context does not work well with typescript
   */
  public static childContextTypes: React.ValidationMap<IFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired
  };

  /** The Form Rendering Engine. */
  private _rendering:Rendering;

  /** The Converted jsonFormData as Object Model to render it. */
  public formData:T;

  /** All registered inputs the form is aware of */
  private _mountedInputs: GenericFormInput[];

  /** All registered inputs for an event of value changes */
  private _controlEvents: ControlBoundEvent[];

  /** Flag which marks whether or not the form has attempted to have been submitted */
  private _pristine: boolean;

  /** The data store container for injection. */
  private _container: Container;

  /** 
   * Load the correct langauge, UI Fabric theme and the rendering engine.
   */
  constructor(props: IFormProps<T>) {
    super(props);
    if (this.props.Language) {
      FormLanguage = this.props.Language;
    }
    this._rendering = new Rendering(() => ObjectFabric.getJsonFromForm<T>(this.formData),  
      props.customControls, 
      props.customValidators, 
      props.customActions,  
      props.dataBinders,
      props.formInputs,
      props.onCancelForm);
    this.formData = ObjectFabric.getForm(props.jsonFormData, props.formType ? props.formType : JFormData);

    this._mountedInputs = [];
    this._controlEvents = [];
    this._pristine = true;
    this.state = {
      validationResults: {}
    };

    this._container = props.container;

    if (this.formData.Theme) {
      loadTheme({
        palette: {
          'themePrimary': this.formData.Theme
         }
      });
    }
  }

  /** 
   * Call the formDidMount event and take over the mounted controls
   */  
  componentDidMount() {
    for(let eventControl of this._controlEvents) {
      let input = this._mountedInputs.find(c => c.props.inputKey == eventControl.senderControlKey);
      this._sendValutToControls(eventControl, input);
    }
    if (this.props.formDidMount) {
      this.props.formDidMount(this._mountedInputs);
    }
  }

  public render(): JSX.Element {
    let nativeProps = getNativeProps(this.props, divProperties);
    return (
      <form {...nativeProps} onSubmit={ this._onSubmit } key={this.formData.ID } >
      <div className="Form" key={this.formData.ID + "div1" }>
        { TranslatedProperty.Title && (
          <header className={ [
              "Form-header",
              FontClassNames.medium ].join(' ') } key={this.formData.ID + "heder" }>
            <h1 key={this.formData.ID + "h1" } >{ Helper.getTranslatedProperty(TranslatedProperty.Title, this.formData) }</h1>
          </header>
        ) }                
        <div className='Form-content' key={this.formData.ID + "Container" }>
          { this._rendering.buildRowWlements(this.formData.ID + "/R", this.formData.Rows) }
        </div>
      </div>
    </form>
    );
  }

  /**
   * Get the context for child components to use
   */
  public getChildContext(): IFormContext {
    return {
      isFormValid: this._isFormValid,
      mountInput: this._mountInput,
      unmountInput: this._unmountInput,
      submitValue: this._submitValue,
      formData: this.formData,
      container: this._container
    };
  }
    
  /**
   * Finde with the full control id the Control in the tree.
   * @param inputKey The full control id to finde the corresponding control
   */
  private _findeControlFromKey(inputKey:string): Control {
      let control:Control | undefined;
      let controlStruct = inputKey.split(".");

      if (this.formData.Rows)
        control = this._findeControlInRow(this.formData.Rows, controlStruct, 1);
      return control;
  }

  /**
   * Validate an individual input and set its error state
   * Returns the validation result
   * @param input The input to validate
   * @param showValidation Set to true if the error message shoul be set
   */
  private _validateComponent(input: GenericFormInput, showValidation?: boolean): IFormValidationResult {    
    if (!input.doValidate && input.props.validators) {
      let control:Control | undefined = this._findeControlFromKey(input.props.inputKey);
      if (control && control.FormValidators.find(v => v.ValidatorType == ValidatorTypes.Required)) {
        return {
          isValid: false,
          component: input,
        }
      }
    }
    else if (input.doValidate) {
      let validationResult = input.doValidate();
      if (showValidation && !validationResult.isValid)
        input.setError(validationResult.errorMessage);
      else if (!validationResult.isValid && (this.props.showErrorsWhenPristine || !this._pristine)) {
        input.setError(validationResult.errorMessage);
      } else {
        input.clearError();
      }
      return validationResult;      
    }
    return {
        isValid: true,
        component: input,
    }
  }

  /**
   * Validate all the individual inputs and set their error state
   * Returns a list of the validation results
   */
  private _validateForm(): { [key: string]: IFormValidationResult } {
    let validationResults: { [key: string]: IFormValidationResult } = {};
    this._mountedInputs.forEach((input: GenericFormInput) => {
      validationResults[input.props.inputKey] = this._validateComponent(input);
    });

    this.setState((prevState: IFormState) => {
      prevState.validationResults = validationResults;
      return prevState;
    });

    return validationResults;
  }

  /**
   * When the form is submitted. This will validate the form and call the appropriate submit callback
   * @param event The form event
   */
  @autobind
  private _onSubmit(event: React.FormEvent<HTMLElement>): void {
    event.preventDefault();
    if (this._pristine) {
      this._pristine = false;
    }

    let validationResults = this._validateForm();
    let formIsValid: boolean = this._isFormValid(validationResults);

    let jsonData = ObjectFabric.getJsonFromForm<T>(this.formData);
    if (formIsValid && this.props.onSubmitForm) {
      this.props.onSubmitForm(jsonData);
    } else if (this.props.onInvalidSubmitForm) {
      this.props.onInvalidSubmitForm(jsonData)
    }
  }

  /**
   * Find the Control with the ID in the tree of controls
   * @param rows Row Array 
   * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
   * @param level The level in where to search in the contrlStruct.
   */
  private _findeControlInRow(rows:Row[], controlStruct:string[], level:number): Control | undefined {
    for(let row of rows) {
      for(let col of row.Columns) {
        let control = this._findeControlInControls(col.Controls, controlStruct, level);
        if (control) return control;
      }
    }
    return undefined;
  }

  /**
   * Find the Control with the ID in the tree of controls
   * @param controls Control Array 
   * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
   * @param level The level in where to search in the contrlStruct.
   */
  private _findeControlInControls(controls:Control[], controlStruct:string[], level:number): Control | undefined {
    let id = Helper.cleanUpKey(controlStruct[level]);
    let control = controls.find(c => c.ID == id);
    if (controlStruct.length-1 != level)
      if (control && control.SubRows)
        control = this._findeControlInRow(control.SubRows, controlStruct, level + 1);
      else if (control && control.SubControls)
        control =  this._findeControlInControls(control.SubControls, controlStruct, level + 1);
    return control;
  }

  /**
   * Register an input with the form
   * @param input The input to register
   */ 
  @autobind
  private _mountInput(input: GenericFormInput): void {
    let foundControl = this._mountedInputs.find(g => g.props.inputKey == input.props.inputKey);
    if (foundControl == undefined) {
      if (!input.doValidate)
        this._mountedInputs.push(input);

      this.setState((prevState: IFormState) => {
        prevState.validationResults[input.props.inputKey] = this._validateComponent(input);
        return prevState;
      });
    }
    else if (input.doValidate && !foundControl.doValidate) {
      this._unmountInput(foundControl);
      this._mountInput(input)
    } 
    let control:Control  = input.props.control;
    this._registerEvents(input, control.DataProviderDefaultValueConfigKey);
    this._registerEvents(input, control.DataProviderValueConfigKey);
    for(let listProviderKey of control.DataProviderConfigKeys) {
      this._registerEvents(input, listProviderKey);
    }
  }

  /**
   * Register if available the event on the control defined between squer brackets
   * @param input The input that has rais an update
   * @param key The key with square brackets
   */ 
  private _registerEvents(input: GenericFormInput, key?: string): void {
    if (key) {
      let controlKey = Helper.getControlKeyFromConfigKey(key);
      if (controlKey) {
        this._registerEventInControlEvents(controlKey, input);
      }
      else if (!controlKey) {
        this._registerEventInControlEvents(input.props.inputKey, input);
      }
      else
        throw "Control definitions are maximal one allowed per key definition: " + key
    }
  }

  /**
   * Register the input in the controlEvents
   * @param controlKey The key from the control to register
   * @param input The input that has to register.
   */ 
  private _registerEventInControlEvents(controlKey:string, input: GenericFormInput) {
    let eventType = this._controlEvents.find(c => c.senderControlKey == controlKey);
    let index = -1;
    if (eventType == undefined) {
      index = this._controlEvents.push({
        senderControlKey: controlKey,
        receiverControl: [] 
      }) - 1
    }
    else {
      index = this._controlEvents.indexOf(eventType);
    }
    this._controlEvents[index].receiverControl.push(input);
  }

  /**
   * Set the validation result, if Valid the control Value and if defined call the onUpdated Method
   * @param input The input that has rais an update
   * @param validate True if the input should validated.
   */ 
  @autobind
  private _submitValue(input: GenericFormInput, validate?: boolean): void {
    let validationResult: IFormValidationResult = this._validateComponent(input, validate);
    this.setState((prevState: IFormState) => {
      prevState.validationResults[input.props.inputKey] = validationResult;
      return prevState;
    });

    console.log("sender:" + input.props.inputKey + ":" + validationResult.isValid);

    if (validationResult.isValid) {
      let control:Control | undefined = this._findeControlFromKey(input.props.inputKey);
      if (control) {
          control.Value = input.state.currentValue;
      }
      let eventControl = this._controlEvents.find(c => c.senderControlKey == input.props.inputKey);
      if (eventControl) {
        this._sendValutToControls(eventControl, input);
      }
      if (this.props.onUpdated) {
        this.props.onUpdated(input.props.inputKey, input.state.currentValue);
      }
    }
  }

    /** 
     * Sed the senderControl Infos to the Receiver at the bound Control
     * @param eventControl The EventControl to get the receiver from
     * @param senderControl The sending controll
    */
  private _sendValutToControls(eventControl:ControlBoundEvent, senderControl:GenericFormInput) {
    for(let receiverControl of eventControl.receiverControl) {
      if (!senderControl || receiverControl.props.inputKey == senderControl.props.inputKey)
        this._sendValutToControl(receiverControl, undefined)
      else
        this._sendValutToControl(receiverControl, senderControl)
    }
  }

  /**
   * Send the value to an given control. If need convert it with the provider key to another value
   * @param input The input that has rais an update
   * @param value The value to be send 
   */   
  private _sendValutToControl(receiverControl: GenericFormInput, senderControl: GenericFormInput): void {
    for (let providerKey of receiverControl.props.control.DataProviderConfigKeys) {
      let result = Helper.getControlKeyFromConfigKey(providerKey)
      if (result && senderControl) {
        receiverControl.setState({ currentFilter: senderControl.state.currentValue })
      }
    }
    this._getValueFromProvider(receiverControl, senderControl, receiverControl.props.control.DataProviderValueConfigKey).then(valutToUse => {
      if (valutToUse && receiverControl.props.control.DataProviderValueConfigKey) {
        receiverControl.setValue(valutToUse, true);
      }
      if (receiverControl.props.control.DataProviderDefaultValueConfigKey && this.props.isNewForm && !receiverControl.state.currentValue) {
        this._getValueFromProvider(receiverControl, senderControl, receiverControl.props.control.DataProviderDefaultValueConfigKey).then(defaultValutToUse => {
          if (defaultValutToUse)
            receiverControl.setValue(defaultValutToUse, true);
        });
      }
    })
  }

  /**
   * Get the value from a defined provider or default value.
   * @param input The input that has rais an update
   * @param value The value to be used when nothing others devined
   * @param keyToResolve The Key to resolve with the provider
   */   
  private _getValueFromProvider(receiverControl: GenericFormInput, senderControl: GenericFormInput, keyToResolve:string): Promise<any> {
    return new Promise<any[]>((resolve, reject)  => {
      if ((!keyToResolve || keyToResolve =="") && senderControl) {
        resolve(senderControl.state.currentValue);
        return;
      }
      if ((!keyToResolve || keyToResolve =="") && !senderControl) {
        resolve(undefined);
        return;
      }

      let controlKey = Helper.getControlKeyFromConfigKey(keyToResolve);
      keyToResolve = keyToResolve.replace(controlKey, controlKey.replace(".", "/"));
      let keyParts:string[] = keyToResolve.split(".");

      if (keyToResolve.startsWith("[") && keyParts.length == 1 && senderControl) {
        resolve(senderControl.state.currentValue);
        return;
      }
  
      if (keyToResolve.startsWith("[") && senderControl && senderControl.state.currentValue) {
        let objectToUse = senderControl.state.currentValue[keyParts[1]];
        if (keyParts.length > 2) {
          for(let i = 2; i < keyParts.length; i++) {
            if (objectToUse != undefined) {
              objectToUse = objectToUse[keyParts[i]];
            }
          }
        }
        resolve(objectToUse);
        return;
      }
      else {
        let providerKey:string = keyParts[0];
        let dataProviders = this._container.get<IDataProviderCollection>(typesForInject.IDataProviderCollection);
        if (dataProviders == undefined)
          throw "No DataProviders defined"
        let provider = dataProviders.providers.find(p => p.providerServiceKey == providerKey);
        if (provider == undefined)
          throw "DataProvider with key " + providerKey + " not found";
        let providerConfigKey = Helper.getConfigKeyFromProviderKey(keyToResolve);
        let sender = senderControl ? senderControl.props.control : undefined;
        provider.retrieveSingleData(providerConfigKey, sender, receiverControl.props.control, Helper.getLanguage()).then(value => {
          resolve(value);
        })
      }
    });
  }

  /**
   * Unregister an input with the form
   * @param input The input to unregister
   */
  @autobind
  private _unmountInput(input: GenericFormInput): void {
    let currentIndex: number = this._mountedInputs.indexOf(input);
    if (currentIndex > -1) {
      this._mountedInputs.splice(currentIndex, 1);
      this.setState((prevState: IFormState) => {
        delete prevState.validationResults[input.props.inputKey];
        return prevState;
      });
    }
  }

  /**
   * Check if the form is valid. If all validations are ok then reutrn true.
   * @param validationResults All validation results from the control tree. 
   */
  @autobind
  private _isFormValid(validationResults: { [key: string]: IFormValidationResult } = this.state.validationResults): boolean {
    for (let key in validationResults) {
      if (!validationResults[key].isValid) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Type alias for any simple form input
 */
export class Form extends GenericForm<JFormData> {
  /** 
   * Load basic form
   */
  constructor(props: IFormProps<JFormData>) {
    super(props);
  }
}