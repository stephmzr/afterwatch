import MediaImage from '@/react/application/components/MediaImage'
import { type MovieType } from '@/react/types'
import React from 'react'
import './TrendingMovieItem.sass'
import { Typography } from '@mui/material'

interface TrendingMovieItemProps {
  movie: MovieType
}

const TrendingMovieItem = ({ movie }: TrendingMovieItemProps): JSX.Element => {
  return (
    <div key={movie.id} className='trending-movie'>
      <MediaImage imageUrl={movie.posterPath} height='169px' />
      <Typography noWrap>{movie.title}</Typography>
    </div>
  )
}

export default TrendingMovieItem
