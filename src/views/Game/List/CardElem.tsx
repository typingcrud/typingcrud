import React, { useCallback } from 'react'
import { makeStyles, colors, Grid, Card, CardContent, CardActions, IconButton } from '@material-ui/core'
import { PlayCircleFilled, Delete } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, thunkActions } from 'state'

const useStales = makeStyles({
  card: {
    backgroundColor: colors.grey[200],
  },
  grid: {
    margin: 10,
  },
  cardContent: {
    textAlign: 'center'
  },
  grow: {
    flexGrow: 1,
  },
})

type Props = {
  index: string
}

export const CardElem: React.FC<Props> = ({index: id, children}) => {
  const history = useHistory()
  const link = (id: string) => () => {
    history.push('games/' + id)
  }

  const classes = useStales()
  const dispatch = useAppDispatch()

  const deleteGame = useCallback(
    () => {
      dispatch(thunkActions.gameList.deleteGame(id))
    }, [dispatch, id]
  )

  return (
    <Grid item xs={2} className={classes.grid}>
      <Card className={classes.card}>
        <CardActions>
          <IconButton color='primary' onClick={link(id)}>
            <PlayCircleFilled/>
          </IconButton>
          <div className={classes.grow}/>
          <IconButton color='primary' onClick={deleteGame}>
            <Delete/>
          </IconButton>
        </CardActions>
        <CardContent className={classes.cardContent}>
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
