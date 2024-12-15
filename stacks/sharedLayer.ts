import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class SharedLayerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const sharedLayer = new lambda.LayerVersion(this, "shared-layer", {
            code: lambda.Code.fromAsset("shared/node.js"),
            compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
            description: "Shared layer for lambda functions",
        });

        new cdk.CfnOutput(this, "SharedLayerArn", {
            value: sharedLayer.layerVersionArn,
            description: "The ARN of the shared lambda layer.",
            exportName: "SharedLayerArn",
        });
    }
}
