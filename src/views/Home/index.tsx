import React, { useCallback } from 'react'
import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'
import { setExampleThunk } from 'state/example'

const Home: React.FC = () => {
  const example = useAppSelector(state => state.example.text)

  const dispatch = useAppDispatch()
  const handleSetExample = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.example.setExample(e.target.value))
    }, [dispatch]
  )

  const handleSetExampleAsync = useCallback(
    () => dispatch(thunkActions.example.setExampleAsync("thunkActions")), [dispatch]
  )

  const handleSetExampleThunk = useCallback(
    () => dispatch(setExampleThunk()), [dispatch]
  )

  return (
    <>
      <input
        type='text'
        value={example}
        onChange={handleSetExample}
      />
      <button onClick={handleSetExampleAsync}>Async</button>
      <button onClick={handleSetExampleThunk}>Thunk</button>
    </>
  )
}

export default Home
