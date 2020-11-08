import React, { useState, useEffect, useCallback } from 'react'
import { useAppSelector } from 'state'
import { Alert, AlertTitle } from '@material-ui/lab'

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
    <Alert severity="warning">
      <AlertTitle>注意</AlertTitle>
      タイピング対象のソースコードとして投稿できるのは半角英数字及びキーボードに刻印されている特殊記号のみです
    </Alert>
  )
}
