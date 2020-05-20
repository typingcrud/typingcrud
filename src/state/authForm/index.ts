import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignInForm = {
  email: string
  password: string
}

type SignUpForm = {
  email: string
  password: string
  verificationCode: string
  isSignUpForm: boolean
}

type AuthForm = {
  signInForm: SignInForm
  signUpForm: SignUpForm
}

const initialState: AuthForm = {
  signInForm: {
    email: '',
    password: ''
  },
  signUpForm: {
    email: '',
    password: '',
    verificationCode: '',
    isSignUpForm: true
  }
}

const authForm = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setSignInForm: (state: AuthForm, action: PayloadAction<SignInForm>) => {
      state.signInForm = action.payload
    },
    setSignUpForm: (state: AuthForm, action: PayloadAction<Omit<SignUpForm, "isSignUpForm">>) => {
      state.signUpForm = {
        ...action.payload,
        isSignUpForm: state.signUpForm.isSignUpForm
      }
    },
    setIsSignUpForm: (state: AuthForm, action: PayloadAction<SignUpForm['isSignUpForm']>) => {
      state.signUpForm.isSignUpForm = action.payload
    }
  }
})

export default authForm
