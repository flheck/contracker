from . import utils


def transformTimestampsToDate(items: list) -> list:
    for item in items:
        item["start_date"] = utils.transformUnixTimestampToDate(item["start_date"])

    return items


def get_contracts(event, table) -> dict:
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )

    if queryStringParameters:
        if "id" in queryStringParameters:
            contract_id = queryStringParameters["id"]
            response_get_item = table.get_item(Key={"id": contract_id})

            if response_get_item["Item"]:
                return utils.create_return_obj(
                    200, {"Content-Type": "application/json"}, response_get_item["Item"]
                )
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

    result = table.scan()
    transformedResult = transformTimestampsToDate(result["Items"])
    print(transformedResult)

    return utils.create_return_obj(
        200, {"Content-Type": "application/json"}, transformedResult
    )
