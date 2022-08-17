import React, { useCallback, useEffect } from 'react'
import GameForm from 'views/game/Form'
import { useAppDispatch, thunkActions, actions } from 'state'
import { useNavigate } from 'react-router-dom'

const GameNew: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.create())
        .then(() => { navigate('/games') })
        .catch((reason) => { console.error(reason) })
    }, [dispatch, navigate]
  )

  useEffect(() => {


    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch])

  return (
    <GameForm submit={submit}/>
  )
}

export default GameNew
