import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsService } from './ecs-service';
import { ContextProps } from '../config';

export class MyServiceStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    context: ContextProps
  ) {
    super(scope, id, props);

    new EcsService(this, '<my-service-name>', context);
  }
}
