import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core/'

const Setting: React.FC = () => {
  const navigate = useNavigate()
  const link = useCallback(
    (path: string) => () => {
      navigate(path)
    }, [navigate]
  )

  return (
    <div>
      <h1>ユーザー設定</h1>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button onClick={link('/user/change-userinfo')}>
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
