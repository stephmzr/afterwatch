import { gql } from '@apollo/client'
import { MOVIE_SHOW_FRAGMENT, TV_SHOW_FRAGMENT } from './fragments'

export const GET_MEDIA = gql`
  query media($id: ID!, $type: String!, $withCredits: Boolean) {
    media(id: $id, type: $type, withCredits: $withCredits) {
      ... on Movie {
        ...MovieShowInfo
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
          crew {
            id
            name
            profilePath
            job
          }
        }
      }
      ... on Tv {
        ...TvShowInfo
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
          crew {
            id
            name
            profilePath
            job
          }
        }
      }
    }
  }
  ${MOVIE_SHOW_FRAGMENT}
  ${TV_SHOW_FRAGMENT}
`
