import json


def delete_contracts(event, table) -> dict:
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )

    if queryStringParameters and "id" in queryStringParameters:
        contractId = queryStringParameters["id"]

        table.delete_item(Key={"id": contractId})
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"Deleted contract with id {contractId}"}),
        }

    return {
        "statusCode": 400,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": "Argument not found, provide corret Argument"}),
    }
