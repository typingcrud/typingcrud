import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
import base64
import logging

logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])
s3 = boto3.client('s3')


def get(e):
    imgtype = ""
    img64 = ""
    response = table.query(
        KeyConditionExpression=Key('userId').eq(e['userId'])
    )
    if response['Items'][0]['imgOwn'] == "1":
        s3obj = s3.get_object(
            Bucket=os.environ['BUCKET_NAME'], Key=e['userId'])
        imgtype = s3obj['ContentType'].replace('image/', '')
        img64 = s3obj['Body'].read()
        img64 = base64.b64encode(img64)

    resobj = {
        "userName": response['Items'][0]['userName'],
        "createdAt": response['Items'][0]['createdAt'],
        "updatedAt": response['Items'][0]['updatedAt'],
        "imgOwn": response['Items'][0]['imgOwn'],
        "imgType": imgtype,
        "img64": img64
    }
    return resobj


def lambda_handler(event, context):
    res = get(event)

    return {
        "isBase64Encoded": False,
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': res
    }
