import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging
import json

logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def getAll(id):
    response = table.query(
        KeyConditionExpression=Key('userId').eq(id)
    )
    return response['Items']

def getSingle(id, ind):
    response = table.query(
        KeyConditionExpression=Key('userId').eq(id) & Key('index').eq(ind)
    )
    return response['Items']

def lambda_handler(event, context):
    #logger.warn(person)
    if event['queryStringParameters']['index'] == "0":
        res = getAll(event['queryStringParameters']['userId'])
    else:
        res = getSingle(
            event['queryStringParameters']['userId'],
            event['queryStringParameters']['index']
        )

    return {
        "isBase64Encoded": False,
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(res)
    }

