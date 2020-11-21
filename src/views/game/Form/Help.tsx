import React from 'react'
import { Popover, IconButton, List, ListItem, ListItemText } from '@material-ui/core'
import { HelpOutline, Send } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

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

export const Help: React.FC = () => {
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
        color='secondary'
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <HelpOutline />
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
        <List>
          <ListItem>
            <ListItemText primary='Title: タイトル 【必須】'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='Language: プログラミング言語'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='Description: コードの概要など'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='code: タイピング対象のソースコード 【必須】'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='comment: ソースコードの説明'/>
          </ListItem>
          <ListItem>
            <Send /><ListItemText primary=': 送信ボタン （Title と code を入力しないと押せません）'/>
          </ListItem>
        </List> 
      </Popover>
    </div>
  )
}

