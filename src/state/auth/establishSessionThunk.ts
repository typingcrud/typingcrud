import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState, AppDispatch, actions } from 'state'


export const establishSessionThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
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
