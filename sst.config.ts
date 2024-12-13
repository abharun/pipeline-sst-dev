/// <reference path="./.sst/platform/config.d.ts" />

import { CalcStack } from "./stacks/CalcStack";

export default $config({
  app(input) {
    return {
      name: "sst-demo",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("TestGateway", {
      domain: {
        name: "test.bminted.io",  
      },
      cors: {
        allowOrigins: ["*"],
        allowMethods: ["*"],
      }
    })

    const calcStack = await CalcStack(api);

    return {
      CalculationApiUrl: calcStack.url,
    };
  },
});