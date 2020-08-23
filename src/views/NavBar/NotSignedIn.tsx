import React from 'react'

type Props = {
  link: (path: string) => () => void
}

export const NotSignedIn: React.FC<Props> = ({link}) => {
  return (
    <div>
      <button onClick={link('/signin')}>SignIn</button>
      <button onClick={link('/signup')}>SignUp</button>
    </div>
  )
}
