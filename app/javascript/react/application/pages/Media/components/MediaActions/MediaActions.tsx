import React, { useState } from 'react'
import { Box, Button, Stack, Rating, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Tooltip, Badge } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { gql, useMutation, useQuery } from '@apollo/client'
import { type MediaType } from '@/react/types'
import './MediaActions.sass'

const GET_USER_MEDIA_STATUS = gql`
  query userMediaStatus($tmdbId: ID!, $mediaType: String!) {
    userMediaStatus(tmdbId: $tmdbId, mediaType: $mediaType) {
      inWatchlist
      hasRated
    }
  }
`

const ADD_TO_WATCHLIST = gql`
  mutation addToWatchlist($input: AddToWatchlistInput!) {
    addToWatchlist(input: $input) {
      watchlist {
        id
        tmdbId
        mediaType
      }
      errors
    }
  }
`

const RATE_MEDIA = gql`
  mutation rateMedia($input: RateMediaInput!) {
    rateMedia(input: $input) {
      userRating {
        id
        rating
        review
      }
      errors
    }
  }
`

const REMOVE_FROM_WATCHLIST = gql`
  mutation removeFromWatchlist($input: RemoveFromWatchlistInput!) {
    removeFromWatchlist(input: $input) {
      watchlist {
        id
        tmdbId
        mediaType
      }
      activity {
        id
        activityType
        metadata
      }
      errors
    }
  }
`

interface MediaActionsProps {
  media: MediaType
}

interface UserMediaStatus {
  inWatchlist: boolean
  hasRated: boolean
}

const MediaActions = ({ media }: MediaActionsProps): JSX.Element => {
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const [showRatingDialog, setShowRatingDialog] = useState(false)

  // Get user's current status for this media
  const { data: statusData, refetch: refetchStatus } = useQuery(GET_USER_MEDIA_STATUS, {
    variables: { tmdbId: media.id, mediaType: media.mediaType },
    skip: !media.id
  })

  const userStatus: UserMediaStatus = statusData?.userMediaStatus || {
    inWatchlist: false,
    hasRated: false
  }

  // Mutations
  const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST)
  const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST)
  const [rateMedia] = useMutation(RATE_MEDIA)

  const handleWatchlistToggle = async (): Promise<void> => {
    try {
      if (userStatus.inWatchlist) {
        await removeFromWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      } else {
        await addToWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      }
      refetchStatus()
    } catch (error) {
      console.log('Error toggling watchlist:', error)
    }
  }

  const handleRatingSubmit = async (): Promise<void> => {
    if (!rating) return

    try {
      await rateMedia({
        variables: {
          input: {
            tmdbId: media.id,
            mediaType: media.mediaType,
            rating,
            review: review || null  
          }
        }
      })
      setShowRatingDialog(false)
      setRating(null)
      setReview('')
      refetchStatus()
    } catch (error) {
      console.log('Error rating media:', error)
    }
  }

  return (
    <Box className="media-actions">
      <Stack direction="row" spacing={6} alignItems="center">
        {/* Watchlist Button */}
        <Badge 
          badgeContent={userStatus.inWatchlist ? "✓" : ""} 
          color="success"
          overlap="circular"
        >
          <IconButton
            onClick={() => { void handleWatchlistToggle() }}
          >
            {userStatus.inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Badge>

        {/* Rate Button */}
        <Button
          variant={userStatus.hasRated ? 'contained' : 'outlined'}
          startIcon={<StarIcon />}
          onClick={() => { setShowRatingDialog(true) }}
          color="warning"
        >
          {userStatus.hasRated ? 'Modifier ma note' : 'Noter'}
        </Button>
      </Stack>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => { setShowRatingDialog(false) }} maxWidth="sm" fullWidth>
        <DialogTitle>Noter {media.title}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Votre note
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => { setRating(newValue) }}
                size="large"
                max={10}
              />
              <Typography variant="body2" color="text.secondary">
                {rating ? `${rating}/10` : 'Sélectionnez une note'}
              </Typography>
            </Box>

            <TextField
              label="Commentaire (optionnel)"
              multiline
              rows={4}
              value={review}
              onChange={(e) => { setReview(e.target.value) }}
              placeholder="Partagez votre avis sur ce film..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowRatingDialog(false) }}>
            Annuler
          </Button>
          <Button
            onClick={() => { void handleRatingSubmit() }}
            variant="contained"
            disabled={!rating}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MediaActions

