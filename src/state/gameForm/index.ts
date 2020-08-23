import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameForm = {
  title: string
  description: string
  code: string
  codeComment: string
}

const initialState: GameForm = {
  title: "",
  description: "",
  code: "",
  codeComment: "",
}

const gameFormSlice = createSlice({
  name: 'gameForm',
  initialState,
  reducers: {
    reset: () => initialState,
    changeForm: (_, action: PayloadAction<GameForm>) => action.payload
  }
})

export default gameFormSlice
