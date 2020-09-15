import React, { useCallback } from 'react'

import { useAppDispatch, thunkActions } from 'state'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      <ListItem button onClick={() => linkDrawerClose('game')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <CodeIcon />
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
          <ExitToAppIcon />
        </IconButton>
        <ListItemText primary="ログアウト" />
      </ListItem>
    </React.Fragment>
  )
}
