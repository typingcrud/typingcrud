import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';

type Props = {
  linkDrawerClose: (path: string) => void
}

export const NotSignedIn: React.FC<Props> = ({ linkDrawerClose }) => {
  return (
    <React.Fragment>
      <ListItem button onClick={() => linkDrawerClose('user/signin')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <LockIcon />
        </IconButton>
        <ListItemText primary="ログイン" />
      </ListItem>
      <ListItem button onClick={() => linkDrawerClose('user/signup')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <PersonAddIcon />
        </IconButton>
        <ListItemText primary="アカウント作成" />
      </ListItem>
    </React.Fragment>
  )
}
