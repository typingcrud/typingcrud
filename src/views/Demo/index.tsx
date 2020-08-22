import React from 'react'

import { useSignIn } from 'utils'
import { SignedIn } from 'views/Demo/SignedIn'

const Demo: React.FC = () => {
  const signIn = useSignIn()

  return (
    <>
      { signIn? <SignedIn/> : <div>You are not signed in</div> }
    </>
  )
}

export default Demo
