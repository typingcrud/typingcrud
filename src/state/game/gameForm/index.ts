import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gameForm/getGame'
import { create } from 'state/game/gameForm/create'
import { update } from 'state/game/gameForm/update'

type GameForm = {
  game: App.Game
  valid: Valid
}

type Valid = {
  isFilled: boolean
  isAscii: boolean
}

const initialState: GameForm = {
  game: {
    title: '',
    description: '',
    lang: '',
    code: '',
    codeComment: '',
    index: '',
    userId: '',
    createdAt: '',
    updatedAt: '',
  },
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
      state.game.title = action.payload
      state.valid.isFilled = state.game.title !== "" && state.game.code !== ""
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.game.code = action.payload
      state.valid.isFilled = state.game.title !== "" && state.game.code !== ""
      state.valid.isAscii = state.game.code.match(/[^\n\x20-\x7e]/) === null
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.game.codeComment = action.payload
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.game.lang = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.game.description = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.game = action.payload ? action.payload : state.game
      const { code, title } = action.payload ? action.payload : state.game
      state.valid.isFilled = title !== "" && code !== ""
      state.valid.isAscii = code.match(/[^\n\x20-\x7e]/) === null
    })
  }
})

export const gameFormThunk = {
  getGame, create, update
}

export default gameFormSlice