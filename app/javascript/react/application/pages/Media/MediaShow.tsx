import React, { useCallback, useEffect, useState } from 'react'
import './styles/MediaShow.sass'
import { Container, Grid, useTheme } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { type MediaType } from '@/react/types'
import MediaImage from '../../components/MediaImage/MediaImage'
import MediaCastList from './components/MediaCast/MediaCastList/MediaCastList'
import { GET_MEDIA } from './graphql/queries'
import MediaSummary from './components/MediaSummary/MediaSummary'
import MediaWatchProviders from './components/MediaWatchProviders/MediaWatchProviders'
import { useBackgroundColor } from '@/react/hooks/useBackgroundColor'
import useCurrentBreakpoint from '@/utils/useCurrentBreakpoint'

const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type }
  })

  const media: MediaType = data?.media
  const { backgroundColor, textColor } = useBackgroundColor(media?.posterPath)
  const currentBreakpoint = useCurrentBreakpoint()
  console.log(currentBreakpoint)
  if (loading) return null

  return (
    <>
    <Grid
      container
      spacing={0}
      className='media-show-grid'
      style={{
        background: backgroundColor,
        color: textColor
      }}
    >
      {/* Empty space on the left */}
      <Grid item xl={2} md={0} sm={0} lg={0} />

      {/* Media poster */}
      <Grid item sm={12} md={4} lg={4} xl={2} className='media-poster'>
        <MediaImage imageUrl={media.posterPath} title={media.title} height='343px' width='228px' />
      </Grid>

      {/* Media summary */}
      <Grid item sm={6} xl={4} sx={{ padding: '0 24px' }}>
        <MediaSummary
          title={media.title}
          releaseDate={media.releaseDate}
          originalLanguage={media.originalLanguage}
          genres={media.genres}
          runtime={media.runtime}
          tagline={media.tagline}
          overview={media.overview}
          voteAverage={media.voteAverage}
          textColor={textColor}
        />
      </Grid>
    </Grid>
    <Grid container spacing={0}>
      {/* Empty space on the left */}
      <Grid item xl={2} md={0} sm={0} lg={0} />

      {/* Media streaming providers */}
      <Grid item xs={12} sm={3} md={4} lg={4} xl={2} className='streaming-providers-grid'>
        <MediaWatchProviders providers={media?.watchProviders?.providers || []}/>
      </Grid>
      {/* Media cast list */}
      {media.credits.cast.length > 0 && (
        <Grid item xs={6} sm={6} xl={4}>
          <Container disableGutters>
            <MediaCastList cast={media.credits.cast} />
          </Container>
        </Grid>
      )}
      </Grid>
    </>
  )
}

export default MediaShow
