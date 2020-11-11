import React, { useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector, thunkActions } from 'state'
import { useHistory } from 'react-router-dom'
import { useSignIn } from 'utils'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'

import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpIcon from '@material-ui/icons/Help'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Avatar from '@material-ui/core/Avatar'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#444'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      color: 'white'
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#444',
      color: 'white'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      //paddingLeft: theme.spacing(32),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    breadcrumb: {
      marginLeft: '250px'
    }
  }),
)

const NavBar: React.FC = () => {
  const signIn = useSignIn()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.auth.userInfo)
  let userImg = ''
  if (userInfo.imgOwn === '1') {
    userImg = `data:image/${userInfo.imgType}base64,${userInfo.img64}`
  }

  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )
  const classes = useStyles();
  const theme = useTheme();
  const [draweropen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pathName, setPathName] = useState([''])
  const useropen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

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

  const linkDrawerClose = useCallback(
    (path: string) => {
      link(`/${path}`)()
      setOpen(false)
    }, [setOpen, link]
  )

  const logoutClose = useCallback(
    () => {
      setAnchorEl(null)
      dispatch(thunkActions.auth.signOut())
      link('/')()
    }, [dispatch, link]
  )

  useEffect(() => {
    if (history.location.pathname !== '/') {
      setPathName(history.location.pathname.split('/'))
    } else {
      setPathName(['homePath'])
    }
    history.listen((location: any) => {
      if (history.location.pathname !== '/') {
        setPathName(history.location.pathname.split('/'))
      } else {
        setPathName(['homePath'])
      }
    })
  }, [history])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: draweropen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, draweropen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={`${process.env.PUBLIC_URL}/img/logo_transparent.png`}
            style={{
              fontSize: 18,
              width: 160,
              height: 100,
              cursor: 'pointer'
            }}
            alt='logo'
            onClick={() => linkDrawerClose('')}
          />
          {signIn && (
            <React.Fragment>
              <Fab color='secondary' size='small' onClick={link('/games/new')}>
                <Add/>
              </Fab>
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
                  alt='userImage'
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
                    <ExitToAppIcon />
                  </IconButton>
                  ログアウト
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={draweropen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerClose}
            style={{
              color: 'white'
            }}
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => linkDrawerClose('')}>
            <IconButton
              color="inherit"
              edge="start"
            >
              <HomeIcon />
            </IconButton>
            <ListItemText primary="ホーム" />
          </ListItem>
          {signIn ? <SignedIn link={link} linkDrawerClose={linkDrawerClose} /> : <NotSignedIn link={link} linkDrawerClose={linkDrawerClose} />}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => linkDrawerClose('terms')}>
            <IconButton
              color="inherit"
              edge="start"
            >
              <AssignmentIcon />
            </IconButton>
            <ListItemText primary="規約" />
          </ListItem>
          <ListItem button onClick={() => linkDrawerClose('help')}>
            <IconButton
              color="inherit"
              edge="start"
            >
              <HelpIcon />
            </IconButton>
            <ListItemText primary="ヘルプ" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: draweropen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Breadcrumbs aria-label="breadcrumb" className={clsx(classes.breadcrumb)}>
          <Link color="inherit" onClick={link('/')}>
            <Typography color="textPrimary">/ ホーム</Typography>
          </Link>
          {/* eslint-disable-next-line */}
          {pathName.map((path, index) => {
            if (index !== 0) {
              let to = ''
              switch (path) {
                case 'game':
                  path = 'ゲーム'
                  to = '/game'
                  break
                case 'play':
                  path = '一覧'
                  to = '/game/list'
                  break
                case 'edit':
                  path = '一覧'
                  to = '/game/list'
                  break
                case 'post':
                  path = '作成'
                  to = '/game/post'
                  break
                case 'list':
                  path = '一覧'
                  to = '/game/list'
                  break
                case 'user':
                  path = 'ユーザー設定'
                  to = '/user'
                  break
                case 'change-userinfo':
                  path = 'ユーザー名、アイコン画像変更'
                  to = '/user/change-userinfo'
                  break
                case 'change-email':
                  path = 'メールアドレス変更'
                  to = '/user/change-email'
                  break
                case 'change-password':
                  path = 'パスワード変更'
                  to = '/user/change-password'
                  break
                case 'delete':
                  path = 'アカウント削除'
                  to = '/user/delete'
                  break
                case 'terms':
                  path = '規約'
                  to = '/user/terms'
                  break
                case 'help':
                  path = 'ヘルプ'
                  to = '/user/help'
                  break
                default:
                  to = history.location.pathname
                  break
              }
              return (
                <Link onClick={link(`${to}`)} key={index}>
                  <Typography color="textPrimary">{path}</Typography>
                </Link>
              )
            } else if (index === 0 && path === 'homePath') {
              //eslint-disable-next-line
              return
            }
          })}
        </Breadcrumbs>
        <hr></hr>
      </main>
    </div>
  )
}

export default NavBar
