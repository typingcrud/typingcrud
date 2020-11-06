import React, { useCallback } from 'react'
import { makeStyles, Grid, Container, IconButton, Paper } from '@material-ui/core'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Language } from 'prism-react-renderer'
import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'
import { Editor } from './Editor'
import { Send, Delete } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  item: {
    margin: '4%',
    textAlign: 'center'
  },
  icon: {
    margin: '1%',
    textAlign: 'center'
  },
  formControl: {
    margin: '4%',
    minWidth: 120,
  },
  editor: {
    marginBottom: '1%',
  },
})

const langs: Language[] = [
  "markup",
  "bash",
  "clike",
  "c",
  "cpp",
  "css",
  "javascript",
  "jsx",
  "coffeescript",
  "actionscript",
  "css-extr",
  "diff",
  "git",
  "go",
  "graphql",
  "handlebars",
  "json",
  "less",
  "makefile",
  "markdown",
  "objectivec",
  "ocaml",
  "python",
  "reason",
  "sass",
  "scss",
  "sql",
  "stylus",
  "tsx",
  "typescript",
  "wasm",
  "yaml",
]

const GameNew: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const { title, lang, code, codeComment: comment } = useAppSelector(state => state.gameForm)

  const dispatch = useAppDispatch()
  const changeCode = useCallback(
    (code: string) => {
      dispatch(actions.gameForm.setCode(code))
    }, [dispatch]
  )
  const changeComment = useCallback(
    (comment: string) => {
      dispatch(actions.gameForm.setComment(comment))
    }, [dispatch]
  )
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.gameForm.setTitle(e.target.value))
    }, [dispatch]
  )
  const changeLang = useCallback(
    (e: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
      dispatch(actions.gameForm.setLang(e.target.value as string))
    }, [dispatch]
  )

  const deleteForm = useCallback(
    () => {
      dispatch(actions.gameForm.reset())
    }, [dispatch]
  )
  const submit = useCallback(
    () => {
      dispatch(thunkActions.gameForm.submit())
        .then(() => {
          history.push('/games')
        })
        .catch((reason) => {
          console.error(reason)
        })
    }, [dispatch, history]
  )

  return (
    <Paper elevation={10} square>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={9} sm={5} className={classes.item}>
          <TextField
            value={title}
            onChange={changeTitle}
            label="Title"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <FormControl variant="outlined" className={classes.formControl}>
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
          <IconButton size='medium' color='secondary' onClick={deleteForm}>
            <Delete />
          </IconButton>
        </Grid>
        <Container>
          <Grid container justify='center' alignItems='flex-start' spacing={0}>
            <Grid item xs={12} sm={6} className={classes.editor}>
              <Editor identifier='comment' value={comment} lang={""} onValueChange={changeComment} />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.editor}>
              <Editor identifier='code' value={code} lang={lang} onValueChange={changeCode} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.icon}>
            <IconButton size='medium' color='primary' onClick={submit}>
              <Send />
            </IconButton>
          </Grid>
        </Container>
      </Grid>
    </Paper>
  )
}

export default GameNew
