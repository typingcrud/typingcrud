import React, { useCallback, useEffect } from 'react'

import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'

const GameForm: React.FC = () => {
  const gameForm = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  type GameForm = typeof gameForm
  const changeForm = useCallback(
    (gameForm: GameForm) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <input
        type='text'
        id={id}
        placeholder={id}
        value={value}
        onChange={changeForm(gameForm)}
      />
    )
  }

  const Textarea = (id: string, value: string): JSX.Element => {
    return (
      <textarea
        id={id}
        placeholder={id}
        value={value}
        onChange={changeForm(gameForm)}
        rows={20}
        cols={80}
      />
    )
  }

  useEffect(() => {
    return () => { dispatch(actions.gameForm.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>GameForm</h1>
      <div>
        { Input('title', gameForm.title) }
        { Input('description', gameForm.description) }
      </div>
      <div>
        { Textarea('code', gameForm.code) }
        { Textarea('codeComment', gameForm.codeComment) }
      </div>
      <button onClick={submit}>submit</button>
    </React.Fragment>
  )
}


export default GameForm
