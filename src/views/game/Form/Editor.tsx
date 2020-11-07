import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import SimpleEditor from 'react-simple-code-editor'
import './editor.css'

type Props = {
  identifier: "code" | "comment"
  value: string
  lang: string
  onValueChange: (value: string) => void
}

const style: React.CSSProperties = {
  fontFamily: '"Ricty", "Ricty Diminished", "Ricty Diminished Discord", "Courier New", Consolas, monospace',
  fontSize: '1.2em'
}

export const Editor: React.FC<Props> = ({ identifier, value, lang, onValueChange }) => {
  const highlight = (code: string) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={lang as Language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {tokens.map((line, l) => (
            <div {...getLineProps({ line, key: l })}>
              <span className='editorLineNumber' style={{ color: 'gray' }}>{l + 1}</span>
              {line.map((token, t) => <span {...getTokenProps({ token, key: t })} />)}
            </div>
          ))}
        </React.Fragment>
      )}
    </Highlight>
  )

  return (
    <SimpleEditor
      value={value}
      onValueChange={onValueChange}
      highlight={highlight}
      textareaId="codeArea"
      className="editor"
      padding={20}
      placeholder={identifier}
      style={style}
    />
  )
}
