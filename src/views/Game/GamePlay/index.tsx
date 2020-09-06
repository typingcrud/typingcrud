import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch, thunkActions } from 'state'

const GamePlay: React.FC = () => {
  const { index } = useParams<{index: string}>()

  const game = useAppSelector(state => state.gamePlay.game)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunkActions.gamePlay.getGame({index}))
  }, [dispatch, index])

  return (
    <>
      <div>this game id: {index}</div>
    </>
  )
}

export default GamePlay
