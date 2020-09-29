import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameForm } from 'state/game/gameForm'

type GameEdit = GameForm

const initialState: GameEdit = {
  title: '',
  description: '',
  code: '',
  codeComment: '',
}

const gameEditSlice = createSlice({
  name: 'gameEdit',
  initialState,
  reducers: {
    reset: () => initialState,
    changeForm: (_, action: PayloadAction<GameEdit>) => action.payload
  },
  extraReducers: _builder => {
  }
})

export default gameEditSlice
