import React, { useCallback } from 'react'

import { useAppDispatch, thunkActions } from 'state'
import { Divider, ListItem, ListItemText, IconButton } from '@material-ui/core'
import { Code, AccountCircle, ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

type Props = {
  linkDrawerClose: (path: string) => void
}

export const SignedIn: React.FC<Props> = ({ linkDrawerClose }) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const signOut = useCallback(
    () => {
      dispatch(thunkActions.auth.signOut())
      history.push('/')
    }, [dispatch, history]
  )

  return (
    <React.Fragment>
      <ListItem button onClick={() => linkDrawerClose('/games')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <Code/>
        </IconButton>
        <ListItemText primary="ゲーム" />
      </ListItem>
      <ListItem button onClick={() => linkDrawerClose('/user')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <AccountCircle />
        </IconButton>
        <ListItemText primary="ユーザー設定" />
      </ListItem>
      <Divider />
      <ListItem button onClick={signOut}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <ExitToApp/>
        </IconButton>
        <ListItemText primary="ログアウト" />
      </ListItem>
    </React.Fragment>
  )
}
