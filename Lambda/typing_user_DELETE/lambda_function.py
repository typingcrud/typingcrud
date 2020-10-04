import boto3
from boto3.dynamodb.conditions import Key, Attr
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])
s3 = boto3.resource('s3')
bucket = s3.Bucket(os.environ['BUCKET_NAME'])

def delete(event):
    table.delete_item(
        Key={
            'userId': event['userId']
        }
    )

    bucket.delete_objects(
        Delete={
            "Objects": [
                {"Key": event['userId']}
            ]
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
