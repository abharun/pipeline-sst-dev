import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface HealthCheckStackProps extends cdk.StackProps {
    api: sst.aws.ApiGatewayV2,
}

export class HealthCheckStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: HealthCheckStackProps) {
        super(scope, id, props);

        const { api } = props;

        const healthCheckApi = new sst.aws.Function("HealthCheckApi", {
            handler: "core/health.handler",
        });

        api.route("GET /", healthCheckApi.arn);
    }
}
