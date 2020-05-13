import React, {useCallback} from 'react'
import { useSelector } from 'react-redux'
import { State, actions, useAppDispatch } from 'state'

type Types = {
  example: State['example']['text']
}

const Home: React.FC = () => {
  const example: Types['example'] = useSelector((state: State) => state.example.text)

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
