import { type CastType } from '@/react/types'
import React, { useState } from 'react'
import './MediaCastItem.sass'
import { CardContent, CardMedia, Typography, Box } from '@mui/material'
import MuiCard from '@/react/application/components/MuiComponents/MuiCard'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

interface MediaCastItemProps {
  actor: CastType
}

const MediaCastItem: React.FC<MediaCastItemProps> = ({ actor }): JSX.Element => {
  const [imageError, setImageError] = useState(false)

  // Construction de l'URL de l'image
  const imageUrl = actor.profilePath
    ? `${imageBaseUrl.w154}/${actor.profilePath}`
    : null

  const handleImageError = (): void => {
    setImageError(true)
  }

  const showPlaceholder = !imageUrl || imageError

  return (
    <MuiCard
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: 180,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <Box sx={{ height: 240, backgroundColor: 'grey.100', flex: '0 0 auto' }}>
        {showPlaceholder
          ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.200',
                color: 'grey.600'
              }}
            >
              <Typography variant="body2" align="center">
                Pas d&apos;image
              </Typography>
            </Box>
            )
          : (
            <CardMedia
              component="img"
              src={imageUrl}
              alt={`Photo de ${actor.name}`}
              onError={handleImageError}
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
            />
            )}
      </Box>

      <CardContent sx={{ p: 2, flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body1"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: '0.95rem',
            lineHeight: 1.3,
            mb: 0.5,
            flex: '0 0 auto'
          }}
        >
          {actor.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.85rem',
            lineHeight: 1.2,
            fontStyle: 'italic',
            flex: '1 1 auto'
          }}
        >
          {actor.character}
        </Typography>
      </CardContent>
    </MuiCard>
  )
}

export default MediaCastItem
