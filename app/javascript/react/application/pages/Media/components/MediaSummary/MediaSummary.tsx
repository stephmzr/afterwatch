import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import dayjs from '@/utils/dayjs'
import MediaRating from '@/react/application/components/MediaRating'
import StarIcon from '@mui/icons-material/Star'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ListIcon from '@mui/icons-material/List'
import { type GenreType } from '@/react/types'
import './MediaSummary.sass'

interface MediaSummaryProps {
  title: string
  releaseDate: Date
  originalLanguage: string
  genres: GenreType[]
  runtime: number
  tagline: string
  overview: string
  voteAverage: number
}

const RATING_DEFAULT_MARGIN = '36px 0 0 0'
const RATING_NO_MARGIN = '0'

/**
 * MediaSummary component renders the summary of a media item.
 * It displays the title, release date, original language, genres, runtime, tagline, overview, and average vote rating.
 * TODO : Add the name of the director
 * @param {MediaSummaryProps} props - The props for the MediaSummary component.
 * @returns {JSX.Element} The rendered MediaSummary component.
 */
const MediaSummary: React.FC<MediaSummaryProps> = ({
  title,
  releaseDate,
  originalLanguage,
  genres,
  runtime,
  tagline,
  overview,
  voteAverage
}: MediaSummaryProps): JSX.Element => {
  // Error handling for missing or invalid props
  if (!title || !releaseDate || !originalLanguage || !genres || !runtime || !overview || !voteAverage) {
    return <div>Error: Missing required props</div>
  }

  return (
    <>
      <h1>
      <Stack direction='row' gap={2}>
        <span className='is-bold'>{title}</span>
        <span className='media-release-year'>({dayjs(releaseDate, 'DD/MM/YYYY').year()})</span>
      </Stack>
    </h1>
    <p>
      {releaseDate.toString()} ({originalLanguage.toUpperCase()}) - {genres.map((genre) => genre.name).join(', ')} - {runtime} min
    </p>
    <div>
    <span>
      <Grid container spacing={3}>
        <Grid item className='flex-centered'>
          <StarIcon className='icon'/><Typography>452</Typography>
        </Grid>
        <Grid item className='flex-centered'>
          <BookmarkIcon className='icon'/><Typography>34</Typography>
      </Grid>
        <Grid item className='flex-centered'>
          <ListIcon className='icon'/><Typography>12</Typography>
        </Grid>
      </Grid>
      </span>
    </div>
    <p className='is-italic tagline'>{tagline}</p>
    <Typography variant="body1" className='media-overview'>{overview}</Typography>
    <Stack direction='row' justifyContent='space-between'>
      <span></span>
      <MediaRating rating={voteAverage} margin={tagline ? RATING_NO_MARGIN : RATING_DEFAULT_MARGIN} />
    </Stack>
    </>
  )
}

export default MediaSummary
