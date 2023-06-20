import json
from . import utils


def update_contracts(event, table):
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )
    parsedBody = json.loads(event["body"])
    requestBody = parsedBody if parsedBody else False

    if queryStringParameters and requestBody and "id" in queryStringParameters:
        contract_id = queryStringParameters["id"]

        for key, value in requestBody.items():
            table.update_item(
                Key={"id": contract_id},
                UpdateExpression="set #zzzNew = :new",
                ExpressionAttributeValues={":new": value},
                ExpressionAttributeNames={"#zzzNew": key},
                ReturnValues="UPDATED_NEW",
            )

        return utils.create_return_obj(
            204,
            {"Content-Type": "application/json"},
            {"message": "Updated contract with id " + contract_id},
        )

    return utils.create_return_obj(
        400,
        {"Content-Type": "application/json"},
        {"message": "Updating not possible, provide correct arguments"},
    )


# def update_contracts(event, table):
#     queryStringParameters = (
#         event["queryStringParameters"] if event["queryStringParameters"] else False
#     )
#     parsedBody = json.loads(event["body"])
#     requestBody = parsedBody if parsedBody else False

#     if queryStringParameters and requestBody and "id" in queryStringParameters:
#         contract_id = queryStringParameters["id"]

#         print(requestBody)
#         requestBodyKey = next(iter(requestBody))
#         requestBodyValue = requestBody[requestBodyKey]

#         table.update_item(
#             Key={"id": contract_id},
#             UpdateExpression="set #zzzNew = :new",
#             ExpressionAttributeValues={":new": requestBodyValue},
#             ExpressionAttributeNames={"#zzzNew": requestBodyKey},
#             ReturnValues="UPDATED_NEW",
#         )

#         return utils.create_return_obj(
#             204,
#             {"Content-Type": "application/json"},
#             {"message": f"Updated contract with id {contract_id}"},
#         )
