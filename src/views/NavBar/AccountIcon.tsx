import React, { useCallback } from 'react'
import { Typography, IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import { AccountCircle, ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector, thunkActions } from 'state'

export const AccountIcon: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.auth.userInfo)
  let userImg = ''
  if (userInfo.imgOwn === '1') {
    userImg = `data:image/${userInfo.imgType};base64,${userInfo.img64}`
  }

  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const useropen = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const linkClose = useCallback(
    (path: string) => {
      link(`/${path}`)()
      setAnchorEl(null)
    }, [setAnchorEl, link]
  )

  const logoutClose = useCallback(
    () => {
      setAnchorEl(null)
      dispatch(thunkActions.auth.signOut())
      link('/')()
    }, [dispatch, link]
  )

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        noWrap
        style={{
          marginLeft: 'auto',
          fontSize: 18
        }}
      >
        {userInfo.userName}
      </Typography>
      <IconButton
        style={{
          //marginLeft: 'auto'
        }}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          src={userImg}
          style={{
            width: 80,
            height: 80
          }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={useropen}
        onClose={handleClose}
      >
        <MenuItem onClick={() => linkClose('user')}>
          <IconButton
            onClick={() => linkClose('user')}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          ユーザー設定
        </MenuItem>
        <MenuItem onClick={logoutClose}>
          <IconButton
            onClick={() => linkClose('user')}
            color="inherit"
          >
            <ExitToApp />
          </IconButton>
          ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
