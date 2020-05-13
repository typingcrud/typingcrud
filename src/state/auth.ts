import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignInForm = {
  email: string
  password: string
}

type Auth = {
  signinForm: SignInForm
}

const initialState: Auth = {
  signinForm: {
    email: '',
    password: ''
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignInForm: (state: Auth, action: PayloadAction<SignInForm>) => {
      state.signinForm = action.payload
    }
  }
})

export default authSlice
