import React from 'react'
import './styles/MediaShow.sass'
import { Container, Grid, CircularProgress, Box, Fade, Divider } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { type MediaType } from '@/react/types'
import MediaImage from '../../components/MediaImage/MediaImage'
import MediaCastList from './components/MediaCast/MediaCastList/MediaCastList'
import { GET_MEDIA } from './graphql/queries'
import MediaSummary from './components/MediaSummary/MediaSummary'
import MediaWatchProviders from './components/MediaWatchProviders/MediaWatchProviders'
import { useBackgroundColor } from '@/react/hooks/useBackgroundColor'

// Composant pour l'espacement vide sur les côtés
const EmptyGridSpace: React.FC = () => (
  <Grid item xl={1} lg={0.5} md={0} sm={0} />
)

// Fonction utilitaire pour déterminer si une couleur est sombre
const isDarkColor = (color: string): boolean => {
  // Convertit une couleur hex ou rgb en luminosité
  let r, g, b
  if (color.startsWith('#')) {
    // Couleur hex
    const hex = color.replace('#', '')
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else if (color.startsWith('rgb')) {
    // Couleur rgb
    const match = color.match(/\d+/g)
    if (match) {
      r = parseInt(match[0])
      g = parseInt(match[1])
      b = parseInt(match[2])
    } else {
      return false
    }
  } else {
    return false
  }

  // Calcul de la luminosité
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

// Composant pour la section principale (poster + résumé)
interface MediaHeroSectionProps {
  media: MediaType
  textColor: string
  backgroundColor: string
}

const MediaHeroSection: React.FC<MediaHeroSectionProps> = ({ media, textColor, backgroundColor }) => (
  <Fade in timeout={600}>
    <Grid container alignItems="flex-start">
      <EmptyGridSpace />

      {/* Media poster */}
      <Grid item xs={12} sm={4} md={3} lg={3} xl={2.5} sx={{ pl: 0, p: 0 }} className='media-poster'>
        <Box>
          <MediaImage
            imageUrl={media.posterPath}
            title={media.title}
            height='400px'
            width='267px'
            rating={media.voteAverage}
            ratingSize='large'
          />
        </Box>
      </Grid>

      {/* Media summary and actions */}
      <Grid item xs={12} sm={8} md={9} lg={7} xl={6.5}>
        <Box sx={{ maxWidth: '100%' }}>
          <MediaSummary
            media={media}
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

        </Box>
      </Grid>

      <EmptyGridSpace />
    </Grid>
  </Fade>
)

// Composant pour la section inférieure (providers + cast)
interface MediaContentSectionProps {
  media: MediaType
}

const MediaContentSection: React.FC<MediaContentSectionProps> = ({ media }) => (
  <Container maxWidth="xl" sx={{ pt: 2 }}>
    <Grid container>
      <EmptyGridSpace />

      {/* Media streaming providers */}
      <Grid item xs={12} md={4} lg={3} xl={2.5}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MediaWatchProviders
            providers={{
              flatrate: media?.watchProviders?.providers
                ? [media.watchProviders.providers]
                : []
            }}
          />
        </Box>
      </Grid>

      {/* Media cast list */}
      <Grid item xs={12} md={8} lg={7} xl={6.5}>
        {media.credits.cast.length > 0 && (
          <MediaCastList cast={media.credits.cast} maxItems={12} />
        )}
      </Grid>

      <EmptyGridSpace />
    </Grid>
  </Container>
)

// Composant de chargement
const LoadingSpinner: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="70vh"
    gap={2}
  >
    <CircularProgress size={48} thickness={3} />
  </Box>
)

const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type }
  })

  const media: MediaType = data?.media
  const { backgroundColor, textColor } = useBackgroundColor(media?.posterPath)

  if (loading) return <LoadingSpinner />

  if (!media) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        flexDirection="column"
        gap={2}
      >
        <Box sx={{ color: 'error.main', fontSize: '1.1rem', fontWeight: 500 }}>
          Erreur lors du chargement
        </Box>
        <Box sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Impossible de récupérer les informations de ce média
        </Box>
      </Box>
    )
  }

  if (!media) return null

  return (
    <>
      {/* Section héro avec background gradient */}
      <Box
        className='media-hero-section'
        sx={{
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
          color: textColor,
          minHeight: '50vh',
          position: 'relative',
          py: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <MediaHeroSection media={media} textColor={textColor} backgroundColor={backgroundColor} />
        </Box>
      </Box>

      {/* Séparateur subtil */}
      <Divider sx={{ opacity: 0.1 }} />

      {/* Section contenu */}
      <Box sx={{ backgroundColor: 'background.default' }}>
        <MediaContentSection media={media} />
      </Box>
    </>

  )
}

export default MediaShow