// Nouveau composant compact pour la section hero
interface MediaActionsCompactProps {
  media: MediaType
  isDarkBackground?: boolean
}

export const MediaActionsCompact = ({ media, isDarkBackground = false }: MediaActionsCompactProps): JSX.Element => {
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const [showRatingDialog, setShowRatingDialog] = useState(false)

  // Get user's current status for this media
  const { data: statusData, refetch: refetchStatus } = useQuery(GET_USER_MEDIA_STATUS, {
    variables: { tmdbId: media.id, mediaType: media.mediaType },
    skip: !media.id
  })

  const userStatus: UserMediaStatus = statusData?.userMediaStatus || {
    inWatchlist: false,
    hasRated: false
  }

  // Mutations
  const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST)
  const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST)
  const [rateMedia] = useMutation(RATE_MEDIA)

  const handleWatchlistToggle = async (): Promise<void> => {
    try {
      if (userStatus.inWatchlist) {
        await removeFromWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      } else {
        await addToWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      }
      refetchStatus()
    } catch (error) {
      console.log('Error toggling watchlist:', error)
    }
  }

  const handleRatingSubmit = async (): Promise<void> => {
    if (!rating) return

    try {
      await rateMedia({
        variables: {
          input: {
            tmdbId: media.id,
            mediaType: media.mediaType,
            rating,
            review: review || null  
          }
        }
      })
      setShowRatingDialog(false)
      setRating(null)
      setReview('')
      refetchStatus()
    } catch (error) {
      console.log('Error rating media:', error)
    }
  }

  // Styles adaptatifs selon la couleur de fond
  const buttonColor = isDarkBackground ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
  const buttonHoverColor = isDarkBackground ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)'
  const activeButtonBg = isDarkBackground ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'

  return (
    <Box className="media-actions-compact">
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
        {/* Watchlist Button */}
        <Tooltip title={userStatus.inWatchlist ? 'Retirer de ma liste' : 'Ajouter à ma liste'}>
          <Badge 
            badgeContent={userStatus.inWatchlist ? "✓" : ""} 
            color="success"
            overlap="circular"
          >
            <IconButton
              onClick={() => { void handleWatchlistToggle() }}
            >
              {userStatus.inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Badge>
        </Tooltip>

        {/* Rate Button */}
        <Tooltip title={userStatus.hasRated ? 'Modifier ma note' : 'Noter ce média'}>
          <IconButton
            onClick={() => { setShowRatingDialog(true) }}
          >
            <StarIcon />
          </IconButton>
        </Tooltip>

        {/* Add to List Button (à implémenter plus tard) */}
        <Tooltip title="Ajouter à une liste (bientôt disponible)">
          <IconButton
            disabled
          >
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => { setShowRatingDialog(false) }} maxWidth="sm" fullWidth>
        <DialogTitle>Noter {media.title}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Votre note
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => { setRating(newValue) }}
                size="large"
                max={10}
              />
              <Typography variant="body2" color="text.secondary">
                {rating ? `${rating}/10` : 'Sélectionnez une note'}
              </Typography>
            </Box>

            <TextField
              label="Commentaire (optionnel)"
              multiline
              rows={4}
              value={review}
              onChange={(e) => { setReview(e.target.value) }}
              placeholder="Partagez votre avis sur ce film..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowRatingDialog(false) }}>
            Annuler
          </Button>
          <Button
            onClick={() => { void handleRatingSubmit() }}
            variant="contained"
            disabled={!rating}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

// Position fixe en bas à droite, style modern
<Box sx={{
  position: 'fixed',
  bottom: 24,
  right: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  zIndex: 1000
}}>
  {/* Boutons ici */}
