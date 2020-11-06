import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CharMap } from 'views/game/Play/CodeRenderer'
import { getGame } from 'state/game/gamePlay/getGame'

type GamePrams = {
  cursor: number
  line: number
  gameOver: boolean
  linediff: number
}

const initialState: GamePrams = {
  cursor: 0,
  line: 0,
  gameOver: false,
  linediff: 0,
}

const gameParamsSlice = createSlice({
  name: 'gamePrams',
  initialState,
  reducers: {
    reset: () => initialState,
    forward: (state, action: PayloadAction<CharMap>) => {
      state.gameOver = state.cursor === action.payload.length - 1
      state.cursor += state.gameOver ? 0 : 1
      state.line = action.payload[state.cursor]?.l
    }
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      if (action.payload) {
        state.linediff = action.payload.code.split('\n').length - action.payload.codeComment.split('\n').length
      }
    })
  }
})

export default gameParamsSlice
