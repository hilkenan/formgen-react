import * as React from 'react';
import { CSSProperties } from 'react';
import { Helper } from '../Helper';
import { DynamicControl } from '../objects/DynamicControl.types';
import { Control } from '../objects/Control';
import { Column } from '../objects/Column';
import { Row } from '../objects/Row';
import { Icon, css } from 'office-ui-fabric-react';
import { DataBinder } from '../objects/DataBinder.types';
import { CustomValidator } from '../objects/CustomValidator.types';
import { CustomActions } from '../objects/CustomActions.types';
import { FormInputs } from './FormInputs';

/**
 * Rendering Engine for the Form
 */  
class Rendering {

    /**
     * Initialize all arrays with the params and load the control mapping.
     */  
    constructor(getCurrentFormData:() => any, 
        customControls?: DynamicControl[], 
        customValidators?: CustomValidator[], 
        customActions?: CustomActions[], 
        dataBinders?: DataBinder[],
        formInputs?: FormInputs,
        cancelEvent?:() => void) {
        
        this.controls = formInputs ? formInputs.getStandartControls() : (new FormInputs).getStandartControls();
        if (customControls)
            this.controls.push(...customControls)
        if (customValidators)
            this.customValidators = customValidators;
        if (cancelEvent)
            this.cancelEvent = cancelEvent;
        if (customActions)
            this.customActions = customActions;
        if (dataBinders)
            this.dataBinders = dataBinders;
            
        this.getCurrentFormData = getCurrentFormData;
    }
        
    public cancelEvent?(): void;

    private getCurrentFormData:() => any;

    public controls: DynamicControl[] = [];
    
    public customValidators: CustomValidator[] = [];
    
    public customActions: CustomActions[] = [];
    
    public dataBinders: DataBinder[] = [];

    /**
    * Call the Custom Action Event with the Form Data
    * @param customAction Custom Action to call with the form data.
    */      
    public callCustomEvent(customAction?:CustomActions) {
        if (customAction)
            customAction.actionType(this.getCurrentFormData());
    }

    /**
    * Build the Controls rendered control
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param controls The Control definition to load the control types with.
    * @param labelWith Defined Label with form the parent column
    */      
    public buildControlElements(rootKey: string, controls?: Control[], labelWith?: number) : JSX.Element[] {
        let ctrlElements:JSX.Element[] = [];
        if (!controls) return ctrlElements;
        for(let ctrl of controls) {
            ctrlElements.push(ctrl.getControlElement(this, rootKey, labelWith));
        }
        return ctrlElements;
    }

    /**
    * Build the Column Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param columns The columns definition to load
    */  
    private buildColElements(rootKey: string, columns: Column[]) : JSX.Element[] {
        let colElements:JSX.Element[] = [];
        let cssNr = Helper.calculateCssClassColNb(columns.length);
        let counter = 0;     
        for(let col of columns) {
            let className:string = col.CssClass ? col.CssClass : "";
            colElements.push(
                <div key={ rootKey + "col" + counter } style={ col.Styles ? col.Styles as CSSProperties : undefined } className={ "colElements ms-sm" + cssNr + " " + className }>
                    { this.buildControlElements(rootKey, col.Controls, col.LabelWith) }
                </div>);
            counter++;
        }
        return colElements;
    }

    /**
    * Build the Rows Controls as Divs with all Sub elements
    * @param rootKey The root id (form id + . + all control ids in the tree)
    * @param rows The rows to load to the tree 
    */  
    public buildRowWlements(rootKey: string, rows?: Row[]) : JSX.Element[] {
        let rowElements:JSX.Element[] = [];
        if (!rows) return rowElements;   
        let counter = 0;     
        for(let row of rows) {
            rowElements.push(<div key={ rootKey + "row" + counter } className='rowElements'>{ this.buildColElements(rootKey, row.Columns) }</div>);
            counter++;
        }
        return rowElements;
    }
    
    /**
    * Renders an Error div.
    * @param errorMessage The Error Message to show in the div.
    */      
    public static renderError(errorMessage:string): JSX.Element {
        return (
          <div className={ css('forminputError') }>
            <Icon iconName='Error' />
            { errorMessage }
          </div>
        );
    }
} 

export default Rendering;