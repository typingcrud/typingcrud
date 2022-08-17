import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { CardElem } from './CardElem'
import { Grid, makeStyles, colors, Paper, Fab, Typography } from '@material-ui/core'
import { useSignIn } from 'utils'
import { Add } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  tiles: {
    padding: '1%'
  },
  title: {
    fontSize: 20,
    color: colors.grey[900]
  },
  lang: {
    fontSize: 12,
    color: colors.grey[500]
  },
  description: {
    fontSize: 12,
    textAlign: 'left',
    color: colors.grey[700],
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  add: {
    margin: '1%'
  }
})

const GameList: React.FC = () => {
  const navigate = useNavigate()
  const { list, needToReload } = useAppSelector(state => state.gameList)
  const signIn = useSignIn()
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const link = (path: string) => () => {
    navigate(path)
  }

  const formatDescription = (description: string) => {
    const resStr = description.split('\n').filter((_, k) => k<2).join('\n')
    const continueStr = description.split('\n').length > 2 ? '...' : ''
    return resStr + continueStr
  }

  useEffect(() => {
    if (signIn && needToReload) dispatch(thunkActions.gameList.getGames())
  }, [dispatch, needToReload, signIn])

  useEffect(() => {
    return () => { dispatch(actions.gameList.reset()) }
  }, [dispatch])

  return (
    <Paper elevation={10} square>
      <Grid container justifyContent='center'>
        <Fab className={classes.add} color='secondary' size='small' onClick={link('/games/new')}>
          <Add />
        </Fab>
      </Grid>
      <Grid container justifyContent='center' className={classes.tiles}>
        {list.map((game, index) => {
          return (
            <CardElem key={index} index={game.index} gameUserId={game.userId}>
              <Grid container justifyContent='space-around' alignItems='center' spacing={3}>
                <Grid item xs={8}>
                  <Typography className={classes.title}>{game.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.lang}>{game.lang}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.description}>{formatDescription(game.description)}</Typography>,
                </Grid>
              </Grid>
            </CardElem>
          )
        })}
      </Grid>
    </Paper>
  )
}

export default GameList
