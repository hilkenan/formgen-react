import * as React from 'react';
import { Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { IPivotProps, IPivotItemProps, PivotItem } from 'office-ui-fabric-react/lib/components/Pivot';
import { FormBaseInput, IFormBaseInputProps, GenericFormInput } from '../../formBaseInput/FormBaseInput';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { IFormContext } from '../../form/Form.types';
import { Helper } from '../../Helper';
import { TranslatedProperty } from '../../Enums';
import { Tab } from './Tab';

/**
 * Container Control for the Tabs (Pivot)
 */
export class TabContainer extends FormBaseInput<IPivotProps, IFormBaseInputProps, IFormBaseInputState> {
    private contextTab: IFormContext;
    constructor(props: IFormBaseInputProps, context: IFormContext) {
        super(props, context, false /* Leading edge debounce */);
        this.state = {
          isValid: true,
          currentValue: this.props.control.Value || '',
          currentError: undefined
        };
        this.contextTab = context;
        this.validateProps(this.ConfigProperties);
    }
    
    public componentDidMount(): void {
        if (this.props.children) {
            for(let node of this.props.children as PivotItem[]) {
                this.findeComponents(node.props.children);
            }
        }
    }
    private findeComponents(children: React.ReactNode) {
        if (children) {
            for(let gen of children as GenericFormInput[]) {
                if (gen && gen.props.inputKey) {
                    this.contextTab.mountInput(gen);
                }
            }
            for(let comp of children as React.Component[]) {
                this.findeComponents(comp.props.children);
            }
        }
    }
    
    /**
    * Get the Pivot Items that are generated as Child objects
    */ 
    private getPivotItems():JSX.Element[] {
        let pivots:JSX.Element[] = [];
        if (this.props.children) {
            for(let tab of this.props.children as Array<Tab>){
                let pivotProbs:IPivotItemProps = {};
                if (tab.props.control.Config)
                    pivotProbs = tab.props.control.Config as IPivotItemProps;
                pivotProbs = Helper.getTranslatedObject(pivotProbs, tab.props.control.ConfigTranslation);
                if (!pivotProbs.linkText)
                    pivotProbs.linkText = Helper.getTranslatedProperty(TranslatedProperty.Title,tab.props.control)
                pivots.push(<PivotItem key={ tab.props.inputKey } {...pivotProbs} >{ tab.props.children }</PivotItem>);
            }
        }
        return pivots;
    }

    render() {
        return (<Pivot {...this.ConfigProperties}
                    key={ Helper.cleanUpKey(this.props.inputKey) }
                    ref={(input) => this.innerControl = input }>
                    { this.getPivotItems() }
                </Pivot>);
    }
}