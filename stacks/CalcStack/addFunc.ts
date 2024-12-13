export const addNumbers = new sst.aws.Function("AddNumbers", {
    handler: "core/calculer/add/add.handler",
    nodejs: {}
});

export const addNumberApi = new sst.aws.Function("AddNumbersApi", {
    handler: "core/calculer/add/api.handler",
    environment: {
        ADD_FUNCTION_NAME: addNumbers.name,
    },
    permissions: [{
        actions: ["lambda:InvokeFunction"],
        resources: [addNumbers.arn],
    }],
});