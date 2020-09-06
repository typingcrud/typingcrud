import React from 'react'
import { useParams } from 'react-router-dom'

const GamePlay: React.FC = () => {
  const { id } = useParams()

  return (
    <div>this game id: {id}</div>
  )
}

export default GamePlay