</Box>

// Nouveau composant élégant pour intégration dans le résumé
interface MediaActionsInlineProps {
  media: MediaType
  textColor: string
}

export const MediaActionsInline = ({ media, textColor }: MediaActionsInlineProps): JSX.Element => {
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const [showRatingDialog, setShowRatingDialog] = useState(false)

  // Get user's current status for this media
  const { data: statusData, refetch: refetchStatus } = useQuery(GET_USER_MEDIA_STATUS, {
    variables: { tmdbId: media.id, mediaType: media.mediaType },
    skip: !media.id
  })

  const userStatus: UserMediaStatus = statusData?.userMediaStatus || {
    inWatchlist: false,
    hasRated: false
  }

  // Mutations
  const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST)
  const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST)
  const [rateMedia] = useMutation(RATE_MEDIA)

  const handleWatchlistToggle = async (): Promise<void> => {
    try {
      if (userStatus.inWatchlist) {
        await removeFromWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      } else {
        await addToWatchlist({
          variables: {
            input: {
              tmdbId: media.id,
              mediaType: media.mediaType
            }
          }
        })
      }
      refetchStatus()
    } catch (error) {
      console.log('Error toggling watchlist:', error)
    }
  }

  const handleRatingSubmit = async (): Promise<void> => {
    if (!rating) return

    try {
      await rateMedia({
        variables: {
          input: {
            tmdbId: media.id,
            mediaType: media.mediaType,
            rating,
            review: review || null
          }
        }
      })
      setShowRatingDialog(false)
      setRating(null)
      setReview('')
      refetchStatus()
    } catch (error) {
      console.log('Error rating media:', error)
    }
  }

  return (
    <Box className="media-actions-inline" sx={{ my: 3 }}>
      <Stack direction="row" spacing={4} alignItems="center">
        {/* Watchlist Action */}
        <Button
          variant="text"
          startIcon={userStatus.inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={() => { void handleWatchlistToggle() }}
          sx={{
            color: textColor,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '24px',
            transition: 'all 0.3s ease',
            background: userStatus.inWatchlist 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'transparent',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)',
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 12px rgba(255, 255, 255, 0.2)`
            }
          }}
        >
          {userStatus.inWatchlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
        </Button>

        {/* Rating Action */}
        <Button
          variant="text"
          startIcon={<StarIcon />}
          onClick={() => { setShowRatingDialog(true) }}
          sx={{
            color: textColor,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '24px',
            transition: 'all 0.3s ease',
            background: userStatus.hasRated 
              ? 'rgba(255, 193, 7, 0.2)' 
              : 'transparent',
            '&:hover': {
              background: 'rgba(255, 193, 7, 0.25)',
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 12px rgba(255, 193, 7, 0.3)`
            }
          }}
        >
          {userStatus.hasRated ? 'Modifier ma note' : 'Noter ce film'}
        </Button>

        {/* Add to List Action (placeholder) */}
        <Button
          variant="text"
          startIcon={<PlaylistAddIcon />}
          disabled
          sx={{
            color: textColor,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '24px',
            opacity: 0.6,
            '&.Mui-disabled': {
              color: textColor
            }
          }}
        >
          Ajouter à une liste
        </Button>
      </Stack>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => { setShowRatingDialog(false) }} maxWidth="sm" fullWidth>
        <DialogTitle>Noter {media.title}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Votre note
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => { setRating(newValue) }}
                size="large"
                max={10}
              />
              <Typography variant="body2" color="text.secondary">
                {rating ? `${rating}/10` : 'Sélectionnez une note'}
              </Typography>
            </Box>

            <TextField
              label="Commentaire (optionnel)"
              multiline
              rows={4}
              value={review}
              onChange={(e) => { setReview(e.target.value) }}
              placeholder="Partagez votre avis sur ce film..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowRatingDialog(false) }}>
            Annuler
          </Button>
          <Button
            onClick={() => { void handleRatingSubmit() }}
            variant="contained"
            disabled={!rating}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
