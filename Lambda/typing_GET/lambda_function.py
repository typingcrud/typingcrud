import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging
import json

logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def get(id):
    response = table.query(
        KeyConditionExpression=Key('userId').eq(id)
    )
    return response['Items']

def lambda_handler(event, context):
    #logger.warn(person)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(get(event['queryStringParameters']['userId']))
    }

"""
{
 "userId" : "$input.params('userId')"
}
"""
