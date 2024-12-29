import { App } from 'aws-cdk-lib';
import {
  DATA_CLASSIFICATION,
  DATA_CLASSIFICATION_VERSION,
  Team,
  ZenobeTagManager,
} from '@zenobeenergy/cdk-tags';
import { MyServiceStack } from '../lib/my-service-stack';
import { ContextProps, StackContext } from '../config';

const app: App = new App();

const configContext = process.env.DEPLOY_STAGE as string;

const contextProps: ContextProps = {
  namespace: '<my-service-name>',
  ...StackContext(configContext),
};

const version = process.env.CI_COMMIT_SHORT_SHA ?? 'local';

const tags = {
  businessUnit: Team.SOFTWARE_ENGINEERING,
  maintainer: Team.SOFTWARE_ENGINEERING,
  product: '<my-service-name>',
  productShortCode: '<MSN>',
  source: 'https://github.com/ZenobeEnergy/<my-service-name>',
  environment: contextProps.environment,
  version,
  dataClassification: DATA_CLASSIFICATION.INTERNAL,
  dataClassificationPolicyVersion:
    DATA_CLASSIFICATION_VERSION.Z00_IS_POL_1_DRAFT_A,
};

const stack = new MyServiceStack(
  app,
  '<my-service-name>',
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
    stackName: `<my-service-name>-${contextProps.deployStage}`,
  },
  contextProps
);

ZenobeTagManager.tagResource(stack, tags);
