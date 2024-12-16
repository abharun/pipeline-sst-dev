/// <reference path="./.sst/platform/config.d.ts" />

import { AdditionStack } from "./stacks/addStack";
import { MultiplierStack } from "./stacks/mulStack";
import { SharedLayerStack } from "./stacks/sharedLayer";
import { HealthCheckStack } from "./stacks/healthStack";

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

    new HealthCheckStack(this, "healthStack", { api });

    new SharedLayerStack(this, "shareLayerStack");

    new AdditionStack(this, "addStack", { api });
    new MultiplierStack(this, "mulStack", { api });

    return {
      domain: api.url
    };
  },
});