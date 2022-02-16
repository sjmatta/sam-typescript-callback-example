"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const aws_sdk_1 = require("aws-sdk");
const lambdaHandler = async () => {
    const stateMachineArn = process.env.WORKFLOW_ARN;
    const params = { stateMachineArn };
    await new aws_sdk_1.StepFunctions().startExecution(params).promise();
    return {
        statusCode: 200,
        body: ``
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=trigger.js.map