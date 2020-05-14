import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setExampleThunk } from 'state/example/setExampleThunk'

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
  },
  extraReducers: builder => {
    builder.addCase(setExampleThunk.fulfilled, (state, action) => {
      state.text = action.payload.text
    })
  }
})

export const exampleThunkActions = {
  setExampleThunk
}

export default exampleSlice
