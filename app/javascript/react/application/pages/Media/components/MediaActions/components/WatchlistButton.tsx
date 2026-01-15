import React from 'react'
import { IconButton, Badge, Tooltip } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

interface WatchlistButtonProps {
  inWatchlist: boolean
  onToggle: () => void
  showTooltip?: boolean
  tooltipTitle?: string
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  inWatchlist,
  onToggle,
  showTooltip = false,
  tooltipTitle
}) => {
  const button = (
    <Badge
      badgeContent={inWatchlist ? '✓' : ''}
      color="success"
      overlap="circular"
    >
      <IconButton onClick={onToggle}>
        {inWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Badge>
  )

  if (showTooltip && tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle}>
        {button}
      </Tooltip>
    )
  }

  return button
}

export default WatchlistButton
