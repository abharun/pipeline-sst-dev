const { Lambda, InvokeCommand } = require('@aws-sdk/client-lambda');

const lambda = new Lambda({});

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        console.log("Payload:", body);

        const response = await lambda.send(new InvokeCommand({
            FunctionName: process.env.MUL_NUMBER_NAME,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(body),
        }));

        const result = JSON.parse(new TextDecoder().decode(response.Payload));

        return {
            statusCode: 200,
            body: JSON.stringify({
                result: result,
                name: process.env.MUL_NUMBER_NAME,
            }),
        };
    } catch (error) {
        console.log("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', detail: String(error) }),
        };
    }
}