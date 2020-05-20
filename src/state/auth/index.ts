import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { establishSessionThunk } from 'state/auth/establishSessionThunk'
import { signInThunk } from 'state/auth/signInThunk'
import { signOutThunk } from 'state/auth/signOutThunk'
import { signUpThunk, signUpVerifyThunk, signUpResendCodeThunk } from 'state/auth/signUpThunk'


type Auth = {
  isSignIn: boolean
  tokens: {
    idToken: string
    accessToken: string
    refreshToken: string
  } | null
}

const initialState: Auth = {
  isSignIn: false,
  tokens: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCognitoUser: (state: Auth, action: PayloadAction<Auth['isSignIn']>) => {
      state.isSignIn = action.payload
    },
    setTokens: (state: Auth, action: PayloadAction<Auth['tokens']>) => {
      state.tokens = action.payload
    }
  }
})

export const authThunk = {
  establishSessionThunk,
  signInThunk,
  signOutThunk,
  signUpThunk, signUpVerifyThunk, signUpResendCodeThunk,
}

export default authSlice
