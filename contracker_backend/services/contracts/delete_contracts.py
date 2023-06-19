from . import utils


def delete_contracts(event, table) -> dict:
    queryStringParameters = (
        event["queryStringParameters"] if event["queryStringParameters"] else False
    )

    if queryStringParameters and "id" in queryStringParameters:
        contractId = queryStringParameters["id"]

        table.delete_item(Key={"id": contractId})

        return utils.create_return_obj(
            200,
            {"Content-Type": "application/json"},
            {"message": f"Deleted contract with id {contractId}"},
        )

    return utils.create_return_obj(
        400,
        {"Content-Type": "application/json"},
        {"message": "Argument not found, provide corret Argument"},
    )
