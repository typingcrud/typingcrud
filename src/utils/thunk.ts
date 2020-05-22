import { AppState, AppDispatch } from 'state'

export type ThunkAPI = {
  state: AppState
  dispatch: AppDispatch
}
