import { gql } from '@apollo/client'

export const GET_USER_MEDIA_STATUS = gql`
  query userMediaStatus($tmdbId: ID!, $mediaType: String!) {
    userMediaStatus(tmdbId: $tmdbId, mediaType: $mediaType) {
      inWatchlist
      hasRated
    }
  }
`

export const ADD_TO_WATCHLIST = gql`
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

export const RATE_MEDIA = gql`
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

export const REMOVE_FROM_WATCHLIST = gql`
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

export const GET_USER_RATING = gql`
  query userRating($tmdbId: ID!, $mediaType: String!) {
    userRating(tmdbId: $tmdbId, mediaType: $mediaType) {
      rating
      review
    }
  }
`
