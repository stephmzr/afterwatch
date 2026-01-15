// Main component
export { default } from './MediaActions'

// Variants
export { MediaActionsCompact, MediaActionsInline } from './MediaActions'

// Types
export type {
  MediaActionsProps,
  MediaActionsCompactProps,
  MediaActionsInlineProps,
  UserMediaStatus,
  UseMediaActionsReturn
} from './types'

// Hooks
export { useMediaActions } from './hooks/useMediaActions'

// Queries
export {
  GET_USER_MEDIA_STATUS,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  RATE_MEDIA,
  GET_USER_RATING
} from './queries'
