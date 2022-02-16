"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const aws_sdk_1 = require("aws-sdk");
// eslint-disable-next-line import/prefer-default-export
const lambdaHandler = async (event) => {
    await Promise.all(event.Records.map((record) => {
        const { correlationId } = JSON.parse(JSON.parse(record.body).Message);
        return new aws_sdk_1.DynamoDB().getItem({
            TableName: process.env.TABLE_NAME,
            Key: { correlationId: { S: correlationId } },
        }).promise().then((result) => {
            console.log(result);
            return new aws_sdk_1.StepFunctions().sendTaskSuccess({
                taskToken: result.Item.taskToken.S,
                output: '{}',
            }).promise();
        });
    }));
    return {
        statusCode: 200,
        body: '',
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=callback.js.map