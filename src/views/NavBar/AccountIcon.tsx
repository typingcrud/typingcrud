import React, { useCallback } from 'react'
import { Typography, IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import { AccountCircle, ExitToApp } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, thunkActions } from 'state'

export const AccountIcon: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.auth.userInfo)
  let userImg = ''
  if (userInfo.imgOwn === '1') {
    userImg = `data:image/${userInfo.imgType};base64,${userInfo.img64}`
  }

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
      navigate(path)
      setAnchorEl(null)
    }, [navigate]
  )

  const logoutClose = useCallback(
    () => {
      setAnchorEl(null)
      dispatch(thunkActions.auth.signOut())
      navigate('/')
    }, [dispatch, navigate]
  )

  return (
    <div style={{marginLeft: '2%', marginRight: '2%', textAlign: 'center'}}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={userImg} style={{ width: 60, height: 60 }} />
      </IconButton>
      <Typography variant="body2" color='textSecondary' style={{ marginBottom: '4%' }} noWrap>
        {userInfo.userName}
      </Typography>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        open={useropen}
        onClose={handleClose}
      >
        <MenuItem onClick={() => linkClose('/user')}>
          <IconButton>
            <AccountCircle />
          </IconButton>
          ユーザー設定
        </MenuItem>
        <MenuItem onClick={logoutClose}>
          <IconButton >
            <ExitToApp />
          </IconButton>
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  )
}
