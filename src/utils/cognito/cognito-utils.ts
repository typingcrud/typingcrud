import { CognitoUserPool } from 'amazon-cognito-identity-js'

import cognitoConfig from 'utils/cognito/cognito-config'


export const cognitoUserPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
})
