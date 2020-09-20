import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const Setting: React.FC = () => {
  const history = useHistory()
  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )

  return (
    <div>
      <h1>ユーザー設定</h1>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button onClick={link('/user/image')}>
          <ListItemText primary="ユーザー情報の変更" />
        </ListItem>
        <ListItem button onClick={link('/user/change-email')}>
          <ListItemText primary="メールアドレスの変更" />
        </ListItem>
        <ListItem button onClick={link('/user/change-password')}>
          <ListItemText primary="パスワードの変更" />
        </ListItem>
        <Divider />
        <ListItem button onClick={link('/user/delete')}>
          <ListItemText primary="アカウント削除" />
        </ListItem>
      </List>
    </div>
  )
}

export default Setting
