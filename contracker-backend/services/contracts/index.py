import json


def lambda_handler(event, context):
    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}
