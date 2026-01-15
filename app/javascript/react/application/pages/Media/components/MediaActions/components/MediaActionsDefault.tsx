import React from 'react'
import { Box, Stack } from '@mui/material'
import { useMediaActions } from '../hooks/useMediaActions'
import { type MediaActionsProps } from '../types'
import WatchlistButton from './WatchlistButton'
import RatingButton from './RatingButton'
import RatingDialog from './RatingDialog'

const MediaActionsDefault: React.FC<MediaActionsProps> = ({ media }) => {
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
    <Box className="media-actions">
      <Stack direction="row" spacing={6} alignItems="center">
        <WatchlistButton
          inWatchlist={userStatus.inWatchlist}
          onToggle={handleWatchlistToggle}
        />
        
        <RatingButton
          hasRated={userStatus.hasRated}
          onClick={() => setShowRatingDialog(true)}
        />
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

export default MediaActionsDefault
