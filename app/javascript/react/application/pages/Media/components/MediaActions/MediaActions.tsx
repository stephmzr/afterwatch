import React, { useState } from 'react'
import { Box, Button, Stack, Rating, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
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
          tmdbId: media.id,
          mediaType: media.mediaType,
          rating,
          review: review || null
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
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Watchlist Button */}
        <Button
          variant={userStatus.inWatchlist ? 'contained' : 'outlined'}
          startIcon={userStatus.inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={() => { void handleWatchlistToggle() }}
          color="primary"
        >
          {userStatus.inWatchlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
        </Button>

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
