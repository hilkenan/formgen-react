import { ISpinButtonProps } from 'office-ui-fabric-react';

export interface IFormSpinButtonProps extends ISpinButtonProps {
  /** added after the value for example Hrs for Hours. */
  sufix?: string;
}