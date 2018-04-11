import * as React from 'react';
import { FormBaseInput, IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
import { IFormContext } from '../../form/Form.types';
import Dropzone, { DropzoneProps } from 'react-dropzone'
import { autobind } from '@uifabric/utilities';
import { InnerControl } from '../../controls/innerControl/InnerControl';
import { IFormFileUploadProps } from './FormFileUpload.types';
import { IFormBaseInputState } from '../../formBaseInput/FormBaseInput.types';
import { Helper } from '../../Helper';
import { LocalsCommon } from '../../locales/LocalsCommon';
import Rendering from '../../form/Rendering';

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
export class FormFileUpload extends FormBaseInput<IFormFileUploadProps, IFormBaseInputProps, IFormBaseInputState> {
  private bytes = "";

  constructor(props: IFormBaseInputProps, context: IFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.control.Value || [],
      currentError: undefined
    };
    this._validateDropZoneProps(this.ConfigProperties);
    let commonFormater = Helper.getTranslator("common");
    this.bytes = commonFormater.formatMessage(LocalsCommon.bytes);
  }

  /**
   * Remove the file from the store
   * @param fileName the File Name to remove
   */
  @autobind
  private onRemove(fileName:string) {
    if (this.dataProviderService == undefined)
      throw "Provider must be specified for upload files"
    if (this.props.control.DataProviderConfigKeys.length != 1)
      throw "Only one Data Provider is allowed for file management"
    
    let providerConfigKey = Helper.getConfigKeyFromProviderKey(this.props.control.DataProviderConfigKeys[0]);
    this.dataProviderService.removeFile(providerConfigKey, this.props.control, fileName);
    let usedFiles = this.state.currentValue as IFileObject[];
    let index = usedFiles.findIndex(f => f.fileName == fileName);
    usedFiles.splice(index,1);
    this.setValue(usedFiles, true);
  }

  /**
   * Add the (accepted) files to the store.
   * @param acceptedFiles All accepted files.
   */
  @autobind
  private onDrop(acceptedFiles) {
    if (this.dataProviderService == undefined)
      throw "Provider must be specified for upload files"
    if (this.props.control.DataProviderConfigKeys.length != 1)
      throw "Only one Data Provider is allowed for file management"
    if (this.dataProviderService.addFile == undefined)
      throw "The Provider does not suppoort adding files."
      
    let providerConfigKey = Helper.getConfigKeyFromProviderKey(this.props.control.DataProviderConfigKeys[0]);

    let storedFiles = this.state.currentValue as IFileObject[];
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
          const fileAsBinaryString = reader.result;
          const fileName = file.name;
          let storedPath = this.dataProviderService.addFile(providerConfigKey, this.props.control, fileName, fileAsBinaryString);
          storedFiles.push({
            fileName: fileName,
            fileSize: file.size,
            storedPath: storedPath,
            preview: file.preview
            });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsBinaryString(file);
    });
    this.setValue(storedFiles, true);
  }  

  /**
  * Render a Fabric TextBox
  */
  public render(): JSX.Element {
    let files = this.state.currentValue as IFileObject[];
    return (<InnerControl BaseControl={ this } LabelWith={ this.props.labelWith } >
      <section>
        <div className="dropzone">
          <Dropzone 
            {...this.ConfigProperties}      
            onDrop={ this.onDrop }>
            <p>{ this.ConfigProperties.DropZoneText } </p>
          </Dropzone>
        </div>
        { this.ConfigProperties.ShowFiles && (
          <aside>
          <h2>{ this.ConfigProperties.DropedFilesText } </h2>
          <div className="md-Grid">
          {
              files.map(f => this._onRenderCell(f))
          }
          </div>
        </aside>
        )}
      </section>
      { this.state.currentError && Rendering.renderError(this.state.currentError) }
    </InnerControl>);
  }

  
  /**
   * Render a row of the grid.
   */
  private _onRenderCell(item: IFileObject): JSX.Element {
    return (
      <div className="ms-Grid-row">
      { !this.ConfigProperties.disablePreview && (
        <div className="ms-Grid-col ms-sm0">
          <img src={item.preview} style={{ width:30, height:30 }} /> 
        </div>
      )}
      <div className="ms-Grid-col ms-sm3">
        <a target="_blank" href={ item.storedPath }>{item.fileName}</a>
      </div>
      <div className="ms-Grid-col ms-sm2">
        {item.fileSize} { this.bytes }       
      </div>      
      { this.dataProviderService.removeFile && (
        <div className="ms-Grid-col ms-sm0">
          <a className="ms-Icon ms-Icon--Delete" aria-hidden="true" onClick={ () => this.onRemove(item.fileName) } ></a>
        </div>
      )}
      </div>
    );
  }

  /**
   * Validate the properties from the config. warn at console
   * @param props The property object to validate 
   */  
  private _validateDropZoneProps(props?: DropzoneProps): void {
    this.validateProps(props);
    if (props) {
      if (props.onDrop) {
        console.warn(`FormFileUpload: 'onDrop' prop was specified and will be ignored`);
      }
    }
  }
}
