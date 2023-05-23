import json


def delete_contracts(event, context):
    return (
        json.dumps({"success": True, "message": "DELETE"}),
        200,
        {"ContentType": "application/json"},
    )
