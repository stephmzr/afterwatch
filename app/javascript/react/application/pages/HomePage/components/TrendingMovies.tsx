import useI18n from '@/utils/useI18n'
import React from 'react'
import MuiDivider from '@components/MuiComponents/MuiDivider'
import { gql, useQuery } from '@apollo/client'
import { MOVIE_FRAGMENT } from '@/utils/fragments'
import { CircularProgress, Stack, Typography } from '@mui/material'
import './TrendingMovies.sass'
import TrendingMovieItem from './TrendingMovieItem/TrendingMovieItem'
import { type MovieType } from '@/react/types'
import { take } from 'lodash'

const GET_TRENDING_MOVIES = gql`
  query trendingMovies {
    trendingMovies {
      ...MovieInfo
    }
  }
  ${MOVIE_FRAGMENT}
`

const TrendingMovies = (): JSX.Element => {
  const { t } = useI18n()

  const { data, loading } = useQuery(GET_TRENDING_MOVIES)

  return (
    <div>
      <Typography variant='h5' gutterBottom>{t('pages.home_page.trending_movies')}</Typography>
      <MuiDivider style={{ borderColor: 'black' }} />
      {loading
        ? (
          <span className='centered-progress'>
            <CircularProgress size={60} color="primary" />
          </span>
          )
        : (
            <Stack direction='row' gap={4} className='trending-movies'>
              {take(data.trendingMovies, '6').map((movie: MovieType) => (
                <TrendingMovieItem key={movie.id} movie={movie} />
              ))}
            </Stack>
          )}
    </div>
  )
}

export default TrendingMovies
