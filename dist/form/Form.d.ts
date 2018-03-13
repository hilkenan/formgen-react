/// <reference types="react" />
import 'core-js/es6/map';
import 'core-js/es6/set';
import * as React from 'react';
import { JFormData } from '../objects/JFormData';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import '../styles/main.css';
import { IFormState, IFormProps, IFormContext } from './Form.types';
import './polyfills.js';
export declare var FormLanguage: string;
/**
 * The main Form Control that renders the Control Tree
 */
export declare class Form extends BaseComponent<IFormProps, IFormState> {
    /**
     * This is needed because React 15's context does not work well with typescript
     */
    static childContextTypes: React.ValidationMap<IFormContext>;
    /**
     * The Form Rendering Engine.
     */
    private _rendering;
    /**
     The Converted jsonFormData as Object Model to render it.
     */
    formData: JFormData;
    /**
     * All registered inputs the form is aware of
     */
    private _mountedInputs;
    /** Flag which marks whether or not the form has attempted to have been submitted */
    private _pristine;
    constructor(props: IFormProps);
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * Get the context for child components to use
     */
    getChildContext(): IFormContext;
    private _findeControlFromKey(inputKey);
    /**
     * Validate an individual input and set its error state
     * Returns the validation result
     * @param input The input to validate
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
    private _submitValue(input, validate?);
    /**
     * Unregister an input with the form
     * @param input The input to unregister
     */
    private _unmountInput(input);
    private _isFormValid(validationResults?);
}
