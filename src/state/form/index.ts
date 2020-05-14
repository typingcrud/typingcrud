import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignInForm = {
  email: string
  password: string
}

type Form = {
  signInForm: SignInForm
}

const initialState: Form = {
  signInForm: {
    email: '',
    password: ''
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSignInForm: (state: Form, action: PayloadAction<SignInForm>) => {
      state.signInForm = action.payload
    }
  }
})

export default formSlice
