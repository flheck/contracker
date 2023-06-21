import boto3

# Custom Modules
from . import get_contracts
from . import post_contracts
from . import delete_contracts
from . import update_contracts
from . import post_sqs
from . import utils

"""
Links to create this service
dynamodb: https://docs.aws.amazon.com/code-library/latest/ug/python_3_dynamodb_code_examples.html
dynamodb = boto3.client("dynamodb") - Difference between client and resource: https://stackoverflow.com/questions/42809096/difference-in-boto3-between-resource-client-and-session
Typing: https://pypi.org/project/aws-lambda-typing/
403 + 502 - Malformation: https://stackoverflow.com/questions/43708017/aws-lambda-api-gateway-error-malformed-lambda-proxy-response
"""

# Get the service resource
dyn_resource = boto3.resource("dynamodb")


def lambda_handler(event, context):
    print("Event: ", event, context)
    response = None
    table = dyn_resource.Table(utils.get_environments("TABLE_NAME"))

    try:
        match event["httpMethod"]:
            case "GET":
                response = get_contracts.get_contracts(event, table)
            case "POST":
                if (
                    event["queryStringParameters"]
                    and event["queryStringParameters"]["target"] == "history"
                ):
                    response = post_sqs.post_sqs(event, table)
                else:
                    response = post_contracts.post_contracts(event, table)
            case "PUT":
                response = update_contracts.update_contracts(event, table)
            case "DELETE":
                response = delete_contracts.delete_contracts(event, table)
            case _:
                print("do nothing")

    except Exception as error:
        print(error)
        return utils.create_return_obj(
            500, {"Content-Type": "application/json"}, {"message": error}
        )

    utils.add_cors_header(response)
    return response
