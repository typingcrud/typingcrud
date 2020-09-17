import React, { useCallback } from 'react'
import { useAppDispatch, thunkActions } from 'state'
import { Imgdata } from 'state/setting/image'
//import Dropzone from 'react-dropzone';
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')


const Image: React.FC = () => {
  const dispatch = useAppDispatch()

  let imgdata: Imgdata = {
    img64: "",
    userName: "Karasawa",
    imgType: "",
    imgOwn: "0"
  }

  const postImage = useCallback(
    () => {
      if (imgdata.img64 !== "") {
        imgdata.imgOwn = "1"
      }
      dispatch(thunkActions.setting.image({ imgdata }))
    },[dispatch, imgdata]
  )

  const handleImage = (f: FileList | null) => {
    const r = new FileReader()
    let imgf: any = ""
    if (f !== null) {
      imgf = f
    }
    r.readAsDataURL(imgf[0])
    r.onload = () => {
      let encodedImg: string | ArrayBuffer | null = r.result
      imgdata.imgType = imgf[0].type.split('image/')[1]
      if (typeof (encodedImg) === "string") {
        if (imgdata.imgType === "jpg") {
          imgdata.img64 = encodedImg.replace('data:image/jpg;imgdata.img64,', '')
        } else if (imgdata.imgType === "jpeg") {
          imgdata.img64 = encodedImg.replace('data:image/jpeg;imgdata.img64,', '')
        } else if (imgdata.imgType === "png") {
          imgdata.img64 = encodedImg.replace('data:image/png;imgdata.img64,', '')
        } else {
          imgdata.img64 = ""
        }
      }
    }
  }

    return (
    <React.Fragment>
      <h1>アイコン画像設定</h1>
      <input type="file" accept="img/*" onChange={e => handleImage(e.target.files)} />
      <button onClick={postImage}>Upload</button>
    </React.Fragment>
  )
}

export default Image
