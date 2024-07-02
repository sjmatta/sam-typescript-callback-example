import {APIGatewayProxyResult} from "aws-lambda";

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    return Promise.resolve({
        statusCode: 200,
        body: `sample data`
    });
}
