import * as core from '@aws-cdk/core'
import * as ecs from '@aws-cdk/aws-ecs'
import { AwsLogDriverMode, LogDriver } from '@aws-cdk/aws-ecs'
import * as ecr from '@aws-cdk/aws-ecr'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as iam from '@aws-cdk/aws-iam'
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns'

export class CdkStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props?: core.StackProps) {
    super(scope, id, props)

    const ecrRepository = new ecr.Repository(this, 'ecs-emve-repository', { repositoryName: 'ecs-emve-repository' })

    // Create the ECS Cluster (and VPC)
    const vpc = new ec2.Vpc(this, 'ecs-emve-vpc', { maxAzs: 3 })
    const cluster = new ecs.Cluster(this, 'ecs-emve-cluster', {
      clusterName: 'ecs-emve-cluster',
      vpc: vpc
    })

    // Create the ECS Task Definition with placeholder containerEmveBackend (and named Task Execution IAM Role)
    const executionRole = new iam.Role(this, 'ecs-emve-execution-role', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      roleName: 'ecs-emve-execution-role'
    })
    executionRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: ['*'],
        actions: [
          'ecr:GetAuthorizationToken',
          'ecr:BatchCheckLayerAvailability',
          'ecr:GetDownloadUrlForLayer',
          'ecr:BatchGetImage',
          'logs:CreateLogStream',
          'logs:PutLogEvents'
        ]
      })
    )
    const loggingEmveBackend = new ecs.AwsLogDriver({ streamPrefix: 'emve-backend' })

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'ecs-emve-lb-fargate-service',
      {
        cluster,
        memoryLimitMiB: 1024,
        cpu: 512,
        publicLoadBalancer: true,
        serviceName: 'ecs-emve-service',
        taskImageOptions: {
          containerName: 'ecs-emve',
          image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
          containerPort: 5000,
          enableLogging: true,
          logDriver: loggingEmveBackend,
          executionRole: executionRole
        }
      }
    )

    // loadBalancedFargateService.targetGroup.configureHealthCheck({
    //     path: "/custom-health-path",
    // });
  }
}
