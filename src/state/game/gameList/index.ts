import { createSlice } from '@reduxjs/toolkit'

import { getGames } from 'state/game/gameList/getGames'
import { deleteGame } from 'state/game/gameList/deleteGames'

type Game = {
  code: string
  codeComment: string
  createAt: string
  description: string
  index: string
  title: string
  updateAt: string
  userId: string
}

export type GameList = Game[]

const initialState: GameList = []

const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGames.fulfilled, (_, action) => action.payload)
    builder.addCase(deleteGame.fulfilled, (gameList, action) => {
      gameList.splice(gameList.findIndex(game => game.index === action.payload), 1)
    })
  }
})

export const gameListThunk = {
  getGames,
  deleteGame,
}

export default gameListSlice
