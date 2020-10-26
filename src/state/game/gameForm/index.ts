import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { submit } from 'state/game/gameForm/submit'

export type GameForm = {
  title: string
  description: string
  lang: string
  code: string
  codeComment: string
}

const initialState: GameForm = {
  title: "",
  description: "",
  lang: "",
  code: "",
  codeComment: "",
}

const gameFormSlice = createSlice({
  name: 'gameForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.codeComment = action.payload
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
  }
})

export const gameFormThunk = {
  submit
}

export default gameFormSlice