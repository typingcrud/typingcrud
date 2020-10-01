import React, { useCallback } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { useDropzone } from 'react-dropzone';
import './dropzone.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 20,
      display: 'inline-block'
    },
    button: {
      marginLeft: 10,
      marginTop: 10,
      display: 'inline-block'
    },
  }),
);

const Image: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles();
  const { ...changeUserInfo } = useAppSelector(state => state.setting.changeUserInfo)

  const handleUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeUserName(e.target.value))
    }, [dispatch]
  )

  const postImage = useCallback(
    () => {
      if (changeUserInfo.img64 !== "0") {
        dispatch(thunkActions.setting.changeUserInfo())
      }
    }, [dispatch, changeUserInfo.img64]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.onabort = () => console.error('こちらのファイルは対応していません')
    reader.onerror = () => console.error('ファイルの受け取りに失敗しました')
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = () => {
      const encodedImg: string | ArrayBuffer | null = reader.result
      changeUserInfo.imgType = acceptedFiles[0].type.split('image/')[1]
      if (typeof (encodedImg) === "string") {
        if (changeUserInfo.imgType === "jpg") {
          changeUserInfo.img64 = encodedImg.replace('data:image/jpg;base64,', '')
        } else if (changeUserInfo.imgType === "jpeg") {
          changeUserInfo.img64 = encodedImg.replace('data:image/jpeg;base64,', '')
        } else if (changeUserInfo.imgType === "png") {
          changeUserInfo.img64 = encodedImg.replace('data:image/png;base64,', '')
        } else {
          changeUserInfo.img64 = ""
        }
      }
      dispatch(actions.setting.changeUserInfo(changeUserInfo))
    }
  }, [dispatch, changeUserInfo])
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <div>
        <h1>ユーザー名変更</h1>
        <FormControl className={classes.form}>
          <InputLabel>ユーザー名</InputLabel>
          <Input
            id='userName'
            value={changeUserInfo.userName}
            onChange={handleUserName}
          />
        </FormControl>
        <Button variant="outlined" className={classes.button} onClick={postImage}>
          変更
        </Button>
      </div>
      <h1>アイコン画像変更</h1>
      <div
        className="droparea"
        {...getRootProps({ className: 'dropzone' })}
      >
        <input
            {...getInputProps()}
            accept="image/jpeg,image/png,image/jpg"
        />
        <p>画像ファイルをドラッグ&ドロップするか枠をクリックしてファイルを選択してください</p>
      </div>
      <Button variant="outlined" className={classes.button} onClick={postImage}>
        アップロード
      </Button>
    </React.Fragment>
  )
}

export default Image
