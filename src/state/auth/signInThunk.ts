import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const signIn = createAsyncThunk<void, void, ThunkAPI>(
  'auth/signIn',
  async (_, thunkAPI) => {
    const signInForm = thunkAPI.getState().authForm.signInForm
    const authenticationDetails = new AuthenticationDetails({
      Username: signInForm.email,
      Password: signInForm.password
    })
    const cognitoUser = new CognitoUser({
      Username: signInForm.email,
      Pool: cognitoUserPool
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (res) => {
        thunkAPI.dispatch(actions.auth.setCognitoUser(true))
        thunkAPI.dispatch(actions.auth.setTokens({
          idToken: res.getIdToken().getJwtToken(),
          accessToken: res.getAccessToken().getJwtToken(),
          refreshToken: res.getRefreshToken().getToken()
        }))
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)
