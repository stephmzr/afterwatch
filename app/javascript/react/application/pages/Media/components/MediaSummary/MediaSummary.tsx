import { Grid, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import dayjs from '@/utils/dayjs'
import MediaRating from '@/react/application/components/MediaRating'
import { MediaActionsInline } from '../MediaActions/MediaActions'
import { type GenreType, type MediaType } from '@/react/types'
import './MediaSummary.sass'

interface MediaSummaryProps {
  media: MediaType
  title: string
  releaseDate: Date
  originalLanguage: string
  genres: GenreType[]
  runtime: number
  tagline: string
  overview: string
  voteAverage: number
  textColor: string
}

const RATING_DEFAULT_MARGIN = '36px 0 0 0'
const RATING_NO_MARGIN = '0'

// Styled components with color prop
const StyledTitle = styled('span')<{ color: string }>(({ color }) => ({
  fontWeight: 'bold',
  color
}))

const StyledText = styled(Typography)<{ color: string, fontSize: string }>(({ color, fontSize }) => ({
  color,
  fontSize
}))

const StyledTagline = styled('p')<{ color: string }>(({ color }) => ({
  fontStyle: 'italic',
  color
}))

const StyledOverview = styled(Typography)<{ color: string }>(({ color }) => ({
  color
}))

/**
 * MediaSummary component renders the summary of a media item.
 * It displays the title, release date, original language, genres, runtime, tagline, overview, and average vote rating.
 * TODO : Add the name of the director
 * @param {MediaSummaryProps} props - The props for the MediaSummary component.
 * @returns {JSX.Element} The rendered MediaSummary component.
 */
const MediaSummary: React.FC<MediaSummaryProps> = ({
  media,
  title,
  releaseDate,
  originalLanguage,
  genres,
  runtime,
  tagline,
  overview,
  voteAverage,
  textColor
}: MediaSummaryProps): JSX.Element => {
  // Error handling for missing or invalid props
  if (!title || !releaseDate) {
    return <div>Error: Missing required props</div>
  }

  return (
    <>
      <h1 className='media-title'>
        <Stack direction='row' gap={2}>
          <StyledTitle color={textColor}>{title}</StyledTitle>
          <StyledText color={textColor} fontSize='34px'>({dayjs(releaseDate, 'DD/MM/YYYY').year()})</StyledText>
        </Stack>
      </h1> 
      <p>
        {releaseDate.toString()} ({originalLanguage.toUpperCase()}) - {genres.map((genre) => genre.name).join(', ')} - {runtime} min
      </p>
      
      <StyledTagline color={textColor}>{tagline}</StyledTagline>
      
      {/* Intégration élégante des actions après le tagline */}
      <MediaActionsInline media={media} textColor={textColor} />
      
      <StyledOverview color={textColor} className="media-overview">{overview}</StyledOverview>
    </>
  )
}

export default MediaSummary
