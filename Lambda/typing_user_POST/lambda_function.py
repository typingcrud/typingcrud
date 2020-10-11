import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import random
import string
import base64
import time
import ast
import logging

logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def put(event):
    body = ast.literal_eval(event['body'])
    qs = event['queryStringParameters']
    imgown = "0"

    table.put_item(
        Item={
            "userId": qs['userId'],
            "userName": qs['userName'],
            "imgOwn": imgown,
            "createdAt": body['createdAt'],
            "updatedAt": body['createdAt']
        }
    )
    return

def lambda_handler(event, context):
    put(event)
    return {
        "isBase64Encoded": False,
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }
