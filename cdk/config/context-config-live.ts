import { StackContextProps } from './context-config.interface';
import { ZENOBE_ENVIRONMENT } from '@zenobeenergy/cdk-tags';

export const LiveConfig: StackContextProps = {
  deployStage: 'live',
  environment: ZENOBE_ENVIRONMENT.LIVE,
  vpcName: 'bms_prod_vpc',
};
