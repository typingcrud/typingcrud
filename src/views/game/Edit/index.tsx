import React, { useCallback, useEffect } from 'react'
import GameForm from 'views/game/Form'
import { useAppDispatch, thunkActions, actions, useAppSelector } from 'state'
import { useHistory, useParams, Redirect } from 'react-router-dom'

const GameEdit: React.FC = () => {
  const { isCorrect } = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const { id: index } = useParams()

  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.update(index))
        .then(() => { history.push('/games') })
        .catch((reason) => { console.error(reason) })
    }, [dispatch, history, index]
  )

  useEffect(() => {
    dispatch(thunkActions.gameForm.getGame(index))

    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch, index])

  return (
    (isCorrect.exist && isCorrect.userId)
    ? <GameForm submit={submit}/>
    : <Redirect to='/games'/>
  )
}

export default GameEdit
