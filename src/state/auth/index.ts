import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CognitoUser, CognitoIdToken, CognitoAccessToken, CognitoRefreshToken } from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { signInThunk } from 'state/auth/signInThunk'


type Auth = {
  cognitUser: CognitoUser | null
  isSignIn: boolean
  tokens: {
    idToken: CognitoIdToken
    accessToken: CognitoAccessToken
    refreshToken: CognitoRefreshToken
  } | null
}

const initialState: Auth = {
  cognitUser: cognitoUserPool.getCurrentUser(),
  isSignIn: cognitoUserPool.getCurrentUser() !== null,
  tokens: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCognitoUser: (state: Auth, action: PayloadAction<Omit<Auth, 'tokens'>>) => {
      state.cognitUser = action.payload.cognitUser
      state.isSignIn = action.payload.isSignIn
    },
    setTokens: (state: Auth, action: PayloadAction<Pick<Auth, 'tokens'>>) => {
      state.tokens = action.payload.tokens
    }
  }
})

export const authThunk = {
  signInThunk
}

export default authSlice
