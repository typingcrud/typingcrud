This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

# ドキュメント

**README を master で編集しないで下さい．**

作業ブランチがなければ change-readme というブランチを作り，プルリクエストを作成してください．

## パッケージ

### create-react-app

```sh
npx create-react-app typingcrud --template redux-typescript
```

### パッケージ

- react-router-dom
- @types/react-router-dom
- amazon-cognito-identity-js

## ディレクトリ構成

基本的に `src/` 以外は変更しません．
以下では `src/` を省略しています．

`tsconfig.json` で `"baseUrl": "src"` と設定しているのでインポートする際は `src/` を除いたプロジェクトの絶対パスでインポートできます．

- state
  - redux のコードを格納するディレクトリです
  - `index.ts` で `store` を作成し， `AppState`, `actions`, `thunkActions` `useAppSelector`, `useAppDispatch` などを定義しています
  - `slice` は `action`, `actionCreater`, `reducer` を組み合わせたものです．
  - `slice` は state 名のディレクトリの `index.ts` ファイルに記述します．
  - 非同期は `createAsyncThunk` を用いて実装します．
    - 非同期に関するコードは `index.ts` でなく同一ディレクトリの別ファイルに記述します（要検討）
    - `createAsyncThunk` を用いたコードのファイル名はそのメソッド名です．
  - `slice` は命名規則を設定しているので記述する際は参照してください
- utils
  - 共通するメソッドなどを格納するディレクトリです
  - 命名規則など現時点ではありません
- views
  - React の関数コンポーネントを格納するディレクトリです
  - `App.tsx` でルーティングの設定を行なっています
  - その他のコンポーネントは機能と対応するディレクトリにコードを書きます
      - ディレクトリ名は機能を代表するコンポート名と一致させます
      - `index.tsx` に主要なコードを書きます
      - 関連するコンポーネントを同じディレクトリ内に書きます
  - `useAppSelector` と `useAppDispatch` には store の型情報が自動的に載るように設定したのでこっちを使ってください

## 命名規則

### state

#### slice について

- createSlice を代入する定数の名前は "ファイル名（キャメルケース）+Slice" にしてください．
- createSlice の第一引数の名前は "ファイル名（キャメルケース）" にしてください．
- initialState の型の名前は "ファイル名(キャメルケース）" にしてください．

### views

## Trello

https://trello.com/b/mSug0C2g/typingcrud%E9%80%B2%E6%8D%97%E7%AE%A1%E7%90%86
