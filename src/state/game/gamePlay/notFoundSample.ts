type GamePlay = Omit<App.Game, "userId">

export const notFoundSample: GamePlay = {
  title: 'ゲームがありません',
  description: 'ゲームが存在しませんでした\nリソースにこのゲームIDが存在しませんでした',
  code: '404 not Found',
  codeComment: '404 エラー ページが存在しません',
  lang: '',
  index: '',
  createdAt: '',
  updatedAt: '',
}
