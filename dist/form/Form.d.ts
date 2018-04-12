/// <reference types="react" />
import 'core-js/es6/map';
import 'core-js/es6/set';
import * as React from 'react';
import { JFormData } from '../objects/JFormData';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import '../styles/main.css';
import { IFormState, IFormProps, IFormContext } from './Form.types';
import 'babel-polyfill/browser.js';
import "reflect-metadata";
export declare var FormLanguage: string;
/**
 * The Interface for the dependency injection
 */
export interface IGenericForm<T extends JFormData> extends BaseComponent<IFormProps<T>, IFormState> {
}
/**
 * The main Form Control that renders the Control Tree
 */
export declare abstract class GenericForm<T extends JFormData> extends BaseComponent<IFormProps<T>, IFormState> implements IGenericForm<T> {
    /**
     * This is needed because React 15's context does not work well with typescript
     */
    static childContextTypes: React.ValidationMap<IFormContext>;
    /** The Form Rendering Engine. */
    private _rendering;
    /** The Converted jsonFormData as Object Model to render it. */
    formData: T;
    /** All registered inputs the form is aware of */
    private _mountedInputs;
    /** All registered inputs for an event of value changes */
    private _controlEvents;
    /** Flag which marks whether or not the form has attempted to have been submitted */
    private _pristine;
    /** The data store container for injection. */
    private _container;
    /**
     * Load the correct langauge, UI Fabric theme and the rendering engine.
     */
    constructor(props: IFormProps<T>);
    /**
     * Call the formDidMount event and take over the mounted controls
     */
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * Get the context for child components to use
     */
    getChildContext(): IFormContext;
    /**
     * Finde with the full control id the Control in the tree.
     * @param inputKey The full control id to finde the corresponding control
     */
    private _findeControlFromKey(inputKey);
    /**
     * Validate an individual input and set its error state
     * Returns the validation result
     * @param input The input to validate
     * @param showValidation Set to true if the error message shoul be set
     */
    private _validateComponent(input, showValidation?);
    /**
     * Validate all the individual inputs and set their error state
     * Returns a list of the validation results
     */
    private _validateForm();
    /**
     * When the form is submitted. This will validate the form and call the appropriate submit callback
     * @param event The form event
     */
    private _onSubmit(event);
    /**
     * Find the Control with the ID in the tree of controls
     * @param rows Row Array
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    private _findeControlInRow(rows, controlStruct, level);
    /**
     * Find the Control with the ID in the tree of controls
     * @param controls Control Array
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    private _findeControlInControls(controls, controlStruct, level);
    /**
     * Register an input with the form
     * @param input The input to register
     */
    private _mountInput(input);
    /**
     * Register if available the event on the control defined between squer brackets
     * @param input The input that has rais an update
     * @param key The key with square brackets
     */
    private _registerEvents(input, key?);
    /**
     * Register the input in the controlEvents
     * @param controlKey The key from the control to register
     * @param input The input that has to register.
     */
    private _registerEventInControlEvents(controlKey, input);
    /**
     * Set the validation result, if Valid the control Value and if defined call the onUpdated Method
     * @param input The input that has rais an update
     * @param validate True if the input should validated.
     * @param skipSendValue True if the sendValutToControls should to be used (avoid recalling the event)
     */
    private _submitValue(input, validate?, skipSendValue?);
    /**
     * Sed the senderControl Infos to the Receiver at the bound Control
     * @param eventControl The EventControl to get the receiver from
     * @param senderControl The sending controll
     * @param loadInitials If true then load also the controls that receiver and sender are the same control
    */
    private _sendValutToControls(eventControl, senderControl, loadInitials?);
    /**
     * Send the value to an given control. If need convert it with the provider key to another value
     * @param input The input that has rais an update
     * @param value The value to be send
     */
    private _sendValutToControl(receiverControl, senderControl);
    /**
     * Get the value from a defined provider or default value.
     * @param input The input that has rais an update
     * @param value The value to be used when nothing others devined
     * @param keyToResolve The Key to resolve with the provider
     */
    private _getValueFromProvider(receiverControl, senderControl, keyToResolve);
    /**
     * Unregister an input with the form
     * @param input The input to unregister
     */
    private _unmountInput(input);
    /**
     * Check if the form is valid. If all validations are ok then reutrn true.
     * @param validationResults All validation results from the control tree.
     */
    private _isFormValid(validationResults?);
}
/**
 * Type alias for any simple form input
 */
export declare class Form extends GenericForm<JFormData> {
    /**
     * Load basic form
     */
    constructor(props: IFormProps<JFormData>);
}
