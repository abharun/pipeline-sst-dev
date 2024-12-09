/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-health-check-ts",
      home: "aws",
    };
  },
  async run() {
    const healthCheck = new sst.aws.Function("HealthCheck", {
      url: true,
      handler: "src/lambda.handler",
    });

    return {
      HealthCheckUrl: healthCheck.url,
    };
  },
});
