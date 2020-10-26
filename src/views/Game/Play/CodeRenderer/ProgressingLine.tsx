import React from 'react'
import { LineContent } from './styled'

type Props = {
  line: App.CodeToken[]
  getTokenProps: App.CodeRendererProps['getTokenProps']
  ct: number
  cc: number
}

type ChildProps = {
  token: App.CodeToken
  cc: number
}

export const ProgressingLine: React.FC<Props> = ({ line, getTokenProps, ct, cc }) => {
  const renderToken = (token: App.CodeToken, t: number) => {
    if (t < ct) {
      return <span key={t} {...getTokenProps({ token, key: t })} />
    } else if (t === ct) {
      return <ProgressingToken key={t} token={token} cc={cc} />
    } else {
      return <span key={t} style={{ color: 'gray' }} children={token.content} />
    }
  }

  return (
    <LineContent>
      {line.map((token, t) => renderToken(token, t))}
    </LineContent>
  )
}

const ProgressingToken: React.FC<ChildProps> = ({ token, cc }) => {
  const caracters = token?.content.split('').map((v, c) => {
    if (c < cc) {
      return <span key={c} children={v} />
    } else if (c === cc) {
      return <span key={c} style={{ backgroundColor: 'yellow', color: 'black' }} children={v === '\n' ? '↵' : v} />
    } else {
      return <span key={c} style={{ color: 'gray' }} children={v} />
    }
  })
  return <>{caracters}</>
}
