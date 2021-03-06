import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def getSingle(ind):
    response = table.scan(
        FilterExpression=Attr('index').eq(ind),
        ProjectionExpression='#i, code, updatedAt, createdAt, codeComment, description, title, lang, maxPage',
        ExpressionAttributeNames={
            "#i": "index"
        }
    )
    return response['Items'][0]

def getPage(p):
    response = table.scan(
        FilterExpression=Attr('page').eq(p),
        ProjectionExpression='#i, code, updatedAt, createdAt, codeComment, description, title, lang, maxPage',
        ExpressionAttributeNames={
            "#i": "index"
        }
    )
    return response

def lambda_handler(event, context):
    if event['queryStringParameters']['index'] == "0":
        """
        person = table.scan(
            FilterExpression=Attr('updateAt').gt(int(event['filterTime'])),
            Limit=10
        )
        """
        person = getPage(event['queryStringParameters']['p'])
        """
        for i in range(len(person)):
            person['Items'][i].pop('userId')
        """
    else:
        person = getSingle(event['queryStringParameters']['index'])

    return {
        "isBase64Encoded": False,
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(person)
    }
