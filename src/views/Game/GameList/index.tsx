import React, { useEffect } from 'react'

import { useAppDispatch ,thunkActions, useAppSelector } from 'state'
import './table.css'

const GameList: React.FC = () => {

  const gameList = useAppSelector(state => state.gameList)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunkActions.gameList.getGames())
  }, [dispatch])

  return (
    <table>
      <tr>
        <th>title</th>
        <th>description</th>
        <th>code</th>
        <th>codeComment</th>
        <th>options</th>
      </tr>
      { gameList.map((game) => {
        return(
          <tr>
            <td><button>{game.title}</button></td>
            <td>{game.description}</td>
            <td>{game.code}</td>
            <td>{game.codeComment}</td>
            <td>
              <button>編集</button>
              <button>削除</button>
            </td>
          </tr>
        )
      }) }
    </table>
  )
}

export default GameList
