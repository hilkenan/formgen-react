import { Row } from "./Row";
import { Translate } from "./jsonConverters/TransConverter";
/**
* FormData object for Rendering
*/
export declare class JFormData {
    ID: string;
    Title: string;
    Theme?: string;
    Message: string;
    DataProviderConfigName: string;
    MessageTranslates?: Translate[];
    TitleTranslates?: Translate[];
    Rows?: Row[];
    LabelWith?: number;
}
