import { gql } from '@apollo/client'

export const MOVIE_SHOW_FRAGMENT = gql`
  fragment MovieShowInfo on Movie {
    id
    title
    originalLanguage
    overview
    releaseDate
    posterPath
  }
`

export const TV_SHOW_FRAGMENT = gql`
  fragment TvShowInfo on Tv {
    id
    title: name
    originalLanguage
    overview
    releaseDate: firstAirDate
    posterPath
  }
`
