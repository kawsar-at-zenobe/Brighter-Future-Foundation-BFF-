import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';
import { MyServiceStack } from '../lib/my-service-stack';
import { ZENOBE_ENVIRONMENT } from '@zenobeenergy/cdk-tags';
import { IVpc, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

describe('MyServiceStack', () => {
  beforeEach(() => {
    jest
      .spyOn(Vpc, 'fromLookup')
      .mockImplementation((scope: Construct, vpcId: string): IVpc => {
        const vpc = new Vpc(scope, vpcId);
        Object.defineProperty(vpc, 'vpcId', { value: vpcId });
        return vpc;
      });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a Fargate Service', () => {
    const app: App = new App();
    // WHEN
    const stack: MyServiceStack = new MyServiceStack(
      app,
      'MyTestStack',
      {},
      {
        vpcName: 'testVpc',
        environment: ZENOBE_ENVIRONMENT.TEST,
        deployStage: 'test',
        namespace: 'test',
      }
    );

    // THEN
    const template: Template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ECS::Cluster', {
      ClusterName: '<my-service-name>-test',
    });

    template.hasResourceProperties('AWS::ECS::TaskDefinition', {
      Cpu: '1024',
      Memory: '2048',
      ContainerDefinitions: [
        {
          LogConfiguration: {
            LogDriver: 'awslogs',
            Options: {
              'awslogs-stream-prefix': '<my-service-name>',
            },
          },
          Environment: [
            {
              Name: 'DEPLOY_STAGE',
              Value: 'test',
            },
          ],
        },
      ],
    });

    template.hasResourceProperties('AWS::ECS::Service', {
      DesiredCount: 1,
      LaunchType: 'FARGATE',
      ServiceName: '<my-service-name>-test',
      DeploymentConfiguration: {
        DeploymentCircuitBreaker: {
          Enable: true,
          Rollback: true,
        },
      },
    });

    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'my-service-name-test',
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: { Service: 'ecs-tasks.amazonaws.com' },
          },
        ],
      },
      Policies: [
        {
          PolicyName: 'taskRole',
          PolicyDocument: {
            Statement: [
              {
                Action: 'ecs:action',
                Effect: 'Allow',
                Resource: 'resource',
              },
            ],
          },
        },
      ],
    });
  });
});
