import { ObjectTranslate } from './ObjectTranslate';
import { Row } from './Row';
import { ControlTypes, LabelPositions } from '../Enums';
import { Translate } from './jsonConverters/TransConverter';
import Rendering from '../form/Rendering';
import { FormValidator } from './FormValidator';
import { ActionLink } from "./ActionLink";
/**
 * Data Class for the Control
 */
export declare class Control {
    /**
     * Get the Control element ans JSX Element back includes all needed configs
     * @param rendering Rendering Engine with the types that can be used.
     * @param rootKey The Key for the control (root) like form.firstControl.secondControl
     * @param labelWith The Css Number from UI Fabric for the with 1-12
     */
    getControlElement(rendering: Rendering, rootKey: string, labelWith?: number): JSX.Element;
    /**
     * Get the validator that are configured back, includes the required validator if defined.
     * @param rendering Rendering Engine with the types that can be used.
     */
    private _getConfiguredValidators(rendering);
    ID: string;
    Title?: string;
    Info?: string;
    Value?: any;
    ReadOnly: boolean;
    TitleTranslates?: Translate[];
    RequiredMessageTranslates?: Translate[];
    ConfigTranslation?: ObjectTranslate;
    InfoTranslates?: Translate[];
    InfoAction?: ActionLink;
    SubRows?: Row[];
    SubControls?: Control[];
    SubControlLabwlWith?: number;
    Config?: any;
    RenderType: ControlTypes;
    CustomTypeName?: string;
    LabelPosition: LabelPositions;
    CssClass?: string;
    DataBinders: string[];
    Styles?: any;
    FormValidators: FormValidator[];
}
