const aws = require('aws-sdk');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();
const crypto = require('crypto');

exports.handler = async (event, context, callback) => {
  const tableName = process.env.TABLE_NAME;
  const region = process.env.REGION;
  const userpoolid = process.env.USER_POOLID;
  aws.config.update({ region: region });

  if (event) {
    const str = event.email + (new Date()).getTime().toString();
    const userid = crypto.createHash('sha256').update(str, 'utf8').digest('hex');
    const cognitoParams = {
      UserAttributes: [
        {
          Name: 'custom:typing_userID',
          Value: userid
        },
      ],
      UserPoolId: userpoolid,
      Username: event.email
    };
    cognitoidentityserviceprovider.adminUpdateUserAttributes(cognitoParams, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      }
    });

    const dbUserName = event.email.split('@')[0]

    const ddbParams = {
      Item: {
        'userId': { S: userid },
        'userName': { S: dbUserName },
        'createdAt': { S: moment().format("YYYY MM/DD HH:mm:ss").toString() },
        'updatedAt': { S: moment().format("YYYY MM/DD HH:mm:ss").toString() },
        'imgOwn': { S: "0" }
      },
      TableName: tableName
    };

    try {
      await ddb.putItem(ddbParams).promise();
    } catch (err) {
      console.log("Error", err);
    }

    context.done(null, event);
  } else {
    context.done(null, event);
  }
};