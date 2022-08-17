import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions, thunkActions } from 'state'


export const establishSession = createAsyncThunk<void, void, ThunkAPI>(
  'auth/establishSession',
  async (_, thunkAPI) => {
    const { isSignIn, tokens } = thunkAPI.getState().auth
    if ( isSignIn && tokens ) {
      return
    }
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      return
    }
    const localStorageDatas = {
      idToken: localStorage.getItem('idToken'),
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      userId: localStorage.getItem("userId"),
      userInfo: localStorage.getItem("userInfo")
    }
    if (
      localStorageDatas.idToken !== null &&
      localStorageDatas.accessToken !== null &&
      localStorageDatas.refreshToken !== null &&
      localStorageDatas.userId !== null &&
      localStorageDatas.userInfo !== null
    ) {
      thunkAPI.dispatch(actions.auth.setCognitoUser(true))
      thunkAPI.dispatch(actions.auth.setTokens({
        idToken: localStorageDatas.idToken,
        accessToken: localStorageDatas.accessToken,
        refreshToken: localStorageDatas.refreshToken
      }))
      thunkAPI.dispatch(actions.auth.setUserId(localStorageDatas.userId))
      thunkAPI.dispatch(actions.auth.setUserInfo(JSON.parse(localStorageDatas.userInfo)))
    } else {
      cognitoUser.getSession((err: Error, session: CognitoUserSession | null) => {
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }

        if (session) {
          const idToken = session?.getIdToken().getJwtToken()
          const accessToken = session?.getAccessToken().getJwtToken()
          const refreshToken = session?.getRefreshToken().getToken()
          const userId = session?.getIdToken().payload['custom:typing_userID']

          thunkAPI.dispatch(actions.auth.setCognitoUser(true))
          thunkAPI.dispatch(actions.auth.setTokens({
            idToken: idToken,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }))
          thunkAPI.dispatch(actions.auth.setUserId(userId))
          
          localStorage.setItem('idToken', idToken)
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          localStorage.setItem('userId', userId)

          thunkAPI.dispatch(thunkActions.auth.getUserInfo())
        }
      })
    }
  }
)
