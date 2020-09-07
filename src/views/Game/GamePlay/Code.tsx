import React, { useCallback } from 'react'

import { useAppSelector } from 'state'

export const Code: React.FC = () => {
  const code = useAppSelector(state => state.gamePlay.game.code)
  const { cursorPos } = useAppSelector(state => state.gamePlay.params)
  
  const [after, current, before] = [
    code.slice(0, cursorPos),
    code.slice(cursorPos, cursorPos + 1),
    code.slice(cursorPos + 1)
  ]

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
    <pre style={preStyle}>
      <span style={codeStyle("after")}>{after}</span>
      <span style={codeStyle("current")}>{current}</span>
      <span style={codeStyle("before")}>{before}</span>
    </pre>
  )
}

export default Code
