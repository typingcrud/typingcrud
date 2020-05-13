import React, { useCallback } from 'react'
import { actions, useAppSelector, useAppDispatch } from 'state'

const Home: React.FC = () => {
  const example = useAppSelector(state => state.example.text)

  const dispatch = useAppDispatch()
  const handleSetExample = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.example.setExample(e.target.value))
    }, [dispatch]
  )

  return (
    <input
      type='text'
      value={example}
      onChange={handleSetExample}
    />
  )
}

export default Home
