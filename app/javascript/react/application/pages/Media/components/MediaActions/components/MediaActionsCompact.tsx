import React from 'react'
import { Box, Stack, IconButton, Tooltip } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useMediaActions } from '../hooks/useMediaActions'
import { type MediaActionsCompactProps } from '../types'
import WatchlistButton from './WatchlistButton'
import RatingButton from './RatingButton'
import RatingDialog from './RatingDialog'

const MediaActionsCompact: React.FC<MediaActionsCompactProps> = ({ 
  media, 
  isDarkBackground = false 
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
    <Box className="media-actions-compact">
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
        <WatchlistButton
          inWatchlist={userStatus.inWatchlist}
          onToggle={handleWatchlistToggle}
          showTooltip
          tooltipTitle={userStatus.inWatchlist ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
        />
        
        <RatingButton
          hasRated={userStatus.hasRated}
          onClick={() => setShowRatingDialog(true)}
          variant="icon"
          showTooltip
          tooltipTitle={userStatus.hasRated ? 'Modifier ma note' : 'Noter ce média'}
        />

        <Tooltip title="Ajouter à une liste (bientôt disponible)">
          <IconButton disabled>
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
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

export default MediaActionsCompact
