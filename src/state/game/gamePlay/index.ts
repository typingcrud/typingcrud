import { createSlice, } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gamePlay/getGame'

type GamePlay = Omit<App.Game, "userId">

const initialState: GamePlay = {
  index: '',
  title: '',
  description: '',
  lang: '',
  code: '',
  codeComment: '',
  createdAt: '',
  updatedAt: ''
}

const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => (
      action.payload ? action.payload : state
    ))
  }
})

export const gamePlayThunk = {
  getGame,
}

export default gamePlaySlice
