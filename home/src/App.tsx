import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
// material
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import Home from './Home'

const App = () => (
  <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Home />
    </StyledEngineProvider>
  </HelmetProvider>
)

export default App;
