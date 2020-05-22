import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { establishSession } from 'state/auth/establishSessionThunk'
import { signIn } from 'state/auth/signInThunk'
import { signOut } from 'state/auth/signOutThunk'
import { signUp, signUpVerify, signUpResendCode } from 'state/auth/signUpThunk'
import { forgotPassword, submitNewPassword } from 'state/auth/forgotPasswordThunk'


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
  establishSession,
  signIn,
  signOut,
  signUp, signUpVerify, signUpResendCode,
  forgotPassword, submitNewPassword,
}

export default authSlice
