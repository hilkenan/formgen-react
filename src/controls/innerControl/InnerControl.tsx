import * as React from 'react';
import { Label } from 'office-ui-fabric-react';
import { CSSProperties } from 'react';
import { IInnerControl } from './InnerControl.types';
import { LabelPositions } from '../../Enums';
import { InfoCallout } from '../callout/InfoCallout';

/**
* Inner Control. Use show the correct inner part of an control
*/ 
export class InnerControl extends React.Component<IInnerControl> {
    render() {
        let additionalClassName:string = this.props.BaseControl.ControlClassName;
        let styles = this.props.BaseControl.props.control.Styles ? this.props.BaseControl.props.control.Styles as CSSProperties : undefined;

        let hasInfo = this.props.BaseControl.props.control.Info != undefined;
        let labelCss = "";
        let contrCss = "";
        let infoCss = "";
        if (this.props.LabelWith && !this.props.ControlWith) {
            let controlNb = 12 - this.props.LabelWith + (hasInfo ? -1 : 0)
            labelCss = "ms-sm" + this.props.LabelWith;
            contrCss = "ms-sm" + controlNb;
            infoCss = "ms-sm1";
        }
        else if (this.props.LabelWith && this.props.ControlWith) {
            let infoNb = 12 - this.props.LabelWith - this.props.ControlWith;
            labelCss = "ms-sm" + this.props.LabelWith;
            contrCss = "ms-sm" +  this.props.ControlWith;
            infoCss = "ms-sm" + infoNb;
        }
        else if (!this.props.LabelWith && this.props.ControlWith) {
            let infoNb = 12 - 3 - this.props.ControlWith;
            labelCss = "ms-sm3";
            contrCss = "ms-sm" +  this.props.ControlWith;
            infoCss = "ms-sm" + infoNb;
        }        
        else {
            let controlNb = 9 + (hasInfo ? -1 : 0)
            labelCss = "ms-sm3";
            contrCss = "ms-sm" + controlNb;            
            infoCss = "ms-sm1";
        }

        if (!this.props.BaseControl.props.control.Title && !this.props.BaseControl.props.control.Info ) {
            return (
                <div className={ additionalClassName } style={ styles } >
                { this.props.children }
                </div>)
        }
        else{
            switch(this.props.BaseControl.props.control.LabelPosition) {
                default:
                    return(
                    <div className={ "ms-Grid " +  additionalClassName } style={ styles } >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <Label required={ this.props.BaseControl.IsRequired }>{ this.props.BaseControl.TranslatedTitle }</Label>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm11">
                            { this.props.children }
                            </div>
                            { hasInfo && (
                            <div className="ms-Grid-col ms-sm1">
                                <InfoCallout 
                                    Key={ this.props.BaseControl.props.control.ID + "Info" }      
                                    HeaderText={ this.props.BaseControl.TranslatedTitle } >
                                    { this.props.BaseControl.TranslatedInfo }
                                </InfoCallout>
                            </div>
                            ) }   
                        </div>
                    </div>);
                case LabelPositions.Right:
                    return(
                    <div className={ "ms-Grid " +  additionalClassName } style={ styles } >
                        <div className="ms-Grid-row">
                            <div className={ "ms-Grid-col " + contrCss }>
                            { this.props.children }
                            </div>
                            <div className={ "ms-Grid-col " + labelCss }>
                                <Label required={ this.props.BaseControl.IsRequired }>{ this.props.BaseControl.TranslatedTitle }</Label>
                            </div>
                            { hasInfo && (
                            <div className={ "ms-Grid-col " + infoCss}>
                                <InfoCallout 
                                    Key={ this.props.BaseControl.props.control.ID + "Info" }      
                                    HeaderText={ this.props.BaseControl.TranslatedTitle } >
                                    { this.props.BaseControl.TranslatedInfo }
                                </InfoCallout>
                            </div>
                            ) }                               
                        </div>
                    </div>);
                case LabelPositions.Left:
                    return( 
                    <div className={ "ms-Grid " +  additionalClassName } style={ styles } >
                        <div className="ms-Grid-row">
                        <div className={ "ms-Grid-col " + labelCss }>
                                <Label required={ this.props.BaseControl.IsRequired }>{ this.props.BaseControl.TranslatedTitle }</Label>
                            </div>                        
                            <div className={ "ms-Grid-col " + contrCss }>
                            { this.props.children }
                            </div>
                            { hasInfo && (
                            <div className={ "ms-Grid-col " + infoCss}>
                                <InfoCallout 
                                    ActionLink={ this.props.BaseControl.props.control.InfoAction }
                                    Key={ this.props.BaseControl.props.control.ID + "Info" }      
                                    HeaderText={ this.props.BaseControl.TranslatedTitle } >
                                    { this.props.BaseControl.TranslatedInfo }
                                </InfoCallout>
                            </div>
                            ) }                               
                        </div>
                    </div>);
            }
        }
    }
}