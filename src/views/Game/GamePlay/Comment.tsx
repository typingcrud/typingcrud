import React, { useCallback } from 'react'

import { useAppSelector } from 'state'

export const Comment: React.FC =() => {
  const { after, current, before } = useAppSelector(state => state.gamePlay.params.codeComment)
  const gameOver = useAppSelector(state => state.gamePlay.params.gameOver)

  const preStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '50%',
    verticalAlign: 'top',
    color: 'gray',
  }

  const codeStyle = useCallback(
    (code: "after" | "current" | "before"): React.CSSProperties => 
    gameOver ? ({
      color: 'white'
    }) : ({
      color: code === "after" ? 'gray' : code === "current" ? 'white' : 'gray'
    }), [gameOver]
  )

  return (
    <pre style={preStyle}>
      <span style={codeStyle("after")}>{after}</span>
      <span style={codeStyle("current")}>{current}</span>
      <span style={codeStyle("before")}>{before}</span>
    </pre>
  )
}
