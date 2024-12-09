import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handle different HTTP methods
  switch (event.requestContext.http.method) {
    case "GET":
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "healthy" }),
      };
    
    case "POST":
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "created" }),
      };
    
    default:
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
  }
};