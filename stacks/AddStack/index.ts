export async function Calculator() {
    const addNumbers = new sst.aws.Function("AddNumbers", {
        handler: "src/add.handler",
    });

    const calculateApi = new sst.aws.Function("AddNumbersApi", {
        url: true,
        handler: "src/addapi.handler",
        environment: {
            ADD_FUNCTION_NAME: addNumbers.name,
        },
        permissions: [{
            actions: ["lambda:InvokeFunction"],
            resources: [addNumbers.arn],
        }],
    });

    return {
        url: calculateApi.url
    };
}