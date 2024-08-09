import useI18n from '@/utils/useI18n'
import React from 'react'
import MuiDivider from '@components/MuiComponents/MuiDivider'
import { gql, useQuery } from '@apollo/client'
import { MOVIE_FRAGMENT, TV_SHOW_FRAGMENT } from '@/utils/fragments'
import { CircularProgress, Stack } from '@mui/material'
import './TrendingMovies.sass'
import TrendingMovieItem from './TrendingMovieItem/TrendingMovieItem'
import { type MovieType } from '@/react/types'
import { take } from 'lodash'

const GET_TRENDING_MOVIES = gql`
  query trendingMovies {
    trendingMovies {
      ... on Movie {
        ...MovieInfo
      }
      ... on Tv {
        ...TvShowInfo
      }
    }
  }
  ${MOVIE_FRAGMENT}
  ${TV_SHOW_FRAGMENT}
`

const TrendingMovies = (): JSX.Element => {
  const { t } = useI18n()

  const { data, loading } = useQuery(GET_TRENDING_MOVIES)

  return (
    <div>
      <h2 className='is-bold'>{t('pages.home_page.trending_movies')}</h2>
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
