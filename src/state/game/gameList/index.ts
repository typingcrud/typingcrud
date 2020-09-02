import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getGames } from 'state/game/gameList/getGames'

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
    setGames: (_, actions: PayloadAction<GameList>) => actions.payload
  }
})

export const gameListThunk = {
  getGames
}

export default gameListSlice
