/// <reference types="react" />
import * as React from 'react';
import '../../styles/FormInfoCallout.css';
import { IInfoCalloutProps, IInfoCalloutState } from './InfoCallout.types';
/**
 * Class for the Info Callout (icon with mouse over info)
 */
export declare class InfoCallout extends React.Component<IInfoCalloutProps, IInfoCalloutState> {
    private infoCalloutElement;
    constructor(props: IInfoCalloutProps);
    render(): JSX.Element;
    /**
    * Hide Info visibility
    */
    private onCalloutDismiss();
    /**
    * Swtich Info visibility
    */
    private onShowInfoClicked();
}
export default InfoCallout;
