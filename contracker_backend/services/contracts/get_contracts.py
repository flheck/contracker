import json
import os


def get_contracts(event, table) -> dict:
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )

    if queryStringParameters:
        if "id" in queryStringParameters:
            contract_id = queryStringParameters["id"]
            response_get_item = table.get_item(Key={"id": contract_id})

            print(response_get_item)
            if response_get_item["Item"]:
                return {
                    "statusCode": 200,
                    "headers": {"Content-Type": "application/json"},
                    "body": json.dumps(response_get_item["Item"]),
                }
            else:
                return {
                    "statusCode": 404,
                    "headers": {"Content-Type": "application/json"},
                    "body": json.dumps(
                        {"message": f"Contract with {contract_id} not found!"}
                    ),
                }

        else:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": "Id required!"}),
            }

    result = table.scan()

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(result["Items"]),
    }
