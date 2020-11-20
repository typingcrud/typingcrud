import React, { useEffect } from 'react'
import { makeStyles, colors, Grid, Card, CardContent, CardActions, IconButton, Paper, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { PlayCircleFilled } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

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
  card: {
    backgroundColor: colors.grey[200],
  },
  grid: {
    padding: '1%',
  },
  cardContent: {
    textAlign: 'center'
  },
})

const Home: React.FC = () => {
  const { list } = useAppSelector(state => state.homeList)
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const history = useHistory()
  const link = (path: string) => () => {
    history.push(path)
  }

  useEffect(() => {
    dispatch(thunkActions.homeList.getHomeGames())
  }, [dispatch])

  useEffect(() => {
    return () => { dispatch(actions.homeList.reset()) }
  }, [dispatch])

  const formatDescription = (description: string) => {
    const resStr = description.split('\n').filter((_, k) => k < 2).join('\n')
    const continueStr = description.split('\n').length > 2 ? '...' : ''
    return resStr + continueStr
  }

  return (
    <Paper elevation={10} square>
      <Grid container justify='center' className={classes.tiles}>
        {list.map((game, index) => {
          return (
            <Grid item xs={4} className={classes.grid} key={index}>
              <Card className={classes.card}>
                <CardActions>
                  <IconButton color='primary' onClick={link(`/games/${game.index}`)}>
                    <PlayCircleFilled />
                  </IconButton>
                </CardActions>
                <CardContent className={classes.cardContent}>
                  <Grid container justify='space-around' alignItems='center' spacing={3}>
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
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Paper>
  )
}

export default Home
