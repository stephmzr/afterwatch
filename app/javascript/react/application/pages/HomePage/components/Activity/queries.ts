import { gql } from '@apollo/client'

export const GET_ACTIVITIES = gql`
  query activities($limit: Int) {
    activities(limit: $limit) {
      id
      activityType
      tmdbId
      mediaType
      metadata
      createdAt
      actionText
      user {
        id
        firstName
        lastName
        fullName
      }
      media {
        ... on Movie {
          id
          title
          posterPath
          releaseDate
          voteAverage
          credits {
            director {
              name
            }
          }
        }
        ... on Tv {
          id
          title: name
          posterPath
          releaseDate: firstAirDate
          voteAverage
        }
      }
    }
  }
` 