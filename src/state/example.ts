import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export default exampleSlice
