import json
import boto3

# Get the service resource
dynamodb = boto3.client("dynamodb")


def scan_table(dynamo_client, *, TableName, **kwargs):
    """
    Generates all the items in a DynamoDB table.

    :param dynamo_client: A boto3 client for DynamoDB.
    :param TableName: The name of the table to scan.

    Other keyword arguments will be passed directly to the Scan operation.
    See https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.scan

    """
    paginator = dynamo_client.get_paginator("scan")

    for page in paginator.paginate(TableName=TableName, **kwargs):
        yield from page["Items"]


def get_contracts(event, context):
    retItems = []

    for item in scan_table(dynamodb, TableName="my-table-name"):
        retItems.append(item)
    return (
        json.dumps({"success": True, "items": item}),
        200,
        {"ContentType": "application/json"},
    )
