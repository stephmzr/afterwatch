import React from 'react'
import { Box, Stack, Button } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useMediaActions } from '../hooks/useMediaActions'
import { type MediaActionsInlineProps } from '../types'
import RatingDialog from './RatingDialog'

const MediaActionsInline: React.FC<MediaActionsInlineProps> = ({ 
  media, 
  textColor 
}) => {
  const {
    userStatus,
    rating,
    review,
    showRatingDialog,
    setRating,
    setReview,
    setShowRatingDialog,
    handleWatchlistToggle,
    handleRatingSubmit
  } = useMediaActions(media)

  return (
    <Box className="media-actions-inline" sx={{ my: 3 }}>
      <Stack direction="row" spacing={4} alignItems="center">
        <Button
          variant="text"
          startIcon={userStatus.inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={handleWatchlistToggle}
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
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          {userStatus.inWatchlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
        </Button>

        <Button
          variant="text"
          startIcon={<StarIcon />}
          onClick={() => setShowRatingDialog(true)}
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
              boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)'
            }
          }}
        >
          {userStatus.hasRated ? 'Modifier ma note' : 'Noter ce film'}
        </Button>

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

      <RatingDialog
        open={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        onSubmit={handleRatingSubmit}
        rating={rating}
        review={review}
        onRatingChange={setRating}
        onReviewChange={setReview}
        mediaTitle={media.title}
      />
    </Box>
  )
}

export default MediaActionsInline
