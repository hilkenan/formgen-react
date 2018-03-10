import {JsonCustomConvert, JsonConverter} from "json2typescript";
import { ObjectFabric } from "../ObjectFabric";
import { Row } from "../Row";

/**
* Json Converter for a Row
*/ 
@JsonConverter
export class RowConverter implements JsonCustomConvert<Row[]> {
    serialize(rows: Row[]): any {
        let rowsJson:any[] = [];
        for(let row of rows)
            rowsJson.push(ObjectFabric.getJsonFromRow(row));
        return rowsJson;
    }
    deserialize(rowsJson: any): Row[] {
        let rows:Row[] = [];

        for(let rowJson of rowsJson)
            rows.push(ObjectFabric.getRow(rowJson));
        return rows;
    }
}
