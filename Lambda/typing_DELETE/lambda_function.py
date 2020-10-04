import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table    = dynamodb.Table(os.environ['TABLE_NAME'])

def delete(event):
    if event["index"] == "0":
        response = table.delete_item(
            Key={
                "userId": event["userId"]
            }
        )
    elif event["userId"] == "0":
        response = table.delete_item(
            Key={
                "index": event["index"]
            }
        )

    return response

def lambda_handler(event, context):
    delete(event)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }
