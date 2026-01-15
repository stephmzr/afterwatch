import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_MEDIA_STATUS, ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, RATE_MEDIA, GET_USER_RATING } from '../queries'
import { type MediaType } from '@/react/types'
import { type UseMediaActionsReturn, type UserMediaStatus } from '../types'

export const useMediaActions = (media: MediaType): UseMediaActionsReturn => {
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const [showRatingDialog, setShowRatingDialog] = useState(false)

  // Get user's current status for this media
  const { data: statusData, refetch: refetchStatus, loading } = useQuery(GET_USER_MEDIA_STATUS, {
    variables: { tmdbId: media.id, mediaType: media.mediaType },
    skip: !media.id
  })

  const { data: ratingData, loading: ratingLoading } = useQuery(GET_USER_RATING, {
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

  return {
    userStatus,
    rating,
    review,
    showRatingDialog,
    setRating,
    setReview,
    setShowRatingDialog,
    handleWatchlistToggle,
    handleRatingSubmit,
    loading,
    ...ratingData,
    ratingLoading
  }
}
