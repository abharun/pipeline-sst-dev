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
    const healthCheck = new sst.aws.Function("HealthCheck", {
      url: true,
      handler: "src/health.handler",
    });

    return {
      HealthCheckUrl: healthCheck.url,
    };
  },
});
