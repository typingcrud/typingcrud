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

  const handleSetExampleAsync = useCallback(
    () => dispatch(thunkActions.example.setExampleAsync("thunkActions")), [dispatch]
  )

  return (
    <>
      <input
        type='text'
        value={example}
        onChange={handleSetExample}
      />
      <button onClick={handleSetExampleAsync}>Async</button>
    </>
  )
}

export default Home
