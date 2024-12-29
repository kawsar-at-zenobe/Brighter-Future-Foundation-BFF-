import { Construct } from 'constructs';
import {
  Cluster,
  Compatibility,
  ContainerImage,
  FargateService,
  LogDriver,
  OperatingSystemFamily,
  TaskDefinition,
} from 'aws-cdk-lib/aws-ecs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import {
  DockerImageAsset,
  NetworkMode,
  Platform,
} from 'aws-cdk-lib/aws-ecr-assets';
import { ContextProps } from '../config';
import * as process from 'process';
import {
  Effect,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';

export class EcsService extends Construct {
  constructor(scope: Construct, id: string, context: ContextProps) {
    super(scope, id);

    const vpc = Vpc.fromLookup(this, 'vpc', {
      vpcName: context.vpcName,
    });

    const cluster = new Cluster(this, 'EcsCluster', {
      clusterName: `<my-service-name>-${context.deployStage}`,
      vpc,
    });

    const taskRole = new Role(this, 'TaskRole', {
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
      roleName: `my-service-name-${context.deployStage}`,
      inlinePolicies: {
        taskRole: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: ['ecs:action'],
              effect: Effect.ALLOW,
              resources: ['resource'],
            }),
          ],
        }),
      },
    });

    const taskDefinition = new TaskDefinition(this, 'TaskDefinition', {
      compatibility: Compatibility.FARGATE,
      cpu: '1024',
      memoryMiB: '2048',
      runtimePlatform: {
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
      taskRole,
    });

    taskDefinition.addContainer('FargateServiceContainer', {
      image: ContainerImage.fromDockerImageAsset(
        new DockerImageAsset(this, 'DockerImage', {
          directory: '',
          file: './Dockerfile',
          platform: Platform.LINUX_AMD64,
          networkMode: NetworkMode.HOST,
          buildArgs: {
            NODE_AUTH_TOKEN: process.env.GITHUB_TOKEN as string,
          },
        })
      ),
      logging: LogDriver.awsLogs({
        streamPrefix: '<my-service-name>',
      }),
      environment: {
        DEPLOY_STAGE: context.deployStage,
      },
    });

    new FargateService(this, 'FargateService', {
      cluster,
      taskDefinition,
      serviceName: `<my-service-name>-${context.deployStage}`,
      desiredCount: 1,
      circuitBreaker: {
        enable: true,
        rollback: true,
      },
    });
  }
}
