import { gql } from '@apollo/client'

export const MOVIE_SHOW_FRAGMENT = gql`
  fragment MovieShowInfo on Movie {
    id
    title
    originalLanguage
    overview
    releaseDate
    posterPath
    runtime
    tagline
    voteAverage
    mediaType
    genres {
      id
      name
    }
  }
`

export const TV_SHOW_FRAGMENT = gql`
  fragment TvShowInfo on Tv {
    id
    title: name
    originalLanguage
    overview
    releaseDate: firstAirDate
    runtime: episodeRunTime
    posterPath
    tagline
    voteAverage
    genres {
      id
      name
    }
  }
`
