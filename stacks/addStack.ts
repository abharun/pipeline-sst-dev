import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface AdditionStackProps extends cdk.StackProps {
    api: sst.aws.ApiGatewayV2,
}

export class AdditionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: AdditionStackProps) {
        super(scope, id, props);

        const { api } = props;

        const addNumbers = new sst.aws.Function("AddNumbers", {
            handler: "core/addition/add.handler",
            nodejs: {}
        });

        const addNumberApi = new sst.aws.Function("AddNumbersApi", {
            handler: "core/addition/addapi.handler",
            environment: {
                ADD_FUNCTION_NAME: addNumbers.name,
            },
            permissions: [{
                actions: ["lambda:InvokeFunction"],
                resources: [addNumbers.arn],
            }],
        });

        api.route("POST /calc/add", addNumberApi.arn);

        new cdk.CfnOutput(this, "AdditionApiUrl", {
            value: api.url.toString(),
            description: "The URL of the additioner api",
        });
    }
}
