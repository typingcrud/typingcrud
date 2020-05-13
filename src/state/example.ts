import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'state'

type Example = {
  text: string
}

const initialState: Example = {
  text: 'example'
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state: Example, action: PayloadAction<Example['text']>) => {
      state.text = action.payload
    }
  }
})

const setExampleAsync = (text: Example['text']): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(exampleSlice.actions.setExample(text))
  }, 2000)
}

export const exampleThunkActions = {
  setExampleAsync
}

export default exampleSlice
