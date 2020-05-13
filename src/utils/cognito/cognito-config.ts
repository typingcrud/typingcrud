const cognitoConfig = {
  region: process.env.REACT_APP_COGNITO_REGION as string,
  IdentityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID as string,
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
}

export default cognitoConfig
