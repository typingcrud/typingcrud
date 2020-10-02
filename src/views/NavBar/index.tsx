import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector, thunkActions } from 'state'
import { useHistory } from 'react-router-dom'
import { useSignIn } from 'utils'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'

import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
  }),
);

const NavBar: React.FC = () => {
  const signIn = useSignIn()
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
  const classes = useStyles();
  const theme = useTheme();
  const [draweropen, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const useropen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const linkClose = useCallback(
    (path: string) => {
      link(`/${path}`)()
      setAnchorEl(null)
    }, [setAnchorEl, link]
  )

  const linkDrawerClose = useCallback(
    (path: string) => {
      link(`/${path}`)()
      setOpen(false);
    }, [setOpen, link]
  )

  const logoutClose = useCallback(
    () => {
        setAnchorEl(null)
        dispatch(thunkActions.auth.signOut())
        link('/')()
      }, [dispatch, link]
  )

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
          <Typography variant="h6" noWrap onClick={link('/')}>
            TypingCRUD
          </Typography>
          {signIn && (
            <React.Fragment>
              <Typography
                variant="h3"
                noWrap
                style={{
                  marginLeft: 'auto'
                }}
              >
                ようこそ{userInfo.userName}
              </Typography>
              <IconButton
                style={{
                  marginLeft: 'auto'
                }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt='userImage' src={userImg} />
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
                  ユーザー設定{userInfo.userName}
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
          <IconButton onClick={handleDrawerClose}>
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
          <ListItem button onClick={() => linkDrawerClose('Demo')}>
            <ListItemText primary="Demo" />
          </ListItem>
          {signIn ? <SignedIn link={link} linkDrawerClose={linkDrawerClose} /> : <NotSignedIn link={link} linkDrawerClose={linkDrawerClose} />}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => linkDrawerClose('terms')}>
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
        onClick={handleDrawerClose}
        className={clsx(classes.content, {
          [classes.contentShift]: draweropen,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default NavBar
