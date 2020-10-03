import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import ast

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])


def patch(event):
    body = ast.literal_eval(event['body'])
    qs = event['queryStringParameters']
    response = table.update_item(
        Key={
            'userId': qs['userId'],
            'index': qs['index']
        },
        UpdateExpression="set code = :c, codeComment=:cc, description = :d, title = :t, updatedAt = :u",
        ExpressionAttributeValues={
            ':c': body['code'],
            ':cc': body['codeComment'],
            ':d': body['description'],
            ':t': body['title'],
            ':u': body['updatedAt']
        }
    )
    return response


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
