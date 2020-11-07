import React, { useCallback, useEffect } from 'react'
import GameForm from 'views/game/Form'
import { useAppDispatch, thunkActions, actions } from 'state'
import { useHistory } from 'react-router-dom'

const GameNew: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()


  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.create())
        .then(() => { history.push('/games') })
        .catch((reason) => { console.error(reason) })
    }, [dispatch, history]
  )

  useEffect(() => {


    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch])

  return (
    <GameForm submit={submit}/>
  )
}

export default GameNew
