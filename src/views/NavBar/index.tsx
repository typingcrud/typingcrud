import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSignIn } from 'utils'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'
import { AccountIcon } from 'views/NavBar/AccountIcon'

import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import { Drawer, CssBaseline, AppBar, Toolbar, List, Divider, IconButton, ListItem, ListItemText, Button, Typography } from '@material-ui/core'
import { Menu, ChevronLeft, ChevronRight, Home, Help } from '@material-ui/icons'

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
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
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
)

const NavBar: React.FC = () => {
  const signIn = useSignIn()
  const history = useHistory()

  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )
  const classes = useStyles()
  const theme = useTheme()
  const [draweropen, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const linkDrawerClose = useCallback(
    (path: string) => {
      history.push(path)
      setOpen(false)
    }, [history]
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
            <Menu />
          </IconButton>
          <Button onClick={link('/')} style={{ padding: 0 }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo_transparent.png`}
              style={{
                fontSize: 18,
                width: 130,
                height: 90,
                cursor: 'pointer'
              }}
              alt='logo'
            />
          </Button>
          {signIn ?
            <React.Fragment>
              <div style={{ marginLeft: 'auto' }}>
                <Button onClick={link('/games')} variant='contained'>
                  <Typography variant='button' color='inherit'>マイゲーム</Typography>
                </Button>
              </div>
              <AccountIcon />
            </React.Fragment>
            :
            <div style={{ marginLeft: 'auto' }}>
              <Button onClick={link('/signin')} style={{ margin: 10 }}>ログイン</Button>
              <Button onClick={link('/signup')} variant='outlined' style={{ margin: 10 }}>アカウント作成</Button>
            </div>
          }
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
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => linkDrawerClose('/')}>
            <IconButton
              color="inherit"
              edge="start"
            >
              <Home />
            </IconButton>
            <ListItemText primary="ホーム" />
          </ListItem>
          {signIn ? <SignedIn linkDrawerClose={linkDrawerClose} /> : <NotSignedIn linkDrawerClose={linkDrawerClose} />}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => linkDrawerClose('terms')}>
            <ListItemText primary="規約・ポリシー" />
          </ListItem>
          <ListItem button onClick={() => linkDrawerClose('/help')}>
            <IconButton
              color="inherit"
              edge="start"
            >
              <Help />
            </IconButton>
            <ListItemText primary="ヘルプ・お問い合わせ" />
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
  )
}

export default NavBar
