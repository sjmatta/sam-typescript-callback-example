import { APIGatewayProxyResult } from 'aws-lambda';
import { SNS } from 'aws-sdk';

interface InvokeEvent {
  correlationId: string
}

// eslint-disable-next-line import/prefer-default-export
export const lambdaHandler = async (event: InvokeEvent): Promise<APIGatewayProxyResult> => {
  const { correlationId } = event;
  const topicArn = process.env.TOPIC_ARN;
  await new SNS().publish({
    TopicArn: topicArn,
    Message: JSON.stringify({ correlationId }),
  }).promise();
  return {
    statusCode: 200,
    body: '',
  };
};
