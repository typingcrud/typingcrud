import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const Home: React.FC = () => {
  const example = useAppSelector(state => state.example.text)

  const dispatch = useAppDispatch()
  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.example.changeText(e.target.value))
    }, [dispatch]
  )

  const changeTextThunk = useCallback(
    () => dispatch(thunkActions.example.changeTextThunk()), [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.example.reset()) }
  }, [dispatch])

  return (
    <>
      <input
        type='text'
        value={example}
        onChange={changeText}
      />
      <button onClick={changeTextThunk}>Thunk</button>
    </>
  )
}

export default Home
