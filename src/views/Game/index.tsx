import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const Game: React.FC = () => {
    const history = useHistory()

    const link = useCallback(
        (path: string) => () => {
            history.push(path)
        }, [history]
    )
    return (
        <div>
            <button onClick={link('/game/list')}>ゲーム一覧</button>
            <button onClick={link('/game/post')}>ゲーム作成</button>
        </div>
    )
}

export default Game
