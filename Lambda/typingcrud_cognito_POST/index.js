const aws = require('aws-sdk');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
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
    const updateParams = {
      UserAttributes: [
        {
          Name: 'custom:typing_userID',
          Value: userid
        },
      ],
      UserPoolId: userpoolid,
      Username: event.email
    };
    const getParams = {
      UserPoolId: userpoolid,
      Username: event.email
    }
    try {
      await cognitoidentityserviceprovider.adminUpdateUserAttributes(updateParams).promise()
      const user = await cognitoidentityserviceprovider.adminGetUser(getParams).promise()
      const ddbParams = {
        Item: {
          'userId': { S: user.UserAttributes[2]['Value'] },
          'userName': { S: event.email.split('@')[0] },
          'createdAt': { S: dayjs().tz().format("YYYY MM/DD HH:mm:ss").toString() },
          'updatedAt': { S: dayjs().tz().format("YYYY MM/DD HH:mm:ss").toString() },
          'imgOwn': { S: "0" }
        },
        TableName: tableName
      }
      await ddb.putItem(ddbParams).promise()
    } catch (e) {
      console.error(e)
    }

    context.done(null, event);
  } else {
    context.done(null, event);
  }
};