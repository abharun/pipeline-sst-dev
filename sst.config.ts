/// <reference path="./.sst/platform/config.d.ts" />

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
    // First Lambda: Addition function
    const addNumbers = new sst.aws.Function("AddNumbers", {
      handler: "src/calc.handler",
    });

    const calculateApi = new sst.aws.Function("CalculateApi", {
      url: true,
      handler: "src/calcapi.handler",
      environment: {
        ADD_FUNCTION_NAME: addNumbers.name,
      },
      permissions: [{
        actions: ["lambda:InvokeFunction"],
        resources: [addNumbers.arn],
      }], 
    });

    return {
      CalculateApiUrl: calculateApi.url,
    };
  },
});
