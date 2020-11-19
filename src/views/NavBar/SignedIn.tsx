import React, { useCallback } from 'react'

import { useAppDispatch, thunkActions } from 'state'
import { Divider, ListItem, ListItemText, IconButton } from '@material-ui/core'
import { Code, AccountCircle, ExitToApp } from '@material-ui/icons'

type Props = {
  link: (path: string) => () => void
  linkDrawerClose: (path: string) => void
}

export const SignedIn: React.FC<Props> = ({ link, linkDrawerClose }) => {
  const dispatch = useAppDispatch()
  const signOut = useCallback(
    () => {
      dispatch(thunkActions.auth.signOut())
      link('/')()
    }, [dispatch, link]
  )

  return (
    <React.Fragment>
      <ListItem button onClick={() => linkDrawerClose('games')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <Code/>
        </IconButton>
        <ListItemText primary="ゲーム" />
      </ListItem>
      <ListItem button onClick={() => linkDrawerClose('user')}>
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
