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
s3 = boto3.resource('s3')
bucket = s3.Bucket(os.environ['BUCKET_NAME'])


def patch(event):
    body = ast.literal_eval(event['body'])
    qs = event['queryStringParameters']
    imgown = qs['imgOwn']

    if(body['img64'] != "0"):
        strg = body['img64']
        strg += "=" * ((4 - len(strg) % 4) % 4)
        binary = base64.b64decode(strg.encode("UTF-8"))

        bucket.put_object(
            Key=qs['userId'],
            Body=binary,
            ContentType='image/{0}'.format(qs['imgType'])
        )
        imgown = "1"

    response = table.update_item(
        Key={
            'userId': qs['userId']
        },
        UpdateExpression="set userName = :u, updatedAt = :up, imgOwn = :i",
        ExpressionAttributeValues={
            ':u': qs['userName'],
            ':up': body['updatedAt'],
            ':i': imgown
        }
    )
    return


def lambda_handler(event, context):
    patch(event)
    return {
        "isBase64Encoded": False,
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }
