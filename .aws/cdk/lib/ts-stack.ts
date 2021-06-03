import * as core from '@aws-cdk/core'
import * as ecs from '@aws-cdk/aws-ecs'
import * as ecr from '@aws-cdk/aws-ecr'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as iam from '@aws-cdk/aws-iam'

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

    // Create the ECS Task Definition with placeholder container (and named Task Execution IAM Role)
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
    const task_definition = new ecs.FargateTaskDefinition(this, 'ecs-emve-task-definition', {
      executionRole: executionRole,
      family: 'ecs-emve-task-definition'
    })

    const container = task_definition.addContainer('ecs-emve', {
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample')
    })

    // Create the ECS Service
    const service = new ecs.FargateService(this, 'ecs-emve-service', {
      cluster: cluster,
      taskDefinition: task_definition,
      serviceName: 'ecs-emve-service'
    })
  }
}
