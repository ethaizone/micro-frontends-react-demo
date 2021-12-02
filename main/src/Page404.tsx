import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

function Page404() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Page 404</title>
      </Helmet>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Not Found
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default Page404
