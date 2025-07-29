import useI18n from '@/utils/useI18n'
import React, { useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import { MOVIE_FRAGMENT } from '@/utils/fragments'
import { CircularProgress, Stack } from '@mui/material'
import './TrendingMovies.sass'
import TrendingMovieItem from './TrendingMovieItem/TrendingMovieItem'
import { type MovieType } from '@/react/types'
import LeftArrow from '@mui/icons-material/ArrowBackIos'
import RightArrow from '@mui/icons-material/ArrowForwardIos'

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
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -900, behavior: 'smooth' })
    }
  }

  const scrollRight = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 900, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {loading
        ? (
          <span className='centered-progress'>
            <CircularProgress size={60} color="primary" />
          </span>
          )
        : (
          <div className='trending-movies-container'>
            <div className='left-arrow' onClick={scrollLeft}>
              <LeftArrow />
            </div>
            <Stack direction='row' spacing='32px' className='trending-movies' ref={scrollRef}>
              {data.trendingMovies.map((movie: MovieType) => (
                <TrendingMovieItem key={movie.id} movie={movie} />
              ))}
            </Stack>
            <div className='right-arrow' onClick={scrollRight}>
              <RightArrow />
            </div>
          </div>
          )}
    </div>
  )
}

export default TrendingMovies
