import * as React from 'react';
import { Callout, Icon, Link, DirectionalHint } from 'office-ui-fabric-react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import '../../styles/FormInfoCallout.css';
import { ColorClassNames } from '@uifabric/styling';
import { IInfoCalloutProps, IInfoCalloutState } from './InfoCallout.types';

/**
 * Class for the Info Callout (icon with mouse over info)
  */
export class InfoCallout extends React.Component<IInfoCalloutProps, IInfoCalloutState> {
    private infoCalloutElement: HTMLElement | null;
    
    constructor(props: IInfoCalloutProps) {
        super(props);

        this.state = {
           IsInfoVisible: false
        };
    }        
    
  render() {
    return (
    <div style={ this.props.MarginTop ? { marginTop: this.props.MarginTop } : undefined } 
        className={ ColorClassNames.themePrimary + ' ms-Grid-col ms-sm0 ms-textAlignLeft infoIconSmall' } 
        ref={(icon) => this.infoCalloutElement=icon } >
        <Icon iconName="Info" onMouseOver={ this.onShowInfoClicked }  />
    { this.state.IsInfoVisible && (
        <Callout
            key={ this.props.Key }
            directionalHint={ DirectionalHint.topAutoEdge }
            className='ms-InfoCalloutForm-callout'
            target={ this.infoCalloutElement }
            onDismiss={this.onCalloutDismiss }
            gapSpace={ 0 }
            beakWidth={ 20 }
            isBeakVisible={ true }>
            <div className='ms-InfoCalloutForm-header'>
                <p className='ms-InfoCalloutForm-title'>
                    { this.props.HeaderText }
                </p>
            </div>
            <div className='ms-InfoCalloutForm-inner'>
                <div className='ms-InfoCalloutForm-content'>
                    <p className='ms-InfoCalloutForm-subText'>
                        { this.props.children }
                    </p>
                </div>
                { this.props.ActionLink && (
                <div className='ms-InfoCalloutForm-actions'>
                    <Link className='ms-InfoCalloutForm-link' href={this.props.ActionLink.Link}>{ this.props.ActionLink.Text }</Link>
                </div>                
                ) }
            </div>
        </Callout>
        ) }
    </div>)
    }

    /**
    * Hide Info visibility
    */    
    @autobind
    private onCalloutDismiss() {
      this.setState({
        IsInfoVisible: false
      });
    }
  
    /**
    * Swtich Info visibility
    */    
    @autobind
    private onShowInfoClicked() {
      this.setState({
        IsInfoVisible: !this.state.IsInfoVisible
      });
    }    
}

export default InfoCallout