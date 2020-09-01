import React, { useCallback, useEffect } from 'react'

import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'

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

  const submit = useCallback(
    () => dispatch(thunkActions.gameForm.submit()), [dispatch]
  )

  const Input = (id: string, value: string): JSX.Element => {
    return (
      <div>
        <input
          type='text'
          id={id}
          placeholder={id}
          value={value}
          onChange={changeForm(gameForm)}
        />
      </div>
    )
  }

  useEffect(() => {
    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>GameForm</h1>
      { Input('title', gameForm.title) }
      { Input('description', gameForm.description) }
      { Input('code', gameForm.code) }
      { Input('codeComment', gameForm.codeComment) }
      <button onClick={submit}>submit</button>
    </React.Fragment>
  )
}


export default GameForm
