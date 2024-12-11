import { Lambda, InvokeCommand } from '@aws-sdk/client-lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';

const lambda = new Lambda({});

export async function handler(event: APIGatewayProxyEvent) {
    try {
        console.log("Received event:", JSON.stringify(event, null, 2));

        const body = JSON.parse(event.body ?? '{}');
        const { num1, num2 } = body;

        console.log("Sending eveng:", Buffer.from(JSON.stringify({ num1, num2 })));
        
        const payload = JSON.stringify({ num1, num2 });
        console.log("Sending event:", Buffer.from(payload));

        const response = await lambda.send(new InvokeCommand({
            FunctionName: process.env.ADD_FUNCTION_NAME!,
            InvocationType: 'RequestResponse',
            Payload: Buffer.from(payload),
        }));

        const result = JSON.parse(new TextDecoder().decode(response.Payload));

        return {
            statusCode: 200,
            body: JSON.stringify({
                result: result,
                name: process.env.ADD_FUNCTION_NAME,
            }),
        };
    } catch (error) {
        console.error('Error:', error); // Add logging for debugging
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', detail: String(error) }),
        };
    }
}