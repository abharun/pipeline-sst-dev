/// <reference path="./.sst/platform/config.d.ts" />

import { AdditionStack } from "./stacks/addStack";
import { MultiplierStack } from "./stacks/mulStack";

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
    });

    new AdditionStack(this, "addStack", { api });
    new AdditionStack(this, "mulStack", { api });

    return {
      domain: "test.bminted.io"
    };
  },
});