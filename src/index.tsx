import React from 'react'
import { ThemeProvider, CssBaseline, createMuiTheme, colors } from '@material-ui/core'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'state'
import App from 'views/App'

const theme = createMuiTheme({
  palette: {
    primary: colors.lightBlue,
    secondary: colors.yellow,
    type: 'dark',
  }
})

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  , document.getElementById('root')
)
