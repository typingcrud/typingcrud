import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { signInThunk } from 'state/auth/signInThunk'
import { establishSessionThunk } from 'state/auth/establishSessionThunk'


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
  signInThunk,
  establishSessionThunk
}

export default authSlice
