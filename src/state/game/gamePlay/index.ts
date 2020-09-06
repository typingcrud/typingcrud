import { createSlice } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gamePlay/getGame'
import { Game } from 'state/game/gameList'

type Params = {
  cursorPos: number
  gameOver: boolean
}

type GamePlay = {
  game: Omit<Game, "userId">
  params: Params
}

const initialState: GamePlay = {
  game: {
    index: '',
    title: '',
    description: '',
    code: '',
    codeComment: '',
    createAt: '',
    updateAt: ''
  },
  params: {
    cursorPos: 0,
    gameOver: false
  }
}

const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.game = action.payload ? action.payload : state.game
    })
  }
})

export const gamePlayThunk = {
  getGame,
}

export default gamePlaySlice
