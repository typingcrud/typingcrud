import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, thunkActions } from 'state'
import { Code } from 'views/Game/GamePlay/Code'

const GamePlay: React.FC = () => {
  const { index } = useParams<{index: string}>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunkActions.gamePlay.getGame({index}))
  }, [dispatch, index])

  return (
    <React.Fragment>
      <Code/>
    </React.Fragment>
  )
}

export default GamePlay
