import React from 'react'
import { ThemeProvider, CssBaseline, createTheme, colors } from '@material-ui/core'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'state'
import App from 'views/App'

const theme = createTheme({
  palette: {
    primary: colors.lightBlue,
    secondary: colors.yellow,
    type: 'dark',
  }
})

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
)
