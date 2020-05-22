import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { establishSession } from 'state/auth/establishSession'
import { signIn } from 'state/auth/signIn'
import { signOut } from 'state/auth/signOut'
import { signUp, signUpVerify, signUpResendCode } from 'state/auth/signUp'
import { forgotPassword, submitNewPassword } from 'state/auth/forgotPassword'


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
