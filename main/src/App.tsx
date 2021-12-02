import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
// material
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import Router from './routes'
import { HashRouter } from 'react-router-dom'

const App = () => (
  <HashRouter>
    <HelmetProvider>
      {/* <StyledEngineProvider injectFirst> */}
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Router />
      {/* </StyledEngineProvider> */}
    </HelmetProvider>
  </HashRouter>
)

export default App;
