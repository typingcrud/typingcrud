import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getHomeGames } from 'state/home/homeList/getHomeGames'

type homeList = {
  list: Omit<App.Game, 'userId'>[]
  page: number
  maxPage: number
}

const initialState: homeList = {
  list: [],
  page: 1,
  maxPage: 1
}

const homeListSlice = createSlice({
  name: 'homeList',
  initialState,
  reducers: {
    reset: () => initialState,
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getHomeGames.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload.list : state.list
      state.maxPage = action.payload ? action.payload.maxPage : state.maxPage
    })
  }
})

export const homeListThunk = {
  getHomeGames,
}

export default homeListSlice
