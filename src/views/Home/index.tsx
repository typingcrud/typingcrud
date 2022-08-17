import React, { useEffect, useCallback } from 'react'
import { makeStyles, colors, Grid, Card, CardContent, CardActions, IconButton, Paper, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { PlayCircleFilled } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@material-ui/lab'
import { Description } from './Description'

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
  page: {
    margin: '2%',
  },
  header: {

  },
})

const Home: React.FC = () => {
  const { list, page, maxPage } = useAppSelector(state => state.homeList)
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const link = (path: string) => () => {
    navigate(path)
  }

  const changePage = useCallback(
    (_: any, value: number) => {
      dispatch(actions.homeList.setPage(value))
    }, [dispatch]
  )

  useEffect(() => {
    dispatch(thunkActions.homeList.getHomeGames())
  }, [dispatch, page])

  useEffect(() => {
    return () => { dispatch(actions.homeList.reset()) }
  }, [dispatch])

  const formatDescription = (description: string) => {
    const resStr = description.split('\n').filter((_, k) => k < 2).join('\n')
    const continueStr = description.split('\n').length > 2 ? '...' : ''
    return resStr + continueStr
  }

  return (
    <React.Fragment>
      <Description />
      <Paper elevation={10} square>
        <Grid container justifyContent='center' className={classes.tiles}>
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
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        <Grid container justifyContent='center'>
          <Pagination color='primary' variant='outlined' count={maxPage} page={page} onChange={changePage} className={classes.page} />
        </Grid>
      </Paper>
    </React.Fragment>
  )
}

export default Home
