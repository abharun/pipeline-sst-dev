export const mulNumbers = new sst.aws.Function("MultipleNumbers", {
    handler: "core/calculer/mul/mul.handler",
});

export const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
    handler: "core/calculer/mul/api.handler",
    environment: {
        MUL_NUMBER_NAME: mulNumbers.name,
    },
    permissions: [{
        actions: ["lambda:InvokeFunction"],
        resources: [mulNumbers.arn],
    }]
});