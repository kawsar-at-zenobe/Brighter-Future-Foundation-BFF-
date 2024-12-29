import { ZENOBE_ENVIRONMENT } from '@zenobeenergy/cdk-tags';

export interface StackContextProps {
  readonly deployStage: string;
  readonly environment: ZENOBE_ENVIRONMENT;

  readonly vpcName: string;
}

export interface ContextProps extends StackContextProps {
  readonly namespace: string;
}

export interface StackContextMap {
  [ConfigurationContext: string]: StackContextProps;
}
