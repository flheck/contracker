import json


def post_contracts(event, context):
    return (
        json.dumps({"success": True, "message": "POST"}),
        200,
        {"ContentType": "application/json"},
    )
