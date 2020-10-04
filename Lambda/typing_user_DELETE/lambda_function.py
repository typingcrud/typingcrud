import boto3
from boto3.dynamodb.conditions import Key, Attr
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])


def put(event):
    response = table.delete_item(
        Key={
            'userId': event['userId']
        }
    )

    return response


def lambda_handler(event, context):
    person = put(event)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }
