import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CognitoSubmit = {
  signIn: boolean | undefined
}

const initialState: CognitoSubmit = {
  signIn: undefined
}

const cognitoSubmitSlice = createSlice({
  name: 'cognitoSubmit',
  initialState,
  reducers: {
    reset: () => initialState,
    setSignIn: (state, action: PayloadAction<boolean>) => {
      state.signIn = action.payload
    },
  }
})

export default cognitoSubmitSlice
