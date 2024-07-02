import { APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB, Lambda } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

interface InvokeEvent {
  taskToken: string
}

const saveTaskToken = (
  tableName: string,
  correlationId: string,
  taskToken: string,
) => new DynamoDB().putItem({
  TableName: tableName,
  Item: {
    correlationId: { S: correlationId },
    taskToken: { S: taskToken },
    expirationTime: { N: Math.floor(new Date().getTime() / 1000).toString() },
  },
}).promise();

const invokeLambdaFunction = (
  lambdaFunction: string,
  correlationId: string,
) => new Lambda().invoke({
  FunctionName: lambdaFunction,
  InvocationType: 'Event',
  Payload: JSON.stringify({ correlationId }),
}).promise();

export const lambdaHandler = async (event: InvokeEvent): Promise<APIGatewayProxyResult> => {
  const tableName: string = process.env.TABLE_NAME;
  const correlationId: string = uuidv4();
  const { taskToken } = event;
  const lambdaFunction = process.env.LAMBDA_FUNCTION;

  await saveTaskToken(tableName, correlationId, taskToken);
  await invokeLambdaFunction(lambdaFunction, correlationId);
  return {
    statusCode: 200,
    body: '',
  };
};
