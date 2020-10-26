import { createSlice, } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gamePlay/getGame'
import { Game } from 'state/game/gameList'

type GamePlay = Omit<Game, "userId">

const initialState: GamePlay = {
  index: '',
  title: '',
  description: '',
  lang: '',
  code: '',
  codeComment: '',
  createAt: '',
  updateAt: ''
}

const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      state = action.payload ? action.payload : state
    })
  }
})

export const gamePlayThunk = {
  getGame,
}

export default gamePlaySlice
