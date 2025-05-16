import MediaImage from '@/react/application/components/MediaImage'
import { type MovieType } from '@/react/types'
import React, { useCallback, useState, useEffect } from 'react'
import './TrendingMovieItem.sass'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MoviePopover from './MoviePopover'
import { debounce } from 'lodash'

interface TrendingMovieItemProps {
  movie: MovieType
}

const TrendingMovieItem = ({ movie }: TrendingMovieItemProps): JSX.Element => {
  const history = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const debouncedSetAnchorEl = useCallback(
    debounce((element: HTMLElement | null) => {
      setAnchorEl(element)
    }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetAnchorEl.cancel()
    }
  }, [debouncedSetAnchorEl])

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    debouncedSetAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    debouncedSetAnchorEl(null)
  }

  return (
    <div
      key={movie.id}
      className='trending-movie'
      onClick={() => { history(`/medias/movie/${movie.id}`) }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <MediaImage imageUrl={movie.posterPath} height='205px' width='135px' rating={movie.voteAverage} renderType='w500'/>
      <Typography noWrap variant='body2'>{movie.title}</Typography>
      <MoviePopover movie={movie} anchorEl={anchorEl} onClose={handlePopoverClose} />
    </div>
  )
}

export default TrendingMovieItem
