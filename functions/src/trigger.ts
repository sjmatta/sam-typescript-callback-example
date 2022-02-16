import {APIGatewayProxyResult} from "aws-lambda";
import {StepFunctions} from "aws-sdk";

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    const stateMachineArn: string = process.env.WORKFLOW_ARN;
    const params: StepFunctions.StartExecutionInput = {stateMachineArn};
    await new StepFunctions().startExecution(params).promise()
    return {
        statusCode: 200,
        body: ``
    }
}
