import React from 'react'
import './styles/MediaShow.sass'
import { Container, Grid, CircularProgress, Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { type MediaType } from '@/react/types'
import MediaImage from '../../components/MediaImage/MediaImage'
import MediaCastList from './components/MediaCast/MediaCastList/MediaCastList'
import { GET_MEDIA } from './graphql/queries'
import MediaSummary from './components/MediaSummary/MediaSummary'
import MediaWatchProviders from './components/MediaWatchProviders/MediaWatchProviders'
import MediaActions from './components/MediaActions/MediaActions'
import { useBackgroundColor } from '@/react/hooks/useBackgroundColor'

// Composant pour l'espacement vide sur les côtés
const EmptyGridSpace: React.FC = () => (
  <Grid item xl={2} md={0} sm={0} lg={0} />
)

// Composant pour la section principale (poster + résumé)
interface MediaHeroSectionProps {
  media: MediaType
  textColor: string
}

const MediaHeroSection: React.FC<MediaHeroSectionProps> = ({ media, textColor }) => (
  <>
    <EmptyGridSpace />

    {/* Media poster */}
    <Grid item sm={12} md={4} lg={4} xl={2} className='media-poster'>
      <MediaImage
        imageUrl={media.posterPath}
        title={media.title}
        height='343px'
        width='228px'
        rating={media.voteAverage}
        ratingSize='large'
      />
    </Grid>

    {/* Media summary */}
    <Grid item sm={6} xl={4} className='media-summary-container'>
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
      <MediaActions media={media} />
    </Grid>
  </>
)

// Composant pour la section inférieure (providers + cast)
interface MediaContentSectionProps {
  media: MediaType
}

const MediaContentSection: React.FC<MediaContentSectionProps> = ({ media }) => (
  <>
    <EmptyGridSpace />

    {/* Media streaming providers */}
    <Grid item xs={12} sm={3} md={4} lg={4} xl={2} className='streaming-providers-grid'>
      <MediaWatchProviders providers={{ flatrate: media?.watchProviders?.providers ? [media.watchProviders.providers] : [] }} />
    </Grid>

    {/* Media cast list */}
    {media.credits.cast.length > 0 && (
      <Grid item xs={6} sm={6} xl={4}>
        <Container disableGutters>
          <MediaCastList cast={media.credits.cast} />
        </Container>
      </Grid>
    )}
  </>
)

// Composant de chargement
const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    <CircularProgress />
  </Box>
)

// Composant principal
const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type }
  })

  const media: MediaType = data?.media
  const { backgroundColor, textColor } = useBackgroundColor(media?.posterPath)

  if (loading) return <LoadingSpinner />

  return (
    <div className='media-show-wrapper'>
      {/* Section héro */}
      <Grid container spacing={0} className='media-show-grid' style={{ background: backgroundColor, color: textColor }}>
        <MediaHeroSection media={media} textColor={textColor} />
      </Grid>

      {/* Section contenu */}
      <Grid container spacing={0}>
        <MediaContentSection media={media} />
      </Grid>
    </div>
  )
}

export default MediaShow
