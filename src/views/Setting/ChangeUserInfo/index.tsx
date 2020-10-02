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
  changeUserInfo.userName = useAppSelector(state => state.auth.userInfo.userName)
  const limitSize = 1024 * 1024

  const handleUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      dispatch(actions.setting.changeUserName(e.target.value))
    }, [dispatch]
  )

  const postImage = useCallback(
    (m: string) => {
      if (changeUserInfo.img64 !== "") {
        dispatch(thunkActions.setting.changeUserInfo(m))
      } else if (changeUserInfo.userName !== "") {
        dispatch(thunkActions.setting.changeUserInfo(m))
      }
    }, [dispatch, changeUserInfo.img64, changeUserInfo.userName]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].size <= limitSize) {
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
          } else if (changeUserInfo.imgType === "gif") {
            changeUserInfo.img64 = encodedImg.replace('data:image/gif;base64,', '')
          } else if (changeUserInfo.imgType === "svg") {
            changeUserInfo.img64 = encodedImg.replace('data:image/svg;base64,', '')
          } else {
            changeUserInfo.img64 = ""
          }
        }
        dispatch(actions.setting.changeUserInfo(changeUserInfo))
      }
    } else {
      console.warn('ファイルサイズが大きすぎます')
    }
  }, [dispatch, changeUserInfo, limitSize])
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
        <Button variant="outlined" className={classes.button} onClick={() => postImage('name')}>
          変更
        </Button>
      </div>
      <h1>アイコン画像変更</h1>
      <div
        {...getRootProps({ className: 'dropzone' })}
      >
        <input
            {...getInputProps()}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
        />
        <p>画像ファイルをドラッグ&ドロップするか枠をクリックしてファイルを選択してください</p>
        <p>対応する拡張子は「jpg, jpeg, png, gif, svg」のみです</p>
        <p>ファイルサイズは1MBまでとなります</p>
      </div>
      <Button variant="outlined" className={classes.button} onClick={() => postImage('img')}>
        アップロード
      </Button>
    </React.Fragment>
  )
}

export default Image
