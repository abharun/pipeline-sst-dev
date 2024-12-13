import { addNumbers, addNumberApi } from "./addFunc";
import { mulNumbers, mulNumberApi } from "./mulFunc";

export async function CalcStack(apiGW: sst.aws.ApiGatewayV2) {
    apiGW.route("POST /calc/add", addNumberApi.arn);
    apiGW.route("POST /calc/add", mulNumberApi.arn);

    return {
        url: apiGW.url,
    }
}