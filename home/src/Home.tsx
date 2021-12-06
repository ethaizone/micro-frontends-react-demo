import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { CardActionArea, CardMedia } from '@mui/material'

import './utils/webpack'
import OpenImage from './assets/luke-southern-4kCGEB7Kt4k-unsplash.jpg'

function HomeContent() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
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
          Homepage
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Just a home page. Now I'm very lazy to add mock up text.<br/><br/>
          I added some images to show how image work in Module federation.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={OpenImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Open sign in window
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <a href="https://unsplash.com/photos/4kCGEB7Kt4k">
                  Photo by Luke Southern
                </a>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default function () {
  return <HomeContent />
}
