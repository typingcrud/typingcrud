import React from 'react'

import { useAppSelector } from 'state'

export const Code: React.FC = () => {
  const code = useAppSelector(state => state.gamePlay.game.code)

  return (
    <pre>{code}</pre>
  )
}

export default Code
