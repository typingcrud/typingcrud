import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from 'state'

type Example = AppState['example']

export const setExampleThunk = createAsyncThunk<Example>(
  'example/setExampleThunk',
  async () => {
    const example = await new Promise<Example>(resolve => setTimeout(() => resolve({text: 'createAsyncThunk'}), 3000)).then(value => value)
    return example
  }
)

