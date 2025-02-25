import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface MultiplierStackProps extends cdk.StackProps {
    api: sst.aws.ApiGatewayV2,
}

export class MultiplierStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: MultiplierStackProps) {
        super(scope, id, props);

        const { api } = props;

        const mulNumbers = new sst.aws.Function("MultipleNumbers", {
            handler: "core/mul/index.handler",
        });
    
        const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
            handler: "core/mulapi/index.handler",
            environment: {
                MUL_NUMBER_NAME: mulNumbers.name,
            },
            permissions: [{
                actions: ["lambda:InvokeFunction"],
                resources: [mulNumbers.arn],
            }],
        });

        api.route("POST /calc/mul", mulNumberApi.arn);
    }
}
