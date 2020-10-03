import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging

#logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])


def get_person(id):
    response = table.query(
        KeyConditionExpression=Key('userId').eq(id)
    )
    return response['Items']


def lambda_handler(event, context):
    person = get_person(event['userId'])
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': person
    }
