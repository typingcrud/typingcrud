import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoRefreshToken } from 'amazon-cognito-identity-js'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'

import { ThunkAPI } from 'utils/thunk'
import { actions } from 'state'


export const updateTokens = createAsyncThunk<void, void, ThunkAPI>(
  'auth/updateTokens',
  async (_, thunkAPI) => {
    const { isSignIn, tokens } = thunkAPI.getState().auth
    if (!isSignIn && !tokens) {
      return
    }
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      return
    }
    const oldToken = new CognitoRefreshToken({ RefreshToken: localStorage.RefreshToken })
    cognitoUser.refreshSession(oldToken, (err, session) => {
      if (err) {
        console.log("トークンの更新に失敗しました。↓がエラー結果です")
        console.error(err);
      } else {
        const idToken = session.getIdToken().getJwtToken()
        const accessToken = session.getAccessToken().getJwtToken()
        const refreshToken = session.getRefreshToken().getToken()
        thunkAPI.dispatch(actions.auth.setTokens({
          idToken: idToken,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }))
        localStorage.setItem('idToken', idToken)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      }
    })
  }
)
