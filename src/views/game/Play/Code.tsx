import React from 'react'
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/vsDark"
import { useAppSelector } from 'state'
import { CodeRenderer } from './CodeRenderer'

export const Code: React.FC = () => {
  const { code, lang } = useAppSelector(state => state.gamePlay)
  const { linediff } = useAppSelector(state => state.gamePrams)

  const renderCode = linediff < 0 ? code + '\n'.repeat(-linediff) : code

  return (
    <Highlight {...defaultProps} theme={theme} code={renderCode} language={lang as Language}>
      {(props) => (<CodeRenderer {...props} />)}
    </Highlight>
  )
}
