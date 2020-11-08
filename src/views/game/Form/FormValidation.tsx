import React, { useState, useEffect, useCallback } from 'react'
import { useAppSelector } from 'state'

export const FormValidation: React.FC = () => {
  const { code } = useAppSelector(state => state.gameForm)
  const [valid, setValid] = useState(true)

  const check = useCallback(
    (str: string) => str.match(/[^\n\x20-\x7e]/), []
  )

  useEffect(() => {
    if (check(code) === null) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [check, code])

  return valid ? <React.Fragment/> : (
    <div>ダメだよ</div>
  )
}
