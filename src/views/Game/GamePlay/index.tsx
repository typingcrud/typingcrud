import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, thunkActions, actions } from 'state'
import { Code } from 'views/Game/GamePlay/Code'
import { Comment } from 'views/Game/GamePlay/Comment'

const GamePlay: React.FC = () => {
  const { index } = useParams<{index: string}>()

  const dispatch = useAppDispatch()

  const style: React.CSSProperties = {
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top',
    backgroundColor: '#455a64',
    fontSize: 20,
    padding: 20,
  }

  useEffect(() => {
    dispatch(thunkActions.gamePlay.getGame({index}))
    return () => { dispatch(actions.gamePlay.reset()) }
  }, [dispatch, index])

  return (
    <div style={style}>
      <Code/>
      <Comment/>
    </div>
  )
}

export default GamePlay
