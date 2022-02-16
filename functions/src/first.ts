import {APIGatewayProxyResult} from "aws-lambda";

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: `sample data`
    }
}
