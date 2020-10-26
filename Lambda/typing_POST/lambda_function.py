import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import random
import string
import ast
import logging

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])


def put(event):
    #logger.warn(event)
    body = ast.literal_eval(event['body'])
    qs = event['queryStringParameters']
    response = table.put_item(
        Item={
            "userId": qs['userId'],
            "index": qs['index'],
            "code": body['code'],
            "codeComment": body['codeComment'],
            "description": body['description'],
            "title": body['title'],
            "createdAt": body['createdAt'],
            "updatedAt": body['createdAt'],
            "lang" :body['lang']
        }
    )
    return response


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
