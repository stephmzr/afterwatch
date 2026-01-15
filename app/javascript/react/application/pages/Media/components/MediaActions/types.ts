import { type MediaType } from '@/react/types'

export interface MediaActionsProps {
  media: MediaType
}

export interface UserMediaStatus {
  inWatchlist: boolean
  hasRated: boolean
}

export interface MediaActionsCompactProps {
  media: MediaType
  isDarkBackground?: boolean
}

export interface MediaActionsInlineProps {
  media: MediaType
  textColor: string
}

export interface UseMediaActionsReturn {
  userStatus: UserMediaStatus
  rating: number | null
  review: string
  showRatingDialog: boolean
  setRating: (rating: number | null) => void
  setReview: (review: string) => void
  setShowRatingDialog: (show: boolean) => void
  handleWatchlistToggle: () => Promise<void>
  handleRatingSubmit: () => Promise<void>
  loading: boolean
}
