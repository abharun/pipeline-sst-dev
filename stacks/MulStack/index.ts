export async function Multiplier() {
    const mulNumbers = new sst.aws.Function("MultipleNumbers", {
        handler: "stacks/MulStack/src/mul.handler",
    });

    const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
        url: true,
        handler: "stacks/MulStack/src/mulapi.handler",
        environment: {
            MUL_NUMBER_NAME: mulNumbers.name,
        },
        permissions: [{
            actions: ["lambda:InvokeFunction"],
            resources: [mulNumbers.arn],
        }]
    });

    return {
        url: mulNumberApi.url
    };
}