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

  const style: React.CSSProperties = {
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top',
    backgroundColor: '#455a64',
    fontSize: 20,
    padding: 20,
  }

  return (
    <div style={style}>
      <Code/>
    </div>
  )
}

export default GamePlay
