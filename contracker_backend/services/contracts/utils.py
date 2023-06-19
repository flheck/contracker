import uuid
import json
import os
from datetime import datetime


def create_random_id() -> str:
    return str(uuid.uuid4())


def create_return_obj(status_code: int, headers: dict, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": headers,
        "body": json.dumps(body),
    }


def add_cors_header(arg):
    if not arg["headers"]:
        arg["headers"] = {}

    arg["headers"]["Access-Control-Allow-Origin"] = "*"
    arg["headers"]["Access-Control-Allow-Methods"] = "*"


def transformUnixTimestampToDate(timestamp: str) -> str:
    ts = int(int(timestamp) / 1000)
    return datetime.utcfromtimestamp(ts).strftime("%d.%m.%Y")

def get_environments(env_name: str):
    return os.environ[env_name]