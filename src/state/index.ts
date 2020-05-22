import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import exampleSlice, { exampleThunk } from 'state/example'
import authFormSlice from 'state/authForm'
import authSlice, { authThunk } from 'state/auth'
import settingSlice from 'state/setting'


export const store = configureStore({
  reducer: {
    [exampleSlice.name]: exampleSlice.reducer,
    [authFormSlice.name]: authFormSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [settingSlice.name]: settingSlice.reducer,
  }
})

export const actions = {
  [exampleSlice.name]: exampleSlice.actions,
  [authFormSlice.name]: authFormSlice.actions,
  [authSlice.name]: authSlice.actions,
  [settingSlice.name]: settingSlice.actions,
}

export const thunkActions = {
  [exampleSlice.name]: exampleThunk,
  [authSlice.name]: authThunk,
}


export type AppState = ReturnType<typeof store.getState>
export const useAppSelector: <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => TSelected = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
