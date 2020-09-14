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
}

export const SignedIn: React.FC<Props> = ({link}) => {
  const dispatch = useAppDispatch()
  const signOut = useCallback(
    () => {
      dispatch(thunkActions.auth.signOut())
      link('/')()
    }, [dispatch, link]
  )

  return (
    <React.Fragment>
      <ListItem button onClick={link('/game')}>
        <IconButton
          color="inherit"
          onClick={link('/game')}
          edge="start"
        >
          <CodeIcon />
        </IconButton>
        <ListItemText primary="ゲーム" />
      </ListItem>
      <ListItem button onClick={link('/user')}>
        <IconButton
          color="inherit"
          onClick={link('/user')}
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
          onClick={signOut}
          edge="start"
        >
          <ExitToAppIcon />
        </IconButton>
        <ListItemText primary="ログアウト" />
      </ListItem>
    </React.Fragment>
  )
}
