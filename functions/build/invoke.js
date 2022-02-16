"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const saveTaskToken = (tableName, correlationId, taskToken) => new aws_sdk_1.DynamoDB().putItem({
    TableName: tableName,
    Item: {
        correlationId: { S: correlationId },
        taskToken: { S: taskToken },
        expirationTime: { N: Math.floor(new Date().getTime() / 1000).toString() },
    },
}).promise();
const invokeLambdaFunction = (lambdaFunction, correlationId) => new aws_sdk_1.Lambda().invoke({
    FunctionName: lambdaFunction,
    InvocationType: 'Event',
    Payload: JSON.stringify({ correlationId }),
}).promise();
// eslint-disable-next-line import/prefer-default-export
const lambdaHandler = async (event) => {
    const tableName = process.env.TABLE_NAME;
    const correlationId = (0, uuid_1.v4)();
    const { taskToken } = event;
    const lambdaFunction = process.env.LAMBDA_FUNCTION;
    await saveTaskToken(tableName, correlationId, taskToken);
    await invokeLambdaFunction(lambdaFunction, correlationId);
    return {
        statusCode: 200,
        body: '',
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=invoke.js.map