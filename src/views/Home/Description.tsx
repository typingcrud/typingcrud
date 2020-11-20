import React from 'react'
import { makeStyles, colors } from '@material-ui/core'
import { Paper, Typography } from '@material-ui/core'
import { useSignIn } from 'utils'

const useStyles = makeStyles({
  text: {
    padding: '2%'
  },
  strong: {
    color: colors.yellow[300]
  },
  paper: {
    marginBottom: '1%'
  }
})


export const Description: React.FC = () => {
  const classes = useStyles()
  const signIn = useSignIn()

  return (
    <Paper elevation={10} square className={classes.paper}>
      <div className={classes.text}>
        <Typography variant='h5'>
          TypingCRUDはプログラミング学習に適した<span className={classes.strong}>タイピングゲームを作って遊べるサイトです</span>
        </Typography>
        <p>例えば</p>
        <ul>
          <li>プログラミング学習を始めたばかりでとにかくコードを書きまくりたい！</li>
          <li>タッチタイピングは出来るようになったけどソースコードとなると途端にタイピングが遅くなってしまうので練習したい…</li>
          <li>プログラミングに関係なくタイピングゲームを自作してみたい！</li>
          <li>自作のタイピングゲームを人に遊んでもらいたい！</li>
        </ul>
        <p>等のマニアックな要望を少しだけ解決できます</p>
        { !signIn &&
          <React.Fragment>
            <p>ログインしなくても他の人が作ったタイピングゲームを遊べますが</p>
            <p>ログインすると…</p>
            <ul>
              <li>自分だけのオリジナルタイピングゲームの自作</li>
              <li>作ったタイピングゲームの公開</li>
              <li>アイコン画像の設定</li>
            </ul>
            <p>といったより便利な機能が使用できます</p>
            <p>まずは ↓ に他のユーザーが作成したゲームが一覧で出ているのでまずは実際に遊んでみてください</p>
            <p className={classes.strong}>左上のプレイアイコンをクリックすると実際に遊べます</p>
          </React.Fragment>
        }
      </div>
    </Paper>
  )
}
