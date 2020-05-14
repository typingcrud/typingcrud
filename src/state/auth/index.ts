import { createSlice } from '@reduxjs/toolkit'
import { signInThunk } from 'state/auth/signInThunk'

type Auth = {}

const initialState: Auth = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {}
})

export const authThunk = {
  signInThunk
}

export default authSlice
