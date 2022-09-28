import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'aws-cdk-nestjs-layer', {
      layerVersionName: '1',
      code: lambda.Code.fromAsset('../dependencies'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    const api = new apigateway.RestApi(this, 'aws-cdk-nestjs-api', {
      restApiName: 'AWS CDK + NestJS API',
    });

    const lambdaHandler = new lambda.Function(this, 'AwsCdkNestjsHelloWorld', {
      functionName: 'aws-cdk-nestjs-hello-world',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('../dist'),
      handler: 'main.handler',
      timeout: cdk.Duration.seconds(60),
    });

    lambdaHandler.addLayers(layer);

    const apiIntegration = new apigateway.LambdaIntegration(lambdaHandler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    api.root.addMethod('GET', apiIntegration);
  }
}
