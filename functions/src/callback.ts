import { APIGatewayProxyResult, SQSEvent, SQSRecord } from 'aws-lambda';
import { DynamoDB, StepFunctions } from 'aws-sdk';

interface Message {
  correlationId: string
}

interface SQSRecordBody {
  Message: string
}

const getBodyMessage = (record: SQSRecord): Message => {
  const body = JSON.parse(record.body) as SQSRecordBody;
  return JSON.parse(body.Message) as Message;
}

export const lambdaHandler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
  await Promise.all(event.Records.map((record: SQSRecord) => {
    const { correlationId } = getBodyMessage(record);
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
