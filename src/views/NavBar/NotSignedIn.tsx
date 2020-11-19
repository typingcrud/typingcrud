import React from 'react'
import { ListItem, ListItemText, IconButton } from '@material-ui/core'
import { PersonAdd, Lock } from '@material-ui/icons'

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
          <Lock/>
        </IconButton>
        <ListItemText primary="ログイン" />
      </ListItem>
      <ListItem button onClick={() => linkDrawerClose('user/signup')}>
        <IconButton
          color="inherit"
          edge="start"
        >
          <PersonAdd/>
        </IconButton>
        <ListItemText primary="アカウント作成" />
      </ListItem>
    </React.Fragment>
  )
}
