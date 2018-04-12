import { DropzoneProps } from "react-dropzone";
/**
 * The File Upload properties
 */
export interface IFormFileUploadProps extends DropzoneProps {
    DropZoneText?: string;
    DropedFilesText?: string;
    ShowFiles?: boolean;
}
