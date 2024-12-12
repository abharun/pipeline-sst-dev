export async function Multiplier() {
    const mulNumbers = new sst.aws.Function("MultipleNumbers", {
        handler: "src/mul.handler",
    });

    const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
        url: true,
        handler: "src/mulapi.handler",
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