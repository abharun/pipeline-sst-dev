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

    const mulNumbers = new sst.aws.Function("MultipleNumbers", {
      handler: "src/mul.handler",
    });
    const mulNumberApi = new sst.aws.Function("MultipleNumberAPI", {
      url: true,
      handler: "src/mulapi.handler",
      environment: {
        MUL_NUMBER_NAME: mulNumbers.name,
      },
      permissions: [{
        actions: ["lambda:InvokeFunction"],
        resources: [mulNumbers.arn],
      }]
    })

    return {
      CalculateApiUrl: calculateApi.url,
      MultipleApiUrl: mulNumberApi.url,
    };
  },
});
