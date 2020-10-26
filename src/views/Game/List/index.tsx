import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch, thunkActions } from 'state'
import { CardElem } from './CardElem'
import { Grid, Typography, makeStyles, colors } from '@material-ui/core'

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    color: colors.grey[800],
  },
  lang: {
    fontSize: 12,
    margin: 12,
    color: colors.grey[600],
  }
})

const GameList: React.FC = () => {
  const gameList = useAppSelector(state => state.gameList)
  const classes = useStyles()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunkActions.gameList.getGames())
  }, [dispatch])

  return (
    <Grid container justify='center'>
      { gameList.map((game, index) => {
        return (
          <CardElem key={index} index={game.index}>
            <Typography className={classes.title} color='textPrimary'>
              {game.title}
            </Typography>
            <Typography className={classes.lang} color='textSecondary'>
              {game.lang}
            </Typography>
          </CardElem>
        )
      }) }
    </Grid>
  )
}

export default GameList
