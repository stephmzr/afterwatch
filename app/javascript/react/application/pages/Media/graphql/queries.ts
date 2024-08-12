import { gql } from '@apollo/client'
import { MOVIE_SHOW_FRAGMENT, TV_SHOW_FRAGMENT } from './fragments'

export const GET_MEDIA = gql`
  query media($id: ID!, $type: String!, $options: MediasOptionsAttributes) {
    media(id: $id, type: $type, options: $options) {
      ... on Movie {
        ...MovieShowInfo
        watchProviders {
          rent {
            providerId
            providerName
            logoPath
          }
        }
        credits {
          id
          director {
            id
            name
            profilePath
          }
          cast {
            id
            name
            profilePath
            character
          }
        }
      }
      ... on Tv {
        ...TvShowInfo
        watchProviders {
          rent {
            providerId
            providerName
            logoPath
          }
        }
        credits {
          id
          director {
            id
            name
            profilePath
          }
          cast {
            id
            name
            profilePath
            character
          }
        }
      }
    }
  }
  ${MOVIE_SHOW_FRAGMENT}
  ${TV_SHOW_FRAGMENT}
`
