import React, { useEffect, useCallback } from 'react'

import { useAppDispatch ,thunkActions, useAppSelector } from 'state'
import './table.css'

const GameList: React.FC = () => {

  const gameList = useAppSelector(state => state.gameList)
  const userId = useAppSelector(state => state.auth.userId)

  const dispatch = useAppDispatch()

  const deleteGame = useCallback(
    (index:string) => () => {
      dispatch(thunkActions.gameList.deleteGame(index))
    }, [dispatch]
  )

  useEffect(() => {
    if (userId !== '') dispatch(thunkActions.gameList.getGames())
  }, [dispatch, userId])

  return (
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>code</th>
          <th>codeComment</th>
          <th>options</th>
        </tr>
      </thead>
      { gameList.map((game, index) => {
        return(
          <tbody key={index}>
            <tr>
              <td><button>{game.title}</button></td>
              <td>{game.description}</td>
              <td>{game.code}</td>
              <td>{game.codeComment}</td>
              <td>
                <button>編集</button>
                <button onClick={deleteGame(game.index)}>削除</button>
              </td>
            </tr>
          </tbody>
        )
      }) }
    </table>
  )
}

export default GameList
