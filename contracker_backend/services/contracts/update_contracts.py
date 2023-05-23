import json


def update_contracts(event, context):
    return (
        json.dumps({"success": True, "message": "PUT"}),
        200,
        {"ContentType": "application/json"},
    )
