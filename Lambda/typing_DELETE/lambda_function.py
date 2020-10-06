import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import logging

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table    = dynamodb.Table(os.environ['TABLE_NAME'])

def delete(event):
    if event["index"] == "0":
        gameList = table.query(
            KeyConditionExpression=Key("userId").eq(event["userId"])
        )['Items']
        with table.batch_writer() as batch:
            for game in gameList:
                batch.delete_item(
                    Key={
                        "userId": event["userId"],
                        "index": game["index"]
                    }
                )
    else:
        table.delete_item(
            Key={
                "userId": event["userId"],
                "index": event["index"]
            }
        )

    return

def lambda_handler(event, context):
    delete(event)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': "Success!"
    }
