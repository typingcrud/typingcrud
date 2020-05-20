import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const Home: React.FC = () => {
  const example = useAppSelector(state => state.example.text)

  const dispatch = useAppDispatch()
  const handleSetExample = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.example.setExample(e.target.value))
    }, [dispatch]
  )

  const handleSetExampleThunk = useCallback(
    () => dispatch(thunkActions.example.setExampleThunk()), [dispatch]
  )

  return (
    <>
      <input
        type='text'
        value={example}
        onChange={handleSetExample}
      />
      <button onClick={handleSetExampleThunk}>Thunk</button>
    </>
  )
}

export default Home
