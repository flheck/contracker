# from ...services.contracts import lambda_handler
from contracker_backend.services.contracts.index import lambda_handler

event = {
    "httpMethod": "GET"
}

context = {}

lambda_handler(event, context)
print("I exe")