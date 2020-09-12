import { createSlice } from '@reduxjs/toolkit'

import { getGames } from 'state/game/gameList/getGames'
import { deleteGame } from 'state/game/gameList/deleteGames'

export type Game = {
  code: string
  codeComment: string
  createAt: string
  description: string
  index: string
  title: string
  updateAt: string
  userId: string
}

export type GameList = {
  gamearray: Game[],
  count: number
}

const initialState: GameList = {
  gamearray: [],
  count: 0
}

const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    reset: () => initialState,
    incrementCounter: (state) => ({
      ...state,
      count: state.count + 1
    }),
    resetCounter: (state) => ({
      ...state,
      count: 0
    })
  },
  extraReducers: builder => {
    builder.addCase(getGames.fulfilled, (gameList, action) => {
      gameList['gamearray'] = action.payload
    })
    builder.addCase(deleteGame.fulfilled, (gameList, action) => {
      gameList['gamearray'].splice(gameList['gamearray'].findIndex(game => game.index === action.payload), 1)
    })
  }
})

export const gameListThunk = {
  getGames,
  deleteGame
}

export default gameListSlice
