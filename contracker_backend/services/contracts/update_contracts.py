import json


def update_contracts(event, table):
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )
    parsedBody = json.loads(event["body"])
    requestBody = parsedBody if parsedBody else False

    if queryStringParameters and requestBody and "id" in queryStringParameters:
        contract_id = queryStringParameters["id"]

        print(requestBody)
        requestBodyKey = next(iter(requestBody))
        requestBodyValue = requestBody[requestBodyKey]

        table.update_item(
            Key={"id": contract_id},
            UpdateExpression="set #zzzNew = :new",
            ExpressionAttributeValues={":new": requestBodyValue},
            ExpressionAttributeNames={"#zzzNew": requestBodyKey},
            ReturnValues="UPDATED_NEW",
        )

        return {
            "statusCode": 204,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"Updated contract with id {contract_id}"}),
        }

    return {
        "statusCode": 400,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(
            {"message": "Updating not possible, provide correct arguments"}
        ),
    }
