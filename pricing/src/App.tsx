import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
// material
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import Pricing from './Pricing'

const App = () => (
  <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Pricing />
    </StyledEngineProvider>
  </HelmetProvider>
)

export default App;
