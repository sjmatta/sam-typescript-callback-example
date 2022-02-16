import { APIGatewayProxyResult, SQSEvent, SQSRecord } from 'aws-lambda';
import { DynamoDB, StepFunctions } from 'aws-sdk';

// eslint-disable-next-line import/prefer-default-export
export const lambdaHandler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
  await Promise.all(event.Records.map((record: SQSRecord) => {
    const { correlationId } = JSON.parse(JSON.parse(record.body).Message);
    return new DynamoDB().getItem({
      TableName: process.env.TABLE_NAME,
      Key: { correlationId: { S: correlationId } },
    }).promise().then((result) => {
      console.log(result);
      return new StepFunctions().sendTaskSuccess({
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
