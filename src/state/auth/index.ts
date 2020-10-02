import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { establishSession } from 'state/auth/establishSession'
import { updateTokens } from 'state/auth/updateTokens'
import { signIn } from 'state/auth/signIn'
import { signOut } from 'state/auth/signOut'
import { signUp, signUpVerify, signUpResendCode } from 'state/auth/signUp'
import { forgotPassword, submitNewPassword } from 'state/auth/forgotPassword'
import { getUserInfo } from 'state/auth/getUserInfo'


type Auth = {
  isSignIn: boolean
  tokens: {
    idToken: string
    accessToken: string
    refreshToken: string
  } | null
  userId: string
  userInfo: {
    userName: string
    createdAt: string
    updatedAt: string
    imgOwn: string
    imgType: string
    img64: string
  }
}

const LStoJson = (item: string | null) => {
  if (typeof(item) === 'string') {
    return JSON.parse(item)
  } else {
    return {
      userName: '',
      createdAt: '',
      updatedAt: '',
      imgOwn: '',
      imgType: '',
      img64: ''
    }
  }
}

const initialState: Auth = {
  isSignIn: false,
  tokens: null,
  userId: '',
  userInfo: LStoJson(localStorage.getItem('userInfo'))
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: Auth) => {
      state.isSignIn = initialState.isSignIn
      state.tokens = initialState.tokens
      state.userId = initialState.userId
      state.userInfo = initialState.userInfo
    },
    setCognitoUser: (state: Auth, action: PayloadAction<Auth['isSignIn']>) => {
      state.isSignIn = action.payload
    },
    setTokens: (state: Auth, action: PayloadAction<Auth['tokens']>) => {
      state.tokens = action.payload
    },
    setUserId: (state: Auth, action: PayloadAction<Auth['userId']>) => {
      state.userId = action.payload
    },
    setUserInfo: (state: Auth, action: PayloadAction<Auth['userInfo']>) => {
      state.userInfo = action.payload
    }
  }
})

export const authThunk = {
  establishSession,
  updateTokens,
  signIn,
  signOut,
  signUp, signUpVerify, signUpResendCode,
  forgotPassword, submitNewPassword,
  getUserInfo
}

export default authSlice
