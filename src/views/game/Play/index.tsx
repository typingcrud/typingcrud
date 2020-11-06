import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles, Grid, Container, Paper } from '@material-ui/core'
import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'
import { Code } from './Code'
import { Comment } from './Comment'

const useStyles = makeStyles({
  typography: {
    marginTop: '5%',
    textAlign: 'center'
  }
})

const GamePlay: React.FC = () => {
  const { id: index } = useParams()
  const game = useAppSelector(state => state.gamePlay)
  const classes = useStyles()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(thunkActions.gamePlay.getGame({ index }))

    return () => { dispatch(actions.gamePlay.reset()) }
  }, [dispatch, index])

  return (
    <Paper elevation={10} square>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={9} sm={5}>
          <Typography variant='h4' gutterBottom className={classes.typography}>{game.title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom className={classes.typography}>{game.lang}</Typography>
        </Grid>
        <Container>
          <Grid container justify='center' alignItems='flex-start' spacing={0}>
            <Grid item xs={12} sm={6}>
              <Comment />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Code />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Paper>
  )
}

export default GamePlay
