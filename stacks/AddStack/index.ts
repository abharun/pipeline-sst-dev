import { join } from "path";

export async function Additioner() {
    const addNumbers = new sst.aws.Function("AddNumbers", {
        handler: "stacks/AddStack/src/add.handler",
        nodejs: {}
    });

    const calculateApi = new sst.aws.Function("AddNumbersApi", {
        url: true,
        handler: "stacks/AddStack/src/addapi.handler",
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