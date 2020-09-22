import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions, thunkActions } from 'state'


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
        const idToken = res.getIdToken().getJwtToken()
        const accessToken = res.getAccessToken().getJwtToken()
        const refreshToken = res.getRefreshToken().getToken()
        const userId = res.getIdToken().payload['custom:typing_userID']

        thunkAPI.dispatch(actions.auth.setCognitoUser(true))
        thunkAPI.dispatch(actions.auth.setTokens({
          idToken: idToken,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }))
        thunkAPI.dispatch(actions.auth.setUserId(userId))
        thunkAPI.dispatch(thunkActions.auth.getUserInfo())
        
        localStorage.setItem('idToken', idToken)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('userId', userId)
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)
