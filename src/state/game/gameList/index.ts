import { createSlice } from '@reduxjs/toolkit'

import { getGames } from 'state/game/gameList/getGames'
import { deleteGame } from 'state/game/gameList/deleteGames'

export type GameList = App.Game[]

const initialState: GameList = []

const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGames.fulfilled, (state, action) => {
      return action.payload ? action.payload : state
    })
    builder.addCase(deleteGame.fulfilled, (gameList, action) => {
      gameList.splice(gameList.findIndex(game => game.index === action.payload), 1)
    })
  }
})

export const gameListThunk = {
  getGames,
  deleteGame
}

export default gameListSlice
