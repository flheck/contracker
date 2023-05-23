import json


def get_contracts(event, context):
    return (
        json.dumps({"success": True, "message": "GET"}),
        200,
        {"ContentType": "application/json"},
    )
