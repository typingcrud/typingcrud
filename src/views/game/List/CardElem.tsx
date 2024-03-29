import React, { useCallback } from 'react'
import { makeStyles, colors, Grid, Card, CardContent, CardActions, IconButton, Menu, MenuItem } from '@material-ui/core'
import { PlayCircleFilled, Delete, MoreHoriz, Edit } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, thunkActions, useAppSelector } from 'state'

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
  gameUserId: string
  children: any
}

export const CardElem: React.FC<Props> = ({ gameUserId, index, children }) => {
  const navigate = useNavigate()
  const link = (index: string) => () => {
    navigate('/games/' + index)
  }

  const { isExist } = useAppSelector(state => state.gameList)
  const { userId } = useAppSelector(state => state.auth)

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
      if (gameUserId === userId) {
        if (window.confirm('削除しますか')) {
          handleClose()
          dispatch(thunkActions.gameList.deleteGame({index, gameUserId}))
        }
      } else {
        console.error('自分のゲーム以外を削除しようとした')
      }
    }, [dispatch, gameUserId, index, userId]
  )

  const editGame = useCallback(
    () => {
      handleClose()
      navigate('/games/edit/' + index)
    }, [navigate, index]
  )

  return (
    <Grid item xs={4} className={classes.grid}>
      <Card className={classes.card}>
        {isExist &&
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
                <Edit /> <span className={classes.space} /> 編集
            </MenuItem>
              <MenuItem onClick={deleteGame}>
                <Delete /> <span className={classes.space} /> 削除
            </MenuItem>
            </Menu>
          </CardActions>
        }
        <CardContent className={classes.cardContent}>
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
