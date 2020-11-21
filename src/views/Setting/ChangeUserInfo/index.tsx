import React, { useCallback, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button, Input, InputLabel, FormControl } from '@material-ui/core'
import { useAppSelector, useAppDispatch, thunkActions, actions } from 'state'
import { useDropzone } from 'react-dropzone'
import './dropzone.css'

let buttonFlag = true
let b64 = ""

const useStyles = makeStyles(() =>
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
    imgBoxContainer: {
      overflow: 'hidden',
    },
    imgBox: {
      float: 'left'
    }
  }),
)

const Image: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { userName, img64 } = useAppSelector(state => state.setting.changeUserInfo)
  const { userName: oldUserName } = useAppSelector(state => state.auth.userInfo)

  const handleUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeUserName(e.target.value))
    }, [dispatch]
  )

  const uploadImage = useCallback(
    () => {
      if (userName !== '' && img64 !== '') dispatch(thunkActions.setting.changeUserInfo('img'))
      b64 = ""
    }, [dispatch, img64, userName]
  )

  const changeName = useCallback(
    () => {
      if (userName !== '') dispatch(thunkActions.setting.changeUserInfo('name'))
    }, [dispatch, userName]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.onabort = () => console.error('こちらのファイルは対応していません')
    reader.onerror = () => console.error('ファイルの受け取りに失敗しました')
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = () => {
      const encodedImg: string | ArrayBuffer | null = reader.result
      const imgType = acceptedFiles[0].type.split('image/')[1]
      buttonFlag = false
      if (typeof (encodedImg) === 'string') {
        b64 = encodedImg
        dispatch(actions.setting.changeUserInfo({
          userName: userName,
          img64: encodedImg.replace(`data:image/${imgType};base64,`, ''),
          imgType: imgType
        }))
      }
    }
  }, [dispatch, userName])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    dispatch(actions.setting.changeUserInfo({
      img64: '',
      imgType: '',
      userName: oldUserName
    }))
  }, [dispatch, oldUserName])

  return (
    <React.Fragment>
      <div>
        <h1>ユーザー名変更</h1>
        <FormControl className={classes.form}>
          <InputLabel>ユーザー名</InputLabel>
          <Input
            id='userName'
            value={userName}
            onChange={handleUserName}
          />
        </FormControl>
        <Button variant="outlined" className={classes.button} onClick={changeName}>
          変更
        </Button>
      </div>
      <h1>アイコン画像変更</h1>
      <p>枠をクリックするかドラッグ&ドロップで画像を選択してください</p>
      <p>アップロードできる画像の形式は「jpg(jpeg)、png、gif、svgです」</p>
      <div className={classes.imgBoxContainer}>
        <div {...getRootProps({ className: 'dropzone' })} >
          <input {...getInputProps()} accept="image/jpeg,image/png,image/jpg,image/gif,image/svg" />
        </div>
        {b64 === "" ? null : <img className={classes.imgBox} src={b64} alt="img" width="300px" height="300px" />}
      </div>
      <Button variant="outlined" className={classes.button} onClick={uploadImage} disabled={buttonFlag} >
        アップロード
      </Button>
    </React.Fragment>
  )
}

export default Image
