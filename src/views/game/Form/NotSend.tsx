import React from 'react'
import { Popover, Typography, IconButton, colors } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from 'state'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
)

export const NotSend: React.FC = () => {
  const { valid } = useAppSelector(state => state.gameForm)

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <IconButton
        size='medium'
        style={{ color: colors.grey[700] }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Send />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        { !valid.isAscii &&
          <Typography>
            コードにかけるのは半角英数字及び記号のみです
          </Typography>
        }
        { !valid.isFilled &&
          <Typography>
            タイトルとソースコードは必須項目です
          </Typography>
        }
      </Popover>
    </div>
  )
}
