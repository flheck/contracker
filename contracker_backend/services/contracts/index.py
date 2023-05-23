from . import get_contracts
from . import post_contracts
from . import delete_contracts
from . import update_contracts

def lambda_handler(event, context):
    response = None

    try:
        match event["httpMethod"]:
            case "GET":
                response = get_contracts.get_contracts(event, context)
            case "POST":
                response = post_contracts.post_contracts(event, context)
            case "PUT":
                response = update_contracts.update_contracts(event, context)
            case "DELETE":
                response = delete_contracts.delete_contracts(event, context)
            case _:
                print("do nothing")

    except Exception as error:
        print(error)

    return response
