import { ObjectFabric } from "./ObjectFabric";
import { JFormData } from "./JFormData";
import { Helper } from "../Helper";
import { TranslatedProperty } from "../Enums";
import { Control } from "./Control";
import { Row } from "./Row";


export class TemplateHelper {
    public static getTemplatedTitle(formDataJson: any) : string {
        let formData = ObjectFabric.getForm<JFormData>(formDataJson, JFormData) as JFormData;
        if (formData.Message) {
            let title = Helper.getTranslatedProperty(TranslatedProperty.Message, formData);
            let result = title.match("\\[(.*)]");
            if (result) {
                for(let key of result) {
                    let control = TemplateHelper.findeControlFromKey(formData, key);
                    if (control) {
                        title = Helper.replaceAll(title, "[" + key + "]", control.Value);
                    }
                    else {
                        title = Helper.replaceAll(title, "[" + key + "]", "");                        
                    }
                }
            }
            return title;
        }
        return undefined;
    }
    
  /**
   * Finde with the full control id the Control in the tree.
   * @param inputKey The full control id to finde the corresponding control
   */
    private static findeControlFromKey(formData: JFormData, inputKey:string): Control {
        let control:Control | undefined;
        let controlStruct = inputKey.split(".");

        if (formData.Rows)
        control = TemplateHelper.findeControlInRow(formData.Rows, controlStruct, 1);
        return control;
    }

    /**
     * Find the Control with the ID in the tree of controls
     * @param rows Row Array 
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    private static findeControlInRow(rows:Row[], controlStruct:string[], level:number): Control | undefined {
        for(let row of rows) {
            for(let col of row.Columns) {
                let control = TemplateHelper.findeControlInControls(col.Controls, controlStruct, level);
                if (control) return control;
            }
        }
        return undefined;
    }

    /**
     * Find the Control with the ID in the tree of controls
     * @param controls Control Array 
     * @param controlStruct ID Structure. the Element 0 is the id from the form an will not be used
     * @param level The level in where to search in the contrlStruct.
     */
    private static findeControlInControls(controls:Control[], controlStruct:string[], level:number): Control | undefined {
        let id = Helper.cleanUpKey(controlStruct[level]);
        let control = controls.find(c => c.ID == id);
        if (controlStruct.length-1 != level)
        if (control && control.SubRows)
            control = TemplateHelper.findeControlInRow(control.SubRows, controlStruct, level + 1);
        else if (control && control.SubControls)
            control =  TemplateHelper.findeControlInControls(control.SubControls, controlStruct, level + 1);
        return control;
    } 
}