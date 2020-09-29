import React, { useCallback, useEffect } from 'react'

import { useAppSelector, useAppDispatch, actions } from 'state'
import { useHistory } from 'react-router-dom'

const GameEdit: React.FC = () => {
  const history = useHistory()
  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )

  const gameEdit = useAppSelector(state => state.gameEdit)

  const dispatch = useAppDispatch()
  type GameEdit = typeof gameEdit
  const changeForm = useCallback(
    (gameEdit: GameEdit) =>
      (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(actions.gameEdit.changeForm({
          ...gameEdit,
          [e.target.id]: e.target.value
        }))
      }, [dispatch]
  )


  const Input = (id: string, value: string): JSX.Element => {
    return (
      <input
        type='text'
        id={id}
        placeholder={id}
        value={value}
        onChange={changeForm(gameEdit)}
      />
    )
  }

  const Textarea = (id: string, value: string): JSX.Element => {
    return (
      <textarea
        id={id}
        placeholder={id}
        value={value}
        onChange={changeForm(gameEdit)}
        rows={20}
        cols={80}
      />
    )
  }

  useEffect(() => {
    return () => { dispatch(actions.gameEdit.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <div>
        <button onClick={link('/game/list')}>ゲーム一覧</button>
        <button onClick={link('/game/post')}>ゲーム作成</button>
      </div>
      <h1>gameEdit</h1>
      <div>
        { Input('title', gameEdit.title) }
        { Input('description', gameEdit.description) }
      </div>
      <div>
        { Textarea('code', gameEdit.code) }
        { Textarea('codeComment', gameEdit.codeComment) }
      </div>
      <button>submit</button>
    </React.Fragment>
  )
}

export default GameEdit
