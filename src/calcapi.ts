import { Lambda, InvokeCommand } from '@aws-sdk/client-lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';

const lambda = new Lambda({});

export async function handler(event: APIGatewayProxyEvent) {
    try {
        const body = JSON.parse(event.body ?? '{}');

        const response = await lambda.send(new InvokeCommand({
            FunctionName: process.env.ADD_FUNCTION_NAME!,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(body),
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', detail: String(error) }),
        };
    }
}