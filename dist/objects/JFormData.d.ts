import { Row } from "./Row";
import { Translate } from "./jsonConverters/TransConverter";
/**
* FormData object for Rendering
*/
export declare class JFormData {
    ID: string;
    Title: string;
    Theme?: string;
    TitleTranslates?: Translate[];
    Rows?: Row[];
    LabelWith?: number;
}
