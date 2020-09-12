import React, { useCallback } from 'react'

import { useAppSelector, useAppDispatch, actions } from 'state'

export const Code: React.FC = () => {
  const { after, current, before } = useAppSelector(state => state.gamePlay.params.code)
  const { cursorPos, gameOver, cursorRow } = useAppSelector(state => state.gamePlay.params)
  
  const dispatch = useAppDispatch()
  const typingFunc = (e: React.KeyboardEvent<HTMLPreElement>) => {
    if (gameOver) return
    if (e.key === current || (e.key === 'Enter' && current === '\n')) {
      e.preventDefault()
      dispatch(actions.gamePlay.setCursorPos(cursorPos + 1))
      if (e.key === 'Enter') dispatch(actions.gamePlay.setCursorRow(cursorRow + 1))
      if (before === '') {
        dispatch(actions.gamePlay.setGameOver(true))
        alert('finish')
      }
    }
  } 

  const codeStyle = useCallback(
    (code: "after" | "current" | "before"): React.CSSProperties => ({
      backgroundColor: code === "current" ? 'yellow' : undefined,
      color: code === "after" ? 'white' : code === "current" ? 'black' : 'gray'
    }), []
  )

  const preStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '50%',
    verticalAlign: 'top',
    outline: 'none'
  }

  return (
    <pre style={preStyle} tabIndex={0} onKeyDown={typingFunc}>
      <span style={codeStyle("after")}>{after}</span>
      <span style={codeStyle("current")}>{current !== '\n' ? current : '↵\n'}</span>
      <span style={codeStyle("before")}>{before}</span>
    </pre>
  )
}

export default Code
