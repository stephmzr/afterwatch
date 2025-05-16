import React from 'react'
import TrendingMovies from './components/TrendingMovies'
import GlobalSearch from './components/GlobalSearch'
import { Container } from '@mui/material'
import styles from './HomePage.module.sass'

const HomePage = (): JSX.Element => {
  return (
    <>
      <div className={styles.globalSearchContainer}>
        <GlobalSearch />
      </div>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          flexGrow: 1,
          mt: 2,
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: { xs: '100%', sm: '90%', md: '80%' }
        }}
        disableGutters
      >
        <TrendingMovies />
      </Container>
    </>
  )
}

export default HomePage
