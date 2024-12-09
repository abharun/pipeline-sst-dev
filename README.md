# Building CI/CD pipeline with sst.dev

For provision and managing serverless architecture. there's a very useful framework - [sst.dev](https://sst.dev/docs/)

It is a JS/TS framework for provision and deploying application on AWS services. 

You can directly define Lambda functions and it's APIs in SST project and directly deploy to AWS by providing credential.

## How to use

You define lambda functions in `src/` folder and APIs in `sst.config.ts` file.

Then run `sst dev` to start local server.

You can deploy to AWS by running `sst deploy`. You can set the stage value to `dev` or `prod` to deploy to different environment.

You can remove the stack by running `sst remove`.

You can run `sst console` to open AWS console.
