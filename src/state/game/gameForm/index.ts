import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gameForm/getGame'
import { create } from 'state/game/gameForm/create'
import { update } from 'state/game/gameForm/update'

type GameForm = {
  title: string
  description: string
  lang: string
  code: string
  codeComment: string
}

const initialState: GameForm = {
  title: '',
  description: '',
  lang: '',
  code: '',
  codeComment: '',
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
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      const { code, codeComment, description, title } = action.payload ? action.payload : state
      state.title = title
      state.description = description
      state.code = code
      state.codeComment = codeComment
    })
  }
})

export const gameFormThunk = {
  getGame, create, update
}

export default gameFormSlice