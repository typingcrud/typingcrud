import React, { useCallback, useEffect } from 'react'

import { useAppSelector, useAppDispatch, actions } from 'state'

const GameForm: React.FC = () => {
  const gameForm = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  type GameForm = typeof gameForm
  const changeForm = useCallback(
    (gameForm: GameForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.gameForm.changeForm({
        ...gameForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>GameForm</h1>
      <div>
        <input
          type='text'
          id='title'
          placeholder='title'
          value={gameForm.title}
          onChange={changeForm(gameForm)}
        />
      </div>
      <div>
        <input
          type='text'
          id='description'
          placeholder='description'
          value={gameForm.description}
          onChange={changeForm(gameForm)}
        />
      </div>
      <div>
        <input
          type='text'
          id='code'
          placeholder='code'
          value={gameForm.code}
          onChange={changeForm(gameForm)}
        />
      </div>
      <div>
        <input
          type='text'
          id='codeComment'
          placeholder='codeComment'
          value={gameForm.codeComment}
          onChange={changeForm(gameForm)}
        />
      </div>
    </React.Fragment>
  )
}

export default GameForm
