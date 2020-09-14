import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import { PersonAdd } from '@material-ui/icons';

type Props = {
  link: (path: string) => () => void
}

export const NotSignedIn: React.FC<Props> = ({link}) => {
  return (
    <React.Fragment>
      <ListItem button onClick={link('/signin')}>
        <IconButton
          color="inherit"
          onClick={link('/game')}
          edge="start"
        >
          <LockIcon />
        </IconButton>
        <ListItemText primary="ログイン" />
      </ListItem>
      <ListItem button onClick={link('/signup')}>
        <IconButton
          color="inherit"
          onClick={link('/game')}
          edge="start"
        >
          <PersonAdd />
        </IconButton>
        <ListItemText primary="アカウント作成" />
      </ListItem>
    </React.Fragment>
  )
}
