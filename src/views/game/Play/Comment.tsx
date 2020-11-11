import React from 'react'
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/vsDark"
import { useAppSelector } from 'state'
import { Wrapper, Pre, Line, LineNo, LineContent } from './CodeRenderer/styled'

export const Comment: React.FC = () => {
  const { codeComment } = useAppSelector(state => state.gamePlay)
  const { line: cursorLine, linediff, gameOver } = useAppSelector(state => state.gamePrams)

  const renderComment = linediff > 0 ? codeComment + '\n'.repeat(linediff) : codeComment

  const lineStyle = (l: number): React.CSSProperties => ({
    color: gameOver ? 'white' : (l === cursorLine) ? 'white' : 'gray'
  })

  return (
    <Highlight {...defaultProps} theme={theme} code={renderComment} language={"txt" as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Wrapper>
          <Pre className={className} style={style}>
            {tokens.map((line, l) => (
              <Line key={l} {...getLineProps({ line, key: l })}>
                <LineNo>{l + 1}</LineNo>
                <LineContent>
                  {line.map((token, t) => (
                    <span key={t} {...getTokenProps({ token, key: t })} style={lineStyle(l)} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        </Wrapper>
      )}
    </Highlight>
  )
}
