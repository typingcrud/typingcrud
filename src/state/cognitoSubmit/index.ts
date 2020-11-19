import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CognitoSubmit = {
  signIn?: boolean
  signUp?: boolean
  forgotPassword?: boolean
  changeEmail?: boolean
  changePassword?: boolean
  deleteUser?: boolean
}

const initialState: CognitoSubmit = {}

const cognitoSubmitSlice = createSlice({
  name: 'cognitoSubmit',
  initialState,
  reducers: {
    reset: () => initialState,
    setSignIn: (state, action: PayloadAction<boolean>) => {
      state.signIn = action.payload
    },
    setSignUp: (state, action: PayloadAction<boolean>) => {
      state.signUp = action.payload
    },
    setForgotPassword: (state, action: PayloadAction<boolean>) => {
      state.forgotPassword = action.payload
    },
    setChangeEmail: (state, action: PayloadAction<boolean>) => {
      state.changeEmail = action.payload
    },
    setChangePassword: (state, action: PayloadAction<boolean>) => {
      state.changePassword = action.payload
    },
    setDeleteUser: (state, action: PayloadAction<boolean>) => {
      state.deleteUser = action.payload
    },
  }
})

export default cognitoSubmitSlice
