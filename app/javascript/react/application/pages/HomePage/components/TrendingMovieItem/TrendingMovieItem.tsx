import MediaImage from '@/react/application/components/MediaImage'
import { type MovieType } from '@/react/types'
import React from 'react'
import './TrendingMovieItem.sass'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface TrendingMovieItemProps {
  movie: MovieType
}

const TrendingMovieItem = ({ movie }: TrendingMovieItemProps): JSX.Element => {
  const history = useNavigate()
  return (
    <div
      key={movie.id}
      className='trending-movie'
      onClick={() => { history(`/medias/movie/${movie.id}`) }}
    >
      <MediaImage imageUrl={movie.posterPath} height='169px' rating={movie.voteAverage} renderType='w500'/>
      <Typography noWrap>{movie.title}</Typography>
    </div>
  )
}

export default TrendingMovieItem
