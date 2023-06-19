import json
import uuid
from decimal import Decimal

# Custom Modules
# from ..shared import utils


def post_contracts(event, table) -> dict:
    items = json.loads(event["body"],  parse_float=Decimal)

    # Batch Post
    if not isinstance(items, list):
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "Argument not found, provide corret Argument"}),
        }

    ret_ids = []
    with table.batch_writer() as writer:
        for item in items:
            random_id =  str(uuid.uuid4())
            item["id"] = random_id
            ret_ids.append(random_id)
            writer.put_item(Item=item)
    
    return {
        "statusCode": 201,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"ids": ret_ids}),
    }
