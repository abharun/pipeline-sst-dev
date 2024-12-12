/// <reference path="./.sst/platform/config.d.ts" />

import { Calculator } from "./stacks/AddStack";
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
    const calculator = await Calculator();
    const multiplier = await Multiplier();

    return {
      CalculateApiUrl: calculator.url,
      MultipleApiUrl: multiplier.url,
    };
  },
});