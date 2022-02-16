"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const aws_sdk_1 = require("aws-sdk");
// eslint-disable-next-line import/prefer-default-export
const lambdaHandler = async (event) => {
    const { correlationId } = event;
    const topicArn = process.env.TOPIC_ARN;
    await new aws_sdk_1.SNS().publish({
        TopicArn: topicArn,
        Message: JSON.stringify({ correlationId }),
    }).promise();
    return {
        statusCode: 200,
        body: '',
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=asyncapi.js.map