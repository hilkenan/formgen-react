import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import { IFormFileUploadProps } from './FormFileUpload.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
/**
 * The File Info for uploaded files.
 */
export interface IFileObject {
    fileName: string;
    fileSize: number;
    storedPath: string;
    preview: any;
}
/**
 * File upload drag & drop control
 */
export declare class FormFileUpload extends FormBaseInput<IFormFileUploadProps, IFormBaseInputProps, IFormBaseInputState> {
    private bytes;
    constructor(props: IFormBaseInputProps, context: IFormContext);
    /**
     * Remove the file from the store
     * @param fileName the File Name to remove
     */
    private onRemove(fileName);
    /**
     * Add the (accepted) files to the store.
     * @param acceptedFiles All accepted files.
     */
    private onDrop(acceptedFiles);
    /**
    * Render a Fabric TextBox
    */
    render(): JSX.Element;
    /**
     * Render a row of the grid.
     */
    private _onRenderCell(item);
    /**
     * Validate the properties from the config. warn at console
     * @param props The property object to validate
     */
    private _validateDropZoneProps(props?);
}
