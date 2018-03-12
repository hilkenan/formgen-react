import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
export interface ISubmitButtonProps extends IBaseProps {
    /** Props for the fabric button */
    buttonProps?: IButtonProps;
    /** Input Key Value */
    inputKey?: string;
}
