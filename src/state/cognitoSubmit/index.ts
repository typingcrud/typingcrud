import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CognitoSubmit = {
  signIn: boolean | undefined
  signUp: boolean | undefined
}

const initialState: CognitoSubmit = {
  signIn: undefined,
  signUp: undefined,
}

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
  }
})

export default cognitoSubmitSlice
