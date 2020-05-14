import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignInForm = {
  email: string
  password: string
}

type Form = {
  signinForm: SignInForm
}

const initialState: Form = {
  signinForm: {
    email: '',
    password: ''
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSignInForm: (state: Form, action: PayloadAction<SignInForm>) => {
      state.signinForm = action.payload
    }
  }
})

export default formSlice
