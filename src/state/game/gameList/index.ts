import { createSlice } from '@reduxjs/toolkit'

import { getGames } from 'state/game/gameList/getGames'
import { deleteGame } from 'state/game/gameList/deleteGames'
import { create as createGame } from 'state/game/gameForm/create'
import { update as updateGame } from 'state/game/gameForm/update'


type GameList = {
  list: App.Game[]
  needToReload: boolean
}

const initialState: GameList = {
  list: [],
  needToReload: true
}

const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGames.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload : state.list
    })
    builder.addCase(createGame.pending, (state) => {
      state.needToReload = false
    })
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload : state.list
    })
    builder.addCase(updateGame.pending, (state) => {
      state.needToReload = false
    })
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload : state.list
    })
    builder.addCase(deleteGame.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload : state.list
    })
  }
})

export const gameListThunk = {
  getGames,
  deleteGame
}

export default gameListSlice
