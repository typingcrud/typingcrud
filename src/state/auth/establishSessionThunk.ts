import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const establishSession = createAsyncThunk<void, void, ThunkAPI>(
  'auth/establishSessionThunk',
  async (_, thunkAPI) => {
    const { isSignIn, tokens } = thunkAPI.getState().auth
    if ( isSignIn && tokens ) {
      return
    }
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      return
    }
    cognitoUser.getSession((err: Error, session: CognitoUserSession) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      thunkAPI.dispatch(actions.auth.setTokens({
        idToken: session.getIdToken().getJwtToken(),
        accessToken: session.getAccessToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken()
      }))
      thunkAPI.dispatch(actions.auth.setCognitoUser(true))
    })
  }
)
