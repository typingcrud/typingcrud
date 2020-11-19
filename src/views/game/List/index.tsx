import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { CardElem } from './CardElem'
import { Grid, Typography, makeStyles, colors, Paper, Fab } from '@material-ui/core'
import { useSignIn } from 'utils'
import { Add } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  tiles: {
    padding: '1%'
  },
  add: {
    margin: '1%'
  }
})

const GameList: React.FC = () => {
  const history = useHistory()
  const { list, needToReload } = useAppSelector(state => state.gameList)
  const signIn = useSignIn()
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const link = (path: string) => () => {
    history.push(path)
  }

  useEffect(() => {
    if (signIn && needToReload) dispatch(thunkActions.gameList.getGames())
  }, [dispatch, needToReload, signIn])

  useEffect(() => {
    return () => { dispatch(actions.gameList.reset()) }
  }, [dispatch])

  return (
    <Paper elevation={10} square>
      <Grid container justify='center'>
        <Fab className={classes.add} color='secondary' size='small' onClick={link('/games/new')}>
          <Add />
        </Fab>
      </Grid>
      <Grid container justify='center' className={classes.tiles}>
        {list.map((game, index) => {
          return (
            <CardElem key={index} index={game.index}>
            </CardElem>
          )
        })}
      </Grid>
    </Paper>
  )
}

export default GameList
