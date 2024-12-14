export async function Additioner(api: sst.aws.ApiGatewayV2) {
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

    return {
        url: api.url
    };
}