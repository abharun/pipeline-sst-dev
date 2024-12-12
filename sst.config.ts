/// <reference path="./.sst/platform/config.d.ts" />

import { Additioner } from "./stacks/AddStack";
import { Multiplier } from "./stacks/MulStack";

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

    const additioner = await Additioner(api);
    const multiplier = await Multiplier(api);

    return {
      AdditionerApiUrl: additioner.url,
      MultipleApiUrl: multiplier.url,
    };
  },
});