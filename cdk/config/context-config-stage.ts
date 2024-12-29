import { StackContextProps } from './context-config.interface';
import { ZENOBE_ENVIRONMENT } from '@zenobeenergy/cdk-tags';

export const StageConfig: StackContextProps = {
  deployStage: 'stage',
  environment: ZENOBE_ENVIRONMENT.STAGE,
  vpcName: 'bms_npn_vpc',
};
