import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gamePlay/getGame'
import { Game } from 'state/game/gameList'

type Params = {
  cursorPos: number
  cursorRow: number
  gameOver: boolean
  code: {
    after: string
    current: string
    before: string
  }
  codeComment: {
    after: string
    current: string
    before: string
  }
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
    cursorRow: 0,
    gameOver: false,
    code: {
      after: '',
      current: '',
      before: ''
    },
    codeComment: {
      after: '',
      current: '',
      before: ''
    }
  }
}

const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    reset: () => initialState,
    setCursorPos: (state, action: PayloadAction<GamePlay['params']['cursorPos']>) => {
      state.params.cursorPos = action.payload
      state.params.code = {
        after: state.game.code.slice(0, action.payload),
        current: state.game.code.slice(action.payload, action.payload + 1),
        before: state.game.code.slice(action.payload + 1)
      }
    },
    setCursorRow: (state, action: PayloadAction<GamePlay['params']['cursorRow']>) => {
      state.params.cursorRow = action.payload
      const commentArr = state.game.codeComment.split(/\n/).map((str, index, {length}) => index!==length-1 ? str+'\n' : str)
      state.params.codeComment.after = commentArr.slice(0, action.payload).join('')
      state.params.codeComment.current = commentArr.slice(action.payload, action.payload+1).join('')
      state.params.codeComment.before = commentArr.slice(action.payload+1).join('')
    },
    setGameOver: (state, action: PayloadAction<GamePlay['params']['gameOver']>) => {
      state.params.gameOver = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.game = action.payload ? action.payload : state.game
      state.params.code = {
        after: state.game.code.slice(0, 0),
        current: state.game.code.slice(0, 1),
        before: state.game.code.slice(1)
      }
      const commentArr = state.game.codeComment.split(/\n/).map((str, index, {length}) => index!==length-1 ? str+'\n' : str)
      state.params.codeComment = {
        after: '',
        current: commentArr.slice(0, 1).join(''),
        before: commentArr.slice(1).join('')
      }
    })
  }
})

export const gamePlayThunk = {
  getGame,
}

export default gamePlaySlice
