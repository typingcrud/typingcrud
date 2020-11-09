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
  valid: Valid
}

type Valid = {
  isFilled: boolean
  isAscii: boolean
}

const initialState: GameForm = {
  title: '',
  description: '',
  lang: '',
  code: '',
  codeComment: '',
  valid: {
    isFilled: false,
    isAscii: true,
  }
}

const gameFormSlice = createSlice({
  name: 'gameForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
      state.valid.isFilled = state.title !== "" && state.code !== ""
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
      state.valid.isFilled = state.title !== "" && state.code !== ""
      state.valid.isAscii = state.code.match(/[^\n\x20-\x7e]/) === null
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
      const { code, codeComment, description, title, lang } = action.payload ? action.payload : state
      state.title = title
      state.lang = lang
      state.description = description
      state.code = code
      state.codeComment = codeComment
      state.valid.isFilled = state.title !== "" && state.code !== ""
      state.valid.isAscii = state.code.match(/[^\n\x20-\x7e]/) === null
    })
  }
})

export const gameFormThunk = {
  getGame, create, update
}

export default gameFormSlice