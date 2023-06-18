import json
import os
import uuid

# Custom Modules
# from ..shared import utils


def post_contracts(event, table) -> dict:
    random_id = str(uuid.uuid4())
    print(random_id)
    item = json.loads(event["body"])
    item["id"] = random_id

    response = table.put_item(Item=item)

    return {
        "statusCode": 201,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"id": random_id}),
    }
