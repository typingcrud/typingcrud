import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles, Grid, Container, Paper, colors } from '@material-ui/core'
import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'
import { Code } from './Code'
import { Comment } from './Comment'

const useStyles = makeStyles({
  typography: {
    margin: '1%',
    marginTop: '5%',
    marginBottom: '2%',
    textAlign: 'center'
  },
  description: {
    margin: '8%',
    marginTop: '2%',
    marginBottom: '3%',
    whiteSpace: 'pre-wrap',
    color: colors.grey[400]
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
          <Typography variant='h4' className={classes.typography}>{game.title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='body1' className={classes.typography}>{game.lang}</Typography>
        </Grid>
        {game.description !== "" &&
          <Grid item xs={12}>
            <Typography variant='body2' className={classes.description}>{game.description}</Typography>
          </Grid>
        }
        <Container>
          <Grid container justify='center' alignItems='flex-start' spacing={0}>
            <Grid item xs={12} sm={6}>
              <Code />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Comment />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Paper>
  )
}

export default GamePlay
