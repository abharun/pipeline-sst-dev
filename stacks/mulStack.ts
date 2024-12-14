export async function Multiplier(apiGW: sst.aws.ApiGatewayV2) {
    const mulNumbers = new sst.aws.Function("MultipleNumbers", {
        handler: "core/multiple/mul.handler",
    });

    const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
        handler: "core/multiple/mulapi.handler",
        environment: {
            MUL_NUMBER_NAME: mulNumbers.name,
        },
        permissions: [{
            actions: ["lambda:InvokeFunction"],
            resources: [mulNumbers.arn],
        }]
    });

    apiGW.route("POST /calc/mul", mulNumberApi.arn);

    return {
        url: apiGW.url
    };
}