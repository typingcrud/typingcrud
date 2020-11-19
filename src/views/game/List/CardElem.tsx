import React, { useCallback } from 'react'
import { makeStyles, colors, Grid, Card, CardContent, CardActions, IconButton, Menu, MenuItem } from '@material-ui/core'
import { PlayCircleFilled, Delete, MoreHoriz, Edit } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, thunkActions } from 'state'

const useStales = makeStyles({
  card: {
    backgroundColor: colors.grey[200],
  },
  grid: {
    padding: '1%',
  },
  cardContent: {
    textAlign: 'center'
  },
  grow: {
    flexGrow: 1,
  },
  space: {
    marginLeft: 8
  }
})

type Props = {
  index: string
}

export const CardElem: React.FC<Props> = ({ index, children }) => {
  const history = useHistory()
  const link = (index: string) => () => {
    history.push('/games/' + index)
  }

  const classes = useStales()
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const deleteGame = useCallback(
    () => {
      if (window.confirm('削除しますか')) {
        handleClose()
        dispatch(thunkActions.gameList.deleteGame(index))
      }
    }, [dispatch, index]
  )

  const editGame = useCallback(
    () => {
      handleClose()
      history.push('/games/edit/' + index)
    }, [history, index]
  )

  return (
    <Grid item xs={4} className={classes.grid}>
      <Card className={classes.card}>
        <CardActions>
          <IconButton color='primary' onClick={link(index)}>
            <PlayCircleFilled />
          </IconButton>
          <div className={classes.grow} />
          <IconButton
            color='primary'
            aria-label="more"
            aria-controls="card-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={editGame}>
              <Edit /> <span className={classes.space}/> 編集
            </MenuItem>
            <MenuItem onClick={deleteGame}>
              <Delete /> <span className={classes.space}/> 削除
            </MenuItem>
          </Menu>
        </CardActions>
        <CardContent className={classes.cardContent}>
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
