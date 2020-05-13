import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import exampleSlice from 'state/example'

export const store = configureStore({
  reducer: {
    [exampleSlice.name]: exampleSlice.reducer
  }
})

export const actions = {
  [exampleSlice.name]: exampleSlice.actions
}

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
