import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeTextThunk } from 'state/example/setExampleThunk'

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
    reset: () => { return initialState },
    changeText: (state: Example, action: PayloadAction<Example['text']>) => {
      state.text = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(changeTextThunk.fulfilled, (state, action) => {
      state.text = action.payload.text
    })
  }
})

export const exampleThunk = {
  changeTextThunk
}

export default exampleSlice
