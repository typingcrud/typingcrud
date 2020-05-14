import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import exampleSlice, { exampleThunkActions } from 'state/example'
import authSlice from 'state/auth'

export const store = configureStore({
  reducer: {
    [exampleSlice.name]: exampleSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  }
})

export const actions = {
  [exampleSlice.name]: exampleSlice.actions,
  [authSlice.name]: authSlice.actions,
}

export const thunkActions = {
  [exampleSlice.name]: exampleThunkActions,
}

export type AppState = ReturnType<typeof store.getState>
export const useAppSelector: <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => TSelected = useSelector;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
