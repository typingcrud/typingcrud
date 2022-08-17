import React, { useCallback, useEffect } from 'react'
import GameForm from 'views/game/Form'
import { useAppDispatch, thunkActions, actions, useAppSelector } from 'state'
import { useHistory, useParams, Redirect } from 'react-router-dom'

const GameEdit: React.FC = () => {
  const { isCorrect } = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.update(id))
        .then(() => { history.push('/games') })
        .catch((reason) => { console.error(reason) })
    }, [dispatch, history, id]
  )

  useEffect(() => {
    dispatch(thunkActions.gameForm.getGame(id))

    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch, id])

  return (
    (isCorrect.exist && isCorrect.userId)
    ? <GameForm submit={submit}/>
    : <Redirect to='/games'/>
  )
}

export default GameEdit
