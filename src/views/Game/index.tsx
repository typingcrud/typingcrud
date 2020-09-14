/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'

const Game: React.FC = () => {
    const history = useHistory()

    const link = useCallback(
        (path: string) => () => {
            history.push(path)
        }, [history]
    )
    return (
        <div className="parent">
            <a className="btn-icon" onClick={link('/game/list')}>ゲーム一覧</a>
            <a className="btn-icon" onClick={link('/game/post')}>ゲーム作成</a>
        </div>
    )
}

export default Game
