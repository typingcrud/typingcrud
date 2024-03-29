import React, { useCallback } from 'react'
import { makeStyles, Grid, Container, IconButton, Paper } from '@material-ui/core'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { langs } from 'utils/languages'
import { useAppSelector, useAppDispatch, actions } from 'state'
import { Editor } from './Editor'
import { Send, ArrowBack } from '@material-ui/icons'
import { NotSend } from 'views/game/Form/NotSend'
import { useNavigate } from 'react-router-dom'
import { Help } from './Help'

const useStyles = makeStyles({
  item: {
    padding: '4%',
    paddingTop: '2%',
    paddingBottom: '1%',
    textAlign: 'center'
  },
  description: {
    padding: '10%',
    paddingTop: '1%',
    paddingBottom: '2%',
    textAlign: 'center'
  },
  icon: {
    padding: '1%',
    textAlign: 'center'
  },
  formControl: {
    padding: '4%',
    minWidth: 120,
  },
  editor: {
    paddingBottom: '1%',
  },
})

type Props = {
  submit: () => void
}

const GameForm: React.FC<Props> = ({ submit }) => {
  const navigate = useNavigate()
  const classes = useStyles()

  const { title, lang, code, codeComment, description } = useAppSelector(state => state.gameForm.game)
  const { isAscii, isFilled } = useAppSelector(state => state.gameForm.valid)

  const dispatch = useAppDispatch()
  const changeCode = useCallback(
    (code: string) => {
      dispatch(actions.gameForm.setCode(code))
    }, [dispatch]
  )
  const changeComment = useCallback(
    (codeComment: string) => {
      dispatch(actions.gameForm.setComment(codeComment))
    }, [dispatch]
  )
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.gameForm.setTitle(e.target.value))
    }, [dispatch]
  )
  const changeDescription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.gameForm.setDescription(e.target.value))
    }, [dispatch]
  )
  const changeLang = useCallback(
    (e: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
      dispatch(actions.gameForm.setLang(e.target.value as string))
    }, [dispatch]
  )

  const back = () => {
    navigate(-1)
  }

  return (
    <Paper elevation={10} square>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item xs={1} className={classes.icon}>
          <IconButton size='medium' color='secondary' onClick={back}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item xs={5} sm={4} className={classes.item}>
          <TextField
            value={title}
            onChange={changeTitle}
            label="Title"
            color="secondary"
          />
        </Grid>
        <Grid item xs={5} sm={4} className={classes.item}>
          <FormControl className={classes.formControl}>
            <InputLabel>Language</InputLabel>
            <Select label="Language" value={lang} onChange={changeLang}>
              <MenuItem value=''>None</MenuItem>
              {langs.map((lang, i) => (
                <MenuItem key={i} value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} className={classes.icon}>
          <Help />
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <TextField
            value={description}
            onChange={changeDescription}
            label="Description"
            color="primary"
            fullWidth
            multiline
          />
        </Grid>
        <Container>
          <Grid container justifyContent='center' alignItems='flex-start' spacing={0}>
            <Grid item xs={12} sm={6} className={classes.editor}>
              <Editor identifier='code' value={code} lang={lang} onValueChange={changeCode} />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.editor}>
              <Editor identifier='comment' value={codeComment} lang={""} onValueChange={changeComment} />
            </Grid>
          </Grid>
          {!isAscii &&
            <Grid item xs={12}>
              <Alert severity="warning">
                <AlertTitle>注意</AlertTitle>
                タイピング対象のソースコードとして投稿できるのは半角英数字及びキーボードに刻印されている特殊記号のみです
              </Alert>
            </Grid>
          }
          <Grid item xs={12} className={classes.icon}>
            {isFilled && isAscii ?
              <IconButton size='medium' color='primary' onClick={submit}><Send /></IconButton>
              :
              <NotSend />
            }
          </Grid>
        </Container>
      </Grid>
    </Paper>
  )
}

export default GameForm
