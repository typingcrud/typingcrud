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

type Form = {
  signInForm: SignInForm
  signUpForm: SignUpForm
}

const initialState: Form = {
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

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSignInForm: (state: Form, action: PayloadAction<SignInForm>) => {
      state.signInForm = action.payload
    },
    setSignUpForm: (state: Form, action: PayloadAction<Omit<SignUpForm, "isSignUpForm">>) => {
      state.signUpForm = {
        ...action.payload,
        isSignUpForm: state.signUpForm.isSignUpForm
      }
    },
    setIsSignUpForm: (state: Form, action: PayloadAction<SignUpForm['isSignUpForm']>) => {
      state.signUpForm.isSignUpForm = action.payload
    }
  }
})

export default formSlice
