import React, { useCallback, useEffect } from 'react'
import GameForm from 'views/game/Form'
import { useAppDispatch, thunkActions, actions, useAppSelector } from 'state'
import { useNavigate, useParams, Navigate } from 'react-router-dom'

const GameEdit: React.FC = () => {
  const { isCorrect } = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.update(id ? id : ''))
        .then(() => { navigate('/games') })
        .catch((reason) => { console.error(reason) })
    }, [dispatch, navigate, id]
  )

  useEffect(() => {
    dispatch(thunkActions.gameForm.getGame(id ? id : ''))

    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch, id])

  return (
    (isCorrect.exist && isCorrect.userId)
    ? <GameForm submit={submit}/>
    : <Navigate to='/games'/>
  )
}

export default GameEdit
