import React, { useCallback } from 'react'
import { makeStyles, Grid, Container, IconButton, Paper } from '@material-ui/core'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Language } from 'prism-react-renderer'
import { useAppSelector, useAppDispatch, actions } from 'state'
import { Editor } from './Editor'
import { Send, Delete } from '@material-ui/icons'

const useStyles = makeStyles({
  item: {
    margin: '4%',
    marginTop: '2%',
    marginBottom: '1%',
    textAlign: 'center'
  },
  description: {
    margin: '10%',
    marginTop: '1%',
    marginBottom: '2%',
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

type Props = {
  submit: () => void
}

const GameForm: React.FC<Props> = ({ submit }) => {
  const classes = useStyles()

  const { title, lang, code, codeComment, description } = useAppSelector(state => state.gameForm)

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

  const deleteForm = useCallback(
    () => {
      dispatch(actions.gameForm.reset())
    }, [dispatch]
  )

  return (
    <Paper elevation={10} square>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={9} sm={5} className={classes.item}>
          <TextField
            value={title}
            onChange={changeTitle}
            label="Title"
            color="secondary"
          />
        </Grid>
        <Grid item xs={3} className={classes.item}>
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
          <IconButton size='medium' color='secondary' onClick={deleteForm}>
            <Delete />
          </IconButton>
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
          <Grid container justify='center' alignItems='flex-start' spacing={0}>
            <Grid item xs={12} sm={6} className={classes.editor}>
              <Editor identifier='comment' value={codeComment} lang={""} onValueChange={changeComment} />
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

export default GameForm
