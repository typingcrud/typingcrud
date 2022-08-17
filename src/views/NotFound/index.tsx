import React from 'react'
import { Paper, Typography, Grid, makeStyles, Button } from '@material-ui/core'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  grid: {
    padding: '1%',
  },
  text: {
    textAlign: 'center'
  },
  button: {
    textAlign: 'center'
  }
})

const knownPath = [
  '/user',
  '/user/change-userinfo',
  '/user/change-email',
  '/user/change-password',
  '/user/delete',
  '/games',
  '/games/new',
]

const NotFound: React.FC = () => {
  const location = useLocation()
  const matchKnownPath: boolean = knownPath.filter((path) => location.pathname === path).length > 0
  const match = useMatch('/games/edit/:id')
  const isFound = matchKnownPath || (match !== null)

  return (
    <Paper elevation={10} square>
      { isFound ? <FoundPath/> : <NotFoundPath/>}
    </Paper>
  )
}

const FoundPath: React.FC = () => {
  const navigate = useNavigate()
  const link = (path: string) => () => {
    navigate(path)
  }

  const classes = useStyles()
  return (
    <Grid container justifyContent='center' className={classes.grid} spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h3' color='secondary' className={classes.text}>
          サインインして下さい
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.button}>
        <Button onClick={link('/singin')} variant='contained'>
          <Typography variant='button' className={classes.text}>
            サインイン
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.button}>
        <Button onClick={link('/signup')} variant='outlined'>
          <Typography variant='button' className={classes.text}>
            アカウント作成
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

const NotFoundPath: React.FC = () => {
  const navigate = useNavigate()
  const link = (path: string) => () => {
    navigate(path)
  }

  const classes = useStyles()
  return (
    <Grid container justifyContent='center' className={classes.grid} spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h3' color='secondary' className={classes.text}>
          ページが見つかりません
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button onClick={link('/')} variant='contained'>
          <Typography variant='button' className={classes.text}>
            ホームに戻る
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotFound
