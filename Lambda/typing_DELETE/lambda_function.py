import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table    = dynamodb.Table(os.environ['TABLE_NAME'])

def put(event):
    logger.warn(event)
    response = table.delete_item(
        Key={
            "userId": event["userId"],
            "index": event["index"]
        }
    )

    return response

def lambda_handler(event, context):
    put(event)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }