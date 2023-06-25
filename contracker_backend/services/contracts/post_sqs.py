from . import utils
import boto3
import json


def post_sqs(event, table) -> dict:
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )

    body = None

    if queryStringParameters:
        if "id" in queryStringParameters:
            contract_id = queryStringParameters["id"]
            response_get_item = table.get_item(Key={"id": contract_id})

            if response_get_item["Item"]:
                body = response_get_item["Item"]
            else:
                return utils.create_return_obj(
                    404,
                    {"Content-Type": "application/json"},
                    {"message": f"Contract with {contract_id} not found!"},
                )
        else:
            return utils.create_return_obj(
                400,
                {"Content-Type": "application/json"},
                {"message": "Id required!"},
            )
    if not body == None:
        sqs = boto3.client("sqs")  # client is required to interact with
        sqs.send_message(
            QueueUrl="https://sqs.eu-central-1.amazonaws.com/531201357882/HistoryContractSqsStack-HistoryContractSqsQueue7121893E-FrwmPJuu1WzY",
            MessageBody=json.dumps(body),
        )
    else:
        return utils.create_return_obj(
            404,
            {"Content-Type": "application/json"},
            {"message": "Id required!"},
        )

    # Delete item from current contracts
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )
    if queryStringParameters and "id" in queryStringParameters:
        contractId = queryStringParameters["id"]

        table.delete_item(Key={"id": contractId})

        return utils.create_return_obj(
            200,
            {"Content-Type": "application/json"},
            {"message": f"Item cancelled: {contractId}"},
        )
