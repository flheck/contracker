import json
from . import utils


def post_contracts(event, table) -> dict:
    items = json.loads(event["body"])

    # Batch Post
    if not isinstance(items, list):
        return utils.create_return_obj(
            400,
            {"Content-Type": "application/json"},
            {"message": "Argument not found, provide corret Argument"},
        )

    ret_ids = []
    with table.batch_writer() as writer:
        for item in items:
            random_id = utils.create_random_id()
            item["id"] = random_id
            ret_ids.append(random_id)
            writer.put_item(Item=item)

    return utils.create_return_obj(
        201, {"Content-Type": "application/json"}, {"ids": ret_ids}
    )
