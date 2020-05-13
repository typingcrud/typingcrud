import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from 'state'

type Example = {
  text: string
}

const initialState: Example = {
  text: 'example'
}

export const setExampleThunk = createAsyncThunk<Example>(
  'example/setExampleThunk',
  async () => {
    const example = await new Promise<Example>(resolve => setTimeout(() => resolve({text: 'createAsyncThunk'}), 3000)).then(value => value)
    return example
  }
)

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

const setExampleAsync = (text: Example['text']): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(exampleSlice.actions.setExample(text))
  }, 2000)
}

export const exampleThunkActions = {
  setExampleAsync
}

export default exampleSlice
