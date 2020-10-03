import boto3
from boto3.dynamodb.conditions import Key, Attr
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])


def get_person(ind):
    response = table.scan(
        FilterExpression=Attr('index').eq(ind)
    )
    response['Items'][0].pop('userId')
    return response['Items'][0]


def lambda_handler(event, context):
    if event['filterTime'] == "0":
        person = get_person(event['index'])
    else:
        person = table.scan(
            FilterExpression=Attr('updateAt').gt(int(event['filterTime'])),
            Limit=10
        )
        for i in range(len(person)):
            person['Items'][i].pop('userId')
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': person
    }
