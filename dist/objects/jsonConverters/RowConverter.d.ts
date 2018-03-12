import { JsonCustomConvert } from "json2typescript";
import { Row } from "../Row";
/**
* Json Converter for a Row
*/
export declare class RowConverter implements JsonCustomConvert<Row[]> {
    serialize(rows: Row[]): any;
    deserialize(rowsJson: any): Row[];
}
