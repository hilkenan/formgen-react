import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IFormBaseInputProps } from '../../formBaseInput/FormBaseInput';
export { IButtonProps };
export interface ICustomButtonProps extends IBaseProps {
    /** Props for the fabric button */
    buttonProps?: IButtonProps;
    /** Input Key Value */
    inputKey?: string;
}
export interface ICustomButtonInputProps extends IFormBaseInputProps {
    /** Click event */
    onClick(): void;
}
