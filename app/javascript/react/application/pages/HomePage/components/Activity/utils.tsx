import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import BookmarkIcon from '@mui/icons-material/Bookmark'

export const getActivityIcon = (type: string): React.ReactElement | null => {
  switch (type) {
    case 'rating': return <StarIcon sx={{ fontSize: 18, color: 'warning.main' }} />
    case 'watchlist': return <BookmarkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
    default: return null
  }
} 