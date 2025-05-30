import React from 'react'
import TrendingMovies from './components/TrendingMovies'
import { Container, Box } from '@mui/material'
import Activity from './components/Activity/Activity'

const HomePage = (): JSX.Element => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        mt: 4,
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '100%', sm: '90%', md: '85%', lg: '90%' }
      }}
      disableGutters
    >
      {/* Carousel principal */}
      <Box sx={{ mb: 6 }}>
        <TrendingMovies />
      </Box>

      {/* Activité des amis */}
      <Box>
        <Activity />
      </Box>
    </Container>
  )
}

export default HomePage
