import { DirectionalHint } from "office-ui-fabric-react";
import { ActionLink } from "../../objects/ActionLink";
/**
 * Interface fo the Info Callout States
 */
export interface IInfoCalloutState {
    IsInfoVisible: boolean;
}
/**
 * Interface fo the Info Callout Props
 */
export interface IInfoCalloutProps {
    Key: string;
    HeaderText?: string;
    ActionLink?: ActionLink;
    DirectionalHint?: DirectionalHint;
    SmallIcon?: boolean;
    UseAsCell?: boolean;
    MarginTop?: number;
}
