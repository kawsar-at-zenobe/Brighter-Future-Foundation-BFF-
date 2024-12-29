import { StackContextProps } from './context-config.interface';
import { ZENOBE_ENVIRONMENT } from '@zenobeenergy/cdk-tags';

export const TestConfig: StackContextProps = {
  deployStage: 'test',
  environment: ZENOBE_ENVIRONMENT.TEST,
  vpcName: 'bms_npn_vpc',
};
