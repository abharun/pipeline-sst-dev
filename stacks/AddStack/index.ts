export async function Additioner(api: sst.aws.ApiGatewayV2) {
    const addNumbers = new sst.aws.Function("AddNumbers", {
        handler: "stacks/AddStack/src/add.handler",
        nodejs: {}
    });

    const addNumberApi = new sst.aws.Function("AddNumbersApi", {
        handler: "stacks/AddStack/src/addapi.handler",
        environment: {
            ADD_FUNCTION_NAME: addNumbers.name,
        },
        permissions: [{
            actions: ["lambda:InvokeFunction"],
            resources: [addNumbers.arn],
        }],
    });

    api.route("POST /calc/add", addNumberApi.arn);

    return {
        url: api.url
    };
}