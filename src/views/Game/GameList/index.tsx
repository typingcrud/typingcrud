import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch ,thunkActions, useAppSelector, actions } from 'state'
import './table.css'

const GameList: React.FC = () => {

  const gameList = useAppSelector(state => state.gameList['gamearray'])
  const count = useAppSelector(state => state.gameList['count'])
  const userId = useAppSelector(state => state.auth.userId)
  const history = useHistory()
  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )

  const dispatch = useAppDispatch()

  const deleteGame = useCallback(
    (index: string) => () => {
      dispatch(thunkActions.gameList.deleteGame(index))
    }, [dispatch]
  )
  
  const refreshlist = () => {
    dispatch(thunkActions.gameList.getGames())
  }

  useEffect(() => {
    if (userId !== '' && count === 0) {
      dispatch(thunkActions.gameList.getGames())
      dispatch(actions.gameList.incrementCounter())
    }
  }, [dispatch, userId, count])

  return (
    <div>
      <button onClick={() => refreshlist()}>更新</button>
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
        {gameList.map((game, index) => {
          if (game.title !== "") {
            return (
              <tbody key={index}>
                <tr>
                  <td><button onClick={link('/game/play/' + game.index)}>{game.title}</button></td>
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
          } else {
            return (
              <tbody key={index}></tbody>
            )
          }
        })}
      </table>
    </div>
  )
}

export default GameList
