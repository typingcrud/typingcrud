import React, { useCallback } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useAppDispatch, thunkActions, actions } from 'state'
import { useDropzone } from 'react-dropzone';
import './dropzone.css'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginLeft: 10,
      marginTop: 10,
      display: 'inline-block'
    }
  }),
);

const Image: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles();
  
  type ChangeUserInfo = {
    userName: string
    imgType: string
    img64: string
  }

  let imgdata: ChangeUserInfo = {
    userName: "Karasawa",
    imgType: "",
    img64: "0"
  }

  const postImage = useCallback(
    () => dispatch(thunkActions.setting.changeUserInfo()),[dispatch, imgdata]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.onabort = () => console.error('こちらのファイルは対応していません')
    reader.onerror = () => console.error('ファイルの受け取りに失敗しました')
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = () => {
      const encodedImg: string | ArrayBuffer | null = reader.result
      imgdata.imgType = acceptedFiles[0].type.split('image/')[1]
      if (typeof (encodedImg) === "string") {
        if (imgdata.imgType === "jpg") {
          imgdata.img64 = encodedImg.replace('data:image/jpg;base64,', '')
        } else if (imgdata.imgType === "jpeg") {
          imgdata.img64 = encodedImg.replace('data:image/jpeg;base64,', '')
        } else if (imgdata.imgType === "png") {
          imgdata.img64 = encodedImg.replace('data:image/png;base64,', '')
        } else {
          imgdata.img64 = ""
        }
      }
      dispatch(actions.setting.changeUserInfo(imgdata))
    }
  }, [dispatch])
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <h1>アイコン画像設定</h1>
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
        Upload
      </Button>
    </React.Fragment>
  )
}

export default Image
